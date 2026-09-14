import * as workerThreads from "node:worker_threads";
import type { PostgresConfig } from "../../postgresConfig";
import {
  PostgresAdapterError,
  toSqliteStyleMessage,
  type WorkerErrorPayload,
} from "./postgresErrors";

interface WorkerResponse {
  ok: boolean;
  result?: unknown;
  error?: WorkerErrorPayload;
}

function spawnWorker(
  workerPath: string,
  config: PostgresConfig,
  resetSchema: boolean,
  port: workerThreads.MessagePort,
  signal: SharedArrayBuffer
): workerThreads.Worker {
  const pgModulePath = process.env.OMNIROUTE_PG_MODULE_PATH ?? null;
  return new workerThreads.Worker(workerPath, {
    workerData: {
      port,
      signal,
      pgModulePath,
      connection: {
        url: config.url,
        ssl: config.ssl,
        schema: config.schema,
        resetSchema,
        applicationName: config.applicationName,
        statementTimeoutMs: config.statementTimeoutMs,
        connectTimeoutMs: config.connectTimeoutMs,
      },
    },
    transferList: [port],
  });
}

function toAdapterError(payload: WorkerErrorPayload, sql: string | null): PostgresAdapterError {
  if (payload.code === "42883" && /omniroute_/.test(payload.message)) {
    return new PostgresAdapterError(
      `${payload.message} (bootstrap helpers missing; restart the gateway to reinstall them)`,
      payload,
      sql
    );
  }
  return new PostgresAdapterError(toSqliteStyleMessage(payload), payload, sql);
}

export class PostgresSyncChannel {
  private readonly signal = new Int32Array(new SharedArrayBuffer(4));
  private readonly port: workerThreads.MessagePort;
  private readonly worker: workerThreads.Worker;
  private alive = true;
  private exitReason: string | null = null;

  constructor(config: PostgresConfig, resetSchema: boolean, workerPath: string) {
    const channel = new workerThreads.MessageChannel();
    this.port = channel.port1;
    this.worker = spawnWorker(workerPath, config, resetSchema, channel.port2, this.signal.buffer);
    this.worker.unref();
    this.worker.on("exit", (code) => {
      this.alive = false;
      this.exitReason = `worker exited with code ${code}`;
    });
    this.worker.on("error", (error: Error) => {
      this.alive = false;
      this.exitReason = error.message;
    });
  }

  get isAlive(): boolean {
    return this.alive;
  }

  call<T>(request: Record<string, unknown>, sql: string | null, timeoutMs: number): T {
    if (!this.alive)
      throw new PostgresAdapterError(
        `[DB] PostgreSQL worker unavailable: ${this.exitReason ?? "not running"}`,
        {},
        sql
      );
    Atomics.store(this.signal, 0, 0);
    this.port.postMessage(request);
    const waitResult = Atomics.wait(this.signal, 0, 0, timeoutMs);
    const message = workerThreads.receiveMessageOnPort(this.port);
    if (!message) throw this.failWithoutAnswer(waitResult, sql, timeoutMs);
    const response = message.message as WorkerResponse;
    if (!response.ok) throw toAdapterError(response.error as WorkerErrorPayload, sql);
    return response.result as T;
  }

  connect(timeoutMs: number): void {
    this.call({ op: "connect" }, null, timeoutMs);
  }

  close(): void {
    try {
      this.call({ op: "close" }, null, 10_000);
    } catch {}
    this.terminate();
  }

  terminate(): void {
    this.alive = false;
    try {
      this.port.close();
    } catch {}
    void this.worker.terminate();
  }

  private failWithoutAnswer(
    waitResult: string,
    sql: string | null,
    timeoutMs: number
  ): PostgresAdapterError {
    this.terminate();
    if (waitResult === "timed-out") {
      return new PostgresAdapterError(
        `[DB] PostgreSQL worker did not answer within ${timeoutMs}ms; the connection was dropped`,
        { code: "57014" },
        sql
      );
    }
    return new PostgresAdapterError("[DB] PostgreSQL worker stopped without answering", {}, sql);
  }
}
