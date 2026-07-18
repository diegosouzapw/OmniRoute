import type { RegistryEntry } from "../../shared.ts";

// Notion AI Web (Unofficial/Experimental) — see open-sse/executors/notion-web.ts
// for the reverse-engineering rationale (issue #6758, closed native-provider
// request #3272). Notion AI does not expose a documented, selectable model
// catalog through its internal endpoint — the assistant response is server-side
// routed. `passthroughModels: true` lets an operator pass any model id the
// endpoint may honor in the future without a registry change; the single
// `notion-ai` entry is the default/safe fallback shown in the picker.
export const notion_webProvider: RegistryEntry = {
  id: "notion-web",
  alias: "nw",
  format: "openai",
  executor: "notion-web",
  baseUrl: "https://www.notion.so/api/v3/runInferenceTranscript",
  authType: "apikey",
  authHeader: "cookie",
  passthroughModels: true,
  models: [{ id: "notion-ai", name: "Notion AI (Unofficial/Experimental)" }],
};
