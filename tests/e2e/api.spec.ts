import { test, expect } from "@playwright/test";

test.describe("API Health Checks", () => {
  test("GET /api/health returns OK", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body).toHaveProperty("status");
  });

  test("GET /api/v1/models returns model list", async ({ request }) => {
    const res = await request.get("/api/v1/models");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body).toHaveProperty("data");
    expect(Array.isArray(body.data)).toBe(true);
  });

  test("GET /api/providers returns provider list", async ({ request }) => {
    const res = await request.get("/api/providers");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });
});
