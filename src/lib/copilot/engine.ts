/**
 * OmniRoute Copilot — Chat Engine
 *
 * Processes user messages, classifies intent, executes tools,
 * queries CodeGraph, invokes CLI commands, or responds with
 * knowledge from the system prompt.
 */

import { getCopilotSystemPrompt } from "./systemPrompt";
import { COPILOT_TOOLS, getCopilotTool, getCopilotToolDescriptions } from "./tools";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CopilotMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface CopilotRequest {
  messages: CopilotMessage[];
}

export interface CopilotResponse {
  message: string;
  toolCalls?: Array<{ name: string; args: Record<string, unknown>; result: string }>;
}

// ── Tool Lookup for Dynamic Dispatch ────────────────────────────────────────

const TOOL_NAMES = COPILOT_TOOLS.map((t) => t.name);

// ── Knowledge-based responses ───────────────────────────────────────────────

function getKnowledgeResponse(query: string): string | null {
  const q = query.toLowerCase();

  // Architecture questions
  if (
    /architecture|arquitectura|pipeline/.test(q) ||
    (q.includes("request") && (q.includes("flow") || q.includes("path")))
  ) {
    return `## OmniRoute Architecture

The request pipeline flows through:
1. **API Route** → CORS → Zod validation → Auth (optional)
2. **Guardrails** → Prompt injection guard, PII masking
3. **Pre-request Middleware Hooks** (NEW) — mutate routing decisions
4. **Task-aware routing / Combo resolution** — picks the target
5. **Cache check** — semantic/signature cache
6. **Rate limit check**
7. **Request translation** — OpenAI format → provider format
8. **Executor** — build URL + headers, fetch with retry
9. **Response translation** — provider format → client format
10. **SSE stream or JSON response**

The data layer uses **SQLite** via 45+ domain modules in \`src/lib/db/\`.
The streaming engine lives in \`open-sse/\` (handlers, executors, translator).`;
  }

  // Combo questions
  if (/combo|routing|strategy|estrategia/.test(q)) {
    return `## Combo Routing

Combos chain multiple targets (provider+model) with a strategy:

**14 strategies available:**
- \`priority\`: Try targets in order, fall through on failure
- \`weighted\`: Distribute load by weight
- \`round-robin\`: Cycle through targets
- \`auto\`: Intelligent selection (rules, cost, latency, eco, fast, LKGP)
- \`fill-first\`: Fill capacity of first target
- \`cost-optimized\`: Minimize cost
- \`context-optimized\`: Maximize context window
- \`p2c\`: Power of Two Choices
- \`random\` / \`strict-random\`: Random selection
- \`least-used\`: Load balance by usage
- \`reset-aware\`: Account for API reset windows
- \`context-relay\`: Relay context between models
- \`lkgp\`: Last Known Good Provider

Use \`createCombo\` tool or \`runOmniRouteCli\` to create them.`;
  }

  // Provider questions
  if (/provider|proveedor/.test(q)) {
    return `## Providers (212+)

OmniRoute supports 212+ providers across categories:
- **Free**: Qoder AI, Qwen Code, Kiro AI
- **OAuth** (14): Claude Code, Antigravity, Codex, GitHub Copilot, Cursor, Kimi Coding, Windsurf, etc.
- **API Key** (120+): OpenAI, Anthropic, Gemini, DeepSeek, Groq, xAI, Mistral, etc.
- **Self-Hosted** (8+): LM Studio, vLLM, Ollama, Triton, etc.
- **Custom**: \`openai-compatible-*\` and \`anthropic-compatible-*\`

Use \`listProviders\` to see your configured ones.`;
  }

  // Debugging/troubleshooting
  if (/debug|error|fail|fallo|problema|issue|crash|log/.test(q)) {
    return `## Troubleshooting

**Common issues:**

1. **Provider returns errors**: Check credentials with the health API (\`/api/monitoring/health\`)
2. **Combo targeting wrong provider**: Check strategy and targets with \`listCombos\`
3. **Rate limiting**: Check circuit breaker state via health API
4. **Auth errors**: Verify API key scopes with \`listApiKeys\`
5. **DeepSeek 400 errors**: Likely \`reasoning_content\` stripping issue — fixed in schemaCoercion.ts

**Use CodeGraph** to investigate specific code paths with \`searchCodeGraph\`.`;
  }

  // CodeGraph questions
  if (/codigo|código|codebase|cómo funciona|how does|where is|dónde está/.test(q)) {
    return `## Codebase Investigation

I can use CodeGraph to explore the OmniRoute codebase. Just ask me:
- "Busca la función handleChatCore"
- "Quién llama a sanitizeMessage?"
- "Qué funciones hay en combo.ts?"
- "Dame contexto del archivo chatCore.ts"
- "Lista los archivos TypeScript indexados"

Use these search terms naturally and I'll query the CodeGraph index.`;
  }

  return null;
}

// ── Intent Classification ────────────────────────────────────────────────────

const INTENT_PATTERNS: Array<{
  pattern: RegExp;
  tool: string;
  extractArgs: (match: RegExpMatchArray) => Record<string, unknown>;
}> = [
  // ── Provider tools ──
  {
    pattern: /list.*(?:providers?|connections?|accounts)/i,
    tool: "listProviders",
    extractArgs: () => ({}),
  },
  {
    pattern: /list.*(oauth|api.?key|free|local).*provider/i,
    tool: "listProviders",
    extractArgs: (m) => ({ type: (m[1] || "").toLowerCase().replace(/[^a-z]/g, "") }),
  },

  // ── Combo tools ──
  { pattern: /list.*(?:combo|route)/i, tool: "listCombos", extractArgs: () => ({}) },
  { pattern: /show.*(?:combo|route)/i, tool: "listCombos", extractArgs: () => ({}) },
  { pattern: /qu[eé].*combo/i, tool: "listCombos", extractArgs: () => ({}) },

  // Create combo
  {
    pattern: /crea(?:te|r?)\s*(?:un\s*)?combo/i,
    tool: "createCombo",
    extractArgs: () => ({}),
  },

  // ── API Key tools ──
  { pattern: /list.*(?:api.?key|key)/i, tool: "listApiKeys", extractArgs: () => ({}) },
  { pattern: /show.*(?:api.?key|key)/i, tool: "listApiKeys", extractArgs: () => ({}) },
  {
    pattern: /crea(?:te|r?)\s*(?:un\s*)?(?:api.?)?key/i,
    tool: "createApiKey",
    extractArgs: () => ({}),
  },
  { pattern: /revoke|revocar|borrar.*key/i, tool: "revokeApiKey", extractArgs: () => ({}) },

  // ── Key Group tools ──
  { pattern: /list.*(?:group|grupo)/i, tool: "listKeyGroups", extractArgs: () => ({}) },
  { pattern: /show.*(?:group|grupo)/i, tool: "listKeyGroups", extractArgs: () => ({}) },

  // ── CodeGraph tools ──
  // Search symbols
  {
    pattern:
      /(?:busca|search|find|dónde está|where is)\s*(?:el\s*)?(?:símbolo|symbol|function|función|class|clase)?\s*[`"']?([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)[`"']?/i,
    tool: "searchCodeGraph",
    extractArgs: (m) => ({ query: m[1] }),
  },
  // Callers
  {
    pattern:
      /(?:qui[ée]n|who|what)\s*(?:llama|call|usa|use|referenc).*[`"']?([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)[`"']?/i,
    tool: "findCallers",
    extractArgs: (m) => ({ symbol: m[1] }),
  },
  // Callees
  {
    pattern:
      /(?:qué|what|que)\s*(?:llama|call|usa)\s*[`"']?([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)[`"']?/i,
    tool: "findCallees",
    extractArgs: (m) => ({ symbol: m[1] }),
  },
  // File context
  {
    pattern:
      /(?:contexto|context|símbolos|symbols|funciones|functions)\s*(?:de|in|del|en)\s*[`"']?([a-zA-Z0-9_/.-]+(?:\.\w+)?)[`"']?/i,
    tool: "getFileContext",
    extractArgs: (m) => ({ filePath: m[1] }),
  },
  // Files
  {
    pattern: /list.*(?:archivos|files|index)/i,
    tool: "listCodeGraphFiles",
    extractArgs: () => ({}),
  },
  { pattern: /codegraph.*(?:stats|stat|status)/i, tool: "codeGraphStats", extractArgs: () => ({}) },

  // ── CLI executor ──
  {
    pattern: /^(?:cli|terminal|ejecuta|run|exec)\s+(.+)/i,
    tool: "runOmniRouteCli",
    extractArgs: (m) => ({ command: m[1].trim() }),
  },

  // ── Health / status ──
  {
    pattern: /^(?:health|status|salud|estado)$/i,
    tool: "runOmniRouteCli",
    extractArgs: () => ({ command: "health" }),
  },

  // ── Help ──
  {
    pattern: /^(?:help|ayuda|que puedes hacer|qué puedes hacer|\?)$/i,
    tool: "help",
    extractArgs: () => ({}),
  },
];

function classifyIntent(text: string): { tool: string; args: Record<string, unknown> } | null {
  for (const intent of INTENT_PATTERNS) {
    const match = text.match(intent.pattern);
    if (match) {
      return { tool: intent.tool, args: intent.extractArgs(match) };
    }
  }
  return null;
}

// ── Help Response ────────────────────────────────────────────────────────────

function getHelpResponse(): string {
  return `## OmniRoute Copilot — Comandos disponibles

### Configuración
- "Lista los providers" → \`listProviders\`
- "Lista mis combos" → \`listCombos\`
- "Crea un combo..." → \`createCombo\` (te pediré detalles)
- "Lista las API keys" → \`listApiKeys\`
- "Crea una API key para desarrollo" → \`createApiKey\`
- "Revoca la key abc123" → \`revokeApiKey\`
- "Lista los grupos" → \`listKeyGroups\`

### CodeGraph (investigar el código)
- "Busca la función handleChatCore" → \`searchCodeGraph\`
- "Quién llama a sanitizeMessage?" → \`findCallers\`
- "Qué funciones hay en combo.ts?" → \`getFileContext\`
- "Lista los archivos indexados" → \`listCodeGraphFiles\`

### CLI
- "CLI health" → ejecuta \`omniroute health\`
- "CLI list-combos" → ejecuta \`omniroute list-combos\`
- "CLI set-budget 10" → ejecuta \`omniroute set-budget 10\`

### Conocimiento
- "Cómo funciona OmniRoute?" → explica la arquitectura
- "Qué son los combos?" → explica routing
- "Cómo debuggeo un error?" → troubleshooting

### Tools disponibles:\n\n${getCopilotToolDescriptions()}`;
}

// ── Chat Engine ──────────────────────────────────────────────────────────────

export async function processCopilotChat(request: CopilotRequest): Promise<CopilotResponse> {
  const lastMessage = request.messages[request.messages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    return { message: "No user message found." };
  }

  const userText = lastMessage.content.trim();
  if (!userText) {
    return { message: "Please provide a message." };
  }

  // Classify intent
  const intent = classifyIntent(userText);

  if (!intent) {
    // No tool match — check knowledge base
    const knowledge = getKnowledgeResponse(userText);
    if (knowledge) {
      return { message: knowledge };
    }
    // Fallback: respond with help
    return {
      message: `I understand you want help with OmniRoute.\n\n${getHelpResponse()}`,
    };
  }

  // Handle help separately
  if (intent.tool === "help") {
    return { message: getHelpResponse() };
  }

  // Handle tools that need more info from the user
  if (intent.tool === "createCombo" && !userText.includes("{") && !userText.includes("target")) {
    return {
      message: `Para crear un combo, necesito algunos detalles:

1. **Nombre** del combo (ej: "mi-combo-fallback")
2. **Estrategia** (priority, weighted, round-robin, cost-optimized, auto)
3. **Targets** — los proveedores/modelos en orden

Puedes decirme algo como:
> Crea un combo llamado "fallback-claude" con estrategia priority y targets: [{"provider":"claude-code","model":"claude-sonnet-4"},{"provider":"openai","model":"gpt-4o"}]`,
    };
  }

  // Handle createApiKey — extract name from sentence
  if (intent.tool === "createApiKey") {
    const nameMatch = userText.match(
      /(?:llamad[oa]|named?|par[ae]?)\s*["'']?([a-zA-Z0-9_-]+)["'']?/i
    );
    const name = nameMatch ? nameMatch[1] : "copilot-key";
    const scopeMatch = userText.match(/(?:con\s*)?scope?s?\s*:?\s*["'']?([a-zA-Z,]+)["'']?/i);
    const scopes = scopeMatch ? scopeMatch[1] : undefined;

    const tool = getCopilotTool("createApiKey");
    if (!tool) return { message: "Error: createApiKey tool not found." };

    const result = await tool.handler({
      name,
      machineId: "copilot",
      scopes,
    });

    return {
      message: result,
      toolCalls: [{ name: "createApiKey", args: { name, scopes }, result }],
    };
  }

  // Handle CLI executor — pass the full command
  if (intent.tool === "runOmniRouteCli") {
    const tool = getCopilotTool("runOmniRouteCli");
    if (!tool) return { message: "Error: CLI executor not found." };

    const result = await tool.handler(intent.args);
    return {
      message: result,
      toolCalls: [{ name: "runOmniRouteCli", args: intent.args, result }],
    };
  }

  // For all other tools, dispatch directly
  const tool = getCopilotTool(intent.tool);
  if (!tool)
    return {
      message: `I don't have a tool for that yet. Try asking in a different way.\n\n${getHelpResponse()}`,
    };

  const result = await tool.handler(intent.args);
  return {
    message: result,
    toolCalls: [{ name: intent.tool, args: intent.args, result }],
  };
}
