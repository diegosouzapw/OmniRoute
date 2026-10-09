import test from "node:test";
import assert from "node:assert/strict";
import { filterSidebarSectionsByQuery } from "../../src/shared/utils/sidebarSearch.ts";

type Item = {
  id: string;
  label: string;
  keywords?: string[];
  description?: string;
  subtitle?: string;
  href?: string;
};
type Group = { type: "group"; id: string; items: Item[] };
type Section = { id: string; children: (Item | Group)[] };

function makeSections(): Section[] {
  return [
    {
      id: "omni-proxy",
      children: [
        { id: "combos", label: "Combos" },
        { id: "providers", label: "Providers" },
        {
          type: "group",
          id: "tools",
          items: [
            { id: "playground", label: "Playground" },
            { id: "logs", label: "Request Logs" },
          ],
        },
      ],
    },
    {
      id: "configuration",
      children: [
        { id: "settings", label: "Settings" },
        { id: "webhooks", label: "Webhooks" },
      ],
    },
  ];
}

test("empty/whitespace query returns all sections unchanged (identity-ish)", () => {
  const sections = makeSections();
  assert.deepEqual(filterSidebarSectionsByQuery(sections, ""), sections);
  assert.deepEqual(filterSidebarSectionsByQuery(sections, "   "), sections);
});

test("filters flat items by case-insensitive substring match on label", () => {
  const result = filterSidebarSectionsByQuery(makeSections(), "combo");
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "omni-proxy");
  assert.deepEqual(
    result[0].children.map((c) => ("label" in c ? c.id : c.id)),
    ["combos"]
  );
});

test("matches are case-insensitive", () => {
  const result = filterSidebarSectionsByQuery(makeSections(), "SETTINGS");
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "configuration");
});

test("filters items inside a group, dropping non-matching group members", () => {
  const result = filterSidebarSectionsByQuery(makeSections(), "logs");
  assert.equal(result.length, 1);
  const group = result[0].children.find((c) => "type" in c && c.type === "group") as
    Group | undefined;
  assert.ok(group, "expected the tools group to survive filtering");
  assert.deepEqual(
    group!.items.map((i) => i.id),
    ["logs"]
  );
});

test("drops a group entirely when none of its items match", () => {
  const result = filterSidebarSectionsByQuery(makeSections(), "playground-xyz-no-match");
  assert.deepEqual(result, []);
});

test("drops sections that have no matching children at all", () => {
  const result = filterSidebarSectionsByQuery(makeSections(), "webhooks");
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "configuration");
});

test("query matching nothing returns an empty array", () => {
  const result = filterSidebarSectionsByQuery(makeSections(), "zzz-nonexistent-zzz");
  assert.deepEqual(result, []);
});

test("does not mutate the input sections", () => {
  const sections = makeSections();
  const snapshot = JSON.parse(JSON.stringify(sections));
  filterSidebarSectionsByQuery(sections, "combo");
  assert.deepEqual(sections, snapshot);
});

// ---------------------------------------------------------------------------
// #15159 / B-02 — the corpus was `label` only.
// ---------------------------------------------------------------------------
//
// `const matches = (item) => item.label.toLowerCase().includes(needle)` meant a
// user could only find an item by the exact word already printed in the sidebar.
// The items already carry `subtitle`, a stable `id` and an `href` — none were
// searched, and there was no place to declare extra keywords.
//
// This matters more than it looks in a 67-locale product: `label` is resolved
// through next-intl, so a query typed in a language other than the active UI
// locale matched nothing at all. `id`/`href` are locale-independent.

test("B-02: an explicit keywords array is searched", () => {
  const sections: Section[] = [
    {
      id: "configuration",
      children: [{ id: "keys", label: "Access", keywords: ["credential", "secret"] }],
    },
  ];
  const result = filterSidebarSectionsByQuery(sections, "secret");
  assert.equal(result.length, 1, "a declared keyword must be findable");
  assert.equal(result[0].children[0].id, "keys");
});

test("B-02: keyword matching is case-insensitive and substring-based", () => {
  const sections: Section[] = [
    { id: "configuration", children: [{ id: "keys", label: "Access", keywords: ["Credential"] }] },
  ];
  assert.equal(filterSidebarSectionsByQuery(sections, "credential").length, 1);
  assert.equal(filterSidebarSectionsByQuery(sections, "CRED").length, 1);
});

test("B-02: a keyword matches inside a group and keeps its siblings filtering", () => {
  const sections: Section[] = [
    {
      id: "configuration",
      children: [
        {
          type: "group",
          id: "tools",
          items: [
            { id: "a", label: "Alpha", keywords: ["needle"] },
            { id: "b", label: "Beta" },
          ],
        },
      ],
    },
  ];
  const result = filterSidebarSectionsByQuery(sections, "needle");
  const group = result[0].children[0] as Group;
  assert.deepEqual(
    group.items.map((i) => i.id),
    ["a"]
  );
});

test("B-02: a description field is searched", () => {
  const sections: Section[] = [
    {
      id: "home",
      children: [
        { id: "overview", label: "Overview", description: "Latency and spend at a glance" },
      ],
    },
  ];
  assert.equal(filterSidebarSectionsByQuery(sections, "spend").length, 1);
  assert.equal(filterSidebarSectionsByQuery(sections, "glance").length, 1);
});

test("B-02: the stable id is searched, so a translated label still matches", () => {
  // The whole point: `label` comes from next-intl and changes per locale, but the
  // id is stable. A query matching the id must find the item in any locale.
  const sections: Section[] = [
    { id: "omni-proxy", children: [{ id: "modelImport", label: "导入模型" }] },
  ];
  const result = filterSidebarSectionsByQuery(sections, "modelImport");
  assert.equal(result.length, 1, "the id must remain searchable regardless of locale");
});

test("B-02: id matching is case-insensitive", () => {
  const sections: Section[] = [{ id: "omni", children: [{ id: "modelImport", label: "X" }] }];
  assert.equal(filterSidebarSectionsByQuery(sections, "modelimport").length, 1);
});

test("B-02: the href is searched, so a path fragment finds the item", () => {
  const sections: Section[] = [
    { id: "omni", children: [{ id: "p", label: "Providers", href: "/dashboard/providers" }] },
  ];
  assert.equal(filterSidebarSectionsByQuery(sections, "/dashboard/prov").length, 1);
});

test("B-02: subtitle is searched", () => {
  const sections: Section[] = [
    { id: "omni", children: [{ id: "p", label: "Providers", subtitle: "358 upstreams" }] },
  ];
  assert.equal(filterSidebarSectionsByQuery(sections, "upstreams").length, 1);
});

test("B-02: a section is kept when a group matches only via a keyword", () => {
  const sections: Section[] = [
    {
      id: "configuration",
      children: [
        {
          type: "group",
          id: "advanced",
          items: [{ id: "quota", label: "Quota", keywords: ["pool"] }],
        },
      ],
    },
  ];
  assert.equal(filterSidebarSectionsByQuery(sections, "pool").length, 1);
});

// ---------------------------------------------------------------------------
// Guard cases — the corpus must not make matching sloppier
// ---------------------------------------------------------------------------

test("B-02: an item with no extra fields still matches on label alone", () => {
  const result = filterSidebarSectionsByQuery(makeSections(), "combo");
  assert.equal(result.length, 1);
});

test("B-02: absent optional fields never throw", () => {
  const sections: Section[] = [
    {
      id: "s",
      children: [
        { id: "no-fields", label: "Bare" },
        { id: "empty-kw", label: "Bare2", keywords: [] },
        { id: "empty-desc", label: "Bare3", description: "" },
        { id: "has-kw", label: "Bare4", keywords: ["ok"] },
      ],
    },
  ];
  assert.equal(filterSidebarSectionsByQuery(sections, "bare").length, 1);
  assert.equal(filterSidebarSectionsByQuery(sections, "ok").length, 1);
});

test("B-02: a query matching nothing still returns [] despite the wider corpus", () => {
  assert.deepEqual(filterSidebarSectionsByQuery(makeSections(), "zzz-nonexistent-zzz"), []);
});

test("B-02: an empty query still returns everything unchanged", () => {
  const sections = makeSections();
  assert.deepEqual(filterSidebarSectionsByQuery(sections, ""), sections);
});

// ---------------------------------------------------------------------------
// Noise control — a wider corpus must not turn a 1-char query into "everything"
// ---------------------------------------------------------------------------

/**
 * `href` and `id` are long identifiers that are dense in common letters —
 * "/dashboard/providers" alone contains a, s, e, r, d, o, b, … Widening the
 * corpus without a floor made a single keystroke match almost every item, which
 * is worse than the original defect: the user gets a wall of results and no
 * signal. Human-authored fields (label, subtitle, description, keywords) are
 * short and dense in meaning, so they still match at any length — exactly the
 * pre-existing behaviour.
 */
const IDENTIFIER_NEEDLE_FLOOR = 2;

test("B-02: a 1-char query does not match on id or href alone", () => {
  const sections: Section[] = [
    {
      id: "omni",
      children: [
        { id: "providers", label: "Xx", href: "/dashboard/providers" },
        { id: "settings", label: "Yy", href: "/dashboard/settings" },
        { id: "quota", label: "Zz", href: "/dashboard/quota" },
      ],
    },
  ];
  // The labels carry none of a/e/s, so a hit here can only come from id or href.
  assert.deepEqual(filterSidebarSectionsByQuery(sections, "a"), []);
  assert.deepEqual(filterSidebarSectionsByQuery(sections, "e"), []);
  assert.deepEqual(filterSidebarSectionsByQuery(sections, "s"), []);
});

test("B-02: id/href DO match once the query is long enough to be meaningful", () => {
  const sections: Section[] = [
    { id: "omni", children: [{ id: "providers", label: "Xx", href: "/dashboard/providers" }] },
  ];
  assert.equal(filterSidebarSectionsByQuery(sections, "pro").length, 1, "2+ chars: id matches");
  assert.equal(filterSidebarSectionsByQuery(sections, "ashb").length, 1, "href fragment matches");
});

test("B-02: a 1-char query still matches a label, as it always did", () => {
  // The floor applies ONLY to the identifier-like fields. Label matching is
  // unchanged from before this PR, so this cannot be a behaviour regression.
  const sections: Section[] = [{ id: "omni", children: [{ id: "x", label: "Alpha" }] }];
  assert.equal(filterSidebarSectionsByQuery(sections, "a").length, 1);
});

test("B-02: the floor is exactly the documented value", () => {
  const sections: Section[] = [
    { id: "omni", children: [{ id: "providers", label: "Zz", href: "/dashboard/providers" }] },
  ];
  // "pr" is the shortest identifier query that may match.
  for (let len = 1; len < IDENTIFIER_NEEDLE_FLOOR; len++) {
    assert.deepEqual(
      filterSidebarSectionsByQuery(sections, "p".repeat(len)),
      [],
      `${len}-char identifier query must not match`
    );
  }
  assert.equal(filterSidebarSectionsByQuery(sections, "pr").length, 1);
});

test("B-02: keyword search still does not mutate the input", () => {
  const sections: Section[] = [
    {
      id: "s",
      children: [
        {
          type: "group",
          id: "g",
          items: [
            { id: "a", label: "A", keywords: ["x"] },
            { id: "b", label: "B" },
          ],
        },
      ],
    },
  ];
  const snapshot = JSON.parse(JSON.stringify(sections));
  filterSidebarSectionsByQuery(sections, "x");
  assert.deepEqual(sections, snapshot);
});
