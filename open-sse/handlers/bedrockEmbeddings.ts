/**
 * Amazon Bedrock embedding transport.
 *
 * Bedrock has no OpenAI-compatible `/v1/embeddings` endpoint: each model family
 * has its own `InvokeModel` request body and response shape. This module maps
 * OpenAI `/v1/embeddings` requests onto those shapes and normalizes the replies
 * back into OpenAI's `{ data: [{ embedding, index }], usage }` envelope.
 *
 * All four shapes below were captured from live `bedrock-runtime` invokes
 * (2026-09-10, HTTP 200) rather than from documentation:
 *
 *   amazon.titan-embed-text-v2:0   req {inputText}            resp {embedding, embeddingsByType, inputTextTokenCount}
 *   amazon.titan-embed-text-v1     req {inputText}            resp {embedding, inputTextTokenCount}
 *   amazon.titan-embed-image-v1    req {inputText?,inputImage?} resp {embedding, failureCount, message, inputTextTokenCount}
 *   cohere.embed-english-v3        req {texts[]|images[], input_type}  resp {embeddings: number[][]}
 *   cohere.embed-v4:0              req {texts[]|images[], input_type}  resp {embeddings: {float: number[][]}}
 *
 * Note the two Cohere generations differ: v3 returns a BARE array
 * (`response_type: "embeddings_floats"`) while v4 returns a keyed map
 * (`response_type: "embeddings_by_type"`). Both must be handled.
 */

export type BedrockEmbeddingFamily = "titan-text" | "titan-multimodal" | "cohere";

export interface BedrockEmbeddingItem {
  /** Plain text to embed. */
  text?: string;
  /** Base64 image payload (no data-URL prefix) to embed. */
  imageBase64?: string;
}

export interface BedrockEmbeddingRequestOptions {
  /** OpenAI `dimensions` — mapped per family. */
  dimensions?: number;
  /** Cohere `input_type`; defaults to `search_document` for text, `image` for images. */
  inputType?: string;
  /** Titan `normalize`. */
  normalize?: boolean;
}

/** Classify a Bedrock model id into the family that decides its wire shape. */
export function bedrockEmbeddingFamily(modelId: string): BedrockEmbeddingFamily | null {
  const id = (modelId || "").toLowerCase();
  // Strip cross-region inference prefixes (us./eu./apac./global.) before matching.
  const bare = id.replace(/^(?:us|us-gov|eu|apac|jp|au|ca|sa|global)\./, "");
  if (bare.startsWith("cohere.embed")) return "cohere";
  if (bare.startsWith("amazon.titan-embed-image")) return "titan-multimodal";
  if (bare.startsWith("amazon.titan-embed-text")) return "titan-text";
  return null;
}

/** True when this family embeds exactly ONE item per invoke (needs fan-out). */
export function bedrockFamilyIsSingleItem(family: BedrockEmbeddingFamily): boolean {
  return family === "titan-text" || family === "titan-multimodal";
}

/** Strip a `data:<mime>;base64,` prefix if present. */
export function stripDataUrl(value: string): string {
  const match = /^data:[^;,]*;base64,(.*)$/is.exec(value || "");
  return match ? match[1] : value;
}

/**
 * Build the Bedrock `InvokeModel` body for one batch of items.
 * Titan families accept a single item; Cohere accepts the whole batch.
 */
export function buildBedrockEmbeddingBody(
  family: BedrockEmbeddingFamily,
  items: BedrockEmbeddingItem[],
  options: BedrockEmbeddingRequestOptions = {}
): Record<string, unknown> {
  if (family === "cohere") {
    const texts = items.filter((i) => i.text !== undefined).map((i) => i.text as string);
    const images = items
      .filter((i) => i.imageBase64 !== undefined)
      .map((i) =>
        i.imageBase64!.startsWith("data:")
          ? i.imageBase64!
          : `data:image/png;base64,${i.imageBase64}`
      );
    if (texts.length && images.length) {
      throw new Error(
        "Bedrock Cohere embeddings accept either texts or images in one request, not both"
      );
    }
    const body: Record<string, unknown> = {
      input_type: options.inputType ?? (images.length ? "image" : "search_document"),
    };
    if (images.length) body.images = images;
    else body.texts = texts;
    // Cohere names the dimension knob `output_dimension`, not OpenAI's `dimensions`.
    if (options.dimensions !== undefined) body.output_dimension = options.dimensions;
    return body;
  }

  if (items.length !== 1) {
    throw new Error(
      `Bedrock ${family} embeds one item per request; got ${items.length} (caller must fan out)`
    );
  }
  const item = items[0];

  if (family === "titan-multimodal") {
    const body: Record<string, unknown> = {};
    if (item.text !== undefined) body.inputText = item.text;
    if (item.imageBase64 !== undefined) body.inputImage = stripDataUrl(item.imageBase64);
    if (body.inputText === undefined && body.inputImage === undefined) {
      throw new Error("Titan multimodal embeddings require inputText or inputImage");
    }
    // Titan multimodal takes the dimension under embeddingConfig.
    if (options.dimensions !== undefined) {
      body.embeddingConfig = { outputEmbeddingLength: options.dimensions };
    }
    return body;
  }

  // titan-text
  if (item.text === undefined) {
    throw new Error("Titan text embeddings require a text input");
  }
  const body: Record<string, unknown> = { inputText: item.text };
  if (options.dimensions !== undefined) body.dimensions = options.dimensions;
  if (options.normalize !== undefined) body.normalize = options.normalize;
  return body;
}

/**
 * Extract the embedding vectors from one Bedrock response, in request order.
 * Returns one vector per embedded item (Titan: always 1; Cohere: N).
 */
function isFloatVector(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((n) => typeof n === "number" && Number.isFinite(n))
  );
}

function isFloatMatrix(value: unknown): value is number[][] {
  return Array.isArray(value) && value.length > 0 && value.every(isFloatVector);
}

export function extractBedrockEmbeddings(
  family: BedrockEmbeddingFamily,
  response: unknown
): number[][] {
  const body = (response ?? {}) as Record<string, unknown>;

  if (family === "cohere") {
    const raw = body.embeddings;
    // v3: bare number[][]  (response_type "embeddings_floats")
    if (isFloatMatrix(raw)) return raw;
    // v4: { float: number[][], int8?: … }  (response_type "embeddings_by_type").
    // Only `float` is an OpenAI-compatible vector; never fall back to int8/binary.
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const keyed = raw as Record<string, unknown>;
      if (isFloatMatrix(keyed.float)) return keyed.float;
    }
    throw new Error("Bedrock Cohere embedding response contained no float embeddings");
  }

  // Titan text + multimodal both return a single flat vector under `embedding`.
  if (isFloatVector(body.embedding)) return [body.embedding];
  // titan-text v2 also mirrors it under embeddingsByType.float
  const byType = body.embeddingsByType as Record<string, unknown> | undefined;
  if (byType && isFloatVector(byType.float)) return [byType.float];
  throw new Error("Bedrock Titan embedding response contained no embedding");
}

/**
 * Token usage, when the model reports it. Titan returns
 * `inputTextTokenCount`; Cohere reports nothing, so callers fall back to 0.
 */
export function extractBedrockPromptTokens(response: unknown): number {
  const body = (response ?? {}) as Record<string, unknown>;
  const count = body.inputTextTokenCount;
  return typeof count === "number" && Number.isFinite(count) ? count : 0;
}

/**
 * Titan multimodal reports per-item failures in-band with HTTP 200
 * (`failureCount` > 0 plus a human-readable `message`). Surface it as an error
 * instead of returning a silently wrong vector.
 */
export function bedrockPartialFailureMessage(response: unknown): string | null {
  const body = (response ?? {}) as Record<string, unknown>;
  const failures = body.failureCount;
  if (typeof failures === "number" && failures > 0) {
    const detail = typeof body.message === "string" && body.message ? `: ${body.message}` : "";
    return `Bedrock embedding reported ${failures} failed item(s)${detail}`;
  }
  return null;
}

export function assertNoBedrockPartialFailure(response: unknown): void {
  const message = bedrockPartialFailureMessage(response);
  if (message) throw new Error(message);
}

/** Fill the `{region}` / `{model}` placeholders in the registry baseUrl template. */
export function resolveBedrockEmbeddingUrl(
  template: string,
  region: string,
  modelId: string
): string {
  return template
    .replace("{region}", encodeURIComponent(region))
    .replace("{model}", encodeURIComponent(modelId));
}
