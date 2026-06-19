import test from "node:test";
import { goldenSnapshot } from "../../helpers/goldenSnapshot.ts";
import { loadTranslationFixtures } from "../../helpers/translationFixtures.ts";
import { translateRequest } from "../../../open-sse/translator/index.ts";

// Golden-file tests: freeze translateRequest output per fixture.
// Regenerate with: UPDATE_GOLDEN=1 node --import tsx/esm --test tests/unit/correctness/translation.golden.test.ts
for (const c of loadTranslationFixtures()) {
  test(`golden: ${c.name}`, () => {
    const out = translateRequest(
      c.sourceFormat,
      c.targetFormat,
      (c.input as { model?: string }).model ?? "m",
      c.input,
      true
    );
    goldenSnapshot(`translation/${c.name}`, out);
  });
}
