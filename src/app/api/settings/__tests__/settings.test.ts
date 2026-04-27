import { describe, it, expect, vi, beforeEach } from "vitest";
import { PATCH } from "../route";

// Mock the localDb functions used in the route
vi.mock("../../../../lib/localDb", () => {
  const original = vi.importActual("../../../../lib/localDb");
  return {
    ...original,
    getSettings: vi.fn(),
    updateSettings: vi.fn(),
  };
});

import { getSettings, updateSettings } from "../../../../lib/localDb";

// Helper to create a Request with JSON body
function createPatchRequest(body: unknown) {
  return new Request("http://localhost/api/settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("PATCH /api/settings", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Default settings before each test
    (getSettings as any).mockResolvedValue({
      debugMode: false,
      hiddenSidebarItems: [],
      comboConfigMode: "guided",
    });
    // Mock updateSettings to merge updates into the original
    (updateSettings as any).mockImplementation(async (updates: Record<string, unknown>) => {
      const current = await (getSettings as any)();
      return { ...current, ...updates };
    });
  });

  it("toggles debugMode via PATCH", async () => {
    const req = createPatchRequest({ debugMode: true });
    const res = await PATCH(req as any);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.debugMode).toBe(true);
    // Ensure password is not leaked
    expect(json).not.toHaveProperty("password");
    // Verify DB update called with correct payload
    expect(updateSettings).toHaveBeenCalledOnce();
    const calledWith = (updateSettings as any).mock.calls[0][0];
    expect(calledWith.debugMode).toBe(true);
  });

  it("updates hiddenSidebarItems via PATCH", async () => {
    const req = createPatchRequest({ hiddenSidebarItems: [] });
    const res = await PATCH(req as any);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.hiddenSidebarItems).toEqual([]);
    expect(updateSettings).toHaveBeenCalledOnce();
    const calledWith = (updateSettings as any).mock.calls[0][0];
    expect(calledWith.hiddenSidebarItems).toEqual([]);
  });

  it("updates comboConfigMode via PATCH", async () => {
    const req = createPatchRequest({ comboConfigMode: "expert" });
    const res = await PATCH(req as any);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.comboConfigMode).toBe("expert");
    expect(updateSettings).toHaveBeenCalledOnce();
    const calledWith = (updateSettings as any).mock.calls[0][0];
    expect(calledWith.comboConfigMode).toBe("expert");
  });
});
