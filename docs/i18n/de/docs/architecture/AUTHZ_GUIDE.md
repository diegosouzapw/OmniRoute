# Authorization Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Maßgebliche Quelle:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Zuletzt aktualisiert:** 2026-09-22 — Scope-Namespaces verweisen auf MCP-SERVER.md

OmniRoute verfügt über eine routenabhängige Autorisierungspipeline, die jede API-Anfrage absichert. Die Klassifizierung ist **deterministisch** und erfolgt nach dem **Fail-Closed-Prinzip** — alles, was nicht klassifiziert werden kann, wird als `MANAGEMENT` eingestuft und erfordert eine Sitzung oder ein Token mit Berechtigungen auf Management-Ebene. Diese Seite erläutert das Modell für Entwickler, die Routen verwalten oder neue Endpunkte entwerfen.

![Autorisierungspipeline (3 Routenklassen + Richtlinienauswertung)](../diagrams/exported/authz-pipeline.svg)

> Quelle: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Zwei Authentifizierungsmodi

### 1. API-Schlüssel (Bearer)

Wird für die OpenAI-/Anthropic-/Gemini-kompatiblen Client-APIs und einige Verwaltungsrouten verwendet, wenn der Schlüssel über den Geltungsbereich `manage` verfügt.

```
Authorization: Bearer <api-key>
```

Die Validierung erfolgt durch `isValidApiKey()` / `extractApiKey()` in `src/sse/services/auth.ts`; beide werden über `src/shared/utils/apiAuth.ts` erneut exportiert. Der Validator akzeptiert außerdem die Umgebungsvariablen `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` als persistente Passthrough-Schlüssel (Issue #1350).

### 2. Dashboard-Sitzung (auth_token-Cookie)

Für Dashboard-Seiten und administrative Vorgänge.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Ein Cookie gilt nur dann als Sitzung, wenn das JWT erfolgreich verifiziert wurde **und** `authenticated: true` enthält (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Jeder Nutzer des Cookies (Routen-Guard, Aktualisierung der AuthZ-Pipeline, WebSocket-Handshake, Live-Server, `/api/settings/require-login`, `/api/auth/status`) verwendet diesen Helper. Es existieren weitere mit `JWT_SECRET` signierte JWTs — der Cursor-CLI-Passthrough stellt für Schlüsselinhaber Token mit `iss "omniroute" / aud "cursor-cli"` aus — diese gelten jedoch niemals als Sitzungen (#13298).

Die Verifizierung erfolgt durch `isDashboardSessionAuthenticated()` in `src/shared/utils/apiAuth.ts`. Die Pipeline aktualisiert das JWT automatisch, wenn von seiner 30-tägigen Gültigkeitsdauer weniger als 7 Tage verbleiben.

Einige Verwaltungsrouten akzeptieren **beide** Modi: Cookie ODER `Bearer <key>`, wenn der API-Schlüssel über den Geltungsbereich `manage` (oder `admin`) verfügt. Dies ermöglicht den in v3.8 hinzugefügten Arbeitsablauf „über API-Aufrufe konfigurierbar“.

#### Optionales OIDC-Anmelde-Gate (#6973)

Die Dashboard-Admin-Anmeldung unterstützt neben der standardmäßigen Passwortanmeldung außerdem einen **optional aktivierbaren** OIDC-Flow (OpenID Connect) — die Passwortanmeldung wird niemals entfernt, sondern lediglich ergänzt:

- Deaktiviert, sofern nicht `settings.oidcEnabled === true` gilt **und** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` vollständig konfiguriert sind (Einstellungen → Authentifizierung). Andernfalls gibt `GET /api/auth/oidc/login` den Status `400` zurück.
- `GET /api/auth/oidc/login` ermittelt den `authorization_endpoint` aus der `/.well-known/openid-configuration` des Ausstellers (mit Rückgriff auf `<issuer>/authorize`), erstellt den Umleitungs-URI anhand der eingehenden Anfrage (unter Berücksichtigung von `x-forwarded-proto`) und leitet mit einem zufälligen `state`, der in einem `httpOnly`-Cookie namens `oidc_state` gespeichert ist, zum IdP um.
- `GET /api/auth/oidc/callback` validiert `state`, tauscht den Autorisierungscode aus und verifiziert die Signatur des ID-Tokens anhand des JWKS des Ausstellers (`createRemoteJWKSet` von `jose`, pro JWKS-URI zwischengespeichert), einschließlich der Prüfungen von `issuer`/`audience`. Eine optionale Positivliste `oidcAllowedSubjects` gleicht den `sub`-Claim oder den `email`-Claim des Tokens ab — der E-Mail-Claim wird nur berücksichtigt, wenn `email_verified === true` gilt, sodass eine beim IdP nicht verifizierte E-Mail-Adresse das Gate niemals passieren kann.
- Bei Erfolg stellt der Flow **exakt dasselbe** 30 Tage gültige `auth_token`-JWT aus wie die Passwortanmeldung (`src/app/api/auth/login/route.ts`), sodass die übrige Dashboard-Sitzungspipeline (automatische Aktualisierung, Cookie-Flags) unverändert bleibt — OIDC ersetzt lediglich die Art und Weise, wie das Cookie ausgestellt wird, nicht die damit gewährten Berechtigungen.

## Routenklassen

`src/server/authz/types.ts` definiert drei Klassen; jede Route, die nicht deterministisch klassifiziert werden kann, fällt auf `MANAGEMENT` zurück.

| Klasse       | Beschreibung                                                                                                                                                       | Authentifizierung erforderlich                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `PUBLIC`     | Explizit sichere Routen — Anmeldung, Abmeldung, Status, Initialisierung, Systemzustand, Onboarding-Bootstrap.                                                      | Keine                                                                       |
| `CLIENT_API` | Endpunkte zur Modellbereitstellung — `/api/v1/*`, `/api/v1beta/*` sowie die Aliase `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-Key, wenn das effektive Feature-Flag `REQUIRE_API_KEY` aktiviert ist |
| `MANAGEMENT` | Dashboard-Seiten, Einstellungen, Anbieter, Schlüssel sowie Admin- und Diagnoseendpunkte.                                                                           | Dashboard-Sitzung ODER Bearer mit `manage`-Scope                            |

## Pipeline

```
Eingehende Anfrage → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Vertrauenswürdige interne Header entfernen (x-omniroute-auth-*, x-omniroute-route-class)
    2. Anfrage-ID generieren, Route über classifyRoute() klassifizieren
    3. Wenn pathname == "/" → Weiterleitung zu /dashboard
    4. Wenn im Entleerungsmodus (kontrolliertes Herunterfahren) und /api/* → 503
    5. Wenn nicht-GET /api/* → checkBodySize()-Schutz prüfen
    6. Wenn OPTIONS → CORS-Preflight 204
    7. Wenn options.enforce == false → unverändert mit Routenklassen-Headern weiterleiten
    8. Andernfalls: POLICIES[routeClass].evaluate(ctx)
       - zulassen   → x-omniroute-auth-{kind,id,label,scopes} setzen → NextResponse.next()
       - ablehnen   → JSON-Fehler mit correlation_id (Dashboard-Seiten → 302 /login)
```

Vertrauenswürdige interne Header (definiert in `src/server/authz/headers.ts`) werden **vor der Klassifizierung aus eingehenden Anfragen entfernt** — Clients können `x-omniroute-auth-*` nicht vorab setzen, um sich als ein Subjekt auszugeben.

### Policy-Verträge

Jede Routenklasse besitzt eine Policy in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — gibt immer `allow({ kind: "anonymous", id: "anonymous" })` zurück.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrahiert Bearer und validiert ihn über `validateApiKey()`. Fällt nur dann auf anonymen Zugriff zurück, wenn das effektive Feature-Flag `REQUIRE_API_KEY` deaktiviert ist. Das effektive Flag wird über `isRequireApiKeyEnabled()` ermittelt (`DB-Feature-Flag-Überschreibung > process.env.REQUIRE_API_KEY > Standardwert`), sodass Dashboard-Feature-Flags und Umgebungsvariablen `/api/v1/*`, `/api/v1beta/*` und Aliase konsistent steuern; Fehler bei der Ermittlung führen zur Ablehnung. Erlaubt Anfragen mit Dashboard-Sitzung auf Client-API-Routen (einschließlich `/api/v1/models`, das vom Dashboard-Modellkatalog verwendet wird).
- **`managementPolicy`** (`policies/management.ts`) — akzeptiert Dashboard-Sitzungen und interne Modell-Synchronisierungsanfragen (abgeglichen mit `/api/providers/[name]/(sync-models|models)`) oder überspringt die Prüfung vollständig, wenn `isAuthRequired()` false zurückgibt. Gibt 403 (`AUTH_001`) zurück, wenn ein Bearer-Token vorhanden, aber ungültig ist, andernfalls 401. Erzwingt außerdem vor jedem Authentifizierungszweig die Routenwächter-Stufen (LOCAL_ONLY / ALWAYS_PROTECTED) — siehe [Routenwächter-Stufen](../security/ROUTE_GUARD_TIERS.md). Auf LOCAL_ONLY-Pfade in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (derzeit: `/api/mcp/`) kann von Nicht-Loopback-Adressen aus zugegriffen werden, wenn der Bearer-Key den `manage`-Scope besitzt; alle anderen LOCAL_ONLY-Pfade bleiben unabhängig vom Scope strikt auf Loopback beschränkt.

Eine erfolgreiche Policy gibt ein `AuthSubject` mit `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` zurück. Nachgelagerte Handler können es über `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts` auslesen, anstatt die Authentifizierungslogik erneut auszuführen.

## Liste öffentlicher Routen

`src/shared/constants/publicApiRoutes.ts` ist die explizite Positivliste:

Die Liste ist nach **Form** aufgeteilt, und diese Aufteilung ist sicherheitskritisch (GHSA-74g9-q8f6-793h): Ein Präfix wird mit `startsWith()` abgeglichen und stimmt daher auch mit jedem benachbarten Pfad überein, der dieselben führenden Zeichen aufweist.
`/api/usage/om-usage` als Präfix machte `/api/usage/om-usage<anything>` ÖFFENTLICH, und Next löst dies zu `/api/usage/[connectionId]` auf — einem Handler ohne eigene Authentifizierung.

```ts
// Echte Unterbäume. Jeder Eintrag MUSS mit "/" enden (durch einen Unit-Test sichergestellt).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // wird in classify als CLIENT_API behandelt, nicht als „öffentlich ohne Authentifizierung“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Einzelne Routen, die EXAKT abgeglichen werden (mit oder ohne abschließenden Schrägstrich).
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

// Schreibgeschützte Einzelrouten, für die auch die CORS-Origin-Beschränkung gelockert wird.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Schreibgeschützte Einzelroute OHNE Lockerung der CORS-Beschränkung.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Schreibgeschützte Routen sind **nur** für sichere Methoden öffentlich. Hinweis: `classifyRoute()` schließt `/api/v1/*` und `/api/v1beta/*` vom PUBLIC-Fallback aus — diese werden immer als `CLIENT_API` klassifiziert, sodass die Richtlinie für Bearer-Schlüssel weiterhin gilt.

## Hinzufügen einer neuen Route

### Muster 1 — Öffentlicher Client-API-Endpunkt (Bearer-Authentifizierung)

Routen unter `/api/v1/` und `/api/v1beta/` werden automatisch als `CLIENT_API` klassifiziert. Die Middleware erzwingt die Bearer-Prüfung; Routen-Handler müssen sie nicht erneut durchführen, können bei Bedarf jedoch das Subjekt auslesen.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... Handler-Logik
}
```

### Muster 2 — Verwaltungsendpunkt (Sitzung oder Bearer + manage)

Verwenden Sie `requireManagementAuth()` aus `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... Handler-Logik
}
```

`requireManagementAuth()` gibt bei Erfolg `null` zurück, andernfalls eine JSON-Fehler-`Response`:

- 401 `AUTH_001` „Authentifizierung erforderlich“ — keinerlei Anmeldedaten vorhanden
- 403 — ungültiger Bearer **oder** Bearer vorhanden, aber dem Schlüssel fehlt der Scope `manage` / `admin`

`hasManageScope(scopes)` gibt für `"manage"` oder `"admin"` true zurück.

### Muster 3 — Hinzufügen zur öffentlichen Positivliste

Wählen Sie die Menge anhand der Form aus, nicht nach Bequemlichkeit. Eine einzelne Route gehört in `PUBLIC_API_ROUTES_EXACT` (oder bei ausschließlich per GET aufrufbaren Routen in `PUBLIC_READONLY_CORS_API_ROUTES`); nur ein echter Unterbaum gehört in `PUBLIC_API_ROUTE_PREFIXES`, und er **muss mit `/` enden**. Wird eine einzelne Route in die Präfixliste aufgenommen, werden dadurch auch alle benachbarten Pfade veröffentlicht, die dieselben führenden Zeichen aufweisen — einschließlich später hinzugefügter Geschwister mit dynamischen Segmenten (GHSA-74g9-q8f6-793h). Aktualisieren Sie die Unit-Tests unter `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` und `tests/unit/authz/classify.test.ts`.

## Scopes

Drei Namensräume. Jede Prüfung liest nur ihre eigenen Zeichenfolgen. Die Gegenüberstellung,
einschließlich der Gründe, warum `manage` bei `scopeMatches` für `read:compression` fehlschlägt und warum ein
`read`-Zugriffstoken `PATCH /api/keys/{id}` nicht aufrufen kann, finden Sie unter
[Drei Scope-Namensräume](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API-Schlüssel enthalten ein `scopes`-Array (als JSON in `api_keys.scopes` gespeichert, siehe `src/lib/db/apiKeys.ts`).

### Verwaltungs-Scope

- `manage` / `admin` — `hasManageScope`. Bearer-Zugriff auf Routen der Verwaltungs-API.
- `mcp:connect`, `self:usage`, `self:account-quota` und
  `policy:bypass-provider-quota` sind additive Scopes mit exakter Übereinstimmung. Sie liegen
  außerhalb von `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` öffnet nur die
  Nicht-Loopback-Ausnahme für `/api/mcp/`.

### MCP-Tool-Scopes

Katalog und Abgleichregeln (identische Zeichenfolge oder ein gewährter Scope, der mit `*` endet):
[MCP-Tool-Scopes](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` in `src/shared/constants/mcpScopes.ts` ist die ursprüngliche typisierte
Teilmenge, nicht der vollständige Katalog. Die Durchsetzung erfolgt in
`open-sse/mcp-server/scopeEnforcement.ts`, nachdem `resolveCallerScopeContext()`
die Scopes aus MCP-Authentifizierungsinformationen, Anfragemetadaten oder `OMNIROUTE_MCP_SCOPES`
ermittelt hat. Sie bleibt deaktiviert, sofern nicht `OMNIROUTE_MCP_ENFORCE_SCOPES=true` gesetzt ist.

### Zugriffstoken-Scopes

`read` / `write` / `admin` für `oma_live_…`-Token, eingestuft durch `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Diese Rangfolge gilt nur für die Zugriffstoken-
Anmeldeinformationen. Siehe [Verwaltungsauthentifizierung](../guides/MANAGEMENT-AUTH.md).

## Umschalter für erforderliche Authentifizierung

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` entscheidet, ob für eine Anfrage **irgendeine** Authentifizierung erzwungen wird:

- `settings.requireLogin === false` → die Authentifizierung ist global deaktiviert.
- Kein Passwort konfiguriert **und** keine Umgebungsvariable `INITIAL_PASSWORD` → der Bootstrap-Modus erlaubt den Onboarding-Assistenten und Loopback-Anfragen, aber über das Netzwerk erreichbare Anfragen benötigen weiterhin Anmeldedaten.
- Jeder DB-Fehler → schlägt geschlossen fehl (standardmäßig sicher).

Die Durchsetzung von Client-API-Schlüsseln verwendet `isRequireApiKeyEnabled()` in `src/shared/utils/featureFlags.ts` und liest nicht direkt `process.env.REQUIRE_API_KEY`. Dies ist für bereitgestellte Instanzen relevant: Das Umschalten von `REQUIRE_API_KEY` unter Dashboard → Feature Flags speichert eine DB-Überschreibung und wirkt sich sofort auf `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` sowie andere Client-API-Authentifizierungsprüfungen aus, die diese Hilfsfunktion verwenden. Wenn der Feature-Flag-Speicher nicht gelesen werden kann, schlägt die Client-API-Authentifizierung geschlossen fehl und erfordert einen Schlüssel.

## Inkompatible Änderung — v3.8.0

Die Endpunkte `/api/v1/agents/tasks/*` und `/api/resilience/model-cooldowns` **erfordern jetzt eine Management-Authentifizierung** (Commit `588a0333`). Clients, die bisher einen normalen API-Schlüssel ohne den Scope `manage` gesendet haben, erhalten `403`. Migration: Weisen Sie dem Schlüssel entweder im API Keys Dashboard den Scope `manage` zu oder verwenden Sie eine angemeldete Dashboard-Sitzung.

## Verhaltensänderung — v3.8.2

`/api/mcp/*` (der Remote-MCP-Server) ist standardmäßig weiterhin LOCAL_ONLY, akzeptiert nun jedoch Nicht-Loopback-Anfragen, wenn der Header `Authorization: Bearer <api-key>` den Scope `manage` enthält. Die Ausnahme wird explizit pro Pfad über `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in `src/server/authz/routeGuard.ts` gesteuert; das verwandte LOCAL_ONLY-Präfix `/api/cli-tools/runtime/*` kann absichtlich NICHT umgangen werden, da es beliebige Unterprozesse starten kann. Anonyme Anfragen aus Nicht-Loopback-Quellen an `/api/mcp/*` erhalten weiterhin `403 LOCAL_ONLY` — für jeden neuen LOCAL_ONLY-Pfad gilt standardmäßig weiterhin die strikte Beschränkung auf Loopback. Siehe [Route-Guard-Stufen](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Tests

- Unit-Tests: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Öffentliche Positivliste: `tests/unit/public-api-routes.test.ts`.
- Gezielt ausführen: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Debugging

Die Pipeline versieht Antworten immer mit:

```
x-request-id:               <Korrelations-ID, wird in Fehlerantworten wiedergegeben>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Bei authentifizierten Anfragen enthalten die Upstream-Anfrage-Header (auf Handler-Seite) außerdem:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<letzte 4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    kommagetrennte Liste
```

Verwenden Sie `assertAuth(req, expectedClass)` innerhalb von Handlern — die Funktion löst einen `AuthzAssertionError` mit dem Code `AUTHZ_NOT_INITIALIZED` aus, wenn die Middleware umgangen wurde (hilfreich, um Konfigurationsregressionen in Tests zu erkennen).

## Siehe auch

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — Authentifizierungskennzeichnung pro Endpunkt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — Auditprotokoll für Authentifizierungsereignisse
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — drei Scope-Namensräume und MCP-Tool-Scope-Katalog
- Quelle: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
