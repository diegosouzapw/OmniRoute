import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// #5695 — the dashboard Quick Start step 1 told users to "Go to Endpoint ->
// Registered Keys", linking to /dashboard/endpoint. But API keys are created on
// the API Manager page (/dashboard/api-manager, sidebar label "API Keys"); the
// Endpoint page has no "Registered Keys" section. Users followed the link and
// could not find where to create a key. Step 1 must point at API Keys.

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
  resolve(here, "../../../src/app/(dashboard)/dashboard/HomePageClient.tsx"),
  "utf8"
);
const messages = JSON.parse(
  readFileSync(resolve(here, "../../../src/i18n/messages/en.json"), "utf8")
) as { home: { step1Desc: string } };

test("#5695 Quick Start step 1 links to the API Manager (API Keys), not Endpoint", () => {
  // The endpoint render-prop Link inside the step1Desc rich block.
  const hrefMatch = source.match(/t\.rich\("step1Desc"[\s\S]*?<Link href="([^"]*)"/);
  assert.ok(hrefMatch, "expected to find the step1Desc endpoint Link in HomePageClient.tsx");
  assert.equal(
    hrefMatch![1],
    "/dashboard/api-manager",
    "Quick Start step 1 must link to /dashboard/api-manager where API keys are created"
  );
});

test("#5695 step1Desc copy points at API Keys, not the nonexistent Endpoint→Registered Keys", () => {
  const desc = messages.home.step1Desc;
  assert.ok(desc.includes("API Keys"), `step1Desc should mention "API Keys"; got: "${desc}"`);
  assert.ok(
    !desc.includes("Registered Keys"),
    `step1Desc must not send users to "Registered Keys" under Endpoint; got: "${desc}"`
  );
});
