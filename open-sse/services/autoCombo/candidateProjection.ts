import type { AutoVariant } from "./autoPrefix";
import {
  selectVirtualAutoCandidatePool,
  type AutoComboSpec,
  type PreparedVirtualAutoComboInputs,
} from "./virtualFactory";
import type { StrictZeroCostExclusionReason } from "./strictZeroCostFilter";

export interface VirtualAutoCandidateProjection {
  providerId: string;
  connectionId: string | null;
  allowedConnectionIds?: string[];
  model: string;
  freeAccessExclusion?: StrictZeroCostExclusionReason | null;
}

/** Selection-only materialization: no scoring, advertised limits, or response metadata. */
export async function projectVirtualAutoCandidatesFromPrepared(
  prepared: PreparedVirtualAutoComboInputs,
  variant: AutoVariant | undefined,
  spec?: AutoComboSpec
): Promise<VirtualAutoCandidateProjection[]> {
  const { effectivePool } = await selectVirtualAutoCandidatePool(prepared, spec);
  const projected = effectivePool.map((candidate) => ({
    providerId: candidate.provider,
    connectionId: candidate.connectionId,
    ...(candidate.allowedConnectionIds
      ? { allowedConnectionIds: [...candidate.allowedConnectionIds] }
      : {}),
    model: candidate.modelStr,
    ...(candidate.freeAccessExclusion === undefined
      ? {}
      : { freeAccessExclusion: candidate.freeAccessExclusion }),
  }));
  if (variant !== "chaos") return projected;

  const parsed = Number.parseInt(process.env.OMNIROUTE_CHAOS_MAX_PANEL ?? "5", 10);
  const maxPanel = Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 10) : 5;
  const seen = new Set<string>();
  const diverse: VirtualAutoCandidateProjection[] = [];
  for (const model of projected) {
    if (seen.has(model.providerId)) continue;
    seen.add(model.providerId);
    diverse.push(model);
    if (diverse.length >= maxPanel) break;
  }
  return diverse.length > 0 ? diverse : projected.slice(0, maxPanel);
}
