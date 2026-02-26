#!/usr/bin/env node

import {
  resolveRuntimePorts,
  withRuntimePortEnv,
  spawnWithForwardedSignals,
} from "./runtime-env.mjs";

const runtimePorts = resolveRuntimePorts();

spawnWithForwardedSignals("node", ["server.js"], {
  stdio: "inherit",
  env: withRuntimePortEnv(process.env, runtimePorts),
});
