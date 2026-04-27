# Context Relay

🌐 **Languages:** 🇺🇸 [English](context-relay.md) · 🇪🇸 [es](../i18n/es/docs/features/context-relay.md) · 🇫🇷 [fr](../i18n/fr/docs/features/context-relay.md) · 🇩🇪 [de](../i18n/de/docs/features/context-relay.md) · 🇮🇹 [it](../i18n/it/docs/features/context-relay.md) · 🇷🇺 [ru](../i18n/ru/docs/features/context-relay.md) · 🇨🇳 [zh-CN](../i18n/zh-CN/docs/features/context-relay.md) · 🇯🇵 [ja](../i18n/ja/docs/features/context-relay.md) · 🇰🇷 [ko](../i18n/ko/docs/features/context-relay.md) · 🇸🇦 [ar](../i18n/ar/docs/features/context-relay.md) · 🇮🇳 [hi](../i18n/hi/docs/features/context-relay.md) · 🇮🇳 [in](../i18n/in/docs/features/context-relay.md) · 🇹🇭 [th](../i18n/th/docs/features/context-relay.md) · 🇻🇳 [vi](../i18n/vi/docs/features/context-relay.md) · 🇮🇩 [id](../i18n/id/docs/features/context-relay.md) · 🇲🇾 [ms](../i18n/ms/docs/features/context-relay.md) · 🇳🇱 [nl](../i18n/nl/docs/features/context-relay.md) · 🇵🇱 [pl](../i18n/pl/docs/features/context-relay.md) · 🇸🇪 [sv](../i18n/sv/docs/features/context-relay.md) · 🇳🇴 [no](../i18n/no/docs/features/context-relay.md) · 🇩🇰 [da](../i18n/da/docs/features/context-relay.md) · 🇫🇮 [fi](../i18n/fi/docs/features/context-relay.md) · 🇵🇹 [pt](../i18n/pt/docs/features/context-relay.md) · 🇷🇴 [ro](../i18n/ro/docs/features/context-relay.md) · 🇭🇺 [hu](../i18n/hu/docs/features/context-relay.md) · 🇧🇬 [bg](../i18n/bg/docs/features/context-relay.md) · 🇸🇰 [sk](../i18n/sk/docs/features/context-relay.md) · 🇺🇦 [uk-UA](../i18n/uk-UA/docs/features/context-relay.md) · 🇮🇱 [he](../i18n/he/docs/features/context-relay.md) · 🇵🇭 [phi](../i18n/phi/docs/features/context-relay.md) · 🇧🇷 [pt-BR](../i18n/pt-BR/docs/features/context-relay.md) · 🇨🇿 [cs](../i18n/cs/docs/features/context-relay.md) · 🇹🇷 [tr](../i18n/tr/docs/features/context-relay.md)

---

`context-relay` is a combo strategy that keeps session continuity when the active account
rotates before the conversation is finished.

The current runtime behaves like priority routing for model selection, then adds a
handoff layer on top:

- before the active account is exhausted, OmniRoute generates a compact structured summary
- after authentication selects a different account for the same session, OmniRoute injects
  that summary as a system message into the next request
- once the handoff is consumed successfully, it is removed from storage

## When To Use It

Use `context-relay` when all of the following are true:

- the combo is expected to rotate between multiple accounts of the same provider
- losing short-term conversational continuity would hurt task quality
- the provider exposes enough quota information to predict an approaching account limit

This is most useful for long-running coding or research sessions that may outlive a single
account window.

## Runtime Flow

The current behavior is intentionally split across two runtime layers.

### 0% to 84% quota used

No handoff is generated. Requests behave like normal priority routing.

### 85% to 94% quota used

If the active provider is enabled in `handoffProviders`, OmniRoute generates a structured
handoff summary in the background before the account is fully exhausted.

Important details:

- the default warning threshold is `0.85`
- the hard stop for generation is `0.95`
- only one in-flight handoff generation is allowed per `sessionId + comboName`
- if an active handoff already exists for that session/combo, no duplicate summary is generated

### 95% or more quota used

No new handoff is generated. At this point the system is already in or near exhaustion and
the runtime avoids scheduling another summary request.

### After account rotation

When the next request for the same session resolves to a different authenticated account,
OmniRoute prepends the stored handoff as a system message. Injection happens only after the
real account switch is known.

## Handoff Payload

The persisted handoff payload is stored in `context_handoffs` and includes:

- `sessionId`
- `comboName`
- `fromAccount`
- `summary`
- `keyDecisions`
- `taskProgress`
- `activeEntities`
- `messageCount`
- `model`
- `warningThresholdPct`
- `generatedAt`
- `expiresAt`

The summary model is instructed to return a JSON object with this structure:

```json
{
  "summary": "Dense summary of what matters for continuity",
  "keyDecisions": ["Decision 1", "Decision 2"],
  "taskProgress": "What is done, what is pending, and the next step",
  "activeEntities": ["fileA.ts", "feature X", "provider Y"]
}
```

At injection time, OmniRoute converts that payload into a `<context_handoff>` system
message so the next account can continue with the correct local context.

## Configuration

`context-relay` supports these config fields:

- `handoffThreshold`: warning threshold for summary generation, default `0.85`
- `handoffModel`: optional model override used only for summary generation
- `handoffProviders`: allowlist of providers allowed to trigger handoff generation

Global defaults can be configured in Settings, and combo-specific values can override them
in the Combos page.

## Architectural Note

The current implementation does not use a standalone `handleContextRelayCombo` handler.

Instead:

- `open-sse/services/combo.ts` decides whether a successful turn should generate a handoff
- `src/sse/handlers/chat.ts` injects the handoff only after authentication resolves the
  actual account used for the request

This split is intentional in the current codebase because the combo loop alone does not know
whether the request stayed on the same account or actually switched accounts.

## Limitations

- Effective runtime support is currently centered on `codex` quota rotation.
- `handoffProviders` is already modeled as a config surface, but real handoff generation
  still depends on provider-specific quota plumbing.
- The summary is intentionally compact and recent-history based; it is not a full transcript
  replay mechanism.
- Handoffs are scoped by `sessionId + comboName` and expire automatically.
- If the session does not switch accounts, the stored handoff is not injected.

## Recommended Usage Pattern

- use multiple accounts from the same provider
- keep stable `sessionId` values across the session
- set `handoffThreshold` early enough to leave room for the background summary request
- treat the feature as continuity assistance, not as a replacement for persistent memory
