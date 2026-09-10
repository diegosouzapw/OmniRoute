// Web-cookie session-ping validator + Bytez auth-only probe. Extracted from validation.ts
// (god-file decomposition) — top-level functions with no dispatcher-state captures; behavior is
// byte-identical to the original inline defs.
import { WEB_COOKIE_PROVIDERS, isLocalProvider } from "@/shared/constants/providers";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { extractZaiToken } from "@omniroute/open-sse/executors/zai-web.ts";
import { normalizeBaseUrl } from "./urlHelpers";
import { STANDARD_USER_AGENT, buildBearerHeaders } from "./headers";
import { validateChatGptWebProvider } from "./chatgptWeb";
import {
  validationRead,
  toValidationErrorResult,
  toWebCookieValidationErrorResult,
  WEB_COOKIE_PROVIDERS_WITHOUT_AUTH_PROBE,
  WEB_COOKIE_PROVIDERS_WITHOUT_MODELS_API,
} from "./transport";

const UNSUPPORTED = { valid: false, error: "Provider validation not supported", unsupported: true };

/**
 * Decide whether `provider` can be probed at all, and with what URL/headers.
 *
 * Every rejection here is a refusal to guess: a provider with no real API host, a
 * non-http(s) baseUrl, or a missing credential cannot produce a trustworthy
 * signal, and reporting "unsupported" beats reporting a false `valid: true`.
 * Split out of validateWebCookieProvider so the probe itself stays readable.
 */
function resolveWebCookieProbe(
  provider: string,
  cookie: string
):
  | { rejection: { valid: boolean; error: string; unsupported: boolean } }
  | { testUrl: string; headers: Record<string, string> } {
  const entry = getRegistryEntry(provider);
  const cookieProvider = WEB_COOKIE_PROVIDERS[provider as keyof typeof WEB_COOKIE_PROVIDERS];
  if (!entry && !cookieProvider) {
    return {
      rejection: { valid: false, error: "Provider not found in registry", unsupported: true },
    };
  }
  if (!cookie) {
    return {
      rejection: {
        valid: false,
        error: "Cookie required for web-cookie provider",
        unsupported: false,
      },
    };
  }

  // Providers listed in WEB_COOKIE_PROVIDERS without a providerRegistry entry (e.g.
  // poe-web, venice-web, v0-vercel-web) only expose a marketing website URL, not a
  // real API host. Probing `${website}/models` does not reliably signal session
  // validity for these — live verification showed most return redirects or SPA 200s
  // regardless of cookie validity, which would silently report an expired/garbage
  // cookie as "OK" (worse than an honest "not supported"). The same refusal covers
  // providers whose registry entry exists only for the model catalog and whose
  // baseUrl is a browser console rather than an API host (#12107, gemini-business).
  if (!entry || WEB_COOKIE_PROVIDERS_WITHOUT_AUTH_PROBE.has(provider)) {
    return { rejection: UNSUPPORTED };
  }

  // Defense-in-depth: only an http(s) baseUrl without a query string is safe to probe
  // by blindly appending `/models`. A ws(s):// baseUrl (e.g. copilot-web) is already
  // rejected by the outbound URL guard downstream, but reject it explicitly here for
  // the honest "unsupported" result instead of a confusing security-block message —
  // this also covers a future http(s) baseUrl carrying a query string, which the guard
  // does not currently block (#7857 acceptance criteria).
  const baseUrl = normalizeBaseUrl(entry.baseUrl || "");
  if (!/^https?:\/\//i.test(baseUrl) || baseUrl.includes("?")) {
    return { rejection: UNSUPPORTED };
  }

  // zai-web is the one web-cookie provider whose session is a localStorage Bearer JWT
  // rather than a cookie: chat.z.ai serves its catalog at /api/models and authenticates
  // with `Authorization: Bearer`, so probing `${baseUrl}/models` with a Cookie header
  // reports a live session as dead.
  if (provider !== "zai-web") {
    return {
      testUrl: `${baseUrl}/models`,
      headers: { "User-Agent": STANDARD_USER_AGENT, Cookie: cookie },
    };
  }

  const zaiToken = extractZaiToken(cookie);
  if (!zaiToken) {
    return {
      rejection: {
        valid: false,
        error: "Z.ai web-session credential required",
        unsupported: false,
      },
    };
  }
  return {
    testUrl: `${baseUrl}/api/models`,
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-US",
      Authorization: `Bearer ${zaiToken}`,
      "User-Agent": STANDARD_USER_AGENT,
    },
  };
}

/**
 * Validates web-cookie providers by performing a ping request to check if the session is still valid.
 * Returns SESSION_EXPIRED error code if the upstream returns 401/403.
 */
export async function validateWebCookieProvider({
  provider,
  apiKey,
  providerSpecificData: _providerSpecificData = {},
}: {
  provider: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}) {
  if (provider === "chatgpt-web") return validateChatGptWebProvider({ apiKey });
  try {
    // For web-cookie providers, apiKey contains the cookie string
    const probe = resolveWebCookieProbe(provider, (apiKey || "").trim());
    if ("rejection" in probe) return probe.rejection;

    const res = await validationRead(
      probe.testUrl,
      { method: "GET", headers: probe.headers },
      isLocalProvider(provider)
    );

    if (res.status === 401 || res.status === 403) {
      return {
        valid: false,
        error: "SESSION_EXPIRED",
        errorCode: "AUTH_007",
        unsupported: false,
      };
    }

    // #7857: for providers whose baseUrl is a conversation/completion endpoint rather
    // than a real API root, the /models path never existed upstream — a redirect,
    // login-HTML 200, 404, 405, or 429 from it is not a meaningful auth signal and is
    // indistinguishable from a genuinely valid session. Report the same honest
    // "unsupported" result the !entry branch above already gives its no-registry
    // siblings, instead of a false `valid: true`.
    if (WEB_COOKIE_PROVIDERS_WITHOUT_MODELS_API.has(provider)) {
      return {
        valid: false,
        error: "Provider validation not supported",
        unsupported: true,
      };
    }

    // Any other response (200, 404, 405, 429, ...) means the cookie was accepted —
    // a 401/403 from the /models probe is the only definitive "session expired" signal
    // for web-cookie auth, so a non-auth status is treated as a valid session.
    return { valid: true, error: null, unsupported: false };
  } catch (error: unknown) {
    return toWebCookieValidationErrorResult(provider, error);
  }
}

// #5422: Bytez key validation cannot use a chat probe. A Bytez account only serves models
// that have been added to its catalog, so even Bytez's own documented model ids return 404
// ("Model does not exist or has yet to be added to the Bytez catalog") for a fresh/free key —
// the generic OpenAI-like chat probe misreads that 404 as "endpoint not supported". Validate
// against the model-independent, auth-only tasks endpoint instead (verified live):
//   GET …/models/v2/list/tasks → 200 (valid key) | 401 { error: "Unauthorized" } (invalid).
// The pure status→result mapping is factored out so it is unit-testable without network.
export function bytezValidationResultFromStatus(status: number): {
  valid: boolean;
  error: string | null;
} {
  if (status === 200) {
    return { valid: true, error: null };
  }
  if (status === 401 || status === 403) {
    return { valid: false, error: "Invalid API key" };
  }
  return { valid: false, error: `Validation failed: ${status}` };
}

export async function validateBytezProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const res = await validationRead("https://api.bytez.com/models/v2/list/tasks", {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });
    return bytezValidationResultFromStatus(res.status);
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}
