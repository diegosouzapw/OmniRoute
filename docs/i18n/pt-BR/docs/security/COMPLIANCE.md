# Compliance & Audit (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Fonte da verdade:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute registra ações administrativas, eventos de autenticação, alterações no ciclo de vida das credenciais de provedores e invocações de ferramentas MCP em tabelas de auditoria com persistência no SQLite. Esta página aborda o que é registrado, onde os registros são armazenados, por quanto tempo são mantidos, como as chaves de API podem optar por não participar e como consultar os dados.

A implementação está em `src/lib/compliance/index.ts` (T-43 — "Controles de conformidade") e `src/lib/compliance/providerAudit.ts`. As gravações de auditoria nunca lançam exceções: em caso de falha, a chamada é silenciosamente ignorada para que o registro de auditoria não interrompa o fluxo principal da solicitação.

## O que é registrado

### Eventos de auditoria administrativa (`audit_log`)

Cada chamada a `logAuditEvent({ action, actor, target, details, ... })` gera uma linha. As strings de ação seguem um padrão `domain.verb` (ou `domain.verb.outcome`). Os tipos de ação confirmados no código-fonte incluem:

| Ação                                 | Origem                                  |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Cada entrada captura `action`, `actor` (o padrão é `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` e `timestamp`. Chaves confidenciais (`apiKey`, `accessToken`, `refreshToken`, `password`, qualquer chave que corresponda a `*token`/`*secret`/`*apikey` etc.) são recursivamente ocultadas como `"[redacted]"` antes de a linha ser gravada.

### Chamadas de ferramentas MCP (`mcp_tool_audit`)

Cada invocação de ferramenta MCP grava uma linha por meio de `open-sse/mcp-server/audit.ts`. Esquema (de `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Coluna           | Observações                                         |
| ---------------- | --------------------------------------------------- |
| `id`             | incremento automático                               |
| `tool_name`      | identificador da ferramenta MCP                     |
| `input_hash`     | sha256 da entrada (nenhuma carga útil é armazenada) |
| `output_summary` | resumo curto e truncado                             |
| `duration_ms`    | tempo decorrido                                     |
| `api_key_id`     | chamador (pode ser nulo)                            |
| `success`        | `1` / `0`                                           |
| `error_code`     | código de erro final em caso de falha               |
| `created_at`     | carimbo de data/hora ISO                            |

### Logs de solicitações/uso

Estes são dados operacionais de telemetria (não estritamente de auditoria administrativa), mas compartilham o mesmo pipeline de retenção:

- `usage_history` — consolidação do uso por solicitação
- `call_logs` — log completo por solicitação (sujeito ao limite de linhas; veja abaixo)
- `proxy_logs` — log de tráfego do proxy (sujeito ao limite de linhas)
- `request_detail_logs` — log detalhado legado de solicitações (ainda é removido durante a limpeza, se estiver presente)

## Esquema de armazenamento

`audit_log` é criada de forma adiada por `ensureAuditLogSchema()` no primeiro uso:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

São criados índices em `timestamp`, `action`, `actor`, `resource_type`,
`status` e `request_id`. Colunas ausentes em bancos de dados legados são adicionadas via
`ALTER TABLE` conforme necessário.

## Retenção e limpeza

Duas janelas de retenção distintas são respeitadas:

| Variável de ambiente        | Padrão   | Aplica-se a                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Limite de linhas para redução de `call_logs`                      |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Limite de linhas para redução de `proxy_logs`                     |

`cleanupExpiredLogs()` executa o processo de retenção. Ela é chamada na inicialização
do servidor a partir de `src/instrumentation-node.ts`. Cada execução registra um evento
de auditoria `compliance.cleanup` com as contagens de exclusões por tabela. A redução dos
logs de proxy/chamadas é feita em lotes (`BATCH_SIZE = 5000`) para evitar bloqueios
prolongados de escrita.

A limpeza manual do histórico de solicitações é separada da retenção. A página Request Logs
chama `POST /api/settings/purge-request-history`, que exclui `call_logs`,
o legado `request_detail_logs` e os artefatos locais de solicitações em
`${DATA_DIR}/call_logs/`.

Os valores padrão são definidos em `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Desativação de `noLog` (por chave de API)

As chaves de API podem ser sinalizadas para que o tráfego de chamadas downstream não seja
registrado. O sinalizador fica na tabela `api_keys` (`no_log INTEGER DEFAULT 0`) e é
espelhado em um conjunto na memória para consultas no caminho crítico.

```bash
# Cria uma chave sem registro (autenticação de gerenciamento obrigatória)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Funções auxiliares (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — ativa ou desativa a entrada na memória
- `isNoLog(apiKeyId)` — verificada no caminho da solicitação; como alternativa, usa uma leitura
  de `api_keys.no_log` armazenada em cache por 30 s
- `NO_LOG_API_KEY_IDS` (variável de ambiente, separada por vírgulas) — pré-carregada no conjunto
  em memória durante a inicialização; útil quando não é possível alterar a coluna diretamente

Eventos de auditoria administrativa (login, alterações de provedores, chamadas de ferramentas MCP etc.)
**não** são afetados por `noLog` — apenas o registro de tráfego por solicitação é
desativado.

## API REST

| Endpoint                    | Método | Descrição                                                  | Autenticação |
| --------------------------- | ------ | ---------------------------------------------------------- | ------------ |
| `/api/compliance/audit-log` | `GET`  | Entradas paginadas de auditoria administrativa com filtros | management   |
| `/api/mcp/audit`            | `GET`  | Entradas paginadas de auditoria de ferramentas MCP         | (open-sse)   |
| `/api/mcp/audit/stats`      | `GET`  | Estatísticas agregadas de auditoria MCP                    | (open-sse)   |

Atualmente, nenhum endpoint de exportação CSV é fornecido — exporte pelo painel ou consulte
diretamente o banco de dados SQLite.

### Consultando `/api/compliance/audit-log`

Parâmetros de consulta compatíveis (todos opcionais; todos usam correspondência `LIKE %value%` para
filtros de texto):

- `action`, `actor`, `target`, `resourceType` (ou `resource_type`),
  `status`, `requestId` (ou `request_id`)
- `from` / `since`, `to` / `until` — timestamps ISO
- `limit` (padrão `50`, mín. `1`, máx. `500`)
- `offset` (padrão `0`, máx. `10_000`)

A resposta é um array JSON. Os metadados de paginação são retornados nos cabeçalhos:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Painel

O painel disponibiliza os dados de auditoria em **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). A página tem duas abas:

- **Conformidade** (`ComplianceTab.tsx`) — eventos de auditoria administrativa de
  `/api/compliance/audit-log`. Filtra por tipo de evento, severidade (informação / aviso
  / crítico, derivada da ação + status) e intervalo de datas. A severidade é
  calculada no lado do cliente com base nas strings de ação/status.
- **MCP** (`McpAuditTab.tsx`) — auditoria de ferramentas MCP de `/api/mcp/audit`, com
  filtros por nome da ferramenta e sucesso/falha.

As duas abas usam paginação com tamanhos de página de `50` (conformidade) e `25` (MCP).

## Auxiliares de Credenciais de Provedores

`src/lib/compliance/providerAudit.ts` fornece auxiliares de formatação usados pelas
rotas de gerenciamento de provedores quando elas emitem eventos de credenciais:

- `summarizeProviderConnectionForAudit(connection)` — remove `apiKey`,
  `accessToken`, `refreshToken`, `idToken` e
  `providerSpecificData.consoleApiKey` antes que o instantâneo da conexão seja
  gravado em `details`.
- `getProviderAuditTarget(connection)` — compõe uma string estável
  `"<provider>:<name|id>"` para o campo `target`.
- `extractProviderWarnings(...payloads)` — verifica respostas de provedores em busca de
  avisos de política/segurança (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) e
  retorna até 5 ocorrências, cada uma truncada em 400 caracteres.

## Práticas Recomendadas

- Marque as chaves de API que processam PII (dados jurídicos, médicos etc.) com `noLog: true`.
- Ajuste `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` para atender à sua
  política de retenção. Os padrões de 7 dias são conservadores.
- Exporte a tabela de auditoria para fora da plataforma (`sqlite3 dump`) na frequência
  exigida pelo seu programa de conformidade — não há arquivamento integrado.
- Monitore as contagens de `auth.login.failed` e `auth.login.locked` para detectar
  ataques de força bruta.
- Ao adicionar novos endpoints administrativos, chame `logAuditEvent({ ... })` com uma string de ação
  `domain.verb.outcome` estável e passe o contexto da requisição por meio de
  `getAuditRequestContext(request)` para que o IP e o `requestId` sejam capturados
  automaticamente.

## Veja também

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — mascaramento de PII, injeção de prompt
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — catálogo de ferramentas MCP e escopos
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — referência completa das variáveis de ambiente
- Código-fonte: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
