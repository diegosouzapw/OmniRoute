# Tunnels Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Sandhedskilde:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute kan eksponere sin lokale server (`http://localhost:20128`) på det offentlige
internet via tre tunnelbackends. Dette er nyttigt til:

- OAuth-callbacks fra cloududbydere (Antigravity, Gemini, Cursor), der kræver en
  offentligt tilgængelig omdirigerings-URL.
- Deling af din lokale instans med teammedlemmer uden at implementere en VM.
- Test på mobilenheder, eksternt eller på tværs af netværk.

Alle tre backends administreres i processen — OmniRoute starter/stopper den underliggende
binære fil eller SDK fra kontrolpanelet eller REST-API'en. Der kræves ingen opsætning
af reverse proxy eller systemd.

## Kort overblik over backends

| Backend                     | Persistens                                                         | Pris                   | Opsætning                                             |
| --------------------------- | ------------------------------------------------------------------ | ---------------------- | ----------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Midlertidig (URL'en ændres ved hver genstart)                      | Gratis                 | Ingen — installerer automatisk `cloudflared`          |
| **ngrok**                   | Stabil, når et betalt abonnement eller fast domæne er konfigureret | Gratis niveau + betalt | Kræver ngrok-konto + authtoken                        |
| **Tailscale Funnel**        | Stabil pr. node i dit tailnet                                      | Gratis til privat brug | Kræver installation af Tailscale + login + Funnel-ACL |

Implementeringerne findes i `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` og `src/lib/tailscaleTunnel.ts`. Alle tre returnerer et
ensartet `status`-objekt med felterne `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` og `lastError`, så kontrolpanelet kan vise dem på samme måde.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` kører `cloudflared` som en underordnet proces. Den understøtter
to tilstande, som vælges ud fra, om der er angivet en konfiguration til en navngivet tunnel:

- **Quick tunnel (standard).** Kører `cloudflared tunnel --url
http://localhost:<apiPort>` og fortolker den tildelte `*.trycloudflare.com`-URL
  fra stdout. URL'er er midlertidige og ændres ved hver genstart.
- **Navngivet tunnel (valgfri).** Når `CLOUDFLARED_CONFIG` peger på en lokalt administreret
  cloudflared-`config.yml`, kører OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run`, hvilket giver dig et **stabilt, navngivet værtsnavn**. Konfigurationen
  angiver tunnelens UUID, `credentials-file` og `ingress`-routing, så der ikke
  videregives nogen `--url`, og der ikke kræves noget token til Zero Trust-kontrolpanelet. `run` læser
  legitimationsoplysninger fra konfigurationens absolutte `credentials-file`-sti — der kræves ingen `cert.pem`
  (den bruges kun til administration af tunnelens livscyklus).

Vigtig funktionsmåde:

- **Automatisk installation.** Ved første brug downloader OmniRoute den nyeste binære `cloudflared`-fil
  fra de officielle GitHub-udgivelser (den administrerede installation findes under
  `DATA_DIR/cloudflared/`). SHA256 for det downloadede aktiv verificeres mod
  udgivelsesmanifestet før kørsel.
- **Procesovervågning.** cloudflared-processens PID og den fundne URL gemmes i
  `quick-tunnel-state.json`, så kontrolpanelet kan genoptage status på tværs af genindlæsninger.

### Opsætning af navngivet tunnel (stabilt værtsnavn)

1. Opret en lokalt administreret tunnel med cloudflared-CLI'en (én gang):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Opret en `~/.cloudflared/config.yml`, der dirigerer dit værtsnavn til OmniRoutes lokale
   API-port (standard er 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Peg OmniRoute på konfigurationen, og (gen)start tunnelen:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # valgfrit — tilsidesætter det værtsnavn, OmniRoute rapporterer; ellers læses det fra
   # konfigurationens første ingress-regel:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Aktivér tunnelen på samme måde som en quick tunnel (REST / kontrolpanel / CLI
   nedenfor). En navngivet tunnel udsender ingen offentlig URL, der kan udtrækkes, så parathed registreres
   ud fra cloudflareds registrerede edge-forbindelse, og `publicUrl`/`apiUrl`
   rapporteres fra `CLOUDFLARED_HOSTNAME` (eller konfigurationens første ingress-værtsnavn).

### Aktivér/deaktivér via REST

Endpointet bruger en body af typen `{action: "enable" | "disable"}`, ikke separate
`start`/`stop`-stier. Administrationsgodkendelse (administratorsession eller administrator-API-nøgle) er
påkrævet.

```bash
# Aktivér
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Deaktivér
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Eller via kontrolpanelet: **Indstillinger → Tunneler → Cloudflare**.

### Valgfrie miljøvariabler

| Variabel                                             | Formål                                                                                                                                                                                        |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Tilsidesæt stien til den binære fil. Hvis den er angivet og gyldig, bruger OmniRoute den i stedet for at downloade.                                                                           |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportprotokol (standard: `http2`; også `quic`, `auto`).                                                                                                                                   |
| `CLOUDFLARED_CONFIG`                                 | Sti til en lokalt administreret cloudflared-`config.yml`. Når den er angivet, kører OmniRoute en **navngivet/permanent** tunnel (`tunnel --config <path> run`) i stedet for en hurtig tunnel. |
| `CLOUDFLARED_HOSTNAME`                               | Tilsidesætter den navngivne tunnels rapporterede offentlige værtsnavn (f.eks. `ai.example.com`). Når den ikke er angivet, læses værtsnavnet fra konfigurationens første `ingress`-post.       |

## 2. ngrok

`src/lib/ngrokTunnel.ts` bruger **`@ngrok/ngrok`-SDK'et** (i processen, ingen CLI-underproces). Det oprindelige modul importeres først ved første start, så platforme uden prækompilerede binære filer ikke får appen til at fejle under opstart.

### Forudsætninger

1. Opret en konto på <https://ngrok.com>.
2. Kopiér dit authtoken fra ngrok-kontrolpanelet.
3. Angiv det enten via:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, eller
   - Kontrolpanel: **Indstillinger → Tunneler → ngrok**, eller
   - REST-body (engangsbrug): `{"action":"enable","authToken":"<token>"}`.

Hvis ingen af delene er konfigureret, returnerer status `phase: "needs_auth"`.

### Aktivér/deaktivér via REST

```bash
# Aktivér (bruger NGROK_AUTHTOKEN fra miljøet)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Aktivér med indlejret token
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Deaktivér
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Svaret indeholder den tildelte `publicUrl` (f.eks. `https://abcd-1234.ngrok-free.app`). Brugerdefinerede domæner, regioner og politikregler skal konfigureres i ngrok-kontrolpanelet — OmniRoute videresender kun den lokale destinations-URL til SDK'et.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` orkestrerer systemets `tailscale`-CLI for at eksponere den lokale API-port via **Funnel** (Tailscales udgående forbindelse til det offentlige internet for serve). Den understøtter hele livscyklussen: installation, login, start af daemon, aktivering og deaktivering.

Implementeringen kalder `tailscale funnel --bg <port>` (baggrundstilstand). Den offentlige URL har formen `https://<machine>.<tailnet>.ts.net/`.

### Forudsætninger

1. Installér Tailscale (eller lad OmniRoute gøre det — se `install`-slutpunktet nedenfor).
2. Log ind (`tailscale login` eller via OmniRoutes `login`-slutpunkt).
3. Aktivér Funnel for dit tailnet i Tailscale-administrationskonsollen:
   <https://login.tailscale.com/admin/settings/features>.

På Linux og macOS kræver daemonen (`tailscaled`) `sudo` for at kunne styres. POST-slutpunkterne accepterer et valgfrit `sudoPassword`-felt, som videresendes til OmniRoutes MITM-adgangskodecache (`getCachedPassword` / `setCachedPassword`) under kaldets varighed. Windows bruger standardinstallationen af tjenesten på `C:\Program Files\Tailscale\tailscale.exe`.

### REST-slutpunkter

Tailscale har en mere omfattende grænseflade end de øvrige backends, fordi installation, login, daemon og tunnel er separate funktioner.

| Slutpunkt                             | Metode | Formål                                                                  |
| ------------------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Samlet tunnelstatus (`phase`, `tunnelUrl`, `apiUrl` osv.)               |
| `/api/tunnels/tailscale/check`        | `GET`  | Kontrol på lavere niveau: installeret? logget ind? kører daemonen?      |
| `/api/tunnels/tailscale/install`      | `POST` | Installér Tailscale (SSE-streamede statushændelser) — Linux/macOS       |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Start `tailscaled` på Linux/macOS                                       |
| `/api/tunnels/tailscale/login`        | `POST` | Start loginprocessen; returnerer `authUrl`, som skal åbnes i en browser |
| `/api/tunnels/tailscale/enable`       | `POST` | Start Funnel for API-porten                                             |
| `/api/tunnels/tailscale/disable`      | `POST` | Stop Funnel                                                             |

Alle Tailscale-slutpunkter kræver administrationsgodkendelse (se `routeUtils.ts :: requireTailscaleAuth`).

Eksempel på aktivering:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Hvis Funnel ikke er aktiveret i administrationskonsollen, indeholder svaret `funnelNotEnabled: true` samt en `enableUrl`, der skal åbnes i en browser.

### Valgfrie miljøvariabler

| Variabel        | Formål                                          |
| --------------- | ----------------------------------------------- |
| `TAILSCALE_BIN` | Tilsidesæt stien til den binære `tailscale`-fil |

## Oversigt over endpoints

| Endpoint                              | Metode | Body                                | Godkendelse    |
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

Der findes ikke et centralt `/api/settings/tunnels`-endpoint — hver backend er
uafhængig.

## Overvejelser vedrørende OAuth-callback

Når du gør OmniRoute tilgængelig via en tunnel, skal dashboardet og OAuth-flows
opbygge callback-URL'er ud fra det **offentlige** værtsnavn og ikke `localhost`.
Ellers omdirigerer OAuth-udbyderen brugeren tilbage til en URL, som udbyderens
servere ikke kan nå, og handshaket mislykkes.

Redigeringer i dashboardet og lagring af indstillinger kræver ikke, at tunnelens
værtsnavn fastlåses i `NEXT_PUBLIC_BASE_URL`. Det godkendte dashboard sender
usikre forespørgsler med samme oprindelse og en sessionsbundet CSRF-token, så
midlertidige Cloudflare Quick Tunnel-værter stadig kan bruges til normal
administration via brugergrænsefladen efter login.

Indstil:

```bash
NEXT_PUBLIC_BASE_URL=https://<din-tunnelvært>
```

og genstart OmniRoute, før OAuth startes. For midlertidige Cloudflare Quick
Tunnels ændres URL'en efter hver genstart, så brug helst ngrok med et reserveret
domæne eller Tailscale Funnel til OAuth i produktion.

## Tilstand og overvågning

Dashboardet viser tunnelstatus under **Indstillinger → Tunneler**:

- Aktive backends og aktuel `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Den aktuelle offentlige URL og den afledte API-URL (`<publicUrl>/v1`).
- Den lokale destinations-URL, som tunnelen videresender til.
- Seneste fejlmeddelelse, hvis der er en.

Til programmatisk overvågning skal du forespørge de enkelte backends'
`GET`-endpoints. Det er tilladt at køre mere end én backend samtidigt;
OmniRoute sporer hver af dem uafhængigt.

## Fejlfinding

### "cloudflared-binærfilen blev ikke fundet"

OmniRoute forsøger at installere den automatisk ved første brug. Hvis
installationen blokeres (begrænset netværk, ingen adgang til GitHub), skal du
downloade `cloudflared` manuelt fra
<https://github.com/cloudflare/cloudflared/releases> og indstille
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken er påkrævet"

`phase: "needs_auth"` betyder, at der ikke blev fundet en authtoken. Indstil
`NGROK_AUTHTOKEN` i `.env`, konfigurer den via dashboardet, eller angiv
`authToken` i enable-POST-bodyen.

### "tailscale: funnel er ikke aktiveret"

Når enable-svaret indeholder `funnelNotEnabled: true`, er Funnel deaktiveret for
dit tailnet. Åbn den returnerede `enableUrl` (eller funktionssiden i
administrationskonsollen), og slå Funnel til.

### Ændringer af tunnel-URL'en får OAuth til at holde op med at virke

Brug ngrok med et reserveret domæne eller Tailscale Funnel (begge er stabile pr.
node). Cloudflare Quick Tunnels er midlertidige af design og anbefales ikke til
længerevarende OAuth-callbacks.

### Adgang nægtet på Linux/macOS for Tailscale

`tailscaled` kræver root-rettigheder. Angiv `sudoPassword` til det relevante
POST-endpoint, eller kør selv dæmonen (`sudo systemctl start tailscaled`).

## Se også

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — udgående proxy (1proxy, SOCKS5, HTTP) til
  udgående trafik.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — komplet liste over miljøvariabler, herunder
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternativer til tunneling for stabil
  offentlig hosting.
- Kilde: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
