import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientPath = path.resolve(
  __dirname,
  "../../src/app/(dashboard)/dashboard/tools/agent-bridge/AgentBridgePageClient.tsx"
);
const source = readFileSync(clientPath, "utf8");

test("#7157: dns toggle fetch call uses method POST (route.ts only exports POST)", () => {
  const dnsCallMatch = source.match(
    /\/api\/tools\/agent-bridge\/agents\/\$\{agentId\}\/dns`,\s*\{\s*method:\s*"([A-Z]+)"/
  );
  assert.ok(dnsCallMatch, "expected to find the dns fetch call in AgentBridgePageClient.tsx");
  assert.equal(
    dnsCallMatch?.[1],
    "POST",
    "dns fetch call must use method: 'POST' to match the route.ts export (issue #7157)"
  );
});
