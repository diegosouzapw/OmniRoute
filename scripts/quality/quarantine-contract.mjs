import ts from "typescript";

// Parse configuration without evaluating arbitrary imports or executing its plugins.
// Dynamic exclude expressions require an explicit model update, never a silent [].
export function parseVitestExcludes(source) {
  const file = ts.createSourceFile(
    "vitest.config.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  if (file.parseDiagnostics.length) throw new Error("invalid Vitest configuration syntax");
  const found = [];
  function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(file) === "exclude") {
      if (
        !ts.isArrayLiteralExpression(node.initializer) ||
        !node.initializer.elements.every(ts.isStringLiteral)
      ) {
        throw new Error("Vitest exclude must be a literal string array for discovery");
      }
      found.push(node.initializer.elements.map((item) => item.text));
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  if (found.length !== 1) throw new Error("expected exactly one Vitest exclude array");
  return found[0];
}

function dateValue(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : NaN;
}

export function validateQuarantine(entries, { now = new Date(), issueStates } = {}) {
  const errors = [];
  if (!Array.isArray(entries)) return ["quarantine inventory must be an array"];
  const seen = new Set();
  for (const entry of entries) {
    const file = entry?.file;
    const label = typeof file === "string" ? file : "invalid entry";
    if (
      typeof file !== "string" ||
      !/^(tests|src|open-sse)\//.test(file) ||
      file.split("/").some((part) => !part || part === "." || part === "..") ||
      /[\\*?\[\]{}]/.test(file) ||
      !/\.(test|spec)\.[cm]?[jt]sx?$/.test(file)
    ) {
      errors.push(`${label}: expected one repository-relative test file`);
    }
    if (seen.has(file)) errors.push(`${label}: duplicate quarantine entry`);
    seen.add(file);
    if (!/^[A-Za-z0-9][A-Za-z0-9-]{0,38}$/.test(entry?.owner ?? ""))
      errors.push(`${label}: missing owner`);
    if (!/^#[1-9]\d*$/.test(entry?.issue ?? "")) errors.push(`${label}: missing issue`);
    if (typeof entry?.status !== "string" || !entry.status.trim())
      errors.push(`${label}: missing measured result`);
    const measured = dateValue(entry?.measured);
    const expires = dateValue(entry?.expires);
    if (!Number.isFinite(measured) || measured > now.getTime())
      errors.push(`${label}: invalid measured date`);
    if (
      !Number.isFinite(expires) ||
      expires <= now.getTime() ||
      expires <= measured ||
      expires - measured > 30 * 86_400_000
    )
      errors.push(`${label}: expired or invalid expiry (maximum 30 days from measurement)`);
    if (issueStates !== undefined && issueStates[entry?.issue]?.toLowerCase() !== "open")
      errors.push(`${label}: tracking issue is not confirmed open`);
  }
  return errors;
}
