// Inline specialty provider validators that previously lived as closures inside the
// SPECIALTY_VALIDATORS map in validation.ts. Extracted (god-file decomposition) as top-level
// functions taking `isLocal` where the original closure captured it; behavior is byte-identical
// to the original inline defs. The host dispatcher still owns the SPECIALTY_VALIDATORS map
// construction + dispatch — these are just the leaf validator bodies.
import { validateQoderCliPat } from "@omniroute/open-sse/services/qoderCli.ts";
import { KiroService } from "@/lib/oauth/services/kiro";
import { resolveNvidiaValidationModel } from "@/lib/providers/nvidiaValidationModel";
import { normalizeBaseUrl } from "./urlHelpers";
import { buildBearerHeaders, directHttpsRequest } from "./headers";
import { toValidationErrorResult, validationRead, validationWrite } from "./transport";
import { validateKiroApiKeyRuntimeProbe } from "./kiro";

export async function validateV0VercelProvider({ apiKey, providerSpecificData, isLocal }: any) {
  try {
    const configuredBaseUrl =
      typeof providerSpecificData?.baseUrl === "string" && providerSpecificData.baseUrl.trim()
        ? providerSpecificData.baseUrl.trim()
        : "https://api.v0.dev";

    const root = normalizeBaseUrl(configuredBaseUrl)
      .replace(/\/v1\/chat\/completions$/, "")
      .replace(/\/v1$/, "");

    const res = await validationRead(
      `${root}/v1/chats?limit=1`,
      {
        method: "GET",
        headers: buildBearerHeaders(apiKey, providerSpecificData),
      },
      isLocal
    );

    if (res.ok) {
      return { valid: true, error: null, method: "v0_platform_chats_list" };
    }

    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    return { valid: false, error: `v0 validation failed: ${res.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// auggie is a fully local, credential-less CLI passthrough — there is no API
// key to check upstream. The only meaningful validation is confirming the
// `auggie` binary is installed and runnable on this machine.
export async function validateAuggieProvider() {
  const { checkAuggieCliVersion } = await import("@omniroute/open-sse/executors/auggie.ts");
  const result = await checkAuggieCliVersion();
  if (!result.ok) {
    return {
      valid: false,
      error: result.error || "Auggie CLI not found. Install it and run `auggie login`.",
      unsupported: false,
    };
  }
  return { valid: true, error: null, unsupported: false, method: result.version };
}

export async function validateQoderProvider({ apiKey, providerSpecificData }: any) {
  // Bifurcate validation: PAT tokens use Cosy auth against api1.qoder.sh;
  // regular API keys validate against dashscope (OpenAI-compatible endpoint).
  const key = (apiKey || "").trim();
  if (key.startsWith("pt-")) {
    return validateQoderCliPat({ apiKey: key, providerSpecificData });
  }
  // Non-PAT token → validate against dashscope (Alibaba Cloud).
  // The executor routes these tokens to dashscope.aliyuncs.com, so the
  // validation must test against dashscope, NOT the Cosy PAT endpoint.
  try {
    const dashscopeUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1/models";
    const res = await validationRead(
      dashscopeUrl,
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
      false
    );
    if (res.ok) return { valid: true, error: null };
    if (res.status === 401 || res.status === 403) {
      return {
        valid: false,
        error:
          "Invalid Qoder API key. Make sure you're using a valid API key from Qoder / Alibaba Cloud Dashscope.",
      };
    }
    // 4xx/5xx other than auth — treat as valid bypass to prevent false
    // negatives from transient dashscope issues (consistent with PAT path).
    return { valid: true, error: null };
  } catch (err: unknown) {
    return toValidationErrorResult(err);
  }
}

export async function validateKiroProvider({ apiKey, providerSpecificData }: any) {
  try {
    const region = providerSpecificData?.region || "us-east-1";
    const credential = await new KiroService().validateApiKey(apiKey, region);
    if (!credential.profileArn) {
      return await validateKiroApiKeyRuntimeProbe({
        apiKey: credential.accessToken,
        region: credential.region,
        profileArn: providerSpecificData?.profileArn,
      });
    }
    return {
      valid: true,
      error: null,
      method: "kiro_list_available_profiles",
    };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateGitlabProvider({ apiKey, providerSpecificData, isLocal }: any) {
  try {
    const configuredBaseUrl =
      typeof providerSpecificData?.baseUrl === "string" ? providerSpecificData.baseUrl.trim() : "";
    const root = (configuredBaseUrl || "https://gitlab.com").replace(/\/$/, "");
    const res = await validationWrite(
      `${root}/api/v4/code_suggestions/direct_access`,
      {
        method: "POST",
        headers: buildBearerHeaders(apiKey, providerSpecificData),
        body: "{}",
      },
      isLocal
    );
    if (res.status === 401) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateVertexProvider({ apiKey }: any) {
  try {
    const { parseSAFromApiKey, getAccessToken, isExpressApiKey } =
      await import("@omniroute/open-sse/executors/vertex.ts");
    // Express-mode API keys are opaque strings sent directly as the ?key= query param — there is
    // no JWT to mint, so accept any non-empty Express key (the live chat/media call validates it).
    if (isExpressApiKey(apiKey)) {
      return { valid: true, error: null };
    }
    const sa = parseSAFromApiKey(apiKey);
    // Validates credentials by successfully successfully exchanging them for a JWT from Google Identity
    await getAccessToken(sa);
    return { valid: true, error: null };
  } catch (error: any) {
    return { valid: false, error: "Invalid Service Account JSON: " + error.message };
  }
}

export async function validateVertexPartnerProvider({ apiKey }: any) {
  try {
    const { parseSAFromApiKey, getAccessToken, isExpressApiKey } =
      await import("@omniroute/open-sse/executors/vertex.ts");
    if (isExpressApiKey(apiKey)) {
      return { valid: true, error: null };
    }
    const sa = parseSAFromApiKey(apiKey);
    await getAccessToken(sa);
    return { valid: true, error: null };
  } catch (error: any) {
    return { valid: false, error: "Invalid Service Account JSON: " + error.message };
  }
}

// LongCat AI — does not expose /v1/models; validate via chat completions directly (#592)
export async function validateLongcatProvider({ apiKey, providerSpecificData, isLocal }: any) {
  try {
    const res = await validationWrite(
      "https://api.longcat.chat/openai/v1/chat/completions",
      {
        method: "POST",
        headers: buildBearerHeaders(apiKey, providerSpecificData),
        body: JSON.stringify({
          model: "LongCat-2.0",
          messages: [{ role: "user", content: "test" }],
          max_tokens: 1,
        }),
      },
      isLocal
    );
    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    // Any non-auth response (200, 400, 422) means auth passed
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// NVIDIA NIM (#2463) — bypass the /models probe in favor of a direct
// chat/completions probe. NVIDIA NIM's /models endpoint returns model
// catalogs that vary by region and key-tier, and some keys 404 on it,
// which the generic flow misreads. The chat probe is also a stronger
// sanity check for streaming/key correctness.
export async function validateNvidiaProvider({ apiKey, providerSpecificData }: any) {
  try {
    const baseUrlRaw =
      providerSpecificData?.baseUrl || "https://integrate.api.nvidia.com/v1/chat/completions";
    const normalized = normalizeBaseUrl(baseUrlRaw);
    const chatBase = normalized.replace(/\/models$/, "");
    const chatUrl = normalized.endsWith("/chat/completions")
      ? normalized
      : `${chatBase}/chat/completions`;
    // #3116: probe a universally-available model rather than models[0]
    // (z-ai/glm-5.1), which requires the "Public API Endpoints" account permission
    // and can hang/be DEGRADED — making a *valid* key fail with "Upstream Error".
    const modelId = resolveNvidiaValidationModel(providerSpecificData);
    // #3226: use raw https (bypass the proxy/TLS-patched fetch) — the undici
    // dispatcher stalls against NVIDIA's endpoint, causing a 504 timeout.
    const res = await directHttpsRequest(
      chatUrl,
      {
        method: "POST",
        headers: buildBearerHeaders(apiKey, providerSpecificData),
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: "user", content: "test" }],
          max_tokens: 1,
        }),
      },
      20000
    );
    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    // Any non-auth response (200, 400, 422, 429) means auth passed
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// Z.AI (glm) — bypass the proxy/TLS-patched fetch for the same reason as nvidia
// above (#3905): the undici dispatcher stalls against api.z.ai after the provider
// returns 502 "job timed out" responses, because z.ai silently drops idle
// keep-alive sockets without sending TCP RST. Using directHttpsRequest (native
// Node.js HTTPS, no undici pool) avoids the zombie-socket hang on validation.
// Z.AI uses the Anthropic wire format with x-api-key auth, not Bearer.
export async function validateZaiProvider({ apiKey, providerSpecificData }: any) {
  try {
    // providerSpecificData.baseUrl allows test overrides to point at a local
    // HTTP server; production always uses the fixed api.z.ai endpoint.
    const messagesUrl = providerSpecificData?.baseUrl
      ? `${normalizeBaseUrl(providerSpecificData.baseUrl).split("?")[0]}?beta=true`
      : "https://api.z.ai/api/anthropic/v1/messages?beta=true";
    const res = await directHttpsRequest(
      messagesUrl,
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "glm-5.1",
          messages: [{ role: "user", content: "test" }],
          max_tokens: 1,
        }),
      },
      20000
    );
    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    if (res.status === 404 || res.status === 405) {
      return { valid: false, error: "Provider validation endpoint not supported" };
    }
    if (res.status >= 500 && res.status !== 502) {
      return { valid: false, error: `Provider unavailable (${res.status})` };
    }
    // Any non-auth response (200, 400, 422, 429, 502) means auth passed;
    // 502 "job timed out" is z.ai's own server-side queue limit, not an auth error.
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// Xiaomi MiMo — Token Plan keys (tp-*) only work on regional endpoints
// (e.g. token-plan-sgp, token-plan-ams), not api.xiaomimimo.com.
// /v1/models works but validate via chat/completions for stronger auth check.
export async function validateXiaomiMimoProvider({ apiKey, providerSpecificData, isLocal }: any) {
  try {
    const baseUrl = normalizeBaseUrl(
      providerSpecificData?.baseUrl || "https://api.xiaomimimo.com/v1"
    );
    const chatUrl = `${baseUrl.replace(/\/chat\/completions$/, "")}/chat/completions`;
    const res = await validationWrite(
      chatUrl,
      {
        method: "POST",
        headers: buildBearerHeaders(apiKey, providerSpecificData),
        body: JSON.stringify({
          model: "mimo-v2.5-pro",
          messages: [{ role: "user", content: "test" }],
          max_tokens: 1,
        }),
      },
      isLocal
    );
    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    // Any non-auth response (200, 400, 422, 429) means auth passed
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

/**
 * Build Opengateway-style validators (xiaomi-mimo compatible).
 * These providers share a POST /chat/completions auth check pattern and differ
 * only in default baseUrl and test model name.
 */
export function buildOpengatewayValidator(defaultBaseUrl: string, model: string) {
  return async ({ apiKey, providerSpecificData, isLocal }: any) => {
    try {
      const baseUrl = normalizeBaseUrl(providerSpecificData?.baseUrl || defaultBaseUrl);
      const chatUrl = `${baseUrl.replace(/\/chat\/completions$/, "")}/chat/completions`;
      const res = await validationWrite(
        chatUrl,
        {
          method: "POST",
          headers: buildBearerHeaders(apiKey, providerSpecificData),
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: "test" }],
            max_tokens: 1,
          }),
        },
        isLocal
      );
      if (res.status === 401 || res.status === 403) {
        return { valid: false, error: "Invalid API key" };
      }
      // Any non-auth response (200, 400, 422, 429) means auth passed
      return { valid: true, error: null };
    } catch (error: any) {
      return toValidationErrorResult(error);
    }
  };
}

// Same as buildOpengatewayValidator but returns an object spreadable into SPECIALTY_VALIDATORS.
// isLocal is captured via closure from the outer function scope.
export function buildGitlawbValidators(
  configs: [string, string, string][],
  isLocal: boolean
): Record<string, ReturnType<typeof buildOpengatewayValidator>> {
  return Object.fromEntries(
    configs.map(([id, baseUrl, model]) => [
      id,
      (({ apiKey, providerSpecificData }: any) =>
        buildOpengatewayValidator(
          baseUrl,
          model
        )({ apiKey, providerSpecificData, isLocal })) as ReturnType<
        typeof buildOpengatewayValidator
      >,
    ])
  );
}
