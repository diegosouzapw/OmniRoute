# Monitoring & Observability Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR** : OmniRoute intègre une surveillance de l’état de santé, un pilotage automatique des fournisseurs, un suivi des quotas et des points d’intégration pour l’observabilité. Ce guide présente le tableau de bord, les alertes et le dépannage.

**Sources :**

- `src/lib/monitoring/observability.ts` — instantané d’observabilité
- `src/lib/monitoring/comboHealthAutopilot.ts` — pilotage automatique de l’état de santé des combos
- `src/lib/monitoring/providerHealthAutopilot.ts` — pilotage automatique des fournisseurs
- `src/lib/monitoring/providerHealthMatrix.ts` — matrice d’état de santé des fournisseurs
- `src/lib/localHealthCheck.ts` — vérification locale de l’état de santé
- `src/lib/tokenHealthCheck.ts` — état de santé du renouvellement des jetons
- `src/lib/proxyHealth.ts` — cache de l’état de santé du proxy (présenté dans PROXY_GUIDE.md)

---

## Vue d’ensemble

OmniRoute comporte **3 niveaux de surveillance** :

```
┌──────────────────────────────────────────────────────────────┐
│  Niveau 1 : état de santé du système (serveur)                │
│  ├─ localHealthCheck.ts — BDD, ports, dépendances natives     │
│  ├─ db/healthCheck.ts — intégrité, FK, artefacts orphelins     │
│  └─ Tableau de bord : /dashboard/health                       │
├──────────────────────────────────────────────────────────────┤
│  Niveau 2 : santé des fournisseurs (résilience par fournisseur)│
│  ├─ providerHealthAutopilot.ts — disjoncteur, délais de reprise│
│  ├─ providerHealthMatrix.ts — scores par fournisseur/modèle   │
│  └─ Tableau de bord : /dashboard/providers                    │
├──────────────────────────────────────────────────────────────┤
│  Niveau 3 : observabilité en temps réel (instantanés d’exécution)│
│  ├─ observability.ts — disjoncteurs, sessions, quotas          │
│  ├─ tokenHealthCheck.ts — état du renouvellement des jetons OAuth│
│  └─ Outils MCP : omniroute_get_health, omniroute_get_session_snapshot│
└──────────────────────────────────────────────────────────────┘
```

---

## Pages du tableau de bord

### `/dashboard/health` (État de santé du système)

Le tableau de bord général de l’état de santé affiche :

| Section                        | Informations affichées                                       |
| ------------------------------ | ------------------------------------------------------------ |
| **État du serveur**            | Disponibilité, version, port, connexions actives             |
| **Base de données**            | Connexion, intégrité, taille du WAL, migrations récentes     |
| **Résumé des fournisseurs**    | Nombre de fournisseurs actifs et sains, disjoncteurs ouverts |
| **Moniteurs de quotas**        | Sessions actives, alertes, quotas épuisés                    |
| **Erreurs récentes**           | 10 dernières erreurs avec traces de pile                     |
| **Utilisation des ressources** | Mémoire, processeur, indicateur de pression du tas           |

### `/dashboard/providers` (État de santé des fournisseurs)

Tableau de bord par fournisseur :

| Colonne     | Description                                                |
| ----------- | ---------------------------------------------------------- |
| Fournisseur | ID du fournisseur + nom d’affichage                        |
| Santé       | État vert/jaune/rouge                                      |
| Disjoncteur | État ouvert/fermé/semi-ouvert                              |
| Connexions  | Nombre de connexions, dernier renouvellement               |
| Modèles     | Modèles disponibles, état de santé par modèle              |
| Coût        | Coût du jour, tendance sur 7 jours                         |
| Erreurs     | Nombre d’erreurs sur les dernières 24 h, principale classe |

Cliquez sur un fournisseur pour afficher :

- Les requêtes récentes avec la répartition de la latence
- Les scores d’état de santé par connexion
- Les verrouillages par modèle
- Les recommandations du pilotage automatique

### `/dashboard/quota` (Suivi des quotas)

Pour chaque clé API :

- Utilisation actuelle par rapport à la limite (barre de progression)
- Tendance du quota (graphique sur 30 jours)
- Heure de la prochaine réinitialisation
- Historique des alertes

### `/dashboard/combos` (État de santé des combos)

Pour chaque combo :

- Stratégie + cibles
- État de santé par cible
- Événements de repli récents
- Taux de réussite (24 h, 7 j, 30 j)

---

## API de contrôle d’état

OmniRoute expose **deux** surfaces HTTP de contrôle d’état. Elles ne sont pas interchangeables pour les orchestrateurs.

| Chemin                       | Objectif                                                                              | Coût                                          | Utilisation                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `GET /healthz`               | Vivacité/disponibilité du cycle de vie (`ok` / `starting` / `stopping`)               | Négligeable (indicateur de phase uniquement)  | **Disponibilité** Kubernetes ; **vivacité** souple si HTTP est indispensable                |
| `GET /api/monitoring/health` | Résumé approfondi du système et des fournisseurs (BDD, tas, décompte du catalogue, …) | Élevé (travail synchrone de BDD/surveillance) | Tableaux de bord, contrôles approfondis de type blackbox, contrôle d’état intégré de Docker |

> **Remarque :** Les matrices d’état des fournisseurs, les problèmes de pilote automatique, les moniteurs de quotas, l’état des jetons et les détails de latence au-delà de `/api/monitoring/health` sont disponibles via l’**outil MCP** `observability_snapshot` ou les pages du **tableau de bord** — il n’existe aucune route REST dédiée pour ces éléments.

Les deux routes s’exécutent dans la **même boucle d’événements Node** que le traitement des requêtes. Un chemin limité par le processeur (traitement d’un catalogue volumineux par `GET /v1/models`, compression de contexte long/comptage des jetons) peut retarder **tous** les gestionnaires HTTP, y compris `/healthz`. Une boucle d’événements occupée ≠ un processus mort. Il est préférable de corriger la tâche qui monopolise les ressources ; le réglage des sondes ne fait que réduire les arrêts intempestifs.

### Sonde légère pour orchestrateur

```bash
GET /healthz
# ou HEAD /healthz
```

- **200** + corps `ok` lorsque la phase du cycle de vie du serveur est prête
- **503** + `starting` / `stopping` pendant le démarrage ou l’arrêt
- Implémentation : `src/app/healthz/route.ts` (aucune interrogation de la BDD)

### État du système (approfondi)

```bash
GET /api/monitoring/health
```

Réponse :

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth` : cache des sondes ou `test_status` SQLite

`GET /api/monitoring/health` → `credentialHealth` correspond à la **jauge en mémoire du cache des sondes**, et non à une extraction en direct de `provider_connections.test_status`. Après #12532, le chemin de requête lit uniquement `getCachedCredentialHealthSummary()` ; des sondes en arrière-plan actualisent le cache hors de la boucle d’événements.

| Couche                          | Emplacement                                                           | Signification                                                                                                                                                                                                                     |
| ------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jauge du cache des sondes       | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Derniers résultats des sondes d’état des identifiants encore conservés dans la mémoire du processus. `source` vaut toujours `probe-cache`.                                                                                        |
| Détails des connexions en échec | `credentialHealth.failedConnections`                                  | Présent **uniquement lorsque `failed > 0`**. Liste limitée de lignes du cache avec `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` assainis). `failedOmitted` est défini lorsque la liste a été tronquée. |
| État persistant SQLite          | `credentialHealth.staleDbNonOkCount`                                  | Nombre de lignes de connexion **actives** (`is_active=1`) dont le `test_status` persistant est une valeur non valide connue (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                    |

Les deux couches peuvent volontairement diverger :

- Jauge `failed=0` alors que `staleDbNonOkCount>0` — SQLite contient encore un
  `test_status` persistant (par exemple `expired` ou `credits_exhausted`) que le
  dernier instantané du cache des sondes ne comptabilise pas comme `status=error`.
- Jauge `failed>0` alors que SQLite semble sain — une sonde récente a échoué et
  son résultat est mis en cache ; la ligne de BDD n’a pas été mise à jour ou a
  été effacée ultérieurement.

Ne déclenchez pas d’alerte uniquement à partir de `provider_connections.test_status` lors de la collecte de ce point de terminaison. Utilisez `failed` + `failedConnections` pour les échecs de sondes en direct, et `staleDbNonOkCount` lorsque vous avez besoin du nombre d’états persistants.

### Recommandations pour les sondes Kubernetes

OmniRoute est un **processus Node unique** (une seule boucle d’événements). Le `HEALTHCHECK` Docker standard cible la route légère `/healthz`. `/api/monitoring/health` est **trop coûteuse** pour les intervalles de contrôle de vivacité de kubelet.

| Sonde               | Cible recommandée                                                                                    | Remarques                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Démarrage**       | HTTP `GET /healthz` avec un `failureThreshold` élevé (ou un `startPeriod` long)                      | Le démarrage à froid et la migration SQLite peuvent prendre plus de quelques secondes                                                                                                                                                                                                                                                                                                                                                                                   |
| **Disponibilité**   | HTTP `GET /healthz`                                                                                  | Cycle de vie `ok` / `starting` / `stopping` (200 ou 503). La sonde reste instable si la boucle est bloquée par le CPU. Un **code 200 obtenu après plusieurs secondes n'indique pas un état sain** (#10303) — cela signifie que la boucle d'événements a été privée de ressources avant l'exécution du gestionnaire de 3 octets                                                                                                                                          |
| **Activité**        | HTTP `GET /livez`, **ou TCP** sur le port principal du service (`PORT`, valeur par défaut : `20128`) | `/livez` indique uniquement que le processus est actif (toujours 200 si le gestionnaire s'exécute). Il partage néanmoins la boucle d'événements — occupé ≠ mort, et il ne détecte pas mieux qu'une sonde TCP la privation de ressources de la boucle d'événements (#10303). Préférez **TCP** si les sondes HTTP expirent sous la charge du catalogue ou de la compression ; dans les deux cas, ne tuez **pas** le pod lors de courts blocages de la boucle d'événements |
| **État approfondi** | `GET /api/monitoring/health` depuis un outil de vérification externe                                 | Ne convient pas à la `livenessProbe` du kubelet ni à une `readinessProbe` exécutée à intervalles rapprochés                                                                                                                                                                                                                                                                                                                                                             |

Exemple de configuration (ajustez les seuils en fonction de votre démarrage à froid et de la charge de compression) :

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Lors d'un blocage de la boucle d'événements, la requête HTTP vers /livez
  # peut tout de même expirer. TCP constitue l'alternative prudente :
  # tcpSocket:
  #   port: http
```

Ne configurez **pas** la sonde d'**activité** du kubelet pour qu'elle pointe vers `/api/monitoring/health`. Ce chemin effectue de véritables opérations de base de données et de surveillance, et générera des faux positifs sous charge.

Voir aussi : [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (sondes lorsque la boucle d'événements est occupée), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (tarification du catalogue monopolisant les ressources), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (comptage des jetons de compression monopolisant les ressources).

### Traitement facultatif du chemin de requête (mémoire, compétences, actualisation des jetons)

L'extraction de la mémoire, l'injection des compétences et l'actualisation des jetons OAuth partagent la **boucle d'événements Node principale** avec `/healthz`. Ce sont des fonctionnalités activables depuis le tableau de bord (`memoryEnabled`, `skillsEnabled`), et non un pool de workers. Consultez [Environnement — coût pour la boucle d'événements](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### État des fournisseurs

> **Aucun point de terminaison REST.** Les données sur l'état des fournisseurs sont disponibles via l'outil MCP `observability_snapshot` ou la page `/dashboard/providers` du tableau de bord.

### Détails du fournisseur

> **Aucun point de terminaison REST.** Les détails de chaque fournisseur sont disponibles via la page `/dashboard/providers` du tableau de bord.

---

## Pilote automatique de santé des fournisseurs

Le module `providerHealthAutopilot.ts` est un **système autoréparateur** qui :

1. Détecte les problèmes des fournisseurs (circuit ouvert, délais de récupération, verrouillages, avertissements de quota)
2. Génère des **actions recommandées** pour les résoudre
3. Peut éventuellement **exécuter automatiquement** les actions à faible risque

### Types de problèmes détectés

| Type de problème             | Gravité       | Exemple de condition                                     |
| ---------------------------- | ------------- | -------------------------------------------------------- |
| `provider_circuit_open`      | critique      | Disjoncteur ouvert après 5 échecs                        |
| `provider_circuit_half_open` | avertissement | Circuit testant la récupération                          |
| `connection_cooldown`        | avertissement | Connexion en délai de récupération après une erreur 429  |
| `stale_connection_error`     | avertissement | Dernière actualisation échouée il y a plus de 30 minutes |
| `terminal_connection_error`  | critique      | Autorisation OAuth révoquée, clé non valide              |
| `inactive_connection`        | information   | Connexion désactivée dans les paramètres                 |
| `model_lockout`              | avertissement | Modèle spécifique en quarantaine                         |
| `quota_monitor_warning`      | avertissement | Utilisation du quota supérieure ou égale à 80 %          |

### Types d’actions générées

| Action                         | Risque | Description                                        |
| ------------------------------ | ------ | -------------------------------------------------- |
| `clear_provider_breaker`       | moyen  | Réinitialiser le disjoncteur à l’état fermé        |
| `clear_connection_cooldown`    | faible | Supprimer le délai de récupération d’une connexion |
| `clear_stale_connection_error` | faible | Effacer l’indicateur d’erreur obsolète             |
| `clear_model_lockout`          | faible | Réactiver un modèle mis en quarantaine             |
| `reactivate_connection`        | moyen  | Réactiver une connexion désactivée                 |
| `deactivate_connection`        | élevé  | Désactiver une connexion problématique             |

### API

> **Aucun point de terminaison REST.** Les problèmes détectés par le pilote automatique sont accessibles via l’outil MCP `observability_snapshot` ou le tableau de bord. Le pilote automatique s’exécute en interne ; son comportement est configuré via la base de données des paramètres (champ `autopilotMode` propre à chaque connexion), et non via des variables d’environnement — une commande `grep -rn` recherchant une variable d’environnement relative au mode du pilote automatique ne renvoie aucun résultat.

### Mode du pilote automatique

Par défaut, le pilote automatique fonctionne en **mode manuel** : il détecte les problèmes et génère des actions recommandées, mais ne les applique pas automatiquement. Les actions peuvent être appliquées via le tableau de bord.

---

## Pilote automatique de santé des combos

`comboHealthAutopilot.ts` est l’équivalent **spécifique aux combos** du pilote automatique des fournisseurs. Il :

- Détecte les combos défaillants
- Recommande de réordonner les cibles
- Suggère de désactiver les cibles défectueuses
- Supprime automatiquement les cibles indisponibles après N échecs

### Exemples de problèmes de combo

```
Combo "always-on" (stratégie de priorité)
├─ Cible 1 : openai/gpt-5 (opérationnelle)
├─ Cible 2 : anthropic/claude-opus-4-6 (⚠️ modèle verrouillé jusqu’à 14:00)
└─ Cible 3 : kiro/claude-sonnet-4-5 (opérationnelle)

Action recommandée : réordonner — déplacer kiro au-dessus d’anthropic jusqu’à l’expiration du verrouillage
```

---

## Moniteurs de quota

`observability.ts` expose des **moniteurs de quota par session** pour les fournisseurs sur abonnement (Claude Code, Codex, GitHub Copilot) :

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Signification des états

| État        | Quand                          | Action de l’interface utilisateur                    |
| ----------- | ------------------------------ | ---------------------------------------------------- |
| `starting`  | Sondage initial en cours       | Indicateur de chargement                             |
| `idle`      | Aucune activité récente        | Masqué dans le tableau de bord                       |
| `healthy`   | Plus de 50 % du quota restant  | Point vert                                           |
| `warning`   | Moins de 50 % du quota restant | Alerte jaune                                         |
| `exhausted` | Quota = 0 %                    | Bloc rouge, acheminement vers le fournisseur suivant |
| `error`     | Échec du sondage               | Point rouge, nouvelle tentative imminente            |

### API

> **Aucun point de terminaison REST.** Les données des moniteurs de quota sont accessibles via l’outil MCP `observability_snapshot` ou le tableau de bord.

---

## Instantané d'observabilité

L'outil MCP `observability_snapshot` renvoie un **instantané complet du système** pour les agents d'IA :

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* voir ci-dessus */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Les agents l'utilisent pour prendre des **décisions de routage** — par exemple, « si le circuit d'openai est ouvert, acheminer d'abord vers anthropic ».

---

## Vérification de l'état des jetons

Les fournisseurs OAuth (Claude Code, GitHub Copilot, Cursor) nécessitent un **rafraîchissement périodique des jetons**. `src/lib/tokenHealthCheck.ts` exécute un planificateur en arrière-plan :

- **Cycle de balayage** : toutes les 60 secondes (balayage défini dans `TICK_MS = 60 * 1000` à `src/lib/tokenHealthCheck.ts:30`)
- **Intervalle de vérification de l'état par connexion** : 60 minutes par défaut (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`) ; configurable via la base de données des paramètres
- **Rafraîchissement préventif en cas de réponse 401** : géré par l'intercepteur propre à chaque connexion

### État des jetons

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Configuration

La configuration de la vérification de l'état des jetons est gérée en interne par `tokenHealthCheck.ts`.

### État des jetons

> **Aucun point de terminaison REST.** Les données relatives à l'état des jetons sont disponibles via le tableau de bord ou l'outil MCP `observability_snapshot`.

---

## Alertes

### Canaux intégrés

OmniRoute prend en charge **3 canaux d'alerte** :

| Canal                       | Configuration    | Cas d'utilisation                |
| --------------------------- | ---------------- | -------------------------------- |
| Bannière du tableau de bord | Toujours activée | Notifications dans l'application |
| Webhook                     | Configurer l'URL | Slack, Discord, PagerDuty        |
| Journal                     | Par défaut       | Agrégation externe des journaux  |

### Configuration des webhooks

> **Remarque :** la configuration des alertes par webhook s'effectue via la page Paramètres du tableau de bord. Consultez l'interface des Paramètres pour configurer l'URL du webhook, le filtrage des événements et la personnalisation de la charge utile.

### Types d'alertes

| Alerte                       | Déclenchement                                                 | Gravité par défaut |
| ---------------------------- | ------------------------------------------------------------- | ------------------ |
| `provider_circuit_open`      | Ouverture du circuit                                          | critique           |
| `provider_circuit_half_open` | Test de récupération du circuit                               | information        |
| `quota_warning`              | Quota utilisé à 80 % ou plus                                  | avertissement      |
| `quota_exhausted`            | Quota utilisé à 100 %                                         | critique           |
| `token_refresh_failed`       | Au moins 3 échecs consécutifs de rafraîchissement             | avertissement      |
| `token_expired`              | Jeton arrivé à expiration                                     | critique           |
| `combo_target_unhealthy`     | Cible combinée en période de récupération depuis au moins 1 h | avertissement      |
| `db_integrity_warning`       | Plus de 0 violation de clé étrangère                          | avertissement      |
| `heap_pressure`              | Utilisation du tas supérieure à 80 % du seuil                 | avertissement      |

---

## Métriques de performance

### Métriques suivies

| Métrique                | Type        | Source                          |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | compteur    | `services/usage.ts`             |
| `request_latency_ms`    | histogramme | `services/usage.ts`             |
| `tokens_consumed`       | compteur    | `services/usage.ts`             |
| `cost_usd`              | compteur    | `services/usage.ts`             |
| `provider_errors`       | compteur    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | compteur    | `services/resilience.ts`        |
| `cache_hits`            | compteur    | `services/signatureCache.ts`    |
| `compression_savings`   | histogramme | `services/compression/stats.ts` |
| `quota_used`            | jauge       | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | jauge       | `observability.ts`              |

### Percentiles de latence (p50/p95/p99)

> **Aucun endpoint REST.** Les données sur les percentiles de latence sont disponibles via la page `/dashboard/health` du tableau de bord. L’export Prometheus/OpenTelemetry est prévu pour la v3.9.

### Export Prometheus / OpenTelemetry (phase 2)

Prévu pour la v3.9 : export natif vers Prometheus, OpenTelemetry et Datadog.

Pour l’instant, interrogez `/api/monitoring/health` avec n’importe quel système de surveillance basé sur HTTP (exportateur blackbox Prometheus, contrôle HTTP Datadog, etc.).

---

## Recettes d’alertes

### Slack

> **Remarque :** Les alertes par webhook sont configurées depuis la page Settings du tableau de bord — il n’existe aucune variable d’environnement dédiée aux webhooks (`grep -rn` ne renvoie aucun résultat). Consultez l’interface Settings pour configurer l’URL du webhook, le filtrage des événements et la personnalisation de la charge utile.

### Discord

> Les alertes par webhook utilisent le même processus de configuration dans l’interface Settings que Slack. Discord accepte la même structure de charge utile JSON.

### PagerDuty

> Les alertes par webhook utilisent le même processus de configuration dans l’interface Settings. Les clés de routage de l’API Events v2 de PagerDuty sont configurées dans l’interface Settings.

### Webhook personnalisé (JSON)

> Tout endpoint HTTP acceptant une requête POST avec un corps JSON fonctionnera. Configurez l’URL dans l’interface Settings.

---

## Configuration du tableau de bord

### Personnaliser le tableau de bord d’état de santé

Créez un fichier `~/.omniroute/dashboard.json` :

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Épingler un fournisseur en haut

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Dépannage

### « Le fournisseur est indiqué comme opérationnel, mais les requêtes échouent »

1. Vérifiez les **problèmes de l’autopilote** — un modèle est peut-être verrouillé
2. Consultez les **erreurs récentes** pour identifier la classe d’erreur concernée
3. Essayez le **test de connexion** dans la carte du fournisseur
4. Vérifiez si le fournisseur applique une **limitation de débit en amont** (non visible localement)

### « Le quota est indiqué comme normal, mais je vois des erreurs 429 »

- Une erreur 429 signifie que le fournisseur indique que vous avez épuisé votre quota
- Le suivi des quotas d’OmniRoute peut être **obsolète** — les données du fournisseur en amont font foi
- Les données de quota sont actualisées automatiquement par le moniteur de quota interne

### « La combinaison échoue, mais toutes les cibles semblent opérationnelles »

- Consultez le tableau de bord de **l’état de santé des combinaisons** pour détecter les problèmes d’ordre des cibles
- Examinez les **événements de repli** — la combinaison épuise peut-être ses options trop rapidement
- Vérifiez que la **stratégie** correspond à votre cas d’utilisation (priorité, tourniquet ou automatique)

### « La vérification de l’état de santé de la base de données échoue »

- Exécutez `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Si le résultat est « ok » — fausse alerte, la vérification de l’état de santé est trop stricte
- Pour tout autre résultat — **arrêtez OmniRoute** et suivez le [guide de reprise après sinistre](./DATABASE_GUIDE.md#disaster-recovery)

### « La pression sur le tas mémoire est critique »

```bash
# Vérifier le tas actuel
node -e "console.log(process.memoryUsage())"

# Déclencher manuellement le ramasse-miettes (si --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Réduire le nombre de requêtes simultanées (à configurer depuis la page Settings du tableau de bord, et non via une variable d’environnement)
# Il n’existe aucune variable d’environnement `MAX_CONCURRENT_REQUESTS` — configurez ce paramètre dans Settings → Concurrency.
```

---

## Voir aussi

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — suivi de l’utilisation et des coûts
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — schéma de la base de données + état
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — état du proxy (cache distinct)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — architecture du système
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — détails du disjoncteur
- Source : `src/lib/monitoring/` (4 fichiers, 2 121 lignes de code)
