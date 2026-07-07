import test from "node:test";
import assert from "node:assert/strict";

const { createProviderSchema, updateProviderConnectionSchema } =
  await import("../../src/shared/validation/schemas.ts");

test("provider schemas accept boolean openaiStoreEnabled in providerSpecificData", () => {
  const created = createProviderSchema.safeParse({
    provider: "codex",
    apiKey: "token",
    name: "Codex",
    providerSpecificData: {
      openaiStoreEnabled: true,
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      openaiStoreEnabled: false,
    },
  });

  assert.equal(created.success, true);
  assert.equal(updated.success, true);
});

test("provider schemas reject non-boolean openaiStoreEnabled values", () => {
  const created = createProviderSchema.safeParse({
    provider: "codex",
    apiKey: "token",
    name: "Codex",
    providerSpecificData: {
      openaiStoreEnabled: "yes",
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      openaiStoreEnabled: "no",
    },
  });

  assert.equal(created.success, false);
  assert.equal(updated.success, false);
});

test("provider schemas accept boolean CC-compatible request defaults", () => {
  const created = createProviderSchema.safeParse({
    provider: "anthropic-compatible-cc-demo",
    apiKey: "token",
    name: "CC Compatible",
    providerSpecificData: {
      requestDefaults: {
        context1m: true,
        redactThinking: true,
        summarizeThinking: true,
      },
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      requestDefaults: {
        context1m: false,
        redactThinking: false,
        summarizeThinking: false,
      },
    },
  });

  assert.equal(created.success, true);
  assert.equal(updated.success, true);
});

test("provider schemas reject non-boolean CC-compatible request defaults", () => {
  const created = createProviderSchema.safeParse({
    provider: "anthropic-compatible-cc-demo",
    apiKey: "token",
    name: "CC Compatible",
    providerSpecificData: {
      requestDefaults: {
        context1m: "yes",
        redactThinking: "yes",
        summarizeThinking: "yes",
      },
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      requestDefaults: {
        context1m: 1,
        redactThinking: 1,
        summarizeThinking: 1,
      },
    },
  });

  assert.equal(created.success, false);
  assert.equal(updated.success, false);
});

test("provider schemas accept Codex default priority and flex service tiers", () => {
  for (const serviceTier of ["default", "priority", "fast", "flex"]) {
    const created = createProviderSchema.safeParse({
      provider: "codex",
      apiKey: "token",
      name: "Codex",
      providerSpecificData: {
        requestDefaults: { serviceTier },
      },
    });
    const updated = updateProviderConnectionSchema.safeParse({
      providerSpecificData: {
        requestDefaults: { serviceTier },
      },
    });

    assert.equal(created.success, true, serviceTier);
    assert.equal(updated.success, true, serviceTier);
  }
});

test("provider schemas reject unknown Codex service tiers", () => {
  const created = createProviderSchema.safeParse({
    provider: "codex",
    apiKey: "token",
    name: "Codex",
    providerSpecificData: {
      requestDefaults: { serviceTier: "turbo" },
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      requestDefaults: { serviceTier: "turbo" },
    },
  });

  assert.equal(created.success, false);
  assert.equal(updated.success, false);
});

test("provider schemas accept OpenRouter preset in providerSpecificData", () => {
  const created = createProviderSchema.safeParse({
    provider: "openrouter",
    apiKey: "token",
    name: "OpenRouter",
    providerSpecificData: {
      preset: "email-copywriter",
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      preset: "code-reviewer",
    },
  });
  const padded = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      preset: `${" ".repeat(120)}prefer${" ".repeat(120)}`,
    },
  });

  assert.equal(created.success, true);
  assert.equal(updated.success, true);
  assert.equal(padded.success, true);
});

test("provider schemas reject oversized OpenRouter preset values", () => {
  const created = createProviderSchema.safeParse({
    provider: "openrouter",
    apiKey: "token",
    name: "OpenRouter",
    providerSpecificData: {
      preset: "x".repeat(201),
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      preset: 123,
    },
  });

  assert.equal(created.success, false);
  assert.equal(updated.success, false);
});

test("provider schemas accept quota scraping provider-specific strings", () => {
  const created = createProviderSchema.safeParse({
    provider: "opencode-go",
    apiKey: "token",
    name: "OpenCode Go",
    providerSpecificData: {
      opencodeGoWorkspaceId: "workspace-123",
      opencodeGoAuthCookie: "auth=cookie-value",
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      ollamaCloudUsageCookie: "__Secure-session=cookie-value",
    },
  });

  assert.equal(created.success, true);
  assert.equal(updated.success, true);
});

test("provider schemas reject malformed quota scraping provider-specific values", () => {
  const created = createProviderSchema.safeParse({
    provider: "opencode-go",
    apiKey: "token",
    name: "OpenCode Go",
    providerSpecificData: {
      opencodeGoWorkspaceId: 123,
      opencodeGoAuthCookie: "x".repeat(10001),
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      ollamaCloudUsageCookie: 123,
    },
  });

  assert.equal(created.success, false);
  assert.equal(updated.success, false);
});

test("provider schemas accept GLM team quota provider-specific strings", () => {
  const created = createProviderSchema.safeParse({
    provider: "glm-cn",
    apiKey: "id.secret",
    name: "GLM CN Team",
    providerSpecificData: {
      glmOrganizationId: "org-team",
      glmProjectId: "proj_team",
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      glmOrganizationId: "org-team",
      glmProjectId: "proj_team",
    },
  });

  assert.equal(created.success, true);
  assert.equal(updated.success, true);
});

test("provider schemas reject incomplete GLM team quota provider-specific values", () => {
  const created = createProviderSchema.safeParse({
    provider: "glm-cn",
    apiKey: "id.secret",
    name: "GLM CN Team",
    providerSpecificData: {
      glmOrganizationId: "org-only",
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      glmProjectId: 123,
    },
  });

  assert.equal(created.success, false);
  assert.equal(updated.success, false);
});
