# Feature: [Feature] Local LLM as final fallback

> GitHub Issue: #1513 — opened by @woutercoppens on 2026-04-22T15:59:51Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

Is it possible to specify a local LLM as a last resort fallback? I'm thinking about Ollama, llama.cpp, vLLM, etc. 
This could save tokens. 

### Proposed Solution

If all other providers have ran out of tokens, a local LLM could continue the job.

### Alternatives Considered

None

### Acceptance Criteria

Just fallback to local LLM 

### Area

Provider Support

### Related Provider(s)

Ollama (local), Llama.ccp, ...

### Additional Context

_No response_

### Expected Test Plan

_No response_

## 💬 Community Discussion

### Participants

- @woutercoppens — Original requester

### Key Points

- User wants a concept of a "final fallback" provider that triggers when all other primary/cloud providers have exhausted their tokens/quotas.

## 🎯 Refined Feature Description

The routing engine (combo routing) allows users to sequence models. The user is asking for a global "last resort" fallback, or a way to include local models (Ollama, vLLM) easily as the final target in a fallback sequence if all others hit rate limits or quota exhaustion.
OmniRoute already supports Ollama and custom OpenAI-compatible endpoints. The feature request might simply be asking for a way to configure a "Global Fallback" or to build combos where the final fallback is explicitly marked to only trigger on quota exhaustion of the primary ones. Wait, Combo Routing already does this: if the first target fails (e.g. 429 Too Many Requests, Quota Exceeded), it falls back to the next target. If the user sets up a Combo with GPT-4 as Priority 1 and Ollama as Priority 2, it already behaves exactly as requested.

### What it solves

- Save tokens/costs by falling back to a free, local alternative when cloud limits are reached.

### How it should work (high level)

1. Wait, this functionality already exists using the existing **Combo Routing** and **Ollama Provider** support!
2. Users can create a combo with their primary models, and add a local Ollama model at the lowest priority. OmniRoute's `handleComboChat` naturally falls through targets upon failure.

### Affected areas

- None (Already exists).

## 📎 Attachments & References

- None.

## 🔗 Related Ideas

- None.
