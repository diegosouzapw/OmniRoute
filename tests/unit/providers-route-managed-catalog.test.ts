import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-providers-managed-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-managed-providers";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("providers route accepts managed local, audio, web-cookie and search providers", async () => {
  const cases = [
    {
      provider: "glhf",
      body: {
        provider: "glhf",
        apiKey: "glhf-key",
        name: "GLHF Chat",
      },
    },
    {
      provider: "gitlab",
      body: {
        provider: "gitlab",
        apiKey: "glpat-test",
        name: "GitLab Duo PAT",
      },
    },
    {
      provider: "cablyai",
      body: {
        provider: "cablyai",
        apiKey: "cably-key",
        name: "CablyAI Primary",
      },
    },
    {
      provider: "thebai",
      body: {
        provider: "thebai",
        apiKey: "theb-key",
        name: "TheB.AI Primary",
      },
    },
    {
      provider: "fenayai",
      body: {
        provider: "fenayai",
        apiKey: "fenay-key",
        name: "FenayAI Primary",
      },
    },
    {
      provider: "chutes",
      body: {
        provider: "chutes",
        apiKey: "chutes-key",
        name: "Chutes Primary",
      },
    },
    {
      provider: "datarobot",
      body: {
        provider: "datarobot",
        apiKey: "datarobot-key",
        name: "DataRobot Primary",
      },
    },
    {
      provider: "clarifai",
      body: {
        provider: "clarifai",
        apiKey: "clarifai-pat",
        name: "Clarifai Primary",
      },
    },
    {
      provider: "empower",
      body: {
        provider: "empower",
        apiKey: "empower-key",
        name: "Empower Primary",
      },
    },
    {
      provider: "nous-research",
      body: {
        provider: "nous-research",
        apiKey: "nous-key",
        name: "Nous Research Primary",
      },
    },
    {
      provider: "petals",
      body: {
        provider: "petals",
        name: "Petals Public Endpoint",
      },
    },
    {
      provider: "poe",
      body: {
        provider: "poe",
        apiKey: "poe-key",
        name: "Poe Primary",
      },
    },
    {
      provider: "azure-ai",
      body: {
        provider: "azure-ai",
        apiKey: "azure-ai-key",
        name: "Azure AI Foundry Primary",
      },
    },
    {
      provider: "bedrock",
      body: {
        provider: "bedrock",
        apiKey: "bedrock-key",
        name: "Bedrock Mantle Primary",
      },
    },
    {
      provider: "watsonx",
      body: {
        provider: "watsonx",
        apiKey: "watsonx-key",
        name: "watsonx Gateway Primary",
      },
    },
    {
      provider: "oci",
      body: {
        provider: "oci",
        apiKey: "oci-key",
        name: "OCI GenAI Primary",
      },
    },
    {
      provider: "sap",
      body: {
        provider: "sap",
        apiKey: "sap-key",
        name: "SAP GenAI Primary",
      },
    },
    {
      provider: "modal",
      body: {
        provider: "modal",
        apiKey: "modal-key",
        name: "Modal Primary",
        providerSpecificData: {
          baseUrl: "https://alice--demo.modal.run/v1",
        },
      },
    },
    {
      provider: "reka",
      body: {
        provider: "reka",
        apiKey: "reka-key",
        name: "Reka Primary",
        providerSpecificData: {
          baseUrl: "https://api.reka.ai/v1",
        },
      },
    },
    {
      provider: "nlpcloud",
      body: {
        provider: "nlpcloud",
        apiKey: "nlpc-key",
        name: "NLP Cloud Primary",
      },
    },
    {
      provider: "runwayml",
      body: {
        provider: "runwayml",
        apiKey: "runway-key",
        name: "Runway Primary",
      },
    },
    {
      provider: "voyage-ai",
      body: {
        provider: "voyage-ai",
        apiKey: "voyage-key",
        name: "Voyage AI Primary",
      },
    },
    {
      provider: "jina-ai",
      body: {
        provider: "jina-ai",
        apiKey: "jina-key",
        name: "Jina AI Primary",
      },
    },
    {
      provider: "sdwebui",
      body: {
        provider: "sdwebui",
        name: "SD WebUI Local",
        providerSpecificData: {
          baseUrl: "http://localhost:7860",
        },
      },
    },
    {
      provider: "lm-studio",
      body: {
        provider: "lm-studio",
        name: "LM Studio Local",
        providerSpecificData: {
          baseUrl: "http://localhost:1234/v1",
        },
      },
    },
    {
      provider: "vllm",
      body: {
        provider: "vllm",
        name: "vLLM Local",
        providerSpecificData: {
          baseUrl: "http://localhost:8000/v1",
        },
      },
    },
    {
      provider: "llamafile",
      body: {
        provider: "llamafile",
        name: "Llamafile Local",
        providerSpecificData: {
          baseUrl: "http://127.0.0.1:8080/v1",
        },
      },
    },
    {
      provider: "triton",
      body: {
        provider: "triton",
        name: "Triton Local",
        providerSpecificData: {
          baseUrl: "http://localhost:8000/v1",
        },
      },
    },
    {
      provider: "docker-model-runner",
      body: {
        provider: "docker-model-runner",
        name: "Docker Model Runner Local",
        providerSpecificData: {
          baseUrl: "http://localhost:12434/v1",
        },
      },
    },
    {
      provider: "xinference",
      body: {
        provider: "xinference",
        name: "XInference Local",
        providerSpecificData: {
          baseUrl: "http://localhost:9997/v1",
        },
      },
    },
    {
      provider: "oobabooga",
      body: {
        provider: "oobabooga",
        name: "oobabooga Local",
        providerSpecificData: {
          baseUrl: "http://localhost:5000/v1",
        },
      },
    },
    {
      provider: "assemblyai",
      body: {
        provider: "assemblyai",
        apiKey: "aa-key",
        name: "AssemblyAI Primary",
      },
    },
    {
      provider: "grok-web",
      body: {
        provider: "grok-web",
        apiKey: "sso=grok-cookie",
        name: "Grok Web Session",
      },
    },
    {
      provider: "perplexity-web",
      body: {
        provider: "perplexity-web",
        apiKey: "__Secure-next-auth.session-token=pplx-cookie",
        name: "Perplexity Web Session",
      },
    },
    {
      provider: "blackbox-web",
      body: {
        provider: "blackbox-web",
        apiKey: "__Secure-authjs.session-token=bb-cookie",
        name: "Blackbox Web Session",
      },
    },
    {
      provider: "muse-spark-web",
      body: {
        provider: "muse-spark-web",
        apiKey: "abra_sess=meta-cookie",
        name: "Muse Spark Web Session",
      },
    },
    {
      provider: "google-pse-search",
      body: {
        provider: "google-pse-search",
        apiKey: "google-key",
        name: "Google PSE",
        providerSpecificData: {
          cx: "engine-id-123",
        },
      },
    },
    {
      provider: "youcom-search",
      body: {
        provider: "youcom-search",
        apiKey: "you-key",
        name: "You.com Search",
      },
    },
    {
      provider: "searxng-search",
      body: {
        provider: "searxng-search",
        name: "Local SearXNG",
        providerSpecificData: {
          baseUrl: "http://localhost:8888/search",
        },
      },
    },
  ];

  for (const entry of cases) {
    const response = await providersRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/providers", {
        method: "POST",
        body: entry.body,
      })
    );

    assert.equal(
      response.status,
      201,
      `${entry.provider} should be accepted by POST /api/providers`
    );
    const payload = (await response.json()) as any;
    assert.equal(payload.connection.provider, entry.provider);
  }
});

test("providers route rejects upstream proxy tools as direct provider connections", async () => {
  const response = await providersRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      body: {
        provider: "cliproxyapi",
        apiKey: "cpa-key",
        name: "CLIProxyAPI",
      },
    })
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Invalid provider" });
});
