import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const en = require("../../src/i18n/messages/en.json");

test("CLI tools English messages include custom tab label and keep OpenCode baseUrl command literal", () => {
  assert.equal(en.cliTools?.customCliTab, "Custom CLI");
  assert.equal(
    en.cliTools?.guides?.opencode?.steps?.[3]?.desc,
    "opencode config set baseUrl {baseUrl}",
    "OpenCode baseUrl command must use injectable ICU syntax"
  );
});

test("CLI tools locale messages use ICU baseUrl placeholder for OpenCode step 3", async () => {
  const messagesDir = path.join(process.cwd(), "src/i18n/messages");
  const files = (await fs.readdir(messagesDir)).filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const content = JSON.parse(await fs.readFile(path.join(messagesDir, file), "utf-8"));
    const desc = content?.cliTools?.guides?.opencode?.steps?.["3"]?.desc;
    if (typeof desc !== "string") continue;

    assert.equal(
      desc.includes("{baseUrl}") && !desc.includes("{{baseUrl}}"),
      true,
      `${file} should use ICU-style {baseUrl} placeholder`
    );
  }
});
