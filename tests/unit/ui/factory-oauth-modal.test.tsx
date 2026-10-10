// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, test, expect, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) =>
    ({
      factoryOrganizationTitle: "Choose a Factory organization",
      factoryOrganizationSelectLabel: "Factory organization",
      factoryOrganizationContinue: "Connect organization",
      factoryOrganizationRetry: "Retry selected organization",
      factoryOrganizationSelectPrompt: "Select an organization",
    })[key] ?? key,
}));

const { default: OAuthModal } = await import("@/shared/components/OAuthModal");
const roots: Array<{ root: Root; element: HTMLDivElement }> = [];

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-10T12:00:00Z"));
});

afterEach(() => {
  for (const { root, element } of roots.splice(0)) {
    act(() => root.unmount());
    element.remove();
  }
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test("Factory multi-org pause retains exact selection across transient resume", async () => {
  const pollBodies: Array<Record<string, unknown>> = [];
  const onSuccess = vi.fn();
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === "/api/oauth/factory/auto-import") return json({ found: false });
    if (url.includes("/device-code")) {
      return json({
        device_code: "opaque-device",
        user_code: "FACTORY-CODE",
        verification_uri: "https://auth.factory.ai/device",
        interval: 5,
        expires_in: 300,
      });
    }
    if (url.endsWith("/poll")) {
      const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
      pollBodies.push(body);
      if (pollBodies.length === 1) {
        return json({
          success: false,
          error: "organization_selection_required",
          organizationSession: "opaque-session",
          organizations: ["org_one", "org_two"],
        });
      }
      if (pollBodies.length === 2) return json({ success: false, error: "transient_error" }, 503);
      return json({ success: true, connection: { id: "existing", provider: "factory" } });
    }
    throw new Error(`Unexpected request: ${url}`);
  });
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(window, "open").mockImplementation(() => null);

  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  roots.push({ root, element });
  act(() =>
    root.render(
      <OAuthModal
        isOpen={true}
        provider="factory"
        providerInfo={{ name: "Factory" }}
        reauthConnection={{ id: "existing" }}
        onSuccess={onSuccess}
        onClose={vi.fn()}
      />
    )
  );
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(5_000);
  });
  expect(pollBodies).toHaveLength(1);
  expect(element.textContent).toContain("Choose a Factory organization");
  const selector = element.querySelector("select[required]") as HTMLSelectElement | null;
  expect(selector?.options.length).toBe(3);
  expect(selector?.options[2].value).toBe("org_two");
  await act(async () => {
    if (!selector) throw new Error("organization selector absent");
    selector.value = "org_two";
    selector.dispatchEvent(new Event("change", { bubbles: true }));
  });
  const choose = (text: string) => {
    const button = [...element.querySelectorAll("button")].find((item) =>
      item.textContent?.includes(text)
    );
    if (!button) throw new Error(`Missing button ${text}`);
    act(() => button.click());
  };
  choose("Connect organization");
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
  expect(pollBodies).toHaveLength(2);
  expect(element.textContent).toContain("Retry selected organization");
  choose("Retry selected organization");
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
  expect(pollBodies).toHaveLength(3);
  for (const body of pollBodies.slice(1)) {
    expect(body.deviceCode).toBe("opaque-device");
    expect(body.connectionId).toBe("existing");
    expect(body.extraData).toEqual({
      organizationSession: "opaque-session",
      organizationId: "org_two",
    });
  }
  expect(onSuccess).toHaveBeenCalledOnce();
});
