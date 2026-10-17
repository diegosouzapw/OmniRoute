/**
 * Muse Code CLI proprietary model catalog endpoint.
 *
 * Muse CLI calls GET /muse-code/models (or --base-url/muse-code/models)
 * to discover available models. Returns the proprietary Muse format:
 *
 *   { object: "list", data: [{ id, object, created, owned_by, metadata }] }
 *
 * Each model's metadata includes: name, family, reasoning, tool_call,
 * modalities, limit, cost.
 */

import { muse_codeProvider } from "@omniroute/open-sse/config/providers/registry/muse-code/index.ts";
import { stripStaleEncodingHeaders } from "@omniroute/open-sse/utils/upstreamResponseHeaders.ts";
import { GET as getProviderModels } from "../../providers/[provider]/models/route";

const MUSECODE_TIMESTAMP = Math.floor(Date.now() / 1000);

interface MuseCodeModel {
  id: string;
  object: "model";
  created: number;
  owned_by: string;
  metadata: {
    name: string;
    family: string;
    reasoning?: boolean;
    tool_call?: boolean;
    modalities: string[];
    limit?: number;
    cost?: number;
  };
}

function buildModelCatalog(models: Array<Record<string, unknown>>): MuseCodeModel[] {
  const data: MuseCodeModel[] = [];

  for (const discovered of models) {
    if (typeof discovered.id !== "string") continue;
    const model = muse_codeProvider.models.find((entry) => entry.id === discovered.id);
    const id = discovered.id;
    const capabilities =
      discovered.capabilities && typeof discovered.capabilities === "object"
        ? (discovered.capabilities as Record<string, unknown>)
        : {};
    const hasLiveReasoning =
      Array.isArray(capabilities.effort_tiers) && capabilities.effort_tiers.length > 0;
    const limit =
      typeof discovered.context_length === "number" &&
      Number.isFinite(discovered.context_length) &&
      discovered.context_length > 0
        ? discovered.context_length
        : model?.contextLength;
    let family = "llama";
    if (id.startsWith("muse-")) family = "muse";
    else if (id.includes("llama-4")) family = "llama-4";
    else if (id.includes("llama-3.3")) family = "llama-3.3";
    else if (id.includes("llama-3.2")) family = "llama-3.2";
    else if (id.includes("llama-3.1")) family = "llama-3.1";

    const modalities: string[] = ["text"];
    if (capabilities.vision === true || model?.supportsVision) modalities.push("image");

    data.push({
      id,
      object: "model",
      created: MUSECODE_TIMESTAMP,
      owned_by: "meta",
      metadata: {
        name: typeof discovered.name === "string" ? discovered.name : model?.name || id,
        family,
        ...(model || hasLiveReasoning
          ? { reasoning: hasLiveReasoning || !!model?.supportsReasoning }
          : {}),
        ...(model ? { tool_call: !!model.toolCalling } : {}),
        modalities,
        ...(limit ? { limit } : {}),
        ...(model ? { cost: id.includes("maverick") || id.includes("405b") ? 3 : 1 } : {}),
      },
    });
  }

  return data;
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(request: Request) {
  // Reuse the live-synced catalog's authorization, connection and model filters.
  // Never send the caller's OmniRoute key to the upstream provider.
  const response = await getProviderModels(request, {
    params: Promise.resolve({ provider: "muse-code" }),
  });
  if (!response.ok) return response;
  const payload = (await response.json()) as { data: Array<Record<string, unknown>> };
  const headers = stripStaleEncodingHeaders(response.headers);
  headers.set("cache-control", "private, no-store");
  return Response.json(
    { object: "list", data: buildModelCatalog(payload.data) },
    {
      status: 200,
      headers,
    }
  );
}
