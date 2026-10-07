/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
/**
 * Opaque signed-reasoning metadata round-trip through Codex's `encrypted_content` slot.
 *
 * Some Responses histories contain signed or redacted reasoning metadata that must be replayed
 * verbatim. Codex round-trips `encrypted_content`, so the bridge preserves that metadata inside
 * the inherited `ocxr1:` + base64(JSON) envelope format.
 *
 * Native OpenAI-encrypted blobs (no ocxr1 prefix) are left untouched by the decoder, and the
 * passthrough scrub strips ocxr1 envelopes before native forwarding.
 */

export const BRIDGE_REASONING_PREFIX = "ocxr1:";

export interface ReasoningEnvelope {
  /** Opaque reasoning-block signature, if captured. */
  sig?: string;
  /** Raw redacted_thinking block data payloads, order preserved. */
  red?: string[];
  /**
   * Hidden thinking text (hideThinkingSummary providers): the signature signs this exact text,
   * so replay needs it even though the visible summary was suppressed.
   */
  txt?: string;
}

export function encodeReasoningEnvelope(envelope: ReasoningEnvelope): string {
  return (
    BRIDGE_REASONING_PREFIX + Buffer.from(JSON.stringify(envelope), "utf-8").toString("base64")
  );
}

/** Decode an ocxr1 envelope; returns null for native (OpenAI-encrypted) blobs or garbage. */
export function decodeReasoningEnvelope(encryptedContent: string): ReasoningEnvelope | null {
  if (!encryptedContent.startsWith(BRIDGE_REASONING_PREFIX)) return null;
  try {
    const parsed: unknown = JSON.parse(
      Buffer.from(encryptedContent.slice(BRIDGE_REASONING_PREFIX.length), "base64").toString(
        "utf-8"
      )
    );
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const obj = parsed as { sig?: unknown; red?: unknown };
    const envelope: ReasoningEnvelope = {};
    if (typeof obj.sig === "string") envelope.sig = obj.sig;
    if (Array.isArray(obj.red)) {
      const red = obj.red.filter((r): r is string => typeof r === "string");
      if (red.length > 0) envelope.red = red;
    }
    const txt = (parsed as { txt?: unknown }).txt;
    if (typeof txt === "string" && txt.length > 0) envelope.txt = txt;
    return envelope.sig || envelope.red || envelope.txt ? envelope : null;
  } catch {
    return null;
  }
}
