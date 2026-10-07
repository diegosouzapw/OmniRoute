import { canonicalJsonSha256 } from "./stableJson";
import {
  claimServerToolExecution,
  finalizeServerToolExecution,
  readRow,
} from "../db/skillExecutionFence";
import type { SqliteAdapter } from "../db/adapters/types";
import { getDbInstance } from "../db/core";

export type RunWithServerToolFenceResult<T> =
  | { kind: "executed"; value: T }
  | { kind: "replayed"; value: T; status: "success"; errorMessage: null }
  | {
      kind: "replayed";
      value: unknown | null;
      status: "error" | "timeout";
      errorMessage: string | null;
    }
  | { kind: "in_progress" }
  | { kind: "unknown" }
  | { kind: "identity_conflict" };

type ExecutionKey = string;

const activePromises = new Map<
  ExecutionKey,
  { promise: Promise<unknown>; status: "pending" | "resolved" | "rejected" }
>();

const POLL_INTERVAL_MS = 50;
const MAX_POLL_MS = 2_000;

function buildExecutionKey(
  apiKeyId: string,
  requestIdentity: string,
  toolCallId: string
): ExecutionKey {
  return `${apiKeyId}:${requestIdentity}:${toolCallId}`;
}

export interface RunWithServerToolFenceOptions<T> {
  apiKeyId: string;
  requestIdentity: string;
  toolCallId: string;
  toolName: string;
  arguments: Record<string, unknown>;
  leaseDurationMs: number;
  execute: (executionId: string) => Promise<T>;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
  db?: SqliteAdapter;
}

export async function runWithServerToolFence<T>(
  input: RunWithServerToolFenceOptions<T>
): Promise<RunWithServerToolFenceResult<T>> {
  const db = input.db ?? getDbInstance();
  const now = input.now ?? (() => Date.now());
  const sleep = input.sleep ?? ((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)));
  const inputDigest = canonicalJsonSha256(input.arguments);
  const leaseExpiresAt = new Date(now() + input.leaseDurationMs).toISOString();

  const claim = claimServerToolExecution(
    {
      apiKeyId: input.apiKeyId,
      requestIdentity: input.requestIdentity,
      toolCallId: input.toolCallId,
      toolName: input.toolName,
      inputDigest,
      leaseExpiresAt,
    },
    db,
    now()
  );

  switch (claim.kind) {
    case "claimed": {
      const key = buildExecutionKey(input.apiKeyId, input.requestIdentity, input.toolCallId);
      const claimStartTime = now();
      const wrapperPromise = (async () => {
        try {
          const value = await input.execute(claim.executionId);
          const durationMs = now() - claimStartTime;
          finalizeServerToolExecution(
            {
              executionId: claim.executionId,
              status: "success",
              output: value,
              errorMessage: null,
              durationMs,
            },
            db
          );
          return { kind: "success" as const, value, errorMessage: null };
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          const safeMessage = message.replace(/\bat\s+\/[^\s"']+/g, "[stack-redacted]");
          const durationMs = now() - claimStartTime;
          finalizeServerToolExecution(
            {
              executionId: claim.executionId,
              status: "error",
              output: null,
              errorMessage: safeMessage,
              durationMs,
            },
            db
          );
          return { kind: "error" as const, value: null, errorMessage: safeMessage };
        }
      })();

      const entry: { promise: Promise<unknown>; status: "pending" | "resolved" | "rejected" } = {
        promise: wrapperPromise as Promise<unknown>,
        status: "pending",
      };
      activePromises.set(key, entry);
      wrapperPromise.then(
        () => {
          entry.status = "resolved";
        },
        () => {
          entry.status = "rejected";
        }
      );

      try {
        const result = await wrapperPromise;
        if (result.kind === "success") {
          return { kind: "executed", value: result.value as T };
        }
        // Handler errored — finalize already done, propagate
        throw new Error(result.errorMessage ?? "tool execution failed");
      } finally {
        activePromises.delete(key);
      }
    }

    case "replay": {
      if (claim.status === "success") {
        return {
          kind: "replayed",
          value: claim.output as T,
          status: "success",
          errorMessage: null,
        };
      }
      return {
        kind: "replayed",
        value: claim.output ?? null,
        status: claim.status,
        errorMessage: claim.errorMessage,
      };
    }

    case "in_progress": {
      const key = buildExecutionKey(input.apiKeyId, input.requestIdentity, input.toolCallId);
      const deadline = now() + MAX_POLL_MS;
      while (now() < deadline) {
        // Check process-internal promise first
        const active = activePromises.get(key);
        if (active) {
          if (active.status === "resolved") {
            try {
              const result = await active.promise;
              if (result && typeof result === "object" && "status" in result) {
                const r = result as { value: unknown; status: string; errorMessage: string | null };
                if (r.status === "success") {
                  return {
                    kind: "replayed",
                    value: r.value as T,
                    status: "success",
                    errorMessage: null,
                  };
                }
                return {
                  kind: "replayed",
                  value: r.value ?? null,
                  status: r.status as "error" | "timeout",
                  errorMessage: r.errorMessage,
                };
              }
              return {
                kind: "replayed",
                value: result as T,
                status: "success",
                errorMessage: null,
              };
            } catch {
              return { kind: "unknown" };
            }
          }
          if (active.status === "rejected") {
            // Rejected in-process promise — handler failed, return unknown
            return { kind: "unknown" };
          }
        }
        // Also check DB — another process may have finalized
        const row = readRow(db, claim.executionId);
        if (row && row.status !== "running") {
          if (row.status === "success" || row.status === "error" || row.status === "timeout") {
            let parsedOutput: unknown = null;
            if (row.output !== null) {
              try {
                parsedOutput = JSON.parse(row.output);
              } catch {
                parsedOutput = row.output;
              }
            }
            if (row.status === "success") {
              return {
                kind: "replayed",
                value: parsedOutput as T,
                status: "success",
                errorMessage: null,
              };
            }
            return {
              kind: "replayed",
              value: parsedOutput ?? null,
              status: row.status as "error" | "timeout",
              errorMessage: row.error_message,
            };
          }
          return { kind: "unknown" };
        }
        await sleep(POLL_INTERVAL_MS);
      }
      return { kind: "in_progress" };
    }

    case "unknown":
      return { kind: "unknown" };

    case "identity_conflict":
      return { kind: "identity_conflict" };

    default:
      return { kind: "unknown" };
  }
}
