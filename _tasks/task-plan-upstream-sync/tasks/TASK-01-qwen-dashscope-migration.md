# TASK-01 — Migrar URL do Provider Qwen para DashScope

**Prioridade:** 🔴 CRÍTICA  
**Origem:** Issue upstream `decolua/9router#239`  
**Branch:** `fix/task-01-qwen-dashscope-migration`  
**Commit msg:** `fix: migrate Qwen provider URLs from portal.qwen.ai to DashScope (#239)`

---

## Problema

O provider `qwen` no OmniRoute está configurado com a URL base `https://portal.qwen.ai/v1/chat/completions`. Essa URL está **descontinuada** pela Alibaba Cloud e retorna `404` para o endpoint `/models` e erros de cota incorretos para `/chat/completions`.

A Alibaba migrou toda a infraestrutura da Qwen Code CLI para o **DashScope**, que é o gateway oficial e possui 3 endpoints regionais:

| Região | URL Base |
|--------|----------|
| China (Mainland) | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| **Internacional** | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1` |
| US (Virginia) | `https://dashscope-us.aliyuncs.com/compatible-mode/v1` |

O URL correto para uso global (o que faz sentido para um proxy universal) é o **Internacional**:  
`https://dashscope-intl.aliyuncs.com/compatible-mode/v1`

---

## Arquivos a Modificar

### 1. `open-sse/config/providerRegistry.ts` (linha ~294)

**Estado atual:**
```typescript
qwen: {
    id: "qwen",
    alias: "qw",
    format: "openai",
    executor: "default",
    baseUrl: "https://portal.qwen.ai/v1/chat/completions",
    // ...
}
```

**Estado desejado:**
```typescript
qwen: {
    id: "qwen",
    alias: "qw",
    format: "openai",
    executor: "default",
    baseUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
    // ...
}
```

**ATENÇÃO:** Os headers do Qwen já incluem `X-Dashscope-AuthType`, `X-Dashscope-CacheControl` e `X-Dashscope-UserAgent`, então eles são **compatíveis** com o novo endpoint DashScope sem alteração.

---

### 2. `src/app/api/providers/[id]/models/route.ts` (linha ~143-149)

**Estado atual:**
```typescript
qwen: {
    url: "https://portal.qwen.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
},
```

**Estado desejado:**
```typescript
qwen: {
    url: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
},
```

---

### 3. `src/app/api/providers/[id]/test/route.ts` (linha ~62)

Este arquivo já possui um comentário indicando que `portal.qwen.ai/v1/models` retorna 404. Verificar se utiliza a URL antiga em alguma lógica e atualizar se necessário. O comentário existente pode ser removido ou atualizado para refletir que a migração foi feita.

**Buscar:** `portal.qwen.ai` e substituir pela URL DashScope.

---

## Validação

1. **Build:** `npm run build` — deve compilar sem erros
2. **Testes unitários:** `npm run test:unit` — todos os 939+ testes devem passar
3. **Teste manual (opcional):** Se houver uma chave Qwen configurada, testar:
   - Dashboard → Providers → Qwen → clicar "Test Connection"
   - Dashboard → Providers → Qwen → clicar "Import from /models"

---

## Riscos

- **Nenhum breaking change:** A migração é transparente para o usuário — mesmo formato OpenAI-compatible, mesma autenticação OAuth
- **Risco de regressão:** Tokens OAuth gerados via `chat.qwen.ai/api/v1/oauth2/token` devem continuar válidos para o DashScope (mesmo ecossistema Alibaba Cloud)
- **Cota:** O endpoint DashScope tem cotas próprias — verificar se há diferenças no rate limiting comparado ao `portal.qwen.ai`
