# Benutzerhandbuch

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Vollständiger Leitfaden zum Konfigurieren von Anbietern, Erstellen von Kombinationen, Integrieren von CLI-Tools und Bereitstellen von OmniRoute.

---

## Inhaltsverzeichnis

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Preise im Überblick

| Stufe                | Anbieter          | Kosten                | Kontingent zurücksetzen   | Am besten für                   |
| -------------------- | ----------------- | --------------------- | ------------------------- | ------------------------------- |
| **💳 ABO**           | Claude Code (Pro) | 20 $/Monat            | 5h + wöchentlich          | Bereits abonniert               |
|                      | Codex (Plus/Pro)  | 20–200 $/Monat        | 5h + wöchentlich          | OpenAI-Benutzer                 |
|                      | Gemini CLI        | **KOSTENLOS**         | 180.000/Monat + 1.000/Tag | Alle!                           |
|                      | GitHub-Copilot    | 10–19 $/Monat         | Monatlich                 | GitHub-Benutzer                 |
| **🔑 API-SCHLÜSSEL** | DeepSeek          | Bezahlung pro Nutzung | Keine                     | Billiges Denken                 |
|                      | Groq              | Bezahlung pro Nutzung | Keine                     | Ultraschnelle Inferenz          |
|                      | xAI (Grok)        | Bezahlung pro Nutzung | Keine                     | Grok 4 Argumentation            |
|                      | Mistral           | Bezahlung pro Nutzung | Keine                     | In der EU gehostete Modelle     |
|                      | Ratlosigkeit      | Bezahlung pro Nutzung | Keine                     | Sucherweitert                   |
|                      | Zusammen KI       | Bezahlung pro Nutzung | Keine                     | Open-Source-Modelle             |
|                      | Feuerwerk KI      | Bezahlung pro Nutzung | Keine                     | Schnelle FLUX-Bilder            |
|                      | Großhirn          | Bezahlung pro Nutzung | Keine                     | Geschwindigkeit im Wafermaßstab |
|                      | Kohärent          | Bezahlung pro Nutzung | Keine                     | Befehl R+ RAG                   |
|                      | NVIDIA NIM        | Bezahlung pro Nutzung | Keine                     | Unternehmensmodelle             |
| **💰 GÜNSTIG**       | GLM-4.7           | 0,6 $/1 Mio.          | Täglich 10 Uhr            | Budgetsicherung                 |
|                      | MiniMax M2.1      | 0,2 $/1 Mio.          | 5-Stunden-Rollen          | Günstigste Option               |
|                      | Kimi K2           | $9/Monat pauschal     | 10 Millionen Token/Monat  | Vorhersehbare Kosten            |
| **🆓 KOSTENLOS**     | iFlow             | $0                    | Unbegrenzt                | 8 Modelle kostenlos             |
|                      | Qwen              | $0                    | Unbegrenzt                | 3 Modelle kostenlos             |
|                      | Kiro              | $0                    | Unbegrenzt                | Claude frei                     |

**💡 Profi-Tipp:** Beginnen Sie mit der Kombination Gemini CLI (180.000 kostenlos/Monat) + iFlow (unbegrenzt kostenlos) = 0 $ Kosten!

---

## 🎯 Anwendungsfälle

### Fall 1: „Ich habe ein Claude Pro-Abonnement“

**Problem:** Kontingent läuft ungenutzt ab, Ratenbegrenzungen bei intensiver Codierung

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Fall 2: „Ich möchte Nullkosten“

**Problem:** Ich kann mir keine Abonnements leisten und brauche zuverlässige KI-Codierung

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Fall 3: „Ich brauche 24/7-Codierung, keine Unterbrechungen“

**Problem:** Fristen, ich kann mir Ausfallzeiten nicht leisten

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Fall 4: „Ich möchte KOSTENLOSE KI in OpenClaw“

**Problem:** Benötigen Sie einen KI-Assistenten in Messaging-Apps, völlig kostenlos

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Anbieter-Setup

### 🔐 Abonnementanbieter

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Profi-Tipp:** Verwenden Sie Opus für komplexe Aufgaben, Sonnet für Geschwindigkeit. OmniRoute verfolgt das Kontingent pro Modell!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (KOSTENLOS 180.000/Monat!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Bester Wert:** Riesiges kostenloses Kontingent! Verwenden Sie dies vor kostenpflichtigen Stufen.

#### GitHub-Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Günstige Anbieter

#### GLM-4.7 (Täglicher Reset, 0,6 $/1 Mio.)

1. Registrieren Sie sich: [Zhipu AI](https://open.bigmodel.cn/)
2. Holen Sie sich den API-Schlüssel vom Coding Plan
3. Dashboard → API-Schlüssel hinzufügen: Anbieter: `glm`, API-Schlüssel: `your-key`

**Verwendung:** `glm/glm-4.7` — **Profi-Tipp:** Coding Plan bietet 3× Kontingent zu 1/7 Kosten! Täglich um 10:00 Uhr zurückgesetzt.

#### MiniMax M2.1 (5 Stunden Zurücksetzen, 0,20 $/1 Mio.)

1. Registrieren Sie sich: [MiniMax](https://www.minimax.io/)
2. API-Schlüssel abrufen → Dashboard → API-Schlüssel hinzufügen

**Verwendung:** `minimax/MiniMax-M2.1` – **Profi-Tipp:** Günstigste Option für langen Kontext (1 Mio. Token)!

#### Kimi K2 (9 $/Monat pauschal)

1. Abonnieren: [Moonshot AI](https://platform.moonshot.ai/)
2. API-Schlüssel abrufen → Dashboard → API-Schlüssel hinzufügen

**Verwendung:** `kimi/kimi-latest` — **Profi-Tipp:** Feste 9 $/Monat für 10 Mio. Token = 0,90 $/1 Mio. effektive Kosten!

### 🆓 KOSTENLOSE Anbieter

#### iFlow (8 KOSTENLOSE Modelle)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 KOSTENLOSE Modelle)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude KOSTENLOS)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Kombinationen

### Beispiel 1: Abonnement maximieren → Günstiges Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Beispiel 2: Nur kostenlos (kostenlos)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI-Integration

### Cursor-IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Bearbeiten Sie `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex-CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Bearbeiten Sie `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**Oder verwenden Sie Dashboard:** CLI-Tools → OpenClaw → Auto-config

### Cline / Weiter / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Bereitstellung

### VPS-Bereitstellung

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Informationen zum hostintegrierten Modus mit CLI-Binärdateien finden Sie im Abschnitt „Docker“ in den Hauptdokumenten.

### Umgebungsvariablen

| Variable              | Standard                             | Beschreibung                                                             |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------ | ---- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | JWT-Signaturgeheimnis (**Änderung in der Produktion**)                   |
| `INITIAL_PASSWORD`    | `123456`                             | Erstes Login-Passwort                                                    |
| `DATA_DIR`            | `~/.omniroute`                       | Datenverzeichnis (Datenbank, Nutzung, Protokolle)                        |
| `PORT`                | Framework-Standard                   | Service-Port (`20128` in Beispielen)                                     |
| `HOSTNAME`            | Framework-Standard                   | Host binden (Docker ist standardmäßig `0.0.0.0`)                         |
| `NODE_ENV`            | Laufzeitstandard                     | Legen Sie `production` für die Bereitstellung                            | fest |
| `BASE_URL`            | `http://localhost:20128`             | Serverseitige interne Basis-URL                                          |
| `CLOUD_URL`           | `https://omniroute.dev`              | Basis-URL des Cloud-Synchronisierungsendpunkts                           |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | HMAC-Geheimnis für generierte API-Schlüssel                              |
| `REQUIRE_API_KEY`     | `false`                              | Bearer-API-Schlüssel auf `/v1/*` erzwingen                               |
| `ENABLE_REQUEST_LOGS` | `false`                              | Aktiviert Anforderungs-/Antwortprotokolle                                |
| `AUTH_COOKIE_SECURE`  | `false`                              | `Secure` Authentifizierungscookie erzwingen (hinter HTTPS-Reverse-Proxy) |

Die vollständige Umgebungsvariablenreferenz finden Sie im [README](../README.md).

---

## 📊 Verfügbare Modelle

<details>
<summary><b>Alle verfügbaren Modelle anzeigen</b></summary>

**Claude Code (`cc/`)** – Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** – Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** – KOSTENLOS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** – 0,6 $/1 Mio.: `glm/glm-4.7`

**MiniMax (`minimax/`)** – 0,2 $/1 Mio.: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** – KOSTENLOS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** – KOSTENLOS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** – KOSTENLOS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexität (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Feuerwerks-KI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Großhirn (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Zusammenhang (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Erweiterte Funktionen

### Benutzerdefinierte Modelle

Fügen Sie jedem Anbieter eine beliebige Modell-ID hinzu, ohne auf ein App-Update warten zu müssen:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Oder verwenden Sie das Dashboard: **Anbieter → [Anbieter] → Benutzerdefinierte Modelle**.

### Dedizierte Anbieterrouten

Leiten Sie Anfragen mit Modellvalidierung direkt an einen bestimmten Anbieter weiter:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Das Anbieterpräfix wird automatisch hinzugefügt, wenn es fehlt. Nicht übereinstimmende Modelle geben `400` zurück.

### Netzwerk-Proxy-Konfiguration

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**Vorrang:** Schlüsselspezifisch → Combo-spezifisch → Anbieterspezifisch → Global → Umgebung.

### Modellkatalog-API

```bash
curl http://localhost:20128/api/models/catalog
```

Gibt nach Anbieter gruppierte Modelle mit Typen (`chat`, `embedding`, `image`) zurück.

### Cloud-Synchronisierung

- Synchronisieren Sie Anbieter, Kombinationen und Einstellungen geräteübergreifend
- Automatische Hintergrundsynchronisierung mit Timeout + Fail-Fast
  – Bevorzugen Sie serverseitiges `BASE_URL`/`CLOUD_URL` in der Produktion

### LLM Gateway Intelligence (Phase 9)

- **Semantischer Cache** – Nicht-Streaming-Antworten mit Temperatur = 0 werden automatisch zwischengespeichert (Umgehung mit `X-OmniRoute-No-Cache: true`)
- **Request Idempotency** – Dedupliziert Anfragen innerhalb von 5 Sekunden über den Header `Idempotency-Key` oder `X-Request-Id`
- **Fortschrittsverfolgung** – Opt-in-SSE-`event: progress`-Ereignisse über den `X-OmniRoute-Progress: true`-Header

---

### Übersetzerspielplatz

Zugriff über **Dashboard → Übersetzer**. Debuggen und visualisieren Sie, wie OmniRoute API-Anfragen zwischen Anbietern übersetzt.

| Modus            | Zweck                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Spielplatz**   | Wählen Sie Quell-/Zielformate aus, fügen Sie eine Anfrage ein und sehen Sie sich sofort die übersetzte Ausgabe an  |
| **Chat-Tester**  | Senden Sie Live-Chat-Nachrichten über den Proxy und überprüfen Sie den gesamten Anfrage-/Antwortzyklus             |
| **Prüfstand**    | Führen Sie Batch-Tests über mehrere Formatkombinationen hinweg durch, um die Übersetzungskorrektheit zu überprüfen |
| **Live-Monitor** | Beobachten Sie Übersetzungen in Echtzeit, während Anfragen über den Proxy fließen                                  |

**Anwendungsfälle:**

- Debuggen Sie, warum eine bestimmte Client-/Provider-Kombination fehlschlägt
- Stellen Sie sicher, dass Denktags, Toolaufrufe und Systemaufforderungen korrekt übersetzt werden
- Vergleichen Sie Formatunterschiede zwischen den API-Formaten OpenAI, Claude, Gemini und Responses

---

### Routing-Strategien

Konfigurieren Sie über **Dashboard → Einstellungen → Routing**.

| Strategie                      | Beschreibung                                                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **Zuerst füllen**              | Verwendet Konten in der Reihenfolge ihrer Priorität – das primäre Konto bearbeitet alle Anfragen, bis es nicht mehr verfügbar ist |
| **Round Robin**                | Durchläuft alle Konten mit einem konfigurierbaren Sticky-Limit (Standard: 3 Anrufe pro Konto)                                     |
| **P2C (Power of Two Choices)** | Wählt zwei zufällige Konten aus und leitet sie zum gesünderen weiter – gleicht Last mit Gesundheitsbewusstsein aus                |
| **Zufällig**                   | Wählt für jede Anfrage per Fisher-Yates-Shuffle                                                                                   | zufällig ein Konto aus |
| **Am wenigsten genutzt**       | Leitet zum Konto mit dem ältesten `lastUsedAt`-Zeitstempel weiter und verteilt den Datenverkehr gleichmäßig                       |
| **Kostenoptimiert**            | Leitet zum Konto mit dem niedrigsten Prioritätswert weiter, optimiert für Anbieter mit den niedrigsten Kosten                     |

#### Wildcard-Modellaliase

Erstellen Sie Platzhaltermuster, um Modellnamen neu zuzuordnen:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Platzhalter unterstützen `*` (beliebige Zeichen) und `?` (einzelnes Zeichen).

#### Fallback-Ketten

Definieren Sie globale Fallback-Ketten, die für alle Anfragen gelten:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Belastbarkeit und Leistungsschalter

Konfigurieren Sie über **Dashboard → Einstellungen → Resilienz**.

OmniRoute implementiert Resilienz auf Anbieterebene mit vier Komponenten:

1. **Anbieterprofile** – Konfiguration pro Anbieter für:
   - Fehlerschwelle (wie viele Fehler vor dem Öffnen)
   - Abklingdauer
   - Empfindlichkeit der Grenzfrequenzerkennung
   - Exponentielle Backoff-Parameter

2. **Bearbeitbare Ratenbegrenzungen** – Standardeinstellungen auf Systemebene, konfigurierbar im Dashboard:
   - **Anfragen pro Minute (RPM)** – Maximale Anfragen pro Minute und Konto
   - **Min. Zeit zwischen Anfragen** – Mindestlücke in Millisekunden zwischen Anfragen
   - **Max. gleichzeitige Anfragen** – Maximale gleichzeitige Anfragen pro Konto
   - Klicken Sie zum Ändern auf **Bearbeiten** und dann auf **Speichern** oder **Abbrechen**. Werte bleiben über die Resilience-API bestehen.

3. **Leistungsschalter** – Verfolgt Ausfälle pro Anbieter und öffnet automatisch den Stromkreis, wenn ein Schwellenwert erreicht wird:
   - **GESCHLOSSEN** (fehlerfrei) – Anfragen fließen normal
   - **OFFEN** – Der Anbieter ist nach wiederholten Ausfällen vorübergehend gesperrt
   - **HALF_OPEN** – Testen, ob sich der Anbieter erholt hat

4. **Richtlinien und Sperrkennungen** – Zeigt den Status des Leistungsschalters und die Sperrkennungen mit der Möglichkeit zum erzwungenen Entsperren an.

5. **Automatische Erkennung von Ratenbegrenzungen** – Überwacht die Header `429` und `Retry-After`, um proaktiv zu vermeiden, dass die Ratenbegrenzungen der Anbieter erreicht werden.

**Profi-Tipp:** Verwenden Sie die Schaltfläche **Alle zurücksetzen**, um alle Leistungsschalter und Abklingzeiten zu löschen, wenn ein Anbieter nach einem Ausfall wiederhergestellt wird.

---

### Datenbankexport/-import

Verwalten Sie Datenbanksicherungen unter **Dashboard → Einstellungen → System & Speicher**.

| Aktion                         | Beschreibung                                                                                                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Datenbank exportieren**      | Lädt die aktuelle SQLite-Datenbank als `.sqlite`-Datei herunter                                                                                                                   |
| **Alle exportieren (.tar.gz)** | Lädt ein vollständiges Backup-Archiv herunter, einschließlich: Datenbank, Einstellungen, Kombinationen, Anbieterverbindungen (keine Anmeldeinformationen), API-Schlüsselmetadaten |
| **Datenbank importieren**      | Laden Sie eine `.sqlite`-Datei hoch, um die aktuelle Datenbank zu ersetzen. Es wird automatisch ein Backup vor dem Import erstellt                                                |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Importvalidierung:** Die importierte Datei wird auf Integrität (SQLite-Pragmaprüfung), erforderliche Tabellen (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) und Größe (max. 100 MB) validiert.

**Anwendungsfälle:**

- OmniRoute zwischen Maschinen migrieren
- Erstellen Sie externe Backups für die Notfallwiederherstellung
- Konfigurationen zwischen Teammitgliedern teilen (alle exportieren → Archiv teilen)

---

### Einstellungs-Dashboard

Die Einstellungsseite ist zur einfachen Navigation in 5 Registerkarten unterteilt:

| Tab                 | Inhalt                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Sicherheit**      | Anmelde-/Passworteinstellungen, IP-Zugriffskontrolle, API-Authentifizierung für `/models` und Anbieterblockierung |
| **Routing**         | Globale Routing-Strategie (6 Optionen), Wildcard-Modell-Aliase, Fallback-Ketten, Combo-Standardwerte              |
| **Belastbarkeit**   | Anbieterprofile, bearbeitbare Tarifbegrenzungen, Leistungsschalterstatus, Richtlinien und Sperrkennungen          |
| **KI**              | Denken Sie an die Budgetkonfiguration, die globale System-Prompt-Injektion, die Prompt-Cache-Statistiken          |
| **Fortgeschritten** | Globale Proxy-Konfiguration (HTTP/SOCKS5)                                                                         |

---

### Kosten- und Budgetmanagement

Zugang über **Dashboard → Kosten**.

| Tab        | Zweck                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| **Budget** | Legen Sie Ausgabenlimits pro API-Schlüssel mit Tages-/Wochen-/Monatsbudgets und Echtzeitverfolgung fest |
| **Preise** | Modellpreiseinträge anzeigen und bearbeiten – Kosten pro 1.000 Ein-/Ausgabe-Tokens pro Anbieter         |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Kostenverfolgung:** Bei jeder Anfrage wird die Token-Nutzung protokolliert und die Kosten anhand der Preistabelle berechnet. Sehen Sie sich Aufschlüsselungen in **Dashboard → Nutzung** nach Anbieter, Modell und API-Schlüssel an.

---

### Audiotranskription

OmniRoute unterstützt die Audiotranskription über den OpenAI-kompatiblen Endpunkt:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Verfügbare Anbieter: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Unterstützte Audioformate: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Combo-Balancing-Strategien

Konfigurieren Sie die Balance pro Combo unter **Dashboard → Combos → Erstellen/Bearbeiten → Strategie**.

| Strategie                | Beschreibung                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Round-Robin**          | Rotiert nacheinander durch die Modelle                                                         |
| **Priorität**            | Versucht immer das erste Modell; fällt nur bei Fehler zurück                                   |
| **Zufällig**             | Wählt für jede Anfrage ein zufälliges Modell aus der Kombination aus                           |
| **Gewichtet**            | Routen proportional basierend auf den zugewiesenen Gewichten pro Modell                        |
| **Am wenigsten genutzt** | Leitet zum Modell mit den wenigsten aktuellen Anfragen weiter (verwendet Kombinationsmetriken) |
| **Kostenoptimiert**      | Leitet zum günstigsten verfügbaren Modell (unter Verwendung der Preistabelle)                  |

Globale Combo-Standards können unter **Dashboard → Einstellungen → Routing → Combo-Standards** festgelegt werden.

---

### Gesundheits-Dashboard

Zugriff über **Dashboard → Gesundheit**. Echtzeit-Übersicht über den Systemzustand mit 6 Karten:

| Karte                  | Was es zeigt                                                              |
| ---------------------- | ------------------------------------------------------------------------- |
| **Systemstatus**       | Betriebszeit, Version, Speichernutzung, Datenverzeichnis                  |
| **Anbietergesundheit** | Zustand des Leistungsschalters pro Anbieter (geschlossen/offen/halboffen) |
| **Ratenlimits**        | Aktive Abklingzeiten pro Konto mit verbleibender Zeit                     |
| **Aktive Sperren**     | Anbieter, die durch die Sperrrichtlinie vorübergehend gesperrt sind       |
| **Signatur-Cache**     | Statistiken zum Deduplizierungs-Cache (aktive Schlüssel, Trefferquote)    |
| **Latenztelemetrie**   | p50/p95/p99-Latenzaggregation pro Anbieter                                |

**Profi-Tipp:** Die Gesundheitsseite wird alle 10 Sekunden automatisch aktualisiert. Verwenden Sie die Leistungsschalterkarte, um zu ermitteln, bei welchen Anbietern Probleme auftreten.
