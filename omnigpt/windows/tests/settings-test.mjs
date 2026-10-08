// Settings and chats must survive a backend restart while the window stays open (the backend picks a new token on
// every start). Starts a throwaway backend twice against a temporary settings folder.
// Run: node settings-test.mjs   (exit code 0 = all passed)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = ["app", "OmniGPT"].map((d) => path.resolve(here, "..", "..", d)).find((d) => fs.existsSync(path.join(d, "server.mjs")));
const port = "20159", base = `http://127.0.0.1:${port}`;
const data = fs.mkdtempSync(path.join(os.tmpdir(), "omnigpt-settingstest-"));
const env = { ...process.env, OMNIGPT_PORT: port, LOCALAPPDATA: data, OMNIROUTE_URL: "http://127.0.0.1:9", OMNIROUTE_SCRIPT: path.join(data, "no-omniroute.mjs") };
delete env.OMNIGPT_PARENT_PID;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let failed = 0;
const check = (name, ok, extra = "") => { if (!ok) failed++; console.log((ok ? "PASS  " : "FAIL  ") + name + (extra ? "  " + extra : "")); };

const html = fs.readFileSync(path.join(src, "index.html"), "utf8");
const tokenRe = /TOKEN0="([0-9a-f]{16,})"/; // the same pattern the page uses to pick up a new token
check("page re-reads the token when the backend refuses it", html.includes("renewToken") && html.includes(String(tokenRe)));
check("settings changed while loading are kept", /if\(!KVOK\)PRESET\[k\]=v/.test(html));
check("a refused first load is not treated as loaded", html.includes('if(!r.ok)throw new Error("HTTP "+r.status)'));

async function start() {
  const p = spawn(process.execPath, [path.join(src, "server.mjs")], { env, stdio: "ignore", windowsHide: true });
  for (let i = 0; i < 40; i++) { try { const t = await (await fetch(base + "/")).text(); return { p, token: tokenRe.exec(t)?.[1] }; } catch { await sleep(250); } }
  throw new Error("backend did not start");
}
const stop = async (s) => { s.p.kill(); for (let i = 0; i < 40 && s.p.exitCode === null && s.p.signalCode === null; i++) await sleep(100); };
const kv = (token, body) => fetch(base + "/api/kv", { method: body ? "POST" : "GET", headers: { "x-app-token": token, "content-type": "application/json" }, body: body && JSON.stringify(body) });

try {
  let s = await start();
  check("served page carries a token", !!s.token);
  check("save settings", (await kv(s.token, { key: "orc.settings", value: { workers: 6 } })).ok);
  const old = s.token;
  await stop(s); s = await start();
  check("restarted backend uses a new token", !!s.token && s.token !== old);
  check("old token is refused after a restart", (await kv(old, { key: "orc.settings", value: { workers: 1 } })).status === 403);
  check("the new token from the page saves", (await kv(s.token, { key: "orc.settings", value: { workers: 6, font: "sans" } })).ok);
  const stored = await (await kv(s.token)).json();
  check("saved settings read back", stored["orc.settings"]?.font === "sans" && stored["orc.settings"]?.workers === 6, JSON.stringify(stored["orc.settings"]));
  await stop(s);
} catch (e) { check("backend", false, String(e.message || e)); }
fs.rmSync(data, { recursive: true, force: true });
console.log(failed ? `${failed} check(s) failed.` : "All settings checks passed.");
process.exit(failed ? 1 : 0);
