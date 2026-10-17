import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, type ChildProcess } from "node:child_process";
import type { Readable } from "node:stream";
import { DATA_DIR } from "../db/core";
import { safeExportError } from "./safeExportError";
import { EXPORT_PROXY_TLS_ENV } from "./childEnvironment";
import type { ExportChildStart, ExportChildReply } from "./childProtocol";

interface ResolutionContext {
  moduleDir?: string;
  cwd?: string;
  entryFile?: string | null;
  fileExists?: (candidate: string) => boolean;
}
/** Same explicit packaging/runtime search order as resolveCallLogArtifactWorker. */
export function resolveLogExportChild(context: ResolutionContext = {}) {
  const moduleDir = context.moduleDir ?? path.dirname(fileURLToPath(import.meta.url));
  const cwd = context.cwd ?? process.cwd();
  const entryFile = context.entryFile === undefined ? process.argv[1] : context.entryFile;
  const exists =
    context.fileExists ??
    ((candidate: string) => Reflect.apply(fs.existsSync, fs, [candidate]) as boolean);
  const relative = "src/lib/logExport/exportChild.js";
  const entryJs = entryFile ? path.join(path.dirname(path.resolve(entryFile)), relative) : null;
  const cwdJs = path.resolve(cwd, relative);
  for (const candidate of [path.join(moduleDir, "exportChild.js"), entryJs, cwdJs]) {
    if (candidate && exists(candidate)) return { childFile: candidate, execArgv: [] as string[] };
  }
  for (const candidate of [
    path.join(moduleDir, "exportChild.ts"),
    path.resolve(cwd, "src/lib/logExport/exportChild.ts"),
  ]) {
    if (exists(candidate)) return { childFile: candidate, execArgv: ["--import", "tsx/esm"] };
  }
  return { childFile: entryJs ?? cwdJs, execArgv: [] as string[] };
}
interface TestOptions {
  modulePath: string;
  beforeAck?: () => Promise<void>;
  onSpawn?: (child: ChildProcess) => void;
  config?: Record<string, unknown>;
}
let testOptions: TestOptions | null = null;
/** Explicit test hook; production never derives this from env, argv, DB or API input. */
export function __setLogExportChildOptionsForTest(options: TestOptions | null): void {
  testOptions = options;
}
function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}
function forwardOutput(
  stream: Readable | null,
  log: (message: string) => void,
  secrets: readonly string[],
  observe?: (chunk: string) => void
): () => void {
  if (!stream) return () => {};
  let pending = "";
  let oversized = false;
  stream.setEncoding("utf8");
  const data = (chunk: string) => {
    observe?.(chunk);
    for (const part of chunk.split(/(?<=\n)/)) {
      if (pending.length + part.length > 8192) oversized = true;
      if (!oversized) pending += part;
      if (part.endsWith("\n")) {
        log(
          `[LogExport child] ${oversized ? "[oversized output omitted]" : safeExportError(pending.trimEnd(), secrets)}`
        );
        pending = "";
        oversized = false;
      }
    }
  };
  const end = () => {
    if (pending) log(`[LogExport child] ${safeExportError(pending, secrets)}`);
  };
  stream.on("data", data);
  stream.on("end", end);
  return () => {
    stream.off("data", data);
    stream.off("end", end);
  };
}

/** Resolves/rejects only once the child has closed, including after TERM → KILL escalation. */
export function runExportChild(
  start: ExportChildStart,
  onBatch: (cursor: number, count: number) => void,
  secretValues: readonly string[]
): Promise<void> {
  const fixture = testOptions;
  const { childFile, execArgv } = resolveLogExportChild();
  const timeoutMs = positiveInteger(
    process.env.OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS,
    15 * 60 * 1000
  );
  const heapMb = positiveInteger(process.env.OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB, 1024);
  const env: NodeJS.ProcessEnv = { DATA_DIR, NODE_ENV: process.env.NODE_ENV ?? "production" };
  if (process.env.ELECTRON_RUN_AS_NODE) env.ELECTRON_RUN_AS_NODE = process.env.ELECTRON_RUN_AS_NODE;
  // Legacy disk filenames depend on local time. Explicit TZ is the only extra path input.
  if (process.env.TZ) env.TZ = process.env.TZ;
  // Preserve outbound routing/TLS trust without copying unrelated server secrets.
  for (const name of EXPORT_PROXY_TLS_ENV) {
    if (process.env[name] !== undefined) env[name] = process.env[name];
  }
  const child = spawn(
    process.execPath,
    [
      `--max-old-space-size=${heapMb}`,
      "--disable-warning=ExperimentalWarning",
      ...execArgv,
      childFile,
    ],
    {
      env,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe", "ipc"],
    }
  );
  let heapExhausted = false;
  let stderrTail = "";
  const stopStdout = forwardOutput(child.stdout, console.log, secretValues);
  const stopStderr = forwardOutput(child.stderr, console.error, secretValues, (chunk) => {
    const text = stderrTail + chunk;
    heapExhausted ||= /Reached heap limit|JavaScript heap out of memory/i.test(text);
    stderrTail = text.slice(-128);
  });
  return new Promise<void>((resolve, reject) => {
    let done = false;
    let finishing = false;
    let processing = false;
    let failure: Error | null = null;
    let cursor = start.cursorRowId;
    let exported = 0;
    let killTimer: NodeJS.Timeout | undefined;
    const stop = (error?: unknown) => {
      if (finishing) return;
      finishing = true;
      if (error) failure = new Error(safeExportError(error, secretValues));
      child.kill("SIGTERM");
      killTimer = setTimeout(() => {
        child.kill("SIGKILL");
      }, 500);
    };
    const timeout = setTimeout(
      () => stop(new Error(`Log export timed out after ${timeoutMs}ms`)),
      timeoutMs
    );
    const error = (err: Error) => stop(err);
    const message = (reply: ExportChildReply) => {
      if (finishing) return;
      if (!reply || typeof reply !== "object") {
        stop(new Error("Invalid log export child message"));
        return;
      }
      if (reply.kind === "error") {
        stop(new Error(String(reply.message)));
        return;
      }
      if (reply.kind === "done") {
        if (processing) {
          stop(new Error("Child completed before batch acknowledgement"));
          return;
        }
        done = true;
        // Let normal exit flush IPC/stdio; the run timer still bounds a stuck child.
        return;
      }
      if (
        reply.kind !== "batch" ||
        processing ||
        done ||
        !Number.isSafeInteger(reply.cursorRowId) ||
        reply.cursorRowId <= cursor ||
        !Number.isSafeInteger(reply.count) ||
        reply.count <= 0 ||
        reply.count > Math.min(start.batchSize, start.maxRowsPerRun - exported)
      ) {
        stop(new Error("Invalid log export child batch"));
        return;
      }
      processing = true;
      void (async () => {
        try {
          await fixture?.beforeAck?.();
          if (finishing) return;
          onBatch(reply.cursorRowId, reply.count);
          cursor = reply.cursorRowId;
          exported += reply.count;
          processing = false;
          child.send({ kind: "ack", cursorRowId: cursor }, (err) => {
            if (err) stop(err);
          });
        } catch (err) {
          stop(err);
        }
      })();
    };
    const close = (code: number | null, signal: NodeJS.Signals | null) => {
      finishing = true;
      clearTimeout(timeout);
      clearTimeout(killTimer);
      child.off("message", message);
      child.off("error", error);
      child.off("close", close);
      stopStdout();
      stopStderr();
      if (failure) reject(failure);
      else if (heapExhausted || signal === "SIGABRT" || code === 134)
        reject(
          new Error(
            `Log export child ${heapExhausted ? "V8 heap exhausted (JavaScript heap out of memory)" : "aborted (possible V8 heap exhaustion)"}; lower batch size or raise OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB. The cursor remains at the last acknowledged batch.`
          )
        );
      else if (!done || code !== 0)
        reject(
          new Error(
            `Log export child exited without successful done (code ${code}, signal ${signal})`
          )
        );
      else resolve();
    };
    child.on("message", message);
    child.on("error", error);
    child.on("close", close);
    try {
      fixture?.onSpawn?.(child);
      child.send(
        {
          ...start,
          ...(fixture ? { testModulePath: fixture.modulePath, testConfig: fixture.config } : {}),
        },
        (err) => {
          if (err) stop(err);
        }
      );
    } catch (err) {
      stop(err);
    }
  });
}
