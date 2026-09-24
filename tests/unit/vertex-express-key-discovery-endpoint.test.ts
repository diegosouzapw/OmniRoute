// Repro for issue #12328: Vertex model discovery sends an Express-mode API key to
// generativelanguage.googleapis.com, which always rejects it (400 API_KEY_INVALID) because
// that is a different Google service from Vertex AI. The executor already knows Express keys
// only work against aiplatform.googleapis.com's project-less publisher endpoint
// (open-sse/executors/vertex.ts buildExpressGeminiUrl); discovery disagrees.
import test from "node:test";
import assert from "node:assert/strict";
import { discoverVertexModelsWithApiKey } from "@/lib/providerModels/vertexModelDiscovery";

test("Vertex Express API key discovery must not query generativelanguage.googleapis.com", async () => {
  const calledUrls: string[] = [];

  const fetchImpl = async (url: string): Promise<Response> => {
    calledUrls.push(url);
    if (url.startsWith("https://generativelanguage.googleapis.com/")) {
      return new Response(
        JSON.stringify({
          error: {
            code: 400,
            message: "API key not valid. Please pass a valid API key.",
            status: "INVALID_ARGUMENT",
            details: [
              {
                "@type": "type.googleapis.com/google.rpc.ErrorInfo",
                reason: "API_KEY_INVALID",
                domain: "googleapis.com",
                metadata: { service: "generativelanguage.googleapis.com" },
              },
            ],
          },
        }),
        { status: 400 }
      );
    }
    return new Response(JSON.stringify({ models: [{ name: "models/gemini-3.7-flash" }] }), {
      status: 200,
    });
  };

  const result = await discoverVertexModelsWithApiKey({
    apiKey: "vertex-express-test-key",
    fetchImpl,
  });

  const queriedGenerativeLanguage = calledUrls.some((url) =>
    url.startsWith("https://generativelanguage.googleapis.com/")
  );

  assert.equal(
    queriedGenerativeLanguage,
    false,
    `Vertex Express-key discovery must not send the key to generativelanguage.googleapis.com ` +
      `(a different Google service that always rejects it) — but it queried: ${calledUrls.join(", ")}`
  );

  assert.equal(result.failureStatus, undefined);
  assert.ok(result.models.length > 0, "expected discovery to find at least one live model");
});
