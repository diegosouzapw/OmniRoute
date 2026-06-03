import test from "node:test";
import assert from "node:assert/strict";

test("environment.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/utils/environment.mjs");
  assert.equal(typeof mod.detectRestrictedEnvironment, "function");
  assert.equal(typeof mod.getEnvBanner, "function");
});

test("detectRestrictedEnvironment retorna objeto com type e flags", async () => {
  const { detectRestrictedEnvironment } = await import("../../bin/cli/utils/environment.mjs");
  const result = detectRestrictedEnvironment();
  assert.ok(typeof result === "object" && result !== null);
  assert.ok(typeof result.type === "string");
  assert.ok(typeof result.canOpenBrowser === "boolean");
  assert.ok(typeof result.canUseTray === "boolean");
});

test("detectRestrictedEnvironment detecta Codespaces via CODESPACES=true", async () => {
  const { detectRestrictedEnvironment } = await import("../../bin/cli/utils/environment.mjs");
  const orig = process.env.CODESPACES;
  process.env.CODESPACES = "true";
  try {
    const result = detectRestrictedEnvironment();
    assert.equal(result.type, "github-codespaces");
    assert.equal(result.canOpenBrowser, false);
    assert.equal(result.canUseTray, false);
  } finally {
    if (orig === undefined) delete process.env.CODESPACES;
    else process.env.CODESPACES = orig;
  }
});

test("detectRestrictedEnvironment detecta WSL via WSL_DISTRO_NAME", async () => {
  const { detectRestrictedEnvironment } = await import("../../bin/cli/utils/environment.mjs");
  // Skip se Codespaces (env pode estar setado no CI)
  if (process.env.CODESPACES === "true") return;
  const orig = process.env.WSL_DISTRO_NAME;
  process.env.WSL_DISTRO_NAME = "Ubuntu";
  try {
    const result = detectRestrictedEnvironment();
    assert.equal(result.type, "wsl");
    assert.equal(result.canOpenBrowser, true);
    assert.equal(result.canUseTray, false);
  } finally {
    if (orig === undefined) delete process.env.WSL_DISTRO_NAME;
    else process.env.WSL_DISTRO_NAME = orig;
  }
});

test("detectRestrictedEnvironment detecta CI via CI env var", async () => {
  const { detectRestrictedEnvironment } = await import("../../bin/cli/utils/environment.mjs");
  if (process.env.CODESPACES === "true" || process.env.WSL_DISTRO_NAME) return;
  const orig = process.env.CI;
  process.env.CI = "true";
  try {
    const result = detectRestrictedEnvironment();
    assert.equal(result.type, "ci");
    assert.equal(result.canOpenBrowser, false);
  } finally {
    if (orig === undefined) delete process.env.CI;
    else process.env.CI = orig;
  }
});

test("detectRestrictedEnvironment detecta Gitpod via GITPOD_WORKSPACE_ID", async () => {
  const { detectRestrictedEnvironment } = await import("../../bin/cli/utils/environment.mjs");
  if (process.env.CODESPACES === "true" || process.env.WSL_DISTRO_NAME) return;
  const orig = process.env.GITPOD_WORKSPACE_ID;
  process.env.GITPOD_WORKSPACE_ID = "ws-abc123";
  try {
    const result = detectRestrictedEnvironment();
    assert.equal(result.type, "gitpod");
    assert.equal(result.canOpenBrowser, false);
    assert.equal(result.canUseTray, false);
  } finally {
    if (orig === undefined) delete process.env.GITPOD_WORKSPACE_ID;
    else process.env.GITPOD_WORKSPACE_ID = orig;
  }
});

test("getEnvBanner retorna null em ambiente desktop", async () => {
  const { getEnvBanner, detectRestrictedEnvironment } =
    await import("../../bin/cli/utils/environment.mjs");
  const env = detectRestrictedEnvironment();
  if (env.type !== "desktop") return; // não pode testar desktop se rodando em CI/Codespaces
  const banner = getEnvBanner();
  assert.equal(banner, null);
});

test("getEnvBanner retorna string em ambiente restrito (Gitpod)", async () => {
  const { getEnvBanner } = await import("../../bin/cli/utils/environment.mjs");
  if (process.env.CODESPACES === "true" || process.env.WSL_DISTRO_NAME) return;
  const orig = process.env.GITPOD_WORKSPACE_ID;
  process.env.GITPOD_WORKSPACE_ID = "ws-test";
  try {
    const banner = getEnvBanner();
    assert.ok(typeof banner === "string");
    assert.ok((banner as string).includes("gitpod"));
  } finally {
    if (orig === undefined) delete process.env.GITPOD_WORKSPACE_ID;
    else process.env.GITPOD_WORKSPACE_ID = orig;
  }
});
