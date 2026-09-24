import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { modifyManualModel } from "../../../bin/cli/commands/model-crud.mjs";

type Model = Record<string, unknown>;
async function fixture(
  run: (
    opts: { baseUrl: string; cliToken: string; headers: { authorization: string } },
    state: { models: Model[]; calls: string[]; ignoreWrite: boolean }
  ) => Promise<void>
) {
  const state = { models: [] as Model[], calls: [] as string[], ignoreWrite: false };
  const server = createServer(async (req, res) => {
    state.calls.push(`${req.method} ${req.url}`);
    let text = "";
    for await (const chunk of req) text += chunk;
    const body = text ? JSON.parse(text) : {};
    if (!state.ignoreWrite && req.method === "POST")
      state.models.push({
        id: body.modelId,
        name: body.modelName,
        source: "manual",
        inputTokenLimit: body.max_input_tokens,
        outputTokenLimit: body.max_output_tokens,
        apiFormat: body.apiFormat,
        supportedEndpoints: body.supportedEndpoints,
      });
    if (!state.ignoreWrite && req.method === "PUT")
      state.models = state.models.map((model) => ({
        ...model,
        name: body.modelName ?? model.name,
        apiFormat: body.apiFormat ?? model.apiFormat,
        supportedEndpoints: body.supportedEndpoints ?? model.supportedEndpoints,
        contextWindowOverride: Object.hasOwn(body, "contextWindowOverride")
          ? body.contextWindowOverride
          : model.contextWindowOverride,
      }));
    if (!state.ignoreWrite && req.method === "DELETE") state.models = [];
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify(
        req.method === "GET" ? { models: state.models } : { model: state.models[0], removed: true }
      )
    );
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  try {
    await run(
      {
        baseUrl: `http://127.0.0.1:${address.port}`,
        cliToken: "fixture",
        headers: { authorization: "Bearer fixture-model-api-key" },
      },
      state
    );
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

test("manual model add, edit and remove use the selected server and verify readback", async () => {
  await fixture(async (opts, state) => {
    const added = await modifyManualModel("add", "custom", "model/x", {
      ...opts,
      name: "Model",
      contextWindow: "8192",
    });
    assert.equal(added.model.id, "model/x");
    assert.equal(added.model.inputTokenLimit, 8192);
    const edited = await modifyManualModel("edit", "custom", "model/x", {
      ...opts,
      name: "Updated",
      contextWindow: "4096",
    });
    assert.equal(edited.model.contextWindowOverride, 4096);
    const removed = await modifyManualModel("remove", "custom", "model/x", { ...opts, yes: true });
    assert.equal(removed.persistenceVerified, true);
    assert.equal(added.inferenceValidation, "not-run");
    assert.ok(
      state.calls.includes(
        "DELETE /api/provider-models?provider=custom&model=model%2Fx&resetOverride=true"
      )
    );
    assert.equal(state.calls.filter((call) => call.startsWith("GET")).length, 6);
  });
});

test("manual metadata retains output limits and clears only a context override", async () => {
  await fixture(async (opts, state) => {
    const added = await modifyManualModel("add", "custom", "m", {
      ...opts,
      apiFormat: "responses",
      contextWindow: "8192",
      maxOutputTokens: "2048",
    });
    assert.equal(added.model.outputTokenLimit, 2048);
    assert.equal(added.model.apiFormat, "responses");
    await modifyManualModel("edit", "custom", "m", { ...opts, contextWindow: "4096" });
    const cleared = await modifyManualModel("edit", "custom", "m", {
      ...opts,
      clearContextWindow: true,
    });
    assert.equal(cleared.model.contextWindowOverride, null);
    assert.equal(cleared.model.inputTokenLimit, 8192);
    assert.equal(state.calls.filter((call) => call.startsWith("POST")).length, 1);
  });
});

test("non-chat model format persists matching endpoint metadata", async () => {
  await fixture(async (opts) => {
    const added = await modifyManualModel("add", "custom", "embedding", {
      ...opts,
      apiFormat: "embeddings",
    });
    assert.deepEqual(added.model.supportedEndpoints, ["embeddings"]);
    const edited = await modifyManualModel("edit", "custom", "embedding", {
      ...opts,
      apiFormat: "rerank",
    });
    assert.deepEqual(edited.model.supportedEndpoints, ["rerank"]);
  });
});

test("manual mutations reject invalid limits, duplicates, synced rows and unconfirmed removal", async () => {
  await fixture(async (opts, state) => {
    await assert.rejects(
      modifyManualModel("add", "custom", "m", { ...opts, contextWindow: "0" }),
      /Invalid/
    );
    assert.equal(state.calls.length, 0);
    state.models = [{ id: "m", source: "manual" }];
    await assert.rejects(modifyManualModel("add", "custom", "m", opts), /already exists/);
    await assert.rejects(modifyManualModel("remove", "custom", "m", opts), /--yes/);
    state.models = [{ id: "m", source: "synced" }];
    await assert.rejects(
      modifyManualModel("edit", "custom", "m", { ...opts, name: "x" }),
      /manual/
    );
    assert.ok(state.calls.every((call) => call.startsWith("GET")));
  });
});

test("dry run makes no writes and a successful HTTP response without readback is not success", async () => {
  await fixture(async (opts, state) => {
    const plan = await modifyManualModel("add", "custom", "m", { ...opts, dryRun: true });
    assert.equal(plan.dryRun, true);
    assert.ok(state.calls.every((call) => call.startsWith("GET")));
    state.ignoreWrite = true;
    await assert.rejects(modifyManualModel("add", "custom", "m", opts), /readback/);
  });
});
