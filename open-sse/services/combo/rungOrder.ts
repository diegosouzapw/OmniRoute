/**
 * `auto/thrifty` (#15546): the pool is built in subscription-ladder rung order
 * (plan-included -> free -> metered), but the auto scorer then re-sorts every
 * target by score, which can put a metered model ahead of a plan-included one.
 * For ladder routes the rung order is the contract, so after scoring we put the
 * targets back in the order the virtual pool delivered them.
 */
interface OrderedTarget {
  modelStr: string;
  connectionId?: string | null;
}

const keyOf = (t: OrderedTarget): string => `${t.modelStr}|${t.connectionId ?? ""}`;

/** Stable re-sort of `ranked` by position in `incoming`; unknown targets keep score order, last. */
export function restoreIncomingOrder<T extends OrderedTarget>(
  ranked: readonly T[],
  incoming: readonly OrderedTarget[]
): T[] {
  const position = new Map<string, number>();
  incoming.forEach((target, index) => {
    const key = keyOf(target);
    if (!position.has(key)) position.set(key, index);
  });
  return ranked
    .map((target, scoreIndex) => ({
      target,
      rung: position.get(keyOf(target)) ?? Number.POSITIVE_INFINITY,
      scoreIndex,
    }))
    .sort((a, b) => (a.rung === b.rung ? a.scoreIndex - b.scoreIndex : a.rung - b.rung))
    .map((entry) => entry.target);
}
