# 🐳 Docker Guide — OmniRoute (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Riferimento completo per il deployment con Docker. Per iniziare rapidamente, consulta la [sezione Docker del README](../README.md#-docker).

## Indice

- [Avvio rapido](#quick-run)
- [Con file di ambiente](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profili disponibili](#available-profiles)
- [Configurazione degli strumenti CLI dell'host quando OmniRoute viene eseguito in Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar Redis](#redis-sidecar)
- [Compose per la produzione](#production-compose)
- [Stage del Dockerfile](#dockerfile-stages)
- [Variabili di ambiente critiche](#critical-environment-variables)
- [Docker Compose con Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Tunnel rapido Cloudflare](#cloudflare-quick-tunnel)
- [Tag delle immagini](#image-tags)
- [Disponibilità: SQLite predefinito supporta una sola replica](#availability-default-sqlite-is-single-replica)
- [Errori regionali di Gemini all'interno di Docker](#gemini-regional-errors-inside-docker)
- [Note importanti](#important-notes)

---

## Avvio rapido

> **Vuoi eseguire il self-hosting con un solo comando?** Consulta la
> [Guida al self-hosting](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (immagine pubblicata +
> Redis, accessibile solo tramite loopback, senza scelta del profilo). L'avvio rapido riportato di seguito è il
> percorso con singolo container per gli utenti che eseguono già Redis altrove.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Con file di ambiente

```bash
# Prima copia e modifica .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Profilo base (senza strumenti CLI)
docker compose --profile base up -d

# Profilo CLI (Claude Code, Codex e OpenClaw integrati)
docker compose --profile cli up -d

# Profilo host (pensato principalmente per Linux; monta i binari CLI dell'host in sola lettura)
docker compose --profile host up -d

# Profilo web (Chromium/Playwright per i provider basati su sessioni web)
docker compose --profile web up -d

# Combina CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profili disponibili

OmniRoute include profili Compose per le principali configurazioni di deployment. Scegli quello più adatto al tuo ambiente.

| Profilo              | Servizio         | Quando utilizzarlo                                                                                                                                    | Comando                                      |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predefinito) | `omniroute-base` | Server headless / runtime minimo, senza CLI dei provider incluse                                                                                      | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Flussi di lavoro agentici che chiamano `omniroute providers/setup/doctor` e le CLI incluse (Codex, Claude Code, Droid, OpenClaw)                      | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Host Linux che richiedono un accesso simile a `network_mode` alle CLI dell'host montando `~/.local/bin`, `~/.codex`, `~/.claude` ecc. in sola lettura | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Esegue il sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sulla porta `8317` per il proxying delle CLI upstream                   | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Provider basati su sessioni web che richiedono un browser: `gemini-web`, `claude-web`, `claude-turnstile` (compila `runner-web`, Chromium incluso)    | `docker compose --profile web up -d`         |

> È possibile combinare più profili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurazione degli strumenti CLI dell'host quando OmniRoute viene eseguito in Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` e il pulsante
**Salva configurazione** della dashboard scrivono tutti file come `~/.codex/*.config.toml`. Questi percorsi
hanno significato solo sulla macchina in cui viene effettivamente eseguita la CLI. Se li esegui
all'interno del container, la scrittura avviene nella home del container (`/home/node` —
l'immagine viene eseguita con `USER node`), dove nessuna CLI dell'host li leggerà mai e da cui
vengono eliminati nel momento in cui il container viene ricreato.

OmniRoute rileva questa situazione e rifiuta la scrittura fornendo istruzioni, invece di
segnalare un'operazione riuscita che non potresti utilizzare: la CLI termina con `2` e l'API risponde `422`
con `containerEphemeralTarget: true`.

### Consigliato: esegui la CLI sull'host e OmniRoute in Docker

Il container fornisce l'API; la CLI configura gli strumenti dell'host.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # indirizza la CLI al container
omniroute setup-codex                      # scrive nella vera directory ~/.codex dell'host
```

Questa è la scelta corretta quando Codex, Claude Code, Cursor o strumenti simili vengono eseguiti sul
tuo laptop, come avviene nella configurazione abituale.

### Alternativa: monta con bind le directory di configurazione dell'host (profilo `host`)

Se vuoi che sia il container stesso a scrivere la configurazione dell'host, monta le
directory e imposta `CLI_CONFIG_HOME` sulla radice del mount. Il profilo `host`
lo fa già:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

È il bind mount a rendere affidabile il percorso: OmniRoute legge
`/proc/self/mountinfo` e consente le scritture nei percorsi montati (e nelle directory
i cui figli sono mount, che corrisponde esattamente alla struttura di `/host-home` mostrata sopra), continuando
però a rifiutarle nei percorsi non montati.

### Soluzione alternativa: configura le CLI del container stesso (da usare con cautela)

Quando le CLI si trovano effettivamente all'interno del container (profilo `cli`), la scrittura
è intenzionale. Passa `--allow-container-write` a qualsiasi comando `setup-*`, oppure imposta
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` per il server. La scrittura viene eseguita
con un avviso che informa che non sopravviverà al container.

> **Avviso di sicurezza — profilo `cli` + mount di `docker.sock`.**
> Il profilo `cli` monta tramite bind `/var/run/docker.sock` affinché il programma
> di aggiornamento automatico interno al container possa ricreare lo stack tramite il demone dell'host
> (`src/lib/system/autoUpdate.ts` verifica la presenza di tale socket e ignora il
> percorso Docker quando è assente). Quel socket rappresenta **un confine di fiducia equivalente
> all'accesso root sull'host**: qualsiasi elemento in grado di accedervi controlla il demone Docker dell'host come
> root e può creare, ispezionare, arrestare e rimuovere qualsiasi container sull'host.
> Implicazioni:
>
> 1. **Non esporre mai alla rete la porta del profilo `cli`.** Pubblicala
>    su `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — un profilo `cli` raggiungibile dalla LAN trasforma qualsiasi RCE a livello della dashboard nella
>    compromissione completa dell'host.
> 2. **Non montare tramite bind ulteriori directory dell'host nel profilo `cli`.**
>    Il socket Docker, insieme a qualsiasi mount aggiuntivo, fornisce al container accesso completo
>    in lettura e scrittura al filesystem e alla configurazione dell'host. Se uno strumento deve
>    accedere a un progetto, eseguilo localmente con il binario della CLI; non montarlo
>    nel container `cli`.
>
> Se non ti serve l'aggiornamento automatico interno al container, non attivare il profilo `cli`
> (`COMPOSE_PROFILES=core,redis` o una variante più breve). Gli altri profili non
> montano il socket Docker.
>
> Consulta `docs/security/MITM-TPROXY-DECRYPT.md` (in git; non compilato in `/docs`) per il relativo modello delle minacce
> riguardante il MITM e `docs/security/SUPPLY_CHAIN.md` per la catena di provenienza dei binari
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

OmniRoute si basa su Redis per supportare il rate limiter distribuito e la cache condivisa. Il servizio `redis` è **sempre definito** in `docker-compose.yml` (non è vincolato a un profilo) e viene avviato insieme a qualsiasi altro profilo.

| Dettaglio                    | Valore                                              |
| ---------------------------- | --------------------------------------------------- |
| Immagine                     | `redis:7-alpine`                                    |
| Nome del container           | `omniroute-redis`                                   |
| Porta interna                | `6379`                                              |
| Porta host (sovrascrivibile) | `REDIS_PORT` (valore predefinito: `6379`)           |
| Bind host (sovrascrivibile)  | `REDIS_BIND_HOST` (valore predefinito: `127.0.0.1`) |
| Volume                       | `omniroute-redis-data` → `/data`                    |
| Controllo di integrità       | `redis-cli ping` (intervallo di 10s)                |

Variabili di ambiente correlate:

- `REDIS_URL` — stringa di connessione iniettata nell'app (`redis://redis:6379` per impostazione predefinita).
- `REDIS_PORT` — mapping della porta lato host per il container Redis.
- `REDIS_BIND_HOST` — interfaccia host su cui viene pubblicata la porta. Il valore predefinito è `127.0.0.1`.

> **Perché il loopback è il valore predefinito:** il sidecar viene eseguito senza `requirepass` e i container
> dell'app lo raggiungono tramite la rete Compose (`redis:6379`); la porta pubblicata serve
> solo per gli strumenti lato host (`redis-cli`, un `npm run dev` locale). La pubblicazione su
> `0.0.0.0` esporrebbe un Redis non autenticato a ogni host della LAN. Se imposti
> `REDIS_BIND_HOST=0.0.0.0`, aggiungi anche `--requirepass` al `command:` del servizio.

**La disabilitazione di Redis** non è consigliata (il rate limiter passerà al fallback in memoria). Se necessario, rimuovi o commenta il blocco del servizio `redis:` in `docker-compose.yml`, oppure ridimensionalo a zero:

```bash
docker compose up -d --scale redis=0
```

## Compose di produzione

Per uno snapshot di produzione isolato eseguito insieme all'ambiente di sviluppo, usa `docker-compose.prod.yml`.

| Dettaglio                         | Valore                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| File                              | `docker-compose.prod.yml`                                                                      |
| Porta predefinita della dashboard | `PROD_DASHBOARD_PORT=20130` (mappata sulla porta interna `${DASHBOARD_PORT:-20128}`)           |
| Porta API predefinita             | `PROD_API_PORT=20131`                                                                          |
| Immagine                          | `omniroute:prod` (creata dal target `runner-cli`)                                              |
| Container Redis                   | `omniroute-redis-prod` (`redis:8.6.2`, volume dedicato `redis-prod-data`)                      |
| Volume dei dati                   | `omniroute-prod-data` (con nome, persistente tra le ricompilazioni)                            |
| Controlli di integrità            | `node healthcheck.mjs` + `redis-cli ping`, con `depends_on` subordinato all'integrità di Redis |

Come utilizzarlo:

```bash
# Compila e avvia lo stack di produzione
docker compose -f docker-compose.prod.yml up -d --build

# Visualizza i log in streaming
docker compose -f docker-compose.prod.yml logs -f

# Arresta e rimuovi lo stack mantenendo i volumi
docker compose -f docker-compose.prod.yml down
```

Lo stack di produzione viene eseguito in parallelo con Compose di sviluppo (nomi dei container, porte e volumi diversi), quindi puoi continuare a lavorare localmente mentre l'ambiente di produzione rimane attivo.

## Fasi del Dockerfile

Il repository include un Dockerfile multi-stage (`Dockerfile`). Sono disponibili quattro fasi; scegli il `target` adatto al tuo caso d'uso.

| Fase          | Immagine di base      | Scopo                                                                                                                                                                                                                                                                                                                                              |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installa le dipendenze (`npm ci --legacy-peer-deps`) ed esegue `npm run build` (Turbopack per impostazione predefinita — consulta Risorse in fase di build qui sotto)                                                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Runtime di produzione con l'output standalone di Next.js. **Non include CLI dei provider.**                                                                                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Aggiunge `git`, `docker.io`, `docker-compose` e le CLI globali: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Scegli questa fase per i flussi di lavoro agentici.**                                                                                                                                                         |
| `runner-web`  | `runner-base`         | Aggiunge Playwright e un browser Chromium (`--with-deps`) per i provider di sessioni web: `gemini-web`, `claude-web`, `claude-turnstile`. **Scegli questa fase quando usi tali provider** — l'immagine semplice genera un errore al momento della richiesta senza questi componenti (consulta la nota su `-web` nella sezione Canali di rilascio). |

Esegui manualmente la build di un target specifico:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Risorse in fase di build

Tre argomenti di build controllano il costo della fase `builder`. Sono validi solo in fase di build —
`OMNIROUTE_MEMORY_MB` (qui sotto) è un parametro distinto per il runtime.

| Argomento di build          | Predefinito | Effetto                                                                                           |
| --------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | `0` esegue la build con webpack: picco di memoria inferiore, ma più lento. `1` abilita Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | Limite massimo dell'heap V8 (`--max-old-space-size`) per il processo `next build` avviato.        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Imposta `CIRCLE_NODE_TOTAL`; Next ricava `workers = N - 1` per la raccolta dei dati delle pagine. |

`OMNIROUTE_BUILD_WORKERS` è il parametro da aumentare su un builder potente e quello
da verificare quando una build con risorse limitate si interrompe **dopo** `✓ Compiled successfully`. Ogni
worker per i dati delle pagine è un processo separato, così come lo stesso processo padre `next build`;
una riproduzione su VPS reale (issue #7518) ha misurato il picco RSS di ogni processo
a ~4,5 GB, indipendentemente dal flag dell'heap `NODE_OPTIONS` (Turbopack compila usando
memoria nativa/Rust esterna all'heap V8). Il valore predefinito di `2` (→ 1 worker, 2
processi in totale) è dimensionato per i runner ospitati su GitHub con 16 GB / 4 vCPU
utilizzati dalla pipeline di pubblicazione. Con `8` (→ 7 worker), il runner ha esaurito la memoria e
buildkit ha interrotto il passaggio con `ResourceExhausted: ... cannot allocate memory`;
anche `3` (→ 2 worker) non rientrava nei limiti dopo aver misurato direttamente
l'RSS per processo invece di dedurlo. `tests/unit/docker-build-memory-budget.test.ts`
esegue i calcoli rispetto al valore misurato e fallisce se uno dei due parametri
supera le capacità del runner.

Turbopack compila usando memoria nativa Rust che risiede **all'esterno** dell'heap V8, quindi
`OMNIROUTE_BUILD_MEMORY_MB` non la limita. Su un host con un limite di memoria, la build
viene quindi terminata con SIGKILL dall'OOM killer senza alcun testo di errore: si
interrompe semplicemente durante `Creating an optimized production build`, dando l'impressione
di essere bloccata anziché aver esaurito la memoria. Per questo motivo il `Dockerfile` usa webpack
come impostazione predefinita (`OMNIROUTE_USE_TURBOPACK=0`), a differenza di `npm run dev` / `npm run build`, dove
Turbopack è il valore predefinito nel codice: un semplice `docker build .` senza argomenti di build (come
quello eseguito da Railway e altri host con installazione in un clic) non deve interrompersi silenziosamente su un
builder con memoria limitata. Le immagini pubblicate passano già esplicitamente
`OMNIROUTE_USE_TURBOPACK=0` in `docker-publish.yml`. Su un builder con molta RAM, abilita
Turbopack per ottenere una build più veloce:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` è abilitato, quindi `next build` esegue un processo padre **e** un processo
worker, e ciascuno rispetta separatamente `OMNIROUTE_BUILD_MEMORY_MB`. Imposta il limite del container
a un valore leggermente superiore a circa il doppio di tale parametro, non a una sola volta.

Misurazioni effettuate su questo albero (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limite del container | Risultato                                                    |
| --------- | -------------------- | ------------------------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB       | Terminato dall'OOM killer in entrambi i casi, senza messaggi |
| webpack   | 8 GiB                | Worker di build terminato con SIGKILL                        |
| webpack   | 12 GiB               | Riuscito, con un picco di 11,1 GiB                           |

### Impostazioni predefinite del runtime

Valori predefiniti esportati da `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamento della memoria in Docker:

- L'immagine imposta `OMNIROUTE_MEMORY_MB=1024` e ne deriva `NODE_OPTIONS=--max-old-space-size=1024`.
- Il processo server effettivo viene avviato dal launcher standalone, che legge `OMNIROUTE_MEMORY_MB` e aggiunge `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utilizza l'ultimo valore ripetuto di `--max-old-space-size`, quindi l'impostazione di `OMNIROUTE_MEMORY_MB` controlla il limite effettivo dell'heap in Docker.
- Poiché l'immagine lo imposta sempre, il fallback del launcher calibrato sulla RAM non viene mai applicato in Docker. Aumentarlo esplicitamente in base al carico di lavoro (tabella seguente). `2048` è ancora insufficiente per `/v1/responses` degli agenti di coding.

### RAM di runtime per gli agenti di coding

Il valore predefinito di 1 GiB in Docker è il minimo per la dashboard e le chat leggere, non una configurazione adatta alla produzione. I body estesi di `POST /v1/responses` (centinaia di messaggi, decine di strumenti) mantengono più grafi in memoria durante la compressione. Due richieste sovrapposte da circa 3 MiB / 750.000 token hanno causato l'arresto di V8 con un old-space da **12 GiB** (`FATAL ERROR: Reached heap limit`) e hanno anche provocato un OOM del cgroup da 16 GiB. Vedere [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensionare la **memoria del cgroup `--memory` al di sopra dell'heap**: i buffer nativi, SQLite e i dati intermedi della compressione risiedono al di fuori di V8.

| Carico di lavoro                        | `OMNIROUTE_MEMORY_MB`    | Container / cgroup     | Note                                                                                                         |
| --------------------------------------- | ------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| Dashboard, una chat leggera             | `1024` (valore immagine) | ≥2 GiB                 |                                                                                                              |
| Un agente di coding (Claude/Codex/Grok) | `8192`                   | ≥10 GiB                | Tipica singola sessione `/v1/responses`                                                                      |
| Due `/v1/responses` lunghe simultanee   | `10240`–`12288`          | ≥12–16 GiB             | Arresto di V8 misurato con un heap di circa 12 GiB                                                           |
| Tre o più contesti lunghi simultanei    | non su un solo processo  | serializzare / più RAM | Il limite predefinito per i carichi pesanti è 1 richiesta in corso; aumentarlo senza RAM riproduce l'arresto |

`omniroute serve` su bare metal calibra circa il 35% della RAM (con limiti `[512, 4096]`) quando `OMNIROUTE_MEMORY_MB` **non è impostata**. Docker imposta sempre `1024`, quindi questa calibrazione non viene mai eseguita nell'immagine ufficiale.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variabili d'ambiente critiche

Oltre ai valori predefiniti documentati in [ENVIRONMENT.md](../reference/ENVIRONMENT.md), le seguenti variabili sono particolarmente importanti durante l'esecuzione in Docker:

| Variabile                     | Scopo                                                                                                                                                                                                                                                                             | Valore predefinito                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Segreto condiviso per il bridge WebSocket. **Obbligatorio in produzione** — impostarlo su una stringa casuale robusta.                                                                                                                                                            | non impostato (deve essere fornito) |
| `REDIS_URL`                   | Stringa di connessione per il backend del limitatore di frequenza / della cache                                                                                                                                                                                                   | `redis://redis:6379`                |
| `REDIS_PORT`                  | Porta lato host per il container Redis incluso                                                                                                                                                                                                                                    | `6379`                              |
| `REDIS_BIND_HOST`             | Interfaccia host sulla quale viene pubblicata la porta Redis inclusa (loopback, a meno che non si aggiunga AUTH)                                                                                                                                                                  | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Percorso host montato nel profilo `cli` in `/workspace/omniroute` per i flussi di lavoro di auto-aggiornamento                                                                                                                                                                    | `.` (directory corrente)            |
| `OMNIROUTE_MEMORY_MB`         | Limite massimo dell'heap Node in fase di esecuzione per il server Docker autonomo; sostituisce il valore predefinito dell'immagine indicato sopra. Agenti di coding: `8192`+ (vedere [RAM di runtime](#runtime-ram-for-coding-agents)).                                           | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Sostituisce le porte esposte per la dashboard (20128) e l'API (20129)                                                                                                                                                                                                             | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Interfaccia host sulla quale docker-compose pubblica le porte della dashboard, dell'API e di live-WS. Con `REQUIRE_API_KEY=false` (valore predefinito), `0.0.0.0` espone alla LAN il proxy `/v1` anonimo — ampliare l'accesso solo con `REQUIRE_API_KEY=true` o un reverse proxy. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Interfaccia host sulla quale docker-compose pubblica il sidecar `cliproxyapi` — il relativo volume di dati contiene le credenziali dei provider.                                                                                                                                  | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Directory letta dal runtime per individuare e installare i plugin. Impostarla quando i plugin sono montati tramite bind mount: il valore predefinito segue `HOME`, che un'immagine potrebbe non esportare.                                                                        | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | Sottopercorso URL quando l'app viene pubblicata dietro un reverse proxy (ad es. `/omniroute`)                                                                                                                                                                                     | _(vuoto = radice)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Origine pubblica per il browser, incluso il sottopercorso (ad es. `https://host/omniroute`)                                                                                                                                                                                       | non impostato                       |
| `PROD_DASHBOARD_PORT`         | Porta della dashboard lato host per `docker-compose.prod.yml`                                                                                                                                                                                                                     | `20130`                             |
| `CLIPROXYAPI_PORT`            | Porta lato host per il sidecar `cliproxyapi`                                                                                                                                                                                                                                      | `8317`                              |

## Reverse proxy su un sottopercorso (Traefik / nginx)

Il `basePath` di Next.js viene compilato nel bundle standalone. OmniRoute registra il
valore incorporato in un file sentinella nella root dell'app (scritto durante `npm run build`;
letto da `scripts/docker/ensure-docker-base-path.mjs`) e lo confronta con
`OMNIROUTE_BASE_PATH` all'avvio del container. Quando i valori differiscono e l'immagine è
stata creata per la root del dominio, l'entrypoint riscrive i manifest standalone, i
valori letterali `basePath`/`assetPrefix` incorporati (Next 16 genera gli URL degli asset SSR
utilizzando soltanto `assetPrefix` — il patcher vi replica il sottopercorso), gli URL degli
asset `/_next/static` incorporati (manifest dei riferimenti client, import dei contenuti
multimediali, pagine di errore prerenderizzate) e lo shim client di `process.env` prima
dell'esecuzione di `node dev/run-standalone.mjs`.

### Build con Compose (consigliata)

Imposta entrambe le variabili in `.env`, quindi ricrea l'immagine affinché questa e
l'ambiente di runtime siano allineati:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` inoltra `OMNIROUTE_BASE_PATH` sia come argomento di build Docker
sia come variabile d'ambiente di runtime.

### Immagine root precompilata + sottopercorso di runtime

Le immagini pubblicate `diegosouzapw/omniroute:*` vengono create per la root del dominio.
Puoi comunque impostare `OMNIROUTE_BASE_PATH` in fase di runtime; il container applica
una patch al bundle una volta durante l'avvio. Associalo all'origine pubblica corrispondente:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configura il reverse proxy affinché inoltri il percorso esterno **completo** (senza
rimuovere il prefisso). Traefik deve instradare `PathPrefix(`/omniroute`)` al container
senza `StripPrefix`, in modo che Next.js riceva `/omniroute/...` e serva gli asset da
`/omniroute/_next/...`.

L'healthcheck Docker interroga l'endpoint leggero del ciclo di vita `/healthz`, preceduto
dal valore attivo di `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` rimane disponibile
per la diagnostica manuale o tramite dashboard; per fare in modo che l'HEALTHCHECK del
container torni a utilizzarlo (ad esempio, per imporre un controllo approfondito dello
stato), imposta `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Tale percorso
esegue un controllo **approfondito** (DB + riepilogo del monitoraggio), adatto
all'`HEALTHCHECK` poco frequente di Docker se scegli di riattivarlo, ma **non** agli
intervalli di `livenessProbe` di Kubernetes.

Per gli orchestratori (Kubernetes, Nomad, ecc.):

| Probe                    | Preferire                                                                    | Evitare                                                               |
| ------------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Liveness                 | HTTP `GET /livez` o TCP sulla porta principale (`PORT`, predefinita `20128`) | `/api/monitoring/health` come controllo di liveness                   |
| Readiness                | HTTP `GET /healthz`                                                          | Timeout brevi che interpretano un event loop occupato come non attivo |
| Approfondito / black-box | `/api/monitoring/health`                                                     | —                                                                     |

`/healthz` segnala lo stato del ciclo di vita del processo (`ok` / `starting` /
`stopping`). `/livez` verifica soltanto che il processo sia attivo (restituisce 200
ogni volta che l'handler può essere eseguito; non attende che il servizio sia pronto).
Entrambi vengono comunque eseguiti sullo stesso event loop Node che gestisce le
richieste, quindi le operazioni sul catalogo o di compressione che richiedono molta CPU
possono ritardarli — occupato ≠ non attivo. Se le probe HTTP scadono, preferisci una
probe di liveness TCP. Guida completa alle probe:
[Guida al monitoraggio — raccomandazioni per le probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose con Caddy (HTTPS Auto-TLS)

OmniRoute può essere esposto in modo sicuro utilizzando il provisioning SSL automatico di Caddy. Assicurati che il record DNS A del tuo dominio punti all'indirizzo IP del server.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origine visibile al browser per callback OAuth, link della dashboard e URL pubblici generati.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interno da server a server per processi pianificati / richieste verso se stesso.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy imposta le intestazioni di inoltro standard per il container upstream. OmniRoute utilizza
`NEXT_PUBLIC_BASE_URL` come origine pubblica canonica per le callback OAuth e i link pubblici
generati; le operazioni di scrittura autenticate della dashboard utilizzano richieste same-origin e una protezione CSRF
associata alla sessione. Abilita `OMNIROUTE_TRUST_PROXY` solo per le distribuzioni avanzate in cui desideri intenzionalmente
che OmniRoute ricavi l'origine pubblica dalle intestazioni inoltrate attendibili anziché da una configurazione
esplicita.

## Tunnel rapido Cloudflare

Il supporto della dashboard per le distribuzioni Docker include un **Tunnel rapido Cloudflare** attivabile con un solo clic in `Dashboard → Endpoints`. Alla prima attivazione, `cloudflared` viene scaricato solo quando necessario, viene avviato un tunnel temporaneo verso l'endpoint `/v1` corrente e l'URL `https://*.trycloudflare.com/v1` generato viene mostrato direttamente sotto il normale URL pubblico.

I pannelli dei tunnel degli endpoint (Cloudflare, Tailscale, ngrok) possono essere mostrati o nascosti da `Settings → Appearance` senza modificare lo stato del tunnel attivo.

### Note sui tunnel

- Gli URL dei Tunnel rapidi sono temporanei e cambiano dopo ogni riavvio.
- I Tunnel rapidi non vengono ripristinati automaticamente dopo il riavvio di OmniRoute o del container. Riattivali dalla dashboard quando necessario.
- L'installazione gestita attualmente supporta Linux, macOS e Windows su `x64` / `arm64`.
- Per impostazione predefinita, i Tunnel rapidi gestiti utilizzano il trasporto HTTP/2 per evitare fastidiosi avvisi relativi al buffer UDP di QUIC negli ambienti container con risorse limitate. Imposta `CLOUDFLARED_PROTOCOL=quic` o `auto` se desideri un trasporto diverso.
- Le immagini Docker includono i certificati radice CA di sistema e li forniscono a `cloudflared` gestito, evitando errori di attendibilità TLS quando il tunnel viene inizializzato all'interno del container.
- Imposta `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` se desideri che OmniRoute utilizzi un file binario esistente anziché scaricarne uno.

## Tag delle immagini

| Immagine                 | Tag      | Dimensione | Descrizione                                                |
| ------------------------ | -------- | ---------- | ---------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB     | SemVer stabile **pubblicata** più recente (non git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB     | Fissa questa classe di tag per GitOps                      |

Manifest multipiattaforma: `linux/amd64` + `linux/arm64` nativi (Apple Silicon, AWS Graviton, Raspberry Pi). Docker seleziona automaticamente l'architettura corrispondente; usa `--platform linux/amd64` se devi forzare l'emulazione AMD64 su host ARM.

### Canali di rilascio

OmniRoute pubblica canali Docker distinti per le versioni stabili, i test del ramo di rilascio attivo e le build di sviluppo.

| Canale                          | Origine                                   | Mutabilità                         | Utilizzo consigliato                                                                                                                         |
| ------------------------------- | ----------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Versione firmata/con numero versione      | Immutabile                         | Distribuzioni di produzione che fissano una versione esatta                                                                                  |
| `:latest` / `:latest-web`       | SemVer stabile **pubblicata** più recente | Puntatore stabile modificabile     | Segue le versioni stabili **dopo** un processo di pubblicazione SemVer — **non** segue `main` né i commit `release/v*` non ancora rilasciati |
| `:next` / `:next-web`           | Ramo `release/v*` predefinito corrente    | Puntatore pre-release modificabile | Test delle correzioni integrate nel ramo di rilascio attivo ma non ancora incluse in una versione stabile                                    |
| `:main` / `:main-web`           | Ramo `main`                               | Puntatore di sviluppo modificabile | Solo sviluppo e test di integrazione                                                                                                         |

#### Provider con sessione web: le immagini `-web`

Ogni canale precedente è disponibile anche come tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), creato dallo stage `runner-web`: la stessa immagine con in più Playwright e un browser Chromium. L'immagine standard viene fornita **senza** Chromium; `gemini-web`, `claude-web` e `claude-turnstile` ne hanno bisogno.

L'errore è posticipato, non si verifica all'avvio: questi provider elencano i propri modelli e risultano connessi nella dashboard; solo la prima richiesta non riesce e restituisce

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Se utilizzi questi provider, scarica il tag `-web` del canale che stai già utilizzando: non cambia nient'altro. In un'installazione npm/CLI (senza immagine Docker), l'elemento mancante equivalente è il file binario del browser: esegui `npx playwright install chromium` sull'host.

#### Utilizzo del canale pre-release

Il canale `next` viene ricostruito a ogni push sul branch predefinito corrente `release/v*` e viene pubblicato sia per AMD64 sia per ARM64. I branch di manutenzione precedenti non possono sovrascriverlo. Il canale fornisce un'immagine scaricabile contenente le correzioni integrate nel branch di release attivo prima della creazione del successivo tag stabile.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Per Docker Compose, sostituisci il tag dell'immagine utilizzato dal profilo selezionato, quindi scarica e ricrea il servizio:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sicurezza e rollback

`next` è un canale di pre-release mobile. Può cambiare a ogni push sul branch di release attivo e **non è supportato per l'uso in produzione**. Fissa il digest dell'immagine durante la valutazione di una build specifica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prima di eseguire i test, crea un backup del volume dati di OmniRoute o della directory dati montata tramite bind mount. Per eseguire il rollback, ripristina la versione stabile o il digest utilizzati in precedenza e ricrea il container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Una build del branch di release non può mai aggiornare `latest`; solo una versione semantica stabile idonea può promuovere il puntatore stabile. Le immagini `next` mantengono l'ispezione dell'immagine di release e il controllo bloccante per le vulnerabilità di livello CRITICAL.

**`latest` non garantisce l'allineamento con git.** Le correzioni integrate in `main` o nel branch attivo `release/v*` **non** sono incluse in `:latest` finché non viene pubblicata un'immagine SemVer stabile e il job di pubblicazione non promuove `:latest` (con lo stesso digest di quella versione SemVer). Se `latest` sembra non aggiornarsi mentre GitHub mostra già la correzione, scarica `:next` per testare il branch di release oppure attendi il tag SemVer.

| Obiettivo                                                                         | Utilizzo                                   |
| --------------------------------------------------------------------------------- | ------------------------------------------ |
| GitOps / produzione che non deve subire variazioni                                | Fissa `:X.Y.Z` (o il digest dell'immagine) |
| Seguire le versioni stabili pubblicate e accettare una ricreazione a ogni release | `:latest`                                  |
| Testare i commit non ancora rilasciati di `release/v*`                            | `:next` (non per la produzione)            |
| Testare `main`                                                                    | `:main` (non per la produzione)            |

## Disponibilità: SQLite predefinito supporta una sola replica

La configurazione standard di OmniRoute su Docker / Kubernetes prevede **un processo Node + un writer SQLite**. L'alta disponibilità **non è supportata** con questa topologia.

| Vincolo                                        | Conseguenza                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Writer singolo                                 | **Non** eseguire più repliche sullo stesso file SQLite. Ciò danneggia il DB.                                                                                                                                                                                                                                                                                             |
| Ricreazione / riavvio / arresto da HEALTHCHECK | **Interruzione completa** degli SSE in corso, delle sessioni della dashboard e dello stato in memoria. Tutti i client connessi vengono disconnessi. Le nuove richieste durante l'intervallo senza endpoint ricevono dal reverse proxy **`502 Bad Gateway: Unknown error`**, non JSON di OmniRoute: i client non possono distinguerlo da un errore del provider (#11015). |
| Stesso event loop di `/healthz`                | Un ciclo intenso del catalogo o della compressione può ritardare i probe; un timeout breve riavvia quindi l'**unica** replica.                                                                                                                                                                                                                                           |

**Matrice dei probe** (vedere anche [Raccomandazioni per i probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                          | Destinazione                                                                    | Non usare                                                            |
| ------------------------------ | ------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Liveness                       | TCP su `PORT` (valore predefinito `20128`) oppure HTTP non rigido su `/healthz` | `/api/monitoring/health`                                             |
| Readiness                      | HTTP `GET /healthz`                                                             | Timeout troppo brevi che considerano inattivo un event loop occupato |
| Approfondito / operatori umani | `/api/monitoring/health`                                                        | Liveness automatizzata del kubelet                                   |

**Aggiornamenti:** è prevista l'interruzione di ogni sessione. Se possibile, eseguire il drain dei client; con SQLite predefinito non sono disponibili aggiornamenti progressivi. Anche `restart: unless-stopped` di Compose insieme a `HEALTHCHECK` di Docker sostituirà l'unico processo quando il container risulta Unhealthy, con lo stesso raggio d'impatto.

Frammento Kubernetes per una **singola replica** (Recreate è obbligatorio; non aumentare `replicas` utilizzando un solo file SQLite):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

La pausa `preStop` consente a kube di rimuovere gli endpoint del Service prima di SIGTERM, in modo che il **nuovo** traffico smetta di raggiungere il processo in arresto. Per gli SSE `/v1/responses` in corso viene eseguito il drain fino a `SHUTDOWN_TIMEOUT_MS` (valore predefinito 30s) tramite lease di ammissione heavyweight (#11015). Le nuove richieste che raggiungono comunque il processo ricevono `503` + `Retry-After: 5`. L'intervallo di Recreate senza endpoint, fino a quando la sostituzione non è Ready, rimane un'interruzione completa: è una caratteristica della topologia SQLite, non un errore di configurazione dei probe.

Postgres esterno / HA multi-writer **non** è un percorso standard documentato. Se è necessaria l'HA, mantenere una singola replica oppure utilizzare una topologia testata e documentata separatamente dal progetto. Il lavoro relativo a Postgres/MySQL è disponibile in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Fino al suo rilascio, l'unico modo supportato per moltiplicare la capacità di `/v1/responses` di **grandi dimensioni** consiste nell'utilizzare N processi indipendenti (sezione successiva), non `replicas > 1` su un unico volume.

## Scalabilità orizzontale: N processi indipendenti

Un processo Node corrisponde a **un heap V8**. Due richieste sovrapposte dell’agente di coding da ~3 MiB / ~750k token a `POST /v1/responses` (RTK + Caveman) provocano l’arresto di tale heap a circa 12 Gi (`FATAL ERROR: Reached heap limit`) e possono causare un OOM in un cgroup da 16 Gi. Vedere [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Questa misurazione è un avvertimento relativo al **budget di memoria**, non un limite massimo del prodotto pari a due richieste `/v1/responses` lunghe simultanee. L’ammissione delle chat pesanti è regolata da un budget di byte in ingresso derivato automaticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionato in base allo stesso limite V8/cgroup: aumentarlo manualmente (o impostare il limite legacy basato sul numero di richieste `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) in un processo già dimensionato reintroduce l’arresto. Le chat di piccole dimensioni, `/healthz`, `/v1/models` e MCP **non** rientrano in tale limite.

### Processo singolo: più di due richieste `/v1/responses` lunghe

Un processo **sano** (heap al di sotto di `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, valore predefinito `0.75`) **può** eseguire più di due richieste `POST /v1/responses` lunghe simultanee quando il budget di byte in transito a livello di processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) dispone ancora di capacità. I body con dimensione pari o superiore a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (valore predefinito 256 KiB) acquisiscono lo stesso lease per carichi pesanti delle richieste strutturalmente complesse e usano la stessa via di uscita `tryAcquireHealthyHeadroom` di [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Gestire decine di client SSE simultanei di lunga durata (gli operatori spesso ne richiedono 40–50) è una questione di **budget di memoria** — occorre dimensionare heap + slot primari/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — non un limite rigido del prodotto di “massimo 2”. Un heap sotto pressione continua a rifiutare il carico con un errore `503` ritentabile, evitando il ripetersi di #7849.

Per **moltiplicare gli heap** (old-space V8 indipendenti) **oggi**:

| Da fare                                                                                                                                                                                            | Da non fare                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Eseguire **N container/pod**, ciascuno con il **proprio** `DATA_DIR` / volume                                                                                                                      | Impostare `replicas > 1` facendo puntare le istanze allo stesso file SQLite     |
| Dimensionare le richieste pesanti in transito + l’headroom sano in base all’heap / al budget di byte in transito; 1–2 è il valore predefinito prudente di #7849, non un limite rigido del prodotto | Assegnare a un singolo processo 8× RAM e un limite numerico illimitato          |
| Facoltativo: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` per **contatori delle quote condivisi**                                                                                          | Considerare Redis come un database SQLite condiviso: non lo è                   |
| Duplicare i segreti dei provider in ogni istanza (oppure accettare dashboard partizionate)                                                                                                         | Aspettarsi un’unica dashboard / un unico registro delle chiamate tra le istanze |
| Posizionare davanti un qualsiasi bilanciatore del carico; l’affinità per chiave API o sessione è sufficiente                                                                                       | Richiedere un middleware specifico di un fornitore e sensibile alle dimensioni  |

Hardware: il numero di richieste `/v1/responses` lunghe simultanee per istanza è una questione di **budget di memoria** (heap + byte in transito / #10110). `N` istanze indipendenti di `DATA_DIR` moltiplicano comunque gli heap: la RAM dell’host deve supportare `N × cgroup`, non “un solo pod da 16 Gi con N=8”. Non usare mai `replicas > 1` con un unico file SQLite.

Esempio Compose (due heap, due volumi — non `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

La densità all’interno del processo (compressione al di fuori dell’isolate HTTP) è trattata in [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Un unico cluster logico basato su uno stato durevole condiviso è trattato in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Errori regionali di Gemini all'interno di Docker

Google AI Studio / Gemini API può restituire HTTP 400 con FAILED_PRECONDITION e
`User location is not supported for the API use.` Una richiesta riuscita sull'host
non dimostra che il container utilizzi lo stesso percorso in uscita. L'ordinamento DNS,
la connettività IPv4/IPv6, l'instradamento VPN e i proxy configurati possono differire. Consultare
[le regioni supportate da Google](https://ai.google.dev/gemini-api/docs/available-regions)
e verificare anche il percorso di connessione effettivo; questo errore, da solo, non indica che la chiave API non sia valida.

### Preferire un proxy specifico per la connessione

Utilizzare la [configurazione del proxy per connessione](../ops/PROXY_GUIDE.md#4-level-proxy-system)
di OmniRoute per la connessione Gemini interessata, quindi ripetere **Test Connection** e una piccola richiesta
con lo stesso modello. In questo modo, la modifica dell'instradamento rimane limitata a quella connessione. Verificare
che il proxy sia raggiungibile dal container e che la connessione lo selezioni
effettivamente. La modifica del percorso non garantisce l'idoneità regionale a monte.

### Confrontare la rete dell'host e del container

Mantenere identici chiave, modello e richiesta durante il confronto dei risultati autenticati; non
incollare mai credenziali, password del proxy o header di autorizzazione completi in una segnalazione.
Per prima cosa, verificare quali famiglie di indirizzi vengono fornite dal resolver del sistema operativo, utilizzando lo stesso comando
sull'host e all'interno del container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Sostituire `omniroute` con il servizio in esecuzione (ad esempio, `omniroute-web`). Questi
comandi mostrano le famiglie di indirizzi senza credenziali o indirizzi IP. Un valore `6`
restituito indica solo un risultato DNS IPv6: **non** dimostra l'esistenza di un percorso IPv6 utilizzabile né l'accesso all'API.
Se `curl` è installato, confrontare `curl -4 -I https://generativelanguage.googleapis.com`
con `curl -6 -I https://generativelanguage.googleapis.com` in entrambi gli ambienti.
Una risposta HTTP dimostra la connettività per quella verifica, anche se si tratta di un errore
di mancata autenticazione; solo la richiesta autenticata al modello verifica l'idoneità per Gemini.

### Alternativa a livello di host: IPv6 funzionante e criteri del resolver

L'autore della segnalazione [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ha ripristinato
l'accesso nel proprio ambiente abilitando IPv6 per il container e modificando la selezione degli indirizzi
di glibc. Considerare questa soluzione come un'alternativa specifica per l'ambiente. Verificare che IPv6
funzioni sull'host, che l'uscita e l'instradamento del container siano operativi e che le regole del firewall siano corrette prima di modificare le preferenze del resolver.
Un indirizzo ULA privato, da solo, non garantisce la connettività IPv6 pubblica.

Per i servizi già collegati alla rete predefinita di Compose, questo frammento abilita
IPv6 su tale rete; mantenere invariati il resto del servizio, le porte, i volumi e la configurazione:

```yaml
networks:
  default:
    enable_ipv6: true
```

Per una rete denominata, abilitarlo sulla rete a cui il servizio è effettivamente collegato. Docker può
allocare una sottorete ULA; selezionare una sottorete esplicita e non sovrapposta solo quando richiesto dalla propria rete.
Consultare [la gestione delle reti IPv6 in Docker](https://docs.docker.com/engine/daemon/ipv6/)
e [le opzioni di rete di Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

In un'**immagine basata su glibc**, `/etc/gai.conf` può modificare la selezione degli indirizzi. Il Dockerfile
attuale del repository utilizza Debian; le immagini personalizzate basate su musl non condividono questo meccanismo.
La modifica segnalata cambia l'etichetta ULA da `label fc00::/7 6` a
`label fc00::/7 1`. Partire dalla tabella completa dei criteri dell'immagine e conservarne le altre
voci: l'aggiunta di una voce `label` o `precedence` sostituisce la tabella predefinita, pertanto un file
contenente solo la riga modificata non è sufficiente. Il
[riferimento per la configurazione di glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documenta tale comportamento. Montare il file verificato in sola lettura tramite bind mount nel percorso `/etc/gai.conf`
e ricreare il servizio per applicarlo.

Questa modifica influisce sulla selezione degli indirizzi del sistema operativo per **tutto il traffico in uscita da quel container**.
Non obbliga ogni applicazione a scegliere IPv6: anche l'ordine DNS e la selezione della connessione
di Node sono rilevanti. In particolare, `--dns-result-order=ipv4first` assegna la preferenza a IPv4 e
non risolve un problema relativo al solo IPv4. Consultare [l'ordinamento DNS di Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Dopo ogni modifica a livello di host, verificare nuovamente Gemini e gli altri provider. Per eseguire il rollback,
rimuovere il mount personalizzato di `gai.conf`, ripristinare la configurazione di rete precedente e
ricreare il servizio o la rete interessati durante una finestra di manutenzione. La ricreazione di una rete
può interrompere gli altri container a essa collegati; non eliminare il volume dei dati persistenti.

## Note importanti

- **Modalità WAL di SQLite:** è necessario lasciare che `docker stop` termini, in modo che OmniRoute possa eseguire il checkpoint delle modifiche più recenti in `storage.sqlite`. I file Compose inclusi impostano già un periodo di tolleranza per l'arresto di 40s. Se esegui direttamente l'immagine, mantieni `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** imposta su `true` se i backup periodici/pre-scrittura vengono gestiti esternamente. Le migrazioni di database esistenti richiedono comunque uno snapshot di sicurezza durevole dedicato e una protezione per le migrazioni di massa.
- **Persistenza dei dati:** monta sempre un volume in `/app/data` per mantenere il database, le chiavi e le configurazioni tra i riavvii del container.
- **Configurazione della porta:** sovrascrivi la variabile di ambiente `PORT` per modificare la porta predefinita `20128`.

## Vedi anche

- [Guida alla distribuzione su VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configurazione di VM + nginx + Cloudflare
- [Guida alla distribuzione su Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Distribuzione su Fly.io
- [Configurazione dell'ambiente](../reference/ENVIRONMENT.md) — Riferimento completo per `.env`
