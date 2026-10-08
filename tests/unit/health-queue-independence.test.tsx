import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, expect, it, vi } from "vitest";
import HealthPage from "../../src/app/(dashboard)/dashboard/health/page";
import messages from "../../src/i18n/messages/en.json";

vi.mock("@/lib/display/useProviderNodeMap", () => ({
  useProviderNodeMap: () => ({}),
  resolveProviderName: (provider: string) => provider,
}));
vi.mock("../../src/app/(dashboard)/dashboard/health/TelemetryCard", () => ({
  default: () => null,
}));
vi.mock("../../src/app/(dashboard)/dashboard/health/ProviderHealthAutopilotCard", () => ({
  default: () => null,
}));
vi.mock("../../src/app/(dashboard)/dashboard/health/ProviderHealthMatrixCard", () => ({
  default: () => null,
}));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it("keeps queue polling and refresh mounted through health loading and health failures", async () => {
  vi.useFakeTimers();
  let failHealth!: () => void;
  const fetchMock = vi.fn<typeof fetch>(async (input) => {
    if (input === "/api/monitoring/health") {
      return new Promise<Response>((resolve) => {
        failHealth = () => resolve(new Response(null, { status: 503 }));
      });
    }
    if (input === "/api/admin/concurrency") {
      return new Response(
        JSON.stringify({ timestamp: new Date().toISOString(), comboQueues: {}, semaphores: {} })
      );
    }
    return new Response("{}");
  });
  vi.stubGlobal("fetch", fetchMock);
  render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <HealthPage />
    </NextIntlClientProvider>
  );
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
  expect(screen.getByText("Loading health data...")).toBeTruthy();
  expect(screen.getAllByText("No gates tracked in this snapshot.")).toHaveLength(2);
  await act(async () => {
    failHealth();
  });
  expect(screen.getByText("Failed to load health data: HTTP 503")).toBeTruthy();
  expect(screen.getAllByText("No gates tracked in this snapshot.")).toHaveLength(2);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(3000);
  });
  const queueCalls = () => fetchMock.mock.calls.filter(([url]) => url === "/api/admin/concurrency");
  expect(queueCalls()).toHaveLength(2);
  fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
  await act(async () => {});
  expect(queueCalls()).toHaveLength(3);
  expect(fetchMock.mock.calls.filter(([url]) => url === "/api/monitoring/health")).toHaveLength(1);
});
