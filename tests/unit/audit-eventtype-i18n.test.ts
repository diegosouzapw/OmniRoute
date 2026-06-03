import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "../..");
const read = (p: string) => readFileSync(join(root, p), "utf8");
const en = JSON.parse(read("src/i18n/messages/en.json"));
const pt = JSON.parse(read("src/i18n/messages/pt-BR.json"));

test("audit: compliance.eventTypes exists with en/pt-BR parity and key coverage", () => {
  const enKeys = Object.keys(en.compliance?.eventTypes ?? {});
  const ptKeys = Object.keys(pt.compliance?.eventTypes ?? {});
  assert.ok(enKeys.length >= 30, `expected >=30 event-type labels, got ${enKeys.length}`);
  assert.deepEqual(enKeys.sort(), ptKeys.sort(), "en/pt-BR eventTypes keys must match");
  for (const k of ["provider.credentials.created", "auth.login.success", "quota.pool.created", "sync.token.revoked"]) {
    assert.ok(en.compliance.eventTypes[k], `en missing eventTypes.${k}`);
    assert.ok(pt.compliance.eventTypes[k], `pt-BR missing eventTypes.${k}`);
  }
});

test("audit: ComplianceTab translates action and A2aAuditTab translates task state", () => {
  const ct = read("src/app/(dashboard)/dashboard/audit/ComplianceTab.tsx");
  const a2a = read("src/app/(dashboard)/dashboard/audit/A2aAuditTab.tsx");
  assert.ok(ct.includes("eventTypes.${entry.action}"), "ComplianceTab uses eventTypes i18n lookup");
  assert.ok(a2a.includes("a2aState${task.state"), "A2aAuditTab uses a2aState i18n lookup");
});
