import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

import { GET as getLegacyCard } from "../../src/app/.well-known/agent.json/route.ts";
import { GET as getCurrentCard } from "../../src/app/.well-known/agent-card.json/route.ts";
import { clearFleetSkillsCache, getFleetSkills } from "../../src/lib/conductor/fleetSkills.ts";
import { APP_CONFIG } from "../../src/shared/constants/appConfig.ts";

const STATIC_IDS = [
  "smart-routing",
  "quota-management",
  "provider-discovery",
  "cost-analysis",
  "health-report",
  "list-capabilities",
];
const ENV_KEYS = [
  "CONDUCTOR_HUB_URL",
  "CONDUCTOR_HUB_TOKEN",
  "OMNIROUTE_BASE_URL",
  "PORT",
  "DASHBOARD_PORT",
];
const originalEnv = new Map(ENV_KEYS.map((key) => [key, process.env[key]]));

function request(language?: string) {
  return new NextRequest("https://gateway.example.test/.well-known/agent.json", {
    headers: language ? { "accept-language": language } : {},
  });
}

async function cards(language?: string) {
  const legacy = await (await getLegacyCard(request(language))).json();
  const current = await (await getCurrentCard(request(language))).json();
  return { legacy, current };
}

test.beforeEach(() => {
  clearFleetSkillsCache();
  for (const key of ENV_KEYS) delete process.env[key];
});

test.after(() => {
  clearFleetSkillsCache();
  for (const [key, value] of originalEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("legacy discovery name and description use the same English as the current card", async () => {
  const { legacy, current } = await cards();
  assert.equal(legacy.name, "OmniRoute AI Gateway");
  assert.equal(legacy.name, current.name);
  assert.equal(legacy.description, current.description);
});

test("all six static skill descriptions and examples agree across card versions", async () => {
  const { legacy, current } = await cards();
  assert.deepEqual(
    legacy.skills.map((skill: { id: string }) => skill.id),
    STATIC_IDS
  );
  assert.deepEqual(legacy.skills, current.skills);
  assert.equal(legacy.skills[0].name, "Smart Request Routing");
});

test("list-capabilities describes the full catalog without an obsolete fixed count", async () => {
  const { legacy } = await cards();
  const entry = legacy.skills.find((skill: { id: string }) => skill.id === "list-capabilities");
  assert.equal(entry.name, "List Capabilities");
  assert.equal(entry.description, "Returns the full catalog of OmniRoute agent skills.");
  assert.deepEqual(entry.examples, ["What can you do?", "List your skills"]);
});

test("text alignment preserves the legacy protocol envelope and response headers", async () => {
  const response = await getLegacyCard(request());
  const card = await response.json();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "public, max-age=3600");
  assert.match(response.headers.get("content-type") ?? "", /^application\/json/);
  assert.equal(card.version, APP_CONFIG.version);
  assert.equal(card.url, "https://gateway.example.test/a2a");
  assert.deepEqual(card.capabilities, { streaming: true, pushNotifications: false });
  assert.deepEqual(card.authentication, {
    schemes: ["api-key"],
    apiKeyHeader: "Authorization",
  });
  assert.deepEqual(Object.keys(card).sort(), [
    "authentication",
    "capabilities",
    "description",
    "name",
    "skills",
    "url",
    "version",
  ]);
});

test("the admin URL override and direct-call fallback still use the existing origin rules", async () => {
  process.env.OMNIROUTE_BASE_URL = "https://public.example.test";
  const override = await (await getLegacyCard(request())).json();
  assert.equal(override.url, "https://public.example.test/a2a");
  delete process.env.OMNIROUTE_BASE_URL;
  process.env.PORT = "24688";
  const direct = await (await getLegacyCard()).json();
  assert.equal(direct.url, "http://localhost:24688/a2a");
  delete process.env.PORT;
  process.env.DASHBOARD_PORT = "24689";
  const dashboard = await (await getLegacyCard()).json();
  assert.equal(dashboard.url, "http://localhost:24689/a2a");
});

test("Accept-Language does not localize the owned discovery metadata", async () => {
  for (const language of ["zh-CN", "ja-JP"]) {
    const { legacy, current } = await cards(language);
    assert.equal(legacy.name, "OmniRoute AI Gateway");
    assert.deepEqual(legacy.skills, current.skills);
  }
});

test("both cards append real fleet-derived entries without translating external metadata", async () => {
  process.env.CONDUCTOR_HUB_URL = "https://synthetic-hub.example.test";
  process.env.CONDUCTOR_HUB_TOKEN = "synthetic-hub-token";
  let fetches = 0;
  const fleet = await getFleetSkills({
    fetchImpl: async (input, init) => {
      fetches++;
      assert.equal(String(input), "https://synthetic-hub.example.test/v1/runners");
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer synthetic-hub-token");
      return Response.json([
        {
          online: true,
          capabilities: { clis: [{ profile: "分析", models: [{ id: "模型" }] }], skills: ["計画"] },
        },
      ]);
    },
  });
  const { legacy, current } = await cards();
  assert.equal(fetches, 1);
  assert.equal(fleet.length, 2);
  assert.deepEqual(
    legacy.skills.slice(0, 6).map((skill: { id: string }) => skill.id),
    STATIC_IDS
  );
  assert.deepEqual(legacy.skills.slice(6), fleet);
  assert.deepEqual(current.skills.slice(6), fleet);
  assert.equal(legacy.skills[6].name, "Conductor fleet: 分析 CLI");
  assert.equal(legacy.skills[7].id, "conductor-skill-計画");
});

test("an unavailable fleet hub leaves all static discovery entries available", async () => {
  process.env.CONDUCTOR_HUB_URL = "https://synthetic-hub.example.test";
  const fleet = await getFleetSkills({
    fetchImpl: async () => {
      throw new Error("synthetic hub unavailable");
    },
  });
  assert.deepEqual(fleet, []);
  const { legacy } = await cards();
  assert.deepEqual(
    legacy.skills.map((skill: { id: string }) => skill.id),
    STATIC_IDS
  );
});
