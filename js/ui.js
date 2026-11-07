'use strict';
/* ===== каркас ===== */
let INROUTE = null, VIEWKEY = null; // VIEWKEY — экран, который можно безопасно перерисовать после синхронизации
function setView(html, cls, keep) {
  const y = window.scrollY; VIEWKEY = INROUTE;
  $('#view').innerHTML = html;
  document.body.classList.toggle('run', cls === 'noTabs');
  window.scrollTo(0, keep ? y : 0);
}
function go(h) { if (location.hash === h) route(); else location.hash = h; }
function toast(html, ms = 3600) {
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = html; $('#toasts').appendChild(t);
  setTimeout(() => t.classList.add('out'), ms); setTimeout(() => t.remove(), ms + 400);
}
function confetti() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const box = document.createElement('div'); box.className = 'confetti'; const em = ['🎉', '⭐', '✨', '🎊', '💫'];
  for (let i = 0; i < 30; i++) { const s = document.createElement('span'); s.textContent = em[rnd(em.length)]; s.style.cssText = `left:${rnd(100)}%;animation-delay:${Math.random() * .6}s;animation-duration:${1.8 + Math.random() * 1.4}s;font-size:${16 + rnd(18)}px`; box.appendChild(s); }
  document.body.appendChild(box); setTimeout(() => box.remove(), 3600);
}
const starsHtml = (n, max = 3) => '<span class="stars-i">' + Array.from({ length: max }, (_, i) => `<i class="${i < n ? 'on' : ''}">★</i>`).join('') + '</span>';
const fmtD = d => pad(d.getDate()) + '.' + pad(d.getMonth() + 1);

function route(keep) {
  const h = location.hash.replace(/^#\/?/, '') || 'home', [p, a] = h.split('/');
  if (!CFG.user) { S = null; return pickView(); }
  if (S && S.mode) S = null;
  document.body.dataset.theme = USERS[CFG.user].theme;
  renderTop(); renderTabs(p);
  const wi = Math.max(0, Math.min(course().length - 1, +a || 0));
  INROUTE = p;
  try {
    ({
      home: homeView, week: () => weekView(wi), lesson: () => showLesson(wi, false), duel: duelView, games: gamesView,
      trophies: trophiesView, settings: settingsView
    }[p] || homeView)(keep);
  } finally { INROUTE = null; }
}
function renderTop() {
  const u = USERS[CFG.user], st = stats(ME);
  $('#top').innerHTML = `<a class="who" href="#/home"><span class="av">${u.emoji}</span><span class="wt"><b>${u.name}</b><small>Ур. ${st.level} · ${levelTitle(st.level)}</small></span></a>
  <div class="chips"><span class="chip" title="Опыт">⭐ ${st.xp}</span><span class="chip" title="Дней подряд">🔥 ${st.streak}</span></div>
  <button class="icon" data-act="sheet" data-tab="dict" aria-label="Справка и словарь">📖</button>
  <button class="icon sync ${SYNC.state}" data-act="go" data-h="#/settings" aria-label="Облако" title="${esc(SYNC.msg)}">☁</button>`;
}
function renderTabs(p) {
  const cur = { home: 'home', week: 'home', lesson: 'home', duel: 'duel', games: 'games', trophies: 'trophies', settings: 'settings' }[p] || 'home';
  $('#tabs').innerHTML = [['home', '🗺️', 'Путь'], ['duel', '⚔️', 'Дуэль'], ['games', '🎮', 'Игры'], ['trophies', '🏆', 'Награды'], ['settings', '⚙️', 'Ещё']]
    .map(([id, e, n]) => `<a href="#/${id}" class="${cur === id ? 'on' : ''}"><span>${e}</span>${n}</a>`).join('');
}

/* ===== выбор профиля ===== */
function pickView() {
  setView(`<div class="pick"><div class="logo">🎓</div><h1>English Duel</h1><p class="muted">Учим английский и соревнуемся. Кто сегодня занимается?</p>
  ${Object.entries(USERS).map(([id, u]) => `<button class="pcard" data-theme="${u.theme}" data-act="pickuser" data-u="${id}"><span class="av xl">${u.emoji}</span><span><b>${u.name}</b><small>${u.course} · ${u.level}</small></span></button>`).join('')}
  </div>`, 'noTabs');
}

/* ===== главная: путь ===== */
function homeView(keep) {
  const c = course(), st = stats(ME), fr = frontier(), nt = nextTask(fr), wk = weekKey(now()), u = USERS[CFG.user];
  const base = levelBase(st.level), nxt = levelBase(st.level + 1), lp = Math.round(100 * (st.xp - base) / (nxt - base));
  const goal = 100, gp = Math.min(100, Math.round(100 * st.today / goal));
  const hr = new Date().getHours(), hi = hr < 5 ? 'Доброй ночи' : hr < 12 ? 'Доброе утро' : hr < 18 ? 'Добрый день' : 'Добрый вечер';
  const mon = mondayOf(now()), sun = new Date(mon); sun.setDate(sun.getDate() + 6);
  const ot = OTHER ? stats(OTHER) : null, mw = st.byWeek[wk] || 0, ow = ot ? ot.byWeek[wk] || 0 : 0;
  const due = dueWords().length, V = USERS[otherUser()];
  const quests = QUESTS.map((q, i) => {
    const v = Math.min(q.max, q.f(st, wk)), done = !!ME.log[`Q:${wk}:${i}`];
    return `<li class="${done ? 'done' : ''}"><span>${done ? '✅' : '🎯'} ${q.n}</span><b>+30 XP</b><div class="bar"><i style="width:${Math.round(100 * v / q.max)}%"></i></div></li>`;
  }).join('');
  let path = '';
  c.forEach((w, i) => {
    if (i % 4 === 0) path += `<div class="month">Месяц ${i / 4 + 1}</div>`;
    const state = !weekUnlocked(i) ? 'lock' : bossPassed(i) ? 'done' : i === fr ? 'now' : 'open';
    path += `<a class="node ${state}" href="#/week/${i}"><span class="num">${state === 'done' ? '✓' : state === 'lock' ? '🔒' : i + 1}</span>
      <span class="nbody"><b>${w.e} ${esc(w.t)}</b><small>${esc(w.g)}</small></span>
      <span class="nstars">${state === 'now' ? '<em>сейчас</em>' : state === 'lock' ? '' : '★ ' + weekStars(i) + '/15'}</span></a>`;
  });
  setView(`
  <section class="card hero">
    <div class="hero-l"><small>${hi},</small><h1>${u.name}!</h1>
      <div class="lvl"><b>Уровень ${st.level}</b> · ${levelTitle(st.level)}</div>
      <div class="bar"><i style="width:${lp}%"></i></div><small class="muted">${st.xp - base} / ${nxt - base} XP до уровня ${st.level + 1}</small></div>
    <div class="ring" style="--p:${gp}" title="Цель на день"><b>${st.today}</b><small>из ${goal} XP</small></div>
  </section>
  ${nt ? `<button class="card cta" data-act="task" data-w="${fr}" data-t="${nt.id}"><span class="te">${nt.e}</span><span><small>Продолжить · Неделя ${fr + 1}</small><b>${nt.n}</b><em>${esc(c[fr].t)}</em></span><span class="go">▶</span></button>`
      : `<section class="card cta done"><span class="te">🎓</span><span><b>Курс пройден!</b><em>Повторяй слова и играй в пары</em></span></section>`}
  <section class="card">
    <div class="sec-h"><h2>⚔️ Челлендж недели</h2><small class="muted">${fmtD(mon)} – ${fmtD(sun)}</small></div>
    ${ot ? `<a class="vs-mini" href="#/duel"><span><b>${mw}</b> XP<small>${u.name}</small></span><div class="split"><i style="width:${Math.round(100 * mw / Math.max(1, mw + ow))}%"></i></div><span class="r"><b>${ow}</b> XP<small>${V.name}</small></span></a>`
      : `<a class="vs-mini empty" href="#/settings">Подключи облако, чтобы видеть результаты ${V.name} →</a>`}
    <ul class="quests">${quests}</ul>
  </section>
  <div class="row2">
    <button class="card mini" data-act="review"><span class="te">🔁</span><b>Повторение</b><small>${due ? due + ' ' + plural(due, 'слово', 'слова', 'слов') + ' ждут' : 'Тренировка дня'}</small></button>
    <button class="card mini" data-act="pairs" data-w=""><span class="te">🧩</span><b>Пары</b><small>Быстрая игра на слова</small></button>
  </div>
  <section class="path"><h2>🗺️ Курс «${u.course}»</h2>${path}</section>`, '', keep);
}

/* ===== неделя ===== */
function weekView(i) {
  const w = W(i), unl = weekUnlocked(i);
  if (!unl) {
    return setView(`<a class="back" href="#/home">← Путь</a><section class="card lockcard"><div class="big">🔒</div><h1>Неделя ${i + 1}: ${esc(w.t)}</h1><p class="muted">Откроется, когда ты победишь босса недели ${i}.</p><a class="btn primary" href="#/week/${frontier()}">К текущей неделе</a></section>`);
  }
  const tasks = TASKS.map((T, n) => {
    const locked = T.id === 'boss' && !weekCleared(i), done = taskDone(i, T.id), s = taskStars(i, T.id);
    return `<button class="task${locked ? ' lock' : ''}${done ? ' done' : ''}" data-act="task" data-w="${i}" data-t="${T.id}" ${locked ? 'disabled' : ''}>
      <span class="te">${locked ? '🔒' : T.e}</span><span class="tb"><b>${n + 1}. ${T.n}</b><small>${locked ? 'Сначала пройди задания 1–4' : T.id === 'gram' ? esc(w.g) : T.d}</small></span>
      <span class="ts">${T.id === 'learn' ? (done ? '✓' : '') : starsHtml(s)}</span></button>`;
  }).join('');
  const sp = Math.round(100 * weekStars(i) / 15);
  setView(`<a class="back" href="#/home">← Путь</a>
  <section class="card whead"><span class="wbig">${w.e}</span><div><small class="muted">Неделя ${i + 1} из ${course().length}</small><h1>${esc(w.t)}</h1><span class="pill">${esc(w.g)}</span></div></section>
  <div class="wprog"><div class="bar"><i style="width:${sp}%"></i></div><small class="muted">★ ${weekStars(i)} из 15</small></div>
  <div class="tasks">${tasks}</div>
  <a class="card linkrow" href="#/lesson/${i}"><span class="te">📘</span><span><b>Урок: ${esc(w.g)}</b><small>Правило и примеры — всегда под рукой</small></span><span class="go">›</span></a>
  <details class="card words"><summary><b>📖 Слова недели</b> <small class="muted">${w.words.length}</small></summary>
    ${w.words.map(x => `<div class="wrow"><button class="spk" data-act="speak" data-t="${esc(x.en)}" aria-label="Озвучить">🔊</button><b>${esc(x.en)}</b><span>${esc(x.ru)}</span></div>`).join('')}</details>
  <div class="row2"><button class="card mini" data-act="pairs" data-w="${i}"><span class="te">🧩</span><b>Пары</b><small>Слова этой недели</small></button></div>`);
}
function showLesson(wi, practice) {
  const w = W(wi);
  setView(`<a class="back" href="#/week/${wi}">← Неделя ${wi + 1}</a>
  <article class="card lesson"><span class="pill">Грамматика</span><h1>${esc(w.g)}</h1>${w.l}<div class="tipbox">💡 ${esc(w.tip)}</div></article>
  ${practice ? `<div class="rb stack"><button class="btn primary wide" data-act="startgram" data-w="${wi}">Начать упражнения (${w.ex.length}) ▶</button></div>` : ''}`);
}

/* ===== результат ===== */
function resultView(r) {
  const msg = r.stars === 3 ? 'Блестяще! 🌟' : r.stars === 2 ? 'Отличная работа!' : r.stars === 1 ? 'Хорошо, засчитано!' : 'Почти! Попробуй ещё раз';
  const isBoss = r.taskId === 'boss';
  const unlock = r.bossNew ? (r.week + 1 < course().length ? `<div class="banner good">🎉 Босс побеждён! Открыта неделя ${r.week + 2}: ${esc(W(r.week + 1).t)}</div>` : `<div class="banner good">🎓 Ты прошёл весь курс! Поздравляем!</div>`) :
    isBoss && r.stars < 1 ? `<div class="banner bad">Чтобы победить босса, нужно набрать 60% и больше.</div>` : '';
  setView(`<section class="result">
    <div class="rtitle">${esc(r.title)}</div>
    <div class="rstars">${[0, 1, 2].map(i => `<i class="${i < r.stars ? 'on' : ''}" style="animation-delay:${.15 + i * .2}s">★</i>`).join('')}</div>
    <h1>${msg}</h1>
    ${r.total ? `<div class="pct">${r.pct}%</div>` : ''}
    <div class="xpbig">+${r.xp} XP</div>
    <ul class="lines">${r.lines.map(([a, b]) => `<li><span>${a}</span><b>${b}</b></li>`).join('')}</ul>
    ${unlock}
    ${r.aw.quests.map(q => `<div class="banner gold">🎯 Квест выполнен: ${q.n} <b>+30 XP</b></div>`).join('')}
    ${r.aw.ach.map(a => `<div class="banner gold"><span class="ae">${a.e}</span> Новая награда: <b>${a.n}</b></div>`).join('')}
    <div class="rb stack"><button class="btn primary wide" data-act="go" data-h="${r.back}">Продолжить</button><button class="btn ghost wide" data-act="redo">Ещё раз</button></div></section>`);
  renderTop();
  if (r.stars >= 1) sfx.win();
  if (r.stars >= 2 || r.bossNew) confetti();
}

/* ===== игры ===== */
function gamesView() {
  const due = dueWords().length, st = stats(ME);
  setView(`<h1 class="ph1">🎮 Игры и повторение</h1>
  <button class="card cta" data-act="review"><span class="te">🔁</span><span><small>Интервальное повторение</small><b>Повторение слов</b><em>${due ? due + ' ' + plural(due, 'слово', 'слова', 'слов') + ' пора повторить' : 'Всё повторено — можно потренироваться ещё'}</em></span><span class="go">▶</span></button>
  <button class="card cta alt" data-act="pairs" data-w=""><span class="te">🧩</span><span><small>3 раунда по 6 пар</small><b>Пары</b><em>Соедини слово и перевод — на скорость</em></span><span class="go">▶</span></button>
  <button class="card cta alt2" data-act="sheet" data-tab="dict"><span class="te">📖</span><span><small>Всегда под рукой</small><b>Словарь и правила</b><em>Поиск по всем твоим словам и урокам</em></span><span class="go">▶</span></button>
  <section class="card"><h2>Твоя память</h2><div class="statgrid">
    <div><b>${st.seen}</b><small>слов встречено</small></div><div><b>${st.learned}</b><small>выучено</small></div><div><b>${due}</b><small>к повторению</small></div></div>
    <p class="muted small">Слово считается выученным, когда ты правильно вспомнил его несколько раз подряд — с растущими паузами (1, 2, 4, 7, 14 дней).</p></section>`);
}

/* ===== дуэль ===== */
function duelView() {
  const me = stats(ME), ot = OTHER ? stats(OTHER) : null, wk = weekKey(now()), U = USERS[CFG.user], V = USERS[otherUser()];
  const mw = me.byWeek[wk] || 0, ow = ot ? ot.byWeek[wk] || 0 : 0, d = duelData();
  const lead = !ot ? '' : mw > ow ? `${U.name} впереди на ${mw - ow} XP` : ow > mw ? `${V.name} впереди на ${ow - mw} XP` : 'Пока ничья!';
  const mon = mondayOf(now()), sun = new Date(mon); sun.setDate(sun.getDate() + 6);
  const rows = [['Всего XP', 'xp'], ['Уровень', 'level'], ['Дней подряд 🔥', 'streak'], ['Слов выучено', 'learned'], ['Боссов побеждено', 'bosses'], ['Звёзд ★', 'stars'], ['Точность', 'acc', '%']].map(([n, k, suf]) => {
    const a = me[k], b = ot ? ot[k] : null;
    return `<div class="drow"><b class="${b != null && a > b ? 'lead' : ''}">${a}${suf || ''}</b><span>${n}</span><b class="${b != null && b > a ? 'lead' : ''}">${b == null ? '—' : b + (suf || '')}</b></div>`;
  }).join('');
  let days = '', max = 50;
  const dl = Array.from({ length: 7 }, (_, i) => { const t = new Date(mon); t.setDate(t.getDate() + i); return t; });
  dl.forEach(t => { const k = dayKey(t); max = Math.max(max, me.byDay[k] || 0, ot ? ot.byDay[k] || 0 : 0); });
  dl.forEach((t, i) => {
    const k = dayKey(t), a = me.byDay[k] || 0, b = ot ? ot.byDay[k] || 0 : 0;
    days += `<div class="dcol${k === dayKey(now()) ? ' today' : ''}"><div class="bars"><i class="a" style="height:${Math.round(100 * a / max)}%" title="${a} XP"></i><i class="b" style="height:${Math.round(100 * b / max)}%" title="${b} XP"></i></div><small>${'ПВСЧПСВ'[i]}</small></div>`;
  });
  const cups = d && d.hist.length ? d.hist.slice(-8).reverse().map(h => `<li><span>${h.k.replace('-W', ' · нед. ')}</span><span>${h.me} : ${h.ot}</span><b>${h.win === 'me' ? '🏆 ' + U.name : h.win === 'ot' ? '🏆 ' + V.name : '🤝 ничья'}</b></li>`).join('') : '<li class="muted">Первая дуэль завершится в воскресенье — тогда появится первый кубок.</li>';
  setView(`<h1 class="ph1">⚔️ Дуэль недели</h1>
  <section class="card vs">
    <div class="pl ${mw > ow ? 'win' : ''}"><span class="av xl">${U.emoji}</span><b>${U.name}</b><div class="xpn">${mw}</div><small>XP за неделю</small></div>
    <div class="vsmid">VS</div>
    <div class="pl ${ow > mw ? 'win' : ''}"><span class="av xl">${V.emoji}</span><b>${V.name}</b><div class="xpn">${ot ? ow : '—'}</div><small>${ot ? 'XP за неделю' : 'нет данных'}</small></div>
    <div class="split wide"><i style="width:${Math.round(100 * mw / Math.max(1, mw + ow))}%"></i></div>
    <p class="lead-t">${ot ? lead : `Данные ${V.name} появятся после подключения облака.`}</p>
    <small class="muted">${fmtD(mon)} – ${fmtD(sun)} · итоги подводятся в воскресенье вечером</small>
  </section>
  ${ot ? '' : `<a class="banner gold" href="#/settings">☁ Подключи синхронизацию в разделе «Ещё», чтобы видеть друг друга с любого устройства →</a>`}
  <section class="card"><div class="sec-h"><h2>Сравнение</h2><small class="muted"><span class="dot a"></span>${U.name} <span class="dot b"></span>${V.name}</small></div>
    <div class="dhead"><b>${U.name}</b><span></span><b>${V.name}</b></div>${rows}</section>
  <section class="card"><h2>Эта неделя по дням</h2><div class="dchart">${days}</div></section>
  <section class="card"><div class="sec-h"><h2>🏆 Кубки недель</h2>${d ? `<b>${d.wins} : ${d.lost}</b>` : ''}</div><ul class="cups">${cups}</ul></section>
  <p class="muted small center">Курсы у вас разные, поэтому соревнуетесь по XP: одинаковое усилие — одинаковые очки.</p>`);
}

/* ===== награды ===== */
function trophiesView() {
  const st = stats(ME), d = duelData(); st.wins = d ? d.wins : 0;
  const got = ACH.filter(a => ME.ach[a.id]).length, base = levelBase(st.level);
  setView(`<h1 class="ph1">🏆 Награды</h1>
  <section class="card statgrid big">
    <div><b>${st.xp}</b><small>XP всего</small></div><div><b>${st.level}</b><small>уровень</small></div><div><b>${st.learned}</b><small>слов выучено</small></div>
    <div><b>${st.acc}%</b><small>точность</small></div><div><b>${st.bosses}</b><small>боссов</small></div><div><b>${st.stars}</b><small>звёзд</small></div></section>
  <section class="card"><div class="sec-h"><h2>Достижения</h2><b>${got} / ${ACH.length}</b></div>
    <div class="achs">${ACH.map(a => `<div class="ach${ME.ach[a.id] ? ' on' : ''}" title="${esc(a.d)}"><span class="ae">${ME.ach[a.id] ? a.e : '🔒'}</span><b>${a.n}</b><small>${a.d}</small></div>`).join('')}</div></section>
  <section class="card"><h2>Ступени уровней</h2><p class="muted small">Уровень ${st.level}: «${levelTitle(st.level)}». Следующий уровень — через ${levelBase(st.level + 1) - st.xp} XP.</p></section>`);
}

/* ===== настройки ===== */
function settingsView() {
  const u = USERS[CFG.user];
  setView(`<h1 class="ph1">⚙️ Ещё</h1>
  <section class="card"><div class="sec-h"><h2>Профиль</h2></div><div class="prow"><span class="av">${u.emoji}</span><b>${u.name}</b><small class="muted">${u.course}</small><button class="btn ghost sm" data-act="switch">Сменить</button></div></section>
  <section class="card"><div class="sec-h"><h2>☁ Облако (GitHub)</h2><span class="sync-pill ${SYNC.state}" id="syncmsg">${esc(SYNC.msg)}</span></div>
    <p class="muted small">Прогресс хранится в вашем репозитории (<code>data/progress/*.json</code>) и подтягивается на любом устройстве.</p>
    <label>Репозиторий <input id="f-repo" class="ans" placeholder="логин/название-репозитория" value="${esc(CFG.repo)}" autocomplete="off"></label>
    <label>Ветка <input id="f-br" class="ans" value="${esc(CFG.branch)}" autocomplete="off"></label>
    <label>Токен (для записи) <input id="f-tok" class="ans" type="password" placeholder="github_pat_…" value="${esc(CFG.token)}" autocomplete="off"></label>
    <div class="rb"><button class="btn primary" data-act="savecloud">Сохранить и синхронизировать</button></div>
    <details class="how"><summary>Как это настроить (один раз)</summary><ol>
      <li>Загрузите папку приложения в репозиторий на GitHub и включите <b>Pages</b> (Settings → Pages → Deploy from branch).</li>
      <li>Создайте токен: GitHub → Settings → Developer settings → <b>Fine-grained tokens</b>. Доступ — только к этому репозиторию, право <b>Contents: Read and write</b>.</li>
      <li>На каждом устройстве введите репозиторий и токен здесь. Токен хранится только в этом браузере и никуда не отправляется, кроме GitHub.</li>
      <li>Без токена приложение только читает данные: прогресс соперника виден, но свой не сохраняется в облаке.</li></ol></details></section>
  <section class="card"><h2>Настройки</h2>
    <label class="sw"><span>Звуки</span><input type="checkbox" data-act="toggle" data-k="sound" ${CFG.sound ? 'checked' : ''}></label>
    <label class="sw"><span>Режим учителя: открыть все недели</span><input type="checkbox" data-act="toggle" data-k="teacher" ${CFG.teacher ? 'checked' : ''}></label>
    ${HAS_TTS ? '' : '<p class="muted small">⚠️ Этот браузер не умеет озвучивать слова. Откройте приложение в Chrome, Edge или Safari.</p>'}</section>
  <section class="card"><h2>Резервная копия</h2><div class="rb wrap"><button class="btn ghost" data-act="export">⬇ Скачать прогресс</button><button class="btn ghost" data-act="import">⬆ Загрузить</button><button class="btn ghost" data-act="refresh">↻ Обновить с облака</button></div>
    <input id="imp" type="file" accept=".json,application/json" hidden></section>
  <p class="muted small center">English Duel · данные на этом устройстве: ${Object.keys(ME.log).length} записей</p>`);
}
function updSyncMsg() { const e = $('#syncmsg'); if (e) { e.textContent = SYNC.msg; e.className = 'sync-pill ' + SYNC.state; } }

/* ===== справка (всегда под рукой) ===== */
function openSheet(tab) {
  const ctx = S && S.week != null ? S.week : frontier(), sh = $('#sheet');
  sh.hidden = false; sh.dataset.ctx = ctx; document.body.classList.add('sheet-open');
  sh.innerHTML = `<div class="sh-back" data-act="closesheet"></div><div class="sh-panel" role="dialog" aria-label="Справка">
    <div class="sh-head"><div class="seg"><button class="${tab === 'dict' ? 'on' : ''}" data-act="sheet" data-tab="dict">📖 Словарь</button><button class="${tab === 'gram' ? 'on' : ''}" data-act="sheet" data-tab="gram">🧩 Грамматика</button></div><button class="icon" data-act="closesheet" aria-label="Закрыть">✕</button></div>
    <div class="sh-body" id="shb"></div></div>`;
  tab === 'dict' ? dictRender() : gramRender();
}
function closeSheet() { const sh = $('#sheet'); sh.hidden = true; sh.innerHTML = ''; document.body.classList.remove('sheet-open'); }
function dictRender() {
  const ctx = +$('#sheet').dataset.ctx;
  $('#shb').innerHTML = `<input id="dq" class="ans" placeholder="Поиск: слово или перевод…" autocomplete="off"><select id="dw" class="sel"><option value="c">Слова недели ${ctx + 1}: ${esc(W(ctx).t)}</option><option value="a">Все открытые недели</option></select><div id="dl"></div>`;
  dictList();
}
function dictList() {
  const ctx = +$('#sheet').dataset.ctx, q = ($('#dq').value || '').trim().toLowerCase(), all = $('#dw').value === 'a' || q;
  const ws = all ? course().filter((w, i) => weekUnlocked(i)) : [W(ctx)];
  let rows = ws.flatMap(w => w.words.map(x => ({ ...x, wt: w.i })));
  if (q) rows = rows.filter(x => x.en.toLowerCase().includes(q) || x.ru.toLowerCase().includes(q));
  const n = rows.length; rows = rows.slice(0, 150);
  $('#dl').innerHTML = rows.map(x => `<div class="wrow"><button class="spk" data-act="speak" data-t="${esc(x.en)}" aria-label="Озвучить">🔊</button><b>${esc(x.en)}</b><span>${esc(x.ru)}</span>${all ? `<small>нед. ${x.wt + 1}</small>` : ''}</div>`).join('') + (n > 150 ? `<p class="muted small center">Показаны первые 150 из ${n}. Уточни запрос.</p>` : '') || '<p class="muted center">Ничего не найдено</p>';
}
function gramRender() {
  const ctx = +$('#sheet').dataset.ctx;
  $('#shb').innerHTML = course().filter((w, i) => weekUnlocked(i)).map(w => `<details class="gd" ${w.i === ctx ? 'open' : ''}><summary><b>Неделя ${w.i + 1}</b> · ${esc(w.g)}</summary><div class="lesson">${w.l}<div class="tipbox">💡 ${esc(w.tip)}</div></div></details>`).join('');
}

/* ===== события ===== */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const a = el.dataset.act, d = el.dataset;
  switch (a) {
    case 'go': go(d.h); break;
    case 'speak': speak(d.t); break;
    case 'sheet': openSheet(d.tab || 'dict'); break;
    case 'closesheet': closeSheet(); break;
    case 'pickuser': CFG.user = d.u; saveCfg(); loadLocal(); document.body.dataset.theme = USERS[d.u].theme; go('#/home'); sync(); break;
    case 'switch': CFG.user = null; saveCfg(); route(); break;
    case 'task': startTask(+d.w, d.t); break;
    case 'startgram': startGrammar(+d.w); break;
    case 'review': startReview(); break;
    case 'pairs': startPairs(d.w === '' || d.w == null ? null : +d.w); break;
    case 'redo': if (LAST) LAST.again(); break;
    case 'pick': if (S && S.mode === 'run') answer(+d.i); break;
    case 'check': { const q = S.queue[S.i]; q.t === 'type' ? answer($('#ans').value) : checkOrder(); break; }
    case 'next': nextQ(); break;
    case 'hint': useHint(); break;
    case 'build': if (S.st === 'ask') { S.built.push(+d.i); renderOrder(); sfx.tap(); } break;
    case 'unbuild': if (S.st === 'ask') { S.built = S.built.filter(i => i !== +d.i); renderOrder(); } break;
    case 'flip': S.flip = true; learnView(); break;
    case 'known': learnAnswer(true); break;
    case 'again': learnAnswer(false); break;
    case 'pp': pairsTap(el); break;
    case 'quit': if (confirm('Выйти из задания? Результат не сохранится.')) { const b = S.back || '#/home'; S = null; go(b); } break;
    case 'toggle': CFG[d.k] = el.checked; saveCfg(); if (d.k === 'teacher') toast(CFG.teacher ? '🔓 Все недели открыты' : '🔒 Недели снова открываются по порядку'); break;
    case 'savecloud':
      CFG.repo = $('#f-repo').value.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '').replace(/\/+$/, '');
      CFG.branch = $('#f-br').value.trim() || 'main'; CFG.token = $('#f-tok').value.trim(); saveCfg();
      if (!CFG.repo) { SYNC = { state: 'off', msg: 'Репозиторий не указан' }; updSyncMsg(); break; }
      sync().then(() => { updSyncMsg(); toast(SYNC.state === 'err' ? '⚠️ ' + esc(SYNC.msg) : '☁ ' + esc(SYNC.msg)); }); break;
    case 'refresh': sync().then(() => { route(true); toast(SYNC.state === 'err' ? '⚠️ ' + esc(SYNC.msg) : '↻ Данные обновлены'); }); break;
    case 'export': {
      const b = new Blob([JSON.stringify(ME)], { type: 'application/json' }), l = document.createElement('a');
      l.href = URL.createObjectURL(b); l.download = `progress-${CFG.user}.json`; l.click(); setTimeout(() => URL.revokeObjectURL(l.href), 2000); break;
    }
    case 'import': $('#imp').click(); break;
  }
});
document.addEventListener('change', e => {
  if (e.target.id === 'dw') dictList();
  if (e.target.id === 'imp' && e.target.files[0]) {
    const fr = new FileReader();
    fr.onload = () => { try { ME = merge(ME, JSON.parse(fr.result)); persist(); route(true); toast('✅ Прогресс загружен'); } catch (x) { toast('⚠️ Не удалось прочитать файл'); } };
    fr.readAsText(e.target.files[0]);
  }
});
document.addEventListener('input', e => { if (e.target.id === 'dq') dictList(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#sheet').hidden) closeSheet(); });
window.addEventListener('hashchange', () => route());
document.addEventListener('visibilitychange', () => { if (!document.hidden && CFG.user && !S && now() - (SYNC.t || 0) > 60000) sync(); });

/* ===== старт ===== */
onSync = () => {
  const i = $('.sync'); if (i) { i.className = 'icon sync ' + SYNC.state; i.title = SYNC.msg; }
  updSyncMsg();
  if (SYNC.state !== 'busy' && !S && ['home', 'duel', 'trophies'].includes(VIEWKEY)) route(true);
};
if (CFG.user) { loadLocal(); document.body.dataset.theme = USERS[CFG.user].theme; }
route();
if (CFG.user) sync();
