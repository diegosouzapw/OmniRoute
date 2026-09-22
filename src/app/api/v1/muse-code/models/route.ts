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

const MUSECODE_TIMESTAMP = Math.floor(Date.now() / 1000);

interface MuseCodeModel {
  id: string;
  object: "model";
  created: number;
  owned_by: string;
  metadata: {
    name: string;
    family: string;
    reasoning: boolean;
    tool_call: boolean;
    modalities: string[];
    limit: number;
    cost: number;
  };
}

function buildModelCatalog(): MuseCodeModel[] {
  const data: MuseCodeModel[] = [];

  for (const model of muse_codeProvider.models) {
    const family = model.id.startsWith("muse-spark") ? "muse-spark" : "meta";

    const modalities: string[] = ["text"];
    if (model.supportsVision) modalities.push("image");

    data.push({
      id: model.id,
      object: "model",
      created: MUSECODE_TIMESTAMP,
      owned_by: "meta",
      metadata: {
        name: model.name,
        family,
        reasoning: !!model.supportsReasoning,
        tool_call: !!model.toolCalling,
        modalities,
        limit: model.contextLength ?? 1_048_576,
        cost: 1,
      },
    });
  }

  return data;
}

// Cache the catalog for the lifetime of the process — model list is static.
const CATALOG = buildModelCatalog();
const CATALOG_PAYLOAD = JSON.stringify({ object: "list", data: CATALOG }, null, 2);

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET() {
  return new Response(CATALOG_PAYLOAD, {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
