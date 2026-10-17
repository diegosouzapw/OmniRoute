import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import "../_setup/nativeImageState.ts";

// Native fixtures provision or reuse isolated state before any application import.
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA"]) {
  assert.ok(process.env[key]?.includes(`${path.sep}isolated-`), `${key} must be isolated`);
}
process.env.API_KEY_SECRET = "native-codex-image-fixture-only";
await import("../_setup/imageCallLogLifecycle.ts");
const originalFetch = globalThis.fetch;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { getUsageHistory } = await import("../../src/lib/usage/usageHistory.ts");
const { getCallLogs, waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { POST } = await import("../../src/app/api/v1/images/edits/route.ts");
const { POST: generate } = await import("../../src/app/api/v1/images/generations/route.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { getImageModelEntry, parseImageModel } =
  await import("../../open-sse/config/imageRegistry.ts");
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
  "base64"
);
const DATA_URL = `data:image/png;base64,${PNG.toString("base64")}`;
const payload = {
  created: 1778832973,
  data: [{ b64_json: PNG.toString("base64"), generation_id: "fixture-generation" }],
  size: "1024x1536",
  usage: { total_tokens: 3 },
};
const credentials = {
  accessToken: "fixture-token",
  providerSpecificData: { workspaceId: "fixture-account", workspacePlanType: "plus" },
};

let selectedConnectionId: string;
test.before(async () => {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "fixture",
    accessToken: credentials.accessToken,
    isActive: true,
    testStatus: "active",
    providerSpecificData: credentials.providerSpecificData,
    priority: 1,
  });
  selectedConnectionId = connection.id as string;
});
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
});

function editRequest(extra: Record<string, unknown> = {}, multipart = false) {
  const body = {
    model: "cx/gpt-image-2.5-sunburst",
    prompt: " رنگ آبی — café ",
    image: DATA_URL,
    ...extra,
  };
  if (!multipart)
    return new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  const form = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (key === "image") form.set(key, new Blob([PNG], { type: "image/png" }), "reference.png");
    else form.set(key, String(value));
  }
  return new Request("http://localhost/api/v1/images/edits", { method: "POST", body: form });
}

test(
  "public Codex engine edit sends original references and native options for JSON and multipart",
  { timeout: 5000 },
  async () => {
    let calls = 0;
    globalThis.fetch = async (url, init) => {
      calls++;
      assert.equal(String(url), "https://chatgpt.com/backend-api/codex/images/edits");
      assert.deepEqual(JSON.parse(String(init?.body)), {
        model: "gpt-image-2.5-sunburst",
        prompt: " رنگ آبی — café ",
        n: 1,
        size: "3840x2160",
        quality: "high",
        background: "opaque",
        images: [{ image_url: DATA_URL }],
      });
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer fixture-token");
      assert.equal(new Headers(init?.headers).get("chatgpt-account-id"), "fixture-account");
      return Response.json(payload);
    };
    for (const multipart of [false, true]) {
      const response = await POST(
        editRequest(
          {
            n: 1,
            size: "3840x2160",
            quality: "high",
            background: "opaque",
            response_format: "b64_json",
          },
          multipart
        )
      );
      assert.equal(response.status, 200, JSON.stringify(await response.clone().json()));
      assert.deepEqual(await response.json(), payload);
    }
    assert.equal(calls, 2);
    assert.ok(
      existsSync(path.join(process.env.DATA_DIR!, "storage.sqlite")),
      "HTTP fixture uses only its isolated database"
    );
  }
);

test(
  "public dedicated edits reject unsupported options and invalid references without a POST",
  { timeout: 5000 },
  async () => {
    let calls = 0;
    globalThis.fetch = async () => {
      calls++;
      return Response.json(payload);
    };
    const negatives: Record<string, unknown>[] = [
      { n: 2 },
      { n: 0 },
      { quality: "max" },
      { background: "invalid" },
      { mask: DATA_URL },
      { output_format: "png" },
      { output_compression: 80 },
      { response_format: "url" },
      { size: "4K" },
      { image: "https://reference.invalid/image.png" },
      { image: "" },
      {
        image: undefined,
        images: [{ image_url: DATA_URL }, { image_url: "https://reference.invalid/image.png" }],
      },
      { image: undefined, images: Array(6).fill({ image_url: DATA_URL }) },
      { image: "data:image/jpeg;base64," + PNG.toString("base64") },
      { model: "cx/gpt-image-unknown" },
    ];
    for (const multipart of [false, true]) {
      for (const extra of negatives.filter((item) => !multipart || !Object.hasOwn(item, "image"))) {
        const response = await POST(editRequest(extra, multipart));
        assert.equal(response.status, 400, JSON.stringify(extra));
      }
    }
    assert.equal(calls, 0);
  }
);

test(
  "public image generation keeps exact engine identity and terminal failures",
  { timeout: 5000 },
  async () => {
    for (const model of ["gpt-image-2", "gpt-image-2.5-sunburst"]) {
      assert.equal(getImageModelEntry(`cx/${model}`)?.model, model);
      assert.deepEqual(parseImageModel(`cx/${model}`), { provider: "codex", model });
      let calls = 0;
      globalThis.fetch = async (url, init) => {
        calls++;
        assert.equal(String(url), "https://chatgpt.com/backend-api/codex/images/generations");
        assert.deepEqual(JSON.parse(String(init?.body)), {
          model,
          prompt: "fixture",
          n: 1,
          size: "3840x2160",
        });
        return Response.json(payload);
      };
      const response = await generate(
        new Request("http://localhost/api/v1/images/generations", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            model: `cx/${model}`,
            prompt: "fixture",
            n: 1,
            size: "3840x2160",
          }),
        })
      );
      assert.equal(response.status, 200, JSON.stringify(await response.clone().json()));
      assert.deepEqual(await response.json(), payload);
      assert.equal(calls, 1);
    }
    let rejectedCalls = 0;
    globalThis.fetch = async (url, init) => {
      rejectedCalls++;
      assert.equal(String(url), "https://chatgpt.com/backend-api/codex/images/generations");
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer fixture-token");
      assert.equal(new Headers(init?.headers).get("chatgpt-account-id"), "fixture-account");
      assert.deepEqual(JSON.parse(String(init?.body)), {
        model: "gpt-image-2",
        prompt: "fixture",
        n: 1,
        size: "3840x2160",
      });
      return Response.json({ error: { message: "provider rejected fixture" } }, { status: 401 });
    };
    const rejected = await generate(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model: "cx/gpt-image-2", prompt: "fixture", size: "3840x2160" }),
      })
    );
    assert.equal(rejected.status, 401);
    assert.equal(rejectedCalls, 1);
    rejectedCalls = 0;
    for (const extra of [
      { n: 2 },
      { quality: "max" },
      { background: "invalid" },
      { mask: DATA_URL },
      { output_format: "png" },
    ]) {
      const invalid = await generate(
        new Request("http://localhost/api/v1/images/generations", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ model: "cx/gpt-image-2", prompt: "fixture", ...extra }),
        })
      );
      assert.equal(invalid.status, 400, JSON.stringify(extra));
    }
    assert.equal(rejectedCalls, 0);
    let calls = 0;
    globalThis.fetch = async () => {
      calls++;
      return Response.json({ error: { message: "provider rejected fixture" } }, { status: 401 });
    };
    const result = await handleImageGeneration({
      body: { model: "cx/gpt-image-2", prompt: "fixture" },
      credentials,
      log: null,
    });
    assert.equal(result.success, false);
    assert.ok(result.success === false && "retryable" in result);
    assert.equal(result.retryable, false);
    assert.equal(calls, 1);
  }
);

test(
  "Antigravity edit response format and generation cancellation reach the native guard",
  { timeout: 5000 },
  async () => {
    await providers.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "fixture-ag",
      accessToken: "fixture-token",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { projectId: "fixture-project" },
    });
    let calls = 0;
    globalThis.fetch = async () => {
      calls++;
      return Response.json(payload);
    };
    const response = await POST(
      editRequest({ model: "antigravity/gemini-3.1-flash-image", response_format: "url" })
    );
    assert.equal(response.status, 400);
    const controller = new AbortController();
    controller.abort();
    let cancellationReachedFetch = false;
    globalThis.fetch = async (_url, init) => {
      cancellationReachedFetch = init?.signal?.aborted === true;
      assert.equal(cancellationReachedFetch, true);
      throw new DOMException("Fixture cancellation", "AbortError");
    };
    const result = await handleImageGeneration({
      body: { model: "antigravity/gemini-3.1-flash-image", prompt: "fixture" },
      credentials: { accessToken: "fixture-token", projectId: "fixture-project" },
      log: null,
      signal: controller.signal,
    });
    assert.equal(result.success, false);
    assert.equal(cancellationReachedFetch, true);
    assert.equal(calls, 0);
  }
);

test(
  "dedicated generation never submits an expired selected token or rotates to a sibling after refresh rejection",
  { timeout: 5000 },
  async () => {
    await providers.updateProviderConnection(selectedConnectionId, {
      expiresAt: "2000-01-01T00:00:00.000Z",
      refreshToken: "fixture-refresh-selected",
      priority: 1,
    });
    await providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: "fixture-sibling",
      accessToken: "fixture-token-sibling",
      isActive: true,
      testStatus: "active",
      priority: 2,
      providerSpecificData: { workspaceId: "fixture-sibling-account", workspacePlanType: "plus" },
    });
    let refreshCalls = 0;
    let imageCalls = 0;
    globalThis.fetch = async (url, init) => {
      if (String(url) === "https://auth.openai.com/oauth/token") {
        refreshCalls++;
        assert.equal(
          new URLSearchParams(String(init?.body)).get("refresh_token"),
          "fixture-refresh-selected"
        );
        return Response.json({ error: "invalid_grant" }, { status: 400 });
      }
      imageCalls++;
      return Response.json(payload);
    };
    const response = await generate(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ model: "cx/gpt-image-2", prompt: "fixture" }),
      })
    );
    assert.equal(refreshCalls, 1);
    assert.equal(
      imageCalls,
      0,
      "Neither expired selected credentials nor a sibling account may submit an image"
    );
    assert.equal(response.status, 401);
  }
);

test(
  "public image combos enforce connection allowlists and fail selected refresh without another submission",
  { timeout: 5000 },
  async () => {
    const allowed = await providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: "fixture-allowed",
      accessToken: "fixture-allowed-token",
      isActive: true,
      testStatus: "active",
      priority: 10,
      providerSpecificData: { workspaceId: "fixture-allowed-account", workspacePlanType: "plus" },
    });
    assert.equal(typeof allowed.id, "string");
    if (typeof allowed.id !== "string") assert.fail("Fixture connection ID missing");
    const comboName = "fixture-native-image-combo";
    await createCombo({
      name: comboName,
      strategy: "priority",
      models: ["cx/gpt-image-2", "cx/gpt-image-2.5-sunburst"],
    });
    const key = await createApiKey("fixture-image-key", "fixture-machine", [], {
      allowedConnections: [allowed.id],
      allowedCombos: [comboName],
    });
    const headers = { "content-type": "application/json", authorization: `Bearer ${key.key}` };
    let calls = 0;
    globalThis.fetch = async (_url, init) => {
      calls++;
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer fixture-allowed-token");
      assert.equal(new Headers(init?.headers).get("chatgpt-account-id"), "fixture-allowed-account");
      return Response.json(payload);
    };
    const request = () =>
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers,
        body: JSON.stringify({ model: comboName, prompt: "fixture" }),
      });
    const response = await generate(request());
    assert.equal(response.status, 200, JSON.stringify(await response.clone().json()));
    assert.equal(calls, 1);
    await providers.updateProviderConnection(allowed.id, {
      expiresAt: "2000-01-01T00:00:00.000Z",
      refreshToken: "fixture-combo-refresh",
    });
    let refreshCalls = 0;
    calls = 0;
    globalThis.fetch = async (url, init) => {
      if (String(url) === "https://auth.openai.com/oauth/token") {
        refreshCalls++;
        assert.equal(
          new URLSearchParams(String(init?.body)).get("refresh_token"),
          "fixture-combo-refresh"
        );
        return Response.json({ error: "invalid_grant" }, { status: 400 });
      }
      calls++;
      return Response.json(payload);
    };
    const rejected = await generate(request());
    assert.equal(rejected.status, 401);
    assert.equal(refreshCalls, 1);
    assert.equal(calls, 0);
    refreshCalls = 0;
    const edit = await POST(
      new Request("http://localhost/api/v1/images/edits", {
        method: "POST",
        headers,
        body: JSON.stringify({ model: comboName, prompt: "fixture", image: DATA_URL }),
      })
    );
    assert.equal(edit.status, 401);
    assert.equal(refreshCalls, 1);
    assert.equal(calls, 0);
    await providers.updateProviderConnection(allowed.id, { isActive: false });
    await providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: "fixture-excluded",
      accessToken: "fixture-excluded-token",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { workspacePlanType: "plus" },
    });
    refreshCalls = 0;
    const unavailable = await generate(request());
    assert.equal(unavailable.status, 400);
    assert.match(
      (await unavailable.json()).error.message,
      /No credentials for image provider: codex/
    );
    assert.equal(calls, 0);
    assert.equal(refreshCalls, 0);
    const blockedKey = await createApiKey("fixture-blocked-image-key", "fixture-machine", [], {
      allowedConnections: ["fixture-unconfigured-connection"],
      allowedCombos: [comboName],
    });
    const blocked = await generate(
      new Request(request(), {
        headers: { ...headers, authorization: `Bearer ${blockedKey.key}` },
      })
    );
    assert.equal(blocked.status, 403);
    assert.equal(calls, 0);
    assert.equal(refreshCalls, 0);
  }
);

test(
  "native direct and combo image attempts retain selected-account usage exactly once",
  { timeout: 5000 },
  async () => {
    const model = "gpt-image-2.5-sunburst";
    await updatePricing({ codex: { [model]: { input: 5, output: 40 } } });
    const connection = await providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: "fixture-accounting",
      accessToken: "fixture-accounting-token",
      isActive: true,
      testStatus: "active",
      providerSpecificData: {
        workspaceId: "fixture-accounting-workspace",
        workspacePlanType: "plus",
      },
    });
    assert.equal(typeof connection.id, "string");
    if (typeof connection.id !== "string") assert.fail("Fixture connection ID missing");
    const combo = "fixture-accounting-combo";
    await createCombo({ name: combo, strategy: "priority", models: [`cx/${model}`] });
    const key = await createApiKey("fixture-accounting-key", "fixture-machine", [], {
      allowedConnections: [connection.id],
      allowedCombos: [combo],
    });
    const headers = { "content-type": "application/json", authorization: `Bearer ${key.key}` };
    const reported = {
      ...payload,
      usage: { input_tokens: 20, output_tokens: 100, total_tokens: 120 },
    };
    let calls = 0;
    globalThis.fetch = async (url, init) => {
      calls++;
      const body = JSON.parse(String(init?.body));
      assert.equal(body.model, model);
      assert.equal(
        new Headers(init?.headers).get("authorization"),
        "Bearer fixture-accounting-token"
      );
      assert.equal(
        new Headers(init?.headers).get("chatgpt-account-id"),
        "fixture-accounting-workspace"
      );
      if (String(url).endsWith("/edits")) assert.deepEqual(body.images, [{ image_url: DATA_URL }]);
      return Response.json(reported);
    };
    for (const [index, variant] of [
      "generation",
      "edit",
      "combo-generation",
      "combo-edit",
    ].entries()) {
      const edit = variant.endsWith("edit");
      const body = {
        model: variant.startsWith("combo") ? combo : `cx/${model}`,
        prompt: "fixture",
        ...(edit && { image: DATA_URL }),
      };
      const response = await (edit ? POST : generate)(
        new Request(`http://localhost/api/v1/images/${edit ? "edits" : "generations"}`, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        })
      );
      assert.equal(response.status, 200, await response.clone().text());
      assert.deepEqual(await response.json(), reported);
      assert.equal(calls, index + 1, "one submission per logical request");
      const rows = (await getUsageHistory({ provider: "codex", model })).filter(
        (row) => row.apiKeyId === key.id
      );
      assert.equal(rows.length, index + 1, "one usage record, not a nested duplicate");
      assert.ok(rows.every((row) => row.connectionId === connection.id && row.success));
      assert.ok(rows.every((row) => row.tokens.input === 20 && row.tokens.output === 100));
      assert.equal(await waitForCallLogSaves(1000), true);
      const logs = await getCallLogs({ provider: "codex", apiKey: key.id });
      assert.equal(logs.length, index + 1, "one attributed call log per native attempt");
      assert.ok(logs.every((row) => row.connectionId === connection.id && row.status === 200));
      assert.ok(logs.every((row) => !row.hasRequestBody && !row.hasResponseBody));
    }
    globalThis.fetch = async () => {
      calls++;
      return Response.json({ error: { message: "private fixture failure" } }, { status: 401 });
    };
    const rejected = await generate(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers,
        body: JSON.stringify({ model: combo, prompt: "fixture" }),
      })
    );
    assert.equal(rejected.status, 401);
    assert.equal(calls, 5, "terminal rejection must not submit again");
    assert.equal(await waitForCallLogSaves(1000), true);
    const logs = await getCallLogs({ provider: "codex", apiKey: key.id });
    assert.equal(logs.length, 5);
    const failure = logs.filter((row) => row.status === 401);
    assert.equal(failure.length, 1);
    assert.equal(failure[0].connectionId, connection.id);
    assert.equal(failure[0].hasRequestBody, false);
    assert.equal(failure[0].hasResponseBody, false);
    assert.doesNotMatch(
      JSON.stringify(logs),
      /private fixture failure|fixture-accounting-token|fixture-accounting-workspace/
    );
    assert.equal(
      (await getUsageHistory({ provider: "codex", model })).filter((row) => row.apiKeyId === key.id)
        .length,
      4
    );
  }
);
