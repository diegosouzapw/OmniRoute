# TASK T9 — Alinhamento Arquitetural do Runtime

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/REVIEW-STATUS.md`
3. Ler `open-sse/services/combo.ts`
4. Ler `src/sse/handlers/chat.ts`
5. Relacionar a implementação atual com as tasks originais T4 e T5

## Objetivo

Confirmar se a arquitetura atual entrega os contratos funcionais do
`context-relay` sem precisar reintroduzir um `handleContextRelayCombo`
dedicado.

## Regra principal

**Não refatorar por simetria.**

Se o desenho atual:

- gera handoff na janela 85%-94%
- injeta handoff apenas quando há troca real de conta
- não polui a sessão com o request interno de summary
- continua compatível com o loop genérico de combos

então ele deve permanecer como a arquitetura canônica.

Só voltar para um handler dedicado se houver falha funcional comprovada.

## Hipótese atual a validar

O desenho atual é:

- `handleComboChat` cuida apenas do hook pós-sucesso para geração do handoff
- `handleSingleModelChat` cuida da injeção porque é onde o `connectionId`
  realmente selecionado passa a ser conhecido

## Matriz de comportamento obrigatória

Validar explicitamente estes casos:

1. Quota `< 0.85`: request normal, sem geração de handoff
2. Quota `0.85-0.94`: request normal + geração async do handoff
3. Quota `>= 0.95`: conta pulada pelo preflight, sem tentativa de usar a conta exaurida
4. Mesma conta em requests consecutivos: não injetar handoff
5. Troca real de conta: injetar handoff uma única vez
6. Request interno de summary: não tocar sticky session nem reinjetar handoff

## Entregáveis

### Se a arquitetura atual estiver correta

- Atualizar comentários inline em `combo.ts` e `chat.ts` se necessário
- Registrar no código que a divisão atual é intencional
- Não criar `handleContextRelayCombo`

### Se a arquitetura atual falhar em algum contrato

- Corrigir o comportamento
- Só criar `handleContextRelayCombo` se a correção não puder ser feita de forma
  segura no desenho atual

## Arquivos potenciais de alteração

- `open-sse/services/combo.ts`
- `src/sse/handlers/chat.ts`
- `tests/unit/chat-context-relay.test.mjs`
- `tests/unit/combo-context-relay.test.mjs`

## Critérios de aceite

- Existe uma decisão explícita e documentada sobre manter ou não o handler dedicado
- Não sobra ambiguidade no plano sobre qual arquitetura é a oficial
- Nenhum refactor estrutural é feito sem necessidade funcional demonstrada

## Status

- [ ] Arquitetura atual auditada contra os contratos do plano
- [ ] Decisão registrada: manter desenho atual ou refatorar
- [ ] Comentários/código alinhados com a decisão
- [ ] Nenhum refactor cosmético desnecessário introduzido
