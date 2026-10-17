#!/usr/bin/env node
/** One-shot component harness: actual STT route over loopback, NOT a Next/release boot. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { timingSafeEqual } from "node:crypto";

import { buildErrorBody } from "../../open-sse/utils/error.ts";

import { validateVideoLiveContext } from "./video-live-smoke.ts";

export function createVideoLiveSttServer(options: {
  ownerKey: string;
  post: (request: Request) => Promise<Response>;
  onComplete?: () => void;
}) {
  if (!options.ownerKey) throw new Error("Explicit isolated owner key required");
  const expectedAuthorization = Buffer.from(`Bearer ${options.ownerKey}`);
  let claimed = false;
  const sendError = (outgoing: http.ServerResponse, status: number, message: string) => {
    outgoing.writeHead(status, { "Content-Type": "application/json" });
    outgoing.end(JSON.stringify(buildErrorBody(status, message)));
  };
  const server = http.createServer(async (incoming, outgoing) => {
    if (incoming.method !== "POST" || incoming.url !== "/v1/audio/transcriptions") {
      outgoing.writeHead(404).end();
      return;
    }
    const authorization = Buffer.from(incoming.headers.authorization || "");
    if (
      authorization.length !== expectedAuthorization.length ||
      !timingSafeEqual(authorization, expectedAuthorization)
    ) {
      sendError(outgoing, 401, "Isolated owner authorization required");
      return;
    }
    // Claim synchronously, before reading a streaming body or invoking a provider.
    // Invalid bodies/failures also consume this one-shot component instance.
    if (claimed) {
      sendError(outgoing, 409, "Isolated STT component already used");
      return;
    }
    claimed = true;
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
      const response = await options.post(request);
      outgoing.writeHead(response.status, Object.fromEntries(response.headers));
      outgoing.end(Buffer.from(await response.arrayBuffer()));
    } catch {
      sendError(outgoing, 500, "Isolated STT component failed");
    } finally {
      server.close(() => {
        options.onComplete?.();
      });
    }
  });
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const directory = process.env.DATA_DIR;
  if (
    !directory ||
    path.dirname(fs.realpathSync(directory)) !== "/tmp" ||
    !/^omniroute-video-live-[A-Za-z0-9]+$/.test(path.basename(fs.realpathSync(directory))) ||
    !process.argv.includes("--serve-isolated-component")
  ) {
    throw new Error("Explicit private homologation component mode required");
  }
  const context = validateVideoLiveContext(
    JSON.parse(fs.readFileSync(path.join(directory, "client-context.json"), "utf8"))
  );
  process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
  process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";
  const { POST } = await import("../../src/app/api/v1/audio/transcriptions/route.ts");
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  const server = createVideoLiveSttServer({
    ownerKey: context.owner,
    post: POST,
    onComplete: () => {
      resetDbInstance();
      process.exit(0);
    },
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
}
