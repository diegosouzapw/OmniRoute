import assert from "node:assert/strict";
import test from "node:test";
import { handleAgenticPipelineChat } from "../../open-sse/services/agenticPipeline.ts";

const noop = () => undefined;
const log = { info: noop, warn: noop, debug: noop, error: noop };
const plan = () =>
  Response.json({ choices: [{ message: { content: "OMNIROUTE_ROUTE: TOOLS\nRead the file." } }] });
const steps = [
  { model: "p/planner" },
  { model: "p/primary", prompt: "primary" },
  { model: "p/backup", prompt: "backup" },
];
const body = {
  messages: [{ role: "user", content: "inspect" }],
  tools: [{ name: "read" }],
  stream: true,
};

test("executor fallback preserves native tools, streaming and each executor's prompt", async () => {
  const seen: string[] = [];
  const stream = new Response("data: tool-call\n\n", {
    headers: { "content-type": "text/event-stream" },
  });
  const result = await handleAgenticPipelineChat({
    body,
    steps,
    log,
    handleSingleModel: async (request, model) => {
      seen.push(model);
      if (model === "p/planner") return plan();
      assert.deepEqual(request.tools, body.tools);
      assert.equal(request.stream, true);
      assert.match(JSON.stringify(request), model === "p/primary" ? /primary/ : /backup/);
      return model === "p/primary" ? new Response("limited", { status: 429 }) : stream;
    },
  });
  assert.equal(result, stream);
  assert.deepEqual(seen, ["p/planner", "p/primary", "p/backup"]);
  assert.equal(await result.text(), "data: tool-call\n\n");
});

test("network exceptions fall back and mutations do not leak into the backup request", async () => {
  const result = await handleAgenticPipelineChat({
    body,
    steps,
    log,
    handleSingleModel: async (request, model) => {
      if (model === "p/planner") return plan();
      if (model === "p/primary") {
        request.tools = [];
        throw new TypeError("network failed");
      }
      assert.deepEqual(request.tools, body.tools);
      return new Response("backup");
    },
  });
  assert.equal(await result.text(), "backup");
});

test("exhausted executor chain returns the final upstream failure intact", async () => {
  const final = new Response("busy", { status: 503, headers: { "retry-after": "10" } });
  const result = await handleAgenticPipelineChat({
    body,
    steps,
    log,
    handleSingleModel: async (_request, model) =>
      model === "p/planner"
        ? plan()
        : model === "p/primary"
          ? new Response("limited", { status: 429 })
          : final,
  });
  assert.equal(result, final);
  assert.equal(result.headers.get("retry-after"), "10");
  assert.equal(await result.text(), "busy");
});

test("successful primary response does not invoke backups", async () => {
  const seen: string[] = [];
  await handleAgenticPipelineChat({
    body,
    steps,
    log,
    handleSingleModel: async (_request, model) => {
      seen.push(model);
      return model === "p/planner" ? plan() : new Response("ok");
    },
  });
  assert.deepEqual(seen, ["p/planner", "p/primary"]);
});

test("client abort is propagated without trying backups", async () => {
  const seen: string[] = [];
  await assert.rejects(
    handleAgenticPipelineChat({
      body,
      steps,
      log,
      handleSingleModel: async (_request, model) => {
        seen.push(model);
        if (model === "p/planner") return plan();
        throw new DOMException("aborted", "AbortError");
      },
    }),
    { name: "AbortError" }
  );
  assert.deepEqual(seen, ["p/planner", "p/primary"]);
});
