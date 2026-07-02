/**
 * Pure model for the stacked-compression pipeline editor (T06 — gaps v3.8.42).
 *
 * Every operation returns a NEW `PipelineStep[]` (never mutates the input), preserves the
 * engine→intensity invariant (a step's intensity is always one its engine allows), and keeps
 * the pipeline non-empty — so the combos editor can never persist an invalid stacked
 * pipeline that the `PUT /api/context/combos/[id]` route would reject. The React editor is a
 * thin shell over these functions; the logic is tested in isolation.
 */

export type PipelineStep = { engine: string; intensity?: string };
export type EngineIntensities = Record<string, readonly string[]>;

const FALLBACK_INTENSITIES: readonly string[] = ["standard"];

/** Intensities a given engine allows (falls back to `["standard"]` for unknown engines). */
export function allowedIntensities(
  engine: string,
  table: EngineIntensities
): readonly string[] {
  const list = table[engine];
  return list && list.length > 0 ? list : FALLBACK_INTENSITIES;
}

/** Coerce a step's intensity to one valid for its engine (first allowed when invalid). */
export function normalizeStep(step: PipelineStep, table: EngineIntensities): PipelineStep {
  const allowed = allowedIntensities(step.engine, table);
  return {
    engine: step.engine,
    intensity: allowed.includes(step.intensity ?? "") ? step.intensity : allowed[0],
  };
}

/**
 * Reorder: move the step at `from` to `to`. Out-of-range indices (or `from === to`) return a
 * copy unchanged. The result is always a permutation of the input (same length, same members).
 */
export function moveLayer(steps: PipelineStep[], from: number, to: number): PipelineStep[] {
  const next = steps.slice();
  if (from === to) return next;
  if (from < 0 || from >= steps.length || to < 0 || to >= steps.length) return next;
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/** Append a new layer (normalized for its engine). */
export function addLayer(
  steps: PipelineStep[],
  step: PipelineStep,
  table: EngineIntensities
): PipelineStep[] {
  return [...steps, normalizeStep(step, table)];
}

/** Remove the layer at `index`, never dropping below `minLength` (default 1). */
export function removeLayer(
  steps: PipelineStep[],
  index: number,
  minLength = 1
): PipelineStep[] {
  if (steps.length <= minLength) return steps.slice();
  if (index < 0 || index >= steps.length) return steps.slice();
  return steps.filter((_, i) => i !== index);
}

/** Patch the layer at `index`, re-normalizing intensity for the (possibly new) engine. */
export function updateLayer(
  steps: PipelineStep[],
  index: number,
  patch: Partial<PipelineStep>,
  table: EngineIntensities
): PipelineStep[] {
  if (index < 0 || index >= steps.length) return steps.slice();
  return steps.map((step, i) =>
    i === index ? normalizeStep({ ...step, ...patch }, table) : step
  );
}
