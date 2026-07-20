export interface RunResult {
  changes: number;
  lastInsertRowid: number | bigint;
}

export interface PreparedStatement {
  run(...params: unknown[]): RunResult;
  get(...params: unknown[]): unknown;
  all(...params: unknown[]): unknown[];
}

export interface SqliteAdapter {
  readonly driver: "better-sqlite3" | "node:sqlite" | "bun:sqlite" | "sql.js";
  readonly open: boolean;
  readonly name: string;

  prepare(sql: string): PreparedStatement;
  exec(sql: string): void;
  pragma(pragmaStr: string, options?: { simple?: boolean }): unknown;

  /** Retorna uma função que quando chamada executa fn em uma transação DEFERRED */
  transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T;

  /** Executa fn em uma transação IMMEDIATE (adquire write lock imediatamente) */
  immediate(fn: () => void): void;

  /** Backup nativo ou file-copy fallback */
  backup(destination: string): Promise<void>;

  checkpoint(mode?: string): void;
  close(): void;

  readonly raw: unknown;
}
