import fs from "node:fs";

const ALLOWED_DEVIN_SUFFIXES = [".devin.ai", ".cognition.ai"];
const ALLOWED_DEVIN_EXACT = ["server.codeium.com", "unleash.codeium.com"];

function normalizedHostname(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\.$/, "");
}

export function isAllowedDevinAuditHostname(hostname) {
  const value = normalizedHostname(hostname);
  return (
    ALLOWED_DEVIN_EXACT.includes(value) ||
    ALLOWED_DEVIN_SUFFIXES.some((suffix) => value === suffix.slice(1) || value.endsWith(suffix))
  );
}

export function validateDevinAuthStatus(exitStatus, output) {
  if (Number(exitStatus) !== 0) return { ok: false, error: "auth status command failed" };
  const lines = String(output)
    .split(/\r?\n/)
    .map((line) => line.trim());
  if (!lines.some((line) => /^Logged in \(via Devin\)\.?$/.test(line))) {
    return { ok: false, error: "auth status did not confirm login" };
  }
  if (lines.some((line) => /failed to fetch from server/i.test(line))) {
    return { ok: false, error: "auth status could not confirm server access" };
  }
  return { ok: true };
}

export function parseAuditEntries(text) {
  const lines = String(text)
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);
  return lines.map((line) => JSON.parse(line));
}

export function validateZeroClaudeEgress(text) {
  if (String(text).length !== 0) {
    return { ok: false, error: "Claude attempted external egress during the real run" };
  }
  return { ok: true };
}

export function validateClaudeGuardDenials(text) {
  const entries = parseAuditEntries(text);
  if (!entries.length) return { ok: false, error: "Claude egress audit has no records" };
  if (entries.some((entry) => entry.decision !== "deny")) {
    return { ok: false, error: "Claude egress audit contains a non-deny decision" };
  }
  for (const hostname of ["api.anthropic.com", "claude.ai"]) {
    if (!entries.some((entry) => entry.hostname === hostname && entry.decision === "deny")) {
      return { ok: false, error: `Claude egress audit is missing deny for ${hostname}` };
    }
  }
  return { ok: true };
}

export function validateDevinGuardAudit(text) {
  const entries = parseAuditEntries(text);
  if (!entries.length) return { ok: false, error: "Devin egress audit has no records" };
  let sawAllowedDevinRequest = false;
  for (const entry of entries) {
    if (entry.decision === "deny") {
      if (/anthropic|claude\.ai/i.test(normalizedHostname(entry.hostname))) {
        return { ok: false, error: `forbidden Devin egress attempt: ${String(entry.hostname)}` };
      }
      continue;
    }
    if (entry.decision !== "allow" || !isAllowedDevinAuditHostname(entry.hostname)) {
      return { ok: false, error: `unexpected Devin egress record: ${String(entry.hostname)}` };
    }
    sawAllowedDevinRequest = true;
  }
  return sawAllowedDevinRequest
    ? { ok: true }
    : { ok: false, error: "Devin egress audit has no approved request" };
}

export function validateAuditFileStat(stat, expectedUid) {
  if (!stat || !stat.isFile() || stat.isSymbolicLink()) return "audit path is not a regular file";
  if (stat.nlink !== 1) return "audit file link count is not one";
  if (stat.uid !== Number(expectedUid)) return "audit file owner mismatch";
  if ((stat.mode & 0o777) !== 0o666) return "audit file mode mismatch";
  return null;
}

export function readValidatedAuditFile(path, expectedUid) {
  const stat = fs.lstatSync(path);
  const statError = validateAuditFileStat(stat, expectedUid);
  if (statError) throw new Error(statError);
  return fs.readFileSync(path, "utf8");
}

export function validateAuditFile(kind, path, expectedUid) {
  const text = readValidatedAuditFile(path, expectedUid);
  const result =
    kind === "claude-zero"
      ? validateZeroClaudeEgress(text)
      : kind === "claude-denials"
        ? validateClaudeGuardDenials(text)
        : kind === "devin-allowed"
          ? validateDevinGuardAudit(text)
          : { ok: false, error: `unknown audit validation kind: ${kind}` };
  if (!result.ok) throw new Error(result.error);
  return text;
}
