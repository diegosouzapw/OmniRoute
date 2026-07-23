#!/usr/bin/env node

import { existsSync } from "node:fs";
import {
  resolveRuntimePorts,
  withRuntimePortEnv,
  resolveMaxOldSpaceMb,
  spawnWithForwardedSignals,
} from "../build/runtime-env.mjs";
import { bootstrapEnv } from "../build/bootstrap-env.mjs";

const env = bootstrapEnv();
const runtimePorts = resolveRuntimePorts(env);
const childEnv = withRuntimePortEnv(env, runtimePorts);

// #2939: honor OMNIROUTE_MEMORY_MB (default 512), the same knob
// `omniroute serve` uses, so Docker users can control the server heap under
// load / large SQLite DBs. A trailing --max-old-space-size wins, so this
// overrides the image fallback without clobbering any other NODE_OPTIONS flags.
const maxOldSpaceMb = resolveMaxOldSpaceMb(childEnv.OMNIROUTE_MEMORY_MB);
childEnv.NODE_OPTIONS =
  `${childEnv.NODE_OPTIONS || ""} --max-old-space-size=${maxOldSpaceMb}`.trim();

// Prefer the WS-aware wrapper (server-ws.mjs) over the bare Next standalone
// server.js: it installs the trusted peer-IP stamp (scripts/dev/peer-stamp.mjs)
// that the authz middleware needs to allow loopback/LAN access to LOCAL_ONLY
// routes. Falling back to server.js fails CLOSED (every LOCAL_ONLY request 403s)
// rather than trusting the spoofable Host header.
const entry = existsSync("server-ws.mjs") ? "server-ws.mjs" : "server.js";

spawnWithForwardedSignals("node", [entry], {
  stdio: "inherit",
  env: childEnv,
});
