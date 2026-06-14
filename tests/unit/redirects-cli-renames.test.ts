import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const repoRoot = join(import.meta.dirname, "../..");
const configSource = await readFile(join(repoRoot, "next.config.mjs"), "utf8");

test("next.config.mjs has permanent redirect from /dashboard/cli-tools to /dashboard/cli-code", () => {
  assert.ok(
    configSource.includes('source: "/dashboard/cli-tools"') &&
      configSource.includes('destination: "/dashboard/cli-code"'),
    "expected /dashboard/cli-tools → /dashboard/cli-code redirect in next.config.mjs"
  );
});

test("next.config.mjs has permanent wildcard redirect from /dashboard/cli-tools/:path* to /dashboard/cli-code/:path*", () => {
  assert.ok(
    configSource.includes('source: "/dashboard/cli-tools/:path*"') &&
      configSource.includes('destination: "/dashboard/cli-code/:path*"'),
    "expected /dashboard/cli-tools/:path* → /dashboard/cli-code/:path* redirect in next.config.mjs"
  );
});

test("next.config.mjs has permanent redirect from /dashboard/agents to /dashboard/acp-agents", () => {
  assert.ok(
    configSource.includes('source: "/dashboard/agents"') &&
      configSource.includes('destination: "/dashboard/acp-agents"'),
    "expected /dashboard/agents → /dashboard/acp-agents redirect in next.config.mjs"
  );
});

test("next.config.mjs has permanent wildcard redirect from /dashboard/agents/:path* to /dashboard/acp-agents/:path*", () => {
  assert.ok(
    configSource.includes('source: "/dashboard/agents/:path*"') &&
      configSource.includes('destination: "/dashboard/acp-agents/:path*"'),
    "expected /dashboard/agents/:path* → /dashboard/acp-agents/:path* redirect in next.config.mjs"
  );
});

test("all 4 CLI redirect entries use permanent: true", () => {
  // Extract the CLI Pages block
  const cliBlock = configSource.slice(configSource.indexOf("// CLI Pages — Plano 14 (F9)"));
  assert.ok(cliBlock.length > 0, "expected CLI Pages block to be present");
  const permanentCount = (cliBlock.match(/permanent: true/g) || []).length;
  assert.ok(
    permanentCount >= 4,
    `expected at least 4 'permanent: true' entries in CLI Pages block, found ${permanentCount}`
  );
});
