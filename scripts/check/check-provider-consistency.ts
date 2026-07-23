#!/usr/bin/env node
// scripts/check/check-provider-consistency.ts
// Gate anti-alucinação nº1: toda entrada em REGISTRY (open-sse/config/providerRegistry.ts)
// deve corresponder a um provider canônico em src/shared/constants/providers.ts.
// Pega entradas de registry inventadas/meia-registradas (provider com baseUrl+models
// mas ausente da lista canônica → não selecionável pela máquina normal de providers).
// Catraca: exceções pré-existentes ficam em KNOWN_REGISTRY_ONLY; só NOVOS órfãos falham.
// Stale-enforcement (6A.3): entrada em KNOWN_REGISTRY_ONLY que não suprime nenhum órfão
// real → gate falha com instrução de remoção (evita furo de regressão silencioso).
import { pathToFileURL } from "node:url";
import { AI_PROVIDERS, getProviderById } from "@/shared/constants/providers.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { assertNoStale } from "./lib/allowlist.mjs";

// Entradas registry-only conhecidas (meia-registro pré-existente). Cada uma com
// justificativa. Remover daqui ao registrar o provider em providers.ts.
export const KNOWN_REGISTRY_ONLY: Record<string, string> = {};

/** Ids do REGISTRY que não são providers canônicos e não estão na allowlist. */
export function findOrphanRegistryIds(
  registryIds: string[],
  isKnownProvider: (id: string) => boolean,
  allowlist: Record<string, string>
): string[] {
  return registryIds.filter((id) => !isKnownProvider(id) && !(id in allowlist));
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
  if (!process.exitCode) {
    console.log(
      `[provider-consistency] OK — ${Object.keys(REGISTRY).length} entradas REGISTRY, ${canonical.size} providers canônicos, ${Object.keys(KNOWN_REGISTRY_ONLY).length} exceção(ões) conhecida(s)`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
