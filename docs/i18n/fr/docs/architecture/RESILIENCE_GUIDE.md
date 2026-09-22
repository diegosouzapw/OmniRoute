# Resilience Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute dispose de trois mécanismes de résilience distincts, mais liés. Chacun possède une portée et un objectif différents. Veillez à bien les distinguer lors du débogage du comportement de routage.

![Modèle de résilience à 3 couches](../diagrams/exported/resilience-3layers.svg)

> Source : [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Disjoncteur de fournisseur

**Portée :** fournisseur entier (par exemple, `glm`, `openai`, `anthropic`).

**Objectif :** cesser d’envoyer du trafic à un fournisseur qui rencontre des échecs répétés au niveau du service en amont.

**Implémentation :**

- Classe principale : `src/shared/utils/circuitBreaker.ts`
- Intégration : `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API d’état : `GET /api/monitoring/health`
- API de réinitialisation : `POST /api/resilience/reset`
- Wrappers : `open-sse/services/accountFallback.ts`
- Table de base de données : `domain_circuit_breakers`

**États :**

- `CLOSED` — trafic normal autorisé
- `DEGRADED` — trafic toujours autorisé, mais les échecs plus fréquents du fournisseur sont suivis
- `OPEN` — fournisseur temporairement bloqué ; le routage combiné l’ignore
- `HALF_OPEN` — délai de réinitialisation écoulé ; requête de test autorisée

**Valeurs par défaut configurables (`open-sse/config/constants.ts`, accessibles dans Tableau de bord → Paramètres → Résilience) :**

| Classe  | Dégradé à partir de | Ouvert à partir de | Délai de réinitialisation |
| ------- | ------------------- | ------------------ | ------------------------- |
| OAuth   | 5 échecs            | 8 échecs           | 60s                       |
| Clé API | 7 échecs            | 12 échecs          | 30s                       |
| Local   | dérivé              | 2 échecs           | 15s                       |

`degradationThreshold` détermine quand un fournisseur passe à l’état `DEGRADED` ; `failureThreshold` détermine quand il passe à l’état ouvert et est ignoré. Les profils des fournisseurs locaux ne sont pas encore disponibles sur la page des paramètres de résilience.

**Codes de déclenchement :** uniquement les statuts de niveau fournisseur `[408, 500, 502, 503, 504]`. Ne déclenchez PAS le disjoncteur pour les erreurs de niveau compte (la plupart des erreurs 401/403/429 — celles-ci relèvent de la temporisation ou du verrouillage).

**Récupération différée :** lorsque l’état `OPEN` expire, `getStatus()`, `canExecute()`, `getRetryAfterMs()` actualisent l’état en `HALF_OPEN`. Aucun minuteur en arrière-plan n’est nécessaire.

---

### Temporisation globale facultative des fournisseurs (barrière de fenêtre)

Une quatrième couche, **facultative** (`PROVIDER_COOLDOWN_ENABLED`, désactivée par défaut), conserve une
mémoire inter-requêtes des fournisseurs défaillants dans
`open-sse/services/providerCooldownTracker.ts`. Celle-ci est consultée lors de la résolution des cibles du routage combiné,
afin que les requêtes combinées consécutives cessent de réessayer un fournisseur qui vient
d’échouer. Les entrées de niveau fournisseur respectent la barrière de fenêtre `PROVIDER_PROFILES` :

| Profil  | se déclenche après (`providerFailureThreshold`) | dans un délai de (`providerFailureWindowMs`) | temporisation de (`providerCooldownMs`) |
| ------- | ----------------------------------------------: | -------------------------------------------: | --------------------------------------: |
| OAuth   |                                            `10` |                                      `15min` |                                  `5min` |
| Clé API |                                            `15` |                                      `30min` |                                 `10min` |

En dessous du seuil, le fournisseur n’est **pas** considéré comme étant en temporisation ; une réussite efface
la fenêtre. Les entrées de niveau connexion (`provider:connectionId`) conservent plutôt
le délai exponentiel `minRetryCooldownMs → maxRetryCooldownMs`. Surcharges :
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Protection contre les régressions : `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Période de refroidissement des connexions

**Portée :** une seule connexion/un seul compte/une seule clé de fournisseur.

**Objectif :** ignorer une clé défaillante tandis que les autres connexions du même fournisseur continuent de traiter les requêtes.

**Implémentation :**

- Marquage comme indisponible : `src/sse/services/auth.ts::markAccountUnavailable()`
- Sélection : `getProviderCredentials*` dans le même fichier
- Calcul du refroidissement : `open-sse/services/accountFallback.ts::checkFallbackError()`
- Paramètres : `src/lib/resilience/settings.ts`

**Champs par connexion :**

- `rateLimitedUntil` — horodatage jusqu’à l’expiration du refroidissement
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — compteur de temporisation exponentielle

**Refroidissements par défaut :**

- Base OAuth : 5 s
- Base pour clé API : 3 s
- 429 pour clé API : privilégie les en-têtes `Retry-After`/de réinitialisation en amont/le texte de réinitialisation analysable
- Temporisation : `baseCooldownMs * 2 ** failureIndex`

**Protection contre les afflux simultanés :** empêche des échecs simultanés de prolonger excessivement le refroidissement ou de doubler l’incrémentation de `backoffLevel`.

**États terminaux (PAS des refroidissements) :**

- `banned` — défini par la détection de mots-clés d’interdiction/de bannissement de compte (voir [BAN_DETECTION](../security/BAN_DETECTION.md)), ainsi que par trois refus consécutifs en amont par requête (`request_rejected`, par exemple Anthropic OAuth 403 « Request not allowed » — `open-sse/services/requestRejectedStreak.ts`) ; un refus unique ne fait que mettre la connexion en refroidissement
- `expired` (passe à l’état terminal après un nombre limité de nouvelles tentatives — `EXPIRED_RETRY_MAX = 3` avec temporisation exponentielle — afin que les erreurs OAuth transitoires puissent se résoudre d’elles-mêmes avant la désactivation définitive du compte)
- `credits_exhausted`

Ces états persistent jusqu’à ce que les identifiants changent ou qu’un opérateur les réinitialise. Ne remplacez pas les états terminaux par un état de refroidissement transitoire.

**Récupération différée :** lorsque `rateLimitedUntil` est dépassé, la connexion redevient admissible. Après une utilisation réussie, `clearAccountError()` efface tous les champs d’erreur.

### Plafond d’utilisation Claude OAuth : voie de priorité inférieure + réinitialisation de la limite de session

**Portée :** une connexion d’abonnement Claude (OAuth). Les deux fonctionnalités sont **activables par
connexion** (Modifier la connexion → section Claude → `lowPriorityMode` / `autoLimitReset` dans
`providerSpecificData`, toutes deux désactivées par défaut) et reproduisent les commandes `/low-priority` et
`/limit-reset` de Claude Code (contrat filaire capturé depuis Claude Code 2.1.263).

**Implémentation :**

- Machine à états + classification des réponses : `open-sse/services/claudeLowPriority.ts`
- Client de statut/réclamation de réinitialisation : `open-sse/services/claudeLimitReset.ts`
- Point d’extension de l’exécuteur (injection d’en-tête + nouvelle tentative sur le même compte) : `open-sse/executors/base.ts::execute()`
- Persistance de l’activation : `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Déclencheur :** le plafond d’utilisation de 5 heures — une réponse `429` dont les en-têtes contiennent
`anthropic-ratelimit-unified-status: rejected` et, lorsque le compte est admissible,
`anthropic-ratelimit-unified-slow-offer: treatment`. Rien n’est envoyé avant cette première réponse
429 liée au plafond ; une rafale de réponses 429 sans en-têtes unifiés suit le chemin de refroidissement normal.

**Voie de priorité inférieure** (`lowPriorityMode`) :

- Lors de la réponse 429 liée au plafond, l’exécuteur accepte l’offre et réessaie immédiatement avec le **même**
  compte en utilisant `anthropic-usage-limit: slow` ; la voie reste active jusqu’à la valeur annoncée par
  `anthropic-ratelimit-unified-reset` (+60 s de marge), et chaque requête durant cette période contient
  l’en-tête. La réponse 429 interceptée n’atteint jamais `handleChatCore` ; la connexion n’est donc
  **pas** mise en refroidissement ni remplacée par rotation.
- `anthropic-ratelimit-unified-slow-status` dans les réponses ultérieures : `active` / `not_needed`
  maintiennent la voie ; `slot_busy` (429) ou une réponse `529` attend la durée indiquée par
  `anthropic-ratelimit-unified-slow-retry-after` du serveur (20 s par défaut, limitée à 5–600 s, avec une variation aléatoire de ±30 %)
  puis réessaie, dans la limite de `anthropic-ratelimit-unified-slow-max-wait` (20 min par défaut, limitée
  à 1 min–6 h) — au-delà, la voie prend fin et une période de repos de 10 minutes bloque toute nouvelle acceptation. L’attente
  est également plafonnée par le temps restant avant l’expiration du délai propre à la requête pour démarrer en amont
  (`resolveFetchStartTimeout`, 10 min par défaut), moins une marge de 5 s : sans ce plafond, le
  délai d’attente maximal par défaut de 20 minutes dépasserait la durée de vie de la requête et la veille serait interrompue
  en cours d’attente, exposant une `TimeoutError` au lieu de la fin normale `max_wait` suivie de la période de repos.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, le renouvellement d’une fenêtre de 5 h, ou
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (qui y met fin avec
  `extra_usage` quel que soit le statut, puisque le dépassement payant couvre désormais le plafond) mettent fin à la voie ; la
  réponse suit alors le chemin de refroidissement normal. `budget_exhausted` est mémorisé jusqu’à
  la réinitialisation annoncée du budget (≤ 8 jours).
- La vérification du plafond s’exécute après les nouvelles tentatives internes de l’exécuteur déclenchées par une réponse 400 (modification
  du contexte, plafonnement de la réflexion/de l’effort, apprentissage automatique des paramètres), afin qu’une réponse 429 liée au plafond n’apparaissant que lors
  de l’une de ces nouvelles tentatives soit tout de même interceptée au lieu d’atteindre le chemin de refroidissement.
- L’état est conservé en mémoire par connexion (un redémarrage entraîne une réponse 429 supplémentaire liée au plafond avant la nouvelle acceptation).

**Réinitialisation de la limite de session** (`autoLimitReset`, tentée avant la voie lorsque les deux sont activées) :

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloc `juniper_tide` ;
  lorsque `arm: "reset"` et `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` avec
  `{ "program": "juniper_tide" }` (UUID de l’organisation provenant de
  `providerSpecificData.organizationUUID`, solution de secours lors de l’amorçage).
- `result: reset|not_limited` → la requête est retentée à pleine vitesse (sans en-tête de ralentissement).
  `already_used` / `not_offered` mémorisent `next_available_at` (une semaine par défaut) ; tout
  échec applique une temporisation de 15 minutes. La réinitialisation n’est possible qu’une fois par semaine et reste comptabilisée dans la
  limite hebdomadaire.

Protections contre les régressions : `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinité de session (#7274)

**Portée :** une session cliente (en-tête `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) épinglée à une connexion, pour **n’importe quel** fournisseur.

**Objectif :** maintenir un agent multi-tour (Claude Code, aider, agents personnalisés) sur le même compte d’une requête à l’autre, afin de réduire la perte de contexte entre comptes et les erreurs 429 répétées lors des démarrages à froid chez les fournisseurs dont l’état de session est propre à chaque compte.

**Implémentation :**

- Résolution du TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Sélection/création de l’épinglage : `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extraction de l’en-tête (générique, tout fournisseur) : `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Table d’épinglage persistante : `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Paramètre : `sessionAffinityTtlMs` (TTL global en ms, `0` le désactive) — `src/lib/db/settings.ts`. Renommé depuis `codexSessionAffinityTtlMs`, auparavant spécifique à Codex, par la migration `124_generic_session_affinity_ttl.sql`, qui reprend tout TTL Codex précédemment configuré comme nouvelle valeur par défaut.

Avant #7274, `resolveSessionAffinityTtlMs()` renvoyait immédiatement `0` pour tous les fournisseurs sauf `codex`. Le paramètre TTL (ainsi que les en-têtes de session) n’avait donc aucun effet ailleurs, même si le mécanisme d’épinglage et l’extraction des en-têtes étaient déjà indépendants du fournisseur. Le correctif a supprimé ce retour anticipé ; le TTL s’applique désormais uniformément à tous les fournisseurs dès lors que sa valeur globale est supérieure à `0`.

Les trois en-têtes d’affinité de session ne sont jamais transmis en amont — les exécuteurs construisent leurs propres en-têtes en amont à partir de zéro au lieu de transmettre ceux du client ; ils restent donc uniquement des identifiants de corrélation internes.

### Baux exclusifs de connexion de session gérée

**Portée :** un client/une session HTTP géré(e) actif/active possède une connexion OmniRoute éligible.

**Objectif :** fournir une propriété exclusive et durable de la connexion aux clients nécessitant une barrière de routage stricte entre les requêtes. Cela diffère de l’affinité de session, qui constitue une préférence souple de continuité : un bail exclusif conserve l’état du cycle de vie dans SQLite, impose l’unicité globale du propriétaire actif et de la connexion active, et rejette une génération obsolète avant l’envoi au fournisseur.

Cette fonctionnalité est activée séparément pour chaque clé API. Une clé gérée doit disposer de la portée `lease:exclusive` et d’une liste `allowedConnections` explicite et non vide. Tout client HTTP peut utiliser le point de terminaison du cycle de vie ; aucun nom de client, agent utilisateur, fournisseur, méthode OAuth ou modèle n’est requis. Le bail porte sur une connexion, et non sur un modèle ; un changement de modèle conserve donc la liaison tant que la connexion reste normalement éligible. Les règles habituelles relatives au modèle, au quota, à l’état de santé, au délai de récupération et à la liste d’autorisation restent prépondérantes et peuvent faire basculer la même génération vers une autre connexion libre et éligible.

Le cycle de vie utilise `POST /api/v1/session-leases` avec les actions JSON `acquire`, `renew` et `release`. Les requêtes d’inférence gérées présentent la valeur opaque `X-OmniRoute-Lease-Owner` et la valeur exacte `X-OmniRoute-Lease-Generation`. Le propriétaire utilise le préfixe `vlo_` suivi de 43 caractères base64url ; seul son hachage SHA-256 est stocké. Chaque barrière d’envoi finale lie également l’ID de la clé API authentifiée et l’ID de la connexion active. Les en-têtes de contrôle du bail sont supprimés des journaux, des instantanés de requêtes conservés et des en-têtes des exécuteurs en amont.

Si le routage ordinaire dispose de candidats gérés éligibles, mais que chaque candidat libre est occupé par un bail actif étranger, OmniRoute renvoie le code HTTP `429`, le code indiquant une capacité de bail indisponible, un état d’attente de capacité et un en-tête `Retry-After` borné, calculé à partir de l’expiration pertinente la plus proche. Une absence ordinaire d’éligibilité ne constitue pas un conflit de bail et conserve la sémantique existante des erreurs de routage.

Les mécanismes associés restent distincts :

- L’occupation des sessions OAuth est une distribution souple, locale au processus, pour les comptes OAuth.
- Les sémaphores de compte accordent des autorisations de requêtes concurrentes et prennent fin lorsqu’une requête se termine.
- Les baux exclusifs de connexion de session gérée assurent une propriété durable liée au cycle de vie, avec une barrière de génération.

---

## 3. Verrouillage de modèle

**Portée :** triplet fournisseur + connexion + modèle.

**Portée de la clé selon le statut :** le statut de l’échec détermine la clé dans laquelle un verrouillage est enregistré
(`resolveLockoutScope()` dans `open-sse/services/accountFallback/exactModelLock.ts`) :

- `429` / `403` / `402` — un signal de quota ou de droits d’accès — verrouillent la **famille de quotas** :
  pour codex, toute la portée `codex` / `spark` (chaque modèle `gpt-5*` de la
  connexion) ; pour les autres fournisseurs, `getQuotaScopedModelForProvider()`.
- `404` verrouille le modèle seul (`getModelLockKey()` restreint `not_found`).
- Tout autre statut — les échecs de transport/serveur `5xx` et le `502` synthétisé
  par OmniRoute à la suite de la validation de la qualité — verrouille uniquement
  le triplet **exact** fournisseur/connexion/modèle. Un flux défectueux sur un
  modèle ne constitue pas une preuve concernant le quota du compte ; avant cette
  règle, une seule réponse vide sur `codex/gpt-5.6-luna` retirait du routage tous
  les modèles `gpt-5*` de cette connexion pendant 2 à 30 min (avec escalade),
  alors que son quota n’était pas affecté.
- L’option `scope` explicite d’un appelant est toujours prioritaire (Antigravity transmet `"exact"`).

**Objectif :** éviter de désactiver toute une connexion lorsqu’un seul modèle est indisponible ou limité par un quota.

**Exemples :**

- Fournisseurs avec quota par modèle renvoyant 429
- Fournisseurs locaux renvoyant 404 pour un modèle manquant
- Échecs d’autorisation propres au fournisseur pour un mode/modèle (par ex., les modes Grok)

**Implémentation :** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Tableau de bord des périodes de récupération des modèles (v3.8.0)

Interface utilisateur : Paramètres → Périodes de récupération des modèles (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Répertorie les verrouillages actifs avec : fournisseur, connexion, modèle, motif, expiresAt. Les opérateurs peuvent réactiver manuellement un modèle depuis la carte.

**API REST :**

- `GET /api/resilience/model-cooldowns` — répertorie les verrouillages actifs
- `DELETE /api/resilience/model-cooldowns` — réactivation manuelle. Corps : `{provider, connection, model}`. Authentification : gestion.

### Interface des paramètres de verrouillage + récupération par décroissance après succès (v3.8.23)

Le verrouillage de modèle est passé d’un comportement codé en dur et toujours actif
à une fonctionnalité entièrement configurable, facultative et dotée de son propre
mécanisme de récupération autoréparateur.

**Carte des paramètres :** Paramètres → Verrouillage de modèle
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Elle est **distincte** de la carte `ModelCooldownsCard` en lecture seule ci-dessus
(qui se contente de _répertorier_ les verrouillages actifs) — la nouvelle carte
_configure les paramètres_. Les valeurs par défaut se trouvent dans
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) :

| Paramètre               | Valeur par défaut                | Signification                                                                          |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Interrupteur principal — le verrouillage de modèle est **désactivé par défaut**.       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statuts en amont comptabilisés comme des échecs propres au modèle.                     |
| `baseCooldownMs`        | `120_000` (120 s)                | Durée initiale du verrouillage après le premier échec.                                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Plafond de la période de récupération après escalade.                                  |
| `maxBackoffSteps`       | `10`                             | Nombre maximal d’étapes d’escalade du délai exponentiel.                               |
| `useExponentialBackoff` | `true`                           | Indique si les échecs répétés augmentent exponentiellement la période de récupération. |

Les paramètres sont conservés dans le magasin de paramètres habituel et validés
par le schéma des paramètres de résilience ; la carte borne `baseCooldownMs`/`maxCooldownMs`
(avec `maxCooldownMs ≥ baseCooldownMs`) ainsi que `maxBackoffSteps`.

**Récupération par décroissance après succès :** la récupération ne repose **pas**
uniquement sur l’expiration d’un minuteur. Une réponse saine réduit progressivement
le nombre d’échecs du modèle, de sorte qu’un modèle rétabli pendant la fenêtre cesse
son escalade (et soit déverrouillé) avant l’expiration prévue de son minuteur. Lorsqu’une
cible de combinaison réussit, `open-sse/services/combo.ts` appelle `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), qui **divise par deux** la valeur
`failureCount` stockée (`Math.floor(failureCount / 2)`) ; lorsqu’elle atteint `0`,
l’entrée de verrouillage est entièrement supprimée. La fonction complémentaire
`recordModelLockoutFailure()` incrémente le compteur (et augmente la période de
récupération) lors d’échecs survenant dans la fenêtre d’escalade. Cette décroissance
après succès s’ajoute à la simple expiration du minuteur — l’un ou l’autre de ces
mécanismes peut réactiver un modèle.

**État :** les verrouillages sont conservés **en mémoire** (des `Map` propres à
chaque processus contenant des `ModelLockoutEntry`, indexées par
`provider:connectionId:model`, et des verrouillages de portée exacte indexés par
`provider:connectionId:exact:model`), et non persistés dans
la DB — ils sont perdus au redémarrage. Les _paramètres_ sont persistés ; l’_état_
des verrouillages actifs est éphémère.

---

## 4. Contrôle de la concurrence pour le partage de quota (v3.8.36)

Les comptes avec abonnement (GLM, MiniMax, etc.) n'acceptent souvent qu'environ 1 à 3 requêtes
simultanées ; dépasser cette limite déclenche des erreurs 429 et des périodes de refroidissement. Ce problème est particulièrement marqué avec
les combinaisons de **partage de quota** (`qtSd/…`), où plusieurs clés API partagent un même compte
en amont. Trois couches empêchent la saturation d'un compte partagé.

### Limite de concurrence par connexion (`max_concurrent`)

Chaque connexion de fournisseur peut déclarer une limite `max_concurrent`
(`provider_connections.max_concurrent`, définie dans la fenêtre modale de connexion / l'API / la BDD).
Laissez-la vide pour n'appliquer aucune limite. Il s'agit du paramètre unique qui pilote la couche de sérialisation
ci-dessous — définissez-le sur la concurrence réelle du compte (par exemple, GLM ~1, MiniMax ~2).

### Sérialisation des requêtes de partage de quota

Lorsqu'un routage de partage de quota cible une connexion qui déclare une valeur
`max_concurrent` positive, les requêtes simultanées adressées à ce **compte** sont sérialisées au moyen d'un
sémaphore propre à la connexion (clé `qsconn:<connectionId>`) : les requêtes excédentaires **attendent dans
la file d'attente** au lieu de saturer le compte. Le mécanisme est **ouvert en cas d'échec** : si la
file est saturée ou si un délai expire, la requête est exécutée sans créneau plutôt que de rejeter une requête
pouvant être acheminée. Activez ou désactivez cette option dans **Paramètres → Résilience → Concurrence
par connexion pour le partage de quota** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, activée
par défaut). En l'absence de limite `max_concurrent`, le comportement reste inchangé.

> La barrière de routage du partage de quota (`selectQuotaShareTarget`, DRR + P2C) est elle-même
> ouverte en cas d'échec et ne fait que _déprioriser_ une connexion ayant atteint sa limite — avec un
> pool ne comportant qu'une seule connexion, elle ne peut pas imposer de limite stricte ; c'est donc ce sémaphore qui
> contient réellement l'afflux.

### Nouvelle tentative tenant compte du refroidissement des combinaisons

Pour chaque stratégie de combinaison (lorsqu'elle est activée), une requête qui produirait définitivement une erreur 429
en raison d'un COURT refroidissement transitoire attend la fin de celui-ci puis est réacheminée au lieu de
renvoyer l'erreur 429 — cela couvre les fenêtres TPM/RPM de type Gemini (délai `retry-after` d'environ 60 s)
pour les combinaisons multimodèles, par exemple lorsque les deux cibles d'une combinaison à 2 modèles atteignent une limite
de débit propre au modèle. Ce comportement est encadré par `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) dans **Paramètres → Résilience**. Il n'attend jamais pour les motifs `quota_exhausted`
(verrouillé jusqu'à minuit), d'authentification ou de ressource introuvable.

---

## 5. Contrôle d’admission de la file d’attente des requêtes (v3.8.49 · issue #6593)

**Portée** : la file d’attente locale de limitation du débit par fournisseur+connexion (`open-sse/services/rateLimitManager.ts`,
reposant sur Bottleneck), située un niveau sous les trois mécanismes ci-dessus.

**`maxWaitMs` limite l’attente dans la file ; `executionMaxWaitMs` limite l’exécution.**
Ces deux limites sont volontairement distinctes, et aucune n’alimente l’autre.

`resilienceSettings.requestQueue.maxWaitMs` est le **budget d’attente dans la file** : il
couvre l’attente d’un créneau chez le fournisseur, puis le temps passé à l’état QUEUED, et son minuteur est
annulé dès que la tâche quitte l’état QUEUED et commence son exécution
(`rateLimitManager.ts`, `wrappedFn`). Une requête qui le dépasse n’atteint jamais
le service en amont. La valeur par défaut est 30000ms, fournie par `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
dans `src/lib/resilience/settings.ts` et verrouillée par
`tests/unit/ratelimit-admission-control-6593.test.ts`, de sorte que toute modification
fait échouer ce test au lieu de laisser silencieusement ce paragraphe devenir obsolète.

`resilienceSettings.requestQueue.executionMaxWaitMs` est la valeur que Bottleneck
reçoit comme `expiration` de la tâche, dont le minuteur ne démarre qu’après l’envoi. Elle sert
de filet de sécurité pour les exécuteurs ne disposant pas de leur propre délai d’expiration en amont, et elle est
augmentée jusqu’au délai d’expiration au démarrage de la récupération propre à l’exécuteur lorsque celui-ci est plus long, afin qu’elle
ne puisse pas interrompre une réponse saine en cours. Valeur par défaut : 600000ms (10 min).

L’utilisation du budget de file comme `expiration` provoquait auparavant l’arrêt en cours d’exécution des passerelles
non incrémentales — celles-ci s’exécutent légitimement pendant plusieurs minutes avant l’arrivée des premiers octets —
et c’est pourquoi une expiration est exposée sous la forme `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), tandis que le budget de file porte le
code d’expiration de la file. Remplacez l’une ou l’autre valeur via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ou le tableau de bord
(**Paramètres → Résilience**). Lors de leur normalisation, les deux valeurs sont limitées à 1ms–24h.

**Priorité, pour les deux :** la variable d’environnement fournit uniquement la valeur _par défaut_. Une valeur
persistée dans `resilienceSettings.requestQueue` (tableau de bord / correctif d’API, stockée
dans `key_value`) prévaut sur celle-ci, et une valeur par connexion
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` prévaut à son tour. Définir
la variable d’environnement sur un déploiement qui possède déjà une valeur persistée
ne change donc rien — effacez ou mettez plutôt à jour le paramètre persistant.

Le temps de résidence dans la file est limité par `maxWaitMs` ; la valeur `maxQueueDepth` ci-dessous limite le
nombre d’appelants pouvant être placés simultanément dans la file.

**`maxQueueDepth` — plafond d’admission facultatif (nouveau).** `resilienceSettings.requestQueue.maxQueueDepth`
limite le nombre de requêtes pouvant rester dans la file (sans avoir encore été envoyées) simultanément pour une
paire fournisseur+connexion. Lorsque la file contient déjà `maxQueueDepth`
requêtes, une nouvelle requête est immédiatement rejetée avec une erreur typée
`code: "RATE_LIMIT_QUEUE_FULL"` **avant** même d’atteindre `limiter.schedule()`
— le rejet est donc peu coûteux et intervient avant tout travail ultérieur
de compression / traduction du prompt pour cette requête. Valeur par défaut : `0` =
désactivé, ce qui préserve le comportement existant de file non bornée ; plage limitée à 0–100000.
Remplacez cette valeur via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ou
`resilienceSettings.requestQueue.maxQueueDepth` (correctif via le tableau de bord/l’API).

La vérification d’admission elle-même est une fonction pure
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), ce qui permet
de la tester unitairement sans véritable limiteur Bottleneck.

> La RFC à l’origine de #6593 proposait également un indicateur `bypassCompressionOnRateLimit`.
> Dans ce dépôt, le pipeline `open-sse/services/compression/` effectue la
> compression du prompt/contexte sur la requête LLM sortante (`chatCore.ts`,
> autour du bloc `resolveCompressionSettings`/`selectCompressionStrategy`),
> et non la compression de la réponse HTTP sur les corps 429 synthétisés — il n’existe aucun
> chemin de code correspondant à un indicateur de contournement littéral. Cette étape de compression du prompt
> s’exécute aussi actuellement _avant_ `withRateLimit()` dans le pipeline de requêtes ; par conséquent,
> la réorganisation nécessaire pour l’ignorer lors d’un rejet dû à une file pleine constitue une modification distincte et plus
> importante que le périmètre de cette issue. Elle n’a volontairement **pas** été implémentée
> ici et reste un suivi potentiel si le gain en ressources CPU justifie le
> risque lié à la réorganisation.

---

## 6. Chien de garde du débit des flux lents (#9709)

La protection facultative `resilienceSettings.streamRecovery.throughputWatchdog` détecte
un upstream qui continue d’envoyer des fragments, mais produit une sortie d’assistant
à un débit utile inférieur au seuil configuré. Elle est délibérément distincte du délai
d’inactivité : les signaux de maintien et les métadonnées ne réinitialisent aucun des
deux minuteurs et ne sont pas considérés comme une progression. Elle est également
distincte de la limite stricte de durée d’une tentative (#9153), qui reste un plafond
de sécurité absolu, quelle que soit la qualité de la sortie.

Le chien de garde nécessite une période de préchauffage suivie d’une fenêtre glissante
complète avant de pouvoir interrompre la tentative. Il comptabilise les deltas de texte
provenant des événements de sortie des API Chat Completions et Responses (comme
approximation prudente du nombre d’octets UTF-8), ignore les événements vides ou
contenant uniquement des données d’utilisation, et suspend son évaluation tant que des
événements d’appel d’outil ou de raisonnement sont en cours. Il est désactivé par
défaut et peut être activé avec `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ; la
fenêtre, la période de préchauffage, le débit minimal et la sortie mesurable minimale
sont bornés par la couche normale de normalisation des paramètres de résilience.

Lorsqu’elle est activée, une interruption par le chien de garde s’applique uniquement
à la tentative upstream active. Avant l’envoi de tout octet visible par le client, le
mécanisme existant de récupération précoce sur le même compte peut relancer la
tentative. Après la validation, le flux n’est jamais rejoué aveuglément ; seul le
contrat existant de continuation sécurisée en cours de flux peut raccorder un suffixe.
La finalisation reste à exécution unique, de sorte que la comptabilisation de
l’utilisation et la libération du sémaphore ne soient pas dupliquées.

---

## 7. Rectification du statut upstream (erreurs de quota mal déclarées)

**Périmètre :** une passerelle upstream qui signale un épuisement temporaire du quota avec un statut HTTP incorrect.

**Objectif :** corriger un statut trompeur AVANT la classification, afin que les consommateurs en aval (moteur de repli, agrégation combinée, réponse destinée au client) voient la véritable nature réessayable de l’échec.

Certaines passerelles signalent un épuisement TEMPORAIRE du quota avec un statut
HTTP non réessayable. `agentrouter.org` renvoie `403` (parfois `400`) avec un corps
en chinois (`用户额度不足` / `额度不足`) au lieu du statut standard `429`. Les clients
comme Claude Code considèrent `403` comme permanent et interrompent la session ;
sans correction, le moteur de repli le classifierait comme `AUTH_ERROR` au lieu d’un
événement de quota.

**Implémentation :**

- Registre + mécanisme de correspondance : `open-sse/config/upstreamStatusRestatement.ts` — une
  liste de règles par fournisseur (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), évaluées via `applyStatusRestatement()`.
- Point d’appel : le bloc `providerFailure:` dans `open-sse/handlers/chatCore.ts`
  (vers la ligne 3654), juste après que `parseUpstreamError()` a analysé une réponse
  upstream comportant un statut HTTP d’erreur (`!providerResponse.ok`), et avant
  toute classification, afin que chaque consommateur en aval voie le statut
  corrigé. Les erreurs intégrées dans un flux SSE `200` suivent un chemin distinct
  d’analyse du flux, exécuté ultérieurement, et ne sont **pas** couvertes par ce
  hook à l’heure actuelle — il s’agit d’une limitation connue, qui n’est pas encore
  pertinente pour le statut erroné d’agentrouter (lequel se manifeste par un statut
  HTTP d’erreur).
- Éligibilité aux nouvelles tentatives : `429` figure dans `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), de sorte qu’une erreur dont le
  statut a été rectifié comporte une véritable fenêtre de nouvelle tentative au lieu
  d’être exposée comme un `403` sans issue.
- La valeur synthétique de `60s` pour `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  correspond uniquement à ce que la réponse rectifiée indique au **client** ; elle
  ne constitue pas en elle-même la durée interne de temporisation ou de verrouillage
  de la connexion — celle-ci est régie séparément par le mécanisme qui traite
  effectivement l’erreur rectifiée (la temporisation de connexion avec délai
  exponentiel croissant, §2, dont la base est de `3s` pour les fournisseurs à clé
  d’API ; ou le verrouillage de modèle, §3, pour les fournisseurs à quota par modèle
  comme agentrouter). Le routeur peut redevenir éligible à une nouvelle tentative
  interne avant l’expiration de la fenêtre de 60s annoncée au client — il s’agit
  d’une marge intentionnelle, pas d’un bug.

Les erreurs permanentes (`无权访问模型` d’agentrouter — aucun accès à ce modèle) ne sont
JAMAIS rectifiées : `excludeMarkers` oppose son veto à la règle même lorsque
`textMarkers` correspond, de sorte que l’erreur conserve son statut d’origine et que
rien ne la réessaie indéfiniment. La règle de classification du fournisseur
correspondante (`agentrouter-model-access-denied` dans `open-sse/config/providerErrorRules.ts` :
`reason: "auth_error"`, `scope: "model"`, une temporisation de base déclarée de `6h`)
est consultée par `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_avant_ le retour anticipé générique `FORBIDDEN` de la catégorie apikey, sous réserve
de `honorsRuleLockScope(provider)` (#10334 — actuellement exclusif à agentrouter via
la liste d’autorisation `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dans
`providerErrorRules.ts`). La temporisation déclarée de 6h par la règle est transmise
sous la forme `fallbackResult.baseCooldownMs`, mais alimente toujours le chemin
préexistant de verrouillage pour quota par modèle (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, inchangé par #10334 hormis la source de la
temporisation) : elle est plafonnée à la valeur `mlSettings.maxCooldownMs` de
l’opérateur (par défaut `1_800_000ms` / 30min), comme tous les autres verrouillages de
modèle, et le _motif de verrouillage persisté_ reste la valeur préexistante codée en
dur `"forbidden"`, et non la valeur `"auth_error"` de la règle — seule la durée de
temporisation est respectée de bout en bout, pas la chaîne du motif. La connexion
elle-même reste active ; les autres modèles utilisant la même connexion ne sont pas
affectés.

Les erreurs de quota reformulées (`额度不足`) atteignent une règle de fournisseur en production
(`agentrouter-user-quota-exhausted` : `reason: "quota_exhausted"`, `scope:
"connection"`, sans délai de récupération propre déclaré — la valeur par défaut du
backoff adaptatif de la couche de persistance s'applique). Depuis #10334, `scope` sur
`ProviderErrorRuleMatch` EST pris en compte de bout en bout, mais **uniquement** pour les fournisseurs figurant dans
la liste d'autorisation `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
actuellement uniquement `"agentrouter"`, avec activation conditionnelle via `honorsRuleLockScope()`). Pour tous
les autres fournisseurs, `scope` reste informatif, exactement comme avant #10334.
`checkFallbackError` expose la portée de la règle correspondante sous la forme
`fallbackResult.ruleScope` ; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) est le garde partagé qui confirme qu'un
`ruleScope` peut réellement être pris en compte en toute sécurité comme un signal auto-récupérable
à l'échelle de la connexion (portée `"connection"`, motif `quota_exhausted`, jamais `permanent`,
jamais `creditsExhausted` — une protection contre une future règle associant la portée
`"connection"` à un état de compte permanent). Deux consommateurs l'appellent :

- **Persistance** (`markAccountUnavailable()`, `src/sse/services/auth.ts`) :
  au lieu de tomber dans la branche de verrouillage **par modèle** du fournisseur
  transparent (agentrouter utilise `passthroughModels: true` → `hasPerModelQuota()`
  renvoie `true`), elle applique un **délai de récupération temporaire de la connexion** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, jamais un état terminal
  (`credits_exhausted`/`banned`/`expired`) — afin que la connexion se rétablisse
  automatiquement une fois le délai expiré, sans nécessiter de réinitialisation manuelle des identifiants.
  Cette opération est ignorée pour les connexions avec `disableCooling: true` (#2997) : cette désactivation
  retombe alors sur le verrouillage par modèle (un compromis documenté —
  voir le commentaire du code au-dessus de la branche).
- **Routage combiné au sein d'une même requête** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`) : le même garde ajoute la
  connexion à l'ensemble en mémoire `exhaustedConnections`, indexé par
  `${provider}:${connectionId}`. Cela ignore uniquement une cible restante de la MÊME REQUÊTE
  qui _porte elle-même déjà exactement ce `connectionId`_ dans son propre
  objet cible (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` avant la recherche dans `exhaustedConnections`) — une combinaison basée sur une simple
  liste de modèles, dans laquelle les cibles sœurs ne portent pas leur propre `connectionId`
  épinglé et où celui-ci n'est résolu qu'à chaque envoi à partir de l'en-tête
  `X-OmniRoute-Selected-Connection-Id` de la réponse, ne correspond jamais à cette clé. Dans
  ce cas courant, la véritable protection empêchant une étape restante de réutiliser le
  compte qui vient d'être épuisé n'est PAS cet ensemble — c'est la couche de persistance ci-dessus
  (le `rateLimitedUntil` de la connexion est désormais dans le futur), combinée à
  ce même garde qui supprime `transientRateLimitedProviders` pour cet
  échec (voir « Conception en deux étapes » et le commentaire du code sur la branche
  `isAgentrouterConnectionQuotaScope` dans `targetExhaustion.ts`) : puisque
  cet ensemble reste non marqué, le forçage `allowRateLimitedConnection` de `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ne s'active PAS pour
  les étapes restantes du fournisseur ; le filtre `rateLimitedUntil` de la sélection des
  identifiants (`src/sse/services/auth.ts:1238`) est donc respecté normalement et une
  étape restante sélectionne soit une autre connexion agentrouter encore admissible,
  soit échoue faute d'identifiants disponibles — elle ne force pas sa réutilisation de la
  connexion que cette branche vient de placer en délai de récupération.

### Conception en deux étapes : reformulation du statut, puis classification

La reformulation du statut (`upstreamStatusRestatement.ts`) et les règles de
classification des fournisseurs (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sont des registres distincts qui utilisent tous deux comme clés l'identifiant
du fournisseur et des marqueurs textuels, mais ils s'exécutent à des endroits différents et servent des
objectifs différents : la reformulation réécrit tôt le statut HTTP dans `chatCore.ts` ;
les règles de classification choisissent le `reason` de repli et le `scope` de verrouillage
(`model` / `provider` / `connection`) dans `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Les règles de classification ne voient le **texte** complet de l'erreur (nécessaire pour faire correspondre
des marqueurs du corps comme `额度不足`) que pour les fournisseurs figurant dans la liste d'autorisation
`FULL_TEXT_RULE_PROVIDERS` de `providerErrorRules.ts` — actuellement uniquement `"agentrouter"`. Pour
tous les autres fournisseurs du **catalogue intégré**, `checkFallbackError` transmet à
`getProviderErrorRuleMatch` uniquement l'erreur structurée (`{code, type}`), ce qui
suffit pour les règles fondées sur les en-têtes, le statut ou le code, mais ne permet pas de détecter les marqueurs textuels du corps.
L'utilitaire `resolveRuleMatchBody()` effectue cette sélection : le texte complet de l'erreur
pour les fournisseurs figurant dans la liste d'autorisation, et l'erreur structurée dans les autres cas. L'ajout d'un
fournisseur **intégré** à `FULL_TEXT_RULE_PROVIDERS` constitue une activation explicite
par fournisseur — elle existe afin que le chemin par défaut de chaque fournisseur absent de la
liste reste strictement identique octet pour octet.

Le `scope` d'une règle (`model` / `provider` / `connection`) constitue une activation distincte
de `FULL_TEXT_RULE_PROVIDERS` : `checkFallbackError` l'expose uniquement sous la forme
`fallbackResult.ruleScope`, et les consommateurs en aval ne lui donnent une portée
autre qu'une étiquette informative que pour les fournisseurs figurant dans la
liste d'autorisation `HONORS_RULE_LOCK_SCOPE_PROVIDERS` du même fichier (`activation conditionnelle via
honorsRuleLockScope()` — actuellement uniquement `"agentrouter"`). Voir « Erreurs de quota
reformulées » ci-dessus pour savoir ce que fait réellement une correspondance `scope: "connection"` une fois
qu'un fournisseur figure dans cette liste d'autorisation.

**#11104 — les règles déclarées par l’opérateur contournent les deux listes d’autorisation.** Un opérateur peut
déclarer à l’exécution une règle par fournisseur via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
sans modifier ce fichier. Subordonner une règle d’opérateur à
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — des listes
d’autorisation destinées à protéger le comportement **par défaut** des règles
intégrées au catalogue — rendrait le mécanisme de configuration inopérant
pour tous les fournisseurs sauf ceux qui y figurent déjà, puisque la
déclaration de la règle constitue déjà l’acceptation explicite de
l’opérateur. `resolveRuleMatchBody()` et `honorsRuleLockScope()` vérifient
toutes deux `hasOperatorRuleForProvider()` en premier : un fournisseur doté
d’une règle d’opérateur reçoit le texte brut de l’erreur et voit son `scope`
déclaré respecté, qu’il figure ou non dans l’une ou l’autre liste
d’autorisation.

**Limite connue — `providerRuleRegistry` n’est jamais consulté pour le code HTTP 400.**
La branche `BAD_REQUEST` de `checkFallbackError` classe entièrement le statut
400 à l’aide de ses propres tableaux de motifs (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, etc. dans `accountFallback.ts`) et effectue un
retour avant d’atteindre la branche `configuredRule`/`getProviderErrorRuleMatch`
située au-dessus. Une règle intégrée au catalogue (ou une règle d’opérateur)
avec `status: 400` est syntaxiquement valide, mais ne sera jamais déclenchée.
Aucune règle existante ne cible actuellement le statut 400 ; rien en
production n’est donc affecté — mais une future règle pour le statut 400
nécessitera d’abord une modification de cette branche, ce qui constitue un
changement plus important que l’ajout d’une règle (cela reclassifie le statut
400 pour tous les fournisseurs qui dépendent déjà du comportement fondé sur
les tableaux de motifs) et dépasse le périmètre de l’ajout d’une règle pour
un seul fournisseur.

### Ajout d’une nouvelle passerelle qui restitue incorrectement les quotas

1. Enregistrez un tableau de règles dans `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Veillez à ce que
   `textMarkers` soit spécifique au fournisseur ; ne réutilisez jamais de
   formulations anglaises génériques susceptibles d’entrer en conflit avec
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Enregistrez éventuellement des règles de classification dans
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) afin de
   choisir la portée de verrouillage appropriée (`connection` pour un quota
   concernant l’ensemble du compte, `model` pour les erreurs propres à un
   modèle). Cette étape ne prend effet en production, pour les fournisseurs
   dont les règles nécessitent le texte intégral de l’erreur (marqueurs dans
   le corps), que si l’identifiant du fournisseur est ajouté à
   `FULL_TEXT_RULE_PROVIDERS` dans le même fichier — sinon,
   `checkFallbackError` ne transmet à la règle que l’erreur structurée
   `{code, type}`, et une règle fondée sur le texte du corps ne correspondra
   jamais au trafic réel. Les règles qui reposent uniquement sur
   `status`/`headers` (comme celles d’Opencode ou de Minimax) ne nécessitent
   pas cette activation. Par ailleurs, si la règle déclare
   `scope: "connection"` et que l’objectif est d’appliquer un véritable délai
   de récupération à toute la connexion ainsi que d’ignorer la combinaison
   dans la même requête (et pas seulement d’attribuer une étiquette
   informative), ajoutez l’identifiant du fournisseur à
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dans le même fichier — c’est ce qui
   autorise la consommation de type `isAgentrouterConnectionQuotaScope()`
   dans `markAccountUnavailable()` (`src/sse/services/auth.ts`) et
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ; sans cela, `scope`
   continue de transiter par `fallbackResult.ruleScope`, mais rien ne
   l’exploite.
3. Ajoutez des tests unitaires calqués sur
   `tests/unit/upstream-status-restatement.test.ts` et
   `tests/unit/agentrouter-error-rules.test.ts` (y compris les garde-fous
   not-permanent / not-creditsExhausted et — si le fournisseur nécessite la
   liste d’autorisation — un test vérifiant que `resolveRuleMatchBody()`
   renvoie le texte intégral uniquement pour ce fournisseur).

Aucune modification de `chatCore.ts`, `classifyError` ou des combinaisons
n’est nécessaire.

#### Verrouillage regroupé par sortie (#10880)

Les fournisseurs figurant dans `EGRESS_BUCKETED_LOCK_PROVIDERS` (famille
opencode) sont considérés comme des services en amont regroupés par IP (le
niveau gratuit d’opencode est regroupé par IP, et non par compte — voir
#9611) : un statut 429 classé `quota_exhausted` **ou**
`rate_limit_exceeded` impose un délai de récupération à toutes les connexions
de la famille autorisée dont la dernière adresse IP de sortie connue
correspond à celle de la connexion en échec, avant que la rotation puisse les
essayer — ce qui évite N-1 appels en amont dont l’échec est garanti (même
structure que #10460/#10525). `rate_limit_exceeded` est inclus
intentionnellement : sur le chemin `markAccountUnavailable`, les règles
propres à opencode ne correspondent jamais (aucun en-tête/corps n’est
transmis à `checkFallbackError`, et opencode ne figure pas dans
`FULL_TEXT_RULE_PROVIDERS`). Par conséquent, un statut 429 dont le corps
contient le texte relatif au quota d’abonnement ("monthly usage limit
reached") est classé `quota_exhausted` par le mécanisme de secours fondé sur
le texte du quota (`buildSubscriptionQuotaFallback`, `accountFallback.ts` ;
délai de récupération de 1 h) avant même que la règle `status_429` soit
atteinte — tandis qu’un statut 429 dépourvu de texte relatif au quota (simple
limitation de débit) est classé `rate_limit_exceeded` par la règle
`status_429` et impose tout de même un délai de récupération à la famille
d’adresses IP. Pour un fournisseur figurant dans la liste d’autorisation, une
limitation de débit regroupée par IP constitue le même signal qu’un quota
épuisé. Limites établies :

- **Au mieux** : le verrou résout le dernier `egress_ip` connu de la connexion
  à partir de `proxy_logs` (fenêtre de 24 h, synchrone, sans cache). En cas de
  cache froid (IP de sortie jamais sondée) ou d’absence de ligne → la connexion
  en échec est tout de même placée en délai de récupération par la branche
  (enregistrée comme aujourd’hui), mais aucune connexion sœur n’est verrouillée.
- **Jamais terminal** : le délai de récupération est une fenêtre de quota
  renouvelable (`testStatus: "unavailable"`) ; aucun état permanent n’est
  jamais déduit d’un signal au niveau de l’IP. Les connexions
  `disableCooling` ignorent entièrement la branche.
- **La granularité du verrou change pour la famille figurant sur la liste
  d’autorisation** : il s’agit d’un changement de portée, et non d’une simple
  optimisation relative aux connexions sœurs. opencode est un fournisseur
  `passthroughModels` ; avant cette branche, une erreur 429 produisait donc un
  verrouillage par MODÈLE ; elle produit désormais un délai de récupération
  de la connexion — y compris pour un opérateur utilisant une seule connexion,
  sans aucune connexion sœur. C’est la granularité que la table de règles
  d’opencode déclare déjà correcte (`scope: "connection"`,
  `providerErrorRules.ts`), mais qui n’a encore jamais été respectée, car
  opencode ne figure pas dans `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. La branche
  écrit elle-même le délai de récupération de la connexion en échec ainsi que
  son `backoffLevel`, à l’image de la branche agentrouter à portée de
  connexion, puis retourne — le blocage par modèle et le chemin générique
  ci-dessous ne sont jamais atteints.
- **Combinaison incluse** : comme la branche agentrouter, la portée ignore
  délibérément la rétrogradation
  `persistUnavailableState`/`isCombo` qu’un appelant combiné applique à une
  erreur 429. Un verrouillage par modèle n’est pas une forme moins stricte de
  cette portée, mais la mauvaise unité : il ne dit rien sur l’IP épuisée, si
  bien que la rotation de la combinaison continuerait à gaspiller un appel
  dont l’échec est garanti par connexion sœur.
- **Sécurité des connexions sœurs** : une connexion sœur déjà dans un état
  terminal (bannie/crédits épuisés) ou déjà soumise à un délai de récupération
  plus long n’est jamais écrasée.
- **Liste d’autorisation exclusive** : l’élargissement de
  `EGRESS_BUCKETED_LOCK_PROVIDERS` relève d’une décision explicite du
  responsable ; aucun câblage générique (modèle nº 10334/10419). La requête
  des connexions sœurs lie cette même liste d’autorisation au lieu de la
  répéter sous forme de littéral SQL, de sorte que son élargissement reste une
  modification d’une seule ligne.
- **Rotation de l’IP de sortie, dans les deux sens** : la fenêtre de recherche
  (24 h) est bien plus large que la durée de vie du cache de l’IP de sortie
  (5 min), de sorte que la « dernière IP connue » relève de l’historique, et
  non de l’état actuel. Si le proxy d’une connexion a changé au cours de la
  fenêtre, le verrou peut **manquer** une IP réellement partagée (l’IP
  enregistrée est la nouvelle, non épuisée) — et, symétriquement, il peut
  **placer en délai de récupération une connexion sœur qui s’est depuis
  détournée** de l’IP épuisée. Le second cas coûte à cette connexion sœur une
  fenêtre de délai de récupération ; les deux sont acceptés comme des limites
  inhérentes à une recherche historique effectuée au mieux.
- **Coût** : deux analyses bornées de `proxy_logs` (filtrées par fenêtre via
  `idx_pl_timestamp`), uniquement à la fréquence des erreurs 429. Aucun nouvel
  index (migration 134, YAGNI). Mesuré sur une copie de taille modérée d’une
  base de données contenant du trafic réel ; une instance à haut débit
  conserve proportionnellement davantage de lignes dans la même fenêtre.

---

## Autres fonctionnalités de résilience

- **19 stratégies de routage** (priorité, pondérée, tourniquet, relais de contexte, remplissage prioritaire, p2c, aléatoire, moins utilisé, optimisation des coûts, prise en compte de la réinitialisation, fenêtre de réinitialisation, marge disponible, aléatoire strict, automatique, lkgp, optimisation du contexte, optimisation du cache, fusion, pipeline) — voir [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routage tenant compte de la réinitialisation** (v3.8.0) — hiérarchise les connexions selon l'heure de réinitialisation du quota.
- **Dégradation du mode d'arrière-plan** — le paramètre `background: true` de l'API Responses est dégradé en mode synchrone avec un avertissement.
- **Détection dynamique de la limite d'outils** — met les fournisseurs en retrait lorsque les limites du nombre d'outils sont atteintes.
- **Repli d'urgence** — contrôlé par `OMNIROUTE_EMERGENCY_FALLBACK` ; les opérateurs peuvent le remplacer depuis la page des indicateurs de fonctionnalités sans redémarrage.

---

## Débogage

- Les réponses du combo pondéré `503 all_targets_cooling_down` (`Retry-After` défini, `diagnostics.excluded` répertorie chaque cible avec `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → le pool est configuré et connecté, mais chaque cible est exclue par un minuteur de résilience ; l’avertissement `[COMBO] Weighted selection: every target excluded before dispatch — …` indique les raisons et le nombre de secondes restantes. Une erreur `404 no_executable_targets` provenant du même combo signifie qu’aucun minuteur de résilience n’est intervenu (rien à exécuter, ou chaque compte a échoué à la vérification de disponibilité). Implémenté dans `open-sse/services/combo/pinRecovery.ts` à partir des exclusions recueillies dans `targetResolution.ts`.
- Toutes les clés d’un fournisseur sont ignorées → vérifiez à la fois l’état du disjoncteur ET les valeurs `rateLimitedUntil`/`testStatus` de chaque connexion.
- Fournisseur exclu définitivement après la fenêtre de réinitialisation → le code lit directement `state` au lieu d’utiliser `getStatus()`/`canExecute()`.
- Une clé échoue, les autres devraient fonctionner → privilégiez le délai de récupération de la connexion plutôt que le disjoncteur.
- Un seul modèle échoue → privilégiez le verrouillage du modèle plutôt que le délai de récupération de la connexion.
- L’état devrait se rétablir automatiquement, mais ne le fait pas → vérifiez la présence d’un horodatage futur ainsi que le chemin de lecture qui actualise l’état expiré. Les statuts permanents nécessitent des modifications manuelles.

---

## Empreinte TLS et furtivité

La furtivité propre à chaque fournisseur (JA3/JA4, CCH, obscurcissement) est documentée séparément — voir `docs/security/STEALTH_GUIDE.md` (git ; non compilé dans `/docs`).

---

## Tests de résilience (Phase 8 · Bloc C)

Au-delà des tests unitaires de la logique de résilience, trois tests évaluent l'environnement d'exécution dans
des conditions réelles de stress/défaillance (tous sont des tests d'intégration/nocturnes — aucun ne bloque les PR) :

| Test                | Description                                                                                                                                                                                                                                | Exécution                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Chaos               | Un nœud amont simulé injecte une latence, une réinitialisation, un délai d'expiration et une erreur 503 réels ; vérifie que le disjoncteur s'ouvre/se rétablit et que `checkFallbackError` classe l'erreur 503 comme un repli récupérable. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Croissance du tas   | Environ 500 flux par `createSSEStream` sous `--expose-gc` ; échoue si le tas dépasse la limite définie (protection contre les OOM nº 3069).                                                                                                | `npm run test:heap`                       |
| Test d'endurance k6 | Charge soutenue sur `/api/monitoring/health` ; seuils de p95/d'erreurs.                                                                                                                                                                    | `k6 run tests/load/k6-soak.js` (nocturne) |

Orchestré par `.github/workflows/nightly-resilience.yml` (cron + déclenchement manuel). Dans le test
`test:integration` par défaut, les tests de chaos et du tas s'ignorent automatiquement (sans `RUN_CHAOS_INT`/`--expose-gc`).

---

## Voir aussi

- [Guide d’architecture](./ARCHITECTURE.md) — Architecture du système et fonctionnement interne
- [Guide de l’utilisateur](../guides/USER_GUIDE.md) — Fournisseurs, combinaisons, intégration CLI
- [Moteur de combinaisons automatiques](../routing/AUTO-COMBO.md) — Évaluation à 16 facteurs, ensembles de modes
