import { SkillHandler } from "../types";

export const browserSkill: SkillHandler = async (input, context) => {
  const { action, ...params } = input as {
    action: "navigate" | "click" | "type" | "screenshot" | "extract";
    url?: string;
    selector?: string;
    text?: string;
  };

  switch (action) {
    case "navigate":
      return { success: true, action: "navigate", url: params.url, stub: true };
    case "click":
      return { success: true, action: "click", selector: params.selector, stub: true };
    case "type":
      return {
        success: true,
        action: "type",
        selector: params.selector,
        text: params.text,
        stub: true,
      };
    case "screenshot":
      return { success: true, action: "screenshot", stub: true };
    case "extract":
      return { success: true, action: "extract", selector: params.selector, data: {}, stub: true };
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};

export function registerBrowserSkill(executor: any): void {
  executor.registerHandler("browser", browserSkill);
}
