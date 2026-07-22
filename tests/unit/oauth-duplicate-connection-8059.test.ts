import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(
  join(__dirname, "../../src/lib/oauth/connectionPersistence.ts"),
  "utf-8"
);

test("#8059 — connectionId match happens before email gate", () => {
  // connectionId-first match block must exist
  assert.ok(src.includes("if (connectionId)"), "connectionId-first match block missing");

  const emailGateIdx = src.indexOf("if (!connection && tokenData.email)");
  assert.ok(emailGateIdx > -1, "email gate block must exist");

  const connIdBlockIdx = src.indexOf("if (connectionId)");
  assert.ok(
    connIdBlockIdx > -1 && connIdBlockIdx < emailGateIdx,
    "connectionId block must appear BEFORE the email gate"
  );
});

test("#8059 — old inline connectionId check removed from email gate", () => {
  const oldInlineCheck = "if (c.id && safeEqual(connectionId, c.id)) return true;";
  assert.ok(!src.includes(oldInlineCheck), "old inline connectionId check must be removed");
});
