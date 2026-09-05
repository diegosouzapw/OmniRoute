import assert from "node:assert/strict";
import { createServer } from "node:http";
import { describe, it } from "node:test";
import { MemorySettingsExtendedSchema } from "../../../src/shared/schemas/memory.ts";
import {
  DEFAULT_MEMORY_SETTINGS,
  normalizeMemorySettings,
  toMemorySettingsUpdates,
} from "../../../src/lib/memory/settings.ts";
import {
  MemoryCustomEmbeddingConfigError,
  resolveMemoryCustomEmbeddingProvider,
} from "../../../src/lib/memory/embedding/customProvider.ts";
import { resolveEmbeddingSource } from "../../../src/lib/memory/embedding/index.ts";
import { EMBEDDING_PROVIDERS } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { createEmbeddingResponse } from "../../../src/lib/embeddings/service.ts";

describe("Memory custom embedding endpoint", () => {
  it("keeps the registry-backed behavior when custom fields are empty", () => {
    const parsed = MemorySettingsExtendedSchema.parse({
      customBaseUrl: "",
      customModelId: "",
    });
    assert.equal(parsed.customBaseUrl, null);
    assert.equal(parsed.customModelId, null);
    assert.equal(resolveMemoryCustomEmbeddingProvider(parsed), null);
  });

  it("normalizes, persists, and resolves a Memory-only OpenAI-compatible provider", () => {
    const settings = normalizeMemorySettings({
      memoryEmbeddingCustomBaseUrl: " http://localhost:8000/v1/ ",
      memoryEmbeddingCustomModelId: " SuperPauly/harrier-oss-v1-0.6b-gguf ",
    });
    assert.equal(settings.customBaseUrl, "http://localhost:8000/v1");
    assert.equal(settings.customModelId, "SuperPauly/harrier-oss-v1-0.6b-gguf");

    const resolved = resolveMemoryCustomEmbeddingProvider(settings);
    assert.ok(resolved);
    assert.equal(resolved.provider.id, "memory-custom");
    assert.equal(resolved.provider.baseUrl, "http://localhost:8000/v1/embeddings");
    assert.equal(resolved.provider.authType, "none");
    assert.equal(resolved.model, "SuperPauly/harrier-oss-v1-0.6b-gguf");
    assert.equal(EMBEDDING_PROVIDERS["memory-custom"], undefined);

    const resolution = resolveEmbeddingSource({
      embeddingSource: "remote",
      embeddingProviderModel: null,
      customBaseUrl: settings.customBaseUrl,
      customModelId: settings.customModelId,
    });
    assert.equal(resolution.source, "remote");
    assert.equal(resolution.model, "memory-custom/SuperPauly/harrier-oss-v1-0.6b-gguf");
    assert.match(resolution.signature, /localhost:8000/);

    assert.deepEqual(
      toMemorySettingsUpdates({
        customBaseUrl: settings.customBaseUrl,
        customModelId: settings.customModelId,
      }),
      {
        memoryEmbeddingCustomBaseUrl: "http://localhost:8000/v1",
        memoryEmbeddingCustomModelId: "SuperPauly/harrier-oss-v1-0.6b-gguf",
      }
    );
  });

  it("preserves an endpoint that already ends in /embeddings", () => {
    const resolved = resolveMemoryCustomEmbeddingProvider({
      customBaseUrl: "https://embeddings.example.test/v1/embeddings/",
      customModelId: "custom-model",
    });
    assert.equal(resolved?.provider.baseUrl, "https://embeddings.example.test/v1/embeddings");
  });

  it("rejects malformed, non-http, credential-bearing, query-bearing, and metadata URLs", () => {
    const blocked = [
      "not-a-url",
      "file:///tmp/embeddings",
      "https://user:secret@example.test/v1",
      "https://example.test/v1?api_key=secret",
      "http://169.254.169.254/latest/meta-data",
    ];
    for (const customBaseUrl of blocked) {
      if (customBaseUrl !== "http://169.254.169.254/latest/meta-data") {
        assert.equal(MemorySettingsExtendedSchema.safeParse({ customBaseUrl }).success, false);
      }
      assert.throws(
        () =>
          resolveMemoryCustomEmbeddingProvider({
            customBaseUrl,
            customModelId: "custom-model",
          }),
        (error: unknown) => {
          assert.ok(error instanceof MemoryCustomEmbeddingConfigError);
          assert.equal(error.message, "Custom embedding endpoint is invalid or blocked");
          assert.equal(error.message.includes(customBaseUrl), false);
          return true;
        }
      );
    }
  });

  it("requires both custom fields and leaves defaults disabled", () => {
    assert.equal(DEFAULT_MEMORY_SETTINGS.customBaseUrl, null);
    assert.equal(DEFAULT_MEMORY_SETTINGS.customModelId, null);
    assert.throws(
      () =>
        resolveMemoryCustomEmbeddingProvider({
          customBaseUrl: "http://localhost:8000/v1",
          customModelId: null,
        }),
      MemoryCustomEmbeddingConfigError
    );
  });

  it("dispatches the custom model to a disposable OpenAI-compatible server", async () => {
    let receivedPath = "";
    let receivedBody: Record<string, unknown> | null = null;
    const server = createServer((request, response) => {
      receivedPath = request.url ?? "";
      const chunks: Buffer[] = [];
      request.on("data", (chunk: Buffer) => chunks.push(chunk));
      request.on("end", () => {
        receivedBody = JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<
          string,
          unknown
        >;
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ data: [{ embedding: [0.1, 0.2, 0.3] }] }));
      });
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));

    try {
      const address = server.address();
      assert.ok(address && typeof address === "object");
      const custom = resolveMemoryCustomEmbeddingProvider({
        customBaseUrl: `http://127.0.0.1:${address.port}/v1`,
        customModelId: "custom-model",
      });
      assert.ok(custom);
      const response = await createEmbeddingResponse(
        { model: "memory-custom/custom-model", input: "hello" },
        { resolvedProvider: custom.provider, resolvedModel: custom.model }
      );
      assert.equal(response.status, 200);
      assert.equal(receivedPath, "/v1/embeddings");
      assert.equal(receivedBody?.model, "custom-model");
      assert.equal(EMBEDDING_PROVIDERS["memory-custom"], undefined);
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve()))
      );
    }
  });
});
