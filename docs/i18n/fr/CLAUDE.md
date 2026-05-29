# CLAUDE.md (Français)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Ce fichier fournit des conseils à Claude Code (claude.ai/code) lors de l'utilisation du code dans ce dépôt.

## Démarrage rapide

```bash
npm install                    # Installer les dépendances (génère automatiquement .env à partir de .env.example)
npm run dev                    # Serveur de développement à http://localhost:20128
npm run build                  # Construction de production (Next.js 16 autonome)
npm run lint                   # ESLint (0 erreurs attendues ; les avertissements sont préexistants)
npm run typecheck:core         # Vérification TypeScript (doit être propre)
npm run typecheck:noimplicit:core  # Vérification stricte (pas d'implicite any)
npm run test:coverage          # Tests unitaires + seuil de couverture (75/75/75/70 — déclarations/lignes/fonctions/branches)
npm run check                  # lint + test combinés
npm run check:cycles           # Détecter les dépendances circulaires
```

### Exécution des tests

```bash
# Fichier de test unique (exécuteur de test natif Node.js — la plupart des tests)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (serveur MCP, autoCombo, cache)
npm run test:vitest

# Tous les suites
npm run test:all
```

Pour la matrice de tests complète, voir `CONTRIBUTING.md` → "Exécution des tests". Pour une architecture approfondie, voir `AGENTS.md`.

---

## Projet en un coup d'œil

**OmniRoute** — proxy/router AI unifié. Un point de terminaison, 160+ fournisseurs LLM, retour automatique.

| Couche            | Emplacement             | Objectif                                                                      |
| ----------------- | ----------------------- | ----------------------------------------------------------------------------- |
| Routes API        | `src/app/api/v1/`       | Routeur d'application Next.js — points d'entrée                               |
| Gestionnaires     | `open-sse/handlers/`    | Traitement des requêtes (chat, embeddings, etc)                               |
| Exécuteurs        | `open-sse/executors/`   | Dispatch HTTP spécifique au fournisseur                                       |
| Traducteurs       | `open-sse/translator/`  | Conversion de format (OpenAI↔Claude↔Gemini)                                   |
| Transformateur    | `open-sse/transformer/` | API de réponses ↔ Complétions de chat                                         |
| Services          | `open-sse/services/`    | Routage combiné, limites de taux, mise en cache, etc                          |
| Base de données   | `src/lib/db/`           | Modules de domaine SQLite (45+ fichiers, 55 migrations)                       |
| Domaine/Politique | `src/domain/`           | Moteur de politique, règles de coût, logique de retour                        |
| Serveur MCP       | `open-sse/mcp-server/`  | 37 outils (30 de base + 3 mémoire + 4 compétences), 3 transports, ~13 portées |
| Serveur A2A       | `src/lib/a2a/`          | Protocole agent JSON-RPC 2.0                                                  |
| Compétences       | `src/lib/skills/`       | Cadre de compétences extensible                                               |
| Mémoire           | `src/lib/memory/`       | Mémoire conversationnelle persistante                                         |

Monorepo : `src/` (application Next.js 16), `open-sse/` (espace de travail moteur de streaming), `electron/` (application de bureau), `tests/`, `bin/` (point d'entrée CLI).

---

## Pipeline de Demande

```
Client → /v1/chat/completions (route Next.js)
  → CORS → validation Zod → auth? → vérification de politique → garde contre l'injection de prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → vérification du cache → limite de taux → routage combo?
      → resolveComboTargets() → handleSingleModel() par cible
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() en amont → réessayer avec backoff
    → traduction de la réponse → flux SSE ou JSON
    → Si API des Réponses : responsesTransformer.ts TransformStream
```

Les routes API suivent un modèle cohérent : `Route → pré-vérification CORS → validation du corps Zod → Auth optionnelle (extractApiKey/isValidApiKey) → application de la politique de clé API → Délégation de gestionnaire (open-sse)`. Pas de middleware global Next.js — l'interception est spécifique à la route.

**Routage combo** (`open-sse/services/combo.ts`) : 14 stratégies (priorité, pondéré, remplissage-préférentiel, round-robin, P2C, aléatoire, le moins utilisé, optimisé par coût, conscient du réinitialisation, aléatoire-strict, auto, lkgp, optimisé par contexte, relais de contexte). Chaque cible appelle `handleSingleModel()` qui enveloppe `handleChatCore()` avec une gestion des erreurs par cible et des vérifications de disjoncteur. Voir `docs/routing/AUTO-COMBO.md` pour le scoring Auto-Combo à 9 facteurs et `docs/architecture/RESILIENCE_GUIDE.md` pour les 3 couches de résilience.

---

## État d'Exécution de Résilience

OmniRoute a trois mécanismes de défaillance temporaire liés mais distincts. Gardez leur portée séparée lors du débogage du comportement de routage. Voir le
[diagramme de résilience à 3 couches](./docs/diagrams/exported/resilience-3layers.svg)
(source : [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
pour une vue d'ensemble.

### Disjoncteur de Fournisseur

**Portée** : tout le fournisseur, par exemple `glm`, `openai`, `anthropic`.

**But** : arrêter d'envoyer du trafic à un fournisseur qui échoue de manière répétée au niveau en amont/service, afin qu'un fournisseur non sain ne ralentisse pas chaque demande.

**Mise en œuvre** :

- Classe principale : `src/shared/utils/circuitBreaker.ts`
- Câblage de porte/exécution de chat : `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de statut d'exécution : `src/app/api/monitoring/health/route.ts`
- Wrappers partagés : `open-sse/services/accountFallback.ts`
- Table d'état persistée : `domain_circuit_breakers`

**États** :

- `CLOSED` : le trafic normal est autorisé.
- `OPEN` : le fournisseur est temporairement bloqué ; les appelants reçoivent une réponse de circuit-ouvert du fournisseur
  ou le routage combo passe à une autre cible.
- `HALF_OPEN` : le délai de réinitialisation a expiré ; autoriser une demande de sonde. Le succès ferme le
  disjoncteur, l'échec l'ouvre à nouveau.

**Valeurs par défaut** (`open-sse/config/constants.ts`) :

- Fournisseurs OAuth : seuil `3`, délai de réinitialisation `60s`.
- Fournisseurs de clé API : seuil `5`, délai de réinitialisation `30s`.
- Fournisseurs locaux : seuil `2`, délai de réinitialisation `15s`.

Seules les statuts de défaillance au niveau du fournisseur devraient déclencher le disjoncteur du fournisseur :

```ts
(408, 500, 502, 503, 504);
```

Ne déclenchez pas le disjoncteur de tout le fournisseur pour des erreurs normales de compte/clés/modèles comme la plupart des
cas `401`, `403`, ou `429`. Ceux-ci appartiennent généralement à un temps de refroidissement de connexion ou à un verrouillage de modèle. Une erreur générique de fournisseur de clé API `403` devrait être récupérable à moins qu'elle ne soit classée
comme une erreur terminale de fournisseur/de compte.

Le disjoncteur utilise une récupération paresseuse, pas un minuteur en arrière-plan. Lorsque `OPEN` expire, des lectures telles que `getStatus()`, `canExecute()`, et `getRetryAfterMs()` rafraîchissent l'état à
`HALF_OPEN`, afin que les tableaux de bord et les constructeurs de candidats combo ne continuent pas à exclure un
fournisseur expiré indéfiniment.

### Temps de Refroidissement de Connexion

**Portée** : une connexion de fournisseur/compte/clés.

**But** : sauter temporairement une mauvaise clé/compte tout en permettant à d'autres connexions pour
le même fournisseur de continuer à traiter des demandes.

**Mise en œuvre** :

- Chemin d'écriture/mise à jour : `src/sse/services/auth.ts::markAccountUnavailable()`
- Sélection/filtrage de compte : `src/sse/services/auth.ts::getProviderCredentials...`
- Calcul de temps de refroidissement : `open-sse/services/accountFallback.ts::checkFallbackError()`
- Paramètres : `src/lib/resilience/settings.ts`

Champs importants sur les connexions de fournisseur :

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Lors de la sélection de compte, une connexion est ignorée tant que :

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Les temps de refroidissement sont également paresseux : lorsque `rateLimitedUntil` est dans le passé, la connexion redevient
éligible. Lors d'une utilisation réussie, `clearAccountError()` efface `testStatus`,
`rateLimitedUntil`, les champs d'erreur, et `backoffLevel`.

Comportement par défaut du temps de refroidissement de connexion :

- Temps de refroidissement de base OAuth : `5s`.
- Temps de refroidissement de base de clé API : `3s`.
- La clé API `429` devrait préférer les indices de réessai en amont (`Retry-After`, en-têtes de réinitialisation, ou
  texte de réinitialisation analysable) lorsque disponibles.
- Les échecs récupérables répétés utilisent un backoff exponentiel :

```ts
baseCooldownMs * 2 ** failureIndex;
```

La protection anti-thundering-herd empêche les échecs concurrents sur la même connexion d'étendre
répétitivement le temps de refroidissement ou d'incrémenter doublement `backoffLevel`.

Les états terminaux ne sont pas des temps de refroidissement. `banned`, `expired`, et `credits_exhausted` sont
destinés à rester indisponibles jusqu'à ce que les identifiants/paramètres changent ou qu'un opérateur les réinitialise.
Ne pas écraser les états terminaux avec un état de temps de refroidissement transitoire.

### Verrouillage de Modèle

**Portée** : fournisseur + connexion + modèle.

**But** : éviter de désactiver toute une connexion lorsque seul un modèle est indisponible ou
limité par quota pour cette connexion.

Exemples :

- Fournisseurs de quota par modèle retournant `429`.
- Fournisseurs locaux retournant `404` pour un modèle manquant.
- Échecs de permission de mode/modèle spécifiques au fournisseur tels que les modes Grok sélectionnés.

Le verrouillage de modèle se trouve dans `open-sse/services/accountFallback.ts` et permet à la même
connexion de continuer à servir d'autres modèles.

### Conseils de Débogage

- Si toutes les clés pour un fournisseur sont ignorées, inspectez à la fois l'état du disjoncteur du fournisseur et `rateLimitedUntil`/`testStatus` de chaque connexion.
- Si un fournisseur semble définitivement exclu après la fenêtre de réinitialisation, vérifiez si le code
  lit l'état brut `state` au lieu d'utiliser `getStatus()`/`canExecute()`.
- Si une clé de fournisseur échoue mais que d'autres devraient fonctionner, préférez le temps de refroidissement de connexion au disjoncteur du fournisseur.
- Si seul un modèle échoue, préférez le verrouillage de modèle au temps de refroidissement de connexion.
- Si un état doit se rétablir de lui-même, il doit avoir un horodatage futur/délai de réinitialisation et un
  chemin de lecture qui rafraîchit l'état expiré. Les statuts permanents nécessitent des changements manuels d'identifiants
  ou de configuration.

## Conventions Clés

### Style de Code

- **2 espaces**, points-virgules, guillemets doubles, largeur de 100 caractères, virgules finales ES5 (appliquées par lint-staged via Prettier)
- **Imports** : externe → interne (`@/`, `@omniroute/open-sse`) → relatif
- **Nommage** : fichiers=camelCase/kebab, composants=PascalCase, constantes=UPPER_SNAKE
- **ESLint** : `no-eval`, `no-implied-eval`, `no-new-func` = erreur partout ; `no-explicit-any` = avertir dans `open-sse/` et `tests/`
- **TypeScript** : `strict: false`, cible ES2022, module esnext, résolution bundler. Préférer les types explicites.

### Base de Données

- **Toujours** passer par les modules de domaine `src/lib/db/` — **jamais** écrire de SQL brut dans les routes ou les gestionnaires
- **Jamais** ajouter de logique dans `src/lib/localDb.ts` (couche de réexportation uniquement)
- **Jamais** importer en vrac depuis `localDb.ts` — importer plutôt des modules spécifiques `db/`
- Singleton DB : `getDbInstance()` depuis `src/lib/db/core.ts` (journalisation WAL)
- Migrations : `src/lib/db/migrations/` — fichiers SQL versionnés, idempotents, exécutés dans des transactions

### Gestion des Erreurs

- try/catch avec des types d'erreurs spécifiques, journaliser avec le contexte pino
- Ne jamais ignorer les erreurs dans les flux SSE — utiliser des signaux d'abandon pour le nettoyage
- Retourner des codes de statut HTTP appropriés (4xx/5xx)

### Sécurité

- **Jamais** utiliser `eval()`, `new Function()`, ou évaluation implicite
- Valider toutes les entrées avec des schémas Zod
- Chiffrer les identifiants au repos (AES-256-GCM)
- Liste de refus des en-têtes en amont : `src/shared/constants/upstreamHeaders.ts` — garder la sanitation, les schémas Zod et les tests unitaires alignés lors de l'édition
- **Identifiants publics en amont** (client_id/secret OAuth de style Gemini/Antigravity/Windsurf + clés Web Firebase extraites des CLIs publiques) : **DOIVENT** être intégrés via `resolvePublicCred()` depuis `open-sse/utils/publicCreds.ts` — **jamais** sous forme de littéraux de chaîne. Voir `docs/security/PUBLIC_CREDS.md` pour le modèle obligatoire.
- **Réponses d'erreur** (HTTP / SSE / gestionnaire d'exécuteur / gestionnaire MCP) : **DOIVENT** passer par `buildErrorBody()` ou `sanitizeErrorMessage()` depuis `open-sse/utils/error.ts` — **jamais** mettre `err.stack` ou `err.message` brut dans un corps de réponse. Voir `docs/security/ERROR_SANITIZATION.md`.
- **Commandes shell construites à partir de variables** : lors de l'appel de `exec()`/`spawn()` avec un script qui nécessite des valeurs d'exécution, les passer via l'option `env` (échappées automatiquement) — **jamais** interpoler des chemins non fiables/externes dans le corps du script. Référence : `src/mitm/cert/install.ts::updateNssDatabases`.
- **Bibliothèques sécurisées par défaut** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)) : préférer Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink plutôt que des implémentations personnalisées lors de l'ajout de nouvelles surfaces sensibles à la sécurité.

---

## Scénarios de Modification Courants

### Ajouter un Nouveau Fournisseur

1. Enregistrer dans `src/shared/constants/providers.ts` (validé par Zod au chargement)
2. Ajouter un exécuteur dans `open-sse/executors/` si une logique personnalisée est nécessaire (étendre `BaseExecutor`)
3. Ajouter un traducteur dans `open-sse/translator/` si format non-OpenAI
4. Ajouter la configuration OAuth dans `src/lib/oauth/constants/oauth.ts` si basé sur OAuth — si le CLI en amont expédie un client_id/secret public, intégrer via `resolvePublicCred()` (voir `docs/security/PUBLIC_CREDS.md`), **jamais** sous forme littérale
5. Enregistrer les modèles dans `open-sse/config/providerRegistry.ts`
6. Écrire des tests dans `tests/unit/` (inclure l'assertion de forme publicCreds si vous avez ajouté un nouveau défaut intégré)

### Ajouter une Nouvelle Route API

1. Créer un répertoire sous `src/app/api/v1/your-route/`
2. Créer `route.ts` avec des gestionnaires `GET`/`POST`
3. Suivre le modèle : CORS → validation du corps Zod → auth optionnelle → délégation du gestionnaire
4. Le gestionnaire va dans `open-sse/handlers/` (importer de là, pas en ligne)
5. Les réponses d'erreur utilisent `buildErrorBody()` / `errorResponse()` depuis `open-sse/utils/error.ts` (auto-sanitisé — ne jamais mettre `err.stack` ou `err.message` brut dans le corps). Voir `docs/security/ERROR_SANITIZATION.md`.
6. Ajouter des tests — y compris au moins une assertion que les réponses d'erreur ne fuient pas les traces de pile (`!body.error.message.includes("at /")`)

### Ajouter un Nouveau Module DB

1. Créer `src/lib/db/yourModule.ts` — importer `getDbInstance` depuis `./core.ts`
2. Exporter des fonctions CRUD pour vos tables de domaine
3. Ajouter une migration dans `src/lib/db/migrations/` si de nouvelles tables sont nécessaires
4. Réexporter depuis `src/lib/localDb.ts` (ajouter à la liste de réexportation uniquement)
5. Écrire des tests

### Ajouter un Nouvel Outil MCP

1. Ajouter la définition de l'outil dans `open-sse/mcp-server/tools/` avec un schéma d'entrée Zod + gestionnaire asynchrone
2. Enregistrer dans l'ensemble d'outils (câblé par `createMcpServer()`)
3. Assigner aux portées appropriées
4. Écrire des tests (invocation de l'outil enregistrée dans la table `mcp_audit`)

### Ajouter une Nouvelle Compétence A2A

1. Créer une compétence dans `src/lib/a2a/skills/` (5 existent déjà : smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. La compétence reçoit le contexte de la tâche (messages, métadonnées) → retourne un résultat structuré
3. Enregistrer dans `A2A_SKILL_HANDLERS` dans `src/lib/a2a/taskExecution.ts`
4. Exposer dans `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Écrire des tests dans `tests/unit/`
6. Documenter dans `docs/frameworks/A2A-SERVER.md` tableau des compétences

### Ajouter un Nouvel Agent Cloud

1. Créer une classe d'agent dans `src/lib/cloudAgent/agents/` étendant `CloudAgentBase` (3 existent déjà : codex-cloud, devin, jules)
2. Implémenter `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Enregistrer dans `src/lib/cloudAgent/registry.ts`
4. Ajouter la gestion OAuth/identifiants si nécessaire (`src/lib/oauth/providers/`)
5. Tests + documenter dans `docs/frameworks/CLOUD_AGENT.md`

### Ajouter un Nouveau Garde-fou / Évaluation / Compétence / Événement Webhook

- Garde-fou : `src/lib/guardrails/` → docs : `docs/security/GUARDRAILS.md`
- Suite d'évaluation : `src/lib/evals/` → docs : `docs/frameworks/EVALS.md`
- Compétence (bac à sable) : `src/lib/skills/` → docs : `docs/frameworks/SKILLS.md`
- Événement Webhook : `src/lib/webhookDispatcher.ts` → docs : `docs/frameworks/WEBHOOKS.md`

---

## Documentation de référence

Pour tout changement non trivial, lisez d'abord l'analyse approfondie correspondante :

| Domaine                                             | Document                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| Navigation dans le dépôt                            | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architecture                                        | `docs/architecture/ARCHITECTURE.md`                               |
| Référence d'ingénierie                              | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (scoring à 9 facteurs, 14 stratégies)    | `docs/routing/AUTO-COMBO.md`                                      |
| Résilience (3 mécanismes)                           | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Relecture du raisonnement                           | `docs/routing/REASONING_REPLAY.md`                                |
| Cadre des compétences                               | `docs/frameworks/SKILLS.md`                                       |
| Système de mémoire (FTS5 + Qdrant)                  | `docs/frameworks/MEMORY.md`                                       |
| Agents cloud                                        | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Garde-fous (PII / injection / vision)               | `docs/security/GUARDRAILS.md`                                     |
| Identifiants publics en amont (Gemini/etc.)         | `docs/security/PUBLIC_CREDS.md`                                   |
| Assainissement des messages d'erreur                | `docs/security/ERROR_SANITIZATION.md`                             |
| Évaluations                                         | `docs/frameworks/EVALS.md`                                        |
| Conformité / audit                                  | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                            | `docs/frameworks/WEBHOOKS.md`                                     |
| Pipeline d'autorisation                             | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Discrétion (TLS / empreinte)                        | `docs/security/STEALTH_GUIDE.md`                                  |
| Protocoles d'agent (A2A / ACP / Cloud)              | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Serveur MCP                                         | `docs/frameworks/MCP-SERVER.md`                                   |
| Serveur A2A                                         | `docs/frameworks/A2A-SERVER.md`                                   |
| Référence API + OpenAPI                             | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Catalogue des fournisseurs (généré automatiquement) | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Flux de publication                                 | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Tests

| Quoi                    | Commande                                                                       |
| ----------------------- | ------------------------------------------------------------------------------ |
| Tests unitaires         | `npm run test:unit`                                                            |
| Fichier unique          | `node --import tsx/esm --test tests/unit/file.test.ts`                         |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                          |
| E2E (Playwright)        | `npm run test:e2e`                                                             |
| Protocole E2E (MCP+A2A) | `npm run test:protocols:e2e`                                                   |
| Écosystème              | `npm run test:ecosystem`                                                       |
| Seuil de couverture     | `npm run test:coverage` (75/75/75/70 — déclarations/lignes/fonctions/branches) |
| Rapport de couverture   | `npm run coverage:report`                                                      |

**Règle PR** : Si vous modifiez le code de production dans `src/`, `open-sse/`, `electron/`, ou `bin/`, vous devez inclure ou mettre à jour des tests dans la même PR.

**Préférence de couche de test** : unité d'abord → intégration (multi-module ou état de la DB) → e2e (UI/workflow uniquement). Encodez les reproductions de bogues en tant que tests automatisés avant ou en même temps que la correction.

**Politique de couverture Copilot** : Lorsqu'une PR modifie le code de production et que la couverture est inférieure à 75 % (déclarations/lignes/fonctions) ou 70 % (branches), ne vous contentez pas de signaler — ajoutez ou mettez à jour des tests, relancez le seuil de couverture, puis demandez une confirmation. Incluez les commandes exécutées, les fichiers de test modifiés et le résultat final de la couverture dans le rapport de la PR.

---

## Flux de travail Git

```bash
# Ne jamais commettre directement sur main
git checkout -b feat/your-feature
git commit -m "feat: décrire votre changement"
git push -u origin feat/your-feature
```

**Préfixes de branche** : `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Format de commit** (Conventional Commits) : `feat(db): ajouter un circuit breaker` — portées : `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Hooks Husky** :

- **pre-commit** : lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push** : `npm run test:unit`

---

## Environnement

- **Runtime** : Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript** : 5.9+, cible ES2022, module esnext, résolution bundler
- **Alias de chemin** : `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Port par défaut** : 20128 (API + tableau de bord sur le même port)
- **Répertoire de données** : variable d'environnement `DATA_DIR`, par défaut `~/.omniroute/`
- **Variables d'environnement clés** : `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Configuration : `cp .env.example .env` puis générez `JWT_SECRET` (`openssl rand -base64 48`) et `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Règles strictes

1. Ne jamais commettre de secrets ou de credentials
2. Ne jamais ajouter de logique à `localDb.ts`
3. Ne jamais utiliser `eval()` / `new Function()` / évaluation implicite
4. Ne jamais commettre directement sur `main`
5. Ne jamais écrire de SQL brut dans les routes — utilisez les modules `src/lib/db/`
6. Ne jamais ignorer silencieusement les erreurs dans les flux SSE
7. Toujours valider les entrées avec des schémas Zod
8. Toujours inclure des tests lors de la modification du code de production
9. La couverture doit rester ≥75 % (déclarations, lignes, fonctions) / ≥70 % (branches). Mesuré actuellement : ~82 %.
10. Ne jamais contourner les hooks Husky (`--no-verify`, `--no-gpg-sign`) sans approbation explicite de l'opérateur.
11. Ne jamais intégrer des client_id/secret OAuth publics ou des clés Web Firebase en tant que littéraux de chaîne — passez toujours par `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Voir `docs/security/PUBLIC_CREDS.md`.
12. Ne jamais retourner `err.stack` / `err.message` brut dans les réponses HTTP / SSE / exécuteur — passez toujours par `buildErrorBody()` ou `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Voir `docs/security/ERROR_SANITIZATION.md`.
13. Ne jamais interpoler des chemins externes ou des valeurs d'exécution dans des scripts shell passés à `exec()`/`spawn()` — passez plutôt par l'option `env`. Référence : `src/mitm/cert/install.ts::updateNssDatabases`.
14. Ne jamais ignorer une alerte CodeQL / Secret-Scanning sans (a) d'abord vérifier la documentation des modèles ci-dessus pour voir si l'assistant s'applique, et (b) enregistrer la justification technique dans le commentaire de rejet. Précédent : `js/stack-trace-exposure` soulevé sur des sites d'appel qui passent déjà par `sanitizeErrorMessage()` est une limitation connue de CodeQL (les assainisseurs personnalisés ne sont pas reconnus) — rejeter comme `faux positif` en faisant référence à `docs/security/ERROR_SANITIZATION.md`.
15. Ne jamais exposer des routes qui lancent des processus enfants (`/api/mcp/`, `/api/cli-tools/runtime/`) sans classification `isLocalOnlyPath()` dans `src/server/authz/routeGuard.ts`. L'application de la boucle de retour se produit inconditionnellement avant toute vérification d'authentification — un JWT divulgué via un tunnel ne peut pas déclencher le lancement de processus. Voir `docs/security/ROUTE_GUARD_TIERS.md`.
16. Ne jamais inclure de bandeaux `Co-Authored-By` qui créditent un assistant IA, un LLM ou un compte d'automatisation (par ex. noms contenant "Claude", "GPT", "Copilot", "Bot" ; e-mails à `anthropic.com` / `openai.com` / adresses `noreply.github.com` détenues par des bots). De tels bandeaux redirigent l'attribution des commits vers le compte du bot sur GitHub, masquant le véritable auteur (`diegosouzapw`) dans l'historique de la PR. Les contributeurs humains — y compris les auteurs de PR upstream et les rapporteurs d'issues portés dans OmniRoute — PEUVENT et DOIVENT être crédités avec des bandeaux standard `Co-authored-by: Name <email>` ; les workflows de port upstream (`/port-upstream-features`, `/port-upstream-issues`) en dépendent.
