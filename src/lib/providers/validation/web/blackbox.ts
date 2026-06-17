import crypto from "node:crypto";

import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";

import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";

import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";

import { selectProxyForValidation } from "@omniroute/open-sse/services/proxyAutoSelector.ts";

import {
  buildClaudeCodeCompatibleHeaders,
  buildClaudeCodeCompatibleValidationPayload,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  joinClaudeCodeCompatibleUrl,
  joinBaseUrlAndPath,
  stripClaudeCodeCompatibleEndpointSuffix,
  stripAnthropicMessagesSuffix,
} from "@omniroute/open-sse/services/claudeCodeCompatible.ts";

import {
  buildGrokCookieHeader,
  extractCookieValue,
  normalizeSessionCookieHeader,
} from "@/lib/providers/webCookieAuth";

import { buildJulesApiUrl } from "@/lib/cloudAgent/julesApi.ts";

import { getGigachatAccessToken } from "@omniroute/open-sse/services/gigachatAuth.ts";

import { validateQoderCliPat } from "@omniroute/open-sse/services/qoderCli.ts";

import {
  AZURE_AI_DEFAULT_BASE_URL,
  buildAzureAiChatUrl,
  buildAzureAiModelsUrl,
} from "@omniroute/open-sse/config/azureAi.ts";

import {
  discoverBedrockNativeModels,
  isBedrockNativeApiError,
  isBedrockNativeAuthError,
} from "@omniroute/open-sse/services/bedrock.ts";

import {
  DATAROBOT_DEFAULT_BASE_URL,
  buildDataRobotCatalogUrl,
  buildDataRobotChatUrl,
  isDataRobotDeploymentUrl,
} from "@omniroute/open-sse/config/datarobot.ts";

import {
  OCI_DEFAULT_BASE_URL,
  buildOciChatUrl,
  buildOciModelsUrl,
} from "@omniroute/open-sse/config/oci.ts";

import {
  SAP_DEFAULT_BASE_URL,
  buildSapChatUrl,
  buildSapModelsUrl,
  getSapResourceGroup,
  isSapDeploymentUrl,
} from "@omniroute/open-sse/config/sap.ts";

import {
  WATSONX_DEFAULT_BASE_URL,
  buildWatsonxChatUrl,
  buildWatsonxModelsUrl,
} from "@omniroute/open-sse/config/watsonx.ts";

import {
  buildRunwayApiUrl,
  buildRunwayHeaders,
  normalizeRunwayBaseUrl,
} from "@omniroute/open-sse/config/runway.ts";

import {
  buildMaritalkChatUrl,
  buildMaritalkModelsUrl,
} from "@omniroute/open-sse/config/maritalk.ts";

import { signAwsRequest } from "@omniroute/open-sse/utils/awsSigV4.ts";

import {
  toValidationErrorResult,
  applyCustomUserAgent,
  validationRead,
  validationWrite,
} from "../utils.ts";
export async function validateBlackboxWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const cookieHeader = normalizeSessionCookieHeader(apiKey, "next-auth.session-token");
    const sessionHeaders = applyCustomUserAgent(
      {
        Accept: "application/json",
        Cookie: cookieHeader,
        Origin: "https://app.blackbox.ai",
        Referer: "https://app.blackbox.ai/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/147.0.0.0",
      },
      providerSpecificData
    );

    const sessionResponse = await validationRead("https://app.blackbox.ai/api/auth/session", {
      method: "GET",
      headers: sessionHeaders,
    });

    const sessionText = await sessionResponse.text();
    const sessionPayload = sessionText ? JSON.parse(sessionText) : null;
    const userEmail = sessionPayload?.user?.email;

    if (!sessionResponse.ok || !userEmail) {
      return {
        valid: false,
        error:
          "Invalid Blackbox session cookie — re-paste __Secure-authjs.session-token from app.blackbox.ai",
      };
    }

    const subscriptionHeaders = applyCustomUserAgent(
      {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cookieHeader,
        Origin: "https://app.blackbox.ai",
        Referer: "https://app.blackbox.ai/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/147.0.0.0",
      },
      providerSpecificData
    );

    const subscriptionResponse = await validationWrite(
      "https://app.blackbox.ai/api/check-subscription",
      {
        method: "POST",
        headers: subscriptionHeaders,
        body: JSON.stringify({ email: userEmail }),
      }
    );

    const subscriptionText = await subscriptionResponse.text();
    const subscriptionPayload = subscriptionText ? JSON.parse(subscriptionText) : null;
    const explicitActive =
      subscriptionPayload?.hasActiveSubscription === true ||
      subscriptionPayload?.isTrialSubscription === true ||
      subscriptionPayload?.status === "PREMIUM";
    const explicitInactive =
      subscriptionPayload?.hasActiveSubscription === false ||
      subscriptionPayload?.status === "FREE";
    const requiresAuthentication =
      subscriptionPayload?.requiresAuthentication === true ||
      /login is required/i.test(subscriptionText || "");

    if (subscriptionResponse.status === 401 || subscriptionResponse.status === 403) {
      return {
        valid: false,
        error:
          "Invalid Blackbox session cookie — re-paste __Secure-authjs.session-token from app.blackbox.ai",
      };
    }

    if (requiresAuthentication) {
      return {
        valid: false,
        error:
          "Blackbox session expired — re-paste __Secure-authjs.session-token from app.blackbox.ai",
      };
    }

    if (subscriptionResponse.ok && explicitActive) {
      return { valid: true, error: null };
    }

    if (
      (subscriptionResponse.ok && explicitInactive) ||
      subscriptionPayload?.previouslySubscribed
    ) {
      return {
        valid: false,
        error:
          "Blackbox account authenticated, but no active paid subscription was detected for premium web models.",
      };
    }

    if (subscriptionResponse.ok) {
      return { valid: true, error: null };
    }

    if (subscriptionResponse.status >= 500) {
      return { valid: false, error: `Blackbox unavailable (${subscriptionResponse.status})` };
    }

    return { valid: false, error: `Validation failed: ${subscriptionResponse.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
