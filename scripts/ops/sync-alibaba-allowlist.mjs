#!/usr/bin/env node
/**
 * @file sync-alibaba-allowlist.mjs
 * @description Build config/alibaba-free-tier-allowlist.json from Bailian console quota JSON exports.
 *
 * Usage:
 *   node --import tsx/esm scripts/ops/sync-alibaba-allowlist.mjs path/to/quota.json [...]
 *   node --import tsx/esm scripts/ops/sync-alibaba-allowlist.mjs --from-samples
 *
 * Writes:
 *   - config/alibaba-free-tier-allowlist.json (repo baseline)
 *   - ~/.omniroute/alibaba-free-tier-allowlist.json when DATA_DIR unset
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  classifyAlibabaFreeTierQuotaEntries,
  parseAlibabaFreeTierQuotaEntries,
} from "../../open-sse/services/alibabaFreeTierQuotaFetcher.ts";
import { isDashscopeTextModelId } from "../../open-sse/services/dashscopeTextModels.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

const SAMPLE_FILES = [
  "scripts/ops/alibabafreeaudio-quota.sample.json",
  "scripts/ops/alibabafreemultimodal-quota.sample.json",
  "scripts/ops/alibabafreevision-quota.sample.json",
].map((relativePath) => path.join(repoRoot, relativePath));

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function collectInputs(argv) {
  if (argv.includes("--from-samples")) {
    return SAMPLE_FILES.filter((filePath) => fs.existsSync(filePath));
  }
  return argv.filter((arg) => !arg.startsWith("-"));
}

function classifyTextEntries(allEntries) {
  const capable = new Set();
  const noFreeTier = new Set();

  for (const entry of allEntries) {
    if (!isDashscopeTextModelId(entry.model)) continue;
    const classified = classifyAlibabaFreeTierQuotaEntries([entry], { textOnly: true });
    for (const modelId of classified.capableModels) capable.add(modelId);
    for (const modelId of classified.noFreeTierModels) noFreeTier.add(modelId);
  }

  return {
    capable: [...capable].sort(),
    noFreeTier: [...noFreeTier].sort(),
  };
}

function main() {
  const inputs = collectInputs(process.argv.slice(2));
  if (inputs.length === 0) {
    console.error("Usage: sync-alibaba-allowlist.mjs <quota.json> [...] | --from-samples");
    process.exit(1);
  }

  const allEntries = [];
  for (const inputPath of inputs) {
    const payload = readJsonFile(inputPath);
    allEntries.push(...parseAlibabaFreeTierQuotaEntries(payload));
  }

  const { capable, noFreeTier } = classifyTextEntries(allEntries);
  if (capable.length === 0) {
    console.error("No text free-tier models found in input payloads.");
    process.exit(1);
  }

  const asOf = new Date().toISOString().slice(0, 10);
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const pack = { asOf, validUntil, capable, noFreeTier };
  const serialized = `${JSON.stringify(pack, null, 2)}\n`;

  const configPath = path.join(repoRoot, "config", "alibaba-free-tier-allowlist.json");
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, serialized);

  const dataDir = process.env.DATA_DIR?.trim() || path.join(os.homedir(), ".omniroute");
  const runtimePath = path.join(dataDir, "alibaba-free-tier-allowlist.json");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(runtimePath, serialized);

  console.log(`Wrote ${capable.length} capable + ${noFreeTier.length} blocked models`);
  console.log(`  config: ${configPath}`);
  console.log(`  runtime: ${runtimePath}`);
  console.log(`  validUntil: ${validUntil}`);
}

main();
