---
title: "Przewodnik po protokołach agentów"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik po protokołach agentów

> **Source:** `src/lib/{a2a,acp,cloudAgent}/`, `src/app/api/{a2a,acp,cloud}/`, `src/app/api/v1/agents/`
> **Last updated:** 2026-06-28 — v3.8.40

OmniRoute udostępnia trzy różne powierzchnie związane z agentami. Na pierwszy rzut oka wyglądają podobnie, ale rozwiązują inne problemy. Ta strona pomaga wybrać właściwą.

## TL;DR

| Surface                       | Best for                                                                                                                                                     | Transport                   | Standard             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | -------------------- |
| **A2A — Agent-to-Agent**      | Współpraca między agentami z peerami mówiącymi protokołem A2A                                                                                                | JSON-RPC 2.0 over HTTP      | A2A v0.3 (open spec) |
| **ACP — CLI Agents Registry** | Wykrywanie / rejestracja / uruchamianie agentów CLI do kodowania zainstalowanych na maszynie użytkownika (Cursor, Cline, Codex CLI, Claude Code, Aider itd.) | HTTP REST                   | OmniRoute-specific   |
| **Cloud Agents**              | Przesyłanie długotrwałych zadań kodowania do zewnętrznych usług chmurowych (Codex Cloud, Devin, Jules, Cursor Cloud)                                         | HTTP REST + DB-backed tasks | OmniRoute-specific   |

Te trzy są niezależne — wybierz dowolny podzbiór.

## Decision Tree

```
Do you need a cloud service to do work outside this machine (Codex Cloud / Devin / Jules)?
├─ YES → Cloud Agents (POST /api/v1/agents/tasks)
└─ NO → Continue
    │
    Do you have a peer agent that speaks A2A and wants to collaborate?
    ├─ YES → A2A (POST /a2a)
    └─ NO → Continue
        │
        Do you need to list / configure CLI coding agents installed locally?
        ├─ YES → ACP (GET /api/acp/agents)
        └─ NO → Use plain /v1/chat/completions
```

## 1. A2A — Agent-to-Agent

**Spec:** [A2A v0.3](https://a2a-protocol.org)
**OmniRoute endpoint:** `POST /a2a` (JSON-RPC 2.0)
**Agent Card:** `GET /.well-known/agent.json`

### Kiedy używać

- Budowa systemu multi-agent, w którym OmniRoute jest jednym z peerów
- Udostępnianie inteligencji routingu OmniRoute (smart-routing, quota-management itd.) agentom w frameworkach takich jak Google ADK lub generycznych siatkach agentów
- Opakowanie OmniRoute za standardową powierzchnią discovery + invocation

### Methods

- `message/send` — wyślij wiadomość, otrzymaj odpowiedź synchroniczną
- `message/stream` — wyślij + otrzymaj zdarzenia postępu strumieniowane SSE
- `tasks/get` — odczytaj task po ID
- `tasks/cancel` — anuluj działający task

### Wbudowane skills (6)

- `smart-routing` — kieruj prompt przez optymalne combo
- `quota-management` — raportuj stan quota per provider
- `provider-discovery` — listuj zainstalowanych providerów z capabilities
- `cost-analysis` — szacuj koszt requestu/konwersacji
- `health-report` — agreguj stan breaker/cooldown/lockout per provider
- `list-capabilities` — wylicz dostępne skills agenta i metadane

### Deep dive

Zobacz [A2A-SERVER.md](./A2A-SERVER.md) po szczegóły transportu, strukturę agent card, konfigurację TTL tasków oraz szablon dodawania nowych skills.

## 2. ACP — CLI Agents Registry

**OmniRoute endpoint:** `GET /api/acp/agents`
**Source:** `src/lib/acp/{index,manager,registry}.ts`

### Czym jest

ACP to **lokalny inwentarz agentów CLI** OmniRoute. Wykrywa, które CLI do kodowania są zainstalowane na hoście (Cursor, Cline, Claude Code, Codex CLI, Continue itd.), ustala ich wersje i udostępnia je w dashboardzie, aby użytkownik mógł skonfigurować każde CLI tak, by wskazywało na OmniRoute.

To NIE jest zewnętrzny protokół — to wewnętrzny rejestr napędzający UI „CLI Tools” oraz śledzenie fingerprintów CLI (zobacz [CLI-TOOLS.md](../reference/CLI-TOOLS.md)).

### Co robi

- Sondowanie hosta pod kątem zainstalowanych binarek CLI (używa `which` / `where` per OS)
- Odczyt wersji każdego CLI (wywołanie `<bin> --version`)
- Opcjonalnie przyjmuje zdefiniowanych przez użytkownika custom agentów (ścieżka binary + probe wersji + spawn args)
- Utrwala custom agentów w settings
- Zwraca ujednoliconą listę do dashboardu

### REST API

| Endpoint          | Method | Description                                                       | Auth    |
| ----------------- | ------ | ----------------------------------------------------------------- | ------- |
| `/api/acp/agents` | GET    | Lista wykrytych + custom agentów (liczniki installed/total)       | API key |
| `/api/acp/agents` | POST   | Dodaj/aktualizuj/usuń custom agenta (dyskryminator action w body) | API key |

Kształt body dla POST (`customAgentBodySchema` w `src/app/api/acp/agents/route.ts`):

```json
{
  "action": "add|update|remove",
  "id": "cursor",
  "name": "Cursor",
  "binary": "/usr/local/bin/cursor",
  "versionCommand": "--version",
  "providerAlias": "cursor",
  "spawnArgs": ["--api-base", "http://localhost:20128"],
  "protocol": "stdio"
}
```

### Przypadki użycia

- Strona dashboardu „CLI Tools” listuje, co jest zainstalowane, i pomaga wskazać każde CLI na OmniRoute
- Custom agenci pozwalają power userom rejestrować wewnętrzne/własnościowe CLI, o których OmniRoute domyślnie nie wie
- Wynik detekcji zasila macierz fingerprintów `cli-tools`

### Kiedy NIE używać ACP

- ACP nie _uruchamia_ tasków. Tylko wykrywa + konfiguruje CLI. Aby faktycznie wywołać CLI, uruchamiasz je sam z env vars, które dostarcza OmniRoute (`OPENAI_BASE_URL`, `OPENAI_API_KEY` itd.).

## 3. Cloud Agents

**OmniRoute endpoints:** `/api/v1/agents/tasks/*` (lifecycle) + `/api/cloud/*` (plumbing)
**Source:** `src/lib/cloudAgent/`

### Czym jest

Jednolity interfejs nad zewnętrznymi chmurowymi agentami do kodowania. Przesyłasz prompt + URL repozytorium, OmniRoute dysponuje do właściwego cloud agenta, odpytuje status i zwraca wyniki.

### Obsługiwani agenci (3, wszyscy potwierdzeni w `src/lib/cloudAgent/agents/`)

- `codex-cloud` — OpenAI Codex Cloud
- `devin` — Cognition Devin
- `jules` — Google Jules

### Lifecycle

```
POST /api/v1/agents/tasks
  → BaseAgent.createTask() per agent class
  → external service starts work
  → task row created in DB (cloud_agent_tasks)
  ↓
GET /api/v1/agents/tasks/[id]
  → lazy status sync from provider
  → returns current status + plan + activity log
  ↓
POST /api/v1/agents/tasks/[id]   (action: "approve" | "message" | "cancel")
  → forwards to provider (or marks cancelled locally)
  ↓
DELETE /api/v1/agents/tasks/[id]
  → local cancel
```

### Auth

⚠️ **Wszystkie endpointy `/api/v1/agents/tasks/*` wymagają management auth** (commit `588a0333`). Wywołujący tylko Bearer dostają 401 od v3.8.0.

### Deep dive

Zobacz [CLOUD_AGENT.md](./CLOUD_AGENT.md) po kontrakt `CloudAgentBase`, szczegóły per agent, schematy oraz endpointy plumbing poświadczeń.

## Porównanie: A2A vs Cloud Agents

Oba mają „długotrwałe taski”, ale na różnych warstwach:

| Aspect             | A2A                                                                                  | Cloud Agents                                |
| ------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------- |
| Standard           | Open A2A v0.3                                                                        | OmniRoute-specific                          |
| Where compute runs | Wewnątrz OmniRoute (używa skonfigurowanych combos)                                   | Zewnętrznie (serwery Codex / Devin / Jules) |
| Task duration      | Domyślny TTL 5 min (konfigurowalny w `TaskManager`)                                  | Minuty do godzin                            |
| Repo-aware         | Nie (przekazuje tylko prompty)                                                       | Tak (repo URL + branch)                     |
| Use case           | Współpraca cross-agent, smart routing as a service                                   | Deleguj „implement feature X in repo Y”     |
| Auth               | Opcjonalny `OMNIROUTE_API_KEY` dla `/a2a`; management dla helperów REST `/api/a2a/*` | Zawsze management                           |

## Przykłady integracji

### Odkryj capabilities A2A OmniRoute

```bash
curl http://localhost:20128/.well-known/agent.json
```

Zwraca Agent Card ze wszystkimi 5 skills, transportami i wersją.

### Wywołaj OmniRoute jako agenta A2A

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "message/send",
    "params": {
      "messages": [{"role": "user", "content": "Route this prompt"}],
      "skillId": "smart-routing"
    },
    "id": 1
  }'
```

### Listuj zainstalowanych agentów CLI przez ACP

```bash
curl http://localhost:20128/api/acp/agents \
  -H "Authorization: Bearer <api-key>"
```

### Dodaj custom agenta CLI

```bash
curl -X POST http://localhost:20128/api/acp/agents \
  -H "Authorization: Bearer <api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "id": "my-custom-cli",
    "name": "My Custom CLI",
    "binary": "/opt/mycli/bin/mycli",
    "versionCommand": "--version",
    "providerAlias": "openai"
  }'
```

### Prześlij task Cloud Agent

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "devin",
    "prompt": "Implement feature X in repo Y",
    "repo": "https://github.com/user/repo",
    "branch": "main"
  }'
```

### Odpytuj status cloud taska

```bash
curl http://localhost:20128/api/v1/agents/tasks/<task-id> \
  -H "Cookie: auth_token=..."
```

## Kiedy użyć czego

- **Frontend chatbota / copilota** → `/v1/chat/completions` (OpenAI-compat — to nie protokół agentów)
- **Współpraca multi-agent** → A2A
- **Listowanie lokalnych CLI w dashboardzie** → ACP
- **Delegowanie długotrwałych zadań kodowania do usług chmurowych** → Cloud Agents

## Architektura wewnętrzna

```
                ┌─────────────────────┐
                │   OmniRoute Core    │
                └─────────────────────┘
                  ↑       ↑        ↑
        ┌─────────┘       │        └─────────┐
        │                 │                  │
    ┌───────┐        ┌─────────┐       ┌────────────┐
    │  A2A  │        │   ACP   │       │  Cloud     │
    │ (/a2a)│        │ (/acp)  │       │  Agents    │
    └───────┘        └─────────┘       │ (/v1/agents│
        │                 │            │  /tasks)   │
        ↓                 ↓            └────────────┘
   External peer    Local CLI               │
   agents that      binaries on             ↓
   speak A2A v0.3   the host           Codex Cloud,
                                        Devin, Jules
```

## Zobacz też

- [A2A-SERVER.md](./A2A-SERVER.md) — deep dive A2A
- [CLOUD_AGENT.md](./CLOUD_AGENT.md) — deep dive Cloud Agents
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — zewnętrzne integracje CLI (używa ACP)
- [SKILLS.md](./SKILLS.md) — framework Skills (inny niż A2A skills — lokalny sandbox wykonania)
- [API_REFERENCE.md](../reference/API_REFERENCE.md#agents-protocol) — referencja endpointów
- Source: `src/lib/{a2a,acp,cloudAgent}/`
