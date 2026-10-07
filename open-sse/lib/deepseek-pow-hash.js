// Clean-room reference derived from NIST FIPS 202, Algorithms 1-9. FIPS SHA3-256
// uses KECCAK-p[1600,24]. Differential testing against the supplied black-box
// vectors identifies DeepSeekHashV1 as the same sponge construction with
// KECCAK-p[1600,23] (the last 23 rounds, with round indices 1 through 23).

const LANE_MASK = (1n << 64n) - 1n;
const SHA3_256_RATE_BYTES = 136;
const SHA3_DOMAIN_SUFFIX = 0x06;
const SHA3_256_OUTPUT_BYTES = 32;

// Indexed as x + 5*y, matching the FIPS 202 state coordinates.
const ROTATION_OFFSETS = [
  0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3, 10, 43, 25, 39, 41, 45, 15, 21, 8, 18, 2, 61, 56, 14,
];

const ROUND_CONSTANTS = [
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

/**
 * @param {bigint} value
 * @param {number} amount
 * @returns {bigint}
 */
function rotateLeft64(value, amount) {
  if (amount === 0) return value;
  const shift = BigInt(amount);
  return ((value << shift) | (value >> (64n - shift))) & LANE_MASK;
}

/**
 * Apply the last `roundCount` rounds of KECCAK-p[1600, roundCount].
 *
 * @param {bigint[]} state
 * @param {number} roundCount
 */
function keccakP1600Reference(state, roundCount) {
  /** @type {bigint[]} */
  const columnParity = new Array(5).fill(0n);
  /** @type {bigint[]} */
  const thetaMix = new Array(5).fill(0n);
  /** @type {bigint[]} */
  const rhoPiState = new Array(25).fill(0n);
  const firstRound = ROUND_CONSTANTS.length - roundCount;

  for (let round = firstRound; round < ROUND_CONSTANTS.length; round++) {
    for (let x = 0; x < 5; x++) {
      columnParity[x] = state[x] ^ state[x + 5] ^ state[x + 10] ^ state[x + 15] ^ state[x + 20];
    }
    for (let x = 0; x < 5; x++) {
      thetaMix[x] = columnParity[(x + 4) % 5] ^ rotateLeft64(columnParity[(x + 1) % 5], 1);
    }
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) state[x + 5 * y] ^= thetaMix[x];
    }

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const destinationX = y;
        const destinationY = (2 * x + 3 * y) % 5;
        const lane = x + 5 * y;
        rhoPiState[destinationX + 5 * destinationY] = rotateLeft64(
          state[lane],
          ROTATION_OFFSETS[lane]
        );
      }
    }

    for (let y = 0; y < 5; y++) {
      const row = 5 * y;
      for (let x = 0; x < 5; x++) {
        state[x + row] =
          rhoPiState[x + row] ^
          (~rhoPiState[((x + 1) % 5) + row] & LANE_MASK & rhoPiState[((x + 2) % 5) + row]);
      }
    }
    state[0] ^= ROUND_CONSTANTS[round];
  }
}

/**
 * @param {bigint[]} state
 * @param {Uint8Array} block
 * @param {number} roundCount
 */
function absorbReferenceBlock(state, block, roundCount) {
  for (let index = 0; index < SHA3_256_RATE_BYTES; index++) {
    const lane = Math.floor(index / 8);
    const shift = BigInt((index % 8) * 8);
    state[lane] ^= BigInt(block[index]) << shift;
  }
  keccakP1600Reference(state, roundCount);
}

/**
 * SHA3-256's sponge parameters with a selectable KECCAK-p round count.
 *
 * @param {string} input
 * @param {number} roundCount
 * @returns {string}
 */
function sha3_256ReferenceWithRoundCount(input, roundCount) {
  const bytes = new TextEncoder().encode(input);
  /** @type {bigint[]} */
  const state = new Array(25).fill(0n);
  let offset = 0;

  while (offset + SHA3_256_RATE_BYTES <= bytes.length) {
    absorbReferenceBlock(state, bytes.subarray(offset, offset + SHA3_256_RATE_BYTES), roundCount);
    offset += SHA3_256_RATE_BYTES;
  }

  const finalBlock = new Uint8Array(SHA3_256_RATE_BYTES);
  finalBlock.set(bytes.subarray(offset));
  finalBlock[bytes.length - offset] ^= SHA3_DOMAIN_SUFFIX;
  finalBlock[SHA3_256_RATE_BYTES - 1] ^= 0x80;
  absorbReferenceBlock(state, finalBlock, roundCount);

  const output = new Uint8Array(SHA3_256_OUTPUT_BYTES);
  for (let index = 0; index < output.length; index++) {
    const lane = Math.floor(index / 8);
    const shift = BigInt((index % 8) * 8);
    output[index] = Number((state[lane] >> shift) & 0xffn);
  }
  return Array.from(output, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Readable FIPS 202 control implementation used to validate the permutation,
 * byte order, padding, and multi-block absorption against `node:crypto`.
 *
 * @param {string} input
 * @returns {string}
 */
export function sha3_256Fips202Reference(input) {
  return sha3_256ReferenceWithRoundCount(input, 24);
}

/**
 * Readable DeepSeekHashV1 reference model. Runtime searches use an equivalent
 * 32-bit implementation below so a bounded synchronous compatibility call does
 * not turn a 144k challenge into minutes of BigInt work.
 *
 * @param {string} input
 * @returns {string}
 */
export function deepSeekHashV1Reference(input) {
  return sha3_256ReferenceWithRoundCount(input, 23);
}

const DEEPSEEK_HASH_ROUNDS = 23;
const DIGEST_HEX_PATTERN = /^[a-f0-9]{64}$/i;
const ROUND_CONSTANTS_LOW = Uint32Array.from(ROUND_CONSTANTS, (value) =>
  Number(value & 0xffffffffn)
);
const ROUND_CONSTANTS_HIGH = Uint32Array.from(ROUND_CONSTANTS, (value) =>
  Number((value >> 32n) & 0xffffffffn)
);
const RHO_PI_DESTINATION_WORDS = Uint8Array.from({ length: 25 }, (_, lane) => {
  const x = lane % 5;
  const y = Math.floor(lane / 5);
  return 2 * (y + 5 * ((2 * x + 3 * y) % 5));
});
const CHI_NEXT_WORDS = Uint8Array.from({ length: 25 }, (_, lane) => {
  const x = lane % 5;
  const row = lane - x;
  return 2 * (row + ((x + 1) % 5));
});
const CHI_NEXT_NEXT_WORDS = Uint8Array.from({ length: 25 }, (_, lane) => {
  const x = lane % 5;
  const row = lane - x;
  return 2 * (row + ((x + 2) % 5));
});
const HEX_DIGITS = "0123456789abcdef";

export const MAX_DEEPSEEK_POW_DIFFICULTY = 250_000;

/**
 * Equivalent 32-bit form of the reference permutation. Each 64-bit lane is
 * stored as adjacent little-endian low/high uint32 words.
 *
 * @param {Uint32Array} state
 * @param {Uint32Array} rhoPiState
 * @param {Uint32Array} columnParity
 * @param {Uint32Array} thetaMix
 * @param {number} roundCount
 */
function keccakP1600Uint32(state, rhoPiState, columnParity, thetaMix, roundCount) {
  const firstRound = ROUND_CONSTANTS.length - roundCount;

  for (let round = firstRound; round < ROUND_CONSTANTS.length; round++) {
    for (let x = 0; x < 5; x++) {
      const word = 2 * x;
      columnParity[word] =
        state[word] ^ state[word + 10] ^ state[word + 20] ^ state[word + 30] ^ state[word + 40];
      columnParity[word + 1] =
        state[word + 1] ^ state[word + 11] ^ state[word + 21] ^ state[word + 31] ^ state[word + 41];
    }

    for (let x = 0; x < 5; x++) {
      const previous = 2 * ((x + 4) % 5);
      const next = 2 * ((x + 1) % 5);
      const rotatedLow = (columnParity[next] << 1) | (columnParity[next + 1] >>> 31);
      const rotatedHigh = (columnParity[next + 1] << 1) | (columnParity[next] >>> 31);
      thetaMix[2 * x] = columnParity[previous] ^ rotatedLow;
      thetaMix[2 * x + 1] = columnParity[previous + 1] ^ rotatedHigh;
    }

    for (let x = 0; x < 5; x++) {
      const word = 2 * x;
      const low = thetaMix[word];
      const high = thetaMix[word + 1];
      state[word] ^= low;
      state[word + 1] ^= high;
      state[word + 10] ^= low;
      state[word + 11] ^= high;
      state[word + 20] ^= low;
      state[word + 21] ^= high;
      state[word + 30] ^= low;
      state[word + 31] ^= high;
      state[word + 40] ^= low;
      state[word + 41] ^= high;
    }

    rhoPiState[0] = state[0];
    rhoPiState[1] = state[1];
    for (let lane = 1; lane < 25; lane++) {
      const source = 2 * lane;
      const destination = RHO_PI_DESTINATION_WORDS[lane];
      const amount = ROTATION_OFFSETS[lane];
      const low = state[source];
      const high = state[source + 1];

      if (amount < 32) {
        rhoPiState[destination] = (low << amount) | (high >>> (32 - amount));
        rhoPiState[destination + 1] = (high << amount) | (low >>> (32 - amount));
      } else {
        const reduced = amount - 32;
        rhoPiState[destination] = (high << reduced) | (low >>> (32 - reduced));
        rhoPiState[destination + 1] = (low << reduced) | (high >>> (32 - reduced));
      }
    }

    for (let lane = 0; lane < 25; lane++) {
      const word = 2 * lane;
      const nextWord = CHI_NEXT_WORDS[lane];
      const nextNextWord = CHI_NEXT_NEXT_WORDS[lane];
      state[word] = rhoPiState[word] ^ (~rhoPiState[nextWord] & rhoPiState[nextNextWord]);
      state[word + 1] =
        rhoPiState[word + 1] ^ (~rhoPiState[nextWord + 1] & rhoPiState[nextNextWord + 1]);
    }

    state[0] ^= ROUND_CONSTANTS_LOW[round];
    state[1] ^= ROUND_CONSTANTS_HIGH[round];
  }
}

/**
 * @param {Uint32Array} state
 * @param {Uint8Array} bytes
 * @param {number} offset
 * @param {Uint32Array} rhoPiState
 * @param {Uint32Array} columnParity
 * @param {Uint32Array} thetaMix
 * @param {number} roundCount
 */
function absorbFullUint32Block(
  state,
  bytes,
  offset,
  rhoPiState,
  columnParity,
  thetaMix,
  roundCount
) {
  for (let index = 0; index < SHA3_256_RATE_BYTES; index++) {
    const word = index >>> 2;
    state[word] ^= bytes[offset + index] << ((index & 3) * 8);
  }
  keccakP1600Uint32(state, rhoPiState, columnParity, thetaMix, roundCount);
}

/**
 * @param {Uint32Array} state
 * @returns {string}
 */
function digestStateToHex(state) {
  let digest = "";
  for (let index = 0; index < SHA3_256_OUTPUT_BYTES; index++) {
    const byte = (state[index >>> 2] >>> ((index & 3) * 8)) & 0xff;
    digest += HEX_DIGITS[byte >>> 4] + HEX_DIGITS[byte & 0x0f];
  }
  return digest;
}

/**
 * @param {string} input
 * @param {number} roundCount
 * @returns {string}
 */
function sha3_256Uint32WithRoundCount(input, roundCount) {
  const bytes = new TextEncoder().encode(input);
  const state = new Uint32Array(50);
  const rhoPiState = new Uint32Array(50);
  const columnParity = new Uint32Array(10);
  const thetaMix = new Uint32Array(10);
  let offset = 0;

  while (offset + SHA3_256_RATE_BYTES <= bytes.length) {
    absorbFullUint32Block(state, bytes, offset, rhoPiState, columnParity, thetaMix, roundCount);
    offset += SHA3_256_RATE_BYTES;
  }

  const remaining = bytes.length - offset;
  for (let index = 0; index < remaining; index++) {
    state[index >>> 2] ^= bytes[offset + index] << ((index & 3) * 8);
  }
  state[remaining >>> 2] ^= SHA3_DOMAIN_SUFFIX << ((remaining & 3) * 8);
  state[(SHA3_256_RATE_BYTES - 1) >>> 2] ^= 0x80 << 24;
  keccakP1600Uint32(state, rhoPiState, columnParity, thetaMix, roundCount);
  return digestStateToHex(state);
}

/**
 * Optimized, allocation-bounded DeepSeekHashV1 digest.
 *
 * @param {string} input
 * @returns {string}
 */
export function deepSeekHashV1(input) {
  return sha3_256Uint32WithRoundCount(input, DEEPSEEK_HASH_ROUNDS);
}

/**
 * @param {string} digestHex
 * @returns {Uint32Array}
 */
function parseDigestWords(digestHex) {
  const words = new Uint32Array(SHA3_256_OUTPUT_BYTES / 4);
  for (let index = 0; index < SHA3_256_OUTPUT_BYTES; index++) {
    const byte = Number.parseInt(digestHex.slice(index * 2, index * 2 + 2), 16);
    words[index >>> 2] |= byte << ((index & 3) * 8);
  }
  return words;
}

/**
 * Search `prefix + nonce` without allocating a digest or re-encoding the prefix
 * for every candidate. Inputs are validated here as well as at the public solver
 * boundary so the worker cannot be coerced into an unbounded loop.
 *
 * @param {string} prefix
 * @param {string} challenge
 * @param {number} difficulty
 * @returns {number}
 */
export function findDeepSeekPowNonce(prefix, challenge, difficulty) {
  if (typeof prefix !== "string") throw new TypeError("DeepSeek PoW prefix must be a string");
  if (!DIGEST_HEX_PATTERN.test(challenge)) {
    throw new TypeError("DeepSeek PoW challenge must be a 64-character hex digest");
  }
  if (
    !Number.isSafeInteger(difficulty) ||
    difficulty < 1 ||
    difficulty > MAX_DEEPSEEK_POW_DIFFICULTY
  ) {
    throw new RangeError(
      `DeepSeek PoW difficulty must be an integer from 1 to ${MAX_DEEPSEEK_POW_DIFFICULTY}`
    );
  }

  const prefixBytes = new TextEncoder().encode(prefix);
  const baseState = new Uint32Array(50);
  const rhoPiState = new Uint32Array(50);
  const columnParity = new Uint32Array(10);
  const thetaMix = new Uint32Array(10);
  let prefixOffset = 0;

  while (prefixOffset + SHA3_256_RATE_BYTES <= prefixBytes.length) {
    absorbFullUint32Block(
      baseState,
      prefixBytes,
      prefixOffset,
      rhoPiState,
      columnParity,
      thetaMix,
      DEEPSEEK_HASH_ROUNDS
    );
    prefixOffset += SHA3_256_RATE_BYTES;
  }

  const tailLength = prefixBytes.length - prefixOffset;
  const tailWords = new Uint32Array(Math.ceil(tailLength / 4));
  for (let index = 0; index < tailLength; index++) {
    tailWords[index >>> 2] ^= prefixBytes[prefixOffset + index] << ((index & 3) * 8);
  }

  const targetWords = parseDigestWords(challenge.toLowerCase());
  const state = new Uint32Array(50);

  nonceLoop: for (let nonce = 0; nonce < difficulty; nonce++) {
    state.set(baseState);
    for (let word = 0; word < tailWords.length; word++) state[word] ^= tailWords[word];

    let position = tailLength;
    const nonceText = String(nonce);
    for (let index = 0; index < nonceText.length; index++) {
      state[position >>> 2] ^= nonceText.charCodeAt(index) << ((position & 3) * 8);
      position += 1;
      if (position === SHA3_256_RATE_BYTES) {
        keccakP1600Uint32(state, rhoPiState, columnParity, thetaMix, DEEPSEEK_HASH_ROUNDS);
        position = 0;
      }
    }

    state[position >>> 2] ^= SHA3_DOMAIN_SUFFIX << ((position & 3) * 8);
    state[(SHA3_256_RATE_BYTES - 1) >>> 2] ^= 0x80 << 24;
    keccakP1600Uint32(state, rhoPiState, columnParity, thetaMix, DEEPSEEK_HASH_ROUNDS);

    for (let word = 0; word < targetWords.length; word++) {
      if (state[word] !== targetWords[word]) continue nonceLoop;
    }
    return nonce;
  }

  return -1;
}
