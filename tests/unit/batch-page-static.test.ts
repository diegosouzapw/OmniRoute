import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pagePath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/batch/page.tsx"
);
const enPath = path.join(repoRoot, "src/i18n/messages/en.json");

function readBatchPage() {
  return fs.readFileSync(pagePath, "utf8");
}

function readEnKeys() {
  return Object.keys(JSON.parse(fs.readFileSync(enPath, "utf8")));
}

test("batch page stable header uses t() for subtitle", () => {
  const source = readBatchPage();
  assert.match(source, /batchHeaderSubtitle/);
});

test("batch page stable header uses t() for three-step strip", () => {
  const source = readBatchPage();
  assert.match(source, /batchStep1/);
  assert.match(source, /batchStep2/);
  assert.match(source, /batchStep3/);
  assert.match(source, /batchStep1Desc/);
  assert.match(source, /batchStep2Desc/);
  assert.match(source, /batchStep3Desc/);
});

test("batch page stable header keeps Create batch CTA using t()", () => {
  const source = readBatchPage();
  assert.match(source, /batchListNewButton/);
});

test("batch page still renders collapsible BatchConceptCard as optional deeper explanation", () => {
  const source = readBatchPage();
  assert.match(source, /BatchConceptCard/);
});

test("batch page stable header does not contain hardcoded English", () => {
  const source = readBatchPage();
  assert.doesNotMatch(source, /Run many requests as one job/);
  assert.doesNotMatch(source, /1 \· Upload JSONL/);
  assert.doesNotMatch(source, /2 \· Create batch/);
  assert.doesNotMatch(source, /3 \· Get results/);
});

test("new i18n keys exist in en.json common namespace", () => {
  const enKeys = JSON.parse(
    fs.readFileSync(
      path.join(repoRoot, "src/i18n/messages/en.json"),
      "utf8"
    )
  ).common || {};
  const requiredKeys = [
    "batchHeaderSubtitle",
    "batchStep1",
    "batchStep2",
    "batchStep3",
    "batchStep1Desc",
    "batchStep2Desc",
    "batchStep3Desc",
  ];
  for (const key of requiredKeys) {
    assert.ok(key in enKeys, `Missing i18n key in en.json common namespace: ${key}`);
  }
});