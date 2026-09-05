import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The WebDAV wrapper used to be `async` and awaited maybeHandleWebdav() for every
// request. Even when it returned false, that await deferred listener.call() by a
// microtask, so Next attached its 'data'/'end' handlers one tick late and lost the
// beginning of a streaming request body — multipart uploads (POST
// /v1/audio/transcriptions) then hung forever in request.formData().
//
// standalone-server-ws.mjs has top-level side effects (it monkeypatches
// http.createServer and awaits ./server.js, which only exists in the assembled
// standalone output), so it cannot be imported in-process. Guard the fix by
// inspecting the source, mirroring standalone-server-ws-keepalive-timeout-7003.test.ts.
const here = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(
  path.resolve(here, "../../../scripts/dev/standalone-server-ws.mjs"),
  "utf8"
);

const wrapper = source.slice(
  source.indexOf("function wrapRequestListenerWithWebdav"),
  source.indexOf("http.createServer = function createServerWithResponsesWs")
);

test("standalone-server-ws.mjs imports WEBDAV_PREFIX to gate the async branch", () => {
  assert.match(
    source,
    /import\s*\{[^}]*WEBDAV_PREFIX[^}]*\}\s*from\s*["']\.\/webdav-handler\.mjs["']/,
    "expected WEBDAV_PREFIX to come from the shipped sibling ./webdav-handler.mjs"
  );
});

test("the WebDAV request wrapper is not async", () => {
  assert.ok(wrapper.length > 0, "expected to find wrapRequestListenerWithWebdav");
  assert.doesNotMatch(
    wrapper,
    /return\s+async\s+function\s+webdavAwareRequestHandler/,
    "an async handler defers listener.call() by a microtask and truncates streaming bodies"
  );
});

test("non-WebDAV requests reach the wrapped listener before any await", () => {
  const prefixGuard = wrapper.indexOf("WEBDAV_PREFIX");
  const firstListenerCall = wrapper.indexOf("listener.call");
  const firstAwait = wrapper.indexOf("await ");

  assert.ok(prefixGuard >= 0, "expected the handler to test req.url against WEBDAV_PREFIX");
  assert.ok(firstListenerCall >= 0, "expected the handler to call the wrapped listener");
  assert.ok(
    prefixGuard < firstListenerCall,
    "expected the URL guard to run before the listener is invoked"
  );
  assert.ok(
    firstListenerCall < firstAwait,
    "expected the synchronous listener.call() to precede any await"
  );
});
