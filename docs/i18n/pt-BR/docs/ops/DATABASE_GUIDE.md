# Database Schema & Operations Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: O OmniRoute usa **SQLite com registro em WAL** como armazenamento principal, com criptografia **AES-256-GCM** em repouso para campos confidenciais. Este guia aborda o esquema, as migrações, o backup/a recuperação e os runbooks operacionais.

**Fontes:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabelas básicas)
- `src/lib/db/migrationRunner.ts` — migrações versionadas
- `src/lib/db/migrations/` — 167 arquivos SQL versionados
- `src/lib/db/encryption.ts` — utilitários de criptografia
- `src/lib/db/backup.ts` — exportação/importação de backups
- `src/lib/db/healthCheck.ts` — diagnósticos de integridade

---

## Por que SQLite?

O OmniRoute escolheu o SQLite em vez do PostgreSQL/MySQL por vários motivos:

| Fator            | SQLite                                  | PostgreSQL                                   |
| ---------------- | --------------------------------------- | -------------------------------------------- |
| **Implantação**  | Integrado — sem servidor separado       | Exige configuração de servidor               |
| **Criptografia** | Camada da aplicação (AES-256-GCM)       | TDE integrada                                |
| **Desempenho**   | Mais rápido para cargas pequenas/médias | Melhor para muitas gravações simultâneas     |
| **Concorrência** | O modo WAL permite leituras simultâneas | MVCC completo                                |
| **Backup**       | Cópia de um único arquivo               | `pg_dump` ou snapshot do sistema de arquivos |
| **Caso de uso**  | Instalação por usuário, integrado       | SaaS multilocatário                          |

Para implantações de **usuário único e instância única** (o principal caso de uso do OmniRoute), o SQLite é mais simples e rápido.

### Registro em WAL

O `core.ts` abre o banco de dados no **modo WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

O WAL permite **leituras simultâneas** durante gravações — algo importante para o painel, que executa consultas enquanto as solicitações estão sendo registradas.

O tamanho padrão do cache é de **65.536 KiB (64 MiB)**. O SQLite interpreta um
`cache_size` negativo como um limite superior aproximado em KiB e aloca páginas sob demanda.
**Configurações > Sistema e armazenamento > Tamanho do cache** aceita valores inteiros de **1 a
1.000.000 KiB**; salvar a configuração a aplica à conexão ativa com o banco de dados,
e o OmniRoute restaura o valor persistido durante a inicialização.

---

## Localização do banco de dados

O arquivo SQLite é armazenado em:

| SO      | Caminho                                                  |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (configurável via `DATA_DIR`) |

Arquivos associados:

- `storage.sqlite-wal` — log de gravação antecipada
- `storage.sqlite-shm` — arquivo de memória compartilhada
- `call_logs/` — artefatos de payload das solicitações (se habilitado)

**Substitua a localização:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arquitetura dos Módulos de Domínio

O banco de dados do OmniRoute possui **110 módulos TypeScript de nível superior** em `src/lib/db/`. Cada módulo de domínio:

- É responsável por uma ou mais tabelas específicas
- Exporta funções CRUD tipadas
- Nunca acessa as tabelas de outro módulo
- Usa `getDbInstance()` de `core.ts` para acessar o banco de dados

### Os 110 Módulos de Banco de Dados de Nível Superior

O OmniRoute possui **110 arquivos TypeScript de nível superior** em `src/lib/db/`. Abaixo está uma amostra dos módulos principais; consulte a listagem do diretório para ver a lista completa:

| Módulo                  | Tabelas                                                        | Responsabilidade                                                                              |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registro e credenciais de provedores por OAuth/chave de API                                   |
| `models.ts`             | `key_value` (dados de modelos)                                 | Definições, recursos e preços dos modelos                                                     |
| `combos.ts`             | `combos`                                                       | Configurações e ordenação de roteamento de combos                                             |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclo de vida das chaves de API, escopos e monitoramento de cotas                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuração do sistema e armazenamento KV compartilhado                                      |
| `backup.ts`             | —                                                              | Operações de exportação/importação de backups                                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurações de proxy e regras de roteamento                                                 |
| `prompts.ts`            | `prompt_templates`                                             | Modelos de prompts reutilizáveis e controle de versões                                        |
| `webhooks.ts`           | `webhooks`                                                     | Assinaturas e logs de webhooks orientados a eventos                                           |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Registro de auditoria por requisição (opcional, alto volume)                                  |
| `domainState.ts`        | `domain_*` (5 tabelas)                                         | Orçamentos de domínio, circuit breakers, bloqueios, cadeias de fallback e histórico de custos |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Chaves de API autorizadas para MCP/A2A                                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Histórico de uso de cotas                                                                     |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapeamento de modelos para combos padrão                                                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | Estado persistente específico da CLI                                                          |
| `encryption.ts`         | —                                                              | Funções auxiliares para criptografar/descriptografar campos                                   |
| `readCache.ts`          | —                                                              | Cache em memória para operações com alto volume de leitura                                    |
| `secrets.ts`            | `key_value` (entradas criptografadas)                          | Armazenamento criptografado de segredos                                                       |
| `stateReset.ts`         | —                                                              | Limpeza/redefinição do estado do banco de dados para testes                                   |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contexto da sessão para transferência entre agentes                                           |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Monitoramento de uso                                                                          |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuração de compactação                                                                   |

### Limites dos Módulos

Uma regra arquitetural fundamental: **os módulos não acessam diretamente as tabelas uns dos outros**. Para trabalhar com os dados de outro módulo, importe a função desse módulo.

```ts
// ❌ ERRADO: SQL direto de outro módulo
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRETO: use a função do módulo providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Essa regra é aplicada por meio da revisão de código — não há uma verificação estática, mas as violações são sinalizadas.

---

## Esquema Base (17 tabelas)

`core.ts` define as 17 tabelas base em `SCHEMA_SQL`. Elas são criadas pela migração `001_initial_schema.sql` e formam o esquema principal.

### Tabelas Principais (criadas na migração inicial)

| Tabela                     | Finalidade                                | Colunas principais                                                      |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credenciais do provedor (criptografadas)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informações de roteamento do nó provedor  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Armazenamento KV de uso geral             | `namespace`, `key`, `value`                                             |
| `combos`                   | Definições de combinações de roteamento   | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Chaves de API para o gateway              | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadados do banco de dados               | `key`, `value`                                                          |
| `usage_history`            | Registros de uso das solicitações         | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Cargas úteis e respostas das solicitações | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logs de solicitações do proxy             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Cadeias de modelo para provedor           | `model`, `chain`                                                        |
| `domain_budgets`           | Orçamentos de gastos por domínio          | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Histórico de redefinição de orçamento     | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Rastreamento de custos por domínio        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Estado de limitação de taxa do domínio    | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Estado do circuit breaker por domínio     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache de respostas do LLM                 | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshots históricos de cota              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabelas Adicionais (adicionadas por migrações posteriores)

Migrações subsequentes adicionam tabelas como:

- `cli_tool_state` (migração 011) — estado da ferramenta de CLI
- Tabelas `mcp_*` — auditoria do servidor MCP
- Tabelas `a2a_*` — estado das tarefas A2A
- Tabelas `usage_*` — rastreamento de uso
- Tabelas `plugin_*` — sistema de plugins
- `skill_executions` — histórico de execução de habilidades
- Tabelas `memory_*` — sistema de memória
- Tabelas `compression_*` — sistema de compressão
- Tabelas `webhook_*` — log de entrega de webhooks
- Tabelas `acp_*` — Agent Client Protocol
- Tabelas `oneproxy_*` — marketplace do 1proxy
- `proxy_assignments` — vinculações de escopo do proxy
- `detailed_call_artifacts` — metadados dos artefatos de log de chamadas
- `quota_alert_history` — auditoria de alertas de cota
- `command_code_auth_sessions` — sessões OAuth do Command Code

A lista completa de mais de 30 tabelas está em `src/lib/db/migrations/`.

---

## Migrações

O OmniRoute usa **migrações versionadas e idempotentes** em `src/lib/db/migrations/`. Cada migração é um único arquivo SQL chamado `NNN_description.sql`.

### Nomenclatura das Migrações

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Como as Migrações São Executadas

Na inicialização, `migrationRunner.ts`:

1. Cria a tabela `_omniroute_migrations` caso ela não exista
2. Consulta as migrações já aplicadas
3. Aplica todas as novas migrações em ordem, cada uma em uma transação
4. Registra cada migração aplicada com um carimbo de data e hora

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

As migrações devem ser **idempotentes** — executá-las duas vezes não deve produzir nenhum efeito adicional:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Use amplamente as cláusulas `IF NOT EXISTS`, `IF EXISTS` e `OR IGNORE` / `OR REPLACE`.

### Como Adicionar uma Nova Migração

1. **Identifique o próximo número**: `ls src/lib/db/migrations/ | tail -1`
2. **Crie o arquivo**: `NNN_my_change.sql`
3. **Use DDL seguro**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Preencha os dados existentes com cuidado**: use `UPDATE ... WHERE ...` para processar as linhas existentes
5. **Teste em uma cópia**: nunca execute migrações não testadas em produção

Exemplo:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Alterações incompatíveis com versões anteriores** (por exemplo, remover colunas) são complicadas. O OmniRoute NÃO oferece suporte a downgrade — depois que uma migração é aplicada, a alteração no esquema é permanente. Planeje-se adequadamente.

---

## Criptografia em Repouso

Campos confidenciais (chaves de API, tokens OAuth e strings de conexão) são criptografados em repouso usando **AES-256-GCM**.

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

### Onde É Usada

- `provider_connections.api_key` — criptografado no nível da aplicação
- `provider_connections.access_token`, `refresh_token`, `id_token` — criptografados no nível da aplicação
- Entradas de `key_value` com `namespace = "secrets"` — criptografadas no nível da aplicação
- `proxy_registry.auth` — criptografado no nível da aplicação (se estiver presente)

### Chave de Criptografia

A chave de criptografia é derivada de uma **frase secreta** (definida por meio da variável de ambiente `STORAGE_ENCRYPTION_KEY`) e de um **salt** (armazenado no banco de dados). Ambos são necessários para descriptografar os dados.

```bash
# Gere uma frase secreta segura
openssl rand -hex 32

# Defina em .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Crítico**: perder a chave de criptografia significa perder o acesso a todos os dados criptografados. **Faça backup da chave separadamente do banco de dados**.

### O Que NÃO É Criptografado

Por motivos de desempenho, os seguintes dados são armazenados em texto simples:

- Nomes de exibição dos provedores
- Definições de modelos (já são públicas)
- Regras de roteamento
- Registros de uso (sem PII)

---

## Ressalvas sobre criptografia (v3.8.16+)

O OmniRoute usa **`migrateLegacyEncryptedString()`** para lidar com dois esquemas de criptografia de forma transparente:

- **Legado** (anterior à v3.5.0): "criptografia" baseada em XOR (não é criptografia real)
- **Atual**: AES-256-GCM com IV e tag de autenticação adequados

O auxiliar de migração detecta o formato legado e criptografa novamente com o novo esquema na primeira leitura. Isso significa que você pode atualizar um banco de dados antigo sem perder as credenciais.

---

## Cache de leitura

Para dados lidos com frequência (modelos, provedores, configurações), `readCache.ts` fornece um **cache em memória**:

```ts
// Armazenado em cache na inicialização, invalidado na gravação
const providers = await getCachedProviders(); // Rápido, em memória
const fresh = await listProviders(); // Lento, acessa o banco de dados
```

| Entidade armazenada em cache | Chave do cache | TTL              |
| ---------------------------- | -------------- | ---------------- |
| `models`                     | `models:v1`    | Até uma gravação |
| `provider_connections`       | `providers:v1` | Até uma gravação |
| `settings`                   | `settings:v1`  | Até uma gravação |
| `combos`                     | `combos:v1`    | Até uma gravação |

O cache é invalidado a cada gravação na tabela correspondente.

---

## Backup e recuperação

### Backup manual

```bash
# Use a CLI para criar um backup local
omniroute backup create --name pre-migration

# Ou por meio da API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

O arquivo de backup inclui:

- Todas as tabelas do banco de dados (serializadas em JSON)
- Artefatos de logs de chamadas (codificados em base64, opcionais)
- Configurações + segredos (criptografados)
- Configuração de plugins

### Restauração

```bash
# Por meio da CLI
omniroute restore pre-migration

# Por meio da API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Aviso**: A restauração sobrescreve todo o banco de dados. Interrompa todos os clientes primeiro.

### Backups automatizados

```bash
# Habilite backups diários automatizados por meio da CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

O agendamento é executado no servidor por uma tarefa em segundo plano que roda a cada 30 segundos
(padrão) e avalia a expressão cron em relação ao horário local do servidor.

| Variável                                    | Padrão  | Descrição                                                                                                             |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Intervalo de execução em ms (mín. `5000`). Deve ser menor que 60 s para ocorrer de forma confiável no minuto do cron. |

### Backup a quente do SQLite

Para fazer backup de um banco de dados ativo sem tempo de inatividade:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Isso usa a API de backup online do SQLite — é seguro executá-la enquanto o OmniRoute estiver em execução.

---

## Ajuste de desempenho

### Modo WAL

O WAL é habilitado por padrão. Para cargas de trabalho com muitas gravações, considere:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Ponto de verificação a cada 1000 páginas
PRAGMA journal_size_limit = 67108864;  -- Limite de 64MB para o WAL
```

### Índices

Principais índices para desempenho (criados automaticamente pelas migrações):

- `idx_models_provider` — consultas de modelos por provedor
- `idx_combo_targets_combo_id` — expansão de destinos de combos
- `idx_usage_history_api_key_timestamp` — análise de uso
- `idx_quota_snapshots_api_key_window` — acompanhamento de cotas
- `idx_call_logs_timestamp` — consultas de logs de chamadas

Para adicionar um novo índice, crie uma migração:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### E/S mapeada em memória

Para bancos de dados muito grandes (>10GB), o mapeamento de memória pode ser ajustado por meio de um pragma do SQLite:

```sql
-- Defina por meio de um pragma do SQLite (ajuste em core.ts ou em tempo de execução)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compactação

Instâncias do OmniRoute executadas por longos períodos se beneficiam da execução ocasional de `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Execute mensalmente durante períodos de pouco tráfego. (O modo WAL reduz a necessidade, mas não a elimina.)

---

## Verificação de integridade

`src/lib/db/healthCheck.ts` fornece **diagnósticos de integridade no nível do banco de dados**:

Ambos os verbos exigem autenticação (`401` caso contrário). `GET` apenas diagnostica; `POST` executa a
mesma verificação com `autoRepair` habilitado.

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
      "description": "Os orçamentos de domínio faziam referência a chaves de API que não existem mais.",
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

| Campo             | Significado                                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` quando `issues` está vazio. `driver` nunca influencia esse valor.                                                                                                                   |
| `issues[].type`   | Um entre `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                  |
| `repairedCount`   | Linhas reparadas durante esta execução; sempre `0` quando `autoRepair` é falso.                                                                                                            |
| `backupCreated`   | Indica se um backup foi criado antes do reparo.                                                                                                                                            |
| `checkedAt`       | Carimbo de data/hora ISO compartilhado pela execução e por qualquer nota de reparo gravada por ela.                                                                                        |
| `driver.name`     | Driver SQLite que atende ao banco de dados verificado.                                                                                                                                     |
| `driver.degraded` | `true` quando as gravações não são armazenadas de forma durável no arquivo do banco de dados — o fallback WASM `sql.js` (persistência do arquivo inteiro) ou um banco de dados em memória. |

O mesmo payload é retornado pela ferramenta MCP `omniroute_db_health_check`.

Execute `PRAGMA integrity_check` para detectar corrupção:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Deve exibir: ok
```

Se retornar qualquer resultado diferente de `ok`, **pare de usar o banco de dados imediatamente** e restaure-o a partir do backup.

---

## Recuperação de Desastres

### Cenário 1: Arquivo WAL Perdido

O arquivo `-wal` está ausente, mas o `-shm` e o banco de dados principal estão intactos:

```bash
# Recupera automaticamente na próxima abertura
omniroute
```

Se o SQLite não conseguir realizar a recuperação automática:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Cenário 2: Arquivo Principal do Banco de Dados Corrompido

Restaure a partir do backup:

```bash
omniroute sync pull --merge   # ou: omniroute backup restore <backup-id>
```

### Cenário 3: Chave de Criptografia Perdida

**Não é possível recuperar** sem a chave. Os campos criptografados ficam ilegíveis. Adicione novamente todos os provedores de forma manual, usando novas credenciais.

> **Mitigação**: Sempre faça backup da chave de criptografia separadamente, de preferência em um gerenciador de senhas ou KMS.

### Cenário 4: Disco Cheio

O SQLite retornará erros `SQLITE_FULL`. Libere espaço em disco e execute:

```bash
# Executa o checkpoint do WAL para liberar espaço
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

### Redefinir (Apagar) Todos os Dados

```bash
# Primeiro, interrompa o OmniRoute
omniroute stop

# Exclua o arquivo do banco de dados
rm ~/.omniroute/storage.sqlite*

# Reinicie (isso recriará um banco de dados vazio)
omniroute
```

Para uma redefinição **seletiva** (manter os provedores e apagar os dados de uso):

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

## Solução de Problemas

### "O banco de dados está bloqueado"

Outro processo está mantendo um bloqueio de gravação. Você pode:

- Aguardar a conclusão do outro processo (verifique com `lsof | grep storage.sqlite`)
- Encerrar o outro processo
- Se o problema persistir, reiniciar o OmniRoute

### "Falha na restrição de chave estrangeira"

Um módulo de domínio está violando a integridade referencial. Verifique:

- Linhas órfãs em tabelas dependentes
- Exclusões em cascata que não foram propagadas
- Migração recente que alterou uma chave estrangeira

Execute `PRAGMA foreign_key_check;` para encontrar violações.

### "Memória insuficiente"

A E/S mapeada em memória do SQLite está excedendo o limite do sistema operacional. Reduza-a por meio de um pragma do SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB em vez de 256MB
```

Ou desative-a:

```sql
PRAGMA mmap_size = 0;
```

### "A migração falhou no meio do processo"

A migração foi executada em uma transação, portanto deveria ter sido revertida. Caso isso não tenha ocorrido:

1. **Interrompa o OmniRoute** (para evitar novas tentativas)
2. **Verifique o estado do banco de dados** com `sqlite3`
3. **Corrija manualmente** a migração parcial
4. **Execute novamente** o OmniRoute (a migração será repetida)

Para evitar esse problema, sempre teste primeiro as migrações em uma cópia.

---

## Veja Também

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabelas de uso
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitoramento da integridade
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — fluxo de lançamento
- Código-fonte: `src/lib/db/` (mais de 80 arquivos, cerca de 25 mil linhas de código)
