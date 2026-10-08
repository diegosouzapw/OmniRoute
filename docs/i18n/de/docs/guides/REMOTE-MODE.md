# Remote Mode (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Führe die `omniroute`-CLI auf deinem Laptop aus, während OmniRoute selbst an einem anderen Ort läuft
(einem VPS, einem Heimserver oder einem anderen Rechner in deinem Tailnet). Du meldest dich einmal mit
`omniroute connect` an, und von da an richtet sich **jeder** CLI-Befehl an diesen entfernten
Server — dieselben Befehle, dieselbe Ausgabe, nur gegen den entfernten Server ausgeführt.

Es muss kein zweites Tool installiert werden: Der Remote-Modus verwendet die reguläre `omniroute`-CLI
zusammen mit bereichsbeschränkten **Zugriffstokens**.

```bash
npm install -g omniroute                 # die normale CLI
omniroute connect 192.168.0.15           # anmelden (Passwort → bereichsbeschränktes Token)
omniroute models list                    # ← listet jetzt die Modelle des ENTFERNTEN Servers auf
omniroute configure codex                # ← erstellt ein lokales Codex-Profil aus dem entfernten Katalog
```

---

## Funktionsweise

```
dein Laptop                               entfernter OmniRoute-Server (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute-CLI      │  POST /api/cli/connect  (Passwort → Token)         │
│  Kontext: vps      │ ───────────────►  │ stellt ein bereichsbeschränktes│
│  baseUrl, Token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ Zugriffstoken aus; jede Verwal-│
│ schreibt Konfigu-  │ ◄───────────────  │ tungsroute wird gemäß Token-   │
│ rationen LOKAL     │                   │ bereich geprüft                │
└────────────────────┘                   └───────────────────────────────┘
```

- **Kontexte** speichern jeweils einen Server (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` wechselt den aktiven Server; `default` ist lokal.
- **Zugriffstokens** (`oma_live_…`) autorisieren Verwaltungsbefehle. Sie unterscheiden
  sich von Inferenz-API-Schlüsseln (`sk-…`, verwendet für `/v1/chat/completions`).
- Serverseitig wird nur der SHA-256-Hash eines Tokens gespeichert. Der Klartext wird
  bei der Erstellung **einmalig** angezeigt.

---

## Verbindung herstellen

### Mit dem Verwaltungspasswort (Bootstrap)

```bash
omniroute connect 192.168.0.15
# Verwaltungspasswort für http://192.168.0.15:20128: ********
# ✔ Verbunden mit http://192.168.0.15:20128 — Kontext '192.168.0.15' (Berechtigungsbereich: admin)
```

Der Passwortablauf stellt standardmäßig ein **admin**-Token aus (da du das Passwort
besitzt, hast du bereits vollständige Kontrolle). Schränke den Berechtigungsbereich mit `--scope` ein:

```bash
omniroute connect 192.168.0.15 --scope write
```

Optionen: `--port <p>` (wenn der Host keinen Port enthält), `--name <ctx>` (Kontextname),
`--scope read|write|admin`. Eine vollständige URL wird unverändert übernommen:
`omniroute connect https://omni.example.com`.

### Mit einem zuvor generierten Token

Generiere im Dashboard (oder mit `omniroute tokens create`) ein bereichsbeschränktes Token und
füge es ein — kein Passwort erforderlich:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

Die CLI validiert es über `GET /api/cli/whoami` und speichert es als aktiven Kontext.

---

## Berechtigungsbereiche

Drei hierarchische Stufen (`admin ⊃ write ⊃ read`):

| Berechtigungsbereich | Erlaubte Aktionen                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `read`               | auflisten/prüfen — `models list`, `providers status`, `logs`, `usage`, `cost`               |
| `write`              | lesen **+** konfigurieren/anwenden — `setup-codex`, `keys add`, `config set`, Kombinationen |
| `admin`              | schreiben **+** verwalten — `tokens`-CRUD, Anbieter hinzufügen, Dienste, Richtlinien, oauth |

Der Server leitet den für jede Route erforderlichen Berechtigungsbereich aus der HTTP-Methode
(`GET`→read, Änderungen→write) sowie einer admin-Positivliste für sensible Bereiche ab
(`/api/cli/tokens`, Änderungen an `/api/providers`, `/api/oauth`, `/api/services`, …).
Ein Token mit unzureichendem Berechtigungsbereich erhält den Status `403` mit einer eindeutigen Meldung.

> Routen, die Prozesse starten (`/api/services/*`, `/api/mcp/*`, …), bleiben
> **ausschließlich über Loopback erreichbar** — ein entferntes Token kann sie unabhängig von seinem Berechtigungsbereich niemals erreichen.

---

## Antigravity mit einer Remote-Installation verbinden

Antigravity verwendet Googles Zustimmungsbildschirm für Erstanbieter-/native Apps. Google gibt den Autorisierungscode nur frei, wenn die **Loopback-Weiterleitung**
(`http://127.0.0.1:<port>/callback`) **für den Browser erreichbar ist, in dem die
Anmeldung bestätigt wird**. Bei einer Installation auf einem Remote-VPS befindet
sich dieser Loopback auf dem Server und nicht auf Ihrem Computer. Deshalb bleibt
der Zustimmungsbildschirm **für immer hängen und gibt niemals einen Code aus** —
für die übliche Ausweichlösung „Callback-URL einfügen“ gibt es also nichts
einzufügen. (Dies ist eine Einschränkung aufseiten von Google: Dasselbe Problem
tritt bei jedem Proxy auf, der den mitgelieferten Antigravity-Desktop-Client
verwendet, nicht nur bei OmniRoute.)

Das Dashboard erkennt dies, bevor Sie stecken bleiben: Wenn Sie **Providers → Antigravity →
Connect** über eine Adresse öffnen, die nicht localhost ist, wird der allgemeine Hinweis
„Callback-URL kopieren“ durch die beiden nachfolgenden Lösungen ersetzt, wobei Host
und Port bereits für Sie eingetragen sind. (Auch eine LAN-Adresse zählt —
`192.168.x.x` ist im Hinblick auf diesen Callback nicht localhost.)

Es gibt zwei unterstützte Möglichkeiten, Antigravity mit einer Remote-Instanz von
OmniRoute zu verbinden.

### Option A — lokaler Anmelde-Helper (empfohlen)

Führen Sie OAuth auf **Ihrem eigenen Computer** aus, auf dem `127.0.0.1` erreichbar
ist. Der Helper kommuniziert direkt mit Google, sodass die Zustimmung dort
abgeschlossen werden kann, wo dies mit der Dashboard-Version nicht möglich ist.

**Wenn Sie bereits verbunden sind** (`omniroute connect <host>`), müssen Sie nichts
kopieren — der Helper übermittelt die Zugangsdaten automatisch an diese
Installation:

```bash
# Auf Ihrem LOKALEN Computer (benötigt Node.js und einen Browser):
omniroute connect 192.168.0.15        # einmalig — erstellt ein kontextbezogenes Token mit Administratorrechten
npx omniroute login antigravity
#   ↳ öffnet die Google-Zustimmung, erfasst den Callback über einen lokalen Loopback-Port,
#     tauscht ihn aus und sendet die Zugangsdaten per POST an den aktiven Kontext:
#
#   Antigravity wurde unter http://192.168.0.15:20128 verbunden (Verbindung abc123).
#   Sie müssen nichts einfügen — Sie können dieses Terminal schließen.
```

Die Übertragung erfolgt automatisch, wenn der aktive Kontext auf einen anderen
Computer verweist. Erzwingen Sie das gewünschte Verhalten mit `--push` /
`--no-push`, oder geben Sie mit `--context <name>` einen bestimmten Kontext an.

**Wenn Ihr Computer den VPS nicht erreichen kann** (Firewall, kein SSH,
physisch getrennte Arbeitsstation), funktioniert der Helper trotzdem — er
_benötigt_ lediglich eine Verbindung zu Google. Verwenden Sie `--no-push`, oder
lassen Sie die Übertragung einfach fehlschlagen: Statt eine bereits
abgeschlossene Autorisierung zu verwerfen, wird ersatzweise der Blob ausgegeben.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Öffnen Sie anschließend im **Remote-Dashboard**: **Providers → Antigravity → Connect**,
und fügen Sie den `omniroute-cred-v1.…`-Blob in das Feld unter **Schritt 2** ein
(es akzeptiert entweder eine Callback-URL oder einen Zugangsdaten-Blob). OmniRoute
dekodiert ihn, führt das Cloud-Code-Onboarding serverseitig aus und speichert die
Verbindung dauerhaft.

> Der Blob enthält ein Aktualisierungstoken — behandeln Sie ihn wie ein Passwort.
> Bei der Übertragung wird er einmalig über die authentifizierte Verbindung Ihres
> Kontexts gesendet; beim Einfügen wird er über Ihre Dashboard-Verbindung
> übertragen. In beiden Fällen wird er im Ruhezustand verschlüsselt gespeichert,
> und bei einer erfolgreichen Übertragung wird er niemals in Ihrem Terminal
> ausgegeben.

Optionen: `--no-browser` (URL ausgeben, statt sie automatisch zu öffnen),
`--port <n>` (Loopback-Port festlegen), `--timeout <ms>`, `--push` /
`--no-push` (automatische Übermittlung überschreiben), `--context <name>`
(einen bestimmten Kontext als Ziel verwenden).

### Option B — lokaler SSH-Weiterleitungstunnel

Wenn Sie SSH-Zugriff auf den VPS haben, leiten Sie den Dashboard-Port weiter,
damit der Loopback-Callback über den Tunnel zurück zum Server gelangt:

```bash
# Auf Ihrem LOKALEN Computer:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# Öffnen Sie anschließend http://localhost:20128 in Ihrem LOKALEN Browser und verbinden Sie Antigravity
# wie gewohnt — die Weiterleitung zu 127.0.0.1:20128/callback erreicht den VPS nun über SSH.
```

Da Sie über `localhost:20128` auf das Dashboard zugreifen, wird die Google-Zustimmung
abgeschlossen und der Callback über denselben Tunnel an den Server übermittelt —
ein Blob ist nicht erforderlich. Lassen Sie den Tunnel geöffnet, bis die
Verbindung als aktiv angezeigt wird.

Anders als bei den nachfolgend beschriebenen Anbietern mit festem Loopback
**genügt hier eine einzige Weiterleitung**: Der Antigravity-Callback verwendet den
Dashboard-Port selbst, sodass kein zweiter, anbieterspezifischer Port getunnelt
werden muss.

> Eine vollständig monitorlose Alternative (ohne Helper und ohne Tunnel) besteht
> darin, **eigene** Google-OAuth-Web-Zugangsdaten und eine öffentliche Basis-URL zu
> konfigurieren; siehe die OAuth-Umgebungsvariablen des Anbieters. Für die beiden
> oben beschriebenen Optionen ist keine zusätzliche Google-Konfiguration
> erforderlich.

---

## Codex / Grok mit einer Remote-Installation verbinden (Anbieter mit festem Loopback)

Codex, xAI (`xai-oauth`) und Grok CLI (`grok-cli`) registrieren bei ihrer vorgelagerten OAuth-App eine **feste** Loopback-`redirect_uri`. OmniRoute kann sie nicht ändern — der Anbieter leitet den Browser immer an dieselbe fest codierte Adresse zurück:

| Anbieter    | Fester Callback, an den der Anbieter weiterleitet |
| ----------- | ------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`             |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                 |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                 |

`localhost` bezeichnet hier **den Rechner, auf dem der Browser ausgeführt wird**, während der PKCE-Callback-Server von OmniRoute auf der Loopback-Schnittstelle des **Servers** lauscht. Wenn Sie das Dashboard über eine LAN-Adresse wie `http://192.168.0.15:20128` öffnen, treffen die beiden nie aufeinander: Der Autorisierungscode wird an `localhost:1455` Ihres eigenen Laptops übermittelt, wo nichts lauscht, und der Anbieter bricht die Anmeldung ab, ohne einen Fehler anzuzeigen.

Das Dashboard erkennt dies, bevor das Pop-up geöffnet wird, und zeigt den Tunnelbefehl an, statt die Anmeldung ohne sichtbare Fehlermeldung scheitern zu lassen (#8046).

### Lösung — **beide** Ports weiterleiten

```bash
# Auf dem Rechner, auf dem der BROWSER ausgeführt wird:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# Öffnen Sie anschließend http://localhost:20128 und verbinden Sie Codex von dort aus
```

Es sind zwei Weiterleitungen erforderlich; auch die Weiterleitung nur eines Ports schlägt weiterhin fehl:

- **`20128`** (der Dashboard-Port) sorgt dafür, dass der Ursprung tatsächlich localhost ist, wodurch OmniRoute den PKCE-Callback-Server überhaupt erst startet — bei einem LAN-Ursprung wird dieser Zweig nie erreicht.
- **`1455`** (der feste Callback-Port des Anbieters) ist das Ziel, an das der Browser zurückgeleitet wird; dieser Port muss per Tunnel zur Loopback-Schnittstelle des Servers weitergeleitet werden.

Ersetzen Sie beim Verbinden mit xAI oder Grok CLI `1455` durch `56121`/`56122` und `20128` durch den tatsächlichen Port Ihres Dashboards. Lassen Sie den Tunnel geöffnet, bis die Verbindung als aktiv angezeigt wird.

> **Kein SSH-Zugriff?** Codex und Grok CLI akzeptieren auch ein eingefügtes Token — über den Reiter **Paste API
> Key** / **Import auth.json** im Verbindungsdialog. Dieser Weg verwendet keinen Loopback-Callback und funktioniert daher unabhängig vom Ursprung. Codex akzeptiert zusätzlich ein reines Zugriffstoken oder einen `~/.codex/auth.json`-Sitzungsblock.

---

## Tokens verwalten

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ gibt das Geheimnis EINMAL aus — kopieren Sie es jetzt
omniroute tokens list                 # maskiert: ID, Name, Geltungsbereich, Präfix, Status, Ablaufdatum
omniroute tokens revoke <id|prefix>   # sofort widerrufen
omniroute tokens scopes               # die drei Geltungsbereiche erläutern
```

`tokens`-Befehle erfordern Admin-Anmeldedaten. Sie können Tokens auch im Dashboard unter **Settings → Access Tokens** verwalten (erstellen, widerrufen, einmalig kopieren).

---

## Eine Coding-CLI aus dem Remote-Katalog konfigurieren

`omniroute configure` liest den aktuellen Modellkatalog des **aktiven Servers** und schreibt eine Konfiguration auf **Ihrem** Rechner.

```bash
omniroute configure codex
#   Anbieter: glm, kmc, ollamacloud, opencode-go, …
#   Anbieter: glm
#   Modell-ID: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml geschrieben
#   Verwendung:  codex --profile glm52

# nicht interaktiv
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# ein häufig verwendetes Modell am Anfang der interaktiven Auswahl beibehalten
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Die Auswahl speichert ausschließlich Modell-IDs (niemals URLs oder Anmeldedaten) in der lokalen Datei `model-preferences.json`, getrennt nach Kontext und CLI-Ziel. Favoriten werden vor den zuletzt ausgewählten Einträgen angezeigt; verwenden Sie `--unfavorite`, um ein ausgewähltes Modell aus der Liste für diesen Kontext und dieses Ziel zu entfernen.

Das erstellte Profil verweist über eine Umgebungsvariable (`OMNIROUTE_API_KEY`) auf den Inferenzschlüssel — das Geheimnis wird niemals auf den Datenträger geschrieben. Informationen zur einmaligen Codex-Basiskonfiguration (dem Block `[model_providers.omniroute]`) finden Sie unter [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Eine CLI für die Remote-Instanz starten (ohne Konfiguration zu schreiben)

`omniroute run <target>` berücksichtigt ebenfalls den aktiven Kontext: Die Remote-Basis-URL und die Anmeldedaten des Kontexts werden ausschließlich in den gestarteten Prozess injiziert.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → Remote-Instanz
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Exakte Vorschau dessen, was gestartet würde (nur NAMEN der Umgebungsvariablen, niemals Werte):
omniroute run codex --dry-run --json
```

Ziele: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` (zentrale Quelle: `bin/cli/cli-manifest.mjs`). Qwen und Gemini werden mit einem temporären, isolierten Home-Verzeichnis ausgeführt, das beim Beenden entfernt wird. Dadurch greift der Start niemals auf Ihre persönliche Tool-Konfiguration zu und hinterlässt dort auch keine Daten.

### CLI-spezifische Einrichtungsbefehle

Jede unterstützte CLI verfügt über einen Remote-fähigen Einrichtungsbefehl (alle berücksichtigen den aktiven Kontext oder `--remote <url> --api-key <key>`):

| CLI         | Befehl                     | Was geschrieben wird                                                                                                                                                                                                 |
| ----------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml`-Profile (pro Modell)                                                                                                                                                                   |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (pro Modell)                                                                                                                                                               |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — der OpenAI-kompatible `omniroute`-Provider mit allen Katalogmodellen (Ausführung mit `opencode -m omniroute/<model>`)                                                           |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI-Modus) + gibt die einzufügenden VS-Code-Erweiterungseinstellungen aus (OpenAI-kompatibel, Basis-URL **ohne** `/v1`)                                                  |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS-Code-Einstellungen `kilocode.*` — OpenAI-kompatibel, Basis-URL **mit** `/v1`                                                                                              |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn`-CLI) — `provider: openai`, `apiBase` **mit** `/v1`, Schlüssel über `${{ secrets.OMNIROUTE_API_KEY }}`                                                            |
| Cursor      | `omniroute setup-cursor`   | gibt die Schritte in der App aus (Einstellungen → Modelle → OpenAI-Basis-URL überschreiben **mit** `/v1` + Schlüssel + Modell). Die Cursor-Konfiguration ist eine undurchsichtige SQLite-Datenbank — nur Chatbereich |
| Roo Code    | `omniroute setup-roo`      | schreibt eine Roo-Import-JSON-Datei (`~/.omniroute/roo-settings.json`) + setzt `roo-cline.autoImportSettingsPath` + gibt UI-Schritte aus (OpenAI-kompatibel, Basis-URL **mit** `/v1`)                                |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat`-Provider, `base_url` **mit** `/v1`, Schlüssel über `$OMNIROUTE_API_KEY`                                                                                               |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **ohne** `/v1` + `GOOSE_MODEL`) + Umgebungsvariablen-Anleitung                                                                                |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **ohne** `/v1` + `model: openai/<id>`) + Umgebungsvariablen-Anleitung (`aider --message --yes`)                                                                               |
| Qwen Code   | `omniroute setup-qwen`     | V4-Eintrag `modelProviders.openai` in `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                                                                |

```bash
# OpenCode (OpenAI-kompatibler Provider, alle Katalogmodelle, entfernter VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # nur übereinstimmende Modelle behalten
opencode -m omniroute/glm/glm-5.2 "..."          # zuerst OMNIROUTE_API_KEY exportieren
```

> OpenCode bietet außerdem eine umfangreichere **Plugin**-Integration: `omniroute setup opencode`
> (jetzt über `--remote` für entfernte Systeme geeignet) installiert `@omniroute/opencode-plugin`.
> `setup-opencode` ist die schlanke OpenAI-kompatible Alternative. Auf den API-Schlüssel
> wird über `{env:OMNIROUTE_API_KEY}` verwiesen — er wird niemals auf die Festplatte geschrieben.
>
> Verwende unter OpenCode v2 stattdessen `@omniroute/opencode-plugin-v2`: gleicher Katalog,
> aber ein anderer Loader-Vertrag. Es liest den Schlüssel aus OpenCodes eigenem Anmeldedaten-
> speicher, wenn die Integration verbunden ist, sodass ein entferntes Gateway überhaupt keinen
> Schlüssel in `opencode.json` benötigt.

---

## Kontexte verwalten (zwischen Servern wechseln)

Ein **Kontext** ist ein gespeicherter Server (baseUrl + Anmeldeinformationen + Geltungsbereich). `omniroute connect`
erstellt einen und macht ihn aktiv; von da an zielt jeder Befehl auf diesen. Verwalten und
wechseln Sie zwischen ihnen mit `omniroute contexts`:

```bash
omniroute contexts list            # alle Kontexte; der aktive ist mit ● markiert
omniroute contexts current         # der aktive Server, Authentifizierungsstatus, Geltungsbereich
```

```text
  | Name    | Base URL                  | Auth  | Scope     | Description
● | vps     | http://100.67.86.91:20128 | token | admin     | Entfernter OmniRoute (…)
  | default | http://localhost:20128    | ✗     |           |
```

**Server wechseln** — jeder nachfolgende Befehl folgt dem aktiven Kontext:

```bash
omniroute contexts use vps         # → alle Befehle treffen nun den entfernten VPS
omniroute tokens list              #   (wird gegen den VPS ausgeführt)

omniroute contexts use default     # → zurück zu localhost
omniroute tokens list              #   (wird gegen den lokalen Server ausgeführt)
```

**Kontext manuell hinzufügen** (anstelle von `connect`), inspizieren oder umbenennen:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # vollständige Details für einen Kontext
omniroute contexts rename staging stg
```

**Kontext entfernen** — fordert zur Bestätigung auf; übergeben Sie `--yes`, um dies zu überspringen
(erforderlich für Skripte / nicht-interaktive Shells, die sonst sicher ablehnen):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) kann nicht entfernt werden. Das Entfernen des aktiven Kontexts führt zum Fallback auf
> `default`. Tipp: Das Entfernen eines Kontexts löscht nur die **lokal** gespeicherten Anmeldeinformationen —
> widerrufen Sie das Token auf dem Server mit `omniroute tokens revoke <id>`, um den Zugriff tatsächlich
> zu beenden.

**Kontexte exportieren / importieren** (z.B. um sie zwischen Maschinen zu verschieben). Exporte lassen
Anmeldeinformationen standardmäßig aus, einschließlich der durch den Dateifallback gespeicherten Anmeldeinformationen.
Verwenden Sie `--include-secrets` explizit, wenn ein portables Backup mit Anmeldeinformationen benötigt wird:

```bash
omniroute contexts export --out contexts.json     # geschwärzt; Standardziel: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # überschreiben; --merge, um bestehende zu behalten
omniroute contexts migrate --yes                  # alte Klartext-Tokens in den Schlüsselbund verschieben
```

`--include-secrets` löst Schlüsselbundreferenzen vor dem Export auf und schlägt fehl, wenn eine
referenzierte Anmeldeinformation nicht gelesen werden kann. `--no-secrets` hat immer Vorrang.
Exportdateien werden atomar mit dem Modus `0600` geschrieben. Behandeln Sie einen expliziten,
geheime Informationen enthaltenden Export als geheimes Material. Auf Headless-Systemen ohne
verwendbaren OS-Schlüsselbund greift die CLI auf `config.json` mit dem Modus `0600` zurück und
gibt eine einmalige Warnung aus; ein Standardexport bleibt in diesem Modus geschwärzt.

---

## Schnelle End-to-End-Prüfung

Ein kopierbarer vollständiger Ablauf, um eine Remote-Einrichtung von Grund auf zu prüfen — verbinden, ein
Token mit eingeschränktem Geltungsbereich erstellen, einen Befehl weiterleiten, zurückwechseln und die Einrichtung abbauen. Ersetzen Sie
`192.168.0.15` durch den Hostnamen/die IP-Adresse Ihres Servers (Tailscale, LAN oder eine öffentliche
`https://…`-URL).

```bash
# 1. Verbinden (Passwort → Admin-Token, gespeichert als Kontext, der aktiviert wird)
omniroute connect 192.168.0.15                 # oder: --key oma_live_xxxx  (kein Passwort)
omniroute contexts current                     # zeigt den entfernten Server und den Geltungsbereich an

# 2. Verwenden — Verwaltungsbefehle werden jetzt auf dem entfernten Server ausgeführt
omniroute tokens create --name laptop --scope read   # ein stärker eingeschränktes Token erstellen
omniroute tokens list                                 # maskierte Liste vom entfernten Server

# 3. Hin- und herwechseln
omniroute contexts use default                 # → lokal
omniroute contexts use 192-168-0-15            # → wieder remote (Name aus `contexts list`)

# 4. Einrichtung abbauen. HINWEIS: `contexts remove` löscht nur die LOKALEN Anmeldedaten —
#    das Token auf dem Server wird NICHT widerrufen. Widerrufen Sie es zuerst serverseitig,
#    wenn Sie den Zugriff tatsächlich sperren möchten.
omniroute tokens revoke <id|prefix>            # sperrt den Zugriff auf dem Server
omniroute contexts remove 192-168-0-15 --yes   # lokalen Kontext löschen (selbst wenn aktiv → Rückgriff auf default), keine Abfrage
```

> `--yes` führt `contexts remove` nicht interaktiv aus (erforderlich in Skripten/CI; ohne
> diese Option lehnt eine nicht interaktive Shell den Vorgang sicher ab, anstatt zu hängen). Beim Entfernen des
> **aktiven** Kontexts wird automatisch auf `default` zurückgegriffen.

---

## Sicherheitshinweise

- Der Token-Klartext wird nur einmal angezeigt; dauerhaft gespeichert wird lediglich der SHA-256-Hash (wie bei API-Schlüsseln).
- `omniroute connect` verwendet dieselbe Sperre gegen Brute-Force-Anmeldeversuche und dieselbe Audit-Protokollierung.
- Verwenden Sie für den Transport vorzugsweise HTTPS oder ein Tailnet; bei Angabe eines reinen Hosts wird für die bequeme Nutzung im LAN bzw. über Tailscale standardmäßig `http://`
  verwendet — übergeben Sie für TLS eine vollständige `https://…`-URL.
- Die bevorzugte lokale Kontextdatei ist `~/.omniroute/config.json` (`chmod 600`)
  und enthält ausschließlich eine `credentialRef`; der Token selbst wird im
  Schlüsselbund des Betriebssystems (`keytar`) gespeichert und niemals in Protokollen
  ausgegeben. Headless-Installationen ohne funktionsfähigen nativen Schlüsselbund verwenden
  als ausdrückliche Ausweichlösung dieselbe Datei mit den Berechtigungen `0600` und
  geben einmalig eine Warnung aus. Führen Sie nach der Installation eines
  Schlüsselbund-Backends `omniroute contexts migrate --yes` aus.

---

## API-Endpunkte (Referenz)

| Methode | Route                 | Authentifizierung   | Berechtigungsumfang               |
| ------- | --------------------- | ------------------- | --------------------------------- |
| POST    | `/api/cli/connect`    | Verwaltungspasswort | — (öffentlich, passwortgeschützt) |
| GET     | `/api/cli/whoami`     | Zugriffstoken       | Lesen                             |
| GET     | `/api/cli/tokens`     | Zugriffstoken       | Administration                    |
| POST    | `/api/cli/tokens`     | Zugriffstoken       | Administration                    |
| DELETE  | `/api/cli/tokens/:id` | Zugriffstoken       | Administration                    |

Die vollständigen Schemas finden Sie in [openapi.yaml](../openapi.yaml).
