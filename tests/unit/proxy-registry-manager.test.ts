import test from "node:test";
import assert from "node:assert/strict";
import { parseBulkImportText } from "../../src/app/(dashboard)/dashboard/settings/components/parseBulkProxyImport.ts";

// ── 2-part auth-less shorthand: host:port ─────────────────────────────────────

test("auth-less host:port produces http entry with generated name", () => {
  const { entries, errors } = parseBulkImportText("127.0.0.1:7897");
  assert.equal(errors.length, 0);
  assert.equal(entries.length, 1);
  const e = entries[0];
  assert.equal(e.host, "127.0.0.1");
  assert.equal(e.port, 7897);
  assert.equal(e.type, "http");
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
