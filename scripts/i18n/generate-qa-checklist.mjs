#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "src", "app");
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");
const REPORTS_DIR = path.join(ROOT, "docs", "reports");

const PRIORITY_LOCALES = ["es", "fr", "de", "ja", "ar"];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
      continue;
    }
    out.push(full);
  }

  return out;
}

function routeFromPage(pageFile) {
  const rel = path.relative(APP_DIR, pageFile).replace(/\\/g, "/");
  const noPage = rel.replace(/(^|\/)page\.tsx$/, "");
  if (!noPage) {
    return "/";
  }

  const segments = noPage
    .split("/")
    .filter(Boolean)
    .filter((segment) => !/^\(.+\)$/.test(segment));

  return `/${segments.join("/")}`;
}

function classifyPriority(route) {
  const highPatterns = [
    "/dashboard/usage",
    "/dashboard/providers",
    "/dashboard/settings",
    "/dashboard/endpoint",
    "/dashboard/logs",
    "/dashboard/audit-log",
    "/dashboard/health",
    "/dashboard/api-manager",
    "/dashboard/cli-tools",
    "/dashboard/combos",
    "/dashboard/translator",
    "/dashboard/analytics",
    "/dashboard/costs",
    "/dashboard/limits",
  ];

  if (highPatterns.some((pattern) => route.startsWith(pattern))) {
    return "Alta";
  }

  if (route === "/") {
    return "Baixa";
  }

  return "Media";
}

function countRegex(content, regex) {
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

async function collectRouteRiskMetrics(pageFile) {
  const routeDir = path.dirname(pageFile);
  if (routeDir === APP_DIR) {
    const raw = await fs.readFile(pageFile, "utf8");
    return {
      files: 1,
      fixedWidth: countRegex(raw, /\bw-(?:\d+|\[[^\]]+\]|\d+\/\d+)\b/g),
      directional: countRegex(
        raw,
        /\b(?:left|right|ml|mr|pl|pr)-[\w\[\]-]+\b|\btext-(?:left|right)\b/g
      ),
      clipping: countRegex(raw, /\btruncate\b|\bline-clamp-\d+\b|\boverflow-hidden\b/g),
    };
  }

  const files = await (async function walkRouteFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const acc = [];

    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (full !== routeDir) {
          const nestedEntries = await fs.readdir(full);
          if (nestedEntries.includes("page.tsx")) {
            continue;
          }
        }
        acc.push(...(await walkRouteFiles(full)));
        continue;
      }

      if (/\.(tsx|ts)$/.test(entry.name)) {
        acc.push(full);
      }
    }

    return acc;
  })(routeDir);

  let fixedWidth = 0;
  let directional = 0;
  let clipping = 0;

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    fixedWidth += countRegex(raw, /\bw-(?:\d+|\[[^\]]+\]|\d+\/\d+)\b/g);
    directional += countRegex(
      raw,
      /\b(?:left|right|ml|mr|pl|pr)-[\w\[\]-]+\b|\btext-(?:left|right)\b/g
    );
    clipping += countRegex(raw, /\btruncate\b|\bline-clamp-\d+\b|\boverflow-hidden\b/g);
  }

  return {
    files: files.length,
    fixedWidth,
    directional,
    clipping,
  };
}

function getByPath(target, keyPath) {
  return keyPath.split(".").reduce((acc, token) => (acc ? acc[token] : undefined), target);
}

function collectStringKeys(node, prefix = "", out = []) {
  if (typeof node === "string") {
    out.push(prefix);
    return out;
  }

  if (Array.isArray(node)) {
    node.forEach((item, index) => collectStringKeys(item, `${prefix}[${index}]`, out));
    return out;
  }

  if (node && typeof node === "object") {
    for (const key of Object.keys(node)) {
      collectStringKeys(node[key], prefix ? `${prefix}.${key}` : key, out);
    }
  }

  return out;
}

async function runAutomatedChecks() {
  const en = JSON.parse(await fs.readFile(path.join(MESSAGES_DIR, "en.json"), "utf8"));
  const enKeys = collectStringKeys(en).sort();

  const localeFiles = (await fs.readdir(MESSAGES_DIR)).filter((file) => file.endsWith(".json"));
  const localeCodes = localeFiles.map((file) => file.replace(/\.json$/, "")).sort();

  const parityIssues = [];
  for (const code of localeCodes) {
    if (code === "en") {
      continue;
    }

    const raw = await fs.readFile(path.join(MESSAGES_DIR, `${code}.json`), "utf8");
    const data = JSON.parse(raw);
    const keys = collectStringKeys(data).sort();

    const missing = enKeys.filter((key) => !keys.includes(key));
    const extra = keys.filter((key) => !enKeys.includes(key));

    if (missing.length || extra.length) {
      parityIssues.push({ code, missing: missing.length, extra: extra.length });
    }
  }

  const readmeLabelChecks = [];
  const readmeExpectedPrefix = {
    "README.es.md": "🌐 **Disponible en:**",
    "README.fr.md": "🌐 **Disponible en :**",
    "README.de.md": "🌐 **Verfugbar in:**",
    "README.ja.md": "🌐 **対応言語:**",
    "README.ar.md": "🌐 **متوفر باللغات:**",
  };

  for (const [file, expectedPrefix] of Object.entries(readmeExpectedPrefix)) {
    const content = await fs.readFile(path.join(ROOT, file), "utf8");
    const line = content.split("\n").find((entry) => entry.startsWith("🌐 **")) || "";

    // Accept both ASCII-only and umlaut versions for DE prefix.
    const ok =
      file !== "README.de.md"
        ? line.startsWith(expectedPrefix)
        : line.startsWith("🌐 **Verfügbar in:**") || line.startsWith(expectedPrefix);

    readmeLabelChecks.push({ file, ok, line });
  }

  const jaReadme = await fs.readFile(path.join(ROOT, "README.ja.md"), "utf8");
  const arReadme = await fs.readFile(path.join(ROOT, "README.ar.md"), "utf8");

  const anchorLineRemoved =
    !jaReadme.includes("**[English](#-omniroute--the-free-ai-gateway)**") &&
    !arReadme.includes("**[English](#-omniroute--the-free-ai-gateway)**");

  const brAppendixRemoved =
    !jaReadme.includes("## 🇧🇷 OmniRoute") && !arReadme.includes("## 🇧🇷 OmniRoute");

  return {
    localeCodes,
    parityIssues,
    readmeLabelChecks,
    anchorLineRemoved,
    brAppendixRemoved,
  };
}

async function main() {
  const allFiles = await walk(APP_DIR);
  const pageFiles = allFiles.filter((file) => file.endsWith("/page.tsx")).sort();

  const automated = await runAutomatedChecks();

  const routeRows = [];
  for (const pageFile of pageFiles) {
    const route = routeFromPage(pageFile);
    const metrics = await collectRouteRiskMetrics(pageFile);
    routeRows.push({
      route,
      priority: classifyPriority(route),
      ...metrics,
      status: "Pendente validacao visual",
    });
  }

  const date = new Date().toISOString().slice(0, 10);
  const reportPath = path.join(REPORTS_DIR, `i18n-qa-checklist-${date}.md`);

  const automatedChecksLines = [
    `- Locale files detectados: **${automated.localeCodes.length}**`,
    `- Locales priorizados nesta rodada: **${PRIORITY_LOCALES.join(", ")}**`,
    `- Paridade EN x demais idiomas: **${automated.parityIssues.length === 0 ? "OK" : "COM GAPS"}**`,
  ];

  if (automated.parityIssues.length > 0) {
    automatedChecksLines.push(
      ...automated.parityIssues.map(
        (issue) => `  - ${issue.code}: missing=${issue.missing} extra=${issue.extra}`
      )
    );
  }

  automatedChecksLines.push(
    `- Prefixo local do seletor de idiomas em README (es/fr/de/ja/ar): **${automated.readmeLabelChecks.every((item) => item.ok) ? "OK" : "FALHAS"}**`,
    `- Linha legacy EN/PT removida em ja/ar: **${automated.anchorLineRemoved ? "OK" : "PENDENTE"}**`,
    `- Apêndice "## 🇧🇷 OmniRoute" removido em ja/ar: **${automated.brAppendixRemoved ? "OK" : "PENDENTE"}**`,
    "- RTL habilitado globalmente para `ar` e `he` via `dir=rtl` no layout."
  );

  const routeTableHeader =
    "| Rota | Prioridade | Arquivos da rota | Risco truncamento (w-*) | Risco RTL direcional (left/right etc.) | Clipping (`truncate/line-clamp/overflow-hidden`) | Status |";
  const routeTableDivider = "|---|---|---:|---:|---:|---:|---|";
  const routeTableRows = routeRows.map(
    (row) =>
      `| \`${row.route}\` | ${row.priority} | ${row.files} | ${row.fixedWidth} | ${row.directional} | ${row.clipping} | ${row.status} |`
  );

  const content = [
    "# Checklist QA i18n - Revisao Priorizada",
    "",
    `Data: ${date}`,
    "Escopo: validacao de UI e traducao para `es`, `fr`, `de`, `ja`, `ar`.",
    "",
    "## Resultado da revisao manual priorizada (item 1)",
    "",
    "- Ajustes manuais aplicados em `messages` para `es/fr/de/ja/ar` nos namespaces de alta visibilidade:",
    "  - `common.*`",
    "  - `sidebar.*`",
    "  - `header.*`",
    "  - `home.*`",
    "  - `auth.*`",
    "- Ajustes de README aplicados em `README.es.md`, `README.fr.md`, `README.de.md`, `README.ja.md`, `README.ar.md`:",
    "  - Prefixo local da linha de idiomas (bandeiras mantidas)",
    "  - Navegacao superior localizada em `ja/ar`",
    "  - Remocao da linha legada de anchors EN/PT em `ja/ar`",
    "  - Remocao de apendice duplicado em `ja/ar`",
    "",
    "## Checagens automaticas",
    "",
    ...automatedChecksLines,
    "",
    "## Checklist por pagina (item 2)",
    "",
    "Legenda:",
    "- Prioridade Alta: validar obrigatoriamente em desktop + mobile para `es/fr/de/ja/ar`, e em `ar` com fluxo RTL completo.",
    "- Risco truncamento: contagem heuristica de classes `w-*` em arquivos da rota.",
    "- Risco RTL direcional: contagem heuristica de classes com direcao fisica (`left/right/ml/mr/pl/pr/text-left/text-right`).",
    "",
    routeTableHeader,
    routeTableDivider,
    ...routeTableRows,
    "",
    "## Passos de validacao visual recomendados",
    "",
    "1. Trocar idioma no seletor e recarregar rota atual (cookie + refresh).",
    "2. Validar titulos, subtitulos, CTAs e textos de estado vazios/erro/sucesso.",
    "3. Em `ar`: validar alinhamento RTL, ordem visual dos blocos e leitura dos componentes em tabela.",
    "4. Validar cards/tabelas com textos longos para evitar corte indevido e overflow horizontal.",
    "5. Validar labels com placeholders (`{count}`, `{provider}`, `{url}`) e tags (`<logs>`, `<analytics>`).",
    "",
    "## Observacoes",
    "",
    "- Este checklist combina validacao automatica + roteiro de validacao manual por pagina.",
    "- Nao foram executados testes E2E visuais nesta rodada (Playwright/screenshot).",
  ].join("\n");

  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(reportPath, `${content}\n`, "utf8");

  console.log(reportPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
