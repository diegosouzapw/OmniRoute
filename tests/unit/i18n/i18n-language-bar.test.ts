import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  buildMirrorBar,
  buildSourceBar,
  replaceLanguageBar,
} from "../../../scripts/i18n/lib/language-bar.mjs";
import { syncLanguageBars } from "../../../scripts/i18n/sync-language-bars.mjs";

const config = {
  locales: [
    { code: "en", flag: "🇺🇸", native: "English" },
    { code: "ar", flag: "🇸🇦", native: "العربية" },
    { code: "pt-BR", flag: "🇧🇷", native: "Português (Brasil)" },
  ],
};

test("buildMirrorBar links English back to the source and every other locale sideways", () => {
  // Every link is the minimal relative path (path.posix.relative), the same form the
  // pre-refactor buildLanguageBar in run-translation.mjs emitted: from
  // docs/i18n/ar/docs/guides/ the English source is four levels up, not "<root>/docs/…".
  assert.equal(
    buildMirrorBar("docs/guides/USER_GUIDE.md", "ar", config),
    "🌐 **Languages:** 🇺🇸 [English](../../../../guides/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/USER_GUIDE.md)"
  );
  assert.equal(
    buildMirrorBar("README.md", "pt-BR", config),
    "🌐 **Languages:** 🇺🇸 [English](../../../README.md) · 🇸🇦 [ar](../ar/README.md)"
  );
});

test("buildSourceBar lists every locale with its native name and a pipe separator", () => {
  assert.equal(
    buildSourceBar("docs/guides/USER_GUIDE.md", config),
    "🌐 **Languages:** 🇺🇸 [English](./USER_GUIDE.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/USER_GUIDE.md)"
  );
});

test("replaceLanguageBar swaps only the bar line and returns null when there is none", () => {
  const md = "# T\n\n🌐 **Languages:** 🇺🇸 [English](./old.md)\n\n---\nbody\n";
  assert.equal(
    replaceLanguageBar(md, "🌐 **Languages:** new"),
    "# T\n\n🌐 **Languages:** new\n\n---\nbody\n"
  );
  assert.equal(replaceLanguageBar("# T\n\nbody\n", "x"), null);
});

// A mirror produced before the bars were generated carries the label the
// translation backend invented ("Idiomas", "語言", "Available in"), and those are
// precisely the bars still listing retired locales — matching only the canonical
// English label left them (and their dead links) untouched.
test("replaceLanguageBar rewrites a translated bar label, not just the canonical English one", () => {
  const md =
    "# T\n\n🌐 **Idiomas:** 🇺🇸 [English](x.md) | 🇮🇳 [हिन्दी](docs/i18n/in/x.md)\n\n---\nbody\n";
  assert.equal(
    replaceLanguageBar(md, "🌐 **Languages:** new"),
    "# T\n\n🌐 **Languages:** new\n\n---\nbody\n"
  );
  // A `🌐` line that is not a bold-labelled bar stays untouched (→ null: no bar).
  assert.equal(replaceLanguageBar("# T\n\n🌐 [Website](https://x)\n", "x"), null);
});

// The detector guards a destructive rewrite, so it must not fire on every bold
// `🌐` line: a bar is a colon-closed bold label AND at least one markdown link.
test("isLanguageBar (via replaceLanguageBar) rejects 🌐 lines that are not language bars", () => {
  const notBars = [
    "🌐 **Website**",
    "🌐 **Website** — https://x",
    "🌐 **Note:** we support many languages",
  ];
  for (const line of notBars) {
    assert.equal(
      replaceLanguageBar(`# T\n\n${line}\n\n---\nbody\n`, "🌐 **Languages:** new"),
      null,
      line
    );
  }
});

test("isLanguageBar (via replaceLanguageBar) accepts a canonical bar and a translated-label one", () => {
  const bars = [
    "🌐 **Languages:** 🇺🇸 [English](./X.md)",
    "🌐 **Main README translations:** 🇺🇸 [English](../README.md) | 🇸🇦 [العربية](../ar/README.md)",
    // Fullwidth colon — the shape the CJK mirrors were written with.
    "🌐 **語言：** 🇺🇸 [English](../../../README.md) · 🇸🇦 [ar](../ar/README.md)",
  ];
  for (const line of bars) {
    assert.equal(
      replaceLanguageBar(`# T\n\n${line}\n\n---\nbody\n`, "🌐 **Languages:** new"),
      "# T\n\n🌐 **Languages:** new\n\n---\nbody\n",
      line
    );
  }
});

test("replaceLanguageBar rewrites EVERY bar in the file, including a stale one left in the body", () => {
  const md = [
    "# T",
    "",
    "🌐 **Languages:** 🇺🇸 [English](./header.md)",
    "",
    "---",
    "",
    "<div>hero</div>",
    "",
    "🌐 **Available in:** 🇮🇳 [हिन्दी](docs/i18n/in/README.md)",
    "",
    "body",
    "",
  ].join("\n");
  const out = replaceLanguageBar(md, "🌐 **Languages:** new") as string;
  assert.equal(out.split("\n").filter((line) => line.startsWith("🌐")).length, 2);
  assert.ok(!out.includes("docs/i18n/in/"), "no retired locale survives in any bar");
  assert.deepEqual(
    out.split("\n").filter((line) => line.startsWith("🌐")),
    ["🌐 **Languages:** new", "🌐 **Languages:** new"]
  );
  // Nothing but the bar lines moved.
  assert.deepEqual(
    out.split("\n").filter((line) => !line.startsWith("🌐")),
    md.split("\n").filter((line) => !line.startsWith("🌐"))
  );
});

test("syncLanguageBars rewrites stale bars from config, lists them in dry-run and leaves bar-less files alone", async () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "i18n-language-bar-"));
  try {
    mkdirSync(path.join(root, "config"), { recursive: true });
    writeFileSync(path.join(root, "config", "i18n.json"), JSON.stringify(config), "utf8");

    // English source with a stale bar.
    const enDoc = path.join(root, "docs", "guides", "X.md");
    mkdirSync(path.dirname(enDoc), { recursive: true });
    const enBefore = "# X\n\n🌐 **Languages:** 🇺🇸 [English](./stale.md)\n\n---\n\nbody\n";
    writeFileSync(enDoc, enBefore, "utf8");

    // Mirror with a stale bar.
    const arDoc = path.join(root, "docs", "i18n", "ar", "docs", "guides", "X.md");
    mkdirSync(path.dirname(arDoc), { recursive: true });
    const arBefore =
      "# X (العربية)\n\n🌐 **Languages:** 🇺🇸 [English](./stale.md)\n\n---\n\ncorpo\n";
    writeFileSync(arDoc, arBefore, "utf8");

    // Mirror without any bar — must never gain one.
    const bareDoc = path.join(root, "docs", "i18n", "pt-BR", "docs", "guides", "X.md");
    mkdirSync(path.dirname(bareDoc), { recursive: true });
    const bareText = "# X (Português)\n\nsem barra\n";
    writeFileSync(bareDoc, bareText, "utf8");

    const expectedChanged = ["docs/guides/X.md", "docs/i18n/ar/docs/guides/X.md"];

    // Dry-run: reports the stale files and writes nothing.
    assert.deepEqual(await syncLanguageBars({ root, dryRun: true }), expectedChanged);
    assert.equal(readFileSync(enDoc, "utf8"), enBefore);
    assert.equal(readFileSync(arDoc, "utf8"), arBefore);
    assert.equal(readFileSync(bareDoc, "utf8"), bareText);

    // Apply: both stale bars are regenerated in place, the rest of each file is untouched.
    assert.deepEqual(await syncLanguageBars({ root, dryRun: false }), expectedChanged);
    assert.equal(
      readFileSync(enDoc, "utf8"),
      "# X\n\n🌐 **Languages:** 🇺🇸 [English](./X.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/X.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/X.md)\n\n---\n\nbody\n"
    );
    assert.equal(
      readFileSync(arDoc, "utf8"),
      "# X (العربية)\n\n🌐 **Languages:** 🇺🇸 [English](../../../../guides/X.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/X.md)\n\n---\n\ncorpo\n"
    );
    assert.equal(readFileSync(bareDoc, "utf8"), bareText);

    // Idempotent: a second pass finds nothing left to update.
    assert.deepEqual(await syncLanguageBars({ root, dryRun: true }), []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
