import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { getProviderNodeById } from "@/models";
import {
  isClaudeCodeCompatibleProvider,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { validateProviderApiKey } from "@/lib/providers/validation";
import { getProxyForLevel, resolveProxyForProvider } from "@/lib/localDb";
import { validateProviderApiKeySchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

function sanitizeAuditUrl(url: string | null | undefined) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`.replace(/\/$/, "") || parsed.origin;
  } catch {
    return String(url);
  }
}

// POST /api/providers/validate - Validate API key with provider
export async function POST(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);
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
    const validation = validateBody(validateProviderApiKeySchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const {
      provider,
      apiKey,
      validationModelId,
      customUserAgent,
      baseUrl: bodyBaseUrl,
      cx,
    } = validation.data;

    let providerSpecificData: any = { validationModelId };
    if (customUserAgent) {
      providerSpecificData.customUserAgent = customUserAgent;
    }
    if (bodyBaseUrl) {
      providerSpecificData.baseUrl = bodyBaseUrl;
    }
    if (cx) {
      providerSpecificData.cx = cx;
    }

    if (isOpenAICompatibleProvider(provider) || isAnthropicCompatibleProvider(provider)) {
      const node: any = await getProviderNodeById(provider);
      if (!node) {
        const typeName = isOpenAICompatibleProvider(provider)
          ? "OpenAI"
          : isClaudeCodeCompatibleProvider(provider)
            ? "CC"
            : "Anthropic";
        return NextResponse.json(
          { error: `${typeName} Compatible node not found` },
          { status: 404 }
        );
      }
      providerSpecificData = {
        ...providerSpecificData,
        baseUrl: bodyBaseUrl || node.baseUrl,
        apiType: node.apiType,
        chatPath: node.chatPath,
        modelsPath: node.modelsPath,
      };
    }

    const registryProxy = await resolveProxyForProvider(provider);
    let proxyToUse = registryProxy;

    if (!proxyToUse) {
      const providerProxy = await getProxyForLevel("provider", provider);
      const globalProxy = providerProxy ? null : await getProxyForLevel("global");
      proxyToUse = providerProxy || globalProxy || null;
    }

    const result = await runWithProxyContext(proxyToUse || null, () =>
      validateProviderApiKey({
        provider,
        apiKey,
        providerSpecificData,
      })
    );

    if (result.unsupported) {
      return NextResponse.json({ error: "Provider validation not supported" }, { status: 400 });
    }

    if (!result.valid && typeof result.statusCode === "number") {
      if (result.securityBlocked) {
        logAuditEvent({
          action: "provider.validation.ssrf_blocked",
          actor: "admin",
          target: provider,
          resourceType: "provider_validation",
          status: "blocked",
          ipAddress: auditContext.ipAddress || undefined,
          requestId: auditContext.requestId,
          metadata: {
            provider,
            route: "/api/providers/validate",
            reason: result.error || "Blocked provider validation target",
            baseUrl: sanitizeAuditUrl(bodyBaseUrl || providerSpecificData?.baseUrl),
          },
        });
      }
      return NextResponse.json(
        { error: result.error || "Validation failed" },
        { status: result.statusCode }
      );
    }

    return NextResponse.json({
      valid: !!result.valid,
      error: result.valid ? null : result.error || "Invalid API key",
      warning: result.warning || null,
      method: result.method || null,
    });
  } catch (error) {
    console.log("Error validating API key:", error);
    return NextResponse.json({ error: "Validation failed" }, { status: 500 });
  }
}
