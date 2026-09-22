# CLI Integrations (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute sisaldab `setup-*` käskude komplekti, mis konfigureerivad programmeerimise
CLI (Codex, Claude Code, OpenCode, Cline, …) kasutama taustateenusena OmniRoute'i — nii
suhtleb tööriist **ühe** lõpp-punktiga ning OmniRoute suunab päringu õigele pakkujale,
kasutades automaatset varuvarianti. Iga käsk loeb töötavast OmniRoute'ist (kohalikust või
kaugserverist) **reaalajas** mudelikataloogi ja kirjutab tööriista enda konfiguratsioonifaili
**teie** masinas. API-võtmele viidatakse keskkonnamuutuja kaudu kõikjal, kus tööriist
seda toetab. Käsud, mis salvestavad tööriistapõhise keskkonnafaili, on allpool ära märgitud.

Samuti on olemas üldine käivitaja — `omniroute run <target>` —, mis käivitab
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` või `gemini` koos
õigete sisestatud keskkonnamuutujatega, kirjutamata ühtegi konfiguratsiooni. Sihtmärgid ja
nende aliased pärinevad kanoonilisest manifestist `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`) ning `omniroute completion` pakub samu
manifestist tuletatud sihtmärksõnu. Varasemad tööriistapõhised käivitajad —
`omniroute launch` (Claude Code) ja `omniroute launch-codex` (Codex) — on endiselt
saadaval.

Pakkujate kasutuselevõtt on saadaval samas kohalikus või kaugkontekstis. Alltoodud
API-kesksed käsud hoiavad halduse autentimise pakkuja mandaatidest eraldi ega väljasta
mandaati kunagi struktureeritud väljundis:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Skriptides eelistage suvandit `--credential-stdin` või `--credential-env`; suvand
`--credential` on säilitatud kontrollitud kohalikuks kasutuseks. `providers remove`
nõuab mitteinteraktiivses terminalis suvandit `--yes` ning kõik viis käsku arvestavad
aktiivset konteksti või globaalseid suvandeid `--base-url`/`--api-key`.

Kahe kõige funktsioonirikkama integratsiooni ühekordse käsitsi baasseadistuse kohta vaadake
tööriistapõhiseid üksikasjalikke juhendeid:

- [Claude Code'i konfigureerimine](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfigureerimine](./CODEX-CLI-CONFIGURATION.md)
- [Kaugrežiim](./REMOTE-MODE.md) — juhtige kaugserveris asuvat OmniRoute'i (VPS / Tailnet) oma sülearvutist
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopiloti laiendus; see saab neid
  `setup-*` käske teie eest käivitada ka redaktorist

---

## Põhitabel

Iga käsk arvestab **aktiivset konteksti** (määratakse käsuga `omniroute connect`, vt
[Kaugrežiim](./REMOTE-MODE.md)) või eksplitsiitseid lippe `--remote <url> --api-key <key>`.
„Kohalik või kaugserver” tähendab allpool järgmist: ilma lippudeta on sihtmärk
`http://localhost:20128`; suvandi `--remote` (või aktiivse kaugkonteksti) korral hangitakse
kataloog sellest serverist ja konfiguratsioon kirjutatakse kohalikku masinasse.

| Käsk                       | Tööriist                      | Mida see kirjutab                                                                                                                                                                                   | Peamised lipud                                                                                                                             | Kohalik vs kaug |
| -------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI              | `~/.codex/<name>.config.toml` — üks profiil iga ühilduva tekstimudeli kohta (`codex --profile <name>`)                                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Mõlemad         |
| `omniroute setup-claude`   | Claude Code                   | `~/.claude/profiles/<name>/settings.json` — üks profiil iga sobiva mudeli kohta (`CLAUDE_CONFIG_DIR`)                                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Mõlemad         |
| `omniroute setup-opencode` | OpenCode (OpenAI-ühilduv)     | `~/.config/opencode/opencode.json` — `omniroute`-i pakkuja kõigi kataloogis olevate mudelitega (`opencode -m omniroute/<model>`)                                                                    | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Mõlemad         |
| `omniroute setup-cline`    | Cline                         | `~/.cline/data/{globalState,secrets}.json` (CLI-režiim) + väljastab VS Code'i laienduse sätted                                                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Mõlemad         |
| `omniroute setup-kilo`     | Kilo Code                     | `~/.local/share/kilo/auth.json` (CLI) + liidab `kilocode.*` VS Code'i faili `settings.json`, kui see on olemas                                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Mõlemad         |
| `omniroute setup-continue` | Continue / `cn` CLI           | `~/.continue/config.yaml` — `provider: openai` mudelid, võti `${{ secrets.OMNIROUTE_API_KEY }}` kaudu                                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mõlemad         |
| `omniroute setup-cursor`   | Cursor                        | Mitte midagi — väljastab rakenduses järgitavad sammud (Cursori konfiguratsioon on läbipaistmatu SQLite)                                                                                             | `--remote` `--api-key` `--only` `--port`                                                                                                   | Mõlemad         |
| `omniroute setup-roo`      | Roo Code                      | `~/.omniroute/roo-settings.json` (impordidokument) + määrab `roo-cline.autoImportSettingsPath`, kui VS Code'i `settings.json` on olemas                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Mõlemad         |
| `omniroute setup-crush`    | Crush                         | `~/.config/crush/crush.json` — `openai-compat` pakkuja, võti `$OMNIROUTE_API_KEY` kaudu                                                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mõlemad         |
| `omniroute setup-goose`    | Goose                         | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + väljastab keskkonna seadistamise juhise                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mõlemad         |
| `omniroute setup-aider`    | Aider                         | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + väljastab keskkonna seadistamise juhise                                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mõlemad         |
| `omniroute setup-qwen`     | Qwen Code                     | `~/.qwen/settings.json` — V4 `modelProviders.openai` massiiv + `OMNIROUTE_API_KEY` failis `~/.qwen/.env`                                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Mõlemad         |
| `omniroute setup-5dive`    | 5dive (agentide park)         | `$HOME` alla ei kirjutata midagi — kirjutab 5dive'i **autentimisprofiili** (`/var/lib/5dive/auth-profiles/<name>/`) käsu `5dive agent auth set` kaudu; ainult juurkasutajale, käivitub pargi hostis | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Mõlemad         |
| `omniroute run <target>`   | Käitusaegne käivitus (üldine) | Mitte midagi — käivitab õige keskkonna ja argumentidega `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`; Qwen ja Gemini kasutavad ajutist isoleeritud kodukataloogi                     | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Mõlemad         |
| `omniroute launch`         | Claude Code                   | Mitte midagi — käivitab `claude`-i, sisestades `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                          | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Mõlemad         |
| `omniroute launch-codex`   | OpenAI Codex CLI              | Mitte midagi — käivitab `codex`-i koos `-c` lippude kaudu sisestatud `omniroute`-i pakkujaga                                                                                                        | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Mõlemad         |

Märkused lippude kohta (kontrollitud käsu lähtekoodist):

- `--remote <url>` — hangib kataloogi OmniRoute'i kaugserverist (alistab `--port`
  ja aktiivse konteksti). `--api-key <key>` annab selle serveri autentimisteabe
  (vaikimisi keskkonnamuutuja `OMNIROUTE_API_KEY` või aktiivse konteksti pääsmik).
- `--only <patterns>` — komadega eraldatud alamstringid; säilitab ainult vastavad
  mudeli-ID-d (nt `--only glm,kimi`). Saadaval käskudel `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — väljastab täpselt selle, mis kirjutataks, ilma failisüsteemi
  muutmata. Saadaval kõigil käskudel `setup-*`, **välja arvatud** `setup-cursor`
  (mis ei kirjuta kunagi faili).
- `--model <id>` — nõutav (või valitakse interaktiivselt) tööriistade puhul, millel
  puudub mudelite automaattuvastus: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive.
  Need tööriistad aktsepteerivad mitteinteraktiivsete käivituste jaoks ka lippu
  `--yes` (sel juhul on `--model` nõutav). `setup-opencode` kasutab lippu
  `--model` vaikimisi tipptaseme mudeli määramiseks.
- `--model <id>` käsul `omniroute run` järgib manifesti sihtmärgipõhist
  seadistust (`bin/cli/cli-manifest.mjs`): **aider** saab `--model openai/<id>` ja
  **opencode** `--model omniroute/<id>` (prefiks lisatakse ainult siis, kui ID-l
  seda veel pole); **qwen** ja **gemini** saavad ID muutmata kujul;
  **claude** saab selle muutuja `ANTHROPIC_MODEL`, **goose** muutuja
  `GOOSE_MODEL` ja **codex** argumentide `-c model_providers.omniroute.*` kaudu.
  **Qwen on ainus käivitussihtmärk, mis nõuab alati lippu `--model`** — käsk
  `omniroute run qwen` lõpetab ilma selleta töö väljumiskoodiga `2` ja kuvab
  selgesõnalise vea.
- `--port <port>` — kohalik OmniRoute'i port (vaikimisi `20128`; eiratakse, kui
  `--remote` on määratud). Olemas kõigil käskudel `setup-*` ja mõlemal käivitajal.
- Käsu `omniroute run` väljumiskoodid: alam-CLI enda väljumiskood edastatakse
  muutmata kujul; `2` = vigased argumendid (toetamata sihtmärk, nõutava
  `--model` puudumine, konteinerikaitse); `127` = sihtmärgi binaarfaili pole
  muutujas `PATH`; `130`/`143`/`129`, kui käivitamine lõpetatakse signaaliga
  `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = muu käitusaegne käivitustõrge.
- Kaks käivitajat (`launch`, `launch-codex`) aktsepteerivad lippu
  `--profile <name>`, et valida käsuga `setup-claude` / `setup-codex` kirjutatud
  profiil, ning edastavad ülejäänud argumendid aluseks olevale binaarfailile
  `claude` / `codex`.

Interaktiivset valijat jagavad ka seadistusretseptid:

```bash
# Vali aktiivsest kohalikust või kaugmudelite kataloogist ja seadista sihtmärk.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegeerib praegu testitud retseptidele sihtmärkide `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` ja `5dive`
jaoks. Ainult IDE-le mõeldud,
MITM-i ja ainult juhendina kasutatavad kataloogikirjed jäävad eraldiseisvateks
`setup-*`/käsitsi töövoogudeks ning neid ei esitata käivitatavate sihtmärkidena.

> `setup-opencode` on **kerge openai-ühilduv** OpenCode'i integratsioon.
> Olemas on ka võimalusterohkem pistikprogrammiintegratsioon —
> `omniroute setup opencode` — mis installib paketi
> `@omniroute/opencode-plugin`. Need on erinevad käsud; ülaltoodud tabel
> dokumenteerib käsku `setup-opencode`.
>
> Pistikprogramm on saadaval kahe paketina, üks kummagi OpenCode'i põhiversiooni
> jaoks, sest kaks laadijat eeldavad erinevaid sisenemispunkte:
> `@omniroute/opencode-plugin` OpenCode v1 jaoks ja
> `@omniroute/opencode-plugin-v2` OpenCode v2 jaoks. v2 pakett on uus
> (`0.1.0`) ja järgib endiselt muutuvat hostilepingut, seega loeb see OpenCode'i
> poolt kataloogi mustandisse sisestatud struktuuri, selle asemel et kindlat
> struktuuri eeldada. Installimiseks lisage faili `opencode.json` kirje
> `plugins`; `omniroute setup opencode` installib endiselt v1 paketi. Valikud
> ja autentimisteabe otsingujärjekord on toodud paketi README-failis.

---

## Kohalik kasutus

Kui OmniRoute töötab aadressil `localhost:20128`, käivitage lihtsalt oma tööriista
seadistuskäsk. Kataloog hangitakse kohalikust serverist.

```bash
# Codex: kirjuta iga sobitatud mudeli jaoks profiil kataloogi ~/.codex/
omniroute setup-codex
codex --profile glm52            # kasuta loodud profiili

# Claude Code: kirjuta mudelipõhised profiilid ja käivita seejärel üks neist
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: kirjuta openai-ühilduv pakkuja koos kõigi kataloogi mudelitega
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # viidatakse kujul {env:OMNIROUTE_API_KEY}, ei salvestata kunagi kettale
opencode -m omniroute/glm/glm-5.2 "..."

# Automaattuvastuseta tööriistad vajavad selgesõnaliselt määratud mudelit:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Eelvaade ilma midagi kirjutamata:
omniroute setup-continue --dry-run
```

Käivitage ilma ühtegi konfiguratsiooni kirjutamata (ainult keskkonnamuutujate sisestamine):

```bash
omniroute launch                 # Claude Code → kohalik OmniRoute
omniroute launch-codex           # Codex CLI → kohalik OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "vasta OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "vasta OK"
omniroute run qwen --model glm/glm-5.2 -- -p "vasta OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "vasta OK"

# Selgesõnaline käsutee: edasta muutmata kõik, mis järgneb märgile --
omniroute run claude -- --print-system-prompt "vaata see diff üle"
```

---

## Kaugkasutus

Suunake mis tahes seadistuskäsk kaugesse OmniRoute'i, kasutades `--remote` + `--api-key`.
Kataloog hangitakse kaugserverist ja konfiguratsioon kirjutatakse teie kohalikku masinasse.

```bash
# OpenCode kauge VPS-i vastu, säilita ainult glm/kimi mudelid
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # ekspordi esmalt OMNIROUTE_API_KEY

# Codexi profiilid kaugkataloogist
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Käivita CLI otse kaugserveri vastu
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Selle asemel, et iga kord `--remote`/`--api-key` edastada, logige üks kord sisse ja
laske **aktiivsel kontekstil** need automaatselt määrata:

```bash
omniroute connect 192.168.0.15        # loob piiratud õigustega loa ja salvestab konteksti
omniroute setup-codex                 # ← kasutab nüüd kaugkataloogi
omniroute setup-opencode              # ← sama
omniroute launch                      # ← Claude Code kaugserveri vastu
```

Kontekstide, õigusalade ja lubade halduse kohta vaadake jaotist [Kaugrežiim](./REMOTE-MODE.md).

---

## 5dive'i agendipargid

[5dive](https://5dive.ai) käitab pikaajaliselt töötavate programmeerimisagentide parki,
kus iga agent on oma Unix-kasutaja all töötav systemd üksus. See pole ise programmeerimise
CLI, seega pole käsul `omniroute run` midagi käivitada — `5dive` on **ainult seadistamiseks**
mõeldud sihtmärk.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Mõlemad vormid kirjutavad ühe 5dive'i **autentimisprofiili** ning iga selle profiiliga
seotud `claude`-koht suhtleb seejärel OmniRoute'iga. Sellel sihtmärgil on kolm eripära:

- **See töötab pargi hostis juurkasutajana.** 5dive'i toimingud mõjutavad kohalikke
  systemd üksusi ja juurkasutajale kuuluvat olekukataloogi; kaugrežiimi pole. Retsept
  käivitab end `sudo` kaudu uuesti, kui see ei tööta juba juurkasutajana (`--no-sudo`
  lülitab selle välja ja prindib selle asemel käsu).
- **Lõpp-punkt peab kasutama `https://`, välja arvatud loopback-aadressi korral.**
  Agendi API-võti liigub selle URL-iga kaasas igas päringus ning 5dive keeldub
  lihttekstiga ühendusest väljaspool kohalikku masinat asuva lõpp-punktiga. Privaatne
  LAN-aadress pole erand.
- **Iga koha enda mudelikinnitus on profiilist kõrgema prioriteediga.** Profiil sisaldab
  väärtust `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, kuid standardmudeli ID külge
  endiselt kinnitatud koht nurjub esimesel pöördumisel teatega _„Valitud mudeliga on
  probleem“_. Kohtade kinnitamiseks edastage `--agent <name>` (võib korrata); kui te
  seda ei tee, prindib retsept vastava käsu.

API-võti antakse 5dive'ile **standardsisendi** kaudu (`--api-key=-`), mistõttu ei ilmu
see kunagi `ps` väljundisse.

Profiili suunamine ühe mudeli asemel OmniRoute'i **kombole** annab pargile pakkujate
tõrkesiirde: kui esmane lõpp-punkt katkes
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) juures salvestatud
käituse ajal keset toimingut täielikult, lõpetas agent ülejäänud sammud varuvariandi
abil ega toonud katkestust kunagi kasutajani.

---

## Baas-URL-i kokkulepped (millised tööriistad vajavad `/v1`)

OmniRoute pakub OpenAI liidest aadressil `/v1`, Anthropicu liidest juuraadressil
ja Gemini natiivset liidest aadressil `/v1beta`. Iga integratsioon on seadistatud kujule, mida
selle tööriist eeldab (kontrollitud käsu lähtekoodist):

| Integratsioon                                                              | Kirjutatav baas-URL | `/v1`?                                    |
| -------------------------------------------------------------------------- | ------------------- | ----------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | juuraadress         | Ei — Cline lisab `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | juuraadress         | Ei — Goose lisab tee                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | juuraadress         | Ei — LiteLLM lisab `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | koos `/v1`-ga       | Jah                                       |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | juuraadress         | Ei — Claude Code lisab `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | koos `/v1`-ga       | Jah                                       |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | koos `/v1`-ga       | Jah                                       |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | juuraadress         | Ei — SDK lisab `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` autentimisprofiilis)                   | juuraadress         | Ei — Claude Code lisab `/v1/messages`     |

---

## Natiivsete sõltuvuste säilitamine värskendamisel: `--include=optional`

Kui värskendate käsuga `omniroute update` (pärast kinnitamist või lipuga `--apply`),
käivitab OmniRoute paigalduse alati koos lipuga `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

See **ei ole** lipp, mille peate käsule `omniroute update` edastama — värskendaja
rakendab selle alati. See tagab, et `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM-i pinu) säilivad värskendamisel isegi siis, kui teie npm-i
konfiguratsioonis on määratud `omit=optional`, mis muidu eemaldaks märkamatult natiivse
SQLite'i draiveri ja operatsioonisüsteemi võtmerõnga seose. Täpse käsu eelvaatamiseks ilma seda rakendamata:

```bash
omniroute update --dry-run
# [KUIVKÄIVITUS] Käivitataks: npm install -g omniroute@latest --include=optional
```

Muud `omniroute update` lipud (lähtekoodist kontrollitud): `--check` (väljumiskood 1,
kui versioon on aegunud), `--apply` (paigalda kinnitust küsimata), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI käsu `omniroute run gemini` kaudu

Leping on kontrollitud paketiga `@google/gemini-cli` 0.50.0: CLI arvestab muutujaga
`GOOGLE_GEMINI_BASE_URL` ja saadab selle aadressile päringu `POST /v1beta/models/<model>:generateContent`
(ning `:streamGenerateContent?alt=sse`) — täpselt OmniRoute'i natiivsele
Gemini liidesele (`/v1beta`). `omniroute run gemini` seadistab selle automaatselt:

- `GOOGLE_GEMINI_BASE_URL` → aktiivne OmniRoute'i baas-URL (juuraadress, ilma `/v1`-ta);
- `GEMINI_API_KEY` → lahendatud OmniRoute'i pääsutunnus (suvand/keskkond/kontekst);
- **ajutine isoleeritud `GEMINI_CLI_HOME`**, mille `.gemini/settings.json`
  valib autentimiseks `gemini-api-key`, et salvestatud Google OAuthi seanss (Code Assist)
  ei alistaks kunagi OmniRoute'ile suunatud käivitust — eemaldatakse pärast väljumist;
- **keskkonnahügieen**: alamprotsessi keskkonnast eemaldatakse `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` ja `GOOGLE_GENAI_USE_GCA` (mis suunaksid
  autentimise ümber Vertexile/Code Assistile) ning täiendava turvameetmena määratakse
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` — teisi `run`-i sihtmärke
  käsitletakse nende vastuoluliste muutujate puhul samamoodi;
- parameetri `--model <id>` lisamine suvandist `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini tööruumi usaldamise kaitse kehtib endiselt ilma kasutajaliideseta režiimis — lisage
ise `--skip-trust` (või usaldage kataloogi interaktiivselt); käivitaja
ei lähe sellest tahtlikult mööda. See käivitaja erineb **ACP
registreerimisest** (`src/lib/acp/registry.ts`, `gemini --acp`), mis jääb
agendiprotokolli integratsiooniks lehel `/dashboard/acp-agents`.

---

## Tegelik suitsutestide läbivaatus (valikuline)

Deterministlikud käivitusplaani regressioonitestid töötavad CI-s (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). TEGELIKE binaarfailide valideerimiseks TEGELIKU
OmniRoute'i serveri vastu on saadaval valikuline testiraamistik failis
`tests/integration/upstream-cli-smoke.int.test.ts`. Seda ei käivitata kunagi automaatselt
(kõik alamtestid jäetakse vahele, kui `RUN_CLI_SMOKE=1` pole määratud), autentimisandmed edastatakse keskkonnamuutuja
NIME kaudu (mitte kunagi väärtusena), võtmekujulised stringid eemaldatakse kogu salvestatud väljundist,
sihtmärgid, mille binaarfail pole installitud, jäetakse vahele ning tõrked liigitatakse kategooriatesse
autentimine / ülesvool / konfiguratsioon, mitte pelgaks kahendväärtuseks:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Valikuline: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` piirab läbivaatust;
`OMNIROUTE_SMOKE_TIMEOUT_MS` alistab sihtmärgipõhise 120-sekundilise ajalõpu.

---

## Vaata ka

- [Claude Code'i konfiguratsioon](./CLAUDE-CODE-CONFIGURATION.md) — põhjalikum Claude Code'i juhend
- [Codex CLI konfiguratsioon](./CODEX-CLI-CONFIGURATION.md) — ühekordne `[model_providers.omniroute]` baasseadistus
- [Kaugrežiim](./REMOTE-MODE.md) — kontekstid, piiratud ulatusega juurdepääsutõendid ja kaugserveri juhtimine
- [CLI-tööriistade teatmik](../reference/CLI-TOOLS.md) — toetatud tööriistade ja töölaualehtede täielik kataloog
- [Seadistusjuhend](./SETUP_GUIDE.md) — installimisviisid ja esmakäivituse häälestus
