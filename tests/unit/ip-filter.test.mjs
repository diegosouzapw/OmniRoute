import test from "node:test";
import assert from "node:assert/strict";

const {
  checkIP,
  configureIPFilter,
  tempBanIP,
  removeTempBan,
  addToBlacklist,
  removeFromBlacklist,
  addToWhitelist,
  removeFromWhitelist,
  getIPFilterConfig,
  resetIPFilter,
} = await import("../../open-sse/services/ipFilter.ts");

test.beforeEach(() => resetIPFilter());

// ─── Disabled ───────────────────────────────────────────────────────────────

test("disabled: allows all IPs", () => {
  assert.equal(checkIP("1.2.3.4").allowed, true);
});

// ─── Blacklist Mode ─────────────────────────────────────────────────────────

test("blacklist: blocks blacklisted IP", () => {
  configureIPFilter({ enabled: true, mode: "blacklist", blacklist: ["1.2.3.4"] });
  assert.equal(checkIP("1.2.3.4").allowed, false);
  assert.equal(checkIP("5.6.7.8").allowed, true);
});

test("blacklist: CIDR match", () => {
  configureIPFilter({ enabled: true, mode: "blacklist", blacklist: ["192.168.1.0/24"] });
  assert.equal(checkIP("192.168.1.100").allowed, false);
  assert.equal(checkIP("192.168.2.1").allowed, true);
});

test("blacklist: wildcard match", () => {
  configureIPFilter({ enabled: true, mode: "blacklist", blacklist: ["10.0.*.*"] });
  assert.equal(checkIP("10.0.1.1").allowed, false);
  assert.equal(checkIP("10.1.0.1").allowed, true);
});

// ─── Whitelist Mode ─────────────────────────────────────────────────────────

test("whitelist: only allows listed IPs", () => {
  configureIPFilter({ enabled: true, mode: "whitelist", whitelist: ["1.2.3.4"] });
  assert.equal(checkIP("1.2.3.4").allowed, true);
  assert.equal(checkIP("5.6.7.8").allowed, false);
});

test("whitelist: CIDR match", () => {
  configureIPFilter({ enabled: true, mode: "whitelist", whitelist: ["10.0.0.0/8"] });
  assert.equal(checkIP("10.255.255.255").allowed, true);
  assert.equal(checkIP("11.0.0.1").allowed, false);
});

// ─── Whitelist Priority Mode ────────────────────────────────────────────────

test("whitelist-priority: whitelist overrides blacklist", () => {
  configureIPFilter({
    enabled: true,
    mode: "whitelist-priority",
    blacklist: ["192.168.1.0/24"],
    whitelist: ["192.168.1.100"],
  });
  assert.equal(checkIP("192.168.1.100").allowed, true); // Whitelisted
  assert.equal(checkIP("192.168.1.50").allowed, false); // Blacklisted
  assert.equal(checkIP("10.0.0.1").allowed, true); // Neither
});

// ─── Temporary Bans ─────────────────────────────────────────────────────────

test("tempBanIP: bans temporarily", () => {
  configureIPFilter({ enabled: true, mode: "blacklist" });
  tempBanIP("5.5.5.5", 60000, "abuse");
  assert.equal(checkIP("5.5.5.5").allowed, false);
  assert.ok(checkIP("5.5.5.5").reason.includes("banned"));
});

test("removeTempBan: removes ban", () => {
  configureIPFilter({ enabled: true, mode: "blacklist" });
  tempBanIP("5.5.5.5", 60000, "abuse");
  removeTempBan("5.5.5.5");
  assert.equal(checkIP("5.5.5.5").allowed, true);
});

// ─── Dynamic List Management ────────────────────────────────────────────────

test("addToBlacklist/removeFromBlacklist: dynamic updates", () => {
  configureIPFilter({ enabled: true, mode: "blacklist" });
  addToBlacklist("9.9.9.9");
  assert.equal(checkIP("9.9.9.9").allowed, false);
  removeFromBlacklist("9.9.9.9");
  assert.equal(checkIP("9.9.9.9").allowed, true);
});

test("addToWhitelist/removeFromWhitelist: dynamic updates", () => {
  configureIPFilter({ enabled: true, mode: "whitelist" });
  addToWhitelist("1.1.1.1");
  assert.equal(checkIP("1.1.1.1").allowed, true);
  removeFromWhitelist("1.1.1.1");
  assert.equal(checkIP("1.1.1.1").allowed, false);
});

// ─── IPv6 Normalization ─────────────────────────────────────────────────────

test("normalizes ::ffff: prefix", () => {
  configureIPFilter({ enabled: true, mode: "blacklist", blacklist: ["1.2.3.4"] });
  assert.equal(checkIP("::ffff:1.2.3.4").allowed, false);
});

// ─── Config API ─────────────────────────────────────────────────────────────

test("getIPFilterConfig: returns serializable config", () => {
  configureIPFilter({ enabled: true, mode: "whitelist", whitelist: ["1.2.3.4"] });
  const config = getIPFilterConfig();
  assert.equal(config.enabled, true);
  assert.equal(config.mode, "whitelist");
  assert.ok(Array.isArray(config.whitelist));
  assert.ok(config.whitelist.includes("1.2.3.4"));
});
