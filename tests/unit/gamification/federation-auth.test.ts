import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Federation Leaderboard Auth", () => {
  it("rejects requests without Authorization header", async () => {
    const { GET } = await import("../../../src/app/api/gamification/federation/leaderboard/route");

    const { NextRequest } = await import("next/server");
    const req = new NextRequest("http://localhost/api/gamification/federation/leaderboard");

    const response = await GET(req);
    assert.equal(response.status, 401);
  });

  it("rejects requests with invalid bearer token", async () => {
    const { GET } = await import("../../../src/app/api/gamification/federation/leaderboard/route");
    const { NextRequest } = await import("next/server");
    const req = new NextRequest("http://localhost/api/gamification/federation/leaderboard", {
      headers: { Authorization: "Bearer invalid-token-12345" },
    });

    const response = await GET(req);
    assert.equal(response.status, 403);
  });
});
