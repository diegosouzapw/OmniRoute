import test from "node:test";
import assert from "node:assert/strict";

import { AI_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { PROVIDER_MODELS } from "../../open-sse/config/providerModels.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { VertexExecutor } from "../../open-sse/executors/vertex.ts";

const MIN_SA_JSON = JSON.stringify({
  project_id: "vertex-project-123",
});

test("T23: provider constants expose glm-cn and vertex-partner", () => {
  assert.equal(AI_PROVIDERS["glm-cn"].alias, "glmcn");
  assert.equal(AI_PROVIDERS["glm-cn"].name, "GLM Coding (China)");
  assert.equal(AI_PROVIDERS["vertex-partner"].alias, "vp");
  assert.equal(AI_PROVIDERS["vertex-partner"].name, "Vertex AI Partners");
});

test("T23: registry exposes glm-cn and vertex-partner with dedicated local catalogs", () => {
  const glmCnAlias = REGISTRY["glm-cn"].alias || REGISTRY["glm-cn"].id;
  const vertexPartnerAlias = REGISTRY["vertex-partner"].alias || REGISTRY["vertex-partner"].id;

  assert.equal(REGISTRY["glm-cn"].format, "openai");
  assert.equal(
    REGISTRY["glm-cn"].baseUrl,
    "https://open.bigmodel.cn/api/coding/paas/v4/chat/completions"
  );
  assert.deepEqual(
    PROVIDER_MODELS[glmCnAlias].map((model) => model.id),
    ["glm-5.1", "glm-5", "glm-4.7", "glm-4.6", "glm-4.5-air"]
  );

  assert.equal(REGISTRY["vertex-partner"].format, "openai");
  assert.equal(REGISTRY["vertex-partner"].executor, "vertex");
  assert.deepEqual(
    PROVIDER_MODELS[vertexPartnerAlias].map((model) => model.id),
    [
      "deepseek-ai/deepseek-v3.2-maas",
      "qwen/qwen3-next-80b-a3b-thinking-maas",
      "qwen/qwen3-next-80b-a3b-instruct-maas",
      "zai-org/glm-5-maas",
    ]
  );
});

test("T23: Vertex executor routes new vertex-partner model ids to the global partner endpoint", () => {
  const executor = new VertexExecutor();

  const deepseekUrl = executor.buildUrl("deepseek-ai/deepseek-v3.2-maas", false, 0, {
    apiKey: MIN_SA_JSON,
  });
  const qwenUrl = executor.buildUrl("qwen/qwen3-next-80b-a3b-thinking-maas", true, 0, {
    apiKey: MIN_SA_JSON,
  });
  const glmUrl = executor.buildUrl("zai-org/glm-5-maas", false, 0, {
    apiKey: MIN_SA_JSON,
  });

  assert.equal(
    deepseekUrl,
    "https://aiplatform.googleapis.com/v1/projects/vertex-project-123/locations/global/endpoints/openapi/chat/completions"
  );
  assert.equal(
    qwenUrl,
    "https://aiplatform.googleapis.com/v1/projects/vertex-project-123/locations/global/endpoints/openapi/chat/completions"
  );
  assert.equal(
    glmUrl,
    "https://aiplatform.googleapis.com/v1/projects/vertex-project-123/locations/global/endpoints/openapi/chat/completions"
  );
});
