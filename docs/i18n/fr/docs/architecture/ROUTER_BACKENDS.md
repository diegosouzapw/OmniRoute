# Router Backends & Embedded Services — architecture contract (ADR) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Statut :** Accepté · **Contexte :** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Contrat :** `domain/routing/routerBackends.ts`
> (registre typé — le code sera intégré avec [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Cet ADR définit précisément les relations entre les moteurs `ts` (natif), `bifrost`, `cliproxy`, `9router` et les moteurs compatibles avec VibeProxy, afin que les contributeurs cessent de confondre deux concepts architecturalement distincts. Il désigne le registre typé introduit par les travaux sur le registre des backends de routage comme source unique de vérité pour ce modèle.

## La distinction fondamentale — deux axes orthogonaux

Le rôle d'un moteur est décrit selon **deux axes indépendants**, encodés conjointement dans le `RouterBackendDefinition` du registre :

1. **Cycle de vie** (`RouterBackendLifecycle`) — _comment le moteur s'exécute_ :
   - `in-process` — s'exécute au sein du processus Node d'OmniRoute (le pipeline TS natif).
   - `supervised` — un processus enfant local qu'OmniRoute installe, démarre, arrête et dont il vérifie l'état via `ServiceSupervisor`, puis qu'il utilise comme connexion de fournisseur.
   - `external` — un point de terminaison HTTP vers lequel OmniRoute distribue les requêtes, mais qu'il ne gère **pas** (configuré à l'aide d'une URL de base définie par une variable d'environnement).
   - `disabled` — enregistré, mais non sélectionnable.
2. **Axe de sélection** (backend de routage du relais) — _si le relais lui transmet les requêtes_ :
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` dans
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

L'erreur à éviter consiste à traiter « service embarqué » et « backend de routage » comme une seule et même liste. Ce n'est pas le cas. Un moteur `supervised` (9router/cliproxy) est une **connexion de fournisseur utilisée par le pipeline natif**, et non un backend alternatif de distribution du relais. `bifrost` est l'inverse : un backend de distribution du relais qui, historiquement, était uniquement `external`.

## Le registre — source unique de vérité

Le contrat `domain/routing/routerBackends.ts` (dont le code sera intégré avec [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) déclare chaque moteur une seule fois, avec son cycle de vie, ses capacités, son identité de service, son port par défaut, sa configuration de contrôle d'état et sa prise en charge de la télémétrie. Les consommateurs recherchent les moteurs via `getRouterBackend(id)`, `listRouterBackends()` et `listRouterBackendsByCapability(cap)`, au lieu de traiter chaque service auxiliaire comme un cas particulier.

| Backend     | Cycle de vie | Service (axe A) | Backend du relais (axe B)  | Contrôle d'état | Port par défaut |
| ----------- | ------------ | --------------- | -------------------------- | --------------- | --------------- |
| `ts`        | `in-process` | —               | `ts` (natif)               | —               | —               |
| `bifrost`   | `external`¹  | —¹              | `bifrost` / `auto`         | `/health`       | —               |
| `cliproxy`  | `supervised` | `cliproxy`      | — (fournisseur)            | `/v1/models`    | 8317            |
| `9router`   | `supervised` | `9router`       | — (fournisseur)            | `/api/health`   | 20130           |
| `vibeproxy` | `external`   | —               | — (adaptateur fournisseur) | `/v1/models`    | —               |

¹ La promotion de Bifrost en service embarqué `supervised` (installable et démarrable depuis `/api/services/bifrost/`) est suivie dans [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) ; jusqu'à son intégration, Bifrost est uniquement `external` (accessible exclusivement via `BIFROST_BASE_URL`).

Les `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) permettent aux appelants de filtrer selon ce qu'un moteur peut réellement faire, plutôt que de coder en dur des branches propres à chaque identifiant.

## Axe A — services intégrés (côté processus supervisé)

- **Registre des processus supervisés :** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (actuellement : `9router`, `cliproxy`).
- **Responsable du cycle de vie :** `src/lib/services/ServiceSupervisor.ts` — `start()` lance le
  processus enfant, attend la validation de `waitForHealthy()`, redirige stdout/stderr vers un tampon circulaire ;
  `stop()` effectue SIGTERM→SIGKILL ; toutes les opérations sont sérialisées à l’aide d’un verrou.
- **Union d’états** (`src/lib/services/types.ts`) :
  `not_installed | stopped | starting | running | stopping | error`, avec en plus un
  `HealthState = healthy | unhealthy | unknown` orthogonal.
- **Pourquoi un processus séparé (et non un SDK intégré au processus) ?** L’isolation des processus permet
  de contrôler indépendamment l’installation, le démarrage, l’arrêt, l’état de santé et les journaux de chaque sidecar, et permet
  l’application de la protection de lancement en boucle locale. La modélisation d’un adaptateur intégré au processus est prévue ultérieurement — l’indicateur de capacité
  `native-hot-path` est l’endroit où cela serait exprimé.

### Contrat des routes de cycle de vie (`/api/services/<tool>/…`)

Les codes de statut sont **spécifiques à l’état, au verbe et au chemin par conception** — il s’agit du contrat, et non
d’une incohérence :

| Appel                        | Condition                             | Statut                                |
| ---------------------------- | ------------------------------------- | ------------------------------------- |
| `POST .../start`             | service `not_installed`               | **409** (précondition)                |
| `POST .../stop`              | déjà arrêté                           | **200** (opération nulle idempotente) |
| `GET .../status`             | OK                                    | **200** (`live ?? row ?? "unknown"`)  |
| `POST .../start`             | échec du lancement                    | **503** (transitoire)                 |
| `GET .../status`, `.../stop` | erreur non interceptée                | **500**                               |
| `GET /api/services/<x>/logs` | outil `<x>` inconnu                   | **404** `Service '<x>' not found`     |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` manquant      | **403** (9router uniquement)          |
| **toute** `/api/services/*`  | appelant hors boucle locale/LAN privé | **403 LOCAL_ONLY**                    |

Tous les corps d’erreur sont structurés par `createErrorResponse()` →
`{ error: { message, type }, requestId }`, où `type` est dérivé du statut
(`500→server_error`, `404→not_found`, `409→conflict`, sinon `invalid_request`) et constitue
le discriminant exploitable par la machine. Les messages sont préalablement assainis
(`sanitizeErrorMessage()`, règle stricte nº 12).

**La protection de la boucle locale** est la source la plus courante d’un `403` : `/api/services/` figure dans
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) et
`src/server/authz/policies/management.ts` rejette tout appelant qui ne provient pas de la boucle locale ou d’un LAN privé
**avant l’authentification**, car ces routes lancent des processus enfants (règles strictes 15
et 17). Y accéder au moyen d’un tunnel public renvoie un `403` par conception.

## Axe B — backend de routage du relais (côté répartition)

Seul le chemin du proxy de relais `/api/v1/relay/chat/completions` sélectionne un backend
de répartition ; l’interface principale `/api/v1/chat/completions` ne consulte jamais
`routingBackend.ts`.

- **Sélection** (`resolveRelayRoutingBackend`) : une seule variable d’environnement globale —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Si elle n’est pas définie, la valeur est `auto` lorsque Bifrost est configuré et activé, sinon `ts`.
- **Comportement :**
  - `bifrost` (forcé) : échec de Bifrost → erreur ferme `502`, sans repli.
  - `auto` : essaie Bifrost puis, en cas d’échec ou de temporisation, bascule silencieusement vers l’implémentation native.
  - `ts` / après repli : le pipeline natif de traduction et d’exécution `open-sse`.
- **Temporisation :** temporisation après échec propre à chaque `baseUrl` dans `bifrostCooldown.ts`.

La sélection fonctionne **en tout ou rien au niveau du relais à l’heure actuelle** — il n’existe aucun changement de moteur
par fournisseur ou par requête dans `release/v3.8.43`. Le filtrage par requête est en cours d’ajout
dans le cadre des travaux sur le manifeste des sidecars
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifeste +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ce qui permet à `auto` d’acheminer via Bifrost uniquement les fournisseurs admissibles selon le manifeste.

## Intégration au tableau de bord

Le tableau de bord des services interroge `GET /api/services/<tool>/status` toutes les 5 s via
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
qui renvoie `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Il n’existe aucun fournisseur partagé de contexte de disponibilité —
chaque composant appelle le hook pour chaque outil. Lorsque `!res.ok`, le hook affiche actuellement
un simple `HTTP <status>` ; l’association du champ `error.type` à une explication compréhensible
constitue une amélioration UX suivie, et non une modification du contrat.

## Conséquences

- Les nouveaux moteurs s’enregistrent une seule fois dans `ROUTER_BACKENDS` ; les consommateurs y accèdent grâce aux requêtes
  de capacités, sans ajouter de nouvelles branches propres à chaque identifiant.
- La question « S’agit-il d’un service ou d’un backend de routage ? » trouve sa réponse dans le champ `lifecycle`, et non
  dans la liste où un identifiant se trouve apparaître.
- La supervision de Bifrost (#5817) et la migration du chemin critique natif (#5670) s’appuient sur ce
  contrat partagé au lieu de traiter chaque side-car comme un cas particulier.
