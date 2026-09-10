# CLI-INTEGRATIONS (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI Mchanganyiko — elekeza CLI ya uandishi kwenye OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Mchanganyiko

OmniRoute inatoa familia ya amri `setup-*` ambazo zinaweka mchanganyiko wa uandishi
CLI (Codex, Claude Code, OpenCode, Cline, …) kutumia OmniRoute kama backend yake — hivyo
chombo kinawasiliana na **nukta** moja na OmniRoute inaelekeza kwa mtoa huduma sahihi kwa
kuanguka kiotomatiki. Kila amri inasoma **katalogi** ya mfano wa moja kwa moja kutoka kwa
OmniRoute inayofanya kazi (ya ndani au ya mbali) na kuandika faili la usanidi la chombo
kwenye **kompyuta yako**. Funguo ya API inarejelewa na mabadiliko ya mazingira popote ambapo chombo
kinaiunga mkono. Amri ambazo zinaweka faili la mazingira la chombo la ndani zimeandikwa hapa chini.

Pia kuna mchezaji wa jumla — `omniroute run <target>` — ambaye anazalisha
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` au `gemini` na
muhimu sahihi ikingizwa, bila kuandika usanidi wowote. Malengo na majina yao
yanatoka kwenye orodha ya kawaida `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), na `omniroute completion` inatoa
maneno ya malengo yanayotokana na orodha hiyo. Mchezaji wa zamani wa kila chombo —
`omniroute launch` (Claude Code) na `omniroute launch-codex` (Codex) — bado
zinapatikana.

Kujiunga na mtoa huduma kunapatikana kutoka kwa muktadha wa ndani/mbali. Amri
za API-kwanza hapa chini zinaweka uthibitishaji wa usimamizi tofauti na
akidi za mtoa huduma na kamwe hazichapishi akidi katika matokeo yaliyopangwa:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Kwa scripts, pendelea `--credential-stdin` au `--credential-env`; `--credential`
imehifadhiwa kwa matumizi ya ndani yaliyodhibitiwa. `providers remove` inahitaji `--yes` kwenye
terminal isiyoingiliana, na amri zote tano heshimu muktadha wa sasa au chaguo za
global `--base-url`/`--api-key`.

Kwa usanidi wa msingi wa mara moja, wa mikono wa mchanganyiko wenye utajiri zaidi, angalia
uchambuzi wa kina wa kila chombo:

- [Usanidi wa Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Usanidi wa Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Hali ya Mbali](./REMOTE-MODE.md) — endesha OmniRoute ya mbali (VPS / Tailnet) kutoka kwa kompyuta yako
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — nyongeza ya OmniCopilot; inaweza pia kuendesha hizi
  `setup-*` amri kwa niaba yako kutoka ndani ya mhariri

---

## Jedwali Kuu

Kila amri heshimu **muktadha wa sasa** (iliyowekwa na `omniroute connect`, ona
[Hali ya Mbali](./REMOTE-MODE.md)) au bendera wazi `--remote <url> --api-key <key>`.
"Ya ndani dhidi ya mbali" hapa chini inamaanisha: bila bendera inashughulikia `http://localhost:20128`;
ikiwa na `--remote` (au muktadha wa mbali ulio hai) inapata katalogi kutoka kwa
seva hiyo na kuandika usanidi kwa ndani.

| Amri                       | Chombo                        | Kile kinachoandikwa                                                                                                                                      | Bendera muhimu                                                                                                                             | Ya ndani dhidi ya mbali |
| -------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI              | `~/.codex/<name>.config.toml` — wasifu mmoja kwa kila mfano wa maandiko unaofaa (`codex --profile <name>`)                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Zote                    |
| `omniroute setup-claude`   | Claude Code                   | `~/.claude/profiles/<name>/settings.json` — wasifu mmoja kwa kila mfano uliofanana (`CLAUDE_CONFIG_DIR`)                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Zote                    |
| `omniroute setup-opencode` | OpenCode (inayofaa na openai) | `~/.config/opencode/opencode.json` — mtoa huduma wa `omniroute` na kila mfano wa katalogi (`opencode -m omniroute/<model>`)                              | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Zote                    |
| `omniroute setup-cline`    | Cline                         | `~/.cline/data/{globalState,secrets}.json` (hali ya CLI) + inachapisha mipangilio ya nyongeza ya VS Code                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Zote                    |
| `omniroute setup-kilo`     | Kilo Code                     | `~/.local/share/kilo/auth.json` (CLI) + inachanganya `kilocode.*` katika `settings.json` ya VS Code ikiwa inapatikana                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Zote                    |
| `omniroute setup-continue` | Continue / `cn` CLI           | `~/.continue/config.yaml` — `provider: openai` mifano, funguo kupitia `${{ secrets.OMNIROUTE_API_KEY }}`                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Zote                    |
| `omniroute setup-cursor`   | Cursor                        | Hakuna — inachapisha hatua za ndani ya programu (mipangilio ya Cursor ni SQLite isiyoonekana)                                                            | `--remote` `--api-key` `--only` `--port`                                                                                                   | Zote                    |
| `omniroute setup-roo`      | Roo Code                      | `~/.omniroute/roo-settings.json` (nyaraka ya kuagiza) + inaweka `roo-cline.autoImportSettingsPath` ikiwa `settings.json` ya VS Code inapatikana          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Zote                    |
| `omniroute setup-crush`    | Crush                         | `~/.config/crush/crush.json` — mtoa huduma wa `openai-compat`, funguo kupitia `$OMNIROUTE_API_KEY`                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Zote                    |
| `omniroute setup-goose`    | Goose                         | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + inachapisha mapishi ya mazingira                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Zote                    |
| `omniroute setup-aider`    | Aider                         | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + inachapisha mapishi ya mazingira                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Zote                    |
| `omniroute setup-qwen`     | Qwen Code                     | `~/.qwen/settings.json` — V4 `modelProviders.openai` orodha + `OMNIROUTE_API_KEY` katika `~/.qwen/.env`                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Zote                    |
| `omniroute run <target>`   | Uzinduzi wa wakati (jumla)    | Hakuna — anazalisha `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` na mazingira na hoja sahihi; Qwen na Gemini hutumia nyumbani iliyotengwa | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Zote                    |
| `omniroute launch`         | Claude Code                   | Hakuna — anazalisha `claude` na `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` ikingizwa                                                                    | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Zote                    |
| `omniroute launch-codex`   | OpenAI Codex CLI              | Hakuna — anazalisha `codex` na mtoa huduma wa `omniroute` ikingizwa kupitia bendera `-c`                                                                 | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Zote                    |

Maelezo kuhusu bendera (yamehakikishwa katika chanzo cha amri):

- `--remote <url>` — pata katalogi kutoka kwa OmniRoute ya mbali (inabatilisha `--port`
  na muktadha wa sasa). `--api-key <key>` inatoa akidi kwa ajili ya
  seva hiyo (inatumika kama chaguo la `OMNIROUTE_API_KEY` env var, au token ya muktadha wa sasa).
- `--only <patterns>` — sehemu za maandiko zilizotenganishwa kwa koma; hifadhi tu vitambulisho vya mfano vinavyolingana
  (mfano `--only glm,kimi`). Inapatikana kwenye `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — chapisha hasa kile ambacho kingeandikwa bila kugusa
  mfumo wa faili. Inapatikana kwenye kila amri ya `setup-*` **isipokuwa** `setup-cursor`
  (ambayo kamwe haiandiki faili).
- `--model <id>` — inahitajika (au kuchaguliwa kwa njia ya mwingiliano) kwa zana ambazo hazina
  ugunduzi wa mfano kiotomatiki: Cline, Kilo, Roo, Goose, Qwen, Aider. Zana hizo
  pia zinakubali `--yes` kwa matumizi yasiyoingiliana (ambayo kisha inahitaji `--model`).
  `setup-opencode` inachukua `--model` kuweka mfano wa juu wa default.
- `--model <id>` kwenye `omniroute run` inafuata uunganisho wa orodha ya malengo
  (`bin/cli/cli-manifest.mjs`): **aider** inapata `--model openai/<id>` na
  **opencode** `--model omniroute/<id>` (kiambatisho kinajumuishwa tu wakati id
  haijabeba tayari); **qwen** na **gemini** zinapata id kama ilivyo; **claude** inapata kupitia `ANTHROPIC_MODEL`, **goose** kupitia `GOOSE_MODEL`, na
  **codex** kupitia `-c model_providers.omniroute.*` hoja. **Qwen ndiyo lengo pekee la kuendesha
  ambalo linahitaji kwa nguvu `--model`** — `omniroute run qwen` bila hiyo inatoka
  `2` na makosa wazi.
- `--port <port>` — bandari ya ndani ya OmniRoute (chaguo la msingi `20128`, ignored when `--remote`
  is set). Ipo kwenye kila `setup-*` na mchezaji wote wawili.
- Nambari za kutoka za `omniroute run`: nambari ya kutoka ya CLI ya mtoto inasambazwa
  kama ilivyo; `2` = hoja zisizo sahihi (lengo lisiloungwa mkono, kukosa
  `--model` inayohitajika, mlinzi wa kontena); `127` = faili la lengo halipo katika `PATH`;
  `130`/`143`/`129` wakati uzinduzi unamalizika kwa `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = kushindwa kwa uzinduzi mwingine wa wakati.
- Wachezaji wawili (`launch`, `launch-codex`) wanakubali `--profile <name>` kuchagua
  wasifu ulioandikwa na `setup-claude` / `setup-codex`, pamoja na hoja za kupitisha kwa
  faili ya msingi ya `claude` / `codex`.

Mchaguzi wa mwingiliano pia unashirikiwa na mapishi ya usanidi:

```bash
# Chagua kutoka kwa katalogi ya mfano wa ndani au wa mbali na uweke malengo.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` kwa sasa inapeleka kwa mapishi yaliyopimwa kwa `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, na `kilo`. Katalogi za IDE pekee,
MITM, na zile za mwongozo pekee zinabaki kuwa wazi `setup-*`/mchakato wa mikono na
hazionyeshwi kama malengo yanayoweza kuzinduliwa.

> `setup-opencode` ni mchanganyiko wa **nyepesi unaofaa na openai** wa OpenCode.
> Pia kuna mchanganyiko wa nyongeza wenye utajiri zaidi — `omniroute setup opencode` — ambayo
> inasakinisha `@omniroute/opencode-plugin`. Hizi ni amri tofauti; jedwali
> hapo juu linaelezea `setup-opencode`.

---

## Matumizi ya ndani

Ikiwa OmniRoute inafanya kazi kwenye `localhost:20128`, endesha tu amri ya usanidi kwa zana yako. Katalogi inapatikana kutoka kwa seva ya ndani.

```bash
# Codex: andika profaili kwa kila mfano uliofanikiwa kwenye ~/.codex/
omniroute setup-codex
codex --profile glm52            # tumia profaili iliyoundwa

# Claude Code: andika profaili za kila mfano, kisha anzisha moja
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: andika mtoa huduma anayefaa na modeli zote za katalogi
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # inarejelea kupitia {env:OMNIROUTE_API_KEY}, kamwe sio kwenye diski
opencode -m omniroute/glm/glm-5.2 "..."

# Zana ambazo hazina kugunduliwa kiotomatiki zinahitaji mfano wazi:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Tazama bila kuandika chochote:
omniroute setup-continue --dry-run
```

Anzisha bila kuandika usanidi wowote (injection ya env pekee):

```bash
omniroute launch                 # Claude Code → OmniRoute ya ndani
omniroute launch-codex           # Codex CLI → OmniRoute ya ndani
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Njia ya amri wazi: pitisha chochote kinachokuja baada ya --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Matumizi ya mbali

Elekeza amri yoyote ya usanidi kwenye OmniRoute ya mbali kwa `--remote` + `--api-key`. Katalogi inapatikana kutoka kwa mbali; usanidi unandikwa kwenye mashine yako ya ndani.

```bash
# OpenCode dhidi ya VPS ya mbali, hifadhi tu modeli za glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # export OMNIROUTE_API_KEY kwanza

# Profaili za Codex kutoka kwa katalogi ya mbali
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Anzisha CLI moja kwa moja dhidi ya mbali
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Badala ya kupitisha `--remote`/`--api-key` kila wakati, ingia mara moja na uache
**muktadha wa kazi** iwape kiotomatiki:

```bash
omniroute connect 192.168.0.15        # inaunda token iliyo na upeo, inahifadhi muktadha
omniroute setup-codex                 # ← sasa inatumia katalogi ya mbali
omniroute setup-opencode              # ← sawa
omniroute launch                      # ← Claude Code dhidi ya mbali
```

Tazama [Njia ya Mbali](./REMOTE-MODE.md) kwa muktadha, upeo, na usimamizi wa tokeni.

---

## Mikataba ya URL ya Msingi (ambayo zana zinataka `/v1`)

OmniRoute inatoa uso wa OpenAI kwenye `/v1`, uso wa Anthropic kwenye mzizi,
na uso wa asili wa Gemini kwenye `/v1beta`. Kila ujumuishaji umeunganishwa na fomu ambayo
zana yake inatarajia (imehakikishwa katika chanzo cha amri):

| Ujumuishaji                                                                | URL ya Msingi iliyoandikwa | `/v1`?                                            |
| -------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | mzizi                      | Hapana — Cline inaongeza `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | mzizi                      | Hapana — Goose inaongeza njia                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | mzizi                      | Hapana — LiteLLM inaongeza `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | pamoja na `/v1`            | Ndio                                              |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | mzizi                      | Hapana — Claude Code inaongeza `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | pamoja na `/v1`            | Ndio                                              |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | pamoja na `/v1`            | Ndio                                              |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | mzizi                      | Hapana — SDK inaongeza `/v1beta/models/…`         |

---

## Kuhifadhi utegemezi wa asili kwenye sasisho: `--include=optional`

Unaposasisha kwa kutumia `omniroute update` (baada ya kuthibitisha, au kwa `--apply`),
OmniRoute inatekeleza usakinishaji kwa kutumia `--include=optional` iliyojumuishwa:

```bash
npm install -g omniroute@latest --include=optional
```

Hii **si** bendera unayoipatia `omniroute update` — inatumika kila wakati na
mwandikaji wa sasisho. Inahakikisha kwamba `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, stack ya LLMLingua SLM) inabaki baada ya sasisho hata kama usanidi wako wa npm
una `omit=optional` umewekwa, ambayo vinginevyo ingesababisha kimya kuondoa dereva wa SQLite
wa asili na uhusiano wa OS-keyring. Ili kuangalia amri halisi bila kutekeleza:

```bash
omniroute update --dry-run
# [DRY RUN] Ingefanya: npm install -g omniroute@latest --include=optional
```

Bendera nyingine za `omniroute update` (zilizothibitishwa kwenye chanzo): `--check` (ondoka 1 ikiwa
imepitwa na wakati), `--apply` (sakinisha bila kuomba), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI kupitia `omniroute run gemini`

Mkataba umehakikishwa dhidi ya `@google/gemini-cli` 0.50.0: CLI inaheshimu
`GOOGLE_GEMINI_BASE_URL` na kutoa `POST /v1beta/models/<model>:generateContent`
(na `:streamGenerateContent?alt=sse`) dhidi yake — hasa uso wa asili wa
Gemini wa OmniRoute (`/v1beta`). `omniroute run gemini` inafanya hivyo kiotomatiki:

- `GOOGLE_GEMINI_BASE_URL` → URL ya msingi ya OmniRoute inayotumika (mizizi, hakuna `/v1`);
- `GEMINI_API_KEY` → akidi ya OmniRoute iliyotatuliwa (chaguo/env/muktadha);
- **nyumba ya muda ya `GEMINI_CLI_HOME`** ambayo `.gemini/settings.json`
  inachagua uthibitisho wa `gemini-api-key`, hivyo kikao kilichohifadhiwa cha Google OAuth (Code Assist)
  hakitabadilisha uzinduzi unaoelekezwa na OmniRoute — inatolewa baada ya kutoka;
- **usafi wa env**: env ya mtoto imeondolewa `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` na `GOOGLE_GENAI_USE_GCA` (ambayo ingerejelea
  uthibitisho kwa Vertex/Code Assist), na `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` imewekwa
  kama akiba ya ziada — malengo mengine ya `run` yanapata matibabu sawa
  kwa mabadiliko yao yanayopingana;
- `--model <id>` kuingizwa kutoka `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Mlinzi wa uaminifu wa Gemini bado unatumika katika hali isiyo na kichwa — pitisha
`--skip-trust` (au uamini saraka kwa njia ya mwingiliano) mwenyewe; uzinduzi
kwa makusudi haupiti. Uzinduzi huu ni tofauti na **usajili wa ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), ambayo inabaki kuwa
kuunganishwa kwa wakala-protokali kwa `/dashboard/acp-agents`.

---

## Safisha moshi halisi (kujiunga)

Mipango ya uzinduzi wa kisheria inakimbia katika CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Ili kuthibitisha binaries HALISI dhidi ya
server HALISI ya OmniRoute, kuna vifaa vya kujiunga katika
`tests/integration/upstream-cli-smoke.int.test.ts`. Hii haitakimbia kiotomatiki
(kila mtihani wa chini unakosa isipokuwa `RUN_CLI_SMOKE=1`), inapitia akidi kwa jina la env-var
(NAME (sio kwa thamani), inaficha nyuzi za funguo kutoka kwa matokeo yoyote yaliyorekodiwa, inakosa
malengo ambayo binary yake haijasanidiwa, na inakadiria kushindwa kama
uthibitisho / mwelekeo / usanidi badala ya boolean tupu:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Hiari: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` inapunguza safu;
`OMNIROUTE_SMOKE_TIMEOUT_MS` inabadilisha muda wa sekunde 120 kwa kila lengo.

---

## Tazama pia

- [Usanidi wa Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — mwongozo wa kina wa Claude Code
- [Usanidi wa Codex CLI](./CODEX-CLI-CONFIGURATION.md) — usanidi wa msingi wa mara moja `[model_providers.omniroute]`
- [Hali ya Kijijini](./REMOTE-MODE.md) — muktadha, alama za ufikiaji zilizopangwa, kuendesha seva ya kijijini
- [Marejeleo ya Zana za CLI](../reference/CLI-TOOLS.md) — katalogi kamili ya zana zinazoungwa mkono + kurasa za dashibodi
- [Mwongozo wa Usanidi](./SETUP_GUIDE.md) — mbinu za usakinishaji na kuanzisha mara ya kwanza
