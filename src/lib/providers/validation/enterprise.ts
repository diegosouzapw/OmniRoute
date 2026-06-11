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

import { signAwsRequest } from "@omniroute/open-sse/utils/awsSigV4.ts";

import {
  validationRead,
  toValidationErrorResult,
  applyCustomUserAgent,
  normalizeBaseUrl,
  normalizeHerokuChatUrl,
  buildBearerHeaders,
  normalizeDatabricksChatUrl,
  normalizeSnowflakeChatUrl,
  normalizeAzureOpenAIBaseUrl,
  validationWrite,
} from "./utils.ts";
import { validateDirectChatProvider } from "./specialty.ts";

export async function validateBedrockProvider({ apiKey, providerSpecificData = {} }: any) {
  if (!apiKey) {
    return { valid: false, error: "Provider and API key required" };
  }

  try {
    const discovery = await discoverBedrockNativeModels({
      apiKey,
      providerSpecificData,
      fetcher: (url, init) => validationRead(url, init),
    });
    return {
      valid: true,
      error: null,
      method: "bedrock_native_models",
      warning: discovery.warnings[0] || null,
    };
  } catch (error: any) {
    if (isBedrockNativeAuthError(error)) {
      return { valid: false, error: "Invalid API key" };
    }
    if (isBedrockNativeApiError(error)) {
      if (error.status === 429) {
        return {
          valid: true,
          error: null,
          warning: "Bedrock accepted the key but model discovery is rate limited",
          method: "bedrock_native_models",
        };
      }
      if (typeof error.status === "number" && error.status >= 500) {
        return { valid: false, error: `Provider unavailable (${error.status})` };
      }
      if (typeof error.status === "number") {
        return { valid: false, error: `Bedrock validation failed: ${error.status}` };
      }
    }
    return toValidationErrorResult(error);
  }
}

function getAwsProviderString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getAwsPollyRegion(providerSpecificData: any = {}) {
  return (
    getAwsProviderString(providerSpecificData.region) ||
    getAwsProviderString(providerSpecificData.awsRegion) ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    "us-east-1"
  );
}

function getAwsPollyBaseUrl(providerSpecificData: any = {}, region: string) {
  return (
    getAwsProviderString(providerSpecificData.baseUrl) || `https://polly.${region}.amazonaws.com`
  ).replace(/\/+$/, "");
}

export async function validateAwsPollyProvider({ apiKey, providerSpecificData = {} }: any) {
  const accessKeyId =
    getAwsProviderString(providerSpecificData.accessKeyId) ||
    getAwsProviderString(providerSpecificData.awsAccessKeyId);
  const secretAccessKey = getAwsProviderString(apiKey);

  if (!accessKeyId) {
    return { valid: false, error: "Missing AWS accessKeyId" };
  }
  if (!secretAccessKey) {
    return { valid: false, error: "Missing AWS Secret Access Key" };
  }

  const region = getAwsPollyRegion(providerSpecificData);
  const baseUrl = getAwsPollyBaseUrl(providerSpecificData, region).replace(/\/v1\/voices$/i, "");
  const url = `${baseUrl}/v1/voices?Engine=standard`;

  try {
    const signedHeaders = signAwsRequest({
      method: "GET",
      url,
      region,
      service: "polly",
      credentials: {
        accessKeyId,
        secretAccessKey,
        sessionToken:
          getAwsProviderString(providerSpecificData.sessionToken) ||
          getAwsProviderString(providerSpecificData.awsSessionToken),
      },
    });

    const response = await validationRead(url, {
      method: "GET",
      headers: applyCustomUserAgent(signedHeaders, providerSpecificData),
    });

    if (response.ok) return { valid: true, error: null };
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateHerokuProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  return validateDirectChatProvider({
    url: normalizeHerokuChatUrl(baseUrl),
    headers: buildBearerHeaders(apiKey, providerSpecificData),
    body: {
      model: providerSpecificData.validationModelId || "claude-4-sonnet",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}

export async function validateDatabricksProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  return validateDirectChatProvider({
    url: normalizeDatabricksChatUrl(baseUrl),
    headers: buildBearerHeaders(apiKey, providerSpecificData),
    body: {
      model: providerSpecificData.validationModelId || "databricks-meta-llama-3-3-70b-instruct",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}

export async function validateDataRobotProvider({ apiKey, providerSpecificData = {} }: any) {
  const configuredBaseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) || DATAROBOT_DEFAULT_BASE_URL;

  if (isDataRobotDeploymentUrl(configuredBaseUrl)) {
    return validateDirectChatProvider({
      url: buildDataRobotChatUrl(configuredBaseUrl),
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: {
        model: providerSpecificData.validationModelId || "datarobot-deployed-llm",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      },
      providerSpecificData,
    });
  }

  const catalogUrl = buildDataRobotCatalogUrl(configuredBaseUrl);
  if (!catalogUrl) {
    return { valid: false, error: "Invalid DataRobot base URL" };
  }

  try {
    const response = await validationRead(catalogUrl, {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });

    if (response.ok) {
      return { valid: true, error: null, method: "gateway_catalog" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "gateway_catalog",
        warning: "Rate limited, but credentials are valid",
      };
    }

    if (response.status >= 400 && response.status < 500) {
      return { valid: true, error: null, method: "gateway_catalog" };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateSnowflakeProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const usesProgrammaticAccessToken = typeof apiKey === "string" && apiKey.startsWith("pat/");
  return validateDirectChatProvider({
    url: normalizeSnowflakeChatUrl(baseUrl),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usesProgrammaticAccessToken ? apiKey.slice(4) : apiKey}`,
      "X-Snowflake-Authorization-Token-Type": usesProgrammaticAccessToken
        ? "PROGRAMMATIC_ACCESS_TOKEN"
        : "KEYPAIR_JWT",
    },
    body: {
      model: providerSpecificData.validationModelId || "llama3.3-70b",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}

export async function validateAzureOpenAIProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!rawBaseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const baseUrl = normalizeAzureOpenAIBaseUrl(rawBaseUrl);
  const apiVersion =
    typeof providerSpecificData.validationApiVersion === "string" &&
    providerSpecificData.validationApiVersion.trim()
      ? providerSpecificData.validationApiVersion.trim()
      : "2024-12-01-preview";
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    providerSpecificData
  );
  const encodedVersion = encodeURIComponent(apiVersion);

  for (const probeUrl of [
    `${baseUrl}/openai/deployments?api-version=${encodedVersion}`,
    `${baseUrl}/openai/models?api-version=${encodedVersion}`,
  ]) {
    try {
      const response = await validationRead(probeUrl, { method: "GET", headers });
      if (response.ok) {
        return { valid: true, error: null, method: "azure_probe" };
      }
      if (response.status === 401 || response.status === 403) {
        return { valid: false, error: "Invalid API key" };
      }
      if (response.status === 400 || response.status === 404 || response.status === 405) {
        continue;
      }
      if (response.status === 429) {
        return {
          valid: true,
          error: null,
          method: "azure_probe",
          warning: "Rate limited, but credentials are valid",
        };
      }
      if (response.status >= 500) {
        return { valid: false, error: `Provider unavailable (${response.status})` };
      }
    } catch (error) {
      return toValidationErrorResult(error);
    }
  }

  const deploymentId =
    typeof providerSpecificData.validationModelId === "string"
      ? providerSpecificData.validationModelId.trim()
      : "";

  if (!deploymentId) {
    return {
      valid: true,
      error: null,
      warning:
        "Azure key accepted, but no deployment name was provided for a chat probe. Set Model ID to validate a specific deployment.",
    };
  }

  const chatUrl = `${baseUrl}/openai/deployments/${encodeURIComponent(deploymentId)}/chat/completions?api-version=${encodedVersion}`;
  const response = await validationWrite(chatUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: deploymentId,
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    }),
  });

  if (
    response.ok ||
    response.status === 400 ||
    response.status === 422 ||
    response.status === 429
  ) {
    return { valid: true, error: null, method: "chat_probe" };
  }
  if (response.status === 401 || response.status === 403) {
    return { valid: false, error: "Invalid API key" };
  }
  if (response.status === 404) {
    return {
      valid: true,
      error: null,
      method: "chat_probe",
      warning: "Azure credentials are valid, but the requested deployment was not found.",
    };
  }
  if (response.status >= 500) {
    return { valid: false, error: `Provider unavailable (${response.status})` };
  }
  return { valid: false, error: `Validation failed: ${response.status}` };
}

export async function validateAzureAiProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || AZURE_AI_DEFAULT_BASE_URL;
  const modelsUrl = buildAzureAiModelsUrl(rawBaseUrl);
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    providerSpecificData
  );

  try {
    const response = await validationRead(modelsUrl, {
      method: "GET",
      headers,
    });

    if (response.ok) {
      return { valid: true, error: null, method: "azure_ai_models" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "azure_ai_models",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // Fall through to chat probe when /models is unavailable.
  }

  const validationModelId =
    typeof providerSpecificData.validationModelId === "string"
      ? providerSpecificData.validationModelId.trim()
      : "";

  if (!validationModelId) {
    return {
      valid: false,
      error: "Endpoint /models unavailable. Provide a Model ID to validate via /chat/completions.",
    };
  }

  const chatUrl = buildAzureAiChatUrl(
    rawBaseUrl,
    providerSpecificData.apiType === "responses" ? "responses" : "chat"
  );
  const chatBody =
    providerSpecificData.apiType === "responses"
      ? {
          model: validationModelId,
          input: "test",
          max_output_tokens: 1,
        }
      : {
          model: validationModelId,
          messages: [{ role: "user", content: "test" }],
          max_tokens: 1,
        };

  try {
    const response = await validationWrite(chatUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(chatBody),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 404 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return { valid: true, error: null, method: "azure_ai_chat_probe" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing Azure AI Foundry" };
}

export async function validateWatsonxProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || WATSONX_DEFAULT_BASE_URL;
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    providerSpecificData
  );

  try {
    const response = await validationRead(buildWatsonxModelsUrl(rawBaseUrl), {
      method: "GET",
      headers,
    });

    if (response.ok) {
      return { valid: true, error: null, method: "watsonx_models" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "watsonx_models",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // Fall through to chat probe when /models is unavailable.
  }

  const validationModelId =
    typeof providerSpecificData.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : "ibm/granite-3-3-8b-instruct";

  try {
    const response = await validationWrite(buildWatsonxChatUrl(rawBaseUrl), {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: validationModelId,
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 404 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return {
        valid: true,
        error: null,
        method: "watsonx_chat_probe",
        ...(response.status === 404
          ? { warning: "watsonx credentials are valid, but the requested model is not enabled." }
          : {}),
      };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing watsonx.ai" };
}

export async function validateOciProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || OCI_DEFAULT_BASE_URL;
  const projectId =
    typeof providerSpecificData.projectId === "string" && providerSpecificData.projectId.trim()
      ? providerSpecificData.projectId.trim()
      : typeof providerSpecificData.project === "string" && providerSpecificData.project.trim()
        ? providerSpecificData.project.trim()
        : "";
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(projectId ? { "OpenAI-Project": projectId } : {}),
    },
    providerSpecificData
  );

  try {
    const response = await validationRead(buildOciModelsUrl(rawBaseUrl), {
      method: "GET",
      headers,
    });

    if (response.ok) {
      return { valid: true, error: null, method: "oci_models" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "oci_models",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // Fall through to chat/responses probe when /models is unavailable.
  }

  const validationModelId =
    typeof providerSpecificData.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : "openai.gpt-oss-20b";
  const apiType = providerSpecificData.apiType === "responses" ? "responses" : "chat";
  const body =
    apiType === "responses"
      ? {
          model: validationModelId,
          input: "test",
          max_output_tokens: 1,
        }
      : {
          model: validationModelId,
          messages: [{ role: "user", content: "test" }],
          max_tokens: 1,
        };

  try {
    const response = await validationWrite(buildOciChatUrl(rawBaseUrl, apiType), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 404 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return {
        valid: true,
        error: null,
        method: apiType === "responses" ? "oci_responses_probe" : "oci_chat_probe",
        ...(response.status === 404
          ? { warning: "OCI credentials are valid, but the requested model was not found." }
          : {}),
      };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing OCI Generative AI" };
}

export async function validateSapProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || SAP_DEFAULT_BASE_URL;
  const resourceGroup = getSapResourceGroup(providerSpecificData);
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "AI-Resource-Group": resourceGroup,
    },
    providerSpecificData
  );

  try {
    const response = await validationRead(buildSapModelsUrl(rawBaseUrl), {
      method: "GET",
      headers,
    });

    if (response.ok) {
      return { valid: true, error: null, method: "sap_models" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "sap_models",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // Fall through to deployment probe when the discovery API is unavailable.
  }

  const canProbeChat =
    isSapDeploymentUrl(rawBaseUrl) || /\/chat\/completions$/i.test(normalizeBaseUrl(rawBaseUrl));
  if (!canProbeChat) {
    return {
      valid: false,
      error:
        "SAP validation needs either a reachable AI_API_URL or a deployment URL in providerSpecificData.baseUrl",
    };
  }

  const validationModelId =
    typeof providerSpecificData.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : "gpt-4o";

  try {
    const response = await validationWrite(buildSapChatUrl(rawBaseUrl), {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: validationModelId,
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 404 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return {
        valid: true,
        error: null,
        method: "sap_chat_probe",
        ...(response.status === 404
          ? { warning: "SAP credentials are valid, but the deployment URL or model was not found." }
          : {}),
      };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing SAP Generative AI Hub" };
}
