import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

test("ecosystem CLI boots the trusted-peer custom server on loopback", async () => {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-ecosystem-entry-"));
  const probe = createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const address = probe.address();
  assert.ok(address && typeof address === "object");
  const port = address.port;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  try {
    mkdirSync(join(dir, "scripts/dev"), { recursive: true });
    mkdirSync(join(dir, "scripts/build"), { recursive: true });
    mkdirSync(join(dir, "node_modules/vitest"), { recursive: true });
    for (const file of ["scripts/dev/run-ecosystem-tests.mjs", "scripts/build/runtime-env.mjs"]) {
      copyFileSync(file, join(dir, file));
    }
    // Process-boundary fixtures: the custom entrypoint is available; a bare Next
    // entrypoint is deliberately absent. No product auth policy is replaced.
    writeFileSync(
      join(dir, "scripts/dev/run-next.mjs"),
      `
      import { createServer } from "node:http";
      if (process.env.HOST !== "127.0.0.1") process.exit(41);
      if (process.env.OMNIROUTE_E2E_BOOTSTRAP_MODE !== "open") process.exit(42);
      createServer((_req, res) => res.end("{}")).listen(Number(process.env.PORT), process.env.HOST);
    `
    );
    writeFileSync(
      join(dir, "node_modules/vitest/vitest.mjs"),
      `
      const result = await fetch(process.env.OMNIROUTE_BASE_URL + "/api/monitoring/health");
      process.exit(result.ok ? 0 : 43);
    `
    );
    const child = spawn(process.execPath, ["scripts/dev/run-ecosystem-tests.mjs"], {
      cwd: dir,
      env: {
        ...process.env,
        OMNIROUTE_BASE_URL: "",
        OMNIROUTE_E2E_BOOTSTRAP_MODE: "open",
        DATA_DIR: join(dir, "data"),
        HOST: "",
        PORT: String(port),
        DASHBOARD_PORT: String(port),
        ECOSYSTEM_SERVER_WAIT_MS: "4000",
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.on("data", (chunk) => {
      output += chunk;
    });
    const exit = await new Promise((resolve, reject) => {
      child.once("error", reject);
      child.once("exit", resolve);
    });
    assert.equal(exit, 0, output);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
