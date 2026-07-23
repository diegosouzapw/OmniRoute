import test from "node:test";
import assert from "node:assert/strict";

const { isApplyDisabled, isResetDisabled } = await import(
  "../../src/app/(dashboard)/dashboard/cli-code/components/codexButtonState.ts"
);

test("Codex tool card — Apply / Reset disabled state", async (t) => {
  // ──────────────────────────── Apply ────────────────────────────

  await t.test("Apply is disabled when no model is selected (regardless of key)", () => {
    assert.equal(
      isApplyDisabled({
        selectedModel: "",
        selectedApiKey: "key-1",
        cloudEnabled: true,
        apiKeys: ["key-1"],
      }),
      true,
    );
    assert.equal(
      isApplyDisabled({
        selectedModel: null,
        selectedApiKey: "",
        cloudEnabled: false,
        apiKeys: [],
      }),
      true,
    );
  });

  await t.test(
    "Apply is ENABLED with model + no key when cloud is disabled (default sk_omniroute path)",
    () => {
      // This is the central case the upstream port fixes: in local-mode the
      // sk_omniroute default kicks in, so an empty selectedApiKey must not
      // disable Apply.
      assert.equal(
        isApplyDisabled({
          selectedModel: "gpt-5.5",
          selectedApiKey: "",
          cloudEnabled: false,
          apiKeys: ["key-1"], // even with keys configured, local mode wins
        }),
        false,
      );
    },
  );

  await t.test("Apply is ENABLED with model + no key when no keys exist at all", () => {
    // Fresh install / cloud on but no keys created yet — the user should still
    // be able to apply with the default key.
    assert.equal(
      isApplyDisabled({
        selectedModel: "gpt-5.5",
        selectedApiKey: "",
        cloudEnabled: true,
        apiKeys: [],
      }),
      false,
    );
  });

  await t.test(
    "Apply IS disabled when cloud is on AND keys exist AND none selected (user must pick one)",
    () => {
      assert.equal(
        isApplyDisabled({
          selectedModel: "gpt-5.5",
          selectedApiKey: "",
          cloudEnabled: true,
          apiKeys: ["key-1", "key-2"],
        }),
        true,
      );
    },
  );

  await t.test("Apply is ENABLED when a model and a key are both selected", () => {
    assert.equal(
      isApplyDisabled({
        selectedModel: "gpt-5.5",
        selectedApiKey: "key-1",
        cloudEnabled: true,
        apiKeys: ["key-1"],
      }),
      false,
    );
  });

  await t.test("Apply tolerates null/undefined apiKeys (treats as empty)", () => {
    assert.equal(
      isApplyDisabled({
        selectedModel: "gpt-5.5",
        selectedApiKey: "",
        cloudEnabled: true,
        apiKeys: null,
      }),
      false,
    );
    assert.equal(
      isApplyDisabled({
        selectedModel: "gpt-5.5",
        selectedApiKey: "",
        cloudEnabled: true,
        apiKeys: undefined,
      }),
      false,
    );
  });

  // ──────────────────────────── Reset ────────────────────────────

  await t.test("Reset is ENABLED by default when the CLI is installed", () => {
    // The card only renders this control in the installed branch, so the only
    // thing that should ever block it is an in-flight reset.
    assert.equal(isResetDisabled({ restoring: false }), false);
  });

  await t.test("Reset is DISABLED only while the reset request is in flight", () => {
    assert.equal(isResetDisabled({ restoring: true }), true);
  });
});
