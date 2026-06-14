"use client";

// src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useToolsBuilder } from "../../hooks/useToolsBuilder";
import { useStructuredOutput } from "../../hooks/useStructuredOutput";
import MarkdownMessage from "../MarkdownMessage";
import BuildWizard from "./build/BuildWizard";
import type { ConfigState } from "../StudioConfigPane";

interface BuildTabProps {
  configState: ConfigState;
}

interface ToolCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

interface Message {
  role: "user" | "assistant" | "tool";
  content: string;
  toolCallId?: string;
}

interface ToolResultDraft {
  toolCallId: string;
  functionName: string;
  draft: string;
}

/**
 * BuildTab — tools / function calling UI + structured output (D9).
 *
 * Runs /v1/chat/completions with:
 * - tools[] if any are defined
 * - response_format: json_schema if structured output is enabled
 *
 * When tool_calls appear in the response, shows each tool call with an input
 * for the tool_result + "Send result" button to continue the conversation.
 */
export default function BuildTab({ configState }: BuildTabProps) {
  const t = useTranslations("playground");
  const toolsBuilder = useToolsBuilder();
  const structuredOutput = useStructuredOutput();

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [running, setRunning] = useState(false);
  const [toolCalls, setToolCalls] = useState<ToolCall[]>([]);
  const [toolResultDrafts, setToolResultDrafts] = useState<ToolResultDraft[]>([]);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    error?: string;
  } | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  function buildRequestBody(msgs: Message[]) {
    const body: Record<string, unknown> = {
      model: configState.model,
      stream: false,
      messages: [
        ...(configState.systemPrompt
          ? [{ role: "system", content: configState.systemPrompt }]
          : []),
        ...msgs.map((m) => {
          if (m.role === "tool") {
            return {
              role: "tool",
              content: m.content,
              tool_call_id: m.toolCallId ?? "",
            };
          }
          return { role: m.role, content: m.content };
        }),
      ],
    };

    // Attach tools if any defined
    if (toolsBuilder.tools.length > 0) {
      body["tools"] = toolsBuilder.tools;
    }

    // Attach response_format if JSON mode enabled and schema set
    if (structuredOutput.enabled && structuredOutput.schema != null) {
      body["response_format"] = {
        type: "json_schema",
        json_schema: structuredOutput.schema,
      };
    }

    const { params } = configState;
    if (params.temperature != null) body["temperature"] = params.temperature;
    if (params.max_tokens != null) body["max_tokens"] = params.max_tokens;
    if (params.top_p != null) body["top_p"] = params.top_p;
    if (params.presence_penalty != null) body["presence_penalty"] = params.presence_penalty;
    if (params.frequency_penalty != null) body["frequency_penalty"] = params.frequency_penalty;
    if (params.seed != null) body["seed"] = params.seed;
    if (params.stop != null) body["stop"] = params.stop;

    return body;
  }

  async function runRequest(msgs: Message[]) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setRunning(true);
    setToolCalls([]);
    setToolResultDrafts([]);
    setValidationResult(null);

    try {
      const res = await fetch(`${configState.baseUrl}/v1/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildRequestBody(msgs)),
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "Unknown error");
        const errMsg = text.slice(0, 300);
        setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${errMsg}` }]);
        return;
      }

      const data = (await res.json()) as {
        choices?: Array<{
          message?: {
            content?: string | null;
            tool_calls?: ToolCall[];
          };
        }>;
      };

      const choice = data.choices?.[0];
      const assistantMsg = choice?.message;

      if (assistantMsg == null) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "(empty response)" },
        ]);
        return;
      }

      if (assistantMsg.tool_calls && assistantMsg.tool_calls.length > 0) {
        // Tool call response — show tool call UI
        setToolCalls(assistantMsg.tool_calls);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: assistantMsg.content ?? "(tool call)",
          },
        ]);
        // Initialize drafts
        setToolResultDrafts(
          assistantMsg.tool_calls.map((tc) => ({
            toolCallId: tc.id,
            functionName: tc.function.name,
            draft: "",
          })),
        );
      } else {
        const content = assistantMsg.content ?? "";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content },
        ]);

        // Validate structured output response if enabled
        if (structuredOutput.enabled && structuredOutput.schema != null) {
          const validation = structuredOutput.validateResponse(content);
          setValidationResult(validation);
        }
      }
    } catch (err) {
      if (controller.signal.aborted) return;
      const msg = err instanceof Error ? err.message : String(err);
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${msg}` }]);
    } finally {
      setRunning(false);
    }
  }

  async function handleRun() {
    if (!prompt.trim() && messages.length === 0) return;

    const newMessages: Message[] = [
      ...messages,
      ...(prompt.trim() ? [{ role: "user" as const, content: prompt }] : []),
    ];

    if (prompt.trim()) {
      setMessages(newMessages);
      setPrompt("");
    }

    await runRequest(newMessages);
  }

  async function sendToolResult(toolCallId: string) {
    const draft = toolResultDrafts.find((d) => d.toolCallId === toolCallId);
    if (draft == null) return;

    const toolResultMsg: Message = {
      role: "tool",
      content: draft.draft,
      toolCallId,
    };

    const newMessages = [...messages, toolResultMsg];
    setMessages(newMessages);
    setToolResultDrafts([]);
    setToolCalls([]);

    await runRequest(newMessages);
  }

  // Result area: conversation history + tool-call UI + validation badge
  const resultArea = (
    <div className="space-y-3">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
              msg.role === "user"
                ? "bg-primary text-white"
                : msg.role === "tool"
                  ? "bg-yellow-500/10 border border-yellow-500/30 text-text-main"
                  : "bg-bg-alt border border-border text-text-main"
            }`}
          >
            {msg.role === "user" ? (
              <span className="whitespace-pre-wrap">{msg.content}</span>
            ) : (
              <MarkdownMessage content={msg.content} />
            )}
          </div>
        </div>
      ))}

      {/* Tool call UI */}
      {toolCalls.length > 0 && (
        <div className="space-y-2">
          {toolCalls.map((tc) => {
            const draft = toolResultDrafts.find((d) => d.toolCallId === tc.id);
            return (
              <div
                key={tc.id}
                className="border border-amber-500/40 rounded-lg p-3 bg-amber-500/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-500">
                    function
                  </span>
                  <code className="text-xs font-mono text-text-main">
                    {tc.function.name}
                  </code>
                </div>
                <pre className="text-[11px] font-mono text-text-muted bg-bg-alt rounded p-2 overflow-x-auto mb-2 whitespace-pre-wrap break-all">
                  {tc.function.arguments}
                </pre>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-text-muted uppercase tracking-wider">
                    Tool result
                  </label>
                  <textarea
                    value={draft?.draft ?? ""}
                    onChange={(e) =>
                      setToolResultDrafts((prev) =>
                        prev.map((d) =>
                          d.toolCallId === tc.id ? { ...d, draft: e.target.value } : d,
                        ),
                      )
                    }
                    rows={3}
                    placeholder={t("enterToolResult")}
                    className="text-xs font-mono bg-bg-alt border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main resize-y"
                  />
                  <button
                    onClick={() => void sendToolResult(tc.id)}
                    className="text-xs px-2.5 py-1 rounded bg-primary text-white hover:bg-primary/90 transition-colors self-start"
                  >
                    Send tool result
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Structured output validation */}
      {validationResult != null && (
        <div
          className={`text-xs rounded-lg px-3 py-2 border ${
            validationResult.valid
              ? "border-green-500/40 bg-green-500/5 text-green-600 dark:text-green-400"
              : "border-destructive/40 bg-destructive/5 text-destructive"
          }`}
        >
          {validationResult.valid ? "✅ Valid JSON schema response" : `❌ ${validationResult.error}`}
        </div>
      )}
    </div>
  );

  return (
    <BuildWizard
      toolsBuilder={toolsBuilder}
      structuredOutput={structuredOutput}
      running={running}
      onRun={() => void handleRun()}
      prompt={prompt}
      setPrompt={setPrompt}
      result={resultArea}
    />
  );
}
