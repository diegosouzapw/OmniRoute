// Local shell for OmniRoute Chat. Serves the UI, proxies to OmniRoute (adding the API key from the
// OMNIROUTE_API_KEY env var so the page never sees it), and executes reviewed PC tools.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import os from "node:os";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { loadConfig, saveConfig, precheck, run, resolveScope, runSandboxRaw, sandboxInfo, checkPath, grantFolder, ungrantFolder, folderConfig, insideFolder } from "./tools.mjs";
import { inspect, MIME, RUNNABLE } from "./files.mjs";
import { pipeline } from "node:stream/promises";

const here = path.dirname(fileURLToPath(import.meta.url));
const OR = process.env.OMNIROUTE_URL || "http://127.0.0.1:20128";
const PORT = Number(process.env.OMNIGPT_PORT || 20129); // a different port lets a development copy run beside the installed app
const TOKEN = crypto.randomBytes(24).toString("hex"); // per launch; only the served page knows it
export const VERSION = "1.0.1";
const REPO = "ASDFboy/OmniGPT"; // GitHub repository whose releases are checked for updates
const CHAT_DIR_ = path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local"), "OmniRouteChat");
const KEYFILE = path.join(CHAT_DIR_, "omniroute-key.txt"); // the key can also be saved from Settings instead of an environment variable
const key = () => { if (process.env.OMNIROUTE_API_KEY) return process.env.OMNIROUTE_API_KEY; try { return fs.readFileSync(KEYFILE, "utf8").trim(); } catch { return ""; } };
let updateCache = { at: 0, data: null };
const semver = (v) => String(v).split(".").map((n) => parseInt(n, 10) || 0);
const newer = (a, b) => { const x = semver(a), y = semver(b); for (let i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0); } return false; };
async function checkUpdate(force) {
  if (!force && updateCache.data && Date.now() - updateCache.at < 6 * 3600e3) return updateCache.data;
  const r = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=20`, { headers: { "user-agent": "OmniGPT/" + VERSION, accept: "application/vnd.github+json" }, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error("GitHub answered " + r.status);
  let best = null;
  for (const rel of await r.json()) {
    const m = /^omnigpt-v(\d+\.\d+\.\d+)$/.exec(rel.tag_name || ""); if (!m || rel.draft || rel.prerelease) continue;
    if (!best || newer(m[1], best.version)) best = { version: m[1], url: rel.html_url };
  }
  const data = { current: VERSION, latest: best ? best.version : VERSION, newer: !!best && newer(best.version, VERSION), url: best ? best.url : `https://github.com/${REPO}/releases` };
  updateCache = { at: Date.now(), data }; return data;
}
// A cancelled request must never take the whole app down.
process.on("uncaughtException", (e) => console.error("uncaught:", e.message));
process.on("unhandledRejection", (e) => console.error("unhandled:", e?.message || e));

async function orUp() {
  try { return (await fetch(OR + "/api/settings/require-login", { signal: AbortSignal.timeout(2500) })).ok; }
  catch { return false; }
}
// Starts OmniRoute directly and hidden (no console window). If it was already running we leave it alone;
// if we started it, it stops when this server stops.
let omniChild = null;
async function ensureOmniRoute() {
  if (await orUp()) return;
  const script = process.env.OMNIROUTE_SCRIPT || path.join(process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming"), "npm", "node_modules", "omniroute", "bin", "omniroute.mjs");
  if (!fs.existsSync(script)) { console.error("OmniRoute not found at " + script); return; }
  const dataDir = process.env.DATA_DIR || loadConfig().omnirouteDataDir; // empty: OmniRoute uses its own default folder
  const env = { ...process.env, ...(dataDir ? { DATA_DIR: dataDir } : {}), OMNIROUTE_SERVER_HOST: "127.0.0.1", OMNIROUTE_NO_UPDATE_NOTIFIER: "1", NO_UPDATE_NOTIFIER: "1" };
  delete env.OMNIROUTE_API_KEY; // OmniRoute does not need our client key
  omniChild = spawn(process.execPath, [script, "serve", "--no-tray", "--log", "--ready-timeout", "180000"], { windowsHide: true, stdio: "ignore", env });
  omniChild.on("exit", () => { omniChild = null; });
}
const killTree = (c) => { try { if (c && c.pid) spawn("taskkill", ["/pid", String(c.pid), "/t", "/f"], { windowsHide: true, stdio: "ignore" }); } catch {} };
function shutdown() { killTree(omniChild); setTimeout(() => process.exit(0), 300); }
for (const sig of ["SIGINT", "SIGTERM", "SIGBREAK"]) process.on(sig, shutdown);
const parentPid = Number(process.env.OMNIGPT_PARENT_PID || 0); // exit when the app window process is gone
if (parentPid) setInterval(() => { try { process.kill(parentPid, 0); } catch { shutdown(); } }, 4000);

// ---------- scheduled tasks: stored here, fired into the open app window (the page polls /api/due)
const TASKS_FILE = path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local"), "OmniRouteChat", "tasks.json");
let tasks = [];
try { tasks = JSON.parse(fs.readFileSync(TASKS_FILE, "utf8")); } catch {}
const due = [];
const persist = () => { fs.mkdirSync(path.dirname(TASKS_FILE), { recursive: true }); fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2)); };
function nextRun(s, from) {
  if (s.type === "once") return s.at;
  if (s.type === "interval") return from + s.minutes * 60000;
  const [h, m] = s.time.split(":").map(Number);
  for (let d = 0; d < 8; d++) {
    const c = new Date(from); c.setDate(c.getDate() + d); c.setHours(h, m, 0, 0);
    if (c.getTime() > from && (s.type === "daily" || s.days.includes(c.getDay()))) return c.getTime();
  }
  return null;
}
function normalize(t) {
  const sc = t.schedule || {}, clean = { type: sc.type };
  if (sc.type === "once") { clean.at = Number(sc.at); if (!clean.at) throw new Error("bad time"); }
  else if (sc.type === "interval") { clean.minutes = Math.max(1, Math.min(Number(sc.minutes) || 0, 100000)); if (!sc.minutes) throw new Error("bad interval"); }
  else if (sc.type === "daily" || sc.type === "weekly") {
    if (!/^\d{1,2}:\d{2}$/.test(sc.time || "")) throw new Error("bad time");
    clean.time = sc.time;
    if (sc.type === "weekly") { clean.days = (sc.days || []).map(Number).filter((d) => d >= 0 && d <= 6); if (!clean.days.length) throw new Error("pick at least one day"); }
  } else throw new Error("bad schedule type");
  const name = String(t.name || "").trim().slice(0, 80), prompt = String(t.prompt || "").trim().slice(0, 8000);
  if (!name || !prompt) throw new Error("name and prompt are required");
  return { id: String(t.id || crypto.randomUUID()), name, prompt, schedule: clean, enabled: t.enabled !== false, pc: !!t.pc, project: t.project ? String(t.project) : null, lastRun: Number(t.lastRun) || 0, nextRun: null };
}
const fire = (t, now) => { due.push({ id: t.id, name: t.name, prompt: t.prompt, pc: t.pc, project: t.project, at: now }); t.lastRun = now; };
for (const t of tasks) if (t.enabled && !t.nextRun) t.nextRun = nextRun(t.schedule, Date.now());
setInterval(() => { // a missed run (app was closed) fires once on the next tick, then reschedules from now
  const now = Date.now(); let changed = false;
  for (const t of tasks) if (t.enabled && t.nextRun && t.nextRun <= now) {
    fire(t, now); changed = true;
    if (t.schedule.type === "once") { t.enabled = false; t.nextRun = null; } else t.nextRun = nextRun(t.schedule, now);
  }
  if (changed) persist();
}, 15000);

// ---------- key/value storage for chats, folders, projects and model health (no browser quota)
const KVDIR = path.join(path.dirname(TASKS_FILE), "kv");
const kvFile = (k) => path.join(KVDIR, k.replace(/[^a-z.]/g, "_") + ".json");
const kvAll = () => { const o = {}; try { for (const f of fs.readdirSync(KVDIR)) if (f.endsWith(".json")) { const n = f.slice(0, -5); try { o[n] = JSON.parse(fs.readFileSync(path.join(KVDIR, f), "utf8")); } catch { try { o[n] = JSON.parse(fs.readFileSync(path.join(KVDIR, f + ".bak"), "utf8")); } catch {} } } } catch {} return o; }; // a damaged file falls back to the previous copy
const kvSet = (k, v) => { if (!/^orc\.[a-z]+$/.test(k)) throw new Error("bad key"); fs.mkdirSync(KVDIR, { recursive: true }); const t = kvFile(k) + ".tmp"; fs.writeFileSync(t, JSON.stringify(v)); try { fs.copyFileSync(kvFile(k), kvFile(k) + ".bak"); } catch {} fs.renameSync(t, kvFile(k)); };

const json = (res, code, obj) => { res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(obj)); };
const readBody = (req, max = 8e6) => new Promise((ok, bad) => {
  let b = ""; req.on("data", (c) => { b += c; if (b.length > max) { bad(new Error("body too large")); req.destroy(); } }); req.on("end", () => ok(b));
});

http.createServer(async (req, res) => {
  try {
    // DNS-rebinding / cross-site guard: only our own origin and host may talk to us.
    if (req.headers.host !== `127.0.0.1:${PORT}`) return json(res, 403, { error: { message: "bad host" } });
    if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-frame-options": "DENY" });
      return res.end(fs.readFileSync(path.join(here, "index.html"), "utf8").replace("__TOKEN__", TOKEN));
    }
    const qtok = req.method === "GET" && req.url.startsWith("/api/file?") ? new URL(req.url, "http://x").searchParams.get("t") : null; // previews load through <img>/<iframe>, which cannot send headers
    if (req.headers["x-app-token"] !== TOKEN && qtok !== TOKEN) return json(res, 403, { error: { message: "bad token" } });
    const origin = req.headers.origin;
    if (origin && origin !== `http://127.0.0.1:${PORT}`) return json(res, 403, { error: { message: "bad origin" } });

    // ---------- files: attachments, previews, File Explorer
    if (req.method === "POST" && req.url.startsWith("/api/upload?")) {
      try {
        const cfg = loadConfig(), raw = String(new URL(req.url, "http://x").searchParams.get("name") || "file");
        const name = path.basename(raw).replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").replace(/^\.+/, "").slice(0, 150) || "file";
        const d = path.join(cfg.cwd, "Attachments", new Date().toISOString().slice(0, 10)); fs.mkdirSync(d, { recursive: true });
        let p = path.join(d, name); for (let k = 2; fs.existsSync(p); k++) { const e = path.extname(name); p = path.join(d, path.basename(name, e) + ` (${k})` + e); }
        p = checkPath(p, cfg);
        let n = 0; const LIMIT = 500 * 1024 * 1024;
        await pipeline(req, async function* (src) { for await (const c of src) { n += c.length; if (n > LIMIT) throw new Error("file is over 500 MB"); yield c; } }, fs.createWriteStream(p));
        let report = ""; try { report = inspect(p).slice(0, 6000); } catch (e) { report = "Could not read: " + e.message; }
        return json(res, 200, { ok: true, path: p, size: n, report });
      } catch (e) { return json(res, 200, { ok: false, error: String(e.message || e) }); }
    }
    const absOf = (p) => { const cfg = loadConfig(); const s = String(p || "").trim().replace(/^["'`]|["'`]$/g, ""); return path.resolve(path.isAbsolute(s) ? s : path.join(cfg.cwd, s)); };
    if (req.method === "POST" && (req.url === "/api/reveal" || req.url === "/api/open")) {
      const b = JSON.parse(await readBody(req)), abs = absOf(b.path);
      if (!fs.existsSync(abs)) return json(res, 200, { ok: false, error: "File not found: " + abs });
      if (/["\r\n]/.test(abs)) return json(res, 200, { ok: false, error: "Unusual path" });
      if (req.url === "/api/open") {
        if (RUNNABLE.test(abs)) return json(res, 200, { ok: false, error: "Programs and scripts are not opened from here. Use Show in folder." });
        spawn("explorer.exe", [`"${abs}"`], { detached: true, stdio: "ignore", windowsVerbatimArguments: true }).unref();
      } else spawn("explorer.exe", [fs.statSync(abs).isDirectory() ? `"${abs}"` : `/select,"${abs}"`], { detached: true, stdio: "ignore", windowsVerbatimArguments: true }).unref(); // Explorer needs the quotes exactly like this, or paths with spaces open the wrong folder
      return json(res, 200, { ok: true });
    }
    if (req.method === "POST" && req.url === "/api/fileinfo") {
      const b = JSON.parse(await readBody(req));
      return json(res, 200, (b.paths || []).slice(0, 30).map((p) => { const abs = absOf(p); try { const st = fs.statSync(abs), ext = path.extname(abs).slice(1).toLowerCase(); return { path: abs, exists: true, isDir: st.isDirectory(), size: st.size, mtime: st.mtimeMs, ext, mime: MIME[ext] || "", runnable: RUNNABLE.test(abs) }; } catch { return { path: abs, exists: false }; } }));
    }
    if (req.method === "POST" && req.url === "/api/changed") { // files in the working folder created or changed since a time
      const since = Number(JSON.parse(await readBody(req)).since) || Date.now(), cfg = loadConfig(), found = []; let seen = 0;
      const walk = (d, depth) => { let list = []; try { list = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
        for (const e of list) { if (++seen > 5000) return; if (/^(node_modules|\.git|__pycache__|\.venv|venv)$/i.test(e.name)) continue; const f = path.join(d, e.name);
          if (e.isDirectory()) { if (depth < 5) walk(f, depth + 1); } else { try { const m = fs.statSync(f).mtimeMs; if (m >= since) found.push([f, m]); } catch {} } } };
      walk(cfg.cwd, 0);
      return json(res, 200, { files: found.sort((a, b) => b[1] - a[1]).slice(0, 20).map((x) => x[0]) });
    }
    if (req.method === "GET" && req.url.startsWith("/api/file?")) {
      try {
        const cfg = loadConfig(), abs = checkPath(absOf(new URL(req.url, "http://x").searchParams.get("path")), cfg), ext = path.extname(abs).slice(1).toLowerCase(), st = fs.statSync(abs);
        if (!st.isFile()) return json(res, 404, { error: { message: "not a file" } });
        // anything that could run script (html, svg, js) is served as plain text or sandboxed, never as a live page
        const type = MIME[ext] || "text/plain; charset=utf-8";
        res.writeHead(200, { "content-type": type, "content-length": st.size, "x-content-type-options": "nosniff", "cache-control": "no-store", ...(ext === "svg" ? { "content-security-policy": "sandbox; default-src 'none'; style-src 'unsafe-inline'" } : {}) });
        return fs.createReadStream(abs).pipe(res);
      } catch (e) { return json(res, 404, { error: { message: String(e.message || e) } }); }
    }
    if (req.url === "/api/tasks" && req.method === "GET") return json(res, 200, tasks);
    if (req.url === "/api/due") return json(res, 200, due.splice(0));
    if (req.method === "POST" && req.url.startsWith("/api/tasks/")) {
      try {
        const b = JSON.parse(await readBody(req));
        if (req.url === "/api/tasks/save") {
          const t = normalize(b.task); t.nextRun = t.enabled ? nextRun(t.schedule, Date.now()) : null;
          tasks = [...tasks.filter((x) => x.id !== t.id), t]; persist(); return json(res, 200, { ok: true, task: t });
        }
        if (req.url === "/api/tasks/delete") { tasks = tasks.filter((x) => x.id !== b.id); persist(); return json(res, 200, { ok: true }); }
        if (req.url === "/api/tasks/run") { const t = tasks.find((x) => x.id === b.id); if (t) { fire(t, Date.now()); persist(); } return json(res, 200, { ok: !!t }); }
      } catch (e) { return json(res, 200, { ok: false, error: String(e.message || e) }); }
    }
    if (req.url === "/api/kv") {
      if (req.method === "POST") { const b = JSON.parse(await readBody(req, 60e6)); kvSet(b.key, b.value); return json(res, 200, { ok: true }); }
      return json(res, 200, kvAll());
    }
    if (req.url === "/api/status") return json(res, 200, { omniroute: await orUp(), key: !!key(), keyFromEnv: !!process.env.OMNIROUTE_API_KEY, sandbox: sandboxInfo(), version: VERSION, omniroute_url: OR });
    if (req.url.startsWith("/api/update")) { try { return json(res, 200, { ok: true, ...(await checkUpdate(req.url.includes("force"))) }); } catch (e) { return json(res, 200, { ok: false, current: VERSION, error: String(e.message || e) }); } }
    if (req.method === "POST" && req.url === "/api/apikey") { // saved for this Windows user only; never sent back to the page
      const k = String(JSON.parse(await readBody(req)).key || "").trim();
      if (k.length > 500 || /[\r\n\s]/.test(k)) return json(res, 200, { ok: false, error: "That does not look like an API key." });
      fs.mkdirSync(CHAT_DIR_, { recursive: true });
      if (k) fs.writeFileSync(KEYFILE, k); else { try { fs.unlinkSync(KEYFILE); } catch {} }
      return json(res, 200, { ok: true, key: !!key() });
    }
    if (req.method === "POST" && req.url === "/api/sandbox") { // raw result for the code-verification pipeline
      const b = JSON.parse(await readBody(req));
      if (String(b.code ?? "").length > 100000) return json(res, 200, { error: "code is too long", stdout: "", stderr: "", exitCode: -1 });
      return json(res, 200, await runSandboxRaw(b.language, b.code, b.timeout));
    }
    if (req.url === "/api/config") {
      if (req.method === "POST") return json(res, 200, saveConfig(JSON.parse(await readBody(req))));
      return json(res, 200, loadConfig());
    }
    if (req.method === "POST" && req.url === "/api/pickfolder") { // the Windows folder picker; only a folder chosen here can be granted
      const ps = "Add-Type -AssemblyName System.Windows.Forms; $f = New-Object System.Windows.Forms.Form -Property @{TopMost=$true; ShowInTaskbar=$false; Opacity=0}; $f.Show(); $f.Activate(); " +
        "$d = New-Object System.Windows.Forms.OpenFileDialog; $d.ValidateNames=$false; $d.CheckFileExists=$false; $d.CheckPathExists=$true; $d.FileName='Select this folder'; $d.Title='Choose a folder for OmniGPT to work in'; " +
        "if ($d.ShowDialog($f) -eq 'OK') { [Console]::Out.Write((Split-Path -Parent $d.FileName)) }; $f.Close()";
      const out = await new Promise((ok) => { let o = ""; const c = spawn("powershell.exe", ["-NoProfile", "-Sta", "-Command", ps], { windowsHide: true }); c.stdout.on("data", (d) => (o += d)); c.on("close", () => ok(o.trim())); c.on("error", () => ok("")); });
      if (!out) return json(res, 200, { ok: false, cancelled: true });
      try { return json(res, 200, { ok: true, path: grantFolder(out) }); } catch (e) { return json(res, 200, { ok: false, error: String(e.message || e) }); }
    }
    if (req.method === "POST" && req.url === "/api/ungrant") return json(res, 200, { ok: true, granted: ungrantFolder(JSON.parse(await readBody(req)).path) });
    if (req.method === "POST" && req.url === "/api/resolve") {
      try { const b = JSON.parse(await readBody(req)); return json(res, 200, { ok: true, lists: resolveScope(b.lists, folderConfig(loadConfig(), b.folder)) }); }
      catch (e) { return json(res, 200, { ok: false, error: String(e.message || e) }); }
    }
    if (req.method === "POST" && (req.url === "/api/precheck" || req.url === "/api/run")) {
      const { name, input, scope, folder } = JSON.parse(await readBody(req));
      try {
        const cfg = folderConfig(loadConfig(), folder);
        if (req.url === "/api/precheck") return json(res, 200, { ok: true, ...(await precheck(name, input, cfg, scope)), inside: insideFolder(name, input, cfg) });
        return json(res, 200, { ok: true, output: await run(name, input, cfg, scope) });
      } catch (e) {
        return json(res, 200, { ok: false, error: String(e.message || e) });
      }
    }
    if (!key()) return json(res, 500, { error: { message: "OMNIROUTE_API_KEY is not set in your Windows user environment." } });
    const headers = { authorization: "Bearer " + key(), "anthropic-version": "2023-06-01", "content-type": "application/json" };
    if (req.url === "/api/models") {
      const r = await fetch(OR + "/v1/models", { headers });
      return json(res, r.status, await r.json());
    }
    if (req.method === "POST" && req.url === "/api/messages") {
      const body = await readBody(req, 80e6); // attached images travel inside the message
      const ac = new AbortController();
      res.on("close", () => ac.abort());
      const r = await fetch(OR + "/v1/messages", { method: "POST", headers, body, signal: ac.signal });
      res.writeHead(r.status, { "content-type": r.headers.get("content-type") || "application/json", "cache-control": "no-cache" });
      const rs = Readable.fromWeb(r.body);
      rs.on("error", () => res.end());
      res.on("error", () => {});
      return rs.pipe(res);
    }
    json(res, 404, { error: { message: "not found" } });
  } catch (e) {
    if (!res.headersSent) json(res, 502, { error: { message: String(e.message || e) } });
    else res.end();
  }
}).on("error", (e) => { console.error("Cannot listen on " + PORT + ": " + e.message); process.exit(1); }).listen(PORT, "127.0.0.1", () => { console.log("OmniRoute Chat on http://127.0.0.1:" + PORT); ensureOmniRoute(); });
