import { resolveAlibabaProviderMediaBaseUrl } from "@/shared/constants/alibabaProviderRegions";

import { isJsonObject } from "../../../utils/kieTask.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

interface AlibabaImageOptions {
  model: string;
  provider: string;
  providerConfig: {
    baseUrl: string;
    models?: Array<{ id: string }>;
  };
  body: Record<string, unknown> & {
    prompt?: unknown;
    size?: unknown;
    n?: unknown;
    image?: unknown;
    image_url?: unknown;
    imageUrls?: unknown;
    image_urls?: unknown;
    parameters?: unknown;
  };
  credentials?: {
    apiKey?: string;
    accessToken?: string;
    providerSpecificData?: unknown;
  } | null;
  log?: {
    info: (scope: string, message: string) => void;
    error: (scope: string, message: string) => void;
  } | null;
}

function collectImageUrls(body: AlibabaImageOptions["body"]): string[] {
  const values = [body.image, body.image_url, body.imageUrls, body.image_urls].flatMap((value) =>
    Array.isArray(value) ? value : [value]
  );
  const urls = new Set<string>();

  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      urls.add(value.trim());
      continue;
    }
    if (!isJsonObject(value)) continue;
    const url =
      typeof value.url === "string"
        ? value.url
        : typeof value.image_url === "string"
          ? value.image_url
          : null;
    if (url?.trim()) urls.add(url.trim());
  }

  return [...urls];
}

function normalizeImageSize(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const size = value.trim();
  return /^\d+x\d+$/i.test(size) ? size.replace(/x/i, "*") : size;
}

function getAlibabaImageUrls(payload: unknown): string[] {
  if (!isJsonObject(payload) || !isJsonObject(payload.output)) return [];
  const choices = Array.isArray(payload.output.choices) ? payload.output.choices : [];
  const urls = new Set<string>();

  for (const choice of choices) {
    if (!isJsonObject(choice) || !isJsonObject(choice.message)) continue;
    const content = Array.isArray(choice.message.content) ? choice.message.content : [];
    for (const item of content) {
      if (!isJsonObject(item) || typeof item.image !== "string" || !item.image.trim()) continue;
      urls.add(item.image.trim());
    }
  }

  return [...urls];
}

function getAlibabaImageError(payload: unknown, fallback: string): string {
  if (!isJsonObject(payload)) return fallback;
  const message =
    typeof payload.message === "string"
      ? payload.message
      : typeof payload.code === "string"
        ? payload.code
        : fallback;
  return sanitizeErrorMessage(message) || fallback;
}

export async function handleAlibabaImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: AlibabaImageOptions) {
  const isRegisteredModel = providerConfig.models?.some((entry) => entry.id === model) === true;
  if (!isRegisteredModel) {
    return {
      success: false as const,
      status: 400,
      error: `Unsupported ${provider} image model: ${model}`,
    };
  }

  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return {
      success: false as const,
      status: 401,
      error: `${provider} API key is required`,
    };
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  const content = [
    ...collectImageUrls(body).map((image) => ({ image })),
    ...(prompt ? [{ text: prompt }] : []),
  ];
  const parameters: Record<string, unknown> = isJsonObject(body.parameters)
    ? { ...body.parameters }
    : {};
  const size = normalizeImageSize(body.size);
  if (size) parameters.size = size;
  if (Number.isInteger(body.n) && Number(body.n) > 0) parameters.n = Number(body.n);

  for (const key of [
    "negative_prompt",
    "prompt_extend",
    "watermark",
    "seed",
    "enable_sequential",
    "thinking_mode",
    "color_palette",
  ] as const) {
    if (body[key] !== undefined) parameters[key] = body[key];
  }

  const mediaBaseUrl = resolveAlibabaProviderMediaBaseUrl(
    provider,
    credentials.providerSpecificData,
    providerConfig.baseUrl
  );
  const url = mediaBaseUrl.endsWith("/services/aigc/multimodal-generation/generation")
    ? mediaBaseUrl
    : `${mediaBaseUrl}/services/aigc/multimodal-generation/generation`;

  log?.info?.("IMAGE", `${provider}/${model} (alibaba-image)`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: {
          messages: [{ role: "user", content }],
        },
        ...(Object.keys(parameters).length > 0 ? { parameters } : {}),
      }),
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false as const,
        status: response.status || 502,
        error: getAlibabaImageError(payload, "Alibaba image generation failed"),
      };
    }

    const urls = getAlibabaImageUrls(payload);
    if (urls.length === 0) {
      return {
        success: false as const,
        status: 502,
        error: "Alibaba image generation returned no images",
      };
    }

    return {
      success: true as const,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: urls.map((url) => ({ url })),
      },
    };
  } catch (error: unknown) {
    log?.error?.("IMAGE", `Alibaba image generation failed: ${sanitizeErrorMessage(error)}`);
    return {
      success: false as const,
      status: 502,
      error: sanitizeErrorMessage(error) || "Alibaba image generation failed",
    };
  }
}
