# Compression Rules Format (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Pravila kompresije su JSON datoteke koje se učitavaju tijekom izvođenja. Namjerno sadrže samo podatke kako bi se novi jezični paketi i filtri RTK naredbi mogli pregledavati bez izmjene koda mehanizma.

> **Kanonska shema (izvor istine):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema, nacrt 2020-12).
> Primjeri u nastavku služe kao ilustracija — ako niste sigurni, provjerite svoj paket prema `_schema.json`.

## Paketi Caveman pravila

Paketi Caveman pravila nalaze se u:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Svaki paket sadrži zamjene koje se primjenjuju na običnu prozu nakon izdvajanja zaštićenih područja.

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

### Polja Caveman pravila

| Polje                    | Obavezno | Opis                                                                             |
| ------------------------ | -------- | -------------------------------------------------------------------------------- |
| `language`               | da       | Jezični ključ nalik BCP-47, kao što je `en`, `pt-BR` ili `es`                    |
| `category`               | da       | Naziv datoteke/kategorija paketa, primjerice `filler` ili `dedup`                |
| `rules`                  | da       | Polje pravila za zamjenu regularnim izrazima                                     |
| `rules[].name`           | da       | Stabilan naziv pravila                                                           |
| `rules[].pattern`        | da       | Izvor JavaScript regularnog izraza                                               |
| `rules[].flags`          | ne       | Oznake JavaScript regularnog izraza; zadano `gi`                                 |
| `rules[].replacement`    | ne       | Zamjenski niz ili pričuvna vrijednost kada `replacementMap` nema podudaranje     |
| `rules[].replacementMap` | ne       | Zamjene specifične za podudaranje, indeksirane normaliziranim podudarnim tekstom |
| `rules[].context`        | ne       | `all`, `user`, `assistant` ili `system`; zadano `all`                            |
| `rules[].category`       | ne       | `filler`, `context`, `structural`, `dedup`, `terse` ili `ultra`                  |
| `rules[].minIntensity`   | ne       | `lite`, `full` ili `ultra`; zadano `lite`                                        |
| `rules[].description`    | ne       | Ljudima čitljiv sažetak pravila                                                  |

Upotrijebite `flags` kada je važna osjetljivost na velika i mala slova, primjerice pri uklanjanju članova ispred proze pisane malim slovima, bez uklanjanja člana iz izraza `the OpenAI API`. Upotrijebite `replacementMap` kada jedan regularni izraz ima više alternativa koje zahtijevaju različite izlaze; time JSON paketi pravila ostaju ograničeni samo na podatke, uz očuvanje ponašanja bogatijih ugrađenih TypeScript funkcija za zamjenu.

## Paketi RTK filtara

RTK filtri nalaze se u:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Svaki filtar opisuje kako prepoznati i komprimirati skupinu izlaza naredbe.

```json
{
  "id": "test-vitest",
  "label": "Izlaz alata Vitest",
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
        "message": "vitest: u redu",
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
    "onEmpty": "vitest: u redu",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "zadržava neuspjele testove",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK polja

| Polje                      | Obavezno | Opis                                                                                         |
| -------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `id`                       | da       | Stabilni identifikator filtra                                                                |
| `label`                    | da       | Naziv čitljiv na nadzornoj ploči                                                             |
| `category`                 | da       | Skupina filtra: git, test, build, shell, docker, package, infra, cloud, generic              |
| `priority`                 | ne       | Viši prioritet pobjeđuje kada se podudara više filtara                                       |
| `match.outputTypes`        | ne       | Identifikatori izlaza detektora koji odabiru ovaj filtar                                     |
| `match.commands`           | ne       | Tokeni naredbi koji odabiru ovaj filtar                                                      |
| `match.patterns`           | ne       | Regex obrasci koji odabiru ovaj filtar na temelju izlaznog teksta                            |
| `rules.stripAnsi`          | ne       | Uklanja ANSI izlazne sekvence prije faza s regularnim izrazima                               |
| `rules.replace`            | ne       | Uređene regex zamjene koje se primjenjuju redak po redak                                     |
| `rules.matchOutput`        | ne       | Pravila izlaza za rani prekid s neobaveznim uvjetom `unless`                                 |
| `rules.includePatterns`    | ne       | Retci čije očuvanje treba biti poželjnije                                                    |
| `rules.dropPatterns`       | ne       | Retci koje treba ukloniti kao šum                                                            |
| `rules.collapsePatterns`   | ne       | Ponavljajući podudarni retci koji se mogu sažeti                                             |
| `rules.deduplicate`        | ne       | Sažima duplicirane normalizirane retke                                                       |
| `rules.truncateLineAt`     | ne       | Ograničenje broja znakova po retku koje sigurno podržava Unicode                             |
| `rules.maxLines`           | ne       | Najveći broj zadržanih redaka prije očuvanja završnog dijela                                 |
| `rules.headLines`          | ne       | Početni retci koji se zadržavaju tijekom skraćivanja                                         |
| `rules.tailLines`          | ne       | Završni retci koji se zadržavaju radi nedavnog konteksta                                     |
| `rules.onEmpty`            | ne       | Rezervna poruka kada filtriranje ukloni sav sadržaj                                          |
| `rules.filterStderr`       | ne       | Normalizira uobičajene prefikse standardnog izlaza pogrešaka prije kasnijih faza filtriranja |
| `preserve.errorPatterns`   | ne       | Retci s pogreškama koji trebaju preživjeti skraćivanje                                       |
| `preserve.summaryPatterns` | ne       | Retci sa sažetkom koji trebaju preživjeti skraćivanje                                        |
| `tests[]`                  | ne       | Ugrađeni uzorci za provjeru koje upotrebljava RTK kontrola provjere                          |

RTK primjenjuje deklarativne faze ovim redoslijedom: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` i `onEmpty`.

Prilagođeni filtri mogu se učitati iz:

1. Projektnih datoteka `.rtk/filters.json` tek nakon što postoji odgovarajući hash u datoteci `.rtk/trust.json` ili
   je omogućen `trustProjectFilters`.
2. Globalne datoteke `DATA_DIR/rtk/filters.json`.
3. Ugrađenih filtara.

Projektne/globalne prilagođene datoteke mogu sadržavati jedan objekt filtra ili niz objekata filtara. Nevaljani
prilagođeni filtri preskaču se uz dijagnostičke poruke; nevaljani ugrađeni filtri uzrokuju neuspjeh provjere valjanosti.

Projektna datoteka pouzdanosti:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Nadjačavanje putem varijable okruženja `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` označava projektne filtre pouzdanima bez
hasha i treba biti ograničeno na kontrolirani lokalni razvoj.

## Sigurnosna pravila

- Pravila moraju biti idempotentna: dvostruko pokretanje istog filtra ne smije oštetiti izlaz.
- Gdje je moguće, sačuvajte točan tekst pogreške, putanje datoteka, brojeve redaka i sažetke naredbi.
- Izbjegavajte pravila koja mijenjaju blokove koda, JSON sadržaje, URL-ove ili tajne podatke.
- Dodajte pokrivenost jediničnim testovima za nove skupine naredbi u testovima detektora/filtra.
- Dodajte primjere `tests[]` svakom ugrađenom filtru i dijeljenim prilagođenim filtrima.

## Provjera valjanosti

Paketi pravila provjeravaju se prije uporabe. Ugrađeni Caveman paketi i ugrađeni RTK filtri odmah prijavljuju neuspjeh
tijekom provjere valjanosti kako bi se neispravni resursi izdanja otkrili prije isporuke. Prilagođeni RTK filtri
preskaču se uz dijagnostičke poruke kada raščlanjivanje ili provjera pouzdanosti ne uspije.

Ciljana provjera valjanosti:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
