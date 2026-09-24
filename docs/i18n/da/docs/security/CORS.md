# CORS Configuration & Security (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute styrer, hvilke **browseroprindelser** der må læse svar på tværs af oprindelser,
fra en enkelt, centraliseret tilladelsesliste. Modellen er **lukket som standard**:
Ingen oprindelse er tilladt, før du udtrykkeligt tillader den. Denne side dokumenterer, hvordan tilladelseslisten
fortolkes, hvad `CORS_ALLOW_ALL=true` faktisk eksponerer (og, vigtigt, hvad den
**ikke** eksponerer), hvordan udviklings- og produktionsmiljøer konfigureres sikkert, samt den runtime-advarsel,
som dashboardet viser, når et jokertegn er aktivt.

**Autoritativ kilde:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Tilladelseslisten anvendes én gang i
middlewarelaget (`src/server/authz/pipeline.ts`) — handlers for individuelle routes angiver ikke selv
`Access-Control-Allow-Origin`.

## Sådan fortolkes en oprindelse

For hver anmodning beregner middlewarelaget værdien for `Access-Control-Allow-Origin`
i denne rækkefølge:

1. **`CORS_ALLOW_ALL=true`** (eller den ældre `CORS_ORIGIN=*`) → returnér kalderens
   `Origin` (eller `*`, når der ikke er nogen `Origin`-header) med `Vary: Origin`,
   så caches forbliver korrekte. Det samme centrale `applyCorsHeaders()`-kontrolpunkt tilføjer også
   `Vary: Accept-Encoding` til alle 2xx-svar med en body på den token-godkendte
   `/v1*`/`/v1beta*`-flade (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), så
   efterfølgende/delte caches korrekt kan skelne mellem komprimerede og ukomprimerede
   varianter.
2. Ellers normaliseres anmodningens `Origin` (konverteres til små bogstaver, og afsluttende skråstreg
   fjernes) og sammenlignes med den **sammenlagte tilladelsesliste**:
   - miljøvariablen **`CORS_ALLOWED_ORIGINS`** — kommasepareret liste, og
   - runtime-indstillingen **`corsOrigins`** (Dashboard → Security → _CORS Allowed
     Origins_), som injiceres via `setRuntimeAllowedOrigins()` fra
     `src/lib/config/runtimeSettings.ts`.
3. Intet match → **der udsendes ingen `Access-Control-Allow-Origin`-header**. Browseren
   blokerer læsningen på tværs af oprindelser. Dette er den tilsigtede lukkede standardadfærd.

| Miljøvariabel          | Betydning                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV med de præcise oprindelser, der skal tillades (anbefales).                         |
| `CORS_ALLOW_ALL`       | `true`/`1` → returnér enhver oprindelse (jokertegn). Kun til udvikling.                |
| `CORS_ORIGIN`          | Ældre. `*` fungerer som `CORS_ALLOW_ALL`; en enkelt værdi føjes til tilladelseslisten. |

## Trusselsmodel — hvad `CORS_ALLOW_ALL=true` reelt eksponerer

Den generelle OWASP-advarsel ("CORS med jokertegn = ethvert websted kan kalde dit API") bør
tages alvorligt, men OmniRoutes eksponering er **mere begrænset end i det generelle tilfælde**
på grund af én konkret implementeringsdetalje:

> **Det centrale `applyCorsHeaders()` udsender aldrig
> `Access-Control-Allow-Credentials`.** En browser vil ikke eksponere et _legitimationsoplysningsbaseret_
> svar på tværs af oprindelser (med cookies), medmindre serveren sender
> `Access-Control-Allow-Credentials: true`. Det gør OmniRoutes fælles CORS-kode aldrig.

Det betyder følgende for hver flade, selv med `CORS_ALLOW_ALL=true`:

| Flade                                        | Godkendelsesmekanisme      | Effekt af CORS med jokertegn                                                                                                                                                                                                                                  |
| -------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`              | Cookiesession              | Oprindelsen returneres, men **uden `Allow-Credentials`** **blokerer** browseren den legitimationsoplysningsbaserede læsning. Et ondsindet websted fra en anden oprindelse **kan ikke læse** dine godkendte dashboardsvar, og sessionscookien eksponeres ikke. |
| Klient-API `/v1/*`, `/v1beta/*`              | Bearer-/`x-api-key`-header | Er allerede eftergivende **med vilje** (`relaxForTokenAuth`): Browsere vedhæfter aldrig automatisk `Authorization`/`x-api-key`, så en angribers side kan ikke levere din nøgle. `CORS_ALLOW_ALL` udvider ikke dette.                                          |
| Offentlig skrivebeskyttet (`/api/health`, …) | Ingen                      | Ikke følsomt; jokertegnet er harmløst.                                                                                                                                                                                                                        |

Den **resterende** eksponering ved `CORS_ALLOW_ALL=true` er derfor begrænset til: (a)
læsning på tværs af oprindelser uden legitimationsoplysninger af data, der allerede er tilgængelige uden godkendelse, og (b)
at lade CORS-**preflight lykkes** på administrationsroutes — som stadig kræver godkendelse,
der ikke kan leveres af en side fra en anden oprindelse. Det er **ikke** en vektor til sessionskapring eller
tyveri af legitimationsoplysninger i den fælles CORS-kode.

### Én reel undtagelse — `/api/v1/agents/`

Cloud-Agent-routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) angiver
deres **egne** CORS-headere
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) og udsender **faktisk**
`Access-Control-Allow-Origin: <origin>|*` sammen med
`Access-Control-Allow-Credentials: true`. Dette er den eneste flade, hvor
returnering af oprindelsen og legitimationsoplysninger eksisterer samtidigt, og den er **uafhængig af
`CORS_ALLOW_ALL`**. Disse routes er administrationsgodkendte
(`requireManagementAuth`); operatører, der eksponerer dashboardet uden for værtsmaskinen, bør være
opmærksomme på, at dette er det eneste sted, hvor en legitimationsoplysningsbaseret læsning på tværs af oprindelser tillades af
svarheaderne. En stramning til en eksplicit tilladelsesliste spores
separat fra denne CORS-vejledning.

## Tjekliste til produktion

- **Indstil aldrig `CORS_ALLOW_ALL=true` i produktion.** Lad den være udefineret.
- Angiv en **eksplicit** liste over origins — enten via miljøvariablen eller feltet under fanen Sikkerhed:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Hvis OmniRoute kører bag en reverse proxy/tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), er CORS **ikke** din eneste kontrolmekanisme — loopback-rute-
  beskyttelsen beskytter stadig ruter, der kan starte processer (se
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Forfalsk ikke
  `X-Forwarded-For: 127.0.0.1` for at "rette" en 403-fejl; det genåbner den
  RCE-klasse, som rutebeskyttelsen lukker.
- Bekræft runtime-tilstanden: Dashboardet viser et **permanent ravfarvet banner**
  under Dashboard → Sikkerhed → Autorisationsoversigt, når
  `CORS_ALLOW_ALL=true` er aktiv, og `/api/settings/authz-inventory` returnerer en
  `cors: { allowAll, allowedOrigins }`-struktur, som overvågningsværktøjer kan forespørge.

## Praktisk udviklingsopsætning — tillad specifikke lokale origins

Selv under udvikling har du sjældent brug for wildcard. Tillad kun de udviklingsservere, du bruger:

```bash
# Vite- (5173) og Next.js-udviklingsservere (3000), der kalder en lokal OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origins matches uden hensyn til store og små bogstaver, og afsluttende skråstreger
ignoreres, så `http://localhost:3000` og `http://localhost:3000/` er ækvivalente.
Den samme CSV kan angives under kørsel i **Dashboard → Sikkerhed → Tilladte CORS-origins**
uden genstart.

## API-nøgler kontra cookie-sessioner

- **Bearer / `x-api-key` (`/v1/*`-inferensgrænsefladen):** browsere vedhæfter
  aldrig automatisk disse. CORS er ikke en meningsfuld barriere her — API-nøglen
  er barrieren — og derfor er denne grænseflade bevidst tilladende, så browser- og
  Electron-klienter kan læse svar, som de allerede har adgang til.
- **Cookie-session (dashboardet):** beskyttes af den fail-closed-standardindstilling **og**
  af fraværet af `Access-Control-Allow-Credentials` på den delte sti. Undlad at
  inkludere administrations-/dashboard-origins i tilladende konfigurationer; de skal
  forblive fail-closed uden undtagelser.

## Eksempel: reverse proxy foran OmniRoute

CORS håndhæves af OmniRoute selv, så proxyen bør generelt **ikke** tilføje eller
omskrive `Access-Control-*`-headers (dobbelte headers får browsere til at fejle).
Terminér TLS, og videresend — lad OmniRoute besvare preflight-anmodninger:

```nginx
# nginx — videresend til OmniRoute; tilføj IKKE Access-Control-* her
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Indstil IKKE X-Forwarded-For til 127.0.0.1 — det omgår loopback-rutebeskyttelsen.
}
```

Angiv de tilladte browser-origins i OmniRoute (`CORS_ALLOWED_ORIGINS` eller fanen
Sikkerhed), ikke i proxyen.

## Kildefiler

| Område                                          | Fil                                                                  |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Løsning af allowlist + `getCorsStatus()`        | `src/server/cors/origins.ts`                                         |
| Anvendelse af middleware (eneste sandhedskilde) | `src/server/authz/pipeline.ts`                                       |
| Indstillinger → runtime-injektion af origins    | `src/lib/config/runtimeSettings.ts`                                  |
| Runtime-status for dashboardet                  | `src/app/api/settings/authz-inventory/route.ts`                      |
| Advarselsbanner på dashboardet                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Feltet Tilladte CORS-origins                    | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agents CORS pr. rute (undtagelsen)        | `src/lib/cloudAgent/api.ts`                                          |

## Se også

- [Niveauer for route guards](./ROUTE_GUARD_TIERS.md) — loopback-håndhævelse for
  routes, der kan starte processer (en separat, supplerende kontrol).
- [Godkendelsesvejledning](../architecture/AUTHZ_GUIDE.md) — hele godkendelsespipelinen.
