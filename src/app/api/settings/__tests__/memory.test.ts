import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../../shared/utils/apiAuth", () => ({
  isAuthenticated: vi.fn(),
}));

vi.mock("../../../../lib/localDb", () => ({
  getSettings: vi.fn(),
  updateSettings: vi.fn(),
}));

vi.mock("../../../../lib/memory/settings", async () => {
  const actual = await vi.importActual("../../../../lib/memory/settings");
  return {
    ...actual,
    invalidateMemorySettingsCache: vi.fn(),
  };
});

import { GET, PUT } from "../memory/route";
import { isAuthenticated } from "../../../../shared/utils/apiAuth";
import { getSettings, updateSettings } from "../../../../lib/localDb";
import { invalidateMemorySettingsCache } from "../../../../lib/memory/settings";

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
    (isAuthenticated as any).mockResolvedValue(true);
    (getSettings as any).mockResolvedValue({
      memoryEnabled: true,
      memoryMaxTokens: 2000,
      memoryRetentionDays: 30,
      memoryStrategy: "hybrid",
      skillsEnabled: false,
    });
    (updateSettings as any).mockImplementation(async (updates: Record<string, unknown>) => ({
      memoryEnabled: true,
      memoryMaxTokens: 2000,
      memoryRetentionDays: 30,
      memoryStrategy: "hybrid",
      skillsEnabled: false,
      ...updates,
    }));
  });

  it("returns normalized memory and skills settings", async () => {
    (getSettings as any).mockResolvedValue({
      memoryEnabled: false,
      memoryMaxTokens: 3200,
      memoryRetentionDays: 999,
      memoryStrategy: "recent",
      skillsEnabled: true,
    });

    const res = await GET(createRequest("GET") as any);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
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
      }) as any
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
      enabled: false,
      maxTokens: 0,
      retentionDays: 14,
      strategy: "semantic",
      skillsEnabled: true,
    });
  });
});
