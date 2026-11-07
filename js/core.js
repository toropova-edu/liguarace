'use strict';
/* ===== утилиты ===== */
const $ = (s, e = document) => e.querySelector(s);
const $$ = (s, e = document) => [...e.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rnd = n => Math.floor(Math.random() * n);
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1);[a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };
const now = () => Date.now();
const pad = n => String(n).padStart(2, '0');
const dayKey = t => { const d = new Date(t); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const mondayOf = t => { const d = new Date(t); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; };
function weekKey(t) { // ISO-неделя (пн–вс)
  const d = new Date(t); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const w1 = new Date(d.getFullYear(), 0, 4);
  const wk = 1 + Math.round(((d - w1) / 864e5 - 3 + ((w1.getDay() + 6) % 7)) / 7);
  return d.getFullYear() + '-W' + pad(wk);
}
const plural = (n, a, b, c) => { n = Math.abs(n) % 100; const m = n % 10; return n > 10 && n < 20 ? c : m > 1 && m < 5 ? b : m === 1 ? a : c; };

/* ===== пользователи и настройки ===== */
const USERS = {
  evgenia: { name: 'Евгения', emoji: '🌸', course: 'Английский с нуля', level: 'A0 → A1+', theme: 'rose' },
  bogdan: { name: 'Богдан', emoji: '🚀', course: 'Weak A2 → A2+', level: 'A2 → B1', theme: 'sky' }
};
const CFG = Object.assign({ user: null, repo: '', branch: 'main', token: '', teacher: false, sound: true }, load('ep_cfg', {}));
// профиль выбирается при каждом новом открытии сайта (в пределах вкладки запоминается)
CFG.last = CFG.user; CFG.user = null;
try { CFG.user = sessionStorage.getItem('ep_user') || null; } catch (e) { }
const saveCfg = () => { const { user, ...rest } = CFG; save('ep_cfg', { ...rest, user: user || CFG.last }); };
function setUser(u) { CFG.user = u; if (u) CFG.last = u; try { u ? sessionStorage.setItem('ep_user', u) : sessionStorage.removeItem('ep_user'); } catch (e) { } saveCfg(); }
if (!CFG.repo) {
  CFG.repo = 'toropova-edu/liguarace';
  if (/\.github\.io$/.test(location.hostname) && location.pathname.split('/')[1]) CFG.repo = location.hostname.split('.')[0] + '/' + location.pathname.split('/')[1];
}
const otherUser = () => CFG.user === 'evgenia' ? 'bogdan' : 'evgenia';

/* ===== курс ===== */
function course(u = CFG.user) {
  const c = COURSE_WEEKS[u];
  if (!c._p) {
    c.forEach((w, i) => {
      w.i = i;
      w.words = w.v.split(/;|\n/).map(s => s.trim()).filter(Boolean).map(s => {
        const p = s.indexOf('='); const en = s.slice(0, p).trim(), ru = s.slice(p + 1).trim();
        return { en, ru, k: en.toLowerCase(), w: i };
      });
      w.ex = w.x.split('\n').map(s => s.trim()).filter(Boolean).map(parseEx);
    });
    c._p = 1;
  }
  return c;
}
function parseEx(s) {
  const p = s.split('|');
  if (p[0] === 'c') return { t: 'c', q: p[1], ans: p[2], wrong: (p[3] || '').split(',') };
  if (p[0] === 't') return { t: 't', q: p[1], ans: [p[2], ...(p[3] ? p[3].split('/') : [])].map(x => x.trim()).filter(Boolean) };
  return { t: 'o', ru: p[1], en: p[2] };
}
// сравнение ответов: регистр, знаки, сокращения
function norm(s) {
  s = String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[.,!?;:"“”]/g, ' ');
  s = s.replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not').replace(/\bwon't\b/g, 'will not')
    .replace(/n't\b/g, ' not').replace(/\bi'm\b/g, 'i am').replace(/'re\b/g, ' are').replace(/'ve\b/g, ' have')
    .replace(/'ll\b/g, ' will').replace(/\blet's\b/g, 'let us');
  return s.replace(/\s+/g, ' ').trim();
}

/* ===== данные ученика (мерж без конфликтов) ===== */
const emptyData = () => ({ v: 1, log: {}, tasks: {}, words: {}, ach: {}, upd: 0 });
function merge(a, b) {
  const o = emptyData();
  for (const s of [a, b]) {
    if (!s) continue;
    Object.assign(o.log, s.log);
    for (const [k, v] of Object.entries(s.tasks || {})) {
      const c = o.tasks[k];
      o.tasks[k] = c ? [Math.max(c[0], v[0]), Math.max(c[1], v[1]), Math.max(c[2], v[2]), Math.max(c[3], v[3])] : v.slice();
    }
    for (const [k, v] of Object.entries(s.words || {})) { const c = o.words[k]; if (!c || v[2] > c[2]) o.words[k] = v; }
    for (const [k, v] of Object.entries(s.ach || {})) { if (!o.ach[k] || v < o.ach[k]) o.ach[k] = v; }
    o.upd = Math.max(o.upd, s.upd || 0);
  }
  return o;
}
let ME = emptyData(), OTHER = null;
function loadLocal() {
  ME = merge(emptyData(), load('ep_data_' + CFG.user, null));
  OTHER = load('ep_other_' + otherUser(), null);
}

/* ===== синхронизация через GitHub (файлы data/progress/*.json) ===== */
let SYNC = { state: 'off', msg: 'Только это устройство' }, syncTimer = null, onSync = () => { };
const isDirty = () => load('ep_dirty_' + CFG.user, false);
function persist() {
  ME.upd = now(); save('ep_data_' + CFG.user, ME); save('ep_dirty_' + CFG.user, true);
  clearTimeout(syncTimer); syncTimer = setTimeout(() => sync(), 2500);
}
const gh = (path, o = {}) => fetch(`https://api.github.com/repos/${CFG.repo}/contents/${path}`, {
  ...o, cache: 'no-store',
  headers: { Accept: 'application/vnd.github+json', ...(CFG.token ? { Authorization: 'Bearer ' + CFG.token } : {}), ...(o.headers || {}) }
});
const b64enc = s => { const b = new TextEncoder().encode(s); let x = ''; b.forEach(c => x += String.fromCharCode(c)); return btoa(x); };
const b64dec = s => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g, '')), c => c.charCodeAt(0)));
async function fetchRemote(user) {
  const r = await gh(`data/progress/${user}.json?ref=${encodeURIComponent(CFG.branch)}&t=${now()}`);
  if (r.status === 404) return { data: null, sha: null };
  if (!r.ok) throw new Error(r.status === 403 ? 'Лимит запросов GitHub, попробуйте позже' : 'GitHub ответил ' + r.status);
  const j = await r.json();
  return { data: JSON.parse(b64dec(j.content)), sha: j.sha };
}
async function sync() {
  clearTimeout(syncTimer);
  if (!CFG.repo || !CFG.user) { SYNC = { state: 'off', msg: 'Только это устройство' }; onSync(); return; }
  SYNC = { state: 'busy', msg: 'Синхронизация…' }; onSync();
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      const { data, sha } = await fetchRemote(CFG.user);
      ME = merge(ME, data); save('ep_data_' + CFG.user, ME);
      if (CFG.token && (isDirty() || !sha)) {
        save('ep_dirty_' + CFG.user, false);
        const r = await gh(`data/progress/${CFG.user}.json`, {
          method: 'PUT',
          body: JSON.stringify({ message: 'progress: ' + CFG.user, content: b64enc(JSON.stringify(ME)), branch: CFG.branch, ...(sha ? { sha } : {}) })
        });
        if (r.status === 409 || r.status === 422) { save('ep_dirty_' + CFG.user, true); continue; }
        if (!r.ok) { save('ep_dirty_' + CFG.user, true); throw new Error(r.status === 401 || r.status === 403 ? 'Токен не подходит (нет прав на запись)' : 'Запись: ' + r.status); }
      }
      break;
    }
    try { const o = await fetchRemote(otherUser()); if (o.data) { OTHER = o.data; save('ep_other_' + otherUser(), OTHER); } } catch (e) { }
    SYNC = { state: CFG.token ? 'ok' : 'ro', msg: CFG.token ? 'Сохранено в облаке' : 'Только чтение (нет токена)', t: now() };
  } catch (e) { SYNC = { state: 'err', msg: e.message || 'Ошибка сети' }; }
  onSync();
}

/* ===== звук и озвучка ===== */
let AC;
function beep(f, d = .12, type = 'sine') {
  if (!CFG.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.value = f; g.gain.value = .07;
    o.connect(g); g.connect(AC.destination); o.start(); o.stop(AC.currentTime + d);
  } catch (e) { }
}
const sfx = {
  ok() { beep(660); setTimeout(() => beep(880), 90); },
  bad() { beep(180, .22, 'triangle'); },
  win() { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, .16), i * 110)); },
  tap() { beep(500, .04); }
};
const HAS_TTS = 'speechSynthesis' in window;
let VOICE = null;
function pickVoice() {
  if (!HAS_TTS) return;
  const vs = speechSynthesis.getVoices();
  VOICE = vs.find(v => /en[-_]US/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
}
if (HAS_TTS) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(t) {
  if (!HAS_TTS) return;
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; if (VOICE) u.voice = VOICE; u.rate = .9; speechSynthesis.speak(u); } catch (e) { }
}

/* ===== слова: интервальное повторение (коробки Лейтнера) ===== */
const BOX_DAYS = [0, 1, 2, 4, 7, 14, 30];
function rate(w, ok) {
  const c = ME.words[w.k] || [0, 0, 0, 0, 0];
  const box = ok ? Math.min(c[0] + 1, 6) : 0;
  ME.words[w.k] = [box, now() + BOX_DAYS[box] * 864e5, now(), c[3] + 1, c[4] + (ok ? 0 : 1)];
}
const learnedCount = () => Object.values(ME.words).filter(w => w[0] >= 3).length;

/* ===== прогресс по неделям ===== */
const TASKS = [
  { id: 'learn', n: 'Карточки', d: 'Знакомимся со словами недели', e: '🃏' },
  { id: 'quiz', n: 'Квиз', d: 'Слова: выбери перевод', e: '🎯' },
  { id: 'spell', n: 'Слушай и пиши', d: 'Аудио и правописание', e: '🎧' },
  { id: 'gram', n: 'Грамматика', d: 'Урок и упражнения', e: '🧩' },
  { id: 'boss', n: 'Босс недели', d: 'Финальное испытание', e: '🐉' }
];
const tref = (w, t) => w + ':' + t;
const tstat = (w, t) => ME.tasks[tref(w, t)] || [0, 0, 0, 0];
const taskStars = (w, t) => tstat(w, t)[0];
const taskDone = (w, t) => tstat(w, t)[2] > 0 && (t === 'learn' || taskStars(w, t) >= 1);
const weekCleared = w => TASKS.slice(0, 4).every(t => taskDone(w, t.id));
const bossPassed = w => taskStars(w, 'boss') >= 1;
const weekStars = w => TASKS.reduce((s, t) => s + taskStars(w, t.id), 0);
const weekUnlocked = w => CFG.teacher || w === 0 || bossPassed(w - 1);
function frontier() { const c = course(); for (let i = 0; i < c.length; i++) if (!bossPassed(i)) return i; return c.length - 1; }
function nextTask(w) { for (const t of TASKS) { if (t.id === 'boss' ? !bossPassed(w) && weekCleared(w) : !taskDone(w, t.id)) return t; } return null; }

/* ===== статистика ===== */
const LVL_TITLES = ['Новичок', 'Любопытный', 'Ученик', 'Говорун', 'Знаток слов', 'Грамотей', 'Полиглот', 'Мастер', 'Эксперт', 'Легенда'];
const levelOf = xp => Math.floor(Math.sqrt(xp / 150)) + 1;
const levelBase = l => 150 * (l - 1) * (l - 1);
const levelTitle = l => LVL_TITLES[Math.min(l - 1, LVL_TITLES.length - 1)];
function stats(d, wcount = 26) {
  const byDay = {}, byWeek = {}, sByWeek = {}, sxWeek = {}, perfWeek = {}, acts = new Set();
  let xp = 0, sessions = 0, cs = 0, tot = 0, perfect = 0, reviews = 0, noHintBoss = 0;
  for (const e of Object.values(d.log)) {
    const [t, x, k] = e; xp += x;
    const dk = dayKey(t), wk = weekKey(t);
    byDay[dk] = (byDay[dk] || 0) + x; byWeek[wk] = (byWeek[wk] || 0) + x;
    if (k === 's') {
      sessions++; acts.add(dk); sByWeek[wk] = (sByWeek[wk] || 0) + 1; sxWeek[wk] = (sxWeek[wk] || 0) + x;
      cs += e[4]; tot += e[5];
      if (e[5] >= 8 && e[4] === e[5]) { perfect++; perfWeek[wk] = (perfWeek[wk] || 0) + 1; }
      if (e[3] === 'review') reviews++;
      if (/:boss$/.test(e[3]) && e[6] === 0 && e[7] >= 75) noHintBoss++;
    }
  }
  let streak = 0; let t = new Date().setHours(12, 0, 0, 0);
  if (!acts.has(dayKey(t))) t -= 864e5;
  while (acts.has(dayKey(t))) { streak++; t -= 864e5; }
  const tk = Object.entries(d.tasks);
  return {
    xp, byDay, byWeek, sByWeek, sxWeek, perfWeek, sessions, streak, perfect, reviews, noHintBoss,
    acc: tot ? Math.round(100 * cs / tot) : 0,
    learned: Object.values(d.words).filter(w => w[0] >= 3).length,
    seen: Object.keys(d.words).length,
    bosses: tk.filter(([k, v]) => /:boss$/.test(k) && v[0] >= 1).length,
    stars: tk.reduce((s, [k, v]) => s + v[0], 0),
    level: levelOf(xp), today: byDay[dayKey(now())] || 0
  };
}
