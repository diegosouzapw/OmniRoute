import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  AntigravityHandler,
  convertGeminiToOpenAI,
  mergeAntigravityCatalog,
} from "../../src/mitm/handlers/antigravity.ts";
import { ANTIGRAVITY_TARGET } from "../../src/mitm/targets/antigravity.ts";
import { runHandler } from "./_mitmHandlerHarness.ts";

// The last test below imports src/lib/db/combos.ts, which opens the real DATA_DIR
// SQLite database. Isolate it BEFORE that import runs so `node --import tsx/esm
// tests/unit/mitm-handler-antigravity.test.ts` (this file's own documented
// Validation command) never touches the operator's real home database.
const previousDataDir = process.env.DATA_DIR;
const isolatedDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "mitm-antigravity-"));
process.env.DATA_DIR = isolatedDataDir;

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  fs.rmSync(isolatedDataDir, { recursive: true, force: true });
});

test("antigravity handler — forwards to OmniRoute and pipes SSE", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] },
    "claude-3.5-sonnet",
    { upstreamBody: "data: hello\n\ndata: world\n\n" }
  );
  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  assert.ok(r.responseChunks.join("").includes("hello"));
});

test("antigravity handler — propagates upstream failure as 500", async () => {
  const r = await runHandler(new AntigravityHandler(), { model: "gpt-4o" }, "claude-3.5-sonnet", {
    upstreamStatus: 500,
    upstreamBody: "boom",
  });
  assert.equal(r.status, 500);
  const body = r.responseChunks.join("");
  // Error must NOT include raw stack trace (Hard Rule #12 sanitization).
  assert.ok(!body.includes("at /"));
});

test("convertGeminiToOpenAI — maps Gemini fields to OpenAI chat body", () => {
  const out = convertGeminiToOpenAI(
    {
      systemInstruction: { parts: [{ text: "be brief" }] },
      contents: [
        { role: "user", parts: [{ text: "hello" }] },
        { role: "model", parts: [{ text: "hi there" }] },
      ],
      generationConfig: {
        maxOutputTokens: 256,
        temperature: 0.4,
        topP: 0.9,
        stopSequences: ["STOP"],
      },
      // Gemini-only field that must NOT leak into the OpenAI body.
      thinkingConfig: { thinkingBudget: 1024 },
    } as Record<string, unknown>,
    "claude-opus-4-6-thinking",
    true
  );

  assert.equal(out.model, "claude-opus-4-6-thinking");
  assert.equal(out.stream, true);
  assert.deepEqual(out.messages, [
    { role: "system", content: "be brief" },
    { role: "user", content: "hello" },
    { role: "assistant", content: "hi there" },
  ]);
  assert.equal(out.max_tokens, 256);
  assert.equal(out.temperature, 0.4);
  assert.equal(out.top_p, 0.9);
  assert.deepEqual(out.stop, ["STOP"]);
  // Gemini-native fields must be stripped, not forwarded.
  assert.equal((out as Record<string, unknown>).contents, undefined);
  assert.equal((out as Record<string, unknown>).generationConfig, undefined);
  assert.equal((out as Record<string, unknown>).thinkingConfig, undefined);
});

test("antigravity handler — converts raw Gemini body before forwarding", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    {
      contents: [{ role: "user", parts: [{ text: "ping" }] }],
      generationConfig: { maxOutputTokens: 64 },
      thinkingConfig: { thinkingBudget: 512 },
    },
    "ag-claude-opus-4-6-thinking",
    {
      upstreamBody: "data: pong\n\n",
      url: "/v1beta/models/gemini:streamGenerateContent",
    }
  );

  assert.ok(r.fetchCalled);
  const forwarded = JSON.parse(r.fetchBody);
  // The router must receive OpenAI format, not the raw Gemini body.
  assert.equal(forwarded.model, "ag-claude-opus-4-6-thinking");
  assert.equal(forwarded.stream, true);
  assert.deepEqual(forwarded.messages, [{ role: "user", content: "ping" }]);
  assert.equal(forwarded.max_tokens, 64);
  // Gemini-native fields that caused upstream 400s must be gone.
  assert.equal(forwarded.contents, undefined);
  assert.equal(forwarded.generationConfig, undefined);
  assert.equal(forwarded.thinkingConfig, undefined);
});

test("convertGeminiToOpenAI — unwraps the cloudcode-pa `.request` envelope (#4294)", () => {
  // Shape the real Antigravity IDE sends to cloudcode-pa /v1internal:generateContent.
  const out = convertGeminiToOpenAI(
    {
      project: "projects/123",
      model: "gemini-3-pro",
      userAgent: "Antigravity",
      requestType: "GENERATE",
      request: {
        systemInstruction: { parts: [{ text: "be brief" }] },
        contents: [
          { role: "user", parts: [{ text: "hello" }] },
          { role: "model", parts: [{ text: "hi there" }] },
        ],
        generationConfig: { maxOutputTokens: 256, temperature: 0.4 },
      },
    } as Record<string, unknown>,
    "ag-claude-opus-4-6-thinking",
    true
  );

  assert.equal(out.model, "ag-claude-opus-4-6-thinking");
  // Without the unwrap these would be empty → upstream gets an empty conversation → hang.
  assert.deepEqual(out.messages, [
    { role: "system", content: "be brief" },
    { role: "user", content: "hello" },
    { role: "assistant", content: "hi there" },
  ]);
  assert.equal(out.max_tokens, 256);
  assert.equal(out.temperature, 0.4);
});

test("antigravity handler — forwards a cloudcode envelope request with real messages (#4294)", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    {
      project: "projects/123",
      model: "gemini-3-pro",
      request: {
        contents: [{ role: "user", parts: [{ text: "ping" }] }],
        generationConfig: { maxOutputTokens: 64 },
      },
    },
    "ag-claude-opus-4-6-thinking",
    {
      upstreamBody: "data: pong\n\n",
      url: "/v1internal:streamGenerateContent",
    }
  );

  assert.ok(r.fetchCalled);
  const forwarded = JSON.parse(r.fetchBody);
  assert.equal(forwarded.model, "ag-claude-opus-4-6-thinking");
  assert.equal(forwarded.stream, true);
  // The prompt must survive the conversion (the hang was an empty messages array).
  assert.deepEqual(forwarded.messages, [{ role: "user", content: "ping" }]);
  assert.equal(forwarded.max_tokens, 64);
  // Envelope wrapper fields must not leak into the OpenAI body.
  assert.equal(forwarded.request, undefined);
  assert.equal(forwarded.project, undefined);
});

test("antigravity handler — non-streaming URL yields stream:false", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
    "gpt-4o",
    { url: "/v1beta/models/gemini:generateContent" }
  );
  const forwarded = JSON.parse(r.fetchBody);
  assert.equal(forwarded.stream, false);
});

test("ANTIGRAVITY_TARGET — includes fetchAvailableModels in endpointPatterns", () => {
  assert.ok(
    ANTIGRAVITY_TARGET.endpointPatterns.includes("/v1internal:fetchAvailableModels"),
    "ANTIGRAVITY_TARGET must declare /v1internal:fetchAvailableModels in endpointPatterns"
  );
});

test("mergeAntigravityCatalog — merges dynamic models and prepends to agentModelSorts", () => {
  const upstreamCatalog = {
    models: {
      "claude-sonnet-4-6": {
        displayName: "Claude 3.7 Sonnet",
        descriptionText: "Anthropic Claude 3.7 Sonnet",
        quotaInfo: { remainingFraction: 1.0, resetTime: "2026-09-18T00:00:00Z" },
      },
      "gemini-2.5-pro": {
        displayName: "Gemini 2.5 Pro",
        descriptionText: "Google Gemini 2.5 Pro",
        quotaInfo: { remainingFraction: 0.9, resetTime: "2026-09-18T00:00:00Z" },
      },
    },
    agentModelSorts: [
      {
        groups: [
          {
            modelIds: ["gemini-2.5-pro", "claude-sonnet-4-6"],
          },
        ],
      },
    ],
  };

  const dynamicModels = [
    {
      id: "coding-titans",
      displayName: "Coding Titans",
      description: "Deep Architecture & Complex Logic",
    },
    {
      id: "speed-demons",
      displayName: "Speed Demons",
      description: "Sub-second Daily Coding",
    },
  ];

  const merged = mergeAntigravityCatalog(upstreamCatalog, dynamicModels);
  const models = merged.models as Record<string, Record<string, unknown>>;

  // Injected models must exist and have displayName/descriptionText
  assert.ok(models["coding-titans"]);
  assert.equal(models["coding-titans"].displayName, "Coding Titans");
  assert.equal(models["coding-titans"].descriptionText, "Deep Architecture & Complex Logic");
  // Template properties (like quotaInfo) must be cloned
  assert.deepEqual(models["coding-titans"].quotaInfo, {
    remainingFraction: 1.0,
    resetTime: "2026-09-18T00:00:00Z",
  });

  assert.ok(models["speed-demons"]);
  assert.equal(models["speed-demons"].displayName, "Speed Demons");

  // Native upstream models must be preserved
  assert.ok(models["claude-sonnet-4-6"]);
  assert.ok(models["gemini-2.5-pro"]);

  // Injected models must be prepended to agentModelSorts
  const sorts = merged.agentModelSorts as Array<{ groups: Array<{ modelIds: string[] }> }>;
  assert.deepEqual(sorts[0].groups[0].modelIds, [
    "coding-titans",
    "speed-demons",
    "gemini-2.5-pro",
    "claude-sonnet-4-6",
  ]);
});

test("mergeAntigravityCatalog — handles empty dynamicModels by returning catalog untouched", () => {
  const upstreamCatalog = {
    models: { "gemini-2.5-flash": { displayName: "Gemini 2.5 Flash" } },
  };
  const result = mergeAntigravityCatalog(upstreamCatalog, []);
  assert.equal(result, upstreamCatalog);
});

test("mergeAntigravityCatalog — handles missing agentModelSorts gracefully", () => {
  const upstreamCatalog = {
    models: {
      "gemini-2.5-flash": { displayName: "Gemini 2.5 Flash" },
    },
  };
  const dynamicModels = [{ id: "custom-combo", displayName: "Custom Combo" }];
  const merged = mergeAntigravityCatalog(upstreamCatalog, dynamicModels);
  const sorts = merged.agentModelSorts as Array<{ groups: Array<{ modelIds: string[] }> }>;
  assert.ok(Array.isArray(sorts));
  assert.deepEqual(sorts[0].groups[0].modelIds, ["custom-combo"]);
});

test("antigravity handler — intercepts fetchAvailableModels and returns merged catalog", async () => {
  const upstreamCatalog = {
    models: {
      "claude-sonnet-4-6": {
        displayName: "Claude 3.7 Sonnet",
        descriptionText: "Anthropic Claude 3.7 Sonnet",
      },
      "gemini-2.5-pro": {
        displayName: "Gemini 2.5 Pro",
        descriptionText: "Google Gemini 2.5 Pro",
      },
    },
    agentModelSorts: [
      {
        groups: [
          {
            modelIds: ["claude-sonnet-4-6", "gemini-2.5-pro"],
          },
        ],
      },
    ],
  };

  const dynamicModels = [
    {
      id: "coding-titans",
      displayName: "Coding Titans",
      description: "Deep Architecture",
    },
  ];

  const handler = new AntigravityHandler(dynamicModels);

  const r = await runHandler(handler, {}, "ag-claude-opus-4-6-thinking", {
    url: "/v1internal:fetchAvailableModels",
    upstreamBody: JSON.stringify(upstreamCatalog),
  });

  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  assert.ok(r.fetchUrl?.includes("/v1internal:fetchAvailableModels"));

  const responseJson = JSON.parse(r.responseChunks.join(""));
  assert.ok(responseJson.models["coding-titans"]);
  assert.equal(responseJson.models["coding-titans"].displayName, "Coding Titans");
  assert.ok(responseJson.models["claude-sonnet-4-6"]);
  assert.equal(responseJson.agentModelSorts[0].groups[0].modelIds[0], "coding-titans");
});

test("antigravity handler — propagates upstream error on fetchAvailableModels", async () => {
  const handler = new AntigravityHandler();

  const r = await runHandler(handler, {}, "ag-claude-opus-4-6-thinking", {
    url: "/v1internal:fetchAvailableModels",
    upstreamStatus: 502,
    upstreamBody: JSON.stringify({ error: "bad gateway" }),
  });

  assert.equal(r.status, 500);
  const body = r.responseChunks.join("");
  assert.ok(body.includes("mitm_error"));
  assert.ok(!body.includes("at /"));
});

test("antigravity handler — dynamic catalog pulls configured combos from database repository", async () => {
  const { createCombo, deleteCombo } = await import("../../src/lib/db/combos.ts");
  const testComboName = `test-combo-${Date.now()}`;
  await createCombo({
    id: testComboName,
    name: testComboName,
    description: "Test dynamic combo description",
    models: JSON.stringify(["google/gemini-2.5-flash"]),
    strategy: "priority",
  });

  try {
    const handler = new AntigravityHandler();
    const models = await handler.getDynamicCatalogModels();
    const found = models.find((m) => m.id === testComboName);
    assert.ok(found, `Expected ${testComboName} to be returned from dynamic catalog models`);
    assert.equal(found?.displayName, testComboName);
    assert.equal(found?.description, "Test dynamic combo description");
  } finally {
    await deleteCombo(testComboName);
  }
});

test("mergeAntigravityCatalog — preserves native model metadata and avoids collision when combo shares bare model id", () => {
  const upstreamCatalog = {
    models: {
      "gemini-2.5-pro": {
        displayName: "Native Gemini 2.5 Pro",
        descriptionText: "Google Official",
        isNative: true,
      },
    },
    agentModelSorts: [
      {
        groups: [
          {
            modelIds: ["gemini-2.5-pro"],
          },
        ],
      },
    ],
  };

  const dynamicModels = [
    {
      id: "gemini-2.5-pro",
      displayName: "Overwriting Combo",
      description: "Should not overwrite native",
    },
    {
      id: "coding-titans",
      displayName: "Coding Titans",
      description: "Non-colliding combo",
    },
  ];

  const merged = mergeAntigravityCatalog(upstreamCatalog, dynamicModels);
  const models = merged.models as Record<string, Record<string, unknown>>;

  // Native model must retain its original displayName and metadata
  assert.equal(models["gemini-2.5-pro"].displayName, "Native Gemini 2.5 Pro");
  assert.equal(models["gemini-2.5-pro"].descriptionText, "Google Official");
  assert.equal(models["gemini-2.5-pro"].isNative, true);

  // Non-colliding combo must be injected
  assert.ok(models["coding-titans"]);
  assert.equal(models["coding-titans"].displayName, "Coding Titans");
});

test("antigravity handler — filters out hidden and inactive combos from dynamic catalog", async () => {
  const { createCombo, deleteCombo } = await import("../../src/lib/db/combos.ts");
  const activeComboName = `active-combo-${Date.now()}`;
  const inactiveComboName = `inactive-combo-${Date.now()}`;

  await createCombo({
    id: activeComboName,
    name: activeComboName,
    description: "Active combo",
    models: JSON.stringify(["google/gemini-2.5-flash"]),
    strategy: "priority",
    isActive: true,
  });

  await createCombo({
    id: inactiveComboName,
    name: inactiveComboName,
    description: "Inactive combo",
    models: JSON.stringify(["google/gemini-2.5-flash"]),
    strategy: "priority",
    isActive: false,
  });

  try {
    const handler = new AntigravityHandler();
    const models = await handler.getDynamicCatalogModels();
    const activeFound = models.find((m) => m.id === activeComboName);
    const inactiveFound = models.find((m) => m.id === inactiveComboName);

    assert.ok(activeFound, "Active combo must be included in catalog");
    assert.equal(inactiveFound, undefined, "Inactive combo must be excluded from catalog");
  } finally {
    await deleteCombo(activeComboName);
    await deleteCombo(inactiveComboName);
  }
});
