import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pt = require("../../src/i18n/messages/pt-BR.json");
const en = require("../../src/i18n/messages/en.json");

// ─── PT-BR namespace presence ─────────────────────────────────────────────────

test("pt-BR has cliCommon namespace", () => {
  assert.ok(pt.cliCommon, "expected pt-BR.json to have 'cliCommon' namespace");
});

test("pt-BR has cliCode namespace", () => {
  assert.ok(pt.cliCode, "expected pt-BR.json to have 'cliCode' namespace");
});

test("pt-BR has cliAgents namespace", () => {
  assert.ok(pt.cliAgents, "expected pt-BR.json to have 'cliAgents' namespace");
});

test("pt-BR has acpAgents namespace", () => {
  assert.ok(pt.acpAgents, "expected pt-BR.json to have 'acpAgents' namespace");
});

// ─── PT-BR page titles ────────────────────────────────────────────────────────

test("pt-BR cliCode.pageTitle is 'CLI Code's'", () => {
  assert.equal(pt.cliCode.pageTitle, "CLI Code's");
});

test("pt-BR cliAgents.pageTitle is 'CLI Agents'", () => {
  assert.equal(pt.cliAgents.pageTitle, "CLI Agents");
});

test("pt-BR acpAgents.pageTitle is 'ACP Agents'", () => {
  assert.equal(pt.acpAgents.pageTitle, "ACP Agents");
});

// ─── PT-BR cliCommon content ──────────────────────────────────────────────────

test("pt-BR cliCommon.concept.code.phrase contains 'código'", () => {
  assert.ok(
    typeof pt.cliCommon.concept?.code?.phrase === "string" &&
      pt.cliCommon.concept.code.phrase.includes("código"),
    `expected cliCommon.concept.code.phrase to contain 'código', got: ${pt.cliCommon.concept?.code?.phrase}`
  );
});

test("pt-BR cliCommon.comparison.title is non-empty string", () => {
  assert.ok(
    typeof pt.cliCommon.comparison?.title === "string" && pt.cliCommon.comparison.title.length > 0
  );
});

// ─── PT-BR sidebar keys ───────────────────────────────────────────────────────

test("pt-BR sidebar has cliCode key", () => {
  assert.ok(pt.sidebar?.cliCode, "expected pt-BR sidebar to have 'cliCode' key");
});

test("pt-BR sidebar has cliAgents key", () => {
  assert.ok(pt.sidebar?.cliAgents, "expected pt-BR sidebar to have 'cliAgents' key");
});

test("pt-BR sidebar has acpAgents key", () => {
  assert.ok(pt.sidebar?.acpAgents, "expected pt-BR sidebar to have 'acpAgents' key");
});

// ─── EN namespace presence ────────────────────────────────────────────────────

test("en has cliCommon namespace", () => {
  assert.ok(en.cliCommon, "expected en.json to have 'cliCommon' namespace");
});

test("en has cliCode namespace", () => {
  assert.ok(en.cliCode, "expected en.json to have 'cliCode' namespace");
});

test("en has cliAgents namespace", () => {
  assert.ok(en.cliAgents, "expected en.json to have 'cliAgents' namespace");
});

test("en has acpAgents namespace", () => {
  assert.ok(en.acpAgents, "expected en.json to have 'acpAgents' namespace");
});

// ─── EN page titles ───────────────────────────────────────────────────────────

test("en cliCode.pageTitle is 'CLI Code's'", () => {
  assert.equal(en.cliCode.pageTitle, "CLI Code's");
});

test("en cliAgents.pageTitle is 'CLI Agents'", () => {
  assert.equal(en.cliAgents.pageTitle, "CLI Agents");
});

test("en cliAgents.pageTitle is 'ACP Agents'", () => {
  assert.equal(en.acpAgents.pageTitle, "ACP Agents");
});

// ─── EN cliCommon content ─────────────────────────────────────────────────────

test("en cliCommon.concept.code.phrase is a non-empty string", () => {
  assert.ok(
    typeof en.cliCommon.concept?.code?.phrase === "string" &&
      en.cliCommon.concept.code.phrase.length > 0
  );
});

// ─── EN sidebar keys ──────────────────────────────────────────────────────────

test("en sidebar has cliCode key", () => {
  assert.ok(en.sidebar?.cliCode, "expected en sidebar to have 'cliCode' key");
});

test("en sidebar has cliAgents key", () => {
  assert.ok(en.sidebar?.cliAgents, "expected en sidebar to have 'cliAgents' key");
});

test("en sidebar has acpAgents key", () => {
  assert.ok(en.sidebar?.acpAgents, "expected en sidebar to have 'acpAgents' key");
});
