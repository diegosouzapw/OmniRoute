# Resilience Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute dispose de trois mécanismes de résilience distincts mais liés. Chacun a une portée et un objectif différents. Gardez-les séparés lors du débogage du comportement de routage.

![Modèle de résilience à 3 couches](../diagrams/exported/resilience-3layers.svg)

> Source : [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Disjoncteur fournisseur

**Portée :** l'ensemble du fournisseur (par ex. `glm`, `openai`, `anthropic`).

**Objectif :** arrêter d'envoyer du trafic vers un fournisseur qui échoue de manière répétée au niveau du service en amont.

**Implémentation :**

- Classe principale : `src/shared/utils/circuitBreaker.ts`
- Câblage : `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API d'état : `GET /api/monitoring/health`
- API de réinitialisation : `POST /api/resilience/reset`
- Wrappers : `open-sse/services/accountFallback.ts`
- Table de base de données : `domain_circuit_breakers`

**États :**

- `CLOSED` — trafic normal autorisé
- `DEGRADED` — trafic toujours autorisé, mais des échecs fournisseur accrus sont suivis ; revient à `CLOSED` après suffisamment de succès, après un test de connexion valide, ou après la plus longue durée de maintien `OPEN` pour le dernier type d'échec (sa valeur `cooldownByKind`, sinon `resetTimeout`, × `maxBackoffMultiplier`, au moins un délai de refroidissement) sans nouvel échec
- `OPEN` — fournisseur temporairement bloqué ; le routage combo l'ignore
- `HALF_OPEN` — délai de réinitialisation écoulé ; requête de sonde autorisée

**Valeurs par défaut configurables (`open-sse/config/constants.ts`, exposées dans Tableau de bord → Paramètres → Résilience) :**

| Classe  | Dégradé à | S'ouvre à | Délai de réinitialisation |
| ------- | --------- | --------- | ------------------------- |
| OAuth   | 5 échecs  | 8 échecs  | 60s                       |
| Clé API | 7 échecs  | 12 échecs | 30s                       |
| Local   | dérivé    | 2 échecs  | 15s                       |

`degradationThreshold` contrôle le moment où un fournisseur entre dans `DEGRADED` ; `failureThreshold` contrôle le moment où il s'ouvre et est ignoré. Les profils de fournisseur Local ne sont pas encore exposés sur la page des paramètres de résilience.

**Codes de déclenchement :** uniquement les statuts au niveau fournisseur `[408, 500, 502, 503, 504]`. Ne PAS déclencher pour les erreurs au niveau compte (la plupart des 401/403/429 — celles-ci relèvent du cooldown ou du verrouillage).

**Récupération paresseuse :** lorsque `OPEN` expire, `getStatus()`, `canExecute()`, `getRetryAfterMs()` rafraîchissent l'état vers `HALF_OPEN`. Les mêmes lectures (et l'échec suivant) font retomber un `DEGRADED` obsolète vers `CLOSED`. Aucun minuteur en arrière-plan n'est nécessaire.

---

### Cooldown global fournisseur sur opt-in (fenêtre de garde)

Une quatrième couche, **sur opt-in** (`PROVIDER_COOLDOWN_ENABLED`, par défaut **désactivée**), conserve une mémoire inter-requêtes des fournisseurs en échec dans `open-sse/services/providerCooldownTracker.ts`, consultée par la résolution des cibles de combo afin que des requêtes combo consécutives cessent de reparcourir un fournisseur qui vient d'échouer. Les entrées au niveau fournisseur respectent la fenêtre de garde de `PROVIDER_PROFILES` :

| Profil  | se déclenche après (`providerFailureThreshold`) | à l'intérieur de (`providerFailureWindowMs`) | refroidit pendant (`providerCooldownMs`) |
| ------- | ----------------------------------------------: | -------------------------------------------: | ---------------------------------------: |
| OAuth   |                                            `10` |                                      `15min` |                                   `5min` |
| Clé API |                                            `15` |                                      `30min` |                                  `10min` |

En dessous du seuil, le fournisseur n'est **pas** considéré comme en refroidissement ; un succès efface la fenêtre. Les entrées au niveau connexion (`provider:connectionId`) conservent à la place le backoff exponentiel `minRetryCooldownMs → maxRetryCooldownMs`. Surcharges : `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Garde-fou de régression : `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Refroidissement de connexion

**Portée :** une seule connexion/compte/clé de fournisseur.

**Objectif :** ignorer une clé défaillante pendant que les autres connexions du même fournisseur continuent de servir.

**Implémentation :**

- Marquage comme indisponible : `src/sse/services/auth.ts::markAccountUnavailable()`
- Sélection : `getProviderCredentials*` dans le même fichier
- Calcul du refroidissement : `open-sse/services/accountFallback.ts::checkFallbackError()`
- Paramètres : `src/lib/resilience/settings.ts`

**Champs par connexion :**

- `rateLimitedUntil` — horodatage jusqu'à l'expiration du refroidissement
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — compteur de backoff exponentiel

**Refroidissements par défaut :**

- Base OAuth : 5 s
- Base clé API : 3 s
- Clé API 429 : préfère les en-têtes amont `Retry-After`/reset ou le texte de réinitialisation analysable
- Backoff : `baseCooldownMs * 2 ** failureIndex`

**Protection anti-thundering-herd :** empêche des échecs concurrents de prolonger excessivement le refroidissement ou d'incrémenter deux fois `backoffLevel`.

**Les 429 de limite de concurrence n'escaladent pas l'échelle du backoff.** Un `429` dont le corps signale une
limite de concurrence ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) signifie que le compte est sain mais occupé.
`checkFallbackError()` renvoie la raison `concurrency_limited` : bascule immédiatement vers la
connexion suivante, refroidit celle-ci pendant une durée fixe `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) ou selon
l'indication de réessai de l'amont, laisse `backoffLevel` inchangé et positionne `skipProviderBreaker`.
Un corps de quota explicite l'emporte toujours, donc un corps qui correspond aussi à un motif de quota
reste un verdict de quota. Détection : `looksLikeConcurrencyLimit()` dans `src/shared/utils/classify429.ts` ;
verdict : `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (le
`FailureKind` du disjoncteur) est inchangé et renvoie toujours `rate_limit` pour ces corps.

**Les blocages de contenu de flux ne refroidissent pas le compte.** Lorsque le watchdog de blocage de contenu
(`open-sse/utils/streamHandler.ts`) abandonne un flux qui n'a envoyé aucune sortie du modèle
à temps, `markAccountUnavailable()` enregistre l'erreur sur la connexion mais ne définit aucun
refroidissement : le blocage appartient à cette requête, le plus souvent un long tour de raisonnement sans
encore de sortie. Les opérateurs peuvent réactiver ce comportement avec `resilienceSettings.streamStallCooldown.enabled`
(par défaut `false`).

**Les trames de raisonnement relancent le budget de blocage de contenu.** Un modèle de raisonnement peut réfléchir
pendant des minutes avant son premier jeton visible : Claude diffuse des trames `thinking_delta` dont
le texte de réflexion peut être vide, et l'API Responses diffuse un élément de raisonnement après
l'autre. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) reconnaît
ces trames, et le watchdog relance son budget à chacune d'elles au lieu d'annuler le
tour. Elles ne constituent toujours pas une sortie du modèle, donc un tour qui se termine avec uniquement du
raisonnement est toujours signalé comme vide, et un tour qui cesse de raisonner et n'envoie plus que des heartbeats
déclenche toujours le watchdog.

Les trames binaires `reasoningContentEvent` de Kiro avec une signature non vide préservent cette
activité de raisonnement à travers l'exécuteur sous forme de delta `reasoning_content` vide. La signature n'est
pas transmise. Les métadonnées, les trames incomplètes et les signatures vides ne relancent pas le
budget de contenu ; le délai d'expiration indépendant du flux actif et l'annulation côté client
s'appliquent toujours (`open-sse/executors/kiro/reasoning.ts`).

**États terminaux (PAS des refroidissements) :**

- `banned` — défini par la détection de mots-clés bannis / de bannissement de compte (voir [BAN_DETECTION](../security/BAN_DETECTION.md)), et par trois refus amont consécutifs par requête (`request_rejected`, p. ex. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) ; un seul refus ne fait que refroidir la connexion
- `expired` (passe à l'état terminal après des tentatives bornées — `EXPIRED_RETRY_MAX = 3` avec backoff exponentiel — afin que les erreurs OAuth transitoires puissent se résoudre d'elles-mêmes avant que le compte ne soit définitivement désactivé)
- `credits_exhausted`

Ces états persistent jusqu'à ce que les identifiants changent ou qu'un opérateur les réinitialise. Ne pas écraser les états terminaux avec un état de refroidissement transitoire.

**Récupération paresseuse :** lorsque `rateLimitedUntil` est dépassé, la connexion redevient éligible. En cas d'utilisation réussie, `clearAccountError()` efface tous les champs d'erreur.

### Plafond d'utilisation OAuth de Claude : voie de priorité inférieure + réinitialisation de limite de session

**Portée :** une connexion d'abonnement Claude (OAuth). Les deux fonctionnalités sont **activables
par connexion** (Modifier la connexion → section Claude → `lowPriorityMode` / `autoLimitReset` dans
`providerSpecificData`, toutes deux désactivées par défaut) et reflètent les commandes `/low-priority` et
`/limit-reset` de Claude Code (contrat réseau capturé depuis Claude Code 2.1.263).

**Implémentation :**

- Machine à états + classification des réponses : `open-sse/services/claudeLowPriority.ts`
- Client de statut/réclamation de réinitialisation : `open-sse/services/claudeLimitReset.ts`
- Hook de l'exécuteur (injection d'en-tête + nouvelle tentative sur le même compte) : `open-sse/executors/base.ts::execute()`
- Persistance de l'activation : `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Déclencheur :** le plafond d'utilisation de 5 heures — un `429` dont les en-têtes portent
`anthropic-ratelimit-unified-status: rejected` et, lorsque le compte est éligible,
`anthropic-ratelimit-unified-slow-offer: treatment`. Rien n'est envoyé avant ce premier
429 de plafond ; un 429 de rafale sans en-têtes unifiés passe par le chemin de refroidissement normal.

**Voie de priorité inférieure** (`lowPriorityMode`) :

- Sur le 429 du mur (« wall »), l'exécuteur accepte l'offre et réessaie immédiatement le **même** compte avec `anthropic-usage-limit: slow` ; la voie reste active jusqu'au `anthropic-ratelimit-unified-reset` annoncé (+60 s de grâce) et chaque requête dans cette fenêtre porte l'en-tête. Le 429 intercepté n'atteint jamais `handleChatCore`, donc la connexion n'est **pas** mise en cooldown et n'est pas écartée de la rotation.
- `anthropic-ratelimit-unified-slow-status` sur les réponses ultérieures : `active` / `not_needed` conservent la voie ; `slot_busy` (429) ou un `529` attendent le `anthropic-ratelimit-unified-slow-retry-after` du serveur (20 s par défaut, borné entre 5 et 600 s, gigue de ±30 %) puis réessaient, dans la limite de `anthropic-ratelimit-unified-slow-max-wait` (20 min par défaut, borné entre 1 min et 6 h) — au-delà, la voie se termine et un refroidissement de 10 minutes bloque toute nouvelle acceptation. L'attente est en outre plafonnée par ce qu'il reste du timeout de démarrage amont propre à la requête (`resolveFetchStartTimeout`, 10 min par défaut) moins une marge de 5 s : sans ce plafond, le max-wait par défaut de 20 minutes survivrait à la requête et la mise en veille serait interrompue en pleine attente, faisant remonter une `TimeoutError` au lieu de la fin gracieuse `max_wait` + refroidissement.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, un basculement de fenêtre de 5 h, ou `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (qui la termine en `extra_usage` quel que soit le statut, puisque le dépassement payant couvre désormais le mur) mettent fin à la voie ; la réponse suit alors le chemin de cooldown normal. `budget_exhausted` est mémorisé jusqu'à la réinitialisation de budget annoncée (≤ 8 jours).
- La vérification du mur s'exécute après les nouvelles tentatives intra-essai de l'exécuteur déclenchées par les 400 (édition de contexte, bornes thinking/effort, auto-apprentissage des paramètres), de sorte qu'un 429 du mur qui n'apparaît que lors d'une de ces tentatives est toujours intercepté au lieu d'atteindre le chemin de cooldown.
- L'état est en mémoire, par connexion (un redémarrage coûte un 429 de mur supplémentaire pour une nouvelle acceptation).

**Réinitialisation de la limite de session** (`autoLimitReset`, tentée avant la voie lorsque les deux sont activées) :

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloc `juniper_tide` ; lorsque `arm: "reset"` et `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` avec
  `{ "program": "juniper_tide" }` (UUID d'organisation issu de
  `providerSpecificData.organizationUUID`, avec repli sur le bootstrap).
- `result: reset|not_limited` → la requête est réessayée à pleine vitesse (sans en-tête slow).
  `already_used` / `not_offered` mémorisent `next_available_at` (une semaine par défaut) ; tout
  échec applique un backoff de 15 minutes. La réinitialisation a lieu une fois par semaine et compte
  toujours dans la limite hebdomadaire.

Gardes anti-régression : `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinité de session (#7274)

**Portée :** une session client (en-tête `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) épinglée à une connexion, pour **n'importe quel** fournisseur.

**Objectif :** garder un agent multi-tours (Claude Code, aider, agents personnalisés) sur le même compte d'une requête à l'autre, en réduisant la perte de contexte entre comptes et les 429 répétés de démarrage à froid sur les fournisseurs ayant un état de session par compte.

**Implémentation :**

- Résolution du TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Sélection/création de l'épinglage : `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extraction de l'en-tête (générique, tout fournisseur) : `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Table d'épinglage persistée : `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Paramètre : `sessionAffinityTtlMs` (TTL global en ms, `0` désactive) — `src/lib/db/settings.ts`. Renommé depuis le `codexSessionAffinityTtlMs` réservé à Codex par la migration `124_generic_session_affinity_ttl.sql`, qui reprend tout TTL Codex précédemment configuré comme nouvelle valeur par défaut.

Avant #7274, `resolveSessionAffinityTtlMs()` retournait systématiquement `0` pour tout fournisseur autre que `codex`, si bien que le paramètre TTL (et les en-têtes de session) n'avait aucun effet ailleurs, alors même que le mécanisme d'épinglage et l'extraction d'en-tête étaient déjà indépendants du fournisseur. Le correctif a supprimé ce retour anticipé ; le TTL s'applique désormais uniformément à tous les fournisseurs dès lors qu'il est défini globalement au-dessus de `0`.

Les trois en-têtes d'affinité de session ne sont jamais transmis en amont — les exécuteurs construisent leurs propres en-têtes amont de toutes pièces plutôt que de relayer les en-têtes du client, de sorte qu'il s'agit uniquement d'un identifiant de corrélation interne.

### Baux exclusifs de connexion à session gérée

**Portée :** un client/session HTTP géré actif possède une connexion OmniRoute éligible.

**Objectif :** fournir une propriété de connexion exclusive et durable aux clients qui ont besoin d'une barrière de routage stricte d'une requête à l'autre. Cela diffère de l'affinité de session, qui est une préférence de continuité souple : un bail exclusif persiste l'état du cycle de vie dans SQLite, impose l'unicité globale du propriétaire actif et de la connexion active, et rejette une génération obsolète avant l'aiguillage vers le fournisseur.

La fonctionnalité est opt-in par clé API. Une clé gérée doit avoir le scope `lease:exclusive` et une liste `allowedConnections` explicite et non vide. N'importe quel client HTTP peut utiliser l'endpoint de cycle de vie ; aucun nom de client, user-agent, fournisseur, méthode OAuth ou modèle n'est requis. Le bail possède une connexion, pas un modèle, donc un changement de modèle conserve la liaison tant que la connexion reste normalement éligible. Les règles normales de modèle, de quota, de santé, de cooldown et de liste d'autorisation restent autoritaires et peuvent faire passer la même génération à une autre connexion éligible libre.

Le cycle de vie est `POST /api/v1/session-leases` avec les actions JSON `acquire`, `renew` et `release`.
Les requêtes d'inférence gérées présentent la valeur opaque `X-OmniRoute-Lease-Owner` et la valeur exacte
`X-OmniRoute-Lease-Generation`. Le propriétaire utilise `vlo_` suivi de 43 caractères base64url ; seul
son hachage SHA-256 est stocké. Chaque barrière finale de distribution lie également l'ID de clé API
authentifiée et l'ID de connexion active. Les en-têtes de contrôle de bail sont supprimés des journaux,
des instantanés de requêtes conservés et des en-têtes de l'exécuteur amont.

Si le routage ordinaire dispose de candidats gérés éligibles mais que chaque candidat libre est occupé
par un bail actif étranger, OmniRoute renvoie HTTP `429`, un code d'indisponibilité de capacité de bail,
un état d'attente de capacité et un `Retry-After` borné dérivé de l'expiration pertinente la plus proche.
Une éligibilité ordinaire vide ne constitue pas une contention de bail et conserve sa sémantique
d'erreur de routage existante.

Les mécanismes associés restent distincts :

- L'occupation de session OAuth est une distribution souple, locale au processus, pour les comptes OAuth.
- Les sémaphores de compte accordent des permis de concurrence de requêtes et prennent fin lorsqu'une requête se termine.
- Les baux de session gérés exclusifs constituent une propriété de cycle de vie durable avec une barrière de génération.

---

## 3. Verrouillage de modèle

**Portée :** triplet provider + connection + model.

**Portée de la clé selon le statut :** le statut en échec détermine dans quelle clé un verrouillage est écrit
(`resolveLockoutScope()` dans `open-sse/services/accountFallback/exactModelLock.ts`) :

- `429` / `403` / `402` — un signal de quota ou de droits — verrouille la **famille de quotas** :
  pour codex, toute la portée `codex` / `spark` (chaque modèle `gpt-5*` de la
  connexion), pour les autres fournisseurs `getQuotaScopedModelForProvider()`.
- `404` verrouille le modèle seul (`getModelLockKey()` restreint `not_found`).
- Tout autre statut — les échecs de transport/serveur `5xx` et le `502` synthétisé
  par OmniRoute lui-même lors de la validation de qualité — ne verrouille que le
  tuple **exact** provider/connection/model. Un flux défectueux sur un modèle ne
  prouve rien concernant le quota du compte ; avant cette règle, une seule réponse
  vide sur `codex/gpt-5.6-luna` retirait du routage tous les modèles `gpt-5*` de
  cette connexion pendant 2 à 30 min (en escalade) alors que son quota était intact.
- L'option `scope` explicite d'un appelant l'emporte toujours (Antigravity passe `"exact"`).

**Objectif :** éviter de désactiver une connexion entière lorsqu'un seul modèle est indisponible ou limité par son quota.

**Exemples :**

- Fournisseurs avec quotas par modèle renvoyant 429
- Fournisseurs locaux renvoyant 404 pour un modèle manquant
- Échecs de permission de mode/modèle spécifiques au fournisseur (par ex. les modes Grok)

**Implémentation :** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Tableau de bord Model Cooldowns (v3.8.0)

Interface : Paramètres → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Liste les verrouillages actifs avec : provider, connection, model, reason, expiresAt. Les opérateurs peuvent réactiver manuellement un modèle depuis la carte.

**API REST :**

- `GET /api/resilience/model-cooldowns` — liste les verrouillages actifs
- `DELETE /api/resilience/model-cooldowns` — réactivation manuelle. Corps : `{provider, connection, model}`. Auth : management.

### Cooldown Manager

Interface : Surveillance → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Une page unique pour chaque connexion sortie du routage pour une raison transitoire,
au lieu d'ouvrir chaque page de fournisseur. Elle liste les cooldowns de connexion,
les verrouillages de modèle et les états terminaux, permet de les effacer par
connexion, pour une sélection ou pour toutes les connexions d'un fournisseur,
et d'éditer les règles de cooldown les plus ajustées : `streamStallCooldown.enabled`
ainsi que le cooldown de base et le nombre maximal de paliers de backoff du
`connectionCooldown` OAuth / clé API (enregistrés via `PATCH /api/resilience`).
Les états terminaux (`banned`, `expired`, `credits_exhausted`) sont listés mais
jamais effacés ici.

**API REST** (`src/lib/resilience/cooldownManager.ts`, auth : management) :

- `GET /api/resilience/cooldowns[?provider=]` — connexions avec statut, cooldown restant,
  niveau de backoff, dernier type d'erreur et verrouillages de modèle (sans identifiants)
- `POST /api/resilience/cooldowns` — corps `{connectionIds: string[]}` ou
  `{all: true, provider?}` ; renvoie `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Interface de paramétrage du verrouillage + récupération par atténuation en cas de succès (v3.8.23)

Le verrouillage de modèle est passé d'un comportement codé en dur et toujours actif
à une fonctionnalité entièrement configurable, à activation explicite, dotée de sa
propre carte de paramètres et d'un mécanisme de récupération auto-réparateur.

**Carte de paramètres :** Paramètres → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Elle est **distincte** de la `ModelCooldownsCard` en lecture seule ci-dessus (qui se
contente de _lister_ les verrouillages actifs) — la nouvelle carte _configure les
paramètres_. Les valeurs par défaut se trouvent dans
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) :

| Paramètre               | Valeur par défaut                | Signification                                                                    |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Interrupteur principal — le verrouillage de modèle est **désactivé par défaut**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statuts amont comptant comme un échec à l'échelle du modèle.                     |
| `baseCooldownMs`        | `120_000` (120 s)                | Durée initiale du verrouillage pour le premier échec.                            |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Plafond du cooldown après escalade.                                              |
| `maxBackoffSteps`       | `10`                             | Nombre maximal de paliers d'escalade en backoff exponentiel.                     |
| `useExponentialBackoff` | `true`                           | Indique si les échecs répétés augmentent le cooldown de façon exponentielle.     |

Les paramètres persistent via le magasin de paramètres habituel et sont validés par
le schéma de paramètres de résilience ; la carte borne `baseCooldownMs`/`maxCooldownMs`
(avec `maxCooldownMs ≥ baseCooldownMs`) et `maxBackoffSteps`.

**Récupération par atténuation en cas de succès :** la récupération ne dépend **pas**
uniquement de l'expiration du minuteur. Une réponse saine fait redescendre le compteur
d'échecs du modèle, de sorte qu'un modèle rétabli en cours de fenêtre cesse
d'escalader (et se déverrouille) avant l'échéance de son minuteur. Sur une cible de
combo réussie, `open-sse/services/combo.ts` appelle `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), qui **divise par deux** le `failureCount`
stocké (`Math.floor(failureCount / 2)`) ; lorsqu'il atteint `0`, l'entrée de
verrouillage est entièrement supprimée. Son pendant `recordModelLockoutFailure()`
incrémente le compteur (et fait escalader le cooldown) lors d'échecs survenant dans
la fenêtre d'escalade. Cette atténuation par succès s'ajoute à la simple expiration
du minuteur — l'un ou l'autre de ces chemins peut réactiver un modèle.

**État :** les verrouillages sont conservés **en mémoire** (`Map`s par processus de
`ModelLockoutEntry` indexées par `provider:connectionId:model`, les verrouillages de
portée exacte par `provider:connectionId:exact:model`), non persistés en base de
données — ils sont perdus au redémarrage. Les _paramètres_ sont persistés ; l'_état_
actif des verrouillages est éphémère.

---

## 4. Contrôle de la concurrence en partage de quota (v3.8.36)

Les comptes d'abonnement (GLM, MiniMax, etc.) n'acceptent souvent que ~1 à 3
requêtes simultanées ; au-delà, des erreurs 429 et des cooldowns se déclenchent.
Le problème est particulièrement aigu avec les combos en **partage de quota**
(`qtSd/…`), où plusieurs clés API partagent un même compte amont. Trois couches
empêchent qu'un compte partagé soit saturé.

### Plafond de concurrence par connexion (`max_concurrent`)

Chaque connexion de fournisseur peut déclarer un plafond `max_concurrent`
(`provider_connections.max_concurrent`, défini dans la fenêtre modale de
connexion / l'API / la base de données). Laissez-le vide pour aucune limite.
C'est l'unique réglage qui pilote la couche de sérialisation décrite ci-dessous —
définissez-le sur la concurrence réelle du compte (par ex. GLM ~1, MiniMax ~2).

### Plafonds de concurrence par modèle (`modelConcurrency`)

Une connexion peut en outre déclarer des plafonds de concurrence exacts par
modèle dans sa map `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Définissez-la dans la fenêtre modale de connexion (**Remplacements des limites
de débit → Plafonds de concurrence par modèle**, un `model=cap` par ligne) ou via
`PATCH /api/providers/[id]` avec la même structure JSON. Sémantique des clés :

- **À l'échelle de la connexion ou spécifique au modèle :** `maxConcurrent`
  reste le plafond partagé à l'échelle de la connexion. Lorsque les deux
  s'appliquent, les deux portes sont acquises atomiquement dans la même porte
  composite (`global → provider → account → model`) ; le comportement effectif
  est celui de la limite applicable la plus stricte.
- **Correspondance exacte de la clé de modèle :** la clé est la chaîne de
  modèle transmise à l'exécuteur après la résolution du routage — normalement
  l'identifiant de modèle amont nu (`glm-5`), et non un alias `provider/model`
  côté client (`zai/glm-5` ne correspond pas à `glm-5`). Les valeurs sont des
  plafonds de requêtes simultanées sous forme d'entiers positifs.
- **Mise en file d'attente locale, sans découverte :** les requêtes
  excédentaires sont mises en file d'attente localement avec la sémantique de
  file/délai d'attente existante (erreurs d'admission typées
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ne découvre ni ne
  déduit la politique amont — il applique les plafonds exacts configurés par
  l'opérateur. Une porte de modèle saturée ne désactive jamais le fournisseur et
  ne crée jamais de verrouillage permanent du modèle ; le comportement amont
  429/cooldown/fallback reste le filet de sécurité en cas d'erreur.
- **Portée par connexion et par processus :** les plafonds sont définis par
  connexion en base de données et conservés en mémoire, de sorte que deux
  connexions réutilisant la même clé API amont ne se coordonnent pas entre elles.
- **Non configuré signifie inchangé :** l'omission de la map (ou un champ
  laissé vide dans le tableau de bord) n'ajoute aucune porte de modèle. Exemple
  de configuration sans affirmer de limite universelle de fournisseur :

```text
glm-5=1
glm-4.7=3
```

### Sérialisation des requêtes en partage de quota

Lorsqu'une distribution en partage de quota cible une connexion qui déclare un
`max_concurrent` positif, les requêtes simultanées vers ce **compte** sont
sérialisées via un sémaphore par connexion (clé `qsconn:<connectionId>`) : les
requêtes excédentaires **attendent dans la file** au lieu de saturer le compte.
Le mécanisme est **fail-open** — une file saturée ou un délai dépassé poursuit
sans emplacement plutôt que de jamais rejeter une requête distribuable.
Basculez dans **Paramètres → Résilience → Concurrence par connexion pour le
partage de quota** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
activé par défaut). Sans plafond `max_concurrent`, le comportement est inchangé.

> La porte de routage en partage de quota (`selectQuotaShareTarget`, DRR + P2C)
> est elle-même fail-open et ne fait que _déprioriser_ une connexion ayant
> atteint son plafond — avec un pool à connexion unique, elle ne peut pas
> imposer de limite stricte ; c'est donc ce sémaphore qui contient réellement
> le flux.

### Réessai de combo tenant compte des cooldowns

Pour chaque stratégie de combo (lorsqu'elle est activée), une requête qui
cristalliserait une erreur 429 pour un cooldown transitoire COURT attend la fin
de celui-ci et est redistribuée au lieu de renvoyer le 429 — cela couvre les
fenêtres TPM/RPM de type Gemini (~60 s de retry-after) sur les combos
multi-modèles, par ex. lorsque les deux cibles d'un combo à 2 modèles atteignent
une limite de débit par modèle. Limité par `comboCooldownWait` (`enabled`,
`maxWaitMs`, `maxAttempts`, `budgetMs`) dans **Paramètres → Résilience**. Il
n'attend jamais sur `quota_exhausted` (verrouillé jusqu'à minuit) ni pour des
motifs auth/not-found.

La même porte couvre le cas pré-distribution (#16319) : lorsque toutes les
cibles d'un combo sont ignorées avant la moindre tentative parce que leur modèle
se trouve dans un court verrouillage transitoire, le parcours sans tentative
attend la fin du verrouillage sous les mêmes plafonds et redistribue, au lieu de
répondre un `503 ALL_TARGETS_SKIPPED` sans indice. Lorsqu'aucune attente n'est
permise (plafond, tentatives ou budget épuisés, ou fonctionnalité désactivée),
la réponse terminale passe à `429 rate_limit_error` portant `retry_after` /
`reset_at` issus de l'expiration du verrou transitoire la plus proche ; les
verrous de quota, auth et not-found conservent le 503 sans indice.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Contrôle d'admission de la file de requêtes (v3.8.49 · issue #6593)

**Portée** : la file locale de limitation de débit par fournisseur+connexion (`open-sse/services/rateLimitManager.ts`, adossée à Bottleneck), un niveau en dessous des trois mécanismes ci-dessus.

**`maxWaitMs` borne l'attente en file ; `executionMaxWaitMs` borne l'exécution.**
Les deux sont délibérément distincts, et aucun n'alimente l'autre.

`resilienceSettings.requestQueue.maxWaitMs` est le **budget d'attente en file** : il couvre l'attente d'un emplacement chez le fournisseur puis le séjour à l'état QUEUED, et son minuteur est annulé dès que la tâche quitte QUEUED et commence à s'exécuter (`rateLimitManager.ts`, `wrappedFn`). Une requête qui le dépasse n'atteint jamais l'amont. Valeur par défaut 30000 ms, fournie par `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` dans `src/lib/resilience/settings.ts` et figée par `tests/unit/ratelimit-admission-control-6593.test.ts`, de sorte qu'une modification de cette valeur fait échouer ce test au lieu de laisser ce paragraphe silencieusement obsolète.

`resilienceSettings.requestQueue.executionMaxWaitMs` est ce que Bottleneck reçoit comme `expiration` de la tâche, dont le minuteur ne démarre qu'après la distribution. C'est un garde-fou pour les exécuteurs dépourvus de leur propre délai d'attente amont, et il est porté au délai de démarrage du fetch propre à l'exécuteur lorsque celui-ci est plus long, de sorte qu'il ne peut pas couper une réponse saine en cours de transmission. Valeur par défaut 600000 ms (10 min).

Injecter le budget de file dans `expiration` est ce qui tuait autrefois les passerelles non incrémentales en plein vol — elles tournent légitimement pendant des minutes avant les premiers octets — et c'est pourquoi une expiration est exposée sous `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) tandis que le budget de file porte le code de dépassement de file. Remplacez l'un ou l'autre via `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ou le tableau de bord (**Settings → Resilience**). Les deux sont bornés entre 1 ms et 24 h lors de la normalisation.

**Priorité, pour les deux :** la variable d'environnement ne fournit que la valeur _par défaut_. Une valeur persistée dans `resilienceSettings.requestQueue` (tableau de bord / patch API, stockée dans `key_value`) l'emporte sur elle, et un `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` par connexion l'emporte sur celle-là. Définir la variable d'environnement sur un déploiement qui possède déjà une valeur persistée ne change donc rien — effacez ou mettez à jour le paramètre persisté à la place.

Le séjour en file est borné par `maxWaitMs` ; `maxQueueDepth` ci-dessous borne combien d'appelants peuvent être en file simultanément.

**Réessais déclarés dans le corps : cadencement vs verrouillage.** Un corps 429 peut nommer sa propre attente (Gemini `RetryInfo.retryDelay`, texte "retry after Ns"), que `updateFromResponseBody` lit. Une attente qui tient dans le `maxWaitMs` de la connexion est du cadencement : le limiteur vide son réservoir pendant cette durée et les appels en file sont distribués quand il se remplit à nouveau. Une attente plus longue que `maxWaitMs` n'est pas quelque chose que la file peut patienter — Gemini répond à un quota quotidien épuisé avec `retryDelay: "86399s"`. Le `Retry-After` relayé sur le 429 reconstruit (#16528) fait déjà verrouiller le modèle par le moteur de repli pour cette fenêtre, mais suspendre le limiteur pour cela aussi bloquerait encore tout appel qui atteint la clé en avance (après une réinitialisation de résilience, par exemple) pendant tout le `maxWaitMs`. Lorsqu'une telle attente provient d'un détail Google typé `RetryInfo` (la provenance `google_rpc_retry_info`) et que le limiteur de la clé est déjà restreint au modèle (voir `getLimiterKey`), le 429 devient à la place un verrouillage de modèle sur cette connexion (`lockModelForLongBodyRetry` dans `open-sse/services/rateLimitManager/bodyRetryPause.ts`, plafonné à 24 h), et le limiteur n'est pas suspendu. La sélection de compte saute sur ce verrou via `isModelLocked()`, et la barrière de pré-distribution du combo fait de même pour les cibles épinglées à la connexion. Sur antigravity, dont le limiteur est par famille de quota, le verrou porte sur le modèle exact, comme ses autres verrous de quota. Le nom demandé par le client est verrouillé aussi lorsqu'un alias l'a résolu vers ce modèle, car ces vérifications utilisent le nom demandé ; il est verrouillé de façon exacte (`lockExactModel`), de sorte qu'un alias qui traverse une famille de quota antigravity ou une portée codex ne verrouille jamais le sien. Un indice en texte libre, un `retryDelay` non typé ou un limiteur partagé par toute la connexion conserve la pause. Lorsque le limiteur que le chemin 429 vient de reconstruire se met effectivement en pause, un appelant dont le temps de file restant s'achève avant la fin de la pause est rejeté immédiatement avec le code de dépassement de file (`checkLimiterPause`) plutôt que d'attendre l'écoulement de ce délai ; la fin enregistrée est ancrée avant la construction du limiteur, là où Bottleneck démarre son horloge de rafraîchissement, et toute modification ultérieure du réservoir l'oublie. Couvert par `tests/unit/rate-limit-long-body-retry-lockout.test.ts` et `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — plafond d'admission optionnel (nouveau).** `resilienceSettings.requestQueue.maxQueueDepth` borne combien de requêtes peuvent rester en file (pas encore distribuées) pour un même fournisseur+connexion à la fois. Lorsque la file contient déjà `maxQueueDepth` requêtes, une nouvelle requête est rejetée rapidement avec une erreur typée `code: "RATE_LIMIT_QUEUE_FULL"` **avant** même d'atteindre `limiter.schedule()` — le rejet est donc peu coûteux et se produit en amont de tout travail de compression de prompt / traduction en aval pour cette requête. Valeur par défaut `0` = désactivé, ce qui préserve le comportement existant de file non bornée ; borné entre 0 et 100000. Remplacement via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ou `resilienceSettings.requestQueue.maxQueueDepth` (tableau de bord / patch API).

La vérification d'admission elle-même est une fonction pure (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) afin d'être testable unitairement sans véritable limiteur Bottleneck.

> La RFC qui a ouvert #6593 proposait également un flag
> `bypassCompressionOnRateLimit`. Le pipeline `open-sse/services/compression/`
> de ce dépôt concerne la compression du prompt/contexte sur la requête LLM
> sortante (`chatCore.ts`, autour du bloc
> `resolveCompressionSettings`/`selectCompressionStrategy`), et non la
> compression des réponses HTTP sur les corps 429 synthétisés — il n'existe
> aucun chemin de code correspondant pour un flag de contournement littéral.
> Cette étape de compression du prompt s'exécute en outre actuellement _avant_
> `withRateLimit()` dans le pipeline de requêtes, donc la réorganiser pour
> l'ignorer lors d'un rejet pour file d'attente pleine est un changement
> distinct et plus important que la portée de ce ticket ; il a été
> intentionnellement **non** implémenté ici et est laissé en travail de suivi
> si le gain d'économie de CPU vaut le risque de réorganisation.

### Filet de sécurité d'activation automatique de la limitation de débit et protection des connexions (`rateLimitProtection`)

**Filet de sécurité d'activation automatique** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, par défaut `true`) :
Par défaut, OmniRoute active automatiquement la protection par file d'attente de limitation de débit pour toutes les connexions actives de fournisseurs à clé API (`getProviderCategory(provider) === "apikey"`). Cela garantit que les requêtes entrantes vers des clés API amont sensibles au débit sont mises en file d'attente et limitées via Bottleneck, plutôt que de provoquer des rafales d'erreurs 429 amont. Le filet de sécurité peut être remplacé via la variable d'environnement `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` désactive, `true`/`1`/`on` force l'activation), qui prime sur le paramètre persistant du tableau de bord (**Paramètres → Résilience** / `PATCH /api/resilience`).

**Sémantique du champ `rateLimitProtection` par connexion :**
La protection contre la limitation de débit par connexion est suivie via le champ booléen `rateLimitProtection` des connexions de fournisseurs (persisté sous `rate_limit_protection` dans SQLite) :

- **Activé explicitement (`rateLimitProtection === true`)** : la protection contre la limitation de débit est explicitement activée pour cette connexion, quelle que soit la catégorie du fournisseur ou l'état du filet de sécurité d'activation automatique.
- **Désactivé explicitement (`rateLimitProtection === false`)** : désactive la protection explicite, mais **ne** soustrait **pas** une connexion active à clé API au filet de sécurité global d'activation automatique. Dans `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` et `undefined` sont équivalents : seul `rateLimitProtection === true` est traité comme un remplacement explicite. Si `rateLimitProtection` vaut `false` (ou n'est pas défini), une connexion active à clé API remplit toujours la condition d'activation automatique et reste protégée contre la limitation de débit.
- **Pas d'exclusion par connexion** : un opérateur ne peut actuellement pas exprimer « cette seule connexion active à clé API doit fonctionner sans protection par file d'attente de limitation de débit » tout en gardant l'activation automatique active pour les autres. Pour faire fonctionner les connexions à clé API sans files d'attente de limitation de débit, le filet de sécurité doit être désactivé globalement (`RATE_LIMIT_AUTO_ENABLE=false` ou `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Chemins d'écriture pris en charge :**

- **`POST /api/rate-limits`** : le chemin d'écriture de gestion pris en charge pour basculer `rateLimitProtection` d'une connexion (`{ connectionId: string, enabled: boolean }`). L'appeler avec `enabled: true` active la protection explicite ; l'appeler avec `enabled: false` supprime la protection explicite (les connexions actives à clé API restant toutefois couvertes par le filet de sécurité global si l'activation automatique est active).
- **`PUT /api/providers/[id]`** : n'accepte ni ne bascule délibérément **pas** `rateLimitProtection` (#11278). La mise à jour des métadonnées d'une connexion de fournisseur via `PUT /api/providers/[id]` ne modifiera jamais l'état persisté de la protection contre la limitation de débit.

---

## 6. Watchdog de débit des flux lents (#9709)

Le garde-fou optionnel `resilienceSettings.streamRecovery.throughputWatchdog`
détecte un amont qui envoie encore des chunks mais produit une sortie d'assistant
en dessous du taux de sortie utile configuré. Il est volontairement distinct du
délai d'inactivité : les heartbeats et les métadonnées ne réinitialisent ni l'un
ni l'autre des minuteurs et ne comptent pas comme une progression. Il est
également distinct de l'échéance absolue de tentative (#9153), qui reste un
plafond de sécurité absolu quelle que soit la qualité de la sortie.

Le watchdog exige une période de préchauffage suivie d'une fenêtre glissante
complète avant de pouvoir abandonner. Il compte les deltas de texte des
événements de sortie Chat Completions et Responses API (une approximation
conservative en octets UTF-8), ignore les événements vides ou ne contenant que
des données d'usage, et suspend son jugement tant que des événements d'appel
d'outil ou de raisonnement sont en cours. Il est désactivé par défaut et peut
être activé avec `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ; la fenêtre, le
préchauffage, le débit minimum et la sortie mesurable minimale sont bornés par
la couche normale de normalisation des paramètres de résilience.

Lorsqu'il est activé, un abandon déclenché par le watchdog ne s'applique qu'à la
tentative amont active. Avant tout octet visible par le client, le chemin
existant de récupération précoce sur le même compte peut rouvrir la tentative.
Après le commit, le flux n'est jamais rejoué aveuglément ; seul le contrat
existant de continuation sûre en milieu de flux peut recoller un suffixe. La
finalisation reste à exécution unique, de sorte que la comptabilisation de
l'usage et la libération du sémaphore ne sont pas dupliquées.

---

## 7. Reformulation du statut amont (erreurs de quota au statut erroné)

**Portée :** une passerelle amont qui signale un épuisement temporaire de quota avec un mauvais statut HTTP.

**Objectif :** corriger un statut trompeur AVANT la classification, afin que les consommateurs en aval (moteur de repli, agrégation combo, réponse destinée au client) voient la véritable nature réessayable de l'échec.

Certaines passerelles signalent un épuisement TEMPORAIRE de quota avec un statut HTTP non réessayable. `agentrouter.org` renvoie `403` (parfois `400`) avec un corps en chinois (`用户额度不足` / `额度不足`) au lieu du `429` standard. Des clients comme Claude Code traitent `403` comme permanent et abandonnent la session, et sans correction, le moteur de repli le classifierait comme `AUTH_ERROR` au lieu d'un événement de quota.

**Implémentation :**

- Registre + moteur de correspondance : `open-sse/config/upstreamStatusRestatement.ts` — une
  liste de règles par fournisseur (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), mises en correspondance via `applyStatusRestatement()`.
- Site d'appel : le bloc `providerFailure:` dans `open-sse/handlers/chatCore.ts`
  (vers la ligne 3654), juste après que `parseUpstreamError()` a analysé une
  réponse amont avec un statut HTTP d'erreur (`!providerResponse.ok`), et avant
  toute classification, afin que chaque consommateur en aval voie le statut
  corrigé. Les erreurs incorporées dans un flux SSE `200` suivent un chemin
  d'analyse de flux distinct et ultérieur et ne sont **pas** couvertes par ce
  hook aujourd'hui — une limitation connue, pas encore nécessaire pour le
  mauvais statut d'agentrouter (qui se manifeste comme un statut HTTP
  d'erreur).
- Éligibilité à la nouvelle tentative : `429` figure dans `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), donc une erreur
  reformulée comporte une véritable fenêtre de nouvelle tentative au lieu
  d'apparaître comme un `403` sans recours.
- Le `defaultRetryAfterMs` synthétique de `60s` (`upstreamStatusRestatement.ts`)
  est uniquement ce que la réponse reformulée indique au **client** ; ce n'est
  pas en soi la durée interne de cooldown/verrouillage de la connexion —
  celle-ci est régie séparément par le mécanisme qui traite réellement
  l'erreur reformulée (le backoff progressif du Connection Cooldown, §2, base
  `3s` pour les fournisseurs à clé API ; ou le Model Lockout, §3, pour les
  fournisseurs à quota par modèle comme agentrouter). Le routeur peut devenir
  éligible à une nouvelle tentative en interne plus tôt que la fenêtre de 60 s
  qu'il annonce au client — marge intentionnelle, pas un bug.

Les erreurs permanentes (`无权访问模型` d'agentrouter — pas d'accès à ce modèle) ne sont
JAMAIS reformulées : `excludeMarkers` oppose son veto à la règle même quand
`textMarkers` correspond, donc l'erreur conserve son statut d'origine et rien
ne la réessaie indéfiniment. La règle de classification du fournisseur
correspondante (`agentrouter-model-access-denied` dans
`open-sse/config/providerErrorRules.ts` : `reason: "auth_error"`,
`scope: "model"`, un cooldown de base déclaré de `6h`) est consultée par
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _avant_ le
retour anticipé `FORBIDDEN` générique de la catégorie apikey, conditionnée par
`honorsRuleLockScope(provider)` (#10334 — actuellement exclusif à agentrouter
via la liste d'autorisation `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dans
`providerErrorRules.ts`). Le cooldown de 6 h déclaré par la règle se propage
sous forme de `fallbackResult.baseCooldownMs`, mais il alimente toujours le
chemin de verrouillage par quota par modèle préexistant
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, inchangé par
#10334 sauf pour la source du cooldown) : il est plafonné au
`mlSettings.maxCooldownMs` de l'opérateur (par défaut `1_800_000ms` / 30 min),
comme tout autre verrouillage de modèle, et la _raison de verrouillage
persistée_ reste le `"forbidden"` codé en dur préexistant, pas le
`"auth_error"` de la règle — seule la durée du cooldown est honorée de bout en
bout, pas la chaîne de la raison. La connexion elle-même reste active ; les
modèles frères sur la même connexion ne sont pas affectés.

Les erreurs de quota reformulées (`额度不足`) atteignent une règle de fournisseur en
production (`agentrouter-user-quota-exhausted` : `reason: "quota_exhausted"`,
`scope: "connection"`, pas de cooldown déclaré propre — c'est le backoff
progressif par défaut de la couche de persistance qui s'applique). Depuis
#10334, le `scope` sur `ProviderErrorRuleMatch` EST consommé de bout en bout,
mais **uniquement** pour les fournisseurs de la liste d'autorisation
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — aujourd'hui
seulement `"agentrouter"`, conditionné via `honorsRuleLockScope()`). Pour tout
autre fournisseur, `scope` reste informatif, exactement comme avant #10334.
`checkFallbackError` expose le scope de la règle correspondante sous
`fallbackResult.ruleScope` ; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) est le garde-fou partagé qui confirme qu'un
`ruleScope` peut réellement être honoré en toute sécurité comme un signal à
l'échelle de la connexion, auto-réparable (scope `"connection"`, raison
`quota_exhausted`, jamais `permanent`, jamais `creditsExhausted` — une défense
contre une future règle associant le scope `"connection"` à un état de compte
permanent). Deux consommateurs l'appellent :

- **Persistance** (`markAccountUnavailable()`, `src/sse/services/auth.ts`) :
  au lieu de tomber dans la branche de verrouillage **par modèle** du
  fournisseur passthrough (agentrouter est `passthroughModels: true` →
  `hasPerModelQuota()` retourne `true`), elle applique un **refroidissement
  temporaire de la connexion** — `testStatus: "unavailable"` +
  `rateLimitedUntil`, jamais un statut terminal
  (`credits_exhausted`/`banned`/`expired`) — de sorte que la connexion se
  rétablit d'elle-même une fois le refroidissement expiré au lieu d'exiger
  une réinitialisation manuelle des identifiants. Ignoré pour les connexions
  avec `disableCooling: true` (#2997) : cette exclusion retombe alors sur le
  verrouillage par modèle (un compromis documenté — voir le commentaire de
  code au-dessus de la branche).
- **Routage de combo dans la même requête** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`) : la même garde inscrit la
  connexion dans l'ensemble en mémoire `exhaustedConnections`, indexé par
  `${provider}:${connectionId}`. Cela n'ignore qu'une cible restante DE LA
  MÊME REQUÊTE qui _porte elle-même déjà exactement ce `connectionId`_ sur
  son propre objet cible (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` avant la recherche dans `exhaustedConnections`) — un combo
  simple de liste de modèles, où les cibles sœurs ne portent aucun
  `connectionId` épinglé qui leur soit propre et où l'un n'est résolu qu'à
  chaque distribution à partir de l'en-tête de réponse
  `X-OmniRoute-Selected-Connection-Id`, ne déclenche jamais cette
  correspondance de clé. Pour ce cas courant, la véritable protection
  empêchant une étape restante de réutiliser le compte qui vient d'être
  épuisé n'est PAS ce Set — c'est la couche de persistance ci-dessus (le
  `rateLimitedUntil` de la connexion est désormais dans le futur) combinée à
  cette même garde qui supprime `transientRateLimitedProviders` pour l'échec
  (voir « Conception en deux étapes » et le commentaire de code sur la
  branche `isAgentrouterConnectionQuotaScope` dans `targetExhaustion.ts`) :
  ce Set restant non marqué, l'autorisation forcée
  `allowRateLimitedConnection` de `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ne se déclenche PAS
  pour les étapes restantes du fournisseur, de sorte que le filtre
  `rateLimitedUntil` de la sélection d'identifiants
  (`src/sse/services/auth.ts:1238`) est honoré normalement et qu'une étape
  restante choisit soit une autre connexion agentrouter encore éligible, soit
  échoue faute d'identifiants disponibles — elle ne force pas son retour sur
  la connexion que cette branche vient de refroidir.

### Conception en deux étapes : reformulation du statut, puis classification

La reformulation du statut (`upstreamStatusRestatement.ts`) et les règles de
classification des fournisseurs (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sont des registres distincts qui s'indexent tous deux
sur l'identifiant du fournisseur et sur des marqueurs textuels, mais ils
s'exécutent à des endroits différents et servent des objectifs différents :
la reformulation réécrit le statut HTTP tôt dans `chatCore.ts` ; les règles
de classification choisissent la `reason` de repli et le `scope` de
verrouillage (`model` / `provider` / `connection`) à l'intérieur de
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Les règles de classification ne voient le **texte** complet de l'erreur
(nécessaire pour faire correspondre des marqueurs de corps comme `额度不足`)
que pour les fournisseurs figurant dans la liste d'autorisation
`FULL_TEXT_RULE_PROVIDERS` de `providerErrorRules.ts` — actuellement
uniquement `"agentrouter"`. Pour tout autre fournisseur du **catalogue
intégré**, `checkFallbackError` ne transmet à `getProviderErrorRuleMatch` que
l'erreur structurée (`{code, type}`), ce qui suffit pour les règles fondées
sur les en-têtes/statuts/codes mais reste aveugle aux marqueurs textuels du
corps. L'auxiliaire `resolveRuleMatchBody()` effectue cette sélection : texte
d'erreur complet pour les fournisseurs de la liste d'autorisation, erreur
structurée sinon. L'ajout d'un fournisseur **intégré** à
`FULL_TEXT_RULE_PROVIDERS` est une inscription (opt-in) explicite par
fournisseur — elle existe pour que le chemin par défaut de tout fournisseur
absent de la liste reste inchangé octet par octet.

Le `scope` d'une règle (`model` / `provider` / `connection`) est une
inscription distincte de `FULL_TEXT_RULE_PROVIDERS` : `checkFallbackError` ne
l'expose que sous la forme `fallbackResult.ruleScope`, et les consommateurs
en aval ne l'honorent comme autre chose qu'une étiquette informative que pour
les fournisseurs figurant dans la liste d'autorisation
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` du même fichier (contrôlée via
`honorsRuleLockScope()` — aujourd'hui uniquement `"agentrouter"`). Voir
« Erreurs de quota reformulées » ci-dessus pour ce qu'une correspondance
`scope: "connection"` fait réellement une fois qu'un fournisseur figure dans
cette liste d'autorisation.

**#11104 — les règles déclarées par l'opérateur contournent les deux listes
d'autorisation.** Un opérateur peut déclarer une règle par fournisseur à
l'exécution via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) sans
modifier ce fichier. Soumettre une règle d'opérateur à
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — des listes
d'autorisation destinées à protéger le comportement **par défaut** des règles
du catalogue intégré — rendrait le mécanisme de paramètres inerte pour tout
fournisseur autre que ceux qui y figurent déjà, puisque la déclaration de la
règle constitue déjà l'inscription explicite de l'opérateur.
`resolveRuleMatchBody()` et `honorsRuleLockScope()` vérifient toutes deux
`hasOperatorRuleForProvider()` d'abord : un fournisseur doté d'une règle
d'opérateur reçoit le texte d'erreur brut et voit son `scope` déclaré honoré,
qu'il figure ou non dans l'une ou l'autre liste d'autorisation.

**Lacune connue — `providerRuleRegistry` n'est jamais consulté pour HTTP 400.** La branche `BAD_REQUEST` de `checkFallbackError` classe le statut 400
entièrement via ses propres tableaux de motifs
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, etc. dans
`accountFallback.ts`) et retourne avant que la branche
`configuredRule`/`getProviderErrorRuleMatch` située au-dessus ne soit
atteinte. Une règle du catalogue intégré (ou une règle d'opérateur) avec
`status: 400` est syntaxiquement valide mais ne se déclenchera jamais. Aucune
règle existante ne cible 400 aujourd'hui, donc rien en production n'est
affecté — mais une future règle 400 nécessite d'abord de modifier cette
branche, ce qui représente un changement plus important que l'ajout d'une
règle (cela reclassifie 400 pour chaque fournisseur qui s'appuie déjà sur le
comportement des tableaux de motifs) et sort du cadre de l'ajout d'une règle
pour un seul fournisseur.

### Ajout d'une passerelle déclarant incorrectement l'état des quotas

1. Enregistrez un tableau de règles dans `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Gardez `textMarkers`
   spécifique au fournisseur ; ne réutilisez jamais d'expressions anglaises
   génériques qui entreraient en conflit avec `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Enregistrez éventuellement des règles de classification dans
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) pour
   choisir la bonne portée de verrouillage (`connection` pour un quota à
   l'échelle du compte, `model` pour les erreurs propres à un modèle).
   Cette étape ne prend effet en production que pour les fournisseurs dont
   les règles nécessitent le texte d'erreur complet (marqueurs du corps) :
   ajoutez l'identifiant du fournisseur à `FULL_TEXT_RULE_PROVIDERS` dans
   le même fichier — sinon `checkFallbackError` ne transmet jamais à la
   règle que l'erreur structurée `{code, type}` et une règle basée sur le
   texte du corps ne correspondra jamais au trafic réel.
   Les règles qui correspondent uniquement sur `status`/`headers` (comme
   celles d'Opencode ou de Minimax) n'ont pas besoin de cette activation
   explicite. Par ailleurs, si la règle déclare `scope: "connection"` et
   que l'intention est un véritable refroidissement (cooldown) à l'échelle
   de la connexion accompagné d'un contournement du combo pour la même
   requête (et pas seulement une étiquette informative), ajoutez
   l'identifiant du fournisseur à `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dans
   le même fichier — c'est ce qui conditionne la consommation de type
   `isAgentrouterConnectionQuotaScope()` dans `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) et `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ; sans cela, `scope`
   continue de circuler via `fallbackResult.ruleScope` mais rien n'en
   tient compte.
3. Ajoutez des tests unitaires calqués sur
   `tests/unit/upstream-status-restatement.test.ts` et
   `tests/unit/agentrouter-error-rules.test.ts` (y compris les gardes
   not-permanent / not-creditsExhausted, et — si le fournisseur nécessite
   la liste blanche — un test vérifiant que `resolveRuleMatchBody()` ne
   renvoie le texte complet que pour ce fournisseur).

Aucune modification de `chatCore.ts`, de `classifyError` ou du combo n'est nécessaire.

#### Verrouillage groupé par IP de sortie (#10880)

Les fournisseurs figurant dans `EGRESS_BUCKETED_LOCK_PROVIDERS` (famille
opencode) sont traités comme des upstreams compartimentés par IP (le niveau
gratuit d'opencode est compartimenté par IP, et non par compte — voir
#9611) : un statut 429 classé `quota_exhausted` **ou** `rate_limit_exceeded`
met en refroidissement toutes les connexions de la famille autorisée dont
la dernière IP de sortie connue correspond à celle de la connexion
défaillante, avant que la rotation puisse les essayer
— évitant ainsi N-1 appels amont voués à l'échec (même schéma que
#10460/#10525).
`rate_limit_exceeded` est inclus délibérément : sur le chemin
`markAccountUnavailable`, les règles spécifiques à opencode ne
correspondent jamais (aucun en-tête/corps transmis à `checkFallbackError`,
opencode absent de `FULL_TEXT_RULE_PROVIDERS`), de sorte qu'un 429 dont le
corps porte le texte de quota d'abonnement ("monthly usage limit
reached") est classé `quota_exhausted` par le repli sur le texte de quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts` ; refroidissement
d'1 h) avant même que la règle `status_429` ne soit atteinte — tandis
qu'un 429 sans texte de quota (simple limitation de débit) est classé via
la règle `status_429` comme `rate_limit_exceeded` et met quand même la
famille d'IP en refroidissement. Pour un fournisseur de la liste blanche,
une limitation de débit compartimentée par IP est le même signal qu'un
quota épuisé. Limites assumées :

- **Best-effort** : le verrou résout la dernière `egress_ip` connue de la connexion
  depuis `proxy_logs` (fenêtre de 24 h, synchrone, sans cache). Cache froid (IP
  de sortie jamais sondée) ou aucune ligne → la connexion défaillante est
  toujours refroidie par la branche (enregistrée comme aujourd'hui), mais aucune
  connexion sœur n'est verrouillée.
- **Jamais terminal** : le cooldown est une fenêtre de quota qui se renouvelle
  (`testStatus: "unavailable"`) ; un état permanent n'est jamais dérivé d'un
  signal au niveau IP. Les connexions `disableCooling` ignorent entièrement la
  branche.
- **La granularité du verrou change pour la famille de l'allowlist** : il s'agit
  d'un changement de portée, pas seulement d'une optimisation des connexions
  sœurs. opencode est un fournisseur `passthroughModels`, donc avant cette
  branche un 429 produisait un verrouillage par MODÈLE ; il produit désormais un
  cooldown de connexion — y compris pour un opérateur exécutant une connexion
  unique sans aucune sœur. C'est la granularité que la table de règles opencode
  déclare déjà correcte (`scope: "connection"`, `providerErrorRules.ts`), jamais
  respectée jusqu'ici parce qu'opencode n'est pas dans
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. La branche écrit elle-même le cooldown de
  la connexion défaillante + le `backoffLevel`, en miroir de la branche
  agentrouter à portée connexion, puis retourne — le bloc par modèle et le
  chemin générique ci-dessous ne sont jamais atteints.
- **Combo inclus** : comme la branche agentrouter, la portée ignore
  délibérément le downgrade `persistUnavailableState`/`isCombo` qu'un appelant
  combo applique à un 429. Un verrouillage par modèle n'est pas une forme plus
  faible de cette portée, c'est la mauvaise unité : il ne dit rien sur l'IP
  épuisée, donc la rotation combo continuerait à brûler un appel dont l'échec
  est garanti par connexion sœur.
- **Sécurité des sœurs** : une sœur déjà terminale (banned/credits_exhausted)
  ou déjà dans un cooldown plus long n'est jamais écrasée.
- **Allowlist exclusive** : élargir `EGRESS_BUCKETED_LOCK_PROVIDERS` est une
  décision explicite du propriétaire ; pas de câblage générique (pattern
  #10334/#10419). La requête des sœurs lie cette même allowlist au lieu de la
  répéter en littéral SQL, donc l'élargir reste un changement d'une seule ligne.
- **Rotation des IP de sortie, dans les deux sens** : la fenêtre de recherche
  (24 h) est bien plus large que le TTL du cache d'IP de sortie (5 min), donc la
  « dernière IP connue » est un historique, pas un état courant. Si le proxy
  d'une connexion a tourné à l'intérieur de la fenêtre, le verrou peut
  **manquer** une IP réellement partagée (l'IP enregistrée est la nouvelle, non
  épuisée) — et, symétriquement, il peut **refroidir une sœur qui a depuis
  tourné** loin de l'IP épuisée. Le second cas coûte à cette sœur une fenêtre
  de cooldown ; les deux sont des limites best-effort acceptées, inhérentes à
  une recherche basée sur l'historique.
- **Coût** : deux scans bornés de `proxy_logs` (filtrés par fenêtre via
  `idx_pl_timestamp`), uniquement à la fréquence des 429. Aucun nouvel index
  (migration 134 YAGNI). Mesuré sur une copie de base de données de trafic réel
  de taille modérée ; une instance à fort débit contient proportionnellement
  plus de lignes dans la même fenêtre.

---

## Autres fonctionnalités de résilience

- **21 stratégies de routage** (priorité, pondérée, round-robin, relais de contexte, fill-first, p2c, aléatoire, moins utilisée, optimisée par coût, sensible à la réinitialisation, fenêtre de réinitialisation, expiration d'abord, marge disponible, pondérée par quota, strictement aléatoire, auto, lkgp, optimisée par contexte, optimisée par cache, fusion, pipeline) — voir [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routage sensible à la réinitialisation** (v3.8.0) — hiérarchise les connexions selon l'heure de réinitialisation du quota.
- **Dégradation du mode arrière-plan** — `background: true` de l'API Responses est dégradé en mode synchrone avec un avertissement.
- **Détection dynamique de la limite d'outils** — met en retrait les fournisseurs lorsque les limites du nombre d'outils sont atteintes.
- **Repli d'urgence** — contrôlé par `OMNIROUTE_EMERGENCY_FALLBACK` ; les opérateurs peuvent le surcharger depuis la page Feature Flags sans redémarrage.

---

## Débogage

- Le combo pondéré répond `503 all_targets_cooling_down` (`Retry-After` défini, `diagnostics.excluded` liste chaque cible avec `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → le pool est configuré et connecté, chaque cible est simplement exclue par un minuteur de résilience ; l'avertissement `[COMBO] Weighted selection: every target excluded before dispatch — …` indique les raisons et les secondes restantes. Un `404 no_executable_targets` provenant du même combo signifie qu'aucun minuteur de résilience n'est en cause (rien à exécuter, ou chaque compte a échoué à la sonde de disponibilité). Implémenté dans `open-sse/services/combo/pinRecovery.ts` à partir des exclusions collectées dans `targetResolution.ts`.
- Toutes les clés d'un fournisseur ignorées → vérifiez à la fois l'état du disjoncteur ET le `rateLimitedUntil`/`testStatus` de chaque connexion.
- Fournisseur définitivement exclu après la fenêtre de réinitialisation → le code lit `state` brut au lieu de `getStatus()`/`canExecute()`.
- Une clé échoue, les autres devraient fonctionner → privilégiez le refroidissement de connexion au disjoncteur.
- Un seul modèle échoue → privilégiez le verrouillage du modèle au refroidissement de connexion.
- L'état devrait se rétablir de lui-même mais ne le fait pas → vérifiez la présence d'un horodatage futur + un chemin de lecture qui rafraîchit l'état expiré. Les statuts permanents nécessitent des modifications manuelles.

---

## État d'exécution — référence rapide pour l'agent

> Déplacé mot pour mot depuis `AGENTS.md` → « Resilience Runtime State » (PR #12743) afin que le
> guide de l'agent reste sous le budget de contexte de 40k. Il s'agit de la vue condensée,
> destinée à l'agent, des sections ci-dessus ; les sections numérotées restent la référence complète.

OmniRoute dispose de trois mécanismes de défaillance temporaire liés mais distincts. Gardez leur
portée séparée lors du débogage du comportement de routage. Voir le
[diagramme de résilience à 3 couches](../diagrams/exported/resilience-3layers.svg)
(source : [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
pour une vue d'ensemble.

### Disjoncteur de fournisseur

**Portée** : le fournisseur entier, par ex. `glm`, `openai`, `anthropic`.

**Objectif** : cesser d'envoyer du trafic vers un fournisseur qui échoue de manière répétée au
niveau amont/service, afin qu'un fournisseur défaillant ne ralentisse pas chaque requête.

**Implémentation** :

- Classe principale : `src/shared/utils/circuitBreaker.ts`
- Câblage du portail/exécution du chat : `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de statut d'exécution : `src/app/api/monitoring/health/route.ts`
- Wrappers partagés : `open-sse/services/accountFallback.ts`
- Table d'état persisté : `domain_circuit_breakers`

**États** (4 — `src/shared/utils/circuitBreaker.ts`) :

- `CLOSED` : le trafic normal est autorisé.
- `DEGRADED` : bande d'alerte précoce — les échecs ont franchi le seuil de dégradation mais pas
  encore le seuil du disjoncteur ; le trafic circule toujours, les tableaux de bord affichent
  l'avertissement. Un test de connexion valide ou une fenêtre calme sans nouvel échec le ramène à
  `CLOSED` (la fenêtre est documentée dans `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN` : le fournisseur est temporairement bloqué ; les appelants reçoivent une réponse
  provider-circuit-open ou le routage du combo passe à une autre cible.
- `HALF_OPEN` : le délai de réinitialisation est écoulé ; autoriser une requête sonde. Le succès
  ferme le disjoncteur, l'échec le rouvre.

**Valeurs par défaut** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consommées via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` dans `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` dans `src/sse/handlers/chatHelpers.ts`). Le disjoncteur
à l'échelle du fournisseur s'appuie sur `circuitBreakerThreshold` / `circuitBreakerReset` :

| Profil  | se dégrade à | s'ouvre à (`circuitBreakerThreshold`) | réinitialisation (`circuitBreakerReset`) |
| ------- | -----------: | ------------------------------------: | ---------------------------------------: |
| OAuth   |          `5` |                                   `8` |                                    `60s` |
| API key |          `7` |                                  `12` |                                    `30s` |
| Local   |    (dérivée) |                                   `2` |                                    `15s` |

`PROVIDER_PROFILES` définit également `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) et `providerCooldownMs` (5/10/1 min) : ceux-ci alimentent
le **portail de fenêtre du Provider Cooldown global optionnel** (`PROVIDER_COOLDOWN_ENABLED`,
désactivé par défaut) — une entrée au niveau du fournisseur dans
`open-sse/services/providerCooldownTracker.ts` n'est considérée en refroidissement qu'après
`providerFailureThreshold` échecs dans `providerFailureWindowMs`, et refroidit ensuite pendant
`providerCooldownMs`. Ce ne sont PAS les seuils du disjoncteur actif — ne les ajustez pas en
espérant modifier le comportement du disjoncteur. Chaque valeur par défaut peut être surchargée via
les variables d'environnement `OMNIROUTE_PROVIDER_BREAKER_*` et `OMNIROUTE_CIRCUIT_BREAKER_*` ; le
tableau de référence exact pour l'exécution se trouve dans `docs/architecture/RESILIENCE_GUIDE.md`.

Seuls les statuts d'échec au niveau du fournisseur doivent déclencher le disjoncteur de fournisseur :

```ts
(408, 500, 502, 503, 504);
```

Ne déclenchez pas le disjoncteur à l'échelle du fournisseur pour les erreurs normales de
compte/clé/modèle comme la plupart des cas de `401`, `403`, ou `429`. Ceux-ci relèvent
généralement du refroidissement de connexion ou du verrouillage de modèle. Un `403` générique
d'un fournisseur de type clé API doit être récupérable sauf s'il est classé comme une erreur
terminale de fournisseur/compte.

Le disjoncteur utilise une récupération paresseuse (lazy), et non un minuteur en arrière-plan. Lorsque `OPEN` expire, les lectures telles que `getStatus()`, `canExecute()` et `getRetryAfterMs()` actualisent l'état vers `HALF_OPEN`, de sorte que les tableaux de bord et les constructeurs de candidats combo ne continuent pas d'exclure indéfiniment un fournisseur expiré.

### Refroidissement de connexion

**Portée** : une connexion/compte/clé de fournisseur.

**Objectif** : ignorer temporairement une clé/un compte défaillant tout en permettant aux autres connexions du même fournisseur de continuer à traiter les requêtes.

**Implémentation** :

- Chemin d'écriture/mise à jour : `src/sse/services/auth.ts::markAccountUnavailable()`
- Sélection/filtrage des comptes : `src/sse/services/auth.ts::getProviderCredentials...`
- Calcul du refroidissement : `open-sse/services/accountFallback.ts::checkFallbackError()`
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

Lors de la sélection des comptes, une connexion est ignorée tant que :

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Les refroidissements sont également paresseux : lorsque `rateLimitedUntil` est dans le passé, la connexion redevient éligible. En cas d'utilisation réussie, `clearAccountError()` efface `testStatus`, `rateLimitedUntil`, les champs d'erreur et `backoffLevel`.

Comportement de refroidissement de connexion par défaut :

- Refroidissement de base OAuth : `5s`.
- Refroidissement de base pour clé API : `3s`.
- Un `429` sur clé API doit privilégier les indications de nouvelle tentative de l'amont (`Retry-After`, en-têtes de réinitialisation ou texte de réinitialisation analysable) lorsqu'elles sont disponibles.
- Les échecs récupérables répétés utilisent un backoff exponentiel :

```ts
baseCooldownMs * 2 ** failureIndex;
```

La protection anti-thundering-herd empêche des échecs concurrents sur la même connexion de prolonger à plusieurs reprises le refroidissement ou d'incrémenter en double `backoffLevel`.

Les états terminaux ne sont pas des refroidissements. `banned`, `expired` (qui ne devient terminal qu'après N tentatives bornées via `EXPIRED_RETRY_MAX`) et `credits_exhausted` sont destinés à rester indisponibles jusqu'à ce que les identifiants/paramètres changent ou qu'un opérateur les réinitialise. N'écrasez pas les états terminaux avec un état de refroidissement transitoire.

### Verrouillage de modèle

**Portée** : fournisseur + connexion + modèle.

**Objectif** : éviter de désactiver une connexion entière lorsqu'un seul modèle est indisponible ou limité par quota pour cette connexion.

Exemples :

- Fournisseurs avec quota par modèle renvoyant `429`.
- Fournisseurs locaux renvoyant `404` pour un modèle manquant.
- Échecs d'autorisation de mode/modèle propres à un fournisseur, tels que certains modes Grok.

Le verrouillage de modèle réside dans `open-sse/services/accountFallback.ts` et permet à la même connexion de continuer à servir d'autres modèles.

### Conseils de débogage

- Si toutes les clés d'un fournisseur sont ignorées, inspectez à la fois l'état du disjoncteur du fournisseur et le `rateLimitedUntil`/`testStatus` de chaque connexion.
- Si un fournisseur semble exclu de façon permanente après la fenêtre de réinitialisation, vérifiez si le code lit le `state` brut au lieu d'utiliser `getStatus()`/`canExecute()`.
- Si une clé de fournisseur échoue mais que d'autres devraient fonctionner, préférez le refroidissement de connexion au disjoncteur de fournisseur.
- Si un seul modèle échoue, préférez le verrouillage de modèle au refroidissement de connexion.
- Si un état doit se rétablir de lui-même, il doit avoir un horodatage futur/délai de réinitialisation et un chemin de lecture qui actualise l'état expiré. Les statuts permanents nécessitent une modification manuelle des identifiants ou de la configuration.

---

## Empreinte TLS & Furtivité

La furtivité spécifique au fournisseur (JA3/JA4, CCH, obfuscation) est documentée séparément — voir `docs/security/STEALTH_GUIDE.md` (git ; non compilé dans `/docs`).

---

## Tests de résilience (Phase 8 · Bloc C)

Au-delà des tests unitaires de la logique de résilience, trois tests sollicitent le runtime
dans des conditions réelles de stress/défaillance (tous integration/nightly — aucun ne bloque les PR) :

| Test        | Description                                                                                                                                                                                  | Exécution                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Le nœud fake-upstream injecte de la latence/reset/timeout/503 réels ; valide que le disjoncteur s'ouvre/se rétablit et que `checkFallbackError` classifie le 503 comme fallback récupérable. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 flux par `createSSEStream` sous `--expose-gc` ; échoue si le tas dépasse le plafond (protection OOM #3069).                                                                             | `npm run test:heap`                      |
| k6 soak     | Charge soutenue contre `/api/monitoring/health` ; seuils p95/erreur.                                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestré par `.github/workflows/nightly-resilience.yml` (cron + dispatch). Dans le
`test:integration` par défaut, chaos et heap s'ignorent d'eux-mêmes (sans `RUN_CHAOS_INT`/`--expose-gc`).

---

## Voir aussi

- [Guide d'architecture](./ARCHITECTURE.md) — Architecture système et mécanismes internes
- [Guide utilisateur](../guides/USER_GUIDE.md) — Fournisseurs, combos, intégration CLI
- [Moteur Auto-Combo](../routing/AUTO-COMBO.md) — Scoring à 16 facteurs, packs de modes
