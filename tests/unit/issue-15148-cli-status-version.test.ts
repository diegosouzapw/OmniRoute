import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Issue #15148: `omniroute status` read package.json from process.cwd(), so global/npx
// installs (cwd != package root) always printed "Version: unknown".

test("omniroute status resolves the version when cwd is not the package root", async () => {
  const cwd = process.cwd();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-status-cwd-"));
  const lines: string[] = [];
  const origLog = console.log;
  try {
    const { runStatusCommand } = await import("../../bin/cli/commands/status.mjs");
    process.chdir(tmp);
    console.log = (...a: unknown[]) => void lines.push(a.join(" "));
    await runStatusCommand({ output: "json" });
  } finally {
    console.log = origLog;
    process.chdir(cwd);
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  const status = JSON.parse(lines.join("\n"));
  const pkg = JSON.parse(fs.readFileSync(path.resolve(cwd, "package.json"), "utf8"));
  assert.equal(status.version, pkg.version);
});

test("omniroute cache status surfaces the HTTP status instead of 'not available'", async () => {
  const http = await import("node:http");
  const server = http.createServer((req, res) => {
    res.statusCode = req.url?.startsWith("/api/cache/stats") ? 401 : 200;
    res.setHeader("content-type", "application/json");
    res.end("{}");
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", () => r()));
  const port = (server.address() as { port: number }).port;
  const prev = { ...process.env };
  process.env.OMNIROUTE_BASE_URL = `http://127.0.0.1:${port}`;
  const out: string[] = [];
  const origLog = console.log;
  const origErr = console.error;
  try {
    const { runCacheStatusCommand } = await import("../../bin/cli/commands/cache.mjs");
    console.log = (...a: unknown[]) => void out.push(a.join(" "));
    console.error = (...a: unknown[]) => void out.push(a.join(" "));
    await runCacheStatusCommand({});
  } finally {
    console.log = origLog;
    console.error = origErr;
    process.env = prev;
    server.close();
  }
  const text = out.join("\n");
  assert.match(text, /401/);
});
