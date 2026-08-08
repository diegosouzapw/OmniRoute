// @vitest-environment jsdom
//
// Regression test: opaque model ids must still render a readable label.
//
// Gateways that expose preset-style model ids (32-char hex GUIDs) still return a
// friendly `name` in their /models payload, and CompatibleModelsSection already
// computes it as `displayName` (`model.name || model.id`). But the render used to
// destructure only { modelId, alias, isHidden, source, isFree } — dropping
// displayName — and PassthroughModelRow had no name fallback, so every such model
// showed the bare GUID plus "Click to set alias".
//
// This asserts the friendly name is rendered when there is no alias, that an alias
// still wins over it, and that a displayName equal to the id is NOT echoed (which
// would print the GUID twice).

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import PassthroughModelRow from "../components/PassthroughModelRow";

const GUID = "0123456789abcdef0123456789abcdef";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
});

function renderRow(extra: Record<string, unknown>) {
  const root = createRoot(container);
  act(() => {
    root.render(
      <PassthroughModelRow
        modelId={GUID}
        fullModel={`acme/${GUID}`}
        provider="acme"
        onCopy={() => {}}
        // The alias slot only renders when the row is alias-editable.
        onSetAlias={() => {}}
        t={(_key: string, _values?: Record<string, unknown>) => ""}
        effectiveModelNormalize={() => false}
        effectiveModelPreserveDeveloper={() => false}
        saveModelCompatFlags={() => {}}
        getUpstreamHeadersRecord={() => ({})}
        {...extra}
      />
    );
  });
  return container.textContent || "";
}

describe("PassthroughModelRow — friendly name fallback", () => {
  it("renders the upstream name when the model has no alias", () => {
    const text = renderRow({ displayName: "Speech To Text (Fast)", alias: null });
    expect(text).toContain("Speech To Text (Fast)");
  });

  it("prefers an explicit alias over the upstream name", () => {
    const text = renderRow({ displayName: "Speech To Text (Fast)", alias: "whisper" });
    expect(text).toContain("whisper");
    expect(text).not.toContain("Speech To Text (Fast)");
  });

  it("does not echo the id when displayName equals the model id", () => {
    const text = renderRow({ displayName: GUID, alias: null });
    // The id is shown once as the model label; the alias slot must not repeat it.
    expect(text.split(GUID).length - 1).toBe(1);
  });
});
