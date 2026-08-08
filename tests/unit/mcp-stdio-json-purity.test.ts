import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { join } from "node:path";

const ROOT = new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

/**
 * Regression coverage: `omniroute --mcp` (the stdio transport Claude Desktop and other MCP
 * clients spawn) must write nothing but JSON-RPC to stdout. DB init — a side effect of
 * `createMcpServer()`'s tool registration reading compression settings — used to log via
 * plain `console.log` before any redirect was in place (ES module static imports are hoisted
 * and evaluate before any code inside the importing module's own functions runs, so a
 * redirect placed inside server.ts itself was too late). That leaked lines like
 * "[DB] Changing cache_size from 65536KB to 16384KB" straight onto stdout, corrupting the
 * JSON-RPC stream client-side (e.g. Claude Desktop: `Unexpected token 'D', "[DB] Changi"...
 * is not valid JSON`). Fixed by preloading bin/mcpStdioConsoleGuard.mjs via `node --import`
 * (bin/mcp-server.mjs) — the only point early enough to run before the MCP entry's module
 * graph evaluates at all.
 */
describe("omniroute --mcp stdio transport", () => {
  it("writes only valid JSON-RPC to stdout — no DB init or other startup logging leaks through", async () => {
    const child = spawn(process.execPath, [join(ROOT, "bin", "omniroute.mjs"), "--mcp"], {
      cwd: ROOT,
      env: process.env,
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.stdin.write(
      `${JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-03-26",
          capabilities: {},
          clientInfo: { name: "regression-test", version: "0" },
        },
      })}\n`
    );

    // The full chain (omniroute.mjs CLI startup + spawned MCP child, each paying a tsx
    // import + the child's DB init/migrations) takes ~10s on a warm dev box and longer on
    // loaded CI runners — a fixed 4s sleep made this test red from birth. Poll for the
    // first stdout line instead, then give the stream a short settle window so any
    // late startup logging that WOULD corrupt the protocol still gets caught.
    const deadline = Date.now() + 60_000;
    while (!stdout.includes("\n") && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    child.kill();

    const stdoutLines = stdout.split("\n").filter((line) => line.trim().length > 0);
    assert.ok(
      stdoutLines.length > 0,
      "expected at least one line on stdout (the initialize response)"
    );

    for (const line of stdoutLines) {
      assert.doesNotThrow(
        () => JSON.parse(line),
        `stdout line is not valid JSON (startup logging leaked onto stdout): ${line.slice(0, 120)}`
      );
    }

    const initResponse = stdoutLines.map((line) => JSON.parse(line)).find((msg) => msg.id === 1);
    assert.ok(initResponse, "expected an initialize response with id 1 on stdout");
    assert.equal(initResponse.jsonrpc, "2.0");

    // The DB init logging must still happen — just on stderr, not stdout.
    assert.ok(
      stderr.includes("[DB]"),
      "expected DB init logging on stderr (proves it was redirected, not silently dropped)"
    );
  });
});
