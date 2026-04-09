# Feature 07 - Header de versao/build e handshake de saude compativel

## O que ela faz

Adiciona headers de versao/build em respostas de management e endpoint de handshake de raiz para validacao rapida de conectividade por clientes externos.

## Motivacao

Clientes de management monitoram headers como `x-cpa-version`, `x-server-version`, `x-cpa-build-date`, `x-server-build-date` para detectar atualizacao de servidor.

## Antes x Depois

| Dimensao                       | Antes    | Depois        |
| ------------------------------ | -------- | ------------- |
| Header de versao/build         | Ausente  | Presente      |
| Deteccao de upgrade no cliente | Limitada | Automatizavel |
| Health handshake compativel    | Parcial  | Presente      |

## Como implementar

1. Criar helper `src/lib/management/responseHeaders.js`.
2. Injetar headers nas rotas de `/v0/management/*`.
3. Implementar endpoint `GET /v0/management` ou raiz compativel de handshake.
4. Definir fonte da versao/build (package + metadata de build).

## Resposta handshake recomendada

- `message: "CLI Proxy API Server"` (quando necessario para compat)
- `version`
- `build_date`
- `endpoints` basicos disponiveis

## Criterios de aceite

- Cliente externo detecta mudanca de versao sem polling custom.
- Health check reconhecido como valido por ferramentas existentes.

## Riscos

- Ambiguidade entre versao app e versao API.

## Mitigacoes

- Convencao clara: `x-server-version` para API runtime.
- Documentacao publica do significado dos headers.

## O que ganhamos

- Melhor observabilidade de release.
- Menos falso positivo de incompatibilidade cliente-servidor.

## Esforco estimado

- Baixo/medio (1 a 2 dias uteis).
