import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";

import {
  connectObscuraBrowser,
  ensureObscuraServer,
  killSharedObscuraServer,
  isObscuraUsable,
} from "../../open-sse/services/obscura.ts";

// #12274 — Obscura-first browser engine. The shared server is process-lifetime;
// each test resets it so suites run independently. When `obscura` is not
// installed the live tests skip; the null-return path is still covered.

const BIN_RESULT = spawnSync("which", ["obscura"], { encoding: "utf8" });
const HAS_OBSCURA = BIN_RESULT.status === 0 && BIN_RESULT.stdout.trim().length > 0;

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const address = srv.address();
      srv.close(() => {
        if (address && typeof address === "object") resolve(address.port);
        else reject(new Error("no free port"));
      });
    });
  });
}

async function waitForCdp(endpoint: string, timeoutMs = 30_000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 1500);
      // Probe /json/version (Obscura's bare "/" never completes a response).
      const probe = endpoint.replace(/^ws/, "http").replace(/\/$/, "") + "/json/version";
      const res = await fetch(probe, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  return false;
}

describe("obscura engine", () => {
  it("respects OMNIROUTE_BROWSER_POOL=off", () => {
    const original = process.env.OMNIROUTE_BROWSER_POOL;
    process.env.OMNIROUTE_BROWSER_POOL = "off";
    try {
      assert.equal(isObscuraUsable(), false);
    } finally {
      if (original === undefined) delete process.env.OMNIROUTE_BROWSER_POOL;
      else process.env.OMNIROUTE_BROWSER_POOL = original;
    }
  });

  it("is enabled by default (no env var)", () => {
    const original = process.env.OMNIROUTE_BROWSER_POOL;
    delete process.env.OMNIROUTE_BROWSER_POOL;
    try {
      assert.equal(isObscuraUsable(), true);
    } finally {
      if (original !== undefined) process.env.OMNIROUTE_BROWSER_POOL = original;
    }
  });

  it("returns null when the binary is absent or cannot start", async () => {
    killSharedObscuraServer();
    const originalBin = process.env.OBSCURA_BIN;
    const originalEndpoint = process.env.OBSCURA_CDP_ENDPOINT;
    process.env.OBSCURA_BIN = "/nonexistent/obscura";
    delete process.env.OBSCURA_CDP_ENDPOINT;
    try {
      const server = await ensureObscuraServer();
      assert.equal(server, null);
    } finally {
      if (originalBin === undefined) delete process.env.OBSCURA_BIN;
      else process.env.OBSCURA_BIN = originalBin;
      if (originalEndpoint === undefined) delete process.env.OBSCURA_CDP_ENDPOINT;
      else process.env.OBSCURA_CDP_ENDPOINT = originalEndpoint;
      killSharedObscuraServer();
    }
  });

  it("round-trips a page through Obscura when installed", async (t) => {
    killSharedObscuraServer();
    if (!HAS_OBSCURA) {
      t.skip("obscura binary not installed");
      return;
    }
    try {
      const connection = await connectObscuraBrowser();
      assert.ok(connection, "expected a live Obscura connection");
      const { browser } = connection;
      const context = await browser.newContext({ userAgent: "obscura-integration-test" });
      const page = await context.newPage();
      await page.goto("https://example.com", { waitUntil: "domcontentloaded", timeout: 30000 });
      const title = await page.title();
      assert.equal(title, "Example Domain");
      await context.close();
      await browser.close();
    } finally {
      killSharedObscuraServer();
    }
  });

  it("connects to an external endpoint without owning its process", async (t) => {
    void t;  
    killSharedObscuraServer();
    if (!HAS_OBSCURA) {
      t.skip("obscura binary not installed");
      return;
    }
    // Standalone server we own outside the module, referenced as "external".
    const port = await freePort();
    const child = spawn(
      process.env.OBSCURA_BIN ?? "obscura",
      ["serve", "--port", String(port), "--host", "127.0.0.1"],
      { stdio: ["ignore", "ignore", "pipe"] }
    );
    const endpoint = `http://127.0.0.1:${port}`;
    const ready = await waitForCdp(endpoint);
    if (!ready) {
      child.kill("SIGKILL");
      t.skip("external obscura server did not come up");
      return;
    }
    const originalBin = process.env.OBSCURA_BIN;
    const originalEndpoint = process.env.OBSCURA_CDP_ENDPOINT;
    process.env.OBSCURA_CDP_ENDPOINT = endpoint;
    process.env.OBSCURA_BIN = "/nonexistent/obscura"; // force the external path
    try {
      const connection = await connectObscuraBrowser();
      assert.ok(connection);
      assert.equal(connection.child, null, "external endpoint must not own a child process");
      assert.ok(connection.browser.version().length > 0);
      await connection.browser.close();
    } finally {
      if (originalBin === undefined) delete process.env.OBSCURA_BIN;
      else process.env.OBSCURA_BIN = originalBin;
      if (originalEndpoint === undefined) delete process.env.OBSCURA_CDP_ENDPOINT;
      else process.env.OBSCURA_CDP_ENDPOINT = originalEndpoint;
      child.kill("SIGKILL");
      killSharedObscuraServer();
    }
  });
});
