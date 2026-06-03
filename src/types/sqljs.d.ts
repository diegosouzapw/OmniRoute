declare module "sql.js" {
  export interface SqlJsStatement {
    bind(values: unknown[]): void;
    step(): boolean;
    getAsObject(): Record<string, unknown>;
    free(): void;
  }

  export interface SqlJsResult {
    columns: string[];
    values: unknown[][];
  }

  export interface SqlJsDatabase {
    prepare(sql: string): SqlJsStatement;
    run(sql: string): void;
    exec(sql: string): SqlJsResult[];
    export(): Uint8Array;
    close(): void;
    getRowsModified(): number;
  }

  export interface SqlJsStatic {
    Database: new (data?: Uint8Array) => SqlJsDatabase;
  }

  export default function initSqlJs(): Promise<SqlJsStatic>;
}
