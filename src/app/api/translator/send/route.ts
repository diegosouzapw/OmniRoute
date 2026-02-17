import { NextResponse } from "next/server";
import {
  buildProviderUrl,
  buildProviderHeaders,
  detectFormat,
  getTargetFormat,
} from "@omniroute/open-sse/services/provider.js";
import { getProviderConnections } from "@/lib/localDb";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { logTranslationEvent } from "@/lib/translatorEvents";

export async function POST(request) {
  try {
    const startedAt = Date.now();
    const { provider, body } = await request.json();

    if (!provider || !body) {
      return NextResponse.json(
        { success: false, error: "Provider and body required" },
        { status: 400 }
      );
    }

    const sourceFormat = detectFormat(body);
    const targetFormat = getTargetFormat(provider);

    // Get provider credentials from database
    const connections = await getProviderConnections({ provider });
    const connection = connections.find((c) => c.isActive !== false);

    if (!connection) {
      logTranslationEvent({
        provider,
        model: body.model || "test-model",
        sourceFormat,
        targetFormat,
        status: "error",
        statusCode: 400,
        latency: Date.now() - startedAt,
        endpoint: "/api/translator/send",
      });
      return NextResponse.json(
        {
          success: false,
          error: `No active connection found for provider: ${provider}. Available connections: ${connections.length}`,
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

    // Build URL and headers using provider service
    const url = buildProviderUrl(provider, body.model || "test-model", true, {
      baseUrlIndex: 0,
      baseUrl: connection.providerSpecificData?.baseUrl,
    });
    const headers = buildProviderHeaders(provider, credentials, true, body);

    // Send request to provider
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const normalizedUpstreamError = toJsonErrorPayload(
        errorText,
        `Provider error: ${response.status} ${response.statusText}`
      );
      logTranslationEvent({
        provider,
        model: body.model || "test-model",
        sourceFormat,
        targetFormat,
        status: "error",
        statusCode: response.status,
        latency: Date.now() - startedAt,
        endpoint: "/api/translator/send",
      });
      return NextResponse.json(
        {
          success: false,
          error:
            normalizedUpstreamError.error?.message ||
            `Provider error: ${response.status} ${response.statusText}`,
          details: normalizedUpstreamError,
        },
        { status: response.status }
      );
    }

    logTranslationEvent({
      provider,
      model: body.model || "test-model",
      sourceFormat,
      targetFormat,
      status: "success",
      statusCode: 200,
      latency: Date.now() - startedAt,
      endpoint: "/api/translator/send",
    });

    // Return streaming response
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error sending request:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
