/**
 * Characterization — src/lib/cloudAgent (rail 3.8.55, pre-v4 extraction to @omniroute/mod-*).
 *
 * Pins the PUBLIC surface and the observable behaviour of the cloud-agent subsystem as it is
 * today, so the v4 extraction can be proven byte-for-byte. These tests describe current
 * behaviour, not desired behaviour: when a quirk is pinned the test name says so
 * ("characterization: … currently …"). Updating a surface snapshot is a conscious decision —
 * never regenerate the literal lists automatically.
 *
 * External consumers (the real boundary): src/app/api/v1/agents/{tasks,tasks/[id],credentials,
 * health}/route.ts, the orchestration dashboard (type-only imports of CloudAgentTask) and
 * src/lib/providers/validation/webProvidersB.ts (buildJulesApiUrl).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-char-cloudagent-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "char-cloudagent-test-secret";

const core = await import("../../src/lib/db/core.ts");
const indexMod = await import("../../src/lib/cloudAgent/index.ts");
const registryMod = await import("../../src/lib/cloudAgent/registry.ts");
const baseAgentMod = await import("../../src/lib/cloudAgent/baseAgent.ts");
const typesMod = await import("../../src/lib/cloudAgent/types.ts");
const dbMod = await import("../../src/lib/cloudAgent/db.ts");
const apiMod = await import("../../src/lib/cloudAgent/api.ts");
const credentialsMod = await import("../../src/lib/cloudAgent/credentials.ts");
const julesApiMod = await import("../../src/lib/cloudAgent/julesApi.ts");
const julesMod = await import("../../src/lib/cloudAgent/agents/jules.ts");
const devinMod = await import("../../src/lib/cloudAgent/agents/devin.ts");
const codexMod = await import("../../src/lib/cloudAgent/agents/codex.ts");
const cursorMod = await import("../../src/lib/cloudAgent/agents/cursor.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const CREDS = { apiKey: "key_char_123" };
const SOURCE = { repoName: "acme/widgets", repoUrl: "https://github.com/acme/widgets" };

type FetchCall = { url: string; init?: RequestInit };

function withFakeFetch(
  handler: (url: string, init?: RequestInit) => Response | Promise<Response>
): { calls: FetchCall[]; restore: () => void } {
  const original = globalThis.fetch;
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    return handler(url, init);
  }) as typeof fetch;
  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

function headerOf(init: RequestInit | undefined, name: string): string | undefined {
  const headers = (init?.headers ?? {}) as Record<string, string>;
  return headers[name];
}

// ─── (a) Surface snapshots ───────────────────────────────────────────────────

test("surface: cloudAgent/index.ts barrel exports", () => {
  assert.deepEqual(Object.keys(indexMod).sort(), [
    "CLOUD_AGENT_STATUS",
    "CloudAgentBase",
    "CloudAgentSourceSchema",
    "CloudAgentStatusSchema",
    "CloudAgentTaskOptionsSchema",
    "CodexCloudAgent",
    "CreateCloudAgentTaskSchema",
    "CursorCloudAgent",
    "DevinAgent",
    "JulesAgent",
    "UpdateCloudAgentTaskSchema",
    "createCloudAgentTaskTable",
    "deleteCloudAgentTask",
    "getAgent",
    "getAllCloudAgentTasks",
    "getAvailableAgents",
    "getCloudAgentTaskById",
    "getCloudAgentTasksByProvider",
    "getCloudAgentTasksByStatus",
    "insertCloudAgentTask",
    "isCloudAgentProvider",
    "updateCloudAgentTask",
  ]);
});

test("surface: cloudAgent per-module runtime exports", () => {
  const surfaces: Record<string, string[]> = {
    registry: Object.keys(registryMod).sort(),
    baseAgent: Object.keys(baseAgentMod).sort(),
    types: Object.keys(typesMod).sort(),
    db: Object.keys(dbMod).sort(),
    api: Object.keys(apiMod).sort(),
    credentials: Object.keys(credentialsMod).sort(),
    julesApi: Object.keys(julesApiMod).sort(),
    jules: Object.keys(julesMod).sort(),
    devin: Object.keys(devinMod).sort(),
    codex: Object.keys(codexMod).sort(),
    cursor: Object.keys(cursorMod).sort(),
  };
  assert.deepEqual(surfaces, {
    registry: [
      "CodexCloudAgent",
      "CursorCloudAgent",
      "DevinAgent",
      "JulesAgent",
      "getAgent",
      "getAvailableAgents",
      "isCloudAgentProvider",
    ],
    baseAgent: ["CloudAgentBase"],
    types: [
      "CLOUD_AGENT_STATUS",
      "CloudAgentSourceSchema",
      "CloudAgentStatusSchema",
      "CloudAgentTaskOptionsSchema",
      "CreateCloudAgentTaskSchema",
      "UpdateCloudAgentTaskSchema",
    ],
    db: [
      "createCloudAgentTaskTable",
      "deleteCloudAgentTask",
      "getAllCloudAgentTasks",
      "getCloudAgentTaskById",
      "getCloudAgentTasksByProvider",
      "getCloudAgentTasksByStatus",
      "insertCloudAgentTask",
      "updateCloudAgentTask",
    ],
    api: [
      "getCloudAgentCorsHeaders",
      "getCloudAgentCredentials",
      "requireCloudAgentManagementAuth",
      "serializeCloudAgentTask",
      "withCloudAgentCors",
    ],
    credentials: [
      "deleteCloudAgentCredential",
      "getCloudAgentCredentialFromDb",
      "listCloudAgentCredentials",
      "maskApiKey",
      "saveCloudAgentCredential",
    ],
    julesApi: ["JULES_API_BASE_URL", "buildJulesApiUrl"],
    jules: ["JulesAgent"],
    devin: ["DevinAgent"],
    codex: ["CodexCloudAgent"],
    cursor: ["CursorCloudAgent"],
  });
});

test("surface: CLOUD_AGENT_STATUS values and status schema options", () => {
  assert.deepEqual(typesMod.CLOUD_AGENT_STATUS, {
    QUEUED: "queued",
    RUNNING: "running",
    AWAITING_APPROVAL: "awaiting_approval",
    COMPLETED: "completed",
    FAILED: "failed",
    CANCELLED: "cancelled",
  });
  assert.deepEqual(typesMod.CloudAgentStatusSchema.options, [
    "queued",
    "running",
    "awaiting_approval",
    "completed",
    "failed",
    "cancelled",
  ]);
});

// ─── (b) Contracts — registry ────────────────────────────────────────────────

test("registry: available agents, ids and base URLs", () => {
  assert.deepEqual(registryMod.getAvailableAgents(), [
    "jules",
    "devin",
    "codex-cloud",
    "cursor-cloud",
  ]);
  const shape = registryMod.getAvailableAgents().map((id) => {
    const agent = registryMod.getAgent(id);
    return [id, agent?.providerId, agent?.baseUrl, agent instanceof baseAgentMod.CloudAgentBase];
  });
  assert.deepEqual(shape, [
    ["jules", "jules", "https://jules.googleapis.com/v1alpha", true],
    ["devin", "devin", "https://api.devin.ai/v1", true],
    ["codex-cloud", "codex-cloud", "https://api.openai.com/v1", true],
    ["cursor-cloud", "cursor-cloud", "https://api.cursor.com/v0", true],
  ]);
  // getAgent returns the same singleton on every call.
  assert.equal(registryMod.getAgent("jules"), registryMod.getAgent("jules"));
});

test("registry: unknown provider → getAgent null, isCloudAgentProvider false", () => {
  assert.equal(registryMod.getAgent("nope"), null);
  assert.equal(registryMod.isCloudAgentProvider("nope"), false);
  // The OAuth chat provider `cursor` is NOT a cloud agent (only `cursor-cloud` is).
  assert.equal(registryMod.isCloudAgentProvider("cursor"), false);
});

test("characterization: isCloudAgentProvider currently matches Object.prototype keys (uses `in`)", () => {
  // `providerId in AGENTS` walks the prototype chain, so inherited names report true while
  // getAgent() (property read || null) returns a non-agent function for them.
  assert.equal(registryMod.isCloudAgentProvider("toString"), true);
  assert.equal(typeof registryMod.getAgent("toString"), "function");
});

test("julesApi: buildJulesApiUrl normalises the leading slash", () => {
  assert.equal(julesApiMod.JULES_API_BASE_URL, "https://jules.googleapis.com/v1alpha");
  assert.equal(
    julesApiMod.buildJulesApiUrl("sessions"),
    "https://jules.googleapis.com/v1alpha/sessions"
  );
  assert.equal(
    julesApiMod.buildJulesApiUrl("/sources"),
    "https://jules.googleapis.com/v1alpha/sources"
  );
});

// ─── (b) Contracts — listSources (fake fetch) ────────────────────────────────

test("listSources(jules): GET /sources with X-Goog-Api-Key, maps owner/repo/branch", async () => {
  const fake = withFakeFetch(() =>
    Response.json({
      sources: [
        {
          name: "sources/github/acme/widgets",
          githubRepo: { owner: "acme", repo: "widgets", defaultBranch: "main" },
        },
        {
          githubRepo: { owner: "acme", repo: "gears" },
          githubRepoContext: { startingBranch: " dev " },
        },
        { name: "orphan" },
      ],
    })
  );
  try {
    const sources = await registryMod.getAgent("jules")!.listSources(CREDS);
    assert.deepEqual(sources, [
      {
        name: "sources/github/acme/widgets",
        url: "https://github.com/acme/widgets",
        branch: "main",
      },
      { name: "acme/gears", url: "https://github.com/acme/gears", branch: "dev" },
      { name: "orphan", url: "" },
    ]);
    assert.equal(fake.calls.length, 1);
    assert.equal(fake.calls[0].url, "https://jules.googleapis.com/v1alpha/sources");
    assert.equal(headerOf(fake.calls[0].init, "X-Goog-Api-Key"), "key_char_123");
  } finally {
    fake.restore();
  }
});

test("listSources(cursor-cloud): GET /repositories with Bearer, drops url-less entries", async () => {
  const fake = withFakeFetch(() =>
    Response.json({
      repositories: [
        { url: "https://github.com/acme/widgets" },
        { repository: "https://github.com/acme/gears", name: "Gears" },
        { name: "no-url" },
      ],
    })
  );
  try {
    const sources = await registryMod
      .getAgent("cursor-cloud")!
      .listSources({ apiKey: "k", baseUrl: "https://cursor.example/v9/" });
    assert.deepEqual(sources, [
      { name: "acme/widgets", url: "https://github.com/acme/widgets" },
      { name: "Gears", url: "https://github.com/acme/gears" },
    ]);
    // Per-credential baseUrl override wins and its trailing slash is stripped.
    assert.equal(fake.calls[0].url, "https://cursor.example/v9/repositories");
    assert.equal(headerOf(fake.calls[0].init, "Authorization"), "Bearer k");
  } finally {
    fake.restore();
  }
});

test("listSources(devin|codex-cloud): static empty list, no network call", async () => {
  const fake = withFakeFetch(() => Response.json({}));
  try {
    assert.deepEqual(await registryMod.getAgent("devin")!.listSources(CREDS), []);
    assert.deepEqual(await registryMod.getAgent("codex-cloud")!.listSources(CREDS), []);
    assert.equal(fake.calls.length, 0);
  } finally {
    fake.restore();
  }
});

test("characterization: listSources(cursor-cloud) currently swallows a non-OK upstream as []", async () => {
  const fake = withFakeFetch(() => new Response("denied", { status: 401 }));
  try {
    assert.deepEqual(await registryMod.getAgent("cursor-cloud")!.listSources(CREDS), []);
  } finally {
    fake.restore();
  }
});

test("listSources(jules): non-OK upstream throws with status + body", async () => {
  const fake = withFakeFetch(() => new Response("denied", { status: 403 }));
  try {
    await assert.rejects(registryMod.getAgent("jules")!.listSources(CREDS), {
      message: "Jules list sources failed: 403 denied",
    });
  } finally {
    fake.restore();
  }
});

// ─── (b) Contracts — createTask (fake fetch) ─────────────────────────────────

const TASK_ID_RE = /^task_\d+_[0-9a-f]{16}$/;

test("createTask(jules): POST /sessions body shape and returned task", async () => {
  const fake = withFakeFetch(() => Response.json({ name: "sessions/abc123" }));
  try {
    const task = await registryMod.getAgent("jules")!.createTask(
      {
        prompt: "fix it",
        source: { ...SOURCE, repoUrl: "github.com/acme/widgets.git" },
        options: { autoCreatePr: true, planApprovalRequired: true },
      },
      CREDS
    );
    assert.match(task.id, TASK_ID_RE);
    assert.equal(task.providerId, "jules");
    assert.equal(task.externalId, "abc123", "name `sessions/<id>` is normalised to <id>");
    assert.equal(task.status, "queued");
    assert.deepEqual(task.activities, []);
    assert.equal(task.createdAt, task.updatedAt);

    assert.equal(fake.calls[0].url, "https://jules.googleapis.com/v1alpha/sessions");
    assert.equal(fake.calls[0].init?.method, "POST");
    assert.equal(headerOf(fake.calls[0].init, "Content-Type"), "application/json");
    assert.deepEqual(JSON.parse(String(fake.calls[0].init?.body)), {
      prompt: "fix it",
      title: "acme/widgets",
      sourceContext: {
        source: "sources/github/acme/widgets",
        githubRepoContext: { startingBranch: "main" },
      },
      automationMode: "AUTO_CREATE_PR",
      requirePlanApproval: true,
    });
  } finally {
    fake.restore();
  }
});

test("createTask(devin): POST /sessions, status mapped through base mapStatus", async () => {
  const fake = withFakeFetch(() => Response.json({ id: "devin-1", status: "running" }));
  try {
    const task = await registryMod
      .getAgent("devin")!
      .createTask({ prompt: "p", source: { ...SOURCE, branch: "feat" }, options: {} }, CREDS);
    assert.equal(task.externalId, "devin-1");
    assert.equal(task.status, "running");
    assert.equal(fake.calls[0].url, "https://api.devin.ai/v1/sessions");
    assert.equal(headerOf(fake.calls[0].init, "Authorization"), "Bearer key_char_123");
    assert.deepEqual(JSON.parse(String(fake.calls[0].init?.body)), {
      prompt: "p",
      repo_url: "https://github.com/acme/widgets",
      branch: "feat",
    });
  } finally {
    fake.restore();
  }
});

test("createTask: non-OK upstream throws '<Agent> create task failed: <status> <body>'", async () => {
  const fake = withFakeFetch(() => new Response("bad key", { status: 401 }));
  try {
    await assert.rejects(
      registryMod
        .getAgent("jules")!
        .createTask({ prompt: "p", source: SOURCE, options: {} }, CREDS),
      { message: "Jules create task failed: 401 bad key" }
    );
    await assert.rejects(
      registryMod
        .getAgent("devin")!
        .createTask({ prompt: "p", source: SOURCE, options: {} }, CREDS),
      { message: "Devin create task failed: 401 bad key" }
    );
    await assert.rejects(
      registryMod
        .getAgent("codex-cloud")!
        .createTask({ prompt: "p", source: SOURCE, options: {} }, CREDS),
      { message: "Codex Cloud create task failed: 401 bad key" }
    );
    await assert.rejects(
      registryMod
        .getAgent("cursor-cloud")!
        .createTask({ prompt: "p", source: SOURCE, options: {} }, CREDS),
      { message: "Cursor create agent failed: 401 bad key" }
    );
  } finally {
    fake.restore();
  }
});

// ─── (b) Contracts — getStatus / approvePlan ─────────────────────────────────

test("getStatus(jules): plan generated but not approved → awaiting_approval", async () => {
  const fake = withFakeFetch((url) =>
    url.includes("/activities")
      ? Response.json({
          activities: [
            {
              id: "a1",
              createTime: "2026-01-01T00:00:00Z",
              planGenerated: { plan: { steps: [{ title: "Step A" }, { title: "Step B" }] } },
            },
          ],
        })
      : Response.json({ state: "RUNNING" })
  );
  try {
    const status = await registryMod.getAgent("jules")!.getStatus("sessions/s1", CREDS);
    assert.deepEqual(status, {
      status: "awaiting_approval",
      externalId: "s1",
      result: undefined,
      activities: [
        { id: "a1", type: "plan", content: "Step A\nStep B", timestamp: "2026-01-01T00:00:00Z" },
      ],
      error: undefined,
    });
    assert.deepEqual(fake.calls.map((c) => c.url).sort(), [
      "https://jules.googleapis.com/v1alpha/sessions/s1",
      "https://jules.googleapis.com/v1alpha/sessions/s1/activities?pageSize=30",
    ]);
  } finally {
    fake.restore();
  }
});

test("getStatus(jules): a pull-request output wins → completed with result", async () => {
  const fake = withFakeFetch((url) =>
    url.includes("/activities")
      ? new Response("nope", { status: 500 }) // activities failure is tolerated
      : Response.json({
          state: "FAILED",
          outputs: [{ pullRequest: { url: "https://gh/pr/1", title: "T", description: "D" } }],
        })
  );
  try {
    const status = await registryMod.getAgent("jules")!.getStatus("s2", CREDS);
    assert.equal(status.status, "completed");
    assert.deepEqual(status.result, { prUrl: "https://gh/pr/1", commitMessage: "D", summary: "T" });
    assert.deepEqual(status.activities, []);
  } finally {
    fake.restore();
  }
});

test("base mapStatus prioritizes approval over a generic pending status", async () => {
  // Devin routes its raw status through CloudAgentBase.mapStatus (substring matcher).
  const cases: Array<[string, string]> = [
    ["completed", "completed"],
    ["DONE", "completed"],
    ["errored", "failed"],
    ["canceled", "cancelled"],
    ["executing", "running"],
    ["waiting", "queued"],
    ["needs plan review", "awaiting_approval"],
    ["pending approval", "awaiting_approval"],
    ["something-else", "queued"],
  ];
  const seen: Array<[string, string]> = [];
  for (const [raw] of cases) {
    const fake = withFakeFetch(() => Response.json({ status: raw }));
    try {
      const status = await registryMod.getAgent("devin")!.getStatus("x", CREDS);
      seen.push([raw, status.status]);
    } finally {
      fake.restore();
    }
  }
  assert.deepEqual(seen, cases);
});

test("approvePlan: unsupported agents reject with a fixed message", async () => {
  await assert.rejects(registryMod.getAgent("devin")!.approvePlan("x", CREDS), {
    message: "Devin does not support plan approval - it auto-plans",
  });
  await assert.rejects(registryMod.getAgent("codex-cloud")!.approvePlan("x", CREDS), {
    message: "Codex Cloud does not support plan approval - it auto-plans",
  });
  await assert.rejects(registryMod.getAgent("cursor-cloud")!.approvePlan("x", CREDS), {
    message: "Cursor Cloud Agents run autonomously and do not support plan approval",
  });
});

// ─── (b) Contracts — db + api serialisation ──────────────────────────────────

function row(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    id: "t-1",
    provider_id: "jules",
    external_id: "ext-1",
    status: "queued",
    prompt: "p",
    source: JSON.stringify(SOURCE),
    options: "{}",
    result: null,
    activities: "[]",
    error: null,
    created_at: "2026-01-01 00:00:00",
    updated_at: "2026-01-01 00:00:00",
    completed_at: null,
    ...overrides,
  } as Parameters<typeof dbMod.insertCloudAgentTask>[0];
}

test("db: insert/get/list/update/delete round trip", () => {
  dbMod.createCloudAgentTaskTable(); // idempotent (index.ts already ran it on import)
  dbMod.insertCloudAgentTask(row());
  assert.equal(dbMod.getCloudAgentTaskById("t-1")?.status, "queued");
  assert.equal(dbMod.getCloudAgentTasksByProvider("jules").length, 1);
  assert.equal(dbMod.getCloudAgentTasksByStatus("queued").length, 1);
  assert.equal(dbMod.getAllCloudAgentTasks().length, 1);

  dbMod.updateCloudAgentTask("t-1", { status: "running", error: "e" });
  const updated = dbMod.getCloudAgentTaskById("t-1");
  assert.equal(updated?.status, "running");
  assert.equal(updated?.error, "e");

  dbMod.deleteCloudAgentTask("t-1");
  assert.equal(dbMod.getCloudAgentTaskById("t-1") ?? null, null);
});

test("characterization: updateCloudAgentTask silently ignores non-whitelisted columns", () => {
  dbMod.insertCloudAgentTask(row({ id: "t-2" }));
  dbMod.updateCloudAgentTask("t-2", {
    provider_id: "devin",
    external_id: "other",
  } as Parameters<typeof dbMod.updateCloudAgentTask>[1]);
  const after = dbMod.getCloudAgentTaskById("t-2");
  assert.equal(after?.provider_id, "jules");
  assert.equal(after?.external_id, "ext-1");
  // Updating a missing id is a silent no-op as well.
  assert.doesNotThrow(() => dbMod.updateCloudAgentTask("missing", { status: "failed" }));
  dbMod.deleteCloudAgentTask("t-2");
});

test("serializeCloudAgentTask: camelCase shape, malformed JSON falls back to defaults", () => {
  const out = apiMod.serializeCloudAgentTask(
    row({ source: "{not json", options: "", activities: "oops", result: "also bad" })
  );
  assert.deepEqual(out, {
    id: "t-1",
    providerId: "jules",
    externalId: "ext-1",
    status: "queued",
    prompt: "p",
    source: {},
    options: {},
    result: {},
    activities: [],
    error: null,
    createdAt: "2026-01-01 00:00:00",
    updatedAt: "2026-01-01 00:00:00",
    completedAt: null,
  });
  assert.equal(apiMod.serializeCloudAgentTask(row()).result, null);
});

test("getCloudAgentCorsHeaders: no Origin → no ACAO / credentials headers", () => {
  assert.deepEqual(apiMod.getCloudAgentCorsHeaders(), {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
});

test("getCloudAgentCredentials: no active provider connection → null", async () => {
  assert.equal(await apiMod.getCloudAgentCredentials("jules"), null);
});

// ─── (b)+(c) credentials + schemas ───────────────────────────────────────────

test("credentials: maskApiKey keeps the last 4 chars, short/empty → ****", () => {
  assert.equal(credentialsMod.maskApiKey("sk-abcdef1234"), "****1234");
  assert.equal(credentialsMod.maskApiKey("1234"), "****");
  assert.equal(credentialsMod.maskApiKey(""), "****");
});

test("credentials: save → get (decrypted) → list (masked) → delete", () => {
  assert.equal(credentialsMod.getCloudAgentCredentialFromDb("devin"), null);
  credentialsMod.saveCloudAgentCredential("devin", "devin-secret-9999", "https://d.example");
  assert.deepEqual(credentialsMod.getCloudAgentCredentialFromDb("devin"), {
    apiKey: "devin-secret-9999",
    baseUrl: "https://d.example",
  });
  credentialsMod.saveCloudAgentCredential("devin", "devin-secret-0000"); // upsert, baseUrl cleared
  assert.deepEqual(credentialsMod.getCloudAgentCredentialFromDb("devin"), {
    apiKey: "devin-secret-0000",
  });
  const listed = credentialsMod.listCloudAgentCredentials();
  assert.deepEqual(
    listed.map(({ providerId, apiKey, baseUrl }) => ({ providerId, apiKey, baseUrl })),
    [{ providerId: "devin", apiKey: "****0000", baseUrl: null }]
  );
  credentialsMod.deleteCloudAgentCredential("devin");
  assert.equal(credentialsMod.getCloudAgentCredentialFromDb("devin"), null);
});

test("CreateCloudAgentTaskSchema: invalid input is rejected (no throw on safeParse)", () => {
  const ok = typesMod.CreateCloudAgentTaskSchema.safeParse({
    providerId: "jules",
    prompt: "p",
    source: SOURCE,
  });
  assert.equal(ok.success, true);

  const bad = [
    { providerId: "cursor", prompt: "p", source: SOURCE },
    { providerId: "jules", prompt: "", source: SOURCE },
    { providerId: "jules", prompt: "x".repeat(10001), source: SOURCE },
    { providerId: "jules", prompt: "p", source: { repoName: "r", repoUrl: "not-a-url" } },
  ];
  for (const input of bad) {
    assert.equal(typesMod.CreateCloudAgentTaskSchema.safeParse(input).success, false);
  }
  assert.equal(
    typesMod.UpdateCloudAgentTaskSchema.safeParse({ id: "t", action: "pause" }).success,
    false
  );
});
