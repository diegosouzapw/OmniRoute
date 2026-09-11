/**
 * #11943 — a custom OpenAI-compatible provider node created with prefix "of"
 * (before Openference became a built-in provider with alias "of") is silently
 * shadowed at runtime: the model resolver gives built-in ids/aliases precedence
 * over compatible-node prefixes, so `of/GLM-5.2` resolves to the BUILT-IN
 * `openference` provider (no OAuth connection) and the operator gets
 * `401 "No active credentials for provider: openference"` while the dashboard
 * shows the node's three connections as healthy.
 *
 * The precedence itself is deliberate (a node with prefix "cf" must not hijack
 * cloudflare-ai) and is NOT changed here. What must change is the runtime
 * diagnostic: when the provider that ran out of credentials is a built-in whose
 * id/alias collides with a configured compatible-node prefix, the error has to
 * say that the prefix resolved to the built-in and name the shadowed node, so the
 * operator does not have to diff a changelog to find out why routing broke.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("prefix-shadow-11943");
const { buildRequest, handleChat, resetStorage, seedConnection } = harness;

const nodesDb = await import("../../src/lib/db/providers/nodes.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { findShadowedCompatibleNode, handleNoCredentials } =
  await import("../../src/sse/handlers/chatHelpers.ts");

const SHADOWED_NODE_ID = "openai-compatible-chat-01f72ee6-0000-4000-8000-000000000000";
const SHADOWED_NODE_NAME = "Openference (custom node)";
const SAFE_NODE_ID = "openai-compatible-chat-02f72ee6-0000-4000-8000-000000000000";

type ErrorBody = { error?: { message?: string; code?: string } };

async function seedShadowedNode() {
  // Written straight to the node table: the node predates the built-in, so the
  // reserved-prefix write-path validation never saw it (exactly the issue).
  await nodesDb.createProviderNode({
    id: SHADOWED_NODE_ID,
    type: "openai-compatible",
    name: SHADOWED_NODE_NAME,
    prefix: "of",
    apiType: "chat",
    baseUrl: "https://api.openference.com/v1",
    chatPath: "/chat/completions",
    modelsPath: "/models",
  });
  for (const name of ["main", "burst1", "burst2"]) {
    await seedConnection(SHADOWED_NODE_ID, {
      name,
      apiKey: `sk-openference-${name}`,
      providerSpecificData: { prefix: "of", baseUrl: "https://api.openference.com/v1" },
    });
  }
}

test.beforeEach(async () => {
  process.env.REQUIRE_API_KEY = "false";
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("of/GLM-5.2 keeps resolving to the built-in openference provider (precedence unchanged)", async () => {
  await seedShadowedNode();

  const info = (await getModelInfo("of/GLM-5.2")) as { provider?: string; model?: string };

  assert.equal(info.provider, "openference");
  assert.equal(info.model, "GLM-5.2");
});

test("handleChat names the shadowed custom node when the built-in prefix has no credentials (#11943)", async () => {
  await seedShadowedNode();

  const response = await handleChat(
    buildRequest({
      body: {
        model: "of/GLM-5.2",
        stream: false,
        messages: [{ role: "user", content: "Hello" }],
      },
    })
  );
  const json = (await response.json()) as ErrorBody;
  const message = json.error?.message ?? "";

  assert.equal(response.status, 401);
  assert.match(message, /No active credentials for provider: openference/);
  assert.match(
    message,
    /prefix "of" is reserved by the built-in provider "openference"/,
    `runtime error must explain that the prefix resolved to the built-in, got: ${message}`
  );
  // Exact substring, not a hand-escaped RegExp: the name carries regex
  // metacharacters (parentheses) and the previous `.replace(/[()]/g, …)` escaped
  // only those, so any other metachar in a future name would have been
  // interpreted instead of matched literally (CodeQL js/incomplete-sanitization).
  const expectedNodeMention = `"${SHADOWED_NODE_NAME}" (${SHADOWED_NODE_ID})`;
  assert.ok(
    message.includes(expectedNodeMention),
    `runtime error must name the shadowed node and its id (${expectedNodeMention}), got: ${message}`
  );
  assert.match(message, /Rename that node's prefix/);
});

test("a non-colliding prefix still routes to the custom node and never gets the shadow hint", async () => {
  await nodesDb.createProviderNode({
    id: SAFE_NODE_ID,
    type: "openai-compatible",
    name: "Openference (safe prefix)",
    prefix: "ofc",
    apiType: "chat",
    baseUrl: "https://api.openference.com/v1",
  });

  const info = (await getModelInfo("ofc/GLM-5.2")) as { provider?: string };
  assert.equal(info.provider, SAFE_NODE_ID);

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openference/GLM-5.2",
        stream: false,
        messages: [{ role: "user", content: "Hello" }],
      },
    })
  );
  const json = (await response.json()) as ErrorBody;

  assert.equal(response.status, 401);
  assert.equal(json.error?.message, "No active credentials for provider: openference.");
});

test("findShadowedCompatibleNode matches a compatible node by built-in id or alias only", async () => {
  await seedShadowedNode();

  const byAlias = await findShadowedCompatibleNode("openference");
  assert.deepEqual(byAlias, { id: SHADOWED_NODE_ID, name: SHADOWED_NODE_NAME, prefix: "of" });

  // Other built-ins are untouched, and non-registry provider ids (e.g. a node's
  // own internal id) can never shadow anything.
  assert.equal(await findShadowedCompatibleNode("openai"), null);
  assert.equal(await findShadowedCompatibleNode(SHADOWED_NODE_ID), null);
  assert.equal(await findShadowedCompatibleNode(""), null);
  assert.equal(await findShadowedCompatibleNode(undefined), null);
});

test("handleNoCredentials appends the shadowing diagnostic only when a shadowed node is supplied", async () => {
  const shadowed = handleNoCredentials(
    null,
    null,
    "openference",
    "GLM-5.2",
    null,
    null,
    undefined,
    /* isCombo */ false,
    { id: SHADOWED_NODE_ID, name: SHADOWED_NODE_NAME, prefix: "of" }
  );
  assert.equal(shadowed.status, 401);
  const shadowedMessage = ((await shadowed.json()) as ErrorBody).error?.message ?? "";
  assert.match(shadowedMessage, /^No active credentials for provider: openference\./);
  assert.match(shadowedMessage, /"of\/GLM-5.2"/);
  assert.match(shadowedMessage, /never reach your custom provider node/);

  // Combo routing keeps the 404 fall-through contract and gets the same hint.
  const combo = handleNoCredentials(
    null,
    null,
    "openference",
    "GLM-5.2",
    null,
    null,
    ["ofc"],
    /* isCombo */ true,
    { id: SHADOWED_NODE_ID, name: null, prefix: "of" }
  );
  assert.equal(combo.status, 404);
  const comboMessage = ((await combo.json()) as ErrorBody).error?.message ?? "";
  assert.match(comboMessage, /Try one of: ofc\/GLM-5.2\./);
  assert.match(comboMessage, /custom provider node openai-compatible-chat-01f72ee6/);

  const plain = handleNoCredentials(
    null,
    null,
    "openference",
    "GLM-5.2",
    null,
    null,
    undefined,
    false
  );
  const plainMessage = ((await plain.json()) as ErrorBody).error?.message ?? "";
  assert.equal(plainMessage, "No active credentials for provider: openference.");
});
