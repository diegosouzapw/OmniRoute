# Průvodce nastavením nástrojů CLI — OmniRoute

Tato příručka vysvětluje, jak nainstalovat a nakonfigurovat všechny podporované nástroje CLI pro kódování umělé inteligence
tak, aby **OmniRoute** fungoval jako jednotný backend, což vám umožní centralizovanou správu klíčů,
sledování nákladů, přepínání modelů a protokolování požadavků napříč všemi nástroji.

---

## Jak to funguje

```
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Kiro / Cursor / Copilot
            │
            ▼  (všechny ukazují na OmniRoute)
    http://VASE_SERVER:20128/v1
            │
            ▼  (OmniRoute směruje ke správnému poskytovateli)
     Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**Výhody:**

- Jeden API klíč pro správu všech nástrojů
- Sledování nákladů napříč všemi CLI v dashboardu
- Přepínání modelů bez nutnosti překonfigurování každého nástroje
- Funguje lokálně i na vzdálených serverech (VPS)

---

## Podporované nástroje (Zdroj pravdy v dashboardu)

Karty dashboardu v `/dashboard/cli-tools` jsou generovány z `src/shared/constants/cliTools.ts`.
Aktuální seznam (v3.0.0-rc.16):

| Nástroj            | ID            | Příkaz       | Režim nastavení | Metoda instalace |
| ------------------ | ------------- | ------------ | --------------- | ---------------- |
| **Claude Code**    | `claude`      | `claude`     | env             | npm              |
| **OpenAI Codex**   | `codex`       | `codex`      | custom          | npm              |
| **Factory Droid**  | `droid`       | `droid`      | custom          | bundled/CLI      |
| **OpenClaw**       | `openclaw`    | `openclaw`   | custom          | bundled/CLI      |
| **Cursor**         | `cursor`      | aplikace     | guide           | desktop app      |
| **Cline**          | `cline`       | `cline`      | custom          | npm              |
| **Kilo Code**      | `kilo`        | `kilocode`   | custom          | npm              |
| **Continue**       | `continue`    | rozšíření    | guide           | VS Code          |
| **Antigravity**    | `antigravity` | interní      | mitm            | OmniRoute        |
| **GitHub Copilot** | `copilot`     | rozšíření    | custom          | VS Code          |
| **OpenCode**       | `opencode`    | `opencode`   | guide           | npm              |
| **Kiro AI**        | `kiro`        | aplikace/CLI | mitm            | desktop/CLI      |

### Synchronizace otisků CLI (Agenti + Nastavení)

`/dashboard/agents` a `Nastavení > CLI Otisk` používají `src/shared/constants/cliCompatProviders.ts`.
To udržuje ID poskytovatelů v souladu s kartami CLI a staršími ID.

| CLI ID                                                                                               | ID poskytovatele otisku |
| ---------------------------------------------------------------------------------------------------- | ----------------------- |
| `kilo`                                                                                               | `kilocode`              |
| `copilot`                                                                                            | `github`                |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | stejné ID               |

Starší ID jsou stále přijímána pro kompatibilitu: `copilot`, `kimi-coding`, `qwen`.

---

## Krok 1 — Získejte OmniRoute API klíč

1. Otevřete OmniRoute dashboard → **Správce API** (`/dashboard/api-manager`)
2. Klikněte na **Vytvořit API klíč**
3. Dejte mu název (např. `cli-tools`) a vyberte všechna oprávnění
4. Zkopírujte klíč — budete ho potřebovat pro každý CLI níže

> Váš klíč vypadá takto: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

## Krok 2 — Nainstalujte nástroje CLI

Všechny nástroje založené na npm vyžadují Node.js 18+:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Kiro CLI (Amazon — vyžaduje curl + unzip)
apt-get install -y unzip   # na Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH"   # přidat do ~/.bashrc
```

**Ověření:**

```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (nebo: kilo --version)
kiro-cli --version   # 1.x.x
```

---

## Krok 3 — Nastavte globální proměnné prostředí

Přidejte do `~/.bashrc` (nebo `~/.zshrc`), pak spusťte `source ~/.bashrc`:

```bash
# OmniRoute Univerzální koncový bod
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-vase-omniroute-klic"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-vase-omniroute-klic"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-vase-omniroute-klic"
```

> Pro **vzdálený server** nahraďte `localhost:20128` IP adresou nebo doménou serveru,
> např. `http://192.168.0.15:20128`.

---

## Krok 4 — Nakonfigurujte každý nástroj

### Claude Code

```bash
# Via CLI:
claude config set --global api-base-url http://localhost:20128/v1

# Nebo vytvořte ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "apiBaseUrl": "http://localhost:20128/v1",
  "apiKey": "sk-vase-omniroute-klic"
}
EOF
```

**Test:** `claude "say hello"`

---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-vase-omniroute-klic
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:** `codex "what is 2+2?"`

---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-vase-omniroute-klic"
EOF
```

**Test:** `opencode`

---

### Cline (CLI nebo VS Code)

**Režim CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-vase-omniroute-klic"
}
EOF
```

**Režim VS Code:**
Nastavení rozšíření Cline → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

Nebo použijte OmniRoute dashboard → **CLI Nástroje → Cline → Použít konfiguraci**.

---

### KiloCode (CLI nebo VS Code)

**Režim CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-vase-omniroute-klic
```

**Nastavení VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-vase-omniroute-klic"
}
```

Nebo použijte OmniRoute dashboard → **CLI Nástroje → KiloCode → Použít konfiguraci**.

---

### Continue (Rozšíření VS Code)

Upravte `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-vase-omniroute-klic
    default: true
```

Po úpravě restartujte VS Code.

---

### Kiro CLI (Amazon)

```bash
# Přihlaste se ke svému AWS/Kiro účtu:
kiro-cli login

# CLI používá vlastní autentifikaci — OmniRoute není potřeba jako backend pro samotný Kiro CLI.
# Používejte kiro-cli společně s OmniRoute pro ostatní nástroje.
kiro-cli status
```

---

### Cursor (Desktop aplikace)

> **Poznámka:** Cursor směruje požadavky přes svůj cloud. Pro integraci s OmniRoute,
> povolte **Cloud Endpoint** v nastavení OmniRoute a použijte vaši veřejnou doménu.

Via GUI: **Settings → Models → OpenAI API Key**

- Base URL: `https://vase-domena.com/v1`
- API Key: váš OmniRoute klíč

---

## Automatická konfigurace v dashboardu

OmniRoute dashboard automatizuje konfiguraci většiny nástrojů:

1. Jděte na `http://localhost:20128/dashboard/cli-tools`
2. Rozbalte libovolnou kartu nástroje
3. Vyberte svůj API klíč z rozbalovacího seznamu
4. Klikněte na **Použít konfiguraci** (pokud je nástroj detekován jako nainstalovaný)
5. Nebo ručně zkopírujte vygenerovaný konfigurační snippet

---

## Vestavěný agenti: Droid & OpenClaw

**Droid** a **OpenClaw** jsou AI agenti vestavění přímo do OmniRoute — není potřeba žádná instalace.
Běží jako interní trasy a automaticky používají směrování modelů OmniRoute.

- Přístup: `http://localhost:20128/dashboard/agents`
- Konfigurace: stejné kombinace a poskytovatelé jako všechny ostatní nástroje
- Není potřeba API klíč ani instalace CLI

---

## Dostupné API koncové body

| Koncový bod                | Popis                                   | Použití pro                           |
| -------------------------- | --------------------------------------- | ------------------------------------- |
| `/v1/chat/completions`     | Standardní chat (všichni poskytovatelé) | Všechny moderní nástroje              |
| `/v1/responses`            | Responses API (formát OpenAI)           | Codex, agentní workflowy              |
| `/v1/completions`          | Legacy textové dokončení                | Starší nástroje používající `prompt:` |
| `/v1/embeddings`           | Textové vložení                         | RAG, vyhledávání                      |
| `/v1/images/generations`   | Generování obrázků                      | DALL-E, Flux, atd.                    |
| `/v1/audio/speech`         | Text-to-speech                          | ElevenLabs, OpenAI TTS                |
| `/v1/audio/transcriptions` | Speech-to-text                          | Deepgram, AssemblyAI                  |

---

## Řešení problémů

| Chyba                         | Příčina                 | Oprava                                                   |
| ----------------------------- | ----------------------- | -------------------------------------------------------- |
| `Connection refused`          | OmniRoute neběží        | `pm2 start omniroute`                                    |
| `401 Unauthorized`            | Špatný API klíč         | Zkontrolujte v `/dashboard/api-manager`                  |
| `No combo configured`         | Žádná aktivní kombinace | Nastavte v `/dashboard/combos`                           |
| `invalid model`               | Model není v katalogu   | Použijte `auto` nebo zkontrolujte `/dashboard/providers` |
| CLI zobrazuje "not installed" | Binárka není v PATH     | Zkontrolujte `which <příkaz>`                            |
| `kiro-cli: not found`         | Není v PATH             | `export PATH="$HOME/.local/bin:$PATH"`                   |

---

## Rychlý skript pro nastavení (jeden příkaz)

```bash
# Nainstalujte všechny CLI a nakonfigurujte pro OmniRoute (nahraďte svým klíčem a URL serveru)
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_KEY="sk-vase-omniroute-klic"

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai cline kilocode

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# Zápis konfigurací
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json   <<< "{\"apiBaseUrl\":\"$OMNIROUTE_URL\",\"apiKey\":\"$OMNIROUTE_KEY\"}"
cat > ~/.codex/config.yaml      <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
cat >> ~/.bashrc << EOF
export OPENAI_BASE_URL="$OMNIROUTE_URL"
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export ANTHROPIC_BASE_URL="$OMNIROUTE_URL"
export ANTHROPIC_API_KEY="$OMNIROUTE_KEY"
EOF

source ~/.bashrc
echo "✅ Všechny CLI nainstalovány a nakonfigurovány pro OmniRoute"
```
