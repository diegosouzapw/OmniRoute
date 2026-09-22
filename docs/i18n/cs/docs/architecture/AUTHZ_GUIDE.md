# Authorization Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Zdroj pravdy:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute používá autorizační řetězec zohledňující konkrétní trasu, který kontroluje každý požadavek API. Klasifikace je **deterministická** a **ve výchozím stavu zamítavá** — vše, co nelze klasifikovat, skončí jako `MANAGEMENT` a vyžaduje relaci nebo token s oprávněními pro správu. Tato stránka vysvětluje model pro vývojáře, kteří udržují trasy nebo navrhují nové koncové body.

![Autorizační řetězec (3 třídy tras + vyhodnocení zásad)](../diagrams/exported/authz-pipeline.svg)

> Zdroj: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva režimy ověřování

### 1. Klíč API (Bearer)

Používá se pro klientská API kompatibilní s OpenAI/Anthropic/Gemini a pro několik tras správy, pokud má klíč rozsah oprávnění `manage`.

```
Authorization: Bearer <api-key>
```

Ověřuje se pomocí `isValidApiKey()` / `extractApiKey()` v `src/sse/services/auth.ts` a je znovu exportován prostřednictvím `src/shared/utils/apiAuth.ts`. Validátor také přijímá proměnné prostředí `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` jako trvalé průchozí klíče (issue #1350).

### 2. Relace řídicího panelu (cookie auth_token)

Pro stránky řídicího panelu a operace správce.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie představuje relaci pouze tehdy, když je JWT úspěšně ověřen **a** obsahuje `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Každý
spotřebitel této cookie (ochrana tras, obnovení autorizačního řetězce, navázání spojení WebSocket, živý
server, `/api/settings/require-login`, `/api/auth/status`) používá tohoto pomocníka.
Existují i jiné JWT podepsané pomocí `JWT_SECRET` — průchozí mechanismus Cursor CLI vydává
držitelům klíčů tokeny s `iss "omniroute" / aud "cursor-cli"` — ty však nikdy nepředstavují relace
(#13298).

Ověřuje se pomocí `isDashboardSessionAuthenticated()` v `src/shared/utils/apiAuth.ts`. Řetězec automaticky obnoví JWT, pokud do konce jeho 30denní platnosti zbývá méně než 7 dní.

Některé trasy správy přijímají **kterýkoli** režim: cookie NEBO `Bearer <key>`, pokud má klíč API rozsah oprávnění `manage` (nebo `admin`). To umožňuje pracovní postup „konfigurovatelné prostřednictvím volání API“, který byl přidán ve verzi v3.8.

#### Volitelná přihlašovací brána OIDC (#6973)

Přihlášení správce řídicího panelu podporuje vedle výchozího přihlášení heslem také **volitelný** tok OIDC (OpenID Connect) — přihlášení heslem není nikdy odstraněno, pouze
doplněno:

- Je zakázáno, pokud `settings.oidcEnabled !== true` **nebo** nejsou všechny hodnoty `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` nakonfigurovány (Nastavení → Ověřování).
  V opačném případě vrací `GET /api/auth/oidc/login` stav `400`.
- `GET /api/auth/oidc/login` zjistí `authorization_endpoint` z konfigurace
  `/.well-known/openid-configuration` vydavatele (jako záložní možnost použije
  `<issuer>/authorize`), sestaví URI přesměrování z příchozího požadavku
  (s podporou `x-forwarded-proto`) a přesměruje na poskytovatele identity (IdP) s náhodnou hodnotou `state`
  uloženou v cookie `oidc_state` s příznakem `httpOnly`.
- `GET /api/auth/oidc/callback` ověří `state`, vymění autorizační
  kód a ověří podpis tokenu ID prostřednictvím JWKS vydavatele
  (`createRemoteJWKSet` z balíčku `jose`, ukládáno do mezipaměti pro každé URI JWKS) s kontrolami `issuer`/`audience`.
  Volitelný seznam povolených hodnot `oidcAllowedSubjects` porovnává deklaraci `sub`
  tokenu nebo jeho deklaraci `email` — deklarace e-mailu je akceptována pouze tehdy, když
  `email_verified === true`, takže neověřený e-mail u IdP nemůže nikdy projít
  bránou.
- Při úspěchu vytvoří **naprosto stejný** 30denní JWT `auth_token`, jaký vydává přihlášení
  heslem (`src/app/api/auth/login/route.ts`), takže zbytek řetězce relace
  řídicího panelu (automatické obnovení, příznaky cookie) zůstává beze změny —
  OIDC pouze nahrazuje způsob vytvoření cookie, nikoli oprávnění, která cookie uděluje.

## Třídy tras

`src/server/authz/types.ts` definuje tři třídy; každá trasa, kterou nelze deterministicky klasifikovat, se zařadí do `MANAGEMENT`.

| Třída        | Popis                                                                                                                                                            | Vyžadované ověření                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `PUBLIC`     | Explicitně bezpečné trasy — přihlášení, odhlášení, stav, inicializace, kontrola stavu, počáteční nastavení onboardingu.                                          | Žádné                                                                   |
| `CLIENT_API` | Koncové body pro poskytování modelů — `/api/v1/*`, `/api/v1beta/*` a také aliasy `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Klíč Bearer, pokud je aktivní výsledný příznak funkce `REQUIRE_API_KEY` |
| `MANAGEMENT` | Stránky řídicího panelu, nastavení, poskytovatelé, klíče a koncové body pro správu a diagnostiku.                                                                | Relace řídicího panelu NEBO Bearer s rozsahem oprávnění `manage`        |

## Zpracovatelský řetězec

```
Příchozí požadavek → src/proxy.ts
  → runAuthzPipeline() v src/server/authz/pipeline.ts
    1. Odstranění důvěryhodných interních hlaviček (x-omniroute-auth-*, x-omniroute-route-class)
    2. Vygenerování ID požadavku a klasifikace trasy pomocí classifyRoute()
    3. Pokud pathname == "/" → přesměrování na /dashboard
    4. Pokud probíhá ukončování (graceful shutdown) a jde o /api/* → 503
    5. Pokud jde o jiný požadavek než GET na /api/* → kontrola checkBodySize()
    6. Pokud jde o OPTIONS → odpověď CORS preflight 204
    7. Pokud options.enforce == false → předání dál s hlavičkami třídy trasy
    8. Jinak: POLICIES[routeClass].evaluate(ctx)
       - allow  → nastavení x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → chyba JSON s correlation_id (stránky řídicího panelu → 302 /login)
```

Důvěryhodné interní hlavičky (definované v `src/server/authz/headers.ts`) jsou před klasifikací **odstraněny z příchozích požadavků** — klienti nemohou předem nastavit `x-omniroute-auth-*` a vydávat se tak za jiný subjekt.

### Kontrakty zásad

Každá třída tras má zásadu v `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — vždy vrací `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrahuje Bearer a ověřuje jej pomocí `validateApiKey()`. K anonymnímu přístupu přejde pouze tehdy, když je výsledný příznak funkce `REQUIRE_API_KEY` vypnutý. Výsledná hodnota příznaku se určuje prostřednictvím `isRequireApiKeyEnabled()` (`přepsání příznakem funkce v DB > process.env.REQUIRE_API_KEY > výchozí hodnota`), takže příznaky funkcí v řídicím panelu a proměnné prostředí řídí `/api/v1/*`, `/api/v1beta/*` a aliasy konzistentně; při selhání resolveru se přístup zamítne. Umožňuje požadavky s relací řídicího panelu na klientských trasách API (včetně `/api/v1/models`, kterou používá katalog modelů v řídicím panelu).
- **`managementPolicy`** (`policies/management.ts`) — přijímá relaci řídicího panelu nebo interní požadavky na synchronizaci modelů (porovnávané s `/api/providers/[name]/(sync-models|models)`), případně ověřování zcela přeskočí, pokud `isAuthRequired()` vrátí false. Pokud je token Bearer přítomen, ale není platný, vrátí 403 (`AUTH_001`), jinak vrátí 401. Před jakoukoli větví ověřování také vynucuje úrovně ochrany tras (LOCAL_ONLY / ALWAYS_PROTECTED) — viz [Úrovně ochrany tras](../security/ROUTE_GUARD_TIERS.md). Cesty LOCAL_ONLY v `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (aktuálně: `/api/mcp/`) mohou být přístupné z adres mimo loopback, pokud má klíč Bearer rozsah oprávnění `manage`; všechny ostatní cesty LOCAL_ONLY zůstávají omezené výhradně na loopback bez ohledu na rozsah oprávnění.

Úspěšná zásada vrací `AuthSubject` s `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Následné handlery jej mohou načíst pomocí `assertAuth(request, "CLIENT_API")` v `src/server/authz/assertAuth.ts`, aniž by znovu spouštěly logiku ověřování.

## Seznam veřejných tras

`src/shared/constants/publicApiRoutes.ts` je explicitní seznam povolených tras:

Seznam je rozdělen podle **tvaru** a toto rozdělení je zásadní (GHSA-74g9-q8f6-793h): prefix se porovnává pomocí `startsWith()`, takže odpovídá také každé sousední cestě se stejnými počátečními znaky. Prefix `/api/usage/om-usage` označil `/api/usage/om-usage<cokoli>` jako VEŘEJNÉ a Next tuto cestu přeloží na `/api/usage/[connectionId]` — obslužnou rutinu bez vlastního ověřování.

```ts
// Skutečné podstromy. Každá položka MUSÍ končit znakem „/“ (ověřeno jednotkovým testem).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // při klasifikaci se považuje za CLIENT_API, nikoli za veřejnou trasu bez ověřování
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Jednotlivé trasy porovnávané PŘESNĚ (s koncovým lomítkem nebo bez něj).
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

// Jednotlivé trasy pouze pro čtení, na které se vztahuje také zmírnění omezení původu CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Jednotlivá trasa pouze pro čtení BEZ zmírnění omezení CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Trasy pouze pro čtení jsou veřejné **jen** pro bezpečné metody. Poznámka: `classifyRoute()` vylučuje `/api/v1/*` a `/api/v1beta/*` z výchozího zařazení mezi PUBLIC — tyto trasy jsou vždy `CLIENT_API`, takže se na ně nadále vztahují zásady pro Bearer klíče.

## Přidání nové trasy

### Vzor 1 — Veřejný koncový bod klientského API (ověřování Bearer)

Trasy pod `/api/v1/` a `/api/v1beta/` jsou automaticky klasifikovány jako `CLIENT_API`. Middleware vynucuje kontrolu Bearer; obslužné rutiny tras ji nemusejí opakovat, ale mohou v případě potřeby načíst subjekt.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika obslužné rutiny
}
```

### Vzor 2 — Koncový bod pro správu (relace nebo Bearer + oprávnění ke správě)

Použijte `requireManagementAuth()` ze souboru `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika obslužné rutiny
}
```

Při úspěchu vrací `requireManagementAuth()` hodnotu `null`, jinak chybovou odpověď JSON typu `Response`:

- 401 `AUTH_001` „Je vyžadováno ověření“ — nejsou k dispozici žádné přihlašovací údaje
- 403 — neplatný Bearer **nebo** je Bearer přítomen, ale klíč nemá rozsah `manage` / `admin`

`hasManageScope(scopes)` vrací hodnotu true pro `"manage"` nebo `"admin"`.

### Vzor 3 — Přidání do seznamu veřejných tras

Sadu zvolte podle tvaru, nikoli podle pohodlnosti. Jedna trasa patří do `PUBLIC_API_ROUTES_EXACT` (nebo do `PUBLIC_READONLY_CORS_API_ROUTES`, pokud podporuje pouze GET); pouze skutečný podstrom patří do `PUBLIC_API_ROUTE_PREFIXES` a **musí končit znakem `/`**. Vložením jedné trasy do seznamu prefixů zveřejníte také každou sousední cestu se stejnými počátečními znaky — včetně sourozeneckých tras s dynamickými segmenty přidaných později (GHSA-74g9-q8f6-793h). Aktualizujte jednotkové testy v `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` a `tests/unit/authz/classify.test.ts`.

## Rozsahy oprávnění

Klíče API obsahují pole `scopes` (uložené jako JSON v `api_keys.scopes`, viz `src/lib/db/apiKeys.ts`).

### Rozsah oprávnění pro správu

- `manage` / `admin` — uděluje klíči přístup ke koncovým bodům API pro správu, pokud je odeslán jako Bearer.

### Rozsahy oprávnění MCP (`src/shared/constants/mcpScopes.ts`)

Každý nástroj MCP vyžaduje specifické rozsahy oprávnění prostřednictvím `MCP_TOOL_SCOPES`. Úplný seznam (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Vynucování rozsahů oprávnění v `open-sse/mcp-server/server.ts` předává seznam rozsahů každého nástroje do
`evaluateToolScopes()` poté, co `resolveCallerScopeContext()` zjistí rozsahy z ověřovacích údajů MCP,
metadat požadavku nebo `OMNIROUTE_MCP_SCOPES`.

## Přepínač vyžadování ověření

`isAuthRequired()` v `src/shared/utils/apiAuth.ts` určuje, zda je pro požadavek vynucováno **jakékoli** ověření:

- `settings.requireLogin === false` → ověřování je globálně vypnuto.
- Není nakonfigurováno žádné heslo **a zároveň** není nastavena proměnná prostředí `INITIAL_PASSWORD` → režim prvotního nastavení umožňuje průvodce úvodním nastavením a požadavky ze zpětné smyčky, ale požadavky z externí sítě stále vyžadují přihlašovací údaje.
- Jakákoli chyba DB → přístup je zamítnut (ve výchozím nastavení bezpečné chování).

Vynucování klíče API klienta používá `isRequireApiKeyEnabled()` v `src/shared/utils/featureFlags.ts`, nikoli přímé čtení `process.env.REQUIRE_API_KEY`. To je důležité pro nasazené instance: přepnutí `REQUIRE_API_KEY` v Dashboard → Feature Flags uloží přepsání do DB a okamžitě ovlivní `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` a další kontroly ověřování klientského API, které používají tuto pomocnou funkci. Pokud nelze úložiště příznaků funkcí načíst, ověřování klientského API přístup zamítne a vyžaduje klíč.

## Zásadní změna — v3.8.0

Koncové body `/api/v1/agents/tasks/*` a `/api/resilience/model-cooldowns` **nyní vyžadují ověření pro správu** (commit `588a0333`). Klienti, kteří dříve odesílali běžný klíč API bez rozsahu oprávnění `manage`, obdrží `403`. Migrace: buď klíči přidělte rozsah oprávnění `manage` na panelu API Keys, nebo použijte přihlášenou relaci panelu.

## Změna chování — v3.8.2

`/api/mcp/*` (vzdálený server MCP) je ve výchozím nastavení stále LOCAL_ONLY, ale nyní přijímá požadavky mimo zpětnou smyčku, pokud hlavička `Authorization: Bearer <api-key>` obsahuje rozsah oprávnění `manage`. Tato výjimka je explicitně povolována pro jednotlivé cesty prostřednictvím `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` v `src/server/authz/routeGuard.ts`; související prefix LOCAL_ONLY `/api/cli-tools/runtime/*` záměrně nelze obejít, protože může spouštět libovolné podprocesy. Anonymní požadavky na `/api/mcp/*` mimo zpětnou smyčku nadále vracejí `403 LOCAL_ONLY` — výchozí nastavení pro každou novou cestu LOCAL_ONLY nadále striktně vyžaduje zpětnou smyčku. Viz [Úrovně ochrany tras](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testování

- Jednotkové testy: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Veřejný seznam povolených položek: `tests/unit/public-api-routes.test.ts`.
- Spuštění vybraného testu: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Ladění

Pipeline vždy opatří odpovědi následujícími hlavičkami:

```
x-request-id:               <korelační id, zopakované v těle chyby>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

U ověřených požadavků obsahují hlavičky požadavku upstreamu (na straně obslužné rutiny) také:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<poslední 4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (volitelné)
x-omniroute-auth-scopes:    seznam oddělený čárkami
```

Uvnitř obslužných rutin používejte `assertAuth(req, expectedClass)` — pokud byl middleware obejit, vyvolá výjimku `AuthzAssertionError` s kódem `AUTHZ_NOT_INITIALIZED` (užitečné pro odhalování regresí konfigurace v testech).

## Viz také

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — označení autentizace pro jednotlivé koncové body
- [COMPLIANCE.md](../security/COMPLIANCE.md) — protokol auditu událostí autentizace
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — podrobnosti o vynucování rozsahů MCP
- Zdroj: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
