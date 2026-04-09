# Implementation Plan: Native Playground LLM Dashboard

> Issue: #1046
> Idea: [_ideia/viable/1046-native-playground.md](../../_ideia/viable/1046-native-playground.md)
> Branch: `release/v3.5.6`

## Overview

Build a built-in playground page at `/dashboard/playground` that allows users to test their configured combos/providers with a chat interface, parameter controls, and raw JSON inspection.

## Pre-Implementation Checklist

- [ ] Review existing dashboard layout/navigation
- [ ] Check sidebar menu component for adding new entry
- [ ] Review existing API routes for chat completions

## Implementation Steps

### Step 1: Create Playground Page

**Files:**
- `src/app/(dashboard)/dashboard/playground/page.tsx` — NEW

**Details:**
A full playground page with:
- Model/Combo selector dropdown (fetches from `/api/combos` and `/api/providers`)
- System prompt textarea
- Chat message input area
- Controllable parameters (temperature, max_tokens, top_p)
- Stream/Non-stream toggle
- Send button with loading state
- Response display with markdown rendering
- Raw JSON toggle (show request/response payloads)
- Token usage and latency display

### Step 2: Add Sidebar Navigation Entry

**Files:**
- Dashboard sidebar/navigation component — MODIFY

**Details:**
Add "Playground" menu item with a play/terminal icon, between existing menu items.

### Step 3: Implement Chat API Call

**Details:**
The playground should call the local OmniRoute proxy endpoint:
- `POST /v1/chat/completions` for completions
- Use `fetch()` with streaming support via `EventSource` or `ReadableStream`
- Display tokens/latency from response headers

### Step 4: i18n

**Translation keys:**
- `playground.title` — "Playground"
- `playground.description` — "Test your models and combos"
- `playground.selectModel` — "Select Model"
- `playground.selectCombo` — "Select Combo"
- `playground.systemPrompt` — "System Prompt"
- `playground.message` — "Type a message..."
- `playground.send` — "Send"
- `playground.streaming` — "Streaming"
- `playground.parameters` — "Parameters"
- `playground.temperature` — "Temperature"
- `playground.maxTokens` — "Max Tokens"
- `playground.rawJson` — "Raw JSON"
- `playground.tokenUsage` — "Token Usage"
- `playground.latency` — "Latency"

### Step 5: Tests

**Test cases:**
- [ ] Page renders without errors
- [ ] Model/combo selector populates from API
- [ ] Parameter controls update state
- [ ] Chat request sends correct payload

## Verification Plan

1. Run `npm run build` — must pass
2. Run tests — all pass
3. Visual check: navigate to `/dashboard/playground`

## Commit Plan

```
feat: add built-in LLM playground to dashboard (#1046)
```
