import { NextResponse } from "next/server";
import {
  detectFormat,
  getTargetFormat,
  buildProviderUrl,
  buildProviderHeaders,
} from "@omniroute/open-sse/services/provider.ts";
import { translateRequest } from "@omniroute/open-sse/translator/index.ts";
import { FORMATS } from "@omniroute/open-sse/translator/formats.ts";
import { getProviderConnections } from "@/lib/localDb";
import { translatorTranslateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

type JsonRecord = Record<string, unknown>;

function asJsonRecord(value: unknown): JsonRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as JsonRecord;
  }
  return {};
}

function getActualBody(body: JsonRecord): JsonRecord {
  const nested = asJsonRecord(body.body);
  return Object.keys(nested).length > 0 ? nested : body;
}

function getModelId(value: JsonRecord): string {
  const model = value.model;
  return typeof model === "string" && model.trim().length > 0 ? model : "test-model";
}

function getProviderBaseUrl(providerSpecificData: unknown): string | undefined {
  const data = asJsonRecord(providerSpecificData);
  const baseUrl = data.baseUrl;
  return typeof baseUrl === "string" && baseUrl.trim().length > 0 ? baseUrl : undefined;
}

async function getActiveProviderSpecificData(provider?: string | null): Promise<JsonRecord | null> {
  if (!provider) return null;
  const connections = await getProviderConnections({ provider });
  const connection = connections.find((c) => c.isActive !== false);
  return connection ? asJsonRecord(connection.providerSpecificData) : null;
}

export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(translatorTranslateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }
    const reqData = validation.data;
    const {
      step,
      provider,
      body,
      sourceFormat: reqSourceFormat,
      targetFormat: reqTargetFormat,
    } = reqData;
    let result;

    // Direct translation mode (Playground): sourceFormat → targetFormat in one shot
    if (step === "direct") {
      const src = reqSourceFormat || detectFormat(body);
      const providerSpecificData = await getActiveProviderSpecificData(provider);
      const tgt =
        reqTargetFormat || (provider ? getTargetFormat(provider, providerSpecificData) : "openai");
      const model = getModelId(asJsonRecord(body));
      const translated = translateRequest(src, tgt, model, body, true, null, provider);
      return NextResponse.json({
        success: true,
        sourceFormat: src,
        targetFormat: tgt,
        result: translated,
      });
    }

    switch (step) {
      case 1: {
        // Step 1: Client → Source (detect format)
        // Return format: { timestamp, endpoint, headers, body }
        const actualBody = getActualBody(asJsonRecord(body));
        const sourceFormat = detectFormat(actualBody);

        result = {
          timestamp: body.timestamp || new Date().toISOString(),
          endpoint: body.endpoint || "/v1/messages",
          headers: body.headers || {},
          body: actualBody,
          _detectedFormat: sourceFormat,
        };
        break;
      }

      case 2: {
        // Step 2: Source → OpenAI
        // Return format: { timestamp, headers: {}, body }
        const actualBody = getActualBody(asJsonRecord(body));
        const sourceFormat = detectFormat(actualBody);
        const targetFormat = FORMATS.OPENAI;
        const model = getModelId(actualBody);
        const translated = translateRequest(
          sourceFormat,
          targetFormat,
          model,
          actualBody,
          true,
          null,
          provider
        );

        result = {
          timestamp: new Date().toISOString(),
          headers: {},
          body: translated,
        };
        break;
      }

      case 3: {
        // Step 3: OpenAI → Target
        // Return format: { timestamp, body }
        const actualBody = getActualBody(asJsonRecord(body));
        const sourceFormat = FORMATS.OPENAI;
        const providerSpecificData = await getActiveProviderSpecificData(provider);
        const targetFormat = getTargetFormat(provider, providerSpecificData);
        const model = getModelId(actualBody);
        const translated = translateRequest(
          sourceFormat,
          targetFormat,
          model,
          actualBody,
          true,
          null,
          provider
        );

        result = {
          timestamp: new Date().toISOString(),
          body: translated,
        };
        break;
      }

      case 4: {
        // Step 4: Build final request with real URL and headers
        // Return format: { timestamp, url, headers, body }
        const actualBody = getActualBody(asJsonRecord(body));
        const model = getModelId(actualBody);

        // Get provider credentials
        const connections = await getProviderConnections({ provider });
        const connection = connections.find((c) => c.isActive !== false);

        if (!connection) {
          return NextResponse.json(
            {
              success: false,
              error: `No active connection found for provider: ${provider}`,
            },
            { status: 400 }
          );
        }

        const credentials = {
          apiKey: connection.apiKey,
          accessToken: connection.accessToken,
          refreshToken: connection.refreshToken,
          copilotToken: connection.copilotToken,
          projectId: connection.projectId,
          providerSpecificData: connection.providerSpecificData,
        };

        // Build URL and headers
        const url = buildProviderUrl(provider, model, true, {
          baseUrlIndex: 0,
          baseUrl: getProviderBaseUrl(connection.providerSpecificData),
          providerSpecificData: connection.providerSpecificData,
        });
        const headers = buildProviderHeaders(provider, credentials, true, actualBody);

        result = {
          timestamp: new Date().toISOString(),
          url: url,
          headers: headers,
          body: actualBody,
        };
        break;
      }

      default:
        return NextResponse.json({ success: false, error: "Invalid step" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error translating:", error);
    return NextResponse.json(
      { success: false, error: "Failed to translate request" },
      { status: 500 }
    );
  }
}
