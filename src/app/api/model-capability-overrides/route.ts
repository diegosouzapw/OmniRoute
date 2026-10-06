import { NextResponse } from "next/server";
import { z } from "zod";
import { resolveProviderAlias } from "@omniroute/open-sse/services/model.ts";
import { parseReasoningEffortsOverride } from "@/shared/reasoning/reasoningEffortsOverride";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  listModelCapabilityOverrides,
  removeModelCapabilityOverride,
  setModelCapabilityOverride,
  type ModelCapabilityOverrideKey,
} from "@/lib/db/modelCapabilityOverrides";
import {
  listModelContextOverrides,
  removeModelContextOverride,
  setModelContextOverride,
} from "@/lib/db/modelContextOverrides";
import { getProviderPrefixIndex, type ProviderPrefixEntry } from "@/lib/providerNodePrefixes";

const overrideKeySchema = z.enum([
  "context_length",
  "max_input_tokens",
  "max_output_tokens",
  "reasoning_efforts",
]);
type PublicOverrideKey = z.infer<typeof overrideKeySchema>;
type PublicOverride = {
  provider: string;
  modelId: string;
  target: string;
  key: PublicOverrideKey;
  value: number | string[];
  refreshedAt: string;
};

/**
 * One-time per-request snapshot of the provider-node prefix index. Loaded once
 * per handler (never N times per row) straight from the DB — no module-global
 * mutable caches, no route-to-route imports.
 */
async function loadPrefixMaps(): Promise<{
  entries: Map<string, ProviderPrefixEntry>;
  nodeToPrefix: Map<string, string>;
  prefixToNode: Map<string, string>;
  eligibleNodeIds: Set<string>;
  compatibleNodeIds: Set<string>;
}> {
  const index = await getProviderPrefixIndex();
  return {
    entries: index.entries,
    nodeToPrefix: index.nodeToPrefix,
    prefixToNode: index.prefixToNode,
    eligibleNodeIds: index.eligibleNodeIds,
    compatibleNodeIds: index.compatibleNodeIds,
  };
}

async function listPublicOverrides(
  nodeToPrefix: Map<string, string>,
  eligibleNodeIds: Set<string>,
  compatibleNodeIds: Set<string>
): Promise<PublicOverride[]> {
  const capabilityOverrides = listModelCapabilityOverrides() as PublicOverride[];
  const contextOverrides = listModelContextOverrides().map((override): PublicOverride => ({
    provider: override.provider,
    modelId: override.modelId,
    target: `${override.provider}/${override.modelId}`,
    key: "context_length",
    value: override.realContext,
    refreshedAt: override.refreshedAt,
  }));
  const merged = [...capabilityOverrides, ...contextOverrides];
  return merged
    .filter((override) => {
      // A compatible node that is NOT the unique non-reserved prefix winner is
      // ineligible for Model Overrides: never surface it under a generated node
      // UUID. Eligible winners are those in `eligibleNodeIds` (routable via
      // their public prefix); built-in providers (not in `compatibleNodeIds`)
      // are always eligible.
      return !compatibleNodeIds.has(override.provider) || eligibleNodeIds.has(override.provider);
    })
    .map((override) => {
      const displayProvider = nodeToPrefix.get(override.provider) || override.provider;
      return {
        ...override,
        // Both `provider` and `target` are exposed under the public prefix so no
        // generated node UUID ever leaks into the JSON for a prefixed node.
        provider: displayProvider,
        target: `${displayProvider}/${override.modelId}`,
      };
    })
    .sort((left, right) => right.refreshedAt.localeCompare(left.refreshedAt));
}

const reasoningEffortsValueSchema = z.string().transform((value, context) => {
  const parsed = parseReasoningEffortsOverride(value);
  if (!parsed.ok) {
    context.addIssue({ code: "custom", message: parsed.error });
    return z.NEVER;
  }
  return parsed.efforts;
});

const upsertOverrideSchema = z.discriminatedUnion("key", [
  z.object({
    target: z.string().min(3),
    key: z.enum(["context_length", "max_input_tokens", "max_output_tokens"]),
    value: z.coerce.number().int().positive(),
  }),
  z.object({
    target: z.string().min(3),
    key: z.literal("reasoning_efforts"),
    value: reasoningEffortsValueSchema,
  }),
]);

/**
 * Canonicalize a public `<prefix>/<model>` target to `<internalNodeId>/<model>`
 * so the override is stored where runtime lookup reads it. Mirrors runtime
 * prefix routing exactly:
 *
 *   - `unique` configured prefix → canonicalize to the single runtime-routable
 *     winner node (first openai-compatible then anthropic-compatible, by id).
 *   - `reserved` configured prefix (collides with a built-in registry id/alias,
 *     e.g. a node with `prefix="cx"`) → route via `resolveProviderAlias` to the
 *     built-in canonical provider (runtime routes `cx/` to codex), never 400.
 *   - `ambiguous` (no runtime winner selectable) → fail closed (400).
 *   - A bare built-in alias/id that is NOT a configured node prefix (e.g.
 *     `openai` typed directly) resolves via `resolveProviderAlias` (unchanged).
 *
 * Returns the canonical `provider/model` on success, or `{ ok: false }`.
 */
function canonicalizeTarget(
  target: string,
  entries: Map<string, ProviderPrefixEntry>,
  prefixToNode: Map<string, string>,
  compatibleNodeIds: Set<string>,
  eligibleNodeIds: Set<string>
): { ok: true; target: string } | { ok: false } {
  const raw = target.trim();
  const slashIndex = raw.indexOf("/");
  if (slashIndex <= 0 || slashIndex === raw.length - 1) return { ok: false };

  const provider = raw.slice(0, slashIndex).trim();
  const modelId = raw.slice(slashIndex + 1).trim();
  if (!provider || !modelId) return { ok: false };

  // Raw internal compatible-node IDs are never a public Model Overrides target.
  // Only the public prefix of an eligible runtime winner may select a node.
  // Reject ineligible raw IDs as well as eligible raw IDs so stale or direct API
  // callers cannot create UUID-keyed overrides that the UI cannot manage.
  if (compatibleNodeIds.has(provider)) return { ok: false };

  const configured = entries.get(provider);
  // A reserved configured prefix is routable to the built-in canonical provider
  // (runtime never routes it to the compatible node). `resolveProviderAlias`
  // maps e.g. `cx` → `codex`. Only an ambiguous prefix has no routable target.
  if (configured && configured.status === "ambiguous") {
    return { ok: false };
  }
  const resolvedNodeId = prefixToNode.get(provider);
  if (resolvedNodeId && !eligibleNodeIds.has(resolvedNodeId)) return { ok: false };
  const canonicalProvider = resolvedNodeId || resolveProviderAlias(provider) || provider;

  return { ok: true, target: `${canonicalProvider}/${modelId}` };
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { nodeToPrefix, eligibleNodeIds, compatibleNodeIds } = await loadPrefixMaps();
  return NextResponse.json({
    overrides: await listPublicOverrides(nodeToPrefix, eligibleNodeIds, compatibleNodeIds),
  });
}

export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = upsertOverrideSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { entries, nodeToPrefix, prefixToNode, eligibleNodeIds, compatibleNodeIds } =
    await loadPrefixMaps();
  const canonical = canonicalizeTarget(
    parsed.data.target,
    entries,
    prefixToNode,
    compatibleNodeIds,
    eligibleNodeIds
  );
  if (!canonical.ok) {
    return NextResponse.json(
      { error: "Invalid or ambiguous model capability override target" },
      { status: 400 }
    );
  }

  const targetParts = canonical.target.split(/\/(.*)/s);
  const written =
    parsed.data.key === "context_length"
      ? setModelContextOverride(targetParts[0], targetParts[1], parsed.data.value, "manual")
      : setModelCapabilityOverride(
          canonical.target,
          parsed.data.key as ModelCapabilityOverrideKey,
          parsed.data.value
        );
  if (!written) {
    return NextResponse.json({ error: "Invalid model capability override" }, { status: 400 });
  }

  return NextResponse.json({
    overrides: await listPublicOverrides(nodeToPrefix, eligibleNodeIds, compatibleNodeIds),
  });
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key") || "";
  const parsedKey = overrideKeySchema.safeParse(key);

  const { entries, nodeToPrefix, prefixToNode, eligibleNodeIds, compatibleNodeIds } =
    await loadPrefixMaps();
  const canonical = canonicalizeTarget(
    searchParams.get("target") || "",
    entries,
    prefixToNode,
    compatibleNodeIds,
    eligibleNodeIds
  );

  if (!canonical.ok || !parsedKey.success) {
    return NextResponse.json(
      { error: "target and key are required; target must be a valid model override target" },
      { status: 400 }
    );
  }

  if (parsedKey.data === "context_length") {
    const targetParts = canonical.target.split(/\/(.*)/s);
    removeModelContextOverride(targetParts[0], targetParts[1]);
  } else {
    removeModelCapabilityOverride(canonical.target, parsedKey.data as ModelCapabilityOverrideKey);
  }
  return NextResponse.json({
    overrides: await listPublicOverrides(nodeToPrefix, eligibleNodeIds, compatibleNodeIds),
  });
}
