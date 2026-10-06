import test from "node:test";
import assert from "node:assert/strict";
import { isLocalProvider } from "../../open-sse/config/providerRegistry.ts";

test("isLocalProvider detects RFC1918, CGNAT/Tailscale, and mDNS private hosts", () => {
  // Local / loopback
  assert.equal(isLocalProvider("http://localhost:11434/v1"), true);
  assert.equal(isLocalProvider("http://127.0.0.1:11434/v1"), true);

  // Docker 172.16/12
  assert.equal(isLocalProvider("http://172.18.0.2:11434/v1"), true);

  // RFC1918 LAN hosts (Issue #11091)
  assert.equal(isLocalProvider("http://192.168.1.50:11434/v1"), true);
  assert.equal(isLocalProvider("http://10.0.0.5:11434/v1"), true);

  // Tailscale / CGNAT (100.64/10)
  assert.equal(isLocalProvider("http://100.64.1.2:11434/v1"), true);

  // Link-local (169.254/16)
  assert.equal(isLocalProvider("http://169.254.1.1:11434/v1"), true);

  // mDNS / private suffixes
  assert.equal(isLocalProvider("http://studio.local:11434/v1"), true);
  assert.equal(isLocalProvider("http://mybox.internal:11434/v1"), true);

  // Public hosts (should be false)
  assert.equal(isLocalProvider("https://api.openai.com/v1"), false);
  assert.equal(isLocalProvider("https://api.anthropic.com/v1"), false);
  assert.equal(isLocalProvider("http://8.8.8.8:8080/v1"), false);

  // Fails open on missing or unparseable input (Issue #11091 review finding)
  assert.equal(isLocalProvider(null), false);
  assert.equal(isLocalProvider(undefined), false);
  assert.equal(isLocalProvider(""), false);
  assert.equal(isLocalProvider("not a url"), false);
  assert.equal(isLocalProvider("file:///models"), false);
});
