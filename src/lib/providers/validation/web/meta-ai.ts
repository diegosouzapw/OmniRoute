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
// See open-sse/executors/muse-spark-web.ts for the rationale: Meta migrated
// from the "Abra" mutation (doc_id 078dfdff…, type RewriteOptionsInput now
// missing from schema) to the "Ecto" subscription. POST graphql still
// streams the response; only the persisted-query identifier and operation
// shape changed.
const META_AI_SEND_MESSAGE_DOC_ID = "29ae946c82d1f301196c6ca2226400b5";

const META_AI_FRIENDLY_NAME = "useEctoSendMessageSubscription";

const META_AI_REQUEST_ANALYTICS_TAGS = "graphservice";

const META_AI_ASBD_ID = "129477";

const META_AI_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";

const META_AI_BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function encodeMetaAiBase62(value: bigint, padLength: number): string {
  let remaining = value;
  let encoded = "";

  while (remaining > 0n) {
    encoded = META_AI_BASE62_ALPHABET[Number(remaining % 62n)] + encoded;
    remaining /= 62n;
  }

  return encoded.padStart(padLength, "0");
}

function decodeMetaAiBase62(value: string): bigint {
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

function randomMetaAiBigInt(byteLength: number): bigint {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  let result = 0n;
  for (const byte of bytes) {
    result = (result << 8n) | BigInt(byte);
  }
  return result;
}

function generateMetaAiConversationId(): string {
  const timestamp = BigInt(Date.now()) & ((1n << 44n) - 1n);
  const random = randomMetaAiBigInt(8) & ((1n << 64n) - 1n);
  return `c.${encodeMetaAiBase62((timestamp << 64n) | random, 19)}`;
}

function generateMetaAiEventId(conversationId: string): string | null {
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

function generateMetaAiNumericMessageId(): string {
  return (
    BigInt(Date.now()) * 1000n +
    BigInt(Math.floor(Math.random() * 1000)) +
    (randomMetaAiBigInt(2) & 0xfffn)
  ).toString();
}

function buildMetaAiValidationBody() {
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
export async function validateMuseSparkWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const cookieHeader = normalizeSessionCookieHeader(apiKey, "ecto_1_sess");
    const response = await validationWrite("https://www.meta.ai/api/graphql", {
      method: "POST",
      headers: applyCustomUserAgent(
        {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          "Accept-Language": "en-US,en;q=0.9",
          Cookie: cookieHeader,
          Origin: "https://www.meta.ai",
          Referer: "https://www.meta.ai/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent": META_AI_USER_AGENT,
          "X-ASBD-ID": META_AI_ASBD_ID,
          "X-FB-Friendly-Name": META_AI_FRIENDLY_NAME,
          "X-FB-Request-Analytics-Tags": META_AI_REQUEST_ANALYTICS_TAGS,
        },
        providerSpecificData
      ),
      body: JSON.stringify(buildMetaAiValidationBody()),
    });

    const responseText = await response.text();
    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: "Invalid Meta AI session cookie — re-paste abra_sess from meta.ai",
      };
    }

    if (/authentication required to send messages|login is required|sign in/i.test(responseText)) {
      return {
        valid: false,
        error: "Invalid Meta AI session cookie — re-paste abra_sess from meta.ai",
      };
    }

    if (
      response.status === 429 ||
      /limit exceeded|rate limit|too many requests/i.test(responseText)
    ) {
      return { valid: true, error: null };
    }

    if (response.ok) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Meta AI unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
