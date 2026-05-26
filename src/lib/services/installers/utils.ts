/**
 * Installer utilities — safe execFile wrapper for npm operations.
 *
 * Hard rule #13: never string-interpolate runtime values into shell commands.
 * All npm invocations use execFile() with an explicit args array, never exec().
 */

import { execFile } from "node:child_process";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const DEFAULT_TIMEOUT_MS = 300_000; // 5 min — npm install can be slow

export interface NpmRunResult {
  stdout: string;
  stderr: string;
}

export class InstallError extends Error {
  constructor(
    message: string,
    public readonly friendly: string,
    public readonly httpStatus: number = 500
  ) {
    super(message);
    this.name = "InstallError";
  }
}

/** Classify raw npm/OS errors into user-friendly messages. */
function classifyError(
  err: NodeJS.ErrnoException & { stdout?: string; stderr?: string }
): InstallError {
  const raw = sanitizeErrorMessage(err.message);
  const stderr = err.stderr ?? "";

  if (err.code === "EACCES") {
    return new InstallError(
      raw,
      "Sem permissão para instalar. Verifique as permissões da pasta de dados.",
      403
    );
  }
  if (err.code === "ENOENT" && err.message.includes("npm")) {
    return new InstallError(
      raw,
      "Node.js/npm não está disponível no PATH. Instale Node ≥20.20.2.",
      500
    );
  }
  if (err.code === "ENOSPC" || stderr.includes("ENOSPC")) {
    return new InstallError(raw, "Espaço em disco insuficiente.", 507);
  }
  if (
    err.signal === "SIGTERM" ||
    err.code === "ETIMEDOUT" ||
    (err as Error & { killed?: boolean }).killed
  ) {
    return new InstallError(raw, "Instalação demorou demais. Tente novamente.", 504);
  }
  if (
    stderr.includes("ENOTFOUND") ||
    stderr.includes("network") ||
    stderr.includes("ECONNREFUSED") ||
    stderr.includes("ERR_INVALID_URL")
  ) {
    return new InstallError(
      raw,
      "Falha de rede ao instalar. Verifique a conexão e tente novamente.",
      503
    );
  }

  return new InstallError(raw, `Falha na instalação: ${raw}`, 500);
}

/** Runs npm with the given args array. Never uses shell interpolation. */
export function runNpm(
  args: string[],
  options: { cwd?: string; timeoutMs?: number } = {}
): Promise<NpmRunResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  // On Windows, npm is npm.cmd; on Unix it's npm.
  const npmBin = process.platform === "win32" ? "npm.cmd" : "npm";

  return new Promise((resolve, reject) => {
    execFile(
      npmBin,
      args,
      {
        cwd: options.cwd,
        timeout: timeoutMs,
        env: process.env,
        maxBuffer: 10 * 1024 * 1024, // 10 MB for npm output
      },
      (err, stdout, stderr) => {
        if (err) {
          const classified = classifyError(
            Object.assign(err, { stdout, stderr }) as NodeJS.ErrnoException & {
              stdout: string;
              stderr: string;
            }
          );
          reject(classified);
        } else {
          resolve({ stdout, stderr });
        }
      }
    );
  });
}
