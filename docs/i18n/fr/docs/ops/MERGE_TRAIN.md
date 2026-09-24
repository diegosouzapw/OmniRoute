# Merge Queue & Manual Merge-Train Runbook (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Depuis la v3.8.49 (WS3.2/WS3.4 du plan qualité/vélocité), le chemin de fusion par défaut des
PR relues vers `release/vX.Y.Z` est la **file de fusion Mergify** (`.mergify.yml`) ;
le **train de fusion manuel** décrit ci-dessous est la SOLUTION DE REPLI — utilisée pendant les incidents,
les gels de version ou si l’offre Open Source de Mergify venait à changer.

## Chemin par défaut : la file Mergify

1. La PR est relue/validée par les campagnes et approuvée par le point de contrôle ⭐
   préalable à la fusion du propriétaire (le rapport + la décision pour chaque élément — voir l’étape 0.75 de `/merge-prs`).
2. Le propriétaire (ou la session agissant conformément à la décision du propriétaire) applique le label **`queue`**.
   Ce label CONSTITUE l’approbation de fusion ; Mergify ne fait que l’exécuter.
3. Mergify regroupe jusqu’à 10 PR en attente, valide le lot par rapport aux contrôles rapides,
   puis les fusionne (squash). Un lot en échec est **divisé automatiquement par dichotomie** — la PR fautive
   est isolée en environ log2(N) revalidations et retirée de la file ; les autres poursuivent leur traitement.
4. Après la fusion, le workflow continu de validation de la version vérifie le nouveau sommet lors du push
   et ouvre une issue d’attribution si la combinaison a introduit une régression (jamais de réversion automatique).

Garde-fous (reprennent les règles strictes nº 21/22 de `CLAUDE.md`) :

- **Gel de version en cours** → ne PAS appliquer de label aux PR ciblant la branche gelée ; les recibler d’abord vers
  la branche `release/vX+1` active.
- **PR en cours appartenant à une autre session** → ne jamais lui appliquer de label ; seule la session propriétaire
  place son propre travail dans la file.
- Les diffs concernant uniquement les tests et les PR portant le label `hotfix` exécutent déjà une CI réduite (voir
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane) ; les conditions de la file acceptent l’ensemble de contrôles réellement
  exécuté (`#check-failure=0` + `#check-pending=0`).

## Solution de repli : le train de fusion manuel

Utilisée lorsque la file est indisponible. Elle formalise la pratique qui a permis de traiter 33 PR
en une journée pendant le cycle v3.8.47 :

1. **Constituer le lot** (environ 10 à 30 PR relues et approuvées). Rechercher les collisions `linked:`
   (mêmes `tap.testFiles`, mêmes sections du CHANGELOG) et traiter celles-ci séquentiellement.
2. **Valider UNE SEULE FOIS** : dans un worktree isolé créé à partir du sommet de la branche de version, fusionner localement toutes les
   têtes du lot, puis exécuter la suite équivalente à celle de la version
   (`npm run check:release-green`, en ajoutant `--with-build` avant une publication).
   `scripts/release/merge-train.sh <base> <PR#>…` automatise les étapes 1–2 (les
   PR en conflit sont éjectées et le train continue). Le mode complet exécute `npm run test:unit` — le
   lanceur optimisé pour la machine (`--test-concurrency=20`), **et non** les deux fragments CI séquentiels à 4 cœurs,
   qui faisaient tourner la phase dominante à environ 25 % de la capacité d’une machine à 16 cœurs (corrigé
   le 2026-07-18). `--fast` (traitement massif intra-journalier du train, approuvé par le propriétaire le 2026-07-18)
   conserve tous les contrôles statiques + vitest, mais n’exécute que les fichiers node:test modifiés par les
   PR embarquées ; la suite COMPLÈTE doit néanmoins être exécutée au moins une fois par jour sur le
   sommet accumulé (un train sans `--fast`).
3. **Succès** → fusionner les PR dans l’ordre (en revérifiant `state,headRefOid` avant chacune —
   une PR dont la tête a changé repasse en revue). Prouver que le diff net de chaque fusion correspond aux
   propres modifications de la PR (aucune réversion par résolution automatique : contrôler `git diff --stat` pour détecter
   les suppressions hors périmètre).
4. **Échec** → diviser le lot en deux par dichotomie (valider chaque moitié) au lieu de revalider
   les PR une par une ; renvoyer la PR fautive dans la file de revue avec les éléments probants.
5. **Jamais** : fusionner dans la branche gelée pendant un gel ; utiliser `git stash` où que ce soit ;
   relancer systématiquement la CI en espérant qu’un échec disparaisse (règle : un échec est une information).

## Niveaux (pourquoi la file est sûre avec uniquement les contrôles rapides)

- **Par PR** (contrôles rapides de quality.yml) : tests affectés selon la TIA + suite unitaire complète en 4 fragments +
  vitest + ensemble des vérifications lint + vérification des types + intégrité de la documentation/du changelog.
- **Par lot/sommet** (validation continue de la version) : contrôles STRICTS `--quick` à chaque push vers
  la branche de version ; campagnes complètes `--with-build --full-ci` 3 fois par jour.
- **Par version** (ci.yml sur la PR de version) : matrice complète, notamment E2E ×9,
  artefact du package + test de démarrage minimal du tarball, couverture/seuils progressifs.

Rien n’est moins validé qu’auparavant — les traitements lourds s’exécutent simplement par lot/sommet
plutôt que par PR, ce qui supprime les allers-retours en O(N).
