# FASE 08 — LLM Proxy: Recursos Avançados

> **Prioridade:** 🟡 Moderado  
> **Estimativa de Complexidade:** Alta (6–10 dias)  
> **Dimensões do Relatório:** D8 (LLM Proxy, Gateway e Router)  
> **Dependências:** FASE-04 (circuit breaker e error codes como base), FASE-03 (domain layer)

---

## Objetivo

Implementar funcionalidades avançadas de roteamento LLM: policy engine declarativo, cache de respostas, framework de avaliação de modelos, e controles de compliance/privacidade para amadurecer o OmniRoute como gateway de produção.

---

## Escopo Detalhado

### 8.1 — Policy Engine Declarativo

**Origem no relatório:** D8 — Sem Policy Engine Separado (🔴 Crítico)

#### Especificação Técnica

- **Criar** `src/lib/policies/policyEngine.js`:
  - Carregar políticas de um arquivo JSON/YAML ou do DB (tabela `policies`).
  - Suportar regras declarativas:
    ```json
    {
      "name": "prefer-low-cost",
      "conditions": { "model_pattern": "gpt-4*" },
      "actions": { "prefer_provider": ["openai", "gemini"], "max_cost_per_1k": 0.03 }
    }
    ```
  - Tipos de política: `routing` (preferência de provider), `budget` (limite de custo), `access` (allow/deny models).
- **Integrar** no pipeline antes de `getProviderCredentials()` em `sse/handlers/chat.js`.
- **Criar** API endpoints:
  - `GET /api/policies` — Listar políticas.
  - `POST /api/policies` — Criar política.
  - `PUT /api/policies/:id` — Atualizar política.
  - `DELETE /api/policies/:id` — Remover política.
- **Criar** tela de gerenciamento no dashboard.

#### Critérios de Aceite

- [ ] Políticas de routing influenciam seleção de provider.
- [ ] Políticas de budget limitam custo por request/dia/mês.
- [ ] Políticas de access permitem bloquear modelos específicos.
- [ ] Políticas são CRUD via API e dashboard.
- [ ] Testes unitários cobrem avaliação de políticas.

---

### 8.2 — Cache Layer para Prompts e Respostas

**Origem no relatório:** D8 — Sem Cache de Prompts/Respostas (🟠 Importante)

#### Especificação Técnica

- **Criar** `src/lib/cacheLayer.js`:
  - Cache LRU in-memory (usando `lru-cache` ou implementação própria).
  - Cache key: hash do `{ model, messages, temperature, max_tokens }`.
  - TTL configurável (default: 5 minutos).
  - Toggle via settings: `ENABLE_PROMPT_CACHE=true/false`.
- **Integrar** no pipeline:
  - Antes de `executeProviderRequest()`: verificar cache hit.
  - Após resposta bem sucedida: armazenar no cache (apenas non-streaming OU primeiro chunk).
- **Métricas**: cache hit rate exposta via `/api/cache/stats`.
- **Bypass**: header `x-no-cache: true` para forçar request fresh.

#### Critérios de Aceite

- [ ] Requests idênticos retornam resposta cached.
- [ ] Cache hit rate mensurável via endpoint.
- [ ] Header `x-no-cache` funciona.
- [ ] Cache não interfere com streaming SSE.
- [ ] TTL configurável via env/settings.

---

### 8.3 — Framework de Evals por Modelo

**Origem no relatório:** D8 — Governança de Qualidade de Modelos (🟡 Moderado)

#### Especificação Técnica

- **Criar** `src/lib/evals/evalRunner.js`:
  - Definir golden set de prompts/respostas esperadas.
  - Executar avaliação periódica (manual ou cron) contra cada modelo.
  - Métricas: accuracy, latência p50/p95, custo por prompt.
- **Criar** `src/lib/evals/goldenSet.json` com ≥ 10 test cases:
  - Cases de completamento, raciocínio, código, tradução.
- **Criar** endpoint `/api/evals/run` — Trigger manual.
- **Criar** endpoint `/api/evals/results` — Resultados por modelo.
- **Criar** tela de resultados no dashboard.

#### Critérios de Aceite

- [ ] Golden set com ≥ 10 test cases.
- [ ] Eval runner executa contra todos os modelos ativos.
- [ ] Resultados armazenados com timestamp para comparação temporal.
- [ ] Dashboard exibe scorecard por modelo.

---

### 8.4 — Compliance e Controles de Privacidade

**Origem no relatório:** D8 — Compliance e Privacidade (🟡 Moderado)

#### Especificação Técnica

- **Implementar** política de retenção de dados:
  - Setting global `LOG_RETENTION_DAYS` (default: 30).
  - Job de limpeza automática (cron ou on-request).
- **Implementar** opt-out de logging por rota/API key:
  - Campo `noLog: true` nos metadata da API key.
  - Requests com `noLog` não geram call logs.
- **Implementar** trilha de auditoria básica:
  - Tabela `audit_log` com: timestamp, action, actor, target, details.
  - Ações logadas: login, settings change, provider add/remove, password reset.
- **Documentar** compliance capabilities no README e landing page.

#### Critérios de Aceite

- [ ] Logs mais antigos que `LOG_RETENTION_DAYS` são removidos automaticamente.
- [ ] API keys com `noLog: true` não geram registros.
- [ ] Tabela `audit_log` registra ações administrativas.
- [ ] Documentação descreve compliance capabilities.

---

## Pré-Requisitos

- FASE-04 (circuit breaker e error codes estabelecidos).
- FASE-03 (domain layer para regras de políticas).
- Dashboard funcional para telas novas.

## Entregáveis

1. Policy engine com CRUD de políticas.
2. Cache layer com métricas.
3. Framework de evals com golden set.
4. Controles de retenção, opt-out, e auditoria.

## Critérios de Conclusão da Fase

- [ ] Políticas influenciam roteamento.
- [ ] Cache funcional com métricas.
- [ ] Evals executavelmente contra ≥ 3 modelos.
- [ ] Retenção automática ativa.

## Riscos Identificados

| Risco                                  | Probabilidade | Impacto | Mitigação                                          |
| -------------------------------------- | ------------- | ------- | -------------------------------------------------- |
| Policy engine complexidade excessiva   | Alta          | Alto    | MVP com 3 tipos de policy apenas                   |
| Cache stale causa respostas incorretas | Média         | Alto    | TTL curto (5min) e bypass via header               |
| Evals custam tokens em providers pagos | Alta          | Médio   | Golden set pequeno; usar providers free para teste |
| Auditoria gera volume alto de dados    | Média         | Médio   | Retenção configurável; summarize após 90 dias      |
