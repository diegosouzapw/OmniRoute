# 🐳 Docker Guide — OmniRoute (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Potpuna referenca za implementaciju pomoću Dockera. Za brzi početak pogledajte [odjeljak o Dockeru u README-u](../README.md#-docker).

## Sadržaj

- [Brzo pokretanje](#quick-run)
- [S datotekom okruženja](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupni profili](#available-profiles)
- [Konfiguriranje CLI alata glavnog računala kada se OmniRoute izvodi u Dockeru](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis pomoćni spremnik](#redis-sidecar)
- [Produkcijski Compose](#production-compose)
- [Faze Dockerfilea](#dockerfile-stages)
- [Ključne varijable okruženja](#critical-environment-variables)
- [Docker Compose s Caddyjem (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Oznake slika](#image-tags)
- [Dostupnost: zadani SQLite podržava samo jednu repliku](#availability-default-sqlite-is-single-replica)
- [Važne napomene](#important-notes)

---

## Brzo pokretanje

> **Samostalno hostiranje jednom naredbom?** Pogledajte
> [Vodič za samostalno hostiranje](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika +
> Redis, dostupan samo putem povratne petlje, bez odabira profila). Brzo pokretanje u nastavku
> predstavlja način pokretanja u jednom spremniku za korisnike koji već pokreću Redis drugdje.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## S datotekom okruženja

```bash
# Najprije kopirajte i uredite .env
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
# Osnovni profil (bez CLI alata)
docker compose --profile base up -d

# CLI profil (ugrađeni Claude Code, Codex i OpenClaw)
docker compose --profile cli up -d

# Profil glavnog računala (prvenstveno za Linux; montira CLI izvršne datoteke glavnog računala samo za čitanje)
docker compose --profile host up -d

# Kombinirajte CLI i pomoćni spremnik CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupni profili

OmniRoute isporučuje četiri Compose profila. Odaberite onaj koji odgovara vašem okruženju.

| Profil          | Usluga           | Kada upotrebljavati                                                                                                                                           | Naredba                                      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (zadano) | `omniroute-base` | Poslužitelj bez grafičkog sučelja / minimalno izvršno okruženje, bez uključenih CLI-jeva pružatelja usluga                                                    | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Agentski radni tijekovi koji pozivaju `omniroute providers/setup/doctor` i ugrađene CLI-jeve (Codex, Claude Code, Droid, OpenClaw)                            | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Linux računala koja žele pristup CLI-jevima glavnog računala nalik na `network_mode` montiranjem `~/.local/bin`, `~/.codex`, `~/.claude` itd. samo za čitanje | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Pokretanje pomoćnog spremnika [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na priključku `8317` za uzvodno CLI proxy-posredovanje              | `docker compose --profile cliproxyapi up -d` |

> Moguće je kombinirati više profila: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguriranje CLI alata glavnog računala kada se OmniRoute izvodi u Dockeru

`omniroute setup-codex`, `setup-claude`, `config set <tool>` i gumb
**Spremi konfiguraciju** na nadzornoj ploči zapisuju datoteke poput `~/.codex/*.config.toml`. Te putanje
imaju značenje samo na računalu na kojem se CLI stvarno izvodi. Ako ih pokrenete unutar
spremnika, zapis završava u vlastitom početnom direktoriju spremnika (`/home/node` —
slika se izvodi kao `USER node`), gdje ga nijedan CLI glavnog računala neće pročitati i gdje se
odbacuje čim se spremnik ponovno stvori.

OmniRoute to otkriva i odbija zapisivanje uz prikaz uputa, umjesto da
prijavi uspjeh koji ne možete iskoristiti: CLI završava s kodom `2`, a API odgovara kodom `422`
uz `containerEphemeralTarget: true`.

### Preporučeno: pokrenite CLI na glavnom računalu, a OmniRoute u Dockeru

Spremnik poslužuje API; CLI konfigurira alate na glavnom računalu.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # usmjerite CLI na spremnik
omniroute setup-codex                      # zapisuje stvarni ~/.codex na vašem glavnom računalu
```

To je pravi odabir kada se Codex, Claude Code, Cursor ili slični alati izvode na vašem
prijenosnom računalu — što je uobičajena postava.

### Alternativa: povežite direktorije konfiguracije glavnog računala kao bind mount (`host` profil)

Ako želite da sam spremnik zapisuje konfiguraciju na glavnom računalu, montirajte
direktorije i usmjerite `CLI_CONFIG_HOME` na korijen montiranja. Profil `host`
to već radi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount čini putanju pouzdanom: OmniRoute čita
`/proc/self/mountinfo` i dopušta zapisivanje u montirane putanje (kao i u direktorije
čiji su podređeni direktoriji montirani, što je upravo struktura `/host-home` prikazana iznad), dok
i dalje odbija zapisivanje u nemontirane putanje.

### Izlaz u nuždi: konfigurirajte CLI-je samog spremnika (upotrebljavajte štedljivo)

Kada se CLI-jevi zaista nalaze unutar spremnika (profil `cli`), zapisivanje
je namjerno. Proslijedite `--allow-container-write` bilo kojoj naredbi `setup-*` ili postavite
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` za poslužitelj. Zapisivanje se izvršava
uz upozorenje da neće preživjeti ponovno stvaranje spremnika.

> **Sigurnosno upozorenje — profil `cli` + montiranje `docker.sock`.**
> Profil `cli` putem bind mounta montira `/var/run/docker.sock` kako bi program za
> automatsko ažuriranje unutar spremnika mogao ponovno stvoriti skup servisa putem demona glavnog računala
> (`src/lib/system/autoUpdate.ts` provjerava postojanje tog socketa i preskače
> Dockerovu putanju kada ga nema). Taj socket predstavlja **granicu povjerenja s ovlastima root korisnika
> na glavnom računalu**: sve što mu može pristupiti upravlja Dockerovim demonom glavnog računala kao
> root — može stvoriti, pregledati, zaustaviti i ukloniti bilo koji spremnik na glavnom računalu.
> Posljedice:
>
> 1. **Nikada ne izlažite priključak profila `cli` mreži.** Objavite
>    ga na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupan putem LAN-a pretvara svaki RCE na razini nadzorne ploče u
>    potpuno kompromitiranje glavnog računala.
> 2. **Nemojte povezivati dodatne direktorije glavnog računala s profilom `cli`.**
>    Dockerov socket zajedno s bilo kojim dodatnim montiranjem daje spremniku potpuni
>    pristup čitanju i pisanju vašeg datotečnog sustava i konfiguracije glavnog računala. Ako alat mora
>    pristupiti projektu, pokrenite ga lokalno pomoću CLI binarne datoteke — nemojte ga montirati
>    u spremnik `cli`.
>
> Ako vam automatsko ažuriranje unutar spremnika nije potrebno, nemojte uključivati profil `cli`
> (`COMPOSE_PROFILES=core,redis` ili kraće). Ostali profili ne
> montiraju Dockerov socket.
>
> Pogledajte `docs/security/MITM-TPROXY-DECRYPT.md` (git; nije ugrađeno u `/docs`) za povezani model prijetnji
> koji se odnosi na MITM te `docs/security/SUPPLY_CHAIN.md` za lanac podrijetla
> binarnih datoteka `codex`/`claude-code`/`droid`/`openclaw`.

## Redis pomoćni kontejner

OmniRoute se oslanja na Redis za distribuirano ograničavanje brzine zahtjeva i dijeljenu predmemoriju. Usluga `redis` je **uvijek definirana** u datoteci `docker-compose.yml` (nije ograničena profilom) i pokreće se uz bilo koji drugi profil.

| Pojedinost                           | Vrijednost                                |
| ------------------------------------ | ----------------------------------------- |
| Slika                                | `redis:7-alpine`                          |
| Naziv kontejnera                     | `omniroute-redis`                         |
| Interni port                         | `6379`                                    |
| Port glavnog računala (nadjačanje)   | `REDIS_PORT` (zadano je `6379`)           |
| Adresa glavnog računala (nadjačanje) | `REDIS_BIND_HOST` (zadano je `127.0.0.1`) |
| Volumen                              | `omniroute-redis-data` → `/data`          |
| Provjera stanja                      | `redis-cli ping` (interval od 10 s)       |

Povezane varijable okruženja:

- `REDIS_URL` — niz za povezivanje koji se prosljeđuje aplikaciji (zadano je `redis://redis:6379`).
- `REDIS_PORT` — mapiranje porta na strani glavnog računala za Redis kontejner.
- `REDIS_BIND_HOST` — mrežno sučelje glavnog računala na kojem se objavljuje port. Zadano je `127.0.0.1`.

> **Zašto je adresa povratne petlje zadana:** pomoćni kontejner radi bez opcije `requirepass`, a aplikacijski
> kontejneri pristupaju mu preko compose mreže (`redis:6379`) — objavljeni port postoji
> samo za alate na glavnom računalu (`redis-cli`, lokalni `npm run dev`). Objavljivanje na
> `0.0.0.0` izložilo bi Redis bez autentifikacije svakom računalu u vašoj lokalnoj mreži. Ako postavite
> `REDIS_BIND_HOST=0.0.0.0`, dodajte i `--requirepass` u `command:` usluge.

**Onemogućavanje Redisa** nije preporučljivo (ograničavanje brzine zahtjeva prijeći će na pričuvno rješenje u memoriji). Ako to ipak morate učiniti, uklonite ili zakomentirajte blok usluge `redis:` u datoteci `docker-compose.yml` ili je skalirajte na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkcijski Compose

Za izoliranu produkcijsku snimku koja se izvodi uz razvojno okruženje upotrijebite `docker-compose.prod.yml`.

| Pojedinost                 | Vrijednost                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------ |
| Datoteka                   | `docker-compose.prod.yml`                                                                              |
| Zadani port nadzorne ploče | `PROD_DASHBOARD_PORT=20130` (mapiran na interni `${DASHBOARD_PORT:-20128}`)                            |
| Zadani API port            | `PROD_API_PORT=20131`                                                                                  |
| Slika                      | `omniroute:prod` (izrađena iz cilja `runner-cli`)                                                      |
| Redis kontejner            | `omniroute-redis-prod` (`redis:8.6.2`, namjenski volumen `redis-prod-data`)                            |
| Podatkovni volumen         | `omniroute-prod-data` (imenovan, ostaje sačuvan nakon ponovnih izgradnji)                              |
| Provjere stanja            | `node healthcheck.mjs` + `redis-cli ping`, pri čemu je `depends_on` uvjetovan ispravnim stanjem Redisa |

Način upotrebe:

```bash
# Izgradite i pokrenite produkcijski skup
docker compose -f docker-compose.prod.yml up -d --build

# Pratite zapisnike u stvarnom vremenu
docker compose -f docker-compose.prod.yml logs -f

# Zaustavite i uklonite skup (zadržite volumene)
docker compose -f docker-compose.prod.yml down
```

Produkcijski skup izvodi se paralelno s razvojnim compose okruženjem (različiti nazivi kontejnera, portovi i volumeni), tako da možete nastaviti lokalni razvoj dok produkcijsko okruženje ostaje aktivno.

## Faze Dockerfilea

Repozitorij sadrži višefazni Dockerfile (`Dockerfile`). Dostupne su tri faze; odaberite odgovarajući `target` za svoj slučaj upotrebe.

| Faza          | Osnovna slika         | Namjena                                                                                                                                                                         |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalira ovisnosti (`npm ci --legacy-peer-deps`) i pokreće `npm run build` (zadano koristi Turbopack — pogledajte Resursi tijekom izgradnje u nastavku)                        |
| `runner-base` | `node:26-trixie-slim` | Produkcijsko izvršno okruženje sa samostalnim izlazom Next.js-a. **Ne uključuje CLI-je pružatelja.**                                                                            |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` i globalne CLI-je: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Odaberite ovo za agentske radne tijekove.** |

Ručno izgradite određeni cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Resursi tijekom izgradnje

Tri argumenta izgradnje određuju resursne zahtjeve faze `builder`. Primjenjuju se samo tijekom izgradnje —
`OMNIROUTE_MEMORY_MB` (u nastavku) zasebna je postavka za vrijeme izvođenja.

| Argument izgradnje          | Zadano | Učinak                                                                                          |
| --------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | Vrijednost `0` umjesto toga gradi pomoću webpacka. Niža vršna potrošnja memorije, ali sporije.  |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Ograničenje V8 hrpe (`--max-old-space-size`) za pokrenuti `next build`.                         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Postavlja `CIRCLE_NODE_TOTAL`; Next izvodi `workers = N - 1` za prikupljanje podataka stranica. |

`OMNIROUTE_BUILD_WORKERS` treba povećati na snažnom sustavu za izgradnju, a na njega
treba posumnjati kada ograničena izgradnja ne uspije **nakon** `✓ Compiled successfully`. Svaki
radnik za podatke stranica zaseban je proces, kao i sam nadređeni proces `next build`;
reprodukcija na aktivnom VPS-u (problem #7518) izmjerila je vršni RSS svakog procesa na
~4.5 GB, neovisno o zastavici hrpe `NODE_OPTIONS` (Turbopack kompilira u
izvornoj/Rust memoriji izvan V8 hrpe). Zadana vrijednost `2` (→ 1 radnik, ukupno 2
procesa) prilagođena je GitHubovim izvršiteljima sa 16 GB / 4 vCPU-a koje
koristi proces objavljivanja. Pri vrijednosti `8` (→ 7 radnika) tom je izvršitelju ponestalo memorije i
buildkit nije uspio izvršiti korak uz `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 radnika) i dalje nije stalo nakon što je RSS po procesu izmjeren
izravno umjesto procijenjen. `tests/unit/docker-build-memory-budget.test.ts`
izvodi izračun na temelju izmjerene vrijednosti i ne uspijeva ako bilo koja postavka
preraste kapacitet izvršitelja.

Turbopack kompilira u izvornoj Rust memoriji koja se nalazi **izvan** V8 hrpe, pa je
`OMNIROUTE_BUILD_MEMORY_MB` ne ograničava. Na računalu s ograničenom memorijom
OOM killer tada prekida izgradnju signalom SIGKILL bez ikakvog teksta pogreške — ona se jednostavno
zaustavi usred `Creating an optimized production build`, što izgleda kao zastoj, a ne
kao nedostatak memorije. Ako računalo za izgradnju ima ograničene resurse, promijenite alat za paketiranje:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogućen, pa `next build` pokreće nadređeni proces **i** proces radnika,
a svaki zasebno poštuje `OMNIROUTE_BUILD_MEMORY_MB`. Postavite ograničenje spremnika
iznad približno dvostruke vrijednosti, a ne samo iznad jedne.

Izmjereno na ovom stablu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Alat za paketiranje | Ograničenje spremnika | Rezultat                                   |
| ------------------- | --------------------- | ------------------------------------------ |
| Turbopack           | 8 GiB / 16 GiB        | OOM-prekid pri oba, bez poruke             |
| webpack             | 8 GiB                 | radnik izgradnje prekinut signalom SIGKILL |
| webpack             | 12 GiB                | uspjelo, vršna potrošnja 11.1 GiB          |

### Zadane postavke tijekom izvođenja

Zadane vrijednosti koje izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Ponašanje memorije u Dockeru:

- Slika postavlja `OMNIROUTE_MEMORY_MB=1024` i iz njega izvodi `NODE_OPTIONS=--max-old-space-size=1024`.
- Stvarni poslužiteljski proces pokreće samostalni pokretač, koji čita `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node koristi posljednju ponovljenu vrijednost `--max-old-space-size`, pa postavljanje `OMNIROUTE_MEMORY_MB` kontrolira efektivno ograničenje Dockerove hrpe.
- Budući da je slika uvijek postavlja, pričuvna vrijednost pokretača prilagođena dostupnom RAM-u nikada se ne primjenjuje u Dockeru. Izričito je povećajte za radno opterećenje (tablica u nastavku). `2048` je i dalje premalo za `/v1/responses` agentskog programiranja.

### RAM tijekom izvođenja za agente za programiranje

Zadana Dockerova vrijednost od 1 GiB donja je granica za nadzornu ploču i lagani razgovor, a ne veličina za produkciju. Duga tijela zahtjeva `POST /v1/responses` (stotine poruka, deseci alata) tijekom sažimanja zadržavaju više grafova u memoriji. Dva preklapajuća zahtjeva veličine ~3 MiB / ~750k tokena prekinula su V8 pri **12 GiB** starog prostora (`FATAL ERROR: Reached heap limit`) te također dosegnula OOM cgrupe od 16 GiB. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Postavite **cgroup `--memory` iznad veličine hrpe** — izvorni međuspremnici, SQLite i međurezultati sažimanja nalaze se izvan V8.

| Radno opterećenje                            | `OMNIROUTE_MEMORY_MB`              | Spremnik / cgroup           | Napomene                                                                                                                 |
| -------------------------------------------- | ---------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Nadzorna ploča, jedan lagani razgovor        | `1024` (zadana vrijednost slike)   | ≥2 GiB                      |                                                                                                                          |
| Jedan agent za kodiranje (Claude/Codex/Grok) | `8192`                             | ≥10 GiB                     | Tipična `/v1/responses` sesija                                                                                           |
| Dva istodobna duga `/v1/responses` zahtjeva  | `10240`–`12288`                    | ≥12–16 GiB                  | Izmjeren prekid V8 pri ~12 GiB hrpe                                                                                      |
| Tri ili više istodobnih dugih konteksta      | nemojte pokretati u jednom procesu | serijalizacija / više RAM-a | Zadano ograničenje zahtjevnih operacija iznosi 1 aktivni zahtjev; povećavanje bez dodatnog RAM-a ponovno uzrokuje prekid |

`omniroute serve` na fizičkom poslužitelju postavlja približno 35 % RAM-a (ograničeno na `[512, 4096]`) kada varijabla `OMNIROUTE_MEMORY_MB` **nije postavljena**. Docker uvijek postavlja `1024`, pa se ta kalibracija nikada ne izvršava u službenoj slici.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritične varijable okruženja

Osim zadanih vrijednosti dokumentiranih u [ENVIRONMENT.md](../reference/ENVIRONMENT.md), sljedeće su varijable najvažnije pri pokretanju u Dockeru:

| Varijabla                     | Svrha                                                                                                                                                                                                                                                                                                   | Zadana vrijednost                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Dijeljena tajna za WebSocket most. **Obavezna u produkciji** — postavite je na snažan nasumični niz znakova.                                                                                                                                                                                            | nije postavljeno (mora se navesti) |
| `REDIS_URL`                   | Niz za povezivanje s pozadinskim sustavom za ograničavanje brzine / predmemoriju                                                                                                                                                                                                                        | `redis://redis:6379`               |
| `REDIS_PORT`                  | Port na strani glavnog računala za uključeni Redis spremnik                                                                                                                                                                                                                                             | `6379`                             |
| `REDIS_BIND_HOST`             | Mrežno sučelje glavnog računala na kojem je objavljen uključeni Redis port (povratna petlja osim ako ne dodate AUTH)                                                                                                                                                                                    | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Putanja na glavnom računalu montirana u profil `cli` na `/workspace/omniroute` za tijekove rada samostalnog ažuriranja                                                                                                                                                                                  | `.` (trenutačni direktorij)        |
| `OMNIROUTE_MEMORY_MB`         | Gornja granica Node heap memorije tijekom izvođenja za samostalni Docker poslužitelj; nadjačava prethodno navedenu zadanu vrijednost slike. Agenti za programiranje: `8192`+ (pogledajte [RAM tijekom izvođenja](#runtime-ram-for-coding-agents)).                                                      | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Nadjačava izložene portove za nadzornu ploču (20128) i API (20129)                                                                                                                                                                                                                                      | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Mrežno sučelje glavnog računala na kojem docker-compose objavljuje portove nadzorne ploče/API-ja/WS-a uživo. Uz `REQUIRE_API_KEY=false` (zadana vrijednost), `0.0.0.0` izlaže anonimni proxy `/v1` lokalnoj mreži — proširite dostupnost samo uz `REQUIRE_API_KEY=true` ili obrnuti proxy ispred njega. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Mrežno sučelje glavnog računala na kojem docker-compose objavljuje pomoćni spremnik `cliproxyapi` — njegov podatkovni volumen sadrži vjerodajnice pružatelja usluga.                                                                                                                                    | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Direktorij koji skener dodataka tijekom izvođenja čita i u koji instalira dodatke. Postavite ga kada su dodaci montirani povezivanjem: zadana vrijednost slijedi `HOME`, koji slika ne mora izvoziti.                                                                                                   | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | URL podputanja kada je aplikacija objavljena iza obrnutog proxyja (npr. `/omniroute`)                                                                                                                                                                                                                   | _(prazno = korijen)_               |
| `NEXT_PUBLIC_BASE_URL`        | Javno izvorište preglednika, uključujući podputanju (npr. `https://host/omniroute`)                                                                                                                                                                                                                     | nije postavljeno                   |
| `PROD_DASHBOARD_PORT`         | Port nadzorne ploče na strani glavnog računala za `docker-compose.prod.yml`                                                                                                                                                                                                                             | `20130`                            |
| `CLIPROXYAPI_PORT`            | Port na strani glavnog računala za pomoćni spremnik `cliproxyapi`                                                                                                                                                                                                                                       | `8317`                             |

## Obrnuti proxy na podputanji (Traefik / nginx)

Next.js `basePath` ugrađuje se u samostalni paket. OmniRoute bilježi ugrađenu
vrijednost u kontrolnu datoteku u korijenu aplikacije (zapisuje se tijekom `npm run build`; čita je
`scripts/docker/ensure-docker-base-path.mjs`) i uspoređuje je s
`OMNIROUTE_BASE_PATH` pri pokretanju spremnika. Kada se razlikuju, a slika je
izgrađena za korijen domene, ulazna točka prepravlja samostalne manifeste,
ugrađene literale `basePath`/`assetPrefix` (Next 16 generira URL-ove SSR resursa samo iz
`assetPrefix` — alat za zakrpe u njega preslikava podputanju), ugrađene
URL-ove resursa `/_next/static` (manifesti klijentskih referenci, uvozi medijskih datoteka, unaprijed generirane
stranice pogrešaka) i klijentski `process.env` posrednički sloj prije pokretanja
`node dev/run-standalone.mjs`.

### Izgradnja pomoću Composea (preporučeno)

Postavite obje varijable u `.env`, a zatim ponovno izgradite kako bi slika i okruženje izvođenja bili usklađeni:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` prosljeđuje `OMNIROUTE_BASE_PATH` kao Dockerov argument izgradnje i kao
varijablu okruženja izvođenja.

### Unaprijed izgrađena korijenska slika + podputanja tijekom izvođenja

Objavljene slike `diegosouzapw/omniroute:*` izgrađene su za korijen domene. I dalje
možete postaviti `OMNIROUTE_BASE_PATH` tijekom izvođenja; spremnik će jednom pri pokretanju zakrpati paket.
Uparite ga s odgovarajućim javnim izvorištem:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurirajte obrnuti proxy tako da prosljeđuje **cijelu** vanjsku putanju (nemojte uklanjati
prefiks). Traefik treba usmjeravati `PathPrefix(`/omniroute`)` prema spremniku bez
`StripPrefix`, tako da Next.js prima `/omniroute/...` i poslužuje resurse iz
`/omniroute/_next/...`.

Dockerova provjera stanja ispituje laganu krajnju točku životnog ciklusa `/healthz` s prefiksom
aktivnog `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostaje dostupan za
dijagnostiku namijenjenu korisnicima i nadzornim pločama; kako biste HEALTHCHECK spremnika ponovno usmjerili na njega (primjerice
radi provođenja dubinske provjere stanja), postavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ta je putanja **dubinska** provjera (baza podataka + sažetak nadzora) — prikladna za Dockerov
rijetki `HEALTHCHECK` ako je ponovno uključite, ali **nije** prikladna za intervale Kubernetesova
`livenessProbe`.

Za orkestratore (Kubernetes, Nomad itd.):

| Provjera           | Preporučeno                                                              | Izbjegavati                                                               |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Živost             | HTTP `GET /livez` ili TCP na glavnom priključku (`PORT`, zadano `20128`) | `/api/monitoring/health` kao provjeru živosti                             |
| Spremnost          | HTTP `GET /healthz`                                                      | Kratka vremenska ograničenja koja zauzetu petlju događaja smatraju mrtvom |
| Dubinska / vanjska | `/api/monitoring/health`                                                 | —                                                                         |

`/healthz` izvještava o životnom ciklusu procesa (`ok` / `starting` / `stopping`). `/livez` samo
provjerava je li proces živ (200 kad god se obrađivač može pokrenuti; ne čeka
spremnost). Obje se i dalje izvršavaju u istoj Nodeovoj petlji događaja kao i obrada zahtjeva, pa ih
procesorski zahtjevna obrada kataloga ili kompresija može odgoditi — zauzeto ≠ mrtvo. Ako HTTP
provjere isteknu, prednost dajte TCP provjeri živosti. Cjelovite smjernice za provjere:
[Vodič za nadzor — preporuke za Kubernetes provjere](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddyjem (HTTPS Auto-TLS)

OmniRoute se može sigurno izložiti pomoću Caddyjeva automatskog omogućavanja SSL-a. Provjerite pokazuje li DNS A zapis vaše domene na IP adresu vašeg poslužitelja.

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
      # Izvor vidljiv pregledniku za OAuth povratne pozive, poveznice nadzorne ploče i generirane javne URL-ove.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interni URL između poslužitelja za zakazane zadatke / dohvaćanja prema samome sebi.
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

Caddy postavlja standardna zaglavlja za prosljeđivanje prema nadređenom spremniku. OmniRoute upotrebljava
`NEXT_PUBLIC_BASE_URL` kao kanonsko javno ishodište za OAuth povratne pozive i generirane javne
poveznice; autentificirani zapisi nadzorne ploče upotrebljavaju zahtjeve istog ishodišta uz CSRF
zaštitu povezanu sa sesijom. Omogućite `OMNIROUTE_TRUST_PROXY` samo za napredne implementacije u kojima namjerno
želite da OmniRoute izvede javno ishodište iz pouzdanih proslijeđenih zaglavlja umjesto izričite
konfiguracije.

## Cloudflare Quick Tunnel

Podrška nadzorne ploče za implementacije u Dockeru uključuje **Cloudflare Quick Tunnel** jednim klikom na `Dashboard → Endpoints`. Pri prvom omogućivanju preuzima se `cloudflared` samo kada je potreban, pokreće se privremeni tunel do vaše trenutačne krajnje točke `/v1` i prikazuje generirani URL `https://*.trycloudflare.com/v1` neposredno ispod vašeg uobičajenog javnog URL-a.

Ploče tunela krajnjih točaka (Cloudflare, Tailscale, ngrok) mogu se prikazati ili sakriti u `Settings → Appearance` bez promjene stanja aktivnog tunela.

### Napomene o tunelu

- URL-ovi usluge Quick Tunnel privremeni su i mijenjaju se nakon svakog ponovnog pokretanja.
- Quick Tunnels ne obnavljaju se automatski nakon ponovnog pokretanja OmniRoutea ili spremnika. Po potrebi ih ponovno omogućite na nadzornoj ploči.
- Upravljana instalacija trenutačno podržava Linux, macOS i Windows na arhitekturama `x64` / `arm64`.
- Upravljani Quick Tunnels prema zadanim postavkama upotrebljavaju HTTP/2 prijenos kako bi se izbjegla bučna QUIC upozorenja o UDP međuspremniku u ograničenim okruženjima spremnika. Postavite `CLOUDFLARED_PROTOCOL=quic` ili `auto` ako želite drukčiji prijenos.
- Docker slike uključuju korijenske CA certifikate sustava i prosljeđuju ih upravljanom procesu `cloudflared`, čime se izbjegavaju pogreške pouzdanosti TLS-a kada se tunel pokreće unutar spremnika.
- Postavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ako želite da OmniRoute upotrebljava postojeću binarnu datoteku umjesto njezina preuzimanja.

## Oznake slika

| Slika                    | Oznaka   | Veličina | Opis                                                   |
| ------------------------ | -------- | -------- | ------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Najviši **objavljeni** stabilni SemVer (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Fiksirajte ovu klasu oznaka za GitOps                  |

Manifest za više platformi: izvorni `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatski odabire odgovarajuću arhitekturu; proslijedite `--platform linux/amd64` ako trebate prisilno pokrenuti emulaciju AMD64 na ARM računalima.

### Kanali izdanja

OmniRoute objavljuje zasebne Docker kanale za stabilna izdanja, testiranje aktivne grane izdanja i razvojne međuverzije.

| Kanal                           | Izvor                                  | Promjenjivost                     | Preporučena upotreba                                                                                                     |
| ------------------------------- | -------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Potpisano/verzionirano izdanje         | Nepromjenjivo                     | Produkcijske implementacije koje fiksiraju točno izdanje                                                                 |
| `:latest` / `:latest-web`       | Najviši **objavljeni** stabilni SemVer | Promjenjivi stabilni pokazivač    | Prati stabilna izdanja **nakon** zadatka objave SemVera — **ne** prati `main` ni neobjavljene potvrde grane `release/v*` |
| `:next` / `:next-web`           | Trenutačna zadana grana `release/v*`   | Promjenjivi pokazivač predizdanja | Testiranje popravaka koji su uključeni u aktivnu granu izdanja, ali još nisu dio stabilnog izdanja                       |
| `:main` / `:main-web`           | Grana `main`                           | Promjenjivi razvojni pokazivač    | Samo za razvojno i integracijsko testiranje                                                                              |

#### Upotreba kanala predizdanja

Kanal `next` ponovno se izrađuje pri svakom slanju promjena na trenutačnu zadanu granu `release/v*` i objavljuje se za AMD64 i ARM64. Starije grane održavanja ne mogu ga prebrisati. Kanal pruža sliku koju je moguće preuzeti za popravke koji su spojeni u aktivnu granu izdanja prije izrade sljedeće stabilne oznake.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose nadjačajte oznaku slike koju upotrebljava odabrani profil, a zatim preuzmite i ponovno izradite uslugu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sigurnost i vraćanje na prethodnu verziju

`next` je promjenjivi kanal predizdanja. Može se promijeniti pri svakom slanju promjena na aktivnu granu izdanja i **nije podržan za upotrebu u produkciji**. Fiksirajte sažetak slike dok procjenjujete određenu međuverziju:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prije testiranja sigurnosno kopirajte podatkovni volumen aplikacije OmniRoute ili direktorij podataka montiran putem bind mounta. Za povratak na prethodnu verziju vratite prethodno korištenu stabilnu verziju ili digest i ponovno izradite spremnik:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build iz grane izdanja nikada ne može pomaknuti `latest`; samo odgovarajuća stabilna semantička verzija može ažurirati pokazivač na stabilnu verziju. Slike `next` zadržavaju provjeru slike izdanja i blokirajući kontrolni prag za CRITICAL ranjivosti.

**`latest` nije jamstvo aktualnosti u odnosu na git.** Spojeni ispravci na grani `main` ili aktivnoj grani `release/v*` **nisu** uključeni u `:latest` sve dok se ne objavi slika sa stabilnom SemVer oznakom i zadatak objave ne ažurira `:latest` (isti digest kao ta SemVer verzija). Ako se čini da je `latest` zamrznut, a GitHub već prikazuje ispravak, povucite `:next` kako biste testirali granu izdanja ili pričekajte SemVer oznaku.

| Željeni cilj                                                                   | Upotrijebite                           |
| ------------------------------------------------------------------------------ | -------------------------------------- |
| GitOps / produkcija koja ne smije odstupati                                    | Fiksirajte `:X.Y.Z` (ili digest slike) |
| Praćenje objavljenih stabilnih verzija uz ponovno stvaranje pri svakom izdanju | `:latest`                              |
| Testiranje neobjavljenih commitova grane `release/v*`                          | `:next` (nije za produkciju)           |
| Testiranje grane `main`                                                        | `:main` (nije za produkciju)           |

## Dostupnost: zadani SQLite ima jednu repliku

Standardni Docker / Kubernetes OmniRoute sastoji se od **jednog Node procesa + jednog SQLite zapisivača**. Visoka dostupnost **nije podržana** u toj topologiji.

| Ograničenje                                                         | Posljedica                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Jedan zapisivač                                                     | **Nemojte** pokretati više replika nad istom SQLite datotekom. To oštećuje bazu podataka.                                                                                                                                                                                                                                                        |
| Ponovno stvaranje / ponovno pokretanje / prekid putem HEALTHCHECK-a | **Potpuni prekid rada** aktivnih SSE veza, sesija nadzorne ploče i stanja u memoriji. Veza se prekida svakom povezanom klijentu. Novi zahtjevi tijekom razdoblja bez krajnje točke od obrnutog proxyja dobivaju **`502 Bad Gateway: Unknown error`**, a ne OmniRoute JSON — klijenti to ne mogu razlikovati od kvara pružatelja usluge (#11015). |
| Ista petlja događaja kao `/healthz`                                 | Zauzeto ažuriranje kataloga ili ciklus kompresije može odgoditi provjere; kratko vremensko ograničenje zatim ponovno pokreće **jedinu** repliku.                                                                                                                                                                                                 |

**Matrica provjera** (pogledajte i [preporuke za Kubernetes provjere](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Provjera            | Cilj                                                     | Nemojte koristiti                                                              |
| ------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Živost              | TCP na `PORT` (zadano `20128`) ili blagi HTTP `/healthz` | `/api/monitoring/health`                                                       |
| Spremnost           | HTTP `GET /healthz`                                      | Kratka vremenska ograničenja koja zauzetu petlju događaja smatraju nedostupnom |
| Dubinska / za ljude | `/api/monitoring/health`                                 | Automatiziranu kubelet provjeru živosti                                        |

**Nadogradnje:** očekujte prekid svake sesije. Ako možete, postupno odspojite klijente; sa zadanim SQLiteom nema postupnog ažuriranja. Compose `restart: unless-stopped` u kombinaciji s Docker `HEALTHCHECK` također će zamijeniti jedini proces kada spremnik postane Unhealthy — s istim opsegom posljedica.

Kubernetes isječak za **jednu repliku** (Recreate je obavezan; nemojte povećavati `replicas` nad jednom SQLite datotekom):

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

`preStop` čekanje omogućuje Kubernetesu uklanjanje krajnjih točaka Servicea prije SIGTERM-a, tako da **novi** promet prestane dolaziti do procesa koji se gasi. Aktivni `/v1/responses` SSE zahtjevi dovršavaju se do isteka `SHUTDOWN_TIMEOUT_MS` (zadano 30 s) putem zahtjevnih odobrenih najmova (#11015). Novi zahtjevi koji ipak dosegnu proces dobivaju `503` + `Retry-After: 5`. Razdoblje bez krajnje točke tijekom Recreatea, sve dok zamjena ne bude Ready, ostaje potpuni prekid rada — to je posljedica SQLite topologije, a ne pogrešne konfiguracije provjere.

Vanjski Postgres / HA s više zapisivača **nije** dokumentirani standardni način rada. Ako trebate HA, zadržite jednu repliku ili pokrenite topologiju koju je projekt zasebno testirao i dokumentirao. Rad na podršci za Postgres/MySQL nalazi se u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dok to ne bude objavljeno, jedini podržani način povećanja kapaciteta za **velike** `/v1/responses` zahtjeve jest N neovisnih procesa (sljedeći odjeljak), a ne `replicas > 1` na jednom volumenu.

## Horizontalno skaliranje: N neovisnih procesa

Jedan Node proces znači **jednu V8 hrpu**. Dva preklapajuća zahtjeva agenta za programiranje `POST /v1/responses` (RTK + Caveman), svaki veličine ~3 MiB / ~750k tokena, prekidaju tu hrpu na ~12 Gi (`FATAL ERROR: Reached heap limit`) i mogu uzrokovati OOM u cgroupu od 16 Gi. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). To mjerenje upozorava na **ograničenje memorijskog budžeta**, a ne na strogo ograničenje proizvoda od dva istodobna duga zahtjeva `/v1/responses`. Prihvat zahtjevnih chatova ograničen je automatski izvedenim budžetom ulaznih bajtova (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimenzioniranim prema istom ograničenju V8/cgroupa — njegovo povećavanje (ili postavljanje naslijeđenog ograničenja broja zahtjeva `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) na već dimenzioniranom procesu ponovno uzrokuje prekid. Mali chatovi, `/healthz`, `/v1/models` i MCP **nisu** uključeni u to ograničenje.

### Jedan proces: više od dva duga zahtjeva `/v1/responses`

**Zdrav** proces (hrpa ispod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, zadano `0.75`) **može** izvršavati više od dva istodobna duga zahtjeva `POST /v1/responses` kada u budžetu bajtova u obradi na razini cijelog procesa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) još ima mjesta. Tijela zahtjeva veličine jednake ili veće od `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (zadano 256 KiB) zauzimaju isti resurs za zahtjevna opterećenja kao i strukturno složeni zahtjevi te koriste isti izlaz `tryAcquireHealthyHeadroom` iz [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Deseci istodobnih dugih SSE klijenata (operatorima ih često treba 40–50) pitanje su **memorijskog budžeta** — dimenzionirajte hrpu + primarne/dodatne utore + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a ne strogog ograničenja proizvoda na „najviše 2”. Hrpa pod opterećenjem i dalje odbacuje zahtjeve uz ponovljivi odgovor `503` kako se problem #7849 ne bi vratio.

Za **umnožavanje hrpa** (neovisnih V8 old-space memorijskih prostora) **danas**:

| Činite                                                                                                                                                                                           | Nemojte                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Pokrenite **N kontejnera/podova**, svaki sa svojim **vlastitim** `DATA_DIR` / volumenom                                                                                                          | Postaviti `replicas > 1` nad jednom SQLite datotekom                      |
| Dimenzionirajte zahtjeve u obradi + dodatni kapacitet za zdravo stanje prema budžetu hrpe / bajtova u obradi; 1–2 konzervativna je zadana vrijednost iz #7849, a ne strogo ograničenje proizvoda | Dodijeliti jednom procesu 8× RAM-a i neograničen broj zahtjeva            |
| Neobavezno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za **dijeljena brojila kvota**                                                                                                  | Tretirati Redis kao dijeljeni SQLite — to nije                            |
| Duplicirajte tajne pružatelja u svakoj instanci (ili prihvatite odvojene nadzorne ploče)                                                                                                         | Očekivati jednu nadzornu ploču / jedan zapisnik poziva u svim instancama  |
| Postavite bilo koji raspoređivač opterećenja ispred instanci; afinitet prema API ključu ili sesiji dovoljan je                                                                                   | Zahtijevati međusloj specifičan za dobavljača koji uzima u obzir veličinu |

Hardver: broj istodobnih dugih zahtjeva `/v1/responses` po instanci pitanje je **memorijskog budžeta** (hrpa + bajtovi u obradi / #10110). `N` neovisnih direktorija `DATA_DIR` i dalje umnožava hrpe: RAM glavnog računala mora pokrivati `N × cgroup`, a ne „jedan pod od 16 Gi s N=8”. Nikada nemojte koristiti `replicas > 1` nad jednom SQLite datotekom.

Primjer konfiguracije za Compose (dvije hrpe, dva volumena — ne `deploy.replicas: 2`):

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

Gustoća unutar procesa (kompresija izvan HTTP izolata) obrađena je u [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jedan logički klaster na dijeljenom trajnom stanju obrađen je u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Važne napomene

- **SQLite WAL način rada:** naredbi `docker stop` treba omogućiti da dovrši rad kako bi OmniRoute mogao zapisati najnovije promjene natrag u `storage.sqlite` putem kontrolne točke. Priložene Compose datoteke već postavljaju razdoblje odgode zaustavljanja od 40 s. Ako izravno pokrećete sliku, zadržite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Postavite na `true` ako se rutinskim sigurnosnim kopijama i sigurnosnim kopijama prije zapisivanja upravlja izvana. Migracije postojećih baza podataka i dalje zahtijevaju vlastitu trajnu sigurnosnu snimku i zaštitu za masovnu migraciju.
- **Trajnost podataka:** Uvijek montirajte volumen na `/app/data` kako biste sačuvali bazu podataka, ključeve i konfiguracije nakon ponovnih pokretanja spremnika.
- **Konfiguracija priključka:** Nadjačajte varijablu okruženja `PORT` kako biste promijenili zadani priključak `20128`.

## Pogledajte i

- [Vodič za implementaciju na VM-u](../ops/VM_DEPLOYMENT_GUIDE.md) — Postavljanje VM-a, nginx-a i Cloudflarea
- [Vodič za implementaciju na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementacija na Fly.io
- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Potpuna referenca za `.env`
