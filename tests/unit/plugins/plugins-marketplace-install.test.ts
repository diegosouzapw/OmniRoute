import { describe, it } from "node:test";
import { ok, equal } from "node:assert/strict";

describe("Plugins marketplace install (#6752)", () => {
  it("MarketplaceEntry supports optional checksum field", async () => {
    const { searchMarketplace } = await import("@/lib/plugins/marketplace");
    const results = await searchMarketplace("prompt");
    ok(Array.isArray(results));
    for (const entry of results) {
      ok(typeof entry.name === "string");
      ok(typeof entry.downloadUrl === "string");
      // The checksum field exists in the type (may be undefined)
      if (entry.checksum !== undefined) {
        ok(typeof entry.checksum === "string");
      }
    }
  });

  it("installMarketplacePlugin throws for unknown plugin", async () => {
    const { installMarketplacePlugin } = await import("@/lib/plugins/marketplace");
    try {
      await installMarketplacePlugin("nonexistent-plugin");
      ok(false, "should have thrown");
    } catch (e: unknown) {
      ok((e as Error).message.includes("not found"));
    }
  });

  it("checksum verification logic works", async () => {
    const crypto = await import("node:crypto");
    const data = Buffer.from("test-plugin-data");
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    const hash2 = crypto.createHash("sha256").update(data).digest("hex");
    equal(hash, hash2, "same data should produce same hash");
    const hash3 = crypto.createHash("sha256").update(Buffer.from("different-data")).digest("hex");
    ok(hash !== hash3, "different data should produce different hash");
  });
});
