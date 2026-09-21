# Authorization Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Fonte autorevole:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute dispone di una pipeline di autorizzazione consapevole delle route che controlla ogni richiesta API. La classificazione è **deterministica** e **fail-closed**: qualsiasi elemento che non possa essere classificato viene considerato `MANAGEMENT` e richiede una sessione o un token di livello gestionale. Questa pagina illustra il modello agli ingegneri che gestiscono le route o progettano nuovi endpoint.

![Pipeline AuthZ (3 classi di route + valutazione delle policy)](../diagrams/exported/authz-pipeline.svg)

> Fonte: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Due modalità di autenticazione

### 1. Chiave API (Bearer)

Utilizzata per le API client compatibili con OpenAI/Anthropic/Gemini e per alcune route di gestione quando la chiave dispone dello scope `manage`.

```
Authorization: Bearer <api-key>
```

Viene convalidata da `isValidApiKey()` / `extractApiKey()` in `src/sse/services/auth.ts` e riesportata tramite `src/shared/utils/apiAuth.ts`. Il validatore accetta anche le variabili d'ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` come chiavi passthrough persistenti (issue #1350).

### 2. Sessione della dashboard (cookie auth_token)

Per le pagine della dashboard e le operazioni amministrative.

```
Cookie: auth_token=<JWT firmato con JWT_SECRET>
```

Un cookie è considerato una sessione solo quando il JWT viene verificato **e** contiene `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Ogni
componente che utilizza il cookie (protezione delle route, rinnovo della pipeline AuthZ, handshake WebSocket, server
live, `/api/settings/require-login`, `/api/auth/status`) passa attraverso tale helper.
Esistono altri JWT firmati con `JWT_SECRET`: il passthrough della CLI di Cursor genera
token `iss "omniroute" / aud "cursor-cli"` per i titolari di chiavi, che non vengono mai considerati sessioni
(#13298).

Viene verificata da `isDashboardSessionAuthenticated()` in `src/shared/utils/apiAuth.ts`. La pipeline rinnova automaticamente il JWT quando restano meno di 7 giorni dei suoi 30 giorni di validità.

Alcune route di gestione accettano **entrambe** le modalità: cookie OPPURE `Bearer <key>` quando la chiave API dispone dello scope `manage` (o `admin`). Questo abilita il flusso di lavoro «configurabile tramite chiamate API» aggiunto nella v3.8.

#### Gate di accesso OIDC opzionale (#6973)

L'accesso amministrativo alla dashboard supporta anche un flusso OIDC (OpenID Connect) **opzionale**
insieme all'accesso predefinito tramite password: l'accesso tramite password non viene mai rimosso,
ma solo affiancato:

- È disabilitato a meno che `settings.oidcEnabled === true` **e** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` siano tutti configurati (Impostazioni → Autenticazione).
  In caso contrario, `GET /api/auth/oidc/login` restituisce `400`.
- `GET /api/auth/oidc/login` rileva l'`authorization_endpoint` dalla
  configurazione `/.well-known/openid-configuration` dell'emittente (con fallback a
  `<issuer>/authorize`), crea l'URI di reindirizzamento a partire dalla richiesta in entrata
  (tenendo conto di `x-forwarded-proto`) e reindirizza all'IdP con uno `state` casuale
  memorizzato in un cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` convalida `state`, scambia il codice di autorizzazione
  e verifica la firma dell'ID token tramite il JWKS dell'emittente
  (`createRemoteJWKSet` di `jose`, memorizzato nella cache per URI JWKS), con controlli
  `issuer`/`audience`. Una allowlist opzionale `oidcAllowedSubjects` verifica la corrispondenza
  con il claim `sub` o con il claim `email` del token; il claim email viene accettato solo quando
  `email_verified === true`, pertanto un indirizzo email non verificato presso l'IdP non può mai superare
  il gate.
- In caso di esito positivo, viene generato **esattamente lo stesso** JWT `auth_token` di 30 giorni emesso
  dall'accesso tramite password (`src/app/api/auth/login/route.ts`), quindi il resto della
  pipeline di sessione della dashboard (rinnovo automatico, flag dei cookie) rimane invariato:
  OIDC sostituisce solo il modo in cui viene generato il cookie, non i privilegi che concede.

## Classi delle route

`src/server/authz/types.ts` definisce tre classi; qualsiasi route che non possa essere classificata in modo deterministico ricade in `MANAGEMENT`.

| Classe       | Descrizione                                                                                                                                                          | Autenticazione richiesta                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Route esplicitamente sicure — accesso, disconnessione, stato, inizializzazione, controllo dello stato, bootstrap dell'onboarding.                                    | Nessuna                                                                      |
| `CLIENT_API` | Endpoint per il serving dei modelli — `/api/v1/*`, `/api/v1beta/*`, oltre agli alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Chiave Bearer quando il feature flag effettivo `REQUIRE_API_KEY` è abilitato |
| `MANAGEMENT` | Pagine della dashboard, impostazioni, provider, chiavi, endpoint di amministrazione e diagnostica.                                                                   | Sessione della dashboard OPPURE Bearer con ambito `manage`                   |

## Pipeline

```
Richiesta in arrivo → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Rimuove gli header interni attendibili (x-omniroute-auth-*, x-omniroute-route-class)
    2. Genera l'ID della richiesta e classifica la route tramite classifyRoute()
    3. Se pathname == "/" → reindirizza a /dashboard
    4. Se è in corso lo svuotamento (arresto controllato) e /api/* → 503
    5. Se il metodo non è GET e il percorso è /api/* → applica il controllo checkBodySize()
    6. Se OPTIONS → preflight CORS 204
    7. Se options.enforce == false → prosegue senza controllo con gli header della classe della route
    8. Altrimenti: POLICIES[routeClass].evaluate(ctx)
       - allow  → imposta x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → errore JSON con correlation_id (pagine della dashboard → 302 /login)
```

Gli header interni attendibili (definiti in `src/server/authz/headers.ts`) vengono **rimossi dalle richieste in arrivo** prima della classificazione: i client non possono precompilare `x-omniroute-auth-*` per impersonare un soggetto.

### Contratti delle policy

Ogni classe di route ha una policy in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — restituisce sempre `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — estrae il token Bearer e lo convalida tramite `validateApiKey()`. Consente l'accesso anonimo solo quando il feature flag effettivo `REQUIRE_API_KEY` è disabilitato. Il flag effettivo viene risolto tramite `isRequireApiKeyEnabled()` (`override del feature flag nel DB > process.env.REQUIRE_API_KEY > valore predefinito`), in modo che i feature flag della dashboard e le variabili d'ambiente regolino in modo coerente `/api/v1/*`, `/api/v1beta/*` e gli alias; in caso di errori del resolver, l'accesso viene negato. Consente le richieste con sessione della dashboard sulle route API client (inclusa `/api/v1/models`, utilizzata dal catalogo dei modelli della dashboard).
- **`managementPolicy`** (`policies/management.ts`) — accetta una sessione della dashboard, le richieste interne di sincronizzazione dei modelli (corrispondenti a `/api/providers/[name]/(sync-models|models)`) oppure ignora completamente il controllo se `isAuthRequired()` restituisce false. Restituisce 403 (`AUTH_001`) quando è presente un token Bearer non valido, altrimenti 401. Applica inoltre i livelli di protezione delle route (LOCAL_ONLY / ALWAYS_PROTECTED) prima di qualsiasi ramo di autenticazione — vedere [Livelli di protezione delle route](../security/ROUTE_GUARD_TIERS.md). I percorsi LOCAL_ONLY in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (attualmente: `/api/mcp/`) possono essere raggiunti da indirizzi non loopback quando la chiave Bearer include l'ambito `manage`; tutti gli altri percorsi LOCAL_ONLY restano limitati rigorosamente al loopback, indipendentemente dall'ambito.

Una policy completata con successo restituisce `AuthSubject` con `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Gli handler downstream possono leggerlo tramite `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts`, anziché rieseguire la logica di autenticazione.

## Elenco delle route pubbliche

`src/shared/constants/publicApiRoutes.ts` è l'allowlist esplicita:

L'elenco è suddiviso per **forma** e questa suddivisione è fondamentale (GHSA-74g9-q8f6-793h): un prefisso viene
confrontato con `startsWith()`, quindi corrisponde anche a ogni percorso adiacente che ne condivide i caratteri iniziali.
Usare `/api/usage/om-usage` come prefisso rendeva PUBBLICO `/api/usage/om-usage<anything>` e Next risolve
quest'ultimo come `/api/usage/[connectionId]`, un handler privo di autenticazione propria.

```ts
// Sottoalberi effettivi. Ogni voce DEVE terminare con "/" (verificato da uno unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // trattato come CLIENT_API in classify, non come pubblico "senza autenticazione"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Route singole, confrontate ESATTAMENTE (con o senza slash finale).
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

// Route singole di sola lettura che beneficiano anche dell'eccezione per l'origine CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Route singola di sola lettura SENZA l'eccezione CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Le route di sola lettura sono pubbliche **solo** per i metodi sicuri. Nota: `classifyRoute()` esclude `/api/v1/*` e `/api/v1beta/*` dal caso residuale PUBLIC: queste route sono sempre `CLIENT_API`, affinché continui ad applicarsi la policy della chiave Bearer.

## Aggiunta di una nuova route

### Modello 1 — Endpoint API client pubblico (autenticazione Bearer)

Le route sotto `/api/v1/` e `/api/v1beta/` vengono classificate automaticamente come `CLIENT_API`. Il middleware applica il controllo Bearer; gli handler delle route non devono ripeterlo, ma possono leggere il soggetto se utile.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logica dell'handler
}
```

### Modello 2 — Endpoint di gestione (sessione oppure Bearer + manage)

Usa `requireManagementAuth()` da `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logica dell'handler
}
```

`requireManagementAuth()` restituisce `null` in caso di successo oppure una `Response` di errore JSON:

- 401 `AUTH_001` "Autenticazione richiesta" — nessuna credenziale presente
- 403 — Bearer non valido **oppure** Bearer presente ma la chiave non dispone dello scope `manage` / `admin`

`hasManageScope(scopes)` restituisce true per `"manage"` o `"admin"`.

### Modello 3 — Aggiunta all'allowlist pubblica

Scegli l'insieme in base alla forma, non alla comodità. Una singola route va inserita in `PUBLIC_API_ROUTES_EXACT` (oppure in `PUBLIC_READONLY_CORS_API_ROUTES` se supporta solo GET); solo un sottoalbero effettivo va inserito in `PUBLIC_API_ROUTE_PREFIXES` e **deve terminare con `/`**. Inserire una singola route nell'elenco dei prefissi rende pubblici anche tutti i percorsi adiacenti che ne condividono i caratteri iniziali, inclusi i percorsi correlati con segmenti dinamici aggiunti in seguito (GHSA-74g9-q8f6-793h). Aggiorna gli unit test in `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` e `tests/unit/authz/classify.test.ts`.

## Ambiti

Le chiavi API contengono un array `scopes` (memorizzato come JSON in `api_keys.scopes`, vedere `src/lib/db/apiKeys.ts`).

### Ambito di gestione

- `manage` / `admin` — concede alla chiave l'accesso agli endpoint dell'API di gestione quando viene inviata come Bearer.

### Ambiti MCP (`src/shared/constants/mcpScopes.ts`)

Ogni strumento MCP richiede ambiti specifici tramite `MCP_TOOL_SCOPES`. Elenco completo (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

L'applicazione degli ambiti in `open-sse/mcp-server/server.ts` passa l'elenco degli ambiti di ogni strumento a
`evaluateToolScopes()` dopo che `resolveCallerScopeContext()` ha risolto gli ambiti dalle informazioni di autenticazione MCP,
dai metadati della richiesta o da `OMNIROUTE_MCP_SCOPES`.

## Opzione di autenticazione obbligatoria

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` stabilisce se per una richiesta debba essere applicata **qualsiasi** forma di autenticazione:

- `settings.requireLogin === false` → l'autenticazione è disabilitata globalmente.
- Nessuna password configurata **e** nessuna variabile di ambiente `INITIAL_PASSWORD` → la modalità bootstrap consente la procedura guidata di configurazione iniziale e le richieste di loopback, ma le richieste provenienti dalla rete esposta richiedono comunque delle credenziali.
- Qualsiasi errore del DB → nega l'accesso per impostazione predefinita (sicurezza predefinita).

L'applicazione delle chiavi API client utilizza `isRequireApiKeyEnabled()` in `src/shared/utils/featureFlags.ts`, anziché leggere direttamente `process.env.REQUIRE_API_KEY`. Questo è importante per le istanze distribuite: modificare `REQUIRE_API_KEY` in Dashboard → Feature Flags memorizza un override nel DB e influisce immediatamente su `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` e sugli altri controlli di autenticazione dell'API client che condividono questo helper. Se l'archivio dei flag di funzionalità non può essere letto, l'autenticazione dell'API client nega l'accesso per impostazione predefinita e richiede una chiave.

## Modifica incompatibile — v3.8.0

Gli endpoint `/api/v1/agents/tasks/*` e `/api/resilience/model-cooldowns` **ora richiedono l'autenticazione di gestione** (commit `588a0333`). I client che in precedenza inviavano una normale chiave API senza l'ambito `manage` ricevono `403`. Migrazione: assegnare alla chiave l'ambito `manage` nella dashboard delle chiavi API oppure utilizzare una sessione autenticata della dashboard.

## Modifica del comportamento — v3.8.2

`/api/mcp/*` (il server MCP remoto) è ancora LOCAL_ONLY per impostazione predefinita, ma ora accetta richieste non di loopback quando l'header `Authorization: Bearer <api-key>` contiene l'ambito `manage`. L'eccezione viene abilitata esplicitamente per ogni percorso tramite `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in `src/server/authz/routeGuard.ts`; il prefisso LOCAL_ONLY correlato `/api/cli-tools/runtime/*` intenzionalmente NON può essere escluso dalla restrizione, poiché può avviare sottoprocessi arbitrari. Le richieste anonime a `/api/mcp/*` provenienti da indirizzi non di loopback continuano a restituire `403 LOCAL_ONLY`: l'impostazione predefinita per qualsiasi nuovo percorso LOCAL_ONLY rimane rigorosamente limitata al loopback. Vedere [Livelli della protezione delle route](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Test

- Test unitari: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Allowlist pubblica: `tests/unit/public-api-routes.test.ts`.
- Esecuzione mirata: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Debug

La pipeline contrassegna sempre le risposte con:

```
x-request-id:               <ID di correlazione, riportato nei corpi degli errori>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Per le richieste autenticate, le intestazioni della richiesta upstream (lato handler) includono anche:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<ultime-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (facoltativo)
x-omniroute-auth-scopes:    elenco separato da virgole
```

Usa `assertAuth(req, expectedClass)` all'interno degli handler: genera un `AuthzAssertionError` con codice `AUTHZ_NOT_INITIALIZED` se il middleware è stato bypassato (utile per individuare regressioni della configurazione nei test).

## Vedi anche

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — indicatore di autenticazione per endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — registro di audit per gli eventi di autenticazione
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — dettagli sull'applicazione degli ambiti MCP
- Sorgente: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
