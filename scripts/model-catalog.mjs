#!/usr/bin/env node
/**
 * OmniRoute Model Catalog — 프로바이더별 모델 리스트 + 무료 모델 필터링
 *
 * Usage:
 *   node --import tsx model-catalog.mjs [--free] [--provider <id>] [--json]
 *
 * Flags:
 *   --free       무료 모델만 출력
 *   --provider   특정 프로바이더만 필터
 *   --json       JSON 출력
 *   --classify   모델 특성별 분류 포함
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";
import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "../open-sse/config/providerModels.ts";

// ── Args ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flagFree = args.includes("--free");
const flagJson = args.includes("--json");
const flagClassify = args.includes("--classify");
const flagProviderIdx = args.indexOf("--provider");
const filterProvider = flagProviderIdx >= 0 ? args[flagProviderIdx + 1] : null;

// ── DB ────────────────────────────────────────────────────────────
function resolveDataDir() {
  const configured = process.env.DATA_DIR?.trim();
  if (configured) return path.resolve(configured);
  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
    return path.join(appData, "omniroute");
  }
  return path.join(os.homedir(), ".omniroute");
}

function openDb() {
  const dbPath = path.join(resolveDataDir(), "storage.sqlite");
  if (!fs.existsSync(dbPath)) throw new Error(`DB not found: ${dbPath}`);
  return new Database(dbPath);
}

// ── Model Classification ──────────────────────────────────────────
const PATTERNS = {
  reasoning: /\b(o[1-4]|thinking|reason|deep-?think|r1|qwq|marco)/i,
  vision: /\b(vision|4o|gpt-5|gemini|claude|pixtral|llava|qwen-vl)/i,
  coding: /\b(code|codex|coder|starcoder|deepseek-coder|qwen-coder)/i,
  embedding: /\b(embed|embedding|e5|bge|nomic)/i,
  image_gen: /\b(dall-e|imagen|flux|stable-diffusion|sd[- ]?[23])/i,
  small: /\b(mini|nano|tiny|haiku|flash|lite|1b|3b|7b|8b)\b/i,
  large: /\b(opus|pro|ultra|max|70b|72b|110b|405b|671b)\b/i,
  free: /\bfree\b|:free$/i,
};

function classifyModel(modelId) {
  const tags = [];
  for (const [tag, regex] of Object.entries(PATTERNS)) {
    if (regex.test(modelId)) tags.push(tag);
  }
  if (tags.length === 0) tags.push("chat");
  return tags;
}

// ── Provider Quota Check ──────────────────────────────────────────
// 영구 무료 쿼터 프로바이더 (cheahjs/free-llm-api-resources 기준 2026-04)
const FREE_QUOTA_PROVIDERS = new Set([
  // OAuth 무료
  "antigravity",
  "codex",
  "kiro",
  // API 키 무료 티어 (영구)
  "mistral", // 1req/sec, 500K TPM
  "groq", // 6K-30K TPM, 14.4K RPD
  "nvidia", // 40 RPM
  "cohere", // 20 RPM
  "cerebras", // 30 RPM, 60K TPM
  "google-ai-studio", // 250K TPM (Gemini)
  "gemini-cli", // Google OAuth
  "gemini", // Gemini API 무료 티어
  "cloudflare", // 10K neurons/day
  "sambanova", // 무료 추론
]);

function getProviderQuotaInfo(db) {
  const rows = db
    .prepare(
      "SELECT provider, is_active, auth_type FROM provider_connections ORDER BY priority ASC"
    )
    .all();

  return rows.map((r) => ({
    provider: r.provider,
    isActive: r.is_active === 1,
    authType: r.auth_type || "api_key",
    hasFreeQuota: FREE_QUOTA_PROVIDERS.has(r.provider),
  }));
}

// ── Main ──────────────────────────────────────────────────────────
function main() {
  const db = openDb();

  try {
    const providerInfo = getProviderQuotaInfo(db);
    const seen = new Set();
    const activeProviders = providerInfo.filter((p) => {
      if (!p.isActive || seen.has(p.provider)) return false;
      seen.add(p.provider);
      return true;
    });

    // 커스텀 모델
    const customRows = db
      .prepare("SELECT key, value FROM key_value WHERE namespace = 'customModels'")
      .all();
    const customModelsMap = Object.fromEntries(
      customRows.map((r) => {
        try {
          return [r.key, JSON.parse(r.value)];
        } catch {
          return [r.key, []];
        }
      })
    );

    // 프로바이더별 모델 수집
    const catalog = [];

    for (const pInfo of activeProviders) {
      if (filterProvider && pInfo.provider !== filterProvider) continue;

      const alias = PROVIDER_ID_TO_ALIAS[pInfo.provider] || pInfo.provider;
      const builtIn = (PROVIDER_MODELS[alias] || [])
        .map((m) => {
          const id = typeof m === "string" ? m : m?.id;
          if (!id) return null;
          return id.startsWith(`${alias}/`) ? id : `${alias}/${id}`;
        })
        .filter(Boolean);

      const custom = (customModelsMap[pInfo.provider] || [])
        .map((m) => {
          const id = typeof m === "string" ? m : m?.id;
          if (!id) return null;
          return id.startsWith(`${alias}/`) ? id : `${alias}/${id}`;
        })
        .filter(Boolean);

      const allModels = [...new Set([...builtIn, ...custom])].sort();

      let models = allModels;
      if (flagFree && !pInfo.hasFreeQuota) {
        // 무료 쿼터 프로바이더는 전체 모델 포함, 나머지는 free 모델만
        models = models.filter((m) => PATTERNS.free.test(m));
      }

      const entry = {
        provider: pInfo.provider,
        alias,
        authType: pInfo.authType,
        hasFreeQuota: pInfo.hasFreeQuota,
        modelCount: models.length,
        models: flagClassify ? models.map((m) => ({ id: m, tags: classifyModel(m) })) : models,
      };

      if (models.length > 0) {
        catalog.push(entry);
      }
    }

    // 무료 쿼터 프로바이더 요약
    const freeQuotaProviders = catalog.filter((c) => c.hasFreeQuota);
    const freeModelProviders = catalog.filter((c) =>
      (Array.isArray(c.models) ? c.models : []).some((m) => {
        const id = typeof m === "string" ? m : m?.id;
        return PATTERNS.free.test(id || "");
      })
    );

    const summary = {
      totalProviders: catalog.length,
      totalModels: catalog.reduce((sum, c) => sum + c.modelCount, 0),
      freeQuotaProviders: freeQuotaProviders.map((p) => p.provider),
      freeModelCount: catalog.reduce((sum, c) => {
        const models = Array.isArray(c.models) ? c.models : [];
        return (
          sum +
          models.filter((m) => {
            const id = typeof m === "string" ? m : m?.id;
            return PATTERNS.free.test(id || "");
          }).length
        );
      }, 0),
    };

    if (flagJson) {
      console.log(JSON.stringify({ summary, catalog }, null, 2));
    } else {
      // 마크다운 출력
      console.log(`# OmniRoute Model Catalog`);
      console.log(
        `\n활성 프로바이더: ${summary.totalProviders}개 | 총 모델: ${summary.totalModels}개 | 무료 모델: ${summary.freeModelCount}개`
      );
      console.log(`무료 쿼터 프로바이더: ${summary.freeQuotaProviders.join(", ") || "없음"}\n`);

      for (const entry of catalog) {
        const badge = entry.hasFreeQuota ? " [FREE QUOTA]" : "";
        console.log(`## ${entry.provider} (${entry.alias})${badge}`);
        console.log(`인증: ${entry.authType} | 모델: ${entry.modelCount}개\n`);

        if (flagClassify) {
          for (const m of entry.models) {
            console.log(`- ${m.id}  [${m.tags.join(", ")}]`);
          }
        } else {
          for (const m of entry.models) {
            const isFree = PATTERNS.free.test(m);
            console.log(`- ${m}${isFree ? " **FREE**" : ""}`);
          }
        }
        console.log();
      }

      if (freeQuotaProviders.length > 0) {
        console.log(`## 무료 쿼터 프로바이더 요약\n`);
        for (const p of freeQuotaProviders) {
          console.log(`### ${p.provider} (${p.alias})`);
          console.log(`모델 ${p.modelCount}개 — OAuth 무료 쿼터\n`);
        }
      }
    }
  } finally {
    db.close();
  }
}

main();
