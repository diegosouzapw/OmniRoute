import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

// #13679 item #9: docker-compose.yml has no top-level `networks:` key, so
// Compose puts every service (redis, qdrant, bifrost, cliproxyapi,
// codex-app-server, chatgpt-web-codex-browser, ...) on the same implicit
// default bridge network. The chatgpt-web-codex-browser sidecar exposes an
// UNAUTHENTICATED CDP proxy on 9223 (docker/chatgpt-web-codex-browser/cdp-proxy.mjs)
// — any compromised sibling container on that shared bridge can reach it and
// take full control of the live browser session. It must be isolated onto a
// dedicated network shared only with the one legitimate consumer
// (omniroute-web).

function readCompose(): string {
  return fs.readFileSync(path.join(REPO_ROOT, "docker-compose.yml"), "utf8");
}

function serviceBlock(compose: string, serviceName: string): string {
  const lines = compose.split("\n");
  const startIndex = lines.findIndex((line) => new RegExp(`^  ${serviceName}:\\s*$`).test(line));
  assert.notEqual(startIndex, -1, `service '${serviceName}' not found in docker-compose.yml`);
  const rest = lines.slice(startIndex + 1);
  const endOffset = rest.findIndex((line) => /^  \S/.test(line) || /^\S/.test(line));
  const block = endOffset === -1 ? rest : rest.slice(0, endOffset);
  return block.join("\n");
}

/**
 * The service's `networks:` entries, read line by line. A regex over the whole
 * block would need nested quantifiers (`(\s*-\s*.*\n)*`), which CodeQL flags as
 * a ReDoS risk (js/redos) — and the line walk is easier to read anyway.
 */
function listedNetworks(serviceYaml: string): string[] {
  const lines = serviceYaml.split("\n");
  const start = lines.findIndex((line) => /^\s*networks:\s*$/.test(line));
  if (start === -1) return [];
  const names: string[] = [];
  for (const line of lines.slice(start + 1)) {
    const item = line.match(/^\s*-\s*(\S+)\s*$/);
    if (!item) break;
    names.push(item[1]);
  }
  return names;
}

test("docker-compose.yml declares a dedicated network for the CDP proxy sidecar", () => {
  const compose = readCompose();
  assert.match(
    compose,
    /^networks:\s*$/m,
    "docker-compose.yml must declare a top-level `networks:` key — without it every " +
      "service shares the implicit default bridge, so any sibling container can reach " +
      "the unauthenticated chatgpt-web-codex-browser CDP proxy on 9223"
  );
});

test("chatgpt-web-codex-browser is isolated off the shared default network", () => {
  const compose = readCompose();
  const block = serviceBlock(compose, "chatgpt-web-codex-browser");
  assert.match(
    block,
    /networks:/,
    "chatgpt-web-codex-browser must declare an explicit `networks:` list — otherwise it " +
      "attaches to the implicit default network shared with redis/qdrant/bifrost/etc."
  );
  assert.ok(
    !listedNetworks(block).includes("default"),
    "chatgpt-web-codex-browser must not also list `default` — that would put it right back " +
      "on the shared bridge with every unrelated sibling container"
  );
});

test("omniroute-web (the one legitimate CDP consumer) stays reachable via the dedicated network", () => {
  const compose = readCompose();
  const block = serviceBlock(compose, "omniroute-web");
  assert.match(
    block,
    /networks:/,
    "omniroute-web must explicitly join the dedicated CDP-proxy network to keep reaching " +
      "chatgpt-web-codex-browser:9223 after the sidecar is isolated off the default network"
  );
});

test("unrelated sidecars (redis, qdrant) are not put on the CDP-proxy network", () => {
  const compose = readCompose();
  for (const serviceName of ["redis", "qdrant", "bifrost"]) {
    const block = serviceBlock(compose, serviceName);
    assert.doesNotMatch(
      block,
      /chatgpt-web-codex/,
      `${serviceName} must not reference the chatgpt-web-codex-browser network — it has no ` +
        "legitimate reason to reach the CDP proxy sidecar"
    );
  }
});
