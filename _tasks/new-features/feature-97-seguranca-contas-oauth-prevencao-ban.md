# Feature 85 — Segurança de Contas OAuth e Prevenção de Ban

**Fonte:** Análise do repositório `kaitranntt/ccs` — módulo `src/cliproxy/account-safety.ts`
**Prioridade:** 🔴 P0 — Prevenção de perda de conta
**Complexidade:** Alta (novo serviço + integração OAuth + persistência)

---

## Motivação

Quando um usuário configura **múltiplos providers Google** (Gemini, Antigravity, Codex) usando **a mesma conta Google**, existe um risco documentado de **ban permanente da conta**. O Google detecta uso simultâneo do mesmo token OAuth em diferentes serviços e interpreta como abuso.

O CCS implementa um sistema completo de segurança que:

1. **Detecta accounts duplicadas** entre providers Google no momento da inicialização
2. **Auto-pausa conflitos** — se `gemini@user@gmail.com` e `agy@user@gmail.com` são a mesma conta, um é pausado
3. **Restaura automaticamente** no encerramento da sessão
4. **Detecta padrões de ban** em mensagens de erro da API
5. **Persiste estado** para recuperação de crash

---

## O Que Ganhamos

1. **Prevenção de ban** — contas Google protegidas contra revogação por uso cruzado
2. **Detecção proativa** — aviso antes de ocorrer o ban, não depois
3. **Auto-healing** — accounts pausadas são restauradas quando a sessão termina
4. **Crash recovery** — se o processo morrer, na próxima inicialização restaura o estado
5. **Transparência** — dashboard mostra quais accounts estão pausadas e por quê

---

## Situação Atual (Antes)

```
Usuário configura:
  - Gemini: user@gmail.com (token A)
  - Antigravity: user@gmail.com (token B)
  - Codex: user@gmail.com (token C)

OmniRoute: usa todos simultaneamente
                    ↓
Google detecta: "3 tokens diferentes, mesma conta, 3 serviços diferentes"
                    ↓
❌ CONTA BANIDA — tokens revogados permanentemente
```

**Problema:** Não existe nenhum aviso ou prevenção. A perda da conta é silenciosa e irreversível.

---

## Situação Desejada (Depois)

```
Usuário configura:
  - Gemini: user@gmail.com (token A)
  - Antigravity: user@gmail.com (token B)
  - Codex: user@gmail.com (token C)

OmniRoute [AccountSafety]:
  Detecta: "user@gmail.com usada em 3 providers Google"
  Auto-pausa: Antigravity (token B) e Codex (token C)
  Mantém: Gemini (token A) — provider primário

  ⚠️ Warning no dashboard: "Conta user@gmail.com detectada em múltiplos
  providers Google. Antigravity e Codex pausados para proteção."

  💡 Recomendação: "Use contas Google diferentes para cada provider."
                    ↓
✅ Conta protegida — apenas 1 token ativo por vez
```

---

## Implementação Detalhada

### 1. Serviço Principal: `src/lib/accountSafety.js`

```javascript
import { getDbInstance } from "./db/core.js";
import { logger } from "./logger.js";

const GOOGLE_PROVIDERS = new Set(["gemini", "gemini-cli", "antigravity", "codex"]);
const SAFETY_NAMESPACE = "accountSafety";

/**
 * Detecta accounts Google duplicadas entre providers
 * @param {Array<{providerId: string, email: string, tokenHash: string}>} accounts
 * @returns {{ conflicts: Array, recommendations: Array }}
 */
export function detectCrossProviderConflicts(accounts) {
  // Agrupar por email (apenas providers Google)
  const googleAccounts = accounts.filter((a) => GOOGLE_PROVIDERS.has(a.providerId));
  const byEmail = new Map();

  for (const account of googleAccounts) {
    if (!byEmail.has(account.email)) {
      byEmail.set(account.email, []);
    }
    byEmail.get(account.email).push(account);
  }

  const conflicts = [];
  const recommendations = [];

  for (const [email, providers] of byEmail) {
    if (providers.length > 1) {
      conflicts.push({
        email,
        providers: providers.map((p) => p.providerId),
        severity: providers.length >= 3 ? "critical" : "warning",
        message: `Account ${maskEmail(email)} is used in ${providers.length} Google providers: ${providers.map((p) => p.providerId).join(", ")}`,
      });

      // Recomendar manter o primeiro, pausar os outros
      const [primary, ...secondary] = providers;
      recommendations.push({
        keep: primary.providerId,
        pause: secondary.map((p) => p.providerId),
        reason: `Keep ${primary.providerId} active, pause ${secondary.map((p) => p.providerId).join(", ")} to prevent Google ban.`,
      });
    }
  }

  return { conflicts, recommendations };
}

/**
 * Detecta padrões de ban em mensagens de erro da API
 */
export function detectBanPattern(errorMessage, statusCode) {
  const BAN_PATTERNS = [
    /account.*suspended/i,
    /access.*revoked/i,
    /token.*invalid.*permanently/i,
    /forbidden.*abuse/i,
    /quota.*permanently.*exceeded/i,
    /account.*disabled/i,
    /authorization.*failed.*contact.*support/i,
  ];

  if (statusCode === 403 || statusCode === 401) {
    for (const pattern of BAN_PATTERNS) {
      if (pattern.test(errorMessage)) {
        return {
          isBan: true,
          pattern: pattern.source,
          message: errorMessage,
        };
      }
    }
  }

  return { isBan: false };
}

/**
 * Registra account como potencialmente banida
 */
export async function markAsBanned(providerId, email, reason) {
  const db = getDbInstance();
  const data = JSON.stringify({
    providerId,
    email: maskEmail(email),
    reason,
    detectedAt: new Date().toISOString(),
    autoPaused: true,
  });

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    SAFETY_NAMESPACE,
    `banned:${providerId}`,
    data
  );

  logger.error(
    `[account-safety] Account ${maskEmail(email)} on ${providerId} appears BANNED. Reason: ${reason}`
  );
}

/**
 * Registra auto-pause com recuperação de crash
 */
export async function recordAutoPause(providerId, email, reason) {
  const db = getDbInstance();
  const data = JSON.stringify({
    providerId,
    email: maskEmail(email),
    reason,
    pausedAt: new Date().toISOString(),
    pid: process.pid,
    shouldRestore: true,
  });

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    SAFETY_NAMESPACE,
    `paused:${providerId}`,
    data
  );
}

/**
 * Restaurar accounts auto-pausadas (chamado no encerramento)
 */
export async function restoreAutoPaused() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? AND key LIKE 'paused:%'")
    .all(SAFETY_NAMESPACE);

  for (const row of rows) {
    const data = JSON.parse(row.value);
    if (data.shouldRestore) {
      logger.info(`[account-safety] Restoring auto-paused account: ${data.providerId}`);
      db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
        SAFETY_NAMESPACE,
        row.key
      );
    }
  }
}

/**
 * Recuperação de crash — restaura pausas de sessões anteriores
 */
export async function crashRecovery() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? AND key LIKE 'paused:%'")
    .all(SAFETY_NAMESPACE);

  for (const row of rows) {
    const data = JSON.parse(row.value);
    // Verificar se o PID que pausou ainda está vivo
    if (data.pid && !isProcessAlive(data.pid)) {
      logger.warn(
        `[account-safety] Crash recovery: restoring ${data.providerId} (PID ${data.pid} no longer running)`
      );
      db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
        SAFETY_NAMESPACE,
        row.key
      );
    }
  }
}

/**
 * Estado atual para dashboard
 */
export async function getAccountSafetyStatus() {
  const db = getDbInstance();
  const paused = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? AND key LIKE 'paused:%'")
    .all(SAFETY_NAMESPACE);
  const banned = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? AND key LIKE 'banned:%'")
    .all(SAFETY_NAMESPACE);

  return {
    pausedAccounts: paused.map((r) => JSON.parse(r.value)),
    bannedAccounts: banned.map((r) => JSON.parse(r.value)),
  };
}

// Helpers
function maskEmail(email) {
  if (!email) return "***";
  const [user, domain] = email.split("@");
  if (!domain) return "***";
  return `${user.slice(0, 2)}***@${domain}`;
}

function isProcessAlive(pid) {
  try {
    process.kill(pid, 0); // Signal 0 = check existence
    return true;
  } catch {
    return false;
  }
}
```

### 2. Integração no Proxy Handler

```javascript
// No handler de chat, após receber erro:
import { detectBanPattern, markAsBanned } from "@/lib/accountSafety";

// Quando provider retorna erro:
if (error.status === 403 || error.status === 401) {
  const banCheck = detectBanPattern(error.message, error.status);
  if (banCheck.isBan) {
    await markAsBanned(providerId, accountEmail, banCheck.message);
    // Desativar credential automaticamente
    await pauseCredential(credentialId);
  }
}
```

### 3. Endpoint de Dashboard

```javascript
// GET /api/accounts/safety
export async function GET() {
  const { getAccountSafetyStatus, detectCrossProviderConflicts } =
    await import("@/lib/accountSafety");

  const status = await getAccountSafetyStatus();
  // Também checar conflitos atuais
  const accounts = await getConfiguredGoogleAccounts();
  const conflicts = detectCrossProviderConflicts(accounts);

  return Response.json({ ...status, ...conflicts });
}
```

### 4. Widget de Dashboard

Mostrar um banner de warning no topo do dashboard quando conflitos são detectados:

```
⚠️ Account Safety Warning
Account us***@gmail.com está configurada em 3 providers Google (gemini, antigravity, codex).
Recomendação: Use contas diferentes para evitar ban.
[Pausar Conflitos Automaticamente] [Ignorar]
```

---

## Arquivos a Criar/Modificar

| Ação          | Arquivo                                                       | Descrição                         |
| ------------- | ------------------------------------------------------------- | --------------------------------- |
| **CRIAR**     | `src/lib/accountSafety.js`                                    | Serviço principal de segurança    |
| **MODIFICAR** | `src/sse/handlers/chat.js`                                    | Integrar detecção de ban em erros |
| **CRIAR**     | `src/app/api/accounts/safety/route.js`                        | Endpoint de dashboard             |
| **CRIAR**     | `app/(dashboard)/dashboard/components/AccountSafetyBanner.js` | Widget UI                         |
| **CRIAR**     | `tests/unit/account-safety.test.mjs`                          | Testes unitários                  |

---

## Testes Necessários

1. Uma conta em 1 provider → sem conflito
2. Mesma conta em 2 providers Google → conflito `warning`
3. Mesma conta em 3+ providers Google → conflito `critical`
4. Erro 403 com "account suspended" → detectado como ban
5. Erro 403 com "rate limited" → NÃO detectado como ban (rate limit normal)
6. Auto-pause + restore → account pausada e restaurada corretamente
7. Crash recovery → PID morto → auto-restore
8. `maskEmail("user@gmail.com")` → `"us***@gmail.com"`

---

## Referência do CCS

- [account-safety.ts](file:///home/diegosouzapw/dev/proxys/9router/.tmp_ccsue_analysis/src/cliproxy/account-safety.ts) — 472 linhas, sistema completo
- Pattern: `findCrossProviderDuplicates()` → `autoPause()` → `scheduleRestore()` → `crashRecovery()`
- CCS Issue #509 — documentação do problema de ban por uso cruzado
