import test from "node:test";
import assert from "node:assert/strict";
import {
  broadcastModelVisibilityChange,
  subscribeModelVisibilityChanges,
  MODEL_VISIBILITY_REVISION_KEY,
} from "../../src/shared/utils/modelVisibility.ts";

test("#16977 picker refresh subscriptions react to local, cross-tab and focus events", () => {
  class FakeWindow extends EventTarget {
    localStorage = { setItem: (key: string, value: string) => {
      assert.equal(key, MODEL_VISIBILITY_REVISION_KEY);
      assert.ok(value.length > 0);
    } };
  }
  const fake = new FakeWindow();
  const hadWindow = Object.prototype.hasOwnProperty.call(globalThis, "window");
  const previous = (globalThis as Record<string, unknown>).window;
  Object.defineProperty(globalThis, "window", { value: fake, writable: true, configurable: true });
  try {
    let refreshCount = 0;
    const unsubscribe = subscribeModelVisibilityChanges(() => { refreshCount++; });
    broadcastModelVisibilityChange();
    assert.equal(refreshCount, 1, "same-tab visibility write should refresh");

    const changed = new Event("storage");
    Object.defineProperty(changed, "key", { value: MODEL_VISIBILITY_REVISION_KEY });
    fake.dispatchEvent(changed);
    assert.equal(refreshCount, 2, "cross-tab update should refresh");

    const irrelevant = new Event("storage");
    Object.defineProperty(irrelevant, "key", { value: "unrelated" });
    fake.dispatchEvent(irrelevant);
    assert.equal(refreshCount, 2);

    fake.dispatchEvent(new Event("focus"));
    assert.equal(refreshCount, 3, "returning to an open picker should refresh");

    unsubscribe();
    broadcastModelVisibilityChange();
    fake.dispatchEvent(new Event("focus"));
    assert.equal(refreshCount, 3, "unmounted picker no longer reacts");
  } finally {
    if (hadWindow) {
      Object.defineProperty(globalThis, "window", {
        value: previous, writable: true, configurable: true,
      });
    } else {
      Reflect.deleteProperty(globalThis, "window");
    }
  }
});
