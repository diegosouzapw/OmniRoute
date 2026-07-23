- **fix(sse):** run the prompt-compression pipeline per turn in the Codex Responses WebSocket bridge instead of skipping it entirely — a reused WebSocket connection now re-runs `prepare()` (auth/policy/memory/reasoning-routing/compression) for every logical `response.create` turn, not just the first (#8052)

