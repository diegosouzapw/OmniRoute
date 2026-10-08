# Release-Green: keeping the queue and release branch green (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Le problème résolu

La **validation complète** (`.github/workflows/ci.yml` — partitions de tests unitaires, vitest, seuils de non-régression,
`package-artifact`, SonarQube, E2E) s’exécute **uniquement sur la PR de release** (PR → `main`). Les PR ciblant
`release/**` reçoivent les **validations rapides** (`quality.yml` : tests impactés par TIA + vérification des types + lint)
et, pour les modifications de code, un build de production **à titre indicatif**. Conséquence : les échecs propres à la release peuvent encore
s’accumuler silencieusement sur la branche de release et **exploser par vagues d’environ 40 min** au moment de la release,
un par un.

La « famille release-green » existe pour **anticiper** ces échecs — valider l’équivalent de la validation complète
**localement / hors release**, à tout moment, afin que la PR de release soit déjà
verte dès sa première exécution de la CI.

> **Principe non négociable :** rien de tout cela ne bloque le contributeur. Nous n’ajoutons pas de
> vérification obligatoire susceptible de faire échouer sa PR. La **dérive** (seuils de non-régression) doit être recalibrée par le mainteneur lors de la release —
> elle ne concerne jamais le contributeur. Aucun élément ne **ferme** une PR (appropriation du mérite) ni
> **affaiblit** un test pour le faire passer.

## La famille (4 éléments) — et comment chacun s’exécute indépendamment

| Élément                                                                    | Description                                                                                        | Quand l’exécuter                                                                 | Périmètre                                  |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------ |
| **`/green-prs`** (Solution A)                                              | Analyse à la demande par le mainteneur de la **file des PR ouvertes**                              | **Indépendamment, périodiquement** — et surtout **avant** un `/generate-release` | Ensemble de la file des PR → `release/**`  |
| **`/validate-release-green`** (Solution C — `npm run check:release-green`) | Moteur de validation : reproduit la validation complète sur une branche OU un candidat à la fusion | Indépendamment, à tout moment                                                    | Une branche spécifique ou une PR de fusion |
| **`/babysit <PR#>`**                                                       | Pilote la **CI en direct** d’**une** PR jusqu’à ce qu’elle soit verte                              | Indépendamment, pour chaque PR                                                   | Une seule PR                               |
| **`nightly-release-green.yml`** (Solution D)                               | Workflow nocturne automatisé ; ouvre une issue en cas d’échec BLOQUANT                             | Automatiquement (cron)                                                           | La branche de release active               |

**Réponse courte à la question « est-ce uniquement destiné aux releases ? » :** **non.** `/green-prs` a été conçu pour
s’exécuter **périodiquement, entre les releases**. L’exécution indépendante est le mode d’utilisation normal — la release est simplement
le moment où son exécution apporte le plus de valeur.

## Build consultatif de la PR à la release

`quality.yml` inclut désormais `Build (advisory)` pour les PR de code qui ne sont pas des brouillons et les branches de file d’attente Mergify.
Il reproduit la recette de build de production de `ci.yml` : Node 24, `npm-ci-retry`,
`check:node-runtime` et `npm run build` avec `OMNIROUTE_USE_TURBOPACK=1`. Il n’envoie intentionnellement
aucun artefact de build, car aucune tâche de qualité en aval n’en consomme dans ce workflow.
Supprimez `continue-on-error` après une semaine d’exécutions stables des PR de release afin que ce signal devienne une
barrière bloquante entre la PR et la release.

## Solution C — `npm run check:release-green` (le moteur)

Reproduit une validation équivalente à celle de la release sur l’arborescence de travail actuelle et classe chaque échec :

- **HARD** (vérification des types, erreurs de lint, tests unitaires, vitest, db-rules, public-creds, et éventuellement
  `package-artifact`) → **véritable défaut** ; `exit 1`. Corrigé sur la branche source (TDD, règle nº 18).
- **DRIFT** (**avertissements** eslint, complexité cognitive, taille des fichiers) → dérive des seuils accumulée au cours
  du cycle, **qui n’est pas imputable au contributeur** ; elle est uniquement signalée et **les valeurs de référence sont
  réinitialisées par le mainteneur lors de la release**. La dérive ne modifie **jamais** le code de sortie — elle ne bloque donc jamais personne.

```bash
npm run check:release-green                 # branche actuelle (arborescence de travail)
node scripts/quality/validate-release-green.mjs --json   # sortie structurée
node scripts/quality/validate-release-green.mjs --quick  # ignore les tests unitaires et vitest (dérive, vérification des types et lint uniquement)
node scripts/quality/validate-release-green.mjs --with-build  # inclut package-artifact (lent)
```

Effectue uniquement le diagnostic et le **signale** (aucune correction automatique). L’orchestration de la remise au vert se trouve dans
`/green-prs` et `/review-prs`.

## Solution A — `/green-prs` (l’analyse de la file d’attente)

Procédure (résumé — consultez la compétence `green-prs` pour plus de détails) :

1. **Inventorier** la file d’attente des PR ouvertes ciblant la branche de release active.
2. **Trier** chaque PR (viable / à rejeter / intervention de l’auteur requise) — les PR à rejeter ou nécessitant l’intervention de l’auteur sont
   **signalées, mais pas fermées** (la décision revient à l’auteur).
3. Pour chaque PR viable, dans une **arborescence de travail isolée** (règle nº 19), mettre la PR à jour par rapport à la pointe de la branche de release et exécuter
   `npm run check:release-green` :
   - **HARD** → corriger **sur la branche du contributeur** avec attribution conjointe (ce qui préserve le statut « Merged » de l’auteur),
     puis relancer jusqu’à ce que tous les échecs HARD soient résolus.
   - **DRIFT** → ne rien modifier ; les valeurs de référence seront réinitialisées lors de la release.
4. **Produire** un tableau PR × (verdict, échecs HARD, corrigé ?, DRIFT, conforme à la release maintenant ?).

Peut **préparer** la file d’attente sans effectuer de fusion ; ne fusionne que sur demande explicite — et ne ferme jamais une PR.

## Cadence recommandée

- Exécutez **`/green-prs` périodiquement** (par exemple chaque semaine) et **toujours avant un
  `/generate-release`**.
- Conservez **`nightly-release-green.yml`** (solution D) comme signal continu : lorsqu’il ouvre un ticket pour un
  échec HARD, il est temps de lancer une analyse.
- Utilisez **`/validate-release-green`** ponctuellement pour vérifier une branche ou un candidat à la fusion spécifique.
- Utilisez **`/babysit <PR#>`** lorsqu’une PR spécifique doit être accompagnée jusqu’au vert sur la CI active.

## Relation avec la release

- `/generate-release` appelle la validation lors de la **phase 0 (contrôles préalables)** : il réinitialise les valeurs de référence de DRIFT et corrige les
  échecs HARD avant d’ouvrir la PR de release.
- `/review-prs` utilise la barrière release-green à l’étape de décision de fusion (vert avant fusion).

L’objectif de tous ces éléments est le même : **une PR de release verte dès la première exécution de la CI**, au lieu d’enchaîner
des échecs par vagues de 40 minutes le jour de la release.
