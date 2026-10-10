#!/usr/bin/env node
import { readFileSync, realpathSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { classifyDomains } from "./classify-pr-changes.mjs";
import { readManifest } from "./gate-manifest.mjs";
import { selectShadowGates, SHADOW_GATE_DEPENDENCIES } from "./shadow-gate-policy.mjs";

function requestSource(args) {
  if (args.length > 1) throw new Error("Expected at most one workspace-relative JSON input file.");
  const argument = args[0];
  if (!argument || argument === "-") return 0;
  if (isAbsolute(argument)) throw new Error("Input file must be workspace-relative.");
  const root = realpathSync(process.cwd());
  const filename = realpathSync(resolve(root, argument));
  const local = relative(root, filename);
  if (local === ".." || local.startsWith(`..${sep}`) || isAbsolute(local)) {
    throw new Error("Input file escapes the workspace.");
  }
  return filename;
}

function classifyRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return { classificationFailed: true };
  }
  if (
    Object.keys(request).some(
      (key) => !["domains", "files", "runAll", "classificationFailed"].includes(key)
    )
  ) {
    return { classificationFailed: true };
  }
  const hasFiles = Object.hasOwn(request, "files");
  const hasDomains = Object.hasOwn(request, "domains");
  const flags = { runAll: request.runAll, classificationFailed: request.classificationFailed };
  if (hasFiles && hasDomains) return { ...flags, classificationFailed: true };
  if (!hasFiles) return { ...flags, domains: request.domains };
  if (
    !Array.isArray(request.files) ||
    request.files.some(
      (file) =>
        typeof file !== "string" ||
        !file.trim() ||
        isAbsolute(file) ||
        file.replace(/\\/g, "/").split("/").includes("..")
    )
  ) {
    return { ...flags, classificationFailed: true };
  }
  return { ...flags, domains: classifyDomains(request.files) };
}

function readRequest(source) {
  try {
    return classifyRequest(JSON.parse(readFileSync(source, "utf8")));
  } catch {
    return { classificationFailed: true };
  }
}

// Stage 3A only. JSON input has either domains (CSV/array) or files (paths already
// extracted by the caller), plus optional boolean runAll/classificationFailed.
// Exit 0: plan, 2: full fallback with diagnostics, 1: invalid metadata/CLI usage.
// No Git, gates, workflow execution, candidate admission or success receipts.
function main() {
  try {
    readManifest();
    const policy = JSON.parse(readFileSync("config/quality/admission-policy.json", "utf8"));
    const request = readRequest(requestSource(process.argv.slice(2)));
    const plan = selectShadowGates({ policy, ...request, dependencies: SHADOW_GATE_DEPENDENCIES });
    console.log(JSON.stringify(plan, null, 2));
    process.exitCode = plan.status === "fallback" ? 2 : 0;
  } catch {
    console.log(
      JSON.stringify(
        {
          schemaVersion: 1,
          kind: "shadow-gate-plan",
          status: "error",
          diagnostics: [
            "Invalid policy/dependency metadata or CLI input path. No plan produced; validate the gate manifest and input file.",
          ],
        },
        null,
        2
      )
    );
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
