# Feature 04 - Ponte OAuth compativel (`auth-url`, `status`, `callback`)

## O que ela faz

Entrega endpoints de OAuth compativeis com clientes de management:

- `/{provider}-auth-url`
- `/get-auth-status`
- `/oauth-callback`

Com mapeamento entre provedores e variantes de nomes.

## Motivacao

O `9router` ja possui fluxo OAuth forte, mas o contrato externo esperado por clientes (como `zero-limit`) usa nomenclaturas/paths diferentes. Sem bridge, o fluxo de login remoto quebra.

## Antes x Depois

| Dimensao                         | Antes   | Depois   |
| -------------------------------- | ------- | -------- |
| Start OAuth por contrato externo | Ausente | Presente |
| Polling de status padronizado    | Parcial | Presente |
| Callback compativel              | Parcial | Presente |

## Como implementar

1. Criar rotas em `src/app/api/v0/management/` para start/status/callback.
2. Criar mapper em `src/lib/management/oauthMapper.js`.
3. Mapear provedores especiais (ex.: `copilot -> github`, `gemini-cli -> gemini` quando necessario).
4. Reusar servicos existentes em `src/lib/oauth/*`.
5. Definir formato uniforme de resposta (`ok`, `wait`, `error`).

## Campos de resposta recomendados

- `status`
- `url` ou `auth_url`
- `state`
- `completed`
- `failed`
- `error`/`message`

## Criterios de aceite

- Fluxo completo funciona para ao menos 3 provedores OAuth.
- Polling retorna transicoes corretas (`wait -> ok` ou `error`).
- Callback processa redirecionamento sem necessidade de ajuste no cliente.

## Riscos

- Corrida de estado entre callback e polling.
- Diferencas de semantica entre provedores.

## Mitigacoes

- Armazenar estado de auth com TTL.
- Tabela de mapeamento por provedor com testes.

## O que ganhamos

- Compatibilidade imediata com clients existentes.
- Menor complexidade de onboarding OAuth.

## Esforco estimado

- Medio (2 a 3 dias uteis).
