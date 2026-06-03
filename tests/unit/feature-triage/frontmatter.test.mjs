import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseFrontmatter,
  serializeFrontmatter,
  stripFrontmatter,
} from "../../../scripts/features/lib/frontmatter.mjs";

describe("parseFrontmatter", () => {
  it("returns null when no frontmatter", () => {
    assert.equal(parseFrontmatter("# Heading\nbody"), null);
  });

  it("parses simple key-value frontmatter", () => {
    const md = `---
issue: 1046
last_synced_at: 2026-05-18T14:30:00Z
last_synced_comment_id: 1234567890
---

# Body`;
    const r = parseFrontmatter(md);
    assert.equal(r.issue, 1046);
    assert.equal(r.last_synced_at, "2026-05-18T14:30:00Z");
    assert.equal(r.last_synced_comment_id, 1234567890);
  });

  it("parses nested snapshot block", () => {
    const md = `---
issue: 1046
snapshot:
  thumbs: 8
  commenters: 4
  labels: [enhancement, ui]
  state: open
---

body`;
    const r = parseFrontmatter(md);
    assert.equal(r.snapshot.thumbs, 8);
    assert.equal(r.snapshot.commenters, 4);
    assert.deepEqual(r.snapshot.labels, ["enhancement", "ui"]);
    assert.equal(r.snapshot.state, "open");
  });

  it("returns null on malformed delimiters", () => {
    assert.equal(parseFrontmatter("---\nfoo: bar\n# no close"), null);
  });
});

describe("serializeFrontmatter", () => {
  it("round-trips a parsed object", () => {
    const original = `---
issue: 1046
last_synced_comment_id: 1234567890
snapshot:
  thumbs: 8
  commenters: 4
  state: open
---

# Body
content here`;
    const meta = parseFrontmatter(original);
    const re = serializeFrontmatter(meta, "# Body\ncontent here");
    const parsed2 = parseFrontmatter(re);
    assert.deepEqual(parsed2, meta);
  });
});

describe("stripFrontmatter", () => {
  it("returns body after frontmatter", () => {
    const md = "---\nissue: 1\n---\n\n# Body";
    assert.equal(stripFrontmatter(md), "# Body");
  });
  it("returns full text if no frontmatter", () => {
    assert.equal(stripFrontmatter("# Body"), "# Body");
  });
});
