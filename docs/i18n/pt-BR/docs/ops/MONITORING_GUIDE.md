# Monitoring & Observability Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Resumo**: O OmniRoute inclui monitoramento de integridade integrado, piloto automático de provedores, acompanhamento de cotas e hooks de observabilidade. Este guia aborda o dashboard, os alertas e a solução de problemas.

**Fontes:**

- `src/lib/monitoring/observability.ts` — snapshot de observabilidade
- `src/lib/monitoring/comboHealthAutopilot.ts` — piloto automático de integridade de combos
- `src/lib/monitoring/providerHealthAutopilot.ts` — piloto automático de provedores
- `src/lib/monitoring/providerHealthMatrix.ts` — matriz de integridade de provedores
- `src/lib/localHealthCheck.ts` — verificação de integridade local
- `src/lib/tokenHealthCheck.ts` — integridade da renovação de tokens
- `src/lib/proxyHealth.ts` — cache de integridade do proxy (abordado em PROXY_GUIDE.md)

---

## Visão geral

O OmniRoute possui **3 camadas de monitoramento**:

```
┌──────────────────────────────────────────────────────────────┐
│  Camada 1: Integridade do sistema (nível do servidor)        │
│  ├─ localHealthCheck.ts — BD, portas, dependências nativas   │
│  ├─ db/healthCheck.ts — integridade, FK, artefatos órfãos     │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Camada 2: Integridade do provedor (resiliência por provedor)│
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldowns  │
│  ├─ providerHealthMatrix.ts — pontuações por provedor/modelo │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Camada 3: Observabilidade em tempo real (snapshots de execução) │
│  ├─ observability.ts — circuit breakers, sessões, cota       │
│  ├─ tokenHealthCheck.ts — integridade da renovação OAuth     │
│  └─ Ferramentas MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Páginas do dashboard

### `/dashboard/health` (Integridade do sistema)

O dashboard principal de integridade mostra:

| Seção                    | O que mostra                                              |
| ------------------------ | --------------------------------------------------------- |
| **Status do servidor**   | Tempo de atividade, versão, porta, conexões ativas        |
| **Banco de dados**       | Conexão, integridade, tamanho do WAL, migrações recentes  |
| **Resumo de provedores** | Quantidade de ativos, íntegros e circuit breakers abertos |
| **Monitores de cota**    | Sessões ativas, alertas e cotas esgotadas                 |
| **Erros recentes**       | Últimos 10 erros com stack traces                         |
| **Uso de recursos**      | Memória, CPU e indicador de pressão do heap               |

### `/dashboard/providers` (Integridade dos provedores)

Dashboard por provedor:

| Coluna      | Descrição                                                     |
| ----------- | ------------------------------------------------------------- |
| Provedor    | ID do provedor + nome de exibição                             |
| Integridade | Status verde/amarelo/vermelho                                 |
| Circuito    | Estado aberto/fechado/semiaberto                              |
| Conexões    | Quantidade de conexões, última renovação                      |
| Modelos     | Modelos disponíveis, integridade por modelo                   |
| Custo       | Custo de hoje, tendência de 7 dias                            |
| Erros       | Quantidade de erros nas últimas 24h, principal classe de erro |

Clique em um provedor para ver:

- Solicitações recentes com detalhamento de latência
- Pontuações de integridade por conexão
- Bloqueios por modelo
- Recomendações do piloto automático

### `/dashboard/quota` (Acompanhamento de cotas)

Para cada chave de API:

- Uso atual em relação ao limite (barra de progresso)
- Tendência da cota (gráfico de 30 dias)
- Horário da próxima redefinição
- Histórico de alertas

### `/dashboard/combos` (Integridade dos combos)

Por combo:

- Estratégia + alvos
- Integridade por alvo
- Eventos recentes de fallback
- Taxa de sucesso (24h, 7d, 30d)

---

## API de verificação de integridade

O OmniRoute expõe **duas** interfaces HTTP de verificação de integridade. Elas não são intercambiáveis para orquestradores.

| Caminho                      | Finalidade                                                                    | Peso                                           | Usar para                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| `GET /healthz`               | Vivacidade/prontidão do ciclo de vida (`ok` / `starting` / `stopping`)        | Trivial (apenas o indicador de fase)           | **Prontidão** do Kubernetes; **vivacidade** flexível se precisar usar HTTP   |
| `GET /api/monitoring/health` | Resumo detalhado do sistema + provedores (DB, heap, contagens do catálogo, …) | Pesado (trabalho síncrono de DB/monitoramento) | Dashboards, verificações profundas blackbox, healthcheck integrado do Docker |

> **Observação:** Matrizes de integridade dos provedores, problemas do autopilot, monitores de cota, integridade de tokens e detalhes de latência além de `/api/monitoring/health` estão disponíveis por meio da **ferramenta MCP** `observability_snapshot` ou das páginas do **dashboard** — não há rotas REST dedicadas para esses itens.

Ambas as rotas são executadas no **mesmo loop de eventos do Node** que processa as requisições. Um caminho intensivo em CPU (trabalho com um catálogo grande em `GET /v1/models`, compressão de contexto longo/contagem de tokens) pode atrasar **todos** os manipuladores HTTP, incluindo `/healthz`. Loop de eventos ocupado ≠ processo encerrado. Prefira corrigir o processo que está consumindo recursos; o ajuste das sondagens apenas reduz encerramentos indevidos.

### Sondagem leve para orquestradores

```bash
GET /healthz
# ou HEAD /healthz
```

- **200** + corpo `ok` quando a fase do ciclo de vida do servidor está pronta
- **503** + `starting` / `stopping` durante a inicialização ou o encerramento
- Implementação: `src/app/healthz/route.ts` (sem ping no DB)

### Integridade do sistema (detalhada)

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

#### `credentialHealth`: cache de sondagem vs. `test_status` do SQLite

`GET /api/monitoring/health` → `credentialHealth` é o **medidor do cache de
sondagens em memória**, não um despejo em tempo real de `provider_connections.test_status`. Após a #12532, o
caminho da requisição lê apenas `getCachedCredentialHealthSummary()`; sondagens em segundo
plano atualizam o cache fora do loop de eventos.

| Camada                         | Onde                                                                  | O que significa                                                                                                                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Medidor do cache de sondagens  | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Últimos resultados das sondagens de integridade das credenciais ainda mantidos na memória do processo. `source` é sempre `probe-cache`.                                                                                     |
| Detalhes de conexões com falha | `credentialHealth.failedConnections`                                  | Presente **somente quando `failed > 0`**. Lista limitada de linhas do cache com `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` sanitizados). `failedOmitted` é definido quando a lista é truncada. |
| Status persistente do SQLite   | `credentialHealth.staleDbNonOkCount`                                  | Contagem de linhas de conexão **ativas** (`is_active=1`) cujo `test_status` persistido é um valor conhecido diferente de ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).              |

As duas camadas podem divergir propositalmente:

- Medidor com `failed=0` enquanto `staleDbNonOkCount>0` — o SQLite ainda tem um
  `test_status` persistente (por exemplo, `expired` ou `credits_exhausted`) que o snapshot mais
  recente do cache de sondagens não contabiliza como `status=error`.
- Medidor com `failed>0` enquanto o SQLite parece íntegro — uma sondagem recente falhou e está
  armazenada em cache; a linha do DB não foi atualizada ou foi limpa posteriormente.

Não gere alertas exclusivamente com base em `provider_connections.test_status` ao consultar este
endpoint. Use `failed` + `failedConnections` para falhas de sondagem em tempo real e
`staleDbNonOkCount` quando precisar da contagem de status persistentes armazenados.

### Recomendações de sondagem para Kubernetes

O OmniRoute é um **único processo Node** (um loop de eventos). O `HEALTHCHECK` padrão do Docker usa o endpoint leve `/healthz`. `/api/monitoring/health` é **pesado demais** para intervalos de vivacidade do kubelet.

| Sonda              | Alvo recomendado                                                                    | Observações                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inicialização**  | HTTP `GET /healthz` com um `failureThreshold` longo (ou `startPeriod` grande)       | A inicialização a frio + migração do SQLite podem levar mais do que alguns segundos                                                                                                                                                                                                                                                                                                                                             |
| **Prontidão**      | HTTP `GET /healthz`                                                                 | Ciclo de vida `ok` / `starting` / `stopping` (200 vs 503). Ainda oscila se o loop estiver bloqueado pela CPU. **Um 200 que demora vários segundos não é saudável** (#10303) — isso significa que o loop de eventos ficou sem recursos antes que o manipulador de 3 bytes fosse executado                                                                                                                                        |
| **Vivacidade**     | HTTP `GET /livez` **ou TCP** na porta principal do serviço (`PORT`, padrão `20128`) | `/livez` indica apenas que o processo está ativo (sempre retorna 200 se o manipulador for executado). Ele ainda compartilha o loop de eventos — ocupado ≠ morto — e não detecta inanição do loop de eventos (#10303) melhor do que o TCP. Prefira **TCP** se as sondas HTTP atingirem o tempo limite sob carga de catálogo/compressão; de qualquer forma, **não** encerre o pod devido a interrupções curtas do loop de eventos |
| **Saúde profunda** | `GET /api/monitoring/health` a partir de um verificador externo                     | Não deve ser usado em `livenessProbe` do kubelet nem em uma `readinessProbe` rigorosa                                                                                                                                                                                                                                                                                                                                           |

Exemplo de configuração (ajuste os limites de acordo com a carga de inicialização a frio e compressão):

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
  # Durante uma interrupção do loop de eventos, a solicitação HTTP para /livez ainda pode atingir o tempo limite. TCP é a
  # alternativa conservadora:
  # tcpSocket:
  #   port: http
```

**Não** aponte a verificação de **vivacidade** do kubelet para `/api/monitoring/health`. Esse caminho realiza operações reais de banco de dados/monitoramento e produzirá falsos positivos sob carga.

Relacionado: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sondas enquanto o loop de eventos está ocupado), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (processamento intensivo de preços do catálogo), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (processamento intensivo da contagem de tokens de compressão).

### Trabalho opcional no caminho da solicitação (memória, habilidades, atualização de token)

A extração de memória, a injeção de habilidades e a atualização do token OAuth compartilham o **loop de eventos principal do Node** com `/healthz`. São recursos ativados no painel (`memoryEnabled`, `skillsEnabled`), não um pool de workers. Consulte [Ambiente — custo do loop de eventos](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Saúde do provedor

> **Nenhum endpoint REST.** Os dados de saúde do provedor estão disponíveis por meio da ferramenta MCP `observability_snapshot` ou da página `/dashboard/providers` do painel.

### Detalhes do provedor

> **Nenhum endpoint REST.** Os detalhes por provedor estão disponíveis na página `/dashboard/providers` do painel.

---

## Piloto Automático de Integridade de Provedores

O módulo `providerHealthAutopilot.ts` é um **sistema de autorrecuperação** que:

1. Detecta problemas nos provedores (circuito aberto, períodos de espera, bloqueios, alertas de cota)
2. Gera **ações recomendadas** para resolvê-los
3. Opcionalmente, **executa automaticamente** ações de baixo risco

### Tipos de Problemas Detectados

| Tipo de problema             | Severidade | Exemplo de condição                         |
| ---------------------------- | ---------- | ------------------------------------------- |
| `provider_circuit_open`      | crítica    | Circuit breaker aberto após 5 falhas        |
| `provider_circuit_half_open` | alerta     | Circuito testando a recuperação             |
| `connection_cooldown`        | alerta     | Conexão em espera após um erro 429          |
| `stale_connection_error`     | alerta     | Última atualização falhou há mais de 30 min |
| `terminal_connection_error`  | crítica    | OAuth revogado, chave inválida              |
| `inactive_connection`        | informação | Conexão desativada nas configurações        |
| `model_lockout`              | alerta     | Modelo específico em quarentena             |
| `quota_monitor_warning`      | alerta     | Uso da cota em 80% ou mais                  |

### Tipos de Ações Geradas

| Ação                           | Risco | Descrição                                  |
| ------------------------------ | ----- | ------------------------------------------ |
| `clear_provider_breaker`       | médio | Redefinir o circuit breaker para fechado   |
| `clear_connection_cooldown`    | baixo | Remover o período de espera de uma conexão |
| `clear_stale_connection_error` | baixo | Limpar o indicador de erro obsoleto        |
| `clear_model_lockout`          | baixo | Reativar um modelo em quarentena           |
| `reactivate_connection`        | médio | Reativar uma conexão desativada            |
| `deactivate_connection`        | alto  | Desativar uma conexão problemática         |

### API

> **Nenhum endpoint REST.** Os problemas do piloto automático estão disponíveis por meio da ferramenta MCP `observability_snapshot` ou do painel. O piloto automático é executado internamente; seu comportamento é configurado pelo banco de dados de configurações (campo `autopilotMode` de cada conexão), e não por variáveis de ambiente — executar `grep -rn` para uma variável de ambiente do modo de piloto automático não retorna nenhum resultado.

### Modo do Piloto Automático

Por padrão, o piloto automático opera em **modo manual** — ele detecta problemas e gera ações recomendadas, mas não as aplica automaticamente. As ações podem ser aplicadas pelo painel.

---

## Piloto Automático de Integridade de Combos

`comboHealthAutopilot.ts` é o equivalente **específico para combos** do piloto automático de provedores. Ele:

- Detecta combos não íntegros
- Recomenda a reordenação de destinos
- Sugere a desativação de destinos com falha
- Remove automaticamente destinos inoperantes após N falhas

### Exemplos de Problemas em Combos

```
Combo "always-on" (estratégia de prioridade)
├─ Destino 1: openai/gpt-5 (íntegro)
├─ Destino 2: anthropic/claude-opus-4-6 (⚠️ modelo bloqueado até 14:00)
└─ Destino 3: kiro/claude-sonnet-4-5 (íntegro)

Ação recomendada: Reordenar — mover kiro acima de anthropic até o bloqueio expirar
```

---

## Monitores de Cota

`observability.ts` expõe **monitores de cota por sessão** para provedores de assinatura (Claude Code, Codex, GitHub Copilot):

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

### Significados dos Status

| Status      | Quando                        | Ação da interface                                 |
| ----------- | ----------------------------- | ------------------------------------------------- |
| `starting`  | Consulta inicial em andamento | Indicador de carregamento                         |
| `idle`      | Nenhuma atividade recente     | Oculto do painel                                  |
| `healthy`   | Mais de 50% da cota restante  | Ponto verde                                       |
| `warning`   | Menos de 50% da cota restante | Alerta amarelo                                    |
| `exhausted` | Cota = 0%                     | Bloqueio vermelho, encaminhar ao próximo provedor |
| `error`     | Falha na consulta             | Ponto vermelho, tentar novamente em breve         |

### API

> **Nenhum endpoint REST.** Os dados dos monitores de cota estão disponíveis por meio da ferramenta MCP `observability_snapshot` ou do painel.

---

## Snapshot de Observabilidade

A ferramenta MCP `observability_snapshot` retorna um **snapshot completo do sistema** para agentes de IA:

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
  "quotaMonitors": {/* veja acima */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Os agentes usam isso para tomar **decisões de roteamento** — por exemplo, "se o circuito da openai estiver aberto, roteie primeiro para a anthropic".

---

## Verificação da Integridade dos Tokens

Os provedores OAuth (Claude Code, GitHub Copilot, Cursor) precisam de **renovação periódica dos tokens**. `src/lib/tokenHealthCheck.ts` executa um agendador em segundo plano:

- **Ciclo de varredura**: a cada 60 segundos (varredura em `TICK_MS = 60 * 1000` em `src/lib/tokenHealthCheck.ts:30`)
- **Intervalo de verificação de integridade por conexão**: padrão de 60 minutos (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); configurável pelo banco de dados de configurações
- **Renovação preventiva em caso de 401**: tratada pelo interceptor de cada conexão

### Status da Integridade dos Tokens

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

A configuração da verificação de integridade dos tokens é tratada internamente por `tokenHealthCheck.ts`.

### Integridade dos Tokens

> **Não há endpoint REST.** Os dados de integridade dos tokens estão disponíveis pelo painel ou pela ferramenta MCP `observability_snapshot`.

---

## Alertas

### Canais Integrados

O OmniRoute oferece suporte a **3 canais de alerta**:

| Canal            | Configuração   | Caso de uso                    |
| ---------------- | -------------- | ------------------------------ |
| Banner do painel | Sempre ativo   | Notificações no aplicativo     |
| Webhook          | Configurar URL | Slack, Discord, PagerDuty      |
| Log              | Padrão         | Para agregação externa de logs |

### Configuração de Webhook

> **Observação:** A configuração de alertas via webhook é feita na página Configurações do painel. Consulte a interface de Configurações para definir a URL do webhook, a filtragem de eventos e a personalização do payload.

### Tipos de Alerta

| Alerta                       | Quando                                                | Severidade padrão |
| ---------------------------- | ----------------------------------------------------- | ----------------- |
| `provider_circuit_open`      | O circuito é aberto                                   | crítica           |
| `provider_circuit_half_open` | O circuito está testando a recuperação                | informativa       |
| `quota_warning`              | A cota está em 80% ou mais                            | aviso             |
| `quota_exhausted`            | A cota está em 100%                                   | crítica           |
| `token_refresh_failed`       | 3 ou mais falhas consecutivas de renovação            | aviso             |
| `token_expired`              | O token está expirado                                 | crítica           |
| `combo_target_unhealthy`     | O destino do combo está em cooldown há 1 hora ou mais | aviso             |
| `db_integrity_warning`       | Violações de FK > 0                                   | aviso             |
| `heap_pressure`              | Uso do heap > 80% do limite                           | aviso             |

---

## Métricas de Desempenho

### Métricas Monitoradas

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

> **Nenhum endpoint REST.** Os dados de percentis de latência estão disponíveis na página `/dashboard/health` do painel. A exportação para Prometheus/OpenTelemetry está planejada para a v3.9.

### Exportação para Prometheus / OpenTelemetry (Fase 2)

Planejada para a v3.9: exportação nativa para Prometheus, OpenTelemetry e Datadog.

Por enquanto, colete dados de `/api/monitoring/health` com qualquer sistema de monitoramento baseado em HTTP (exportador blackbox do Prometheus, verificação HTTP do Datadog etc.).

---

## Receitas de Alertas

### Slack

> **Observação:** Os alertas por webhook são configurados na página Configurações do painel — não há variáveis de ambiente dedicadas a webhooks (`grep -rn` não retorna nenhuma ocorrência). Consulte a interface de Configurações para definir a URL do webhook, a filtragem de eventos e a personalização do payload.

### Discord

> Os alertas por webhook usam o mesmo fluxo da interface de Configurações do Slack. O Discord aceita o mesmo formato de payload JSON.

### PagerDuty

> Os alertas por webhook usam o mesmo fluxo da interface de Configurações. As chaves de roteamento da API de Eventos v2 do PagerDuty são configuradas na interface de Configurações.

### Webhook Personalizado (JSON)

> Qualquer endpoint HTTP que aceite POST com corpo JSON funcionará. Configure a URL na interface de Configurações.

---

## Configuração do Painel

### Personalizar o Painel de Integridade

Crie um arquivo `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Fixar um Provedor no Topo

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Solução de Problemas

### "O provedor indica que está íntegro, mas as solicitações falham"

1. Verifique os **problemas do piloto automático** — talvez um modelo esteja bloqueado
2. Consulte os **erros recentes** para identificar a classe específica do erro
3. Tente o **teste de conexão** no cartão do provedor
4. Verifique se o provedor está com **limitação de taxa na origem** (não visível localmente)

### "A cota indica que está íntegra, mas vejo erros 429"

- 429 significa que o provedor informa que você usou toda a sua cota
- O rastreamento de cotas do OmniRoute pode estar **desatualizado** — a fonte da verdade está no provedor
- Os dados de cota são atualizados automaticamente pelo monitor interno de cotas

### "A combinação está falhando, mas todos os destinos parecem íntegros"

- Verifique o painel de **integridade da combinação** para identificar problemas na ordem dos destinos
- Consulte os **eventos de fallback** — talvez a combinação esteja esgotando as opções rápido demais
- Verifique se a **estratégia** corresponde ao seu caso de uso (prioridade vs. round-robin vs. automático)

### "A verificação de integridade do banco de dados está falhando"

- Execute `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Se o resultado for "ok" — é um alarme falso; a verificação de integridade está sendo rigorosa demais
- Se o resultado for qualquer outra coisa — **pare o OmniRoute** e siga o [guia de recuperação de desastres](./DATABASE_GUIDE.md#disaster-recovery)

### "A pressão sobre a memória heap está crítica"

```bash
# Verificar o heap atual
node -e "console.log(process.memoryUsage())"

# Acionar a coleta de lixo manual (se --expose-gc estiver habilitado)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Reduzir as solicitações simultâneas (configure pela página Configurações do painel, não por uma variável de ambiente)
# Não há uma variável de ambiente `MAX_CONCURRENT_REQUESTS` — configure-a em Configurações → Concorrência.
```

---

## Veja Também

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — monitoramento de uso e custos
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — esquema do banco de dados + integridade
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — integridade do proxy (cache separado)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arquitetura do sistema
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detalhes do circuit breaker
- Código-fonte: `src/lib/monitoring/` (4 arquivos, 2121 linhas de código)
