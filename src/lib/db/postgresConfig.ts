import { createHash } from "node:crypto";

export interface PostgresConfig {
  url: string;
  schema: string | null;
  schemaMode: "fixed" | "auto" | null;
  ssl: boolean | { rejectUnauthorized: boolean };
  statementTimeoutMs: number;
  connectTimeoutMs: number;
  applicationName: string;
  importSqliteOnSetup: boolean;
}

const URL_ENV = "OMNIROUTE_DATABASE_URL";
const SCHEMA_ENV = "OMNIROUTE_DATABASE_SCHEMA";
const SSL_ENV = "OMNIROUTE_DATABASE_SSL";
const STATEMENT_TIMEOUT_ENV = "OMNIROUTE_DATABASE_STATEMENT_TIMEOUT_MS";
const CONNECT_TIMEOUT_ENV = "OMNIROUTE_DATABASE_CONNECT_TIMEOUT_MS";
const IMPORT_ENV = "OMNIROUTE_DATABASE_IMPORT_SQLITE";

const DEFAULT_STATEMENT_TIMEOUT_MS = 60_000;
const DEFAULT_CONNECT_TIMEOUT_MS = 10_000;

export function isPostgresUrl(value: string | undefined | null): boolean {
  if (!value) return false;
  return /^postgres(ql)?:\/\//i.test(value.trim());
}

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseSsl(raw: string | undefined): PostgresConfig["ssl"] {
  const value = (raw ?? "").trim().toLowerCase();
  if (value === "" || value === "0" || value === "false" || value === "off" || value === "disable")
    return false;
  if (value === "no-verify" || value === "allow" || value === "prefer")
    return { rejectUnauthorized: false };
  return true;
}

function sanitizeSchema(
  raw: string | undefined,
  dataDir: string
): { schema: string | null; mode: PostgresConfig["schemaMode"] } {
  const value = (raw ?? "").trim();
  if (!value) return { schema: null, mode: null };
  if (value.toLowerCase() === "auto") {
    const digest = createHash("sha1")
      .update(dataDir || process.cwd())
      .digest("hex")
      .slice(0, 12);
    return { schema: `omniroute_t_${digest}`, mode: "auto" };
  }
  if (!/^[A-Za-z_][A-Za-z0-9_]{0,62}$/.test(value)) {
    throw new Error(
      `[DB] ${SCHEMA_ENV} must be a plain identifier (letters, digits, underscore); got "${value}"`
    );
  }
  return { schema: value, mode: "fixed" };
}

export function resolvePostgresConfig(
  env: NodeJS.ProcessEnv = process.env,
  dataDir: string = env.DATA_DIR ?? ""
): PostgresConfig | null {
  const url = env[URL_ENV]?.trim();
  if (!isPostgresUrl(url)) return null;
  const importFlag = (env[IMPORT_ENV] ?? "").trim().toLowerCase();
  const { schema, mode } = sanitizeSchema(env[SCHEMA_ENV], dataDir);
  return {
    url: url as string,
    schema,
    schemaMode: mode,
    ssl: parseSsl(env[SSL_ENV]),
    statementTimeoutMs: parsePositiveInt(env[STATEMENT_TIMEOUT_ENV], DEFAULT_STATEMENT_TIMEOUT_MS),
    connectTimeoutMs: parsePositiveInt(env[CONNECT_TIMEOUT_ENV], DEFAULT_CONNECT_TIMEOUT_MS),
    applicationName: `omniroute-${process.pid}`,
    importSqliteOnSetup:
      importFlag === "1" || importFlag === "true" || importFlag === "auto" || importFlag === "yes",
  };
}

export function redactPostgresUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.password) parsed.password = "***";
    return parsed.toString();
  } catch {
    return url.replace(/:\/\/([^:@/]+):[^@/]+@/, "://$1:***@");
  }
}
