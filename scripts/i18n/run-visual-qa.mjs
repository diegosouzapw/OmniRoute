#!/usr/bin/env node

import { chromium, devices } from "@playwright/test";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REPORTS_DIR = path.join(ROOT, "docs", "reports");
const DATE = new Date().toISOString().slice(0, 10);
const BASE_URL = process.env.QA_BASE_URL || "http://localhost:20128";
const REPORT_SUFFIX = process.env.QA_REPORT_SUFFIX ? `-${process.env.QA_REPORT_SUFFIX}` : "";

const DEFAULT_LOCALES = ["es", "fr", "de", "ja", "ar"];
const RTL_LOCALES = new Set(["ar", "he"]);

const ROUTES = [
  "/dashboard/analytics",
  "/dashboard/api-manager",
  "/dashboard/audit-log",
  "/dashboard/cli-tools",
  "/dashboard/combos",
  "/dashboard/costs",
  "/dashboard/endpoint",
  "/dashboard/health",
  "/dashboard/limits",
  "/dashboard/logs",
  "/dashboard/providers",
  "/dashboard/settings",
  "/dashboard/settings/pricing",
  "/dashboard/translator",
  "/dashboard/usage",
];

function parseRouteList(raw) {
  if (!raw) {
    return null;
  }

  const list = raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => (value.startsWith("/") ? value : `/${value}`));

  return list.length > 0 ? list : null;
}

const customRoutes = parseRouteList(process.env.QA_ROUTES);
const ACTIVE_ROUTES = customRoutes || ROUTES;

function parseLocaleList(raw) {
  if (!raw) {
    return null;
  }

  const list = raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return list.length > 0 ? list : null;
}

const customLocales = parseLocaleList(process.env.QA_LOCALES);
const ACTIVE_LOCALES = customLocales || DEFAULT_LOCALES;

const VIEWPORTS = [
  {
    name: "desktop",
    viewport: { width: 1440, height: 900 },
    userAgent: devices["Desktop Chrome"].userAgent,
  },
  {
    name: "mobile",
    viewport: devices["iPhone 13"].viewport,
    userAgent: devices["iPhone 13"].userAgent,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: devices["iPhone 13"].deviceScaleFactor,
  },
];

function safeRoute(route) {
  return route === "/"
    ? "root"
    : route.replace(/^\//, "").replace(/\//g, "__").replace(/\[|\]/g, "");
}

function classifyResult(item) {
  if (item.error && !item.error.startsWith("screenshot-error:")) {
    return "Ajuste necessario";
  }

  if (item.redirectedToLogin && item.route !== "/login") {
    return "Ajuste necessario";
  }

  if (item.rtlMismatch) {
    return "Ajuste necessario";
  }

  if (item.overflowCount > 8 || item.clippedCount > 6) {
    return "Revisar";
  }

  if (item.error && item.error.startsWith("screenshot-error:")) {
    return "Revisar";
  }

  return "OK";
}

async function ensureLoggedIn(page) {
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "domcontentloaded", timeout: 120000 });

  if (!page.url().includes("/login")) {
    return true;
  }

  const password = process.env.INITIAL_PASSWORD || "123456";
  const input = page.locator('input[type="password"]');
  if ((await input.count()) === 0) {
    return false;
  }

  await input.first().fill(password);
  const submit = page.locator('button[type="submit"]');
  if ((await submit.count()) === 0) {
    return false;
  }

  await submit.first().click();
  await page.waitForTimeout(700);

  try {
    await page.waitForURL(/\/dashboard(\/.*)?/, { timeout: 30000 });
  } catch {
    // Keep going, final URL check below.
  }

  return !page.url().includes("/login");
}

async function evaluatePageHealth(page, locale) {
  return page.evaluate(
    ({ locale, expectRtl }) => {
      const hasHorizontalScrollContext = (el) => {
        let current = el;
        while (current) {
          if (!(current instanceof HTMLElement)) {
            break;
          }
          const cls = typeof current.className === "string" ? current.className : "";
          if (
            cls.includes("overflow-x-auto") ||
            cls.includes("overflow-auto") ||
            cls.includes("overflow-scroll")
          ) {
            return true;
          }
          const style = window.getComputedStyle(current);
          if (style.overflowX === "auto" || style.overflowX === "scroll") {
            return true;
          }
          current = current.parentElement;
        }
        return false;
      };

      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          Number(style.opacity) === 0
        ) {
          return false;
        }
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      };

      const nodes = Array.from(document.querySelectorAll("*"));
      let overflowCount = 0;
      let clippedCount = 0;
      const samples = [];

      for (const el of nodes) {
        if (!(el instanceof HTMLElement)) {
          continue;
        }
        if (!isVisible(el)) {
          continue;
        }

        const text = (el.innerText || "").trim().replace(/\s+/g, " ");
        if (!text || text.length < 12) {
          continue;
        }
        if (text === "Skip to content") {
          continue;
        }

        const cls = el.className || "";
        const classString = typeof cls === "string" ? cls : "";
        if (
          classString.includes("monaco-") ||
          el.closest(".monaco-editor") ||
          el.closest(".monaco-scrollable-element")
        ) {
          continue;
        }

        if (el.tagName === "HTML" || el.tagName === "BODY") {
          continue;
        }

        const overW = el.scrollWidth > el.clientWidth + 1;
        if (!overW) {
          continue;
        }
        if (hasHorizontalScrollContext(el)) {
          continue;
        }

        // Decorative absolute layers often exceed bounds by design and should not
        // be treated as localization regressions.
        const style = window.getComputedStyle(el);
        if (style.position === "absolute" && el.getAttribute("aria-hidden") === "true") {
          continue;
        }

        overflowCount += 1;

        const looksClipped =
          classString.includes("truncate") ||
          classString.includes("line-clamp-") ||
          style.overflowX === "hidden" ||
          style.overflowY === "hidden" ||
          style.textOverflow === "ellipsis";

        if (looksClipped) {
          clippedCount += 1;
        }

        if (samples.length < 10 && looksClipped) {
          samples.push({
            tag: el.tagName.toLowerCase(),
            className: classString.slice(0, 120),
            text: text.slice(0, 140),
          });
        }
      }

      const dir = document.documentElement.getAttribute("dir") || "";
      const lang = document.documentElement.getAttribute("lang") || "";
      const rtlMismatch = expectRtl ? dir !== "rtl" : dir === "rtl";

      return {
        locale,
        dir,
        lang,
        rtlMismatch,
        overflowCount,
        clippedCount,
        clippedSamples: samples,
      };
    },
    { locale, expectRtl: RTL_LOCALES.has(locale) }
  );
}

async function run() {
  await fs.mkdir(REPORTS_DIR, { recursive: true });

  const screenshotRoot = path.join(REPORTS_DIR, `i18n-qa-screenshots-${DATE}`);
  await fs.mkdir(screenshotRoot, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const allResults = [];

  for (const viewportSpec of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: viewportSpec.viewport,
      userAgent: viewportSpec.userAgent,
      isMobile: viewportSpec.isMobile,
      hasTouch: viewportSpec.hasTouch,
      deviceScaleFactor: viewportSpec.deviceScaleFactor,
    });

    const page = await context.newPage();

    const logged = await ensureLoggedIn(page);
    console.log(`[qa] ${viewportSpec.name} login state: ${logged ? "ok" : "not-authenticated"}`);

    for (const locale of ACTIVE_LOCALES) {
      await context.addCookies([
        {
          name: "NEXT_LOCALE",
          value: locale,
          domain: "localhost",
          path: "/",
        },
      ]);

      for (const route of ACTIVE_ROUTES) {
        const started = Date.now();
        const result = {
          route,
          locale,
          viewport: viewportSpec.name,
          finalUrl: "",
          durationMs: 0,
          status: "OK",
          redirectedToLogin: false,
          rtlMismatch: false,
          overflowCount: 0,
          clippedCount: 0,
          clippedSamples: [],
          dir: "",
          lang: "",
          error: "",
          screenshot: "",
        };

        try {
          await page.goto(`${BASE_URL}${route}`, {
            waitUntil: "domcontentloaded",
            timeout: 120000,
          });
          await page.waitForTimeout(500);
          result.finalUrl = page.url();
          result.redirectedToLogin = result.finalUrl.includes("/login");

          const metrics = await evaluatePageHealth(page, locale);
          result.rtlMismatch = metrics.rtlMismatch;
          result.overflowCount = metrics.overflowCount;
          result.clippedCount = metrics.clippedCount;
          result.clippedSamples = metrics.clippedSamples;
          result.dir = metrics.dir;
          result.lang = metrics.lang;
        } catch (error) {
          result.error = String(error?.message || error);
        }

        result.durationMs = Date.now() - started;

        const localeDir = path.join(screenshotRoot, viewportSpec.name, locale);
        await fs.mkdir(localeDir, { recursive: true });
        const screenshotPath = path.join(localeDir, `${safeRoute(route)}.png`);

        try {
          await page.screenshot({ path: screenshotPath, fullPage: true, timeout: 120000 });
          result.screenshot = path.relative(ROOT, screenshotPath).replaceAll("\\", "/");
        } catch (error) {
          if (!result.error) {
            result.error = `screenshot-error: ${String(error?.message || error)}`;
          }
        }

        result.status = classifyResult(result);
        allResults.push(result);

        console.log(
          `[qa] ${viewportSpec.name} ${locale} ${route} -> ${result.status}` +
            `${result.redirectedToLogin ? " (redirected-login)" : ""}` +
            `${result.rtlMismatch ? " (rtl-mismatch)" : ""}` +
            `${result.clippedCount ? ` (clipped=${result.clippedCount})` : ""}`
        );
      }
    }

    await context.close();
  }

  await browser.close();

  const jsonPath = path.join(REPORTS_DIR, `i18n-visual-qa-${DATE}${REPORT_SUFFIX}.json`);
  await fs.writeFile(jsonPath, `${JSON.stringify(allResults, null, 2)}\n`, "utf8");

  const aggregate = new Map();
  const aggregateByLocale = new Map();
  for (const item of allResults) {
    const key = item.route;
    if (!aggregate.has(key)) {
      aggregate.set(key, {
        route: key,
        ok: 0,
        review: 0,
        adjust: 0,
        clipped: 0,
        loginRedirects: 0,
        rtlMismatch: 0,
      });
    }

    const slot = aggregate.get(key);
    if (item.status === "OK") slot.ok += 1;
    if (item.status === "Revisar") slot.review += 1;
    if (item.status === "Ajuste necessario") slot.adjust += 1;
    slot.clipped += item.clippedCount;
    if (item.redirectedToLogin) slot.loginRedirects += 1;
    if (item.rtlMismatch) slot.rtlMismatch += 1;

    const localeKey = item.locale;
    if (!aggregateByLocale.has(localeKey)) {
      aggregateByLocale.set(localeKey, {
        locale: localeKey,
        ok: 0,
        review: 0,
        adjust: 0,
        clipped: 0,
        loginRedirects: 0,
        rtlMismatch: 0,
      });
    }

    const localeSlot = aggregateByLocale.get(localeKey);
    if (item.status === "OK") localeSlot.ok += 1;
    if (item.status === "Revisar") localeSlot.review += 1;
    if (item.status === "Ajuste necessario") localeSlot.adjust += 1;
    localeSlot.clipped += item.clippedCount;
    if (item.redirectedToLogin) localeSlot.loginRedirects += 1;
    if (item.rtlMismatch) localeSlot.rtlMismatch += 1;
  }

  const lines = [
    "# Relatorio QA Visual i18n",
    "",
    `Data: ${DATE}`,
    `Base URL: ${BASE_URL}`,
    `Locales: ${ACTIVE_LOCALES.join(", ")}`,
    `Viewports: ${VIEWPORTS.map((v) => v.name).join(", ")}`,
    "",
    "## Resumo por rota",
    "",
    "| Rota | OK | Revisar | Ajuste necessario | Clipped total | Redirect login | RTL mismatch |",
    "|---|---:|---:|---:|---:|---:|---:|",
    ...Array.from(aggregate.values()).map(
      (row) =>
        `| \`${row.route}\` | ${row.ok} | ${row.review} | ${row.adjust} | ${row.clipped} | ${row.loginRedirects} | ${row.rtlMismatch} |`
    ),
    "",
    "## Resumo por locale",
    "",
    "| Locale | OK | Revisar | Ajuste necessario | Clipped total | Redirect login | RTL mismatch |",
    "|---|---:|---:|---:|---:|---:|---:|",
    ...Array.from(aggregateByLocale.values())
      .sort((a, b) => a.locale.localeCompare(b.locale))
      .map(
        (row) =>
          `| \`${row.locale}\` | ${row.ok} | ${row.review} | ${row.adjust} | ${row.clipped} | ${row.loginRedirects} | ${row.rtlMismatch} |`
      ),
    "",
    "## Artefatos",
    "",
    `- JSON detalhado: \`${path.relative(ROOT, jsonPath)}\``,
    `- Screenshots: \`${path.relative(ROOT, screenshotRoot)}\``,
    "",
    "## Observacoes",
    "",
    "- Status `Revisar` e `Ajuste necessario` sao heuristicas automaticas (overflow/clipping/RTL/redirect).",
    "- A validacao final de UX deve ser confirmada manualmente nas rotas sinalizadas.",
  ];

  const mdPath = path.join(REPORTS_DIR, `i18n-visual-qa-${DATE}${REPORT_SUFFIX}.md`);
  await fs.writeFile(mdPath, `${lines.join("\n")}\n`, "utf8");

  console.log(mdPath);
  console.log(jsonPath);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
