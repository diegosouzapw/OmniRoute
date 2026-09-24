# CLI Integrations (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute bietet eine Reihe von `setup-*`-Befehlen, die eine Coding-CLI
(Codex, Claude Code, OpenCode, Cline, …) so konfigurieren, dass sie OmniRoute als Backend verwendet — dadurch
kommuniziert das Tool mit **einem** Endpunkt, und OmniRoute leitet Anfragen mit
automatischem Fallback an den richtigen Anbieter weiter. Jeder Befehl liest den **aktuellen** Modellkatalog einer laufenden
OmniRoute-Instanz (lokal oder remote) und schreibt die eigene Konfigurationsdatei des Tools auf **Ihrem**
Rechner. Der API-Schlüssel wird über eine Umgebungsvariable referenziert, sofern das Tool
dies unterstützt. Befehle, die eine lokale Umgebungsdatei des Tools dauerhaft speichern, sind unten entsprechend gekennzeichnet.

Darüber hinaus gibt es einen generischen Launcher — `omniroute run <target>` —, der
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` oder `gemini` mit den
passenden injizierten Umgebungsvariablen startet, ohne dabei eine Konfiguration zu schreiben. Ziele und ihre
Aliase stammen aus dem kanonischen Manifest `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), und `omniroute completion` bietet
dieselben aus dem Manifest abgeleiteten Zielbezeichnungen. Die bisherigen tool-spezifischen Launcher —
`omniroute launch` (Claude Code) und `omniroute launch-codex` (Codex) — bleiben
verfügbar.

Das Onboarding von Anbietern ist im selben lokalen bzw. Remote-Kontext verfügbar. Die
nachstehenden API-orientierten Befehle trennen die Verwaltungsauthentifizierung von den
Anbieter-Zugangsdaten und geben Zugangsdaten niemals in strukturierten Ausgaben aus:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Bevorzugen Sie für Skripte `--credential-stdin` oder `--credential-env`;
`--credential` bleibt für die kontrollierte lokale Verwendung erhalten. `providers remove` erfordert
auf einem nicht interaktiven Terminal `--yes`, und alle fünf Befehle berücksichtigen den aktiven Kontext oder die
globalen Optionen `--base-url`/`--api-key`.

Informationen zur einmaligen, manuell erstellten Basiskonfiguration der beiden umfangreichsten Integrationen finden Sie in den
ausführlichen Anleitungen zu den jeweiligen Tools:

- [Claude-Code-Konfiguration](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex-CLI-Konfiguration](./CODEX-CLI-CONFIGURATION.md)
- [Remote-Modus](./REMOTE-MODE.md) — steuern Sie eine Remote-OmniRoute-Instanz (VPS / Tailnet) von Ihrem Laptop aus
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — die OmniCopilot-Erweiterung; sie kann diese
  `setup-*`-Befehle auch innerhalb des Editors für Sie ausführen

---

## Haupttabelle

Jeder Befehl berücksichtigt den **aktiven Kontext** (festgelegt mit `omniroute connect`, siehe
[Remote-Modus](./REMOTE-MODE.md)) oder explizite Flags vom Typ `--remote <url> --api-key <key>`.
„Lokal gegenüber remote“ bedeutet nachstehend: Ohne Flags wird `http://localhost:20128`
verwendet; mit `--remote` (oder einem aktiven Remote-Kontext) wird der Katalog von diesem
Server abgerufen und die Konfiguration lokal geschrieben.

| Befehl                     | Tool                         | Was geschrieben wird                                                                                                                                                                                       | Wichtige Flags                                                                                                                             | Lokal vs. remote |
| -------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — ein Profil pro kompatiblem Textmodell (`codex --profile <name>`)                                                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Beides           |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — ein Profil pro übereinstimmendem Modell (`CLAUDE_CONFIG_DIR`)                                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Beides           |
| `omniroute setup-opencode` | OpenCode (OpenAI-kompatibel) | `~/.config/opencode/opencode.json` — `omniroute`-Provider mit jedem Katalogmodell (`opencode -m omniroute/<model>`)                                                                                        | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Beides           |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI-Modus) + gibt Einstellungen für die VS-Code-Erweiterung aus                                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Beides           |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + führt `kilocode.*` mit den VS-Code-`settings.json` zusammen, sofern vorhanden                                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Beides           |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — Modelle mit `provider: openai`, Schlüssel über `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Beides           |
| `omniroute setup-cursor`   | Cursor                       | Nichts — gibt die innerhalb der Anwendung auszuführenden Schritte aus (die Cursor-Konfiguration ist eine undurchsichtige SQLite-Datenbank)                                                                 | `--remote` `--api-key` `--only` `--port`                                                                                                   | Beides           |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (Importdokument) + setzt `roo-cline.autoImportSettingsPath`, wenn VS-Code-`settings.json` vorhanden ist                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Beides           |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat`-Provider, Schlüssel über `$OMNIROUTE_API_KEY`                                                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Beides           |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + gibt eine Anleitung für die Umgebungsvariablen aus                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Beides           |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + gibt eine Anleitung für die Umgebungsvariablen aus                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Beides           |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4-Array `modelProviders.openai` + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Beides           |
| `omniroute setup-5dive`    | 5dive (Agentenflotte)        | Nichts unter `$HOME` — schreibt über `5dive agent auth set` ein **Authentifizierungsprofil** für 5dive (`/var/lib/5dive/auth-profiles/<name>/`); nur als root, wird auf dem Flottenhost ausgeführt         | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Beides           |
| `omniroute run <target>`   | Laufzeitstart (generisch)    | Nichts — startet `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` mit der richtigen Umgebung und den richtigen Argumenten; Qwen und Gemini verwenden ein temporäres isoliertes Home-Verzeichnis | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Beides           |
| `omniroute launch`         | Claude Code                  | Nichts — startet `claude` mit injiziertem `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                                      | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Beides           |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Nichts — startet `codex` mit dem über `-c`-Flags injizierten `omniroute`-Provider                                                                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Beides           |

Hinweise zu den Flags (im Quellcode des Befehls verifiziert):

- `--remote <url>` — ruft den Katalog von einer entfernten OmniRoute-Instanz ab (überschreibt `--port`
  und den aktiven Kontext). `--api-key <key>` stellt die Anmeldedaten für diesen
  Server bereit (standardmäßig aus der Umgebungsvariable `OMNIROUTE_API_KEY` oder dem Token des aktiven Kontexts).
- `--only <patterns>` — kommagetrennte Teilzeichenfolgen; behält nur Modell-IDs bei, die übereinstimmen
  (z. B. `--only glm,kimi`). Verfügbar für `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — gibt exakt aus, was geschrieben würde, ohne das
  Dateisystem zu verändern. Verfügbar für jeden `setup-*`-Befehl **außer** `setup-cursor`
  (der niemals eine Datei schreibt).
- `--model <id>` — erforderlich (oder interaktiv ausgewählt) für Werkzeuge ohne
  automatische Modellerkennung: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Diese Werkzeuge
  akzeptieren auch `--yes` für nicht interaktive Ausführungen (wobei dann `--model` erforderlich ist).
  `setup-opencode` verwendet `--model`, um das standardmäßige Modell auf oberster Ebene festzulegen.
- `--model <id>` bei `omniroute run` folgt der zielspezifischen Verdrahtung des Manifests
  (`bin/cli/cli-manifest.mjs`): **aider** erhält `--model openai/<id>` und
  **opencode** `--model omniroute/<id>` (das Präfix wird nur hinzugefügt, wenn die ID
  es nicht bereits enthält); **qwen** und **gemini** erhalten die ID unverändert;
  **claude** erhält sie über `ANTHROPIC_MODEL`, **goose** über `GOOSE_MODEL` und
  **codex** über `-c model_providers.omniroute.*`-Argumente. **Qwen ist das einzige Ausführungsziel,
  das `--model` zwingend erfordert** — `omniroute run qwen` ohne dieses Flag wird
  mit einer ausdrücklichen Fehlermeldung und dem Exit-Code `2` beendet.
- `--port <port>` — lokaler OmniRoute-Port (standardmäßig `20128`, wird ignoriert, wenn `--remote`
  gesetzt ist). Bei allen `setup-*`-Befehlen und beiden Startbefehlen vorhanden.
- Exit-Codes von `omniroute run`: Der eigene Exit-Code der untergeordneten CLI wird
  unverändert weitergegeben; `2` = ungültige Argumente (nicht unterstütztes Ziel, fehlendes erforderliches
  `--model`, Container-Schutz); `127` = die ausführbare Zieldatei befindet sich nicht in `PATH`;
  `130`/`143`/`129`, wenn der Start durch `SIGINT`/`SIGTERM`/`SIGHUP` beendet wird;
  `1` = sonstiger Laufzeitfehler beim Start.
- Die beiden Startbefehle (`launch`, `launch-codex`) akzeptieren `--profile <name>`, um
  ein von `setup-claude` / `setup-codex` geschriebenes Profil auszuwählen, sowie weitergereichte Argumente für
  die zugrunde liegende ausführbare Datei `claude` / `codex`.

Die interaktive Auswahl wird auch von den Einrichtungsabläufen gemeinsam verwendet:

```bash
# Aus dem aktiven lokalen oder entfernten Modellkatalog auswählen und das Ziel konfigurieren.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegiert derzeit an die getesteten Abläufe für `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` und `5dive`.
Reine IDE-,
MITM- und reine Anleitungs-Katalogeinträge bleiben explizite `setup-*`-/manuelle Abläufe und
werden nicht als ausführbare Ziele angeboten.

> `setup-opencode` ist die **leichtgewichtige OpenAI-kompatible** OpenCode-Integration.
> Es gibt außerdem eine funktionsreichere Plugin-Integration — `omniroute setup opencode` —, die
> `@omniroute/opencode-plugin` installiert. Dies sind unterschiedliche Befehle; die obige Tabelle
> dokumentiert `setup-opencode`.
>
> Das Plugin ist in zwei Paketen verfügbar, eines pro OpenCode-Hauptversion, da die beiden
> Loader unterschiedliche Einstiegspunkte erwarten:
> `@omniroute/opencode-plugin` für OpenCode v1 und
> `@omniroute/opencode-plugin-v2` für OpenCode v2. Das v2-Paket ist neu
> (`0.1.0`) und folgt einem Host-Vertrag, der sich noch verändert. Daher liest es die
> Struktur, die OpenCode in den Katalogentwurf einfügt, anstatt eine bestimmte Struktur vorauszusetzen. Installieren
> Sie es, indem Sie einen `plugins`-Eintrag zu `opencode.json` hinzufügen; `omniroute setup opencode`
> installiert weiterhin das v1-Paket. Optionen und die Reihenfolge für die Suche nach Anmeldedaten sind in
> der README des Pakets dokumentiert.

---

## Lokale Verwendung

Wenn OmniRoute auf `localhost:20128` läuft, führen Sie einfach den Einrichtungsbefehl für Ihr
Tool aus. Der Katalog wird vom lokalen Server abgerufen.

```bash
# Codex: Für jedes passende Modell ein Profil unter ~/.codex/ schreiben
omniroute setup-codex
codex --profile glm52            # ein generiertes Profil verwenden

# Claude Code: Modellspezifische Profile schreiben und anschließend eines starten
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: Den OpenAI-kompatiblen Provider mit allen Katalogmodellen schreiben
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # wird über {env:OMNIROUTE_API_KEY} referenziert, niemals auf der Festplatte gespeichert
opencode -m omniroute/glm/glm-5.2 "..."

# Tools ohne automatische Erkennung benötigen ein explizites Modell:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Vorschau, ohne etwas zu schreiben:
omniroute setup-continue --dry-run
```

Starten, ohne irgendeine Konfiguration zu schreiben (nur Umgebungsvariablen-Injektion):

```bash
omniroute launch                 # Claude Code → lokales OmniRoute
omniroute launch-codex           # Codex CLI → lokales OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Expliziter Befehlspfad: Alles nach -- unverändert weiterreichen
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Remote-Verwendung

Richten Sie jeden Einrichtungsbefehl mit `--remote` + `--api-key` auf ein entferntes OmniRoute. Der
Katalog wird vom Remote-System abgerufen; die Konfiguration wird auf Ihrem lokalen Rechner geschrieben.

```bash
# OpenCode für einen Remote-VPS; nur glm/kimi-Modelle behalten
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # zuerst OMNIROUTE_API_KEY exportieren

# Codex-Profile aus einem Remote-Katalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Eine CLI direkt für das Remote-System starten
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Statt `--remote`/`--api-key` jedes Mal zu übergeben, melden Sie sich einmal an und lassen Sie
sie automatisch durch den **aktiven Kontext** bereitstellen:

```bash
omniroute connect 192.168.0.15        # erstellt ein Token mit begrenztem Gültigkeitsbereich und speichert den Kontext
omniroute setup-codex                 # ← verwendet jetzt den Remote-Katalog
omniroute setup-opencode              # ← ebenso
omniroute launch                      # ← Claude Code für das Remote-System
```

Informationen zu Kontexten, Gültigkeitsbereichen und Token-Verwaltung finden Sie unter [Remote-Modus](./REMOTE-MODE.md).

---

## 5dive-Agentenflotten

[5dive](https://5dive.ai) betreibt eine Flotte langlebiger Coding-Agenten, von denen jeder als
systemd-Unit unter einem eigenen Unix-Benutzer ausgeführt wird. Es ist selbst keine Coding-CLI, daher gibt es
für `omniroute run` nichts zu starten — `5dive` ist ein Ziel, das **nur konfiguriert** wird.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Beide Varianten schreiben ein 5dive-**Authentifizierungsprofil**, und jeder an dieses
Profil gebundene `claude`-Seat kommuniziert anschließend mit OmniRoute. Drei Aspekte sind speziell für dieses Ziel:

- **Es wird auf dem Flottenhost als root ausgeführt.** Die Befehle von 5dive wirken auf lokale systemd-Units
  und ein root gehörendes Statusverzeichnis; einen Remote-Modus gibt es nicht. Das Rezept führt sich über
  `sudo` erneut aus, wenn es nicht bereits als root läuft (`--no-sudo` deaktiviert dies und gibt stattdessen den
  Befehl aus).
- **Der Endpunkt muss `https://` verwenden, sofern es sich nicht um eine Loopback-Adresse handelt.** Der API-Schlüssel des Agenten
  wird bei jeder Anfrage über diese URL übertragen, und 5dive lehnt einen unverschlüsselten externen Endpunkt ab.
  Eine private LAN-Adresse stellt keine Ausnahme dar.
- **Die eigene Modellfestlegung jedes Seats hat Vorrang vor dem Profil.** Das Profil enthält
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, aber ein Seat, der weiterhin auf eine Standard-
  Modell-ID festgelegt ist, bricht seinen ersten Durchlauf mit _"There's an issue with the selected model"_ ab.
  Übergeben Sie `--agent <name>` (wiederholbar), um auch die Seats festzulegen; andernfalls gibt das Rezept den
  entsprechenden Befehl aus.

Der API-Schlüssel wird 5dive über **stdin** (`--api-key=-`) übergeben, sodass er niemals in der
Ausgabe von `ps` erscheint.

Indem das Profil statt auf ein einzelnes Modell auf eine OmniRoute-**Kombination** verweist,
erhält die Flotte Provider-Failover: Als der primäre Endpunkt während des in
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) dokumentierten Durchlaufs mitten in einer Ausführung
vollständig ausfiel, führte der Agent seine verbleibenden Schritte über das Fallback aus, ohne
den Ausfall offenzulegen.

---

## Base-URL-Konventionen (welche Tools `/v1` erwarten)

OmniRoute stellt die OpenAI-Schnittstelle unter `/v1`, die Anthropic-Schnittstelle im Stammverzeichnis
und eine native Gemini-Schnittstelle unter `/v1beta` bereit. Jede Integration ist für die Form konfiguriert,
die ihr Tool erwartet (im Quellcode des Befehls verifiziert):

| Integration                                                                | Geschriebene Base-URL | `/v1`?                                         |
| -------------------------------------------------------------------------- | --------------------- | ---------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | Stammverzeichnis      | Nein — Cline hängt `/v1/chat/completions` an   |
| `setup-goose` (`OPENAI_HOST`)                                              | Stammverzeichnis      | Nein — Goose hängt den Pfad an                 |
| `setup-aider` (`OPENAI_API_BASE`)                                          | Stammverzeichnis      | Nein — LiteLLM hängt `/v1/chat/completions` an |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | mit `/v1`             | Ja                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | Stammverzeichnis      | Nein — Claude Code hängt `/v1/messages` an     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | mit `/v1`             | Ja                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | mit `/v1`             | Ja                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | Stammverzeichnis      | Nein — das SDK hängt `/v1beta/models/…` an     |
| `setup-5dive` (`ANTHROPIC_BASE_URL` im Authentifizierungsprofil)           | Stammverzeichnis      | Nein — Claude Code hängt `/v1/messages` an     |

---

## Native Abhängigkeiten bei Updates beibehalten: `--include=optional`

Wenn Sie mit `omniroute update` aktualisieren (nach einer Bestätigung oder mit `--apply`),
führt OmniRoute die Installation mit dem fest integrierten Parameter `--include=optional` aus:

```bash
npm install -g omniroute@latest --include=optional
```

Dies ist **kein** Parameter, den Sie an `omniroute update` übergeben — er wird vom
Updater immer angewendet. Dadurch ist gewährleistet, dass die `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, der LLMLingua-SLM-Stack) das Update überstehen,
selbst wenn in Ihrer npm-Konfiguration `omit=optional` festgelegt ist. Andernfalls würden
der native SQLite-Treiber und die Betriebssystem-Schlüsselbundanbindung ohne Hinweis
entfernt. So zeigen Sie den genauen Befehl in der Vorschau an, ohne ihn auszuführen:

```bash
omniroute update --dry-run
# [TESTLAUF] Würde Folgendes ausführen: npm install -g omniroute@latest --include=optional
```

Weitere Parameter für `omniroute update` (im Quellcode verifiziert): `--check` (Beenden mit
Status 1, wenn veraltet), `--apply` (ohne Rückfrage installieren), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI über `omniroute run gemini`

Der Vertrag wurde anhand von `@google/gemini-cli` 0.50.0 verifiziert: Die CLI berücksichtigt
`GOOGLE_GEMINI_BASE_URL` und sendet `POST /v1beta/models/<model>:generateContent`
(und `:streamGenerateContent?alt=sse`) dorthin — exakt die native Gemini-Schnittstelle
von OmniRoute (`/v1beta`). `omniroute run gemini` konfiguriert dies automatisch:

- `GOOGLE_GEMINI_BASE_URL` → die aktive OmniRoute-Base-URL (Stammverzeichnis, kein `/v1`);
- `GEMINI_API_KEY` → die aufgelösten OmniRoute-Anmeldedaten (Option/Umgebung/Kontext);
- ein **temporäres, isoliertes `GEMINI_CLI_HOME`**, dessen `.gemini/settings.json`
  die Authentifizierung `gemini-api-key` auswählt, sodass eine gespeicherte Google-OAuth-Sitzung
  (Code Assist) den an OmniRoute gerichteten Start niemals überschreibt — nach dem Beenden entfernt;
- **Umgebungshygiene**: Aus der Kindprozessumgebung werden `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` und `GOOGLE_GENAI_USE_GCA` entfernt (da diese die
  Authentifizierung zu Vertex/Code Assist umleiten würden), und
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` wird als zusätzliche Absicherung gesetzt —
  die anderen `run`-Ziele werden für ihre jeweiligen kollidierenden Variablen genauso behandelt;
- Einfügung von `--model <id>` aus `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminis Schutzmechanismus für das Vertrauen in Arbeitsbereiche gilt weiterhin im Headless-Modus —
übergeben Sie selbst `--skip-trust` (oder vertrauen Sie dem Verzeichnis interaktiv); der Launcher
umgeht diesen Schutz bewusst nicht. Dieser Launcher unterscheidet sich von der **ACP-Registrierung**
(`src/lib/acp/registry.ts`, `gemini --acp`), die weiterhin die Agentenprotokoll-Integration für
`/dashboard/acp-agents` darstellt.

---

## Echter Smoke-Durchlauf (Opt-in)

Deterministische Regressionstests für den Startplan werden in CI ausgeführt (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Um die ECHTEN Binärdateien gegen einen ECHTEN
OmniRoute-Server zu validieren, steht unter
`tests/integration/upstream-cli-smoke.int.test.ts` ein optionales Test-Harness zur Verfügung. Es wird niemals automatisch ausgeführt
(jeder Untertest wird übersprungen, sofern nicht `RUN_CLI_SMOKE=1` gesetzt ist), übergibt die Anmeldedaten über den NAMEN der Umgebungsvariable
(niemals über den Wert), schwärzt schlüsselähnliche Zeichenfolgen in allen aufgezeichneten Ausgaben, überspringt
Ziele, deren Binärdatei nicht installiert ist, und klassifiziert Fehler als
Authentifizierungs- / Upstream- / Konfigurationsfehler statt als einfachen booleschen Wert:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Optional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` beschränkt den Durchlauf;
`OMNIROUTE_SMOKE_TIMEOUT_MS` überschreibt das Zeitlimit von 120 Sekunden pro Ziel.

---

## Siehe auch

- [Claude-Code-Konfiguration](./CLAUDE-CODE-CONFIGURATION.md) — der ausführlichere Leitfaden zu Claude Code
- [Codex-CLI-Konfiguration](./CODEX-CLI-CONFIGURATION.md) — die einmalige Basiseinrichtung von `[model_providers.omniroute]`
- [Remote-Modus](./REMOTE-MODE.md) — Kontexte, bereichsgebundene Zugriffstoken und die Steuerung eines Remote-Servers
- [CLI-Tools-Referenz](../reference/CLI-TOOLS.md) — der vollständige Katalog der unterstützten Tools und Dashboard-Seiten
- [Einrichtungsleitfaden](./SETUP_GUIDE.md) — Installationsmethoden und Ersteinrichtung
