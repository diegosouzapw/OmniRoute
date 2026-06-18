/**
 * Tests for the provider-discovery A2A skill.
 *
 * Verifies:
 *   1. env-only — mocked `process.env` produces a single provider
 *      with the right vendor and source.
 *   2. config-only — a temp config.json with 2 providers produces 2 entries.
 *   3. filesystem-only — 2 temp JSON files produce 2 entries.
 *   4. mcp-unreachable — a throwing MCP client is tolerated and yields [].
 *   5. vendor filter — `metadata.vendor` filters the catalog.
 *   6. empty — nothing on disk or in env returns an empty catalog, no errors.
 *   7. error tolerance — one malformed JSON file is counted, not fatal.
 *   8. source filter — `metadata.sources = ['env']` skips fs entirely.
 *   9. stats shape — `bySource` / `byVendor` reflect the catalog.
 *  10. idempotent — two consecutive calls produce the same catalog.
 *  11. large-file skip — a 2 MB JSON file is skipped and counted as an error.
 *  12. symlink skip — a symlinked file is skipped (not followed).
 *  13. prefix grouping — `OPENAI_API_KEY` + `OPENAI_BASE_URL` → one `openai` provider.
 *  14. multi-source dedup — same vendor in env + config yields 2 entries (different sources).
 */

import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { promises as fs } from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

import { executeProviderDiscovery } from "@/lib/a2a/skills/providerDiscovery";
import type {
  DiscoveredProvider,
  ProviderDiscoveryOutput,
} from "@/lib/a2a/skills/providerDiscovery";
import type { A2ATask } from "@/lib/a2a/taskManager";

function makeTask(metadata: Record<string, unknown>): A2ATask {
  return {
    id: "test-task",
    skill: "provider-discovery",
    messages: [],
    metadata,
    state: "working",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function parseArtifact(result: Awaited<ReturnType<typeof executeProviderDiscovery>>): ProviderDiscoveryOutput {
  expect(result.artifacts).toHaveLength(1);
  expect(result.artifacts[0].type).toBe("text");
  return JSON.parse(result.artifacts[0].content);
}

async function mkTmpDir(prefix: string): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), `pd-${prefix}-`));
}

async function rmTmpDir(dir: string): Promise<void> {
  await fs.rm(dir, { recursive: true, force: true });
}

// Strip the non-deterministic fields so we can deep-equal the payload.
function normalizeProviders(providers: DiscoveredProvider[]): Array<Omit<DiscoveredProvider, "discoveredAt">> {
  return providers.map(({ discoveredAt: _da, ...rest }) => rest);
}

describe("providerDiscovery A2A skill", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkTmpDir("discovery");
  });

  afterEach(async () => {
    await rmTmpDir(tmpDir);
  });

  it("returns 1 provider from a mocked OPENAI_API_KEY env (env-only)", async () => {
    const result = await executeProviderDiscovery(
      makeTask({
        sources: ["env"],
        baseDir: tmpDir, // empty dir so config + filesystem find nothing
        envSnapshot: { OPENAI_API_KEY: "sk-test", UNRELATED: "x" },
      }),
    );

    const payload = parseArtifact(result);
    expect(payload.providers).toHaveLength(1);
    const [p] = payload.providers;
    expect(p.vendor).toBe("openai");
    expect(p.id).toBe("openai");
    expect(p.source).toBe("env");
    expect(p.hasApiKey).toBe(true);
    expect(p.hasBaseUrl).toBe(false);
    expect(payload.stats.total).toBe(1);
    expect(payload.stats.bySource.env).toBe(1);
  });

  it("reads 2 providers from a temp config.json (config-only)", async () => {
    const cfg = {
      providers: [
        { id: "openai", vendor: "openai", apiKey: "sk-x", baseUrl: "https://api.openai.com" },
        { id: "anthropic", vendor: "anthropic", apiKey: "sk-y" },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "config.json"), JSON.stringify(cfg), "utf8");

    const result = await executeProviderDiscovery(
      makeTask({ sources: ["config"], baseDir: tmpDir, envSnapshot: {} }),
    );
    const payload = parseArtifact(result);

    expect(payload.providers).toHaveLength(2);
    expect(payload.providers.every((p) => p.source === "config")).toBe(true);
    const ids = payload.providers.map((p) => p.id).sort();
    expect(ids).toEqual(["anthropic", "openai"]);
    expect(payload.stats.bySource.config).toBe(2);
  });

  it("scans 2 temp JSON files in providers/ (filesystem-only)", async () => {
    await fs.mkdir(path.join(tmpDir, "providers"), { recursive: true });
    await fs.mkdir(path.join(tmpDir, "credentials"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "providers", "openai.json"),
      JSON.stringify({ id: "openai", vendor: "openai", apiKey: "sk-o" }),
      "utf8",
    );
    await fs.writeFile(
      path.join(tmpDir, "credentials", "anthropic.json"),
      JSON.stringify({ id: "anthropic", apiKey: "sk-a" }),
      "utf8",
    );

    const result = await executeProviderDiscovery(
      makeTask({ sources: ["filesystem"], baseDir: tmpDir, envSnapshot: {} }),
    );
    const payload = parseArtifact(result);

    expect(payload.providers).toHaveLength(2);
    expect(payload.providers.every((p) => p.source === "filesystem")).toBe(true);
    expect(payload.stats.bySource.filesystem).toBe(2);
  });

  it("tolerates an unreachable MCP source (returns empty, does not fail)", async () => {
    // The MCP source uses a dynamic import of `../../mcp/client.js`. In the
    // test repo that module does not exist; the import resolves to undefined
    // and we expect a clean empty catalog with no errors counted.
    const result = await executeProviderDiscovery(
      makeTask({
        sources: ["mcp"],
        baseDir: tmpDir,
        envSnapshot: {},
      }),
    );

    const payload = parseArtifact(result);
    expect(payload.providers).toEqual([]);
    expect(payload.stats.total).toBe(0);
    // No module = no error counted (only thrown listProviders counts as error).
    expect(result.metadata?.errorsEncountered).toBe(0);
  });

  it("filters by vendor substring", async () => {
    const cfg = {
      providers: [
        { id: "openai", vendor: "openai" },
        { id: "anthropic", vendor: "anthropic" },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "config.json"), JSON.stringify(cfg), "utf8");

    const result = await executeProviderDiscovery(
      makeTask({
        sources: ["config", "env"],
        baseDir: tmpDir,
        vendor: "openai",
        envSnapshot: { OPENAI_API_KEY: "sk-test" },
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.providers.map((p) => p.id)).toEqual(["openai"]);
  });

  it("returns an empty catalog when nothing is on disk or in env", async () => {
    const result = await executeProviderDiscovery(
      makeTask({ baseDir: tmpDir, envSnapshot: {} }),
    );
    const payload = parseArtifact(result);

    expect(payload.providers).toEqual([]);
    expect(payload.stats.total).toBe(0);
    expect(result.metadata?.errorsEncountered).toBe(0);
    // sourcesScanned records env (always runs, even if it found nothing).
    expect(result.metadata?.sourcesScanned).toContain("env");
  });

  it("counts a malformed JSON file as an error but does not fail", async () => {
    await fs.mkdir(path.join(tmpDir, "providers"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, "providers", "good.json"),
      JSON.stringify({ id: "good", vendor: "good" }), "utf8");
    await fs.writeFile(path.join(tmpDir, "providers", "bad.json"),
      "{ this is not valid JSON", "utf8");

    const result = await executeProviderDiscovery(
      makeTask({ sources: ["filesystem"], baseDir: tmpDir, envSnapshot: {} }),
    );
    const payload = parseArtifact(result);

    expect(payload.providers).toHaveLength(1);
    expect(payload.providers[0].id).toBe("good");
    expect(result.metadata?.errorsEncountered).toBeGreaterThanOrEqual(1);
  });

  it("respects source filter (sources=['env'] never touches the fs)", async () => {
    // Make a loud config file. If we accidentally read it, the test fails.
    await fs.writeFile(
      path.join(tmpDir, "config.json"),
      JSON.stringify({ providers: [{ id: "loud", vendor: "loud" }] }),
      "utf8",
    );
    await fs.mkdir(path.join(tmpDir, "providers"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "providers", "loud.json"),
      JSON.stringify({ id: "loud-fs", vendor: "loud-fs" }),
      "utf8",
    );

    const result = await executeProviderDiscovery(
      makeTask({
        sources: ["env"],
        baseDir: tmpDir,
        envSnapshot: { ANTHROPIC_API_KEY: "sk-a" },
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.providers.map((p) => p.id)).toEqual(["anthropic"]);
    expect(payload.providers.every((p) => p.source === "env")).toBe(true);
    expect(result.metadata?.sourcesScanned).toEqual(["env"]);
    expect(result.metadata?.filesScanned).toBe(0);
  });

  it("computes stats.bySource and stats.byVendor correctly", async () => {
    const cfg = {
      providers: [
        { id: "openai", vendor: "openai" },
        { id: "openai-alt", vendor: "openai" }, // same vendor, different id
      ],
    };
    await fs.writeFile(path.join(tmpDir, "config.json"), JSON.stringify(cfg), "utf8");

    const result = await executeProviderDiscovery(
      makeTask({
        sources: ["config", "env"],
        baseDir: tmpDir,
        envSnapshot: { ANTHROPIC_TOKEN: "tok" },
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.stats.total).toBe(3);
    expect(payload.stats.bySource.config).toBe(2);
    expect(payload.stats.bySource.env).toBe(1);
    expect(payload.stats.byVendor.openai).toBe(2);
    expect(payload.stats.byVendor.anthropic).toBe(1);
  });

  it("is idempotent — two calls with the same input produce the same catalog", async () => {
    await fs.mkdir(path.join(tmpDir, "providers"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "providers", "openai.json"),
      JSON.stringify({ id: "openai", vendor: "openai", apiKey: "sk-o" }),
      "utf8",
    );

    const task = makeTask({
      sources: ["env", "filesystem"],
      baseDir: tmpDir,
      envSnapshot: { ANTHROPIC_API_KEY: "sk-a" },
    });
    const first = parseArtifact(await executeProviderDiscovery(task));
    const second = parseArtifact(await executeProviderDiscovery(task));

    expect(normalizeProviders(first.providers)).toEqual(
      normalizeProviders(second.providers),
    );
    expect(first.stats).toEqual(second.stats);
  });

  it("skips JSON files larger than 1 MB", async () => {
    await fs.mkdir(path.join(tmpDir, "providers"), { recursive: true });
    // 2 MB of repeated JSON in a recognizable provider shape.
    const huge =
      '{"id":"huge","vendor":"huge","filler":"' + "x".repeat(2 * 1024 * 1024 - 50) + '"}';
    await fs.writeFile(path.join(tmpDir, "providers", "huge.json"), huge, "utf8");
    await fs.writeFile(
      path.join(tmpDir, "providers", "small.json"),
      JSON.stringify({ id: "small", vendor: "small" }),
      "utf8",
    );

    const result = await executeProviderDiscovery(
      makeTask({ sources: ["filesystem"], baseDir: tmpDir, envSnapshot: {} }),
    );
    const payload = parseArtifact(result);

    expect(payload.providers.map((p) => p.id).sort()).toEqual(["small"]);
    expect(result.metadata?.errorsEncountered).toBeGreaterThanOrEqual(1);
  });

  it("does not follow symlinks in the providers/ directory", async () => {
    await fs.mkdir(path.join(tmpDir, "providers"), { recursive: true });
    // Real file outside the providers dir.
    await fs.writeFile(
      path.join(tmpDir, "real.json"),
      JSON.stringify({ id: "real", vendor: "real" }),
      "utf8",
    );
    // Symlink inside providers/ pointing at it.
    await fs.symlink(
      path.join(tmpDir, "real.json"),
      path.join(tmpDir, "providers", "linked.json"),
    );

    const result = await executeProviderDiscovery(
      makeTask({ sources: ["filesystem"], baseDir: tmpDir, envSnapshot: {} }),
    );
    const payload = parseArtifact(result);

    // The symlink target is skipped because isSymbolicLink() is true.
    expect(payload.providers).toEqual([]);
  });

  it("groups OPENAI_API_KEY and OPENAI_BASE_URL into a single 'openai' provider", async () => {
    const result = await executeProviderDiscovery(
      makeTask({
        sources: ["env"],
        baseDir: tmpDir,
        envSnapshot: {
          OPENAI_API_KEY: "sk-x",
          OPENAI_BASE_URL: "https://api.openai.com/v1",
          ANTHROPIC_TOKEN: "sk-a",
        },
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.providers).toHaveLength(2);
    const openai = payload.providers.find((p) => p.vendor === "openai");
    expect(openai).toBeDefined();
    expect(openai!.id).toBe("openai");
    expect(openai!.hasApiKey).toBe(true);
    expect(openai!.hasBaseUrl).toBe(true);
    expect((openai!.metadata.envKeys as string[]).sort()).toEqual([
      "OPENAI_API_KEY",
      "OPENAI_BASE_URL",
    ]);
  });

  it("reports same vendor from env AND config as two separate providers", async () => {
    const cfg = {
      providers: [
        { id: "openai", vendor: "openai", apiKey: "from-config" },
      ],
    };
    await fs.writeFile(path.join(tmpDir, "config.json"), JSON.stringify(cfg), "utf8");

    const result = await executeProviderDiscovery(
      makeTask({
        sources: ["env", "config"],
        baseDir: tmpDir,
        envSnapshot: { OPENAI_API_KEY: "from-env" },
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.providers).toHaveLength(2);
    const sources = payload.providers.map((p) => p.source).sort();
    expect(sources).toEqual(["config", "env"]);
    expect(payload.providers.every((p) => p.vendor === "openai")).toBe(true);
    expect(payload.stats.byVendor.openai).toBe(2);
    expect(payload.stats.bySource.env).toBe(1);
    expect(payload.stats.bySource.config).toBe(1);
  });
});
