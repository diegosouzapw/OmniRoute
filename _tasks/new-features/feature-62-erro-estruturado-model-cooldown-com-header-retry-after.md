# 1. Título da Feature

Feature 29 — Erro Estruturado `model_cooldown` com Header `Retry-After`

## 2. Objetivo

Retornar erro explícito e padronizado quando todas as credenciais de um modelo estiverem em cooldown, incluindo `Retry-After` para orientar clientes e SDKs.

## 3. Motivação

Atualmente, quando todas as contas estão indisponíveis temporariamente, a resposta nem sempre explicita corretamente “cooldown por modelo” com semântica de retry orientada a máquina.

## 4. Problema Atual (Antes)

- Erros podem sair genéricos (`service_unavailable`) sem código semântico específico.
- Alguns caminhos não retornam `Retry-After` adequado.
- Clientes não conseguem automatizar backoff com precisão.

### Antes vs Depois

| Dimensão                | Antes         | Depois      |
| ----------------------- | ------------- | ----------- |
| Clareza do erro         | Média         | Alta        |
| Header `Retry-After`    | Inconsistente | Consistente |
| Automação do cliente    | Limitada      | Melhorada   |
| Diagnóstico operacional | Mais difícil  | Mais direto |

## 5. Estado Futuro (Depois)

Padronizar o envelope de erro para cenários de cooldown total:

```json
{
  "error": {
    "code": "model_cooldown",
    "message": "All credentials for model X are cooling down",
    "model": "...",
    "reset_seconds": 12
  }
}
```

## 6. O que Ganhamos

- Clientes podem fazer retry inteligente automaticamente.
- Menor ruído de suporte por indisponibilidade temporária.
- Melhor rastreabilidade de eventos de quota/cooldown.

## 7. Escopo

- Padronizar função de resposta de indisponibilidade.
- Garantir cálculo correto de `Retry-After`.
- Adaptar pontos do fluxo que hoje retornam erro genérico.

## 8. Fora de Escopo

- Redefinir todo o catálogo de erros da API.
- Alterar semântica de erros de autenticação/autorização.

## 9. Arquitetura Proposta

```text
No candidates available
  -> classify reason = model cooldown
  -> build structured error body
  -> set Retry-After header
  -> return 429
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `open-sse/utils/error.js`
- `src/sse/services/auth.js`
- `src/sse/handlers/chat.js`

Exemplo de função:

```js
function modelCooldownResponse({ model, retryAfterSec }) {
  return new Response(
    JSON.stringify({
      error: {
        code: "model_cooldown",
        message: `All credentials for model ${model} are cooling down`,
        model,
        reset_seconds: retryAfterSec,
      },
    }),
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec), "Content-Type": "application/json" },
    }
  );
}
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- API pública: sem nova rota; mudança na qualidade semântica da resposta em casos específicos.
- Tipos/interfaces: novo `ModelCooldownErrorPayload`.
- Compatibilidade: non-breaking (melhoria de contrato de erro).

## 12. Passo a Passo de Implementação Futura

1. Criar helper de erro `model_cooldown`.
2. Integrar no caminho “todas contas em cooldown”.
3. Garantir status HTTP 429 nesses casos.
4. Garantir `Retry-After` sempre consistente com `retryAfter` interno.
5. Atualizar documentação de erro para consumidores.

## 13. Plano de Testes

Cenários positivos:

1. Dado todas contas em cooldown, quando request chega, então retorna `model_cooldown` + `Retry-After`.
2. Dado cooldown expira, quando nova request chega, então fluxo normal retorna.
3. Dado múltiplos modelos, quando um está em cooldown, então erro aponta modelo correto.

Cenários de erro:

4. Dado timestamp inválido interno, quando construir resposta, então usar fallback seguro de retry.
5. Dado ausência de metadado de modelo, quando erro ocorre, então resposta ainda é válida e parseável.

Regressão:

6. Dado erro não relacionado a cooldown, quando processado, então mantém classificação original.

## 14. Critérios de Aceite

- [ ] Given indisponibilidade por cooldown total, When resposta é emitida, Then `error.code=model_cooldown` e status 429 são retornados.
- [ ] Given `retryAfter` interno, When serializado no response, Then header `Retry-After` contém valor coerente.
- [ ] Given cliente automatizado, When parseia erro, Then consegue programar retry sem heurística textual.
- [ ] Given outros tipos de erro, When processados, Then comportamento legado não é afetado.

## 15. Riscos e Mitigações

- Risco: cliente interpretar 429 como limite global e não por modelo.
- Mitigação: campo explícito `model` e `code=model_cooldown`.

## 16. Plano de Rollout

1. Ativar log-only de classificação em staging.
2. Habilitar resposta estruturada em produção.
3. Monitorar compatibilidade com principais clientes.

## 17. Métricas de Sucesso

- Percentual de erros 429 classificados como `model_cooldown`.
- Redução de retries agressivos sem backoff.
- Queda de tickets “indisponível sem explicação”.
