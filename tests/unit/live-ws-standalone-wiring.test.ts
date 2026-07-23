import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression guard for: "live-dashboard WebSocket daemon (port 20129) never
// starts in the packaged standalone bin." liveServer.ts auto-starts the daemon
// on import, but nothing imported it in the standalone/PM2 runtime — so the port
// never bound and every live dashboard showed "Live disabled — WebSocket
// disconnected." The fix wires the import into the Next instrumentation hook
// (instrumentation-node.ts), which is the module that actually runs in the
// packaged bin. This test asserts that wiring stays in place.
const __dirname = dirname(fileURLToPath(import.meta.url));
const instrumentationPath = resolve(__dirname, "../../src/instrumentation-node.ts");
const source = readFileSync(instrumentationPath, "utf8");

describe("standalone runtime wires the live-dashboard WebSocket daemon", () => {
  test("instrumentation-node.ts imports the live-WS server so its auto-start fires", () => {
    assert.match(
      source,
      /import\(\s*["']@\/server\/ws\/liveServer["']\s*\)/,
      "instrumentation-node.ts must import @/server/ws/liveServer so the port-20129 daemon starts in the standalone bin"
    );
  });

  test("the live-WS bootstrap is gated with the background-services block and is non-fatal", () => {
    // It must live inside the isBackgroundServicesDisabled() gate and be wrapped
    // so a bind failure never crashes startup.
    assert.match(source, /liveServer/);
    assert.match(source, /Live dashboard WebSocket daemon failed to start \(non-fatal\)/);
  });
});
