#!/usr/bin/env node
/**
 * Generates bin/cli/api-commands/<tag>.mjs from the OpenAPI spec.
 * Run: npm run build:cli-api
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const SPEC_PATH = process.env.OPENAPI_SPEC || join(ROOT, "docs/reference/openapi.yaml");
const OUT_DIR = join(ROOT, "bin/cli/api-commands");

// Operations already covered by hand-crafted commands — skip in generated output.
const IGNORED_OP_IDS = new Set([
  "createChatCompletion",
  "streamChatCompletion",
  "listModels",
  "getModel",
  "createEmbedding",
  "createImage",
  "createImageEdit",
  "createImageVariation",
  "createTranscription",
  "createSpeech",
  "createModeration",
]);

function kebab(s) {
  return s
    .replace(/([A-Z])/g, (m) => "-" + m.toLowerCase())
    .replace(/^-/, "")
    .replace(/_/g, "-")
    .replace(/--+/g, "-");
}

function camelCase(s) {
  return s.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
}

function escapeStr(s) {
  return String(s || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .slice(0, 150);
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const spec = yaml.load(readFileSync(SPEC_PATH, "utf8"));

/** @type {Record<string, Array<{path: string, method: string, opId: string, op: object}>>} */
const byTag = {};

for (const [path, methods] of Object.entries(spec.paths || {})) {
  for (const [method, op] of Object.entries(methods)) {
    if (["parameters", "summary", "description", "servers"].includes(method)) continue;
    if (typeof op !== "object" || op === null) continue;
    if (IGNORED_OP_IDS.has(op.operationId)) continue;

    const rawTag = op.tags?.[0] || "uncategorized";
    const tag = rawTag
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const opId = op.operationId || `${method}-${path.replace(/[^a-z0-9]/gi, "-")}`;

    byTag[tag] = byTag[tag] || [];
    byTag[tag].push({ path, method, opId, op });
  }
}

const generatedTags = [];

for (const [tag, ops] of Object.entries(byTag)) {
  const fnName = `register_${tag.replace(/-/g, "_")}`;
  const lines = [
    `// AUTO-GENERATED from ${SPEC_PATH.replace(ROOT + "/", "")}. Do not edit.`,
    `import { apiFetch } from "../api.mjs";`,
    `import { emit } from "../output.mjs";`,
    `import { readFileSync } from "node:fs";`,
    ``,
    `export function ${fnName}(parent) {`,
    `  const tag = parent.command("${tag}").description("${escapeStr(ops[0]?.op?.tags?.[0] || tag)} endpoints");`,
  ];

  for (const { path, method, opId, op } of ops) {
    const cmdName = kebab(opId);
    const params = op.parameters || [];
    const pathParams = params.filter((p) => p.in === "path");
    const queryParams = params.filter((p) => p.in === "query");
    const hasBody = !!op.requestBody;
    const summary = escapeStr(op.summary || op.description || cmdName);

    lines.push(`  tag.command("${cmdName}")`);
    lines.push(`    .description("${summary}")`);
    for (const p of pathParams) {
      lines.push(
        `    .requiredOption("--${kebab(p.name)} <${p.name}>", "${escapeStr(p.description)}")`
      );
    }
    for (const p of queryParams) {
      const flag = p.required ? "requiredOption" : "option";
      lines.push(`    .${flag}("--${kebab(p.name)} <${p.name}>", "${escapeStr(p.description)}")`);
    }
    if (hasBody) {
      lines.push(`    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")`);
    }
    lines.push(`    .action(async (opts, cmd) => {`);
    lines.push(`      const gOpts = cmd.optsWithGlobals();`);
    // Build URL with path param substitution
    lines.push(`      let url = "${path}";`);
    for (const p of pathParams) {
      lines.push(
        `      url = url.replace("{${p.name}}", encodeURIComponent(opts.${camelCase(kebab(p.name))} ?? ""));`
      );
    }
    // Build query string from query params
    if (queryParams.length > 0) {
      lines.push(`      const qs = new URLSearchParams();`);
      for (const p of queryParams) {
        const optName = camelCase(kebab(p.name));
        lines.push(
          `      if (opts.${optName} != null) qs.set("${p.name}", String(opts.${optName}));`
        );
      }
      lines.push(`      if (qs.toString()) url += "?" + qs.toString();`);
    }
    // Body handling
    if (hasBody) {
      lines.push(`      let body;`);
      lines.push(`      if (opts.body) {`);
      lines.push(`        body = opts.body.startsWith("@")`);
      lines.push(`          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))`);
      lines.push(`          : JSON.parse(opts.body);`);
      lines.push(`      }`);
    }
    const bodyArg = hasBody ? ", body" : "";
    lines.push(
      `      const res = await apiFetch(url, { method: "${method.toUpperCase()}"${hasBody ? ", body" : ""}, baseUrl: gOpts.baseUrl, apiKey: gOpts.apiKey });`
    );
    lines.push(`      const data = res.ok ? await res.json() : await res.text();`);
    lines.push(`      emit(data, gOpts);`);
    lines.push(`    });`);
  }

  lines.push(`}`);

  const content = lines.join("\n") + "\n";
  writeFileSync(join(OUT_DIR, `${tag}.mjs`), content);
  generatedTags.push(tag);
  console.log(`[generate] ${tag}.mjs — ${ops.length} operations`);
}

// Generate registry
const registryLines = [
  `// AUTO-GENERATED. Do not edit.`,
  ...generatedTags.map((t) => `import { register_${t.replace(/-/g, "_")} } from "./${t}.mjs";`),
  ``,
  `export const API_TAGS = ${JSON.stringify(generatedTags)};`,
  ``,
  `export function registerApiCommands(program) {`,
  `  const api = program`,
  `    .command("api")`,
  `    .description("Direct REST API access (generated from OpenAPI spec)");`,
  `  api`,
  `    .command("tags")`,
  `    .description("List available API tag groups")`,
  `    .action(() => { API_TAGS.forEach((t) => console.log(t)); });`,
  ...generatedTags.map((t) => `  register_${t.replace(/-/g, "_")}(api);`),
  `}`,
];

writeFileSync(join(OUT_DIR, "registry.mjs"), registryLines.join("\n") + "\n");
console.log(`[generate] registry.mjs — ${generatedTags.length} tags`);
console.log("[generate] Done.");
