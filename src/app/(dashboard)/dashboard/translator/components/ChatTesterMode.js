"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, Select, Badge } from "@/shared/components";
import { FORMAT_META, FORMAT_OPTIONS } from "../exampleTemplates";
import {
  AI_PROVIDERS,
  OPENAI_COMPATIBLE_PREFIX,
  ANTHROPIC_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

/**
 * Chat Tester Mode:
 * - Left: Chat interface (send messages as a specific client format)
 * - Right: Pipeline visualization showing each translation step
 */
export default function ChatTesterMode() {
  const [provider, setProvider] = useState("openai");
  const [providerOptions, setProviderOptions] = useState([]);
  const [clientFormat, setClientFormat] = useState("openai");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [pipeline, setPipeline] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const messagesEndRef = useRef(null);

  // Load providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const [connRes, nodesRes] = await Promise.all([
          fetch("/api/providers"),
          fetch("/api/provider-nodes"),
        ]);
        const [connData, nodesData] = await Promise.all([connRes.json(), nodesRes.json()]);
        const nodeMap = new Map((nodesData.nodes || []).map((n) => [n.id, n]));
        const activeProviders = new Set(
          (connData.connections || []).filter((c) => c.isActive !== false).map((c) => c.provider)
        );
        const options = [...activeProviders]
          .map((pid) => {
            const info = AI_PROVIDERS[pid];
            const node = nodeMap.get(pid);
            let label = info?.name || node?.name || pid;
            if (!info && pid.startsWith(OPENAI_COMPATIBLE_PREFIX))
              label = node?.name || "OpenAI Compatible";
            if (!info && pid.startsWith(ANTHROPIC_COMPATIBLE_PREFIX))
              label = node?.name || "Anthropic Compatible";
            return { value: pid, label };
          })
          .sort((a, b) => a.label.localeCompare(b.label));

        const nextOptions =
          options.length > 0
            ? options
            : Object.entries(AI_PROVIDERS).map(([id, info]) => ({ value: id, label: info.name }));
        setProviderOptions(nextOptions);
        if (nextOptions.length > 0) {
          setProvider((current) =>
            nextOptions.some((opt) => opt.value === current) ? current : nextOptions[0].value
          );
        }
      } catch {
        const fallbackOptions = Object.entries(AI_PROVIDERS).map(([id, info]) => ({
          value: id,
          label: info.name,
        }));
        setProviderOptions(fallbackOptions);
        if (fallbackOptions.length > 0) {
          setProvider((current) =>
            fallbackOptions.some((opt) => opt.value === current)
              ? current
              : fallbackOptions[0].value
          );
        }
      }
    };
    fetchProviders();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!message.trim() || sending) return;

    const userMessage = message.trim();
    setMessage("");
    setSending(true);
    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }]);

    const steps = [];

    try {
      // Build the messages array
      const allMessages = [
        ...chatHistory.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: userMessage },
      ];

      // Step 1: Build client request in the chosen format
      let clientRequest;
      if (clientFormat === "claude") {
        clientRequest = {
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          messages: allMessages,
          stream: true,
        };
      } else if (clientFormat === "gemini") {
        clientRequest = {
          model: "gemini-2.5-flash",
          contents: allMessages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
        };
      } else if (clientFormat === "openai-responses") {
        clientRequest = {
          model: "gpt-4o",
          input: allMessages.map((m) => ({
            type: "message",
            role: m.role,
            content: [{ type: "input_text", text: m.content }],
          })),
          stream: true,
        };
      } else {
        clientRequest = {
          model: "gpt-4o",
          messages: allMessages,
          stream: true,
        };
      }

      steps.push({
        id: 1,
        name: "Client Request",
        format: clientFormat,
        content: JSON.stringify(clientRequest, null, 2),
        status: "done",
      });

      // Step 2: Detect source format
      const detectRes = await fetch("/api/translator/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: clientRequest }),
      });
      const detectData = await detectRes.json();
      const detectedFormat = detectData.format || clientFormat;

      steps.push({
        id: 2,
        name: "Format Detected",
        format: detectedFormat,
        content: JSON.stringify(
          { detectedFormat, clientFormat, match: detectedFormat === clientFormat },
          null,
          2
        ),
        status: "done",
      });

      // Step 3: Translate to OpenAI intermediate
      const toOpenaiRes = await fetch("/api/translator/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "direct",
          sourceFormat: detectedFormat,
          targetFormat: "openai",
          body: clientRequest,
        }),
      });
      const toOpenaiData = await toOpenaiRes.json();

      steps.push({
        id: 3,
        name: "OpenAI Intermediate",
        format: "openai",
        content: JSON.stringify(toOpenaiData.result || toOpenaiData, null, 2),
        status: toOpenaiData.success ? "done" : "error",
      });

      // Step 4: Translate to provider target format
      const providerTargetRes = await fetch("/api/translator/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "direct",
          sourceFormat: "openai",
          provider,
          body: toOpenaiData.result,
        }),
      });
      const providerTargetData = await providerTargetRes.json();
      const targetFmt = providerTargetData.targetFormat || "openai";

      steps.push({
        id: 4,
        name: "Provider Format",
        format: targetFmt,
        content: JSON.stringify(providerTargetData.result || providerTargetData, null, 2),
        status: providerTargetData.success ? "done" : "error",
      });

      // Step 5: Send to provider (use the OpenAI intermediate since the proxy handles translation)
      const sendRes = await fetch("/api/translator/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, body: providerTargetData.result || toOpenaiData.result }),
      });

      if (!sendRes.ok) {
        const errData = await sendRes.json().catch(() => ({ error: "Request failed" }));
        steps.push({
          id: 5,
          name: "Provider Response",
          format: targetFmt,
          content: JSON.stringify(errData, null, 2),
          status: "error",
        });
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${errData.error || "Request failed"}` },
        ]);
      } else {
        // Read streaming response
        const reader = sendRes.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullResponse += decoder.decode(value, { stream: true });
        }

        steps.push({
          id: 5,
          name: "Provider Response",
          format: targetFmt,
          content:
            fullResponse.slice(0, 5000) + (fullResponse.length > 5000 ? "\n... (truncated)" : ""),
          status: "done",
        });

        // Extract assistant text from SSE
        const assistantText = extractAssistantText(fullResponse);
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: assistantText || "(No text extracted)" },
        ]);
      }
    } catch (err) {
      steps.push({
        id: steps.length + 1,
        name: "Error",
        format: "error",
        content: JSON.stringify({ error: err.message }, null, 2),
        status: "error",
      });
      setChatHistory((prev) => [...prev, { role: "assistant", content: `Error: ${err.message}` }]);
    }

    setPipeline(steps);
    setExpandedStep(steps.length > 0 ? steps[steps.length - 1].id : null);
    setSending(false);
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left: Chat Interface */}
      <div className="space-y-4">
        {/* Controls */}
        <Card>
          <div className="p-4 flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
                Client Format
              </label>
              <Select
                value={clientFormat}
                onChange={(e) => setClientFormat(e.target.value)}
                options={FORMAT_OPTIONS.filter((o) =>
                  ["openai", "claude", "gemini", "openai-responses"].includes(o.value)
                )}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
                Provider
              </label>
              <Select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                options={providerOptions}
              />
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="min-h-[400px] flex flex-col">
          <div className="p-4 flex-1 overflow-y-auto max-h-[500px] space-y-3">
            {chatHistory.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-text-muted py-12">
                <span className="material-symbols-outlined text-[48px] mb-3 opacity-30">chat</span>
                <p className="text-sm">Send a message to see the translation pipeline</p>
              </div>
            )}
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary/10 text-text-main border border-primary/20"
                      : "bg-bg-subtle text-text-main border border-border"
                  }`}
                >
                  <p className="text-[10px] font-semibold text-text-muted mb-1 uppercase">
                    {msg.role === "user"
                      ? `You (${FORMAT_META[clientFormat]?.label})`
                      : "Assistant"}
                  </p>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-bg-subtle border border-border rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                disabled={sending}
              />
              <Button
                icon="send"
                onClick={handleSend}
                loading={sending}
                disabled={!message.trim() || sending}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Right: Pipeline Visualization */}
      <div className="space-y-4">
        <Card>
          <div className="p-4 space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">
                account_tree
              </span>
              <h3 className="text-sm font-semibold text-text-main">Translation Pipeline</h3>
            </div>
            <p className="text-xs text-text-muted">Click on any step to inspect the data</p>
          </div>
        </Card>

        {!pipeline ? (
          <Card>
            <div className="p-8 flex flex-col items-center justify-center text-text-muted">
              <span className="material-symbols-outlined text-[48px] mb-3 opacity-30">
                account_tree
              </span>
              <p className="text-sm">Send a message to see the pipeline</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-2">
            {pipeline.map((step, i) => {
              const meta = FORMAT_META[step.format] || {
                label: step.format,
                color: "gray",
                icon: "code",
              };
              const isExpanded = expandedStep === step.id;

              return (
                <div key={step.id}>
                  {/* Connector line */}
                  {i > 0 && (
                    <div className="flex justify-center py-1">
                      <div className="w-px h-4 bg-border" />
                    </div>
                  )}

                  <Card
                    className={
                      step.status === "error"
                        ? "border-red-500/30"
                        : isExpanded
                          ? "border-primary/30"
                          : ""
                    }
                  >
                    <button
                      onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                      className="w-full p-3 flex items-center gap-3 text-left"
                    >
                      {/* Step number */}
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                          step.status === "error"
                            ? "bg-red-500/10 text-red-500"
                            : step.status === "done"
                              ? `bg-${meta.color}-500/10 text-${meta.color}-500`
                              : "bg-bg-subtle text-text-muted"
                        }`}
                      >
                        {step.status === "error" ? "!" : step.id}
                      </div>

                      {/* Step info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-main">{step.name}</p>
                      </div>

                      {/* Format badge */}
                      <Badge variant={step.status === "error" ? "error" : "default"} size="sm">
                        {meta.label}
                      </Badge>

                      {/* Expand icon */}
                      <span className="material-symbols-outlined text-[18px] text-text-muted">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="px-3 pb-3">
                        <div className="border border-border rounded-lg overflow-hidden">
                          <Editor
                            height="250px"
                            defaultLanguage="json"
                            value={step.content}
                            theme="vs-dark"
                            options={{
                              minimap: { enabled: false },
                              fontSize: 11,
                              lineNumbers: "on",
                              scrollBeyondLastLine: false,
                              wordWrap: "on",
                              automaticLayout: true,
                              readOnly: true,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/** Extract assistant text from SSE stream */
function extractAssistantText(sseText) {
  let text = "";
  const lines = sseText.split("\n");
  for (const line of lines) {
    if (!line.startsWith("data: ")) continue;
    const payload = line.slice(6).trim();
    if (payload === "[DONE]") break;
    try {
      const parsed = JSON.parse(payload);
      // OpenAI format
      const delta = parsed.choices?.[0]?.delta;
      if (delta?.content) text += delta.content;
      // Claude format
      if (parsed.type === "content_block_delta" && parsed.delta?.text) {
        text += parsed.delta.text;
      }
    } catch {
      /* not JSON, skip */
    }
  }
  return text || sseText.slice(0, 500);
}
