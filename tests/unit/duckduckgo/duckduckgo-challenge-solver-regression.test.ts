import { test } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  CHALLENGE_STUBS,
  buildHtmlLookup,
  countHtmlElements,
  sha256Base64,
  solveDuckDuckGoChallenge,
  DUCKDUCKGO_CHALLENGE_ORIGIN,
} from "../../../open-sse/executors/duckduckgo-web/challenge.ts";

/**
 * Regression suite for the DuckDuckGo AI Chat anti-abuse challenge solver.
 *
 * Background: every duckduckgo-web chat request was failing with HTTP 418
 * ERR_CHALLENGE while duck.ai worked normally in a browser from the same IP.
 * Root-causing it turned up several independent defects, each of which is
 * pinned below. The fixtures in `tests/fixtures/duckduckgo/challenge-variants.json`
 * are REAL challenge programs captured from duckduckgo.com, together with the
 * probe vectors a real (headful) Chromium produced for those exact programs.
 * Matching Chromium bit-for-bit is the actual correctness criterion, so these
 * tests assert against recorded browser behaviour rather than our own output.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES = join(HERE, "../../fixtures/duckduckgo/challenge-variants.json");

type Variant = {
  challengeBase64: string;
  browserProbes: string[];
  browserReduceVectors: Array<{ seed: number; booleans: number[] }>;
};
const VARIANTS = JSON.parse(readFileSync(FIXTURES, "utf8")) as Record<string, Variant>;
const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36";

function makeContext(challengeJs: string): vm.Context {
  const stubs = CHALLENGE_STUBS.replace("__DDG_REAL_UA__", JSON.stringify(UA)).replace(
    "__DDG_HTML_LOOKUP__",
    JSON.stringify(buildHtmlLookup(challengeJs))
  );
  const context = vm.createContext({});
  vm.runInContext(stubs, context, { timeout: 5000 });
  return context;
}

// ---------------------------------------------------------------------------
// Bug 1 — module syntax inside the sandbox source.
// `vm.runInContext` compiles in SCRIPT mode. A refactor mass-added `export` to
// the `function` declarations inside CHALLENGE_STUBS (they look like ordinary
// top-level TS functions), making every solve throw SyntaxError. The executor
// swallows solve failures and posts the raw unsolved challenge, so the upstream
// answered 418 for every request.
// ---------------------------------------------------------------------------
test("CHALLENGE_STUBS uses no module syntax and compiles in script mode", () => {
  assert.doesNotMatch(
    CHALLENGE_STUBS,
    /(^|[\s;{}])(export|import)[\s{*]/,
    "vm.runInContext compiles in script mode — export/import is a hard SyntaxError"
  );
  const source = CHALLENGE_STUBS.replace("__DDG_REAL_UA__", '"ua"').replace(
    "__DDG_HTML_LOOKUP__",
    "{}"
  );
  assert.doesNotThrow(() => new vm.Script(source));
});

// ---------------------------------------------------------------------------
// Bug 2 — regex escaping inside a String.raw template.
// CHALLENGE_STUBS is a String.raw literal, so `\\s` reaches the sandbox as a
// literal backslash-backslash-s and the display regex never matched. One
// challenge variant asserts getComputedStyle(el).getPropertyValue('display')
// is non-empty, so this silently flipped a probe to false.
// ---------------------------------------------------------------------------
test("computed-style display probe resolves a real value", () => {
  const context = makeContext("");
  const display = vm.runInContext(
    `(function(){
       var d = document.createElement('div');
       d.style.cssText = 'display:inline-block;padding:8px;position:absolute;visibility:hidden;';
       return getComputedStyle(d).getPropertyValue('display');
     })()`,
    context
  );
  assert.equal(display, "inline-block");
});

test("CHALLENGE_STUBS contains no double-escaped regex metacharacters", () => {
  // String.raw means `\\s` in the source IS `\\s` in the sandbox — always a bug.
  assert.doesNotMatch(CHALLENGE_STUBS, /\\\\[sdwbSDWB]/);
});

// ---------------------------------------------------------------------------
// Bug 3 — buildHtmlLookup descendant count was off by one.
// `count` backs `el.querySelectorAll('*').length` for an element whose
// innerHTML is the given markup. querySelectorAll('*') returns DESCENDANTS, and
// countHtmlElements already skips the #document-fragment root, so subtracting 1
// undercounted. A variant multiplies innerHTML.length by that count, so the
// error propagated straight into the hash.
// ---------------------------------------------------------------------------
test("buildHtmlLookup reports the browser's descendant count", () => {
  // Chromium: for innerHTML = '<li><div></li><li></div', querySelectorAll('*')
  // has length 3 and innerHTML serializes to 29 characters.
  const html = "<li><div></li><li></div";
  const entry = buildHtmlLookup(`x = "${html}"`)[html];
  assert.equal(entry.html, "<li><div></div></li><li></li>");
  assert.equal(entry.html.length, 29);
  assert.equal(entry.count, 3);
  assert.equal(countHtmlElements({ nodeName: undefined, childNodes: [] }), 0);
});

// ---------------------------------------------------------------------------
// Bug 4 — the browser-fidelity probes.
// Newer challenge variants interrogate JS/DOM invariants that a naive stub
// object does not satisfy (prototype chains, NodeList identity, live
// HTMLCollection, native-code toString, sloppy-mode `this`). Nine of thirteen
// failed. Each is pinned individually so a future stub regression names itself.
// ---------------------------------------------------------------------------
const FIDELITY_PROBES: Array<[string, string, boolean]> = [
  [
    "built-ins stringify as native code",
    `window.parseInt.toString().includes("[native code]")`,
    true,
  ],
  [
    "Array subclass survives map",
    `(function(){ class S extends Array {}; return new S(1,2,3).map(function(x){return x*2;}) instanceof S; })()`,
    true,
  ],
  [
    "window brands as [object Window]",
    `Object.prototype.toString.call(window) === "[object Window]"`,
    true,
  ],
  ["Error instances are real", `new Error() instanceof Error`, true],
  [
    "captureStackTrace is absent or a function",
    `Error.captureStackTrace === undefined || typeof Error.captureStackTrace === "function"`,
    true,
  ],
  // Chromium reports false here; sealing Math made our vector differ by one.
  ["Math is NOT sealed (matches Chromium)", `Object.isSealed(Math)`, false],
  ["sloppy-mode this is window", `(function(){ return this; })() === window`, true],
  [
    "document.body.children is live",
    `(function(){
       var c = document.body.children, n = c.length, d = document.createElement('div');
       document.body.appendChild(d);
       var grew = c.length === n + 1;
       document.body.removeChild(d);
       return grew && c.length === n;
     })()`,
    true,
  ],
  ["querySelectorAll is not an Array", `!Array.isArray(document.querySelectorAll("*"))`, true],
  [
    "querySelectorAll is a NodeList",
    `document.querySelectorAll("*").constructor.name === "NodeList"`,
    true,
  ],
  [
    "createElement('div') is an HTMLDivElement",
    `document.createElement("div") instanceof HTMLDivElement`,
    true,
  ],
  [
    "HTMLDivElement derives from HTMLElement",
    `HTMLDivElement.prototype instanceof HTMLElement`,
    true,
  ],
  ["HTMLElement derives from Element", `HTMLElement.prototype instanceof Element`, true],
  ["navigator.webdriver is falsy", `navigator.webdriver === true`, false],
  ["navigator survives the global aliasing", `navigator.userAgent === ${JSON.stringify(UA)}`, true],
  ["window.document is the document", `window.document === document`, true],
];

for (const [name, expression, expected] of FIDELITY_PROBES) {
  test(`browser-fidelity probe: ${name}`, () => {
    const context = makeContext("");
    assert.equal(vm.runInContext(expression, context), expected);
  });
}

// ---------------------------------------------------------------------------
// The real acceptance criterion: for every captured challenge variant our
// sandbox must produce exactly the probe values a real Chromium produced.
// ---------------------------------------------------------------------------
for (const [file, variant] of Object.entries(VARIANTS)) {
  test(`challenge variant ${file} matches real-browser probe values`, async () => {
    const js = Buffer.from(variant.challengeBase64, "base64").toString("utf8");
    const context = makeContext(js);
    const result = (await vm.runInContext(js, context, { timeout: 5000 })) as {
      client_hashes: unknown[];
    };
    // `result` crosses the vm realm boundary, so its arrays carry the sandbox's
    // Array.prototype. Copy into this realm or deepStrictEqual fails on the
    // prototype even when every element matches.
    const ours = Array.from(result.client_hashes).slice(1).map(String);
    assert.deepEqual(
      ours,
      variant.browserProbes,
      `probe values must match Chromium exactly for ${file}`
    );
  });
}

// ---------------------------------------------------------------------------
// Bug 5 — the solved payload dropped meta.origin / meta.stack / meta.duration.
// The duck.ai frontend always sends all three; captured browser requests
// confirm it. Without them the upstream returns 418 even when every
// client_hash is correct.
// ---------------------------------------------------------------------------
test("solveDuckDuckGoChallenge stamps meta.origin/stack/duration", async () => {
  const [variant] = Object.values(VARIANTS);
  const solved = await solveDuckDuckGoChallenge(variant.challengeBase64, UA);
  const decoded = JSON.parse(Buffer.from(solved, "base64").toString("utf8"));

  assert.equal(decoded.meta.origin, DUCKDUCKGO_CHALLENGE_ORIGIN);
  assert.match(decoded.meta.stack, /^Error\n\s*at l \(https:\/\/duck\.ai\/.*\.js:\d+:\d+\)/);
  assert.match(String(decoded.meta.duration), /^\d+$/);
  // The challenge's own meta must survive alongside the added fields.
  assert.equal(decoded.meta.v, "4");
  assert.ok(decoded.meta.challenge_id);
});

test("solveDuckDuckGoChallenge honours an explicit origin/bundle", async () => {
  const [variant] = Object.values(VARIANTS);
  const solved = await solveDuckDuckGoChallenge(variant.challengeBase64, UA, {
    origin: "https://duckduckgo.com",
    bundlePath: "/dist/x.js",
  });
  const decoded = JSON.parse(Buffer.from(solved, "base64").toString("utf8"));
  assert.equal(decoded.meta.origin, "https://duckduckgo.com");
  assert.ok(decoded.meta.stack.includes("https://duckduckgo.com/dist/x.js"));
});

test("solveDuckDuckGoChallenge hashes client_hashes with the real UA in slot 0", async () => {
  const [file, variant] = Object.entries(VARIANTS)[0];
  const solved = await solveDuckDuckGoChallenge(variant.challengeBase64, UA);
  const decoded = JSON.parse(Buffer.from(solved, "base64").toString("utf8"));

  const expected = [sha256Base64(UA), ...variant.browserProbes.map((p) => sha256Base64(p))];
  assert.deepEqual(decoded.client_hashes, expected, `client_hashes mismatch for ${file}`);
  // server_hashes are echoed back untouched.
  assert.ok(Array.isArray(decoded.server_hashes));
});

test("solveDuckDuckGoChallenge rejects a challenge with no client_hashes", async () => {
  const bad = Buffer.from(`(async function(){ return { client_hashes: [] }; })()`, "utf8").toString(
    "base64"
  );
  await assert.rejects(() => solveDuckDuckGoChallenge(bad, UA), /empty client_hashes/);
});
