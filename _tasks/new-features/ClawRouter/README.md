# ClawRouter → OmniRoute: Feature Implementation Plans

> Fonte: [BlockRunAI/ClawRouter](https://github.com/BlockRunAI/ClawRouter) — análise em 2026-03-17  
> Repositório atualizado com 5-10 commits/dia. Monitor: `https://github.com/BlockRunAI/ClawRouter/commits/main.atom`

Estes documentos descrevem implementações detalhadas de features e atualizações de modelos
identificadas no ClawRouter que podem agregar valor ao OmniRoute.

---

## 📁 Índice de Features

### 🔴 Prioridade Alta — Modelos e Providers

| # | Feature | Arquivo | Impacto |
|---|---------|---------|---------|
| 01 | Grok-4 Family (xAI) | [01-grok4-models.md](./01-grok4-models.md) | $0.20/$0.50/M ultrabarato |
| 02 | GLM-5 via Z.AI | [02-glm5-zai-models.md](./02-glm5-zai-models.md) | 128k output, novíssimo |
| 03 | Gemini 2.5 Flash Lite | [03-gemini-flash-lite.md](./03-gemini-flash-lite.md) | $0.10/$0.40/M mais barato |
| 04 | MiniMax M2.5 | [04-minimax-m2-5.md](./04-minimax-m2-5.md) | reasoning+agentic $0.30/M |
| 05 | Claude 4.5 / 4.6 Update | [05-claude-4x-update.md](./05-claude-4x-update.md) | versões mais novas |
| 06 | Gemini 3.1 Pro | [06-gemini-3-1-pro.md](./06-gemini-3-1-pro.md) | nova versão flagship |
| 07 | DeepSeek V3.2 Pricing | [07-deepseek-v3-2-pricing.md](./07-deepseek-v3-2-pricing.md) | preços atualizados |
| 08 | Kimi K2.5 via Moonshot API | [08-kimi-k2-5-moonshot.md](./08-kimi-k2-5-moonshot.md) | API direta moonshot.cn |
| 09 | NVIDIA Free Tier GPT-OSS-120B | [09-nvidia-free-tier.md](./09-nvidia-free-tier.md) | modelo gratuito |

### 🟡 Prioridade Média — Features de Infraestrutura

| # | Feature | Arquivo | Impacto |
|---|---------|---------|---------|
| 10 | toolCalling Flag por Modelo | [10-toolcalling-flag.md](./10-toolcalling-flag.md) | routing inteligente com tools |
| 11 | Multilingual Keyword Detection | [11-multilingual-intent.md](./11-multilingual-intent.md) | PT/ZH/ES/AR no AutoCombo |
| 12 | Benchmark-Driven Fallback Chains | [12-benchmark-fallback.md](./12-benchmark-fallback.md) | latência real no scoring |
| 13 | Request Deduplication | [13-request-dedup.md](./13-request-dedup.md) | multi-agent safe |
| 14 | RouterStrategy Plugável | [14-router-strategy.md](./14-router-strategy.md) | interface extensível |

---

## 🏁 Como Usar Estes Documentos

Cada arquivo segue o padrão:
1. **Contexto** — por que esta feature importa
2. **Arquivos Afetados** — lista precisa de todos os arquivos a modificar
3. **Implementação Passo a Passo** — código exato, nada resumido
4. **Testes** — como validar a implementação
5. **Rollback** — como desfazer se necessário
