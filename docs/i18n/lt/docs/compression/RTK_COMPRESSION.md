# RTK Compression (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK glaudinimas yra „OmniRoute“ komandų kontekstą atpažįstantis terminalo ir įrankių išvesties glaudinimo variklis. Jis skirtas programavimo agentų sesijoms, kuriose kontekstas daugiausia auga dėl testų žurnalų, komponavimo išvesties, paketų tvarkyklių perteklinės informacijos, apvalkalo seansų išrašų, Docker išvesties, git išvesties ir dėklo pėdsakų.

RTK gali veikti tiesiogiai su `defaultMode: "rtk"` arba būti pirmasis sudėtinio konvejerio etapas, paprastai:

```txt
rtk -> caveman
```

Tokia tvarka pirmiausia suglaudinama triukšminga mašininė išvestis, o tada „Caveman“ sutraukia likusį tekstą.

Pirminio RTK projekto duomenimis, komandų išvestis sumažinama `60-90%`. Jo README pateiktame sesijos pavyzdyje `~118,000` standartinių žetonų sumažėja iki `~23,900` RTK žetonų, taigi sutaupoma `79.7%` (`~80%`). „OmniRoute“ naudoja šį pirminio projekto vidurkį apskaičiuodama sudėtinį sutaupymą kartu su „Caveman“ įvesties glaudinimu:

```txt
RTK vidurkis:     sutaupyta 80%
Caveman įvestis: sutaupyta 46%
Sudėtinis:       1 - (1 - 0.80) * (1 - 0.46) = sutaupyta 89.2%
Diapazonas:      1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Ką jis glaudina

Integruotame kataloge šiuo metu pateikiami 49 šių kategorijų filtrai:

| Kategorija | Pavyzdžiai                                                    |
| ---------- | ------------------------------------------------------------- |
| `git`      | `git status`, `git branch`, `git diff`, `git log`             |
| `test`     | Vitest, Jest, Pytest, Playwright, Go testai, Cargo testai     |
| `build`    | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package`  | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`    | `ls`, `find`, `grep`, bendrieji apvalkalo žurnalai            |
| `docker`   | `docker ps`, Docker žurnalai                                  |
| `infra`    | Terraform, OpenTofu, `systemctl status`                       |
| `generic`  | JSON išvestis, dėklo pėdsakai, bendroji atsarginė išvestis    |

Detektorius, esantis `open-sse/services/compression/engines/rtk/commandDetector.ts`, klasifikuoja išvestį prieš parenkant filtrą. Filtrai taip pat gali būti parenkami pagal komandos šabloną arba išvesties reguliariąją išraišką, kai komandos klasės nepakanka.

## Filtrų parinkimas

RTK įkelia filtrus tokia tvarka:

1. Projekto filtrai iš `.rtk/filters.toml` ir `.rtk/filters.json`, tik kai jais pasitikima.
2. Visuotiniai filtrai iš `DATA_DIR/rtk/filters.toml` ir `DATA_DIR/rtk/filters.json`.
3. Integruoti filtrai iš `open-sse/services/compression/engines/rtk/filters/`.

Toje pačioje srityje RTK TOML schemos v1 filtrams teikiama pirmenybė prieš „OmniRoute“ JSON filtrus. TOML `match_command` išraiškos tikrinamos prieš komandos tipo atitiktį, kad importuotas konkrečiai komandai skirtas filtras galėtų pakeisti platesnį tos srities filtrą. Projekto sričiai vis tiek teikiama pirmenybė prieš visuotinę sritį, neatsižvelgiant į failo formatą.

Projekto filtrams sąmoningai taikomas pasitikėjimo patikrinimas, nes reguliariųjų išraiškų filtrai gali pakeisti įrankių išvesties pateikimą agentams. Projekto filtro failas priimamas, kai tenkinama viena iš šių sąlygų:

- `rtkConfig.trustProjectFilters` yra `true`.
- Nustatytas `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` yra atitinkama projekto filtro failo SHA-256 maiša.

Pasitikėjimo failo pavyzdys:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Maišos yra atskiros: `filtersSha256` suteikia pasitikėjimą `.rtk/filters.json`, o `filtersTomlSha256` suteikia pasitikėjimą `.rtk/filters.toml`. Pakeitus kurį nors failą, nustoja galioti tik jo paties pasitikėjimo įrašas. Visuotinius failus įdiegia administratorius, todėl jiems taikoma esama visuotinių filtrų pasitikėjimo tvarka.

Pasirinktinis filtras gali būti vienas filtro objektas arba filtro objektų masyvas. Netinkami pasirinktiniai filtrai praleidžiami ir nurodomi `/api/context/rtk/filters` diagnostikoje. Aptikus netinkamą integruotą filtrą, veikimas iškart nutraukiamas.

## Suderinamumas su RTK TOML schema v1

„OmniRoute“ gali analizuoti, tikrinti, testuoti ir įdiegti deklaratyvius filtrų failus, naudojančius RTK TOML schema v1.
Palaikomi laukai: `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` ir įterptieji `[[tests.<filter>]]` testai.
Nežinomi laukai, netinkamos arba nesaugios reguliariosios išraiškos, vienu metu naudojamos šalinimo ir išsaugojimo taisyklės, didesni nei
1 MiB failai ir nuorodos į nežinomus filtrus yra atmetami. Failą, kurio įterptieji testai nepavyksta,
galima patikrinti peržiūros tikslais, tačiau jo negalima įdiegti ar įkelti. Pasirinktinių failų įkėlimo klaidų atveju
ir toliau taikomas veikimo tęstinumo principas: netinkamas failas praleidžiamas, o likę filtrai toliau veikia.

„OmniRoute“ gauna įrankio išvestį po to, kai klientas ją jau užfiksavo, todėl `filter_stderr = true`
negali pakeisti proceso išvesties fiksavimo. Laukas priimamas, tačiau neatlieka jokio veiksmo, o patikros metu grąžinamas įspėjimas.
Tai sąmoningai apibūdinama kaip **suderinamumas su RTK TOML schema v1**, o ne visiškas suderinamumas
su RTK vykdomuoju failu, apvalkalo kabliais, „Rust“ komandų realizacijomis ar jo patikimų šaltinių saugyklos struktūra.

Išplėstiniame prietaisų skydelio RTK rodinyje galima įklijuoti arba įkelti TOML. Patikra nekeičia duomenų.
Diegiant `DATA_DIR/rtk/filters.toml` įrašomas atominiu būdu, taikant ribojančius leidimus, ir
veikiančių filtrų katalogas atnaujinamas nepaleidžiant sistemos iš naujo. Norint pakeisti esamą failą, būtinas aiškus `overwrite`
patvirtinimas, o pirmiausia sukuriamas `DATA_DIR/rtk/filters.toml.bak`.

## Filtrų DSL

Filtrai naudoja JSON schemą, aprašytą dokumente [Glaudinimo taisyklių formatas](./COMPRESSION_RULES_FORMAT.md).
Vykdymo aplinka šiuos etapus taiko nurodyta tvarka:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Svarbūs laukai:

| Laukas                       | Paskirtis                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Prieš atitikmens paiešką pašalinti terminalo spalvų / valdymo sekas                                 |
| `rules.filterStderr`         | Prieš atitikmens paiešką / filtravimą normalizuoti įprastus standartinės klaidų išvesties prefiksus |
| `rules.replace`              | Iš eilės taikyti reguliariųjų išraiškų pakeitimus                                                   |
| `rules.matchOutput`          | Kai išvestis atitinka žinomą sąlygą, grąžinti glaustą santrauką                                     |
| `rules.matchOutput[].unless` | Praleisti sutrumpinimą, kai aptinkamas klaidos / nesėkmės šablonas                                  |
| `rules.dropPatterns`         | Pašalinti nereikšmingas eilutes                                                                     |
| `rules.includePatterns`      | Teikti pirmenybę eilutėms su veiksmais pritaikoma informacija                                       |
| `rules.collapsePatterns`     | Sutraukti pasikartojančias atitinkančias eilutes                                                    |
| `rules.deduplicate`          | Pasirenkama kiekvieno filtro funkcija: sutraukti iš eilės einančias vienodas eilutes                |
| `rules.truncateLineAt`       | Saugiai „Unicode“ atžvilgiu sutrumpinti kiekvieną eilutę                                            |
| `rules.onEmpty`              | Atsarginis pranešimas, jei išfiltruojamos visos eilutės                                             |
| `tests[]`                    | Įterptieji pavyzdžiai, naudojami patikros etape                                                     |

Numatytieji filtrai turėtų apimti įterptuosius `tests[]` pavyzdžius. Pasirinktiniuose filtruose
taip pat reikėtų juos įtraukti, ypač kai filtrai bendrinami tarp projektų.

## Eilučių dublikatų šalinimas (du lygmenys)

RTK sutraukia pasikartojančias eilutes dviem nepriklausomais lygmenimis:

1. **Kiekvieno filtro `deduplicate` (pasirenkama, numatytoji reikšmė `false`).** Filtras gali nustatyti `rules.deduplicate: true`,
   kad prieš trumpinimą sutrauktų iš eilės einančias pasikartojančias eilutes _to filtro atrinktoje išvestyje_.
   Tai vykdoma faile `lineFilter.ts`. Senesniems filtrams ši funkcija automatiškai įjungiama, kai filtras apibrėžia
   `collapsePatterns`. Schema: `deduplicate: z.boolean().default(false)` faile
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Viso variklio `deduplicateThreshold` (numatytoji reikšmė `3`).** Įvykdžius visus filtrus, variklis sutraukia
   bet kokią `>= deduplicateThreshold` vienodų iš eilės einančių eilučių seką visame rezultate
   (`deduplicateRepeatedLines`, taikoma faile `engines/rtk/index.ts`). Normalizuojant reikšmė apribojama intervalu 2–100.

Kiekvieno filtro etapas vykdomas pirmiausia (filtro viduje), o viso variklio etapas vykdomas paskiausiai (sujungtai
išvesčiai), todėl jie veikia kartu be dvigubo skaičiavimo.

## Eilučių grupavimas (`enableGrouping`)

Kai `rtkConfig.enableGrouping` yra `true` (numatytoji reikšmė `false`), RTK rezultatui po dublikatų pašalinimo papildomai pritaiko `groupSimilarLines`
etapą, kuris sutraukia iš eilės einančių _beveik lygiaverčių_ (bet ne identiškų baitų lygmeniu)
eilučių sekas. `rtkConfig.groupingThreshold` (numatytoji reikšmė `3`) yra mažiausias sekos ilgis, kuriam esant
suaktyvinamas grupavimas. Tai struktūrinis `deduplicateThreshold` atitikmuo: dublikatų šalinimas apdoroja tikslius pasikartojimus,
o grupavimas — „tą pačią struktūrą su nedideliais skirtumais“. Abi parinktys yra `rtkConfig` JSON dalis,
saugoma lentelėje `key_value` (žr. aukščiau pateiktą skyrių „Konfigūracija“), todėl nuostata išlieka paleidus sistemą iš naujo.

## Kodo komentarų šalinimas (`stripCodeComments` / `preserveDocstrings`)

Kai įjungta `rtkConfig.applyToCodeBlocks`, RTK taip pat gali pašalinti komentarus iš atitvertų kodo blokų:

- `stripCodeComments` (numatytoji reikšmė `false`) — pasirenkama. Kai reikšmė yra `true`, RTK pašalina komentarus iš JavaScript
  ir TypeScript atitvertų blokų. Istoriškai ši parinktis buvo nuskaitoma, bet niekada netaikoma, todėl numatytoji reikšmė lieka
  „išsaugoti“, kad būtų išvengta tylaus pakeitimo produkcinėje aplinkoje.
- `preserveDocstrings` (numatytoji reikšmė `true`) — šalinant komentarus, JSDoc/`/** … */` blokiniai komentarai
  išsaugomi (juose pateikiama API dokumentacija yra vertingesnė už jų užimamus baitus). Nustatykite `false`, jei norite pašalinti
  ir juos.

Komentarų šalinimas įgyvendintas faile `open-sse/services/compression/engines/rtk/codeStripper.ts`. Jis naudoja
**TypeScript analizatorių** (ne reguliarųjį reiškinį), todėl eilučių, šablonų ir reguliariųjų reiškinių literalai niekada nėra klaidingai
palaikomi komentarais, o aptikus JSX procesas visiškai nutraukiamas (kad JSX išraiškų konteinerių komentarai
niekada nebūtų sugadinti). Šiuo metu komentarų šalinimas taikomas **tik JavaScript ir TypeScript** — kitoms
šalintuvo `CodeLanguage` rinkinio kalboms (Python, Rust, Go, Ruby, Java) taikomas tuščių eilučių ir
tarpų sutraukimas, bet komentarai nešalinami. Apdoroto bloko vykdymas `rulesApplied` pažymimas žyma `rtk:code-strip`.

> **Pastaba — GCF / lentelinė koduotė yra atskiras variklis.** RTK **neturi** „GCF“
> (Graph Compact Format) lentelinio / stulpelinio JSON kodavimo modulio. Šis kodavimo modulis — pakeitęs senesnį
> `omni-tabular` kodavimo modulį — yra **headroom** variklyje
> (`open-sse/services/compression/engines/headroom/`, o įtrauktas kodekas — kataloge
> `headroom/gcf/`). Jis nesusijęs su čia aprašytu RTK filtrų konvejeriu.

## Konfigūracija

Visuotiniai nustatymai pasiekiami per `/api/settings/compression`. RTK skirti nustatymai taip pat
pasiekiami per `/api/context/rtk/config`.

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

`enabledFilters` ir `disabledFilters` naudoja filtrų ID, pavyzdžiui, `test-vitest` arba `git-diff`.

Visa `rtkConfig` struktūra apibrėžta naudojant `RtkConfig` / `DEFAULT_RTK_CONFIG` faile
`open-sse/services/compression/types.ts`. Visas objektas išsaugomas kaip viena JSON reikšmė
SQLite lentelėje `key_value`, naudojant `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), o nuskaitant normalizuojamas funkcija `normalizeRtkConfig`. Todėl kiekvienas toliau nurodytas
laukas — įskaitant `enableGrouping`, `groupingThreshold`, `stripCodeComments` ir `preserveDocstrings` —
įrašomas į tą pačią saugyklą, iš jos nuskaitomas ir išlieka paleidus iš naujo.

| Raktas                 | Numatytoji reikšmė | Paskirtis                                                                                        |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| `deduplicateThreshold` | `3`                | Visam varikliui: mažiausias sutraukiamų iš eilės einančių vienodų eilučių skaičius (ribos 2–100) |
| `enableGrouping`       | `false`            | Pasirenkama: sutraukti beveik lygiaverčių iš eilės einančių eilučių sekas                        |
| `groupingThreshold`    | `3`                | Mažiausias iš eilės einančių panašių eilučių sekos ilgis, aktyvuojantis grupavimą                |
| `stripCodeComments`    | `false`            | Pasirenkama: pašalinti komentarus iš aptvertų kodo blokų (reikia `applyToCodeBlocks`)            |
| `preserveDocstrings`   | `true`             | Šalinant komentarus išsaugoti JSDoc / `/** … */` blokus                                          |

## API

| Maršrutas                          | Metodas | Paskirtis                                                     |
| ---------------------------------- | ------- | ------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET     | Nuskaityti RTK konfigūraciją                                  |
| `/api/context/rtk/config`          | PUT     | Atnaujinti RTK konfigūraciją                                  |
| `/api/context/rtk/filters`         | GET     | Pateikti filtrų katalogą ir įkėlimo diagnostiką               |
| `/api/context/rtk/import`          | POST    | Patikrinti arba įdiegti RTK TOML 1-os versijos schemos failus |
| `/api/context/rtk/test`            | POST    | Peržiūrėti vieno tekstinio turinio RTK glaudinimo rezultatą   |
| `/api/context/rtk/raw-output/[id]` | GET     | Nuskaityti išsaugotą nuasmenintą neapdorotą išvestį           |
| `/api/compression/preview`         | POST    | Peržiūrėti bet kurio glaudinimo režimo rezultatą              |

RTK testo turinys:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Glaudinimo peržiūros turinys:

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

Valdymo maršrutams reikalingas valdymo skydelio administravimo autentifikavimas arba atitinkama API rakto politika.

RTK TOML tikrinimo turinys:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Norėdami patikrintą failą įdiegti visuotinai, naudokite `"action": "install"`. `"overwrite": true` pridėkite tik
peržiūrėję ir patvirtinę esamo visuotinio failo pakeitimą.

## Neapdorotos išvesties atkūrimas

RTK paprastai grąžina tik suglaudintą tekstą. Derinimo tikslais `rawOutputRetention` gali išsaugoti redaguotą
neapdorotą išvestį:

| Reikšmė    | Veikimas                                                             |
| ---------- | -------------------------------------------------------------------- |
| `never`    | Neišsaugoti neapdorotos išvesties                                    |
| `failures` | Išsaugoti tik išvestį, kuri greičiausiai nurodo triktį               |
| `always`   | Po redagavimo išsaugoti kiekvieną suglaudintą RTK neapdorotą išvestį |

Išsaugoti failai įrašomi į:

```txt
DATA_DIR/rtk/raw-output/
```

Prieš išsaugant paslaptys yra redaguojamos, įskaitant įprastus prieigos raktus, API raktus, Slack prieigos raktus,
AWS prieigos raktus ir priskyrimo formato `token=...`, `secret=...`, `password=...` reikšmes. Analitikoje
saugomas tik žymeklio identifikatorius, dydis ir maišos metaduomenys.

## Patikros barjeras

Tikslinis patikros barjeras vykdo integruotus tiesioginius filtrų testus, nekviesdamas išorinių komandų per apvalkalą:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Platesnis RTK barjeras:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Prieš leidimą paleiskite platųjį glaudinimo barjerą:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK išplėtimas

1. Pridėkite arba atnaujinkite filtro JSON failą.
2. Įtraukite bent vieną `tests[]` pavyzdį, įrodantį svarbią elgseną.
3. Naujoms komandų šeimoms pridėkite testinius duomenis kataloge `tests/unit/compression/fixtures/rtk/`.
4. Pristatydami naują išvesties klasę, pridėkite komandų aptikimo testų aprėptį.
5. Paleiskite patikros ir platesnį RTK barjerus.
6. Jei filtras yra vietinis projektui, įtraukite `.rtk/filters.json` į versijų valdymą ir atnaujinkite `.rtk/trust.json` tik po peržiūros.

---

## Intensyvumo lygiai (v3.8.16+)

RTK palaiko **3 intensyvumo lygius**, leidžiančius pasirinkti kompromisą tarp **glaudinimo agresyvumo** ir **saugumo**. Lygis nustatomas naudojant `config.intensity` variklio konfigūracijoje.

### 3 lygiai

| Lygis                    | Trumpinimo slenkstis         | Žetonų sutaupymas | Rizika     | Geriausiai tinka                           |
| ------------------------ | ---------------------------- | ----------------- | ---------- | ------------------------------------------ |
| `minimal`                | 24 eilutės vienoje sekcijoje | ~20-40%           | Labai maža | Produkcinei aplinkai su kritiniu kontekstu |
| `standard` (numatytasis) | 24 eilutės vienoje sekcijoje | ~50-70%           | Maža       | Kasdienėms programavimo sesijoms           |
| `aggressive`             | 16 eilučių vienoje sekcijoje | ~70-90%           | Vidutinė   | Ilgoms sesijoms, didžiausiam sutaupymui    |

### Kur vyksta trumpinimas

Trumpinimo slenkstis veikia `lineFilter.ts`:

```ts
// Iš open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Išsaugoma kiekvienos sekcijos **pradžia** ir **pabaiga**; įsijungus trumpinimui vidurinė turinio dalis pašalinama.

### Kas lieka ir kas pašalinama

| Turinys                                   | minimal        | standard       | aggressive     |
| ----------------------------------------- | -------------- | -------------- | -------------- |
| Klaidos / dėklo pėdsakai                  | ✅ išsaugoma   | ✅ išsaugoma   | ✅ išsaugoma   |
| Testų triktys                             | ✅ išsaugoma   | ✅ išsaugoma   | ✅ išsaugoma   |
| Kompiliavimo klaidos                      | ✅ išsaugoma   | ✅ išsaugoma   | ✅ išsaugoma   |
| Sėkmingi testai (išsamūs)                 | ✅ išsaugoma   | 🟡 sutraukiama | 🟡 sutraukiama |
| Įprasta išvestis (informaciniai žurnalai) | 🟡 sutraukiama | 🟡 sutraukiama | ❌ pašalinama  |
| Eigos juostos                             | 🟡 sutraukiama | ❌ pašalinama  | ❌ pašalinama  |
| Antraštė / ASCII piešinys                 | 🟡 sutraukiama | ❌ pašalinama  | ❌ pašalinama  |

### Tinkamo intensyvumo pasirinkimas

```
                  Ar konteksto praradimas būtų katastrofiškas?
                  │
      ┌───────────┼───────────┐
      │           │           │
    TAIP         NE        NEŽINAU
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Kiek svarbus    Pirmiausia išbandykite
      │      našumas?        `standard` (tinka 80%
      │           │          atvejų)
      │      ┌────┴────┐
      │      │         │
      │    MAŽAI     LABAI
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Intensyvumo konfigūravimas

**Kiekvienam deriniui** (derinio konfigūracijoje):

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

**Programiškai**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) yra
`CompressionEngine` ir neturi `updateConfig` metodo. Vietoje jo atnaujinkite variklio konfigūraciją
naudodami registro pagalbinę funkciją:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Poveikio tikrinimas

Naudokite **patikros barjerą** (žr. toliau), kad patvirtintumėte, jog jūsų filtras yra saugus pasirinkus norimą intensyvumą:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filters failed at aggressive intensity");
}
```

---

## Pasirinktinių filtrų kūrimas (v3.8.16+)

Kataloge `engines/rtk/filters/` yra **49+ integruoti filtrų JSON failai**. Galite pridėti savo filtrų, kad suspaustumėte pasirinktinių įrankių, kurių neapima numatytieji filtrai, išvestį.

### Filtro schema („Zod“)

```ts
{
  "id": "string",                      // Privaloma. Filtro identifikatorius (kebab-case, pvz., "python-traceback")
  "label": "string",                   // Privaloma. Žmogui suprantamas filtro pavadinimas
  "description": "string",             // Neprivaloma (numatytoji reikšmė: ""). Trumpas filtro veikimo aprašas
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Neprivaloma (0–100, numatytoji reikšmė: 50). Vykdymo tvarka (didesnė reikšmė = vykdoma anksčiau)
  "match": {
    "commands": ["string"],            // Komandų pavadinimai, kuriuos reikia atitikti (pvz., "python", "pytest")
    "patterns": ["string"],            // Reguliariųjų reiškinių šablonai išvesčiai atitikti
    "outputTypes": ["string"]          // Aptiktos išvesties klasės (pvz., "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Neprivaloma (numatytoji reikšmė: false). Pašalinti ANSI spalvų kodus
    "replace": [                       // Paieškos ir pakeitimo taisyklės (numatytoji reikšmė: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Aptikus šablono atitiktį, toliau nebevykdyti (numatytoji reikšmė: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Praleisti, jei šis šablonas sutampa
      }
    ],
    "includePatterns": ["string"],     // Paliekamos eilutės (reguliariųjų reiškinių šablonai, numatytoji reikšmė: [])
    "dropPatterns": ["string"],        // Pašalinamos eilutės (reguliariųjų reiškinių šablonai, numatytoji reikšmė: [])
    "collapsePatterns": ["string"],    // Eilutės, kurių pasikartojimai sujungiami į vieną (numatytoji reikšmė: [])
    "deduplicate": boolean,            // Neprivaloma (numatytoji reikšmė: false). Pašalinti pasikartojančias eilutes
    "truncateLineAt": number,          // Neprivaloma (numatytoji reikšmė: 0). Sutrumpinti eilutes iki didžiausio simbolių skaičiaus
    "maxLines": number,                // Neprivaloma (numatytoji reikšmė: 0). Griežtai apriboti bendrą eilučių skaičių
    "headLines": number,               // Neprivaloma (numatytoji reikšmė: 20). Palikti pirmąsias N sutapusios išvesties eilučių
    "tailLines": number,               // Neprivaloma (numatytoji reikšmė: 20). Palikti paskutines N sutapusios išvesties eilučių
    "onEmpty": "string",               // Neprivaloma (numatytoji reikšmė: ""). Atsarginis pranešimas, jei visos eilutės išfiltruotos
    "filterStderr": boolean            // Neprivaloma (numatytoji reikšmė: false). Taip pat filtruoti stderr išvestį
  },
  "preserve": {
    "errorPatterns": ["string"],       // Šablonai, kurie visada turi būti išsaugoti (numatytoji reikšmė: [])
    "summaryPatterns": ["string"]      // Galutinės suvestinės eilutės šablonai (numatytoji reikšmė: [])
  },
  "tests": [                           // Įterptieji patikros testai (numatytoji reikšmė: [])
    {
      "name": "string",               // Privaloma. Testo pavadinimas
      "input": "sample output",        // Privaloma. Pavyzdinis įvesties tekstas
      "expected": "expected output",   // Privaloma. Tikėtina suspausta išvestis
      "command": "optional command"    // Neprivaloma. Komandos kontekstas
    }
  ]
}
```

### Pavyzdys: „Python“ dėklo išklotinės filtras

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

### Pasirinktinių filtrų įkėlimas

Įdėkite failą į atpažįstamą vietą:

```
~/.omniroute/rtk/filters/my-filter.json     # Naudotojo lygmens
<project>/.rtk/filters/my-filter.json      # Projekto lygmens
```

Paleidžiant filtrai automatiškai įkeliami naudojant `loadRtkFilters()`, esantį `open-sse/services/compression/engines/rtk/filterLoader.ts`. Įkėlimo programa aptinka filtrus šiose vietose:

- Integruotas katalogas: `open-sse/services/compression/engines/rtk/filters/`
- Naudotojo katalogas: `~/.omniroute/rtk/filters/`
- Projekto katalogas: `<project>/.rtk/filters/`

Norėdami įkelti filtrus programiškai:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Parinktys: customFiltersEnabled (įkelti naudotojo / projekto filtrus, pagal numatymą įjungta),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Tikrinimas

Įkeliant filtrai tikrinami pagal „Zod“ schemą. Netinkamos struktūros filtro įkelti nepavyks, o žurnale bus užregistruota klaida:

```
RTK_FILTER_LOADER: nepavyko patikrinti filtro "my-filter":
  - rules.replace.0.pattern: Netinkamas reguliarusis reiškinys
  - match.commands: negali būti tuščias
```

Norėdami patikrinti visus įdiegtus filtrus, iškvieskite `runRtkFilterTests()`, eksportuojamą iš `open-sse/services/compression/engines/rtk/verify.ts`.

### Geriausios praktikos

1. **Visada įtraukite `tests[]`** — jie įrodo, kad jūsų filtras veikia, ir apsaugo nuo regresijų
2. **Trumpiesiems sujungimams naudokite `matchOutput`** — jei viena eilutė perteikia esmę, pakeiskite ja visą bloką
3. **Teikite pirmenybę `keep`, o ne `strip`** — aiškios taisyklės „visada išsaugoti“ yra saugesnės nei „visada pašalinti“
4. **Testuokite visais 3 intensyvumo lygiais** — `minimal` neturėtų atlikti jokių pakeitimų, o `aggressive` vis tiek turėtų išsaugoti klaidas
5. **Naudokite lauką `unless`** — apsaugokite trumpuosius sujungimus sąlyga „nesuaktyvinti, jei yra X“

---

## Neapdorotos išvesties atkūrimas ir patikros vartai

Kai RTK agresyviai glaudina išvestį, galite **atkurti pradinį tekstą**, kad galėtumėte jį derinti, audituoti ar pakartotinai paleisti.

### Kaip veikia neapdorotos išvesties atkūrimas

```
Pradinė išvestis (10 tūkst. žetonų)
        │
        ▼
RTK glaudinimas (su rawOutput.enabled=true)
        │
        ├─▶ Suglaudinta išvestis (2 tūkst. žetonų)  ──▶ į LLM
        │
        └─▶ Pradinė išvestis (10 tūkst. žetonų)     ──▶ saugoma DB
                                                        (susieta pagal request_id)
```

### Neapdorotos išvesties saugojimo įjungimas

**Kiekvienai užklausai** (kombinuotoje konfigūracijoje):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1 MB riba
    }
  }
}
```

**Numatytoji nuostata**: `rawOutput.enabled: false` (taupoma saugyklos vieta).

### Saugojimo sąnaudos

| Vienai užklausai              | 1 MB riba           | 10 MB riba            |
| ----------------------------- | ------------------- | --------------------- |
| Vidutinė suglaudinta išvestis | ~5 KB               | ~5 KB                 |
| Saugoma neapdorota išvestis   | ~50–500 KB          | ~500 KB–5 MB          |
| Esant 1000 užklausų per dieną | 50–500 MB per dieną | 500 MB–5 GB per dieną |

> **Rekomendacija**: neapdorotą išvestį įjunkite tik per **derinimo seansus** arba vykdydami **atrankinį auditą**, o ne nuolat.

### Pradinės išvesties atkūrimas

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId iš glaudinimo statistikos
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` po glaudinimo grąžinamas masyve `CompressionStats.rtkRawOutputPointers[]`.
Funkcijos signatūrą žr. `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Patikros vartai

**RTK filtrų patikra** (`open-sse/services/compression/engines/rtk/verify.ts`) patikrina visus filtrus pagal jų `tests[]` ir užtikrina tinkamą veikimą visuose 3 intensyvumo lygiuose.

Norėdami paleisti patikrą, **iškvieskite `runRtkFilterTests()`**:

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

**Kas patikrinama**:

1. Kiekvienas filtras įkeliamas ir sėkmingai praeina schemos patikrą
2. Kiekvienas `tests[]` įrašas sukuria tikėtiną išvestį
3. `minimal` intensyvumas neatlieka pakeitimų (išsaugo pradinį turinį ir taiko tik struktūrinius filtrus)
4. `aggressive` intensyvumas išsaugo klaidas, testų nesėkmes ir dėklo pėdsakus
5. Suglaudinta išvestis niekada nebūna didesnė už pradinę įvestį

- Šaltinis: `open-sse/services/compression/engines/rtk/` (63 failai, ~70 KB)

- **Prieš suliejant filtro pakeitimą** — visada įsitikinkite, kad testai sėkmingai įvykdomi
- **Atnaujinus RTK variklį** — schema galėjo pasikeisti
- **Periodiškai stebėsenos metu** — apsaugo nuo testų fiksuotųjų duomenų nuokrypio
- **Pridedant naują įrankių ar komandų grupę** — įrodo, kad naujasis filtras veikia

---

## Taip pat žr.

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — išsami glaudinimo konvejerio apžvalga
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — variklių registras ir integruotieji varikliai
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — pasirinktiniai varikliai, kalbų paketai, sudėtiniai konvejeriai
- Šaltinis: `open-sse/services/compression/engines/rtk/` (63 failai, ~70 KB)
