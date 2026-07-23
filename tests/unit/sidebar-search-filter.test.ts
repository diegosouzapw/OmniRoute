import test from "node:test";
import assert from "node:assert/strict";
import { filterSidebarSectionsByQuery } from "../../src/shared/utils/sidebarSearch.ts";

type Item = { id: string; label: string };
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
    | Group
    | undefined;
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
