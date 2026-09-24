// @vitest-environment jsdom
/**
 * The Web-Search Routing setting (`settings.webSearchRouteModel`, layer 2 of #4481)
 * is documented as "leave blank to disable": when it holds a model, EVERY request
 * carrying a native web_search tool is rerouted to that model
 * (open-sse/services/webSearchRouting.ts -> resolveWebSearchRouteOverride).
 *
 * The dashboard field rendered a <ModelSelectField> without `allowEmpty`, which makes
 * the <Select> placeholder `disabled` (`placeholderDisabled={!allowEmpty}`). Once a
 * model had been selected there was no way back to the blank value from the UI — the
 * override stayed pinned forever and every web_search request silently left the
 * operator's configured provider. Clearing it required editing the settings row in
 * SQLite by hand.
 *
 * Guards both halves: the picker must actually offer a blank option, and the settings
 * tab must keep passing `allowEmpty`.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ModelSelectField from "@/shared/components/ModelSelectField";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    return t;
  },
}));

const REPO_ROOT = path.resolve(__dirname, "../../..");
const ROUTING_TAB = path.join(
  REPO_ROOT,
  "src/app/(dashboard)/dashboard/settings/components/RoutingTab.tsx"
);

function mockModels(models: string[]) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      json: async () => ({
        models: models.map((full) => ({ fullModel: full })),
      }),
    }))
  );
}

describe("web-search route model is clearable", () => {
  beforeEach(() => {
    mockModels(["cx/gpt-6-astra", "claude/claude-opus-5-5"]);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("offers a selectable blank option when allowEmpty is set", async () => {
    const onChange = vi.fn();
    render(
      <ModelSelectField
        value="cx/gpt-6-astra"
        onChange={onChange}
        placeholder="webSearchRoutePlaceholder"
        allowEmpty
        ariaLabel="webSearchRouteTitle"
      />
    );

    const select = (await screen.findByLabelText("webSearchRouteTitle")) as HTMLSelectElement;
    const placeholderOption = Array.from(select.options).find((option) => option.value === "");

    expect(placeholderOption, "the picker must render a blank option").toBeTruthy();
    expect(
      placeholderOption?.disabled,
      "the blank option must be selectable — otherwise the override can never be disabled"
    ).toBe(false);

    fireEvent.change(select, { target: { value: "" } });
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("keeps the blank option disabled without allowEmpty (documents the old behavior)", async () => {
    render(
      <ModelSelectField
        value="cx/gpt-6-astra"
        onChange={() => {}}
        placeholder="webSearchRoutePlaceholder"
        ariaLabel="webSearchRouteTitle"
      />
    );

    const select = (await screen.findByLabelText("webSearchRouteTitle")) as HTMLSelectElement;
    const placeholderOption = Array.from(select.options).find((option) => option.value === "");
    expect(placeholderOption?.disabled).toBe(true);
  });

  it("RoutingTab passes allowEmpty to the webSearchRouteModel picker", () => {
    const source = readFileSync(ROUTING_TAB, "utf8");
    const fieldStart = source.indexOf("settings.webSearchRouteModel");
    expect(fieldStart, "webSearchRouteModel field not found in RoutingTab").toBeGreaterThan(-1);

    const fieldEnd = source.indexOf("/>", fieldStart);
    const fieldSource = source.slice(fieldStart, fieldEnd);

    expect(
      /\ballowEmpty\b/.test(fieldSource),
      "the webSearchRouteModel picker must pass allowEmpty so the override can be cleared"
    ).toBe(true);
  });
});
