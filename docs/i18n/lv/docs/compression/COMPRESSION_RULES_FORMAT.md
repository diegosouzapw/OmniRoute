# Compression Rules Format (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Saspiešanas kārtulas ir JSON faili, kas tiek ielādēti izpildlaikā. Tie ar nolūku satur tikai datus, lai jaunas
valodu pakotnes un RTK komandu filtrus varētu pārskatīt, nemainot dzinēja kodu.

> **Kanoniskā shēma (patiesības avots):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema projekts 2020-12).
> Tālāk sniegtie piemēri ir ilustratīvi — šaubu gadījumā validējiet savu pakotni pret `_schema.json`.

## Caveman kārtulu pakotnes

Caveman kārtulu pakotnes atrodas šeit:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Katrā pakotnē ir aizvietojumi, kas tiek piemēroti parastam tekstam pēc aizsargāto apgabalu izolēšanas.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Caveman lauki

| Lauks                    | Obligāts | Apraksts                                                                                       |
| ------------------------ | -------- | ---------------------------------------------------------------------------------------------- |
| `language`               | jā       | BCP-47 līdzīga valodas atslēga, piemēram, `en`, `pt-BR`, `es`                                  |
| `category`               | jā       | Pakotnes kategorijas faila nosaukums/kategorija, piemēram, `filler` vai `dedup`                |
| `rules`                  | jā       | Regulāro izteiksmju aizvietošanas kārtulu masīvs                                               |
| `rules[].name`           | jā       | Stabils kārtulas nosaukums                                                                     |
| `rules[].pattern`        | jā       | JavaScript regulārās izteiksmes avots                                                          |
| `rules[].flags`          | nē       | JavaScript regulārās izteiksmes karodziņi; noklusējums `gi`                                    |
| `rules[].replacement`    | nē       | Aizvietošanas virkne vai rezerves vērtība, ja `replacementMap` nav atbilstības                 |
| `rules[].replacementMap` | nē       | Konkrētām atbilstībām paredzēti aizvietojumi, kuru atslēgas ir normalizēts atbilstošais teksts |
| `rules[].context`        | nē       | `all`, `user`, `assistant` vai `system`; noklusējums `all`                                     |
| `rules[].category`       | nē       | `filler`, `context`, `structural`, `dedup`, `terse` vai `ultra`                                |
| `rules[].minIntensity`   | nē       | `lite`, `full` vai `ultra`; noklusējums `lite`                                                 |
| `rules[].description`    | nē       | Cilvēkam lasāms kārtulas kopsavilkums                                                          |

Izmantojiet `flags`, ja ir svarīga reģistra jutīga atbilstība, piemēram, noņemot artikulu pirms teksta ar mazajiem burtiem,
bet nenoņemot `the OpenAI API`. Izmantojiet `replacementMap`, ja vienai regulārajai izteiksmei ir vairākas alternatīvas,
kurām nepieciešami atšķirīgi rezultāti; tādējādi JSON kārtulu pakotnēs ir tikai dati, vienlaikus saglabājot
bagātīgāko iebūvēto TypeScript aizvietošanas funkciju darbību.

## RTK filtru pakotnes

RTK filtri atrodas:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Katrs filtrs apraksta, kā atpazīt un saspiest komandu izvades saimi.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK lauki

| Lauks                      | Obligāts | Apraksts                                                                            |
| -------------------------- | -------- | ----------------------------------------------------------------------------------- |
| `id`                       | jā       | Stabils filtra identifikators                                                       |
| `label`                    | jā       | Informācijas panelī lasāms nosaukums                                                |
| `category`                 | jā       | Filtru saime: git, test, build, shell, docker, package, infra, cloud, generic       |
| `priority`                 | nē       | Ja atbilst vairāki filtri, uzvar filtrs ar augstāku prioritāti                      |
| `match.outputTypes`        | nē       | Detektora izvades identifikatori, kas atlasa šo filtru                              |
| `match.commands`           | nē       | Komandu marķieri, kas atlasa šo filtru                                              |
| `match.patterns`           | nē       | Regulāro izteiksmju paraugi, kas atlasa šo filtru pēc izvades teksta                |
| `rules.stripAnsi`          | nē       | Pirms regulāro izteiksmju posmiem noņemt ANSI vadības sekvences                     |
| `rules.replace`            | nē       | Sakārtotas regulāro izteiksmju aizstāšanas, kas tiek lietotas katrai rindai         |
| `rules.matchOutput`        | nē       | Izvades noteikumi ar priekšlaicīgu pabeigšanu un neobligātu `unless` nosacījumu     |
| `rules.includePatterns`    | nē       | Rindas, kuru saglabāšanai dodama priekšroka                                         |
| `rules.dropPatterns`       | nē       | Rindas, kas jānoņem kā troksnis                                                     |
| `rules.collapsePatterns`   | nē       | Atkārtotas atbilstošās rindas, kuras var sakļaut                                    |
| `rules.deduplicate`        | nē       | Sakļaut dublētās normalizētās rindas                                                |
| `rules.truncateLineAt`     | nē       | Unicode drošs rakstzīmju ierobežojums katrai rindai                                 |
| `rules.maxLines`           | nē       | Maksimālais saglabāto rindu skaits pirms beigu daļas saglabāšanas                   |
| `rules.headLines`          | nē       | Saīsināšanas laikā saglabātās sākuma rindas                                         |
| `rules.tailLines`          | nē       | Nesenā konteksta saglabāšanai paredzētās beigu rindas                               |
| `rules.onEmpty`            | nē       | Rezerves ziņojums, ja filtrēšana noņem visu saturu                                  |
| `rules.filterStderr`       | nē       | Pirms turpmākajiem filtrēšanas posmiem normalizēt bieži sastopamus stderr prefiksus |
| `preserve.errorPatterns`   | nē       | Kļūdu rindas, kurām jāsaglabājas pēc saīsināšanas                                   |
| `preserve.summaryPatterns` | nē       | Kopsavilkuma rindas, kurām jāsaglabājas pēc saīsināšanas                            |
| `tests[]`                  | nē       | Iekļauti pārbaudes paraugi, ko izmanto RTK verifikācijas vārteja                    |

RTK lieto deklaratīvos posmus šādā secībā: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` un `onEmpty`.

Pielāgotus filtrus var ielādēt no:

1. Projekta `.rtk/filters.json` failiem tikai pēc tam, kad ir pieejams atbilstošs `.rtk/trust.json` jaucējkods, vai arī
   ir iespējots `trustProjectFilters`.
2. Globālā `DATA_DIR/rtk/filters.json`.
3. Iebūvētajiem filtriem.

Projekta/globālajos pielāgotajos failos var būt viens filtra objekts vai filtru objektu masīvs. Nederīgi
pielāgotie filtri tiek izlaisti, parādot diagnostiku; nederīgi iebūvētie filtri izraisa validācijas kļūmi.

Projekta uzticamības fails:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Vides ignorēšanas iestatījums `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` ļauj uzticēties projekta filtriem bez
jaucējkoda, un tā lietošana jāierobežo ar kontrolētu lokālo izstrādes vidi.

## Drošības noteikumi

- Nodrošiniet noteikumu idempotenci: viena un tā paša filtra atkārtota palaišana nedrīkst sabojāt izvadi.
- Ja iespējams, precīzi saglabājiet kļūdu tekstu, failu ceļus, rindu numurus un komandu kopsavilkumus.
- Izvairieties no noteikumiem, kas pārveido koda blokus, JSON derīgslodzes, URL vai noslēpumus.
- Pievienojiet vienībtestus jaunām komandu saimēm detektoru/filtru testos.
- Pievienojiet `tests[]` paraugus katram iebūvētajam filtram un koplietotajiem pielāgotajiem filtriem.

## Validācija

Noteikumu pakotnes tiek validētas pirms lietošanas. Iebūvētās Caveman pakotnes un iebūvētie RTK filtri validācijas laikā nekavējoties ziņo par kļūdu, lai bojāti laidiena resursi tiktu atklāti pirms piegādes. Pielāgotie RTK filtri tiek izlaisti, pievienojot diagnostikas informāciju, ja parsēšana vai uzticamības validācija neizdodas.

Mērķēta validācija:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
