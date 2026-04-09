# 1. Título da Feature

Feature 38 — Rate Limit de Login e Endpoints Sensíveis

## 2. Objetivo

Adicionar proteção de brute-force e abuso por IP em endpoints de autenticação e operações sensíveis do dashboard.

## 3. Motivação

O login e endpoints administrativos são alvos naturais de tentativa de força bruta e flood.

## 4. Problema Atual (Antes)

- `src/app/api/auth/login/route.js` não aplica limite por IP.
- Falta preset de rate-limit reutilizável para rotas críticas.
- Em cenários de ataque, recursos podem ser degradados.

### Antes vs Depois

| Dimensão                       | Antes                 | Depois                     |
| ------------------------------ | --------------------- | -------------------------- |
| Brute force de senha           | Sem barreira dedicada | Janela e limite por IP     |
| Proteção de endpoints críticos | Inconsistente         | Presets centralizados      |
| Observabilidade de bloqueio    | Baixa                 | Contadores + logs por rota |

## 5. Estado Futuro (Depois)

Camada central de rate-limit in-memory (ou pluggable) usada por login e rotas administrativas com header `Retry-After`.

## 6. O que Ganhamos

- Redução de risco de brute force.
- Mais estabilidade sob carga hostil.
- Telemetria de abuso para investigação.

## 7. Escopo

- Login route.
- Rotas sensíveis selecionadas (ex.: alteração de credenciais/chaves).
- Módulo rate-limit compartilhado.

## 8. Fora de Escopo

- Rate limit distribuído multi-nó (Redis) nesta fase.
- Bloqueio por ASN/país.

## 9. Arquitetura Proposta

```mermaid
flowchart LR
  A[request] --> B[getClientIp]
  B --> C[checkRateLimit(route:ip)]
  C -->|allowed| D[handler normal]
  C -->|blocked| E[429 + Retry-After]
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `src/app/api/auth/login/route.js`
- `src/shared/utils/secretsValidator.js`
- `src/proxy.js`

Novo módulo sugerido:

- `src/shared/security/rateLimit.js`

Preset inicial sugerido:

- `LOGIN`: 10 tentativas / 15 min
- `API_KEYS`: 10 req / min
- `CREDENTIAL_CHANGES`: 5 req / 15 min

Snippet de direção:

```js
const rl = checkRateLimit(`login:${clientIp}`, 10, 15 * 60 * 1000);
if (!rl.allowed) {
  return NextResponse.json(
    { error: "Too many attempts" },
    {
      status: 429,
      headers: { "Retry-After": String(rl.retryAfterSeconds) },
    }
  );
}
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs novas: nenhuma.
- APIs alteradas: login pode retornar `429` de forma explícita.
- Compatibilidade: **non-breaking**.

## 12. Passo a Passo de Implementação Futura

1. Implementar utilitário rate-limit.
2. Integrar em login.
3. Integrar em 2-3 endpoints críticos.
4. Adicionar logs de bloqueio.
5. Adicionar testes de janela/limite.

## 13. Plano de Testes

Cenários positivos:

1. Tentativas abaixo do limite autenticam normalmente.

Cenários de erro:

2. Acima do limite retorna 429 com Retry-After.
3. Após expirar janela, fluxo volta ao normal.

Regressão:

4. Login válido continua emitindo cookie/token corretamente.

Compatibilidade retroativa:

5. Clientes atuais continuam compatíveis com 401/429.

## 14. Critérios de Aceite

- [ ] Given 11 tentativas em 15 min, When login é chamado, Then retorna 429.
- [ ] Given janela expirada, When nova tentativa ocorre, Then limite é resetado.
- [ ] Given credencial correta abaixo do limite, When autenticar, Then login funciona sem regressão.

## 15. Riscos e Mitigações

- Risco: bloquear usuários atrás de NAT corporativo.
- Mitigação: limites ajustáveis por env e mensagens claras ao usuário.

## 16. Plano de Rollout

1. Habilitar só em login inicialmente.
2. Monitorar falsos positivos.
3. Expandir para outras rotas sensíveis.

## 17. Métricas de Sucesso

- Queda de tentativas de brute force efetivas.
- Baixa taxa de falso positivo em login.

## 18. Dependências entre Features

- Complementa `feature-observabilidade-de-auditoria-e-acoes-administrativas-21.md`.

## 19. Checklist Final da Feature

- [ ] Rate limit central implementável.
- [ ] Login protegido.
- [ ] Presets iniciais definidos.
- [ ] Testes e métricas disponíveis.
