import { describe, it } from "node:test";
import assert from "node:assert";
import { readMonkeyCodeCredentials } from "../../src/app/api/oauth/monkeycode/auto-import/route.ts";

const SETTINGS = {
  signing_secret: "omas_test_secret",
  models: {
    "omniroute/auto-coding@omniroute#x": {
      api_key: "sk-test",
      model: "auto/coding",
    },
    "monkeycode-basic/qwen3.8-flash@monkeycode#aaa": {
      api_key: "oma_test_key",
      model: "monkeycode-basic/qwen3.8-flash",
    },
    "monkeycode-pro/glm-5.2@monkeycode#bbb": {
      api_key: "oma_test_key",
      model: "monkeycode-pro/glm-5.2",
    },
  },
};

describe("readMonkeyCodeCredentials", () => {
  it("extracts the key, secret, and monkeycode model ids", async () => {
    const found = await readMonkeyCodeCredentials({
      home: "/fake/home",
      read: async () => JSON.stringify(SETTINGS),
    });
    assert.ok(found);
    assert.strictEqual(found.apiKey, "oma_test_key");
    assert.strictEqual(found.signingSecret, "omas_test_secret");
    assert.deepStrictEqual(found.models, [
      "monkeycode-basic/qwen3.8-flash",
      "monkeycode-pro/glm-5.2",
    ]);
    assert.ok(found.source.includes(".ohmyagent"));
  });

  it("returns null when the settings file is missing", async () => {
    const found = await readMonkeyCodeCredentials({
      home: "/fake/home",
      read: async () => {
        throw new Error("ENOENT");
      },
    });
    assert.strictEqual(found, null);
  });

  it("returns null when no monkeycode models or secret exist", async () => {
    const noModels = await readMonkeyCodeCredentials({
      read: async () => JSON.stringify({ signing_secret: "s", models: {} }),
    });
    assert.strictEqual(noModels, null);

    const noSecret = await readMonkeyCodeCredentials({
      read: async () =>
        JSON.stringify({
          models: {
            "monkeycode-basic/qwen3.8-flash@monkeycode#aaa": {
              api_key: "oma_k",
              model: "monkeycode-basic/qwen3.8-flash",
            },
          },
        }),
    });
    assert.strictEqual(noSecret, null);
  });

  it("returns null on malformed JSON", async () => {
    const found = await readMonkeyCodeCredentials({
      read: async () => "{nope",
    });
    assert.strictEqual(found, null);
  });
});
