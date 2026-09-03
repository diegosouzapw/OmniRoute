import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

// Split-guard for the duckduckgo-web challenge-solver extraction.
// The anti-abuse challenge solver + FE signals live in duckduckgo-web/challenge.ts
// (pure of module state; the vm sandbox + 5s timeout are preserved). Host imports back.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../../open-sse/executors");
const HOST = join(EXE, "duckduckgo-web.ts");
const LEAF = join(EXE, "duckduckgo-web/challenge.ts");

test("leaf hosts the solver and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  assert.match(src, /export async function solveDuckDuckGoChallenge\b/);
  assert.match(src, /export function makeDuckDuckGoFeSignals\b/);
  assert.match(src, /type DuckDuckGoChallengeResult\s*=/);
  assert.doesNotMatch(src, /from "\.\.\/duckduckgo-web\.ts"/);
  // The vm sandbox timeout must survive the move (security invariant).
  assert.match(src, /timeout/);
});

test("host imports the solver back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/duckduckgo-web\/challenge\.ts"/);
  assert.doesNotMatch(host, /type DuckDuckGoChallengeResult\s*=/);
});

test("makeDuckDuckGoFeSignals returns a base64 string", async () => {
  const { makeDuckDuckGoFeSignals } =
    await import("../../../open-sse/executors/duckduckgo-web/challenge.ts");
  const out = makeDuckDuckGoFeSignals();
  assert.equal(typeof out, "string");
  assert.ok(out.length > 0);
});

// Regression guard: CHALLENGE_STUBS is browser-emulation source executed by
// `vm.runInContext`, which compiles in SCRIPT mode — module syntax is a hard
// SyntaxError there. A refactor once mass-added `export` to the `function`
// declarations inside this template literal (they look like ordinary top-level
// TS functions), which made every solve throw. The executor swallows solve
// failures and sends the raw unsolved challenge, so DuckDuckGo answered every
// chat request with HTTP 418 ERR_CHALLENGE while the site worked fine in a
// browser from the same IP. The three tests below fail on that class of bug.
test("CHALLENGE_STUBS contains no module syntax (vm runs it in script mode)", async () => {
  const { CHALLENGE_STUBS } = await import("../../../open-sse/executors/duckduckgo-web/challenge.ts");
  assert.doesNotMatch(
    CHALLENGE_STUBS,
    /(^|[\s;{}])(export|import)[\s{*]/,
    "CHALLENGE_STUBS must not use export/import — vm.runInContext compiles in script mode"
  );
});

test("CHALLENGE_STUBS compiles as a script", async () => {
  const { CHALLENGE_STUBS } = await import("../../../open-sse/executors/duckduckgo-web/challenge.ts");
  // Placeholders are substituted before execution; do the same here so the
  // source is syntactically complete.
  const source = CHALLENGE_STUBS.replace("__DDG_REAL_UA__", '"test-ua"').replace(
    "__DDG_HTML_LOOKUP__",
    "{}"
  );
  assert.doesNotThrow(() => new vm.Script(source), "CHALLENGE_STUBS must parse in script mode");
});

test("CHALLENGE_STUBS evaluates and defines the browser stubs the challenge probes", async () => {
  const { CHALLENGE_STUBS } = await import("../../../open-sse/executors/duckduckgo-web/challenge.ts");
  const source = CHALLENGE_STUBS.replace("__DDG_REAL_UA__", '"test-ua"').replace(
    "__DDG_HTML_LOOKUP__",
    "{}"
  );
  const context = vm.createContext({});
  vm.runInContext(source, context, { timeout: 5000 });

  // A real DDG challenge reads these; if the stubs silently failed to evaluate
  // they would all be undefined and the solver would produce garbage.
  assert.equal(
    vm.runInContext("navigator.userAgent", context),
    "test-ua",
    "navigator.userAgent must carry the injected UA"
  );
  assert.equal(vm.runInContext("typeof document.querySelector", context), "function");
  assert.equal(vm.runInContext("document.getElementById('jsa').tagName", context), "IFRAME");
  assert.equal(vm.runInContext("typeof getComputedStyle", context), "function");
  assert.equal(vm.runInContext("window.top === window", context), true);
});

// End-to-end guard on the solver itself, using a stand-in challenge that mimics
// the real one's contract: an async IIFE returning { server_hashes, client_hashes,
// signals, meta }. This exercises the full stubs -> vm -> hash -> base64 path
// without hitting the network.
test("solveDuckDuckGoChallenge solves a representative challenge payload", async () => {
  const { solveDuckDuckGoChallenge, sha256Base64 } =
    await import("../../../open-sse/executors/duckduckgo-web/challenge.ts");
  const fakeChallenge = `(async function(){
    return {
      server_hashes: ["s1", "s2"],
      client_hashes: [navigator.userAgent, document.getElementById('jsa').tagName],
      signals: {},
      meta: { v: "4", challenge_id: "test" }
    };
  })()`;
  const ua = "Mozilla/5.0 (X11; Linux x86_64) TestAgent/1.0";
  const solved = await solveDuckDuckGoChallenge(
    Buffer.from(fakeChallenge, "utf8").toString("base64"),
    ua
  );
  const decoded = JSON.parse(Buffer.from(solved, "base64").toString("utf8"));

  assert.deepEqual(decoded.server_hashes, ["s1", "s2"], "server_hashes pass through untouched");
  // Slot 0 is overwritten with the real UA before hashing, then every slot is sha256+base64.
  assert.deepEqual(decoded.client_hashes, [sha256Base64(ua), sha256Base64("IFRAME")]);
  assert.equal(decoded.meta.challenge_id, "test");
});
