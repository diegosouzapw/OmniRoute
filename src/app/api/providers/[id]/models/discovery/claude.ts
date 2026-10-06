import { z } from "zod";
import { buildClaudeModelsHeaders } from "@/lib/providerModels/claudeModelsHeaders";

const pageSchema = z.object({
  data: z.array(z.unknown()),
  has_more: z.boolean(),
  last_id: z.string().min(1).max(256).optional(),
});
const modelSchema = z.object({
  id: z
    .string()
    .regex(/^claude-[A-Za-z0-9._-]+$/)
    .max(256),
  display_name: z.string().min(1).optional(),
  type: z.literal("model").optional(),
  max_input_tokens: z.number().int().positive().nullish(),
  max_tokens: z.number().int().positive().nullish(),
});

type ClaudeModel = {
  id: string;
  name: string;
  owned_by: "claude";
  inputTokenLimit?: number;
  outputTokenLimit?: number;
};

type DiscoveryFetch = (
  url: string,
  init: {
    method: "GET";
    headers: Record<string, string>;
  }
) => Promise<Response>;

/** Account-authenticated catalog; never invent model IDs from the local registry. */
export async function fetchClaudeDiscoveryModels({
  accessToken,
  apiKey,
  fetchImpl,
}: {
  accessToken: string;
  apiKey: string;
  fetchImpl: DiscoveryFetch;
}): Promise<ClaudeModel[]> {
  if (!accessToken && !apiKey) throw new Error("Claude model discovery requires credentials");
  const headers = buildClaudeModelsHeaders({ accessToken, apiKey });
  const models = new Map<string, ClaudeModel>();
  const cursors = new Set<string>();
  let cursor: string | undefined;
  // Bounded pagination; an incomplete response must not replace a known-good cache.
  for (let page = 0; page < 10; page++) {
    const url = new URL("https://api.anthropic.com/v1/models");
    url.searchParams.set("limit", "1000");
    if (cursor) url.searchParams.set("after_id", cursor);
    const response = await fetchImpl(url.toString(), { method: "GET", headers });
    if (!response.ok) throw new Error(`Claude model discovery failed (HTTP ${response.status})`);
    const parsed = pageSchema.safeParse(await response.json());
    if (!parsed.success) throw new Error("Invalid Claude model catalog");
    for (const item of parsed.data.data) {
      const model = modelSchema.safeParse(item);
      if (!model.success) continue;
      const value = model.data;
      models.set(value.id, {
        id: value.id,
        name: value.display_name || value.id,
        owned_by: "claude",
        ...(value.max_input_tokens ? { inputTokenLimit: value.max_input_tokens } : {}),
        ...(value.max_tokens ? { outputTokenLimit: value.max_tokens } : {}),
      });
    }
    if (!parsed.data.has_more) {
      if (!models.size) throw new Error("Empty Claude model catalog");
      return [...models.values()];
    }
    cursor = parsed.data.last_id;
    if (!cursor || cursors.has(cursor)) throw new Error("Invalid Claude catalog pagination");
    cursors.add(cursor);
  }
  throw new Error("Claude catalog pagination limit reached");
}
