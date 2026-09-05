import { describe, it } from "node:test";
import { ok, equal } from "node:assert/strict";

describe("Response compression verification (#6736)", () => {
  it("next.config.mjs has compress: true", async () => {
    // Read the config file and verify compression is enabled
    const fs = await import("fs");
    const content = fs.readFileSync("next.config.mjs", "utf-8");
    ok(content.includes("compress: true"), "Next.js compression should be enabled");
  });

  it("stripStaleForwardingHeaders deletes content-encoding", async () => {
    const { stripStaleForwardingHeaders } = await import(
      "@/../open-sse/handlers/chatCore/responseHeaders"
    );
    const headers = new Headers({ "content-encoding": "gzip", "x-custom": "keep" });
    stripStaleForwardingHeaders(headers);
    equal(headers.has("content-encoding"), false, "content-encoding should be stripped");
    ok(headers.has("x-custom"), "custom headers should survive");
  });

  it("stripStaleForwardingHeaders deletes content-length and transfer-encoding", async () => {
    const { stripStaleForwardingHeaders } = await import(
      "@/../open-sse/handlers/chatCore/responseHeaders"
    );
    const headers = new Headers({
      "content-length": "1024",
      "content-encoding": "gzip",
      "transfer-encoding": "chunked",
    });
    stripStaleForwardingHeaders(headers);
    equal(headers.has("content-length"), false);
    equal(headers.has("content-encoding"), false);
    equal(headers.has("transfer-encoding"), false);
  });
});
