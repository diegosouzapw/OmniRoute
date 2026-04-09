# 07 — DeepSeek V3.2: Atualização de Preços e Modelo

> **Prioridade**: 🔴 Alta  
> **Provider existente**: `deepseek` (já em `providers.ts`)  
> **Impacto**: Preços atualizados do DeepSeek V3.2 chat e reasoner

---

## Contexto e Motivação

O ClawRouter usa preços específicos para o `deepseek/deepseek-chat` (V3.2):
- Input: **$0.28/M** tokens
- Output: **$0.42/M** tokens

Nosso `pricing.ts` atual para o provider `deepseek` não tem preços explícitos (a seção pode
estar vazia ou incompleta). Além disso, alguns providers livres como `qoder`, `nvidia`, e 
`siliconflow` já mencionam `deepseek-v3.2` em seus catálogos.

O modelo `deepseek-chat` do ClawRouter aponta para **DeepSeek V3.2 Chat** (não V3.1 ou V3).
Da mesma forma, o `deepseek-reasoner` aponta para **DeepSeek V3.2 Reasoner**.

---

## Estado Atual no OmniRoute

Verificando `pricing.ts`:
- `qoder` provider: tem `deepseek-v3.2-chat` ($0.50/$2.00) e `deepseek-v3.2-reasoner` ($0.75/$3.00)
- `nvidia` provider: tem `deepseek-ai/deepseek-v3.2` ($0/0 — free)
- `siliconflow` provider: tem `deepseek-ai/DeepSeek-V3.2` ($0/0 — free)

Os preços do `qoder` ($0.50/$2.00) são MAIORES que os do ClawRouter ($0.28/$0.42).  
A seção `deepseek` (provider nativo) pode estar faltando ou com preços desatualizados.

---

## Investigação Necessária

### 1. Verificar preços atuais do DeepSeek

Acessar [DeepSeek Pricing](https://platform.deepseek.com/api-docs/pricing) e confirmar:
- Preço atual do `deepseek-chat` (V3)
- Preço do `deepseek-reasoner` (R1)
- Se existe versão V3.2 disponível na API pública (pode ser apenas nos free providers)

### 2. Verificar seção `deepseek` em `pricing.ts`

```bash
grep -A 20 '"deepseek"' /home/diegosouzapw/dev/proxys/9router/src/shared/constants/pricing.ts
```

---

## Arquivos a Modificar

```
src/shared/constants/pricing.ts    ← seção deepseek (adicionar/atualizar preços)
```

---

## Passo 1: Adicionar/Atualizar Seção `deepseek` em `pricing.ts`

Se a seção `deepseek` não existir ou estiver desatualizada:

```typescript
// Seção deepseek (API Key nativa):
deepseek: {
  // DeepSeek Chat (V3) — modelo de chat padrão
  // Preço confirmado conforme ClawRouter (verificar na documentação oficial):
  "deepseek-chat": {
    input: 0.28,
    output: 0.42,
    cached: 0.014,    // DeepSeek tem cache hit (5% do input)
    reasoning: 0.42,  // mesmo que output
    cache_creation: 0.28,
  },

  // Alias V3.2 para compatibilidade:
  "deepseek-v3": {
    input: 0.28,
    output: 0.42,
    cached: 0.014,
    reasoning: 0.42,
    cache_creation: 0.28,
  },

  // DeepSeek Reasoner (R1)
  "deepseek-reasoner": {
    input: 0.55,    // R1 é mais caro que V3
    output: 2.19,   // verificar preço atual
    cached: 0.14,
    reasoning: 2.19,
    cache_creation: 0.55,
  },
},
```

---

## Passo 2: Corrigir Preços no Provider `qoder`

Os preços do `qoder` para DeepSeek estão usando valores antigos/diferentes:

```typescript
// ANTES (em pricing.ts, seção if/qoder):
"deepseek-v3.2-chat": {
  input: 0.5,   // ← provavelmente desatualizado
  output: 2.0,
  // ...
},

// DEPOIS (se ClawRouter confirmar $0.28/$0.42):
"deepseek-v3.2-chat": {
  input: 0.28,
  output: 0.42,
  cached: 0.014,
  reasoning: 0.63,
  cache_creation: 0.28,
},
"deepseek-v3.2-reasoner": {
  input: 0.55,
  output: 2.19,
  cached: 0.14,
  reasoning: 2.19,
  cache_creation: 0.55,
},
```

> ⚠️ Fazer isso APENAS APÓS confirmar os preços oficiais. Prioridade: precisão sobre velocidade.

---

## Passo 3: Verificar Alias `deepseek-chat` → `deepseek/deepseek-chat`

O ClawRouter tem o alias:
```typescript
"deepseek-chat": "deepseek/deepseek-chat",
```

Verificar se temos algo equivalente no nosso sistema de aliases para que usuários
posam usar `deepseek-chat` como shorthand.

---

## Testes de Validação

### Teste 1: Preço correto
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <deepseek-key>" \
  -d '{"model": "deepseek-chat", "messages": [{"role": "user", "content": "What is 2+2?"}]}'
```
Verificar no analytics: custo deve ser ~$0.28/M input tokens.

### Teste 2: Streaming
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <deepseek-key>" \
  -d '{"model": "deepseek-chat", "messages": [{"role": "user", "content": "Count to 10."}], "stream": true}'
```

---

## Referências

- [DeepSeek API Pricing](https://platform.deepseek.com/api-docs/pricing)
- [ClawRouter models.ts - DeepSeek](https://github.com/BlockRunAI/ClawRouter/blob/main/src/models.ts)
- ClawRouter commit: `fix: sync TOP_MODELS, add deepseek-chat alias` (0.12.44)
