# CLI Integrations (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Az OmniRoute `setup-*` parancsok egész családját biztosítja, amelyek úgy konfigurálnak egy
kódolási CLI-t (Codex, Claude Code, OpenCode, Cline, …), hogy az az OmniRoute-ot használja háttérrendszerként — így
az eszköz **egyetlen** végponthoz csatlakozik, az OmniRoute pedig automatikus tartalékra váltással
a megfelelő szolgáltatóhoz irányítja a kéréseket. Minden parancs egy futó
OmniRoute-példány (helyi vagy távoli) **élő** modellkatalógusát olvassa be, és az eszköz saját konfigurációs fájlját írja ki az **Ön**
gépére. Ahol az eszköz támogatja, az API-kulcsra egy környezeti változó hivatkozik. Az alábbiakban külön jelezzük azokat a parancsokat, amelyek az eszközhöz tartozó helyi környezeti fájlt mentenek.

Egy általános indító is elérhető — `omniroute run <target>` —, amely a megfelelő
környezeti változók átadásával indítja el a `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` vagy `gemini` programot,
anélkül, hogy bármilyen konfigurációt írna. A célok és álneveik
a kanonikus `bin/cli/cli-manifest.mjs` jegyzékből származnak
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), és az `omniroute completion` ugyanezeket,
a jegyzékből származó célszavakat kínálja fel. A régi, eszközspecifikus indítók —
`omniroute launch` (Claude Code) és `omniroute launch-codex` (Codex) — továbbra is
elérhetők.

A szolgáltatók beállítása ugyanebből a helyi/távoli környezetből érhető el. Az
alábbi, API-központú parancsok elkülönítik a felügyeleti hitelesítést a szolgáltatói
hitelesítő adatoktól, és soha nem írnak ki hitelesítő adatot strukturált kimenetben:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Szkriptekhez lehetőleg a `--credential-stdin` vagy a `--credential-env` kapcsolót használja; a `--credential`
ellenőrzött helyi használatra továbbra is elérhető. Nem interaktív terminálon a `providers remove`
megköveteli a `--yes` kapcsolót, és mind az öt parancs figyelembe veszi az aktív környezetet vagy a
globális `--base-url`/`--api-key` beállításokat.

A két legteljesebb integráció egyszeri, kézzel végzett alapbeállításához tekintse meg az
eszközspecifikus részletes útmutatókat:

- [A Claude Code konfigurálása](./CLAUDE-CODE-CONFIGURATION.md)
- [A Codex CLI konfigurálása](./CODEX-CLI-CONFIGURATION.md)
- [Távoli mód](./REMOTE-MODE.md) — távoli OmniRoute (VPS / Tailnet) vezérlése a laptopjáról
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — az OmniCopilot bővítmény; ezeket a
  `setup-*` parancsokat a szerkesztőből is futtathatja Ön helyett

---

## Áttekintő táblázat

Minden parancs figyelembe veszi az **aktív környezetet** (az `omniroute connect` paranccsal állítható be, lásd:
[Távoli mód](./REMOTE-MODE.md)) vagy az explicit `--remote <url> --api-key <key>` kapcsolókat.
A „helyi vagy távoli” jelentése alább: kapcsolók nélkül a cél a `http://localhost:20128`;
a `--remote` használatakor (vagy aktív távoli környezet esetén) a katalógust arról a
kiszolgálóról tölti le, a konfigurációt pedig helyben írja ki.

| Parancs                    | Eszköz                         | Mit ír                                                                                                                                                                                                        | Fő kapcsolók                                                                                                                               | Helyi vagy távoli |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — kompatibilis szövegmodellenként egy profil (`codex --profile <name>`)                                                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Mindkettő         |
| `omniroute setup-claude`   | Claude Code                    | `~/.claude/profiles/<name>/settings.json` — illeszkedő modellenként egy profil (`CLAUDE_CONFIG_DIR`)                                                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Mindkettő         |
| `omniroute setup-opencode` | OpenCode (OpenAI-kompatibilis) | `~/.config/opencode/opencode.json` — `omniroute` szolgáltató a katalógus összes modelljével (`opencode -m omniroute/<model>`)                                                                                 | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Mindkettő         |
| `omniroute setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (CLI mód) + kiírja a VS Code-bővítmény beállításait                                                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Mindkettő         |
| `omniroute setup-kilo`     | Kilo Code                      | `~/.local/share/kilo/auth.json` (CLI) + beolvasztja a `kilocode.*` beállításokat a VS Code `settings.json` fájljába, ha az létezik                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Mindkettő         |
| `omniroute setup-continue` | Continue / `cn` CLI            | `~/.continue/config.yaml` — `provider: openai` modellek, kulcs a `${{ secrets.OMNIROUTE_API_KEY }}` segítségével                                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mindkettő         |
| `omniroute setup-cursor`   | Cursor                         | Semmit — kiírja az alkalmazáson belüli lépéseket (a Cursor konfigurációja nem átlátható SQLite-adatbázis)                                                                                                     | `--remote` `--api-key` `--only` `--port`                                                                                                   | Mindkettő         |
| `omniroute setup-roo`      | Roo Code                       | `~/.omniroute/roo-settings.json` (importálási dokumentum) + beállítja a `roo-cline.autoImportSettingsPath` értékét, ha létezik VS Code `settings.json` fájl                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Mindkettő         |
| `omniroute setup-crush`    | Crush                          | `~/.config/crush/crush.json` — `openai-compat` szolgáltató, kulcs a `$OMNIROUTE_API_KEY` segítségével                                                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mindkettő         |
| `omniroute setup-goose`    | Goose                          | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + kiírja a környezeti változók beállítási útmutatóját                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mindkettő         |
| `omniroute setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + kiírja a környezeti változók beállítási útmutatóját                                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mindkettő         |
| `omniroute setup-qwen`     | Qwen Code                      | `~/.qwen/settings.json` — V4 `modelProviders.openai` tömb + `OMNIROUTE_API_KEY` a `~/.qwen/.env` fájlban                                                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Mindkettő         |
| `omniroute setup-5dive`    | 5dive (ügynökflotta)           | Semmit a `$HOME` alatt — egy 5dive **hitelesítési profilt** (`/var/lib/5dive/auth-profiles/<name>/`) ír a `5dive agent auth set` segítségével; csak root jogosultsággal, a flottagazdagépen fut               | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Mindkettő         |
| `omniroute run <target>`   | Futásidejű indítás (általános) | Semmit — elindítja a `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` folyamatot a megfelelő környezettel és argumentumokkal; a Qwen és a Gemini ideiglenes, elkülönített saját könyvtárat használ | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Mindkettő         |
| `omniroute launch`         | Claude Code                    | Semmit — elindítja a `claude` folyamatot a beillesztett `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` változókkal                                                                                               | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Mindkettő         |
| `omniroute launch-codex`   | OpenAI Codex CLI               | Semmit — elindítja a `codex` folyamatot a `-c` kapcsolókkal beillesztett `omniroute` szolgáltatóval                                                                                                           | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Mindkettő         |

Megjegyzések a kapcsolókról (a parancs forráskódjában ellenőrizve):

- `--remote <url>` — a katalógus lekérése egy távoli OmniRoute-példányról (felülírja a `--port`
  beállítást és az aktív kontextust). A `--api-key <key>` adja meg az adott
  kiszolgáló hitelesítési adatát (alapértelmezés szerint az `OMNIROUTE_API_KEY` környezeti változó vagy az aktív kontextus tokenje).
- `--only <patterns>` — vesszővel elválasztott részkarakterláncok; csak az egyező
  modellazonosítókat tartja meg (például `--only glm,kimi`). Elérhető a `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` parancsoknál.
- `--dry-run` — pontosan kiírja, mi kerülne mentésre, a fájlrendszer
  módosítása nélkül. Minden `setup-*` parancsnál elérhető, **kivéve** a `setup-cursor`
  parancsot (amely soha nem ír fájlt).
- `--model <id>` — kötelező (vagy interaktívan kiválasztandó) azoknál az eszközöknél, amelyek nem
  támogatják a modellek automatikus felderítését: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Ezek az eszközök
  a nem interaktív futtatáshoz a `--yes` kapcsolót is elfogadják (ami ekkor megköveteli a `--model` megadását).
  A `setup-opencode` a `--model` használatával állítja be az alapértelmezett legfelső szintű modellt.
- A `--model <id>` az `omniroute run` esetében a jegyzék célonkénti bekötését követi
  (`bin/cli/cli-manifest.mjs`): az **aider** a `--model openai/<id>`, az
  **opencode** pedig a `--model omniroute/<id>` argumentumot kapja (az előtag csak akkor kerül hozzáadásra, ha az azonosító
  még nem tartalmazza); a **qwen** és a **gemini** változtatás nélkül kapja meg az azonosítót;
  a **claude** az `ANTHROPIC_MODEL`, a **goose** a `GOOSE_MODEL` változón keresztül, a
  **codex** pedig `-c model_providers.omniroute.*` argumentumokon keresztül kapja meg. **A Qwen az egyetlen futtatási
  cél, amelynél a `--model` szigorúan kötelező** — az `omniroute run qwen` enélkül
  `2` kilépési kóddal és egyértelmű hibaüzenettel áll le.
- `--port <port>` — a helyi OmniRoute portja (alapértelmezés szerint `20128`; a `--remote`
  beállítása esetén figyelmen kívül marad). Minden `setup-*` parancsnál és mindkét indítónál elérhető.
- Az `omniroute run` kilépési kódjai: a gyermek CLI saját kilépési kódja
  változtatás nélkül továbbadódik; `2` = érvénytelen argumentumok (nem támogatott cél, hiányzó kötelező
  `--model`, konténeres védelem); `127` = a célprogram binárisa nem található a `PATH` változóban;
  `130`/`143`/`129`, ha az indítást `SIGINT`/`SIGTERM`/`SIGHUP` szakítja meg;
  `1` = egyéb futásidejű indítási hiba.
- A két indító (`launch`, `launch-codex`) elfogadja a `--profile <name>` kapcsolót a
  `setup-claude` / `setup-codex` által létrehozott profil kiválasztásához, valamint továbbítandó argumentumokat az
  alapul szolgáló `claude` / `codex` bináris számára.

Az interaktív választót a beállítási receptek is közösen használják:

```bash
# Válasszon az aktív helyi vagy távoli modellkatalógusból, és konfigurálja a célt.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

A `configure` jelenleg a tesztelt recepteknek delegál a `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` és `5dive` esetében.
A kizárólag IDE-hez tartozó,
MITM- és csak útmutatóként szolgáló katalógusbejegyzések továbbra is különálló `setup-*`/kézi folyamatok maradnak, és
nem jelennek meg indítható célokként.

> A `setup-opencode` a **könnyűsúlyú, OpenAI-kompatibilis** OpenCode-integráció.
> Létezik egy funkciógazdagabb bővítményintegráció is — `omniroute setup opencode` —, amely
> telepíti az `@omniroute/opencode-plugin` csomagot. Ezek különböző parancsok; a fenti táblázat
> a `setup-opencode` parancsot dokumentálja.
>
> A bővítmény két csomagban érhető el, OpenCode-főverziónként egyben, mivel a két
> betöltő eltérő belépési pontokat vár:
> `@omniroute/opencode-plugin` az OpenCode v1-hez és
> `@omniroute/opencode-plugin-v2` az OpenCode v2-höz. A v2 csomag új
> (`0.1.0`), és egy még változó gazdagép-szerződést követ, ezért az OpenCode által a katalógustervezetbe
> előzetesen betöltött struktúrát olvassa ki, ahelyett, hogy feltételezné annak alakját. A telepítéséhez adjon hozzá
> egy `plugins` bejegyzést az `opencode.json` fájlhoz; az `omniroute setup opencode`
> továbbra is a v1 csomagot telepíti. A beállítások és a hitelesítési adatok keresési sorrendje a
> csomag README-fájljában található.

---

## Helyi használat

Ha az OmniRoute a `localhost:20128` címen fut, csak futtasd az eszközödhöz tartozó beállítási parancsot. A katalógus a helyi kiszolgálóról töltődik le.

```bash
# Codex: minden illeszkedő modellhez profilt ír a ~/.codex/ könyvtárba
omniroute setup-codex
codex --profile glm52            # egy létrehozott profil használata

# Claude Code: modellenkénti profilokat ír, majd elindít egyet
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: beírja az OpenAI-kompatibilis szolgáltatót a katalógus összes modelljével
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # hivatkozás: {env:OMNIROUTE_API_KEY}; soha nem kerül lemezre
opencode -m omniroute/glm/glm-5.2 "..."

# Az automatikus felderítést nem támogató eszközöknél explicit modellt kell megadni:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Előnézet fájlírás nélkül:
omniroute setup-continue --dry-run
```

Indítás konfiguráció írása nélkül (csak környezetiinjekcióval):

```bash
omniroute launch                 # Claude Code → helyi OmniRoute
omniroute launch-codex           # Codex CLI → helyi OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Explicit parancsútvonal: változtatás nélkül továbbít mindent a -- után
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Távoli használat

Bármely beállítási parancsot egy távoli OmniRoute-példányra irányíthatsz a `--remote` és a `--api-key` megadásával. A katalógus a távoli példányról töltődik le, a konfiguráció pedig a helyi gépedre íródik.

```bash
# OpenCode egy távoli VPS használatával, csak a glm/kimi modellek megtartásával
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # előbb exportáld az OMNIROUTE_API_KEY változót

# Codex-profilok egy távoli katalógusból
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# CLI közvetlen indítása a távoli példány használatával
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Ahelyett, hogy minden alkalommal megadnád a `--remote`/`--api-key` kapcsolókat, jelentkezz be egyszer, és hagyd, hogy az **aktív kontextus** automatikusan biztosítsa ezeket:

```bash
omniroute connect 192.168.0.15        # hatókörrel rendelkező tokent hoz létre, és eltárolja a kontextust
omniroute setup-codex                 # ← most már a távoli katalógust használja
omniroute setup-opencode              # ← ugyanez
omniroute launch                      # ← Claude Code a távoli példánnyal
```

A kontextusokról, hatókörökről és tokenkezelésről lásd a [Távoli mód](./REMOTE-MODE.md) című dokumentumot.

---

## 5dive-ügynökflották

A [5dive](https://5dive.ai) hosszú ideig futó kódolóügynökök flottáját működteti, amelyek mindegyike egy-egy systemd-egységként fut a saját Unix-felhasználója alatt. Maga nem kódolási CLI, ezért az `omniroute run` számára nincs mit elindítania — a `5dive` **csak konfigurálható** célpont.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Mindkét forma egyetlen 5dive **hitelesítési profilt** ír, ezután pedig minden, ehhez a profilhoz kötött `claude`-munkahely az OmniRoute-tal kommunikál. Három dolog jellemző kifejezetten erre a célpontra:

- **A flotta gazdagépén, rootként fut.** A 5dive műveletei helyi systemd-egységeken és egy root tulajdonában lévő állapotkönyvtáron dolgoznak; távoli mód nem érhető el. A recept `sudo` használatával újraindítja önmagát, ha még nem rootként fut (a `--no-sudo` kikapcsolja ezt, és helyette kiírja a parancsot).
- **A végpontnak `https://` protokollt kell használnia, kivéve, ha loopback címről van szó.** Az ügynök API-kulcsa minden kérésnél ezen az URL-en keresztül halad, a 5dive pedig elutasítja a titkosítatlan, gépen kívüli végpontokat. Ez alól a privát LAN-cím sem kivétel.
- **Az egyes munkahelyek saját modellrögzítése elsőbbséget élvez a profillal szemben.** A profil tartalmazza az `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` értékeket, de egy továbbra is alapértelmezett modellazonosítóhoz rögzített munkahely első művelete a _„Probléma van a kiválasztott modellel”_ hibaüzenettel meghiúsul. Add meg az `--agent <name>` kapcsolót (ismételhető), hogy a munkahelyeket is rögzítsd; ha ezt nem teszed meg, a recept kiírja a szükséges parancsot.

Az API-kulcs a **szabványos bemeneten** (`--api-key=-`) keresztül kerül átadásra a 5dive számára, így soha nem jelenik meg a `ps` kimenetében.

Ha a profilt nem egyetlen modellre, hanem egy OmniRoute-**kombinációra** irányítod, a flotta szolgáltatói feladatátvételt kap: amikor az elsődleges végpont az
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) problémában rögzített futás során egy művelet közepén teljesen elérhetetlenné vált, az ügynök a tartalék végponton fejezte be a hátralévő lépéseket, és a kiesés soha nem vált láthatóvá a felhasználó számára.

---

## Alap-URL-konvenciók (mely eszközök várják el a `/v1` értéket)

Az OmniRoute az OpenAI-felületet a `/v1`, az Anthropic-felületet a gyökérútvonalon,
a natív Gemini-felületet pedig a `/v1beta` útvonalon teszi elérhetővé. Minden integráció
az eszköze által elvárt formára van beállítva (a parancs forráskódjában ellenőrizve):

| Integráció                                                                 | Beírt alap-URL | `/v1`?                                                       |
| -------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | gyökér         | Nem — a Cline hozzáfűzi a `/v1/chat/completions` útvonalat   |
| `setup-goose` (`OPENAI_HOST`)                                              | gyökér         | Nem — a Goose hozzáfűzi az útvonalat                         |
| `setup-aider` (`OPENAI_API_BASE`)                                          | gyökér         | Nem — a LiteLLM hozzáfűzi a `/v1/chat/completions` útvonalat |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1`-gyel     | Igen                                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | gyökér         | Nem — a Claude Code hozzáfűzi a `/v1/messages` útvonalat     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1`-gyel     | Igen                                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1`-gyel     | Igen                                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | gyökér         | Nem — az SDK hozzáfűzi a `/v1beta/models/…` útvonalat        |
| `setup-5dive` (`ANTHROPIC_BASE_URL` a hitelesítési profilban)              | gyökér         | Nem — a Claude Code hozzáfűzi a `/v1/messages` útvonalat     |

---

## Natív függőségek megtartása frissítéskor: `--include=optional`

Amikor az `omniroute update` paranccsal frissít (megerősítés után vagy az `--apply`
kapcsolóval), az OmniRoute a beépített `--include=optional` kapcsolóval futtatja
a telepítést:

```bash
npm install -g omniroute@latest --include=optional
```

Ez **nem** egy olyan kapcsoló, amelyet az `omniroute update` parancsnak kell átadni —
a frissítő mindig alkalmazza. Ez garantálja, hogy az `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, az LLMLingua SLM-verem) a frissítés után
is megmaradjanak, még akkor is, ha az npm konfigurációjában az `omit=optional` van
beállítva, ami egyébként észrevétlenül eltávolítaná a natív SQLite-illesztőprogramot
és az operációs rendszer kulcstartójához tartozó kötést. A pontos parancs alkalmazás
nélküli előnézetéhez:

```bash
omniroute update --dry-run
# [PRÓBAFUTÁS] Futtatandó parancs: npm install -g omniroute@latest --include=optional
```

Az `omniroute update` további kapcsolói (a forráskódban ellenőrizve): `--check`
(1-es kilépési kód, ha elavult), `--apply` (telepítés megerősítés kérése nélkül),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI az `omniroute run gemini` paranccsal

A szerződés az `@google/gemini-cli` 0.50.0 verziója alapján ellenőrizve: a CLI
figyelembe veszi a `GOOGLE_GEMINI_BASE_URL` értékét, és a
`POST /v1beta/models/<model>:generateContent` (valamint a
`:streamGenerateContent?alt=sse`) kéréseket erre küldi — pontosan az OmniRoute
natív Gemini-felületére (`/v1beta`). Az `omniroute run gemini` ezt automatikusan
beállítja:

- `GOOGLE_GEMINI_BASE_URL` → az aktív OmniRoute alap-URL (gyökér, `/v1` nélkül);
- `GEMINI_API_KEY` → a feloldott OmniRoute-hitelesítő adat (opció/környezet/kontextus);
- egy **ideiglenes, elkülönített `GEMINI_CLI_HOME`**, amelynek
  `.gemini/settings.json` fájlja a `gemini-api-key` hitelesítést választja ki, így
  egy tárolt Google OAuth-munkamenet (Code Assist) soha nem írja felül az
  OmniRoute-ra irányított indítást — kilépés után eltávolításra kerül;
- **környezeti higiénia**: a gyermekfolyamat környezetéből eltávolításra kerül a
  `GOOGLE_API_KEY`, a `GOOGLE_GENAI_USE_VERTEXAI` és a `GOOGLE_GENAI_USE_GCA`
  (amelyek a hitelesítést a Vertex/Code Assist felé irányítanák), továbbá
  tartalék biztonsági megoldásként beállításra kerül a
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` — a többi `run` célpont saját ütköző
  változói ugyanezt a kezelést kapják;
- `--model <id>` beillesztése a `--provider`/`--model` alapján.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

A Gemini munkaterület-megbízhatósági védelme fej nélküli módban is érvényes —
adja át saját maga a `--skip-trust` kapcsolót (vagy interaktív módon nyilvánítsa
megbízhatónak a könyvtárat); az indító szándékosan nem kerüli meg ezt. Ez az indító
különbözik az **ACP-regisztrációtól** (`src/lib/acp/registry.ts`, `gemini --acp`),
amely továbbra is a `/dashboard/acp-agents` ügynökprotokoll-integrációja.

---

## Valódi smoke tesztkör (opcionális)

A determinisztikus indításiterv-regressziós tesztek a CI-ban futnak (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). A VALÓDI binárisok VALÓDI
OmniRoute-kiszolgálóval történő ellenőrzéséhez egy opcionálisan aktiválható tesztkeret érhető el a
`tests/integration/upstream-cli-smoke.int.test.ts` fájlban. Soha nem fut automatikusan
(minden részteszt kimarad, hacsak nincs beállítva a `RUN_CLI_SMOKE=1`), a hitelesítő adatot a környezeti változó
NEVÉVEL adja át (soha nem az értékével), minden rögzített kimenetből kitakarja a kulcsformájú karakterláncokat, kihagyja
azokat a célokat, amelyek binárisa nincs telepítve, és a hibákat egyszerű logikai érték helyett
auth / upstream / config kategóriákba sorolja:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcionális: az `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` a tesztkört a megadott célokra korlátozza;
az `OMNIROUTE_SMOKE_TIMEOUT_MS` felülírja a célonkénti 120 másodperces időkorlátot.

---

## Lásd még

- [Claude Code konfigurálása](./CLAUDE-CODE-CONFIGURATION.md) — részletesebb útmutató a Claude Code használatához
- [Codex CLI konfigurálása](./CODEX-CLI-CONFIGURATION.md) — az egyszeri `[model_providers.omniroute]` alapbeállítás
- [Távoli mód](./REMOTE-MODE.md) — környezetek, hatókörrel rendelkező hozzáférési tokenek és távoli kiszolgáló vezérlése
- [CLI-eszközök referenciája](../reference/CLI-TOOLS.md) — a támogatott eszközök és irányítópult-oldalak teljes katalógusa
- [Telepítési útmutató](./SETUP_GUIDE.md) — telepítési módszerek és az első indítás beállításai
