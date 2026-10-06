/**
 * Regression tests for claudeTlsClient.ts
 *
 * These tests pin the contract for:
 * - Proxy resolution order (per-call > env var > default)
 * - TlsFetchOptions interface type checking
 * - TlsClientUnavailableError export
 * - Test override hook (__setTlsFetchOverrideForTesting)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Carrega o modulo de forma ESTATICA (mesma convenção dos testes irmãos
// chatgptTlsClient.test.ts / grokTlsClient.test.ts).
//
// Por que isso importa: `claudeTlsClient.ts` puxa `tlsClientBase.ts` ->
// `open-sse/utils/proxyFetch.ts`, cujo grafo de modulos custa ~5-12s para o
// Vite transformar dentro de um worker jsdom do Vitest. Cada `await
// import("../claudeTlsClient.ts")` feito DENTRO de um `it()` cobrava esse custo
// do orcamento do teste (testTimeout padrao = 5000ms), entao o PRIMEIRO teste do
// arquivo estourava por timeout sempre que a maquina estava sob carga — que e
// exatamente o caso quando a suite inteira roda com 20 workers em paralelo
// (`npm run test:vitest:ui`). Rodando o arquivo sozinho numa maquina ociosa ele
// passava por pouco, o que fazia a falha parecer poluicao entre arquivos.
//
// Com o import estatico o custo do grafo e pago na fase de COLETA do arquivo
// (que nao esta sujeita ao testTimeout) e os `await import()` de dentro dos
// testes passam a resolver do registro ja quente, em ~0ms. Nenhuma assercao foi
// alterada.
import "../claudeTlsClient.ts";

describe("claudeTlsClient", () => {
  beforeEach(() => {
    // Clear env vars before each test
    delete process.env.HTTP_PROXY;
    delete process.env.HTTPS_PROXY;
  });

  describe("exports", () => {
    it("exports TlsClientUnavailableError class", async () => {
      const { TlsClientUnavailableError } = await import("../claudeTlsClient.ts");
      expect(TlsClientUnavailableError).toBeDefined();
      expect(typeof TlsClientUnavailableError).toBe("function");
      const err = new TlsClientUnavailableError("test message");
      expect(err.name).toBe("TlsClientUnavailableError");
      expect(err.message).toBe("test message");
    });

    it("exports TlsClientHangError class", async () => {
      const { TlsClientHangError } = await import("../claudeTlsClient.ts");
      expect(TlsClientHangError).toBeDefined();
      expect(typeof TlsClientHangError).toBe("function");
      const err = new TlsClientHangError("timeout");
      expect(err.name).toBe("TlsClientHangError");
      expect(err.message).toBe("timeout");
    });

    it("exports TlsFetchOptions interface", async () => {
      // Type-only export; verify it's referenced in the module
      const mod = await import("../claudeTlsClient.ts");
      expect(mod).toHaveProperty("tlsFetchClaude");
      // The interface exists if tlsFetchClaude is properly typed
    });

    it("exports TlsFetchResult interface", async () => {
      const mod = await import("../claudeTlsClient.ts");
      expect(mod).toHaveProperty("tlsFetchClaude");
      // Result type validates against the function return type
    });

    it("exports tlsFetchClaude async function", async () => {
      const { tlsFetchClaude } = await import("../claudeTlsClient.ts");
      expect(tlsFetchClaude).toBeDefined();
      expect(typeof tlsFetchClaude).toBe("function");
    });

    it("exports __setTlsFetchOverrideForTesting function", async () => {
      const { __setTlsFetchOverrideForTesting } = await import("../claudeTlsClient.ts");
      expect(__setTlsFetchOverrideForTesting).toBeDefined();
      expect(typeof __setTlsFetchOverrideForTesting).toBe("function");
    });
  });

  describe("test override hook", () => {
    it("__setTlsFetchOverrideForTesting allows mocking tlsFetchClaude", async () => {
      const { tlsFetchClaude, __setTlsFetchOverrideForTesting } =
        await import("../claudeTlsClient.ts");

      const mockResponse = {
        status: 200,
        headers: new Headers({ "content-type": "text/event-stream" }),
        text: "data: test\n\n",
        body: null,
      };

      const mockFn = vi.fn().mockResolvedValue(mockResponse);
      __setTlsFetchOverrideForTesting(mockFn);

      const result = await tlsFetchClaude("https://claude.ai/api/test", {
        method: "GET",
      });

      expect(mockFn).toHaveBeenCalledWith("https://claude.ai/api/test", {
        method: "GET",
      });
      expect(result.status).toBe(200);
      expect(result.text).toBe("data: test\n\n");

      // Clean up override
      __setTlsFetchOverrideForTesting(null);
    });

    it("tlsFetchClaude respects the test override", async () => {
      const { tlsFetchClaude, __setTlsFetchOverrideForTesting } =
        await import("../claudeTlsClient.ts");

      const mockResponse = {
        status: 401,
        headers: new Headers({ "content-type": "application/json" }),
        text: '{"error":"unauthorized"}',
        body: null,
      };

      __setTlsFetchOverrideForTesting(async () => mockResponse);

      const result = await tlsFetchClaude("https://claude.ai/api/test", {});
      expect(result.status).toBe(401);

      __setTlsFetchOverrideForTesting(null);
    });
  });

  describe("TlsFetchOptions type contract", () => {
    it("allows method, headers, body, timeoutMs, signal, stream, streamEofSymbol, proxyUrl options", async () => {
      const { __setTlsFetchOverrideForTesting, tlsFetchClaude } =
        await import("../claudeTlsClient.ts");

      const mockFn = vi.fn().mockResolvedValue({
        status: 200,
        headers: new Headers(),
        text: "",
        body: null,
      });
      __setTlsFetchOverrideForTesting(mockFn);

      const controller = new AbortController();
      await tlsFetchClaude("https://claude.ai/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"test": true}',
        timeoutMs: 30000,
        signal: controller.signal,
        stream: true,
        streamEofSymbol: "[DONE]",
        proxyUrl: "http://proxy:8080",
      });

      expect(mockFn).toHaveBeenCalled();
      const callArgs = mockFn.mock.calls[0];
      expect(callArgs[1]).toMatchObject({
        method: "POST",
        body: '{"test": true}',
        timeoutMs: 30000,
        stream: true,
        proxyUrl: "http://proxy:8080",
      });

      __setTlsFetchOverrideForTesting(null);
    });

    it("allows optional proxyUrl for per-call proxy override", async () => {
      const { __setTlsFetchOverrideForTesting, tlsFetchClaude } =
        await import("../claudeTlsClient.ts");

      const mockFn = vi.fn().mockResolvedValue({
        status: 200,
        headers: new Headers(),
        text: "",
        body: null,
      });
      __setTlsFetchOverrideForTesting(mockFn);

      // Call without proxyUrl
      await tlsFetchClaude("https://claude.ai/test", {});
      expect(mockFn).toHaveBeenCalledWith("https://claude.ai/test", expect.objectContaining({}));

      // Call with proxyUrl
      mockFn.mockClear();
      await tlsFetchClaude("https://claude.ai/test", {
        proxyUrl: "http://custom:8080",
      });
      expect(mockFn).toHaveBeenCalledWith(
        "https://claude.ai/test",
        expect.objectContaining({ proxyUrl: "http://custom:8080" })
      );

      __setTlsFetchOverrideForTesting(null);
    });
  });

  describe("TlsFetchResult response contract", () => {
    it("returns object with status, headers, text, and body fields", async () => {
      const { __setTlsFetchOverrideForTesting, tlsFetchClaude } =
        await import("../claudeTlsClient.ts");

      const mockResponse = {
        status: 200,
        headers: new Headers({ "x-test": "value" }),
        text: "response body",
        body: null,
      };

      __setTlsFetchOverrideForTesting(async () => mockResponse);
      const result = await tlsFetchClaude("https://claude.ai/test", {});

      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("headers");
      expect(result).toHaveProperty("text");
      expect(result).toHaveProperty("body");
      expect(typeof result.status).toBe("number");
      expect(result.headers instanceof Headers).toBe(true);
      expect(typeof result.text).toBe("string");

      __setTlsFetchOverrideForTesting(null);
    });

    it("handles streaming response with body stream", async () => {
      const { __setTlsFetchOverrideForTesting, tlsFetchClaude } =
        await import("../claudeTlsClient.ts");

      const mockStream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("data: test\n\n"));
          controller.close();
        },
      });

      const mockResponse = {
        status: 200,
        headers: new Headers({ "content-type": "text/event-stream" }),
        text: null,
        body: mockStream,
      };

      __setTlsFetchOverrideForTesting(async () => mockResponse);
      const result = await tlsFetchClaude("https://claude.ai/api/completion", { stream: true });

      expect(result.status).toBe(200);
      expect(result.body).not.toBeNull();
      expect(result.body instanceof ReadableStream).toBe(true);

      __setTlsFetchOverrideForTesting(null);
    });
  });

  describe("proxy resolution order", () => {
    it("uses per-call proxyUrl when provided (highest priority)", async () => {
      const { __setTlsFetchOverrideForTesting, tlsFetchClaude } =
        await import("../claudeTlsClient.ts");

      process.env.HTTP_PROXY = "http://env-proxy:8080";
      const mockFn = vi.fn().mockResolvedValue({
        status: 200,
        headers: new Headers(),
        text: "",
        body: null,
      });
      __setTlsFetchOverrideForTesting(mockFn);

      await tlsFetchClaude("https://claude.ai/test", {
        proxyUrl: "http://call-proxy:9090",
      });

      const callOptions = mockFn.mock.calls[0][1];
      expect(callOptions.proxyUrl).toBe("http://call-proxy:9090");

      __setTlsFetchOverrideForTesting(null);
      delete process.env.HTTP_PROXY;
    });

    it("falls back to env var when per-call proxyUrl not provided", async () => {
      const { __setTlsFetchOverrideForTesting, tlsFetchClaude } =
        await import("../claudeTlsClient.ts");

      process.env.HTTPS_PROXY = "http://env-proxy:8080";
      const mockFn = vi.fn().mockResolvedValue({
        status: 200,
        headers: new Headers(),
        text: "",
        body: null,
      });
      __setTlsFetchOverrideForTesting(mockFn);

      await tlsFetchClaude("https://claude.ai/test", {});

      // #10910 passou a resolver proxyUrl ANTES de chamar o testOverride
      // (tlsClientBase.ts: "Resolve proxyUrl early so test overrides and the real
      // path both see it"), justamente para que o override enxergue o mesmo proxy
      // que o caminho real usaria. A assercao anterior travava o comportamento
      // antigo — override recebia o {} cru — e contradizia o proprio nome deste
      // teste, que diz verificar o fallback para a env var. Agora ela confere o
      // fallback de fato.
      expect(mockFn).toHaveBeenCalledOnce();
      const callOptions = mockFn.mock.calls[0][1];
      expect(callOptions.proxyUrl).toBe("http://env-proxy:8080");

      __setTlsFetchOverrideForTesting(null);
      delete process.env.HTTPS_PROXY;
    });
  });
});
