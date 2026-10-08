import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { buildDevinChildEnv } from "@omniroute/open-sse/executors/devin-cli-agentic";

const execFileAsync = promisify(execFile);
const STATUS_TIMEOUT_MS = 8_000;
const STATUS_MAX_BUFFER = 16 * 1024;
const CACHE_TTL_MS = 10_000;

export type DevinAgenticAuthStatus = "authenticated" | "unauthenticated" | "unavailable";

let cachedStatus: { status: DevinAgenticAuthStatus; checkedAt: number } | null = null;

/**
 * Checks the isolated Devin CLI login without returning CLI output (which
 * contains account PII) to the dashboard. The short cache avoids spawning a
 * CLI process for repeated provider-card renders.
 */
export async function getDevinAgenticAuthStatus(
  source: NodeJS.ProcessEnv = process.env,
  now = Date.now()
): Promise<DevinAgenticAuthStatus> {
  if (cachedStatus && now - cachedStatus.checkedAt < CACHE_TTL_MS) {
    return cachedStatus.status;
  }

  let status: DevinAgenticAuthStatus = "unavailable";
  try {
    const env = buildDevinChildEnv({}, source);
    const bin = source.CLI_DEVIN_AGENTIC_BIN?.trim() || source.CLI_DEVIN_BIN?.trim() || "devin";
    const { stdout, stderr } = await execFileAsync(bin, ["auth", "status"], {
      cwd: env.HOME,
      env,
      timeout: STATUS_TIMEOUT_MS,
      maxBuffer: STATUS_MAX_BUFFER,
      encoding: "utf8",
      windowsHide: true,
    });
    status = parseDevinAuthStatus(`${stdout}\n${stderr}`);
  } catch (error) {
    const result = error as { stdout?: string | Buffer; stderr?: string | Buffer };
    const output = [result.stdout, result.stderr]
      .map((part) => (Buffer.isBuffer(part) ? part.toString("utf8") : part || ""))
      .join("\n");
    status = parseDevinAuthStatus(output);
  }

  cachedStatus = { status, checkedAt: now };
  return status;
}

const ROUTING_MAX_AGE_MS = 60_000;
let refreshInFlight: Promise<DevinAgenticAuthStatus> | null = null;

/**
 * Non-blocking read for the auto-combo hot path (#15446): returns the last known status
 * (null before the first probe ever finished) and, when it is missing or older than
 * `maxAgeMs`, starts ONE background refresh. Routing never waits on the CLI spawn, so a
 * slow or missing `devin` binary cannot add latency to auto/* requests; the provider simply
 * stays out of the pool until a probe has confirmed the isolated login.
 */
export function peekDevinAgenticAuthStatus(
  maxAgeMs = ROUTING_MAX_AGE_MS,
  now = Date.now()
): DevinAgenticAuthStatus | null {
  const known = cachedStatus;
  if ((!known || now - known.checkedAt >= maxAgeMs) && !refreshInFlight) {
    refreshInFlight = getDevinAgenticAuthStatus()
      .catch((): DevinAgenticAuthStatus => "unavailable")
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return known ? known.status : null;
}

/** Test seam: wait for the background refresh started by peekDevinAgenticAuthStatus(). */
export async function waitForDevinAgenticAuthRefresh(): Promise<void> {
  await refreshInFlight;
}

export function parseDevinAuthStatus(output: string): DevinAgenticAuthStatus {
  if (/\bnot logged in\b/i.test(output)) return "unauthenticated";
  if (/\blogged in\b/i.test(output)) return "authenticated";
  return "unavailable";
}

export function clearDevinAgenticAuthStatusCache(): void {
  cachedStatus = null;
}
