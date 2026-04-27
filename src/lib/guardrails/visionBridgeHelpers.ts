/**
 * Vision Bridge helper functions for image processing.
 */

/**
 * Provider to environment variable mapping for API key resolution.
 */
const PROVIDER_API_KEY_MAP: Record<string, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  google: "GOOGLE_API_KEY",
  openai: "OPENAI_API_KEY",
};

/**
 * Resolve API key based on model provider.
 * @param model - Model identifier (e.g., "anthropic/claude-3-haiku", "openai/gpt-4o-mini")
 * @param explicitKey - Explicit API key passed as argument (takes precedence)
 * @returns Resolved API key string
 */
export function resolveProviderApiKey(model: string, explicitKey?: string): string {
  if (explicitKey) return explicitKey;
  const provider = model.includes("/") ? model.split("/")[0] : "";
  const envVar = PROVIDER_API_KEY_MAP[provider] || "OPENAI_API_KEY";
  return process.env[envVar] || "";
}

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

async function fetchRemoteImageAsDataUri(imageUrl: string, signal: AbortSignal): Promise<string> {
  const response = await fetch(imageUrl, { signal });
  if (!response.ok) {
    throw new Error(`Vision image fetch error ${response.status}`);
  }

  const mediaType = response.headers.get("content-type")?.split(";")[0]?.trim() || "image/png";
  const bytes = Buffer.from(await response.arrayBuffer());
  return `data:${mediaType};base64,${bytes.toString("base64")}`;
}

async function normalizeVisionImageInput(
  imageInput: string,
  isAnthropic: boolean,
  signal: AbortSignal
): Promise<string> {
  const normalizedImage = resolveImageAsDataUri(imageInput);

  if (
    isAnthropic &&
    (normalizedImage.startsWith("http://") || normalizedImage.startsWith("https://"))
  ) {
    return fetchRemoteImageAsDataUri(normalizedImage, signal);
  }

  return normalizedImage;
}

export interface VisionModelConfig {
  model: string;
  prompt: string;
  timeoutMs: number;
  maxImages: number;
}

/**
 * Call the vision model to get an image description.
 * Supports both OpenAI-compatible and Anthropic API formats.
 */
export async function callVisionModel(
  imageDataUri: string,
  config: VisionModelConfig,
  apiKey?: string
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs);

  // Resolve API key based on provider
  const resolvedApiKey = resolveProviderApiKey(config.model, apiKey);

  // Detect provider from model identifier
  const isAnthropic = config.model.startsWith("anthropic/");

  try {
    // Extract model name from provider/model format
    const modelName = config.model.includes("/") ? config.model.split("/")[1] : config.model;
    const normalizedImageInput = await normalizeVisionImageInput(
      imageDataUri,
      isAnthropic,
      controller.signal
    );

    let response: Response;

    if (isAnthropic) {
      // Anthropic API path
      const anthropicBaseUrl = process.env.ANTHROPIC_API_URL || "https://api.anthropic.com";

      // Parse data URI to extract media type and base64 data
      const matches = normalizedImageInput.match(/^data:([^;]+);base64,(.+)$/);
      let mediaType = "image/png";
      let base64Data = normalizedImageInput;

      if (matches) {
        mediaType = matches[1];
        base64Data = matches[2];
      }

      response = await fetch(`${anthropicBaseUrl}/v1/messages`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "x-api-key": resolvedApiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: mediaType,
                    data: base64Data,
                  },
                },
                {
                  type: "text",
                  text: config.prompt,
                },
              ],
            },
          ],
          max_tokens: 300,
        }),
      });
    } else {
      // OpenAI-compatible path (default)
      const baseUrl = process.env.OPENAI_API_URL || "https://api.openai.com/v1";

      response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resolvedApiKey}`,
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
                    url: normalizedImageInput,
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
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`Vision API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (isAnthropic) {
      // Anthropic response format: { content: [{ type: "text", text: "..." }] }
      const anthropicData = data as {
        content?: Array<{ type?: string; text?: string }>;
        error?: { message?: string };
      };

      if (anthropicData.error) {
        throw new Error(
          `Vision API error: ${anthropicData.error.message || JSON.stringify(anthropicData.error)}`
        );
      }

      const textContent = anthropicData.content?.find((c) => c.type === "text");
      const content = textContent?.text;
      if (!content || typeof content !== "string") {
        throw new Error("Vision API returned empty or invalid response");
      }

      return content.trim();
    } else {
      // OpenAI-compatible response format: { choices: [{ message: { content: "..." } }] }
      const openaiData = data as {
        choices?: Array<{ message?: { content?: string } }>;
        error?: { message?: string };
      };

      if (openaiData.error) {
        throw new Error(
          `Vision API error: ${openaiData.error.message || JSON.stringify(openaiData.error)}`
        );
      }

      const content = openaiData.choices?.[0]?.message?.content;
      if (!content || typeof content !== "string") {
        throw new Error("Vision API returned empty or invalid response");
      }

      return content.trim();
    }
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

  const result = structuredClone(body) as RequestBody;

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
