# CORS Configuration & Security (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kontrollerer hvilke **nettleseropprinnelser** som kan lese svar på tvers av opprinnelser
fra én sentralisert tillatelsesliste. Modellen er **lukket som standard**:
Ingen opprinnelse tillates før du eksplisitt legger den til. Denne siden dokumenterer hvordan tillatelseslisten
evalueres, hva `CORS_ALLOW_ALL=true` faktisk eksponerer (og, ikke minst, hva den
**ikke** eksponerer), hvordan utviklings- og produksjonsmiljøer konfigureres sikkert, og kjøretidsadvarselen
kontrollpanelet viser når et jokertegn er aktivt.

**Autoritativ kilde:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Tillatelseslisten brukes én gang, i
mellomvaren (`src/server/authz/pipeline.ts`) — behandlere for individuelle ruter angir ikke
`Access-Control-Allow-Origin` selv.

## Hvordan en opprinnelse evalueres

For hver forespørsel beregner mellomvaren verdien for `Access-Control-Allow-Origin`
i denne rekkefølgen:

1. **`CORS_ALLOW_ALL=true`** (eller den eldre `CORS_ORIGIN=*`) → returner innringerens
   `Origin` (eller `*` når `Origin`-feltet mangler), med `Vary: Origin`
   slik at mellomlagre fungerer korrekt. Det samme kontrollpunktet `applyCorsHeaders()` legger også til
   `Vary: Accept-Encoding` for alle 2xx-svar med innhold på den tokenautentiserte
   `/v1*`/`/v1beta*`-overflaten (`relaxForTokenAuth`, RFC 9110 §12.5.5, sak #6737), slik at
   nedstrøms/delte mellomlagre kan skille korrekt mellom komprimerte og ukomprimerte
   varianter.
2. Ellers normaliseres forespørselens `Origin` (konverteres til små bokstaver, avsluttende skråstrek
   fjernes) og sammenlignes med den **sammenslåtte tillatelseslisten**:
   - miljøvariabelen **`CORS_ALLOWED_ORIGINS`** — kommaseparert liste, og
   - kjøretidsinnstillingen **`corsOrigins`** (Kontrollpanel → Sikkerhet → _Tillatte
     CORS-opprinnelser_), satt via `setRuntimeAllowedOrigins()` fra
     `src/lib/config/runtimeSettings.ts`.
3. Ingen treff → **ingen `Access-Control-Allow-Origin`-header sendes**. Nettleseren
   blokkerer lesingen på tvers av opprinnelser. Dette er den tiltenkte standardatferden som holder tilgangen lukket.

| Miljøvariabel          | Betydning                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | Kommaseparert liste over nøyaktige opprinnelser som skal tillates (anbefalt).                          |
| `CORS_ALLOW_ALL`       | `true`/`1` → returner enhver opprinnelse (jokertegn). Kun for utvikling.                               |
| `CORS_ORIGIN`          | Eldre variabel. `*` oppfører seg som `CORS_ALLOW_ALL`; én enkelt verdi legges til i tillatelseslisten. |

## Trusselmodell — hva `CORS_ALLOW_ALL=true` faktisk eksponerer

Den generelle OWASP-advarselen («CORS med jokertegn = ethvert nettsted kan kalle API-et ditt») bør
tas på alvor, men OmniRoutes eksponering er **smalere enn i det generelle tilfellet**,
på grunn av ett konkret implementasjonsforhold:

> **Den sentrale `applyCorsHeaders()` sender aldri
> `Access-Control-Allow-Credentials`.** En nettleser eksponerer ikke et _legitimert_
> svar på tvers av opprinnelser (med informasjonskapsler) med mindre serveren sender
> `Access-Control-Allow-Credentials: true`. OmniRoutes delte CORS-kode gjør aldri
> dette.

Dette betyr følgende for hver overflate, selv med `CORS_ALLOW_ALL=true`:

| Overflate                                    | Autentiseringsmekanisme      | Effekt av CORS med jokertegn                                                                                                                                                                                                                                         |
| -------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kontrollpanel / ADMINISTRASJON `/api/*`      | Informasjonskapselbasert økt | Opprinnelsen returneres, men **uten `Allow-Credentials`** vil nettleseren **blokkere** den legitimerte lesingen. Et ondsinnet nettsted fra en annen opprinnelse **kan ikke lese** autentiserte svar fra kontrollpanelet, og øktinformasjonskapselen eksponeres ikke. |
| Klient-API `/v1/*`, `/v1beta/*`              | Bearer-/`x-api-key`-header   | Er allerede åpent **med hensikt** (`relaxForTokenAuth`): Nettlesere legger aldri automatisk ved `Authorization`/`x-api-key`, så en angripers side kan ikke oppgi nøkkelen din. `CORS_ALLOW_ALL` utvider ikke dette.                                                  |
| Offentlig skrivebeskyttet (`/api/health`, …) | Ingen                        | Ikke sensitivt; jokertegn er ufarlig.                                                                                                                                                                                                                                |

Den **gjenværende** eksponeringen ved `CORS_ALLOW_ALL=true` er derfor begrenset til: (a)
ikke-legitimerte **lesinger** på tvers av opprinnelser av data som allerede er tilgjengelige uten autentisering, og (b)
å la CORS-**preflight passere** på administrasjonsruter — som fortsatt krever autentisering
en side fra en annen opprinnelse ikke kan oppgi. Det er **ikke** en vektor for øktkapring eller
legitimasjonstyveri i den delte CORS-koden.

### Ett reelt unntak — `/api/v1/agents/`

Cloud-Agent-rutene (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) angir
sine **egne** CORS-headere
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) og sender **faktisk**
`Access-Control-Allow-Origin: <origin>|*` sammen med
`Access-Control-Allow-Credentials: true`. Dette er den eneste overflaten der
returnering av opprinnelsen og legitimasjon brukes samtidig, og den er **uavhengig av
`CORS_ALLOW_ALL`**. Disse rutene er administrasjonsautentiserte
(`requireManagementAuth`); operatører som eksponerer kontrollpanelet utenfor vertsmaskinen, bør være
oppmerksomme på at dette er det eneste stedet der svarheaderne tillater en legitimert lesing på tvers av
opprinnelser. Innstramming til en eksplisitt tillatelsesliste følges opp
separat fra denne CORS-veiledningen.

## Sjekkliste for produksjon

- **Sett aldri `CORS_ALLOW_ALL=true` i produksjon.** La den være udefinert.
- Angi en **eksplisitt** liste over opphav — enten med miljøvariabelen eller feltet i Security-fanen:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Hvis OmniRoute kjører bak en omvendt proxy/tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), er CORS **ikke** den eneste beskyttelsen — rutevernet for
  loopback beskytter fortsatt ruter som kan starte prosesser (se
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Ikke forfalsk
  `X-Forwarded-For: 127.0.0.1` for å «fikse» en 403-feil. Det gjenåpner
  RCE-klassen som rutevernet stenger.
- Bekreft tilstanden under kjøring: Kontrollpanelet viser et **vedvarende gult banner**
  under Dashboard → Security → Authorization Inventory når
  `CORS_ALLOW_ALL=true` er aktiv, og `/api/settings/authz-inventory` returnerer et
  `cors: { allowAll, allowedOrigins }`-objekt som overvåkingsverktøy kan hente regelmessig.

## Praktisk utviklingsoppsett — tillat bestemte lokale opphav

Du trenger sjelden jokertegnet, selv under utvikling. Tillat bare utviklingsserverne du bruker:

```bash
# Utviklingsservere for Vite (5173) og Next.js (3000) som kaller en lokal OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Opphav sammenlignes uten å skille mellom store og små bokstaver, og avsluttende skråstrek
ignoreres, slik at `http://localhost:3000` og `http://localhost:3000/` er ekvivalente. Den
samme CSV-listen kan angis under kjøring i **Dashboard → Security → CORS Allowed Origins**
uten omstart.

## API-nøkler kontra informasjonskapseløkter

- **Bearer / `x-api-key` (`/v1/*`-inferensgrensesnittet):** Nettlesere legger aldri
  ved disse automatisk. CORS er ikke en meningsfull barriere her — API-nøkkelen er
  barrieren — og derfor er dette grensesnittet med hensikt åpent, slik at nettleser-
  og Electron-klienter kan lese svar de allerede har tilgang til.
- **Informasjonskapseløkt (kontrollpanelet):** Beskyttes av standardinnstillingen som
  avviser tilgang ved feil, **og** av fraværet av `Access-Control-Allow-Credentials`
  på den delte banen. Hold opphav for administrasjon og kontrollpanel utenfor
  alle åpne konfigurasjoner. De må fortsatt avvises som standard.

## Eksempel: omvendt proxy foran OmniRoute

CORS håndheves av OmniRoute selv, så proxyen bør vanligvis **ikke** legge til eller
skrive om `Access-Control-*`-headere (dupliserte headere skaper problemer i nettlesere).
Terminer TLS og videresend — la OmniRoute besvare preflight-forespørsler:

```nginx
# nginx — videresend til OmniRoute; IKKE legg inn Access-Control-* her
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # IKKE sett X-Forwarded-For til 127.0.0.1 — det omgår rutevernet for loopback.
}
```

Angi de tillatte nettleseropphavene i OmniRoute (`CORS_ALLOWED_ORIGINS` eller
Security-fanen), ikke i proxyen.

## Kildefiler

| Område                                             | Fil                                                                  |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| Løsning av tillatelsesliste + `getCorsStatus()`    | `src/server/cors/origins.ts`                                         |
| Bruk av mellomvare (én autoritativ kilde)          | `src/server/authz/pipeline.ts`                                       |
| Innstillinger → innsetting av opphav under kjøring | `src/lib/config/runtimeSettings.ts`                                  |
| Kjøretidsstatus for kontrollpanelet                | `src/app/api/settings/authz-inventory/route.ts`                      |
| Varselbanner i kontrollpanelet                     | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Feltet CORS Allowed Origins                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS per rute for Cloud-Agent (unntaket)           | `src/lib/cloudAgent/api.ts`                                          |

## Se også

- [Nivåer for rutebeskyttelse](./ROUTE_GUARD_TIERS.md) — loopback-håndheving for
  ruter som kan starte prosesser (en separat, komplementær kontroll).
- [Autorisasjonsveiledning](../architecture/AUTHZ_GUIDE.md) — hele autentiseringsprosessen.
