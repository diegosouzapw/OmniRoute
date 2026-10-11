# 🐳 Docker Guide — OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Pilnīga Docker izvietošanas uzziņa. Ātrai darba sākšanai skatiet [README Docker sadaļu](../README.md#-docker).

## Satura rādītājs

- [Ātrā palaišana](#quick-run)
- [Ar vides failu](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Pieejamie profili](#available-profiles)
- [Resursdatora CLI rīku konfigurēšana, kad OmniRoute darbojas Docker vidē](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis blakus konteiners](#redis-sidecar)
- [Produkcijas Compose](#production-compose)
- [Dockerfile posmi](#dockerfile-stages)
- [Kritiskie vides mainīgie](#critical-environment-variables)
- [Docker Compose ar Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ātrais tunelis](#cloudflare-quick-tunnel)
- [Attēlu tagi](#image-tags)
- [Pieejamība: noklusējuma SQLite atbalsta tikai vienu repliku](#availability-default-sqlite-is-single-replica)
- [Gemini reģionālās kļūdas Docker vidē](#gemini-regional-errors-inside-docker)
- [Svarīgas piezīmes](#important-notes)

---

## Ātrā palaišana

> **Pašmitināšana ar vienu komandu?** Skatiet
> [pašmitināšanas rokasgrāmatu](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publicēts attēls +
> Redis, tikai atgriezeniskās cilpas saskarne, bez profila izvēles). Tālāk aprakstītā ātrā palaišana ir
> viena konteinera risinājums lietotājiem, kuri Redis jau darbina citur.

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

# CLI profils (iebūvēti Claude Code, Codex un OpenClaw)
docker compose --profile cli up -d

# Resursdatora profils (galvenokārt Linux; resursdatora CLI binārie faili tiek montēti tikai lasīšanas režīmā)
docker compose --profile host up -d

# Tīmekļa profils (Chromium/Playwright tīmekļa sesiju nodrošinātājiem)
docker compose --profile web up -d

# Apvienojiet CLI un CLIProxyAPI blakus konteineru
docker compose --profile cli --profile cliproxyapi up -d
```

## Pieejamie profili

OmniRoute ietver Compose profilus galvenajiem izvietošanas veidiem. Izvēlieties savai videi atbilstošo profilu.

| Profils              | Pakalpojums      | Kad izmantot                                                                                                                                                    | Komanda                                      |
| -------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (noklusējums) | `omniroute-base` | Serveris bez grafiskās saskarnes / minimāla izpildvide bez komplektācijā iekļautiem nodrošinātāju CLI                                                           | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Aģentu darbplūsmas, kas izsauc `omniroute providers/setup/doctor` un komplektācijā iekļautos CLI (Codex, Claude Code, Droid, OpenClaw)                          | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Linux resursdatoriem, kuri vēlas `network_mode` līdzīgu piekļuvi resursdatora CLI, montējot `~/.local/bin`, `~/.codex`, `~/.claude` u.c. tikai lasīšanas režīmā | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Palaidiet [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) blakus konteineru portā `8317`, lai starpniekotu pieprasījumus augšupstraumes CLI         | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Tīmekļa sesiju nodrošinātājiem, kuriem nepieciešama pārlūkprogramma: `gemini-web`, `claude-web`, `claude-turnstile` (būvē `runner-web`; Chromium ir iekļauts)   | `docker compose --profile web up -d`         |

> Var apvienot vairākus profilus: `docker compose --profile cli --profile cliproxyapi up -d`.

## Resursdatora CLI rīku konfigurēšana, kad OmniRoute darbojas Docker vidē

`omniroute setup-codex`, `setup-claude`, `config set <tool>` un informācijas paneļa poga
**Saglabāt konfigurāciju** raksta failus, piemēram, `~/.codex/*.config.toml`. Šiem ceļiem
ir nozīme tikai tajā datorā, kurā faktiski darbojas CLI. Ja tos palaiž
konteinerā, faili tiek ierakstīti paša konteinera mājas direktorijā (`/home/node` —
attēls darbojas ar `USER node`), kur tos nekad nelasīs neviens resursdatora CLI un kur tie
tiks atmesti, tiklīdz konteiners tiks izveidots no jauna.

OmniRoute to nosaka un atsakās veikt ierakstīšanu, tā vietā sniedzot norādījumus,
nevis ziņojot par panākumiem, kurus nevarat izmantot: CLI beidz darbu ar kodu `2`, bet API atbild ar `422`
un `containerEphemeralTarget: true`.

### Ieteicams: palaidiet CLI resursdatorā, bet OmniRoute — Docker vidē

Konteiners nodrošina API; CLI konfigurē jūsu resursdatora rīkus.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # norādiet CLI izmantot konteineru
omniroute setup-codex                      # ieraksta īstajā ~/.codex direktorijā jūsu resursdatorā
```

Šī ir pareizā izvēle, ja Codex, Claude Code, Cursor vai līdzīgi rīki darbojas jūsu
klēpjdatorā — un tā parasti arī tiek darīts.

### Alternatīva: piesaistiet resursdatora konfigurācijas direktorijus (`host` profils)

Ja vēlaties, lai pats konteiners rakstītu jūsu resursdatora konfigurācijā, montējiet
direktorijus konteinerā un iestatiet `CLI_CONFIG_HOME` uz montējuma sakni. `host` profils
to jau dara:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Piesaistes montējums padara ceļu uzticamu: OmniRoute nolasa
`/proc/self/mountinfo` un atļauj rakstīšanu montētajos ceļos (kā arī direktorijos,
kuru apakšdirektoriji ir montējumi, kas precīzi atbilst iepriekš norādītajai `/host-home` struktūrai),
vienlaikus joprojām atsakot rakstīšanu nemontētos ceļos.

### Avārijas risinājums: konfigurējiet paša konteinera CLI (izmantojiet piesardzīgi)

Ja CLI patiešām atrodas konteinerā (`cli` profils), rakstīšana
ir apzināta. Nododiet `--allow-container-write` jebkurai `setup-*` komandai vai iestatiet
serverim `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Rakstīšana tiek veikta
ar brīdinājumu, ka izmaiņas pēc konteinera darbības beigām netiks saglabātas.

> **Drošības brīdinājums — `cli` profils un `docker.sock` montējums.**
> `cli` profils piesaistes režīmā montē `/var/run/docker.sock`, lai konteinerā esošais
> automātiskais atjauninātājs varētu atkārtoti izveidot steku, izmantojot resursdatora dēmonu
> (`src/lib/system/autoUpdate.ts` pārbauda šīs ligzdas esamību un izlaiž
> Docker ceļu, ja tās nav). Šī ligzda ir **resursdatora root līmeņa uzticamības
> robeža**: jebkas, kas var tai piekļūt, pārvalda resursdatora Docker dēmonu kā
> root lietotājs — tas var izveidot, pārbaudīt, apturēt un noņemt jebkuru resursdatora konteineru.
> Sekas:
>
> 1. **Nekad nepadariet `cli` profila portu pieejamu tīklā.** Publicējiet
>    to adresē `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — lokālajā tīklā pieejams `cli` profils jebkuru informācijas paneļa līmeņa RCE pārvērš
>    par pilnīgu resursdatora kompromitēšanu.
> 2. **Nepiesaistiet `cli` profilam nekādus papildu resursdatora direktorijus.**
>    Docker ligzda kopā ar jebkuru papildu montējumu nodrošina konteineram pilnu
>    lasīšanas/rakstīšanas piekļuvi jūsu failu sistēmai un resursdatora konfigurācijai. Ja rīkam ir
>    nepieciešama piekļuve projektam, palaidiet to lokāli ar CLI bināro failu — nemontējiet projektu
>    `cli` konteinerā.
>
> Ja konteinerā nav nepieciešama automātiskā atjaunināšana, neieslēdziet `cli` profilu
> (`COMPOSE_PROFILES=core,redis` vai īsāku variantu). Pārējie profili nemontē
> Docker ligzdu.
>
> Saistīto MITM apdraudējumu modeli skatiet failā `docs/security/MITM-TPROXY-DECRYPT.md` (git; nav kompilēts `/docs` saturā),
> bet `codex`/`claude-code`/`droid`/`openclaw` bināro failu izcelsmes ķēdi —
> failā `docs/security/SUPPLY_CHAIN.md`.

## Redis blakusprocess

OmniRoute izmanto Redis kā pamatu izkliedētajam pieprasījumu biežuma ierobežotājam un koplietotajai kešatmiņai. Pakalpojums `redis` ir **vienmēr definēts** failā `docker-compose.yml` (tam nav profila ierobežojuma), un tas tiek palaists kopā ar jebkuru citu profilu.

| Informācija                    | Vērtība                                         |
| ------------------------------ | ----------------------------------------------- |
| Attēls                         | `redis:7-alpine`                                |
| Konteinera nosaukums           | `omniroute-redis`                               |
| Iekšējais ports                | `6379`                                          |
| Resursdatora ports (maiņa)     | `REDIS_PORT` (pēc noklusējuma `6379`)           |
| Resursdatora piesaiste (maiņa) | `REDIS_BIND_HOST` (pēc noklusējuma `127.0.0.1`) |
| Sējums                         | `omniroute-redis-data` → `/data`                |
| Veselības pārbaude             | `redis-cli ping` (10 s intervāls)               |

Saistītie vides mainīgie:

- `REDIS_URL` — lietotnē ievadītā savienojuma virkne (pēc noklusējuma `redis://redis:6379`).
- `REDIS_PORT` — resursdatora puses porta kartējums Redis konteineram.
- `REDIS_BIND_HOST` — resursdatora saskarne, kurā ports tiek publicēts. Pēc noklusējuma `127.0.0.1`.

> **Kāpēc pēc noklusējuma tiek izmantota atgriezeniskā cilpa:** blakusprocess darbojas bez `requirepass`, un lietotnes
> konteineri tam piekļūst, izmantojot compose tīklu (`redis:6379`) — publicētais ports ir
> paredzēts tikai resursdatora puses rīkiem (`redis-cli`, lokālai `npm run dev` izpildei). Publicēšana uz
> `0.0.0.0` padarītu neautentificētu Redis pieejamu ikvienam resursdatoram jūsu LAN tīklā. Ja iestatāt
> `REDIS_BIND_HOST=0.0.0.0`, pakalpojuma `command:` pievienojiet arī `--requirepass`.

**Redis atspējošana** nav ieteicama (pieprasījumu biežuma ierobežotājs pāries uz mazāk efektīvu rezerves risinājumu atmiņā). Ja tas tomēr ir nepieciešams, noņemiet vai aizkomentējiet `redis:` pakalpojuma bloku failā `docker-compose.yml`, vai arī mērogojiet to līdz nullei:

```bash
docker compose up -d --scale redis=0
```

## Produkcijas Compose

Lai paralēli izstrādes videi palaistu izolētu produkcijas momentuzņēmumu, izmantojiet `docker-compose.prod.yml`.

| Informācija                      | Vērtība                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| Fails                            | `docker-compose.prod.yml`                                                                   |
| Noklusējuma vadības paneļa ports | `PROD_DASHBOARD_PORT=20130` (kartēts uz iekšējo `${DASHBOARD_PORT:-20128}`)                 |
| Noklusējuma API ports            | `PROD_API_PORT=20131`                                                                       |
| Attēls                           | `omniroute:prod` (būvēts no `runner-cli` mērķa)                                             |
| Redis konteiners                 | `omniroute-redis-prod` (`redis:8.6.2`, atsevišķs `redis-prod-data` sējums)                  |
| Datu sējums                      | `omniroute-prod-data` (nosaukts, tiek saglabāts starp atkārtotām būvēšanām)                 |
| Veselības pārbaudes              | `node healthcheck.mjs` + `redis-cli ping`, ar `depends_on`, kas atkarīgs no Redis veselības |

Lietošana:

```bash
# Uzbūvēt un palaist produkcijas steku
docker compose -f docker-compose.prod.yml up -d --build

# Straumēt žurnālus
docker compose -f docker-compose.prod.yml logs -f

# Apturēt un noņemt steku (saglabāt sējumus)
docker compose -f docker-compose.prod.yml down
```

Produkcijas steks darbojas paralēli izstrādes compose stekam (atšķirīgi konteineru nosaukumi, porti un sējumi), tāpēc varat turpināt lokālo izstrādi, kamēr produkcijas vide darbojas.

## Dockerfile posmi

Repozitorijā ir iekļauts vairākposmu Dockerfile (`Dockerfile`). Ir pieejami četri posmi; izvēlieties savam lietojuma gadījumam atbilstošo `target`.

| Posms         | Bāzes attēls          | Nolūks                                                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalē atkarības (`npm ci --legacy-peer-deps`) un izpilda `npm run build` (pēc noklusējuma izmanto Turbopack — skatiet tālāk sadaļu par būvēšanas laika resursiem)                                                                                                                                                                     |
| `runner-base` | `node:26-trixie-slim` | Produkcijas izpildlaika vide ar Next.js savrupo izvadi. **Pakalpojumu sniedzēju CLI nav iekļauti.**                                                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Pievieno `git`, `docker.io`, `docker-compose` un globālos CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Izvēlieties šo aģentu darbplūsmām.**                                                                                                                                                                |
| `runner-web`  | `runner-base`         | Pievieno Playwright un pārlūku Chromium (`--with-deps`) tīmekļa sesiju pakalpojumu sniedzējiem: `gemini-web`, `claude-web`, `claude-turnstile`. **Izvēlieties šo, ja izmantojat šos pakalpojumu sniedzējus** — bez tā vienkāršais attēls pieprasījuma izpildes laikā nedarbosies (skatiet piezīmi par `-web` sadaļā „Laidienu kanāli”). |

Konkrēta mērķa manuāla būvēšana:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Būvēšanas laika resursi

Trīs būvēšanas argumenti nosaka `builder` posma resursu patēriņu. Tie attiecas tikai uz būvēšanas laiku —
`OMNIROUTE_MEMORY_MB` (tālāk) ir atsevišķs izpildlaika iestatījums.

| Būvēšanas arguments         | Noklusējums | Ietekme                                                                                          |
| --------------------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | `0` būvē ar webpack: mazāks maksimālais atmiņas patēriņš, lēnāka darbība. `1` iespējo Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | V8 steka ierobežojums (`--max-old-space-size`) palaistajam `next build` procesam.                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Iestata `CIRCLE_NODE_TOTAL`; Next lapu datu apkopošanai aprēķina `workers = N - 1`.              |

`OMNIROUTE_BUILD_WORKERS` ir parametrs, kas jāpalielina jaudīgā būvēšanas vidē un
par kuru jāšaubās, ja būvēšana ierobežotā vidē pārtrūkst **pēc** `✓ Compiled successfully`.
Katrs lapu datu darbinātājprocess ir atsevišķs process, tāpat kā pats vecākprocess
`next build`; reāla VPS reprodukcija (problēma #7518) uzrādīja katra procesa
maksimālo RSS ~4,5 GB apmērā neatkarīgi no `NODE_OPTIONS` steka karoga (Turbopack
kompilēšanai izmanto vietējo/Rust atmiņu ārpus V8 steka). Noklusējuma vērtība `2`
(→ 1 darbinātājprocess, kopā 2 procesi) ir pielāgota 16 GB / 4 vCPU GitHub
nodrošinātajiem izpildītājiem, kurus izmanto publicēšanas konveijers. Ar vērtību
`8` (→ 7 darbinātājprocesi) šim izpildītājam pietrūka atmiņas, un buildkit
pārtrauca soli ar kļūdu `ResourceExhausted: ... cannot allocate memory`;
arī `3` (→ 2 darbinātājprocesi) neietilpa pieejamajā atmiņā, kad katra procesa
RSS tika izmērīts tieši, nevis secināts. `tests/unit/docker-build-memory-budget.test.ts`
veic aprēķinus, izmantojot izmērīto vērtību, un neizdodas, ja kāds no parametriem
pārsniedz izpildītāja iespējas.

Turbopack kompilēšanai izmanto vietējo Rust atmiņu, kas atrodas **ārpus** V8 steka,
tādēļ `OMNIROUTE_BUILD_MEMORY_MB` to neierobežo. Resursdatorā ar atmiņas ierobežojumu
OOM pārtraucējs nosūta būvēšanas procesam SIGKILL bez jebkāda kļūdas teksta — tas
vienkārši apstājas `Creating an optimized production build` vidū, kas vairāk
izskatās pēc iestrēgšanas, nevis atmiņas trūkuma. Tādēļ `Dockerfile` pēc
noklusējuma izmanto webpack (`OMNIROUTE_USE_TURBOPACK=0`), atšķirībā no
`npm run dev` / `npm run build`, kur kodā pēc noklusējuma tiek izmantots
Turbopack: vienkārša komanda `docker build .` bez būvēšanas argumentiem (kādu
izpilda Railway un citi viena klikšķa mitināšanas pakalpojumi) nedrīkst klusām
pārtrūkt būvēšanas vidē ar ierobežotu atmiņu. Publicētajiem attēliem
`OMNIROUTE_USE_TURBOPACK=0` jau tiek tieši norādīts failā `docker-publish.yml`.
Būvēšanas vidē ar pietiekami daudz RAM iespējojiet Turbopack ātrākai būvēšanai:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ir iespējots, tāpēc `next build` palaiž gan vecākprocesu,
gan darbinātājprocesu, un katrs no tiem atsevišķi ievēro
`OMNIROUTE_BUILD_MEMORY_MB`. Iestatiet konteinera ierobežojumu aptuveni divreiz
lielāku par šo vērtību, nevis vienreiz.

Mērījumi šajā kokā (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Komplektētājs | Konteinera ierobežojums | Rezultāts                                             |
| ------------- | ----------------------- | ----------------------------------------------------- |
| Turbopack     | 8 GiB / 16 GiB          | Abos gadījumos OOM pārtraucējs klusi apturēja procesu |
| webpack       | 8 GiB                   | Darbinātājprocess saņēma SIGKILL                      |
| webpack       | 12 GiB                  | Izdevās; maksimālais patēriņš bija 11,1 GiB           |

### Izpildlaika noklusējuma vērtības

`runner-base` eksportētās noklusējuma vērtības: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Atmiņas darbība Docker vidē:

- Attēls iestata `OMNIROUTE_MEMORY_MB=1024` un no tā atvasina `NODE_OPTIONS=--max-old-space-size=1024`.
- Faktisko servera procesu palaiž savrupais palaidējs, kas nolasa `OMNIROUTE_MEMORY_MB` un pievieno `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node izmanto pēdējo atkārtoto `--max-old-space-size` vērtību, tāpēc `OMNIROUTE_MEMORY_MB` iestatīšana nosaka faktisko Docker kaudzes ierobežojumu.
- Tā kā attēls to vienmēr iestata, palaidēja paša operatīvās atmiņas apjomam pielāgotā rezerves vērtība Docker vidē nekad netiek izmantota. Palieliniet to tieši atbilstoši slodzei (skatiet tālāk esošo tabulu). `2048` joprojām ir par maz kodēšanas aģentu `/v1/responses` pieprasījumiem.

### Izpildlaika operatīvā atmiņa kodēšanas aģentiem

Docker noklusējuma 1 GiB ir minimums informācijas panelim un vienkāršām tērzēšanas sarunām, nevis produkcijas videi piemērots apjoms. Gari `POST /v1/responses` pieprasījumu ķermeņi (simtiem ziņojumu, desmitiem rīku) saspiešanas laikā atmiņā saglabā vairākus grafus. Divi savstarpēji pārklājošies ~3 MiB / ~750k marķieru pieprasījumi ir izraisījuši V8 avārijas apturēšanu pie **12 GiB** vecās paaudzes apgabala (`FATAL ERROR: Reached heap limit`) un arī sasnieguši 16 GiB cgroup OOM ierobežojumu. Skatiet [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Iestatiet **cgroup `--memory` lielāku par kaudzes apjomu** — vietējie buferi, SQLite un saspiešanas starprezultāti atrodas ārpus V8.

| Slodze                                          | `OMNIROUTE_MEMORY_MB`       | Konteiners / cgroup           | Piezīmes                                                                                                                                     |
| ----------------------------------------------- | --------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Informācijas panelis, viena vienkārša tērzēšana | `1024` (attēla noklusējums) | ≥2 GiB                        |                                                                                                                                              |
| Viens kodēšanas aģents (Claude/Codex/Grok)      | `8192`                      | ≥10 GiB                       | Tipiska vienas sesijas `/v1/responses`                                                                                                       |
| Divi vienlaicīgi gari `/v1/responses`           | `10240`–`12288`             | ≥12–16 GiB                    | Novērota V8 avārijas apturēšana pie ~12 GiB kaudzes                                                                                          |
| Trīs vai vairāk vienlaicīgi gari konteksti      | nedarbiniet vienā procesā   | izpildiet secīgi / vairāk RAM | Pēc noklusējuma tiek pieļauts 1 vienlaicīgs smags pieprasījums; šī limita palielināšana bez papildu RAM no jauna izraisa avārijas apturēšanu |

`omniroute serve` fiziskā serverī pielāgo vērtību līdz ~35% no RAM (ierobežojot diapazonā `[512, 4096]`), ja `OMNIROUTE_MEMORY_MB` **nav iestatīts**. Docker vienmēr iestata `1024`, tāpēc oficiālajā attēlā šī pielāgošana nekad netiek veikta.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiskie vides mainīgie

Papildus noklusējuma vērtībām, kas dokumentētas failā [ENVIRONMENT.md](../reference/ENVIRONMENT.md), darbībā ar Docker vissvarīgākie ir šādi mainīgie:

| Mainīgais                     | Nolūks                                                                                                                                                                                                                                                                                                   | Noklusējums                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket tilta koplietotais noslēpums. **Obligāts produkcijas vidē** — iestatiet to kā spēcīgu nejaušu virkni.                                                                                                                                                                                          | nav iestatīts (jānorāda)       |
| `REDIS_URL`                   | Savienojuma virkne ātruma ierobežotāja/kešatmiņas aizmugursistēmai                                                                                                                                                                                                                                       | `redis://redis:6379`           |
| `REDIS_PORT`                  | Resursdatora puses ports komplektācijā iekļautajam Redis konteineram                                                                                                                                                                                                                                     | `6379`                         |
| `REDIS_BIND_HOST`             | Resursdatora saskarne, kurā tiek publicēts komplektācijā iekļautā Redis konteinera ports (atgriezeniskās cilpas saskarne, ja vien nepievienojat AUTH)                                                                                                                                                    | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Resursdatora ceļš, kas pašatjaunināšanas darbplūsmām `cli` profilā tiek montēts pie `/workspace/omniroute`                                                                                                                                                                                               | `.` (pašreizējais direktorijs) |
| `OMNIROUTE_MEMORY_MB`         | Node izpildlaika kaudzes maksimālais apjoms Docker savrupajam serverim; pārraksta iepriekš norādīto attēla noklusējuma vērtību. Programmēšanas aģentiem: `8192`+ (skatiet [izpildlaika RAM](#runtime-ram-for-coding-agents)).                                                                            | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Pārraksta atklātos informācijas paneļa (20128) un API (20129) portus                                                                                                                                                                                                                                     | `20128` / `20129`              |
| `APP_BIND_HOST`               | Resursdatora saskarne, kurā docker-compose publicē informācijas paneļa/API/reāllaika WS portus. Ja `REQUIRE_API_KEY=false` (noklusējums), `0.0.0.0` pakļauj anonīmo `/v1` starpniekserveri LAN tīklam — paplašiniet piekļuvi tikai ar `REQUIRE_API_KEY=true` vai priekšā esošu reverso starpniekserveri. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Resursdatora saskarne, kurā docker-compose publicē `cliproxyapi` blakusprocesu — tā datu sējumā tiek glabāti pakalpojumu sniedzēju akreditācijas dati.                                                                                                                                                   | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Direktorijs, kuru izpildlaika spraudņu skeneris nolasa un kurā instalē spraudņus. Iestatiet to, ja spraudņi ir montēti ar bind montējumu: noklusējums seko `HOME`, ko konteinera attēlam nav obligāti jāeksportē.                                                                                        | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | URL apakšceļš, ja lietotne ir publicēta aiz reversā starpniekservera (piemēram, `/omniroute`)                                                                                                                                                                                                            | _(tukšs = sakne)_              |
| `NEXT_PUBLIC_BASE_URL`        | Publiskā pārlūkprogrammas izcelsmes adrese, ieskaitot apakšceļu (piemēram, `https://host/omniroute`)                                                                                                                                                                                                     | nav iestatīts                  |
| `PROD_DASHBOARD_PORT`         | Resursdatora puses informācijas paneļa ports failam `docker-compose.prod.yml`                                                                                                                                                                                                                            | `20130`                        |
| `CLIPROXYAPI_PORT`            | Resursdatora puses ports `cliproxyapi` blakusprocesam                                                                                                                                                                                                                                                    | `8317`                         |

## Reversais starpniekserveris apakšceļā (Traefik / nginx)

Next.js `basePath` tiek kompilēts savrupajā pakotnē. OmniRoute reģistrē iekļauto
vērtību marķierfailā lietotnes saknē (tas tiek ierakstīts `npm run build` laikā; to nolasa
`scripts/docker/ensure-docker-base-path.mjs`) un konteinera palaišanas laikā salīdzina to ar
`OMNIROUTE_BASE_PATH`. Ja šīs vērtības atšķiras un attēls tika būvēts domēna saknei,
ieejas punkts pirms `node dev/run-standalone.mjs` palaišanas pārraksta savrupās pakotnes
manifestus, iegultās `basePath`/`assetPrefix` literāļu vērtības (Next 16 atveido SSR resursu URL,
izmantojot tikai `assetPrefix`, tādēļ labošanas rīks tajā atspoguļo apakšceļu), iekļautos
`/_next/static` resursu URL (klienta atsauču manifestus, multivides importus, iepriekš atveidotās
kļūdu lapas) un klienta `process.env` aizstājēju.

### Būvēšana ar Compose (ieteicams)

Iestatiet abus mainīgos failā `.env` un pēc tam veiciet atkārtotu būvēšanu, lai attēla un izpildlaika
iestatījumi sakristu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` nodod `OMNIROUTE_BASE_PATH` gan kā Docker būvēšanas argumentu, gan kā
izpildlaika vides mainīgo.

### Iepriekš būvēts saknes attēls + izpildlaika apakšceļš

Publicētie `diegosouzapw/omniroute:*` attēli ir būvēti domēna saknei. Tomēr varat
izpildlaikā iestatīt `OMNIROUTE_BASE_PATH`; konteiners palaišanas laikā vienreiz izlabo pakotni.
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

Docker veselības pārbaude pārbauda vieglo `/healthz` dzīves cikla galapunktu, kura priekšā
pievienots aktīvais `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` joprojām ir pieejams
cilvēkiem un informācijas paneļu diagnostikai; lai konteinera HEALTHCHECK atkal izmantotu šo
galapunktu (piemēram, padziļinātai veselības stāvokļa kontrolei), iestatiet
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Šis ceļš veic **padziļinātu** pārbaudi
(DB + uzraudzības kopsavilkums) — tā ir piemērota Docker retajām `HEALTHCHECK` pārbaudēm, ja
izvēlaties to atkal iespējot, bet **nav** piemērota Kubernetes `livenessProbe` intervāliem.

Orķestratoriem (Kubernetes, Nomad u.c.):

| Pārbaude                    | Ieteicams                                                                   | Nav ieteicams                                                 |
| --------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Dzīvīgums                   | HTTP `GET /livez` vai TCP galvenajā portā (`PORT`, pēc noklusējuma `20128`) | Izmantot `/api/monitoring/health` dzīvīguma pārbaudei         |
| Gatavība                    | HTTP `GET /healthz`                                                         | Īsi taimauti, kas noslogotu notikumu cilpu uzskata par mirušu |
| Padziļināta / melnās kastes | `/api/monitoring/health`                                                    | —                                                             |

`/healthz` ziņo par procesa dzīves ciklu (`ok` / `starting` / `stopping`). `/livez` pārbauda
tikai to, vai process darbojas (200, ja vien apstrādātāju var izpildīt; tas negaida
gatavību). Abi joprojām darbojas tajā pašā Node notikumu cilpā, kurā tiek apstrādāti pieprasījumi,
tādēļ CPU intensīva kataloga vai saspiešanas apstrāde var tos aizkavēt — aizņemts ≠ miris.
Ja HTTP pārbaudēm iestājas taimauts, dzīvīguma pārbaudei dodiet priekšroku TCP.
Pilnīgi norādījumi par pārbaudēm:
[Uzraudzības rokasgrāmata — ieteikumi Kubernetes pārbaudēm](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

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
      # Iekšējais serveru savstarpējās saziņas URL ieplānotajiem uzdevumiem un pašpieprasījumiem.
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
saitēm; autentificēti informācijas paneļa rakstīšanas pieprasījumi izmanto tās pašas izcelsmes pieprasījumus kopā ar sesijai piesaistītu CSRF
aizsardzību. Iespējojiet `OMNIROUTE_TRUST_PROXY` tikai sarežģītās izvietošanas konfigurācijās, kurās apzināti
vēlaties, lai OmniRoute noteiktu publisko izcelsmi no uzticamām pārsūtītajām galvenēm, nevis no tiešas
konfigurācijas.

## Cloudflare ātrais tunelis

Informācijas paneļa atbalsts Docker izvietojumiem ietver ar vienu klikšķi aktivizējamu **Cloudflare ātro tuneli** sadaļā `Dashboard → Endpoints`. Pirmajā iespējošanas reizē `cloudflared` tiek lejupielādēts tikai tad, kad tas ir nepieciešams, tiek palaists pagaidu tunelis uz jūsu pašreizējo `/v1` galapunktu, un ģenerētais `https://*.trycloudflare.com/v1` URL tiek parādīts tieši zem jūsu parastā publiskā URL.

Galapunktu tuneļu paneļus (Cloudflare, Tailscale, ngrok) var parādīt vai paslēpt sadaļā `Settings → Appearance`, nemainot aktīvā tuneļa stāvokli.

### Piezīmes par tuneli

- Ātro tuneļu URL ir pagaidu un mainās pēc katras restartēšanas.
- Ātrie tuneļi netiek automātiski atjaunoti pēc OmniRoute vai konteinera restartēšanas. Kad nepieciešams, iespējojiet tos atkārtoti informācijas panelī.
- Pārvaldītā instalēšana pašlaik atbalsta Linux, macOS un Windows platformās `x64` / `arm64`.
- Pārvaldītie ātrie tuneļi pēc noklusējuma izmanto HTTP/2 transportu, lai ierobežotās konteineru vidēs izvairītos no traucējošiem QUIC UDP bufera brīdinājumiem. Iestatiet `CLOUDFLARED_PROTOCOL=quic` vai `auto`, ja vēlaties izmantot citu transportu.
- Docker attēlos ir iekļauti sistēmas CA saknes sertifikāti, kas tiek nodoti pārvaldītajam `cloudflared`; tas novērš TLS uzticamības kļūmes, kad tunelis tiek sāknēts konteinerā.
- Iestatiet `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, ja vēlaties, lai OmniRoute izmantotu esošu bināro failu, nevis lejupielādētu jaunu.

## Attēlu tagi

| Attēls                   | Tags     | Izmērs | Apraksts                                                         |
| ------------------------ | -------- | ------ | ---------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Augstākā **publicētā** stabilā SemVer versija (nevis git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Fiksējiet šīs klases tagu GitOps vajadzībām                      |

Vairāku platformu manifests: vietējie `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automātiski atlasa atbilstošo arhitektūru; norādiet `--platform linux/amd64`, ja ARM resursdatoros nepieciešams piespiedu kārtā izmantot AMD64 emulāciju.

### Laidienu kanāli

OmniRoute publicē atsevišķus Docker kanālus stabilajiem laidieniem, aktīvā laidiena zara testēšanai un izstrādes būvējumiem.

| Kanāls                          | Avots                                         | Mainīgums                    | Ieteicamais lietojums                                                                                                            |
| ------------------------------- | --------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Parakstīts/versijots laidiens                 | Nemainīgs                    | Produkcijas izvietojumi, kuros ir fiksēts precīzs laidiens                                                                       |
| `:latest` / `:latest-web`       | Augstākā **publicētā** stabilā SemVer versija | Mainīga stabilā norāde       | Seko stabilajiem laidieniem **pēc** SemVer publicēšanas uzdevuma — **neseko** `main` vai nepublicētiem `release/v*` iesūtījumiem |
| `:next` / `:next-web`           | Pašreizējais noklusējuma `release/v*` zars    | Mainīga pirmslaidiena norāde | Labojumu testēšana, kuri ir iekļauti aktīvajā laidiena zarā, bet vēl nav stabilā laidienā                                        |
| `:main` / `:main-web`           | `main` zars                                   | Mainīga izstrādes norāde     | Tikai izstrādei un integrācijas testēšanai                                                                                       |

#### Tīmekļa sesiju nodrošinātāji: `-web` attēli

Katram iepriekš minētajam kanālam ir arī `-web` tags (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), kas būvēts no `runner-web` posma — tas pats attēls, papildināts ar Playwright un Chromium pārlūkprogrammu. Parastais attēls tiek piegādāts **bez** Chromium; tas ir nepieciešams `gemini-web`, `claude-web` un `claude-turnstile`.

Kļūme tiek atlikta un nenotiek palaišanas laikā: šo nodrošinātāju modeļi tiek uzskaitīti, un informācijas panelī tie tiek rādīti kā savienoti, bet tikai pirmais pieprasījums neizdodas ar

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ja izmantojat šos nodrošinātājus, lejupielādējiet tā kanāla `-web` tagu, kuru jau izmantojat — nekas cits nemainās. npm/CLI instalācijā (bez Docker attēla) trūkstošais komponents ir pārlūkprogrammas binārais fails: resursdatorā izpildiet `npx playwright install chromium`.

#### Pirmslaidiena kanāla izmantošana

Kanāls `next` tiek pārbūvēts pēc katras izmaiņu nosūtīšanas uz pašreizējo noklusējuma `release/v*` zaru un tiek publicēts gan AMD64, gan ARM64 arhitektūrai. Vecāki uzturēšanas zari to nevar pārrakstīt. Šis kanāls nodrošina lejupielādējamu attēlu labojumiem, kas ir sapludināti aktīvajā laidiena zarā pirms nākamā stabilā taga izveides.

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

#### Drošība un atgriešanās pie iepriekšējās versijas

`next` ir mainīgs pirmsizlaides kanāls. Tas var mainīties pēc jebkuras izmaiņu nosūtīšanas uz aktīvo laidiena zaru un **nav paredzēts lietošanai produkcijas vidē**. Konkrētas būvējuma versijas novērtēšanas laikā fiksējiet attēla jaucējvērtību:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pirms testēšanas izveidojiet OmniRoute datu sējuma vai piesaistītā datu direktorija dublējumkopiju. Lai atgrieztos pie iepriekšējās versijas, atjaunojiet iepriekš izmantoto stabilo versiju vai jaucējvērtību un izveidojiet konteineru no jauna:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Laidiena zara būvējums nekad nevar pārvietot `latest`; stabilo rādītāju var paaugstināt tikai atbilstoša stabilā semantiskā versija. `next` attēli saglabā laidiena attēla pārbaudi un bloķēšanas slieksni CRITICAL līmeņa ievainojamībām.

**`latest` negarantē git aktualitāti.** Labojumi, kas sapludināti zarā `main` vai aktīvajā `release/v*` zarā, **nav** pieejami `:latest`, kamēr nav publicēts stabils SemVer attēls un publicēšanas uzdevums nav paaugstinājis `:latest` (tā pati jaucējvērtība kā attiecīgajai SemVer versijai). Ja šķiet, ka `latest` ir iesaldēts, lai gan GitHub jau rāda labojumu, lejupielādējiet `:next`, lai testētu laidiena zaru, vai gaidiet SemVer tagu.

| Jūsu mērķis                                                                        | Izmantojiet                                   |
| ---------------------------------------------------------------------------------- | --------------------------------------------- |
| GitOps / produkcijas vide, kurā nedrīkst būt noviržu                               | Fiksējiet `:X.Y.Z` (vai attēla jaucējvērtību) |
| Sekot publicētajām stabilajām versijām un pieņemt atkārtotu izveidi katrā laidienā | `:latest`                                     |
| Testēt neizlaistas `release/v*` izmaiņas                                           | `:next` (ne produkcijai)                      |
| Testēt `main`                                                                      | `:main` (ne produkcijai)                      |

## Pieejamība: noklusējuma SQLite atbalsta tikai vienu repliku

Standarta Docker / Kubernetes OmniRoute ir **viens Node process + viens SQLite rakstītājs**. Šādā topoloģijā augsta pieejamība **netiek atbalstīta**.

| Ierobežojums                                              | Sekas                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Viens rakstītājs                                          | **Nedarbiniet** vairākas replikas ar vienu un to pašu SQLite failu. Tas sabojā datubāzi.                                                                                                                                                                                                                                                                                               |
| Atkārtota izveide / restartēšana / HEALTHCHECK apturēšana | **Pilnīgs darbības pārtraukums** aktīvajiem SSE savienojumiem, informācijas paneļa sesijām un atmiņā glabātajam stāvoklim. Visi savienotie klienti tiek atvienoti. Jauni pieprasījumi laikposmā, kad nav galapunktu, no reversā starpniekservera saņem **`502 Bad Gateway: Unknown error`**, nevis OmniRoute JSON — klienti to nevar atšķirt no pakalpojumu sniedzēja kļūmes (#11015). |
| Tas pats notikumu cikls, ko izmanto `/healthz`            | Noslogota kataloga vai saspiešanas iterācija var aizkavēt pārbaudes; īss taimauts tad restartē **vienīgo** repliku.                                                                                                                                                                                                                                                                    |

**Pārbaužu matrica** (skatiet arī [Kubernetes pārbaužu ieteikumus](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Pārbaude                | Mērķis                                                                       | Neizmantojiet                                                     |
| ----------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Dzīvīguma               | TCP portā `PORT` (noklusējums `20128`) vai saudzīga HTTP `/healthz` pārbaude | `/api/monitoring/health`                                          |
| Gatavības               | HTTP `GET /healthz`                                                          | Īsus taimautus, kas noslogotu notikumu ciklu uzskata par neaktīvu |
| Padziļināta / cilvēkiem | `/api/monitoring/health`                                                     | Automatizētai kubelet dzīvīguma pārbaudei                         |

**Jaunināšana:** sagaidiet, ka visas sesijas tiks pārtrauktas. Ja iespējams, pakāpeniski atvienojiet klientus; ar noklusējuma SQLite nav iespējama pakāpeniska atjaunināšana. Compose `restart: unless-stopped` kopā ar Docker `HEALTHCHECK` arī aizstās vienīgo procesu, kad konteiners būs stāvoklī Unhealthy — ar tādu pašu ietekmes apjomu.

Kubernetes fragments **vienai replikai** (nepieciešams Recreate; nepalieliniet `replicas`, ja tiek izmantots viens SQLite fails):

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

`preStop` aizture ļauj kube noņemt Service galapunktus pirms SIGTERM, lai **jaunā** datplūsma vairs netiktu novirzīta uz procesu, kura darbība tiek pārtraukta. Aktīvajiem `/v1/responses` SSE savienojumiem tiek ļauts pabeigt darbu līdz `SHUTDOWN_TIMEOUT_MS` taimautam (pēc noklusējuma 30 s), izmantojot pilnvērtīgas piekļuves nomas (#11015). Jauni pieprasījumi, kas joprojām sasniedz procesu, saņem `503` + `Retry-After: 5`. Tukšo galapunktu intervāls Recreate laikā, līdz aizstājējs ir Ready, joprojām izraisa pilnīgu darbības pārtraukumu — tā ir SQLite topoloģijas īpašība, nevis nepareiza pārbaužu konfigurācija.

Ārējs Postgres / vairāku rakstītāju HA **nav** dokumentēts standarta risinājums. Ja jums nepieciešama HA, izmantojiet vienu repliku vai topoloģiju, ko projekts ir atsevišķi testējis un dokumentējis. Darbs pie Postgres/MySQL ir aprakstīts [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kamēr tas nav izlaists, vienīgais atbalstītais veids, kā palielināt **lielu** `/v1/responses` pieprasījumu apstrādes jaudu, ir N neatkarīgi procesi (nākamā sadaļa), nevis `replicas > 1` vienā sējumā.

## Horizontālā mērogošana: N neatkarīgi procesi

Viens Node process ir **viena V8 kaudze**. Divi pārklājošies ~3 MiB / ~750k tokenu programmēšanas aģenta `POST /v1/responses` pieprasījumi (RTK + Caveman) pārtrauc šīs kaudzes darbību pie ~12 Gi (`FATAL ERROR: Reached heap limit`) un var izraisīt atmiņas izsīkumu 16 Gi cgroup. Skatiet [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Šis mērījums ir brīdinājums par **atmiņas budžetu**, nevis produkta stingrais maksimums — divi vienlaicīgi ilgi `/v1/responses` pieprasījumi. Resursietilpīgu tērzēšanas pieprasījumu uzņemšanu ierobežo automātiski atvasināts ienākošo datu baitu budžets (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), kura lielums tiek noteikts pēc tās pašas V8/cgroup robežas — palielinot šo vērtību (vai iestatot mantoto pieprasījumu skaita ierobežojumu `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) procesam, kura lielums jau ir noteikts, darbības pārtraukšana atkal kļūst iespējama. Mazas tērzēšanas, `/healthz`, `/v1/models` un MCP **neietilpst** šajā ierobežojumā.

### Viens process: vairāk nekā divi ilgi `/v1/responses`

**Veselīgs** process (kaudze zem `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, pēc noklusējuma `0.75`) **var** izpildīt vairāk nekā divus vienlaicīgus ilgus `POST /v1/responses` pieprasījumus, ja procesa kopējā apstrādē esošo baitu budžetā (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) joprojām ir vieta. Pieprasījumu ķermeņi, kuru lielums sasniedz vai pārsniedz `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (pēc noklusējuma 256 KiB), iegūst tādu pašu resursietilpīgo nomu kā strukturāli sarežģīti pieprasījumi un izmanto to pašu [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` izņēmumu (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desmitiem vienlaicīgu ilgstošu SSE klientu (operatoriem bieži vajag 40–50) ir **atmiņas budžeta** jautājums — atbilstoši nosakiet kaudzes, primāro/papildu vietu un `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` lielumu — nevis stingrs produkta ierobežojums “maksimums 2”. Noslogota kaudze joprojām noraida pieprasījumus ar atkārtoti mēģināmu `503`, lai #7849 neatkārtotos.

Lai **pavairotu kaudzes** (neatkarīgas V8 old-space atmiņas zonas) **jau tagad**:

| Dariet                                                                                                                                                                                                                 | Nedariet                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Darbiniet **N konteinerus/podus**, katru ar **savu** `DATA_DIR` / sējumu                                                                                                                                               | Neiestatiet `replicas > 1` vienam SQLite failam                                     |
| Nosakiet resursietilpīgo apstrādē esošo pieprasījumu un veselīgās papildu vietas lielumu atbilstoši kaudzes / apstrādē esošo baitu budžetam; 1–2 ir konservatīvais #7849 noklusējums, nevis stingrs produkta maksimums | Nepiešķiriet vienam procesam 8× RAM un neierobežotu skaita limitu                   |
| Pēc izvēles: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **koplietojamiem kvotu skaitītājiem**                                                                                                                | Neuzskatiet Redis par koplietojamu SQLite — tas tāds nav                            |
| Dublējiet pakalpojumu sniedzēju noslēpumus katrā instancē (vai samierinieties ar sadalītiem informācijas paneļiem)                                                                                                     | Negaidiet vienu informācijas paneli / vienu izsaukumu žurnālu visām instancēm       |
| Izvietojiet priekšā jebkuru slodzes balansētāju; piesaiste pēc API atslēgas vai sesijas ir pietiekama                                                                                                                  | Neprasiet konkrētam piegādātājam specifisku, lielumu ņemošu vērā starpprogrammatūru |

Aparatūra: vienā instancē vienlaikus izpildāmo ilgo `/v1/responses` pieprasījumu skaits ir **atmiņas budžeta** jautājums (kaudze + apstrādē esošo baitu budžets / #10110). `N` neatkarīgi `DATA_DIR` joprojām pavairo kaudzes: resursdatora RAM jāspēj nodrošināt `N × cgroup`, nevis “viens 16 Gi pods ar N=8”. Nekad neizmantojiet `replicas > 1` vienam SQLite failam.

Compose piemērs (divas kaudzes, divi sējumi — nevis `deploy.replicas: 2`):

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

Procesa iekšējais blīvums (kompresijas iznešana ārpus HTTP izolētā procesa) ir [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Viens loģisks klasteris ar koplietojamu pastāvīgo stāvokli ir [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini reģionālās kļūdas Docker vidē

Google AI Studio / Gemini API var atgriezt HTTP 400 kļūdu ar FAILED_PRECONDITION un
`User location is not supported for the API use.` Veiksmīgs pieprasījums resursdatorā
nepierāda, ka konteiners izmanto to pašu izejošo maršrutu. DNS secība,
IPv4/IPv6 savienojamība, VPN maršrutēšana un konfigurētie starpniekserveri var atšķirties. Pārbaudiet
[Google atbalstītos reģionus](https://ai.google.dev/gemini-api/docs/available-regions),
kā arī faktisko savienojuma maršrutu; šī kļūda pati par sevi nenorāda uz nederīgu API atslēgu.

### Dodiet priekšroku konkrētam savienojumam paredzētam starpniekserverim

Izmantojiet OmniRoute [katram savienojumam atsevišķi paredzēto starpniekservera konfigurāciju](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ietekmētajam Gemini savienojumam, pēc tam atkārtojiet **Test Connection** un nelielu pieprasījumu
ar to pašu modeli. Tādējādi maršrutēšanas izmaiņas attieksies tikai uz šo savienojumu. Pārbaudiet,
vai starpniekserveris ir sasniedzams no konteinera un vai savienojums to patiešām atlasa.
Maršruta maiņa negarantē atbilstību augšupstraumes pakalpojuma reģionālajām prasībām.

### Salīdziniet resursdatora un konteinera tīkla darbību

Salīdzinot autentificētu pieprasījumu rezultātus, saglabājiet identisku atslēgu, modeli un pieprasījumu; nekad
neievietojiet problēmas pieteikumā akreditācijas datus, starpniekservera paroles vai pilnas autorizācijas galvenes.
Vispirms pārbaudiet, kuras adrešu saimes piedāvā operētājsistēmas atrisinātājs, izmantojot to pašu komandu
resursdatorā un konteinerā:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Aizstājiet `omniroute` ar izmantoto pakalpojumu (piemēram, `omniroute-web`). Šīs
komandas izvada adrešu saimes, neatklājot akreditācijas datus vai IP adreses. Atgriezta vērtība `6`
norāda tikai uz IPv6 DNS rezultātu: tā **nepierāda**, ka IPv6 maršruts ir izmantojams vai ka API ir pieejama.
Vidēs, kurās ir instalēts `curl`, salīdziniet `curl -4 -I https://generativelanguage.googleapis.com`
ar `curl -6 -I https://generativelanguage.googleapis.com` abās vidēs.
HTTP atbilde apliecina savienojamību šim pārbaudes pieprasījumam, pat ja tā ir neautentificēta
kļūda; Gemini pieejamību pārbauda tikai autentificēts modeļa pieprasījums.

### Resursdatora līmeņa alternatīva: funkcionējošs IPv6 un atrisinātāja politika

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ziņotājs savā vidē atjaunoja
piekļuvi, iespējojot konteineru IPv6 un mainot glibc adrešu atlasi.
Uzskatiet to par konkrētai videi paredzētu alternatīvu. Pirms atrisinātāja preferenču pielāgošanas
pārliecinieties, ka resursdatora IPv6 darbojas, kā arī pārbaudiet konteinera izejošo savienojumu/maršrutēšanu un ugunsmūra noteikumus.
Privāta ULA adrese pati par sevi neapliecina publisku IPv6 savienojamību.

Pakalpojumiem, kas jau pievienoti Compose noklusējuma tīklam, šis fragments iespējo
IPv6 attiecīgajā tīklā; saglabājiet pārējo pakalpojuma, portu, sējumu un konfigurācijas daļu:

```yaml
networks:
  default:
    enable_ipv6: true
```

Nosauktam tīklam iespējojiet to tīklā, kuram pakalpojums faktiski pievienojas. Docker var
piešķirt ULA apakštīklu; skaidri norādītu apakštīklu, kas nepārklājas ar citiem, izvēlieties tikai tad, ja tas ir nepieciešams jūsu tīklam.
Skatiet [Docker IPv6 tīkla dokumentāciju](https://docs.docker.com/engine/daemon/ipv6/)
un [Compose tīkla opcijas](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**Uz glibc balstītā attēlā** `/etc/gai.conf` var mainīt adrešu atlasi. Pašreizējais
repozitorija Dockerfile izmanto Debian; pielāgotiem attēliem, kuru pamatā ir musl, šis mehānisms nav pieejams.
Ziņotais pielāgojums maina ULA etiķeti no `label fc00::/7 6` uz
`label fc00::/7 1`. Sāciet ar attēla pilno politiku tabulu un saglabājiet pārējos tās
ierakstus: `label` vai `precedence` ieraksta pievienošana aizstāj šo noklusējuma tabulu, tādēļ fails,
kurā ir tikai mainītā rinda, nav pietiekams.
[glibc konfigurācijas atsaucē](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ir dokumentēta šī darbība. Piemontējiet pārskatīto failu tikai lasīšanas režīmā pie `/etc/gai.conf`
un izveidojiet pakalpojumu no jauna, lai lietotu izmaiņas.

Tas maina operētājsistēmas adrešu atlasi **visai izejošajai datplūsmai šajā konteinerā**.
Tas nepiespiež katru lietojumprogrammu izvēlēties IPv6: nozīme ir arī Node DNS secībai un savienojuma
atlasei. Jo īpaši `--dns-result-order=ipv4first` dod priekšroku IPv4 un
nav risinājums kļūmei, kas rodas, izmantojot tikai IPv4. Skatiet [Node DNS secības dokumentāciju](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Pēc jebkādām resursdatora līmeņa izmaiņām atkārtoti pārbaudiet Gemini un citus pakalpojumu sniedzējus. Lai atgrieztos pie iepriekšējās konfigurācijas,
noņemiet pielāgotā `gai.conf` montējumu, atjaunojiet iepriekšējo tīkla konfigurāciju un
apkopes laikā no jauna izveidojiet ietekmēto pakalpojumu/tīklu. Tīkla atkārtota izveide
var pārtraukt citu tam pievienoto konteineru darbību; nedzēsiet pastāvīgo datu sējumu.

## Svarīgas piezīmes

- **SQLite WAL režīms:** Ir jāļauj komandai `docker stop` pabeigt darbību, lai OmniRoute varētu ierakstīt jaunākās izmaiņas no kontrolpunkta atpakaļ failā `storage.sqlite`. Komplektācijā iekļautajos Compose failos jau ir iestatīts 40 sekunžu apturēšanas labvēlības periods. Ja palaižat attēlu tieši, saglabājiet `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Iestatiet uz `true`, ja regulārās/pirmsieraksta dublējumkopijas tiek pārvaldītas ārēji. Esošas datubāzes migrācijām joprojām ir nepieciešams atsevišķs drošs un noturīgs momentuzņēmums, kā arī masveida migrācijas aizsardzības mehānisms.
- **Datu saglabāšana:** Vienmēr piemontējiet sējumu pie `/app/data`, lai datubāze, atslēgas un konfigurācijas tiktu saglabātas pēc konteineru restartēšanas.
- **Porta konfigurācija:** Pārrakstiet vides mainīgo `PORT`, lai mainītu noklusējuma portu `20128`.

## Skatiet arī

- [VM izvietošanas rokasgrāmata](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare iestatīšana
- [Fly.io izvietošanas rokasgrāmata](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Izvietošana platformā Fly.io
- [Vides konfigurācija](../reference/ENVIRONMENT.md) — Pilnīga `.env` uzziņa
