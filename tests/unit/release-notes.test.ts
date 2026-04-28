import test from "node:test";
import assert from "node:assert/strict";

const releaseNotes = await import("../../src/shared/utils/releaseNotes.ts");

test("parseActiveNewsPayload returns only valid active announcements", () => {
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
      active: true,
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
