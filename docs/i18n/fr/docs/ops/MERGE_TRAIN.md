# Merge Queue & Manual Merge-Train Runbook (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Depuis la v3.8.49 (WS3.2/WS3.4 du plan qualité/vélocité), le chemin de fusion par défaut des
PR examinées vers `release/vX.Y.Z` est la **file de fusion Mergify** (`.mergify.yml`) ;
le **train de fusion manuel** décrit ci-dessous est la SOLUTION DE REPLI — utilisée pendant les incidents,
les gels de version, ou si jamais l’offre Open Source de Mergify venait à changer.

## Chemin par défaut : la file d’attente Mergify

1. La PR est examinée/validée par les campagnes et approuvée par le garde-fou ⭐
   de pré-fusion du propriétaire (le rapport + la décision pour chaque élément — voir l’étape 0.75 de `/merge-prs`).
2. Le propriétaire (ou la session agissant conformément à la décision du propriétaire) applique le label **`queue`**.
   Ce label CONSTITUE l’approbation de la fusion ; Mergify ne fait que l’exécuter.
3. Mergify valide les PR en file d’attente **séquentiellement** (une à la fois) par rapport aux garde-fous rapides
   et les fusionne (squash). Le traitement par lots + la bissection automatique nécessitent une offre Mergify payante
   (« Cannot use Merge Queue batch » avec l’offre gratuite, #7220) ; `.mergify.yml` ne définit donc aucun
   `batch_size` ; le traitement par lots reste du ressort du train de fusion manuel ci-dessous. Une PR dont
   les vérifications sont toujours en attente après `checks_timeout` (240 min = 2× le p95 mesuré de
   `quality.yml`) est retirée de la file d’attente au lieu de la bloquer.
4. Après la fusion, le workflow continu de validation de release vérifie la nouvelle pointe lors du push
   et ouvre une issue d’attribution si la combinaison introduit une régression (aucun retour en arrière automatique).

Garde-fous (reprennent les règles strictes #21/#22 de `CLAUDE.md`) :

- **Gel de release en cours** → n’appliquez PAS de label aux PR ciblant la branche gelée ; reciblez-les d’abord vers
  la branche `release/vX+1` active.
- **PR en cours d’une autre session** → ne lui appliquez jamais de label ; seule la session propriétaire place
  son propre travail dans la file d’attente.
- Les diffs portant uniquement sur les tests et les PR portant le label `hotfix` exécutent déjà une CI réduite (voir
  `RELEASE_CHECKLIST.md` → Voie rapide des correctifs) ; les conditions de la file d’attente acceptent tout
  ensemble de vérifications effectivement exécuté (`#check-failure=0` + `#check-pending=0`).

## Solution de repli : le train de fusion manuel

Utilisée lorsque la file n’est pas disponible. Cette procédure formalise la pratique qui a permis de traiter 33 PR
en une journée pendant le cycle v3.8.47 :

1. **Constituez le lot** (environ 10 à 30 PR examinées et approuvées). Recherchez les collisions `linked:`
   (mêmes `tap.testFiles`, mêmes sections du CHANGELOG) et traitez-les en série.
2. **Validez UNE SEULE FOIS** : dans un worktree isolé créé à partir de la pointe de la branche de version, fusionnez localement toutes les
   têtes du lot, puis exécutez la suite équivalente à celle de la version
   (`npm run check:release-green`, ajoutez `--with-build` avant une publication).
   `scripts/release/merge-train.sh <base> <PR#>…` automatise les étapes 1 et 2 (les
   PR en conflit sont éjectées, le train continue). Le mode complet exécute `npm run test:unit` — le
   lanceur optimisé pour la machine (`--test-concurrency=20`), **et non** les deux fragments CI séquentiels
   à 4 cœurs, qui maintenaient la phase dominante à environ 25 % d’utilisation d’une machine à 16 cœurs (corrigé
   le 2026-07-18). `--fast` (traitement de méga-trains au cours d’une même journée, approuvé par le propriétaire le 2026-07-18)
   conserve tous les contrôles statiques + vitest, mais n’exécute que les fichiers node:test modifiés par les
   PR embarquées ; la suite COMPLÈTE doit néanmoins être exécutée au moins une fois par jour sur la
   pointe cumulée (un train sans `--fast`).
3. **Succès** → fusionnez les PR dans l’ordre (en revérifiant `state,headRefOid` avant chacune —
   une PR dont la tête a changé doit être réexaminée). Vérifiez que le diff net de chaque fusion correspond
   aux propres modifications de la PR (aucune réversion par résolution automatique : contrôlez `git diff --stat`
   pour détecter les suppressions hors périmètre).
4. **Échec** → divisez le lot par moitiés (validez chaque moitié) au lieu de revalider
   chaque PR individuellement ; replacez la PR fautive dans la file d’examen, accompagnée des éléments probants.
5. **Jamais** : effectuer une fusion vers la branche gelée pendant un gel ; utiliser `git stash` où que ce soit ;
   relancer aveuglément la CI dans l’espoir qu’un échec disparaisse (règle : un échec est une information).

## Niveaux (pourquoi la file est sûre avec uniquement les contrôles rapides)

- **Par PR** (contrôles rapides de quality.yml) : tests affectés selon la TIA + suite unitaire complète en 4 fragments +
  vitest + ensemble de contrôles lint + vérification des types + intégrité de la documentation/du changelog.
- **Par lot/pointe** (validation continue de la version) : contrôles STRICTS `--quick` à chaque push vers
  la branche de version ; balayages complets `--with-build --full-ci` 3 fois par jour.
- **Par version** (ci.yml sur la PR de version) : matrice complète, notamment E2E ×9,
  artefact de package + test de démarrage sommaire de l’archive tar, couverture/seuils progressifs.

Rien n’est moins validé qu’auparavant — les contrôles lourds s’exécutent simplement par lot/pointe
plutôt que par PR, ce qui supprime les allers-retours en O(N).

## Prérequis pour `merge-train.sh` sur un checkout neuf

Le script exécute un **contrôle préalable** à arrêt immédiat en cas d’échec sur le checkout racine (avant toute opération
sur un worktree), afin qu’une installation défectueuse ne puisse jamais se faire passer pour un train en échec :

1. Exécutez `npm ci`, puis le script postinstall de `bun` bloqué par npm :
   `(cd node_modules/bun && node install.js)` — sinon `check:provider-consistency`
   et `check:known-symbols` (tous deux via `bun scripts/…`) échouent sur le train ET sur la base,
   sans ligne indiquant une violation.
2. Aucun `node_modules/node_modules` parasite (un arbre de dépendances dupliqué ; React est chargé deux fois
   et les suites vitest de l’interface utilisateur échouent immédiatement).
3. `node_modules/.bin/tsc` doit être présent et exécutable (il manque dans une installation partielle).

Le train exécute la commande bloquante `npm run check:cycles:ratchet` ; la commande simple `npm run check:cycles`
est informative (elle répertorie les SCC et renvoie un code différent de zéro même sur une base saine).
