# 03 — Gemini 2.5 Flash Lite: Modelo Ultra-Barato ($0.10/$0.40/M)

> **Prioridade**: 🔴 Alta  
> **Provider existente**: `gemini` (já em `providers.ts`)  
> **Impacto**: Modelo mais barato com 1M de context window para tasks simples

---

## Contexto e Motivação

O `gemini-2.5-flash-lite` é o modelo mais barato da família Gemini 2.5 com as seguintes   
características únicas:
- **Preço**: $0.10/$0.40 por 1M tokens — o mais barato com 1M de context window
- **Uso**: Tarefas simples, routing, classificação, respostas curtas sem need de reasoning

**Observação importante**: Verificando `pricing.ts`, o modelo `gemini-2.5-flash-lite` já está
listado na seção `gc` (Gemini CLI) e na seção `gemini` com preços levemente diferentes dos do
ClawRouter. A seção `gc` usa $0.15/$1.25 e `gemini` usa $0.15/$1.25 enquanto ClawRouter usa $0.10/$0.40.

**Ação necessária**: Verificar qual é o preço oficial do `gemini-2.5-flash-lite` direto na
[Google AI pricing page](https://ai.google.dev/pricing) e atualizar se necessário.

---

## Estado Atual no OmniRoute

Nosso `pricing.ts` já tem entradas para `gemini-2.5-flash-lite`:

```typescript
// Em gc (Gemini CLI):
"gemini-2.5-flash-lite": {
  input: 0.15,
  output: 1.25,
  // ...
},

// Em gemini (API Key):
"gemini-2.5-flash-lite": {
  input: 0.15,
  output: 1.25,
  // ...
},
```

ClawRouter usa `$0.10/$0.40`. Precisa verificar qual é o correto.

---

## Investigação: Preço Oficial

Acessar [https://ai.google.dev/pricing](https://ai.google.dev/pricing) e conferir o preço
atual do `gemini-2.5-flash-lite`. Os preços do Google mudam frequentemente.

**Se o preço correto for $0.10/$0.40/M** (conforme ClawRouter):

### Passo 1: Atualizar `pricing.ts` seção `gemini`

```typescript
gemini: {
  // ... outros modelos ...
  "gemini-2.5-flash-lite": {
    input: 0.10,    // ← atualizado de 0.15
    output: 0.40,   // ← atualizado de 1.25
    cached: 0.025,  // geralmente 25% do input
    reasoning: 0.60, // geralmente 1.5x output
    cache_creation: 0.10,
  },
},
```

### Passo 2: Atualizar `pricing.ts` seção `gc` (Gemini CLI)

```typescript
gc: {
  // ... outros modelos ...
  "gemini-2.5-flash-lite": {
    input: 0.10,
    output: 0.40,
    cached: 0.025,
    reasoning: 0.60,
    cache_creation: 0.10,
  },
},
```

---

## Verificar se modelo está no Provider Registry

Confirmar que `gemini-2.5-flash-lite` aparece nos modelos disponíveis do provider `gemini`.
Se já está listado, basta atualizar o preço. Se não está, adicionar ao registry:

```typescript
{
  id: "gemini-2.5-flash-lite",
  name: "Gemini 2.5 Flash Lite",
  description: "Modelo mais barato da família Gemini 2.5. 1M context, ideal para classificação e tasks simples.",
  contextWindow: 1000000,
  maxOutput: 65536,
  capabilities: ["chat", "tools"],
  pricing: { input: 0.10, output: 0.40 },
  tags: ["cheap", "eco", "large-context"],
},
```

---

## Verificar se há 3ª Seção a Atualizar

Além de `gc` e `gemini`, checar se existe outra referência em outros arquivos:

```bash
grep -r "flash-lite" /home/diegosouzapw/dev/proxys/9router/src/ --include="*.ts"
grep -r "flash-lite" /home/diegosouzapw/dev/proxys/9router/open-sse/ --include="*.ts"
```

Atualizar todas as ocorrências encontradas com o preço correto.

---

## Testes de Validação

### Teste 1: Verificar preço calculado
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <gemini-api-key>" \
  -d '{
    "model": "gemini-2.5-flash-lite",
    "messages": [{"role": "user", "content": "What is 2+2?"}],
    "stream": false
  }'
```
Verificar no dashboard que custo é ~$0.10/M input.

### Teste 2: Context window longo
```bash
# Gerar um prompt longo (~100k tokens) e verificar que o modelo aceita
python3 -c "print('word ' * 50000)" | \
  curl -X POST http://localhost:3000/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <gemini-api-key>" \
    -d "{\"model\": \"gemini-2.5-flash-lite\", \"messages\": [{\"role\": \"user\", \"content\": \"$(cat)\"}]}"
```

---

## Referências

- [ClawRouter models.ts - gemini-2.5-flash-lite entry](https://github.com/BlockRunAI/ClawRouter/blob/main/src/models.ts)
- [Google AI Pricing](https://ai.google.dev/pricing)
- Nossa seção `pricing.ts` linha ~480

---

## Rollback

Apenas reverter valores de preço em `pricing.ts`. Risk: baixíssimo, apenas atualização de valores.
