# Feature 12 — Missing Models Registry Update

## Resumo

Adicionar ao `providerRegistry.js` todos os modelos descobertos no ProxyPilot que estão ausentes no OmniRoute. Inclui modelos novos de GPT, Gemini, Qoder, Kiro, Antigravity e atualizações de context length/max tokens para modelos existentes.

## Motivação

O ProxyPilot, por ser um fork ativamente mantido do CLIProxyAPI v6.8.17, frequentemente recebe atualizações de modelos antes de outros projetos. A análise revelou 35+ modelos ausentes e diversas configurações desatualizadas (context lengths, max tokens) no nosso registry.

## O que ganhamos

- **Cobertura completa**: Todos os modelos mais recentes disponíveis
- **Paridade com upstream**: Modelos como GPT-5.3 Codex Spark expostos rapidamente
- **Metadata correta**: Context lengths e max tokens atualizados para roteamento preciso
- **Kiro Agentic models**: Suporte a modelos com chunked writes

## Situação Atual (Antes)

| Provider    | Modelos atuais no OmniRoute                              | Observação                                         |
| ----------- | -------------------------------------------------------- | -------------------------------------------------- |
| Codex       | gpt-5.3-codex, gpt-5.2-codex, gpt-5.1-codex, gpt-5-codex | Falta gpt-5.3-codex-spark                          |
| Qoder       | 9 modelos                                                | Faltam 15+ modelos (glm-5, minimax-m2.5, etc.)     |
| Kiro        | claude-sonnet-4.5, claude-haiku-4.5                      | Faltam kiro-auto e 5 modelos agentic               |
| Antigravity | 9 modelos                                                | Faltam gpt-oss-120b-medium, tab_flash_lite_preview |
| Gemini      | 4 modelos                                                | Faltam imagen-_, gemini-_-latest aliases           |

## Situação Proposta (Depois)

Todas as tabelas abaixo adicionadas/atualizadas no `providerRegistry.js`.

## Lista Completa de Modelos a Adicionar/Atualizar

### Codex — Modelos Novos

| Model ID              | Nome                | Observação                      |
| --------------------- | ------------------- | ------------------------------- |
| `gpt-5.3-codex-spark` | GPT 5.3 Codex Spark | Ultra-fast coding, 128K context |

**Ação**: Adicionar ao array `models` do provider `codex` no `providerRegistry.js`.

```javascript
// Adicionar ao array models do codex:
{ id: "gpt-5.3-codex-spark", name: "GPT 5.3 Codex Spark" },
```

---

### Qoder — Modelos Novos

| Model ID                        | Nome                       | Observação               |
| ------------------------------- | -------------------------- | ------------------------ |
| `glm-5`                         | GLM 5                      | Mais novo da série Zhipu |
| `glm-4.6`                       | GLM 4.6                    |                          |
| `minimax-m2.5`                  | MiniMax M2.5               | Versão mais recente      |
| `minimax-m2`                    | MiniMax M2                 | Base                     |
| `deepseek-v3.2`                 | DeepSeek V3.2              | Experimental             |
| `deepseek-v3.1`                 | DeepSeek V3.1              | Terminus                 |
| `deepseek-v3`                   | DeepSeek V3                | 671B                     |
| `qwen3-max`                     | Qwen3 Max                  | Flagship                 |
| `qwen3-max-preview`             | Qwen3 Max Preview          | + thinking               |
| `qwen3-vl-plus`                 | Qwen3 Vision-Language Plus |                          |
| `qwen3-32b`                     | Qwen3 32B                  |                          |
| `qwen3-235b-a22b-thinking-2507` | Qwen3 235B Thinking        |                          |
| `qwen3-235b-a22b-instruct`      | Qwen3 235B Instruct        |                          |
| `qwen3-235b`                    | Qwen3 235B                 | Base                     |
| `tstars2.0`                     | tStars 2.0                 | Qoder multimodal         |
| `qoder-rome-30ba3b`             | Qoder Rome 30B             | Qoder model              |
| `kimi-k2-0905`                  | Kimi K2 (0905)             | Instruct variant         |

**Ação**: Adicionar ao array `models` do provider `qoder`:

```javascript
// qoder.models — adicionar estes ao array existente:
{ id: "glm-5", name: "GLM 5" },
{ id: "glm-4.6", name: "GLM 4.6" },
{ id: "minimax-m2.5", name: "MiniMax M2.5" },
{ id: "minimax-m2", name: "MiniMax M2" },
{ id: "deepseek-v3.2", name: "DeepSeek V3.2" },
{ id: "deepseek-v3.1", name: "DeepSeek V3.1" },
{ id: "deepseek-v3", name: "DeepSeek V3 671B" },
{ id: "qwen3-max", name: "Qwen3 Max" },
{ id: "qwen3-max-preview", name: "Qwen3 Max Preview" },
{ id: "qwen3-vl-plus", name: "Qwen3 VL Plus" },
{ id: "qwen3-32b", name: "Qwen3 32B" },
{ id: "qwen3-235b-a22b-thinking-2507", name: "Qwen3 235B Thinking" },
{ id: "qwen3-235b-a22b-instruct", name: "Qwen3 235B Instruct" },
{ id: "qwen3-235b", name: "Qwen3 235B" },
{ id: "tstars2.0", name: "tStars 2.0" },
{ id: "qoder-rome-30ba3b", name: "Qoder Rome 30B" },
{ id: "kimi-k2-0905", name: "Kimi K2 Instruct 0905" },
```

---

### Kiro — Modelos Novos

| Model ID                         | Nome                             | Observação           |
| -------------------------------- | -------------------------------- | -------------------- |
| `kiro-auto`                      | Kiro Auto                        | Auto model selection |
| `kiro-claude-opus-4-5`           | Claude Opus 4.5 (Kiro)           | Via AWS              |
| `kiro-claude-sonnet-4-5`         | Claude Sonnet 4.5 (Kiro)         | Via AWS              |
| `kiro-claude-sonnet-4`           | Claude Sonnet 4 (Kiro)           | Via AWS              |
| `kiro-claude-haiku-4-5`          | Claude Haiku 4.5 (Kiro)          | Via AWS              |
| `kiro-claude-opus-4-5-agentic`   | Claude Opus 4.5 Agentic (Kiro)   | Chunked writes       |
| `kiro-claude-sonnet-4-5-agentic` | Claude Sonnet 4.5 Agentic (Kiro) | Chunked writes       |
| `kiro-claude-sonnet-4-agentic`   | Claude Sonnet 4 Agentic (Kiro)   | Chunked writes       |
| `kiro-claude-haiku-4-5-agentic`  | Claude Haiku 4.5 Agentic (Kiro)  | Chunked writes       |
| `kiro-kiro-auto-agentic`         | Kiro Auto Agentic                | Chunked writes       |

**Ação**: Adicionar ao array `models` do provider `kiro`:

```javascript
// kiro.models — adicionar estes ao array existente:
{ id: "kiro-auto", name: "Kiro Auto" },
{ id: "kiro-claude-opus-4-5", name: "Claude Opus 4.5 (Kiro)" },
{ id: "kiro-claude-sonnet-4-5", name: "Claude Sonnet 4.5 (Kiro)" },
{ id: "kiro-claude-sonnet-4", name: "Claude Sonnet 4 (Kiro)" },
{ id: "kiro-claude-haiku-4-5", name: "Claude Haiku 4.5 (Kiro)" },
{ id: "kiro-claude-opus-4-5-agentic", name: "Claude Opus 4.5 Agentic (Kiro)" },
{ id: "kiro-claude-sonnet-4-5-agentic", name: "Claude Sonnet 4.5 Agentic (Kiro)" },
{ id: "kiro-claude-sonnet-4-agentic", name: "Claude Sonnet 4 Agentic (Kiro)" },
{ id: "kiro-claude-haiku-4-5-agentic", name: "Claude Haiku 4.5 Agentic (Kiro)" },
{ id: "kiro-kiro-auto-agentic", name: "Kiro Auto Agentic" },
```

---

### Antigravity — Modelos Novos

| Model ID                 | Nome                   | Observação        |
| ------------------------ | ---------------------- | ----------------- |
| `gpt-oss-120b-medium`    | GPT OSS 120B Medium    | Via Antigravity   |
| `tab_flash_lite_preview` | Tab Flash Lite Preview | Tab preview model |

**Ação**: Adicionar ao array `models` do provider `antigravity`:

```javascript
// antigravity.models — adicionar:
{ id: "gpt-oss-120b-medium", name: "GPT OSS 120B Medium" },
{ id: "tab_flash_lite_preview", name: "Tab Flash Lite Preview" },
```

---

### MiniMax — Modelo Novo

| Model ID       | Nome         | Observação          |
| -------------- | ------------ | ------------------- |
| `MiniMax-M2.5` | MiniMax M2.5 | Versão mais recente |

**Ação**: Adicionar ao array `models` do provider `minimax` e `minimax-cn`:

```javascript
// minimax.models e minimax-cn.models — adicionar:
{ id: "MiniMax-M2.5", name: "MiniMax M2.5" },
```

---

### Gemini — Modelos de Imagem

Os modelos de imagem do Gemini usam uma API diferente (`predict` ao invés de `generateContent`). Estes devem ser documentados mas podem precisar de um executor específico.

| Model ID                        | Nome                       | Observação       |
| ------------------------------- | -------------------------- | ---------------- |
| `gemini-3-pro-image-preview`    | Gemini 3 Pro Image Preview | Image generation |
| `gemini-2.5-flash-image`        | Gemini 2.5 Flash Image     | Image generation |
| `imagen-4.0-generate-001`       | Imagen 4.0                 | Predict API      |
| `imagen-4.0-ultra-generate-001` | Imagen 4.0 Ultra           | Predict API      |
| `imagen-4.0-fast-generate-001`  | Imagen 4.0 Fast            | Predict API      |
| `imagen-3.0-generate-002`       | Imagen 3.0                 | Predict API      |
| `imagen-3.0-fast-generate-001`  | Imagen 3.0 Fast            | Predict API      |

> [!NOTE]
> Os modelos Imagen requerem a API `predict` e não `generateContent`. Implementar suporte requer um executor separado. Podem ser registrados como modelos informativos por agora.

---

## Atualizações de Context Length / Max Tokens

Campos para adicionar ao providerRegistry (requer extensão do schema de modelos):

| Modelo                | Campo         | Valor Atual  | Novo Valor |
| --------------------- | ------------- | ------------ | ---------- |
| `claude-opus-4-6`     | contextLength | não definido | 1,000,000  |
| `claude-opus-4-6`     | maxTokens     | não definido | 128,000    |
| `claude-opus-4-5-*`   | contextLength | não definido | 200,000    |
| `claude-opus-4-5-*`   | maxTokens     | não definido | 128,000    |
| `claude-sonnet-4-5-*` | contextLength | não definido | 200,000    |
| `claude-sonnet-4-5-*` | maxTokens     | não definido | 128,000    |
| `gemini-2.5-pro`      | contextLength | não definido | 1,048,576  |
| `gemini-2.5-pro`      | maxTokens     | não definido | 65,536     |
| `gpt-5.2`             | contextLength | não definido | 400,000    |
| `gpt-5.3-codex`       | contextLength | não definido | 400,000    |

**Ação proposta**: Extender o schema de modelos para incluir `contextLength` e `maxTokens`:

```javascript
// Formato proposto para modelos com metadata:
{
  id: "claude-opus-4-6",
  name: "Claude Opus 4.6",
  contextLength: 1000000,
  maxTokens: 128000
},
```

## Arquivos a Modificar

| Arquivo                               | Ação                              |
| ------------------------------------- | --------------------------------- |
| `open-sse/config/providerRegistry.js` | **MODIFICAR** — Adicionar modelos |
| `src/shared/constants/models.js`      | Auto-gerado pelo registry         |

## Critérios de Aceite

- [ ] Todos os 35+ modelos ausentes adicionados ao registry
- [ ] `/v1/models` lista os novos modelos corretamente
- [ ] Modelos Kiro agentic reconhecidos e roteados
- [ ] MiniMax M2.5 disponível em minimax e minimax-cn
- [ ] Context lengths e max tokens definidos para modelos-chave
- [ ] Nenhum modelo duplicado no registry

## Referência

- [ProxyPilot: internal/registry/model_definitions_static_data.go](https://github.com/Finesssee/ProxyPilot/blob/main/internal/registry/model_definitions_static_data.go) (800+ linhas)
- [ProxyPilot: internal/registry/model_definitions.go](https://github.com/Finesssee/ProxyPilot/blob/main/internal/registry/model_definitions.go) (372 linhas)
