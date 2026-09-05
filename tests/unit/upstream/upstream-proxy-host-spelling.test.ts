// `validateProxyUrl()` refused a private/metadata proxy target by matching
// dotted-quad prefixes, so the same address in another spelling walked through.
// Measured on release/v3.8.50 (ac02c5b42):
//
//   http://169.254.169.254            -> blocked
//   http://[::ffff:169.254.169.254]   -> ALLOWED   (same address, mapped)
//   http://[::ffff:a9fe:a9fe]         -> ALLOWED   (how WHATWG URL serialises it)
//   http://[::ffff:10.0.0.5]          -> ALLOWED
//   http://[fd00::1]                  -> ALLOWED   (ULA)
//   http://[fe80::1]                  -> ALLOWED   (link-local)
//   http://100.64.0.1                 -> ALLOWED   (CGNAT)
//
// #10843 fixed this class in the shared outbound guard; this module kept a
// private copy of the classification and did not get the fix.
import test from "node:test";
import assert from "node:assert/strict";

import { validateProxyUrl } from "../../../src/lib/db/upstreamProxy.ts";

function isValid(url: string): boolean {
  return validateProxyUrl(url).valid;
}

test("a mapped-IPv4 spelling of a blocked address is blocked too", () => {
  for (const url of [
    "http://[::ffff:169.254.169.254]", // cloud metadata, mapped
    "http://[::ffff:a9fe:a9fe]", // the same, as WHATWG URL serialises it
    "http://[::ffff:10.0.0.5]", // RFC1918, mapped
    "http://[::ffff:192.168.1.1]",
    "http://[::ffff:172.16.0.1]",
  ]) {
    assert.equal(isValid(url), false, `${url} must be refused`);
  }
});

test("private IPv6 ranges are blocked", () => {
  for (const url of ["http://[fd00::1]", "http://[fc00::1]", "http://[fe80::1]"]) {
    assert.equal(isValid(url), false, `${url} must be refused`);
  }
});

test("CGNAT space is blocked", () => {
  // 100.64.0.0/10 is carrier-grade NAT, not public address space.
  assert.equal(isValid("http://100.64.0.1"), false);
  assert.equal(isValid("http://100.127.255.254"), false);
  // …but the neighbouring public /8 addresses are not.
  assert.equal(isValid("http://100.63.255.255"), true);
  assert.equal(isValid("http://100.128.0.1"), true);
});

test("every address the dotted rules already refused is still refused", () => {
  for (const url of [
    "http://169.254.169.254",
    "http://metadata.google.internal",
    "http://metadata.aws.internal",
    "http://10.0.0.5",
    "http://172.16.0.1",
    "http://172.31.255.255",
    "http://192.168.1.1",
    "http://0.0.0.0",
    "http://127.0.0.2",
    "http://224.0.0.1", // IPv4 multicast, the only octet the old rule covered
  ]) {
    assert.equal(isValid(url), false, `${url} must still be refused`);
  }
});

test("multicast is refused across the whole /4, not just 224/8", () => {
  // Widened on purpose, and the one deliberate behaviour change here beyond
  // the spelling fix: the old rule was `/^224\./`, so 225–239 were accepted.
  // None of 224.0.0.0/4 can be a proxy.
  for (const url of ["http://224.0.0.1", "http://231.7.7.7", "http://239.255.255.250"]) {
    assert.equal(isValid(url), false, `${url} must be refused`);
  }
  assert.equal(isValid("http://240.0.0.1"), true, "just outside the /4 is unchanged");
});

test("loopback stays allowed — CLIProxyAPI runs on localhost:8317", () => {
  for (const url of [
    "http://localhost:8317",
    "http://127.0.0.1:8317",
    "http://[::1]:8317",
    // Judging the address rather than its spelling cuts both ways: the mapped
    // form of 127.0.0.1 is the same host the exception exists for.
    "http://[::ffff:127.0.0.1]:8317",
  ]) {
    assert.equal(isValid(url), true, `${url} must stay allowed`);
  }
});

test("ordinary public proxies stay allowed", () => {
  for (const url of [
    "http://proxy.example.com",
    "https://proxy.example.com:3128",
    "http://8.8.8.8:3128",
    "http://[2606:4700::1111]",
    "http://172.32.0.1", // just outside 172.16.0.0/12
    "http://192.169.0.1", // just outside 192.168.0.0/16
  ]) {
    assert.equal(isValid(url), true, `${url} must stay allowed`);
  }
});

test("the non-host validations are unchanged", () => {
  assert.deepEqual(validateProxyUrl("https://proxy.example.com"), {
    valid: true,
    url: "https://proxy.example.com",
  });
  assert.equal(validateProxyUrl("ftp://proxy.example.com").valid, false);
  assert.match(String(validateProxyUrl("not-a-url").error), /Invalid URL/);
  assert.match(
    String(validateProxyUrl("http://169.254.169.254").error),
    /private\/internal address/
  );
});
