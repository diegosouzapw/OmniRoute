#!/usr/bin/env node
// scripts/check/check-provider-consistency.ts
// Gate anti-alucinação nº1: toda entrada em REGISTRY (open-sse/config/providerRegistry.ts)
// deve corresponder a um provider canônico em src/shared/constants/providers.ts.
// Pega entradas de registry inventadas/meia-registradas (provider com baseUrl+models
// mas ausente da lista canônica → não selecionável pela máquina normal de providers).
// Catraca: exceções pré-existentes ficam em KNOWN_REGISTRY_ONLY; só NOVOS órfãos falham.
// Stale-enforcement (6A.3): entrada em KNOWN_REGISTRY_ONLY que não suprime nenhum órfão
// real → gate falha com instrução de remoção (evita furo de regressão silencioso).
//
// Reverse walk (#10513): providers.ts → REGISTRY. Um provider canônico cujo
// serviceKinds inclui "llm" DEVE ter entrada no REGISTRY — a não ser que esteja em
// KNOWN_CATALOG_ONLY (providers que roteiam via baseUrl de conexão / executor
// especializado sem entrada de registry). Isso torna provider:remove --dry-run
// verificável: um provider removido do REGISTRY mas esquecido em providers.ts
// aparece como órfão reverso e o gate falha.
import { pathToFileURL } from "node:url";
import { AI_PROVIDERS, getProviderById } from "@/shared/constants/providers.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { assertNoStale } from "./lib/allowlist.mjs";

// Entradas registry-only conhecidas (meia-registro pré-existente). Cada uma com
// justificativa. Remover daqui ao registrar o provider em providers.ts.
export const KNOWN_REGISTRY_ONLY: Record<string, string> = {};

/**
 * Providers canônicos com serviceKinds llm que LEGITIMAMENTE não têm entrada no
 * REGISTRY. Cada um roteia via baseUrl de conexão (providerSpecificData.baseUrl) ou
 * executor especializado, então a ausência de registro não é órfão.
 */
export const KNOWN_CATALOG_ONLY: Record<string, string> = {
  "amazon-q": "OAuth/IDE provider roteado via KiroExecutor sem entrada de registry.",
  zed: "OAuth/IDE provider (Zed) roteado via executor especializado; sem entrada de registry.",
  piapi: "Gateway OpenAI-compatible roteado via baseUrl de conexão.",
  getgoapi: "Gateway OpenAI-compatible roteado via baseUrl de conexão.",
  laozhang: "Gateway OpenAI-compatible roteado via baseUrl de conexão.",
  thebai: "Gateway OpenAI-compatible roteado via baseUrl de conexão.",
  fenayai: "Gateway OpenAI-compatible roteado via baseUrl de conexão.",
  empower: "Gateway OpenAI-compatible roteado via baseUrl de conexão.",
  "arcee-ai": "API-key provider roteado via baseUrl de conexão.",
  "azure-openai": "Azure OpenAI roteado via AzureOpenAIExecutor + baseUrl de conexão.",
  "azure-ai": "Azure AI Foundry roteado via AzureAiExecutor + baseUrl de conexão.",
  watsonx: "Enterprise provider roteado via baseUrl de conexão.",
  oci: "OCI Generative AI roteado via baseUrl de conexão.",
  sap: "SAP AI Core roteado via baseUrl de conexão.",
  datarobot: "Enterprise provider roteado via baseUrl de conexão.",
  clarifai: "Clarifai PAT roteado via baseUrl de conexão.",
  "360ai": "Regional provider roteado via baseUrl de conexão.",
  gitlab: "GitLab (non-Duo) roteado via executor especializado + baseUrl de conexão.",
  "poe-web": "Web/cookie provider roteado via executor especializado (PoeWebExecutor).",
  "venice-web": "Web/cookie provider roteado via executor especializado (VeniceWeb).",
  "v0-vercel-web": "Web/cookie provider roteado via executor especializado (V0VercelWeb).",
  "gemini-business": "Enterprise Gemini roteado via executor especializado + baseUrl de conexão.",
  "ollama-local": "Local provider (Ollama) roteado via baseUrl de conexão; sem registry.",
  "lm-studio": "Local provider (LM Studio) roteado via baseUrl de conexão.",
  vllm: "Local provider (vLLM) roteado via baseUrl de conexão.",
  lemonade: "Local provider roteado via baseUrl de conexão.",
  llamafile: "Local provider roteado via baseUrl de conexão.",
  "llama-cpp": "Local provider roteado via baseUrl de conexão.",
  triton: "Local provider (Triton) roteado via baseUrl de conexão.",
  "docker-model-runner": "Local provider roteado via baseUrl de conexão.",
  xinference: "Local provider (XInference) roteado via baseUrl de conexão.",
  oobabooga: "Local provider (Oobabooga) roteado via baseUrl de conexão.",
};

/** Ids do REGISTRY que não são providers canônicos e não estão na allowlist. */
export function findOrphanRegistryIds(
  registryIds: string[],
  isKnownProvider: (id: string) => boolean,
  allowlist: Record<string, string>
): string[] {
  return registryIds.filter((id) => !isKnownProvider(id) && !(id in allowlist));
}

/**
 * Providers canônicos com serviceKinds llm sem entrada no REGISTRY e fora da
 * allowlist — metade de um provider:remove (registro apagado, catálogo esquecido).
 */
export function findCatalogOnlyLlmProviders(
  canonicalProviders: Record<string, { serviceKinds?: string[] }>,
  registryIds: string[],
  allowlist: Record<string, string>
): string[] {
  const registry = new Set(registryIds);
  return Object.entries(canonicalProviders)
    .filter(([id, p]) => {
      if (registry.has(id) || id in allowlist) return false;
      return Array.isArray(p.serviceKinds) && p.serviceKinds.includes("llm");
    })
    .map(([id]) => id);
}

function main(): void {
  const canonical = new Set(Object.keys(AI_PROVIDERS));
  const isKnown = (id: string) => canonical.has(id) || Boolean(getProviderById(id));

  // Live orphans BEFORE allowlist filtering (needed for stale-enforcement).
  const liveOrphans = Object.keys(REGISTRY).filter((id) => !isKnown(id));
  assertNoStale(Object.keys(KNOWN_REGISTRY_ONLY), liveOrphans, "provider-consistency");

  const orphans = liveOrphans.filter((id) => !(id in KNOWN_REGISTRY_ONLY));
  if (orphans.length) {
    console.error(
      `[provider-consistency] ${orphans.length} entrada(s) no REGISTRY sem provider canônico em providers.ts:\n` +
        orphans.map((id) => `  ✗ ${id}`).join("\n") +
        `\n  → registre o provider em src/shared/constants/providers.ts ou adicione a KNOWN_REGISTRY_ONLY (scripts/check/check-provider-consistency.ts) com justificativa.`
    );
    process.exitCode = 1;
  }
  // Reverse walk: llm-kind canonical provider sem REGISTRY = órfão reverso.
  const catalogOnlyLlm = findCatalogOnlyLlmProviders(
    AI_PROVIDERS as Record<string, { serviceKinds?: string[] }>,
    Object.keys(REGISTRY),
    KNOWN_CATALOG_ONLY
  );
  if (catalogOnlyLlm.length) {
    console.error(
      `[provider-consistency] ${catalogOnlyLlm.length} provider(s) canônico(s) llm sem entrada no REGISTRY:\n` +
        catalogOnlyLlm.map((id) => `  ✗ ${id}`).join("\n") +
        `\n  → registre o provider em open-sse/config/providers/registry/<id>/ ou adicione a KNOWN_CATALOG_ONLY (scripts/check/check-provider-consistency.ts) com justificativa — órfão reverso de um provider:remove incompleto?`
    );
    process.exitCode = 1;
  }

  if (!process.exitCode) {
    console.log(
      `[provider-consistency] OK — ${Object.keys(REGISTRY).length} entradas REGISTRY, ${canonical.size} providers canônicos, ${Object.keys(KNOWN_REGISTRY_ONLY).length} exceção(ões) registry-only, ${Object.keys(KNOWN_CATALOG_ONLY).length} catalog-only`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
