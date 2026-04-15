import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Inline buildUrl logic from DefaultExecutor for unit testing
// (avoids importing ESM modules with complex dependency chains)

function buildUrlOpenAI(_provider, credentials) {
  const psd = credentials?.providerSpecificData;
  const baseUrl = psd?.baseUrl || "https://api.openai.com/v1";
  const normalized = baseUrl.replace(/\/$/, "");
  const customPath = typeof psd?.chatPath === "string" && psd.chatPath ? psd.chatPath : null;
  if (customPath) return `${normalized}${customPath}`;
  const apiType = typeof psd?.apiType === "string" ? psd.apiType : "chat";
  const path = apiType === "responses" ? "/responses" : "/chat/completions";
  return `${normalized}${path}`;
}

function buildUrlAnthropic(credentials) {
  const psd = credentials?.providerSpecificData;
  const baseUrl = psd?.baseUrl || "https://api.anthropic.com/v1";
  const normalized = baseUrl.replace(/\/$/, "");
  const customPath = typeof psd?.chatPath === "string" && psd.chatPath ? psd.chatPath : null;
  return `${normalized}${customPath || "/messages"}`;
}

function buildModelsUrl(baseUrl, modelsPath) {
  const normalized = baseUrl.replace(/\/$/, "");
  return `${normalized}${modelsPath || "/models"}`;
}

describe("Custom Endpoint Paths", () => {
  describe("OpenAI Compatible buildUrl", () => {
    it("returns custom chatPath when provided", () => {
      const url = buildUrlOpenAI("openai-compatible-chat-abc123", {
        providerSpecificData: {
          baseUrl: "https://api.epsiloncode.pl",
          chatPath: "/v4/chat/completions",
        },
      });
      assert.equal(url, "https://api.epsiloncode.pl/v4/chat/completions");
    });

    it("returns default /chat/completions without chatPath", () => {
      const url = buildUrlOpenAI("openai-compatible-chat-abc123", {
        providerSpecificData: {
          baseUrl: "https://api.openai.com/v1",
        },
      });
      assert.equal(url, "https://api.openai.com/v1/chat/completions");
    });

    it("returns /responses for responses provider without chatPath", () => {
      const url = buildUrlOpenAI("openai-compatible-responses-abc123", {
        providerSpecificData: {
          apiType: "responses",
          baseUrl: "https://api.openai.com/v1",
        },
      });
      assert.equal(url, "https://api.openai.com/v1/responses");
    });

    it("prefers providerSpecificData.apiType for legacy provider ids", () => {
      const url = buildUrlOpenAI("openai-compatible-sp-openai", {
        providerSpecificData: {
          apiType: "responses",
          baseUrl: "https://api.openai.com/v1",
        },
      });
      assert.equal(url, "https://api.openai.com/v1/responses");
    });

    it("treats empty string chatPath as default", () => {
      const url = buildUrlOpenAI("openai-compatible-chat-abc123", {
        providerSpecificData: {
          baseUrl: "https://api.example.com/v1",
          chatPath: "",
        },
      });
      assert.equal(url, "https://api.example.com/v1/chat/completions");
    });

    it("strips trailing slash from baseUrl", () => {
      const url = buildUrlOpenAI("openai-compatible-chat-abc123", {
        providerSpecificData: {
          baseUrl: "https://api.example.com/v1/",
          chatPath: "/v4/chat/completions",
        },
      });
      assert.equal(url, "https://api.example.com/v1/v4/chat/completions");
    });
  });

  describe("Anthropic Compatible buildUrl", () => {
    it("returns custom chatPath when provided", () => {
      const url = buildUrlAnthropic({
        providerSpecificData: {
          baseUrl: "https://proxy.example.com/v2",
          chatPath: "/v4/messages",
        },
      });
      assert.equal(url, "https://proxy.example.com/v2/v4/messages");
    });

    it("returns default /messages without chatPath", () => {
      const url = buildUrlAnthropic({
        providerSpecificData: {
          baseUrl: "https://api.anthropic.com/v1",
        },
      });
      assert.equal(url, "https://api.anthropic.com/v1/messages");
    });

    it("treats empty string chatPath as default", () => {
      const url = buildUrlAnthropic({
        providerSpecificData: {
          baseUrl: "https://api.anthropic.com/v1",
          chatPath: "",
        },
      });
      assert.equal(url, "https://api.anthropic.com/v1/messages");
    });
  });

  describe("Validate endpoint modelsPath", () => {
    it("uses modelsPath when provided", () => {
      const url = buildModelsUrl("https://api.example.com/v1", "/v4/models");
      assert.equal(url, "https://api.example.com/v1/v4/models");
    });

    it("falls back to /models when modelsPath is empty", () => {
      const url = buildModelsUrl("https://api.example.com/v1", "");
      assert.equal(url, "https://api.example.com/v1/models");
    });

    it("falls back to /models when modelsPath is undefined", () => {
      const url = buildModelsUrl("https://api.example.com/v1", undefined);
      assert.equal(url, "https://api.example.com/v1/models");
    });
  });

  describe("No credentials fallback", () => {
    it("works with null credentials for openai-compatible", () => {
      const url = buildUrlOpenAI("openai-compatible-chat-abc123", null);
      assert.equal(url, "https://api.openai.com/v1/chat/completions");
    });

    it("works with null credentials for anthropic-compatible", () => {
      const url = buildUrlAnthropic(null);
      assert.equal(url, "https://api.anthropic.com/v1/messages");
    });
  });
});
