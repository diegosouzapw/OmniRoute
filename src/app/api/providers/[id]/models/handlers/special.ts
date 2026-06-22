import { NextResponse } from "next/server";
import { getStaticModelsForProvider } from "@/lib/providers/staticModels";
import { getModelsByProviderId } from "@/shared/constants/models";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import { fetchCursorAgentModels } from "@/lib/providerModels/cursorAgent";
import { asRecord } from "../helpers";
import { fetchAntigravityDiscoveryModelsCached } from "../normalizers";
import type { HandlerContext } from "./types";

// ── Antigravity ─────────────────────────────────────────────────────────────

export async function handleAntigravity(
  ctx: HandlerContext
): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const staticModels = getStaticModelsForProvider("antigravity") || [];

  if (!ctx.accessToken) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: "OAuth token unavailable — using cached catalog",
      localWarning: "OAuth token unavailable — using local catalog",
    });
    if (fallback) return fallback;
    return ctx.buildResponse({
      provider: ctx.provider,
      connectionId: ctx.connectionId,
      models: staticModels,
      source: "local_catalog",
      warning: "OAuth token unavailable — using local catalog",
    });
  }

  const remoteModels = await fetchAntigravityDiscoveryModelsCached(
    ctx.accessToken,
    ctx.connectionId,
    ctx.proxy,
    ctx.connection.providerSpecificData
  );
  if (remoteModels.length > 0) {
    return ctx.buildApiDiscoveryResponse(remoteModels);
  }

  const fallback = ctx.buildDiscoveryFallbackResponse();
  if (fallback) return fallback;

  return ctx.buildResponse({
    provider: ctx.provider,
    connectionId: ctx.connectionId,
    models: staticModels,
    source: "local_catalog",
    warning: "API unavailable — using local catalog",
  });
}

// ── Cursor ──────────────────────────────────────────────────────────────────

export async function handleCursor(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  try {
    const models = await fetchCursorAgentModels();
    return ctx.buildApiDiscoveryResponse(models);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("[models] cursor-agent fetch failed:", message);
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: `cursor-agent unavailable (${message}) — using cached catalog`,
      localWarning: `cursor-agent unavailable (${message}) — using local catalog`,
    });
    if (fallback) return fallback;
    return NextResponse.json(
      { error: `Failed to fetch Cursor models: ${message}` },
      { status: 502 }
    );
  }
}

// ── Inner AI ────────────────────────────────────────────────────────────────

export async function handleInnerAi(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  try {
    // Parse "TOKEN EMAIL" credential format
    const raw = ctx.apiKey.trim();
    const eqIdx = raw.indexOf("=");
    const stripped = eqIdx > 0 && !raw.startsWith("eyJ") ? raw.slice(eqIdx + 1).trim() : raw;
    const lastSpace = stripped.lastIndexOf(" ");
    let innerAiToken = stripped;
    let innerAiEmail = "";
    if (lastSpace > 0) {
      const possibleEmail = stripped.slice(lastSpace + 1).trim();
      if (possibleEmail.includes("@")) {
        innerAiToken = stripped.slice(0, lastSpace).trim();
        innerAiEmail = possibleEmail;
      }
    }

    // Decode device_id from JWT payload
    let innerAiDeviceId = "";
    try {
      const parts = innerAiToken.split(".");
      if (parts.length >= 2) {
        const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(Buffer.from(b64, "base64").toString("utf8")) as Record<
          string,
          unknown
        >;
        innerAiDeviceId = String(
          payload?.device_id ??
            payload?.deviceId ??
            payload?.["device-id"] ??
            payload?.did ??
            ""
        ).trim();
      }
    } catch {
      /* ignore */
    }

    const innerAiHeaders: Record<string, string> = {
      "USER-TOKEN": innerAiToken,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Origin: "https://app.innerai.com",
      Referer: "https://app.innerai.com/",
    };
    if (innerAiEmail) innerAiHeaders["USER-EMAIL"] = innerAiEmail;
    if (innerAiDeviceId) innerAiHeaders["DEVICE-ID"] = innerAiDeviceId;

    const modelsResp = await safeOutboundFetch(
      "https://platformapi.innerai.com/api/v1/ai_models",
      { headers: innerAiHeaders },
      getProviderOutboundGuard(ctx.provider)
    );
    if (!modelsResp.ok) {
      throw new Error(`Inner.ai models API returned HTTP ${modelsResp.status}`);
    }

    const modelsBody = (await modelsResp.json().catch(() => null)) as Record<
      string,
      unknown
    > | null;
    const rawModels: Array<Record<string, unknown>> = Array.isArray(
      modelsBody?.ai_models
    )
      ? (modelsBody.ai_models as Array<Record<string, unknown>>)
      : Array.isArray(modelsBody)
        ? (modelsBody as unknown as Array<Record<string, unknown>>)
        : [];

    // Filter: enabled, available, text/chat category only.
    const nonTextPattern =
      /image|video|audio|img|vid|sound|music|voice|tts|stt|track|clip|avatar|cartoon|flux|stable.diff|recraft|ideogram|leonardo|magnific|bria|seedream|luma|kling|pika|veo|wan-|heygen|did-|vidu|pixverse|sora-|gen-[0-9]|playground|gemini-fal|gamma|lyria|clothes|whisper/i;
    const textModels = rawModels.filter((m) => {
      if (m.enable === false || m.unavailable_api) return false;
      if (typeof m.llm_model !== "string") return false;
      const cats = Array.isArray(m.ai_model_categories)
        ? (m.ai_model_categories as Array<Record<string, unknown>>)
        : null;
      if (cats && cats.length > 0) {
        return cats.some(
          (c) =>
            String(c.unique_identifier ?? c.name ?? "").toLowerCase() === "text"
        );
      }
      // No categories field — fall back to name heuristic
      return !nonTextPattern.test(m.llm_model as string);
    });

    const models = textModels.map((m) => ({
      id: String(m.llm_model),
      name: String(m.name || m.llm_model),
    }));

    return ctx.buildApiDiscoveryResponse(models);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: `Inner.ai models unavailable (${message}) — using cached catalog`,
      localWarning: `Inner.ai models unavailable (${message}) — using local catalog`,
    });
    if (fallback) return fallback;
    return NextResponse.json(
      { error: `Failed to fetch Inner.ai models: ${message}` },
      { status: 502 }
    );
  }
}

// ── Claude (static only) ───────────────────────────────────────────────────

export async function handleClaude(ctx: HandlerContext): Promise<NextResponse | null> {
  return ctx.buildResponse({
    provider: ctx.provider,
    connectionId: ctx.connectionId,
    models: getStaticModelsForProvider("claude") || [],
  });
}

// ── Reka (local catalog only) ──────────────────────────────────────────────

export async function handleReka(ctx: HandlerContext): Promise<NextResponse | null> {
  return ctx.buildLocalCatalogResponse();
}

// ── Qwen OAuth fallback ────────────────────────────────────────────────────

export async function handleQwenOauth(ctx: HandlerContext): Promise<NextResponse | null> {
  const qwenModels = getModelsByProviderId("qwen");
  return ctx.buildResponse({
    provider: ctx.provider,
    connectionId: ctx.connectionId,
    models: (qwenModels || []).map((m: Record<string, unknown>) => ({
      id: m.id,
      name: (m.name as string) || (m.id as string),
      owned_by: "qwen",
    })),
    source: "local_catalog",
  });
}
