# TASK-06 — Injetar `reasoning_content` no Histórico de Tool-Calls (DeepSeek R1)

**Prioridade:** 🟡 IMPORTANTE  
**Origem:** PR upstream `decolua/9router#404`  
**Branch:** `fix/task-06-deepseek-reasoning-toolcall`  
**Commit msg:** `fix: inject reasoning_content for DeepSeek reasoner in tool-call history`

---

## Problema

Modelos DeepSeek R1 e similares (modelos "raciocinadoras") geram um campo `reasoning_content` em suas respostas que contém o raciocínio chain-of-thought. Quando o modelo faz tool calls (chamadas de ferramentas), o fluxo é:

1. Modelo gera resposta com `reasoning_content` + `tool_calls`
2. Cliente executa as ferramentas e envia os resultados de volta
3. Cliente reenvia o histórico completo incluindo a mensagem do assistente

O problema: **no passo 3**, quando o cliente reenvia a mensagem do assistente com `tool_calls`, o campo `reasoning_content` é frequentemente **omitido** pelo cliente. Isso causa erro no DeepSeek porque o modelo espera receber seu próprio raciocínio de volta no histórico.

Erro típico do DeepSeek:
```
Error: Messages with role 'assistant' that contain tool_calls must also include reasoning_content
```

---

## Estado Atual do OmniRoute

O OmniRoute **já possui** extenso suporte para `reasoning_content` em múltiplos pontos:

1. **`open-sse/handlers/responseSanitizer.ts`** — Preserva e normaliza `reasoning_content`, `reasoning`, e `reasoning_details` em respostas streaming e não-streaming
2. **`open-sse/handlers/sseParser.ts`** — Acumula `reasoning_content` de chunks SSE
3. **`open-sse/utils/stream.ts`** — Injeta `reasoning_content` em deltas quando vem de `<think>` tags
4. **`open-sse/translator/request/openai-to-claude.ts`** — Converte `reasoning_content` para thinking blocks do Claude
5. **`open-sse/translator/helpers/openaiHelper.ts`** — Converte thinking blocks para `reasoning_content`
6. **`open-sse/translator/request/antigravity-to-openai.ts`** — Mapeia reasoning do Antigravity para OpenAI

O que **falta** é: quando uma mensagem do assistente no **request** (histórico anterior) contém `tool_calls` mas NÃO contém `reasoning_content`, o OmniRoute deveria injetar um `reasoning_content` vazio (ou placeholder) para satisfazer a validação do DeepSeek.

---

## Solução

Adicionar sanitização no pipeline de request para providers DeepSeek: quando uma mensagem `assistant` contém `tool_calls` sem `reasoning_content`, adicionar `reasoning_content: ""`.

---

## Arquivos a Modificar

### 1. MODIFICAR: `open-sse/translator/request/openai-to-openai.ts` (ou equivalente)

Verificar o translator OpenAI→OpenAI que é usado quando o formato de origem e destino são ambos OpenAI (caso do DeepSeek). Localizar o ponto onde mensagens do histórico são processadas e adicionar:

```typescript
// Para providers DeepSeek (reasoning models):
// Inject reasoning_content into assistant messages with tool_calls
if (provider === "deepseek" || isReasoningModel(model)) {
  for (const msg of messages) {
    if (
      msg.role === "assistant" &&
      Array.isArray(msg.tool_calls) &&
      msg.tool_calls.length > 0 &&
      !msg.reasoning_content
    ) {
      msg.reasoning_content = "";
    }
  }
}
```

---

### 2. ALTERNATIVA: MODIFICAR `open-sse/handlers/chatCore.ts`

Se o translator OpenAI→OpenAI não tiver um ponto de injeção adequado, a sanitização pode ser feita diretamente no `chatCore.ts`, logo após a tradução e antes de enviar ao executor:

```typescript
// Após translateRequest e antes de chamar o executor:
if (resolvedProvider === "deepseek" && translatedBody.messages) {
  for (const msg of translatedBody.messages) {
    if (
      msg.role === "assistant" &&
      Array.isArray(msg.tool_calls) &&
      msg.tool_calls.length > 0 &&
      msg.reasoning_content === undefined
    ) {
      msg.reasoning_content = "";
    }
  }
}
```

---

### 3. Verificação de Modelos DeepSeek Reasoning

Verificar como o OmniRoute identifica modelos reasoning. Buscar:

```bash
grep -rn "deepseek.*reason\|reasoning.*model\|isReasoning" open-sse/ src/ --include='*.ts'
```

Se não houver uma função `isReasoningModel()`, a verificação pode ser feita pelo provider ID (`deepseek`) e/ou pelo model ID (contém `r1` ou `reasoner`).

---

## Investigação Necessária

Antes de implementar, executar:

```bash
# Verificar se existe translator openai-to-openai
ls -la open-sse/translator/request/openai*.ts

# Verificar como messages são processadas para DeepSeek
grep -n "deepseek" open-sse/handlers/chatCore.ts | head -10

# Verificar se existe função isReasoningModel
grep -rn "isReasoning\|reasoningModel" open-sse/ src/ --include='*.ts'
```

---

## Teste Manual (Recomendado)

Se houver uma conexão DeepSeek configurada:

1. Fazer uma request que gere tool calls (ex: "What's the weather in São Paulo?")
2. Verificar que o response inclui `reasoning_content`
3. Reenviar o histórico (simulando o cliente reenviando com tool_calls mas sem reasoning_content)
4. Verificar que não dá erro 400

---

## Validação

1. **Build:** `npm run build`
2. **Testes unitários:** `npm run test:unit`
3. **Verificação:** Confirmed que `reasoning_content` injection não afeta providers que não são DeepSeek

---

## Riscos

- **Falso positivo:** Injetar `reasoning_content: ""` em providers que não esperam esse campo pode ser ignorado (OpenAI, Claude ignoram campos extra). Mas é mais seguro limitar ao DeepSeek.
- **Overhead:** Negligível — simples iteração sobre array de messages
