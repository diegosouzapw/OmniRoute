import { test } from "node:test";
import assert from "node:assert/strict";
import {
  resolveWhyCodesTarget,
  buildWhyCodesToml,
  buildWhyCodesCliRecipe,
} from "../../../bin/cli/commands/setup-whycodes.mjs";

test("resolveWhyCodesTarget appends /v1 (WhyCodes posts /chat/completions)", () => {
  assert.equal(
    resolveWhyCodesTarget({ remote: "http://vps:20128" }).baseUrl,
    "http://vps:20128/v1"
  );
  assert.equal(
    resolveWhyCodesTarget({ remote: "http://vps:20128/v1/" }).baseUrl,
    "http://vps:20128/v1"
  );
});

test("resolveWhyCodesTarget: explicit --api-key wins", () => {
  assert.equal(resolveWhyCodesTarget({ remote: "http://x:20128", apiKey: "sk-x" }).apiKey, "sk-x");
});

test("buildWhyCodesToml writes providers.omniroute + default_model without the live key", () => {
  const toml = buildWhyCodesToml({
    baseUrl: "http://localhost:20128/v1",
    model: "glm/glm-5.2",
  });
  assert.match(toml, /\[providers\.omniroute\]/);
  assert.match(toml, /base_url = "http:\/\/localhost:20128\/v1"/);
  assert.match(toml, /api_key = "\$OMNIROUTE_API_KEY"/);
  assert.match(toml, /\[default_model\]/);
  assert.match(toml, /provider_id = "omniroute"/);
  assert.match(toml, /model_id = "glm\/glm-5.2"/);
  assert.equal(toml.includes("sk-"), false);
});

test("buildWhyCodesCliRecipe never prints the API key value", () => {
  const r = buildWhyCodesCliRecipe({
    baseUrl: "http://localhost:20128/v1",
    model: "glm/glm-5.2",
  });
  assert.match(r, /whycodes provider add omniroute --api-key "\$OMNIROUTE_API_KEY"/);
  assert.match(r, /whycodes model default omniroute glm\/glm-5.2/);
  assert.equal(r.includes("sk-"), false);
});
