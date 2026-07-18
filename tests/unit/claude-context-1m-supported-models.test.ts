import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

// ─── Parse CONTEXT_1M_SUPPORTED_MODELS from source (no module import needed) ───

function parseSupportedModels(): string[] {
  const src = fs.readFileSync(
    path.join(REPO_ROOT, "open-sse/services/claudeCodeCompatible.ts"),
    "utf8"
  );
  // Strip type annotations before matching to handle `const X: string[] = [...]`
  const match = src
    .replace(/:\s*\w+(\[\])?/, "")
    .match(/CONTEXT_1M_SUPPORTED_MODELS\s*=\s*\[([\s\S]*?)\]/);
  if (!match) throw new Error("CONTEXT_1M_SUPPORTED_MODELS not found in source");
  return match[1]
    .split(",")
    .map((s) => s.replace(/["'\s]/g, "").toLowerCase())
    .filter(Boolean);
}

// ─── Parse Claude models from provider registry (source-level) ───
// Uses brace-counting to isolate each model block within the models array,
// avoiding false matches on the provider-level id field.

function parseClaudeRegistryModels(): Array<{
  provider: string;
  modelId: string;
  contextLength: number;
}> {
  const registryDir = path.join(REPO_ROOT, "open-sse/config/providers/registry/claude");
  const results: Array<{
    provider: string;
    modelId: string;
    contextLength: number;
  }> = [];

  for (const file of fs.readdirSync(registryDir).filter((f) => f.endsWith(".ts"))) {
    const src = fs.readFileSync(path.join(registryDir, file), "utf8");

    // Extract provider id
    const providerIdMatch = src.match(/id:\s*["']([^"']+)["']/);
    const providerId = providerIdMatch?.[1] ?? file.replace(".ts", "");

    // Find the models array
    const modelsStart = src.indexOf("models:");
    if (modelsStart === -1) continue;
    const arrayStart = src.indexOf("[", modelsStart);
    if (arrayStart === -1) continue;

    // Extract individual model objects using brace counting.
    // Skips any non-model nested braces by requiring both id and contextLength
    // in the same brace-delimited block.
    let braceDepth = 0;
    let objStart = -1;
    const modelBlocks: string[] = [];
    for (let i = arrayStart; i < src.length; i++) {
      if (src[i] === "{") {
        if (braceDepth === 0) objStart = i;
        braceDepth++;
      } else if (src[i] === "}") {
        braceDepth--;
        if (braceDepth === 0 && objStart !== -1) {
          modelBlocks.push(src.slice(objStart, i + 1));
          objStart = -1;
        }
      } else if (src[i] === "]" && braceDepth === 0) {
        break;
      }
    }

    for (const block of modelBlocks) {
      const idMatch = block.match(/id:\s*["']([^"']+)["']/);
      const ctxMatch = block.match(/contextLength:\s*(\d+)/);
      if (idMatch && ctxMatch) {
        results.push({
          provider: providerId,
          modelId: idMatch[1].toLowerCase(),
          contextLength: parseInt(ctxMatch[1], 10),
        });
      }
    }
  }
  return results;
}

const CONTEXT_1M_THRESHOLD = 200_000;

function isModel1mSupported(modelId: string, supportedModels: string[]): boolean {
  const normalized = modelId.replace(/:.*$/, "").toLowerCase();
  return supportedModels.some((s) => normalized === s || normalized.startsWith(`${s}-`));
}

// ─── Sanity: parser must find at least one model ───

test("parser finds at least one Claude model in the registry", () => {
  const models = parseClaudeRegistryModels();
  assert.ok(
    models.length > 0,
    "parseClaudeRegistryModels returned 0 models — check that open-sse/config/providers/registry/claude/ exists and contains model definitions"
  );
});

// ─── Forward: every high-context Claude model must be in the allowlist ───

test("every Claude model with contextLength > 200K is in CONTEXT_1M_SUPPORTED_MODELS", () => {
  const supportedModels = parseSupportedModels();
  const claudeModels = parseClaudeRegistryModels();
  const violations: string[] = [];

  for (const m of claudeModels) {
    if (m.contextLength > CONTEXT_1M_THRESHOLD && !isModel1mSupported(m.modelId, supportedModels)) {
      violations.push(`${m.provider}/${m.modelId} (contextLength=${m.contextLength})`);
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Claude models with contextLength > 200K missing from CONTEXT_1M_SUPPORTED_MODELS.\n` +
      `Add the model prefix to the allowlist in claudeCodeCompatible.ts.\n` +
      `Violations:\n  ${violations.join("\n  ")}`
  );
});

// ─── Reverse: every allowlist entry must have a matching high-context model ───

test("every CONTEXT_1M_SUPPORTED_MODELS entry has a matching Claude model with contextLength > 200K", () => {
  const supportedModels = parseSupportedModels();
  const claudeModels = parseClaudeRegistryModels();
  const orphans: string[] = [];

  for (const supported of supportedModels) {
    const found = claudeModels.some(
      (m) =>
        m.contextLength > CONTEXT_1M_THRESHOLD &&
        (m.modelId === supported || m.modelId.startsWith(`${supported}-`))
    );
    if (!found) orphans.push(supported);
  }

  assert.deepEqual(
    orphans,
    [],
    `CONTEXT_1M_SUPPORTED_MODELS entries with no matching high-context Claude model.\n` +
      `Remove stale entries or check model id spelling.\n` +
      `Orphans:\n  ${orphans.join("\n  ")}`
  );
});
