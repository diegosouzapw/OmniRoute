# TASK T3 — Core Service: `open-sse/services/contextHandoff.ts`

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Confirmar que T1 e T2 estão concluídas
3. Ler `open-sse/services/contextManager.ts` inteiro — entender as 3 camadas de compressão (trim tools, compress thinking, purify history) e o formato `Message`
4. Ler `src/lib/memory/extraction.ts` para entender o padrão de chamada LLM não-bloqueante
5. Ler `open-sse/services/codexQuotaFetcher.ts` (criado nos itens 1-3) para entender a estrutura `CodexDualWindowQuota`

## Objetivo

Criar o serviço central do sistema de handoff. Este módulo é o "cérebro" do `context-relay`:
- Decide quando gerar um handoff (threshold 85%)
- Chama o LLM para gerar o summary estruturado
- Persiste via T2 (`contextHandoffs.ts`)
- Formata o handoff para injeção na nova conta

## Arquivo a Criar

**`open-sse/services/contextHandoff.ts`**

## Constantes

```typescript
// Threshold para disparar geração do handoff (antes da conta ser bloqueada a 95%)
export const HANDOFF_WARNING_THRESHOLD = 0.85;

// Threshold a partir do qual a conta é bloqueada (já implementado no preflight)
export const HANDOFF_EXHAUSTION_THRESHOLD = 0.95;

// Máximo de tokens do histórico passados ao LLM para gerar o summary
const MAX_HISTORY_TOKENS_FOR_SUMMARY = 8000;

// Máximo de mensagens mais recentes para incluir no contexto do summary
const MAX_MESSAGES_FOR_SUMMARY = 30;

// Prompt usado para gerar o handoff summary
const HANDOFF_PROMPT_TEMPLATE = `...`; // ver seção abaixo
```

## Prompt Template para o LLM

```
You are a context summarizer. Analyze the conversation below and generate a structured handoff summary.
This summary will be used to restore context when this conversation is moved to a new AI account.

CONVERSATION HISTORY:
{HISTORY}

Generate a JSON object with this exact structure:
{
  "summary": "A clear, dense summary of what has been discussed and accomplished (max 200 words). Focus on what the AI needs to know to continue seamlessly.",
  "keyDecisions": ["decision1", "decision2"],  // Max 8 decisions made in this session
  "taskProgress": "Current state of the task: what's done, what's pending, next steps",
  "activeEntities": ["file1.ts", "feature X", "topic Y"]  // Files, topics, key entities (max 10)
}

Important: Return ONLY the JSON object, no markdown, no explanation.
```

## Função Principal: `maybeGenerateHandoff`

```typescript
/**
 * Verifica se o threshold de warning foi atingido e, se sim, dispara
 * a geração assíncrona do handoff (não-bloqueante).
 *
 * DEVE ser chamada após cada request bem-sucedido no context-relay.
 *
 * @param options.sessionId - ID da sessão atual
 * @param options.comboName - Nome do combo context-relay
 * @param options.connectionId - ID da conta atual (para fromAccount)
 * @param options.percentUsed - Quota atual desta conta (0-1)
 * @param options.messages - Histórico completo da conversa
 * @param options.model - Modelo disponível para gerar o summary
 * @param options.expiresAt - Quando a janela de quota vai resetar (para TTL)
 * @param options.handleSingleModel - Função para fazer a chamada LLM
 */
export function maybeGenerateHandoff(options: {
  sessionId: string;
  comboName: string;
  connectionId: string;
  percentUsed: number;
  messages: Message[];
  model: string;
  expiresAt: string | null;
  handleSingleModel: (body: Record<string, unknown>, modelStr: string) => Promise<Response>;
}): void {
  // Só dispara se >= WARNING_THRESHOLD (e < EXHAUSTION_THRESHOLD, pois acima já há troca)
  if (options.percentUsed < HANDOFF_WARNING_THRESHOLD) return;
  if (options.percentUsed >= HANDOFF_EXHAUSTION_THRESHOLD) return;

  // Não gerar se já existe handoff ativo para esta sessão
  if (hasActiveHandoff(options.sessionId, options.comboName)) return;

  // Disparar assincronamente — não bloquear o response pipeline
  setImmediate(() => {
    generateHandoffAsync(options).catch((err) => {
      console.warn("[context-relay] Handoff generation failed (non-fatal):", err?.message);
    });
  });
}
```

## Função Interna: `generateHandoffAsync`

```typescript
async function generateHandoffAsync(options: ...): Promise<void> {
  // 1. Preparar histórico comprimido para o LLM
  const trimmedMessages = options.messages.slice(-MAX_MESSAGES_FOR_SUMMARY);
  const historyText = formatMessagesForPrompt(trimmedMessages);

  // 2. Montar o prompt de summary
  const summaryPrompt = HANDOFF_PROMPT_TEMPLATE.replace("{HISTORY}", historyText);

  // 3. Chamar o LLM (não-streaming, sem tools, curto)
  const summaryBody = {
    model: options.model,
    messages: [
      { role: "user", content: summaryPrompt }
    ],
    stream: false,
    max_tokens: 800,
    temperature: 0.1,  // baixo para output consistente
  };

  const response = await options.handleSingleModel(summaryBody, options.model);
  if (!response.ok) return;  // falha silenciosa

  // 4. Parsear JSON do summary
  const json = await response.json();
  const content = json?.choices?.[0]?.message?.content || json?.content?.[0]?.text || "";
  const parsed = parseHandoffJSON(content);
  if (!parsed) return;  // output inválido — silencioso

  // 5. Calcular TTL
  const expiresAt = options.expiresAt || new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString();

  // 6. Persistir
  upsertHandoff({
    sessionId: options.sessionId,
    comboName: options.comboName,
    fromAccount: options.connectionId.slice(0, 8),
    summary: parsed.summary,
    keyDecisions: parsed.keyDecisions,
    taskProgress: parsed.taskProgress,
    activeEntities: parsed.activeEntities,
    messageCount: options.messages.length,
    model: options.model,
    warningThresholdPct: HANDOFF_WARNING_THRESHOLD,
    generatedAt: new Date().toISOString(),
    expiresAt,
  });
}
```

## Função: `buildHandoffSystemMessage`

Formata o HandoffPayload como uma system message XML para injeção na nova conta.

```typescript
export function buildHandoffSystemMessage(payload: HandoffPayload): string {
  const decisions = payload.keyDecisions.map(d => `  - ${d}`).join("\n");
  const entities = payload.activeEntities.join(", ");

  return `<context_handoff>
<transfer_reason>Account quota transfer - continuing from previous session</transfer_reason>
<session_summary>${payload.summary}</session_summary>
<task_progress>${payload.taskProgress}</task_progress>
<key_decisions>
${decisions}
</key_decisions>
<active_context>${entities}</active_context>
<messages_processed>${payload.messageCount}</messages_processed>
</context_handoff>

You are continuing a conversation that was transferred from another account due to quota limits.
The context above contains a full summary of what was discussed. Continue seamlessly from where we left off.`;
}
```

## Função: `injectHandoffIntoBody`

Modifica o `body` da requisição para incluir o handoff como system message.

```typescript
/**
 * Injeta o HandoffPayload no body da requisição como primeira system message.
 * Se já existe uma system message, o handoff é prepended (antes dela).
 * Deve ser chamada ANTES de enviar para handleSingleModel na nova conta.
 *
 * @returns body modificado com handoff injetado
 */
export function injectHandoffIntoBody(
  body: Record<string, unknown>,
  payload: HandoffPayload
): Record<string, unknown> {
  const handoffMsg = buildHandoffSystemMessage(payload);
  const messages = Array.isArray(body.messages) ? [...body.messages] : [];

  // Inserir como primeira mensagem (antes de qualquer system message existente)
  const handoffSystemMsg = { role: "system", content: handoffMsg };

  return {
    ...body,
    messages: [handoffSystemMsg, ...messages],
  };
}
```

## Função Helper: `parseHandoffJSON`

```typescript
function parseHandoffJSON(content: string): {
  summary: string;
  keyDecisions: string[];
  taskProgress: string;
  activeEntities: string[];
} | null {
  try {
    // Tentar parsear diretamente
    const parsed = JSON.parse(content.trim());
    if (typeof parsed.summary !== "string") return null;
    return {
      summary: String(parsed.summary).slice(0, 2000),
      keyDecisions: Array.isArray(parsed.keyDecisions)
        ? parsed.keyDecisions.filter((d: unknown) => typeof d === "string").slice(0, 8)
        : [],
      taskProgress: String(parsed.taskProgress || "").slice(0, 500),
      activeEntities: Array.isArray(parsed.activeEntities)
        ? parsed.activeEntities.filter((e: unknown) => typeof e === "string").slice(0, 10)
        : [],
    };
  } catch {
    // Tentar extrair JSON de markdown code fence
    const match = /```(?:json)?\s*([\s\S]+?)\s*```/.exec(content);
    if (match) {
      return parseHandoffJSON(match[1]);
    }
    return null;
  }
}
```

## Verificação

```bash
# TypeScript sem erros
npm run typecheck:core 2>&1 | grep contextHandoff

# ESLint sem erros (security rules)
npx eslint open-sse/services/contextHandoff.ts

# Sem circular dependencies
npm run check:cycles 2>&1 | grep contextHandoff
```

## Notas de Segurança

- O output do LLM é sempre verificado antes de salvar (função `parseHandoffJSON`)
- Campos são truncados com `.slice()` para evitar DoS de payloads grandes
- A chamada LLM falha silenciosamente — nunca bloqueia o pipeline principal
- O `handleSingleModel` passa pela autenticação e circuitbreaker normais

## Status

- [ ] Constantes e tipos exportados
- [ ] `maybeGenerateHandoff` implementada (não-bloqueante)
- [ ] `generateHandoffAsync` implementada
- [ ] `buildHandoffSystemMessage` implementada
- [ ] `injectHandoffIntoBody` implementada
- [ ] `parseHandoffJSON` com fallback de markdown
- [ ] TypeScript compila sem erros
- [ ] ESLint sem erros
- [ ] Sem circular dependencies
