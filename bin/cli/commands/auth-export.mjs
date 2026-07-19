import { chmodSync, existsSync, writeFileSync } from "node:fs";
import { decryptCredential } from "../encryption.mjs";
import { findProviderConnection, listProviderConnections } from "../provider-store.mjs";
import { openOmniRouteDb } from "../sqlite.mjs";
import { t } from "../i18n.mjs";

/**
 * Local-only, operator-invoked command that dumps DECRYPTED provider credentials
 * (apiKey/accessToken/refreshToken/idToken). This never runs inside the HTTP server
 * process and must never be reachable over the network — no src/app/api/ route wraps
 * this. See docs/security/ for the threat-model writeup referenced in issue #6683.
 */

const CREDENTIAL_FIELDS = [
  { key: "apiKey", envSuffix: "API_KEY" },
  { key: "accessToken", envSuffix: "ACCESS_TOKEN" },
  { key: "refreshToken", envSuffix: "REFRESH_TOKEN" },
  { key: "idToken", envSuffix: "ID_TOKEN" },
];

const VALID_FORMATS = new Set(["json", "env"]);
const SECURE_FILE_MODE = 0o600;

export function registerAuthExport(program) {
  program
    .command("auth export")
    .description(t("authExport.description"))
    .option("--id <id>", t("authExport.idOpt"))
    .option("--format <format>", t("authExport.formatOpt"), "json")
    .option("--out <file>", t("authExport.outOpt"))
    .option("--force", t("authExport.forceOpt"))
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runAuthExportCommand({ ...opts, ...globalOpts });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runAuthExportCommand(opts = {}) {
  // Security control (a): confirmation gate BEFORE any DB access — a dry invocation
  // never opens the database and never decrypts anything.
  if (!opts.force) {
    printConfirmationGate();
    return 0;
  }

  const format = opts.format || "json";
  if (!VALID_FORMATS.has(format)) {
    console.error(t("authExport.invalidFormat", { format }));
    return 1;
  }

  if (!process.env.STORAGE_ENCRYPTION_KEY) {
    console.error(t("authExport.missingKey"));
    return 1;
  }

  // Security control (b): stderr warning banner BEFORE any plaintext is emitted.
  process.stderr.write(t("authExport.warning") + "\n");

  const rows = await loadTargetConnections(opts.id);
  if (rows === null) {
    console.error(t("authExport.notFound", { id: opts.id }));
    return 1;
  }

  const exported = rows.map(exportConnection);
  const content = format === "env" ? formatAsEnv(exported) : formatAsJson(exported);

  if (opts.out) {
    writeSecureFile(opts.out, content);
  } else {
    console.log(content);
  }

  return 0;
}

function printConfirmationGate() {
  console.log(
    `\n${t("authExport.confirmHeading")}\n\n${t("authExport.confirmBody")}\n\n${t("authExport.confirmFooter")}\n`
  );
}

async function loadTargetConnections(id) {
  const { db } = await openOmniRouteDb();
  try {
    if (!id) return listProviderConnections(db);
    const connection = findProviderConnection(db, id);
    return connection ? [connection] : null;
  } finally {
    db.close();
  }
}

function decryptField(rawValue) {
  // Security control (d): a per-field decrypt failure surfaces as a boolean flag,
  // never the caught error text. Security control (e): the caught error is never
  // interpolated into any message.
  try {
    return { value: decryptCredential(rawValue), failed: false };
  } catch {
    return { value: null, failed: true };
  }
}

function exportConnection(connection) {
  const result = {
    id: connection.id,
    provider: connection.provider,
    name: connection.name,
    authType: connection.authType,
  };

  for (const { key } of CREDENTIAL_FIELDS) {
    const rawValue = connection[key];
    if (!rawValue) {
      result[key] = null;
      result[`${key}DecryptFailed`] = false;
      continue;
    }
    const { value, failed } = decryptField(rawValue);
    result[key] = value;
    result[`${key}DecryptFailed`] = failed;
  }

  return result;
}

function formatAsJson(rows) {
  return JSON.stringify(rows, null, 2);
}

function envSafeSegment(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function formatAsEnv(rows) {
  const lines = [];
  for (const row of rows) {
    lines.push(`# ${row.provider} (${row.id})`);
    const providerSegment = envSafeSegment(row.provider);
    for (const { key, envSuffix } of CREDENTIAL_FIELDS) {
      const value = row[key];
      if (!value) continue;
      lines.push(`OMNIROUTE_${providerSegment}_${envSuffix}=${value}`);
    }
  }
  return lines.join("\n");
}

function writeSecureFile(filePath, content) {
  // Security control (c): file output written with mode 0o600 (plus chmodSync if the
  // file pre-existed, belt-and-suspenders against an already world-readable file).
  const preExisted = existsSync(filePath);
  writeFileSync(filePath, content, { mode: SECURE_FILE_MODE });
  if (preExisted) {
    chmodSync(filePath, SECURE_FILE_MODE);
  }
}
