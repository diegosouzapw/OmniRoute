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

test("#8716 getComboTargetTokenLimit uses unknown when both providers missing", () => {
  const limit = getComboTargetTokenLimit({
    parsedProvider: null,
    parsedModel: "some-model",
    targetProvider: null,
  });
  assert.ok(Number.isFinite(limit) && limit > 0);
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
