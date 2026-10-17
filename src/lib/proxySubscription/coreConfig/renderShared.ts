/**
 * Render steps shared by every core renderer: one normalization pass per
 * render, the rendered-tag set, the skip list and the decorative-param
 * journal. Each renderer keeps only its own projection and merge rules.
 */
import {
  normalizeSource,
  type CoreModel,
  type CoreNode,
  type NormalizeFail,
  type NormalizeResult,
} from "./model";

export type RenderSkip = { node: string; reason: string; detail?: string };

/** Per-node verdicts of one render, keyed by node tag (absent = passthrough). */
export type RenderVerdicts = Map<string, NormalizeResult>;

/**
 * Normalize each node once. Nodes the renderer passes through verbatim
 * (`isPassthrough`) get no verdict and always render.
 */
export function normalizeAll(
  model: CoreModel,
  isPassthrough: (node: CoreNode) => boolean = () => false
): { verdicts: RenderVerdicts; rendered: Set<string> } {
  const verdicts: RenderVerdicts = new Map();
  const rendered = new Set<string>();
  for (const node of model.nodes) {
    if (isPassthrough(node)) {
      rendered.add(node.tag);
      continue;
    }
    const verdict = normalizeSource(node.source);
    verdicts.set(node.tag, verdict);
    if (verdict.ok) rendered.add(node.tag);
  }
  return { verdicts, rendered };
}

/** One skip entry per node that neither passes through nor translates. */
export function collectSkips(model: CoreModel, verdicts: RenderVerdicts): RenderSkip[] {
  const skipped: RenderSkip[] = [];
  for (const node of model.nodes) {
    const verdict = verdicts.get(node.tag);
    if (!verdict || verdict.ok) continue;
    // Non-strict TS doesn't narrow the union on `ok`.
    const failed = verdict as NormalizeFail;
    skipped.push({
      node: node.tag,
      reason: failed.reason,
      ...(failed.detail ? { detail: failed.detail } : {}),
    });
  }
  return skipped;
}

/**
 * Count-once journal for proven decorative params set aside during the
 * render: rendered nodes are not skipped, so without this line the `dropped`
 * audit would live in the normalizer result only. One line per render, never
 * per node.
 */
export function logDroppedParams(verdicts: RenderVerdicts): void {
  const counts = new Map<string, number>();
  for (const verdict of verdicts.values()) {
    if (!verdict.ok) continue;
    for (const key of verdict.dropped) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  if (counts.size === 0) return;
  const summary = [...counts.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map(([key, count]) => `${key}=${count}`)
    .join(", ");
  console.warn(`[ProxySubscription] core config dropped decorative params: ${summary}`);
}

/**
 * Groups with members assigned but none renderable emit nothing: report each
 * once so an unemitted listener never goes silent. Groups already reported
 * by the model layer (no members assigned at all) are excluded here — no
 * double count at the sync merge.
 */
export function collectEmptyGroups(model: CoreModel, rendered: Set<string>): RenderSkip[] {
  const skipped: RenderSkip[] = [];
  for (const group of model.groups) {
    if (group.members.length === 0) continue;
    if (group.members.some((m) => rendered.has(m))) continue;
    skipped.push({ node: group.tag, reason: "empty_group" });
  }
  return skipped;
}
