# Monitoring & Observability Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: O OmniRoute inclui monitorização de estado, piloto automático de fornecedores, acompanhamento de quotas e hooks de observabilidade integrados. Este guia aborda o dashboard, os alertas e a resolução de problemas.

**Fontes:**

- `src/lib/monitoring/observability.ts` — instantâneo de observabilidade
- `src/lib/monitoring/comboHealthAutopilot.ts` — piloto automático do estado das combinações
- `src/lib/monitoring/providerHealthAutopilot.ts` — piloto automático dos fornecedores
- `src/lib/monitoring/providerHealthMatrix.ts` — matriz de estado dos fornecedores
- `src/lib/localHealthCheck.ts` — verificação de estado local
- `src/lib/tokenHealthCheck.ts` — estado da renovação de tokens
- `src/lib/proxyHealth.ts` — cache do estado do proxy (abordado em PROXY_GUIDE.md)

---

## Visão geral

O OmniRoute tem **3 camadas de monitorização**:

```
┌──────────────────────────────────────────────────────────────┐
│  Camada 1: Estado do sistema (ao nível do servidor)           │
│  ├─ localHealthCheck.ts — BD, portas, dependências nativas    │
│  ├─ db/healthCheck.ts — integridade, FK, artefactos órfãos    │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Camada 2: Estado dos fornecedores (resiliência por fornecedor)│
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowns   │
│  ├─ providerHealthMatrix.ts — pontuações por fornecedor/modelo│
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Camada 3: Observabilidade em tempo real (instantâneos runtime)│
│  ├─ observability.ts — circuit breakers, sessões, quota       │
│  ├─ tokenHealthCheck.ts — estado da renovação de tokens OAuth │
│  └─ Ferramentas MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Páginas do dashboard

### `/dashboard/health` (Estado do sistema)

O dashboard principal de estado apresenta:

| Secção                     | O que apresenta                                          |
| -------------------------- | -------------------------------------------------------- |
| **Estado do servidor**     | Tempo de atividade, versão, porta, ligações ativas       |
| **Base de dados**          | Ligação, integridade, tamanho do WAL, migrações recentes |
| **Resumo de fornecedores** | Número de ativos, saudáveis e circuit breakers abertos   |
| **Monitores de quota**     | Sessões ativas, com alertas e esgotadas                  |
| **Erros recentes**         | Últimos 10 erros com stack traces                        |
| **Utilização de recursos** | Memória, CPU, indicador de pressão do heap               |

### `/dashboard/providers` (Estado dos fornecedores)

Dashboard por fornecedor:

| Coluna     | Descrição                                                  |
| ---------- | ---------------------------------------------------------- |
| Fornecedor | ID do fornecedor + nome de apresentação                    |
| Estado     | Estado verde/amarelo/vermelho                              |
| Circuito   | Estado aberto/fechado/semiaberto                           |
| Ligações   | Número de ligações, última renovação                       |
| Modelos    | Modelos disponíveis, estado por modelo                     |
| Custo      | Custo de hoje, tendência dos últimos 7 dias                |
| Erros      | Número de erros nas últimas 24 h, principal classe de erro |

Clique num fornecedor para ver:

- Pedidos recentes com discriminação da latência
- Pontuações de estado por ligação
- Bloqueios por modelo
- Recomendações do piloto automático

### `/dashboard/quota` (Acompanhamento de quotas)

Para cada chave de API:

- Utilização atual em comparação com o limite (barra de progresso)
- Tendência da quota (gráfico de 30 dias)
- Hora da próxima reposição
- Histórico de alertas

### `/dashboard/combos` (Estado das combinações)

Por combinação:

- Estratégia + destinos
- Estado por destino
- Eventos de fallback recentes
- Taxa de sucesso (24 h, 7 d, 30 d)

---

## API de verificação de estado

O OmniRoute disponibiliza **duas** interfaces HTTP para verificação de estado. Não são intercambiáveis para orquestradores.

| Caminho                      | Finalidade                                                            | Peso                                            | Utilização                                                                 |
| ---------------------------- | --------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- |
| `GET /healthz`               | Atividade/prontidão do ciclo de vida (`ok` / `starting` / `stopping`) | Mínimo (apenas o indicador de fase)             | **Prontidão** do Kubernetes; **atividade** simples se tiver de usar HTTP   |
| `GET /api/monitoring/health` | Resumo detalhado do sistema + fornecedores (BD, heap, catálogos, …)   | Elevado (trabalho síncrono de BD/monitorização) | Painéis, verificações detalhadas blackbox, healthcheck integrado do Docker |

> **Nota:** As matrizes de estado dos fornecedores, os problemas do autopilot, os monitores de quotas, o estado dos tokens e os detalhes de latência para além de `/api/monitoring/health` estão disponíveis através da **ferramenta MCP** `observability_snapshot` ou das páginas do **painel** — não existem rotas REST dedicadas para esses dados.

Ambas as rotas são executadas no **mesmo ciclo de eventos do Node** que processa os pedidos. Um caminho que consuma intensivamente a CPU (trabalho num catálogo grande de `GET /v1/models`, compressão de contexto longo/contagem de tokens) pode atrasar **todos** os processadores HTTP, incluindo `/healthz`. Ciclo de eventos ocupado ≠ processo inativo. É preferível corrigir o processo que monopoliza os recursos; ajustar as sondas apenas reduz encerramentos incorretos.

### Sonda leve para orquestradores

```bash
GET /healthz
# ou HEAD /healthz
```

- **200** + corpo `ok` quando a fase do ciclo de vida do servidor está pronta
- **503** + `starting` / `stopping` durante o arranque ou o encerramento
- Implementação: `src/app/healthz/route.ts` (sem ping à BD)

### Estado do sistema (detalhado)

```bash
GET /api/monitoring/health
```

Resposta:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: cache de sondas vs `test_status` do SQLite

`GET /api/monitoring/health` → `credentialHealth` é o **indicador da cache de sondas em memória**,
não uma exportação em tempo real de `provider_connections.test_status`. Após a #12532, o
caminho do pedido lê apenas `getCachedCredentialHealthSummary()`; as sondas em segundo plano
atualizam a cache fora do ciclo de eventos.

| Camada                         | Onde                                                                  | O que significa                                                                                                                                                                                                              |
| ------------------------------ | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Indicador da cache de sondas   | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Resultados mais recentes das sondas de estado das credenciais ainda mantidos na memória do processo. `source` é sempre `probe-cache`.                                                                                        |
| Detalhes de ligações com falha | `credentialHealth.failedConnections`                                  | Presente **apenas quando `failed > 0`**. Lista limitada de linhas da cache com `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` sanitizados). `failedOmitted` é definido quando a lista foi limitada. |
| Estado persistente do SQLite   | `credentialHealth.staleDbNonOkCount`                                  | Número de linhas de ligações **ativas** (`is_active=1`) cujo `test_status` persistido é um valor conhecido diferente de ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                |

As duas camadas podem divergir intencionalmente:

- Indicador `failed=0` enquanto `staleDbNonOkCount>0` — o SQLite ainda contém um
  `test_status` persistente (por exemplo, `expired` ou `credits_exhausted`) que o instantâneo
  mais recente da cache de sondas não contabiliza como `status=error`.
- Indicador `failed>0` enquanto o SQLite aparenta estar saudável — uma sonda recente falhou e
  está em cache; a linha da BD não foi atualizada ou foi posteriormente limpa.

Não gere alertas apenas com base em `provider_connections.test_status` ao recolher dados deste
endpoint. Utilize `failed` + `failedConnections` para falhas de sondas em tempo real e
`staleDbNonOkCount` quando precisar da contagem persistida de estados persistentes.

### Recomendações de sondas para Kubernetes

O OmniRoute é um **único processo Node** (um ciclo de eventos). O `HEALTHCHECK` predefinido do Docker aponta para o endpoint leve `/healthz`. `/api/monitoring/health` é **demasiado pesado** para os intervalos de atividade do kubelet.

| Sonda                  | Alvo recomendado                                                                           | Notas                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Arranque**           | HTTP `GET /healthz` com um `failureThreshold` elevado (ou `startPeriod` longo)             | O arranque a frio + a migração do SQLite podem demorar mais do que alguns segundos                                                                                                                                                                                                                                                                                                                                                 |
| **Disponibilidade**    | HTTP `GET /healthz`                                                                        | Ciclo de vida `ok` / `starting` / `stopping` (200 vs 503). Continua a oscilar se o ciclo estiver bloqueado pela CPU. Uma resposta **200 que demore vários segundos não é saudável** (#10303) — significa que o ciclo de eventos ficou sem recursos antes de o processador de 3 bytes ser executado                                                                                                                                 |
| **Vitalidade**         | HTTP `GET /livez`, **ou TCP** na porta principal do serviço (`PORT`, predefinição `20128`) | `/livez` apenas indica que o processo está ativo (devolve sempre 200 se o processador for executado). Continua a partilhar o ciclo de eventos — ocupado ≠ morto, e não deteta o bloqueio do ciclo de eventos (#10303) melhor do que o TCP. Prefira **TCP** se as sondas HTTP excederem o tempo limite sob carga de catálogo/compressão; em qualquer dos casos, **não** termine o pod devido a breves bloqueios do ciclo de eventos |
| **Estado aprofundado** | `GET /api/monitoring/health` a partir de um verificador externo                            | Não se destina a `livenessProbe` do kubelet nem a `readinessProbe` com intervalos reduzidos                                                                                                                                                                                                                                                                                                                                        |

Exemplo de configuração (ajuste os limites à carga de arranque a frio e de compressão):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Durante um bloqueio do ciclo de eventos, o HTTP /livez pode ainda exceder
  # o tempo limite. O TCP é a alternativa conservadora:
  # tcpSocket:
  #   port: http
```

**Não** direcione a **sonda de vitalidade** do kubelet para `/api/monitoring/health`. Esse caminho realiza trabalho real de BD/monitorização e produzirá falsos positivos sob carga.

Relacionado: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sondas enquanto o ciclo de eventos está ocupado), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (consumo excessivo no cálculo de preços do catálogo), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (consumo excessivo na contagem de tokens de compressão).

### Trabalho opcional no percurso do pedido (memória, competências, atualização de tokens)

A extração de memória, a injeção de competências e a atualização de tokens OAuth partilham o **ciclo de eventos principal do Node** com `/healthz`. São funcionalidades ativáveis no painel (`memoryEnabled`, `skillsEnabled`), não um conjunto de workers. Consulte [Ambiente — custo do ciclo de eventos](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Estado dos fornecedores

> **Sem endpoint REST.** Os dados sobre o estado dos fornecedores estão disponíveis através da ferramenta MCP `observability_snapshot` ou da página `/dashboard/providers` do painel.

### Detalhes do fornecedor

> **Sem endpoint REST.** Os detalhes de cada fornecedor estão disponíveis através da página `/dashboard/providers` do painel.

---

## Piloto Automático de Estado dos Fornecedores

O módulo `providerHealthAutopilot.ts` é um **sistema autorrecuperável** que:

1. Deteta problemas nos fornecedores (circuito aberto, períodos de espera, bloqueios, avisos de quota)
2. Gera **ações recomendadas** para os resolver
3. Opcionalmente, **executa automaticamente** ações de baixo risco

### Tipos de Problemas Detetados

| Tipo de problema             | Gravidade  | Exemplo de condição                             |
| ---------------------------- | ---------- | ----------------------------------------------- |
| `provider_circuit_open`      | crítica    | Disjuntor aberto após 5 falhas                  |
| `provider_circuit_half_open` | aviso      | Circuito a testar a recuperação                 |
| `connection_cooldown`        | aviso      | Ligação em período de espera após um erro 429   |
| `stale_connection_error`     | aviso      | Última atualização falhou há mais de 30 minutos |
| `terminal_connection_error`  | crítica    | OAuth revogado, chave inválida                  |
| `inactive_connection`        | informação | Ligação desativada nas definições               |
| `model_lockout`              | aviso      | Modelo específico em quarentena                 |
| `quota_monitor_warning`      | aviso      | Utilização da quota igual ou superior a 80%     |

### Tipos de Ações Geradas

| Ação                           | Risco | Descrição                                  |
| ------------------------------ | ----- | ------------------------------------------ |
| `clear_provider_breaker`       | médio | Repor o disjuntor do circuito em fechado   |
| `clear_connection_cooldown`    | baixo | Remover o período de espera de uma ligação |
| `clear_stale_connection_error` | baixo | Limpar o indicador de erro obsoleto        |
| `clear_model_lockout`          | baixo | Reativar um modelo em quarentena           |
| `reactivate_connection`        | médio | Reativar uma ligação desativada            |
| `deactivate_connection`        | alto  | Desativar uma ligação problemática         |

### API

> **Sem endpoint REST.** Os problemas do piloto automático estão disponíveis através da ferramenta MCP `observability_snapshot` ou do painel. O piloto automático é executado internamente; o seu comportamento é configurado através da base de dados de definições (campo `autopilotMode` por ligação), e não através de variáveis de ambiente — `grep -rn` por uma variável de ambiente de modo de piloto automático não devolve resultados.

### Modo do Piloto Automático

Por predefinição, o piloto automático funciona em **modo manual** — deteta problemas e gera ações recomendadas, mas não as aplica automaticamente. As ações podem ser aplicadas através do painel.

---

## Piloto Automático de Estado das Combinações

`comboHealthAutopilot.ts` é o equivalente **específico para combinações** do piloto automático dos fornecedores. Este:

- Deteta combinações com problemas
- Recomenda a reordenação dos destinos
- Sugere a desativação de destinos com falhas
- Remove automaticamente destinos inoperacionais após N falhas

### Exemplos de Problemas em Combinações

```
Combinação "always-on" (estratégia de prioridade)
├─ Destino 1: openai/gpt-5 (saudável)
├─ Destino 2: anthropic/claude-opus-4-6 (⚠️ modelo bloqueado até às 14:00)
└─ Destino 3: kiro/claude-sonnet-4-5 (saudável)

Ação recomendada: Reordenar — mover kiro para cima de anthropic até o bloqueio expirar
```

---

## Monitores de Quota

`observability.ts` disponibiliza **monitores de quota por sessão** para fornecedores de subscrições (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Significado dos Estados

| Estado      | Quando                           | Ação da IU                                            |
| ----------- | -------------------------------- | ----------------------------------------------------- |
| `starting`  | Sondagem inicial em curso        | Indicador de carregamento                             |
| `idle`      | Sem atividade recente            | Oculto no painel                                      |
| `healthy`   | Mais de 50% da quota disponível  | Ponto verde                                           |
| `warning`   | Menos de 50% da quota disponível | Alerta amarelo                                        |
| `exhausted` | Quota = 0%                       | Bloco vermelho, encaminhar para o fornecedor seguinte |
| `error`     | Falha na sondagem                | Ponto vermelho, nova tentativa em breve               |

### API

> **Sem endpoint REST.** Os dados dos monitores de quota estão disponíveis através da ferramenta MCP `observability_snapshot` ou do painel.

---

## Instantâneo de Observabilidade

A ferramenta MCP `observability_snapshot` devolve um **instantâneo completo do sistema** para agentes de IA:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* ver acima */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Os agentes utilizam estes dados para tomar **decisões de encaminhamento** — por exemplo, "se o circuito da openai estiver aberto, encaminhar primeiro para a anthropic".

---

## Verificação do Estado dos Tokens

Os fornecedores OAuth (Claude Code, GitHub Copilot, Cursor) necessitam de uma **renovação periódica dos tokens**. `src/lib/tokenHealthCheck.ts` executa um agendador em segundo plano:

- **Ciclo de verificação**: a cada 60 segundos (verificação em `TICK_MS = 60 * 1000` em `src/lib/tokenHealthCheck.ts:30`)
- **Intervalo de verificação do estado por ligação**: 60 minutos por predefinição (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); configurável através da base de dados de definições
- **Renovação preventiva em caso de 401**: gerida pelo intercetor específico de cada ligação

### Estado dos Tokens

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Configuração

A configuração da verificação do estado dos tokens é gerida internamente por `tokenHealthCheck.ts`.

### Estado dos Tokens

> **Sem endpoint REST.** Os dados sobre o estado dos tokens estão disponíveis através do painel ou da ferramenta MCP `observability_snapshot`.

---

## Alertas

### Canais Integrados

O OmniRoute suporta **3 canais de alerta**:

| Canal           | Configuração   | Caso de utilização                 |
| --------------- | -------------- | ---------------------------------- |
| Faixa no painel | Sempre ativa   | Notificações na aplicação          |
| Webhook         | Configurar URL | Slack, Discord, PagerDuty          |
| Registo         | Predefinido    | Para agregação externa de registos |

### Configuração do Webhook

> **Nota:** A configuração dos alertas por webhook é gerida através da página Definições do painel. Consulte a interface de Definições para configurar o URL do webhook, a filtragem de eventos e a personalização da carga útil.

### Tipos de Alerta

| Alerta                       | Quando                                                      | Gravidade predefinida |
| ---------------------------- | ----------------------------------------------------------- | --------------------- |
| `provider_circuit_open`      | O circuito abre                                             | crítica               |
| `provider_circuit_half_open` | O circuito testa a recuperação                              | informativa           |
| `quota_warning`              | A quota atinge 80% ou mais                                  | aviso                 |
| `quota_exhausted`            | A quota atinge 100%                                         | crítica               |
| `token_refresh_failed`       | 3 ou mais falhas consecutivas de renovação                  | aviso                 |
| `token_expired`              | O token ultrapassa a data de validade                       | crítica               |
| `combo_target_unhealthy`     | O destino combinado permanece em espera durante 1 h ou mais | aviso                 |
| `db_integrity_warning`       | Violações de FK > 0                                         | aviso                 |
| `heap_pressure`              | Utilização da heap > 80% do limiar                          | aviso                 |

---

## Métricas de Desempenho

### Métricas Monitorizadas

| Métrica                 | Tipo       | Origem                          |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | contador   | `services/usage.ts`             |
| `request_latency_ms`    | histograma | `services/usage.ts`             |
| `tokens_consumed`       | contador   | `services/usage.ts`             |
| `cost_usd`              | contador   | `services/usage.ts`             |
| `provider_errors`       | contador   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | contador   | `services/resilience.ts`        |
| `cache_hits`            | contador   | `services/signatureCache.ts`    |
| `compression_savings`   | histograma | `services/compression/stats.ts` |
| `quota_used`            | medidor    | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | medidor    | `observability.ts`              |

### Percentis de Latência (p50/p95/p99)

> **Sem endpoint REST.** Os dados dos percentis de latência estão disponíveis na página `/dashboard/health` do painel. A exportação para Prometheus/OpenTelemetry está planeada para a v3.9.

### Exportação para Prometheus/OpenTelemetry (Fase 2)

Planeada para a v3.9: exportação nativa para Prometheus, OpenTelemetry e Datadog.

Por enquanto, recolha dados de `/api/monitoring/health` com qualquer sistema de monitorização baseado em HTTP (exportador blackbox do Prometheus, verificação HTTP do Datadog, etc.).

---

## Receitas de Alertas

### Slack

> **Nota:** Os alertas por webhook são configurados através da página Definições do painel — não existem variáveis de ambiente dedicadas a webhooks (`grep -rn` devolve zero resultados). Consulte a interface de Definições para configurar o URL do webhook, a filtragem de eventos e a personalização do payload.

### Discord

> Os alertas por webhook utilizam o mesmo fluxo da interface de Definições que o Slack. O Discord aceita o mesmo formato de payload JSON.

### PagerDuty

> Os alertas por webhook utilizam o mesmo fluxo da interface de Definições. As chaves de encaminhamento da API Events v2 do PagerDuty são configuradas na interface de Definições.

### Webhook Personalizado (JSON)

> Qualquer endpoint HTTP que aceite POST com um corpo JSON funcionará. Configure o URL na interface de Definições.

---

## Configuração do Painel

### Personalizar o Painel de Estado

Crie `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fixar um Fornecedor no Topo

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Resolução de Problemas

### "O fornecedor aparece como operacional, mas os pedidos falham"

1. Verifique os **problemas do piloto automático** — um modelo pode estar bloqueado
2. Consulte os **erros recentes** para identificar a classe de erro específica
3. Experimente o **teste de ligação** no cartão do fornecedor
4. Verifique se o fornecedor está **sujeito a limitação de taxa no serviço a montante** (não visível localmente)

### "A quota aparece como disponível, mas vejo erros 429"

- O erro 429 significa que o fornecedor indica que esgotou a sua quota
- O controlo de quotas do OmniRoute pode estar **desatualizado** — a informação do fornecedor a montante é a referência
- Os dados da quota são atualizados automaticamente através do monitor interno de quotas

### "A combinação está a falhar, mas todos os destinos parecem operacionais"

- Consulte o painel de **estado das combinações** para detetar problemas na ordem dos destinos
- Consulte os **eventos de recurso** — a combinação pode estar a esgotar as opções demasiado depressa
- Confirme se a **estratégia** corresponde ao seu caso de utilização (prioridade vs. round-robin vs. automático)

### "A verificação do estado da base de dados está a falhar"

- Execute `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Se o resultado for "ok" — é um falso alarme; a verificação de estado está a ser demasiado rigorosa
- Se o resultado for qualquer outro — **pare o OmniRoute** e siga o [guia de recuperação após desastre](./DATABASE_GUIDE.md#disaster-recovery)

### "A pressão sobre a memória heap é crítica"

```bash
# Verificar a heap atual
node -e "console.log(process.memoryUsage())"

# Acionar a recolha de lixo manualmente (se --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reduzir os pedidos simultâneos (definir através da página Definições do painel, não através de uma variável de ambiente)
# Não existe uma variável de ambiente `MAX_CONCURRENT_REQUESTS` — configure-a em Definições → Simultaneidade.
```

---

## Ver também

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — monitorização da utilização e dos custos
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — esquema da BD + estado
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — estado do proxy (cache separada)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arquitetura do sistema
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detalhes do disjuntor
- Código-fonte: `src/lib/monitoring/` (4 ficheiros, 2121 linhas de código)
