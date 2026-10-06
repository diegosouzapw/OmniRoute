#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { XMLParser, XMLValidator } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  preserveOrder: true,
});

function collectIds(value, ids) {
  if (Array.isArray(value)) {
    for (const entry of value) collectIds(entry, ids);
    return;
  }
  if (!value || typeof value !== "object") return;

  const attributes = value[":@"];
  if (attributes && typeof attributes === "object" && typeof attributes["@_id"] === "string") {
    ids.push(attributes["@_id"]);
  }
  for (const entry of Object.values(value)) collectIds(entry, ids);
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function replaceRootAttribute(openingTag, name, value) {
  const attribute = new RegExp(`\\s${name}=(?:"[^"]*"|'[^']*')`, "i");
  const withoutExisting = openingTag.replace(attribute, "");
  return withoutExisting.replace(/>$/, ` ${name}="${escapeXml(value)}">`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function ensureSvgAccessibility(svg, { title, description, idBase }) {
  const xmlResult = XMLValidator.validate(svg);
  if (xmlResult !== true) throw new Error(`invalid XML: ${xmlResult.err.msg}`);

  const titleId = `${idBase}-title`;
  const descriptionId = `${idBase}-desc`;
  const priorTitle = new RegExp(
    `<title\\b[^>]*\\bid=["']${escapeRegExp(titleId)}["'][^>]*>[\\s\\S]*?<\\/title>`,
    "i"
  );
  const priorDescription = new RegExp(
    `<desc\\b[^>]*\\bid=["']${escapeRegExp(descriptionId)}["'][^>]*>[\\s\\S]*?<\\/desc>`,
    "i"
  );
  const withoutPriorAccessibleName = svg.replace(priorTitle, "").replace(priorDescription, "");
  const match = withoutPriorAccessibleName.match(/<svg\b[^>]*>/i);
  if (!match) throw new Error("document root is not an SVG element");

  let openingTag = replaceRootAttribute(match[0], "role", "img");
  openingTag = replaceRootAttribute(openingTag, "aria-labelledby", `${titleId} ${descriptionId}`);
  const accessibleName =
    `<title id="${escapeXml(titleId)}">${escapeXml(title)}</title>` +
    `<desc id="${escapeXml(descriptionId)}">${escapeXml(description)}</desc>`;

  return withoutPriorAccessibleName.replace(match[0], `${openingTag}${accessibleName}`);
}

export function validateSvgText(svg) {
  const xmlResult = XMLValidator.validate(svg);
  if (xmlResult !== true) {
    return { errors: [`invalid XML: ${xmlResult.err.msg}`], warnings: [] };
  }

  const document = parser.parse(svg);
  const ids = [];
  collectIds(document, ids);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))].sort();

  const openingTag = svg.match(/<svg\b[^>]*>/i)?.[0] ?? "";
  const warnings = [];
  if (!/\srole=["']img["']/i.test(openingTag)) warnings.push('root role is not "img"');
  const hasAccessibleName =
    /\saria-(?:label|labelledby)=["'][^"']+["']/i.test(openingTag) ||
    /<title\b[^>]*>[^<]+<\/title>/i.test(svg);
  if (!hasAccessibleName) {
    warnings.push("missing accessible name (title, aria-label, or aria-labelledby)");
  }
  if (!/<desc\b[^>]*>[^<]+<\/desc>/i.test(svg)) warnings.push("missing desc element");
  if (/<foreignObject\b/i.test(svg)) warnings.push("foreignObject present (Mermaid output)");
  if (/\s(?:width|height)=["'][^"']+["']/i.test(openingTag)) {
    warnings.push("fixed root width or height present (Mermaid output)");
  }

  return {
    errors: duplicates.length > 0 ? [`duplicate IDs: ${duplicates.join(", ")}`] : [],
    warnings,
  };
}

export function validateSvgFile(file) {
  return validateSvgText(readFileSync(file, "utf8"));
}

function isDirectExecution() {
  if (!process.argv[1]) return false;
  return fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
}

if (isDirectExecution()) {
  const args = process.argv.slice(2);
  let fixAccessibility = false;
  let title;
  let description;
  const files = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--fix-a11y") {
      fixAccessibility = true;
    } else if (arg === "--title") {
      title = args[++index];
    } else if (arg === "--description") {
      description = args[++index];
    } else {
      files.push(arg);
    }
  }
  if (files.length === 0) {
    console.error(
      "Usage: node scripts/docs/validate-svg.mjs [--fix-a11y --title TEXT --description TEXT] <file.svg> [...]"
    );
    process.exit(2);
  }

  if (fixAccessibility && (!title || !description)) {
    console.error("--fix-a11y requires both --title and --description");
    process.exit(2);
  }

  let failures = 0;
  for (const file of files) {
    if (fixAccessibility) {
      const idBase = path.basename(file, path.extname(file));
      const updated = ensureSvgAccessibility(readFileSync(file, "utf8"), {
        title,
        description,
        idBase,
      });
      writeFileSync(file, updated);
    }
    const result = validateSvgFile(file);
    for (const warning of result.warnings) console.warn(`WARN ${file}: ${warning}`);
    if (result.errors.length === 0) {
      console.log(`PASS ${file}`);
      continue;
    }
    failures += 1;
    for (const error of result.errors) console.error(`FAIL ${file}: ${error}`);
  }
  if (failures > 0) process.exit(1);
}
