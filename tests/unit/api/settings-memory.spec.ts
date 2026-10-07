import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/shared/utils/apiAuth", () => ({
  isAuthenticated: vi.fn(),
}));

vi.mock("@/lib/db/settings", () => ({
  getSettings: vi.fn(),
  updateSettings: vi.fn(),
}));

vi.mock("@/lib/memory/settings", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/memory/settings")>("@/lib/memory/settings");
  return {
    ...actual,
    invalidateMemorySettingsCache: vi.fn(),
  };
});

import { GET, PUT } from "@/app/api/settings/memory/route";
import { getSettings, updateSettings } from "@/lib/db/settings";
import { DEFAULT_MEMORY_SETTINGS, invalidateMemorySettingsCache } from "@/lib/memory/settings";
import { isAuthenticated } from "@/shared/utils/apiAuth";

function createRequest(method: "GET" | "PUT", body?: unknown) {
  return new Request("http://localhost/api/settings/memory", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

describe("/api/settings/memory", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(isAuthenticated).mockResolvedValue(true);
    vi.mocked(getSettings).mockResolvedValue({
      memoryEnabled: true,
      memoryMaxTokens: 2000,
      memoryRetentionDays: 30,
      memoryStrategy: "hybrid",
      skillsEnabled: false,
    } as never);
    vi.mocked(updateSettings).mockImplementation(
      async (updates) =>
        ({
          memoryEnabled: true,
          memoryMaxTokens: 2000,
          memoryRetentionDays: 30,
          memoryStrategy: "hybrid",
          skillsEnabled: false,
          ...updates,
        }) as never
    );
  });

  it("returns normalized memory and skills settings", async () => {
    vi.mocked(getSettings).mockResolvedValue({
      memoryEnabled: false,
      memoryMaxTokens: 3200,
      memoryRetentionDays: 999,
      memoryStrategy: "recent",
      skillsEnabled: true,
    } as never);

    const res = await GET(createRequest("GET") as Parameters<typeof GET>[0]);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      ...DEFAULT_MEMORY_SETTINGS,
      enabled: false,
      maxTokens: 3200,
      retentionDays: 365,
      strategy: "recent",
      skillsEnabled: true,
    });
  });

  it("persists updates and clears the cached settings snapshot", async () => {
    const res = await PUT(
      createRequest("PUT", {
        enabled: false,
        maxTokens: 0,
        retentionDays: 14,
        strategy: "semantic",
        skillsEnabled: true,
      }) as Parameters<typeof PUT>[0]
    );

    expect(res.status).toBe(200);
    expect(updateSettings).toHaveBeenCalledOnce();
    expect(updateSettings).toHaveBeenCalledWith({
      memoryEnabled: false,
      memoryMaxTokens: 0,
      memoryRetentionDays: 14,
      memoryStrategy: "semantic",
      skillsEnabled: true,
    });
    expect(invalidateMemorySettingsCache).toHaveBeenCalledOnce();
    await expect(res.json()).resolves.toEqual({
      ...DEFAULT_MEMORY_SETTINGS,
      enabled: false,
      maxTokens: 0,
      retentionDays: 14,
      strategy: "semantic",
      skillsEnabled: true,
    });
  });
});
