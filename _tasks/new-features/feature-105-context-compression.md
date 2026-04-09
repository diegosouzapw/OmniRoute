# Feature 11 — Context Compression

## Resumo

Implementar compressão de contexto baseada em LLM para sessões longas de conversação. Quando a lista de mensagens em uma sessão excede um threshold de tokens, o proxy comprime automaticamente as mensagens anteriores em um resumo denso, preservando informações críticas e reduzindo drasticamente o consumo de tokens.

## Motivação

Coding agents como Claude Code e Cursor mantêm sessões longas (50-200+ turnos). A cada turno, TODAS as mensagens anteriores são enviadas novamente. Uma sessão de 100 turnos pode acumular 200K+ tokens de contexto, dos quais 80% é redundante. A pesquisa da Factory.ai demonstra que comprimir contexto com um LLM rápido preserva 95%+ da qualidade com 80%+ de redução de tokens.

## O que ganhamos

- **Redução de custo**: 70-85% menos tokens enviados após compressão
- **Sessões mais longas**: Supera limites de context window de modelos
- **Menor latência**: Menos tokens = tempo de processing menor no upstream
- **Preservação de qualidade**: LLM-based compression mantém informações críticas

## Situação Atual (Antes)

```
Turno 1:   5K tokens → enviados 5K (total 5K)
Turno 10:  5K tokens → enviados 50K (total acumulado)
Turno 50:  5K tokens → enviados 250K (total acumulado!)
Turno 100: 5K tokens → ERRO: context window exceeded
// Cost explode exponencialmente
```

## Situação Proposta (Depois)

```
Turno 1:   5K tokens → enviados 5K (total 5K)
Turno 10:  5K tokens → enviados 50K (total 50K)
Turno 11:  COMPRESSÃO TRIGGERED (threshold: 50K)
           → Turnos 1-8 comprimidos em 5K tokens
           → Turnos 9-10 mantidos intactos (recentes)
           → enviados 15K (5K compressed + 10K recentes + 5K novo)
Turno 50:  5K tokens → enviados ~25K (compressão periódica)
Turno 100: 5K tokens → enviados ~30K (context sob controle!)
// Cost linear, não exponencial
```

## Especificação Técnica

### Quando Comprimir

```javascript
// src/lib/context/contextCompressor.js

const COMPRESSION_CONFIG = {
  // Threshold em tokens para trigger compressão
  triggerThreshold: 50000, // 50K tokens
  // Manter últimas N mensagens sem comprimir
  preserveRecentMessages: 10,
  // Modelo a usar para compressão (rápido + barato)
  compressionModel: "gemini-2.5-flash", // ou gpt-4o-mini
  // Target de compressão (ratio)
  targetRatio: 0.15, // Comprimir para ~15% do original
  // Tokens máximos para o resumo
  maxSummaryTokens: 5000,
};
```

### Prompt de Compressão

```javascript
const COMPRESSION_PROMPT = `
You are a context compression assistant. Your task is to compress the conversation history 
into a dense, information-rich summary that preserves ALL of the following:

1. **Code changes made**: exact files modified, what was changed, and why
2. **Technical decisions**: architecture choices, library selections, patterns used
3. **Current state**: what works, what's broken, what's in progress
4. **User preferences**: coding style, naming conventions, requirements
5. **Important context**: error messages, stack traces, environment details

Rules:
- Be extremely concise. Use bullet points and code references.
- Preserve exact file paths, function names, and error messages.
- Do NOT lose any technical detail that could be needed later.
- Format as a structured summary, not a narrative.
- Target: ${maxSummaryTokens} tokens maximum.

Compress the following conversation history:
`.trim();
```

### Engine de Compressão

```javascript
export class ContextCompressor {
  constructor(config) {
    this.config = { ...COMPRESSION_CONFIG, ...config };
    this.sessionSummaries = new Map(); // sessionId → summary
  }

  async shouldCompress(messages) {
    const estimatedTokens = this.estimateTokens(messages);
    return estimatedTokens > this.config.triggerThreshold;
  }

  async compress(messages, sessionId) {
    const totalMessages = messages.length;
    const preserveCount = this.config.preserveRecentMessages;

    // Separar mensagens
    const toCompress = messages.slice(0, totalMessages - preserveCount);
    const toPreserve = messages.slice(totalMessages - preserveCount);

    // Obter resumo existente (compressão incremental)
    const existingSummary = this.sessionSummaries.get(sessionId) || "";

    // Chamar LLM para comprimir
    const summary = await this.callCompressionLLM(
      existingSummary,
      toCompress,
      this.config.maxSummaryTokens
    );

    // Armazenar resumo atualizado
    this.sessionSummaries.set(sessionId, summary);

    // Construir novo array de mensagens
    const compressedMessages = [
      {
        role: "system",
        content: `[CONTEXT SUMMARY - Compressed from ${toCompress.length} messages]\n\n${summary}`,
      },
      ...toPreserve,
    ];

    return {
      messages: compressedMessages,
      originalTokens: this.estimateTokens(messages),
      compressedTokens: this.estimateTokens(compressedMessages),
      ratio: this.estimateTokens(compressedMessages) / this.estimateTokens(messages),
      messagesCompressed: toCompress.length,
      messagesPreserved: toPreserve.length,
    };
  }

  estimateTokens(messages) {
    // Estimativa rápida: ~4 chars por token para inglês
    const totalChars = messages.reduce((sum, m) => {
      const content = typeof m.content === "string" ? m.content : JSON.stringify(m.content);
      return sum + content.length;
    }, 0);
    return Math.ceil(totalChars / 4);
  }

  async callCompressionLLM(existingSummary, messages, maxTokens) {
    const prompt = existingSummary
      ? `Previous summary:\n${existingSummary}\n\nNew messages to incorporate:\n`
      : COMPRESSION_PROMPT;

    // Chamar modelo de compressão via próprio proxy
    const response = await fetch("http://localhost:PORT/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.config.compressionModel,
        messages: [
          { role: "system", content: prompt },
          {
            role: "user",
            content: messages
              .map(
                (m) =>
                  `[${m.role}]: ${typeof m.content === "string" ? m.content : JSON.stringify(m.content)}`
              )
              .join("\n\n"),
          },
        ],
        max_tokens: maxTokens,
        temperature: 0.1, // Baixa para compressão determinística
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
}
```

### Integração (Opt-in por sessão)

```javascript
// src/sse/handlers/chat.js

const compressor = new ContextCompressor(config.compression);

// Apenas se habilitado e sessão longa
if (config.compression.enabled && (await compressor.shouldCompress(payload.messages))) {
  const result = await compressor.compress(payload.messages, sessionId);

  logger.info(
    `Context compressed: ${result.originalTokens} → ${result.compressedTokens} tokens ` +
      `(${Math.round(result.ratio * 100)}%), ${result.messagesCompressed} messages compressed`
  );

  payload.messages = result.messages;
  // Adicionar header informativo
  res.set("X-Context-Compressed", "true");
  res.set("X-Context-Ratio", result.ratio.toFixed(2));
}
```

### Configuração

```env
# Context Compression
CONTEXT_COMPRESSION_ENABLED=false           # opt-in
CONTEXT_COMPRESSION_MODEL=gemini-2.5-flash  # modelo barato para comprimir
CONTEXT_COMPRESSION_THRESHOLD=50000         # threshold em tokens
CONTEXT_COMPRESSION_PRESERVE_RECENT=10      # manter últimas N mensagens
CONTEXT_COMPRESSION_MAX_SUMMARY=5000        # max tokens do resumo
```

## Arquivos a Criar/Modificar

| Arquivo                                          | Ação                                |
| ------------------------------------------------ | ----------------------------------- |
| `src/lib/context/contextCompressor.js`           | **NOVO** — Engine de compressão     |
| `src/lib/context/compressionPrompts.js`          | **NOVO** — Prompts de compressão    |
| `src/sse/handlers/chat.js`                       | **MODIFICAR** — Integrar compressão |
| `src/app/(dashboard)/dashboard/settings/page.js` | **MODIFICAR** — UI de config        |
| `.env.example`                                   | **MODIFICAR** — Adicionar variáveis |

## Critérios de Aceite

- [ ] Compressão triggered quando tokens excedem threshold
- [ ] Últimas N mensagens preservadas intactas
- [ ] Resumo inclui file paths, decisões técnicas e estado atual
- [ ] Compressão incremental (resumo anterior + novas mensagens)
- [ ] Headers `X-Context-Compressed` e `X-Context-Ratio` no response
- [ ] Log mostra ratio de compressão e economia
- [ ] Feature é opt-in, desabilitada por padrão

## ⚠️ Considerações

> [!WARNING]
> A compressão de contexto adiciona uma chamada LLM extra por sessão longa. Isso tem custo e latência (~1-3s para compressão com modelo rápido). O benefício só vale para sessões com 50K+ tokens.

> [!TIP]
> Use o modelo mais barato disponível para compressão (gemini-2.5-flash, gpt-4o-mini). A qualidade do resumo não precisa ser perfeita — precisa ser informativamente completa.

## Referência

- [ProxyPilot: README.md](https://github.com/Finesssee/ProxyPilot/blob/main/README.md) (Context compression section)
- [Factory.ai Research: Context compression for coding agents](https://www.factory.ai/blog) (inspiração)
