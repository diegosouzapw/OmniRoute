import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RU_MESSAGES_PATH = path.resolve(__dirname, "..", "..", "src", "i18n", "messages", "ru.json");
const PLACEHOLDER_PREFIX = "__MISSING__:";

const VISIBLE_LABEL_KEYS = {
  providers: [
    "testAllModels",
    "testAllModelsConfirm",
    "testingAllModels",
    "showAllModels",
    "showVisibleOnly",
    "showHiddenOnly",
    "freeFilterAll",
    "freeFilterFreeOnly",
    "freeFilterPaidOnly",
    "sortFreeFirst",
    "autoHideFailed",
    "autoHideFailedHint",
    "hideFailedAuto",
    "hideAllModels",
    "modelsActiveCount",
  ],
  usage: [
    "tokenExpiresIn",
    "tokenExpired",
    "redeemResetCredit",
    "deactivateAccount",
    "activateAccount",
    "accountActivated",
    "accountDeactivated",
    "toggleActiveFailed",
    "percentUsed",
  ],
} as const;

test("Russian visible dashboard labels do not render __MISSING__ sentinels", () => {
  const messages = JSON.parse(readFileSync(RU_MESSAGES_PATH, "utf8"));
  const offenders: string[] = [];

  for (const [namespace, keys] of Object.entries(VISIBLE_LABEL_KEYS)) {
    const bucket = messages[namespace] ?? {};
    for (const key of keys) {
      const value = bucket[key];
      if (value === undefined || value === null) {
        offenders.push(`${namespace}.${key} is absent`);
        continue;
      }
      if (typeof value !== "string" || value.trim() === "") {
        offenders.push(`${namespace}.${key} is empty/non-string`);
        continue;
      }
      if (value.startsWith(PLACEHOLDER_PREFIX)) {
        offenders.push(`${namespace}.${key} is sentinel "${value}"`);
      }
    }
  }

  assert.equal(
    offenders.length,
    0,
    `Russian dashboard labels must be real translations:\n${offenders.join("\n")}`
  );
});
