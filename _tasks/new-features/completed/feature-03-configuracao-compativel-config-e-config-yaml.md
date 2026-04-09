# Feature 02 - Configuracao compativel (`/config` e `/config.yaml`)

## O que ela faz

Implementa contratos de configuracao em `/v0/management/config` e `/v0/management/config.yaml` (GET/PUT), com traducao entre modelo interno do `9router` e formato esperado por clientes externos.

## Motivacao

Clientes como `zero-limit` usam leitura/edicao de YAML para settings de backend. O `9router` ja possui settings em APIs proprias, mas nao expoe essa interface de forma compativel.

## Antes x Depois

| Dimensao                      | Antes              | Depois              |
| ----------------------------- | ------------------ | ------------------- |
| GET config JSON               | Endpoint diferente | Endpoint compativel |
| GET/PUT config YAML           | Ausente            | Presente            |
| Edicao remota por ferramentas | Parcial            | Completa            |
| Interoperabilidade            | Baixa              | Alta                |

## Como implementar

1. Criar `src/app/api/v0/management/config/route.js`.
2. Criar `src/app/api/v0/management/config.yaml/route.js`.
3. Criar serializador/deserializador em `src/lib/management/configSerializer.js`.
4. Mapear chaves internas para chaves compativeis.
5. Implementar validacao estrita antes de aplicar PATCH/PUT.
6. Implementar estrategia de rollback em caso de YAML invalido.

## Campos prioritarios

- `secret-key` / credenciais de management
- toggles de uso/telemetria
- comportamento de proxy
- limites e controles operacionais

## Criterios de aceite

- GET JSON retorna shape esperado por cliente de management.
- GET YAML retorna documento valido e editavel.
- PUT YAML aplica alteracoes suportadas e retorna diff de mudancas.
- Chaves nao suportadas devem retornar erro explicito.

## Riscos

- Drift entre schema interno e schema compativel.
- Mudanca insegura de configuracao em runtime.

## Mitigacoes

- Versionar schema compativel.
- Validacao + backup antes de persistir.
- Bloquear campos sensiveis sem privilegio elevado.

## O que ganhamos

- Ferramentas de management passam a operar no `9router` sem adaptador custom.
- Menor custo operacional para editar configuracao.

## Esforco estimado

- Medio (2 a 3 dias uteis).
