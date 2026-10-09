/**
 * Regression probe for #15300 — zai-web 502 "browserType.launch: Target page, context or
 * browser has been closed" in the Docker `-web` image.
 *
 * zai-web requests a HEADED Chromium (headless: false, off-screen window). Docker runner-web
 * has no X server and nothing starts Xvfb, so Chromium exits at launch and Playwright throws
 * "browserType.launch: Target page, context or browser has been closed" (browser log:
 * "Missing X server or $DISPLAY"). That is surfaced as a bare 502 with no actionable hint.
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";

const TEST_TOKEN = `e30.${Buffer.from(JSON.stringify({ id: "user-123" })).toString("base64url")}.sig`;

describe("issue #15300 — zai-web headed launch without a display", () => {
  const saved: Record<string, string | undefined> = {};
  before(() => {
    for (const k of ["DISPLAY", "WAYLAND_DISPLAY"]) {
      saved[k] = process.env[k];
      delete process.env[k];
    }
  });
  after(async () => {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
    const pool = await import("../../open-sse/services/browserPool.ts");
    await (pool as { shutdownBrowserPool?: () => Promise<void> }).shutdownBrowserPool?.();
  });

  it("does not surface a bare 502 'browserType.launch' failure (must self-provide a display or return an actionable 503 + cooldown hint)", async () => {
    const mod = await import("../../open-sse/executors/zai-web.ts");
    const executor = new mod.ZaiWebExecutor();
    const result = await executor.execute({
      model: "glm-5.3-flash",
      body: { model: "glm-5.3-flash", messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: TEST_TOKEN },
      signal: null,
    });
    const response = (result as { response: Response }).response;
    const payload = (await response.json()) as { error?: { message?: string } };
    const msg = payload.error?.message ?? "";
    console.log(
      "STATUS",
      response.status,
      "HINT",
      response.headers.get("X-Omni-Fallback-Hint"),
      "MSG",
      msg.slice(0, 300)
    );
    const bareLaunchFailure = response.status === 502 && /browserType\.launch/.test(msg);
    assert.equal(bareLaunchFailure, false, `bare 502 launch failure: ${msg}`);
  });
});
