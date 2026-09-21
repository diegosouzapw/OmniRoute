# CORS Configuration & Security (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute bepaalt welke **browser-origins** cross-origin-responses mogen lezen
via één centrale allowlist. Het model is **standaard fail-closed**:
geen enkele origin is toegestaan totdat u deze expliciet toestaat. Deze pagina beschrijft hoe de allowlist
wordt verwerkt, wat `CORS_ALLOW_ALL=true` daadwerkelijk blootstelt (en, belangrijker,
wat **niet**), hoe u ontwikkel- en productieomgevingen veilig configureert en welke runtimewaarschuwing
het dashboard toont wanneer een wildcard actief is.

**Bron van waarheid:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). De allowlist wordt één keer toegepast, in de
middleware (`src/server/authz/pipeline.ts`) — handlers per route stellen
`Access-Control-Allow-Origin` niet zelf in.

## Hoe een origin wordt verwerkt

Voor elk verzoek berekent de middleware de waarde van `Access-Control-Allow-Origin`
in deze volgorde:

1. **`CORS_ALLOW_ALL=true`** (of de verouderde instelling `CORS_ORIGIN=*`) → stuur de
   `Origin` van de aanroeper terug (of `*` wanneer er geen `Origin`-header is), met `Vary: Origin`
   zodat caches correct blijven werken. Hetzelfde centrale punt `applyCorsHeaders()` voegt ook
   `Vary: Accept-Encoding` toe aan elk 2xx-antwoord met een body op het met tokens geauthenticeerde
   `/v1*`/`/v1beta*`-oppervlak (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), zodat
   downstream/gedeelde caches correct onderscheid kunnen maken tussen gecomprimeerde en ongecomprimeerde
   varianten.
2. Anders wordt de `Origin` van het verzoek genormaliseerd (omgezet naar kleine letters en
   zonder afsluitende slash) en vergeleken met de **samengevoegde allowlist**:
   - env **`CORS_ALLOWED_ORIGINS`** — een door komma's gescheiden lijst, en
   - de runtime-instelling **`corsOrigins`** (Dashboard → Security → _CORS Allowed
     Origins_), geïnjecteerd via `setRuntimeAllowedOrigins()` vanuit
     `src/lib/config/runtimeSettings.ts`.
3. Geen overeenkomst → **er wordt geen `Access-Control-Allow-Origin`-header verzonden**. De browser
   blokkeert het lezen vanuit een andere origin. Dit is de bedoelde fail-closed-standaard.

| Omgevingsvariabele     | Betekenis                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV met exact toegestane origins (aanbevolen).                                                   |
| `CORS_ALLOW_ALL`       | `true`/`1` → stuur elke origin terug (wildcard). Alleen voor ontwikkeling.                       |
| `CORS_ORIGIN`          | Verouderd. `*` gedraagt zich als `CORS_ALLOW_ALL`; één waarde wordt aan de allowlist toegevoegd. |

## Dreigingsmodel — wat `CORS_ALLOW_ALL=true` werkelijk blootstelt

De algemene OWASP-waarschuwing ("wildcard-CORS = elke site kan uw API aanroepen") verdient
serieuze aandacht, maar de blootstelling van OmniRoute is **beperkter dan in het algemene geval**,
vanwege één concreet implementatiedetail:

> **Het centrale `applyCorsHeaders()` verzendt nooit
> `Access-Control-Allow-Credentials`.** Een browser stelt een _geauthenticeerd_
> cross-origin-antwoord (met cookies) niet beschikbaar tenzij de server
> `Access-Control-Allow-Credentials: true` verzendt. Het gedeelde CORS-pad van OmniRoute doet
> dit nooit.

Dit betekent per oppervlak, zelfs met `CORS_ALLOW_ALL=true`:

| Oppervlak                                | Authenticatiemechanisme      | Effect van wildcard-CORS                                                                                                                                                                                                                                        |
| ---------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`          | Cookiesessie                 | De origin wordt teruggestuurd, maar **zonder `Allow-Credentials`** **blokkeert** de browser het lezen met credentials. Een schadelijke cross-origin-site **kan uw geauthenticeerde dashboardantwoorden niet lezen** en de sessiecookie wordt niet blootgesteld. |
| Client-API `/v1/*`, `/v1beta/*`          | Bearer- / `x-api-key`-header | Reeds permissief **door ontwerp** (`relaxForTokenAuth`): browsers voegen `Authorization`/`x-api-key` nooit automatisch toe, dus de pagina van een aanvaller kan uw sleutel niet meesturen. `CORS_ALLOW_ALL` verruimt dit niet.                                  |
| Openbaar alleen-lezen (`/api/health`, …) | Geen                         | Niet-gevoelig; een wildcard is onschadelijk.                                                                                                                                                                                                                    |

De **resterende** blootstelling van `CORS_ALLOW_ALL=true` is dus beperkt tot: (a)
niet-geauthenticeerde cross-origin-**leesacties** van gegevens die al zonder authenticatie toegankelijk zijn, en (b)
het toestaan dat CORS-**preflightverzoeken slagen** op beheerroutes — waarvoor nog steeds authenticatie
vereist is die een cross-origin-pagina niet kan leveren. Het is **geen** vector voor het kapen van sessies of
diefstal van credentials op het gedeelde CORS-pad.

### Eén echte uitzondering — `/api/v1/agents/`

De Cloud-Agent-routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) stellen
hun **eigen** CORS-headers in
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) en verzenden **wel**
`Access-Control-Allow-Origin: <origin>|*` samen met
`Access-Control-Allow-Credentials: true`. Dit is het enige oppervlak waarop
het terugsturen van origins en credentials samengaan, en het is **onafhankelijk van
`CORS_ALLOW_ALL`**. Deze routes zijn geauthenticeerd voor beheer
(`requireManagementAuth`); beheerders die het dashboard buiten de host beschikbaar stellen, moeten
zich ervan bewust zijn dat dit de enige plek is waar de antwoordheaders het lezen van geauthenticeerde
cross-origin-antwoorden toestaan. Het beperken hiervan tot een expliciete allowlist wordt
los van deze CORS-richtlijnen bijgehouden.

## Productiechecklist

- **Stel `CORS_ALLOW_ALL=true` nooit in productie in.** Laat deze variabele oningesteld.
- Stel een **expliciete** lijst met origins in — via de omgevingsvariabele of het veld op het tabblad Beveiliging:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Als OmniRoute achter een reverse proxy/tunnel draait (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), is CORS **niet** uw enige beveiligingsmechanisme — de
  routebeveiliging voor loopback beschermt nog steeds routes die processen kunnen
  starten (zie [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Vervals
  `X-Forwarded-For: 127.0.0.1` niet om een 403 te ‘verhelpen’; hierdoor wordt de
  RCE-klasse waartegen de routebeveiliging beschermt opnieuw mogelijk.
- Controleer de runtimestatus: het dashboard toont een **permanente oranje banner**
  onder Dashboard → Beveiliging → Autorisatie-inventaris wanneer
  `CORS_ALLOW_ALL=true` actief is, en `/api/settings/authz-inventory` retourneert
  een `cors: { allowAll, allowedOrigins }`-envelop die monitoringtools kunnen pollen.

## Gemak tijdens ontwikkeling — specifieke lokale origins toestaan

Zelfs tijdens de ontwikkeling hebt u het jokerteken zelden nodig. Sta alleen de
ontwikkelservers toe die u gebruikt:

```bash
# Vite- (5173) en Next.js-ontwikkelservers (3000) die een lokale OmniRoute aanroepen
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origins worden hoofdletterongevoelig vergeleken, waarbij een afsluitende slash
wordt genegeerd. `http://localhost:3000` en `http://localhost:3000/` zijn dus
gelijkwaardig. Dezelfde CSV kan tijdens runtime zonder herstart worden ingesteld
via **Dashboard → Beveiliging → Toegestane CORS-origins**.

## API-sleutels versus cookiesessies

- **Bearer / `x-api-key` (het `/v1/*`-inferentieoppervlak):** browsers voegen deze
  nooit automatisch toe. CORS vormt hier geen betekenisvolle barrière — de
  API-sleutel is de barrière. Daarom is dit oppervlak bewust permissief, zodat
  browser- en Electron-clients antwoorden kunnen lezen waartoe ze al gerechtigd
  zijn.
- **Cookiesessie (het dashboard):** wordt beschermd door de standaardinstelling
  die bij fouten gesloten blijft **en** door het ontbreken van
  `Access-Control-Allow-Credentials` op het gedeelde pad. Neem origins voor beheer
  en dashboards niet op in een permissieve configuratie; deze moeten strikt
  gesloten blijven.

## Voorbeeld: reverse proxy vóór OmniRoute

CORS wordt door OmniRoute zelf afgedwongen. De proxy moet daarom doorgaans
**geen** `Access-Control-*`-headers toevoegen of herschrijven (dubbele headers
veroorzaken problemen in browsers). Beëindig TLS en stuur het verkeer door — laat
OmniRoute preflightverzoeken beantwoorden:

```nginx
# nginx — doorsturen naar OmniRoute; voeg hier GEEN Access-Control-* toe
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Stel X-Forwarded-For NIET in op 127.0.0.1 — dit omzeilt de routebeveiliging voor loopback.
}
```

Stel de toegestane browser-origins in OmniRoute in (`CORS_ALLOWED_ORIGINS` of het
tabblad Beveiliging), niet in de proxy.

## Bronbestanden

| Onderwerp                                         | Bestand                                                              |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist-resolutie + `getCorsStatus()`           | `src/server/cors/origins.ts`                                         |
| Toepassing van middleware (enige waarheid)        | `src/server/authz/pipeline.ts`                                       |
| Instellingen → runtime-injectie van origins       | `src/lib/config/runtimeSettings.ts`                                  |
| Runtimestatus voor het dashboard                  | `src/app/api/settings/authz-inventory/route.ts`                      |
| Waarschuwingsbanner op het dashboard              | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Veld voor toegestane CORS-origins                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS per route voor Cloud-Agent (de uitzondering) | `src/lib/cloudAgent/api.ts`                                          |

## Zie ook

- [Niveaus voor routebeveiliging](./ROUTE_GUARD_TIERS.md) — loopback-handhaving voor
  routes die processen kunnen starten (een afzonderlijke, aanvullende controle).
- [Autorisatiehandleiding](../architecture/AUTHZ_GUIDE.md) — de volledige authenticatiepijplijn.
