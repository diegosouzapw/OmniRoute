import { describe, it } from "node:test";
import { ok, equal } from "node:assert/strict";

describe("Regolo AI provider (#9031)", () => {
  it("exists in gateways catalog", async () => {
    const { APIKEY_PROVIDERS_GATEWAYS } =
      await import("@/shared/constants/providers/apikey/gateways");
    ok(APIKEY_PROVIDERS_GATEWAYS.regolo, "regolo entry should exist");
    equal(APIKEY_PROVIDERS_GATEWAYS.regolo.id, "regolo");
  });

  it("has registry entry with passthrough models", async () => {
    const { regoloProvider } = await import("@/../open-sse/config/providers/registry/regolo/index");
    ok(regoloProvider, "regolo registry entry should exist");
    equal(regoloProvider.authType, "apikey");
    equal(regoloProvider.passthroughModels, true);
  });

  it("is registered in providers index", async () => {
    // Just verify the module can be loaded
    const idx = await import("@/../open-sse/config/providers/index");
    ok(idx, "index should load without error");
  });

  // #14996: the entry pointed at the bare host, so DefaultExecutor POSTed chat
  // requests to https://api.regolo.ai and discovery had no modelsUrl to read.
  it("targets the documented /v1 endpoints (#14996)", async () => {
    const { regoloProvider } = await import("@/../open-sse/config/providers/registry/regolo/index");
    equal(regoloProvider.baseUrl, "https://api.regolo.ai/v1/chat/completions");
    equal(regoloProvider.modelsUrl, "https://api.regolo.ai/v1/models");
  });
});

describe("registry shape guard (#14996)", () => {
  // Providers whose API intentionally does NOT serve /chat/completions — the
  // bare host is the correct dispatch root (dify uses /v1/chat-messages,
  // ideogram is image-generation with its own routes).
  const INTENTIONAL_BARE_HOST = new Set(["dify", "ideogram"]);

  it("openai-format default-executor entries do not POST to a bare host", async () => {
    const { REGISTRY } = await import("@/../open-sse/config/providers/index");
    const bareHost: string[] = [];
    for (const [id, entry] of Object.entries(REGISTRY)) {
      if (entry.format !== "openai") continue;
      if (entry.executor && entry.executor !== "default") continue;
      if (entry.urlSuffix || entry.urlBuilder || entry.chatPath) continue;
      if (INTENTIONAL_BARE_HOST.has(id)) continue;
      let pathname = "/";
      try {
        pathname = new URL(entry.baseUrl).pathname;
      } catch {
        continue;
      }
      if (!pathname || pathname === "/") bareHost.push(`${id} -> ${entry.baseUrl}`);
    }
    equal(
      bareHost.length,
      0,
      `entries that would POST chat traffic to a bare host (add a /v1/... baseUrl, a urlSuffix, or an INTENTIONAL_BARE_HOST rationale):\n${bareHost.join("\n")}`
    );
  });
});
