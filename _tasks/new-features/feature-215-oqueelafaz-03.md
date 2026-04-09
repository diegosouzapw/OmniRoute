# Feature OQueElaFaz 03 — Sincronização Automática de Catálogo de Modelos

**Origem:** necessidade de manter cobertura atualizada sem manutenção manual pesada  
**Prioridade:** P1  
**Impacto esperado:** manter OmniRoute em paridade de naming/capacidade com mercado

---

## O que ela faz

Implementa um fluxo de sincronização controlada do catálogo de modelos a partir de fontes externas confiáveis (ex.: LiteLLM map, provider APIs, lista curada interna), gerando proposta de atualização auditável.

---

## Motivação

Modelos mudam rápido. Atualização manual gera atraso, quebra de alias e mismatch de limites.

---

## O que ganhamos

1. Menos drift de modelos
2. Ciclo de atualização previsível
3. Histórico de mudanças por versão de catálogo
4. Menos retrabalho em incidentes de incompatibilidade

---

## Antes e Depois

## Antes

- atualização de modelo por PR manual sem pipeline padronizado
- risco de esquecer `max_tokens` ou capabilities

## Depois

- pipeline gera diff (`novo`, `alterado`, `deprecado`)
- revisão humana decide aplicação
- publicação versionada do catálogo

---

## Como fazer (passo a passo)

1. Criar script `scripts/model-catalog/sync.mjs`.
2. Ler fontes externas e normalizar IDs por provider.
3. Gerar `diff` contra catálogo local.
4. Produzir artefato `catalog_sync_report.json`.
5. Bloquear aplicação automática para mudanças destrutivas.
6. Aplicar mudanças aprovadas com version bump do catálogo.

---

## Arquivos-alvo sugeridos

- `scripts/model-catalog/sync.mjs`
- `scripts/model-catalog/normalize.mjs`
- `src/shared/modelCatalog/model_registry.json`
- `docs/new_features/feature-oqueelafaz-03.md`

---

## Critérios de aceite

- Sync gera diff determinístico para mesmo input.
- Alterações destrutivas exigem aprovação explícita.
- Catálogo final permanece válido no schema.

---

## Riscos e mitigação

| Risco                                | Mitigação                               |
| ------------------------------------ | --------------------------------------- |
| Fonte externa com dado inconsistente | validação forte + allowlist de campos   |
| Renomeação de modelo quebra clientes | camada de aliases e depreciação gradual |

---

## Métricas de sucesso

- Tempo médio para incorporar modelo novo
- Quantidade de incidentes por modelo desconhecido
