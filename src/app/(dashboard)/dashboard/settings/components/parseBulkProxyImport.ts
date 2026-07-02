/**
 * Pure parser for the proxy bulk-import textarea.
 *
 * Supported line formats (one proxy per line):
 *   1. Pipe-delimited:  NAME|HOST|PORT[|USERNAME|PASSWORD|TYPE|REGION|STATUS|NOTES]
 *   2. Auth-less short: HOST:PORT  → name is auto-generated as "Imported HOST:PORT"
 *
 * Lines starting with # and blank lines are skipped.
 */

export type ParsedProxyEntry = {
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  type: string;
  region: string;
  status: string;
  notes: string;
};

export type ParseError = {
  line: number;
  reason: string;
};

export const VALID_PROXY_TYPES = new Set(["http", "https", "socks5"]);
export const VALID_PROXY_STATUSES = new Set(["active", "inactive"]);

export function parseBulkImportText(text: string): {
  entries: ParsedProxyEntry[];
  errors: ParseError[];
  skipped: number;
} {
  const lines = text.split("\n");
  const entries: ParsedProxyEntry[] = [];
  const errors: ParseError[] = [];
  let skipped = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].trim();
    if (!raw || raw.startsWith("#")) {
      skipped++;
      continue;
    }

    const lineNum = i + 1;

    // Auth-less shorthand: HOST:PORT (no pipe characters, exactly one colon)
    if (!raw.includes("|")) {
      const colonIdx = raw.lastIndexOf(":");
      if (colonIdx > 0) {
        const host = raw.slice(0, colonIdx).trim();
        const portStr = raw.slice(colonIdx + 1).trim();
        const port = Number(portStr);
        if (!host) {
          errors.push({ line: lineNum, reason: "bulkImportErrorMissingHost" });
          continue;
        }
        if (!portStr || isNaN(port) || port < 1 || port > 65535) {
          errors.push({ line: lineNum, reason: "bulkImportErrorInvalidPort" });
          continue;
        }
        entries.push({
          name: `Imported ${host}:${portStr}`,
          host,
          port,
          username: "",
          password: "",
          type: "http",
          region: "",
          status: "active",
          notes: "",
        });
        continue;
      }
      errors.push({ line: lineNum, reason: "bulkImportErrorMissingHost" });
      continue;
    }

    // Full pipe-delimited format: NAME|HOST|PORT[|USERNAME|PASSWORD|TYPE|REGION|STATUS|NOTES]
    const parts = raw.split("|").map((p) => p.trim());
    const [name, host, portStr, username, password, type, region, status, notes] = parts;

    if (!name) {
      errors.push({ line: lineNum, reason: "bulkImportErrorMissingName" });
      continue;
    }
    if (!host) {
      errors.push({ line: lineNum, reason: "bulkImportErrorMissingHost" });
      continue;
    }
    const port = Number(portStr);
    if (!portStr || isNaN(port) || port < 1 || port > 65535) {
      errors.push({ line: lineNum, reason: "bulkImportErrorInvalidPort" });
      continue;
    }
    const normalizedType = (type || "socks5").toLowerCase();
    if (!VALID_PROXY_TYPES.has(normalizedType)) {
      errors.push({ line: lineNum, reason: "bulkImportErrorInvalidType" });
      continue;
    }
    const normalizedStatus = (status || "active").toLowerCase();
    if (!VALID_PROXY_STATUSES.has(normalizedStatus)) {
      errors.push({ line: lineNum, reason: "bulkImportErrorInvalidStatus" });
      continue;
    }

    entries.push({
      name,
      host,
      port,
      username: username || "",
      password: password || "",
      type: normalizedType,
      region: region || "",
      status: normalizedStatus,
      notes: notes || "",
    });
  }

  return { entries, errors, skipped };
}
