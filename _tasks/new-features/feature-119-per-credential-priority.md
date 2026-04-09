# Feature 119 — Per-Credential Priority

## Objetivo

Implementar um campo `priority` (numérico) em cada credencial/API key que determina a ordem de preferência quando múltiplas credenciais podem servir o mesmo modelo. Credenciais com prioridade mais alta são selecionadas primeiro.

## Motivação

Quando múltiplas credenciais (ex: 3 accounts Gemini) podem servir o mesmo modelo, o OmniRoute atualmente seleciona via round-robin ou aleatoriamente. Não há como indicar que:

- Credencial A tem quota ilimitada → deve ser usada preferencialmente
- Credencial B é backup → usar só quando A está com quota excedida
- Credencial C é de teste → usar só em último caso

O CLIProxyAPI resolve isso com um campo `priority` por key que influencia a seleção.

## O que Ganhamos

- **Controle de custo**: Credenciais gratuitas/ilimitadas são usadas antes das pagas
- **Fallback ordenado**: Backup credentials são usadas apenas quando necessário
- **Rate-limit distribution**: Spread inteligente baseado em capacidade
- **Testes isolados**: Credenciais de teste têm prioridade baixa

## Situação Atual (Antes)

```
Credencial A (Pro, ilimitada)  → weight: ?
Credencial B (Free, 60 RPM)   → weight: ?
Credencial C (Teste, 10 RPM)  → weight: ?

Round-robin: A → B → C → A → B → C
  → Credencial C esgota rápido ❌
  → Rate-limit em C afeta outros ❌
```

## Situação Proposta (Depois)

```
Credencial A (Pro, prioridade: 10)  → Usada PRIMEIRO
Credencial B (Free, prioridade: 5)  → Usada quando A esgota
Credencial C (Teste, prioridade: 1) → Usada SÓ como último recurso

Seleção: A → A → A → [quota] → B → B → [quota] → C
```

## Especificação Técnica

### Configuração

```json
// Na configuração de credenciais (providerConnections ou equivalente)
{
  "credentialId": "gemini-pro-account",
  "provider": "gemini-cli",
  "priority": 10,
  "apiKey": "..."
}
```

| Prioridade | Semântica                               |
| ---------- | --------------------------------------- |
| `10`       | Usar sempre que possível (principal)    |
| `5`        | Default / normal                        |
| `1`        | Backup / último recurso                 |
| `0`        | Desabilitado (não usar automaticamente) |

### Seleção com Prioridade

```javascript
// src/lib/routing/prioritySelector.js

/**
 * Select credential based on priority + availability.
 * Higher priority credentials are tried first.
 * Credentials with quota exceeded are skipped.
 */
export function selectCredentialByPriority(credentials, modelId, registry) {
  // Sort by priority DESC
  const sorted = [...credentials]
    .filter((c) => c.priority > 0) // priority 0 = desabilitado
    .sort((a, b) => (b.priority || 5) - (a.priority || 5));

  for (const credential of sorted) {
    // Verificar se esta credencial está com quota ok para este modelo
    const isExceeded = registry.isQuotaExceeded(credential.id, modelId);
    const isSuspended = registry.isSuspended(credential.id, modelId);

    if (!isExceeded && !isSuspended) {
      return credential;
    }
  }

  // Fallback: retornar primeira disponível mesmo com quota (pode ter expirado)
  return sorted[0] || null;
}
```

### Integração no Roteador

```javascript
// src/sse/handlers/chat.js — na seleção de credencial

const credential =
  routingStrategy === "priority"
    ? selectCredentialByPriority(availableCredentials, model, registry)
    : existingSelection(availableCredentials, model); // round-robin, random, etc.
```

### UI no Dashboard

```
┌─ Credencial: gemini-pro-account ─────────────┐
│ Provider: Gemini CLI                          │
│ Status: ✅ Ativo                               │
│ Priority: [━━━━━━━━━━░] 10                    │  ← Slider 0-10
│ Quota: 1,500 RPD / 1,234 usado                │
└───────────────────────────────────────────────┘
```

## Arquivos a Criar/Modificar

| Arquivo                               | Ação                                           |
| ------------------------------------- | ---------------------------------------------- |
| `src/lib/routing/prioritySelector.js` | **NOVO** — Seleção por prioridade              |
| `src/lib/localDb.js`                  | **MODIFICAR** — Schema com campo priority      |
| `src/sse/handlers/chat.js`            | **MODIFICAR** — Integrar priority na seleção   |
| Dashboard credentials page            | **MODIFICAR** — Adicionar slider de prioridade |

## Critérios de Aceite

- [ ] Credenciais com prioridade mais alta são selecionadas primeiro
- [ ] Prioridade 0 desabilita a credencial da seleção automática
- [ ] Credenciais com quota excedida são puladas para a próxima prioridade
- [ ] Default priority é 5 para credenciais sem valor definido
- [ ] Dashboard mostra e permite alterar prioridade
- [ ] Log indica qual prioridade foi usada na seleção

## Referência

- [CLIProxyAPI: config.example.yaml linhas 106-107](https://github.com/router-for-me/CLIProxyAPI) — per-key priority field
