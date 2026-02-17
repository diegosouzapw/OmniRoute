/**
 * Example templates for the Translator Playground.
 * Each template provides request bodies in multiple formats so users can
 * quickly load a realistic payload and see how the translator converts it.
 */

export const EXAMPLE_TEMPLATES = [
  {
    id: "simple-chat",
    name: "Simple Chat",
    icon: "chat",
    description: "Basic text message",
    formats: {
      openai: {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Hello! How are you today?" },
        ],
        stream: true,
      },
      claude: {
        model: "claude-sonnet-4-20250514",
        system: "You are a helpful assistant.",
        max_tokens: 1024,
        messages: [{ role: "user", content: "Hello! How are you today?" }],
        stream: true,
      },
      gemini: {
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: "Hello! How are you today?" }],
          },
        ],
        systemInstruction: {
          parts: [{ text: "You are a helpful assistant." }],
        },
      },
      "openai-responses": {
        model: "gpt-4o",
        input: "Hello! How are you today?",
        instructions: "You are a helpful assistant.",
      },
    },
  },
  {
    id: "tool-calling",
    name: "Tool Calling",
    icon: "build",
    description: "Function/tool invocation",
    formats: {
      openai: {
        model: "gpt-4o",
        messages: [{ role: "user", content: "What's the weather in São Paulo?" }],
        tools: [
          {
            type: "function",
            function: {
              name: "get_weather",
              description: "Get current weather for a location",
              parameters: {
                type: "object",
                properties: {
                  location: { type: "string", description: "City name" },
                  unit: { type: "string", enum: ["celsius", "fahrenheit"] },
                },
                required: ["location"],
              },
            },
          },
        ],
        stream: true,
      },
      claude: {
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: "What's the weather in São Paulo?" }],
        tools: [
          {
            name: "get_weather",
            description: "Get current weather for a location",
            input_schema: {
              type: "object",
              properties: {
                location: { type: "string", description: "City name" },
                unit: { type: "string", enum: ["celsius", "fahrenheit"] },
              },
              required: ["location"],
            },
          },
        ],
        stream: true,
      },
      gemini: {
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: "What's the weather in São Paulo?" }],
          },
        ],
        tools: [
          {
            functionDeclarations: [
              {
                name: "get_weather",
                description: "Get current weather for a location",
                parameters: {
                  type: "object",
                  properties: {
                    location: { type: "string", description: "City name" },
                    unit: { type: "string", enum: ["celsius", "fahrenheit"] },
                  },
                  required: ["location"],
                },
              },
            ],
          },
        ],
      },
    },
  },
  {
    id: "multi-turn",
    name: "Multi-turn",
    icon: "forum",
    description: "Conversation with history",
    formats: {
      openai: {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a coding assistant." },
          { role: "user", content: "Write a function to sort an array in Python." },
          {
            role: "assistant",
            content:
              "Here's a simple sort function:\n\n```python\ndef sort_array(arr):\n    return sorted(arr)\n```",
          },
          { role: "user", content: "Now make it sort in descending order." },
        ],
        stream: true,
      },
      claude: {
        model: "claude-sonnet-4-20250514",
        system: "You are a coding assistant.",
        max_tokens: 1024,
        messages: [
          { role: "user", content: "Write a function to sort an array in Python." },
          {
            role: "assistant",
            content:
              "Here's a simple sort function:\n\n```python\ndef sort_array(arr):\n    return sorted(arr)\n```",
          },
          { role: "user", content: "Now make it sort in descending order." },
        ],
        stream: true,
      },
      gemini: {
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: "Write a function to sort an array in Python." }] },
          {
            role: "model",
            parts: [
              {
                text: "Here's a simple sort function:\n\n```python\ndef sort_array(arr):\n    return sorted(arr)\n```",
              },
            ],
          },
          { role: "user", parts: [{ text: "Now make it sort in descending order." }] },
        ],
        systemInstruction: {
          parts: [{ text: "You are a coding assistant." }],
        },
      },
    },
  },
  {
    id: "thinking",
    name: "Thinking",
    icon: "psychology",
    description: "Extended thinking / reasoning",
    formats: {
      openai: {
        model: "o3-mini",
        messages: [{ role: "user", content: "What is the sum of the first 100 prime numbers?" }],
        stream: true,
      },
      claude: {
        model: "claude-sonnet-4-20250514",
        max_tokens: 16000,
        thinking: {
          type: "enabled",
          budget_tokens: 10000,
        },
        messages: [{ role: "user", content: "What is the sum of the first 100 prime numbers?" }],
        stream: true,
      },
      gemini: {
        model: "gemini-2.5-flash-thinking",
        contents: [
          { role: "user", parts: [{ text: "What is the sum of the first 100 prime numbers?" }] },
        ],
        generationConfig: {
          thinkingConfig: {
            thinkingBudget: 10000,
          },
        },
      },
    },
  },
  {
    id: "system-prompt",
    name: "System Prompt",
    icon: "settings",
    description: "Complex system instructions",
    formats: {
      openai: {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a senior software engineer specializing in distributed systems. Answer questions concisely using industry best practices. Always provide code examples when relevant. Format your responses using markdown.",
          },
          { role: "user", content: "How do I implement a circuit breaker pattern?" },
        ],
        temperature: 0.7,
        stream: true,
      },
      claude: {
        model: "claude-sonnet-4-20250514",
        system:
          "You are a senior software engineer specializing in distributed systems. Answer questions concisely using industry best practices. Always provide code examples when relevant. Format your responses using markdown.",
        max_tokens: 2048,
        messages: [{ role: "user", content: "How do I implement a circuit breaker pattern?" }],
        temperature: 0.7,
        stream: true,
      },
      gemini: {
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: "How do I implement a circuit breaker pattern?" }] },
        ],
        systemInstruction: {
          parts: [
            {
              text: "You are a senior software engineer specializing in distributed systems. Answer questions concisely using industry best practices. Always provide code examples when relevant. Format your responses using markdown.",
            },
          ],
        },
        generationConfig: {
          temperature: 0.7,
        },
      },
    },
  },
  {
    id: "streaming",
    name: "Streaming",
    icon: "stream",
    description: "SSE streaming request",
    formats: {
      openai: {
        model: "gpt-4o",
        messages: [
          { role: "user", content: "Tell me a short story about a robot learning to paint." },
        ],
        stream: true,
        stream_options: { include_usage: true },
      },
      claude: {
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
          { role: "user", content: "Tell me a short story about a robot learning to paint." },
        ],
        stream: true,
      },
      gemini: {
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: "Tell me a short story about a robot learning to paint." }],
          },
        ],
      },
    },
  },
];

/**
 * Format metadata for display: colors, labels, icons
 */
export const FORMAT_META = {
  openai: { label: "OpenAI", color: "emerald", icon: "smart_toy" },
  "openai-responses": { label: "OpenAI Responses", color: "amber", icon: "swap_horiz" },
  claude: { label: "Claude", color: "orange", icon: "psychology" },
  gemini: { label: "Gemini", color: "blue", icon: "auto_awesome" },
  antigravity: { label: "Antigravity", color: "purple", icon: "rocket_launch" },
  kiro: { label: "Kiro", color: "cyan", icon: "terminal" },
  cursor: { label: "Cursor", color: "pink", icon: "edit" },
  codex: { label: "Codex", color: "yellow", icon: "code" },
};

/**
 * All format options for dropdowns
 */
export const FORMAT_OPTIONS = Object.entries(FORMAT_META).map(([value, meta]) => ({
  value,
  label: meta.label,
}));
