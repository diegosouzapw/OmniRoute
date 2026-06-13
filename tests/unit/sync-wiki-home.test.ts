import { test } from "node:test";
import assert from "node:assert";
import { syncHomeCounts, readCounts } from "../../scripts/docs/sync-wiki-home.mjs";

const sync = syncHomeCounts as (
  home: string,
  counts: { providers?: number | null; strategies?: number | null; mcpTools?: number | null }
) => string;
const counts = readCounts as () => {
  providers: number | null;
  strategies: number | null;
  mcpTools: number | null;
  locales: number | null;
};

const STALE_HOME = [
  "Connect every AI tool to 212 providers — 50+ free — through one endpoint.",
  "| **226 AI Providers** | ... |", // intentionally already-correct AI Providers cell
  "| **14 Routing Strategies** | ... |",
  "| **MCP Server** | 37 tools with stdio/SSE/Streamable HTTP transports |",
  "- **[Providers](Provider-Reference)** — All 212 supported providers",
].join("\n");

test("rewrites stale provider / strategy / MCP-tool counts", () => {
  const out = sync(STALE_HOME, { providers: 226, strategies: 15, mcpTools: 87 });
  assert.match(out, /to 226 providers/);
  assert.match(out, /All 226 supported providers/);
  assert.match(out, /\*\*15 Routing Strategies\*\*/);
  assert.match(out, /\| 87 tools/);
  assert.doesNotMatch(out, /212 providers/);
  assert.doesNotMatch(out, /14 Routing/);
  assert.doesNotMatch(out, /37 tools/);
});

test("is a no-op when counts already match", () => {
  const home = "Connect every AI tool to 226 providers";
  assert.equal(sync(home, { providers: 226 }), home);
});

test("leaves the doc untouched when a count is null (undetermined)", () => {
  const home = "| **MCP Server** | 87 tools with ... |";
  assert.equal(sync(home, { mcpTools: null }), home);
});

test("readCounts resolves real, positive provider/strategy/locale counts", () => {
  const c = counts();
  assert.ok((c.providers ?? 0) > 100, "providers should resolve from PROVIDER_REFERENCE.md");
  assert.ok((c.strategies ?? 0) >= 10, "strategies should resolve from routingStrategies.ts");
  assert.ok((c.locales ?? 0) >= 40, "locales should resolve from config/i18n.json");
});
