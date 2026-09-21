# Tunnels Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Gezaghebbende bron:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute kan zijn lokale server (`http://localhost:20128`) via drie tunnelbackends
toegankelijk maken vanaf het openbare internet. Dit is nuttig voor:

- OAuth-callbacks van cloudproviders (Antigravity, Gemini, Cursor) die een
  openbaar bereikbare omleidings-URL nodig hebben.
- Het delen van je lokale instantie met teamgenoten zonder een VM te implementeren.
- Testen op mobiele apparaten, op afstand of tussen verschillende netwerken.

Alle drie de backends worden in-process beheerd — OmniRoute start/stopt het
onderliggende binaire bestand of de SDK via het dashboard of de REST-API. Er is
geen configuratie van een reverse proxy of systemd vereist.

## Overzicht van de backends

| Backend                     | Persistentie                                                            | Kosten                          | Configuratie                                                |
| --------------------------- | ----------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Tijdelijk (URL verandert na elke herstart)                              | Gratis                          | Geen — installeert `cloudflared` automatisch                |
| **ngrok**                   | Stabiel wanneer een betaald abonnement of vast domein is geconfigureerd | Gratis versie + betaald         | Vereist ngrok-account + authtoken                           |
| **Tailscale Funnel**        | Stabiel per node binnen je tailnet                                      | Gratis voor persoonlijk gebruik | Vereist installatie van Tailscale + aanmelding + Funnel-ACL |

De implementaties bevinden zich in `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` en `src/lib/tailscaleTunnel.ts`. Alle drie retourneren
een `status`-object met dezelfde structuur en de velden `phase`, `running`,
`publicUrl`, `apiUrl`, `targetUrl` en `lastError`, zodat het dashboard ze op
dezelfde manier kan weergeven.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` voert `cloudflared` uit als een childproces. Het
ondersteunt twee modi, die worden geselecteerd op basis van de aanwezigheid van
een configuratie voor een benoemde tunnel:

- **Quick tunnel (standaard).** Voert `cloudflared tunnel --url
http://localhost:<apiPort>` uit en haalt de toegewezen `*.trycloudflare.com`-URL
  uit stdout. URL's zijn tijdelijk en veranderen na elke herstart.
- **Named tunnel (optioneel).** Wanneer `CLOUDFLARED_CONFIG` verwijst naar een
  lokaal beheerde `config.yml` van cloudflared, voert OmniRoute `cloudflared
tunnel --no-autoupdate --config <path> run` uit, waardoor je een **stabiele,
  benoemde hostnaam** krijgt. De configuratie bevat de tunnel-UUID, het
  `credentials-file` en de `ingress`-routering. Daardoor wordt er geen `--url`
  doorgegeven en is er geen token voor het Zero Trust-dashboard vereist. `run`
  leest de referenties via het absolute pad van `credentials-file` in de
  configuratie — `cert.pem` is niet nodig (dit wordt alleen gebruikt voor het
  beheer van de tunnellevenscyclus).

Belangrijk gedrag:

- **Automatische installatie.** Bij het eerste gebruik downloadt OmniRoute het
  nieuwste binaire bestand van `cloudflared` uit de officiële GitHub-releases
  (de beheerde installatie bevindt zich onder `DATA_DIR/cloudflared/`). De
  SHA256 van het gedownloade bestand wordt vóór uitvoering geverifieerd aan de
  hand van het releasemanifest.
- **Procesbewaking.** De PID van cloudflared en de gevonden URL worden opgeslagen
  in `quick-tunnel-state.json`, zodat het dashboard de status na het opnieuw
  laden kan hervatten.

### Een benoemde tunnel configureren (stabiele hostnaam)

1. Maak een lokaal beheerde tunnel met de cloudflared-CLI (eenmalig):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Maak een `~/.cloudflared/config.yml` die je hostnaam naar de lokale
   API-poort van OmniRoute routeert (standaard 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Laat OmniRoute naar de configuratie verwijzen en start de tunnel (opnieuw):

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # optioneel — overschrijft de hostnaam die OmniRoute rapporteert; anders wordt deze
   # uit de eerste ingress-regel van de configuratie gelezen:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Schakel de tunnel op dezelfde manier in als een quick tunnel (via REST, het
   dashboard of de CLI hieronder). Een benoemde tunnel geeft geen openbare URL
   om uit te lezen, dus wordt de gereedheid vastgesteld aan de hand van de door
   cloudflared geregistreerde edgeverbinding. `publicUrl`/`apiUrl` worden
   gerapporteerd op basis van `CLOUDFLARED_HOSTNAME` (of de eerste
   ingress-hostnaam in de configuratie).

### In-/uitschakelen via REST

Het endpoint gebruikt een body met `{action: "enable" | "disable"}`, geen
afzonderlijke `start`-/`stop`-paden. Beheerauthenticatie (een beheerderssessie of
API-sleutel voor beheerders) is vereist.

```bash
# Inschakelen
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Uitschakelen
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Of via het dashboard: **Instellingen → Tunnels → Cloudflare**.

### Optionele omgevingsvariabelen

| Variabele                                            | Doel                                                                                                                                                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | Overschrijft het pad naar het binaire bestand. Indien ingesteld en geldig, gebruikt OmniRoute dit in plaats van het te downloaden.                                                               |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportprotocol (standaard `http2`; ook `quic`, `auto`).                                                                                                                                       |
| `CLOUDFLARED_CONFIG`                                 | Pad naar een lokaal beheerd cloudflared-`config.yml`. Indien ingesteld, voert OmniRoute een **benoemde/permanente** tunnel (`tunnel --config <path> run`) uit in plaats van een snelle tunnel.   |
| `CLOUDFLARED_HOSTNAME`                               | Overschrijft de gerapporteerde openbare hostnaam van de benoemde tunnel (bijv. `ai.example.com`). Indien niet ingesteld, wordt deze uit de eerste `ingress`-hostnaam in de configuratie gelezen. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` gebruikt de **`@ngrok/ngrok` SDK** (in-process, zonder CLI-subproces). De native module wordt pas bij de eerste start geïmporteerd, zodat platforms zonder vooraf gebouwde binaries de app tijdens het opstarten niet laten vastlopen.

### Vereisten

1. Registreer je op <https://ngrok.com>.
2. Kopieer je authtoken vanuit het ngrok-dashboard.
3. Geef dit op via:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, of
   - Dashboard: **Instellingen → Tunnels → ngrok**, of
   - REST-body (eenmalig): `{"action":"enable","authToken":"<token>"}`.

Als geen van beide is geconfigureerd, retourneert de status `phase: "needs_auth"`.

### Inschakelen / uitschakelen via REST

```bash
# Inschakelen (gebruikt NGROK_AUTHTOKEN uit de omgeving)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Inschakelen met inline token
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Uitschakelen
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Het antwoord bevat de toegewezen `publicUrl` (bijv.
`https://abcd-1234.ngrok-free.app`). Aangepaste domeinen, regio's en beleidsregels
moeten in het ngrok-dashboard worden geconfigureerd — OmniRoute stuurt zelf alleen
de lokale doel-URL door naar de SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` stuurt de `tailscale`-CLI van het systeem aan om
de lokale API-poort via **Funnel** beschikbaar te stellen (Tailscale's uitvoer
naar het openbare internet voor serve). De volledige levenscyclus wordt ondersteund:
installatie, aanmelden, daemon starten, inschakelen en uitschakelen.

De implementatie roept `tailscale funnel --bg <port>` aan (achtergrondmodus). De
openbare URL heeft de vorm `https://<machine>.<tailnet>.ts.net/`.

### Vereisten

1. Installeer Tailscale (of laat OmniRoute dit doen — zie het `install`-endpoint hieronder).
2. Meld je aan (`tailscale login` of via OmniRoute's `login`-endpoint).
3. Schakel Funnel voor je tailnet in via de Tailscale-beheerconsole:
   <https://login.tailscale.com/admin/settings/features>.

Op Linux en macOS vereist het aansturen van de daemon (`tailscaled`) `sudo`. De
POST-endpoints accepteren een optioneel veld `sudoPassword`, dat voor de duur
van de aanroep wordt doorgestuurd naar OmniRoute's MITM-wachtwoordcache
(`getCachedPassword` / `setCachedPassword`). Windows gebruikt de standaardinstallatie
van de service op `C:\Program Files\Tailscale\tailscale.exe`.

### REST-endpoints

Tailscale heeft een uitgebreider API-oppervlak dan de andere backends, omdat installatie,
aanmelding, daemon en tunnel afzonderlijke aspecten zijn.

| Endpoint                              | Methode | Doel                                                                         |
| ------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`   | Geaggregeerde tunnelstatus (`phase`, `tunnelUrl`, `apiUrl`, enz.)            |
| `/api/tunnels/tailscale/check`        | `GET`   | Controle op lager niveau: geïnstalleerd? aangemeld? daemon actief?           |
| `/api/tunnels/tailscale/install`      | `POST`  | Tailscale installeren (voortgangsgebeurtenissen via SSE) — Linux/macOS       |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | `tailscaled` starten op Linux/macOS                                          |
| `/api/tunnels/tailscale/login`        | `POST`  | Aanmeldingsproces starten; retourneert `authUrl` om in een browser te openen |
| `/api/tunnels/tailscale/enable`       | `POST`  | De Funnel voor de API-poort starten                                          |
| `/api/tunnels/tailscale/disable`      | `POST`  | De Funnel stoppen                                                            |

Alle Tailscale-endpoints vereisen beheerauthenticatie (zie `routeUtils.ts ::
requireTailscaleAuth`).

Voorbeeld voor inschakelen:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Als Funnel niet is ingeschakeld in de beheerconsole, bevat het antwoord
`funnelNotEnabled: true` plus een `enableUrl` om in een browser te openen.

### Optionele omgevingsvariabelen

| Variabele       | Doel                                             |
| --------------- | ------------------------------------------------ |
| `TAILSCALE_BIN` | Het pad naar de `tailscale`-binary overschrijven |

## Overzicht van endpoints

| Endpoint                              | Methode | Body                                | Auth   |
| ------------------------------------- | ------- | ----------------------------------- | ------ |
| `/api/tunnels/cloudflared`            | `GET`   | —                                   | beheer |
| `/api/tunnels/cloudflared`            | `POST`  | `{action: "enable" \| "disable"}`   | beheer |
| `/api/tunnels/ngrok`                  | `GET`   | —                                   | beheer |
| `/api/tunnels/ngrok`                  | `POST`  | `{action, authToken?}`              | beheer |
| `/api/tunnels/tailscale`              | `GET`   | —                                   | beheer |
| `/api/tunnels/tailscale/check`        | `GET`   | —                                   | beheer |
| `/api/tunnels/tailscale/install`      | `POST`  | `{sudoPassword?}` (SSE)             | beheer |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | `{sudoPassword?}`                   | beheer |
| `/api/tunnels/tailscale/login`        | `POST`  | `{hostname?}`                       | beheer |
| `/api/tunnels/tailscale/enable`       | `POST`  | `{sudoPassword?, hostname?, port?}` | beheer |
| `/api/tunnels/tailscale/disable`      | `POST`  | `{sudoPassword?}`                   | beheer |

Er is geen centraal endpoint `/api/settings/tunnels` — elke backend werkt
onafhankelijk.

## Aandachtspunten voor OAuth-callbacks

Wanneer u OmniRoute via een tunnel beschikbaar maakt, moeten het dashboard en de OAuth-stromen
callback-URL's samenstellen op basis van de **publieke** hostnaam, niet van `localhost`. Anders
leidt de OAuth-provider de gebruiker terug naar een URL die niet bereikbaar is voor de servers van de provider,
waardoor de handshake mislukt.

Voor bewerkingen in het dashboard en het opslaan van instellingen hoeft de hostnaam van de tunnel niet in
`NEXT_PUBLIC_BASE_URL` te worden vastgelegd. Het geauthenticeerde dashboard verzendt onveilige verzoeken naar
dezelfde oorsprong met een sessiegebonden CSRF-token, zodat tijdelijke Cloudflare Quick Tunnel-
hosts na het inloggen nog steeds kunnen worden gebruikt voor normaal beheer via de gebruikersinterface.

Stel het volgende in:

```bash
NEXT_PUBLIC_BASE_URL=https://<uw-tunnel-host>
```

en start OmniRoute opnieuw voordat u OAuth initialiseert. Bij tijdelijke Cloudflare Quick
Tunnels verandert de URL na elke herstart. Geef daarom voor productiegebruik van OAuth de voorkeur aan ngrok met een gereserveerd
domein of Tailscale Funnel.

## Status en monitoring

Het dashboard toont de tunnelstatus onder **Instellingen → Tunnels**:

- Actieve backend(s) en de huidige `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- De huidige publieke URL en de afgeleide API-URL (`<publicUrl>/v1`).
- De lokale doel-URL waarnaar de tunnel doorstuurt.
- Het laatste foutbericht, indien aanwezig.

Voor programmatische monitoring kunt u de `GET`-endpoints per backend pollen. Het is toegestaan om meer
dan één backend tegelijk uit te voeren; OmniRoute houdt elke backend
onafhankelijk bij.

## Problemen oplossen

### "cloudflared-binary niet gevonden"

OmniRoute probeert bij het eerste gebruik automatisch een installatie uit te voeren. Als de installatie wordt geblokkeerd
(beperkt netwerk, geen toegang tot GitHub), downloadt u `cloudflared` handmatig van
<https://github.com/cloudflare/cloudflared/releases> en stelt u
`CLOUDFLARED_BIN=/path/to/cloudflared` in.

### "ngrok: authtoken vereist"

`phase: "needs_auth"` betekent dat er geen authtoken is gevonden. Stel `NGROK_AUTHTOKEN` in
`.env` in, configureer het via het dashboard of geef `authToken` door in de body van het POST-verzoek
voor inschakeling.

### "tailscale: funnel niet ingeschakeld"

Wanneer het antwoord op het inschakelverzoek `funnelNotEnabled: true` bevat, is Funnel uitgeschakeld
voor uw tailnet. Open de geretourneerde `enableUrl` (of de functiepagina in de beheerconsole)
en schakel Funnel in.

### Wijzigingen in de tunnel-URL verstoren OAuth

Gebruik ngrok met een gereserveerd domein of Tailscale Funnel (beide stabiel per node).
Cloudflare Quick Tunnels zijn van nature tijdelijk en worden niet aanbevolen voor
langdurig gebruikte OAuth-callbacks.

### Toegang geweigerd op Linux/macOS voor Tailscale

`tailscaled` heeft rootrechten nodig. Geef `sudoPassword` door aan het relevante POST-endpoint,
of voer de daemon zelf uit (`sudo systemctl start tailscaled`).

## Zie ook

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — uitgaande proxy (1proxy, SOCKS5, HTTP) voor
  uitgaand verkeer.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — volledige lijst met omgevingsvariabelen, waaronder
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternatieven voor tunneling voor stabiele
  openbare hosting.
- Bron: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
