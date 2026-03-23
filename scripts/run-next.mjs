#!/usr/bin/env node

import {
  resolveRuntimePorts,
  withRuntimePortEnv,
  spawnWithForwardedSignals,
} from "./runtime-env.mjs";
import { bootstrapEnv } from "./bootstrap-env.mjs";

const mode = process.argv[2] === "start" ? "start" : "dev";

const runtimePorts = resolveRuntimePorts();
const { dashboardPort } = runtimePorts;

// Auto-generate secrets on first run, merge .env + process.env
const env = bootstrapEnv();

const args = ["./node_modules/next/dist/bin/next", mode, "--port", String(dashboardPort)];
// Default: use webpack (stable). Set OMNIROUTE_USE_TURBOPACK=1 to use Turbopack (faster dev).
if (mode === "dev" && process.env.OMNIROUTE_USE_TURBOPACK !== "1") {
  args.splice(2, 0, "--webpack");
}

spawnWithForwardedSignals(process.execPath, args, {
  stdio: "inherit",
  env: withRuntimePortEnv(env, runtimePorts),
});
