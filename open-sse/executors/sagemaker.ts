import { randomUUID } from "node:crypto";
import {
  BaseExecutor,
  applyConfiguredUserAgent,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { HTTP_STATUS, PROVIDERS } from "../config/constants.ts";
import { parseAwsCredentialInput, signAwsRequest } from "../services/awsSigV4.ts";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function normalizeBaseUrl(baseUrl: string | null | undefined): string {
  return typeof baseUrl === "string" ? baseUrl.trim().replace(/\/+$/, "") : "";
}

export function getSagemakerBaseUrl(
  providerSpecificData: JsonRecord | null | undefined,
  region: string
): string {
  return (
    toNonEmptyString(providerSpecificData?.baseUrl) ||
    toNonEmptyString(providerSpecificData?.endpoint) ||
    `https://runtime.sagemaker.${region}.amazonaws.com/endpoints`
  );
}

export function resolveSagemakerEndpointName(
  model: string,
  providerSpecificData: JsonRecord | null | undefined
): string {
  return (
    toNonEmptyString(providerSpecificData?.endpointName) ||
    toNonEmptyString(providerSpecificData?.deploymentName) ||
    toNonEmptyString(providerSpecificData?.modelId) ||
    toNonEmptyString(model)
  );
}

export function buildSagemakerUrl({
  baseUrl,
  endpointName,
  stream = false,
}: {
  baseUrl: string;
  endpointName: string;
  stream?: boolean;
}): string {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";

  if (normalized.endsWith("/invocations") || normalized.endsWith("/invocations-response-stream")) {
    return normalized;
  }
  if (/\/endpoints\/[^/]+$/.test(normalized)) {
    return `${normalized}/${stream ? "invocations-response-stream" : "invocations"}`;
  }

  return `${normalized}/${encodeURIComponent(endpointName)}/${stream ? "invocations-response-stream" : "invocations"}`;
}

export function buildSagemakerRequest(body: unknown): JsonRecord {
  const source = asRecord(body);
  const payload: JsonRecord = {
    ...source,
  };
  delete payload.model;
  delete payload.stream;
  return payload;
}

function normalizeSagemakerPayload(model: string, payload: unknown): JsonRecord {
  const data = asRecord(payload);
  if (Array.isArray(data.choices)) {
    return {
      ...data,
      model: toNonEmptyString(data.model) || model,
      object: toNonEmptyString(data.object) || "chat.completion",
      created: typeof data.created === "number" ? data.created : Math.floor(Date.now() / 1000),
    };
  }

  const text =
    toNonEmptyString(data.generated_text) ||
    toNonEmptyString(data.completion) ||
    toNonEmptyString(data.output) ||
    toNonEmptyString(asRecord(data.message).content);

  return {
    id: `chatcmpl-sagemaker-${randomUUID()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: text || null,
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    },
  };
}

function buildSyntheticSseResponse(
  model: string,
  payload: JsonRecord,
  status: number,
  statusText: string
) {
  const encoder = new TextEncoder();
  const choice = asRecord(Array.isArray(payload.choices) ? payload.choices[0] : null);
  const message = asRecord(choice.message);
  const usage = asRecord(payload.usage);
  const responseId = toNonEmptyString(payload.id) || `chatcmpl-sagemaker-${randomUUID()}`;
  const created =
    typeof payload.created === "number" ? payload.created : Math.floor(Date.now() / 1000);
  const text = toNonEmptyString(message.content);

  const stream = new ReadableStream({
    start(controller) {
      if (text) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              id: responseId,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [
                {
                  index: 0,
                  delta: { role: "assistant", content: text },
                  finish_reason: null,
                },
              ],
            })}\n\n`
          )
        );
      }

      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            id: responseId,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [
              {
                index: 0,
                delta: {},
                finish_reason: toNonEmptyString(choice.finish_reason) || "stop",
              },
            ],
            ...(Object.keys(usage).length > 0 ? { usage } : {}),
          })}\n\n`
        )
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    status,
    statusText,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

function errorResponse(status: number, message: string) {
  return new Response(
    JSON.stringify({
      error: {
        message,
        type: status === HTTP_STATUS.UNAUTHORIZED ? "authentication_error" : "provider_error",
      },
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export class SagemakerExecutor extends BaseExecutor {
  constructor(provider = "sagemaker") {
    super(provider, PROVIDERS[provider] || { id: provider, baseUrl: "" });
  }

  buildHeaders(credentials: ProviderCredentials): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    applyConfiguredUserAgent(headers, credentials?.providerSpecificData || null);
    return headers;
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    const awsCredentials = parseAwsCredentialInput(
      credentials?.apiKey || credentials?.accessToken || null,
      credentials?.providerSpecificData
    );
    const region = awsCredentials?.region || "us-east-1";
    const baseUrl = getSagemakerBaseUrl(asRecord(credentials?.providerSpecificData), region);
    const endpointName = resolveSagemakerEndpointName(
      model,
      asRecord(credentials?.providerSpecificData)
    );
    return buildSagemakerUrl({ baseUrl, endpointName, stream: false });
  }

  transformRequest(model: string, body: unknown): JsonRecord {
    void model;
    return buildSagemakerRequest(body);
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const awsCredentials = parseAwsCredentialInput(
      credentials?.apiKey || credentials?.accessToken || null,
      credentials?.providerSpecificData
    );

    if (!awsCredentials) {
      return {
        response: errorResponse(
          HTTP_STATUS.UNAUTHORIZED,
          "AWS SageMaker credentials must include access key and secret key"
        ),
        url: "",
        headers: {},
        transformedBody: body,
      };
    }

    const url = this.buildUrl(model, false, 0, credentials);
    const transformedBody = this.transformRequest(model, body);
    const bodyString = JSON.stringify(transformedBody);
    const unsignedHeaders = this.buildHeaders(credentials);
    mergeUpstreamExtraHeaders(unsignedHeaders, upstreamExtraHeaders);
    const headers = signAwsRequest({
      method: "POST",
      url,
      body: bodyString,
      service: "sagemaker",
      region: awsCredentials.region,
      credentials: awsCredentials,
      headers: unsignedHeaders,
    });

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers,
        body: bodyString,
        signal,
      });
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (err.name === "AbortError") {
        throw err;
      }
      return {
        response: errorResponse(
          HTTP_STATUS.BAD_GATEWAY,
          `AWS SageMaker fetch error: ${err.message}`
        ),
        url,
        headers,
        transformedBody,
      };
    }

    if (!response.ok) {
      return { response, url, headers, transformedBody };
    }

    let jsonPayload: JsonRecord;
    try {
      jsonPayload = asRecord(await response.json());
    } catch {
      return {
        response: errorResponse(
          HTTP_STATUS.BAD_GATEWAY,
          "AWS SageMaker returned a non-JSON response for Messages API"
        ),
        url,
        headers,
        transformedBody,
      };
    }

    const normalized = normalizeSagemakerPayload(model, jsonPayload);
    const finalResponse = stream
      ? buildSyntheticSseResponse(model, normalized, response.status, response.statusText)
      : new Response(JSON.stringify(normalized), {
          status: response.status,
          statusText: response.statusText,
          headers: { "Content-Type": "application/json" },
        });

    return {
      response: finalResponse,
      url,
      headers,
      transformedBody,
    };
  }
}

export default SagemakerExecutor;
