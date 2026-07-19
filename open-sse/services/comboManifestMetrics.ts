import { logger } from "../utils/logger.ts";

const log = logger("COMBO_MANIFEST");

export function recordComboIntentWithSpecificity(
  comboName: string,
  specificityScore: number,
  specificityLevel: string,
  strategyModifier: string
): void {
  log.info("combo manifest routing applied", {
    comboName,
    specificityScore,
    specificityLevel,
    strategyModifier,
  });
}
