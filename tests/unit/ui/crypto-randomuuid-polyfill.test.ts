import test from "node:test";
import assert from "node:assert/strict";

// UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
// where x is a hex digit and y is one of 8, 9, a, or b
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Extract the polyfill function from layout.tsx's dangerouslySetInnerHTML.
 * We replicate the logic here to test it in isolation since it runs in
 * a <script> tag in the browser, not in Node.js.
 */
function createRandomUUIDPolyfill(getRandomValuesAvailable = true) {
  let getRandomValuesCalled = false;

  const mockGetRandomValues = (arr: Uint8Array) => {
    getRandomValuesCalled = true;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  };

  const mockCrypto: Record<string, unknown> = {};
  if (getRandomValuesAvailable) {
    mockCrypto.getRandomValues = mockGetRandomValues;
  }

  // Apply the polyfill logic (mirrors layout.tsx)
  if (!mockCrypto.randomUUID) {
    mockCrypto.randomUUID = function () {
      if (mockCrypto.getRandomValues) {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          const r =
            (mockCrypto.getRandomValues as (arr: Uint8Array) => Uint8Array)(new Uint8Array(1))[0] %
            16;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };
  }

  return {
    randomUUID: mockCrypto.randomUUID as () => string,
    getRandomValuesCalled: () => getRandomValuesCalled,
  };
}

// ── UUID v4 format validation ────────────────────────────────────────────────

test("polyfill generates a valid UUID v4 string when getRandomValues is available", () => {
  const { randomUUID } = createRandomUUIDPolyfill(true);
  const uuid = randomUUID();

  assert.match(uuid, UUID_V4_REGEX, `Generated UUID "${uuid}" does not match UUID v4 format`);
});

test("polyfill generates a valid UUID v4 string when getRandomValues is NOT available (Math.random fallback)", () => {
  const { randomUUID } = createRandomUUIDPolyfill(false);
  const uuid = randomUUID();

  assert.match(uuid, UUID_V4_REGEX, `Generated UUID "${uuid}" does not match UUID v4 format`);
});

// ── Structure checks ─────────────────────────────────────────────────────────

test("polyfill UUID has correct length (36 characters including hyphens)", () => {
  const { randomUUID } = createRandomUUIDPolyfill(true);
  const uuid = randomUUID();

  assert.equal(uuid.length, 36, `UUID length should be 36, got ${uuid.length}`);
});

test("polyfill UUID has correct version nibble (4 in the 13th position)", () => {
  const { randomUUID } = createRandomUUIDPolyfill(true);
  const uuid = randomUUID();

  // Position 14 (0-indexed 13) must be '4' for version 4
  assert.equal(uuid[14], "4", `Version nibble should be '4', got '${uuid[14]}'`);
});

test("polyfill UUID has correct variant bits (8, 9, a, or b in the 17th position)", () => {
  const { randomUUID } = createRandomUUIDPolyfill(true);
  const uuid = randomUUID();

  // Position 19 (0-indexed) is the variant nibble
  const variantNibble = uuid[19];
  assert.ok(
    ["8", "9", "a", "b"].includes(variantNibble),
    `Variant nibble should be 8/9/a/b, got '${variantNibble}'`
  );
});

// ── Prefer crypto.getRandomValues over Math.random ────────────────────────────

test("polyfill prefers getRandomValues when available", () => {
  const { randomUUID, getRandomValuesCalled } = createRandomUUIDPolyfill(true);

  randomUUID();

  assert.equal(
    getRandomValuesCalled(),
    true,
    "Should have called getRandomValues instead of Math.random"
  );
});

// ── Uniqueness ────────────────────────────────────────────────────────────────

test("polyfill generates unique UUIDs on successive calls", () => {
  const { randomUUID } = createRandomUUIDPolyfill(true);
  const uuids = new Set<string>();

  for (let i = 0; i < 100; i++) {
    uuids.add(randomUUID());
  }

  assert.equal(uuids.size, 100, "All 100 generated UUIDs should be unique");
});

// ── Does not override existing randomUUID ─────────────────────────────────────

test("polyfill does not override native randomUUID if already present", () => {
  const nativeUUID = "12345678-1234-4234-8234-123456789abc";
  const mockCrypto = {
    randomUUID: () => nativeUUID,
    getRandomValues: (arr: Uint8Array) => arr,
  };

  // Apply the polyfill guard logic
  if (!mockCrypto.randomUUID) {
    mockCrypto.randomUUID = function () {
      return "should-not-override";
    };
  }

  assert.equal(mockCrypto.randomUUID(), nativeUUID, "Native randomUUID should not be overwritten");
});
