# Tunnels Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Sanningskälla:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute kan exponera sin lokala server (`http://localhost:20128`) mot det
offentliga internet via tre tunnelbackend-system. Detta är användbart för:

- OAuth-callbackar från molnleverantörer (Antigravity, Gemini, Cursor) som behöver
  en offentligt åtkomlig omdirigerings-URL.
- Att dela din lokala instans med teammedlemmar utan att distribuera en VM.
- Testning från mobila enheter, på distans eller över olika nätverk.

Alla tre backend-system hanteras i processen — OmniRoute startar/stoppar den
underliggande binärfilen eller SDK:n från kontrollpanelen eller REST-API:t. Ingen
konfiguration av reverse proxy eller systemd krävs.

## Backend-system i korthet

| Backend                     | Beständighet                                               | Kostnad                     | Konfiguration                                           |
| --------------------------- | ---------------------------------------------------------- | --------------------------- | ------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Tillfällig (URL:en ändras vid varje omstart)               | Kostnadsfri                 | Ingen — installerar `cloudflared` automatiskt           |
| **ngrok**                   | Stabil när en betalplan eller fast domän har konfigurerats | Gratisnivå + betalplan      | Kräver ngrok-konto + authtoken                          |
| **Tailscale Funnel**        | Stabil per nod inom ditt tailnet                           | Kostnadsfri för privat bruk | Kräver Tailscale-installation + inloggning + Funnel-ACL |

Implementeringarna finns i `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` och `src/lib/tailscaleTunnel.ts`. Alla tre returnerar
ett likformigt `status`-objekt med fälten `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` och `lastError`, så att kontrollpanelen kan återge dem på
ett enhetligt sätt.

## 1. Cloudflare Tunnel (Quick Tunnel + namngiven tunnel)

`src/lib/cloudflaredTunnel.ts` kör `cloudflared` som en underordnad process. Den
stöder två lägen, som väljs beroende på om en konfiguration för en namngiven
tunnel har angetts:

- **Snabbtunnel (standard).** Kör `cloudflared tunnel --url
http://localhost:<apiPort>` och tolkar den tilldelade `*.trycloudflare.com`-URL:en
  från stdout. URL:erna är tillfälliga och ändras vid varje omstart.
- **Namngiven tunnel (valfritt).** När `CLOUDFLARED_CONFIG` pekar på en lokalt
  hanterad `config.yml` för cloudflared kör OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run`, vilket ger dig ett **stabilt, namngivet värdnamn**.
  Konfigurationen anger tunnelns UUID, `credentials-file` och `ingress`-routning,
  så ingen `--url` skickas och ingen token från Zero Trust-kontrollpanelen krävs.
  `run` läser autentiseringsuppgifterna från den absoluta sökvägen för
  `credentials-file` i konfigurationen — ingen `cert.pem` behövs (den används
  endast för hantering av tunnelns livscykel).

Viktiga beteenden:

- **Automatisk installation.** Vid första användningen hämtar OmniRoute den
  senaste binärfilen för `cloudflared` från de officiella GitHub-utgåvorna (den
  hanterade installationen finns under `DATA_DIR/cloudflared/`). SHA256 för den
  hämtade resursen verifieras mot utgåvans manifest före körning.
- **Processövervakning.** Cloudflared-processens PID och den fastställda URL:en
  sparas i `quick-tunnel-state.json` så att kontrollpanelen kan återuppta
  statusvisningen efter omladdningar.

### Konfiguration av namngiven tunnel (stabilt värdnamn)

1. Skapa en lokalt hanterad tunnel med cloudflared CLI (en gång):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Skapa en `~/.cloudflared/config.yml` som dirigerar ditt värdnamn till
   OmniRoutes lokala API-port (standard är 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Peka OmniRoute mot konfigurationen och starta (om) tunneln:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # valfritt — åsidosätter värdnamnet som OmniRoute rapporterar; annars läses det från
   # konfigurationens första ingress-regel:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Aktivera tunneln på samma sätt som en snabbtunnel (REST/kontrollpanel/CLI
   nedan). En namngiven tunnel skriver inte ut någon offentlig URL som kan
   extraheras, så beredskap identifieras från cloudflareds registrerade
   edge-anslutning, och `publicUrl`/`apiUrl` rapporteras från
   `CLOUDFLARED_HOSTNAME` (eller konfigurationens första ingress-värdnamn).

### Aktivera/inaktivera via REST

Slutpunkten använder en kropp i formatet `{action: "enable" | "disable"}`, inte
separata sökvägar för `start`/`stop`. Hanteringsautentisering (administratörssession
eller API-nyckel för administratör) krävs.

```bash
# Aktivera
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Inaktivera
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Eller via kontrollpanelen: **Inställningar → Tunnlar → Cloudflare**.

### Valfria miljövariabler

| Variabel                                             | Syfte                                                                                                                                                                                     |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Åsidosätter sökvägen till binärfilen. Om den är angiven och giltig använder OmniRoute den i stället för att ladda ned.                                                                    |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportprotokoll (standardvärde `http2`; även `quic`, `auto`).                                                                                                                          |
| `CLOUDFLARED_CONFIG`                                 | Sökväg till en lokalt hanterad cloudflared-`config.yml`. När den är angiven kör OmniRoute en **namngiven/persistent** tunnel (`tunnel --config <path> run`) i stället för en snabbtunnel. |
| `CLOUDFLARED_HOSTNAME`                               | Åsidosätter den namngivna tunnelns rapporterade offentliga värdnamn (t.ex. `ai.example.com`). Om den inte är angiven läses värdnamnet från den första `ingress`-posten i konfigurationen. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` använder **`@ngrok/ngrok` SDK** (i processen, ingen CLI-underprocess). Den inbyggda modulen importeras först vid den första starten så att plattformar utan förkompilerade binärfiler inte gör att appen slutar fungera vid uppstart.

### Förutsättningar

1. Registrera dig på <https://ngrok.com>.
2. Kopiera din authtoken från ngrok-instrumentpanelen.
3. Ange den på något av följande sätt:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, eller
   - Instrumentpanelen: **Inställningar → Tunnlar → ngrok**, eller
   - REST-body (engångsanrop): `{"action":"enable","authToken":"<token>"}`.

Om inget av alternativen är konfigurerat returnerar statusen `phase: "needs_auth"`.

### Aktivera/inaktivera via REST

```bash
# Aktivera (använder NGROK_AUTHTOKEN från miljön)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Aktivera med token direkt i anropet
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Inaktivera
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Svaret innehåller den tilldelade `publicUrl` (t.ex. `https://abcd-1234.ngrok-free.app`). Anpassade domäner, regioner och policyregler måste konfigureras i ngrok-instrumentpanelen – OmniRoute vidarebefordrar endast den lokala mål-URL:en till SDK:t.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` styr systemets `tailscale`-CLI för att exponera den lokala API-porten via **Funnel** (Tailscales utgående anslutning till det offentliga internet för serve). Den stöder hela livscykeln: installation, inloggning, start av daemon, aktivering och inaktivering.

Implementationen anropar `tailscale funnel --bg <port>` (bakgrundsläge). Den offentliga URL:en har formatet `https://<machine>.<tailnet>.ts.net/`.

### Förutsättningar

1. Installera Tailscale (eller låt OmniRoute göra det – se `install`-endpointen nedan).
2. Logga in (`tailscale login` eller via OmniRoutes `login`-endpoint).
3. Aktivera Funnel för ditt tailnet i Tailscales administratörskonsol:
   <https://login.tailscale.com/admin/settings/features>.

På Linux och macOS kräver daemonen (`tailscaled`) `sudo` för styrning. POST-endpointarna accepterar ett valfritt `sudoPassword`-fält som vidarebefordras till OmniRoutes MITM-lösenordscache (`getCachedPassword` / `setCachedPassword`) under anropets varaktighet. Windows använder standardinstallationen av tjänsten i `C:\Program Files\Tailscale\tailscale.exe`.

### REST-endpointar

Tailscale har ett mer omfattande gränssnitt än de andra backend-systemen eftersom installation, inloggning, daemon och tunnel hanteras separat.

| Endpoint                              | Metod  | Syfte                                                                     |
| ------------------------------------- | ------ | ------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Aggregerad tunnelstatus (`phase`, `tunnelUrl`, `apiUrl` osv.)             |
| `/api/tunnels/tailscale/check`        | `GET`  | Kontroll på lägre nivå: installerat? inloggad? körs daemonen?             |
| `/api/tunnels/tailscale/install`      | `POST` | Installera Tailscale (SSE-strömmade förloppshändelser) – Linux/macOS      |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Starta `tailscaled` på Linux/macOS                                        |
| `/api/tunnels/tailscale/login`        | `POST` | Starta inloggningsflödet; returnerar `authUrl` som öppnas i en webbläsare |
| `/api/tunnels/tailscale/enable`       | `POST` | Starta Funnel för API-porten                                              |
| `/api/tunnels/tailscale/disable`      | `POST` | Stoppa Funnel                                                             |

Alla Tailscale-endpointar kräver hanteringsautentisering (se `routeUtils.ts :: requireTailscaleAuth`).

Exempel på aktivering:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Om Funnel inte är aktiverat i administratörskonsolen innehåller svaret `funnelNotEnabled: true` samt en `enableUrl` som kan öppnas i en webbläsare.

### Valfria miljövariabler

| Variabel        | Syfte                                          |
| --------------- | ---------------------------------------------- |
| `TAILSCALE_BIN` | Åsidosätt sökvägen till binärfilen `tailscale` |

## Sammanfattning av endpoints

| Endpoint                              | Metod  | Body                                | Autentisering  |
| ------------------------------------- | ------ | ----------------------------------- | -------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | administration |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | administration |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | administration |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | administration |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | administration |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | administration |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | administration |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | administration |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | administration |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | administration |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | administration |

Det finns ingen central endpoint `/api/settings/tunnels` – varje backend är
fristående.

## Att tänka på för OAuth-callback

När du exponerar OmniRoute via en tunnel måste instrumentpanelen och OAuth-flödena
skapa callback-URL:er baserat på det **publika** värdnamnet, inte `localhost`. Annars
omdirigerar OAuth-leverantören användaren tillbaka till en URL som dess servrar inte
kan nå, och handskakningen misslyckas.

Ändringar och sparade inställningar i instrumentpanelen kräver inte att tunnelns
värdnamn anges i `NEXT_PUBLIC_BASE_URL`. Den autentiserade instrumentpanelen skickar
osäkra begäranden till samma ursprung med en sessionsbunden CSRF-token, så tillfälliga
Cloudflare Quick Tunnel-värdar kan fortfarande användas för normal administration via
användargränssnittet efter inloggning.

Ange:

```bash
NEXT_PUBLIC_BASE_URL=https://<din-tunnelvärd>
```

och starta om OmniRoute innan OAuth initieras. För tillfälliga Cloudflare Quick
Tunnels ändras URL:en efter varje omstart, så använd helst ngrok med en reserverad
domän eller Tailscale Funnel för OAuth i produktion.

## Hälsa och övervakning

Instrumentpanelen visar tunnelstatus under **Inställningar → Tunnlar**:

- Aktiva backends och aktuell `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Aktuell publik URL och den härledda API-URL:en (`<publicUrl>/v1`).
- Den lokala mål-URL som tunneln vidarebefordrar till.
- Det senaste felmeddelandet, om något.

För programmatisk övervakning kan du regelbundet anropa respektive backends
`GET`-endpoint. Det är tillåtet att köra fler än en backend samtidigt. OmniRoute
spårar var och en separat.

## Felsökning

### "cloudflared binary hittades inte"

OmniRoute försöker installera automatiskt vid första användningen. Om installationen
blockeras (begränsat nätverk, ingen åtkomst till GitHub) laddar du ned `cloudflared`
manuellt från <https://github.com/cloudflare/cloudflared/releases> och anger
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken krävs"

`phase: "needs_auth"` innebär att ingen authtoken hittades. Ange `NGROK_AUTHTOKEN` i
`.env`, konfigurera den via instrumentpanelen eller skicka `authToken` i
enable-POST-bodyn.

### "tailscale: funnel är inte aktiverat"

När svaret från enable innehåller `funnelNotEnabled: true` är Funnel inaktiverat
för ditt tailnet. Öppna den returnerade `enableUrl` (eller funktionssidan i
administrationskonsolen) och aktivera Funnel.

### Ändringar av tunnel-URL:en gör att OAuth slutar fungera

Använd ngrok med en reserverad domän eller Tailscale Funnel (båda är stabila per nod).
Cloudflare Quick Tunnels är tillfälliga till sin natur och rekommenderas inte för
långlivade OAuth-callbackadresser.

### Åtkomst nekad på Linux/macOS för Tailscale

`tailscaled` kräver root-behörighet. Ange `sudoPassword` för relevant POST-endpoint,
eller kör daemonen själv (`sudo systemctl start tailscaled`).

## Se även

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — utgående proxy (1proxy, SOCKS5, HTTP) för
  utgående trafik.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — fullständig lista över miljövariabler, inklusive
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternativ till tunnling för stabil
  publik drift.
- Källa: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
