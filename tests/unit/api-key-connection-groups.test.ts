import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getProviderDisplayName } from "../../src/lib/display/names.ts";
import { compareTr, matchesSearch } from "../../src/shared/utils/turkishText.ts";
import type { ProviderConnection } from "../../src/app/(dashboard)/dashboard/api-manager/components/ProviderConnectionPermissionList.tsx";

describe("API Key Connection Groups and Search", () => {
  const sampleConnections: ProviderConnection[] = [
    {
      id: "9e403d15-0952-4740-8ad4-d368e77a16e8",
      name: "OpenAI Main Prod",
      provider: "openai",
      isActive: true,
    },
    {
      id: "1c17246a-723a-4ebc-bd18-479c4a8dc302",
      name: "OpenAI Secondary",
      provider: "openai",
      isActive: false,
    },
    {
      id: "44444444-4444-4444-4444-444444444444",
      name: "Anthropic Claude Work",
      provider: "anthropic",
      isActive: true,
    },
    {
      id: "55555555-5555-5555-5555-555555555555",
      name: "Gemini High Speed",
      provider: "gemini",
      isActive: true,
    },
  ];

  it("groups connections by provider accurately and sorts them with compareTr", () => {
    const grouped = new Map<string, ProviderConnection[]>();
    for (const conn of sampleConnections) {
      const p = conn.provider || "Other";
      const list = grouped.get(p);
      if (list) {
        list.push(conn);
      } else {
        grouped.set(p, [conn]);
      }
    }

    const sortedGroups = Array.from(grouped.entries()).sort(([a], [b]) => compareTr(a, b));

    assert.equal(sortedGroups.length, 3);
    assert.deepEqual(
      sortedGroups.map(([p]) => p),
      ["anthropic", "gemini", "openai"]
    );
    assert.equal(sortedGroups.find(([p]) => p === "openai")?.[1].length, 2);
  });

  it("filters connections by provider display name", () => {
    const query = "anthropic";
    const matched = sampleConnections.filter((conn) => {
      const providerDisplayName = getProviderDisplayName(conn.provider) || conn.provider;
      return matchesSearch(conn.provider, query) || matchesSearch(providerDisplayName, query);
    });

    assert.equal(matched.length, 1);
    assert.equal(matched[0]?.id, "44444444-4444-4444-4444-444444444444");
  });

  it("filters connections by connection name and ID substring", () => {
    // Search by name
    const nameQuery = "secondary";
    const matchedByName = sampleConnections.filter(
      (c) => matchesSearch(c.name, nameQuery) || matchesSearch(c.id, nameQuery)
    );
    assert.equal(matchedByName.length, 1);
    assert.equal(matchedByName[0]?.name, "OpenAI Secondary");

    // Search by UUID substring
    const idQuery = "9e403d15";
    const matchedById = sampleConnections.filter(
      (c) => matchesSearch(c.name, idQuery) || matchesSearch(c.id, idQuery)
    );
    assert.equal(matchedById.length, 1);
    assert.equal(matchedById[0]?.name, "OpenAI Main Prod");
  });

  it("calculates select all and deselect all for provider connections", () => {
    const openaiConnections = sampleConnections.filter((c) => c.provider === "openai");
    const openaiIds = openaiConnections.map((c) => c.id);

    let selected: string[] = [];

    // When none are selected, select all for provider selects all openai IDs
    const allSelected1 = openaiIds.length > 0 && openaiIds.every((id) => selected.includes(id));
    assert.equal(allSelected1, false);

    selected = Array.from(new Set([...selected, ...openaiIds]));
    assert.deepEqual(selected, openaiIds);

    // When all are selected, toggle deselects all openai IDs
    const allSelected2 = openaiIds.length > 0 && openaiIds.every((id) => selected.includes(id));
    assert.equal(allSelected2, true);

    selected = selected.filter((id) => !openaiIds.includes(id));
    assert.deepEqual(selected, []);

    // When partially selected, toggle selects all openai IDs
    selected = [openaiIds[0] as string];
    const someSelected =
      openaiIds.some((id) => selected.includes(id)) &&
      !openaiIds.every((id) => selected.includes(id));
    assert.equal(someSelected, true);

    selected = Array.from(new Set([...selected, ...openaiIds]));
    assert.equal(selected.length, 2);
    assert.equal(
      openaiIds.every((id) => selected.includes(id)),
      true
    );
  });

  it("handles empty or null connections and selections gracefully", () => {
    const rawConnections: unknown = null;
    const rawSelections: unknown = undefined;

    const safeConns = Array.isArray(rawConnections) ? rawConnections : [];
    const safeSelected = Array.isArray(rawSelections) ? rawSelections : [];

    assert.equal(safeConns.length, 0);
    assert.equal(safeSelected.length, 0);

    const fallbackName = (conn: { id?: unknown; name?: string }) =>
      conn.name || (typeof conn.id === "string" ? conn.id.slice(0, 8) : "connection");

    assert.equal(fallbackName({ id: "12345678-90ab", name: "" }), "12345678");
    assert.equal(fallbackName({ id: null, name: "" }), "connection");
    assert.equal(fallbackName({ id: undefined }), "connection");
  });
});
