// Repro/regression test for issue #9474
// Claude Code OAuth device flow (`omniroute oauth start --provider claude-code`)
// failed with 401 because the CLI mapped `claude-code` to the unrelated
// `command-code` (CommandCode.ai) API-key provider instead of the real
// Anthropic `claude` browser-PKCE OAuth flow.
//
// This test asserts the FIXED behavior:
//  - `claude-code` is labeled `flow: "browser"` (not `"device"`)
//  - `runDeviceFlow` no longer remaps `claude-code` to `command-code`
//  - the CLI resolves the user-facing `claude-code` id to the backend
//    OAuth provider key `claude` and calls the existing browser-PKCE
//    actions (`authorize` / `exchange`), never `command-code`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const oauthCliPath = join(repoRoot, "bin/cli/commands/oauth.mjs");
const oauthCli = readFileSync(oauthCliPath, "utf8");

test("#9474: claude-code is advertised as a browser flow (not device)", () => {
  // The user-facing entry must be flow: "browser" — Anthropic Claude OAuth is
  // authorization_code_pkce (browser), not a device-code flow.
  assert.match(
    oauthCli,
    /\{\s*id:\s*"claude-code",\s*name:\s*"Claude Code \(OAuth\)",\s*flow:\s*"browser"\s*\}/,
    "claude-code must be labeled flow: \"browser\" (Anthropic uses a browser PKCE flow)"
  );
  // And it must NOT be labeled device.
  assert.doesNotMatch(
    oauthCli,
    /\{\s*id:\s*"claude-code",\s*name:\s*"Claude Code \(OAuth\)",\s*flow:\s*"device"\s*\}/,
    "claude-code must not be labeled flow: \"device\""
  );
});

test("#9474: runDeviceFlow no longer remaps claude-code -> command-code", () => {
  // The mismap line must be gone entirely.
  assert.doesNotMatch(
    oauthCli,
    /claude-code"\s*\?\s*"command-code"/,
    "the claude-code -> command-code remap in runDeviceFlow must be removed"
  );
  // And runDeviceFlow must not call the command-code provider route via apiFetch.
  // (Comments explaining the historical bug may mention the path; only an actual
  // apiFetch call to it is a regression.)
  assert.doesNotMatch(
    oauthCli,
    /apiFetch\(\s*`\/api\/providers\/command-code\/auth\/start/,
    "runDeviceFlow must not apiFetch /api/providers/command-code/auth/start"
  );
});

test("#9474: CLI resolves user-facing claude-code to backend key claude", () => {
  // The CLI must map the user-facing id `claude-code` to the backend OAuth
  // provider key `claude` (the key /api/oauth/[provider]/... expects).
  // Look for a resolution helper that produces "claude" for "claude-code".
  assert.match(
    oauthCli,
    /claude-code"\s*,?\s*.*?"claude"/,
    "claude-code must resolve to backend OAuth key claude"
  );
});

test("#9474: browser flow for claude-code targets /api/oauth/claude/authorize (not command-code, not a non-existent /start)", () => {
  // The fixed browser flow must call the existing server action `authorize`
  // on the resolved backend key `claude` — not the non-existent `/start`
  // action, and not the command-code provider route.
  // The runBrowserFlow helper must use the resolved backend key, not def.id,
  // so claude-code routes to /api/oauth/claude/... .
  assert.match(
    oauthCli,
    /\/api\/oauth\/\$\{[^}]*backendKey[^}]*\}\/authorize/,
    "runBrowserFlow must call /api/oauth/${backendKey}/authorize using the resolved backend key"
  );
  assert.match(
    oauthCli,
    /\/api\/oauth\/\$\{[^}]*backendKey[^}]*\}\/exchange/,
    "runBrowserFlow must call /api/oauth/${backendKey}/exchange using the resolved backend key"
  );
  // The old broken non-existent `/start` action must be gone from runBrowserFlow.
  // Comments explaining the historical bug may mention the path; only an actual
  // apiFetch call to it is a regression.
  assert.doesNotMatch(
    oauthCli,
    /apiFetch\(\s*`\/api\/oauth\/\$\{def\.id\}\/start/,
    "runBrowserFlow must not apiFetch the non-existent /api/oauth/${def.id}/start action"
  );
});

test("#9474: real Anthropic Claude OAuth is provider `claude` with browser PKCE flow (not device)", async () => {
  const mod = await import("../../src/lib/oauth/providers/claude.ts");
  const claude = mod.claude;
  assert.equal(claude.flowType, "authorization_code_pkce");
  assert.notEqual(claude.flowType, "device_code");
  assert.equal(claude.config.authorizeUrl, "https://claude.ai/oauth/authorize");
});

test("#9474: command-code provider is the unrelated CommandCode.ai apikey provider (unchanged, sanity)", async () => {
  const mod = await import("../../open-sse/config/providers/registry/command-code/index.ts");
  const commandCodeProvider = mod.command_codeProvider;
  assert.equal(commandCodeProvider.id, "command-code");
  assert.equal(commandCodeProvider.baseUrl, "https://api.commandcode.ai");
  // command-code must remain distinct from the Anthropic claude provider.
  assert.notEqual(commandCodeProvider.id, "claude");
});
