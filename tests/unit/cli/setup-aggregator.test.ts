import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";

import {
  ELECTRON_ACTIONS,
  runSetupElectronCommand,
} from "../../../bin/cli/commands/setup-electron.mjs";
import {
  DOCKER_ACTIONS,
  parseComposeProfiles,
  runSetupDockerCommand,
} from "../../../bin/cli/commands/setup-docker.mjs";
import { PODMAN_ACTIONS, runSetupPodmanCommand } from "../../../bin/cli/commands/setup-podman.mjs";
import {
  VPS_PROVIDERS,
  buildAptBlock,
  buildNginxBlock,
  buildCertbotBlock,
  buildDockerComposeBlock,
  renderProvisionScript,
  runSetupVpsCommand,
} from "../../../bin/cli/commands/setup-vps.mjs";
import { runSetupRemoteCommand } from "../../../bin/cli/commands/setup-remote.mjs";

const REPO_ROOT = join(import.meta.dirname, "..", "..", "..");

test("setup-electron: exposes the expected action catalogue", () => {
  assert.deepEqual(ELECTRON_ACTIONS, [
    "install",
    "dev",
    "build",
    "build:win",
    "build:mac",
    "build:linux",
  ]);
});

test("setup-electron: unknown action is rejected (json mode)", async () => {
  const out = await runSetupElectronCommand({ action: "wat", json: true });
  assert.equal(out.exitCode, 2);
  assert.match(out.payload.error, /Unknown electron action/);
  assert.ok(Array.isArray(out.payload.valid));
});

test("setup-electron: --json payload carries the resolved command", async () => {
  const out = await runSetupElectronCommand({ action: "dev", json: true });
  assert.equal(out.exitCode, 0);
  assert.match(out.payload.command, /npm run electron:dev$/);
  assert.ok(["win32", "darwin", "linux"].includes(out.payload.platform));
});

test("setup-docker: action catalogue includes build/run/compose", () => {
  assert.ok(DOCKER_ACTIONS.includes("build"));
  assert.ok(DOCKER_ACTIONS.includes("run"));
  assert.ok(DOCKER_ACTIONS.includes("compose"));
});

test("setup-docker: parseComposeProfiles discovers profiles from docker-compose.yml", () => {
  const { profiles, servicesByProfile } = parseComposeProfiles(
    join(REPO_ROOT, "docker-compose.yml")
  );
  assert.ok(profiles.length >= 5, `expected >=5 profiles, got ${profiles.length}`);
  for (const p of ["base", "web", "cli", "host"]) {
    assert.ok(profiles.includes(p), `missing canonical profile: ${p}`);
  }
  // servicesByProfile maps each profile to its service names.
  assert.ok(servicesByProfile.web?.length > 0, "web profile should resolve to services");
});

test("setup-docker: rejects unknown profile (json mode)", async () => {
  const out = await runSetupDockerCommand({
    action: "compose",
    profile: "definitely-not-a-profile",
    json: true,
  });
  assert.equal(out.exitCode, 2);
  assert.match(out.payload.error, /Unknown profile/);
});

test("setup-docker: compose --profile web emits docker compose --profile web up -d --build", async () => {
  const out = await runSetupDockerCommand({
    action: "compose",
    profile: "web",
    json: true,
  });
  assert.equal(out.exitCode, 0);
  assert.match(out.payload.command, /docker compose --profile web up -d --build/);
  assert.ok(Array.isArray(out.payload.profileServices));
  assert.ok(
    out.payload.profileServices.length > 0,
    "web profile should resolve to at least one service"
  );
});

test("setup-podman: action catalogue covers quadlet", () => {
  assert.ok(PODMAN_ACTIONS.includes("quadlet"));
  assert.ok(PODMAN_ACTIONS.includes("compose"));
});

test("setup-podman: quadlet --profile web emits a systemd-style .container file", async () => {
  const out = await runSetupPodmanCommand({
    action: "quadlet",
    profile: "web",
    json: true,
  });
  assert.equal(out.exitCode, 0);
  // quadletTargetDir is the directory the unit will live in.
  assert.match(out.payload.quadletTargetDir, /systemd|podman-quadlet$/);
  // The unit content has the canonical systemd sections.
  assert.match(out.payload.quadletUnit, /\[Unit\]/);
  assert.match(out.payload.quadletUnit, /\[Container\]/);
  assert.match(out.payload.quadletUnit, /\[Install\]/);
  // File name is built by joining the target dir with omniroute.container.
  assert.match(`${out.payload.quadletTargetDir}/omniroute.container`, /omniroute\.container$/);
});

test("setup-vps: provider catalogue is closed", () => {
  assert.deepEqual(VPS_PROVIDERS, ["hetzner", "digitalocean", "vultr", "generic"]);
});

test("setup-vps: apt block installs nginx, certbot, ufw", () => {
  const apt = buildAptBlock();
  assert.match(apt, /nginx/);
  assert.match(apt, /certbot/);
  assert.match(apt, /ufw/);
  // docker comes via the official Docker repo (docker-ce), not the
  // distro's docker.io - both paths are acceptable.
  assert.match(apt, /docker-ce/);
});

test("setup-vps: nginx block bakes in server_name + websocket upgrade", () => {
  const nginx = buildNginxBlock("ai.example.com");
  assert.match(nginx, /server_name ai\.example\.com/);
  assert.match(nginx, /proxy_set_header Upgrade \$http_upgrade/);
  assert.match(nginx, /proxy_pass http:\/\/127\.0\.0\.1:20128/);
  assert.match(nginx, /proxy_pass http:\/\/127\.0\.0\.1:20129/);
});

test("setup-vps: certbot block includes the --nginx --non-interactive flags", () => {
  const cb = buildCertbotBlock("ai.example.com", "ops@example.com");
  assert.match(cb, /certbot --nginx --non-interactive --agree-tos/);
  assert.match(cb, /-d ai\.example\.com/);
  assert.match(cb, /-m ops@example\.com/);
});

test("setup-vps: docker-compose block scopes to the chosen profile", () => {
  const dc = buildDockerComposeBlock("host");
  assert.match(dc, /docker compose --profile host up -d --build/);
});

test("setup-vps: full script joins all sections in order", () => {
  const script = renderProvisionScript({
    provider: "hetzner",
    hostname: "ai.example.com",
    email: "ops@example.com",
    profile: "web",
  });
  // Header
  assert.match(script, /# Provisioning script generated by: omniroute setup vps/);
  // Sections appear in order
  const aptIdx = script.indexOf("1. apt");
  const sysctlIdx = script.indexOf("3. sysctl");
  const ufwIdx = script.indexOf("4. ufw");
  const nginxIdx = script.indexOf("5. nginx");
  const certbotIdx = script.indexOf("6. certbot");
  const composeIdx = script.indexOf("7. Clone + bring up the stack");
  assert.ok(aptIdx > -1, "apt section missing");
  assert.ok(sysctlIdx > -1, "sysctl section missing");
  assert.ok(ufwIdx > -1, "ufw section missing");
  assert.ok(nginxIdx > -1, "nginx section missing");
  assert.ok(certbotIdx > -1, "certbot section missing");
  assert.ok(composeIdx > -1, "compose section missing");
  assert.ok(aptIdx < sysctlIdx);
  assert.ok(sysctlIdx < ufwIdx);
  assert.ok(ufwIdx < nginxIdx);
  assert.ok(nginxIdx < certbotIdx);
  assert.ok(certbotIdx < composeIdx);
});

test("setup-vps: rejects unknown provider", async () => {
  const out = await runSetupVpsCommand({
    providerPreset: "linode",
    json: true,
  });
  assert.equal(out.exitCode, 2);
  assert.match(out.payload.error, /Unknown VPS provider/);
});

test("setup-vps: --json payload includes the full script and metadata", async () => {
  const out = await runSetupVpsCommand({
    providerPreset: "hetzner",
    hostname: "ai.example.com",
    email: "ops@example.com",
    profile: "web",
    json: true,
  });
  assert.equal(out.exitCode, 0);
  assert.equal(out.payload.provider, "hetzner");
  assert.equal(out.payload.hostname, "ai.example.com");
  assert.equal(out.payload.email, "ops@example.com");
  assert.equal(out.payload.profile, "web");
  assert.match(out.payload.script, /docker compose --profile web up -d --build/);
  assert.match(out.payload.scriptPath, /omniroute-provision-hetzner\.sh$/);
  assert.ok(Array.isArray(out.payload.sections));
  assert.ok(out.payload.sections.length >= 6);
});

test("setup-remote: status mode emits a Next: hint (json)", async () => {
  const out = await runSetupRemoteCommand({ sub: "status", json: true });
  assert.equal(out.exitCode, 0);
  assert.ok(Array.isArray(out.payload.contexts));
  assert.match(out.payload.next, /omniroute setup remote/);
});

test("setup-remote: dispatch table lists every wired primitive", async () => {
  const out = await runSetupRemoteCommand({ sub: "dispatch", json: true });
  assert.equal(out.exitCode, 0);
  assert.deepEqual(Object.keys(out.payload.dispatch).sort(), [
    "connect",
    "contexts",
    "status",
    "tokens",
  ]);
  assert.deepEqual(out.payload.tokenActions.sort(), ["create", "list", "revoke", "scopes"]);
  assert.deepEqual(out.payload.contextActions.sort(), [
    "add",
    "current",
    "list",
    "remove",
    "show",
    "use",
  ]);
});
