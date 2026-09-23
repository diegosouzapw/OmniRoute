import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const fixture = fileURLToPath(
  new URL("../../fixtures/cli/model-validation-client.mjs", import.meta.url)
);
const receipt = {
  schemaVersion: 1,
  persistenceVerified: true,
  validation: {
    id: "b738b890-78ed-49ba-84ad-14e01ba24ecd",
    status: "passed",
    provider: "fake-provider",
    modelId: "fake-model",
    connectionId: "fake-connection",
    validatedAt: "2026-09-22T12:00:00.000Z",
    stages: { generation: "passed", toolCall: "passed", continuation: "passed" },
  },
};

for (const scenario of ["success", "redirect", "dry-run"] as const) {
  test(`real CLI HTTP client: ${scenario}`, { timeout: 60000 }, async (t) => {
    const directory = await mkdtemp(path.join(tmpdir(), "relay-model-client-"));
    const requests: Array<{ url?: string; auth?: string; body: unknown }> = [];
    const server = createServer(async (request, response) => {
      let raw = "";
      for await (const chunk of request) raw += chunk;
      requests.push({
        url: request.url,
        auth: request.headers.authorization,
        body: JSON.parse(raw || "null"),
      });
      if (scenario === "redirect") {
        response.writeHead(302, { location: "/must-not-follow" });
        response.end();
        return;
      }
      response.writeHead(201, { "content-type": "application/json", "cache-control": "no-store" });
      response.end(JSON.stringify({ ...receipt, apiKey: "remote-value-must-not-print" }));
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    t.after(async () => {
      server.closeAllConnections();
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve()))
      );
      await rm(directory, { recursive: true, force: true });
    });
    const address = server.address();
    assert.ok(address && typeof address === "object");
    const child = spawn(
      process.execPath,
      [
        fixture,
        "--api-key",
        "synthetic-test-management",
        "--base-url",
        `http://127.0.0.1:${address.port}`,
        "models",
        "test-add",
        "fake-model",
        "--provider",
        "fake-provider",
        "--connection",
        "fake-connection",
        ...(scenario === "dry-run" ? ["--dry-run"] : ["--allow-inference", "--yes"]),
      ],
      {
        cwd: directory,
        env: {
          PATH: process.env.PATH,
          HOME: directory,
          USERPROFILE: directory,
          DATA_DIR: directory,
          XDG_CONFIG_HOME: directory,
          NODE_ENV: "test",
          OMNIROUTE_CLI_TOKEN: "synthetic-machine-token",
          NO_COLOR: "1",
        },
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    let output = "";
    let errors = "";
    child.stdout.on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.on("data", (chunk) => {
      errors += chunk;
    });
    const deadline = setTimeout(() => child.kill("SIGKILL"), 45000);
    t.after(() => {
      clearTimeout(deadline);
      if (child.exitCode === null) child.kill("SIGKILL");
    });
    const exit = await new Promise<number | null>((resolve, reject) => {
      child.once("error", reject);
      child.once("close", resolve);
    });
    clearTimeout(deadline);
    assert.ok(!(output + errors).includes("remote-value-must-not-print"));
    assert.ok(!(output + errors).includes("synthetic-test-management"));
    assert.equal(requests.length, scenario === "dry-run" ? 0 : 1);
    if (scenario === "redirect") {
      assert.equal(exit, 1);
      assert.match(errors, /not verified/i);
      return;
    }
    assert.equal(exit, 0, errors);
    const parsed = JSON.parse(output);
    if (scenario === "dry-run") {
      assert.equal(parsed.dryRun, true);
    } else {
      assert.deepEqual(parsed, receipt);
      assert.equal(requests[0].url, "/api/provider-models/validate-and-add");
      assert.equal(requests[0].auth, "Bearer synthetic-test-management");
      assert.equal((requests[0].body as { connectionId: string }).connectionId, "fake-connection");
    }
  });
}
