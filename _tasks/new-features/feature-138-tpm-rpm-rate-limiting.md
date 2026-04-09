# Feature 138 — TPM/RPM Rate Limiting por Deployment

## Resumo

Implementar contadores de Tokens Per Minute (TPM) e Requests Per Minute (RPM) por deployment/conta de provider, com enforcement de limites configuráveis. Quando um deployment atinge o limite, requisições são automaticamente roteadas para o próximo disponível.

## Motivação

O LiteLLM em `router_strategy/lowest_tpm_rpm_v2.py` (750 linhas) rastreia TPM e RPM por deployment em tempo real, rejeitando ou re-roteando requisições quando os limites são atingidos. Isso previne erros 429 do upstream e distribui carga de forma inteligente. O OmniRoute não rastreia TPM/RPM e depende de 429s do upstream para reagir.

## O que ganhamos

- **Prevenção de 429s**: Rate limits detectados antes de enviar ao upstream
- **Distribuição de carga**: Tráfego migra para deployments com capacidade livre
- **Compliance com limites**: Provedores com limites rigorosos não são violados
- **Transparência**: Dashboard mostra consumo TPM/RPM em tempo real

## Situação Atual (Antes)

```
Deployment openai-01 → limite real: 100k TPM
  → OmniRoute envia 120k tokens/min
  → 429 do OpenAI → retry → mais 429s
  → Latência aumenta, erros em cascata
  → Sem visibilidade do consumo
```

## Situação Proposta (Depois)

```
Deployment openai-01 → limite configurado: 90k TPM, 500 RPM
  → Consumo atual: 85k TPM, 480 RPM
  → Próxima requisição com ~8k tokens estimados
  → 85k + 8k = 93k > 90k → re-roteia para openai-02
  → Zero 429s, experiência fluida
  → Dashboard: "openai-01: 85k/90k TPM (94%), openai-02: 12k/90k TPM (13%)"
```

## Especificação Técnica

### Rate Counter por Minuto

```javascript
// src/domain/rateCounter.js

const WINDOW_SIZE_MS = 60_000; // 1 minuto

class RateCounter {
  constructor() {
    this.counters = new Map(); // deploymentId -> { buckets: [{timestamp, tokens, requests}] }
  }

  /**
   * Registrar uso de tokens/requests.
   */
  record(deploymentId, tokens = 0, requests = 1) {
    const entry = this._getOrCreate(deploymentId);
    entry.buckets.push({ timestamp: Date.now(), tokens, requests });
    this._cleanup(entry);
  }

  /**
   * Obter uso atual no último minuto.
   */
  getCurrentUsage(deploymentId) {
    const entry = this.counters.get(deploymentId);
    if (!entry) return { tpm: 0, rpm: 0 };

    this._cleanup(entry);
    const tpm = entry.buckets.reduce((sum, b) => sum + b.tokens, 0);
    const rpm = entry.buckets.reduce((sum, b) => sum + b.requests, 0);
    return { tpm, rpm };
  }

  /**
   * Verificar se um deployment pode aceitar mais tráfego.
   */
  canAccept(deploymentId, estimatedTokens, limits) {
    const { tpm, rpm } = this.getCurrentUsage(deploymentId);

    if (limits.tpm && tpm + estimatedTokens > limits.tpm) {
      return { allowed: false, reason: `TPM limit: ${tpm + estimatedTokens}/${limits.tpm}` };
    }
    if (limits.rpm && rpm + 1 > limits.rpm) {
      return { allowed: false, reason: `RPM limit: ${rpm + 1}/${limits.rpm}` };
    }
    return { allowed: true };
  }

  /**
   * Filtrar deployments que têm capacity disponível.
   */
  getAvailableDeployments(deployments, estimatedTokens) {
    return deployments.filter((d) => {
      const limits = d.rateLimits || {};
      if (!limits.tpm && !limits.rpm) return true; // Sem limites configurados
      return this.canAccept(d.id, estimatedTokens, limits).allowed;
    });
  }

  _getOrCreate(id) {
    if (!this.counters.has(id)) {
      this.counters.set(id, { buckets: [] });
    }
    return this.counters.get(id);
  }

  _cleanup(entry) {
    const cutoff = Date.now() - WINDOW_SIZE_MS;
    entry.buckets = entry.buckets.filter((b) => b.timestamp > cutoff);
  }
}

export const rateCounter = new RateCounter();
```

### Configuração de Limites por Provider Connection

```javascript
// No schema de provider connection (SQLite), adicionar:
// rate_limits TEXT (JSON)
// Ex: {"tpm": 90000, "rpm": 500}
```

### Integração com comboResolver.js

```javascript
// Em resolveComboModel, filtrar antes de aplicar estratégia
import { rateCounter } from "./rateCounter.js";

const estimatedTokens = estimateTokenCount(messages); // Estimativa rápida
const availableModels = rateCounter.getAvailableDeployments(normalized, estimatedTokens);

if (availableModels.length === 0) {
  // Todos os deployments no limite → usar o com menor uso relativo
  const leastUsed = getDeploymentWithLowestUsageRatio(normalized);
  return leastUsed;
}

// Continuar com estratégia normal usando apenas availableModels
```

## Arquivos a Criar/Modificar

| Arquivo                          | Ação                                                  |
| -------------------------------- | ----------------------------------------------------- |
| `src/domain/rateCounter.js`      | **NOVO** — Contadores TPM/RPM por deployment          |
| `src/domain/comboResolver.js`    | **MODIFICAR** — Filtrar por capacity antes de routing |
| `src/sse/handlers/chat.js`       | **MODIFICAR** — Record usage após resposta            |
| `src/lib/db/providers.js`        | **MODIFICAR** — Adicionar rateLimits ao schema        |
| `src/app/api/providers/route.js` | **MODIFICAR** — CRUD de rate limits                   |

## Critérios de Aceite

- [ ] TPM e RPM rastreados por deployment em sliding window de 1 minuto
- [ ] Requisições re-roteadas quando deployment atinge limite
- [ ] Se todos os deployments no limite → usar o com menor uso relativo (não bloquear)
- [ ] Dashboard exibe TPM/RPM atual vs limite por deployment
- [ ] Estimativa de tokens baseada em character count (~4 chars/token)
- [ ] Limites configuráveis via API por provider connection

## Referência

- [LiteLLM: router_strategy/lowest_tpm_rpm_v2.py](https://github.com/BerriAI/litellm/blob/main/litellm/router_strategy/lowest_tpm_rpm_v2.py) — 750 linhas
- [LiteLLM: router_strategy/lowest_tpm_rpm.py](https://github.com/BerriAI/litellm/blob/main/litellm/router_strategy/lowest_tpm_rpm.py) — versão v1 simplificada
