import { NextResponse } from "next/server";
import { createProviderNode, getProviderNodes } from "@/models";
import { getProviderNodesCount } from "@/lib/db/providers/nodes";
import {
  OPENAI_COMPATIBLE_PREFIX,
  ANTHROPIC_COMPATIBLE_PREFIX,
  CLAUDE_CODE_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";
import { generateId } from "@/shared/utils";
import { isCcCompatibleProviderEnabled } from "@/shared/utils/featureFlags";
import { createProviderNodeSchema, paginationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { validateProviderNodeBaseUrl } from "./urlGuard";

const OPENAI_COMPATIBLE_DEFAULTS = {
  baseUrl: "https://api.openai.com/v1",
};

const ANTHROPIC_COMPATIBLE_DEFAULTS = {
  baseUrl: "https://api.anthropic.com/v1",
};

// #6874: VibeProxy (github.com/automazeio/vibeproxy) — local OpenAI-compatible
// gateway. baseUrl has no default (operator-specific host/port); name/prefix/
// apiType are filled in when the caller omits them.
const VIBEPROXY_OPENAI_DEFAULTS = {
  name: "VibeProxy",
  prefix: "vibeproxy",
  apiType: "chat" as const,
};

/**
 * Normalize a caller-supplied VibeProxy base URL down to its `/v1` root,
 * mirroring `sanitizeAnthropicBaseUrl`/`sanitizeClaudeCodeCompatibleBaseUrl`:
 * strip trailing slash + known OpenAI-compatible suffixes, then ensure the
 * result ends at `/v1` (append if absent, guard against double `/v1/v1`).
 */
function sanitizeVibeProxyBaseUrl(baseUrl: string) {
  let base = (baseUrl || "")
    .trim()
    .replace(/\/$/, "")
    .replace(/\/chat\/completions$/i, "")
    .replace(/\/completions$/i, "");
  // Guard against a literal "scheme://v1" authority so we never strip the host itself.
  if (base.endsWith("/v1") && !base.endsWith("://v1")) {
    return base;
  }
  return `${base}/v1`;
}

function sanitizeAnthropicBaseUrl(baseUrl: string) {
  return (baseUrl || "")
    .trim()
    .replace(/\/$/, "")
    .replace(/\/messages(?:\?[^#]*)?$/i, "");
}

function sanitizeClaudeCodeCompatibleBaseUrl(baseUrl: string) {
  return (baseUrl || "")
    .trim()
    .replace(/\/$/, "")
    .replace(/\/(?:v\d+\/)?messages(?:\?[^#]*)?$/i, "");
}

export async function GET(request?: Request) {
  try {
    const url = new URL(request?.url ?? "http://localhost/api/provider-nodes");
    const raw = {
      offset: url.searchParams.get("offset") || undefined,
      limit: url.searchParams.get("limit") || undefined,
    };
    const validation = validateBody(paginationSchema, raw);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { limit: parsedLimit, offset: parsedOffset } = validation.data;
    const limit =
      Number.isInteger(parsedLimit) && parsedLimit && parsedLimit > 0 ? parsedLimit : undefined;
    const offset =
      Number.isInteger(parsedOffset) && parsedOffset && parsedOffset > 0 ? parsedOffset : 0;

    const total = getProviderNodesCount();
    const nodes = await getProviderNodes({}, limit, offset);
    return NextResponse.json({
      nodes,
      total,
      ccCompatibleProviderEnabled: isCcCompatibleProviderEnabled(),
    });
  } catch (error) {
    console.log("Error fetching provider nodes:", error);
    return NextResponse.json({ error: "Failed to fetch provider nodes" }, { status: 500 });
  }
}

// POST /api/provider-nodes - Create provider node
export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(createProviderNodeSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const {
      name,
      prefix,
      apiType,
      baseUrl,
      type,
      compatMode,
      preset,
      chatPath,
      modelsPath,
      customHeaders,
      iconUrl,
    } = validation.data;

    if (preset === "vibeproxy-openai") {
      // Schema guarantees baseUrl is non-empty for this preset.
      const sanitizedBaseUrl = sanitizeVibeProxyBaseUrl(baseUrl as string);
      const baseUrlError = validateProviderNodeBaseUrl(sanitizedBaseUrl);
      if (baseUrlError) return baseUrlError;

      const node = await createProviderNode({
        id: `${OPENAI_COMPATIBLE_PREFIX}${VIBEPROXY_OPENAI_DEFAULTS.apiType}-${generateId()}`,
        type: "openai-compatible",
        prefix: (prefix?.trim() || VIBEPROXY_OPENAI_DEFAULTS.prefix).trim(),
        apiType: apiType || VIBEPROXY_OPENAI_DEFAULTS.apiType,
        baseUrl: sanitizedBaseUrl,
        name: (name?.trim() || VIBEPROXY_OPENAI_DEFAULTS.name).trim(),
        chatPath: chatPath || null,
        modelsPath: modelsPath || null,
        iconUrl: iconUrl?.trim() || null,
        customHeaders: customHeaders || null,
      });
      return NextResponse.json({ node }, { status: 201 });
    }

    // Determine type
    const nodeType = type || "openai-compatible";

    if (nodeType === "openai-compatible") {
      const resolvedName = (name || "").trim();
      const resolvedPrefix = (prefix || "").trim();
      const resolvedBaseUrl = (baseUrl || OPENAI_COMPATIBLE_DEFAULTS.baseUrl).trim();
      const baseUrlError = validateProviderNodeBaseUrl(resolvedBaseUrl);
      if (baseUrlError) return baseUrlError;

      const node = await createProviderNode({
        id: `${OPENAI_COMPATIBLE_PREFIX}${apiType}-${generateId()}`,
        type: "openai-compatible",
        prefix: resolvedPrefix,
        apiType,
        baseUrl: resolvedBaseUrl,
        name: resolvedName,
        chatPath: chatPath || null,
        modelsPath: modelsPath || null,
        iconUrl: iconUrl?.trim() || null,
        customHeaders: customHeaders || null,
      });
      return NextResponse.json({ node }, { status: 201 });
    }

    if (nodeType === "anthropic-compatible") {
      if (compatMode === "cc" && !isCcCompatibleProviderEnabled()) {
        return NextResponse.json({ error: "CC Compatible provider is disabled" }, { status: 403 });
      }

      const rawBaseUrl = baseUrl || ANTHROPIC_COMPATIBLE_DEFAULTS.baseUrl;
      const sanitizedBaseUrl =
        compatMode === "cc"
          ? sanitizeClaudeCodeCompatibleBaseUrl(rawBaseUrl)
          : sanitizeAnthropicBaseUrl(rawBaseUrl);
      const baseUrlError = validateProviderNodeBaseUrl(sanitizedBaseUrl);
      if (baseUrlError) return baseUrlError;

      const node = await createProviderNode({
        id:
          compatMode === "cc"
            ? `${CLAUDE_CODE_COMPATIBLE_PREFIX}${generateId()}`
            : `${ANTHROPIC_COMPATIBLE_PREFIX}${generateId()}`,
        type: "anthropic-compatible",
        prefix: (prefix || "").trim(),
        baseUrl: sanitizedBaseUrl,
        name: (name || "").trim(),
        chatPath: chatPath || null,
        modelsPath: compatMode === "cc" ? null : modelsPath || null,
        iconUrl: iconUrl?.trim() || null,
        customHeaders: customHeaders || null,
      });
      return NextResponse.json({ node }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid provider node type" }, { status: 400 });
  } catch (error) {
    console.log("Error creating provider node:", error);
    return NextResponse.json({ error: "Failed to create provider node" }, { status: 500 });
  }
}
