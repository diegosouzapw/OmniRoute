import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

function read(relativePath: string): string {
  return readFileSync(join(repoRoot, relativePath), "utf8");
}

test("#8497 README limits podman unshare to a local Linux engine", () => {
  const readme = read("README.md");
  const podmanStart = readme.indexOf("**🦭 Podman**");
  const podmanEnd = readme.indexOf("**⚡ Faster / leaner install", podmanStart);
  const podmanQuickStart = readme.slice(podmanStart, podmanEnd);

  assert.match(podmanQuickStart, /Linux \+ local rootless Podman only/);
  assert.match(podmanQuickStart, /podman unshare chown 1000:1000 \.\/data/);
  assert.match(podmanQuickStart, /macOS or Windows[\s\S]*remote Podman Machine/);
  assert.match(
    podmanQuickStart,
    /contrib\/podman\/README\.md#data-directory-permissions-by-topology/
  );
});

test("#8497 Podman guide separates local engines from Podman Machine", () => {
  const guide = read("contrib/podman/README.md");
  const localStart = guide.indexOf("### Linux with a local rootless Podman engine");
  const machineStart = guide.indexOf("### macOS or Windows with Podman Machine");
  const machineEnd = guide.indexOf("\n---", machineStart);
  const localGuidance = guide.slice(localStart, machineStart);
  const machineGuidance = guide.slice(machineStart, machineEnd);

  assert.ok(localStart >= 0, "local rootless Podman guidance must exist");
  assert.ok(machineStart > localStart, "Podman Machine guidance must be a distinct section");
  assert.match(localGuidance, /podman unshare chown 1000:1000 \.\/data/);
  assert.doesNotMatch(machineGuidance, /podman unshare chown/);
  assert.match(machineGuidance, /remote client/);
  assert.match(machineGuidance, /docker\.io\/diegosouzapw\/omniroute:latest/);
});

test("#8497 Quadlet is Linux/systemd-only and generated units are not enabled", () => {
  const guide = read("contrib/podman/README.md");
  const appUnit = read("contrib/podman/omniroute.container");
  const redisUnit = read("contrib/podman/omniroute-redis.container");

  assert.match(guide, /Option A: Quadlet \(Linux \+ systemd only\)/);
  assert.doesNotMatch(guide, /systemctl --user enable/);
  assert.match(guide, /Generated Quadlet services are transient/);
  for (const unit of [appUnit, redisUnit]) {
    assert.match(unit, /\[Install\][\s\S]*WantedBy=default\.target/);
  }
});

test("#8497 Compose either builds or explicitly reuses the matching local image", () => {
  const guide = read("contrib/podman/README.md");
  const compose = read("docker-compose.yml");

  assert.match(guide, /podman compose --profile base up -d --build/);
  assert.match(
    guide,
    /podman build --target runner-base -t omniroute:base \.[\s\S]*podman compose --profile base up -d --no-build/
  );
  for (const [service, target, image] of [
    ["omniroute-base", "runner-base", "omniroute:base"],
    ["omniroute-web", "runner-web", "omniroute:web"],
    ["omniroute-cli", "runner-cli", "omniroute:cli"],
    ["omniroute-host", "runner-base", "omniroute:base"],
  ]) {
    const serviceStart = compose.indexOf(`  ${service}:`);
    const serviceEnd = compose.indexOf("\n  # ── Profile:", serviceStart + 1);
    const serviceConfig = compose.slice(serviceStart, serviceEnd === -1 ? undefined : serviceEnd);
    assert.ok(serviceStart >= 0, `${service} must exist`);
    assert.match(serviceConfig, new RegExp(`target: ${target}`));
    assert.match(serviceConfig, new RegExp(`image: ${image}`));
  }
  assert.match(guide, /podman compose --profile cliproxyapi up -d(?! --build)/);
});

test("#8497 entrypoint emits a topology-neutral Podman hint", () => {
  const script = read("scripts/check-permissions.sh");

  assert.doesNotMatch(script, /podman unshare/);
  assert.doesNotMatch(script, /podman (?:info|machine|system connection)/);
  assert.match(script, /engine is local or[\s\S]*Podman Machine/);
  assert.match(script, /cannot determine that topology/);
  assert.match(script, /contrib\/podman\/README\.md#data-directory-permissions-by-topology/);
});

test("#8497 pull example and environment hints stay topology-safe", () => {
  const quadlet = read("contrib/podman/omniroute.container");
  const envExample = read(".env.example");
  const envReference = read("docs/reference/ENVIRONMENT.md");

  assert.match(quadlet, /Image=docker\.io\/diegosouzapw\/omniroute:latest/);
  assert.doesNotMatch(quadlet, /diegosouzapw\/omniroute:base/);

  for (const source of [envExample, envReference]) {
    assert.match(source, /any Podman topology/);
    assert.match(source, /cannot determine/);
    assert.match(source, /Podman Machine/);
  }
});

test("#8497 localized quick starts do not retain the remote-unsafe recipe", () => {
  const localizedReadmes = [
    {
      path: "docs/i18n/zh-CN/README.md",
      localOnly: /仅限 Linux \+ 本地无根 Podman/,
    },
    {
      path: "docs/i18n/zh-TW/README.md",
      localOnly: /僅限 Linux \+ 本機 rootless Podman/,
    },
    {
      path: "docs/i18n/pl/README.md",
      localOnly: /Tylko Linux \+ lokalny Podman bez roota/,
    },
  ];

  for (const localized of localizedReadmes) {
    const content = read(localized.path);
    assert.doesNotMatch(content, /mkdir -p data && podman unshare/);
    assert.match(content, localized.localOnly);
    assert.match(content, /Podman Machine/);
    assert.match(content, /contrib\/podman\/README\.md#data-directory-permissions-by-topology/);
  }

  const zhEnvironment = read("docs/i18n/zh-CN/docs/reference/ENVIRONMENT.md");
  assert.doesNotMatch(zhEnvironment, /修复指令使用 `podman unshare chown`/);
  assert.match(zhEnvironment, /任何 Podman 拓扑/);
  assert.match(zhEnvironment, /Podman Machine/);
});
