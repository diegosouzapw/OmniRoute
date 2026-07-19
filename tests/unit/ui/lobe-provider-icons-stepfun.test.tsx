import { describe, expect, it } from "vitest";

describe("lobeProviderIcons Stepfun fallback", () => {
  it("loads the icon registry and resolves the color slot to the Mono component", async () => {
    const { getLobeProviderIcon } = await import("@/shared/components/lobeProviderIcons");

    const monoIcon = getLobeProviderIcon("stepfun", "mono");
    const colorIcon = getLobeProviderIcon("stepfun", "color");

    expect(monoIcon).not.toBeNull();
    expect(colorIcon).toBe(monoIcon);
  });
});
