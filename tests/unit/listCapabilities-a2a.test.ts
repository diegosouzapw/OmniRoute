/**
 * Unit tests for the A2A list-capabilities skill.
 *
 * Verifies:
 *  - Return shape matches §3.7 contract
 *  - Markdown table contains all 42 skill IDs
 *  - Coverage bounds are within declared totals
 *  - metadata.source === "agent-skills-catalog"
 *  - metadata.generatedAt is an ISO datetime string
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import type { A2ATask } from "../../src/lib/a2a/taskManager.js";
import { executeListCapabilities } from "../../src/lib/a2a/skills/listCapabilities.js";
import { API_SKILL_IDS, CLI_SKILL_IDS } from "../../src/lib/agentSkills/catalog.js";

// Minimal stub — executeListCapabilities only receives the task arg but does not use it
const stubTask = {} as A2ATask;

test("executeListCapabilities returns shape matching §3.7 contract", async () => {
  const result = await executeListCapabilities(stubTask);

  // artifacts array with exactly 1 text artifact
  assert.ok(Array.isArray(result.artifacts), "artifacts is an array");
  assert.equal(result.artifacts.length, 1, "exactly 1 artifact");
  assert.equal(result.artifacts[0].type, "text", "artifact type is 'text'");
  assert.ok(typeof result.artifacts[0].content === "string", "artifact content is a string");

  // metadata shape
  const { metadata } = result;
  assert.ok(metadata, "metadata exists");
  assert.equal(metadata.source, "agent-skills-catalog", "metadata.source matches");
  assert.equal(metadata.totalSkills, 43, "metadata.totalSkills === 43");
  assert.ok(metadata.coverage, "metadata.coverage exists");
  assert.ok(metadata.coverage.api, "metadata.coverage.api exists");
  assert.ok(metadata.coverage.cli, "metadata.coverage.cli exists");
  assert.equal(metadata.coverage.api.total, 22, "api.total === 22");
  assert.equal(metadata.coverage.cli.total, 20, "cli.total === 20");
});

test("executeListCapabilities markdown table contains all 42 API+CLI skill IDs", async () => {
  const result = await executeListCapabilities(stubTask);
  const content = result.artifacts[0].content;

  const allIds = [...API_SKILL_IDS, ...CLI_SKILL_IDS] as string[];
  assert.equal(allIds.length, 42, "API+CLI catalog declares 42 skill IDs");

  for (const id of allIds) {
    assert.ok(content.includes(id), `Markdown table missing skill ID: ${id}`);
  }
});

test("metadata.coverage.api.have is within [0, 22]", async () => {
  const result = await executeListCapabilities(stubTask);
  const { api } = result.metadata.coverage;
  assert.ok(api.have >= 0, "api.have >= 0");
  assert.ok(api.have <= 22, "api.have <= 22");
});

test("metadata.coverage.cli.have is within [0, 20]", async () => {
  const result = await executeListCapabilities(stubTask);
  const { cli } = result.metadata.coverage;
  assert.ok(cli.have >= 0, "cli.have >= 0");
  assert.ok(cli.have <= 20, "cli.have <= 20");
});

test("metadata.generatedAt is a valid ISO datetime", async () => {
  const result = await executeListCapabilities(stubTask);
  const { generatedAt } = result.metadata;
  assert.ok(typeof generatedAt === "string", "generatedAt is a string");
  const parsed = new Date(generatedAt);
  assert.ok(!isNaN(parsed.getTime()), `generatedAt is not a valid date: ${generatedAt}`);
  assert.ok(generatedAt.includes("T"), "generatedAt contains 'T' (ISO format)");
});

test("list-capabilities is registered in A2A_SKILL_HANDLERS", async () => {
  const { A2A_SKILL_HANDLERS } = await import("../../src/lib/a2a/taskExecution.js");
  assert.ok(
    "list-capabilities" in A2A_SKILL_HANDLERS,
    "list-capabilities must be in A2A_SKILL_HANDLERS",
  );
});
