#!/usr/bin/env node

import { spawn } from "node:child_process";
import { sanitizeColorEnv } from "../build/runtime-env.mjs";

const defaultArgs = ["test", "tests/e2e/*.spec.ts"];
const forwardedArgs = process.argv.slice(2);
const args = forwardedArgs.length > 0 ? forwardedArgs : defaultArgs;
const playwrightEnv = sanitizeColorEnv(process.env);

delete playwrightEnv.NO_COLOR;
delete playwrightEnv.FORCE_COLOR;

const child = spawn(process.execPath, ["./node_modules/playwright/cli.js", ...args], {
  stdio: "inherit",
  env: playwrightEnv,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
