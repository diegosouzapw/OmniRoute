import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, lstatSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { classifyPrTarget } from "../check/check-pr-self-target.mjs";
import { classifyDomains, classifyPaths } from "./classify-pr-changes.mjs";
import { readManifest } from "./gate-manifest.mjs";
import { selectImpacted } from "./select-impacted-tests.mjs";
import { selectShadowGates, SHADOW_GATE_DEPENDENCIES } from "./shadow-gate-policy.mjs";

// Bootstrap data boundary for the non-admitting shadow pilot.
export function parseNameStatus(buffer) {
  if (buffer.byteLength > 4 * 1024 * 1024) throw new Error("Oversized Git diff.");
  const text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  if (!text) return [];
  if (!text.endsWith("\0")) throw new Error("Truncated Git diff.");
  const records = text.slice(0, -1).split("\0");
  const paths = new Set();
  for (let index = 0; index < records.length;) {
    const status = records[index++];
    if (!/^(?:[AMDT]|[RC]\d{1,3})$/.test(status)) throw new Error("Invalid Git diff status.");
    const count = /^[RC]/.test(status) ? 2 : 1;
    for (let part = 0; part < count; part++) {
      const path = records[index++];
      if (!path || /[\r\n]/.test(path) || path.startsWith("/") || path.split("/").includes("..")) {
        throw new Error("Invalid or truncated Git diff path.");
      }
      paths.add(path);
    }
  }
  return [...paths].sort();
}

export const digest = (value) => createHash("sha256").update(value).digest("hex");
const readJson = (root, file) => JSON.parse(readFileSync(resolve(root, file), "utf8"));
const git = (root, args) =>
  execFileSync("git", args, {
    cwd: root,
    maxBuffer: 4 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });

const CONTEXT_KEYS = [
  "repository",
  "headRepository",
  "eventName",
  "number",
  "runId",
  "runAttempt",
  "baseSha",
  "headSha",
  "candidateSha",
  "workflowSourceSha",
  "baseRef",
  "headRef",
  "draft",
  "prBody",
];
// Defensive pilot-schema limits, deliberately broader than current GitHub IDs:
// repository segments <=256 characters; positive execution IDs <=32 digits.
const REPOSITORY = /^[A-Za-z0-9_.-]{1,256}\/[A-Za-z0-9_.-]{1,256}$/;
const RUN_ID = /^[1-9]\d{0,31}$/;
const SHA = /^[a-f0-9]{40}$/;
const RECORD = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
export const CONTROL_FILES = [
  "package.json",
  "config/quality/gate-manifest.json",
  "config/quality/admission-policy.json",
  "scripts/quality/classify-pr-changes.mjs",
  "scripts/quality/gate-manifest.mjs",
  "scripts/quality/select-impacted-tests.mjs",
  "scripts/quality/shadow-gate-policy.mjs",
  "scripts/quality/shadow-policy-bootstrap.mjs",
  "scripts/quality/shadow-policy-receipt.mjs",
  "scripts/check/check-pr-self-target.mjs",
  ".github/workflows/pr-policy-shadow.yml",
  ".github/workflows/pr-policy-shadow-reusable.yml",
];

const CANDIDATE_FILES = [
  "package.json",
  "package-lock.json",
  "config/ci/toolchain.json",
  ".github/actions/npm-ci-retry/action.yml",
  ".github/workflows/ci.yml",
  ".github/workflows/quality.yml",
];

function validateContext(context) {
  if (!RECORD(context) || Object.keys(context).some((key) => !CONTEXT_KEYS.includes(key)))
    throw new Error("Invalid shadow context fields.");
  if (
    context.eventName !== "pull_request" ||
    !Number.isSafeInteger(context.number) ||
    context.number < 1 ||
    typeof context.draft !== "boolean"
  )
    throw new Error("Invalid shadow context event.");
  for (const key of ["baseSha", "headSha", "candidateSha", "workflowSourceSha"]) {
    if (typeof context[key] !== "string" || !SHA.test(context[key]))
      throw new Error("Invalid shadow context OID.");
  }
  for (const key of ["repository", "headRepository"]) {
    if (
      typeof context[key] !== "string" ||
      !REPOSITORY.test(context[key]) ||
      context[key].includes("..")
    )
      throw new Error("Invalid shadow context repository.");
  }
  for (const key of ["runId", "runAttempt"]) {
    if (typeof context[key] !== "string" || !RUN_ID.test(context[key]))
      throw new Error("Invalid shadow context run identity.");
  }
  for (const key of ["baseRef", "headRef"]) {
    if (typeof context[key] !== "string" || !context[key] || /[\x00-\x1f\x7f]/.test(context[key]))
      throw new Error("Invalid shadow context ref.");
  }
  if (typeof context.prBody !== "string" || context.prBody.length > 1024 * 1024)
    throw new Error("Invalid shadow context PR body.");
  if (
    context.repository.toLowerCase() === context.headRepository.toLowerCase() &&
    classifyPrTarget(context).verdict === "self-targeting"
  )
    throw new Error("Invalid self-targeting PR context.");
}

function checkCheckout(root, context) {
  const checkedOutSha = git(root, ["rev-parse", "HEAD"]).toString().trim();
  if (checkedOutSha !== context.candidateSha)
    throw new Error("Shadow checkout/candidate identity mismatch.");
  for (const sha of [context.baseSha, context.headSha, context.workflowSourceSha])
    git(root, ["cat-file", "-e", `${sha}^{commit}`]);
  try {
    git(root, ["diff", "--quiet", "HEAD", "--"]);
  } catch {
    throw new Error("Shadow tracked checkout changed.");
  }
  return checkedOutSha;
}

function identityFor(context, checkedOutSha) {
  const { prBody, ...identity } = context;
  return { ...identity, checkedOutSha, prBodySha256: digest(prBody) };
}

function sourceHashes(root, files = CONTROL_FILES) {
  return Object.fromEntries(files.map((file) => [file, digest(readFileSync(resolve(root, file)))]));
}

function impactSelection(root, files) {
  const map = readJson(root, "config/quality/test-impact-map.json");
  if (
    !RECORD(map?.sources) ||
    Object.values(map.sources).some(
      (hits) => !Array.isArray(hits) || hits.some((hit) => typeof hit !== "string" || !hit)
    )
  )
    throw new Error("Invalid TIA map.");
  return selectImpacted({ changed: files, map });
}

export function createShadowPlan({ root, sourceRoot, context, runAll = false }) {
  validateContext(context);
  if (typeof runAll !== "boolean") throw new Error("Invalid shadow context runAll.");
  const checkedOutSha = checkCheckout(root, context);
  readManifest(sourceRoot);
  const policy = readJson(sourceRoot, "config/quality/admission-policy.json");
  const diagnostics = [];
  let files = [];
  const diffs = { head: null, candidate: null };
  try {
    for (const [kind, target] of [
      ["head", context.headSha],
      ["candidate", context.candidateSha],
    ]) {
      diffs[kind] = parseNameStatus(
        git(root, ["diff", "--name-status", "-z", "-M", context.baseSha, target, "--"])
      );
    }
    files = [...new Set([...diffs.head, ...diffs.candidate])].sort();
  } catch {
    diagnostics.push("Git diff unavailable or malformed; selecting every gate.");
  }
  let impacted = [];
  try {
    impacted = impactSelection(root, files);
  } catch {
    diagnostics.push("TIA map unavailable or malformed; selecting every gate.");
  }
  const identity = identityFor(context, checkedOutSha);
  const selection = selectShadowGates({
    policy,
    domains: classifyDomains(files),
    dependencies: SHADOW_GATE_DEPENDENCIES,
    runAll: runAll || impacted.includes("__RUN_ALL__"),
    classificationFailed: diagnostics.length > 0 || files.length === 0,
  });
  const legacyFlags = classifyPaths(files);
  const execution = Object.fromEntries(
    selection.gates.map((gate) => [gate.id, executionRule(gate, context, legacyFlags)])
  );
  const plan = {
    schemaVersion: 1,
    kind: "shadow-pilot-plan",
    identity,
    sourceHashes: sourceHashes(sourceRoot),
    candidateHashes: sourceHashes(root, CANDIDATE_FILES),
    files,
    diffs,
    legacyFlags,
    diagnostics,
    selection,
    execution,
  };
  return { ...plan, planSha256: digest(JSON.stringify(plan)) };
}

export function verifyShadowPlan(plan, { root, sourceRoot, expectedPlanHash, context }) {
  const { planSha256, ...payload } = plan;
  if (
    !/^[a-f0-9]{64}$/.test(expectedPlanHash ?? "") ||
    planSha256 !== expectedPlanHash ||
    digest(JSON.stringify(payload)) !== planSha256
  )
    throw new Error("Shadow plan hash mismatch.");
  validateContext(context);
  const identity = identityFor(context, checkCheckout(root, context));
  if (JSON.stringify(identity) !== JSON.stringify(plan.identity))
    throw new Error("Shadow run identity mismatch.");
  if (JSON.stringify(sourceHashes(sourceRoot)) !== JSON.stringify(plan.sourceHashes))
    throw new Error("Shadow control source changed.");
  if (JSON.stringify(sourceHashes(root, CANDIDATE_FILES)) !== JSON.stringify(plan.candidateHashes))
    throw new Error("Shadow candidate sources changed.");
  return plan;
}

export const PILOT_IDS = [
  "ci:docs-sync-strict",
  "ci:docs-lint",
  "ci:i18n-ui-coverage",
  "ci:i18n-glossary-zhcn",
  "ci:i18n",
  "ci:pr-test-policy",
  "quality:docs-gates",
  "quality:merge-integrity",
];

export const groupKey = (id) => id.replaceAll(":", "_").replaceAll("-", "_");
function executionRule(gate, context, flags) {
  const bootstrap = ["ci:changes", "quality:changes"].includes(gate.id);
  const eligible =
    bootstrap ||
    !context.draft ||
    (gate.id.startsWith("quality:") && context.headRef.startsWith("mergify/merge-queue/"));
  const legacyCondition = {
    always: true,
    pr: true,
    docs: flags.docs,
    i18n: flags.i18n,
    "code-or-docs": flags.code || flags.docs,
    "code-or-i18n": flags.code || flags.i18n,
  };
  return {
    implemented: bootstrap || PILOT_IDS.includes(gate.id),
    eligible,
    eligibilityReason: eligible ? "event-eligible" : "draft",
    legacyWouldRun: Object.hasOwn(legacyCondition, gate.when)
      ? eligible && legacyCondition[gate.when]
      : null,
  };
}

export function contextFromEnvironment(env = process.env) {
  const event = readBoundedJson(env.GITHUB_EVENT_PATH);
  const pr = event.pull_request;
  const context = {
    repository: env.GITHUB_REPOSITORY,
    headRepository: pr?.head?.repo?.full_name,
    eventName: env.GITHUB_EVENT_NAME,
    number: pr?.number,
    runId: env.GITHUB_RUN_ID,
    runAttempt: env.GITHUB_RUN_ATTEMPT,
    baseSha: pr?.base?.sha,
    headSha: pr?.head?.sha,
    candidateSha: env.GITHUB_SHA,
    workflowSourceSha: env.SHADOW_WORKFLOW_SHA,
    baseRef: pr?.base?.ref,
    headRef: pr?.head?.ref,
    draft: pr?.draft,
    prBody: pr?.body ?? "",
  };
  validateContext(context);
  if (event.repository?.full_name !== context.repository)
    throw new Error("Shadow event repository identity mismatch.");
  return context;
}

export function stateDirectory(env = process.env) {
  const parent = realpathSync(env.RUNNER_TEMP || env.TMPDIR);
  if (!isAbsolute(env.SHADOW_STATE_DIR ?? ""))
    throw new Error("Shadow state directory must be absolute.");
  const path = realpathSync(env.SHADOW_STATE_DIR);
  const local = relative(parent, path);
  if (!local || local === ".." || local.startsWith(`..${sep}`) || isAbsolute(local))
    throw new Error("Shadow state directory escapes its private temporary root.");
  return path;
}

export function readBoundedJson(path) {
  const stat = lstatSync(path);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 4 * 1024 * 1024)
    throw new Error("Invalid shadow JSON file.");
  return JSON.parse(readFileSync(path, "utf8"));
}

export function runtimePlan(env = process.env) {
  const plan = readBoundedJson(resolve(stateDirectory(env), "plan.json"));
  return verifyShadowPlan(plan, {
    root: process.cwd(),
    sourceRoot: resolve(dirname(fileURLToPath(import.meta.url)), "../.."),
    expectedPlanHash: env.SHADOW_PLAN_HASH,
    context: contextFromEnvironment(env),
  });
}

function main() {
  try {
    const [mode, extra] = process.argv.slice(2);
    if (extra || !["plan", "verify"].includes(mode))
      throw new Error("Invalid shadow bootstrap mode.");
    if (mode === "verify") {
      runtimePlan();
      return;
    }
    if (!["true", "false"].includes(process.env.SHADOW_RUN_ALL))
      throw new Error("Invalid shadow run-all input.");
    const plan = createShadowPlan({
      root: process.cwd(),
      sourceRoot: resolve(dirname(fileURLToPath(import.meta.url)), "../.."),
      context: contextFromEnvironment(),
      runAll: process.env.SHADOW_RUN_ALL === "true",
    });
    writeFileSync(resolve(stateDirectory(), "plan.json"), JSON.stringify(plan, null, 2) + "\n", {
      flag: "wx",
    });
    const outputs = [
      `plan_hash=${plan.planSha256}`,
      ...PILOT_IDS.map(
        (id) =>
          `${groupKey(id)}=${plan.selection.selectedIds.includes(id) && plan.execution[id].eligible}`
      ),
    ];
    if (process.env.GITHUB_OUTPUT)
      appendFileSync(process.env.GITHUB_OUTPUT, outputs.join("\n") + "\n");
    console.log(
      JSON.stringify({
        kind: plan.kind,
        selectionStatus: plan.selection.status,
        selected: plan.selection.selectedIds.length,
        implementedGroups: PILOT_IDS.length,
      })
    );
  } catch {
    console.error(
      "Shadow bootstrap rejected invalid context, identity, metadata or state. No admission result."
    );
    process.exitCode = 1;
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
