# TASK T1 — DB Migration: `context_handoffs` Table

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler o arquivo `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md` para entender o contexto geral
2. Ver o padrão de migrations existentes em `src/lib/db/migrations/017_version_manager_upstream_proxy.sql`
3. Ver como o `migrationRunner.ts` carrega as migrations (`src/lib/db/migrationRunner.ts`)
4. A próxima migration disponível é `018_*` (a última é `017`)

## Objetivo

Criar a migration SQL que adiciona a tabela `context_handoffs` ao banco SQLite. Esta tabela persiste os Handoff Payloads gerados pelo LLM antes da troca de conta.

## Arquivo a Criar

**`src/lib/db/migrations/018_context_handoffs.sql`**

## Schema Completo

```sql
-- Migration 018: Context Handoffs table for context-relay combo strategy
-- Stores LLM-generated handoff payloads that bridge account switches.
-- TTL-controlled: records expire when the quota window resets.

CREATE TABLE IF NOT EXISTS context_handoffs (
  id              TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  session_id      TEXT NOT NULL,
  combo_name      TEXT NOT NULL,
  from_account    TEXT NOT NULL,       -- connectionId[:8] of the source account
  summary         TEXT NOT NULL,       -- LLM-generated summary (~200 words)
  key_decisions   TEXT NOT NULL DEFAULT '[]',  -- JSON array of decision strings
  task_progress   TEXT NOT NULL DEFAULT '',    -- current task status string
  active_entities TEXT NOT NULL DEFAULT '[]',  -- JSON array of mentioned entities/files
  message_count   INTEGER NOT NULL DEFAULT 0,  -- number of messages processed  
  model           TEXT NOT NULL DEFAULT '',    -- model that generated the summary
  warning_threshold_pct REAL NOT NULL DEFAULT 0.85,
  generated_at    TEXT NOT NULL,       -- ISO 8601 timestamp
  expires_at      TEXT NOT NULL,       -- ISO 8601 timestamp (= resetAt of quota window)
  created_at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Fast lookup by session (most common query pattern)
CREATE INDEX IF NOT EXISTS idx_context_handoffs_session
  ON context_handoffs(session_id, expires_at);

-- Fast cleanup of expired records
CREATE INDEX IF NOT EXISTS idx_context_handoffs_expires
  ON context_handoffs(expires_at);

-- Unique active handoff per session+combo (only one active handoff at a time)
CREATE UNIQUE INDEX IF NOT EXISTS idx_context_handoffs_session_combo
  ON context_handoffs(session_id, combo_name);
```

## Verificação

Após criar o arquivo, verificar:

```bash
# O arquivo deve existir com o número correto
ls src/lib/db/migrations/ | grep 018

# O migrationRunner deve detectar automaticamente (verifica formato do nome)
# Não é necessário registrar manualmente — o runner usa glob
```

## Notas de Implementação

- O `migrationRunner.ts` usa `glob` ou `fs.readdir` para carregar migrations em ordem — confirmar o mecanismo exato lendo o arquivo antes de criar
- O campo `key_decisions` e `active_entities` armazenam JSON serializado como TEXT (padrão SQLite do projeto — ver `domainState.ts`)
- O índice UNIQUE em `(session_id, combo_name)` garante que só existe 1 handoff ativo por sessão/combo — novas gerações fazem UPSERT

## Status

- [ ] Arquivo criado
- [ ] Migration verificada com `migrationRunner.ts`
- [ ] Índices validados
