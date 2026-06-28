import test from "node:test";
import assert from "node:assert/strict";
import { renderTerraformPlan } from "../../../open-sse/services/compression/engines/rtk/renderers/terraformPlan.ts";

const det = {
  type: "terraform-plan",
  command: "terraform plan",
  confidence: 1,
  category: "infra",
  matchedPatterns: [],
};

test("summarizes plan into +N ~M -K plus resources", () => {
  const input = `Terraform will perform the following actions:
  # aws_instance.web will be created
  + resource "aws_instance" "web" { ... many lines ... }
  # aws_s3_bucket.data will be updated in-place
  ~ resource "aws_s3_bucket" "data" { ... }
Plan: 1 to add, 1 to change, 0 to destroy.`;
  const r = renderTerraformPlan(input, det);
  assert.equal(r.changed, true);
  assert.ok(r.text.includes("Plan: +1 ~1 -0"));
  assert.ok(r.text.includes("aws_instance.web"));
  assert.ok(!r.text.includes('resource "aws_instance" "web" {'));
});

test("no-changes ⇒ no-op", () => {
  const r = renderTerraformPlan(
    "No changes. Your infrastructure matches the configuration.",
    det,
  );
  assert.equal(r.changed, false);
});
