import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const barrelPath = path.resolve(here, "../../../open-sse/handlers/chatCore.ts");
const leafPath = path.resolve(here, "../../../open-sse/handlers/chatCore/requestPrelude.ts");

test("requestPrelude leaf exists", () => {
  assert.equal(fs.existsSync(leafPath), true);
});

test("barrel no longer inlines handleBypassRequest", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  assert.equal(
    src.includes("handleBypassRequest(body, model, userAgent)"),
    false,
    "front-door bypass must leave the barrel"
  );
});
