export type ChatGptWebCodexEffort = "low" | "medium" | "high" | "xhigh" | "max";

export interface ChatGptWebCodexModelRoute {
  id: string;
  backendModel: "gpt-5.6-sol" | "gpt-5.6-luna";
  effort: ChatGptWebCodexEffort;
  pro: boolean;
  sol: boolean;
}

const ROUTES = new Map<string, ChatGptWebCodexModelRoute>([
  ["luna", { id: "luna", backendModel: "gpt-5.6-luna", effort: "low", pro: false, sol: false }],
  [
    "think",
    { id: "think", backendModel: "gpt-5.6-luna", effort: "medium", pro: false, sol: false },
  ],
  ["instant", { id: "instant", backendModel: "gpt-5.6-sol", effort: "low", pro: false, sol: true }],
  [
    "medium",
    { id: "medium", backendModel: "gpt-5.6-sol", effort: "medium", pro: false, sol: true },
  ],
  ["high", { id: "high", backendModel: "gpt-5.6-sol", effort: "high", pro: false, sol: true }],
  [
    "extra-high",
    { id: "extra-high", backendModel: "gpt-5.6-sol", effort: "xhigh", pro: true, sol: true },
  ],
  ["pro", { id: "pro", backendModel: "gpt-5.6-sol", effort: "max", pro: true, sol: true }],
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
