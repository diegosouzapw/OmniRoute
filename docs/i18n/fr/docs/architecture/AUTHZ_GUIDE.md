# Authorization Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Source de référence :** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute dispose d’un pipeline d’autorisation tenant compte des routes, qui contrôle chaque requête API. La classification est **déterministe** et **fermée par défaut** — tout ce qui ne peut pas être classifié finit dans `MANAGEMENT` et exige une session ou un jeton de niveau gestion. Cette page explique le modèle aux ingénieurs chargés de maintenir les routes ou de concevoir de nouveaux points de terminaison.

![Pipeline AuthZ (3 classes de routes + évaluation des politiques)](../diagrams/exported/authz-pipeline.svg)

> Source : [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Deux modes d’authentification

### 1. Clé API (Bearer)

Utilisée pour les API clientes compatibles avec OpenAI/Anthropic/Gemini et pour quelques routes de gestion lorsque la clé possède la portée `manage`.

```
Authorization: Bearer <api-key>
```

Validée par `isValidApiKey()` / `extractApiKey()` dans `src/sse/services/auth.ts` et réexportée via `src/shared/utils/apiAuth.ts`. Le validateur accepte également les variables d’environnement `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` comme clés de relais persistantes (problème #1350).

### 2. Session du tableau de bord (cookie auth_token)

Pour les pages du tableau de bord et les opérations d’administration.

```
Cookie: auth_token=<JWT signé avec JWT_SECRET>
```

Un cookie est considéré comme une session uniquement lorsque le JWT est vérifié **et** contient `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Chaque
consommateur du cookie (garde de route, actualisation du pipeline AuthZ, négociation WebSocket, serveur
temps réel, `/api/settings/require-login`, `/api/auth/status`) passe par cet utilitaire.
Il existe d’autres JWT signés avec `JWT_SECRET` — le relais de la CLI Cursor émet
des jetons `iss "omniroute" / aud "cursor-cli"` pour les détenteurs de clés — qui ne sont jamais considérés comme des sessions
(#13298).

Vérifiée par `isDashboardSessionAuthenticated()` dans `src/shared/utils/apiAuth.ts`. Le pipeline actualise automatiquement le JWT lorsqu’il lui reste moins de 7 jours sur sa durée de vie de 30 jours.

Certaines routes de gestion acceptent **l’un ou l’autre** mode : cookie OU `Bearer <key>` lorsque la clé API possède la portée `manage` (ou `admin`). C’est ce qui rend possible le flux de travail « configurable par des appels API » ajouté dans la v3.8.

#### Barrière de connexion OIDC facultative (#6973)

La connexion administrateur au tableau de bord prend également en charge un flux OIDC (OpenID Connect) **facultatif**
en complément de la connexion par mot de passe par défaut — la connexion par mot de passe n’est jamais supprimée, seulement
complétée :

- Désactivé sauf si `settings.oidcEnabled === true` **et** si `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` sont tous configurés (Paramètres → Auth).
  `GET /api/auth/oidc/login` renvoie `400` dans le cas contraire.
- `GET /api/auth/oidc/login` découvre le `authorization_endpoint` à partir de
  `/.well-known/openid-configuration` de l’émetteur (avec repli sur
  `<issuer>/authorize`), construit l’URI de redirection à partir de la requête entrante
  (en tenant compte de `x-forwarded-proto`) et redirige vers l’IdP avec un `state`
  aléatoire stocké dans un cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` valide `state`, échange le code d’autorisation
  et vérifie la signature du jeton d’identité au moyen du JWKS de l’émetteur
  (`createRemoteJWKSet` de `jose`, mis en cache par URI JWKS), avec des contrôles `issuer`/`audience`.
  Une liste d’autorisation `oidcAllowedSubjects` facultative vérifie la correspondance avec la revendication
  `sub` ou la revendication `email` du jeton — la revendication d’adresse e-mail n’est prise en compte que lorsque
  `email_verified === true`, de sorte qu’une adresse e-mail non vérifiée auprès de l’IdP ne puisse jamais franchir
  la barrière.
- En cas de succès, il émet **exactement le même** JWT `auth_token` valable 30 jours que celui émis par la connexion
  par mot de passe (`src/app/api/auth/login/route.ts`) ; le reste du
  pipeline de session du tableau de bord (actualisation automatique, attributs du cookie) demeure donc inchangé —
  OIDC remplace uniquement la manière dont le cookie est émis, et non les droits qu’il accorde.

## Classes de routes

`src/server/authz/types.ts` définit trois classes ; toute route qui ne peut pas être classée de manière déterministe utilise par défaut `MANAGEMENT`.

| Classe       | Description                                                                                                                                                                      | Authentification requise                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `PUBLIC`     | Routes explicitement sûres — connexion, déconnexion, état, initialisation, santé, amorçage de l’intégration.                                                                     | Aucune                                                                                  |
| `CLIENT_API` | Points de terminaison de service des modèles — `/api/v1/*`, `/api/v1beta/*`, ainsi que les alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Clé Bearer lorsque l’indicateur de fonctionnalité effectif `REQUIRE_API_KEY` est activé |
| `MANAGEMENT` | Pages du tableau de bord, paramètres, fournisseurs, clés, ainsi que points de terminaison d’administration et de diagnostic.                                                     | Session du tableau de bord OU Bearer avec la portée `manage`                            |

## Pipeline

```
Requête entrante → src/proxy.ts
  → runAuthzPipeline() dans src/server/authz/pipeline.ts
    1. Supprimer les en-têtes internes approuvés (x-omniroute-auth-*, x-omniroute-route-class)
    2. Générer l’identifiant de requête, classifier la route via classifyRoute()
    3. Si pathname == "/" → rediriger vers /dashboard
    4. Si un arrêt progressif est en cours et que la route est /api/* → 503
    5. Si la méthode n’est pas GET et que la route est /api/* → appliquer la protection checkBodySize()
    6. Si OPTIONS → pré-vérification CORS 204
    7. Si options.enforce == false → transmettre avec les en-têtes de classe de route
    8. Sinon : POLICIES[routeClass].evaluate(ctx)
       - autoriser → ajouter x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - rejeter   → erreur JSON avec correlation_id (pages du tableau de bord → 302 /login)
```

Les en-têtes internes approuvés (définis dans `src/server/authz/headers.ts`) sont **supprimés des requêtes entrantes** avant la classification — les clients ne peuvent pas préremplir `x-omniroute-auth-*` pour usurper l’identité d’un sujet.

### Contrats des politiques

Chaque classe de route possède une politique dans `src/server/authz/policies/` :

- **`publicPolicy`** (`policies/public.ts`) — renvoie toujours `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrait le jeton Bearer et le valide via `validateApiKey()`. N’autorise l’accès anonyme que lorsque l’indicateur de fonctionnalité effectif `REQUIRE_API_KEY` est désactivé. L’indicateur effectif est résolu par `isRequireApiKeyEnabled()` (`remplacement par l’indicateur de fonctionnalité de la base de données > process.env.REQUIRE_API_KEY > valeur par défaut`), afin que les indicateurs de fonctionnalité du tableau de bord et les variables d’environnement régissent de manière cohérente `/api/v1/*`, `/api/v1beta/*` et leurs alias ; les échecs du résolveur entraînent un refus par défaut. Autorise les requêtes disposant d’une session du tableau de bord sur les routes de l’API cliente (y compris `/api/v1/models`, utilisée par le catalogue de modèles du tableau de bord).
- **`managementPolicy`** (`policies/management.ts`) — accepte une session du tableau de bord, les requêtes internes de synchronisation des modèles (correspondant à `/api/providers/[name]/(sync-models|models)`), ou ignore entièrement l’authentification si `isAuthRequired()` renvoie false. Renvoie 403 (`AUTH_001`) lorsqu’un jeton Bearer est présent mais invalide, et 401 dans les autres cas. Applique également les niveaux de protection des routes (LOCAL_ONLY / ALWAYS_PROTECTED) avant toute branche d’authentification — consultez [Niveaux de protection des routes](../security/ROUTE_GUARD_TIERS.md). Les chemins LOCAL_ONLY figurant dans `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (actuellement : `/api/mcp/`) peuvent être accessibles depuis une adresse hors boucle locale lorsque la clé Bearer possède la portée `manage` ; tous les autres chemins LOCAL_ONLY restent strictement limités à la boucle locale, quelle que soit la portée.

Une politique réussie renvoie `AuthSubject` avec `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Les gestionnaires en aval peuvent le lire via `assertAuth(request, "CLIENT_API")` dans `src/server/authz/assertAuth.ts` au lieu de réexécuter la logique d’authentification.

## Liste des routes publiques

`src/shared/constants/publicApiRoutes.ts` constitue la liste d’autorisation explicite :

La liste est divisée selon la **forme** des routes, et cette séparation est critique (GHSA-74g9-q8f6-793h) : un préfixe est comparé avec `startsWith()`, il correspond donc également à tous les chemins adjacents qui partagent ses premiers caractères.
Utilisé comme préfixe, `/api/usage/om-usage` rendait `/api/usage/om-usage<anything>` PUBLIC, et Next résout cela vers `/api/usage/[connectionId]` — un gestionnaire ne disposant d’aucune authentification propre.

```ts
// Véritables sous-arborescences. Chaque entrée DOIT se terminer par « / » (vérifié par un test unitaire).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // traité comme CLIENT_API dans classify, et non comme public « sans authentification »
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Routes individuelles, comparées EXACTEMENT (avec ou sans barre oblique finale).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Routes individuelles en lecture seule qui bénéficient également de l’assouplissement de l’origine CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Route individuelle en lecture seule SANS l’assouplissement CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Les routes en lecture seule ne sont publiques **que** pour les méthodes sûres. Remarque : `classifyRoute()` exclut `/api/v1/*` et `/api/v1beta/*` du cas par défaut PUBLIC — celles-ci sont toujours classées `CLIENT_API`, afin que la politique de clé Bearer continue de s’appliquer.

## Ajout d’une nouvelle route

### Modèle 1 — Point de terminaison public de l’API cliente (authentification Bearer)

Les routes sous `/api/v1/` et `/api/v1beta/` sont automatiquement classées `CLIENT_API`. Le middleware applique la vérification Bearer ; les gestionnaires de routes n’ont pas besoin de la répéter, mais peuvent lire le sujet si nécessaire.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logique du gestionnaire
}
```

### Modèle 2 — Point de terminaison de gestion (session ou Bearer + manage)

Utilisez `requireManagementAuth()` depuis `src/lib/api/requireManagementAuth.ts` :

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logique du gestionnaire
}
```

`requireManagementAuth()` renvoie `null` en cas de succès, ou une `Response` d’erreur JSON :

- 401 `AUTH_001` « Authentification requise » — aucun identifiant fourni
- 403 — Bearer non valide **ou** Bearer présent, mais la clé ne possède pas la portée `manage` / `admin`

`hasManageScope(scopes)` renvoie true pour `"manage"` ou `"admin"`.

### Modèle 3 — Ajout à la liste d’autorisation publique

Choisissez l’ensemble en fonction de la forme, et non par commodité. Une route individuelle doit être placée dans `PUBLIC_API_ROUTES_EXACT` (ou dans `PUBLIC_READONLY_CORS_API_ROUTES` si elle accepte uniquement GET) ; seule une véritable sous-arborescence doit être placée dans `PUBLIC_API_ROUTE_PREFIXES`, et elle **doit se terminer par `/`**. Placer une route individuelle dans la liste des préfixes publie également tous les chemins adjacents qui partagent ses premiers caractères — y compris les routes sœurs à segment dynamique ajoutées ultérieurement (GHSA-74g9-q8f6-793h). Mettez à jour les tests unitaires dans `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` et `tests/unit/authz/classify.test.ts`.

## Portées

Les clés d’API comportent un tableau `scopes` (stocké au format JSON dans `api_keys.scopes`, voir `src/lib/db/apiKeys.ts`).

### Portée de gestion

- `manage` / `admin` — accorde à la clé l’accès aux points de terminaison de l’API de gestion lorsqu’elle est transmise comme jeton Bearer.

### Portées MCP (`src/shared/constants/mcpScopes.ts`)

Chaque outil MCP nécessite des portées spécifiques via `MCP_TOOL_SCOPES`. Liste complète (`MCP_SCOPE_LIST`) :

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

L’application des portées dans `open-sse/mcp-server/server.ts` transmet la liste des portées de chaque outil à
`evaluateToolScopes()` après que `resolveCallerScopeContext()` a résolu les portées à partir des informations d’authentification MCP,
des métadonnées de la requête ou de `OMNIROUTE_MCP_SCOPES`.

## Option d’authentification obligatoire

`isAuthRequired()` dans `src/shared/utils/apiAuth.ts` détermine si une authentification **quelconque** est imposée pour une requête :

- `settings.requireLogin === false` → l’authentification est désactivée globalement.
- Aucun mot de passe configuré **et** aucune variable d’environnement `INITIAL_PASSWORD` → le mode d’amorçage autorise l’assistant d’intégration et les requêtes en boucle locale, mais les requêtes exposées sur le réseau nécessitent toujours des identifiants.
- Toute erreur de base de données → verrouillage par défaut (sécurisé par défaut).

L’application des clés d’API clientes utilise `isRequireApiKeyEnabled()` dans `src/shared/utils/featureFlags.ts`, et non une lecture directe de `process.env.REQUIRE_API_KEY`. Cela est important pour les instances déployées : modifier `REQUIRE_API_KEY` dans Dashboard → Feature Flags enregistre une surcharge dans la base de données et affecte immédiatement `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ainsi que les autres contrôles d’authentification de l’API cliente qui partagent cette fonction d’assistance. Si le stockage des indicateurs de fonctionnalité ne peut pas être lu, l’authentification de l’API cliente est verrouillée par défaut et exige une clé.

## Changement incompatible — v3.8.0

Les points de terminaison `/api/v1/agents/tasks/*` et `/api/resilience/model-cooldowns` **nécessitent désormais une authentification de gestion** (commit `588a0333`). Les clients qui envoyaient auparavant une clé d’API normale sans la portée `manage` reçoivent une réponse `403`. Migration : attribuez la portée `manage` à la clé dans le tableau de bord API Keys, ou utilisez une session de tableau de bord authentifiée.

## Changement de comportement — v3.8.2

`/api/mcp/*` (le serveur MCP distant) reste LOCAL_ONLY par défaut, mais accepte désormais les requêtes ne provenant pas de la boucle locale lorsque l’en-tête `Authorization: Bearer <api-key>` comporte la portée `manage`. Cette exception est explicitement contrôlée pour chaque chemin via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` dans `src/server/authz/routeGuard.ts` ; le préfixe LOCAL_ONLY apparenté `/api/cli-tools/runtime/*` ne peut intentionnellement PAS être contourné, car il peut lancer des sous-processus arbitraires. Les requêtes anonymes vers `/api/mcp/*` ne provenant pas de la boucle locale continuent de renvoyer `403 LOCAL_ONLY` — le comportement par défaut de tout nouveau chemin LOCAL_ONLY reste limité strictement à la boucle locale. Voir [Niveaux de protection des routes](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Tests

- Tests unitaires : `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Liste d’autorisation publique : `tests/unit/public-api-routes.test.ts`.
- Exécution ciblée : `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Débogage

Le pipeline ajoute toujours les en-têtes suivants aux réponses :

```
x-request-id:               <identifiant de corrélation, repris dans les corps d’erreur>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Pour les requêtes authentifiées, les en-têtes de requête en amont (côté gestionnaire) incluent également :

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4 derniers caractères> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (facultatif)
x-omniroute-auth-scopes:    liste séparée par des virgules
```

Utilisez `assertAuth(req, expectedClass)` dans les gestionnaires — cette fonction lève une `AuthzAssertionError` avec le code `AUTHZ_NOT_INITIALIZED` si le middleware a été contourné (utile pour détecter les régressions de configuration dans les tests).

## Voir aussi

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marqueur d’authentification par point de terminaison
- [COMPLIANCE.md](../security/COMPLIANCE.md) — journal d’audit des événements d’authentification
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — détails sur l’application des portées MCP
- Source : `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
