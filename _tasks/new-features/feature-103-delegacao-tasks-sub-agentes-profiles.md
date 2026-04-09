# Feature 87 — Delegação de Tasks a Sub-Agentes (Profile Routing)

**Fonte:** Análise do repositório `kaitranntt/ccs` — módulo `src/delegation/delegation-handler.ts` e `headless-executor.ts`
**Prioridade:** 🟢 P3 — Feature avançada para power users
**Complexidade:** Alta (novo subsistema completo)

---

## Motivação

O CCS implementa um sistema de **delegação** onde um agente "mestre" pode enviar sub-tasks para serem executadas por diferentes providers/modelos de forma headless (sem interação do usuário). Exemplos:

- "Use Claude Opus para analisar este código, depois use GPT-5 Codex para implementar"
- "Use Gemini para buscar informações, depois Opus para sintetizar"

Isso é feito via profiles que definem qual provider, modelo, e configurações usar para cada tipo de task.

No contexto do OmniRoute, uma adaptação desse conceito seria um **sistema de sub-routing** onde uma request pode ser decomposta e enviada para diferentes providers baseado em regras.

---

## O Que Ganhamos

1. **Routing inteligente por tipo de tarefa** — análise usa um modelo, implementação usa outro
2. **Fallback com retry semântico** — se o modelo de implementação falhar, tenta com modelo de análise
3. **Session continuity** — retomar tarefas pausadas com `--resume`
4. **Configuração por perfil** — cada "perfil" tem provider, modelo, timeout, e permissions próprias
5. **Saída estruturada** — resultados formatados em JSON para consumo por pipelines

---

## Situação Atual (Antes)

```
OmniRoute: recebe request → envia para provider configurado no combo
                    ↓
Se combo tem 3 providers: tenta todos na ordem
                    ↓
Comportamento: todos recebem o MESMO tipo de request
```

**Limitação:** Não há distinção entre tipos de tarefa. Um modelo especializado em raciocínio recebe a mesma request que um modelo rápido para respostas curtas.

---

## Situação Desejada (Depois)

```
OmniRoute: recebe request → analisa tipo de tarefa
                    ↓
Tipo "reasoning_heavy": → Route para Claude Opus 4.6 (thinking)
Tipo "code_generation": → Route para GPT-5.3 Codex (xhigh effort)
Tipo "quick_answer":    → Route para Gemini 3 Flash (rápido)
Tipo "web_search":      → Route para Perplexity (busca)
                    ↓
Configuração via "profiles" no dashboard ou config
```

---

## Implementação Detalhada

### 1. Definição de Profiles: `src/lib/delegationProfiles.js`

```javascript
import { getDbInstance } from "./db/core.js";

const PROFILE_NAMESPACE = "delegationProfiles";

/**
 * Profile format:
 * {
 *   name: "reasoning",
 *   providerId: "claude",
 *   modelId: "claude-opus-4-6",
 *   timeout: 120000,
 *   thinkingBudget: 128000,
 *   maxRetries: 2,
 *   description: "For complex reasoning tasks",
 *   triggers: {
 *     keywords: ["analyze", "reason", "think", "explain why"],
 *     tokenThreshold: 2000,  // Se input > 2000 tokens
 *   }
 * }
 */

export async function getProfile(name) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(PROFILE_NAMESPACE, name);
  return row ? JSON.parse(row.value) : null;
}

export async function getAllProfiles() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(PROFILE_NAMESPACE);
  return rows.map((r) => ({ name: r.key, ...JSON.parse(r.value) }));
}

export async function saveProfile(name, profile) {
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    PROFILE_NAMESPACE,
    name,
    JSON.stringify(profile)
  );
}

export async function deleteProfile(name) {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(PROFILE_NAMESPACE, name);
}

/**
 * Match request contra profiles configurados
 * @returns {Object|null} Profile que melhor se aplica, ou null
 */
export async function matchProfile(body) {
  const profiles = await getAllProfiles();
  if (profiles.length === 0) return null;

  const userMessage = extractUserMessage(body);
  if (!userMessage) return null;

  // Scoring por keywords
  for (const profile of profiles) {
    if (!profile.triggers?.keywords) continue;

    const messageLC = userMessage.toLowerCase();
    const matchCount = profile.triggers.keywords.filter((kw) =>
      messageLC.includes(kw.toLowerCase())
    ).length;

    if (matchCount > 0) {
      return profile;
    }
  }

  // Scoring por token threshold
  const estimatedTokens = Math.ceil(userMessage.length / 4);
  for (const profile of profiles) {
    if (profile.triggers?.tokenThreshold && estimatedTokens > profile.triggers.tokenThreshold) {
      return profile;
    }
  }

  return null; // Nenhum match
}

function extractUserMessage(body) {
  const messages = body.messages || [];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return null;

  if (typeof lastUser.content === "string") return lastUser.content;
  if (Array.isArray(lastUser.content)) {
    return lastUser.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join(" ");
  }
  return null;
}
```

### 2. Profiles Pré-Configurados (Seeds)

```javascript
export const DEFAULT_PROFILES = [
  {
    name: "reasoning",
    providerId: "claude",
    modelId: "claude-opus-4-6",
    timeout: 120000,
    thinkingBudget: 64000,
    maxRetries: 2,
    description: "Complex reasoning and analysis tasks",
    triggers: {
      keywords: ["analyze", "explain why", "reason about", "think through", "compare"],
      tokenThreshold: 3000,
    },
  },
  {
    name: "fast-code",
    providerId: "codex",
    modelId: "gpt-5.3-codex",
    timeout: 60000,
    reasoningEffort: "high",
    maxRetries: 1,
    description: "Fast code generation",
    triggers: {
      keywords: ["implement", "write code", "create function", "fix bug", "refactor"],
    },
  },
  {
    name: "quick-answer",
    providerId: "gemini",
    modelId: "gemini-3-flash",
    timeout: 30000,
    maxRetries: 3,
    description: "Quick factual answers",
    triggers: {
      keywords: ["what is", "how to", "list", "define"],
    },
  },
];
```

### 3. Integração no Router (Opcional)

```javascript
// Em src/sse/handlers/chat.js:
import { matchProfile } from "@/lib/delegationProfiles";

// Após parse do body, antes do routing:
const matchedProfile = await matchProfile(body);
if (matchedProfile) {
  logger.info(
    `[delegation] Matched profile "${matchedProfile.name}" → ${matchedProfile.providerId}/${matchedProfile.modelId}`
  );
  // Override o provider/model para esta request
  targetProvider = matchedProfile.providerId;
  targetModel = matchedProfile.modelId;

  if (matchedProfile.thinkingBudget) {
    body.thinking = { budget_tokens: matchedProfile.thinkingBudget };
  }
  if (matchedProfile.reasoningEffort) {
    body.reasoning = { effort: matchedProfile.reasoningEffort };
  }
}
```

### 4. Endpoints de Dashboard

```javascript
// GET /api/delegation/profiles
// POST /api/delegation/profiles
// DELETE /api/delegation/profiles/:name
```

---

## Diferença em Relação ao CCS

| Aspecto  | CCS                              | OmniRoute (proposto)            |
| -------- | -------------------------------- | ------------------------------- |
| Execução | CLI headless (child process)     | HTTP routing (inline)           |
| Profiles | `~/.ccs/{profile}.settings.json` | SQLite `key_value` table        |
| Trigger  | Manual (`ccs glm -p "task"`)     | Automático por keyword matching |
| Session  | File-based session tracking      | Stateless (request-based)       |
| Output   | Stream JSON formatado            | SSE streaming padrão            |

---

## Arquivos a Criar/Modificar

| Ação          | Arquivo                                    | Descrição                      |
| ------------- | ------------------------------------------ | ------------------------------ |
| **CRIAR**     | `src/lib/delegationProfiles.js`            | Serviço de profiles            |
| **MODIFICAR** | `src/sse/handlers/chat.js`                 | Integração de profile matching |
| **CRIAR**     | `src/app/api/delegation/profiles/route.js` | CRUD de profiles               |
| **CRIAR**     | `tests/unit/delegation-profiles.test.mjs`  | Testes unitários               |

---

## Testes Necessários

1. Request com keyword "analyze" → matched to "reasoning" profile
2. Request com keyword "implement" → matched to "fast-code" profile
3. Request sem keywords → no profile match (usa routing normal)
4. Profile CRUD → criar, listar, atualizar, deletar
5. Token threshold → request longa matched to "reasoning"
6. Multiple keyword matches → primeiro profile que matcha vence

---

## Referência do CCS

- [delegation-handler.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/delegation/delegation-handler.ts) — 339 linhas, handler principal
- [headless-executor.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/delegation/headless-executor.ts) — 14050 linhas, execução headless
- [session-manager.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/delegation/session-manager.ts) — tracking de sessões
- [result-formatter.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/delegation/result-formatter.ts) — formatação de output
