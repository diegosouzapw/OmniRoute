# Feature 11 - Suite de testes de contrato para `/v0/management`

## O que ela faz

Cria suite de testes automatizados para validar que o contrato management permanece compativel ao longo do tempo.

## Motivacao

Compatibilidade sem testes tende a quebrar em refactors. Para sustentar integracao com clientes externos, o contrato precisa de garantia automatizada.

## Antes x Depois

| Dimensao                     | Antes    | Depois   |
| ---------------------------- | -------- | -------- |
| Teste de contrato management | Ausente  | Presente |
| Confianca em release         | Media    | Alta     |
| Regressao silenciosa         | Provavel | Reduzida |

## Como implementar

1. Criar pasta `tests/contract/management/`.
2. Criar fixtures de resposta esperada por endpoint.
3. Testar cenarios felizes e de erro (401, 403, 404, 429, 500).
4. Integrar no pipeline CI.
5. Adicionar smoke test para headers de versao/build.

## Criterios de aceite

- Todos endpoints management com pelo menos 1 teste feliz + 1 teste de erro.
- CI bloqueia merge quando contrato quebrar.
- Fixtures versionadas e revisadas.

## Riscos

- Fixtures ficarem desatualizadas com mudanca legitima.

## Mitigacoes

- Processo de versionamento do contrato.
- Changelog de breaking changes.

## O que ganhamos

- Evolucao segura sem perder compatibilidade.
- Menor custo de suporte em mudancas futuras.

## Esforco estimado

- Medio (2 a 4 dias uteis).
