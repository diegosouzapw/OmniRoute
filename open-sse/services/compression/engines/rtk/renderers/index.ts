import type { CommandDetectionResult } from "../commandDetector.ts";
import type { RtkConfig } from "../../../types.ts";
import { type RenderResult, NO_RENDER } from "./types.ts";
import { renderGitDiff } from "./gitDiff.ts";
import { renderTestGreen } from "./testGreen.ts";
import { renderTerraformPlan } from "./terraformPlan.ts";

// preenchido nas tasks 2–5
const REGISTRY: Record<string, (text: string, d: CommandDetectionResult) => RenderResult> = {};

// Task 2: git-diff renderer
// Note: "git-show" is not a real detection type in commandDetector.ts DETECTORS array,
// so only "git-diff" is registered here.
REGISTRY["git-diff"] = renderGitDiff;

// Task 3: test-green renderer
// Note: "test-eslint" is not a real detection type; the real type is "build-eslint".
REGISTRY["test-pytest"] = renderTestGreen;
REGISTRY["test-jest"] = renderTestGreen;
REGISTRY["test-vitest"] = renderTestGreen;
REGISTRY["build-eslint"] = renderTestGreen;

// Task 4: terraform-plan renderer
REGISTRY["terraform-plan"] = renderTerraformPlan;
REGISTRY["tofu-plan"] = renderTerraformPlan;

export function applyRenderer(
  text: string,
  detection: CommandDetectionResult,
  config: RtkConfig
): RenderResult {
  const r = REGISTRY[detection.type];
  if (!r) return NO_RENDER(text);
  if (config.renderers && config.renderers.length > 0 && !config.renderers.includes(detection.type)) {
    return NO_RENDER(text);
  }
  return r(text, detection);
}
export { type RenderResult } from "./types.ts";

export { REGISTRY };
