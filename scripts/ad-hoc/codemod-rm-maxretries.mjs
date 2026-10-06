#!/usr/bin/env node
/**
 * One-shot codemod (#11966): give every recursive temp-dir removal in tests the retry
 * options Node already supports, so a WAL/backup/worker still writing into the directory
 * turns into a retried delete instead of a red shard:
 *
 *   rmSync(dir, { recursive: true, force: true })
 *   → rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
 *
 * Applies to `rmSync(`, `fs.rmSync(`, `rm(` / `fs.rm(` / `fs.promises.rm(` (async) and
 * `rmdirSync(` calls whose option object literal contains `recursive: true` and no
 * `maxRetries`. Only the option object is touched — call sites, assertions and imports are
 * left as they are. Usage: node scripts/ad-hoc/codemod-rm-maxretries.mjs [dir=tests]
 */
import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || "tests";
const CALL = /\b(?:fs\.promises\.|fsp\.|fs\.|promises\.)?(?:rmSync|rmdirSync|rm)\(/g;
let files = 0;
let sites = 0;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === "fixtures") continue;
      walk(p, out);
    } else if (/\.(ts|tsx|mts|cts|js|mjs|cjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

// Find the closing brace of the option object literal that starts at `open`.
function objectEnd(src, open) {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i;
    } else if (c === '"' || c === "'" || c === "`") {
      const q = c;
      i++;
      while (i < src.length && src[i] !== q) {
        if (src[i] === "\\") i++;
        i++;
      }
    }
  }
  return -1;
}

for (const file of walk(root)) {
  const src = fs.readFileSync(file, "utf8");
  let out = "";
  let last = 0;
  let touched = 0;
  for (const m of src.matchAll(CALL)) {
    const callStart = m.index + m[0].length;
    // Locate the option object: the first `{` before the call's closing paren at depth 0.
    let depth = 0;
    let objOpen = -1;
    for (let i = callStart; i < src.length; i++) {
      const c = src[i];
      if (c === "(" || c === "[") depth++;
      else if (c === ")" || c === "]") {
        if (depth === 0) break;
        depth--;
      } else if (c === "{" && depth === 0) {
        objOpen = i;
        break;
      }
    }
    if (objOpen === -1) continue;
    const objClose = objectEnd(src, objOpen);
    if (objClose === -1) continue;
    const obj = src.slice(objOpen, objClose + 1);
    if (!/\brecursive:\s*true\b/.test(obj) || /\bmaxRetries\b/.test(obj)) continue;
    // Insert before the closing brace, respecting an existing trailing comma / newline.
    const inner = obj.slice(1, -1);
    const trimmed = inner.replace(/\s+$/, "");
    const trailing = inner.slice(trimmed.length);
    const sep = trimmed.endsWith(",") ? " " : ", ";
    const multiline = /\n/.test(trailing);
    const insert = multiline
      ? `${trimmed}${trimmed.endsWith(",") ? "" : ","}\n${trailing.replace(/\n$/, "")}  maxRetries: 5,\n  retryDelay: 100,${trailing}`
      : `${trimmed}${sep}maxRetries: 5, retryDelay: 100${trailing}`;
    out += src.slice(last, objOpen + 1) + insert;
    last = objClose;
    touched++;
  }
  if (touched) {
    out += src.slice(last);
    fs.writeFileSync(file, out);
    files++;
    sites += touched;
  }
}
console.log(`[codemod-rm-maxretries] ${sites} call site(s) in ${files} file(s) under ${root}`);
