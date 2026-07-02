import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const originalFetch = globalThis.fetch;

function mockFetchJson(data, status = 200) {
  globalThis.fetch = async () => ({ ok: status === 200, status, json: async () => data });
}

function mockFetchText(text, status = 200) {
  globalThis.fetch = async () => ({ ok: status === 200, status, text: async () => text });
}

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("releaseChecker", () => {
  let mod;

  it("should load module", async () => {
    mod = await import("../../src/lib/versionManager/releaseChecker.ts");
    assert.ok(mod.getLatestRelease);
    assert.ok(mod.getReleaseByVersion);
    assert.ok(mod.getAvailableVersions);
    assert.ok(mod.getChecksums);
    assert.ok(mod.clearCache);
  });

  describe("getLatestRelease", () => {
    it("should parse latest release from GitHub API", async () => {
      mod.clearCache();
      mockFetchJson({
        tag_name: "v6.9.7",
        published_at: "2025-01-01T00:00:00Z",
        body: "notes",
        assets: [{ name: "a.tar.gz", browser_download_url: "https://x.com/a.tar.gz", size: 100 }],
      });
      const r = await mod.getLatestRelease();
      assert.equal(r.tag, "v6.9.7");
      assert.equal(r.version, "6.9.7");
      assert.equal(r.publishedAt, "2025-01-01T00:00:00Z");
      assert.equal(r.body, "notes");
      assert.equal(r.assets.length, 1);
      assert.equal(r.assets[0].name, "a.tar.gz");
      assert.equal(r.assets[0].url, "https://x.com/a.tar.gz");
      assert.equal(r.assets[0].size, 100);
    });

    it("should handle empty assets", async () => {
      mod.clearCache();
      mockFetchJson({ tag_name: "v1.0.0", published_at: "", body: "", assets: [] });
      const r = await mod.getLatestRelease();
      assert.equal(r.assets.length, 0);
    });

    it("should handle null body", async () => {
      mod.clearCache();
      mockFetchJson({ tag_name: "v1.0.0", published_at: "", body: null, assets: [] });
      const r = await mod.getLatestRelease();
      assert.equal(r.body, "");
    });

    it("should handle missing assets array", async () => {
      mod.clearCache();
      mockFetchJson({ tag_name: "v1.0.0", published_at: "", body: "" });
      const r = await mod.getLatestRelease();
      assert.equal(r.assets.length, 0);
    });

    it("should throw on non-ok response", async () => {
      mod.clearCache();
      mockFetchJson({}, 404);
      await assert.rejects(() => mod.getLatestRelease(), { message: /GitHub API 404/ });
    });
  });

  describe("getReleaseByVersion", () => {
    it("should fetch a specific version", async () => {
      mod.clearCache();
      mockFetchJson({ tag_name: "v6.9.0", published_at: "", body: "", assets: [] });
      const r = await mod.getReleaseByVersion("6.9.0");
      assert.ok(r);
      assert.equal(r.version, "6.9.0");
    });

    it("should prepend v if missing", async () => {
      mod.clearCache();
      mockFetchJson({ tag_name: "v6.9.0", published_at: "", body: "", assets: [] });
      const r = await mod.getReleaseByVersion("6.9.0");
      assert.ok(r);
    });

    it("should return null on 404", async () => {
      mod.clearCache();
      mockFetchJson({}, 404);
      const r = await mod.getReleaseByVersion("999.0.0");
      assert.equal(r, null);
    });

    it("should return null on network error", async () => {
      mod.clearCache();
      globalThis.fetch = async () => {
        throw new Error("Network error");
      };
      const r = await mod.getReleaseByVersion("999.0.0");
      assert.equal(r, null);
    });
  });

  describe("getAvailableVersions", () => {
    it("should return version tags", async () => {
      mod.clearCache();
      mockFetchJson([{ tag_name: "v6.9.7" }, { tag_name: "v6.9.6" }]);
      const v = await mod.getAvailableVersions();
      assert.deepEqual(v, ["v6.9.7", "v6.9.6"]);
    });

    it("should handle empty array", async () => {
      mod.clearCache();
      mockFetchJson([]);
      const v = await mod.getAvailableVersions();
      assert.deepEqual(v, []);
    });

    it("should handle non-array response", async () => {
      mod.clearCache();
      mockFetchJson({ message: "not array" });
      const v = await mod.getAvailableVersions();
      assert.deepEqual(v, []);
    });
  });

  describe("getChecksums", () => {
    it("should parse checksums.txt", async () => {
      mod.clearCache();
      mockFetchText("abc123 file.tar.gz\n456def other.tar.gz\n");
      const c = await mod.getChecksums("6.9.7");
      assert.equal(c.size, 2);
      assert.equal(c.get("file.tar.gz"), "abc123");
      assert.equal(c.get("other.tar.gz"), "456def");
    });

    it("should return empty map on 404", async () => {
      mod.clearCache();
      mockFetchText("not found", 404);
      const c = await mod.getChecksums("999.0.0");
      assert.equal(c.size, 0);
    });

    it("should return empty map on error", async () => {
      mod.clearCache();
      globalThis.fetch = async () => {
        throw new Error("fail");
      };
      const c = await mod.getChecksums("999.0.0");
      assert.equal(c.size, 0);
    });
  });

  describe("clearCache", () => {
    it("should clear cache so next call fetches fresh data", async () => {
      mod.clearCache();
      mockFetchJson({ tag_name: "v6.9.7", published_at: "", body: "", assets: [] });
      const r1 = await mod.getLatestRelease();
      assert.equal(r1.version, "6.9.7");

      mod.clearCache();
      mockFetchJson({ tag_name: "v6.9.8", published_at: "", body: "", assets: [] });
      const r2 = await mod.getLatestRelease();
      assert.equal(r2.version, "6.9.8");
    });
  });

  describe("cache behavior", () => {
    it("should cache responses within TTL", async () => {
      mod.clearCache();
      let callCount = 0;
      globalThis.fetch = async () => {
        callCount++;
        return {
          ok: true,
          status: 200,
          json: async () => ({ tag_name: "v6.9.7", published_at: "", body: "", assets: [] }),
        };
      };
      await mod.getLatestRelease();
      assert.equal(callCount, 1);
      await mod.getLatestRelease();
      assert.equal(callCount, 1); // cached
    });
  });
});
