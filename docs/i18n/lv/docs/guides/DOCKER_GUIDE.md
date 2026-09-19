# 🐳 Docker Guide — OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Pilnīga Docker izvietošanas rokasgrāmata. Lai ātri sāktu darbu, skatiet [README Docker sadaļu](../README.md#-docker).

## Satura rādītājs

- [Ātrā palaišana](#quick-run)
- [Ar vides failu](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Pieejamie profili](#available-profiles)
- [Resursdatora CLI rīku konfigurēšana, kad OmniRoute darbojas Docker vidē](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis blakusserviss](#redis-sidecar)
- [Produkcijas Compose](#production-compose)
- [Dockerfile posmi](#dockerfile-stages)
- [Kritiskie vides mainīgie](#critical-environment-variables)
- [Docker Compose ar Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ātrais tunelis](#cloudflare-quick-tunnel)
- [Attēlu tagi](#image-tags)
- [Pieejamība: noklusējuma SQLite atbalsta tikai vienu repliku](#availability-default-sqlite-is-single-replica)
- [Svarīgas piezīmes](#important-notes)

---

## Ātrā palaišana

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Ar vides failu

```bash
# Vispirms nokopējiet un rediģējiet .env
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
# Pamata profils (bez CLI rīkiem)
docker compose --profile base up -d

# CLI profils (iebūvēti Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Resursdatora profils (galvenokārt Linux; resursdatora CLI binārie faili tiek montēti tikai lasīšanas režīmā)
docker compose --profile host up -d

# CLI un CLIProxyAPI blakusservisa apvienošana
docker compose --profile cli --profile cliproxyapi up -d
```

## Pieejamie profili

OmniRoute piedāvā četrus Compose profilus. Izvēlieties savai videi atbilstošo.

| Profils              | Pakalpojums      | Kad izmantot                                                                                                                                                  | Komanda                                      |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (noklusējuma) | `omniroute-base` | Serveris bez grafiskās saskarnes / minimāla izpildvide bez iekļautiem nodrošinātāju CLI                                                                       | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Aģentu darbplūsmas, kas izsauc `omniroute providers/setup/doctor`, un iekļautie CLI (Codex, Claude Code, Droid, OpenClaw)                                     | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Linux resursdatori, kuri vēlas `network_mode` līdzīgu piekļuvi resursdatora CLI, montējot `~/.local/bin`, `~/.codex`, `~/.claude` u.c. tikai lasīšanas režīmā | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Palaidiet [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) blakusservisu portā `8317`, lai starpniekotu CLI pieprasījumus augšupstraumes sistēmām  | `docker compose --profile cliproxyapi up -d` |

> Var apvienot vairākus profilus: `docker compose --profile cli --profile cliproxyapi up -d`.

## Resursdatora CLI rīku konfigurēšana, kad OmniRoute darbojas Docker vidē

`omniroute setup-codex`, `setup-claude`, `config set <tool>` un informācijas paneļa poga
**Saglabāt konfigurāciju** raksta tādus failus kā `~/.codex/*.config.toml`. Šiem ceļiem
ir nozīme tikai tajā datorā, kurā faktiski darbojas CLI. Palaižot šīs komandas
konteinerā, ieraksts nonāk paša konteinera mājas direktorijā (`/home/node` —
attēls darbojas ar `USER node`), kuru neviens resursdatora CLI nekad nelasīs un
kura tiek atmesta, tiklīdz konteiners tiek izveidots no jauna.

OmniRoute to nosaka un atsakās veikt ierakstu, tā vietā sniedzot norādījumus,
nevis ziņojot par panākumu, kuru nevar izmantot: CLI beidz darbu ar kodu `2`,
bet API atbild ar `422` un `containerEphemeralTarget: true`.

### Ieteicams: palaidiet CLI resursdatorā, bet OmniRoute — Docker vidē

Konteiners nodrošina API; CLI konfigurē jūsu resursdatora rīkus.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # norādiet CLI izmantot konteineru
omniroute setup-codex                      # ieraksta īstajā ~/.codex jūsu resursdatorā
```

Šī ir pareizā izvēle, ja Codex, Claude Code, Cursor vai līdzīgi rīki darbojas
jūsu klēpjdatorā — un tas ir ierastais uzstādījums.

### Alternatīva: piesaistiet resursdatora konfigurācijas direktorijus (`host` profils)

Ja vēlaties, lai pats konteiners rakstītu jūsu resursdatora konfigurācijā,
piesaistiet direktorijus un iestatiet `CLI_CONFIG_HOME` uz montējuma saknes
direktoriju. `host` profils to jau nodrošina:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Piesaistes montējums padara ceļu uzticamu: OmniRoute nolasa
`/proc/self/mountinfo` un atļauj rakstīt montētajos ceļos (kā arī direktorijos,
kuru apakšdirektoriji ir montējumi — tieši tāda ir iepriekš parādītā
`/host-home` struktūra), vienlaikus joprojām atsakot rakstīšanu nemontētos
ceļos.

### Apiešanas iespēja: konfigurējiet paša konteinera CLI (izmantojiet piesardzīgi)

Ja CLI patiešām atrodas konteinerā (`cli` profils), rakstīšana ir apzināta.
Nododiet `--allow-container-write` jebkurai `setup-*` komandai vai serverim
iestatiet `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Rakstīšana tiks
veikta, parādot brīdinājumu, ka izmaiņas netiks saglabātas pēc konteinera
darbības beigām.

> **Drošības brīdinājums — `cli` profils un `docker.sock` montējums.**
> `cli` profils piesaista `/var/run/docker.sock`, lai konteinerā esošais
> automātiskais atjauninātājs varētu atkārtoti izveidot steku, izmantojot
> resursdatora dēmonu (`src/lib/system/autoUpdate.ts` pārbauda šīs ligzdas
> esamību un izlaiž Docker ceļu, ja tās nav). Šī ligzda ir **resursdatora
> root uzticamības robeža**: viss, kas var tai piekļūt, pārvalda resursdatora
> Docker dēmonu kā root — tas var izveidot, pārbaudīt, apturēt un noņemt
> jebkuru resursdatora konteineru. Sekas:
>
> 1. **Nekad nepadariet `cli` profila portu pieejamu tīklā.** Publicējiet
>    to adresē `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — lokālajā tīklā sasniedzams `cli` profils pārvērš jebkuru informācijas
>    paneļa līmeņa RCE par pilnīgu resursdatora kompromitēšanu.
> 2. **Nepiesaistiet `cli` profilam nekādus papildu resursdatora direktorijus.**
>    Docker ligzda kopā ar jebkuru papildu montējumu piešķir konteineram pilnas
>    lasīšanas un rakstīšanas tiesības jūsu failu sistēmā un resursdatora
>    konfigurācijā. Ja rīkam nepieciešama piekļuve projektam, palaidiet to
>    lokāli ar CLI bināro failu — nemontējiet projektu `cli` konteinerā.
>
> Ja automātiskā atjaunināšana konteinerā nav nepieciešama, neieslēdziet
> `cli` profilu (`COMPOSE_PROFILES=core,redis` vai īsāku variantu). Pārējie
> profili nemontē Docker ligzdu.
>
> Saistīto MITM apdraudējumu modeli skatiet failā
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; netiek kompilēts direktorijā
> `/docs`), bet `codex`/`claude-code`/`droid`/`openclaw` bināro failu
> izcelsmes ķēdi — failā `docs/security/SUPPLY_CHAIN.md`.

## Redis blakus konteiners

OmniRoute izmanto Redis, lai nodrošinātu izkliedētā pieprasījumu biežuma ierobežotāja un koplietotās kešatmiņas darbību. Pakalpojums `redis` ir **vienmēr definēts** failā `docker-compose.yml` (tam nav profila ierobežojuma), un tas tiek palaists kopā ar jebkuru citu profilu.

| Informācija                             | Vērtība                                        |
| --------------------------------------- | ---------------------------------------------- |
| Attēls                                  | `redis:7-alpine`                               |
| Konteinera nosaukums                    | `omniroute-redis`                              |
| Iekšējais ports                         | `6379`                                         |
| Resursdatora ports (maiņa)              | `REDIS_PORT` (noklusējums ir `6379`)           |
| Resursdatora saistīšanas adrese (maiņa) | `REDIS_BIND_HOST` (noklusējums ir `127.0.0.1`) |
| Sējums                                  | `omniroute-redis-data` → `/data`               |
| Veselības pārbaude                      | `redis-cli ping` (10 s intervāls)              |

Saistītie vides mainīgie:

- `REDIS_URL` — lietotnē ievadītā savienojuma virkne (pēc noklusējuma `redis://redis:6379`).
- `REDIS_PORT` — resursdatora puses porta kartējums Redis konteineram.
- `REDIS_BIND_HOST` — resursdatora saskarne, kurā ports tiek publicēts. Noklusējums ir `127.0.0.1`.

> **Kāpēc pēc noklusējuma tiek izmantota atgriezeniskās cilpas adrese:** blakus konteiners darbojas bez `requirepass`, un lietotnes
> konteineri tam piekļūst, izmantojot Compose tīklu (`redis:6379`) — publicētais ports ir
> paredzēts tikai resursdatora puses rīkiem (`redis-cli`, lokālai `npm run dev` izpildei). Publicēšana adresē
> `0.0.0.0` padarītu Redis bez autentifikācijas pieejamu visiem resursdatoriem jūsu lokālajā tīklā. Ja iestatāt
> `REDIS_BIND_HOST=0.0.0.0`, pievienojiet pakalpojuma `command:` arī `--requirepass`.

**Redis atspējošana** nav ieteicama (pieprasījumu biežuma ierobežotājs pārslēgsies uz ierobežotāku rezerves variantu atmiņā). Ja tas tomēr ir nepieciešams, noņemiet vai aizkomentējiet pakalpojuma `redis:` bloku failā `docker-compose.yml`, vai mērogojiet to līdz nullei:

```bash
docker compose up -d --scale redis=0
```

## Produkcijas Compose

Lai paralēli izstrādes videi palaistu izolētu produkcijas momentuzņēmumu, izmantojiet `docker-compose.prod.yml`.

| Informācija                           | Vērtība                                                                                               |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Fails                                 | `docker-compose.prod.yml`                                                                             |
| Noklusējuma informācijas paneļa ports | `PROD_DASHBOARD_PORT=20130` (kartēts uz iekšējo `${DASHBOARD_PORT:-20128}`)                           |
| Noklusējuma API ports                 | `PROD_API_PORT=20131`                                                                                 |
| Attēls                                | `omniroute:prod` (būvēts no `runner-cli` mērķa)                                                       |
| Redis konteiners                      | `omniroute-redis-prod` (`redis:8.6.2`, atsevišķs `redis-prod-data` sējums)                            |
| Datu sējums                           | `omniroute-prod-data` (nosaukts, tiek saglabāts starp atkārtotām būvēšanām)                           |
| Veselības pārbaudes                   | `node healthcheck.mjs` + `redis-cli ping`, ar `depends_on`, kas piesaistīts Redis veselības stāvoklim |

Lietošana:

```bash
# Izveidot un palaist produkcijas steku
docker compose -f docker-compose.prod.yml up -d --build

# Straumēt žurnālus
docker compose -f docker-compose.prod.yml logs -f

# Apturēt un noņemt steku (saglabāt sējumus)
docker compose -f docker-compose.prod.yml down
```

Produkcijas steks darbojas paralēli izstrādes Compose videi (atšķirīgi konteineru nosaukumi, porti un sējumi), tāpēc varat turpināt lokālo izstrādi, kamēr produkcijas vide paliek aktīva.

## Dockerfile posmi

Repozitorijā ir iekļauts vairākposmu Dockerfile (`Dockerfile`). Ir pieejami trīs posmi; izvēlieties savam lietošanas gadījumam atbilstošo `target`.

| Posms         | Bāzes attēls          | Nolūks                                                                                                                                                                   |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Instalē atkarības (`npm ci --legacy-peer-deps`) un izpilda `npm run build` (pēc noklusējuma Turbopack — skatiet tālāk sadaļu par būvēšanas laika resursiem)              |
| `runner-base` | `node:26-trixie-slim` | Produkcijas izpildlaika vide ar Next.js savrupo izvadi. **Pakalpojumu sniedzēju CLI nav iekļauti.**                                                                      |
| `runner-cli`  | `runner-base`         | Pievieno `git`, `docker.io`, `docker-compose` un globālos CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Izvēlieties šo aģentu darbplūsmām.** |

Manuāli būvējiet konkrētu mērķi:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Būvēšanas laika resursi

Trīs būvēšanas argumenti nosaka `builder` posma resursu patēriņu. Tie attiecas tikai uz būvēšanas laiku —
`OMNIROUTE_MEMORY_MB` (tālāk) ir atsevišķs izpildlaika iestatījums.

| Būvēšanas arguments         | Noklusējums | Ietekme                                                                             |
| --------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`         | Ar `0` būvē, izmantojot webpack. Mazāks maksimālais atmiņas patēriņš, bet lēnāk.    |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | V8 kaudzes ierobežojums (`--max-old-space-size`) palaistajam `next build`.          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Iestata `CIRCLE_NODE_TOTAL`; Next lapu datu apkopošanai atvasina `workers = N - 1`. |

`OMNIROUTE_BUILD_WORKERS` ir parametrs, kas jāpalielina jaudīgā būvēšanas vidē un
par kuru jādomā vispirms, ja ierobežotu resursu būvējums pārtrauc darbu **pēc**
`✓ Compiled successfully`. Katrs lapu datu darbinieks ir atsevišķs process, un
arī pats vecākprocess `next build` ir atsevišķs process; reprodukcijā reālā VPS
(problēma #7518) katra procesa maksimālais RSS tika izmērīts aptuveni 4,5 GB
neatkarīgi no `NODE_OPTIONS` kaudzes karodziņa (Turbopack kompilēšanai tiek
izmantota vietējā/Rust atmiņa ārpus V8 kaudzes). Noklusējuma vērtība `2` (→ 1
darbinieks, kopā 2 procesi) ir paredzēta 16 GB / 4 vCPU GitHub mitinātajiem
izpildītājiem, kurus izmanto publicēšanas konveijers. Ar vērtību `8` (→ 7
darbinieki) šim izpildītājam pietrūka atmiņas, un buildkit pārtrauca darbību ar
`ResourceExhausted: ... cannot allocate memory`; arī `3` (→ 2 darbinieki)
neietilpa pieejamajā atmiņā, kad katra procesa RSS tika izmērīts tieši, nevis
secināts netieši. `tests/unit/docker-build-memory-budget.test.ts` veic aprēķinus,
izmantojot izmērīto vērtību, un neizdodas, ja kāds no šiem parametriem pārsniedz
izpildītāja iespējas.

Turbopack kompilēšanai izmanto vietējo Rust atmiņu, kas atrodas **ārpus** V8
kaudzes, tāpēc `OMNIROUTE_BUILD_MEMORY_MB` to neierobežo. Resursdatorā ar atmiņas
ierobežojumu OOM pārvaldnieks tad pārtrauc būvējumu ar SIGKILL, neizvadot nekādu
kļūdas tekstu — tas vienkārši apstājas procesa `Creating an optimized production
build` vidū, tādēļ tas vairāk izskatās pēc iestrēgšanas, nevis atmiņas trūkuma.
Ja būvēšanas resursdators ir ierobežots, mainiet komplektētāju:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` ir iespējots, tāpēc `next build` palaiž vecākprocesu **un**
darbinieka procesu, un katrs no tiem atsevišķi ievēro
`OMNIROUTE_BUILD_MEMORY_MB`. Iestatiet konteinera ierobežojumu aptuveni divreiz
lielāku par šo vērtību, nevis vienreiz lielāku.

Mērījumi šajā kokā (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Komplektētājs | Konteinera ierobežojums | Rezultāts                                   |
| ------------- | ----------------------- | ------------------------------------------- |
| Turbopack     | 8 GiB / 16 GiB          | OOM pārtrauca abos gadījumos bez paziņojuma |
| webpack       | 8 GiB                   | darbinieka process pārtraukts ar SIGKILL    |
| webpack       | 12 GiB                  | sekmīgi, maksimums 11,1 GiB                 |

### Izpildlaika noklusējuma iestatījumi

`runner-base` eksportētās noklusējuma vērtības: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Atmiņas darbība Docker vidē:

- Attēls iestata `OMNIROUTE_MEMORY_MB=1024` un no tā atvasina `NODE_OPTIONS=--max-old-space-size=1024`.
- Faktisko servera procesu palaiž savrupais palaidējs, kas nolasa `OMNIROUTE_MEMORY_MB` un pievieno `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node izmanto pēdējo atkārtoto `--max-old-space-size` vērtību, tāpēc `OMNIROUTE_MEMORY_MB` iestatīšana kontrolē faktisko Docker kaudzes ierobežojumu.
- Tā kā attēls to vienmēr iestata, palaidēja paša RAM kalibrētā atkāpšanās vērtība Docker vidē nekad netiek izmantota. Palieliniet to tieši atbilstoši darba slodzei (skatiet tabulu tālāk). `2048` joprojām ir par maz programmēšanas aģentu `/v1/responses` pieprasījumiem.

### Izpildlaika RAM programmēšanas aģentiem

Docker noklusējuma 1 GiB ir minimums informācijas panelim un vieglai tērzēšanai, nevis produkcijas videi piemērots apjoms. Gari `POST /v1/responses` pieprasījumu ķermeņi (simtiem ziņojumu, desmitiem rīku) saspiešanas laikā atmiņā saglabā vairākus grafus. Divi vienlaicīgi aptuveni 3 MiB / aptuveni 750k marķieru pieprasījumi ir pārtraukuši V8 darbu pie **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) un arī sasnieguši 16 GiB cgroup OOM ierobežojumu. Skatiet [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Iestatiet **cgroup `--memory` lielāku par kaudzes apjomu** — vietējie buferi, SQLite un saspiešanas starprezultāti atrodas ārpus V8.

| Darba slodze                                    | `OMNIROUTE_MEMORY_MB`       | Konteiners / cgroup          | Piezīmes                                                                                                                         |
| ----------------------------------------------- | --------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Informācijas panelis, viena viegla tērzēšana    | `1024` (attēla noklusējums) | ≥2 GiB                       |                                                                                                                                  |
| Viens programmēšanas aģents (Claude/Codex/Grok) | `8192`                      | ≥10 GiB                      | Tipiska vienas sesijas `/v1/responses`                                                                                           |
| Divi vienlaicīgi ilgstoši `/v1/responses`       | `10240`–`12288`             | ≥12–16 GiB                   | Novērota V8 avārijas apturēšana pie ~12 GiB kaudzes                                                                              |
| Trīs vai vairāk vienlaicīgu garu kontekstu      | neizmantot vienā procesā    | izpildīt secīgi / vairāk RAM | Pēc noklusējuma vienlaikus tiek pieļauts 1 resursietilpīgs izsaukums; limita palielināšana bez papildu RAM atkal izraisa avāriju |

`omniroute serve`, darbojoties tieši uz servera, kalibrē ~35% RAM (ierobežojot diapazonā `[512, 4096]`), ja `OMNIROUTE_MEMORY_MB` **nav iestatīts**. Docker vienmēr iestata `1024`, tādēļ oficiālajā attēlā šī kalibrēšana nekad netiek veikta.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiskie vides mainīgie

Papildus [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumentētajām noklusējuma vērtībām, darbinot sistēmu Docker vidē, vissvarīgākie ir tālāk norādītie mainīgie:

| Mainīgais                     | Mērķis                                                                                                                                                                                                                                                                                                                     | Noklusējuma vērtība            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket tilta koplietotais noslēpums. **Obligāts produkcijas vidē** — iestatiet to kā spēcīgu nejaušu virkni.                                                                                                                                                                                                            | nav iestatīts (jānorāda)       |
| `REDIS_URL`                   | Savienojuma virkne ātruma ierobežotāja / kešatmiņas aizmugursistēmai                                                                                                                                                                                                                                                       | `redis://redis:6379`           |
| `REDIS_PORT`                  | Resursdatora puses ports komplektā iekļautajam Redis konteineram                                                                                                                                                                                                                                                           | `6379`                         |
| `REDIS_BIND_HOST`             | Resursdatora saskarne, kurā tiek publicēts komplektā iekļautā Redis ports (atgriezeniskās cilpas saskarne, ja vien nepievienojat AUTH)                                                                                                                                                                                     | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Resursdatora ceļš, kas pašatjaunināšanas darbplūsmām tiek montēts `cli` profilā kā `/workspace/omniroute`                                                                                                                                                                                                                  | `.` (pašreizējais direktorijs) |
| `OMNIROUTE_MEMORY_MB`         | Node izpildlaika kaudzes maksimālais apjoms Docker autonomajam serverim; pārraksta iepriekš norādīto attēla noklusējuma vērtību. Kodēšanas aģentiem: `8192`+ (skatiet [izpildlaika RAM](#runtime-ram-for-coding-agents)).                                                                                                  | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Pārraksta publicētos portus informācijas panelim (20128) un API (20129)                                                                                                                                                                                                                                                    | `20128` / `20129`              |
| `APP_BIND_HOST`               | Resursdatora saskarne, kurā docker-compose publicē informācijas paneļa/API/tiešsaistes WS portus. Ja `REQUIRE_API_KEY=false` (noklusējums), `0.0.0.0` padara anonīmo `/v1` starpniekserveri pieejamu lokālajā tīklā — paplašiniet piekļuvi tikai ar `REQUIRE_API_KEY=true` vai priekšā izvietotu reverso starpniekserveri. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Resursdatora saskarne, kurā docker-compose publicē `cliproxyapi` blakusprocesa konteineru — tā datu sējumā tiek glabāti pakalpojumu sniedzēju akreditācijas dati.                                                                                                                                                          | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Direktorijs, kuru izpildlaika spraudņu skeneris nolasa un kurā tas instalē spraudņus. Iestatiet to, ja spraudņi ir montēti ar saistījuma montējumu: noklusējuma vērtība seko `HOME`, ko attēlam nav obligāti jāeksportē.                                                                                                   | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | URL apakšceļš, ja lietotne tiek publicēta aiz reversā starpniekservera (piem., `/omniroute`)                                                                                                                                                                                                                               | _(tukšs = sakne)_              |
| `NEXT_PUBLIC_BASE_URL`        | Publiskā pārlūkprogrammas izcelsme, ietverot apakšceļu (piem., `https://host/omniroute`)                                                                                                                                                                                                                                   | nav iestatīts                  |
| `PROD_DASHBOARD_PORT`         | Resursdatora puses informācijas paneļa ports failam `docker-compose.prod.yml`                                                                                                                                                                                                                                              | `20130`                        |
| `CLIPROXYAPI_PORT`            | Resursdatora puses ports `cliproxyapi` blakusprocesa konteineram                                                                                                                                                                                                                                                           | `8317`                         |

## Reversais starpniekserveris apakšceļā (Traefik / nginx)

Next.js `basePath` tiek kompilēts savrupajā pakotnē. OmniRoute saglabā kompilēto
vērtību kontrollīdzekļa failā lietotnes saknē (tas tiek ierakstīts `npm run build` laikā; to nolasa
`scripts/docker/ensure-docker-base-path.mjs`) un konteinera palaišanas laikā salīdzina to ar
`OMNIROUTE_BASE_PATH`. Ja vērtības atšķiras un attēls tika
izveidots domēna saknei, ieejas punkts pārraksta savrupās pakotnes manifestus,
iegultās `basePath`/`assetPrefix` literāļu vērtības (Next 16 atveido SSR resursu URL,
izmantojot tikai `assetPrefix`, tādēļ labošanas rīks tajā atspoguļo apakšceļu), kompilētos
`/_next/static` resursu URL (klienta atsauču manifestus, multivides importus, iepriekš atveidotās
kļūdu lapas) un klienta `process.env` aizstājēju, pirms tiek palaists
`node dev/run-standalone.mjs`.

### Izveide ar Compose (ieteicams)

Iestatiet abus mainīgos failā `.env` un pēc tam izveidojiet attēlu no jauna, lai attēla un izpildlaika
iestatījumi sakristu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` nodod `OMNIROUTE_BASE_PATH` gan kā Docker izveides argumentu, gan kā
izpildlaika vides mainīgo.

### Iepriekš izveidots saknes attēls + izpildlaika apakšceļš

Publicētie `diegosouzapw/omniroute:*` attēli ir izveidoti domēna saknei. Joprojām varat
iestatīt `OMNIROUTE_BASE_PATH` izpildlaikā; konteiners palaišanas laikā vienreiz izlabo pakotni.
Izmantojiet to kopā ar atbilstošo publisko izcelsmes adresi:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurējiet reverso starpniekserveri tā, lai tas pārsūtītu **pilnu** ārējo ceļu (nenoņemiet
prefiksu). Traefik ir jāmaršrutē `PathPrefix(`/omniroute`)` uz konteineru bez
`StripPrefix`, lai Next.js saņemtu `/omniroute/...` un apkalpotu resursus no
`/omniroute/_next/...`.

Docker darbspējas pārbaude pārbauda vieglo `/healthz` dzīves cikla galapunktu, kuram
pievienots aktīvais `OMNIROUTE_BASE_PATH` prefikss. `/api/monitoring/health` joprojām ir pieejams
manuālai un informācijas paneļa diagnostikai; lai konteinera HEALTHCHECK atkal novirzītu uz to (piemēram,
padziļinātai darbspējas kontrolei), iestatiet `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Šis ceļš veic **padziļinātu** pārbaudi (DB + pārraudzības kopsavilkums) — tā ir piemērota Docker
retajām `HEALTHCHECK` pārbaudēm, ja izvēlaties to atkal iespējot, bet **nav** piemērota Kubernetes `livenessProbe`
intervāliem.

Orķestratoriem (Kubernetes, Nomad u.c.):

| Pārbaude            | Ieteicams                                                                   | Nav ieteicams                                                   |
| ------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Dzīvotspēja         | HTTP `GET /livez` vai TCP galvenajā portā (`PORT`, pēc noklusējuma `20128`) | Izmantot `/api/monitoring/health` dzīvotspējas pārbaudei        |
| Gatavība            | HTTP `GET /healthz`                                                         | Īsi taimauti, kas noslogotu notikumu ciklu uzskata par neaktīvu |
| Padziļināta / ārēja | `/api/monitoring/health`                                                    | —                                                               |

`/healthz` ziņo par procesa dzīves ciklu (`ok` / `starting` / `stopping`). `/livez` pārbauda
tikai to, vai process darbojas (200 vienmēr, kad apdarinātāju var izpildīt; tas negaida
gatavību). Abi joprojām darbojas tajā pašā Node notikumu ciklā, kurā tiek apstrādāti pieprasījumi, tādēļ
procesora noslogota kataloga vai saspiešanas apstrāde var tos aizkavēt — aizņemts ≠ neaktīvs. Ja HTTP
pārbaudēm iestājas taimauts, dzīvotspējas pārbaudei dodiet priekšroku TCP. Pilnīgi norādījumi par pārbaudēm:
[Pārraudzības ceļvedis — ieteikumi Kubernetes pārbaudēm](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose ar Caddy (HTTPS Auto-TLS)

OmniRoute var droši publiskot, izmantojot Caddy automātisko SSL nodrošināšanu. Pārliecinieties, ka jūsu domēna DNS A ieraksts norāda uz jūsu servera IP adresi.

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
      # Pārlūkprogrammai paredzētā izcelsme OAuth atzvaniem, informācijas paneļa saitēm un ģenerētajiem publiskajiem URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Iekšējais starpserveru URL ieplānotajiem uzdevumiem / pašpieprasījumiem.
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

Caddy iestata standarta pārsūtīšanas galvenes augšupstraumes konteineram. OmniRoute izmanto
`NEXT_PUBLIC_BASE_URL` kā kanonisko publisko izcelsmi OAuth atzvaniem un ģenerētajām publiskajām
saitēm; autentificēti informācijas paneļa rakstīšanas pieprasījumi izmanto vienas izcelsmes pieprasījumus kopā ar sesijai piesaistītu CSRF
aizsardzību. Iespējojiet `OMNIROUTE_TRUST_PROXY` tikai sarežģītās izvietošanas konfigurācijās, kurās apzināti
vēlaties, lai OmniRoute iegūtu publisko izcelsmi no uzticamām pārsūtītajām galvenēm, nevis no tiešas
konfigurācijas.

## Cloudflare ātrais tunelis

Informācijas paneļa atbalsts Docker izvietojumiem ietver ar vienu klikšķi aktivizējamu **Cloudflare ātro tuneli** sadaļā `Dashboard → Endpoints`. Pirmajā iespējošanas reizē `cloudflared` tiek lejupielādēts tikai tad, kad tas ir nepieciešams, tiek palaists pagaidu tunelis uz jūsu pašreizējo `/v1` galapunktu, un ģenerētais `https://*.trycloudflare.com/v1` URL tiek parādīts tieši zem jūsu parastā publiskā URL.

Galapunktu tuneļu paneļus (Cloudflare, Tailscale, ngrok) var parādīt vai paslēpt sadaļā `Settings → Appearance`, nemainot aktīvā tuneļa stāvokli.

### Piezīmes par tuneli

- Ātro tuneļu URL ir pagaidu adreses, un tās mainās pēc katras restartēšanas.
- Ātrie tuneļi netiek automātiski atjaunoti pēc OmniRoute vai konteinera restartēšanas. Vajadzības gadījumā iespējojiet tos atkārtoti informācijas panelī.
- Pārvaldītā instalēšana pašlaik atbalsta Linux, macOS un Windows platformās `x64` / `arm64`.
- Pārvaldītie ātrie tuneļi pēc noklusējuma izmanto HTTP/2 transportu, lai ierobežotās konteineru vidēs izvairītos no traucējošiem QUIC UDP bufera brīdinājumiem. Iestatiet `CLOUDFLARED_PROTOCOL=quic` vai `auto`, ja vēlaties izmantot citu transportu.
- Docker attēlos ir iekļauti sistēmas CA saknes sertifikāti, kas tiek nodoti pārvaldītajam `cloudflared`, tādējādi novēršot TLS uzticamības kļūmes, kad tunelis tiek inicializēts konteinerā.
- Iestatiet `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, ja vēlaties, lai OmniRoute izmantotu jau esošu bināro failu, nevis to lejupielādētu.

## Attēlu tagi

| Attēls                   | Tags     | Izmērs | Apraksts                                                         |
| ------------------------ | -------- | ------ | ---------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Augstākā **publicētā** stabilā SemVer versija (nevis git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Piesaistiet šo tagu klasi izmantošanai ar GitOps                 |

Vairākplatformu manifests: vietējie `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automātiski atlasa atbilstošo arhitektūru; norādiet `--platform linux/amd64`, ja ARM resursdatoros nepieciešams piespiedu kārtā izmantot AMD64 emulāciju.

### Laidienu kanāli

OmniRoute publicē atsevišķus Docker kanālus stabiliem laidieniem, aktīvā laidiena zara testēšanai un izstrādes būvējumiem.

| Kanāls                          | Avots                                         | Mainīgums                      | Ieteicamais lietojums                                                                                                        |
| ------------------------------- | --------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Parakstīts/versijots laidiens                 | Nemainīgs                      | Produkcijas izvietojumi, kuros piesaistīts precīzs laidiens                                                                  |
| `:latest` / `:latest-web`       | Augstākā **publicētā** stabilā SemVer versija | Mainīgs stabilais rādītājs     | Seko stabilajiem laidieniem **pēc** SemVer publicēšanas uzdevuma — **neseko** `main` vai nepublicētiem `release/v*` komitiem |
| `:next` / `:next-web`           | Pašreizējais noklusējuma `release/v*` zars    | Mainīgs pirmslaidiena rādītājs | Labojumu testēšana, kuri ir nonākuši aktīvajā laidiena zarā, bet vēl nav iekļauti stabilā laidienā                           |
| `:main` / `:main-web`           | `main` zars                                   | Mainīgs izstrādes rādītājs     | Tikai izstrādei un integrācijas testēšanai                                                                                   |

#### Pirmslaidiena kanāla izmantošana

Kanāls `next` tiek pārbūvēts pēc katras izmaiņu nosūtīšanas uz pašreizējo noklusējuma `release/v*` zaru un tiek publicēts gan AMD64, gan ARM64 arhitektūrai. Vecāki uzturēšanas zari nevar to pārrakstīt. Kanāls nodrošina lejupielādējamu attēlu ar labojumiem, kas pirms nākamā stabilā taga izveides ir sapludināti aktīvajā laidiena zarā.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Izmantojot Docker Compose, pārrakstiet atlasītā profila izmantoto attēla tagu, pēc tam lejupielādējiet attēlu un izveidojiet pakalpojumu no jauna:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Drošība un atgriešana

`next` ir mainīgs pirmslaidiena kanāls. Tas var mainīties pēc jebkuras izmaiņu nosūtīšanas uz aktīvo laidiena zaru un **netiek atbalstīts izmantošanai produkcijā**. Konkrēta būvējuma novērtēšanas laikā piesaistiet attēla kontrolsummu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pirms testēšanas dublējiet OmniRoute datu sējumu vai piesaistīto datu direktoriju. Lai atgrieztos pie iepriekšējās versijas, atjaunojiet iepriekš izmantoto stabilo versiju vai tvērumu un izveidojiet konteineru no jauna:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Laidiena zara būvējums nekad nevar pārvietot `latest`; stabilo rādītāju drīkst virzīt tikai atbilstoša stabila semantiskā versija. `next` attēliem tiek saglabāta laidiena attēla pārbaude un bloķējošā KRITISKO ievainojamību pārbaude.

**`latest` negarantē atbilstību git pašreizējam stāvoklim.** Zarā `main` vai aktīvajā `release/v*` zarā sapludinātie labojumi **nav** pieejami `:latest`, kamēr nav publicēts stabils SemVer attēls un publicēšanas uzdevums nav virzījis `:latest` (tas pats tvērums kā attiecīgajai SemVer versijai). Ja šķiet, ka `latest` ir iesaldēts, lai gan GitHub jau ir redzams labojums, izmantojiet `:next`, lai testētu laidiena zaru, vai gaidiet SemVer tagu.

| Jūsu mērķis                                                                            | Izmantojiet                             |
| -------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps/ražošanas vide, kas nedrīkst patvaļīgi mainīties                                | Fiksējiet `:X.Y.Z` (vai attēla tvērumu) |
| Sekot publicētajām stabilajām versijām un pēc katra laidiena pieņemt atkārtotu izveidi | `:latest`                               |
| Testēt nepublicētus `release/v*` komitus                                               | `:next` (ne ražošanas videi)            |
| Testēt `main`                                                                          | `:main` (ne ražošanas videi)            |

## Pieejamība: noklusējuma SQLite darbojas ar vienu repliku

Standarta Docker / Kubernetes OmniRoute ir **viens Node process + viens SQLite rakstītājs**. Šādā topoloģijā augsta pieejamība **netiek atbalstīta**.

| Ierobežojums                                              | Sekas                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Viens rakstītājs                                          | **Nedarbiniet** vairākas replikas ar vienu un to pašu SQLite failu. Tas sabojā datubāzi.                                                                                                                                                                                                                                                                                                        |
| Atkārtota izveide / restartēšana / HEALTHCHECK apturēšana | **Pilnīgs darbības pārtraukums**, kas ietekmē aktīvos SSE savienojumus, informācijas paneļa sesijas un atmiņā glabāto stāvokli. Visi savienotie klienti tiek atvienoti. Jauni pieprasījumi laikā, kad nav neviena galapunkta, no reversā starpniekservera saņem **`502 Bad Gateway: Unknown error`**, nevis OmniRoute JSON — klienti to nevar atšķirt no pakalpojumu sniedzēja kļūmes (#11015). |
| Tā pati notikumu cilpa, ko izmanto `/healthz`             | Noslogota kataloga vai saspiešanas cikla izpilde var aizkavēt pārbaudes; īss taimauts pēc tam restartē **vienīgo** repliku.                                                                                                                                                                                                                                                                     |

**Pārbaužu matrica** (skatiet arī [Kubernetes pārbaužu ieteikumus](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Pārbaude                | Mērķis                                                                       | Neizmantojiet                                                         |
| ----------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Dzīvīguma               | TCP portā `PORT` (noklusējums `20128`) vai saudzīga HTTP `/healthz` pārbaude | `/api/monitoring/health`                                              |
| Gatavības               | HTTP `GET /healthz`                                                          | Īsus taimautus, kas noslogotu notikumu cilpu uzskata par nestrādājošu |
| Padziļināta / cilvēkiem | `/api/monitoring/health`                                                     | Automatizētai kubelet dzīvīguma pārbaudei                             |

**Jaunināšana:** rēķinieties, ka katra sesija tiks pārtraukta. Ja iespējams, pakāpeniski atvienojiet klientus; ar noklusējuma SQLite nav iespējama pakāpeniska atjaunināšana. Compose `restart: unless-stopped` kopā ar Docker `HEALTHCHECK` arī aizstās vienīgo procesu, kad konteinera statuss būs Unhealthy — ar tādu pašu ietekmes apmēru.

Kubernetes fragments **vienai replikai** (Recreate ir obligāts; nepalieliniet `replicas`, ja tiek izmantots viens SQLite fails):

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

`preStop` aizture ļauj kube noņemt Service galapunktus pirms SIGTERM, lai **jauna** datplūsma vairs netiktu novirzīta uz procesu, kura darbība tiek pārtraukta. Aktīvie `/v1/responses` SSE savienojumi tiek apkalpoti līdz `SHUTDOWN_TIMEOUT_MS` robežai (pēc noklusējuma 30 s), izmantojot smagsvara uzņemšanas nomas (#11015). Jauni pieprasījumi, kas tomēr sasniedz procesu, saņem `503` + `Retry-After: 5`. Recreate izraisītais periods bez galapunktiem līdz aizstājējinstances statusam Ready joprojām nozīmē pilnīgu darbības pārtraukumu — tā ir SQLite topoloģijas īpašība, nevis nepareiza pārbaužu konfigurācija.

Ārējs Postgres / vairāku rakstītāju HA **nav** dokumentēts standarta risinājums. Ja jums nepieciešama HA, saglabājiet vienu repliku vai izmantojiet topoloģiju, kuru projekts ir atsevišķi pārbaudījis un dokumentējis. Darbs pie Postgres/MySQL tiek veikts [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Līdz šīs funkcionalitātes izlaišanai vienīgais atbalstītais veids, kā palielināt **lielu** `/v1/responses` pieprasījumu apstrādes jaudu, ir N neatkarīgi procesi (nākamā sadaļa), nevis `replicas > 1` vienā sējumā.

## Horizontālā mērogošana: N neatkarīgi procesi

Viens Node process ir **viena V8 kaudze**. Divi pārklājošies ~3 MiB / ~750k marķieru kodēšanas aģenta `POST /v1/responses` pieprasījumi (RTK + Caveman) pārtrauc šīs kaudzes darbību pie ~12 Gi (`FATAL ERROR: Reached heap limit`) un var izraisīt atmiņas izsīkumu 16 Gi cgroup. Skatiet [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Šis mērījums ir **atmiņas budžeta** brīdinājums, nevis produkta stingrais maksimums — divi vienlaicīgi ilgstoši `/v1/responses`. Resursietilpīgas tērzēšanas pieprasījumu pieņemšanu ierobežo automātiski atvasināts ievades baitu budžets (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), kura lielums noteikts pēc tā paša V8/cgroup ierobežojuma; tā palielināšana (vai mantotā pieprasījumu skaita ierobežojuma `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` iestatīšana) jau atbilstoši konfigurētā procesā no jauna rada avārijas pārtraukšanas risku. Šis ierobežojums **neattiecas** uz nelielām tērzēšanām, `/healthz`, `/v1/models` un MCP.

### Viens process: vairāk nekā divi ilgstoši `/v1/responses`

**Veselīgs** process (kaudzes lietojums zem `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, pēc noklusējuma `0.75`) **var** izpildīt vairāk nekā divus vienlaicīgus ilgstošus `POST /v1/responses`, ja procesa kopējā izpildē esošo baitu budžetā (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) joprojām ir vieta. Pieprasījumu ķermeņi, kuru izmērs sasniedz vai pārsniedz `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (pēc noklusējuma 256 KiB), saņem tādu pašu resursietilpīgā pieprasījuma nomu kā strukturāli sarežģīti pieprasījumi un izmanto to pašu [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` atkāpi (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desmitiem vienlaicīgu ilgstošu SSE klientu (operatoriem bieži nepieciešami 40–50) ir **atmiņas budžeta** jautājums — atbilstoši konfigurējiet kaudzi, primāros/rezerves slotus un `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` —, nevis stingrs produkta ierobežojums “maksimums 2”. Pārslogota kaudze joprojām noraida pieprasījumus ar atkārtojamu `503`, lai #7849 neatkārtotos.

Lai **pavairotu kaudzes** (neatkarīgas V8 vecās paaudzes atmiņas telpas) **jau šodien**:

| Dariet                                                                                                                                                                                                | Nedariet                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Palaidiet **N konteinerus/podus**, katru ar **savu** `DATA_DIR` / sējumu                                                                                                                              | Neiestatiet `replicas > 1` vienam SQLite failam                               |
| Nosakiet resursietilpīgo izpildē esošo pieprasījumu un veselīgās rezerves apjomu pēc kaudzes / izpildē esošo baitu budžeta; 1–2 ir konservatīvais #7849 noklusējums, nevis stingrs produkta maksimums | Nepiešķiriet vienam procesam 8× RAM un neierobežotu skaita limitu             |
| Pēc izvēles: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **koplietojamiem kvotu skaitītājiem**                                                                                               | Neuzskatiet Redis par koplietojamu SQLite — tas tāds nav                      |
| Dublējiet pakalpojumu sniedzēju noslēpumus katrā instancē (vai samierinieties ar nodalītiem informācijas paneļiem)                                                                                    | Negaidiet vienu informācijas paneli / vienu izsaukumu žurnālu visām instancēm |
| Izvietojiet priekšā jebkuru slodzes līdzsvarotāju; pietiek ar piesaisti pēc API atslēgas vai sesijas                                                                                                  | Neprasiet piegādātājam specifisku, izmēru ņemošu vērā starpprogrammatūru      |

Aparatūra: katras instances vienlaicīgo ilgstošo `/v1/responses` skaits ir **atmiņas budžeta** jautājums (kaudze + izpildē esošo baitu budžets / #10110). `N` neatkarīgi `DATA_DIR` joprojām pavairo kaudzes: resursdatora RAM jāspēj nodrošināt `N × cgroup`, nevis “viens 16 Gi pods ar N=8”. Nekad neizmantojiet `replicas > 1` vienam SQLite failam.

Compose skice (divas kaudzes, divi sējumi — nevis `deploy.replicas: 2`):

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

Procesa iekšējais blīvums (kompresija ārpus HTTP izolāta) ir aprakstīts [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Viens loģisks klasteris ar koplietojamu pastāvīgo stāvokli ir aprakstīts [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Svarīgas piezīmes

- **SQLite WAL režīms:** Komandai `docker stop` jāļauj pabeigt darbību, lai OmniRoute varētu ierakstīt jaunākās izmaiņas atpakaļ failā `storage.sqlite`, izveidojot kontrolpunktu. Komplektācijā iekļautajos Compose failos jau ir iestatīts 40 s apturēšanas labvēlības periods. Ja palaižat attēlu tieši, saglabājiet `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Iestatiet uz `true`, ja regulārās/pirmsieraksta dublējumkopijas tiek pārvaldītas ārēji. Esošas datubāzes migrācijām joprojām ir nepieciešams atsevišķs drošs un noturīgs momentuzņēmums, kā arī masveida migrācijas aizsargmehānisms.
- **Datu pastāvīga glabāšana:** Vienmēr montējiet sējumu mapē `/app/data`, lai saglabātu datubāzi, atslēgas un konfigurācijas pēc konteineru restartēšanas.
- **Porta konfigurācija:** Pārrakstiet vides mainīgo `PORT`, lai mainītu noklusējuma portu `20128`.

## Skatiet arī

- [VM izvietošanas ceļvedis](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare iestatīšana
- [Fly.io izvietošanas ceļvedis](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Izvietošana platformā Fly.io
- [Vides konfigurācija](../reference/ENVIRONMENT.md) — Pilnīga `.env` atsauce
