#!/usr/bin/env node
/** One-shot component harness: actual STT route over loopback, NOT a Next/release boot. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const directory = process.env.DATA_DIR;
if (
  !directory ||
  path.dirname(fs.realpathSync(directory)) !== "/tmp" ||
  !/^omniroute-video-live-[A-Za-z0-9]+$/.test(path.basename(fs.realpathSync(directory))) ||
  !process.argv.includes("--serve-isolated-component")
) {
  throw new Error("Explicit private homologation component mode required");
}
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";
const { POST } = await import("../../src/app/api/v1/audio/transcriptions/route.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const server = http.createServer(async (incoming, outgoing) => {
  if (incoming.method !== "POST" || incoming.url !== "/v1/audio/transcriptions") {
    outgoing.writeHead(404).end();
    return;
  }
  try {
    const chunks: Buffer[] = [];
    let length = 0;
    for await (const chunk of incoming) {
      const bytes = Buffer.from(chunk);
      length += bytes.length;
      if (length > 1024 * 1024) throw new Error("Component body cap exceeded");
      chunks.push(bytes);
    }
    const request = new Request("http://127.0.0.1:20428/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: incoming.headers.authorization || "",
        "Content-Type": incoming.headers["content-type"] || "application/octet-stream",
      },
      body: Buffer.concat(chunks),
    });
    const response = await POST(request);
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    outgoing.writeHead(500, { "Content-Type": "application/json" });
    outgoing.end(JSON.stringify({ error: { message: "Isolated STT component failed" } }));
  } finally {
    server.close(() => {
      resetDbInstance();
      process.exit(0);
    });
  }
});
server.listen(20428, "127.0.0.1", () => console.log("Isolated STT component ready"));
const timer = setTimeout(
  () =>
    server.close(() => {
      resetDbInstance();
      process.exit(1);
    }),
  180_000
);
timer.unref();
