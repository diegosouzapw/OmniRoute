import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";

import * as outputStyles from "../../../open-sse/services/compression/outputStyles/apply.ts";
import { resolveOutputStyleSelection } from "../../../open-sse/services/compression/outputStyles/backCompat.ts";
import { outputStyleLanguages } from "../../../open-sse/services/compression/outputStyles/catalog.ts";

const { default: CavemanContextPageClient } =
  await import("../../../src/app/(dashboard)/dashboard/context/caveman/CavemanContextPageClient.tsx");

const here = dirname(fileURLToPath(import.meta.url));
const enMessages = JSON.parse(
  readFileSync(resolve(here, "../../../src/i18n/messages/en.json"), "utf8")
);

type Level = "lite" | "full" | "ultra";

// The block a chat request carries while caveman output mode is on, taken from the
// request path itself: the back-compat shim picks the selection, applyOutputStyles
// appends it as a trailing system message.
function injectedBlock(level: Level, language: string): string {
  const selection = resolveOutputStyleSelection({
    cavemanOutputMode: { enabled: true, intensity: level },
  });
  const result = outputStyles.applyOutputStyles(
    { messages: [{ role: "user", content: "hello" }] },
    selection,
    language
  );
  assert.equal(result.applied, true, `${language}/${level}: expected an injection`);
  const injected = result.body.messages?.at(-1);
  assert.equal(injected?.role, "system");
  return String(injected?.content);
}

function decodeHtml(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function renderedPreview(): string {
  const html = renderToStaticMarkup(
    React.createElement(
      NextIntlClientProvider,
      { locale: "en", timeZone: "UTC", messages: enMessages },
      React.createElement(CavemanContextPageClient)
    )
  );
  const match = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/);
  assert.ok(match, "expected the output mode preview <pre>");
  return decodeHtml(match[1]);
}

test("caveman page previews the output-styles block a request carries", () => {
  // A server render runs no effects, so the page shows its defaults: lite intensity,
  // language packs off (English).
  const preview = renderedPreview();
  assert.ok(
    preview.startsWith(`${outputStyles.OUTPUT_STYLE_MARKER}\n`),
    `expected the preview to open with ${outputStyles.OUTPUT_STYLE_MARKER}, got: ${preview}`
  );
  assert.ok(!preview.includes("[OmniRoute Caveman Output Mode]"));
  assert.equal(preview, injectedBlock("lite", "en"));
});

test("buildOutputStylesInstruction returns the injected block for every level and language", () => {
  for (const language of [...outputStyleLanguages(), "hu"]) {
    for (const level of ["lite", "full", "ultra"] as const) {
      const selection = resolveOutputStyleSelection({
        cavemanOutputMode: { enabled: true, intensity: level },
      });
      assert.equal(
        outputStyles.buildOutputStylesInstruction(selection, language),
        injectedBlock(level, language),
        `${language}/${level}`
      );
    }
  }
  assert.equal(outputStyles.buildOutputStylesInstruction([], "en"), "");
});
