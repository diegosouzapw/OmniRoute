// #6142 — devin cloud-agent provider validator + static model catalog wiring.
// Regression guard for the "not supported" fallback devin used to always hit on the
// generic Providers config page (parity with the existing jules cloud-agent wiring).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import { validateDevinCloudAgentProvider } from "../../src/lib/providers/validation/webProvidersB.ts";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";

// Writes a tiny executable shell script that inspects WINDSURF_API_KEY (the env
// var the real devin-cli executor uses, per open-sse/executors/devin-cli.ts) and
// exits 0 only when it matches `expectedKey`. Pointing CLI_DEVIN_BIN at this
// script exercises the REAL spawn() call in validateDevinCliKeyFallback — no
// module mocking — proving both that the fallback is invoked and that it wires
// the api key through the same env var the executor relies on.
function writeFakeDevinCli(expectedKey: string, exitCode: number): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fake-devin-cli-"));
  const scriptPath = path.join(dir, "devin");
  fs.writeFileSync(
    scriptPath,
    `#!/bin/sh\nif [ "$WINDSURF_API_KEY" = "${expectedKey}" ]; then\n  exit ${exitCode}\nelse\n  exit 1\nfi\n`,
    { mode: 0o755 }
  );
  return scriptPath;
}

test("#6142: devin cloud-agent validator is wired into the SPECIALTY_VALIDATORS dispatcher", async () => {
  const originalFetch = globalThis.fetch;
  // #devin-cli-key: the 401 path falls back to probing the local Devin CLI.
  // Point CLI_DEVIN_BIN at a nonexistent binary so the fallback fails
  // deterministically regardless of the host machine's devin install.
  const originalBin = process.env.CLI_DEVIN_BIN;
  process.env.CLI_DEVIN_BIN = "/nonexistent/devin-for-tests";
  globalThis.fetch = (async () => new Response("{}", { status: 401 })) as unknown as typeof fetch;
  try {
    const result = await validateProviderApiKey({
      provider: "devin",
      apiKey: "k",
    });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
    assert.notEqual(result.unsupported, true);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalBin === undefined) delete process.env.CLI_DEVIN_BIN;
    else process.env.CLI_DEVIN_BIN = originalBin;
  }
});

test("#6142: validateDevinCloudAgentProvider maps 401 to Invalid API key", async () => {
  const originalFetch = globalThis.fetch;
  const originalBin = process.env.CLI_DEVIN_BIN;
  process.env.CLI_DEVIN_BIN = "/nonexistent/devin-for-tests";
  globalThis.fetch = (async () => new Response("{}", { status: 401 })) as unknown as typeof fetch;
  try {
    const result = await validateDevinCloudAgentProvider({ apiKey: "k" });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalBin === undefined) delete process.env.CLI_DEVIN_BIN;
    else process.env.CLI_DEVIN_BIN = originalBin;
  }
});

test("#6142: validateDevinCloudAgentProvider maps 403 to Invalid API key", async () => {
  const originalFetch = globalThis.fetch;
  const originalBin = process.env.CLI_DEVIN_BIN;
  process.env.CLI_DEVIN_BIN = "/nonexistent/devin-for-tests";
  globalThis.fetch = (async () => new Response("{}", { status: 403 })) as unknown as typeof fetch;
  try {
    const result = await validateDevinCloudAgentProvider({ apiKey: "k" });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalBin === undefined) delete process.env.CLI_DEVIN_BIN;
    else process.env.CLI_DEVIN_BIN = originalBin;
  }
});

test("#6142: validateDevinCloudAgentProvider accepts a 2xx probe as valid", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ sessions: [] }), { status: 200 })) as unknown as typeof fetch;
  try {
    const result = await validateDevinCloudAgentProvider({ apiKey: "cog_good_key" });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#devin-cli-key: a CLI-format key rejected by the HTTP API validates via the real CLI probe", async () => {
  const originalFetch = globalThis.fetch;
  const originalBin = process.env.CLI_DEVIN_BIN;
  const apiKey = "apk_user_cli_format_key";
  const fakeCliPath = writeFakeDevinCli(apiKey, 0);
  process.env.CLI_DEVIN_BIN = fakeCliPath;
  globalThis.fetch = (async () => new Response("{}", { status: 401 })) as unknown as typeof fetch;
  try {
    const result = await validateDevinCloudAgentProvider({ apiKey });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    assert.match(result.warning ?? "", /Devin CLI/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalBin === undefined) delete process.env.CLI_DEVIN_BIN;
    else process.env.CLI_DEVIN_BIN = originalBin;
    fs.rmSync(path.dirname(fakeCliPath), { recursive: true, force: true });
  }
});

test("#devin-cli-key: the CLI fallback still rejects when the CLI probe itself fails (wrong key)", async () => {
  const originalFetch = globalThis.fetch;
  const originalBin = process.env.CLI_DEVIN_BIN;
  const fakeCliPath = writeFakeDevinCli("the-correct-key", 0);
  process.env.CLI_DEVIN_BIN = fakeCliPath;
  globalThis.fetch = (async () => new Response("{}", { status: 401 })) as unknown as typeof fetch;
  try {
    const result = await validateDevinCloudAgentProvider({ apiKey: "a-different-key" });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalBin === undefined) delete process.env.CLI_DEVIN_BIN;
    else process.env.CLI_DEVIN_BIN = originalBin;
    fs.rmSync(path.dirname(fakeCliPath), { recursive: true, force: true });
  }
});

test("#6142: devin exposes a static model catalog for the 'Available Models' UI (parity with jules)", () => {
  const models = getStaticModelsForProvider("devin");
  assert.ok(Array.isArray(models) && models.length > 0);
  assert.equal(models[0].id, "devin");
});
