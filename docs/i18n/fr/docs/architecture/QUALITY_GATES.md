# Quality Gates Reference (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ce document constitue la référence faisant autorité pour tous les contrôles qualité de CI d’OmniRoute.
Il décrit chaque contrôle, ce qu’il valide, la tâche de CI dans laquelle il s’exécute, s’il utilise
une base de référence à effet de cliquet ou une politique de réussite/échec, et s’il bloque la compilation ou est consultatif.

Pour un bref résumé et la politique de liste d’autorisation, consultez la section « Quality Gates & Ratchets »
dans `AGENTS.md`. Pour l’évaluation critique, la classification de maturité et le
plan de réplication indépendant des outils du même système, consultez le
[guide des contrôles qualité](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventaire des garde-fous (~90 scripts)

Les scripts se trouvent dans `scripts/check/` (garde-fous de politique) et `scripts/quality/` (moteur de ratchet).
La source de vérité de la CI est `.github/workflows/ci.yml`.

### Chemin rapide pour les PR de publication (`quality.yml`)

`.github/workflows/quality.yml` s’exécute sur les PR ciblant `release/**`. Il permet aux branches des contributeurs
de continuer à progresser grâce à des garde-fous rapides filtrés par chemin, ainsi qu’à un signal consultatif de build de production pour les
modifications de code :

| Job                                              | Portée                                                                                                                                                                                                                                                      | Bloquant                                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PR de code non brouillons et branches de file d’attente Mergify ; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` avec `OMNIROUTE_USE_TURBOPACK=1` ; aucun téléversement d’artefact, car aucun job de qualité en aval ne l’utilise           | **Consultatif** (`continue-on-error: true` ; à supprimer après une semaine d’exécutions stables sur les PR de publication) |
| `Docs Gates (fast-path)`                         | PR de documentation/code ; références de documentation d’API et docs-all                                                                                                                                                                                    | Oui                                                                                                                        |
| `Fast Quality Gates`                             | PR de code ; vérifications statiques, vérification des types, vérification des types du tableau de bord, tests unitaires concernés                                                                                                                          | Oui                                                                                                                        |
| `Forgotten sibling tests`                        | PR de code ; modules modifiés suivis jusqu’aux consommateurs statiques et aux tests frères candidats ; les chemins de barrel et d’import dynamique sont signalés comme diagnostics consultatifs, avec les exceptions référencées de la liste d’autorisation | **Consultatif**                                                                                                            |
| `Vitest (fast-path)`                             | PR de code ; suite Vitest rapide                                                                                                                                                                                                                            | Oui                                                                                                                        |
| `Unit Tests fast-path`                           | PR de code ; suite unitaire en 4 fragments                                                                                                                                                                                                                  | Oui                                                                                                                        |
| `No new ESLint warnings`                         | PR de code ; garde-fou de lint tenant compte des suppressions                                                                                                                                                                                               | Oui pour les PR de même origine, consultatif pour les forks                                                                |
| `Merge integrity (changelog + generated skills)` | PR non brouillons ; synchronisation du changelog et des compétences générées                                                                                                                                                                                | Oui pour les PR de même origine, consultatif pour les forks                                                                |

#### Rapport sur les tests frères oubliés

`npm run check:forgotten-sibling-tests` réutilise le résolveur d’importation qui sous-tend la carte d’impact des tests.
Pour chaque module de production modifié, il signale des chaînes déterministes
`module/symbole modifié -> consommateur statique -> test frère candidat` lorsque le test candidat
est absent du diff de la pull request. Le résumé Markdown et le résultat JSON sont conservés comme
artefact de workflow `forgotten-sibling-tests` à des fins de calibrage avant tout déploiement bloquant.

Les réexportations de barrel et les importations dynamiques constituent uniquement des diagnostics de résolution ; elles ne génèrent jamais de
constat bloquant. Les exceptions examinées se trouvent dans
`config/quality/forgotten-sibling-allowlist.json`. Chaque entrée doit nommer le consommateur et le test
candidat, fournir une justification précise et contenir un lien vers une issue ou une pull request GitHub. Les entrées mal formées
provoquent un échec par défaut. Les exceptions ne peuvent pas masquer un test candidat supprimé ni un diff qui ajoute `.skip`/`.todo` ;
l’affaiblissement des assertions et les autres formes de masquage restent du ressort du garde-fou bloquant indépendant
`check:test-masking`.

### Job : `lint`

S’exécute sur chaque PR vers `main`. Bloque la fusion en cas d’échec.

| Script (`npm run ...`)            | Valide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Bloquant                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | La version de Node.js se trouve dans la plage prise en charge                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Oui                                         |
| `check:cycles`                    | Les importations circulaires — tous les modules de `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oui                                         |
| `check:route-validation:t06`      | La présence de schémas Zod sur toutes les routes (politique de niveau 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oui                                         |
| `check:any-budget:t11`            | Le nombre de `@ts-expect-error // any` ne dépasse pas le budget (tourniquet de niveau 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                         |
| `check:provider-consistency`      | Chaque fournisseur dans `providers.ts` possède une entrée correspondante dans `providerRegistry.ts` (et inversement, dans les limites de la liste d’autorisation)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oui                                         |
| `check:model-lifecycle`           | Les trois tables de routage maintenues manuellement restent cohérentes avec l’instantané du cycle de vie intégré au dépôt (#11503) : `FITNESS_TABLE` (`taskFitness.ts`) n’attribue de score à aucun identifiant retiré que `REGISTRY` peut acheminer ; chaque cible de `BUILT_IN_ALIASES` est présente dans `REGISTRY` et absente de l’instantané des identifiants retirés ; chaque identifiant retiré encore présent dans `REGISTRY` est redirigé ou répertorié dans `allowedRetiredInCatalog` ; et aucune source ni cible de `DEFAULT_DEGRADATION_MAP` n’apparaît comme retirée dans cet instantané. Cela ne prouve pas qu’un modèle est actuellement servi par un fournisseur en amont actif. Hors ligne — compare avec `config/quality/model-lifecycle.json`, actualisé manuellement avec `npm run quality:refresh-model-lifecycle` (réseau ; non intégré à la CI). `allowedRetiredInCatalog` est un mécanisme de réduction progressive : n’ajoutez une entrée qu’avec un ticket de suivi. | Oui                                         |
| `check:fetch-targets`             | Chaque `fetch("/api/...")` dans le répertoire `src/` côté client correspond à un véritable `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oui                                         |
| `check:deps`                      | Toutes les dépendances installables avec `npm install` dans chaque `package.json` du dépôt figurent dans `dependency-allowlist.json` ; les nouveaux paquets sans version épinglée ou issus de typosquattage sont signalés                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                         |
| `audit:deps`                      | `npm audit` (racine + Electron) — aucun avis de sécurité de gravité élevée/critique (chevauche le contrôle OSV `check:vuln-ratchet` ; voir la liste des rationalisations en attente)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                         |
| `check:lockfile`                  | Intégrité de `package-lock.json` — registre HTTPS, hachages d’intégrité, aucun remplacement d’hôte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                         |
| `check:licenses`                  | Liste d’autorisation des licences SPDX pour les dépendances de production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                         |
| `check:tracked-artifacts`         | Aucun artefact de build / lien symbolique `node_modules` versionné (également exécuté par le hook husky de pré-commit ; le pré-push est intentionnellement léger — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                         |
| `check:ai-attribution`            | Aucun trailer `Co-Authored-By` d’IA/bot ni pied de page indiquant une génération par IA dans les commits, le titre ou le corps de la PR — Règle stricte nº 16 (dans la boucle de contrôles rapides de `quality.yml` pour les PR→`release/**` — lit la charge utile de l’événement, sans effet hors PR — et dans une étape réservée aux PR du lint de `ci.yml` pour les PR→`main` ; également dans le hook husky `commit-msg` ; coauteurs humains autorisés ; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | Chaque exclusion Vitest mentionne un ticket de suivi et figure dans `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Oui                                         |
| `check:file-size`                 | Aucun fichier source ne dépasse la limite propre à son extension (mécanisme à cliquet : fichiers volumineux gelés dans la liste `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                         |
| `check:error-helper`              | Les réponses d’erreur dans les exécuteurs/gestionnaires utilisent `buildErrorBody()` / `sanitizeErrorMessage()` (Règle stricte nº 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Oui                                         |
| `check:migration-numbering`       | Les fichiers SQL de migration sont numérotés séquentiellement, sans lacunes ni doublons                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Oui                                         |
| `check:public-creds`              | Aucun `client_id`/`client_secret` OAuth littéral ni aucune clé Web Firebase en dehors de `publicCreds.ts` (Règle stricte n° 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oui                                         |
| `check:db-rules`                  | Aucun SQL brut en dehors des modules `src/lib/db/` ; aucun import depuis le fichier d’agrégation `localDb.ts` (Règles strictes n° 2/n° 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oui                                         |
| `check:known-symbols`             | Les exécuteurs de fournisseurs, les stratégies de routage et les traducteurs enregistrés dans leurs tables de répartition correspondent aux fichiers présents sur le disque — aucun symbole orphelin ou non déclaré                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oui                                         |
| `check:route-guard-membership`    | Chaque route qui lance un processus enfant est classée par `isLocalOnlyPath()` (Règles strictes n° 15/n° 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oui                                         |
| `check:test-discovery`            | Chaque fichier `*.test.ts` / `*.spec.ts` du dépôt est collecté par au moins un exécuteur de tests (mécanisme à cliquet : la liste des fichiers orphelins dans `test-discovery-baseline.json` ne peut que diminuer)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oui                                         |
| `check:agent-skills-sync`         | Les artefacts agent-skills générés correspondent à leur catalogue source (aucune dérive)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | Les logos/ressources des fournisseurs disposent d’une entrée de provenance enregistrée                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | Les fichiers de configuration JSON sont analysés correctement et respectent les règles de lint du dépôt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | Compilation TypeScript sans erreur (avertissements consultatifs uniquement)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oui                                         |
| `typecheck:noimplicit:core`       | Mode strict `noImplicitAny` — mesure prospective ; de nombreux sites d’appel préexistants nécessitent encore des annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Consultatif** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limité à `src/app/(dashboard)/**` (#7033) — la liste d’autorisation organisée de 27 fichiers de `typecheck:core` n’inclut aucun fichier TSX du tableau de bord, et `next build` n’effectue pas non plus leur vérification de types (`next.config.mjs` définit `ignoreBuildErrors: true`) ; les régressions liées à des identifiants orphelins dans ces fichiers (#6625/#6909) étaient donc invisibles pour la CI. Comparaison avec une référence figée du nombre d’erreurs par fichier et par code TS (`config/quality/dashboard-typecheck-baseline.json`, selon le même modèle de contrôle d’obsolescence que `check:known-symbols`) — seules les NOUVELLES erreurs dépassant le nombre de référence font échouer le contrôle ; abaissez progressivement la référence avec `--update` lorsqu’une erreur préexistante est corrigée.                                                                                                                                                      | Oui                                         |

### Tâche : `quality-gate`

S’exécute après `test-coverage`. Bloque la fusion en cas d’échec.

| Script                       | Valide                                                                                                                                                                                                        | Bloquant                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `quality:collect`            | Génère `quality-metrics.json` (nombre d’avertissements ESLint, couverture issue du rapport fusionné des fragments)                                                                                            | Oui (en amont du mécanisme de seuil) |
| `quality:ratchet`            | Chaque métrique de `quality-baseline.json` n’a pas régressé (avertissements ESLint ≤ référence ; couverture ≥ référence)                                                                                      | Oui                                  |
| `check:duplication`          | La duplication de code (jscpd@4) ne dépasse pas la référence définie dans `quality-baseline.json`                                                                                                             | Oui                                  |
| `check:complexity`           | La complexité cyclomatique au niveau des fichiers ne dépasse pas la limite (règles ESLint de base `complexity` + `max-lines-per-function`)                                                                    | Oui                                  |
| `check:cognitive-complexity` | Mécanisme de seuil de complexité cognitive (`eslint-plugin-sonarjs`) — passe ESLint distincte ; la CI exécute les deux ensemble dans l’étape unique `check:complexity-ratchets`                               | Oui                                  |
| `check:dead-code`            | Le mécanisme de seuil des exports / fichiers inutilisés (knip) ne régresse pas par rapport à la référence                                                                                                     | Oui                                  |
| `check:compression-budget`   | Budget du benchmark de compression — les seuils minimaux d’économie de jetons par moteur ne doivent pas régresser                                                                                             | Oui                                  |
| `check:type-coverage`        | Le mécanisme de seuil du pourcentage typé (`type-coverage`) ne régresse pas ; remplace en grande partie `typecheck:noimplicit:core`                                                                           | Oui                                  |
| `check:codeql-ratchet`       | Le nombre d’alertes CodeQL ouvertes ne régresse pas (lecture via `gh api` ; ignoré proprement sans jeton) — fréquence d’actualisation et déclenchement manuel : voir « Mécanisme de seuil CodeQL » ci-dessous | Oui                                  |

### Tâche : `quality-extended`

L’ensemble de la tâche est consultatif (`continue-on-error: true`). Les mécanismes de seuil basés sur npm
s’exécutent réellement ; les analyseurs externes sont installés via `gh release download` et s’ignorent
automatiquement (code de sortie 0) lorsqu’un binaire est toujours absent.

| Script                   | Valide                                                                                                                                                                                                                                | Bloquant        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check:circular-deps`    | Aucune dépendance circulaire (dpdm)                                                                                                                                                                                                   | **Consultatif** |
| `check:bundle-size`      | La taille du bundle ne dépasse pas la limite                                                                                                                                                                                          | **Consultatif** |
| `check:secrets`          | Analyse des secrets (gitleaks) — ignorée si le binaire est absent                                                                                                                                                                     | **Consultatif** |
| `check:vuln-ratchet`     | Les vulnérabilités des dépendances (osv-scanner) ne régressent pas — ignoré si le binaire est absent                                                                                                                                  | **Consultatif** |
| `check:workflows`        | Analyse des workflows (actionlint + zizmor) — ignorée si les binaires sont absents                                                                                                                                                    | **Consultatif** |
| `check:openapi-breaking` | Modifications incompatibles du contrat d’API publique (`openapi.yaml`) par rapport à la branche de base (oasdiff) — génère `openapiBreaking=N` ; ignoré si oasdiff est absent ou si la spécification de base ne peut pas être résolue | **Consultatif** |

### Tâche : `docs-sync-strict`

S’exécute à chaque PR vers `main`. Bloque la fusion en cas d’échec.

| Script                         | Vérifie                                                                                                                                                                                                                       | Bloquant                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `check:docs-all`               | Méta-contrôle qui exécute séquentiellement les 6 sous-contrôles ci-dessous                                                                                                                                                    | Oui                             |
| ↳ `check:docs-sync`            | Cohérence des versions entre CHANGELOG / OpenAPI / llm.txt                                                                                                                                                                    | Oui                             |
| ↳ `check:docs-counts`          | Les nombres mentionnés dans le texte (nombre de fournisseurs, nombre de migrations, etc.) restent dans la fenêtre de tolérance par rapport aux nombres réels                                                                  | Oui                             |
| ↳ `check:env-doc-sync`         | Chaque variable d’environnement de `.env.example` est documentée dans un tableau de la documentation, et inversement                                                                                                          | Oui                             |
| ↳ `check:deprecated-versions`  | Aucune chaîne de version obsolète dans la documentation                                                                                                                                                                       | Oui                             |
| ↳ `check:doc-links`            | Les liens Markdown internes de la documentation renvoient vers des fichiers réels (forme `[texte]`/`(chemin)`)                                                                                                                | Oui                             |
| ↳ `check:fabricated-docs`      | Les routes, variables d’environnement, commandes CLI, noms de hooks et chemins de fichiers cités dans la documentation existent dans la base de code. Contrôle strict avec `--strict` ; échec non bloquant sans cette option. | Oui (via `--strict` dans la CI) |
| `check:cli-i18n`               | Les chaînes des commandes CLI sont présentes dans tous les fichiers de paramètres régionaux i18n                                                                                                                              | Oui                             |
| `check:openapi-coverage`       | La spécification OpenAPI couvre au moins un seuil minimal ajusté à la hausse de routes réelles                                                                                                                                | Oui                             |
| `check:openapi-security-tiers` | Les annotations des niveaux de sécurité dans `openapi.yaml` sont cohérentes avec les classifications de `routeGuard.ts`                                                                                                       | **Informatif**                  |
| `check:openapi-routes`         | Chaque chemin dans `openapi.yaml` correspond à un véritable `route.ts` (anti-hallucination)                                                                                                                                   | Oui                             |
| `check:docs-symbols`           | Chaque référence `/api/...` dans `docs/**/*.md` correspond à un véritable `route.ts` (anti-hallucination)                                                                                                                     | Oui                             |
| `i18n translation drift`       | Clés non traduites dans les fichiers de paramètres régionaux i18n — avertissement uniquement                                                                                                                                  | **Informatif**                  |

### Tâche : `i18n-ui-coverage`

| Script                            | Vérifie                                                                                                                                                                                                                            | Bloquant       |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | La couverture des clés i18n de l’interface utilisateur est ≥ 65 %                                                                                                                                                                  | Oui            |
| `check-ui-value-drift` (inline)   | La réécriture d’une **valeur** anglaise ne laisse aucune traduction obsolète                                                                                                                                                       | Oui            |
| `check-new-key-coverage` (inline) | Une **nouvelle** clé anglaise est traduite dans chaque paramètre régional — un marqueur `__MISSING__:` est rejeté                                                                                                                  | Oui            |
| `check-translation-ratio`         | Le taux de traductions réelles par paramètre régional (valeurs identiques à l’anglais / substituts / éléments manquants hors liste d’autorisation) ne doit pas dépasser `config/quality/i18n-translation-baseline.json` + la marge | **Informatif** |

Nécessite `fetch-depth: 0` — le contrôle de dérive des valeurs compare `en.json` à la base de fusion.

#### `check-ui-value-drift` — contrôle des traductions obsolètes

Détecte la seule régression i18n que les autres contrôles ne peuvent structurellement pas voir : une valeur anglaise
est réécrite, tandis que les traductions dérivées de l’_ancienne_ version anglaise restent inchangées, de sorte que
les utilisateurs non anglophones continuent de lire un texte formulé avec assurance, mais désormais erroné.

Ce problème s’est réellement produit en production. `oauthModal.googleOAuthWarning` a été réécrit lors de l’arrivée de
l’assistant de connexion Antigravity (#5203) ; **39 paramètres régionaux sur 43** ont conservé un texte demandant aux opérateurs de « copier
l’URL complète et de la coller ci-dessous » — un flux qui ne peut pas aboutir pour ce fournisseur. Le problème est
passé inaperçu jusqu’à #8463 parce que :

- `sync-ui-keys` ne complète que les clés **absentes**, jamais celles qui sont **obsolètes** ;
- `check-ui-keys-coverage` compte la _présence_ des clés, de sorte qu’une traduction obsolète est considérée comme couverte ;
- `check-translation-drift` suit les miroirs de documentation `docs/i18n/<locale>/**.md` —
  il ne lit jamais `src/i18n/messages/*.json`. Bloquant dans la tâche `docs-sync-strict` depuis la
  resynchronisation de 2026-09 : modifier un document principal → `npm run i18n:run -- --files=<doc>` (au niveau de la section, peu coûteux).

**Sensible aux diffs, sans référence de base.** Il compare `en.json` à la base de fusion avec
l’arborescence de travail ; pour chaque clé dont la valeur anglaise a changé, toute locale
contenant encore une traduction inchangée est obsolète. Cela **fige délibérément la dette
préexistante** — un diff ne permet pas de déterminer de quelle ancienne version anglaise
provient une traduction de longue date ; le contrôle ne juge donc que ce que la modification
actuelle touche. L’alternative (une référence de hachage par clé) nécessiterait un fichier
généré d’environ 600 Ko, soit 3× la plus grande référence existante, et serait remaniée à
chaque PR d’i18n.

Deux façons de satisfaire ce contrôle :

1. mettre à jour les traductions concernées, ou
2. les définir sur `__MISSING__:<nouvel anglais>` — l’exécution fournit alors la version
   anglaise corrigée (`src/i18n/request.ts::deepMergeFallback`, #7258) et place la clé dans
   la file d’attente de traduction.

Si le **sens** de la chaîne a changé, préférez **renommer la clé** : une nouvelle clé ne peut
pas hériter d’une traduction obsolète. C’est le modèle utilisé par #8463.

```bash
npm run i18n:check-value-drift          # strict (ce que la CI exécute)
npm run i18n:check-value-drift:warn     # rapport uniquement
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Se termine avec le code 0 et `SKIP reason=base-unresolved` lorsque le catalogue de base ne
peut pas être lu (clone superficiel sans la référence de base), à l’image de
`check-openapi-breaking`.

### Tâche : `i18n`

Matrice complète de validation i18n (une tâche par locale). La tâche entière est consultative.

| Script                          | Valide                                   | Bloquant                                                       |
| ------------------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Exhaustivité de la traduction par locale | **Consultatif** (`continue-on-error: true` sur toute la tâche) |

### Tâche : `pr-test-policy`

S’exécute uniquement sur les pull requests.

| Script                 | Valide                                                                                                                                                                   | Bloquant |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:pr-test-policy` | Les PR qui modifient le code de production dans `src/`, `open-sse/`, `electron/` ou `bin/` doivent inclure ou mettre à jour des tests (Règle stricte n° 8)               | Oui      |
| `check:test-masking`   | Les fichiers de test modifiés ne réduisent pas le nombre net d’assertions et n’ajoutent pas de tautologies `assert.ok(true)`                                             | Oui      |
| `check:pr-evidence`    | Le corps de la PR cite des preuves de test/VPS pour la modification (automatise la Règle stricte n° 18 en recherchant dans le texte de la PR — fragile, voir le backlog) | Oui      |

### Tâche : `test-vitest`

S’exécute après `build`. Bloque la fusion en cas d’échec.

| Suite            | Valide                                                        | Bloquant                                                                                                                             |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Serveur MCP (110 outils), autoCombo, cache — exécuteur vitest | Oui                                                                                                                                  |
| `test:vitest:ui` | Tests des composants d’interface — exécuteur vitest           | **Bloquant** — les échecs préexistants sont explicitement exclus dans `vitest.config.ts` ; les nouveaux échecs font échouer la tâche |

### Workflows nocturnes (planifiés, consultatifs)

Ils s’exécutent selon une planification cron (et via `workflow_dispatch`), jamais sur les PR. Ils sont tous consultatifs.

| Workflow               | Valide                                                                                                                                                                                               | Bloquant        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | Tests basés sur les propriétés fast-check avec une graine aléatoire et un nombre élevé d’exécutions                                                                                                  | **Consultatif** |
| `nightly-resilience`   | Contrôle de la croissance du tas, injection de pannes chaotiques, tests de charge/d’endurance k6                                                                                                     | **Consultatif** |
| `nightly-llm-security` | Protection promptfoo contre les injections (mode blocage) + sondes garak (ignorées sans secret de fournisseur)                                                                                       | **Consultatif** |
| `nightly-schemathesis` | Fuzzing du contrat OpenAPI (schemathesis) sur une instance OmniRoute active à l’aide de `docs/openapi.yaml` — met en évidence les violations de spécification / erreurs 500 non gérées (Phase 8 B.4) | **Consultatif** |
| `nightly-mutation`     | Score des tests par mutation Stryker sur la voie rapide des tests unitaires — les mutants survivants révèlent les assertions faibles                                                                 | **Consultatif** |
| `nightly-compat`       | Matrice de compatibilité du moteur Node sur l’ensemble des plages `engines.node` prises en charge                                                                                                    | **Consultatif** |

---

## Phase de vélocité (2026-08-30 → v4.0 LTS) : chaque référence assouplie de 20 %

Décision du responsable (2026-08-30) : jusqu'à la modularisation de la v4.0, la vitesse de livraison importe davantage
que la maîtrise de la dette. Chaque référence de cliquet **numérique** a été assouplie de 20 % en une
seule passe vérifiable, et la phase est déclarée dans `config/quality/quality-baseline.json` :

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Ce qui a changé                                                                                                                                                                                                                                                | Emplacement                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — nombres où une valeur inférieure est préférable ×1.2, pourcentages où une valeur supérieure est préférable ÷1.2 (plancher de couverture maintenu à 60, `eslintErrors` reste à 0, `eslintWarnings` 0 → 20 % du nombre figé de suppressions) | `quality-baseline.json` (la note `_relax_velocity_2026_08_30` répertorie chaque valeur avant → après)  |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                               | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, chaque plafond par ligne `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                  | `file-size-baseline.json`                                                                              |
| nombres par fichier / par code TS ×1.2                                                                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                            | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` devient indicatif tant que `_policy.requireTighten === false`                                                                                                                                                                              | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| la tâche nocturne `bank-ratchet-shrinks` est suspendue (elle enregistrerait la réduction mesurée et annulerait la marge)                                                                                                                                       | `.github/workflows/nightly-release-green.yml`                                                          |

Les listes d'autorisation (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ne sont **pas** des budgets et n'ont pas été modifiées. Les barrières de validation réussite/échec (secrets, règles SQL,
contrat documentation/environnement, parité i18n, tests unitaires) restent inchangées — un test en échec reste un test en échec.

**Outillage**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — l'assouplissement
  ponctuel (`scripts/quality/relax-baselines.mjs`) ; refuse de s'exécuter deux fois avec la
  même note.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mesure chaque barrière numérique comme le fait la CI et affiche la marge restante pour chacune
  (`scripts/quality/baseline-headroom.mjs`). La tâche nocturne `baseline-headroom` publie le
  tableau dans l'issue évolutive **📈 Marge des références (phase de vélocité)** et ajoute le
  libellé `headroom-alert` lorsqu'une barrière se trouve à moins de 10 % de son plafond ou l'a déjà dépassé. Cette issue
  sert d'alerte précoce : un budget épuisé en quelques jours signifie que l'assouplissement est consommé par
  quelques PR, et non par toute l'équipe — consultez les notes `_rebaseline_*` de la barrière concernée.

**Mode nouveau code (Clean-as-You-Code) — depuis le 2026-08-30, chemin rapide des PR uniquement**

Lors des événements `pull_request`, `quality.yml` transmet `--base-ref <PR base SHA>` à `check:file-size`,
`check:complexity-ratchets` et `check:dead-code`. Dans ce mode, la barrière compare HEAD à la
base de fusion, **uniquement pour les fichiers modifiés par la PR** (`scripts/check/newCodeMode.mjs` : la
base de fusion est matérialisée dans un `git worktree` temporaire, ESLint/knip y sont exécutés ainsi que sur HEAD, puis les
nombres par fichier sont comparés) :

- **bloquant** — la PR a ajouté des violations de complexité cyclomatique/cognitive ou des exports inutilisés dans les fichiers qu'elle a modifiés
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` dans le journal) ;
- **indicatif** — le total global par rapport à la référence figée. Une dérive héritée ne fait jamais échouer
  une PR non responsable ; la dérive est de nouveau figée lors de la réconciliation de la version et surveillée par la tâche de suivi de la marge.

Les exécutions `workflow_dispatch`, le contrôle release-green et la tâche nocturne de suivi de la marge n'ont pas de base de PR
et conservent la comparaison absolue (globale). La couverture, la duplication et la couverture des types restent globales
pour l'instant (leurs outils ne produisent pas de comparaison par fichier à faible coût) — elles sont candidates au même traitement.

**Clôture de la phase à la v4.0 (LTS = plus stricte qu'avant, pas « retour à la normale »)**

1. Sur la pointe pure de `release/v4.0.0` : exécutez `npm run quality:headroom --json` pour consignation, puis
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ainsi que
   `--update` pour chaque contrôle de typecheck — chaque référence est abaissée à la valeur mesurée.
2. Supprimez `_policy` de `quality-baseline.json` (réactive `--require-tighten` et la
   capitalisation nocturne), puis rétablissez `THRESHOLD = 36` (ou une valeur supérieure) dans `check-openapi-coverage.mjs`.
3. Renforcez les seuils au-delà des valeurs mesurées là où la modularisation a porté ses fruits : ramenez le `cap` de taille de fichier à 1000
   (ou 800), augmentez les seuils minimaux de couverture de 5 et fixez à 0 les exports morts pour les packages modularisés.

## Référence à effet de cliquet (`quality-baseline.json`)

Le moteur à effet de cliquet (`scripts/quality/check-quality-ratchet.mjs`) lit `quality-baseline.json`
et le compare au fichier `quality-metrics.json` nouvellement généré. Toute métrique qui régresse
au-delà de son epsilon fait échouer le build.

Métriques actuellement suivies :

| Métrique              | Direction | Signification                                           |
| --------------------- | --------- | ------------------------------------------------------- |
| `eslintWarnings`      | `down`    | Le nombre d’avertissements ESLint ne doit pas augmenter |
| `coverage.statements` | `up`      | La couverture des instructions ne doit pas diminuer     |
| `coverage.lines`      | `up`      | La couverture des lignes ne doit pas diminuer           |
| `coverage.functions`  | `up`      | La couverture des fonctions ne doit pas diminuer        |
| `coverage.branches`   | `up`      | La couverture des branches ne doit pas diminuer         |

Pour mettre à jour la référence après une amélioration réelle :

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

L’option `--update` écrit les valeurs actuellement mesurées dans `quality-baseline.json`.
Validez ce fichier avec la modification qui a amélioré la métrique. Une PR qui améliore une
métrique sans mettre à jour la référence sera détectée par `--require-tighten` (Phase 6A.5,
implémentation en attente).

### Cliquet CodeQL : fréquence d’actualisation et déclenchement manuel

`check:codeql-ratchet` lit **l’état du dépôt, actualisé selon une planification — et non pour chaque PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` indique
`state: configured`, `schedule: weekly` : il s’agit de l’analyse de configuration par défaut de GitHub,
et non d’une analyse effectuée à chaque push. Conséquence : après la fusion d’une PR qui CORRIGE des
alertes, le cliquet continue de lire l’ancien nombre, plus élevé, jusqu’à l’exécution de la prochaine
analyse planifiée — il signale donc une régression sur chaque PR ouverte, y compris sur les PR de suivi
de la PR corrective elle-même, jusqu’à ce que l’analyse soit actualisée.

**Actualisation manuelle** : `gh workflow run codeql.yml --ref release/vX.Y.Z` relance
l’analyse et republie les alertes en quelques minutes. Lisez d’abord `.github/workflows/codeql.yml`
— son en-tête explique qu’il utilise uniquement `workflow_dispatch` **car il entre en conflit avec
la « configuration par défaut » de GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). La restauration des déclencheurs `push`/`pull_request`/
`schedule` nécessite d’abord une **action du propriétaire** : Settings → Code security →
CodeQL: Default → Advanced. N’ajoutez pas de déclencheur `schedule:` sans effectuer ce changement —
cela ne produirait que des exécutions en échec.

**Resserrez la référence après la baisse du nombre** — `node scripts/check/check-codeql-ratchet.mjs
--update` écrit le nouveau nombre mesuré dans `quality-baseline.json` →
`metrics.codeqlAlerts.value`, afin que le cliquet n’autorise pas silencieusement une régression jusqu’à
l’ancien plafond. Exemple concret (2026-09-02/03) : la PR #12502 a corrigé 7 alertes réelles
(13 → 6 alertes ouvertes mesurées) ; la PR #12530 a resserré la référence figée de 11 → 6 pour
la faire correspondre ; les 6 alertes restantes ont ensuite été rejetées avec une justification
propre à chacune, ramenant leur nombre à 0 alerte ouverte.

**Les rejets relèvent de la décision de l’opérateur (Règle stricte nº 14)** — ne rejetez jamais une
alerte CodeQL sans consigner la justification technique dans le commentaire de rejet : `won't fix`
pour une exigence d’un protocole en amont, `used in tests` pour une fixture de test, `false positive`
pour un assainisseur que CodeQL ne peut pas détecter (précédent : `docs/security/ERROR_SANITIZATION.md`).

---

## Politique de nouvelle tentative des tests (WS5.4, v3.8.49)

Les nouvelles tentatives sont configurées par runner, jamais globalement — une nouvelle tentative globale transforme de véritables régressions
en instabilités invisibles :

| Runner           | Politique                                                                                                                                                             | Pourquoi                                                                                                                                                                            |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` uniquement dans la CI, avec `trace: on-first-retry`                                                                                                      | La temporisation du navigateur/réseau est réellement non déterministe ; une nouvelle tentative avec une trace transforme une instabilité en artefact exploitable pour le diagnostic |
| Vitest           | AUCUNE nouvelle tentative globale. Un test dont l'instabilité est avérée reçoit une nouvelle tentative explicite par test (visible dans le diff, examinée dans la PR) | Conserve la liste de quarantaine dans le dépôt, sans jamais la rendre opaque                                                                                                        |
| node:test (unit) | AUCUNE nouvelle tentative, sans exception                                                                                                                             | Un test unitaire instable est un bug dans le test — corrigez-le, ne le relancez pas au hasard                                                                                       |

SLO cibles une fois la télémétrie des instabilités disponible (WS5.2/5.3) : taux d'instabilité <1 % par test
(seuil « corriger maintenant »), taux de réussite ≥95 % par pipeline. Valeurs de référence du secteur —
à recalibrer d'après nos propres mesures.

## Dérive des cliquets au niveau de la release (WS5.5, v3.8.49)

Lorsqu'un cliquet (taille de fichier, complexité, avertissements eslint) régresse sur la pointe PURE de la release
— c'est-à-dire que la COMBINAISON des fusions l'a fait régresser et qu'aucune PR prise isolément ne reproduit
la régression sur sa propre branche — la correction incombe au **responsable de la release, une seule fois, sur la
branche de release** : privilégiez l'extraction ou le refactoring ; ne redéfinissez la référence qu'avec l'entrée
de justification documentée. Ne reportez jamais une dérive combinée sur la PR d'un contributeur et ne
redéfinissez jamais la référence pour chaque PR (cela masque les véritables régressions). Commencez par faire
la distinction : reproduisez l'échec sur la pointe pure dans un worktree d'investigation avant de supposer que votre PR l'a causé.

## Enregistrement des réductions de cliquets — la direction descendante (#8584)

Le cliquet n'est qu'à moitié automatique, et c'est la mauvaise moitié. **Augmenter** une limite consiste en une
modification JSON manuelle qui prend dix secondes et constitue le moyen le plus rapide de débloquer une PR en échec.
**Réduire** une limite exige que quelqu'un exécute `--update` et commite le résultat — et jusqu'à l'arrivée
du job `bank-ratchet-shrinks`, aucun workflow ne le faisait. Conséquence mesurée
(2026-07-25) : 18 fichiers gelés se trouvent déjà au niveau ou en dessous de la limite de 800 lignes pour les nouveaux fichiers, le pire
étant à 132× (`src/shared/validation/schemas.ts`, 19 lignes pour une limite de 2 523) ; le
plafond de complexité est passé de `1794 → 2169` au fil d'environ 37 notes de redéfinition de référence, avec exactement une
diminution (−1) ; et « resserrer via `--update` au prochain cycle » a été écrit 31 fois et respecté
une seule fois. Une limite qui survit au code qui l'a justifiée transforme silencieusement chaque
décomposition achevée en marge de croissance pour la prochaine personne qui modifiera le fichier.

`nightly-release-green.yml` → le job **`bank-ratchet-shrinks`** referme cette boucle :

|             |                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Exécuté sur | `schedule` (3×/jour) + `workflow_dispatch` — délibérément **pas** sur `push`                                                     |
| Mesure      | la branche `release/vX.Y.Z` la plus élevée, avec la même résolution et la même protection contre l'injection que `release-green` |
| Écrit       | `check:file-size --update` et `check:complexity-ratchets --update` (tous deux uniquement réducteurs par conception)              |
| Vérifie     | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                         |
| Livre       | une seule PR toujours à jour ciblant la branche de release — mise à jour forcée, sans jamais générer de spam                     |

L'enregistrement est effectué par lots plutôt qu'à chaque push, car il n'a aucune exigence de latence (une réduction
enregistrée sous 8 h convient), tandis qu'une exécution à chaque fusion reconstruirait la branche de la PR à plusieurs reprises
pendant les campagnes de fusion et paierait à chaque fois le coût d'un parcours ESLint complet. La détection reste déclenchée lors du
push (`release-green`) ; seul l'enregistrement est effectué par lots.

### Le vérificateur de sécurité

Le job écrit dans les références sans surveillance ; `verify-ratchet-bank.mjs` est donc ce qui rend
cela acceptable. Il compare l'arborescence après `--update` à `HEAD` et **interrompt le job
avant qu'un commit n'existe** — sans ouvrir de PR — sauf si chaque modification correspond à l'un des cas suivants :

- une entrée numérique `frozen` / `testFrozen` **réduite** ou **supprimée**
- `complexity-baseline.json` → `count` **réduit**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **réduit**

Toute autre modification provoque un échec : augmenter un nombre, ajouter une entrée, modifier `cap`/`testCap`, ou
supprimer/réécrire une note `_rebaseline_*` (ces notes constituent la piste d'audit expliquant l'existence de chaque
plafond et sont stockées dans le même objet `frozen` que les entrées de fichiers).
Un bot capable d'augmenter une limite serait strictement pire que le statu quo. Protection contre les
régressions : `tests/unit/verify-ratchet-bank.test.ts`.

Le job n'effectue jamais de push vers `release/*` — un humain fusionne la PR, de sorte qu'une mauvaise mesure
ne puisse pas être intégrée sans examen.

## Politique de liste d’autorisation

Chaque garde qui ne peut pas échouer en raison de violations préexistantes utilise une liste d’autorisation figée
(par exemple, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La politique est la suivante :

**Corrigez la cause racine ; n’utilisez la liste d’autorisation que lorsque la violation est préexistante et
ne peut pas être corrigée dans la même PR.**

Lors de l’ajout d’une entrée à une liste d’autorisation :

1. Incluez un commentaire avec la justification.
2. Référencez le ticket de suivi (par exemple, `// #3498 — Fonctionnalité de la phase 2, pas encore implémentée`).
3. Supprimez l’entrée dans la même PR que celle qui corrige la violation — une entrée obsolète qui ne
   masque plus une violation active constitue elle-même un défaut (le contrôle des règles obsolètes de 6A.3
   fera échouer la garde pour une entrée orpheline de la liste d’autorisation une fois implémenté).

N’ajoutez **pas** d’entrées à la liste d’autorisation pour accélérer la réussite des tests. Une garde au vert avec une
liste d’autorisation qui s’allonge donne une fausse impression de qualité.

### Lorsqu’une garde échoue sur votre PR

1. **Lisez attentivement la sortie de la garde** — elle vous indique précisément quel fichier ou symbole a enfreint
   la règle.
2. **Corrigez la violation** — la plupart des gardes sont des vérifications déterministes du système de fichiers qui réussissent dès que
   le code est correct.
3. **Si la violation est préexistante** (c’est-à-dire que vous ne l’avez pas introduite, mais que la garde
   la couvre désormais) : ajoutez une entrée à la liste d’autorisation avec un commentaire de justification et un ticket de suivi.
4. **Si la garde est un mécanisme à seuil progressif** (couverture, avertissements ESLint, duplication, complexité) :
   votre modification a dégradé la métrique. Corrigez le problème sous-jacent ou, dans de rares cas, exécutez
   `npm run quality:ratchet -- --update` si la modification est intentionnelle et si la
   dégradation de la métrique est acceptable — mais expliquez pourquoi dans la description de la PR.
5. **Les gardes consultatives** (`continue-on-error: true`) sont informatives — elles ne bloquent pas
   la fusion, mais apparaissent dans le récapitulatif de la CI. Corrigez-les malgré tout.

---

## Ajout d’une nouvelle garde

1. Créez `scripts/check/check-<name>.mjs` (ou `.ts`). Les gardes de politique se terminent avec le code 0/1.
   Les gardes à seuil progressif émettent une métrique dans `quality-metrics.json` via `collect-metrics.mjs`.
2. Ajoutez `"check:<name>": "node scripts/check/check-<name>.mjs"` à `package.json`.
3. Intégrez-la dans `.github/workflows/ci.yml` sous la tâche appropriée
   (politique → `lint` ou `docs-sync-strict` ; seuil progressif → `quality-gate`).
4. Si elle possède une liste d’autorisation, appliquez `reportStaleEntries()` depuis
   `scripts/check/lib/allowlist.mjs` afin que les entrées obsolètes soient détectées automatiquement.
5. Écrivez un test dans `tests/unit/build/` couvrant la logique de détection de la garde.
6. Mettez à jour ce document (ajoutez une ligne au tableau de la tâche concernée).

---

## Outillage pour agents : LSP intégré à la boucle (facultatif)

Au-delà des gardes de la CI, OmniRoute fournit une structure `agent-lsp` **facultative**
(un fichier `.mcp.json` au niveau du projet, tâche 15 de la phase 7). Créez `.mcp.json`
pour exposer un serveur de langage TypeScript aux agents de programmation, afin qu’ils résolvent les symboles /
diagnostics **avant** d’écrire du code — un complément de compilation avant validation à
`typecheck:core` qui élimine à la source les erreurs de « symbole inventé ». Ce fichier n’est volontairement
pas chargé automatiquement (vous choisissez et vérifiez le pont MCP↔LSP) ; une entrée défectueuse ne fait que consigner une
erreur de connexion et n’interrompt jamais les sessions.

---

## Backlog de rationalisation (revue du ROI — Phase 9 Vague 3)

Cet inventaire a été rapproché de `ci.yml` le 2026-06-17 (la version précédente omettait
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Une revue du ROI de l’ensemble rapproché
a permis d’identifier les candidats à la rationalisation suivants. **Les fusions sont des
modifications mécaniques de la CI ; les basculements/suppressions sont des décisions de
politique réservées à l’opérateur.** Aucun des éléments ci-dessous n’est encore appliqué.

**Également non documentés ci-dessus** (consultatifs, signal faible) : la tâche `docs-lint`
(markdownlint + Vale, avec `continue-on-error` pour l’ensemble de la tâche) et les workflows
d’analyse autonomes `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
figure dans `quality-baseline.json`, mais n’est relié à aucun cliquet bloquant dans
`ci.yml` — cette métrique est actuellement orpheline.

### Fusion / déduplication (mécanique, risque moindre)

Chaque candidat a été validé par rapport à l’état réel des contrôles le 2026-06-17
(vérifier malgré la confiance) ; plusieurs fusions « évidentes » se sont avérées masquer
de la dette et **ne** peuvent **pas** être appliquées directement.

- **`check:docs-sync` est exécuté deux fois** — de manière autonome dans la tâche `lint`, puis à nouveau dans `check:docs-all` (`docs-sync-strict`) et dans le hook de pré-commit husky. ✅ **TERMINÉ** — invocation autonome supprimée de `lint`.
- **Analyse des CVE** — ❌ **PAS une fusion directe.** `audit:deps` échoue de manière bloquante pour toute CVE de gravité élevée/critique ; `check:vuln-ratchet` (osv) n’échoue qu’en cas de _régression_ par rapport à la référence (actuellement 1 MODERATE). Les sémantiques sont différentes — supprimer `audit:deps` ferait perdre le contrôle absolu des vulnérabilités élevées/critiques. Conserver les deux.
- **Détection des cycles** — ❌ **PAS une fusion directe.** `check:circular-deps` (dpdm) signale **91 cycles** (c’est pourquoi il est consultatif) ; il ne peut pas devenir bloquant avant leur résolution et sa portée est plus large que celle du contrôle `check:cycles`, ciblé et au vert. Conserver `check:cycles` comme contrôle bloquant ; la résolution des 91 cycles dpdm constitue un backlog distinct.
- **Complexité** — ✅ **TERMINÉ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`) : un seul parcours ESLint, avec comptage par ruleId afin que les références de complexité cyclomatique et de nombre maximal de lignes restent indépendantes des références cognitives ; les contrôles individuels `check:complexity` / `check:cognitive-complexity` sont conservés pour l’utilisation locale de `--update`.
- **Anti-hallucination de `/api`** — ✅ **TERMINÉ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`) : un seul inventaire du système de fichiers de `src/app/api` ; openapi-routes + docs-symbols continuent de produire des rapports indépendants ; les contrôles individuels sont conservés pour les exécutions locales.
- **`check:node-runtime` est exécuté dans 11 tâches** — ⚠️ **ROI faible.** Chacune s’exécute sur un runner distinct et le contrôle prend moins de 1 s ; l’économie totale est d’environ 10 s, au prix de la perte d’une protection peu coûteuse pour chaque tâche. Le bouleversement n’en vaut pas la peine.
- **`typecheck:noimplicit:core` dans le lint de la CI** — ✅ **supprimé de la tâche lint** (était consultatif avec `continue-on-error`) ; la surface de typage bloquante est assurée par `typecheck:core` + `check:type-coverage`. Script local conservé.

### Basculer / décider (politique de l’opérateur)

- `check:openapi-security-tiers` (consultatif) — ❌ **PAS directement basculable.** Il se termine avec le code 0, mais avertit que plusieurs routes `traffic-inspector` sous `LOCAL_ONLY_API_PREFIXES` ne disposent pas de l’annotation `x-loopback-only: true`. Son application stricte nécessite d’abord l’ajout de ces annotations à `openapi.yaml`.
- `typecheck:noimplicit:core` (consultatif) — largement couvert par le cliquet bloquant `check:type-coverage`. Le convertir en cliquet ou supprimer ce second passage `tsc` redondant.
- `test:vitest:ui` (désormais **bloquant**) — les échecs préexistants sont explicitement exclus dans `vitest.config.ts` avec des commentaires de suivi `// #8618` ; tout nouvel échec fait échouer la tâche.
- `check:secrets` (gitleaks, cliquet bloquant figé à 3 faux positifs documentés) — ajouter les 3 à la liste d’exclusion pour atteindre 0, ou rétrograder le contrôle en consultatif. Chevauche l’analyse native des secrets de GitHub + `check:public-creds`.
- `check:pr-evidence` (bloquant, recherche des motifs dans le texte du corps de la PR) — risque élevé de faux positifs ; sa suppression affaiblirait l’application de la règle stricte nº 18, il s’agit donc d’une véritable décision de politique.
- `semgrep` (contrôle autonome consultatif) — chevauche CodeQL pour les familles OWASP ; relier sa référence à un cliquet ou le supprimer.

---

## Documentation connexe

- Chaîne d’approvisionnement (provenance, SBOM, Trivy, Scorecard) : [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — contrôle de parité des ensembles de clés

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, tâche `i18n-ui-coverage`).
Compare l’ensemble des clés terminales de chaque fichier `src/i18n/messages/<locale>.json` à celui de `en.json` et échoue
pour toute clé terminale absente ou supplémentaire, quelle que soit la date à laquelle elle a été ajoutée. Les espaces réservés
`__MISSING__:` sont considérés comme présents (leur contenu relève du contrôle de ratio). Il constitue le complément absolu
des deux contrôles basés sur les différences/pourcentages : `check-ui-keys-coverage` impose un seuil minimal de 80 % par
locale (43 clés absentes sur environ 13 000 donnent encore 99,7 %) et `check-new-key-coverage` évalue
uniquement les clés qu’une PR ajoute à `en.json`. Un lot de locales est généré à partir de la version de `en.json` disponible le jour
où sa branche est créée, puis sa traduction prend plusieurs jours pendant que la branche de base continue d’ajouter des clés ; la PR du lot n’ajoute elle-même
aucune clé, si bien que les deux contrôles apparentés sont restés silencieux lorsque le lot 1 (#13044) a été fusionné avec 43 clés manquantes dans neuf
locales, et le lot 2 (#13660) avec 10 clés manquantes dans huit locales (2026-09-15). Pour corriger un échec, utilisez
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ; une clé terminale `extra`
signifie que la source l’a supprimée — supprimez-la de la locale. `--warn` produit un rapport sans provoquer d’échec.
`--catalog=cli` exécute la même comparaison sur `bin/cli/locales` (`npm run i18n:check-keys:cli`) ;
les deux étapes se trouvent dans la tâche `i18n-ui-coverage`.

#### `check-new-key-coverage` — contrôle i18n des nouvelles clés

Contrôle apparenté à `check-ui-value-drift`. Ce dernier détecte une valeur anglaise qui a été **réécrite**
alors que ses traductions n’ont pas été mises à jour ; celui-ci détecte une clé anglaise qui a été **ajoutée**
sans que certaines locales ne la reçoivent.

`check-ui-keys-coverage` ne peut pas détecter ce type de problème : il impose un seuil de pourcentage par locale, et
onze clés absentes sur environ 13 000 maintiennent la couverture à 99,9 %. Un pourcentage par langue ne peut pas
exprimer « cette fonctionnalité a été livrée sans traduction » — une fonctionnalité entière peut arriver dans une nouvelle locale sans
aucun texte sans jamais faire varier ce chiffre.

L’incident qu’il formalise : la phase 3 de l’Orchestration Canvas a traduit ses onze clés dans
les 42 locales qui existaient alors. Quelques heures plus tard, le lot des langues de l’UE (#13044) a porté le dépôt
à 51 locales, et les neuf nouvelles (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ne les ont jamais
reçues. `deepMergeFallback` remplace une clé absente par sa version anglaise ; le problème s’est donc manifesté
par une interface non traduite plutôt que vide — un problème réel et silencieux par conception.

Comme son contrôle apparenté, il est **conscient des différences** : il compare l’anglais au point de divergence avec l’arborescence
de travail, de sorte que les lacunes préexistantes restent figées et que l’activation du contrôle ne nécessite aucune migration.

**Un marqueur `__MISSING__:<english>` ne satisfait pas ce contrôle (depuis le 2026-09-17).** Il constituait auparavant le
mécanisme de report documenté — l’environnement d’exécution se rabat sur un anglais correct — jusqu’à ce que huit PR de fonctionnalités du
2026-09-16 ajoutent 61 clés et placent le marqueur dans les 65 locales au lieu de les traduire : ce
contrôle les a toutes acceptées, rien n’a bloqué les PR, puis le contrôle bloquant du ratio de traductions réelles
a échoué à la pointe de la version pour tout le monde (pt-BR 3,2 % > 2,5 % + 0,5). Un marqueur est désormais considéré
comme une traduction absente. Pour corriger un échec, utilisez
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ou
traitez toutes les locales en parallèle avec `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
compatible avec une exécution détachée et refusant de démarrer sans les variables d’environnement `OMNIROUTE_TRANSLATION_*`). Une clé qui doit rester
en anglais (nom de produit, moteur ou indicateur imposé) doit figurer dans `scripts/i18n/untranslatable-keys.json`,
jamais derrière un marqueur. `vi` interdit totalement les marqueurs (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — contrôle des tests mis de côté

Un fichier figurant dans la liste `exclude` de `vitest.config.ts` est un test qui ne s’exécute pas, mais qui donne une impression de
couverture à quiconque parcourt l’arborescence. Soixante-deux fichiers se sont accumulés derrière le commentaire
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Le ticket #8618 a été fermé le
2026-08-11 alors que la liste qu’il suivait est passée de 45 à 62 entrées, chacune des nouvelles entrées héritant d’un commentaire
renvoyant vers un ticket clos. Lorsque la liste a finalement été mesurée fichier par fichier (#13204), **51 des 62
tests réussissaient sur l’arborescence actuelle sans aucune modification du code source**.

Le contrôle exige que chaque exclusion correspondant à un fichier réel (a) indique un ticket de suivi et
(b) figure dans `config/quality/vitest-exclusions.json` avec son état mesuré, afin que tout ajout apparaisse comme une
différence vérifiable dans un fichier dédié plutôt que comme une ligne supplémentaire dans un tableau de 60 entrées. Il ne
réexécute délibérément pas les tests exclus — cela prend environ 10 minutes et relève d’une tâche périodique ; l’inventaire
consigne la date de la dernière mesure de chacun.
