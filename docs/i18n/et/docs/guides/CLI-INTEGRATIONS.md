# CLI-INTEGRATIONS (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI Integratsioonid – suuna ükskõik milline programmeerimise CLI OmniRoute'i"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Integratsioonid

OmniRoute tarnib komplekti `setup-*` käsklusi, mis konfigureerivad programmeerimise CLI (Codex, Claude Code, OpenCode, Cline, …) kasutama OmniRoute'i oma taustajõuna – nii räägib tööriist **ühe** lõpp-punktiga ja OmniRoute suunab päringu õigele pakkujale koos automaatse varundusega. Iga käsk loeb **reaalajas** mudelikataloogi töötavast OmniRoute'ist (kohalikust või kaugest) ja kirjutab tööriisti enda konfiguratsioonifaili **teie** masinalle. API võtit viidatakse keskkonnamuutujaga, kus tööriist seda toetab. Käsklused, mis salvestavad tööriistikohaliku keskkonnapoolfääli, on all märgitud.

Samuti on olemas üldine käivitaja — `omniroute run <sihtmärk>` — mis käivitab `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` või `gemini` õigete keskkonnamuutujatega, ilma ühtegi konfiguratsiooni kirjutamata. Sihtmärgid ja nende aliased pärinevad kanoonilisest manifesist `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`) ja `omniroute completion` pakub samu manifesist tulenevaid sihtmärgi sõnu. Traditsioonilised tööriistipõhised käivitajad — `omniroute launch` (Claude Code) ja `omniroute launch-codex` (Codex) — on endiselt saadaval.

Pakkujate lisamine on saadaval samast kohalikust/kaugest kontekstist. Alljärgnevad API-esimesed käsud haldavad autentimist eraldi pakkujate identiteedidest ja ei trüki kunagi volikirju struktureeritud väljundis:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Skriptide puhul eelistage `--credential-stdin` või `--credential-env`; `--credential` on jäetud kontrollitud kohalikuks kasutamiseks. `providers remove` nõuab mitte-interaktiivses terminalis `--yes` ja kõik viis käsklused austavad aktiivset konteksti või globaalseid `--base-url`/`--api-key` valikuid.

Kahe rikkalikuma integratsiooni ühekordse, käsitsi kirjutatud baasseadistuse kohta vt tööriistispetsiifilisi süvaanalüüse:

- [Claude Code konfiguratsioon](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfiguratsioon](./CODEX-CLI-CONFIGURATION.md)
- [Kaugrežiim](./REMOTE-MODE.md) — juhi kaug OmniRoute'i (VPS / Tailnet) oma sülearvutist
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot laiendus; see võib samuti neid
  `setup-*` käske teie eest redaktori sees käivitada

---

## Üldtabel

Iga käsk austab **aktiivset konteksti** (määratud `omniroute connect`-iga, vt [Kaugrežiim](./REMOTE-MODE.md)) või selgesõnalisi `--remote <url> --api-key <võti> lippe. "Kohalik vs kaug" all tähendab: ilma lippudeta on sihtmärgiks `http://localhost:20128`; `--remote` (või aktiivne kaugkontekst) puhul hangib see sellelt serverilt kataloogi ja kirjutab konfiguratsiooni kohalikult.

| Käsk                       | Tööriist                  | Mida kirjutab                                                                                                                                                                              | Põhilipud                                                                                                                                  | Kohalik vs kaug |
| -------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI          | `~/.codex/<nimi>.config.toml` — üks profiil iga ühilduva tekstimudeli jaoks (`codex --profile <nimi>`)                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Mõlemad         |
| `omniroute setup-claude`   | Claude Code               | `~/.claude/profiles/<nimi>/settings.json` — üks profiil iga sobiva mudeli jaoks (`CLAUDE_CONFIG_DIR`)                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Mõlemad         |
| `omniroute setup-opencode` | OpenCode (openai-ühilduv) | `~/.config/opencode/opencode.json` — `omniroute` pakkuja iga kataloogimudeliga (`opencode -m omniroute/<mudel>`)                                                                           | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Mõlemad         |
| `omniroute setup-cline`    | Cline                     | `~/.cline/data/{globalState,secrets}.json` (CLI režiim) + prindib VS Code laienduse seaded                                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Mõlemad         |
| `omniroute setup-kilo`     | Kilo Code                 | `~/.local/share/kilo/auth.json` (CLI) + liidab `kilocode.*` VS Code `settings.json`-iga, kui see on olemas                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Mõlemad         |
| `omniroute setup-continue` | Continue / `cn` CLI       | `~/.continue/config.yaml` — `provider: openai` mudelid, võti läbi `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mõlemad         |
| `omniroute setup-cursor`   | Cursor                    | Mitte midagi — prindib rakendusesiseste sammud (Cursori konfiguratsioon on läbipaistmatu SQLite)                                                                                           | `--remote` `--api-key` `--only` `--port`                                                                                                   | Mõlemad         |
| `omniroute setup-roo`      | Roo Code                  | `~/.omniroute/roo-settings.json` (impordidokument) + määrab `roo-cline.autoImportSettingsPath`, kui VS Code `settings.json` on olemas                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Mõlemad         |
| `omniroute setup-crush`    | Crush                     | `~/.config/crush/crush.json` — `openai-compat` pakkuja, võti läbi `$OMNIROUTE_API_KEY`                                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mõlemad         |
| `omniroute setup-goose`    | Goose                     | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + prindib keskkonna retsepti                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mõlemad         |
| `omniroute setup-aider`    | Aider                     | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + prindib keskkonna retsepti                                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mõlemad         |
| `omniroute setup-qwen`     | Qwen Code                 | `~/.qwen/settings.json` — V4 `modelProviders.openai` massiiv + `OMNIROUTE_API_KEY` `~/.qwen/.env` failis                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Mõlemad         |
| `omniroute setup-5dive`    | 5dive (agendi laevastik)  | Mitte midagi `$HOME` all — kirjutab 5dive **autentimisprofiili** (`/var/lib/5dive/auth-profiles/<nimi>/`) läbi `5dive agent auth set`; ainult root, töötab laevastiku hostil               | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Mõlemad         |
| `omniroute run <sihtmärk>` | Käivitamine (üldine)      | Mitte midagi — käivitab `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` õigete keskkonnamuutujate ja argumentidega; Qwen ja Gemini kasutavad ajutist isoleeritud kodukataloogi | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Mõlemad         |
| `omniroute launch`         | Claude Code               | Mitte midagi — käivitab `claude` süstitud `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`-iga                                                                                                  | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Mõlemad         |
| `omniroute launch-codex`   | OpenAI Codex CLI          | Mitte midagi — käivitab `codex` süstitud `omniroute` pakkujaga läbi `-c` lippe                                                                                                             | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Mõlemad         |

Märkmed lippude kohta (kontrollitud käskluskoodist):

- `--remote <url>` — hangib kataloogi kaug OmniRoute'ist (tühistab `--port` ja aktiivse konteksti). `--api-key <võti` annab selle serveri volikirja (vaikimisi `OMNIROUTE_API_KEY` keskkonnamuutuja või aktiivse konteksti pilet).
- `--only <mustrid>` — komadega eraldatud alamsõnad; hoiab ainult mudeli ID-d, mis vastavad (nt `--only glm,kimi`). Saadaval `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — trükib täpselt selle, mis kirjutataks, puutumata failisüsteemi. Saadaval igal `setup-*` käsul **v.a.** `setup-cursor` (mis ei kirjuta kunagi faili).
- `--model <id>` — nõutav (või valitakse interaktiivselt) tööriistade jaoks, millel puudub automaatne mudelite tuvastamine: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Need tööriistad aktsepteerivad ka `--yes` mitte-interaktiivsete käivituste jaoks (mis siis nõuab `--model`). `setup-opencode` võtab `--model` vaikimisi ülemise tasandi mudeli määramiseks.
- `--model <id>` käsul `omniroute run` järgib manifesti sihtmärgispetsiifilist juhtmestikku (`bin/cli/cli-manifest.mjs`): **aider** saab `--model openai/<id>` ja **opencode** `--model omniroute/<id>` (prefiks lisatakse ainult siis, kui ID-l seda juba ei ole); **qwen** ja **gemini** saavad ID sõna-sõnalt; **claude** saab selle läbi `ANTHROPIC_MODEL`, **goose** läbi `GOOSE_MODEL` ja **codex** läbi `-c model_providers.omniroute.*` argumente. **Qwen on ainus run sihtmärk, mis nõuab karmilt `--model`** — `omniroute run qwen` ilma selleta väljub koodiga `2` ja selge veateatega.
- `--port <port>` — kohalik OmniRoute port (vaikimisi `20128`, ignoreeritakse kui `--remote` on määratud). Olemas kõigil `setup-*` ja mõlemal käivitajal.
- `omniroute run` väljumiskoodid: lapsprotsessi CLI enda väljumiskood edastatakse sõna-sõnalt; `2` = vale argumendid (toetamata sihtmärk, puuduv nõutav `--model`, konteinerikaitse); `127` = sihtmärgi binaar ei asu `PATH-is`; `130`/`143`/`129` kui käivitus lõpetatakse `SIGINT`/`SIGTERM`/`SIGHUP`-iga; `1` = muu käivitamise tõrge.
- Kaks käivitajat (`launch`, `launch-codex`) aktsepteerivad `--profile <nimi>` valimaks profiili, mille on kirjutanud `setup-claude` / `setup-codex`, pluss läbipääsuargumente alumisele `claude` / `codex` binaarile.

Interaktiivset valijat kasutavad ka seadistamise retseptid:

```bash
# Valige aktiivsest kohalikust või kaugest mudelikataloogist ja konfigureerige sihtmärk.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegeerib praegu testitud retsepte `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` ja `5dive` jaoks. Ainult IDE,
MITM ja juhendikataloogi kanded jäävad selgeteks `setup-*`/käsitsi vooludeks ja neid ei esitata käivitatavate sihtmärkidena.

> `setup-opencode` on **kergekaaluline openai-ühilduv** OpenCode integratsioon.
> Samuti on olemas rikkalikum pistikprogrammi integratsioon — `omniroute setup opencode` — mis
> installib `@omniroute/opencode-plugin`. Need on erinevad käsud; ülalolev tabel
> kirjeldab `setup-opencode`.

## Kohalik kasutamine

Kui OmniRoute töötab aadressil `localhost:20128`, käivita lihtsalt oma tööriista seadistamise käsk. Kataloog tuuakse kohalt kohalikult serverist.

```bash
# Codex: kirjuta igale vastavale mudelile profiil kausta ~/.codex/
omniroute setup-codex
codex --profile glm52            # kasuta genereeritud profiili

# Claude Code: kirjuta mudelipõhised profiilid, seejärel käivita üks
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: kirjuta openai-ühilduv pakkuja kõigi kataloogimudelitega
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # viidatakse kaudu {env:OMNIROUTE_API_KEY}, ei kunagi kettale
opencode -m omniroute/glm/glm-5.2 "..."

# Tööriistad ilma automaatse avastamiseta vajavad selget mudelit:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Eelvaade ilma midagi kirjutamata:
omniroute setup-continue --dry-run
```

Käivita üldse konfigureerimata (ainult keskkonnamuutujate süstimine):

```bash
omniroute launch                 # Claude Code → kohalik OmniRoute
omniroute launch-codex           # Codex CLI → kohalik OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Selge käsu tee: edasta kõik, mis tuleb pärast --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Võrgukasutamine

Suuna iga seadmiskäsk kaug OmniRoute'ile kasutades `--remote` + `--api-key`. Kataloog tuuakse kaugserverist; konfiguratsioon kirjutatakse kohalikule masinale.

```bash
# OpenCode kaug VPS-i vastu, hoia ainult glm/kimi mudeleid
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # ekspordi OMNIROUTE_API_KEY kõigepealt

# Codex profiilid kaugkataloogist
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Käivita CLI otse kaugvastu
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Selle asemel et iga kord `--remote`/`--api-key` edastada, logi sisse üks kord ja lase **aktiivsel kontekstil** neid automaatselt pakkuda:

```bash
omniroute connect 192.168.0.15        # loob piiratud ulatusega tokeni, salvestab konteksti
omniroute setup-codex                 # ← nüüd kasutab kaugkataloogi
omniroute setup-opencode              # ← sama
omniroute launch                      # ← Claude Code kaugvastu
```

Vaata [Võrgurežiim](./REMOTE-MODE.md) kontekstide, ulatuste ja tokenite haldamise kohta.

---

## 5dive agentide parved

[5dive](https://5dive.ai) käivitab pikka aega töötavate programmeerivate agentide parve, kus igaüks on omaenda Unix kasutaja all systemd üksus. See ei ole ise programmeeriv CLI, seega ei ole `omniroute`'l midagi käivitada — `5dive` on **ainult konfigureeritav** sihtmärk.

````bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
``()

Mõlemad vormid kirjutavad ühe 5dive **autentimisprofiili** ja iga selle profiiliga seotud `claude` istekoht seejärel suhtleb OmniRoute'iga. Kolm asja on selle sihtmärgi jaoks erilised:

- **See töötab parve hostil, root-ina.** 5dive'ivad tegevused toimivad kohalike systemd üksustega ja root-omandis oleku kataloogiga; võrgurežiimi ei ole. Retsept käivitub uuesti läbi `sudo`, kui see ei ole juba root (`--selle keelamiseks --no-sudo` ja prindib käsu välja).
- **Lõpp-punkt peab olema `https://` kui see ei ole loopback.** Agenti API võti sõidab sellel URL-il igal päringul ja 5dive keeldub lihtteksti väljaspool karpi lõpp-punktist. Era-LAN aadress ei ole erand.
- **Iga istekoha oma mudeli määrang on profiilist üle.** Profiil kannab `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, kuid istekoht, mis on endiselt määratud tavalise mudeli ID-ga, nurjub esimesel pöördel teatega _"Valitud mudeliga on probleem"_. Edasta `--agent <nimi>` (korduv) istekohtade märamiseks; retsept prindib käsu välja, kui sa seda ei tee.

API võti antakse 5dive'ile läbi **stdin** (`--api-key=-`), seega ei ilmu see kunagi `ps` väljundis.

Profiili suunamine OmniRoute **kombinatsioonile** üksiku mudeli asemel on see, mis saavutab pakkujate ümberlülituse: kui esmane lõpp-punkt läks töö ajal kindlalt alla kirjeldatud juhtumis [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), lõpetas agent ülejäänud sammud varunduslõpp-punktiga ega avaldanud katkestust kunagi.

## Baasi URL-i kokkulepped (millised tööriistad soovivad `/v1`)

OmniRoute pakub OpenAI pinda kataloogis `/v1`, Anthropic pinda juurkataloogis ja emakeelset Gemini pinda kataloogis `/v1beta`. Iga integratsioon on ühendatud vastavalt selle tööriisti oodatud vormingule (kontrollitud lähtekoodis):

| Integratsioon                                                                | Kirjutatud baasi URL | `/v1`?                                      |
| -------------------------------------------------------------------------- | ---------------- | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | juurkataloog     | Ei — Cline lisab `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | juurkataloog     | Ei — Goose lisab tee   |
| `setup-aider` (`OPENAI_API_BASE`)                                          | juurkataloog     | Ei — LiteLLM lisab `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1`-ga        | Jah                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | juurkataloog     | Ei — Claude Code lisab `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1`-ga        | Jah                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1`-ga        | Jah                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | juurkataloog     | Ei — SDK lisab `/v1beta/models/…`     |
| `setup-5dive` (`ANTHROPIC_BASE_URL` autentimisprofiilis)                   | juurkataloog     | Ei — Claude Code lisab `/v1/messages`     |

---

## Emakeelsete sõltuvuste hoidmine uuendamisel: `--include=optional`

Kui uuendate käsu `omniroute update` abil (pärast kinnitamist või `--apply` lülitiga), käivitab OmniRoute installimise koos `--include=optional` sättega:

```bash
npm install -g omniroute@latest --include=optional
````

See **ei ole** lipp, mida te `omniroute update` käsule edastate – uuendaja rakendab seda alati. See tagab, et `optionalDependencies` (`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM kuhja) jäävad uuendamisel alles, isegi kui teie npm konfiguratsioonis on seatud `omit=optional`, mis muidu vaikides eemaldaks emakeelse SQLite draiveri ja OS-võtmeringi sidumise. Täpse käsu eelvaatlemiseks ilma rakendamata:

```bash
omniroute update --dry-run
# [DRY RUN] Would run: npm install -g omniroute@latest --include=optional
```

Teised `omniroute update` lipud (kontrollitud lähtekoodis): `--check` ( väljub koodiga 1, kui on vananenud), `--apply` (installib ilma küsimata), `--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI läbi `omniroute run gemini`

Leping kontrollitud `@google/gemini-cli` 0.50.0 vastu: CLI järgib `GOOGLE_GEMINI_BASE_URL` ja teeb selle vastu `POST /v1beta/models/<model>:generateContent` (ja `:streamGenerateContent?alt=sse`) — täpselt OmniRoute emakeelne Gemini pind (`/v1beta`). `omniroute run gemini` ühendab selle automaatselt:

- `GOOGLE_GEMINI_BASE_URL` → aktiivne OmniRoute baasi URL (juurkataloog, ilma `/v1`);
- `GEMINI_API_KEY` → lahendatud OmniRoute mandaat (valik/keskkond/kontekst);
- **Ajutine isoleeritud `GEMINI_CLI_HOME`**, mille `.gemini/settings.json` valib `gemini-api-key` autentimise, nii et salvestatud Google OAuth seanss (Code Assist) ei käivitu kunagi OmniRoute suunatud käivitamise üle — eemaldatakse pärast väljumist;
- **keskkonna hügieen**: lapse keskkond puhastatakse `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` ja `GOOGLE_GENAI_USE_GCA` muutujatest (mis suunaksid autentimise Vertex/Code Assist'ile) ning `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` on seatud turvavöö ja põllepaelte varuvariandina — teised `run` sihtmärgid saavad sama kohtlemist oma vastuoluliste muutujate jaoks;
- `--model <id>` süstimine läbi `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini usalduse kaitselüliti kehtib ka peaasendis — lisage `--skip-trust` (või usaldage kataloog interaktiivselt) ise; käivitaja tahtlikult seda ei mööda. See käivitaja erineb **ACP registreerimisest** (`src/lib/acp/registry.ts`, `gemini --acp`), mis jääb agent-protokolli integratsiooniks `/dashboard/acp-agents` jaoks.

## Tõelise suitsu pühkimine (valikuline)

Määratluslikud käivitamiskava regressioonikäivitused CI-s (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). TEGELIKE binaarfailide valideerimiseks TEGELIKU
OmniRoute serveri vastu on valikuline seadistus olemas
`tests/integration/upstream-cli-smoke.int.test.ts`. See ei käivitu kunagi automaatselt
(iga alamtest jätab vahele, välja arvatud juhul, kui `RUN_CLI_SMOKE=1`), edastab mandaadi keskkonnamuutuja
NIMEGA (mitte väärtuse järgi), redigeerib võtmekujulised stringid kõigist salvestatud väljundist, jätab
sihtmärgid vahele, kelle binaarfail ei ole paigaldatud, ja klassifitseerib ebaõnnestumised
autentimise / ülesvoolu / konfiguratsiooni mitte-tühja tõeväärtusena:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Valikuline: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` piirab pühkimist;
`OMNIROUTE_SMOKE_TIMEOUT_MS` katab iga sihtmärgi jaoks 120-sekundilise ajaülempiiri.

---

## Vaata ka

- [Claude Code'i konfiguratsioon](./CLAUDE-CODE-CONFIGURATION.md) — süvitsi Claude Code'i juhend
- [Codex CLI konfiguratsioon](./CODEX-CLI-CONFIGURATION.md) — korduvkasutatav `[model_providers.omniroute]` põhiseadistus
- [Kaugrežiim](./REMOTE-MODE.md) — kontekstid, ulatusega juurdepääsulubad, kaugserveri juhtimine
- [CLI tööriistade viide](../reference/CLI-TOOLS.md) — täielik loetelu toetatud tööriistadest + juhtpaneeli lehed
- [Seadistusjuhend](./SETUP_GUIDE.md) — paigaldusmeetodid ja esimese käivitamise sisseseadmine
