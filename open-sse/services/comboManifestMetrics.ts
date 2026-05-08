import { getLogger } from "log-wrapper";

export function recordComboIntentWithSpecificity(
  comboName: string,
  specificityScore: number,
  specificityLevel: string,
  strategyModifier: string
): void {
  getLogger().info(
    { comboName, specificityScore, specificityLevel, strategyModifier },
    "combo manifest routing applied"
  );
}
