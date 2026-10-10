import { test } from "node:test";
import assert from "node:assert/strict";

import {
  pickCanonicalAlibabaFreeTierConnection,
  type AlibabaConnectionLike,
} from "../../open-sse/services/alibabaFreeTierQuotaClassify.ts";

const fields = {
  capableKey: "alibabaFreeTierCapableModels",
  noFreeTierKey: "alibabaNoFreeTierModels",
  drainedKey: "alibabaFreeDrainedModels",
};

function connection(
  id: string,
  opts: {
    billing?: "free" | "paid";
    syncAt?: string;
    capable?: string[];
    blocked?: string[];
  } = {}
): AlibabaConnectionLike {
  const psd: Record<string, unknown> = {};
  if (opts.billing !== "paid") psd.alibabaBillingMode = "free";
  if (opts.syncAt) psd.alibabaFreeTierQuotaLastSyncAt = opts.syncAt;
  if (opts.capable) psd[fields.capableKey] = opts.capable;
  if (opts.blocked) psd[fields.noFreeTierKey] = opts.blocked;
  return { id, providerSpecificData: psd };
}

test("returns undefined when no connection has a free-tier quota sync", () => {
  const connections = [connection("a", { syncAt: undefined }), connection("b")];
  assert.equal(pickCanonicalAlibabaFreeTierConnection(connections, fields), undefined);
});

test("ignores paid connections even if they carry a sync timestamp", () => {
  const paidButSynced = connection("paid", { billing: "paid", syncAt: "2026-10-09T00:00:00Z" });
  const freeSynced = connection("free", { syncAt: "2026-10-01T00:00:00Z" });
  const result = pickCanonicalAlibabaFreeTierConnection([paidButSynced, freeSynced], fields);
  assert.equal(result?.id, "free");
});

test("among synced free connections, prefers the most recently synced one", () => {
  const older = connection("older", { syncAt: "2026-10-01T00:00:00Z", capable: ["qwen3"] });
  const newer = connection("newer", { syncAt: "2026-10-09T00:00:00Z", capable: ["qwen3"] });
  const result = pickCanonicalAlibabaFreeTierConnection([older, newer], fields);
  assert.equal(result?.id, "newer");
});

test("prefers a synced connection that declares eligibility lists over one that declares neither", () => {
  const noLists = connection("no-lists", { syncAt: "2026-10-09T00:00:00Z" });
  const withLists = connection("with-lists", {
    syncAt: "2026-10-05T00:00:00Z",
    capable: ["qwen3"],
  });
  const result = pickCanonicalAlibabaFreeTierConnection([noLists, withLists], fields);
  assert.equal(
    result?.id,
    "with-lists",
    "a connection with no capable/blocked list is less canonical than one that declares eligibility, even if synced later"
  );
});

test("falls back to the synced pool when none of them declare eligibility lists", () => {
  const older = connection("older", { syncAt: "2026-10-01T00:00:00Z" });
  const newer = connection("newer", { syncAt: "2026-10-09T00:00:00Z" });
  const result = pickCanonicalAlibabaFreeTierConnection([older, newer], fields);
  assert.equal(result?.id, "newer");
});

test("a connection with only a blocked-models list also counts as declaring eligibility", () => {
  const blockedOnly = connection("blocked-only", {
    syncAt: "2026-10-05T00:00:00Z",
    blocked: ["qwen3-vl"],
  });
  const noLists = connection("no-lists", { syncAt: "2026-10-09T00:00:00Z" });
  const result = pickCanonicalAlibabaFreeTierConnection([noLists, blockedOnly], fields);
  assert.equal(
    result?.id,
    "blocked-only",
    "a connection with only a blocked list still declares eligibility and is preferred over one with no lists at all"
  );
});
