import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxySubscription/selectorEndpoint.ts");
const { parseSelectorTag, stripSelectorSuffix, SELECTOR_TAG_RE } = mod;

test("SELECTOR_TAG_RE bounds the tag shape", () => {
  assert.match("group-a", SELECTOR_TAG_RE);
  assert.match("A1_-x", SELECTOR_TAG_RE);
  assert.equal(SELECTOR_TAG_RE.test("../"), false);
  assert.equal(SELECTOR_TAG_RE.test("a b"), false);
  assert.equal(SELECTOR_TAG_RE.test("a".repeat(65)), false);
  assert.equal(SELECTOR_TAG_RE.test("a".repeat(64)), true);
  assert.equal(SELECTOR_TAG_RE.test(""), false);
});

test("parseSelectorTag extracts a valid trailing tag", () => {
  assert.equal(parseSelectorTag("socks5://127.0.0.1:1080 selector=group-a"), "group-a");
  assert.equal(parseSelectorTag("socks5://127.0.0.1:1080  selector=group-a  "), "group-a");
});

test("parseSelectorTag rejects invalid tags and pinned lines", () => {
  assert.equal(parseSelectorTag("socks5://127.0.0.1:1080"), null);
  assert.equal(parseSelectorTag("socks5://127.0.0.1:1080 selector=../"), null);
  assert.equal(parseSelectorTag(`socks5://127.0.0.1:1080 selector=${"a".repeat(200)}`), null);
  assert.equal(parseSelectorTag("socks5://127.0.0.1:1080 selector=a b"), null);
  assert.equal(parseSelectorTag("socks5://127.0.0.1:1080 selector="), null);
});

test("stripSelectorSuffix removes the suffix, keeps the URL", () => {
  assert.equal(
    stripSelectorSuffix("socks5://127.0.0.1:1080 selector=group-a"),
    "socks5://127.0.0.1:1080"
  );
  assert.equal(stripSelectorSuffix("socks5://127.0.0.1:1080"), "socks5://127.0.0.1:1080");
  assert.equal(
    stripSelectorSuffix("socks5://127.0.0.1:1080 selector=../"),
    "socks5://127.0.0.1:1080 selector=../"
  );
});

test("stripSelectorSuffix never throws on junk", () => {
  assert.equal(stripSelectorSuffix(""), "");
  assert.doesNotThrow(() => stripSelectorSuffix("not a url selector=x"));
});
