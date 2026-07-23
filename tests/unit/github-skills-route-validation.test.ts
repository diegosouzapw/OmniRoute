// t06 route-validation: POST /api/github-skills must validate its body with a
// Zod schema (Hard Rule #7) instead of blind request.json() destructuring.
import { test } from "node:test";
import assert from "node:assert/strict";

const { POST } = await import("../../src/app/api/github-skills/route.ts");

function post(body: unknown): Request {
  return new Request("http://localhost/api/github-skills", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("POST github-skills: missing repoName → 400", async () => {
  const res = await POST(post({ targets: ["hermes"] }) as never);
  assert.equal(res.status, 400);
});

test("POST github-skills: non-array targets → 400 (was silently .map-crashing before Zod)", async () => {
  const res = await POST(post({ repoName: "a/b", targets: "hermes" }) as never);
  assert.equal(res.status, 400);
});

test("POST github-skills: valid body → 200 with per-target results and defaults applied", async () => {
  const res = await POST(post({ repoName: "owner/skill-repo" }) as never);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { skillName: string; results: { target: string }[] };
  assert.equal(body.skillName, "skill-repo");
  assert.equal(body.results[0].target, "hermes");
});

test("POST github-skills: 400 error body does not leak stack traces", async () => {
  const res = await POST(post({}) as never);
  const text = await res.text();
  assert.ok(!text.includes("at /"), "stack trace leaked");
});
