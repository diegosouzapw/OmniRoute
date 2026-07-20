import test from "node:test";
import assert from "node:assert/strict";

import {
  hasOmniRouteQwenCodeConfig,
  mergeQwenCodeEnv,
  mergeQwenCodeSettings,
  removeQwenCodeEnv,
  removeQwenCodeSettings,
} from "../../src/shared/services/qwenCodeConfig.ts";

test("writes the upstream V4 bare-array modelProviders contract without a secret", () => {
  const settings = mergeQwenCodeSettings(
    {},
    { baseUrl: "http://localhost:20128", model: "qwen/qwen3.8-max-preview" }
  );

  assert.deepEqual(settings.modelProviders, {
    openai: [
      {
        id: "qwen/qwen3.8-max-preview",
        name: "qwen/qwen3.8-max-preview (OmniRoute)",
        envKey: "OMNIROUTE_API_KEY",
        baseUrl: "http://localhost:20128/v1",
      },
    ],
  });
  assert.deepEqual(settings.security, { auth: { selectedType: "openai" } });
  assert.deepEqual(settings.model, {
    name: "qwen/qwen3.8-max-preview",
    baseUrl: "http://localhost:20128/v1",
  });
  assert.equal(JSON.stringify(settings).includes("sk-secret"), false);
});

test("preserves user settings and unrelated provider entries", () => {
  const existing = {
    $version: 4,
    mcpServers: { filesystem: { command: "npx" } },
    security: { folderTrust: { enabled: true } },
    modelProviders: {
      openai: [
        {
          id: "gpt-4o",
          name: "Personal OpenAI",
          envKey: "OPENAI_API_KEY",
          baseUrl: "https://api.openai.com/v1",
        },
      ],
      idealab: [
        {
          id: "ideal-model",
          envKey: "IDEALAB_API_KEY",
          baseUrl: "https://idealab.example/v1",
        },
      ],
    },
    providerProtocol: { idealab: "openai" },
  };

  const settings = mergeQwenCodeSettings(existing, {
    baseUrl: "https://omni.example/v1/",
    model: "cx/gpt-5.6-sol",
    modelName: "GPT-5.6 Sol",
  });

  assert.equal(settings.$version, 4);
  assert.deepEqual(settings.mcpServers, existing.mcpServers);
  assert.deepEqual(settings.providerProtocol, existing.providerProtocol);
  assert.deepEqual(
    (settings.modelProviders as Record<string, unknown>).idealab,
    existing.modelProviders.idealab
  );
  assert.equal(
    ((settings.modelProviders as Record<string, unknown>).openai as unknown[]).length,
    2
  );
});

test("replaces only the managed entry and unwraps the reverted V5 provider shape", () => {
  const settings = mergeQwenCodeSettings(
    {
      $version: 4,
      modelProviders: {
        openai: {
          protocol: "openai",
          models: [
            {
              id: "old-model",
              name: "old-model (OmniRoute)",
              envKey: "OPENAI_API_KEY",
              baseUrl: "http://old-host/v1",
            },
            {
              id: "personal-model",
              envKey: "PERSONAL_API_KEY",
              baseUrl: "https://personal.example/v1",
            },
          ],
        },
      },
    },
    { baseUrl: "http://new-host", model: "new-model" }
  );

  assert.deepEqual((settings.modelProviders as Record<string, unknown>).openai, [
    {
      id: "personal-model",
      envKey: "PERSONAL_API_KEY",
      baseUrl: "https://personal.example/v1",
    },
    {
      id: "new-model",
      name: "new-model (OmniRoute)",
      envKey: "OMNIROUTE_API_KEY",
      baseUrl: "http://new-host/v1",
    },
  ]);
});

test("migrates the removed integration's root-array shape without dropping other entries", () => {
  const settings = mergeQwenCodeSettings(
    {
      modelProviders: [
        {
          id: "omniroute",
          name: "OmniRoute",
          authType: "openai",
          envKey: "OMNIROUTE_API_KEY",
          baseUrl: "http://old/v1",
        },
        {
          id: "personal-model",
          name: "Personal model",
          authType: "openai",
          envKey: "PERSONAL_API_KEY",
          baseUrl: "https://personal.example/v1",
        },
      ],
      selectedProvider: "omniroute",
    },
    { baseUrl: "http://new", model: "new-model" }
  );

  assert.deepEqual((settings.modelProviders as Record<string, unknown>).openai, [
    {
      id: "personal-model",
      name: "Personal model",
      envKey: "PERSONAL_API_KEY",
      baseUrl: "https://personal.example/v1",
    },
    {
      id: "new-model",
      name: "new-model (OmniRoute)",
      envKey: "OMNIROUTE_API_KEY",
      baseUrl: "http://new/v1",
    },
  ]);
  assert.equal(settings.selectedProvider, undefined);
});

test("migrates matching legacy security.auth credentials out of settings.json", () => {
  const settings = mergeQwenCodeSettings(
    {
      security: {
        auth: {
          selectedType: "openai",
          apiKey: "sk-legacy-secret",
          baseUrl: "http://omni-host/v1",
          other: true,
        },
      },
      model: { name: "old-model", temperature: 0.2 },
    },
    { baseUrl: "http://omni-host", model: "new-model" }
  );

  assert.deepEqual(settings.security, {
    auth: { selectedType: "openai", other: true },
  });
  assert.deepEqual(settings.model, {
    name: "new-model",
    baseUrl: "http://omni-host/v1",
    temperature: 0.2,
  });
  assert.equal(JSON.stringify(settings).includes("sk-legacy-secret"), false);
});

test("detection is precise and does not claim arbitrary custom endpoints", () => {
  assert.equal(
    hasOmniRouteQwenCodeConfig({
      modelProviders: {
        openai: [
          {
            id: "custom-model",
            name: "My custom provider",
            envKey: "CUSTOM_API_KEY",
            baseUrl: "https://custom.example/v1",
          },
        ],
      },
    }),
    false
  );

  assert.equal(
    hasOmniRouteQwenCodeConfig({
      modelProviders: {
        openai: [
          {
            id: "custom-model",
            name: "custom-model (OmniRoute)",
            envKey: "OMNIROUTE_API_KEY",
            baseUrl: "https://omni.example/v1",
          },
        ],
      },
    }),
    true
  );
});

test("env merge owns only OMNIROUTE_API_KEY and preserves all user keys", () => {
  const original = [
    "# user credentials",
    "OPENAI_API_KEY=sk-openai",
    "ANTHROPIC_API_KEY=sk-anthropic",
    "GEMINI_API_KEY=sk-gemini",
    "export OMNIROUTE_API_KEY=old-value",
    "OMNIROUTE_API_KEY_BACKUP=keep-me",
    "",
  ].join("\n");

  const merged = mergeQwenCodeEnv(original, 'sk-new "quoted" value');
  assert.match(merged, /^OPENAI_API_KEY=sk-openai$/m);
  assert.match(merged, /^ANTHROPIC_API_KEY=sk-anthropic$/m);
  assert.match(merged, /^GEMINI_API_KEY=sk-gemini$/m);
  assert.match(merged, /^OMNIROUTE_API_KEY_BACKUP=keep-me$/m);
  assert.match(merged, /^OMNIROUTE_API_KEY="sk-new \\"quoted\\" value"$/m);
  assert.equal((merged.match(/^OMNIROUTE_API_KEY=/gm) || []).length, 1);

  const removed = removeQwenCodeEnv(merged);
  assert.doesNotMatch(removed, /^OMNIROUTE_API_KEY=/m);
  assert.match(removed, /^OMNIROUTE_API_KEY_BACKUP=keep-me$/m);
  assert.match(removed, /^OPENAI_API_KEY=sk-openai$/m);
});

test("reset removes only managed models and their active selection", () => {
  const existing = mergeQwenCodeSettings(
    {
      ui: { theme: "dark" },
      modelProviders: {
        openai: [
          {
            id: "personal-model",
            envKey: "PERSONAL_API_KEY",
            baseUrl: "https://personal.example/v1",
          },
        ],
      },
    },
    { baseUrl: "http://omni-host", model: "managed-model" }
  );

  const reset = removeQwenCodeSettings(existing);
  assert.deepEqual(reset.ui, { theme: "dark" });
  assert.deepEqual((reset.modelProviders as Record<string, unknown>).openai, [
    {
      id: "personal-model",
      envKey: "PERSONAL_API_KEY",
      baseUrl: "https://personal.example/v1",
    },
  ]);
  assert.equal(reset.model, undefined);
  assert.deepEqual(reset.security, { auth: { selectedType: "openai" } });
});

test("reset also removes matching deprecated security.auth credentials", () => {
  const reset = removeQwenCodeSettings({
    security: {
      auth: {
        selectedType: "openai",
        apiKey: "sk-old-secret",
        baseUrl: "http://omni-host/v1",
      },
    },
    model: { name: "managed", baseUrl: "http://omni-host/v1" },
    modelProviders: {
      openai: [
        {
          id: "managed",
          name: "managed (OmniRoute)",
          envKey: "OMNIROUTE_API_KEY",
          baseUrl: "http://omni-host/v1",
        },
      ],
    },
  });

  assert.equal(reset.security, undefined);
  assert.equal(reset.model, undefined);
  assert.equal(JSON.stringify(reset).includes("sk-old-secret"), false);
});

test("reset removes matching deprecated auth when the selected model is unrelated", () => {
  const reset = removeQwenCodeSettings({
    security: {
      auth: {
        selectedType: "openai",
        apiKey: "sk-old-secret",
        baseUrl: "http://omni-host/v1",
      },
    },
    model: { name: "some-other-model", baseUrl: "https://other.example/v1" },
    modelProviders: {
      openai: [
        {
          id: "managed",
          name: "managed (OmniRoute)",
          envKey: "OMNIROUTE_API_KEY",
          baseUrl: "http://omni-host/v1",
        },
      ],
    },
  });

  assert.equal(reset.security, undefined);
  assert.deepEqual(reset.model, {
    name: "some-other-model",
    baseUrl: "https://other.example/v1",
  });
  assert.equal(JSON.stringify(reset).includes("sk-old-secret"), false);
});
