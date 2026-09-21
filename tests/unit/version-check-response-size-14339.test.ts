/**
 * #14339 — the two HTTP version lookups must survive the payloads the real
 * sources actually send, while still refusing an unbounded one.
 *
 * `MAX_VERSION_RESPONSE_BYTES` was 16 KiB, but the live documents are bigger
 * than that (measured from this box on 2026-09-21, both served without a
 * `Content-Length` so only the in-stream bound can fire):
 *
 *   https://registry.npmjs.org/omniroute/latest                    29,609 bytes
 *   https://api.github.com/.../releases/latest                    154,002 bytes
 *
 * So both fallbacks cancelled the body mid-read, threw "response is too large",
 * swallowed it in their own `catch`, and returned null - which is the
 * `"latest":"unavailable"` banner failure. No `npm` binary (Docker, desktop)
 * means all three sources then report nothing.
 *
 * Run: node --import tsx/esm --test tests/unit/version-check-response-size-14339.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

const { getLatestVersionFromRegistry, getLatestVersionFromGitHub } =
  await import("../../src/lib/system/versionCheck.ts");

const REGISTRY_PAYLOAD_BYTES = 29_609;
const GITHUB_PAYLOAD_BYTES = 154_002;

function jsonPayload(fields: Record<string, string>, targetBytes: number): string {
  const skeleton = JSON.stringify({ ...fields, pad: "" });
  const padding = "x".repeat(Math.max(0, targetBytes - skeleton.length));
  return JSON.stringify({ ...fields, pad: padding });
}

/** A chunked body with no Content-Length, exactly like the real responses. */
function streamingResponse(body: string): Response {
  const bytes = new TextEncoder().encode(body);
  const middle = Math.ceil(bytes.length / 2);
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes.slice(0, middle));
      controller.enqueue(bytes.slice(middle));
      controller.close();
    },
  });
  return new Response(stream, { status: 200 });
}

test("#14339: the registry lookup reads the real 29 KB per-version document", async () => {
  const body = jsonPayload({ version: "9.9.9" }, REGISTRY_PAYLOAD_BYTES);

  const version = await getLatestVersionFromRegistry(async () => streamingResponse(body));

  assert.equal(version, "9.9.9");
});

test("#14339: the GitHub lookup reads the real 154 KB releases payload", async () => {
  const body = jsonPayload({ tag_name: "v9.9.9" }, GITHUB_PAYLOAD_BYTES);

  const tag = await getLatestVersionFromGitHub(async () => streamingResponse(body));

  assert.equal(tag, "v9.9.9");
});

test("#14339: a genuinely oversized response is still refused", async () => {
  const body = jsonPayload({ version: "9.9.9" }, 32 * 1024 * 1024);

  const version = await getLatestVersionFromRegistry(async () => streamingResponse(body));

  assert.equal(version, null);
});
