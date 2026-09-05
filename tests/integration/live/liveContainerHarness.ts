/**
 * tests/integration/liveContainerHarness.ts
 *
 * Spins up a dedicated, throwaway podman container running this checkout's
 * own code (runner-base target, same as the operator's local dev/beta
 * containers) so wire-capture live tests are fully self-contained — no
 * dependency on a manually-managed systemd quadlet.
 *
 * The container's DATA_DIR is a persistent host directory (not wiped between
 * runs) so the "default" combo + real provider connections only need
 * seeding once; seeding is idempotent and copies from the operator's local
 * omniroute-dev instance (same source used for the manual omniroute-beta
 * seed earlier this session).
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

export const LIVE_CONTAINER_ENABLED = process.env.RUN_LIVE_WIRE_CAPTURE === "1";

const IMAGE_TAG = process.env.LIVE_CONTAINER_IMAGE || "localhost/omniroute:live-wire-test";
const CONTAINER_NAME = process.env.LIVE_CONTAINER_NAME || "omniroute-live-wire-test";
const DATA_DIR_HOST =
  process.env.LIVE_CONTAINER_DATA_DIR || "/data/podman-data/omniroute-live-wire-test/data";
const ENV_FILE = process.env.LIVE_CONTAINER_ENV_FILE || "/data/podman-data/omniroute/omniroute.env";
// Source DB to seed the "default" combo + provider connections from — the
// operator's local omniroute-dev instance, same source used for the manual
// omniroute-beta seed earlier this session.
const SEED_SOURCE_DB =
  process.env.LIVE_CONTAINER_SEED_SOURCE_DB ||
  "/home/markus/code/podman/OmniRoute/data/storage.sqlite";
const SEED_PROVIDERS = ["gemini", "openrouter", "mistral", "cerebras"];

export interface LiveContainerHandle {
  baseUrl: string;
  apiKey: string;
  managementApiKey: string;
  containerName: string;
  netnsPath: string;
  hostPort: number;
  dataDir: string;
  stop(): Promise<void>;
}

function run(cmd: string, args: string[], opts: { input?: string } = {}): string {
  const result = spawnSync(cmd, args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    input: opts.input,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error(
      `${cmd} ${args.join(" ")} failed (exit ${result.status}):\n${result.stderr || result.stdout}`
    );
  }
  return result.stdout.trim();
}

function tryRun(cmd: string, args: string[]): string | null {
  const result = spawnSync(cmd, args, { cwd: REPO_ROOT, encoding: "utf8" });
  return result.status === 0 ? result.stdout.trim() : null;
}

function ensureImageBuilt(): void {
  const existing = tryRun("podman", ["images", "-q", IMAGE_TAG]);
  if (existing) {
    console.log(`  [container] image ${IMAGE_TAG} already exists (${existing}) — reusing`);
    return;
  }
  console.log(`  [container] building ${IMAGE_TAG} (runner-base target — this takes a while)...`);
  run("podman", ["build", "--target", "runner-base", "-t", IMAGE_TAG, "."]);
}

function stopExistingContainer(): void {
  tryRun("podman", ["rm", "-f", CONTAINER_NAME]);
}

function startContainer(): { hostPort: number; netnsPath: string } {
  if (!existsSync(DATA_DIR_HOST)) {
    mkdirSync(DATA_DIR_HOST, { recursive: true });
  }
  // podman unshare owns the rootless user namespace these directories'
  // native uid mappings live in — plain chmod as the host user fails with
  // EPERM on files podman previously wrote as a different mapped uid.
  tryRun("podman", ["unshare", "chmod", "-R", "a+rwX", DATA_DIR_HOST]);

  run("podman", [
    "run",
    "-d",
    "--name",
    CONTAINER_NAME,
    "-p",
    "127.0.0.1::20128",
    "-v",
    `${DATA_DIR_HOST}:/app/data`,
    "--env-file",
    ENV_FILE,
    IMAGE_TAG,
  ]);

  const portOutput = run("podman", ["port", CONTAINER_NAME, "20128/tcp"]);
  const hostPort = Number(portOutput.split(":").pop());
  if (!Number.isFinite(hostPort)) {
    throw new Error(`could not parse assigned host port from: ${portOutput}`);
  }

  const netnsPath = run("podman", [
    "inspect",
    CONTAINER_NAME,
    "--format",
    "{{.NetworkSettings.SandboxKey}}",
  ]);

  return { hostPort, netnsPath };
}

async function waitForHealth(baseUrl: string, timeoutMs = 60_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  let lastError: unknown;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${baseUrl}/api/monitoring/health`);
      if (res.ok) return;
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`container never became healthy within ${timeoutMs}ms: ${lastError}`);
}

// Idempotent: only copies rows if the target has no "default" combo yet.
// Direct SQLite access (not the src/lib/db/ CRUD functions) is deliberate
// here, same as liveGeminiShared.ts's ensureGeminiProvider() — cloning an
// existing row's already-encrypted apiKey blob byte-for-byte has no CRUD
// equivalent, and both instances share the same API_KEY_SECRET (same
// --env-file), so the encrypted value decrypts correctly on the target too.
async function seedDefaultComboAndConnections(): Promise<void> {
  const targetPath = `${DATA_DIR_HOST}/storage.sqlite`;
  if (!existsSync(targetPath)) {
    console.log(`  [container] target DB not created yet, skipping seed this pass`);
    return;
  }
  if (!existsSync(SEED_SOURCE_DB)) {
    console.warn(`  [container] seed source DB not found at ${SEED_SOURCE_DB} — skipping seed`);
    return;
  }

  const target = new Database(targetPath);
  const existingCombo = target.prepare("SELECT 1 FROM combos WHERE name = 'default'").get();
  if (existingCombo) {
    console.log(`  [container] "default" combo already seeded — skipping`);
    target.close();
    return;
  }

  const source = new Database(SEED_SOURCE_DB, { readonly: true });
  const connCols = source.prepare("PRAGMA table_info(provider_connections)").all() as Array<{
    name: string;
  }>;
  const colList = connCols.map((c) => `"${c.name}"`).join(",");
  const placeholders = connCols.map((c) => `@${c.name}`).join(",");
  const insertConn = target.prepare(
    `INSERT OR REPLACE INTO provider_connections (${colList}) VALUES (${placeholders})`
  );

  let copied = 0;
  for (const provider of SEED_PROVIDERS) {
    const rows = source
      .prepare("SELECT * FROM provider_connections WHERE provider = ? AND is_active = 1")
      .all(provider);
    for (const row of rows) {
      insertConn.run(row);
      copied++;
    }
  }

  const comboRow = source.prepare("SELECT * FROM combos WHERE name = 'default'").get() as
    Record<string, unknown> | undefined;
  if (comboRow) {
    const comboCols = Object.keys(comboRow);
    const comboColList = comboCols.map((c) => `"${c}"`).join(",");
    const comboPlaceholders = comboCols.map((c) => `@${c}`).join(",");
    target
      .prepare(`INSERT OR REPLACE INTO combos (${comboColList}) VALUES (${comboPlaceholders})`)
      .run(comboRow);
  }

  console.log(`  [container] seeded "default" combo + ${copied} provider connection(s)`);
  source.close();
  target.close();
}

async function provisionApiKeys(
  baseUrl: string
): Promise<{ apiKey: string; managementApiKey: string }> {
  const passwordLine = spawnSync("grep", ["INITIAL_PASSWORD", ENV_FILE], {
    encoding: "utf8",
  }).stdout.trim();
  const password = passwordLine.split("=").slice(1).join("=") || "CHANGEME";

  const login = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const cookie = login.headers.get("set-cookie");
  if (!cookie) throw new Error("login did not return a session cookie");

  async function createKey(name: string, scopes?: string[]): Promise<string> {
    const res = await fetch(`${baseUrl}/api/keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie! },
      body: JSON.stringify({ name, ...(scopes ? { scopes } : {}) }),
    });
    if (!res.ok) throw new Error(`failed to create API key "${name}": ${res.status}`);
    const data = (await res.json()) as { key: string };
    return data.key;
  }

  const apiKey = await createKey("live-wire-capture-test");
  const managementApiKey = await createKey("live-wire-capture-test-mgmt", ["manage"]);
  return { apiKey, managementApiKey };
}

export async function startLiveContainer(): Promise<LiveContainerHandle> {
  stopExistingContainer();
  ensureImageBuilt();
  const { hostPort, netnsPath } = startContainer();
  const baseUrl = `http://127.0.0.1:${hostPort}`;

  await waitForHealth(baseUrl);
  // The container creates storage.sqlite etc. on first boot under its own
  // internal uid mapping — chmod again now that those files exist, since
  // the earlier pre-start chmod only reached the (then-empty) directory.
  // Without this, seedDefaultComboAndConnections()'s direct host-side
  // better-sqlite3 open fails with "attempt to write a readonly database"
  // (same root cause hit manually with omniroute-beta earlier this session).
  tryRun("podman", ["unshare", "chmod", "-R", "a+rwX", DATA_DIR_HOST]);
  await seedDefaultComboAndConnections();
  const { apiKey, managementApiKey } = await provisionApiKeys(baseUrl);

  return {
    baseUrl,
    apiKey,
    managementApiKey,
    containerName: CONTAINER_NAME,
    netnsPath,
    hostPort,
    dataDir: DATA_DIR_HOST,
    async stop() {
      tryRun("podman", ["stop", "-t", "5", CONTAINER_NAME]);
      tryRun("podman", ["rm", "-f", CONTAINER_NAME]);
    },
  };
}
