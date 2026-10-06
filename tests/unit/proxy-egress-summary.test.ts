/**
 * Anonymous egress-IP sharing summary (#10677). The pure aggregate
 * must never leak IP literals or account identities — the redaction decision
 * from #10348/#10539. Dedupes proxy_logs rows per account, reuses
 * analyzeEgressSharing's rotation-group semantics.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { summarizeEgressSharing } = (await import("../../src/lib/proxyEgress.ts")) as unknown as {
  summarizeEgressSharing: (
    rows: Array<{
      provider: string | null;
      account: string | null;
      connectionId: string | null;
      egressIp: string | null;
    }>,
    window: { start: string; end: string }
  ) => {
    summary: {
      windowStart: string;
      windowEnd: string;
      distinctEgressIps: number;
      sharingByRotationGroup: Array<{
        rotationGroup: string;
        sharedIps: number;
        maxAccountsSharingOneIp: number;
      }>;
      maxAccountsSharingOneIp: number;
    };
    warnings: Array<{ egressIp: string; rotationGroup: string; connections: string[] }>;
  };
};

const WINDOW = { start: "2026-08-20T00:00:00.000Z", end: "2026-08-21T00:00:00.000Z" };
const row = (
  over: Partial<{ provider: string; account: string; connectionId: string; egressIp: string }>
) => ({
  provider: "codex",
  account: "acc-a",
  connectionId: "conn-a",
  egressIp: "100.115.194.84",
  ...over,
});

test("summarizeEgressSharing: two accounts of one rotation group on the same IP", () => {
  const { summary: s } = summarizeEgressSharing(
    [
      row({ account: "acc-a", connectionId: "conn-a" }),
      row({ account: "acc-b", connectionId: "conn-b" }),
    ],
    WINDOW
  );
  assert.equal(s.windowStart, WINDOW.start);
  assert.equal(s.windowEnd, WINDOW.end);
  assert.equal(s.distinctEgressIps, 1);
  assert.equal(s.maxAccountsSharingOneIp, 2);
  assert.equal(s.sharingByRotationGroup.length, 1);
  assert.equal(s.sharingByRotationGroup[0].rotationGroup, "openai-auth0"); // codex+openai family
  assert.equal(s.sharingByRotationGroup[0].sharedIps, 1);
  assert.equal(s.sharingByRotationGroup[0].maxAccountsSharingOneIp, 2);
});

test("summarizeEgressSharing: repeated rows of the same account on one IP count once", () => {
  const { summary: s } = summarizeEgressSharing(
    [
      row({ account: "acc-a", connectionId: "conn-a" }),
      row({ account: "acc-a", connectionId: "conn-a" }),
      row({ account: "acc-b", connectionId: "conn-b" }),
      row({ account: "acc-b", connectionId: "conn-b" }),
    ],
    WINDOW
  );
  assert.equal(s.maxAccountsSharingOneIp, 2, "dedupe per account, not per request");
});

test("summarizeEgressSharing: rows without egressIp are ignored", () => {
  const { summary: s } = summarizeEgressSharing([row({ egressIp: null })], WINDOW);
  assert.equal(s.distinctEgressIps, 0);
  assert.equal(s.maxAccountsSharingOneIp, 0);
  assert.deepEqual(s.sharingByRotationGroup, []);
});

test("summarizeEgressSharing: distinct IPs per account = no sharing", () => {
  const { summary: s } = summarizeEgressSharing(
    [
      row({ egressIp: "203.0.113.1" }),
      row({ account: "acc-b", connectionId: "conn-b", egressIp: "203.0.113.2" }),
    ],
    WINDOW
  );
  assert.equal(s.distinctEgressIps, 2);
  assert.equal(s.sharingByRotationGroup.length, 0);
});

test("summarizeEgressSharing: summary carries counts only — no IP, no account", () => {
  const { summary: s } = summarizeEgressSharing(
    [row({}), row({ account: "acc-b", connectionId: "conn-b" })],
    WINDOW
  );
  const json = JSON.stringify(s);
  assert.ok(!json.includes("100.115.194.84"), "no IP literal in the summary");
  assert.ok(
    !json.includes("acc-a") && !json.includes("acc-b"),
    "no account identity in the summary"
  );
});

test("summarizeEgressSharing: provider without rotation group falls back to provider:<name>", () => {
  const { summary: s } = summarizeEgressSharing(
    [
      row({ provider: "weird-provider" }),
      row({ provider: "weird-provider", account: "acc-b", connectionId: "conn-b" }),
    ],
    WINDOW
  );
  assert.equal(s.sharingByRotationGroup[0].rotationGroup, "provider:weird-provider");
});
