import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

function read(relativePath: string): string {
  return readFileSync(join(repoRoot, relativePath), "utf8");
}

test("#14638 documents the portable Windows Docker CLI profile", () => {
  const compose = read("docker-compose.yml");

  assert.match(compose, /Windows Docker Desktop[\s\S]*docker compose --profile cli up -d --build/);
  assert.match(compose, /base[\s\S]*no CLI tools/);
  assert.match(compose, /host[\s\S]*Linux-first/);

  const cliStart = compose.indexOf("  omniroute-cli:");
  const hostStart = compose.indexOf("  omniroute-host:");
  assert.ok(cliStart >= 0, "cli service must exist");
  assert.ok(hostStart > cliStart, "host service must follow cli service");
  const cliService = compose.slice(cliStart, hostStart);
  const baseStart = compose.indexOf("  omniroute-base:");
  const webStart = compose.indexOf("  omniroute-web:");
  assert.ok(baseStart >= 0, "base service must exist");
  assert.ok(webStart > baseStart, "web service must follow base service");
  const baseService = compose.slice(baseStart, webStart);

  assert.match(cliService, /target: runner-cli/);
  assert.match(baseService, /target: runner-base/);
});
