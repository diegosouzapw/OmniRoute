# Compliance & Audit (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Fonte fidedigna:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute regista ações administrativas, eventos de autenticação, alterações
ao ciclo de vida das credenciais dos fornecedores e invocações de ferramentas
MCP em tabelas de auditoria suportadas por SQLite. Esta página descreve o que é
registado, onde é armazenado, durante quanto tempo é conservado, como as chaves
de API podem optar pela exclusão e como consultar os dados.

A implementação encontra-se em `src/lib/compliance/index.ts` (T-43 — "Controlos
de Conformidade") e `src/lib/compliance/providerAudit.ts`. As escritas de
auditoria nunca lançam exceções: em caso de falha, a chamada é silenciosamente
ignorada, para que o registo de auditoria não possa interromper o fluxo
principal do pedido.

## O Que É Registado

### Eventos de auditoria administrativa (`audit_log`)

Cada chamada a `logAuditEvent({ action, actor, target, details, ... })` produz
uma linha. As cadeias de ação seguem um padrão `domain.verb` (ou
`domain.verb.outcome`). Os tipos de ação confirmados no código-fonte incluem:

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

Cada entrada regista `action`, `actor` (a predefinição é `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` e `timestamp`. As chaves sensíveis (`apiKey`, `accessToken`,
`refreshToken`, `password`, qualquer chave que corresponda a
`*token`/`*secret`/`*apikey`, etc.) são recursivamente ocultadas como
`"[redacted]"` antes de a linha ser escrita.

### Chamadas de ferramentas MCP (`mcp_tool_audit`)

Cada invocação de uma ferramenta MCP escreve uma linha através de
`open-sse/mcp-server/audit.ts`. Esquema (proveniente de
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Coluna           | Notas                                      |
| ---------------- | ------------------------------------------ |
| `id`             | incremento automático                      |
| `tool_name`      | identificador da ferramenta MCP            |
| `input_hash`     | sha256 da entrada (sem guardar o conteúdo) |
| `output_summary` | resumo curto e truncado                    |
| `duration_ms`    | tempo decorrido                            |
| `api_key_id`     | autor da chamada (pode ser nulo)           |
| `success`        | `1` / `0`                                  |
| `error_code`     | código de erro final em caso de falha      |
| `created_at`     | carimbo de data/hora ISO                   |

### Registos de pedidos/utilização

Estes dados constituem telemetria operacional (e não estritamente auditoria
administrativa), mas partilham o mesmo fluxo de retenção:

- `usage_history` — agregação da utilização por pedido
- `call_logs` — registo completo por pedido (sujeito ao limite de linhas; consulte abaixo)
- `proxy_logs` — registo do tráfego de proxy (sujeito ao limite de linhas)
- `request_detail_logs` — registo detalhado de pedidos legado (continua a ser eliminado se estiver presente)

## Esquema de armazenamento

A tabela `audit_log` é criada de forma diferida por `ensureAuditLogSchema()` na primeira utilização:

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
`status` e `request_id`. As colunas em falta nas bases de dados legadas são adicionadas através de
`ALTER TABLE`, conforme necessário.

## Retenção e limpeza

São respeitados dois períodos de retenção distintos:

| Variável de ambiente        | Predefinição | Aplica-se a                                                       |
| --------------------------- | ------------ | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`          | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`          | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`     | Limite de linhas para a redução de `call_logs`                    |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`     | Limite de linhas para a redução de `proxy_logs`                   |

`cleanupExpiredLogs()` executa o processo de retenção. É invocado no arranque do servidor
a partir de `src/instrumentation-node.ts`. Cada execução regista um evento de auditoria
`compliance.cleanup` com as contagens de eliminações por tabela. A redução dos registos de proxy/chamadas
é efetuada em lotes (`BATCH_SIZE = 5000`) para evitar bloqueios de escrita prolongados.

A limpeza manual do histórico de pedidos é independente da retenção. A página de Registos de Pedidos
chama `POST /api/settings/purge-request-history`, que elimina `call_logs`,
a tabela legada `request_detail_logs` e os artefactos locais dos pedidos em
`${DATA_DIR}/call_logs/`.

Os valores predefinidos estão definidos em `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Exclusão de registo com `noLog` (por chave de API)

As chaves de API podem ser configuradas para que o tráfego das respetivas chamadas subsequentes não seja registado. O
sinalizador encontra-se na tabela `api_keys` (`no_log INTEGER DEFAULT 0`) e é replicado
num conjunto em memória para consultas no caminho crítico.

```bash
# Criar uma chave sem registo (requer autenticação de gestão)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Funções auxiliares (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — ativa ou desativa a entrada em memória
- `isNoLog(apiKeyId)` — verificada no caminho do pedido; recorre, em alternativa, a uma leitura de
  `api_keys.no_log` armazenada em cache durante 30 s
- `NO_LOG_API_KEY_IDS` (variável de ambiente, separada por vírgulas) — pré-carregada no conjunto em memória
  durante o arranque; útil quando não é possível alterar diretamente a coluna

Os eventos de auditoria administrativos (início de sessão, alterações de fornecedores, chamadas a ferramentas MCP, etc.)
**não** são afetados por `noLog` — apenas o registo de tráfego por pedido é
desativado.

## API REST

| Endpoint                    | Método | Descrição                                                  | Autenticação |
| --------------------------- | ------ | ---------------------------------------------------------- | ------------ |
| `/api/compliance/audit-log` | `GET`  | Entradas paginadas de auditoria administrativa com filtros | management   |
| `/api/mcp/audit`            | `GET`  | Entradas paginadas de auditoria de ferramentas MCP         | (open-sse)   |
| `/api/mcp/audit/stats`      | `GET`  | Estatísticas agregadas de auditoria MCP                    | (open-sse)   |

Atualmente, não é disponibilizado nenhum endpoint de exportação CSV — exporte a partir do painel ou consulte
diretamente a base de dados SQLite.

### Consultar `/api/compliance/audit-log`

Parâmetros de consulta suportados (todos opcionais; todos utilizam correspondência
`LIKE %value%` para filtros de texto):

- `action`, `actor`, `target`, `resourceType` (ou `resource_type`),
  `status`, `requestId` (ou `request_id`)
- `from` / `since`, `to` / `until` — carimbos de data/hora ISO
- `limit` (predefinição `50`, mín. `1`, máx. `500`)
- `offset` (predefinição `0`, máx. `10_000`)

A resposta é um array JSON. Os metadados de paginação são devolvidos nos cabeçalhos:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Painel

O painel disponibiliza os dados de auditoria em **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). A página tem dois separadores:

- **Conformidade** (`ComplianceTab.tsx`) — eventos de auditoria administrativa de
  `/api/compliance/audit-log`. Permite filtrar por tipo de evento, gravidade (informação / aviso
  / crítico, derivada da ação + estado) e intervalo de datas. A gravidade é
  calculada no lado do cliente a partir das cadeias de ação/estado.
- **MCP** (`McpAuditTab.tsx`) — auditoria de ferramentas MCP de `/api/mcp/audit`, com
  filtros por nome da ferramenta e sucesso/falha.

Ambos os separadores utilizam paginação com tamanhos de página de `50` (conformidade) e `25` (MCP).

## Funções auxiliares de credenciais de fornecedores

`src/lib/compliance/providerAudit.ts` fornece funções auxiliares de estruturação utilizadas pelas
rotas de gestão de fornecedores quando emitem eventos de credenciais:

- `summarizeProviderConnectionForAudit(connection)` — remove `apiKey`,
  `accessToken`, `refreshToken`, `idToken` e
  `providerSpecificData.consoleApiKey` antes de o instantâneo da ligação ser
  escrito em `details`.
- `getProviderAuditTarget(connection)` — compõe uma cadeia estável
  `"<provider>:<name|id>"` para o campo `target`.
- `extractProviderWarnings(...payloads)` — analisa as respostas dos fornecedores à procura de
  avisos de políticas/segurança (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) e
  apresenta até 5 ocorrências, cada uma truncada para 400 carateres.

## Boas práticas

- Marque as chaves de API que processam PII (dados jurídicos, médicos, etc.) com `noLog: true`.
- Ajuste `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` para cumprir a sua
  política de retenção. As predefinições de 7 dias são conservadoras.
- Exporte a tabela de auditoria para fora da plataforma (`sqlite3 dump`) com a periodicidade
  exigida pelo seu programa de conformidade — não existe arquivo incorporado.
- Monitorize as contagens de `auth.login.failed` e `auth.login.locked` para detetar
  ataques de força bruta.
- Ao adicionar novos endpoints administrativos, chame `logAuditEvent({ ... })` com uma cadeia de ação
  `domain.verb.outcome` estável e transmita o contexto do pedido através de
  `getAuditRequestContext(request)` para que o IP e o `requestId` sejam capturados
  automaticamente.

## Ver também

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — mascaramento de PII, injeção de prompts
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — catálogo e âmbitos das ferramentas MCP
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — referência completa das variáveis de ambiente
- Código-fonte: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
