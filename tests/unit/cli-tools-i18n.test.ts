import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const en = require("../../src/i18n/messages/en.json");

test("CLI tools English messages include custom tab label and keep OpenCode baseUrl command literal", () => {
  assert.equal(en.cliTools?.customCliTab, "Custom CLI");
  assert.equal(
    en.cliTools?.guides?.opencode?.steps?.[3]?.desc,
    "opencode config set baseUrl {{baseUrl}}",
    "OpenCode baseUrl command must remain a literal command template"
  );
});
