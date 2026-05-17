import { readFileSync, writeFileSync } from "node:fs";
import { apiFetch, getBaseUrl } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

const FORMATS = ["openai", "anthropic", "gemini", "cohere"];

function authHeaders(opts) {
  const h = { accept: "application/json" };
  if (opts.apiKey) h["Authorization"] = `Bearer ${opts.apiKey}`;
  return h;
}

export function registerTranslator(program) {
  const tr = program
    .command("translator")
    .alias("translate")
    .description(t("translator.description"));

  tr.command("detect")
    .description(t("translator.detect.description"))
    .requiredOption("--file <path>", t("translator.file"))
    .action(async (opts, cmd) => {
      const body = JSON.parse(readFileSync(opts.file, "utf8"));
      const res = await apiFetch("/api/translator/detect", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  tr.command("translate")
    .description(t("translator.translate.description"))
    .requiredOption("--from <f>", t("translator.from"))
    .requiredOption("--to <f>", t("translator.to"))
    .requiredOption("--file <path>", t("translator.file"))
    .option("--out <path>", t("translator.out"))
    .action(async (opts, cmd) => {
      if (!FORMATS.includes(opts.from)) {
        process.stderr.write(`Invalid --from: ${opts.from}. Valid: ${FORMATS.join(", ")}\n`);
        process.exit(2);
      }
      if (!FORMATS.includes(opts.to)) {
        process.stderr.write(`Invalid --to: ${opts.to}. Valid: ${FORMATS.join(", ")}\n`);
        process.exit(2);
      }
      const body = JSON.parse(readFileSync(opts.file, "utf8"));
      const res = await apiFetch("/api/translator/translate", {
        method: "POST",
        body: { from: opts.from, to: opts.to, payload: body },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      if (opts.out) {
        writeFileSync(opts.out, JSON.stringify(data.translated ?? data, null, 2));
        process.stdout.write(`Saved to ${opts.out}\n`);
      } else {
        emit(data.translated ?? data, cmd.optsWithGlobals());
      }
    });

  tr.command("send")
    .description(t("translator.send.description"))
    .requiredOption("--from <f>", t("translator.from"))
    .requiredOption("--to <f>", t("translator.to"))
    .requiredOption("--file <path>", t("translator.file"))
    .option("--model <m>", t("translator.model"))
    .action(async (opts, cmd) => {
      const body = JSON.parse(readFileSync(opts.file, "utf8"));
      const res = await apiFetch("/api/translator/send", {
        method: "POST",
        body: { from: opts.from, to: opts.to, model: opts.model, payload: body },
      });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  tr.command("stream")
    .description(t("translator.stream.description"))
    .requiredOption("--from <f>", t("translator.from"))
    .requiredOption("--to <f>", t("translator.to"))
    .requiredOption("--file <path>", t("translator.file"))
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const body = JSON.parse(readFileSync(opts.file, "utf8"));
      const res = await fetch(`${getBaseUrl(globalOpts)}/api/translator/transform-stream`, {
        method: "POST",
        headers: { ...authHeaders(globalOpts), "Content-Type": "application/json" },
        body: JSON.stringify({ from: opts.from, to: opts.to, payload: body }),
      });
      if (!res.ok) {
        process.stderr.write(`HTTP ${res.status}\n`);
        process.exit(1);
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const raw = line.slice(6).trim();
            if (raw && raw !== "[DONE]") process.stdout.write(raw + "\n");
          }
        }
      }
    });

  tr.command("history")
    .option("--limit <n>", t("translator.history.limit"), parseInt, 50)
    .action(async (opts, cmd) => {
      const res = await apiFetch(`/api/translator/history?limit=${opts.limit}`);
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      const data = await res.json();
      emit(data.items ?? data, cmd.optsWithGlobals());
    });
}
