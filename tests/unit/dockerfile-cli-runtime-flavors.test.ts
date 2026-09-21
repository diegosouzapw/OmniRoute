import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const dockerfile = fs.readFileSync(path.join(process.cwd(), "Dockerfile"), "utf8");

function stage(name: string, nextStage?: string): string {
  const marker = new RegExp(`^FROM .+ AS ${name}$`, "m").exec(dockerfile);
  if (!marker) assert.fail(`Dockerfile must declare ${name}`);
  const start = marker.index;
  const nextMarker = nextStage
    ? new RegExp(`^FROM .+ AS ${nextStage}$`, "m").exec(dockerfile.slice(start + 1))
    : null;
  const end = nextMarker?.index !== undefined ? start + 1 + nextMarker.index : dockerfile.length;
  assert.ok(end > start, `Dockerfile must declare ${nextStage} after ${name}`);
  return dockerfile.slice(start, end);
}

test("Docker-client-free CLI target retains every supported AI CLI", () => {
  const core = stage("runner-cli-core", "runner-cli-no-docker");
  const clientless = stage("runner-cli-no-docker", "runner-cli");

  assert.match(clientless, /FROM runner-cli-core AS runner-cli-no-docker/);
  assert.doesNotMatch(core, /docker\.io|docker-compose/);
  assert.doesNotMatch(clientless, /docker\.io|docker-compose/);
  for (const cli of ["@openai/codex@", "@anthropic-ai/claude-code@", "droid@", "openclaw@"]) {
    assert.match(core, new RegExp(cli.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(
    core,
    /--allow-scripts=[^\s]*@anthropic-ai\/claude-code[^\s]*openclaw/,
    "native CLI lifecycle scripts must be explicitly allowed so installed tools are runnable"
  );
});

test("generic runner-cli remains backward compatible with Docker and Compose clients", () => {
  const generic = stage("runner-cli");

  assert.match(generic, /FROM runner-cli-core AS runner-cli/);
  assert.match(generic, /apt-get install -y --no-install-recommends docker\.io docker-compose/);
  assert.match(generic, /USER node/);
});
