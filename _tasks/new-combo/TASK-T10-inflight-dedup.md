# TASK T10 — Deduplicar Geração de Handoff em Concorrência

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/REVIEW-STATUS.md`
3. Ler `open-sse/services/contextHandoff.ts`
4. Ler `src/lib/db/contextHandoffs.ts`
5. Ler `tests/unit/context-handoff.test.mjs`

## Problema a resolver

Hoje o guard atual evita gerar handoff quando já existe um registro persistido,
mas não evita a corrida entre:

1. request A cruza 85% e agenda `setImmediate`
2. request B cruza 85% antes do `upsert` do request A
3. ambos geram summary

Resultado: chamadas extras de LLM sem necessidade.

## Objetivo

Garantir que exista no máximo **uma geração in-flight por `(sessionId, comboName)`**
enquanto o handoff ainda não tiver sido persistido ou a tentativa atual não tiver
terminado.

## Implementação esperada

### 1. Guard in-memory

Adicionar um lock em memória em `contextHandoff.ts`:

- chave: `${sessionId}::${comboName}`
- estrutura sugerida: `Set<string>` ou `Map<string, number>`

### 2. Ordem correta do lock

O lock deve ser marcado **antes** de agendar o `setImmediate`, para fechar a race
entre múltiplos requests do mesmo turno.

### 3. Limpeza garantida

O lock deve ser removido em `finally`, independentemente de:

- sucesso
- erro de rede
- parse inválido
- retorno não-OK

### 4. Relação com handoff persistido

O fluxo final deve ser:

1. se não há `sessionId/connectionId`, retornar
2. se já existe handoff persistido ativo, retornar
3. se já existe geração in-flight, retornar
4. senão, registrar lock e iniciar geração

## Não fazer

- Não introduzir locking persistido no banco
- Não transformar a geração async em fluxo bloqueante
- Não adicionar retries automáticos silenciosos além do comportamento atual

## Arquivos esperados

- `open-sse/services/contextHandoff.ts`
- `tests/unit/context-handoff.test.mjs`

## Testes obrigatórios

Adicionar casos explícitos:

1. Duas chamadas consecutivas no mesmo tick resultam em **uma** chamada LLM
2. Se a geração falhar, uma nova tentativa posterior volta a ser permitida
3. Se já existir handoff persistido, o lock in-flight não é necessário

## Critérios de aceite

- Não há dupla geração para a mesma sessão/combo na janela de corrida
- O lock não vaza após falha
- Os testes cobrem sucesso, falha e retry posterior

## Status

- [ ] Lock in-flight implementado
- [ ] Limpeza em `finally` garantida
- [ ] Teste de corrida adicionado
- [ ] Teste de retry após falha adicionado
