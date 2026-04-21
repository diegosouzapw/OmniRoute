/**
 * Vision Bridge helper functions for image processing.
 */

export interface ImagePart {
  messageIndex: number;
  partIndex: number;
  imageUrl: string;
  imageType: "image_url" | "image";
}

export interface RequestMessage {
  role?: string;
  content?: string | RequestContentPart[];
}

export type RequestContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string; detail?: string } }
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } };

/**
 * Extract image parts from messages array.
 * Supports both OpenAI image_url format and base64 image format.
 */
export function extractImageParts(messages: RequestMessage[]): ImagePart[] {
  const results: ImagePart[] = [];

  if (!Array.isArray(messages)) {
    return results;
  }

  for (let msgIdx = 0; msgIdx < messages.length; msgIdx++) {
    const message = messages[msgIdx];
    if (!message || !Array.isArray(message.content)) {
      continue;
    }

    for (let partIdx = 0; partIdx < message.content.length; partIdx++) {
      const part = message.content[partIdx];

      if (part?.type === "image_url" && part.image_url?.url) {
        results.push({
          messageIndex: msgIdx,
          partIndex: partIdx,
          imageUrl: part.image_url.url,
          imageType: "image_url",
        });
      } else if (part?.type === "image" && part.source?.type === "base64") {
        const { media_type, data } = part.source;
        const dataUri = `data:${media_type};base64,${data}`;
        results.push({
          messageIndex: msgIdx,
          partIndex: partIdx,
          imageUrl: dataUri,
          imageType: "image",
        });
      }
    }
  }

  return results;
}

/**
 * Resolve image URL to data URI format for vision model.
 * - HTTP/HTTPS URLs: passed through as-is
 * - Data URIs: passed through as-is
 * - Base64 without media type: assumed PNG
 */
export function resolveImageAsDataUri(imageUrl: string): string {
  if (!imageUrl || typeof imageUrl !== "string") {
    throw new Error("Invalid image URL: must be a non-empty string");
  }

  // Already a data URI
  if (imageUrl.startsWith("data:")) {
    return imageUrl;
  }

  // HTTP/HTTPS URL - vision API will fetch it
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Assume it's a base64 string without prefix
  // Add PNG as default media type
  return `data:image/png;base64,${imageUrl}`;
}

export interface VisionModelConfig {
  model: string;
  prompt: string;
  timeoutMs: number;
  maxImages: number;
}

/**
 * Call the vision model to get an image description.
 * Uses OpenAI-compatible /v1/chat/completions format.
 */
export async function callVisionModel(
  imageDataUri: string,
  config: VisionModelConfig,
  apiKey?: string
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    // Extract model name from provider/model format
    const modelName = config.model.includes("/")
      ? config.model.split("/")[1]
      : config.model;

    // Determine API endpoint
    const baseUrl = config.model.startsWith("anthropic/")
      ? process.env.ANTHROPIC_API_URL || "https://api.anthropic.com"
      : process.env.OPENAI_API_URL || "https://api.openai.com/v1";

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey || process.env.OPENAI_API_KEY || ""}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: imageDataUri,
                  detail: "low",
                },
              },
              { type: "text", text: config.prompt },
            ],
          },
        ],
        max_tokens: 300,
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Vision API error ${response.status}: ${errorText}`);
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    if (data.error) {
      throw new Error(`Vision API error: ${data.error.message || JSON.stringify(data.error)}`);
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content || typeof content !== "string") {
      throw new Error("Vision API returned empty or invalid response");
    }

    return content.trim();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Vision model call timed out");
    }

    throw error;
  }
}

export interface RequestBody {
  model?: string;
  messages?: RequestMessage[];
  [key: string]: unknown;
}

/**
 * Replace image content parts with text descriptions.
 * Concatenates descriptions with labels: "[Image 1]: ..."
 */
export function replaceImageParts(body: RequestBody, descriptions: string[]): RequestBody {
  if (!descriptions || descriptions.length === 0) {
    return body;
  }

  const result = deepClone(body) as RequestBody;

  if (!Array.isArray(result.messages)) {
    return result;
  }

  let descriptionIndex = 0;

  for (let msgIdx = 0; msgIdx < result.messages.length; msgIdx++) {
    const message = result.messages[msgIdx];
    if (!message || !Array.isArray(message.content)) {
      continue;
    }

    const newContent: RequestContentPart[] = [];

    for (const part of message.content) {
      if (part?.type === "image_url" || part?.type === "image") {
        if (descriptionIndex < descriptions.length) {
          newContent.push({
            type: "text",
            text: descriptions[descriptionIndex],
          });
          descriptionIndex++;
        }
      } else {
        newContent.push(part as RequestContentPart);
      }
    }

    message.content = newContent;
  }

  return result;
}

/**
 * Deep clone an object (for immutability).
 */
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  const cloned = {} as Record<string, unknown>;
  for (const [key, value] of Object.entries(obj)) {
    cloned[key] = deepClone(value);
  }
  return cloned as T;
}
