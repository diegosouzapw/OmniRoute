import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../fixtures/translation");

export type TranslationCase = {
  name: string;
  sourceFormat: string;
  targetFormat: string;
  input: Record<string, unknown>;
  expected?: unknown;
};

export type SseSequence = {
  name: string;
  chunks: string[];
  expectedText: string;
};

export function loadTranslationFixtures(): TranslationCase[] {
  return ["openai-to-claude", "claude-to-openai", "openai-to-gemini", "gemini-to-openai"].flatMap(
    (f) => JSON.parse(fs.readFileSync(path.join(DIR, `${f}.json`), "utf8")) as TranslationCase[]
  );
}

export function loadSseSequences(): SseSequence[] {
  return JSON.parse(
    fs.readFileSync(path.join(DIR, "sse-chunk-sequences.json"), "utf8")
  ) as SseSequence[];
}
