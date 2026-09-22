# Compression Rules Format (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Komprimeringsregler er JSON-filer, der indlæses under kørsel. De indeholder bevidst kun data, så nye
sprogpakker og RTK-kommandofiltre kan gennemgås uden at ændre motorkoden.

> **Kanonisk skema (autoritativ kilde):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema-udkast 2020-12).
> Eksemplerne nedenfor er illustrative — hvis du er i tvivl, skal du validere din pakke mod `_schema.json`.

## Caveman-regelpakker

Caveman-regelpakker findes under:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Hver pakke indeholder erstatninger, der anvendes på almindelig prosa, efter at beskyttede områder er blevet isoleret.

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

### Caveman-felter

| Felt                     | Påkrævet | Beskrivelse                                                                  |
| ------------------------ | -------- | ---------------------------------------------------------------------------- |
| `language`               | ja       | BCP-47-lignende sprognøgle såsom `en`, `pt-BR`, `es`                         |
| `category`               | ja       | Pakkens kategorifilnavn/-kategori, f.eks. `filler` eller `dedup`             |
| `rules`                  | ja       | Array med regler for erstatning via regulære udtryk                          |
| `rules[].name`           | ja       | Stabilt regelnavn                                                            |
| `rules[].pattern`        | ja       | JavaScript-kilde til regulært udtryk                                         |
| `rules[].flags`          | nej      | JavaScript-flag til regulære udtryk; standard er `gi`                        |
| `rules[].replacement`    | nej      | Erstatningsstreng eller reserveværdi, når `replacementMap` ikke har et match |
| `rules[].replacementMap` | nej      | Matchspecifikke erstatninger med normaliseret matchet tekst som nøgle        |
| `rules[].context`        | nej      | `all`, `user`, `assistant` eller `system`; standard er `all`                 |
| `rules[].category`       | nej      | `filler`, `context`, `structural`, `dedup`, `terse` eller `ultra`            |
| `rules[].minIntensity`   | nej      | `lite`, `full` eller `ultra`; standard er `lite`                             |
| `rules[].description`    | nej      | Læsevenligt resumé af reglen                                                 |

Brug `flags`, når der er behov for forskel på store og små bogstaver, f.eks. ved fjernelse af artikler før prosa med små bogstaver
uden at fjerne `the OpenAI API`. Brug `replacementMap`, når ét regulært udtryk har flere alternativer,
der kræver forskellige output; dette sikrer, at JSON-regelpakkerne kun indeholder data, samtidig med at funktionaliteten i
de mere avancerede indbyggede TypeScript-erstatningsfunktioner bevares.

## RTK-filterpakker

RTK-filtre findes under:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Hvert filter beskriver, hvordan en familie af kommandooutput genkendes og komprimeres.

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

### RTK-felter

| Felt                       | Påkrævet | Beskrivelse                                                                    |
| -------------------------- | -------- | ------------------------------------------------------------------------------ |
| `id`                       | ja       | Stabil filter-id                                                               |
| `label`                    | ja       | Navn, der kan læses i kontrolpanelet                                           |
| `category`                 | ja       | Filterfamilie: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | nej      | Højere prioritet vinder, når flere filtre matcher                              |
| `match.outputTypes`        | nej      | Detektoroutput-id'er, der vælger dette filter                                  |
| `match.commands`           | nej      | Kommandotokens, der vælger dette filter                                        |
| `match.patterns`           | nej      | Regex-mønstre, der vælger dette filter ud fra outputteksten                    |
| `rules.stripAnsi`          | nej      | Fjern ANSI-escape-sekvenser før regex-trinnene                                 |
| `rules.replace`            | nej      | Ordnede regex-erstatninger, der anvendes linje for linje                       |
| `rules.matchOutput`        | nej      | Outputregler, der afbryder tidligt, med valgfri `unless`-betingelse            |
| `rules.includePatterns`    | nej      | Linjer, der fortrinsvis skal bevares                                           |
| `rules.dropPatterns`       | nej      | Linjer, der skal fjernes som støj                                              |
| `rules.collapsePatterns`   | nej      | Gentagne matchende linjer, der kan slås sammen                                 |
| `rules.deduplicate`        | nej      | Slå identiske normaliserede linjer sammen                                      |
| `rules.truncateLineAt`     | nej      | Unicode-sikker tegngrænse pr. linje                                            |
| `rules.maxLines`           | nej      | Maksimalt antal bevarede linjer før bevarelse af slutningen                    |
| `rules.headLines`          | nej      | Indledende linjer, der bevares under afkortning                                |
| `rules.tailLines`          | nej      | Afsluttende linjer, der bevares som nylig kontekst                             |
| `rules.onEmpty`            | nej      | Reservemeddelelse, når filtrering fjerner alt indhold                          |
| `rules.filterStderr`       | nej      | Normaliser almindelige stderr-præfikser før senere filtreringstrin             |
| `preserve.errorPatterns`   | nej      | Fejllinjer, der skal bevares ved afkortning                                    |
| `preserve.summaryPatterns` | nej      | Opsummeringslinjer, der skal bevares ved afkortning                            |
| `tests[]`                  | nej      | Indlejrede verifikationseksempler, der bruges af RTK-verifikationskontrollen   |

RTK anvender deklarative trin i denne rækkefølge: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` og `onEmpty`.

Tilpassede filtre kan indlæses fra:

1. Projektets `.rtk/filters.json`-filer, men kun efter at en matchende `.rtk/trust.json`-hash er til stede, eller
   `trustProjectFilters` er aktiveret.
2. Global `DATA_DIR/rtk/filters.json`.
3. Indbyggede filtre.

Tilpassede projektfiler/globale filer kan indeholde ét filterobjekt eller et array af filterobjekter. Ugyldige
tilpassede filtre springes over med diagnosticeringsmeddelelser; ugyldige indbyggede filtre får valideringen til at mislykkes.

Projektets tillidsfil:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Miljøtilsidesættelsen `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` markerer projektfiltre som pålidelige uden en
hash og bør begrænses til kontrolleret lokal udvikling.

## Sikkerhedsregler

- Sørg for, at regler er idempotente: Hvis det samme filter køres to gange, må det ikke beskadige outputtet.
- Bevar så vidt muligt den nøjagtige fejltekst, filstier, linjenumre og kommandosammendrag.
- Undgå regler, der ændrer kodeblokke, JSON-data, URL'er eller hemmeligheder.
- Tilføj enhedstestdækning for nye kommandofamilier i detektor-/filtertest.
- Tilføj `tests[]`-eksempler til hvert indbygget filter og til delte brugerdefinerede filtre.

## Validering

Regelpakker valideres før brug. Indbyggede Caveman-pakker og indbyggede RTK-filtre stopper straks med en fejl
under valideringen, så defekte udgivelsesartefakter opdages før levering. Brugerdefinerede RTK-filtre
springes over med diagnosticeringsmeddelelser, når parsing eller tillidsvalidering mislykkes.

Målrettet validering:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
