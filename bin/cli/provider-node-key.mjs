import { apiFetch } from "./api.mjs";
import { t } from "./i18n.mjs";

// This selects the management route, not the ID validator. The server owns
// compatible-node validation and hydrates the connection from that exact node.
export function usesProviderNodeNamespace(provider) {
  return provider.startsWith("openai-compatible-") || provider.startsWith("anthropic-compatible-");
}

export async function addProviderNodeKey(provider, apiKey, opts = {}) {
  try {
    const response = await apiFetch("/api/providers", {
      ...opts,
      method: "POST",
      body: { provider, apiKey, name: provider },
      retry: false,
      acceptNotOk: true,
    });
    if (!response.ok) {
      console.error(t("common.error", { message: `HTTP ${response.status}` }));
      return 1;
    }
    console.log(t("keys.added", { provider }));
    return 0;
  } catch {
    console.error(t("common.serverOffline"));
    return 1;
  }
}
