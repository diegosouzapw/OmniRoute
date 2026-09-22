# 🐳 Docker Guide — OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Teljes Docker-telepítési referencia. A gyors kezdéshez lásd a [README Docker-szakaszát](../README.md#-docker).

## Tartalomjegyzék

- [Gyors futtatás](#quick-run)
- [Környezeti fájllal](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Elérhető profilok](#available-profiles)
- [A gazdagép CLI-eszközeinek konfigurálása, amikor az OmniRoute Dockerben fut](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis sidecar](#redis-sidecar)
- [Éles környezethez készült Compose](#production-compose)
- [Dockerfile-szakaszok](#dockerfile-stages)
- [Kritikus környezeti változók](#critical-environment-variables)
- [Docker Compose Caddyvel (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Lemezképcímkék](#image-tags)
- [Rendelkezésre állás: az alapértelmezett SQLite csak egy replikát támogat](#availability-default-sqlite-is-single-replica)
- [Fontos megjegyzések](#important-notes)

---

## Gyors futtatás

> **Saját üzemeltetés egyetlen paranccsal?** Lásd az
> [Saját üzemeltetési útmutatót](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (közzétett lemezkép +
> Redis, csak visszacsatolási interfészen, profilválasztás nélkül). Az alábbi gyors futtatás az
> egykonténeres megoldás azoknak a felhasználóknak, akik már máshol futtatják a Redist.

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
# Először másolja le és szerkessze a .env fájlt
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

# Gazdagépprofil (elsősorban Linuxhoz; csak olvashatóként csatolja a gazdagép CLI-binárisait)
docker compose --profile host up -d

# A CLI és a CLIProxyAPI sidecar együttes használata
docker compose --profile cli --profile cliproxyapi up -d
```

## Elérhető profilok

Az OmniRoute négy Compose-profilt tartalmaz. Válassza ki a környezetének megfelelőt.

| Profil                   | Szolgáltatás     | Mikor használja                                                                                                                                                                          | Parancs                                      |
| ------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (alapértelmezett) | `omniroute-base` | Grafikus felület nélküli kiszolgáló / minimális futtatókörnyezet, beépített szolgáltatói CLI-k nélkül                                                                                    | `docker compose --profile base up -d`        |
| `cli`                    | `omniroute-cli`  | Ügynökalapú munkafolyamatokhoz, amelyek az `omniroute providers/setup/doctor` parancsot és a beépített CLI-ket (Codex, Claude Code, Droid, OpenClaw) használják                          | `docker compose --profile cli up -d`         |
| `host`                   | `omniroute-host` | Olyan Linux-gazdagépekhez, amelyek a `~/.local/bin`, `~/.codex`, `~/.claude` stb. csak olvasható csatolásával a `network_mode`-hoz hasonló hozzáférést szeretnének a gazdagép CLI-jeihez | `docker compose --profile host up -d`        |
| `cliproxyapi`            | `cliproxyapi`    | A [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar futtatásához a `8317`-es porton, a felsőbb rétegbeli CLI-proxyzás érdekében                                        | `docker compose --profile cliproxyapi up -d` |

> Több profil is kombinálható: `docker compose --profile cli --profile cliproxyapi up -d`.

## A gazdagépen futó CLI-eszközök konfigurálása, amikor az OmniRoute Dockerben fut

Az `omniroute setup-codex`, a `setup-claude`, a `config set <tool>` parancsok és az irányítópult
**Konfiguráció mentése** gombja mind olyan fájlokat írnak, mint a `~/.codex/*.config.toml`. Ezeknek az elérési utaknak
csak azon a gépen van jelentésük, ahol a CLI ténylegesen fut. Ha ezeket a konténerben
futtatja, az írás a konténer saját kezdőkönyvtárába kerül (`/home/node` —
a lemezkép `USER node` felhasználóval fut), ahonnan egyetlen gazdagépi CLI sem fogja beolvasni, és amely
a konténer újbóli létrehozásakor azonnal törlődik.

Az OmniRoute ezt észleli, és a nem használható sikerjelzés helyett
utasításokkal megtagadja az írást: a CLI `2` kóddal lép ki, az API pedig `422`
válaszkódot ad, benne a `containerEphemeralTarget: true` értékkel.

### Ajánlott: a CLI futtatása a gazdagépen, az OmniRoute futtatása Dockerben

A konténer szolgálja ki az API-t; a CLI a gazdagépi eszközöket konfigurálja.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # irányítsa a CLI-t a konténerre
omniroute setup-codex                      # a gazdagépen lévő valódi ~/.codex könyvtárba ír
```

Ez a megfelelő választás, amikor a Codex, a Claude Code, a Cursor vagy egy hasonló eszköz
a laptopján fut — és általában ez a megszokott felállás.

### Alternatíva: a gazdagép konfigurációs könyvtárainak bind mounttal történő csatolása (`host` profil)

Ha azt szeretné, hogy maga a konténer írja a gazdagép konfigurációját, csatolja be a
könyvtárakat, és állítsa a `CLI_CONFIG_HOME` értékét a csatolás gyökérkönyvtárára. A `host` profil
ezt már eleve megteszi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

A bind mount teszi megbízhatóvá az elérési utat: az OmniRoute beolvassa a
`/proc/self/mountinfo` fájlt, és engedélyezi az írást a csatolt elérési utakra (valamint azokba a könyvtárakba,
amelyek gyermekkönyvtárai csatolási pontok, ami pontosan megfelel a fenti `/host-home` felépítésnek), miközben
továbbra is megtagadja az írást a nem csatolt elérési utakra.

### Vészkijárat: a konténer saját CLI-jeinek konfigurálása (csak indokolt esetben)

Ha a CLI-k valóban a konténeren belül találhatók (a `cli` profilban), az írás
szándékos. Adja át az `--allow-container-write` kapcsolót bármely `setup-*` parancsnak, vagy állítsa be
az `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` értéket a kiszolgálóhoz. Az írás végrehajtódik,
de figyelmeztetés jelenik meg arról, hogy az adat nem éli túl a konténert.

> **Biztonsági figyelmeztetés — `cli` profil + `docker.sock` csatolás.**
> A `cli` profil bind mounttal csatolja a `/var/run/docker.sock` fájlt, hogy a konténeren belüli
> automatikus frissítő újra létrehozhassa a veremet a gazdagép démonján keresztül
> (a `src/lib/system/autoUpdate.ts` megvizsgálja, hogy elérhető-e ez a socket, és kihagyja a
> Docker-útvonalat, ha nincs jelen). Ez a socket **a gazdagép root jogosultságú
> bizalmi határa**: bármi, ami hozzáfér, root jogosultsággal vezérelheti a gazdagép Docker-démonját —
> létrehozhatja, megvizsgálhatja, leállíthatja és eltávolíthatja a gazdagép bármely konténerét.
> Következmények:
>
> 1. **Soha ne tegye elérhetővé a `cli` profil portját a hálózaton.** Tegye közzé
>    a `127.0.0.1` címen (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — a helyi hálózatról elérhető `cli` profil az irányítópult szintjén végrehajtható bármely távoli kódfuttatási támadást
>    a gazdagép teljes kompromittálásává súlyosbít.
> 2. **Ne csatoljon további gazdagépi könyvtárakat a `cli` profilba.**
>    A Docker-socket és bármely további csatolás együttesen teljes
>    olvasási/írási hozzáférést biztosít a konténernek a fájlrendszeréhez és a gazdagép konfigurációjához. Ha egy eszköznek
>    hozzá kell férnie egy projekthez, futtassa helyileg a CLI binárisával — ne csatolja
>    a `cli` konténerbe.
>
> Ha nincs szüksége a konténeren belüli automatikus frissítésre, ne kapcsolja be a `cli` profilt
> (`COMPOSE_PROFILES=core,redis` vagy rövidebb). A többi profil nem
> csatolja a Docker-socketet.
>
> A MITM-hez kapcsolódó fenyegetési modellért lásd a `docs/security/MITM-TPROXY-DECRYPT.md` fájlt (git; nincs beépítve a `/docs` könyvtárba),
> a `codex`/`claude-code`/`droid`/`openclaw` binárisok eredetláncáért pedig a
> `docs/security/SUPPLY_CHAIN.md` fájlt.

## Redis sidecar

Az OmniRoute a Redisre támaszkodik az elosztott sebességkorlátozó és a megosztott gyorsítótár működéséhez. A `redis` szolgáltatás **mindig definiálva van** a `docker-compose.yml` fájlban (nem tartozik hozzá profilfeltétel), és minden más profillal együtt elindul.

| Részlet                  | Érték                                           |
| ------------------------ | ----------------------------------------------- |
| Lemezkép                 | `redis:7-alpine`                                |
| Konténer neve            | `omniroute-redis`                               |
| Belső port               | `6379`                                          |
| Gazdagépport (felülírás) | `REDIS_PORT` (alapértelmezés: `6379`)           |
| Gazdagépcím (felülírás)  | `REDIS_BIND_HOST` (alapértelmezés: `127.0.0.1`) |
| Kötet                    | `omniroute-redis-data` → `/data`                |
| Állapot-ellenőrzés       | `redis-cli ping` (10 másodperces időköz)        |

Kapcsolódó környezeti változók:

- `REDIS_URL` — az alkalmazásba átadott kapcsolati karakterlánc (alapértelmezés szerint `redis://redis:6379`).
- `REDIS_PORT` — a Redis-konténer gazdagépoldali portleképezése.
- `REDIS_BIND_HOST` — az a gazdagépi hálózati interfész, amelyen a port közzé van téve. Alapértelmezés szerint `127.0.0.1`.

> **Miért a visszacsatolási cím az alapértelmezett:** a sidecar `requirepass` nélkül fut, az
> alkalmazáskonténerek pedig a compose-hálózaton (`redis:6379`) keresztül érik el — a közzétett port
> csak a gazdagépoldali eszközök (`redis-cli`, egy helyi `npm run dev`) számára szükséges. A
> `0.0.0.0` címen való közzététel egy hitelesítés nélküli Redist tenne elérhetővé a helyi hálózat
> minden gazdagépe számára. Ha a `REDIS_BIND_HOST=0.0.0.0` beállítást használja, adja hozzá a
> `--requirepass` kapcsolót is a szolgáltatás `command:` mezőjéhez.

A **Redis letiltása** nem ajánlott (a sebességkorlátozó memóriabeli tartalékmegoldásra áll vissza). Ha mégis szükséges, távolítsa el vagy tegye megjegyzésbe a `redis:` szolgáltatásblokkját a `docker-compose.yml` fájlban, vagy skálázza nullára:

```bash
docker compose up -d --scale redis=0
```

## Éles környezethez készült Compose

A fejlesztői környezettel párhuzamosan futó, elkülönített éles pillanatképhez használja a `docker-compose.prod.yml` fájlt.

| Részlet                             | Érték                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| Fájl                                | `docker-compose.prod.yml`                                                          |
| Irányítópult alapértelmezett portja | `PROD_DASHBOARD_PORT=20130` (a belső `${DASHBOARD_PORT:-20128}` portra leképezve)  |
| API alapértelmezett portja          | `PROD_API_PORT=20131`                                                              |
| Lemezkép                            | `omniroute:prod` (a `runner-cli` célból összeállítva)                              |
| Redis-konténer                      | `omniroute-redis-prod` (`redis:8.6.2`, dedikált `redis-prod-data` kötet)           |
| Adatkötet                           | `omniroute-prod-data` (elnevezett, az újraépítések között megőrzött)               |
| Állapot-ellenőrzések                | `node healthcheck.mjs` + `redis-cli ping`, a `depends_on` a Redis állapotától függ |

Használat:

```bash
# Az éles környezet összeállítása és elindítása
docker compose -f docker-compose.prod.yml up -d --build

# Naplók folyamatos megjelenítése
docker compose -f docker-compose.prod.yml logs -f

# Leállítás és eltávolítás (a kötetek megtartásával)
docker compose -f docker-compose.prod.yml down
```

Az éles környezet a fejlesztői compose-zal párhuzamosan fut (eltérő konténernevekkel, portokkal és kötetekkel), így helyben tovább folytathatja a fejlesztést, miközben az éles környezet továbbra is fut.

## Dockerfile-szakaszok

A tároló egy többlépcsős Dockerfile-t (`Dockerfile`) tartalmaz. Három szakasz érhető el; válaszd a felhasználási esetednek megfelelő `target` értéket.

| Szakasz       | Alaplemezkép          | Rendeltetés                                                                                                                                                                                         |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Telepíti a függőségeket (`npm ci --legacy-peer-deps`), majd futtatja az `npm run build` parancsot (alapértelmezés szerint Turbopack — lásd alább a fordítási erőforrásokat)                         |
| `runner-base` | `node:26-trixie-slim` | Éles futtatókörnyezet a Next.js önálló kimenetével. **Nem tartalmaz szolgáltatói CLI-ket.**                                                                                                         |
| `runner-cli`  | `runner-base`         | Hozzáadja a `git`, `docker.io`, `docker-compose` eszközöket és a globális CLI-ket: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Ezt válaszd agentikus munkafolyamatokhoz.** |

Adott cél manuális összeállítása:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Fordítási erőforrások

Három buildargumentum szabályozza a `builder` szakasz erőforrásigényét. Ezek csak a fordítás idején érvényesek —
az `OMNIROUTE_MEMORY_MB` (lásd alább) ettől független futásidejű beállítás.

| Buildargumentum             | Alapérték | Hatás                                                                                                                          |
| --------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `1`       | `0` esetén webpackkel fordít. Alacsonyabb memória-csúcsérték, de lassabb.                                                      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`    | V8-heapkorlát (`--max-old-space-size`) az elindított `next build` számára.                                                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`       | Beállítja a `CIRCLE_NODE_TOTAL` értékét; a Next ebből számítja ki a `workers = N - 1` értéket az oldaladatok összegyűjtéséhez. |

Nagy teljesítményű fordítógépen az `OMNIROUTE_BUILD_WORKERS` értékét érdemes növelni, korlátozott erőforrású fordítás **`✓ Compiled successfully` után** történő leállásakor pedig először ezt érdemes gyanítani. Minden oldaladat-feldolgozó külön folyamat, ahogyan maga a szülő `next build` is; egy valós VPS-en végzett reprodukció (#7518) minden folyamat RSS-csúcsértékét ~4,5 GB-nak mérte, a `NODE_OPTIONS` heapjelzőtől függetlenül (a Turbopack a V8 heapen kívüli natív/Rust-memóriában fordít). Az alapértelmezett `2` érték (→ 1 feldolgozó, összesen 2 folyamat) a közzétételi folyamat által használt, GitHub által üzemeltetett 16 GB-os / 4 vCPU-s futtatókhoz van méretezve. `8` esetén (→ 7 feldolgozó) ennek a futtatónak elfogyott a memóriája, és a buildkit a `ResourceExhausted: ... cannot allocate memory` hibával szakította meg a lépést; `3` (→ 2 feldolgozó) még mindig nem fért el, miután a folyamatonkénti RSS-t közvetlenül mérték ahelyett, hogy következtettek volna rá. A `tests/unit/docker-build-memory-budget.test.ts` a mért érték alapján végzi el a számítást, és hibát jelez, ha bármelyik beállítás meghaladja a futtató kapacitását.

A Turbopack a V8 heapen **kívül** található natív Rust-memóriában fordít, ezért az `OMNIROUTE_BUILD_MEMORY_MB` nem korlátozza azt. Memóriakorláttal rendelkező gazdagépen ezért az OOM-kezelő SIGKILL jellel állítja le a fordítást, mindenféle hibaüzenet nélkül — a folyamat egyszerűen megáll a `Creating an optimized production build` közben, ami inkább lefagyásnak tűnik, mint memóriahiánynak. Ha a fordítási gazdagép erőforrásai korlátozottak, válts csomagolóra:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

A `webpackBuildWorker` engedélyezve van, így a `next build` egy szülő- **és** egy feldolgozófolyamatot futtat, amelyek külön-külön veszik figyelembe az `OMNIROUTE_BUILD_MEMORY_MB` értékét. A konténer korlátját ezért ennek az értéknek nagyjából a kétszerese fölé méretezd, ne csak egyszeresére.

Ezen a forrásfán mérve (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Csomagoló | Konténerkorlát | Eredmény                                     |
| --------- | -------------- | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | Mindkettőnél OOM miatti leállítás, csendben  |
| webpack   | 8 GiB          | A fordítási feldolgozót SIGKILL állította le |
| webpack   | 12 GiB         | Sikeres, 11,1 GiB-os csúcsértékkel           |

### Futásidejű alapértékek

A `runner-base` által exportált alapértékek: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Memóriakezelés Dockerben:

- A lemezkép beállítja az `OMNIROUTE_MEMORY_MB=1024` értéket, és ebből származtatja a `NODE_OPTIONS=--max-old-space-size=1024` értéket.
- A tényleges kiszolgálófolyamatot az önálló indító indítja el, amely beolvassa az `OMNIROUTE_MEMORY_MB` értékét, és hozzáfűzi a `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` beállítást.
- A Node az utolsó ismételt `--max-old-space-size` értéket használja, így az `OMNIROUTE_MEMORY_MB` beállítása szabályozza a Docker tényleges heapkorlátját.
- Mivel a lemezkép mindig beállítja ezt, az indító saját, rendelkezésre álló RAM alapján kalibrált tartalékértéke Docker alatt soha nem lép életbe. A munkaterheléshez kifejezetten növeld meg (lásd az alábbi táblázatot). A `2048` még mindig túl kevés a kódoló ügynökök `/v1/responses` kéréseihez.

### Futásidejű RAM kódoló ügynökökhöz

Az alapértelmezett 1 GiB-os Docker-beállítás egy irányítópulthoz vagy könnyű csevegéshez elegendő minimum, nem éles környezethez megfelelő méret. A hosszú `POST /v1/responses` törzsek (több száz üzenet, több tucat eszköz) a tömörítés során több memóriabeli gráfot is megőriznek. Két, egymást átfedő, egyenként ~3 MiB-os / ~750 ezer tokenes kérés **12 GiB-os** old-space mellett is megszakította a V8 működését (`FATAL ERROR: Reached heap limit`), és egy 16 GiB-os cgroup OOM-korlátját is elérte. Lásd: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

A **cgroup `--memory` értékét a heap mérete fölé állítsd** — a natív pufferek, az SQLite és a tömörítés köztes adatai a V8-on kívül helyezkednek el.

| Munkaterhelés                             | `OMNIROUTE_MEMORY_MB`             | Konténer / cgroup            | Megjegyzések                                                                                                                                |
| ----------------------------------------- | --------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Irányítópult, egy könnyű csevegés         | `1024` (lemezkép alapértelmezése) | ≥2 GiB                       |                                                                                                                                             |
| Egy kódolóügynök (Claude/Codex/Grok)      | `8192`                            | ≥10 GiB                      | Tipikus egymunkamenetes `/v1/responses`                                                                                                     |
| Két egyidejű hosszú `/v1/responses`       | `10240`–`12288`                   | ≥12–16 GiB                   | Mért V8-megszakítás körülbelül 12 GiB-os halomnál                                                                                           |
| Három vagy több egyidejű hosszú kontextus | ne futtassa egyetlen folyamatban  | soros végrehajtás / több RAM | Az alapértelmezett erőforrás-igényes beléptetési korlát 1 folyamatban lévő kérés; RAM-bővítés nélküli emelése ismét előidézi a megszakítást |

Az `omniroute serve` közvetlenül a hardveren futtatva a RAM körülbelül 35%-ára kalibrál (a `[512, 4096]` tartományra korlátozva), ha az `OMNIROUTE_MEMORY_MB` **nincs beállítva**. A Docker mindig `1024` értékre állítja, ezért ez a kalibrálás a hivatalos lemezképben soha nem fut le.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritikus környezeti változók

Az [ENVIRONMENT.md](../reference/ENVIRONMENT.md) fájlban dokumentált alapértelmezéseken túl a következő változók a legfontosabbak Docker alatti futtatáskor:

| Változó                       | Cél                                                                                                                                                                                                                                                                                                                                                           | Alapértelmezett                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | A WebSocket-híd megosztott titka. **Éles környezetben kötelező** — állítsa erős, véletlenszerű karakterláncra.                                                                                                                                                                                                                                                | nincs beállítva (meg kell adni) |
| `REDIS_URL`                   | A sebességkorlátozó/gyorsítótár háttérrendszer kapcsolati karakterlánca                                                                                                                                                                                                                                                                                       | `redis://redis:6379`            |
| `REDIS_PORT`                  | A mellékelt Redis-konténer gazdagépen elérhető portja                                                                                                                                                                                                                                                                                                         | `6379`                          |
| `REDIS_BIND_HOST`             | Az a gazdagép-interfész, amelyen a mellékelt Redis-port közzé van téve (loopback, hacsak nem ad hozzá AUTH-hitelesítést)                                                                                                                                                                                                                                      | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | A gazdagép azon elérési útja, amely a `cli` profilban a `/workspace/omniroute` útvonalra van csatolva az önfrissítési munkafolyamatokhoz                                                                                                                                                                                                                      | `.` (aktuális könyvtár)         |
| `OMNIROUTE_MEMORY_MB`         | A Node futásidejű heapmemória-korlátja az önálló Docker-kiszolgálóhoz; felülírja a rendszerkép fenti alapértelmezését. Kódoló ügynökök esetén: `8192`+ (lásd: [futásidejű RAM](#runtime-ram-for-coding-agents)).                                                                                                                                              | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Felülírja az irányítópult (20128) és az API (20129) közzétett portjait                                                                                                                                                                                                                                                                                        | `20128` / `20129`               |
| `APP_BIND_HOST`               | Az a gazdagép-interfész, amelyen a docker-compose közzéteszi az irányítópult, az API és az élő WS portjait. `REQUIRE_API_KEY=false` esetén (ez az alapértelmezett) a `0.0.0.0` a névtelen `/v1` proxyt elérhetővé teszi a LAN számára — csak `REQUIRE_API_KEY=true` beállítással vagy egy elé helyezett fordított proxyval tegye szélesebb körben elérhetővé. | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | Az a gazdagép-interfész, amelyen a docker-compose közzéteszi a `cliproxyapi` oldalkonténert — ennek adatkötete tárolja a szolgáltatói hitelesítő adatokat.                                                                                                                                                                                                    | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Az a könyvtár, amelyet a futásidejű beépülőmodul-kereső beolvas, és amelybe telepít. Állítsa be, ha a beépülő modulok bind mounttal vannak csatolva: az alapértelmezés a `HOME` értékét követi, amelyet a rendszerkép nem feltétlenül exportál.                                                                                                               | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | Az alkalmazás URL-alútvonala, ha fordított proxy mögött van közzétéve (például `/omniroute`)                                                                                                                                                                                                                                                                  | _(üres = gyökér)_               |
| `NEXT_PUBLIC_BASE_URL`        | A nyilvános böngészőeredet az alútvonallal együtt (például `https://host/omniroute`)                                                                                                                                                                                                                                                                          | nincs beállítva                 |
| `PROD_DASHBOARD_PORT`         | Az irányítópult gazdagépoldali portja a `docker-compose.prod.yml` fájlhoz                                                                                                                                                                                                                                                                                     | `20130`                         |
| `CLIPROXYAPI_PORT`            | A `cliproxyapi` oldalkonténer gazdagépoldali portja                                                                                                                                                                                                                                                                                                           | `8317`                          |

## Fordított proxy alútvonalon (Traefik / nginx)

A Next.js `basePath` értéke belefordításra kerül az önálló csomagba. Az OmniRoute a beégetett
értéket egy, az alkalmazás gyökerében található jelzőfájlban rögzíti (amely az `npm run build`
során íródik, és amelyet a `scripts/docker/ensure-docker-base-path.mjs` olvas be), majd a
konténer indulásakor összehasonlítja az `OMNIROUTE_BASE_PATH` értékével. Ha eltérnek, és a lemezkép
a tartomány gyökeréhez készült, a belépési pont átírja az önálló jegyzékfájlokat, a beágyazott
`basePath`/`assetPrefix` literálokat (a Next 16 az SSR-eszközök URL-jeit kizárólag az
`assetPrefix` alapján jeleníti meg — a javító az alútvonalat ebbe is átmásolja), a beégetett
`/_next/static` eszköz-URL-eket (klienshivatkozási jegyzékfájlok, médiaimportok, előre renderelt
hibaoldalak), valamint a kliensoldali `process.env` helyettesítést, mielőtt a
`node dev/run-standalone.mjs` elindul.

### Compose-alapú összeállítás (ajánlott)

Állítsa be mindkét változót a `.env` fájlban, majd építse újra a lemezképet, hogy annak
beállításai megegyezzenek a futásidejű környezettel:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

A `docker-compose.yml` az `OMNIROUTE_BASE_PATH` értékét Docker build argumentumként és
futásidejű környezeti változóként is továbbítja.

### Előre összeállított gyökérlemezkép + futásidejű alútvonal

A közzétett `diegosouzapw/omniroute:*` lemezképek a tartomány gyökeréhez készültek. Ennek
ellenére futásidőben is beállítható az `OMNIROUTE_BASE_PATH`; a konténer induláskor egyszer
módosítja a csomagot. Használja a hozzá illő nyilvános forrással együtt:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Úgy konfigurálja a fordított proxyt, hogy a **teljes** külső elérési utat továbbítsa (ne
távolítsa el az előtagot). A Traefiknek a `PathPrefix(`/omniroute`)` útvonalat `StripPrefix`
nélkül kell a konténerhez irányítania, hogy a Next.js az `/omniroute/...` útvonalat kapja meg,
és az eszközöket az `/omniroute/_next/...` útvonalról szolgálja ki.

A Docker állapotellenőrzése az aktív `OMNIROUTE_BASE_PATH` előtaggal ellátott, kis erőforrás-igényű
`/healthz` életciklus-végpontot vizsgálja. Az `/api/monitoring/health` továbbra is elérhető
emberi vagy irányítópultos diagnosztikához; ha a konténer HEALTHCHECK ellenőrzését ismét erre
szeretné irányítani (például részletes állapot-ellenőrzés kikényszerítéséhez), állítsa be az
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` értéket. Ez az útvonal **részletes**
ellenőrzést végez (adatbázis + monitorozási összesítés) — megfelelő a Docker ritkán futó
`HEALTHCHECK` ellenőrzéséhez, ha újból ezt választja, de **nem** alkalmas a Kubernetes
`livenessProbe` időközeihez.

Orkesztrátorokhoz (Kubernetes, Nomad stb.):

| Vizsgálat            | Előnyben részesítendő                                                     | Kerülendő                                                                            |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Működőképesség       | HTTP `GET /livez`, vagy TCP a fő porton (`PORT`, alapértelmezés: `20128`) | `/api/monitoring/health` működőképességi vizsgálatként                               |
| Készenlét            | HTTP `GET /healthz`                                                       | Olyan szoros időkorlátok, amelyek az eseményhurok leterheltségét leállásként kezelik |
| Részletes / blackbox | `/api/monitoring/health`                                                  | —                                                                                    |

A `/healthz` a folyamat életciklusáról ad jelentést (`ok` / `starting` / `stopping`). A
`/livez` csak azt ellenőrzi, hogy a folyamat él-e (200-as választ ad, amikor a kezelő futni
képes; nem várja meg a készenléti állapotot). Mindkettő ugyanazon a Node-eseményhurkon fut,
mint a kérések kezelése, ezért a CPU-igényes katalógus- vagy tömörítési műveletek
késleltethetik őket — a leterheltség ≠ leállás. Ha a HTTP-vizsgálatok túllépik az
időkorlátot, részesítse előnyben a TCP-alapú működőképességi vizsgálatot. Teljes körű
útmutató a vizsgálatokhoz:
[Monitorozási útmutató — Kubernetes-vizsgálatokra vonatkozó ajánlások](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose Caddyvel (HTTPS Auto-TLS)

Az OmniRoute biztonságosan elérhetővé tehető a Caddy automatikus SSL-kiépítésével. Győződjön meg arról, hogy a tartomány DNS A rekordja a kiszolgáló IP-címére mutat.

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
      # Belső, kiszolgálók közötti URL az ütemezett feladatokhoz és az önmagára irányuló lekérésekhez.
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

A Caddy beállítja a szabványos továbbítási fejléceket a háttérkonténer számára. Az OmniRoute a
`NEXT_PUBLIC_BASE_URL` értékét használja kanonikus nyilvános forrásként az OAuth-visszahívásokhoz és a generált nyilvános
hivatkozásokhoz; a hitelesített irányítópult írási műveletei azonos forrású kéréseket, valamint munkamenethez kötött CSRF-
védelmet használnak. Az `OMNIROUTE_TRUST_PROXY` beállítást csak olyan speciális telepítéseknél engedélyezze, amelyeknél szándékosan
azt szeretné, hogy az OmniRoute a nyilvános forrást a megbízható továbbított fejlécekből származtassa az explicit
konfiguráció helyett.

## Cloudflare Quick Tunnel

A Docker-telepítések irányítópult-támogatása egyetlen kattintással használható **Cloudflare Quick Tunnel** funkciót tartalmaz a `Dashboard → Endpoints` oldalon. Az első engedélyezés csak szükség esetén tölti le a `cloudflared` programot, ideiglenes alagutat indít az aktuális `/v1` végponthoz, és a generált `https://*.trycloudflare.com/v1` URL-t közvetlenül a normál nyilvános URL alatt jeleníti meg.

A végpontok alagútpaneljei (Cloudflare, Tailscale, ngrok) megjeleníthetők vagy elrejthetők a `Settings → Appearance` oldalon az aktív alagút állapotának módosítása nélkül.

### Megjegyzések az alagutakról

- A Quick Tunnel URL-ek ideiglenesek, és minden újraindítás után megváltoznak.
- A Quick Tunnel alagutak nem állnak automatikusan helyre az OmniRoute vagy a konténer újraindítása után. Szükség esetén engedélyezze őket újra az irányítópultról.
- A felügyelt telepítés jelenleg Linux, macOS és Windows rendszereket támogat `x64` / `arm64` architektúrán.
- A felügyelt Quick Tunnel alagutak alapértelmezés szerint HTTP/2 átvitelt használnak, hogy elkerüljék a zajos QUIC UDP-pufferfigyelmeztetéseket a korlátozott konténerkörnyezetekben. Állítsa a `CLOUDFLARED_PROTOCOL=quic` vagy `auto` értéket, ha más átvitelt szeretne használni.
- A Docker-lemezképek tartalmazzák a rendszer CA-gyökértanúsítványait, és átadják őket a felügyelt `cloudflared` folyamatnak, így elkerülhetők a TLS-megbízhatósági hibák, amikor az alagút a konténeren belül indul el.
- Állítsa be a `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` értéket, ha azt szeretné, hogy az OmniRoute egy meglévő bináris fájlt használjon új letöltése helyett.

## Lemezképcímkék

| Lemezkép                 | Címke    | Méret  | Leírás                                                       |
| ------------------------ | -------- | ------ | ------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | A legmagasabb **közzétett** stabil SemVer (nem a git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps esetén rögzítse ezt a címkeosztályt                   |

Többplatformos jegyzék: natív `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). A Docker automatikusan kiválasztja a megfelelő architektúrát; adja meg a `--platform linux/amd64` kapcsolót, ha ARM-gazdagépeken kényszeríteni szeretné az AMD64-emulációt.

### Kiadási csatornák

Az OmniRoute külön Docker-csatornákat tesz közzé a stabil kiadásokhoz, az aktív kiadási ág teszteléséhez és a fejlesztői build-ekhez.

| Csatorna                        | Forrás                                   | Módosíthatóság                      | Ajánlott használat                                                                                                                             |
| ------------------------------- | ---------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Aláírt/verziózott kiadás                 | Nem módosítható                     | Olyan éles telepítések, amelyek pontos kiadást rögzítenek                                                                                      |
| `:latest` / `:latest-web`       | Legmagasabb **közzétett** stabil SemVer  | Módosítható stabil mutató           | A stabil kiadásokat követi **egy SemVer-közzétételi feladat után** — **nem** követi a `main` ágat vagy a még kiadatlan `release/v*` commitokat |
| `:next` / `:next-web`           | Aktuális alapértelmezett `release/v*` ág | Módosítható előzetes kiadási mutató | Az aktív kiadási ágra már bekerült, de stabil kiadásban még nem szereplő javítások tesztelése                                                  |
| `:main` / `:main-web`           | `main` ág                                | Módosítható fejlesztői mutató       | Kizárólag fejlesztési és integrációs teszteléshez                                                                                              |

#### Az előzetes kiadási csatorna használata

A `next` csatorna az aktuális alapértelmezett `release/v*` ágra történő minden feltöltéskor újraépül, és AMD64, valamint ARM64 architektúrához is közzétételre kerül. A régebbi karbantartási ágak nem írhatják felül. A csatorna letölthető lemezképet biztosít azokhoz a javításokhoz, amelyek a következő stabil címke létrehozása előtt már bekerültek az aktív kiadási ágba.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose használata esetén írja felül a kiválasztott profil által használt lemezképcímkét, majd töltse le és hozza létre újra a szolgáltatást:

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

A `next` egy folyamatosan változó előzetes kiadási csatorna. Az aktív kiadási ágra történő bármely feltöltéskor megváltozhat, és **éles használata nem támogatott**. Egy adott build kiértékelésekor rögzítse a lemezkép kivonatát:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Tesztelés előtt készítsen biztonsági másolatot az OmniRoute adatkötetéről vagy a bind mounttal csatolt adatkönyvtárról. A visszaállításhoz állítsa vissza a korábban használt stabil verziót vagy digestet, majd hozza létre újra a konténert:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Egy release branch buildje soha nem módosíthatja a `latest` címkét; a stabil mutatót kizárólag egy megfelelő stabil szemantikus verzió léptetheti elő. A `next` rendszerképek esetében továbbra is érvényben marad a kiadási rendszerkép ellenőrzése és a CRITICAL súlyosságú sebezhetőségek esetén aktiválódó blokkoló ellenőrzés.

**A `latest` nem garantálja a git változásainak aktualitását.** A `main` ágba vagy az aktív `release/v*` ágba beolvasztott javítások **nem** kerülnek bele a `:latest` rendszerképbe mindaddig, amíg közzé nem tesznek egy stabil SemVer rendszerképet, és a közzétételi feladat elő nem lépteti azt `:latest` címkével (ugyanazzal a digesttel, mint az adott SemVer). Ha a `latest` változatlannak tűnik, miközben a GitHubon már látható a javítás, a release branch teszteléséhez töltse le a `:next` rendszerképet, vagy várja meg a SemVer címkét.

| Cél                                                                                             | Használat                                                  |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| GitOps / éles környezet, amelyben nem megengedett az eltérés                                    | Rögzítse a `:X.Y.Z` verziót (vagy a rendszerkép digestjét) |
| A közzétett stabil kiadások követése, minden kiadásnál elfogadva a konténer újbóli létrehozását | `:latest`                                                  |
| Kiadatlan `release/v*` commitok tesztelése                                                      | `:next` (nem éles környezethez)                            |
| A `main` tesztelése                                                                             | `:main` (nem éles környezethez)                            |

## Rendelkezésre állás: az alapértelmezett SQLite egyetlen replikás

A szabványos Docker / Kubernetes OmniRoute **egy Node-folyamatból és egy SQLite-íróból** áll. A magas rendelkezésre állás ezen a topológián **nem támogatott**.

| Korlátozás                                                  | Következmény                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Egyetlen író                                                | **Ne** futtasson több replikát ugyanazzal az SQLite-fájllal. Ez megrongálja az adatbázist.                                                                                                                                                                                                                                                                                                                  |
| Újralétrehozás / újraindítás / HEALTHCHECK általi leállítás | A folyamatban lévő SSE-kapcsolatok, az irányítópult-munkamenetek és a memóriában tárolt állapot **teljes kiesése**. Minden csatlakoztatott kliens kapcsolata megszakad. Az üres végpont időszakában érkező új kérések fordított proxytól származó **`502 Bad Gateway: Unknown error`** választ kapnak, nem OmniRoute JSON-t — a kliensek ezt nem tudják megkülönböztetni egy szolgáltatói hibától (#11015). |
| A `/healthz` útvonallal azonos eseményhurok                 | Egy terhelt katalógus- vagy tömörítési ciklus késleltetheti a vizsgálatokat; egy rövid időkorlát ezután újraindítja az **egyetlen** replikát.                                                                                                                                                                                                                                                               |

**Vizsgálati mátrix** (lásd még: [Kubernetes-vizsgálati javaslatok](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Vizsgálat           | Cél                                                                                             | Ne használja                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Életképesség        | TCP a `PORT` porton (alapértelmezés: `20128`), vagy enyhe HTTP-vizsgálat a `/healthz` útvonalon | `/api/monitoring/health`                                                      |
| Készenlét           | HTTP `GET /healthz`                                                                             | Olyan szoros időkorlátok, amelyek a foglalt eseményhurkot leállásként kezelik |
| Mélyreható / emberi | `/api/monitoring/health`                                                                        | Automatizált kubelet-életképességi vizsgálat                                  |

**Frissítések:** számítson minden munkamenet megszakadására. Ha lehetséges, fokozatosan válassza le a klienseket; az alapértelmezett SQLite-tal nincs gördülő frissítés. A Compose `restart: unless-stopped` beállítása és a Docker `HEALTHCHECK` szintén lecseréli az egyetlen folyamatot, amikor a tároló Unhealthy állapotúvá válik — ugyanazzal a hatókörű kieséssel.

Kubernetes-részlet **egyetlen replikához** (a Recreate kötelező; ne növelje a `replicas` értékét egyetlen SQLite-fájl használata mellett):

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

A `preStop` várakoztatása lehetővé teszi, hogy a kube eltávolítsa a Service-végpontokat a SIGTERM előtt, így az **új** forgalom már nem jut el a leálló folyamathoz. A folyamatban lévő `/v1/responses` SSE-kapcsolatok leürítése legfeljebb a `SHUTDOWN_TIMEOUT_MS` időtartamáig (alapértelmezés szerint 30 másodpercig) történik a nehézsúlyú beléptetési bérleteken keresztül (#11015). A folyamathoz mégis eljutó új kérések `503` választ és `Retry-After: 5` fejlécet kapnak. A Recreate művelet üres végpontokkal járó időszaka a helyettesítő példány Ready állapotáig továbbra is teljes kiesést jelent — ez az SQLite-topológia következménye, nem a vizsgálatok hibás konfigurációja.

A külső Postgres / több írós HA **nem** dokumentált, szabványosan támogatott megoldás. Ha HA-ra van szüksége, tartson fenn egyetlen replikát, vagy futtasson a projekt által külön tesztelt és dokumentált topológiát. A Postgres/MySQL fejlesztés a [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) alatt követhető. Amíg ez nem készül el, a **nagy** `/v1/responses` kapacitás növelésének egyetlen támogatott módja N független folyamat használata (lásd a következő szakaszt), nem pedig a `replicas > 1` beállítás egyetlen köteten.

## Horizontális skálázás: N független folyamat

Egy Node-folyamat **egy V8-kupacot** jelent. Két, egymással átfedésben futó, ~3 MiB-os / ~750k tokenes kódolóügynök-`POST /v1/responses` kérés (RTK + Caveman) ~12 Gi értéknél megszakítja az adott kupacot (`FATAL ERROR: Reached heap limit`), és OOM-ot okozhat egy 16 Gi-s cgroupban. Lásd: [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ez a mérés **memóriakeretre** vonatkozó figyelmeztetés, nem pedig a termék két egyidejű hosszú `/v1/responses` kérésre vonatkozó rögzített felső korlátja. A nagy erőforrás-igényű csevegések fogadását egy automatikusan meghatározott bemeneti bájtkeret (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) szabályozza, amely ugyanazon V8-/cgroup-korlát alapján van méretezve — ennek felfelé történő felülbírálása (vagy a régi, kérésszám-alapú `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` korlát beállítása) egy már méretezett folyamatnál ismét előidézi a megszakítást. A kis csevegésekre, a `/healthz`, a `/v1/models` és az MCP végpontokra ez a korlát **nem** vonatkozik.

### Egy folyamat: kettőnél több hosszú `/v1/responses`

Egy **egészséges** folyamat (a kupac kihasználtsága az `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, alapértelmezés szerint `0.75` alatt van) **futtathat** kettőnél több egyidejű hosszú `POST /v1/responses` kérést, ha a teljes folyamatra vonatkozó, folyamatban lévő bájtkeretben (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) még van hely. Az `OMNIROUTE_CHAT_LARGE_BODY_BYTES` értékét elérő vagy meghaladó törzsek (alapértelmezés szerint 256 KiB) ugyanazt a nagy erőforrás-igényű bérletet veszik igénybe, mint a szerkezetileg összetett kérések, és ugyanazt a [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) szerinti `tryAcquireHealthyHeadroom` kiskaput (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) használják. Több tucat egyidejű hosszú SSE-kliens (az üzemeltetőknek gyakran 40–50-re van szükségük) támogatása **memóriakeret** kérdése — a kupacot, az elsődleges/tartalékkapacitási helyeket és az `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` értékét kell méretezni —, nem pedig egy rögzített, „legfeljebb 2” termékkorlát. Terhelt kupac esetén a rendszer továbbra is újrapróbálható `503` válaszokkal utasít el kéréseket, hogy a #7849 probléma ne térjen vissza.

A kupacok számának **megsokszorozásához** (független V8 old-space-ek) **jelenleg**:

| Tegye ezt                                                                                                                                                                                                                      | Ne tegye ezt                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Futtasson **N konténert/podot**, mindegyiket **saját** `DATA_DIR` könyvtárral / kötettel                                                                                                                                       | Ne állítson be `replicas > 1` értéket egyetlen SQLite-fájlhoz     |
| A nagy erőforrás-igényű, folyamatban lévő kérések és az egészséges tartalékkapacitás méretét a kupac / folyamatban lévő bájtok kerete alapján határozza meg; az 1–2 a #7849 konzervatív alapértéke, nem rögzített termékkorlát | Ne adjon egy folyamatnak 8× RAM-ot és korlátlan darabszámkorlátot |
| Opcionális: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` a **megosztott kvótaszámlálókhoz**                                                                                                                            | Ne kezelje a Redist megosztott SQLite-ként — nem az               |
| Másolja be a szolgáltatói titkokat minden példányba (vagy fogadja el a particionált irányítópultokat)                                                                                                                          | Ne számítson egyetlen közös irányítópultra / hívásnaplóra         |
| Helyezzen elé tetszőleges terheléselosztót; elegendő az API-kulcs vagy munkamenet szerinti munkamenet-rögzítés                                                                                                                 | Ne követeljen gyártóspecifikus, méretérzékeny middleware-t        |

Hardver: a példányonkénti egyidejű hosszú `/v1/responses` kérések száma **memóriakeret** kérdése (kupac + folyamatban lévő bájtok / #10110). Az `N` független `DATA_DIR` továbbra is megsokszorozza a kupacokat: a gazdagép RAM-jának `N × cgroup` erőforrásigényt kell fedeznie, nem pedig „egy 16 Gi-s podot N=8 értékkel”. Soha ne használjon `replicas > 1` értéket egyetlen SQLite-fájlhoz.

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

A folyamaton belüli sűrűséggel (a tömörítés HTTP-izolátumból való kiemelésével) a [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) foglalkozik. A megosztott, tartós állapoton működő egyetlen logikai fürttel a [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) foglalkozik.

## Fontos megjegyzések

- **SQLite WAL mód:** Hagyni kell, hogy a `docker stop` befejeződjön, így az OmniRoute ellenőrzőpont létrehozásával visszaírhatja a legújabb módosításokat a `storage.sqlite` fájlba. A mellékelt Compose-fájlok már 40 másodperces türelmi időt állítanak be a leállításhoz. Ha közvetlenül futtatja a lemezképet, tartsa meg a `--stop-timeout 40` beállítást.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Állítsa `true` értékre, ha a rendszeres/írás előtti biztonsági mentéseket külsőleg kezelik. A meglévő adatbázisok migrációjához továbbra is szükség van külön tartós biztonsági pillanatképre és tömeges migráció elleni védelemre.
- **Adatmegőrzés:** Mindig csatoljon kötetet a `/app/data` útvonalhoz, hogy az adatbázis, a kulcsok és a konfigurációk a konténer újraindításai között is megmaradjanak.
- **Portkonfiguráció:** Az alapértelmezett `20128` port módosításához írja felül a `PORT` környezeti változót.

## Lásd még

- [Virtuális gépes telepítési útmutató](../ops/VM_DEPLOYMENT_GUIDE.md) — Virtuális gép + nginx + Cloudflare beállítása
- [Fly.io telepítési útmutató](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Telepítés a Fly.io platformra
- [Környezeti konfiguráció](../reference/ENVIRONMENT.md) — Teljes `.env`-referencia
