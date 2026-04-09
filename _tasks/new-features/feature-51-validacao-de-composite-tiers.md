# 1. Título da Feature

Feature 21 — Validação de Composite Tiers

## 2. Objetivo

Introduzir validação forte para configurações de combinações multi-tier/multi-provider, evitando configurações inválidas que geram falhas em runtime.

## 3. Motivação

`open-sse/services/combo.js` já suporta combos e DAG, mas falta um contrato validado para cenários de “tiers” com fallback estruturado (opus/sonnet/haiku) e regras formais.

## 4. Problema Atual (Antes)

- Validação focada em combo models e ciclo DAG, sem schema robusto de tiers.
- Possibilidade de configurações incompletas (tier ausente, model vazio).
- Erros descobertos apenas na execução.

### Antes vs Depois

| Dimensão                  | Antes     | Depois                |
| ------------------------- | --------- | --------------------- |
| Validação de tiers        | Limitada  | Estrita e antecipada  |
| Detecção de erro          | Runtime   | Tempo de configuração |
| Mensagens de erro         | Variáveis | Padronizadas          |
| Confiabilidade de rollout | Média     | Alta                  |

## 5. Estado Futuro (Depois)

Criar validador de composite tiers com regras explícitas:

- tiers obrigatórios,
- provider/model não vazios,
- fallback não circular,
- coerência de default tier.

## 6. O que Ganhamos

- Menos incidentes por configuração inválida.
- Mensagens de erro melhores para dashboard/API.
- Operação mais previsível de combos complexos.

## 7. Escopo

- Novo módulo validador (`src/shared/validators/compositeTiers.js` ou equivalente).
- Aplicação nas rotas de configuração de combos.
- Mensagens de erro consistentes para UI.

## 8. Fora de Escopo

- Redesenhar estratégia de combos existente.
- Alterar algoritmos de fallback/circuit breaker.

## 9. Arquitetura Proposta

```text
Config Input (API/UI)
  -> validateCompositeTiers(payload)
      -> pass: persist config
      -> fail: 400 + structured errors
Runtime
  -> usa apenas configurações válidas
```

## 10. Mudanças Técnicas Detalhadas

Arquivos de referência:

- `open-sse/services/combo.js`
- `src/app/api/combos/route.js`
- `src/app/api/combos/[id]/route.js`
- `src/app/api/combos/test/route.js`
- `src/app/api/settings/combo-defaults/route.js`

Exemplo de schema:

```js
{
  defaultTier: "sonnet",
  tiers: {
    opus: { provider: "anthropic", model: "claude-opus-4-5-20251101" },
    sonnet: { provider: "openai", model: "gpt-5.2-codex", fallback: { provider: "openai", model: "gpt-5" } },
    haiku: { provider: "gemini", model: "gemini-2.5-flash" }
  }
}
```

## 11. Impacto em APIs Públicas / Interfaces / Tipos

- APIs novas: nenhuma.
- APIs alteradas: validação mais rígida em endpoints de configuração de combos.
- Tipos/interfaces: novo contrato `CompositeTierConfig` interno.
- Compatibilidade: potencialmente **breaking em payload inválido previamente aceito** (mudança desejada e controlada).
- Estratégia de transição: ativação em duas fases (modo auditoria/warn e depois modo bloqueante), com janela de correção assistida para payloads legados.
- Registro explícito: sem impacto em API pública externa (`/v1/*`); impacto em endpoints internos de configuração.

## 12. Passo a Passo de Implementação Futura

1. Definir schema final do payload de tiers.
2. Implementar validador com erros estruturados.
3. Integrar nas rotas `POST/PUT/PATCH` de combos.
4. Normalizar mensagens para UI.
5. Adicionar testes de contrato.

## 13. Plano de Testes

Cenários positivos:

1. Dado payload completo e válido, quando validar, então persiste com sucesso.
2. Dado fallback válido por tier, quando validar, então aceita configuração.
3. Dado defaultTier coerente, quando validar, então runtime usa tier padrão esperado.

Cenários de erro:

4. Dado tier ausente, quando validar, então retorna 400 com erro específico.
5. Dado fallback circular (provider/model iguais), quando validar, então bloqueia persistência.

Regressão:

6. Dado combos simples atuais, quando nova validação entra, então continuam válidos.

Compatibilidade retroativa:

7. Dado configuração antiga parcial, quando carregar, então migrador corrige ou reporta erro orientado sem corromper dados.

## 14. Critérios de Aceite

- [ ] Given payload de tiers com campos obrigatórios ausentes, When validação é executada, Then a API retorna `400` com erro estruturado e campo de origem.
- [ ] Given payload com fallback circular, When o validador processa a configuração, Then a persistência é bloqueada com mensagem padronizada para UI.
- [ ] Given payload válido multi-tier/multi-provider, When a configuração é salva, Then a persistência ocorre com sucesso e sem warnings críticos.
- [ ] Given combos já válidos em produção, When o novo validador é habilitado, Then continuam aceitos sem regressão comportamental.

## 15. Riscos e Mitigações

- Risco: bloquear configs legadas em produção.
- Mitigação: modo de compatibilidade com migração assistida e warnings.

## 16. Plano de Rollout

1. Introduzir validação em modo warning.
2. Auditar configs existentes.
3. Ativar modo estrito após janela de ajuste.

## 17. Métricas de Sucesso

- Queda de erro runtime por configuração inválida.
- Redução de chamados sobre fallback inconsistente.
- Taxa de validação aprovada na primeira tentativa.

## 18. Dependências entre Features

- Relaciona-se à `feature-registro-de-capacidades-de-modelo-08.md`.
- Pode aproveitar observabilidade da `feature-observabilidade-proativa-de-quota-e-circuit-breaker-12.md`.

## 19. Checklist Final da Feature

- [ ] Schema de tiers definido.
- [ ] Validador integrado nas rotas.
- [ ] Erros estruturados padronizados.
- [ ] Testes de contrato e regressão.
- [ ] Estratégia de migração documentada.
