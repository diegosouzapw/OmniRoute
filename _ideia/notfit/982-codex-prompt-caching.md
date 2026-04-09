# Feature: Prompt Caching support for Codex Models

> GitHub Issue: #982 — opened by @diegosouzapw on 2026-04-04
> Status: 📋 Cataloged | Priority: Medium
> Source: Discussion 584 by @alfonsofeliz

## 📝 Original Request

Add native prompt caching passthrough for Codex models via standard upstream cache-control headers. Update the translator layer to transparently pass those along.

## 💬 Community Discussion

### Participants
- @diegosouzapw — Issue creator
- @alfonsofeliz — Original discussion author

### Key Points
- Codex (OpenAI) supports prompt caching but OmniRoute may strip the relevant headers
- Need to ensure cache-control headers flow through the translation layer

## 🎯 Refined Feature Description

Ensure the Codex executor and translator preserve upstream prompt caching headers and parameters. The OpenAI API supports `cached_tokens` in usage responses — ensure these are not stripped during translation.

### What it solves
- Codex users losing prompt cache benefits when routing through OmniRoute
- Reduced API costs through proper cache utilization

### Affected areas
- `open-sse/executors/codex.ts` — header passthrough
- `open-sse/translator/` — cache header preservation
- Token accounting — recognize cached tokens in usage stats

## 🔗 Related Ideas
- Partially addressed already in v3.5.4 (Anthropic cache token accounting)
