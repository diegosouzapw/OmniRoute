import { appendFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";
import { resolveDataDir } from "../data-dir.mjs";

function resolveHistoryPath() {
  return join(resolveDataDir(), "cli-history.jsonl");
}

export function registerChat(program) {
  program
    .command("chat [prompt]")
    .description(t("chat.description"))
    .option("--file <path>", t("chat.file"))
    .option("--stdin", t("chat.stdin"))
    .option("-s, --system <prompt>", t("chat.system"))
    .option("-m, --model <id>", t("chat.model"), "auto")
    .option("--max-tokens <n>", t("chat.max_tokens"), parseInt)
    .option("--temperature <t>", t("chat.temperature"), parseFloat)
    .option("--top-p <p>", t("chat.top_p"), parseFloat)
    .option("--reasoning-effort <level>", t("chat.reasoning_effort"))
    .option("--thinking-budget <tokens>", t("chat.thinking_budget"), parseInt)
    .option("--combo <name>", t("chat.combo"))
    .option("--responses-api", t("chat.responses_api"))
    .option("--stream", t("chat.stream"))
    .option("--no-history", t("chat.no_history"))
    .action(runChatCommand);
}

export async function runChatCommand(promptArg, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const prompt = await resolvePrompt(promptArg, opts);
  if (!prompt) {
    process.stderr.write(t("chat.error.empty_prompt") + "\n");
    process.exit(2);
  }

  const messages = [];
  if (opts.system) messages.push({ role: "system", content: opts.system });
  messages.push({ role: "user", content: prompt });

  const body = {
    model: opts.model,
    messages,
    ...(opts.maxTokens && { max_tokens: opts.maxTokens }),
    ...(opts.temperature != null && { temperature: opts.temperature }),
    ...(opts.topP != null && { top_p: opts.topP }),
    ...(opts.reasoningEffort && { reasoning_effort: opts.reasoningEffort }),
    ...(opts.thinkingBudget && { thinking: { budget_tokens: opts.thinkingBudget } }),
    ...(opts.combo && { combo: opts.combo }),
    stream: !!opts.stream,
  };

  const endpoint = opts.responsesApi ? "/v1/responses" : "/v1/chat/completions";

  const startedAt = Date.now();
  const response = await apiFetch(endpoint, {
    method: "POST",
    body,
    acceptNotOk: true,
    timeout: globalOpts.timeout,
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    process.stderr.write(`\x1b[31m✖ ${response.status} ${response.statusText}\x1b[0m\n`);
    if (errText) process.stderr.write(errText + "\n");
    process.exit(1);
  }

  const latencyMs = Date.now() - startedAt;

  if (opts.stream) {
    return streamHandle(response, opts.responsesApi);
  }

  const data = await response.json();
  const text = extractText(data, opts.responsesApi);

  if (!opts.noHistory) {
    appendHistory({ prompt, model: opts.model, latencyMs, usage: data.usage, response: text });
  }

  if (globalOpts.output === "json") {
    emit(data, globalOpts);
  } else if (globalOpts.output === "markdown") {
    console.log(
      `# Response\n\n${text}\n\n## Metadata\n- Model: ${data.model}\n- Latency: ${latencyMs}ms\n- Usage: ${JSON.stringify(data.usage)}\n`
    );
  } else {
    console.log(text);
    if (!globalOpts.quiet) {
      process.stderr.write(
        `\n[${data.model} · ${latencyMs}ms · ${data.usage?.total_tokens ?? "?"} tok]\n`
      );
    }
  }
}

async function resolvePrompt(arg, opts) {
  if (opts.file) return readFileSync(opts.file, "utf8").trim();
  if (opts.stdin) return readStdin();
  return arg?.trim() || "";
}

function readStdin() {
  return new Promise((resolve) => {
    let buf = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => (buf += c));
    process.stdin.on("end", () => resolve(buf.trim()));
  });
}

function extractText(data, isResponses) {
  if (isResponses) {
    return data.output?.[0]?.content?.[0]?.text ?? data.output_text ?? "";
  }
  return data.choices?.[0]?.message?.content ?? "";
}

async function streamHandle(response, isResponses) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const chunk = line.slice(6).trim();
      if (chunk === "[DONE]") {
        process.stdout.write("\n");
        return;
      }
      try {
        const obj = JSON.parse(chunk);
        const content = isResponses ? obj.delta?.content : obj.choices?.[0]?.delta?.content;
        if (content) process.stdout.write(content);
      } catch {}
    }
  }
  process.stdout.write("\n");
}

function appendHistory(entry) {
  try {
    appendFileSync(
      resolveHistoryPath(),
      JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n"
    );
  } catch {
    // history write failures are non-fatal
  }
}
