import { describe, it } from "node:test";
import assert from "node:assert";
import {
  MimocodeExecutor,
  generateFingerprint,
  MIMO_SYSTEM_MARKER,
} from "../../open-sse/executors/mimocode.ts";

const executor = new MimocodeExecutor();

describe("MimocodeExecutor", () => {
  it("generateFingerprint returns a 64-char hex string", () => {
    const fp = generateFingerprint();
    assert.match(fp, /^[0-9a-f]{64}$/);
  });

  it("generateFingerprint is deterministic", () => {
    assert.strictEqual(generateFingerprint(), generateFingerprint());
  });

  it("generateFingerprint with seed is deterministic", () => {
    assert.strictEqual(generateFingerprint("seed-a"), generateFingerprint("seed-a"));
  });

  it("generateFingerprint with different seeds differs", () => {
    assert.notStrictEqual(generateFingerprint("seed-a"), generateFingerprint("seed-b"));
  });

  it("buildUrl returns the free-ai chat endpoint", () => {
    const url = executor.buildUrl("mimo-auto", false);
    assert.ok(url.includes("/api/free-ai/openai/chat"));
    assert.ok(url.startsWith("https://"));
  });

  it("buildHeaders includes X-Mimo-Source and Content-Type", () => {
    const headers = (executor as any).buildHeaders({}, true);
    assert.strictEqual(headers["Content-Type"], "application/json");
    assert.strictEqual(headers["X-Mimo-Source"], "mimocode-cli-free");
  });

  it("buildHeaders includes Accept for streaming", () => {
    const headers = (executor as any).buildHeaders({}, true);
    assert.ok(headers["Accept"]?.includes("text/event-stream"));
  });

  it("buildHeaders omits Accept for non-streaming", () => {
    const headers = (executor as any).buildHeaders({}, false);
    assert.ok(!headers["Accept"]?.includes("text/event-stream"));
  });

  it("transformRequest strips model prefix", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      { model: "mcode/mimo-auto", messages: [{ role: "user", content: "hi" }] },
      false
    );
    assert.strictEqual(result.model, "mimo-auto");
  });

  it("transformRequest passes model through when no prefix", () => {
    const result = (executor as any).transformRequest(
      "mimo-auto",
      { model: "mimo-auto", messages: [{ role: "user", content: "hi" }] },
      false
    );
    assert.strictEqual(result.model, "mimo-auto");
  });

  // The Xiaomi free endpoint rejects requests with `403 "Illegal access"` unless the
  // body contains a recognized MiMoCode prompt signature inside a `system`-role message.
  // The executor must inject that marker so user requests pass the upstream anti-abuse gate.
  it("transformRequest injects a MiMoCode system marker when none is present", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      { model: "mcode/mimo-auto", messages: [{ role: "user", content: "write a haiku" }] },
      true
    );
    assert.ok(Array.isArray(result.messages));
    const first = result.messages[0];
    assert.strictEqual(first.role, "system");
    assert.ok(
      typeof first.content === "string" && first.content.includes(MIMO_SYSTEM_MARKER),
      "first message must be a system message containing the MiMoCode marker"
    );
  });

  it("transformRequest preserves the original user message after injection", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      { model: "mcode/mimo-auto", messages: [{ role: "user", content: "write a haiku" }] },
      true
    );
    const userMsg = result.messages.find((m: any) => m.role === "user");
    assert.ok(userMsg);
    assert.strictEqual(userMsg.content, "write a haiku");
  });

  it("transformRequest preserves a caller-provided system prompt alongside the marker", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      {
        model: "mcode/mimo-auto",
        messages: [
          { role: "system", content: "You are a pirate." },
          { role: "user", content: "hi" },
        ],
      },
      true
    );
    const systemContents = result.messages
      .filter((m: any) => m.role === "system")
      .map((m: any) => m.content)
      .join("\n");
    assert.ok(systemContents.includes(MIMO_SYSTEM_MARKER), "marker present");
    assert.ok(systemContents.includes("You are a pirate."), "caller system prompt preserved");
  });

  it("transformRequest does not duplicate the marker when already present", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      {
        model: "mcode/mimo-auto",
        messages: [
          { role: "system", content: `${MIMO_SYSTEM_MARKER}\nExtra context.` },
          { role: "user", content: "hi" },
        ],
      },
      true
    );
    const count = result.messages.filter(
      (m: any) =>
        m.role === "system" &&
        typeof m.content === "string" &&
        m.content.includes(MIMO_SYSTEM_MARKER)
    ).length;
    assert.strictEqual(count, 1, "marker should not be duplicated");
  });

  it("transformRequest leaves a body without a messages array untouched", () => {
    const result = (executor as any).transformRequest(
      "mcode/mimo-auto",
      { model: "mcode/mimo-auto", prompt: "legacy" },
      true
    );
    assert.strictEqual((result as any).messages, undefined);
    assert.strictEqual((result as any).model, "mimo-auto");
  });

  it("returns 499 on pre-aborted signal", async () => {
    const controller = new AbortController();
    controller.abort(new Error("cancelled"));

    const result = await executor.execute({
      model: "mimo-auto",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: controller.signal,
      credentials: {},
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
    });

    assert.strictEqual((result as any).response.status, 499);
  });

  it("is registered in executor index", async () => {
    const { getExecutor } = await import("../../open-sse/executors/index.ts");
    const exec = getExecutor("mimocode");
    assert.ok(exec instanceof MimocodeExecutor);
  });

  it("mcode alias works", async () => {
    const { getExecutor } = await import("../../open-sse/executors/index.ts");
    const exec = getExecutor("mcode");
    assert.ok(exec instanceof MimocodeExecutor);
  });
});

describe("mimocode multi-account", () => {
  it("executor has at least one account", () => {
    const accounts = (executor as any).accounts;
    assert.ok(Array.isArray(accounts));
    assert.ok(accounts.length >= 1);
  });

  it("each account has required fields", () => {
    const accounts = (executor as any).accounts;
    for (const acct of accounts) {
      assert.ok(typeof acct.fingerprint === "string");
      assert.ok(typeof acct.jwt === "string");
      assert.ok(typeof acct.expiresAt === "number");
      assert.ok(typeof acct.cooldownUntil === "number");
      assert.ok(typeof acct.consecutiveFails === "number");
    }
  });

  it("pickAccount returns an account", () => {
    const acct = (executor as any).pickAccount();
    assert.ok(acct);
    assert.ok(typeof acct.fingerprint === "string");
  });

  it("markCooldown increases consecutiveFails and sets cooldownUntil", () => {
    const acct = (executor as any).accounts[0];
    const before = acct.consecutiveFails;
    (executor as any).markCooldown(acct);
    assert.strictEqual(acct.consecutiveFails, before + 1);
    assert.ok(acct.cooldownUntil > Date.now());
  });

  it("markSuccess resets consecutiveFails", () => {
    const acct = (executor as any).accounts[0];
    acct.consecutiveFails = 5;
    (executor as any).markSuccess(acct);
    assert.strictEqual(acct.consecutiveFails, 0);
  });
});

describe("mimocode provider registration", () => {
  it("provider is registered in NOAUTH_PROVIDERS", async () => {
    const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const provider = (NOAUTH_PROVIDERS as Record<string, any>)["mimocode"];
    assert.ok(provider);
    assert.strictEqual(provider.id, "mimocode");
    assert.strictEqual(provider.alias, "mcode");
    assert.strictEqual(provider.noAuth, true);
    assert.strictEqual(provider.hasFree, true);
  });

  it("provider has correct service kinds", async () => {
    const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const provider = (NOAUTH_PROVIDERS as Record<string, any>)["mimocode"];
    assert.ok(provider.serviceKinds?.includes("llm"));
  });
});

describe("mimocode providerRegistry entry", () => {
  it("registry entry exists with correct executor", async () => {
    const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
    const entry = getRegistryEntry("mimocode");
    assert.ok(entry);
    assert.strictEqual(entry.executor, "mimocode");
    assert.strictEqual(entry.format, "openai");
    assert.strictEqual(entry.authType, "none");
  });

  it("registry entry has mimo-auto model", async () => {
    const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
    const entry = getRegistryEntry("mimocode");
    const models = entry.models as Array<{ id: string }>;
    const mimoAuto = models.find((m) => m.id === "mimo-auto");
    assert.ok(mimoAuto);
  });
});
