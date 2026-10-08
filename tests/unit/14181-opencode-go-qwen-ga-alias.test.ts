import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveModelAlias } from "../../open-sse/services/modelDeprecation.ts";
import { opencode_goProvider } from "../../open-sse/config/providers/registry/opencode/go/index.ts";
import {
  findModelSpecIdByExactOrAlias,
  getModelSpec,
} from "../../src/shared/constants/modelSpecs.ts";

/**
 * #14181 — OpenCode Go now serves a GA `qwen3.8-max`, but OmniRoute's built-in
 * deprecation table (`qwen3.8-max` → `qwen3.8-max-preview`, written when the model
 * shipped only under the `-preview` id) rewrote the id before dispatch, and the
 * upstream rejects the preview id with `401 Model qwen3.8-max-preview is not
 * supported`.
 *
 * The rewrite is skipped only when `hasKnownProviderModel(provider, id)` finds the
 * id in the provider's static registry — and the opencode-go registry never
 * declared `qwen3.8-max`, so the exemption never fired for it (alibaba/qwen-cloud/
 * kilocode/clinepass/xkiro already declare the bare GA id and were unaffected).
 *
 * Fix: declare the GA id in the opencode-go registry (qwen family on opencode-go
 * is text-only and routes through the Claude translator per #2292), and give the
 * GA model its own MODEL_SPECS entry instead of aliasing it to the preview spec.
 */
test("opencode-go registry declares the GA qwen3.8-max id (#14181)", () => {
  const entry = (opencode_goProvider.models || []).find((m) => m.id === "qwen3.8-max");
  assert.ok(
    entry,
    "opencode-go registry must list qwen3.8-max so the provider-aware alias exemption fires"
  );
  assert.equal(
    entry.targetFormat,
    "claude",
    "qwen models on opencode-go reject oa-compat (#2292) — the GA id must route through the Claude translator like its qwen3.7-max sibling"
  );
  assert.equal(entry.supportsVision, false, "text-only on opencode-go (#2822)");
});

test("resolveModelAlias leaves qwen3.8-max untouched for opencode-go (#14181)", () => {
  assert.equal(resolveModelAlias("qwen3.8-max", "opencode-go"), "qwen3.8-max");
});

test("resolveModelAlias still rewrites qwen3.8-max for preview-only providers (#14181)", () => {
  // qoder / bailian-coding-plan serve only the -preview id: the built-in rewrite
  // remains the correct behaviour there (and for callers with no provider in hand).
  assert.equal(resolveModelAlias("qwen3.8-max", "qoder"), "qwen3.8-max-preview");
  assert.equal(resolveModelAlias("qwen3.8-max"), "qwen3.8-max-preview");
});

test("GA qwen3.8-max resolves to its own MODEL_SPECS entry, not the preview alias (#14181)", () => {
  assert.equal(findModelSpecIdByExactOrAlias("qwen3.8-max"), "qwen3.8-max");
  const ga = getModelSpec("qwen3.8-max");
  const preview = getModelSpec("qwen3.8-max-preview");
  assert.ok(ga && preview, "both GA and preview specs must exist");
  assert.equal(ga.contextWindow, preview.contextWindow);
  assert.equal(ga.maxOutputTokens, preview.maxOutputTokens);
});
