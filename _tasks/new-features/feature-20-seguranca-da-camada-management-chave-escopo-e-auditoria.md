# Feature 10 - Seguranca da camada management (chave, escopo e auditoria)

## O que ela faz

Define politica de seguranca especifica para endpoints `/v0/management/*`, com autenticacao por chave dedicada, escopo por acao, trilha de auditoria e protecoes anti-abuso.

## Motivacao

A camada de management expoe operacoes sensiveis (config, credenciais, chamadas remotas). Sem politica dedicada, risco de abuso e vazamento aumenta.

## Antes x Depois

| Dimensao             | Antes           | Depois                 |
| -------------------- | --------------- | ---------------------- |
| Auth para management | Nao formalizada | Chave e escopos claros |
| Auditoria            | Parcial         | Completa por endpoint  |
| Controle anti-abuso  | Limitado        | Rate limit + allowlist |

## Como implementar

1. Criar middleware `src/lib/management/authz.js`.
2. Definir escopos minimos (`read_config`, `write_config`, `auth_files`, `api_call`).
3. Integrar com `src/app/api/v0/management/*`.
4. Registrar auditoria em `src/app/api/compliance/audit-log/route.js`.
5. Integrar com filtros de IP existentes quando habilitados.

## Criterios de aceite

- Todas rotas management exigem token/chave valida.
- Operacoes destrutivas exigem escopo explicito.
- Auditoria registra ator, endpoint, resultado e request id.

## Riscos

- Complexidade inicial de permissao.

## Mitigacoes

- Comecar com 2 perfis: read-only e admin.
- Evoluir escopos finos por iteracao.

## O que ganhamos

- Reducao de superficie de risco.
- Base de compliance para operacao enterprise.

## Esforco estimado

- Medio/alto (3 a 5 dias uteis).
