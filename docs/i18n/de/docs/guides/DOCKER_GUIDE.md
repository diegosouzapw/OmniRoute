# 🐳 Docker Guide — OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Vollständige Referenz für die Docker-Bereitstellung. Einen schnellen Einstieg finden Sie im [Docker-Abschnitt der README](../README.md#-docker).

## Inhaltsverzeichnis

- [Schnellstart](#quick-run)
- [Mit Umgebungsdatei](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Verfügbare Profile](#available-profiles)
- [Konfiguration von Host-CLI-Tools, wenn OmniRoute in Docker ausgeführt wird](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-Sidecar](#redis-sidecar)
- [Produktions-Compose](#production-compose)
- [Dockerfile-Stufen](#dockerfile-stages)
- [Kritische Umgebungsvariablen](#critical-environment-variables)
- [Docker Compose mit Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image-Tags](#image-tags)
- [Verfügbarkeit: Standard-SQLite unterstützt nur eine Replik](#availability-default-sqlite-is-single-replica)
- [Wichtige Hinweise](#important-notes)

---

## Schnellstart

> **Selbst hosten mit einem einzigen Befehl?** Siehe
> [Anleitung zum Selbsthosten](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (veröffentlichtes Image +
> Redis, nur Loopback, keine Profilauswahl). Der folgende Schnellstart beschreibt
> die Ausführung als einzelnen Container für Benutzer, die Redis bereits an anderer Stelle betreiben.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Mit Umgebungsdatei

```bash
# Zuerst .env kopieren und bearbeiten
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
# Basisprofil (keine CLI-Tools)
docker compose --profile base up -d

# CLI-Profil (Claude Code, Codex, OpenClaw integriert)
docker compose --profile cli up -d

# Host-Profil (primär für Linux; bindet CLI-Binärdateien des Hosts schreibgeschützt ein)
docker compose --profile host up -d

# Web-Profil (Chromium/Playwright für Websitzungsanbieter)
docker compose --profile web up -d

# CLI und CLIProxyAPI-Sidecar kombinieren
docker compose --profile cli --profile cliproxyapi up -d
```

## Verfügbare Profile

OmniRoute enthält Compose-Profile für die wichtigsten Bereitstellungsszenarien. Wählen Sie das Profil aus, das zu Ihrer Umgebung passt.

| Profil            | Dienst           | Verwendungszweck                                                                                                                                                    | Befehl                                       |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (Standard) | `omniroute-base` | Headless-Server / minimale Laufzeitumgebung, keine Anbieter-CLIs enthalten                                                                                          | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentische Workflows, die `omniroute providers/setup/doctor` und enthaltene CLIs (Codex, Claude Code, Droid, OpenClaw) aufrufen                                     | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-Hosts, die durch schreibgeschütztes Einbinden von `~/.local/bin`, `~/.codex`, `~/.claude` usw. einen `network_mode`-ähnlichen Zugriff auf Host-CLIs benötigen | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Den [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-Sidecar auf Port `8317` für das Upstream-CLI-Proxying ausführen                                     | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Websitzungsanbieter, die einen Browser benötigen: `gemini-web`, `claude-web`, `claude-turnstile` (erstellt `runner-web`, Chromium enthalten)                        | `docker compose --profile web up -d`         |

> Mehrere Profile können kombiniert werden: `docker compose --profile cli --profile cliproxyapi up -d`.

## Host-CLI-Tools konfigurieren, wenn OmniRoute in Docker ausgeführt wird

`omniroute setup-codex`, `setup-claude`, `config set <tool>` und die Schaltfläche
**Konfiguration speichern** im Dashboard schreiben Dateien wie `~/.codex/*.config.toml`. Diese Pfade
haben nur auf dem Rechner eine Bedeutung, auf dem die CLI tatsächlich ausgeführt wird. Werden sie innerhalb
des Containers ausgeführt, erfolgt der Schreibvorgang im eigenen Home-Verzeichnis des Containers (`/home/node` —
das Image wird als `USER node` ausgeführt), wo keine Host-CLI die Dateien jemals liest und wo sie
verworfen werden, sobald der Container neu erstellt wird.

OmniRoute erkennt dies und verweigert den Schreibvorgang mit entsprechenden Anweisungen, anstatt
einen nicht nutzbaren Erfolg zu melden: Die CLI wird mit `2` beendet, und die API antwortet mit `422`
und `containerEphemeralTarget: true`.

### Empfohlen: CLI auf dem Host, OmniRoute in Docker ausführen

Der Container stellt die API bereit; die CLI konfiguriert Ihre Host-Tools.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI auf den Container verweisen
omniroute setup-codex                      # schreibt in das tatsächliche ~/.codex auf Ihrem Host
```

Dies ist die richtige Wahl, wenn Codex, Claude Code, Cursor oder ähnliche Tools auf Ihrem
Laptop ausgeführt werden — was der üblichen Konfiguration entspricht.

### Alternative: Host-Konfigurationsverzeichnisse per Bind-Mount einbinden (`host`-Profil)

Wenn der Container selbst Ihre Host-Konfiguration schreiben soll, binden Sie die
Verzeichnisse ein und lassen Sie `CLI_CONFIG_HOME` auf das Stammverzeichnis des Mounts verweisen. Das `host`-Profil
erledigt dies bereits:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Ein Bind-Mount macht den Pfad vertrauenswürdig: OmniRoute liest
`/proc/self/mountinfo` und erlaubt Schreibvorgänge auf eingebundenen Pfaden (sowie in Verzeichnissen,
deren Unterverzeichnisse Mounts sind, was genau der oben gezeigten Struktur von `/host-home` entspricht), während
Schreibvorgänge auf nicht eingebundenen Pfaden weiterhin verweigert werden.

### Notlösung: die eigenen CLIs des Containers konfigurieren (sparsam verwenden)

Wenn sich die CLIs tatsächlich innerhalb des Containers befinden (das `cli`-Profil), ist der Schreibvorgang
beabsichtigt. Übergeben Sie `--allow-container-write` an jeden `setup-*`-Befehl oder setzen Sie
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` für den Server. Der Schreibvorgang wird
mit einer Warnung ausgeführt, dass die Daten den Container nicht überdauern werden.

> **Sicherheitswarnung — `cli`-Profil + `docker.sock`-Mount.**
> Das `cli`-Profil bindet `/var/run/docker.sock` per Bind-Mount ein, damit der
> automatische Updater innerhalb des Containers den Stack über den Host-Daemon neu erstellen kann
> (`src/lib/system/autoUpdate.ts` prüft auf diesen Socket und überspringt den
> Docker-Pfad, wenn er nicht vorhanden ist). Dieser Socket ist **eine Vertrauensgrenze mit
> Host-Root-Rechten**: Alles, was darauf zugreifen kann, steuert den Docker-Daemon des Hosts als
> Root — es kann jeden Container auf dem Host erstellen, inspizieren, stoppen und entfernen.
> Konsequenzen:
>
> 1. **Stellen Sie den Port des `cli`-Profils niemals im Netzwerk bereit.** Veröffentlichen
>    Sie ihn auf `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — ein im LAN erreichbares `cli`-Profil macht jede RCE auf Dashboard-Ebene zu einer
>    vollständigen Kompromittierung des Hosts.
> 2. **Binden Sie keine zusätzlichen Host-Verzeichnisse in das `cli`-Profil ein.**
>    Der Docker-Socket zusammen mit jedem weiteren Mount gewährt dem Container vollständigen
>    Lese-/Schreibzugriff auf Ihr Dateisystem und Ihre Host-Konfiguration. Wenn ein Tool
>    ein Projekt sehen muss, führen Sie es lokal mit dem CLI-Binary aus — binden Sie es nicht
>    in den `cli`-Container ein.
>
> Wenn Sie keine automatische Aktualisierung innerhalb des Containers benötigen, lassen Sie das `cli`-Profil deaktiviert
> (`COMPOSE_PROFILES=core,redis` oder kürzer). Die anderen Profile binden den
> Docker-Socket nicht ein.
>
> Das zugehörige Bedrohungsmodell rund um MITM finden Sie unter `docs/security/MITM-TPROXY-DECRYPT.md`
> (in git; nicht in `/docs` kompiliert), und die Herkunftskette der
> `codex`-/`claude-code`-/`droid`-/`openclaw`-Binärdateien unter `docs/security/SUPPLY_CHAIN.md`.

## Redis-Sidecar

OmniRoute verwendet Redis als Backend für den verteilten Rate-Limiter und den gemeinsam genutzten Cache. Der Dienst `redis` ist in `docker-compose.yml` **immer definiert** (er ist an kein Profil gebunden) und wird zusammen mit jedem anderen Profil gestartet.

| Detail                        | Wert                                          |
| ----------------------------- | --------------------------------------------- |
| Image                         | `redis:7-alpine`                              |
| Containername                 | `omniroute-redis`                             |
| Interner Port                 | `6379`                                        |
| Host-Port (überschreibbar)    | `REDIS_PORT` (Standardwert: `6379`)           |
| Host-Bindung (überschreibbar) | `REDIS_BIND_HOST` (Standardwert: `127.0.0.1`) |
| Volume                        | `omniroute-redis-data` → `/data`              |
| Healthcheck                   | `redis-cli ping` (10-Sekunden-Intervall)      |

Zugehörige Umgebungsvariablen:

- `REDIS_URL` — in die App injizierte Verbindungszeichenfolge (standardmäßig `redis://redis:6379`).
- `REDIS_PORT` — hostseitige Portzuordnung für den Redis-Container.
- `REDIS_BIND_HOST` — Host-Schnittstelle, auf der der Port veröffentlicht wird. Standardwert ist `127.0.0.1`.

> **Warum standardmäßig Loopback verwendet wird:** Der Sidecar läuft ohne `requirepass`, und die App-
> Container erreichen ihn über das Compose-Netzwerk (`redis:6379`) — der veröffentlichte Port ist
> nur für hostseitige Werkzeuge (`redis-cli`, ein lokales `npm run dev`) vorgesehen. Eine Veröffentlichung auf
> `0.0.0.0` würde ein nicht authentifiziertes Redis für jeden Host in Ihrem LAN verfügbar machen. Wenn Sie
> `REDIS_BIND_HOST=0.0.0.0` festlegen, fügen Sie außerdem `--requirepass` zum Dienst unter `command:` hinzu.

**Das Deaktivieren von Redis** wird nicht empfohlen (der Rate-Limiter greift dann auf eine speicherinterne Ausweichlösung zurück). Falls es dennoch erforderlich ist, entfernen Sie entweder den Dienstblock `redis:` in `docker-compose.yml` bzw. kommentieren Sie ihn aus oder skalieren Sie ihn auf null:

```bash
docker compose up -d --scale redis=0
```

## Produktions-Compose

Verwenden Sie `docker-compose.prod.yml` für einen isolierten Produktions-Snapshot, der parallel zur Entwicklungsumgebung ausgeführt wird.

| Detail                         | Wert                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| Datei                          | `docker-compose.prod.yml`                                                                         |
| Standardmäßiger Dashboard-Port | `PROD_DASHBOARD_PORT=20130` (dem internen `${DASHBOARD_PORT:-20128}` zugeordnet)                  |
| Standardmäßiger API-Port       | `PROD_API_PORT=20131`                                                                             |
| Image                          | `omniroute:prod` (aus dem Ziel `runner-cli` erstellt)                                             |
| Redis-Container                | `omniroute-redis-prod` (`redis:8.6.2`, dediziertes Volume `redis-prod-data`)                      |
| Daten-Volume                   | `omniroute-prod-data` (benannt, bleibt über Neuerstellungen hinweg erhalten)                      |
| Healthchecks                   | `node healthcheck.mjs` + `redis-cli ping`, wobei `depends_on` vom Redis-Integritätsstatus abhängt |

Verwendung:

```bash
# Produktions-Stack erstellen und starten
docker compose -f docker-compose.prod.yml up -d --build

# Logs fortlaufend anzeigen
docker compose -f docker-compose.prod.yml logs -f

# Herunterfahren (Volumes beibehalten)
docker compose -f docker-compose.prod.yml down
```

Der Produktions-Stack läuft parallel zum Entwicklungs-Compose (mit unterschiedlichen Containernamen, Ports und Volumes), sodass Sie lokal weiterentwickeln können, während die Produktionsumgebung aktiv bleibt.

## Dockerfile-Stages

Das Repository enthält ein mehrstufiges Dockerfile (`Dockerfile`). Vier Stages stehen zur Verfügung; wählen Sie das passende `target` für Ihren Anwendungsfall.

| Stage         | Basis-Image           | Zweck                                                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installiert Abhängigkeiten (`npm ci --legacy-peer-deps`) und führt `npm run build` aus (standardmäßig Turbopack — siehe Ressourcen zur Build-Zeit unten)                                                                                                                                                                     |
| `runner-base` | `node:26-trixie-slim` | Produktionslaufzeitumgebung mit der eigenständigen Next.js-Ausgabe. **Enthält keine Anbieter-CLIs.**                                                                                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | Fügt `git`, `docker.io`, `docker-compose` sowie die globalen CLIs `@openai/codex`, `@anthropic-ai/claude-code`, `droid` und `openclaw` hinzu. **Wählen Sie diesen Stage für agentenbasierte Workflows.**                                                                                                                     |
| `runner-web`  | `runner-base`         | Fügt Playwright und einen Chromium-Browser (`--with-deps`) für Websitzungsanbieter hinzu: `gemini-web`, `claude-web`, `claude-turnstile`. **Wählen Sie diesen Stage, wenn Sie diese Anbieter verwenden** — beim einfachen Image schlagen Anfragen ohne ihn fehl (siehe den Hinweis zu `-web` unter Veröffentlichungskanäle). |

So erstellen Sie ein bestimmtes Target manuell:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ressourcen zur Build-Zeit

Drei Build-Argumente steuern den Ressourcenbedarf des `builder`-Stages. Sie gelten ausschließlich zur Build-Zeit —
`OMNIROUTE_MEMORY_MB` (unten) ist eine separate Laufzeiteinstellung.

| Build-Argument              | Standardwert | Auswirkung                                                                                            |
| --------------------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`          | Mit `0` wird stattdessen webpack verwendet. Geringerer Spitzenspeicherbedarf, langsamer.              |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | V8-Heap-Obergrenze (`--max-old-space-size`) für den gestarteten `next build`-Prozess.                 |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Setzt `CIRCLE_NODE_TOTAL`; Next leitet daraus `workers = N - 1` für die Erfassung der Seitendaten ab. |

`OMNIROUTE_BUILD_WORKERS` sollte auf einem leistungsstarken Build-System erhöht werden und ist die Einstellung,
die Sie überprüfen sollten, wenn ein Build mit beschränkten Ressourcen **nach**
`✓ Compiled successfully` abbricht. Jeder Worker für Seitendaten ist ein eigener
Prozess, ebenso wie der übergeordnete `next build`-Prozess selbst; bei einer
Live-Reproduktion auf einem VPS (Issue #7518) wurde für jeden Prozess unabhängig
vom `NODE_OPTIONS`-Heap-Flag ein maximaler RSS-Speicherverbrauch von ~4,5 GB
gemessen (Turbopack kompiliert in nativem/Rust-Speicher außerhalb des V8-Heaps).
Der Standardwert `2` (→ 1 Worker, insgesamt 2 Prozesse) ist auf die von GitHub
gehosteten Runner mit 16 GB / 4 vCPUs ausgelegt, die von der
Veröffentlichungspipeline verwendet werden. Bei `8` (→ 7 Worker) ging diesem
Runner der Arbeitsspeicher aus, und buildkit brach den Schritt mit
`ResourceExhausted: ... cannot allocate memory` ab; `3` (→ 2 Worker) passte
ebenfalls nicht mehr, nachdem der RSS-Speicherverbrauch pro Prozess direkt
gemessen statt abgeleitet worden war. `tests/unit/docker-build-memory-budget.test.ts`
führt die Berechnung anhand des gemessenen Werts durch und schlägt fehl, wenn
eine der beiden Einstellungen die Kapazität des Runners überschreitet.

Turbopack kompiliert in nativem Rust-Speicher, der **außerhalb** des V8-Heaps
liegt, sodass `OMNIROUTE_BUILD_MEMORY_MB` diesen nicht begrenzt. Auf einem Host
mit einer Speicherobergrenze wird der Build daher ohne jegliche Fehlermeldung
vom OOM-Killer per SIGKILL beendet — er stoppt einfach mitten in
`Creating an optimized production build`, was eher wie ein Hängenbleiben als
wie unzureichender Arbeitsspeicher wirkt. Wenn der Build-Host nur über begrenzte
Ressourcen verfügt, wechseln Sie den Bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` ist aktiviert, sodass `next build` einen übergeordneten
Prozess **und** einen Worker-Prozess ausführt und beide
`OMNIROUTE_BUILD_MEMORY_MB` separat berücksichtigen. Legen Sie die
Container-Obergrenze auf etwas mehr als ungefähr das Doppelte dieses Werts fest,
nicht nur auf den einfachen Wert.

Messungen für diesen Quellbaum (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container-Obergrenze | Ergebnis                                  |
| --------- | -------------------- | ----------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | bei beiden lautlos vom OOM-Killer beendet |
| webpack   | 8 GiB                | Build-Worker per SIGKILL beendet          |
| webpack   | 12 GiB               | erfolgreich, Spitzenwert bei 11,1 GiB     |

### Laufzeitstandardwerte

Von `runner-base` exportierte Standardwerte: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Speicherverhalten in Docker:

- Das Image setzt `OMNIROUTE_MEMORY_MB=1024` und leitet daraus `NODE_OPTIONS=--max-old-space-size=1024` ab.
- Der eigentliche Serverprozess wird vom Standalone-Launcher gestartet, der `OMNIROUTE_MEMORY_MB` liest und `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` anhängt.
- Node verwendet den letzten wiederholten Wert für `--max-old-space-size`, sodass durch das Setzen von `OMNIROUTE_MEMORY_MB` das effektive Docker-Heap-Limit gesteuert wird.
- Da das Image diese Variable immer setzt, kommt der RAM-kalibrierte Fallback des Launchers unter Docker nie zur Anwendung. Erhöhen Sie den Wert explizit für die jeweilige Arbeitslast (siehe Tabelle unten). `2048` ist für `/v1/responses` von Coding-Agenten weiterhin zu klein.

### Laufzeit-RAM für Coding-Agenten

Der Docker-Standardwert von 1 GiB ist eine Untergrenze für das Dashboard und einfache Chats, keine Größe für den Produktionseinsatz. Lange `POST /v1/responses`-Bodies (Hunderte Nachrichten, Dutzende Tools) halten während der Komprimierung mehrere In-Memory-Graphen vor. Zwei sich überschneidende Anfragen mit jeweils ~3 MiB / ~750k Token haben V8 selbst bei einem **12 GiB** großen Old-Space zum Abbruch gebracht (`FATAL ERROR: Reached heap limit`) und zudem einen cgroup-OOM bei 16 GiB ausgelöst. Siehe [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensionieren Sie den **cgroup-Parameter `--memory` größer als den Heap** — native Puffer, SQLite und Zwischenprodukte der Komprimierung befinden sich außerhalb von V8.

| Arbeitslast                             | `OMNIROUTE_MEMORY_MB`       | Container / cgroup       | Hinweise                                                                                                                           |
| --------------------------------------- | --------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, ein einfacher Chat           | `1024` (Image-Standardwert) | ≥2 GiB                   |                                                                                                                                    |
| Ein Coding-Agent (Claude/Codex/Grok)    | `8192`                      | ≥10 GiB                  | Typische `/v1/responses`-Einzelsitzung                                                                                             |
| Zwei parallele lange `/v1/responses`    | `10240`–`12288`             | ≥12–16 GiB               | Gemessener V8-Abbruch bei einem Heap von ~12 GiB                                                                                   |
| Drei oder mehr parallele lange Kontexte | nicht in einem Prozess      | serialisieren / mehr RAM | Standardmäßig ist eine rechenintensive Anfrage gleichzeitig zulässig; eine Erhöhung ohne zusätzlichen RAM führt erneut zum Abbruch |

`omniroute serve` auf Bare Metal kalibriert den Wert auf ~35 % des RAM (begrenzt auf `[512, 4096]`), wenn `OMNIROUTE_MEMORY_MB` **nicht gesetzt** ist. Docker setzt immer `1024`, sodass diese Kalibrierung im offiziellen Image nie ausgeführt wird.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritische Umgebungsvariablen

Zusätzlich zu den in [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumentierten Standardwerten sind beim Betrieb unter Docker die folgenden Variablen besonders wichtig:

| Variable                      | Zweck                                                                                                                                                                                                                                                                                     | Standardwert                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Gemeinsames Geheimnis für die WebSocket-Bridge. **In der Produktion erforderlich** — auf eine starke, zufällige Zeichenfolge setzen.                                                                                                                                                      | nicht gesetzt (muss angegeben werden) |
| `REDIS_URL`                   | Verbindungszeichenfolge für das Backend des Rate-Limiters/Caches                                                                                                                                                                                                                          | `redis://redis:6379`                  |
| `REDIS_PORT`                  | Hostseitiger Port für den enthaltenen Redis-Container                                                                                                                                                                                                                                     | `6379`                                |
| `REDIS_BIND_HOST`             | Hostschnittstelle, auf der der Port des enthaltenen Redis-Containers veröffentlicht wird (Loopback, sofern Sie nicht AUTH hinzufügen)                                                                                                                                                     | `127.0.0.1`                           |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hostpfad, der für Self-Update-Workflows im Profil `cli` unter `/workspace/omniroute` eingebunden wird                                                                                                                                                                                     | `.` (aktuelles Verzeichnis)           |
| `OMNIROUTE_MEMORY_MB`         | Obergrenze für den Node-Heap des eigenständigen Docker-Servers zur Laufzeit; überschreibt den oben genannten Standardwert des Images. Coding-Agenten: `8192`+ (siehe [Laufzeit-RAM](#runtime-ram-for-coding-agents)).                                                                     | `1024`                                |
| `DASHBOARD_PORT` / `API_PORT` | Überschreibt die veröffentlichten Ports für das Dashboard (20128) und die API (20129)                                                                                                                                                                                                     | `20128` / `20129`                     |
| `APP_BIND_HOST`               | Hostschnittstelle, auf der docker-compose die Dashboard-/API-/Live-WS-Ports veröffentlicht. Bei `REQUIRE_API_KEY=false` (dem Standardwert) macht `0.0.0.0` den anonymen `/v1`-Proxy im LAN verfügbar — nur mit `REQUIRE_API_KEY=true` oder einem vorgeschalteten Reverse-Proxy erweitern. | `127.0.0.1`                           |
| `CLIPROXY_BIND_HOST`          | Hostschnittstelle, auf der docker-compose den `cliproxyapi`-Sidecar veröffentlicht — dessen Daten-Volume enthält die Zugangsdaten der Anbieter.                                                                                                                                           | `127.0.0.1`                           |
| `OMNIROUTE_PLUGINS_DIR`       | Verzeichnis, das der Plugin-Scanner zur Laufzeit liest und als Installationsziel verwendet. Legen Sie es fest, wenn Plugins per Bind-Mount eingebunden werden: Der Standardwert richtet sich nach `HOME`, das von einem Image nicht zwingend exportiert wird.                             | `~/.omniroute/plugins`                |
| `OMNIROUTE_BASE_PATH`         | URL-Unterpfad, wenn die App hinter einem Reverse-Proxy veröffentlicht wird (z. B. `/omniroute`)                                                                                                                                                                                           | _(leer = Stammverzeichnis)_           |
| `NEXT_PUBLIC_BASE_URL`        | Öffentlicher Browser-Ursprung einschließlich des Unterpfads (z. B. `https://host/omniroute`)                                                                                                                                                                                              | nicht gesetzt                         |
| `PROD_DASHBOARD_PORT`         | Hostseitiger Dashboard-Port für `docker-compose.prod.yml`                                                                                                                                                                                                                                 | `20130`                               |
| `CLIPROXYAPI_PORT`            | Hostseitiger Port für den `cliproxyapi`-Sidecar                                                                                                                                                                                                                                           | `8317`                                |

## Reverse-Proxy auf einem Unterpfad (Traefik / nginx)

Der Next.js-`basePath` wird in das Standalone-Bundle einkompiliert. OmniRoute speichert
den eingebetteten Wert in einer Sentinel-Datei im App-Stammverzeichnis (geschrieben
während `npm run build`; gelesen von `scripts/docker/ensure-docker-base-path.mjs`) und
vergleicht ihn beim Start des Containers mit `OMNIROUTE_BASE_PATH`. Wenn sich die Werte
unterscheiden und das Image für den Domain-Stammpfad erstellt wurde, schreibt der
Entrypoint die Standalone-Manifeste, die eingebetteten `basePath`-/`assetPrefix`-Literale
(Next 16 rendert SSR-Asset-URLs ausschließlich aus `assetPrefix` — der Patcher übernimmt
den Unterpfad deshalb auch dort hinein), die eingebetteten `/_next/static`-Asset-URLs
(Client-Reference-Manifeste, Medienimporte, vorgerenderte Fehlerseiten) und den
clientseitigen `process.env`-Shim um, bevor `node dev/run-standalone.mjs` ausgeführt
wird.

### Compose-Build (empfohlen)

Legen Sie beide Variablen in `.env` fest und erstellen Sie das Image anschließend neu,
damit Image und Laufzeitumgebung übereinstimmen:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` übergibt `OMNIROUTE_BASE_PATH` sowohl als Docker-Build-Argument als
auch als Umgebungsvariable zur Laufzeit.

### Vorgefertigtes Root-Image + Unterpfad zur Laufzeit

Veröffentlichte `diegosouzapw/omniroute:*`-Images werden für den Domain-Stammpfad
erstellt. Sie können `OMNIROUTE_BASE_PATH` dennoch zur Laufzeit festlegen; der Container
patcht das Bundle beim Start einmalig. Kombinieren Sie dies mit dem passenden
öffentlichen Ursprung:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurieren Sie den Reverse-Proxy so, dass er den **vollständigen** externen Pfad
weiterleitet (das Präfix darf nicht entfernt werden). Traefik sollte
`PathPrefix(`/omniroute`)` ohne `StripPrefix` an den Container weiterleiten, sodass
Next.js `/omniroute/...` empfängt und Assets über `/omniroute/_next/...` bereitstellt.

Der Docker-Healthcheck prüft den leichtgewichtigen Lebenszyklus-Endpunkt `/healthz`,
dem der aktive `OMNIROUTE_BASE_PATH` vorangestellt wird.
`/api/monitoring/health` bleibt für Diagnosezwecke durch Benutzer oder Dashboards
verfügbar. Um den Container-HEALTHCHECK wieder auf diesen Endpunkt zu verweisen
(beispielsweise zur Durchsetzung einer umfassenden Integritätsprüfung), setzen Sie
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Dieser Pfad führt eine
**umfassende** Prüfung durch (Datenbank + Monitoring-Zusammenfassung) — dies eignet sich
für den selten ausgeführten Docker-`HEALTHCHECK`, wenn Sie ihn wieder aktivieren, aber
**nicht** für die Intervalle einer Kubernetes-`livenessProbe`.

Für Orchestratoren (Kubernetes, Nomad usw.):

| Probe           | Bevorzugen                                                          | Vermeiden                                                                 |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez` oder TCP am Hauptport (`PORT`, Standard: `20128`) | `/api/monitoring/health` als Liveness-Prüfung                             |
| Readiness       | HTTP `GET /healthz`                                                 | Kurze Timeouts, die eine ausgelastete Ereignisschleife als Ausfall werten |
| Deep / Blackbox | `/api/monitoring/health`                                            | —                                                                         |

`/healthz` meldet den Prozesslebenszyklus (`ok` / `starting` / `stopping`). `/livez`
prüft ausschließlich, ob der Prozess aktiv ist (200, sobald der Handler ausgeführt
werden kann; der Endpunkt wartet nicht auf die Betriebsbereitschaft). Beide werden
weiterhin in derselben Node-Ereignisschleife wie die Anfrageverarbeitung ausgeführt,
sodass CPU-intensive Katalog- oder Komprimierungsarbeiten sie verzögern können —
ausgelastet ≠ ausgefallen. Bevorzugen Sie TCP-Liveness-Prüfungen, wenn HTTP-Probes wegen
Zeitüberschreitung fehlschlagen. Vollständige Empfehlungen zu Probes:
[Monitoring-Leitfaden — Empfehlungen für Kubernetes-Probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose mit Caddy (automatisches HTTPS-TLS)

OmniRoute kann mithilfe der automatischen SSL-Bereitstellung von Caddy sicher veröffentlicht werden. Stellen Sie sicher, dass der DNS-A-Eintrag Ihrer Domain auf die IP-Adresse Ihres Servers verweist.

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
      # Browserseitiger Ursprung für OAuth-Callbacks, Dashboard-Links und generierte öffentliche URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interne Server-zu-Server-URL für geplante Aufgaben und Selbstabfragen.
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

Caddy setzt die standardmäßigen Weiterleitungs-Header für den Upstream-Container. OmniRoute verwendet
`NEXT_PUBLIC_BASE_URL` als kanonischen öffentlichen Ursprung für OAuth-Callbacks und generierte öffentliche
Links; authentifizierte Schreibvorgänge im Dashboard verwenden Same-Origin-Anfragen sowie sitzungsgebundenen CSRF-
Schutz. Aktivieren Sie `OMNIROUTE_TRUST_PROXY` nur für fortgeschrittene Bereitstellungen, bei denen OmniRoute den
öffentlichen Ursprung absichtlich aus vertrauenswürdigen weitergeleiteten Headern anstatt aus einer expliziten
Konfiguration ableiten soll.

## Cloudflare Quick Tunnel

Die Dashboard-Unterstützung für Docker-Bereitstellungen umfasst einen per Klick aktivierbaren **Cloudflare Quick Tunnel** unter `Dashboard → Endpoints`. Bei der ersten Aktivierung wird `cloudflared` nur bei Bedarf heruntergeladen, ein temporärer Tunnel zu Ihrem aktuellen `/v1`-Endpunkt gestartet und die generierte URL `https://*.trycloudflare.com/v1` direkt unterhalb Ihrer normalen öffentlichen URL angezeigt.

Tunnel-Panels für Endpunkte (Cloudflare, Tailscale, ngrok) können unter `Settings → Appearance` ein- oder ausgeblendet werden, ohne den aktiven Tunnel-Status zu ändern.

### Hinweise zu Tunneln

- Quick-Tunnel-URLs sind temporär und ändern sich nach jedem Neustart.
- Quick Tunnels werden nach einem Neustart von OmniRoute oder des Containers nicht automatisch wiederhergestellt. Aktivieren Sie sie bei Bedarf erneut über das Dashboard.
- Die verwaltete Installation unterstützt derzeit Linux, macOS und Windows auf `x64` / `arm64`.
- Verwaltete Quick Tunnels verwenden standardmäßig HTTP/2 als Transportprotokoll, um störende Warnungen zu QUIC-UDP-Puffern in eingeschränkten Container-Umgebungen zu vermeiden. Setzen Sie `CLOUDFLARED_PROTOCOL=quic` oder `auto`, wenn Sie ein anderes Transportprotokoll verwenden möchten.
- Docker-Images enthalten die CA-Stammzertifikate des Systems und übergeben sie an das verwaltete `cloudflared`. Dadurch werden TLS-Vertrauensfehler vermieden, wenn der Tunnel innerhalb des Containers initialisiert wird.
- Setzen Sie `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, wenn OmniRoute eine vorhandene Binärdatei verwenden soll, anstatt eine herunterzuladen.

## Image-Tags

| Image                    | Tag      | Größe  | Beschreibung                                                  |
| ------------------------ | -------- | ------ | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Höchste **veröffentlichte** stabile SemVer (nicht git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Diese Tag-Klasse für GitOps fest vorgeben                     |

Multi-Plattform-Manifest: nativ für `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker wählt automatisch die passende Architektur aus; übergeben Sie `--platform linux/amd64`, wenn Sie die AMD64-Emulation auf ARM-Hosts erzwingen müssen.

### Veröffentlichungskanäle

OmniRoute veröffentlicht separate Docker-Kanäle für stabile Releases, Tests des aktiven Release-Branches und Entwicklungs-Builds.

| Kanal                           | Quelle                                        | Veränderbarkeit                    | Empfohlene Verwendung                                                                                                                      |
| ------------------------------- | --------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Signiertes/versioniertes Release              | Unveränderlich                     | Produktionsbereitstellungen, die auf ein exaktes Release festgelegt sind                                                                   |
| `:latest` / `:latest-web`       | Höchste **veröffentlichte** stabile SemVer    | Veränderlicher stabiler Zeiger     | Folgt stabilen Releases **nach** einem SemVer-Veröffentlichungsjob — verfolgt **nicht** `main` oder unveröffentlichte `release/v*`-Commits |
| `:next` / `:next-web`           | Aktueller standardmäßiger `release/v*`-Branch | Veränderlicher Vorabversionszeiger | Testen von Fehlerbehebungen, die im aktiven Release-Branch enthalten, aber noch nicht Teil eines stabilen Releases sind                    |
| `:main` / `:main-web`           | `main`-Branch                                 | Veränderlicher Entwicklungszeiger  | Nur für Entwicklungs- und Integrationstests                                                                                                |

#### Websitzungsanbieter: die `-web`-Images

Jeder der oben genannten Kanäle ist auch als `-web`-Tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) verfügbar und wird aus der Stufe `runner-web` erstellt — dasselbe Image, ergänzt um Playwright und einen Chromium-Browser. Das normale Image wird **ohne** Chromium ausgeliefert; `gemini-web`, `claude-web` und `claude-turnstile` benötigen ihn.

Der Fehler tritt verzögert und nicht beim Start auf: Diese Anbieter führen ihre Modelle auf und werden im Dashboard als verbunden angezeigt; erst die erste Anfrage schlägt mit folgender Meldung fehl:

```
[500]: Externes Modul playwright konnte nicht geladen werden: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Wenn Sie diese Anbieter verwenden, laden Sie das `-web`-Tag des Kanals herunter, den Sie bereits nutzen — alles andere bleibt unverändert. Bei einer npm-/CLI-Installation (ohne Docker-Image) fehlt entsprechend das Browser-Binärprogramm: Führen Sie auf dem Host `npx playwright install chromium` aus.

#### Verwendung des Vorabversionskanals

Der Kanal `next` wird bei jedem Push zum aktuellen standardmäßigen `release/v*`-Branch neu erstellt und sowohl für AMD64 als auch für ARM64 veröffentlicht. Ältere Wartungs-Branches können ihn nicht überschreiben. Der Kanal stellt ein abrufbares Image für Fehlerbehebungen bereit, die vor der Erstellung des nächsten stabilen Tags in den aktiven Release-Branch zusammengeführt wurden.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Überschreiben Sie bei Docker Compose das vom ausgewählten Profil verwendete Image-Tag und laden Sie den Dienst anschließend herunter und erstellen Sie ihn neu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sicherheit und Rollback

`next` ist ein dynamischer Vorabversionskanal. Er kann sich bei jedem Push zum aktiven Release-Branch ändern und wird **nicht für den Produktionseinsatz unterstützt**. Legen Sie den Image-Digest fest, während Sie einen bestimmten Build evaluieren:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sichern Sie vor dem Testen das OmniRoute-Daten-Volume oder das per Bind-Mount eingebundene Datenverzeichnis. Um einen Rollback durchzuführen, stellen Sie die zuvor verwendete stabile Version beziehungsweise den zuvor verwendeten Digest wieder her und erstellen Sie den Container neu:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Ein Release-Branch-Build kann `latest` niemals verschieben; nur eine geeignete stabile semantische Version darf den stabilen Zeiger aktualisieren. Für die `next`-Images bleiben die Prüfung des Release-Images und das blockierende Gate für KRITISCHE Schwachstellen bestehen.

**`latest` ist keine Aktualitätsgarantie für git.** Zusammengeführte Fehlerbehebungen auf `main` oder dem aktiven `release/v*`-Branch sind erst dann in `:latest` enthalten, wenn ein stabiles SemVer-Image veröffentlicht wurde und der Veröffentlichungsjob `:latest` aktualisiert hat (identischer Digest wie bei dieser SemVer). Wenn `latest` unverändert erscheint, obwohl die Fehlerbehebung bereits auf GitHub angezeigt wird, laden Sie `:next` herunter, um den Release-Branch zu testen, oder warten Sie auf das SemVer-Tag.

| Ihr Ziel                                                                                        | Zu verwenden                                   |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| GitOps/Produktion ohne unerwartete Änderungen                                                   | `:X.Y.Z` (oder den Image-Digest) fest vorgeben |
| Veröffentlichten stabilen Versionen folgen und bei jedem Release eine Neuerstellung akzeptieren | `:latest`                                      |
| Unveröffentlichte `release/v*`-Commits testen                                                   | `:next` (nicht für die Produktion)             |
| `main` testen                                                                                   | `:main` (nicht für die Produktion)             |

## Verfügbarkeit: Standard-SQLite unterstützt nur eine Replik

Die standardmäßige Docker-/Kubernetes-Bereitstellung von OmniRoute besteht aus **einem Node-Prozess und einem SQLite-Writer**. Hochverfügbarkeit wird mit dieser Topologie **nicht unterstützt**.

| Einschränkung                                           | Konsequenz                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Einzelner Writer                                        | Führen Sie **nicht** mehrere Replikate mit derselben SQLite-Datei aus. Dadurch wird die Datenbank beschädigt.                                                                                                                                                                                                                                                                          |
| Neuerstellung / Neustart / Beendigung durch HEALTHCHECK | **Vollständiger Ausfall** laufender SSE-Verbindungen, Dashboard-Sitzungen und des In-Memory-Zustands. Die Verbindung aller verbundenen Clients wird getrennt. Neue Anfragen während des Zeitfensters ohne Endpunkt erhalten vom Reverse-Proxy **`502 Bad Gateway: Unknown error`** statt OmniRoute-JSON — Clients können dies nicht von einem Provider-Ausfall unterscheiden (#11015). |
| Gleiche Ereignisschleife wie `/healthz`                 | Ein ausgelasteter Katalog- oder Komprimierungszyklus kann Prüfungen verzögern; ein kurzes Timeout startet dann das **einzige** Replikat neu.                                                                                                                                                                                                                                           |

**Prüfungsmatrix** (siehe auch [Empfehlungen für Kubernetes-Probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Prüfung                  | Ziel                                                                          | Nicht verwenden                                                                  |
| ------------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Liveness                 | TCP auf `PORT` (Standard: `20128`) oder einfache HTTP-Prüfung über `/healthz` | `/api/monitoring/health`                                                         |
| Readiness                | HTTP `GET /healthz`                                                           | Kurze Timeouts, die eine ausgelastete Ereignisschleife als ausgefallen behandeln |
| Tiefenprüfung / Menschen | `/api/monitoring/health`                                                      | Automatisierte kubelet-Liveness-Prüfung                                          |

**Upgrades:** Rechnen Sie damit, dass jede Sitzung getrennt wird. Leiten Sie Clients nach Möglichkeit kontrolliert ab; mit Standard-SQLite gibt es kein Rolling Update. Compose mit `restart: unless-stopped` und Docker-`HEALTHCHECK` ersetzt außerdem den einzigen Prozess, wenn der Container den Status „Unhealthy“ erhält — mit demselben Auswirkungsbereich.

Kubernetes-Beispiel für **ein einzelnes Replikat** (`Recreate` ist erforderlich; erhöhen Sie `replicas` nicht, wenn nur eine SQLite-Datei verwendet wird):

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

Die `preStop`-Pause ermöglicht es kube, Service-Endpunkte vor SIGTERM zu entfernen, sodass **neuer** Datenverkehr nicht mehr an den beendeten Prozess gesendet wird. Laufende `/v1/responses`-SSE-Verbindungen werden über umfangreiche Admission-Leases bis zu `SHUTDOWN_TIMEOUT_MS` (standardmäßig 30 Sekunden) kontrolliert beendet (#11015). Neue Anfragen, die den Prozess dennoch erreichen, erhalten `503` plus `Retry-After: 5`. Die durch `Recreate` verursachte Lücke ohne Endpunkt bleibt bis zur Readiness des Ersatzprozesses ein vollständiger Ausfall — dies ist eine Folge der SQLite-Topologie und keine Fehlkonfiguration der Probes.

Externes Postgres bzw. Multi-Writer-HA ist **kein** dokumentierter Standardpfad. Wenn Sie HA benötigen, bleiben Sie bei einem einzelnen Replikat oder verwenden Sie eine Topologie, die vom Projekt separat getestet und dokumentiert wurde. Die Arbeiten an Postgres/MySQL werden in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) verfolgt. Bis diese verfügbar sind, besteht die einzige unterstützte Möglichkeit zur Vervielfachung der Kapazität für **große** `/v1/responses`-Anfragen aus N unabhängigen Prozessen (nächster Abschnitt), nicht aus `replicas > 1` auf einem einzelnen Volume.

## Horizontale Skalierung: N unabhängige Prozesse

Ein Node-Prozess entspricht **einem V8-Heap**. Zwei sich überschneidende Coding-Agent-Anfragen `POST /v1/responses` (RTK + Caveman) mit jeweils ~3 MiB / ~750k Token bringen diesen Heap bei ~12 Gi zum Abbruch (`FATAL ERROR: Reached heap limit`) und können in einer 16-Gi-cgroup einen OOM auslösen. Siehe [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Diese Messung ist eine Warnung zum **Arbeitsspeicherbudget**, keine feste Produktobergrenze von zwei gleichzeitigen langen `/v1/responses`. Die Zulassung ressourcenintensiver Chats wird durch ein automatisch abgeleitetes Byte-Budget für eingehende Anfragen (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) begrenzt, das anhand derselben V8-/cgroup-Obergrenze dimensioniert wird — dieses Budget nach oben zu überschreiben (oder die ältere anfrageanzahlbasierte Obergrenze `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` festzulegen), führt bei einem bereits dimensionierten Prozess wieder zum Abbruch. Kleine Chats, `/healthz`, `/v1/models` und MCP fallen **nicht** unter diese Obergrenze.

### Ein Prozess: mehr als zwei lange `/v1/responses`

Ein **fehlerfrei arbeitender** Prozess (Heap unter `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standardmäßig `0.75`) **kann** mehr als zwei lange `POST /v1/responses` gleichzeitig ausführen, sofern das prozessweite Byte-Budget für laufende Anfragen (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) noch Kapazität hat. Anfragetexte ab `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standardmäßig 256 KiB) erhalten dieselbe ressourcenintensive Lease wie strukturintensive Anfragen und verwenden denselben `tryAcquireHealthyHeadroom`-Ausweichmechanismus aus [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dutzende gleichzeitige langlebige SSE-Clients (Betreiber benötigen häufig 40–50) sind eine Frage des **Arbeitsspeicherbudgets** — Heap + primäre/Headroom-Slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — und keine feste Produktgrenze von „maximal 2“. Ein unter Druck stehender Heap weist Anfragen weiterhin mit einem wiederholbaren `503` ab, damit #7849 nicht erneut auftritt.

Um **mehrere Heaps** (unabhängige V8-Old-Spaces) **bereits heute** zu nutzen:

| Empfohlen                                                                                                                                                                                                  | Nicht empfohlen                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **N Container/Pods** mit jeweils eigenem `DATA_DIR` / Volume ausführen                                                                                                                                     | `replicas > 1` für eine einzige SQLite-Datei festlegen                                    |
| Ressourceintensive laufende Anfragen + Healthy Headroom anhand des Heap-/Byte-Budgets für laufende Anfragen dimensionieren; 1–2 ist der konservative Standardwert aus #7849, keine feste Produktobergrenze | Einem Prozess 8× RAM und eine unbegrenzte Anzahlobergrenze zuweisen                       |
| Optional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` für **gemeinsam genutzte Kontingentzähler**                                                                                                 | Redis als gemeinsam genutztes SQLite behandeln — das ist es nicht                         |
| Provider-Geheimnisse in jede Instanz duplizieren (oder getrennte Dashboards akzeptieren)                                                                                                                   | Ein einziges Dashboard / ein einziges Aufrufprotokoll über alle Instanzen hinweg erwarten |
| Einen beliebigen Load-Balancer vorschalten; Sticky Sessions nach API-Schlüssel oder Sitzung reichen aus                                                                                                    | Eine anbieterspezifische, größenabhängige Middleware voraussetzen                         |

Hardware: Die Anzahl gleichzeitiger langer `/v1/responses` pro Instanz ist eine Frage des **Arbeitsspeicherbudgets** (Heap + Byte-Budget für laufende Anfragen / #10110). `N` unabhängige `DATA_DIR`s vervielfachen weiterhin die Heaps: Der Host-Arbeitsspeicher muss `N × cgroup` abdecken, nicht „ein 16-Gi-Pod mit N=8“. Niemals `replicas > 1` für eine einzige SQLite-Datei verwenden.

Compose-Beispiel (zwei Heaps, zwei Volumes — nicht `deploy.replicas: 2`):

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

Prozessinterne Dichte (Komprimierung außerhalb des HTTP-Isolates) wird in [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) behandelt. Ein logischer Cluster auf gemeinsam genutztem persistentem Zustand wird in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) behandelt.

## Wichtige Hinweise

- **SQLite-WAL-Modus:** `docker stop` sollte vollständig abgeschlossen werden können, damit OmniRoute die neuesten Änderungen per Checkpoint zurück in `storage.sqlite` schreiben kann. Die mitgelieferten Compose-Dateien legen bereits eine Stop-Toleranzfrist von 40 Sekunden fest. Wenn Sie das Image direkt ausführen, verwenden Sie weiterhin `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Setzen Sie diese Variable auf `true`, wenn routinemäßige Backups bzw. Backups vor Schreibvorgängen extern verwaltet werden. Migrationen bestehender Datenbanken benötigen dennoch einen eigenen dauerhaften Sicherheits-Snapshot und eine Schutzvorkehrung für Massenmigrationen.
- **Datenpersistenz:** Binden Sie immer ein Volume unter `/app/data` ein, damit Ihre Datenbank, Schlüssel und Konfigurationen über Container-Neustarts hinweg erhalten bleiben.
- **Portkonfiguration:** Überschreiben Sie die Umgebungsvariable `PORT`, um den Standardport `20128` zu ändern.

## Siehe auch

- [Leitfaden zur VM-Bereitstellung](../ops/VM_DEPLOYMENT_GUIDE.md) — Einrichtung mit VM + nginx + Cloudflare
- [Leitfaden zur Fly.io-Bereitstellung](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Bereitstellung auf Fly.io
- [Umgebungskonfiguration](../reference/ENVIRONMENT.md) — Vollständige `.env`-Referenz
