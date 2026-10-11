# 🐳 Docker Guide — OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Vollständige Referenz für Docker-Bereitstellungen. Für einen schnellen Einstieg siehe den [Docker-Abschnitt der README](../README.md#-docker).

## Inhaltsverzeichnis

- [Schnellstart](#quick-run)
- [Mit Umgebungsdatei](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Verfügbare Profile](#available-profiles)
- [Konfiguration von CLI-Werkzeugen auf dem Host, wenn OmniRoute in Docker ausgeführt wird](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-Sidecar](#redis-sidecar)
- [Produktions-Compose](#production-compose)
- [Dockerfile-Stufen](#dockerfile-stages)
- [Kritische Umgebungsvariablen](#critical-environment-variables)
- [Docker Compose mit Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image-Tags](#image-tags)
- [Verfügbarkeit: Standard-SQLite unterstützt nur eine Replik](#availability-default-sqlite-is-single-replica)
- [Regionale Gemini-Fehler innerhalb von Docker](#gemini-regional-errors-inside-docker)
- [Wichtige Hinweise](#important-notes)

---

## Schnellstart

> **Self-Hosting mit einem einzigen Befehl?** Siehe den
> [Self-Hosting-Leitfaden](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (veröffentlichtes Image +
> Redis, nur über Loopback erreichbar, keine Profilauswahl). Der folgende Schnellstart ist der
> Einzelcontainer-Weg für Benutzer, die Redis bereits an anderer Stelle betreiben.

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
# Basisprofil (keine CLI-Werkzeuge)
docker compose --profile base up -d

# CLI-Profil (Claude Code, Codex und OpenClaw integriert)
docker compose --profile cli up -d

# Host-Profil (primär für Linux; bindet CLI-Binärdateien des Hosts schreibgeschützt ein)
docker compose --profile host up -d

# Webprofil (Chromium/Playwright für Websitzungsanbieter)
docker compose --profile web up -d

# CLI und CLIProxyAPI-Sidecar kombinieren
docker compose --profile cli --profile cliproxyapi up -d
```

## Verfügbare Profile

OmniRoute enthält Compose-Profile für die wichtigsten Bereitstellungsvarianten. Wählen Sie das Profil, das zu Ihrer Umgebung passt.

| Profil            | Dienst           | Verwendungszweck                                                                                                                                              | Befehl                                       |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (Standard) | `omniroute-base` | Headless-Server/minimale Laufzeitumgebung, keine mitgelieferten Anbieter-CLIs                                                                                 | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentische Workflows, die `omniroute providers/setup/doctor` und mitgelieferte CLIs (Codex, Claude Code, Droid, OpenClaw) aufrufen                            | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-Hosts, die durch schreibgeschütztes Einbinden von `~/.local/bin`, `~/.codex`, `~/.claude` usw. `network_mode`-ähnlichen Zugriff auf Host-CLIs benötigen | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Den [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-Sidecar auf Port `8317` für vorgelagertes CLI-Proxying ausführen                              | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Websitzungsanbieter, die einen Browser benötigen: `gemini-web`, `claude-web`, `claude-turnstile` (erstellt `runner-web`, Chromium enthalten)                  | `docker compose --profile web up -d`         |

> Mehrere Profile können kombiniert werden: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurieren von Host-CLI-Tools, wenn OmniRoute in Docker ausgeführt wird

`omniroute setup-codex`, `setup-claude`, `config set <tool>` und die Schaltfläche
**Konfiguration speichern** im Dashboard schreiben Dateien wie `~/.codex/*.config.toml`. Diese Pfade
haben nur auf dem Rechner eine Bedeutung, auf dem die CLI tatsächlich ausgeführt wird. Werden sie innerhalb
des Containers ausgeführt, landet der Schreibvorgang im Home-Verzeichnis des Containers (`/home/node` —
das Image wird als `USER node` ausgeführt), wo keine Host-CLI die Dateien jemals liest und wo sie
verworfen werden, sobald der Container neu erstellt wird.

OmniRoute erkennt dies und verweigert den Schreibvorgang mit entsprechenden Anweisungen, anstatt
einen Erfolg zu melden, den Sie nicht nutzen können: Die CLI wird mit `2` beendet und die API antwortet mit `422`
und `containerEphemeralTarget: true`.

### Empfohlen: CLI auf dem Host, OmniRoute in Docker ausführen

Der Container stellt die API bereit; die CLI konfiguriert Ihre Host-Tools.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI auf den Container ausrichten
omniroute setup-codex                      # schreibt in das tatsächliche ~/.codex auf Ihrem Host
```

Dies ist die richtige Wahl, wenn Codex, Claude Code, Cursor oder ähnliche Tools auf Ihrem
Laptop ausgeführt werden — was der üblichen Einrichtung entspricht.

### Alternative: Host-Konfigurationsverzeichnisse per Bind-Mount einbinden (`host`-Profil)

Wenn der Container selbst Ihre Host-Konfiguration schreiben soll, binden Sie die
Verzeichnisse ein und richten Sie `CLI_CONFIG_HOME` auf das Stammverzeichnis des Mounts. Das `host`-Profil
übernimmt dies bereits:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Ein Bind-Mount macht den Pfad vertrauenswürdig: OmniRoute liest
`/proc/self/mountinfo` und erlaubt Schreibvorgänge in eingehängte Pfade (sowie in Verzeichnisse,
deren Unterverzeichnisse Mounts sind, was genau der obigen Struktur von `/host-home` entspricht),
während Schreibvorgänge in nicht eingehängte Pfade weiterhin verweigert werden.

### Ausweichlösung: Container-eigene CLIs konfigurieren (sparsam verwenden)

Wenn sich die CLIs tatsächlich innerhalb des Containers befinden (das `cli`-Profil), ist der Schreibvorgang
beabsichtigt. Übergeben Sie `--allow-container-write` an einen beliebigen `setup-*`-Befehl oder setzen Sie
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` für den Server. Der Schreibvorgang wird
mit einer Warnung fortgesetzt, dass er die Neuerstellung des Containers nicht übersteht.

> **Sicherheitswarnung — `cli`-Profil + `docker.sock`-Mount.**
> Das `cli`-Profil bindet `/var/run/docker.sock` per Bind-Mount ein, damit der im Container ausgeführte
> automatische Updater den Stack über den Host-Daemon neu erstellen kann
> (`src/lib/system/autoUpdate.ts` prüft auf diesen Socket und überspringt den
> Docker-Pfad, wenn er nicht vorhanden ist). Dieser Socket stellt **eine Vertrauensgrenze mit
> Root-Rechten auf dem Host** dar: Alles, was darauf zugreifen kann, steuert den Docker-Daemon des Hosts als
> Root — es kann jeden Container auf dem Host erstellen, untersuchen, stoppen und entfernen.
> Konsequenzen:
>
> 1. **Geben Sie den Port des `cli`-Profils niemals im Netzwerk frei.** Veröffentlichen
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
> (`COMPOSE_PROFILES=core,redis` oder kürzer). Die anderen Profile binden
> den Docker-Socket nicht ein.
>
> Siehe `docs/security/MITM-TPROXY-DECRYPT.md` (git; nicht in `/docs` kompiliert) für das zugehörige Bedrohungsmodell
> rund um MITM und `docs/security/SUPPLY_CHAIN.md` für die
> Herkunftskette der `codex`-/`claude-code`-/`droid`-/`openclaw`-Binärdateien.

## Redis-Sidecar

OmniRoute nutzt Redis als Backend für den verteilten Rate-Limiter und den gemeinsam genutzten Cache. Der Dienst `redis` ist in `docker-compose.yml` **immer definiert** (er ist an kein Profil gebunden) und wird zusammen mit jedem anderen Profil gestartet.

| Detail                        | Wert                                          |
| ----------------------------- | --------------------------------------------- |
| Image                         | `redis:7-alpine`                              |
| Containername                 | `omniroute-redis`                             |
| Interner Port                 | `6379`                                        |
| Host-Port (überschreibbar)    | `REDIS_PORT` (Standardwert: `6379`)           |
| Host-Bindung (überschreibbar) | `REDIS_BIND_HOST` (Standardwert: `127.0.0.1`) |
| Volume                        | `omniroute-redis-data` → `/data`              |
| Integritätsprüfung            | `redis-cli ping` (Intervall: 10 s)            |

Zugehörige Umgebungsvariablen:

- `REDIS_URL` — in die Anwendung injizierte Verbindungszeichenfolge (standardmäßig `redis://redis:6379`).
- `REDIS_PORT` — hostseitige Portzuordnung für den Redis-Container.
- `REDIS_BIND_HOST` — Host-Schnittstelle, auf der der Port veröffentlicht wird. Standardmäßig `127.0.0.1`.

> **Warum standardmäßig Loopback verwendet wird:** Der Sidecar läuft ohne `requirepass`, und die
> Anwendungscontainer erreichen ihn über das Compose-Netzwerk (`redis:6379`) — der veröffentlichte Port
> ist nur für hostseitige Werkzeuge (`redis-cli`, ein lokales `npm run dev`) vorgesehen. Eine Veröffentlichung unter
> `0.0.0.0` würde allen Hosts in Ihrem LAN Zugriff auf eine nicht authentifizierte Redis-Instanz gewähren. Wenn Sie
> `REDIS_BIND_HOST=0.0.0.0` festlegen, fügen Sie außerdem `--requirepass` zum Dienstbefehl `command:` hinzu.

**Das Deaktivieren von Redis** wird nicht empfohlen (der Rate-Limiter wechselt dann auf eine weniger leistungsfähige In-Memory-Ausweichlösung). Falls es dennoch erforderlich ist, entfernen Sie entweder den Dienstblock `redis:` aus `docker-compose.yml` bzw. kommentieren ihn aus oder skalieren Sie ihn auf null:

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
| Daten-Volume                   | `omniroute-prod-data` (benannt, bleibt über erneute Builds hinweg erhalten)                       |
| Integritätsprüfungen           | `node healthcheck.mjs` + `redis-cli ping`, wobei `depends_on` vom Redis-Integritätsstatus abhängt |

Verwendung:

```bash
# Produktions-Stack erstellen und starten
docker compose -f docker-compose.prod.yml up -d --build

# Logs fortlaufend anzeigen
docker compose -f docker-compose.prod.yml logs -f

# Stack herunterfahren (Volumes beibehalten)
docker compose -f docker-compose.prod.yml down
```

Der Produktions-Stack läuft parallel zum Entwicklungs-Compose (mit unterschiedlichen Containernamen, Ports und Volumes), sodass Sie lokal weiterentwickeln können, während die Produktionsumgebung aktiv bleibt.

## Dockerfile-Stages

Das Repository enthält ein mehrstufiges Dockerfile (`Dockerfile`). Vier Stages werden bereitgestellt; wählen Sie das richtige `target` für Ihren Anwendungsfall.

| Stage         | Basis-Image           | Zweck                                                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installiert Abhängigkeiten (`npm ci --legacy-peer-deps`) und führt `npm run build` aus (standardmäßig Turbopack — siehe Build-Ressourcen unten)                                                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Produktionslaufzeit mit der Standalone-Ausgabe von Next.js. **Keine Anbieter-CLIs enthalten.**                                                                                                                                                                                                                               |
| `runner-cli`  | `runner-base`         | Fügt `git`, `docker.io`, `docker-compose` und globale CLIs hinzu: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Wählen Sie dies für agentenbasierte Workflows.**                                                                                                                                      |
| `runner-web`  | `runner-base`         | Fügt Playwright und einen Chromium-Browser (`--with-deps`) für Web-Session-Anbieter hinzu: `gemini-web`, `claude-web`, `claude-turnstile`. **Wählen Sie dies, wenn Sie diese Anbieter verwenden** — das einfache Image schlägt andernfalls zur Anfragezeit fehl (siehe den Hinweis zu `-web` unter Veröffentlichungskanäle). |

Ein bestimmtes Ziel manuell bauen:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Build-Ressourcen

Drei Build-Argumente steuern den Ressourcenbedarf des `builder`-Stages. Sie gelten nur zur Build-Zeit —
`OMNIROUTE_MEMORY_MB` (siehe unten) ist ein separater Laufzeitparameter.

| Build-Argument              | Standardwert | Wirkung                                                                                                |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` baut mit webpack: geringerer Spitzenspeicherbedarf, aber langsamer. `1` aktiviert Turbopack.       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | Obergrenze für den V8-Heap (`--max-old-space-size`) des gestarteten `next build`.                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Speist `CIRCLE_NODE_TOTAL`; Next leitet daraus `workers = N - 1` für die Erfassung der Seitendaten ab. |

`OMNIROUTE_BUILD_WORKERS` sollten Sie bei einem leistungsstarken Builder erhöhen
und bei einem Build mit begrenzten Ressourcen als Ursache vermuten, wenn dieser
**nach** `✓ Compiled successfully` abbricht. Jeder Worker für Seitendaten ist ein
eigener Prozess, ebenso wie der übergeordnete `next build`-Prozess selbst; bei
einer Reproduktion auf einem laufenden VPS (Issue #7518) wurde der maximale RSS
jedes Prozesses mit etwa 4,5 GB gemessen, unabhängig vom Heap-Flag in
`NODE_OPTIONS` (Turbopack kompiliert in nativem/Rust-Speicher außerhalb des
V8-Heaps). Der Standardwert `2` (→ 1 Worker, insgesamt 2 Prozesse) ist auf die
von GitHub gehosteten Runner mit 16 GB / 4 vCPUs ausgelegt, die von der
Veröffentlichungspipeline verwendet werden. Bei `8` (→ 7 Worker) ging diesem
Runner der Arbeitsspeicher aus und buildkit brach den Schritt mit
`ResourceExhausted: ... cannot allocate memory` ab; `3` (→ 2 Worker) passte
ebenfalls nicht mehr, nachdem der RSS pro Prozess direkt gemessen und nicht
nur abgeleitet wurde. `tests/unit/docker-build-memory-budget.test.ts` führt die
Berechnung anhand des gemessenen Werts durch und schlägt fehl, wenn einer der
beiden Parameter die Kapazität des Runners überschreitet.

Turbopack kompiliert in nativem Rust-Speicher, der sich **außerhalb** des
V8-Heaps befindet, daher begrenzt `OMNIROUTE_BUILD_MEMORY_MB` diesen nicht. Auf
einem Host mit einer Speicherobergrenze wird der Build dann vom OOM-Killer per
SIGKILL beendet, ohne jeglichen Fehlertext — er stoppt einfach mitten in
`Creating an optimized production build`, was eher wie ein Hängenbleiben als
wie Speichermangel wirkt. Deshalb verwendet das `Dockerfile` standardmäßig
webpack (`OMNIROUTE_USE_TURBOPACK=0`), anders als `npm run dev` / `npm run build`,
wo Turbopack standardmäßig im Code festgelegt ist: Ein einfaches
`docker build .` ohne Build-Argumente (wie es Railway und andere
Ein-Klick-Hosts ausführen) darf auf einem Builder mit Speicherbegrenzung nicht
lautlos abbrechen. Die veröffentlichten Images übergeben
`OMNIROUTE_USE_TURBOPACK=0` bereits explizit in `docker-publish.yml`. Aktivieren
Sie auf einem Builder mit reichlich RAM Turbopack für einen schnelleren Build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ist aktiviert, daher führt `next build` einen übergeordneten
Prozess **und** einen Worker-Prozess aus, und beide berücksichtigen
`OMNIROUTE_BUILD_MEMORY_MB` separat. Legen Sie die Container-Obergrenze auf
etwas mehr als ungefähr das Doppelte dieses Werts fest, nicht nur auf den
einfachen Wert.

Gemessen in diesem Quellbaum (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container-Obergrenze | Ergebnis                              |
| --------- | -------------------- | ------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | bei beiden lautlos durch OOM beendet  |
| webpack   | 8 GiB                | Build-Worker durch SIGKILL beendet    |
| webpack   | 12 GiB               | erfolgreich, Spitzenwert bei 11,1 GiB |

### Laufzeit-Standardwerte

Von `runner-base` exportierte Standardwerte: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Speicherverhalten in Docker:

- Das Image setzt `OMNIROUTE_MEMORY_MB=1024` und leitet daraus `NODE_OPTIONS=--max-old-space-size=1024` ab.
- Der eigentliche Serverprozess wird vom Standalone-Launcher gestartet, der `OMNIROUTE_MEMORY_MB` liest und `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` anhängt.
- Node verwendet den letzten wiederholten Wert für `--max-old-space-size`; durch das Setzen von `OMNIROUTE_MEMORY_MB` wird daher das effektive Docker-Heap-Limit gesteuert.
- Da das Image diese Variable immer setzt, kommt der eigene RAM-basierte Fallback des Launchers unter Docker nie zum Einsatz. Erhöhen Sie den Wert entsprechend der Arbeitslast explizit (siehe Tabelle unten). `2048` ist für `/v1/responses` von Coding-Agenten weiterhin zu klein.

### Laufzeit-RAM für Coding-Agenten

Der Docker-Standardwert von 1 GiB ist eine Untergrenze für das Dashboard und einfache Chats, keine Dimensionierung für den Produktivbetrieb. Lange `POST /v1/responses`-Bodies (Hunderte Nachrichten, Dutzende Tools) halten während der Komprimierung mehrere In-Memory-Graphen vor. Zwei sich überschneidende Anfragen mit jeweils ~3 MiB / ~750.000 Token haben V8 bei einem Old-Space von **12 GiB** zum Abbruch gebracht (`FATAL ERROR: Reached heap limit`) und außerdem bei einer 16-GiB-cgroup ein OOM ausgelöst. Siehe [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensionieren Sie **cgroup `--memory` oberhalb des Heaps** — native Puffer, SQLite und Zwischenprodukte der Komprimierung befinden sich außerhalb von V8.

| Arbeitslast                                 | `OMNIROUTE_MEMORY_MB`   | Container / cgroup       | Hinweise                                                                                                                           |
| ------------------------------------------- | ----------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, ein einfacher Chat               | `1024` (Image-Standard) | ≥2 GiB                   |                                                                                                                                    |
| Ein Coding-Agent (Claude/Codex/Grok)        | `8192`                  | ≥10 GiB                  | Typische `/v1/responses`-Einzelsitzung                                                                                             |
| Zwei gleichzeitige lange `/v1/responses`    | `10240`–`12288`         | ≥12–16 GiB               | Gemessener V8-Abbruch bei ~12 GiB Heap                                                                                             |
| Drei oder mehr gleichzeitige lange Kontexte | nicht in einem Prozess  | serialisieren / mehr RAM | Standardmäßig ist eine rechenintensive Anfrage gleichzeitig zulässig; eine Erhöhung ohne zusätzlichen RAM führt erneut zum Abbruch |

`omniroute serve` auf Bare Metal kalibriert auf ~35 % des RAM (begrenzt auf `[512, 4096]`), wenn `OMNIROUTE_MEMORY_MB` **nicht gesetzt** ist. Docker setzt immer `1024`, daher wird diese Kalibrierung im offiziellen Image nie ausgeführt.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritische Umgebungsvariablen

Über die in [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumentierten Standardwerte hinaus sind die folgenden Variablen beim Betrieb unter Docker besonders wichtig:

| Variable                      | Zweck                                                                                                                                                                                                                                                                                        | Standardwert                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Gemeinsames Geheimnis für die WebSocket-Bridge. **In Produktionsumgebungen erforderlich** — auf eine starke zufällige Zeichenfolge setzen.                                                                                                                                                   | nicht gesetzt (muss angegeben werden) |
| `REDIS_URL`                   | Verbindungszeichenfolge für das Backend zur Ratenbegrenzung und Zwischenspeicherung                                                                                                                                                                                                          | `redis://redis:6379`                  |
| `REDIS_PORT`                  | Hostseitiger Port für den mitgelieferten Redis-Container                                                                                                                                                                                                                                     | `6379`                                |
| `REDIS_BIND_HOST`             | Host-Schnittstelle, auf der der Port des mitgelieferten Redis-Containers veröffentlicht wird (Loopback, sofern Sie nicht AUTH hinzufügen)                                                                                                                                                    | `127.0.0.1`                           |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Host-Pfad, der im Profil `cli` für Selbstaktualisierungsabläufe unter `/workspace/omniroute` eingehängt wird                                                                                                                                                                                 | `.` (aktuelles Verzeichnis)           |
| `OMNIROUTE_MEMORY_MB`         | Obergrenze für den Node-Heap des eigenständigen Docker-Servers zur Laufzeit; überschreibt den oben angegebenen Standardwert des Images. Für Coding-Agenten: `8192`+ (siehe [Arbeitsspeicher zur Laufzeit](#runtime-ram-for-coding-agents)).                                                  | `1024`                                |
| `DASHBOARD_PORT` / `API_PORT` | Überschreibt die veröffentlichten Ports für das Dashboard (20128) und die API (20129)                                                                                                                                                                                                        | `20128` / `20129`                     |
| `APP_BIND_HOST`               | Host-Schnittstelle, auf der docker-compose die Dashboard-, API- und Live-WS-Ports veröffentlicht. Bei `REQUIRE_API_KEY=false` (Standardeinstellung) gibt `0.0.0.0` den anonymen `/v1`-Proxy im LAN frei — nur mit `REQUIRE_API_KEY=true` oder einem vorgeschalteten Reverse-Proxy erweitern. | `127.0.0.1`                           |
| `CLIPROXY_BIND_HOST`          | Host-Schnittstelle, auf der docker-compose den Sidecar `cliproxyapi` veröffentlicht — sein Daten-Volume enthält die Anbieter-Anmeldedaten.                                                                                                                                                   | `127.0.0.1`                           |
| `OMNIROUTE_PLUGINS_DIR`       | Verzeichnis, das der Laufzeit-Plugin-Scanner liest und in das er installiert. Legen Sie es fest, wenn Plugins per Bind-Mount eingebunden werden: Der Standardwert richtet sich nach `HOME`, das von einem Image nicht zwingend exportiert wird.                                              | `~/.omniroute/plugins`                |
| `OMNIROUTE_BASE_PATH`         | URL-Unterpfad, wenn die App hinter einem Reverse-Proxy veröffentlicht wird (z. B. `/omniroute`)                                                                                                                                                                                              | _(leer = Stammverzeichnis)_           |
| `NEXT_PUBLIC_BASE_URL`        | Öffentlicher Browser-Ursprung einschließlich des Unterpfads (z. B. `https://host/omniroute`)                                                                                                                                                                                                 | nicht gesetzt                         |
| `PROD_DASHBOARD_PORT`         | Hostseitiger Dashboard-Port für `docker-compose.prod.yml`                                                                                                                                                                                                                                    | `20130`                               |
| `CLIPROXYAPI_PORT`            | Hostseitiger Port für den Sidecar `cliproxyapi`                                                                                                                                                                                                                                              | `8317`                                |

## Reverse-Proxy auf einem Unterpfad (Traefik / nginx)

Der Next.js-`basePath` wird in das Standalone-Bundle einkompiliert. OmniRoute zeichnet den fest einkompilierten
Wert in einer Sentinel-Datei im App-Stammverzeichnis auf (geschrieben während `npm run build`; gelesen von
`scripts/docker/ensure-docker-base-path.mjs`) und vergleicht ihn beim Start des Containers mit
`OMNIROUTE_BASE_PATH`. Wenn sie sich unterscheiden und das Image für das Domain-Stammverzeichnis
erstellt wurde, schreibt der Entrypoint die Standalone-Manifeste, die eingebetteten
`basePath`-/`assetPrefix`-Literale (Next 16 rendert SSR-Asset-URLs ausschließlich anhand von
`assetPrefix` — der Patcher übernimmt den Unterpfad auch dort hinein), die fest einkompilierten
`/_next/static`-Asset-URLs (Client-Reference-Manifeste, Medienimporte, vorgerenderte
Fehlerseiten) und den clientseitigen `process.env`-Shim um, bevor `node dev/run-standalone.mjs`
ausgeführt wird.

### Compose-Build (empfohlen)

Legen Sie beide Variablen in `.env` fest und erstellen Sie das Image anschließend neu, damit Image und Laufzeitumgebung übereinstimmen:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` leitet `OMNIROUTE_BASE_PATH` sowohl als Docker-Build-Argument als auch als
Laufzeit-Umgebungsvariable weiter.

### Vorgefertigtes Root-Image + Laufzeit-Unterpfad

Veröffentlichte `diegosouzapw/omniroute:*`-Images werden für das Domain-Stammverzeichnis erstellt. Sie können
`OMNIROUTE_BASE_PATH` dennoch zur Laufzeit festlegen; der Container patcht das Bundle beim Start einmalig.
Kombinieren Sie dies mit dem passenden öffentlichen Ursprung:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurieren Sie den Reverse-Proxy so, dass er den **vollständigen** externen Pfad weiterleitet (das
Präfix darf nicht entfernt werden). Traefik sollte `PathPrefix(`/omniroute`)` ohne
`StripPrefix` an den Container weiterleiten, damit Next.js `/omniroute/...` empfängt und Assets über
`/omniroute/_next/...` bereitstellt.

Der Docker-Healthcheck prüft den leichtgewichtigen `/healthz`-Lebenszyklus-Endpunkt mit dem Präfix
des aktiven `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` bleibt für
Diagnosen durch Menschen oder Dashboards verfügbar; um den HEALTHCHECK des Containers wieder darauf zu richten (zum Beispiel
für eine umfassende Integritätsprüfung), setzen Sie `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Dieser Pfad führt eine **umfassende** Prüfung durch (DB + Monitoring-Zusammenfassung) — geeignet für Dockers
seltenen `HEALTHCHECK`, wenn Sie sich bewusst dafür entscheiden, aber **nicht** für Kubernetes-`livenessProbe`-
Intervalle.

Für Orchestratoren (Kubernetes, Nomad usw.):

| Probe           | Bevorzugen                                                             | Vermeiden                                                                  |
| --------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez` oder TCP am Hauptport (`PORT`, Standardwert `20128`) | `/api/monitoring/health` als Liveness-Prüfung                              |
| Readiness       | HTTP `GET /healthz`                                                    | Kurze Timeouts, die eine ausgelastete Event Loop als ausgefallen behandeln |
| Deep / Blackbox | `/api/monitoring/health`                                               | —                                                                          |

`/healthz` meldet den Prozesslebenszyklus (`ok` / `starting` / `stopping`). `/livez` prüft
nur, ob der Prozess aktiv ist (200, sobald der Handler ausgeführt werden kann; es wartet nicht auf
Readiness). Beide werden weiterhin in derselben Node-Event-Loop wie die Anfrageverarbeitung ausgeführt, sodass
CPU-intensive Katalog- oder Komprimierungsarbeiten sie verzögern können — ausgelastet ≠ ausgefallen. Bevorzugen Sie eine TCP-
Liveness-Prüfung, wenn HTTP-Probes in einen Timeout laufen. Vollständige Empfehlungen zu Probes:
[Monitoring-Leitfaden — Empfehlungen für Kubernetes-Probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose mit Caddy (automatisches HTTPS/TLS)

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
      # Für Browser sichtbarer Ursprung für OAuth-Callbacks, Dashboard-Links und generierte öffentliche URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interne Server-zu-Server-URL für geplante Aufgaben und Selbstabrufe.
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
Links; authentifizierte Schreibzugriffe im Dashboard verwenden Same-Origin-Anfragen sowie sitzungsgebundenen CSRF-
Schutz. Aktivieren Sie `OMNIROUTE_TRUST_PROXY` nur für erweiterte Bereitstellungen, bei denen OmniRoute den
öffentlichen Ursprung bewusst aus vertrauenswürdigen weitergeleiteten Headern statt aus einer expliziten
Konfiguration ableiten soll.

## Cloudflare Quick Tunnel

Die Dashboard-Unterstützung für Docker-Bereitstellungen umfasst einen mit einem Klick aktivierbaren **Cloudflare Quick Tunnel** unter `Dashboard → Endpoints`. Bei der ersten Aktivierung wird `cloudflared` nur bei Bedarf heruntergeladen, ein temporärer Tunnel zu Ihrem aktuellen `/v1`-Endpunkt gestartet und die generierte URL `https://*.trycloudflare.com/v1` direkt unter Ihrer normalen öffentlichen URL angezeigt.

Tunnel-Bereiche für Endpunkte (Cloudflare, Tailscale, ngrok) können unter `Settings → Appearance` ein- oder ausgeblendet werden, ohne den Status aktiver Tunnel zu ändern.

### Hinweise zu Tunneln

- Quick-Tunnel-URLs sind temporär und ändern sich nach jedem Neustart.
- Quick Tunnels werden nach einem Neustart von OmniRoute oder des Containers nicht automatisch wiederhergestellt. Aktivieren Sie sie bei Bedarf erneut über das Dashboard.
- Die verwaltete Installation unterstützt derzeit Linux, macOS und Windows auf `x64` / `arm64`.
- Verwaltete Quick Tunnels verwenden standardmäßig HTTP/2 als Transportprotokoll, um störende Warnungen bezüglich des QUIC-UDP-Puffers in eingeschränkten Container-Umgebungen zu vermeiden. Setzen Sie `CLOUDFLARED_PROTOCOL=quic` oder `auto`, wenn Sie ein anderes Transportprotokoll verwenden möchten.
- Docker-Images enthalten die CA-Stammzertifikate des Systems und übergeben sie an das verwaltete `cloudflared`. Dadurch werden TLS-Vertrauensfehler vermieden, wenn der Tunnel innerhalb des Containers initialisiert wird.
- Setzen Sie `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, wenn OmniRoute eine vorhandene Binärdatei verwenden soll, anstatt eine herunterzuladen.

## Image-Tags

| Image                    | Tag      | Größe  | Beschreibung                                                  |
| ------------------------ | -------- | ------ | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Höchste **veröffentlichte** stabile SemVer (nicht git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Diese Tag-Klasse für GitOps festlegen                         |

Plattformübergreifendes Manifest: nativ für `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker wählt die passende Architektur automatisch aus; geben Sie `--platform linux/amd64` an, wenn Sie auf ARM-Hosts die AMD64-Emulation erzwingen müssen.

### Veröffentlichungskanäle

OmniRoute veröffentlicht separate Docker-Kanäle für stabile Releases, Tests des aktiven Release-Branches und Entwicklungs-Builds.

| Kanal                           | Quelle                                        | Veränderlichkeit                   | Empfohlene Verwendung                                                                                                                          |
| ------------------------------- | --------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signiertes/versioniertes Release              | Unveränderlich                     | Produktionsbereitstellungen, die auf ein exaktes Release festgelegt sind                                                                       |
| `:latest` / `:latest-web`       | Höchste **veröffentlichte** stabile SemVer    | Veränderlicher stabiler Zeiger     | Folgt stabilen Releases **nach** einem SemVer-Veröffentlichungsauftrag – verfolgt **nicht** `main` oder unveröffentlichte `release/v*`-Commits |
| `:next` / `:next-web`           | Aktueller standardmäßiger `release/v*`-Branch | Veränderlicher Vorabversionszeiger | Testen von Korrekturen, die im aktiven Release-Branch enthalten, aber noch nicht Teil eines stabilen Releases sind                             |
| `:main` / `:main-web`           | `main`-Branch                                 | Veränderlicher Entwicklungszeiger  | Nur für Entwicklungs- und Integrationstests                                                                                                    |

#### Websitzungsanbieter: die `-web`-Images

Jeder der oben aufgeführten Kanäle ist auch als `-web`-Tag verfügbar (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) und wird aus der Stufe `runner-web` erstellt – dasselbe Image, ergänzt um Playwright und einen Chromium-Browser. Das reguläre Image wird **ohne** Chromium ausgeliefert; `gemini-web`, `claude-web` und `claude-turnstile` benötigen ihn.

Der Fehler tritt verzögert und nicht beim Start auf: Diese Anbieter führen ihre Modelle auf und werden im Dashboard als verbunden angezeigt; erst die erste Anfrage schlägt mit folgender Meldung fehl:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Wenn Sie diese Anbieter verwenden, laden Sie den `-web`-Tag des Kanals herunter, den Sie bereits verwenden – ansonsten ändert sich nichts. Bei einer npm-/CLI-Installation ohne Docker-Image fehlt entsprechend die Browser-Binärdatei: Führen Sie auf dem Host `npx playwright install chromium` aus.

#### Verwendung des Vorabversionskanals

Der Kanal `next` wird bei jedem Push in den aktuellen Standard-Branch `release/v*` neu gebaut und sowohl für AMD64 als auch für ARM64 veröffentlicht. Ältere Wartungs-Branches können ihn nicht überschreiben. Der Kanal stellt ein abrufbares Image für Fehlerbehebungen bereit, die bereits in den aktiven Release-Branch gemergt wurden, bevor das nächste stabile Tag erstellt wird.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Überschreiben Sie für Docker Compose das vom ausgewählten Profil verwendete Image-Tag, rufen Sie anschließend das Image ab und erstellen Sie den Dienst neu:

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

`next` ist ein dynamischer Vorabversionskanal. Er kann sich bei jedem Push in den aktiven Release-Branch ändern und wird **nicht für den Produktionseinsatz unterstützt**. Fixieren Sie beim Prüfen eines bestimmten Builds den Image-Digest:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sichern Sie vor dem Testen das OmniRoute-Daten-Volume oder das per Bind-Mount eingebundene Datenverzeichnis. Stellen Sie für einen Rollback die zuvor verwendete stabile Version oder den zuvor verwendeten Digest wieder her und erstellen Sie den Container neu:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Ein Build aus einem Release-Branch kann `latest` niemals verschieben; nur eine geeignete stabile semantische Version darf den stabilen Zeiger aktualisieren. Für die `next`-Images gelten weiterhin die Prüfung des Release-Images und das blockierende Gate für KRITISCHE Schwachstellen.

**`latest` ist keine Aktualitätsgarantie für git.** Gemergte Fehlerbehebungen auf `main` oder im aktiven Branch `release/v*` sind **nicht** in `:latest` enthalten, bis ein stabiles SemVer-Image veröffentlicht wurde und der Veröffentlichungsjob `:latest` aktualisiert hat (mit demselben Digest wie diese SemVer-Version). Wenn `latest` unverändert erscheint, obwohl die Fehlerbehebung bereits auf GitHub angezeigt wird, rufen Sie `:next` ab, um den Release-Branch zu testen, oder warten Sie auf das SemVer-Tag.

| Gewünschtes Ziel                                                                                 | Verwendung                                |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| GitOps / Produktion ohne Abweichungen                                                            | `:X.Y.Z` (oder den Image-Digest) fixieren |
| Veröffentlichte stabile Versionen verfolgen und bei jedem Release eine Neuerstellung akzeptieren | `:latest`                                 |
| Unveröffentlichte Commits aus `release/v*` testen                                                | `:next` (nicht für die Produktion)        |
| `main` testen                                                                                    | `:main` (nicht für die Produktion)        |

## Verfügbarkeit: Standard-SQLite unterstützt nur eine Replik

Die standardmäßige Docker-/Kubernetes-Bereitstellung von OmniRoute besteht aus **einem Node-Prozess + einem SQLite-Writer**. Hochverfügbarkeit wird mit dieser Topologie **nicht unterstützt**.

| Einschränkung                               | Konsequenz                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Einzelner Writer                            | Führen Sie **nicht** mehrere Repliken mit derselben SQLite-Datei aus. Dadurch wird die Datenbank beschädigt.                                                                                                                                                                                                                                                                           |
| Neuerstellung / Neustart / HEALTHCHECK-Kill | **Vollständiger Ausfall** laufender SSE-Verbindungen, Dashboard-Sitzungen und des In-Memory-Zustands. Die Verbindung jedes verbundenen Clients wird getrennt. Neue Anfragen während des Zeitfensters ohne Endpunkt erhalten vom Reverse-Proxy **`502 Bad Gateway: Unknown error`** statt OmniRoute-JSON — Clients können dies nicht von einem Provider-Ausfall unterscheiden (#11015). |
| Gleiche Event-Loop wie `/healthz`           | Ein ausgelasteter Katalog- oder Komprimierungszyklus kann Probes verzögern; ein kurzes Timeout startet daraufhin die **einzige** Replik neu.                                                                                                                                                                                                                                           |

**Probe-Matrix** (siehe auch [Empfehlungen für Kubernetes-Probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                    | Ziel                                                            | Nicht verwenden                                                    |
| ------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| Liveness                 | TCP auf `PORT` (Standard: `20128`) oder sanftes HTTP `/healthz` | `/api/monitoring/health`                                           |
| Readiness                | HTTP `GET /healthz`                                             | Kurze Timeouts, die eine ausgelastete Event-Loop als tot einstufen |
| Tiefenprüfung / Menschen | `/api/monitoring/health`                                        | Automatisierte kubelet-Liveness                                    |

**Upgrades:** Rechnen Sie damit, dass jede Sitzung getrennt wird. Leiten Sie Clients nach Möglichkeit kontrolliert ab; mit dem standardmäßigen SQLite gibt es kein Rolling Update. Compose mit `restart: unless-stopped` und Docker-`HEALTHCHECK` ersetzt außerdem den einzigen Prozess, wenn der Container den Status Unhealthy erhält — mit demselben Schadensumfang.

Kubernetes-Beispiel für eine **einzelne Replik** (Recreate ist erforderlich; erhöhen Sie `replicas` nicht, wenn nur eine SQLite-Datei verwendet wird):

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

Die `preStop`-Pause ermöglicht es kube, Service-Endpunkte vor SIGTERM zu entfernen, sodass **neuer** Traffic nicht mehr beim herunterfahrenden Prozess ankommt. Laufende `/v1/responses`-SSE-Verbindungen werden mithilfe schwergewichtiger Admission-Leases bis zu `SHUTDOWN_TIMEOUT_MS` (Standard: 30 Sekunden) kontrolliert abgearbeitet (#11015). Neue Anfragen, die den Prozess dennoch erreichen, erhalten `503` + `Retry-After: 5`. Die durch Recreate verursachte Lücke ohne Endpunkt bleibt bis zur Readiness des Ersatzprozesses ein vollständiger Ausfall — das ist eine Eigenschaft der SQLite-Topologie und keine Fehlkonfiguration der Probes.

Externes Postgres bzw. Multi-Writer-HA ist **kein** dokumentierter Standardpfad. Wenn Sie HA benötigen, verwenden Sie weiterhin eine einzelne Replik oder eine Topologie, die das Projekt separat getestet und dokumentiert hat. Die Arbeiten an Postgres/MySQL werden in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) behandelt. Bis dies verfügbar ist, besteht die einzige unterstützte Möglichkeit zur Vervielfachung der Kapazität für **große** `/v1/responses` in N unabhängigen Prozessen (nächster Abschnitt), nicht in `replicas > 1` auf einem einzigen Volume.

## Horizontale Skalierung: N unabhängige Prozesse

Ein Node-Prozess entspricht **einem V8-Heap**. Zwei sich überschneidende Coding-Agent-Anfragen von jeweils ca. 3 MiB bzw. ca. 750.000 Token an `POST /v1/responses` (RTK + Caveman) bringen diesen Heap bei ca. 12 GiB zum Abbruch (`FATAL ERROR: Reached heap limit`) und können in einer 16-GiB-cgroup einen OOM auslösen. Siehe [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Diese Messung ist eine Warnung zum **Speicherbudget**, keine produktseitige feste Obergrenze von zwei gleichzeitigen langen `/v1/responses`. Die Zulassung ressourcenintensiver Chats wird durch ein automatisch abgeleitetes Byte-Budget für eingehende Anfragen (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) begrenzt, das anhand derselben V8-/cgroup-Obergrenze bemessen wird — wird dieser Wert nach oben überschrieben (oder die veraltete anzahlbasierte Anfrageobergrenze `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` gesetzt), führt dies bei einem bereits entsprechend dimensionierten Prozess erneut zum Abbruch. Kleine Chats, `/healthz`, `/v1/models` und MCP fallen **nicht** unter diese Obergrenze.

### Ein Prozess: mehr als zwei lange `/v1/responses`

Ein **gesunder** Prozess (Heap unterhalb von `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, Standardwert `0.75`) **kann** mehr als zwei gleichzeitige lange `POST /v1/responses` ausführen, sofern im prozessweiten Byte-Budget für laufende Anfragen (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) noch Kapazität vorhanden ist. Request-Bodys mit einer Größe ab `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (Standardwert 256 KiB) belegen denselben Slot für ressourcenintensive Anfragen wie strukturintensive Anfragen und verwenden denselben `tryAcquireHealthyHeadroom`-Ausweichmechanismus aus [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dutzende gleichzeitige langlebige SSE-Clients (Betreiber benötigen häufig 40–50) sind eine Frage des **Speicherbudgets** — Heap sowie primäre/Headroom-Slots und `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` müssen entsprechend dimensioniert werden — und keine feste produktseitige Obergrenze von „maximal 2“. Ein unter Druck stehender Heap weist Anfragen weiterhin mit einem wiederholbaren `503` ab, damit #7849 nicht erneut auftritt.

Um **mehrere Heaps** (unabhängige V8-Old-Spaces) **bereits heute** zu betreiben:

| Empfohlen                                                                                                                                                                                                   | Nicht empfohlen                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **N Container/Pods** ausführen, jeweils mit einem **eigenen** `DATA_DIR` / Volume                                                                                                                           | `replicas > 1` für eine einzelne SQLite-Datei festlegen                           |
| Ressourcenschwere laufende Anfragen und Healthy Headroom anhand des Heap-/Byte-Budgets für laufende Anfragen dimensionieren; 1–2 ist der konservative Standardwert aus #7849, keine feste Produktobergrenze | Einem Prozess 8× mehr RAM und eine unbegrenzte Anzahlobergrenze geben             |
| Optional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` für **gemeinsam genutzte Kontingentzähler**                                                                                                  | Redis als gemeinsam genutztes SQLite behandeln — das ist es nicht                 |
| Provider-Geheimnisse in jede Instanz kopieren (oder getrennte Dashboards akzeptieren)                                                                                                                       | Ein einziges Dashboard / ein einziges Aufrufprotokoll für alle Instanzen erwarten |
| Einen beliebigen Load-Balancer vorschalten; Sitzungsaffinität nach API-Schlüssel oder Sitzung genügt                                                                                                        | Eine anbieterspezifische, größenabhängige Middleware voraussetzen                 |

Hardware: Die Anzahl gleichzeitig laufender langer `/v1/responses` pro Instanz ist eine Frage des **Speicherbudgets** (Heap + Byte-Budget für laufende Anfragen / #10110). `N` unabhängige `DATA_DIR`s vervielfachen dennoch die Heaps: Der Host-RAM muss `N × cgroup` abdecken, nicht „einen 16-GiB-Pod mit N=8“. Niemals `replicas > 1` für eine einzelne SQLite-Datei verwenden.

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

Die Dichte innerhalb eines Prozesses (Komprimierung außerhalb des HTTP-Isolates) wird in [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) behandelt. Ein logischer Cluster mit gemeinsam genutztem persistentem Zustand wird in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) behandelt.

## Regionale Gemini-Fehler innerhalb von Docker

Google AI Studio / Gemini API kann HTTP 400 mit FAILED_PRECONDITION und
`User location is not supported for the API use.` zurückgeben. Eine erfolgreiche Anfrage auf dem Host
beweist nicht, dass der Container dieselbe ausgehende Route verwendet. DNS-Reihenfolge,
IPv4-/IPv6-Konnektivität, VPN-Routing und konfigurierte Proxys können abweichen. Prüfen Sie
[die von Google unterstützten Regionen](https://ai.google.dev/gemini-api/docs/available-regions)
sowie die tatsächliche Verbindungsroute; dieser Fehler allein weist nicht auf einen ungültigen API-Schlüssel hin.

### Verbindungsspezifischen Proxy bevorzugen

Verwenden Sie die [verbindungsspezifische Proxy-Konfiguration](../ops/PROXY_GUIDE.md#4-level-proxy-system)
von OmniRoute für die betroffene Gemini-Verbindung und wiederholen Sie anschließend **Verbindung testen** sowie eine kleine Anfrage
mit demselben Modell. Dadurch bleibt die Routing-Änderung auf diese Verbindung beschränkt. Überprüfen Sie,
dass der Proxy vom Container aus erreichbar ist und die Verbindung ihn tatsächlich auswählt.
Eine Änderung der Route garantiert nicht, dass die regionalen Voraussetzungen des Upstream-Anbieters erfüllt sind.

### Netzwerk von Host und Container vergleichen

Verwenden Sie beim Vergleich authentifizierter Ergebnisse denselben Schlüssel, dasselbe Modell und dieselbe Anfrage; fügen Sie niemals
Anmeldedaten, Proxy-Passwörter oder vollständige Autorisierungsheader in ein Issue ein.
Prüfen Sie zunächst, welche Adressfamilien der Resolver des Betriebssystems bereitstellt, und verwenden Sie dazu denselben Befehl
auf dem Host und innerhalb des Containers:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Ersetzen Sie `omniroute` durch den von Ihnen ausgeführten Dienst (zum Beispiel `omniroute-web`). Diese
Befehle geben Adressfamilien ohne Anmeldedaten oder IP-Adressen aus. Eine zurückgegebene `6`
zeigt lediglich ein IPv6-DNS-Ergebnis: Sie beweist **nicht**, dass eine nutzbare IPv6-Route oder ein API-Zugriff vorhanden ist.
Wenn `curl` installiert ist, vergleichen Sie `curl -4 -I https://generativelanguage.googleapis.com`
mit `curl -6 -I https://generativelanguage.googleapis.com` in beiden Umgebungen.
Eine HTTP-Antwort belegt die Konnektivität für diese Prüfung, selbst wenn es sich um einen nicht authentifizierten
Fehler handelt; nur die authentifizierte Modellanfrage prüft die Gemini-Berechtigung.

### Alternative auf Host-Ebene: funktionierendes IPv6 und Resolver-Richtlinie

Der Melder von [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) stellte
den Zugriff in seiner Umgebung wieder her, indem er IPv6 für Container aktivierte und die glibc-Adressauswahl
änderte. Betrachten Sie dies als umgebungsspezifische Alternative. Stellen Sie sicher, dass
IPv6 auf dem Host, der ausgehende Datenverkehr bzw. das Routing des Containers und die Firewall-Regeln funktionieren, bevor Sie die Resolver-Einstellungen anpassen.
Eine private ULA-Adresse allein stellt keine öffentliche IPv6-Konnektivität her.

Für Dienste, die bereits mit dem Standardnetzwerk von Compose verbunden sind, aktiviert dieses Fragment
IPv6 in diesem Netzwerk; behalten Sie den Rest Ihrer Dienst-, Port-, Volume- und sonstigen Konfiguration bei:

```yaml
networks:
  default:
    enable_ipv6: true
```

Aktivieren Sie IPv6 bei einem benannten Netzwerk in dem Netzwerk, mit dem der Dienst tatsächlich verbunden ist. Docker kann
ein ULA-Subnetz zuweisen; wählen Sie nur dann ein explizites, nicht überlappendes Subnetz aus, wenn Ihr Netzwerk
dies erfordert. Siehe [IPv6-Netzwerke in Docker](https://docs.docker.com/engine/daemon/ipv6/)
und [Compose-Netzwerkoptionen](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Bei einem **glibc-basierten Image** kann `/etc/gai.conf` die Adressauswahl ändern. Das aktuelle
Dockerfile des Repositorys verwendet Debian; benutzerdefinierte musl-basierte Images nutzen diesen Mechanismus nicht.
Die gemeldete Anpassung ändert das ULA-Label von `label fc00::/7 6` in
`label fc00::/7 1`. Gehen Sie von der vollständigen Richtlinientabelle des Images aus und behalten Sie deren übrige
Einträge bei: Das Hinzufügen eines `label`- oder `precedence`-Eintrags ersetzt diese Standardtabelle, sodass eine Datei,
die nur die geänderte Zeile enthält, nicht ausreicht. Die
[glibc-Konfigurationsreferenz](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentiert dieses Verhalten. Binden Sie die geprüfte Datei schreibgeschützt unter `/etc/gai.conf`
ein und erstellen Sie den Dienst neu, um sie anzuwenden.

Dies ändert die Adressauswahl des Betriebssystems für **den gesamten ausgehenden Datenverkehr in diesem Container**.
Es erzwingt nicht, dass jede Anwendung IPv6 auswählt: Die DNS-Reihenfolge und Verbindungsauswahl
von Node sind ebenfalls relevant. Insbesondere bevorzugt `--dns-result-order=ipv4first` IPv4 und
ist keine Lösung für einen Fehler, der ausschließlich bei IPv4 auftritt. Siehe [DNS-Reihenfolge in Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Testen Sie Gemini und Ihre anderen Anbieter nach jeder Änderung auf Host-Ebene erneut. Um die Änderung rückgängig zu machen,
entfernen Sie den benutzerdefinierten `gai.conf`-Mount, stellen Sie die vorherige Netzwerkkonfiguration wieder her und
erstellen Sie den betroffenen Dienst bzw. das betroffene Netzwerk während eines Wartungsfensters neu. Das Neuerstellen eines Netzwerks
kann andere damit verbundene Container unterbrechen; löschen Sie nicht das persistente Daten-Volume.

## Wichtige Hinweise

- **SQLite-WAL-Modus:** `docker stop` sollte vollständig abgeschlossen werden können, damit OmniRoute die neuesten Änderungen per Checkpoint in `storage.sqlite` zurückschreiben kann. Die mitgelieferten Compose-Dateien legen bereits eine Karenzzeit von 40 Sekunden für das Beenden fest. Wenn Sie das Image direkt ausführen, behalten Sie `--stop-timeout 40` bei.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Setzen Sie die Variable auf `true`, wenn routinemäßige bzw. vor Schreibvorgängen erstellte Backups extern verwaltet werden. Migrationen bestehender Datenbanken benötigen dennoch einen eigenen dauerhaften Sicherheits-Snapshot und eine Schutzvorrichtung für Massenmigrationen.
- **Datenpersistenz:** Binden Sie immer ein Volume unter `/app/data` ein, damit Ihre Datenbank, Schlüssel und Konfigurationen über Container-Neustarts hinweg erhalten bleiben.
- **Portkonfiguration:** Überschreiben Sie die Umgebungsvariable `PORT`, um den Standardport `20128` zu ändern.

## Siehe auch

- [Anleitung zur VM-Bereitstellung](../ops/VM_DEPLOYMENT_GUIDE.md) — Einrichtung mit VM + nginx + Cloudflare
- [Anleitung zur Bereitstellung auf Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Bereitstellung auf Fly.io
- [Umgebungskonfiguration](../reference/ENVIRONMENT.md) — Vollständige `.env`-Referenz
