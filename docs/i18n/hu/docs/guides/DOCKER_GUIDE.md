# 🐳 Docker Guide — OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Teljes körű Docker-telepítési referencia. A gyors kezdéshez lásd a [README Docker-szakaszát](../README.md#-docker).

## Tartalomjegyzék

- [Gyors futtatás](#quick-run)
- [Környezeti fájllal](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Elérhető profilok](#available-profiles)
- [A gazdagép CLI-eszközeinek konfigurálása, amikor az OmniRoute Dockerben fut](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis oldalkonténer](#redis-sidecar)
- [Éles környezethez készült Compose](#production-compose)
- [A Dockerfile szakaszai](#dockerfile-stages)
- [Kritikus környezeti változók](#critical-environment-variables)
- [Docker Compose Caddyvel (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Képcímkék](#image-tags)
- [Rendelkezésre állás: az alapértelmezett SQLite csak egy replikát támogat](#availability-default-sqlite-is-single-replica)
- [Gemini regionális hibák Dockerben](#gemini-regional-errors-inside-docker)
- [Fontos megjegyzések](#important-notes)

---

## Gyors futtatás

> **Saját üzemeltetés egyetlen paranccsal?** Lásd az
> [önálló üzemeltetési útmutatót](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (közzétett rendszerkép +
> Redis, csak visszacsatolási interfész, profilválasztás nélkül). Az alábbi gyors futtatás
> az egykonténeres megoldás azoknak a felhasználóknak, akik már máshol futtatják a Redist.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Környezeti fájllal

```bash
# Először másolja és szerkessze a .env fájlt
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
# Alapprofil (CLI-eszközök nélkül)
docker compose --profile base up -d

# CLI-profil (beépített Claude Code, Codex és OpenClaw)
docker compose --profile cli up -d

# Gazdagépprofil (elsősorban Linuxhoz; csak olvasható módon csatolja a gazdagép CLI-binárisait)
docker compose --profile host up -d

# Webprofil (Chromium/Playwright a webes munkamenetet használó szolgáltatókhoz)
docker compose --profile web up -d

# CLI + CLIProxyAPI oldalkonténer együttes használata
docker compose --profile cli --profile cliproxyapi up -d
```

## Elérhető profilok

Az OmniRoute Compose-profilokat tartalmaz a főbb telepítési konfigurációkhoz. Válassza ki a környezetének megfelelőt.

| Profil                   | Szolgáltatás     | Mikor használja                                                                                                                                                                  | Parancs                                      |
| ------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (alapértelmezett) | `omniroute-base` | Grafikus felület nélküli kiszolgáló / minimális futtatókörnyezet, mellékelt szolgáltatói CLI-k nélkül                                                                            | `docker compose --profile base up -d`        |
| `cli`                    | `omniroute-cli`  | Ügynökalapú munkafolyamatokhoz, amelyek meghívják az `omniroute providers/setup/doctor` funkciókat és a mellékelt CLI-ket (Codex, Claude Code, Droid, OpenClaw)                  | `docker compose --profile cli up -d`         |
| `host`                   | `omniroute-host` | Olyan Linux-gazdagépekhez, amelyek a `~/.local/bin`, `~/.codex`, `~/.claude` stb. csak olvasható csatolásával `network_mode`-szerű hozzáférést szeretnének a gazdagép CLI-jeihez | `docker compose --profile host up -d`        |
| `cliproxyapi`            | `cliproxyapi`    | A [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) oldalkonténer futtatása a `8317` porton a felsőbb rétegbeli CLI-proxyzáshoz                                        | `docker compose --profile cliproxyapi up -d` |
| `web`                    | `omniroute-web`  | Böngészőt igénylő, webes munkamenetet használó szolgáltatókhoz: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` összeállítása, mellékelt Chromiummal)               | `docker compose --profile web up -d`         |

> Több profil is kombinálható: `docker compose --profile cli --profile cliproxyapi up -d`.

## A gazdagép CLI-eszközeinek konfigurálása, amikor az OmniRoute Dockerben fut

Az `omniroute setup-codex`, a `setup-claude`, a `config set <tool>` és az irányítópult
**Konfiguráció mentése** gombja egyaránt olyan fájlokat ír, mint a `~/.codex/*.config.toml`. Ezeknek az elérési utaknak
csak azon a gépen van jelentésük, amelyen a CLI ténylegesen fut. Ha ezeket a konténeren belül
futtatja, az írás a konténer saját kezdőkönyvtárába (`/home/node` —
a lemezkép `USER node` felhasználóval fut) kerül, ahonnan egyetlen gazdagépen futó CLI sem fogja beolvasni, és amely
a konténer újbóli létrehozásakor azonnal törlődik.

Az OmniRoute ezt észleli, és használhatatlan sikerjelzés helyett
utasításokkal együtt megtagadja az írást: a CLI `2` kóddal lép ki, az API pedig `422`
választ ad, amelyben a `containerEphemeralTarget: true` szerepel.

### Ajánlott: futtassa a CLI-t a gazdagépen, az OmniRoute-ot pedig Dockerben

A konténer biztosítja az API-t; a CLI a gazdagépen található eszközöket konfigurálja.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # irányítsa a CLI-t a konténerre
omniroute setup-codex                      # a gazdagép valódi ~/.codex könyvtárába ír
```

Ez a megfelelő választás, ha a Codex, a Claude Code, a Cursor vagy hasonló eszköz
a laptopján fut — általában ez a szokásos beállítás.

### Alternatíva: a gazdagép konfigurációs könyvtárainak bind mountolása (`host` profil)

Ha azt szeretné, hogy maga a konténer írja a gazdagép konfigurációját, csatolja be a
könyvtárakat, és állítsa a `CLI_CONFIG_HOME` értékét a csatolás gyökérkönyvtárára. A `host` profil
ezt már megteszi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

A bind mount teszi megbízhatóvá az elérési utat: az OmniRoute beolvassa a
`/proc/self/mountinfo` fájlt, és engedélyezi a csatolt elérési utakra történő írást (valamint azokba a könyvtárakba,
amelyek gyermekkönyvtárai csatolási pontok — a fenti `/host-home` pontosan ilyen), miközben
továbbra is megtagadja a nem csatolt elérési utakra történő írást.

### Vészkijárat: a konténer saját CLI-jeinek konfigurálása (csak indokolt esetben)

Ha a CLI-k valóban a konténeren belül találhatók (a `cli` profilban), az írás
szándékos. Adja át az `--allow-container-write` kapcsolót bármely `setup-*` parancsnak, vagy állítsa be
az `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` értéket a kiszolgálón. Az írás megtörténik,
de figyelmeztetés jelzi, hogy nem marad meg a konténer megszűnése után.

> **Biztonsági figyelmeztetés — `cli` profil + `docker.sock` csatolása.**
> A `cli` profil bind mountként csatolja a `/var/run/docker.sock` fájlt, hogy a konténeren belüli
> automatikus frissítő újra létrehozhassa a stacket a gazdagép démonjával
> (az `src/lib/system/autoUpdate.ts` ellenőrzi ezt a socketet, és annak
> hiányában kihagyja a Docker-alapú eljárást). Ez a socket **a gazdagép root szintű bizalmi
> határa**: bármi, ami hozzáfér, root jogosultsággal vezérli a gazdagép Docker-démonját —
> létrehozhat, megvizsgálhat, leállíthat és eltávolíthat bármely konténert a gazdagépen.
> Következmények:
>
> 1. **Soha ne tegye elérhetővé a hálózaton a `cli` profil portját.** Tegye közzé
>    a `127.0.0.1` címen (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — egy LAN-ról elérhető `cli` profil esetén az irányítópult szintjén történő bármely távoli kódfuttatás
>    a gazdagép teljes kompromittálásához vezet.
> 2. **Ne csatoljon további gazdagépkönyvtárakat a `cli` profilba.**
>    A Docker-socket és bármely további csatolás együttesen teljes
>    olvasási/írási hozzáférést biztosít a konténernek a fájlrendszeréhez és a gazdagép konfigurációjához. Ha egy eszköznek
>    hozzá kell férnie egy projekthez, futtassa helyileg a CLI binárisával — ne csatolja
>    a `cli` konténerbe.
>
> Ha nincs szüksége konténeren belüli automatikus frissítésre, ne kapcsolja be a `cli` profilt
> (`COMPOSE_PROFILES=core,redis` vagy ennél rövidebb érték). A többi profil nem
> csatolja a Docker-socketet.
>
> A MITM-mel kapcsolatos fenyegetési modellért tekintse meg a `docs/security/MITM-TPROXY-DECRYPT.md` fájlt (gitben található; nincs belefordítva a `/docs` könyvtárba),
> a `codex`/`claude-code`/`droid`/`openclaw` binárisok eredetláncáért pedig a
> `docs/security/SUPPLY_CHAIN.md` fájlt.

## Redis sidecar

Az OmniRoute a Redisre támaszkodik az elosztott sebességkorlátozó és a megosztott gyorsítótár működtetéséhez. A `redis` szolgáltatás **mindig definiálva van** a `docker-compose.yml` fájlban (nem tartozik hozzá profilkorlátozás), és minden más profillal együtt elindul.

| Részlet                          | Érték                                            |
| -------------------------------- | ------------------------------------------------ |
| Lemezkép                         | `redis:7-alpine`                                 |
| Konténer neve                    | `omniroute-redis`                                |
| Belső port                       | `6379`                                           |
| Gazdagép portja (felülbírálható) | `REDIS_PORT` (alapértelmezett: `6379`)           |
| Gazdagép címe (felülbírálható)   | `REDIS_BIND_HOST` (alapértelmezett: `127.0.0.1`) |
| Kötet                            | `omniroute-redis-data` → `/data`                 |
| Állapot-ellenőrzés               | `redis-cli ping` (10 másodperces időköz)         |

Kapcsolódó környezeti változók:

- `REDIS_URL` — az alkalmazásba átadott kapcsolati karakterlánc (alapértelmezés szerint `redis://redis:6379`).
- `REDIS_PORT` — a Redis-konténer gazdagépoldali portleképezése.
- `REDIS_BIND_HOST` — az a gazdagépi hálózati interfész, amelyen a port közzé van téve. Alapértelmezett értéke `127.0.0.1`.

> **Miért a visszacsatolási cím az alapértelmezett:** a sidecar `requirepass` nélkül fut, az
> alkalmazáskonténerek pedig a compose-hálózaton keresztül (`redis:6379`) érik el — a közzétett port
> csak a gazdagépoldali eszközök (`redis-cli`, helyi `npm run dev`) számára szükséges. A
> `0.0.0.0` címen való közzététel egy hitelesítés nélküli Redist tenne elérhetővé a LAN minden
> gazdagépe számára. Ha a `REDIS_BIND_HOST=0.0.0.0` értéket állítja be, adja hozzá a
> `--requirepass` kapcsolót is a szolgáltatás `command:` mezőjéhez.

A **Redis letiltása** nem ajánlott (a sebességkorlátozó memóriabeli tartalékmegoldásra vált). Ha mégis szükséges, távolítsa el vagy tegye megjegyzésbe a `redis:` szolgáltatásblokkját a `docker-compose.yml` fájlban, vagy skálázza nullára:

```bash
docker compose up -d --scale redis=0
```

## Éles környezethez használható Compose

A fejlesztői környezet mellett futó, elkülönített éles pillanatképhez használja a `docker-compose.prod.yml` fájlt.

| Részlet                             | Érték                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| Fájl                                | `docker-compose.prod.yml`                                                           |
| Irányítópult alapértelmezett portja | `PROD_DASHBOARD_PORT=20130` (a belső `${DASHBOARD_PORT:-20128}` portra leképezve)   |
| API alapértelmezett portja          | `PROD_API_PORT=20131`                                                               |
| Lemezkép                            | `omniroute:prod` (a `runner-cli` célból összeállítva)                               |
| Redis-konténer                      | `omniroute-redis-prod` (`redis:8.6.2`, dedikált `redis-prod-data` kötet)            |
| Adatkötet                           | `omniroute-prod-data` (elnevezett, az újbóli összeállítások között megőrzött)       |
| Állapot-ellenőrzések                | `node healthcheck.mjs` + `redis-cli ping`, a `depends_on` a Redis állapotához kötve |

Használat:

```bash
# Az éles verem összeállítása és elindítása
docker compose -f docker-compose.prod.yml up -d --build

# Naplók folyamatos megjelenítése
docker compose -f docker-compose.prod.yml logs -f

# Leállítás és eltávolítás (a kötetek megtartásával)
docker compose -f docker-compose.prod.yml down
```

Az éles verem a fejlesztői compose-környezettel párhuzamosan fut (eltérő konténernevekkel, portokkal és kötetekkel), így helyben folytathatja a fejlesztést, miközben az éles környezet továbbra is fut.

## Dockerfile-szakaszok

A tároló egy többlépcsős Dockerfile-t (`Dockerfile`) tartalmaz. Négy szakasz érhető el; válaszd ki a használati esetednek megfelelő `target` értéket.

| Szakasz       | Alapkép               | Cél                                                                                                                                                                                                                                                                                                                                         |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Telepíti a függőségeket (`npm ci --legacy-peer-deps`), és futtatja az `npm run build` parancsot (alapértelmezés szerint Turbopack — lásd alább a fordításkori erőforrásokat)                                                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | Éles futtatókörnyezet a Next.js önálló kimenetével. **Nem tartalmaz szolgáltatói CLI-ket.**                                                                                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Hozzáadja a `git`, `docker.io`, `docker-compose` eszközöket és a globális CLI-ket: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Ezt válaszd az ágensalapú munkafolyamatokhoz.**                                                                                                                                     |
| `runner-web`  | `runner-base`         | Hozzáadja a Playwrightot és egy Chromium böngészőt (`--with-deps`) a webes munkamenetet használó szolgáltatókhoz: `gemini-web`, `claude-web`, `claude-turnstile`. **Ezt válaszd, ha ezeket a szolgáltatókat használod** — az egyszerű lemezkép enélkül a kérés feldolgozásakor hibát ad (lásd a `-web` megjegyzést a kiadási csatornáknál). |

Egy adott cél kézi összeállítása:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Fordításkori erőforrások

Három buildargumentum szabályozza a `builder` szakasz erőforrásigényét. Ezek csak a fordítás során érvényesek —
az `OMNIROUTE_MEMORY_MB` (lásd alább) ettől független, futásidejű beállítás.

| Buildargumentum             | Alapérték | Hatás                                                                                                                         |
| --------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`       | A `0` webpackkel fordít: kisebb memória-csúcshasználat, de lassabb. Az `1` engedélyezi a Turbopack használatát.               |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`    | A létrehozott `next build` folyamat V8-halmának felső korlátja (`--max-old-space-size`).                                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`       | Beállítja a `CIRCLE_NODE_TOTAL` értékét; a Next ebből számítja ki a lapadatok gyűjtéséhez használt `workers = N - 1` értéket. |

Az `OMNIROUTE_BUILD_WORKERS` értékét érdemes növelni egy nagy teljesítményű buildgépen, és ezt kell
gyanúsítani akkor, ha egy korlátozott erőforrású fordítás a `✓ Compiled successfully` üzenet **után** áll le. Minden
lapadat-feldolgozó külön folyamat, ahogy maga a szülő `next build` is;
egy valódi VPS-en végzett reprodukció (issue #7518) az egyes folyamatok RSS-csúcshasználatát
~4.5 GB értéken mérte, a `NODE_OPTIONS` halomjelzőtől függetlenül (a Turbopack a
V8-halmon kívüli natív/Rust memóriában fordít). Az alapértelmezett `2` értéket (→ 1 feldolgozó, összesen 2
folyamat) a közzétételi folyamat által használt 16 GB-os / 4 vCPU-s, GitHub által üzemeltetett futtatókhoz
méreteztük. `8` esetén (→ 7 feldolgozó) a futtató memóriája elfogyott, és
a buildkit a `ResourceExhausted: ... cannot allocate memory` hibával állította le a lépést;
a `3` (→ 2 feldolgozó) még mindig nem fért el, miután a folyamatonkénti RSS-t
közvetlenül mértük a becslés helyett. A `tests/unit/docker-build-memory-budget.test.ts`
a mért érték alapján végzi el a számítást, és hibát jelez, ha bármelyik beállítás
meghaladja a futtató kapacitását.

A Turbopack a V8-halmon **kívül** elhelyezkedő natív Rust memóriában fordít, ezért
az `OMNIROUTE_BUILD_MEMORY_MB` nem korlátozza azt. Memóriakorláttal rendelkező gazdagépen
az OOM killer ilyenkor SIGKILL jellel állítja le a fordítást, mindenféle hibaüzenet nélkül — az egyszerűen
félbeszakad a `Creating an optimized production build` közben, ami inkább tűnik lefagyásnak,
mint memóriahiánynak. Ezért használ a `Dockerfile` alapértelmezés szerint webpacket
(`OMNIROUTE_USE_TURBOPACK=0`), eltérően az `npm run dev` / `npm run build` parancsoktól, amelyeknél
a kód alapértelmezése a Turbopack: egy buildargumentumok nélküli egyszerű `docker build .` parancs (amelyet
a Railway és más egykattintásos tárhelyszolgáltatók futtatnak) nem állhat le észrevétlenül egy
memóriakorlátos buildgépen. A közzétett lemezképek már explicit módon átadják az
`OMNIROUTE_USE_TURBOPACK=0` értéket a `docker-publish.yml` fájlban. Bőséges RAM-mal rendelkező buildgépen
a gyorsabb fordítás érdekében engedélyezd a Turbopack használatát:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

A `webpackBuildWorker` engedélyezve van, ezért a `next build` egy szülő- **és** egy feldolgozó
folyamatot futtat, és mindkettő külön-külön figyelembe veszi az `OMNIROUTE_BUILD_MEMORY_MB` értékét. A konténer
memóriakorlátját nagyjából ennek az értéknek a kétszerese fölé méretezd, ne csupán egyszeresére.

Ezen a forrásfán mérve (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Csomagoló | Konténerkorlát | Eredmény                                |
| --------- | -------------- | --------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | Mindkettőnél OOM-leállítás, csendben    |
| webpack   | 8 GiB          | A buildfeldolgozót SIGKILL állította le |
| webpack   | 12 GiB         | Sikeres, a csúcsérték 11.1 GiB volt     |

### Futásidejű alapértékek

A `runner-base` által exportált alapértékek: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Memóriakezelés Dockerben:

- A rendszerkép beállítja az `OMNIROUTE_MEMORY_MB=1024` értéket, és ebből származtatja a `NODE_OPTIONS=--max-old-space-size=1024` értéket.
- A tényleges kiszolgálófolyamatot az önálló indító indítja el, amely beolvassa az `OMNIROUTE_MEMORY_MB` értékét, és hozzáfűzi a `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` kapcsolót.
- A Node az utolsóként megismételt `--max-old-space-size` értéket használja, így az `OMNIROUTE_MEMORY_MB` beállítása szabályozza a Docker tényleges heapkorlátját.
- Mivel a rendszerkép ezt mindig beállítja, az indító saját, RAM alapján kalibrált tartalékértéke Docker alatt soha nem lép érvénybe. Növelje meg kifejezetten az adott munkaterheléshez (lásd az alábbi táblázatot). A `2048` még mindig túl kevés a kódolóügynökök `/v1/responses` kéréseihez.

### Futásidejű RAM kódolóügynökökhöz

Az 1 GiB-os alapértelmezett Docker-beállítás egy irányítópulthoz vagy egyszerű csevegéshez szükséges minimum, nem éles környezethez megfelelő méret. A hosszú `POST /v1/responses` törzsek (több száz üzenettel és több tucat eszközzel) a tömörítés során több memóriabeli gráfot tartanak meg. Két, egymást átfedő, egyenként ~3 MiB-os / ~750k tokenes kérés **12 GiB** old-space mellett is V8-leállást okozott (`FATAL ERROR: Reached heap limit`), és egy 16 GiB-os cgroup OOM-korlátját is elérte. Lásd: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

A **cgroup `--memory` méretét a heap fölé állítsa** — a natív pufferek, az SQLite és a tömörítés köztes adatai a V8-on kívül helyezkednek el.

| Munkaterhelés                               | `OMNIROUTE_MEMORY_MB`           | Konténer / cgroup    | Megjegyzések                                                                                                                               |
| ------------------------------------------- | ------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Irányítópult, egy egyszerű csevegés         | `1024` (rendszerkép alapértéke) | ≥2 GiB               |                                                                                                                                            |
| Egy kódolóügynök (Claude/Codex/Grok)        | `8192`                          | ≥10 GiB              | Tipikus, egyetlen munkamenetes `/v1/responses`                                                                                             |
| Két párhuzamos hosszú `/v1/responses`       | `10240`–`12288`                 | ≥12–16 GiB           | Mért V8-leállás ~12 GiB-os heapnél                                                                                                         |
| Három vagy több párhuzamos hosszú kontextus | ne egyetlen folyamatban         | sorosítás / több RAM | Alapértelmezés szerint egyszerre 1 nagy erőforrás-igényű kérés engedélyezett; ennek RAM-bővítés nélküli növelése ismét előidézi a leállást |

Az `omniroute serve` közvetlenül a gépen futtatva a RAM ~35%-ára kalibrál (a `[512, 4096]` tartományra korlátozva), ha az `OMNIROUTE_MEMORY_MB` **nincs beállítva**. A Docker mindig `1024` értékre állítja, ezért ez a kalibrálás a hivatalos rendszerképben soha nem fut le.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritikus környezeti változók

Az [ENVIRONMENT.md](../reference/ENVIRONMENT.md) fájlban dokumentált alapértelmezéseken túl a következő változók a legfontosabbak Docker alatti futtatáskor:

| Változó                       | Cél                                                                                                                                                                                                                                                                                                                                                               | Alapértelmezett                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | A WebSocket-híd megosztott titka. **Éles környezetben kötelező** — állítsa erős, véletlenszerű karakterláncra.                                                                                                                                                                                                                                                    | nincs beállítva (megadása kötelező) |
| `REDIS_URL`                   | A sebességkorlátozó/gyorsítótár-háttérrendszer kapcsolati karakterlánca                                                                                                                                                                                                                                                                                           | `redis://redis:6379`                |
| `REDIS_PORT`                  | A mellékelt Redis-konténer gazdagépoldali portja                                                                                                                                                                                                                                                                                                                  | `6379`                              |
| `REDIS_BIND_HOST`             | Az a gazdagép-interfész, amelyen a mellékelt Redis portja közzé van téve (loopback, hacsak nem ad hozzá AUTH-hitelesítést)                                                                                                                                                                                                                                        | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | A gazdagépen található elérési út, amely a `cli` profilban a `/workspace/omniroute` helyre van csatolva az önfrissítési munkafolyamatokhoz                                                                                                                                                                                                                        | `.` (aktuális könyvtár)             |
| `OMNIROUTE_MEMORY_MB`         | A Node futásidejű heapmemória-korlátja a Docker önálló kiszolgálójához; felülírja a lemezkép fenti alapértelmezését. Kódoló ügynökök esetén: `8192`+ (lásd: [futásidejű RAM](#runtime-ram-for-coding-agents)).                                                                                                                                                    | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Felülírja az irányítópult (20128) és az API (20129) közzétett portjait                                                                                                                                                                                                                                                                                            | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Az a gazdagép-interfész, amelyen a docker-compose közzéteszi az irányítópult, az API és az élő WS portjait. A `REQUIRE_API_KEY=false` beállítással (ez az alapértelmezett) a `0.0.0.0` elérhetővé teszi a névtelen `/v1` proxyt a LAN számára — csak `REQUIRE_API_KEY=true` beállítással vagy elé helyezett fordított proxyval tegye szélesebb körben elérhetővé. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Az a gazdagép-interfész, amelyen a docker-compose közzéteszi a `cliproxyapi` segédkonténert — ennek adatkötete tárolja a szolgáltatói hitelesítő adatokat.                                                                                                                                                                                                        | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Az a könyvtár, amelyből a futásidejű beépülőmodul-kereső olvas, és amelybe telepít. Állítsa be, ha a beépülő modulok bind mounttal vannak csatolva: az alapértelmezett érték a `HOME` változót követi, amelyet a lemezkép nem feltétlenül exportál.                                                                                                               | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | URL-alútvonal, amikor az alkalmazás fordított proxy mögött van közzétéve (pl. `/omniroute`)                                                                                                                                                                                                                                                                       | _(üres = gyökér)_                   |
| `NEXT_PUBLIC_BASE_URL`        | Nyilvános böngészőeredet az alútvonallal együtt (pl. `https://host/omniroute`)                                                                                                                                                                                                                                                                                    | nincs beállítva                     |
| `PROD_DASHBOARD_PORT`         | A `docker-compose.prod.yml` gazdagépoldali irányítópultportja                                                                                                                                                                                                                                                                                                     | `20130`                             |
| `CLIPROXYAPI_PORT`            | A `cliproxyapi` segédkonténer gazdagépoldali portja                                                                                                                                                                                                                                                                                                               | `8317`                              |

## Fordított proxy egy alútvonalon (Traefik / nginx)

A Next.js `basePath` értéke belefordul az önálló csomagba. Az OmniRoute a beégetett
értéket egy jelzőfájlban rögzíti az alkalmazás gyökérkönyvtárában (az `npm run build`
során írja ki; a `scripts/docker/ensure-docker-base-path.mjs` olvassa be), és a konténer
indulásakor összehasonlítja az `OMNIROUTE_BASE_PATH` értékével. Ha eltérnek, és a
lemezkép a tartomány gyökeréhez készült, a belépési pont a
`node dev/run-standalone.mjs` futtatása előtt átírja az önálló jegyzékeket, a beágyazott
`basePath`/`assetPrefix` literálokat (a Next 16 az SSR-erőforrások URL-jeit kizárólag az
`assetPrefix` alapján jeleníti meg — a javító ebbe is beilleszti az alútvonalat), a
beégetett `/_next/static` erőforrás-URL-eket (klienshivatkozási jegyzékek, médiaimportok,
előre renderelt hibaoldalak), valamint a kliensoldali `process.env` helyettesítőt.

### Összeállítás Compose használatával (ajánlott)

Állítsa be mindkét változót a `.env` fájlban, majd építse újra a lemezképet, hogy annak
beállításai egyezzenek a futásidejű környezettel:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

A `docker-compose.yml` az `OMNIROUTE_BASE_PATH` értékét Docker build-argumentumként és
futásidejű környezeti változóként is továbbítja.

### Előre elkészített gyökérlemezkép + futásidejű alútvonal

A közzétett `diegosouzapw/omniroute:*` lemezképek a tartomány gyökeréhez készültek. Az
`OMNIROUTE_BASE_PATH` futásidőben továbbra is beállítható; a konténer induláskor egyszer
módosítja a csomagot. Használja a hozzá tartozó nyilvános eredettel együtt:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Állítsa be úgy a fordított proxyt, hogy a **teljes** külső elérési utat továbbítsa (ne
távolítsa el az előtagot). A Traefiknek a `PathPrefix(`/omniroute`)` útvonalat
`StripPrefix` nélkül kell a konténerhez irányítania, hogy a Next.js az
`/omniroute/...` útvonalat kapja meg, és az erőforrásokat az
`/omniroute/_next/...` útvonalról szolgálja ki.

A Docker állapotellenőrzése az aktív `OMNIROUTE_BASE_PATH` előtaggal ellátott, kis
erőforrás-igényű `/healthz` életciklus-végpontot ellenőrzi. Az
`/api/monitoring/health` továbbra is elérhető emberi vagy irányítópulti
diagnosztikához; ha a konténer HEALTHCHECK ellenőrzését ismét erre szeretné irányítani
(például mélyreható állapotellenőrzéshez), állítsa be az
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` értéket. Ez az útvonal **mélyreható**
ellenőrzést végez (adatbázis + monitorozási összegzés) — megfelelő a Docker ritkán
futó `HEALTHCHECK` ellenőrzéséhez, ha újra ezt választja, de **nem** alkalmas a
Kubernetes `livenessProbe` időközeihez.

Orkesztrátorok (Kubernetes, Nomad stb.) esetén:

| Vizsgálat       | Előnyben részesítendő                                                | Kerülendő                                                                          |
| --------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Működőképesség  | HTTP `GET /livez`, vagy TCP a fő porton (`PORT`, alapérték: `20128`) | Az `/api/monitoring/health` működőképességi vizsgálatként                          |
| Készenlét       | HTTP `GET /healthz`                                                  | Olyan szűk időkorlátok, amelyek az eseményhurok elfoglaltságát leállásként kezelik |
| Mély / blackbox | `/api/monitoring/health`                                             | —                                                                                  |

A `/healthz` a folyamat életciklusát jelenti (`ok` / `starting` / `stopping`). A
`/livez` csak azt ellenőrzi, hogy a folyamat él-e (200-as választ ad, amikor a kezelő
futni képes; nem vár a készenléti állapotra). Mindkettő ugyanazon a Node eseményhurkon
fut, mint a kérések kezelése, ezért a CPU-igényes katalógus- vagy tömörítési feladatok
késleltethetik őket — az elfoglaltság ≠ leállás. Ha a HTTP-vizsgálatok túllépik az
időkorlátot, részesítse előnyben a TCP-alapú működőképességi vizsgálatot. Teljes körű
útmutató a vizsgálatokhoz:
[Monitorozási útmutató — Kubernetes-vizsgálatokra vonatkozó ajánlások](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose Caddyvel (automatikus HTTPS/TLS)

Az OmniRoute biztonságosan elérhetővé tehető a Caddy automatikus SSL-tanúsítvány-kezelésével. Győződjön meg arról, hogy a domain DNS A rekordja a kiszolgáló IP-címére mutat.

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
      # Böngészőből elérhető forrás az OAuth-visszahívásokhoz, az irányítópult hivatkozásaihoz és a generált nyilvános URL-ekhez.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Belső, kiszolgálók közötti URL az ütemezett feladatokhoz és a saját végpontra irányuló lekérésekhez.
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

A Caddy beállítja a szabványos továbbítási fejléceket a háttérben futó konténer számára. Az OmniRoute a
`NEXT_PUBLIC_BASE_URL` értékét használja kanonikus nyilvános forrásként az OAuth-visszahívásokhoz és a generált nyilvános
hivatkozásokhoz; a hitelesített irányítópult írási műveletei azonos forrásból származó kéréseket és munkamenethez kötött CSRF-
védelmet használnak. Az `OMNIROUTE_TRUST_PROXY` beállítást csak olyan speciális telepítéseknél engedélyezze, ahol szándékosan
azt szeretné, hogy az OmniRoute a nyilvános forrást megbízható továbbított fejlécekből származtassa az explicit
konfiguráció helyett.

## Cloudflare Quick Tunnel

A Docker-telepítések irányítópult-támogatása egy kattintással elérhető **Cloudflare Quick Tunnel** funkciót tartalmaz a `Dashboard → Endpoints` oldalon. Az első engedélyezés csak szükség esetén tölti le a `cloudflared` programot, ideiglenes alagutat indít az aktuális `/v1` végponthoz, és a generált `https://*.trycloudflare.com/v1` URL-t közvetlenül a normál nyilvános URL alatt jeleníti meg.

A végpontok alagútpaneljei (Cloudflare, Tailscale, ngrok) a `Settings → Appearance` oldalon jeleníthetők meg vagy rejthetők el az aktív alagút állapotának módosítása nélkül.

### Megjegyzések az alagutakról

- A Quick Tunnel URL-jei ideiglenesek, és minden újraindítás után megváltoznak.
- A Quick Tunnels alagutak nem állnak helyre automatikusan az OmniRoute vagy a konténer újraindítása után. Szükség esetén engedélyezze őket újra az irányítópulton.
- A felügyelt telepítés jelenleg Linux, macOS és Windows rendszereket támogat `x64` / `arm64` architektúrán.
- A felügyelt Quick Tunnels alagutak alapértelmezés szerint HTTP/2 átvitelt használnak, hogy elkerüljék a korlátozott konténerkörnyezetekben jelentkező, UDP-pufferekkel kapcsolatos zajos QUIC-figyelmeztetéseket. Ha más átvitelt szeretne, állítsa a `CLOUDFLARED_PROTOCOL` értékét `quic` vagy `auto` értékre.
- A Docker-lemezképek tartalmazzák a rendszer legfelső szintű CA-tanúsítványait, és átadják őket a felügyelt `cloudflared` folyamatnak, így elkerülhetők a TLS-megbízhatósági hibák, amikor az alagút a konténeren belül indul el.
- Állítsa be a `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` értéket, ha azt szeretné, hogy az OmniRoute egy meglévő bináris fájlt használjon ahelyett, hogy letöltene egyet.

## Lemezképcímkék

| Lemezkép                 | Címke    | Méret  | Leírás                                                       |
| ------------------------ | -------- | ------ | ------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | A legmagasabb **közzétett** stabil SemVer (nem a git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps esetén rögzítse ezt a címkeosztályt                   |

Többplatformos jegyzék: natív `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). A Docker automatikusan kiválasztja a megfelelő architektúrát; adja meg a `--platform linux/amd64` kapcsolót, ha ARM-gazdagépeken ki kell kényszerítenie az AMD64-emulációt.

### Kiadási csatornák

Az OmniRoute külön Docker-csatornákat tesz közzé a stabil kiadásokhoz, az aktív kiadási ág teszteléséhez és a fejlesztői buildekhez.

| Csatorna                        | Forrás                                   | Módosíthatóság                      | Javasolt használat                                                                                                                              |
| ------------------------------- | ---------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Aláírt/verziózott kiadás                 | Megváltoztathatatlan                | Pontos kiadáshoz rögzített éles telepítések                                                                                                     |
| `:latest` / `:latest-web`       | Legmagasabb **közzétett** stabil SemVer  | Módosítható stabil mutató           | A stabil kiadásokat egy SemVer-közzétételi feladat **után** követi — **nem** követi a `main` vagy a még kiadatlan `release/v*` véglegesítéseket |
| `:next` / `:next-web`           | Aktuális alapértelmezett `release/v*` ág | Módosítható előzetes kiadási mutató | Az aktív kiadási ágba már bekerült, de stabil kiadásban még nem szereplő javítások tesztelése                                                   |
| `:main` / `:main-web`           | `main` ág                                | Módosítható fejlesztési mutató      | Kizárólag fejlesztési és integrációs tesztelés                                                                                                  |

#### Webes munkamenet-szolgáltatók: a `-web` lemezképek

A fenti csatornák mindegyike `-web` címkeként is elérhető (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), amely a `runner-web` fázisból épül — ugyanaz a lemezkép, kiegészítve a Playwrighttal és egy Chromium böngészővel. Az alap lemezkép Chromium **nélkül** érkezik; a `gemini-web`, a `claude-web` és a `claude-turnstile` igényli azt.

A hiba késleltetve, nem pedig indításkor jelentkezik: ezek a szolgáltatók felsorolják a modelljeiket, és csatlakoztatottként jelennek meg az irányítópulton, de csak az első kérés hiúsul meg a következő hibával:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ha ezeket a szolgáltatókat használja, töltse le annak a csatornának a `-web` címkéjét, amelyet már használ — semmi más nem változik. npm/CLI-telepítés esetén (Docker-lemezkép nélkül) a böngésző bináris fájlja a megfelelő hiányzó összetevő: futtassa az `npx playwright install chromium` parancsot a gazdagépen.

#### Az előzetes kiadási csatorna használata

A `next` csatorna a jelenlegi alapértelmezett `release/v*` ágra történő minden push alkalmával újraépül, és AMD64-, valamint ARM64-platformra is közzétételre kerül. A régebbi karbantartási ágak nem írhatják felül. A csatorna lehúzható lemezképet biztosít azokhoz a javításokhoz, amelyek már bekerültek az aktív kiadási ágba, de a következő stabil címke még nem készült el.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose használata esetén írja felül a kiválasztott profil által használt lemezképcímkét, majd húzza le és hozza létre újra a szolgáltatást:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Biztonság és visszaállítás

A `next` egy folyamatosan változó, kiadás előtti csatorna. Az aktív kiadási ágra történő bármely push alkalmával megváltozhat, és **éles környezetben való használata nem támogatott**. Egy adott build kiértékelése során rögzítse a lemezkép kivonatát:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Tesztelés előtt készítsen biztonsági mentést az OmniRoute adatkötetéről vagy a csatolt adatkönyvtárról. A visszaállításhoz állítsa vissza a korábban használt stabil verziót vagy kivonatot, majd hozza létre újra a konténert:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Egy kiadási ágból készült build soha nem módosíthatja a `latest` címkét; a stabil mutatót kizárólag egy megfelelő stabil szemantikus verzió léptetheti elő. A `next` lemezképek esetében továbbra is kötelező a kiadási lemezkép ellenőrzése, valamint a CRITICAL súlyosságú sebezhetőségeket blokkoló ellenőrzési kapu teljesítése.

**A `latest` nem garantálja, hogy a lemezkép naprakész a githez képest.** A `main` vagy az aktív `release/v*` ágba egyesített javítások **nem** kerülnek bele a `:latest` lemezképbe mindaddig, amíg közzé nem tesznek egy stabil SemVer-lemezképet, és a közzétételi feladat elő nem lépteti azt `:latest` címkére (ugyanazzal a kivonattal, mint az adott SemVer). Ha a `latest` változatlannak tűnik, miközben a GitHubon már látható a javítás, húzza le a `:next` lemezképet a kiadási ág teszteléséhez, vagy várja meg a SemVer-címkét.

| Amit szeretne                                                                      | Használja ezt                                          |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------ |
| GitOps / éles környezet, amelyben nem megengedett az eltérés                       | Rögzítse a `:X.Y.Z` címkét (vagy a lemezkép kivonatát) |
| A közzétett stabil verziók követése, minden kiadáskor elfogadva az újralétrehozást | `:latest`                                              |
| Ki nem adott `release/v*` commitok tesztelése                                      | `:next` (nem éles környezethez)                        |
| A `main` tesztelése                                                                | `:main` (nem éles környezethez)                        |

## Elérhetőség: az alapértelmezett SQLite egyetlen replikát támogat

A szabványos Docker / Kubernetes OmniRoute **egy Node-folyamatból és egy SQLite-íróból** áll. A magas rendelkezésre állás **nem támogatott** ezen a topológián.

| Korlátozás                                                  | Következmény                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Egyetlen író                                                | **Ne** futtasson több replikát ugyanazzal az SQLite-fájllal. Ez megsérti az adatbázist.                                                                                                                                                                                                                                                                                                                 |
| Újralétrehozás / újraindítás / HEALTHCHECK általi leállítás | A folyamatban lévő SSE-kapcsolatok, az irányítópult-munkamenetek és a memóriában tárolt állapot **teljes kiesése**. Minden csatlakoztatott kliens kapcsolata megszakad. Az üres végpont időszakában az új kérések fordított proxytól származó **`502 Bad Gateway: Unknown error`** választ kapnak, nem OmniRoute JSON-t — a kliensek ezt nem tudják megkülönböztetni egy szolgáltatói hibától (#11015). |
| A `/healthz` végponttal azonos eseményhurok                 | Egy leterhelt katalógus- vagy tömörítési ciklus késleltetheti a próbákat; rövid időtúllépés esetén ez újraindítja az **egyetlen** replikát.                                                                                                                                                                                                                                                             |

**Próbamátrix** (lásd még: [Kubernetes-próbákra vonatkozó javaslatok](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Próba                          | Cél                                                                       | Ne használja                                                                     |
| ------------------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Életképesség                   | TCP a `PORT` porton (alapértelmezés: `20128`), vagy enyhe HTTP `/healthz` | `/api/monitoring/health`                                                         |
| Készenlét                      | HTTP `GET /healthz`                                                       | Olyan szűk időtúllépéseket, amelyek a leterhelt eseményhurkot leálltként kezelik |
| Mélyreható / emberi ellenőrzés | `/api/monitoring/health`                                                  | Automatizált kubelet-életképességi próbához                                      |

**Frissítések:** számítson minden munkamenet megszakadására. Ha lehetséges, ürítse ki a klienseket; az alapértelmezett SQLite használatakor nincs folyamatos frissítés. A Compose `restart: unless-stopped` beállítása és a Docker `HEALTHCHECK` is lecseréli az egyetlen folyamatot, amikor a konténer Unhealthy állapotúvá válik — az érintettségi kör ugyanaz.

Kubernetes-részlet **egyetlen replikához** (a Recreate kötelező; ne növelje a `replicas` értékét egyetlen SQLite-fájl használatakor):

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

A `preStop` alvás lehetővé teszi, hogy a kube eltávolítsa a Service-végpontokat a SIGTERM előtt, így az **új** forgalom már nem éri el a leálló folyamatot. A folyamatban lévő `/v1/responses` SSE-kapcsolatok kiürítésére a rendszer legfeljebb a `SHUTDOWN_TIMEOUT_MS` értékéig (alapértelmezés szerint 30 másodpercig) vár, nagy terhelésű befogadási bérletek használatával (#11015). A folyamatot még elérő új kérések `503` + `Retry-After: 5` választ kapnak. A Recreate miatti üresvégpont-időszak addig, amíg a cserepéldány Ready állapotba nem kerül, továbbra is teljes kiesést jelent — ez az SQLite-topológiából ered, nem a próba hibás konfigurációjából.

A külső Postgres / többírós HA **nem** dokumentált szabványos megoldás. Ha HA-ra van szüksége, tartson fenn egyetlen replikát, vagy használjon olyan topológiát, amelyet a projekt külön tesztelt és dokumentált. A Postgres/MySQL fejlesztése a [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) alatt található. Amíg ez nem jelenik meg, a **nagy** `/v1/responses` kapacitás növelésének egyetlen támogatott módja N független folyamat használata (lásd a következő szakaszt), nem pedig a `replicas > 1` beállítás egyetlen köteten.

## Horizontális skálázás: N független folyamat

Egy Node-folyamat **egy V8-kupacot** használ. Két, egymást átfedő, ~3 MiB-os / ~750k tokenes kódolóügynök-`POST /v1/responses` kérés (RTK + Caveman) ~12 GiB-nál megszakítja ezt a kupacot (`FATAL ERROR: Reached heap limit`), és OOM-ot okozhat egy 16 GiB-os cgroupban. Lásd: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ez a mérés **memóriakeretre** vonatkozó figyelmeztetés, nem pedig a termék két egyidejű hosszú `/v1/responses` kérésre vonatkozó fix felső korlátja. Az erőforrás-igényes chatkérések befogadását egy automatikusan származtatott beolvasásibájt-keret (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) szabályozza, amely ugyanebből a V8-/cgroup-korlátból van méretezve — ennek felfelé történő felülbírálása (vagy a régi, kérésszám-alapú `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` korlát beállítása) egy már méretezett folyamatnál ismét előidézi a megszakítást. A kis chatkérések, a `/healthz`, a `/v1/models` és az MCP **nem** tartoznak e korlát alá.

### Egy folyamat: kettőnél több hosszú `/v1/responses`

Egy **egészséges** folyamat (a kupac az `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, alapértelmezetten `0.75` értéke alatt van) **futtathat** kettőnél több egyidejű hosszú `POST /v1/responses` kérést, amennyiben a folyamat egészére érvényes, folyamatban lévő bájtokra vonatkozó keretben (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) még van hely. Az `OMNIROUTE_CHAT_LARGE_BODY_BYTES` értékét elérő vagy meghaladó törzsek (alapértelmezetten 256 KiB) ugyanazt a nagy erőforrás-igényű foglalást használják, mint a szerkezetileg összetett kérések, valamint ugyanazt a [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) szerinti `tryAcquireHealthyHeadroom` kiskaput (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Több tucat egyidejű, hosszú SSE-kliens (az üzemeltetőknek gyakran 40–50-re van szükségük) **memóriakeret** kérdése — a kupacot, az elsődleges/tartalék helyeket és az `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` értékét kell méretezni —, nem pedig a termék fix „legfeljebb 2” korlátja. A túlterhelt kupac továbbra is újrapróbálható `503` válasszal utasít el kéréseket, így a #7849 problémája nem tér vissza.

A **kupacok megsokszorozásához** (független V8 old-space-ekkel) **jelenleg**:

| Ezt tegye                                                                                                                                                                                                           | Ezt ne tegye                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Futtasson **N konténert/podot**, mindegyiket **saját** `DATA_DIR` könyvtárral / kötettel                                                                                                                            | Ne állítson be `replicas > 1` értéket egy SQLite-fájlhoz                     |
| Méretezze a nagy erőforrás-igényű folyamatban lévő kérések és az egészséges tartalékkapacitás keretét a kupac / folyamatbanlévőbájt-keret alapján; az 1–2 a #7849 konzervatív alapértelmezése, nem fix termékkorlát | Ne adjon egyetlen folyamatnak 8× RAM-ot és korlátlan darabszámkeretet        |
| Opcionális: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` a **megosztott kvótaszámlálókhoz**                                                                                                                 | Ne kezelje a Redist megosztott SQLite-ként — nem az                          |
| Másolja át a szolgáltatói titkos adatokat minden példányba (vagy fogadja el a különálló irányítópultokat)                                                                                                           | Ne számítson egyetlen irányítópultra / közös hívásnaplóra a példányok között |
| Helyezzen elé bármilyen terheléselosztót; elegendő az API-kulcs vagy munkamenet szerinti ragadósság                                                                                                                 | Ne követeljen meg gyártóspecifikus, méretérzékeny köztes réteget             |

Hardver: az egy példányra jutó egyidejű hosszú `/v1/responses` kérések száma **memóriakeret** kérdése (kupac + folyamatbanlévőbájt-keret / #10110). Az N független `DATA_DIR` továbbra is megsokszorozza a kupacokat: a gazdagép RAM-jának `N × cgroup` méretet kell lefednie, nem pedig „egy 16 GiB-os podot N=8 mellett”. Soha ne használjon `replicas > 1` értéket egyetlen SQLite-fájllal.

Compose-vázlat (két kupac, két kötet — nem `deploy.replicas: 2`):

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

A folyamaton belüli sűrűség (a tömörítés eltávolítása a HTTP-isolátumból) itt követhető: [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). A megosztott, tartós állapoton működő egyetlen logikai fürt itt követhető: [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini regionális hibák Dockerben

A Google AI Studio / Gemini API HTTP 400-as választ adhat FAILED_PRECONDITION állapottal és a következő üzenettel:
`User location is not supported for the API use.` A gazdarendszeren sikeres kérés
nem bizonyítja, hogy a konténer ugyanazt a kimenő útvonalat használja. A DNS-sorrend,
az IPv4-/IPv6-kapcsolat, a VPN-útválasztás és a beállított proxyk eltérhetnek. Ellenőrizze
[a Google által támogatott régiókat](https://ai.google.dev/gemini-api/docs/available-regions),
valamint a tényleges kapcsolati útvonalat; ez a hiba önmagában nem jelenti azt, hogy az API-kulcs hibás.

### Részesítse előnyben a kapcsolatspecifikus proxyt

Használja az OmniRoute [kapcsolatonkénti proxykonfigurációját](../ops/PROXY_GUIDE.md#4-level-proxy-system)
az érintett Gemini-kapcsolathoz, majd ismételje meg a **Test Connection** műveletet és egy kisebb kérést
ugyanazzal a modellel. Így az útválasztási módosítás hatóköre az adott kapcsolatra korlátozódik. Ellenőrizze,
hogy a proxy elérhető-e a konténerből, és hogy a kapcsolat valóban azt választja-e.
Az útvonal módosítása nem garantálja, hogy a felsőbb szintű szolgáltatás regionális feltételei teljesülnek.

### A gazdarendszer és a konténer hálózatának összehasonlítása

A hitelesített eredmények összehasonlításakor a kulcs, a modell és a kérés maradjon azonos; soha
ne illesszen be hitelesítő adatokat, proxyjelszavakat vagy teljes hitelesítési fejléceket egy hibajegybe.
Először vizsgálja meg, hogy az operációs rendszer feloldója mely címcsaládokat kínálja fel, ugyanazt a parancsot
használva a gazdarendszeren és a konténeren belül:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Az `omniroute` helyére az Ön által futtatott szolgáltatás nevét írja (például `omniroute-web`). Ezek
a parancsok hitelesítő adatok és IP-címek nélkül írják ki a címcsaládokat. A visszaadott `6`
csupán IPv6 DNS-eredményt jelez: **nem** bizonyítja a használható IPv6-útvonal vagy az API-hozzáférés meglétét.
Ahol a `curl` telepítve van, hasonlítsa össze a `curl -4 -I https://generativelanguage.googleapis.com`
és a `curl -6 -I https://generativelanguage.googleapis.com` eredményét mindkét környezetben.
Egy HTTP-válasz bizonyítja az adott próba kapcsolatának működését, még akkor is, ha az egy nem hitelesített
hibaválasz; a Gemini használati jogosultságát csak a hitelesített modellkérés ellenőrzi.

### Gazdarendszer-szintű alternatíva: működő IPv6 és feloldási szabályzat

A [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) bejelentője
a konténeres IPv6 engedélyezésével és a glibc címkiválasztásának módosításával állította helyre
a hozzáférést a saját környezetében. Ezt környezetspecifikus alternatívaként kezelje. A feloldási beállítások
módosítása előtt ellenőrizze, hogy működik-e a gazdarendszer IPv6-kapcsolata, a konténer kimenő kapcsolata
és útválasztása, valamint a tűzfalszabályok. Egy privát ULA-cím önmagában nem igazolja a nyilvános
IPv6-kapcsolat meglétét.

A Compose alapértelmezett hálózatához már csatlakoztatott szolgáltatások esetén ez a részlet engedélyezi
az IPv6-ot azon a hálózaton; tartsa meg a szolgáltatás többi beállítását, portjait, köteteit és konfigurációját:

```yaml
networks:
  default:
    enable_ipv6: true
```

Elnevezett hálózat esetén azon a hálózaton engedélyezze, amelyhez a szolgáltatás ténylegesen csatlakozik. A Docker
képes ULA-alhálózatot kiosztani; csak akkor válasszon explicit, átfedésmentes alhálózatot, ha azt a hálózata
megköveteli. Lásd a [Docker IPv6-hálózatkezelését](https://docs.docker.com/engine/daemon/ipv6/)
és a [Compose hálózati beállításait](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc-alapú rendszerképen** az `/etc/gai.conf` módosíthatja a címkiválasztást. A jelenlegi
adattár Dockerfile-ja Debiant használ; az egyéni, musl-alapú rendszerképek nem használják ezt a mechanizmust.
A bejelentett módosítás az ULA címkéjét `label fc00::/7 6` értékről
`label fc00::/7 1` értékre változtatja. Induljon ki a rendszerkép teljes szabályzattáblájából, és őrizze meg annak
többi bejegyzését: egy `label`- vagy `precedence`-bejegyzés hozzáadása lecseréli az alapértelmezett táblát, ezért
egy csak a módosított sort tartalmazó fájl nem elegendő. A
[glibc konfigurációs referenciája](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentálja ezeket a szemantikákat. A felülvizsgált fájlt csak olvasható módon csatolja az `/etc/gai.conf`
elérési útra, majd hozza létre újra a szolgáltatást a módosítás alkalmazásához.

Ez az operációs rendszer címkiválasztását módosítja az adott konténerből induló **összes kimenő forgalomhoz**.
Nem kényszerít minden alkalmazást az IPv6 választására: a Node DNS-sorrendje és kapcsolatválasztása
szintén számít. Különösen fontos, hogy a `--dns-result-order=ipv4first` az IPv4-et részesíti előnyben, és
nem jelent megoldást egy kizárólag IPv4-et érintő hibára. Lásd a [Node DNS-sorrendjét](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Minden gazdarendszer-szintű módosítás után tesztelje újra a Geminit és a többi szolgáltatóját. A visszaállításhoz
távolítsa el az egyéni `gai.conf` csatolását, állítsa vissza a korábbi hálózati konfigurációt, és
egy karbantartási időszakban hozza létre újra az érintett szolgáltatást/hálózatot. Egy hálózat újbóli létrehozása
megszakíthatja a hozzá csatlakozó többi konténer működését; ne törölje a tartós adatkötetet.

## Fontos megjegyzések

- **SQLite WAL mód:** Meg kell várni, hogy a `docker stop` befejeződjön, így az OmniRoute a legújabb módosításokat visszaírhatja a `storage.sqlite` fájlba egy ellenőrzőpont létrehozásával. A mellékelt Compose-fájlok már 40 másodperces türelmi időt állítanak be a leállításhoz. Ha közvetlenül futtatja a lemezképet, tartsa meg a `--stop-timeout 40` beállítást.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Állítsa `true` értékre, ha a rendszeres és írás előtti biztonsági mentéseket külsőleg kezelik. A meglévő adatbázisok migrációjához továbbra is saját tartós biztonsági pillanatkép és tömeges migráció elleni védelem szükséges.
- **Adatmegőrzés:** Mindig csatoljon kötetet a `/app/data` elérési úthoz, hogy az adatbázis, a kulcsok és a konfigurációk a konténer újraindítása után is megmaradjanak.
- **Portbeállítás:** Az alapértelmezett `20128` port módosításához írja felül a `PORT` környezeti változót.

## Lásd még

- [Virtuális gép telepítési útmutatója](../ops/VM_DEPLOYMENT_GUIDE.md) — Virtuális gép + nginx + Cloudflare beállítása
- [Fly.io telepítési útmutató](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Telepítés a Fly.io platformra
- [Környezeti konfiguráció](../reference/ENVIRONMENT.md) — Teljes `.env`-referencia
