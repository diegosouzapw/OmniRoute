import assert from "node:assert/strict";
import test from "node:test";
import { parseBulkImportText } from "../../src/app/(dashboard)/dashboard/settings/components/parseBulkProxyImport.ts";

test(
  "bulk import preserves explicit trailing names and session credentials",
  { timeout: 1_000 },
  () => {
    const result = parseBulkImportText(
      [
        "socks5://gateway.example.invalid:12000:session-000:fixture-password:UK 1",
        "http://gateway.example.invalid:12001:session-001:fixture-password:UK 2",
        "https://gateway.example.invalid:12002:session-002:fixture-password:UK 3",
      ].join("\n")
    );
    assert.deepEqual(result.errors, []);
    assert.deepEqual(
      result.entries.map(({ name, type, port, username, password }) => ({
        name,
        type,
        port,
        username,
        password,
      })),
      [
        {
          name: "UK 1",
          type: "socks5",
          port: 12000,
          username: "session-000",
          password: "fixture-password",
        },
        {
          name: "UK 2",
          type: "http",
          port: 12001,
          username: "session-001",
          password: "fixture-password",
        },
        {
          name: "UK 3",
          type: "https",
          port: 12002,
          username: "session-002",
          password: "fixture-password",
        },
      ]
    );
  }
);

test(
  "named bulk imports preserve Unicode names, bracketed IPv6 and at-sign credentials",
  { timeout: 1_000 },
  () => {
    const result = parseBulkImportText(
      "socks5://[2001:db8::1]:1080:user@example.invalid:fixture@password:پراکسی ۱"
    );
    assert.deepEqual(result.errors, []);
    assert.equal(result.entries[0].host, "2001:db8::1");
    assert.equal(result.entries[0].name, "پراکسی ۱");
    assert.equal(result.entries[0].username, "user@example.invalid");
    assert.equal(result.entries[0].password, "fixture@password");
  }
);

test(
  "malformed named rows cannot import partial credentials or expose their contents",
  { timeout: 1_000 },
  () => {
    for (const row of [
      "socks5://gateway.example.invalid:0:fixture-user:fixture-password:UK",
      "socks5://gateway.example.invalid:65536:fixture-user:fixture-password:UK",
      "socks5://gateway.example.invalid:1.5:fixture-user:fixture-password:UK",
      "socks5://gateway.example.invalid:12000:fixture-user:fixture-password:",
      "socks5://gateway.example.invalid:12000:fixture-user:fixture:password:UK",
      "socks5://:12000:fixture-user:fixture-password:UK",
      "vless://gateway.example.invalid:12000:fixture-user:fixture-password:UK",
      "socks5://gateway.example.invalid:1080:user@example.invalid:pass:UK:1234",
    ]) {
      const result = parseBulkImportText(row);
      assert.deepEqual(result.entries, []);
      assert.equal(result.errors.length, 1);
      assert.equal(result.errors[0].line, 1);
      assert.doesNotMatch(JSON.stringify(result.errors), /fixture-user|fixture-password/);
    }
  }
);

test(
  "existing pipe, protocol headers and legacy shorthand retain their behavior",
  { timeout: 1_000 },
  () => {
    const result = parseBulkImportText(
      [
        "# synthetic legacy examples",
        "https",
        "gateway.example.invalid:8080",
        "gateway.example.invalid:8081:user:pass",
        "user:pass@gateway.example.invalid:8082",
        "user:pass:gateway.example.invalid:8083",
        "socks5://user:pass@gateway.example.invalid:8084",
        "Legacy|gateway.example.invalid|8085|user|pass|http|GB|inactive|note",
        "socks5://user:colon:password@gateway.example.invalid:8086",
      ].join("\n")
    );
    assert.deepEqual(result.errors, []);
    assert.equal(result.entries.length, 7);
    assert.equal(result.entries[0].name, "Imported gateway.example.invalid:8080");
    assert.deepEqual(
      result.entries.map((entry) => entry.type),
      ["https", "https", "https", "https", "socks5", "http", "socks5"]
    );
    assert.equal(result.entries[5].name, "Legacy");
    assert.equal(result.entries[5].status, "inactive");
    assert.equal(result.entries[5].notes, "note");
    assert.equal(result.entries[6].username, "user");
    assert.equal(result.entries[6].password, "colon:password");
    for (const password of ["one:two:three", "123:two:three"]) {
      for (const endpoint of ["gateway.example.invalid:8080", " gateway.example.invalid : 8080"]) {
        const legacy = parseBulkImportText(`socks5://user:${password}@${endpoint}`);
        assert.deepEqual(legacy.errors, []);
        assert.equal(legacy.entries[0].host, "gateway.example.invalid");
        assert.equal(legacy.entries[0].username, "user");
        assert.equal(legacy.entries[0].password, password);
      }
    }
  }
);
