#!/usr/bin/env node

import {
  resolveRuntimePorts,
  withRuntimePortEnv,
  spawnWithForwardedSignals,
} from "./runtime-env.mjs";

const mode = process.argv[2] === "start" ? "start" : "dev";

const runtimePorts = resolveRuntimePorts();
const { dashboardPort } = runtimePorts;

const args = ["./node_modules/next/dist/bin/next", mode, "--port", String(dashboardPort)];
if (mode === "dev") {
  args.splice(2, 0, "--webpack");
}

spawnWithForwardedSignals(process.execPath, args, {
  stdio: "inherit",
  env: withRuntimePortEnv(process.env, runtimePorts),
});
