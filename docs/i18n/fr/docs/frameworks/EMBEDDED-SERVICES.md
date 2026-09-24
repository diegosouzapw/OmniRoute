# Embedded Services (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Version :** v3.8.44
> **Dernière mise à jour :** 2026-09-09
> **Public :** ingénieurs ajoutant, assurant la maintenance ou effectuant le débogage de services embarqués (9Router, CLIProxyAPI, Mux, Bifrost, open-wa).

Les services embarqués sont des outils de processus auxiliaires installés localement qu’OmniRoute installe, supervise et
expose comme des cibles de routage de premier ordre. Contrairement aux fournisseurs externes (accessibles via Internet
à l’aide de clés API), les services embarqués s’exécutent sur la même machine qu’OmniRoute et communiquent via l’interface de bouclage.

---

## Table des matières

1. [Vue d’ensemble](#1-overview)
2. [Architecture — 4 couches](#2-architecture--4-layers)
3. [Machine à états du cycle de vie](#3-lifecycle-state-machine)
4. [Référence de l’API](#4-api-reference)
5. [Sécurité](#5-security)
6. [Ajout d’un nouveau service intégré](#6-adding-a-new-embedded-service)
7. [Dépannage](#7-troubleshooting)
8. [FAQ](#8-faq)

---

## 1. Vue d’ensemble

### Pourquoi des services intégrés ?

Six services sont intégrés :

| Service         | Package npm                                   | Port par défaut | Objectif                                                                                                                                                                                                              |
| --------------- | --------------------------------------------- | :-------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                                     |      20130      | Routeur d’IA qu’OmniRoute peut utiliser comme sous-fournisseur. Les modèles sont exposés sous la forme `9router/{sub}/{model}`                                                                                        |
| **CLIProxyAPI** | Binaire de version GitHub (`cliproxy`)        |      8317       | Adaptateur de proxy local pour les flux d’authentification de l’interface en ligne de commande Anthropic. Fournit un routage de secours lorsque les jetons OAuth expirent                                             |
| **Mux**         | `mux` (`mux server` sans interface graphique) |      8322       | Démon local d’orchestration d’agents (coder/mux). Seul son cycle de vie est géré — il ne constitue pas une cible de routage (aucun proxy LLM).                                                                        |
| **Bifrost**     | `@maximhq/bifrost`                            |      8080       | Backend relais de passerelle d’IA en Go. Lorsqu’il est en cours d’exécution, il est automatiquement sélectionné par la route de relais (`/v1/relay/`)                                                                 |
| **Dario**       | `@askalf/dario`                               |      3456       | Proxy d’abonnement Claude — solution de remplacement/secours pour CLIProxyAPI destinée au trafic au format Claude Code ; la clé injectée devient `DARIO_ADMIN_TOKEN` et protège son plan de contrôle OAuth `/admin/*` |
| **open-wa**     | `@open-wa/wa-automate`                        |      8323       | Automatisation de WhatsApp Web (Chromium sans interface graphique via Puppeteer). Seul son cycle de vie est géré — il ne constitue pas une cible de routage.                                                          |

Les six services suivent le même modèle de supervision :

- OmniRoute les installe sous `DATA_DIR/services/{name}/` (isolés du propre fichier `package.json` d’OmniRoute)
- OmniRoute les lance et les surveille en tant que processus enfants
- OmniRoute injecte une clé d’API éphémère dans l’environnement du processus enfant et la renouvelle sans interruption de service (le cas échéant)
- Toutes les routes de gestion (`/api/services/*`) sont **LOCAL_ONLY** — accessibles uniquement depuis l’interface de bouclage (règle stricte nº 17)

### Décisions clés (issues du plan de conception)

| Décision                                                 | Valeur                                                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Accès du tableau de bord à l’interface native de 9Router | Proxy inverse à `/dashboard/providers/services/9router/embed/*`                             |
| Mécanisme d’installation                                 | `npm install {package}` via `execFile` (sans interpolation par le shell)                    |
| Mode d’utilisation                                       | Fournisseur enregistré sous `9router/{sub}/{model}` dans le moteur de routage               |
| Gestion des clés d’API                                   | OmniRoute les génère, les chiffre au repos (AES-256-GCM) et les injecte via l’environnement |
| Emplacement dans le tableau de bord                      | `/dashboard/providers/services` (trois onglets)                                             |
| Démarrage automatique                                    | Option configurable pour chaque service, désactivée par défaut                              |

---

## 2. Architecture — 4 couches

```
┌────────────────────────────────────────────────────────────────────┐
│  Couche 1 — UI                                                     │
│  /dashboard/providers/services  (onglets : CLIProxyAPI | 9Router | Mux)│
│  Journaux en direct (SSE), Démarrer/Arrêter/Redémarrer/Mettre à jour, Paramètres, Installer│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Structure + routage des onglets via ?tab=│
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (fetch Next.js)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Couche 2 — API (LOCAL_ONLY — boucle locale uniquement)            │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (proxy inverse HTTP + WebSocket → service 9Router en amont)     │
│                                                                    │
│  Contrôle : LOCAL_ONLY_API_PREFIXES inclut "/api/services/" et     │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ appels internes au processus
┌──────────────────────▼─────────────────────────────────────────────┐
│  Couche 3 — ServiceSupervisor (src/lib/services/)                  │
│                                                                    │
│  ServiceSupervisor.ts   Superviseur générique (child_process.spawn)│
│    ├── installation : execFile('npm', ['install', pkg, '--prefix']) │
│    ├── démarrage :   spawn(node, [entrypoint], {env, cwd})         │
│    ├── clé d’API :   crypto.randomBytes(32) → env NINEROUTER_API_KEY│
│    ├── port :        20130 pour 9Router (configurable)             │
│    ├── journaux :    tampon circulaire stdio de 5 MB → événements SSE│
│    ├── santé :       HTTP GET /health toutes les 2 à 5 s, récupération différée│
│    └── cycle de vie : SIGTERM 15 s → SIGKILL                       │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Initialise tous les SERVICES[] au démarrage du processus│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       GET /v1/models périodique → table service_models│
│  ringBuffer.ts      Tampon circulaire de journaux (5 MB par service)│
│  healthCheck.ts     Sonde d’intégrité HTTP par interrogation       │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (adaptateurs d’installation)                  │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP compatible OpenAI (boucle locale)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Couche 4 — Fournisseur / Routage                                  │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Recherche à nouveau le port et la clé d’API à chaque requête (sans cache).│
│    Retire le préfixe "9router/" de l’identifiant du modèle avant le transfert.│
│    Renvoie 503 service_not_running si le superviseur n’est pas à l’état "running".│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entrée pour "9router" : isEmbeddedService: true                 │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modèles stockés sous la forme "9router/{sub}/{model}" (préfixés).│
│    Synchronisés toutes les 5 min par modelSync.ts.                 │
│                                                                    │
│  Mux est UNIQUEMENT géré pour son cycle de vie (couches 1 à 3) —  │
│  il s’agit d’un démon d’orchestration d’agents, et non d’un proxy  │
│  LLM ; il ne possède donc aucune entrée d’exécuteur/fournisseur de │
│  couche 4 et n’est jamais une cible de routage.                    │
└────────────────────────────────────────────────────────────────────┘
```

### Fichiers sources principaux

| Fichier                                     | Rôle                                                               |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `src/lib/services/ServiceSupervisor.ts`     | Classe principale : cycle de vie, verrou, santé, tampon circulaire |
| `src/lib/services/bootstrap.ts`             | Enregistrement au niveau du processus et démarrage automatique     |
| `src/lib/services/registry.ts`              | Map singleton `outil → superviseur`                                |
| `src/lib/services/apiKey.ts`                | Génération de clés, chiffrement AES-256-GCM au repos               |
| `src/lib/services/modelSync.ts`             | Synchronisation périodique des modèles (5 min) + à la demande      |
| `src/lib/services/ringBuffer.ts`            | Tampon circulaire de journaux de 5 Mo avec abonnement SSE          |
| `src/lib/services/healthCheck.ts`           | Sonde de santé HTTP (intervalle configurable)                      |
| `src/lib/services/installers/ninerouter.ts` | Installation/mise à jour/désinstallation npm de 9Router            |
| `src/lib/services/installers/cliproxy.ts`   | Installation/mise à jour/désinstallation npm de CLIProxyAPI        |
| `src/lib/services/installers/mux.ts`        | Installation/mise à jour/désinstallation npm de Mux                |
| `src/lib/services/installers/openwa.ts`     | Installation/mise à jour/désinstallation npm de open-wa            |
| `src/app/api/services/9router/_lib.ts`      | Fonction utilitaire `getOrInitSupervisor()`                        |
| `src/app/api/services/[name]/logs/route.ts` | Point de terminaison partagé pour les journaux SSE                 |
| `open-sse/executors/ninerouter.ts`          | Exécuteur de fournisseur (couche 4)                                |

---

## 3. Machine à états du cycle de vie

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
              sonde de santé OK    │         crash / SIGTERM    │
                               ┌────▼─────┐  (arrêt sous 5 s)   │
                               │ running  │──── crash ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Les états sont stockés dans la table `version_manager` de la base de données (colonne `status`) et répliqués
dans l'état en mémoire de `ServiceSupervisor`. L'état en mémoire fait autorité pour
un processus en cours d'exécution ; l'état de la base de données constitue la solution de repli persistante au démarrage.

### Transitions d'état

| Depuis          | Événement                                | Vers                   |
| --------------- | ---------------------------------------- | ---------------------- |
| `not_installed` | réussite de `install()`                  | `stopped`              |
| `stopped`       | appel de `start()`                       | `starting`             |
| `starting`      | la sonde de santé renvoie 200            | `running`              |
| `starting`      | arrêt du processus avant qu'il soit sain | `error`                |
| `running`       | appel de `stop()`                        | `stopping` → `stopped` |
| `running`       | arrêt inattendu du processus (< 5 s)     | `error` (crash rapide) |
| `running`       | arrêt inattendu du processus (> 5 s)     | `error`                |
| `error`         | appel de `start()`                       | `starting`             |
| tout état       | `stop()` pendant `stopping`              | aucune opération       |

### Verrou d'opération

`ServiceSupervisor` sérialise les opérations du cycle de vie au moyen d'un verrou d'opération asynchrone
(`withLock()`). Des appels concurrents à `start()` sur le même superviseur entraînent exactement
un lancement de processus ; le second appelant attend et renvoie l'état existant. Cela évite
les conditions de concurrence lorsque, par exemple, le démarrage automatique et un bouton de l'interface utilisateur sont déclenchés simultanément.

---

## 4. Référence de l'API

Toutes les routes sous `/api/services/` sont **LOCAL_ONLY** (bouclage uniquement, règle stricte n° 17).
Les requêtes ne provenant pas de l'interface de bouclage reçoivent `403 LOCAL_ONLY`, quel que soit le jeton d'authentification.

### 4.1 Points de terminaison de 9Router (11 routes)

#### `POST /api/services/9router/install`

Installe 9Router depuis npm. Crée `DATA_DIR/services/9router/` avec ses propres
`package.json` et `node_modules/`. N'entre pas en conflit avec les dépendances d'OmniRoute.

**Corps de la requête** (tous les champs sont facultatifs) :

```json
{ "version": "latest" }
```

| Champ     | Type     | Valeur par défaut | Description                              |
| --------- | -------- | ----------------- | ---------------------------------------- |
| `version` | `string` | `"latest"`        | Tag de version npm ou semver à installer |

**Réponses :**

| Statut | Description                                                                     |
| ------ | ------------------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                          |
| `400`  | Corps de requête non valide (échec de validation Zod)                           |
| `409`  | Installation déjà en cours (verrou détenu)                                      |
| `500`  | Échec de l'installation npm — voir `message` pour un message d'erreur explicite |

**Remarques :** utilise `execFile('npm', [...])` — aucun shell, aucune interpolation (règle stricte n° 13).
Les erreurs EACCES sont présentées sous forme de messages explicites.

---

#### `POST /api/services/9router/start`

Démarre 9Router. Enregistre un superviseur s'il ne l'est pas déjà, puis appelle
`supervisor.start()`. Idempotent si le service est déjà en cours d'exécution.

**Corps de la requête :** aucun

**Réponses :**

| Statut | Description                                                 |
| ------ | ----------------------------------------------------------- |
| `200`  | Objet `ServiceStatus` (voir le schéma ci-dessous)           |
| `409`  | 9Router n'est pas installé (`status: "not_installed"`)      |
| `503`  | Échec du démarrage (erreur de processus — voir `lastError`) |

**Schéma ServiceStatus :**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Arrête 9Router proprement. Envoie SIGTERM, attend 15 s, puis envoie SIGKILL si le processus est toujours actif.
Idempotent si le service est déjà arrêté.

**Corps de la requête :** aucun

**Réponses :**

| Statut | Description                        |
| ------ | ---------------------------------- |
| `200`  | `ServiceStatus` (state: "stopped") |
| `503`  | Échec inattendu de l'arrêt         |

---

#### `POST /api/services/9router/restart`

Équivaut à `stop()` puis `start()` sous le verrou d'opération.

**Corps de la requête :** aucun

**Réponses :** identiques à celles de `start` (renvoie le `ServiceStatus` final).

---

#### `POST /api/services/9router/update`

Met à jour 9Router vers une version npm plus récente. Si le service est en cours d'exécution, il est d'abord
arrêté, l'installation npm est exécutée (la version plus récente étant installée sur place), puis le
service est redémarré.

**Corps de la requête** (tous les champs sont facultatifs) :

```json
{ "version": "latest" }
```

**Réponses :**

| Statut | Description                                                     |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Corps non valide                                                |
| `500`  | Échec de la mise à jour npm                                     |

---

#### `POST /api/services/9router/rotate-key`

Génère une nouvelle clé d'API pour 9Router, la chiffre au repos et redémarre le service
(s'il est en cours d'exécution) afin qu'il récupère la nouvelle clé depuis son environnement. L'ancienne clé est
immédiatement invalidée.

**Corps de la requête :** aucun

**Réponses :**

| Statut | Description                                |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Échec de la rotation                       |

**Sécurité :** la nouvelle clé n'est jamais renvoyée dans la réponse (aucune fuite d'identifiants).
Elle est stockée sous forme chiffrée (AES-256-GCM) dans la table `version_manager`.

---

#### `GET /api/services/9router/status`

Renvoie l'état combiné en temps réel et en base de données, notamment les métadonnées de version et un aperçu de la clé d'API.

**Réponses :**

| Statut | Description                   |
| ------ | ----------------------------- |
| `200`  | Voir le schéma ci-dessous     |
| `500`  | Échec de la lecture de l'état |

**Schéma de la réponse :**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Active ou désactive l'option de démarrage automatique. Lorsque `enabled: true`, le service démarre automatiquement
au prochain démarrage d'OmniRoute (si le service est installé).

**Corps de la requête :**

```json
{ "enabled": true }
```

**Réponses :**

| Statut | Description           |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Corps non valide      |

---

#### `GET /api/services/9router/logs`

Flux SSE des journaux en temps réel provenant du tampon circulaire stdout/stderr de 9Router.

**Paramètres de requête :**

| Paramètre | Type      | Valeur par défaut | Description                                                                     |
| --------- | --------- | ----------------- | ------------------------------------------------------------------------------- |
| `tail`    | `integer` | 200               | Nombre de lignes historiques à envoyer en premier (maximum 1000)                |
| `filter`  | `string`  | aucun             | Filtre de sous-chaîne insensible à la casse (sans regex — protégé contre ReDoS) |

**Événements SSE :**

| Événement   | Données     | Description                              |
| ----------- | ----------- | ---------------------------------------- |
| `snapshot`  | `LogLine[]` | Fin initiale de l'historique             |
| `log`       | `LogLine`   | Ligne de journal en temps réel           |
| `heartbeat` | `{}`        | Maintien de la connexion toutes les 15 s |

**Schéma LogLine :**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Réponses :**

| Statut | Description                                      |
| ------ | ------------------------------------------------ |
| `200`  | `text/event-stream`                              |
| `400`  | Paramètre `filter` trop long (> 200 caractères)  |
| `404`  | Service introuvable (superviseur non enregistré) |

---

### 4.2 Points de terminaison CLIProxyAPI (10 routes)

CLIProxyAPI possède la même structure de points de terminaison que 9Router, sans `rotate-key`, mais avec
`accounts`, `provider-expose` et `auto-restart-adopted`. Il reçoit désormais une
clé API dédiée au plan de données, injectée lors du lancement (`needsApiKey: true` dans
`bootstrap.ts`, utilisée pour la synchronisation des modèles) ; `status` contient moins de champs.

| Méthode | Chemin                              | Description                                    |
| ------- | ----------------------------------- | ---------------------------------------------- |
| `POST`  | `/api/services/cliproxy/install`    | Installer CLIProxyAPI depuis npm               |
| `POST`  | `/api/services/cliproxy/start`      | Démarrer CLIProxyAPI                           |
| `POST`  | `/api/services/cliproxy/stop`       | Arrêter CLIProxyAPI                            |
| `POST`  | `/api/services/cliproxy/restart`    | Redémarrer CLIProxyAPI                         |
| `POST`  | `/api/services/cliproxy/update`     | Mettre à jour vers une version plus récente    |
| `GET`   | `/api/services/cliproxy/status`     | État en direct + BDD (sans `apiKeyMasked`)     |
| `POST`  | `/api/services/cliproxy/auto-start` | Activer ou désactiver le démarrage automatique |

Le point de terminaison partagé `GET /api/services/{name}/logs` (voir §4.1) fonctionne pour les
quatre services grâce au segment dynamique `[name]`.

---

### 4.3 Points de terminaison Mux (8 routes)

Mux possède la même structure de points de terminaison que CLIProxyAPI — aucune route `rotate-key` dans la surface
de l'API (le jeton bearer est généré de la même manière que celui de 9Router via
`getOrCreateApiKey("mux")` et injecté au moyen de la variable d'environnement `MUX_SERVER_AUTH_TOKEN`, mais
il n'existe pas encore de point de terminaison dédié à sa rotation). Seul le cycle de vie de Mux est géré : contrairement à
9Router, il ne possède aucun exécuteur de couche 4 et n'est jamais enregistré comme fournisseur de routage.

| Méthode | Chemin                         | Description                                     |
| ------- | ------------------------------ | ----------------------------------------------- |
| `POST`  | `/api/services/mux/install`    | Installer Mux depuis npm (`npm i mux`)          |
| `POST`  | `/api/services/mux/start`      | Démarrer Mux (`mux server`)                     |
| `POST`  | `/api/services/mux/stop`       | Arrêter Mux                                     |
| `POST`  | `/api/services/mux/restart`    | Redémarrer Mux                                  |
| `POST`  | `/api/services/mux/update`     | Mettre à jour vers une version npm plus récente |
| `GET`   | `/api/services/mux/status`     | État en direct + BDD                            |
| `POST`  | `/api/services/mux/auto-start` | Activer ou désactiver le démarrage automatique  |

---

### 4.4 Points de terminaison Bifrost (8 routes)

Bifrost est un backend relais de passerelle d'IA en Go (`@maximhq/bifrost`). Il utilise la même
structure de points de terminaison que CLIProxyAPI (sans `rotate-key` — Bifrost gère ses propres clés de
fournisseurs dans `config.json`, sous son `-app-dir`).

| Méthode | Chemin                             | Description                                                                |
| ------- | ---------------------------------- | -------------------------------------------------------------------------- |
| `POST`  | `/api/services/bifrost/install`    | Installer Bifrost depuis npm (`@maximhq/bifrost`)                          |
| `POST`  | `/api/services/bifrost/start`      | Démarrer Bifrost sur le port 8080 (par défaut)                             |
| `POST`  | `/api/services/bifrost/stop`       | Arrêter Bifrost                                                            |
| `POST`  | `/api/services/bifrost/restart`    | Redémarrer Bifrost                                                         |
| `POST`  | `/api/services/bifrost/update`     | Mettre à jour vers une version plus récente                                |
| `GET`   | `/api/services/bifrost/status`     | État en direct + BDD                                                       |
| `POST`  | `/api/services/bifrost/auto-start` | Activer ou désactiver le démarrage automatique                             |
| `GET`   | `/api/services/bifrost/logs`       | Suivi des journaux par SSE (via la route dynamique partagée `[name]/logs`) |

**Configuration du routage :** Lorsque `BIFROST_BASE_URL` n'est pas défini et que l'instance Bifrost
supervisée est en cours d'exécution, `getBifrostRoutingConfig()` (dans `routingBackend.ts`) utilise automatiquement
`http://127.0.0.1:{port}` comme URL de base du relais. Une variable d'environnement `BIFROST_BASE_URL` explicite
est toujours prioritaire.

---

### 4.5 Points de terminaison Dario (12 routes)

Même structure de cycle de vie que les autres services (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`), avec en plus un plan de contrôle OAuth
protégé par jeton sous `admin/` : `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (tous protégés par `DARIO_ADMIN_TOKEN`).

### 4.6 Points de terminaison open-wa (7 routes)

open-wa (`@open-wa/wa-automate`) pilote une instance Chromium sans interface graphique (via
Puppeteer) afin d'automatiser WhatsApp Web. Il utilise la même structure de points de terminaison que Mux (aucune
route `rotate-key` pour le moment). Seul son cycle de vie est géré — ce n'est pas une cible de routage,
et il ne possède aucune entrée d'exécuteur/fournisseur de couche 4.

| Méthode | Chemin                            | Description                                                       |
| ------- | --------------------------------- | ----------------------------------------------------------------- |
| `POST`  | `/api/services/openwa/install`    | Installer open-wa depuis npm (`@open-wa/wa-automate`)             |
| `POST`  | `/api/services/openwa/start`      | Démarrer open-wa sur le port 8323 (par défaut)                    |
| `POST`  | `/api/services/openwa/stop`       | Arrêter open-wa                                                   |
| `POST`  | `/api/services/openwa/restart`    | Redémarrer open-wa                                                |
| `POST`  | `/api/services/openwa/update`     | Mettre à jour vers une version plus récente                       |
| `GET`   | `/api/services/openwa/status`     | État en temps réel + état de la base de données                   |
| `POST`  | `/api/services/openwa/auto-start` | Activer ou désactiver le démarrage automatique                    |
| `GET`   | `/api/services/openwa/logs`       | Suivi des journaux via SSE (par la route dynamique `[name]/logs`) |

**Clé d'API :** injectée sous la forme `WA_KEY` — la substitution générique des variables
d'environnement préfixées par `WA_*` d'open-wa l'associe à l'option CLI `--key`/`-k`
(`dist/cli/setup.js::envArgs()`, vérifié avec le package 4.76.0 installé).
Préfixée par `ow_` lorsqu'elle est générée par `generateServiceApiKey()`. open-wa
lit la clé depuis un en-tête HTTP `key`/`api_key` (et non `Authorization:
Bearer`) ; `/api-docs*` est explicitement exempté de cette vérification
(`setupAuthenticationLayer` dans `dist/cli/server.js`), la sonde d'intégrité
ne nécessite donc aucun en-tête d'authentification.

**Appairage :** open-wa n'est ni officiel ni affilié à WhatsApp — le
numéro connecté présente un risque de bannissement lié à la détection des automatisations
par WhatsApp. Lors du premier démarrage, le code QR d'appairage est affiché sur stdout et
rendu accessible via le panneau de journaux et le flux SSE existants — cette intégration
ne dispose pas encore d'un endpoint dédié pour l'image du code QR.

---

### 4.7 Proxy inverse (intégration du tableau de bord 9Router)

Le tableau de bord intègre l'interface Web de 9Router dans une iframe par l'intermédiaire
d'un proxy inverse interne accessible à l'adresse suivante :

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Ce proxy :

- Transmet la requête à `http://127.0.0.1:{port}/{path}` (boucle locale uniquement)
- Supprime les en-têtes entrants `cookie` et `authorization` (aucune fuite de la session OmniRoute)
- Injecte `Authorization: Bearer {apiKey}` pour l'authentification auprès de 9Router
- Supprime `set-cookie`, `content-security-policy`, `x-frame-options` et `cross-origin-*` de la réponse
- Réécrit les réponses HTML pour injecter `<base href>` et normaliser les chemins absolus (`/foo` → `/dashboard/.../embed/foo`)

Les mises à niveau WebSocket du tableau de bord intégré sont gérées par un serveur compagnon sur
un port dédié (voir `src/lib/services/embedWsProxy.ts`).

**Sécurité :** Les routes du proxy d'intégration sont classées sous `LOCAL_ONLY_API_PREFIXES`
et ne sont accessibles que depuis la boucle locale. Un attaquant qui obtient un JWT via un
tunnel Cloudflare/Ngrok ne peut pas utiliser le proxy pour accéder aux services intégrés.

---

## 5. Sécurité

### Application de LOCAL_ONLY (règle stricte nº 17)

Toutes les routes sous `/api/services/` et `/dashboard/providers/services/*/embed/` sont
classées LOCAL_ONLY dans `src/server/authz/routeGuard.ts`. La vérification de l’adresse
de bouclage s’exécute systématiquement avant toute branche d’authentification :

```
la requête arrive
  → isLocalOnlyPath(path)?
      → hors bouclage → 403 LOCAL_ONLY (toujours, avant la vérification d’authentification)
      → bouclage      → poursuit vers l’authentification normale
```

Cela empêche un JWT divulgué (par exemple, via un tunnel) de déclencher `npm install` ou
le lancement de processus. Consultez `docs/security/ROUTE_GUARD_TIERS.md` pour connaître
la matrice complète des niveaux.

### Injection de clé API

9Router et Mux nécessitent une clé API/un jeton bearer pour leurs propres points de terminaison HTTP.
OmniRoute :

1. Génère une clé via `crypto.randomBytes(32).toString("base64url")` avec un
   préfixe propre au service (`nr_` pour 9Router, `mx_` pour Mux).
2. La chiffre au repos à l’aide d’AES-256-GCM (le même algorithme de chiffrement que celui utilisé pour les identifiants des fournisseurs).
3. La déchiffre et l’injecte comme variable d’environnement au moment du lancement —
   `NINEROUTER_API_KEY` pour 9Router, `MUX_SERVER_AUTH_TOKEN` pour Mux (jamais comme option CLI,
   afin que le jeton n’apparaisse jamais dans `ps`/les listes de processus).
4. Ne renvoie jamais la clé en texte clair dans une réponse HTTP.

CLIProxyAPI reçoit une clé dédiée au plan de données, injectée au lancement
(`needsApiKey: true` — utilisée pour la synchronisation des modèles avec l’adaptateur).

### Protection contre les SSRF

Le proxy HTTP inverse (`/dashboard/.../embed/[...path]`) est codé en dur pour transmettre
les requêtes uniquement à `http://127.0.0.1:{port}`. Il ne suit jamais les redirections
vers des destinations hors bouclage. La bibliothèque `ssrf-req-filter` est utilisée pour
rejeter toute URL en amont qui se résout en dehors de la plage de bouclage.

### Sécurité du shell (règle stricte nº 13)

`npm install` est invoqué via `execFile('npm', ['install', pkg, '--prefix', dir])` —
sans littéraux de gabarit, sans shell et sans interpolation de chemins externes dans la chaîne
de commande. Les valeurs d’exécution (ports, clés API) sont transmises via l’objet `env`
du processus enfant.

### Assainissement des erreurs (règle stricte nº 12)

Toutes les réponses d’erreur provenant de `/api/services/*` passent par `buildErrorBody()` ou
`sanitizeErrorMessage()`. Les valeurs brutes de `err.stack` et `err.message` ne sont jamais
renvoyées telles quelles à l’appelant.

---

## 6. Ajout d’un nouveau service intégré

Suivez ces 8 étapes. Consultez les implémentations existantes dans `src/lib/services/installers/`
et `src/app/api/services/` comme références canoniques.

### Étape 1 — Créer le programme d’installation

Créez `src/lib/services/installers/{name}.ts` sur le modèle de `ninerouter.ts` :

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // choisissez un port libre

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Utilisez `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` depuis `installers/utils.ts`
— jamais `execSync` ni d’interpolation shell.

### Étape 2 — Enregistrer dans l’amorçage

Ajoutez une entrée `ServiceEntry` au tableau `SERVICES` dans `src/lib/services/bootstrap.ts` :

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false si aucune clé API n’est nécessaire
}
```

Étendez `buildSpawnArgsFactory()` pour prendre en charge `cfg.tool === "myservice"`.

#### Contrat extensible de plug-in de fournisseur (Phase 1, nº 7333)

`src/lib/services/providerPlugins/` introduit un contrat `ServiceProviderPlugin` qui
regroupe les champs `ServiceEntry` du fichier `bootstrap.ts` d’un backend et les champs
du modèle de manifeste de `serviceBackends.ts` dans un seul objet, au lieu d’exprimer
séparément la structure du même backend dans deux fichiers sans lien. À ce jour, **seul `9router` a
été migré** — `bootstrap.ts` dérive son entrée `SERVICES[]` de
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`),
en levant une erreur au démarrage si le plug-in venait à manquer. `cliproxy`, `mux` et `bifrost`
conservent sans modification les littéraux `SERVICES[]` en ligne préexistants.

`open-sse/config/providerPluginManifest.ts` a également reçu une fonction auxiliaire additive
`createServiceBackendManifestEntry(pluginId, template)` qui construit une entrée
`ProviderPluginManifestEntry` correctement formée à partir d’une entrée `SERVICE_BACKEND_MANIFEST_TEMPLATE` — elle
n’est **pas** encore intégrée à un chemin de requête actif (ni `generateProviderPluginManifestFromRegistry()`
ni `/v1/providers/[provider]/models`) ; cela reste à faire ultérieurement, une fois le contrat
validé pour un deuxième backend.

Les éléments suivants sont reportés à des PR ultérieures et suivis dans l’issue nº 7333 : migrer `cliproxyapi` via le
même registre, généraliser `mux`/`bifrost` dans l’union `ServiceBackendPluginId`,
intégrer au contrat de plug-in les cas particuliers de routage des exécuteurs (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) et connecter
`createServiceBackendManifestEntry()` à un chemin actif du code de manifeste/modèles.

### Étape 3 — Ajouter la migration et les données initiales de la base de données

Assurez-vous que le service dispose d’une ligne dans `version_manager` au moyen d’une migration dans
`src/lib/db/migrations/`. La ligne doit contenir :

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Étape 4 — Créer les 7 points de terminaison API

Sous `src/app/api/services/{name}/` :

```
_lib.ts            fonction auxiliaire getOrInitSupervisor()
install/route.ts   POST — appelle installer.install()
start/route.ts     POST — appelle supervisor.start()
stop/route.ts      POST — appelle supervisor.stop()
restart/route.ts   POST — appelle supervisor.restart()
update/route.ts    POST — appelle installer.update()
status/route.ts    GET  — fusionne l’état en direct et celui de la base de données
auto-start/route.ts POST — bascule l’indicateur auto_start
```

La route partagée `GET /api/services/[name]/logs` est déjà câblée — aucune modification
n’y est nécessaire.

Déléguez toutes les réponses d’erreur à `createErrorResponse()` / `buildErrorBody()`.

### Étape 5 — Ajouter à LOCAL_ONLY_API_PREFIXES

Dans `src/server/authz/routeGuard.ts`, vérifiez que `/api/services/` est déjà répertorié.
Si vous introduisez un nouveau préfixe (par exemple, `/api/tools/`), ajoutez-le à la fois à
`LOCAL_ONLY_API_PREFIXES` et, s’il lance des processus, à `SPAWN_CAPABLE_PREFIXES`.
Ajoutez un test dans `tests/unit/authz/routeGuard.test.ts`.

### Étape 6 — Ajouter l’onglet d’interface utilisateur

Créez `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Réutilisez les composants partagés :

- `ServiceStatusCard` — état en temps réel + badge d’intégrité
- `ServiceLifecycleButtons` — Démarrer / Arrêter / Redémarrer / Mettre à jour
- `ServiceLogsPanel` — suivi des journaux via SSE (se connecte à `/api/services/{name}/logs`)
- `ApiKeyCard` — affichage + rotation de la clé (si `needsApiKey: true`)

Enregistrez l’onglet dans `ServicesPageShell.tsx`.

### Étape 7 — Ajouter l’entrée de fournisseur (si le service est une cible de routage)

Si le service intégré expose un endpoint `/v1/chat/completions` compatible avec OpenAI :

1. Ajoutez une entrée de fournisseur dans `src/shared/constants/providers.ts` avec `isEmbeddedService: true`.
2. Créez `open-sse/executors/{name}.ts` en étendant `BaseExecutor`. Recherchez à nouveau le port et
   la clé API pour chaque requête (ne les mettez jamais en cache dans le constructeur). Retournez une
   réponse `503 service_not_running` lorsque l’état du superviseur n’est pas `"running"`.
3. Enregistrez les modèles dans `open-sse/config/providerRegistry.ts` avec le préfixe du service
   (par exemple, `myservice/sub/model`). `modelSync.ts` les maintiendra à jour.

### Étape 8 — Documenter et tester

1. Mettez à jour `docs/frameworks/EMBEDDED-SERVICES.md` (ce fichier) — ajoutez le service au
   tableau de la §1 et tout nouvel endpoint à la §4.
2. Ajoutez des tests unitaires dans `tests/unit/services/` (cycle de vie, programme d’installation, forme de l’API).
3. Ajoutez un test d’intégration dans `tests/integration/services/` (conditionné par `RUN_SERVICES_INT=1`).
4. Mettez à jour `docs/openapi.yaml` avec les nouveaux endpoints.

---

## 7. Dépannage

### Le service ne démarre pas

**Symptômes :** Le bouton de démarrage renvoie 503, l’état reste à `"error"` ou `"starting"`.

**Liste de vérification :**

1. Consultez `GET /api/services/{name}/logs` (ou le panneau Logs dans le tableau de bord). Recherchez
   des lignes telles que `Error: ENOENT`, `address already in use` ou `Cannot find module`.
2. Vérifiez que `npm` se trouve dans le PATH : exécutez `which npm` depuis le même compte utilisateur que celui qui exécute OmniRoute.
3. Vérifiez que le service est installé : consultez `GET /api/services/{name}/status` pour
   connaître `installedVersion`. Si sa valeur est `null`, lancez d’abord l’installation.
4. Vérifiez que `DATA_DIR/services/{name}/node_modules/` existe et n’est pas vide.
5. Consultez le champ `lastError` dans la réponse d’état pour connaître la raison de l’arrêt expurgée.

---

### Le démarrage à froid est lent (> 10 s pour atteindre `running`)

**Symptômes :** L’état reste à `"starting"` pendant longtemps avant de passer à `"running"` ou `"error"`.

**Explication :** Le démarrage à froid de 9Router comprend l’importation de vastes arborescences de dépendances (modules DNS,
tunnel et MITM). L’intervalle de vérification de l’état par défaut est de 2 s, avec 3 tentatives avant que le
superviseur ne déclare un dépassement de délai (tout en poursuivant les vérifications).

**Solution :** Les délais `healthIntervalMs` et `waitForHealthy`
(`healthIntervalMs * 3`) sont configurables dans `bootstrap.ts`. Pour les services dont le
démarrage prend plus de temps, augmentez `healthIntervalMs` à 5000 et `stopTimeoutMs` à 30 000.

---

### Conflit de port (`EADDRINUSE`)

**Symptômes :** Les journaux affichent `address already in use :::20130`.

**Causes :**

- Un autre processus utilise déjà le port 20130.
- Un processus 9Router précédent n’a pas été complètement arrêté (PID zombie).

**Solution :**

1. Modifiez le port par défaut à l’aide de la variable d’environnement `NINEROUTER_PORT` dans `.env`.
2. Recherchez et arrêtez le processus en conflit : `lsof -ti :20130 | xargs kill -9`.
3. Le port est configurable pour chaque service dans `bootstrap.ts` via le champ `port`.

**Remarque :** 9Router utilise par défaut le port 20130 afin d’éviter spécifiquement tout conflit avec
le port par défaut 20128 d’OmniRoute.

---

### Permission refusée (EACCES) lors de l’installation

**Symptômes :** L’installation renvoie 500, les journaux affichent `EACCES` ou `permission denied`.

**Causes :**

- `DATA_DIR` ou son répertoire parent n’est pas accessible en écriture par le processus OmniRoute.
- L’exécution s’effectue dans Docker sans privilèges root et sans accès en écriture au volume monté.

**Solution :**

1. Vérifiez `DATA_DIR` (valeur par défaut : `~/.omniroute/`) : `ls -la ~/.omniroute/`
2. Assurez-vous que l’utilisateur du processus OmniRoute est propriétaire du répertoire : `chown -R $USER ~/.omniroute/`
3. Dans Docker, assurez-vous que le montage du volume dispose des autorisations appropriées pour l’utilisateur du conteneur.

---

### Échec de la mise à jour (dépassement de délai de `npm install` ou erreur réseau)

**Symptômes :** La mise à jour renvoie 500 avec `InstallError`, les journaux affichent un dépassement de délai réseau.

**Liste de vérification :**

1. Vérifiez que le registre npm est accessible : `npm ping`.
2. Vérifiez la présence d’un proxy d’entreprise : `npm config get proxy`, `npm config get https-proxy`.
3. Essayez l’installation manuellement : `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Dans un environnement isolé d’Internet, téléchargez l’archive tar au préalable et utilisez `npm install /path/to/tarball.tgz`.

---

### Le service affiche immédiatement l’état `"error"` après son démarrage (arrêt brutal rapide)

**Symptômes :** L’état passe de `"starting"` à `"error"` en moins de 5 secondes.
`lastError` affiche `"Fast crash (exited with code 1)"`.

**Liste de vérification :**

1. Lisez l’intégralité de la fin du journal : `GET /api/services/{name}/logs?tail=500`.
2. Cause fréquente : des variables d’environnement attendues par le service sont manquantes.
3. Pour 9Router : vérifiez que `NINEROUTER_DISABLE_MITM=true` et
   `NINEROUTER_DISABLE_TUNNEL=true` figurent dans l’environnement transmis lors de la création du processus (voir
   `resolveSpawnArgs` dans `installers/ninerouter.ts`).

---

## 8. FAQ

**Q : Puis-je exposer les endpoints des services intégrés à des clients hors loopback ?**

Non. Le niveau LOCAL_ONLY est intentionnel (règle stricte nº 17). Les routes pouvant invoquer
`npm install` ou générer des processus `node` ne doivent pas être accessibles depuis du trafic
hors loopback, car un JWT divulgué via un tunnel (Cloudflare, Ngrok, Tailscale)
permettrait autrement de générer arbitrairement des processus. Il n’existe aucune dérogation
pour `/api/services/` — contrairement à `/api/mcp/`, ce chemin est exclu de la liste
de contournement par la portée de gestion. Consultez `docs/security/ROUTE_GUARD_TIERS.md`.

---

**Q : 9Router et CLIProxyAPI seront-ils disponibles dans les déploiements en production/cloud ?**

Oui. Les deux services suivent le même modèle privilégiant l’exécution locale qu’OmniRoute. Ils s’exécutent
sur la même machine et communiquent via loopback. Ici, « production » désigne le VPS
ou le serveur local sur lequel OmniRoute est déployé, et non un fournisseur cloud distant.

---

**Q : Comment déboguer le superviseur ?**

1. Suivez le flux de journaux SSE : `curl -N http://localhost:20128/api/services/9router/logs`.
2. Consultez les journaux structurés dans la sortie pino d’OmniRoute, filtrés selon
   l’espace de noms `service:supervisor`.
3. Inspectez la ligne de la base de données : `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Utilisez `GET /api/services/9router/status` pour voir en un seul appel l’état actuel en temps réel, le PID, l’état de santé
   et `lastError`.

---

**Q : Le superviseur affiche `health: "degraded"` ou `health: "unknown"`, mais l’état est `"running"`. Est-ce un problème ?**

`"degraded"` signifie que la sonde de santé a renvoyé une réponse autre que 200. `"unknown"` signifie qu’aucune
sonde ne s’est encore terminée (course avec la première interrogation). Ces deux états sont transitoires pendant le démarrage.
Si l’état de santé reste `"degraded"` pendant plus de `healthIntervalMs * 3` ms après
`"running"`, le service intégré est en cours d’exécution, mais son API HTTP ne répond pas. Vérifiez
si le port est correct dans la réponse d’état et si le service écoute effectivement
sur ce port.

---

**Q : Puis-je modifier la clé API de 9Router sans redémarrage complet ?**

Non. La clé API est transmise à 9Router via une variable d’environnement lors du lancement du processus.
Les variables d’environnement ne peuvent pas être modifiées dans un processus en cours d’exécution. `POST .../rotate-key`
arrête et redémarre automatiquement le service afin d’appliquer la nouvelle clé. La rotation de la clé
prend effet dans un délai correspondant au `stopTimeoutMs` du service (15 s par défaut), auquel s’ajoute son temps
de démarrage.

---

**Q : Quelle est la limite du tampon circulaire et que se passe-t-il lorsqu’il est plein ?**

Chaque service dispose d’un tampon circulaire dédié de 5 Mo. Lorsque le tampon est plein, les lignes
de journal les plus anciennes sont supprimées pour laisser de la place aux nouvelles. L’événement SSE `snapshot` renvoie
les lignes les plus récentes dans la limite définie par `tail`. Les journaux ne sont pas conservés sur disque, sauf si
`logsBufferPath` est défini dans la ligne de la base de données.

---

## Voir aussi

- `docs/security/ROUTE_GUARD_TIERS.md` — détails du niveau LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 correspondance du module Services intégrés
- `docs/architecture/ARCHITECTURE.md` — contexte au niveau du système
- `docs/openapi.yaml` — définitions des endpoints lisibles par machine
- `CLAUDE.md` §« Ajout d’un nouveau service intégré » — liste de contrôle de référence rapide
