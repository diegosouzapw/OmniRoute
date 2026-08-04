import test from "node:test";
import assert from "node:assert/strict";

const {
  trackDevice,
  getDeviceCount,
  getDeviceDetails,
  getAllDeviceCounts,
  expireDevices,
  extractIpFromHeaders,
  maskIp,
  clearDeviceTracker,
} = await import("../../open-sse/services/deviceTracker.ts");

test.beforeEach(() => {
  delete process.env.DEVICE_TRACKER_TTL_MS;
  delete process.env.DEVICE_TRACKER_MAX_DEVICES_PER_KEY;
  delete process.env.DEVICE_TRACKER_MAX_TOTAL_DEVICES;
  clearDeviceTracker();
});

// ─── Fingerprint dedup ──────────────────────────────────────────────────────

test("trackDevice: same IP + UA for a key counts as one device", async () => {
  await trackDevice("key-1", "203.0.113.5", "Mozilla/5.0 test-agent");
  await trackDevice("key-1", "203.0.113.5", "Mozilla/5.0 test-agent");
  await trackDevice("key-1", "203.0.113.5", "Mozilla/5.0 test-agent");

  assert.equal(getDeviceCount("key-1"), 1);
});

test("trackDevice: different User-Agent for same key/IP counts as a new device", async () => {
  await trackDevice("key-1", "203.0.113.5", "curl/8.0");
  await trackDevice("key-1", "203.0.113.5", "python-requests/2.31");

  assert.equal(getDeviceCount("key-1"), 2);
});

test("trackDevice: different IP for same key/UA counts as a new device", async () => {
  await trackDevice("key-1", "203.0.113.5", "curl/8.0");
  await trackDevice("key-1", "198.51.100.9", "curl/8.0");

  assert.equal(getDeviceCount("key-1"), 2);
});

test("trackDevice: repeated tracking refreshes lastSeen instead of duplicating", async () => {
  await trackDevice("key-1", "203.0.113.5", "curl/8.0");
  const [before] = getDeviceDetails("key-1");
  await new Promise((resolve) => setTimeout(resolve, 5));
  await trackDevice("key-1", "203.0.113.5", "curl/8.0");
  const [after] = getDeviceDetails("key-1");

  assert.equal(getDeviceCount("key-1"), 1);
  assert.ok(after.lastSeen >= before.lastSeen);
});

test("trackDevice: no-ops and returns null when apiKeyId is missing", async () => {
  const fingerprint = await trackDevice(null, "203.0.113.5", "curl/8.0");
  assert.equal(fingerprint, null);
  assert.equal(getDeviceCount(null), 0);
});

// ─── Per-key isolation ──────────────────────────────────────────────────────

test("trackDevice: devices are scoped per API key, not global", async () => {
  await trackDevice("key-1", "203.0.113.5", "curl/8.0");
  await trackDevice("key-2", "203.0.113.5", "curl/8.0"); // same fingerprint, different key

  assert.equal(getDeviceCount("key-1"), 1);
  assert.equal(getDeviceCount("key-2"), 1);

  const allCounts = getAllDeviceCounts();
  assert.equal(allCounts["key-1"], 1);
  assert.equal(allCounts["key-2"], 1);
});

// ─── TTL expiry ─────────────────────────────────────────────────────────────

test("expireDevices: evicts devices whose lastSeen exceeds the TTL window", async () => {
  process.env.DEVICE_TRACKER_TTL_MS = "1000";
  clearDeviceTracker();

  await trackDevice("key-1", "203.0.113.5", "curl/8.0");
  assert.equal(getDeviceCount("key-1"), 1);

  const farFuture = Date.now() + 5000;
  const expiredCount = expireDevices(farFuture);

  assert.equal(expiredCount, 1);
  assert.equal(getDeviceCount("key-1"), 0);
});

test("expireDevices: keeps devices seen within the TTL window", async () => {
  process.env.DEVICE_TRACKER_TTL_MS = "60000";
  clearDeviceTracker();

  await trackDevice("key-1", "203.0.113.5", "curl/8.0");
  const soon = Date.now() + 1000;
  const expiredCount = expireDevices(soon);

  assert.equal(expiredCount, 0);
  assert.equal(getDeviceCount("key-1"), 1);
});

// ─── Eviction under caps ────────────────────────────────────────────────────

test("trackDevice: enforces maxDevicesPerApiKey by evicting the oldest device", async () => {
  process.env.DEVICE_TRACKER_MAX_DEVICES_PER_KEY = "2";
  clearDeviceTracker();

  await trackDevice("key-1", "203.0.113.1", "ua-1");
  await new Promise((resolve) => setTimeout(resolve, 2));
  await trackDevice("key-1", "203.0.113.2", "ua-2");
  await new Promise((resolve) => setTimeout(resolve, 2));
  // Third distinct device should evict the oldest (203.0.113.1 / ua-1).
  await trackDevice("key-1", "203.0.113.3", "ua-3");

  assert.equal(getDeviceCount("key-1"), 2);
  const uaSet = new Set(getDeviceDetails("key-1").map((d) => d.userAgent));
  assert.ok(!uaSet.has("ua-1"), "oldest device should have been evicted");
  assert.ok(uaSet.has("ua-2"));
  assert.ok(uaSet.has("ua-3"));
});

test("trackDevice: enforces maxTotalDevices globally across all keys", async () => {
  process.env.DEVICE_TRACKER_MAX_TOTAL_DEVICES = "2";
  clearDeviceTracker();

  await trackDevice("key-1", "203.0.113.1", "ua-1");
  await new Promise((resolve) => setTimeout(resolve, 2));
  await trackDevice("key-2", "203.0.113.2", "ua-2");
  await new Promise((resolve) => setTimeout(resolve, 2));
  await trackDevice("key-3", "203.0.113.3", "ua-3");

  const total = Object.values(getAllDeviceCounts()).reduce((a, b) => a + b, 0);
  assert.equal(total, 2);
  // key-1's device was the oldest globally and should be gone.
  assert.equal(getDeviceCount("key-1"), 0);
});

// ─── IP masking ─────────────────────────────────────────────────────────────

test("maskIp: masks the last two octets of an IPv4 address", () => {
  assert.equal(maskIp("203.0.113.42"), "203.0.x.x");
});

test("maskIp: masks an IPv6 address down to its first three groups", () => {
  assert.equal(maskIp("2001:db8:85a3:0:0:8a2e:370:7334"), "2001:db8:85a3:...");
});

test("maskIp: returns 'unknown' for missing/unknown input", () => {
  assert.equal(maskIp(null), "unknown");
  assert.equal(maskIp(undefined), "unknown");
  assert.equal(maskIp("unknown"), "unknown");
});

test("trackDevice: never stores the raw IP — only the masked form", async () => {
  await trackDevice("key-1", "203.0.113.42", "curl/8.0");
  const [detail] = getDeviceDetails("key-1");

  assert.equal(detail.ip, "203.0.x.x");
  assert.notEqual(detail.ip, "203.0.113.42");
});

test("getDeviceDetails: truncates the fingerprint instead of exposing the full SHA-256 hash", async () => {
  await trackDevice("key-1", "203.0.113.42", "curl/8.0");
  const [detail] = getDeviceDetails("key-1");

  assert.equal(detail.fingerprint.length, 12);
});

// ─── IP extraction from headers ─────────────────────────────────────────────

test("extractIpFromHeaders: prefers cf-connecting-ip over x-forwarded-for", () => {
  const ip = extractIpFromHeaders({
    "cf-connecting-ip": "203.0.113.5",
    "x-forwarded-for": "198.51.100.9, 10.0.0.1",
  });
  assert.equal(ip, "203.0.113.5");
});

test("extractIpFromHeaders: falls back to the first hop of x-forwarded-for", () => {
  const ip = extractIpFromHeaders({ "x-forwarded-for": "198.51.100.9, 10.0.0.1" });
  assert.equal(ip, "198.51.100.9");
});

test("extractIpFromHeaders: works with a real Headers instance", () => {
  const headers = new Headers({ "x-real-ip": "192.0.2.7" });
  assert.equal(extractIpFromHeaders(headers), "192.0.2.7");
});

test("extractIpFromHeaders: returns 'unknown' when no IP header is present", () => {
  assert.equal(extractIpFromHeaders({}), "unknown");
  assert.equal(extractIpFromHeaders(null), "unknown");
});
