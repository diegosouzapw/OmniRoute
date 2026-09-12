import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

// The optional `cliproxyapi` sidecar (profile `cliproxyapi`) proxies provider
// credentials (its data volume is `cliproxyapi-data:/root/.cli-proxy-api`) and
// carried no auth-related environment variable in its `environment:` block.
// Docker/Podman expand an unqualified "8317:8317" publish spec to 0.0.0.0,
// which puts this credential-bearing sidecar on every LAN interface the same
// way a bare "6379:6379" would for Redis (see
// tests/unit/compose-redis-loopback-bind.test.ts, the precedent this repo
// already applied). Issue #12578.

function readCompose(file: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, file), "utf8");
}

test("docker-compose publishes cliproxyapi on loopback by default", () => {
  const compose = readCompose("docker-compose.yml");
  assert.match(
    compose,
    /- "\$\{CLIPROXY_BIND_HOST:-127\.0\.0\.1\}:\$\{CLIPROXYAPI_PORT:-8317\}:\$\{CLIPROXYAPI_PORT:-8317\}"/,
    "cliproxyapi publish spec must default to 127.0.0.1 (matching the Redis precedent)"
  );
  assert.doesNotMatch(
    compose,
    /- "\$\{CLIPROXYAPI_PORT:-8317\}:\$\{CLIPROXYAPI_PORT:-8317\}"/,
    "unqualified cliproxyapi publish spec binds 0.0.0.0"
  );
});

test("cliproxyapi service forwards a management/auth key into its environment", () => {
  const compose = readCompose("docker-compose.yml");
  const serviceMatch = compose.match(/ {2}cliproxyapi:\n(?:.*\n)*?(?=\n {2}\S|$)/);
  assert.ok(serviceMatch, "cliproxyapi service block must exist in docker-compose.yml");
  assert.match(
    serviceMatch![0],
    /CLIPROXYAPI_MANAGEMENT_KEY/,
    "cliproxyapi environment block must forward CLIPROXYAPI_MANAGEMENT_KEY (already documented in docs/reference/ENVIRONMENT.md) instead of leaving auth entirely to the upstream image's undocumented default"
  );
});

test("qdrant and bifrost sidecars also publish on loopback by default", () => {
  const compose = readCompose("docker-compose.yml");
  assert.match(compose, /- "\$\{QDRANT_BIND_HOST:-127\.0\.0\.1\}:\$\{QDRANT_PORT:-6333\}:6333"/);
  assert.match(
    compose,
    /- "\$\{QDRANT_BIND_HOST:-127\.0\.0\.1\}:\$\{QDRANT_GRPC_PORT:-6334\}:6334"/
  );
  assert.match(compose, /- "\$\{BIFROST_BIND_HOST:-127\.0\.0\.1\}:\$\{BIFROST_PORT:-8080\}:8080"/);
});

test(".env.example documents CLIPROXY_BIND_HOST and its default", () => {
  const env = fs.readFileSync(path.join(REPO_ROOT, ".env.example"), "utf8");
  assert.match(env, /# CLIPROXY_BIND_HOST=127\.0\.0\.1/);
});
