import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

import en from "../../src/i18n/messages/en.json" with { type: "json" };
import vi from "../../src/i18n/messages/vi.json" with { type: "json" };
import { CLI_TOOLS } from "../../src/shared/constants/cliTools";

test("every CLI catalog image points to a bundled public asset", () => {
  const missing = Object.values(CLI_TOOLS).flatMap((tool) =>
    [tool.image, tool.imageLight, tool.imageDark]
      .filter((asset): asset is string => Boolean(asset))
      .filter((asset) => !existsSync(`public${asset}`))
      .map((asset) => `${tool.id}: ${asset}`)
  );

  assert.deepEqual(missing, []);
});

test("every visible CLI catalog entry has English and Vietnamese descriptions", () => {
  const visibleToolIds = Object.values(CLI_TOOLS)
    .filter((tool) => tool.baseUrlSupport !== "none")
    .map((tool) => tool.id);
  const englishDescriptions = en.cliTools.toolDescriptions as Record<string, string>;
  const vietnameseDescriptions = vi.cliTools.toolDescriptions as Record<string, string>;

  assert.deepEqual(
    visibleToolIds.filter((id) => !englishDescriptions[id]?.trim()),
    []
  );
  assert.deepEqual(
    visibleToolIds.filter((id) => !vietnameseDescriptions[id]?.trim()),
    []
  );
});
