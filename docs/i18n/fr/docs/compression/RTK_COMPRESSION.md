# RTK Compression (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

La compression RTK est le moteur de compression d’OmniRoute sensible aux commandes pour les sorties de terminal et d’outils. Elle est conçue pour les sessions d’agents de codage, dans lesquelles l’essentiel de l’augmentation du contexte provient des journaux de tests, des sorties de build, du bruit des gestionnaires de paquets, des transcriptions shell, des sorties Docker, des sorties git et des traces de pile.

RTK peut s’exécuter directement avec `defaultMode: "rtk"` ou comme première étape d’un pipeline empilé, généralement :

```txt
rtk -> caveman
```

Cet ordre compresse d’abord les sorties machine bruyantes, puis permet à Caveman de condenser le texte restant.

Le projet RTK en amont annonce des économies de `60-90%` sur les sorties de commandes. Dans l’exemple de session de son README, le volume passe de `~118,000` jetons standard à `~23,900` jetons RTK, soit une économie de `79.7%` (`~80%`). OmniRoute utilise cette moyenne en amont pour calculer les économies cumulées avec la compression des entrées de Caveman :

```txt
Moyenne RTK :   80% économisés
Entrée Caveman : 46% économisés
Cumulée :       1 - (1 - 0.80) * (1 - 0.46) = 89.2% économisés
Plage :         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Ce qui est compressé

Le catalogue intégré fournit actuellement 49 filtres répartis dans les catégories suivantes :

| Catégorie | Exemples                                                      |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, tests Go, tests Cargo       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, journaux shell génériques               |
| `docker`  | `docker ps`, journaux Docker                                  |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | Sortie JSON, traces de pile, solution de repli générique      |

Le détecteur dans `open-sse/services/compression/engines/rtk/commandDetector.ts` classifie la sortie avant la sélection du filtre. Les filtres peuvent également effectuer une correspondance à partir d’un motif de commande ou d’une expression régulière appliquée à la sortie lorsqu’une classe de commande ne suffit pas.

## Résolution des filtres

RTK charge les filtres dans l’ordre suivant :

1. Filtres du projet provenant de `.rtk/filters.toml` et `.rtk/filters.json`, uniquement lorsqu’ils sont approuvés.
2. Filtres globaux provenant de `DATA_DIR/rtk/filters.toml` et `DATA_DIR/rtk/filters.json`.
3. Filtres intégrés provenant de `open-sse/services/compression/engines/rtk/filters/`.

Au sein d’une même portée, les filtres du schéma TOML v1 de RTK ont priorité sur les filtres JSON d’OmniRoute. Les expressions TOML `match_command` sont vérifiées avant la correspondance par type de commande, afin qu’un filtre importé propre à une commande puisse remplacer un filtre plus général dans cette portée. La portée du projet reste prioritaire sur la portée globale, quel que soit le format de fichier.

Les filtres de projet sont intentionnellement soumis à une vérification de confiance, car les filtres utilisant des expressions régulières peuvent modifier la manière dont les sorties d’outils sont présentées aux agents. Un fichier de filtres de projet est accepté lorsque l’une des conditions suivantes est remplie :

- `rtkConfig.trustProjectFilters` vaut `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` est défini.
- `.rtk/trust.json` contient le hachage SHA-256 correspondant au fichier de filtres du projet.

Exemple de fichier de confiance :

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Les hachages sont distincts : `filtersSha256` approuve `.rtk/filters.json`, tandis que `filtersTomlSha256` approuve `.rtk/filters.toml`. La modification de l’un ou l’autre fichier invalide uniquement son entrée de confiance respective. Les fichiers globaux sont installés par l’administrateur et utilisent le comportement existant de confiance des filtres globaux.

Les filtres personnalisés peuvent être constitués d’un objet de filtre unique ou d’un tableau d’objets de filtre. Les filtres personnalisés non valides sont ignorés et signalés par les diagnostics de `/api/context/rtk/filters`. Les filtres intégrés non valides provoquent un échec immédiat.

## Compatibilité avec le schéma RTK TOML v1

OmniRoute peut analyser, valider, tester et installer des fichiers de filtres déclaratifs utilisant le schéma RTK TOML v1.
Les champs pris en charge sont `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` et les tests intégrés `[[tests.<filter>]]`.
Les champs inconnus, les expressions régulières non valides ou non sûres, l'utilisation simultanée de règles de suppression et de conservation, les fichiers dépassant
1 MiB et les références à des filtres inconnus sont rejetés. Un fichier dont les tests intégrés échouent peut être
validé à des fins d'inspection, mais ne peut pas être installé ni chargé. Les échecs de chargement de fichiers personnalisés restent
non bloquants : le fichier non valide est ignoré et les autres filtres continuent de fonctionner.

OmniRoute reçoit la sortie de l'outil après sa capture par le client ; `filter_stderr = true`
ne peut donc pas modifier la capture du processus. Le champ est accepté sans produire d'effet et la validation renvoie un avertissement.
Cette fonctionnalité est intentionnellement décrite comme une **compatibilité avec le schéma RTK TOML v1**, et non comme une compatibilité complète
avec l'exécutable RTK, les hooks de shell, les implémentations de commandes en Rust ou la structure de son magasin de confiance.

La vue RTK avancée du tableau de bord accepte le contenu TOML collé ou téléversé. La validation est effectuée en lecture seule.
L'installation écrit `DATA_DIR/rtk/filters.toml` de façon atomique avec des permissions restrictives et actualise
le catalogue de filtres actif sans redémarrage. Le remplacement d'un fichier existant nécessite une confirmation explicite via `overwrite`
et crée d'abord `DATA_DIR/rtk/filters.toml.bak`.

## DSL des filtres

Les filtres utilisent le schéma JSON décrit dans [Format des règles de compression](./COMPRESSION_RULES_FORMAT.md).
L'environnement d'exécution applique ces étapes dans l'ordre suivant :

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> suppression/inclusion de lignes
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Champs importants :

| Champ                        | Objectif                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Supprimer les séquences de couleur/contrôle du terminal avant la correspondance |
| `rules.filterStderr`         | Normaliser les préfixes stderr courants avant la correspondance/le filtrage     |
| `rules.replace`              | Appliquer des remplacements ordonnés par expression régulière                   |
| `rules.matchOutput`          | Renvoyer un résumé compact lorsque la sortie correspond à une condition connue  |
| `rules.matchOutput[].unless` | Ignorer le raccourci lorsqu'un motif d'erreur ou d'échec est présent            |
| `rules.dropPatterns`         | Supprimer les lignes parasites                                                  |
| `rules.includePatterns`      | Privilégier les lignes exploitables                                             |
| `rules.collapsePatterns`     | Regrouper les lignes correspondantes répétées                                   |
| `rules.deduplicate`          | Activation par filtre : regrouper les lignes consécutives dupliquées            |
| `rules.truncateLineAt`       | Tronquer chaque ligne en préservant Unicode                                     |
| `rules.onEmpty`              | Message de secours si toutes les lignes sont filtrées                           |
| `tests[]`                    | Exemples intégrés utilisés par le contrôle de vérification                      |

Les filtres intégrés doivent normalement inclure des exemples de test `tests[]`. Les filtres personnalisés devraient également
en inclure, en particulier lorsqu'ils sont partagés entre plusieurs projets.

## Déduplication des lignes (deux niveaux)

RTK regroupe les lignes dupliquées à deux niveaux indépendants :

1. **`deduplicate` par filtre (optionnel, valeur par défaut : `false`).** Un filtre peut définir `rules.deduplicate: true`
   afin de regrouper les lignes dupliquées consécutives _dans la sortie correspondante de ce filtre_, avant la troncature.
   Cette opération s’exécute dans `lineFilter.ts`. Pour les filtres historiques, elle est automatiquement activée lorsque le filtre définit
   `collapsePatterns`. Schéma : `deduplicate: z.boolean().default(false)` dans
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` à l’échelle du moteur (valeur par défaut : `3`).** Une fois tous les filtres exécutés, le moteur regroupe
   toute séquence d’au moins `deduplicateThreshold` lignes consécutives identiques dans l’ensemble du résultat
   (`deduplicateRepeatedLines`, appliqué dans `engines/rtk/index.ts`). La valeur est limitée à l’intervalle 2–100 lors de
   la normalisation.

Le traitement par filtre s’exécute en premier (dans le filtre), tandis que le traitement à l’échelle du moteur s’exécute en dernier (sur la sortie
concaténée) ; les deux peuvent donc être combinés sans double comptage.

## Regroupement des lignes (`enableGrouping`)

Lorsque `rtkConfig.enableGrouping` vaut `true` (valeur par défaut : `false`), RTK exécute un traitement `groupSimilarLines`
supplémentaire sur le résultat après déduplication, lequel regroupe les séquences de lignes consécutives _presque équivalentes_ (et non identiques
octet par octet). `rtkConfig.groupingThreshold` (valeur par défaut : `3`) correspond à la longueur minimale d’une séquence déclenchant
le regroupement. Il s’agit du pendant structurel de `deduplicateThreshold` : la déduplication traite les répétitions exactes,
tandis que le regroupement traite « la même structure avec de petites différences ». Ces deux options font partie du JSON `rtkConfig`
persisté dans la table `key_value` (voir la section Configuration ci-dessus), de sorte que le paramètre est conservé après les redémarrages.

## Suppression des commentaires de code (`stripCodeComments` / `preserveDocstrings`)

Lorsque `rtkConfig.applyToCodeBlocks` est activé, RTK peut également supprimer les commentaires des blocs de code délimités :

- `stripCodeComments` (valeur par défaut : `false`) — optionnel. Lorsque cette option vaut `true`, RTK supprime les commentaires des blocs délimités
  JavaScript et TypeScript. Historiquement, cette option était lue mais jamais appliquée ; la valeur par défaut reste donc
  « conserver » afin d’éviter une modification silencieuse en production.
- `preserveDocstrings` (valeur par défaut : `true`) — lors de la suppression des commentaires, les commentaires de bloc JSDoc/`/** … */` sont
  conservés (ils contiennent une documentation d’API dont la valeur dépasse le coût en octets). Définissez cette option sur `false` pour les supprimer
  également.

La suppression des commentaires est implémentée dans `open-sse/services/compression/engines/rtk/codeStripper.ts`. Elle utilise
l’**analyseur TypeScript** (et non une expression régulière), afin que les chaînes, les gabarits et les littéraux d’expression régulière ne soient jamais confondus
avec des commentaires. Elle abandonne entièrement le traitement lorsque du JSX est détecté (afin que les commentaires des conteneurs d’expressions JSX ne soient
jamais altérés). La suppression des commentaires ne s’applique actuellement **qu’à JavaScript et TypeScript** — les autres
langages de l’ensemble `CodeLanguage` de l’outil de suppression (Python, Rust, Go, Ruby, Java) bénéficient de la suppression des lignes vides et
de la réduction des espaces, mais pas de la suppression des commentaires. L’exécution sur le bloc nettoyé est marquée `rtk:code-strip` dans
`rulesApplied`.

> **Remarque — GCF / l’encodage tabulaire est un moteur distinct.** RTK ne contient **pas** l’encodeur JSON tabulaire/colonnaire « GCF »
> (Graph Compact Format). Cet encodeur — qui a remplacé un ancien encodeur
> `omni-tabular` — se trouve dans le moteur **headroom**
> (`open-sse/services/compression/engines/headroom/`, avec le codec intégré sous
> `headroom/gcf/`). Il n’est pas lié au pipeline de filtres RTK documenté ici.

## Configuration

Les paramètres globaux sont disponibles via `/api/settings/compression`. Les paramètres propres à RTK sont également
disponibles via `/api/context/rtk/config`.

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

`enabledFilters` et `disabledFilters` utilisent des identifiants de filtre, par exemple `test-vitest` ou `git-diff`.

La structure complète de `rtkConfig` est définie par `RtkConfig` / `DEFAULT_RTK_CONFIG` dans
`open-sse/services/compression/types.ts`. L’objet entier est conservé sous la forme d’une valeur JSON unique dans
la table SQLite `key_value` sous `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), et normalisé à la lecture par `normalizeRtkConfig`. Ainsi, chaque champ ci-dessous
— y compris `enableGrouping`, `groupingThreshold`, `stripCodeComments` et `preserveDocstrings` —
effectue un aller-retour dans le même stockage et persiste après un redémarrage.

| Clé                    | Valeur par défaut | Rôle                                                                                                        |
| ---------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`               | Pour tout le moteur : nombre minimal de lignes identiques consécutives à réduire (de 2 à 100)               |
| `enableGrouping`       | `false`           | Option facultative : réduire les suites de lignes consécutives presque équivalentes                         |
| `groupingThreshold`    | `3`               | Nombre minimal de lignes similaires consécutives déclenchant le regroupement                                |
| `stripCodeComments`    | `false`           | Option facultative : supprimer les commentaires des blocs de code délimités (nécessite `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`            | Lors de la suppression des commentaires, conserver les blocs JSDoc/`/** … */`                               |

## API

| Route                              | Méthode | Rôle                                                                 |
| ---------------------------------- | ------- | -------------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET     | Lire la configuration RTK                                            |
| `/api/context/rtk/config`          | PUT     | Mettre à jour la configuration RTK                                   |
| `/api/context/rtk/filters`         | GET     | Répertorier le catalogue de filtres et les diagnostics de chargement |
| `/api/context/rtk/import`          | POST    | Valider ou installer des fichiers de schéma TOML RTK v1              |
| `/api/context/rtk/test`            | POST    | Prévisualiser la compression RTK d’une charge utile textuelle        |
| `/api/context/rtk/raw-output/[id]` | GET     | Lire la sortie brute expurgée conservée                              |
| `/api/compression/preview`         | POST    | Prévisualiser n’importe quel mode de compression                     |

Charge utile de test RTK :

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Charge utile de prévisualisation de la compression :

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

Les routes de gestion nécessitent l’authentification de gestion du tableau de bord ou la stratégie de clé API correspondante.

Charge utile de validation TOML RTK :

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Utilisez `"action": "install"` pour installer globalement le fichier validé. Ajoutez `"overwrite": true` uniquement
après avoir examiné et confirmé le remplacement d’un fichier global existant.

## Récupération de la sortie brute

RTK ne renvoie normalement que du texte compressé. Pour le débogage, `rawOutputRetention` peut conserver la sortie brute expurgée :

| Valeur     | Comportement                                                             |
| ---------- | ------------------------------------------------------------------------ |
| `never`    | Ne pas conserver la sortie brute                                         |
| `failures` | Conserver uniquement les sorties correspondant probablement à des échecs |
| `always`   | Conserver chaque sortie brute compressée par RTK, après expurgation      |

Les fichiers conservés sont écrits sous :

```txt
DATA_DIR/rtk/raw-output/
```

Les secrets sont expurgés avant la persistance, notamment les jetons Bearer courants, les clés d’API, les jetons Slack, les clés d’accès AWS et les valeurs de type affectation `token=...`, `secret=...`, `password=...`. Les données analytiques ne stockent que l’identifiant du pointeur, la taille et les métadonnées de hachage.

## Barrière de vérification

La barrière de vérification ciblée exécute les tests de filtres intégrés sans recourir à des commandes externes :

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

La barrière RTK plus générale est :

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Exécutez la barrière générale de compression avant la publication :

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Extension de RTK

1. Ajoutez ou mettez à jour un fichier JSON de filtre.
2. Incluez au moins un exemple `tests[]` démontrant le comportement important.
3. Ajoutez un jeu de données sous `tests/unit/compression/fixtures/rtk/` pour les nouvelles familles de commandes.
4. Ajoutez une couverture de détection des commandes lors de l’introduction d’une nouvelle classe de sortie.
5. Exécutez les barrières de vérification et RTK générale.
6. Si le filtre est local au projet, validez `.rtk/filters.json` et actualisez `.rtk/trust.json` uniquement après vérification.

---

## Niveaux d’intensité (v3.8.16+)

RTK prend en charge **3 niveaux d’intensité** offrant différents compromis entre **l’agressivité de la compression** et la **sécurité**. Le niveau est défini via `config.intensity` dans la configuration du moteur.

### Les 3 niveaux

| Niveau              | Seuil de troncature   | Économie de jetons | Risque      | Idéal pour                             |
| ------------------- | --------------------- | ------------------ | ----------- | -------------------------------------- |
| `minimal`           | 24 lignes par section | ~20-40%            | Très faible | Production avec un contexte critique   |
| `standard` (défaut) | 24 lignes par section | ~50-70%            | Faible      | Sessions quotidiennes de programmation |
| `aggressive`        | 16 lignes par section | ~70-90%            | Moyen       | Longues sessions, économies maximales  |

### Emplacement de la troncature

Le seuil de troncature affecte `lineFilter.ts` :

```ts
// Extrait de open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Le **début** et la **fin** de chaque section sont tous deux préservés ; le contenu intermédiaire est supprimé lorsque la troncature s’applique.

### Ce qui est conservé et ce qui est supprimé

| Contenu                          | minimal       | standard      | aggressive    |
| -------------------------------- | ------------- | ------------- | ------------- |
| Erreurs / traces de pile         | ✅ préservées | ✅ préservées | ✅ préservées |
| Échecs de tests                  | ✅ préservés  | ✅ préservés  | ✅ préservés  |
| Erreurs de compilation           | ✅ préservées | ✅ préservées | ✅ préservées |
| Tests réussis (sortie détaillée) | ✅ préservés  | 🟡 condensés  | 🟡 condensés  |
| Sortie courante (journaux info)  | 🟡 condensée  | 🟡 condensée  | ❌ supprimée  |
| Barres de progression            | 🟡 condensées | ❌ supprimées | ❌ supprimées |
| Bannière / art ASCII             | 🟡 condensé   | ❌ supprimé   | ❌ supprimé   |

### Choix de l’intensité appropriée

```
                  La perte de contexte est-elle catastrophique ?
                  │
      ┌───────────┼───────────┐
      │           │           │
    OUI          NON       INCERTAIN
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Quel est le     Essayez d’abord `standard`
      │      niveau critique (convient à 80 % des
      │      du débit ?      cas)
      │           │
      │      ┌────┴────┐
      │      │         │
      │   FAIBLE      ÉLEVÉ
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Configuration de l’intensité

**Par combo** (dans la configuration du combo) :

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

**Par programmation** :

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) est un
`CompressionEngine` et ne possède aucune méthode `updateConfig`. Mettez à jour la configuration d’un moteur
à l’aide de l’utilitaire du registre :

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Vérification de l’effet

Utilisez la **barrière de vérification** (voir ci-dessous) pour confirmer que votre filtre est sûr avec l’intensité choisie :

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Échec des filtres avec l’intensité aggressive");
}
```

---

## Développement de filtres personnalisés (v3.8.16+)

Le répertoire `engines/rtk/filters/` contient **plus de 49 fichiers JSON de filtres intégrés**. Vous pouvez ajouter les vôtres afin de compresser la sortie d’outils personnalisés non couverts par les filtres par défaut.

### Schéma du filtre (Zod)

```ts
{
  "id": "string",                      // Obligatoire. Identifiant du filtre (kebab-case, p. ex. « python-traceback »)
  "label": "string",                   // Obligatoire. Nom lisible du filtre
  "description": "string",             // Facultatif (valeur par défaut : ""). Brève description de l’action du filtre
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Facultatif (0-100, valeur par défaut : 50). Ordre d’exécution (plus élevé = en premier)
  "match": {
    "commands": ["string"],            // Noms de commandes à faire correspondre (p. ex. « python », « pytest »)
    "patterns": ["string"],            // Expressions régulières à faire correspondre à la sortie
    "outputTypes": ["string"]          // Classes de sortie détectées (p. ex. « test-failure »)
  },
  "rules": {
    "stripAnsi": boolean,              // Facultatif (valeur par défaut : false). Supprime les codes de couleur ANSI
    "replace": [                       // Règles de recherche et de remplacement (valeur par défaut : [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Interrompt le traitement lorsqu’un motif correspond (valeur par défaut : [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Ignore si ce motif correspond
      }
    ],
    "includePatterns": ["string"],     // Lignes à conserver (expressions régulières, valeur par défaut : [])
    "dropPatterns": ["string"],        // Lignes à supprimer (expressions régulières, valeur par défaut : [])
    "collapsePatterns": ["string"],    // Lignes à réduire à une seule occurrence (valeur par défaut : [])
    "deduplicate": boolean,            // Facultatif (valeur par défaut : false). Supprime les lignes en double
    "truncateLineAt": number,          // Facultatif (valeur par défaut : 0). Tronque les lignes au nombre maximal de caractères
    "maxLines": number,                // Facultatif (valeur par défaut : 0). Limite stricte du nombre total de lignes
    "headLines": number,               // Facultatif (valeur par défaut : 20). Conserve les N premières lignes de la sortie correspondante
    "tailLines": number,               // Facultatif (valeur par défaut : 20). Conserve les N dernières lignes de la sortie correspondante
    "onEmpty": "string",               // Facultatif (valeur par défaut : ""). Message de repli si toutes les lignes sont filtrées
    "filterStderr": boolean            // Facultatif (valeur par défaut : false). Filtre également la sortie stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Motifs devant toujours être conservés (valeur par défaut : [])
    "summaryPatterns": ["string"]      // Motifs correspondant à la ligne de résumé finale (valeur par défaut : [])
  },
  "tests": [                           // Tests intégrés pour vérification (valeur par défaut : [])
    {
      "name": "string",               // Obligatoire. Nom du test
      "input": "sample output",        // Obligatoire. Exemple de texte d’entrée
      "expected": "expected output",   // Obligatoire. Sortie compressée attendue
      "command": "optional command"    // Facultatif. Contexte de la commande
    }
  ]
}
```

### Exemple : filtre de traceback Python

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

### Chargement des filtres personnalisés

Placez le fichier dans un emplacement reconnu :

```
~/.omniroute/rtk/filters/my-filter.json     # Niveau utilisateur
<project>/.rtk/filters/my-filter.json      # Niveau projet
```

Les filtres sont chargés automatiquement au démarrage via `loadRtkFilters()` dans `open-sse/services/compression/engines/rtk/filterLoader.ts`. Le chargeur recherche les filtres dans les emplacements suivants :

- Catalogue intégré : `open-sse/services/compression/engines/rtk/filters/`
- Répertoire utilisateur : `~/.omniroute/rtk/filters/`
- Répertoire du projet : `<project>/.rtk/filters/`

Pour charger les filtres par programmation :

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Options : customFiltersEnabled (charge les filtres utilisateur/projet, activé par défaut),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validation

Les filtres sont validés par rapport au schéma Zod lors du chargement. Un filtre dont la structure est incorrecte ne pourra pas être chargé et une erreur sera consignée :

```
RTK_FILTER_LOADER: échec de la validation du filtre "my-filter" :
  - rules.replace.0.pattern: Expression régulière non valide
  - match.commands: ne doit pas être vide
```

Pour valider tous les filtres installés, appelez `runRtkFilterTests()`, qui est exportée depuis `open-sse/services/compression/engines/rtk/verify.ts`.

### Bonnes pratiques

1. **Incluez toujours `tests[]`** — ils prouvent que votre filtre fonctionne et évitent les régressions
2. **Utilisez `matchOutput` pour les sorties anticipées** — si une seule ligne suffit à résumer la situation, remplacez le bloc entier
3. **Préférez `keep` à `strip`** — les règles explicites « toujours conserver » sont plus sûres que « toujours supprimer »
4. **Testez les 3 niveaux d’intensité** — `minimal` ne devrait produire aucun effet, tandis que `aggressive` devrait tout de même préserver les erreurs
5. **Utilisez le champ `unless`** — protégez les sorties anticipées avec une condition « ne pas déclencher si X est présent »

---

## Récupération de la sortie brute et étape de vérification

Lorsque RTK compresse la sortie de manière agressive, vous pouvez **récupérer le texte d’origine** à des fins de débogage, d’audit ou de relecture.

### Fonctionnement de la récupération de la sortie brute

```
Sortie d’origine (10K jetons)
        │
        ▼
Compression RTK (avec rawOutput.enabled=true)
        │
        ├─▶ Sortie compressée (2K jetons)  ──▶ vers le LLM
        │
        └─▶ Sortie d’origine (10K jetons)  ──▶ stockée dans la BDD
                                                  (liée par request_id)
```

### Activation du stockage de la sortie brute

**Par requête** (dans la configuration combinée) :

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Plafond de 1 Mo
    }
  }
}
```

**Valeur par défaut** : `rawOutput.enabled: false` (économise de l’espace de stockage).

### Coût de stockage

| Par requête               | Plafond de 1 Mo | Plafond de 10 Mo |
| ------------------------- | --------------- | ---------------- |
| Sortie compressée moyenne | ~5 Ko           | ~5 Ko            |
| Sortie brute stockée      | ~50-500 Ko      | ~500 Ko-5 Mo     |
| Avec 1 000 requêtes/jour  | 50-500 Mo/jour  | 500 Mo-5 Go/jour |

> **Recommandation** : activez uniquement la sortie brute pour les **sessions de débogage** ou les **audits par échantillonnage**, et non en permanence.

### Récupération de la sortie d’origine

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId provenant des statistiques de compression
if (raw) {
  console.log("Original output:", raw);
}
```

Le `pointerId` est renvoyé dans `CompressionStats.rtkRawOutputPointers[]` après la compression.
Consultez `open-sse/services/compression/engines/rtk/rawOutput.ts:102` pour connaître la signature de la fonction.

### L’étape de vérification

La **vérification des filtres RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) valide tous les filtres par rapport à leurs `tests[]` et garantit que leur comportement est correct pour les 3 niveaux d’intensité.

**Appelez `runRtkFilterTests()`** pour exécuter la vérification :

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

**Éléments validés** :

1. Chaque filtre se charge et réussit la validation du schéma
2. Chaque entrée de `tests[]` produit la sortie attendue
3. L’intensité `minimal` est sans effet (elle préserve l’original et applique uniquement les filtres structurels)
4. L’intensité `aggressive` préserve les erreurs, les échecs de tests et les traces de pile
5. La sortie compressée n’est jamais plus volumineuse que l’entrée d’origine

- Source : `open-sse/services/compression/engines/rtk/` (63 fichiers, ~70 Ko)

- **Avant de fusionner une modification de filtre** — vérifiez toujours que les tests réussissent
- **Après la mise à niveau du moteur RTK** — le schéma peut avoir changé
- **Périodiquement dans le cadre de la surveillance** — protège contre la dérive des jeux de données de test
- **Lors de l’ajout d’une nouvelle famille d’outils/commandes** — prouve que le nouveau filtre fonctionne

---

## Voir aussi

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Vue d’ensemble complète du pipeline de compression
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registre des moteurs et moteurs intégrés
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Moteurs personnalisés, packs linguistiques, pipelines empilés
- Source : `open-sse/services/compression/engines/rtk/` (63 fichiers, ~70 Ko)
