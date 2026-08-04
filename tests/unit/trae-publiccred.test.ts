import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("trae_id embedded default decodes to the public Trae OAuth client_id", () => {
  assert.equal(resolvePublicCred("trae_id"), "en1oxy7wnw8j9n");
});

test("TRAE_OAUTH_CLIENT_ID env override wins over the embedded default", () => {
  const prev = process.env.TRAE_OAUTH_CLIENT_ID;
  process.env.TRAE_OAUTH_CLIENT_ID = "test-trae-client-id";
  try {
    assert.equal(resolvePublicCred("trae_id", "TRAE_OAUTH_CLIENT_ID"), "test-trae-client-id");
  } finally {
    if (prev === undefined) delete process.env.TRAE_OAUTH_CLIENT_ID;
    else process.env.TRAE_OAUTH_CLIENT_ID = prev;
  }
});

test("trae.ts no longer embeds the raw client_id literal (Hard Rule #11)", () => {
  const src = fs.readFileSync(
    path.join(repoRoot, "open-sse/executors/trae.ts"),
    "utf8"
  ) as string;
  assert.ok(
    !src.includes("en1oxy7wnw8j9n"),
    "trae.ts must resolve the client_id via resolvePublicCred(), not a string literal"
  );
  assert.ok(
    src.includes('resolvePublicCred("trae_id", "TRAE_OAUTH_CLIENT_ID")'),
    "trae.ts must call resolvePublicCred for the Trae client_id"
  );
});
