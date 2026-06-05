import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

test("omniroute CLI entrypoint can print version", async () => {
  const { stdout } = await execFileAsync(process.execPath, ["bin/omniroute.mjs", "--version"], {
    cwd: process.cwd(),
    env: { ...process.env, DATA_DIR: "" },
  });

  assert.match(stdout, /\b\d+\.\d+\.\d+\b/);
});
