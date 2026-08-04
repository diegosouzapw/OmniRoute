import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import reviewedLiveIds from "../../open-sse/config/nvidiaHostedModels.snapshot.json" with { type: "json" };

const NVIDIA_MODELS_URL = "https://integrate.api.nvidia.com/v1/models";

export interface NvidiaCatalogDrift {
  liveCount: number;
  reviewedLiveCount: number;
  documentedFreeCount: number;
  newLiveIds: string[];
  removedLiveIds: string[];
  documentedMissingUpstreamIds: string[];
}

function normalizeIds(ids: Iterable<string>): Set<string> {
  return new Set(
    [...ids].filter((id) => typeof id === "string" && id.trim().length > 0).map((id) => id.trim())
  );
}

export function computeNvidiaCatalogDrift(
  liveIdsInput: Iterable<string>,
  reviewedLiveIdsInput: Iterable<string>,
  documentedFreeIdsInput: Iterable<string>
): NvidiaCatalogDrift {
  const liveIds = normalizeIds(liveIdsInput);
  const reviewedIds = normalizeIds(reviewedLiveIdsInput);
  const documentedFreeIds = normalizeIds(documentedFreeIdsInput);
  return {
    liveCount: liveIds.size,
    reviewedLiveCount: reviewedIds.size,
    documentedFreeCount: documentedFreeIds.size,
    newLiveIds: [...liveIds].filter((id) => !reviewedIds.has(id)).sort(),
    removedLiveIds: [...reviewedIds].filter((id) => !liveIds.has(id)).sort(),
    documentedMissingUpstreamIds: [...documentedFreeIds].filter((id) => !liveIds.has(id)).sort(),
  };
}

function printIds(label: string, ids: string[]): void {
  console.log(`${label} (${ids.length})`);
  for (const id of ids) console.log(`  - ${id}`);
}

async function main(): Promise<void> {
  const apiKey = process.env.NVIDIA_API_KEY?.trim();
  if (!apiKey) {
    console.error("NVIDIA_API_KEY is required to query the live NVIDIA NIM model catalog.");
    process.exitCode = 2;
    return;
  }

  let liveIds: string[] = [];
  try {
    const response = await fetch(NVIDIA_MODELS_URL, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) {
      console.error(`NVIDIA model catalog returned HTTP ${response.status}.`);
      process.exitCode = 2;
      return;
    }

    const body = (await response.json()) as { data?: Array<{ id?: unknown }> } | null;
    liveIds = (body && Array.isArray(body.data) ? body.data : [])
      .map((model) => model?.id)
      .filter((id): id is string => typeof id === "string");
  } catch (error) {
    console.error(
      "Failed to fetch or parse NVIDIA model catalog:",
      error instanceof Error ? error.message : error
    );
    process.exitCode = 2;
    return;
  }
  const documentedFreeIds = FREE_MODEL_BUDGETS.filter((model) => model.provider === "nvidia").map(
    (model) => model.modelId
  );
  const drift = computeNvidiaCatalogDrift(liveIds, reviewedLiveIds, documentedFreeIds);

  console.log(
    `NVIDIA catalog: ${drift.liveCount} live model(s), ${drift.reviewedLiveCount} reviewed live model(s), ${drift.documentedFreeCount} documented free/trial model(s).`
  );
  printIds("New live models requiring metadata review", drift.newLiveIds);
  printIds("Reviewed models removed from the live catalog", drift.removedLiveIds);
  printIds(
    "Documented free models missing from the live catalog",
    drift.documentedMissingUpstreamIds
  );

  if (
    drift.newLiveIds.length ||
    drift.removedLiveIds.length ||
    drift.documentedMissingUpstreamIds.length
  ) {
    console.warn(
      "Catalog drift requires review. Availability alone does not prove that a model is free; verify NVIDIA's model page before updating FREE_MODEL_BUDGETS."
    );
    if (process.argv.includes("--strict")) process.exitCode = 1;
  } else {
    console.log("No NVIDIA catalog drift detected.");
  }
}

const isDirectExecution = process.argv[1]?.endsWith("check-nvidia-catalog-drift.ts");
if (isDirectExecution) {
  await main();
}
