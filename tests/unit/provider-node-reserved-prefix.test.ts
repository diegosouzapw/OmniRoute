// Reserved provider prefixes — compatible-node prefix guard (TDD, tokenrouter bug).
//
// Bug: an operator-created openai-compatible node with prefix "tokenrouter" was
// accepted at creation time, but the runtime model resolver
// (src/sse/services/model.ts) treats built-in registry ids/aliases as reserved
// and skips the node lookup — so `tokenrouter/qwen/...` routed to the BUILT-IN
// tokenrouter provider ("No active credentials for provider: tokenrouter")
// instead of the operator's node. The same node addressed by its internal id
// worked fine. Fix: reject reserved prefixes at the write path (node
// create/update schemas) so the misconfiguration can no longer be created.
//
// The reserved set is shared between the runtime guard and the validation
// schemas via src/shared/constants/reservedProviderPrefixes.ts (single source of
// truth). Live set semantics mirror the old inline guard exactly; exact retired
// ids remain reserved after registry removal and use trim + lowercase matching:
//   - REGISTRY entry ids + aliases, plus retired ids;
//   - live ids remain case-sensitive (mixed-case "TokenRouter" does NOT collide);
//   - manual alias ids that live outside REGISTRY (xiaomi/llamacpp/aq) are NOT
//     included — verified they do not intercept nodes at runtime.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reserved-prefix-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providerNodesIdRoute = await import("../../src/app/api/provider-nodes/[id]/route.ts");
const { createProviderNodeSchema, updateProviderNodeSchema } =
  await import("../../src/shared/validation/schemas.ts");
const { RESERVED_PROVIDER_PREFIXES, isReservedProviderPrefix, RESERVED_PREFIX_COUNT } =
  await import("../../src/shared/constants/reservedProviderPrefixes.ts");
const { buildReservedPrefixes, getProviderPrefixIndex } =
  await import("../../src/lib/providerNodePrefixes.ts");
const providerNodesDb = await import("../../src/lib/db/providers/nodes.ts");
const { isCommonChatGptWebRetiredProviderId } =
  await import("../../src/shared/constants/chatgptWebRetirement.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Minimal response-body shapes (no `any` — new eslint violations must be fixed,
// not suppressed). `unknown` fields are narrowed through helpers before use.
type ValidationDetail = { field: string; message: string };
type ValidationBody = { error?: { details?: ValidationDetail[] } };
type NodeBody = { node?: { id?: string; prefix?: string } };

function asValidationBody(value: unknown): ValidationBody {
  return value && typeof value === "object" ? (value as ValidationBody) : {};
}

function asNodeBody(value: unknown): NodeBody {
  return value && typeof value === "object" ? (value as NodeBody) : {};
}

function findPrefixDetail(body: unknown): ValidationDetail | undefined {
  const details = asValidationBody(body).error?.details ?? [];
  return details.find((d) => d.field === "prefix");
}

function makeCreateRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/provider-nodes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeUpdateRequest(id: string, body: Record<string, unknown>) {
  return new Request(`http://localhost/api/provider-nodes/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ──── Shared module ────

test("shared set contains REGISTRY ids and aliases (tokenrouter + trk)", () => {
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("tokenrouter"), true);
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("trk"), true);
});

test("shared guard keeps retired Felo ids reserved after registry removal", () => {
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("felo-web"), true);
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("felo"), true);
  assert.equal(isReservedProviderPrefix(" FeLo-Web "), true);
  assert.equal(isReservedProviderPrefix("\u00a0FELO\uFEFF"), true);
});

test("shared guard keeps retired Qwen Web ids reserved after registry removal", () => {
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("qwen-web"), true);
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("qw"), true);
  assert.equal(isReservedProviderPrefix(" QwEn-WeB "), true);
  assert.equal(isReservedProviderPrefix("\u00a0QW\uFEFF"), true);
});

test("clean-room ChatGPT Web and its retired alias stay reserved without capturing Codex variants", () => {
  assert.equal(isReservedProviderPrefix("chatgpt-web"), true);
  for (const prefix of ["cgpt-web", " CGPT-Web ", "CGPT-WEB"]) {
    assert.equal(isReservedProviderPrefix(prefix), true, `${prefix} must stay reserved`);
  }
  assert.equal(buildReservedPrefixes().has("chatgpt-web"), true);
  assert.equal(buildReservedPrefixes().has("cgpt-web"), true);

  for (const prefix of ["chatgpt-web-codex", "cgpt-codex"]) {
    assert.equal(isReservedProviderPrefix(prefix), true, `${prefix} remains a live built-in`);
    assert.equal(isCommonChatGptWebRetiredProviderId(prefix), false);
  }
  assert.equal(isReservedProviderPrefix("ChatGPT-Web"), false);
  assert.equal(isReservedProviderPrefix("chatgpt-web-preview"), false);
  assert.equal(isCommonChatGptWebRetiredProviderId("chatgpt-web-preview"), false);
});

test("mixed-case legacy aliases stay retired while live ids retain case-sensitive semantics", async () => {
  for (const [index, prefix] of ["ChatGPT-Web", "CGPT-WEB"].entries()) {
    const id = `openai-compatible-retired-prefix-${index}`;
    await providerNodesDb.createProviderNode({
      id,
      type: "openai-compatible",
      name: `Retired mixed-case prefix ${index}`,
      prefix,
      apiType: "chat",
      baseUrl: "https://retired.example.invalid/v1",
    });
  }

  const index = await getProviderPrefixIndex();
  assert.equal(index.entries.get("ChatGPT-Web")?.status, "unique");
  assert.equal(index.prefixToNode.has("ChatGPT-Web"), true);
  assert.equal(index.entries.get("CGPT-WEB")?.status, "reserved");
  assert.equal(index.prefixToNode.has("CGPT-WEB"), false);
});

test("shared set is case-sensitive like the runtime guard", () => {
  assert.equal(isReservedProviderPrefix("TokenRouter"), false);
  assert.equal(isReservedProviderPrefix("TOKENROUTER"), false);
  assert.equal(isReservedProviderPrefix("tokenrouter"), true);
});

test("shared set excludes manual aliases that never intercept nodes at runtime", () => {
  // Verified against src/sse/services/model.ts behavior: xiaomi/llamacpp/aq are
  // not REGISTRY members and do NOT shadow compatible nodes, so rejecting them
  // would be a false positive.
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("qwen"), false);
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("xiaomi"), false);
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("llamacpp"), false);
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("aq"), false);
});

test("shared set size includes live REGISTRY and retired Designer + Felo + Qwen Web prefixes", () => {
  // 2026-08-30: 398 → 400 with Perplexity Agent API (#12103) and the second prefix the same
  // afternoon batch registered — computed, not hand-derived (see the note below).
  // Computed (not hand-derived) after combining Designer's 2 retired
  // ids/aliases with Felo's 2 retired ids/aliases and Qwen Web's 2 retired
  // ids/aliases (qwen-web's REGISTRY id/alias were identical strings, so its
  // live-REGISTRY contribution was 1 unique member; retiring it removes that
  // 1 and adds 2 distinct tombstones "qwen-web"/"qw", a net +1) on top of the
  // live REGISTRY walk, minus the 3 GPL-derived Raycast/Hailuo Web
  // ids/aliases removed from REGISTRY by #11691's migration 166.
  // #11513: the two UC providers add four REGISTRY prefixes — the persona id "uc" +
  // alias "ucn", and the Developer API id "uc-direct" + alias "ucd" (402 → 406).
  // #12389: the gemini-business registry entry adds its id "gemini-business" and
  // alias "gembiz" to the REGISTRY walk (406 → 408).
  // 2026-09-02: a keyless provider was removed at its operator's request, taking its id and
  // alias out of the REGISTRY walk (408 → 406).
  // #11786: SeekAi adds id "seekai" + alias "ska" (406 → 408).
  assert.equal(RESERVED_PREFIX_COUNT, 408);
});

test("isReservedProviderPrefix rejects non-string input", () => {
  assert.equal(isReservedProviderPrefix(undefined), false);
  assert.equal(isReservedProviderPrefix(null), false);
  assert.equal(isReservedProviderPrefix(42), false);
});

// ──── Schema-level guard ────

test("createProviderNodeSchema rejects reserved prefix 'tokenrouter'", () => {
  const result = createProviderNodeSchema.safeParse({
    name: "TokenRouter Node",
    prefix: "tokenrouter",
    apiType: "chat",
    baseUrl: "https://api.tokenrouter.com/v1",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    const prefixIssue = result.error.issues.find((i) => i.path[0] === "prefix");
    assert.ok(prefixIssue, "expected a 'prefix' issue");
    assert.match(prefixIssue.message, /reserved/i);
    assert.match(prefixIssue.message, /tokenrouter/);
  }
});

test("createProviderNodeSchema rejects reserved alias 'trk'", () => {
  const result = createProviderNodeSchema.safeParse({
    name: "TRK Node",
    prefix: "trk",
    apiType: "chat",
  });
  assert.equal(result.success, false);
});

test("provider node schemas reject retired Felo prefixes and normalized variants", () => {
  for (const prefix of ["felo-web", "felo", " FeLo-Web ", "\u00a0FELO\uFEFF"]) {
    const created = createProviderNodeSchema.safeParse({
      name: "Retired prefix",
      prefix,
      apiType: "chat",
    });
    assert.equal(created.success, false, `create must reject ${JSON.stringify(prefix)}`);

    const updated = updateProviderNodeSchema.safeParse({
      name: "Retired prefix",
      prefix,
      baseUrl: "https://retired.example.invalid/v1",
    });
    assert.equal(updated.success, false, `update must reject ${JSON.stringify(prefix)}`);

    const preset = createProviderNodeSchema.safeParse({
      preset: "vibeproxy-openai",
      prefix,
      baseUrl: "http://localhost:8317",
    });
    assert.equal(preset.success, false, `preset create must reject ${JSON.stringify(prefix)}`);
  }
});

test("provider node schemas reject retired Qwen Web prefixes and normalized variants", () => {
  for (const prefix of ["qwen-web", "qw", " QwEn-WeB ", "\u00a0QW\uFEFF"]) {
    const created = createProviderNodeSchema.safeParse({
      name: "Retired prefix",
      prefix,
      apiType: "chat",
    });
    assert.equal(created.success, false, `create must reject ${JSON.stringify(prefix)}`);

    const updated = updateProviderNodeSchema.safeParse({
      name: "Retired prefix",
      prefix,
      baseUrl: "https://retired.example.invalid/v1",
    });
    assert.equal(updated.success, false, `update must reject ${JSON.stringify(prefix)}`);

    const preset = createProviderNodeSchema.safeParse({
      preset: "vibeproxy-openai",
      prefix,
      baseUrl: "http://localhost:8317",
    });
    assert.equal(preset.success, false, `preset create must reject ${JSON.stringify(prefix)}`);
  }
});

test("provider-node schemas reject the live canonical id and normalized retired alias", () => {
  for (const prefix of ["chatgpt-web", "cgpt-web", "CGPT-WEB"]) {
    const createResult = createProviderNodeSchema.safeParse({
      name: "Retired provider shadow",
      prefix,
      apiType: "chat",
      baseUrl: "https://example.invalid/v1",
    });
    assert.equal(createResult.success, false, `create accepted ${prefix}`);

    const updateResult = updateProviderNodeSchema.safeParse({
      name: "Retired provider shadow",
      prefix,
    });
    assert.equal(updateResult.success, false, `update accepted ${prefix}`);
  }

  const mixedCaseLiveId = createProviderNodeSchema.safeParse({
    name: "Case-sensitive compatible node",
    prefix: "ChatGPT-Web",
    apiType: "chat",
    baseUrl: "https://example.invalid/v1",
  });
  assert.equal(mixedCaseLiveId.success, true);
});

test("createProviderNodeSchema accepts mixed-case 'TokenRouter' (no runtime collision)", () => {
  const result = createProviderNodeSchema.safeParse({
    name: "Case Test",
    prefix: "TokenRouter",
    apiType: "chat",
  });
  assert.equal(result.success, true);
});

test("createProviderNodeSchema accepts non-reserved prefixes", () => {
  for (const prefix of ["my-gateway", "llamacpp", "aq", "xiaomi"]) {
    const result = createProviderNodeSchema.safeParse({
      name: "Free Prefix",
      prefix,
      apiType: "chat",
    });
    assert.equal(result.success, true, `prefix "${prefix}" should be accepted`);
  }
});

test("updateProviderNodeSchema rejects reserved prefix", () => {
  const result = updateProviderNodeSchema.safeParse({
    name: "Renamed",
    prefix: "openai",
  });
  assert.equal(result.success, false);
});

test("updateProviderNodeSchema accepts non-reserved prefix", () => {
  const result = updateProviderNodeSchema.safeParse({
    name: "Renamed",
    prefix: "still-fine",
    baseUrl: "https://renamed.example.com/v1",
  });
  assert.equal(result.success, true);
});

// ──── Route-level guard (POST /api/provider-nodes) ────

test("provider nodes route returns 400 with prefix issue for reserved prefix", async () => {
  const response = await providerNodesRoute.POST(
    makeCreateRequest({
      name: "TokenRouter Node",
      prefix: "tokenrouter",
      apiType: "chat",
      baseUrl: "https://api.tokenrouter.com/v1",
    })
  );
  assert.equal(response.status, 400);
  const detail = findPrefixDetail(await response.json());
  assert.ok(detail, "expected a prefix validation detail");
  assert.match(detail.message, /reserved/i);
});

test("provider nodes route still creates non-reserved nodes", async () => {
  const response = await providerNodesRoute.POST(
    makeCreateRequest({
      name: "Good Node",
      prefix: "good-node",
      apiType: "chat",
      baseUrl: "https://good.example.com/v1",
    })
  );
  assert.equal(response.status, 201);
  const body = asNodeBody(await response.json());
  assert.equal(body.node?.prefix, "good-node");
});

// ──── Route-level guard (PUT /api/provider-nodes/[id]) ────

test("provider nodes update route rejects renaming prefix to a reserved one", async () => {
  const createResponse = await providerNodesRoute.POST(
    makeCreateRequest({
      name: "Original Node",
      prefix: "original-prefix",
      apiType: "chat",
      baseUrl: "https://original.example.com/v1",
    })
  );
  const created = asNodeBody(await createResponse.json());
  const nodeId = created.node?.id ?? "";

  const updateResponse = await providerNodesIdRoute.PUT(
    makeUpdateRequest(nodeId, {
      name: "Hijacked",
      prefix: "anthropic",
      baseUrl: "https://hijack.example.com/v1",
    }),
    { params: Promise.resolve({ id: nodeId }) }
  );
  assert.equal(updateResponse.status, 400);
  const detail = findPrefixDetail(await updateResponse.json());
  assert.ok(detail, "expected a prefix validation detail");
  assert.match(detail.message, /reserved/i);

  // The node keeps its original prefix.
  const after = await providerNodesIdRoute.PUT(
    makeUpdateRequest(nodeId, {
      name: "Still Original",
      prefix: "original-prefix",
      apiType: "chat",
      baseUrl: "https://original.example.com/v1",
    }),
    { params: Promise.resolve({ id: nodeId }) }
  );
  assert.equal(after.status, 200);
  const afterBody = asNodeBody(await after.json());
  assert.equal(afterBody.node?.prefix, "original-prefix");
});
