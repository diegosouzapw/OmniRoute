import type { ModelCapabilityEntry } from "../../modelsDevSync/transform";
import { getDbInstance } from "../core";

interface StoredModalities {
  modalities_input: string | null;
  modalities_output: string | null;
}

function retainEquivalentSet(stored: string | null | undefined, incoming: string): string {
  if (typeof stored !== "string" || stored === incoming) return incoming;
  let before: unknown;
  let after: unknown;
  try {
    before = JSON.parse(stored);
    after = JSON.parse(incoming);
  } catch (error) {
    if (error instanceof SyntaxError) return incoming;
    throw error;
  }
  if (
    !Array.isArray(before) ||
    !Array.isArray(after) ||
    !before.every((value) => typeof value === "string") ||
    !after.every((value) => typeof value === "string")
  ) {
    return incoming;
  }
  const beforeSet = new Set(before);
  const afterSet = new Set(after);
  return beforeSet.size === afterSet.size && [...beforeSet].every((value) => afterSet.has(value))
    ? stored
    : incoming;
}

/** Read through the active transaction, not a possibly stale capabilities cache. */
export function preserveStoredModalitySets(
  provider: string,
  models: Record<string, ModelCapabilityEntry>
): Record<string, ModelCapabilityEntry> {
  const read = getDbInstance().prepare(
    "SELECT modalities_input, modalities_output FROM model_capabilities WHERE provider = ? AND model_id = ?"
  );
  return Object.fromEntries(
    Object.entries(models).map(([modelId, entry]) => {
      const stored = read.get(provider, modelId) as StoredModalities | undefined;
      return [
        modelId,
        {
          ...entry,
          modalities_input: retainEquivalentSet(stored?.modalities_input, entry.modalities_input),
          modalities_output: retainEquivalentSet(
            stored?.modalities_output,
            entry.modalities_output
          ),
        },
      ];
    })
  );
}
