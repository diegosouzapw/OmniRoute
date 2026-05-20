import { existsSync, readFileSync } from "node:fs";

export function detectRestrictedEnvironment() {
  if (process.env.CODESPACES === "true" || process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN) {
    return { type: "github-codespaces", canOpenBrowser: false, canUseTray: false };
  }

  if (existsSync("/.dockerenv")) {
    return { type: "docker", canOpenBrowser: false, canUseTray: false };
  }

  try {
    if (existsSync("/proc/1/cgroup") && readFileSync("/proc/1/cgroup", "utf8").includes("docker")) {
      return { type: "docker", canOpenBrowser: false, canUseTray: false };
    }
  } catch {}

  if (process.env.WSL_DISTRO_NAME || process.env.WSL_INTEROP) {
    return {
      type: "wsl",
      canOpenBrowser: true,
      canUseTray: false,
      hint: "Browser opens in Windows host.",
    };
  }

  if (process.env.GITPOD_WORKSPACE_ID) {
    return { type: "gitpod", canOpenBrowser: false, canUseTray: false };
  }

  if (process.env.REPL_ID || process.env.REPL_SLUG) {
    return { type: "replit", canOpenBrowser: false, canUseTray: false };
  }

  if (process.env.CI) {
    return { type: "ci", canOpenBrowser: false, canUseTray: false };
  }

  if (!process.stdin.isTTY) {
    return { type: "non-interactive", canOpenBrowser: false, canUseTray: false };
  }

  return { type: "desktop", canOpenBrowser: true, canUseTray: true };
}

export function getEnvBanner() {
  const env = detectRestrictedEnvironment();
  if (env.type === "desktop") return null;
  return `[${env.type}] ${env.hint || "limited environment detected"}`;
}
