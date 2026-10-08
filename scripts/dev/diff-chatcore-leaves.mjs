#!/usr/bin/env node
// scripts/dev/diff-chatcore-leaves.mjs
//
// Region diff that proves the four response-path leaves in open-sse/handlers/chatCore/ are
// mechanical lifts of the monolithic handleChatCore on the base ref.
//
// For every leaf it (1) slices the lifted region out of the BASE chatCore.ts (region.base:
// startPattern/endPattern), (2) slices the corresponding body out of the leaf (region.leaf), (3)
// tokenizes both with the TypeScript scanner (comments, whitespace and prettier re-wrap noise
// such as trailing commas vanish), (4) runs a Myers token diff and groups the edits into hunks.
// A hunk is "mechanical" only when it is one of the documented lift seams (see classifyHunk):
// the syncExecuteTranslatedBody(translatedBody) re-sync, the `return X` ->
// `return { response: X, carry: {...} }` wrapping with the exact per-leaf carry keys, and the
// region-boundary tokens that stay behind in handleChatCore. Every other hunk is printed as
// NON-MECHANICAL and the script exits 1 (exit 2 = a region could not be extracted).
//
// Usage: node scripts/dev/diff-chatcore-leaves.mjs [--base <git-ref>] [--verbose]
//   default base: origin/release/v3.8.52 (the pre-split chatCore.ts that the leaves lift from).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name, fallback) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : fallback);
const BASE_REF = opt("--base", "origin/release/v3.8.52");
const VERBOSE = flag("--verbose");
const BASE_FILE = "open-sse/handlers/chatCore.ts";

/** Normalize a source slice to comparable lines (drops blanks and comment-only lines). */
export function normalize(text) {
  const out = [];
  let inBlock = false;
  for (const raw of text.split("\n")) {
    let line = raw.trim();
    if (inBlock) {
      if (line.includes("*/")) inBlock = false;
      continue;
    }
    if (line.startsWith("/*")) {
      if (!line.includes("*/")) inBlock = true;
      continue;
    }
    if (line === "" || line.startsWith("//")) continue;
    line = line.replace(/\s+/g, " ");
    // prettier re-wraps change trailing commas / semicolons-only differences after dedent
    out.push(line);
  }
  return out;
}

/**
 * Slice a region out of NORMALIZED lines. The region starts at the first `startPattern` match
 * (searched after the first `after` match when given) and ends at the first `endPattern` match
 * after the start (the LAST match when `endMode: "last"`). The end line is excluded unless
 * `inclusiveEnd`.
 */
export function sliceRegion(
  lines,
  { after, startPattern, endPattern, endMode = "first", inclusiveEnd }
) {
  let from = 0;
  if (after) {
    from = lines.findIndex((l) => after.test(l));
    if (from < 0) throw new Error(`anchor ${after} not found`);
  }
  let s = -1;
  for (let i = from; i < lines.length; i++) {
    if (startPattern.test(lines[i])) {
      s = i;
      break;
    }
  }
  if (s < 0) throw new Error(`start pattern ${startPattern} not found`);
  let e = -1;
  if (endMode === "last") {
    for (let i = lines.length - 1; i > s; i--) {
      if (endPattern.test(lines[i])) {
        e = i;
        break;
      }
    }
  } else {
    for (let i = s + 1; i < lines.length; i++) {
      if (endPattern.test(lines[i])) {
        e = i;
        break;
      }
    }
  }
  if (e < 0) throw new Error(`end pattern ${endPattern} not found after the start`);
  return lines.slice(s, inclusiveEnd ? e + 1 : e);
}

/** Tokenize TypeScript source (comments/whitespace dropped, prettier-wrap noise removed). */
export function tokenize(text) {
  const scanner = ts.createScanner(ts.ScriptTarget.ES2022, true, ts.LanguageVariant.Standard, text);
  const tokens = [];
  const stack = []; // "tpl" | "brace"
  let prevKind = ts.SyntaxKind.Unknown;
  const exprEnd = new Set([
    ts.SyntaxKind.Identifier,
    ts.SyntaxKind.CloseParenToken,
    ts.SyntaxKind.CloseBracketToken,
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.StringLiteral,
    ts.SyntaxKind.NoSubstitutionTemplateLiteral,
    ts.SyntaxKind.TemplateTail,
    ts.SyntaxKind.RegularExpressionLiteral,
    ts.SyntaxKind.ThisKeyword,
    ts.SyntaxKind.TrueKeyword,
    ts.SyntaxKind.FalseKeyword,
    ts.SyntaxKind.NullKeyword,
  ]);
  for (let kind = scanner.scan(); kind !== ts.SyntaxKind.EndOfFileToken; kind = scanner.scan()) {
    if (kind === ts.SyntaxKind.CloseBraceToken && stack[stack.length - 1] === "tpl") {
      kind = scanner.reScanTemplateToken(false);
      if (kind === ts.SyntaxKind.TemplateTail) stack.pop();
    } else if (kind === ts.SyntaxKind.CloseBraceToken) {
      stack.pop();
    } else if (kind === ts.SyntaxKind.OpenBraceToken) {
      stack.push("brace");
    } else if (kind === ts.SyntaxKind.TemplateHead) {
      stack.push("tpl");
    } else if (
      (kind === ts.SyntaxKind.SlashToken || kind === ts.SyntaxKind.SlashEqualsToken) &&
      !exprEnd.has(prevKind)
    ) {
      kind = scanner.reScanSlashToken();
    }
    tokens.push(scanner.getTokenText());
    prevKind = kind;
  }
  // prettier adds/removes trailing commas when it re-wraps after the dedent
  return tokens.filter((t, i) => !(t === "," && /^[)\]}]$/.test(tokens[i + 1] ?? "")));
}

/** Myers O(ND) diff over token arrays. Returns edit hunks {aStart,aEnd,bStart,bEnd}. */
export function myersHunks(a, b, maxD = 20000) {
  const n = a.length;
  const m = b.length;
  const max = Math.min(n + m, maxD);
  const trace = [];
  let v = new Int32Array(2 * max + 2);
  const off = max;
  let found = -1;
  for (let d = 0; d <= max && found < 0; d++) {
    trace.push(v.slice());
    for (let k = -d; k <= d; k += 2) {
      let x =
        k === -d || (k !== d && v[off + k - 1] < v[off + k + 1])
          ? v[off + k + 1]
          : v[off + k - 1] + 1;
      let y = x - k;
      while (x < n && y < m && a[x] === b[y]) {
        x++;
        y++;
      }
      v[off + k] = x;
      if (x >= n && y >= m) {
        found = d;
        break;
      }
    }
  }
  if (found < 0) throw new Error(`token diff exceeds ${maxD} edits - regions are not comparable`);
  // backtrack
  const edits = []; // {type: "del"|"ins", ai, bi}
  let x = n;
  let y = m;
  for (let d = found; d > 0; d--) {
    const vv = trace[d];
    const k = x - y;
    const prevK = k === -d || (k !== d && vv[off + k - 1] < vv[off + k + 1]) ? k + 1 : k - 1;
    const prevX = vv[off + prevK];
    const prevY = prevX - prevK;
    while (x > prevX && y > prevY) {
      x--;
      y--;
    }
    if (x === prevX) edits.push({ type: "ins", ai: x, bi: y - 1 });
    else edits.push({ type: "del", ai: x - 1, bi: y });
    x = prevX;
    y = prevY;
  }
  edits.reverse();
  // group into hunks (merge edits separated by < 4 matching tokens)
  const hunks = [];
  for (const e of edits) {
    const last = hunks[hunks.length - 1];
    const aPos = e.ai;
    const bPos = e.bi;
    if (last && aPos - last.aEnd < 4 && bPos - last.bEnd < 4 + (aPos - last.aEnd)) {
      // extend
      if (e.type === "del") last.aEnd = Math.max(last.aEnd, e.ai + 1);
      else last.bEnd = Math.max(last.bEnd, e.bi + 1);
      if (e.type === "del") last.bEnd = Math.max(last.bEnd, e.bi);
      else last.aEnd = Math.max(last.aEnd, e.ai);
    } else {
      hunks.push({
        aStart: e.ai,
        aEnd: e.type === "del" ? e.ai + 1 : e.ai,
        bStart: e.bi,
        bEnd: e.type === "ins" ? e.bi + 1 : e.bi,
      });
    }
  }
  return hunks;
}

// Regions. `base` slices the pre-split chatCore.ts, `leaf` slices the leaf file. Patterns run
// against NORMALIZED lines (trimmed, comments and blanks dropped), so indentation is irrelevant.
const LEAF_AFTER_DEPS = /^\} = deps;$/;
export const REGIONS = [
  {
    name: "executeProviderRequest",
    file: "open-sse/handlers/chatCore/executeProviderRequest.ts",
    carryKeys: [],
    allowRemoved: [],
    base: {
      startPattern: /^const execute = async \(\) => \{$/,
      endPattern: /^return execute\(\);$/,
      inclusiveEnd: true,
    },
    leaf: {
      after: LEAF_AFTER_DEPS,
      startPattern: /^const execute = async \(\) => \{$/,
      endPattern: /^return execute\(\);$/,
      inclusiveEnd: true,
    },
  },
  {
    name: "streamingResponse",
    file: "open-sse/handlers/chatCore/streamingResponse.ts",
    carryKeys: [
      "translatedBody",
      "currentModel",
      "effectiveServiceTier",
      "finalBody",
      "pipelineRecovered",
      "providerHeaders",
      "providerResponse",
      "providerUrl",
    ],
    allowRemoved: ["; } } }"], // closers of `if (stream) {` / handleChatCoreInner left in the barrel
    base: {
      after: /^let pipelineRecovered = false;$/,
      startPattern: /^try \{$/,
      endPattern: /^if \(!stream\) \{$/,
    },
    leaf: {
      after: LEAF_AFTER_DEPS,
      startPattern: /^try \{$/,
      endPattern: /^return \{$/,
      endMode: "last",
    },
  },
  {
    name: "nonStreamingResponse",
    file: "open-sse/handlers/chatCore/nonStreamingResponse.ts",
    carryKeys: [
      "translatedBody",
      "currentModel",
      "finalBody",
      "providerResponse",
      "providerHeaders",
      "effectiveServiceTier",
      "claudePromptCacheLogMeta",
      "reasoningReplayHistory",
      "pipelineRecovered",
    ],
    allowRemoved: ["if ( ! stream ) {", "}"], // the `if (!stream)` opener / its closer stay in the barrel
    base: {
      startPattern: /^if \(!stream\) \{$/,
      endPattern: /^providerResponse = await maybeConvertJsonBodyToSse\(/,
    },
    leaf: {
      after: LEAF_AFTER_DEPS,
      startPattern: /^try \{$/,
      endPattern: /^\}$/,
      endMode: "last",
    },
  },
  {
    name: "streamingTail",
    file: "open-sse/handlers/chatCore/streamingTail.ts",
    carryKeys: [
      "onPipelineStreamError",
      "onClientDisconnectFinalize",
      "turnExecutionHandedOffToStream",
    ],
    allowRemoved: [
      // handleChatCoreInner's finally (turn-execution release) stays in the barrel
      "; } finally { if ( ! turnExecutionHandedOffToStream ) { releaseTurnExecution ( ) ; } } }",
    ],
    base: {
      startPattern: /^providerResponse = await maybeConvertJsonBodyToSse\(/,
      endPattern: /^(export )?function isTokenExpiringSoon/,
    },
    leaf: {
      after: LEAF_AFTER_DEPS,
      startPattern: /^providerResponse = await maybeConvertJsonBodyToSse\(/,
      endPattern: /^\}$/,
      endMode: "last",
    },
  },
];

const SYNC_CALL = "syncExecuteTranslatedBody ( translatedBody ) ;";
const WRAP_OPEN = new Set(["{ response :", "response : {", "result : {"]);

/** Returns a short reason when the hunk is a documented lift seam, else null. */
export function classifyHunk(removed, added, region) {
  const carry = `carry : { ${region.carryKeys.join(" , ")} }`;
  if (removed === "" && added === SYNC_CALL) return "re-sync of the live translatedBody closure";
  if (removed === "" && WRAP_OPEN.has(added))
    return "return value wrapped as { response|result, carry }";
  const closeRe = new RegExp(`^, ${carry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\}( ;( \\})*)?$`);
  if ((removed === "" || region.allowRemoved.includes(removed)) && closeRe.test(added)) {
    return "carry object closing the wrapped return";
  }
  const wrapValue = removed.match(/^[\w$]+$/);
  if (wrapValue && added === `{ response : ${removed} , ${carry} }`) {
    return "returned identifier wrapped with the carry object";
  }
  if (region.allowRemoved.includes(removed) && added === "")
    return "region boundary left in handleChatCore";
  return null;
}

function readBase() {
  try {
    return execFileSync("git", ["show", `${BASE_REF}:${BASE_FILE}`], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    console.error(
      `[diff-chatcore-leaves] cannot read ${BASE_FILE} from ${BASE_REF}: ${err.message}`
    );
    process.exit(2);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}

function main() {
  console.log(`[diff-chatcore-leaves] base ref: ${BASE_REF}`);
  const baseLines = normalize(readBase());
  let total = 0;
  for (const region of REGIONS) {
    const leafLines = normalize(fs.readFileSync(path.join(ROOT, region.file), "utf8"));
    let bt;
    let lt;
    try {
      bt = tokenize(sliceRegion(baseLines, region.base).join("\n"));
      lt = tokenize(sliceRegion(leafLines, region.leaf).join("\n"));
    } catch (err) {
      console.error(`[diff-chatcore-leaves] ${region.name}: cannot extract region: ${err.message}`);
      process.exit(2);
    }
    const hunks = myersHunks(bt, lt);
    let mechanical = 0;
    const bad = [];
    for (const h of hunks) {
      const removed = bt.slice(h.aStart, h.aEnd).join(" ");
      const added = lt.slice(h.bStart, h.bEnd).join(" ");
      const reason = classifyHunk(removed, added, region);
      if (reason) {
        mechanical++;
        if (VERBOSE) console.log(`  ok  ${reason}: -[${removed}] +[${added.slice(0, 120)}]`);
      } else {
        bad.push({ h, removed, added });
      }
    }
    total += bad.length;
    console.log(
      `${bad.length === 0 ? "OK  " : "FAIL"} ${region.name}: base ${bt.length} tokens, leaf ${lt.length} tokens, ` +
        `${mechanical} mechanical hunk(s), ${bad.length} NON-MECHANICAL`
    );
    for (const { h, removed, added } of bad) {
      console.log(`  @@ after: ${bt.slice(Math.max(0, h.aStart - 8), h.aStart).join(" ")}`);
      if (removed) console.log(`  - ${removed}`);
      if (added) console.log(`  + ${added}`);
    }
  }
  console.log(`\n[diff-chatcore-leaves] non-mechanical hunks: ${total}`);
  if (total === 0) console.log("[diff-chatcore-leaves] all four leaves are mechanical lifts");
  process.exit(total === 0 ? 0 : 1);
}
