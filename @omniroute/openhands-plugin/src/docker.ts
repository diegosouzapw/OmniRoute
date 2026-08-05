/**
 * OpenHands agent-server Docker Compose generator for OmniRoute.
 *
 * Bakes in the integration fixes that were needed to run OpenHands against
 * OmniRoute reliably:
 *   - `privileged: true`       — Python 3.13 socket.socketpair() needs it under
 *                                Docker's default seccomp profile
 *   - `extra_hosts`            — host.docker.internal → host-gateway so the
 *                                sandbox can reach OmniRoute on the host
 *   - host volume for OH_PERSISTENCE_DIR so conversations survive `docker rm`
 *   - PERMITTED_CORS_ORIGINS   — allow the dashboard origin to hit agent-server
 */

export interface OpenHandsDockerOptions {
  /** Agent-server image (default: the official OpenHands runtime image). */
  image?: string;
  /** Container name (default: openhands-agent). */
  containerName?: string;
  /** Model name to pass via LLM_MODEL. */
  model: string;
  /** OmniRoute API key. */
  apiKey: string;
  /** OmniRoute base URL reachable from the sandbox (default http://localhost:20128). */
  omnirouteUrl?: string;
  /** Host directory for OH_PERSISTENCE_DIR (must match env.ts persistenceDir). */
  persistenceDir: string;
  /** CORS origins to permit. */
  corsOrigins?: string[];
  /** Sandbox base image (defaults to OpenHands default). */
  sandboxBaseImage?: string;
  /** Set true to use host networking instead of extra_hosts. */
  hostNetwork?: boolean;
}

export function buildOpenHandsCompose(opts: OpenHandsDockerOptions): string {
  const image = opts.image ?? "docker.all-hands.dev/all-hands-ai/openhands:latest";
  const containerName = opts.containerName ?? "openhands-agent";
  const omnirouteHost = (opts.omnirouteUrl ?? "http://localhost:20128").replace(/\/+$/, "");
  const cors =
    opts.corsOrigins && opts.corsOrigins.length > 0
      ? opts.corsOrigins
      : ["http://localhost:3000", "http://localhost:3001"];

  const lines: string[] = [];
  lines.push(`services:`);
  lines.push(`  openhands:`);
  lines.push(`    image: ${image}`);
  lines.push(`    container_name: ${containerName}`);
  lines.push(`    privileged: true`);
  lines.push(`    environment:`);
  lines.push(`      LLM_MODEL: "${opts.model}"`);
  lines.push(`      LLM_BASE_URL: "${omnirouteHost}/v1"`);
  lines.push(`      LLM_API_KEY: "${opts.apiKey}"`);
  lines.push(`      OH_PERSISTENCE_DIR: "/opt/.openhands-state"`);
  lines.push(`      PERMITTED_CORS_ORIGINS: "${cors.join(",")}"`);
  if (opts.sandboxBaseImage) {
    lines.push(`      SANDBOX_BASE_IMAGE: "${opts.sandboxBaseImage}"`);
  }
  lines.push(`    volumes:`);
  lines.push(`      - ${opts.persistenceDir}:/opt/.openhands-state`);
  lines.push(`    extra_hosts:`);
  lines.push(`      - "host.docker.internal:host-gateway"`);

  return lines.join("\n") + "\n";
}

/**
 * docker run equivalent of {@link buildOpenHandsCompose} — returns the full
 * `docker run` command line.
 */
export function buildOpenHandsDockerRun(opts: OpenHandsDockerOptions): string {
  const image = opts.image ?? "docker.all-hands.dev/all-hands-ai/openhands:latest";
  const omnirouteHost = (opts.omnirouteUrl ?? "http://localhost:20128").replace(/\/+$/, "");
  const cors =
    opts.corsOrigins && opts.corsOrigins.length > 0
      ? opts.corsOrigins
      : ["http://localhost:3000", "http://localhost:3001"];

  const parts = [
    "docker run",
    "--privileged",
    "--add-host host.docker.internal:host-gateway",
    `-e LLM_MODEL="${opts.model}"`,
    `-e LLM_BASE_URL="${omnirouteHost}/v1"`,
    `-e LLM_API_KEY="${opts.apiKey}"`,
    `-e OH_PERSISTENCE_DIR=/opt/.openhands-state`,
    `-e PERMITTED_CORS_ORIGINS="${cors.join(",")}"`,
    `-v "${opts.persistenceDir}:/opt/.openhands-state"`,
    image,
  ];
  return parts.join(" ") + "\n";
}
