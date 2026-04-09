# TASK T8 — Documentação e i18n

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Confirmar que T1-T7 estão concluídas e todos os testes passando
3. Verificar a estrutura de i18n:
   ```bash
   ls docs/i18n/ | head -5
   # Verificar se existe docs/i18n/en/ com os docs em inglês
   ```
4. Buscar onde "round-robin" aparece na documentação para entender onde documentar o novo strategy:
   ```bash
   grep -r "round-robin\|context-relay\|combo.*strategy" docs/ -l 2>/dev/null | head -10
   ```
5. Verificar o CHANGELOG para o formato de entrada:
   ```bash
   head -50 CHANGELOG.md
   ```

## Objetivo

1. Documentar a nova feature em inglês
2. Adicionar entrada no CHANGELOG
3. Adicionar strings de i18n para a UI (label e descrição do novo strategy)

---

## 1. Documentação em `docs/`

### Arquivo a criar/atualizar: `docs/features/context-relay.md`

Se o diretório `docs/features/` não existir, verificar onde documentação de features está (pode ser `docs/` raiz ou `docs/combos/`).

Conteúdo mínimo:

```markdown
# Context Relay Combo Strategy

## Overview

`context-relay` is a combo strategy designed for long-running AI sessions that 
require quota management across multiple accounts.

When a provider account approaches its quota limit (85%), the system 
automatically generates a structured "Handoff Summary" of the conversation using 
the LLM itself. When account rotation occurs at 95%, this summary is injected 
into the new account as a system message, enabling seamless context continuity.

## When to Use

- Long coding sessions using multiple Codex accounts
- Any scenario with multiple accounts of the same provider in rotation
- Tasks where conversation context must survive account quota resets

## Configuration

```json
{
  "name": "my-codex-relay",
  "models": [
    "codex/gpt-5.3-codex",
    "codex/gpt-5.3-codex"
  ],
  "strategy": "context-relay",
  "config": {
    "handoff_threshold": 0.85,
    "handoff_providers": ["codex"]
  }
}
```

## How It Works

1. **Routing (0-84% quota)**: Normal priority routing — first available account wins
2. **Warning Zone (85-94%)**: Handoff Summary generated asynchronously (no latency)
3. **Rotation (≥95%)**: Account skipped by quota preflight; next account activated
4. **Handoff Injection**: New account receives conversation summary as system message

## Handoff Payload Structure

The generated summary includes:
- **Summary** (~200 words): what was discussed and accomplished  
- **Key Decisions**: important decisions made during the session
- **Task Progress**: current state and remaining steps
- **Active Entities**: files, topics, and technologies mentioned

## Limitations

- Handoff summary requires one LLM call (generated async, no latency impact)
- Provider-level prompt cache is not portable (by design — the handoff compensates)
- Currently optimized for Codex accounts (5h + 7d dual-window quota)
- Context is approximated — nuances of intermediate reasoning may be lost
```

---

## 2. CHANGELOG

Adicionar entrada na seção `[Unreleased]` ou na próxima versão:

```markdown
### Added
- `context-relay` combo strategy with LLM-powered Handoff Summary for seamless
  account rotation. Generates structured context summaries at 85% quota usage
  and injects them into replacement accounts at 95%, preserving conversation
  continuity across Codex account switches (#XXX)
- Dual-window quota modeling for Codex (5h + 7d), preventing over-blocking
  when only the short-term window is exhausted
- Proactive Codex quota preflight in combo routing — accounts at ≥95% usage
  are skipped before the request is attempted, eliminating 429 retries
```

---

## 3. Strings de i18n para a UI

Localizar o arquivo de strings de UI do dashboard. Pode ser:
- `src/app/dashboard/locales/en.json`
- `messages/en.json` (se usa next-intl)
- `public/locales/en/common.json`

```bash
find src/ -name "*.json" -path "*/locales/*" | head -5
# ou
find . -name "en.json" -not -path "*/node_modules/*" | head -5
```

Adicionar as strings:

```json
{
  "combo": {
    "strategy": {
      "context-relay": "Context Relay",
      "context-relay.description": "Handoff-aware routing with LLM-generated context summaries. Ideal for long Codex sessions with multiple accounts."
    }
  }
}
```

---

## 4. Atualizar Tipo no AGENTS.md (regras do projeto)

No arquivo `AGENTS.md` (raiz), a seção de Services lista os módulos. Adicionar:

```
`contextHandoff.ts`, `contextHandoffs.ts` (DB)
```

na lista de serviços relevantes — mas apenas se o AGENTS.md tiver uma lista detalhada de services (verificar antes de editar).

---

## Verificação

```bash
# Verificar se docs estão bem formados (markdown lint se disponível)
npx markdownlint docs/features/context-relay.md 2>/dev/null || echo "no markdownlint"

# CHANGELOG não deve ter erros de sintaxe
head -80 CHANGELOG.md
```

## Status

- [ ] `docs/features/context-relay.md` criado (ou equivalente conforme estrutura encontrada)
- [ ] CHANGELOG atualizado com entrada na seção [Unreleased]
- [ ] Strings i18n adicionadas (en.json ou equivalente)
- [ ] AGENTS.md atualizado (se tiver lista detalhada de serviços)
