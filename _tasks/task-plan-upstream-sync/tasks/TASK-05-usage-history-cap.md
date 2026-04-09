# TASK-05 — Truncamento de Histórico de Usage a 10k Requests (Limit Configurável)

**Prioridade:** 🟡 IMPORTANTE  
**Origem:** PR upstream `decolua/9router#424`  
**Branch:** `fix/task-05-usage-history-cap`  
**Commit msg:** `fix(usage): correct stats truncation at 10k requests and make history cap configurable`

---

## Problema

O OmniRoute armazena **todas** as requisições de usage no SQLite em `src/lib/usageDb.ts`. Com uso intenso (50k+ requests), o banco de dados cresce sem controle e o I/O degrada significativamente. Efeitos observados:

1. **Dashboard Analytics lento** — queries de agregação demoram porque varrem todo o histórico
2. **Disk space** — para alto volume, o arquivo SQLite pode crescer a dezenas de MB
3. **Memory pressure** — SQLite carrega índices na memória RAM

O upstream de `decolua/9router` (PR #424) reportou um bug específico: as estatísticas "truncam" visualmente após 10k requests porque a query de paginação tem um bug, mas o problema raiz é que **não existe limite/rotação de logs**.

---

## Solução

Implementar um mecanismo de **cap configurável** no histórico de call logs:

1. Definir uma constante `DEFAULT_MAX_CALL_LOGS = 10000` (valor padrão)
2. Permitir override via settings do dashboard (`MAX_CALL_LOGS`)
3. Ao inserir um novo call log, verificar se o total excede o cap e truncar os mais antigos (FIFO)

---

## Arquivos a Modificar

### 1. MODIFICAR: `src/lib/usageDb.ts`

Localizar a função que insere call logs (provavelmente `saveCallLog` ou similar). Adicionar truncamento automático:

```typescript
// Constante
const DEFAULT_MAX_CALL_LOGS = 10_000;

// Função auxiliar para obter o cap configurado
function getMaxCallLogs(): number {
  try {
    const setting = getSetting("MAX_CALL_LOGS");
    if (setting) {
      const num = parseInt(setting, 10);
      if (!isNaN(num) && num > 0) return num;
    }
  } catch {}
  return DEFAULT_MAX_CALL_LOGS;
}

// Após cada insert de call log, executar truncamento
function pruneOldCallLogs(db: any): void {
  const maxLogs = getMaxCallLogs();
  try {
    const countRow = db.prepare("SELECT COUNT(*) as total FROM call_logs").get();
    if (countRow && countRow.total > maxLogs) {
      const excess = countRow.total - maxLogs;
      db.prepare(
        "DELETE FROM call_logs WHERE id IN (SELECT id FROM call_logs ORDER BY created_at ASC LIMIT ?)"
      ).run(excess);
    }
  } catch (err) {
    // Non-critical — don't crash on pruning failure
    console.warn("[usageDb] Failed to prune old call logs:", err);
  }
}
```

**ATENÇÃO:** A implementação exata depende da estrutura atual do `usageDb.ts`. Antes de implementar:
1. Ler o arquivo completo para entender a estrutura
2. Identificar a função de inserção (`saveCallLog` ou `insertCallLog`)
3. Identificar o nome da tabela (`call_logs` ou `request_logs`)
4. Verificar se existe coluna `created_at` ou equivalente para ordenar

---

### 2. MODIFICAR: `src/lib/db/settings.ts`

Adicionar `MAX_CALL_LOGS` como setting reconhecido se já não existir. Verificar se o sistema de settings suporta valores numéricos.

---

### 3. CRIAR: `tests/unit/usage-cap.test.mjs` (opcional)

Se possível, criar um teste unitário que:
1. Insere N+1 logs em um DB temporário
2. Verifica que apenas N logs permanecem após pruning

---

## Investigação Necessária Antes de Implementar

Executar estes comandos para entender a estrutura atual:

```bash
# Ver a estrutura de usageDb
grep -n "INSERT\|CREATE TABLE\|saveCallLog\|insertCall" src/lib/usageDb.ts | head -20

# Ver se já existe algum mecanismo de pruning
grep -n "prune\|truncat\|DELETE.*call_log\|DELETE.*request" src/lib/usageDb.ts

# Ver nome da tabela de logs
grep -n "call_logs\|request_logs" src/lib/usageDb.ts | head -10
```

---

## Validação

1. **Build:** `npm run build`
2. **Testes unitários:** `npm run test:unit`
3. **Teste funcional:** Verificar que o dashboard analytics continua funcionando normalmente

---

## Riscos

- **Perda de dados:** Logs antigos serão deletados automaticamente. Se o usuário quer reter mais, pode aumentar `MAX_CALL_LOGS` via settings.
- **Performance do DELETE:** Para primeira execução com milhares de logs acumulados, o DELETE pode levar alguns segundos. Considerar executar em batches de 1000.
- **WAL mode:** O SQLite do OmniRoute já usa WAL mode, então DELETEs concorrentes com SELECTs são seguros.
