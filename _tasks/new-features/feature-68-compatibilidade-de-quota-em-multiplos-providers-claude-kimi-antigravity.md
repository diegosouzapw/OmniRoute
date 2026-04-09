# 1. Título da Feature

Feature 35 — Compatibilidade de Quota em Múltiplos Providers (Claude/Kimi/Antigravity)

## 2. Objetivo

Atualizar a camada de coleta de quota/uso para refletir endpoints e formatos atuais dos providers OAuth principais (`claude`, `kimi`, `antigravity`) sem alterar o contrato público das APIs `/v1/*`.

## 3. Motivação

A coleta de quota impacta diretamente fallback, UX do dashboard e confiança operacional. Hoje há sinais de defasagem em endpoints e formatos de resposta para alguns providers.

## 4. Problema Atual (Antes)

- `open-sse/services/usage.js` usa endpoint legado de uso para Claude.
- Kimi não está tratado de forma completa no switch central de usage.
- Antigravity usa endpoint/UA que pode divergir dos clientes mais novos.
- Em cenários de mudança de contrato upstream, a tela de quota pode ficar inconsistente.

### Antes vs Depois

| Dimensão          | Antes                              | Depois                                                   |
| ----------------- | ---------------------------------- | -------------------------------------------------------- |
| Claude quota      | Estratégia legada                  | OAuth usage atual + fallback robusto                     |
| Kimi quota        | Parcial                            | Endpoint real `/coding/v1/usages` com parsing por janela |
| Antigravity quota | Endpoint/UA potencialmente antigos | Primário atualizado + fallback                           |
| Resiliência       | Erros opacos                       | Tratamento com fallback e mensagens acionáveis           |

## 5. Estado Futuro (Depois)

A rota de uso passa a ter estratégia provider-aware com:

- endpoint primário atualizado,
- fallback controlado por provider,
- normalização única de payload para o dashboard.

## 6. O que Ganhamos

- Menos falso-negativo de quota disponível.
- Melhor decisão de fallback automático por conta/modelo.
- Menos retrabalho operacional em incidentes de “quota sumiu no painel”.

## 7. Escopo

- Atualização de `open-sse/services/usage.js`.
- Ajuste no fluxo de `src/app/api/usage/[connectionId]/route.js`.
- Testes unitários de parse por provider.

## 8. Fora de Escopo

- Reescrever pipeline de billing/custo completo.
- Alterar contrato externo de `/v1/chat/completions`.
- Dashboard multi-tenant nesta etapa.

## 9. Arquitetura Proposta

```mermaid
flowchart LR
  A[GET /api/usage/{connectionId}] --> B[refresh credentials]
  B --> C{provider}
  C -->|claude| D[oauth usage endpoint]
  C -->|kimi| E[/coding/v1/usages]
  C -->|antigravity| F[fetchAvailableModels]
  D --> G[normaliza payload]
  E --> G
  F --> G
  G --> H[response unificado dashboard]
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `open-sse/services/usage.js`
- `src/app/api/usage/[connectionId]/route.js`
- `open-sse/config/providerRegistry.js`

Estratégia recomendada:

- Claude:

1. Primário: `https://api.anthropic.com/api/oauth/usage`
2. Fallback: probe em `https://api.anthropic.com/v1/messages?beta=true` e leitura de headers `anthropic-ratelimit-*`

- Kimi:

1. Endpoint: `https://api.kimi.com/coding/v1/usages`
2. Parse de quota semanal + janelas deslizantes

- Antigravity:

1. Primário: `https://daily-cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels`
2. Fallback: `https://cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels`

Snippet de direção:

```js
switch (provider) {
  case "claude":
    return getClaudeOAuthUsageWithFallback(accessToken);
  case "kimi":
  case "kimi-coding":
    return getKimiUsage(accessToken);
  case "antigravity":
    return getAntigravityUsageWithEndpointFallback(accessToken);
}
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs novas: nenhuma.
- APIs alteradas: apenas payload interno de `/api/usage/*` mais consistente.
- Compatibilidade: **non-breaking** para `/v1/*`.
- Estratégia de transição: rollout por feature flag de usage parser.

## 12. Passo a Passo de Implementação Futura

1. Criar novos fetchers por provider em `usage.js`.
2. Introduzir fallback chain por endpoint.
3. Normalizar respostas para shape único interno.
4. Atualizar mensagens de erro controladas.
5. Cobrir parsing com fixtures reais/anônimas.

## 13. Plano de Testes

Cenários positivos:

1. Claude OAuth retorna janelas e reset corretamente.
2. Kimi retorna quota semanal + limite por janela.
3. Antigravity retorna fração remanescente por modelo.

Cenários de erro:

4. Endpoint primário indisponível e fallback disponível.
5. Payload inesperado do provider gera erro controlado.

Regressão:

6. Providers já suportados continuam sem quebra de contrato.

Compatibilidade retroativa:

7. Sem dados de quota, API retorna mensagem clara sem quebrar UI.

## 14. Critérios de Aceite

- [ ] Given conexão OAuth válida de Claude, When consultar usage, Then quota aparece com reset consistente.
- [ ] Given conexão Kimi válida, When consultar usage, Then resposta inclui quota semanal e janelas de limite.
- [ ] Given falha no endpoint primário Antigravity, When fallback existir, Then dados ainda são retornados.
- [ ] Given erro upstream irrecuperável, When consultar usage, Then API retorna erro explícito e não crasha.

## 15. Riscos e Mitigações

- Risco: upstream alterar contrato novamente.
- Mitigação: parser tolerante + observabilidade de campos ausentes.

- Risco: timeout em providers lentos.
- Mitigação: timeout por provider + fallback + retry idempotente.

## 16. Plano de Rollout

1. Ativar em ambiente de staging.
2. Validar 3 providers com contas reais.
3. Habilitar gradualmente em produção.
4. Monitorar taxa de erro e “empty quota payload”.

## 17. Métricas de Sucesso

- Queda em erro de quota por provider.
- Redução de tickets de “usage indisponível”.
- Tempo médio de resposta da rota `/api/usage/*`.

## 18. Dependências entre Features

- Complementa `feature-hardening-ssrf-discovery-e-validacao-de-providers-14.md`.
- Alimenta `feature-observabilidade-de-auditoria-e-acoes-administrativas-21.md`.

## 19. Checklist Final da Feature

- [ ] Endpoints atualizados por provider.
- [ ] Fallback por endpoint implementável.
- [ ] Parsing normalizado e testado.
- [ ] Rollout e métricas definidos.
