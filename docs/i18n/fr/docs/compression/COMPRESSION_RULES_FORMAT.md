# Compression Rules Format (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Les règles de compression sont des fichiers JSON chargés lors de l’exécution. Elles sont intentionnellement limitées aux données afin que les nouveaux
packs linguistiques et filtres de commandes RTK puissent être révisés sans modifier le code du moteur.

> **Schéma canonique (source de vérité) :** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> Les exemples ci-dessous sont fournis à titre indicatif — en cas de doute, validez votre pack par rapport à `_schema.json`.

## Packs de règles Caveman

Les packs de règles Caveman se trouvent sous :

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Chaque pack contient des remplacements qui s’appliquent au texte normal après l’isolation des régions protégées.

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

### Champs Caveman

| Champ                    | Obligatoire | Description                                                                                          |
| ------------------------ | ----------- | ---------------------------------------------------------------------------------------------------- |
| `language`               | oui         | Clé de langue de type BCP-47, telle que `en`, `pt-BR`, `es`                                          |
| `category`               | oui         | Nom de fichier/catégorie du pack, par exemple `filler` ou `dedup`                                    |
| `rules`                  | oui         | Tableau de règles de remplacement par expression régulière                                           |
| `rules[].name`           | oui         | Nom de règle stable                                                                                  |
| `rules[].pattern`        | oui         | Source de l’expression régulière JavaScript                                                          |
| `rules[].flags`          | non         | Indicateurs d’expression régulière JavaScript ; valeur par défaut : `gi`                             |
| `rules[].replacement`    | non         | Chaîne de remplacement ou valeur de repli lorsque `replacementMap` ne contient aucune correspondance |
| `rules[].replacementMap` | non         | Remplacements propres à chaque correspondance, indexés par le texte correspondant normalisé          |
| `rules[].context`        | non         | `all`, `user`, `assistant` ou `system` ; valeur par défaut : `all`                                   |
| `rules[].category`       | non         | `filler`, `context`, `structural`, `dedup`, `terse` ou `ultra`                                       |
| `rules[].minIntensity`   | non         | `lite`, `full` ou `ultra` ; valeur par défaut : `lite`                                               |
| `rules[].description`    | non         | Résumé de la règle lisible par l’utilisateur                                                         |

Utilisez `flags` lorsque la distinction entre majuscules et minuscules est importante, par exemple pour supprimer un article avant du texte en minuscules
sans supprimer `the OpenAI API`. Utilisez `replacementMap` lorsqu’une expression régulière comporte plusieurs alternatives
nécessitant des résultats différents ; cela permet de conserver des packs de règles JSON limités aux données tout en préservant le comportement
des fonctions de remplacement TypeScript intégrées plus élaborées.

## Packs de filtres RTK

Les filtres RTK se trouvent sous :

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Chaque filtre décrit comment reconnaître et compresser une famille de sorties de commande.

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

### Champs RTK

| Champ                      | Obligatoire | Description                                                                           |
| -------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `id`                       | oui         | Identifiant stable du filtre                                                          |
| `label`                    | oui         | Nom lisible dans le tableau de bord                                                   |
| `category`                 | oui         | Famille de filtres : git, test, build, shell, docker, package, infra, cloud, generic  |
| `priority`                 | non         | La priorité la plus élevée l’emporte lorsque plusieurs filtres correspondent          |
| `match.outputTypes`        | non         | Identifiants de sortie du détecteur qui sélectionnent ce filtre                       |
| `match.commands`           | non         | Jetons de commande qui sélectionnent ce filtre                                        |
| `match.patterns`           | non         | Motifs d’expression régulière qui sélectionnent ce filtre à partir du texte de sortie |
| `rules.stripAnsi`          | non         | Supprime les séquences d’échappement ANSI avant les étapes d’expressions régulières   |
| `rules.replace`            | non         | Substitutions ordonnées par expressions régulières, appliquées ligne par ligne        |
| `rules.matchOutput`        | non         | Règles de sortie avec arrêt anticipé et garde `unless` facultative                    |
| `rules.includePatterns`    | non         | Lignes à conserver de préférence                                                      |
| `rules.dropPatterns`       | non         | Lignes à supprimer en tant que bruit                                                  |
| `rules.collapsePatterns`   | non         | Lignes correspondantes répétées pouvant être regroupées                               |
| `rules.deduplicate`        | non         | Regroupe les lignes normalisées en double                                             |
| `rules.truncateLineAt`     | non         | Limite de caractères par ligne compatible avec Unicode                                |
| `rules.maxLines`           | non         | Nombre maximal de lignes conservées avant la préservation de la fin                   |
| `rules.headLines`          | non         | Lignes de début conservées lors de la troncature                                      |
| `rules.tailLines`          | non         | Lignes de fin conservées pour préserver le contexte récent                            |
| `rules.onEmpty`            | non         | Message de remplacement lorsque le filtrage supprime tout le contenu                  |
| `rules.filterStderr`       | non         | Normalise les préfixes stderr courants avant les étapes de filtrage suivantes         |
| `preserve.errorPatterns`   | non         | Lignes d’erreur qui doivent être conservées lors de la troncature                     |
| `preserve.summaryPatterns` | non         | Lignes de résumé qui doivent être conservées lors de la troncature                    |
| `tests[]`                  | non         | Exemples de vérification intégrés utilisés par la porte de vérification RTK           |

RTK applique les étapes déclaratives dans cet ordre : `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` et `onEmpty`.

Les filtres personnalisés peuvent être chargés depuis :

1. Les fichiers de projet `.rtk/filters.json`, uniquement après la présence d’un hachage correspondant dans `.rtk/trust.json` ou
   si `trustProjectFilters` est activé.
2. Le fichier global `DATA_DIR/rtk/filters.json`.
3. Les filtres intégrés.

Les fichiers personnalisés du projet ou globaux peuvent contenir un objet de filtre ou un tableau d’objets de filtre. Les filtres
personnalisés non valides sont ignorés avec des diagnostics ; les filtres intégrés non valides font échouer la validation.

Fichier d’approbation du projet :

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

La substitution par variable d’environnement `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` approuve les filtres du projet sans
hachage et doit être limitée à un environnement de développement local contrôlé.

## Règles de sécurité

- Veillez à ce que les règles soient idempotentes : l’exécution répétée du même filtre ne doit pas altérer la sortie.
- Préservez autant que possible le texte exact des erreurs, les chemins de fichiers, les numéros de ligne et les résumés de commandes.
- Évitez les règles qui modifient les blocs de code, les charges utiles JSON, les URL ou les secrets.
- Ajoutez une couverture unitaire pour les nouvelles familles de commandes dans les tests des détecteurs et des filtres.
- Ajoutez des exemples `tests[]` à chaque filtre intégré ainsi qu’aux filtres personnalisés partagés.

## Validation

Les ensembles de règles sont validés avant utilisation. Les ensembles Caveman intégrés et les filtres RTK intégrés échouent immédiatement lors de la validation afin que les ressources de version défectueuses soient détectées avant leur publication. Les filtres RTK personnalisés sont ignorés, avec des diagnostics, lorsque l’analyse syntaxique ou la validation de confiance échoue.

Validation ciblée :

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
