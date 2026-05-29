import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const routePath = path.join(repoRoot, "src/app/api/usage/budget/route.ts");

test("/api/usage/budget enforces management auth inside GET and POST handlers", () => {
  const source = fs.readFileSync(routePath, "utf8");

  assert.match(source, /from ["']@\/lib\/api\/requireManagementAuth["']/);

  const getIndex = source.indexOf("export async function GET");
  const postIndex = source.indexOf("export async function POST");
  assert.ok(getIndex >= 0, "GET handler must exist");
  assert.ok(postIndex >= 0, "POST handler must exist");

  const getBody = source.slice(getIndex, postIndex);
  const postBody = source.slice(postIndex);

  assert.match(getBody, /const authError = await requireManagementAuth\(request\);/);
  assert.match(getBody, /if \(authError\) return authError;/);
  assert.ok(
    getBody.indexOf("requireManagementAuth(request)") < getBody.indexOf("new URL(request.url)"),
    "GET must authorize before reading arbitrary apiKeyId"
  );

  assert.match(postBody, /const authError = await requireManagementAuth\(request\);/);
  assert.match(postBody, /if \(authError\) return authError;/);
  assert.ok(
    postBody.indexOf("requireManagementAuth(request)") < postBody.indexOf("request.json()"),
    "POST must authorize before parsing budget mutations"
  );
});
