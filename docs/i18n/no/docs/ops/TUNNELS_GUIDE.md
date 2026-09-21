# Tunnels Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Sannhetskilde:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute kan eksponere sin lokale server (`http://localhost:20128`) på det offentlige
internettet via tre tunnelbakender. Dette er nyttig for:

- OAuth-tilbakekall fra skyleverandører (Antigravity, Gemini, Cursor) som trenger en
  offentlig tilgjengelig URL for omdirigering.
- Deling av den lokale instansen din med teammedlemmer uten å distribuere en VM.
- Testing på mobil, eksternt eller på tvers av nettverk.

Alle tre bakendene administreres i samme prosess — OmniRoute starter/stopper den underliggende
binærfilen eller SDK-en fra kontrollpanelet eller REST-API-et. Det kreves ikke oppsett av
reversproxy eller systemd.

## Kort oversikt over bakendene

| Bakende                     | Varighet                                                         | Kostnad                | Oppsett                                                    |
| --------------------------- | ---------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Midlertidig (URL-en endres ved hver omstart)                     | Gratis                 | Ingen — installerer `cloudflared` automatisk               |
| **ngrok**                   | Stabil når et betalt abonnement eller fast domene er konfigurert | Gratisnivå + betalt    | Krever ngrok-konto + authtoken                             |
| **Tailscale Funnel**        | Stabil per node i tailnettet ditt                                | Gratis for privat bruk | Krever installasjon av Tailscale + innlogging + Funnel-ACL |

Implementasjonene ligger i `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` og `src/lib/tailscaleTunnel.ts`. Alle tre returnerer et
likt utformet `status`-objekt med feltene `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` og `lastError`, slik at kontrollpanelet kan vise dem på samme måte.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` kjører `cloudflared` som en underordnet prosess. Den støtter
to moduser, valgt ut fra om en konfigurasjon for en navngitt tunnel er angitt:

- **Hurtigtunnel (standard).** Kjører `cloudflared tunnel --url
http://localhost:<apiPort>` og leser den tildelte `*.trycloudflare.com`-URL-en
  fra standard utdata. URL-ene er midlertidige og endres ved hver omstart.
- **Navngitt tunnel (valgfritt).** Når `CLOUDFLARED_CONFIG` peker til en lokalt administrert
  cloudflared-`config.yml`, kjører OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run`, noe som gir deg et **stabilt, navngitt vertsnavn**. Konfigurasjonen
  angir tunnelens UUID, `credentials-file` og `ingress`-ruting, så ingen
  `--url` sendes, og det kreves ikke noe token fra Zero Trust-kontrollpanelet. `run` leser
  legitimasjon fra konfigurasjonens absolutte `credentials-file`-bane — `cert.pem`
  er ikke nødvendig (den brukes bare til administrasjon av tunnelens livssyklus).

Viktig virkemåte:

- **Automatisk installasjon.** Ved første bruk laster OmniRoute ned den nyeste `cloudflared`-
  binærfilen fra de offisielle GitHub-utgivelsene (den administrerte installasjonen ligger under
  `DATA_DIR/cloudflared/`). SHA256 for den nedlastede ressursen verifiseres mot
  utgivelsesmanifestet før kjøring.
- **Prosessovervåking.** cloudflared-PID-en og den fastsatte URL-en lagres i
  `quick-tunnel-state.json`, slik at kontrollpanelet kan gjenoppta statusen etter innlastinger.

### Oppsett av navngitt tunnel (stabilt vertsnavn)

1. Opprett en lokalt administrert tunnel med cloudflared-CLI-et (én gang):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Opprett en `~/.cloudflared/config.yml` som ruter vertsnavnet ditt til OmniRoutes lokale
   API-port (standard er 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Pek OmniRoute til konfigurasjonen, og start tunnelen (på nytt):

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # valgfritt — overstyrer vertsnavnet OmniRoute rapporterer; ellers leses det fra
   # konfigurasjonens første ingress-regel:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Aktiver tunnelen på samme måte som en hurtigtunnel (REST / kontrollpanel / CLI
   nedenfor). En navngitt tunnel sender ikke ut noen offentlig URL som kan leses av, så beredskap oppdages
   fra cloudflareds registrerte kanttilkobling, og `publicUrl`/`apiUrl`
   rapporteres fra `CLOUDFLARED_HOSTNAME` (eller konfigurasjonens første ingress-vertsnavn).

### Aktiver / deaktiver via REST

Endepunktet bruker en `{action: "enable" | "disable"}`-tekst, ikke separate
`start`/`stop`-baner. Administrasjonsautentisering (administratorøkt eller API-nøkkel for administrator)
kreves.

```bash
# Aktiver
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Deaktiver
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Eller via kontrollpanelet: **Innstillinger → Tunneler → Cloudflare**.

### Valgfrie miljøvariabler

| Variabel                                             | Formål                                                                                                                                                                                                    |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Overstyrer banen til binærfilen. Hvis den er angitt og gyldig, bruker OmniRoute den i stedet for å laste ned.                                                                                             |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportprotokoll (standard er `http2`; også `quic`, `auto`).                                                                                                                                            |
| `CLOUDFLARED_CONFIG`                                 | Banen til en lokalt administrert cloudflared-`config.yml`. Når den er angitt, kjører OmniRoute en **navngitt/vedvarende** tunnel (`tunnel --config <path> run`) i stedet for en hurtigtunnel.             |
| `CLOUDFLARED_HOSTNAME`                               | Overstyrer det rapporterte offentlige vertsnavnet for den navngitte tunnelen (f.eks. `ai.example.com`). Når den ikke er angitt, leses vertsnavnet fra den første `ingress`-oppføringen i konfigurasjonen. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` bruker **`@ngrok/ngrok`-SDK-en** (i prosessen, ingen CLI-underprosess). Den integrerte modulen importeres ved behov ved første oppstart, slik at plattformer uten forhåndsbygde binærfiler ikke fører til at appen svikter under oppstart.

### Forutsetninger

1. Registrer deg på <https://ngrok.com>.
2. Kopier autentiseringstokenet ditt fra ngrok-kontrollpanelet.
3. Oppgi det på én av følgende måter:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, eller
   - Kontrollpanel: **Innstillinger → Tunneler → ngrok**, eller
   - REST-data (engangsbruk): `{"action":"enable","authToken":"<token>"}`.

Hvis ingen av disse er konfigurert, returnerer statusen `phase: "needs_auth"`.

### Aktiver/deaktiver via REST

```bash
# Aktiver (bruker NGROK_AUTHTOKEN fra miljøet)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Aktiver med token direkte
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Deaktiver
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Responsen inkluderer den tildelte `publicUrl`-adressen (f.eks.
`https://abcd-1234.ngrok-free.app`). Egendefinerte domener, regioner og policyregler
må konfigureres i ngrok-kontrollpanelet — OmniRoute videresender bare den lokale
mål-URL-en til SDK-en.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` koordinerer systemets `tailscale`-CLI for å eksponere
den lokale API-porten via **Funnel** (Tailscales utgående tilgang til det offentlige internettet for serve).
Den støtter hele livssyklusen: installasjon, innlogging, oppstart av daemon, aktivering og deaktivering.

Implementasjonen kjører `tailscale funnel --bg <port>` (bakgrunnsmodus). Den
offentlige URL-en har formen `https://<machine>.<tailnet>.ts.net/`.

### Forutsetninger

1. Installer Tailscale (eller la OmniRoute gjøre det — se `install`-endepunktet nedenfor).
2. Logg inn (`tailscale login` eller via OmniRoutes `login`-endepunkt).
3. Aktiver Funnel for tailnettet ditt i Tailscale-administrasjonskonsollen:
   <https://login.tailscale.com/admin/settings/features>.

På Linux og macOS krever daemonen (`tailscaled`) `sudo` for å kunne styres.
POST-endepunktene godtar et valgfritt `sudoPassword`-felt, som videresendes til
OmniRoutes MITM-passordbuffer (`getCachedPassword` / `setCachedPassword`) under
kallets varighet. Windows bruker standard tjenesteinstallasjon i
`C:\Program Files\Tailscale\tailscale.exe`.

### REST-endepunkter

Tailscale har et mer omfattende grensesnitt enn de andre bakendene fordi installasjon,
innlogging, daemon og tunnel håndteres separat.

| Endepunkt                             | Metode | Formål                                                                      |
| ------------------------------------- | ------ | --------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Samlet tunnelstatus (`phase`, `tunnelUrl`, `apiUrl` osv.)                   |
| `/api/tunnels/tailscale/check`        | `GET`  | Sjekk på lavere nivå: installert? innlogget? kjører daemonen?               |
| `/api/tunnels/tailscale/install`      | `POST` | Installer Tailscale (SSE-strømmede fremdriftshendelser) — Linux/macOS       |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Start `tailscaled` på Linux/macOS                                           |
| `/api/tunnels/tailscale/login`        | `POST` | Start innloggingsflyten; returnerer `authUrl` som skal åpnes i en nettleser |
| `/api/tunnels/tailscale/enable`       | `POST` | Start Funnel for API-porten                                                 |
| `/api/tunnels/tailscale/disable`      | `POST` | Stopp Funnel                                                                |

Alle Tailscale-endepunkter krever administrasjonsautentisering (se `routeUtils.ts ::
requireTailscaleAuth`).

Eksempel på aktivering:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Hvis Funnel ikke er aktivert i administrasjonskonsollen, inkluderer responsen
`funnelNotEnabled: true` samt en `enableUrl` som skal åpnes i en nettleser.

### Valgfrie miljøvariabler

| Variabel        | Formål                                    |
| --------------- | ----------------------------------------- |
| `TAILSCALE_BIN` | Overstyr banen til `tailscale`-binærfilen |

## Oversikt over endepunkter

| Endepunkt                             | Metode | Brødtekst                           | Autentisering |
| ------------------------------------- | ------ | ----------------------------------- | ------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management    |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management    |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management    |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management    |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management    |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management    |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management    |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management    |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management    |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management    |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management    |

Det finnes ikke noe sentralt `/api/settings/tunnels`-endepunkt — hver backend er
uavhengig.

## Hensyn ved OAuth-tilbakekall

Når du eksponerer OmniRoute gjennom en tunnel, må kontrollpanelet og OAuth-flytene
bygge tilbakekallings-URL-er basert på det **offentlige** vertsnavnet, ikke
`localhost`. Ellers omdirigerer OAuth-leverandøren brukeren tilbake til en URL
som serverne deres ikke kan nå, og håndtrykket mislykkes.

Endringer i kontrollpanelet og lagring av innstillinger krever ikke at tunnelens
vertsnavn låses i `NEXT_PUBLIC_BASE_URL`. Det autentiserte kontrollpanelet sender
usikre forespørsler med samme opprinnelse ved hjelp av et øktbundet CSRF-token,
slik at midlertidige Cloudflare Quick Tunnel-verter fortsatt kan brukes til
vanlig administrasjon i brukergrensesnittet etter innlogging.

Angi:

```bash
NEXT_PUBLIC_BASE_URL=https://<din-tunnelvert>
```

og start OmniRoute på nytt før du starter OAuth. For midlertidige Cloudflare
Quick Tunnels endres URL-en etter hver omstart, så bruk helst ngrok med et
reservert domene eller Tailscale Funnel for OAuth i produksjon.

## Tilstand og overvåking

Kontrollpanelet viser tunnelstatus under **Innstillinger → Tunneler**:

- Aktive backender og gjeldende `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Gjeldende offentlig URL og den avledede API-URL-en (`<publicUrl>/v1`).
- Den lokale mål-URL-en som tunnelen videresender til.
- Siste feilmelding, hvis noen.

For programmatisk overvåking kan du regelmessig spørre de backend-spesifikke
`GET`-endepunktene. Det er tillatt å kjøre mer enn én backend samtidig;
OmniRoute sporer hver av dem uavhengig.

## Feilsøking

### "cloudflared binary not found"

OmniRoute forsøker å installere automatisk ved første gangs bruk. Hvis
installasjonen blokkeres (begrenset nettverk, ingen tilgang til GitHub), laster
du ned `cloudflared` manuelt fra
<https://github.com/cloudflare/cloudflared/releases> og angir
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken required"

`phase: "needs_auth"` betyr at det ikke ble funnet noe autentiseringstoken. Angi
`NGROK_AUTHTOKEN` i `.env`, konfigurer det via kontrollpanelet eller send
`authToken` i brødteksten til POST-forespørselen for aktivering.

### "tailscale: funnel not enabled"

Når aktiveringssvaret inneholder `funnelNotEnabled: true`, er Funnel deaktivert
for tailnettet ditt. Åpne den returnerte `enableUrl` (eller funksjonssiden i
administrasjonskonsollen) og slå på Funnel.

### Endringer i tunnel-URL-en ødelegger OAuth

Bruk ngrok med et reservert domene eller Tailscale Funnel (begge er stabile per
node). Cloudflare Quick Tunnels er midlertidige av design og anbefales ikke for
langvarige OAuth-tilbakekall.

### Ingen tilgang på Linux/macOS for Tailscale

`tailscaled` krever root-tilgang. Oppgi `sudoPassword` til det relevante
POST-endepunktet, eller kjør daemonen selv (`sudo systemctl start tailscaled`).

## Se også

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — utgående proxy (1proxy, SOCKS5, HTTP) for
  utgående trafikk.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — fullstendig liste over miljøvariabler, inkludert
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternativer til tunneler for stabil
  offentlig hosting.
- Kilde: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
