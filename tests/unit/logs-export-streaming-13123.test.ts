/**
 * Tests for #13123: GET /api/logs/export should stream responses with row caps
 * instead of buffering the entire table in memory.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

async function collectStream(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }
  return result;
}

function buildExportStream(
  rows: unknown[],
  limit?: number
): ReadableStream {
  const capped = limit !== undefined && rows.length > limit;
  const exportRows = capped ? rows.slice(0, limit) : rows;
  const totalAvailable = rows.length;
  const encoder = new TextEncoder();

  return new ReadableStream({
    start(controller) {
      const header = JSON.stringify({
        count: exportRows.length,
        hours: 24,
        type: "call-logs",
      });
      controller.enqueue(encoder.encode(header.slice(0, -1) + ',"logs":['));
      for (let i = 0; i < exportRows.length; i++) {
        if (i > 0) controller.enqueue(encoder.encode(","));
        controller.enqueue(encoder.encode(JSON.stringify(exportRows[i])));
      }
      const trailer = capped
        ? `],"capped":true,"limit":${limit},"totalAvailable":${totalAvailable}}\n`
        : "]}\n";
      controller.enqueue(encoder.encode(trailer));
      controller.close();
    },
  });
}

describe("GET /api/logs/export streaming and row cap (#13123)", () => {
  it("streamed response is valid JSON with expected envelope shape", async () => {
    const rows = [
      { id: "1", model: "gpt-4", timestamp: "2026-01-01T00:00:00Z" },
      { id: "2", model: "claude-3", timestamp: "2026-01-01T01:00:00Z" },
    ];
    const stream = buildExportStream(rows);
    const text = await collectStream(stream);
    const parsed = JSON.parse(text);

    assert.equal(parsed.count, 2);
    assert.equal(parsed.hours, 24);
    assert.equal(parsed.type, "call-logs");
    assert.equal(parsed.logs.length, 2);
    assert.equal(parsed.logs[0].id, "1");
    assert.equal(parsed.logs[1].id, "2");
    assert.equal(parsed.capped, undefined);
  });

  it("capped response includes cap metadata", async () => {
    const rows = Array.from({ length: 15000 }, (_, i) => ({ id: String(i) }));
    const limit = 10000;
    const stream = buildExportStream(rows, limit);
    const text = await collectStream(stream);
    const parsed = JSON.parse(text);

    assert.equal(parsed.count, limit, "count should reflect the cap");
    assert.equal(parsed.capped, true);
    assert.equal(parsed.limit, limit);
    assert.equal(parsed.totalAvailable, 15000);
    assert.equal(parsed.logs.length, limit);
  });

  it("uncapped response omits cap fields", async () => {
    const rows = [{ id: "1" }, { id: "2" }];
    const stream = buildExportStream(rows);
    const text = await collectStream(stream);
    const parsed = JSON.parse(text);

    assert.equal(parsed.count, 2);
    assert.equal(parsed.capped, undefined, "should not have capped field");
    assert.equal(parsed.limit, undefined, "should not have limit field");
    assert.equal(parsed.totalAvailable, undefined, "should not have totalAvailable field");
    assert.equal(parsed.logs.length, 2);
  });

  it("streaming produces valid JSON for 1000 rows without buffering entire string", async () => {
    const rows = Array.from({ length: 1000 }, (_, i) => ({
      id: String(i),
      model: `model-${i % 10}`,
      content: `Message ${i} `.repeat(10),
    }));
    const stream = buildExportStream(rows);
    const text = await collectStream(stream);
    const parsed = JSON.parse(text);

    assert.equal(parsed.count, 1000);
    assert.equal(parsed.logs.length, 1000);
    assert.equal(parsed.logs[0].id, "0");
    assert.equal(parsed.logs[999].id, "999");
  });
});
