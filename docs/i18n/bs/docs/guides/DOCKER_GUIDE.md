# 🐳 Docker Guide — OmniRoute (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

# 🐳 Docker vodič — OmniRoute

> Kompletna referenca za Docker implementaciju. Za brzi početak, pogledajte [README Docker sekciju](../README.md#-docker).

## Sadržaj

- [Brzo pokretanje](#quick-run)
- [Sa datotekom okruženja](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupni profili](#available-profiles)
- [Konfigurisanje host CLI alata kada se OmniRoute pokreće u Dockeru](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Production Compose](#production-compose)
- [Dockerfile faze](#dockerfile-stages)
- [Kritične varijable okruženja](#critical-environment-variables)
- [Docker Compose sa Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Oznake slika (Image Tags)](#image-tags)
- [Dostupnost: podrazumevani SQLite je single-replica](#availability-default-sqlite-is-single-replica)
- [Važne napomene](#important-notes)

---

## Brzo pokretanje

> **Samostalno hostovanje jednom naredbom?** Pogledajte
> [Vodič za samostalno hostovanje](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika +
> Redis, samo povratna petlja, bez izbora profila). Brzo pokretanje u nastavku predstavlja
> putanju s jednim kontejnerom za korisnike koji već koriste Redis na drugom mjestu.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Sa datotekom okruženja

```bash
# Prvo kopirajte i uredite .env
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

# CLI profil (ugrađeni Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Profil hosta (prvenstveno za Linux; montira CLI binarne datoteke hosta samo za čitanje)
docker compose --profile host up -d

# Web profil (Chromium/Playwright za pružaoce web sesija)
docker compose --profile web up -d

# Kombinujte CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupni profili

OmniRoute uključuje Compose profile za glavne načine implementacije. Odaberite onaj koji odgovara vašem okruženju.

| Profil          | Servis           | Kada koristiti                                                                                                                                               | Naredba                                      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (zadano) | `omniroute-base` | Server bez grafičkog interfejsa / minimalno izvršno okruženje, bez uključenih CLI alata pružalaca                                                            | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Agentski tokovi rada koji pozivaju `omniroute providers/setup/doctor` i uključene CLI alate (Codex, Claude Code, Droid, OpenClaw)                            | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Linux hostovi kojima je potreban pristup CLI alatima hosta nalik na `network_mode`, montiranjem `~/.local/bin`, `~/.codex`, `~/.claude` itd. samo za čitanje | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Pokretanje pomoćnog kontejnera [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na portu `8317` za prosljeđivanje prema nadređenom CLI proxyju    | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Pružaoci web sesija kojima je potreban preglednik: `gemini-web`, `claude-web`, `claude-turnstile` (gradi `runner-web`, Chromium je uključen)                 | `docker compose --profile web up -d`         |

> Moguće je kombinovati više profila: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurisanje CLI alata na hostu kada OmniRoute radi u Dockeru

`omniroute setup-codex`, `setup-claude`, `config set <tool>` i dugme **Save config** na kontrolnoj tabli upisuju datoteke poput `~/.codex/*.config.toml`. Te putanje imaju smisla samo na mašini na kojoj CLI zapravo radi. Ako ih pokrenete unutar kontejnera, upis se vrši u matični direktorijum kontejnera (`/home/node` — slika pokreće `USER node`), gdje ga nijedan host CLI nikada neće pročitati i gdje se odbacuje čim se kontejner ponovo kreira.

OmniRoute ovo detektuje i odbija upis uz uputstva umjesto da prijavi uspjeh koji ne možete iskoristiti: CLI izlazi sa `2`, a API odgovara sa `422` uz `containerEphemeralTarget: true`.

### Preporučeno: pokrenite CLI na hostu, OmniRoute u Dockeru

Kontejner opslužuje API; CLI konfiguriše vaše host alate.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # usmjerite CLI na kontejner
omniroute setup-codex                      # upisuje pravi ~/.codex na vašem hostu
```

Ovo je pravi izbor kada Codex, Claude Code, Cursor ili slični alati rade na vašem laptopu — što je uobičajena postavka.

### Alternativa: bind-mount direktorijuma konfiguracije hosta (`host` profil)

Ako želite da sam kontejner upisuje vašu host konfiguraciju, montirajte direktorijume i usmjerite `CLI_CONFIG_HOME` na korijen montiranja. `host` profil to već radi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount je ono što putanju čini pouzdanom: OmniRoute čita `/proc/self/mountinfo` i dozvoljava upis na montirane putanje (i u direktorijume čija su djeca montiranja, što je upravo oblik `/host-home` iznad), dok i dalje odbija one koje nisu montirane.

### Izlazna opcija: konfigurišite CLI-jeve samog kontejnera (koristite štedljivo)

Kada CLI-jevi zaista žive unutar kontejnera (`cli` profil), upis je namjeran. Proslijedite `--allow-container-write` bilo kojoj `setup-*` komandi, ili postavite `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` za server. Upis se nastavlja uz upozorenje da neće preživjeti kontejner.

> **Sigurnosno upozorenje — `cli` profil + `docker.sock` mount.**
> `cli` profil bind-mountuje `/var/run/docker.sock` tako da auto-updater unutar kontejnera može ponovo kreirati stek sa host demona
> (`src/lib/system/autoUpdate.ts` provjerava taj socket i preskače
> Docker putanju kada je odsutan). Taj socket je **granica povjerenja host-root**: sve što može doći do njega upravlja host Docker demonom kao
> root — može kreirati, pregledati, zaustaviti i ukloniti bilo koji kontejner na hostu.
> Implikacije:
>
> 1. **Nikada ne izlažite port `cli` profila mreži.** Objavite
>    ga na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — `cli` profil dostupan preko LAN-a pretvara bilo koji RCE na nivou kontrolne table u
>    potpunu kompromitaciju hosta.
> 2. **Ne bind-mountujte nikakve dodatne host direktorijume u `cli` profil.**
>    Docker socket plus bilo koje dodatno montiranje daje kontejneru puni
>    pristup čitanja/pisanja vašem fajl sistemu i host konfiguraciji. Ako vam treba alat da
>    vidite projekat, pokrenite ga lokalno sa CLI binarnim fajlom — nemojte ga montirati
>    u `cli` kontejner.
>
> Ako vam nije potrebno automatsko ažuriranje unutar kontejnera, isključite `cli` profil
> (`COMPOSE_PROFILES=core,redis` ili kraće). Ostali profili ne
> montiraju Docker socket.
>
> Pogledajte `docs/security/MITM-TPROXY-DECRYPT.md` (git; nije kompajlirano u `/docs`) za povezani model prijetnji
> u vezi sa MITM, i `docs/security/SUPPLY_CHAIN.md` za
> `codex`/`claude-code`/`droid`/`openclaw` lanac porijekla binarnih fajlova.

## Redis Sidecar

OmniRoute se oslanja na Redis kao podršku za distribuirani ograničavač brzine (rate limiter) i dijeljeni keš. Servis `redis` je **uvijek definisan** u `docker-compose.yml` (nema profilno ograničenje) i pokreće se zajedno sa bilo kojim drugim profilom.

| Detalj                   | Vrijednost                                      |
| ------------------------ | ----------------------------------------------- |
| Slika                    | `redis:7-alpine`                                |
| Naziv kontejnera         | `omniroute-redis`                               |
| Interni port             | `6379`                                          |
| Host port (nadjačavanje) | `REDIS_PORT` (podrazumijevano `6379`)           |
| Host bind (nadjačavanje) | `REDIS_BIND_HOST` (podrazumijevano `127.0.0.1`) |
| Volumen                  | `omniroute-redis-data` → `/data`                |
| Healthcheck              | `redis-cli ping` (interval od 10s)              |

Povezane varijable okruženja:

- `REDIS_URL` — konekcijski string koji se ubacuje u aplikaciju (podrazumijevano `redis://redis:6379`).
- `REDIS_PORT` — mapiranje porta na strani hosta za Redis kontejner.
- `REDIS_BIND_HOST` — host interfejs na kojem je port objavljen. Podrazumijevano `127.0.0.1`.

> **Zašto loopback po defaultu:** sidecar se pokreće bez `requirepass`, a aplikacijski kontejneri mu pristupaju preko compose mreže (`redis:6379`) — objavljeni port postoji samo za alate na strani hosta (`redis-cli`, lokalni `npm run dev`). Objavljivanje na `0.0.0.0` bi izložilo neautentifikovani Redis svakom hostu na vašem LAN-u. Ako postavite `REDIS_BIND_HOST=0.0.0.0`, dodajte i `--requirepass` u `command:` servisa.

**Onemogućavanje Redis-a** se ne preporučuje (ograničavač brzine će se degradirati na in-memory rezervnu opciju). Ako baš morate, ili uklonite/komentarišite blok servisa `redis:` u `docker-compose.yml` ili ga skalirajte na nulu:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Za izolovanu produkcijsku snimku koja radi uz razvojnu verziju, koristite `docker-compose.prod.yml`.

| Detalj                               | Vrijednost                                                                         |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| Datoteka                             | `docker-compose.prod.yml`                                                          |
| Podrazumijevani port kontrolne ploče | `PROD_DASHBOARD_PORT=20130` (mapirano na interni `${DASHBOARD_PORT:-20128}`)       |
| Podrazumijevani API port             | `PROD_API_PORT=20131`                                                              |
| Slika                                | `omniroute:prod` (izgrađeno iz `runner-cli` cilja)                                 |
| Redis kontejner                      | `omniroute-redis-prod` (`redis:8.6.2`, namjenski `redis-prod-data` volumen)        |
| Volumen podataka                     | `omniroute-prod-data` (imenovan, perzistentan kroz ponovne izgradnje)              |
| Healthcheck-ovi                      | `node healthcheck.mjs` + `redis-cli ping`, sa `depends_on` vezanim za Redis health |

Kako koristiti:

```bash
# Izgradnja i pokretanje produkcijskog stack-a
docker compose -f docker-compose.prod.yml up -d --build

# Praćenje logova
docker compose -f docker-compose.prod.yml logs -f

# Gašenje (zadržavanje volumena)
docker compose -f docker-compose.prod.yml down
```

Produkcijski stack radi paralelno sa razvojnim compose-om (različiti nazivi kontejnera, portovi i volumeni), tako da možete nastaviti sa lokalnom iteracijom dok produkcija ostaje aktivna.

## Faze Dockerfilea

Repozitorij dolazi s višefaznim Dockerfileom (`Dockerfile`). Dostupne su četiri faze; odaberite odgovarajući `target` za svoj slučaj upotrebe.

| Faza          | Osnovna slika         | Namjena                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalira zavisnosti (`npm ci --legacy-peer-deps`) i pokreće `npm run build` (Turbopack je zadani — pogledajte Resurse tokom izgradnje u nastavku)                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Produkcijsko izvršno okruženje sa samostalnim Next.js izlazom. **Ne sadrži CLI-je pružalaca usluga.**                                                                                                                                                                                          |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` i globalne CLI-je: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Odaberite ovo za agentske radne tokove.**                                                                                                                  |
| `runner-web`  | `runner-base`         | Dodaje Playwright + preglednik Chromium (`--with-deps`) za pružaoce web sesija: `gemini-web`, `claude-web`, `claude-turnstile`. **Odaberite ovo kada koristite te pružaoce** — obična slika ne uspijeva pri obradi zahtjeva bez toga (pogledajte napomenu o `-web` u odjeljku Kanali izdanja). |

Ručno izgradite određeni cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Resursi tokom izgradnje

Tri argumenta izgradnje određuju koliko resursa troši faza `builder`. Primjenjuju se samo tokom izgradnje —
`OMNIROUTE_MEMORY_MB` (u nastavku) zaseban je parametar za vrijeme izvršavanja.

| Argument izgradnje          | Zadano | Efekat                                                                                          |
| --------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | Vrijednost `0` umjesto toga gradi pomoću webpacka. Niža vršna potrošnja memorije, ali sporije.  |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Ograničenje V8 hipa (`--max-old-space-size`) za pokrenuti proces `next build`.                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Postavlja `CIRCLE_NODE_TOTAL`; Next izvodi `workers = N - 1` za prikupljanje podataka stranica. |

`OMNIROUTE_BUILD_WORKERS` treba povećati na moćnom sistemu za izgradnju, a na njega
treba posumnjati kada izgradnja s ograničenim resursima ne uspije **nakon** poruke `✓ Compiled successfully`. Svaki
radni proces za podatke stranica zaseban je proces, kao i sam nadređeni proces `next build`;
reprodukcija na aktivnom VPS-u (problem #7518) izmjerila je vršni RSS svakog procesa na
~4,5 GB, nezavisno od zastavice hipa `NODE_OPTIONS` (Turbopack kompajlira koristeći
izvornu/Rust memoriju izvan V8 hipa). Zadana vrijednost `2` (→ 1 radni proces, ukupno 2
procesa) prilagođena je GitHubovim hostovanim izvršnim sistemima sa 16 GB / 4 vCPU-a koje
koristi cjevovod za objavljivanje. Pri vrijednosti `8` (→ 7 radnih procesa) taj je sistem ostao bez memorije i
buildkit je prekinuo korak greškom `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 radna procesa) i dalje nije bilo dovoljno nakon što je RSS po procesu izmjeren
direktno umjesto da bude procijenjen. `tests/unit/docker-build-memory-budget.test.ts`
izvodi izračun na osnovu izmjerene vrijednosti i ne uspijeva ako bilo koji parametar
premaši mogućnosti izvršnog sistema.

Turbopack kompajlira koristeći izvornu Rust memoriju koja se nalazi **izvan** V8 hipa, pa je
`OMNIROUTE_BUILD_MEMORY_MB` ne ograničava. Na hostu s ograničenjem memorije OOM killer tada
prekida izgradnju signalom SIGKILL bez ikakvog teksta greške — izgradnja se jednostavno
zaustavi usred poruke `Creating an optimized production build`, što izgleda kao zastoj, a
ne kao nedostatak memorije. Ako host za izgradnju ima ograničene resurse, promijenite alat za objedinjavanje:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogućen, pa `next build` pokreće nadređeni **i** radni
proces, a svaki zasebno poštuje `OMNIROUTE_BUILD_MEMORY_MB`. Postavite ograničenje
kontejnera na približno više od dvostruke vrijednosti, a ne jednostruke.

Izmjereno na ovom stablu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Alat za objedinjavanje | Ograničenje kontejnera | Rezultat                                         |
| ---------------------- | ---------------------- | ------------------------------------------------ |
| Turbopack              | 8 GiB / 16 GiB         | OOM prekid pri oba ograničenja, bez poruke       |
| webpack                | 8 GiB                  | radni proces izgradnje prekinut signalom SIGKILL |
| webpack                | 12 GiB                 | uspješno, vršna potrošnja 11,1 GiB               |

### Zadane vrijednosti tokom izvršavanja

Zadane vrijednosti koje izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Ponašanje memorije u Dockeru:

- Slika postavlja `OMNIROUTE_MEMORY_MB=1024` i iz njega izvodi `NODE_OPTIONS=--max-old-space-size=1024`.
- Stvarni serverski proces pokreće samostalni pokretač, koji čita `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node koristi posljednju ponovljenu vrijednost `--max-old-space-size`, tako da postavljanje `OMNIROUTE_MEMORY_MB` kontroliše efektivno ograničenje Docker hrpe.
- Budući da ga slika uvijek postavlja, vlastita rezervna vrijednost pokretača, kalibrirana prema RAM-u, nikada se ne primjenjuje pod Dockerom. Eksplicitno je povećajte za radno opterećenje (tabela ispod). `2048` je i dalje premalo za `/v1/responses` agenta za programiranje.

### RAM tokom izvršavanja za agente za programiranje

Dockerova zadana vrijednost od 1 GiB predstavlja minimum za kontrolnu ploču i lagani chat, a ne veličinu za produkciju. Duga tijela zahtjeva `POST /v1/responses` (stotine poruka, deseci alata) zadržavaju više grafova u memoriji tokom kompresije. Dva preklapajuća zahtjeva od ~3 MiB / ~750k tokena prekinula su V8 pri **12 GiB** prostora za stare objekte (`FATAL ERROR: Reached heap limit`) i također izazvala OOM cgroupa od 16 GiB. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Postavite veličinu **cgroup `--memory` iznad veličine hrpe** — izvorni međuspremnici, SQLite i međurezultati kompresije nalaze se izvan V8.

| Radno opterećenje                                | `OMNIROUTE_MEMORY_MB`     | Kontejner / cgroup         | Napomene                                                                                                                     |
| ------------------------------------------------ | ------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Kontrolna ploča, jedan lagani chat               | `1024` (zadano u slici)   | ≥2 GiB                     |                                                                                                                              |
| Jedan agent za programiranje (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                    | Tipična pojedinačna sesija `/v1/responses`                                                                                   |
| Dva istovremena duga `/v1/responses`             | `10240`–`12288`           | ≥12–16 GiB                 | Izmjeren prekid V8 pri hrpi od ~12 GiB                                                                                       |
| Tri ili više istovremenih dugih konteksta        | nemojte na jednom procesu | serijalizujte / više RAM-a | Zadano ograničenje zahtjevnih operacija je 1 aktivna operacija; njegovo povećavanje bez dodatnog RAM-a ponovo izaziva prekid |

`omniroute serve` na fizičkom sistemu kalibrira ~35% RAM-a (ograničeno na `[512, 4096]`) kada `OMNIROUTE_MEMORY_MB` **nije postavljen**. Docker uvijek postavlja `1024`, pa se ta kalibracija nikada ne izvršava u službenoj slici.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritične varijable okruženja

Pored zadanih vrijednosti dokumentovanih u [ENVIRONMENT.md](../reference/ENVIRONMENT.md), sljedeće varijable su najvažnije pri pokretanju unutar Dockera:

| Varijabla                     | Namjena                                                                                                                                                                                                                                                                               | Zadana vrijednost                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Dijeljena tajna za WebSocket most. **Obavezna u produkciji** — postavite je na snažan nasumični niz znakova.                                                                                                                                                                          | nije postavljeno (mora se navesti) |
| `REDIS_URL`                   | Niz za povezivanje s pozadinskim sistemom za ograničavanje brzine / keširanje                                                                                                                                                                                                         | `redis://redis:6379`               |
| `REDIS_PORT`                  | Port na strani hosta za priloženi Redis kontejner                                                                                                                                                                                                                                     | `6379`                             |
| `REDIS_BIND_HOST`             | Mrežno sučelje hosta na kojem je objavljen port priloženog Redis kontejnera (povratna petlja osim ako ne dodate AUTH)                                                                                                                                                                 | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Putanja na hostu montirana u profil `cli` na `/workspace/omniroute` za tokove rada samostalnog ažuriranja                                                                                                                                                                             | `.` (trenutni direktorij)          |
| `OMNIROUTE_MEMORY_MB`         | Gornja granica Node heap memorije tokom izvođenja za samostalni Docker server; nadjačava zadanu vrijednost slike navedenu iznad. Agenti za kodiranje: `8192`+ (pogledajte [RAM tokom izvođenja](#runtime-ram-for-coding-agents)).                                                     | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Nadjačava izložene portove za nadzornu ploču (20128) i API (20129)                                                                                                                                                                                                                    | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Mrežno sučelje hosta na kojem docker-compose objavljuje portove nadzorne ploče/API-ja/WS-a uživo. Kada je `REQUIRE_API_KEY=false` (zadana vrijednost), `0.0.0.0` izlaže anonimni `/v1` proxy LAN-u — proširite pristup samo uz `REQUIRE_API_KEY=true` ili obrnuti proxy ispred njega. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Mrežno sučelje hosta na kojem docker-compose objavljuje pomoćni kontejner `cliproxyapi` — njegov podatkovni volumen sadrži vjerodajnice pružatelja usluga.                                                                                                                            | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Direktorij iz kojeg skener dodataka tokom izvođenja čita i u koji ih instalira. Postavite ga kada su dodaci montirani povezivanjem: zadana vrijednost prati `HOME`, koji slika ne mora izvesti.                                                                                       | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | URL podputanja kada je aplikacija objavljena iza obrnutog proxyja (npr. `/omniroute`)                                                                                                                                                                                                 | _(prazno = korijen)_               |
| `NEXT_PUBLIC_BASE_URL`        | Javno ishodište preglednika koje uključuje podputanju (npr. `https://host/omniroute`)                                                                                                                                                                                                 | nije postavljeno                   |
| `PROD_DASHBOARD_PORT`         | Port nadzorne ploče na strani hosta za `docker-compose.prod.yml`                                                                                                                                                                                                                      | `20130`                            |
| `CLIPROXYAPI_PORT`            | Port na strani hosta za pomoćni kontejner `cliproxyapi`                                                                                                                                                                                                                               | `8317`                             |

## Reverzni proxy na podputanji (Traefik / nginx)

Next.js `basePath` se kompajlira u standalone paket. OmniRoute bilježi ugrađenu vrijednost u sentinel datoteku u korijenu aplikacije (zapisuje se tokom `npm run build`; čita je `scripts/docker/ensure-docker-base-path.mjs`) i upoređuje je sa `OMNIROUTE_BASE_PATH` kada se kontejner pokrene. Kada se razlikuju, a slika je napravljena za korijen domene, entrypoint prepisuje standalone manifeste, ugrađene `basePath`/`assetPrefix` literale (Next 16 renderuje SSR URL-ove resursa samo iz `assetPrefix` — patcher preslikava podputanju u njega), ugrađene `/_next/static` URL-ove resursa (manifesti klijentskih referenci, uvoz medija, unaprijed renderovane stranice grešaka) i klijentski `process.env` shim prije nego što se pokrene `node dev/run-standalone.mjs`.

### Compose build (preporučeno)

Postavite obje varijable u `.env`, a zatim ponovo izgradite (rebuild) kako bi se slika i runtime uskladili:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` prosljeđuje `OMNIROUTE_BASE_PATH` kao Docker build-arg i kao runtime varijablu okruženja.

### Prethodno izgrađena root slika + runtime podputanja

Objavljene `diegosouzapw/omniroute:*` slike su izgrađene za korijen domene. I dalje možete postaviti `OMNIROUTE_BASE_PATH` u runtime-u; kontejner patchuje paket jednom prilikom pokretanja. Uparite ga sa odgovarajućim javnim porijeklom (origin):

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurišite reverzni proxy da prosljeđuje **punu** vanjsku putanju (nemojte uklanjati prefiks). Traefik treba usmjeriti `PathPrefix(`/omniroute`)` na kontejner bez `StripPrefix`, tako da Next.js prima `/omniroute/...` i servira resurse iz `/omniroute/_next/...`.

Docker healthcheck provjerava lagani `/healthz` endpoint životnog ciklusa sa prefiksom aktivnog `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostaje dostupan za dijagnostiku ljudi/kontrolne ploče; da biste usmjerili kontejner HEALTHCHECK nazad na njega (na primjer za dubinsku provjeru ispravnosti), postavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ta putanja je **dubinska** provjera (DB + sažetak nadzora) — prikladna za Dockerov rijetki `HEALTHCHECK` ako se odlučite za to, ali **ne** za intervale Kubernetes `livenessProbe`.

Za orkestratore (Kubernetes, Nomad, itd.):

| Sonda           | Preferirati                                                          | Izbjegavati                                                                   |
| --------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, ili TCP na glavnom portu (`PORT`, zadano `20128`) | `/api/monitoring/health` kao liveness                                         |
| Readiness       | HTTP `GET /healthz`                                                  | Strogi vremenski limiti koji tretiraju zauzetost event-loop-a kao prekid rada |
| Deep / blackbox | `/api/monitoring/health`                                             | —                                                                             |

`/healthz` izvještava o životnom ciklusu procesa (`ok` / `starting` / `stopping`). `/livez` je samo provjera da li je proces živ (200 kad god handler može raditi; ne čeka spremnost). Oba i dalje rade na istom Node event loop-u kao i obrada zahtjeva, tako da ih CPU-intenzivni katalog ili rad na kompresiji mogu odgoditi — zauzetost ≠ prekid rada. Preferirajte TCP liveness ako HTTP sonde isteknu. Potpune smjernice za sonde: [Monitoring guide — Kubernetes probe recommendations](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose sa Caddy (HTTPS Auto-TLS)

OmniRoute se može sigurno izložiti koristeći Caddy-jevo automatsko SSL obezbjeđivanje. Osigurajte da DNS A zapis vaše domene pokazuje na IP adresu vašeg servera.

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
      # Porijeklo okrenuto pregledniku za OAuth povratne pozive, linkove kontrolne ploče i generisane javne URL-ove.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interni URL server-server za zakazane poslove / samostalna preuzimanja.
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

Caddy postavlja standardna zaglavlja prosljeđivanja za upstream kontejner. OmniRoute koristi `NEXT_PUBLIC_BASE_URL` kao kanoničko javno porijeklo za OAuth povratne pozive i generisane javne linkove; autentifikovani upisi na kontrolnoj ploči koriste zahtjeve istog porijekla (same-origin) uz CSRF zaštitu vezanu za sesiju. Omogućite `OMNIROUTE_TRUST_PROXY` samo za napredna raspoređivanja gdje namjerno želite da OmniRoute izvede javno porijeklo iz pouzdanih proslijeđenih zaglavlja umjesto eksplicitne konfiguracije.

## Cloudflare Quick Tunnel

Podrška kontrolne ploče za Docker raspoređivanja uključuje **Cloudflare Quick Tunnel** jednim klikom na `Dashboard → Endpoints`. Prvo omogućavanje preuzima `cloudflared` samo kada je potrebno, pokreće privremeni tunel do vašeg trenutnog `/v1` krajnjeg mjesta (endpoint) i prikazuje generisani `https://*.trycloudflare.com/v1` URL direktno ispod vašeg normalnog javnog URL-a.

Paneli tunela krajnjih mjesta (Cloudflare, Tailscale, ngrok) se mogu prikazati ili sakriti iz `Settings → Appearance` bez promjene aktivnog stanja tunela.

### Napomene o tunelu

- Quick Tunnel URL-ovi su privremeni i mijenjaju se nakon svakog ponovnog pokretanja.
- Quick Tuneli se ne vraćaju automatski nakon ponovnog pokretanja OmniRoute-a ili kontejnera. Ponovo ih omogućite sa kontrolne ploče kada je potrebno.
- Upravljana instalacija trenutno podržava Linux, macOS i Windows na `x64` / `arm64`.
- Upravljani Quick Tuneli podrazumijevano koriste HTTP/2 transport kako bi se izbjegla bučna upozorenja QUIC UDP bafera u ograničenim kontejnerskim okruženjima. Postavite `CLOUDFLARED_PROTOCOL=quic` ili `auto` ako želite drugačiji transport.
- Docker slike sadrže sistemske CA korijene i prosljeđuju ih upravljanom `cloudflared`-u, što izbjegava greške TLS povjerenja kada se tunel pokreće unutar kontejnera.
- Postavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ako želite da OmniRoute koristi postojeću binarnu datoteku umjesto preuzimanja nove.

## Oznake slika

| Slika                    | Oznaka   | Veličina | Opis                                                           |
| ------------------------ | -------- | -------- | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Najviša **objavljena** stabilna SemVer verzija (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Fiksirajte ovu vrstu oznake za GitOps                          |

Višeplatformski manifest: izvorni `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatski odabire odgovarajuću arhitekturu; proslijedite `--platform linux/amd64` ako trebate prisiliti AMD64 emulaciju na ARM hostovima.

### Kanali izdanja

OmniRoute objavljuje zasebne Docker kanale za stabilna izdanja, testiranje aktivne grane izdanja i razvojne verzije.

| Kanal                           | Izvor                                          | Promjenjivost                     | Preporučena upotreba                                                                                                         |
| ------------------------------- | ---------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Potpisano/verzionirano izdanje                 | Nepromjenjivo                     | Produkcijska postavljanja koja fiksiraju tačno izdanje                                                                       |
| `:latest` / `:latest-web`       | Najviša **objavljena** stabilna SemVer verzija | Promjenjivi stabilni pokazivač    | Prati stabilna izdanja **nakon** SemVer zadatka objavljivanja — **ne** prati `main` niti neobjavljene commitove `release/v*` |
| `:next` / `:next-web`           | Trenutna zadana grana `release/v*`             | Promjenjivi pokazivač predizdanja | Testiranje ispravki koje su uključene u aktivnu granu izdanja, ali još nisu dio stabilnog izdanja                            |
| `:main` / `:main-web`           | Grana `main`                                   | Promjenjivi razvojni pokazivač    | Isključivo za razvojno i integracijsko testiranje                                                                            |

#### Pružaoci web sesija: slike `-web`

Svaki prethodno navedeni kanal dostupan je i kao oznaka `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), izgrađena iz faze `runner-web` — ista slika uz Playwright i preglednik Chromium. Obična slika isporučuje se **bez** Chromiuma; `gemini-web`, `claude-web` i `claude-turnstile` ga zahtijevaju.

Greška je odgođena i ne pojavljuje se pri pokretanju: ti pružaoci navode svoje modele i prikazuju se kao povezani na kontrolnoj ploči, a tek prvi zahtjev ne uspijeva uz poruku

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ako koristite te pružaoce, preuzmite oznaku `-web` kanala koji već koristite — ništa drugo se ne mijenja. Kod npm/CLI instalacije (bez Docker slike), ekvivalentni dio koji nedostaje jeste izvršna datoteka preglednika: pokrenite `npx playwright install chromium` na hostu.

#### Korištenje kanala predizdanja

Kanal `next` ponovo se izgrađuje pri svakom slanju promjena na trenutnu zadanu granu `release/v*` i objavljuje se i za AMD64 i za ARM64. Starije grane održavanja ne mogu ga prepisati. Kanal pruža sliku koja se može preuzeti i koja sadrži ispravke spojene u aktivnu granu izdanja prije izrade sljedeće stabilne oznake.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose nadjačajte oznaku slike koju koristi odabrani profil, a zatim preuzmite sliku i ponovo kreirajte servis:

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

`next` je promjenjivi kanal predizdanja. Može se promijeniti pri svakom slanju promjena na aktivnu granu izdanja i **nije podržan za produkcijsku upotrebu**. Fiksirajte sažetak slike dok procjenjujete određenu verziju:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prije testiranja napravite sigurnosnu kopiju OmniRoute volumena podataka ili montiranog direktorija podataka. Za vraćanje na prethodnu verziju ponovo postavite ranije korištenu stabilnu verziju ili sažetak i ponovo kreirajte kontejner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Verzija iz grane izdanja nikada ne može pomjeriti `latest`; samo odgovarajuća stabilna semantička verzija može ažurirati stabilni pokazivač. Slike `next` zadržavaju provjeru slike izdanja i blokirajući mehanizam za KRITIČNE ranjivosti.

**`latest` nije garancija ažurnosti u odnosu na git.** Spojene ispravke na grani `main` ili aktivnoj grani `release/v*` **nisu** uključene u `:latest` sve dok se ne objavi stabilna SemVer slika i zadatak objavljivanja ne ažurira `:latest` (isti sažetak kao taj SemVer). Ako `latest` izgleda zamrznuto, a GitHub već prikazuje ispravku, preuzmite `:next` kako biste testirali granu izdanja ili sačekajte SemVer oznaku.

| Šta želite                                                                            | Koristite                               |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / produkciju koja ne smije odstupati                                           | Fiksirajte `:X.Y.Z` (ili sažetak slike) |
| Pratiti objavljena stabilna izdanja i prihvatiti ponovno kreiranje pri svakom izdanju | `:latest`                               |
| Testirati neobjavljene commitove `release/v*`                                         | `:next` (ne za produkciju)              |
| Testirati `main`                                                                      | `:main` (ne za produkciju)              |

## Dostupnost: podrazumevani SQLite je sa jednom replikom

Standardni Docker / Kubernetes OmniRoute je **jedan Node proces + jedan SQLite writer**. Visoka dostupnost **nije podržana** u toj topologiji.

| Ograničenje                             | Posledica                                                                                                                                                                                                                                                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jedan writer                            | Nemojte **pokretati** više replika nad istom SQLite datotekom. To oštećuje bazu podataka.                                                                                                                                                                                                                        |
| Recreate / restart / HEALTHCHECK prekid | **Potpuni prekid** SSE u toku, sesija kontrolne table i stanja u memoriji. Svaki povezani klijent se prekida. Novi zahtevi tokom prozora prazne krajnje tačke dobijaju reverse-proxy **`502 Bad Gateway: Unknown error`**, a ne OmniRoute JSON — klijenti ne mogu razlikovati ovo od greške provajdera (#11015). |
| Ista event petlja kao `/healthz`        | Zauzet katalog ili tik kompresije može odložiti probe; kratak timeout tada restartuje **jedinu** repliku.                                                                                                                                                                                                        |

**Matrica proba** (pogledajte takođe [preporuke za Kubernetes probe](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Proba          | Cilj                                                            | Ne koristiti                                                           |
| -------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Liveness       | TCP na `PORT` (podrazumevano `20128`), ili soft HTTP `/healthz` | `/api/monitoring/health`                                               |
| Readiness      | HTTP `GET /healthz`                                             | Strogi timeout-i koji tretiraju zauzetost event-petlje kao prekid rada |
| Duboka / ljudi | `/api/monitoring/health`                                        | Automatizovani kubelet liveness                                        |

**Nadogradnje:** očekujte prekid svake sesije. Ispraznite (drain) klijente ako možete; ne postoji rolling update na podrazumevanom SQLite-u. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` će takođe zameniti jedini proces kada je kontejner Unhealthy — isti radijus uticaja.

Kubernetes isečak za **jednu repliku** (Recreate je obavezan; nemojte povećavati `replicas` nad jednom SQLite datotekom):

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

`preStop` sleep omogućava kube-u da odbaci Service krajnje tačke pre SIGTERM-a tako da **novi** saobraćaj prestane da pogađa proces koji umire. In-flight `/v1/responses` SSE se prazni do `SHUTDOWN_TIMEOUT_MS` (podrazumevano 30s) putem "heavyweight" admission lease-ova (#11015). Novi zahtevi koji i dalje stignu do procesa dobijaju `503` + `Retry-After: 5`. Recreate praznina krajnje tačke dok zamena ne postane Ready ostaje potpuni prekid — to je SQLite topologija, a ne pogrešna konfiguracija proba.

Eksterni Postgres / multi-writer HA **nije** dokumentovana standardna putanja. Ako vam je potrebna HA, zadržite jednu repliku ili pokrenite topologiju koju je projekat testirao i posebno dokumentovao. Postgres/MySQL rad se nalazi u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dok to ne bude objavljeno, jedini podržani način za umnožavanje **velikog** `/v1/responses` kapaciteta je N nezavisnih procesa (sledeći odeljak), a ne `replicas > 1` na jednom volumenu.

## Skaliranje: N nezavisnih procesa

Jedan Node proces je **jedan V8 heap**. Dva preklapajuća ~3 MiB / ~750k-token coding-agent `POST /v1/responses` (RTK + Caveman) prekidaju taj heap na ~12 Gi (`FATAL ERROR: Reached heap limit`) i mogu izazvati OOM na 16 Gi cgroup-u. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). To mjerenje je upozorenje o **memorijskom budžetu**, a ne čvrsto ograničenje proizvoda od dva istovremena duga `/v1/responses`. Prijem zahtjevnih chatova je ograničen automatski izvedenim budžetom bajtova za unos (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dimenzioniranim prema istom V8/cgroup plafonu — povećanje tog ograničenja (ili postavljanje naslijeđenog `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ograničenja broja zahtjeva) na već dimenzioniranom procesu ponovo dovodi do prekida. Mali chatovi, `/healthz`, `/v1/models` i MCP **nisu** obuhvaćeni tim ograničenjem.

### Jedan proces: više od dva duga `/v1/responses`

**Zdrav** proces (heap ispod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, zadano `0.75`) **može** pokrenuti više od dva istovremena duga `POST /v1/responses` kada budžet bajtova u toku za cijeli proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) još uvijek ima prostora. Tijela zahtjeva na ili iznad `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (zadano 256 KiB) uzimaju isti zakup za zahtjevne procese kao i zahtjevi sa teškom strukturom i koriste isti [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` izlaz (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desetine istovremenih dugih SSE klijenata (operateri često trebaju 40–50) je pitanje **memorijskog budžeta** — veličina heap-a + primarni/headroom slotovi + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a ne čvrsto ograničenje proizvoda "maksimalno 2". Opterećen heap i dalje odbacuje zahtjeve sa `503` koji se može ponoviti, tako da se #7849 ne vraća.

Da biste **umnožili heap-ove** (nezavisne V8 old-spaces) **danas**:

| Učinite                                                                                                                                                             | Nemojte                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Pokrenite **N kontejnera/podova**, svaki sa **svojim** `DATA_DIR` / volumenom                                                                                       | Postavite `replicas > 1` na jednu SQLite datoteku                          |
| Dimenzionirajte heavy in-flight + healthy-headroom prema heap / inflight-byte budžetu; 1–2 je konzervativna #7849 zadana vrijednost, a ne čvrsti maksimum proizvoda | Dodijelite jednom procesu 8× RAM-a i neograničeno ograničenje broja        |
| Opcionalno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za **dijeljene brojače kvota**                                                                     | Tretirajte Redis kao dijeljeni SQLite — to nije                            |
| Duplicirajte tajne provajdera u svaku instancu (ili prihvatite particionisane kontrolne ploče)                                                                      | Očekujte jednu kontrolnu ploču / jedan zapis poziva kroz instance          |
| Postavite bilo koji balanser opterećenja ispred; sticky sesija po API ključu ili sesiji je dovoljna                                                                 | Zahtijevajte middleware specifičan za dobavljača koji je svjestan veličine |

Hardver: istovremeni dugi `/v1/responses` po instanci je pitanje **memorijskog budžeta** (heap + inflight-byte / #10110). `N` nezavisnih `DATA_DIR` direktorija i dalje umnožava heap-ove: RAM hosta mora pokriti `N × cgroup`, a ne "jedan 16 Gi pod sa N=8." Nikada ne koristite `replicas > 1` na jednoj SQLite datoteci.

Compose skica (dva heap-a, dva volumena — ne `deploy.replicas: 2`):

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

Gustoća unutar procesa (kompresija izvan HTTP izolacije) je [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jedan logički klaster na dijeljenom trajnom stanju je [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Važne napomene

- **SQLite WAL režim:** `docker stop` treba dozvoliti da se završi kako bi OmniRoute mogao izvršiti checkpoint najnovijih promjena nazad u `storage.sqlite`. Uključeni Compose fajlovi već postavljaju period čekanja od 40s prije zaustavljanja. Ako pokrećete sliku direktno, zadržite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Postavite na `true` ako se rutinske/pre-write sigurnosne kopije (backupi) upravljaju eksterno. Migracije postojeće baze podataka i dalje zahtijevaju vlastiti trajni sigurnosni snimak i zaštitu od masovne migracije.
- **Trajnost podataka:** Uvijek montirajte volumen na `/app/data` kako biste sačuvali bazu podataka, ključeve i konfiguracije nakon ponovnog pokretanja kontejnera.
- **Konfiguracija porta:** Nadjačajte `PORT` varijablu okruženja da biste promijenili zadani port `20128`.

## Vidi također

- [Vodič za VM implementaciju](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare podešavanje
- [Vodič za Fly.io implementaciju](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementacija na Fly.io
- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Kompletna referenca za `.env`
