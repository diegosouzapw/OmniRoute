import type {
  BuilderStrategy,
  EvalCaseDraft,
  EvalSuiteDraft,
  EvalSuite,
  ImportedEvalSuiteFile,
} from "./types";

export function createDraftId() {
  return `draft-${Math.random().toString(36).slice(2, 10)}`;
}

export function createEmptyCaseDraft(): EvalCaseDraft {
  return {
    id: createDraftId(),
    name: "",
    model: "",
    systemPrompt: "",
    userPrompt: "",
    strategy: "contains",
    expectedValue: "",
    tags: "",
  };
}

export function createEmptySuiteDraft(): EvalSuiteDraft {
  return {
    name: "",
    description: "",
    cases: [createEmptyCaseDraft()],
  };
}

export function normalizeBuilderStrategy(value: unknown): BuilderStrategy {
  return value === "exact" || value === "regex" ? value : "contains";
}

export function joinPromptMessages(
  messages: Array<{ role: string; content: string }> | undefined,
  role: string
): string {
  return (messages || [])
    .filter((message) => message.role === role && typeof message.content === "string")
    .map((message) => message.content)
    .join("\n\n");
}

export function suiteToDraft(suite: EvalSuite): EvalSuiteDraft {
  return {
    id: suite.id,
    name: suite.name || "",
    description: suite.description || "",
    cases:
      suite.cases && suite.cases.length > 0
        ? suite.cases.map((evalCase) => ({
            id: evalCase.id || createDraftId(),
            name: evalCase.name || "",
            model: evalCase.model || "",
            systemPrompt: joinPromptMessages(evalCase.input?.messages, "system"),
            userPrompt:
              joinPromptMessages(evalCase.input?.messages, "user") ||
              (evalCase.input?.messages || [])
                .filter((message) => message.role !== "system")
                .map((message) => message.content)
                .join("\n\n"),
            strategy: normalizeBuilderStrategy(evalCase.expected?.strategy),
            expectedValue: evalCase.expected?.value || "",
            tags: (evalCase.tags || []).join(", "),
          }))
        : [createEmptyCaseDraft()],
  };
}

export function suiteToCloneDraft(
  suite: EvalSuite,
  t: (key: string, values?: Record<string, unknown>) => string
): EvalSuiteDraft {
  const draft = suiteToDraft(suite);
  return {
    name: `${draft.name || suite.id} ${t("suiteBuilderCloneSuffix")}`.trim(),
    description: draft.description,
    cases: draft.cases.map((evalCase) => ({
      ...evalCase,
      id: createDraftId(),
      name: evalCase.name ? `${evalCase.name} ${t("suiteBuilderCloneSuffix")}`.trim() : "",
    })),
  };
}

export function createDraftFromImportedSuite(
  payload: ImportedEvalSuiteFile,
  fallbackName: string
): EvalSuiteDraft {
  const cases = Array.isArray(payload.cases) ? payload.cases : [];

  return {
    name:
      typeof payload.name === "string" && payload.name.trim().length > 0
        ? payload.name.trim()
        : fallbackName,
    description: typeof payload.description === "string" ? payload.description : "",
    cases:
      cases.length > 0
        ? cases.map((evalCase, index) => {
            const importedMessages = evalCase.input?.messages;
            const messages = Array.isArray(importedMessages)
              ? importedMessages
                  .map((message) => ({
                    role: typeof message.role === "string" ? message.role : "",
                    content: typeof message.content === "string" ? message.content : "",
                  }))
                  .filter((message) => message.role && message.content.trim())
              : [];

            return {
              id: createDraftId(),
              name:
                typeof evalCase.name === "string" && evalCase.name.trim().length > 0
                  ? evalCase.name.trim()
                  : `Case ${index + 1}`,
              model: typeof evalCase.model === "string" ? evalCase.model : "",
              systemPrompt: joinPromptMessages(messages, "system"),
              userPrompt:
                joinPromptMessages(messages, "user") ||
                messages
                  .filter((message) => message.role !== "system")
                  .map((message) => message.content)
                  .join("\n\n"),
              strategy: normalizeBuilderStrategy(evalCase.expected?.strategy),
              expectedValue:
                typeof evalCase.expected?.value === "string" ? evalCase.expected.value : "",
              tags: Array.isArray(evalCase.tags) ? evalCase.tags.join(", ") : "",
            };
          })
        : [createEmptyCaseDraft()],
  };
}
