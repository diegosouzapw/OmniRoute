/**
 * CLI client-version override store: normalization, precedence, hydration.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  CLI_VERSION_KEYS,
  CLI_VERSION_PATTERN,
  getCliVersionOverride,
  getCliVersionOverrides,
  hydrateCliVersionOverrides,
  normalizeCliVersion,
  normalizeCliVersionOverrides,
  setCliVersionOverrides,
} from "../../src/shared/constants/cliVersions.ts";

// Every `await import` MUST precede the first test(): node:test only registers
// tests declared before the first top-level await in the module.
const claude = await import("../../src/shared/constants/claudeCodeClient.ts");
const codex = await import("../../open-sse/config/codexClient.ts");

async function withEnv<T>(
  entries: Record<string, string | undefined>,
  fn: () => T | Promise<T>
): Promise<T> {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(entries)) {
    previous.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

/** The store is process-global; clear it around every case. */
function resetOverrides() {
  setCliVersionOverrides({});
}

test("normalizeCliVersion accepts the version tokens a real CLI sends", () => {
  resetOverrides();
  for (const value of ["2.1.259", "0.155.0", "1.0.81-6", "2026.07.08-0c04a8a", "a", "0.33.2"]) {
    assert.equal(normalizeCliVersion(value), value, `should accept ${value}`);
  }
  // Exactly 32 characters is still inside the bound.
  assert.equal(normalizeCliVersion("a".repeat(32)), "a".repeat(32));
  // CLI_VERSION_PATTERN is the rule the store enforces, so it must agree with
  // normalizeCliVersion at the boundary.
  assert.ok(CLI_VERSION_PATTERN.test("a".repeat(32)));
  assert.ok(!CLI_VERSION_PATTERN.test("a".repeat(33)));
});

test("normalizeCliVersion trims accidental whitespace but drops unsafe tokens", () => {
  resetOverrides();
  assert.equal(normalizeCliVersion("   2.1.259   "), "2.1.259");
  for (const value of [
    "",
    "   ",
    "-2.1.259",
    ".2.1.259",
    "bad version value",
    "2.1.259;drop",
    "2.1.259\nX-Injected: 1",
    "a".repeat(33),
    null,
    undefined,
    42,
    {},
    [],
    true,
  ]) {
    assert.equal(normalizeCliVersion(value), null, `should reject ${String(value)}`);
  }
});

test("normalizeCliVersionOverrides keeps only well-formed values under known keys", () => {
  resetOverrides();
  const normalized = normalizeCliVersionOverrides({
    claude: "2.1.260",
    codex: "not a version",
    copilot: "1.0.82",
    ["__proto__"]: "1.0.0",
  });
  assert.deepEqual(normalized, { claude: "2.1.260" });
});

test("normalizeCliVersionOverrides ignores input that is not a plain record", () => {
  resetOverrides();
  for (const value of [null, undefined, "nope", 42, ["claude"], true]) {
    assert.deepEqual(normalizeCliVersionOverrides(value), {}, `should ignore ${String(value)}`);
  }
});

test("setCliVersionOverrides drops malformed values instead of coercing them", () => {
  resetOverrides();
  const applied = setCliVersionOverrides({ claude: "2.1.260", codex: "bad value!" });
  assert.deepEqual(applied, { claude: "2.1.260" });
  assert.deepEqual(getCliVersionOverrides(), { claude: "2.1.260" });
  assert.equal(getCliVersionOverride("claude"), "2.1.260");
  assert.equal(getCliVersionOverride("codex"), null);
});

test("setCliVersionOverrides replaces the whole map and ignores unknown keys", () => {
  resetOverrides();
  setCliVersionOverrides({ claude: "2.1.260", codex: "0.156.0" });
  setCliVersionOverrides({ codex: "0.157.0", grok: "1.0.0" });
  assert.deepEqual(getCliVersionOverrides(), { codex: "0.157.0" });
  assert.deepEqual([...CLI_VERSION_KEYS], ["claude", "codex"]);
});

test("Claude precedence: falls to the captured pin when nothing is set", async () => {
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: undefined }, () => {
    resetOverrides();
    assert.equal(claude.getClaudeCodeClientVersion(), claude.CLAUDE_CODE_CLIENT_VERSION);
    assert.equal(claude.getClaudeCodeClientVersionSource(), "default");
  });
});

test("Claude precedence: env wins over the pin when no override is set", async () => {
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: "2.1.259" }, () => {
    resetOverrides();
    assert.equal(claude.getClaudeCodeClientVersion(), "2.1.259");
    assert.equal(claude.getClaudeCodeClientVersionSource(), "env");
  });
});

test("Claude precedence: the dashboard override outranks a set env var", async () => {
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: "2.1.259" }, () => {
    setCliVersionOverrides({ claude: "2.1.261" });
    assert.equal(claude.getClaudeCodeClientVersion(), "2.1.261");
    assert.equal(claude.getClaudeCodeClientVersionSource(), "settings");
    resetOverrides();
  });
});

test("Claude override moves the UA but NOT the pinned billing build revision", async () => {
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: undefined }, () => {
    setCliVersionOverrides({ claude: "2.1.260" });
    assert.equal(claude.getClaudeCodeUserAgent("cli"), "claude-cli/2.1.260 (external, cli)");
    assert.equal(claude.CLAUDE_CODE_CLIENT_BUILD_REVISION, "1e2");
    assert.equal(
      claude.getClaudeCodeClientBillingVersion(),
      "2.1.260." + claude.CLAUDE_CODE_CLIENT_BUILD_REVISION
    );
    resetOverrides();
  });
});

const CALLER_HEADERS = {
  "user-agent": "codex_cli_rs/0.154.0 (Mac OS 26.6.2; arm64) xterm-256color",
};

test("Codex precedence: falls to the captured default when nothing is set", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: undefined }, () => {
    resetOverrides();
    assert.equal(codex.getCodexClientVersion(), codex.DEFAULT_CODEX_CLIENT_VERSION);
    assert.equal(codex.getCodexClientVersionSource(), "default");
    assert.equal(
      codex.resolveCodexAdvertisedVersion(undefined),
      codex.DEFAULT_CODEX_CLIENT_VERSION
    );
  });
});

test("Codex precedence: env wins over the default when no override is set", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: "0.153.0" }, () => {
    resetOverrides();
    assert.equal(codex.getCodexClientVersion(), "0.153.0");
    assert.equal(codex.getCodexClientVersionSource(), "env");
    assert.equal(codex.resolveCodexAdvertisedVersion(null), "0.153.0");
  });
});

test("Codex inference: the caller's own version beats CODEX_CLIENT_VERSION", async () => {
  // Deliberate, and pinned here so nobody "fixes" it: a stale pin must not lock
  // an operator out of a model their own CLI already supports.
  await withEnv({ CODEX_CLIENT_VERSION: "0.153.0" }, () => {
    resetOverrides();
    assert.equal(codex.getCodexClientVersionFromHeaders(CALLER_HEADERS), "0.154.0");
    assert.equal(codex.resolveCodexAdvertisedVersion(CALLER_HEADERS), "0.154.0");
  });
});

test("Codex inference: the dashboard override outranks the caller's forwarded version", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: "0.153.0" }, () => {
    setCliVersionOverrides({ codex: "0.156.0" });
    assert.equal(codex.resolveCodexAdvertisedVersion(CALLER_HEADERS), "0.156.0");
    assert.equal(codex.getCodexClientVersionSource(), "settings");
    resetOverrides();
  });
});

test("Codex inference: a safe `version` header is forwarded verbatim", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: "0.153.0" }, () => {
    resetOverrides();
    assert.equal(codex.resolveCodexAdvertisedVersion({ version: "0.155.0" }), "0.155.0");
  });
});

test("Codex inference: unusable caller headers fall through to env then default", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: undefined }, () => {
    resetOverrides();
    assert.equal(codex.resolveCodexAdvertisedVersion({}), codex.DEFAULT_CODEX_CLIENT_VERSION);
    assert.equal(
      codex.resolveCodexAdvertisedVersion({ version: "not a version" }),
      codex.DEFAULT_CODEX_CLIENT_VERSION
    );
    assert.equal(
      codex.resolveCodexAdvertisedVersion({ "user-agent": "curl/8.0" }),
      codex.DEFAULT_CODEX_CLIENT_VERSION
    );
  });
});

// Discovery layer (#15663 landed automatic version discovery on the base while
// this PR was open). Effective precedence after the merge:
//   dashboard override > env > discovered cache newer than the pin > pin.
function bumpTriple(version: string): string {
  const [major, minor, patch] = version.split(".").map(Number);
  return `${major}.${minor}.${patch + 7}`;
}

function npmLatest(version: string): typeof fetch {
  return (async () =>
    new Response(JSON.stringify({ version }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as unknown as typeof fetch;
}

test("Claude precedence: a discovered npm version newer than the pin reports `discovered`", async () => {
  const discovered = bumpTriple(claude.CLAUDE_CODE_CLIENT_VERSION);
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: undefined }, async () => {
    resetOverrides();
    claude.resetClaudeCodeClientVersionCache();
    try {
      assert.equal(await claude.refreshClaudeCodeClientVersion(npmLatest(discovered)), discovered);
      assert.equal(claude.getClaudeCodeClientVersion(), discovered);
      assert.equal(claude.getClaudeCodeClientVersionSource(), "discovered");
    } finally {
      claude.resetClaudeCodeClientVersionCache();
    }
  });
});

test("Claude precedence: env and the dashboard override both outrank a discovered version", async () => {
  const discovered = bumpTriple(claude.CLAUDE_CODE_CLIENT_VERSION);
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: "2.1.259" }, async () => {
    resetOverrides();
    claude.resetClaudeCodeClientVersionCache();
    try {
      await withEnv({ CLAUDE_CODE_CLIENT_VERSION: undefined }, () =>
        claude.refreshClaudeCodeClientVersion(npmLatest(discovered))
      );
      assert.equal(claude.getClaudeCodeClientVersion(), "2.1.259");
      assert.equal(claude.getClaudeCodeClientVersionSource(), "env");
      setCliVersionOverrides({ claude: "2.1.261" });
      assert.equal(claude.getClaudeCodeClientVersion(), "2.1.261");
      assert.equal(claude.getClaudeCodeClientVersionSource(), "settings");
    } finally {
      resetOverrides();
      claude.resetClaudeCodeClientVersionCache();
    }
  });
});

test("Claude refresh: a dashboard override short-circuits the registry lookup", async () => {
  await withEnv({ CLAUDE_CODE_CLIENT_VERSION: undefined }, async () => {
    claude.resetClaudeCodeClientVersionCache();
    setCliVersionOverrides({ claude: "2.1.261" });
    let calls = 0;
    const counting = (async () => {
      calls += 1;
      return new Response("{}", { status: 500 });
    }) as unknown as typeof fetch;
    try {
      assert.equal(await claude.refreshClaudeCodeClientVersion(counting), "2.1.261");
      assert.equal(calls, 0);
    } finally {
      resetOverrides();
      claude.resetClaudeCodeClientVersionCache();
    }
  });
});

test("Codex precedence: a discovered release newer than the pin reports `discovered`", async () => {
  const discovered = bumpTriple(codex.DEFAULT_CODEX_CLIENT_VERSION);
  await withEnv({ CODEX_CLIENT_VERSION: undefined }, () => {
    resetOverrides();
    codex.clearCodexClientVersionCache();
    codex.resetCodexClientVersionCacheForTests();
    try {
      codex.seedCodexClientVersionCache(discovered);
      assert.equal(codex.getCodexClientVersion(), discovered);
      assert.equal(codex.getCodexClientVersionSource(), "discovered");
      // The inference face still forwards the caller's own version first...
      assert.equal(codex.resolveCodexAdvertisedVersion(CALLER_HEADERS), "0.154.0");
      // ...and falls to the discovered version when the caller sends none.
      assert.equal(codex.resolveCodexAdvertisedVersion({}), discovered);
      setCliVersionOverrides({ codex: "0.156.0" });
      assert.equal(codex.getCodexClientVersion(), "0.156.0");
      assert.equal(codex.getCodexClientVersionSource(), "settings");
      assert.equal(codex.resolveCodexAdvertisedVersion(CALLER_HEADERS), "0.156.0");
    } finally {
      resetOverrides();
      codex.clearCodexClientVersionCache();
      codex.resetCodexClientVersionCacheForTests();
    }
  });
});

test("hydrateCliVersionOverrides applies settings and is a replace, not a merge", () => {
  resetOverrides();
  assert.equal(hydrateCliVersionOverrides({ cliVersionOverrides: { claude: "2.1.260" } }), true);
  assert.equal(getCliVersionOverride("claude"), "2.1.260");
  assert.equal(getCliVersionOverride("codex"), null);

  // Idempotent: hydrating the same settings twice changes nothing.
  assert.equal(hydrateCliVersionOverrides({ cliVersionOverrides: { claude: "2.1.260" } }), true);
  assert.deepEqual(getCliVersionOverrides(), { claude: "2.1.260" });

  // Clearing the settings row clears the live override.
  assert.equal(hydrateCliVersionOverrides({ cliVersionOverrides: {} }), false);
  assert.deepEqual(getCliVersionOverrides(), {});
});

test("hydrateCliVersionOverrides survives corrupt settings instead of throwing", () => {
  resetOverrides();
  setCliVersionOverrides({ claude: "2.1.260" });
  const corrupt = [
    null,
    undefined,
    "nope",
    42,
    [],
    { cliVersionOverrides: "corrupt" },
    { cliVersionOverrides: { claude: "bad value!", copilot: "1.0.82" } },
  ];
  for (const settings of corrupt) {
    assert.equal(hydrateCliVersionOverrides(settings), false, `should reject ${String(settings)}`);
  }
  assert.deepEqual(getCliVersionOverrides(), {});
});
