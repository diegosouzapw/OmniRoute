# Database Schema & Operations Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: O OmniRoute utiliza **SQLite com journaling WAL** como armazenamento principal, com encriptação **AES-256-GCM** em repouso para campos sensíveis. Este guia aborda o esquema, as migrações, as cópias de segurança/recuperação e os procedimentos operacionais.

**Fontes:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabelas base)
- `src/lib/db/migrationRunner.ts` — migrações com controlo de versão
- `src/lib/db/migrations/` — 167 ficheiros SQL com controlo de versão
- `src/lib/db/encryption.ts` — funções auxiliares de encriptação
- `src/lib/db/backup.ts` — exportação/importação de cópias de segurança
- `src/lib/db/healthCheck.ts` — diagnósticos de integridade

---

## Porquê SQLite?

O OmniRoute escolheu SQLite em vez de PostgreSQL/MySQL por vários motivos:

| Fator                  | SQLite                                  | PostgreSQL                                           |
| ---------------------- | --------------------------------------- | ---------------------------------------------------- |
| **Implementação**      | Incorporado — sem servidor separado     | Requer a configuração de um servidor                 |
| **Encriptação**        | Camada da aplicação (AES-256-GCM)       | TDE incorporada                                      |
| **Desempenho**         | Mais rápido para cargas pequenas/médias | Melhor para um grande volume de escritas simultâneas |
| **Concorrência**       | O modo WAL permite leituras simultâneas | MVCC completo                                        |
| **Cópia de segurança** | Cópia de um único ficheiro              | `pg_dump` ou instantâneo do sistema de ficheiros     |
| **Caso de utilização** | Instalação por utilizador, incorporado  | SaaS multi-inquilino                                 |

Para implementações com **um único utilizador e uma única instância** (o principal caso de utilização do OmniRoute), o SQLite é mais simples e mais rápido.

### Journaling WAL

O `core.ts` abre a base de dados no **modo WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

O WAL permite **leituras simultâneas** durante as escritas — importante para o painel, que efetua consultas enquanto os pedidos estão a ser registados.

O tamanho predefinido da cache é de **65 536 KiB (64 MiB)**. O SQLite interpreta um
`cache_size` negativo como um limite superior aproximado em KiB e aloca páginas conforme necessário.
**Definições > Sistema e Armazenamento > Tamanho da Cache** aceita valores inteiros entre **1 e
1 000 000 KiB**; guardar a definição aplica-a à ligação ativa à base de dados,
e o OmniRoute restaura o valor persistido no arranque.

---

## Localização da Base de Dados

O ficheiro SQLite é armazenado em:

| SO      | Caminho                                                         |
| ------- | --------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                   |
| macOS   | `~/.omniroute/storage.sqlite`                                   |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                       |
| Docker  | `/app/data/storage.sqlite` (configurável através de `DATA_DIR`) |

Ficheiros associados:

- `storage.sqlite-wal` — registo write-ahead
- `storage.sqlite-shm` — ficheiro de memória partilhada
- `call_logs/` — artefactos dos conteúdos dos pedidos (se ativado)

**Substituir a localização:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arquitetura dos Módulos de Domínio

A base de dados do OmniRoute tem **110 módulos TypeScript de nível superior** em `src/lib/db/`. Cada módulo de domínio:

- É responsável por uma ou mais tabelas específicas
- Exporta funções CRUD tipadas
- Nunca acede às tabelas de outro módulo
- Utiliza `getDbInstance()` de `core.ts` para aceder à BD

### Os 110 Módulos de BD de Nível Superior

O OmniRoute tem **110 ficheiros TypeScript de nível superior** em `src/lib/db/`. Abaixo encontra-se uma amostra dos módulos principais; consulte a listagem do diretório para ver a lista completa:

| Módulo                  | Tabelas                                                        | Responsabilidade                                                                             |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registo e credenciais de fornecedores através de OAuth/chaves de API                         |
| `models.ts`             | `key_value` (dados dos modelos)                                | Definições, capacidades e preços dos modelos                                                 |
| `combos.ts`             | `combos`                                                       | Configurações e ordenação do encaminhamento de combinações                                   |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclo de vida das chaves de API, âmbitos e monitorização de quotas                           |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuração do sistema e armazenamento KV partilhado                                        |
| `backup.ts`             | —                                                              | Operações de exportação/importação de cópias de segurança                                    |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurações de proxy e regras de encaminhamento                                            |
| `prompts.ts`            | `prompt_templates`                                             | Modelos de prompts reutilizáveis e controlo de versões                                       |
| `webhooks.ts`           | `webhooks`                                                     | Subscrições e registos de webhooks orientados a eventos                                      |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Registo de auditoria por pedido (opcional, elevado volume)                                   |
| `domainState.ts`        | `domain_*` (5 tabelas)                                         | Orçamentos de domínio, disjuntores, bloqueios, cadeias de contingência e histórico de custos |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Chaves de API autorizadas para MCP/A2A                                                       |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Histórico da utilização de quotas                                                            |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Associação de modelos às combinações predefinidas                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Estado persistente específico da CLI                                                         |
| `encryption.ts`         | —                                                              | Funções auxiliares para encriptar/desencriptar campos                                        |
| `readCache.ts`          | —                                                              | Cache em memória para operações com muitas leituras                                          |
| `secrets.ts`            | `key_value` (entradas encriptadas)                             | Armazenamento encriptado de segredos                                                         |
| `stateReset.ts`         | —                                                              | Eliminação/reposição do estado da BD para testes                                             |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contexto da sessão para transferência entre agentes                                          |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Monitorização da utilização                                                                  |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuração da compressão                                                                   |

### Limites dos Módulos

Uma regra arquitetural fundamental: **os módulos não acedem diretamente às tabelas uns dos outros**. Para trabalhar com dados de outro módulo, importe a função desse módulo.

```ts
// ❌ ERRADO: SQL direto a partir de outro módulo
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRETO: utilizar a função do módulo providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Esta regra é aplicada através da revisão de código — não existe uma verificação estática, mas as violações são assinaladas.

---

## Esquema Base (17 tabelas)

`core.ts` define as 17 tabelas base em `SCHEMA_SQL`. Estas são criadas pela migração `001_initial_schema.sql` e constituem o esquema principal.

### Tabelas Principais (criadas na migração inicial)

| Tabela                     | Finalidade                                  | Colunas principais                                                      |
| -------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credenciais do fornecedor (encriptadas)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informações de encaminhamento dos nós       | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Armazenamento KV genérico                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Definições de combinações de encaminhamento | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Chaves de API para o gateway                | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadados da base de dados                  | `key`, `value`                                                          |
| `usage_history`            | Registos de utilização de pedidos           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payloads e respostas dos pedidos            | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Registos de pedidos do proxy                | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Cadeias de modelo para fornecedor           | `model`, `chain`                                                        |
| `domain_budgets`           | Orçamentos de gastos por domínio            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Histórico de reposições de orçamento        | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Acompanhamento de custos por domínio        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Estado de limite de taxa do domínio         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Estado do disjuntor por domínio             | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache de respostas do LLM                   | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Instantâneos históricos de quotas           | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabelas Adicionais (adicionadas por migrações posteriores)

As migrações subsequentes adicionam tabelas como:

- `cli_tool_state` (migração 011) — estado da ferramenta CLI
- Tabelas `mcp_*` — auditoria do servidor MCP
- Tabelas `a2a_*` — estado das tarefas A2A
- Tabelas `usage_*` — acompanhamento da utilização
- Tabelas `plugin_*` — sistema de plugins
- `skill_executions` — histórico de execução de competências
- Tabelas `memory_*` — sistema de memória
- Tabelas `compression_*` — sistema de compressão
- Tabelas `webhook_*` — registo de entrega de webhooks
- Tabelas `acp_*` — Agent Client Protocol
- Tabelas `oneproxy_*` — marketplace 1proxy
- `proxy_assignments` — associações de âmbito do proxy
- `detailed_call_artifacts` — metadados dos artefactos dos registos de chamadas
- `quota_alert_history` — auditoria de alertas de quota
- `command_code_auth_sessions` — sessões OAuth do Command Code

A lista completa de mais de 30 tabelas encontra-se em `src/lib/db/migrations/`.

---

## Migrações

O OmniRoute utiliza **migrações versionadas e idempotentes** em `src/lib/db/migrations/`. Cada migração consiste num único ficheiro SQL com o nome `NNN_description.sql`.

### Nomenclatura das Migrações

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Como São Executadas as Migrações

No arranque, `migrationRunner.ts`:

1. Cria a tabela `_omniroute_migrations`, caso não exista
2. Consulta as migrações já aplicadas
3. Aplica sequencialmente quaisquer novas migrações, cada uma numa transação
4. Regista cada migração aplicada com a respetiva data e hora

```ts
// src/lib/db/migrationRunner.ts (simplificado)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotência

As migrações devem ser **idempotentes** — executá-las duas vezes não deve produzir qualquer efeito adicional:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Utilize livremente as cláusulas `IF NOT EXISTS`, `IF EXISTS` e `OR IGNORE` / `OR REPLACE`.

### Adicionar uma Nova Migração

1. **Identifique o número seguinte**: `ls src/lib/db/migrations/ | tail -1`
2. **Crie o ficheiro**: `NNN_my_change.sql`
3. **Utilize DDL seguro**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Preencha cuidadosamente os dados existentes**: utilize `UPDATE ... WHERE ...` para processar as linhas existentes
5. **Teste numa cópia**: nunca execute migrações não testadas em produção

Exemplo:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> As **alterações incompatíveis com versões anteriores** (por exemplo, remover colunas) são complexas. O OmniRoute NÃO suporta reversões — depois de aplicada uma migração, a alteração do esquema é permanente. Planeie em conformidade.

---

## Encriptação de Dados em Repouso

Os campos confidenciais (chaves de API, tokens OAuth, cadeias de ligação) são encriptados em repouso através de **AES-256-GCM**.

### Como Funciona

```ts
// src/lib/db/encryption.ts (simplificado)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Onde É Utilizada

- `provider_connections.api_key` — encriptado ao nível da aplicação
- `provider_connections.access_token`, `refresh_token`, `id_token` — encriptados ao nível da aplicação
- Entradas `key_value` com `namespace = "secrets"` — encriptadas ao nível da aplicação
- `proxy_registry.auth` — encriptado ao nível da aplicação (se existir)

### Chave de Encriptação

A chave de encriptação é derivada de uma **frase secreta** (definida através da variável de ambiente `STORAGE_ENCRYPTION_KEY`) e de um **salt** (armazenado na base de dados). Ambos são necessários para desencriptar os dados.

```bash
# Gerar uma frase secreta segura
openssl rand -hex 32

# Definir em .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Crítico**: perder a chave de encriptação significa perder o acesso a todos os dados encriptados. **Crie uma cópia de segurança da chave separadamente da base de dados**.

### O Que NÃO É Encriptado

Por motivos de desempenho, os seguintes elementos são armazenados em texto simples:

- Nomes de apresentação dos fornecedores
- Definições de modelos (já são públicas)
- Regras de encaminhamento
- Registos de utilização (sem dados pessoais)

---

## Ressalvas sobre encriptação (v3.8.16+)

O OmniRoute utiliza **`migrateLegacyEncryptedString()`** para processar de forma transparente dois métodos de encriptação:

- **Legado** (anterior à v3.5.0): «encriptação» baseada em XOR (não é criptografia real)
- **Atual**: AES-256-GCM com IV e etiqueta de autenticação adequados

O auxiliar de migração deteta o formato legado e volta a encriptá-lo com o novo método aquando da primeira leitura. Isto significa que pode atualizar uma base de dados antiga sem perder credenciais.

---

## Cache de leitura

Para dados lidos frequentemente (modelos, fornecedores, definições), `readCache.ts` disponibiliza uma **cache em memória**:

```ts
// Colocado em cache no arranque, invalidado na escrita
const providers = await getCachedProviders(); // Rápido, em memória
const fresh = await listProviders(); // Lento, acede à BD
```

| Entidade em cache      | Chave de cache | TTL               |
| ---------------------- | -------------- | ----------------- |
| `models`               | `models:v1`    | Até haver escrita |
| `provider_connections` | `providers:v1` | Até haver escrita |
| `settings`             | `settings:v1`  | Até haver escrita |
| `combos`               | `combos:v1`    | Até haver escrita |

A cache é invalidada em cada escrita na tabela correspondente.

---

## Cópia de segurança e recuperação

### Cópia de segurança manual

```bash
# Utilize a CLI para criar uma cópia de segurança local
omniroute backup create --name pre-migration

# Ou através da API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

O ficheiro de cópia de segurança inclui:

- Todas as tabelas da BD (serializadas em JSON)
- Artefactos do registo de chamadas (codificados em base64, opcionais)
- Definições + segredos (encriptados)
- Configuração de plug-ins

### Restauro

```bash
# Através da CLI
omniroute restore pre-migration

# Através da API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Aviso**: o restauro substitui toda a BD. Pare primeiro todos os clientes.

### Cópias de segurança automatizadas

```bash
# Ative cópias de segurança diárias automatizadas através da CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

O agendamento é executado no servidor por uma tarefa em segundo plano, que é acionada a cada 30 segundos
(por predefinição) e avalia a expressão cron relativamente à hora local do servidor.

| Variável                                    | Predefinição | Descrição                                                                                                                            |
| ------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`      | Intervalo de acionamento em ms (mín. `5000`). Tem de ser inferior a 60 s para ocorrer de forma fiável no minuto cron correspondente. |

### Cópia de segurança dinâmica do SQLite

Para efetuar uma cópia de segurança sem tempo de inatividade de uma BD em utilização:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Este comando utiliza a API de cópia de segurança online do SQLite — é seguro executá-lo enquanto o OmniRoute está em funcionamento.

---

## Otimização do Desempenho

### Modo WAL

O WAL está ativado por predefinição. Para cargas de trabalho com muitas escritas, considere:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Ponto de controlo a cada 1000 páginas
PRAGMA journal_size_limit = 67108864;  -- Limite de 64MB para o WAL
```

### Índices

Índices essenciais para o desempenho (criados automaticamente pelas migrações):

- `idx_models_provider` — pesquisas de modelos por fornecedor
- `idx_combo_targets_combo_id` — expansão de destinos de combinações
- `idx_usage_history_api_key_timestamp` — análise de utilização
- `idx_quota_snapshots_api_key_window` — controlo de quotas
- `idx_call_logs_timestamp` — consultas de registos de chamadas

Para adicionar um novo índice, crie uma migração:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### E/S Mapeada em Memória

Para bases de dados muito grandes (>10GB), o mapeamento de memória pode ser ajustado através de um pragma do SQLite:

```sql
-- Definir através de um pragma do SQLite (ajustar em core.ts ou durante a execução)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compactação

As instâncias do OmniRoute em execução prolongada beneficiam de um `VACUUM` ocasional:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Execute mensalmente durante períodos de pouco tráfego. (O modo WAL reduz a necessidade, mas não a elimina.)

---

## Verificação de Estado

`src/lib/db/healthCheck.ts` fornece **diagnósticos do estado ao nível da BD**:

Ambos os verbos requerem autenticação (caso contrário, `401`). `GET` apenas efetua o diagnóstico; `POST` executa a
mesma verificação com `autoRepair` ativado.

```bash
GET  /api/db/health   # diagnosticar
POST /api/db/health   # diagnosticar + reparar
```

A resposta é o `DbHealthCheckResult` produzido por `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Os orçamentos dos domínios faziam referência a chaves de API que já não existem.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Campo             | Significado                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` quando `issues` está vazio. `driver` nunca o influencia.                                                                                                                                              |
| `issues[].type`   | Um de `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                                       |
| `repairedCount`   | Linhas reparadas durante esta execução; é sempre `0` quando `autoRepair` é false.                                                                                                                            |
| `backupCreated`   | Indica se foi criada uma cópia de segurança antes da reparação.                                                                                                                                              |
| `checkedAt`       | Carimbo de data/hora ISO partilhado pela execução e por qualquer nota de reparação que esta escreva.                                                                                                         |
| `driver.name`     | Controlador SQLite que serve a base de dados verificada.                                                                                                                                                     |
| `driver.degraded` | `true` quando as escritas não são guardadas de forma duradoura pelo ficheiro da base de dados — o recurso de contingência WASM `sql.js` (persistência do ficheiro completo) ou uma base de dados em memória. |

A mesma carga útil é devolvida pela ferramenta MCP `omniroute_db_health_check`.

Execute `PRAGMA integrity_check` para detetar corrupção:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Deve apresentar: ok
```

Se devolver qualquer resultado que não seja `ok`, **pare imediatamente de utilizar a base de dados** e restaure-a a partir de uma cópia de segurança.

---

## Recuperação após Desastre

### Cenário 1: Ficheiro WAL Perdido

O ficheiro `-wal` está em falta, mas o ficheiro `-shm` e a BD principal estão intactos:

```bash
# Recupera automaticamente na próxima abertura
omniroute
```

Se o SQLite não conseguir recuperar automaticamente:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Cenário 2: Ficheiro da BD Principal Corrompido

Restaure a partir da cópia de segurança:

```bash
omniroute sync pull --merge   # ou: omniroute backup restore <backup-id>
```

### Cenário 3: Chave de Encriptação Perdida

**Não é possível recuperar** sem a chave. Os campos encriptados ficam ilegíveis. Volte a adicionar manualmente todos os fornecedores com novas credenciais.

> **Mitigação**: Faça sempre uma cópia de segurança separada da chave de encriptação, de preferência num gestor de palavras-passe ou KMS.

### Cenário 4: Disco Cheio

O SQLite devolverá erros `SQLITE_FULL`. Liberte espaço em disco e, em seguida:

```bash
# Cria um ponto de controlo do WAL para libertar espaço
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operações Comuns

### Inspecionar uma Tabela

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Contar Linhas em Todas as Tabelas

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Repor (Apagar) Todos os Dados

```bash
# Pare primeiro o OmniRoute
omniroute stop

# Elimine o ficheiro da BD
rm ~/.omniroute/storage.sqlite*

# Reinicie (será recriada uma BD vazia)
omniroute
```

Para uma reposição **seletiva** (manter os fornecedores e apagar os dados de utilização):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exportar uma Única Tabela

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Resolução de Problemas

### "A base de dados está bloqueada"

Outro processo está a manter um bloqueio de escrita. Pode:

- Aguardar que o outro processo termine (verifique com `lsof | grep storage.sqlite`)
- Terminar o outro processo
- Se o problema persistir, reiniciar o OmniRoute

### "Falha na restrição de chave externa"

Um módulo de domínio está a violar a integridade referencial. Verifique:

- Linhas órfãs em tabelas dependentes
- Eliminações em cascata que não foram propagadas
- Uma migração recente que tenha alterado uma chave externa

Execute `PRAGMA foreign_key_check;` para encontrar violações.

### "Memória insuficiente"

A E/S mapeada em memória do SQLite está a exceder o limite do sistema operativo. Reduza-a através de um pragma do SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB em vez de 256MB
```

Ou desative-a:

```sql
PRAGMA mmap_size = 0;
```

### "A migração falhou a meio"

A migração foi executada numa transação, pelo que deverá ter sido revertida. Caso contrário:

1. **Pare o OmniRoute** (para impedir novas tentativas)
2. **Verifique o estado da BD** com `sqlite3`
3. **Corrija manualmente** a migração parcial
4. **Volte a executar** o OmniRoute (a migração será repetida)

Para evitar esta situação, teste sempre primeiro as migrações numa cópia.

---

## Consulte Também

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabelas de utilização
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitorização do estado
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — fluxo de lançamento
- Código-fonte: `src/lib/db/` (mais de 80 ficheiros, cerca de 25 mil linhas de código)
