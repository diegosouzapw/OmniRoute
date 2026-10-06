import test from "node:test";
import assert from "node:assert/strict";

const feedback = await import(
  "../../src/app/(dashboard)/dashboard/providers/components/providerImportFeedback.ts"
);
const { parseProviderImportFile } = await import(
  "../../src/app/(dashboard)/dashboard/providers/components/parseProviderImportFile.ts"
);

test("#12071 normalizeImportResponse keeps the per-row errors array", () => {
  const result = feedback.normalizeImportResponse({
    success: 1,
    failed: 2,
    total: 3,
    errors: [
      { index: 1, name: "srv-107", provider: "openai-compatible-chat-001", message: "Unknown or unsupported provider" },
      { index: 2, name: "srv-135", provider: "openai", message: "Provider node not found" },
    ],
  });
  assert.equal(result.success, 1);
  assert.equal(result.failed, 2);
  assert.equal(result.total, 3);
  assert.equal(result.errors.length, 2);
  assert.equal(result.errors[0].message, "Unknown or unsupported provider");
  assert.equal(result.errors[1].name, "srv-135");
});

test("#12071 normalizeImportResponse treats a missing errors field as [] (today's silent drop)", () => {
  const result = feedback.normalizeImportResponse({ success: 0, failed: 3, total: 3 });
  assert.deepEqual(result.errors, []);
  assert.equal(result.failed, 3);
});

test("#12071 normalizeImportResponse ignores a non-array errors field", () => {
  const result = feedback.normalizeImportResponse({ success: 0, failed: 1, total: 1, errors: "boom" });
  assert.deepEqual(result.errors, []);
});

test("#12071 visibleImportErrors caps at 10 and reports the remainder", () => {
  const errors = Array.from({ length: 12 }, (_, i) => ({ message: `row ${i}` }));
  const { shown, extra } = feedback.visibleImportErrors(errors);
  assert.equal(shown.length, 10);
  assert.equal(extra, 2);
  assert.equal(shown[0].message, "row 0");
});

test("#12071 formatImportErrorLine prefers name, then provider, then 1-based row", () => {
  assert.equal(
    feedback.formatImportErrorLine({ name: "Grade-S-Node", message: "Unknown or unsupported provider" }),
    "Grade-S-Node: Unknown or unsupported provider"
  );
  assert.equal(
    feedback.formatImportErrorLine({ provider: "openai", message: "Provider node not found" }),
    "openai: Provider node not found"
  );
  assert.equal(feedback.formatImportErrorLine({ index: 0, message: "failed" }), "row 1: failed");
});

test("#12071 CSV template is positional and parses to one openai row", () => {
  const parsed = parseProviderImportFile(feedback.PROVIDER_IMPORT_CSV_TEMPLATE, "csv");
  assert.equal(parsed.errors.length, 0);
  assert.equal(parsed.entries.length, 1);
  assert.equal(parsed.entries[0].provider, "openai");
  assert.equal(parsed.entries[0].name, "Prod OpenAI");
  assert.equal(parsed.entries[0].apiKey, "sk-your-openai-key");
  assert.equal(parsed.entries[0].priority, 1);
});

test("#12071 CSV template comments document that provider must already exist", () => {
  assert.match(feedback.PROVIDER_IMPORT_CSV_TEMPLATE, /existing managed provider/i);
  assert.match(feedback.PROVIDER_IMPORT_CSV_TEMPLATE, /does not create new endpoint nodes/i);
  assert.match(feedback.PROVIDER_IMPORT_CSV_TEMPLATE, /positional/i);
});

test("#12071 asRowError trims leading/trailing whitespace on message", () => {
  const result = feedback.normalizeImportResponse({
    success: 0,
    failed: 1,
    total: 1,
    errors: [{ name: "srv-107", message: "  Unknown or unsupported provider  " }],
  });
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].message, "Unknown or unsupported provider");
});

test("#12071 applyImportHttpOutcome on !ok zeros success even if the body claimed some", () => {
  const outcome = feedback.applyImportHttpOutcome(
    { ok: false, status: 500 },
    {
      success: 5,
      failed: 0,
      total: 5,
      errors: [{ name: "a", message: "Unknown or unsupported provider" }],
    }
  );
  assert.equal(outcome.shouldRefresh, false);
  assert.equal(outcome.result.success, 0);
  assert.equal(outcome.result.errors.length, 1);
});

test("#12071 applyImportHttpOutcome surfaces non-ok HTTP without calling onImported", () => {
  const outcome = feedback.applyImportHttpOutcome(
    { ok: false, status: 400 },
    { error: "Invalid JSON body" }
  );
  assert.equal(outcome.shouldRefresh, false);
  assert.equal(outcome.result.success, 0);
  assert.equal(outcome.result.failed, 1);
  assert.equal(outcome.result.errors.length, 1);
  assert.match(outcome.result.errors[0].message, /HTTP 400/);
});

test("#12071 applyImportHttpOutcome on ok with success>0 requests refresh", () => {
  const outcome = feedback.applyImportHttpOutcome(
    { ok: true, status: 200 },
    { success: 2, failed: 1, total: 3, errors: [{ name: "bad", message: "Unknown or unsupported provider" }] }
  );
  assert.equal(outcome.shouldRefresh, true);
  assert.equal(outcome.result.success, 2);
  assert.equal(outcome.result.failed, 1);
  assert.equal(outcome.result.errors[0].name, "bad");
});

test("#12071 applyImportHttpOutcome on ok with success=0 still keeps errors and skips refresh", () => {
  const outcome = feedback.applyImportHttpOutcome(
    { ok: true, status: 200 },
    { success: 0, failed: 3, total: 3, errors: [{ name: "a", message: "Unknown or unsupported provider" }] }
  );
  assert.equal(outcome.shouldRefresh, false);
  assert.equal(outcome.result.success, 0);
  assert.equal(outcome.result.errors.length, 1);
});

test("#12071 readImportResponse treats JSON parse failure as !ok with a body error", async () => {
  const res = new Response("not-json", { status: 200, headers: { "Content-Type": "text/plain" } });
  const parsed = await feedback.readImportResponse(res);
  assert.equal(parsed.ok, false);
  assert.equal(parsed.status, 200);
  const outcome = feedback.applyImportHttpOutcome(parsed, parsed.data);
  assert.equal(outcome.shouldRefresh, false);
  assert.match(outcome.result.errors[0].message, /Invalid JSON body/);
});
