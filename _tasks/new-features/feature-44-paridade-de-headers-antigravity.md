# 1. Título da Feature

Feature 19 — Paridade de Headers Antigravity

## 2. Objetivo

Alinhar headers e User-Agent usados nas chamadas de quota/usage do provider Antigravity para maximizar compatibilidade e reduzir respostas inconsistentes.

## 3. Motivação

`open-sse/services/usage.js` usa headers/UA que podem divergir de padrões esperados por alguns endpoints internos. Pequenas diferenças de header podem impactar resposta, rate limit ou forma de payload.

## 4. Problema Atual (Antes)

- Configuração de headers de quota não centralizada.
- Potencial divergência entre chamadas de execução e chamadas de observabilidade.
- Diagnóstico difícil quando APIs internas retornam payload parcial.

### Antes vs Depois

| Dimensão                   | Antes                  | Depois                     |
| -------------------------- | ---------------------- | -------------------------- |
| Header strategy            | Parcialmente hardcoded | Matriz formal por endpoint |
| Consistência entre módulos | Variável               | Alinhada                   |
| Diagnóstico de erro        | Difuso                 | Mais previsível            |
| Governança de UA/version   | Informal               | Versionada                 |

## 5. Estado Futuro (Depois)

Consolidar matriz de headers por endpoint Antigravity (quota, load project, models), com constants dedicadas e logging de versão de UA.

## 6. O que Ganhamos

- Menor chance de erros não determinísticos em quota fetch.
- Melhor comparabilidade com integrações upstream.
- Facilidade de manutenção ao atualizar UAs.

## 7. Escopo

- Refatorar headers em `open-sse/services/usage.js`.
- Opcional: mover para `open-sse/config/constants.js`.
- Testes de regressão para demais providers de usage.

## 8. Fora de Escopo

- Alterar lógica de execução de chat do provider Antigravity.
- Introduzir autenticação nova.

## 9. Arquitetura Proposta

```mermaid
flowchart TD
  A[getUsageForProvider antigravity] --> B[resolveAntigravityHeaders(endpointType)]
  B --> C[fetch quota/loadCodeAssist]
  C --> D[normaliza resposta]
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `open-sse/services/usage.js`
- `open-sse/config/providerRegistry.js`
- `src/lib/usage/fetcher.js`
- `src/app/api/usage/[connectionId]/route.js`

Matriz proposta:

```js
const ANTIGRAVITY_HEADERS = {
  loadCodeAssist: {
    "Content-Type": "application/json",
    "User-Agent": "google-api-nodejs-client/9.15.1",
    "X-Goog-Api-Client": "google-cloud-sdk vscode_cloudshelleditor/0.1",
  },
  fetchAvailableModels: {
    "Content-Type": "application/json",
    "User-Agent": "antigravity/1.104.0 darwin/arm64",
  },
};
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs novas: nenhuma.
- APIs alteradas: nenhuma.
- Tipos/interfaces: internos (`HeaderProfile`).
- Compatibilidade: **non-breaking**.
- Estratégia de transição: rollout gradual por feature flag e fallback para comportamento anterior quando aplicável.
- Registro explícito: “Sem impacto em API pública; impacto interno apenas.”

## 12. Passo a Passo de Implementação Futura

1. Extrair headers para constantes por endpoint.
2. Trocar chamadas diretas para resolver perfil por tipo de endpoint.
3. Adicionar logging de `header profile version`.
4. Cobrir fallback seguro para ausência de header opcional.
5. Testar regressão de usage em providers não-Antigravity.

## 13. Plano de Testes

Cenários positivos:

1. Dado chamada de quota Antigravity, quando executa, então headers corretos são enviados.
2. Dado chamada loadCodeAssist, quando executa, então perfil de headers específico é usado.
3. Dado token válido, quando headers alinhados, então parsing de quota permanece íntegro.

Cenários de erro:

4. Dado upstream rejeita por auth, quando chamada executa, então erro é tratado sem mascarar causa.
5. Dado timeout de endpoint, quando chamada executa, então retorno degradado permanece estável.

Regressão:

6. Dado provider GitHub/Gemini usage, quando refactor de headers Antigravity é aplicado, então comportamento dos outros providers não muda.

Compatibilidade retroativa:

7. Dado ambiente antigo com UAs prévias, quando nova matriz é aplicada, então resposta funcional permanece equivalente.

## 14. Critérios de Aceite

- [ ] Given chamada Antigravity de quota, When o request é montado, Then o perfil de headers/UA esperado para esse endpoint é aplicado integralmente.
- [ ] Given chamada Antigravity de carregamento de projeto, When o request é enviado, Then o perfil específico desse fluxo é usado sem reaproveitar cabeçalhos incorretos.
- [ ] Given providers não-Antigravity (ex.: GitHub/Gemini), When a refatoração de headers é habilitada, Then não ocorre regressão de parsing de usage.
- [ ] Given execução em produção com logging ativo, When há chamadas de usage, Then a versão do profile de headers fica rastreável para auditoria.

## 15. Riscos e Mitigações

- Risco: alteração de UA causar bloqueio inesperado.
- Mitigação: fallback configurável e rollout gradual com monitoramento.

## 16. Plano de Rollout

1. Habilitar nova matriz de headers por flag.
2. Monitorar taxa de erro 401/403/429.
3. Consolidar como padrão após validação.

## 17. Métricas de Sucesso

- Redução de falhas intermitentes em quota fetch.
- Consistência de payload retornado por endpoint.
- Estabilidade da taxa de sucesso pós-mudança.

## 18. Dependências entre Features

- Apoia `feature-quota-preflight-e-troca-proativa-02.md` e `feature-monitoramento-quota-em-sessao-03.md`.

## 19. Checklist Final da Feature

- [ ] Matriz de headers definida.
- [ ] Refator em usage concluído.
- [ ] Testes positivos e regressão aprovados.
- [ ] Rollout controlado documentado.
- [ ] Sem impacto breaking em API pública.
