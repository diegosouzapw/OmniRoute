import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

// docker-compose.yml (base/web/cli/host profiles) and docker-compose.prod.yml
// default API_HOST/LIVE_WS_HOST/HOSTNAME to 0.0.0.0 and publish the dashboard/
// API/live-WS ports with a bare, unscoped spec — Docker expands that to every
// interface. Combined with .env.example shipping REQUIRE_API_KEY=false by
// default, this puts the anonymous /v1 LLM proxy on the LAN/WAN. Mirrors the
// existing Redis precedent (tests/unit/compose-redis-loopback-bind.test.ts).
// Issue #12568.

function readCompose(file: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, file), "utf8");
}

test("docker-compose.yml publishes the dashboard/API/live-WS ports on loopback by default", () => {
  const compose = readCompose("docker-compose.yml");
  const barePublishSpecs = [
    /- "\$\{DASHBOARD_PORT:-20128\}:\$\{DASHBOARD_PORT:-20128\}"/,
    /- "\$\{API_PORT:-20129\}:\$\{API_PORT:-20129\}"/,
    /- "\$\{LIVE_WS_PORT:-20132\}:\$\{LIVE_WS_PORT:-20132\}"/,
  ];
  for (const re of barePublishSpecs) {
    assert.doesNotMatch(compose, re, `unqualified publish spec ${re} binds 0.0.0.0`);
  }
  assert.match(
    compose,
    /- "\$\{APP_BIND_HOST:-127\.0\.0\.1\}:\$\{DASHBOARD_PORT:-20128\}:\$\{DASHBOARD_PORT:-20128\}"/
  );
  assert.doesNotMatch(compose, /API_HOST=\$\{API_HOST:-0\.0\.0\.0\}/);
  assert.doesNotMatch(compose, /LIVE_WS_HOST=\$\{LIVE_WS_HOST:-0\.0\.0\.0\}/);
});

test("docker-compose.prod.yml publishes the app's ports on loopback by default", () => {
  const compose = readCompose("docker-compose.prod.yml");
  assert.doesNotMatch(compose, /API_HOST=\$\{API_HOST:-0\.0\.0\.0\}/);
  assert.doesNotMatch(compose, /LIVE_WS_HOST=\$\{LIVE_WS_HOST:-0\.0\.0\.0\}/);
  assert.doesNotMatch(compose, /HOSTNAME=0\.0\.0\.0/);
  assert.match(compose, /\$\{APP_BIND_HOST:-127\.0\.0\.1\}:\$\{PROD_DASHBOARD_PORT/);
});

test(".env.example does not ship REQUIRE_API_KEY=false without a boot-time non-loopback guard", () => {
  const env = fs.readFileSync(path.join(REPO_ROOT, ".env.example"), "utf8");
  const requireApiKeyFalse = /^REQUIRE_API_KEY=false\s*$/m.test(env);
  if (requireApiKeyFalse) {
    const guardHits = ["src/server", "src/lib", "open-sse"].some((dir) => {
      try {
        const files = fs.readdirSync(path.join(REPO_ROOT, dir), { recursive: true }) as string[];
        return files.some((f) => {
          if (!f.endsWith(".ts")) return false;
          const full = path.join(REPO_ROOT, dir, f);
          if (!fs.statSync(full).isFile()) return false;
          const content = fs.readFileSync(full, "utf8");
          return content.includes("non-loopback") && content.includes("REQUIRE_API_KEY");
        });
      } catch {
        return false;
      }
    });
    assert.ok(guardHits, "REQUIRE_API_KEY=false ships with no boot-time non-loopback guard");
  }
});

test(".env.example documents APP_BIND_HOST and its default", () => {
  const env = fs.readFileSync(path.join(REPO_ROOT, ".env.example"), "utf8");
  assert.match(env, /# APP_BIND_HOST=127\.0\.0\.1/);
});
