# Contributing to OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Configuration du développement

### Prérequis

- **Node.js** `>=22.22.3 <23`, ou `>=24.0.0 <27` (recommandé : 24 LTS)
- **npm** 10+

> **Utilisateurs de npm v11+ (Node 24+) :** après `npm install`, vérifiez que les modules natifs ont été installés :
> `node -e "require('better-sqlite3')"`. Si la commande échoue avec `MODULE_NOT_FOUND`,
> exécutez `npm approve-scripts better-sqlite3 && npm install`. Consultez
> [Dépannage](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clonage et installation

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variables d'environnement

```bash
# Créez votre fichier .env à partir du modèle
cp .env.example .env

# Générez les secrets requis
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variables principales pour le développement :

| Variable               | Valeur par défaut en développement | Description                        |
| ---------------------- | ---------------------------------- | ---------------------------------- |
| `PORT`                 | `20128`                            | Port du serveur                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`           | URL de base de l'interface         |
| `JWT_SECRET`           | (à générer ci-dessus)              | Secret de signature JWT            |
| `INITIAL_PASSWORD`     | `CHANGEME`                         | Mot de passe de première connexion |
| `APP_LOG_LEVEL`        | `info`                             | Niveau de verbosité des journaux   |

### Paramètres du tableau de bord

Le tableau de bord fournit des options d'interface pour des fonctionnalités qui peuvent également être configurées au moyen de variables d'environnement :

| Emplacement du paramètre | Option                          | Description                                              |
| ------------------------ | ------------------------------- | -------------------------------------------------------- |
| Paramètres → Avancé      | Mode de débogage                | Activer les journaux de requêtes de débogage (interface) |
| Paramètres → Général     | Visibilité de la barre latérale | Afficher/masquer les sections de la barre latérale       |

Ces paramètres sont stockés dans la base de données et persistent après les redémarrages, remplaçant les valeurs par défaut des variables d'environnement lorsqu'ils sont définis.

### Exécution en local

```bash
# Mode développement (rechargement à chaud)
npm run dev

# Build de production
npm run build    # next build → .build/next/ puis assembleStandalone → dist/
npm run start

# Compilation rapide du backend/de l'API uniquement pour les modifications des contributeurs
npm run build:contributor

# Build de publication (reconstruction propre + sentinelle HEAD — requis pour le déploiement)
npm run build:release   # rm -rf .build dist && build + écrit dist/BUILD_SHA

# Configuration courante du port
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Le build pour les contributeurs effectue uniquement une validation de la compilation : il n'assemble pas la
distribution autonome et ne génère pas les ressources facultatives de packaging natif. Utilisez le build de production standard lorsque
vous devez valider le bundle distribuable.

### Structure des fichiers générés par le build

| Répertoire | Contenu                                                                                     | Suivi par Git |
| ---------- | ------------------------------------------------------------------------------------------- | ------------- |
| `src/`     | Code source de l'application (TypeScript / TSX)                                             | Oui           |
| `.build/`  | Fichiers intermédiaires — sortie de `next build` (ignorée par Git, `distDir = .build/next`) | Non           |
| `dist/`    | Bundle distribuable — assemblé par `assembleStandalone` (ignoré par Git)                    | Non           |

Le pipeline de build s'effectue en un seul passage :

```
npm run build
  └─ next build → .build/next/standalone  (sortie de Next.js)
  └─ assembleStandalone()                 (copie les fichiers autonomes + statiques + publics + les ressources natives)
       └─ sortie : dist/                  (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` nettoie également les deux répertoires au préalable et écrit
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) comme sentinelle d'intégrité du déploiement.

`npm run build:contributor` utilise le profil de build du backend uniquement. Il remplace temporairement par des stubs
les fichiers d'interface du tableau de bord pendant le build, conserve les gestionnaires de routes de l'API et restaure les fichiers d'origine
après le build. Utilisez `npm run build` pour les modifications qui affectent l'interface du tableau de bord ou pour une
validation complète de la publication ; le profil pour les contributeurs ne remplace pas le build de publication.

> **Remarque concernant le déploiement sur VPS :** le répertoire distant de l'image `/usr/lib/node_modules/omniroute/app/`
> reste inchangé. Les procédures de déploiement synchronisent le contenu de `dist/` avec celui-ci à l'aide de rsync.
> Seul le chemin de sortie du build dans le dépôt a changé (`app/` → `dist/`).

URL par défaut :

- **Tableau de bord** : `http://localhost:20128/dashboard`
- **API** : `http://localhost:20128/v1`

---

## Flux de travail Git

> ⚠️ **Ne faites JAMAIS de commit directement sur `main`.** Utilisez toujours des branches de fonctionnalités.
>
> **Base de la PR :** ciblez la branche `release/vX.Y.Z` active (et non `main`). Consultez
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) pour en savoir plus sur le
> modèle avec une branche par version et une balise lors de la livraison.

```bash
# Créez une branche à partir de la pointe de la version active (exemple : release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... apportez vos modifications ...
git commit -m "feat: décrivez votre modification"
git push -u origin feat/your-feature-name
# Ouvrez une Pull Request avec base = release/v3.8.49
```

### Nommage des branches

| Préfixe     | Objectif                          |
| ----------- | --------------------------------- |
| `feat/`     | Nouvelles fonctionnalités         |
| `fix/`      | Corrections de bogues             |
| `refactor/` | Restructuration du code           |
| `docs/`     | Modifications de la documentation |
| `test/`     | Ajouts/corrections de tests       |
| `chore/`    | Outillage, CI, dépendances        |

### Messages de commit

Suivez la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajouter un disjoncteur pour les appels aux fournisseurs
fix: résoudre un cas limite de validation du secret JWT
docs: mettre à jour SECURITY.md avec la protection des PII
test: ajouter des tests unitaires d’observabilité
refactor(db): regrouper les tables de limitation de débit
```

Périmètres (v3.8) : `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Exécution des tests

```bash
# Tous les tests (unitaires + vitest + écosystème + e2e)
npm run test:all

# Un seul fichier de test (exécuteur de tests natif de Node.js — la plupart des tests l’utilisent)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Uniquement les tests unitaires affectés par votre modification (même sélecteur TIA que le contrôle CI, #8084)
npm run test:scoped            # modifications du dernier commit (ou de l’arborescence de travail)
npm run test:scoped:staged     # modifications indexées uniquement — convient bien à une exécution avant commit
npm run test:scoped:full       # reconstruit d’abord la carte du graphe d’importation (après l’ajout ou le déplacement de fichiers)
# Le code de sortie 1 + « run the full suite » signifie qu’un fichier central (tsconfig, package.json, …) ou
# une source non mappée a été modifié — le sélecteur échoue de manière sûre et n’ignore jamais silencieusement des tests.

# Vitest (serveur MCP, autoCombo, cache)
npm run test:vitest

# Tests E2E (nécessite Playwright)
npm run test:e2e

# Tests E2E des clients de protocole (transports MCP, A2A)
npm run test:protocols:e2e

# Tests de compatibilité avec l’écosystème
npm run test:ecosystem

# Seuil de couverture : 60 % des instructions/lignes/fonctions/branches
npm run test:coverage
npm run coverage:report

# Vérification du linting et du formatage
npm run lint
npm run check

# Test de fumée contrôlé de combinaisons avec de vrais services en amont (nécessite un accès au VPS et de vrais crédits fournisseur)
# Interroge de VRAIS fournisseurs — cela coûte un peu. Ne s’exécute JAMAIS dans la CI. Est ignoré proprement sans l’activation.
# Nécessite : un accès ssh root@192.168.0.15 (charge un instantané de base de données en lecture seule depuis le VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Test de fumée en direct sur le VPS de phase 3 — scripts Node ESM simples, interrogeant directement le serveur .15 actif.
# Nécessite : un accès ssh root@192.168.0.15 (combinaisons créées/supprimées via SQLite par SSH).
# Interroge de VRAIS fournisseurs (faible coût). Crée/supprime uniquement les combinaisons __live_test__*. Ne s’exécute JAMAIS dans la CI.
# REQUIRE_API_KEY=false sur .15, donc aucune clé d’API n’est nécessaire, mais respecte COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY si elles sont définies.
npm run test:combo:live:vps              # 7 scénarios HTTP (priorité/round-robin/pondéré/coût/fusion/auto + état de santé)
npm run test:combo:live:vps:failover     # ajoute un véritable scénario de basculement entre fournisseurs (8 au total)
```

Remarques sur la couverture :

- `npm run test:coverage` mesure la couverture du code source pour la suite principale de tests unitaires, exclut `tests/**` et inclut `open-sse/**`
- Les pull requests doivent maintenir le seuil de couverture à **60 % ou plus** pour les instructions/lignes/fonctions/branches
- Si une PR modifie du code de production dans `src/`, `open-sse/`, `electron/` ou `bin/`, elle doit ajouter ou mettre à jour des tests automatisés dans la même PR
- `npm run coverage:report` affiche le rapport détaillé fichier par fichier de la dernière exécution de la couverture
- `npm run test:coverage:legacy` conserve l’ancienne métrique à des fins de comparaison historique
- Consultez `docs/ops/COVERAGE_PLAN.md` pour la feuille de route d’amélioration progressive de la couverture

### Exigences relatives aux pull requests

Avant d’ouvrir une PR, suivez le
[parcours de contribution recommandé](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) afin d’exécuter la boucle ciblée correspondant
à vos modifications. La suite complète de tests unitaires (4 fragments CI), Vitest, le seuil de couverture de **60 % ou plus** et
la compilation de production relèvent de la CI — leur exécution en local n’apporte aucune information supplémentaire par rapport aux
vérifications déjà effectuées sur la PR et peut saturer l’hôte sur les machines plus modestes (#8084) :

- Exécutez les fichiers de test qui couvrent votre modification : `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Exécutez `npm run lint`
- Ajoutez ou mettez à jour des tests automatisés dans la même PR chaque fois que le code de production est modifié
- Mentionnez les fichiers de test modifiés ou ajoutés dans la description de la PR lorsque le code de production a été modifié
- Vérifiez le résultat SonarQube sur la PR lorsque les secrets du projet sont configurés dans la CI

État actuel des tests : **122 fichiers de tests unitaires** couvrant :

- Les traducteurs de fournisseurs et la conversion de formats
- La limitation du débit, le disjoncteur et la résilience
- Le cache sémantique, l’idempotence et le suivi de la progression
- Les opérations de base de données et le schéma (21 modules de base de données)
- Les flux OAuth et l’authentification
- La validation des points de terminaison d’API (Zod v4)
- Les outils du serveur MCP et l’application des portées
- Les systèmes de mémoire et de compétences

---

## Style du code

- **ESLint** — Exécutez `npm run lint` avant de valider
- **Prettier** — Formatage automatique via `lint-staged` lors de la validation (2 espaces, points-virgules, guillemets doubles, largeur de 100 caractères, virgules finales es5)
- **TypeScript** — Tout le code de `src/` utilise `.ts`/`.tsx` ; `open-sse/` utilise `.ts`/`.js` ; documentez avec TSDoc (`@param`, `@returns`, `@throws`)
- **Pas de `eval()`** — ESLint applique `no-eval`, `no-implied-eval`, `no-new-func`
- **Validation Zod** — Utilisez des schémas Zod v4 pour valider toutes les entrées d’API
- **Nommage** : fichiers = camelCase/kebab-case, composants = PascalCase, constantes = UPPER_SNAKE

### Gestion des erreurs / blocs catch vides

Ne laissez jamais un `catch` sans explication. Classez-le dans l’une des deux catégories suivantes (cela rend opérationnelle la règle stricte « ne jamais ignorer silencieusement les erreurs dans les flux SSE ») :

- **Intentionnel (notre propre nettoyage/télémétrie au mieux)** — un échec est ici attendu et
  sans conséquence ; ajoutez un commentaire d’une ligne expliquant la raison, sans journalisation (la journalisation à chaque requête est précisément le bruit que cette convention vise à éviter).

  ```ts
  } catch {} // la fermeture d’un contrôleur déjà fermé après la déconnexion du client est attendue
  ```

- **À journaliser (code externe/fourni par l’appelant, ou lorsque l’erreur ignorée modifie le flux de contrôle)** — conservez
  le bloc catch (ne le laissez jamais interrompre le flux), mais émettez un `console.debug`/`warn` contextuel afin que
  l’échec puisse être détecté.

  ```ts
  } catch (e) {
    console.debug("[STREAM] erreur du rappel onFailure :", e);
  }
  ```

Consultez `open-sse/utils/stream.ts` et `open-sse/utils/streamHandler.ts` pour des exemples d’application.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Ajout d’un nouveau fournisseur

### Étape 1 : Enregistrer les constantes du fournisseur

Ajoutez-les à `src/shared/constants/providers.ts` — elles sont validées par Zod au chargement du module.

### Étape 2 : Ajouter un exécuteur (si une logique personnalisée est nécessaire)

Créez un exécuteur dans `open-sse/executors/your-provider.ts` en étendant l’exécuteur de base.

### Étape 3 : Ajouter un traducteur (si le format n’est pas celui d’OpenAI)

Créez des traducteurs de requêtes/réponses dans `open-sse/translator/`.

### Étape 4 : Ajouter une configuration OAuth (si le fournisseur utilise OAuth)

Ajoutez les identifiants OAuth dans `src/lib/oauth/constants/oauth.ts` et le service dans `src/lib/oauth/services/`.

Si le fournisseur en amont distribue un client_id/secret OAuth public ou une clé d’API Web Firebase dans son CLI public ou son bundle de navigateur, **ne l’intégrez pas** sous forme de chaîne littérale. Utilisez `resolvePublicCred()` depuis `open-sse/utils/publicCreds.ts` et ajoutez une entrée d’octets masquée à `EMBEDDED_DEFAULTS`. Le processus obligatoire complet est documenté dans [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Dans les gestionnaires/exécuteurs, les messages d’erreur transmis au client doivent passer par `buildErrorBody()` / `sanitizeErrorMessage()` depuis `open-sse/utils/error.ts` — ne placez jamais directement `err.stack` ou `err.message` dans le corps d’une réponse. Consultez [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Étape 5 : Enregistrer les modèles

Ajoutez les définitions des modèles dans `open-sse/config/providerRegistry.ts`.

### Étape 6 : Ajouter des tests

Écrivez des tests unitaires dans `tests/unit/` couvrant au minimum :

- L’enregistrement du fournisseur
- La traduction des requêtes/réponses
- La gestion des erreurs

---

## Liste de contrôle de la Pull Request

- [ ] Les tests réussissent (`npm test`)
- [ ] Le linting réussit (`npm run lint`)
- [ ] Le build réussit (`npm run build`)
- [ ] Les types TypeScript ont été ajoutés pour les nouvelles fonctions et interfaces publiques
- [ ] Aucun secret ni aucune valeur de repli codés en dur
- [ ] Les identifiants publics des services en amont sont intégrés via `resolvePublicCred()` (voir [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), jamais sous forme de littéraux
- [ ] Les réponses d'erreur passent par `buildErrorBody()` / `sanitizeErrorMessage()` — aucune trace de pile brute dans le corps des réponses (voir [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Les commandes shell (`exec` / `spawn`) transmettent les valeurs d'exécution via `env`, et non par interpolation de chaînes
- [ ] Toutes les entrées sont validées avec des schémas Zod
- [ ] Un **fragment** de journal des modifications a été ajouté sous `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` pour les changements visibles par les utilisateurs (voir [`changelog.d/README.md`](./changelog.d/README.md)) — ne modifiez **pas** directement `CHANGELOG.md` ; les fragments sont agrégés au moment de la publication et ne créent jamais de conflits entre les Pull Requests
- [ ] La documentation a été mise à jour (le cas échéant)
- [ ] Aucune nouvelle alerte CodeQL / Secret-Scanning n'a été ouverte, ou chacune a été rejetée avec une justification technique faisant référence au document `docs/security/` pertinent
- [ ] Les routes qui lancent des processus enfants (`/api/mcp/`, `/api/cli-tools/runtime/`) sont classées comme `isLocalOnlyPath()` dans `src/server/authz/routeGuard.ts` — voir la [Règle stricte nº 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Aucun pied de message `Co-Authored-By` dans les messages de commit — les commits doivent apparaître uniquement sous l'identité Git du propriétaire du dépôt (Règle stricte nº 16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Obtenir de l’aide

- **Architecture** : consultez [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Référence de l’API** : consultez [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Documentation sur la sécurité** : [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Documentation sur l’exploitation** : [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problèmes** : [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR** : consultez `docs/adr/` pour les enregistrements des décisions architecturales
