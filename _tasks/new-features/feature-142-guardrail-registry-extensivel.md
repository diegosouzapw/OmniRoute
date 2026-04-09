# Feature 142 — Guardrail Registry Extensível

## Resumo

Criar um sistema de guardrails plugável com hooks pré/pós requisição que permite registrar validações customizáveis: PII masking, content moderation, prompt injection avançado, output validation, e custom business rules. Cada guardrail é um plugin independente com interface padronizada.

## Motivação

O LiteLLM em `litellm/proxy/guardrails/` implementa um `GuardrailRegistry` com hooks `pre_call`, `during_call` e `post_call` que permitem interceptar e modificar requisições em vários estágios. O OmniRoute tem `promptInjectionGuard.js` como middleware fixo, mas sem sistema extensível de guardrails. Não há como adicionar validações custom sem modificar o código core.

## O que ganhamos

- **Extensibilidade**: Novos guardrails sem tocar no código core
- **Composição**: Múltiplos guardrails executam em pipeline
- **Configuração per-key**: Keys diferentes podem ter guardrails diferentes
- **Observabilidade**: Logs de quais guardrails executaram e o que fizeram
- **Enterprise**: PII masking, content moderation são requisitos enterprise

## Situação Atual (Antes)

```
Pipeline atual:
  Request → promptInjectionGuard (fixo) → upstream → response

Limitações:
  - Um único guardrail hardcoded
  - Sem hooks pós-resposta
  - Sem PII detection
  - Sem content moderation
  - Sem forma de adicionar validações custom
```

## Situação Proposta (Depois)

```
Pipeline novo:
  Request
    → [GuardrailRegistry.preCall]
      → PromptInjectionGuard.preCall()
      → PIIMasker.preCall()              ← mascarar CPF, email, etc.
      → ContentModerator.preCall()       ← bloquear conteúdo proibido
      → CustomBusinessRule.preCall()     ← regras de negócio
    → upstream
    → response
    → [GuardrailRegistry.postCall]
      → PIIMasker.postCall()             ← re-mascarar na resposta
      → OutputValidator.postCall()       ← validar schema da resposta
      → ContentModerator.postCall()      ← verificar outputs

Cada guardrail é um módulo independente com enable/disable por key
```

## Especificação Técnica

### Interface de Guardrail

```javascript
// src/lib/guardrails/base.js

/**
 * Interface base para guardrails.
 * Todos os guardrails devem estender esta classe.
 */
export class BaseGuardrail {
  constructor(name, options = {}) {
    this.name = name;
    this.enabled = options.enabled !== false;
    this.priority = options.priority || 100; // Lower = executa primeiro
  }

  /**
   * Executado ANTES de enviar ao upstream.
   * Pode modificar o payload ou rejeitar a requisição.
   * @returns {{ block: boolean, modifiedPayload?: object, message?: string }}
   */
  async preCall(payload, context) {
    return { block: false };
  }

  /**
   * Executado APÓS receber resposta do upstream.
   * Pode modificar ou filtrar a resposta.
   * @returns {{ block: boolean, modifiedResponse?: object, message?: string }}
   */
  async postCall(response, context) {
    return { block: false };
  }
}
```

### Guardrail Registry

```javascript
// src/lib/guardrails/registry.js

import { BaseGuardrail } from "./base.js";

class GuardrailRegistry {
  constructor() {
    this.guardrails = []; // Sorted by priority
  }

  register(guardrail) {
    if (!(guardrail instanceof BaseGuardrail)) {
      throw new Error("Guardrail must extend BaseGuardrail");
    }
    this.guardrails.push(guardrail);
    this.guardrails.sort((a, b) => a.priority - b.priority);
  }

  async runPreCallHooks(payload, context) {
    const results = [];
    let currentPayload = { ...payload };

    for (const g of this.guardrails) {
      if (!g.enabled) continue;
      if (context.disabledGuardrails?.includes(g.name)) continue;

      const result = await g.preCall(currentPayload, context);
      results.push({ guardrail: g.name, result });

      if (result.block) {
        return { blocked: true, guardrail: g.name, message: result.message, results };
      }
      if (result.modifiedPayload) {
        currentPayload = result.modifiedPayload;
      }
    }

    return { blocked: false, payload: currentPayload, results };
  }

  async runPostCallHooks(response, context) {
    let currentResponse = response;

    for (const g of this.guardrails) {
      if (!g.enabled) continue;
      const result = await g.postCall(currentResponse, context);
      if (result.block) {
        return { blocked: true, guardrail: g.name, message: result.message };
      }
      if (result.modifiedResponse) {
        currentResponse = result.modifiedResponse;
      }
    }

    return { blocked: false, response: currentResponse };
  }
}

export const guardrailRegistry = new GuardrailRegistry();
```

### Exemplo: PII Masker Guardrail

```javascript
// src/lib/guardrails/piiMasker.js

import { BaseGuardrail } from "./base.js";

const PII_PATTERNS = [
  { name: "cpf", regex: /\d{3}\.\d{3}\.\d{3}-\d{2}/g, mask: "***.***.***-**" },
  { name: "email", regex: /[\w.-]+@[\w.-]+\.\w+/g, mask: "****@****.***" },
  { name: "phone_br", regex: /\(\d{2}\)\s?\d{4,5}-\d{4}/g, mask: "(**) *****-****" },
  {
    name: "credit_card",
    regex: /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/g,
    mask: "**** **** **** ****",
  },
];

export class PIIMaskerGuardrail extends BaseGuardrail {
  constructor() {
    super("pii-masker", { priority: 10 }); // Executa cedo
  }

  async preCall(payload, context) {
    const masked = { ...payload };
    let detected = false;

    if (masked.messages) {
      masked.messages = masked.messages.map((msg) => {
        if (typeof msg.content === "string") {
          let content = msg.content;
          for (const pattern of PII_PATTERNS) {
            if (pattern.regex.test(content)) {
              content = content.replace(pattern.regex, pattern.mask);
              detected = true;
            }
          }
          return { ...msg, content };
        }
        return msg;
      });
    }

    return {
      block: false,
      modifiedPayload: detected ? masked : undefined,
    };
  }
}
```

### Registro na Inicialização

```javascript
// src/server-init.js
import { guardrailRegistry } from "./lib/guardrails/registry.js";
import { PIIMaskerGuardrail } from "./lib/guardrails/piiMasker.js";
import { PromptInjectionGuardrail } from "./lib/guardrails/promptInjection.js";

// Registrar guardrails
guardrailRegistry.register(new PIIMaskerGuardrail());
guardrailRegistry.register(new PromptInjectionGuardrail());
```

## Arquivos a Criar/Modificar

| Arquivo                                  | Ação                                       |
| ---------------------------------------- | ------------------------------------------ |
| `src/lib/guardrails/base.js`             | **NOVO** — Interface base de guardrail     |
| `src/lib/guardrails/registry.js`         | **NOVO** — Registry com pipeline pré/pós   |
| `src/lib/guardrails/piiMasker.js`        | **NOVO** — Guardrail de PII                |
| `src/lib/guardrails/promptInjection.js`  | **NOVO** — Migrar promptInjectionGuard.js  |
| `src/middleware/promptInjectionGuard.js` | **DEPRECAR** — Migrar para guardrail       |
| `src/sse/handlers/chat.js`               | **MODIFICAR** — Integrar guardrailRegistry |
| `src/server-init.js`                     | **MODIFICAR** — Registrar guardrails       |

## Critérios de Aceite

- [ ] BaseGuardrail com hooks `preCall` e `postCall`
- [ ] Registry executa guardrails em ordem de prioridade
- [ ] PII Masker detecta e mascara CPF, email, telefone, cartão
- [ ] Guardrails podem ser desabilitados per-key via `disabledGuardrails`
- [ ] Pipeline não bloqueia se guardrail falhar (log + continue)
- [ ] `promptInjectionGuard.js` migrado para o sistema de guardrails
- [ ] Logs de cada guardrail executado no request

## Referência

- [LiteLLM: proxy/guardrails/guardrail_registry.py](https://github.com/BerriAI/litellm/blob/main/litellm/proxy/guardrails/)
- [LiteLLM: proxy/guardrails/init_guardrails.py](https://github.com/BerriAI/litellm/blob/main/litellm/proxy/guardrails/) — inicialização
