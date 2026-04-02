#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import Database from "better-sqlite3";
import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "../open-sse/config/providerModels.ts";

function resolveDataDir() {
  const configured = process.env.DATA_DIR?.trim();
  if (configured) return path.resolve(configured);

  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
    return path.join(appData, "omniroute");
  }

  return path.join(os.homedir(), ".omniroute");
}

function toFullModelId(alias, modelId) {
  if (typeof modelId !== "string") return null;
  const trimmed = modelId.trim();
  if (!trimmed) return null;
  return trimmed.startsWith(`${alias}/`) ? trimmed : `${alias}/${trimmed}`;
}

export function collectActiveProviderIds(connections) {
  return [
    ...new Set(
      connections
        .filter((c) => c?.isActive !== false)
        .map((c) => c.provider)
        .filter(Boolean)
    ),
  ];
}

export function collectComboModelsForProvider({
  providerId,
  builtInModels = [],
  customModels = [],
}) {
  const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
  const unique = new Set();

  for (const model of builtInModels) {
    const fullId = toFullModelId(alias, model?.id);
    if (fullId) unique.add(fullId);
  }

  for (const model of customModels) {
    const fullId = toFullModelId(alias, model?.id);
    if (fullId) unique.add(fullId);
  }

  return [...unique].sort((a, b) => a.localeCompare(b));
}

export function buildComboSpecs(connections, customModelsMap = {}) {
  const providerIds = collectActiveProviderIds(connections);
  const providerCombos = providerIds
    .map((providerId) => {
      const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
      const builtInModels = PROVIDER_MODELS[alias] || [];
      const customModels = customModelsMap[providerId] || [];
      const models = collectComboModelsForProvider({ providerId, builtInModels, customModels });
      return {
        providerId,
        alias,
        name: `pax-${providerId}`,
        models,
      };
    })
    .filter((combo) => combo.models.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  const allModels = [...new Set(providerCombos.flatMap((combo) => combo.models))].sort((a, b) =>
    a.localeCompare(b)
  );

  return {
    providerCombos,
    allCombo: {
      name: "pax-all",
      models: allModels,
    },
  };
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readProviderConnections(db) {
  return db
    .prepare(
      "SELECT provider, is_active FROM provider_connections ORDER BY priority ASC, updated_at DESC"
    )
    .all()
    .map((row) => ({
      provider: row.provider,
      isActive: row.is_active === 1 || row.is_active === true,
    }));
}

function readCustomModelsMap(db) {
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'customModels'")
    .all();
  return Object.fromEntries(rows.map((row) => [row.key, parseJson(row.value, [])]));
}

function upsertCombo(db, name, models) {
  const now = new Date().toISOString();
  const existing = db.prepare("SELECT id, data FROM combos WHERE name = ?").get(name);

  if (existing) {
    const current = parseJson(existing.data, {});
    const next = {
      ...current,
      name,
      models,
      strategy: current.strategy || "priority",
      config: current.config || {},
      updatedAt: now,
    };

    db.prepare("UPDATE combos SET data = ?, updated_at = ? WHERE id = ?").run(
      JSON.stringify(next),
      now,
      existing.id
    );

    return { name, action: "updated", count: models.length };
  }

  const id = randomUUID();
  const combo = {
    id,
    name,
    models,
    strategy: "priority",
    config: {},
    isHidden: false,
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    "INSERT INTO combos (id, name, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
  ).run(id, name, JSON.stringify(combo), now, now);

  return { name, action: "created", count: models.length };
}

export function collectFreeModels(models = []) {
  return [
    ...new Set(
      models.filter((model) => typeof model === "string" && model.toLowerCase().includes("free"))
    ),
  ].sort((a, b) => a.localeCompare(b));
}

export function generatePaxComboPlan(connections, customModelsMap = {}) {
  const { providerCombos, allCombo } = buildComboSpecs(connections, customModelsMap);
  const plan = providerCombos.map((combo) => ({ name: combo.name, models: combo.models }));
  if (allCombo.models.length > 0) {
    plan.push(allCombo);
  }

  const freeModels = collectFreeModels(allCombo.models);
  if (freeModels.length > 0) {
    plan.push({ name: "pax-free", models: freeModels });
  }

  return plan;
}

export function generatePaxCombosFromData(db, connections, customModelsMap = {}) {
  const plan = generatePaxComboPlan(connections, customModelsMap);
  if (plan.length === 0) {
    return { results: [], totalProviders: 0, totalModels: 0 };
  }

  const results = plan.map((entry) => upsertCombo(db, entry.name, entry.models));
  const allEntry = plan.find((entry) => entry.name === "pax-all");

  return {
    results,
    totalProviders: plan.filter((entry) => entry.name !== "pax-all").length,
    totalModels: allEntry?.models.length || 0,
  };
}

export function openDatabase(dbPath = path.join(resolveDataDir(), "storage.sqlite")) {
  if (!fs.existsSync(dbPath)) {
    throw new Error(`DB not found: ${dbPath}`);
  }
  return new Database(dbPath);
}

export function generatePaxCombos(dbPath) {
  const db = openDatabase(dbPath);
  try {
    const connections = readProviderConnections(db);
    const customModelsMap = readCustomModelsMap(db);
    return generatePaxCombosFromData(db, connections, customModelsMap);
  } finally {
    db.close();
  }
}

async function main() {
  const summary = generatePaxCombos();

  if (summary.totalProviders === 0) {
    console.log("No active providers with models found.");
    return;
  }

  for (const result of summary.results) {
    console.log(`${result.action}\t${result.name}\t${result.count} models`);
  }
  console.log(`done\tproviders=${summary.totalProviders}\tuniqueModels=${summary.totalModels}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  Promise.resolve(main()).catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
