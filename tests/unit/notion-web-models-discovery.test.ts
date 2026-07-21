import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-notion-web-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const notionModels = await import("../../open-sse/services/notionWebModels.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const SAMPLE_RESPONSE = {
  models: [
    {
      model: "orange-mousse",
      modelMessage: "GPT-5.6 Sol",
      modelFamily: "openai",
      isDisabled: false,
      modelConfiguration: { supportedReasoningEfforts: ["medium", "high"] },
    },
    {
      model: "ambrosia-tart-high",
      modelMessage: "Opus 4.8",
      modelFamily: "anthropic",
      isDisabled: false,
    },
    {
      model: "disabled-model",
      modelMessage: "Hidden",
      modelFamily: "openai",
      isDisabled: true,
    },
  ],
};

test("parseNotionAvailableModels maps enabled models and skips disabled", () => {
  const models = notionModels.parseNotionAvailableModels(SAMPLE_RESPONSE);
  assert.equal(
    models.some((m) => m.id === "disabled-model" || m.id === "hidden"),
    false
  );
  // Catalog ids are real web-picker labels — NOT food codenames.
  assert.ok(models.some((m) => m.id === "gpt-5.6-sol" && m.name === "GPT-5.6 Sol"));
  assert.ok(models.some((m) => m.id === "opus-4.8" && m.name === "Opus 4.8"));
  assert.ok(models.some((m) => m.id === "notion-ai"));
  // Food codenames must not be primary catalog ids.
  assert.equal(
    models.some((m) => m.id === "orange-mousse"),
    false
  );
  assert.equal(
    models.some((m) => m.id === "ambrosia-tart-high"),
    false
  );
  const sol = models.find((m) => m.id === "gpt-5.6-sol");
  assert.equal(sol?.notionCodename, "orange-mousse");
  assert.equal(sol?.supportsReasoning, true);
  assert.equal(sol?.owned_by, "openai");
  const opus = models.find((m) => m.id === "opus-4.8");
  assert.equal(opus?.notionCodename, "ambrosia-tart-high");
});

test("resolveNotionCodename maps prefixes, slugs, and display names to food codenames", () => {
  assert.equal(notionModels.resolveNotionCodename("orange-mousse"), "orange-mousse");
  assert.equal(notionModels.resolveNotionCodename("notion-web/orange-mousse"), "orange-mousse");
  assert.equal(notionModels.resolveNotionCodename("nw/orange-mousse"), "orange-mousse");
  assert.equal(notionModels.resolveNotionCodename("gpt-5.6-sol"), "orange-mousse");
  assert.equal(notionModels.resolveNotionCodename("notion-web/gpt-5.6-sol"), "orange-mousse");
  assert.equal(notionModels.resolveNotionCodename("GPT-5.6 Sol"), "orange-mousse");
  assert.equal(notionModels.resolveNotionCodename("fable-5"), "acai-budino-high");
  assert.equal(notionModels.resolveNotionCodename("Fable 5"), "acai-budino-high");
  assert.equal(notionModels.resolveNotionCodename("acai-budino-high"), "acai-budino-high");
  assert.equal(notionModels.resolveNotionCodename("notion-ai"), "");
  assert.equal(notionModels.resolveNotionCodename(""), "");
});

test("listNotionDisabledModels surfaces plan-locked Fable 5 without listing it as enabled", () => {
  const payload = {
    models: [
      {
        model: "acai-budino-high",
        modelMessage: "Fable 5",
        modelFamily: "anthropic",
        isDisabled: true,
        disabledReason: "business_or_enterprise_plan_required",
      },
      {
        model: "orange-mousse",
        modelMessage: "GPT-5.6 Sol",
        modelFamily: "openai",
        isDisabled: false,
      },
    ],
  };
  const disabled = notionModels.listNotionDisabledModels(payload);
  assert.equal(disabled.length, 1);
  assert.equal(disabled[0].id, "fable-5");
  assert.equal(disabled[0].name, "Fable 5");
  assert.equal(disabled[0].notionCodename, "acai-budino-high");
  assert.equal(disabled[0].reason, "business_or_enterprise_plan_required");

  const enabled = notionModels.parseNotionAvailableModels(payload);
  assert.equal(
    enabled.some((m) => m.id === "fable-5" || m.id === "acai-budino-high"),
    false
  );
  assert.ok(enabled.some((m) => m.id === "gpt-5.6-sol"));

  const warning = notionModels.formatNotionDisabledModelsWarning(disabled);
  assert.match(warning, /Fable 5/i);
  assert.match(warning, /business or enterprise/i);
});

test("parseNotionAvailableModels returns empty for invalid payloads", () => {
  assert.deepEqual(notionModels.parseNotionAvailableModels(null), []);
  assert.deepEqual(notionModels.parseNotionAvailableModels({}), []);
  assert.deepEqual(notionModels.parseNotionAvailableModels({ models: "nope" }), []);
});

test("cookie helpers extract space_id and user id", () => {
  const cookie =
    "token_v2=abc; space_id=5e43fbd2-c09b-815a-8045-000311a1f620; notion_user_id=28bd872b-594c-81cb-9638-0002a411fd83";
  assert.equal(
    notionModels.extractSpaceIdFromNotionCookie(cookie),
    "5e43fbd2-c09b-815a-8045-000311a1f620"
  );
  assert.equal(
    notionModels.extractNotionUserIdFromCookie(cookie),
    "28bd872b-594c-81cb-9638-0002a411fd83"
  );
  assert.equal(notionModels.normalizeNotionWebCookie("baretoken"), "token_v2=baretoken");
  // CamelCase spaceId= must still resolve (case-insensitive name match).
  assert.equal(
    notionModels.extractSpaceIdFromNotionCookie("token_v2=x; spaceId=space-camel"),
    "space-camel"
  );
  // Malformed % sequences must not throw.
  assert.equal(notionModels.readCookieValue("token_v2=%E0%A4%A", "token_v2"), "%E0%A4%A");
});

test("pickFirstSpaceId reads nested getSpaces shape", () => {
  const data = {
    "user-1": {
      space: {
        "space-aaa": { name: "Work" },
        "space-bbb": { name: "Personal" },
      },
    },
  };
  assert.equal(notionModels.pickFirstSpaceId(data), "space-aaa");
});

test("discoverNotionWebModels posts getAvailableModels with spaceId from cookie", async () => {
  const calls: Array<{ url: string; body: string }> = [];
  const fetchImpl = (async (url: string | URL, init?: RequestInit) => {
    calls.push({ url: String(url), body: String(init?.body || "") });
    return Response.json(SAMPLE_RESPONSE);
  }) as typeof fetch;

  const result = await notionModels.discoverNotionWebModels({
    token: "token_v2=xyz; space_id=space-from-cookie",
    fetchImpl,
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, notionModels.NOTION_MODELS_URL);
  assert.equal(JSON.parse(calls[0].body).spaceId, "space-from-cookie");
  assert.ok(result.models.some((m) => m.id === "gpt-5.6-sol"));
  assert.equal(result.source, "api");
});

test("discoverNotionWebModels falls back to getSpaces when space_id missing", async () => {
  const calls: string[] = [];
  const fetchImpl = (async (url: string | URL) => {
    calls.push(String(url));
    if (String(url).includes("getSpaces")) {
      return Response.json({
        u1: { space: { "resolved-space": { name: "WS" } } },
      });
    }
    return Response.json(SAMPLE_RESPONSE);
  }) as typeof fetch;

  const result = await notionModels.discoverNotionWebModels({
    token: "token_v2=xyz",
    fetchImpl,
  });

  assert.equal(calls[0], notionModels.NOTION_SPACES_URL);
  assert.ok(calls.some((u) => u === notionModels.NOTION_MODELS_URL));
  assert.equal(result.spaceId, "resolved-space");
  assert.ok(result.models.length >= 2);
  assert.equal(result.spaceIdFromGetSpaces, true);
});

test("parseNotionGetSpaces extracts userId and all space ids", () => {
  const data = {
    "user-aaa": {
      space: {
        "space-1": { name: "Work" },
        "space-2": { name: "Personal" },
      },
    },
  };
  const parsed = notionModels.parseNotionGetSpaces(data);
  assert.equal(parsed.userId, "user-aaa");
  assert.deepEqual(parsed.spaceIds, ["space-1", "space-2"]);
});

test("selectBestNotionSpaceId prefers the workspace with more enabled models", async () => {
  const fetchImpl = (async (url: string | URL, init?: RequestInit) => {
    if (String(url).includes("getAvailableModels")) {
      const body = JSON.parse(String(init?.body || "{}"));
      if (body.spaceId === "rich-space") return Response.json(SAMPLE_RESPONSE);
      return Response.json({
        models: [
          {
            model: "only-one",
            modelMessage: "Tiny",
            modelFamily: "openai",
            isDisabled: false,
          },
        ],
      });
    }
    return new Response("nope", { status: 500 });
  }) as typeof fetch;

  const best = await notionModels.selectBestNotionSpaceId({
    cookie: "token_v2=abc",
    spaceIds: ["poor-space", "rich-space"],
    fetchImpl,
  });
  assert.ok(best);
  assert.equal(best!.spaceId, "rich-space");
  assert.ok(best!.models.some((m) => m.id === "gpt-5.6-sol"));
});

test("selectBestNotionSpaceId prefers workspace where Fable is enabled over locked", async () => {
  const locked = {
    models: [
      {
        model: "orange-mousse",
        modelMessage: "GPT-5.6 Sol",
        modelFamily: "openai",
        isDisabled: false,
      },
      {
        model: "acai-budino-high",
        modelMessage: "Fable 5",
        modelFamily: "anthropic",
        isDisabled: true,
        disabledReason: "business_or_enterprise_plan_required",
      },
    ],
  };
  const unlocked = {
    models: [
      {
        model: "orange-mousse",
        modelMessage: "GPT-5.6 Sol",
        modelFamily: "openai",
        isDisabled: false,
      },
      {
        model: "acai-budino-high",
        modelMessage: "Fable 5",
        modelFamily: "anthropic",
        isDisabled: false,
      },
    ],
  };
  const fetchImpl = (async (_url: string | URL, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body || "{}"));
    // First space looks rich enough that a buggy early-exit would pick it.
    if (body.spaceId === "personal-locked") return Response.json(locked);
    if (body.spaceId === "business-unlocked") return Response.json(unlocked);
    return new Response("nope", { status: 500 });
  }) as typeof fetch;

  const best = await notionModels.selectBestNotionSpaceId({
    cookie: "token_v2=abc",
    spaceIds: ["personal-locked", "business-unlocked"],
    fetchImpl,
  });
  assert.ok(best);
  assert.equal(best!.spaceId, "business-unlocked");
  assert.ok(best!.models.some((m) => m.id === "fable-5"));
});

test("notion-web models route returns live getAvailableModels catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "notion-web",
    authType: "apikey",
    name: "notion-web-discovery",
    apiKey: "token_v2=sess; space_id=space-live-1",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url);
    if (u.includes("getAvailableModels")) {
      assert.equal(init?.method, "POST");
      const body = JSON.parse(String(init?.body || "{}"));
      assert.equal(body.spaceId, "space-live-1");
      const headers = init?.headers as Record<string, string>;
      assert.match(String(headers.cookie || headers.Cookie || ""), /token_v2=sess/);
      // Browser fingerprint headers present on models-discovery requests.
      assert.ok(headers["sec-ch-ua"], "sec-ch-ua should be present");
      assert.ok(headers["sec-fetch-mode"], "sec-fetch-mode should be present");
      assert.equal(headers["sec-fetch-mode"], "cors");
      assert.equal(headers["cache-control"], "no-cache");
      return Response.json(SAMPLE_RESPONSE);
    }
    return new Response("unexpected", { status: 500 });
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.source, "api");
    const ids = body.models.map((m: { id: string }) => m.id);
    // Real picker labels, not food codenames.
    assert.ok(ids.includes("gpt-5.6-sol"));
    assert.ok(ids.includes("opus-4.8"));
    assert.equal(ids.includes("orange-mousse"), false);
    assert.equal(ids.includes("ambrosia-tart-high"), false);
    assert.equal(ids.includes("disabled-model"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
