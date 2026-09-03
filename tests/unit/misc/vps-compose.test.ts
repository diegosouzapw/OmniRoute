import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { load } from "js-yaml";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../..");
const COMPOSE_PATH = path.join(REPO_ROOT, "contrib/vps/compose.yaml");
const ENV_EXAMPLE_PATH = path.join(REPO_ROOT, "contrib/vps/.env.example");

type ComposeService = {
  image?: string;
  ports?: string[];
  environment?: Record<string, string>;
  volumes?: string[];
};

type ComposeDocument = {
  services?: Record<string, ComposeService>;
};

function readCompose(): { raw: string; parsed: ComposeDocument } {
  const raw = fs.readFileSync(COMPOSE_PATH, "utf8");
  return { raw, parsed: load(raw) as ComposeDocument };
}

test("VPS compose publishes only the OmniRoute dashboard on loopback by default", () => {
  const { parsed } = readCompose();
  const services = parsed.services ?? {};

  assert.deepEqual(services.redis?.ports, undefined, "Redis must not publish a host port");
  assert.deepEqual(services.omniroute?.ports, [
    "${OMNIROUTE_BIND_HOST:-127.0.0.1}:${OMNIROUTE_PORT:-20128}:20128",
  ]);
});

test("VPS compose requires an explicitly pinned image and production secrets", () => {
  const { raw, parsed } = readCompose();
  const omniroute = parsed.services?.omniroute;

  assert.equal(
    omniroute?.image,
    "${OMNIROUTE_IMAGE:?Set OMNIROUTE_IMAGE to a versioned tag or digest}"
  );
  assert.equal(omniroute?.environment?.REQUIRE_API_KEY, "${REQUIRE_API_KEY:-true}");
  assert.match(raw, /JWT_SECRET: \$\{JWT_SECRET:\?Set JWT_SECRET in \.env\}/);
  assert.match(raw, /API_KEY_SECRET: \$\{API_KEY_SECRET:\?Set API_KEY_SECRET in \.env\}/);
  assert.match(raw, /INITIAL_PASSWORD: \$\{INITIAL_PASSWORD:\?Set INITIAL_PASSWORD in \.env\}/);
  assert.match(
    raw,
    /OMNIROUTE_WS_BRIDGE_SECRET: \$\{OMNIROUTE_WS_BRIDGE_SECRET:\?Set OMNIROUTE_WS_BRIDGE_SECRET in \.env\}/
  );
});

test("VPS environment example uses a versioned image rather than a floating channel", () => {
  const env = fs.readFileSync(ENV_EXAMPLE_PATH, "utf8");

  assert.match(env, /^OMNIROUTE_IMAGE=[^\s:]+:\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/m);
  assert.doesNotMatch(env, /^OMNIROUTE_IMAGE=.*:(?:latest|next)$/m);
  assert.match(env, /^REQUIRE_API_KEY=true$/m);
});
