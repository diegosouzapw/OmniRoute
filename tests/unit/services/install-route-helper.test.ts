import assert from "node:assert/strict";
import { test } from "node:test";

import {
  handleServiceInstall,
  readServiceInstallVersion,
} from "../../../src/app/api/services/_shared/installRoute.ts";
import { InstallError } from "../../../src/lib/services/installers/utils.ts";

async function readJson(response: Response) {
  return (await response.json()) as Record<string, unknown>;
}

test("readServiceInstallVersion defaults empty requests to latest", async () => {
  const result = await readServiceInstallVersion(
    new Request("http://localhost/api/services/example/install", { method: "POST" })
  );

  assert.deepEqual(result, { ok: true, version: "latest" });
});

test("readServiceInstallVersion returns the requested version", async () => {
  const result = await readServiceInstallVersion(
    new Request("http://localhost/api/services/example/install", {
      method: "POST",
      body: JSON.stringify({ version: "1.2.3" }),
      headers: { "Content-Type": "application/json" },
    })
  );

  assert.deepEqual(result, { ok: true, version: "1.2.3" });
});

test("readServiceInstallVersion rejects malformed versions (#5495 SERVICE_VERSION_PATTERN guard)", async () => {
  const result = await readServiceInstallVersion(
    new Request("http://localhost/api/services/example/install", {
      method: "POST",
      body: JSON.stringify({ version: "../../malicious" }),
      headers: { "Content-Type": "application/json" },
    })
  );

  assert.equal(result.ok, false);
  if (result.ok) throw new Error("expected version validation failure");
  assert.equal(result.response.status, 400);
});

test("handleServiceInstall never reaches the installer for a malformed version (#5495)", async () => {
  const calls: string[] = [];
  const response = await handleServiceInstall(
    new Request("http://localhost/api/services/example/install", {
      method: "POST",
      body: JSON.stringify({ version: "v1; rm -rf /" }),
      headers: { "Content-Type": "application/json" },
    }),
    async (version) => {
      calls.push(version);
      return { installedVersion: version, installPath: "/tmp/service", durationMs: 1 };
    }
  );

  assert.deepEqual(calls, []);
  assert.equal(response.status, 400);
});

test("readServiceInstallVersion preserves invalid JSON error shape", async () => {
  const result = await readServiceInstallVersion(
    new Request("http://localhost/api/services/example/install", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    })
  );

  assert.equal(result.ok, false);
  if (result.ok) throw new Error("expected parse failure");
  assert.equal(result.response.status, 400);
  const body = await readJson(result.response);
  assert.equal((body.error as Record<string, unknown>).message, "Invalid JSON body");
});

test("handleServiceInstall wraps successful installer results", async () => {
  const calls: string[] = [];
  const response = await handleServiceInstall(
    new Request("http://localhost/api/services/example/install", {
      method: "POST",
      body: JSON.stringify({ version: "2.0.0" }),
      headers: { "Content-Type": "application/json" },
    }),
    async (version) => {
      calls.push(version);
      return {
        installedVersion: version,
        installPath: "/tmp/service",
        durationMs: 42,
      };
    }
  );

  assert.deepEqual(calls, ["2.0.0"]);
  assert.equal(response.status, 200);
  assert.deepEqual(await readJson(response), {
    ok: true,
    installedVersion: "2.0.0",
    installPath: "/tmp/service",
    durationMs: 42,
  });
});

test("handleServiceInstall maps InstallError to its friendly message and status", async () => {
  const response = await handleServiceInstall(
    new Request("http://localhost/api/services/example/install", { method: "POST" }),
    async () => {
      throw new InstallError("raw command failed", "Friendly install failure", 503);
    }
  );

  assert.equal(response.status, 503);
  const body = await readJson(response);
  assert.equal((body.error as Record<string, unknown>).message, "Friendly install failure");
});
