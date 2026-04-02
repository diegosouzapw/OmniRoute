#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const API_ROOT = path.join(ROOT, "src", "app", "api");
const FILE_NAME = "route.ts";
const REQUEST_JSON_REGEX = /request\.json\s*\(/;
const VALIDATE_BODY_REGEX = /\bvalidateBody\s*\(/;
const SAFE_PARSE_REGEX = /\.safeParse\s*\(/;

/**
 * Walk directory recursively and collect route files.
 * @param {string} dir
 * @returns {string[]}
 */
function collectRouteFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectRouteFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name === FILE_NAME) {
      files.push(fullPath);
    }
  }

  return files;
}

if (!fs.existsSync(API_ROOT)) {
  console.error(`[t06:route-validation] FAIL - API root not found: ${API_ROOT}`);
  process.exit(1);
}

const routeFiles = collectRouteFiles(API_ROOT).sort();
const missingValidation = [];

for (const fullPath of routeFiles) {
  const source = fs.readFileSync(fullPath, "utf8");
  if (!REQUEST_JSON_REGEX.test(source)) continue;
  // Accept either validateBody() or .safeParse() as validation
  if (!VALIDATE_BODY_REGEX.test(source) && !SAFE_PARSE_REGEX.test(source)) {
    missingValidation.push(path.relative(ROOT, fullPath));
  }
}

if (missingValidation.length > 0) {
  console.error("[t06:route-validation] FAIL - routes with request.json() without validateBody() or .safeParse():");
  for (const file of missingValidation) {
    console.error(`  - ${file}`);
  }
  process.exit(1);
}

console.log(
  `[t06:route-validation] PASS - ${routeFiles.length} route files scanned, all request.json() usages are validated.`
);
