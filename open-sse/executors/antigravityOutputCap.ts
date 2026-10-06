import { getExplicitModelOutputCap } from "@/lib/modelCapabilities";
import { isDiscoverableAntigravityModelId } from "../config/antigravityModelAliases";

/**
 * Fallback ceiling on `generationConfig.maxOutputTokens` for Antigravity
 * Cloud Code, used when the model is unknown to the catalogue.
 *
 * Ports decolua/9router#779 (lukmanfauzie): VS Code GitHub Copilot Chat in
 * Agent mode regularly requests 32K–65K output tokens, which the Antigravity
 * backend rejects with HTTP 400 "Invalid Argument". 16384 was the ceiling
 * confirmed safe at the time, via successful 200 OK runs with
 * claude-sonnet-4-6 and gemini-pro-agent across both Ask and Agent modes.
 *
 * Both of those models are catalogue-known today, so neither one reaches this
 * constant anymore: they get their own declared limit via
 * `resolveAntigravityOutputCap` (65536 and 65535, respectively). The higher
 * limit holds against the live upstream. A gemini-3.7-flash-high request came
 * back with completion_tokens 16754 and finish_reason "stop", which exceeds
 * 16384 on its own and so cannot be an artifact of thinking-token accounting.
 *
 * Note also that #779 was reported against Copilot Chat in Agent mode, a path
 * that does not reach this executor, so 16384 arrived with that port rather
 * than from a limit measured here. Beware of re-deriving it from a running
 * instance: the clamp below rewrites maxOutputTokens before the request
 * leaves, so a build still carrying a low constant measures its own clamp and
 * reports it as an upstream ceiling.
 */
export const MAX_ANTIGRAVITY_OUTPUT_TOKENS = 16384;

/**
 * The output ceiling this specific model accepts, or the conservative
 * fallback above when the id is not in the catalogue.
 *
 * The declared limits are not uniform: most Antigravity models publish
 * 65535 or 65536, but gpt-oss-120b-medium publishes 32768. A single global
 * ceiling either starves the first group or lets an oversized request
 * through to the second, so the number has to come from the model.
 */
export function resolveAntigravityOutputCap(modelId: string | null | undefined): number {
  const id = typeof modelId === "string" ? modelId.trim() : "";
  if (!id) return MAX_ANTIGRAVITY_OUTPUT_TOKENS;
  // MODEL_SPECS is provider-neutral: other providers may continue serving old
  // Gemini 3.5/3.6 ids after Antigravity retires them. Do not let those shared
  // specs make a retired Antigravity id look active on this provider path.
  if (!isDiscoverableAntigravityModelId(id)) return MAX_ANTIGRAVITY_OUTPUT_TOKENS;
  try {
    const declared = getExplicitModelOutputCap({ provider: "antigravity", model: id });
    return typeof declared === "number" && Number.isFinite(declared) && declared > 0
      ? declared
      : MAX_ANTIGRAVITY_OUTPUT_TOKENS;
  } catch {
    // DB not available (build phase, transient error) -- fall through to the
    // conservative fallback, the same guard cleanModelName uses above for
    // its own MITM alias lookup.
    return MAX_ANTIGRAVITY_OUTPUT_TOKENS;
  }
}
