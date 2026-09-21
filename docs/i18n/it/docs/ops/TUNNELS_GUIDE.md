# Tunnels Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Fonte autorevole:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute può esporre il proprio server locale (`http://localhost:20128`) su
Internet tramite tre backend di tunneling. Questo è utile per:

- I callback OAuth dei provider cloud (Antigravity, Gemini, Cursor) che richiedono
  un URL di reindirizzamento raggiungibile pubblicamente.
- Condividere l'istanza locale con i membri del team senza distribuire una VM.
- Test da dispositivi mobili, da remoto o tra reti diverse.

Tutti e tre i backend vengono gestiti all'interno del processo: OmniRoute avvia
e arresta il file binario o l'SDK sottostante dalla dashboard o tramite l'API
REST. Non è necessaria alcuna configurazione di reverse proxy o systemd.

## Panoramica dei backend

| Backend                     | Persistenza                                                      | Costo                        | Configurazione                                             |
| --------------------------- | ---------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Effimera (l'URL cambia a ogni riavvio)                           | Gratuito                     | Nessuna — installa automaticamente `cloudflared`           |
| **ngrok**                   | Stabile se è configurato un piano a pagamento o un dominio fisso | Piano gratuito + a pagamento | Richiede un account ngrok + authtoken                      |
| **Tailscale Funnel**        | Stabile per nodo all'interno della propria tailnet               | Gratuito per uso personale   | Richiede installazione di Tailscale + accesso + ACL Funnel |

Le implementazioni si trovano in `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` e `src/lib/tailscaleTunnel.ts`. Tutte e tre restituiscono
un oggetto `status` dalla struttura comune, con i campi `phase`, `running`,
`publicUrl`, `apiUrl`, `targetUrl` e `lastError`, in modo che la dashboard possa
visualizzarle in modo uniforme.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` esegue `cloudflared` come processo figlio. Supporta
due modalità, selezionate in base alla presenza di una configurazione per un
tunnel denominato:

- **Quick tunnel (predefinito).** Esegue `cloudflared tunnel --url
http://localhost:<apiPort>` e analizza l'URL `*.trycloudflare.com` assegnato
  dall'output standard. Gli URL sono effimeri e cambiano a ogni riavvio.
- **Named tunnel (opzionale).** Quando `CLOUDFLARED_CONFIG` punta a un file
  `config.yml` di cloudflared gestito localmente, OmniRoute esegue
  `cloudflared tunnel --no-autoupdate --config <path> run`, fornendo un
  **hostname denominato e stabile**. La configurazione specifica l'UUID del
  tunnel, `credentials-file` e il routing `ingress`; pertanto non viene passato
  alcun `--url` e non è richiesto alcun token della dashboard Zero Trust. `run`
  legge le credenziali dal percorso assoluto `credentials-file` della
  configurazione: non è necessario alcun `cert.pem` (utilizzato esclusivamente
  per la gestione del ciclo di vita del tunnel).

Comportamenti principali:

- **Installazione automatica.** Al primo utilizzo, OmniRoute scarica l'ultima
  versione del file binario `cloudflared` dalle release GitHub ufficiali
  (l'installazione gestita si trova in `DATA_DIR/cloudflared/`). Prima
  dell'esecuzione, l'hash SHA256 dell'asset scaricato viene verificato rispetto
  al manifesto della release.
- **Supervisione del processo.** Il PID di cloudflared e l'URL risolto vengono
  salvati in `quick-tunnel-state.json`, affinché la dashboard possa ripristinare
  lo stato dopo un ricaricamento.

### Configurazione di un tunnel denominato (hostname stabile)

1. Creare un tunnel gestito localmente tramite la CLI di cloudflared
   (operazione una tantum):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Creare un file `~/.cloudflared/config.yml` che instradi l'hostname verso la
   porta API locale di OmniRoute (valore predefinito: 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Indicare a OmniRoute la configurazione e (ri)avviare il tunnel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # facoltativo — sostituisce l'hostname riportato da OmniRoute; altrimenti viene letto dalla
   # prima regola ingress della configurazione:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Abilitare il tunnel nello stesso modo di un quick tunnel (tramite REST,
   dashboard o CLI, come indicato di seguito). Un tunnel denominato non emette
   alcun URL pubblico da estrarre, quindi la disponibilità viene rilevata dalla
   connessione edge registrata di cloudflared, mentre `publicUrl`/`apiUrl`
   vengono ricavati da `CLOUDFLARED_HOSTNAME` (o dal primo hostname `ingress`
   della configurazione).

### Abilitazione / disabilitazione tramite REST

L'endpoint utilizza un corpo `{action: "enable" | "disable"}`, non percorsi
`start`/`stop` separati. È richiesta l'autenticazione di gestione (sessione
amministratore o chiave API amministratore).

```bash
# Abilita
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Stato
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Disabilita
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Oppure tramite la dashboard: **Impostazioni → Tunnel → Cloudflare**.

### Variabili d'ambiente facoltative

| Variabile                                            | Scopo                                                                                                                                                                                          |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Sovrascrive il percorso del binario. Se impostato e valido, OmniRoute lo utilizza invece di scaricarlo.                                                                                        |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protocollo di trasporto (predefinito: `http2`; disponibili anche `quic`, `auto`).                                                                                                              |
| `CLOUDFLARED_CONFIG`                                 | Percorso di un file `config.yml` di cloudflared gestito localmente. Se impostato, OmniRoute esegue un tunnel **con nome/persistente** (`tunnel --config <path> run`) anziché un tunnel rapido. |
| `CLOUDFLARED_HOSTNAME`                               | Sovrascrive il nome host pubblico segnalato dal tunnel con nome (ad es. `ai.example.com`). Se non impostato, viene letto dal primo nome host `ingress` della configurazione.                   |

## 2. ngrok

`src/lib/ngrokTunnel.ts` utilizza l'**SDK `@ngrok/ngrok`** (in-process, senza sottoprocessi CLI). Il modulo nativo viene importato in modo lazy al primo avvio, così le piattaforme prive di binari precompilati non causano l'arresto dell'app durante l'avvio.

### Prerequisiti

1. Registrati su <https://ngrok.com>.
2. Copia il tuo authtoken dalla dashboard di ngrok.
3. Forniscilo tramite una delle seguenti opzioni:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, oppure
   - Dashboard: **Impostazioni → Tunnel → ngrok**, oppure
   - Corpo REST (singolo utilizzo): `{"action":"enable","authToken":"<token>"}`.

Se non è configurata nessuna delle due opzioni, lo stato restituisce `phase: "needs_auth"`.

### Abilitazione/disabilitazione tramite REST

```bash
# Abilita (utilizza NGROK_AUTHTOKEN dall'ambiente)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Abilita con un token inline
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Stato
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Disabilita
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

La risposta include il `publicUrl` assegnato (ad es. `https://abcd-1234.ngrok-free.app`). I domini personalizzati, le regioni e le regole dei criteri devono essere configurati nella dashboard di ngrok: OmniRoute inoltra all'SDK soltanto l'URL di destinazione locale.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` orchestra la CLI di sistema `tailscale` per esporre la porta API locale tramite **Funnel** (l'uscita verso Internet pubblico di Tailscale per serve). Supporta l'intero ciclo di vita: installazione, accesso, avvio del daemon, abilitazione e disabilitazione.

L'implementazione esegue `tailscale funnel --bg <port>` (modalità in background). L'URL pubblico ha la forma `https://<machine>.<tailnet>.ts.net/`.

### Prerequisiti

1. Installa Tailscale (oppure lascia che lo faccia OmniRoute; consulta l'endpoint `install` qui sotto).
2. Accedi (`tailscale login` oppure tramite l'endpoint `login` di OmniRoute).
3. Abilita Funnel per la tua tailnet nella console di amministrazione di Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Su Linux e macOS, il daemon (`tailscaled`) richiede `sudo` per essere controllato. Gli endpoint POST accettano un campo facoltativo `sudoPassword`, che viene inoltrato alla cache delle password MITM di OmniRoute (`getCachedPassword` / `setCachedPassword`) per la durata della chiamata. Windows utilizza l'installazione predefinita del servizio in `C:\Program Files\Tailscale\tailscale.exe`.

### Endpoint REST

Tailscale offre una superficie più ampia rispetto agli altri backend, poiché installazione, accesso, daemon e tunnel sono aspetti separati.

| Endpoint                              | Metodo | Scopo                                                                          |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------ |
| `/api/tunnels/tailscale`              | `GET`  | Stato aggregato del tunnel (`phase`, `tunnelUrl`, `apiUrl`, ecc.)              |
| `/api/tunnels/tailscale/check`        | `GET`  | Controllo di basso livello: installato? accesso effettuato? daemon attivo?     |
| `/api/tunnels/tailscale/install`      | `POST` | Installa Tailscale (eventi di avanzamento trasmessi tramite SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Avvia `tailscaled` su Linux/macOS                                              |
| `/api/tunnels/tailscale/login`        | `POST` | Avvia il flusso di accesso; restituisce `authUrl` da aprire in un browser      |
| `/api/tunnels/tailscale/enable`       | `POST` | Avvia Funnel per la porta API                                                  |
| `/api/tunnels/tailscale/disable`      | `POST` | Arresta Funnel                                                                 |

Tutti gli endpoint Tailscale richiedono l'autenticazione di gestione (consulta `routeUtils.ts :: requireTailscaleAuth`).

Esempio di abilitazione:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Se Funnel non è abilitato nella console di amministrazione, la risposta include `funnelNotEnabled: true` insieme a un `enableUrl` da aprire in un browser.

### Variabili d'ambiente facoltative

| Variabile       | Scopo                                           |
| --------------- | ----------------------------------------------- |
| `TAILSCALE_BIN` | Sovrascrive il percorso del binario `tailscale` |

## Riepilogo degli endpoint

| Endpoint                              | Metodo | Corpo                               | Autenticazione |
| ------------------------------------- | ------ | ----------------------------------- | -------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | gestione       |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | gestione       |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | gestione       |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | gestione       |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | gestione       |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | gestione       |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | gestione       |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | gestione       |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | gestione       |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | gestione       |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | gestione       |

Non esiste un endpoint centrale `/api/settings/tunnels`: ogni backend è
indipendente.

## Considerazioni sul callback OAuth

Quando esponi OmniRoute tramite un tunnel, la dashboard e i flussi OAuth devono
creare gli URL di callback usando il nome host **pubblico**, non `localhost`. In
caso contrario, il provider OAuth reindirizza l'utente a un URL che i suoi server
non possono raggiungere e l'handshake non riesce.

Le modifiche dalla dashboard e il salvataggio delle impostazioni non richiedono
che il nome host del tunnel sia fissato in `NEXT_PUBLIC_BASE_URL`. La dashboard
autenticata invia le richieste non sicure alla stessa origine con un token CSRF
associato alla sessione, quindi gli host temporanei dei Cloudflare Quick Tunnel
possono comunque essere utilizzati per la normale gestione dell'interfaccia
utente dopo l'accesso.

Imposta:

```bash
NEXT_PUBLIC_BASE_URL=https://<host-del-tunnel>
```

e riavvia OmniRoute prima di avviare OAuth. Per i Cloudflare Quick Tunnel
temporanei, l'URL cambia dopo ogni riavvio, quindi per l'uso di OAuth in
produzione è preferibile ngrok con un dominio riservato oppure Tailscale Funnel.

## Integrità e monitoraggio

La dashboard mostra lo stato del tunnel in **Impostazioni → Tunnel**:

- Backend attivi e `phase` corrente (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- L'URL pubblico corrente e l'URL API derivato (`<publicUrl>/v1`).
- L'URL di destinazione locale al quale il tunnel inoltra il traffico.
- L'ultimo messaggio di errore, se presente.

Per il monitoraggio programmatico, interroga periodicamente gli endpoint `GET`
di ciascun backend. È consentito eseguire più backend contemporaneamente;
OmniRoute terrà traccia di ciascuno in modo indipendente.

## Risoluzione dei problemi

### "file binario cloudflared non trovato"

OmniRoute tenta l'installazione automatica al primo utilizzo. Se l'installazione
è bloccata (rete con restrizioni, nessun accesso a GitHub), scarica manualmente
`cloudflared` da <https://github.com/cloudflare/cloudflared/releases> e imposta
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken obbligatorio"

`phase: "needs_auth"` indica che non è stato trovato alcun authtoken. Imposta
`NGROK_AUTHTOKEN` in `.env`, configuralo tramite la dashboard oppure passa
`authToken` nel corpo della richiesta POST di abilitazione.

### "tailscale: funnel non abilitato"

Quando la risposta di abilitazione include `funnelNotEnabled: true`, Funnel è
disabilitato per la tua tailnet. Apri l'`enableUrl` restituito (oppure la pagina
della funzionalità nella console di amministrazione) e abilita Funnel.

### Le modifiche all'URL del tunnel interrompono OAuth

Usa ngrok con un dominio riservato oppure Tailscale Funnel (entrambi stabili per
ogni nodo). I Cloudflare Quick Tunnel sono temporanei per progettazione e non
sono consigliati per callback OAuth di lunga durata.

### Autorizzazione negata su Linux/macOS per Tailscale

`tailscaled` richiede privilegi di root. Fornisci `sudoPassword` all'endpoint
POST pertinente oppure avvia autonomamente il daemon
(`sudo systemctl start tailscaled`).

## Vedi anche

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy in uscita (1proxy, SOCKS5, HTTP) per il
  traffico in uscita.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — elenco completo delle variabili d'ambiente, inclusa
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternative al tunneling per un hosting
  pubblico stabile.
- Sorgente: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
