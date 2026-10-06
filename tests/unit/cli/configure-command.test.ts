import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const {
  listConfigureTargets,
  profileNameFromModel,
  resolveConfigureTargetOptions,
  rankPreferredModels,
  getModelPreferenceState,
  runConfigureCommand,
} = await import("../../../bin/cli/commands/configure.mjs");

test("configure picker exposes setup-backed CLI targets (manifest declaration order)", () => {
  assert.deepEqual(listConfigureTargets(), [
    "aider",
    "claude",
    "cline",
    "codex",
    "continue",
    "gemini",
    "goose",
    "kilo",
    "opencode",
    "qwen",
    "5dive",
  ]);
});

test("configure picker derives stable profile names from provider/model ids", () => {
  assert.equal(profileNameFromModel("glm/glm-5.2"), "glm52");
  assert.equal(profileNameFromModel("claude-sonnet-4.6"), "claudesonnet46");
});

test("configure picker materializes explicit remote/base-url targets", () => {
  assert.deepEqual(
    resolveConfigureTargetOptions({
      baseUrl: "https://relay.example.test/v1",
      apiKey: "sk_test",
      port: "2999",
    }),
    {
      baseUrl: "https://relay.example.test/v1",
      remote: "https://relay.example.test/v1",
      apiKey: "sk_test",
      port: "2999",
    }
  );
});

test("configure picker ranks favorites and recent model ids without leaking context data", () => {
  const ranked = rankPreferredModels("codex", ["glm/slow", "glm/fast", "qwen/recent"], {
    targets: { codex: { favorites: ["glm/fast"], recent: ["qwen/recent"] } },
  });
  assert.deepEqual(ranked, ["glm/fast", "qwen/recent", "glm/slow"]);
  assert.deepEqual(
    getModelPreferenceState("codex", {
      targets: { codex: { favorites: ["glm/fast"], recent: ["qwen/recent"] } },
    }),
    { favorites: ["glm/fast"], recent: ["qwen/recent"] }
  );
});

test("configure picker keeps preferences isolated per remote context", () => {
  const preferences = {
    targets: {},
    contexts: {
      local: { codex: { favorites: ["local/model"], recent: [] } },
      remote: { codex: { favorites: ["remote/model"], recent: [] } },
    },
  };
  assert.deepEqual(
    rankPreferredModels("codex", ["local/model", "remote/model"], preferences, "remote"),
    ["remote/model", "local/model"]
  );
  assert.deepEqual(getModelPreferenceState("codex", preferences, "local"), {
    favorites: ["local/model"],
    recent: [],
  });
});

test("configure codex writes a self-contained private TOML profile for the remote context", async () => {
  const codexHome = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-configure-codex-"));
  const server = http.createServer((request, response) => {
    assert.equal(request.url, "/v1/models");
    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify({ data: [{ id: "glm/glm-5.2", context_length: 131072 }] }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const remote = `http://127.0.0.1:${address.port}`;

  try {
    assert.equal(
      await runConfigureCommand("codex", {
        model: "glm/glm-5.2",
        yes: true,
        remote,
        apiKey: "secret-must-not-be-persisted",
        codexHome,
        allowContainerWrite: true,
      }),
      0
    );
    const profilePath = path.join(codexHome, "glm52.config.toml");
    const [content, stat] = await Promise.all([
      fs.readFile(profilePath, "utf8"),
      fs.stat(profilePath),
    ]);
    assert.match(content, /model_provider\s+= "omniroute"/);
    assert.match(content, /\[model_providers\.omniroute\]/);
    assert.ok(content.includes(`base_url = "${remote}/v1"`));
    assert.match(content, /env_key\s+= "OMNIROUTE_API_KEY"/);
    assert.doesNotMatch(content, /secret-must-not-be-persisted/);
    assert.equal(stat.mode & 0o777, 0o600);
    await assert.rejects(fs.stat(path.join(codexHome, "config.yaml")), /ENOENT/);
  } finally {
    server.close();
    await fs.rm(codexHome, { recursive: true, force: true });
  }
});
