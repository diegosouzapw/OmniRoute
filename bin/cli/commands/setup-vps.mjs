/**
 * omniroute setup vps — Print the exact apt + nginx + docker run block to
 * provision a fresh Linux VPS (Ubuntu/Debian) as an OmniRoute gateway.
 *
 * Why a printer, not an executor:
 *   - SSH credentials, sudo prompts, and firewall rules vary per host.
 *   - The user almost always has to tweak DNS / TLS first.
 *   - Reproducibility: the output is a copy-pasteable script the user can
 *     paste into a `tmux` session on the box.
 *
 * The block covers:
 *   1. apt: update, base packages, docker.io + compose plugin, nginx,
 *      certbot, ufw, fail2ban, qemu-guest-agent (for cloud-init hosts).
 *   2. sysctl: bump file descriptors + tcp buffer sizes.
 *   3. ufw: allow OpenSSH + http + https + 20128 (dashboard) + 20129 (API).
 *   4. systemd: docker.service override to wait for the network.
 *   5. nginx: reverse proxy for `/v1/*` → 127.0.0.1:20129, dashboard on
 *      `/` → 127.0.0.1:20128, websocket upgrade headers preserved.
 *   6. certbot: Let's Encrypt HTTP-01 issuance for the hostname.
 *   7. docker compose: pull the user's chosen profile up -d.
 *   8. healthcheck: curl /v1/models behind the proxy.
 *
 * Conventions match setup-electron/docker/podman (--json, --run no-op
 * here, pure inner runner, ../io.mjs for prints).
 */

import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { t } from "../i18n.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_ROOT = resolve(__dirname, "..", "..", "..");

export const VPS_PROVIDERS = ["hetzner", "digitalocean", "vultr", "generic"];

/**
 * Render the apt + sysctl + ufw prelude. Identical across providers — the
 * differences between Hetzner/DO/Vultr come down to cloud-init defaults
 * and network configuration, all of which are out of scope for the
 * runtime setup.
 *
 * @returns {string}
 */
export function buildAptBlock() {
  return [
    "# ── 1. apt: base packages ──────────────────────────────────────────────────",
    "sudo apt-get update && sudo apt-get upgrade -y",
    "sudo apt-get install -y \\",
    "  ca-certificates curl gnupg lsb-release \\",
    "  nginx certbot python3-certbot-nginx \\",
    "  ufw fail2ban unattended-upgrades \\",
    "  qemu-guest-agent chrony",
    "",
    "# ── 2. Docker Engine + Compose plugin (official repo) ─────────────────────",
    "sudo install -m 0755 -d /etc/apt/keyrings",
    "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg",
    "sudo chmod a+r /etc/apt/keyrings/docker.gpg",
    'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null',
    "sudo apt-get update",
    "sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin",
    "sudo usermod -aG docker $USER && newgrp docker",
    "",
    "# ── 3. sysctl: bump file descriptors and tcp buffers ──────────────────────",
    "echo 'fs.file-max = 2097152' | sudo tee /etc/sysctl.d/99-omniroute.conf",
    "echo 'net.core.rmem_max = 16777216' | sudo tee -a /etc/sysctl.d/99-omniroute.conf",
    "echo 'net.core.wmem_max = 16777216' | sudo tee -a /etc/sysctl.d/99-omniroute.conf",
    "echo 'net.ipv4.tcp_rmem = 4096 87380 16777216' | sudo tee -a /etc/sysctl.d/99-omniroute.conf",
    "echo 'net.ipv4.tcp_wmem = 4096 65536 16777216' | sudo tee -a /etc/sysctl.d/99-omniroute.conf",
    "sudo sysctl --system",
    "",
    "# ── 4. ufw: OpenSSH + http(s) + dashboard + api ───────────────────────────",
    "sudo ufw default deny incoming",
    "sudo ufw default allow outgoing",
    "sudo ufw allow OpenSSH",
    "sudo ufw allow http",
    "sudo ufw allow https",
    "sudo ufw allow 20128/tcp comment 'omniroute dashboard'",
    "sudo ufw allow 20129/tcp comment 'omniroute api'",
    "sudo ufw --force enable",
  ].join("\n");
}

/**
 * Render an nginx server-block that reverse-proxies the OmniRoute
 * dashboard (port 20128) and API (port 20129) behind a single hostname.
 * WebSocket upgrade headers are forwarded so /v1/responses and
 * /v1/chat/completions streaming work end-to-end.
 *
 * @param {string} hostname
 * @returns {string}
 */
export function buildNginxBlock(hostname) {
  // Nginx rejects bare values for `server_name`; collapse multiple
  // hostnames gracefully.
  const serverName = (hostname || "omniroute.example.com").trim();
  return [
    "# ── 5. nginx: reverse proxy ────────────────────────────────────────────────",
    "sudo tee /etc/nginx/sites-available/omniroute > /dev/null <<'NGINX_EOF'",
    "server {",
    "  listen 80;",
    "  listen [::]:80;",
    `  server_name ${serverName};`,
    "",
    "  client_max_body_size 64m;",
    "",
    "  # Dashboard / UI",
    "  location / {",
    "    proxy_pass http://127.0.0.1:20128;",
    "    proxy_set_header Host $host;",
    "    proxy_set_header X-Real-IP $remote_addr;",
    "    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;",
    "    proxy_set_header X-Forwarded-Proto $scheme;",
    "    proxy_http_version 1.1;",
    "  }",
    "",
    "  # API + websocket streaming",
    "  location /v1/ {",
    "    proxy_pass http://127.0.0.1:20129;",
    "    proxy_set_header Host $host;",
    "    proxy_set_header X-Real-IP $remote_addr;",
    "    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;",
    "    proxy_set_header X-Forwarded-Proto $scheme;",
    "    proxy_http_version 1.1;",
    "    proxy_set_header Upgrade $http_upgrade;",
    '    proxy_set_header Connection "upgrade";',
    "    proxy_read_timeout 3600s;",
    "    proxy_send_timeout 3600s;",
    "  }",
    "}",
    "NGINX_EOF",
    "sudo ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute",
    "sudo nginx -t && sudo systemctl reload nginx",
  ].join("\n");
}

/**
 * Render the certbot block for HTTP-01 issuance + auto-renewal.
 *
 * @param {string} hostname
 * @param {string} email
 * @returns {string}
 */
export function buildCertbotBlock(hostname, email) {
  const host = (hostname || "omniroute.example.com").trim();
  const mail = (email || "[email protected]").trim();
  return [
    "# ── 6. certbot: Let's Encrypt TLS ──────────────────────────────────────────",
    `sudo certbot --nginx --non-interactive --agree-tos -m ${mail} -d ${host}`,
    "sudo systemctl enable certbot.timer",
    "sudo systemctl start certbot.timer",
  ].join("\n");
}

/**
 * Render the docker-compose block that pulls the chosen profile up.
 *
 * @param {string} [profile="web"]
 * @param {string} [repoUrl="https://github.com/diegosouzapw/OmniRoute.git"]
 * @returns {string}
 */
export function buildDockerComposeBlock(
  profile = "web",
  repoUrl = "https://github.com/diegosouzapw/OmniRoute.git"
) {
  return [
    "# ── 7. Clone + bring up the stack ──────────────────────────────────────────",
    `git clone ${repoUrl} /opt/omniroute && cd /opt/omniroute`,
    "cp -n .env.example .env  # edit secrets before going live",
    `docker compose --profile ${profile} up -d --build`,
    "",
    "# ── 8. Healthcheck behind the reverse proxy ───────────────────────────────",
    "sleep 5",
    "curl -fsS https://$(hostname -f)/v1/models | jq '.data | length'  # expect: > 0",
  ].join("\n");
}

/**
 * Compose the full provisioning script. Stitches apt + nginx + certbot +
 * docker compose together with section banners.
 *
 * @param {{ provider?: string, hostname?: string, email?: string, profile?: string }} opts
 * @returns {string}
 */
export function renderProvisionScript(opts = {}) {
  const provider = opts.provider || "generic";
  const hostname = opts.hostname || "omniroute.example.com";
  const email = opts.email || "[email protected]";
  const profile = opts.profile || "web";

  return [
    "#!/usr/bin/env bash",
    "# Provisioning script generated by: omniroute setup vps",
    `# Provider: ${provider}`,
    `# Hostname: ${hostname}`,
    `# Compose profile: ${profile}`,
    "#",
    "# Run on a fresh Ubuntu 22.04+ VPS as a user with sudo rights.",
    "# Re-running is safe; each step is idempotent.",
    "",
    "set -euo pipefail",
    "",
    buildAptBlock(),
    "",
    buildNginxBlock(hostname),
    "",
    buildCertbotBlock(hostname, email),
    "",
    buildDockerComposeBlock(profile),
  ].join("\n");
}

/**
 * Inner action runner. Pure (no Commander coupling).
 *
 * @param {{ provider?: string, hostname?: string, email?: string, profile?: string, json?: boolean, output?: string }} opts
 * @returns {Promise<{ exitCode: number, payload?: object }>}
 */
export async function runSetupVpsCommand(opts = {}) {
  const wantsJson = Boolean(opts.json || opts.output === "json");
  const provider = (opts.providerPreset || opts["provider-preset"] || "generic").toLowerCase();
  const hostname = opts.hostname || "omniroute.example.com";
  const email = opts.email || "[email protected]";
  const profile = opts.profile || "web";

  if (!VPS_PROVIDERS.includes(provider)) {
    const msg = `Unknown VPS provider '${provider}'. Valid: ${VPS_PROVIDERS.join(", ")}`;
    if (wantsJson) {
      return { exitCode: 2, payload: { error: msg, valid: VPS_PROVIDERS } };
    }
    printError(msg);
    return { exitCode: 2 };
  }

  const script = renderProvisionScript({ provider, hostname, email, profile });
  const payload = {
    provider,
    hostname,
    email,
    profile,
    script,
    sections: [
      "apt (base packages + docker + nginx + certbot + ufw)",
      "sysctl (file descriptors + tcp buffers)",
      "ufw (firewall allowlist)",
      "nginx (reverse proxy + websocket upgrade)",
      "certbot (Let's Encrypt HTTP-01)",
      "docker compose (pull profile)",
      "healthcheck (curl /v1/models)",
    ],
    scriptPath: join(REPO_ROOT, `omniroute-provision-${provider}.sh`),
  };

  if (wantsJson) {
    console.log(JSON.stringify(payload, null, 2));
    return { exitCode: 0, payload };
  }

  printHeading("OmniRoute → VPS provisioning script");
  printInfo(`Provider: ${provider}`);
  printInfo(`Hostname: ${hostname}`);
  printInfo(`Let's Encrypt email: ${email}`);
  printInfo(`Compose profile: ${profile}`);
  console.log("");
  printInfo("Sections generated:");
  for (const s of payload.sections) console.log(`  - ${s}`);
  console.log("");
  console.log(script);
  console.log("");
  printSuccess(`Script generated. Suggested filename: ${payload.scriptPath}`);
  printInfo(`Next: ssh <user>@${hostname}  (then paste the script above)`);
  return { exitCode: 0 };
}

/**
 * Register the `omniroute setup vps` subcommand on the parent setup
 * command.
 *
 * @param {import("commander").Command} setupCommand
 */
export function registerSetupVps(setupCommand) {
  setupCommand
    .command("vps")
    .description(
      t("setup.vps") ||
        "Print the exact apt + nginx + certbot + docker run block to provision a fresh Linux VPS as an OmniRoute gateway"
    )
    .option(
      "--provider-preset <name>",
      "VPS provider preset tag (hetzner, digitalocean, vultr, generic)",
      "generic"
    )
    .option(
      "--hostname <fqdn>",
      "Public hostname the reverse proxy will serve (used for nginx server_name + certbot)",
      "omniroute.example.com"
    )
    .option(
      "--email <address>",
      "Email address for Let's Encrypt registration",
      "[email protected]"
    )
    .option(
      "--profile <name>",
      "Compose profile to bring up (default: web, includes Chromium for cookie providers)",
      "web"
    )
    .option("--json", "Emit a structured JSON payload (includes the full script) and exit", false)
    .addHelpText(
      "after",
      `\nProviders (metadata tag only - the script body is identical):\n` +
        VPS_PROVIDERS.map(
          (p) => `  ${p.padEnd(14)} → same script; provider only tags the metadata`
        ).join("\n") +
        `\n\nExamples:\n` +
        `  omniroute setup vps --provider-preset hetzner --hostname ai.example.com --email [email protected]\n` +
        `  omniroute setup vps --provider-preset generic --profile base\n` +
        `  omniroute setup vps --json   # capture the full script as JSON\n`
    )
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent?.parent?.optsWithGlobals?.() ?? {};
      const merged = {
        ...opts,
        output: globalOpts.output,
        json: Boolean(opts.json || globalOpts.output === "json"),
      };
      const { exitCode } = await runSetupVpsCommand(merged);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
