// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import {
  computeRetryDelayOverrides,
  retryDelaySelectValue,
} from "../components/ProviderRetryDelaySelect";

describe("ProviderRetryDelaySelect override-map helpers", () => {
  it("sets rateLimitCooldownSeconds and keeps the provider's other fields and other providers", () => {
    const next = computeRetryDelayOverrides(
      { nvidia: { rpm: 30, concurrency: 2 }, openai: { rateLimitCooldownSeconds: 60 } },
      "nvidia",
      "300"
    );
    expect(next).toEqual({
      nvidia: { rpm: 30, concurrency: 2, rateLimitCooldownSeconds: 300 },
      openai: { rateLimitCooldownSeconds: 60 },
    });
  });

  it("auto clears only the cooldown field and keeps rpm/concurrency", () => {
    const next = computeRetryDelayOverrides(
      { nvidia: { rpm: 30, rateLimitCooldownSeconds: 120 } },
      "nvidia",
      "auto"
    );
    expect(next).toEqual({ nvidia: { rpm: 30 } });
  });

  it("auto drops the provider entry entirely when nothing else is set", () => {
    const next = computeRetryDelayOverrides(
      { nvidia: { rateLimitCooldownSeconds: 120 }, openai: { rpm: 10 } },
      "nvidia",
      "auto"
    );
    expect(next).toEqual({ openai: { rpm: 10 } });
  });

  it("does not mutate the input map", () => {
    const current = { nvidia: { rateLimitCooldownSeconds: 120 } };
    computeRetryDelayOverrides(current, "nvidia", "60");
    expect(current).toEqual({ nvidia: { rateLimitCooldownSeconds: 120 } });
  });

  it("maps the stored value to the select value", () => {
    expect(retryDelaySelectValue({ nvidia: { rateLimitCooldownSeconds: 600 } }, "nvidia")).toBe(
      "600"
    );
    expect(retryDelaySelectValue({ nvidia: { rpm: 30 } }, "nvidia")).toBe("auto");
    expect(retryDelaySelectValue(null, "nvidia")).toBe("auto");
  });
});
