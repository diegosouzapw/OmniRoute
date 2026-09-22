# 🐳 Docker Guide — OmniRoute (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Riferimento completo per il deployment con Docker. Per iniziare rapidamente, consulta la [sezione Docker del README](../README.md#-docker).

## Indice

- [Avvio rapido](#quick-run)
- [Con un file di ambiente](#with-environment-file)
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
- [Disponibilità: SQLite predefinito supporta una singola replica](#availability-default-sqlite-is-single-replica)
- [Note importanti](#important-notes)

---

## Avvio rapido

> **Self-hosting con un solo comando?** Consulta la
> [Guida al self-hosting](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (immagine pubblicata +
> Redis, accessibile solo tramite loopback, senza scelta del profilo). L'avvio rapido qui sotto è il
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

## Con un file di ambiente

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

# Combina CLI con il sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profili disponibili

OmniRoute include quattro profili Compose. Scegli quello più adatto al tuo ambiente.

| Profilo              | Servizio         | Quando utilizzarlo                                                                                                                                          | Comando                                      |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predefinito) | `omniroute-base` | Server headless / runtime minimale, senza CLI dei provider incluse                                                                                          | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Flussi di lavoro agentici che chiamano `omniroute providers/setup/doctor` e le CLI incluse (Codex, Claude Code, Droid, OpenClaw)                            | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Host Linux che richiedono un accesso simile a `network_mode` alle CLI dell'host montando `~/.local/bin`, `~/.codex`, `~/.claude` e così via in sola lettura | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Esegue il sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sulla porta `8317` per il proxying delle CLI upstream                         | `docker compose --profile cliproxyapi up -d` |

> È possibile combinare più profili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurazione degli strumenti CLI dell'host quando OmniRoute viene eseguito in Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` e il pulsante
**Salva configurazione** della dashboard scrivono tutti file come `~/.codex/*.config.toml`. Questi percorsi
hanno significato solo sulla macchina in cui viene effettivamente eseguita la CLI. Se vengono eseguiti all'interno
del container, la scrittura avviene nella home del container (`/home/node` —
l'immagine viene eseguita con `USER node`), che nessuna CLI dell'host leggerà mai e che viene
eliminata nel momento in cui il container viene ricreato.

OmniRoute rileva questa situazione e rifiuta la scrittura fornendo istruzioni, anziché
segnalare un'operazione riuscita che non potrebbe essere utilizzata: la CLI termina con il codice `2` e l'API risponde `422`
con `containerEphemeralTarget: true`.

### Opzione consigliata: eseguire la CLI sull'host e OmniRoute in Docker

Il container fornisce l'API; la CLI configura gli strumenti dell'host.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # indirizza la CLI al container
omniroute setup-codex                      # scrive nella vera directory ~/.codex dell'host
```

Questa è la scelta corretta quando Codex, Claude Code, Cursor o strumenti simili vengono eseguiti sul
laptop, che è la configurazione più comune.

### Alternativa: montare con bind mount le directory di configurazione dell'host (profilo `host`)

Se si desidera che sia il container stesso a scrivere la configurazione dell'host, montare le
directory al suo interno e indirizzare `CLI_CONFIG_HOME` alla radice del mount. Il profilo `host`
lo fa già:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Il bind mount è ciò che rende affidabile il percorso: OmniRoute legge
`/proc/self/mountinfo` e consente le scritture nei percorsi montati (e nelle directory
i cui elementi figli sono mount, esattamente come nel caso di `/host-home` mostrato sopra), continuando
però a rifiutarle nei percorsi non montati.

### Soluzione di emergenza: configurare le CLI interne al container (usare con cautela)

Quando le CLI si trovano effettivamente all'interno del container (profilo `cli`), la scrittura
è intenzionale. Passare `--allow-container-write` a qualsiasi comando `setup-*`, oppure impostare
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` per il server. La scrittura viene eseguita
mostrando un avviso che indica che non sopravvivrà al container.

> **Avviso di sicurezza — profilo `cli` + mount di `docker.sock`.**
> Il profilo `cli` monta tramite bind mount `/var/run/docker.sock` affinché il programma
> di aggiornamento automatico interno al container possa ricreare lo stack tramite il demone dell'host
> (`src/lib/system/autoUpdate.ts` verifica la presenza di tale socket e ignora il
> percorso Docker quando è assente). Quel socket è **un confine di attendibilità equivalente all'accesso root
> sull'host**: qualsiasi entità in grado di accedervi controlla il demone Docker dell'host come
> root e può creare, ispezionare, arrestare e rimuovere qualsiasi container sull'host.
> Implicazioni:
>
> 1. **Non esporre mai alla rete la porta del profilo `cli`.** Pubblicarla
>    su `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — rendere un profilo `cli` raggiungibile dalla LAN trasforma qualsiasi RCE a livello di dashboard in
>    una compromissione completa dell'host.
> 2. **Non montare altre directory dell'host nel profilo `cli`.**
>    Il socket Docker insieme a qualsiasi mount aggiuntivo concede al container accesso completo
>    in lettura/scrittura al filesystem e alla configurazione dell'host. Se uno strumento deve
>    accedere a un progetto, eseguirlo localmente con il binario CLI; non montare il progetto
>    nel container `cli`.
>
> Se non è necessario l'aggiornamento automatico interno al container, lasciare disattivato il profilo `cli`
> (`COMPOSE_PROFILES=core,redis` o una variante più breve). Gli altri profili non
> montano il socket Docker.
>
> Consultare `docs/security/MITM-TPROXY-DECRYPT.md` (git; non compilato in `/docs`) per il relativo modello delle minacce
> riguardante il MITM e `docs/security/SUPPLY_CHAIN.md` per la catena di provenienza
> dei binari `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

OmniRoute si affida a Redis per supportare il limitatore di frequenza distribuito e la cache condivisa. Il servizio `redis` è **sempre definito** in `docker-compose.yml` (non è vincolato ad alcun profilo) e viene avviato insieme a qualsiasi altro profilo.

| Dettaglio                    | Valore                                              |
| ---------------------------- | --------------------------------------------------- |
| Immagine                     | `redis:7-alpine`                                    |
| Nome del container           | `omniroute-redis`                                   |
| Porta interna                | `6379`                                              |
| Porta host (configurabile)   | `REDIS_PORT` (valore predefinito: `6379`)           |
| Binding host (configurabile) | `REDIS_BIND_HOST` (valore predefinito: `127.0.0.1`) |
| Volume                       | `omniroute-redis-data` → `/data`                    |
| Controllo di integrità       | `redis-cli ping` (intervallo di 10 s)               |

Variabili di ambiente correlate:

- `REDIS_URL` — stringa di connessione inserita nell'applicazione (`redis://redis:6379` per impostazione predefinita).
- `REDIS_PORT` — mappatura della porta lato host per il container Redis.
- `REDIS_BIND_HOST` — interfaccia host sulla quale viene pubblicata la porta. Il valore predefinito è `127.0.0.1`.

> **Perché usare il loopback per impostazione predefinita:** il sidecar viene eseguito senza `requirepass` e i container
> dell'applicazione lo raggiungono tramite la rete Compose (`redis:6379`): la porta pubblicata è
> presente solo per gli strumenti lato host (`redis-cli`, un'esecuzione locale di `npm run dev`). La pubblicazione su
> `0.0.0.0` esporrebbe un'istanza Redis non autenticata a ogni host della LAN. Se si imposta
> `REDIS_BIND_HOST=0.0.0.0`, aggiungere anche `--requirepass` al campo `command:` del servizio.

**La disabilitazione di Redis** non è consigliata (il limitatore di frequenza passerà alla modalità di riserva in memoria). Se necessario, rimuovere/commentare il blocco del servizio `redis:` in `docker-compose.yml` oppure ridimensionarlo a zero:

```bash
docker compose up -d --scale redis=0
```

## Compose di produzione

Per uno snapshot di produzione isolato eseguito insieme all'ambiente di sviluppo, utilizzare `docker-compose.prod.yml`.

| Dettaglio                         | Valore                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| File                              | `docker-compose.prod.yml`                                                                      |
| Porta predefinita della dashboard | `PROD_DASHBOARD_PORT=20130` (mappata internamente a `${DASHBOARD_PORT:-20128}`)                |
| Porta API predefinita             | `PROD_API_PORT=20131`                                                                          |
| Immagine                          | `omniroute:prod` (creata dal target `runner-cli`)                                              |
| Container Redis                   | `omniroute-redis-prod` (`redis:8.6.2`, volume dedicato `redis-prod-data`)                      |
| Volume dei dati                   | `omniroute-prod-data` (con nome, mantenuto tra le ricompilazioni)                              |
| Controlli di integrità            | `node healthcheck.mjs` + `redis-cli ping`, con `depends_on` subordinato all'integrità di Redis |

Come utilizzarlo:

```bash
# Compila e avvia lo stack di produzione
docker compose -f docker-compose.prod.yml up -d --build

# Visualizza i log in tempo reale
docker compose -f docker-compose.prod.yml logs -f

# Arresta e rimuove lo stack (mantiene i volumi)
docker compose -f docker-compose.prod.yml down
```

Lo stack di produzione viene eseguito in parallelo con il Compose di sviluppo (con nomi dei container, porte e volumi diversi), quindi è possibile continuare a lavorare localmente mentre l'ambiente di produzione rimane attivo.

## Fasi del Dockerfile

Il repository include un Dockerfile multi-stage (`Dockerfile`). Sono esposte tre fasi; scegli il `target` adatto al tuo caso d'uso.

| Fase          | Immagine di base      | Scopo                                                                                                                                                                       |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installa le dipendenze (`npm ci --legacy-peer-deps`) ed esegue `npm run build` (Turbopack per impostazione predefinita — consulta Risorse in fase di build qui sotto)       |
| `runner-base` | `node:26-trixie-slim` | Ambiente di runtime di produzione con l'output standalone di Next.js. **Non include le CLI dei provider.**                                                                  |
| `runner-cli`  | `runner-base`         | Aggiunge `git`, `docker.io`, `docker-compose` e le CLI globali: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Scegli questa per i flussi agentici.** |

Compila manualmente un target specifico:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Risorse in fase di build

Tre argomenti di build controllano il costo della fase `builder`. Sono validi solo in fase di build —
`OMNIROUTE_MEMORY_MB` (descritto di seguito) è un parametro separato per il runtime.

| Argomento di build          | Valore predefinito | Effetto                                                                                            |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`                | Con `0`, esegue la build con webpack. Picco di memoria inferiore, ma più lento.                    |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`             | Limite massimo dell'heap V8 (`--max-old-space-size`) per il processo `next build` avviato.         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`                | Imposta `CIRCLE_NODE_TOTAL`; Next calcola `workers = N - 1` per la raccolta dei dati delle pagine. |

`OMNIROUTE_BUILD_WORKERS` è il parametro da aumentare su un builder potente e quello
da controllare quando una build con risorse limitate termina **dopo** `✓ Compiled successfully`. Ogni
worker per i dati delle pagine è un processo separato, così come lo stesso processo padre
`next build`; una riproduzione su VPS attiva (issue #7518) ha misurato per ogni processo
un picco RSS di ~4,5 GB, indipendentemente dal flag dell'heap `NODE_OPTIONS` (Turbopack
compila usando memoria nativa/Rust esterna all'heap V8). Il valore predefinito di `2`
(→ 1 worker, 2 processi totali) è dimensionato per i runner ospitati da GitHub con
16 GB / 4 vCPU utilizzati dalla pipeline di pubblicazione. Con `8` (→ 7 worker), quel
runner ha esaurito la memoria e buildkit ha interrotto il passaggio con
`ResourceExhausted: ... cannot allocate memory`; anche `3` (→ 2 worker) non rientrava
nei limiti dopo aver misurato direttamente l'RSS per processo anziché dedurlo.
`tests/unit/docker-build-memory-budget.test.ts` esegue i calcoli sulla base del valore
misurato e fallisce se uno dei due parametri supera le capacità del runner.

Turbopack compila usando memoria nativa Rust che si trova **all'esterno** dell'heap V8,
quindi `OMNIROUTE_BUILD_MEMORY_MB` non la limita. Su un host con un limite di memoria, la
build viene quindi terminata con SIGKILL dall'OOM killer senza alcun testo di errore:
si arresta semplicemente durante `Creating an optimized production build`, dando
l'impressione di essersi bloccata anziché di aver esaurito la memoria. Se l'host di
build ha risorse limitate, cambia bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` è abilitato, quindi `next build` esegue un processo padre **e** un
processo worker, ciascuno dei quali rispetta separatamente `OMNIROUTE_BUILD_MEMORY_MB`.
Imposta il limite del container a un valore superiore a circa il doppio, non a una sola
volta quel valore.

Misurazioni effettuate su questo albero (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limite del container | Risultato                                             |
| --------- | -------------------- | ----------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | Terminato dall'OOM in entrambi i casi, senza messaggi |
| webpack   | 8 GiB                | Worker di build terminato con SIGKILL                 |
| webpack   | 12 GiB               | Completato, con un picco di 11,1 GiB                  |

### Valori predefiniti di runtime

Valori predefiniti esportati da `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamento della memoria in Docker:

- L'immagine imposta `OMNIROUTE_MEMORY_MB=1024` e ne deriva `NODE_OPTIONS=--max-old-space-size=1024`.
- Il processo server effettivo viene avviato dal launcher standalone, che legge `OMNIROUTE_MEMORY_MB` e aggiunge `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utilizza l'ultimo valore ripetuto di `--max-old-space-size`, quindi l'impostazione di `OMNIROUTE_MEMORY_MB` controlla il limite effettivo dell'heap in Docker.
- Poiché l'immagine lo imposta sempre, il fallback del launcher calibrato sulla RAM non viene mai applicato in Docker. Aumentalo esplicitamente in base al carico di lavoro (tabella seguente). `2048` è comunque insufficiente per `/v1/responses` degli agenti di programmazione.

### RAM di runtime per gli agenti di programmazione

Il valore predefinito Docker di 1 GiB è un minimo per dashboard/chat leggere, non una dimensione adatta alla produzione. I corpi di richieste `POST /v1/responses` lunghi (centinaia di messaggi, decine di strumenti) mantengono in memoria più grafi durante la compressione. Due richieste sovrapposte da ~3 MiB / ~750.000 token hanno causato l'interruzione di V8 con uno spazio old-space di **12 GiB** (`FATAL ERROR: Reached heap limit`) e hanno anche provocato un OOM del cgroup da 16 GiB. Consulta [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Imposta **il valore di `--memory` del cgroup al di sopra dell'heap**: i buffer nativi, SQLite e i dati intermedi della compressione risiedono all'esterno di V8.

| Carico di lavoro                        | `OMNIROUTE_MEMORY_MB`              | Container / cgroup     | Note                                                                                                                                |
| --------------------------------------- | ---------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, una chat leggera             | `1024` (predefinito dell'immagine) | ≥2 GiB                 |                                                                                                                                     |
| Un agente di coding (Claude/Codex/Grok) | `8192`                             | ≥10 GiB                | Tipica singola sessione `/v1/responses`                                                                                             |
| Due `/v1/responses` lunghe simultanee   | `10240`–`12288`                    | ≥12–16 GiB             | Interruzione di V8 rilevata con un heap di circa 12 GiB                                                                             |
| Tre o più contesti lunghi simultanei    | non eseguire in un unico processo  | serializzare / più RAM | Per impostazione predefinita è ammessa 1 operazione pesante in corso; aumentare il limite senza RAM causa nuovamente l'interruzione |

`omniroute serve` su bare metal si calibra su circa il 35% della RAM (limitato all'intervallo `[512, 4096]`) quando `OMNIROUTE_MEMORY_MB` **non è impostata**. Docker imposta sempre `1024`, quindi questa calibrazione non viene mai eseguita nell'immagine ufficiale.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variabili d'ambiente critiche

Oltre ai valori predefiniti documentati in [ENVIRONMENT.md](../reference/ENVIRONMENT.md), le seguenti variabili sono particolarmente importanti durante l'esecuzione in Docker:

| Variabile                     | Scopo                                                                                                                                                                                                                                                                                                   | Valore predefinito                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Segreto condiviso per il bridge WebSocket. **Obbligatorio in produzione** — impostarlo su una stringa casuale robusta.                                                                                                                                                                                  | non impostato (deve essere fornito) |
| `REDIS_URL`                   | Stringa di connessione per il backend del limitatore di frequenza / della cache                                                                                                                                                                                                                         | `redis://redis:6379`                |
| `REDIS_PORT`                  | Porta lato host per il container Redis incluso                                                                                                                                                                                                                                                          | `6379`                              |
| `REDIS_BIND_HOST`             | Interfaccia host su cui viene pubblicata la porta Redis inclusa (loopback, a meno che non si aggiunga AUTH)                                                                                                                                                                                             | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Percorso host montato nel profilo `cli` in `/workspace/omniroute` per i flussi di lavoro di auto-aggiornamento                                                                                                                                                                                          | `.` (directory corrente)            |
| `OMNIROUTE_MEMORY_MB`         | Limite massimo dell'heap Node in fase di esecuzione per il server Docker autonomo; sostituisce il valore predefinito dell'immagine indicato sopra. Agenti di programmazione: `8192`+ (vedere [RAM di runtime](#runtime-ram-for-coding-agents)).                                                         | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Sovrascrive le porte esposte per la dashboard (20128) e l'API (20129)                                                                                                                                                                                                                                   | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Interfaccia host su cui docker-compose pubblica le porte della dashboard, dell'API e del WebSocket live. Con `REQUIRE_API_KEY=false` (impostazione predefinita), `0.0.0.0` espone il proxy anonimo `/v1` alla LAN — ampliarne l'accesso solo con `REQUIRE_API_KEY=true` o con un reverse proxy davanti. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Interfaccia host su cui docker-compose pubblica il sidecar `cliproxyapi` — il relativo volume dati contiene le credenziali dei provider.                                                                                                                                                                | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Directory letta dal processo di scansione dei plugin a runtime e in cui vengono installati i plugin. Impostarla quando i plugin sono montati tramite bind mount: il valore predefinito segue `HOME`, che non è necessariamente esportata da un'immagine.                                                | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | Sottopercorso URL quando l'app viene pubblicata dietro un reverse proxy (ad es. `/omniroute`)                                                                                                                                                                                                           | _(vuoto = radice)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Origine pubblica del browser, incluso il sottopercorso (ad es. `https://host/omniroute`)                                                                                                                                                                                                                | non impostato                       |
| `PROD_DASHBOARD_PORT`         | Porta della dashboard lato host per `docker-compose.prod.yml`                                                                                                                                                                                                                                           | `20130`                             |
| `CLIPROXYAPI_PORT`            | Porta lato host per il sidecar `cliproxyapi`                                                                                                                                                                                                                                                            | `8317`                              |

## Reverse proxy su un sottopercorso (Traefik / nginx)

Il `basePath` di Next.js viene compilato nel bundle standalone. OmniRoute registra il
valore incorporato in un file sentinella nella radice dell'app (scritto durante
`npm run build`; letto da `scripts/docker/ensure-docker-base-path.mjs`) e lo confronta
con `OMNIROUTE_BASE_PATH` all'avvio del container. Quando i valori differiscono e
l'immagine è stata creata per la radice del dominio, l'entrypoint riscrive i manifest
standalone, i valori letterali `basePath`/`assetPrefix` incorporati (Next 16 genera gli
URL delle risorse SSR esclusivamente da `assetPrefix` — il patcher vi replica il
sottopercorso), gli URL delle risorse `/_next/static` incorporati (manifest dei
riferimenti client, importazioni multimediali, pagine di errore prerenderizzate) e lo
shim client di `process.env` prima dell'esecuzione di `node dev/run-standalone.mjs`.

### Build con Compose (consigliata)

Imposta entrambe le variabili in `.env`, quindi ricrea l'immagine affinché build e
runtime siano coerenti:

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

### Immagine root precompilata + sottopercorso a runtime

Le immagini `diegosouzapw/omniroute:*` pubblicate sono create per la radice del dominio.
È comunque possibile impostare `OMNIROUTE_BASE_PATH` a runtime; il container applica
una patch al bundle una sola volta all'avvio. Abbinalo all'origine pubblica
corrispondente:

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
senza `StripPrefix`, in modo che Next.js riceva `/omniroute/...` e distribuisca le
risorse da `/omniroute/_next/...`.

L'healthcheck Docker interroga il leggero endpoint del ciclo di vita `/healthz`,
anteponendovi il valore attivo di `OMNIROUTE_BASE_PATH`.
`/api/monitoring/health` rimane disponibile per la diagnostica umana o tramite
dashboard; per fare in modo che l'HEALTHCHECK del container torni a utilizzarlo (ad
esempio per applicare un controllo approfondito dello stato), imposta
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Questo percorso esegue un
controllo **approfondito** (DB + riepilogo del monitoraggio), adatto
all'`HEALTHCHECK` poco frequente di Docker se si sceglie di riattivarlo, ma **non**
agli intervalli di `livenessProbe` di Kubernetes.

Per gli orchestratori (Kubernetes, Nomad, ecc.):

| Probe                   | Preferire                                                                                | Evitare                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Liveness                | HTTP `GET /livez` oppure TCP sulla porta principale (`PORT`, valore predefinito `20128`) | `/api/monitoring/health` come controllo liveness                                 |
| Readiness               | HTTP `GET /healthz`                                                                      | Timeout ridotti che interpretano un event loop occupato come processo non attivo |
| Approfondito / blackbox | `/api/monitoring/health`                                                                 | —                                                                                |

`/healthz` segnala il ciclo di vita del processo (`ok` / `starting` / `stopping`).
`/livez` verifica soltanto che il processo sia attivo (restituisce 200 ogni volta che
l'handler può essere eseguito; non attende la readiness). Entrambi vengono comunque
eseguiti sullo stesso event loop Node che gestisce le richieste, quindi le operazioni
sul catalogo o di compressione che richiedono molta CPU possono ritardarli: occupato ≠
non attivo. Se le probe HTTP scadono, preferire i controlli liveness TCP. Guida
completa alle probe:
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
      # Origine visibile dal browser per callback OAuth, link della dashboard e URL pubblici generati.
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

Caddy imposta gli header di inoltro standard per il container upstream. OmniRoute utilizza
`NEXT_PUBLIC_BASE_URL` come origine pubblica canonica per le callback OAuth e i link pubblici
generati; le operazioni di scrittura autenticate della dashboard utilizzano richieste same-origin più una protezione CSRF
legata alla sessione. Abilita `OMNIROUTE_TRUST_PROXY` solo per distribuzioni avanzate in cui desideri intenzionalmente
che OmniRoute ricavi l'origine pubblica dagli header inoltrati attendibili anziché da una configurazione
esplicita.

## Cloudflare Quick Tunnel

Il supporto della dashboard per le distribuzioni Docker include un **Cloudflare Quick Tunnel** attivabile con un clic in `Dashboard → Endpoints`. Alla prima attivazione, `cloudflared` viene scaricato solo quando necessario, viene avviato un tunnel temporaneo verso il tuo endpoint `/v1` corrente e l'URL `https://*.trycloudflare.com/v1` generato viene mostrato direttamente sotto il normale URL pubblico.

I pannelli dei tunnel degli endpoint (Cloudflare, Tailscale, ngrok) possono essere mostrati o nascosti da `Settings → Appearance` senza modificare lo stato dei tunnel attivi.

### Note sui tunnel

- Gli URL dei Quick Tunnel sono temporanei e cambiano dopo ogni riavvio.
- I Quick Tunnel non vengono ripristinati automaticamente dopo il riavvio di OmniRoute o del container. Riattivali dalla dashboard quando necessario.
- L'installazione gestita attualmente supporta Linux, macOS e Windows su `x64` / `arm64`.
- I Quick Tunnel gestiti utilizzano per impostazione predefinita il trasporto HTTP/2 per evitare rumorosi avvisi relativi al buffer UDP di QUIC in ambienti container con risorse limitate. Imposta `CLOUDFLARED_PROTOCOL=quic` o `auto` se desideri un trasporto diverso.
- Le immagini Docker includono le autorità di certificazione radice del sistema e le forniscono al processo `cloudflared` gestito, evitando errori di attendibilità TLS quando il tunnel viene inizializzato all'interno del container.
- Imposta `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` se desideri che OmniRoute utilizzi un binario esistente anziché scaricarne uno.

## Tag delle immagini

| Immagine                 | Tag      | Dimensione | Descrizione                                                         |
| ------------------------ | -------- | ---------- | ------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB     | Versione SemVer stabile **pubblicata** più recente (non git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB     | Fissa questa classe di tag per GitOps                               |

Manifest multipiattaforma: `linux/amd64` + `linux/arm64` nativi (Apple Silicon, AWS Graviton, Raspberry Pi). Docker seleziona automaticamente l'architettura corrispondente; specifica `--platform linux/amd64` se devi forzare l'emulazione AMD64 su host ARM.

### Canali di rilascio

OmniRoute pubblica canali Docker separati per le versioni stabili, i test del branch di rilascio attivo e le build di sviluppo.

| Canale                          | Origine                                   | Mutabilità                         | Utilizzo consigliato                                                                                                                         |
| ------------------------------- | ----------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Rilascio firmato/con versione             | Immutabile                         | Distribuzioni di produzione che fissano una versione esatta                                                                                  |
| `:latest` / `:latest-web`       | SemVer stabile **pubblicata** più recente | Puntatore stabile modificabile     | Segue le versioni stabili **dopo** un processo di pubblicazione SemVer — **non** segue `main` né i commit `release/v*` non ancora rilasciati |
| `:next` / `:next-web`           | Branch `release/v*` predefinito corrente  | Puntatore pre-release modificabile | Test delle correzioni integrate nel branch di rilascio attivo ma non ancora incluse in una versione stabile                                  |
| `:main` / `:main-web`           | Branch `main`                             | Puntatore di sviluppo modificabile | Solo per sviluppo e test di integrazione                                                                                                     |

#### Utilizzo del canale pre-release

Il canale `next` viene ricostruito a ogni push sul branch `release/v*` predefinito corrente ed è pubblicato sia per AMD64 sia per ARM64. I branch di manutenzione precedenti non possono sovrascriverlo. Il canale fornisce un'immagine scaricabile per le correzioni integrate nel branch di rilascio attivo prima della creazione del successivo tag stabile.

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

`next` è un canale pre-release mobile. Può cambiare a ogni push sul branch di rilascio attivo e **non è supportato per l'utilizzo in produzione**. Fissa il digest dell'immagine durante la valutazione di una build specifica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prima di eseguire i test, esegui il backup del volume dati di OmniRoute o della directory dei dati montata tramite bind mount. Per eseguire il rollback, ripristina la versione stabile o il digest utilizzato in precedenza e ricrea il container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Una build del branch di release non può mai aggiornare `latest`; solo una versione semantica stabile idonea può aggiornare il riferimento stabile. Le immagini `next` mantengono l'ispezione dell'immagine di release e il controllo bloccante per le vulnerabilità CRITICAL.

**`latest` non garantisce l'attualità rispetto a git.** Le correzioni unite in `main` o nel branch `release/v*` attivo **non** sono incluse in `:latest` finché non viene pubblicata un'immagine SemVer stabile e il job di pubblicazione non aggiorna `:latest` allo stesso digest di tale versione SemVer. Se `latest` sembra non aggiornarsi mentre GitHub mostra già la correzione, scarica `:next` per testare il branch di release oppure attendi il tag SemVer.

| Obiettivo                                                              | Soluzione                                |
| ---------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / produzione che non deve subire variazioni                     | Usa `:X.Y.Z` (o il digest dell'immagine) |
| Seguire le versioni stabili pubblicate e ricreare a ogni nuova release | `:latest`                                |
| Testare i commit non ancora rilasciati di `release/v*`                 | `:next` (non per la produzione)          |
| Testare `main`                                                         | `:main` (non per la produzione)          |

## Disponibilità: SQLite predefinito è a replica singola

La configurazione standard Docker / Kubernetes di OmniRoute prevede **un processo Node + un writer SQLite**. L'alta disponibilità **non è supportata** con questa topologia.

| Vincolo                                                  | Conseguenza                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Writer singolo                                           | **Non** eseguire più repliche sullo stesso file SQLite. Ciò danneggia il DB.                                                                                                                                                                                                                                                                                                    |
| Ricreazione / riavvio / terminazione tramite HEALTHCHECK | **Interruzione completa** delle connessioni SSE in corso, delle sessioni della dashboard e dello stato in memoria. Ogni client connesso viene disconnesso. Le nuove richieste durante l'intervallo senza endpoint ricevono dal reverse proxy **`502 Bad Gateway: Unknown error`**, non JSON di OmniRoute: i client non possono distinguerlo da un errore del provider (#11015). |
| Stesso event loop di `/healthz`                          | Un ciclo intenso del catalogo o di compressione può ritardare le probe; un timeout breve riavvia quindi l'**unica** replica.                                                                                                                                                                                                                                                    |

**Matrice delle probe** (vedere anche [raccomandazioni sulle probe di Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                              | Destinazione                                                              | Non utilizzare                                                              |
| ---------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Liveness                           | TCP su `PORT` (valore predefinito `20128`) o HTTP non rigoroso `/healthz` | `/api/monitoring/health`                                                    |
| Readiness                          | HTTP `GET /healthz`                                                       | Timeout rigidi che interpretano un event loop occupato come non funzionante |
| Approfondita / per operatori umani | `/api/monitoring/health`                                                  | Liveness automatizzata del kubelet                                          |

**Aggiornamenti:** prevedere la disconnessione di ogni sessione. Se possibile, eseguire il drain dei client; con SQLite predefinito non è disponibile alcun aggiornamento progressivo. Anche Compose `restart: unless-stopped` insieme a Docker `HEALTHCHECK` sostituirà l'unico processo quando il container risulta Unhealthy, con lo stesso raggio d'impatto.

Frammento Kubernetes per una **singola replica** (Recreate è obbligatorio; non aumentare `replicas` quando viene utilizzato un unico file SQLite):

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

La sospensione `preStop` consente a kube di rimuovere gli endpoint del Service prima di SIGTERM, in modo che il **nuovo** traffico smetta di raggiungere il processo in fase di arresto. Per le connessioni SSE `/v1/responses` in corso viene eseguito il drain fino al limite `SHUTDOWN_TIMEOUT_MS` (valore predefinito: 30 secondi) tramite lease di ammissione heavyweight (#11015). Le nuove richieste che raggiungono comunque il processo ricevono `503` + `Retry-After: 5`. L'intervallo di Recreate senza endpoint, fino a quando la sostituzione non è Ready, rimane un'interruzione completa: è una conseguenza della topologia SQLite, non di una configurazione errata delle probe.

Postgres esterno / HA multi-writer **non** è un percorso standard documentato. Se è necessaria l'HA, mantenere una singola replica oppure utilizzare una topologia che il progetto abbia testato e documentato separatamente. Il lavoro su Postgres/MySQL è descritto in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Fino al suo rilascio, l'unico modo supportato per moltiplicare la capacità delle richieste `/v1/responses` di **grandi dimensioni** consiste nell'utilizzare N processi indipendenti (sezione successiva), non `replicas > 1` su un unico volume.

## Scale-out: N processi indipendenti

Un processo Node corrisponde a **un heap V8**. Due richieste sovrapposte `POST /v1/responses` di agenti di coding da ~3 MiB / ~750k token (RTK + Caveman) causano l'arresto di tale heap a ~12 Gi (`FATAL ERROR: Reached heap limit`) e possono provocare un OOM in un cgroup da 16 Gi. Vedere [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Questa misurazione è un avvertimento relativo al **budget di memoria**, non un limite massimo rigido del prodotto pari a due richieste `/v1/responses` lunghe simultanee. L'ammissione delle chat pesanti è regolata da un budget di byte in ingresso derivato automaticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionato in base allo stesso limite V8/cgroup: aumentarlo manualmente (o impostare il limite legacy basato sul numero di richieste `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) su un processo già dimensionato reintroduce l'arresto. Le chat piccole, `/healthz`, `/v1/models` e MCP **non** rientrano in tale limite.

### Un solo processo: più di due richieste `/v1/responses` lunghe

Un processo **sano** (heap al di sotto di `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, valore predefinito `0.75`) **può** eseguire più di due richieste lunghe `POST /v1/responses` simultanee quando nel budget di byte in elaborazione dell'intero processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) c'è ancora spazio. I body pari o superiori a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (valore predefinito 256 KiB) acquisiscono lo stesso lease per carichi pesanti delle richieste strutturalmente complesse e utilizzano lo stesso meccanismo di escape `tryAcquireHealthyHeadroom` di [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Decine di client SSE simultanei di lunga durata (gli operatori spesso ne richiedono 40–50) sono una questione di **budget di memoria** — dimensionare heap + slot primari/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — non un limite rigido del prodotto pari a “massimo 2”. Un heap sotto pressione continua comunque a rifiutare il carico con risposte `503` ritentabili, evitando il ripetersi di #7849.

Per **moltiplicare gli heap** (old space V8 indipendenti) **oggi**:

| Cosa fare                                                                                                                                                                                           | Cosa non fare                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Eseguire **N container/pod**, ciascuno con il **proprio** `DATA_DIR` / volume                                                                                                                       | Impostare `replicas > 1` su un singolo file SQLite                           |
| Dimensionare le richieste pesanti in elaborazione + l'headroom sano in base al budget heap / byte in elaborazione; 1–2 è il valore predefinito prudente di #7849, non un limite rigido del prodotto | Assegnare a un processo 8× RAM e un limite numerico illimitato               |
| Facoltativo: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` per **contatori di quota condivisi**                                                                                              | Considerare Redis come SQLite condiviso: non lo è                            |
| Duplicare i segreti dei provider in ogni istanza (oppure accettare dashboard separate)                                                                                                              | Aspettarsi un'unica dashboard / un unico registro chiamate tra le istanze    |
| Anteporre un qualsiasi bilanciatore di carico; l'affinità per chiave API o sessione è sufficiente                                                                                                   | Richiedere un middleware specifico del fornitore e sensibile alle dimensioni |

Hardware: il numero di richieste lunghe `/v1/responses` simultanee per istanza è una questione di **budget di memoria** (heap + byte in elaborazione / #10110). `N` `DATA_DIR` indipendenti moltiplicano comunque gli heap: la RAM dell'host deve supportare `N × cgroup`, non “un pod da 16 Gi con N=8”. Non usare mai `replicas > 1` su un singolo file SQLite.

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

La densità all'interno del processo (con la compressione spostata fuori dall'isolate HTTP) è trattata in [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Un singolo cluster logico su stato durevole condiviso è trattato in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Note importanti

- **Modalità WAL di SQLite:** è necessario consentire a `docker stop` di completarsi, affinché OmniRoute possa eseguire il checkpoint delle modifiche più recenti in `storage.sqlite`. I file Compose inclusi impostano già un periodo di tolleranza di arresto di 40 secondi. Se esegui direttamente l'immagine, mantieni `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** imposta su `true` se i backup periodici/pre-scrittura sono gestiti esternamente. Le migrazioni di database esistenti richiedono comunque uno snapshot di sicurezza durevole dedicato e una protezione per le migrazioni di massa.
- **Persistenza dei dati:** monta sempre un volume in `/app/data` per conservare database, chiavi e configurazioni tra i riavvii del container.
- **Configurazione della porta:** sovrascrivi la variabile di ambiente `PORT` per modificare la porta predefinita `20128`.

## Vedi anche

- [Guida alla distribuzione su VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configurazione di VM + nginx + Cloudflare
- [Guida alla distribuzione su Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Distribuzione su Fly.io
- [Configurazione dell'ambiente](../reference/ENVIRONMENT.md) — Riferimento completo per `.env`
