/**
 * #8716 — combo compression-limit resolution must not crash when a target's
 * modelStr lacks a provider/ prefix (parseModel returns provider: null).
 *
 * Root cause: chatCore mapped targets via getTokenLimit(parsed.provider, …)
 * and getEnvOverride() does provider.toUpperCase() unconditionally.
 * ResolvedComboTarget already carries provider independently of modelStr.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { parseModel } = await import("../../open-sse/services/model.ts");
const { getTokenLimit, getComboTargetTokenLimit } =
  await import("../../open-sse/services/contextManager.ts");

test("#8716 getTokenLimit(null provider) throws via toUpperCase (documents crash)", () => {
  assert.throws(
    () => getTokenLimit(null as unknown as string, "gpt-4o"),
    (err: unknown) => err instanceof TypeError && String(err.message).includes("toUpperCase")
  );
});

test("#8716 parseModel without provider prefix yields null provider", () => {
  const parsed = parseModel("gpt-4o");
  assert.equal(parsed.provider, null);
  assert.equal(parsed.model, "gpt-4o");
});

test("#8716 getComboTargetTokenLimit falls back to target.provider (no throw)", () => {
  assert.equal(typeof getComboTargetTokenLimit, "function");

  const parsed = parseModel("gpt-4o");
  assert.equal(parsed.provider, null);

  const limit = getComboTargetTokenLimit({
    modelStr: "gpt-4o",
    provider: "openai",
  });
  assert.ok(Number.isFinite(limit) && limit > 0);

  // Same inputs via pre-parsed fields (matches chatCore call shape).
  const limit2 = getComboTargetTokenLimit({
    parsedProvider: parsed.provider,
    parsedModel: parsed.model,
    targetProvider: "openai",
  });
  assert.equal(limit2, limit);
});

test("#8716 getComboTargetTokenLimit prefers parseModel provider when present", () => {
  const withPrefix = getComboTargetTokenLimit({
    modelStr: "anthropic/claude-sonnet-4-6",
    provider: "openai",
  });
  const fromParsedOnly = getComboTargetTokenLimit({
    parsedProvider: "anthropic",
    parsedModel: "claude-sonnet-4-6",
    targetProvider: "openai",
  });
  assert.equal(withPrefix, fromParsedOnly);
});

test("#8716/#14931 getComboTargetTokenLimit returns undefined when only the generic default resolves", () => {
  // Both providers missing → "unknown" provider + uncataloged model resolves
  // solely to the non-specific 128000 catch-all. #14931: that guess must NOT
  // enter the runtime combo Math.min(); the resolver falls back to it on its
  // own only when every member is unknown.
  const limit = getComboTargetTokenLimit({
    parsedProvider: null,
    parsedModel: "some-model",
    targetProvider: null,
  });
  assert.equal(limit, undefined);
});

test("#14931 specific sources still resolve (name heuristic is a known source)", () => {
  // Step 4 of resolveTokenLimit (model-name heuristic) runs regardless of
  // provider known-ness: an uncataloged "gpt*" variant on an unknown provider
  // still resolves specific, while a non-matching name stays unknown.
  const heuristic = getComboTargetTokenLimit({
    parsedProvider: "totally-unknown-provider",
    parsedModel: "gpt-4o-unknown-variant",
    targetProvider: null,
  });
  assert.ok(Number.isFinite(heuristic) && (heuristic as number) > 0);

  // The #14931 incident shape: uncataloged model behind a custom
  // OpenAI-compatible connection has no catalog row, no registry entry and a
  // name that matches no heuristic → unknown, must not fake 128000.
  const unknownProvider = getComboTargetTokenLimit({
    parsedProvider: "openai-compatible-chat-d9363e0c",
    parsedModel: "qwen3.8-27b",
    targetProvider: null,
  });
  assert.equal(unknownProvider, undefined);
});

test("#8716 chatCore combo-limit map uses getComboTargetTokenLimit (source guard)", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const src = fs.readFileSync(path.join(root, "open-sse/handlers/chatCore.ts"), "utf8");
  assert.match(
    src,
    /getComboTargetTokenLimit\s*\(/,
    "chatCore must resolve combo target limits via getComboTargetTokenLimit"
  );
  assert.doesNotMatch(
    src,
    /comboTargetLimits\s*=\s*targets\.map\(\s*\([^)]*\)\s*=>\s*\{\s*const parsed = parseModel\(t\.modelStr\);\s*return getTokenLimit\(parsed\.provider/,
    "chatCore must not pass parseModel().provider directly into getTokenLimit"
  );
});
