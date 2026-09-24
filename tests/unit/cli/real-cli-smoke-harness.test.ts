import test from "node:test";
import assert from "node:assert/strict";

import {
  SMOKE_MARKER,
  SMOKE_TOKEN,
  buildSmokeInvocation,
  completedResponsesBody,
  openAiChatBody,
  parseSmokeArgs,
  runProcess,
  startSmokeServer,
  targetToolArgs,
} from "../../../scripts/cli/smoke-cli-integrations.mjs";

test("real CLI smoke recipes are non-interactive and never put a credential on argv", () => {
  assert.ok(targetToolArgs("aider").includes("--disable-playwright"));
  for (const target of ["aider", "goose", "opencode", "qwen", "codex"]) {
    const invocation = buildSmokeInvocation(target, "http://127.0.0.1:29999");
    assert.ok(invocation.includes("--api-key-env"));
    assert.equal(invocation.includes(SMOKE_TOKEN), false);
    assert.equal(targetToolArgs(target).join(" ").includes(SMOKE_MARKER), false);
  }
});

test("mock provider bodies expose the exact marker in both supported OpenAI protocols", () => {
  assert.equal(openAiChatBody().choices[0].message.content, SMOKE_MARKER);
  assert.equal(completedResponsesBody().output[0].content[0].text, SMOKE_MARKER);
});

test("isolated environment inheritance is explicit and precedes the CLI argument separator", () => {
  const options = parseSmokeArgs(["--inherit-isolated-env", "--targets", "opencode"]);
  assert.equal(options.inheritIsolatedEnv, true);
  const invocation = buildSmokeInvocation("opencode", "http://127.0.0.1:29999", options);
  assert.ok(invocation.includes("--inherit-env"));
  assert.ok(invocation.indexOf("--inherit-env") < invocation.indexOf("--"));
  assert.equal(
    buildSmokeInvocation("opencode", "http://127.0.0.1:29999").includes("--inherit-env"),
    false
  );
});

test("smoke harness accepts --help without scheduling real targets", () => {
  assert.deepEqual(parseSmokeArgs(["--help"]), {
    targets: [],
    binDir: "",
    json: false,
    help: true,
    inheritIsolatedEnv: false,
  });
});

test("smoke server records endpoint, model, response mode, status, and cleanup", async () => {
  const server = await startSmokeServer();
  try {
    const response = await fetch(`${server.baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${SMOKE_TOKEN}` },
      body: JSON.stringify({ model: "smoke/receipt", stream: true }),
    });
    assert.equal(response.status, 200);
    await response.text();
    assert.deepEqual(server.requests, [
      {
        method: "POST",
        path: "/v1/chat/completions",
        model: "smoke/receipt",
        responseMode: "sse",
        statusCode: 200,
        authenticated: true,
        responseFinished: true,
      },
    ]);
  } finally {
    await server.close();
  }
  assert.equal(server.state.closed, true);
});

test("smoke process timeout records cancellation and settles after cleanup", async () => {
  const result = await runProcess(["-e", "setInterval(() => {}, 1000)"], {
    env: process.env,
    timeoutMs: 50,
  });
  assert.equal(result.timedOut, true);
  // Under CPU pressure delivery/reaping can exceed the grace period. Both
  // signals are valid cancellation; the dedicated safety test proves escalation.
  assert.ok(["SIGTERM", "SIGKILL"].includes(result.terminationSignal));
});
