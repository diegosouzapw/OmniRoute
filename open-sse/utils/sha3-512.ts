// Runtime-portable SHA3-512 (FIPS-202).
//
// The ChatGPT-Web sentinel proof-of-work (open-sse/executors/chatgpt-web.ts)
// hashes with SHA3-512. Node built against OpenSSL has it natively, but the
// **Electron desktop app** ships Node built against **BoringSSL, which does not
// implement the SHA-3 family** (electron/electron#30530). There,
// `createHash("sha3-512")` throws `Error: Digest method not supported`, so every
// chatgpt-web request fails with `502 ChatGPT sentinel failed: Digest method not
// supported` and the provider is unusable on the desktop app (#5531).
//
// This module prefers the native digest (fast path on servers / OpenSSL) and
// transparently falls back to a dependency-free pure-JS Keccak-f[1600] when the
// runtime's crypto lacks SHA-3. The pure-JS path is validated bit-for-bit
// against the native digest and the published FIPS-202 vectors in the unit test.

import { createHash } from "node:crypto";

// ─── Keccak-f[1600] (BigInt lanes — correctness-first; only the fallback runs it) ──

const MASK = (1n << 64n) - 1n;

// Round constants RC[0..23].
const RC: bigint[] = [
  0x0000000000000001n,
  0x0000000000008082n,
  0x800000000000808an,
  0x8000000080008000n,
  0x000000000000808bn,
  0x0000000080000001n,
  0x8000000080008081n,
  0x8000000000008009n,
  0x000000000000008an,
  0x0000000000000088n,
  0x0000000080008009n,
  0x000000008000000an,
  0x000000008000808bn,
  0x800000000000008bn,
  0x8000000000008089n,
  0x8000000000008003n,
  0x8000000000008002n,
  0x8000000000000080n,
  0x000000000000800an,
  0x800000008000000an,
  0x8000000080008081n,
  0x8000000000008080n,
  0x0000000080000001n,
  0x8000000080008008n,
];

// Rotation offsets r[x+5y] (rho step).
const ROT: number[] = [
  0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3, 10, 43, 25, 39, 41, 45, 15, 21, 8, 18, 2, 61, 56, 14,
];

function rotl64(x: bigint, n: number): bigint {
  if (n === 0) return x;
  const bn = BigInt(n);
  return ((x << bn) | (x >> (64n - bn))) & MASK;
}

function keccakF1600(s: bigint[]): void {
  const C = new Array<bigint>(5);
  const D = new Array<bigint>(5);
  const B = new Array<bigint>(25);
  for (let round = 0; round < 24; round++) {
    // θ
    for (let x = 0; x < 5; x++) C[x] = s[x] ^ s[x + 5] ^ s[x + 10] ^ s[x + 15] ^ s[x + 20];
    for (let x = 0; x < 5; x++) D[x] = C[(x + 4) % 5] ^ rotl64(C[(x + 1) % 5], 1);
    for (let x = 0; x < 5; x++) for (let y = 0; y < 5; y++) s[x + 5 * y] ^= D[x];
    // ρ + π
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        B[y + 5 * ((2 * x + 3 * y) % 5)] = rotl64(s[x + 5 * y], ROT[x + 5 * y]);
      }
    }
    // χ
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        s[x + 5 * y] = B[x + 5 * y] ^ (~B[((x + 1) % 5) + 5 * y] & MASK & B[((x + 2) % 5) + 5 * y]);
      }
    }
    // ι
    s[0] ^= RC[round];
  }
}

// SHA3-512: rate r = 576 bits (72 bytes / 9 lanes), capacity 1024, output 64 bytes.
const RATE_BYTES = 72;

function sha3_512Bytes(msg: Uint8Array): Uint8Array {
  const s: bigint[] = new Array<bigint>(25).fill(0n);

  // FIPS-202 pad10*1 with SHA-3 domain separation (first pad byte 0x06, last |= 0x80).
  const padLen = RATE_BYTES - (msg.length % RATE_BYTES);
  const padded = new Uint8Array(msg.length + padLen);
  padded.set(msg);
  padded[msg.length] = 0x06;
  padded[padded.length - 1] |= 0x80;

  // Absorb (little-endian lanes).
  for (let off = 0; off < padded.length; off += RATE_BYTES) {
    for (let i = 0; i < RATE_BYTES / 8; i++) {
      let lane = 0n;
      for (let b = 0; b < 8; b++) lane |= BigInt(padded[off + i * 8 + b]) << BigInt(8 * b);
      s[i] ^= lane;
    }
    keccakF1600(s);
  }

  // Squeeze 64 bytes (8 lanes — fits in one rate block).
  const out = new Uint8Array(64);
  for (let i = 0; i < 8; i++) {
    const lane = s[i];
    for (let b = 0; b < 8; b++) out[i * 8 + b] = Number((lane >> BigInt(8 * b)) & 0xffn);
  }
  return out;
}

function toBytes(input: string | Uint8Array): Uint8Array {
  return typeof input === "string" ? new Uint8Array(Buffer.from(input, "utf8")) : input;
}

/** Pure-JS SHA3-512 hex digest. Always runs the vendored Keccak (used as the fallback). */
export function sha3_512HexJs(input: string | Uint8Array): string {
  return Buffer.from(sha3_512Bytes(toBytes(input))).toString("hex");
}

type NativeHasher = (data: Uint8Array) => string;

// undefined = not yet probed; null = native SHA-3 unavailable (BoringSSL/Electron).
let nativeHasher: NativeHasher | null | undefined;

function detectNative(): NativeHasher | null {
  try {
    // Construct + digest once — Electron/BoringSSL throws here, not lazily.
    createHash("sha3-512").update(Buffer.alloc(0)).digest("hex");
    return (data) => createHash("sha3-512").update(data).digest("hex");
  } catch {
    return null;
  }
}

/**
 * SHA3-512 hex digest that works on every runtime: native (OpenSSL) where
 * available, pure-JS Keccak fallback where the crypto backend lacks SHA-3
 * (Electron/BoringSSL — #5531). Capability is probed once and cached.
 */
export function sha3_512Hex(input: string | Uint8Array): string {
  const data = toBytes(input);
  if (nativeHasher === undefined) nativeHasher = detectNative();
  if (nativeHasher) {
    try {
      return nativeHasher(data);
    } catch {
      nativeHasher = null; // became unavailable mid-flight — defensive
    }
  }
  return sha3_512HexJs(data);
}

/** Test seam: force the native capability state (null = simulate BoringSSL, undefined = re-probe). */
export function __setSha3NativeForTesting(state: NativeHasher | null | undefined): void {
  nativeHasher = state;
}
