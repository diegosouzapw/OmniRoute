// tests/unit/repro-7820-amazon-q-static-models.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";

import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels";

test("#7820: amazon-q should expose a static model catalog like jules/devin do (no /v1/models endpoint)", () => {
  const amazonQStaticModels = getStaticModelsForProvider("amazon-q");
  assert.ok(
    Array.isArray(amazonQStaticModels) && amazonQStaticModels.length > 0,
    "amazon-q should expose a static model catalog like jules/devin do, instead of falling through " +
      "to the models route's 'does not support models listing' hard error"
  );
});
