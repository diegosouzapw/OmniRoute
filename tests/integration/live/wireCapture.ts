/**
 * tests/integration/wireCapture.ts
 *
 * Rootless wire capture + analysis for live container tests. Uses
 * `podman unshare nsenter --net=<container netns>` to run tcpdump without
 * sudo/root (verified working against a rootless podman container — see
 * scripts/sre/tcp-close-analyzer.py's docstring for the equivalent
 * root-requiring `nsenter -t $PID` command this generalizes from), then
 * shells out to that same script to reassemble TCP streams and extract
 * HTTP request/response lines + correlationId per stream.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const ANALYZER_SCRIPT = `${REPO_ROOT}scripts/sre/tcp-close-analyzer.py`;

export interface WireStreamRecord {
  streamKey: string;
  client: string | null;
  server: string | null;
  firstTs: number;
  lastTs: number;
  durationSec: number;
  packetCount: number;
  correlationId: string | null;
  requestId: string | null;
  firstLineFromA: string | null;
  firstLineFromB: string | null;
  closes: Array<{ ts: number; side: string; src: string; dst: string; flags: string }>;
  verdict:
    | "client_closed_first"
    | "server_closed_first"
    | "simultaneous"
    | "no_close_seen"
    | "unknown_side_closed_first";
}

export interface CaptureHandle {
  pcapPath: string;
  stop(): Promise<void>;
}

// Best-effort HTTP status line finder — checks both reassembled directions
// since we don't know a priori which one carried the response.
export function responseStatusLine(record: WireStreamRecord): string | null {
  for (const line of [record.firstLineFromA, record.firstLineFromB]) {
    if (line && /^HTTP\/\d\.\d \d{3}/.test(line)) return line;
  }
  return null;
}

export function requestLine(record: WireStreamRecord): string | null {
  for (const line of [record.firstLineFromA, record.firstLineFromB]) {
    if (line && /^(GET|POST|PUT|PATCH|DELETE) /.test(line)) return line;
  }
  return null;
}

export async function startWireCapture(
  netnsPath: string,
  pcapPath: string,
  bpfFilter: string
): Promise<CaptureHandle> {
  if (existsSync(pcapPath)) unlinkSync(pcapPath);

  // `-U`: flush each packet to disk as captured instead of buffering, so a
  // non-graceful stop still leaves a readable pcap.
  const child = spawn(
    "podman",
    [
      "unshare",
      "nsenter",
      `--net=${netnsPath}`,
      "--",
      "tcpdump",
      "-i",
      "any",
      "-U",
      "-w",
      pcapPath,
      bpfFilter,
    ],
    { stdio: ["ignore", "ignore", "pipe"] }
  );

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("tcpdump did not start listening in time")),
      10_000
    );
    child.stderr?.on("data", (chunk: Buffer) => {
      if (chunk.toString().includes("listening on")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    child.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`tcpdump exited early with code ${code}`));
    });
  });

  return {
    pcapPath,
    async stop() {
      // podman unshare -> nsenter -> tcpdump is a 3-level subprocess chain;
      // SIGTERM to the top-level `podman` process (the only PID Node's
      // child_process handle actually tracks) does not reliably reach the
      // tcpdump grandchild, leaving it running as an orphan with a
      // never-flushed pcap. pkill by the (unique, per-run) pcap path
      // reliably reaches the real tcpdump process regardless of how deep
      // the subprocess chain is.
      child.kill("SIGTERM");
      spawnSync("pkill", ["-f", `tcpdump.*${pcapPath}`]);
      await new Promise<void>((resolve) => {
        if (child.exitCode !== null) return resolve();
        child.on("exit", () => resolve());
        setTimeout(resolve, 3_000);
      });
      // Give the now-dead tcpdump's OS write buffers a moment to land on
      // disk before anything tries to read the pcap.
      await new Promise((r) => setTimeout(r, 250));
    },
  };
}

export async function analyzeCapture(pcapPath: string): Promise<WireStreamRecord[]> {
  const jsonlPath = pcapPath.replace(/\.pcap$/, "") + ".streams.jsonl";
  const result = spawnSync("python3", [ANALYZER_SCRIPT, pcapPath, "--out", jsonlPath], {
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(`tcp-close-analyzer.py failed: ${result.stderr || result.stdout}`);
  }
  if (!existsSync(jsonlPath)) return [];

  return readFileSync(jsonlPath, "utf8")
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line) as WireStreamRecord);
}

export function indexByCorrelationId(records: WireStreamRecord[]): Map<string, WireStreamRecord[]> {
  const map = new Map<string, WireStreamRecord[]>();
  for (const record of records) {
    if (!record.correlationId) continue;
    const existing = map.get(record.correlationId) || [];
    existing.push(record);
    map.set(record.correlationId, existing);
  }
  return map;
}
