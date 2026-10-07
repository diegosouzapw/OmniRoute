import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { solveDeepSeekPow, solveDeepSeekPowAsync } from "../../open-sse/lib/deepseek-pow.ts";
import {
  deepSeekHashV1,
  deepSeekHashV1Reference,
  sha3_256Fips202Reference,
} from "../../open-sse/lib/deepseek-pow-hash.js";

const repoRoot = new URL("../../", import.meta.url);
const noMatchChallenge = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
const redistributedArtifacts = [
  new URL("../../open-sse/lib/sha3_wasm_bg.wasm", import.meta.url),
  new URL("../../open-sse/lib/deepseek-pow-solver.cjs", import.meta.url),
];

const deepSeekHashV1Vectors = [
  [
    "1122334455667788_1778891543095_0",
    "311b26ae1e0fe7375e242958ce46db5552a6c67fea3f96880dcd846c63a74286",
  ],
  [
    "1122334455667788_1778891543095_1",
    "526f9103dfe22bcda9481b7f304a157b8edb18c5bb96a2061eefec1fbd0db706",
  ],
  ["vector_42_0", "1813da791ddac0da3a225e5878ff3d3ea07577e048f8e9575b82a274b71e3810"],
  ["vector_42_1", "b582fdb4f83662baec734e23373efc860515c03c40decbef076697eb5832f83c"],
  ["vector_42_2", "48b348ad54c372f78ccb6a26cbf156668f4c6a5b7d5a1cf19ccd78888586019b"],
  ["vector_42_3", "2ffed26ea9e1d6f4bbe49a266d98fe04ad9a5ad4c6d765862de8d18c513c3815"],
  ["bb_1778891543095_0", "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64"],
] as const;

test("DeepSeekHashV1 is SHA3-256 with the last 23 KECCAK-p[1600] rounds", () => {
  for (const [input, expected] of deepSeekHashV1Vectors) {
    assert.equal(deepSeekHashV1Reference(input), expected, input);
  }
});

test("the 24-round FIPS 202 reference agrees with node:crypto on a separate corpus", () => {
  const corpus = [
    "",
    "abc",
    "café",
    "🧪",
    "a".repeat(135),
    "b".repeat(136),
    "c".repeat(137),
    "multi-block-".repeat(40),
  ];

  for (const input of corpus) {
    const expected = createHash("sha3-256").update(input).digest("hex");
    assert.equal(sha3_256Fips202Reference(input), expected, JSON.stringify(input));
  }
});

test("the optimized DeepSeekHashV1 implementation agrees with the readable reference", () => {
  const corpus = [
    ...deepSeekHashV1Vectors.map(([input]) => input),
    "",
    "café-🧪",
    "a".repeat(135),
    "b".repeat(136),
    "c".repeat(137),
    "multi-block-".repeat(40),
  ];

  for (const input of corpus) {
    assert.equal(deepSeekHashV1(input), deepSeekHashV1Reference(input), JSON.stringify(input));
  }
});

test("DeepSeek PoW remains functional without redistributing extracted solver artifacts", async () => {
  const answer = await solveDeepSeekPowAsync(
    "DeepSeekHashV1",
    "311b26ae1e0fe7375e242958ce46db5552a6c67fea3f96880dcd846c63a74286",
    "1122334455667788",
    1,
    1778891543095
  );

  assert.equal(answer, 0, "the retained JavaScript solver must satisfy the known PoW vector");
  for (const artifact of redistributedArtifacts) {
    assert.equal(existsSync(artifact), false, `${artifact.pathname} must not be redistributed`);
  }
  assert.equal(
    existsSync(new URL("../../open-sse/lib/deepseek-pow-hash.js", import.meta.url)),
    true,
    "the clean-room JavaScript hash core must be packaged"
  );
  assert.equal(
    existsSync(new URL("../../open-sse/lib/deepseek-pow-worker.mjs", import.meta.url)),
    true,
    "the asynchronous worker entry must be packaged"
  );

  for (const relativePath of [
    "open-sse/lib/deepseek-pow-hash.js",
    "open-sse/lib/deepseek-pow.ts",
    "open-sse/lib/deepseek-pow-worker.mjs",
    "next.config.mjs",
    "package.json",
    "open-sse/package.json",
  ]) {
    const contents = readFileSync(new URL(relativePath, repoRoot), "utf8");
    assert.doesNotMatch(
      contents,
      /sha3_wasm_bg\.wasm|deepseek-pow-solver\.cjs/,
      `${relativePath} must not reference an extracted solver artifact`
    );
  }

  for (const relativePath of [
    "open-sse/lib/deepseek-pow-hash.js",
    "open-sse/lib/deepseek-pow.ts",
    "open-sse/lib/deepseek-pow-worker.mjs",
  ]) {
    const contents = readFileSync(new URL(relativePath, repoRoot), "utf8");
    assert.doesNotMatch(
      contents,
      /createRequire|WebAssembly/,
      `${relativePath} must not dynamically load a binary solver`
    );
  }

  const nextConfig = readFileSync(new URL("../../next.config.mjs", import.meta.url), "utf8");
  assert.match(nextConfig, /\.\/open-sse\/lib\/deepseek-pow-hash\.js/);
  assert.match(nextConfig, /\.\/open-sse\/lib\/deepseek-pow-worker\.mjs/);
});

test("DeepSeek PoW rejects malformed or unsafe challenges before hashing", async () => {
  await assert.rejects(
    solveDeepSeekPowAsync("DeepSeekHashV1", "not-a-sha3-digest", "salt", 1, 1),
    /challenge/i
  );
  await assert.rejects(
    solveDeepSeekPowAsync(
      "DeepSeekHashV1",
      "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      "salt",
      -1,
      1
    ),
    /difficulty/i
  );
  await assert.rejects(
    solveDeepSeekPowAsync("DeepSeekHashV1", noMatchChallenge, "salt", 250_001, 1),
    /difficulty/i
  );
  assert.throws(
    () => solveDeepSeekPow("DeepSeekHashV1", noMatchChallenge, "salt", 250_001, 1),
    /difficulty/i
  );
  assert.throws(
    () =>
      solveDeepSeekPow(
        "UnknownHash",
        "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "salt",
        1,
        1
      ),
    /unsupported/i
  );
});

test("DeepSeek PoW sync and async APIs agree for non-zero and missing answers", async () => {
  const nonceThreeChallenge = "2ffed26ea9e1d6f4bbe49a266d98fe04ad9a5ad4c6d765862de8d18c513c3815";

  assert.equal(solveDeepSeekPow("DeepSeekHashV1", nonceThreeChallenge, "vector", 4, 42), 3);
  assert.equal(
    await solveDeepSeekPowAsync("DeepSeekHashV1", nonceThreeChallenge, "vector", 4, 42),
    3
  );
  assert.equal(solveDeepSeekPow("DeepSeekHashV1", nonceThreeChallenge, "vector", 3, 42), -1);
  assert.equal(
    await solveDeepSeekPowAsync("DeepSeekHashV1", nonceThreeChallenge, "vector", 3, 42),
    -1
  );
});

test("DeepSeek PoW async search yields to timers and honors cancellation", async () => {
  const controller = new AbortController();
  let timerFired = false;
  const timer = setTimeout(() => {
    timerFired = true;
    controller.abort();
  }, 0);

  try {
    await assert.rejects(
      solveDeepSeekPowAsync(
        "DeepSeekHashV1",
        noMatchChallenge,
        "1122334455667788",
        256,
        1778891543095,
        { signal: controller.signal }
      ),
      (error: unknown) => error instanceof Error && error.name === "AbortError"
    );
    assert.equal(timerFired, true, "the event loop must progress while PoW is being searched");
  } finally {
    clearTimeout(timer);
  }
});

test("DeepSeek PoW async search enforces a deterministic timeout", async () => {
  await assert.rejects(
    solveDeepSeekPowAsync("DeepSeekHashV1", noMatchChallenge, "timeout", 250_000, 1, {
      timeoutMs: 1,
    }),
    /exceeded 1ms/i
  );
});

test("DeepSeek PoW caps concurrent worker searches at two", async () => {
  const controllers = [new AbortController(), new AbortController()];
  const searches = controllers.map((controller) =>
    solveDeepSeekPowAsync("DeepSeekHashV1", noMatchChallenge, "capacity", 250_000, 1, {
      signal: controller.signal,
      timeoutMs: 30_000,
    })
  );

  try {
    await assert.rejects(
      solveDeepSeekPowAsync("DeepSeekHashV1", noMatchChallenge, "capacity", 1, 1),
      /capacity reached \(2\)/i
    );
  } finally {
    for (const controller of controllers) controller.abort();
    await Promise.allSettled(searches);
  }
});
