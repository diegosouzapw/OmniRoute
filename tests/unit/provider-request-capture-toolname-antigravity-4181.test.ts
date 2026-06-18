/**
 * #4181 (follow-up to #4091) — Antigravity tool-name cloak map must survive the
 * request-inspector capture round-trip.
 *
 * The #4091 fix in `createPreparedRequestLogger().body()` re-attaches the
 * non-enumerable `_toolNameMap` that the fetch-capture drops when it rebuilds the
 * upstream body via `JSON.parse(JSON.stringify(...))`. That fix is generic, but
 * #4153 only regression-tested the native-Claude OAuth cloak
 * (`claudeCodeToolRemapper.ts`, PascalCase aliases).
 *
 * Antigravity cloaks differently: `cloakAntigravityToolPayload`
 * (`open-sse/config/toolCloaking.ts`) suffixes custom tools with `_ide`
 * (`workspace_read` → `workspace_read_ide`), leaves native tools (`run_command`,
 * …) untouched, and returns the reverse map SEPARATELY — the executor then pins it
 * onto the transformed body as a non-enumerable `_toolNameMap` via
 * `attachToolNameMap` (`open-sse/executors/antigravity.ts`). These tests pin that
 * the same lossy boundary is covered for the Antigravity suffix scheme, so a
 * future refactor of `providerRequestLogging.ts` or the executor can't silently
 * re-break Antigravity tool dispatch.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  createPreparedRequestLogger,
  type ProviderRequestPrepared,
} from "../../open-sse/utils/providerRequestLogging.ts";
import {
  cloakAntigravityToolPayload,
  AG_TOOL_SUFFIX,
} from "../../open-sse/config/toolCloaking.ts";

function makeCapture() {
  const logged: unknown[] = [];
  const reqLogger = {
    logTargetRequest: (_url: unknown, _headers: Record<string, string>, body: unknown) => {
      logged.push(body);
    },
  };
  const scope = {
    id: null,
    model: "gemini-2.5-pro",
    provider: "antigravity",
    connectionId: null,
  };
  return { capture: createPreparedRequestLogger(reqLogger, scope), logged };
}

const CUSTOM_TOOL = "workspace_read";
const CLOAKED_TOOL = `workspace_read${AG_TOOL_SUFFIX}`; // workspace_read_ide
const NATIVE_TOOL = "run_command"; // AG_DEFAULT — must stay untouched

/**
 * Mirror the executor's `attachToolNameMap` (antigravity.ts) exactly: pin the
 * reverse map as a NON-ENUMERABLE `_toolNameMap` so it never re-serializes into
 * the upstream request — this is the body the downstream capture+`body()` sees.
 */
function attachToolNameMap<T extends object>(payload: T, map: Map<string, string>): T {
  const copy = { ...payload } as T;
  Object.defineProperty(copy, "_toolNameMap", {
    value: map,
    enumerable: false,
    configurable: true,
    writable: true,
  });
  return copy;
}

function makeCloakedAntigravityBody(): Record<string, unknown> {
  const body: Record<string, unknown> = {
    model: "gemini-2.5-pro",
    request: {
      tools: [
        {
          functionDeclarations: [
            { name: CUSTOM_TOOL, description: "Read a file", parameters: { type: "OBJECT", properties: {} } },
            { name: NATIVE_TOOL, description: "Run a shell command", parameters: { type: "OBJECT", properties: {} } },
          ],
        },
      ],
      contents: [],
    },
  };

  const cloaked = cloakAntigravityToolPayload(body);
  const map = cloaked.toolNameMap;

  // Sanity: the Antigravity cloak fired with its `_ide` scheme and the custom
  // tool was renamed while the native tool was left alone.
  assert.ok(map instanceof Map, "cloak must produce a reverse tool-name map");
  assert.equal(map.get(CLOAKED_TOOL), CUSTOM_TOOL, "reverse map: _ide alias → original");
  assert.equal(map.get(NATIVE_TOOL), undefined, "native tools are not cloaked");

  const declarations = (
    (cloaked.body.request as Record<string, unknown>).tools as Array<{
      functionDeclarations: Array<{ name: string }>;
    }>
  )[0].functionDeclarations.map((d) => d.name);
  assert.ok(declarations.includes(CLOAKED_TOOL), "custom tool declaration carries the _ide suffix");
  assert.ok(declarations.includes(NATIVE_TOOL), "native tool declaration is preserved verbatim");

  return attachToolNameMap(cloaked.body, map);
}

test("#4181 body() preserves the Antigravity _ide cloak map dropped by the capture round-trip", () => {
  const { capture } = makeCapture();
  const transformedBody = makeCloakedAntigravityBody();

  // The fetch-capture serializes the outgoing body and rebuilds it — exactly what
  // `captureFetchRequest` does — which strips the non-enumerable map.
  const bodyString = JSON.stringify(transformedBody);
  const captured = JSON.parse(bodyString);
  assert.equal(
    (captured as Record<string, unknown>)._toolNameMap,
    undefined,
    "precondition: JSON round-trip drops the non-enumerable _toolNameMap"
  );
  const prepared: ProviderRequestPrepared = {
    url: "https://server.codeium.com/exa.language_server_pb.LanguageServerService/GenerateAntigravity",
    headers: {},
    body: captured,
    bodyString,
  };
  capture.capture(prepared);

  // finalBody is what chatCore feeds to the response-side un-cloak.
  const finalBody = capture.body(transformedBody) as Record<string, unknown>;
  const map = finalBody._toolNameMap;
  assert.ok(map instanceof Map, "finalBody must still carry the per-request Antigravity cloak map");
  assert.equal(
    (map as Map<string, string>).get(CLOAKED_TOOL),
    CUSTOM_TOOL,
    "_ide alias must resolve back to the original tool name"
  );
});

test("#4181 the re-attached Antigravity map stays non-enumerable (never re-serializes upstream)", () => {
  const { capture } = makeCapture();
  const transformedBody = makeCloakedAntigravityBody();
  const bodyString = JSON.stringify(transformedBody);
  capture.capture({
    url: "https://server.codeium.com/...",
    headers: {},
    body: JSON.parse(bodyString),
    bodyString,
  });

  const finalBody = capture.body(transformedBody) as Record<string, unknown>;
  assert.ok(finalBody._toolNameMap instanceof Map);
  assert.ok(
    !Object.keys(finalBody).includes("_toolNameMap"),
    "_toolNameMap must stay non-enumerable so it never re-serializes upstream"
  );
  assert.ok(
    !JSON.stringify(finalBody).includes("_toolNameMap"),
    "_toolNameMap must not appear in a serialized provider body"
  );
});

test("#4181 body() leaves non-cloaked Antigravity traffic untouched (no spurious map)", () => {
  const { capture } = makeCapture();
  // Only native tools → cloak produces no map, executor attaches nothing.
  const plainBody: Record<string, unknown> = {
    model: "gemini-2.5-pro",
    request: {
      tools: [
        {
          functionDeclarations: [
            { name: NATIVE_TOOL, description: "Run a shell command", parameters: { type: "OBJECT", properties: {} } },
          ],
        },
      ],
      contents: [],
    },
  };
  const cloaked = cloakAntigravityToolPayload(plainBody);
  assert.equal(cloaked.toolNameMap, null, "all-native payload yields no reverse map");

  const bodyString = JSON.stringify(cloaked.body);
  capture.capture({
    url: "https://server.codeium.com/...",
    headers: {},
    body: JSON.parse(bodyString),
    bodyString,
  });
  const finalBody = capture.body(cloaked.body) as Record<string, unknown>;
  assert.equal(finalBody._toolNameMap, undefined);
});
