# Release Checklist (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Dernière mise à jour :** 2026-08-28 — v3.8.51
> Processus de publication simplifié qui exploite les compétences de Claude Code pour l’automatisation.
>
> **Maintenez la file d’attente/branche au vert entre les publications :** consultez [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (famille `/green-prs` + `npm run check:release-green` + `/babysit` + exécution nocturne). L’exécuter
> périodiquement — et en particulier **avant** cette liste de contrôle — permet à la PR de publication de démarrer au vert.

## En bref

```bash
# 1. Incrémenter la version + générer le CHANGELOG (compétence)
/version-bump-cc patch    # ou minor/major

# 2. Exécuter le contrôle qualité localement
npm run check              # lint + tests
npm run test:coverage      # seuil de couverture complet (60/60/60/60)

# 3. Compiler et effectuer les tests de bon fonctionnement
npm run build
npm run test:e2e           # facultatif, mais recommandé

# 4. Générer la publication (compétence)
/generate-release-cc

# 5. Déployer (compétence)
/deploy-vps-both-cc        # ou akamai-cc / local-cc

# 6. Capturer les preuves de publication (compétence)
/capture-release-evidences-cc
```

## Publication fiable npm (par défaut depuis v3.8.51) — intermédiaire sur demande, directe en solution de secours

`npm-publish.yml` publie par défaut via **npm Trusted Publishing (OIDC)** : la tâche
`stage-npm` (hébergée par GitHub) échange l’id-token de GitHub contre un identifiant npm
à courte durée de vie pour cette exécution — aucun jeton npm à longue durée de vie dans les secrets du dépôt, aucune invite 2FA, provenance jointe.
Il s’agit du mécanisme de contournement que npm autorise désormais, alors que les jetons permettant d’ignorer la 2FA sont en cours de retrait ;
il restaure le processus entièrement automatique dont bénéficiait le projet jusqu’à la v3.8.48, tout en conservant la
garantie WS1.3 (un jeton divulgué ne peut pas publier seul — puisqu’il n’existe aucun jeton).

**Configuration unique (propriétaire) :** npmjs.com → paquet `omniroute` → Settings → _Trusted
Publisher_ → GitHub : propriétaire `diegosouzapw`, dépôt `OmniRoute`, workflow `npm-publish.yml`
(environnement : aucun). Tant que cette configuration n’existe pas, l’étape automatique échoue avec `ENEEDAUTH` :
relancez-la avec `publish_mode=staged` (ci-dessous) ou `direct`.

### Publication intermédiaire (sur demande — `publish_mode=staged`)

Le workflow npm-publish ne publie plus directement : il démarre l’archive tar empaquetée
(`check:pack-boot`), puis exécute `npm stage publish` — les octets exacts sont placés en attente dans
le registre, **non installables** tant que le propriétaire ne les a pas approuvés. Le contrôle 2FA humain intervient
APRÈS la validation, et non plus avant.

**Processus du propriétaire une fois le workflow au vert :**

1. `npm stage list omniroute` — trouvez l’identifiant de l’étape intermédiaire (également affiché dans le résumé du workflow).
2. Vérifiez les octets placés en attente (recommandé) : `npm stage download <id>`, puis installez
   l’archive tar téléchargée dans un préfixe temporaire et démarrez-la (`npm run check:pack-boot` automatise
   la même validation empaquetage→installation→démarrage dans la CI).
3. `npm stage approve <id>` — l’invite 2FA DÉCLENCHE la publication. `npm stage reject <id>` abandonne l’opération.
4. Filet de sécurité après publication : le vérificateur post-publication (WS1.4 du plan de la v3.8.49) installe la
   version publiée depuis le registre public dans un conteneur propre et la démarre.

**Solution de secours d’urgence :** `workflow_dispatch` avec `publish_mode=direct` rétablit
l’ancien `npm publish` immédiat (à utiliser uniquement si le mécanisme intermédiaire lui-même fonctionne mal ; consignez la raison).

**Renforcement unique (propriétaire, npmjs.com) :** configurez le Trusted Publisher pour
`omniroute` en mode intermédiaire uniquement afin qu’un jeton à longue durée de vie divulgué ne puisse pas exécuter `npm publish`
directement depuis n’importe où — la CI ne peut que placer la version en attente ; seule la 2FA du propriétaire permet de la publier.

**Procédure en cas d’artefact défectueux (inchangée) :** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
comme réflexe par défaut (quelques minutes, réversible) ; `npm unpublish` uniquement dans la fenêtre de 72 h/sans dépendants
et jamais comme première mesure. Docker : ne réécrivez jamais une étiquette de version — le retour arrière consiste à
faire repointer `latest` vers le dernier digest valide.

**`latest` sur Docker Hub (obligatoire pour chaque publication SemVer stable) :** le
workflow `docker-publish` doit étiqueter **à la fois** `X.Y.Z` et, lorsque
`should-promote-latest.sh` confirme qu’il s’agit de la version SemVer stable la plus élevée, `:latest`
avec le **même digest**. Après la tâche : le digest `latest` de Hub est égal au nouveau
digest SemVer et `last_updated` a été actualisé. Ne laissez pas `:latest` pointer vers une
ancienne compilation alors que les notes de publication décrivent des correctifs qui n’existent que dans git. Les démarrages rapides
Compose utilisent `:latest` ; GitOps doit continuer à épingler `X.Y.Z`. Consultez
[Canaux de publication Docker](../guides/DOCKER_GUIDE.md#release-channels) et #10317.

## Voie rapide pour les correctifs urgents (label `hotfix`)

Une PR portant le label `hotfix` ignore la lourde matrice de CI (E2E en 9 fragments, seuil progressif de couverture,
quality-gate, quality-extended) et conserve les contrôles rapides à fort signal : build,
fragments de tests unitaires, intégration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
et le test rapide de démarrage de l’archive tar (`check:pack-boot`). Objectif : être au vert en ≤15 min au lieu d’environ 33 min.

**Politique d’accès — les quatre conditions sont obligatoires (sur le modèle des voies d’urgence de Chromium/VS Code/Node) :**

1. **Sévérité** : la production est hors service — un artefact publié plante au démarrage / un
   correctif de sécurité / chaque utilisateur de la version est affecté. « Important » ne signifie pas « hors service ».
2. **Autorité** : seul le propriétaire du dépôt applique le label `hotfix`. Le label CONSTITUE
   l’approbation — il ne doit jamais être appliqué de sa propre initiative sur une PR de campagne.
3. **Preuves** : le corps de la PR contient un lien vers la précédente exécution complète au vert (la suite que
   les tâches ignorées valideraient à nouveau), ainsi que vers le test propre au correctif, d’abord en échec puis réussi.
4. **Périmètre** : cherry-pick uniquement — le correctif minimal, sans refactorisation ni modifications annexes.

La surface de couverture/seuil progressif ignorée est validée à nouveau lors de la prochaine exécution complète sur la
branche de release (release continuellement au vert) — cette voie évite uniquement l’ATTENTE, jamais la validation.
Les diffs portant uniquement sur les tests (tous les fichiers sous `tests/`, aucun sous `tests/e2e/`) ignorent automatiquement
la matrice E2E, sans aucun label.

## Liste de contrôle détaillée

### Avant la release

- [ ] Toutes les PR ciblées pour cette release sont fusionnées dans `release/vX.Y.0`
- [ ] Tous les éléments Linear/issues ouverts pour cette version sont fermés ou reportés au prochain jalon
- [ ] CI au vert sur la branche `release/vX.Y.0`
- [ ] Aucun marqueur `TODO(release)` dans le code : `grep -r "TODO(release)" src/ open-sse/`
- [ ] Image de base Docker à jour (actuellement `node:24.15.0-trixie-slim`)

### Version et journal des modifications

- [ ] Exécuter `/version-bump-cc <patch|minor|major>` (compétence Claude Code)
  - Met à jour les versions dans `package.json`, `electron/package.json`
  - Régénère `CHANGELOG.md` à partir des commits git depuis le dernier tag
  - Met à jour les badges de README.md
- [ ] Examiner manuellement CHANGELOG.md et nettoyer les messages de commit si nécessaire
- [ ] Vérifier que la dernière section semver de `CHANGELOG.md` correspond à la version de `package.json`
- [ ] Conserver `## [Unreleased]` comme première section du journal des modifications pour les travaux à venir
- [ ] Mettre à jour `docs/openapi.yaml` → `info.version` doit correspondre à la version de `package.json`

### Qualité du code

- [ ] `npm run lint` — 0 erreur (les avertissements sont préexistants)
- [ ] `npm run typecheck:core` — aucun problème
- [ ] `npm run typecheck:noimplicit:core` — aucun problème (strict)
- [ ] `npm run check:cycles` — aucune dépendance circulaire
- [ ] `npm run check:any-budget:t11` — dans les limites du budget
- [ ] `npm run check:route-validation:t06` — aucun problème
- [ ] `npm run check:node-runtime` — version minimale d’exécution prise en charge respectée (`>=22.22.2 <23`, `>=24.0.0 <27`, conformément à `SUPPORTED_NODE_RANGE` dans `src/shared/utils/nodeRuntimeSupport.ts` ; alignée sur `engines` dans `package.json`)

### Tests

- [ ] `npm run test:unit` — réussi
- [ ] `npm run test:vitest` — réussi (serveur MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — seuil 60/60/60/60 satisfait (instructions/lignes/fonctions/branches)
- [ ] `npm run test:integration` — réussi (si les modifications concernent la BDD / les gestionnaires)
- [ ] `npm run test:combo:matrix` — réussi (matrice des stratégies combo : démontre de manière déterministe les décisions de sélection des 19 stratégies publiques de routage ; à exécuter lors de modifications du routage combo, de la résolution des stratégies ou de la logique de repli)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **facultatif/manuel** (test rapide contrôlé sur de véritables services amont ; utilise un instantané de BDD en lecture seule provenant du VPS `root@192.168.0.15` ; sollicite de vrais fournisseurs et consomme des crédits ; ne s’exécute jamais dans la CI ; est proprement ignoré sans la condition d’activation)
- [ ] `npm run test:combo:live:vps` — **facultatif/manuel** (test rapide en conditions réelles sur le VPS de phase 3 : 7 scénarios HTTP sur le serveur `.15` actif via du Node ESM standard ; nécessite `ssh root@192.168.0.15` ; crée/supprime uniquement des combos `__live_test__*` ; sollicite de vrais fournisseurs ; ne s’exécute jamais dans la CI)
- [ ] `npm run test:e2e` — réussi (modifications de l’interface utilisateur)
- [ ] `npm run test:protocols:e2e` — réussi (modifications MCP/A2A)
- [ ] `npm run test:ecosystem` — réussi

### Hooks (validés par Husky)

Les hooks Husky se trouvent dans `.husky/` et s’exécutent automatiquement lors des opérations git.

- **pre-commit :** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push :** contrôles déterministes rapides — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (activé le 2026-06-13). Exclut intentionnellement `test:unit` (lent ; couvert par la tâche CI `test-unit`).
  - Exécuter manuellement `npm run test:unit` avant de pousser les branches de release.

Si un hook échoue : corrigez le problème sous-jacent, ne le contournez pas avec `--no-verify`.

### Commits conventionnels

Tous les commits destinés à une release doivent respecter le format `type(scope): subject`.

**Types valides :** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Scopes valides :** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Changements incompatibles : ajouter le pied de page `BREAKING CHANGE:` ou `!` après le scope (par ex. `feat(api)!: drop /v0`).

### Documentation

- [ ] `npm run check:docs-sync` réussit (exécuté automatiquement par le hook de pré-commit)
- [ ] `npm run check:docs-all` réussit (commande globale : docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` se termine avec le code 0 — le contrat des variables d’environnement entre le code ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` est intact
- [ ] `npm run check:doc-links` se termine avec le code 0 — aucune référence Markdown interne cassée après la restructuration
- [ ] `docs/architecture/ARCHITECTURE.md` vérifié pour détecter toute divergence du stockage ou de l’environnement d’exécution
- [ ] `docs/guides/TROUBLESHOOTING.md` vérifié pour détecter toute divergence des variables d’environnement ou du fonctionnement opérationnel
- [ ] Si `.env.example` a changé : `docs/reference/ENVIRONMENT.md` mis à jour
- [ ] Si la nouvelle fonctionnalité possède une interface utilisateur : `docs/guides/USER_GUIDE.md` la mentionne
- [ ] Si la nouvelle fonctionnalité possède une API : `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` mis à jour
- [ ] Si la nouvelle fonctionnalité est un module : un fichier dédié `docs/<MODULE>.md` existe
- [ ] En cas de changement incompatible : `docs/guides/TROUBLESHOOTING.md` contient une note de migration

### i18n

- [ ] `npm run i18n:check` se termine avec le code 0 — l’état des traductions (`.i18n-state.json`) est synchronisé avec la documentation source (aucune source divergente en mode strict ; un avertissement en mode consultatif est acceptable pour les retouches de dernière minute de la documentation, mais le résultat doit être 0 avant la création du tag)
- [ ] `npm run i18n:check-ui-coverage` se termine avec le code 0 — chaque langue de l’interface utilisateur atteint ou dépasse le seuil de couverture de 80 %
- [ ] `npm run i18n:sync-ui:dry` signale 0 clé manquante dans les 42 langues
- [ ] Si la documentation source en anglais a changé, exécuter `npm run i18n:run` (nécessite `OMNIROUTE_TRANSLATION_API_KEY` dans `.env`) avant la création du tag
- [ ] Les contributions aux traductions peuvent être reportées à la prochaine version si elles sont mineures (les consigner dans le CHANGELOG)

### Migrations de base de données

- [ ] Si `src/lib/db/migrations/` contient de nouveaux fichiers :
  - [ ] Chaque migration est idempotente (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Les migrations sont encapsulées dans des transactions
  - [ ] Elles sont correctement numérotées (aucune interruption dans la séquence)
- [ ] Tester sur une nouvelle installation : supprimer `~/.omniroute/omniroute.db` et exécuter `npm run dev`
- [ ] Tester sur une installation existante : sauvegarder la base de données, exécuter la migration, vérifier le schéma
- [ ] Les fichiers WAL (`-wal`, `-shm`) sont correctement gérés si la migration réécrit des tables

### Catalogue des fournisseurs (validé par Zod)

- [ ] Le schéma Zod de `src/shared/constants/providers.ts` est valide au chargement
  - [ ] Tous les fournisseurs possèdent les champs requis (`id`, `label`, `kind`, etc.)
  - [ ] `freeNote` est fourni pour les nouveaux fournisseurs gratuits
  - [ ] Les fournisseurs OAuth possèdent un `oauthConfig` enregistré dans `src/lib/oauth/constants/oauth.ts`
- [ ] Si un nouveau fournisseur est ajouté : exécuteur correspondant dans `open-sse/executors/`
- [ ] Si le format n’est pas OpenAI : traducteur dans `open-sse/translator/`
- [ ] Modèles enregistrés dans `open-sse/config/providerRegistry.ts`
- [ ] Les tests unitaires dans `tests/unit/` couvrent la classification des fournisseurs et le routage

### Application de bureau (Electron)

Si `electron/` a changé :

- [ ] `npm run electron:smoke:packaged` réussit
- [ ] Les builds sont testés pour au moins une des cibles `:win`, `:mac`, `:linux`
- [ ] Les certificats de signature de code ne sont pas expirés (si une signature est utilisée)
- [ ] La version dans `electron/package.json` correspond à celle du fichier `package.json` racine
- [ ] Le pointeur du canal de mise à jour automatique est mis à jour si la publication cible `stable`

### Organisation du build

Le dépôt utilise trois répertoires de sortie distincts — ne jamais les confondre :

| Répertoire | Rôle                                                                  | Suivi ?              |
| ---------- | --------------------------------------------------------------------- | -------------------- |
| `src/`     | Code source de l’application (TypeScript / TSX)                       | Oui                  |
| `.build/`  | Fichiers intermédiaires du build — sortie de `next build` (`distDir`) | Non (ignoré par Git) |
| `dist/`    | Bundle npm distribuable — assemblé par `assembleStandalone`           | Non (ignoré par Git) |

> **Note pour l’opérateur :** le répertoire d’image du VPS distant reste `/usr/lib/node_modules/omniroute/app/`.
> Seule la sortie du build **dans le dépôt** a été déplacée (`app/` → `dist/`). Les outils de déploiement synchronisent
> le contenu de `dist/` par rsync vers le répertoire distant `app/` — aucune modification des chemins du VPS n’est nécessaire.

**Flux avec un build unique :**

```
npm run build:release
  └─ rm -rf .build dist          (nettoyage)
  └─ next build → .build/next/   (fichiers intermédiaires)
  └─ assembleStandalone          (copie le bundle autonome, les fichiers statiques, les fichiers publics et les modules natifs → dist/)
  └─ écrit dist/BUILD_SHA        (sentinelle HEAD)
```

Ne PAS exécuter `npm run build` puis une commande `npm run build:cli` distincte pour le déploiement — utiliser
`npm run build:release`, qui effectue une reconstruction propre et crée la sentinelle en une seule commande.

### Validation des artefacts

- [ ] `npm run build:release` réussit et `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` ne signale rien — aucun `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ni autre résidu local
- [ ] `dist/server.js` existe après le build
- [ ] Test fonctionnel local facultatif de l’environnement d’exécution empaqueté : `npm run dev:candidate -- validate`, après `npm run dev:candidate -- build`, démarre l’archive empaquetée avec un `DATA_DIR` isolé et vérifie `/api/health` + `/v1/models` (voir [Parcours de contribution recommandé](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Création du tag et publication

- [ ] Exécuter `/generate-release-cc` (outil Claude Code) :
  - Crée le tag `vX.Y.Z`
  - Pousse le tag et la branche
  - Crée une GitHub Release avec le contenu du journal des modifications
  - Joint les programmes d’installation Electron (s’ils ont été générés)
- [ ] Ou manuellement :
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Déploiement

Les outils de déploiement utilisent le flux rsync léger — pas de `npm pack`, ni de `npm i -g` :

- [ ] Utiliser la compétence de déploiement correspondant à la cible :
  - `/deploy-vps-local-cc` — VPS local (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — les deux
- [ ] Avant le déploiement, confirmer que `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Le build doit être exécuté là où `node_modules` est réel (checkout principal ou worktree ayant fait l’objet d’un `npm ci` — PAS un worktree avec lien symbolique)
- [ ] Effectuer un test rapide de l’instance déployée :
  - Ouvrir `/dashboard/health` → vérifier que la chaîne de version correspond à la release
  - Exécuter une requête `/v1/chat/completions` auprès d’un fournisseur connu
  - Vérifier que `/api/monitoring/health` renvoie des disjoncteurs `CLOSED`
  - Confirmer que les transports MCP répondent (`/mcp` HTTP, `/mcp-sse` SSE)

### Après la release

- [ ] Exécuter `/capture-release-evidences-cc` (compétence Claude Code)
  - Capture des captures d’écran/enregistrements WebP des nouvelles fonctionnalités
  - Les joint aux notes de release / à l’article de blog
- [ ] Mettre à jour GitHub Discussions / Discord avec l’annonce de la release
- [ ] Ouvrir un jalon pour la prochaine version
- [ ] Si critique : épingler la discussion ou publier dans `news.json` pour afficher une bannière dans l’application

### Critères de lancement public de Radar

L’annonce Radar est intentionnellement validée avec `active: false`. L’activation constitue un changement distinct
une fois que chacun des éléments ci-dessous est étayé par des preuves :

- [ ] Toutes les PR Radar empilées sont fusionnées et la CI de la branche de release est au vert
- [ ] Déployer et tester rapidement les routes OSS Radar en conservant `RADAR_ENABLED` désactivé par défaut
- [ ] Tester rapidement `GET /planos`, `/termos`, `/privacidade` et `/reembolso` sur l’hôte Radar désigné
- [ ] Enregistrer l’identité, les coordonnées et l’adresse de l’opérateur, ainsi que la validation de l’examen juridique par le propriétaire, dans le service privé
- [ ] Tester Stripe Checkout et le webhook signé uniquement en mode test
- [ ] Tester un envoi d’e-mail transactionnel chiffré avec l’expéditeur/le domaine approuvé
- [ ] Prouver la restauration d’une sauvegarde et effectuer une exécution de recherche supervisée avec un budget plafonné
- [ ] Approuver la politique d’examen BRL/PIX avant d’accepter des justificatifs de don
- [ ] Activer le Checkout public uniquement après avoir satisfait aux critères précédents, puis activer le nouvel ID dans `news.json`
- [ ] Vérifier que la bannière de la page d’accueil utilise un texte localisé et qu’un nouvel ID réapparaît après le rejet d’un ancien ID

## Tests de fumée des services intégrés (v3.8.4+)

Avant de publier toute version comprenant des modifications des services intégrés, vérifiez les éléments suivants :

### Démarrage avec une base de données neuve (détecte les collisions de migrations — ajouté après le correctif v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — attendez 10 s pour le démarrage
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` renvoie `"9router"` (PAS 404, PAS 500). Confirme que la migration `071_services.sql` a été appliquée et que la ligne a été initialisée.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` renvoie 3 lignes.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` renvoie 2 lignes (confirme que `070_webhooks_kind_metadata.sql` a été appliquée).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` réussit — protège contre de futures collisions.

### 9Router

- [ ] `POST /api/services/9router/install` renvoie 200 avec `installedVersion` en moins de 2 min
- [ ] `POST /api/services/9router/start` renvoie 200 et `state: "running"` en moins de 30 s
- [ ] `GET /api/services/9router/status` indique `health: "healthy"`
- [ ] `POST /v1/chat/completions` avec `"model": "9router/auto/..."` renvoie 200 (routage de bout en bout via 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` affiche l’interface native de 9Router dans le proxy (aucune iframe pointant directement vers `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` renvoie `{ keyRotated: true }` et le service redémarre correctement
- [ ] `POST /api/services/9router/stop` renvoie 200 et `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` renvoie un flux SSE avec un événement `snapshot` contenant les lignes récentes
- [ ] Une installation dans un environnement où `npm` n’est pas présent dans PATH renvoie 500 avec un message d’erreur convivial (sans trace de pile)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` renvoie 200 en moins de 2 min
- [ ] `POST /api/services/cliproxy/start` renvoie 200 et `state: "running"` en moins de 30 s
- [ ] `GET /api/services/cliproxy/status` indique `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` renvoie 200 et `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` renvoie un flux SSE

### Régression de sécurité

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` renvoie `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` renvoie `403 LOCAL_ONLY`
- [ ] Les réponses d’erreur de `/api/services/*` ne contiennent ni `err.stack` ni chemins de fichiers absolus

## Vérifications pour v3.8.0+

Avant de publier toute version v3.8.x, vérifiez également les éléments suivants :

- [ ] `omniroute --tray` démarre sous macOS (systray2 installé dans `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` démarre sous Linux (nécessite DISPLAY ; erreur gérée proprement s’il n’est pas défini)
- [ ] `omniroute --tray` démarre sous Windows (PowerShell NotifyIcon, aucun binaire supplémentaire)
- [ ] `omniroute config tray enable` crée une entrée de démarrage automatique ; la désactivation la supprime
- [ ] `npm install -g omniroute@<this-version>` exécute le script postinstall sans arrêt fatal
- [ ] Le processus de mise à jour conserve les dépendances facultatives : `omniroute update --apply` et le programme de mise à jour automatique
      exécutent `npm install -g … --include=optional` afin que les `optionalDependencies` (better-sqlite3,
      keytar, tls-client et la pile SLM llmlingua : `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) survivent à une mise à jour. Le niveau SLM ultra `modelPath` nécessite également le
      modèle tinybert, téléchargé automatiquement dans `${DATA_DIR}/models/llmlingua` lors de la première utilisation. Le script postinstall
      (`scripts/build/colocateOptionals.mjs`) regroupe ensuite la fermeture facultative SLM dans
      `dist/node_modules` afin que le worker résolve une SEULE instance de `@huggingface/transformers` ^4.2.0
      — la trace autonome n’intègre que transformers, et non les dépendances facultatives importées dynamiquement ;
      sans cela, le worker chargerait llmlingua-2 avec transformers à la racine et le niveau SLM échouerait silencieusement en mode ouvert.
- [ ] `omniroute status` fonctionne sans `.env` (chemin du jeton CLI, boucle locale uniquement)
- [ ] `curl http://localhost:20128/api/shutdown` renvoie 401 (route toujours protégée)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` renvoie 401 (protection de la boucle locale)
- [ ] Le runtime SQLite est résolu vers `bundled` lors de la première exécution (binaire intégré valide pour la plateforme)
- [ ] Le runtime SQLite bascule vers `runtime` lorsque `node_modules/better-sqlite3` est supprimé
- [ ] Le filtre MCP intelligent compresse la sortie réelle de `playwright-mcp browser_snapshot` (réduction ≥50 %)
- [ ] Les 10 fichiers `skills/omniroute*/SKILL.md` sont accessibles publiquement via une URL GitHub brute
- [ ] L’assistant de prise en main affiche l’étape de présentation des niveaux « How It Works » lors d’une nouvelle configuration
- [ ] Le widget de couverture des niveaux du tableau de bord d’accueil affiche les nombres configurés/actifs

---

## Découpage de la version LTS 3.9.0 (répété avec la 3.8.58)

Après la v3.8.59, la version suivante est la 3.9.0, et son commit de tête devient le point de départ de deux branches à longue durée de vie :
`stable/v3` (la lignée LTS v3, npm `latest`) et `develop` (v4, passée à 4.0.0, npm
`nightly`). Le modèle de branches/canaux, le portage vers l’avant et les labels sont décrits dans
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) ; le plan figure dans la [FEUILLE DE ROUTE](../../ROADMAP.md) (Phase 3). Le découpage n’est effectué qu’une fois ;
la 3.8.58 le répète de bout en bout sur un fork, et la 3.8.59 se conclut avec la
[checklist GO/NO-GO](./LTS_GO_NO_GO.md).

### Simulation (lecture seule, sûre à tout moment)

```bash
npm run release:dry-run-lts-cut                       # le véritable découpage : 3.9.0 depuis HEAD, tag précédent v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # fixe le commit source
```

`scripts/release/dry-run-lts-cut.mjs` n’exécute rien : il lit git et `gh`, puis affiche la
séquence complète — les préconditions (la source est résolue, le tag précédent existe, `package.json`
correspond à la version cible, une issue `release-freeze` est ouverte, aucune issue
`Release branch not green` ouverte sur une branche de publication existante — une branche
qui n’existe pas est signalée par `?` comme inconnue, jamais comme verte —, la file d’attente
`release` de Mergify est configurée (G11 : `queue_rules`, `checks_timeout`, label `queue`),
le jeu de règles `release/*` bloque toujours la suppression et le push forcé, et
`stable/v3` ainsi que `develop` n’existent pas encore), les deux étapes de création des branches, les déclencheurs
des workflows dormants et les conditions `if:` qui deviennent vraies (ainsi que celles qui restent bloquées
par une variable du dépôt ou limitées au dépôt canonique), les dist-tags attendus (`latest` → 3.9.0,
`next` et `nightly` vides) et le retour arrière. Le code de sortie `0` = `RESULT: READY`,
`1` = échec d’une précondition bloquante (`✗`), `2` = erreur d’utilisation. `--advisory <id,...>`
rétrograde une vérification en avertissement (`!`) sans la masquer.

Exécutez la simulation du véritable découpage tant que le gel de la publication 3.9.0 est encore
actif — les branches sont créées après le tag et avant que la Phase 12c ne lève le gel.

### Répétition avec la 3.8.58 (fork uniquement)

```bash
# 1. Simuler sur le commit de tête actuel avec les paramètres de répétition
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Exécuter sur un remote de FORK (origin, ou tout remote dont l’URL est celle du dépôt
#    canonique, est refusé ; chaque étape demande une confirmation dans le terminal)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Exercer les workflows dormants dans le fork (workflow_dispatch lorsque la simulation
#    signale une restriction au dépôt canonique), puis revenir en arrière
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Le commit de changement de version de develop est construit avec la plomberie git (sans toucher à
l’arbre de travail) et met à jour les cinq mêmes fichiers qu’un commit d’ouverture de cycle :
`package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json` et
`docs/openapi.yaml`. La section `[4.0.0]` du CHANGELOG et ses équivalents i18n sont ouverts
ensuite sur `develop`, avant sa première PR. Le script ne modifie jamais les dist-tags npm —
répétez ces opérations sur un package de test.

### Artefact de prévisualisation de PR (construire une fois, promouvoir les mêmes octets)

`.github/workflows/preview-artifact.yml` construit une archive de production à partir du commit
de tête d’une PR et valide exactement cette même build (partie (a) de #8084). Uniquement pour les
PR du même dépôt ; rien n’est publié.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # ou ajouter le label `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # installation de prévisualisation
```

L’exécution lance `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, crée
l’archive, exécute `npm run check:pack-boot` (faux secrets, répertoire de données éphémère),
recrée l’archive et échoue si l’empreinte n’est pas identique, puis enregistre
`artifact-identity.json` (SHA du commit de tête, SHA de base, hash du fichier de verrouillage,
plateforme, architecture, ABI node, bundler, politique de build —
`scripts/release/artifact-identity.mjs`) et atteste l’archive dans un job distinct. Promouvoir
une prévisualisation signifie installer cette archive : ne la reconstruisez jamais depuis les sources.

### Le découpage (3.9.0, après le GO)

1. GO consigné dans [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` affiche `RESULT: READY`.
3. Créez manuellement les branches sur `origin` à l’aide des commandes affichées par la
   simulation — le script refuse de pousser vers `origin`. Pour réutiliser un commit develop
   relu et approuvé, exécutez d’abord la répétition avec `--execute` sur le commit de tête de
   la 3.9.0 dans votre fork ; elle affiche les deux SHA, et les mêmes commits peuvent être poussés :

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Protégez `stable/v3` et `develop` (jeux de règles + file d’attente de fusion) avant la fusion de la première PR.
5. Les workflows dormants s’activent lorsque les branches existent : `forward-port.yml` (push vers
   `stable/v3`), `validate-stable-pr.yml` (PR vers `stable/v3`) et `nightly-v4-build.yml`
   (builds de `develop`). Avant la mise en production, définissez le secret de dépôt
   `secrets.FORWARD_PORT_TOKEN` (afin que la CI s’exécute sur les PR de portage vers l’avant) ;
   la publication nightly reste désactivée jusqu’à ce que le propriétaire définisse la variable
   de dépôt `vars.NIGHTLY_PUBLISH` sur `true` et que npm Trusted Publishing accepte
   `nightly-v4-build.yml`. La résolution des canaux est assurée par `scripts/release/dist-tag.mjs`,
   le même résolveur qu’utilise `npm-publish.yml`.
6. Vérifiez les canaux : `npm view omniroute dist-tags --json` affiche `latest` = 3.9.0 et aucun
   `next` / `nightly` tant que la v4 n’est pas publiée.
7. Retour arrière, si nécessaire : `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   et `npm dist-tag add omniroute@3.8.59 latest`.

---

## Restauration

Si une version publiée présente un problème critique :

1. `gh release edit vX.Y.Z --prerelease` (la marque comme n’étant pas la plus récente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (uniquement si elle n’a pas encore été adoptée par les utilisateurs)
3. Ou : correctif urgent sur `release/vX.Y.0` → version corrective `vX.Y.(Z+1)`
4. Communiquer immédiatement sur GitHub Discussions et Discord

## Règles strictes

- Ne jamais effectuer de commit directement sur `main`
- Ne jamais utiliser `git push --force` sur les branches `main` ou `release/*`
- Ne jamais ignorer les hooks Husky (`--no-verify`)
- Ne jamais commiter de secrets, d’identifiants ou de fichiers `.env`
- La couverture doit rester ≥60/60/60/60 (instructions/lignes/fonctions/branches)
- Toujours inclure ou mettre à jour les tests lors de la modification du code de production dans `src/`, `open-sse/`, `electron/` ou `bin/`

## Vérification automatisée de la synchronisation

Exécutez localement le contrôle de synchronisation de la documentation avant d’ouvrir une PR :

```bash
npm run check:docs-sync
```

La CI exécute également ce contrôle dans `.github/workflows/ci.yml` (tâche de lint).
