# Feature 05 - Endpoint `api-call` seguro para operacoes de management

## O que ela faz

Cria `POST /v0/management/api-call` para chamadas remotas controladas via backend, permitindo que o cliente solicite consultas de quota/usage sem expor toda logica localmente.

## Motivacao

O cliente externo usa um endpoint generico para chamadas HTTP com contexto de credencial (`authIndex`). Sem esse contrato, varios modulos de quota e diagnostico deixam de funcionar.

## Antes x Depois

| Dimensao                        | Antes      | Depois   |
| ------------------------------- | ---------- | -------- |
| Chamada generica via management | Ausente    | Presente |
| Reuso de clientes existentes    | Baixo      | Alto     |
| Controle de seguranca central   | Nao formal | Formal   |

## Como implementar

1. Criar `src/app/api/v0/management/api-call/route.js`.
2. Criar validador em `src/lib/management/apiCallValidator.js`.
3. Criar executor em `src/lib/management/apiCallExecutor.js`.
4. Restringir metodos (`GET`, `POST`) na primeira fase.
5. Aplicar allowlist de hosts e limites de timeout.
6. Mascarar headers sensiveis nos logs.

## Payload recomendado

- `authIndex`
- `method`
- `url`
- `header`
- `data`

## Criterios de aceite

- Retorna `status_code`, `header`, `body` no formato esperado.
- Bloqueia hosts/metodos fora da politica.
- Respeita timeout e tamanho maximo de payload.

## Riscos

- Vetor SSRF se nao houver allowlist.
- Uso indevido para exfiltracao.

## Mitigacoes

- Allowlist obrigatoria.
- Bloqueio de IPs internos sensiveis.
- Auditoria por request id.

## O que ganhamos

- Compatibilidade funcional com modulo de quota e verificacoes externas.
- Reuso de componentes de management sem reescrever clientes.

## Esforco estimado

- Medio/alto (3 a 5 dias uteis por implicacoes de seguranca).
