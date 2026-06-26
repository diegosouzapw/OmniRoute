// Meta AI persisted-query request builder + base62/ID generators, extracted from validation.ts
// (god-file decomposition). Self-contained: uses only global crypto / Date / Math / Intl. The
// muse-spark-web validator (validation/webProvidersB.ts) consumes buildMetaAiValidationBody + the
// META_AI_* request consts. Behavior is byte-identical to the original inline defs.
export const META_AI_SEND_MESSAGE_DOC_ID = "29ae946c82d1f301196c6ca2226400b5";
export const META_AI_FRIENDLY_NAME = "useEctoSendMessageSubscription";
export const META_AI_REQUEST_ANALYTICS_TAGS = "graphservice";
export const META_AI_ASBD_ID = "129477";
export const META_AI_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";
export const META_AI_BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function encodeMetaAiBase62(value: bigint, padLength: number): string {
  let remaining = value;
  let encoded = "";

  while (remaining > 0n) {
    encoded = META_AI_BASE62_ALPHABET[Number(remaining % 62n)] + encoded;
    remaining /= 62n;
  }

  return encoded.padStart(padLength, "0");
}

export function decodeMetaAiBase62(value: string): bigint {
  let decoded = 0n;
  for (const char of value) {
    const index = META_AI_BASE62_ALPHABET.indexOf(char);
    if (index < 0) {
      throw new Error(`Invalid Meta AI base62 character: ${char}`);
    }
    decoded = decoded * 62n + BigInt(index);
  }
  return decoded;
}

export function randomMetaAiBigInt(byteLength: number): bigint {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  let result = 0n;
  for (const byte of bytes) {
    result = (result << 8n) | BigInt(byte);
  }
  return result;
}

export function generateMetaAiConversationId(): string {
  const timestamp = BigInt(Date.now()) & ((1n << 44n) - 1n);
  const random = randomMetaAiBigInt(8) & ((1n << 64n) - 1n);
  return `c.${encodeMetaAiBase62((timestamp << 64n) | random, 19)}`;
}

export function generateMetaAiEventId(conversationId: string): string | null {
  if (!conversationId.startsWith("c.")) {
    return null;
  }

  try {
    const packedConversation = decodeMetaAiBase62(conversationId.slice(2));
    const conversationRandom = packedConversation & ((1n << 64n) - 1n);
    const timestamp = BigInt(Date.now()) & ((1n << 44n) - 1n);
    const eventRandom = randomMetaAiBigInt(4) & ((1n << 32n) - 1n);
    return `e.${encodeMetaAiBase62((timestamp << (64n + 32n)) | (conversationRandom << 32n) | eventRandom, 25)}`;
  } catch {
    return null;
  }
}

export function generateMetaAiNumericMessageId(): string {
  return (
    BigInt(Date.now()) * 1000n +
    BigInt(Math.floor(Math.random() * 1000)) +
    (randomMetaAiBigInt(2) & 0xfffn)
  ).toString();
}

export function buildMetaAiValidationBody() {
  const conversationId = generateMetaAiConversationId();
  return {
    doc_id: META_AI_SEND_MESSAGE_DOC_ID,
    variables: {
      assistantMessageId: crypto.randomUUID(),
      attachments: null,
      clientLatitude: null,
      clientLongitude: null,
      clientTimezone:
        typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
      clippyIp: null,
      content: "test",
      conversationId,
      conversationStarterId: null,
      currentBranchPath: "0",
      developerOverridesForMessage: null,
      devicePixelRatio: 1,
      entryPoint: "KADABRA__CHAT__UNIFIED_INPUT_BAR",
      imagineOperationRequest: null,
      isNewConversation: true,
      mentions: null,
      mode: "mode_fast",
      promptEditType: null,
      promptSessionId: crypto.randomUUID(),
      promptType: null,
      qplJoinId: null,
      requestedToolCall: null,
      // See muse-spark-web executor: RewriteOptionsInput was removed from
      // Meta's schema; sending `rewriteOptions` (even null) breaks the
      // persisted-query validation. Omit the field.
      turnId: crypto.randomUUID(),
      userAgent: META_AI_USER_AGENT,
      userEventId: generateMetaAiEventId(conversationId),
      userLocale: "en_US",
      userMessageId: crypto.randomUUID(),
      userUniqueMessageId: generateMetaAiNumericMessageId(),
    },
  };
}
