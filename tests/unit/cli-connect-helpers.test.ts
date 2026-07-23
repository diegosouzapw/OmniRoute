import test from "node:test";
import assert from "node:assert/strict";
import { normalizeBaseUrl, hostLabel } from "../../bin/cli/commands/connect.mjs";
import { profileNameFromModel } from "../../bin/cli/commands/configure.mjs";

test("normalizeBaseUrl: bare host gets http:// and the default port", () => {
  assert.equal(normalizeBaseUrl("192.168.0.15", "20128"), "http://192.168.0.15:20128");
});

test("normalizeBaseUrl: host with explicit port keeps it", () => {
  assert.equal(normalizeBaseUrl("192.168.0.15:9000", "20128"), "http://192.168.0.15:9000");
});

test("normalizeBaseUrl: full https URL is preserved as origin", () => {
  assert.equal(normalizeBaseUrl("https://omni.example.com", "20128"), "https://omni.example.com");
  assert.equal(normalizeBaseUrl("http://host:1234/path", "20128"), "http://host:1234");
});

test("normalizeBaseUrl: empty input returns empty string", () => {
  assert.equal(normalizeBaseUrl("", "20128"), "");
});

test("hostLabel strips scheme and port", () => {
  assert.equal(hostLabel("https://omni.example.com:20128"), "omni.example.com");
  assert.equal(hostLabel("192.168.0.15:20128"), "192.168.0.15");
  assert.equal(hostLabel("http://10.0.0.1"), "10.0.0.1");
});

test("profileNameFromModel strips the provider prefix and non-alphanumerics", () => {
  assert.equal(profileNameFromModel("glm/glm-5.2"), "glm52");
  assert.equal(profileNameFromModel("kmc/kimi-k2.7"), "kimik27");
  assert.equal(profileNameFromModel("ollamacloud/gpt-oss:20b"), "gptoss20b");
  assert.equal(profileNameFromModel("cx/gpt-5.5"), "gpt55");
  assert.equal(profileNameFromModel("bare-model"), "baremodel");
});
