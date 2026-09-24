# RTK Compression (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Ang RTK compression ay ang command-aware compression engine ng OmniRoute para sa output ng terminal at tool. Dinisenyo ito para sa mga session ng coding-agent kung saan ang karamihan ng paglaki ng context ay nagmumula sa mga test log, build output, ingay ng package manager, shell transcript, Docker output, git output, at stack trace.

Maaaring direktang patakbuhin ang RTK gamit ang `defaultMode: "rtk"` o bilang unang hakbang sa isang stacked pipeline, karaniwan ay:

```txt
rtk -> caveman
```

Sa pagkakasunod-sunod na iyon, kino-compress muna ang maingay na machine output, pagkatapos ay hinahayaan ang Caveman na paikliin ang natitirang prose.

Iniulat ng upstream RTK ang `60-90%` na pagtitipid sa command output. Ang sample session sa README nito ay bumaba mula sa `~118,000` karaniwang token patungong `~23,900` RTK token, na katumbas ng `79.7%` na natipid (`~80%`). Ginagamit ng OmniRoute ang upstream average na iyon para sa pagkalkula ng stacked savings kasama ang Caveman input compression:

```txt
Average ng RTK:  80% ang natipid
Input ng Caveman: 46% ang natipid
Stacked:          1 - (1 - 0.80) * (1 - 0.46) = 89.2% ang natipid
Saklaw:           1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Ano ang Kino-compress Nito

Ang built-in na catalog ay kasalukuyang may kasamang 49 na filter sa mga kategoryang ito:

| Kategorya | Mga Halimbawa                                                 |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, mga Go test, mga Cargo test |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, mga generic na shell log                |
| `docker`  | `docker ps`, mga Docker log                                   |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | JSON output, mga stack trace, generic na output fallback      |

Kinaklasipika ng detector sa `open-sse/services/compression/engines/rtk/commandDetector.ts` ang output bago pumili ng filter. Maaari ding tumugma ang mga filter ayon sa command pattern o output regex kapag hindi sapat ang isang command class.

## Pagresolba ng Filter

Nilo-load ng RTK ang mga filter sa ganitong pagkakasunod-sunod:

1. Mga project filter mula sa `.rtk/filters.toml` at `.rtk/filters.json`, kapag pinagkakatiwalaan lamang.
2. Mga global filter mula sa `DATA_DIR/rtk/filters.toml` at `DATA_DIR/rtk/filters.json`.
3. Mga built-in na filter mula sa `open-sse/services/compression/engines/rtk/filters/`.

Sa loob ng parehong scope, mas inuuna ang mga RTK TOML schema v1 filter kaysa sa mga OmniRoute JSON filter. Sinusuri ang mga TOML `match_command` expression bago ang command-type matching upang ma-override ng isang na-import na command-specific filter ang mas malawak na filter sa scope na iyon. Mas inuuna pa rin ang project scope kaysa sa global scope, anuman ang format ng file.

Sadyang nililimitahan ng trust gate ang mga project filter dahil maaaring baguhin ng mga regex filter kung paano ipinapakita sa mga agent ang tool output. Tinatanggap ang isang project filter file kapag totoo ang isa sa mga sumusunod:

- Ang `rtkConfig.trustProjectFilters` ay `true`.
- Nakatakda ang `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- Naglalaman ang `.rtk/trust.json` ng tumutugmang SHA-256 hash para sa project filter file.

Halimbawa ng trust file:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Magkahiwalay ang mga hash: pinagkakatiwalaan ng `filtersSha256` ang `.rtk/filters.json`, habang pinagkakatiwalaan ng `filtersTomlSha256` ang `.rtk/filters.toml`. Ang pag-edit sa alinmang file ay nagpapawalang-bisa lamang sa sarili nitong trust entry. Ini-install ng administrator ang mga global file at ginagamit ng mga ito ang kasalukuyang trust behavior para sa global filter.

Ang mga custom filter ay maaaring isang filter object o isang array ng mga filter object. Nilalaktawan ang mga invalid na custom filter at iniuulat ng mga diagnostic ng `/api/context/rtk/filters`. Agad na nagdudulot ng pagkabigo ang mga invalid na built-in na filter.

## Pagiging tugma sa RTK TOML schema v1

Maaaring i-parse, i-validate, i-test, at i-install ng OmniRoute ang mga deklaratibong filter file gamit ang RTK TOML schema v1.
Ang mga sinusuportahang field ay `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty`, at mga inline test na `[[tests.<filter>]]`.
Tinatanggihan ang mga hindi kilalang field, mga hindi wasto o hindi ligtas na regular expression, sabay na mga panuntunan sa strip/keep, mga file na higit sa
1 MiB, at mga reference sa hindi kilalang filter. Maaaring i-validate para sa pagsusuri ang isang file na bumagsak ang mga inline test,
ngunit hindi ito maaaring i-install o i-load. Nananatiling
fail-open ang mga pagkabigo sa pag-load ng custom na file: nilalaktawan ang hindi wastong file at patuloy na gumagana ang mga natitirang filter.

Natatanggap ng OmniRoute ang output ng tool pagkatapos na itong makuha ng client, kaya hindi mababago ng `filter_stderr = true`
ang pagkuha sa proseso. Tinatanggap ang field bilang isang no-op at nagbabalik ng babala ang validation.
Sadyang inilalarawan ito bilang **pagiging tugma sa RTK TOML schema v1**, hindi ganap na pagiging tugma
sa RTK executable, mga shell hook, mga implementasyon ng command sa Rust, o sa layout ng trust store nito.

Tumatanggap ang advanced na RTK view ng dashboard ng ini-paste o in-upload na TOML. Read-only ang validation.
Isinusulat ng installation ang `DATA_DIR/rtk/filters.toml` nang atomiko gamit ang mahihigpit na pahintulot at nire-refresh
ang live na katalogo ng filter nang hindi nagre-restart. Ang pagpapalit sa isang kasalukuyang file ay nangangailangan ng tahasang kumpirmasyon sa `overwrite`
at gumagawa muna ng `DATA_DIR/rtk/filters.toml.bak`.

## Filter DSL

Ginagamit ng mga filter ang JSON schema na inilalarawan sa [Format ng Mga Panuntunan sa Compression](./COMPRESSION_RULES_FORMAT.md).
Inilalapat ng runtime ang mga yugtong ito ayon sa pagkakasunod-sunod:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Mahahalagang field:

| Field                        | Layunin                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `rules.stripAnsi`            | Alisin ang mga sequence ng kulay/control ng terminal bago ang pagtutugma       |
| `rules.filterStderr`         | I-normalize ang mga karaniwang prefix ng stderr bago ang pagtutugma/pag-filter |
| `rules.replace`              | Ilapat ang mga nakaayos na regex replacement                                   |
| `rules.matchOutput`          | Magbalik ng maikling buod kapag tumugma ang output sa isang kilalang kondisyon |
| `rules.matchOutput[].unless` | Laktawan ang shortcut kapag may pattern ng error/pagkabigo                     |
| `rules.dropPatterns`         | Alisin ang mga linyang hindi mahalaga                                          |
| `rules.includePatterns`      | Bigyang-priyoridad ang mga linyang maaaring aksyunan                           |
| `rules.collapsePatterns`     | Pagsamahin ang mga paulit-ulit na tumutugmang linya                            |
| `rules.deduplicate`          | Per-filter na opt-in: pagsamahin ang magkakasunod na magkaparehong linya       |
| `rules.truncateLineAt`       | Unicode-safe na pagpapaikli sa bawat linya                                     |
| `rules.onEmpty`              | Fallback na mensahe kung na-filter ang lahat ng linya                          |
| `tests[]`                    | Mga inline sample na ginagamit ng verify gate                                  |

Inaasahang may kasamang mga inline sample na `tests[]` ang mga built-in na filter. Dapat ding isama
ng mga custom na filter ang mga ito, lalo na kapag ibinabahagi ang mga ito sa iba't ibang proyekto.

## Pag-aalis ng mga Dobleng Linya (dalawang layer)

Pinagsasama ng RTK ang mga dobleng linya sa dalawang magkahiwalay na layer:

1. **Bawat-filter na `deduplicate` (opsyonal, default na `false`).** Maaaring itakda ng isang filter ang `rules.deduplicate: true`
   upang pagsamahin ang magkakasunod na dobleng linya _sa loob ng tumugmang output ng filter na iyon_, bago ang pagputol.
   Tumatakbo ito sa loob ng `lineFilter.ts`. Para sa mga legacy filter, awtomatiko itong pinapagana kapag tumutukoy ang filter ng
   `collapsePatterns`. Schema: `deduplicate: z.boolean().default(false)` sa
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Pambuong-engine na `deduplicateThreshold` (default na `3`).** Pagkatapos tumakbo ang lahat ng filter, pinagsasama ng engine
   ang anumang sunod-sunod na `>= deduplicateThreshold` magkakaparehong linya sa buong resulta
   (`deduplicateRepeatedLines`, inilalapat sa `engines/rtk/index.ts`). Nililimitahan ang value sa 2–100
   sa panahon ng normalisasyon.

Unang tumatakbo ang bawat-filter na pass (sa loob ng filter), at huling tumatakbo ang pambuong-engine na pass (sa pinagsamang
output), kaya nagtutulungan ang dalawa nang walang dobleng pagbilang.

## Pagpapangkat ng mga Linya (`enableGrouping`)

Kapag `true` ang `rtkConfig.enableGrouping` (default na `false`), nagpapatakbo ang RTK ng karagdagang `groupSimilarLines`
pass sa resultang naproseso na ng pag-aalis ng mga doble, na pinagsasama ang magkakasunod na linya na _halos magkatumbas_ (hindi magkapareho sa bawat byte).
Ang `rtkConfig.groupingThreshold` (default na `3`) ang minimum na haba ng sunod-sunod na mga linya na magti-trigger
sa pagpapangkat. Ito ang estruktural na katapat ng `deduplicateThreshold`: pinangangasiwaan ng pag-aalis ng mga doble ang eksaktong pag-uulit,
samantalang pinangangasiwaan ng pagpapangkat ang "parehong anyo na may maliliit na pagkakaiba". Ang dalawang flag ay parehong bahagi ng `rtkConfig` JSON
na nakaimbak sa `key_value` table (tingnan ang Configuration sa itaas), kaya nananatili ang setting pagkatapos ng mga pag-restart.

## Pag-aalis ng mga Komento sa Code (`stripCodeComments` / `preserveDocstrings`)

Kapag pinagana ang `rtkConfig.applyToCodeBlocks`, maaari ring mag-alis ang RTK ng mga komento mula sa mga fenced code block:

- `stripCodeComments` (default na `false`) — opsyonal. Kapag `true`, inaalis ng RTK ang mga komento mula sa mga fenced block ng JavaScript
  at TypeScript. Noong una, binabasa ang flag ngunit hindi kailanman inilalapat, kaya nananatili ang default
  na "preserve" upang maiwasan ang hindi napapansing pagbabago sa production.
- `preserveDocstrings` (default na `true`) — kapag nag-aalis ng mga komento, pinananatili ang mga JSDoc/`/** … */` block comment
  (naglalaman ang mga ito ng dokumentasyon ng API na mas mahalaga kaysa sa bytes na ginagamit nila). Itakda sa `false` upang alisin
  rin ang mga iyon.

Ipinatutupad ang pag-aalis ng komento sa `open-sse/services/compression/engines/rtk/codeStripper.ts`. Ginagamit nito
ang **TypeScript parser** (hindi regex) upang hindi kailanman mapagkamalang mga komento ang mga string, template, at regex literal,
at ganap itong humihinto kapag may natukoy na JSX (upang hindi kailanman masira ang mga komento sa expression container ng JSX).
Sa kasalukuyan, nalalapat lamang ang pag-aalis ng komento sa **JavaScript at TypeScript** — ang iba pang
wika sa `CodeLanguage` set ng stripper (Python, Rust, Go, Ruby, Java) ay may pag-aalis ng mga bakanteng linya at
pagbabawas ng whitespace ngunit walang pag-aalis ng komento. Ang pagtakbo sa naalisan ng nilalaman na block ay tinatag bilang `rtk:code-strip` sa
`rulesApplied`.

> **Paalala — hiwalay na engine ang GCF / tabular encoding.** **Hindi** naglalaman ang RTK ng "GCF"
> (Graph Compact Format) na tabular/columnar JSON encoder. Ang encoder na iyon — na pumalit sa mas lumang
> `omni-tabular` encoder — ay nasa **headroom** engine
> (`open-sse/services/compression/engines/headroom/`, kasama ang naka-vendor na codec sa ilalim ng
> `headroom/gcf/`). Wala itong kaugnayan sa pipeline ng RTK filter na nakadokumento rito.

## Configuration

Makukuha ang mga pandaigdigang setting sa pamamagitan ng `/api/settings/compression`. Makukuha rin ang mga setting na partikular sa RTK sa pamamagitan ng `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

Gumagamit ang `enabledFilters` at `disabledFilters` ng mga filter id, halimbawa, `test-vitest` o `git-diff`.

Ang buong anyo ng `rtkConfig` ay tinutukoy ng `RtkConfig` / `DEFAULT_RTK_CONFIG` sa
`open-sse/services/compression/types.ts`. Ang buong object ay pinapanatili bilang iisang JSON value sa
SQLite `key_value` table sa ilalim ng `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), at ginagawang pamantayan kapag binabasa ng `normalizeRtkConfig`. Kaya ang bawat field sa ibaba
— kabilang ang `enableGrouping`, `groupingThreshold`, `stripCodeComments`, at `preserveDocstrings` —
ay dumaraan sa parehong store at nananatili pagkatapos ng pag-restart.

| Key                    | Default | Layunin                                                                                                           |
| ---------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`     | Para sa buong engine: pinakamababang magkakasunod na magkaparehong linya na isi-collapse (nililimitahan sa 2–100) |
| `enableGrouping`       | `false` | Opsyonal: i-collapse ang mga serye ng halos magkakatumbas na magkakasunod na linya                                |
| `groupingThreshold`    | `3`     | Pinakamababang serye ng magkakasunod na magkakatulad na linya na magti-trigger ng grouping                        |
| `stripCodeComments`    | `false` | Opsyonal: alisin ang mga comment mula sa mga fenced code block (kailangan ang `applyToCodeBlocks`)                |
| `preserveDocstrings`   | `true`  | Kapag nag-aalis ng mga comment, panatilihin ang mga JSDoc/`/** … */` block                                        |

## API

| Route                              | Method | Layunin                                                  |
| ---------------------------------- | ------ | -------------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Basahin ang RTK config                                   |
| `/api/context/rtk/config`          | PUT    | I-update ang RTK config                                  |
| `/api/context/rtk/filters`         | GET    | Ilista ang filter catalog at mga diagnostic sa pag-load  |
| `/api/context/rtk/import`          | POST   | I-validate o i-install ang mga RTK TOML schema v1 file   |
| `/api/context/rtk/test`            | POST   | I-preview ang RTK compression para sa isang text payload |
| `/api/context/rtk/raw-output/[id]` | GET    | Basahin ang pinanatili at na-redact na raw output        |
| `/api/compression/preview`         | POST   | I-preview ang anumang compression mode                   |

RTK test payload:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Compression preview payload:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Nangangailangan ang mga management route ng dashboard management auth o ng katugmang API-key policy.

RTK TOML validation payload:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Gamitin ang `"action": "install"` upang i-install ang na-validate na file sa pandaigdigang saklaw. Idagdag lamang ang `"overwrite": true`
pagkatapos suriin at kumpirmahin ang pagpapalit sa isang umiiral na pandaigdigang file.

## Pagbawi ng Raw Output

Karaniwang compressed text lamang ang ibinabalik ng RTK. Para sa pag-debug, maaaring panatilihin ng `rawOutputRetention` ang na-redact na
raw output:

| Value      | Gawi                                                                      |
| ---------- | ------------------------------------------------------------------------- |
| `never`    | Huwag panatilihin ang raw output                                          |
| `failures` | Panatilihin lamang ang output na malamang na kabiguan                     |
| `always`   | Panatilihin ang bawat compressed RTK raw output, pagkatapos ng pag-redact |

Isinusulat ang mga pinanatiling file sa ilalim ng:

```txt
DATA_DIR/rtk/raw-output/
```

Nire-redact ang mga lihim bago i-persist, kabilang ang mga karaniwang bearer token, API key, Slack token,
AWS access key, at mga value na nasa anyong assignment na `token=...`, `secret=...`, `password=...`. Ang analytics
ay nag-iimbak lamang ng pointer id, laki, at hash metadata.

## Gate ng Pag-verify

Pinapatakbo ng nakatuong gate ng pag-verify ang mga built-in na inline filter test nang hindi gumagamit ng mga panlabas na command sa pamamagitan ng shell:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Ang mas malawak na RTK gate ay:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Patakbuhin ang malawak na compression gate bago ang release:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Pagpapalawak sa RTK

1. Magdagdag o mag-update ng filter JSON file.
2. Magsama ng kahit isang sample sa `tests[]` na nagpapatunay sa mahalagang gawi.
3. Magdagdag ng fixture sa ilalim ng `tests/unit/compression/fixtures/rtk/` para sa mga bagong pamilya ng command.
4. Magdagdag ng saklaw para sa pagtukoy ng command kapag nagpapakilala ng bagong klase ng output.
5. Patakbuhin ang gate ng pag-verify at ang mas malawak na RTK gate.
6. Kung lokal sa proyekto ang filter, i-commit ang `.rtk/filters.json` at i-refresh lamang ang `.rtk/trust.json` pagkatapos ng pagsusuri.

---

## Mga Antas ng Intensity (v3.8.16+)

Sinusuportahan ng RTK ang **3 antas ng intensity** na nagbabalanse sa **agresibong compression** at **kaligtasan**. Itinatakda ang antas sa pamamagitan ng `config.intensity` sa config ng engine.

### Ang 3 Antas

| Antas                | Threshold ng truncation   | Matitipid na token | Panganib   | Pinakamainam para sa                          |
| -------------------- | ------------------------- | ------------------ | ---------- | --------------------------------------------- |
| `minimal`            | 24 na linya bawat seksyon | ~20-40%            | Napakababa | Production na may kritikal na konteksto       |
| `standard` (default) | 24 na linya bawat seksyon | ~50-70%            | Mababa     | Pang-araw-araw na coding session              |
| `aggressive`         | 16 na linya bawat seksyon | ~70-90%            | Katamtaman | Mahahabang session, pinakamalaking pagtitipid |

### Kung Saan Nangyayari ang Truncation

Nakaaapekto ang threshold ng truncation sa `lineFilter.ts`:

```ts
// Mula sa open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Parehong pinapanatili ang **simula** at **dulo** ng bawat seksyon; inaalis ang nilalaman sa gitna kapag nagsimula ang truncation.

### Ano ang Nananatili kumpara sa Pinuputol

| Nilalaman                        | minimal          | standard         | aggressive       |
| -------------------------------- | ---------------- | ---------------- | ---------------- |
| Mga error / stack trace          | ✅ pinapanatili  | ✅ pinapanatili  | ✅ pinapanatili  |
| Mga kabiguan sa test             | ✅ pinapanatili  | ✅ pinapanatili  | ✅ pinapanatili  |
| Mga error sa build               | ✅ pinapanatili  | ✅ pinapanatili  | ✅ pinapanatili  |
| Mga pumasa sa test (verbose)     | ✅ pinapanatili  | 🟡 kino-collapse | 🟡 kino-collapse |
| Karaniwang output (mga info log) | 🟡 kino-collapse | 🟡 kino-collapse | ❌ inaalis       |
| Mga progress bar                 | 🟡 kino-collapse | ❌ inaalis       | ❌ inaalis       |
| Banner / ASCII art               | 🟡 kino-collapse | ❌ inaalis       | ❌ inaalis       |

### Pagpili ng Tamang Intensity

```
                  Sakuna ba ang pagkawala ng konteksto?
                  │
      ┌───────────┼───────────┐
      │           │           │
     OO          HINDI      DI-TIYAK
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Gaano kahalaga  Subukan muna ang `standard`
      │      ang throughput? (gumagana sa 80% ng
      │           │          mga kaso)
      │      ┌────┴────┐
      │      │         │
      │    MABABA    MATAAS
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Pag-configure ng Intensity

**Bawat combo** (sa config ng combo):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Sa pamamagitan ng program**:

Ang `rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) ay isang
`CompressionEngine` at walang `updateConfig` method. Sa halip, i-update ang config
ng engine sa pamamagitan ng registry helper:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Pag-verify sa Epekto

Gamitin ang **Gate ng Pag-verify** (tingnan sa ibaba) upang kumpirmahing ligtas ang iyong filter sa napili mong intensity:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Nabigo ang mga filter sa aggressive na intensity");
}
```

---

## Pagbuo ng Custom na Filter (v3.8.16+)

Ang direktoryong `engines/rtk/filters/` ay naglalaman ng **49+ built-in na filter JSON file**. Maaari kang magdagdag ng sarili mong filter upang i-compress ang output mula sa mga custom na tool na hindi saklaw ng mga default.

### Schema ng Filter (Zod)

```ts
{
  "id": "string",                      // Kinakailangan. Identifier ng filter (kebab-case, hal., "python-traceback")
  "label": "string",                   // Kinakailangan. Pangalan ng filter na madaling maunawaan
  "description": "string",             // Opsyonal (default: ""). Maikling paglalarawan sa ginagawa ng filter
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Opsyonal (0-100, default: 50). Pagkakasunod-sunod ng pagpapatupad (mas mataas = mauuna)
  "match": {
    "commands": ["string"],            // Mga pangalan ng command na itutugma (hal., "python", "pytest")
    "patterns": ["string"],            // Mga regex pattern na itutugma sa output
    "outputTypes": ["string"]          // Mga natukoy na klase ng output (hal., "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Opsyonal (default: false). Alisin ang mga ANSI color code
    "replace": [                       // Mga panuntunan sa paghahanap at pagpapalit (default: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Agad na ihinto kapag tumugma ang pattern (default: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Laktawan kung tumugma ang pattern na ito
      }
    ],
    "includePatterns": ["string"],     // Mga linyang pananatilihin (mga regex pattern, default: [])
    "dropPatterns": ["string"],        // Mga linyang aalisin (mga regex pattern, default: [])
    "collapsePatterns": ["string"],    // Mga linyang pagsasamahin sa iisang paglitaw (default: [])
    "deduplicate": boolean,            // Opsyonal (default: false). Alisin ang mga duplikadong linya
    "truncateLineAt": number,          // Opsyonal (default: 0). Putulin ang mga linya sa maximum na bilang ng character
    "maxLines": number,                // Opsyonal (default: 0). Mahigpit na limitasyon sa kabuuang bilang ng mga linya
    "headLines": number,               // Opsyonal (default: 20). Panatilihin ang unang N linya ng tumugmang output
    "tailLines": number,               // Opsyonal (default: 20). Panatilihin ang huling N linya ng tumugmang output
    "onEmpty": "string",               // Opsyonal (default: ""). Fallback na mensahe kung na-filter ang lahat ng linya
    "filterStderr": boolean            // Opsyonal (default: false). I-filter din ang stderr output
  },
  "preserve": {
    "errorPatterns": ["string"],       // Mga pattern na dapat palaging panatilihin (default: [])
    "summaryPatterns": ["string"]      // Mga pattern para sa panghuling linya ng buod (default: [])
  },
  "tests": [                           // Mga inline na test para sa pagpapatunay (default: [])
    {
      "name": "string",               // Kinakailangan. Pangalan ng test
      "input": "sample output",        // Kinakailangan. Halimbawang input text
      "expected": "expected output",   // Kinakailangan. Inaasahang na-compress na output
      "command": "optional command"    // Opsyonal. Konteksto ng command
    }
  ]
}
```

### Halimbawa: Filter ng Python Traceback

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Pag-load ng mga Custom na Filter

Ilagay ang file sa isang kinikilalang lokasyon:

```
~/.omniroute/rtk/filters/my-filter.json     # Antas ng user
<project>/.rtk/filters/my-filter.json      # Antas ng proyekto
```

Awtomatikong nilo-load ang mga filter sa pagsisimula sa pamamagitan ng `loadRtkFilters()` sa `open-sse/services/compression/engines/rtk/filterLoader.ts`. Hinahanap ng loader ang mga filter mula sa:

- Built-in na catalog: `open-sse/services/compression/engines/rtk/filters/`
- Direktoryo ng user: `~/.omniroute/rtk/filters/`
- Direktoryo ng proyekto: `<project>/.rtk/filters/`

Upang i-load ang mga filter sa pamamagitan ng program:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Mga opsyon: customFiltersEnabled (i-load ang mga filter ng user/proyekto, naka-on bilang default),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Pagpapatunay

Pinapatunayan ang mga filter laban sa Zod schema kapag nilo-load. Ang isang filter na may maling estruktura ay hindi malo-load at magtatala ng error:

```
RTK_FILTER_LOADER: nabigo sa pagpapatunay ang filter na "my-filter":
  - rules.replace.0.pattern: Hindi wastong regex
  - match.commands: hindi dapat walang laman
```

Upang patunayan ang lahat ng naka-install na filter, tawagin ang `runRtkFilterTests()` na ini-export mula sa `open-sse/services/compression/engines/rtk/verify.ts`.

### Pinakamahuhusay na Kasanayan

1. **Palaging isama ang `tests[]`** — pinatutunayan ng mga ito na gumagana ang iyong filter at pinipigilan ang mga regresyon
2. **Gamitin ang `matchOutput` para sa mga short-circuit** — kung sapat na ang isang linya upang ipaliwanag ang lahat, palitan ang buong block
3. **Mas piliin ang `keep` kaysa `strip`** — mas ligtas ang tahasang mga panuntunang "palaging panatilihin" kaysa "palaging alisin"
4. **Subukan sa lahat ng 3 antas ng intensity** — dapat walang maging epekto ang `minimal`, at dapat mapanatili pa rin ng `aggressive` ang mga error
5. **Gamitin ang field na `unless`** — protektahan ang mga short-circuit gamit ang "huwag i-trigger kung naroroon ang X"

---

## Pagbawi ng Raw Output at Gate ng Beripikasyon

Kapag agresibong kino-compress ng RTK ang output, maaari mong **bawiin ang orihinal na teksto** para sa pag-debug, pag-audit, o muling pagpapatakbo.

### Paano Gumagana ang Pagbawi ng Raw Output

```
Orihinal na output (10K token)
        │
        ▼
Pag-compress ng RTK (na may rawOutput.enabled=true)
        │
        ├─▶ Na-compress na output (2K token)  ──▶ sa LLM
        │
        └─▶ Orihinal na output (10K token)    ──▶ nakaimbak sa DB
                                                      (naka-link gamit ang request_id)
```

### Pag-enable ng Imbakan ng Raw Output

**Bawat request** (sa combo config):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Limitasyong 1MB
    }
  }
}
```

**Default**: `rawOutput.enabled: false` (nakakatipid sa storage).

### Gastos sa Storage

| Bawat request                    | Limitasyong 1MB | Limitasyong 10MB |
| -------------------------------- | --------------- | ---------------- |
| Average na na-compress na output | ~5KB            | ~5KB             |
| Nakaimbak na raw output          | ~50-500KB       | ~500KB-5MB       |
| Sa 1000 request/araw             | 50-500MB/araw   | 500MB-5GB/araw   |

> **Rekomendasyon**: I-enable lamang ang raw output para sa **mga session ng pag-debug** o **naka-sample na pag-audit**, at huwag panatilihing laging naka-on.

### Pagbawi sa Orihinal

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId mula sa mga compression stat
if (raw) {
  console.log("Original output:", raw);
}
```

Ibinabalik ang `pointerId` sa `CompressionStats.rtkRawOutputPointers[]` pagkatapos ng compression.
Tingnan ang `open-sse/services/compression/engines/rtk/rawOutput.ts:102` para sa function signature.

### Ang Gate ng Beripikasyon

Bine-validate ng **RTK Filter Verification** (`open-sse/services/compression/engines/rtk/verify.ts`) ang lahat ng filter laban sa mga `tests[]` ng mga ito at tinitiyak na tama ang gawi sa lahat ng 3 antas ng intensity.

**Tawagin ang `runRtkFilterTests()`** upang patakbuhin ang beripikasyon:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Ano ang bine-validate nito**:

1. Nalo-load at pumapasa sa schema validation ang bawat filter
2. Gumagawa ang bawat entry sa `tests[]` ng inaasahang output
3. Ang `minimal` intensity ay no-op (pinapanatili ang orihinal at mga structural filter lamang ang inilalapat)
4. Pinapanatili ng `aggressive` intensity ang mga error, pagkabigo ng test, at stack trace
5. Hindi kailanman mas malaki ang na-compress na output kaysa sa orihinal na input

- Source: `open-sse/services/compression/engines/rtk/` (63 file, ~70KB)

- **Bago mag-merge ng pagbabago sa filter** — palaging tiyaking pumapasa ang mga test
- **Pagkatapos i-upgrade ang RTK engine** — maaaring nagbago ang schema
- **Pana-panahon sa monitoring** — pinoprotektahan laban sa drift sa mga test fixture
- **Kapag nagdaragdag ng bagong tool/command family** — pinatutunayan na gumagana ang bagong filter

---

## Tingnan Din

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Kumpletong pangkalahatang-ideya ng compression pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registry ng engine at mga built-in na engine
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Mga custom na engine, language pack, at stacked pipeline
- Source: `open-sse/services/compression/engines/rtk/` (63 file, ~70KB)
