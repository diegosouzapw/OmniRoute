import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * Regression guard for #12491: the Codex app-server WebSocket transport
 * ("Codex app-server websocket transport unavailable") never comes up inside
 * the Next.js standalone Docker runtime because open-sse/executors/codex.ts
 * resolves wreq-js with a LITERAL specifier:
 *
 *   const _wreqRequire = createRequire(import.meta.url);
 *   const mod = _wreqRequire("wreq-js");
 *
 * Turbopack statically detects the literal string argument and rewrites the
 * call into `require("wreq-js-<buildhash>")`, satisfied only by a symlink
 * Turbopack drops at `.next/node_modules/wreq-js-<buildhash> -> node_modules/wreq-js`
 * during the build. That symlink is a `.next`-relative build artifact; it is not
 * reachable through the same relative path once files are re-laid-out for a
 * standalone Docker image, so `require("wreq-js-<buildhash>")` throws
 * MODULE_NOT_FOUND at runtime — even though `node -e "require('wreq-js')"`
 * (the literal package name) succeeds fine in the very same container.
 *
 * Verified interactively against a real `next build --turbopack` (Next 16.3.3):
 * compiling `const _wreqRequire = createRequire(import.meta.url); _wreqRequire("wreq-js")`
 * emits `64301,(e,t,r)=>{t.exports=e.x("wreq-js-3b69dd5e46bd26d3",()=>require("wreq-js-3b69dd5e46bd26d3"))}`
 * in the compiled chunk, and the build directory gained
 * `.next/node_modules/wreq-js-3b69dd5e46bd26d3 -> ../../node_modules/wreq-js`.
 * `open-sse/utils/tlsClient.ts` (see its `loadRuntimeModule()`) was already
 * hardened against exactly this by keeping the specifier a runtime variable
 * (`Reflect.apply(runtimeRequire, undefined, [moduleName])`), which Turbopack
 * cannot statically rewrite — codex.ts's own wreq-js loader (the one that feeds
 * `getCodexAppServerWebsocketTransport()` / `CodexAppServerClient.connect()`)
 * never received the same treatment.
 */

const CODEX_TS_PATH = join(ROOT, "open-sse", "executors", "codex.ts");

test("codex.ts must not pass a literal specifier to the wreq-js createRequire() loader", () => {
  const source = readFileSync(CODEX_TS_PATH, "utf8");

  assert.match(
    source,
    /const _wreqRequire = createRequire\(import\.meta\.url\)/,
    "expected open-sse/executors/codex.ts to still define _wreqRequire via createRequire(import.meta.url) " +
      "— update this test's assumptions if the loader was restructured"
  );

  const literalCallPattern = /_wreqRequire\(\s*["'`]wreq-js["'`]\s*\)/;
  assert.doesNotMatch(
    source,
    literalCallPattern,
    'open-sse/executors/codex.ts calls _wreqRequire("wreq-js") with a LITERAL specifier. ' +
      'Turbopack statically rewrites this into `require("wreq-js-<buildhash>")`, which only ' +
      "resolves via a `.next/node_modules/wreq-js-<buildhash>` symlink generated at build time — " +
      "not reachable in the standalone Docker runtime, so the Codex app-server WebSocket transport " +
      "(and the plain Codex WS transport sharing this loader) is permanently disabled in production " +
      "(#12491). Route the specifier through a variable the bundler cannot statically analyze, " +
      "e.g. Reflect.apply(_wreqRequire, undefined, [moduleName]) — the exact pattern already used by " +
      "open-sse/utils/tlsClient.ts's loadRuntimeModule()."
  );
});
