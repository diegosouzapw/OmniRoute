import test from "node:test";
import assert from "node:assert/strict";

import {
  JINA_ENV_CONNECTION_ID,
  buildJinaEnvCredentials,
  isJinaCredentialProvider,
  readJinaEnvApiKey,
} from "../../src/lib/providers/jina.ts";
import {
  buildJinaSearchRequest,
  extractJinaSearchItems,
} from "../../open-sse/handlers/search/jinaSearch.ts";
import { parseRerankModel, getRerankProvider } from "../../open-sse/config/rerankRegistry.ts";
import { parseEmbeddingModel } from "../../open-sse/config/embeddingRegistry.ts";
import {
  getSearchProvider,
  resolveSearchProvider,
  selectProvider,
  SEARCH_CREDENTIAL_FALLBACKS,
  SEARCH_PROVIDERS,
} from "../../open-sse/config/searchRegistry.ts";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";
import { v1ClassifySchema, v1SegmentSchema, v1SearchSchema } from "../../src/shared/validation/schemas.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";

const ENV_KEYS = ["JINA_AI_API_KEY", "JINA_API_KEY"] as const;
const savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

function restoreEnv() {
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
}

test.afterEach(restoreEnv);

test("Jina env helper prefers JINA_AI_API_KEY over JINA_API_KEY", () => {
  delete process.env.JINA_AI_API_KEY;
  delete process.env.JINA_API_KEY;
  process.env.JINA_API_KEY = "alias-key";
  assert.equal(readJinaEnvApiKey(), "alias-key");
  process.env.JINA_AI_API_KEY = "primary-key";
  assert.equal(readJinaEnvApiKey(), "primary-key");
});

test("Jina env credentials are scoped to Jina provider ids", () => {
  process.env.JINA_AI_API_KEY = "env-jina-key";
  assert.equal(isJinaCredentialProvider("jina-ai"), true);
  assert.equal(isJinaCredentialProvider("jina-reader"), true);
  assert.equal(isJinaCredentialProvider("jina-search"), true);
  assert.equal(isJinaCredentialProvider("openai"), false);
  assert.equal(buildJinaEnvCredentials("openai"), null);

  const creds = buildJinaEnvCredentials("jina-ai");
  assert.ok(creds);
  assert.equal(creds.apiKey, "env-jina-key");
  assert.equal(creds.connectionId, JINA_ENV_CONNECTION_ID);
});

test("Jina env credentials honor forced / allowed / excluded connection filters", () => {
  process.env.JINA_AI_API_KEY = "env-jina-key";
  assert.equal(
    buildJinaEnvCredentials("jina-ai", { forcedConnectionId: "dashboard-row" }),
    null
  );
  assert.ok(
    buildJinaEnvCredentials("jina-reader", { forcedConnectionId: JINA_ENV_CONNECTION_ID })
  );
  assert.equal(
    buildJinaEnvCredentials("jina-search", { allowedConnections: ["other-id"] }),
    null
  );
  assert.equal(
    buildJinaEnvCredentials("jina-ai", { excludedConnectionIds: [JINA_ENV_CONNECTION_ID] }),
    null
  );
});

test("Jina catalog aliases resolve bare embed and rerank ids", () => {
  const embed = parseEmbeddingModel("jina-embeddings-v5-omni-small");
  assert.equal(embed.provider, "jina-ai");
  assert.equal(embed.model, "jina-embeddings-v5-omni-small");

  const family = parseEmbeddingModel("jina-ai/jina-embeddings-v5-omni");
  assert.equal(family.provider, "jina-ai");
  assert.equal(family.model, "jina-embeddings-v5-omni-small");
  const nano = parseEmbeddingModel("jina-embeddings-v5-omni-nano");
  assert.equal(nano.provider, "jina-ai");
  assert.equal(nano.model, "jina-embeddings-v5-omni-nano");

  const rerank = parseRerankModel("jina-reranker-v3.5");
  assert.equal(rerank.provider, "jina-ai");
  assert.equal(rerank.model, "jina-reranker-v3.5");

  const prefixed = parseRerankModel("jina-ai/jina-reranker-v3.5");
  assert.equal(prefixed.provider, "jina-ai");
  assert.equal(prefixed.model, "jina-reranker-v3.5");

  const jina = getRerankProvider("jina-ai");
  assert.ok(jina?.models.some((model) => model.id === "jina-reranker-v3.5"));
});

test("Jina dashboard labels distinguish Foundation API from Reader", () => {
  assert.equal(APIKEY_PROVIDERS["jina-ai"].name, "Jina AI (Foundation API)");
  assert.equal(APIKEY_PROVIDERS["jina-reader"].name, "Jina Reader (r.jina.ai)");
  assert.match(APIKEY_PROVIDERS["jina-ai"].authHint || "", /api\.jina\.ai/);
  assert.match(APIKEY_PROVIDERS["jina-reader"].authHint || "", /r\.jina\.ai/);
  assert.match(APIKEY_PROVIDERS["jina-reader"].authHint || "", /Does not serve/);
});

test("jina-search reuses Foundation credentials and accepts jina-ai alias", () => {
  assert.ok(SEARCH_PROVIDERS["jina-search"]);
  assert.equal(SEARCH_PROVIDERS["jina-search"].baseUrl, "https://s.jina.ai");
  assert.equal(SEARCH_CREDENTIAL_FALLBACKS["jina-search"], "jina-ai");
  assert.equal(getSearchProvider("jina-ai"), null);
  assert.equal(resolveSearchProvider("jina-ai")?.id, "jina-search");
  assert.equal(selectProvider("jina")?.id, "jina-search");
  assert.equal(selectProvider("jina-ai")?.id, "jina-search");
  assert.equal(selectProvider("jina-search")?.id, "jina-search");
});

test("jina-ai static catalog stays embed/rerank, not searchTypes web", () => {
  const models = getStaticModelsForProvider("jina-ai") || [];
  assert.ok(
    models.some(
      (model) =>
        model.id === "jina-embeddings-v5-text-small" && model.apiFormat === "embeddings"
    )
  );
  assert.ok(models.some((model) => model.id === "jina-reranker-v3.5" && model.apiFormat === "rerank"));
  assert.equal(
    models.some((model) => model.id === "web"),
    false
  );
});

test("v1SearchSchema accepts Jina search aliases", () => {
  for (const provider of ["jina-search", "jina-ai", "jina"] as const) {
    const result = v1SearchSchema.safeParse({ query: "jina embeddings", provider });
    assert.equal(result.success, true, `${provider} should be accepted`);
  }
});

test("classify and segment schemas accept Jina-shaped bodies", () => {
  const classify = v1ClassifySchema.safeParse({
    model: "jina-embeddings-v5-text-small",
    input: ["hello"],
    labels: ["greeting", "other"],
  });
  assert.equal(classify.success, true);

  const segment = v1SegmentSchema.safeParse({
    content: "Split this text into chunks.",
    return_chunks: true,
  });
  assert.equal(segment.success, true);

  const missing = v1SegmentSchema.safeParse({ tokenizer: "cl100k_base" });
  assert.equal(missing.success, false);
});

test("Jina search builder posts q/num to s.jina.ai with bearer auth", () => {
  const built = buildJinaSearchRequest(SEARCH_PROVIDERS["jina-search"], {
    query: "jina rerank",
    maxResults: 3,
    token: "test-jina-token",
    country: "US",
  });
  assert.equal(built.url, "https://s.jina.ai/");
  assert.equal(built.init.method, "POST");
  const headers = built.init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer test-jina-token");
  const body = JSON.parse(String(built.init.body));
  assert.equal(body.q, "jina rerank");
  assert.equal(body.num, 3);
  assert.equal(body.gl, "US");
});

test("Jina search normalizer reads data[] items", () => {
  const items = extractJinaSearchItems({
    data: [{ title: "Jina", url: "https://jina.ai", description: "Search foundation", content: "# Hi" }],
  });
  assert.equal(items.length, 1);
  assert.equal(items[0].url, "https://jina.ai");
});

test("Jina foundation proxy logs connection_id and forwards JSON", async () => {
  const { handleJinaFoundationProxy } = await import(
    "../../open-sse/handlers/jinaFoundation.ts"
  );
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ data: [{ label: "ok" }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const response = await handleJinaFoundationProxy({
      path: "/v1/classify",
      upstreamUrl: "https://api.jina.ai/v1/classify",
      body: { model: "jina-embeddings-v5-text-small", input: ["hi"], labels: ["a"] },
      credentials: { apiKey: "test-jina-token", connectionId: "conn-jina-1" },
      provider: "jina-ai",
      model: "jina-embeddings-v5-text-small",
    });
    assert.equal(response.status, 200);
    const json = (await response.json()) as { data: Array<{ label: string }> };
    assert.equal(json.data[0].label, "ok");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Jina foundation proxy 401s without a key", async () => {
  const { handleJinaFoundationProxy } = await import(
    "../../open-sse/handlers/jinaFoundation.ts"
  );
  const response = await handleJinaFoundationProxy({
    path: "/v1/segment",
    upstreamUrl: "https://segment.jina.ai/",
    body: { content: "hello" },
    credentials: {},
    provider: "jina-ai",
  });
  assert.equal(response.status, 401);
});
