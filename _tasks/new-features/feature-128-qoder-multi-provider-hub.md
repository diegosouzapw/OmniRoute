# Feature 128 — Qoder Multi-Provider Hub (26 Modelos)

## Objetivo

Expandir o suporte Qoder para incluir todos os 26 modelos disponíveis no ecossistema, incluindo DeepSeek V3.x, MiniMax M2.x, GLM 4.x/5, Qwen 3.x, TStars 2.0, e Qoder Rome — com metadata de thinking support onde aplicável.

## Motivação

O Qoder é um **hub multi-provider** que agrega modelos de diversas fontes chinesas (Zhipu, Moonshot, DeepSeek, MiniMax, Alibaba) sob uma interface unificada via OAuth. O CLIProxyAPI suporta 26 modelos Qoder, muitos com thinking support (levels: minimal/low/medium/high). O OmniRoute só tem ~9 modelos Qoder cadastrados — faltam 15+ modelos significativos.

## O que Ganhamos

- **Cobertura**: Acesso a 26 modelos via uma única credencial Qoder
- **Diversidade**: DeepSeek, MiniMax, GLM, Qwen, Kimi via único canal
- **Thinking support**: Modelos com levels de reasoning (high, medium, etc.)
- **Custo**: Modelos chineses geralmente mais baratos que ocidentais

## Situação Atual (Antes)

```
Provider Qoder: ~9 modelos registrados
  → deepseek-r1, deepseek-v3
  → kimi-k2, kimi-k2-thinking
  → qwen3-coder-plus, qwen3-coder-flash
  → minimax-m2, minimax-m2.1
  → qoder-rome-30ba3b

  Faltam: 17 modelos! (glm-5, deepseek-v3.2, minimax-m2.5, etc.)
```

## Situação Proposta (Depois)

```
Provider Qoder: 26 modelos registrados, incluindo:
  ── DeepSeek ──
  ├── deepseek-v3.2-chat         (chat, sem thinking)
  ├── deepseek-v3.2-reasoner     (reasoning, sem thinking)
  ├── deepseek-v3.2              (experimental, thinking levels)
  ├── deepseek-v3.1              (terminus, thinking levels)
  ├── deepseek-r1                (reasoning)
  └── deepseek-v3                (671B base)

  ── MiniMax ──
  ├── minimax-m2                 (thinking levels)
  ├── minimax-m2.1               (thinking levels)
  └── minimax-m2.5               (NOVO, thinking levels)

  ── GLM (Zhipu) ──
  ├── glm-4.6                    (thinking levels)
  ├── glm-4.7                    (thinking levels)
  └── glm-5                      (NOVO, thinking levels)

  ── Qwen ──
  ├── qwen3-coder-plus           (coding)
  ├── qwen3-max                  (flagship)
  ├── qwen3-max-preview          (thinking levels)
  ├── qwen3-vl-plus              (vision-language)
  ├── qwen3-32b                  (32B params)
  ├── qwen3-235b-a22b-thinking   (thinking variant)
  ├── qwen3-235b-a22b-instruct   (instruct variant)
  └── qwen3-235b                 (base 235B)

  ── Kimi (via Qoder) ──
  ├── kimi-k2                    (base)
  ├── kimi-k2-thinking           (thinking)
  ├── kimi-k2-0905               (instruct 0905)
  └── kimi-k2.5                  (NOVO, thinking levels)

  ── Outros ──
  ├── tstars2.0                  (TStars multimodal)
  └── qoder-rome-30ba3b          (Qoder Rome 30B)
```

## Especificação Técnica

### Definição de Modelos

```javascript
// src/shared/constants/qoderModels.js

export const QODER_MODELS = [
  // ── DeepSeek ──
  { id: "deepseek-v3.2-chat", name: "DeepSeek V3.2 Chat", thinking: null },
  { id: "deepseek-v3.2-reasoner", name: "DeepSeek V3.2 Reasoner", thinking: null },
  {
    id: "deepseek-v3.2",
    name: "DeepSeek V3.2 Experimental",
    thinking: { levels: ["minimal", "low", "medium", "high"] },
  },
  {
    id: "deepseek-v3.1",
    name: "DeepSeek V3.1 Terminus",
    thinking: { levels: ["minimal", "low", "medium", "high"] },
  },
  { id: "deepseek-r1", name: "DeepSeek R1", thinking: null },
  { id: "deepseek-v3", name: "DeepSeek V3 671B", thinking: null },

  // ── MiniMax ──
  {
    id: "minimax-m2",
    name: "MiniMax M2",
    thinking: { levels: ["minimal", "low", "medium", "high"] },
  },
  {
    id: "minimax-m2.1",
    name: "MiniMax M2.1",
    thinking: { levels: ["minimal", "low", "medium", "high"] },
  },
  {
    id: "minimax-m2.5",
    name: "MiniMax M2.5",
    thinking: { levels: ["minimal", "low", "medium", "high"] },
  },

  // ── GLM (Zhipu) ──
  { id: "glm-4.6", name: "GLM 4.6", thinking: { levels: ["minimal", "low", "medium", "high"] } },
  { id: "glm-4.7", name: "GLM 4.7", thinking: { levels: ["minimal", "low", "medium", "high"] } },
  { id: "glm-5", name: "GLM 5", thinking: { levels: ["minimal", "low", "medium", "high"] } },

  // ── Qwen ──
  { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus", thinking: null },
  { id: "qwen3-max", name: "Qwen3 Max", thinking: null },
  {
    id: "qwen3-max-preview",
    name: "Qwen3 Max Preview",
    thinking: { levels: ["low", "medium", "high"] },
  },
  { id: "qwen3-vl-plus", name: "Qwen3 VL Plus", thinking: null },
  { id: "qwen3-32b", name: "Qwen3 32B", thinking: null },
  { id: "qwen3-235b-a22b-thinking-2507", name: "Qwen3 235B Thinking", thinking: null },
  { id: "qwen3-235b-a22b-instruct", name: "Qwen3 235B Instruct", thinking: null },
  { id: "qwen3-235b", name: "Qwen3 235B", thinking: null },

  // ── Kimi (via Qoder) ──
  { id: "kimi-k2", name: "Kimi K2", thinking: null },
  { id: "kimi-k2-thinking", name: "Kimi K2 Thinking", thinking: null },
  { id: "kimi-k2-0905", name: "Kimi K2 Instruct 0905", thinking: null },
  { id: "kimi-k2.5", name: "Kimi K2.5", thinking: { levels: ["low", "medium", "high"] } },

  // ── Outros ──
  { id: "tstars2.0", name: "TStars 2.0", thinking: null },
  { id: "qoder-rome-30ba3b", name: "Qoder Rome 30B", thinking: null },
];
```

### Atualização do Registry

```javascript
// open-sse/config/providerRegistry.js — seção qoder

{
  name: 'qoder',
  displayName: 'Qoder',
  models: QODER_MODELS.map(m => ({
    id: m.id,
    name: m.name,
  })),
  // ...
}
```

## Como fazer (passo a passo)

1. Consolidar lista final de 26 modelos Qoder com IDs exatos e aliases aceitos.
2. Atualizar `providerRegistry.js` para incluir todos os modelos, sem remover os já utilizados pelos clientes atuais.
3. Definir metadados de thinking por modelo em constante dedicada e reutilizável.
4. Garantir que `/v1/models` retorne os novos modelos quando o provider Qoder estiver ativo.
5. Validar payload para bloquear parâmetros de thinking em modelos que não suportam.
6. Adicionar testes de regressão para seleção de modelo e serialização do catálogo.

## Arquivos a Criar/Modificar

| Arquivo                                   | Ação                                     |
| ----------------------------------------- | ---------------------------------------- |
| `src/shared/constants/qoderModels.js`     | **NOVO** — Todos os 26 modelos Qoder     |
| `open-sse/config/providerRegistry.js`     | **MODIFICAR** — Atualizar provider Qoder |
| `src/shared/constants/thinkingSupport.js` | **MODIFICAR** — Thinking levels Qoder    |

## Critérios de Aceite

- [ ] 26 modelos Qoder registrados no providerRegistry
- [ ] `/v1/models` lista todos os modelos quando credencial Qoder ativa
- [ ] Thinking levels validados para modelos que suportam
- [ ] Nenhum modelo duplicado no registry
- [ ] Modelos sem thinking (null) não aceitam thinking params

## Referência

- [CLIProxyAPI: internal/registry/model_definitions_static_data.go](https://github.com/router-for-me/CLIProxyAPI) — GetQoderModels() (26 modelos)
