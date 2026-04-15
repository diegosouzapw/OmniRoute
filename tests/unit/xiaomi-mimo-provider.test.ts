import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import {
  createProviderSchema,
  updateProviderConnectionSchema,
} from "../../src/shared/validation/schemas.ts";
import { validateBody } from "../../src/shared/validation/helpers.ts";

test("xiaomi-mimo registry uses current token-plan base URL and current MiMo V2 models", () => {
  const entry = REGISTRY["xiaomi-mimo"];

  assert.ok(entry, "xiaomi-mimo should exist in registry");
  assert.equal(entry.baseUrl, "https://token-plan-sgp.xiaomimimo.com/v1");
  assert.deepEqual(
    entry.models.map((model) => model.id),
    ["mimo-v2-pro", "mimo-v2-omni", "mimo-v2-tts"]
  );
});

test("xiaomi-mimo executor appends /chat/completions for regional base URLs", () => {
  const executor = new DefaultExecutor("xiaomi-mimo");

  assert.equal(
    executor.buildUrl("mimo-v2-pro", true, 0, {
      providerSpecificData: {
        baseUrl: "https://token-plan-ams.xiaomimimo.com/v1",
      },
    }),
    "https://token-plan-ams.xiaomimimo.com/v1/chat/completions"
  );

  assert.equal(
    executor.buildUrl("mimo-v2-pro", true, 0, {
      providerSpecificData: {
        baseUrl: "https://token-plan-cn.xiaomimimo.com/v1/chat/completions",
      },
    }),
    "https://token-plan-cn.xiaomimimo.com/v1/chat/completions"
  );
});

test("xiaomi-mimo create schema accepts custom regional baseUrl", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "xiaomi-mimo",
    apiKey: "xm-placeholder-key",
    name: "Xiaomi MiMo AMS",
    providerSpecificData: {
      baseUrl: "https://token-plan-ams.xiaomimimo.com/v1",
    },
  });

  assert.equal(validation.success, true, "create schema should accept Xiaomi regional baseUrl");
  if (validation.success) {
    assert.equal(
      validation.data.providerSpecificData?.baseUrl,
      "https://token-plan-ams.xiaomimimo.com/v1"
    );
  }
});

test("xiaomi-mimo update schema accepts custom regional baseUrl", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    providerSpecificData: {
      baseUrl: "https://token-plan-cn.xiaomimimo.com/v1",
    },
  });

  assert.equal(validation.success, true, "update schema should accept Xiaomi regional baseUrl");
  if (validation.success) {
    assert.equal(
      validation.data.providerSpecificData?.baseUrl,
      "https://token-plan-cn.xiaomimimo.com/v1"
    );
  }
});
