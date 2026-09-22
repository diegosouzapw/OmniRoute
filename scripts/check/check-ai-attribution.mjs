#!/usr/bin/env node
// scripts/check/check-ai-attribution.mjs
// Gate: Hard Rule #16 — never credit or advertise an AI assistant, LLM, or automation account in
// commit / PR metadata. Two forbidden forms:
//   (a) `Co-Authored-By` trailers naming an AI/bot (names containing Claude / GPT / Copilot / Codex /
//       Gemini / Bot…, or e-mails at anthropic.com / openai.com / bot-owned noreply.github.com);
//   (b) AI-generation footers anywhere in a commit message or PR title/body
//       (`🤖 Generated with [Claude Code]`, "Generated with Claude Code", "Made with <AI tool>",
//       `Claude-Session:` trailers, …).
// Human collaborators MAY be credited with standard `Co-authored-by: Name <email>` trailers — the
// upstream-port workflows depend on it — so only the AI/bot signatures below are rejected.
//
// Incident record: 8 contributor commits reached release/v3.8.51 with such trailers through squash
// merges that copied the PR commit bodies (#14436). This gate runs:
//   • in CI on every PR commit of the range base..head plus the PR title/body — inside the
//     quality.yml fast-gates loop for PR→release/** (reads the event payload) and as a lint step
//     in ci.yml for PR→main;
//   • locally as the husky `commit-msg` hook on the message being committed.
//
// Usage:
//   node scripts/check/check-ai-attribution.mjs                                  # CI: reads GITHUB_EVENT_PATH
//   node scripts/check/check-ai-attribution.mjs --range <base>..<head>          # explicit range
//   node scripts/check/check-ai-attribution.mjs --message-file .git/COMMIT_EDITMSG   # hook
//   node scripts/check/check-ai-attribution.mjs --pr-title "…" --pr-body-file body.md
// Exit 1 on any hit; prints every offending line with its commit.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

/** Trailer-name patterns that denote an AI assistant, LLM or automation account. */
// Only unambiguous AI/bot names: "Devin", "Cursor", "Jules", "Gemini" are also human first names or
// products a human may work at, so they are matched only in generation footers, never in trailers.
const AI_NAME_RE =
  /\b(claude|chatgpt|gpt(?:-?\d)?|openai|codex|copilot|anthropic|aider|windsurf|llm|ai assistant)\b|\[bot\]|\bbot\b/i;
/** E-mail domains / addresses owned by AI vendors or bot accounts. */
const AI_EMAIL_RE =
  /@(?:anthropic\.com|openai\.com|users\.noreply\.github\.com\b.*\[bot\]|noreply\.anthropic\.com)|noreply@anthropic\.com|codex@openai\.com|copilot@github\.com|\[bot\]@/i;
/** Footers / trailers that advertise AI generation. */
const AI_FOOTER_RE =
  /(generated (?:with|by)\s+\[?(?:claude|chatgpt|gpt|copilot|codex|gemini|cursor|devin|aider|windsurf|an? ai)|made with (?:claude|chatgpt|gpt|copilot|codex|gemini|cursor|devin|aider|windsurf)|🤖 generated with|^\s*claude-session:|^\s*codex-session:|^\s*(?:ai|llm)-generated\s*:)/i;

/**
 * Return the offending lines of one message (empty array = clean).
 * Exported for the unit test; pure function of the text.
 */
export function findAiAttribution(text) {
  const hits = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const trailer = line.match(
      /^(co-authored-by|signed-off-by|reviewed-by|authored-by)\s*:\s*(.+)$/i
    );
    if (trailer) {
      const who = trailer[2];
      // name part = everything before the first "<" (not HTML sanitization — CodeQL js/incomplete-multi-character-sanitization does not apply)
      const name = who.split("<")[0];
      if (AI_NAME_RE.test(name) || AI_EMAIL_RE.test(who)) {
        hits.push(line);
        continue;
      }
    }
    if (AI_FOOTER_RE.test(line)) hits.push(line);
  }
  return hits;
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", maxBuffer: 1 << 26 });
}

/** Every commit in `range` → [{ hash, subject, hits }] for the ones that hit. */
export function scanRange(range) {
  const out = git(["log", "--format=%x01%H%x02%s%x02%B", range]);
  const bad = [];
  for (const rec of out.split("\u0001").filter(Boolean)) {
    const [hash, subject, body = ""] = rec.split("\u0002");
    const hits = findAiAttribution(body);
    if (hits.length) bad.push({ hash: hash.slice(0, 10), subject: subject.trim(), hits });
  }
  return bad;
}

function parseArgs(argv) {
  const a = { range: null, messageFile: null, prTitle: null, prBodyFile: null, prBodyText: null };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    const v = argv[i + 1];
    if (k === "--range") ((a.range = v), i++);
    else if (k === "--message-file") ((a.messageFile = v), i++);
    else if (k === "--pr-title") ((a.prTitle = v), i++);
    else if (k === "--pr-body-file") ((a.prBodyFile = v), i++);
  }
  return a;
}

/** In GitHub Actions with no CLI args: scan the pull_request of the event payload (null = not a PR). */
export function inputsFromGithubEvent(eventPath = process.env.GITHUB_EVENT_PATH) {
  if (!eventPath || !fs.existsSync(eventPath)) return undefined;
  let ev;
  try {
    ev = JSON.parse(fs.readFileSync(eventPath, "utf8"));
  } catch {
    return undefined;
  }
  const pr = ev?.pull_request;
  if (!pr?.base?.sha || !pr?.head?.sha) return null;
  return {
    range: `${pr.base.sha}..${pr.head.sha}`,
    prTitle: typeof pr.title === "string" ? pr.title : "",
    prBody: typeof pr.body === "string" ? pr.body : "",
  };
}

export function main(argv = process.argv.slice(2)) {
  const a = parseArgs(argv);
  if (!a.range && !a.messageFile && !a.prTitle && !a.prBodyFile) {
    const ev = inputsFromGithubEvent();
    if (ev === null) {
      console.log("[ai-attribution] OK — not a pull_request event, nothing to scan.");
      return 0;
    }
    if (ev) {
      a.range = ev.range;
      a.prTitle = ev.prTitle;
      a.prBodyText = ev.prBody;
    }
  }
  let failed = false;
  const report = (label, hits) => {
    if (!hits.length) return;
    failed = true;
    console.error(`[ai-attribution] ✗ ${label}`);
    for (const h of hits) console.error(`    ${h}`);
  };
  if (a.range) {
    for (const c of scanRange(a.range)) report(`commit ${c.hash} — ${c.subject}`, c.hits);
  }
  if (a.messageFile)
    report("commit message", findAiAttribution(fs.readFileSync(a.messageFile, "utf8")));
  if (a.prTitle) report("PR title", findAiAttribution(a.prTitle));
  if (a.prBodyFile && fs.existsSync(a.prBodyFile))
    report("PR body", findAiAttribution(fs.readFileSync(a.prBodyFile, "utf8")));
  if (a.prBodyText) report("PR body", findAiAttribution(a.prBodyText));
  if (!a.range && !a.messageFile && !a.prTitle && !a.prBodyFile) {
    console.error(
      "[ai-attribution] usage: --range <a>..<b> | --message-file <f> | --pr-title <t> --pr-body-file <f>"
    );
    return 2;
  }
  if (failed) {
    console.error(
      "[ai-attribution] FAIL — Hard Rule #16: strip AI/bot Co-Authored-By trailers and AI-generation footers " +
        "(human co-authors stay). See AGENTS.md → Hard Rules → #16 and issue #14436."
    );
    return 1;
  }
  console.log("[ai-attribution] OK — no AI/bot attribution in the scanned metadata.");
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(main());
}
