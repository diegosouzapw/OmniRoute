import "./_helpers/modelValidationEnvironment.ts";
import assert from "node:assert/strict";
import test from "node:test";
import { createProviderConnection, updateProviderConnection } from "../../src/lib/db/providers.ts";
import { getCustomModels } from "../../src/lib/db/models.ts";
import { createValidationSnapshot } from "../../src/lib/db/validatedModels.ts";
import { getProviderCredentials } from "../../src/sse/services/auth.ts";
import { createProofRunner, requireProofResponse } from "../../src/lib/modelValidation/runner.ts";
import { GEMINI_ENV_CONNECTION_ID } from "../../src/lib/providers/gemini.ts";
import { getDbInstance } from "../../src/lib/db/core.ts";
import {
  acquireExclusiveConnectionLease,
  releaseExclusiveConnectionLease,
} from "../../src/lib/db/exclusiveConnectionLeases.ts";

test("pending credential selection can abort and cannot dispatch when it later resolves", async () => {
  let dispatched = 0;
  globalThis.fetch = async () => {
    dispatched++;
    throw new Error("unexpected dispatch");
  };
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "fake-pending-proof",
    isActive: true,
  });
  const input = {
    provider: "openai",
    modelId: "pending-proof",
    connectionId: String(connection.id),
    allowInference: true as const,
    apiFormat: "chat-completions" as const,
  };
  const credentials = await getProviderCredentials(
    input.provider,
    null,
    [input.connectionId],
    input.modelId
  );
  let release: (value: typeof credentials) => void;
  let entered: () => void;
  const started = new Promise<void>((resolve) => {
    entered = resolve;
  });
  const pending = new Promise<typeof credentials>((resolve) => {
    release = resolve;
  });
  const controller = new AbortController();
  const run = await createProofRunner(
    input,
    createValidationSnapshot(input),
    controller.signal,
    async () => {
      entered();
      return pending;
    }
  );
  const result = run([{ role: "user", content: "validation fixture" }], false);
  await started;
  controller.abort(new Error("test pre-dispatch abort"));
  await assert.rejects(() => result, /pre-dispatch abort/);
  release(credentials);
  await pending;
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(dispatched, 0);
  assert.equal((await getCustomModels(input.provider)).length, 0);
});

test("stale selected endpoint metadata is rejected against the fresh connection snapshot", async () => {
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "fake-stale-endpoint",
    isActive: true,
    providerSpecificData: { baseUrl: "https://old.invalid/v1" },
  });
  const input = {
    provider: "openai",
    modelId: "stale-endpoint-proof",
    connectionId: String(connection.id),
    allowInference: true as const,
    apiFormat: "chat-completions" as const,
  };
  const stale = await getProviderCredentials(
    input.provider,
    null,
    [input.connectionId],
    input.modelId
  );
  await updateProviderConnection(input.connectionId, {
    providerSpecificData: { baseUrl: "https://new.invalid/v1" },
  });
  const run = await createProofRunner(
    input,
    createValidationSnapshot(input),
    new AbortController().signal,
    async () => stale
  );
  await assert.rejects(() => run([{ role: "user", content: "validation fixture" }], false), {
    code: "VALIDATION_CONFIG_CHANGED",
  });
  assert.equal((await getCustomModels(input.provider)).length, 0);
});

test("environment credential variants cannot replace the explicitly stored connection", async () => {
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "fake-env-union-proof",
    isActive: true,
  });
  const input = {
    provider: "openai",
    modelId: "env-union-proof",
    connectionId: String(connection.id),
    allowInference: true as const,
    apiFormat: "chat-completions" as const,
  };
  let dispatched = 0;
  globalThis.fetch = async () => {
    dispatched++;
    throw new Error("unexpected dispatch");
  };
  const selected = {
    apiKey: "fake-env-credential",
    accessToken: null,
    connectionId: GEMINI_ENV_CONNECTION_ID,
    id: GEMINI_ENV_CONNECTION_ID,
    provider: "gemini",
    authType: "apikey" as const,
    defaultModel: null,
  };
  const run = await createProofRunner(
    input,
    createValidationSnapshot(input),
    new AbortController().signal,
    async () => selected
  );
  await assert.rejects(() => run([{ role: "user", content: "test" }], false), {
    code: "MODEL_VALIDATION_PROOF_FAILED",
  });
  assert.equal(dispatched, 0);
  assert.equal(
    (await getCustomModels(input.provider)).some((model) => model.id === input.modelId),
    false
  );
});

test("only a successful chat-core envelope can provide a proof response", () => {
  const response = Response.json({ choices: [] });
  assert.throws(() => requireProofResponse(response), { code: "MODEL_VALIDATION_PROOF_FAILED" });
  assert.throws(() => requireProofResponse({ success: false, response }), {
    code: "MODEL_VALIDATION_PROOF_FAILED",
  });
  assert.throws(() => requireProofResponse({ success: true, response: undefined }), {
    code: "MODEL_VALIDATION_PROOF_FAILED",
  });
  assert.equal(requireProofResponse({ success: true, response }), response);
});

test("a lease-selection status without credentials cannot become a proof", async () => {
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "fake-selection-status",
    isActive: true,
  });
  const input = {
    provider: "openai",
    modelId: "selection-status-proof",
    connectionId: String(connection.id),
    allowInference: true as const,
    apiFormat: "chat-completions" as const,
  };
  const leaseOwnerId = `vlo_${"D".repeat(43)}`;
  const apiKeyId = "selection-status-owner";
  const claimed = acquireExclusiveConnectionLease({ ...input, leaseOwnerId, apiKeyId });
  assert.equal(claimed.kind, "ACQUIRED");
  if (claimed.kind !== "ACQUIRED") throw new Error("fixture lease was not acquired");
  releaseExclusiveConnectionLease({ leaseOwnerId, apiKeyId, generation: claimed.lease.generation });
  let dispatched = 0;
  globalThis.fetch = async () => {
    dispatched++;
    throw new Error("unexpected dispatch");
  };
  for (const tokens of [{}, { apiKey: "", accessToken: " \t" }]) {
    const run = await createProofRunner(
      input,
      createValidationSnapshot(input),
      new AbortController().signal,
      async () => ({
        ...tokens,
        reactivatedFromInactive: true as const,
        exclusiveLease: claimed.lease,
        connectionId: input.connectionId,
        provider: input.provider,
      })
    );
    await assert.rejects(() => run([{ role: "user", content: "test" }], false), {
      code: "MODEL_VALIDATION_PROOF_FAILED",
    });
  }
  assert.equal(dispatched, 0);
});

test("a lease acquired during selection blocks the fresh credential lookup itself", async (context) => {
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "fake-read-fence",
    isActive: true,
  });
  const input = {
    provider: "openai",
    modelId: "fresh-read-lease-proof",
    connectionId: String(connection.id),
    allowInference: true as const,
    apiFormat: "chat-completions" as const,
  };
  const selected = await getProviderCredentials(
    input.provider,
    null,
    [input.connectionId],
    input.modelId
  );
  const leaseOwnerId = `vlo_${"C".repeat(43)}`;
  const apiKeyId = "validation-read-owner";
  let generation: number;
  let postClaimConnectionReads = 0;
  let dispatched = 0;
  globalThis.fetch = async () => {
    dispatched++;
    throw new Error("unexpected dispatch");
  };
  const db = getDbInstance();
  const prepare = db.prepare.bind(db);
  const spy = context.mock.method(db, "prepare", (sql: string) => {
    if (generation && sql === "SELECT * FROM provider_connections WHERE id = ?")
      postClaimConnectionReads++;
    return prepare(sql);
  });
  const run = await createProofRunner(
    input,
    createValidationSnapshot(input),
    new AbortController().signal,
    async () => {
      const claimed = acquireExclusiveConnectionLease({
        leaseOwnerId,
        apiKeyId,
        provider: input.provider,
        connectionId: input.connectionId,
      });
      assert.equal(claimed.kind, "ACQUIRED");
      if (claimed.kind !== "ACQUIRED") throw new Error("fixture lease was not acquired");
      generation = claimed.lease.generation;
      return selected;
    }
  );
  try {
    await assert.rejects(() => run([{ role: "user", content: "test" }], false), {
      code: "VALIDATION_CONNECTION_UNAVAILABLE",
    });
    assert.equal(postClaimConnectionReads, 0);
    assert.equal(dispatched, 0);
  } finally {
    spy.mock.restore();
    if (generation) releaseExclusiveConnectionLease({ leaseOwnerId, apiKeyId, generation });
  }
});
