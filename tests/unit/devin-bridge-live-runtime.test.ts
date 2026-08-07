import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { CORE_SCHEMA, load, mergeTag } from "js-yaml";

import { isAllowedGuardHostname } from "../../docker/devin-bridge/network-guard/policy.mjs";
import {
  validateAuditFileStat,
  validateClaudeGuardDenials,
  validateDevinAuthStatus,
  validateDevinGuardAudit,
  validateZeroClaudeEgress,
} from "../../scripts/devin-bridge/runtime-policy.mjs";
import { selectLiveModel } from "../../scripts/devin-bridge/select-live-model.mjs";
import { validateClaudeEvidenceText } from "../../scripts/devin-bridge/validate-claude-evidence.mjs";

const root = process.cwd();
const composePath = path.join(root, "docker", "devin-bridge", "compose.yml");
const commonPath = path.join(root, "scripts", "devin-bridge", "common");
const mockE2ePath = path.join(root, "scripts", "devin-bridge", "test-e2e-mock");
const launchPath = path.join(root, "scripts", "devin-bridge", "launch");
const loginPath = path.join(root, "scripts", "devin-bridge", "login-devin");
const liveE2ePath = path.join(root, "scripts", "devin-bridge", "test-live-devin");
const liveRunnerPath = path.join(root, "docker", "devin-bridge", "run-claude-live-e2e.sh");
const bridgeCommandPath = path.join(
  root,
  "tests",
  "fixtures",
  "devin-bridge",
  "e2e-workspace",
  ".claude",
  "commands",
  "bridge-check.md"
);
const verifierPath = path.join(root, "scripts", "devin-bridge", "verify-anthropic-isolation");

interface ComposeService {
  depends_on?: Record<string, { condition?: string }>;
  environment?: Record<string, string>;
  healthcheck?: { test?: unknown };
  volumes?: Array<string | { source?: string }>;
}

interface ComposeConfig {
  services: Record<string, ComposeService>;
}

function composeConfig(): ComposeConfig {
  return load(fs.readFileSync(composePath, "utf8"), {
    filename: composePath,
    schema: CORE_SCHEMA.withTags(mergeTag),
  }) as ComposeConfig;
}

function volumeSources(service: ComposeService): string[] {
  return (service.volumes || []).map((mount: string | { source?: string }) =>
    typeof mount === "string" ? mount.split(":", 1)[0] : String(mount.source || "")
  );
}

test("network policy permits only the intended Devin destinations", () => {
  for (const hostname of [
    "api.devin.ai",
    "devin.ai",
    "nested.api.cognition.ai",
    "cognition.ai",
    "server.codeium.com",
    "unleash.codeium.com",
  ]) {
    assert.equal(isAllowedGuardHostname(hostname, "devin"), true, hostname);
  }
  for (const hostname of [
    "evildevin.ai",
    "codeium.com",
    "api.codeium.com",
    "server.codeium.com.evil.example",
    "o123.ingest.sentry.io",
    "api.anthropic.com",
    "claude.ai",
  ]) {
    assert.equal(isAllowedGuardHostname(hostname, "devin"), false, hostname);
  }
  assert.equal(isAllowedGuardHostname("api.devin.ai", "deny-all"), false);
});

test("compose isolates guard audit mounts and waits for healthy guards", () => {
  const services = composeConfig().services;
  for (const [name, service] of Object.entries(services)) {
    const sources = volumeSources(service);
    const hasGuardAudit = sources.some((source) => source.includes(".sandbox/guard-audit"));
    assert.equal(hasGuardAudit, name === "network-guard" || name === "claude-egress-guard", name);
  }
  assert.match(volumeSources(services["network-guard"]).join(" "), /\.sandbox\/guard-audit\/devin/);
  assert.match(
    volumeSources(services["claude-egress-guard"]).join(" "),
    /\.sandbox\/guard-audit\/claude/
  );
  for (const guard of ["network-guard", "claude-egress-guard"]) {
    assert.ok(services[guard].healthcheck?.test, `${guard} healthcheck`);
  }
  assert.equal(
    services["omniroute-live"].depends_on?.["network-guard"].condition,
    "service_healthy"
  );
  assert.equal(services.claude.depends_on?.["claude-egress-guard"].condition, "service_healthy");
  assert.equal(
    services["claude-live"].depends_on?.["claude-egress-guard"].condition,
    "service_healthy"
  );
});

test("compose keeps role-separated credentials and proxy settings", () => {
  const services = composeConfig().services;
  for (const [name, service] of Object.entries(services)) {
    const sources = volumeSources(service);
    assert.equal(
      sources.includes("claude-isolated-config"),
      name === "claude" || name === "claude-live",
      `${name} Claude config ownership`
    );
    assert.equal(sources.includes("devin-auth"), name === "omniroute-live", `${name} Devin auth`);
  }
  assert.equal(
    services["omniroute-live"].environment?.DEVIN_BRIDGE_PROXY_URL,
    "http://network-guard:8080"
  );
  for (const name of ["claude", "claude-live"]) {
    assert.equal(services[name].environment?.HTTP_PROXY, "http://claude-egress-guard:8080");
    assert.equal(services[name].environment?.NO_PROXY, "omniroute");
  }
});

test("auth status requires the exact positive line and rejects misleading text", () => {
  assert.equal(validateDevinAuthStatus(0, "Logged in (via Devin)\n").ok, true);
  assert.equal(validateDevinAuthStatus(0, "Logged in (via Devin).\n").ok, true);
  for (const output of [
    "Not Logged in (via Devin)\n",
    "prefix Logged in (via Devin) suffix\n",
    "Logged out\n",
    "Logged in (via Devin)\nFailed to fetch from server\n",
  ]) {
    assert.equal(validateDevinAuthStatus(0, output).ok, false, output);
  }
  assert.equal(validateDevinAuthStatus(1, "Logged in (via Devin)\n").ok, false);
});

test("model discovery accepts only explicit uid/id fields and detects catalog ambiguity", () => {
  const selected = selectLiveModel({
    models: [
      { family_uid: "swe-1.7" },
      { familyUid: "swe-1.7-lightning" },
      { model_uid: "swe-1.6-fast" },
      { modelUid: "swe-1.6" },
    ],
  });
  assert.equal(selected, "swe-1-7-lightning");
  assert.throws(() => selectLiveModel({ metadata: { id: "swe-1.7" } }), /no model identifier/i);
  assert.throws(
    () => selectLiveModel({ models: [{ model_uid: "a.b" }] }, {}, [{ id: "a.b" }, { id: "a-b" }]),
    /Ambiguous OmniRoute catalog normalization/
  );
});

test("Claude evidence requires a standalone marker and a successful client-owned npm test", () => {
  const toolId = "tool-npm-test";
  const events = [
    {
      type: "assistant",
      message: {
        content: [{ type: "tool_use", id: toolId, name: "Bash", input: { command: "npm test" } }],
      },
    },
    {
      type: "user",
      message: {
        content: [
          { type: "tool_result", tool_use_id: toolId, is_error: false, content: "1 passed" },
        ],
      },
    },
    { type: "result", subtype: "success", result: "Fixed and tested.\nLIVE_FIX_COMPLETE" },
  ];
  const text = events.map((event) => JSON.stringify(event)).join("\n");

  assert.doesNotThrow(() =>
    validateClaudeEvidenceText(text, {
      marker: "LIVE_FIX_COMPLETE",
      requiredTools: ["Bash"],
      requireSuccessfulNpmTest: true,
    })
  );
  assert.doesNotThrow(() =>
    validateClaudeEvidenceText(
      `${events
        .slice(0, 2)
        .map((event) => JSON.stringify(event))
        .join("\n")}\n${JSON.stringify({
        type: "result",
        subtype: "success",
        result: "Task completed; the requested marker is LIVE_FIX_COMPLETE.",
      })}`,
      {
        marker: "LIVE_FIX_COMPLETE",
        requiredTools: ["Bash"],
        requireSuccessfulNpmTest: true,
      }
    )
  );
  assert.throws(
    () =>
      validateClaudeEvidenceText(
        `${events
          .slice(0, 2)
          .map((event) => JSON.stringify(event))
          .join("\n")}\n${JSON.stringify({
          type: "result",
          subtype: "success",
          result: "Task completion condition: end with LIVE_FIX_COMPLETE after tests.",
        })}`,
        { marker: "LIVE_FIX_COMPLETE" }
      ),
    /standalone marker/
  );
  assert.throws(
    () =>
      validateClaudeEvidenceText(
        [events[0], events[2]].map((event) => JSON.stringify(event)).join("\n"),
        {
          marker: "LIVE_FIX_COMPLETE",
          requiredTools: ["Bash"],
          requireSuccessfulNpmTest: true,
        }
      ),
    /successful npm test/
  );
  assert.throws(
    () =>
      validateClaudeEvidenceText(
        `${events
          .slice(0, 2)
          .map((event) => JSON.stringify(event))
          .join("\n")}\n${JSON.stringify({
          type: "result",
          subtype: "success",
          result:
            "Task ran npm test.\n\nNext steps needed:\n- finish the work\n\n**Blocker**: work is incomplete. BRIDGE_E2E_COMPLETE",
        })}`,
        {
          marker: "BRIDGE_E2E_COMPLETE",
          requiredTools: ["Bash"],
          requireSuccessfulNpmTest: true,
        }
      ),
    /explicitly reports incomplete work/
  );

  const commandEvidence = [
    {
      type: "system",
      subtype: "init",
      slash_commands: ["bridge-check"],
      skills: ["bridge-proof"],
    },
    ...events.slice(0, 2),
    { type: "result", subtype: "success", result: "The task is complete." },
  ]
    .map((event) => JSON.stringify(event))
    .join("\n");
  assert.doesNotThrow(() =>
    validateClaudeEvidenceText(commandEvidence, {
      marker: "BRIDGE_E2E_COMPLETE",
      requiredTools: ["Bash"],
      requireSuccessfulNpmTest: true,
      requiredSlashCommand: "bridge-check",
      requiredSkill: "bridge-proof",
      acceptExplicitCompletion: true,
    })
  );
  assert.throws(
    () =>
      validateClaudeEvidenceText(commandEvidence, {
        marker: "BRIDGE_E2E_COMPLETE",
        requiredTools: ["Bash"],
        requireSuccessfulNpmTest: true,
        requiredSlashCommand: "missing-command",
        requiredSkill: "bridge-proof",
        acceptExplicitCompletion: true,
      }),
    /required slash command/
  );
});

test("live command declares the terminal marker required by its evidence validator", () => {
  const command = fs.readFileSync(bridgeCommandPath, "utf8");
  const runner = fs.readFileSync(liveRunnerPath, "utf8");
  assert.match(command, /BRIDGE_E2E_COMPLETE/);
  assert.match(command, /only after `npm test` passes/);
  assert.match(command, /do not introduce a regression/);
  assert.match(runner, /validate_scenario[^\n]*BRIDGE_E2E_COMPLETE Bash true/);
});

test("audit policies reject forged metadata, missing proof, and unexpected Devin hosts", () => {
  const safeStat = {
    isFile: () => true,
    isSymbolicLink: () => false,
    nlink: 1,
    uid: 501,
    mode: 0o100666,
  };
  assert.equal(validateAuditFileStat(safeStat as unknown as fs.Stats, 501), null);
  assert.match(
    validateAuditFileStat({ ...safeStat, nlink: 2 } as unknown as fs.Stats, 501) || "",
    /link count/
  );
  assert.match(
    validateAuditFileStat(
      { ...safeStat, isSymbolicLink: () => true } as unknown as fs.Stats,
      501
    ) || "",
    /regular file/
  );
  assert.equal(validateZeroClaudeEgress("").ok, true);
  assert.equal(validateZeroClaudeEgress("{}\n").ok, false);
  assert.equal(
    validateClaudeGuardDenials(
      '{"hostname":"api.anthropic.com","decision":"deny"}\n' +
        '{"hostname":"claude.ai","decision":"deny"}\n'
    ).ok,
    true
  );
  assert.equal(validateDevinGuardAudit("").ok, false);
  assert.equal(
    validateDevinGuardAudit('{"hostname":"api.devin.ai","decision":"allow"}\n').ok,
    true
  );
  assert.equal(
    validateDevinGuardAudit(
      '{"hostname":"o1.ingest.sentry.io","decision":"deny"}\n' +
        '{"hostname":"api.devin.ai","decision":"allow"}\n'
    ).ok,
    true
  );
  assert.equal(
    validateDevinGuardAudit('{"hostname":"api.devin.ai","decision":"deny"}\n').ok,
    false
  );
  assert.equal(
    validateDevinGuardAudit(
      '{"hostname":"api.anthropic.com","decision":"deny"}\n' +
        '{"hostname":"api.devin.ai","decision":"allow"}\n'
    ).ok,
    false
  );
});

test("scripts use atomic audit resets, readiness waits, cleanup traps, and strict gates", () => {
  const common = fs.readFileSync(commonPath, "utf8");
  const login = fs.readFileSync(loginPath, "utf8");
  const launch = fs.readFileSync(launchPath, "utf8");
  const live = fs.readFileSync(liveE2ePath, "utf8");
  const liveRunner = fs.readFileSync(liveRunnerPath, "utf8");
  const mock = fs.readFileSync(mockE2ePath, "utf8");
  const verifier = fs.readFileSync(verifierPath, "utf8");
  assert.match(common, /chmod 01777/);
  assert.match(common, /mktemp/);
  assert.match(common, /chmod 0666/);
  assert.match(common, /mv -f/);
  for (const script of [login, launch, live, verifier]) {
    assert.match(script, /trap bridge_cleanup_compose EXIT/);
  }
  for (const script of [login, launch, live, verifier]) assert.match(script, /up -d --wait/);
  assert.match(login, /auth login --force-manual-token-flow/);
  assert.match(live, /bridge_assert_devin_guard_audit/);
  assert.match(live, /bridge_assert_zero_claude_egress/);
  assert.match(liveRunner, /validate-claude-evidence\.mjs/);
  assert.match(liveRunner, /Use Edit now to replace/);
  assert.match(liveRunner, /Do not summarize before npm test succeeds/);
  assert.match(liveRunner, /DEVIN_BRIDGE_LIVE_SCENARIO_COOLDOWN_SECONDS:-15/);
  assert.equal([...liveRunner.matchAll(/sleep "\$scenario_cooldown_seconds"/g)].length, 2);
  assert.match(mock, /bridge_assert_zero_claude_egress/);
  assert.ok([...verifier.matchAll(/bridge_reset_claude_egress_audit/g)].length >= 2);
});

test("Docker build context excludes sandbox runtime state", () => {
  const dockerignore = fs.readFileSync(path.join(root, ".dockerignore"), "utf8");
  assert.match(dockerignore, /^\.sandbox$/m);
});
