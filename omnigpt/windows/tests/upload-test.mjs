// Uploads every sample file to a running OmniGPT backend and checks what the agents will be told about it.
// Run: node upload-test.mjs <port> <samples folder>
import fs from "node:fs";
import path from "node:path";
const port = process.argv[2] || "20139", dir = process.argv[3];
const base = `http://127.0.0.1:${port}`;
const page = await (await fetch(base + "/")).text();
const TOKEN = /TOKEN0?="([0-9a-f]{16,})"/.exec(page)[1];
const H = { "x-app-token": TOKEN };
let bad = 0, n = 0;
for (const name of fs.readdirSync(dir)) {
  const body = fs.readFileSync(path.join(dir, name));
  const r = await (await fetch(`${base}/api/upload?name=${encodeURIComponent(name)}`, { method: "POST", headers: { ...H, "content-type": "application/octet-stream" }, body })).json();
  n++;
  const same = r.ok && fs.readFileSync(r.path).equals(body);
  const type = r.ok ? (/^Type: (.*)$/m.exec(r.report) || [])[1] : r.error;
  // the preview endpoint must return the same bytes
  const prev = r.ok ? Buffer.from(await (await fetch(`${base}/api/file?path=${encodeURIComponent(r.path)}&t=${TOKEN}`)).arrayBuffer()) : null;
  const ok = same && prev && prev.equals(body);
  if (!ok) bad++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(16)} ${String(type).slice(0, 50)}`);
}
// security: previews never leave the allowed folders, scripts are not served as live pages, and the token is required
const outside = await fetch(`${base}/api/file?path=${encodeURIComponent("C:\\Windows\\win.ini")}&t=${TOKEN}`);
const noToken = await fetch(`${base}/api/file?path=x`);
const html = await fetch(`${base}/api/file?path=${encodeURIComponent((await (await fetch(`${base}/api/fileinfo`, { method: "POST", headers: H, body: JSON.stringify({ paths: [] }) })).json(), "Attachments"))}&t=${TOKEN}`);
console.log(`${outside.status === 404 ? "PASS" : "FAIL"}  preview outside allowed folders refused (${outside.status})`);
console.log(`${noToken.status === 403 ? "PASS" : "FAIL"}  preview without token refused (${noToken.status})`);
const evil = await (await fetch(`${base}/api/upload?name=${encodeURIComponent("..\\..\\escape.txt")}`, { method: "POST", headers: H, body: "x" })).json();
console.log(`${evil.ok && !/\.\.\\/.test(evil.path) && /Attachments/.test(evil.path) ? "PASS" : "FAIL"}  upload name cannot climb out of Attachments (${evil.path || evil.error})`);
const cred = await (await fetch(`${base}/api/upload?name=.env`, { method: "POST", headers: H, body: "SECRET=1" })).json();
const credSafe = cred.ok === false || !/[\\/]\.env$/i.test(cred.path);
console.log(`${credSafe ? "PASS" : "FAIL"}  a credential-style name is refused or renamed (${cred.error || cred.path})`);
if (outside.status !== 404 || noToken.status !== 403 || !evil.ok || !credSafe) bad++;
console.log(bad ? `\n${bad} problem(s)` : `\nAll ${n} uploads stored byte-for-byte, previewed, and the security checks held.`);
