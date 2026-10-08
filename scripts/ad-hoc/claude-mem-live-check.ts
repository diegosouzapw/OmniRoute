/**
 * Live smoke check for ClaudeMemBackend against a running claude-mem worker.
 * Uses synthetic data only and deletes what it creates.
 *
 *   CLAUDE_MEM_PORT=37799 node --import tsx/esm scripts/ad-hoc/claude-mem-live-check.ts
 */
import { ClaudeMemBackend } from "../../src/lib/memory/claudeMemBackend.ts";
import { MemoryType } from "../../src/lib/memory/types.ts";

const port = Number(process.env.CLAUDE_MEM_PORT ?? "37799");
const backend = new ClaudeMemBackend({ port, project: "omniroute-live-check", timeoutMs: 10_000 });
const marker = `zebra-${Date.now()}`;
let failures = 0;

function check(label: string, ok: boolean, detail: unknown = "") {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`, detail === "" ? "" : JSON.stringify(detail));
}

const health = await backend.health();
check("health", health.ok, health);

const created = await backend.create({
  apiKeyId: "live-key",
  sessionId: "live-session",
  type: MemoryType.SEMANTIC,
  key: `fact-${marker}`,
  content: `Synthetic test fact: the ${marker} prefers loopback-only adapters.`,
  metadata: { category: "live-check" },
});
check("create returns claude-mem id", /^claude-mem:\d+$/.test(created.id), created.id);

const fetched = await backend.get(created.id);
check(
  "get round-trips OmniRoute fields",
  fetched?.key === `fact-${marker}` &&
    fetched?.type === MemoryType.SEMANTIC &&
    fetched?.apiKeyId === "live-key" &&
    fetched?.sessionId === "live-session" &&
    fetched?.metadata.category === "live-check",
  {
    key: fetched?.key,
    type: fetched?.type,
    apiKeyId: fetched?.apiKeyId,
    sessionId: fetched?.sessionId,
    category: fetched?.metadata.category,
  }
);

const listed = await backend.list({ apiKeyId: "live-key", limit: 20 });
check(
  "list includes the new memory",
  listed.data.some((m) => m.id === created.id),
  {
    count: listed.data.length,
    total: listed.total,
  }
);

const found = await backend.search({ query: marker, apiKeyId: "live-key", limit: 5 });
check(
  "search finds it by keyword (FTS5)",
  found.some((m) => m.id === created.id),
  {
    hits: found.map((m) => m.id),
  }
);

check(
  "update is rejected (immutable)",
  (await backend.update(created.id, { content: "x" })) === false
);
check("foreign id ignored", (await backend.get("not-a-claude-mem-id")) === null);

const deleted = await backend.delete(created.id);
check("delete", deleted === true);
check("get after delete → null", (await backend.get(created.id)) === null);

console.log(failures === 0 ? "\nALL LIVE CHECKS PASSED" : `\n${failures} LIVE CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
