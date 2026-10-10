import { CHANGE_DOMAINS } from "./classify-pr-changes.mjs";

// Only execution dependencies live here; domains/dispositions remain in the
// admission policy. A test binds this table to the existing workflow needs.
export const SHADOW_GATE_DEPENDENCIES = Object.freeze(
  Object.fromEntries(
    Object.entries({
      "ci:changes": [],
      "ci:lint": ["ci:changes"],
      "ci:quality-gate": ["ci:changes", "ci:test-coverage", "ci:lint"],
      "ci:quality-extended": ["ci:changes"],
      "ci:docs-sync-strict": ["ci:changes"],
      "ci:docs-lint": ["ci:changes"],
      "ci:i18n-ui-coverage": ["ci:changes"],
      "ci:i18n-glossary-zhcn": ["ci:changes"],
      "ci:i18n": ["ci:changes"],
      "ci:pr-test-policy": [],
      "ci:build": ["ci:changes"],
      "ci:package-artifact": ["ci:build"],
      "ci:electron-package-smoke": ["ci:build"],
      "ci:test-unit": ["ci:changes"],
      "ci:test-bun-sqlite": ["ci:changes"],
      "ci:test-vitest": ["ci:changes"],
      "ci:test-coverage": ["ci:test-unit"],
      "ci:test-e2e": ["ci:build", "ci:changes"],
      "ci:test-integration": ["ci:changes"],
      "ci:test-security": ["ci:changes"],
      "ci:test-ecosystem": ["ci:changes"],
      "ci:test-protocols-e2e": ["ci:changes"],
      "ci:sonarqube": ["ci:test-coverage"],
      "ci:coverage-pr-comment": ["ci:changes", "ci:pr-test-policy", "ci:test-coverage"],
      "quality:changes": [],
      "quality:docs-gates": ["quality:changes"],
      "quality:fast-gates": ["quality:changes"],
      "quality:fast-vitest": ["quality:changes"],
      "quality:fast-unit": ["quality:changes"],
      "quality:lint-guard": ["quality:changes"],
      "quality:merge-integrity": [],
    }).map(([id, dependencies]) => [id, Object.freeze(dependencies)])
  )
);

const CONDITIONS = new Set([
  "always",
  "code",
  "docs",
  "i18n",
  "code-or-docs",
  "code-or-i18n",
  "code-e2e",
  "pr",
]);
const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function readRule(id, rule) {
  if (!/^(ci|quality):[a-z][a-z0-9-]*$/.test(id) || !isRecord(rule) || !CONDITIONS.has(rule.when)) {
    throw new Error("Invalid shadow policy: job or legacy condition.");
  }
  if (
    !["required", "advisory"].includes(rule.disposition) ||
    (rule.reason !== undefined && typeof rule.reason !== "string") ||
    (rule.disposition === "advisory" && (typeof rule.reason !== "string" || !rule.reason.trim()))
  ) {
    throw new Error(`Invalid shadow policy: disposition/reason for ${id}.`);
  }
  if (
    !Array.isArray(rule.domains) ||
    !rule.domains.length ||
    new Set(rule.domains).size !== rule.domains.length ||
    rule.domains.some((domain) => !CHANGE_DOMAINS.includes(domain))
  ) {
    throw new Error(`Invalid shadow policy: declared domains for ${id}.`);
  }
  return {
    id,
    when: rule.when,
    disposition: rule.disposition,
    ...(rule.reason ? { policyReason: rule.reason } : {}),
    domains: [...rule.domains].sort(),
  };
}

function policyGates(policy) {
  if (
    policy?.schemaVersion !== 1 ||
    !isRecord(policy.profiles) ||
    Object.keys(policy.profiles).sort().join(",") !== "ci,quality"
  ) {
    throw new Error("Invalid shadow policy: schema/profiles.");
  }
  return Object.entries(policy.profiles)
    .flatMap(([profile, entry]) => {
      if (
        !isRecord(entry) ||
        typeof entry.checkName !== "string" ||
        !entry.checkName.trim() ||
        !isRecord(entry.jobs) ||
        !Object.keys(entry.jobs).length
      ) {
        throw new Error(`Invalid shadow policy: profile ${profile}.`);
      }
      return Object.entries(entry.jobs).map(([id, rule]) => readRule(`${profile}:${id}`, rule));
    })
    .sort((left, right) => left.id.localeCompare(right.id));
}

function validateDependencies(gates, dependencies) {
  const ids = new Set(gates.map((gate) => gate.id));
  if (
    !isRecord(dependencies) ||
    Object.keys(dependencies).length !== ids.size ||
    Object.keys(dependencies).some((id) => !ids.has(id))
  ) {
    throw new Error("Invalid shadow dependencies: every policy job needs an explicit entry.");
  }
  for (const targets of Object.values(dependencies)) {
    if (
      !Array.isArray(targets) ||
      new Set(targets).size !== targets.length ||
      targets.some((target) => !ids.has(target))
    ) {
      throw new Error("Invalid shadow dependencies: unknown, repeated or malformed prerequisite.");
    }
  }
  const visiting = new Set();
  const complete = new Set();
  function visit(id) {
    if (visiting.has(id)) throw new Error("Invalid shadow dependencies: cycle.");
    if (complete.has(id)) return;
    visiting.add(id);
    for (const dependency of dependencies[id]) visit(dependency);
    visiting.delete(id);
    complete.add(id);
  }
  for (const id of ids) visit(id);
}

function selectionInput(domains, runAll, classificationFailed) {
  const diagnostics = [];
  const values = typeof domains === "string" ? domains.split(",") : domains;
  let normalized = [];
  if (!Array.isArray(values) || values.length === 0) {
    diagnostics.push("Missing or empty domains; selecting every gate.");
  } else if (
    values.some((value) => typeof value !== "string" || !CHANGE_DOMAINS.includes(value.trim()))
  ) {
    diagnostics.push("Invalid domains; selecting every gate.");
  } else {
    normalized = [...new Set(values.map((value) => value.trim()))].sort();
  }
  if (typeof runAll !== "boolean") diagnostics.push("Invalid runAll flag; selecting every gate.");
  if (classificationFailed !== false)
    diagnostics.push("Classification failed or is invalid; selecting every gate.");
  const fullSelection =
    diagnostics.length > 0 ||
    runAll === true ||
    normalized.length > 1 ||
    normalized.includes("core") ||
    normalized.includes("workflow");
  return { domains: normalized, diagnostics, fullSelection };
}

function closeSelection(gates, dependencies) {
  const byId = new Map(gates.map((gate) => [gate.id, gate]));
  const pending = gates.filter((gate) => gate.selected);
  for (let index = 0; index < pending.length; index++) {
    const consumer = pending[index];
    for (const id of dependencies[consumer.id]) {
      const prerequisite = byId.get(id);
      prerequisite.reasons.push(`dependency:${consumer.id}`);
      if (!prerequisite.selected) {
        prerequisite.selected = true;
        pending.push(prerequisite);
      }
    }
  }
  for (const gate of gates) gate.reasons.sort();
}

// Planning only: this module never executes gates or admits a candidate. Legacy
// conditions are retained as metadata, never used to narrow domain selection.
export function selectShadowGates({
  policy,
  domains,
  dependencies,
  runAll = false,
  classificationFailed = false,
}) {
  const rules = policyGates(policy);
  validateDependencies(rules, dependencies);
  const input = selectionInput(domains, runAll, classificationFailed);
  const gates = rules.map((rule) => {
    const reasons = input.fullSelection
      ? ["full-selection"]
      : rule.domains
          .filter((domain) => input.domains.includes(domain))
          .map((domain) => `domain:${domain}`);
    return { ...rule, selected: reasons.length > 0, reasons };
  });
  closeSelection(gates, dependencies);
  return {
    schemaVersion: 1,
    kind: "shadow-gate-plan",
    status: input.diagnostics.length ? "fallback" : "planned",
    ...input,
    selectedIds: gates.filter((gate) => gate.selected).map((gate) => gate.id),
    notSelectedIds: gates.filter((gate) => !gate.selected).map((gate) => gate.id),
    gates,
  };
}
