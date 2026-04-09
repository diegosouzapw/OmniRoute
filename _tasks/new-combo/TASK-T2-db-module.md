# TASK T2 — DB Module: `src/lib/db/contextHandoffs.ts`

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Confirmar que T1 está concluída (migration `018_context_handoffs.sql` existe)
3. Ler `src/lib/db/quotaSnapshots.ts` para entender o padrão de módulo DB do projeto
4. Ler `src/lib/db/core.ts` (linhas 1-80) para entender `getDbInstance()` e `rowToCamel()`
5. Ler `src/lib/localDb.ts` para entender a re-export layer — NÃO adicionar lógica lá, apenas adicionar export se necessário

## Objetivo

Criar o módulo de acesso a dados para a tabela `context_handoffs`. Seguir estritamente o padrão dos outros módulos DB do projeto.

## Arquivo a Criar

**`src/lib/db/contextHandoffs.ts`**

## Interface HandoffPayload

```typescript
export interface HandoffPayload {
  id?: string;
  sessionId: string;
  comboName: string;
  fromAccount: string;          // connectionId[:8] da conta anterior
  summary: string;              // texto completo do summary LLM
  keyDecisions: string[];       // ex: ["usar strategy X", "limitar a 95%"]
  taskProgress: string;         // ex: "70% completo — falta integrar no loop"
  activeEntities: string[];     // ex: ["combo.ts", "quotaFetcher.ts", "TypeScript"]
  messageCount: number;         // quantas mensagens foram incluídas na geração
  model: string;                // ex: "codex/gpt-5.3-codex"
  warningThresholdPct: number;  // threshold que disparou (ex: 0.85)
  generatedAt: string;          // ISO timestamp
  expiresAt: string;            // ISO timestamp (TTL = resetAt da janela)
  createdAt?: string;
}
```

## Funções a Implementar

### `upsertHandoff(payload: HandoffPayload): void`

Insere ou substitui o handoff para a combinação (sessionId, comboName). Usa INSERT OR REPLACE (garante unicidade via UNIQUE index criado em T1).

```typescript
// Serializar arrays como JSON antes de salvar:
// key_decisions = JSON.stringify(payload.keyDecisions)
// active_entities = JSON.stringify(payload.activeEntities)
```

---

### `getHandoff(sessionId: string, comboName: string): HandoffPayload | null`

Retorna o handoff ativo (não-expirado) para a sessão+combo. Retorna `null` se:
- Não existe registro
- O registro existe mas `expires_at < now()` (expirado)

```sql
SELECT * FROM context_handoffs
WHERE session_id = ? AND combo_name = ? AND expires_at > ?
ORDER BY created_at DESC LIMIT 1
```

Deserializar JSON dos campos `key_decisions` e `active_entities`.

---

### `deleteHandoff(sessionId: string, comboName: string): void`

Remove o handoff para a sessão+combo. Chamado quando o handoff foi consumido (injetado na nova conta) para evitar reinjeção em requests subsequentes.

---

### `cleanupExpiredHandoffs(): number`

Remove todos os registros expirados. Retorna o número de registros removidos. Deve implementar throttle (no máximo 1x a cada 30 minutos, similar ao padrão do `quotaSnapshots.ts`).

```sql
DELETE FROM context_handoffs WHERE expires_at < ?
```

---

### `hasActiveHandoff(sessionId: string, comboName: string): boolean`

Verificação rápida se existe handoff ativo sem carregar o payload inteiro.

```sql
SELECT 1 FROM context_handoffs
WHERE session_id = ? AND combo_name = ? AND expires_at > ?
LIMIT 1
```

---

## Exemplo de Implementação (estrutura base)

```typescript
import { getDbInstance, rowToCamel } from "./core";

// ... interface HandoffPayload ...

let lastCleanupAt = 0;

export function upsertHandoff(payload: HandoffPayload): void {
  const db = getDbInstance() as unknown as DbLike;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT OR REPLACE INTO context_handoffs
    (session_id, combo_name, from_account, summary, key_decisions,
     task_progress, active_entities, message_count, model,
     warning_threshold_pct, generated_at, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    payload.sessionId,
    payload.comboName,
    payload.fromAccount,
    payload.summary,
    JSON.stringify(payload.keyDecisions),
    payload.taskProgress,
    JSON.stringify(payload.activeEntities),
    payload.messageCount,
    payload.model,
    payload.warningThresholdPct,
    payload.generatedAt,
    payload.expiresAt,
    now
  );
}
```

## Verificação

```bash
# TypeScript deve compilar sem erros
npx tsc --noEmit -p tsconfig.typecheck-core.json 2>&1 | grep contextHandoffs

# Verificar que não tem imports circulares
npm run check:cycles 2>&1 | grep contextHandoffs
```

## Export em `localDb.ts`

Verificar se `src/lib/localDb.ts` precisa re-exportar as funções (depende de como o `contextHandoff.ts` (T3) irá importar). Se importar diretamente via caminho relativo, não é necessário adicionar ao localDb.

## Status

- [ ] Interface `HandoffPayload` exportada
- [ ] `upsertHandoff` implementada
- [ ] `getHandoff` implementada (com filtro de TTL)
- [ ] `deleteHandoff` implementada
- [ ] `cleanupExpiredHandoffs` implementada (com throttle 30min)
- [ ] `hasActiveHandoff` implementada
- [ ] TypeScript compila sem erros
- [ ] Sem imports circulares
