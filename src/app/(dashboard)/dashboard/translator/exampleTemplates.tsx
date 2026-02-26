/**
 * Example templates for the Translator Playground.
 * Each template provides request bodies in multiple formats so users can
 * quickly load a realistic payload and see how the translator converts it.
 */

type TranslatorMessage = (key: string) => string;

export function getExampleTemplates(t: TranslatorMessage) {
  const simpleChatSystem = t("templatePayloads.simpleChat.system");
  const simpleChatUser = t("templatePayloads.simpleChat.userGreeting");
  const toolUserWeather = t("templatePayloads.toolCalling.userWeather");
  const toolDescription = t("templatePayloads.toolCalling.toolDescription");
  const cityNameDescription = t("templatePayloads.toolCalling.cityNameDescription");
  const multiTurnSystem = t("templatePayloads.multiTurn.system");
  const multiTurnUserInitial = t("templatePayloads.multiTurn.userInitial");
  const multiTurnAssistantExample = t("templatePayloads.multiTurn.assistantExample");
  const multiTurnUserFollowUp = t("templatePayloads.multiTurn.userFollowUp");
  const thinkingQuestion = t("templatePayloads.thinking.question");
  const systemPromptInstruction = t("templatePayloads.systemPrompt.systemInstruction");
  const systemPromptQuestion = t("templatePayloads.systemPrompt.question");
  const streamingPrompt = t("templatePayloads.streaming.prompt");

  return [
    {
      id: "simple-chat",
      name: t("templateNames.simple-chat"),
      icon: "chat",
      description: t("templateDescriptions.simple-chat"),
      formats: {
        openai: {
          model: "gpt-4o",
          messages: [
            { role: "system", content: simpleChatSystem },
            { role: "user", content: simpleChatUser },
          ],
          stream: true,
        },
        claude: {
          model: "claude-sonnet-4-20250514",
          system: simpleChatSystem,
          max_tokens: 1024,
          messages: [{ role: "user", content: simpleChatUser }],
          stream: true,
        },
        gemini: {
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: simpleChatUser }],
            },
          ],
          systemInstruction: {
            parts: [{ text: simpleChatSystem }],
          },
        },
        "openai-responses": {
          model: "gpt-4o",
          input: simpleChatUser,
          instructions: simpleChatSystem,
        },
      },
    },
    {
      id: "tool-calling",
      name: t("templateNames.tool-calling"),
      icon: "build",
      description: t("templateDescriptions.tool-calling"),
      formats: {
        openai: {
          model: "gpt-4o",
          messages: [{ role: "user", content: toolUserWeather }],
          tools: [
            {
              type: "function",
              function: {
                name: "get_weather",
                description: toolDescription,
                parameters: {
                  type: "object",
                  properties: {
                    location: { type: "string", description: cityNameDescription },
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
          messages: [{ role: "user", content: toolUserWeather }],
          tools: [
            {
              name: "get_weather",
              description: toolDescription,
              input_schema: {
                type: "object",
                properties: {
                  location: { type: "string", description: cityNameDescription },
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
              parts: [{ text: toolUserWeather }],
            },
          ],
          tools: [
            {
              functionDeclarations: [
                {
                  name: "get_weather",
                  description: toolDescription,
                  parameters: {
                    type: "object",
                    properties: {
                      location: { type: "string", description: cityNameDescription },
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
      name: t("templateNames.multi-turn"),
      icon: "forum",
      description: t("templateDescriptions.multi-turn"),
      formats: {
        openai: {
          model: "gpt-4o",
          messages: [
            { role: "system", content: multiTurnSystem },
            { role: "user", content: multiTurnUserInitial },
            {
              role: "assistant",
              content: multiTurnAssistantExample,
            },
            { role: "user", content: multiTurnUserFollowUp },
          ],
          stream: true,
        },
        claude: {
          model: "claude-sonnet-4-20250514",
          system: multiTurnSystem,
          max_tokens: 1024,
          messages: [
            { role: "user", content: multiTurnUserInitial },
            {
              role: "assistant",
              content: multiTurnAssistantExample,
            },
            { role: "user", content: multiTurnUserFollowUp },
          ],
          stream: true,
        },
        gemini: {
          model: "gemini-2.5-flash",
          contents: [
            { role: "user", parts: [{ text: multiTurnUserInitial }] },
            {
              role: "model",
              parts: [
                {
                  text: multiTurnAssistantExample,
                },
              ],
            },
            { role: "user", parts: [{ text: multiTurnUserFollowUp }] },
          ],
          systemInstruction: {
            parts: [{ text: multiTurnSystem }],
          },
        },
      },
    },
    {
      id: "thinking",
      name: t("templateNames.thinking"),
      icon: "psychology",
      description: t("templateDescriptions.thinking"),
      formats: {
        openai: {
          model: "o3-mini",
          messages: [{ role: "user", content: thinkingQuestion }],
          stream: true,
        },
        claude: {
          model: "claude-sonnet-4-20250514",
          max_tokens: 16000,
          thinking: {
            type: "enabled",
            budget_tokens: 10000,
          },
          messages: [{ role: "user", content: thinkingQuestion }],
          stream: true,
        },
        gemini: {
          model: "gemini-2.5-flash-thinking",
          contents: [{ role: "user", parts: [{ text: thinkingQuestion }] }],
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
      name: t("templateNames.system-prompt"),
      icon: "settings",
      description: t("templateDescriptions.system-prompt"),
      formats: {
        openai: {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: systemPromptInstruction,
            },
            { role: "user", content: systemPromptQuestion },
          ],
          temperature: 0.7,
          stream: true,
        },
        claude: {
          model: "claude-sonnet-4-20250514",
          system: systemPromptInstruction,
          max_tokens: 2048,
          messages: [{ role: "user", content: systemPromptQuestion }],
          temperature: 0.7,
          stream: true,
        },
        gemini: {
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text: systemPromptQuestion }] }],
          systemInstruction: {
            parts: [{ text: systemPromptInstruction }],
          },
          generationConfig: {
            temperature: 0.7,
          },
        },
      },
    },
    {
      id: "streaming",
      name: t("templateNames.streaming"),
      icon: "stream",
      description: t("templateDescriptions.streaming"),
      formats: {
        openai: {
          model: "gpt-4o",
          messages: [{ role: "user", content: streamingPrompt }],
          stream: true,
          stream_options: { include_usage: true },
        },
        claude: {
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          messages: [{ role: "user", content: streamingPrompt }],
          stream: true,
        },
        gemini: {
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: streamingPrompt }],
            },
          ],
        },
      },
    },
  ];
}

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
