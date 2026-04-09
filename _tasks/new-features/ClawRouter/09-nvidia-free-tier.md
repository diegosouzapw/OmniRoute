# 09 — NVIDIA Free Tier: GPT-OSS-120B como Fallback Gratuito

> **Prioridade**: 🟡 Média  
> **Provider existente**: `nvidia` (já em `providers.ts` com free tier note)  
> **Impacto**: Modelo 100% gratuito como fallback quando outros estão indisponíveis ou budget acabou

---

## Contexto e Motivação

O ClawRouter tem o modelo `nvidia/gpt-oss-120b` como o **único modelo genuinamente gratuito**:
- **Preço**: $0.00/$0.00 (zero!)
- **Context**: 128.000 tokens
- **Max Output**: 16.384 tokens
- **Uso**: Fallback automático quando wallet/budget está vazio

O OmniRoute já tem NVIDIA como provider com free tier note em `providers.ts`:
```typescript
nvidia: {
  hasFree: true,
  freeNote: "Free dev access: ~40 RPM, 70+ models (Kimi K2.5, GLM 4.7, DeepSeek V3.2...)",
}
```

E em `pricing.ts` já temos:
```typescript
nvidia: {
  "gpt-oss-120b": { input: 0, output: 0, ... },
  "openai/gpt-oss-120b": { input: 0, output: 0, ... },
  // ... outros modelos gratuitos
}
```

**O gap principal**: Não temos uma estratégia automática de fallback para o `gpt-oss-120b`
quando o budget do usuário é insuficiente. O ClawRouter tem a lógica:
> "gpt-oss-120b costs nothing and serves as automatic fallback when wallet is empty"

---

## Proposta de Implementação

Implementar um **fallback automático de budget** no pipeline de request:
quando uma request falha por budget esgotado (erro 402 ou similar) em outros providers,
redirecionar automaticamente para `nvidia/gpt-oss-120b`.

---

## Arquivos a Modificar

```
open-sse/handlers/chatCore.ts         ← adicionar lógica de fallback por budget
open-sse/services/combo.ts            ← adicionar gpt-oss-120b como fallback padrão em combos
src/lib/db/settings.ts               ← configuração para habilitar/desabilitar o fallback
```

---

## Passo 1: Configuração de "Emergency Fallback"

Adicionar uma configuração em `settings.ts` (ou `config.ts`) para o fallback de emergência:

```typescript
// Em src/lib/db/settings.ts ou equivalente:
export interface EmergencyFallbackConfig {
  enabled: boolean;                    // ativar/desativar
  provider: string;                    // "nvidia" (default)
  model: string;                       // "gpt-oss-120b" (default)
  triggerOnBudgetExhausted: boolean;   // ativar quando budget acaba
  triggerOn429: boolean;               // ativar em rate limit
  maxOutputTokens: number;             // limitar output do fallback (ex: 4096)
}

export const DEFAULT_EMERGENCY_FALLBACK: EmergencyFallbackConfig = {
  enabled: true,
  provider: "nvidia",
  model: "gpt-oss-120b",
  triggerOnBudgetExhausted: true,
  triggerOn429: false,         // não para 429 — pode ser transiente
  maxOutputTokens: 4096,       // limitar para evitar abuso do free tier
};
```

---

## Passo 2: Detector de Budget Esgotado em `chatCore.ts`

Localizar onde os erros de resposta do upstream são tratados em `chatCore.ts`.
Adicionar lógica para detectar budget esgotado e fazer fallback:

```typescript
// Em open-sse/handlers/chatCore.ts, após receber erro do upstream:

async function handleUpstreamError(
  error: UpstreamError,
  originalRequest: ChatRequest,
  config: EmergencyFallbackConfig
): Promise<ChatResponse | null> {
  // Detectar budget esgotado:
  // - HTTP 402 Payment Required
  // - Mensagem de erro contendo "insufficient funds", "quota exceeded", "budget"
  const isBudgetExhausted = 
    error.status === 402 ||
    error.message?.toLowerCase().includes("insufficient") ||
    error.message?.toLowerCase().includes("budget") ||
    error.message?.toLowerCase().includes("quota exceeded");

  if (isBudgetExhausted && config.enabled && config.triggerOnBudgetExhausted) {
    console.log("[EmergencyFallback] Budget esgotado, redirecionando para nvidia/gpt-oss-120b");
    
    // Criar nova request para o fallback:
    const fallbackRequest = {
      ...originalRequest,
      // Override do model:
      model: config.model,
      // Limitar output para não abusar do free tier:
      max_tokens: Math.min(originalRequest.max_tokens || 4096, config.maxOutputTokens),
    };

    // Executar via provider nvidia (que tem credenciais configuradas):
    return await executeRequest(config.provider, fallbackRequest);
  }

  return null; // Retornar null = não fez fallback
}
```

---

## Passo 3: Adicionar gpt-oss-120b como Opção de Combo

Nos combos automáticos do AutoCombo (`open-sse/services/autoCombo/`), adicionar o
`gpt-oss-120b` como opção de última instância (tier FALLBACK):

```typescript
// Em autoCombo ou combo.ts, na configuração de tiers:
const FALLBACK_MODELS = [
  // Modelos gratuitos como última opção:
  {
    provider: "nvidia",
    model: "gpt-oss-120b",
    priority: 99,        // mais baixo = último recurso
    maxOutputTokens: 4096,
    freeModel: true,
    tags: ["fallback", "free"],
  },
  {
    provider: "groq", 
    model: "llama-3.3-70b-versatile",
    priority: 98,
    freeModel: true,
    tags: ["fallback", "free"],
  },
];
```

---

## Passo 4: Dashboard — Indicador de Fallback

Adicionar no dashboard de logs uma indicação quando o fallback foi ativado:

```typescript
// No sistema de logs, quando fallback é ativado:
await logProxyRequest({
  // ...campos normais...
  fallbackUsed: true,
  originalProvider: "openai",
  fallbackProvider: "nvidia",
  fallbackModel: "gpt-oss-120b",
  fallbackReason: "budget_exhausted",
});
```

No `/dashboard/logs`, mostrar um badge visual para requests que usaram fallback:
```html
<!-- No componente de log entry -->
<span v-if="log.fallbackUsed" class="badge badge-warning">
  🔄 Emergency Fallback ({{ log.fallbackModel }})
</span>
```

---

## Passo 5: UI — Configuração nas Settings

Adicionar na página `/dashboard/settings` uma opção para configurar o emergency fallback:

```
⚡ Emergency Fallback
─────────────────────
Quando habilitado, requests que falham por falta de budget
são automaticamente redirecionadas para um modelo gratuito.

[✅] Habilitar Emergency Fallback
    Provider: [NVIDIA ▼]
    Modelo: [gpt-oss-120b ▼]
    Max Output Tokens: [4096]
    Trigger em budget esgotado: [✅]
    Trigger em rate limit 429: [☐]
```

---

## Limitações Conhecidas do gpt-oss-120b (NVIDIA Free)

Segundo ClawRouter:
1. **Rate limit**: ~40 RPM (requests por minuto) — compartilhado por todos usuários
2. **Tool calling**: Não garantido — pode emitir JSON raw ao invés de function calls estruturadas
3. **Qualidade**: Menor que modelos pagos — só usar como fallback, nunca como primary
4. **Disponibilidade**: Pode ter instabilidade em horários de pico

**Implicações na implementação**:
- Para requests com `tools`, NÃO usar gpt-oss-120b como fallback (pode quebrar o tool calling)
- Adicionar um timeout menor para o fallback (ex: 30s vs 60s padrão)
- Logar claramente no analytics que o request usou o free fallback

---

## Testes de Validação

### Teste 1: Simular budget esgotado
```bash
# Configurar um combo com budget muito pequeno (ex: $0.00001)
# Fazer um request que exceda esse budget
# Verificar nos logs se o fallback foi ativado para nvidia/gpt-oss-120b
```

### Teste 2: Resposta do gpt-oss-120b
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer <nvidia-key>" \
  -d '{
    "model": "gpt-oss-120b",
    "messages": [{"role": "user", "content": "What is the capital of Brazil?"}]
  }'
```

### Teste 3: Tool calling bloqueado no fallback
```bash
# Fazer request com tools para um provider com budget esgotado
# Verificar que o fallback NÃO é ativado quando há tools no request
# (deve retornar erro 402 indicando budget esgotado, não tentar o fallback)
```

---

## Referências

- [NVIDIA NIM API](https://build.nvidia.com/docs)
- [ClawRouter models.ts - NVIDIA entry](https://github.com/BlockRunAI/ClawRouter/blob/main/src/models.ts)
- ClawRouter: `"Free tier: gpt-oss-120b costs nothing and serves as automatic fallback when wallet is empty"`

---

## Rollback

A feature é aditiva — apenas desabilitar o flag `enabled: false` na config de emergency fallback.
Ou remover a lógica de handleUpstreamError se necessário.
