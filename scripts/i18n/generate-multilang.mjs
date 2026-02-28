#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");
const DOCS_DIR = path.join(ROOT, "docs");
const DOCS_I18N_DIR = path.join(DOCS_DIR, "i18n");

const DOC_SOURCE_FILES = [
  "API_REFERENCE.md",
  "ARCHITECTURE.md",
  "CODEBASE_DOCUMENTATION.md",
  "FEATURES.md",
  "TROUBLESHOOTING.md",
  "USER_GUIDE.md",
];

const LOCALE_SPECS = [
  {
    code: "en",
    googleTl: "en",
    label: "EN",
    flag: "🇺🇸",
    languageName: "English",
    readmeName: "English",
    docsName: "English",
  },
  {
    code: "pt-BR",
    googleTl: "pt",
    label: "PT-BR",
    flag: "🇧🇷",
    languageName: "Português (Brasil)",
    readmeName: "Português (Brasil)",
    docsName: "Português (Brasil)",
  },
  {
    code: "es",
    googleTl: "es",
    label: "ES",
    flag: "🇪🇸",
    languageName: "Español",
    readmeName: "Español",
    docsName: "Español",
  },
  {
    code: "fr",
    googleTl: "fr",
    label: "FR",
    flag: "🇫🇷",
    languageName: "Français",
    readmeName: "Français",
    docsName: "Français",
  },
  {
    code: "it",
    googleTl: "it",
    label: "IT",
    flag: "🇮🇹",
    languageName: "Italiano",
    readmeName: "Italiano",
    docsName: "Italiano",
  },
  {
    code: "ru",
    googleTl: "ru",
    label: "RU",
    flag: "🇷🇺",
    languageName: "Русский",
    readmeName: "Русский",
    docsName: "Русский",
  },
  {
    code: "zh-CN",
    googleTl: "zh-CN",
    label: "ZH-CN",
    flag: "🇨🇳",
    languageName: "中文 (简体)",
    readmeName: "中文 (简体)",
    docsName: "中文 (简体)",
  },
  {
    code: "de",
    googleTl: "de",
    label: "DE",
    flag: "🇩🇪",
    languageName: "Deutsch",
    readmeName: "Deutsch",
    docsName: "Deutsch",
  },
  {
    code: "in",
    googleTl: "hi",
    label: "IN",
    flag: "🇮🇳",
    languageName: "Hindi (India)",
    readmeName: "हिन्दी",
    docsName: "हिन्दी",
  },
  {
    code: "th",
    googleTl: "th",
    label: "TH",
    flag: "🇹🇭",
    languageName: "ไทย",
    readmeName: "ไทย",
    docsName: "ไทย",
  },
  {
    code: "uk-UA",
    googleTl: "uk",
    label: "UK-UA",
    flag: "🇺🇦",
    languageName: "Українська",
    readmeName: "Українська",
    docsName: "Українська",
  },
  {
    code: "ar",
    googleTl: "ar",
    label: "AR",
    flag: "🇸🇦",
    languageName: "العربية",
    readmeName: "العربية",
    docsName: "العربية",
  },
  {
    code: "ja",
    googleTl: "ja",
    label: "JA",
    flag: "🇯🇵",
    languageName: "日本語",
    readmeName: "日本語",
    docsName: "日本語",
  },
  {
    code: "vi",
    googleTl: "vi",
    label: "VI",
    flag: "🇻🇳",
    languageName: "Tiếng Việt",
    readmeName: "Tiếng Việt",
    docsName: "Tiếng Việt",
  },
  {
    code: "bg",
    googleTl: "bg",
    label: "BG",
    flag: "🇧🇬",
    languageName: "Български",
    readmeName: "Български",
    docsName: "Български",
  },
  {
    code: "da",
    googleTl: "da",
    label: "DA",
    flag: "🇩🇰",
    languageName: "Dansk",
    readmeName: "Dansk",
    docsName: "Dansk",
  },
  {
    code: "fi",
    googleTl: "fi",
    label: "FI",
    flag: "🇫🇮",
    languageName: "Suomi",
    readmeName: "Suomi",
    docsName: "Suomi",
  },
  {
    code: "he",
    googleTl: "iw",
    label: "HE",
    flag: "🇮🇱",
    languageName: "עברית",
    readmeName: "עברית",
    docsName: "עברית",
  },
  {
    code: "hu",
    googleTl: "hu",
    label: "HU",
    flag: "🇭🇺",
    languageName: "Magyar",
    readmeName: "Magyar",
    docsName: "Magyar",
  },
  {
    code: "id",
    googleTl: "id",
    label: "ID",
    flag: "🇮🇩",
    languageName: "Bahasa Indonesia",
    readmeName: "Bahasa Indonesia",
    docsName: "Bahasa Indonesia",
  },
  {
    code: "ko",
    googleTl: "ko",
    label: "KO",
    flag: "🇰🇷",
    languageName: "한국어",
    readmeName: "한국어",
    docsName: "한국어",
  },
  {
    code: "ms",
    googleTl: "ms",
    label: "MS",
    flag: "🇲🇾",
    languageName: "Bahasa Melayu",
    readmeName: "Bahasa Melayu",
    docsName: "Bahasa Melayu",
  },
  {
    code: "nl",
    googleTl: "nl",
    label: "NL",
    flag: "🇳🇱",
    languageName: "Nederlands",
    readmeName: "Nederlands",
    docsName: "Nederlands",
  },
  {
    code: "no",
    googleTl: "no",
    label: "NO",
    flag: "🇳🇴",
    languageName: "Norsk",
    readmeName: "Norsk",
    docsName: "Norsk",
  },
  {
    code: "pt",
    googleTl: "pt",
    label: "PT",
    flag: "🇵🇹",
    languageName: "Português (Portugal)",
    readmeName: "Português (Portugal)",
    docsName: "Português (Portugal)",
  },
  {
    code: "ro",
    googleTl: "ro",
    label: "RO",
    flag: "🇷🇴",
    languageName: "Română",
    readmeName: "Română",
    docsName: "Română",
  },
  {
    code: "pl",
    googleTl: "pl",
    label: "PL",
    flag: "🇵🇱",
    languageName: "Polski",
    readmeName: "Polski",
    docsName: "Polski",
  },
  {
    code: "sk",
    googleTl: "sk",
    label: "SK",
    flag: "🇸🇰",
    languageName: "Slovenčina",
    readmeName: "Slovenčina",
    docsName: "Slovenčina",
  },
  {
    code: "sv",
    googleTl: "sv",
    label: "SV",
    flag: "🇸🇪",
    languageName: "Svenska",
    readmeName: "Svenska",
    docsName: "Svenska",
  },
  {
    code: "phi",
    googleTl: "tl",
    label: "PHI",
    flag: "🇵🇭",
    languageName: "Filipino",
    readmeName: "Filipino",
    docsName: "Filipino",
  },
];

const EXISTING_README_CODES = new Set(["pt-BR", "es", "fr", "it", "ru", "zh-CN", "de"]);
const RTL_LOCALES = new Set(["ar", "he"]);

const URL_MAX_TEXT_LENGTH = 1800;
const DELIMITER = "\n__OMNIROUTE_I18N_SEPARATOR__\n";
const DELIMITER_REGEX = /\n\s*__OMNIROUTE_I18N_SEPARATOR__\s*\n/g;
const TRANSLATION_CACHE = new Map();
const REQUEST_TIMEOUT_MS = 20000;

function getReadmeFileName(code) {
  return code === "en" ? "README.md" : `README.${code}.md`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isProbablyTranslatable(text) {
  if (!text.trim()) {
    return false;
  }
  return /[A-Za-z]/.test(text);
}

function maskBalancedCurlyBraces(input, stash) {
  let result = "";
  let i = 0;

  while (i < input.length) {
    if (input[i] === "{") {
      let j = i;
      let depth = 0;

      while (j < input.length) {
        const ch = input[j];
        if (ch === "{") {
          depth += 1;
        } else if (ch === "}") {
          depth -= 1;
          if (depth === 0) {
            j += 1;
            break;
          }
        }
        j += 1;
      }

      if (depth === 0 && j > i + 1) {
        result += stash(input.slice(i, j));
        i = j;
        continue;
      }
    }

    result += input[i];
    i += 1;
  }

  return result;
}

function protectText(input, options = {}) {
  const tokens = [];
  const stash = (value) => {
    const token = `__OMNI_TOKEN_${tokens.length}__`;
    tokens.push(value);
    return token;
  };

  let output = input;

  if (options.markdown) {
    output = output.replace(/```[\s\S]*?```/g, stash);
    output = output.replace(/<table[\s\S]*?<\/table>/gi, stash);
    output = output.replace(/`[^`\n]+`/g, stash);
    output = output.replace(/!?\[[^\]]*\]\([^\)]+\)/g, stash);
    output = output.replace(/<img[^>]*>/gi, stash);
  }

  output = output.replace(/<\/?[a-zA-Z][^>]*>/g, stash);
  output = maskBalancedCurlyBraces(output, stash);

  return { output, tokens };
}

function restoreText(input, tokens) {
  let output = input;
  for (let i = 0; i < tokens.length; i += 1) {
    output = output.replaceAll(`__OMNI_TOKEN_${i}__`, tokens[i]);
  }
  return output;
}

function parseTranslationPayload(payload) {
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) {
    throw new Error("Invalid translation payload format");
  }

  return payload[0].map((item) => item[0] || "").join("");
}

async function translateTextRaw(text, targetLanguage, sourceLanguage = "en", attempt = 1) {
  if (!text) {
    return text;
  }

  const params = new URLSearchParams({
    client: "gtx",
    sl: sourceLanguage,
    tl: targetLanguage,
    dt: "t",
    q: text,
  });

  const url = `https://translate.googleapis.com/translate_a/single?${params.toString()}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 OmniRoute-I18N",
      },
    });
  } catch (error) {
    clearTimeout(timeout);
    if (attempt < 5) {
      await sleep(300 * attempt);
      return translateTextRaw(text, targetLanguage, sourceLanguage, attempt + 1);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    if ((response.status === 429 || response.status >= 500) && attempt < 5) {
      await sleep(300 * attempt);
      return translateTextRaw(text, targetLanguage, sourceLanguage, attempt + 1);
    }

    const body = await response.text();
    throw new Error(`Translation request failed (${response.status}): ${body.slice(0, 200)}`);
  }

  const payload = await response.json();
  return parseTranslationPayload(payload);
}

function getLocaleCache(targetLanguage) {
  if (!TRANSLATION_CACHE.has(targetLanguage)) {
    TRANSLATION_CACHE.set(targetLanguage, new Map());
  }
  return TRANSLATION_CACHE.get(targetLanguage);
}

async function translateProtectedUnits(units, targetLanguage) {
  const translated = new Array(units.length);
  const cache = getLocaleCache(targetLanguage);

  const pendingIndices = [];
  const uniqueTexts = [];
  const uniqueIndexMap = new Map();

  for (let i = 0; i < units.length; i += 1) {
    const text = units[i];
    if (cache.has(text)) {
      translated[i] = cache.get(text);
      continue;
    }

    pendingIndices.push(i);
    if (!uniqueIndexMap.has(text)) {
      uniqueIndexMap.set(text, uniqueTexts.length);
      uniqueTexts.push(text);
    }
  }

  if (uniqueTexts.length > 0) {
    let chunk = [];
    let chunkLen = 0;
    const translatedUnique = new Array(uniqueTexts.length);

    const flushChunk = async () => {
      if (chunk.length === 0) {
        return;
      }

      const joined = chunk.join(DELIMITER);
      let translatedJoined;

      try {
        translatedJoined = await translateTextRaw(joined, targetLanguage);
      } catch (error) {
        translatedJoined = null;
      }

      if (translatedJoined) {
        const split = translatedJoined.split(DELIMITER_REGEX);
        if (split.length === chunk.length) {
          for (let i = 0; i < chunk.length; i += 1) {
            const originalText = chunk[i];
            const translatedText = split[i];
            const uniqueIdx = uniqueIndexMap.get(originalText);
            translatedUnique[uniqueIdx] = translatedText;
            cache.set(originalText, translatedText);
          }
          chunk = [];
          chunkLen = 0;
          return;
        }
      }

      for (const originalText of chunk) {
        const translatedText = await translateTextRaw(originalText, targetLanguage);
        const uniqueIdx = uniqueIndexMap.get(originalText);
        translatedUnique[uniqueIdx] = translatedText;
        cache.set(originalText, translatedText);
      }

      chunk = [];
      chunkLen = 0;
    };

    for (const text of uniqueTexts) {
      const projected = chunkLen + text.length + DELIMITER.length;
      if (projected > URL_MAX_TEXT_LENGTH && chunk.length > 0) {
        await flushChunk();
      }

      chunk.push(text);
      chunkLen += text.length + DELIMITER.length;

      if (chunkLen > URL_MAX_TEXT_LENGTH) {
        await flushChunk();
      }
    }

    await flushChunk();

    for (const index of pendingIndices) {
      const text = units[index];
      const uniqueIdx = uniqueIndexMap.get(text);
      translated[index] = translatedUnique[uniqueIdx] || text;
    }
  }

  return translated;
}

async function translateStrings(values, targetLanguage, options = {}) {
  if (targetLanguage === "en") {
    return values.slice();
  }

  const protectedValues = values.map((value) => protectText(value, options));
  const maskedUnits = protectedValues.map((item) => item.output);

  const needsTranslation = maskedUnits.map((unit) => isProbablyTranslatable(unit));
  const onlyForTranslation = [];
  const mapping = [];

  for (let i = 0; i < maskedUnits.length; i += 1) {
    if (!needsTranslation[i]) {
      continue;
    }
    mapping.push(i);
    onlyForTranslation.push(maskedUnits[i]);
  }

  const translatedUnits = await translateProtectedUnits(onlyForTranslation, targetLanguage);

  const finalMasked = maskedUnits.slice();
  for (let i = 0; i < mapping.length; i += 1) {
    finalMasked[mapping[i]] = translatedUnits[i];
  }

  return finalMasked.map((value, index) => restoreText(value, protectedValues[index].tokens));
}

function collectStringLeaves(node, pathSoFar = [], output = []) {
  if (typeof node === "string") {
    output.push({ path: pathSoFar, value: node });
    return output;
  }

  if (Array.isArray(node)) {
    node.forEach((item, index) => {
      collectStringLeaves(item, [...pathSoFar, index], output);
    });
    return output;
  }

  if (node && typeof node === "object") {
    for (const key of Object.keys(node)) {
      collectStringLeaves(node[key], [...pathSoFar, key], output);
    }
  }

  return output;
}

function setByPath(target, pathTokens, value) {
  let current = target;
  for (let i = 0; i < pathTokens.length - 1; i += 1) {
    current = current[pathTokens[i]];
  }
  current[pathTokens[pathTokens.length - 1]] = value;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function buildRootReadmeLanguageBar() {
  const entries = LOCALE_SPECS.map((spec) => {
    const file = getReadmeFileName(spec.code);
    return `${spec.flag} [${spec.readmeName}](${file})`;
  });
  return `🌐 **Available in:** ${entries.join(" | ")}`;
}

function upsertRootReadmeLanguageBar(content, languageBar) {
  const existingBarRegex = /^🌐 \*\*.*README.*$/m;
  if (existingBarRegex.test(content)) {
    return content.replace(existingBarRegex, languageBar);
  }

  const navLineRegex = /^\[🌐 .*$/m;
  const navLine = content.match(navLineRegex);
  if (navLine && typeof navLine.index === "number") {
    const insertAfter = navLine.index + navLine[0].length;
    return `${content.slice(0, insertAfter)}\n\n${languageBar}${content.slice(insertAfter)}`;
  }

  return `${languageBar}\n\n${content}`;
}

function buildDocsLanguageBar(docName, currentLocaleCode) {
  const entries = LOCALE_SPECS.map((spec) => {
    let targetPath;

    if (spec.code === "en") {
      targetPath = currentLocaleCode ? `../../${docName}` : docName;
    } else if (currentLocaleCode) {
      targetPath = `../${spec.code}/${docName}`;
    } else {
      targetPath = `i18n/${spec.code}/${docName}`;
    }

    return `${spec.flag} [${spec.docsName}](${targetPath})`;
  });

  return `🌐 **Languages:** ${entries.join(" | ")}`;
}

function upsertDocsLanguageBar(content, languageBar) {
  const existingBarRegex = /^🌐 \*\*Languages:\*\*.*$/m;
  if (existingBarRegex.test(content)) {
    return content.replace(existingBarRegex, languageBar);
  }

  const firstHeadingRegex = /^(# .+\n?)/;
  if (firstHeadingRegex.test(content)) {
    return content.replace(firstHeadingRegex, `$1\n${languageBar}\n`);
  }

  return `${languageBar}\n\n${content}`;
}

function splitByParagraphs(markdown) {
  const parts = markdown.split(/(\n{2,})/g);
  return parts;
}

async function translateMarkdownDocument(content, targetLanguage) {
  if (targetLanguage === "en") {
    return content;
  }

  const protectedDoc = protectText(content, { markdown: true });
  const parts = splitByParagraphs(protectedDoc.output);

  const translatableIndices = [];
  const translatableValues = [];

  for (let i = 0; i < parts.length; i += 1) {
    if (i % 2 === 1) {
      continue;
    }

    const part = parts[i];
    if (!isProbablyTranslatable(part)) {
      continue;
    }

    translatableIndices.push(i);
    translatableValues.push(part);
  }

  const translated = await translateStrings(translatableValues, targetLanguage, { markdown: true });

  for (let i = 0; i < translatableIndices.length; i += 1) {
    parts[translatableIndices[i]] = translated[i];
  }

  const joined = parts.join("");
  return restoreText(joined, protectedDoc.tokens);
}

async function generateMessageTranslations() {
  const enPath = path.join(MESSAGES_DIR, "en.json");
  const sourceRaw = await fs.readFile(enPath, "utf8");
  const sourceJson = JSON.parse(sourceRaw);

  const leaves = collectStringLeaves(sourceJson);
  const sourceValues = leaves.map((entry) => entry.value);

  for (const spec of LOCALE_SPECS) {
    if (spec.code === "en" || spec.code === "pt-BR") {
      continue;
    }

    const targetPath = path.join(MESSAGES_DIR, `${spec.code}.json`);
    if (await fileExists(targetPath)) {
      console.log(`[messages] Skipping ${spec.code} (already exists).`);
      continue;
    }

    console.log(`[messages] Translating ${spec.code}...`);
    const translatedValues = await translateStrings(sourceValues, spec.googleTl);

    const targetJson = structuredClone(sourceJson);
    translatedValues.forEach((value, index) => {
      setByPath(targetJson, leaves[index].path, value);
    });

    await fs.writeFile(targetPath, `${JSON.stringify(targetJson, null, 2)}\n`, "utf8");
  }
}

async function generateReadmeTranslations() {
  const sourceReadmePath = path.join(ROOT, "README.md");
  const sourceReadme = await fs.readFile(sourceReadmePath, "utf8");

  for (const spec of LOCALE_SPECS) {
    if (spec.code === "en") {
      continue;
    }

    const targetFile = path.join(ROOT, getReadmeFileName(spec.code));

    if (EXISTING_README_CODES.has(spec.code) || (await fileExists(targetFile))) {
      continue;
    }

    console.log(`[readme] Translating ${spec.code}...`);
    const translated = await translateMarkdownDocument(sourceReadme, spec.googleTl);
    await fs.writeFile(targetFile, translated, "utf8");
  }

  const languageBar = buildRootReadmeLanguageBar();
  for (const spec of LOCALE_SPECS) {
    const readmePath = path.join(ROOT, getReadmeFileName(spec.code));
    const current = await fs.readFile(readmePath, "utf8");
    const updated = upsertRootReadmeLanguageBar(current, languageBar);
    await fs.writeFile(readmePath, updated, "utf8");
  }
}

async function generateDocsTranslations() {
  await ensureDir(DOCS_I18N_DIR);

  for (const docName of DOC_SOURCE_FILES) {
    const sourceDocPath = path.join(DOCS_DIR, docName);
    const sourceDocRaw = await fs.readFile(sourceDocPath, "utf8");

    const sourceDocBar = buildDocsLanguageBar(docName, null);
    const sourceDocWithBar = upsertDocsLanguageBar(sourceDocRaw, sourceDocBar);
    await fs.writeFile(sourceDocPath, sourceDocWithBar, "utf8");

    for (const spec of LOCALE_SPECS) {
      if (spec.code === "en") {
        continue;
      }

      const targetDir = path.join(DOCS_I18N_DIR, spec.code);
      await ensureDir(targetDir);
      const targetPath = path.join(targetDir, docName);

      if (await fileExists(targetPath)) {
        continue;
      }

      console.log(`[docs] Translating ${docName} -> ${spec.code}...`);
      const translated = await translateMarkdownDocument(sourceDocRaw, spec.googleTl);
      const withBar = upsertDocsLanguageBar(translated, buildDocsLanguageBar(docName, spec.code));
      await fs.writeFile(targetPath, withBar, "utf8");
    }
  }

  const indexLines = [
    "# Multilingual Documentation",
    "",
    "This directory contains machine-assisted translations based on the English docs.",
    "",
    ...DOC_SOURCE_FILES.map((docName) => {
      const links = LOCALE_SPECS.map((spec) => {
        const link = spec.code === "en" ? `../${docName}` : `./${spec.code}/${docName}`;
        return `${spec.flag} [${spec.docsName}](${link})`;
      }).join(" | ");

      return `- **${docName}**: ${links}`;
    }),
    "",
    `Generated on ${new Date().toISOString().slice(0, 10)}.`,
  ];

  await fs.writeFile(path.join(DOCS_I18N_DIR, "README.md"), `${indexLines.join("\n")}\n`, "utf8");
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const runAll = args.size === 0 || args.has("all");

  if (runAll || args.has("messages")) {
    await generateMessageTranslations();
  }

  if (runAll || args.has("readme")) {
    await generateReadmeTranslations();
  }

  if (runAll || args.has("docs")) {
    await generateDocsTranslations();
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
