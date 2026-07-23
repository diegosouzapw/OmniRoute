import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-ccr-mcp-"));

const ccr = await import("../../../open-sse/services/compression/engines/ccr/index.ts");
const tools = await import("../../../open-sse/mcp-server/tools/compressionTools.ts");
const schemas = await import("../../../open-sse/mcp-server/schemas/tools.ts");
const { MCP_TOOL_SCOPES } = await import("../../../src/shared/constants/mcpScopes.ts");

const readExtra = {
  authInfo: { clientId: "tenant-a", scopes: ["read:compression"] },
};
const writeExtra = {
  authInfo: { clientId: "tenant-a", scopes: ["write:compression"] },
};

describe("CCR in-memory store contract", () => {
  beforeEach(() => ccr.resetCcrStore());

  it("stores metadata, references, pagination, deletion, and caller-scoped stats", () => {
    const first = ccr.tryStoreBlock("first\nblock", "tenant-a", {
      contentType: "text/markdown",
      source: "mcp",
      ttlSeconds: 120,
      now: 1_000,
    });
    const second = ccr.tryStoreBlock("second block", "tenant-a", {
      source: "mcp",
      now: 2_000,
    });
    assert.equal(first.stored, true);
    assert.equal(second.stored, true);
    if (!first.stored || !second.stored) return;

    assert.deepEqual(ccr.buildCcrReference(first.hash, first.metadata.chars), {
      hash: first.hash,
      uri: `ccr://${first.hash}`,
      marker: `[CCR retrieve hash=${first.hash} chars=11]`,
    });
    assert.equal(first.metadata.contentType, "text/markdown");
    assert.equal(first.metadata.lines, 2);
    assert.equal("content" in first.metadata, false);

    const page = ccr.listCcrBlocks("tenant-a", { limit: 1, now: 2_000 });
    assert.equal(page.total, 2);
    assert.equal(page.entries[0].hash, second.hash);
    assert.equal(page.hasMore, true);
    assert.equal(ccr.getCcrStoreStats("tenant-a", 2_000).entries, 2);

    assert.equal(ccr.deleteCcrBlock(first.hash, "tenant-b", 2_000), false);
    assert.equal(ccr.deleteCcrBlock(first.hash, "tenant-a", 2_000), true);
    assert.equal(ccr.inspectCcrBlock(first.hash, "tenant-a", 2_000), null);
  });

  it("expires entries deterministically and counts expiration eviction", () => {
    const stored = ccr.tryStoreBlock("expires", "tenant-a", { ttlSeconds: 60, now: 1_000 });
    assert.equal(stored.stored, true);
    if (!stored.stored) return;
    assert.ok(ccr.inspectCcrBlock(stored.hash, "tenant-a", 60_999));
    assert.equal(ccr.inspectCcrBlock(stored.hash, "tenant-a", 61_000), null);
    assert.equal(ccr.getCcrStoreStats("tenant-a", 61_000).lifecycle.expiredEvictions, 1);
  });

  it("expires only the requested entry on hot-path reads", () => {
    const expired = ccr.tryStoreBlock("expired", "tenant-a", { ttlSeconds: 60, now: 1_000 });
    const active = ccr.tryStoreBlock("active", "tenant-b", { ttlSeconds: 120, now: 1_000 });
    assert.equal(expired.stored, true);
    assert.equal(active.stored, true);
    if (!expired.stored || !active.stored) return;

    assert.equal(ccr.retrieveBlock(active.hash, "tenant-b", 61_000), "active");
    assert.equal(ccr.getCcrStoreStats("tenant-a", 60_999).lifecycle.expiredEvictions, 0);
    assert.equal(ccr.inspectCcrBlock(expired.hash, "tenant-a", 61_000), null);
    assert.equal(ccr.getCcrStoreStats("tenant-a", 61_000).lifecycle.expiredEvictions, 1);
  });

  it("rejects blocks above the UTF-8 byte limit", () => {
    const result = ccr.tryStoreBlock("ü".repeat(ccr.MAX_CCR_BLOCK_BYTES), "tenant-a");
    assert.deepEqual(result.stored, false);
    if (!result.stored) assert.equal(result.reason, "block_too_large");
    assert.equal(ccr.getCcrStoreStats("tenant-a").lifecycle.rejectedStores, 1);
  });

  it("evicts least-recently-used owner entries to enforce the principal byte budget", () => {
    const hashes: string[] = [];
    for (let i = 0; i < 9; i++) {
      const prefix = `${i}:`;
      const content = prefix + "x".repeat(ccr.MAX_CCR_BLOCK_BYTES - prefix.length);
      const result = ccr.tryStoreBlock(content, "tenant-a", { now: i + 1 });
      assert.equal(result.stored, true);
      if (result.stored) hashes.push(result.hash);
    }
    const stats = ccr.getCcrStoreStats("tenant-a", 10);
    assert.ok(stats.bytes <= ccr.MAX_CCR_PRINCIPAL_BYTES);
    assert.equal(stats.entries, 8);
    assert.equal(ccr.inspectCcrBlock(hashes[0], "tenant-a", 10), null);
    assert.ok(stats.lifecycle.capacityEvictions >= 1);
  });

  it("releases principal byte budget when an entry is deleted", () => {
    const content = "x".repeat(ccr.MAX_CCR_BLOCK_BYTES);
    const stored = ccr.tryStoreBlock(content, "tenant-a", { now: 1 });
    assert.equal(stored.stored, true);
    if (!stored.stored) return;
    assert.equal(ccr.getCcrStoreStats("tenant-a", 1).bytes, ccr.MAX_CCR_BLOCK_BYTES);
    assert.equal(ccr.deleteCcrBlock(stored.hash, "tenant-a", 1), true);
    assert.equal(ccr.getCcrStoreStats("tenant-a", 1).bytes, 0);
  });

  it("keeps all read, list, inspect, delete, and stats operations principal-isolated", () => {
    const result = ccr.tryStoreBlock("tenant-a secret", "tenant-a", { source: "mcp" });
    assert.equal(result.stored, true);
    if (!result.stored) return;
    assert.equal(ccr.retrieveBlock(result.hash, "tenant-b"), null);
    assert.equal(ccr.inspectCcrBlock(result.hash, "tenant-b"), null);
    assert.equal(ccr.listCcrBlocks("tenant-b").total, 0);
    assert.equal(ccr.deleteCcrBlock(result.hash, "tenant-b"), false);
    assert.equal(ccr.getCcrStoreStats("tenant-b").entries, 0);
    assert.deepEqual(ccr.getCcrStoreStats("tenant-b").lifecycle, {
      expiredEvictions: 0,
      capacityEvictions: 0,
      rejectedStores: 0,
    });
    assert.equal(ccr.retrieveBlock(result.hash, "tenant-a"), "tenant-a secret");
  });
});

describe("CCR MCP contracts and handlers", () => {
  beforeEach(() => ccr.resetCcrStore());

  it("registers all six tools canonically with least-privilege scopes", () => {
    const expected = {
      omniroute_ccr_store: ["write:compression"],
      omniroute_ccr_retrieve: ["read:compression"],
      omniroute_ccr_inspect: ["read:compression"],
      omniroute_ccr_list: ["read:compression"],
      omniroute_ccr_delete: ["write:compression"],
      omniroute_ccr_stats: ["read:compression"],
    } as const;
    for (const [name, scopes] of Object.entries(expected)) {
      assert.ok(schemas.MCP_TOOL_MAP[name], `${name} must exist in MCP_TOOL_MAP`);
      assert.deepEqual(schemas.MCP_TOOL_MAP[name].scopes, scopes);
      assert.deepEqual(MCP_TOOL_SCOPES[name], scopes);
    }
  });

  it("validates the MCP store limit in UTF-8 bytes instead of JavaScript characters", () => {
    const multibyte = "ü".repeat(ccr.MAX_CCR_BLOCK_BYTES / 2 + 1);
    assert.equal(schemas.ccrStoreInput.safeParse({ content: multibyte }).success, false);
    const result = ccr.tryStoreBlock(multibyte, "tenant-a", { source: "mcp" });
    assert.equal(result.stored, false);
    if (!result.stored) assert.equal(result.reason, "block_too_large");
  });

  it("stores through MCP and exposes metadata without content in inspect/list", async () => {
    const stored = await tools.handleCcrStoreTool(
      { content: "sensitive body", contentType: "text/plain", ttlSeconds: 120 },
      writeExtra
    );
    assert.equal(stored.stored, true);
    if (!stored.stored) return;

    const inspected = await tools.handleCcrInspectTool({ hash: stored.reference.hash }, readExtra);
    assert.equal(inspected.found, true);
    assert.equal(JSON.stringify(inspected).includes("sensitive body"), false);
    const listed = await tools.handleCcrListTool({ limit: 10 }, readExtra);
    assert.equal(listed.total, 1);
    assert.equal(JSON.stringify(listed).includes("sensitive body"), false);
    assert.equal((await tools.handleCcrStatsTool({}, readExtra)).entries, 1);
    assert.deepEqual(await tools.handleCcrDeleteTool({ hash: stored.reference.hash }, writeExtra), {
      deleted: true,
    });
  });

  it("does not include content in the CCR store audit input", () => {
    const secret = "never-persist-this-content";
    const auditInput = tools.buildCcrStoreAuditInput({
      content: secret,
      contentType: "text/plain",
    });
    assert.equal(JSON.stringify(auditInput).includes(secret), false);
    assert.deepEqual(auditInput, {
      bytes: Buffer.byteLength(secret, "utf8"),
      contentType: "text/plain",
      ttlSeconds: undefined,
    });
  });

  it("refuses oversized full MCP responses and recommends ranged modes", async () => {
    const content = "large\n".repeat(50_000);
    const stored = ccr.tryStoreBlock(content, "tenant-a", { source: "mcp" });
    assert.equal(stored.stored, true);
    if (!stored.stored) return;
    const full = await tools.handleCcrRetrieveTool({ hash: stored.hash }, readExtra);
    assert.equal(full.found, true);
    assert.equal("content" in full, false);
    assert.equal("tooLargeForFull" in full && full.tooLargeForFull, true);

    const head = await tools.handleCcrRetrieveTool(
      { hash: stored.hash, mode: "head", n: 2 },
      readExtra
    );
    assert.equal(head.found, true);
    assert.equal("content" in head ? head.content : undefined, "large\nlarge");
  });

  it("does not reveal another principal's block through MCP handlers", async () => {
    const stored = ccr.tryStoreBlock("only tenant a", "tenant-a", { source: "mcp" });
    assert.equal(stored.stored, true);
    if (!stored.stored) return;
    const other = { authInfo: { clientId: "tenant-b", scopes: ["read:compression"] } };
    assert.equal((await tools.handleCcrRetrieveTool({ hash: stored.hash }, other)).found, false);
    assert.equal((await tools.handleCcrInspectTool({ hash: stored.hash }, other)).found, false);
    assert.equal((await tools.handleCcrListTool({}, other)).total, 0);
  });
});
