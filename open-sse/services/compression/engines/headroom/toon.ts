/**
 * toon.ts — TOON (@toon-format/toon) candidate encoder for the headroom engine.
 *
 * TOON is a second encoder considered alongside GCF in the SmartCrusher best-of-N
 * gate. GCF stays the default and tiebreak winner; TOON is used only when strictly
 * smaller. All entry points are FAIL-OPEN: any throw yields null/[] so a TOON bug
 * can never break headroom compaction. Pure: no Date.now / Math.random.
 */
import { encode as toonEncode, decode as toonDecode } from "@toon-format/toon";

export const TOON_FENCE_OPEN = "```toon";
export const TOON_FENCE_CLOSE = "```";

export function encodeToonBlock(arr: Record<string, unknown>[]): string | null {
  try {
    return toonEncode(arr);
  } catch {
    return null;
  }
}

export function wrapToon(blockContent: string): string {
  return `${TOON_FENCE_OPEN}\n${blockContent}\n${TOON_FENCE_CLOSE}`;
}

export function decodeToon(text: string): Record<string, unknown>[] {
  let inner = text;
  if (inner.startsWith(TOON_FENCE_OPEN + "\n")) {
    inner = inner.slice(TOON_FENCE_OPEN.length + 1);
    if (inner.endsWith("\n" + TOON_FENCE_CLOSE)) {
      inner = inner.slice(0, inner.length - TOON_FENCE_CLOSE.length - 1);
    } else if (inner.endsWith(TOON_FENCE_CLOSE)) {
      inner = inner.slice(0, inner.length - TOON_FENCE_CLOSE.length);
    }
  }
  try {
    const decoded = toonDecode(inner);
    if (Array.isArray(decoded)) return decoded as Record<string, unknown>[];
    return [decoded as Record<string, unknown>];
  } catch {
    return [];
  }
}
