# TASK-10: i18n Documentation Sync

## Priority: 🔴 HIGH (final sync after all tasks)
## Status: [ ] TODO — depends on TASK-09

## Overview

After all README and documentation changes are complete, synchronize updates to:
1. All 29 language-specific `docs/i18n/<lang>/README.md` files
2. `docs/i18n/<lang>/FEATURES.md` files where relevant
3. `docs/i18n/README.md` (the index file)

## Files to Sync

### docs/i18n/<lang>/README.md (29 languages)

Languages: ar, bg, cs, da, de, es, fi, fr, he, hu, id, in, it, ja, ko, ms, nl, no, phi, pl, pt, pt-BR, ro, ru, sk, sv, th, uk-UA, vi, zh-CN

### docs/i18n/<lang>/FEATURES.md

Check if FEATURES.md needs updating for new provider mentions.

## Sync Strategy

### 1. Provider names (keep in English in all languages)

Provider names and model IDs are universal — don't translate:
- `LongCat AI`, `lc/`, model IDs
- `Pollinations AI`, `pol/`
- `Cloudflare Workers AI`, `cf/`
- `Scaleway`, `scw/`

### 2. Free tier descriptions (translate key phrases)

The "No API key needed" note for Pollinations is the most important to translate.

### 3. Automated sync script

Use the existing Python sync script from the i18n-docs skill:

```bash
# Update table rows for Audio Transcription and TTS (already done)
# Now sync the new FREE MODELS sections

python3 /tmp/sync_free_providers.py
```

### Sync script logic (create in /tmp/):

```python
import re, glob

base = "/home/diegosouzapw/dev/proxys/9router/docs/i18n"
readme_files = glob.glob(f"{base}/*/README.md")

# For each i18n README, update the Free Combo Stack comment
# (English section names stay in English since they are code/technical)
# Only update if section exists

LONGCAT_SNIPPET = """
### 🔴 LONGCAT (Free API Key — longcat.chat)

| Model | Prefix | Daily Limit |
|-------|--------|-------------|
| `LongCat-Flash-Lite` | `lc/` | **50M tokens** 🤯 |
| `LongCat-Flash-Chat` | `lc/` | 500K tokens |
| `LongCat-Flash-Thinking` | `lc/` | 500K tokens |
"""

POLLINATIONS_SNIPPET = """
### 🟢 POLLINATIONS AI (No API Key Required)

| Model | Prefix | Notes |
|-------|--------|-------|
| `openai` | `pol/` | GPT-5 via Pollinations |
| `claude` | `pol/` | Claude via Pollinations |
| `deepseek` | `pol/` | DeepSeek V3 |
| `llama` | `pol/` | Llama 4 |
"""
# etc.
```

## Tables to Update in All i18n README Files

1. **Multi-Modal APIs table** — already done (transcription+TTS)
2. **Free Combo Stack** — add new 5 providers
3. **Free Providers table** — add LongCat, Pollinations, Cloudflare, Scaleway rows
4. **Pricing table** — add new free rows

## Strategy for i18n README Files

The i18n files already have table rows for audio (updated in previous tasks). For the new
providers section, since these are technical names and the free provider sections tend to
be in English even in translated files (per the existing patterns), the approach is:

1. Add new provider sections in English (they'll appear as-is in all languages)
2. Use the Python batch script to inject the new sections after the existing last free provider
3. Manual review of pt-BR file (most complete translation)

## Verification Checklist

- [ ] All 29 i18n README files contain LongCat section
- [ ] All 29 i18n README files contain Pollinations section  
- [ ] All 29 i18n README files contain Cloudflare AI section
- [ ] All 29 i18n README files contain Scaleway section
- [ ] Updated free combo stack appears in all 29 files
- [ ] FEATURES.md files updated where they reference provider counts
- [ ] Git diff shows clean changes across all language files

## Final Commit

```bash
git add docs/i18n/
git commit -m "docs(i18n): sync new free providers (LongCat, Pollinations, CF Workers AI, Scaleway) to all 30 language READMEs"
```
