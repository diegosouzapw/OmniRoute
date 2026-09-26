// @vitest-environment jsdom
import React, { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import ApiManagerPageClient from "../../../src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient";
import ApiKeyDetailsPageClient from "../../../src/app/(dashboard)/dashboard/api-manager/[id]/ApiKeyDetailsPageClient";
import { SelfServiceQuotaSettings } from "../../../src/app/(dashboard)/dashboard/api-manager/components/SelfServiceQuotaSettings";
import type { SelfServiceQuota } from "../../../src/app/(dashboard)/dashboard/api-manager/selfServiceQuota";
import { SELF_SERVICE_FIXTURE } from "../fixtures/apiKeySelfServiceView";

interface Call {
  url: string;
  method: string;
  body: unknown;
}

function stubFetch(route: (url: string, method: string) => { status?: number; body: unknown }) {
  const calls: Call[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      const method = init?.method ?? "GET";
      calls.push({ url, method, body: init?.body ? JSON.parse(String(init.body)) : undefined });
      const { status = 200, body } = route(url, method);
      return { ok: status < 400, status, json: async () => body };
    })
  );
  return calls;
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("SelfServiceQuotaSettings", () => {
  function Harness({
    initial,
    onEmit,
  }: {
    initial: SelfServiceQuota;
    onEmit: (v: SelfServiceQuota) => void;
  }) {
    const [value, setValue] = useState(initial);
    return (
      <SelfServiceQuotaSettings
        value={value}
        onChange={(next) => {
          onEmit(next);
          setValue(next);
        }}
        providerOptions={[
          { provider: "anthropic", connectionCount: 1 },
          { provider: "codex", connectionCount: 2, quotaSupported: false },
        ]}
      />
    );
  }

  it("emits a subset, [] for none and null for all providers", () => {
    const emitted: SelfServiceQuota[] = [];
    render(
      <Harness
        initial={{ sharedQuotaProviders: null, anthropicRateLimitHeaders: "auto" }}
        onEmit={(v) => emitted.push(v)}
      />
    );

    fireEvent.click(screen.getByRole("radio", { name: "Only selected providers" }));
    expect(emitted.at(-1)?.sharedQuotaProviders).toEqual(["anthropic", "codex"]);
    expect(screen.getByText("no quota data")).toBeTruthy();

    fireEvent.click(screen.getByRole("checkbox", { name: /codex/ }));
    expect(emitted.at(-1)?.sharedQuotaProviders).toEqual(["anthropic"]);

    fireEvent.click(screen.getByRole("checkbox", { name: /anthropic/ }));
    expect(emitted.at(-1)?.sharedQuotaProviders).toEqual([]);
    expect(screen.getByText(/No provider selected/)).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Anthropic rate-limit headers"), {
      target: { value: "forward" },
    });
    expect(emitted.at(-1)).toEqual({
      sharedQuotaProviders: [],
      anthropicRateLimitHeaders: "forward",
    });

    fireEvent.click(screen.getByRole("radio", { name: "All providers the key can reach" }));
    expect(emitted.at(-1)?.sharedQuotaProviders).toBeNull();
  });

  it("keeps the header mode editable when the key does not share account quota", () => {
    const onChange = vi.fn();
    render(
      <SelfServiceQuotaSettings
        value={{ sharedQuotaProviders: null, anthropicRateLimitHeaders: "auto" }}
        onChange={onChange}
        providerOptions={[{ provider: "anthropic", connectionCount: 1 }]}
        showProviderPicker={false}
      />
    );

    expect(screen.queryByRole("radio", { name: "All providers the key can reach" })).toBeNull();
    fireEvent.change(screen.getByLabelText("Anthropic rate-limit headers"), {
      target: { value: "strip" },
    });
    expect(onChange).toHaveBeenCalledWith({
      sharedQuotaProviders: null,
      anthropicRateLimitHeaders: "strip",
    });
  });
});

describe("API key permissions modal", () => {
  it("includes sharedQuotaProviders and anthropicRateLimitHeaders in the PATCH payload", async () => {
    const calls = stubFetch((url) => {
      if (url === "/api/keys") {
        return {
          body: {
            keys: [
              {
                id: "key-1",
                name: "Team key",
                key: "sk-test-1234",
                allowedModels: [],
                allowedCombos: [],
                allowedConnections: [],
                scopes: ["self:usage", "self:account-quota"],
                sharedQuotaProviders: ["anthropic"],
                anthropicRateLimitHeaders: "auto",
                createdAt: "2026-09-01T00:00:00.000Z",
              },
            ],
          },
        };
      }
      if (url === "/api/providers") {
        return {
          body: {
            connections: [
              {
                id: "11111111-1111-1111-1111-111111111111",
                name: "a",
                provider: "anthropic",
                isActive: true,
              },
              {
                id: "22222222-2222-2222-2222-222222222222",
                name: "b",
                provider: "codex",
                isActive: true,
              },
            ],
          },
        };
      }
      return { body: {} };
    });

    render(<ApiManagerPageClient />);
    fireEvent.click(await screen.findByTitle("Edit permissions"));
    expect(
      screen.getByRole("link", { name: /View usage, limits and quota for Team key/ })
    ).toBeTruthy();

    fireEvent.click(await screen.findByRole("checkbox", { name: /codex/ }));
    fireEvent.change(screen.getByLabelText("Anthropic rate-limit headers"), {
      target: { value: "strip" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save Permissions" }));

    await waitFor(() => expect(calls.some((c) => c.method === "PATCH")).toBe(true));
    const patch = calls.find((c) => c.method === "PATCH");
    expect(patch?.url).toBe("/api/keys/key-1");
    expect(patch?.body).toMatchObject({
      sharedQuotaProviders: ["anthropic", "codex"],
      anthropicRateLimitHeaders: "strip",
    });
  });
});

describe("API key details page", () => {
  function routeDetails(selfService: unknown, selfServiceStatus = 200) {
    return stubFetch((url, method) => {
      if (url === "/api/keys/key-1/self-service") {
        return method === "PUT"
          ? { body: { settings: SELF_SERVICE_FIXTURE.settings } }
          : { status: selfServiceStatus, body: selfService };
      }
      if (url === "/api/keys/key-1") {
        return {
          body: { id: "key-1", name: "Team key", scopes: ["self:usage"], usageLimitEnabled: false },
        };
      }
      if (url.startsWith("/api/usage/token-limits")) return { body: { limits: [] } };
      if (url.startsWith("/api/usage/key-quota")) {
        return {
          body: {
            limits: { tpmLimit: null, rpmLimit: 60, monthlyAmountUsd: null },
            counters: { tpmUsed: 0, rpmUsed: 3, monthlyAmountUsd: 2 },
          },
        };
      }
      return { body: {} };
    });
  }

  it("renders usage, limits and shared account quotas from the status body", async () => {
    routeDetails(SELF_SERVICE_FIXTURE);
    render(<ApiKeyDetailsPageClient keyId="key-1" />);

    expect(await screen.findByRole("heading", { level: 1, name: "Team key" })).toBeTruthy();
    expect(screen.getByText("Own usage visible to key holder")).toBeTruthy();
    expect(screen.getByText("Account quota hidden from key holder")).toBeTruthy();

    const limits = screen.getByRole("region", { name: "Limits" });
    expect(within(limits).getByText("USD usage limit")).toBeTruthy();
    expect(within(limits).getByText("Exceeded")).toBeTruthy();
    expect(within(limits).getByText("Provider: anthropic")).toBeTruthy();
    const bars = within(limits).getAllByRole("progressbar");
    expect(bars.map((bar) => bar.getAttribute("aria-valuenow"))).toEqual(["100", "25"]);

    const quotas = screen.getByRole("region", { name: "Shared account quota" });
    expect(within(quotas).getByRole("heading", { name: "t***@e***.com" })).toBeTruthy();
    expect(within(quotas).getByText("Stale")).toBeTruthy();
    expect(within(quotas).getByText("42% used")).toBeTruthy();
    expect(within(quotas).getByText("This provider does not report account quota.")).toBeTruthy();
    expect(within(quotas).getByText(/Preview only/)).toBeTruthy();

    expect(screen.getByText("No token limits yet.")).toBeTruthy();
  });

  it("shows empty states when the key has no limits or shared quota", async () => {
    routeDetails({
      ...SELF_SERVICE_FIXTURE,
      status: { ...SELF_SERVICE_FIXTURE.status, limits: [], accountQuotas: [] },
    });
    render(<ApiKeyDetailsPageClient keyId="key-1" />);
    expect(await screen.findByText("No limits are configured for this key.")).toBeTruthy();
    expect(screen.getByText("No shared account quota for this key.")).toBeTruthy();
  });

  it("saves self-service settings immediately and refetches", async () => {
    const calls = routeDetails(SELF_SERVICE_FIXTURE);
    render(<ApiKeyDetailsPageClient keyId="key-1" />);
    const settings = await screen.findByRole("region", { name: "Shared quota and headers" });
    const loadsBefore = calls.filter((c) => c.url === "/api/keys/key-1/self-service").length;

    fireEvent.click(
      within(settings).getByRole("radio", { name: "All providers the key can reach" })
    );

    await waitFor(() => expect(calls.some((c) => c.method === "PUT")).toBe(true));
    expect(calls.find((c) => c.method === "PUT")?.body).toEqual({
      sharedQuotaProviders: null,
      anthropicRateLimitHeaders: "auto",
    });
    await waitFor(() =>
      expect(calls.filter((c) => c.url === "/api/keys/key-1/self-service").length).toBe(
        loadsBefore + 2
      )
    );
  });

  it("shows a sanitized error instead of the raw body when loading fails", async () => {
    routeDetails({ error: { message: "stack at x (file.ts:1)" } }, 404);
    render(<ApiKeyDetailsPageClient keyId="key-1" />);
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("This API key was not found");
    expect(alert.textContent).not.toContain("stack");
  });
});
