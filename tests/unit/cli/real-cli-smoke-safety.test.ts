import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  buildSmokeEnvironment,
  classifySmokeResult,
  runProcess,
  startSmokeServer,
  SMOKE_TOKEN,
} from "../../../scripts/cli/smoke-cli-integrations.mjs";

const marker = "OMNIROUTE_SMOKE_OK_unpredictable_response";
async function waitForProcessTermination(pid: number): Promise<boolean> {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    try {
      const state = readFileSync(`/proc/${pid}/stat`, "utf8").split(") ")[1].split(" ")[0];
      if (["Z", "X"].includes(state)) return true;
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") return true;
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}
test(
  "smoke runner terminates pipe-inheriting helpers after their parent exits",
  {
    skip: process.platform !== "linux",
  },
  async () => {
    const result = await runProcess(
      [
        "-e",
        "const {spawn}=require('node:child_process'); const child=spawn(process.execPath,['-e','setInterval(() => {}, 1000)'],{stdio:'inherit'}); console.log(child.pid); child.unref();",
      ],
      {
        timeoutMs: 20_000,
        env: { PATH: process.env.PATH },
      }
    );
    assert.equal(result.code, 0);
    assert.equal(result.timedOut, false);
    const pid = Number(result.stdout.trim());
    assert.ok(Number.isInteger(pid) && pid > 0);
    assert.equal(await waitForProcessTermination(pid), true, "helper must terminate after SIGKILL");
  }
);
const execution = { code: 0, stdout: marker, stderr: "", timedOut: false };
const receipt = {
  method: "POST",
  path: "/v1/chat/completions",
  model: "smoke/qwen",
  responseMode: "json",
  statusCode: 200,
  responseFinished: true,
  authenticated: true,
};

test("smoke verdict rejects a marker printed with an unsupported endpoint", () => {
  assert.equal(
    classifySmokeResult(execution, [{ ...receipt, path: "/wrong" }], marker, "qwen"),
    "FAIL"
  );
});
test("smoke verdict rejects the wrong model even when the response marker is printed", () => {
  assert.equal(
    classifySmokeResult(execution, [{ ...receipt, model: "other" }], marker, "qwen"),
    "FAIL"
  );
});
test("smoke verdict rejects responses that were not finished or authenticated", () => {
  for (const change of [
    { responseFinished: false },
    { authenticated: false },
    { statusCode: 404 },
  ]) {
    assert.equal(
      classifySmokeResult(execution, [{ ...receipt, ...change }], marker, "qwen"),
      "FAIL"
    );
  }
});
test("smoke verdict requires response marker in stdout, never just diagnostic stderr", () => {
  assert.equal(
    classifySmokeResult({ ...execution, stdout: "", stderr: marker }, [receipt], marker, "qwen"),
    "FAIL"
  );
});
test("smoke verdict accepts an authenticated completed response on the expected protocol", () => {
  assert.equal(classifySmokeResult(execution, [receipt], marker, "qwen"), "PASS");
});

test("smoke environment excludes inherited credentials, proxies and runtime injections", () => {
  const temporary = mkdtempSync(path.join(os.tmpdir(), "smoke-env-test-"));
  try {
    const env = buildSmokeEnvironment(temporary, SMOKE_TOKEN, "/fake/bin", {
      PATH: "/usr/bin",
      HOME: "/real/home",
      OPENAI_API_KEY: "secret",
      HTTP_PROXY: "http://private",
      NODE_OPTIONS: "--import=/private/code.mjs",
      CODEX_HOME: "/real/codex",
      QWEN_HOME: "/real/qwen",
      AWS_SECRET_ACCESS_KEY: "secret",
      NODE_PATH: "/private/node",
      LD_PRELOAD: "/private/library.so",
      PYTHONPATH: "/private/python",
      STORAGE_ENCRYPTION_KEY: "real-user-storage-key",
    });
    for (const key of [
      "OPENAI_API_KEY",
      "HTTP_PROXY",
      "NODE_OPTIONS",
      "AWS_SECRET_ACCESS_KEY",
      "NODE_PATH",
      "LD_PRELOAD",
      "PYTHONPATH",
    ]) {
      assert.equal(env[key], undefined);
    }
    for (const key of [
      "HOME",
      "USERPROFILE",
      "CODEX_HOME",
      "QWEN_HOME",
      "GEMINI_CLI_HOME",
      "DATA_DIR",
      "XDG_CONFIG_HOME",
      "TMPDIR",
    ]) {
      assert.ok(env[key].startsWith(`${temporary}${path.sep}`));
    }
    assert.equal(env.OMNIROUTE_SMOKE_KEY, SMOKE_TOKEN);
    assert.equal(env.PATH, `/fake/bin${path.delimiter}/usr/bin`);
    assert.equal(env.OPENCODE_DISABLE_MODELS_FETCH, "true");
    assert.equal(env.LITELLM_LOCAL_MODEL_COST_MAP, "True");
    assert.equal(env.PYTHONUNBUFFERED, "1");
    assert.equal(env.STORAGE_ENCRYPTION_KEY, "omniroute-smoke-storage-sentinel-not-a-real-key");
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test("smoke marker is generated per server and never reflected from the request", async () => {
  const server = await startSmokeServer();
  try {
    assert.match(server.marker, /^OMNIROUTE_SMOKE_OK_[a-f\d-]+$/);
    const response = await fetch(`${server.baseUrl}/v1/responses`, {
      method: "POST",
      headers: { authorization: `Bearer ${SMOKE_TOKEN}`, "content-type": "application/json" },
      body: JSON.stringify({ model: "smoke/codex", input: "reflected-input", stream: true }),
    });
    const output = await response.text();
    assert.ok(output.includes(server.marker));
    assert.equal(output.includes("reflected-input"), false);
    assert.equal(server.requests[0].responseFinished, true);
  } finally {
    await server.close();
  }
});

test("smoke server rejects missing sentinel and lookalike endpoint", async () => {
  const server = await startSmokeServer();
  try {
    for (const [endpoint, status] of [
      ["/v1/responses", 401],
      ["/other/responses", 404],
    ] as const) {
      const response = await fetch(`${server.baseUrl}${endpoint}`, { method: "POST", body: "{}" });
      assert.equal(response.status, status);
      assert.equal((await response.text()).includes(server.marker), false);
    }
  } finally {
    await server.close();
  }
});

test(
  "smoke timeout escalates for a child ignoring SIGTERM",
  { skip: process.platform === "win32" },
  async () => {
    const result = await runProcess(
      ["-e", "process.on('SIGTERM', () => {}); console.log('ready'); setInterval(() => {}, 1000)"],
      {
        timeoutMs: 10_000,
        killGraceMs: 50,
        env: { PATH: process.env.PATH },
      }
    );
    assert.equal(result.timedOut, true);
    assert.ok(result.stdout.includes("ready"));
    assert.equal(result.terminationSignal, "SIGKILL");
    assert.equal(result.processGroup, true);
  }
);
