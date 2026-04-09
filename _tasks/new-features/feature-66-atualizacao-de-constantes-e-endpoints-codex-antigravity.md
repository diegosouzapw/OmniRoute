# 1. Título da Feature

Feature 33 — Atualização de Constantes e Endpoints (Codex + Antigravity)

## 2. Objetivo

Atualizar e consolidar constantes operacionais críticas para manter paridade com versões recentes de clientes e reduzir falhas por drift de configuração.

## 3. Motivação

Há sinais de desatualização em headers/versionamento do Codex e diferenças de estratégia de fallback de base URL no Antigravity em pontos distintos do sistema.

## 4. Problema Atual (Antes)

- Header `Version` do Codex em valor antigo.
- Estratégia de base URLs do Antigravity não totalmente uniforme entre discovery e execução.
- Drift de constantes pode afetar taxa de sucesso e compatibilidade.

### Antes vs Depois

| Dimensão                           | Antes    | Depois       |
| ---------------------------------- | -------- | ------------ |
| Versão/header Codex                | Defasada | Atualizada   |
| Coerência de endpoints Antigravity | Parcial  | Unificada    |
| Taxa de compatibilidade CLI        | Variável | Melhor       |
| Governança de constantes           | Dispersa | Centralizada |

## 5. Estado Futuro (Depois)

- Atualizar blocos Codex (`Version`, `User-Agent`) com política de override por env.
- Unificar ordem de fallback Antigravity em execução e discovery.
- Centralizar constantes críticas em módulo dedicado quando possível.

## 6. O que Ganhamos

- Menor risco de incompatibilidade com evoluções de clientes.
- Melhor previsibilidade de comportamento em ambientes heterogêneos.
- Redução de bugs “difíceis de reproduzir” por constante divergente.

## 7. Escopo

- `open-sse/config/providerRegistry.js`.
- `src/app/api/providers/[id]/models/route.js`.
- `open-sse/executors/antigravity.js` e `open-sse/executors/codex.js`.

## 8. Fora de Escopo

- Troca de protocolo/contrato com providers.
- Refatoração total de todos os executors nesta fase.

## 9. Arquitetura Proposta

```text
constants module
  -> provider registry defaults
  -> executor headers
  -> discovery endpoint configs
  -> env override layer
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `open-sse/config/providerRegistry.js`
- `open-sse/executors/codex.js`
- `open-sse/executors/antigravity.js`
- `src/app/api/providers/[id]/models/route.js`

Itens prioritários:

1. Codex:

- atualizar `Version` e `User-Agent` com fallback por env;
- manter `Openai-Beta` compatível.

2. Antigravity:

- definir fallback único (ex.: `daily -> sandbox -> prod` ou política escolhida);
- aplicar mesma ordem em execução e endpoint de listagem de modelos.

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs públicas: sem mudança de contrato.
- APIs internas: possíveis ajustes em discovery de modelos por provider.
- Tipos/interfaces: sem impacto obrigatório.
- Compatibilidade: non-breaking.

## 12. Passo a Passo de Implementação Futura

1. Criar inventário de constantes críticas por provider.
2. Atualizar Codex headers/version com env override.
3. Unificar fallback Antigravity em execução e discovery.
4. Adicionar testes de snapshot de URL/header construídos.
5. Documentar política de atualização de constantes.

## 13. Plano de Testes

Cenários positivos:

1. Dado config padrão, quando requisição Codex é montada, então headers esperados são enviados.
2. Dado base primária Antigravity indisponível, quando request ocorre, então fallback segue ordem definida.
3. Dado endpoint de models Antigravity, quando consultado, então usa mesma política de base URL.

Cenários de erro:

4. Dado env override inválido, quando aplicar constante, então sistema usa fallback seguro.
5. Dado falha em todas bases, quando request ocorre, então erro controlado e rastreável é retornado.

Regressão:

6. Dado fluxos atuais em produção, quando constantes são atualizadas, então não há quebra de contrato externo.

## 14. Critérios de Aceite

- [ ] Given requests Codex, When headers são montados, Then `Version`/`User-Agent` refletem política atual definida.
- [ ] Given indisponibilidade parcial Antigravity, When chamadas são executadas, Then fallback segue ordem única e previsível.
- [ ] Given endpoint de modelos por provider, When Antigravity é consultado, Then comportamento de base URL é consistente com executor.
- [ ] Given overrides por ambiente, When inválidos, Then fallback seguro preserva disponibilidade.

## 15. Riscos e Mitigações

- Risco: update de constante quebrar cliente específico.
- Mitigação: rollout canário + override por env para rollback rápido.

## 16. Plano de Rollout

1. Publicar em staging com tracing de headers/URLs.
2. Promover para canário em produção.
3. Expandir após validação de taxa de sucesso.

## 17. Métricas de Sucesso

- Taxa de sucesso por provider após atualização.
- Queda de erro por incompatibilidade de header/version.
- Redução de timeout/falha em fallback de base URL.
