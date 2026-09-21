# CLI Integrations (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute sisältää joukon `setup-*`-komentoja, jotka määrittävät ohjelmoinnin
CLI-työkalun (Codex, Claude Code, OpenCode, Cline, …) käyttämään OmniRoutea taustajärjestelmänään — näin
työkalu kommunikoi **yhden** päätepisteen kanssa, ja OmniRoute reitittää pyynnöt oikealle palveluntarjoajalle
automaattista varajärjestelmää käyttäen. Jokainen komento lukee **reaaliaikaisen** malliluettelon käynnissä olevasta
OmniRoute-instanssista (paikallisesta tai etäpalvelimella olevasta) ja kirjoittaa työkalun oman määritystiedoston **sinun**
koneellesi. API-avaimeen viitataan ympäristömuuttujalla aina, kun työkalu
tukee sitä. Komennot, jotka tallentavat työkalukohtaisen ympäristötiedoston, on mainittu alla.

Käytettävissä on myös yleiskäyttöinen käynnistin — `omniroute run <target>` — joka käynnistää
työkalun `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` tai `gemini`
oikeilla ympäristömuuttujilla kirjoittamatta lainkaan määritystiedostoja. Kohteet ja niiden
aliakset tulevat ensisijaisesta manifestista `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), ja `omniroute completion` tarjoaa samat
manifestista johdetut kohdesanat. Vanhat työkalukohtaiset käynnistimet —
`omniroute launch` (Claude Code) ja `omniroute launch-codex` (Codex) — ovat edelleen
käytettävissä.

Palveluntarjoajien käyttöönotto on mahdollista samasta paikallisesta tai etäympäristöstä.
Alla olevat API-ensisijaiset komennot pitävät hallinnan todennuksen erillään palveluntarjoajien
tunnistetiedoista eivätkä koskaan tulosta tunnistetietoja rakenteisessa tulosteessa:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Käytä skripteissä ensisijaisesti valintaa `--credential-stdin` tai `--credential-env`;
`--credential` on säilytetty hallittua paikallista käyttöä varten. `providers remove` edellyttää
valintaa `--yes` ei-interaktiivisessa päätteessä, ja kaikki viisi komentoa noudattavat aktiivista
kontekstia tai yleisiä `--base-url`/`--api-key`-valintoja.

Katso kahden kattavimman integraation kertaluonteiset, käsin kirjoitettavat perusmääritykset
työkalukohtaisista syventävistä ohjeista:

- [Claude Coden määritys](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI:n määritys](./CODEX-CLI-CONFIGURATION.md)
- [Etätila](./REMOTE-MODE.md) — ohjaa etäpalvelimella olevaa OmniRoutea (VPS / Tailnet) kannettavaltasi
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot-laajennus; se voi myös suorittaa nämä
  `setup-*`-komennot puolestasi editorin sisältä

---

## Päätaulukko

Jokainen komento noudattaa **aktiivista kontekstia** (joka asetetaan komennolla `omniroute connect`, katso
[Etätila](./REMOTE-MODE.md)) tai eksplisiittisiä valintoja `--remote <url> --api-key <key>`.
Alla oleva ”paikallinen vs. etäpalvelin” tarkoittaa seuraavaa: ilman valintoja kohteena on `http://localhost:20128`;
valinnalla `--remote` (tai aktiivisella etäkontekstilla) komento noutaa luettelon kyseiseltä
palvelimelta ja kirjoittaa määrityksen paikallisesti.

| Komento                    | Työkalu                                  | Mitä se kirjoittaa                                                                                                                                                                                        | Keskeiset valitsimet                                                                                                                       | Paikallinen vai etä |
| -------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                         | `~/.codex/<name>.config.toml` — yksi profiili kutakin yhteensopivaa tekstimallia kohden (`codex --profile <name>`)                                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Molemmat            |
| `omniroute setup-claude`   | Claude Code                              | `~/.claude/profiles/<name>/settings.json` — yksi profiili kutakin vastaavaa mallia kohden (`CLAUDE_CONFIG_DIR`)                                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Molemmat            |
| `omniroute setup-opencode` | OpenCode (OpenAI-yhteensopiva)           | `~/.config/opencode/opencode.json` — `omniroute`-tarjoaja ja kaikki luettelon mallit (`opencode -m omniroute/<model>`)                                                                                    | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Molemmat            |
| `omniroute setup-cline`    | Cline                                    | `~/.cline/data/{globalState,secrets}.json` (CLI-tila) + tulostaa VS Code -laajennuksen asetukset                                                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Molemmat            |
| `omniroute setup-kilo`     | Kilo Code                                | `~/.local/share/kilo/auth.json` (CLI) + yhdistää `kilocode.*`-asetukset VS Coden `settings.json`-tiedostoon, jos se on olemassa                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Molemmat            |
| `omniroute setup-continue` | Continue / `cn` CLI                      | `~/.continue/config.yaml` — `provider: openai`-mallit, avain `${{ secrets.OMNIROUTE_API_KEY }}`-arvon kautta                                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Molemmat            |
| `omniroute setup-cursor`   | Cursor                                   | Ei mitään — tulostaa sovelluksessa suoritettavat vaiheet (Cursorin määritykset ovat läpinäkymättömässä SQLite-tietokannassa)                                                                              | `--remote` `--api-key` `--only` `--port`                                                                                                   | Molemmat            |
| `omniroute setup-roo`      | Roo Code                                 | `~/.omniroute/roo-settings.json` (tuontidokumentti) + määrittää `roo-cline.autoImportSettingsPath`-asetuksen, jos VS Coden `settings.json` on olemassa                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Molemmat            |
| `omniroute setup-crush`    | Crush                                    | `~/.config/crush/crush.json` — `openai-compat`-tarjoaja, avain `$OMNIROUTE_API_KEY`-muuttujan kautta                                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Molemmat            |
| `omniroute setup-goose`    | Goose                                    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + tulostaa ympäristömuuttujien määritysohjeen                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Molemmat            |
| `omniroute setup-aider`    | Aider                                    | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + tulostaa ympäristömuuttujien määritysohjeen                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Molemmat            |
| `omniroute setup-qwen`     | Qwen Code                                | `~/.qwen/settings.json` — V4:n `modelProviders.openai`-taulukko + `OMNIROUTE_API_KEY` tiedostossa `~/.qwen/.env`                                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Molemmat            |
| `omniroute setup-5dive`    | 5dive (agenttiparvi)                     | Ei mitään `$HOME`-hakemistoon — kirjoittaa 5dive-**todennusprofiilin** (`/var/lib/5dive/auth-profiles/<name>/`) komennolla `5dive agent auth set`; vain pääkäyttäjälle, suoritetaan parven isäntäkoneella | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Molemmat            |
| `omniroute run <target>`   | Suorituksenaikainen käynnistys (yleinen) | Ei mitään — käynnistää `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` oikeilla ympäristömuuttujilla ja argumenteilla; Qwen ja Gemini käyttävät väliaikaista eristettyä kotihakemistoa        | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Molemmat            |
| `omniroute launch`         | Claude Code                              | Ei mitään — käynnistää `claude`-prosessin ja syöttää sille `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`-ympäristömuuttujat                                                                                 | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Molemmat            |
| `omniroute launch-codex`   | OpenAI Codex CLI                         | Ei mitään — käynnistää `codex`-prosessin ja syöttää `omniroute`-tarjoajan `-c`-valitsimilla                                                                                                               | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Molemmat            |

Huomautuksia valitsimista (tarkistettu komentojen lähdekoodista):

- `--remote <url>` — nouda luettelo etä-OmniRoutesta (ohittaa `--port`-valitsimen
  ja aktiivisen kontekstin). `--api-key <key>` antaa kyseisen palvelimen
  tunnistetiedon (oletuksena `OMNIROUTE_API_KEY`-ympäristömuuttuja tai aktiivisen kontekstin tunniste).
- `--only <patterns>` — pilkuilla erotellut alimerkkijonot; säilytä vain vastaavat
  mallitunnukset (esim. `--only glm,kimi`). Käytettävissä komennoissa `setup-codex`,
  `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — tulosta täsmälleen, mitä kirjoitettaisiin, muuttamatta
  tiedostojärjestelmää. Käytettävissä kaikissa `setup-*`-komennoissa **paitsi**
  komennossa `setup-cursor` (joka ei koskaan kirjoita tiedostoa).
- `--model <id>` — pakollinen (tai valitaan vuorovaikutteisesti) työkaluissa,
  joissa ei ole automaattista mallien löytämistä: Cline, Kilo, Roo, Goose, Qwen,
  Aider, 5dive. Nämä työkalut hyväksyvät myös `--yes`-valitsimen
  ei-vuorovaikutteisia suorituksia varten (jolloin myös `--model` vaaditaan).
  `setup-opencode` käyttää `--model`-valitsinta ylimmän tason oletusmallin asettamiseen.
- `--model <id>` komennossa `omniroute run` noudattaa manifestin kohdekohtaista
  kytkentää (`bin/cli/cli-manifest.mjs`): **aider** saa argumentin
  `--model openai/<id>` ja **opencode** argumentin `--model omniroute/<id>`
  (etuliite lisätään vain, jos tunnuksessa ei vielä ole sitä); **qwen** ja
  **gemini** saavat tunnuksen sellaisenaan; **claude** saa sen muuttujan
  `ANTHROPIC_MODEL` kautta, **goose** muuttujan `GOOSE_MODEL` kautta ja
  **codex** argumenttien `-c model_providers.omniroute.*` kautta. **Qwen on
  ainoa suorituskohde, joka vaatii ehdottomasti `--model`-valitsimen** —
  `omniroute run qwen` ilman sitä päättyy tilakoodiin `2` ja näyttää
  yksiselitteisen virheen.
- `--port <port>` — paikallisen OmniRouten portti (oletus `20128`, ohitetaan,
  kun `--remote` on asetettu). Käytettävissä kaikissa `setup-*`-komennoissa ja
  molemmissa käynnistimissä.
- Komennon `omniroute run` poistumiskoodit: alikomentona suoritettavan CLI:n oma
  poistumiskoodi välitetään sellaisenaan; `2` = virheelliset argumentit
  (kohdetta ei tueta, pakollinen `--model` puuttuu, säilösuojaus); `127` =
  kohteen binääritiedostoa ei ole muuttujan `PATH` hakemistoissa;
  `130`/`143`/`129`, kun käynnistys päättyy signaaliin
  `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = muu suorituksenaikainen käynnistysvirhe.
- Kaksi käynnistintä (`launch`, `launch-codex`) hyväksyvät valitsimen
  `--profile <name>` komennolla `setup-claude` / `setup-codex` kirjoitetun
  profiilin valitsemiseksi sekä eteenpäin välitettävät argumentit taustalla
  käytettävälle `claude`- / `codex`-binääritiedostolle.

Vuorovaikutteinen valitsin on myös asennusreseptien yhteisessä käytössä:

```bash
# Valitse aktiivisesta paikallisesta tai etämalliluettelosta ja määritä kohde.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegoi tällä hetkellä testatuille resepteille kohteita `codex`,
`claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` ja
`5dive` varten. Vain IDE-käyttöön tarkoitetut, MITM- ja pelkät opastusmerkinnät
säilyvät eksplisiittisinä `setup-*`-/manuaalisina työnkulkuina, eikä niitä
esitetä käynnistettävinä kohteina.

> `setup-opencode` on **kevyt openai-yhteensopiva** OpenCode-integraatio.
> Saatavilla on myös monipuolisempi liitännäisintegraatio —
> `omniroute setup opencode` — joka asentaa paketin
> `@omniroute/opencode-plugin`. Ne ovat eri komentoja; yllä oleva taulukko
> dokumentoi komennon `setup-opencode`.
>
> Liitännäinen toimitetaan kahtena pakettina, yksi kutakin OpenCoden pääversiota
> varten, koska lataajat odottavat erilaisia aloituspisteitä:
> `@omniroute/opencode-plugin` OpenCode v1:lle ja
> `@omniroute/opencode-plugin-v2` OpenCode v2:lle. v2-paketti on uusi
> (`0.1.0`) ja noudattaa edelleen muuttuvaa isäntäsopimusta, joten se lukee
> OpenCoden luetteloluonnokseen alustaman rakenteen sen sijaan, että olettaisi
> tietyn rakenteen. Asenna se lisäämällä `plugins`-merkintä tiedostoon
> `opencode.json`; `omniroute setup opencode` asentaa edelleen v1-paketin.
> Asetukset ja tunnistetietojen hakujärjestys kuvataan paketin README-tiedostossa.

---

## Paikallinen käyttö

Kun OmniRoute on käynnissä osoitteessa `localhost:20128`, suorita vain työkalusi
asennuskomento. Luettelo haetaan paikalliselta palvelimelta.

```bash
# Codex: kirjoita kullekin täsmäävälle mallille profiili hakemistoon ~/.codex/
omniroute setup-codex
codex --profile glm52            # käytä luotua profiilia

# Claude Code: kirjoita mallikohtaiset profiilit ja käynnistä sitten yksi niistä
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: kirjoita OpenAI-yhteensopiva palveluntarjoaja kaikkine luettelon malleineen
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # viitataan muodossa {env:OMNIROUTE_API_KEY}, ei koskaan levylle
opencode -m omniroute/glm/glm-5.2 "..."

# Työkalut, joissa ei ole automaattista tunnistusta, tarvitsevat eksplisiittisen mallin:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Esikatsele kirjoittamatta mitään:
omniroute setup-continue --dry-run
```

Käynnistä kirjoittamatta lainkaan määrityksiä (vain ympäristömuuttujien syöttö):

```bash
omniroute launch                 # Claude Code → paikallinen OmniRoute
omniroute launch-codex           # Codex CLI → paikallinen OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Eksplisiittinen komennon polku: välitä kaikki merkkijonon -- jälkeen
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Etäkäyttö

Kohdista mikä tahansa asennuskomento etäpalvelimen OmniRouteen käyttämällä valintoja `--remote` + `--api-key`. Luettelo haetaan etäpalvelimelta, ja määritykset kirjoitetaan paikalliselle koneellesi.

```bash
# OpenCode etä-VPS:ää vasten, säilytä vain glm/kimi-mallit
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # vie ensin OMNIROUTE_API_KEY ympäristöön

# Codex-profiilit etäluettelosta
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Käynnistä CLI suoraan etäpalvelinta vasten
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Sen sijaan, että antaisit `--remote`/`--api-key` joka kerta, kirjaudu kerran sisään ja anna
**aktiivisen kontekstin** toimittaa ne automaattisesti:

```bash
omniroute connect 192.168.0.15        # luo rajatun tunnisteen ja tallentaa kontekstin
omniroute setup-codex                 # ← käyttää nyt etäluetteloa
omniroute setup-opencode              # ← samoin
omniroute launch                      # ← Claude Code etäpalvelinta vasten
```

Lisätietoja konteksteista, käyttöalueista ja tunnisteiden hallinnasta on kohdassa [Etätila](./REMOTE-MODE.md).

---

## 5dive-agenttiparvet

[5dive](https://5dive.ai) suorittaa pitkäkestoisten koodausagenttien parvea, jossa kukin agentti on
systemd-yksikkö oman Unix-käyttäjänsä alaisuudessa. Se ei itsessään ole koodaus-CLI, joten
komennolla `omniroute run` ei ole mitään käynnistettävää — `5dive` on **vain määritettävä** kohde.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Molemmat muodot kirjoittavat yhden 5dive-**todennusprofiilin**, minkä jälkeen jokainen kyseiseen
profiiliin sidottu `claude`-paikka kommunikoi OmniRouten kanssa. Tälle kohteelle on ominaista kolme asiaa:

- **Se suoritetaan parven isäntäkoneessa root-käyttäjänä.** 5diven verbit käsittelevät paikallisia systemd-yksiköitä
  ja root-käyttäjän omistamaa tilahakemistoa; etätilaa ei ole. Resepti käynnistää itsensä uudelleen
  `sudo`-komennolla, jos sitä ei jo suoriteta root-käyttäjänä (`--no-sudo` poistaa tämän käytöstä ja tulostaa
  sen sijaan komennon).
- **Päätepisteen on käytettävä `https://`-osoitetta, ellei se ole takaisinkytkentäosoite.** Agentin API-avain
  kulkee kyseisen URL-osoitteen mukana jokaisessa pyynnössä, ja 5dive torjuu salaamattoman koneen ulkopuolisen päätepisteen.
  Yksityinen LAN-osoite ei ole poikkeus.
- **Kunkin paikan oma mallikiinnitys ohittaa profiilin.** Profiili sisältää arvon
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, mutta vakiomallin tunnukseen edelleen kiinnitetty paikka
  epäonnistuu ensimmäisellä vuorollaan ilmoituksella _"Valitussa mallissa on ongelma"_.
  Anna `--agent <name>` (voidaan toistaa), jotta myös paikat kiinnitetään; resepti tulostaa
  komennon, jos et tee niin.

API-avain annetaan 5divelle **vakiosyötteen** kautta (`--api-key=-`), joten se ei koskaan näy
`ps`-tulosteessa.

Kun profiili kohdistetaan yksittäisen mallin sijasta OmniRoute-**yhdistelmään**, parvi saa
palveluntarjoajan vikasietoisen vaihdon: kun ensisijainen päätepiste kaatui kokonaan kesken vuoron
kohteessa [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) tallennetussa ajossa, agentti suoritti
jäljellä olevat vaiheensa varapalvelussa eikä tuonut käyttökatkoa koskaan näkyviin.

---

## Perus-URL-käytännöt (mitkä työkalut haluavat `/v1`:n)

OmniRoute tarjoaa OpenAI-rajapinnan polussa `/v1`, Anthropic-rajapinnan juuressa
ja natiivin Gemini-rajapinnan polussa `/v1beta`. Kukin integraatio on kytketty työkalun
odottamaan muotoon (vahvistettu komentojen lähdekoodista):

| Integraatio                                                                | Kirjoitettu perus-URL | `/v1`?                                    |
| -------------------------------------------------------------------------- | --------------------- | ----------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | juuri                 | Ei — Cline lisää `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | juuri                 | Ei — Goose lisää polun                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | juuri                 | Ei — LiteLLM lisää `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | sisältää `/v1`:n      | Kyllä                                     |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | juuri                 | Ei — Claude Code lisää `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | sisältää `/v1`:n      | Kyllä                                     |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | sisältää `/v1`:n      | Kyllä                                     |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | juuri                 | Ei — SDK lisää `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` todennusprofiilissa)                   | juuri                 | Ei — Claude Code lisää `/v1/messages`     |

---

## Natiivien riippuvuuksien säilyttäminen päivityksessä: `--include=optional`

Kun päivität komennolla `omniroute update` (vahvistamisen jälkeen tai käyttäen valitsinta `--apply`),
OmniRoute suorittaa asennuksen sisäänrakennetulla valitsimella `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Tämä **ei** ole valitsin, joka annetaan komennolle `omniroute update` — päivittäjä käyttää sitä
aina. Se takaa, että `optionalDependencies`-riippuvuudet (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM -pino) säilyvät päivityksessä, vaikka npm-määrityksissäsi
olisi asetettu `omit=optional`, mikä muuten poistaisi natiivin SQLite-ajurin ja
käyttöjärjestelmän avainnippusidoksen ilman ilmoitusta. Voit esikatsella tarkan komennon suorittamatta sitä:

```bash
omniroute update --dry-run
# [KUIVA-AJO] Suoritettaisiin: npm install -g omniroute@latest --include=optional
```

Muut `omniroute update` -valitsimet (vahvistettu lähdekoodista): `--check` (poistumiskoodi 1, jos
versio on vanhentunut), `--apply` (asenna ilman vahvistuspyyntöä), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI komennolla `omniroute run gemini`

Sopimus on vahvistettu versiota `@google/gemini-cli` 0.50.0 vasten: CLI noudattaa
`GOOGLE_GEMINI_BASE_URL`-muuttujaa ja lähettää sitä vasten pyynnön `POST /v1beta/models/<model>:generateContent`
(sekä `:streamGenerateContent?alt=sse`) — täsmälleen OmniRouten natiiviin
Gemini-rajapintaan (`/v1beta`). `omniroute run gemini` määrittää tämän automaattisesti:

- `GOOGLE_GEMINI_BASE_URL` → aktiivinen OmniRouten perus-URL (juuri, ei `/v1`:tä);
- `GEMINI_API_KEY` → selvitetty OmniRoute-tunnistetieto (valitsin/ympäristö/konteksti);
- **tilapäinen eristetty `GEMINI_CLI_HOME`**, jonka `.gemini/settings.json`
  valitsee `gemini-api-key`-todennuksen, jotta tallennettu Google OAuth -istunto (Code Assist)
  ei koskaan ohita OmniRouteen suunnattua käynnistystä — poistetaan ohjelman sulkeuduttua;
- **ympäristön siisteys**: aliprosessin ympäristöstä poistetaan `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` ja `GOOGLE_GENAI_USE_GCA` (jotka ohjaisivat
  todennuksen Vertexiin tai Code Assistiin), ja `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  asetetaan ylimääräiseksi varmistukseksi — muut `run`-kohteet saavat saman
  käsittelyn omille ristiriitaisille muuttujilleen;
- `--model <id>` -lisäys valitsimesta `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminin työtilan luottamussuojaus on edelleen voimassa headless-tilassa — anna
`--skip-trust` itse (tai merkitse hakemisto luotetuksi vuorovaikutteisesti); käynnistin
ei tarkoituksellisesti ohita sitä. Tämä käynnistin on eri asia kuin **ACP-rekisteröinti**
(`src/lib/acp/registry.ts`, `gemini --acp`), joka säilyy agenttiprotokollaintegraationa
kohteelle `/dashboard/acp-agents`.

---

## Todellinen smoke-testauskierros (valinnainen)

Deterministiset käynnistyssuunnitelman regressiotestit suoritetaan CI:ssä (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). OIKEIDEN binääritiedostojen validoimiseksi OIKEAA
OmniRoute-palvelinta vasten valinnainen testikehys sijaitsee tiedostossa
`tests/integration/upstream-cli-smoke.int.test.ts`. Sitä ei koskaan suoriteta automaattisesti
(jokainen osatesti ohitetaan, ellei `RUN_CLI_SMOKE=1`), se välittää tunnistetiedon ympäristömuuttujan
NIMENÄ (ei koskaan arvona), peittää avaimen muotoiset merkkijonot kaikesta tallennetusta tulosteesta, ohittaa
kohteet, joiden binääritiedostoa ei ole asennettu, ja luokittelee virheet pelkän totuusarvon sijaan luokkiin
todennus / ylävirta / määritys:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Valinnainen: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` rajaa testauskierroksen;
`OMNIROUTE_SMOKE_TIMEOUT_MS` ohittaa kohdekohtaisen 120 sekunnin aikakatkaisun.

---

## Katso myös

- [Claude Code -määritys](./CLAUDE-CODE-CONFIGURATION.md) — perusteellisempi Claude Code -opas
- [Codex CLI -määritys](./CODEX-CLI-CONFIGURATION.md) — kertaluonteinen `[model_providers.omniroute]`-perusmääritys
- [Etätila](./REMOTE-MODE.md) — kontekstit, rajatut käyttöoikeustunnukset ja etäpalvelimen ohjaaminen
- [CLI-työkalujen viiteopas](../reference/CLI-TOOLS.md) — kaikkien tuettujen työkalujen ja hallintapaneelisivujen luettelo
- [Asennusopas](./SETUP_GUIDE.md) — asennustavat ja ensimmäisen käynnistyksen opastus
