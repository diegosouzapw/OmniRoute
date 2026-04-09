# 1. Título da Feature

Feature 30 — Integração Real da Estratégia `p2c` no Selecionador de Contas

## 2. Objetivo

Conectar de forma efetiva a estratégia `p2c` (Power of Two Choices) no caminho de seleção de credenciais do auth runtime, evitando divergência entre UI e execução real.

## 3. Motivação

A UI já oferece `p2c`, e existe implementação em `open-sse/services/accountSelector.js`, mas o caminho crítico de seleção em `src/sse/services/auth.js` hoje opera, na prática, apenas com `fill-first` e `round-robin`.

## 4. Problema Atual (Antes)

- Configuração `p2c` disponível no painel, mas sem efeito real no runtime.
- Inconsistência entre expectativa do usuário e comportamento observado.
- Estratégias avançadas ficam subutilizadas.

### Antes vs Depois

| Dimensão                 | Antes       | Depois           |
| ------------------------ | ----------- | ---------------- |
| Coerência UI x backend   | Baixa       | Alta             |
| Balanceamento de carga   | Básico      | Mais inteligente |
| Distribuição de erro     | Concentrada | Melhor dispersão |
| Confiabilidade percebida | Variável    | Mais estável     |

## 5. Estado Futuro (Depois)

Usar `selectAccount()` como único ponto de seleção, com suporte real para:

- `fill-first`
- `round-robin`
- `p2c`
- `random` (opcional)

## 6. O que Ganhamos

- Maior equilíbrio de contas sob carga.
- Menor chance de sobrecarregar sempre a mesma credencial.
- Consistência total entre painel e runtime.

## 7. Escopo

- Integrar `open-sse/services/accountSelector.js` em `src/sse/services/auth.js`.
- Ajustar `Settings` para refletir estratégias suportadas.
- Logar estratégia aplicada por request.

## 8. Fora de Escopo

- Implementar novo algoritmo de score complexo nesta fase.
- Reestruturar storage de métricas históricas.

## 9. Arquitetura Proposta

```mermaid
flowchart LR
  A[availableConnections] --> B[selectAccount(strategy, state, model)]
  B --> C[selected connection]
  C --> D[persist usage metadata]
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `src/sse/services/auth.js`
- `open-sse/services/accountSelector.js`
- `src/types/settings.ts`
- `src/lib/db/settings.js`
- `src/app/(dashboard)/dashboard/settings/components/RoutingTab.js`

Pseudo-código:

```js
import { selectAccount } from "@omniroute/open-sse/services/accountSelector.js";

const { account } = selectAccount(availableConnections, strategy, state, model);
connection = account;
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs públicas `/v1/*`: sem alteração de contrato.
- Config interna: `fallbackStrategy` passa a ser fiel ao runtime.
- Tipos/interfaces: atualizar `Settings` para incluir `p2c`.
- Compatibilidade: non-breaking.

## 12. Passo a Passo de Implementação Futura

1. Atualizar tipo `Settings` para incluir `p2c`.
2. Trocar seleção manual por `selectAccount()` no auth.
3. Manter comportamento de persistência (`lastUsedAt`, contadores) por estratégia.
4. Adicionar logs de estratégia e decisão.
5. Cobrir cenários com 1, 2 e N contas.

## 13. Plano de Testes

Cenários positivos:

1. Dado `fallbackStrategy=p2c`, quando selecionar conta, então runtime usa algoritmo p2c.
2. Dado apenas uma conta disponível, quando p2c ativo, então fallback para seleção válida.
3. Dado `round-robin`, quando processar, então comportamento anterior é preservado.

Cenários de erro:

4. Dado estratégia desconhecida, quando processar, então fallback seguro para `fill-first`.
5. Dado lista vazia de contas, quando selecionar, então erro controlado é retornado.

Regressão:

6. Dado tráfego atual com `fill-first`, quando integração é aplicada, então resultados permanecem equivalentes.

## 14. Critérios de Aceite

- [ ] Given `p2c` definido em settings, When request é roteada, Then a seleção usa algoritmo p2c de fato.
- [ ] Given estratégia inválida, When runtime processa, Then fallback seguro evita quebra.
- [ ] Given round-robin/fill-first existentes, When feature é ativada, Then não há regressão dessas estratégias.
- [ ] Given logs de roteamento, When request processa, Then estratégia aplicada aparece de forma auditável.

## 15. Riscos e Mitigações

- Risco: alteração de distribuição impactar custos inesperadamente.
- Mitigação: rollout gradual com métricas por estratégia.

## 16. Plano de Rollout

1. Habilitar por flag em ambiente interno.
2. Coletar métricas comparativas (`fill-first` vs `p2c`).
3. Liberar geral após validação.

## 17. Métricas de Sucesso

- Distribuição de requests por conta (menos concentração).
- Queda de indisponibilidade da “primeira conta”.
- Redução de falhas repetidas em mesma credencial.
