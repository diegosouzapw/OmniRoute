/**
 * #10703 — Command Code `gpt-5.3-codex` model ids must NOT resolve as
 * vision-capable through the shared capability resolver.
 *
 * The Command Code gateway registry declared `supportsVision: true` for
 * `gpt-5.3-codex`, so the Modality Bridge Vision dropdown (which reads
 * `/api/models` → `getResolvedModelCapabilities`) listed it as a Vision Bridge
 * candidate. Selecting it as the Vision model failed image describe calls
 * (#10703, CONTRIBUTOR). The fix adds the id family to the existing
 * `KNOWN_TEXT_ONLY_DESPITE_SYNC` hard-override — the same mechanism that keeps
 * `mimo-v2.5-pro` text-only — so the shared verdict is `false` everywhere
 * (dropdown, Vision Bridge auto-router, `/v1/models`, compression).
 *
 * Scope discipline: only the Command Code gateway's `cmd/` / `command-code/`
 * codex variants are overridden. Genuine multimodal OpenAI codex ids
 * (`openai/gpt-5.3-codex`) and the `gpt-5.x` chat family (`gpt-5.4`,
 * `gpt-5.4-mini`, `gpt-5.5`) must keep `supportsVision: true`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";

// ── Overridden: Command Code gateway codex ids are text-only (#10703) ────────

const CC_TEXT_ONLY_CODEX: [string, string][] = [
  ["alias prefix", "cmd/gpt-5.3-codex"],
  ["raw provider id", "command-code/gpt-5.3-codex"],
  ["spark variant", "cmd/gpt-5.3-codex-spark"],
  ["effort variant", "cmd/gpt-5.3-codex-high"],
  ["preview variant", "cmd/gpt-5.3-codex-spark-preview"],
];

for (const [desc, modelId] of CC_TEXT_ONLY_CODEX) {
  test(`#10703: ${desc} ${modelId} → supportsVision=false`, () => {
    const caps = getResolvedModelCapabilities(modelId);
    assert.equal(caps.supportsVision, false, `${modelId} is text-only via Command Code (#10703)`);
  });
}

// ── NOT overridden: known multimodal / non-CC ids keep their vision verdict ──

const MUST_STAY_VISION: [string, string][] = [
  ["real OpenAI codex", "openai/gpt-5.3-codex"],
  ["multimodal gpt-5.5", "cmd/gpt-5.5"],
  ["multimodal gpt-5.4", "cmd/gpt-5.4"],
  ["multimodal gpt-5.4-mini", "cmd/gpt-5.4-mini"],
  ["claude opus 4.7 (CC)", "cmd/claude-opus-4-7"],
  ["kimi k2.6 (CC)", "cmd/moonshotai/Kimi-K2.6"],
];

for (const [desc, modelId] of MUST_STAY_VISION) {
  test(`#10703 scope guard: ${desc} ${modelId} stays supportsVision=true`, () => {
    const caps = getResolvedModelCapabilities(modelId);
    assert.equal(caps.supportsVision, true, `${modelId} must not be overridden (#10703 scope)`);
  });
}

// ── The override must also beat a wrong synced attachment/modalit
//    (the #4071 failure mode), mirroring the mimo-v2.5-pro guard tests. ──────

test("#10703: override still wins when synced capability wrongly claims vision-support", () => {
  // No DB/synced fan-in in this repo for command-code static ids (they are
  // registry-driven), so a plain resolution is the authoritative check — a
  // registry `supportsVision: true` must be neutralized even without synced
  // data present.
  const caps = getResolvedModelCapabilities("cmd/gpt-5.3-codex");
  assert.equal(caps.supportsVision, false);
  assert.equal(caps.provider, "command-code");
});
