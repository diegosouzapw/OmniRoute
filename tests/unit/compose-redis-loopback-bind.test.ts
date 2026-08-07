import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

// The compose Redis runs without `requirepass`, and the app containers reach it
// over the compose network (redis:6379). The published port exists only for
// host-side tooling, so it must stay on loopback: Docker/Podman expand a bare
// "6379:6379" to 0.0.0.0, which puts an unauthenticated Redis on every LAN
// interface (observed as "Possible SECURITY ATTACK detected" in redis logs when
// anything on the network speaks HTTP at it).

function readCompose(file: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, file), "utf8");
}

test("docker-compose publishes Redis on loopback by default", () => {
  const compose = readCompose("docker-compose.yml");
  assert.match(
    compose,
    /- "\$\{REDIS_BIND_HOST:-127\.0\.0\.1\}:\$\{REDIS_PORT:-6379\}:6379"/,
    "redis publish spec must default to 127.0.0.1"
  );
  assert.doesNotMatch(
    compose,
    /- "\$\{REDIS_PORT:-6379\}:6379"/,
    "unqualified redis publish spec binds 0.0.0.0"
  );
});

test("no compose file publishes a port on 0.0.0.0 implicitly for Redis", () => {
  for (const file of ["docker-compose.yml", "docker-compose.prod.yml"]) {
    const compose = readCompose(file);
    assert.doesNotMatch(
      compose,
      /^\s*- "0\.0\.0\.0:\d+:6379"/m,
      `${file} must not hard-code an all-interfaces Redis publish spec`
    );
  }
});

test(".env.example documents REDIS_BIND_HOST and its default", () => {
  const env = fs.readFileSync(path.join(REPO_ROOT, ".env.example"), "utf8");
  assert.match(env, /# REDIS_BIND_HOST=127\.0\.0\.1/);
  assert.match(env, /# OMNIROUTE_REDIS_BIND_HOST=/);
});
