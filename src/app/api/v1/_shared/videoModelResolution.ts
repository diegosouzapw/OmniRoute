import { getAllCustomModels } from "@/lib/db/models";
import { parseVideoModel } from "@omniroute/open-sse/config/videoRegistry.ts";
import { getProviderCredentialsWithQuotaPreflight } from "@/sse/services/auth";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";

export type VideoModelTarget = {
  provider: string | null;
  model: string | null;
  isCustomModel: boolean;
};

/**
 * Resolve a `provider/model` string to a video target, checking the built-in
 * video registry first and falling back to custom OpenAI-compatible provider
 * nodes tagged with the "videos" endpoint (mirrors the direct
 * /v1/videos/generations route's custom-model scan). Shared by the direct
 * route and the combo executor so both paths cover the same target set.
 */
export async function resolveVideoModelTarget(
  modelStr: string | null | undefined
): Promise<VideoModelTarget> {
  const parsed = parseVideoModel(modelStr ?? null);
  if (parsed.provider) {
    return { provider: parsed.provider, model: parsed.model, isCustomModel: false };
  }

  if (!modelStr) {
    return { provider: null, model: null, isCustomModel: false };
  }

  try {
    const customModelsMap = (await getAllCustomModels()) as Record<string, unknown>;
    for (const [providerId, models] of Object.entries(customModelsMap)) {
      if (!Array.isArray(models)) continue;
      for (const model of models as Array<{ id?: string; supportedEndpoints?: unknown }>) {
        if (!model?.id || !Array.isArray(model.supportedEndpoints)) continue;
        if (!model.supportedEndpoints.includes("videos")) continue;
        const fullId = `${providerId}/${model.id}`;
        if (fullId === modelStr) {
          return { provider: providerId, model: model.id, isCustomModel: true };
        }
      }
    }
  } catch {
    // registry read failure — fall through to "not found"
  }

  return { provider: null, model: null, isCustomModel: false };
}

/**
 * I2V models that accept an omitted prompt (the source image already carries
 * enough context). Mirrors the allow-list the direct route applies before
 * promptRequiredResponse(); kept here so combo targets get identical rules.
 */
export function isVideoPromptOptional(parsed: { provider: string | null; model: string | null }) {
  return (
    (parsed.model === "happyhorse-1.1-i2v" &&
      (parsed.provider === "alibaba" ||
        parsed.provider === "bailian-coding-plan" ||
        parsed.provider === "qwen-cloud-token-plan" ||
        parsed.provider === "qwen-cloud")) ||
    (parsed.provider === "qwen-cloud" && parsed.model === "wan2.7-i2v") ||
    (parsed.provider === "alibaba" &&
      (parsed.model === "wan2.7-i2v-2026-04-25" || parsed.model === "wan2.6-i2v-flash"))
  );
}

/**
 * #6928: best-effort per-connection base-URL override lookup for local no-auth
 * media providers (ComfyUI). Returns null instead of failing when no connection
 * exists — local providers must keep working with zero configuration. Shared
 * by the direct route and the combo executor so a configured ComfyUI base URL
 * is honored the same way regardless of which path dispatched the request.
 */
export async function resolveLocalOverrideCredentials(provider: string) {
  const localCredentials = await getProviderCredentialsWithQuotaPreflight(provider);
  return localCredentials && !isAllRateLimitedCredentials(localCredentials)
    ? localCredentials
    : null;
}
