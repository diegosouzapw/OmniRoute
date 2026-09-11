// @vitest-environment jsdom

import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { notFoundMock, translationMock } = vi.hoisted(() => ({
  notFoundMock: vi.fn(),
  translationMock: (key: string) => key,
}));

vi.mock("next/navigation", () => ({
  notFound: notFoundMock,
}));

vi.mock("next-intl", () => ({
  useTranslations: () => translationMock,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/lib/radar/autoSync", () => ({
  shouldAutoSyncOnOpen: () => false,
}));

vi.mock("@/lib/radar/supporterKey", () => ({
  isValidSupporterKeyFormat: () => true,
}));

vi.mock("../../src/app/(dashboard)/dashboard/radar/RadarCatalogTable", () => ({
  RadarCatalogTable: () => <div>catalog</div>,
}));

import RadarPage from "../../src/app/(dashboard)/dashboard/radar/page";

function response(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

async function settle(): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await Promise.resolve();
  });
}

describe("Radar opt-in page", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    notFoundMock.mockReset();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = typeof input === "string" ? input : input.toString();
        if (url === "/api/radar/settings") {
          return response({
            optIn: false,
            hasSupporterKey: false,
            supporterKeyMasked: null,
            contributorClaimUrl: "https://radar.example.test/auth/github",
            supporterPlansUrl: "https://radar.example.test/planos",
          });
        }
        throw new Error(`Unexpected request: ${url}`);
      })
    );
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    act(() => root.unmount());
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("renders activation when the feature exists but the owner has not opted in", async () => {
    await act(async () => {
      root.render(<RadarPage />);
    });
    await settle();

    expect(notFoundMock).not.toHaveBeenCalled();
    expect(container.textContent).toContain("activateTitle");
    expect(container.textContent).toContain("activateButton");
    const activationIcon = container.querySelector(
      'span.material-symbols-outlined[aria-hidden="true"]'
    );
    expect(activationIcon?.textContent).toBe("radar");
    expect(container.textContent).not.toContain("📡");
  });

  it("shows the complete access and privacy explanation before every activation action", async () => {
    await act(async () => {
      root.render(<RadarPage />);
    });
    await settle();

    const renderedText = container.textContent ?? "";
    const explanationKeys = [
      "accessScaleTitle",
      "accessScaleIntro",
      "accessCommunityRule",
      "accessSingleUseRule",
      "accessContributorRule",
      "accessSupporterRule",
      "accessUseTitle",
      "accessInstallationRule",
      "accessAbuseRule",
      "accessOffersRule",
      "privacyTitle",
      "privacyDownloadsRule",
      "privacySendsRule",
      "privacyNeverRule",
    ];
    const firstActivationAction = Math.min(
      renderedText.indexOf("activateWithKeyButton"),
      renderedText.indexOf("activateButton")
    );

    expect(firstActivationAction).toBeGreaterThan(-1);
    for (const key of explanationKeys) {
      const position = renderedText.indexOf(key);
      expect(position, `${key} must be rendered`).toBeGreaterThan(-1);
      expect(position, `${key} must precede every activation action`).toBeLessThan(
        firstActivationAction
      );
    }
  });

  it("keeps the page hidden when the feature endpoint returns 404", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(response({ error: "Not found" }, 404));

    await act(async () => {
      root.render(<RadarPage />);
    });
    await settle();

    expect(notFoundMock).toHaveBeenCalled();
    expect(container.textContent).not.toContain("activateTitle");
  });
});
