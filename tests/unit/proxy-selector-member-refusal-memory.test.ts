import test from "node:test";
import assert from "node:assert/strict";

const mem = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const {
  noteProxyRefusal,
  noteProxyServed,
  proxySetAsideSeq,
  __resetProxyRefusalMemoryForTesting,
  __proxyRefusalMemorySizeForTesting,
} = mem;

const ENTRY = "socks5://@127.0.0.1:1080";

test("composite key encoding never collides on spaces, brackets or unicode", () => {
  // keyForEntryMember is unambiguous by construction (JSON array encoding):
  // member names carrying spaces, brackets or unicode cannot alias each other.
  const a = mem.keyForEntryMember(ENTRY, "node 1");
  const b = mem.keyForEntryMember(ENTRY, "node 1 ");
  const c = mem.keyForEntryMember(ENTRY, 'node[1]"x');
  const d = mem.keyForEntryMember(ENTRY, "node-unicode-591");
  assert.equal(typeof a, "string");
  assert.notEqual(a, b);
  assert.notEqual(a, c);
  assert.notEqual(a, d);
  assert.notEqual(b, c);
});

test("refused selector member is avoided on the next pick, sibling is served", () => {
  __resetProxyRefusalMemoryForTesting();
  const now = Date.now();
  // Split double write across the two call sites: the outcome path keeps
  // the entry-level write, the switch path adds the composite one.
  assert.notEqual(noteProxyRefusal(ENTRY, "ip_quota_429", now), null);
  const r = mem.noteProxyMemberRefusal(ENTRY, "node-1", "ip_quota_429", now);
  assert.notEqual(r, null);
  assert.equal(mem.isSelectorMemberAvoided(ENTRY, "node-1", now + 1), true);
  assert.equal(mem.isSelectorMemberAvoided(ENTRY, "node-2", now + 1), false);
  // Entry-level avoidance is preserved for pool rotation.
  assert.notEqual(proxySetAsideSeq(ENTRY, now + 1), null);
});

test("all members set aside falls back to the least recently set aside", () => {
  __resetProxyRefusalMemoryForTesting();
  const now = Date.now();
  mem.noteProxyMemberRefusal(ENTRY, "node-1", "ip_quota_429", now);
  mem.noteProxyMemberRefusal(ENTRY, "node-2", "ip_quota_429", now + 10);
  const pick = mem.leastRecentlySetAside(ENTRY, ["node-1", "node-2"], now + 20);
  assert.equal(pick, "node-1");
});

test("member set aside under the transport kind is avoided like other kinds", () => {
  __resetProxyRefusalMemoryForTesting();
  const now = Date.now();
  const r = mem.noteProxyMemberRefusal(ENTRY, "node-1", "transport", now);
  assert.notEqual(r, null);
  assert.equal(mem.isSelectorMemberAvoided(ENTRY, "node-1", now + 1), true);
  assert.equal(mem.isSelectorMemberAvoided(ENTRY, "node-2", now + 1), false);
});

test("served without a member keeps entry-level clearing and leaves members on TTL", () => {
  __resetProxyRefusalMemoryForTesting();
  const now = Date.now();
  mem.noteProxyMemberRefusal(ENTRY, "node-1", "ip_quota_429", now);
  noteProxyServed(ENTRY);
  assert.equal(proxySetAsideSeq(ENTRY, now + 1), null);
  assert.equal(mem.isSelectorMemberAvoided(ENTRY, "node-1", now + 1), true);
});

test("composite entries share the existing memory bound", () => {
  __resetProxyRefusalMemoryForTesting();
  const now = Date.now();
  // Entry write + composite write for the same refusal: two map slots under
  // the single shared bound (no new limit).
  assert.notEqual(noteProxyRefusal(ENTRY, "ip_quota_429", now), null);
  assert.notEqual(mem.noteProxyMemberRefusal(ENTRY, "node-1", "ip_quota_429", now), null);
  assert.ok(__proxyRefusalMemorySizeForTesting() >= 2);
});

test("unknown active member falls back to entry-level write path", () => {
  __resetProxyRefusalMemoryForTesting();
  const now = Date.now();
  const r = mem.noteProxyMemberRefusal(ENTRY, null, "ip_quota_429", now);
  assert.equal(r, null);
  assert.notEqual(noteProxyRefusal(ENTRY, "ip_quota_429", now), null);
});
