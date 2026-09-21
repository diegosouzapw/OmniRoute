# CLI Integrations (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute huja na familia ya amri za `setup-*` ambazo husanidi CLI ya uandishi wa msimbo
(Codex, Claude Code, OpenCode, Cline, …) ili kutumia OmniRoute kama backend yake — hivyo
zana huwasiliana na endpoint **moja** na OmniRoute huelekeza kwa mtoa huduma anayefaa huku
ikitumia mbadala kiotomatiki. Kila amri husoma katalogi ya modeli ya **moja kwa moja** kutoka
kwa OmniRoute inayoendesha (ya ndani au ya mbali) na kuandika faili ya usanidi ya zana yenyewe
kwenye mashine **yako**. Ufunguo wa API hurejelewa kupitia kigezo cha mazingira popote ambapo
zana inakiunga mkono. Amri zinazohifadhi faili ya mazingira ya ndani ya zana zimeainishwa hapa chini.

Pia kuna kizindua cha jumla — `omniroute run <target>` — ambacho huanzisha
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` au `gemini` kikiwa na
mazingira sahihi yaliyoingizwa, bila kuandika usanidi wowote. Malengo na majina yao
mbadala hutoka kwenye manifesti rasmi `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), na `omniroute completion` hutoa maneno
yale yale ya malengo yanayotokana na manifesti. Vizindua vya zamani vya kila zana —
`omniroute launch` (Claude Code) na `omniroute launch-codex` (Codex) — bado
vinapatikana.

Kuunganisha watoa huduma kunapatikana kutoka katika muktadha huohuo wa ndani/mbali. Amri
zifuatazo zinazotanguliza API hutenganisha uthibitishaji wa usimamizi na vitambulisho vya
watoa huduma na kamwe hazichapishi kitambulisho katika matokeo yenye muundo:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Kwa hati, pendelea `--credential-stdin` au `--credential-env`; `--credential`
imehifadhiwa kwa matumizi ya ndani yanayodhibitiwa. `providers remove` huhitaji `--yes` kwenye
terminali isiyoingiliana, na amri zote tano hutii muktadha unaotumika au chaguo za jumla
za `--base-url`/`--api-key`.

Kwa usanidi wa msingi wa mara moja unaoandikwa kwa mkono wa miunganisho miwili iliyo kamili zaidi, angalia
maelezo ya kina ya kila zana:

- [Usanidi wa Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Usanidi wa Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Hali ya Mbali](./REMOTE-MODE.md) — endesha OmniRoute ya mbali (VPS / Tailnet) kutoka kwenye kompyuta yako mpakato
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — kiendelezi cha OmniCopilot; kinaweza pia kuendesha amri hizi
  za `setup-*` kwa niaba yako kutoka ndani ya kihariri

---

## Jedwali kuu

Kila amri hutii **muktadha unaotumika** (uliowekwa kwa `omniroute connect`, angalia
[Hali ya Mbali](./REMOTE-MODE.md)) au bendera bayana za `--remote <url> --api-key <key>`.
"Ya ndani dhidi ya ya mbali" hapa chini inamaanisha: bila bendera hulenga `http://localhost:20128`;
ikiwa na `--remote` (au muktadha wa mbali unaotumika), huchukua katalogi kutoka kwenye
seva hiyo na kuandika usanidi kwenye mashine ya ndani.

| Amri                       | Zana                                        | Inachoandika                                                                                                                                                                                     | Bendera muhimu                                                                                                                             | Ndani dhidi ya mbali |
| -------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                            | `~/.codex/<name>.config.toml` — wasifu mmoja kwa kila modeli ya maandishi inayooana (`codex --profile <name>`)                                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Zote mbili           |
| `omniroute setup-claude`   | Claude Code                                 | `~/.claude/profiles/<name>/settings.json` — wasifu mmoja kwa kila modeli inayolingana (`CLAUDE_CONFIG_DIR`)                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Zote mbili           |
| `omniroute setup-opencode` | OpenCode (inaoana na openai)                | `~/.config/opencode/opencode.json` — mtoa huduma wa `omniroute` mwenye kila modeli ya katalogi (`opencode -m omniroute/<model>`)                                                                 | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Zote mbili           |
| `omniroute setup-cline`    | Cline                                       | `~/.cline/data/{globalState,secrets}.json` (hali ya CLI) + huchapisha mipangilio ya kiendelezi cha VS Code                                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Zote mbili           |
| `omniroute setup-kilo`     | Kilo Code                                   | `~/.local/share/kilo/auth.json` (CLI) + huunganisha `kilocode.*` katika `settings.json` ya VS Code ikiwa ipo                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Zote mbili           |
| `omniroute setup-continue` | Continue / `cn` CLI                         | `~/.continue/config.yaml` — modeli za `provider: openai`, ufunguo kupitia `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Zote mbili           |
| `omniroute setup-cursor`   | Cursor                                      | Hakuna — huchapisha hatua za kufuata ndani ya programu (usanidi wa Cursor ni SQLite isiyo wazi)                                                                                                  | `--remote` `--api-key` `--only` `--port`                                                                                                   | Zote mbili           |
| `omniroute setup-roo`      | Roo Code                                    | `~/.omniroute/roo-settings.json` (hati ya kuleta) + huweka `roo-cline.autoImportSettingsPath` ikiwa `settings.json` ya VS Code ipo                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Zote mbili           |
| `omniroute setup-crush`    | Crush                                       | `~/.config/crush/crush.json` — mtoa huduma wa `openai-compat`, ufunguo kupitia `$OMNIROUTE_API_KEY`                                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Zote mbili           |
| `omniroute setup-goose`    | Goose                                       | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + huchapisha maagizo ya mazingira                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Zote mbili           |
| `omniroute setup-aider`    | Aider                                       | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + huchapisha maagizo ya mazingira                                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Zote mbili           |
| `omniroute setup-qwen`     | Qwen Code                                   | `~/.qwen/settings.json` — safu ya V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` katika `~/.qwen/.env`                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Zote mbili           |
| `omniroute setup-5dive`    | 5dive (kundi la mawakala)                   | Hakuna chini ya `$HOME` — huandika **wasifu wa uthibitishaji** wa 5dive (`/var/lib/5dive/auth-profiles/<name>/`) kupitia `5dive agent auth set`; kwa root pekee, huendeshwa kwenye seva ya kundi | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Zote mbili           |
| `omniroute run <target>`   | Uanzishaji wakati wa utekelezaji (wa jumla) | Hakuna — huanzisha `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` kwa mazingira na hoja sahihi; Qwen na Gemini hutumia saraka ya nyumbani ya muda iliyotengwa                       | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Zote mbili           |
| `omniroute launch`         | Claude Code                                 | Hakuna — huanzisha `claude` huku `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` zikiingizwa                                                                                                         | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Zote mbili           |
| `omniroute launch-codex`   | OpenAI Codex CLI                            | Hakuna — huanzisha `codex` huku mtoa huduma wa `omniroute` akiingizwa kupitia bendera za `-c`                                                                                                    | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Zote mbili           |

Maelezo kuhusu alama (yamethibitishwa katika msimbo wa amri):

- `--remote <url>` — pakua katalogi kutoka OmniRoute ya mbali (hupuuza `--port`
  na muktadha unaotumika). `--api-key <key>` hutoa kitambulisho cha seva hiyo
  (chaguo-msingi ni env var ya `OMNIROUTE_API_KEY`, au tokeni ya muktadha unaotumika).
- `--only <patterns>` — vifungu vidogo vilivyotenganishwa kwa koma; hifadhi tu vitambulisho vya modeli vinavyolingana
  (k.m. `--only glm,kimi`). Inapatikana kwenye `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — chapisha hasa kile ambacho kingeandikwa bila kugusa
  mfumo wa faili. Inapatikana kwenye kila amri ya `setup-*` **isipokuwa** `setup-cursor`
  (ambayo haiandiki faili kamwe).
- `--model <id>` — inahitajika (au huchaguliwa kwa mwingiliano) kwa zana ambazo hazina
  ugunduzi wa modeli kiotomatiki: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Zana hizo
  pia hukubali `--yes` kwa utekelezaji usio wa mwingiliano (ambao kisha huhitaji `--model`).
  `setup-opencode` hutumia `--model` kuweka modeli chaguo-msingi ya kiwango cha juu.
- `--model <id>` kwenye `omniroute run` hufuata muunganisho wa kila lengwa wa manifesti
  (`bin/cli/cli-manifest.mjs`): **aider** hupokea `--model openai/<id>` na
  **opencode** `--model omniroute/<id>` (kiambishi awali huongezwa tu ikiwa id
  tayari haina kiambishi hicho); **qwen** na **gemini** hupokea id kama ilivyo;
  **claude** huipata kupitia `ANTHROPIC_MODEL`, **goose** kupitia `GOOSE_MODEL`, na
  **codex** kupitia hoja za `-c model_providers.omniroute.*`. **Qwen ndilo lengwa pekee la utekelezaji
  ambalo lazima liwe na `--model`** — `omniroute run qwen` bila hiyo hutoka
  kwa msimbo `2` pamoja na hitilafu iliyo wazi.
- `--port <port>` — porti ya ndani ya OmniRoute (chaguo-msingi `20128`, hupuuzwa wakati `--remote`
  imewekwa). Inapatikana kwenye amri zote za `setup-*` na vizinduzi vyote viwili.
- Misimbo ya kutoka ya `omniroute run`: msimbo wa kutoka wa CLI mtoto huenezwa
  kama ulivyo; `2` = hoja batili (lengwa lisilotumika, `--model` inayohitajika
  haipo, kizuizi cha kontena); `127` = faili tekelezi ya lengwa haipo kwenye `PATH`;
  `130`/`143`/`129` wakati uzinduzi unakatishwa na `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = hitilafu nyingine ya uzinduzi wakati wa utekelezaji.
- Vizinduzi hivyo viwili (`launch`, `launch-codex`) hukubali `--profile <name>` ili kuchagua
  wasifu ulioandikwa na `setup-claude` / `setup-codex`, pamoja na hoja zinazopitishwa
  kwenda kwenye faili tekelezi ya msingi ya `claude` / `codex`.

Kiteuzi cha mwingiliano pia kinashirikiwa na mapishi ya usanidi:

```bash
# Chagua kutoka kwenye katalogi inayotumika ya modeli za ndani au za mbali na usanidi lengwa.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Kwa sasa, `configure` hukabidhi kazi kwa mapishi yaliyopimwa ya `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, na `5dive`.
Maingizo ya katalogi ya IDE pekee,
MITM, na mwongozo pekee hubaki kuwa mtiririko wa wazi wa `setup-*`/mwongozo na
hayaonyeshwi kama malengo yanayoweza kuzinduliwa.

> `setup-opencode` ni muunganisho **mwepesi unaooana na openai** wa OpenCode.
> Pia kuna muunganisho wenye uwezo zaidi wa programu-jalizi — `omniroute setup opencode` — ambao
> husakinisha `@omniroute/opencode-plugin`. Hizi ni amri tofauti; jedwali
> lililo hapo juu linafafanua `setup-opencode`.
>
> Programu-jalizi hiyo huja katika vifurushi viwili, kimoja kwa kila toleo kuu la OpenCode, kwa sababu vipakiaji hivyo viwili
> vinatarajia sehemu tofauti za kuingilia:
> `@omniroute/opencode-plugin` kwa OpenCode v1 na
> `@omniroute/opencode-plugin-v2` kwa OpenCode v2. Kifurushi cha v2 ni kipya
> (`0.1.0`) na hufuata mkataba wa seva mwenyeji ambao bado unabadilika, kwa hivyo husoma
> muundo ambao OpenCode huingiza kwenye rasimu ya katalogi badala ya kudhani muundo fulani. Kisakinishe
> kwa kuongeza ingizo la `plugins` kwenye `opencode.json`; `omniroute setup opencode`
> bado husakinisha kifurushi cha v1. Chaguo na mpangilio wa utafutaji wa kitambulisho vimo kwenye
> README ya kifurushi.

---

## Matumizi ya ndani

OmniRoute ikiwa inaendeshwa kwenye `localhost:20128`, tekeleza tu amri ya usanidi ya zana yako. Katalogi hupakuliwa kutoka kwenye seva ya ndani.

```bash
# Codex: andika wasifu mmoja kwa kila modeli inayolingana ndani ya ~/.codex/
omniroute setup-codex
codex --profile glm52            # tumia wasifu uliozalishwa

# Claude Code: andika wasifu kwa kila modeli, kisha uzindue mmoja
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: andika mtoa huduma anayeendana na openai akiwa na modeli zote za katalogi
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # hurejelewa kupitia {env:OMNIROUTE_API_KEY}, kamwe haiwekwi kwenye diski
opencode -m omniroute/glm/glm-5.2 "..."

# Zana zisizo na ugunduzi wa kiotomatiki zinahitaji modeli iliyobainishwa wazi:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Hakiki bila kuandika chochote:
omniroute setup-continue --dry-run
```

Zindua bila kuandika usanidi wowote kabisa (uingizaji wa mazingira pekee):

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

# Njia dhahiri ya amri: pitisha chochote kinachokuja baada ya --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Matumizi ya mbali

Elekeza amri yoyote ya usanidi kwenye OmniRoute ya mbali kwa kutumia `--remote` + `--api-key`. Katalogi hupakuliwa kutoka kwenye seva ya mbali; usanidi huandikwa kwenye mashine yako ya ndani.

```bash
# OpenCode dhidi ya VPS ya mbali, hifadhi modeli za glm/kimi pekee
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # hamisha OMNIROUTE_API_KEY kwanza

# Wasifu wa Codex kutoka kwenye katalogi ya mbali
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Zindua CLI moja kwa moja dhidi ya seva ya mbali
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Badala ya kupitisha `--remote`/`--api-key` kila mara, ingia mara moja na uruhusu **muktadha amilifu** uzitoe kiotomatiki:

```bash
omniroute connect 192.168.0.15        # huunda tokeni yenye wigo, huhifadhi muktadha
omniroute setup-codex                 # ← sasa hutumia katalogi ya mbali
omniroute setup-opencode              # ← vivyo hivyo
omniroute launch                      # ← Claude Code dhidi ya seva ya mbali
```

Tazama [Hali ya Mbali](./REMOTE-MODE.md) kwa maelezo kuhusu miktadha, mawanda na usimamizi wa tokeni.

---

## Makundi ya mawakala ya 5dive

[5dive](https://5dive.ai) huendesha kundi la mawakala wa uandishi wa msimbo wanaoendelea kufanya kazi kwa muda mrefu, ambapo kila mmoja ni kitengo cha systemd chini ya mtumiaji wake wa Unix. Yenyewe si CLI ya uandishi wa msimbo, kwa hiyo hakuna kitu cha `omniroute run` kuzindua — `5dive` ni shabaha ya **usanidi pekee**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Njia zote mbili huandika **wasifu wa uthibitishaji** mmoja wa 5dive, na kila nafasi ya `claude` iliyofungamanishwa na wasifu huo kisha huwasiliana na OmniRoute. Mambo matatu ni mahususi kwa shabaha hii:

- **Huendeshwa kwenye seva mwenyeji wa kundi, kama root.** Vitenzi vya 5dive hutenda kwenye vitengo vya systemd vya ndani na saraka ya hali inayomilikiwa na root; hakuna hali ya mbali. Utaratibu hujitekeleza upya kupitia `sudo` wakati tayari hauendeshwi kama root (`--no-sudo` huzima hilo na badala yake huchapisha amri).
- **Endpoint lazima iwe `https://` isipokuwa ikiwa ni loopback.** Ufunguo wa API wa wakala husafirishwa kupitia URL hiyo katika kila ombi, na 5dive hukataa endpoint ya nje ya mashine isiyosimbwa. Anwani ya LAN ya faragha si hali ya kipekee.
- **Uteuzi wa modeli wa kila nafasi una kipaumbele kuliko wasifu.** Wasifu hubeba `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, lakini nafasi ambayo bado imefungwa kwenye kitambulisho cha modeli ya kawaida hushindwa katika hatua yake ya kwanza kwa ujumbe _"There's an issue with the selected model"_. Pitisha `--agent <name>` (inaweza kurudiwa) ili kufunga modeli za nafasi hizo pia; utaratibu huchapisha amri usipofanya hivyo.

Ufunguo wa API hupitishwa kwa 5dive kupitia **stdin** (`--api-key=-`), kwa hiyo hauonekani kamwe kwenye matokeo ya `ps`.

Kuelekeza wasifu kwenye **combo** ya OmniRoute badala ya modeli moja ndiko kunakowezesha ubadilishaji wa mtoa huduma kwa kundi: endpoint ya msingi ilipoacha kufanya kazi kabisa katikati ya hatua kwenye utekelezaji uliorekodiwa katika [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), wakala alikamilisha hatua zake zilizosalia kwa kutumia mbadala bila kuonyesha hitilafu hiyo.

---

## Kanuni za URL msingi (zana zinazohitaji `/v1`)

OmniRoute hutoa kiolesura cha OpenAI kwenye `/v1`, kiolesura cha Anthropic kwenye mzizi,
na kiolesura asilia cha Gemini kwenye `/v1beta`. Kila muunganisho umewekwa kutumia muundo
unaotarajiwa na zana yake (imethibitishwa katika msimbo wa amri):

| Muunganisho                                                                | URL msingi iliyoandikwa | `/v1`?                                           |
| -------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | mzizi                   | Hapana — Cline huongeza `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | mzizi                   | Hapana — Goose huongeza njia                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | mzizi                   | Hapana — LiteLLM huongeza `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | pamoja na `/v1`         | Ndiyo                                            |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | mzizi                   | Hapana — Claude Code huongeza `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | pamoja na `/v1`         | Ndiyo                                            |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | pamoja na `/v1`         | Ndiyo                                            |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | mzizi                   | Hapana — SDK huongeza `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` katika wasifu wa uthibitishaji)        | mzizi                   | Hapana — Claude Code huongeza `/v1/messages`     |

---

## Kuhifadhi vitegemezi asilia wakati wa kusasisha: `--include=optional`

Unaposasisha kwa `omniroute update` (baada ya kuthibitisha, au kwa `--apply`),
OmniRoute huendesha usakinishaji huku `--include=optional` ikiwa imejumuishwa moja kwa moja:

```bash
npm install -g omniroute@latest --include=optional
```

Hii **si** alama unayopitisha kwa `omniroute update` — hutumiwa kila wakati na
kisasishaji. Inahakikisha kuwa `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, mfumo wa SLM wa LLMLingua) vinaendelea kuwepo baada ya sasisho hata kama usanidi wako wa npm
umeweka `omit=optional`, hali ambayo vinginevyo ingeondoa kimyakimya kiendeshi asilia cha SQLite
na muunganisho wa hazina ya funguo ya OS. Ili kuhakiki amri kamili bila kuitekeleza:

```bash
omniroute update --dry-run
# [UTEKELEZAJI MKAVU] Ingeendesha: npm install -g omniroute@latest --include=optional
```

Alama nyingine za `omniroute update` (zimethibitishwa katika msimbo): `--check` (toka kwa 1 ikiwa
imepitwa na wakati), `--apply` (sakinisha bila kuuliza), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI kupitia `omniroute run gemini`

Mkataba umethibitishwa dhidi ya `@google/gemini-cli` 0.50.0: CLI hutambua
`GOOGLE_GEMINI_BASE_URL` na kutuma `POST /v1beta/models/<model>:generateContent`
(na `:streamGenerateContent?alt=sse`) kwake — sawasawa kabisa na kiolesura asilia cha
Gemini cha OmniRoute (`/v1beta`). `omniroute run gemini` huunganisha hilo kiotomatiki:

- `GOOGLE_GEMINI_BASE_URL` → URL msingi inayotumika ya OmniRoute (mzizi, bila `/v1`);
- `GEMINI_API_KEY` → kitambulisho cha OmniRoute kilichotambuliwa (chaguo/env/muktadha);
- **`GEMINI_CLI_HOME` ya muda na iliyotengwa** ambayo `.gemini/settings.json` yake
  huchagua uthibitishaji wa `gemini-api-key`, ili kipindi cha Google OAuth kilichohifadhiwa (Code Assist)
  kisibadilishe kamwe uzinduzi unaoelekezwa kwa OmniRoute — huondolewa baada ya kutoka;
- **usafi wa env**: env ya mchakato-toto husafishwa kwa kuondoa `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` na `GOOGLE_GENAI_USE_GCA` (ambazo zingeelekeza upya
  uthibitishaji kwenda Vertex/Code Assist), na `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  huwekwa kama hatua ya ziada ya tahadhari — malengo mengine ya `run` hupata utaratibu huo huo
  kwa vigezo vyao vinavyokinzana;
- kuingizwa kwa `--model <id>` kutoka `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Ulinzi wa Gemini wa kuamini eneo la kazi bado hutumika katika hali isiyo na kiolesura — pitisha
`--skip-trust` (au uamini saraka kwa mwingiliano) mwenyewe; kizinduzi
kwa makusudi hakikwepi ulinzi huo. Kizinduzi hiki ni tofauti na **usajili wa ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), ambao unaendelea kuwa
muunganisho wa itifaki ya wakala kwa `/dashboard/acp-agents`.

---

## Ukaguzi halisi wa smoke (hiari)

Majaribio ya urejeshi ya mpango wa uanzishaji unaoweza kurudiwa huendeshwa katika CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Ili kuthibitisha faili HALISI zinazotekelezeka dhidi ya seva HALISI ya
OmniRoute, kuna mfumo wa majaribio wa hiari katika
`tests/integration/upstream-cli-smoke.int.test.ts`. Hauendeshwi kamwe kiotomatiki
(kila jaribio dogo hurukwa isipokuwa `RUN_CLI_SMOKE=1`), hupitisha kitambulisho kupitia JINA la kigezo cha mazingira
(kamwe si kupitia thamani), huficha mifuatano inayofanana na funguo kutoka kwenye matokeo yoyote yaliyorekodiwa, huruka
malengo ambayo faili zake zinazotekelezeka hazijasakinishwa, na huainisha hitilafu kama
auth / upstream / config badala ya thamani tupu ya boolean:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Hiari: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` huwekea ukaguzi mipaka;
`OMNIROUTE_SMOKE_TIMEOUT_MS` hubatilisha muda wa mwisho wa sekunde 120 kwa kila lengo.

---

## Tazama pia

- [Usanidi wa Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — mwongozo wa kina zaidi wa Claude Code
- [Usanidi wa Codex CLI](./CODEX-CLI-CONFIGURATION.md) — usanidi wa msingi wa mara moja wa `[model_providers.omniroute]`
- [Hali ya Mbali](./REMOTE-MODE.md) — miktadha, tokeni za ufikiaji zilizowekewa wigo, na uendeshaji wa seva ya mbali
- [Marejeleo ya Zana za CLI](../reference/CLI-TOOLS.md) — orodha kamili ya zana zinazotumika + kurasa za dashibodi
- [Mwongozo wa Usanidi](./SETUP_GUIDE.md) — mbinu za usakinishaji na mwongozo wa matumizi ya kwanza
