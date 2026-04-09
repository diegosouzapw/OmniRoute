# Feature 01 - Camada de Compatibilidade `/v0/management`

## O que ela faz

Cria uma camada de compatibilidade de API para expor no `9router` o namespace `/v0/management/*`, permitindo que clientes que hoje dependem do contrato do ecossistema `CLIProxyAPI` (como o `zero-limit`) funcionem sem fork local.

## Motivacao

Hoje o `9router` tem API rica em `src/app/api/*`, mas com naming e contratos proprios. O `zero-limit` espera endpoints em `/v0/management/*` e falha quando esses contratos nao existem ou possuem semantica diferente.

## Antes x Depois

| Dimensao                              | Antes    | Depois                        |
| ------------------------------------- | -------- | ----------------------------- |
| Namespace de management               | Ausente  | Presente (`/v0/management/*`) |
| Compatibilidade com clientes externos | Parcial  | Alta                          |
| Custo de integracao                   | Alto     | Baixo                         |
| Reuso de UI externa                   | Limitado | Viavel sem patch              |

## Como implementar

1. Criar grupo de rotas em `src/app/api/v0/management/`.
2. Criar modulo adaptador em `src/lib/management/adapter.js` para converter dados internos em payloads compativeis.
3. Padronizar respostas e erros (status code, shape de erro, headers).
4. Definir contrato estavel para auth da camada management.
5. Garantir que endpoints legados internos continuam funcionando (compatibilidade reversa).

## Estrutura sugerida

- `src/app/api/v0/management/route.js`
- `src/app/api/v0/management/config/route.js`
- `src/app/api/v0/management/config.yaml/route.js`
- `src/app/api/v0/management/usage/route.js`
- `src/app/api/v0/management/auth-files/route.js`
- `src/app/api/v0/management/api-call/route.js`
- `src/lib/management/adapter.js`

## Regras de design

- Nao duplicar regra de negocio: so adaptar contrato.
- Reaproveitar `src/lib/localDb.js` e APIs existentes em `src/app/api/*`.
- Padronizar erros em formato OpenAI-like quando apropriado.
- Toda rota de management deve exigir autenticacao adequada.

## Criterios de aceite

- `GET /v0/management/*` retorna respostas validas para os contratos do cliente externo.
- Erros 401/403/404/429 com payload consistente.
- Sem regressao nos endpoints atuais do `9router`.

## Riscos

- Duplicacao de logica entre endpoints novos e antigos.
- Exposicao excessiva de dados de configuracao.
- Inconsistencias de semantica entre contratos.

## Mitigacoes

- Centralizar mapeamentos no adapter.
- Aplicar whitelist de campos expostos.
- Testes de contrato por endpoint.

## O que ganhamos

- Onboarding rapido de clientes existentes do ecossistema management.
- Menor atrito em migracao de ferramentas.
- Base para evolucao de compatibilidade sem quebrar core do `9router`.

## Esforco estimado

- Medio (2 a 4 dias uteis para primeira versao funcional).
