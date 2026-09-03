import test from "node:test";
import assert from "node:assert/strict";

const releaseNotes = await import("../../../src/shared/utils/releaseNotes.ts");

test("parseActiveNewsPayload keeps the legacy singular contract", () => {
  assert.deepEqual(
    releaseNotes.parseActiveNewsPayload({
      active: true,
      title: "Launch",
      message: "A short announcement",
      link: "https://github.com/diegosouzapw/tOmni",
      linkLabel: "Learn more",
      icon: "campaign",
    }),
    {
      id: "legacy-8d301d21",
      active: true,
      publishedAt: "1970-01-01T00:00:00.000Z",
      title: "Launch",
      message: "A short announcement",
      link: "https://github.com/diegosouzapw/tOmni",
      linkLabel: "Learn more",
      icon: "campaign",
    }
  );

  assert.equal(releaseNotes.parseActiveNewsPayload({ active: false }), null);
  assert.equal(
    releaseNotes.parseActiveNewsPayload({
      active: true,
      title: "Unsafe icon",
      message: "Invalid icon names are rejected",
      icon: "campaign<script>",
    }),
    null
  );
});

test("parseNewsPayload validates the closed v2 feed and preserves inactive entries", () => {
  const payload = {
    schemaVersion: 2,
    items: [
      {
        id: "radar-launch-2026-08",
        active: false,
        publishedAt: "2026-08-09T12:00:00.000Z",
        text: {
          en: { title: "Radar", message: "Opt-in catalog", linkLabel: "Learn more" },
          "pt-BR": { title: "Radar", message: "Catálogo opt-in", linkLabel: "Saiba mais" },
        },
        link: "https://radar.omniroute.online/planos",
        icon: "radar",
      },
    ],
  };

  assert.deepEqual(releaseNotes.parseNewsPayload(payload), payload.items);
  assert.deepEqual(releaseNotes.parseNewsPayload({ ...payload, unexpected: true }), []);
  assert.deepEqual(
    releaseNotes.parseNewsPayload({
      ...payload,
      items: [{ ...payload.items[0], link: "http://radar.omniroute.online/planos" }],
    }),
    []
  );
  assert.deepEqual(
    releaseNotes.parseNewsPayload({
      ...payload,
      items: [...payload.items, payload.items[0]],
    }),
    []
  );
});

test("listActiveNews localizes, filters future entries and sorts newest first", () => {
  const payload = {
    schemaVersion: 2,
    items: [
      {
        id: "older",
        active: true,
        publishedAt: "2026-08-08T12:00:00.000Z",
        text: { en: { title: "Older", message: "English" } },
        icon: "info",
      },
      {
        id: "newer",
        active: true,
        publishedAt: "2026-08-09T12:00:00.000Z",
        text: {
          en: { title: "Newer", message: "English" },
          "pt-BR": { title: "Mais recente", message: "Português" },
        },
        icon: "campaign",
      },
      {
        id: "future",
        active: true,
        publishedAt: "2026-08-11T12:00:00.000Z",
        text: { en: { title: "Future", message: "Not published yet" } },
        icon: "campaign",
      },
      {
        id: "inactive",
        active: false,
        publishedAt: "2026-08-09T13:00:00.000Z",
        text: { en: { title: "Inactive", message: "Hidden" } },
        icon: "campaign",
      },
    ],
  };

  const news = releaseNotes.listActiveNews(payload, "pt-BR", new Date("2026-08-10T00:00:00.000Z"));
  assert.deepEqual(
    news.map((item: { id: string; title: string; message: string }) => [
      item.id,
      item.title,
      item.message,
    ]),
    [
      ["newer", "Mais recente", "Português"],
      ["older", "Older", "English"],
    ]
  );
  assert.equal(
    releaseNotes.listActiveNews(payload, "pt-PT", new Date("2026-08-10T00:00:00.000Z"))[0]?.message,
    "English"
  );
});

test("selectActiveNews skips dismissed ids while retaining new announcements", () => {
  const payload = {
    schemaVersion: 2,
    items: [
      {
        id: "newer",
        active: true,
        publishedAt: "2026-08-09T12:00:00.000Z",
        text: { en: { title: "Newer", message: "English" } },
        icon: "campaign",
      },
      {
        id: "older",
        active: true,
        publishedAt: "2026-08-08T12:00:00.000Z",
        text: { en: { title: "Older", message: "English" } },
        icon: "campaign",
      },
    ],
  };

  assert.equal(
    releaseNotes.selectActiveNews(
      payload,
      "en",
      new Set(["newer"]),
      new Date("2026-08-10T00:00:00.000Z")
    )?.id,
    "older"
  );
});

test("dismissed announcement ids are sanitized, deduplicated and bounded", () => {
  assert.deepEqual(
    [...releaseNotes.parseDismissedNewsIds('["valid-id","valid-id","<script>",4]')],
    ["valid-id"]
  );
  assert.equal(releaseNotes.parseDismissedNewsIds("not-json").size, 0);

  const ids = Array.from({ length: 60 }, (_, index) => `announcement-${index}`);
  const serialized = releaseNotes.serializeDismissedNewsIds(ids);
  assert.equal(JSON.parse(serialized).length, 50);
  assert.deepEqual(JSON.parse(serialized).slice(-2), ["announcement-58", "announcement-59"]);
});

test("fetchNewsPayload is GET-only and keeps network failures inert", async () => {
  let captured: { url: string; init: RequestInit } | undefined;
  const payload = { schemaVersion: 2, items: [] };
  const result = await releaseNotes.fetchNewsPayload(async (url: string, init: RequestInit) => {
    captured = { url, init };
    return { ok: true, json: async () => payload };
  });

  assert.deepEqual(result, payload);
  assert.equal(captured?.url, releaseNotes.NEWS_JSON_URL);
  assert.equal(captured?.init.method, undefined);
  assert.equal(captured?.init.credentials, "omit");
  assert.equal(
    await releaseNotes.fetchNewsPayload(async () => {
      throw new Error("offline");
    }),
    null
  );
  assert.equal(
    await releaseNotes.fetchNewsPayload(async () => ({ ok: false, json: async () => payload })),
    null
  );
});

test("getLatestChangelogMarkdown keeps the title and the ten latest releases", () => {
  const versions = Array.from({ length: 12 }, (_, index) => {
    const version = `1.0.${12 - index}`;
    return `## [${version}] - 2026-04-${String(28 - index).padStart(2, "0")}\n\n### Bug Fixes\n- Fix ${version}`;
  });
  const markdown = ["# Changelog", ...versions].join("\n\n");

  const sliced = releaseNotes.getLatestChangelogMarkdown(markdown, 10);

  assert.match(sliced, /^# Changelog/);
  assert.equal((sliced.match(/^## \[/gm) || []).length, 10);
  assert.match(sliced, /## \[1\.0\.12\]/);
  assert.match(sliced, /## \[1\.0\.3\]/);
  assert.doesNotMatch(sliced, /## \[1\.0\.2\]/);
});
