---
title: "Dokumentacja OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Dokumentacja OmniRoute

Nawigowalny indeks zestawu dokumentacji OmniRoute. Tematy są pogrupowane według celu, abyś szybko znalazł to, czego potrzebujesz.

> Szukasz przeglądu projektu, kroków instalacji lub informacji o wydaniach? Zobacz główne pliki [README.md](../README.md), [CHANGELOG.md](../CHANGELOG.md) oraz [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Dla użytkowników nietechnicznych

Proste przewodniki po korzystaniu z OmniRoute — bez wymaganej wiedzy technicznej.

### getting-started/

- [QUICK-START.md](getting-started/QUICK-START.md) — zainstaluj i uruchom OmniRoute w 3 minuty.
- [AUTO-COMBO-GUIDE.md](getting-started/AUTO-COMBO-GUIDE.md) — pozwól OmniRoute wybrać dla Ciebie najlepsze AI.
- [PROVIDERS-GUIDE.md](getting-started/PROVIDERS-GUIDE.md) — jak podłączyć dostawców AI.
- [FREE-TIERS-GUIDE.md](getting-started/FREE-TIERS-GUIDE.md) — darmowe AI bez karty kredytowej.
- [TROUBLESHOOTING.md](getting-started/TROUBLESHOOTING.md) — rozwiązywanie typowych problemów.

### guides/

- [SETUP_GUIDE.md](guides/SETUP_GUIDE.md) — pierwsza konfiguracja OmniRoute.
- [USER_GUIDE.md](guides/USER_GUIDE.md) — codzienne korzystanie z panelu i API.
- [FEATURES.md](guides/FEATURES.md) — galeria funkcji panelu.
- [TIERS.md](guides/TIERS.md) — poziomy OmniRoute wyjaśnione (przewodnik użytkownika).
- [USAGE_QUOTA_GUIDE.md](guides/USAGE_QUOTA_GUIDE.md) — śledzenie użycia, limitów (quota) i wydatków.
- [COST_TRACKING.md](guides/COST_TRACKING.md) — śledzenie kosztów i wydatków.
- [FREE_PROVIDER_RANKINGS.md](guides/FREE_PROVIDER_RANKINGS.md) — rankingi darmowych dostawców (Arena ELO).
- [DOCKER_GUIDE.md](guides/DOCKER_GUIDE.md) — uruchamianie OmniRoute w Dockerze.
- [ELECTRON_GUIDE.md](guides/ELECTRON_GUIDE.md) — buildy desktopowe (Electron).
- [TERMUX_GUIDE.md](guides/TERMUX_GUIDE.md) — uruchamianie na Androidzie przez Termux.
- [PWA_GUIDE.md](guides/PWA_GUIDE.md) — instalacja panelu jako PWA.
- [REMOTE-MODE.md](guides/REMOTE-MODE.md) — udostępnianie OmniRoute zdalnie + tokeny z zakresem (scoped tokens).
- [CLI-INTEGRATIONS.md](guides/CLI-INTEGRATIONS.md) — główna tabela integracji CLI `setup-*`.
- [CLAUDE-CODE-CONFIGURATION.md](guides/CLAUDE-CODE-CONFIGURATION.md) — Claude Code CLI z OmniRoute.
- [CODEX-CLI-CONFIGURATION.md](guides/CODEX-CLI-CONFIGURATION.md) — Codex CLI z OmniRoute.
- [KIRO_SETUP.md](guides/KIRO_SETUP.md) — konfiguracja Kiro.
- [I18N.md](guides/I18N.md) — workflow tłumaczeń i locale.
- [TROUBLESHOOTING.md](guides/TROUBLESHOOTING.md) — szczegółowa referencja rozwiązywania problemów.
- [UNINSTALL.md](guides/UNINSTALL.md) — czyste usuwanie instalacji.

---

## Dla użytkowników technicznych

Dokumentacja techniczna dla deweloperów i współtwórców.

## architecture/

Jak zbudowany jest system — przeczytaj te materiały, aby zrozumieć runtime, układ kodu i model odporności.

- [ARCHITECTURE.md](architecture/ARCHITECTURE.md) — wysokopoziomowa architektura systemu (potok żądań, warstwy, moduły).
- [CODEBASE_DOCUMENTATION.md](architecture/CODEBASE_DOCUMENTATION.md) — referencja inżynierska bazy kodu.
- [REPOSITORY_MAP.md](architecture/REPOSITORY_MAP.md) — przewodnik nawigacji katalog po katalogu.
- [AUTHZ_GUIDE.md](architecture/AUTHZ_GUIDE.md) — potok autoryzacji (klasyfikator tras + silnik polityk).
- [RESILIENCE_GUIDE.md](architecture/RESILIENCE_GUIDE.md) — circuit breaker dostawcy, cooldown połączeń i lockout modeli.
- [QUALITY_GATES.md](architecture/QUALITY_GATES.md) — inwentarz skryptów bramek jakości i jobów CI.
- [MONITORING_SECTIONS.md](architecture/MONITORING_SECTIONS.md) — nawigacja panelu monitoringu/kosztów.
- [cluster-decisions.md](architecture/cluster-decisions.md) — opcjonalne decyzje profili sidecar/klaster.

## reference/

Materiały referencyjne — powierzchnia API, zmienne środowiskowe, flagi CLI, katalog dostawców.

- [API_REFERENCE.md](reference/API_REFERENCE.md) — endpointy REST API i kształty danych.
- [PROVIDER_REFERENCE.md](reference/PROVIDER_REFERENCE.md) — automatycznie generowany katalog dostawców (nie edytuj ręcznie).
- [PROVIDER_PLUGIN_MANIFEST.md](reference/PROVIDER_PLUGIN_MANIFEST.md) — kontrakt wtyczki dostawcy bezpieczny dla sidecarów przy migracji Bifrost i CLIProxyAPI.
- [openapi.yaml](openapi.yaml) — specyfikacja OpenAPI publicznego API.
- [ENVIRONMENT.md](reference/ENVIRONMENT.md) — referencja zmiennych środowiskowych.
- [FEATURE_FLAGS.md](reference/FEATURE_FLAGS.md) — flagi funkcji i ich wartości domyślne.
- [CLI-TOOLS.md](reference/CLI-TOOLS.md) — dołączone polecenia CLI.
- [FREE_TIERS.md](reference/FREE_TIERS.md) — katalog darmowych poziomów dostawców LLM.

## frameworks/

Podsystemy wtykowe udostępniane klientom, agentom i operatorom.

- [MCP-SERVER.md](frameworks/MCP-SERVER.md) — serwer Model Context Protocol.
- [A2A-SERVER.md](frameworks/A2A-SERVER.md) — serwer Agent-to-Agent (A2A) JSON-RPC.
- [ACP.md](frameworks/ACP.md) — Agent Client Protocol.
- [AGENT_PROTOCOLS_GUIDE.md](frameworks/AGENT_PROTOCOLS_GUIDE.md) — przegląd agentów A2A / ACP / Cloud.
- [AGENTBRIDGE.md](frameworks/AGENTBRIDGE.md) — most agenta IDE.
- [AGENT-SKILLS.md](frameworks/AGENT-SKILLS.md) — katalog umiejętności agentów.
- [CLOUD_AGENT.md](frameworks/CLOUD_AGENT.md) — runtime i dostawcy cloud agent.
- [SKILLS.md](frameworks/SKILLS.md) — framework Skills (piaskownicowe rozszerzenie).
- [MEMORY.md](frameworks/MEMORY.md) — trwała pamięć (FTS5 + Qdrant).
- [WEBHOOKS.md](frameworks/WEBHOOKS.md) — zdarzenia webhook i dyspozycja.
- [EVALS.md](frameworks/EVALS.md) — zestawy ewaluacji.
- [GAMIFICATION.md](frameworks/GAMIFICATION.md) — system grywalizacji i rankingów.
- [EMBEDDED-SERVICES.md](frameworks/EMBEDDED-SERVICES.md) — wbudowane usługi sidecar (9Router, CLIProxyAPI).
- [NOTION_CONTEXT.md](frameworks/NOTION_CONTEXT.md) — źródło kontekstu Notion.
- [OBSIDIAN_CONTEXT.md](frameworks/OBSIDIAN_CONTEXT.md) — źródło kontekstu Obsidian.
- [OPENCODE.md](frameworks/OPENCODE.md) — integracja OpenCode.
- [OPEN_SSE_ARCHITECTURE.md](frameworks/OPEN_SSE_ARCHITECTURE.md) — wnętrze silnika streamingu open-sse.
- [PLAYGROUND_STUDIO.md](frameworks/PLAYGROUND_STUDIO.md) — UI Playground Studio.
- [SEARCH_TOOLS_STUDIO.md](frameworks/SEARCH_TOOLS_STUDIO.md) — UI Search Tools Studio.
- [TRAFFIC_INSPECTOR.md](frameworks/TRAFFIC_INSPECTOR.md) — inspector ruchu (MITM).
- [PLUGINS.md](frameworks/PLUGINS.md) — przegląd systemu wtyczek CLI.
- [PLUGIN_SDK.md](frameworks/PLUGIN_SDK.md) — referencja SDK wtyczek.
- [PLUGIN_MARKETPLACE.md](frameworks/PLUGIN_MARKETPLACE.md) — marketplace wtyczek.

## routing/

Routing combo, scorowanie i replay.

- [AUTO-COMBO.md](routing/AUTO-COMBO.md) — Auto-Combo (scorowanie wieloczynnikowe, 17 strategii).
- [QUOTA_SHARE.md](routing/QUOTA_SHARE.md) — silnik współdzielenia limitów (quota).
- [REASONING_REPLAY.md](routing/REASONING_REPLAY.md) — cache replay rozumowania (reasoning).

## security/

Guardrails, zgodność (compliance), stealth oraz obowiązkowe wzorce obsługi publicznych poświadczeń i komunikatów błędów.

- [GUARDRAILS.md](security/GUARDRAILS.md) — guardrails PII, prompt injection, vision.
- [COMPLIANCE.md](security/COMPLIANCE.md) — ścieżki audytu i zgodność.
- [STEALTH_GUIDE.md](security/STEALTH_GUIDE.md) — stealth TLS / fingerprint.
- [PUBLIC_CREDS.md](security/PUBLIC_CREDS.md) — **obowiązkowy** wzorzec osadzania publicznych upstreamowych OAuth client_id/secret + kluczy Firebase Web bez uruchamiania skanerów sekretów.
- [ERROR_SANITIZATION.md](security/ERROR_SANITIZATION.md) — **obowiązkowy** wzorzec kierowania każdej odpowiedzi błędu przez `sanitizeErrorMessage`, aby zapobiec ujawnieniu stack-trace.
- [ROUTE_GUARD_TIERS.md](security/ROUTE_GUARD_TIERS.md) — poziomy klasyfikacji route-guard.
- [CLI_TOKEN.md](security/CLI_TOKEN.md) — auth tokenu machine-ID CLI (HMAC + legacy SHA-256).
- [EGRESS_POLICY.md](security/EGRESS_POLICY.md) — polityka rodziny IP egress (IPv4/IPv6).
- [MITM-TPROXY-DECRYPT.md](security/MITM-TPROXY-DECRYPT.md) — przezroczyste deszyfrowanie MITM.
- [SUPPLY_CHAIN.md](security/SUPPLY_CHAIN.md) — bramki łańcucha dostaw (SLSA, SBOM, Trivy, osv-scanner, Scorecard).
- [SOCKET_DEV_FINDINGS.md](security/SOCKET_DEV_FINDINGS.md) — atestacje ustaleń łańcucha dostaw.

## compression/

Silniki kompresji promptów, reguły i pakiety językowe.

- [COMPRESSION_GUIDE.md](compression/COMPRESSION_GUIDE.md) — ogólny przegląd kompresji.
- [COMPRESSION_ENGINES.md](compression/COMPRESSION_ENGINES.md) — dostępne silniki kompresji.
- [COMPRESSION_RULES_FORMAT.md](compression/COMPRESSION_RULES_FORMAT.md) — format pliku reguł.
- [COMPRESSION_LANGUAGE_PACKS.md](compression/COMPRESSION_LANGUAGE_PACKS.md) — pakiety językowe.
- [RTK_COMPRESSION.md](compression/RTK_COMPRESSION.md) — dogłębna analiza silnika RTK.
- [CONTEXT_EDITING.md](compression/CONTEXT_EDITING.md) — delegowana edycja kontekstu (Anthropic).
- [EXTENDING_COMPRESSION.md](compression/EXTENDING_COMPRESSION.md) — dodawanie własnego silnika kompresji.

## providers/

Przewodniki integracji specyficzne dla dostawców.

- [CLAUDE_WEB.md](providers/CLAUDE_WEB.md) — dostawca Claude Web (cookie-auth).
- [AGENTROUTER.md](providers/AGENTROUTER.md) — konfiguracja AgentRouter.
- [ZED-DOCKER.md](providers/ZED-DOCKER.md) — integracja Zed IDE w Dockerze.

## comparison/

- [OMNIROUTE_VS_ALTERNATIVES.md](comparison/OMNIROUTE_VS_ALTERNATIVES.md) — jak OmniRoute wypada na tle alternatyw.

## ops/

Wydania, wdrożenia, proxy, tunele, pokrycie testami, baza danych, monitoring.

- [RELEASE_CHECKLIST.md](ops/RELEASE_CHECKLIST.md) — checklista procesu wydania.
- [RELEASE_GREEN.md](ops/RELEASE_GREEN.md) — utrzymywanie kolejki PR i gałęzi wydania w stanie green.
- [QUALITY_GATE_PLAYBOOK.md](ops/QUALITY_GATE_PLAYBOOK.md) — playbook bramek jakości.
- [BRANCH_PROTECTION_MAIN.md](ops/BRANCH_PROTECTION_MAIN.md) — ochrona gałęzi `main`.
- [COVERAGE_PLAN.md](ops/COVERAGE_PLAN.md) — plan pokrycia testami.
- [DATABASE_GUIDE.md](ops/DATABASE_GUIDE.md) — schemat DB i operacje.
- [SQLITE_RUNTIME.md](ops/SQLITE_RUNTIME.md) — łańcuch rozwiązywania sterownika SQLite.
- [MONITORING_GUIDE.md](ops/MONITORING_GUIDE.md) — monitoring i obserwowalność.
- [FLY_IO_DEPLOYMENT_GUIDE.md](ops/FLY_IO_DEPLOYMENT_GUIDE.md) — wdrożenie na Fly.io.
- [VM_DEPLOYMENT_GUIDE.md](ops/VM_DEPLOYMENT_GUIDE.md) — generyczne wdrożenie na VM.
- [PROXY_GUIDE.md](ops/PROXY_GUIDE.md) — konfiguracja proxy upstream.
- [TUNNELS_GUIDE.md](ops/TUNNELS_GUIDE.md) — Cloudflare tunnel i pokrewne.

## diagrams/

Źródła Mermaid oraz wyeksportowane diagramy SVG/PNG przywoływane w powyższej dokumentacji. Zobacz [diagrams/README.md](diagrams/README.md).

## i18n/

Przetłumaczone lustrzane kopie dokumentacji w 43 locale. Listę obsługiwanych języków znajdziesz w [i18n/README.md](i18n/README.md).

## screenshots/

Statyczne zrzuty ekranu używane przez panel i README. Nie stanowią części treści dokumentacji.

---

## Artefakty generowane automatycznie

- [reference/PROVIDER_REFERENCE.md](reference/PROVIDER_REFERENCE.md) jest generowany przez `scripts/docs/gen-provider-reference.ts` z `src/shared/constants/providers.ts`. Nie edytuj ręcznie.
- UI `/docs` jest oparte na generowaniu źródeł Fumadocs MDX z powyższych podfolderów.
