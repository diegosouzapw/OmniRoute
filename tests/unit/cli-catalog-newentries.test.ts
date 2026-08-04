/**
 * F1: cli-catalog-newentries.test.ts
 * Assert presence and shape of all entries new to plan 14.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");
const { CliCatalogEntrySchema } = await import("../../src/shared/schemas/cliCatalog.ts");

const NEW_IDS = [
  "roo",
  "jcode",
  "deepseek-tui",
  "smelt",
  "pi",
  "agent-deck",
  "goose",
  "interpreter",
  "warp",
];

for (const id of NEW_IDS) {
  test(`New entry '${id}' exists in CLI_TOOLS`, () => {
    assert.ok(id in CLI_TOOLS, `Entry '${id}' missing from CLI_TOOLS`);
  });

  test(`New entry '${id}' has non-empty description`, () => {
    const entry = CLI_TOOLS[id];
    assert.ok(entry, `Entry '${id}' not found`);
    assert.ok(
      typeof entry.description === "string" && entry.description.length > 0,
      `Entry '${id}' has empty description`
    );
  });

  test(`New entry '${id}' passes schema validation`, () => {
    const entry = CLI_TOOLS[id];
    assert.ok(entry, `Entry '${id}' not found`);
    const result = CliCatalogEntrySchema.safeParse(entry);
    assert.equal(
      result.success,
      true,
      result.success ? "" : `Entry '${id}' schema error: ${JSON.stringify(result.error.issues)}`
    );
  });

  test(`New entry '${id}' has color in #RRGGBB format`, () => {
    const entry = CLI_TOOLS[id];
    assert.ok(entry, `Entry '${id}' not found`);
    assert.match(
      entry.color,
      /^#[0-9A-Fa-f]{6}$/,
      `Entry '${id}' color '${entry.color}' is not #RRGGBB`
    );
  });

  test(`New entry '${id}' has non-empty vendor`, () => {
    const entry = CLI_TOOLS[id];
    assert.ok(entry, `Entry '${id}' not found`);
    assert.ok(
      typeof entry.vendor === "string" && entry.vendor.length > 0,
      `Entry '${id}' has empty vendor`
    );
  });
}

// Category checks for new entries
test("roo is category=code, baseUrlSupport=full", () => {
  assert.equal(CLI_TOOLS["roo"].category, "code");
  assert.equal(CLI_TOOLS["roo"].baseUrlSupport, "full");
});

test("jcode is category=code with defaultCommand=jcode", () => {
  assert.equal(CLI_TOOLS["jcode"].category, "code");
  assert.equal(CLI_TOOLS["jcode"].defaultCommand, "jcode");
});

test("deepseek-tui is category=code, baseUrlSupport=full", () => {
  assert.equal(CLI_TOOLS["deepseek-tui"].category, "code");
  assert.equal(CLI_TOOLS["deepseek-tui"].baseUrlSupport, "full");
});

test("smelt is category=code with defaultCommand=smelt", () => {
  assert.equal(CLI_TOOLS["smelt"].category, "code");
  assert.equal(CLI_TOOLS["smelt"].defaultCommand, "smelt");
});

test("pi is category=code with defaultCommand=pi", () => {
  assert.equal(CLI_TOOLS["pi"].category, "code");
  assert.equal(CLI_TOOLS["pi"].defaultCommand, "pi");
});

test("goose is category=agent, acpSpawnable=true, baseUrlSupport=full", () => {
  assert.equal(CLI_TOOLS["goose"].category, "agent");
  assert.equal(CLI_TOOLS["goose"].acpSpawnable, true);
  assert.equal(CLI_TOOLS["goose"].baseUrlSupport, "full");
});

test("interpreter is category=agent, acpSpawnable=true", () => {
  assert.equal(CLI_TOOLS["interpreter"].category, "agent");
  assert.equal(CLI_TOOLS["interpreter"].acpSpawnable, true);
});

test("warp is category=agent, baseUrlSupport=partial", () => {
  assert.equal(CLI_TOOLS["warp"].category, "agent");
  assert.equal(CLI_TOOLS["warp"].baseUrlSupport, "partial");
  assert.equal(CLI_TOOLS["warp"].acpSpawnable, true);
});

test("agent-deck is category=agent, baseUrlSupport=full", () => {
  assert.equal(CLI_TOOLS["agent-deck"].category, "agent");
  assert.equal(CLI_TOOLS["agent-deck"].baseUrlSupport, "full");
});

// Also check entries that only received new fields (not brand new)
test("aider was added/confirmed: category=code, acpSpawnable=true, baseUrlSupport=full", () => {
  const entry = CLI_TOOLS["aider"];
  assert.ok(entry, "aider entry must exist");
  assert.equal(entry.category, "code");
  assert.equal(entry.acpSpawnable, true);
  assert.equal(entry.baseUrlSupport, "full");
  assert.equal(entry.defaultCommand, "aider");
});

test("forge was added/confirmed: category=code, acpSpawnable=true, baseUrlSupport=full", () => {
  const entry = CLI_TOOLS["forge"];
  assert.ok(entry, "forge entry must exist");
  assert.equal(entry.category, "code");
  assert.equal(entry.acpSpawnable, true);
  assert.equal(entry.baseUrlSupport, "full");
});

test("cursor-cli was added: category=code, acpSpawnable=true", () => {
  const entry = CLI_TOOLS["cursor-cli"];
  assert.ok(entry, "cursor-cli entry must exist");
  assert.equal(entry.category, "code");
  assert.equal(entry.acpSpawnable, true);
});
