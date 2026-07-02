import test from "node:test";
import assert from "node:assert/strict";
import { Writable } from "node:stream";
import { redactString, redact, RedactTransform } from "../../scripts/sre/redact-logs.mjs";

// ─── 1. email ────────────────────────────────────────────────────────────────

test("redactString: standard email is replaced", () => {
  const { output, counts } = redactString("contact alice@example.com for details");
  assert.equal(output, "contact [REDACTED_EMAIL] for details");
  assert.equal(counts.EMAIL, 1);
});

test("redactString: sub-domain email is replaced", () => {
  const { output } = redactString("ping ops+sre@mail.omniroute.dev today");
  assert.equal(output, "ping [REDACTED_EMAIL] today");
});

test("redactString: email-like but missing TLD is preserved", () => {
  // "user@host" is not a valid email; should NOT match.
  const { output, counts } = redactString("note user@host is mentioned");
  assert.equal(output, "note user@host is mentioned");
  assert.equal(counts.EMAIL ?? 0, 0);
});

// ─── 2. IPv4 ────────────────────────────────────────────────────────────────

test("redactString: IPv4 address is redacted", () => {
  const { output, counts } = redactString("client connected from 192.168.1.42");
  assert.equal(output, "client connected from [REDACTED_IPV4]");
  assert.equal(counts.IPV4, 1);
});

test("redactString: IPv4 with port is redacted including port", () => {
  const { output } = redactString("connect 10.0.0.1:5432 succeeded");
  assert.equal(output, "connect [REDACTED_IPV4] succeeded");
});

test("redactString: invalid octet (256) is NOT redacted", () => {
  const { output, counts } = redactString("value 256.300.1.1 invalid");
  // The "256.300.1.1" should NOT match (octets > 255).
  // It's possible that a partial substring like "56.300" might still match
  // through other regex runs; assert that no full-IP redaction appears.
  assert.equal(output.includes("[REDACTED_IPV4]"), false);
  assert.equal((counts.IPV4 ?? 0), 0);
});

test("redactString: 127.0.0.1 is redacted (loopback is still PII for log shipping)", () => {
  const { output } = redactString("local check from 127.0.0.1 ok");
  assert.equal(output, "local check from [REDACTED_IPV4] ok");
});

// ─── 3. IPv6 ────────────────────────────────────────────────────────────────

test("redactString: full IPv6 is redacted", () => {
  const { output, counts } = redactString("peer 2001:0db8:85a3:0000:0000:8a2e:0370:7334 connected");
  assert.equal(output, "peer [REDACTED_IPV6] connected");
  assert.equal(counts.IPV6, 1);
});

test("redactString: compressed IPv6 is redacted", () => {
  const { output } = redactString("from fe80::1 to ::1");
  // Both addresses should be replaced.
  assert.match(output, /from \[REDACTED_IPV6\] to \[REDACTED_IPV6\]/);
});

test("redactString: ::1 loopback is redacted", () => {
  const { output } = redactString("traffic from ::1 only");
  assert.match(output, /traffic from \[REDACTED_IPV6\] only/);
});

// ─── 4. Bearer tokens ───────────────────────────────────────────────────────

test("redactString: Bearer token in Authorization header is redacted", () => {
  const { output, counts } = redactString("Authorization: Bearer abcdefghijklmnopqrstuvwxyz012345");
  assert.match(output, /\[REDACTED_BEARER\]/);
  assert.equal(counts.BEARER, 1);
});

test("redactString: 'Bearer' word without a token is preserved", () => {
  const { output, counts } = redactString("the bearer of bad news");
  // "bad news" is too short to match (needs 16+ chars).
  assert.equal(output, "the bearer of bad news");
  assert.equal((counts.BEARER ?? 0), 0);
});

// ─── 5. OpenAI keys ─────────────────────────────────────────────────────────

test("redactString: sk- prefix key is redacted", () => {
  const { output, counts } = redactString("OPENAI_KEY=sk-proj-abc123XYZ456def789GHI012jkl");
  assert.match(output, /\[REDACTED_API_KEY\]/);
  assert.ok((counts.OPENAI_KEY ?? 0) >= 1 || (counts.GENERIC_KEY ?? 0) >= 1);
});

test("redactString: sk- short token (too short) is NOT redacted", () => {
  // 18 chars after "sk-" — minimum is 20.
  const { output } = redactString("noise: sk-abcdefghijklmnopqr here");
  assert.equal(output, "noise: sk-abcdefghijklmnopqr here");
});

test("redactString: anthropic sk-ant- key is redacted", () => {
  const { output, counts } = redactString("key: sk-ant-api03-abcdefghij1234567890ABCD");
  assert.match(output, /\[REDACTED_API_KEY\]/);
  assert.equal(counts.ANTHROPIC_KEY, 1);
});

test("redactString: Google AIza key is redacted", () => {
  // Total 39 chars: "AIza" (4) + 35 alnum/hyphen/underscore.
  const key = "AIzaSyD-1234567890abcdefghijklmnopqrstu";
  assert.equal(key.length, 39);
  const { output, counts } = redactString(`google_key=${key}`);
  assert.match(output, /\[REDACTED_API_KEY\]/);
  assert.equal(counts.GOOGLE_KEY, 1);
});

// ─── 6. GitHub tokens ───────────────────────────────────────────────────────

test("redactString: ghp_ token is redacted", () => {
  const token = "ghp_" + "a".repeat(36);
  const { output, counts } = redactString(`token=${token}`);
  assert.match(output, /\[REDACTED_API_KEY\]/);
  assert.equal(counts.GITHUB_TOKEN, 1);
});

test("redactString: github_pat_ token is redacted", () => {
  const token = "github_pat_" + "B".repeat(40);
  const { output } = redactString(`pat is ${token} end`);
  assert.match(output, /pat is \[REDACTED_API_KEY\] end/);
});

// ─── 7. AWS keys ────────────────────────────────────────────────────────────

test("redactString: AKIA access key is redacted", () => {
  const key = "AKIAIOSFODNN7EXAMPLE"; // 20 chars
  const { output, counts } = redactString(`aws_access_key_id=${key}`);
  assert.match(output, /\[REDACTED_AWS_KEY\]/);
  assert.equal(counts.AWS_KEY, 1);
});

test("redactString: ASIA (temporary) key is redacted", () => {
  const key = "ASIAIOSFODNN7EXAMPLE";
  const { output, counts } = redactString(`temp=${key}`);
  assert.match(output, /\[REDACTED_AWS_KEY\]/);
  assert.equal(counts.AWS_KEY, 1);
});

// ─── 8. Generic api_key=value ───────────────────────────────────────────────

test("redactString: api_key=value pair is redacted", () => {
  const { output, counts } = redactString(`api_key=${"x".repeat(20)}`);
  assert.match(output, /\[REDACTED_API_KEY\]/);
  assert.equal(counts.GENERIC_KEY, 1);
});

test("redactString: password=... is redacted", () => {
  const { output, counts } = redactString(`password: ${"hunter2hunter2hunter2"}`);
  assert.match(output, /\[REDACTED_API_KEY\]/);
  assert.equal(counts.GENERIC_KEY, 1);
});

test("redactString: short value (< 12 chars) is NOT redacted", () => {
  const { output, counts } = redactString("password: short");
  assert.equal(output, "password: short");
  assert.equal((counts.GENERIC_KEY ?? 0), 0);
});

// ─── 9. Combined / order of operations ──────────────────────────────────────

test("redactString: line with email AND ip AND key redacts all three", () => {
  const line = `2026-06-25T07:00:00Z ERROR user=alice@example.com ip=10.0.0.5 key=sk-proj-${"A".repeat(30)}`;
  const { output, counts } = redactString(line);
  assert.match(output, /\[REDACTED_EMAIL\]/);
  assert.match(output, /\[REDACTED_IPV4\]/);
  assert.match(output, /\[REDACTED_API_KEY\]/);
  // Counts should be at least one of each category.
  assert.ok((counts.EMAIL ?? 0) >= 1);
  assert.ok((counts.IPV4 ?? 0) >= 1);
  assert.ok((counts.OPENAI_KEY ?? 0) >= 1);
});

test("redactString: empty string yields empty output", () => {
  const { output, counts } = redactString("");
  assert.equal(output, "");
  assert.deepEqual(counts, {});
});

test("redactString: non-PII log line is unchanged", () => {
  const line = '2026-06-25T07:00:00Z INFO request_id=req_abc123 method=GET path=/v1/models';
  const { output } = redactString(line);
  assert.equal(output, line);
});

test("redactString: key inside larger word (not at boundary) is not matched", () => {
  // `task-abc123XYZ456def789GHI012jkl345` is not preceded by 'sk-' so should
  // not match the OPENAI_KEY pattern.
  const { output, counts } = redactString("some task-abcdefghij1234567890KL here");
  assert.equal(output, "some task-abcdefghij1234567890KL here");
  assert.equal((counts.OPENAI_KEY ?? 0), 0);
});

// ─── 10. Stable markers across runs ─────────────────────────────────────────

test("redactString: same input twice yields the same redacted output", () => {
  const line = `ip=192.168.0.1 user=${"a".repeat(40)}@example.com`;
  const first = redactString(line).output;
  const second = redactString(line).output;
  assert.equal(first, second);
});

// ─── 11. redact() shorthand ─────────────────────────────────────────────────

test("redact(): shorthand returns just the output", () => {
  assert.equal(redact("email bob@example.com here"), "email [REDACTED_EMAIL] here");
});

// ─── 12. RedactTransform stream ─────────────────────────────────────────────

test("RedactTransform: streams input chunks to output, redacting as it goes", async () => {
  const t = new RedactTransform();
  const out = [];
  const sink = new Writable({
    write(chunk, _enc, cb) {
      out.push(typeof chunk === "string" ? chunk : chunk.toString("utf8"));
      cb();
    },
  });
  const src = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("email a@b.com "));
      controller.enqueue(new TextEncoder().encode("ip=1.2.3.4 "));
      controller.enqueue(new TextEncoder().encode("end\n"));
      controller.close();
    },
  });
  await src.pipeThrough(new TextDecoderStream()).pipeThrough(t).pipeTo(
    new WritableStream({
      write(chunk) {
        sink.write(chunk, "utf8", () => {});
      },
    }),
  );
  const joined = out.join("");
  assert.match(joined, /\[REDACTED_EMAIL\]/);
  assert.match(joined, /\[REDACTED_IPV4\]/);
  // Counts accumulated on the transform.
  assert.equal(t.counts.EMAIL ?? 0, 1);
  assert.equal(t.counts.IPV4 ?? 0, 1);
});

// ─── 13. Counts are independent between calls ───────────────────────────────

test("redactString: counts do not bleed across calls", () => {
  redactString("a@b.com");
  const { counts } = redactString("no pii here at all");
  assert.deepEqual(counts, {});
});