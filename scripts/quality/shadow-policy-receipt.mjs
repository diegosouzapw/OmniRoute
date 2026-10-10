import {
  lstatSync,
  readdirSync,
  writeFileSync,
  appendFileSync,
  mkdirSync,
  openSync,
  fstatSync,
  readFileSync,
  closeSync,
  constants,
} from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  PILOT_IDS,
  groupKey,
  runtimePlan,
  stateDirectory,
  readBoundedJson,
  digest,
} from "./shadow-policy-bootstrap.mjs";

import { SHADOW_GATE_DEPENDENCIES } from "./shadow-gate-policy.mjs";

const OUTCOMES = new Set(["success", "failure", "cancelled", "skipped"]);
const RECEIPT_KEYS = new Set([
  "schemaVersion",
  "kind",
  "identity",
  "planSha256",
  "groupId",
  "instanceId",
  "outcome",
  "conclusion",
  "steps",
  "observed",
]);
const record = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function validatePlanMetadata(plan) {
  const gates = plan?.selection?.gates;
  if (
    plan?.schemaVersion !== 1 ||
    plan.kind !== "shadow-pilot-plan" ||
    !record(plan.identity) ||
    !/^[a-f0-9]{64}$/.test(plan.planSha256) ||
    !Array.isArray(gates) ||
    gates.length !== Object.keys(SHADOW_GATE_DEPENDENCIES).length ||
    !record(plan.execution)
  )
    throw new Error("Invalid shadow plan metadata.");
  const ids = new Set();
  for (const gate of gates) {
    if (
      !record(gate) ||
      !Object.hasOwn(SHADOW_GATE_DEPENDENCIES, gate.id) ||
      ids.has(gate.id) ||
      typeof gate.selected !== "boolean" ||
      !["required", "advisory"].includes(gate.disposition)
    )
      throw new Error("Invalid shadow plan gate metadata.");
    ids.add(gate.id);
  }
}

function validateStep(step) {
  if (
    !record(step) ||
    !OUTCOMES.has(step.outcome) ||
    !OUTCOMES.has(step.conclusion) ||
    Object.keys(step).some(
      (key) => !["outcome", "conclusion", "exitCode", "rawResult"].includes(key)
    )
  )
    throw new Error("Invalid shadow receipt step.");
  if (
    step.exitCode !== undefined &&
    step.exitCode !== null &&
    (!Number.isInteger(step.exitCode) || step.exitCode < 0 || step.exitCode > 255)
  )
    throw new Error("Invalid shadow receipt step exit.");
  if (step.rawResult !== undefined && !["observed", "unobservable"].includes(step.rawResult))
    throw new Error("Invalid shadow receipt step raw result.");
}

// Pilot observation schema allows up to 10 digits per Node version component.
function validateObserved(observed) {
  if (observed === undefined) return;
  if (
    !record(observed) ||
    Object.keys(observed).sort().join(",") !==
      "finalJobConclusion,jobStatusAtReceipt,nodeVersion,recordedAt" ||
    typeof observed.nodeVersion !== "string" ||
    !/^v\d{1,10}\.\d{1,10}\.\d{1,10}$/.test(observed.nodeVersion) ||
    typeof observed.recordedAt !== "string" ||
    !Number.isFinite(Date.parse(observed.recordedAt)) ||
    !OUTCOMES.has(observed.jobStatusAtReceipt) ||
    observed.finalJobConclusion !== "not-yet-available"
  )
    throw new Error("Invalid shadow receipt observation.");
}

function validateReceipt(plan, receipt) {
  if (
    !record(receipt) ||
    Object.keys(receipt).some((key) => !RECEIPT_KEYS.has(key)) ||
    receipt.schemaVersion !== 1 ||
    receipt.kind !== "shadow-pilot-receipt"
  )
    throw new Error("Invalid shadow receipt schema.");
  if (
    JSON.stringify(receipt.identity) !== JSON.stringify(plan.identity) ||
    receipt.planSha256 !== plan.planSha256
  )
    throw new Error("Shadow receipt identity mismatch.");
  const gate = plan.selection.gates.find((entry) => entry.id === receipt.groupId);
  if (
    !gate?.selected ||
    !PILOT_IDS.includes(receipt.groupId) ||
    plan.execution[receipt.groupId]?.eligible !== true ||
    receipt.instanceId !== "single"
  )
    throw new Error("Unexpected or unselected shadow receipt.");
  if (
    !OUTCOMES.has(receipt.outcome) ||
    (receipt.conclusion !== null && !OUTCOMES.has(receipt.conclusion)) ||
    !record(receipt.steps) ||
    !Object.keys(receipt.steps).length
  )
    throw new Error("Invalid shadow receipt outcome.");
  for (let index = 0; index < GATE_COUNTS[receipt.groupId]; index++) {
    if (!receipt.steps[`gate_${index}`])
      throw new Error("Missing original gate step in shadow receipt.");
  }
  validateObserved(receipt.observed);
  for (const step of Object.values(receipt.steps)) {
    validateStep(step);
    if (
      receipt.outcome === "success" &&
      (step.outcome !== "success" ||
        (step.exitCode !== undefined && step.exitCode !== null && step.exitCode !== 0))
    )
      throw new Error("Contradictory shadow receipt outcome.");
  }
}

function gateResult(gate, plan, receipts, jobResults) {
  if (!gate.selected) return { ...gate, state: "not_selected" };
  if (["ci:changes", "quality:changes"].includes(gate.id)) {
    const jobConclusion = jobResults.bootstrap?.result ?? null;
    const state =
      { success: "succeeded", failure: "failed", cancelled: "cancelled", skipped: "blocked" }[
        jobConclusion
      ] || "missing";
    return { ...gate, state, physicalExecution: "bootstrap", jobConclusion };
  }
  if (!PILOT_IDS.includes(gate.id)) return { ...gate, state: "not_implemented" };
  if (plan.execution[gate.id]?.eligible === false) return { ...gate, state: "ineligible" };
  const receipt = receipts.find((entry) => entry.groupId === gate.id);
  if (!receipt) return { ...gate, state: "missing" };
  const state = {
    success: "succeeded",
    failure: "failed",
    cancelled: "cancelled",
    skipped: "blocked",
  }[receipt.outcome];
  const jobConclusion = jobResults[groupKey(gate.id)]?.result ?? null;
  const finalState =
    { failure: "failed", cancelled: "cancelled", skipped: "blocked" }[jobConclusion] ||
    (state === "succeeded" && jobConclusion !== "success" ? "missing" : state);
  return { ...gate, state: finalState, receipt, jobConclusion };
}

// Collection is diagnostic only; it never grants candidate admission.
export function collectShadowReceipts(plan, receipts, jobResults = {}) {
  validatePlanMetadata(plan);
  if (!Array.isArray(receipts) || receipts.length > PILOT_IDS.length)
    throw new Error("Invalid shadow receipts size.");
  const seen = new Set();
  for (const receipt of receipts) {
    validateReceipt(plan, receipt);
    if (seen.has(receipt.groupId)) throw new Error("Duplicate shadow receipt.");
    seen.add(receipt.groupId);
  }
  validateJobResults(jobResults);
  const gates = plan.selection.gates.map((gate) => gateResult(gate, plan, receipts, jobResults));
  const incomplete = gates.some(
    (gate) => gate.selected && gate.disposition === "required" && gate.state !== "succeeded"
  );
  return {
    schemaVersion: 1,
    kind: "shadow-pilot-report",
    identity: plan.identity,
    planSha256: plan.planSha256,
    status: incomplete ? "SHADOW_INCOMPLETE" : "COLLECTED",
    exitCode: incomplete ? 2 : 0,
    physicalBootstrapExecutions: 1,
    execution: plan.execution,
    observationLimits: [
      "Receipt timestamps are not execution durations.",
      "Artifact digests and complete runtime/action versions are not observed by this local collector.",
      "The six comparison metrics are reserved for stage 4A.",
    ],
    gates,
  };
}

const GATE_COUNTS = {
  "ci:docs-sync-strict": 6,
  "ci:docs-lint": 2,
  "ci:i18n-ui-coverage": 7,
  "ci:i18n-glossary-zhcn": 2,
  "ci:i18n": 1,
  "ci:pr-test-policy": 5,
  "quality:docs-gates": 2,
  "quality:merge-integrity": 2,
};

function validateJobResults(results) {
  const known = new Set(["bootstrap", ...PILOT_IDS.map(groupKey)]);
  if (
    !record(results) ||
    Object.entries(results).some(
      ([key, value]) => !known.has(key) || !record(value) || !OUTCOMES.has(value.result)
    )
  )
    throw new Error("Invalid shadow job results.");
}

export function createShadowReceipt(plan, { groupId, steps, jobStatus }) {
  if (!PILOT_IDS.includes(groupId) || !record(steps) || !OUTCOMES.has(jobStatus))
    throw new Error("Invalid shadow receipt input.");
  for (let index = 0; index < GATE_COUNTS[groupId]; index++) {
    if (!steps[`gate_${index}`]) throw new Error("Missing original gate step in shadow receipt.");
  }
  const normalized = Object.fromEntries(
    Object.entries(steps).map(([id, step]) => {
      if (!record(step) || !OUTCOMES.has(step.outcome) || !OUTCOMES.has(step.conclusion))
        throw new Error("Invalid shadow step outcome.");
      const raw = step.outputs?.raw_exit;
      if (raw !== undefined && (!/^\d{1,3}$/.test(raw) || Number(raw) > 255))
        throw new Error("Invalid shadow raw exit.");
      return [
        id,
        {
          outcome: step.outcome,
          conclusion: step.conclusion,
          exitCode: raw === undefined ? null : Number(raw),
          rawResult: raw === undefined ? "unobservable" : "observed",
        },
      ];
    })
  );
  const values = Object.values(normalized);
  let outcome = jobStatus;
  if (
    values.some(
      (step) => step.outcome === "failure" || (step.exitCode !== null && step.exitCode !== 0)
    )
  )
    outcome = "failure";
  else if (values.some((step) => step.outcome === "cancelled")) outcome = "cancelled";
  else if (values.some((step) => step.outcome === "skipped")) outcome = "skipped";
  const receipt = {
    schemaVersion: 1,
    kind: "shadow-pilot-receipt",
    identity: plan.identity,
    planSha256: plan.planSha256,
    groupId,
    instanceId: "single",
    outcome,
    conclusion: null,
    steps: normalized,
    observed: {
      nodeVersion: process.version,
      recordedAt: new Date().toISOString(),
      jobStatusAtReceipt: jobStatus,
      finalJobConclusion: "not-yet-available",
    },
  };
  validateReceipt(plan, receipt);
  return receipt;
}

export function readReceiptArtifacts(directory, plan) {
  let entries;
  try {
    const stat = lstatSync(directory);
    if (!stat.isDirectory() || stat.isSymbolicLink())
      throw new Error("Invalid shadow artifact root directory.");
    entries = readdirSync(directory);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  if (entries.length > PILOT_IDS.length) throw new Error("Too many shadow receipt artifacts.");
  const prefix = `shadow-receipt-${plan.identity.runId}-${plan.identity.runAttempt}-${plan.identity.candidateSha}-`;
  const known = new Set(PILOT_IDS.map((id) => prefix + groupKey(id)));
  return entries.map((name) => {
    const path = resolve(directory, name);
    const stat = lstatSync(path);
    if (
      !known.has(name) ||
      !stat.isDirectory() ||
      stat.isSymbolicLink() ||
      readdirSync(path).join(",") !== "receipt.json"
    )
      throw new Error("Invalid shadow receipt artifact directory.");
    const receipt = readBoundedJson(resolve(path, "receipt.json"));
    if (name !== prefix + groupKey(receipt.groupId))
      throw new Error("Shadow receipt artifact identity mismatch.");
    return receipt;
  });
}

// Only original outputs of these two gates are eligible for detail artifacts.
// Bound each regular file to 4 MiB, the group to 64 MiB and 256 locale reports.
function detailFiles(groupId) {
  const directory = groupId === "ci:pr-test-policy" ? ".artifacts" : "i18n-results";
  let entries;
  try {
    const stat = lstatSync(directory);
    if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error("Invalid detail directory.");
    entries = readdirSync(directory);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const names =
    groupId === "ci:pr-test-policy"
      ? entries.filter((name) => name === "pr-test-policy.md")
      : entries.filter((name) => name.endsWith(".txt"));
  if (
    names.length > 256 ||
    (groupId === "ci:i18n" && names.some((name) => !/^[A-Za-z0-9_-]{1,64}\.txt$/.test(name)))
  )
    throw new Error("Invalid detail filenames.");
  return names.sort().map((name) => ({ name, path: resolve(directory, name) }));
}

function readDetailFile(path) {
  const fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const stat = fstatSync(fd);
    if (!stat.isFile() || stat.size > 4 * 1024 * 1024) throw new Error("Invalid detail file.");
    const bytes = readFileSync(fd);
    if (bytes.length > 4 * 1024 * 1024) throw new Error("Oversized detail file.");
    return bytes;
  } finally {
    closeSync(fd);
  }
}

function preserveDetails(plan, root, groupId) {
  if (
    !["ci:pr-test-policy", "ci:i18n"].includes(groupId) ||
    !plan.selection.selectedIds.includes(groupId) ||
    !plan.execution[groupId]?.eligible
  )
    throw new Error("Unexpected detail group.");
  const sources = detailFiles(groupId);
  const directory = resolve(root, "details");
  // Exclusive creation rejects pre-existing directories and symlink destinations.
  mkdirSync(directory, { mode: 0o700 });
  const files = [];
  let total = 0;
  for (const source of sources) {
    const bytes = readDetailFile(source.path);
    total += bytes.length;
    if (total > 64 * 1024 * 1024) throw new Error("Oversized detail group.");
    writeFileSync(resolve(directory, source.name), bytes, { flag: "wx", mode: 0o600 });
    files.push({ name: source.name, bytes: bytes.length, sha256: digest(bytes) });
  }
  const details = {
    schemaVersion: 1,
    kind: "shadow-pilot-details",
    identity: plan.identity,
    planSha256: plan.planSha256,
    groupId,
    status: files.length ? "available" : "missing",
    files,
  };
  writeFileSync(resolve(directory, "details.json"), JSON.stringify(details, null, 2) + "\n", {
    flag: "wx",
    mode: 0o600,
  });
}

function main() {
  try {
    const [mode, extra] = process.argv.slice(2);
    if (extra || !["write", "collect", "preserve"].includes(mode))
      throw new Error("Invalid shadow receipt mode.");
    const plan = runtimePlan();
    const root = stateDirectory();
    if (mode === "preserve") {
      preserveDetails(plan, root, process.env.SHADOW_GROUP);
      return;
    }
    if (mode === "write") {
      const receipt = createShadowReceipt(plan, {
        groupId: process.env.SHADOW_GROUP,
        steps: JSON.parse(process.env.SHADOW_STEPS || "null"),
        jobStatus: process.env.SHADOW_JOB_STATUS,
      });
      writeFileSync(resolve(root, "receipt.json"), JSON.stringify(receipt, null, 2) + "\n", {
        flag: "wx",
      });
      return;
    }
    const receipts = readReceiptArtifacts(resolve(root, "receipts"), plan);
    const report = collectShadowReceipts(
      plan,
      receipts,
      JSON.parse(process.env.SHADOW_NEEDS || "{}")
    );
    writeFileSync(resolve(root, "report.json"), JSON.stringify(report, null, 2) + "\n", {
      flag: "wx",
    });
    if (process.env.GITHUB_STEP_SUMMARY)
      appendFileSync(
        process.env.GITHUB_STEP_SUMMARY,
        `Shadow pilot: **${report.status}**. This report never grants admission.\n\n` +
          report.gates
            .map((gate) => `- ${gate.id}: ${gate.state} (${gate.disposition})`)
            .join("\n") +
          "\n"
      );
    console.log(
      JSON.stringify({ kind: report.kind, status: report.status, gates: report.gates.length })
    );
    process.exitCode = report.exitCode;
  } catch {
    console.error(
      "Shadow receipt rejected invalid identity, metadata or artifacts. No admission result."
    );
    process.exitCode = 1;
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
