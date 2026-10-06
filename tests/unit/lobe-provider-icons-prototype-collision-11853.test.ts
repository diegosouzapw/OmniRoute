/**
 * Regression for #11853 — the providers dashboard crashed with
 * "Cannot read properties of undefined (reading 'color')" and rendered a
 * misleading "Failed to load providers — check your connection" card.
 *
 * `getLobeProviderIcon()` indexed two plain object literals without own-property
 * guards. A provider id whose lowercased form is an Object.prototype member
 * resolves through the prototype chain: `LOBE_PROVIDER_ALIASES["constructor"]`
 * returns the Object constructor (truthy, so the `if (!iconKey) return null`
 * guard passes), then `LOBE_ICON_COMPONENTS[<that function>]` is undefined and
 * `entry.color` throws — taking the whole page down through the App Router
 * error boundary, since ProviderIcon calls this for every provider card.
 *
 * Only `constructor` and `__proto__` are reachable: every other Object.prototype
 * member is camelCase and no longer collides after `.toLowerCase()`.
 *
 * Runner: node --import tsx/esm --test tests/unit/lobe-provider-icons-prototype-collision-11853.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

const { getLobeProviderIcon } = await import("../../src/shared/components/lobeProviderIcons.ts");

test("#11853 — prototype-colliding provider ids return null instead of throwing", () => {
  for (const id of ["constructor", "__proto__", "CONSTRUCTOR", "__PROTO__"]) {
    for (const type of ["color", "mono"] as const) {
      assert.doesNotThrow(() => getLobeProviderIcon(id, type), `${id} (${type}) must not throw`);
      assert.equal(getLobeProviderIcon(id, type), null, `${id} (${type}) must resolve to null`);
    }
  }
});

test("#11853 — camelCase prototype members were already safe and stay safe", () => {
  for (const id of ["valueOf", "toString", "hasOwnProperty", "isPrototypeOf"]) {
    assert.equal(getLobeProviderIcon(id), null);
  }
});

test("#11853 — no regression: known providers still resolve, unknown ones still null", () => {
  assert.notEqual(getLobeProviderIcon("openai"), null);
  assert.notEqual(getLobeProviderIcon("anthropic"), null);
  assert.equal(getLobeProviderIcon("definitely-not-a-provider"), null);
});

test("#11853 — a non-string provider id does not throw", () => {
  assert.doesNotThrow(() => getLobeProviderIcon(undefined as unknown as string));
  assert.equal(getLobeProviderIcon(undefined as unknown as string), null);
});
