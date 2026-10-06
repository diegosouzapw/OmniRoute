import test from "node:test";
import assert from "node:assert/strict";

import {
  extractRequestToolIdentityMap,
  resolveResponseToolNameMap,
} from "../../open-sse/handlers/chatCore/requestToolIdentity.ts";
import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";
import { caseInsensitiveToolNameLookup } from "../../open-sse/translator/helpers/toolCallHelper.ts";

// Regression guard for the ordering hazard between `extractRequestToolIdentityMap`
// and the response-side alias resolution.
//
// `extractRequestToolIdentityMap` DELETES `translatedBody._toolNameMap`, and the
// response map is resolved ~40 lines later. Read naively, the property is gone
// by then, so `translatedToolNameMap` is undefined for every Gemini/Antigravity
// request and the alias ledger is dropped: the response translator has nothing
// to reverse the sanitized wire name with, and clients reject each MCP tool call
// with "No such tool available".
//
// `toToolNameAliasMap` was already covered in isolation
// (chatcore-request-tool-identity-contracts), but nothing pinned the ORDERING —
// deleting the recovery fallback left the whole tool-name suite green.

const MCP_TOOL_NAME = "mcp__chrome-devtools__list_pages";
const GEMINI_WIRE_NAME = "mcp_chrome_devtools_list_pages";

function geminiRequestWithMcpTool() {
  return openaiToGeminiRequest(
    "gemini-3.5-flash",
    {
      messages: [{ role: "user", content: "list the browser pages" }],
      tools: [
        {
          type: "function",
          function: {
            name: MCP_TOOL_NAME,
            description: "List browser pages",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
    },
    false
  ) as Record<string, unknown>;
}

test("gemini MCP tool alias survives extractRequestToolIdentityMap consuming the ledger", () => {
  const translatedBody = geminiRequestWithMcpTool();

  const declared = (translatedBody.tools as { functionDeclarations?: { name?: string }[] }[])?.[0]
    ?.functionDeclarations?.[0]?.name;
  assert.equal(declared, GEMINI_WIRE_NAME, "precondition: the wire name is sanitized");

  const requestToolIdentityMap = extractRequestToolIdentityMap(translatedBody);
  assert.equal(
    translatedBody._toolNameMap,
    undefined,
    "precondition: extract consumes the ledger, so the later read sees nothing"
  );

  const toolNameMap = resolveResponseToolNameMap(
    translatedBody._toolNameMap,
    null,
    requestToolIdentityMap
  );

  assert.ok(
    toolNameMap instanceof Map,
    "the consumed ledger must be recovered, or every Gemini MCP tool call breaks"
  );
  assert.equal(
    caseInsensitiveToolNameLookup(GEMINI_WIRE_NAME, toolNameMap),
    MCP_TOOL_NAME,
    "the client must get back the tool name it registered"
  );
});

test("an intact translated ledger still wins over the recovered one", () => {
  const intact = new Map([["wire_name", "Intact"]]);
  const recovered = new Map<string, unknown>([["wire_name", "Recovered"]]);

  assert.equal(resolveResponseToolNameMap(intact, null, recovered), intact);
});

test("native Claude passthrough takes precedence over the identity fallback", () => {
  const nativeClaude = new Map([["proxy_read", "Read"]]);
  const identities = new Map<string, unknown>([["lowercase", "Lowercase"]]);

  assert.equal(resolveResponseToolNameMap(undefined, nativeClaude, identities), nativeClaude);
});

test("namespace identities are not reinterpreted as response aliases", () => {
  const identities = new Map<string, unknown>([
    ["mcp__files__read", { namespace: "mcp__files", name: "read" }],
  ]);

  assert.equal(resolveResponseToolNameMap(undefined, null, identities), null);
});

test("an empty translated ledger falls through to recovery", () => {
  const recovered = new Map<string, unknown>([["wire", "Original"]]);

  assert.deepEqual(
    resolveResponseToolNameMap(new Map(), null, recovered),
    new Map([["wire", "Original"]])
  );
});
