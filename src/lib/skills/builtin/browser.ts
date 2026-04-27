import { SkillHandler } from "../types";

export const browserSkill: SkillHandler = async (input, context) => {
  const { action } = input as {
    action: "navigate" | "click" | "type" | "screenshot" | "extract";
    url?: string;
    selector?: string;
    text?: string;
  };

  if (!["navigate", "click", "type", "screenshot", "extract"].includes(action)) {
    throw new Error(`Unknown action: ${action}`);
  }

  throw new Error(
    "Browser automation skill is disabled. Configure a Playwright-backed browser runtime before enabling this skill."
  );
};

export function registerBrowserSkill(executor: any): void {
  executor.registerHandler("browser", browserSkill);
}
