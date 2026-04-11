import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET, PUT } from "../forwarding-keywords/route";
import {
  getDefaultForwardingKeywordConfig,
  setForwardingKeywordConfig,
} from "@omniroute/open-sse/config/forwardingKeywordRules.ts";

vi.mock("../../../../lib/localDb", () => {
  const original = vi.importActual("../../../../lib/localDb");
  return {
    ...original,
    getSettings: vi.fn(),
    updateSettings: vi.fn(),
  };
});

import { getSettings, updateSettings } from "../../../../lib/localDb";

const mockedGetSettings = vi.mocked(getSettings);
const mockedUpdateSettings = vi.mocked(updateSettings);

function createPutRequest(body: unknown) {
  return new Request("http://localhost/api/settings/forwarding-keywords", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("/api/settings/forwarding-keywords", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    setForwardingKeywordConfig(getDefaultForwardingKeywordConfig());
    mockedGetSettings.mockResolvedValue({
      forwardingKeywordRules: getDefaultForwardingKeywordConfig(),
    });
    mockedUpdateSettings.mockImplementation(async (updates: Record<string, unknown>) => updates);
  });

  it("returns persisted forwarding keyword config", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.config["claude-oauth-prefixed"].toolNames[0]).toEqual({
      match: "background_output",
      replace: "background_result",
    });
    expect(json.defaults["claude-oauth-prefixed"].tags[0].open).toBe("<directories>");
  });

  it("persists updated forwarding keyword config", async () => {
    const body = {
      "claude-oauth-prefixed": {
        toolNames: [{ match: "background_output", replace: "bg_out" }],
        text: [{ match: "background_output", replace: "bg_out" }],
        tags: [
          {
            open: "<directories>",
            openReplacement: "dirs:\n",
            close: "</directories>",
            closeReplacement: "",
          },
        ],
      },
    };

    const res = await PUT(createPutRequest(body));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(mockedUpdateSettings).toHaveBeenCalledOnce();
    expect(mockedUpdateSettings.mock.calls[0][0].forwardingKeywordRules).toEqual(body);
    expect(json.config["claude-oauth-prefixed"].toolNames[0].replace).toBe("bg_out");
  });

  it("keeps default rewrite rules when empty arrays are saved", async () => {
    const body = {
      "claude-oauth-prefixed": {
        toolNames: [],
        text: [],
        tags: [],
      },
    };

    const res = await PUT(createPutRequest(body));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.config["claude-oauth-prefixed"]).toEqual(
      getDefaultForwardingKeywordConfig()["claude-oauth-prefixed"]
    );
  });

  it("overrides matching defaults without disabling the rest", async () => {
    const body = {
      "claude-oauth-prefixed": {
        toolNames: [{ match: "background_output", replace: "bg_out" }],
        text: [],
        tags: [],
      },
    };

    const res = await PUT(createPutRequest(body));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.config["claude-oauth-prefixed"].toolNames).toEqual([
      { match: "background_output", replace: "bg_out" },
      { match: "background_cancel", replace: "background_stop" },
    ]);
    expect(json.config["claude-oauth-prefixed"].text).toEqual(
      getDefaultForwardingKeywordConfig()["claude-oauth-prefixed"].text
    );
  });

  it("rejects whitespace-only keyword matches", async () => {
    const body = {
      "claude-oauth-prefixed": {
        toolNames: [{ match: "   ", replace: "bg_out" }],
        text: [{ match: "background_output", replace: "bg_out" }],
        tags: [
          {
            open: "<directories>",
            openReplacement: "dirs:\n",
            close: "</directories>",
            closeReplacement: "",
          },
        ],
      },
    };

    const res = await PUT(createPutRequest(body));
    expect(res.status).toBe(400);
    expect(mockedUpdateSettings).not.toHaveBeenCalled();
  });
});
