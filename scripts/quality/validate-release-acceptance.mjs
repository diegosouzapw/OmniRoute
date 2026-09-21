#!/usr/bin/env node
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import { reduce } from "./release-acceptance/reduce.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function loadJson(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}

export function exitFor(verdict) {
  if (verdict === "VERIFIED") return 0;
  if (verdict === "FAILED") return 1;
  return 2;
}

export function reduceManifests(plan, manifests) {
  const records = [];
  for (const m of manifests) {
    if (Array.isArray(m.gates)) records.push(...m.gates);
    else records.push(m);
  }
  return reduce(plan, records);
}

export function validateReport(report, schema) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  return { ok: validate(report), errors: validate.errors };
}

function parseArgs(argv) {
  const out = { plan: null, manifests: null, out: join(ROOT, "release-acceptance-report.json") };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--plan") out.plan = argv[++i];
    else if (argv[i] === "--manifests") out.manifests = argv[++i];
    else if (argv[i] === "--out") out.out = argv[++i];
  }
  return out;
}

export async function main(argv = process.argv) {
  const args = parseArgs(argv);
  const plan = loadJson(args.plan);
  const schema = loadJson(join(ROOT, "config/quality/release-acceptance.schema.json"));
  const files = readdirSync(args.manifests)
    .filter((f) => f.endsWith(".json"))
    .map((f) => loadJson(join(args.manifests, f)));
  const reduced = reduceManifests(plan, files);
  const report = {
    schema_version: 1,
    identity: plan.identity,
    required_gates: plan.required_gates ?? [],
    gates: reduced.gates,
    evidence_errors: reduced.evidence_errors,
    verdict: reduced.verdict,
    artifact: plan.artifact ?? null,
  };
  const { ok, errors } = validateReport(report, schema);
  if (!ok) {
    if (report.verdict !== "FAILED") report.verdict = "UNVERIFIED";
    const gate =
      Array.isArray(plan.required_gates) && plan.required_gates.length > 0
        ? plan.required_gates[0]
        : { gate_id: "schema", suite_id: null, shard_index: null, shard_total: null };
    report.evidence_errors = [
      ...(report.evidence_errors ?? []),
      { code: "schema_invalid", gate, detail: JSON.stringify(errors) },
    ];
  }
  mkdirSync(dirname(args.out), { recursive: true });
  writeFileSync(args.out, JSON.stringify(report, null, 2) + "\n");
  return exitFor(report.verdict);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().then((code) => process.exit(code));
}
