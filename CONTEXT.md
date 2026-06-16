# OmniRoute Provider Routing

OmniRoute exposes upstream AI services through provider identities, credentials, and routing boundaries. This context defines the domain language used when discussing provider integrations.

## Language

**Provider**:
A named upstream AI service surface that OmniRoute can route requests to.
_Avoid_: model, account, endpoint

**Web-session provider**:
A provider that uses a browser-derived session credential rather than a normal upstream API key.
_Avoid_: API-key provider, OAuth provider

**Personal Copilot Web provider**:
The web-session provider for consumer Microsoft Copilot sessions.
_Avoid_: M365 Copilot, enterprise Copilot, work Copilot

**M365 Copilot Web provider**:
The web-session provider for Microsoft 365 Enterprise Copilot sessions.
_Avoid_: personal Copilot, consumer Copilot

**Session credential**:
A user-provided credential copied from an authenticated browser session.
_Avoid_: password, account, subscription

**Token extraction surface**:
A verified browser location from which OmniRoute can extract a session credential.
_Avoid_: endpoint, provider, credential guide

**Validation probe**:
A low-impact upstream check used to determine whether a session credential is usable.
_Avoid_: login flow, token refresh

## Relationships

- A **Provider** may be a **Web-session provider**.
- A **Web-session provider** requires one **Session credential**, unless it is explicitly no-auth.
- A **Token extraction surface** yields a **Session credential**.
- A **Validation probe** validates one **Session credential** for one **Provider**.
- The **Personal Copilot Web provider** and **M365 Copilot Web provider** are separate **Providers**.

## Example dialogue

> **Dev:** "Can we reuse the **Personal Copilot Web provider** for work accounts?"
> **Domain expert:** "No. A work account belongs to the **M365 Copilot Web provider**, because its **Session credential** and upstream protocol belong to a different provider boundary."

## Flagged ambiguities

- "Copilot" is ambiguous: use **Personal Copilot Web provider** for consumer sessions and **M365 Copilot Web provider** for enterprise sessions.
- "account" is ambiguous: use **Session credential** when discussing what OmniRoute stores or validates.
