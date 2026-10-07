import test from "node:test";
import assert from "node:assert/strict";

/**
 * `resolveVideoEndpoint` принимает запасной адрес и обязан им пользоваться.
 *
 * Функция объявлена как `(credentials, fallback)`, и вызывающий передаёт
 * `providerConfig.baseUrl` — адрес из реестра. Но пока адрес брался только из
 * учётных данных: у встроенного провайдера, где узел своего baseUrl не хранит,
 * получался `null.endsWith(...)` и маршрут отвечал 500 с пустым телом.
 *
 * Дефект был не виден, потому что единственный встроенный провайдер формата
 * `openai-video` (nanogpt) до этой ветки не доходил — его формат в реестре был
 * записан как `openai`, и диспетчер отбрасывал его раньше (400 Unsupported
 * video format). Живая проверка 2026-08-30: как только имя формата исправили,
 * тот же запрос дал 500 и стек с `Cannot read properties of null`.
 *
 * Адрес из реестра — готовый endpoint, а не корень узла: у nanogpt это
 * `/api/v1/video/generations` (единственное число), и дописывать к нему
 * `/videos/generations` нельзя.
 */

const { handleOpenAIVideoGeneration } =
  await import("../../open-sse/handlers/videoGeneration/openai.ts");

const REGISTRY_ENDPOINT = "https://nano-gpt.com/api/v1/video/generations";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function captureRequestUrl() {
  const seen: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    seen.push(typeof input === "string" ? input : input.toString());
    return new Response(JSON.stringify({ data: [{ url: "https://example.test/out.mp4" }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return seen;
}

test("falls back to the registry endpoint when the node carries no baseUrl", async () => {
  const seen = captureRequestUrl();

  const result = await handleOpenAIVideoGeneration({
    model: "default",
    provider: "nanogpt",
    providerConfig: { baseUrl: REGISTRY_ENDPOINT, authHeader: "bearer" },
    body: { prompt: "hello world" },
    credentials: { apiKey: "test-key" },
  });

  assert.notEqual(result, undefined, "обработчик обязан вернуть результат, а не упасть");
  assert.deepEqual(seen, [REGISTRY_ENDPOINT]);
});

test("still prefers the node's own baseUrl and appends the OpenAI path", async () => {
  const seen = captureRequestUrl();

  await handleOpenAIVideoGeneration({
    model: "default",
    provider: "custom-node",
    providerConfig: { baseUrl: REGISTRY_ENDPOINT, authHeader: "bearer" },
    body: { prompt: "hello world" },
    credentials: { apiKey: "test-key", baseUrl: "https://node.test/v1/" },
  });

  assert.deepEqual(seen, ["https://node.test/v1/videos/generations"]);
});
