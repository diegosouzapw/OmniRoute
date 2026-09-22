# Compression Rules Format (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Le regole di compressione sono file JSON caricati in fase di esecuzione. Sono intenzionalmente composte esclusivamente da dati, affinché i nuovi
pacchetti linguistici e i filtri dei comandi RTK possano essere esaminati senza modificare il codice del motore.

> **Schema canonico (fonte di verità):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> Gli esempi seguenti sono illustrativi: in caso di dubbi, convalida il tuo pacchetto rispetto a `_schema.json`.

## Pacchetti di regole Caveman

I pacchetti di regole Caveman si trovano in:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Ogni pacchetto contiene sostituzioni che si applicano al testo normale dopo che le aree protette sono state isolate.

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

### Campi Caveman

| Campo                    | Obbligatorio | Descrizione                                                                                          |
| ------------------------ | ------------ | ---------------------------------------------------------------------------------------------------- |
| `language`               | sì           | Chiave di lingua simile a BCP-47, come `en`, `pt-BR`, `es`                                           |
| `category`               | sì           | Nome file/categoria del pacchetto, ad esempio `filler` o `dedup`                                     |
| `rules`                  | sì           | Array di regole di sostituzione con espressioni regolari                                             |
| `rules[].name`           | sì           | Nome stabile della regola                                                                            |
| `rules[].pattern`        | sì           | Sorgente dell'espressione regolare JavaScript                                                        |
| `rules[].flags`          | no           | Flag delle espressioni regolari JavaScript; valore predefinito `gi`                                  |
| `rules[].replacement`    | no           | Stringa sostitutiva o valore di ripiego quando `replacementMap` non trova corrispondenze             |
| `rules[].replacementMap` | no           | Sostituzioni specifiche per corrispondenza, indicizzate in base al testo corrispondente normalizzato |
| `rules[].context`        | no           | `all`, `user`, `assistant` o `system`; valore predefinito `all`                                      |
| `rules[].category`       | no           | `filler`, `context`, `structural`, `dedup`, `terse` o `ultra`                                        |
| `rules[].minIntensity`   | no           | `lite`, `full` o `ultra`; valore predefinito `lite`                                                  |
| `rules[].description`    | no           | Riepilogo della regola leggibile da una persona                                                      |

Usa `flags` quando è importante distinguere tra maiuscole e minuscole, ad esempio per rimuovere un articolo prima di testo in minuscolo
senza eliminare `the OpenAI API`. Usa `replacementMap` quando una singola espressione regolare presenta più alternative
che richiedono risultati diversi; in questo modo i pacchetti di regole JSON rimangono composti esclusivamente da dati, preservando al contempo il comportamento
delle più sofisticate funzioni di sostituzione TypeScript integrate.

## Pacchetti di filtri RTK

I filtri RTK si trovano in:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Ogni filtro descrive come riconoscere e comprimere una famiglia di output di comandi.

```json
{
  "id": "test-vitest",
  "label": "Output di Vitest",
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
      "name": "mantiene i test non riusciti",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### Campi RTK

| Campo                      | Obbligatorio | Descrizione                                                                          |
| -------------------------- | ------------ | ------------------------------------------------------------------------------------ |
| `id`                       | sì           | ID stabile del filtro                                                                |
| `label`                    | sì           | Nome leggibile nella dashboard                                                       |
| `category`                 | sì           | Famiglia del filtro: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | no           | La priorità più alta prevale quando più filtri corrispondono                         |
| `match.outputTypes`        | no           | ID di output del rilevatore che selezionano questo filtro                            |
| `match.commands`           | no           | Token dei comandi che selezionano questo filtro                                      |
| `match.patterns`           | no           | Pattern regex che selezionano questo filtro dal testo dell'output                    |
| `rules.stripAnsi`          | no           | Rimuove le sequenze di escape ANSI prima delle fasi regex                            |
| `rules.replace`            | no           | Sostituzioni regex ordinate applicate riga per riga                                  |
| `rules.matchOutput`        | no           | Regole di output con interruzione anticipata e condizione facoltativa `unless`       |
| `rules.includePatterns`    | no           | Righe da preservare preferibilmente                                                  |
| `rules.dropPatterns`       | no           | Righe da rimuovere in quanto rumore                                                  |
| `rules.collapsePatterns`   | no           | Righe corrispondenti ripetute che possono essere compattate                          |
| `rules.deduplicate`        | no           | Compatta le righe normalizzate duplicate                                             |
| `rules.truncateLineAt`     | no           | Limite di caratteri per riga compatibile con Unicode                                 |
| `rules.maxLines`           | no           | Numero massimo di righe mantenute prima della conservazione della parte finale       |
| `rules.headLines`          | no           | Righe iniziali mantenute durante il troncamento                                      |
| `rules.tailLines`          | no           | Righe finali mantenute per conservare il contesto recente                            |
| `rules.onEmpty`            | no           | Messaggio di ripiego quando il filtraggio rimuove tutto il contenuto                 |
| `rules.filterStderr`       | no           | Normalizza i prefissi stderr comuni prima delle successive fasi di filtraggio        |
| `preserve.errorPatterns`   | no           | Righe di errore che devono sopravvivere al troncamento                               |
| `preserve.summaryPatterns` | no           | Righe di riepilogo che devono sopravvivere al troncamento                            |
| `tests[]`                  | no           | Esempi di verifica incorporati usati dal controllo di verifica RTK                   |

RTK applica le fasi dichiarative in questo ordine: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` e `onEmpty`.

I filtri personalizzati possono essere caricati da:

1. File di progetto `.rtk/filters.json`, solo dopo che è presente un hash corrispondente in `.rtk/trust.json` oppure
   quando `trustProjectFilters` è abilitato.
2. File globale `DATA_DIR/rtk/filters.json`.
3. Filtri integrati.

I file personalizzati di progetto/globali possono contenere un singolo oggetto filtro oppure un array di oggetti filtro. I filtri
personalizzati non validi vengono ignorati con informazioni diagnostiche; i filtri integrati non validi causano il fallimento della convalida.

File di attendibilità del progetto:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

La variabile d'ambiente di override `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` considera attendibili i filtri di progetto senza un
hash e dovrebbe essere limitata allo sviluppo locale in ambienti controllati.

## Regole di sicurezza

- Mantieni le regole idempotenti: eseguire due volte lo stesso filtro non deve danneggiare l'output.
- Conserva, ove possibile, il testo esatto degli errori, i percorsi dei file, i numeri di riga e i riepiloghi dei comandi.
- Evita regole che modifichino blocchi di codice, payload JSON, URL o segreti.
- Aggiungi la copertura dei test unitari per le nuove famiglie di comandi nei test del rilevatore/filtro.
- Aggiungi campioni `tests[]` a ogni filtro integrato e ai filtri personalizzati condivisi.

## Validazione

I pacchetti di regole vengono validati prima dell'uso. I pacchetti Caveman integrati e i filtri RTK integrati generano immediatamente un errore
durante la validazione, così da rilevare le risorse di rilascio non valide prima della distribuzione. I filtri RTK personalizzati vengono
ignorati con informazioni diagnostiche quando l'analisi o la validazione dell'attendibilità non riesce.

Validazione mirata:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
