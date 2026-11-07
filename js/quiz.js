'use strict';
/* ===== построение вопросов ===== */
let S = null, LAST = null; // текущая сессия, последний результат
const BASE_XP = { mc: 8, type: 12, order: 12 };
const W = i => course()[i];

function distract(w, key, n = 3) {
  const same = W(w.w).words.filter(x => x.k !== w.k && x[key] !== w[key]);
  let pool = same;
  if (pool.length < n) pool = pool.concat(course().flatMap(c => c.words).filter(x => x.k !== w.k && x[key] !== w[key]));
  const seen = new Set(), out = [];
  for (const x of shuffle(pool)) { if (!seen.has(x[key])) { seen.add(x[key]); out.push(x); } if (out.length === n) break; }
  return out;
}
function qVocabMC(w, dir) {
  const key = dir === 'en' ? 'ru' : 'en';
  const opts = shuffle([w, ...distract(w, key)]);
  return {
    t: 'mc', kind: 'v', w, dir, label: dir === 'en' ? 'Что значит это слово?' : 'Как это по-английски?',
    q: dir === 'en' ? w.en : w.ru, speak: dir === 'en' ? w.en : null, opts: opts.map(o => o[key]), ans: opts.indexOf(w)
  };
}
function qVocabType(w, listen) {
  return {
    t: 'type', kind: 'v', w, listen, label: listen ? 'Послушай и напиши по-английски' : 'Напиши по-английски',
    q: listen ? '' : w.ru, speak: listen ? w.en : null, ans: [w.en]
  };
}
function qGram(ex, wi) {
  const tip = W(wi).tip;
  if (ex.t === 'c') {
    const opts = shuffle([ex.ans, ...ex.wrong]);
    return { t: 'mc', kind: 'g', label: 'Выбери правильный вариант', q: ex.q, opts, ans: opts.indexOf(ex.ans), tip, week: wi };
  }
  if (ex.t === 't') return { t: 'type', kind: 'g', label: 'Впиши пропущенное слово', q: ex.q, ans: ex.ans, tip, week: wi };
  return { t: 'order', kind: 'g', label: 'Собери предложение', q: ex.ru, tokens: shuffle(ex.en.split(' ')), ans: ex.en, tip, week: wi };
}
const buildQuiz = wi => shuffle(W(wi).words).slice(0, 12).map((w, i) => i % 6 === 5 ? qVocabType(w, false) : qVocabMC(w, i % 2 ? 'ru' : 'en'));
const buildSpell = wi => shuffle(W(wi).words).slice(0, 10).map((w, i) => qVocabType(w, HAS_TTS && i % 4 !== 3));
const buildGram = wi => shuffle(W(wi).ex).map(e => qGram(e, wi));
function buildBoss(wi) {
  const ws = shuffle(W(wi).words), ex = shuffle(W(wi).ex);
  const qs = [qVocabMC(ws[0], 'en'), qVocabMC(ws[1], 'ru'), qVocabMC(ws[2], 'en'), qVocabType(ws[3], false), qVocabType(ws[4], HAS_TTS), qVocabType(ws[5], false),
  ...ex.slice(0, 6).map(e => qGram(e, wi))];
  if (wi > 0) {
    const prev = []; for (let i = Math.max(0, wi - 3); i < wi; i++) prev.push(i);
    const pw = shuffle(prev.flatMap(i => W(i).words)), pe = shuffle(prev.flatMap(i => W(i).ex.map(e => [e, i])));
    qs.push(qVocabMC(pw[0], 'en'), qVocabType(pw[1], false), qGram(pe[0][0], pe[0][1]), qGram(pe[1][0], pe[1][1]));
  } else qs.push(qVocabMC(ws[6], 'ru'), qVocabType(ws[7], false), ...ex.slice(6, 8).map(e => qGram(e, wi)));
  return shuffle(qs);
}
function dueWords() {
  const all = course().slice(0, frontier() + 1).flatMap(w => w.words);
  return all.filter(w => { const s = ME.words[w.k]; return s && s[1] <= now(); }).sort((a, b) => ME.words[a.k][1] - ME.words[b.k][1]);
}
function buildReview() {
  const fr = frontier(), all = course().slice(0, fr + 1).flatMap(w => w.words);
  let list = dueWords().slice(0, 10);
  if (list.length < 10) list = list.concat(shuffle(W(fr).words.filter(w => !ME.words[w.k] && !list.includes(w))).slice(0, 10 - list.length));
  if (list.length < 10) list = list.concat(pick(all.filter(w => !list.includes(w)), 10 - list.length));
  return list.map((w, i) => i % 3 === 2 ? qVocabType(w, false) : qVocabMC(w, i % 2 ? 'ru' : 'en'));
}

/* ===== запуск заданий ===== */
function startTask(wi, id) {
  if (id === 'learn') return startLearn(wi);
  const wk = W(wi);
  if (id === 'gram') return showLesson(wi, true);
  const qs = id === 'quiz' ? buildQuiz(wi) : id === 'spell' ? buildSpell(wi) : buildBoss(wi);
  const t = TASKS.find(x => x.id === id);
  startRun({ ref: tref(wi, id), taskId: id, week: wi, title: t.n + ' · ' + wk.t, qs, back: '#/week/' + wi });
}
function startGrammar(wi) {
  startRun({ ref: tref(wi, 'gram'), taskId: 'gram', week: wi, title: 'Грамматика · ' + W(wi).g, qs: buildGram(wi), back: '#/week/' + wi });
}
function startReview() { startRun({ ref: 'review', title: 'Повторение слов', qs: buildReview(), back: '#/games' }); }
function startRun(o) {
  S = {
    mode: 'run', ...o, i: 0, queue: o.qs.slice(), total: o.qs.length, correct: 0, hq: 0, xp: 0,
    st: 'ask', hl: 0, hidden: [], built: [], typed: '', sel: null, ok: null, lastGain: 0
  };
  qView();
}

/* ===== подсказки ===== */
const mask = (s, r) => s.split(' ').map(w => { const k = Math.min(w.length, r === 'half' ? Math.ceil(w.length / 2) : r); return w.slice(0, k) + '•'.repeat(w.length - k); }).join(' ');
function hintHtml(q, l) {
  if (!l) return '';
  const tip = q.tip ? `<div>📘 ${esc(q.tip)}</div>` : '';
  if (q.t === 'mc') {
    if (q.kind === 'v') return `<div>🔎 Убрали два лишних варианта.</div>` + (l > 1 ? `<div>Ответ начинается на «<b>${esc(q.opts[q.ans][0])}</b>»</div>` : '');
    return tip + (l > 1 ? '<div>Осталось два варианта.</div>' : '<div>Убрали один лишний вариант.</div>');
  }
  if (q.t === 'type') {
    if (q.kind === 'v') return (q.listen ? `<div>Перевод: <b>${esc(q.w.ru)}</b></div>` : '') + `<div>Слово: <b class="mask">${esc(mask(q.ans[0], l > 1 ? 'half' : 1))}</b></div>`;
    return tip + (l > 1 ? `<div>Слово: <b class="mask">${esc(mask(q.ans[0], 1))}</b></div>` : '');
  }
  const first = q.ans.split(' ');
  return tip + (l > 1 ? `<div>Начало: <b>${esc(first.slice(0, 3).join(' '))}…</b></div>` : `<div>Первое слово: <b>${esc(first[0])}</b></div>`);
}
function useHint() {
  if (S.st !== 'ask' || S.hl >= 2) return;
  const q = S.queue[S.i];
  if (S.hl === 0) S.hq++;
  S.hl++;
  if (q.t === 'mc') {
    const wrong = q.opts.map((_, i) => i).filter(i => i !== q.ans && !S.hidden.includes(i));
    const n = q.kind === 'v' ? (S.hl === 1 ? 2 : 0) : (S.hl === 1 ? 1 : wrong.length - 1);
    S.hidden = S.hidden.concat(shuffle(wrong).slice(0, Math.min(n, Math.max(0, wrong.length - 1))));
  }
  const inp = $('#ans'); if (inp) S.typed = inp.value;
  qView();
}

/* ===== экран вопроса ===== */
const PRAISE = ['Отлично!', 'Верно!', 'Так держать!', 'Супер!', 'В точку!', 'Молодец!'];
function qView() {
  const q = S.queue[S.i], pct = Math.round(100 * S.i / S.queue.length), fb = S.st === 'fb';
  const qt = q.t === 'order' ? esc(q.q) : esc(q.q).replace('___', '<span class="blank">' + (fb ? esc(filled(q)) : '') + '</span>');
  const spk = q.speak ? `<button class="spk${q.listen ? ' big' : ''}" data-act="speak" data-t="${esc(q.speak)}" aria-label="Озвучить">🔊</button>` : '';
  let area = '';
  if (q.t === 'mc') {
    area = '<div class="opts">' + q.opts.map((o, i) => {
      let c = 'opt'; if (S.hidden.includes(i)) c += ' gone';
      if (fb) { if (i === q.ans) c += ' good'; else if (i === S.sel) c += ' badopt'; }
      return `<button class="${c}" data-act="pick" data-i="${i}" ${fb || S.hidden.includes(i) ? 'disabled' : ''}>${esc(o)}</button>`;
    }).join('') + '</div>';
  } else if (q.t === 'type') {
    area = `<input id="ans" class="ans${fb ? (S.ok ? ' good' : ' bad') : ''}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Напиши ответ…" value="${esc(S.typed || '')}" ${fb ? 'disabled' : ''}>`;
  } else {
    area = `<div class="built${fb ? (S.ok ? ' good' : ' bad') : ''}" id="built"></div><div class="bank" id="bank"></div>`;
  }
  const hh = hintHtml(q, S.hl);
  const hint = hh ? `<div class="hintbox">${hh}<small>Подсказка снижает XP за этот вопрос вдвое</small></div>` : '';
  let bottom;
  if (fb) {
    let msg;
    if (S.ok) msg = `<b>${PRAISE[rnd(PRAISE.length)]}</b>` + (S.lastGain ? ` <span class="xpg">+${S.lastGain} XP</span>` : '');
    else msg = `<b>Правильный ответ:</b> ${esc(filled(q))}` + (q.tip ? `<small>📘 ${esc(q.tip)}</small>` : '');
    if (q.kind === 'v') msg += `<small>${esc(q.w.en)} — ${esc(q.w.ru)}</small>`;
    bottom = `<div class="fbbar ${S.ok ? 'ok' : 'bad'}"><div class="fbt">${msg}</div><button class="btn ${S.ok ? 'primary' : 'danger'}" data-act="next" autofocus>Дальше</button></div>`;
  } else {
    bottom = `<div class="rb"><button class="btn ghost" data-act="hint" ${S.hl >= 2 ? 'disabled' : ''}>💡 Подсказка${S.hl ? ' ' + S.hl + '/2' : ''}</button>` +
      (q.t === 'mc' ? '' : `<button class="btn primary" data-act="check" id="cbtn">Проверить</button>`) + '</div>';
  }
  setView(`<div class="run">
    <div class="run-top"><button class="icon" data-act="quit" aria-label="Выйти">✕</button><div class="pbar"><i style="width:${pct}%"></i></div><button class="icon" data-act="sheet" aria-label="Справка">📖</button></div>
    <div class="qwrap"><div class="qlabel">${esc(q.label)}${q.redo ? ' · <b>ещё раз</b>' : ''}</div>
      <div class="qtext">${q.listen ? '' : qt} ${spk}</div>${area}${hint}</div>${bottom}</div>`, 'noTabs');
  if (q.t === 'order') renderOrder();
  if (!fb && q.t === 'type') { const i = $('#ans'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }
  if (!fb && q.speak && S.hl === 0 && (q.listen || q.dir === 'en')) setTimeout(() => speak(q.speak), 250);
}
function filled(q) {
  if (q.t === 'mc') return q.kind === 'v' ? q.opts[q.ans] : q.q.replace('___', q.opts[q.ans]);
  if (q.t === 'type') return q.kind === 'v' ? q.ans[0] : q.q.replace('___', q.ans[0]).replace(/\s*\([^)]*\)\s*$/, '');
  return q.ans;
}
function renderOrder() {
  const q = S.queue[S.i], fb = S.st === 'fb';
  $('#built').innerHTML = S.built.map(i => `<button class="tok" data-act="unbuild" data-i="${i}" ${fb ? 'disabled' : ''}>${esc(q.tokens[i])}</button>`).join('') || '<span class="ph">Нажимай на слова ниже</span>';
  $('#bank').innerHTML = q.tokens.map((t, i) => `<button class="tok${S.built.includes(i) ? ' used' : ''}" data-act="build" data-i="${i}" ${S.built.includes(i) || fb ? 'disabled' : ''}>${esc(t)}</button>`).join('');
}
function answer(val) {
  if (S.st !== 'ask') return;
  const q = S.queue[S.i]; let ok;
  if (q.t === 'mc') { ok = val === q.ans; S.sel = val; }
  else if (q.t === 'type') { if (!String(val).trim()) return; ok = q.ans.some(a => norm(a) === norm(val)); S.typed = val; }
  else { ok = norm(val) === norm(q.ans); }
  S.ok = ok; S.st = 'fb'; S.lastGain = 0;
  if (!q.redo) {
    if (ok) { S.correct++; S.lastGain = Math.round(BASE_XP[q.t] * (S.hl ? .5 : 1)); S.xp += S.lastGain; }
    else S.queue.push({ ...q, redo: true });
    if (q.kind === 'v' && !(ok && S.hl)) rate(q.w, ok);
  }
  ok ? sfx.ok() : sfx.bad();
  qView();
}
function nextQ() {
  S.i++; S.st = 'ask'; S.hl = 0; S.hidden = []; S.built = []; S.typed = ''; S.sel = null;
  if (S.i >= S.queue.length) return finishRun();
  qView();
}

/* ===== итоги, награды ===== */
const QUESTS = [
  { n: 'Набери 400 XP за неделю', max: 400, f: (s, wk) => s.sxWeek[wk] || 0 },
  { n: 'Заверши 6 заданий', max: 6, f: (s, wk) => s.sByWeek[wk] || 0 },
  { n: 'Пройди задание без единой ошибки', max: 1, f: (s, wk) => s.perfWeek[wk] || 0 }
];
const ACH = [
  { id: 'first', e: '👣', n: 'Первый шаг', d: 'Заверши первое задание', f: s => s.sessions >= 1 },
  { id: 'xp100', e: '⭐', n: '200 XP', d: 'Набери 200 очков опыта', f: s => s.xp >= 200 },
  { id: 'xp500', e: '🌟', n: '1000 XP', d: 'Набери 1000 очков опыта', f: s => s.xp >= 1000 },
  { id: 'xp1500', e: '💫', n: '3000 XP', d: 'Набери 3000 очков опыта', f: s => s.xp >= 3000 },
  { id: 'xp5000', e: '🚀', n: '8000 XP', d: 'Набери 8000 очков опыта', f: s => s.xp >= 8000 },
  { id: 's3', e: '🔥', n: 'Серия 3 дня', d: 'Занимайся 3 дня подряд', f: s => s.streak >= 3 },
  { id: 's7', e: '🔥', n: 'Серия 7 дней', d: 'Занимайся неделю без пропусков', f: s => s.streak >= 7 },
  { id: 's21', e: '🌋', n: 'Серия 21 день', d: 'Три недели подряд', f: s => s.streak >= 21 },
  { id: 'perf1', e: '💯', n: 'Ни одной ошибки', d: 'Пройди задание на 100%', f: s => s.perfect >= 1 },
  { id: 'perf10', e: '🎯', n: 'Снайпер', d: '10 заданий на 100%', f: s => s.perfect >= 10 },
  { id: 'w100', e: '📗', n: '100 слов', d: 'Выучи 100 слов', f: s => s.learned >= 100 },
  { id: 'w300', e: '📘', n: '300 слов', d: 'Выучи 300 слов', f: s => s.learned >= 300 },
  { id: 'w650', e: '📕', n: '650 слов', d: 'Базовый словарь освоен!', f: s => s.learned >= 650 },
  { id: 'boss1', e: '🐉', n: 'Победитель босса', d: 'Победи первого босса', f: s => s.bosses >= 1 },
  { id: 'boss5', e: '⚔️', n: 'Охотник на боссов', d: 'Победи 5 боссов', f: s => s.bosses >= 5 },
  { id: 'boss13', e: '🛡️', n: 'Полкурса позади', d: 'Победи 13 боссов', f: s => s.bosses >= 13 },
  { id: 'boss26', e: '🎓', n: 'Выпускник', d: 'Пройди весь курс', f: s => s.bosses >= 26 },
  { id: 'nohint', e: '🧠', n: 'Сам с усам', d: 'Босс на 75%+ без подсказок', f: s => s.noHintBoss >= 1 },
  { id: 'rev10', e: '🔁', n: 'Мастер повторения', d: '10 сессий повторения', f: s => s.reviews >= 10 },
  { id: 'champ1', e: '👑', n: 'Чемпион недели', d: 'Выиграй недельную дуэль', f: s => s.wins >= 1 },
  { id: 'champ5', e: '🏆', n: 'Пятикратный чемпион', d: 'Выиграй 5 дуэлей', f: s => s.wins >= 5 }
];
function duelData() {
  if (!OTHER) return null;
  const a = stats(ME), b = stats(OTHER), cur = weekKey(now());
  const keys = [...new Set([...Object.keys(a.byWeek), ...Object.keys(b.byWeek)])].sort();
  const hist = keys.filter(k => k < cur).map(k => ({ k, me: a.byWeek[k] || 0, ot: b.byWeek[k] || 0 }));
  hist.forEach(h => h.win = h.me > h.ot ? 'me' : h.ot > h.me ? 'ot' : null);
  return { a, b, cur, hist, wins: hist.filter(h => h.win === 'me').length, lost: hist.filter(h => h.win === 'ot').length };
}
function awardChecks() {
  const out = { ach: [], quests: [] }, wk = weekKey(now());
  let st = stats(ME);
  QUESTS.forEach((q, i) => { const id = `Q:${wk}:${i}`; if (!ME.log[id] && q.f(st, wk) >= q.max) { ME.log[id] = [now(), 30, 'q', i]; out.quests.push(q); } });
  st = stats(ME); const d = duelData(); st.wins = d ? d.wins : 0;
  ACH.forEach(a => { if (!ME.ach[a.id] && a.f(st)) { ME.ach[a.id] = now(); out.ach.push(a); } });
  return out;
}
function record(o) { // o: ref, xp, correct, total, hq, pct
  ME.log[now() + '-' + rnd(1e6)] = [now(), o.xp, 's', o.ref, o.correct, o.total, o.hq, o.pct];
}
const starsOf = p => p >= 90 ? 3 : p >= 75 ? 2 : p >= 60 ? 1 : 0;
function finishRun() {
  const pct = Math.round(100 * S.correct / S.total), stars = starsOf(pct);
  let bonus = stars * 10 + (pct === 100 ? 20 : 0), xp = S.xp + bonus, rep = 0;
  if (S.taskId) { const c = tstat(S.week, S.taskId); if (c[2] > 0) { rep = 1; xp = Math.max(5, Math.round(xp * .4)); } }
  const wasBoss = S.taskId === 'boss' && !bossPassed(S.week), w = S.week, id = S.taskId;
  finishCommon({
    ref: S.ref, xp, correct: S.correct, total: S.total, hq: S.hq, pct, stars, title: S.title, back: S.back,
    lines: [['Правильных ответов', `${S.correct} из ${S.total}`], ['XP за ответы', S.xp], ['Бонус за звёзды', bonus], ...(rep ? [['Повторное прохождение', '×0.4']] : [])],
    again: id === 'gram' ? () => startGrammar(w) : id ? () => startTask(w, id) : () => startReview(),
    week: S.week, taskId: S.taskId, bossNew: wasBoss && stars >= 1
  });
}
function finishCommon(r) {
  if (r.taskId != null) {
    const c = tstat(r.week, r.taskId);
    ME.tasks[r.ref] = [Math.max(c[0], r.stars), Math.max(c[1], r.pct), c[2] + 1, now()];
  }
  record(r);
  r.aw = awardChecks();
  persist();
  S = null; LAST = r;
  resultView(r);
}

/* ===== карточки слов ===== */
function startLearn(wi) {
  S = { mode: 'learn', week: wi, taskId: 'learn', ref: tref(wi, 'learn'), deck: shuffle(W(wi).words), total: W(wi).words.length, again: 0, flip: false, back: '#/week/' + wi, title: 'Карточки · ' + W(wi).t };
  learnView();
}
function learnView() {
  const c = S.deck[0], done = S.total - S.deck.length;
  setView(`<div class="run">
    <div class="run-top"><button class="icon" data-act="quit">✕</button><div class="pbar"><i style="width:${Math.round(100 * done / S.total)}%"></i></div><button class="icon" data-act="sheet">📖</button></div>
    <div class="qwrap center"><div class="qlabel">Слово ${done + 1} из ${S.total} · осталось в колоде: ${S.deck.length}</div>
      <button class="card3d${S.flip ? ' flip' : ''}" data-act="flip" aria-label="Перевернуть карточку">
        <span class="face front"><b>${esc(c.en)}</b><small>нажми, чтобы увидеть перевод</small></span>
        <span class="face back"><b>${esc(c.ru)}</b><small>${esc(c.en)}</small></span>
      </button>
      <button class="spk big" data-act="speak" data-t="${esc(c.en)}">🔊 Послушать</button></div>
    ${S.flip ? `<div class="rb"><button class="btn ghost" data-act="again">🔁 Ещё раз</button><button class="btn primary" data-act="known">✅ Знаю</button></div>`
      : `<div class="rb"><button class="btn primary wide" data-act="flip">Показать перевод</button></div>`}</div>`, 'noTabs');
  if (!S.flip) setTimeout(() => speak(c.en), 200);
}
function learnAnswer(known) {
  const c = S.deck.shift();
  if (known) { if (!ME.words[c.k]) ME.words[c.k] = [1, now() + 864e5, now(), 1, 0]; sfx.tap(); }
  else { S.deck.push(c); S.again++; }
  S.flip = false;
  if (!S.deck.length) {
    const stars = S.again <= 4 ? 3 : S.again <= 10 ? 2 : 1, w = S.week;
    let xp = 30 + stars * 5; const rep = tstat(S.week, 'learn')[2] > 0; if (rep) xp = Math.max(5, Math.round(xp * .4));
    return finishCommon({
      ref: S.ref, xp, correct: 0, total: 0, hq: 0, pct: 100, stars, title: S.title, back: S.back, week: S.week, taskId: 'learn',
      lines: [['Слов в колоде', S.total], ['Возвращали карточек', S.again], ...(rep ? [['Повторное прохождение', '×0.4']] : [])],
      again: () => startLearn(w)
    });
  }
  learnView();
}

/* ===== игра «Пары» ===== */
function startPairs(wi) {
  const base = wi != null ? W(wi).words : course().slice(0, frontier() + 1).flatMap(w => w.words);
  S = { mode: 'pairs', ref: 'pairs', base, pool: shuffle(base), round: 0, rounds: 3, mistakes: 0, t0: now(), back: wi != null ? '#/week/' + wi : '#/games', sel: null, left: 0, wi };
  pairsRound();
}
function pairsRound() {
  if (S.pool.length < 6) S.pool = shuffle(S.base);
  S.cur = S.pool.splice(0, 6); S.left = 6; S.sel = null;
  const L = shuffle(S.cur), R = shuffle(S.cur);
  setView(`<div class="run">
    <div class="run-top"><button class="icon" data-act="quit">✕</button><div class="pbar"><i style="width:${Math.round(100 * S.round / S.rounds)}%"></i></div><span class="chip">Раунд ${S.round + 1}/${S.rounds}</span></div>
    <div class="qwrap"><div class="qlabel">Найди пары: слово и его перевод</div>
      <div class="pairs"><div class="pcol">${L.map(w => `<button class="pb" data-act="pp" data-s="l" data-k="${esc(w.k)}">${esc(w.en)}</button>`).join('')}</div>
      <div class="pcol">${R.map(w => `<button class="pb" data-act="pp" data-s="r" data-k="${esc(w.k)}">${esc(w.ru)}</button>`).join('')}</div></div>
      <p class="muted center">Ошибок: <b id="pm">${S.mistakes}</b></p></div></div>`, 'noTabs');
}
function pairsTap(el) {
  if (el.classList.contains('done')) return;
  const side = el.dataset.s, k = el.dataset.k;
  if (side === 'l') speak(S.cur.find(w => w.k === k).en);
  if (S.sel && S.sel.s === side) { S.sel.el.classList.remove('sel'); S.sel = null; }
  if (!S.sel) { S.sel = { s: side, k, el }; el.classList.add('sel'); sfx.tap(); return; }
  const a = S.sel; S.sel = null; a.el.classList.remove('sel');
  if (a.k === k) {
    [a.el, el].forEach(e => { e.classList.add('done'); e.disabled = true; }); sfx.ok();
    if (--S.left === 0) setTimeout(() => { if (!S) return; if (++S.round >= S.rounds) pairsFinish(); else pairsRound(); }, 450);
  } else {
    S.mistakes++; $('#pm').textContent = S.mistakes; sfx.bad();
    [a.el, el].forEach(e => { e.classList.add('shake'); setTimeout(() => e.classList.remove('shake'), 400); });
  }
}
function pairsFinish() {
  const total = 18, secs = Math.round((now() - S.t0) / 1000), fast = secs < 100;
  const xp = Math.max(10, 72 - S.mistakes * 3 + (fast ? 15 : 0));
  const pct = Math.round(100 * total / (total + S.mistakes)), stars = S.mistakes === 0 ? 3 : S.mistakes <= 2 ? 2 : S.mistakes <= 5 ? 1 : 0;
  const wi = S.wi;
  finishCommon({
    ref: 'pairs', xp, correct: total, total: total + S.mistakes, hq: 0, pct, stars, title: 'Пары', back: S.back,
    lines: [['Время', secs + ' с'], ['Ошибок', S.mistakes], ['Бонус за скорость', fast ? '+15' : '—']],
    again: () => startPairs(wi)
  });
}

/* ===== клавиатура ===== */
document.addEventListener('keydown', e => {
  if (!S || S.mode !== 'run') return;
  if (e.key === 'Enter') {
    e.preventDefault();
    if (S.st === 'fb') nextQ();
    else { const q = S.queue[S.i]; if (q.t === 'type') answer($('#ans').value); else if (q.t === 'order') checkOrder(); }
  }
});
function checkOrder() { const q = S.queue[S.i]; if (!S.built.length) return; answer(S.built.map(i => q.tokens[i]).join(' ')); }
