# Feature 06 - Adaptador de usage para contrato `/v0/management/usage`

## O que ela faz

Implementa endpoint de usage consolidado em contrato compativel para alimentar dashboards externos sem exigir mudanca no core analytics do `9router`.

## Motivacao

O `9router` ja possui varias rotas de uso (`/api/usage/*`), mas clientes externos esperam um endpoint unico com shape especifico.

## Antes x Depois

| Dimensao                           | Antes           | Depois                  |
| ---------------------------------- | --------------- | ----------------------- |
| Endpoint unico de uso              | Ausente         | Presente                |
| Compatibilidade dashboard externo  | Baixa           | Alta                    |
| Reaproveitamento analytics interno | Nao padronizado | Padronizado via adapter |

## Como implementar

1. Criar `src/app/api/v0/management/usage/route.js`.
2. Criar `src/lib/management/usageAdapter.js`.
3. Agregar dados de `src/app/api/usage/*` e `src/lib/usage*`.
4. Normalizar campos por API/model/source.
5. Incluir metadados de falha/sucesso/tokens em formato compativel.

## Criterios de aceite

- Resposta contem totais e breakdown por API/modelo.
- Campos de falha/sucesso consistentes com operacao real.
- Performance aceitavel para dashboards (cache opcional).

## Riscos

- Custo de agregacao em runtime.
- Divergencia entre fontes de uso.

## Mitigacoes

- Cache curto (5-15s).
- Fonte unica prioritaria para consolidacao.

## O que ganhamos

- Dashboard externo funcional sem refatorar storage interno.
- Melhor interoperabilidade entre produtos de observabilidade.

## Esforco estimado

- Medio (2 a 4 dias uteis).
