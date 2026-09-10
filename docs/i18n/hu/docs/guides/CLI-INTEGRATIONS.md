# CLI-INTEGRATIONS (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI Integrációk — bármilyen kódoló CLI irányítása az OmniRoute-ra"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Integrációk

Az OmniRoute egy sor `setup-*` parancsot kínál, amelyek egy kódoló CLI-t (Codex, Claude Code, OpenCode, Cline, …) konfigurálnak, hogy az OmniRoute-ot használja háttérként — így az eszköz **egy** végponthoz kapcsolódik, és az OmniRoute a megfelelő szolgáltatóhoz irányít automatikus visszaeséssel. Minden parancs a **valós idejű** modell katalógust olvassa egy futó OmniRoute-ból (helyi vagy távoli), és a saját konfigurációs fájlját írja a **te** gépedre. Az API kulcsot egy környezeti változó hivatkozza, ahol az eszköz támogatja azt. Az alábbiakban a helyi környezeti fájlt megőrző parancsok találhatók.

Van egy általános indító is — `omniroute run <target>` — amely elindítja a `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` vagy `gemini` eszközöket a megfelelő környezettel, anélkül, hogy bármilyen konfigurációt írna. A célok és azok aliasai a kanonikus manifestből származnak `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), és az `omniroute completion` ugyanazokat a manifestből származó cél szavakat kínálja. A régi, eszközspecifikus indítók — `omniroute launch` (Claude Code) és `omniroute launch-codex` (Codex) — továbbra is elérhetők.

A szolgáltatók bevezetése ugyanabból a helyi/távoli kontextusból elérhető. Az alábbi API-első parancsok elkülönítik a kezelési hitelesítést a szolgáltató hitelesítő adataitól, és soha nem nyomtatnak ki hitelesítő adatokat strukturált kimenetben:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

A szkriptekhez a `--credential-stdin` vagy `--credential-env` használatát javasoljuk; a `--credential` a helyi, kontrollált használatra marad meg. A `providers remove` parancs `--yes`-t igényel nem interaktív terminálon, és mind az öt parancs tiszteletben tartja az aktív kontextust vagy a globális `--base-url`/`--api-key` opciókat.

A két leggazdagabb integráció egyszeri, kézzel írt alapbeállításához lásd az eszközspecifikus mélymerüléseket:

- [Claude Code konfiguráció](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfiguráció](./CODEX-CLI-CONFIGURATION.md)
- [Távoli Mód](./REMOTE-MODE.md) — vezérelj egy távoli OmniRoute-ot (VPS / Tailnet) a laptopodról
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — az OmniCopilot kiterjesztés; ez is képes futtatni ezeket a `setup-*` parancsokat az editoron belül

---

## Fő táblázat

Minden parancs tiszteletben tartja az **aktív kontextust** (amelyet az `omniroute connect`-tel állítanak be, lásd [Távoli Mód](./REMOTE-MODE.md)) vagy az explicit `--remote <url> --api-key <key>` zászlókat. Az alábbi "Helyi vs távoli" azt jelenti: zászlók nélkül a `http://localhost:20128` címet célozza meg; `--remote` (vagy egy aktív távoli kontextus) esetén a katalógust onnan szerzi be, és helyben írja a konfigurációt.

| Parancs                    | Eszköz                         | Amit ír                                                                                                                                                                                               | Kulcs zászlók                                                                                                                              | Helyi vs távoli |
| -------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — egy profil minden kompatibilis szövegmintához (`codex --profile <name>`)                                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Mindkettő       |
| `omniroute setup-claude`   | Claude Code                    | `~/.claude/profiles/<name>/settings.json` — egy profil minden egyező modellhez (`CLAUDE_CONFIG_DIR`)                                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Mindkettő       |
| `omniroute setup-opencode` | OpenCode (openai-kompatibilis) | `~/.config/opencode/opencode.json` — `omniroute` szolgáltató minden katalógus modellel (`opencode -m omniroute/<model>`)                                                                              | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Mindkettő       |
| `omniroute setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (CLI mód) + nyomtatja a VS Code kiterjesztés beállításait                                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Mindkettő       |
| `omniroute setup-kilo`     | Kilo Code                      | `~/.local/share/kilo/auth.json` (CLI) + egyesíti a `kilocode.*` fájlokat a VS Code `settings.json`-ba, ha létezik                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Mindkettő       |
| `omniroute setup-continue` | Continue / `cn` CLI            | `~/.continue/config.yaml` — `provider: openai` modellek, kulcs a `${{ secrets.OMNIROUTE_API_KEY }}` által                                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mindkettő       |
| `omniroute setup-cursor`   | Cursor                         | Semmi — nyomtatja az alkalmazáson belüli lépéseket (Cursor konfigurációja átláthatatlan SQLite)                                                                                                       | `--remote` `--api-key` `--only` `--port`                                                                                                   | Mindkettő       |
| `omniroute setup-roo`      | Roo Code                       | `~/.omniroute/roo-settings.json` (import doc) + beállítja a `roo-cline.autoImportSettingsPath`-t, ha létezik egy VS Code `settings.json` fájl                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Mindkettő       |
| `omniroute setup-crush`    | Crush                          | `~/.config/crush/crush.json` — `openai-compat` szolgáltató, kulcs a `$OMNIROUTE_API_KEY` által                                                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mindkettő       |
| `omniroute setup-goose`    | Goose                          | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + nyomtatja a környezeti receptet                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mindkettő       |
| `omniroute setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + nyomtatja a környezeti receptet                                                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mindkettő       |
| `omniroute setup-qwen`     | Qwen Code                      | `~/.qwen/settings.json` — V4 `modelProviders.openai` tömb + `OMNIROUTE_API_KEY` a `~/.qwen/.env` fájlban                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Mindkettő       |
| `omniroute run <target>`   | Futási indítás (általános)     | Semmi — elindítja a `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` eszközöket a megfelelő környezettel és argumentumokkal; a Qwen és a Gemini ideiglenes, elszigetelt otthont használnak | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Mindkettő       |
| `omniroute launch`         | Claude Code                    | Semmi — elindítja a `claude`-t az `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injektálásával                                                                                                          | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Mindkettő       |
| `omniroute launch-codex`   | OpenAI Codex CLI               | Semmi — elindítja a `codex`-t az `omniroute` szolgáltató injektálásával `-c` zászlók segítségével                                                                                                     | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Mindkettő       |

Zászlók megjegyzései (ellenőrizve a parancs forrásában):

- `--remote <url>` — a katalógust egy távoli OmniRoute-ból szerzi be (felülírja a `--port`-ot és az aktív kontextust). A `--api-key <key>` biztosítja a hitelesítő adatokat a szerverhez (alapértelmezés szerint az `OMNIROUTE_API_KEY` környezeti változót, vagy az aktív kontextus tokenjét használja).
- `--only <patterns>` — vesszővel elválasztott részstringek; csak azokat a modell azonosítókat tartja meg, amelyek egyeznek (pl. `--only glm,kimi`). Elérhető a `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` parancsoknál.
- `--dry-run` — pontosan azt nyomtatja ki, ami íródna, anélkül, hogy a fájlrendszert megérintené. Minden `setup-*` parancsnál elérhető **kivéve** a `setup-cursor`-t (amely soha nem ír fájlt).
- `--model <id>` — kötelező (vagy interaktívan kiválasztott) azoknál az eszközöknél, amelyek nem rendelkeznek automatikus modell felfedezéssel: Cline, Kilo, Roo, Goose, Qwen, Aider. Ezek az eszközök a `--yes`-t is elfogadják nem interaktív futtatásokhoz (ami akkor `--model`-t igényel). A `setup-opencode` a `--model`-t használja az alapértelmezett legfelső szintű modell beállításához.
- A `--model <id>` az `omniroute run` parancsnál követi a manifest per-cél vezetékezését (`bin/cli/cli-manifest.mjs`): **aider** a `--model openai/<id>`-t, **opencode** a `--model omniroute/<id>`-t kap (a prefix csak akkor kerül hozzáadásra, ha az azonosító nem tartalmazza azt); **qwen** és **gemini** az azonosítót szó szerint kapja; **claude** az `ANTHROPIC_MODEL`-on keresztül, **goose** a `GOOSE_MODEL`-on keresztül, és **codex** a `-c model_providers.omniroute.*` argumentumokon keresztül. **A Qwen az egyetlen futási cél, amely kifejezetten megköveteli a `--model`-t** — az `omniroute run qwen` nélküle `2`-t ad vissza egy explicit hibával.
- `--port <port>` — helyi OmniRoute port (alapértelmezett `20128`, figyelmen kívül hagyva, ha a `--remote` be van állítva). Minden `setup-*` és mindkét indító esetén jelen van.
- Az `omniroute run` kilépési kódok: a gyermek CLI saját kilépési kódja verbatim módon propagálódik; `2` = érvénytelen argumentumok (támogatott cél hiánya, kötelező `--model` hiánya, konténer őr); `127` = a cél bináris nem található a `PATH`-ban; `130`/`143`/`129` amikor a launch-t a `SIGINT`/`SIGTERM`/`SIGHUP` zárja le; `1` = egyéb futási indítási hiba.
- A két indító (`launch`, `launch-codex`) elfogadja a `--profile <name>`-t, hogy kiválasszon egy profilt, amelyet a `setup-claude` / `setup-codex` írt, plusz átjáró argumentumokat az alapul szolgáló `claude` / `codex` bináris számára.

Az interaktív választó a beállítási receptekhez is megosztott:

```bash
# Válassz az aktív helyi vagy távoli modell katalógusból, és konfiguráld a célt.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

A `configure` jelenleg a tesztelt receptekhez delegál a `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, és `kilo` esetében. Az IDE-hez tartozó, MITM, és csak útmutató katalógus bejegyzések továbbra is explicit `setup-*`/kézi folyamatok, és nem jelennek meg indítható célokként.

> A `setup-opencode` a **könnyű openai-kompatibilis** OpenCode integráció.
> Van egy gazdagabb plugin integráció is — `omniroute setup opencode` — amely
> telepíti az `@omniroute/opencode-plugin`-t. Ezek különböző parancsok; a fenti táblázat a `setup-opencode`-t dokumentálja.

---

## Helyi használat

Az OmniRoute `localhost:20128` címen fut, csak futtasd a beállító parancsot az eszközödhöz. A katalógus a helyi szerverről kerül lekérésre.

```bash
# Codex: írj egy profilt a megfelelő modellhez a ~/.codex/ könyvtárba
omniroute setup-codex
codex --profile glm52            # használd a generált profilt

# Claude Code: írj modellenkénti profilokat, majd indíts egyet
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: írd az openai-kompatibilis szolgáltatót az összes katalógusmodellel
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # hivatkozva {env:OMNIROUTE_API_KEY}, soha nem lemezen
opencode -m omniroute/glm/glm-5.2 "..."

# Az automatikus felfedezéssel nem rendelkező eszközöknek explicit modell szükséges:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Előnézet írás nélkül:
omniroute setup-continue --dry-run
```

Indítás írás nélkül (csak környezeti injekció):

```bash
omniroute launch                 # Claude Code → helyi OmniRoute
omniroute launch-codex           # Codex CLI → helyi OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "válasz OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "válasz OK"
omniroute run qwen --model glm/glm-5.2 -- -p "válasz OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "válasz OK"

# Explicit parancs útvonal: átad minden, ami a -- után jön
omniroute run claude -- --print-system-prompt "ellenőrizd ezt a diffet"
```

---

## Távoli használat

Bármely beállító parancsot irányíts egy távoli OmniRoute-ra `--remote` + `--api-key` használatával. A katalógus a távoli szerverről kerül lekérésre; a konfiguráció a helyi gépeden kerül írásra.

```bash
# OpenCode távoli VPS ellen, csak glm/kimi modellek megtartása
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # először exportáld az OMNIROUTE_API_KEY-t

# Codex profilok egy távoli katalógusból
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# CLI indítása közvetlenül a távoli ellen
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

A `--remote`/`--api-key` átadása helyett egyszer jelentkezz be, és hagyd, hogy az **aktív kontextus** automatikusan biztosítsa őket:

```bash
omniroute connect 192.168.0.15        # létrehoz egy hatókörös tokent, tárolja a kontextust
omniroute setup-codex                 # ← most a távoli katalógust használja
omniroute setup-opencode              # ← ugyanaz
omniroute launch                      # ← Claude Code a távoli ellen
```

Lásd a [Távoli Mód](./REMOTE-MODE.md) dokumentációt a kontextusok, hatókörök és token kezelésről.

---

## Alap URL konvenciók (mely eszközök akarják a `/v1`-et)

Az OmniRoute az OpenAI felületet a `/v1`-en, az Anthropic felületet a gyökérnél, és egy natív Gemini felületet a `/v1beta`-n kínál. Minden integráció a formátumhoz van kötve, amit az eszköz elvár (ellenőrizve a parancs forrásában):

| Integráció                                                                 | Alap URL írása | `/v1`?                                             |
| -------------------------------------------------------------------------- | -------------- | -------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | gyökér         | Nem — Cline hozzáfűzi a `/v1/chat/completions`-t   |
| `setup-goose` (`OPENAI_HOST`)                                              | gyökér         | Nem — Goose hozzáfűzi az útvonalat                 |
| `setup-aider` (`OPENAI_API_BASE`)                                          | gyökér         | Nem — LiteLLM hozzáfűzi a `/v1/chat/completions`-t |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1`-el       | Igen                                               |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | gyökér         | Nem — Claude Code hozzáfűzi a `/v1/messages`-t     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1`-el       | Igen                                               |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1`-el       | Igen                                               |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | gyökér         | Nem — az SDK hozzáfűzi a `/v1beta/models/…`-t      |

---

## A natív függőségek frissítése: `--include=optional`

Amikor frissítesz az `omniroute update` paranccsal (miután megerősítetted, vagy a `--apply` használatával),
az OmniRoute a frissítést `--include=optional` opcióval futtatja:

```bash
npm install -g omniroute@latest --include=optional
```

Ez **nem** egy olyan zászló, amelyet az `omniroute update` parancshoz adsz — ez mindig alkalmazásra kerül a
frissítő által. Garantálja, hogy az `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, az LLMLingua SLM stack) megmarad a frissítés során, még akkor is, ha az npm konfigurációd
`omit=optional` beállítással rendelkezik, ami egyébként csendben eltávolítaná a natív SQLite
illesztőt és az OS-kulcstartó kötést. Az pontos parancs előnézetéhez anélkül, hogy alkalmaznád:

```bash
omniroute update --dry-run
# [DRY RUN] Futna: npm install -g omniroute@latest --include=optional
```

Más `omniroute update` zászlók (forrásban ellenőrizve): `--check` (1-es kilépés, ha
elavult), `--apply` (telepítés kérdés nélkül), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI az `omniroute run gemini` segítségével

A szerződés ellenőrizve az `@google/gemini-cli` 0.50.0 verzióval: a CLI tiszteletben tartja
`GOOGLE_GEMINI_BASE_URL`-t, és `POST /v1beta/models/<model>:generateContent`
(és `:streamGenerateContent?alt=sse`) kéréseket küld rá — pontosan az OmniRoute natív
Gemini felületének (`/v1beta`) megfelelően. Az `omniroute run gemini` ezt automatikusan összeköti:

- `GOOGLE_GEMINI_BASE_URL` → az aktív OmniRoute alap URL (gyökér, nincs `/v1`);
- `GEMINI_API_KEY` → a megoldott OmniRoute hitelesítő (opció/env/környezet);
- egy **ideiglenes elszigetelt `GEMINI_CLI_HOME`**, amelynek `.gemini/settings.json`
  a `gemini-api-key` hitelesítést választja, így egy tárolt Google OAuth munkamenet (Code Assist)
  soha nem írja felül az OmniRoute által irányított indítást — a kilépés után eltávolítva;
- **környezeti higiénia**: a gyermek környezetből eltávolítva a `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` és `GOOGLE_GENAI_USE_GCA` (amelyek az
  auth-ot a Vertex/Code Assist-ra irányítanák), és a `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  beállítva van, mint egy biztonsági mentés — a többi `run` cél ugyanazt a kezelést kapja
  a saját ellentmondó változóikra;
- `--model <id>` injekció a `--provider`/`--model`-ből.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

A Gemini munkaterület-bizalom védelme továbbra is érvényes a fej nélküli módban — add meg
a `--skip-trust`-ot (vagy bízz a könyvtárban interaktívan); az indító szándékosan nem kerüli meg ezt. Ez az indító különbözik a **ACP
regisztrációtól** (`src/lib/acp/registry.ts`, `gemini --acp`), amely továbbra is az
ügynök-protokoll integráció a `/dashboard/acp-agents` számára.

---

## Valódi füst teszt (opcionális)

Determinista indítási terv regressziós tesztek a CI-ben (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). A VALÓDI binárisok érvényesítéséhez egy VALÓDI
OmniRoute szerverrel, egy opcionális keretrendszer létezik a
`tests/integration/upstream-cli-smoke.int.test.ts` fájlban. Ez soha nem fut automatikusan
(minden al-teszt átugrik, hacsak `RUN_CLI_SMOKE=1` nincs beállítva), a hitelesítőt környezeti változó
NÉV-en keresztül adja át (soha nem értéken), eltávolítja a kulcsformájú karakterláncokat a rögzített kimenetből, átugorja
azokat a célokat, amelyek binárisa nincs telepítve, és a hibákat auth / upstream / config
kategóriákba sorolja, nem pedig egy egyszerű logikai értékként:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcionális: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` korlátozza a tesztelést;
`OMNIROUTE_SMOKE_TIMEOUT_MS` felülírja a 120 másodperces célonkénti időkorlátot.

---

## Lásd még

- [Claude Code konfiguráció](./CLAUDE-CODE-CONFIGURATION.md) — a mélyebb Claude Code útmutató
- [Codex CLI konfiguráció](./CODEX-CLI-CONFIGURATION.md) — az egyszeri `[model_providers.omniroute]` alapbeállítás
- [Távvezérlő mód](./REMOTE-MODE.md) — kontextusok, terjedelmi hozzáférési tokenek, távoli szerver vezérlése
- [CLI Eszközök hivatkozás](../reference/CLI-TOOLS.md) — a támogatott eszközök teljes katalógusa + irányítópult oldalak
- [Telepítési útmutató](./SETUP_GUIDE.md) — telepítési módszerek és első indítási onboarding
