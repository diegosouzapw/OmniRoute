import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { GET } from "@/app/api/health/route";
import { APP_CONFIG } from "@/shared/constants/appConfig";

test("GET /api/health stays minimal: 200, no version anywhere", async () => {
  const res = await GET();
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("ETag"), null);
  assert.equal(res.headers.get("X-OmniRoute-Version"), null);
  const body = (await res.json()) as Record<string, unknown>;
  assert.equal(body.status, "ok");
  assert.ok(typeof body.timestamp === "string");
  assert.ok(!("version" in body));
});

test("system/version reads no package.json directly", async () => {
  const { readFileSync } = await import("node:fs");
  const src = readFileSync(path.join(process.cwd(), "src/app/api/system/version/route.ts"), "utf8");
  assert.ok(!src.includes("require("), "direct require(package.json) must be gone");
  assert.ok(src.includes("APP_CONFIG.version"));
  assert.equal(typeof APP_CONFIG.version, "string");
});
