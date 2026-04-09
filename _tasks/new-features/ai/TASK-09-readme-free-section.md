# TASK-09: README Free Section Overhaul

## Priority: 🔴 HIGH (documentation, no code)
## Status: [ ] TODO

## Overview

Update the README free models section and free combo section to include the 5 new providers.
This is a documentation-only task, but high impact for user acquisition.

## Sections to Update

### A. "🆓 Free Models — What You Actually Get" section (around line 944)

Add new subsections for each new provider:

#### NEW: 🔴 LONGCAT (Free API Key — longcat.chat)

```markdown
### 🔴 LONGCAT MODELS (Free API Key — longcat.chat)

| Model | Prefix | Limit | Notes |
|-------|--------|-------|-------|
| `LongCat-Flash-Lite` | `lc/` | **50M tokens/day** 🤯 | Fastest, unlimited for most use |
| `LongCat-Flash-Chat` | `lc/` | 500K tokens/day | Multi-turn conversations |
| `LongCat-Flash-Thinking` | `lc/` | 500K tokens/day | Reasoning/CoT |
| `LongCat-Flash-Omni-2603` | `lc/` | 500K tokens/day | Multimodal |
```

#### NEW: 🟢 POLLINATIONS AI (No API Key Required)

```markdown
### 🟢 POLLINATIONS AI (No Key — Zero Friction)

| Model | Prefix | Limit | Notes |
|-------|--------|-------|-------|
| `openai` | `pol/` | 1 req/15s | Routes to GPT-5 |
| `claude` | `pol/` | 1 req/15s | Routes to Claude |
| `deepseek` | `pol/` | 1 req/15s | DeepSeek V3 |
| `llama` | `pol/` | 1 req/15s | Llama 4 Scout |
| `gemini` | `pol/` | 1 req/15s | Gemini |
```

> ✨ **No signup, no API key** — add provider with empty key field and it works.

#### NEW: 🟠 CLOUDFLARE WORKERS AI

```markdown
### 🟠 CLOUDFLARE WORKERS AI (Free API Key — cloudflare.com)

| Model | Prefix | Limit | Notes |
|-------|--------|-------|-------|
| `@cf/meta/llama-3.3-70b-instruct` | `cf/` | 10K Neurons/day | Llama 70B |
| `@cf/google/gemma-3-12b-it` | `cf/` | 10K Neurons/day | Gemma 3 |
| `@cf/openai/whisper-large-v3-turbo` | `cf/` | 500s audio/day | FREE transcription |
```

> 10,000 Neurons/day = ~150 LLM responses or 500 seconds of Whisper audio.

#### NEW: 🟣 SCALEWAY AI

```markdown
### 🟣 SCALEWAY AI (1M Free Tokens — scaleway.com)

| Tier | Model | Prefix | Notes |
|------|-------|--------|-------|
| Free | `qwen3-235b-a22b-instruct-2507` | `scw/` | 235B model! |
| Free | `llama-3.1-70b-instruct` | `scw/` | GDPR-compliant |
| Free | `mistral-small-3.2-24b-instruct` | `scw/` | Mistral |
```

> 1M free tokens total (no credit card). EU/GDPR servers in Paris.

### B. Update "💡 $0 Combo Stack" section (around line 927)

Replace the existing "Free Combo Stack":

```
Gemini CLI (180K/mo free)
  → Qoder (unlimited: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1)
  → Kiro (Claude Sonnet 4.5 + Haiku — unlimited, via AWS Builder ID)
  → Qwen (4 models — unlimited)
  → Groq (14.4K req/day — ultra-fast)
  → NVIDIA NIM (70+ models — 40 RPM forever)
```

With enhanced version including new providers:

```
# 🆓 Ultimate Free Stack (2026)
  Kiro (kr/)         → Claude Sonnet/Haiku UNLIMITED
  Qoder (if/)        → 5 models UNLIMITED
  LongCat (lc/)      → 50M tokens/day (Flash-Lite) 🤯  ← NEW
  Pollinations (pol/) → No key needed, GPT-5/Claude/Gemini  ← NEW
  Qwen (qw/)         → 4 models UNLIMITED
  Gemini (gai/)      → 1,500 req/day FREE API key  ← NEW
  Cloudflare (cf/)   → 150 LLM responses/day  ← NEW
  Scaleway (scw/)    → 1M tokens (new accounts)  ← NEW
  Groq (groq/)       → 14.4K req/day ultra-fast
  NVIDIA NIM         → 70+ models, 40 RPM forever
  Cerebras           → 1M tokens/day world's fastest
```

### C. Update pricing table (around line 901)

Add LongCat and Pollinations rows to pricing table under 🆓 FREE section.

### D. Update line ~7 (tagline pills)

Update the "Free models" count:
- Before: mentions specific few providers
- After: "13+ free providers, zero cost coding forever"

## i18n Sync

After updating README.md:
1. Run the Python sync script on `docs/i18n/*/README.md`
2. The script should propagate changes to all 29 language files

## Verification Checklist

- [ ] LongCat section added with Flash-Lite 50M/day highlighted
- [ ] Pollinations section added with "no key needed" note
- [ ] Cloudflare section added with Neurons/day explanation
- [ ] Scaleway section added with 1M free tokens note
- [ ] Free combo stack updated with 11 providers
- [ ] Pricing table has new rows for LongCat and Pollinations
- [ ] All 29 i18n README files synced
