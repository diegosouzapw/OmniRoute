// @vitest-environment jsdom
//
// Regression test for the "Saving..." hang on /dashboard/combos: the
// exploration-rate hint called t("explorationRateHint") with no ICU values,
// even though combos.explorationRateHint requires {percent}. next-intl's
// default (no onError override, matching this app's real providers) throws
// FORMATTING_ERROR for that call, which unmounted the whole builder step and
// looked like a silent save hang. See src/i18n/messages/en.json's
// "explorationRateHint" key and BuilderIntelligentStep.tsx's
// getI18nOrFallback().
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createTranslator } from "use-intl/core";

import BuilderIntelligentStep from "../../src/app/(dashboard)/dashboard/combos/BuilderIntelligentStep";
import enMessages from "../../src/i18n/messages/en.json";

// A real translator built from the app's actual EN catalog, with no custom
// onError -- this is what NextIntlClientProvider uses by default (see
// app/layout.tsx / app/global-error.tsx), so it faithfully reproduces the
// live FORMATTING_ERROR throw for a message with an unsupplied ICU variable.
const t = createTranslator({
  locale: "en",
  messages: enMessages as unknown as Record<string, unknown>,
  namespace: "combos",
});

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => {
    container.remove();
  });
  return container;
}

describe("BuilderIntelligentStep", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
  });

  it("renders the exploration-rate hint without crashing against the real EN catalog", async () => {
    const container = makeContainer();
    const root = createRoot(container);

    // Pre-fix, this threw FORMATTING_ERROR from inside the render and the
    // wizard step never committed to the DOM -- reproducing the reported
    // "Saving..." hang with no network activity.
    await act(async () => {
      root.render(
        <BuilderIntelligentStep
          t={t}
          config={{ explorationRate: 0.2 }}
          activeProviders={[]}
          onChange={() => {}}
        />
      );
    });

    const text = container.textContent ?? "";
    expect(text).toContain("20% of requests can explore non-optimal providers.");
  });

  it("still renders correctly when explorationRate is 0", async () => {
    const container = makeContainer();
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <BuilderIntelligentStep
          t={t}
          config={{ explorationRate: 0 }}
          activeProviders={[]}
          onChange={() => {}}
        />
      );
    });

    const text = container.textContent ?? "";
    expect(text).toContain("0% of requests can explore non-optimal providers.");
  });
});
