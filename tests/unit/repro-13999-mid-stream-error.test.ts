/**
 * Regression test for #13999 item 1: GET /api/logs/export's ReadableStream
 * had no try/catch around the row-iteration loop inside `start()`. When the
 * row source threw mid-iteration, the stream had ALREADY sent `200 OK` +
 * `Content-Disposition` + a valid-looking JSON header + some rows, and the
 * route never called `controller.error()` or logged anything.
 *
 * IMPORTANT finding (from the original triage): calling `route.GET()`
 * directly in-process and reading the resulting `Response` does NOT
 * reproduce the reported symptom — Node's spec-compliant ReadableStream
 * auto-errors the stream when an async `start()` rejects, so an in-memory
 * `response.text()` correctly rejects. The silent hang only appeared once
 * the Response body crossed a REAL HTTP transport (exactly what the
 * dashboard's `fetch()` does): piping a Web ReadableStream into a Node
 * `http.ServerResponse` via `Readable.fromWeb(...).pipe(res)` does NOT call
 * `res.end()`/`res.destroy()` when the source errors — the connection was
 * left open, so the client's `fetch()`/`res.text()` never resolved AND
 * never rejected.
 *
 * The fix makes the route catch the mid-iteration error itself, log it, and
 * close the JSON document out cleanly with a trailing `error`/`emitted`
 * marker instead of letting the stream error — so the HTTP response always
 * completes (no hang) and the client can detect the truncation from the
 * response body itself.
 *
 * This test spins up a real (loopback, ephemeral-port) `http.Server` whose
 * request handler calls the REAL `route.GET()` and bridges its Response the
 * same way any Node-based HTTP adapter would, then makes a REAL `fetch()`
 * against it — proving the response settles, not just asserting on the
 * in-process Response object.
 *
 * Run: node --experimental-test-module-mocks --import tsx/esm --test tests/unit/repro-13999-mid-stream-error.test.ts
 */
import { test, mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { Readable } from "node:stream";
import type { ReadableStream as NodeWebReadableStream } from "node:stream/web";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-logs-export-13999-"));
process.env.DATA_DIR = TEST_DATA_DIR;

if (typeof mock.module !== "function") {
  test("(skipped) requires --experimental-test-module-mocks", () => {
    assert.ok(true);
  });
} else {
  // Mock the DB-layer module the route imports from ("@/lib/usage/callLogs"),
  // resolved here via the same relative path the sibling #13123 test uses
  // directly (tests/unit/logs-export-streaming-13123.test.ts:23) — proving
  // the specifier resolves to the same file the route sees.
  mock.module("../../src/lib/usage/callLogs.ts", {
    exports: {
      countCallLogsSince: () => 3,
      iterateCallLogsSince: async function* () {
        yield { id: "call-0", note: "first row hydrated fine" };
        yield { id: "call-1", note: "second row hydrated fine" };
        // Simulate a DB error hydrating the 3rd row (getCallLogById throwing,
        // a corrupt artifact read, a connection blip, etc.) — exactly the
        // failure mode #13999 describes: it happens strictly AFTER headers
        // and the first chunks have already gone out over the wire.
        throw new Error("simulated DB error hydrating call-2 mid-stream");
      },
    },
  });

  const route = await import("../../src/app/api/logs/export/route.ts");

  test("#13999: a mid-stream DB error must not hang the real HTTP response — it must settle with a truncation marker", async () => {
    const server = http.createServer(async (req, res) => {
      const response = await route.GET(
        new Request(`http://localhost${req.url}`, {
          headers: req.headers as Record<string, string>,
        })
      );
      res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
      if (!response.body) {
        res.end();
        return;
      }
      const nodeStream = Readable.fromWeb(
        response.body as unknown as NodeWebReadableStream<Uint8Array>
      );
      nodeStream.on("error", () => {});
      nodeStream.pipe(res);
    });

    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;

    try {
      const abortController = new AbortController();
      const readPromise = fetch(
        `http://localhost:${port}/api/logs/export?hours=168&type=call-logs`,
        {
          signal: abortController.signal,
        }
      ).then((r) => r.text());

      let settled = false;
      let settledText: string | null = null;
      readPromise.then(
        (text) => {
          settled = true;
          settledText = text;
        },
        () => {
          settled = true;
        }
      );

      // Give the real request a generous window to either succeed (with a
      // clear truncation signal) or fail cleanly. Fixed behavior settles
      // almost immediately; this window only guards against a regression.
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!settled) {
        abortController.abort();
      }

      assert.equal(
        settled,
        true,
        "#13999 regressed: the export HTTP response neither resolved nor rejected " +
          "within 2s of a mid-stream DB error — it hung again."
      );

      assert.ok(settledText, "expected the response body to be readable text");
      const parsed = JSON.parse(settledText as unknown as string);
      assert.equal(
        parsed.emitted,
        2,
        "expected exactly the 2 successfully-hydrated rows to be marked emitted"
      );
      assert.equal(
        parsed.logs.length,
        2,
        "expected exactly the 2 successfully-hydrated rows in the body"
      );
      assert.ok(
        typeof parsed.error === "string" && parsed.error.length > 0,
        "expected a sanitized error message surfaced in the truncated JSON body"
      );
    } finally {
      server.close();
    }
  });
}
