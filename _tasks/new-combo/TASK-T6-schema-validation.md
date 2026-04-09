# TASK T6 — Validação do Schema de Combo

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Confirmar que T1-T5 estão concluídas
3. Ler `src/shared/validation/providerSchema.ts` — padrão de validação Zod do projeto
4. Buscar onde o schema de combo é validado:
   ```bash
   grep -r "comboSchema\|z.object.*strategy\|strategy.*round-robin" src/ --include="*.ts" -l
   ```
5. Ler `src/lib/db/combos.ts` para entender a estrutura de um combo no banco

## Objetivo

Garantir que `context-relay` seja uma string válida no campo `strategy` do schema de criação/edição de combos. Sem isso, a API de criação de combos pode rejeitar o novo strategy.

## Onde Verificar

### 1. Schema Zod do campo `strategy`

Buscar onde o campo `strategy` é validado com Zod:

```bash
grep -r "strategy" src/app/api --include="*.ts" -n | grep -i "enum\|z.string\|literal"
```

Esperado: encontrar algo como:
```typescript
strategy: z.enum(["priority", "round-robin", "weighted", "auto", ...])
```

**Adicionar `"context-relay"` ao enum.**

### 2. Frontend: Seletor de Strategy no Dashboard

Verificar se existe um seletor dropdown para o campo strategy na UI:

```bash
grep -r "round-robin\|priority\|strategy" src/app/dashboard --include="*.tsx" -l
```

Adicionar `"context-relay"` à lista de opções, com uma label descritiva:
```
"context-relay" → "Context Relay (Handoff-Aware)"
```

### 3. `src/lib/db/combos.ts` — Tipos TypeScript

Verificar se existe um `type Strategy = "priority" | "round-robin" | ...`. Se sim, adicionar `"context-relay"`.

### 4. Documentação inline no código

No arquivo `combo.ts`, a linha 526 diz:
```
* Supports all 6 strategies: priority, weighted, round-robin, random, least-used, cost-optimized
```

Atualizar para incluir `context-relay` e o novo total.

## Config Específico do `context-relay`

O `context-relay` pode ter configuração extra em `combo.config`:

```typescript
interface ContextRelayConfig {
  handoff_model?: string;       // modelo para gerar o summary (default: último LKGP)
  handoff_threshold?: number;   // threshold de warning (default: 0.85)
  handoff_providers?: string[]; // providers habilitados para handoff (default: ["codex"])
  max_messages_for_summary?: number; // (default: 30)
}
```

Adicionar estes campos ao schema Zod de `combo.config` (deve ser `z.record(z.unknown())` ou similar — verificar).

## Verificação

```bash
# Testar criação de combo via API
curl -X POST http://localhost:3000/api/combos \
  -H "Content-Type: application/json" \
  -d '{
    "name": "codex-relay",
    "models": ["codex/gpt-5.3-codex"],
    "strategy": "context-relay",
    "config": {
      "handoff_threshold": 0.85,
      "handoff_providers": ["codex"]
    }
  }'

# Deve retornar 200/201 e não rejeitar o strategy
```

## Status

- [ ] `"context-relay"` adicionado ao enum Zod de strategy (se existir)
- [ ] `"context-relay"` adicionado ao tipo TypeScript de strategy (se existir)
- [ ] UI dropdown atualizado com a nova opção e label descritiva
- [ ] Comentário na linha 526 do `combo.ts` atualizado
- [ ] Campos opcionais de `ContextRelayConfig` documentados
