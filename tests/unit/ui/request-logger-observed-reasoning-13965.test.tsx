// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => {
  const detailLabels: Record<string, string> = {
    totalOut: "Total Out: {value}",
    reasoning: "Reasoning: {value}",
    reasoningObserved: "{value} · {chars} chars observed",
    notAvailable: "N/A",
  };
  const interpolate = (template: string, params: Record<string, string> = {}) =>
    template.replace(/\{(\w+)\}/g, (_, k) => (k in params ? String(params[k]) : `{${k}}`));
  return {
    useLocale: () => "en",
    useTranslations: (namespace?: string) => (key: string, params?: Record<string, string>) =>
      namespace === "requestLogger.detail"
        ? interpolate(detailLabels[key] ?? key, params)
        : interpolate(key, params),
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ emailsVisible: true }),
}));

const RequestLoggerDetail = (await import("@/shared/components/RequestLoggerDetail")).default;
const { formatReasoningStat } = await import("@/shared/utils/formatting");

let container: HTMLElement;
let root: Root;

const baseLog = {
  id: "log-13965",
  status: 200,
  method: "POST",
  path: "/v1/chat/completions",
  model: "agnes-2.5-flash",
  provider: "openai-compatible-chat-13965",
  timestamp: "2026-09-17T09:43:09.000Z",
  duration: 1_000,
  tokens: { in: 37, out: 200, cacheRead: 256, cacheWrite: null, reasoning: null, compressed: null },
};

const noop = () => {};

async function renderDetail(log: Record<string, unknown>) {
  await act(async () => {
    root.render(
      <RequestLoggerDetail
        log={log}
        detail={log}
        loading={false}
        debugEnabled={false}
        onClose={noop}
        onCopy={async () => true}
        onPrevious={noop}
        onNext={noop}
        onSelectRelated={noop}
      />
    );
  });
  return container.querySelector('[data-testid="token-group-output"]')?.textContent ?? "";
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  container.remove();
});

describe("observed reasoning in the request log detail (#13965)", () => {
  it("shows observed thinking chars when usage reports no reasoning tokens", async () => {
    const output = await renderDetail({
      ...baseLog,
      reasoningSource: "content",
      reasoningChars: 1_234,
    });
    expect(output).toContain("Reasoning: N/A · 1,234 chars observed");
  });

  it("shows observed chars next to a metered zero (#6187 under-report)", async () => {
    const output = await renderDetail({
      ...baseLog,
      tokens: { ...baseLog.tokens, reasoning: 0 },
      reasoningSource: "content",
      reasoningChars: 42,
    });
    expect(output).toContain("Reasoning: 0 · 42 chars observed");
  });

  it("keeps the usage-reported count untouched when the provider meters reasoning", async () => {
    const output = await renderDetail({
      ...baseLog,
      tokens: { ...baseLog.tokens, reasoning: 76 },
      reasoningSource: "usage",
      reasoningChars: null,
    });
    expect(output).toContain("Reasoning: 76");
    expect(output).not.toContain("observed");
  });

  it("keeps a bare N/A when nothing was observed", async () => {
    const output = await renderDetail({ ...baseLog, reasoningSource: null, reasoningChars: null });
    expect(output).toContain("Reasoning: N/A");
    expect(output).not.toContain("observed");
  });
});

describe("formatReasoningStat", () => {
  const t = (key: string, values?: Record<string, string>) =>
    key === "notAvailable" ? "N/A" : `${values?.value}|${values?.chars}`;

  it("never turns observed chars into a token count", () => {
    expect(formatReasoningStat({ reasoning: null, reasoningChars: 1_000 }, t)).toBe("N/A|1,000");
    expect(formatReasoningStat({ reasoning: 12, reasoningChars: 1_000 }, t)).toBe("12");
    expect(formatReasoningStat({ reasoning: undefined, reasoningChars: 0 }, t)).toBe("N/A");
  });
});
