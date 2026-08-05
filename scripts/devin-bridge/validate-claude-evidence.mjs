#!/usr/bin/env node
import fs from "node:fs";
import { pathToFileURL } from "node:url";

function contentBlocks(message) {
  return Array.isArray(message?.message?.content) ? message.message.content : [];
}

export function validateClaudeEvidenceText(text, options) {
  const marker = String(options?.marker || "").trim();
  const requiredTools = Array.isArray(options?.requiredTools) ? options.requiredTools : [];
  if (!marker) throw new Error("A final marker is required");

  const toolUses = new Map();
  const successfulResults = new Set();
  const slashCommands = new Set();
  const skills = new Set();
  let finalResult = null;

  for (const [index, rawLine] of String(text).split(/\r?\n/).entries()) {
    const line = rawLine.trim();
    if (!line) continue;
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      throw new Error(`Invalid Claude evidence JSON at line ${index + 1}`);
    }

    if (event?.type === "system" && event?.subtype === "init") {
      for (const command of Array.isArray(event.slash_commands) ? event.slash_commands : []) {
        slashCommands.add(String(command));
      }
      for (const skill of Array.isArray(event.skills) ? event.skills : []) {
        skills.add(String(skill));
      }
    }

    for (const block of contentBlocks(event)) {
      if (block?.type === "tool_use" && typeof block.id === "string") {
        toolUses.set(block.id, { name: String(block.name || ""), input: block.input || {} });
      }
      if (
        block?.type === "tool_result" &&
        typeof block.tool_use_id === "string" &&
        block.is_error !== true
      ) {
        successfulResults.add(block.tool_use_id);
      }
    }

    if (event?.type === "result") finalResult = event;
  }

  if (!finalResult || finalResult.subtype !== "success" || finalResult.is_error === true) {
    throw new Error("Claude evidence has no successful terminal result");
  }
  const resultText = String(finalResult.result || "");
  const incompleteResult = [
    /(?:^|\n)\s*(?:\*\*)?blocker(?:\*\*)?\s*:/im,
    /\btask (?:is|remains) (?:not complete|incomplete)\b/i,
    /(?:^|\n)\s*(?:[-*]\s*)?(?:\*\*)?next steps? needed(?:\*\*)?\s*:/im,
  ].some((pattern) => pattern.test(resultText));
  if (incompleteResult) {
    throw new Error("Claude terminal result explicitly reports incomplete work");
  }
  if (options?.requiredSlashCommand && !slashCommands.has(options.requiredSlashCommand)) {
    throw new Error(`Claude did not load required slash command: ${options.requiredSlashCommand}`);
  }
  if (options?.requiredSkill && !skills.has(options.requiredSkill)) {
    throw new Error(`Claude did not load required skill: ${options.requiredSkill}`);
  }
  const markerIsStandalone = resultText.split(/\r?\n/).some((line) => line.trim() === marker);

  for (const requiredTool of requiredTools) {
    if (![...toolUses.values()].some((tool) => tool.name === requiredTool)) {
      throw new Error(`Claude did not request required client-owned tool: ${requiredTool}`);
    }
  }

  const npmTestSucceeded = [...toolUses.entries()].some(
    ([id, tool]) =>
      tool.name === "Bash" &&
      /\bnpm\s+test\b/.test(String(tool.input?.command || "")) &&
      successfulResults.has(id)
  );
  if (options?.requireSuccessfulNpmTest) {
    if (!npmTestSucceeded) throw new Error("Claude evidence has no successful npm test tool turn");
  }
  const markerIsCorroborated =
    options?.requireSuccessfulNpmTest && npmTestSucceeded && resultText.includes(marker);
  const explicitCompletionIsCorroborated =
    options?.acceptExplicitCompletion === true &&
    npmTestSucceeded &&
    /\btask is complete\b/i.test(resultText);
  if (!markerIsStandalone && !markerIsCorroborated && !explicitCompletionIsCorroborated) {
    throw new Error(`Claude result has no standalone marker: ${marker}`);
  }
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const [
    evidencePath,
    marker,
    requiredTools = "",
    requireNpmTest = "false",
    requiredSlashCommand = "",
    requiredSkill = "",
    acceptExplicitCompletion = "false",
  ] = process.argv.slice(2);
  if (!evidencePath)
    throw new Error("Usage: validate-claude-evidence.mjs FILE MARKER [TOOLS] [NPM_TEST]");
  validateClaudeEvidenceText(fs.readFileSync(evidencePath, "utf8"), {
    marker,
    requiredTools: requiredTools
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    requireSuccessfulNpmTest: requireNpmTest === "true",
    requiredSlashCommand: requiredSlashCommand || undefined,
    requiredSkill: requiredSkill || undefined,
    acceptExplicitCompletion: acceptExplicitCompletion === "true",
  });
  process.stdout.write(`PASS: validated Claude evidence for ${marker}\n`);
}
