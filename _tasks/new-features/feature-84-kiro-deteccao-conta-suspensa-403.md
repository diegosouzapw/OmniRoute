# Feature 81 — Detecção de Conta Kiro Suspensa via Status 403

**Origem:** Análise do repositório [zero-limit](https://github.com/0xtbug/zero-limit) — `src/services/api/quota.service.ts` (linhas 137-145)  
**Prioridade:** 🟡 Média  
**Impacto:** Tratamento correto de contas Kiro suspensas, evitando retries inúteis

---

## Motivação

Quando uma conta Kiro (CodeWhisperer) é suspensa pela AWS, a API retorna HTTP 403 com um campo `reason` no body. Atualmente, o OmniRoute pode interpretar esse 403 como um erro genérico de autenticação e continuar tentando usar a conta, desperdiçando retry attempts e degradando a latência.

O zero-limit implementa detecção específica para esse cenário, marcando a conta como "Suspended" com feedback claro ao usuário.

---

## O que Ganhamos

1. **Sem retries inúteis**: Conta suspensa é removida do pool de roteamento automaticamente
2. **Feedback claro**: O dashboard mostra "Suspended" com o motivo específico da suspensão
3. **Roteamento inteligente**: O selector de contas pula contas suspensas sem latência adicional
4. **Detecção do motivo**: O campo `reason` dá contexto (Ex: `ABUSE_DETECTED`, `PAYMENT_ISSUE`)

---

## ANTES (Situação Atual)

```javascript
// O 403 do Kiro é tratado como erro genérico de autenticação
// O accountSelector pode continuar tentando a conta suspensa
// Resultado: timeouts desnecessários e falha silenciosa
```

---

## DEPOIS (Implementação Proposta)

### 1. Adicionar detecção no fetcher de usage Kiro

```javascript
// src/lib/usage/fetcher.js (no handler de resposta do Kiro)

async function fetchKiroUsage(connection, token) {
  const KIRO_URL =
    "https://codewhisperer.us-east-1.amazonaws.com/getUsageLimits" +
    "?isEmailRequired=true&origin=AI_EDITOR&resourceType=AGENTIC_REQUEST";

  const response = await fetch(KIRO_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "aws-sdk-js/3.0.0 KiroIDE-0.1.0 os/windows lang/js md/nodejs/18.0.0",
      "x-amz-user-agent": "aws-sdk-js/3.0.0",
    },
  });

  // *** NOVO: Detecção de conta suspensa ***
  if (response.status === 403) {
    const body = await response.json().catch(() => ({}));
    const rawReason = body.reason || "";
    // Formatar: ABUSE_DETECTED -> Abuse detected
    const reason =
      rawReason
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase()) || "Suspended";

    return {
      status: "suspended",
      reason,
      models: [{ name: "Kiro", percentage: 100, displayValue: reason }],
      plan: "Suspended",
    };
  }

  if (!response.ok) {
    throw new Error(`Kiro API error: ${response.status}`);
  }

  const data = await response.json();
  return parseKiroQuota(data);
}
```

### 2. Propagar status de suspensão para o accountSelector

```javascript
// src/lib/accountSelector.js (no fluxo de seleção)

function isAccountAvailable(account) {
  // Adicionar verificação de suspensão
  if (account.quotaStatus === "suspended") {
    return false; // Pular conta suspensa
  }
  // ... verificações existentes
}
```

### 3. Exibir no dashboard

```javascript
// src/app/(dashboard)/dashboard/usage/components/ProviderLimits/ProviderLimitCard.js
// Renderizar badge "Suspended" com motivo quando quotaStatus === 'suspended'
// Cor: vermelho/warning, com tooltip mostrando o campo reason
```

---

## Arquivos Afetados

| Arquivo                                                          | Ação                                           |
| ---------------------------------------------------------------- | ---------------------------------------------- |
| `src/lib/usage/fetcher.js`                                       | Detectar 403 como suspensão, extrair `reason`  |
| `src/lib/accountSelector.js`                                     | Pular contas com `quotaStatus === 'suspended'` |
| `src/app/(dashboard)/dashboard/usage/components/ProviderLimits/` | Badge visual de suspensão                      |
| `src/shared/constants/providers.js`                              | Constante `KIRO_USAGE_URL` atualizada          |

---

## Valores Possíveis de `reason`

| Valor              | Significado                                   |
| ------------------ | --------------------------------------------- |
| `ABUSE_DETECTED`   | Uso abusivo detectado                         |
| `PAYMENT_ISSUE`    | Problema de pagamento                         |
| `ACCOUNT_DISABLED` | Conta desativada pelo admin                   |
| `POLICY_VIOLATION` | Violação de política de uso                   |
| (vazio)            | Motivo não especificado → mostrar "Suspended" |

---

## Referência Direta

- Arquivo original: `zero-limit/src/services/api/quota.service.ts` — `fetchKiro()` linhas 137-145
- Pattern: Status 403 → extrair `body.reason` → formatar → retornar como `plan: 'Suspended'`
