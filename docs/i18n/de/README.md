# 🚀 OmniRoute – Das kostenlose KI-Gateway

### Hören Sie nie auf zu programmieren. Intelligentes Routing zu **KOSTENLOSEN und kostengünstigen KI-Modellen** mit automatischem Fallback.

_Ihr universeller API-Proxy – ein Endpunkt, mehr als 36 Anbieter, keine Ausfallzeiten. Jetzt mit **MCP & A2A** Agenten-Orchestrierung._

**Chat-Abschlüsse • Einbettungen • Bildgenerierung • Video • Musik • Audio • Reranking • MCP-Server • A2A-Protokoll • 100 % TypeScript**

---

### 🆕 Neu in v2.7.0

- **Erweiterbare RouterStrategy** — Regeln-, Kosten- und Latenzstrategien
- **Mehrsprachige Absichtserkennung** — Routing-Scoring in 30+ Sprachen
- **Anfrage-Deduplizierung** — doppelte API-Aufrufe per Content-Hash vermeiden
- **Neue Anbieter:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Aktualisierte Preise:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

<div align="center">

[![npm-Version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Lizenz](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Schnellstart](#-quick-start) • [💡 Funktionen](#-key-features) • [📖 Dokumente](#-documentation) • [💰 Preise](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Verfügbar in:** 🇺🇸 [Englisch](../../README.md) | 🇧🇷 [Português (Brasilien)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italienisch](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dänisch](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Niederlande](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Philippinisch](../phi/README.md)

---

## 🖼️ Haupt-Dashboard

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Dashboard-Vorschau

<details>
<summary><b>Klicken Sie hier, um Dashboard-Screenshots anzuzeigen</b></summary>

| Seite                  | Screenshot                                         |
| ---------------------- | -------------------------------------------------- |
| **Anbieter**           | ![Anbieter](docs/screenshots/01-providers.png)     |
| **Kombinationen**      | ![Combos](docs/screenshots/02-combos.png)          |
| **Analytik**           | ![Analytics](docs/screenshots/03-analytics.png)    |
| **Gesundheit**         | ![Gesundheit](docs/screenshots/04-health.png)      |
| **Übersetzer**         | ![Übersetzer](docs/screenshots/05-translator.png)  |
| **Einstellungen**      | ![Einstellungen](docs/screenshots/06-settings.png) |
| **CLI-Tools**          | ![CLI-Tools](docs/screenshots/07-cli-tools.png)    |
| **Nutzungsprotokolle** | ![Verwendung](docs/screenshots/08-usage.png)       |
| **Endpunkt**           | ![Endpunkt](docs/screenshots/09-endpoint.png)      |

</details>

---

### 🤖 Kostenloser KI-Anbieter für Ihre bevorzugten Programmieragenten

_Verbinden Sie jedes KI-gestützte IDE- oder CLI-Tool über OmniRoute – kostenloses API-Gateway für unbegrenzte Codierung._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/><sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo-Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Alle Agenten verbinden sich über <code>http://localhost:20128/v1</code> oder quote</sub>

---

## 🤔 Warum OmniRoute?

**Hören Sie auf, Geld zu verschwenden und an Grenzen zu stoßen:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Das Abonnementkontingent läuft jeden Monat ungenutzt ab
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Ratenbegrenzungen verhindern, dass Sie mitten in der Codierung sind
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Teure APIs (20–50 $/Monat pro Anbieter)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manueller Wechsel zwischen Anbietern

**OmniRoute löst dieses Problem:**

- ✅ **Abonnements maximieren** - Verfolgen Sie das Kontingent, nutzen Sie jedes Bit vor dem Zurücksetzen
- ✅ **Auto-Fallback** – Abonnement → API-Schlüssel → Günstig → Kostenlos, keine Ausfallzeiten
- ✅ **Mehrere Konten** – Round-Robin zwischen Konten pro Anbieter
- ✅ **Universell** – Funktioniert mit Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw und jedem CLI-Tool

---

## 📧 Unterstützung> 💬 **Treten Sie unserer Community bei!** [WhatsApp-Gruppe](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) – Holen Sie sich Hilfe, tauschen Sie Tipps aus und bleiben Sie auf dem Laufenden.

- **Website**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Probleme**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community-Gruppe](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Mitwirken**: Siehe [CONTRIBUTING.md](CONTRIBUTING.md), öffnen Sie eine PR oder wählen Sie eine `good first issue` aus
- **Originalprojekt**: [9router von decolua](https://github.com/decolua/9router)

---

## 🔄 Wie es funktioniert

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 Was OmniRoute löst – 30 echte Problempunkte und Anwendungsfälle

> **Jeder Entwickler, der KI-Tools verwendet, ist täglich mit diesen Problemen konfrontiert.** OmniRoute wurde entwickelt, um sie alle zu lösen – von Kostenüberschreitungen bis hin zu regionalen Blockaden, von unterbrochenen OAuth-Flüssen bis hin zu Protokollvorgängen und Unternehmensbeobachtbarkeit.

<details>
<summary><b>💸 1. „Ich bezahle ein teures Abonnement, werde aber trotzdem durch Limits unterbrochen“</b></summary>

Entwickler zahlen 20–200 US-Dollar/Monat für Claude Pro, Codex Pro oder GitHub Copilot. Auch wenn das Kontingent bezahlt wird, gibt es eine Obergrenze – 5 Stunden Nutzung, wöchentliche Limits oder Tariflimits pro Minute. Während der Codierungssitzung reagiert der Anbieter nicht mehr und der Entwickler verliert an Fluss und Produktivität.

**So löst OmniRoute das Problem:**

- **Intelligenter 4-Stufen-Fallback** – Wenn das Abonnementkontingent aufgebraucht ist, wird automatisch zu API Key → Günstig → Kostenlos weitergeleitet, ohne dass ein manueller Eingriff erforderlich ist
- **Kontingentverfolgung in Echtzeit** – Zeigt den Token-Verbrauch in Echtzeit mit Reset-Countdown an (5 Stunden, täglich, wöchentlich)
- **Unterstützung mehrerer Konten** – Mehrere Konten pro Anbieter mit automatischem Round-Robin – wenn eines aufgebraucht ist, wird zum nächsten gewechselt
- **Benutzerdefinierte Kombinationen** – Anpassbare Fallback-Ketten mit 6 Ausgleichsstrategien (Fill-First, Round-Robin, P2C, Random, Least-Used, Kostenoptimiert)
- **Codex Business Quotas** – Überwachung der Geschäfts-/Team-Arbeitsbereichskontingente direkt im Dashboard

</details>

<details>
<summary><b>🔌 2. „Ich muss mehrere Anbieter verwenden, aber jeder hat eine andere API“</b></summary>

OpenAI verwendet ein Format, Claude (Anthropic) verwendet ein anderes, Gemini noch ein anderes. Wenn ein Entwickler Modelle verschiedener Anbieter testen oder zwischen ihnen wechseln möchte, muss er SDKs neu konfigurieren, Endpunkte ändern und mit inkompatiblen Formaten umgehen. Benutzerdefinierte Anbieter (FriendLI, NIM) verfügen über nicht standardmäßige Modellendpunkte.

**So löst OmniRoute das Problem:**

- **Einheitlicher Endpunkt** – Ein einzelner `http://localhost:20128/v1` dient als Proxy für alle über 36 Anbieter
- **Formatübersetzung** – Automatisch und transparent: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Antwortbereinigung** – Entfernt nicht standardmäßige Felder (`x_groq`, `usage_breakdown`, `service_tier`), die OpenAI SDK v1.83+ beschädigen
- **Rollennormalisierung** – Konvertiert `developer` → `system` für Nicht-OpenAI-Anbieter; `system` → `user` für GLM/ERNIE
- **Think Tag Extraction** – Extrahiert `<think>`-Blöcke aus Modellen wie DeepSeek R1 in das standardisierte `reasoning_content`
- **Strukturierte Ausgabe für Gemini** – `json_schema` → `responseMimeType`/`responseSchema` automatische Konvertierung
- **`stream` ist standardmäßig `false`** – Entspricht der OpenAI-Spezifikation und vermeidet unerwartetes SSE in Python/Rust/Go-SDKs</details>

<details>
<summary><b>🌐 3. „Mein KI-Anbieter blockiert meine Region/mein Land“</b></summary>

Anbieter wie OpenAI/Codex blockieren den Zugriff aus bestimmten geografischen Regionen. Benutzer erhalten bei OAuth- und API-Verbindungen Fehler wie `unsupported_country_region_territory`. Dies ist besonders frustrierend für Entwickler aus Entwicklungsländern.

**So löst OmniRoute das Problem:**

- **3-Level-Proxy-Konfiguration** – Konfigurierbarer Proxy auf 3 Ebenen: global (gesamter Datenverkehr), pro Anbieter (nur ein Anbieter) und pro Verbindung/Schlüssel
- **Farbcodierte Proxy-Abzeichen** – Visuelle Indikatoren: 🟢 globaler Proxy, 🟡 Anbieter-Proxy, 🔵 Verbindungs-Proxy, immer mit IP-Adresse
- **OAuth-Token-Austausch über Proxy** – Der OAuth-Fluss läuft auch über den Proxy und löst `unsupported_country_region_territory`
- **Verbindungstests über Proxy** – Verbindungstests verwenden den konfigurierten Proxy (keine direkte Umgehung mehr)
- **SOCKS5-Unterstützung** – Vollständige SOCKS5-Proxy-Unterstützung für ausgehendes Routing
- **TLS-Fingerabdruck-Spoofing** – Browserähnlicher TLS-Fingerabdruck über `wreq-js` zur Umgehung der Bot-Erkennung

</details>

<details>
<summary><b>🆓 4. „Ich möchte KI zum Codieren verwenden, habe aber kein Geld“</b></summary>

Nicht jeder kann 20–200 $/Monat für KI-Abonnements bezahlen. Studenten, Entwickler aus Schwellenländern, Bastler und Freiberufler benötigen Zugang zu hochwertigen Modellen zum Nulltarif.

**So löst OmniRoute das Problem:**

- **Integrierte kostenlose Anbieter** – Native Unterstützung für 100 % kostenlose Anbieter: iFlow (8 unbegrenzte Modelle), Qwen (3 unbegrenzte Modelle), Kiro (Claude kostenlos), Gemini CLI (180.000/Monat kostenlos)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Nur kostenlose Combos** – Kette `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 $/Monat ohne Ausfallzeit
- **NVIDIA NIM Free Credits** – 1000 kostenlose Credits integriert
- **Kostenoptimierte Strategie** – Routing-Strategie, die automatisch den günstigsten verfügbaren Anbieter auswählt

</details>

<details>
<summary><b>🔒 5. „Ich muss mein KI-Gateway vor unbefugtem Zugriff schützen“</b></summary>

Wenn ein KI-Gateway dem Netzwerk (LAN, VPS, Docker) zugänglich gemacht wird, kann jeder mit der Adresse die Token/Kontingente des Entwicklers verbrauchen. Ohne Schutz sind APIs anfällig für Missbrauch, sofortige Injektion und Missbrauch.

**So löst OmniRoute das Problem:**

- **API-Schlüsselverwaltung** – Generierung, Rotation und Scoping pro Anbieter mit einer dedizierten `/dashboard/api-manager`-Seite
- **Berechtigungen auf Modellebene** – Beschränken Sie API-Schlüssel auf bestimmte Modelle (`openai/*`, Platzhaltermuster) mit der Umschaltfunktion „Alle zulassen/Einschränken“.
- **API Endpoint Protection** – Fordern Sie einen Schlüssel für `/v1/models` an und blockieren Sie bestimmte Anbieter aus der Liste
- **Auth Guard + CSRF-Schutz** – Alle Dashboard-Routen sind mit `withAuth`-Middleware + CSRF-Tokens geschützt
- **Ratenbegrenzer** – Ratenbegrenzung pro IP mit konfigurierbaren Fenstern
- **IP-Filterung** – Zulassungs-/Blockierungsliste für die Zugriffskontrolle
- **Prompt Injection Guard** – Bereinigung gegen bösartige Eingabeaufforderungsmuster
- **AES-256-GCM-Verschlüsselung** – Anmeldeinformationen im Ruhezustand verschlüsselt

</details>

<details>
<summary><b>🛑 6. „Mein Provider ist ausgefallen und ich habe meinen Codierungsfluss verloren“</b></summary>KI-Anbieter können instabil werden, 5xx-Fehler zurückgeben oder vorübergehende Ratengrenzen erreichen. Wenn ein Entwickler von einem einzelnen Anbieter abhängig ist, wird er unterbrochen. Ohne Schutzschalter können wiederholte Versuche zum Absturz der Anwendung führen.

**So löst OmniRoute das Problem:**

- **Leistungsschalter pro Anbieter** – Automatisches Öffnen/Schließen mit konfigurierbaren Schwellenwerten und Abklingzeit (geschlossen/offen/halb offen)
- **Exponentielles Backoff** – Progressive Wiederholungsverzögerungen
- **Anti-Thundering Herd** – Mutex + Semaphor-Schutz gegen gleichzeitige Wiederholungsstürme
- **Combo-Fallback-Ketten** – Wenn der primäre Anbieter ausfällt, fällt er automatisch durch die Kette, ohne dass ein Eingreifen erforderlich ist
- **Combo Circuit Breaker** – Deaktiviert automatisch ausgefallene Anbieter innerhalb einer Combo-Kette
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Gesundheits-Dashboard** – Betriebszeitüberwachung, Leistungsschalterzustände, Sperren, Cache-Statistiken, p50/p95/p99-Latenz

</details>

<details>
<summary><b>🔧 7. „Die Konfiguration jedes KI-Tools ist mühsam und repetitiv“</b></summary>

Entwickler verwenden Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code ... Jedes Tool benötigt eine andere Konfiguration (API-Endpunkt, Schlüssel, Modell). Eine Neukonfiguration bei einem Anbieter- oder Modellwechsel ist Zeitverschwendung.

**So löst OmniRoute das Problem:**

- **CLI Tools Dashboard** – Spezielle Seite mit Ein-Klick-Einrichtung für Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** – Generiert `chatLanguageModels.json` für VS-Code mit Massenmodellauswahl
- **Onboarding-Assistent** – Geführte Einrichtung in 4 Schritten für Erstbenutzer
- **Ein Endpunkt, alle Modelle** – Konfigurieren Sie `http://localhost:20128/v1` einmal und greifen Sie auf über 36 Anbieter zu

</details>

<details>
<summary><b>🔑 8. „OAuth-Tokens von mehreren Anbietern zu verwalten ist die Hölle“</b></summary>

Claude Code, Codex, Gemini CLI, Copilot – alle verwenden OAuth 2.0 mit ablaufenden Token. Entwickler müssen sich ständig neu authentifizieren, sich mit `client_secret is missing`, `redirect_uri_mismatch` und Fehlern auf Remote-Servern auseinandersetzen. Besonders problematisch ist OAuth auf LAN/VPS.

**So löst OmniRoute das Problem:**

- **Automatische Token-Aktualisierung** – OAuth-Tokens werden vor Ablauf im Hintergrund aktualisiert
- **OAuth 2.0 (PKCE) integriert** – Automatischer Ablauf für Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** – Mehrere Konten pro Anbieter über JWT/ID-Token-Extraktion
- **OAuth LAN/Remote Fix** – Private IP-Erkennung für `redirect_uri` + manueller URL-Modus für Remote-Server
- **OAuth Behind Nginx** – Verwendet `window.location.origin` für Reverse-Proxy-Kompatibilität
- **Remote OAuth Guide** – Schritt-für-Schritt-Anleitung für Google Cloud-Anmeldeinformationen auf VPS/Docker

</details>

<details>
<summary><b>📊 9. „Ich weiß nicht, wie viel ich ausgebe oder wo“</b></summary>

Entwickler nutzen mehrere kostenpflichtige Anbieter, haben jedoch keine einheitliche Sicht auf die Ausgaben. Jeder Anbieter verfügt über ein eigenes Abrechnungs-Dashboard, es gibt jedoch keine konsolidierte Ansicht. Unerwartete Kosten können sich häufen.

**So löst OmniRoute das Problem:**

- **Kostenanalyse-Dashboard** – Kostenverfolgung pro Token und Budgetverwaltung pro Anbieter
- **Budgetgrenzen pro Stufe** – Ausgabenobergrenze pro Stufe, die einen automatischen Fallback auslöst
- **Preiskonfiguration pro Modell** – Konfigurierbare Preise pro Modell- **Nutzungsstatistiken pro API-Schlüssel** – Anzahl der Anfragen und zuletzt verwendeter Zeitstempel pro Schlüssel
- **Analytics-Dashboard** – Statistikkarten, Modellnutzungsdiagramm, Anbietertabelle mit Erfolgsraten und Latenz

</details>

<details>
<summary><b>🐛 10. „Ich kann Fehler und Probleme bei KI-Anrufen nicht diagnostizieren“</b></summary>

Wenn ein Anruf fehlschlägt, weiß der Entwickler nicht, ob es sich um eine Ratenbegrenzung, ein abgelaufenes Token, ein falsches Format oder einen Anbieterfehler handelt. Fragmentierte Protokolle über verschiedene Terminals hinweg. Ohne Beobachtbarkeit ist das Debuggen ein Versuch und Irrtum.

**So löst OmniRoute das Problem:**

- **Unified Logs Dashboard** – 4 Registerkarten: Anforderungsprotokolle, Proxy-Protokolle, Audit-Protokolle, Konsole
- **Console Log Viewer** – Echtzeit-Viewer im Terminal-Stil mit farbcodierten Ebenen, automatischem Scrollen, Suche und Filter
- **SQLite-Proxy-Protokolle** – Persistente Protokolle, die Serverneustarts überdauern
- **Translator Playground** – 4 Debugging-Modi: Playground (Formatübersetzung), Chat Tester (Round-Trip), Test Bench (Batch), Live Monitor (Echtzeit)
- **Telemetrie anfordern** – p50/p95/p99-Latenz + X-Request-Id-Ablaufverfolgung
- **Dateibasierte Protokollierung mit Rotation** – Der Konsolen-Interceptor erfasst alles im JSON-Protokoll mit größenbasierter Rotation

</details>

<details>
<summary><b>🏗️ 11. „Die Bereitstellung und Wartung des Gateways ist komplex“</b></summary>

Die Installation, Konfiguration und Wartung eines KI-Proxys in verschiedenen Umgebungen (lokal, VPS, Docker, Cloud) ist arbeitsintensiv. Probleme wie hartcodierte Pfade, `EACCES` in Verzeichnissen, Portkonflikte und plattformübergreifende Builds sorgen für zusätzliche Reibung.

**So löst OmniRoute das Problem:**

- **npm globale Installation** – `npm install -g omniroute && omniroute` – fertig
- **Docker Multi-Platform** – AMD64 + ARM64 nativ (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose-Profile** – `base` (keine CLI-Tools) und `cli` (mit Claude Code, Codex, OpenClaw)
- **Electron Desktop App** – Native App für Windows/macOS/Linux mit Taskleiste, Autostart, Offline-Modus
- **Split-Port-Modus** – API und Dashboard auf separaten Ports für erweiterte Szenarien (Reverse-Proxy, Container-Netzwerk)
- **Cloud Sync** – Konfigurieren Sie die geräteübergreifende Synchronisierung über Cloudflare Workers
- **DB-Backups** – Automatische Sicherung, Wiederherstellung, Export und Import aller Einstellungen

</details>

<details>
<summary><b>🌍 12. „Die Benutzeroberfläche ist nur auf Englisch verfügbar und mein Team spricht kein Englisch“</b></summary>

Teams in nicht englischsprachigen Ländern, insbesondere in Lateinamerika, Asien und Europa, haben Probleme mit rein englischsprachigen Benutzeroberflächen. Sprachbarrieren verringern die Akzeptanz und erhöhen die Zahl von Konfigurationsfehlern.

**So löst OmniRoute das Problem:**

- **Dashboard i18n – 30 Sprachen** – Alle über 500 Tasten übersetzt, einschließlich Arabisch, Bulgarisch, Dänisch, Deutsch, Spanisch, Finnisch, Französisch, Hebräisch, Hindi, Ungarisch, Indonesisch, Italienisch, Japanisch, Koreanisch, Malaiisch, Niederländisch, Norwegisch, Polnisch, Portugiesisch (PT/BR), Rumänisch, Russisch, Slowakisch, Schwedisch, Thailändisch, Ukrainisch, Vietnamesisch, Chinesisch, Philippinisch, Englisch
- **RTL-Unterstützung** – Rechts-nach-links-Unterstützung für Arabisch und Hebräisch
- **Mehrsprachige READMEs** – 30 vollständige Dokumentationsübersetzungen
- **Sprachauswahl** – Globussymbol in der Kopfzeile zum Umschalten in Echtzeit</details>

<details>
<summary><b>🔄 13. „Ich brauche mehr als nur Chat – ich brauche Einbettungen, Bilder, Audio“</b></summary>

KI ist nicht nur der Abschluss eines Chats. Entwickler müssen Bilder generieren, Audio transkribieren, Einbettungen für RAG erstellen, Dokumente neu einordnen und Inhalte moderieren. Jede API hat einen anderen Endpunkt und ein anderes Format.

**So löst OmniRoute das Problem:**

- **Einbettungen** – `/v1/embeddings` mit 6 Anbietern und 9+ Modellen
- **Bildgenerierung** – `/v1/images/generations` mit 10 Anbietern und über 20 Modellen (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-zu-Video** – `/v1/videos/generations` – ComfyUI (AnimateDiff, SVD) und SD WebUI
- **Text-zu-Musik** – `/v1/music/generations` – ComfyUI (Stable Audio Open, MusicGen)
- **Audiotranskription** – `/v1/audio/transcriptions` – Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** – `/v1/audio/speech` – ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + bestehende Anbieter
- **Moderationen** – `/v1/moderations` – Überprüfung der Inhaltssicherheit
- **Neueinstufung** – `/v1/rerank` – Neueinstufung der Dokumentenrelevanz
- **Antwort-API** – Vollständige `/v1/responses`-Unterstützung für Codex

</details>

<details>
<summary><b>🧪 14. „Ich habe keine Möglichkeit, die Qualität verschiedener Modelle zu testen und zu vergleichen“</b></summary>

Entwickler möchten wissen, welches Modell für ihren Anwendungsfall am besten geeignet ist – Code, Übersetzung, Argumentation –, aber ein manueller Vergleich ist langsam. Es sind keine integrierten Evaluierungstools vorhanden.

**So löst OmniRoute das Problem:**

- **LLM-Bewertungen** – Golden-Set-Test mit 10 vorinstallierten Fällen zu Begrüßungen, Mathematik, Geografie, Codegenerierung, JSON-Konformität, Übersetzung, Markdown und Sicherheitsverweigerung
- **4 Match-Strategien** – `exact`, `contains`, `regex`, `custom` (JS-Funktion)
- **Translator Playground Test Bench** – Batch-Tests mit mehreren Eingaben und erwarteten Ausgaben, anbieterübergreifender Vergleich
- **Chat-Tester** – Vollständiger Roundtrip mit visueller Antwortwiedergabe
- **Live-Monitor** – Echtzeit-Stream aller Anfragen, die über den Proxy fließen

</details>

<details>
<summary><b>📈 15. „Ich muss skalieren, ohne an Leistung einzubüßen“</b></summary>

Wenn das Anfragevolumen wächst, verursachen dieselben Fragen ohne Zwischenspeicherung doppelte Kosten. Ohne Idempotenz verschwenden doppelte Anfragen die Verarbeitung. Die Tarifbegrenzungen pro Anbieter müssen eingehalten werden.

**So löst OmniRoute das Problem:**

- **Semantischer Cache** – Zweistufiger Cache (Signatur + Semantik) reduziert Kosten und Latenz
- **Request Idempotency** – 5-Sekunden-Deduplizierungsfenster für identische Anfragen
- **Ratenbegrenzungserkennung** – Provider-RPM, minimale Lücke und maximale gleichzeitige Verfolgung
- **Bearbeitbare Ratengrenzen** – Konfigurierbare Standardeinstellungen unter Einstellungen → Ausfallsicherheit mit Persistenz
- **API Key Validation Cache** – 3-stufiger Cache für Produktionsleistung
- **Gesundheits-Dashboard mit Telemetrie** – p50/p95/p99-Latenz, Cache-Statistiken, Betriebszeit

</details>

<details>
<summary><b>🤖 16. „Ich möchte das Modellverhalten global steuern“</b></summary>Entwickler, die alle Antworten in einer bestimmten Sprache oder mit einem bestimmten Ton wünschen oder die Argumentationstoken einschränken möchten. Dies in jedem Tool/jeder Anfrage zu konfigurieren, ist unpraktisch.

**So löst OmniRoute das Problem:**

- **System Prompt Injection** – Globale Eingabeaufforderung, die auf alle Anfragen angewendet wird
- **Thinking Budget Validation** – Reasoning-Token-Zuteilungskontrolle pro Anfrage (Passthrough, automatisch, benutzerdefiniert, adaptiv)
- **6 Routing-Strategien** – Globale Strategien, die bestimmen, wie Anfragen verteilt werden
- **Wildcard-Router** – `provider/*`-Muster leiten dynamisch an jeden Anbieter weiter
- **Combo-Aktivierung/Deaktivierung umschalten** – Combos direkt über das Dashboard umschalten
- **Provider Toggle** – Alle Verbindungen für einen Anbieter mit einem Klick aktivieren/deaktivieren
- **Blockierte Anbieter** – Bestimmte Anbieter aus der `/v1/models`-Liste ausschließen

</details>

<details>
<summary><b>🧰 17. „Ich brauche MCP-Tools als erstklassige Produktfunktionen“</b></summary>

Viele KI-Gateways stellen MCP nur als verstecktes Implementierungsdetail zur Verfügung. Teams benötigen eine sichtbare, überschaubare Betriebsebene.

**So löst OmniRoute das Problem:**

– MCP wird in der Dashboard-Navigation und auf der Registerkarte „Endpunktprotokoll“ angezeigt

- Dedizierte MCP-Verwaltungsseite mit Prozess, Tools, Bereichen und Audit
  – Integrierter Schnellstart für `omniroute --mcp` und Kunden-Onboarding

</details>

<details>
<summary><b>🧠 18. „Ich benötige A2A-Orchestrierung mit Synchronisierungs- und Stream-Aufgabenpfaden“</b></summary>

Agenten-Workflows erfordern sowohl direkte Antworten als auch eine lang andauernde gestreamte Ausführung mit Lebenszykluskontrolle.

**So löst OmniRoute das Problem:**

– A2A JSON-RPC-Endpunkt (`POST /a2a`) mit `message/send` und `message/stream`

- SSE-Streaming mit Terminal-State-Propagation
  – Task-Lebenszyklus-APIs für `tasks/get` und `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. „Ich benötige den echten Zustand des MCP-Prozesses, keinen erratenen Status“</b></summary>

Betriebsteams müssen wissen, ob MCP tatsächlich aktiv ist, und nicht nur, ob eine API erreichbar ist.

**So löst OmniRoute das Problem:**

– Laufzeit-Heartbeat-Datei mit PID, Zeitstempeln, Transport, Werkzeuganzahl und Oszilloskopmodus

- MCP-Status-API, die Heartbeat + aktuelle Aktivität kombiniert
- UI-Statuskarten für Prozess-/Verfügbarkeits-/Heartbeat-Aktualität

</details>

<details>
<summary><b>📋 20. „Ich benötige eine überprüfbare MCP-Tool-Ausführung“</b></summary>

Wenn Tools die Konfiguration verändern oder operative Aktionen auslösen, benötigen Teams forensische Rückverfolgbarkeit.

**So löst OmniRoute das Problem:**

– SQLite-gestützte Audit-Protokollierung für MCP-Tool-Aufrufe

- Filtert nach Tool, Erfolg/Misserfolg, API-Schlüssel und Paginierung
- Dashboard-Audit-Tabelle + Statistik-Endpunkte für die Automatisierung

</details>

<details>
<summary><b>🔐 21. „Ich benötige bereichsweise MCP-Berechtigungen pro Integration“</b></summary>

Verschiedene Clients sollten Zugriff auf die Werkzeugkategorien mit den geringsten Rechten haben.

**So löst OmniRoute das Problem:**

- 9 granulare MCP-Bereiche für kontrollierten Werkzeugzugriff
- Geltungsbereichsdurchsetzung und Sichtbarkeit in der MCP-Management-Benutzeroberfläche
- Sichere Standardhaltung für Betriebswerkzeuge

</details>

<details><summary><b>⚙️ 22. „Ich benötige Betriebskontrollen ohne erneute Bereitstellung“</b></summary>

Teams benötigen bei Vorfällen oder Kostenereignissen schnelle Laufzeitänderungen.

**So löst OmniRoute das Problem:**

- Schalten Sie die Combo-Aktivierung direkt über das MCP-Dashboard um
- Wenden Sie Ausfallsicherheitsprofile aus vordefinierten Richtlinienpaketen an
- Setzen Sie den Leistungsschalterstatus über dasselbe Bedienfeld zurück

</details>

<details>
<summary><b>🔄 23. „Ich benötige Live-Sichtbarkeit und Abbruch des A2A-Aufgabenlebenszyklus“</b></summary>

Ohne Sichtbarkeit des Lebenszyklus wird es schwierig, Aufgabenvorfälle zu selektieren.

**So löst OmniRoute das Problem:**

- Aufgabenliste/Filterung nach Bundesland/Fähigkeit mit Paginierung
- Drilldown zu Aufgabenmetadaten, Ereignissen und Artefakten
- Endpunkt zum Abbrechen von Aufgaben und UI-Aktion mit Bestätigung

</details>

<details>
<summary><b>🌊 24. „Ich benötige aktive Stream-Metriken für die A2A-Last“</b></summary>

Streaming-Workflows erfordern betriebliche Einblicke in Parallelität und Live-Verbindungen.

**So löst OmniRoute das Problem:**

- Aktive Stream-Zähler im A2A-Status integriert
- Zeitstempel der letzten Aufgabe und Anzahl pro Status
- A2A-Dashboard-Karten für die Echtzeit-Betriebsüberwachung

</details>

<details>
<summary><b>🪪 25. „Ich benötige Standard-Agent-Erkennung für Clients“</b></summary>

Externe Kunden und Orchestratoren benötigen für das Onboarding maschinenlesbare Metadaten.

**So löst OmniRoute das Problem:**

– Agentenkarte unter `/.well-known/agent.json` ausgestellt

- Fähigkeiten und Fertigkeiten werden in der Management-Benutzeroberfläche angezeigt
  – Die A2A-Status-API enthält Erkennungsmetadaten für die Automatisierung

</details>

<details>
<summary><b>🧭 26. „Ich benötige Protokollauffindbarkeit in der Produkt-UX“</b></summary>

Wenn Benutzer Protokolloberflächen nicht entdecken können, sinken Akzeptanz und Supportqualität.

**So löst OmniRoute das Problem:**

- Seitenleisteneinträge für MCP und A2A
- Registerkarte „Protokolle“ auf der Endpunktseite mit Schnellstart und Status
- Links von der Übersicht zu speziellen Management-Dashboards

</details>

<details>
<summary><b>🧪 27. „Ich benötige eine End-to-End-Protokollvalidierung mit echten Clients“</b></summary>

Probetests reichen nicht aus, um die Protokollkompatibilität vor der Veröffentlichung zu überprüfen.

**So löst OmniRoute das Problem:**

– E2E-Suite, die die App startet und echten MCP SDK-Client-Transport verwendet

- A2A-Clienttests für Erkennungs-, Sende-, Stream-, Get- und Abbruchflüsse
- Vergleichen Sie Behauptungen mit MCP-Audit- und A2A-Aufgaben-APIs

</details>

<details>
<summary><b>📡 28. „Ich brauche eine einheitliche Beobachtbarkeit über alle Schnittstellen hinweg“</b></summary>

Die Aufteilung der Beobachtbarkeit nach Protokoll führt zu blinden Flecken und einer längeren MTTR.

**So löst OmniRoute das Problem:**

- Einheitliche Dashboards/Protokolle/Analysen in einem Produkt
- Gesundheits-, Audit- und Anforderungstelemetrie über OpenAI-, MCP- und A2A-Ebenen hinweg
- Operative APIs für Status und Automatisierung

</details>

<details>
<summary><b>💼 29. „Ich benötige eine Laufzeit für Proxy + Tools + Agent-Orchestrierung“</b></summary>

Die Ausführung vieler separater Dienste erhöht die Betriebskosten und erhöht die Fehlerhäufigkeit.

**So löst OmniRoute das Problem:**- OpenAI-kompatibler Proxy, MCP-Server und A2A-Server in einem Stack
– Gemeinsame Authentifizierung, Ausfallsicherheit, Datenspeicher und Beobachtbarkeit

- Konsistentes Richtlinienmodell über alle Interaktionsoberflächen hinweg

</details>

<details>
<summary><b>🚀 30. „Ich muss Agenten-Workflows ohne Glue-Code-Ausbreitung versenden“</b></summary>

Teams verlieren an Geschwindigkeit, wenn sie mehrere Ad-hoc-Dienste und -Skripte zusammenfügen.

**So löst OmniRoute das Problem:**

- Einheitliche Endpunktstrategie für Kunden und Agenten
- Integrierte Protokollverwaltungs-Benutzeroberflächen und Rauchvalidierungspfade
- Produktionsreife Grundlagen (Sicherheit, Protokollierung, Ausfallsicherheit, Backup)

</details>

### Beispiel-Playbooks (Integrierte Anwendungsfälle)

**Playbook A: Bezahltes Abonnement maximieren + günstiges Backup**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Kostenfreier Codierungsstack**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7 Always-On-Fallback-Kette**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Agentenoperationen mit MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Schnellstart

### 1) Installieren und ausführen

```bash
npm install -g omniroute
omniroute
```

Das Dashboard wird unter `http://localhost:20128` geöffnet und die API-Basis-URL lautet `http://localhost:20128/v1`.

| Befehl                  | Beschreibung                                                        |
| ----------------------- | ------------------------------------------------------------------- |
| `omniroute`             | Server starten (`PORT=20128`, API und Dashboard auf demselben Port) |
| `omniroute --port 3000` | Setzen Sie den kanonischen/API-Port auf 3000                        |
| `omniroute --mcp`       | Starten Sie den MCP-Server (STDIO-Transport)                        |
| `omniroute --no-open`   | Browser nicht automatisch öffnen                                    |
| `omniroute --help`      | Hilfe anzeigen                                                      |

Optionaler Split-Port-Modus:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Verbinden Sie Anbieter und erstellen Sie Ihren API-Schlüssel

1. Öffnen Sie Dashboard → `Providers` und verbinden Sie mindestens einen Anbieter (OAuth oder API-Schlüssel).
2. Öffnen Sie Dashboard → `Endpoint` und erstellen Sie einen API-Schlüssel.
3. (Optional) Öffnen Sie Dashboard → `Combos` und legen Sie Ihre Fallback-Kette fest.

### 3) Richten Sie Ihr Codierungstool auf OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Funktioniert mit Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode und OpenAI-kompatiblen SDKs.

### 4) Protokolle aktivieren und validieren (v2.0)

**MCP (für werkzeuggesteuerte Vorgänge):**

```bash
omniroute --mcp
```

Verbinden Sie dann Ihren MCP-Client über `stdio` und testen Sie Tools wie:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (für Agent-zu-Agent-Workflows):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Alles durchgängig validieren (empfohlen)

```bash
npm run test:protocols:e2e
```

Diese Suite validiert echte MCP- und A2A-Client-Flows anhand einer laufenden App.

### Alternative: Von der Quelle ausführen

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

OmniRoute ist als öffentliches Docker-Image auf [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute) verfügbar.

**Schneller Lauf:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Mit Umgebungsdatei:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Verwendung von Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Bild                     | Tag      | Größe   | Beschreibung            |
| ------------------------ | -------- | ------- | ----------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250 MB | Neueste stabile Version |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 MB | Aktuelle Version        |

---

## 🖥️

Führen Sie OmniRoute als eigenständige Desktop-App aus – kein Terminal, kein Browser, keine Internetverbindung für lokale Modelle erforderlich. Die Electron-basierte App umfasst:

- 🖥️ **Natives Fenster** – Spezielles App-Fenster mit Integration in die Taskleiste
- 🔄 **Auto-Start** – OmniRoute bei der Systemanmeldung starten
- 🔔 **Native Benachrichtigungen** – Erhalten Sie Benachrichtigungen bei Kontingentausschöpfung oder Anbieterproblemen
- ⚡ **One-Click-Installation** – NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline-Modus** – Funktioniert vollständig offline mit dem gebündelten Server

### Schnellstart

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Systemablage

Wenn OmniRoute minimiert ist, befindet es sich mit schnellen Aktionen in Ihrer Taskleiste:

- Dashboard öffnen
- Server-Port ändern
- Anwendung beenden

📖 Vollständige Dokumentation: [`electron/README.md`](electron/README.md)

---

## 💰 Preise im Überblick

| Stufe                | Anbieter          | Kosten                                   | Kontingent zurücksetzen   | Am besten für          |
| -------------------- | ----------------- | ---------------------------------------- | ------------------------- | ---------------------- |
| **💳 ABO**           | Claude Code (Pro) | 20 $/Monat                               | 5h + wöchentlich          | Bereits abonniert      |
|                      | Codex (Plus/Pro)  | 20–200 $/Monat                           | 5h + wöchentlich          | OpenAI-Benutzer        |
|                      | Gemini CLI        | **KOSTENLOS**                            | 180.000/Monat + 1.000/Tag | Alle!                  |
|                      | GitHub-Copilot    | 10–19 $/Monat                            | Monatlich                 | GitHub-Benutzer        |
| **🔑 API-SCHLÜSSEL** | NVIDIA NIM        | **KOSTENLOS** (1000 Credits)             | Einmalig                  | Kostenlose Tier-Tests  |
|                      | DeepSeek          | Pay-per-Use                              | Keine                     | Bestes Preis/Qualität  |
|                      | Groq              | Kostenloses Kontingent + kostenpflichtig | Tarif begrenzt            | Ultraschnelle Inferenz |
|                      | xAI (Grok)        | Pay-per-Use                              | Keine                     | Grok-Modelle           |
|                      | Mistral           | Kostenloses Kontingent + kostenpflichtig | Tarif begrenzt            | Europäische KI         |
|                      | OpenRouter        | Pay-per-Use                              | Keine                     | Über 100 Modelle       |
| **💰 GÜNSTIG**       | GLM-4.7           | 0,6 $/1 Mio.                             | Täglich 10 Uhr            | Budgetsicherung        |
|                      | MiniMax M2.1      | 0,2 $/1 Mio.                             | 5-Stunden-Rollen          | Günstigste Option      |
|                      | Kimi K2           | $9/Monat pauschal                        | 10 Millionen Token/Monat  | Vorhersehbare Kosten   |
| **🆓 KOSTENLOS**     | iFlow             | $0                                       | Unbegrenzt                | 8 Modelle kostenlos    |
|                      | Qwen              | $0                                       | Unbegrenzt                | 3 Modelle kostenlos    |
|                      | Kiro              | $0                                       | Unbegrenzt                | Claude frei            |

**💡 Profi-Tipp:** Beginnen Sie mit der Kombination Gemini CLI (180.000 kostenlos/Monat) + iFlow (unbegrenzt kostenlos) = 0 $ Kosten!

---

## 💡 Hauptfunktionen

OmniRoute v2.0 ist als Betriebsplattform konzipiert und nicht nur als Relay-Proxy.

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Agenten- und Protokolloperationen (v2.0)| Funktion | Was es tut |

| ------------------------------------ | -------------------------------------------------------------------------------- |
| 🔧 **MCP-Server (16 Tools)** | IDE-/Agent-Tools steuern Routing, Zustand, Kombinationen, Grenzwerte und Vorgänge | IDE/agent tools via 3 transports: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`)
| 🤝 **A2A-Server (JSON-RPC + SSE)** | Ausführung von Agent-zu-Agent-Aufgaben mit Synchronisierungs- und Streaming-Flows |
| 🧭 **Consolidated Endpoints Page** | Dedizierte Verwaltungsseiten (`/dashboard/mcp`, `/dashboard/a2a`) |
| 🎚️ **Service Enable/Disable Toggles** | ON/OFF switches for MCP and A2A with settings persistence (default: OFF) |
| 🛰️ **MCP Runtime Heartbeat** | Echter Prozessstatus (PID, Betriebszeit, Heartbeat-Alter, Transport, Scope-Modus) |
| 📋 **MCP Audit Trail** | Filterbare Audit-Protokolle mit Erfolg/Misserfolg und Schlüsselzuordnung |
| 🔐 **Durchsetzung des MCP-Geltungsbereichs** | 9 granulare Umfangsberechtigungen für kontrollierten Werkzeugzugriff |
| 📡 **A2A Task Lifecycle Management** | Aufgaben auflisten/filtern, Ereignisse/Artefakte prüfen, laufende Aufgaben abbrechen |
| 📋 **Agentenkartenerkennung** | `/.well-known/agent.json` für die automatische Client-Erkennung |
| 🧪 **Protokoll-E2E-Testkabel** | Echtes MCP SDK + A2A-Client fließt in `test:protocols:e2e` |
| ⚙️ **Betriebskontrollen** | Schaltkombination, Anwenden von Resilienzprofilen, Zurücksetzen von Leistungsschaltern über eine Bedienoberfläche |

### 🧠 Routing und Intelligenz

| Funktion                                 | Was es tut                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------- |
| 🎯 **Intelligenter 4-Stufen-Fallback**   | Automatische Route: Abonnement → API-Schlüssel → Günstig → Kostenlos                  |
| 📊 **Kontingentverfolgung in Echtzeit**  | Live-Token-Zählung + Reset-Countdown pro Anbieter                                     |
| 🔄 **Formatübersetzung**                 | OpenAI ↔ Claude ↔ Gemini ↔ Antworten mit schemasicheren Konvertierungen               |
| 👥 **Unterstützung mehrerer Konten**     | Mehrere Konten pro Anbieter mit intelligenter Auswahl                                 |
| 🔄 **Automatische Token-Aktualisierung** | OAuth-Token werden bei Wiederholung automatisch aktualisiert                          |
| 🎨 **Benutzerdefinierte Kombinationen**  | 6 Ausgleichsstrategien + Fallback-Kettenkontrolle                                     |
| 🌐 **Wildcard-Router**                   | `provider/*` dynamisches Routing                                                      |
| 🧠 **Budgetkontrollen denken**           | Passthrough-, automatische, benutzerdefinierte und adaptive Reasoning-Grenzwerte      |
| 🔀 **Modell-Aliase**                     | Integrierte + benutzerdefinierte Modell-Aliasing- und Migrationssicherheit            |
| ⚡ **Hintergrundverschlechterung**       | Hintergrundaufgaben mit niedriger Priorität an günstigere Modelle weiterleiten        |
| 💬 **System-Prompt-Injektion**           | Globale Verhaltenskontrollen werden konsequent angewendet                             |
| 📄 **Antwort-API-Kompatibilität**        | Vollständige `/v1/responses`-Unterstützung für Codex und erweiterte Agenten-Workflows |

### 🎵 Multimodale APIs

| Funktion | Was es tut || -------------------------- | ------------------------------------------------------------- |
| 🖼️ **Bilderzeugung** | `/v1/images/generations` mit Cloud- und lokalen Backends |
| 📐 **Einbettungen** | `/v1/embeddings` für Such- und RAG-Pipelines |
| 🎤 **Audio-Transkription** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Text-to-Speech** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) |
| 🎬 **Videogenerierung** | `/v1/videos/generations` (ComfyUI + SD WebUI-Workflows) |
| 🎵 **Musikgeneration** | `/v1/music/generations` (ComfyUI-Workflows) |
| 🛡️ **Moderationen** | `/v1/moderations` Sicherheitsprüfungen |
| 🔀 **Neueinstufung** | `/v1/rerank` für Relevanzbewertung |

### 🛡️ Resilienz, Sicherheit und Governance

| Funktion                                 | Was es tut                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| 🔌 **Leistungsschalter**                 | Auslösung/Wiederherstellung auf Anbieterebene mit Schwellenwertkontrollen      |
| 🛡️ **Anti-Donnerende Herde**             | Mutex- und Semaphorschutz bei Wiederholungs-/Ratenereignissen                  |
| 🧠 **Semantik + Signatur-Cache**         | Kosten-/Latenzreduzierung mit zwei Cache-Schichten                             |
| ⚡ **Idempotenz anfordern**              | Doppeltes Schutzfenster                                                        |
| 🔒 **TLS-Fingerabdruck-Spoofing**        | Bessere Kompatibilität mit Anti-Bot-gefilterten Anbietern                      |
| 🌐 **IP-Filterung**                      | Zulassungs-/Blocklistenkontrolle für exponierte Bereitstellungen               |
| 📊 **Bearbeitbare Ratenlimits**          | Konfigurierbare globale/Provider-Level-Limits mit Persistenz                   |
| 🔑 **API-Schlüsselverwaltung + Scoping** | Sichere Schlüsselausgabe/-rotation und Modell-/Anbieterkontrollen              |
| 🛡️ **Geschützt `/models`**               | Optionales Authentifizierungs-Gating und Provider-Ausblenden für Modellkatalog |

### 📊 Beobachtbarkeit und Analyse

| Funktion                                 | Was es tut                                                          |
| ---------------------------------------- | ------------------------------------------------------------------- |
| 📝 **Anfrage + Proxy-Protokollierung**   | Vollständige Anfrage/Antwort- und Proxy-Protokollierung             |
| 📋 **Einheitliches Protokoll-Dashboard** | Anforderungs-, Proxy-, Audit- und Konsolenansichten auf einer Seite |
| 🔍 **Telemetrie anfordern**              | p50/p95/p99-Latenz und Anforderungsverfolgung                       |
| 🏥 **Gesundheits-Dashboard**             | Betriebszeit, Breaker-Zustände, Sperrungen, Cache-Statistiken       |
| 💰 **Kostenverfolgung**                  | Budgetkontrolle und Preistransparenz pro Modell                     |
| 📈 **Analysevisualisierungen**           | Einblicke in die Modell-/Anbieternutzung und Trendansichten         |
| 🧪 **Bewertungsrahmen**                  | Golden-Set-Test mit konfigurierbaren Match-Strategien               |

### ☁️ Bereitstellung und Plattform

| Funktion                                    | Was es tut                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------ | --- | ----------------------------- | ------------------------------------------------ |
| 🌐 **Überall bereitstellen**                | Localhost, VPS, Docker, Cloud-Umgebungen                                       |     | 💾 **Cloud-Synchronisierung** | Konfigurationssynchronisierung über Cloud Worker |
| 🔄 **Sichern/Wiederherstellen**             | Export-/Import- und Disaster-Recovery-Abläufe                                  |
| 🧙 **Onboarding-Assistent**                 | Erstmaliges geführtes Setup                                                    |
| 🔧 **CLI-Tools-Dashboard**                  | Ein-Klick-Setup für beliebte Codierungstools                                   |
| 🌐 **i18n (30 Sprachen)**                   | Vollständige Sprachunterstützung für Dashboard und Dokumente mit RTL-Abdeckung |
| 📂 **Benutzerdefiniertes Datenverzeichnis** | `DATA_DIR`-Überschreibung für Speicherort                                      |

### Feature Deep Dive

#### Smarter Fallback mit praktischer Kostenkontrolle

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Wenn Kontingent, Rate oder Integrität fehlschlagen, wechselt OmniRoute automatisch zum nächsten Kandidaten, ohne dass ein manueller Wechsel erforderlich ist.

#### Protokollverwaltung, die sichtbar und bedienbar ist

- MCP + A2A sind in der Benutzeroberfläche und in den Dokumenten erkennbar (nicht ausgeblendet)
  – Protokollstatus-APIs stellen Live-Betriebsdaten bereit (`/api/mcp/*`, `/api/a2a/*`)
- Dashboards umfassen Aktionen für Tag-2-Operationen (Kombinationsumschaltung, Zurücksetzen von Leistungsschaltern, Aufgabenabbruch).

#### Übersetzer- und Validierungsworkflow

Der Übersetzerbereich umfasst:

- **Spielplatz**: Transformationsprüfungen anfordern
- **Chat-Tester**: vollständiger Anfrage-/Antwort-Roundtrip
- **Prüfstand**: mehrere Fälle in einem Durchgang
- **Live Monitor**: Echtzeit-Verkehrsansicht

Plus Protokollvalidierung mit echten Clients über `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** – Tool-Referenz, IDE-Konfigurationen und Client-Beispiele
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** – Fähigkeiten, JSON-RPC-Methoden, Streaming und Aufgabenlebenszyklus

## 🧪 Bewertungen (Evals)

OmniRoute umfasst ein integriertes Bewertungsframework zum Testen der LLM-Antwortqualität anhand eines Golden Sets. Greifen Sie darauf über **Analytics → Evals** im Dashboard zu.

### Eingebautes goldenes Set

Das vorinstallierte „OmniRoute Golden Set“ enthält Testfälle für:

- Grüße, Mathematik, Geographie, Codegenerierung
- Einhaltung des JSON-Formats, Übersetzung, Markdown-Generierung
- Sicherheitsverweigerung (schädlicher Inhalt), Zählung, boolesche Logik

### Bewertungsstrategien

| Strategie  | Beschreibung                                                                                 | Beispiel                                |
| ---------- | -------------------------------------------------------------------------------------------- | --------------------------------------- |
| `exact`    | Die Ausgabe muss genau mit                                                                   | übereinstimmen `"4"`                    |
| `contains` | Die Ausgabe muss eine Teilzeichenfolge enthalten (Groß-/Kleinschreibung wird nicht beachtet) | `"Paris"`                               |
| `regex`    | Die Ausgabe muss mit dem Regex-Muster                                                        | übereinstimmen `"1.*2.*3"`              |
| `custom`   | Benutzerdefinierte JS-Funktion gibt true/false                                               | zurück `(output) => output.length > 10` |

---

## 📖 Einrichtungsanleitung

### Protokoll-Setup (MCP + A2A)

<details>
<summary><b>🧩 MCP-Setup (Modellkontextprotokoll)</b></summary>

Starten Sie den MCP-Transport im Standardmodus:

```bash
omniroute --mcp
```

Empfohlener Validierungsablauf:

1. Verbinden Sie Ihren MCP-Client über stdio.
2. Führen Sie `omniroute_get_health` aus.
3. Führen Sie `omniroute_list_combos` aus.
4. Öffnen Sie `/dashboard/mcp`, um Heartbeat, Aktivität und Audit zu bestätigen.

Nützliche APIs für die Automatisierung:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details><summary><b>🤝 A2A-Setup (Agent2Agent)</b></summary>

Entdecken Sie den Agenten:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Senden Sie eine Aufgabe:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Lebenszyklus verwalten:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Operative Benutzeroberfläche:

- `/dashboard/a2a` für Task-/Status-/Stream-Beobachtbarkeit und Smoke-Aktionen

</details>

<details>
<summary><b>🧪 End-to-End-Protokollvalidierung</b></summary>

Validieren Sie beide Protokolle mit echten Clients:

```bash
npm run test:protocols:e2e
```

Dies bestätigt:

- MCP SDK-Client-Verbindung/Liste/Anruf
- A2A-Erkennung/Senden/Streamen/Get/Abbrechen
- Vergleichen Sie die Daten in MCP-Audit- und A2A-Aufgabenverwaltungs-APIs

</details>

<details>
<summary><b>💳 Abonnementanbieter</b></summary>

### Claude Code (Pro/Max)

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

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (KOSTENLOS 180.000/Monat!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Bester Wert:** Riesiges kostenloses Kontingent! Verwenden Sie dies vor kostenpflichtigen Stufen.

### GitHub-Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 API-Schlüsselanbieter</b></summary>

### NVIDIA NIM (KOSTENLOSE 1000 Credits!)

1. Registrieren Sie sich: [build.nvidia.com](https://build.nvidia.com)
2. Holen Sie sich einen kostenlosen API-Schlüssel (1000 Inferenz-Credits inbegriffen)
3. Dashboard → Anbieter hinzufügen → NVIDIA NIM:
   - API-Schlüssel: `nvapi-your-key`

**Modelle:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` und über 50 weitere

**Profi-Tipp:** OpenAI-kompatible API – funktioniert nahtlos mit der Formatübersetzung von OmniRoute!

### DeepSeek

1. Registrieren Sie sich: [platform.deepseek.com](https://platform.deepseek.com)
2. Holen Sie sich den API-Schlüssel
3. Dashboard → Anbieter hinzufügen → DeepSeek

**Modelle:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (Kostenloses Kontingent verfügbar!)

1. Registrieren Sie sich: [console.groq.com](https://console.groq.com)
2. Holen Sie sich den API-Schlüssel (kostenloses Kontingent inbegriffen)
3. Dashboard → Anbieter hinzufügen → Groq

**Modelle:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Profi-Tipp:** Ultraschnelle Inferenz – am besten für Echtzeit-Codierung!

### OpenRouter (über 100 Modelle)

1. Registrieren Sie sich: [openrouter.ai](https://openrouter.ai)
2. Holen Sie sich den API-Schlüssel
3. Dashboard → Anbieter hinzufügen → OpenRouter

**Modelle:** Greifen Sie über einen einzigen API-Schlüssel auf über 100 Modelle aller großen Anbieter zu.

</details>

<details>
<summary><b>💰 Günstige Anbieter (Backup)</b></summary>

### GLM-4.7 (Täglicher Reset, 0,6 $/1 Mio.)

1. Registrieren: [Zhipu AI](https://open.bigmodel.cn/)
2. Holen Sie sich den API-Schlüssel vom Coding Plan
3. Dashboard → API-Schlüssel hinzufügen:
   - Anbieter: `glm`
   - API-Schlüssel: `your-key`

**Verwendung:** `glm/glm-4.7`

**Profi-Tipp:** Coding Plan bietet 3× Kontingent zu 1/7 Kosten! Täglich um 10:00 Uhr zurückgesetzt.

### MiniMax M2.1 (5 Stunden Zurücksetzen, 0,20 $/1 Mio.)

1. Registrieren: [MiniMax](https://www.minimax.io/)
2. Holen Sie sich den API-Schlüssel
3. Dashboard → API-Schlüssel hinzufügen

**Verwendung:** `minimax/MiniMax-M2.1`

**Profi-Tipp:** Günstigste Option für langen Kontext (1 Mio. Token)!

### Kimi K2 (9 $/Monat pauschal)

1. Abonnieren: [Moonshot AI](https://platform.moonshot.ai/)
2. Holen Sie sich den API-Schlüssel
3. Dashboard → API-Schlüssel hinzufügen

**Verwendung:** `kimi/kimi-latest`

**Profi-Tipp:** Feste 9 $/Monat für 10 Mio. Token = 0,90 $/1 Mio. effektive Kosten!

</details>

<details>
<summary><b>🆓 KOSTENLOSE Anbieter (Notfall-Backup)</b></summary>

### iFlow (8 KOSTENLOSE Modelle)```bash

Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
if/kimi-k2-thinking
if/qwen3-coder-plus
if/glm-4.7
if/minimax-m2
if/deepseek-r1

````

### Qwen (3 KOSTENLOSE Modelle)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
````

### Kiro (Claude KOSTENLOS)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Combos erstellen</b></summary>

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

</details>

<details>
<summary><b>🔧 CLI-Integration</b></summary>

### Cursor-IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Verwenden Sie die Seite **CLI-Tools** im Dashboard für die Ein-Klick-Konfiguration oder bearbeiten Sie `~/.claude/settings.json` manuell.

### Codex-CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Option 1 – Dashboard (empfohlen):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Option 2 – Manuell:** Bearbeiten `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Hinweis:** OpenClaw funktioniert nur mit lokaler OmniRoute. Verwenden Sie `127.0.0.1` anstelle von `localhost`, um Probleme mit der IPv6-Auflösung zu vermeiden.

### Cline / Weiter / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Schritt 1:** OmniRoute als benutzerdefinierten Anbieter hinzufügen:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Schritt 2:** Erstellen/bearbeiten Sie `opencode.json` in Ihrem Projektstamm:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**Schritt 3:** Wählen Sie das Modell in OpenCode aus:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tipp:** Fügen Sie alle in Ihrem OmniRoute `/v1/models`-Endpunkt verfügbaren Modelle zum Abschnitt `models` hinzu. Verwenden Sie das Format `provider/model-id` aus Ihrem OmniRoute-Dashboard.

</details>

---

## 🐛 Fehlerbehebung

<details>
<summary><b>Klicken Sie hier, um den Leitfaden zur Fehlerbehebung zu erweitern</b></summary>

**„Sprachmodell hat keine Nachrichten bereitgestellt“**

- Anbieterkontingent erschöpft → Überprüfen Sie den Dashboard-Kontingent-Tracker
- Lösung: Combo-Fallback verwenden oder auf günstigere Stufe wechseln

**Ratenbegrenzung**

- Abonnementkontingent aufgebraucht → Fallback auf GLM/MiniMax
- Kombination hinzufügen: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth-Token abgelaufen**

- Automatische Aktualisierung durch OmniRoute
- Wenn die Probleme weiterhin bestehen: Dashboard → Anbieter → Verbindung wiederherstellen

**Hohe Kosten**

- Überprüfen Sie die Nutzungsstatistiken im Dashboard → Kosten
- Primärmodell auf GLM/MiniMax umstellen
- Nutzen Sie das kostenlose Kontingent (Gemini CLI, iFlow) für unkritische Aufgaben

**Dashboard-/API-Ports sind falsch**

- `PORT` ist der kanonische Basisport (und standardmäßig API-Port)
  – `API_PORT` überschreibt nur OpenAI-kompatible API-Listener
  – `DASHBOARD_PORT` überschreibt nur Dashboard/Next.js-Listener
- Setzen Sie `NEXT_PUBLIC_BASE_URL` auf Ihr Dashboard/öffentliche URL (für OAuth-Rückrufe).

**Cloud-Synchronisierungsfehler**

– Überprüfen Sie, ob `BASE_URL` auf Ihre laufende Instanz verweist
– Überprüfen Sie, ob `CLOUD_URL` auf Ihren erwarteten Cloud-Endpunkt verweist
– Halten Sie die `NEXT_PUBLIC_*`-Werte an den serverseitigen Werten ausgerichtet

**Erste Anmeldung funktioniert nicht**

- Überprüfen Sie `INITIAL_PASSWORD` in `.env`
  – Wenn nicht festgelegt, lautet das Fallback-Passwort `123456`

**Keine Anfrageprotokolle**

- Setzen Sie `ENABLE_REQUEST_LOGS=true` in `.env`

**Verbindungstest zeigt „Ungültig“ für OpenAI-kompatible Anbieter**

– Viele Anbieter stellen keinen `/models`-Endpunkt bereit
– OmniRoute v1.0.6+ beinhaltet eine Fallback-Validierung über Chat-Abschlüsse
– Stellen Sie sicher, dass die Basis-URL das Suffix `/v1` enthält

### 🔐 OAuth auf Server Remoto

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ WICHTIG für den Einsatz von OmniRoute auf VPS/Docker/Remote-Servern**

#### OAuth

Als OAuth-Anmeldeinformationen wurde OmniRoute nicht in die Liste eingetragen. **Zugelassen für `localhost`**. Wenn Sie OmniRoute auf einem Remote-Server (z. B.

```
Error 400: redirect_uri_mismatch
```

#### Lösung: Konfigurieren Sie Ihre eigenen OAuth-Anmeldeinformationen

Sie schreiben bitte eine **OAuth 2.0-Client-ID** in der Google Cloud Console mit einem URI für Ihren Server.

#### Passo a Passo

**1. Zugriff auf die Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Rufen Sie eine neue OAuth 2.0-Client-ID auf**

- Klicken Sie auf **"+ Anmeldeinformationen erstellen"** → **"OAuth-Client-ID"**
- Anwendungstyp: **„Webanwendung“**
- Name: Escolha qualquer nome (z. B. `OmniRoute Remote`)

**3. Adicione als autorisierte Weiterleitungs-URIs**

Nein, **"Autorisierte Weiterleitungs-URIs"**, Zusatz:

```
https://seu-servidor.com/callback
```

> Ersetzen Sie `seu-servidor.com` durch die Domain oder die IP Ihres Servers (einschließlich eines Ports, der unbedingt erforderlich ist, z. B.: `http://45.33.32.156:20128/callback`).

**4. Als Anmeldedaten speichern und kopieren**

Anschließend hat Google die **Client-ID** und das **Client-Geheimnis** angezeigt.

**5. Als Umgebungsvariationen konfigurieren**

Kein `.env` (oder mehrere Docker-Umgebungsvarianten):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Neuzugang zu OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Dashboard → Anbieter → Antigravity (oder Gemini CLI) → OAuth

Jetzt hat Google die Nachricht an `https://seu-servidor.com/callback` weitergeleitet und eine Authentifizierungsfunktion durchgeführt.

---

#### Workaround vorübergehend (nicht vorab konfiguriert)

Wenn Sie vorab keine Berechtigung erhalten möchten, besteht die Möglichkeit, das **URL-Handbuch** zu verwenden:

1. OmniRoute ruft eine von Google autorisierte URL auf
2. Nachdem Sie den Autor autorisiert haben, sendet Google eine Weiterleitung an `localhost` (diese wird jedoch nicht vom Server weitergeleitet).
3. **Kopieren Sie eine vollständige URL**, um sie in Ihren Browser zu laden (bitte beachten Sie, dass die Seite noch nicht abgeschlossen ist).
4. Geben Sie die URL ein, die nicht zur Verbindung mit OmniRoute verwendet werden soll
5. Klicken Sie auf **„Verbinden“**

> Diese Problemumgehung funktioniert aufgrund des Autorisierungscodes auf der URL und ist unabhängig von der Weiterleitung oder Nicht-Weiterleitung gültig.

</details>

---

## 🛠️

<details>
<summary><b>Klicken Sie hier, um die Tech-Stack-Details zu erweitern</b></summary>

- **Laufzeit**: Node.js 18–22 LTS (⚠️ Node.js 24+ wird **nicht unterstützt** – native Binärdateien von `better-sqlite3` sind inkompatibel)
- **Sprache**: TypeScript 5.9 – **100 % TypeScript** für `src/` und `open-sse/` (null `any` in Kernmodulen seit Version 2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Datenbank**: LowDB (JSON) + SQLite (Domänenstatus + Proxy-Protokolle + MCP-Prüfung + Routing-Entscheidungen)
- **Schemas**: Zod (MCP-Tool-I/O-Validierung, API-Verträge)
- **Protokolle**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: Vom Server gesendete Ereignisse (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-Schlüssel + MCP-bezogene Autorisierung
- **Testen**: Node.js-Testläufer + Vitest (über 900 Tests einschließlich Einheit, Integration, E2E)- **CI/CD**: GitHub-Aktionen (automatische NPM-Veröffentlichung + Docker Hub bei Veröffentlichung)
- **Website**: [omniroute.online](https://omniroute.online)
- **Paket**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resilienz**: Leistungsschalter, exponentielles Backoff, Anti-Donner-Herde, TLS-Spoofing, automatische Kombinations-Selbstheilung

</details>

---

## 📖 Dokumentation

| Dokument                                         | Beschreibung                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------ |
| [Benutzerhandbuch](docs/USER_GUIDE.md)           | Anbieter, Kombinationen, CLI-Integration, Bereitstellung           |
| [API-Referenz](docs/API_REFERENCE.md)            | Alle Endpunkte mit Beispielen                                      |
| [MCP-Server](open-sse/mcp-server/README.md)      | 16 MCP-Tools, IDE-Konfigurationen, Python/TS/Go-Clients            |
| [A2A-Server](src/lib/a2a/README.md)              | JSON-RPC 2.0-Protokoll, Fähigkeiten, Streaming, Aufgabenverwaltung |
| [Auto-Combo-Engine](docs/auto-combo.md)          | 6-Faktor-Bewertung, Moduspakete, Selbstheilung                     |
| [Fehlerbehebung](docs/TROUBLESHOOTING.md)        | Häufige Probleme und Lösungen                                      |
| [Architektur](docs/ARCHITECTURE.md)              | Systemarchitektur und Interna                                      |
| [Beitrag](CONTRIBUTING.md)                       | Entwicklungsaufbau und Richtlinien                                 |
| [OpenAPI-Spezifikation](docs/openapi.yaml)       | OpenAPI 3.0-Spezifikation                                          |
| [Sicherheitsrichtlinie](SECURITY.md)             | Schwachstellenmeldung und Sicherheitspraktiken                     |
| [VM-Bereitstellung](docs/VM_DEPLOYMENT_GUIDE.md) | Vollständige Anleitung: VM + Nginx + Cloudflare-Setup              |
| [Features-Galerie](docs/FEATURES.md)             | Visuelle Dashboard-Tour mit Screenshots                            |
| [Release-Checkliste](docs/RELEASE_CHECKLIST.md)  | Validierungsschritte vor der Veröffentlichung                      |

---

## 🗺️

Für OmniRoute sind **210+ Funktionen** in mehreren Entwicklungsphasen geplant. Hier sind die Schlüsselbereiche:

| Kategorie                      | Geplante Funktionen | Höhepunkte                                                                                             |
| ------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------ |
| 🧠 **Routing & Intelligenz**   | 25+                 | Routing mit der niedrigsten Latenz, Tag-basiertes Routing, Quoten-Preflight, P2C-Kontoauswahl          |
| 🔒 **Sicherheit & Compliance** | 20+                 | SSRF-Härtung, Credential-Cloaking, Ratenbegrenzung pro Endpunkt, Verwaltungsschlüssel-Scoping          |
| 📊 **Beobachtbarkeit**         | 15+                 | OpenTelemetry-Integration, Echtzeit-Kontingentüberwachung, Kostenverfolgung pro Modell                 |
| 🔄 **Anbieterintegrationen**   | 20+                 | Dynamische Modellregistrierung, Anbieter-Abklingzeiten, Multi-Account-Codex, Copilot-Kontingentanalyse |
| ⚡ **Leistung**                | 15+                 | Duale Cache-Schicht, Prompt-Cache, Antwort-Cache, Streaming-Keepalive, Batch-API                       |
| 🌐 **Ökosystem**               | 10+                 | WebSocket-API, Hot-Reload der Konfiguration, verteilter Konfigurationsspeicher, kommerzieller Modus    |

### 🔜 Bald erhältlich- 🔗 **OpenCode-Integration** – Native Anbieterunterstützung für die OpenCode AI-Codierungs-IDE

- 🔗 **TRAE-Integration** – Volle Unterstützung für das TRAE AI-Entwicklungsframework
- 📦 **Batch-API** – Asynchrone Stapelverarbeitung für Massenanfragen
- 🎯 **Tag-basiertes Routing** – Leiten Sie Anfragen basierend auf benutzerdefinierten Tags und Metadaten weiter
- 💰 **Niedrigste Kostenstrategie** – Wählen Sie automatisch den günstigsten verfügbaren Anbieter aus

> 📝 Vollständige Funktionsspezifikationen verfügbar in [`docs/new-features/`](docs/new-features/) (217 detaillierte Spezifikationen)

---

## 👥 Mitwirkende

[![Mitwirkende](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### So leisten Sie einen Beitrag

1. Forken Sie das Repository
2. Erstellen Sie Ihren Feature-Zweig (`git checkout -b feature/amazing-feature`)
3. Übernehmen Sie Ihre Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Zweig (`git push origin feature/amazing-feature`)
5. Öffnen Sie eine Pull-Anfrage

Detaillierte Richtlinien finden Sie unter [CONTRIBUTING.md](CONTRIBUTING.md).

### Veröffentlichung einer neuen Version

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Sterngeschichte

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Danksagungen

Besonderer Dank geht an **[9router](https://github.com/decolua/9router)** von **[decolua](https://github.com/decolua)** – das ursprüngliche Projekt, das diesen Fork inspiriert hat. OmniRoute baut auf dieser unglaublichen Grundlage mit zusätzlichen Funktionen, multimodalen APIs und einer vollständigen Neufassung von TypeScript auf.

Besonderer Dank geht an **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** – die ursprüngliche Go-Implementierung, die diese JavaScript-Portierung inspiriert hat.

---

## 📄 Lizenz

MIT-Lizenz – Einzelheiten finden Sie unter [LIZENZ](LICENSE).

---

<div align="center">
  <sub>BErstellt mit ❤️ für Entwickler, die rund um die Uhr programmieren</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub Discussions enabled for community Q&A -->
