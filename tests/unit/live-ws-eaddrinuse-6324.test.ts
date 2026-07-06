import { test, describe } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

// #6324 regression: startLiveDashboardServer must REJECT on a bind failure
// (e.g. EADDRINUSE when the API bridge already holds 20129) rather than let the
// error surface as an unhandled 'error' event that crashes the process. The
// 3.8.45 standalone bin auto-imports liveServer.ts, whose module-level start
// already has a `.catch`; before this fix the listen error never reached it.
//
// Importing liveServer.ts is safe here: its auto-start guard is short-circuited
// by isBuildOrTest() (the node:test runner passes "--test" in process.argv).
const { startLiveDashboardServer } = await import("../../src/server/ws/liveServer.ts");

function occupyPort(host: string): Promise<{ port: number; release: () => Promise<void> }> {
  return new Promise((resolve, reject) => {
    const blocker = net.createServer();
    blocker.once("error", reject);
    blocker.listen(0, host, () => {
      const address = blocker.address();
      if (address && typeof address === "object") {
        resolve({
          port: address.port,
          release: () => new Promise<void>((r) => blocker.close(() => r())),
        });
      } else {
        blocker.close(() => reject(new Error("Failed to allocate a port")));
      }
    });
  });
}

describe("#6324 LiveWS start degrades gracefully on port conflict", () => {
  test("startLiveDashboardServer rejects with EADDRINUSE when the port is taken", async () => {
    const host = "127.0.0.1";
    const { port, release } = await occupyPort(host);
    try {
      await assert.rejects(
        () => startLiveDashboardServer(port, host),
        (err: NodeJS.ErrnoException) => {
          assert.equal(err.code, "EADDRINUSE");
          return true;
        }
      );
    } finally {
      await release();
    }
  });
});
