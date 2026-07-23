import test from "node:test";
import assert from "node:assert/strict";
import { parseBulkImportText } from "../../src/app/(dashboard)/dashboard/settings/components/parseBulkProxyImport.ts";

// ── 2-part auth-less shorthand: host:port ─────────────────────────────────────

test("auth-less host:port produces socks5 entry with generated name (default type changed from http to socks5)", () => {
  const { entries, errors } = parseBulkImportText("127.0.0.1:7897");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  const e = entries[0];
  assert.equal(e.host, "127.0.0.1");
  assert.equal(e.port, 7897);
  assert.equal(e.type, "socks5");
  assert.equal(e.username, "");
  assert.equal(e.password, "");
  assert.equal(e.status, "active");
  assert.match(e.name, /127\.0\.0\.1:7897/);
});

test("auth-less host:port with hostname (not IP)", () => {
  const { entries, errors } = parseBulkImportText("proxy.example.com:3128");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].host, "proxy.example.com");
  assert.equal(entries[0].port, 3128);
});

test("auth-less host:port with port 0 produces error", () => {
  const { entries, errors } = parseBulkImportText("127.0.0.1:0");
  assert.equal(entries.length, 0);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].reason, "bulkImportErrorInvalidPort");
});

test("auth-less host:port with port > 65535 produces error", () => {
  const { entries, errors } = parseBulkImportText("127.0.0.1:99999");
  assert.equal(entries.length, 0);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].reason, "bulkImportErrorInvalidPort");
});

test("auth-less host:port with non-numeric port produces error", () => {
  const { entries, errors } = parseBulkImportText("127.0.0.1:abc");
  assert.equal(entries.length, 0);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].reason, "bulkImportErrorInvalidPort");
});

// ── 4-part shorthand: ip:port:user:pass ───────────────────────────────────────

test("ip:port:user:pass parses correctly", () => {
  const { entries, errors } = parseBulkImportText("138.99.147.218:50101:myuser:mypass");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  const e = entries[0];
  assert.equal(e.host, "138.99.147.218");
  assert.equal(e.port, 50101);
  assert.equal(e.username, "myuser");
  assert.equal(e.password, "mypass");
  assert.equal(e.type, "socks5");
  assert.match(e.name, /138\.99\.147\.218:50101/);
});

test("ip:port:user:pass with hostname works", () => {
  const { entries, errors } = parseBulkImportText("proxy.example.com:3128:user:pass");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].host, "proxy.example.com");
  assert.equal(entries[0].username, "user");
  assert.equal(entries[0].password, "pass");
});

// ── @-style shorthand: user:pass@ip:port ─────────────────────────────────────

test("user:pass@ip:port parses correctly", () => {
  const { entries, errors } = parseBulkImportText("myuser:mypass@138.99.147.218:50101");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  const e = entries[0];
  assert.equal(e.host, "138.99.147.218");
  assert.equal(e.port, 50101);
  assert.equal(e.username, "myuser");
  assert.equal(e.password, "mypass");
  assert.equal(e.type, "socks5");
});

test("user:pass@hostname:port parses correctly", () => {
  const { entries, errors } = parseBulkImportText("admin:secret@proxy.example.com:443");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].host, "proxy.example.com");
  assert.equal(entries[0].port, 443);
  assert.equal(entries[0].username, "admin");
  assert.equal(entries[0].password, "secret");
});

// ── user:pass:ip:port shorthand ───────────────────────────────────────────────

test("user:pass:ip:port parses correctly", () => {
  const { entries, errors } = parseBulkImportText("myuser:mypass:138.99.147.218:50101");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  const e = entries[0];
  assert.equal(e.host, "138.99.147.218");
  assert.equal(e.port, 50101);
  assert.equal(e.username, "myuser");
  assert.equal(e.password, "mypass");
});

// ── protocol:// shorthand ──────────────────────────────────────────────────────

test("protocol://ip:port parses with explicit type", () => {
  const { entries, errors } = parseBulkImportText("http://10.0.0.50:8080");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  const e = entries[0];
  assert.equal(e.host, "10.0.0.50");
  assert.equal(e.port, 8080);
  assert.equal(e.type, "http");
  assert.equal(e.username, "");
  assert.equal(e.password, "");
});

test("socks5://ip:port parses with explicit type", () => {
  const { entries, errors } = parseBulkImportText("socks5://1.2.3.4:1080");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].type, "socks5");
  assert.equal(entries[0].host, "1.2.3.4");
  assert.equal(entries[0].port, 1080);
});

test("https://ip:port parses with explicit type", () => {
  const { entries, errors } = parseBulkImportText("https://proxy.example.com:443");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].type, "https");
  assert.equal(entries[0].host, "proxy.example.com");
  assert.equal(entries[0].port, 443);
});

test("protocol://user:pass@ip:port parses with auth + explicit type", () => {
  const { entries, errors } = parseBulkImportText("https://admin:secret123@proxy.example.com:443");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  const e = entries[0];
  assert.equal(e.type, "https");
  assert.equal(e.host, "proxy.example.com");
  assert.equal(e.port, 443);
  assert.equal(e.username, "admin");
  assert.equal(e.password, "secret123");
});

test("http://user:pass@ip:port parses correctly", () => {
  const { entries, errors } = parseBulkImportText("http://user:pass@10.0.0.50:8080");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].type, "http");
  assert.equal(entries[0].username, "user");
  assert.equal(entries[0].password, "pass");
});

// ── Protocol header mode ───────────────────────────────────────────────────────

test("protocol header sets default type for subsequent shorthand lines", () => {
  const text = [
    "http",
    "1.2.3.4:8080",
    "5.6.7.8:3128:user:pass",
    "user:pass@9.10.11.12:443",
  ].join("\n");
  const { entries, errors } = parseBulkImportText(text);
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 3);
  assert.equal(entries[0].type, "http");
  assert.equal(entries[1].type, "http");
  assert.equal(entries[2].type, "http");
});

test("protocol:// prefix overrides protocol header default", () => {
  const text = [
    "socks5",
    "http://1.2.3.4:8080",
    "1.2.3.4:1080",
  ].join("\n");
  const { entries, errors } = parseBulkImportText(text);
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 2);
  assert.equal(entries[0].type, "http", "explicit protocol:// must override header");
  assert.equal(entries[1].type, "socks5", "no-prefix line falls back to header default");
});

test("protocol header mode with mixed shorthand and pipe formats", () => {
  const text = [
    "https",
    "1.2.3.4:443",
    "named-proxy|5.6.7.8|8080|||socks5||active|pipe entry keeps own type",
  ].join("\n");
  const { entries, errors } = parseBulkImportText(text);
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 2);
  assert.equal(entries[0].type, "https", "shorthand inherits header");
  assert.equal(entries[1].type, "socks5", "pipe entry keeps its own TYPE field");
});

test("protocol header only affects lines after it", () => {
  const text = [
    "1.2.3.4:1080",
    "http",
    "1.2.3.4:8080",
  ].join("\n");
  const { entries, errors } = parseBulkImportText(text);
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 2);
  assert.equal(entries[0].type, "socks5", "line before header gets default socks5");
  assert.equal(entries[1].type, "http", "line after header gets http");
});

// ── Regression: pipe-delimited full format still works ────────────────────────

test("pipe-delimited NAME|HOST|PORT with all optional fields", () => {
  const line = "my-proxy|10.0.0.1|8080|user|pass|http|US|active|notes here";
  const { entries, errors } = parseBulkImportText(line);
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  const e = entries[0];
  assert.equal(e.name, "my-proxy");
  assert.equal(e.host, "10.0.0.1");
  assert.equal(e.port, 8080);
  assert.equal(e.username, "user");
  assert.equal(e.password, "pass");
  assert.equal(e.type, "http");
  assert.equal(e.region, "US");
  assert.equal(e.status, "active");
  assert.equal(e.notes, "notes here");
});

test("pipe-delimited minimal NAME|HOST|PORT defaults type to socks5", () => {
  const { entries, errors } = parseBulkImportText("p|10.0.0.2|1080");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].type, "socks5");
  assert.equal(entries[0].status, "active");
});

test("pipe-delimited missing NAME produces error", () => {
  const { errors } = parseBulkImportText("|10.0.0.1|8080");
  assert.equal(errors.length, 1);
  assert.equal(errors[0].reason, "bulkImportErrorMissingName");
});

test("pipe-delimited invalid port produces error", () => {
  const { errors } = parseBulkImportText("proxy|10.0.0.1|notaport");
  assert.equal(errors.length, 1);
  assert.equal(errors[0].reason, "bulkImportErrorInvalidPort");
});

test("pipe-delimited invalid type produces error", () => {
  const { errors } = parseBulkImportText("p|10.0.0.1|8080|||ftp");
  assert.equal(errors.length, 1);
  assert.equal(errors[0].reason, "bulkImportErrorInvalidType");
});

// ── Mixed lines ───────────────────────────────────────────────────────────────

test("mixed: comment lines and blank lines are skipped", () => {
  const text = [
    "# this is a comment",
    "",
    "127.0.0.1:7897",
    "# another comment",
    "proxy-us|10.0.0.1|3128",
  ].join("\n");
  const { entries, errors, skipped } = parseBulkImportText(text);
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 2);
  assert.equal(skipped, 3);
  assert.equal(entries[0].host, "127.0.0.1");
  assert.equal(entries[1].host, "10.0.0.1");
});

test("multiple auth-less entries in one block", () => {
  const text = ["10.0.0.1:1080", "10.0.0.2:3128", "10.0.0.3:8888"].join("\n");
  const { entries, errors } = parseBulkImportText(text);
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 3);
  assert.equal(entries[0].port, 1080);
  assert.equal(entries[1].port, 3128);
  assert.equal(entries[2].port, 8888);
});

test("full real-world mixed import block", () => {
  const text = [
    "# My proxy list",
    "socks5",
    "138.99.147.218:50101:myuser:mypass",
    "200.234.177.62:50101:otheruser:otherpass",
    "http://10.0.0.50:8080",
    "https://admin:secret@proxy.example.com:443",
    "",
    "named-proxy|5.6.7.8|3128|user|pass|http|US|active|via pipe",
  ].join("\n");
  const { entries, errors, skipped } = parseBulkImportText(text);
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 5);
  assert.equal(skipped, 2); // comment + blank line
  assert.equal(entries[0].type, "socks5");
  assert.equal(entries[1].type, "socks5");
  assert.equal(entries[2].type, "http");
  assert.equal(entries[3].type, "https");
  assert.equal(entries[4].type, "http");
  assert.equal(entries[4].name, "named-proxy");
});

// ── Edge cases ─────────────────────────────────────────────────────────────────

test("4-colon ambiguous line where part0 is not host-like defaults to user:pass:ip:port", () => {
  const { entries, errors } = parseBulkImportText("myuser:mypass:1.2.3.4:1080");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].host, "1.2.3.4");
  assert.equal(entries[0].port, 1080);
  assert.equal(entries[0].username, "myuser");
  assert.equal(entries[0].password, "mypass");
});

test("single colon without port number produces error", () => {
  const { entries, errors } = parseBulkImportText("justtext:nonsense");
  assert.equal(entries.length, 0);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].reason, "bulkImportErrorInvalidPort");
});

test("bare text with no colons or pipes produces error", () => {
  const { entries, errors } = parseBulkImportText("justtext");
  assert.equal(entries.length, 0);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].reason, "bulkImportErrorMissingHost");
});
