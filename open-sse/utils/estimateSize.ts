/**
 * Fast object-tree size estimator — walks without JSON.stringify / toJSON / clone.
 * Safe for circular references (WeakSet). Iterative frames only (no recursive call stack).
 *
 * Budgets:
 * - byteLimit param (default ESTIMATE_SIZE_BYTE_LIMIT, 256 KiB): early-exit
 *   once counted bytes exceed the limit — pass the caller's own threshold
 *   explicitly rather than relying on the default, since a caller comparing
 *   against a bigger configured limit would otherwise never see a size
 *   above 256 KiB.
 * - ESTIMATE_SIZE_NODE_BUDGET: max value visits (containers + primitives/elements)
 *
 * Arrays are walked by index frame (never pre-push/copy every element reference).
 * Plain objects yield own enumerable values incrementally (no Object.keys materialization).
 * Node-budget exhaustion returns a value strictly above the effective byteLimit
 * so callers fail closed.
 */

/** Default byte early-exit threshold (256 KiB) when a caller doesn't pass its own. */
export const ESTIMATE_SIZE_BYTE_LIMIT = 262_144;

/**
 * Max value/element visits before fail-closed.
 * Conservative cap keeps auxiliary stack/WeakSet growth bounded under adversarial input.
 */
export const ESTIMATE_SIZE_NODE_BUDGET = 16_384;

type Frame =
  | { t: "v"; v: unknown }
  | { t: "a"; a: unknown[]; i: number }
  | { t: "o"; o: object; it: Iterator<string> };

function ownEnumerableKeyIterator(obj: object): Iterator<string> {
  return (function* ownEnumerableKeys() {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        yield key;
      }
    }
  })();
}

/** @returns next byte total, or a value > limit when the limit is exceeded. */
function addPrimitiveBytes(bytes: number, v: string | number | boolean): number {
  if (typeof v === "string") return bytes + v.length;
  if (typeof v === "number") return bytes + 8;
  return bytes + 4;
}

function enqueueContainer(stack: Frame[], obj: object, seen: WeakSet<object>): void {
  if (seen.has(obj)) return;
  seen.add(obj);
  if (Array.isArray(obj)) {
    if (obj.length > 0) stack.push({ t: "a", a: obj, i: 0 });
    return;
  }
  stack.push({ t: "o", o: obj, it: ownEnumerableKeyIterator(obj) });
}

type ValueFrame = Extract<Frame, { t: "v" }>;

function isValueFrame(frame: Frame): frame is ValueFrame {
  return frame.t === "v";
}

/** Expand a container frame into the next child value. */
function expandContainerFrame(stack: Frame[], frame: Exclude<Frame, ValueFrame>): void {
  if (frame.t === "a") {
    if (frame.i >= frame.a.length) return;
    if (frame.i + 1 < frame.a.length) {
      stack.push({ t: "a", a: frame.a, i: frame.i + 1 });
    }
    stack.push({ t: "v", v: frame.a[frame.i] });
    return;
  }
  const next = frame.it.next();
  if (next.done) return;
  stack.push(frame);
  stack.push({ t: "v", v: (frame.o as Record<string, unknown>)[next.value] });
}

/**
 * @param byteLimit - early-exit threshold (default ESTIMATE_SIZE_BYTE_LIMIT,
 * 256 KiB). Pass the actual threshold you're comparing against (see
 * chatCore/logTruncation.ts::truncateForLog) so raising that threshold
 * doesn't silently cap what this function is even capable of reporting —
 * the byte check and the node-budget fail-closed fallback both key off this
 * value, not the fixed module constant, when a caller supplies one.
 */
export function estimateSizeFast(value: unknown, byteLimit = ESTIMATE_SIZE_BYTE_LIMIT): number {
  let bytes = 0;
  let visitsLeft = ESTIMATE_SIZE_NODE_BUDGET;
  const seen = new WeakSet<object>();
  const stack: Frame[] = [{ t: "v", v: value }];

  while (stack.length > 0) {
    if (visitsLeft <= 0) return byteLimit + 1;

    const frame = stack.pop()!;
    if (!isValueFrame(frame)) {
      expandContainerFrame(stack, frame);
      continue;
    }

    visitsLeft -= 1;
    const v = frame.v;
    if (v === null || v === undefined) continue;

    const ty = typeof v;
    if (ty === "string" || ty === "number" || ty === "boolean") {
      bytes = addPrimitiveBytes(bytes, v as string | number | boolean);
      if (bytes > byteLimit) return bytes;
      continue;
    }
    if (ty === "object") {
      enqueueContainer(stack, v as object, seen);
    }
  }

  return bytes;
}

export function isSmallEnoughForSemanticCache(value: unknown): boolean {
  return estimateSizeFast(value) <= 256 * 1024;
}
