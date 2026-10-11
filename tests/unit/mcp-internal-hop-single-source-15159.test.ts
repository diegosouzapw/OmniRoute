// #15159 M-06 — "Three copies of the internal hop".
//
// Before this PR there were three implementations of the same server-to-server call:
//
//   open-sse/mcp-server/server.ts:199        omniRouteFetch   env read: LAZY
//   open-sse/mcp-server/tools/advancedTools.ts:37  apiFetch    env read: MODULE LOAD
//   open-sse/mcp-server/tools/pickFastestModel.ts:17 apiFetch  env read: MODULE LOAD
//
// Three consequences, each pinned below:
//
//  1. The two copies froze `OMNIROUTE_API_KEY` (and the base URL) at MODULE LOAD. A key
//     exported after the module was imported — the normal shape for a test, and for any
//     process that configures its environment late — was silently absent, so the hop went
//     out unauthenticated instead of failing loudly.
//
//  2. The error text had already drifted: `OmniRoute API error [n]` vs `API [n]`. The
//     catalogs' own copy was worse still — it reached the hop through
//     `import("./server.ts")` purely because the hop lived inside the file that registers
//     the tools. That dynamic import is what closed two cycles in the graph.
//
//  3. The two copies hardcoded `AbortSignal.timeout(30000)` while the canonical one used
//     `mcpFetchTimeoutSignal("management")`, so the documented env override
//     (OMNIROUTE_MCP_FETCH_TIMEOUT_MS) silently did not apply to 18 MCP tools.
//
// Fix: one shared hop in `open-sse/mcp-server/internalFetch.ts` — the module name M-01's
// prescribed split already names — read lazily, with every caller routed through it.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const HOP_MODULE = "open-sse/mcp-server/internalFetch.ts";

function source(path: string): string {
  return readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
}

/**
 * Source with comments stripped.
 *
 * Needed because this file documents the pattern it forbids: the fix's own comments quote
 * the removed `import("./server.ts")` call to explain why it went away. Matching raw text
 * would mean a code comment could turn a regression guard red, which is worse than no
 * guard — the next reader would "fix" working code.
 */
function code(path: string): string {
  return source(path)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

// Every consumer of the internal hop.
const CALLERS = [
  "open-sse/mcp-server/server.ts",
  "open-sse/mcp-server/tools/advancedTools.ts",
  "open-sse/mcp-server/tools/pickFastestModel.ts",
  // The two catalogs. These are the cycle offenders.
  "open-sse/mcp-server/catalog.ts",
  "open-sse/mcp-server/radarCatalog.ts",
];

test("M-06: the shared hop exists as its own module", () => {
  // Guard the structural premise first, so a later failure reads as "the module moved"
  // rather than "some assertion about fetch headers failed".
  let text: string;
  try {
    text = source(HOP_MODULE);
  } catch {
    assert.fail(`${HOP_MODULE} does not exist — the shared hop was never extracted`);
  }
  assert.match(
    text,
    /export\s+async\s+function\s+omniRouteFetch/,
    `${HOP_MODULE} must export the hop`
  );
});

test("M-06: none of the five callers defines its own hop", () => {
  // The actual defect was duplication. Three private `apiFetch`/`omniRouteFetch` bodies
  // is what let the env read and the error text drift apart in the first place.
  const offenders = CALLERS.filter((file) => {
    const text = source(file);
    return /^(?:export\s+)?async\s+function\s+(?:apiFetch|omniRouteFetch)\s*\(/m.test(text);
  });
  assert.deepEqual(
    offenders,
    [],
    `these files define their own internal hop — they must import ${HOP_MODULE}:\n${offenders.join("\n")}`
  );
});

test("M-06: every caller imports the hop from the shared module", () => {
  const missing = CALLERS.filter((file) => !/internalFetch\.ts/.test(source(file)));
  assert.deepEqual(
    missing,
    [],
    `these callers do not import ${HOP_MODULE}:\n${missing.join("\n")}`
  );
});

test("M-06: the catalogs no longer reach the hop through server.ts", () => {
  // This is the cycle. `catalog.ts` and `radarCatalog.ts` are imported BY server.ts, so a
  // static import back into server.ts would close a cycle — the original author worked
  // around it with `import("./server.ts")`, which closes the same edge for dpdm. With the
  // hop in its own leaf module the workaround is unnecessary and must be gone.
  const offenders = CALLERS.filter((file) =>
    /import\(\s*["'][^"']*server\.ts["']\s*\)/.test(code(file))
  );
  assert.deepEqual(
    offenders,
    [],
    `these files still dynamically import server.ts to reach the hop, which keeps two cycles alive:\n${offenders.join("\n")}`
  );
  // SHAPE-SANITY: prove the stripper did not simply make the regex unfindable. A comment
  // quoting the call must NOT trip it, and a real call must.
  assert.doesNotMatch(
    code("open-sse/mcp-server/catalog.ts"),
    /omniRouteFetch\(path\)/,
    "the stripper left dead call syntax behind"
  );
  assert.match(
    'const x = (p: string) => import("./server.ts").then((m) => m.hop(p));',
    /import\(\s*["'][^"']*server\.ts["']\s*\)/,
    "the dynamic-import detector itself is broken"
  );
});

test("M-06: the env read is lazy, not frozen at module load", async () => {
  // The bug in one assertion. A key exported AFTER the module was imported must still be
  // used. Today the two tool-side copies snapshot it at module scope, so this fails.
  const { omniRouteFetch } = await import(`../../${HOP_MODULE}`);

  const originalFetch = globalThis.fetch;
  const originalKey = process.env.OMNIROUTE_API_KEY;
  const originalBase = process.env.OMNIROUTE_BASE_URL;
  let seen: { url: string; auth: string | null } | null = null;

  try {
    // Set AFTER the dynamic import above has already evaluated the module.
    process.env.OMNIROUTE_API_KEY = "late-bound-key";
    process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:29999";

    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = (init?.headers ?? {}) as Record<string, string>;
      seen = {
        url: String(input),
        auth: headers.Authorization ?? (headers.authorization as string | undefined) ?? null,
      };
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;

    await omniRouteFetch("/api/late-binding-probe");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = originalKey;
    if (originalBase === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = originalBase;
  }

  assert.ok(seen, "the hop never reached fetch");
  assert.equal(
    (seen as { auth: string | null }).auth,
    "Bearer late-bound-key",
    "OMNIROUTE_API_KEY set after module load was ignored — the env read is not lazy"
  );
  assert.equal(
    (seen as { url: string }).url,
    "http://127.0.0.1:29999/api/late-binding-probe",
    "OMNIROUTE_BASE_URL set after module load was ignored — the base URL is not lazy"
  );
});

test("M-06: a hop failure carries the canonical error text", async () => {
  // The drift the catalog named: `API [n]` vs `OmniRoute API error [n]`. `server.ts` is the
  // canonical form; every caller now produces it.
  const { omniRouteFetch } = await import(`../../${HOP_MODULE}`);

  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = (async () =>
      new Response("upstream said no", { status: 503 })) as typeof fetch;
    await assert.rejects(
      () => omniRouteFetch("/api/whatever"),
      /OmniRoute API error \[503\]: upstream said no/,
      "the hop must use the canonical 'OmniRoute API error [status]' text"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("M-06: the one inference hop in the tool modules uses the upstream budget", () => {
  // #9717 territory. `omniroute_test_combo` probes every provider in a combo in parallel via
  // /v1/chat/completions, so it waits on upstream providers, not on local management reads.
  // The module's deleted private copy hardcoded 30s; inheriting the shared hop would have
  // silently dropped it to the 10s management default and aborted live probes — the exact
  // failure #9717 was filed for on `route_request`. The upstream budget is 60s, so this is
  // also strictly more generous than what it had.
  const text = source("open-sse/mcp-server/tools/advancedTools.ts");
  const lines = text.split("\n");
  const start = lines.findIndex((l) => l.includes('apiFetch("/v1/chat/completions"'));
  assert.notEqual(start, -1, "could not locate the /v1/chat/completions hop in advancedTools.ts");

  // Bound the window by the NEXT hop rather than by brace-matching: the options object
  // contains a nested `JSON.stringify({ ... })` whose `}),` closes before the outer call
  // does, so a naive brace walk stops early and would silently drop the assertion's target.
  const nextHop = lines.findIndex((l, i) => i > start && l.includes("apiFetch("));
  const end = nextHop === -1 ? Math.min(lines.length, start + 40) : nextHop;
  const callBody = lines.slice(start, end).join("\n");
  assert.match(
    callBody,
    /mcpFetchTimeoutSignal\(\s*"upstream"/,
    "the inference hop must request the upstream budget, not inherit the management default"
  );

  // SHAPE-SANITY: every other hop in these modules is a local /api read and must NOT be
  // given an upstream budget, or this assertion could pass by blanket-applying it.
  const managementOnly = [...text.matchAll(/apiFetch\(\s*[`"]([^`"]+)/g)]
    .map((m) => m[1])
    .filter((path) => !path.startsWith("/v1/"));
  assert.ok(
    managementOnly.length > 5,
    `expected several local management hops to classify, got ${managementOnly.length} — the check above would be near-vacuous`
  );
  const upstreamSignals = [...text.matchAll(/mcpFetchTimeoutSignal\(\s*"upstream"/g)];
  assert.equal(
    upstreamSignals.length,
    1,
    "exactly one upstream-budget signal should exist in this module — the inference hop and nothing else"
  );
});

test("M-06: the hop honours the documented MCP fetch-timeout override", async () => {
  // `mcpFetchTimeoutSignal("management")` reads OMNIROUTE_MCP_FETCH_TIMEOUT_MS. The two
  // deleted copies hardcoded AbortSignal.timeout(30000), so the documented operator knob
  // silently did nothing for 18 tools.
  const text = source(HOP_MODULE);
  assert.match(
    text,
    /mcpFetchTimeoutSignal\(\s*"management"/,
    "the shared hop must use mcpFetchTimeoutSignal('management') so OMNIROUTE_MCP_FETCH_TIMEOUT_MS applies"
  );
  assert.doesNotMatch(
    text,
    /AbortSignal\.timeout\(\s*3_?000\s*\)/,
    "the hardcoded 30s timeout must not survive — it is what made the env override a no-op"
  );
});
