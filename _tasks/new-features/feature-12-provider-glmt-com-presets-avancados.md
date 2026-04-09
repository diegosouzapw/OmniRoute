# 1. Título da Feature

Feature 06 — Provider GLMT com Presets Avançados

## 2. Objetivo

Adicionar um provider explícito `glmt` com presets avançados (`max_tokens`, `thinking`, `timeout`, `temperature`) para uso padronizado no `9router`.

## 3. Motivação

O projeto já tem `glm` em `open-sse/config/providerRegistry.js`, mas usuários que dependem de endpoint “coding/thinking” com parâmetros específicos precisam de configuração manual repetitiva e sujeita a erro.

## 4. Problema Atual (Antes)

- `glm` genérico não cobre todos os cenários de “GLM thinking profile” com defaults operacionais.
- Falta de perfil dedicado para endpoint/headers/timeouts específicos.
- Onboarding mais lento para usuários GLMT.

### Antes vs Depois

| Dimensão                | Antes         | Depois            |
| ----------------------- | ------------- | ----------------- |
| Perfil GLMT             | Manual/ad-hoc | Provider dedicado |
| Defaults avançados      | Espalhados    | Centralizados     |
| UX no dashboard         | Genérica      | Preset explícito  |
| Consistência de runtime | Variável      | Padronizada       |

## 5. Estado Futuro (Depois)

Incluir entrada `glmt` no registry com endpoint dedicado e defaults seguros para sessões de coding com alto token budget.

## 6. O que Ganhamos

- Menor fricção de configuração.
- Menos divergência entre ambientes.
- Melhor previsibilidade de comportamento para workloads longos.

## 7. Escopo

- Extensão em `open-sse/config/providerRegistry.js`.
- Ajustes de tradução/headers em `open-sse/services/provider.js`.
- Inclusão em UI de providers e validações.

## 8. Fora de Escopo

- Alterar provider `glm` existente de forma incompatível.
- Mudar contrato de API pública.

## 9. Arquitetura Proposta

```text
Provider Registry
  + glmt
    -> baseUrl: /coding/paas/.../chat/completions
    -> defaults: maxTokens, thinkingBudget, timeout
Execution Pipeline
  -> usa provider glmt como qualquer provider canônico
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `open-sse/config/providerRegistry.js`
- `open-sse/services/provider.js`
- `src/shared/constants/providers.js`
- `src/app/api/providers/[id]/test/route.js`
- `src/app/api/providers/[id]/models/route.js`

Snippet sugerido:

```js
glmt: {
  id: "glmt",
  alias: "glmt",
  format: "claude",
  baseUrl: "https://api.z.ai/api/coding/paas/v4/chat/completions",
  authType: "apikey",
  authHeader: "x-api-key",
  defaults: {
    maxTokens: 65536,
    thinkingBudget: 32768,
    temperature: 0.2,
    timeoutMs: 3000000,
  },
}
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs novas: nenhuma obrigatória.
- APIs alteradas: endpoints internos de providers passam a listar `glmt`.
- Tipos/interfaces: adição de novo provider id (`glmt`).
- Compatibilidade: **non-breaking** (adição).
- Estratégia de transição: rollout gradual por feature flag e fallback para comportamento anterior quando aplicável.
- Registro explícito: sem impacto em API pública externa (`/v1/*`); mudança aditiva em catálogo interno de providers.

## 12. Passo a Passo de Implementação Futura

1. Adicionar provider `glmt` no registry.
2. Garantir suporte de headers/auth no builder de provider.
3. Incluir validação e teste de conexão para `glmt`.
4. Expor provider na UI/dados compartilhados.
5. Definir defaults de runtime e fallback.
6. Cobrir testes de roteamento e tradução.

## 13. Plano de Testes

Cenários positivos:

1. Dado conexão `glmt` válida, quando request é roteada, então URL e headers são montados corretamente.
2. Dado ausência de `max_tokens` no body, quando request entra, então default configurado é aplicado.
3. Dado seleção de provider no dashboard, quando listar providers, então `glmt` aparece corretamente.

Cenários de erro:

4. Dado API key inválida, quando testar provider, então retorno de erro mantém padrão atual.
5. Dado timeout upstream, quando request executa, então erro é classificado sem quebrar fallback.

Regressão:

6. Dado provider `glm` existente, quando `glmt` é adicionado, então comportamento de `glm` não muda.

Compatibilidade retroativa:

7. Dado instalação sem `glmt`, quando upgrade aplicar novo registry, então providers antigos continuam funcionais.

## 14. Critérios de Aceite

- [ ] Given provider `glmt` habilitado, When endpoints internos de providers são consultados, Then `glmt` aparece com metadados completos e válidos.
- [ ] Given requisição com provider `glmt`, When o executor monta o request upstream, Then `baseUrl`, autenticação e headers seguem o preset documentado.
- [ ] Given ausência de parâmetros opcionais (`max_tokens`, `thinking`, `timeout`), When a chamada é processada, Then defaults avançados são aplicados sem erro.
- [ ] Given provider `glm` existente em produção, When `glmt` é adicionado ao registry, Then o comportamento de `glm` permanece estável sem regressões.

## 15. Riscos e Mitigações

- Risco: conflito semântico entre `glm` e `glmt` para usuários.
- Mitigação: documentação clara e labels explícitos na UI.

## 16. Plano de Rollout

1. Publicar `glmt` como provider adicional.
2. Marcar como “experimental” por 1 ciclo.
3. Promover para estável após métricas positivas.

## 17. Métricas de Sucesso

- Taxa de adoção do provider `glmt`.
- Redução de erro de configuração manual em ambientes GLM.
- Sucesso de testes de conexão para `glmt`.

## 18. Dependências entre Features

- Sinergia com `feature-paridade-headers-antigravity-07.md` (padronização de parâmetros operacionais).
- Beneficia de `feature-registro-de-capacidades-de-modelo-08.md`.

## 19. Checklist Final da Feature

- [ ] Provider `glmt` especificado com defaults.
- [ ] Integração em builder/validação/UI.
- [ ] Testes de conexão e regressão feitos.
- [ ] Documentação de uso pronta.
- [ ] Sem breaking change para providers existentes.
