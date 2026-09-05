import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import * as yaml from "js-yaml";
import { Command } from "commander";
import {
  ensureV1,
  mergeOmpModelsYaml,
  mergeOmpSettingsYaml,
  registerSetupOmp,
  resolveOmpRoleAssignments,
  resolveOmpTarget,
  runSetupOmpCommand,
  redactForDisplay,
} from "../../../bin/cli/commands/setup-omp.mjs";
import {
  catalogModelToOmpEntry,
  generateOmpConfig,
} from "../../../src/lib/cli-helper/config-generator/omp.ts";

/**
 * Parsed-YAML node for assertions. Indexing yields the same type, so chains
 * like `doc.providers.omniroute.baseUrl` resolve without `any`; the terminal
 * value is compared through `assert.equal`, which accepts `unknown`.
 */
interface AnyDoc {
  [key: string]: AnyDoc;
}

/** yaml.load returns `unknown` under the workspace-strict editor config. */
function loadYaml(text: string): AnyDoc {
  return yaml.load(text) as AnyDoc;
}

function withTempHome(fn: (tmp: string) => Promise<void>) {
  return async () => {
    const prevHome = process.env.HOME;
    const prevCtx = process.env.OMNIROUTE_CONTEXT;
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "setup-omp-"));
    process.env.HOME = tmp;
    delete process.env.OMNIROUTE_CONTEXT;
    try {
      await fn(tmp);
    } finally {
      if (prevHome === undefined) delete process.env.HOME;
      else process.env.HOME = prevHome;
      if (prevCtx === undefined) delete process.env.OMNIROUTE_CONTEXT;
      else process.env.OMNIROUTE_CONTEXT = prevCtx;
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  };
}

// ── target resolution ────────────────────────────────────────────────────────

test("resolveOmpTarget: --remote wins and trailing slashes are trimmed", () => {
  const { baseUrl } = resolveOmpTarget({ remote: "http://vps:20128/" });
  assert.equal(baseUrl, "http://vps:20128");
});

test("resolveOmpTarget: explicit --api-key wins", () => {
  const { apiKey } = resolveOmpTarget({ remote: "http://x:20128", apiKey: "sk-explicit" });
  assert.equal(apiKey, "sk-explicit");
});

test("resolveOmpTarget falls back to http://127.0.0.1:<port> when no context is configured", () => {
  const prevDataDir = process.env.DATA_DIR;
  const prevPort = process.env.PORT;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "setup-omp-nodata-"));
  process.env.DATA_DIR = tmp; // empty → no configured contexts
  delete process.env.PORT;
  try {
    assert.equal(resolveOmpTarget({}).baseUrl, "http://127.0.0.1:20128");
    assert.equal(resolveOmpTarget({ port: 20129 }).baseUrl, "http://127.0.0.1:20129");
  } finally {
    if (prevDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prevDataDir;
    if (prevPort !== undefined) process.env.PORT = prevPort;
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("setup-omp exposes both --backup and --no-backup flags", () => {
  const program = new Command();
  registerSetupOmp(program);
  const cmd = program.commands.find((c) => c.name() === "setup-omp");
  assert.ok(cmd, "setup-omp registered");
  const longs = cmd.options.map((o) => o.long);
  assert.ok(longs.includes("--backup"));
  assert.ok(longs.includes("--no-backup"));
});
test("ensureV1 appends /v1 and normalizes trailing slashes", () => {
  assert.equal(ensureV1("http://127.0.0.1:20128"), "http://127.0.0.1:20128/v1");
  assert.equal(ensureV1("http://127.0.0.1:20128/v1/"), "http://127.0.0.1:20128/v1");
});

// ── generator (pure, no HTTP when no model subset is requested) ─────────────

test("generateOmpConfig emits the discovery-based provider block", async () => {
  const doc = await generateOmpConfig({ baseUrl: "http://127.0.0.1:20128/" });
  const parsed = loadYaml(doc);
  const prov = parsed.providers.omniroute;
  assert.equal(prov.baseUrl, "http://127.0.0.1:20128/v1");
  assert.equal(prov.api, "openai-completions");
  assert.equal(prov.apiKey, "OMNIROUTE_API_KEY");
  assert.equal(prov.authHeader, true);
  assert.equal(prov.discovery.type, "openai-models-list");
  assert.equal("models" in prov, false, "discovery-based: no models array without a subset");
});

test("generateOmpConfig never emits the literal API key", async () => {
  const doc = await generateOmpConfig({
    baseUrl: "http://127.0.0.1:20128",
    apiKey: "sk-literal-secret",
  });
  assert.equal(doc.includes("sk-literal-secret"), false);
  assert.ok(doc.includes("OMNIROUTE_API_KEY"));
});

// ── models.yml merge ─────────────────────────────────────────────────────────

test("mergeOmpModelsYaml preserves unrelated providers", async () => {
  const generated = await generateOmpConfig({ baseUrl: "http://vps:20128" });
  const existing = yaml.dump({
    providers: { ollama: { baseUrl: "http://localhost:11434/v1", api: "ollama" } },
  });
  const merged = loadYaml(mergeOmpModelsYaml(yaml, existing, generated));
  assert.ok(merged.providers.ollama, "unrelated provider kept");
  assert.equal(merged.providers.omniroute.baseUrl, "http://vps:20128/v1");
});

test("mergeOmpModelsYaml refuses corrupt YAML with a readable error", async () => {
  const generated = await generateOmpConfig({ baseUrl: "http://vps:20128" });
  assert.throws(
    () => mergeOmpModelsYaml(yaml, "providers:\n  omniroute: [unclosed", generated),
    /Cannot parse existing models\.yml/
  );
});

test("mergeOmpModelsYaml refuses a sequence at providers instead of inventing numeric keys", async () => {
  const generated = await generateOmpConfig({ baseUrl: "http://vps:20128" });
  assert.throws(
    () => mergeOmpModelsYaml(yaml, "providers:\n  - ollama\n  - openai\n", generated),
    /expected a YAML mapping at 'providers'/
  );
});

test("catalogModelToOmpEntry maps maxTokens from max_output_tokens ONLY", () => {
  const full = catalogModelToOmpEntry("glm/glm-5.2", {
    context_length: 131072,
    max_output_tokens: 32768,
    max_input_tokens: 999999,
  });
  assert.equal(full.contextWindow, 131072);
  assert.equal(full.maxTokens, 32768, "output cap, never the input budget");

  const inputOnly = catalogModelToOmpEntry("x", { max_input_tokens: 999999 });
  assert.equal("maxTokens" in inputOnly, false);
  assert.equal("contextWindow" in inputOnly, false);

  const altCtx = catalogModelToOmpEntry("y", { max_context_window_tokens: 200000 });
  assert.equal(altCtx.contextWindow, 200000);

  assert.deepEqual(catalogModelToOmpEntry("z"), { id: "z", input: ["text"] });
});

// ── config.yml (settings) role merge ─────────────────────────────────────────

test("mergeOmpSettingsYaml preserves other keys and unselected roles", () => {
  const existing = yaml.dump({
    theme: "dark",
    modelRoles: { default: "anthropic/claude", plan: "openai/gpt-5" },
  });
  const out = loadYaml(mergeOmpSettingsYaml(yaml, existing, { smol: "omniroute/glm/glm-5-turbo" }));
  assert.equal(out.theme, "dark");
  assert.equal(out.modelRoles.default, "anthropic/claude", "unselected role untouched");
  assert.equal(out.modelRoles.plan, "openai/gpt-5");
  assert.equal(out.modelRoles.smol, "omniroute/glm/glm-5-turbo");
});

test("mergeOmpSettingsYaml emits @-prefixed alias values quoted", () => {
  const dumped = mergeOmpSettingsYaml(yaml, null, { plan: "@fast" });
  assert.match(dumped, /["']@fast["']/);
  assert.equal(loadYaml(dumped).modelRoles.plan, "@fast", "round-trips to the bare alias");
});

test("mergeOmpSettingsYaml refuses a sequence at modelRoles instead of inventing numeric keys", () => {
  assert.throws(
    () =>
      mergeOmpSettingsYaml(yaml, "theme: dark\nmodelRoles:\n  - default\n", {
        smol: "omniroute/x",
      }),
    /expected a YAML mapping at 'modelRoles'/
  );
});

// ── role selection parsing ───────────────────────────────────────────────────

test("resolveOmpRoleAssignments builds omniroute/<id> values and keeps :thinking suffix", () => {
  const { assignments } = resolveOmpRoleAssignments({
    model: "glm/glm-5.2",
    role: ["slow=glm/glm-5.2:high", "plan=@fast", "vision=omniroute/qwen/qwen3-vl"],
  });
  assert.equal(assignments.default, "omniroute/glm/glm-5.2");
  assert.equal(assignments.slow, "omniroute/glm/glm-5.2:high");
  assert.equal(assignments.plan, "@fast", "@alias references are accepted unprefixed");
  assert.equal(assignments.vision, "omniroute/qwen/qwen3-vl", "no double prefix");
});

test("resolveOmpRoleAssignments rejects an unknown role", () => {
  const { error } = resolveOmpRoleAssignments({ role: ["bogus=x"] });
  assert.match(error, /Unknown OMP role 'bogus'/);
});

test("resolveOmpRoleAssignments --roles-all requires --model", () => {
  const { error } = resolveOmpRoleAssignments({ rolesAll: true });
  assert.match(error, /requires --model/);
  const { assignments } = resolveOmpRoleAssignments({ rolesAll: true, model: "glm/glm-5.2" });
  assert.equal(Object.keys(assignments).length, 10);
  assert.ok(Object.values(assignments).every((v) => v === "omniroute/glm/glm-5.2"));
});

// ── end-to-end writer paths (temp HOME, real fs, no HTTP) ───────────────────

test(
  "runSetupOmpCommand creates models.yml when absent; config.yml untouched without roles",
  withTempHome(async (tmp) => {
    const code = await runSetupOmpCommand({ remote: "http://127.0.0.1:20128" });
    assert.equal(code, 0);
    const modelsPath = path.join(tmp, ".omp", "agent", "models.yml");
    const settingsPath = path.join(tmp, ".omp", "agent", "config.yml");
    assert.ok(fs.existsSync(modelsPath));
    const parsed = loadYaml(fs.readFileSync(modelsPath, "utf8"));
    assert.equal(parsed.providers.omniroute.baseUrl, "http://127.0.0.1:20128/v1");
    assert.equal(fs.existsSync(settingsPath), false, "roles merged only when given");
  })
);

test(
  "runSetupOmpCommand merges only the given roles and preserves other settings keys",
  withTempHome(async (tmp) => {
    const settingsPath = path.join(tmp, ".omp", "agent", "config.yml");
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(
      settingsPath,
      yaml.dump({ theme: "dark", modelRoles: { plan: "openai/gpt-5" } })
    );
    const code = await runSetupOmpCommand({
      remote: "http://127.0.0.1:20128",
      role: ["smol=glm/glm-5-turbo"],
    });
    assert.equal(code, 0);
    const out = loadYaml(fs.readFileSync(settingsPath, "utf8"));
    assert.equal(out.theme, "dark");
    assert.equal(out.modelRoles.plan, "openai/gpt-5", "unselected role preserved");
    assert.equal(out.modelRoles.smol, "omniroute/glm/glm-5-turbo");
    assert.equal("default" in out.modelRoles, false);
  })
);

test(
  "runSetupOmpCommand refuses corrupt existing models.yml with non-zero exit",
  withTempHome(async (tmp) => {
    const modelsPath = path.join(tmp, ".omp", "agent", "models.yml");
    fs.mkdirSync(path.dirname(modelsPath), { recursive: true });
    fs.writeFileSync(modelsPath, "providers:\n  omniroute: [unclosed");
    const code = await runSetupOmpCommand({ remote: "http://127.0.0.1:20128" });
    assert.notEqual(code, 0);
    assert.equal(
      fs.readFileSync(modelsPath, "utf8"),
      "providers:\n  omniroute: [unclosed",
      "corrupt file left untouched"
    );
  })
);

test(
  "runSetupOmpCommand --dry-run never prints pre-existing literal secrets",
  withTempHome(async (tmp) => {
    const modelsPath = path.join(tmp, ".omp", "agent", "models.yml");
    fs.mkdirSync(path.dirname(modelsPath), { recursive: true });
    fs.writeFileSync(
      modelsPath,
      yaml.dump({
        providers: {
          other: {
            baseUrl: "http://localhost:9999/v1",
            api: "openai-completions",
            apiKey: "sk-realusersecret123456789",
          },
        },
      })
    );
    const lines = [];
    const origLog = console.log;
    console.log = (...args) => lines.push(args.join(" "));
    let code: number;
    try {
      code = await runSetupOmpCommand({
        remote: "http://127.0.0.1:20128",
        dryRun: true,
      });
    } finally {
      console.log = origLog;
    }
    assert.equal(code, 0);
    const out = lines.join("\n");
    assert.ok(!out.includes("sk-realusersecret123456789"), "literal key redacted");
    assert.ok(!/sk-[A-Za-z0-9_-]{8,}/.test(out), "no key-shaped strings printed");
    assert.ok(out.includes("apiKey: OMNIROUTE_API_KEY"), "env-var NAME preserved");
    assert.ok(out.includes("apiKey: '[redacted]'"), "existing key shown as redacted");
    // The on-disk content is byte-identical — redaction is display-only.
    assert.ok(fs.readFileSync(modelsPath, "utf8").includes("sk-realusersecret123456789"));
  })
);

test(
  "runSetupOmpCommand backs up an existing models.yml by default",
  withTempHome(async (tmp) => {
    const modelsPath = path.join(tmp, ".omp", "agent", "models.yml");
    fs.mkdirSync(path.dirname(modelsPath), { recursive: true });
    fs.writeFileSync(modelsPath, yaml.dump({ providers: { other: { baseUrl: "http://x/v1" } } }));
    const code = await runSetupOmpCommand({ remote: "http://127.0.0.1:20128" });
    assert.equal(code, 0);
    const baks = fs
      .readdirSync(path.dirname(modelsPath))
      .filter((f) => f.startsWith("models.yml.bak-"));
    assert.equal(baks.length, 1, "default backup written before overwrite");
    assert.ok(
      fs.readFileSync(path.join(path.dirname(modelsPath), baks[0]), "utf8").includes("other")
    );
    const code2 = await runSetupOmpCommand({ remote: "http://127.0.0.1:20128", backup: false });
    assert.equal(code2, 0);
    const baks2 = fs
      .readdirSync(path.dirname(modelsPath))
      .filter((f) => f.startsWith("models.yml.bak-"));
    assert.equal(baks2.length, 1, "--no-backup writes no additional backup");
  })
);

test(
  "runSetupOmpCommand exits 2 on an unknown role and writes nothing",
  withTempHome(async (tmp) => {
    const code = await runSetupOmpCommand({
      remote: "http://127.0.0.1:20128",
      role: ["bogus=x"],
    });
    assert.equal(code, 2);
    assert.equal(fs.existsSync(path.join(tmp, ".omp")), false);
  })
);

test("redactForDisplay keeps env-var NAMES and $-references, redacts literal secrets", () => {
  const text = yaml.dump({
    providers: {
      omniroute: { apiKey: "OMNIROUTE_API_KEY" },
      other: { apiKey: "sk-realusersecret123456789", token: "${HOME}/.secret", password: "$FOO" },
    },
  });
  const out = redactForDisplay(yaml, text);
  assert.ok(out.includes("OMNIROUTE_API_KEY"), "env-var NAME preserved");
  assert.ok(out.includes("${HOME}/.secret"), "${HOME} $-reference preserved");
  assert.ok(out.includes("$FOO"), "$FOO $-reference preserved");
  assert.equal(out.includes("sk-realusersecret123456789"), false);

  const backstop = redactForDisplay(
    yaml,
    yaml.dump({ note: "contact sk-leakedsecretABCDEFGH outside any secret key" })
  );
  assert.equal(backstop.includes("sk-leakedsecretABCDEFGH"), false);
  assert.ok(backstop.includes("[redacted-key]"), "key-shaped sweep covers non-secret keys");
});

test(
  "runSetupOmpCommand --yes removes a migrated legacy models.json",
  withTempHome(async (tmp) => {
    const agentDir = path.join(tmp, ".omp", "agent");
    fs.mkdirSync(agentDir, { recursive: true });
    const legacyPath = path.join(agentDir, "models.json");
    fs.writeFileSync(
      legacyPath,
      JSON.stringify({ providers: { ollama: { baseUrl: "http://localhost:11434/v1" } } })
    );
    const code = await runSetupOmpCommand({ remote: "http://127.0.0.1:20128", yes: true });
    assert.equal(code, 0);
    assert.equal(fs.existsSync(legacyPath), false, "legacy file removed with --yes");
    const parsed = loadYaml(fs.readFileSync(path.join(agentDir, "models.yml"), "utf8"));
    assert.ok(parsed.providers.ollama, "legacy provider survived into models.yml");
    assert.ok(parsed.providers.omniroute);
  })
);

test("generateOmpConfig with options.model copies catalog fields, never invents maxTokens", async () => {
  const orig = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: [
          {
            id: "glm/glm-5.2",
            context_length: 131072,
            max_output_tokens: 32768,
            max_input_tokens: 999999,
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  try {
    const doc = await generateOmpConfig({
      baseUrl: "http://127.0.0.1:20128",
      apiKey: "sk-test",
      model: "glm/glm-5.2",
    });
    const prov = loadYaml(doc).providers.omniroute;
    assert.equal(prov.discovery.type, "openai-models-list");
    assert.equal(prov.models.length, 1);
    assert.equal(prov.models[0].id, "glm/glm-5.2");
    assert.equal(prov.models[0].contextWindow, 131072);
    assert.equal(prov.models[0].maxTokens, 32768);
    assert.equal("max_input_tokens" in prov.models[0], false);
  } finally {
    globalThis.fetch = orig;
  }
});

test("generateOmpConfig with options.model omits limits when the catalog has none", async () => {
  const orig = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ data: [{ id: "glm/glm-5.2" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const doc = await generateOmpConfig({
      baseUrl: "http://127.0.0.1:20128",
      model: "glm/glm-5.2",
    });
    const entry = loadYaml(doc).providers.omniroute.models[0];
    assert.equal(entry.id, "glm/glm-5.2");
    assert.equal("contextWindow" in entry, false, "absent catalog context not invented");
    assert.equal("maxTokens" in entry, false, "absent catalog max_output_tokens not invented");
  } finally {
    globalThis.fetch = orig;
  }
});

test(
  "runSetupOmpCommand writes the env-var NAME, never the literal key",
  withTempHome(async (tmp) => {
    const code = await runSetupOmpCommand({
      remote: "http://127.0.0.1:20128",
      apiKey: "sk-should-not-land-on-disk",
    });
    assert.equal(code, 0);
    const text = fs.readFileSync(path.join(tmp, ".omp", "agent", "models.yml"), "utf8");
    assert.equal(text.includes("sk-should-not-land-on-disk"), false);
    assert.ok(text.includes("OMNIROUTE_API_KEY"));
  })
);

test(
  "runSetupOmpCommand migrates legacy models.json without clobbering it",
  withTempHome(async (tmp) => {
    const agentDir = path.join(tmp, ".omp", "agent");
    fs.mkdirSync(agentDir, { recursive: true });
    const legacyPath = path.join(agentDir, "models.json");
    fs.writeFileSync(
      legacyPath,
      JSON.stringify({ providers: { ollama: { baseUrl: "http://localhost:11434/v1" } } })
    );
    const code = await runSetupOmpCommand({ remote: "http://127.0.0.1:20128" });
    assert.equal(code, 0);
    const parsed = loadYaml(fs.readFileSync(path.join(agentDir, "models.yml"), "utf8"));
    assert.ok(parsed.providers.ollama, "legacy provider migrated");
    assert.ok(parsed.providers.omniroute, "new provider merged");
    assert.ok(fs.existsSync(legacyPath), "legacy file kept without --yes");
  })
);

test(
  "runSetupOmpCommand --dry-run touches nothing",
  withTempHome(async (tmp) => {
    const code = await runSetupOmpCommand({
      remote: "http://127.0.0.1:20128",
      dryRun: true,
      role: ["smol=glm/glm-5-turbo"],
    });
    assert.equal(code, 0);
    assert.equal(fs.existsSync(path.join(tmp, ".omp")), false);
  })
);
