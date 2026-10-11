import { gateKey, keyId, sameKey, STATUSES } from "./types.mjs";

export function classifyDependent(prereqStatus, dependentKey, prereqKey) {
  if (prereqStatus === "FAIL") {
    return { status: "FAIL", cause: prereqKey };
  }
  if (prereqStatus === "INFRA_ERROR") {
    return { status: "INFRA_ERROR", cause: prereqKey };
  }
  if (prereqStatus == null) {
    return {
      status: "INFRA_ERROR",
      cause: prereqKey,
      evidence_error: {
        code: "prerequisite_missing",
        gate: dependentKey,
        detail: `missing prerequisite ${prereqKey.gate_id}`,
      },
    };
  }
  if (prereqStatus === "SKIPPED") {
    return { status: "SKIPPED", cause: prereqKey };
  }
  return { status: "RUN", cause: null };
}

function requiredSet(plan) {
  return plan.required_gates ?? [];
}

function optionalSet(plan) {
  return plan.optional_gates ?? [];
}

function isRequired(plan, k) {
  return requiredSet(plan).some((r) => sameKey(r, k));
}

function copies(gates, k) {
  return gates.filter((g) => sameKey(gateKey(g), k));
}

function copiesByGateId(gates, gateId) {
  return gates.filter((g) => g.gate_id === gateId);
}

function uniqueKeys(keys) {
  const out = [];
  for (const k of keys) {
    if (!out.some((existing) => sameKey(existing, k))) out.push(k);
  }
  return out;
}

function keysForGateId(plan, gates, gateId) {
  return uniqueKeys([
    ...copiesByGateId(gates, gateId).map((g) => gateKey(g)),
    ...requiredSet(plan).filter((k) => k.gate_id === gateId),
    ...optionalSet(plan).filter((k) => k.gate_id === gateId),
  ]);
}

function statusOf(gates, k) {
  const list = copies(gates, k);
  if (list.length === 0) return null;
  if (list.some((g) => g.status === "INFRA_ERROR")) return "INFRA_ERROR";
  if (list.some((g) => g.status === "FAIL")) return "FAIL";
  if (list.some((g) => g.status === "SKIPPED")) return "SKIPPED";
  return list[0].status;
}

function statusOfGateId(gates, gateId) {
  const list = copiesByGateId(gates, gateId);
  if (list.length === 0) return null;
  if (list.some((g) => g.status === "INFRA_ERROR")) return "INFRA_ERROR";
  if (list.some((g) => g.status === "FAIL")) return "FAIL";
  if (list.some((g) => g.status === "SKIPPED")) return "SKIPPED";
  return list[0].status;
}

function pushEvidenceError(evidence_errors, err) {
  if (!err) return;
  const already = evidence_errors.some(
    (e) => e.code === err.code && e.detail === err.detail && e.gate?.gate_id === err.gate?.gate_id
  );
  if (!already) evidence_errors.push(err);
}

function patchDependent(gates, depKey, classified, prereqKey, evidence_errors, identity) {
  const matches = copies(gates, depKey);
  const reason =
    classified.status === "SKIPPED" ? `classified from ${prereqKey.gate_id}` : undefined;
  const exit_code = classified.status === "FAIL" ? 1 : 2;
  if (matches.length === 0) {
    gates.push({
      gate_id: depKey.gate_id,
      suite_id: depKey.suite_id,
      shard_index: depKey.shard_index,
      shard_total: depKey.shard_total,
      tested_sha: identity.tested_sha || "0".repeat(40),
      run_id: identity.run_id ?? "0",
      run_attempt: identity.run_attempt ?? 1,
      command_id: depKey.gate_id,
      gate_type: "artifact",
      status: classified.status,
      cause: classified.cause,
      reason,
      exit_code,
      duration_ms: 0,
      evidence: [],
    });
    if (classified.evidence_error) pushEvidenceError(evidence_errors, classified.evidence_error);
    return true;
  }
  let changed = false;
  for (const existing of matches) {
    if (
      existing.status === classified.status &&
      ((existing.cause == null && classified.cause == null) ||
        (existing.cause && classified.cause && sameKey(existing.cause, classified.cause)))
    ) {
      continue;
    }
    existing.status = classified.status;
    existing.cause = classified.cause;
    existing.exit_code = exit_code;
    if (classified.status === "SKIPPED" && !existing.reason) existing.reason = reason;
    changed = true;
  }
  if (changed && classified.evidence_error) {
    pushEvidenceError(evidence_errors, classified.evidence_error);
  }
  return changed;
}

function assertAcyclic(deps) {
  const visiting = new Set();
  const done = new Set();
  function walk(id) {
    if (done.has(id)) return;
    if (visiting.has(id)) throw new Error("cyclic prerequisite");
    visiting.add(id);
    if (Object.hasOwn(deps, id)) walk(deps[id]);
    visiting.delete(id);
    done.add(id);
  }
  for (const id of Object.keys(deps)) walk(id);
}

export function reduce(plan, records) {
  const deps = plan.dependencies ?? {};
  assertAcyclic(deps);
  for (const [depId, prereqId] of Object.entries(deps)) {
    const requiredDep = requiredSet(plan).some((k) => k.gate_id === depId);
    const optionalPrereq = optionalSet(plan).some((k) => k.gate_id === prereqId);
    if (requiredDep && optionalPrereq) {
      throw new Error("optional prerequisite");
    }
  }

  const gates = [];
  const evidence_errors = [];
  const identity = plan.identity ?? {};
  const validIdentity =
    /^[0-9a-f]{40}$/.test(identity.tested_sha ?? "") &&
    typeof identity.run_id === "string" &&
    identity.run_id.length > 0 &&
    Number.isInteger(identity.run_attempt) &&
    identity.run_attempt > 0;
  const seen = new Set();

  for (const rec of records) {
    const k = gateKey(rec);
    const copy = { ...rec, cause: rec.cause ?? null };
    const id = keyId(k);
    if (seen.has(id)) {
      pushEvidenceError(evidence_errors, {
        code: "duplicate_record",
        gate: k,
        detail: `multiple records for ${JSON.stringify(k)}`,
      });
    }
    seen.add(id);
    let invalid;
    if (
      !validIdentity ||
      ["tested_sha", "run_id", "run_attempt"].some((field) => copy[field] !== identity[field])
    ) {
      invalid = {
        code: "identity_mismatch",
        detail: "record does not belong to the planned SHA, run and attempt",
      };
    } else if (!STATUSES.includes(copy.status)) {
      invalid = {
        code: "invalid_status",
        detail: "record has no recognized terminal execution status",
      };
    } else if (
      (copy.status === "PASS" && copy.exit_code !== 0) ||
      (copy.status === "FAIL" && (!Number.isInteger(copy.exit_code) || copy.exit_code <= 0))
    ) {
      invalid = { code: "exit_mismatch", detail: "execution exit and reported status disagree" };
    }
    if (invalid) {
      pushEvidenceError(evidence_errors, { ...invalid, gate: k });
      copy.status = "INFRA_ERROR";
      copy.exit_code = 2;
    }
    if (copy.status === "SKIPPED" && isRequired(plan, k) && !copy.reason) {
      copy.reason = "required skipped";
    }
    gates.push(copy);
  }

  const edges = Object.entries(deps);
  let changed = true;
  let guard = edges.length + 1;
  while (changed && guard-- > 0) {
    changed = false;
    for (const [depId, prereqId] of edges) {
      const prereqKey = { gate_id: prereqId, suite_id: null, shard_index: null, shard_total: null };
      let depKeys = keysForGateId(plan, gates, depId);
      if (depKeys.length === 0) {
        depKeys = [{ gate_id: depId, suite_id: null, shard_index: null, shard_total: null }];
      }
      const prereqStatus = statusOfGateId(gates, prereqId);
      for (const depKey of depKeys) {
        const classified = classifyDependent(prereqStatus, depKey, prereqKey);
        if (classified.status === "RUN") continue;
        if (patchDependent(gates, depKey, classified, prereqKey, evidence_errors, identity)) {
          changed = true;
        }
      }
    }
  }

  for (const k of requiredSet(plan)) {
    const rec = gates.find((g) => sameKey(gateKey(g), k));
    if (!rec) {
      evidence_errors.push({
        code: "missing_record",
        gate: k,
        detail: `required gate ${k.gate_id} has no record`,
      });
    } else if (rec.status === "SKIPPED") {
      evidence_errors.push({
        code: "required_skipped",
        gate: k,
        detail: rec.reason ?? "required gate SKIPPED",
      });
    }
  }

  const required = requiredSet(plan);
  if (required.length === 0) {
    evidence_errors.push({
      code: "empty_required_set",
      gate: { gate_id: "schema", suite_id: null, shard_index: null, shard_total: null },
      detail: "required_gates is empty",
    });
  }

  let verdict = "VERIFIED";
  const hasFail = gates.some(
    (g) =>
      g.status === "FAIL" && isRequired(plan, gateKey(g)) && statusOf(gates, gateKey(g)) === "FAIL"
  );
  const hasUnverified =
    evidence_errors.length > 0 ||
    gates.some(
      (g) => isRequired(plan, gateKey(g)) && (g.status === "SKIPPED" || g.status === "INFRA_ERROR")
    );
  if (hasFail) verdict = "FAILED";
  else if (hasUnverified) verdict = "UNVERIFIED";
  else if (required.some((k) => !gates.some((g) => sameKey(gateKey(g), k)))) {
    verdict = "UNVERIFIED";
  }

  return { verdict, evidence_errors, gates };
}
