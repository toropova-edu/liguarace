// Cloudflare Worker: общее хранилище прогресса (KV-привязка PROGRESS). Токены не нужны.
const USERS = ['evgenia', 'bogdan'];
const ORIGINS = ['https://toropova-edu.github.io', 'http://127.0.0.1:8124', 'http://localhost:8000', 'http://127.0.0.1:8000'];

const json = (o, s, h) => new Response(JSON.stringify(o), { status: s || 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...h } });
const empty = () => ({ v: 1, log: {}, tasks: {}, words: {}, ach: {}, upd: 0 });

function merge(a, b) {
  const o = empty();
  for (const s of [a, b]) {
    if (!s) continue;
    Object.assign(o.log, s.log);
    for (const [k, v] of Object.entries(s.tasks || {})) { const c = o.tasks[k]; o.tasks[k] = c ? [0, 1, 2, 3].map(i => Math.max(c[i], v[i])) : v.slice(); }
    for (const [k, v] of Object.entries(s.words || {})) { const c = o.words[k]; if (!c || v[2] > c[2]) o.words[k] = v; }
    for (const [k, v] of Object.entries(s.ach || {})) { if (!o.ach[k] || v < o.ach[k]) o.ach[k] = v; }
    o.upd = Math.max(o.upd, s.upd || 0);
  }
  return o;
}
const isObj = x => x && typeof x === 'object' && !Array.isArray(x);
function valid(d) {
  if (!isObj(d) || d.v !== 1) return false;
  for (const k of ['log', 'tasks', 'words', 'ach']) if (!isObj(d[k])) return false;
  if (Object.keys(d.log).length > 30000 || Object.keys(d.words).length > 3000 || Object.keys(d.tasks).length > 500) return false;
  for (const e of Object.values(d.log)) if (!Array.isArray(e) || e.length < 3 || e.length > 10 || typeof e[0] !== 'number' || typeof e[1] !== 'number' || e[1] > 2000 || e[1] < 0) return false;
  for (const e of Object.values(d.tasks)) if (!Array.isArray(e) || e.length !== 4 || e.some(n => typeof n !== 'number')) return false;
  for (const e of Object.values(d.words)) if (!Array.isArray(e) || e.length !== 5 || e.some(n => typeof n !== 'number')) return false;
  for (const e of Object.values(d.ach)) if (typeof e !== 'number') return false;
  return true;
}
const readFile = async (env, user) => ({ data: await env.PROGRESS.get('progress:' + user, 'json') });

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = ORIGINS.includes(origin);
    const cors = { 'Access-Control-Allow-Origin': allowed ? origin : ORIGINS[0], 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const m = new URL(req.url).pathname.match(/^\/progress\/(\w+)$/);
    if (!m || !USERS.includes(m[1])) return json({ error: 'not found' }, 404, cors);
    const user = m[1];
    try {
      if (req.method === 'GET') {
        const { data } = await readFile(env, user);
        return data ? json(data, 200, cors) : json({ error: 'empty' }, 404, cors);
      }
      if (req.method === 'POST') {
        if (!allowed) return json({ error: 'forbidden' }, 403, cors);
        const text = await req.text();
        if (text.length > 600000) return json({ error: 'too large' }, 413, cors);
        const body = JSON.parse(text);
        if (!valid(body)) return json({ error: 'bad data' }, 400, cors);
        const { data } = await readFile(env, user);
        const merged = merge(data, body);
        await env.PROGRESS.put('progress:' + user, JSON.stringify(merged));
        return json(merged, 200, cors);
      }
      return json({ error: 'method' }, 405, cors);
    } catch (e) { return json({ error: String(e.message || e) }, 500, cors); }
  }
};
