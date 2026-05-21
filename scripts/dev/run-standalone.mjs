#!/usr/bin/env node

import {
  resolveRuntimePorts,
  withRuntimePortEnv,
  spawnWithForwardedSignals,
} from "../build/runtime-env.mjs";
import { bootstrapEnv } from "../build/bootstrap-env.mjs";

const env = bootstrapEnv();
const runtimePorts = resolveRuntimePorts(env);

spawnWithForwardedSignals("node", ["server.js"], {
  stdio: "inherit",
  env: withRuntimePortEnv(env, runtimePorts),
});
