# Feature 03 - Management de credenciais (`auth-files`)

## O que ela faz

Exponibiliza endpoints de listagem, exclusao e download de arquivos de autenticacao em contrato compativel com `/v0/management/auth-files*`.

## Motivacao

Ferramentas externas dependem de um inventario central de credenciais por provedor. O `9router` tem estrutura de provedores/conexoes, mas nao um contrato compativel de `auth-files`.

## Antes x Depois

| Dimensao                             | Antes   | Depois                |
| ------------------------------------ | ------- | --------------------- |
| Inventario de credenciais compativel | Ausente | Presente              |
| Operacao de limpeza em massa         | Parcial | Compativel            |
| Download para auditoria              | Ausente | Presente com controle |

## Como implementar

1. Criar `src/app/api/v0/management/auth-files/route.js`.
2. Criar `src/app/api/v0/management/auth-files/download/route.js`.
3. Criar `src/lib/management/authFilesAdapter.js`.
4. Mapear `provider connections` para formato `AuthFile` esperado.
5. Suportar query params: `name`, `all=true`.
6. Implementar mascaramento e politicas de seguranca no download.

## Politicas de seguranca

- Nunca retornar token em claro por padrao.
- Download apenas com permissao explicita.
- Logs de auditoria para delete/download.

## Criterios de aceite

- `GET /auth-files` retorna lista de credenciais no formato esperado.
- `DELETE /auth-files?name=...` remove item unico.
- `DELETE /auth-files?all=true` remove em lote com confirmacao.
- `GET /auth-files/download?name=...` respeita politicas de acesso.

## Riscos

- Vazamento de dados sensiveis.
- Exclusao acidental em lote.

## Mitigacoes

- Mascaramento por default.
- Flag de confirmacao para operacoes destrutivas.
- Backup automatico pre-delete.

## O que ganhamos

- Paridade de operacao de credenciais com ecossistema externo.
- Melhor governanca e auditoria de contas.

## Esforco estimado

- Medio (2 a 4 dias uteis).
