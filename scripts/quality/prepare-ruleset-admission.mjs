#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const WRITABLE_FIELDS = ["name", "target", "enforcement", "bypass_actors", "conditions", "rules"];
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonical(value[key])])
    );
  }
  return value;
}
function hash(value) {
  return createHash("sha256")
    .update(JSON.stringify(canonical(value)))
    .digest("hex");
}
function snapshotState(snapshot) {
  if (
    snapshot?.target !== "branch" ||
    snapshot?.source_type !== "Repository" ||
    !Number.isSafeInteger(snapshot?.id) ||
    snapshot.id <= 0 ||
    !snapshot.source ||
    !snapshot.updated_at
  ) {
    throw new Error("expected an identified repository branch ruleset snapshot");
  }
  // GitHub omits this field without adequate read permissions. An absent list
  // is NOT the same as an empty list; never propose overwriting hidden policy.
  if (!Array.isArray(snapshot.bypass_actors)) throw new Error("missing privileged bypass readback");
  if (
    !Array.isArray(snapshot.rules) ||
    !snapshot.conditions ||
    !snapshot.name ||
    !["active", "disabled", "evaluate"].includes(snapshot.enforcement)
  ) {
    throw new Error("incomplete ruleset configuration");
  }
  return Object.fromEntries(WRITABLE_FIELDS.map((key) => [key, structuredClone(snapshot[key])]));
}

export function prepareRulesetProposal(snapshot, requiredChecks) {
  const payload = snapshotState(snapshot);
  if (!Array.isArray(requiredChecks) || !requiredChecks.length)
    throw new Error("empty required checks");
  const seen = new Set();
  for (const check of requiredChecks) {
    if (
      typeof check.context !== "string" ||
      !check.context.trim() ||
      /[\r\n]/.test(check.context) ||
      !Number.isSafeInteger(check.integration_id) ||
      check.integration_id <= 0 ||
      seen.has(check.context)
    ) {
      throw new Error("invalid or duplicate integration-bound check");
    }
    seen.add(check.context);
  }
  const rules = payload.rules.filter((rule) => rule.type === "required_status_checks");
  if (rules.length > 1) throw new Error("duplicate required-status-check rules");
  const rule = rules[0] || {
    type: "required_status_checks",
    parameters: { required_status_checks: [] },
  };
  if (!Array.isArray(rule.parameters?.required_status_checks))
    throw new Error("invalid existing checks");
  const additions = [];
  for (const check of requiredChecks) {
    const existing = rule.parameters.required_status_checks.filter(
      (entry) => entry.context === check.context
    );
    if (
      existing.length > 1 ||
      (existing.length && existing[0].integration_id !== check.integration_id)
    ) {
      throw new Error(`conflicting integration binding: ${check.context}`);
    }
    if (!existing.length) {
      rule.parameters.required_status_checks.push(structuredClone(check));
      additions.push(check.context);
    }
  }
  rule.parameters.strict_required_status_checks_policy = true;
  rule.parameters.do_not_enforce_on_create = false;
  if (!rules.length) payload.rules.push(rule);
  return {
    schemaVersion: 1,
    applied: false,
    requiresOwnerApproval: true,
    precondition: {
      rulesetId: snapshot.id,
      repository: snapshot.source,
      updatedAt: snapshot.updated_at,
      snapshotSha256: hash(snapshotState(snapshot)),
    },
    addedChecks: additions,
    warnings: [
      "Require live PASS and capacity validation before activation; this generator never calls GitHub.",
      ...(snapshot.bypass_actors.length
        ? ["Existing bypass actors are preserved and still require an owner decision."]
        : []),
      ...(snapshot.enforcement !== "active"
        ? ["Existing non-active enforcement is preserved; this proposal does not activate it."]
        : []),
    ],
    payload,
  };
}

export function verifyRulesetSnapshot(proposal, snapshot) {
  try {
    return (
      proposal?.schemaVersion === 1 &&
      proposal.precondition.rulesetId === snapshot.id &&
      proposal.precondition.repository === snapshot.source &&
      proposal.precondition.updatedAt === snapshot.updated_at &&
      proposal.precondition.snapshotSha256 === hash(snapshotState(snapshot))
    );
  } catch {
    return false;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    const [snapshotPath, policyPath, appId] = process.argv.slice(2);
    if (!snapshotPath || !policyPath || !appId || process.argv.length !== 5) {
      throw new Error(
        "usage: prepare-ruleset-admission.mjs snapshot.json admission-policy.json integration-id"
      );
    }
    const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8"));
    const policy = JSON.parse(readFileSync(policyPath, "utf8"));
    if (policy.schemaVersion !== 1 || !policy.profiles) throw new Error("invalid admission policy");
    const checks = Object.values(policy.profiles).map((profile) => ({
      context: profile.checkName,
      integration_id: Number(appId),
    }));
    console.log(JSON.stringify(prepareRulesetProposal(snapshot, checks), null, 2));
  } catch (error) {
    console.error(`[ruleset-proposal] ${error.message}`);
    process.exitCode = 1;
  }
}
