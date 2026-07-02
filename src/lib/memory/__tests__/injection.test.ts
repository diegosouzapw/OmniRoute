import { describe, test, expect } from "vitest";
import {
  injectMemory,
  shouldInjectMemory,
  formatMemoryContext,
  providerSupportsSystemMessage,
  ChatRequest,
} from "../injection";
import { Memory, MemoryType } from "../types";

function makeMemory(content: string, overrides: Partial<Memory> = {}): Memory {
  return {
    id: "mem-1",
    apiKeyId: "key-1",
    sessionId: "sess-1",
    type: MemoryType.FACTUAL,
    key: "test-key",
    content,
    metadata: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    expiresAt: null,
    ...overrides,
  };
}

function makeRequest(overrides: Partial<ChatRequest> = {}): ChatRequest {
  return {
    model: "gpt-4",
    messages: [{ role: "user", content: "Hello" }],
    ...overrides,
  };
}

describe("formatMemoryContext", () => {
  test("returns empty string for empty array", () => {
    expect(formatMemoryContext([])).toBe("");
  });

  test("single memory is formatted with 'Memory context:' prefix", () => {
    const result = formatMemoryContext([makeMemory("User prefers dark mode")]);
    expect(result).toBe("Memory context: User prefers dark mode");
  });

  test("multiple memories are joined with newline", () => {
    const memories = [makeMemory("fact one"), makeMemory("fact two")];
    const result = formatMemoryContext(memories);
    expect(result).toBe("Memory context: fact one\nfact two");
  });

  test("trims whitespace from individual memory content", () => {
    const result = formatMemoryContext([makeMemory("  padded content  ")]);
    expect(result).toBe("Memory context: padded content");
  });

  test("filters out blank memories", () => {
    const memories = [makeMemory("real content"), makeMemory("   ")];
    const result = formatMemoryContext(memories);
    expect(result).toBe("Memory context: real content");
  });
});

describe("providerSupportsSystemMessage", () => {
  test("returns true for null/undefined provider", () => {
    expect(providerSupportsSystemMessage(null)).toBe(true);
    expect(providerSupportsSystemMessage(undefined)).toBe(true);
  });

  test("returns true for standard providers", () => {
    expect(providerSupportsSystemMessage("openai")).toBe(true);
    expect(providerSupportsSystemMessage("anthropic")).toBe(true);
    expect(providerSupportsSystemMessage("deepseek")).toBe(true);
    expect(providerSupportsSystemMessage("google")).toBe(true);
  });

  test("returns false for o1 family providers", () => {
    expect(providerSupportsSystemMessage("o1")).toBe(false);
    expect(providerSupportsSystemMessage("o1-mini")).toBe(false);
    expect(providerSupportsSystemMessage("o1-preview")).toBe(false);
  });

  test("comparison is case-insensitive", () => {
    expect(providerSupportsSystemMessage("O1")).toBe(false);
    expect(providerSupportsSystemMessage("O1-MINI")).toBe(false);
  });
});

describe("injectMemory — system message injection", () => {
  test("injects memory as system message when provider supports it", () => {
    const request = makeRequest();
    const memories = [makeMemory("User prefers concise answers")];
    const result = injectMemory(request, memories, "openai");

    expect(result.messages[0].role).toBe("system");
    expect(result.messages[0].content).toBe("Memory context: User prefers concise answers");
    expect(result.messages[1]).toEqual({ role: "user", content: "Hello" });
  });

  test("preserves existing messages after injected system message", () => {
    const request = makeRequest({
      messages: [
        { role: "system", content: "You are helpful" },
        { role: "user", content: "Hello" },
      ],
    });
    const memories = [makeMemory("User is an expert developer")];
    const result = injectMemory(request, memories, "anthropic");

    expect(result.messages).toHaveLength(3);
    expect(result.messages[0].role).toBe("system");
    expect(result.messages[0].content).toContain("Memory context:");
    expect(result.messages[1]).toEqual({ role: "system", content: "You are helpful" });
    expect(result.messages[2]).toEqual({ role: "user", content: "Hello" });
  });

  test("does not mutate the original request", () => {
    const request = makeRequest();
    const originalMessages = [...request.messages];
    const memories = [makeMemory("Some fact")];
    injectMemory(request, memories, "openai");

    expect(request.messages).toEqual(originalMessages);
  });

  test("preserves all other request fields", () => {
    const request = makeRequest({ temperature: 0.7, max_tokens: 256, stream: true });
    const memories = [makeMemory("fact")];
    const result = injectMemory(request, memories, "openai");

    expect(result.temperature).toBe(0.7);
    expect(result.max_tokens).toBe(256);
    expect(result.stream).toBe(true);
    expect(result.model).toBe("gpt-4");
  });
});

describe("injectMemory — message prefix fallback", () => {
  test("injects memory as first user message for o1 provider", () => {
    const request = makeRequest();
    const memories = [makeMemory("User context detail")];
    const result = injectMemory(request, memories, "o1");

    expect(result.messages[0].role).toBe("user");
    expect(result.messages[0].content).toBe("Memory context: User context detail");
    expect(result.messages[1]).toEqual({ role: "user", content: "Hello" });
  });

  test("injects memory as first user message for o1-mini", () => {
    const request = makeRequest();
    const memories = [makeMemory("Preference")];
    const result = injectMemory(request, memories, "o1-mini");

    expect(result.messages[0].role).toBe("user");
    expect(result.messages[0].content).toContain("Memory context:");
  });
});

describe("injectMemory — edge cases", () => {
  test("returns original request when memories array is empty", () => {
    const request = makeRequest();
    const result = injectMemory(request, [], "openai");
    expect(result).toBe(request);
  });

  test("returns original request when memories is null-ish", () => {
    const request = makeRequest();
    const result = injectMemory(request, null as unknown as Memory[], "openai");
    expect(result).toBe(request);
  });

  test("handles request with empty messages array", () => {
    const request = makeRequest({ messages: [] });
    const memories = [makeMemory("fact")];
    const result = injectMemory(request, memories, "openai");

    expect(result.messages).toHaveLength(1);
    expect(result.messages[0].role).toBe("system");
  });

  test("handles multiple memories combined into single injection", () => {
    const request = makeRequest();
    const memories = [makeMemory("fact A"), makeMemory("fact B"), makeMemory("fact C")];
    const result = injectMemory(request, memories, "openai");

    expect(result.messages[0].role).toBe("system");
    expect(result.messages[0].content).toBe("Memory context: fact A\nfact B\nfact C");
    expect(result.messages).toHaveLength(2);
  });
});

describe("shouldInjectMemory", () => {
  test("returns true when messages are present and enabled not set", () => {
    const request = makeRequest();
    expect(shouldInjectMemory(request)).toBe(true);
  });

  test("returns false when config.enabled is false", () => {
    const request = makeRequest();
    expect(shouldInjectMemory(request, { enabled: false })).toBe(false);
  });

  test("returns false when messages array is empty", () => {
    const request = makeRequest({ messages: [] });
    expect(shouldInjectMemory(request)).toBe(false);
  });
});
