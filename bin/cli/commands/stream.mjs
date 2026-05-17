import { appendFileSync, readFileSync } from "node:fs";
import { apiFetch } from "../api.mjs";
import { t } from "../i18n.mjs";

export function registerStream(program) {
  program
    .command("stream [prompt]")
    .description(t("stream.description"))
    .option("--file <path>", t("stream.file"))
    .option("--stdin", t("stream.stdin"))
    .option("-m, --model <id>", t("stream.model"), "auto")
    .option("-s, --system <prompt>", t("stream.system"))
    .option("--combo <name>", t("stream.combo"))
    .option("--max-tokens <n>", t("stream.max_tokens"), parseInt)
    .option("--responses-api", t("stream.responses_api"))
    .option("--raw", t("stream.raw"))
    .option("--debug", t("stream.debug"))
    .option("--save <path>", t("stream.save"))
    .action(runStreamCommand);
}

export async function runStreamCommand(promptArg, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const prompt = await resolvePrompt(promptArg, opts);

  if (!prompt) {
    process.stderr.write(t("stream.error.empty_prompt") + "\n");
    process.exit(2);
  }

  const messages = [];
  if (opts.system) messages.push({ role: "system", content: opts.system });
  messages.push({ role: "user", content: prompt });

  const body = {
    model: opts.model,
    messages,
    stream: true,
    ...(opts.maxTokens && { max_tokens: opts.maxTokens }),
    ...(opts.combo && { combo: opts.combo }),
  };

  const endpoint = opts.responsesApi ? "/v1/responses" : "/v1/chat/completions";

  const t0 = Date.now();
  const res = await apiFetch(endpoint, {
    method: "POST",
    body,
    acceptNotOk: true,
    timeout: globalOpts.timeout,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    process.stderr.write(`[error] HTTP ${res.status}: ${errText.slice(0, 200)}\n`);
    process.exit(1);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let firstTokenAt = null;
  let totalContent = "";
  const allChunks = [];

  const sigintHandler = () => {
    reader.cancel();
    process.stderr.write("\n[cancelled]\n");
    process.exit(0);
  };
  process.on("SIGINT", sigintHandler);

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);

        if (opts.raw) {
          process.stdout.write(line + "\n");
          continue;
        }

        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (payload === "[DONE]") continue;

        let event;
        try {
          event = JSON.parse(payload);
        } catch {
          continue;
        }

        if (opts.save) appendFileSync(opts.save, JSON.stringify(event) + "\n");
        if (globalOpts.output === "json") allChunks.push(event);

        if (opts.debug) {
          const sinceStart = Date.now() - t0;
          process.stderr.write(`[+${sinceStart}ms] ${JSON.stringify(event).slice(0, 100)}...\n`);
        }

        const delta = opts.responsesApi
          ? (event.delta ?? event.output_text?.delta)
          : event.choices?.[0]?.delta?.content;

        if (delta) {
          if (firstTokenAt === null) firstTokenAt = Date.now() - t0;
          totalContent += delta;
          if (globalOpts.output !== "json") process.stdout.write(delta);
        }
      }
    }
  } finally {
    process.off("SIGINT", sigintHandler);
  }

  const totalMs = Date.now() - t0;
  const tokens = Math.ceil(totalContent.length / 4);

  if (globalOpts.output === "json") {
    process.stdout.write(
      JSON.stringify(
        {
          chunks: allChunks,
          content: totalContent,
          metrics: {
            ttftMs: firstTokenAt,
            totalMs,
            approxTokens: tokens,
            tokensPerSec: Math.round(tokens / (totalMs / 1000)),
          },
        },
        null,
        2
      ) + "\n"
    );
  } else {
    if (!globalOpts.quiet) {
      process.stderr.write(
        `\n\n[TTFT: ${firstTokenAt}ms · Total: ${totalMs}ms · ~${tokens} tok · ~${Math.round(tokens / (totalMs / 1000))} tok/s]\n`
      );
    }
    process.stdout.write("\n");
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
