# Compression Rules Format (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Komprimeringsregler er JSON-filer som lastes inn under kjøring. De inneholder bevisst bare data, slik at nye
språkpakker og RTK-kommandofiltre kan gjennomgås uten å endre motorkoden.

> **Kanonisk skjema (fasit):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema-utkast 2020-12).
> Eksemplene nedenfor er kun illustrerende — hvis du er i tvil, valider pakken mot `_schema.json`.

## Caveman-regelpakker

Caveman-regelpakker ligger under:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Hver pakke inneholder erstatninger som brukes på vanlig prosa etter at beskyttede områder er isolert.

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

| Felt                     | Påkrevd | Beskrivelse                                                              |
| ------------------------ | ------- | ------------------------------------------------------------------------ |
| `language`               | ja      | BCP-47-lignende språknøkkel, for eksempel `en`, `pt-BR`, `es`            |
| `category`               | ja      | Filnavn/kategori for pakken, for eksempel `filler` eller `dedup`         |
| `rules`                  | ja      | Liste over regler for regex-erstatning                                   |
| `rules[].name`           | ja      | Stabilt regelnavn                                                        |
| `rules[].pattern`        | ja      | JavaScript-regexkilde                                                    |
| `rules[].flags`          | nei     | JavaScript-regexflagg; standardverdi `gi`                                |
| `rules[].replacement`    | nei     | Erstatningsstreng eller reserveverdi når `replacementMap` ikke har treff |
| `rules[].replacementMap` | nei     | Treffspesifikke erstatninger med normalisert trefftekst som nøkkel       |
| `rules[].context`        | nei     | `all`, `user`, `assistant` eller `system`; standardverdi `all`           |
| `rules[].category`       | nei     | `filler`, `context`, `structural`, `dedup`, `terse` eller `ultra`        |
| `rules[].minIntensity`   | nei     | `lite`, `full` eller `ultra`; standardverdi `lite`                       |
| `rules[].description`    | nei     | Menneskelesbart sammendrag av regelen                                    |

Bruk `flags` når det er viktig å skille mellom store og små bokstaver, for eksempel ved fjerning av artikler før prosa med små bokstaver
uten å fjerne `the OpenAI API`. Bruk `replacementMap` når ett regulært uttrykk har flere alternativer
som trenger forskjellige resultater. Dette gjør at JSON-regelpakkene fortsatt bare inneholder data, samtidig som atferden til
de mer avanserte innebygde TypeScript-erstatningsfunksjonene bevares.

## RTK-filterpakker

RTK-filtre ligger under:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Hvert filter beskriver hvordan en familie av kommandoresultater skal gjenkjennes og komprimeres.

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

| Felt                       | Påkrevd | Beskrivelse                                                                    |
| -------------------------- | ------- | ------------------------------------------------------------------------------ |
| `id`                       | ja      | Stabil filter-ID                                                               |
| `label`                    | ja      | Navn som kan leses i kontrollpanelet                                           |
| `category`                 | ja      | Filterfamilie: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | nei     | Høyere prioritet vinner når flere filtre samsvarer                             |
| `match.outputTypes`        | nei     | Detektorens resultat-ID-er som velger dette filteret                           |
| `match.commands`           | nei     | Kommandotegn som velger dette filteret                                         |
| `match.patterns`           | nei     | Regulære uttrykk som velger dette filteret fra resultateksten                  |
| `rules.stripAnsi`          | nei     | Fjern ANSI-kontrollsekvenser før trinnene med regulære uttrykk                 |
| `rules.replace`            | nei     | Ordnede erstatninger med regulære uttrykk som brukes linje for linje           |
| `rules.matchOutput`        | nei     | Regler for direkte resultat med valgfri `unless`-betingelse                    |
| `rules.includePatterns`    | nei     | Linjer som fortrinnsvis skal bevares                                           |
| `rules.dropPatterns`       | nei     | Linjer som skal fjernes som støy                                               |
| `rules.collapsePatterns`   | nei     | Gjentatte samsvarende linjer som kan slås sammen                               |
| `rules.deduplicate`        | nei     | Slå sammen dupliserte normaliserte linjer                                      |
| `rules.truncateLineAt`     | nei     | Unicode-sikker tegngrense per linje                                            |
| `rules.maxLines`           | nei     | Maksimalt antall bevarte linjer før bevaring av avslutningen                   |
| `rules.headLines`          | nei     | Innledende linjer som beholdes under avkorting                                 |
| `rules.tailLines`          | nei     | Avsluttende linjer som beholdes for nylig kontekst                             |
| `rules.onEmpty`            | nei     | Reservemelding når filtreringen fjerner alt innhold                            |
| `rules.filterStderr`       | nei     | Normaliser vanlige stderr-prefikser før senere filtreringstrinn                |
| `preserve.errorPatterns`   | nei     | Feillinjer som skal overleve avkorting                                         |
| `preserve.summaryPatterns` | nei     | Oppsummeringslinjer som skal overleve avkorting                                |
| `tests[]`                  | nei     | Innebygde verifiseringseksempler som brukes av RTK-verifiseringsporten         |

RTK bruker deklarative trinn i denne rekkefølgen: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` og `onEmpty`.

Egendefinerte filtre kan lastes fra:

1. Prosjektets `.rtk/filters.json`-filer, men bare etter at en samsvarende `.rtk/trust.json`-hash finnes, eller
   `trustProjectFilters` er aktivert.
2. Global `DATA_DIR/rtk/filters.json`.
3. Innebygde filtre.

Egendefinerte prosjektfiler og globale filer kan inneholde ett filterobjekt eller en matrise med filterobjekter. Ugyldige
egendefinerte filtre hoppes over med diagnostikk; ugyldige innebygde filtre gjør at valideringen mislykkes.

Prosjektets klareringsfil:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Miljøoverstyringen `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` klarerer prosjektfiltre uten en
hash og bør begrenses til kontrollert lokal utvikling.

## Sikkerhetsregler

- Sørg for at reglene er idempotente: Kjøring av det samme filteret to ganger skal ikke ødelegge utdataene.
- Bevar eksakt feiltekst, filbaner, linjenumre og kommandooppsummeringer der det er mulig.
- Unngå regler som endrer kodeblokker, JSON-nyttelaster, URL-er eller hemmeligheter.
- Legg til enhetstestdekning for nye kommandofamilier i detektor-/filtertestene.
- Legg til `tests[]`-eksempler i hvert innebygde filter og i delte egendefinerte filtre.

## Validering

Regelpakker valideres før bruk. Innebygde Caveman-pakker og innebygde RTK-filtre feiler umiddelbart
under validering, slik at defekte utgivelsesressurser oppdages før levering. Egendefinerte RTK-filtre
hoppes over med diagnostikk når parsing eller klareringsvalidering mislykkes.

Målrettet validering:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
