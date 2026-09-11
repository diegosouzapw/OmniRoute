# CLI-INTEGRATIONS (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI integracijos — nukreipkite bet kurią programavimo CLI į OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI integracijos

OmniRoute pateikiama su `setup-*` komandų rinkiniu, kuris sukonfigūruoja programavimo
CLI (Codex, Claude Code, OpenCode, Cline, …), kad ji naudotų OmniRoute kaip savo posistemę — taip
įrankis komunikuoja su **vienu** galiniu tašku, o OmniRoute nukreipia užklausas tinkamam teikėjui ir
automatiškai persijungia gedimo atveju. Kiekviena komanda nuskaito **tiesioginį** modelių katalogą iš veikiančio
OmniRoute egzemplioriaus (vietinio arba nuotolinio) ir įrašo paties įrankio konfigūracijos failą **jūsų**
kompiuteryje. Kai įrankis tai palaiko, API raktas nurodomas per aplinkos kintamąjį.
Komandos, kurios išsaugo įrankio vietinį aplinkos failą, pažymėtos toliau.

Taip pat yra bendroji paleidyklė — `omniroute run <target>` — kuri paleidžia
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` arba `gemini`, įterpdama
tinkamus aplinkos kintamuosius ir visai neįrašydama jokios konfigūracijos. Tikslai ir jų
pseudonimai gaunami iš kanoninio aprašo `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), o `omniroute completion` siūlo tuos pačius
iš aprašo gautus tikslų žodžius. Senosios atskiriems įrankiams skirtos paleidyklės —
`omniroute launch` (Claude Code) ir `omniroute launch-codex` (Codex) — tebėra
prieinamos.

Teikėjų prijungimas pasiekiamas tame pačiame vietiniame arba nuotoliniame kontekste. Toliau
pateiktos API pirmenybę teikiančios komandos valdymo autentifikavimą atskiria nuo teikėjo
prisijungimo duomenų ir niekada nespausdina prisijungimo duomenų struktūrizuotoje išvestyje:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Skriptuose pirmenybę teikite `--credential-stdin` arba `--credential-env`; `--credential`
palikta kontroliuojamam vietiniam naudojimui. Neinteraktyviame terminale `providers remove`
reikalauja `--yes`, o visos penkios komandos atsižvelgia į aktyvų kontekstą arba
visuotines `--base-url`/`--api-key` parinktis.

Apie vienkartinį, rankiniu būdu atliekamą dviejų funkcionaliausių integracijų bazinį nustatymą žr.
išsamiuose atskirų įrankių vadovuose:

- [Claude Code konfigūracija](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfigūracija](./CODEX-CLI-CONFIGURATION.md)
- [Nuotolinis režimas](./REMOTE-MODE.md) — valdykite nuotolinį OmniRoute (VPS / Tailnet) iš savo nešiojamojo kompiuterio
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot plėtinys; jis taip pat gali vykdyti šias
  `setup-*` komandas už jus tiesiai redaktoriuje

---

## Pagrindinė lentelė

Kiekviena komanda atsižvelgia į **aktyvų kontekstą** (nustatomą su `omniroute connect`, žr.
[Nuotolinis režimas](./REMOTE-MODE.md)) arba į aiškiai nurodytas `--remote <url> --api-key <key>` žymas.
Toliau „vietinis ar nuotolinis“ reiškia: nenurodžius žymų naudojamas `http://localhost:20128`;
su `--remote` (arba aktyviu nuotoliniu kontekstu) katalogas gaunamas iš to
serverio, o konfigūracija įrašoma vietiniame kompiuteryje.

| Komanda                    | Įrankis                         | Ką ji įrašo                                                                                                                                                             | Pagrindinės žymos                                                                                                                          | Vietinis ar nuotolinis |
| -------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                | `~/.codex/<name>.config.toml` — po vieną profilį kiekvienam suderinamam teksto modeliui (`codex --profile <name>`)                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Abu                    |
| `omniroute setup-claude`   | Claude Code                     | `~/.claude/profiles/<name>/settings.json` — po vieną profilį kiekvienam atitinkančiam modeliui (`CLAUDE_CONFIG_DIR`)                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Abu                    |
| `omniroute setup-opencode` | OpenCode (suderinama su OpenAI) | `~/.config/opencode/opencode.json` — `omniroute` teikėjas su kiekvienu katalogo modeliu (`opencode -m omniroute/<model>`)                                               | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Abu                    |
| `omniroute setup-cline`    | Cline                           | `~/.cline/data/{globalState,secrets}.json` (CLI režimas) + išspausdina VS Code plėtinio nuostatas                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Abu                    |
| `omniroute setup-kilo`     | Kilo Code                       | `~/.local/share/kilo/auth.json` (CLI) + įlieja `kilocode.*` į VS Code `settings.json`, jei jis yra                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Abu                    |
| `omniroute setup-continue` | Continue / `cn` CLI             | `~/.continue/config.yaml` — `provider: openai` modeliai, raktas per `${{ secrets.OMNIROUTE_API_KEY }}`                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Abu                    |
| `omniroute setup-cursor`   | Cursor                          | Nieko — išspausdina veiksmus programoje (Cursor konfigūracija yra neskaidri SQLite duomenų bazė)                                                                        | `--remote` `--api-key` `--only` `--port`                                                                                                   | Abu                    |
| `omniroute setup-roo`      | Roo Code                        | `~/.omniroute/roo-settings.json` (importavimo dokumentas) + nustato `roo-cline.autoImportSettingsPath`, jei yra VS Code `settings.json`                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Abu                    |
| `omniroute setup-crush`    | Crush                           | `~/.config/crush/crush.json` — `openai-compat` teikėjas, raktas per `$OMNIROUTE_API_KEY`                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Abu                    |
| `omniroute setup-goose`    | Goose                           | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + išspausdina aplinkos kintamųjų instrukciją                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Abu                    |
| `omniroute setup-aider`    | Aider                           | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + išspausdina aplinkos kintamųjų instrukciją                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Abu                    |
| `omniroute setup-qwen`     | Qwen Code                       | `~/.qwen/settings.json` — V4 `modelProviders.openai` masyvas + `OMNIROUTE_API_KEY` faile `~/.qwen/.env`                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Abu                    |
| `omniroute setup-5dive`    | 5dive (agentų grupė)            | Nieko po `$HOME` — įrašo 5dive **autentifikavimo profilį** (`/var/lib/5dive/auth-profiles/<name>/`) per `5dive agent auth set`; tik root, vykdoma grupės serveryje      | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Abu                    |
| `omniroute run <target>`   | Vykdymo paleidimas (bendrasis)  | Nieko — paleidžia `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` su tinkama aplinka ir argumentais; Qwen ir Gemini naudoja laikiną izoliuotą namų katalogą | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Abu                    |
| `omniroute launch`         | Claude Code                     | Nieko — paleidžia `claude`, įterpdama `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                       | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Abu                    |
| `omniroute launch-codex`   | OpenAI Codex CLI                | Nieko — paleidžia `codex`, įterpdama `omniroute` teikėją per `-c` žymas                                                                                                 | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Abu                    |

Pastabos apie žymas (patikrinta komandų šaltinio kode):

- `--remote <url>` — gauti katalogą iš nuotolinio OmniRoute (viršesnė už `--port`
  ir aktyvų kontekstą). `--api-key <key>` pateikia to serverio prisijungimo duomenis
  (numatytoji reikšmė yra aplinkos kintamasis `OMNIROUTE_API_KEY` arba aktyvaus konteksto prieigos raktas).
- `--only <patterns>` — kableliais atskirtos poeilutės; paliekami tik atitinkantys modelių ID
  (pvz., `--only glm,kimi`). Pasiekiama komandose `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — tiksliai išspausdinti, kas būtų įrašyta, nekeičiant
  failų sistemos. Pasiekiama kiekvienoje `setup-*` komandoje, **išskyrus** `setup-cursor`
  (ji niekada neįrašo failo).
- `--model <id>` — privaloma (arba pasirenkama interaktyviai) įrankiams, kurie neturi
  automatinio modelių aptikimo: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Šie įrankiai
  taip pat priima `--yes`, skirtą neinteraktyviam vykdymui (tuomet būtina `--model`).
  `setup-opencode` priima `--model`, kad nustatytų numatytąjį aukščiausiojo lygio modelį.
- `--model <id>` komandoje `omniroute run` vadovaujasi kiekvienam tikslui apraše nurodytu susiejimu
  (`bin/cli/cli-manifest.mjs`): **aider** gauna `--model openai/<id>`, o
  **opencode** — `--model omniroute/<id>` (priešdėlis pridedamas tik tada, kai ID
  jo dar neturi); **qwen** ir **gemini** gauna ID nepakeistą;
  **claude** jį gauna per `ANTHROPIC_MODEL`, **goose** — per `GOOSE_MODEL`, o
  **codex** — per `-c model_providers.omniroute.*` argumentus. **Qwen yra vienintelis vykdymo
  tikslas, kuriam `--model` yra griežtai privaloma** — `omniroute run qwen` be jos baigia darbą
  kodu `2` ir pateikia aiškią klaidą.
- `--port <port>` — vietinio OmniRoute prievadas (numatytasis `20128`, ignoruojamas, kai nustatyta
  `--remote`). Yra visose `setup-*` komandose ir abiejose paleidyklėse.
- `omniroute run` baigties kodai: antrinės CLI baigties kodas perduodamas
  nepakeistas; `2` = netinkami argumentai (nepalaikomas tikslas, trūksta privalomos
  `--model`, konteinerio apsauga); `127` = tikslo vykdomojo failo nėra `PATH`;
  `130`/`143`/`129`, kai paleidimą užbaigia `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = kita vykdymo paleidimo triktis.
- Abi paleidyklės (`launch`, `launch-codex`) priima `--profile <name>`, kad pasirinktų
  profilį, įrašytą `setup-claude` / `setup-codex`, ir persiunčiamus argumentus
  atitinkamam `claude` / `codex` vykdomajam failui.

Interaktyviąją parinkimo priemonę taip pat naudoja nustatymo receptai:

```bash
# Pasirinkite iš aktyvaus vietinio arba nuotolinio modelių katalogo ir sukonfigūruokite tikslą.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Šiuo metu `configure` perduoda vykdymą išbandytiems `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` ir `5dive` receptams.
Tik IDE skirti,
MITM ir tik vadovu aprašyti katalogo įrašai lieka aiškiais `setup-*` / rankiniais procesais ir
nėra pateikiami kaip paleidžiami tikslai.

> `setup-opencode` yra **supaprastinta, su OpenAI suderinama** OpenCode integracija.
> Taip pat yra funkcionalesnė papildinio integracija — `omniroute setup opencode` — kuri
> įdiegia `@omniroute/opencode-plugin`. Tai skirtingos komandos; pirmiau pateiktoje lentelėje
> aprašoma `setup-opencode`.

---

## Vietinis naudojimas

Kai OmniRoute veikia adresu `localhost:20128`, tiesiog paleiskite savo įrankio
sąrankos komandą. Katalogas gaunamas iš vietinio serverio.

```bash
# Codex: kiekvienam atitinkančiam modeliui įrašyti profilį į ~/.codex/
omniroute setup-codex
codex --profile glm52            # naudoti sugeneruotą profilį

# Claude Code: įrašyti kiekvieno modelio profilius, tada paleisti vieną iš jų
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: įrašyti su OpenAI suderinamą teikėją su visais katalogo modeliais
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # nurodomas per {env:OMNIROUTE_API_KEY}, niekada neįrašomas diske
opencode -m omniroute/glm/glm-5.2 "..."

# Įrankiams be automatinio aptikimo reikia aiškiai nurodyti modelį:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Peržiūra nieko neįrašant:
omniroute setup-continue --dry-run
```

Paleidimas visiškai neįrašant jokios konfigūracijos (tik įterpiant aplinkos kintamuosius):

```bash
omniroute launch                 # Claude Code → vietinis OmniRoute
omniroute launch-codex           # Codex CLI → vietinis OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Aiškus komandos kelias: perduoti viską, kas eina po --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Nuotolinis naudojimas

Nukreipkite bet kurią sąrankos komandą į nuotolinį OmniRoute naudodami `--remote` + `--api-key`.
Katalogas gaunamas iš nuotolinio serverio, o konfigūracija įrašoma jūsų vietiniame kompiuteryje.

```bash
# OpenCode su nuotoliniu VPS, paliekant tik glm/kimi modelius
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # pirmiausia eksportuoti OMNIROUTE_API_KEY

# Codex profiliai iš nuotolinio katalogo
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Paleisti CLI tiesiogiai su nuotoliniu serveriu
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Užuot kiekvieną kartą perdavę `--remote`/`--api-key`, prisijunkite vieną kartą ir leiskite
**aktyviajam kontekstui** juos pateikti automatiškai:

```bash
omniroute connect 192.168.0.15        # sukuria ribotos apimties prieigos raktą ir išsaugo kontekstą
omniroute setup-codex                 # ← dabar naudoja nuotolinį katalogą
omniroute setup-opencode              # ← taip pat
omniroute launch                      # ← Claude Code su nuotoliniu serveriu
```

Apie kontekstus, apimtis ir prieigos raktų valdymą žr. [Nuotolinis režimas](./REMOTE-MODE.md).

---

## 5dive agentų parkai

[5dive](https://5dive.ai) paleidžia ilgai veikiančių programavimo agentų parką, kuriame kiekvienas agentas yra
systemd vienetas, veikiantis su atskiru Unix naudotoju. Pats 5dive nėra programavimo CLI, todėl
`omniroute run` neturi ko paleisti — `5dive` yra **tik konfigūravimui** skirta paskirtis.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Abiem būdais įrašomas vienas 5dive **autentifikavimo profilis**, o kiekvienas su tuo
profiliu susietas `claude` egzempliorius tuomet komunikuoja su OmniRoute. Šiai paskirčiai būdingi trys dalykai:

- **Ji vykdoma parko pagrindiniame kompiuteryje root teisėmis.** 5dive komandos veikia vietinius systemd vienetus
  ir root priklausantį būsenos katalogą; nuotolinio režimo nėra. Jei procesas dar nevykdomas
  root teisėmis, receptas paleidžia save iš naujo per `sudo` (`--no-sudo` tai išjungia ir vietoje
  vykdymo išspausdina komandą).
- **Galinis taškas turi naudoti `https://`, nebent tai yra grįžtamojo ryšio adresas.** Agento API raktas
  siunčiamas tuo URL su kiekviena užklausa, o 5dive neleidžia naudoti nešifruoto galinio taško už šio kompiuterio ribų.
  Privatus LAN adresas nėra išimtis.
- **Kiekvieno egzemplioriaus atskirai prisegtas modelis turi pirmenybę prieš profilį.** Profilyje yra
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, tačiau egzemplioriaus, vis dar prisegto prie standartinio
  modelio ID, pirmasis veiksmas baigiasi klaida _"There's an issue with the selected model"_.
  Perduokite `--agent <name>` (galima kartoti), kad prisegtumėte ir egzempliorius; jei to nepadarysite,
  receptas išspausdins komandą.

API raktas 5dive perduodamas per **stdin** (`--api-key=-`), todėl jis niekada nepasirodo
`ps` išvestyje.

Profilį nukreipus į OmniRoute **kombinaciją**, o ne į vieną modelį, parkas gauna
teikėjo atsarginio perjungimo funkciją: kai vykdant
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) užfiksuotą procesą pagrindinis galinis taškas visiškai nustojo veikti veiksmo viduryje,
agentas likusius veiksmus užbaigė naudodamas atsarginį galinį tašką ir naudotojui apie sutrikimą nepranešė.

---

## Bazinio URL konvencijos (kuriems įrankiams reikia `/v1`)

OmniRoute pateikia su OpenAI suderinamą sąsają adresu `/v1`, su Anthropic suderinamą sąsają šakniniame adrese,
o savąją Gemini sąsają – adresu `/v1beta`. Kiekviena integracija sukonfigūruota naudoti jos
įrankio reikalaujamą formatą (patikrinta komandų šaltinio kode):

| Integracija                                                                | Įrašomas bazinis URL | `/v1`?                                      |
| -------------------------------------------------------------------------- | -------------------- | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | šakninis             | Ne — Cline prideda `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | šakninis             | Ne — Goose prideda kelią                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | šakninis             | Ne — LiteLLM prideda `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | su `/v1`             | Taip                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | šakninis             | Ne — Claude Code prideda `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | su `/v1`             | Taip                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | su `/v1`             | Taip                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | šakninis             | Ne — SDK prideda `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` autentifikavimo profilyje)             | šakninis             | Ne — Claude Code prideda `/v1/messages`     |

---

## Savųjų priklausomybių išsaugojimas atnaujinant: `--include=optional`

Kai atnaujinate naudodami `omniroute update` (patvirtinę arba su `--apply`),
OmniRoute paleidžia diegimą su iš anksto įtraukta parinktimi `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Tai **nėra** parinktis, kurią reikia perduoti komandai `omniroute update` — atnaujinimo
priemonė ją visada pritaiko. Taip užtikrinama, kad `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM rinkinys) išliks po
atnaujinimo net jei jūsų npm konfigūracijoje nustatyta `omit=optional`; priešingu
atveju savoji SQLite tvarkyklė ir susiejimas su operacinės sistemos raktine būtų
tyliai pašalinti. Norėdami peržiūrėti tikslią komandą jos nevykdydami:

```bash
omniroute update --dry-run
# [BANDOMASIS PALEIDIMAS] Būtų vykdoma: npm install -g omniroute@latest --include=optional
```

Kitos `omniroute update` parinktys (patikrintos šaltinio kode): `--check` (baigti
su kodu 1, jei versija pasenusi), `--apply` (diegti neprašant patvirtinimo),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI per `omniroute run gemini`

Sutartis patikrinta naudojant `@google/gemini-cli` 0.50.0: CLI atsižvelgia į
`GOOGLE_GEMINI_BASE_URL` ir siunčia `POST /v1beta/models/<model>:generateContent`
(ir `:streamGenerateContent?alt=sse`) užklausas šiuo adresu — būtent į savąją
OmniRoute Gemini sąsają (`/v1beta`). `omniroute run gemini` tai sukonfigūruoja automatiškai:

- `GOOGLE_GEMINI_BASE_URL` → aktyvus OmniRoute bazinis URL (šakninis, be `/v1`);
- `GEMINI_API_KEY` → nustatyti OmniRoute prisijungimo duomenys (parinktis / aplinkos kintamasis / kontekstas);
- **laikinas izoliuotas `GEMINI_CLI_HOME`**, kurio `.gemini/settings.json`
  pasirenka `gemini-api-key` autentifikavimą, todėl išsaugota Google OAuth sesija
  (Code Assist) niekada nepakeičia į OmniRoute nukreisto paleidimo — pašalinamas
  procesui pasibaigus;
- **aplinkos higiena**: iš antrinio proceso aplinkos pašalinami `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` ir `GOOGLE_GENAI_USE_GCA` (kurie nukreiptų
  autentifikavimą į Vertex/Code Assist), o `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  nustatomas kaip papildoma atsarginė apsauga — kitiems `run` tikslams taip pat
  pašalinami jų konfliktuojantys kintamieji;
- `--model <id>` įterpimas iš `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini darbo srities patikimumo patikra vis tiek taikoma begalviu režimu —
perduokite `--skip-trust` (arba interaktyviai patvirtinkite katalogą) patys;
paleidimo priemonė sąmoningai jos neapeina. Ši paleidimo priemonė skiriasi nuo
**ACP registracijos** (`src/lib/acp/registry.ts`, `gemini --acp`), kuri ir toliau
naudojama kaip agentų protokolo integracija, skirta `/dashboard/acp-agents`.

---

## Tikrasis dūminis patikrinimas (pasirenkamas)

Deterministinės paleidimo plano regresijos vykdomos CI aplinkoje (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Norint patikrinti TIKRUOSIUS vykdomuosius failus naudojant TIKRĄ
„OmniRoute“ serverį, galima pasirinktinai naudoti testavimo sistemą, esančią
`tests/integration/upstream-cli-smoke.int.test.ts`. Ji niekada nepaleidžiama automatiškai
(kiekvienas dalinis testas praleidžiamas, nebent nustatyta `RUN_CLI_SMOKE=1`), prisijungimo duomenys perduodami
aplinkos kintamojo PAVADINIMU (niekada ne reikšme), iš bet kokios įrašytos išvesties pašalinamos raktus
primenančios eilutės, praleidžiami tikslai, kurių vykdomasis failas neįdiegtas, o nesėkmės klasifikuojamos kaip
autentifikavimo / išorinio teikėjo / konfigūracijos, o ne pateikiamos kaip paprasta loginė reikšmė:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Pasirinktinai: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` apriboja patikrinimo apimtį;
`OMNIROUTE_SMOKE_TIMEOUT_MS` pakeičia numatytąją 120 s kiekvieno tikslo skirtojo laiko ribą.

---

## Taip pat žr.

- [„Claude Code“ konfigūracija](./CLAUDE-CODE-CONFIGURATION.md) — išsamesnis „Claude Code“ vadovas
- [„Codex CLI“ konfigūracija](./CODEX-CLI-CONFIGURATION.md) — vienkartinė bazinė `[model_providers.omniroute]` sąranka
- [Nuotolinis režimas](./REMOTE-MODE.md) — kontekstai, ribotos apimties prieigos prieigos raktai ir nuotolinio serverio valdymas
- [CLI įrankių žinynas](../reference/CLI-TOOLS.md) — visas palaikomų įrankių ir prietaisų skydelio puslapių katalogas
- [Sąrankos vadovas](./SETUP_GUIDE.md) — diegimo būdai ir pirmojo paleidimo sąranka
