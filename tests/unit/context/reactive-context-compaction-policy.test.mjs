import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../../../open-sse/handlers/chatCore.ts", import.meta.url),
  "utf8"
);

test("global compression off gates reactive and last-resort context compaction", () => {
  assert.match(
    source,
    /reactiveContextCompactionEnabled\s*=\s*compressionSettingsResult\.enabled\s*&&\s*!compressionExcluded;/
  );
  // #8949 added the !nativeCodexPassthrough guard between the flag and the token check.
  assert.match(
    source,
    /reactiveContextCompactionEnabled\s*&&\s*!nativeCodexPassthrough\s*&&\s*estimatedTokens\s*>\s*threshold/
  );
  assert.match(
    source,
    /reactiveContextCompactionEnabled\s*&&\s*!nativeCodexPassthrough\s*&&\s*finalEstimatedInputTokens\s*>=\s*finalContextLimit/
  );
});
