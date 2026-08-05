export type ChatGptWebCodexEffort = "low" | "medium" | "high" | "xhigh" | "max";

export interface ChatGptWebCodexModelRoute {
  id: string;
  effort: ChatGptWebCodexEffort;
  pro: boolean;
}

const ROUTES = new Map<string, ChatGptWebCodexModelRoute>([
  ["instant", { id: "instant", effort: "low", pro: false }],
  ["medium", { id: "medium", effort: "medium", pro: false }],
  ["high", { id: "high", effort: "high", pro: false }],
  ["extra-high", { id: "extra-high", effort: "xhigh", pro: false }],
  ["pro", { id: "pro", effort: "max", pro: true }],
]);

export function requireChatGptWebCodexRoute(model: string): ChatGptWebCodexModelRoute {
  const normalized = model.replace(/^chatgpt-web-codex\//, "");
  const route = ROUTES.get(normalized);
  if (!route) throw new Error(`Unsupported ChatGPT Web (Codex) model: ${model}`);
  return route;
}

export function reasoningEffortOf(body: Record<string, unknown>): string | undefined {
  const reasoning = body.reasoning;
  if (reasoning && typeof reasoning === "object" && !Array.isArray(reasoning)) {
    const effort = (reasoning as Record<string, unknown>).effort;
    return typeof effort === "string" ? effort : undefined;
  }
  const effort = body.reasoning_effort;
  return typeof effort === "string" ? effort : undefined;
}
