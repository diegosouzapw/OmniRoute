# Release Checklist (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Dernière mise à jour :** 2026-08-28 — v3.8.51
> Processus de publication simplifié qui exploite les compétences de Claude Code pour l’automatisation.
>
> **Maintenez la file d’attente/branche au vert entre les publications :** consultez [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (famille `/green-prs` + `npm run check:release-green` + `/babysit` + exécution nocturne). L’exécuter
> régulièrement — et surtout **avant** cette liste de contrôle — permet à la PR de publication de démarrer au vert.

## TL;DR

```bash
# 1. Incrémenter la version + générer le CHANGELOG (compétence)
/version-bump-cc patch    # ou minor/major

# 2. Exécuter le contrôle qualité localement
npm run check              # lint + tests
npm run test:coverage      # contrôle complet de la couverture (60/60/60/60)

# 3. Compiler et effectuer un test rapide
npm run build
npm run test:e2e           # facultatif, mais recommandé

# 4. Générer la publication (compétence)
/generate-release-cc

# 5. Déployer (compétence)
/deploy-vps-both-cc        # ou akamai-cc / local-cc

# 6. Capturer les preuves de publication (compétence)
/capture-release-evidences-cc
```

## Publication de confiance npm (par défaut depuis v3.8.51) — intermédiaire sur demande, directe en solution de secours

`npm-publish.yml` publie par défaut via la **publication de confiance npm (OIDC)** : la tâche
`stage-npm` (hébergée par GitHub) échange l’id-token de GitHub contre un identifiant npm
à courte durée de vie pour cette exécution — aucun jeton npm à longue durée de vie dans les secrets du dépôt, aucune invite 2FA, provenance jointe.
Il s’agit du mécanisme de contournement autorisé par npm maintenant que les jetons qui ignorent la 2FA sont progressivement supprimés ;
cela rétablit le processus entièrement automatique dont disposait le projet jusqu’à v3.8.48 tout en conservant la
garantie WS1.3 (un jeton divulgué ne peut pas publier seul — puisqu’il n’y a aucun jeton).

**Configuration unique (propriétaire) :** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub : propriétaire `diegosouzapw`, dépôt `OmniRoute`, workflow `npm-publish.yml`
(environnement : aucun). Tant que cette configuration n’existe pas, l’étape automatique échoue avec `ENEEDAUTH` :
relancez-la avec `publish_mode=staged` (ci-dessous) ou `direct`.

### Publication intermédiaire (sur demande — `publish_mode=staged`)

Le workflow npm-publish ne publie plus directement : il démarre l’archive empaquetée
(`check:pack-boot`), puis exécute `npm stage publish` — les octets exacts sont placés sur
le registre, mais **ne peuvent pas être installés** tant que le propriétaire ne les a pas approuvés. Le contrôle 2FA humain intervient désormais
APRÈS la vérification, et non avant.

**Processus du propriétaire une fois le workflow au vert :**

1. `npm stage list omniroute` — recherchez l’identifiant de l’étape (également affiché dans le récapitulatif du workflow).
2. Vérifiez les octets intermédiaires (recommandé) : `npm stage download <id>`, puis installez
   l’archive téléchargée dans un préfixe temporaire et démarrez-la (`npm run check:pack-boot` automatise
   le même verdict empaquetage→installation→démarrage dans la CI).
3. `npm stage approve <id>` — l’invite 2FA EST la publication. `npm stage reject <id>` abandonne l’étape.
4. Filet de sécurité post-publication : le vérificateur post-publication (WS1.4 du plan v3.8.49) installe la
   version publiée depuis le registre public dans un conteneur propre et la démarre.

**Solution de secours d’urgence :** `workflow_dispatch` avec `publish_mode=direct` rétablit
l’exécution immédiate historique de `npm publish` (à utiliser uniquement si le mécanisme intermédiaire lui-même fonctionne mal ; documentez-en la raison).

**Durcissement unique (propriétaire, npmjs.com) :** configurez le Trusted Publisher pour
`omniroute` en mode intermédiaire uniquement, afin qu’un jeton à longue durée de vie divulgué ne puisse pas exécuter `npm publish`
directement depuis n’importe où — la CI peut uniquement effectuer la mise en attente ; seule la 2FA du propriétaire permet la publication.

**Procédure en cas d’artefact défectueux (inchangée) :** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
doit être le réflexe par défaut (quelques minutes, réversible) ; `npm unpublish` uniquement dans la fenêtre de 72 h/sans dépendants,
et jamais comme première mesure. Docker : ne réécrivez jamais une étiquette de version — le retour arrière consiste à
rediriger `latest` vers le dernier condensat valide.

**`latest` sur Docker Hub (requis pour chaque publication SemVer stable) :** le
workflow `docker-publish` doit étiqueter **à la fois** `X.Y.Z` et, lorsque
`should-promote-latest.sh` confirme qu’il s’agit de la version SemVer stable la plus élevée, `:latest`
avec le **même condensat**. Après la tâche : le condensat `latest` de Hub doit être identique au nouveau
condensat SemVer et `last_updated` doit avoir été actualisé. Ne laissez pas `:latest` pointer vers une ancienne
version alors que les notes de publication mentionnent des corrections qui n’existent que dans git. Les démarrages rapides
Compose utilisent `:latest` ; GitOps doit continuer à épingler `X.Y.Z`. Consultez
[Canaux de publication Docker](../guides/DOCKER_GUIDE.md#release-channels) et #10317.

## Voie rapide des correctifs urgents (label `hotfix`)

Une PR portant le label `hotfix` ignore la matrice CI lourde (E2E en 9 fragments, ajustement progressif de la couverture,
quality-gate, quality-extended) et conserve les contrôles rapides à forte valeur de signal : build,
fragments de tests unitaires, intégration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
et le test de démarrage minimal de l’archive tar (`check:pack-boot`). Objectif : passer au vert en ≤15 min au lieu d’environ 33 min.

**Politique d’accès — les quatre critères sont obligatoires (sur le modèle des voies d’urgence de Chromium/VS Code/Node) :**

1. **Gravité** : la production est hors service — un artefact publié plante au démarrage / un
   correctif de sécurité / chaque utilisateur de la version est affecté. « Important » ne signifie pas « hors service ».
2. **Autorité** : seul le propriétaire du dépôt applique le label `hotfix`. Le label CONSTITUE
   l’approbation — ne jamais se l’attribuer soi-même sur une PR de campagne.
3. **Preuves** : le corps de la PR contient un lien vers la précédente exécution lourde entièrement au vert (la suite que
   les tâches ignorées valideraient à nouveau), ainsi que vers le test propre au correctif, d’abord en échec puis réussi.
4. **Périmètre** : cherry-pick uniquement — le correctif minimal, sans refactorisation ni modifications annexes.

La couverture et la surface d’ajustement progressif ignorées sont validées à nouveau par la prochaine exécution complète sur la
branche de version (version continuellement au vert) — cette voie évite l’ATTENTE, jamais la validation.
Les diffs portant uniquement sur les tests (tous les fichiers sous `tests/`, aucun sous `tests/e2e/`) ignorent automatiquement la matrice
E2E, sans aucun label.

## Liste de contrôle détaillée

### Avant la publication

- [ ] Toutes les PR destinées à cette version sont fusionnées dans `release/vX.Y.0`
- [ ] Tous les éléments Linear/tickets ouverts pour cette version sont clôturés ou reportés au jalon suivant
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
- [ ] `npm run typecheck:noimplicit:core` — aucun problème (mode strict)
- [ ] `npm run check:cycles` — aucune dépendance circulaire
- [ ] `npm run check:any-budget:t11` — dans les limites du budget
- [ ] `npm run check:route-validation:t06` — aucun problème
- [ ] `npm run check:node-runtime` — version minimale d’exécution prise en charge respectée (`>=22.22.2 <23`, `>=24.0.0 <27`, selon `SUPPORTED_NODE_RANGE` dans `src/shared/utils/nodeRuntimeSupport.ts` ; alignée sur `engines` dans `package.json`)

### Tests

- [ ] `npm run test:unit` — réussi
- [ ] `npm run test:vitest` — réussi (serveur MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — seuil 60/60/60/60 satisfait (instructions/lignes/fonctions/branches)
- [ ] `npm run test:integration` — réussi (si les modifications touchent la BDD / les gestionnaires)
- [ ] `npm run test:combo:matrix` — réussi (matrice des stratégies combo : démontre de manière déterministe les décisions de sélection des 19 stratégies publiques de routage ; à exécuter lors de modifications du routage combo, de la résolution des stratégies ou de la logique de repli)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **facultatif/manuel** (test minimal contrôlé sur de véritables services en amont ; récupère un instantané en lecture seule de la BDD depuis le VPS `root@192.168.0.15` ; interroge de vrais fournisseurs, consomme des crédits ; ne s’exécute jamais dans la CI ; est ignoré proprement sans l’activation)
- [ ] `npm run test:combo:live:vps` — **facultatif/manuel** (test minimal en direct de la phase 3 sur le VPS : 7 scénarios HTTP exécutés sur le serveur `.15` actif via du Node ESM standard ; nécessite `ssh root@192.168.0.15` ; crée/supprime uniquement des combos `__live_test__*` ; interroge de vrais fournisseurs ; ne s’exécute jamais dans la CI)
- [ ] `npm run test:e2e` — réussi (modifications de l’interface utilisateur)
- [ ] `npm run test:protocols:e2e` — réussi (modifications MCP/A2A)
- [ ] `npm run test:ecosystem` — réussi

### Hooks (validés par Husky)

Les hooks Husky se trouvent dans `.husky/` et s’exécutent automatiquement lors des opérations git.

- **pre-commit :** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push :** contrôles déterministes rapides — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (activés le 2026-06-13). Exclut intentionnellement `test:unit` (lent ; couvert par la tâche CI `test-unit`).
  - Exécuter manuellement `npm run test:unit` avant de pousser des branches de version.
- Si un hook échoue : corriger le problème sous-jacent, ne pas le contourner avec `--no-verify`.

### Commits conventionnels

Tous les commits destinés à la version doivent respecter le format `type(scope): subject`.

**Types valides :** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Périmètres valides :** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Modifications incompatibles : ajouter le pied de page `BREAKING CHANGE:` ou `!` après le périmètre (p. ex. `feat(api)!: drop /v0`).

### Documentation

- [ ] `npm run check:docs-sync` réussit (exécuté automatiquement par le hook de pré-commit)
- [ ] `npm run check:docs-all` réussit (commande globale : docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` se termine avec le code 0 — le contrat des variables d’environnement entre le code ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` est intact
- [ ] `npm run check:doc-links` se termine avec le code 0 — aucune référence Markdown interne rompue après la restructuration
- [ ] `docs/architecture/ARCHITECTURE.md` vérifié pour détecter toute dérive relative au stockage ou à l’environnement d’exécution
- [ ] `docs/guides/TROUBLESHOOTING.md` vérifié pour détecter toute dérive relative aux variables d’environnement et aux opérations
- [ ] Si `.env.example` a changé : `docs/reference/ENVIRONMENT.md` mis à jour
- [ ] Si la nouvelle fonctionnalité possède une interface utilisateur : elle est mentionnée dans `docs/guides/USER_GUIDE.md`
- [ ] Si la nouvelle fonctionnalité possède une API : `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` mis à jour
- [ ] Si la nouvelle fonctionnalité est un module : un fichier dédié `docs/<MODULE>.md` existe
- [ ] En cas de changement incompatible : `docs/guides/TROUBLESHOOTING.md` contient une note de migration

### i18n

- [ ] `npm run i18n:check` se termine avec le code 0 — l’état des traductions (`.i18n-state.json`) est synchronisé avec la documentation source (aucune source ayant dérivé en mode strict ; un avertissement en mode consultatif est acceptable pour les retouches de dernière minute apportées à la documentation, mais le code doit être 0 avant la création du tag)
- [ ] `npm run i18n:check-ui-coverage` se termine avec le code 0 — chaque langue de l’interface utilisateur atteint ou dépasse le seuil minimal de couverture de 80 %
- [ ] `npm run i18n:sync-ui:dry` signale 0 clé manquante dans les 42 langues
- [ ] Si la documentation source en anglais a changé, exécuter `npm run i18n:run` (nécessite `OMNIROUTE_TRANSLATION_API_KEY` dans `.env`) avant la création du tag
- [ ] Les contributions aux traductions peuvent être reportées à la prochaine version si elles sont mineures (les consigner dans le CHANGELOG)

### Migrations de base de données

- [ ] Si `src/lib/db/migrations/` contient de nouveaux fichiers :
  - [ ] Chaque migration est idempotente (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Les migrations sont encapsulées dans des transactions
  - [ ] Elles sont correctement numérotées (aucun numéro manquant dans la séquence)
- [ ] Tester sur une nouvelle installation : supprimer `~/.omniroute/omniroute.db` et exécuter `npm run dev`
- [ ] Tester sur une installation existante : sauvegarder la base de données, exécuter la migration et vérifier le schéma
- [ ] Les fichiers WAL (`-wal`, `-shm`) sont correctement gérés si la migration réécrit des tables

### Catalogue de fournisseurs (validé par Zod)

- [ ] Le schéma Zod de `src/shared/constants/providers.ts` est valide au chargement
  - [ ] Tous les fournisseurs possèdent les champs obligatoires (`id`, `label`, `kind`, etc.)
  - [ ] `freeNote` est renseigné pour les nouveaux fournisseurs gratuits
  - [ ] Les fournisseurs OAuth possèdent un `oauthConfig` enregistré dans `src/lib/oauth/constants/oauth.ts`
- [ ] Si un nouveau fournisseur est ajouté : l’exécuteur correspondant existe dans `open-sse/executors/`
- [ ] Si le format n’est pas celui d’OpenAI : le traducteur existe dans `open-sse/translator/`
- [ ] Les modèles sont enregistrés dans `open-sse/config/providerRegistry.ts`
- [ ] Les tests unitaires dans `tests/unit/` couvrent la classification des fournisseurs et le routage

### Application de bureau (Electron)

Si `electron/` a changé :

- [ ] `npm run electron:smoke:packaged` réussit
- [ ] Les builds ont été testés pour au moins l’une des cibles suivantes : `:win`, `:mac`, `:linux`
- [ ] Les certificats de signature du code n’ont pas expiré (si une signature est utilisée)
- [ ] La version dans `electron/package.json` correspond à celle du fichier `package.json` racine
- [ ] Le pointeur du canal de mise à jour automatique est actualisé en cas de publication sur `stable`

### Organisation du build

Le dépôt utilise trois répertoires de sortie distincts — ne jamais les confondre :

| Répertoire | Rôle                                                                  | Suivi ?              |
| ---------- | --------------------------------------------------------------------- | -------------------- |
| `src/`     | Code source de l’application (TypeScript / TSX)                       | Oui                  |
| `.build/`  | Fichiers intermédiaires du build — sortie de `next build` (`distDir`) | Non (ignoré par Git) |
| `dist/`    | Bundle npm distribuable — assemblé par `assembleStandalone`           | Non (ignoré par Git) |

> **Note pour l’opérateur :** le répertoire de l’image sur le VPS distant reste `/usr/lib/node_modules/omniroute/app/`.
> Seule la sortie du build **dans le dépôt** a été déplacée (`app/` → `dist/`). Les procédures de déploiement synchronisent
> le contenu de `dist/` avec le répertoire distant `app/` via rsync — aucune modification des chemins du VPS n’est nécessaire.

**Flux avec un seul build :**

```
npm run build:release
  └─ rm -rf .build dist          (nettoyage)
  └─ next build → .build/next/   (fichiers intermédiaires)
  └─ assembleStandalone          (copie les fichiers autonomes, statiques, publics et natifs → dist/)
  └─ écrit dist/BUILD_SHA        (sentinelle HEAD)
```

Ne PAS exécuter `npm run build` suivi séparément de `npm run build:cli` pour le déploiement — utiliser
`npm run build:release`, qui effectue une reconstruction propre et crée la sentinelle en une seule commande.

### Validation des artefacts

- [ ] `npm run build:release` réussit et `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` ne signale aucun problème — aucun `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ni autre résidu local
- [ ] `dist/server.js` existe après le build

### Création du tag et publication

- [ ] Exécuter `/generate-release-cc` (procédure Claude Code) :
  - Crée le tag `vX.Y.Z`
  - Pousse le tag et la branche
  - Crée une version GitHub avec le contenu du journal des modifications
  - Joint les programmes d’installation Electron (s’ils ont été générés)
- [ ] Ou procéder manuellement :
  ```bash
  git tag -a vX.Y.Z -m "Publication vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Déploiement

Les procédures de déploiement utilisent le flux rsync léger — sans `npm pack` ni `npm i -g` :

- [ ] Utiliser la procédure de déploiement correspondant à la cible :
  - `/deploy-vps-local-cc` — VPS local (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — les deux
- [ ] Avant le déploiement, confirmer que `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Le build doit être exécuté dans un environnement où `node_modules` est réel (checkout principal ou worktree préparé avec `npm ci` — PAS un worktree utilisant un lien symbolique)
- [ ] Effectuer un test de bon fonctionnement de l’instance déployée :
  - Ouvrir `/dashboard/health` → vérifier que la chaîne de version correspond à la version publiée
  - Exécuter une requête `/v1/chat/completions` auprès d’un fournisseur connu
  - Vérifier que `/api/monitoring/health` renvoie des disjoncteurs `CLOSED`
  - Confirmer que les transports MCP répondent (`/mcp` HTTP, `/mcp-sse` SSE)

### Après la publication

- [ ] Exécuter `/capture-release-evidences-cc` (compétence Claude Code)
  - Capture des captures d’écran/enregistrements WebP des nouvelles fonctionnalités
  - Les joint aux notes de version / à l’article de blog
- [ ] Mettre à jour GitHub Discussions / Discord avec l’annonce de la version
- [ ] Ouvrir un jalon pour la prochaine version
- [ ] Si critique : épingler la discussion ou publier dans `news.json` pour afficher une bannière dans l’application

### Critères de validation du lancement public de Radar

L’annonce de Radar est intentionnellement validée avec `active: false`. L’activation constitue une modification distincte
une fois que chaque élément ci-dessous est étayé par des preuves :

- [ ] Toutes les PR Radar empilées sont fusionnées et la CI de la pointe de version est au vert
- [ ] Déployer et tester rapidement les routes OSS Radar avec `RADAR_ENABLED` toujours désactivé par défaut
- [ ] Tester rapidement `GET /planos`, `/termos`, `/privacidade` et `/reembolso` sur l’hôte Radar spécifié
- [ ] Enregistrer l’identité/les coordonnées/l’adresse de l’opérateur ainsi que la validation de la revue juridique par le propriétaire dans le service privé
- [ ] Tester Stripe Checkout et le webhook signé uniquement en mode test
- [ ] Tester l’envoi d’un e-mail transactionnel chiffré avec l’expéditeur/le domaine approuvé
- [ ] Prouver la restauration d’une sauvegarde et l’exécution d’une recherche supervisée avec un budget plafonné
- [ ] Approuver la politique d’examen BRL/PIX avant d’accepter des justificatifs de dons
- [ ] Activer Checkout public uniquement après avoir satisfait aux critères précédents, puis activer le nouvel ID dans `news.json`
- [ ] Vérifier que la bannière de la page d’accueil utilise un texte localisé et qu’un nouvel ID réapparaît après le masquage d’un ID plus ancien

## Tests de fumée des services intégrés (v3.8.4+)

Avant de publier toute version incluant des modifications des services intégrés, vérifiez les points suivants :

### Démarrage avec une nouvelle base de données (détecte les collisions de migrations — ajouté après le correctif v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — attendez 10 s pour le démarrage
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` renvoie `"9router"` (NI 404, NI 500). Confirme que la migration `071_services.sql` a été appliquée et que la ligne a été initialisée.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` renvoie 3 lignes.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` renvoie 2 lignes (valide l’application de `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` réussit — protège contre les collisions futures.

### 9Router

- [ ] `POST /api/services/9router/install` renvoie 200 avec `installedVersion` en moins de 2 min
- [ ] `POST /api/services/9router/start` renvoie 200 et `state: "running"` en moins de 30 s
- [ ] `GET /api/services/9router/status` indique `health: "healthy"`
- [ ] `POST /v1/chat/completions` avec `"model": "9router/auto/..."` renvoie 200 (routage de bout en bout via 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` affiche l’interface native de 9Router dans le proxy (aucune iframe pointant directement vers `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` renvoie `{ keyRotated: true }` et le service redémarre correctement
- [ ] `POST /api/services/9router/stop` renvoie 200 et `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` renvoie un flux SSE avec un événement `snapshot` contenant les lignes récentes
- [ ] L’installation dans un environnement où `npm` n’est pas présent dans PATH renvoie 500 avec un message d’erreur explicite (sans trace de pile)

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

Avant de publier toute version v3.8.x, vérifiez également les points suivants :

- [ ] `omniroute --tray` démarre sous macOS (systray2 installé dans `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` démarre sous Linux (nécessite DISPLAY ; erreur explicite si cette variable n’est pas définie)
- [ ] `omniroute --tray` démarre sous Windows (PowerShell NotifyIcon, sans binaires supplémentaires)
- [ ] `omniroute config tray enable` crée une entrée de démarrage automatique ; la désactivation la supprime
- [ ] `npm install -g omniroute@<this-version>` exécute le script post-installation sans arrêt fatal
- [ ] Le processus de mise à jour conserve les dépendances facultatives : `omniroute update --apply` et le programme de mise à jour automatique
      exécutent `npm install -g … --include=optional` afin que les `optionalDependencies` (better-sqlite3,
      keytar, tls-client et la pile SLM de llmlingua : `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) soient préservées après une mise à jour. Le niveau SLM ultra avec `modelPath` nécessite également le
      modèle tinybert, téléchargé automatiquement dans `${DATA_DIR}/models/llmlingua` lors de la première utilisation. Le script de post-installation
      (`scripts/build/colocateOptionals.mjs`) regroupe ensuite les dépendances facultatives transitives du SLM dans
      `dist/node_modules` afin que le worker résolve une SEULE instance de `@huggingface/transformers` ^4.2.0
      — la trace autonome n’embarque que transformers, et non les dépendances facultatives importées dynamiquement ;
      sans cela, le worker chargerait llmlingua-2 avec transformers à la racine
      et le niveau SLM échouerait silencieusement en mode ouvert.
- [ ] `omniroute status` fonctionne sans `.env` (chemin du jeton CLI, boucle locale uniquement)
- [ ] `curl http://localhost:20128/api/shutdown` renvoie 401 (route toujours protégée)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` renvoie 401 (protection de la boucle locale)
- [ ] À la première exécution, l’environnement d’exécution SQLite est résolu vers `bundled` (binaire intégré valide pour la plateforme)
- [ ] L’environnement d’exécution SQLite se replie sur `runtime` lorsque `node_modules/better-sqlite3` est supprimé
- [ ] Le filtre MCP intelligent compresse la sortie réelle de `playwright-mcp browser_snapshot` (réduction ≥50 %)
- [ ] Les 10 fichiers `skills/omniroute*/SKILL.md` sont accessibles publiquement via une URL GitHub brute
- [ ] L’assistant d’intégration affiche l’étape de présentation des niveaux « How It Works » lors d’une nouvelle configuration
- [ ] Le widget de couverture des niveaux du tableau de bord d’accueil affiche les nombres configurés/actifs

---

## Restauration

Si la version publiée présente un problème critique :

1. `gh release edit vX.Y.Z --prerelease` (la marque comme n’étant pas la plus récente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (uniquement si elle n’a pas encore été adoptée par les utilisateurs)
3. Ou : correctif urgent sur `release/vX.Y.0` → version corrective `vX.Y.(Z+1)`
4. Communiquez immédiatement dans GitHub Discussions et sur Discord

## Règles strictes

- Ne faites jamais de commit directement sur `main`
- N’utilisez jamais `git push --force` sur `main` ou les branches `release/*`
- Ne contournez jamais les hooks Husky (`--no-verify`)
- Ne commitez jamais de secrets, d’identifiants ou de fichiers `.env`
- La couverture doit rester ≥60/60/60/60 (instructions/lignes/fonctions/branches)
- Incluez ou mettez toujours à jour les tests lors de toute modification du code de production dans `src/`, `open-sse/`, `electron/` ou `bin/`

## Vérification automatisée de la synchronisation

Exécutez localement le contrôle de synchronisation de la documentation avant d’ouvrir une PR :

```bash
npm run check:docs-sync
```

La CI exécute également cette vérification dans `.github/workflows/ci.yml` (tâche de lint).
