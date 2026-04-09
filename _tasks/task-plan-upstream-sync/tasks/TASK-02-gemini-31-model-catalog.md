# TASK-02 — Adicionar `gemini-3.1-pro-preview` ao Catálogo Estático de Modelos

**Prioridade:** 🔴 CRÍTICA  
**Origem:** Issue upstream `decolua/9router#234`, pesquisa web Google AI  
**Branch:** `fix/task-02-gemini-31-model-catalog`  
**Commit msg:** `feat: add gemini-3.1-pro-preview and -customtools to static model catalogs`

---

## Problema

Usuários do Gemini CLI relatam que o catálogo de modelos está desatualizado. O Google introduziu novos modelos na série 3.1 que não estão registrados nas listas estáticas do dashboard:

| Model ID | Descrição |
|----------|-----------|
| `gemini-3.1-pro-preview` | Gemini 3.1 Pro Preview — modelo principal |
| `gemini-3.1-pro-preview-customtools` | Variante otimizada para ferramentas customizadas |

O provider registry (`providerRegistry.ts`) **já possui** esses modelos registrados para `gemini` e `gemini-cli` (linhas 196-210 e 232-246). O problema está em dois outros arquivos que usam listas estáticas diferentes:

1. `STATIC_MODEL_PROVIDERS` em `src/app/api/providers/[id]/models/route.ts` — lista usada pelo botão "Import from /models" quando a API do provider está offline
2. A lista estática em `antigravity` dentro do mesmo `STATIC_MODEL_PROVIDERS`

---

## Arquivos a Modificar

### 1. `src/app/api/providers/[id]/models/route.ts` — `STATIC_MODEL_PROVIDERS`

**Localização:** Linhas ~59-66 (dentro de `antigravity: () => [...]`)

**Estado atual:**
```typescript
antigravity: () => [
    { id: "claude-opus-4-6-thinking", name: "Claude Opus 4.6 Thinking" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
    { id: "gpt-oss-120b-medium", name: "GPT OSS 120B Medium" },
],
```

**Estado desejado:** Adicionar os modelos Gemini 3.1 que estão presentes no provider registry mas faltam aqui:
```typescript
antigravity: () => [
    { id: "claude-opus-4-6-thinking", name: "Claude Opus 4.6 Thinking" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" },
    { id: "gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite Preview" },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
    { id: "gpt-oss-120b-medium", name: "GPT OSS 120B Medium" },
],
```

---

### 2. Mesma seção — lista `claude` (linhas ~67-73)

**Estado atual:**
```typescript
claude: () => [
    { id: "claude-opus-4-6", name: "Claude Opus 4.6" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
    { id: "claude-opus-4-5-20251101", name: "Claude Opus 4.5 (2025-11-01)" },
    { id: "claude-sonnet-4-5-20250929", name: "Claude Sonnet 4.5 (2025-09-29)" },
    { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5 (2025-10-01)" },
],
```

**Verificação:** Confirmar que os model IDs em `STATIC_MODEL_PROVIDERS.claude` coincidem com os no `providerRegistry.ts` (linhas 167-173). Atualmente:
- Registry: `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-opus-4-5-20251101`, `claude-sonnet-4-5-20250929`, `claude-haiku-4-5-20251001`
- Static: Idêntico ✅ — não requer alteração

---

### 3. `src/shared/constants/modelSpecs.ts`

**Verificação:** Confirmar que as entradas para `gemini-3.1-pro-high` (linha 34) e `gemini-3-flash` (linha 22) possuem aliases corretos. O estado atual já inclui:
```typescript
"gemini-3.1-pro-high": {
    aliases: ["gemini-3-pro-high"],
},
"gemini-3-flash": {
    aliases: ["gemini-3-flash-preview", "gemini-3.1-flash-lite-preview"],
},
```

**Adicionar alias:** `gemini-3.1-pro-preview-customtools` como alias de `gemini-3.1-pro-high` para que requisições com esse model ID sejam resolvidas corretamente:
```typescript
"gemini-3.1-pro-high": {
    aliases: ["gemini-3-pro-high", "gemini-3.1-pro-preview", "gemini-3.1-pro-preview-customtools"],
},
```

---

### 4. `src/shared/constants/pricing.ts`

**Verificação:** A entrada `gemini-3.1-pro-preview` já existe na linha 215 e 648. Confirmar que os preços estão atualizados. **No caso de `gemini-3.1-pro-preview-customtools`**, não adicionar — ele será resolvido como alias do `-high` que já tem pricing definido.

---

## Validação

1. **Build:** `npm run build`
2. **Testes unitários:** `npm run test:unit`
3. **Verificação visual (opcional):** Dashboard → Providers → Antigravity → deve listar os novos modelos Gemini 3.1

---

## Riscos

- **Baixo risco:** Apenas adiciona entradas a listas estáticas existentes — não afeta lógica de roteamento
- **Alias de modelo:** Se `gemini-3.1-pro-preview-customtools` se comportar de forma diferente do `-high` no Google, o alias pode causar problemas. Monitorar.
