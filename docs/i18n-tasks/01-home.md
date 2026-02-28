# Task 01 — Home Page (Dashboard)

**Status:** `[ ]` Não iniciado  
**Namespace JSON:** `home`

## Arquivos
| Arquivo | Linhas | Strings |
|---------|--------|---------|
| `src/app/(dashboard)/dashboard/page.tsx` | 17 | 0 (wrapper) |
| `src/app/(dashboard)/dashboard/HomePageClient.tsx` | 500 | ~25 |

## Strings a Traduzir

### HomePageClient.tsx
| Linha | String EN | Chave i18n | String PT-BR |
|-------|-----------|------------|--------------|
| 138 | "Quick Start" | `home.quickStart` | "Início Rápido" |
| 242 | "Providers Overview" | `home.providersOverview` | "Visão Geral dos Provedores" |
| 436 | "No models available for this provider." | `home.noModelsAvailable` | "Nenhum modelo disponível para este provedor." |
| — | "Total Requests" | `home.totalRequests` | "Total de Requisições" |
| — | "Active Providers" | `home.activeProviders` | "Provedores Ativos" |
| — | "Success Rate" | `home.successRate` | "Taxa de Sucesso" |
| — | "Avg Latency" | `home.avgLatency` | "Latência Média" |
| — | "Configure Endpoint" | `home.configureEndpoint` | "Configurar Endpoint" |
| — | "Add Provider" | `home.addProvider` | "Adicionar Provedor" |
| — | "View Docs" | `home.viewDocs` | "Ver Documentação" |
| — | "Copied!" | `common.copied` | ✅ já existe |
| — | "requests" | `home.requests` | "requisições" |
| — | "models" | `home.models` | "modelos" |
| — | "accounts" | `home.accounts` | "contas" |

## Checklist
- [ ] Adicionar chaves no `en.json` (namespace `home`)
- [ ] Adicionar traduções no `pt-BR.json`
- [ ] Substituir strings por `t()` no `HomePageClient.tsx`
- [ ] Testar em EN e PT-BR
