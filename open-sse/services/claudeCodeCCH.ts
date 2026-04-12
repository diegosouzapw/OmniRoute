/**
 * Claude Code CCH (Client Content Hash) signing.
 *
 * Real Claude Code uses Bun/Zig to compute an xxHash64 integrity token over
 * the serialized request body. The server verifies this to confirm the request
 * came from a genuine Claude Code client.
 *
 * Algorithm:
 *   1. Serialize request body with cch=00000 placeholder
 *   2. xxHash64(body_bytes, seed) & 0xFFFFF
 *   3. Zero-padded 5-char lowercase hex
 *   4. Replace cch=00000 with computed value
 */

import xxhashInit from "xxhash-wasm";

const CCH_SEED = 0x6e52736ac806831en;
const CCH_PATTERN = /\bcch=([0-9a-f]{5});/;

let xxhash64Fn: ((input: Uint8Array, seed: bigint) => bigint) | null = null;

async function ensureXxhash() {
  if (xxhash64Fn) return;
  const hasher = await xxhashInit();
  xxhash64Fn = hasher.h64Raw;
}

export async function computeCCH(bodyBytes: Uint8Array): Promise<string> {
  await ensureXxhash();
  const hash = xxhash64Fn!(bodyBytes, CCH_SEED);
  const masked = hash & 0xfffffn;
  return masked.toString(16).padStart(5, "0");
}

export async function signRequestBody(bodyString: string): Promise<string> {
  if (!CCH_PATTERN.test(bodyString)) return bodyString;
  const encoder = new TextEncoder();
  const bodyBytes = encoder.encode(bodyString);
  const token = await computeCCH(bodyBytes);
  return bodyString.replace(CCH_PATTERN, `cch=${token};`);
}

export { CCH_PATTERN };
