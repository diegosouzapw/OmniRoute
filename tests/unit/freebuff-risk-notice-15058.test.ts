import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

// #15058: Freebuff suspends free-mode accounts used through third-party clients/proxies.
describe("#15058 freebuff risk notice", () => {
  it("flags freebuff with subscriptionRisk + a riskNoticeVariant", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const p = (APIKEY_PROVIDERS as Record<string, Record<string, unknown>>).freebuff;
    assert.ok(p, "freebuff provider must exist");
    assert.strictEqual(p.subscriptionRisk, true);
    assert.strictEqual(p.riskNoticeVariant, "official-client-only");
  });

  it("has no 'harvester' wording in provider hints or the add-key modal", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const p = (APIKEY_PROVIDERS as Record<string, Record<string, unknown>>).freebuff;
    const hints = [p.authHint, p.apiHint, p.freeNote].filter(Boolean).join(" ");
    assert.doesNotMatch(hints, /harvester/i);
    const modal = fs.readFileSync(
      path.resolve(
        "src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal.tsx"
      ),
      "utf8"
    );
    assert.doesNotMatch(modal, /harvester/i);
  });

  it("has English copy for the official-client-only variant", async () => {
    const en = JSON.parse(fs.readFileSync(path.resolve("src/i18n/messages/en.json"), "utf8"));
    assert.ok(en.providers.riskNotice["official-client-only"]);
  });
});
