/**
 * Arena (arena.ai) client-interaction telemetry — the `cx` request field.
 *
 * `create-evaluation` always carries `cx`:
 *
 *   [CLIENT_INTERACTION_FIELD]: packClientInteraction(
 *     userMessage.clientInteraction ?? buildProgrammaticClientInteraction()
 *   )
 *
 * (`CLIENT_INTERACTION_FIELD === "cx"`, recovered from the live arena.ai
 * client bundle.) It is an anti-automation signal: the upstream field parser
 * accepts either the encoded blob (<= 24 chars) or a small JSON object, and
 * normalises anything oversized/undecodable to the empty string.
 *
 * Wire format (version 2) — 15 bytes, 20 base64url chars, no padding:
 *
 *   byte 0     version (2)
 *   bytes 1-2  nonce, big-endian — selects the field order + XOR mask
 *   bytes 3..  bit-packed payload, fields written MSB-first in `order`
 *
 * The payload is XOR-masked and the field order is a PRNG shuffle seeded with
 * the nonce, so one interaction encodes differently per nonce. The decoder
 * reads the nonce back out of the blob (bytes 1-2), which is why any nonce
 * round-trips and why this is obfuscation rather than a secret.
 */

/** base64url alphabet used by the upstream packer (no padding, `-_` not `+/`). */
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

const CLIENT_INTERACTION_VERSION = 2;

/** `CLIENT_INTERACTION_SUBMIT_KINDS` — index is the wire value. */
const SUBMIT_KINDS = ["enter", "button", "programmatic", "unknown"] as const;

/** `CLIENT_INTERACTION_DOC_OWN_PROPS` — one payload bit each, in this order. */
const DOC_OWN_PROPS = ["visibilityState", "hidden", "hasFocus"] as const;

const PRESS_BUCKETS = ["none", "lt5", "lt50", "lt300", "ge300"] as const;
const PRESSURE_BUCKETS = ["none", "zero", "half", "other"] as const;
const MOVE_BUCKETS = ["0", "1to3", "4to15", "gt15"] as const;
const COALESCED_BUCKETS = ["0", "1", "2to4", "gt4"] as const;
const HEARTBEAT_GAP_BUCKETS = ["lt2s", "lt10s", "lt60s", "ge60s"] as const;
const VISIBILITY_CHANGE_BUCKETS = ["0", "1to3", "gt3"] as const;

export type ArenaSubmitKind = (typeof SUBMIT_KINDS)[number];

/** A decoded/constructed client-interaction descriptor (upstream `ClientInteractionParser` shape). */
export interface ArenaClientInteraction {
  v: number;
  submitKind: ArenaSubmitKind;
  submitTrusted: boolean | null;
  untrustedUiEvents: number;
  charsTyped: number;
  insertMulti: number;
  pasteCount: number;
  pasteWithoutModifier: boolean;
  composition: boolean;
  otherInputTypes: number;
  docOwnProps: readonly (typeof DOC_OWN_PROPS)[number][];
  coarsePointer: boolean;
  integrity?: number;
  pressBucket: (typeof PRESS_BUCKETS)[number];
  pressureBucket: (typeof PRESSURE_BUCKETS)[number];
  movesBeforeClick: (typeof MOVE_BUCKETS)[number];
  maxCoalesced: (typeof COALESCED_BUCKETS)[number];
  heartbeatGapBucket: (typeof HEARTBEAT_GAP_BUCKETS)[number];
  visibilityChangesBucket: (typeof VISIBILITY_CHANGE_BUCKETS)[number];
  focusVisContradiction: boolean;
  visitTag: number;
  minuteTag: number;
}

/** Version-2 payload layout: field name + bit width, in canonical (pre-shuffle) order. */
const V2_LAYOUT = [
  { key: "submitKind", bits: 2 },
  { key: "submitTrusted", bits: 2 },
  { key: "untrustedUiEvents", bits: 4 },
  { key: "charsTyped", bits: 8 },
  { key: "insertMulti", bits: 4 },
  { key: "pasteCount", bits: 4 },
  { key: "pasteWithoutModifier", bits: 1 },
  { key: "composition", bits: 1 },
  { key: "otherInputTypes", bits: 4 },
  { key: "docOwnProps", bits: DOC_OWN_PROPS.length },
  { key: "coarsePointer", bits: 1 },
  { key: "integrity", bits: 16 },
  { key: "pressBucket", bits: 3 },
  { key: "pressureBucket", bits: 2 },
  { key: "movesBeforeClick", bits: 2 },
  { key: "maxCoalesced", bits: 2 },
  { key: "heartbeatGapBucket", bits: 2 },
  { key: "visibilityChangesBucket", bits: 2 },
  { key: "focusVisContradiction", bits: 1 },
  { key: "visitTag", bits: 16 },
  { key: "minuteTag", bits: 16 },
] as const;

type LayoutKey = (typeof V2_LAYOUT)[number]["key"];

const PAYLOAD_BITS = V2_LAYOUT.reduce((total, field) => total + field.bits, 0); // 96
const PAYLOAD_BYTES = Math.ceil(PAYLOAD_BITS / 8); // 12
const BLOB_BYTES = 3 + PAYLOAD_BYTES; // 15
/** Upstream `CLIENT_INTERACTION_FIELD_MAX_CHARS` is 24; v2 packs into 20. */
const BLOB_CHARS = Math.ceil((4 * BLOB_BYTES) / 3); // 20

/**
 * Nonce used for every blob we emit. arena.ai derives this with
 * `deriveClientInteractionSalt("f64c7ae530561323976848b24d31f649fee44f9c")`, an
 * FNV-1a fold of a constant in its own bundle. The server reads the nonce back
 * from bytes 1-2, so the exact value is a client-side fixture — this one is
 * kept only so our output is byte-identical to the real browser's.
 */
const PROGRAMMATIC_NONCE = 5853;

function bucketIndex(names: readonly string[], value: string): number {
  const index = names.indexOf(value);
  return index < 0 ? 0 : index;
}

/** Upstream `y()`: unknown bucket names collapse to index 0 ("none"/"0"). */
function fieldValue(interaction: ArenaClientInteraction, key: LayoutKey): number {
  switch (key) {
    case "submitKind":
      return bucketIndex(SUBMIT_KINDS, interaction.submitKind);
    case "submitTrusted":
      // null = "not reported" (0); false = 1; true = 2.
      return interaction.submitTrusted == null ? 0 : interaction.submitTrusted ? 2 : 1;
    case "pasteWithoutModifier":
    case "composition":
    case "coarsePointer":
    case "focusVisContradiction":
      return interaction[key] ? 1 : 0;
    case "docOwnProps":
      return interaction.docOwnProps.reduce(
        (acc, prop) => acc | (1 << bucketIndex(DOC_OWN_PROPS, prop)),
        0
      );
    case "integrity":
      return interaction.integrity ?? 0;
    case "visitTag":
      return interaction.visitTag ?? 0;
    case "minuteTag":
      return interaction.minuteTag ?? 0;
    case "pressBucket":
      return bucketIndex(PRESS_BUCKETS, interaction.pressBucket);
    case "pressureBucket":
      return bucketIndex(PRESSURE_BUCKETS, interaction.pressureBucket);
    case "movesBeforeClick":
      return bucketIndex(MOVE_BUCKETS, interaction.movesBeforeClick);
    case "maxCoalesced":
      return bucketIndex(COALESCED_BUCKETS, interaction.maxCoalesced);
    case "heartbeatGapBucket":
      return bucketIndex(HEARTBEAT_GAP_BUCKETS, interaction.heartbeatGapBucket);
    case "visibilityChangesBucket":
      return bucketIndex(VISIBILITY_CHANGE_BUCKETS, interaction.visibilityChangesBucket);
    default:
      return interaction[key];
  }
}

/**
 * Upstream `m()` — a seeded 32-bit PRNG drives a Fisher-Yates shuffle of the
 * layout (field order) plus a per-byte XOR mask. Not a security boundary; it
 * only makes each blob unique to its nonce.
 */
function deriveOrderAndMask(nonce: number): { order: number[]; mask: Uint8Array } {
  let state = (0x5bd1e995 ^ nonce) >>> 0;
  const next = (): number => {
    state = (state + 0x6d2b79f5) | 0;
    let x = Math.imul(state ^ (state >>> 15), 1 | state);
    x = (x ^ (x + Math.imul(x ^ (x >>> 7), 61 | x))) >>> 0;
    return (x ^ (x >>> 14)) >>> 0;
  };

  const order = V2_LAYOUT.map((_field, index) => index);
  for (let i = order.length - 1; i > 0; i--) {
    const j = next() % (i + 1);
    const swap = order[i];
    order[i] = order[j];
    order[j] = swap;
  }

  const mask = new Uint8Array(PAYLOAD_BYTES);
  for (let i = 0; i < PAYLOAD_BYTES; i++) mask[i] = 255 & next();
  return { order, mask };
}

/** Upstream base64url packer: 3-byte groups, no padding, custom alphabet. */
function toBase64Url(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = bytes[i + 1];
    const b2 = bytes[i + 2];
    const triple = (b0 << 16) | ((b1 ?? 0) << 8) | (b2 ?? 0);
    out += ALPHABET[(triple >>> 18) & 63];
    out += ALPHABET[(triple >>> 12) & 63];
    if (b1 !== undefined) out += ALPHABET[(triple >>> 6) & 63];
    if (b2 !== undefined) out += ALPHABET[triple & 63];
  }
  return out;
}

/**
 * Pack an interaction descriptor into the `cx` wire string.
 *
 * Field order and mask are nonce-derived, so pass a stable nonce for a stable
 * encoding. Field values are clamped by the fixed bit widths rather than
 * validated — out-of-range values simply lose their high bits, exactly as the
 * upstream packer does.
 */
export function encodeClientInteraction(
  interaction: ArenaClientInteraction,
  nonce: number
): string {
  const seeded = nonce & 0xffff;
  const { order, mask } = deriveOrderAndMask(seeded);

  const payload = new Uint8Array(PAYLOAD_BYTES);
  let bit = 0;
  for (const layoutIndex of order) {
    const field = V2_LAYOUT[layoutIndex];
    const value = fieldValue(interaction, field.key);
    for (let shift = field.bits - 1; shift >= 0; shift--) {
      if ((value >>> shift) & 1) payload[bit >> 3] |= 128 >>> (7 & bit);
      bit++;
    }
  }

  for (let i = 0; i < PAYLOAD_BYTES; i++) payload[i] ^= mask[i];

  const blob = new Uint8Array(BLOB_BYTES);
  blob[0] = CLIENT_INTERACTION_VERSION;
  blob[1] = seeded >>> 8;
  blob[2] = 255 & seeded;
  blob.set(payload, 3);

  return toBase64Url(blob);
}

/**
 * The descriptor arena.ai itself falls back to when the page has no recorded
 * interaction: `buildProgrammaticClientInteraction()` with no DOM, so the
 * lifecycle/visit facts are the static defaults and the integrity bitfield is
 * left at 0 ("no check tripped") rather than claiming human telemetry.
 */
export function buildProgrammaticClientInteraction(): ArenaClientInteraction {
  return {
    v: CLIENT_INTERACTION_VERSION,
    submitKind: "programmatic",
    submitTrusted: null,
    untrustedUiEvents: 0,
    charsTyped: 0,
    insertMulti: 0,
    pasteCount: 0,
    pasteWithoutModifier: false,
    composition: false,
    otherInputTypes: 0,
    docOwnProps: [],
    coarsePointer: false,
    integrity: 0,
    pressBucket: "none",
    pressureBucket: "none",
    movesBeforeClick: "0",
    maxCoalesced: "0",
    heartbeatGapBucket: "lt2s",
    visibilityChangesBucket: "0",
    focusVisContradiction: false,
    visitTag: 0,
    minuteTag: 0,
  };
}

/** `cx` value for a request we initiate with no browser interaction to report. */
export function encodeProgrammaticCx(): string {
  return encodeClientInteraction(buildProgrammaticClientInteraction(), PROGRAMMATIC_NONCE);
}

export const ARENA_CLIENT_INTERACTION_FIELD = "cx";
export { BLOB_CHARS as ARENA_CLIENT_INTERACTION_BLOB_CHARS };
export { CLIENT_INTERACTION_VERSION as ARENA_CLIENT_INTERACTION_VERSION };
export { PROGRAMMATIC_NONCE as ARENA_CLIENT_INTERACTION_NONCE };
