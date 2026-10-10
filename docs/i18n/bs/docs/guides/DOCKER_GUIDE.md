# 🐳 Docker Guide — OmniRoute (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Potpuna referenca za implementaciju pomoću Dockera. Za brzi početak pogledajte [Docker odjeljak u README-u](../README.md#-docker).

## Sadržaj

- [Brzo pokretanje](#quick-run)
- [S datotekom okruženja](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupni profili](#available-profiles)
- [Konfiguriranje CLI alata glavnog sistema kada se OmniRoute izvršava u Dockeru](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis prateći kontejner](#redis-sidecar)
- [Produkcijski Compose](#production-compose)
- [Faze Dockerfilea](#dockerfile-stages)
- [Ključne varijable okruženja](#critical-environment-variables)
- [Docker Compose s Caddyjem (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Oznake slika](#image-tags)
- [Dostupnost: zadani SQLite podržava samo jednu repliku](#availability-default-sqlite-is-single-replica)
- [Gemini regionalne greške unutar Dockera](#gemini-regional-errors-inside-docker)
- [Važne napomene](#important-notes)

---

## Brzo pokretanje

> **Samostalno hostovanje jednom naredbom?** Pogledajte
> [Vodič za samostalno hostovanje](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika +
> Redis, samo povratna petlja, bez odabira profila). Brzo pokretanje u nastavku
> predstavlja pristup s jednim kontejnerom za korisnike koji Redis već pokreću drugdje.

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

# CLI profil (ugrađeni Claude Code, Codex i OpenClaw)
docker compose --profile cli up -d

# Profil glavnog sistema (prvenstveno za Linux; montira CLI izvršne datoteke glavnog sistema samo za čitanje)
docker compose --profile host up -d

# Web profil (Chromium/Playwright za pružaoce web sesija)
docker compose --profile web up -d

# Kombinirajte CLI + CLIProxyAPI prateći kontejner
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupni profili

OmniRoute dolazi s Compose profilima za glavne načine implementacije. Odaberite onaj koji odgovara vašem okruženju.

| Profil          | Servis           | Kada koristiti                                                                                                                                                             | Naredba                                      |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (zadani) | `omniroute-base` | Server bez grafičkog interfejsa / minimalno izvršno okruženje, bez uključenih CLI alata pružalaca                                                                          | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Agentski tokovi rada koji pozivaju `omniroute providers/setup/doctor` i uključene CLI alate (Codex, Claude Code, Droid, OpenClaw)                                          | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Linux glavni sistemi kojima je potreban pristup CLI alatima glavnog sistema poput `network_mode`, montiranjem `~/.local/bin`, `~/.codex`, `~/.claude` itd. samo za čitanje | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Pokrenite [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) kao prateći kontejner na portu `8317` za posredovanje prema nadređenim CLI servisima                 | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Pružaoci web sesija kojima je potreban preglednik: `gemini-web`, `claude-web`, `claude-turnstile` (gradi `runner-web`, Chromium je uključen)                               | `docker compose --profile web up -d`         |

> Moguće je kombinirati više profila: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguriranje CLI alata na hostu kada se OmniRoute pokreće u Dockeru

`omniroute setup-codex`, `setup-claude`, `config set <tool>` i dugme
**Sačuvaj konfiguraciju** na kontrolnoj ploči zapisuju datoteke poput `~/.codex/*.config.toml`. Te putanje
imaju značenje samo na računaru na kojem se CLI zaista pokreće. Ako ih pokrenete unutar
kontejnera, zapis završava u vlastitom početnom direktoriju kontejnera (`/home/node` —
slika se pokreće kao `USER node`), gdje ga nijedan CLI na hostu nikada neće pročitati i odakle se
briše čim se kontejner ponovo kreira.

OmniRoute to prepoznaje i odbija zapisivanje uz prikaz uputa, umjesto da
prijavi uspjeh koji ne možete iskoristiti: CLI završava s kodom `2`, a API odgovara statusom `422`
uz `containerEphemeralTarget: true`.

### Preporučeno: pokrenite CLI na hostu, a OmniRoute u Dockeru

Kontejner poslužuje API; CLI konfigurira vaše alate na hostu.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # usmjerite CLI na kontejner
omniroute setup-codex                      # zapisuje stvarni ~/.codex na vašem hostu
```

Ovo je pravi izbor kada se Codex, Claude Code, Cursor ili slični alati pokreću na vašem
laptopu — što je uobičajena postavka.

### Alternativa: povežite direktorije konfiguracije hosta pomoću bind mounta (`host` profil)

Ako želite da sam kontejner zapisuje konfiguraciju vašeg hosta, montirajte
direktorije i usmjerite `CLI_CONFIG_HOME` na korijenski direktorij mounta. Profil `host`
to već radi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount je ono što putanju čini pouzdanom: OmniRoute čita
`/proc/self/mountinfo` i dozvoljava zapisivanje u montirane putanje (kao i u direktorije
čiji su podređeni direktoriji mountovi, što je upravo struktura `/host-home` iznad), dok
i dalje odbija zapisivanje u nemontirane putanje.

### Izlaz u nuždi: konfigurirajte vlastite CLI-je kontejnera (koristite štedljivo)

Kada se CLI-jevi zaista nalaze unutar kontejnera (profil `cli`), zapisivanje
je namjerno. Proslijedite `--allow-container-write` bilo kojoj naredbi `setup-*` ili postavite
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` za server. Zapisivanje se izvršava
uz upozorenje da neće preživjeti ponovno kreiranje kontejnera.

> **Sigurnosno upozorenje — profil `cli` + mount za `docker.sock`.**
> Profil `cli` pomoću bind mounta montira `/var/run/docker.sock` kako bi program za
> automatsko ažuriranje unutar kontejnera mogao ponovo kreirati skup servisa putem daemona hosta
> (`src/lib/system/autoUpdate.ts` provjerava taj socket i preskače
> Docker putanju kada nije prisutan). Taj socket je **granica povjerenja s root pristupom
> hostu**: sve što mu može pristupiti upravlja Docker daemonom hosta kao
> root — može kreirati, pregledavati, zaustavljati i uklanjati bilo koji kontejner na hostu.
> Posljedice:
>
> 1. **Nikada ne izlažite port profila `cli` mreži.** Objavite
>    ga na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupan putem LAN-a pretvara bilo kakav RCE na nivou kontrolne ploče u
>    potpunu kompromitaciju hosta.
> 2. **Ne povezujte dodatne direktorije hosta s profilom `cli`.**
>    Docker socket u kombinaciji s bilo kojim dodatnim mountom daje kontejneru potpuni
>    pristup za čitanje i pisanje po vašem sistemu datoteka i konfiguraciji hosta. Ako je potrebno da
>    alat vidi projekt, pokrenite ga lokalno pomoću CLI binarne datoteke — nemojte ga montirati
>    u `cli` kontejner.
>
> Ako vam nije potrebno automatsko ažuriranje unutar kontejnera, nemojte uključivati profil `cli`
> (`COMPOSE_PROFILES=core,redis` ili kraće). Ostali profili ne
> montiraju Docker socket.
>
> Pogledajte `docs/security/MITM-TPROXY-DECRYPT.md` (git; nije ugrađen u `/docs`) za povezani model prijetnji
> vezan za MITM, a `docs/security/SUPPLY_CHAIN.md` za lanac porijekla binarnih datoteka
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis sidecar

OmniRoute se oslanja na Redis za podršku distribuiranom ograničavaču brzine i dijeljenoj predmemoriji. Servis `redis` je **uvijek definisan** u datoteci `docker-compose.yml` (nije ograničen profilom) i pokreće se zajedno s bilo kojim drugim profilom.

| Detalj                 | Vrijednost                             |
| ---------------------- | -------------------------------------- |
| Slika                  | `redis:7-alpine`                       |
| Naziv kontejnera       | `omniroute-redis`                      |
| Interni port           | `6379`                                 |
| Port hosta (izmjena)   | `REDIS_PORT` (zadano `6379`)           |
| Adresa hosta (izmjena) | `REDIS_BIND_HOST` (zadano `127.0.0.1`) |
| Volumen                | `omniroute-redis-data` → `/data`       |
| Provjera ispravnosti   | `redis-cli ping` (interval od 10 s)    |

Povezane varijable okruženja:

- `REDIS_URL` — niz za povezivanje koji se prosljeđuje aplikaciji (zadano `redis://redis:6379`).
- `REDIS_PORT` — mapiranje porta na strani hosta za Redis kontejner.
- `REDIS_BIND_HOST` — interfejs hosta na kojem se port objavljuje. Zadano je `127.0.0.1`.

> **Zašto se zadano koristi povratna petlja:** sidecar se pokreće bez opcije `requirepass`, a kontejneri
> aplikacije pristupaju mu preko compose mreže (`redis:6379`) — objavljeni port
> služi samo za alate na strani hosta (`redis-cli`, lokalni `npm run dev`). Objavljivanje na
> `0.0.0.0` izložilo bi Redis bez autentifikacije svakom hostu na vašoj LAN mreži. Ako postavite
> `REDIS_BIND_HOST=0.0.0.0`, dodajte i `--requirepass` u `command:` servisa.

**Onemogućavanje Redisa** se ne preporučuje (ograničavač brzine preći će na rezervnu implementaciju u memoriji). Ako to ipak morate uraditi, uklonite ili komentarišite blok servisa `redis:` u datoteci `docker-compose.yml` ili smanjite broj njegovih instanci na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkcijski Compose

Za izolovani produkcijski snimak koji se izvršava paralelno s razvojnim okruženjem koristite `docker-compose.prod.yml`.

| Detalj                      | Vrijednost                                                                          |
| --------------------------- | ----------------------------------------------------------------------------------- |
| Datoteka                    | `docker-compose.prod.yml`                                                           |
| Zadani port kontrolne ploče | `PROD_DASHBOARD_PORT=20130` (mapiran na interni `${DASHBOARD_PORT:-20128}`)         |
| Zadani API port             | `PROD_API_PORT=20131`                                                               |
| Slika                       | `omniroute:prod` (izgrađena iz cilja `runner-cli`)                                  |
| Redis kontejner             | `omniroute-redis-prod` (`redis:8.6.2`, namjenski volumen `redis-prod-data`)         |
| Podatkovni volumen          | `omniroute-prod-data` (imenovan, zadržava se između ponovnih izgradnji)             |
| Provjere ispravnosti        | `node healthcheck.mjs` + `redis-cli ping`, uz `depends_on` uslovljen stanjem Redisa |

Način korištenja:

```bash
# Izgradite i pokrenite produkcijski skup
docker compose -f docker-compose.prod.yml up -d --build

# Pratite zapisnike u stvarnom vremenu
docker compose -f docker-compose.prod.yml logs -f

# Zaustavite skup (zadržite volumene)
docker compose -f docker-compose.prod.yml down
```

Produkcijski skup izvršava se paralelno s razvojnim compose okruženjem (različiti nazivi kontejnera, portovi i volumeni), tako da možete nastaviti lokalni razvoj dok produkcijsko okruženje ostaje aktivno.

## Faze Dockerfilea

Repozitorij isporučuje višefazni Dockerfile (`Dockerfile`). Dostupne su četiri faze; odaberite odgovarajući `target` za svoj slučaj upotrebe.

| Faza          | Osnovna slika         | Namjena                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalira zavisnosti (`npm ci --legacy-peer-deps`) i pokreće `npm run build` (Turbopack prema zadanim postavkama — pogledajte Resurse tokom izgradnje ispod)                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Produkcijsko izvršno okruženje sa samostalnim Next.js izlazom. **Ne sadrži CLI alate pružalaca.**                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` i globalne CLI alate: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Odaberite ovo za agentske radne tokove.**                                                                                                        |
| `runner-web`  | `runner-base`         | Dodaje Playwright + Chromium preglednik (`--with-deps`) za pružaoce web-sesija: `gemini-web`, `claude-web`, `claude-turnstile`. **Odaberite ovo kada koristite te pružaoce** — obična slika ne uspijeva prilikom zahtjeva bez toga (pogledajte napomenu o `-web` pod Kanalima izdanja). |

Ručno izgradite određeni cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Resursi tokom izgradnje

Tri argumenta izgradnje određuju koliko resursa troši faza `builder`. Primjenjuju se samo tokom izgradnje —
`OMNIROUTE_MEMORY_MB` (ispod) je zasebna postavka za vrijeme izvršavanja.

| Argument izgradnje          | Zadano | Efekat                                                                                                         |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` gradi pomoću webpacka: manja vršna potrošnja memorije, sporije. `1` uključuje Turbopack.                   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Ograničenje V8 heapa (`--max-old-space-size`) za pokrenuti `next build`.                                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Prosljeđuje vrijednost u `CIRCLE_NODE_TOTAL`; Next izvodi `workers = N - 1` za prikupljanje podataka stranica. |

`OMNIROUTE_BUILD_WORKERS` treba povećati na moćnom sistemu za izgradnju, a prvo
provjeriti kada izgradnja s ograničenim resursima ne uspije **nakon** poruke `✓ Compiled successfully`. Svaki
radnik za podatke stranica zaseban je proces, kao i sam nadređeni proces `next build`;
reprodukcija na aktivnom VPS-u (problem #7518) izmjerila je vršni RSS svakog procesa
na ~4.5 GB, nezavisno od oznake heapa `NODE_OPTIONS` (Turbopack kompajlira koristeći
nativnu/Rust memoriju izvan V8 heapa). Zadana vrijednost `2` (→ 1 radnik, ukupno 2
procesa) prilagođena je GitHubovim hostovanim izvršnim sistemima sa 16 GB / 4 vCPU-a koje
koristi proces objavljivanja. Pri vrijednosti `8` (→ 7 radnika) tom je sistemu ponestalo memorije i
buildkit nije uspio izvršiti korak uz poruku `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 radnika) i dalje nije stalo u memoriju nakon što je RSS po procesu izmjeren
direktno umjesto procijenjen. `tests/unit/docker-build-memory-budget.test.ts`
izvodi izračun na osnovu izmjerene vrijednosti i ne uspijeva ako bilo koja postavka
preraste kapacitet izvršnog sistema.

Turbopack kompajlira koristeći nativnu Rust memoriju koja se nalazi **izvan** V8 heapa, pa je
`OMNIROUTE_BUILD_MEMORY_MB` ne ograničava. Na hostu s ograničenjem memorije
OOM killer tada prekida izgradnju signalom SIGKILL bez ikakvog teksta greške — ona se jednostavno
zaustavi usred poruke `Creating an optimized production build`, što više djeluje kao zastoj
nego kao nedostatak memorije. Zato `Dockerfile` prema zadanim postavkama koristi webpack
(`OMNIROUTE_USE_TURBOPACK=0`), za razliku od `npm run dev` / `npm run build`, gdje je
Turbopack zadana opcija u kodu: obični `docker build .` bez argumenata izgradnje (što
pokreću Railway i drugi hostovi s instalacijom jednim klikom) ne smije se neprimjetno prekinuti na
sistemu za izgradnju s ograničenom memorijom. Objavljene slike već eksplicitno prosljeđuju
`OMNIROUTE_USE_TURBOPACK=0` u `docker-publish.yml`. Na sistemu za izgradnju s mnogo RAM-a
uključite Turbopack radi brže izgradnje:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogućen, pa `next build` pokreće nadređeni **i** radni
proces, a svaki zasebno poštuje `OMNIROUTE_BUILD_MEMORY_MB`. Postavite ograničenje
kontejnera na približno dvostruku vrijednost, a ne jednostruku.

Izmjereno na ovom stablu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Alat za pakovanje | Ograničenje kontejnera | Rezultat                                   |
| ----------------- | ---------------------- | ------------------------------------------ |
| Turbopack         | 8 GiB / 16 GiB         | OOM ga je prekinuo pri oba, bez poruke     |
| webpack           | 8 GiB                  | radni proces izgradnje prekinut SIGKILL-om |
| webpack           | 12 GiB                 | uspjelo, vršna potrošnja 11.1 GiB          |

### Zadane postavke za vrijeme izvršavanja

Zadane vrijednosti koje izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Ponašanje memorije u Dockeru:

- Slika postavlja `OMNIROUTE_MEMORY_MB=1024` i iz njega izvodi `NODE_OPTIONS=--max-old-space-size=1024`.
- Stvarni serverski proces pokreće samostalni pokretač, koji čita `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node koristi posljednju ponovljenu vrijednost `--max-old-space-size`, pa postavljanje `OMNIROUTE_MEMORY_MB` kontrolira efektivno Docker ograničenje heap memorije.
- Budući da ga slika uvijek postavlja, vlastita rezervna vrijednost pokretača, kalibrirana prema RAM-u, nikada se ne primjenjuje unutar Dockera. Eksplicitno je povećajte prema radnom opterećenju (tabela ispod). `2048` je i dalje premalo za `/v1/responses` agenta za programiranje.

### RAM tokom izvođenja za agente za programiranje

Dockerova zadana vrijednost od 1 GiB predstavlja minimum za kontrolnu ploču i lagani chat, a ne veličinu za produkciju. Duga tijela zahtjeva `POST /v1/responses` (stotine poruka, deseci alata) tokom kompresije zadržavaju više grafova u memoriji. Dva preklapajuća zahtjeva veličine ~3 MiB / ~750k tokena prekinula su V8 pri **12 GiB** old-space memorije (`FATAL ERROR: Reached heap limit`) i također izazvala OOM cgroupa od 16 GiB. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Postavite veličinu **cgroup `--memory` iznad heap memorije** — izvorni međuspremnici, SQLite i međurezultati kompresije nalaze se izvan V8.

| Radno opterećenje                                | `OMNIROUTE_MEMORY_MB`     | Kontejner / cgroup           | Napomene                                                                                                                        |
| ------------------------------------------------ | ------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Kontrolna ploča, jedan lagani chat               | `1024` (zadano u slici)   | ≥2 GiB                       |                                                                                                                                 |
| Jedan agent za programiranje (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                      | Tipična pojedinačna sesija `/v1/responses`                                                                                      |
| Dva istovremena duga zahtjeva `/v1/responses`    | `10240`–`12288`           | ≥12–16 GiB                   | Izmjeren prekid V8 pri ~12 GiB heap memorije                                                                                    |
| Tri ili više istovremenih dugih konteksta        | nemojte na jednom procesu | serijalizirajte / više RAM-a | Zadano ograničenje za zahtjevna opterećenja je 1 aktivni zahtjev; njegovo povećavanje bez dodatnog RAM-a ponovo uzrokuje prekid |

`omniroute serve` na fizičkom sistemu kalibrira ~35% RAM-a (ograničeno na `[512, 4096]`) kada `OMNIROUTE_MEMORY_MB` **nije postavljen**. Docker uvijek postavlja `1024`, pa se ta kalibracija nikada ne izvršava u službenoj slici.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritične varijable okruženja

Pored zadanih vrijednosti dokumentovanih u [ENVIRONMENT.md](../reference/ENVIRONMENT.md), sljedeće varijable su najvažnije pri pokretanju unutar Dockera:

| Varijabla                     | Svrha                                                                                                                                                                                                                                                                  | Zadana vrijednost               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Zajednička tajna za WebSocket most. **Obavezna u produkciji** — postavite je na snažan nasumični niz znakova.                                                                                                                                                          | nije postavljeno (obavezno)     |
| `REDIS_URL`                   | Niz za povezivanje s pozadinskim sistemom za ograničavanje brzine / keširanje                                                                                                                                                                                          | `redis://redis:6379`            |
| `REDIS_PORT`                  | Port na strani domaćina za priloženi Redis kontejner                                                                                                                                                                                                                   | `6379`                          |
| `REDIS_BIND_HOST`             | Interfejs domaćina na kojem se objavljuje port priloženog Redis kontejnera (povratna petlja osim ako ne dodate AUTH)                                                                                                                                                   | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Putanja domaćina montirana u profil `cli` na `/workspace/omniroute` za tokove rada samostalnog ažuriranja                                                                                                                                                              | `.` (trenutni direktorij)       |
| `OMNIROUTE_MEMORY_MB`         | Ograničenje Node hrpe tokom izvođenja za samostalni Docker server; nadjačava zadanu vrijednost slike navedenu iznad. Agenti za programiranje: `8192`+ (pogledajte [RAM tokom izvođenja](#runtime-ram-for-coding-agents)).                                              | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Nadjačava izložene portove za nadzornu ploču (20128) i API (20129)                                                                                                                                                                                                     | `20128` / `20129`               |
| `APP_BIND_HOST`               | Interfejs domaćina na kojem docker-compose objavljuje portove nadzorne ploče/API-ja/live-WS-a. Kada je `REQUIRE_API_KEY=false` (zadana vrijednost), `0.0.0.0` izlaže anonimni `/v1` proxy LAN-u — proširite pristup samo uz `REQUIRE_API_KEY=true` ili reverzni proxy. | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | Interfejs domaćina na kojem docker-compose objavljuje pomoćni kontejner `cliproxyapi` — njegov podatkovni volumen sadrži vjerodajnice pružatelja usluga.                                                                                                               | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Direktorij koji skener dodataka tokom izvođenja čita i u koji ih instalira. Postavite ga kada su dodaci montirani povezivanjem: zadana vrijednost prati `HOME`, koji slika ne mora izvesti.                                                                            | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | URL podputanja kada je aplikacija objavljena iza reverznog proxyja (npr. `/omniroute`)                                                                                                                                                                                 | _(prazno = korijenska putanja)_ |
| `NEXT_PUBLIC_BASE_URL`        | Javno ishodište preglednika uključujući podputanju (npr. `https://host/omniroute`)                                                                                                                                                                                     | nije postavljeno                |
| `PROD_DASHBOARD_PORT`         | Port nadzorne ploče na strani domaćina za `docker-compose.prod.yml`                                                                                                                                                                                                    | `20130`                         |
| `CLIPROXYAPI_PORT`            | Port na strani domaćina za pomoćni kontejner `cliproxyapi`                                                                                                                                                                                                             | `8317`                          |

## Obrnuti proxy na podputanji (Traefik / nginx)

Next.js `basePath` se ugrađuje u samostalni paket. OmniRoute bilježi ugrađenu
vrijednost u sentinel datoteci u korijenu aplikacije (zapisuje se tokom `npm run build`; čita je
`scripts/docker/ensure-docker-base-path.mjs`) i poredi je s
`OMNIROUTE_BASE_PATH` prilikom pokretanja kontejnera. Kada se razlikuju, a slika je
izgrađena za korijen domene, ulazna tačka prepravlja samostalne manifeste,
ugrađene `basePath`/`assetPrefix` literale (Next 16 generiše URL-ove SSR resursa samo iz
`assetPrefix` — alat za izmjene preslikava podputanju i u njega), ugrađene
URL-ove resursa `/_next/static` (manifesti klijentskih referenci, uvozi medija, unaprijed generisane
stranice grešaka) i klijentski `process.env` shim prije nego što se pokrene
`node dev/run-standalone.mjs`.

### Izgradnja pomoću Composea (preporučeno)

Postavite obje varijable u `.env`, a zatim ponovo izgradite kako bi slika i izvršno okruženje bili usklađeni:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` prosljeđuje `OMNIROUTE_BASE_PATH` kao Docker argument izgradnje i kao
varijablu izvršnog okruženja.

### Unaprijed izgrađena korijenska slika + podputanja u izvršnom okruženju

Objavljene slike `diegosouzapw/omniroute:*` izgrađene su za korijen domene. I dalje možete
postaviti `OMNIROUTE_BASE_PATH` u izvršnom okruženju; kontejner jednom zakrpi paket pri pokretanju.
Uparite ga s odgovarajućim javnim izvorištem:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurišite obrnuti proxy da prosljeđuje **punu** vanjsku putanju (nemojte uklanjati
prefiks). Traefik treba usmjeravati `PathPrefix(`/omniroute`)` prema kontejneru bez
`StripPrefix`, kako bi Next.js primao `/omniroute/...` i posluživao resurse iz
`/omniroute/_next/...`.

Docker provjera zdravlja ispituje laganu krajnju tačku životnog ciklusa `/healthz`, kojoj je dodat
prefiks aktivnog `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostaje dostupan za
dijagnostiku koju obavljaju korisnici ili kontrolne ploče; da biste HEALTHCHECK kontejnera ponovo usmjerili na nju (naprimjer,
radi detaljne provjere zdravlja), postavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ta putanja predstavlja **detaljnu** provjeru (baza podataka + sažetak nadzora) — prikladnu za Dockerov
rijetki `HEALTHCHECK` ako ga ponovo uključite, ali **ne** za intervale Kubernetesovog `livenessProbe`.

Za orkestratore (Kubernetes, Nomad itd.):

| Provjera            | Preporučeno                                                         | Izbjegavati                                                               |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Aktivnost           | HTTP `GET /livez` ili TCP na glavnom portu (`PORT`, zadano `20128`) | `/api/monitoring/health` kao provjeru aktivnosti                          |
| Spremnost           | HTTP `GET /healthz`                                                 | Kratka vremenska ograničenja koja zauzetu petlju događaja smatraju mrtvom |
| Detaljna / blackbox | `/api/monitoring/health`                                            | —                                                                         |

`/healthz` izvještava o životnom ciklusu procesa (`ok` / `starting` / `stopping`). `/livez` samo
provjerava je li proces aktivan (200 kad god se rukovalac može izvršiti; ne čeka
spremnost). Obje se i dalje izvršavaju na istoj Node petlji događaja kao i obrada zahtjeva, pa ih
CPU-intenzivna obrada kataloga ili kompresija može odgoditi — zauzeto ≠ mrtvo. Dajte prednost TCP
provjeri aktivnosti ako HTTP provjere prekorače vremensko ograničenje. Potpune smjernice za provjere:
[Vodič za nadzor — preporuke za Kubernetes provjere](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddyjem (HTTPS Auto-TLS)

OmniRoute se može sigurno izložiti pomoću Caddyjevog automatskog osiguravanja SSL-a. Pobrinite se da DNS A zapis vaše domene pokazuje na IP adresu vašeg servera.

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
      # Izvor vidljiv pregledniku za OAuth povratne pozive, linkove kontrolne ploče i generirane javne URL-ove.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interni URL između servera za zakazane zadatke / samostalne zahtjeve.
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

Caddy postavlja standardna zaglavlja za prosljeđivanje prema nadređenom kontejneru. OmniRoute koristi
`NEXT_PUBLIC_BASE_URL` kao kanonski javni izvor za OAuth povratne pozive i generirane javne
linkove; autentificirani upisi na kontrolnoj ploči koriste zahtjeve istog izvora uz CSRF
zaštitu vezanu za sesiju. Omogućite `OMNIROUTE_TRUST_PROXY` samo za napredne implementacije u kojima namjerno
želite da OmniRoute izvodi javni izvor iz pouzdanih proslijeđenih zaglavlja umjesto iz eksplicitne
konfiguracije.

## Cloudflare Quick Tunnel

Podrška kontrolne ploče za Docker implementacije uključuje **Cloudflare Quick Tunnel** koji se pokreće jednim klikom na `Dashboard → Endpoints`. Pri prvom omogućavanju preuzima se `cloudflared` samo kada je potreban, pokreće se privremeni tunel do vaše trenutne `/v1` krajnje tačke i prikazuje generirani `https://*.trycloudflare.com/v1` URL direktno ispod vašeg uobičajenog javnog URL-a.

Paneli tunela krajnjih tačaka (Cloudflare, Tailscale, ngrok) mogu se prikazati ili sakriti putem `Settings → Appearance` bez promjene aktivnog stanja tunela.

### Napomene o tunelu

- Quick Tunnel URL-ovi su privremeni i mijenjaju se nakon svakog ponovnog pokretanja.
- Quick Tunnel tuneli se ne obnavljaju automatski nakon ponovnog pokretanja OmniRoutea ili kontejnera. Ponovo ih omogućite putem kontrolne ploče kada budu potrebni.
- Upravljana instalacija trenutno podržava Linux, macOS i Windows na `x64` / `arm64`.
- Upravljani Quick Tunnel tuneli zadano koriste HTTP/2 transport kako bi izbjegli bučna upozorenja o QUIC UDP međuspremniku u ograničenim kontejnerskim okruženjima. Postavite `CLOUDFLARED_PROTOCOL=quic` ili `auto` ako želite drugačiji transport.
- Docker slike sadrže sistemske CA korijenske certifikate i prosljeđuju ih upravljanom `cloudflared` procesu, čime se izbjegavaju greške TLS pouzdanosti kada se tunel pokreće unutar kontejnera.
- Postavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ako želite da OmniRoute koristi postojeću binarnu datoteku umjesto preuzimanja nove.

## Oznake slika

| Slika                    | Oznaka   | Veličina | Opis                                                   |
| ------------------------ | -------- | -------- | ------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Najviši **objavljeni** stabilni SemVer (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Fiksirajte ovu klasu oznake za GitOps                  |

Manifest za više platformi: izvorni `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatski bira odgovarajuću arhitekturu; proslijedite `--platform linux/amd64` ako trebate prisiliti AMD64 emulaciju na ARM hostovima.

### Kanali izdanja

OmniRoute objavljuje zasebne Docker kanale za stabilna izdanja, aktivno testiranje grane izdanja i razvojne verzije.

| Kanal                           | Izvor                                  | Promjenjivost                     | Preporučena upotreba                                                                                                         |
| ------------------------------- | -------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Potpisano/verzionirano izdanje         | Nepromjenjivo                     | Produkcijske implementacije koje fiksiraju tačno izdanje                                                                     |
| `:latest` / `:latest-web`       | Najviši **objavljeni** stabilni SemVer | Promjenjivi stabilni pokazivač    | Prati stabilna izdanja **nakon** SemVer zadatka objavljivanja — **ne** prati `main` niti neobjavljene `release/v*` commitove |
| `:next` / `:next-web`           | Trenutna zadana `release/v*` grana     | Promjenjivi pokazivač predizdanja | Testiranje ispravki koje su dospjele na aktivnu granu izdanja, ali još nisu u stabilnom izdanju                              |
| `:main` / `:main-web`           | `main` grana                           | Promjenjivi razvojni pokazivač    | Samo za razvojno i integracijsko testiranje                                                                                  |

#### Pružaoci web sesija: `-web` slike

Svaki gornji kanal ima i odgovarajuću `-web` oznaku (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), izgrađenu iz `runner-web` faze — ista slika uz Playwright i Chromium preglednik. Obična slika isporučuje se **bez** Chromiuma; `gemini-web`, `claude-web` i `claude-turnstile` ga zahtijevaju.

Greška je odgođena i ne javlja se pri pokretanju: ti pružaoci navode svoje modele i prikazuju se kao povezani na kontrolnoj ploči, a tek prvi zahtjev završava greškom

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ako koristite te pružaoce, preuzmite `-web` oznaku kanala koji već koristite — ništa drugo se ne mijenja. Kod npm/CLI instalacije (bez Docker slike), odgovarajući dio koji nedostaje jeste binarna datoteka preglednika: pokrenite `npx playwright install chromium` na hostu.

#### Korištenje kanala predizdanja

Kanal `next` se ponovo izgrađuje pri svakom slanju promjena na trenutnu zadanu granu `release/v*` i objavljuje se za AMD64 i ARM64. Starije grane za održavanje ga ne mogu prepisati. Kanal pruža sliku koja se može preuzeti i koja sadrži ispravke spojene u aktivnu granu izdanja prije nego što se objavi sljedeća stabilna oznaka.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose zamijenite oznaku slike koju koristi odabrani profil, a zatim preuzmite sliku i ponovo kreirajte uslugu:

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

`next` je promjenjivi kanal predizdanja. Može se promijeniti pri svakom slanju promjena na aktivnu granu izdanja i **nije podržan za produkcijsku upotrebu**. Prilikom evaluacije određene verzije prikvačite sažetak slike:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prije testiranja napravite sigurnosnu kopiju OmniRoute volumena podataka ili montiranog direktorija podataka. Za vraćanje na prethodnu verziju ponovo postavite ranije korištenu stabilnu verziju ili sažetak i ponovo kreirajte kontejner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Izgradnja grane izdanja nikada ne može pomjeriti `latest`; samo odgovarajuća stabilna semantička verzija može ažurirati stabilni pokazivač. Slike `next` zadržavaju provjeru slike izdanja i blokirajući prag za CRITICAL ranjivosti.

**`latest` nije garancija ažurnosti u odnosu na git.** Spojene ispravke na grani `main` ili aktivnoj grani `release/v*` **nisu** uključene u `:latest` sve dok se ne objavi stabilna SemVer slika i zadatak objavljivanja ne promovira `:latest` (isti sažetak kao za tu SemVer verziju). Ako se čini da je `latest` nepromijenjen dok GitHub već prikazuje ispravku, preuzmite `:next` kako biste testirali granu izdanja ili pričekajte SemVer oznaku.

| Šta želite                                                                            | Koristite                               |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / produkciju koja ne smije neočekivano mijenjati verziju                       | Prikvačite `:X.Y.Z` (ili sažetak slike) |
| Pratiti objavljene stabilne verzije i prihvatiti ponovno kreiranje pri svakom izdanju | `:latest`                               |
| Testirati neobjavljene commitove grane `release/v*`                                   | `:next` (nije za produkciju)            |
| Testirati `main`                                                                      | `:main` (nije za produkciju)            |

## Dostupnost: zadani SQLite podržava samo jednu repliku

Standardni Docker / Kubernetes OmniRoute je **jedan Node proces + jedan SQLite proces za pisanje**. Visoka dostupnost **nije podržana** u toj topologiji.

| Ograničenje                                                 | Posljedica                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jedan proces za pisanje                                     | **Nemojte** pokretati više replika nad istom SQLite datotekom. To će oštetiti bazu podataka.                                                                                                                                                                                                                                                            |
| Ponovno kreiranje / pokretanje / prekid putem HEALTHCHECK-a | **Potpuni prekid rada** aktivnih SSE veza, sesija kontrolne ploče i stanja u memoriji. Veza sa svakim povezanim klijentom se prekida. Novi zahtjevi tokom perioda bez krajnjih tačaka dobijaju odgovor obrnutog proxyja **`502 Bad Gateway: Unknown error`**, a ne OmniRoute JSON — klijenti to ne mogu razlikovati od greške pružaoca usluge (#11015). |
| Ista petlja događaja kao `/healthz`                         | Obrada zauzetog kataloga ili ciklus kompresije mogu odgoditi provjere; kratko vremensko ograničenje tada ponovo pokreće **jedinu** repliku.                                                                                                                                                                                                             |

**Matrica provjera** (pogledajte i [preporuke za Kubernetes provjere](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Provjera            | Cilj                                                     | Nemojte koristiti                                                         |
| ------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| Provjera aktivnosti | TCP na `PORT` (zadano `20128`) ili blagi HTTP `/healthz` | `/api/monitoring/health`                                                  |
| Provjera spremnosti | HTTP `GET /healthz`                                      | Kratka vremenska ograničenja koja zauzetu petlju događaja smatraju mrtvom |
| Dubinska / za ljude | `/api/monitoring/health`                                 | Automatiziranu kubelet provjeru aktivnosti                                |

**Nadogradnje:** očekujte prekid svake sesije. Ako možete, postepeno odspojite klijente; na zadanom SQLiteu nema postupnog ažuriranja. Compose `restart: unless-stopped` zajedno s Docker `HEALTHCHECK` provjerom također će zamijeniti jedini proces kada kontejner postane Unhealthy — uz isti opseg posljedica.

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

Pauza `preStop` omogućava kubeu da ukloni krajnje tačke Servicea prije SIGTERM-a, tako da **novi** saobraćaj prestane dolaziti do procesa koji se gasi. Aktivni `/v1/responses` SSE zahtjevi dovršavaju se u roku do `SHUTDOWN_TIMEOUT_MS` (zadano 30 s) putem zahtjevnih rezervacija za prijem (#11015). Novi zahtjevi koji ipak stignu do procesa dobijaju `503` + `Retry-After: 5`. Period bez krajnjih tačaka tokom Recreate postupka, sve dok zamjena ne bude Ready, ostaje potpuni prekid rada — to je posljedica SQLite topologije, a ne pogrešne konfiguracije provjere.

Vanjski Postgres / HA s više procesa za pisanje **nije** dokumentiran standardni način rada. Ako vam je potreban HA, zadržite jednu repliku ili koristite topologiju koju je projekt zasebno testirao i dokumentirao. Rad na podršci za Postgres/MySQL nalazi se u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dok to ne bude objavljeno, jedini podržani način povećanja kapaciteta za **velike** `/v1/responses` zahtjeve jesu N nezavisnih procesa (sljedeći odjeljak), a ne `replicas > 1` na jednom volumenu.

## Horizontalno skaliranje: N nezavisnih procesa

Jedan Node proces predstavlja **jednu V8 hrpu**. Dva preklapajuća zahtjeva agenta za kodiranje `POST /v1/responses` (RTK + Caveman), svaki veličine ~3 MiB / ~750k tokena, prekidaju tu hrpu na ~12 Gi (`FATAL ERROR: Reached heap limit`) i mogu izazvati OOM u cgroupu od 16 Gi. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). To mjerenje je upozorenje o **memorijskom budžetu**, a ne čvrsto ograničenje proizvoda na dva istovremena duga zahtjeva `/v1/responses`. Prihvat zahtjevnih chatova ograničen je automatski izvedenim budžetom ulaznih bajtova (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimenzioniranim prema istom ograničenju V8/cgroupa — povećavanje tog ograničenja (ili postavljanje zastarjelog ograničenja broja zahtjeva `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) na već dimenzioniranom procesu ponovo dovodi do prekida. Mali chatovi, `/healthz`, `/v1/models` i MCP **nisu** uključeni u to ograničenje.

### Jedan proces: više od dva duga zahtjeva `/v1/responses`

**Zdrav** proces (hrpa ispod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, zadano `0.75`) **može** izvršavati više od dva istovremena duga zahtjeva `POST /v1/responses` kada u budžetu bajtova zahtjeva u obradi na nivou procesa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) još uvijek ima prostora. Tijela veličine jednake ili veće od `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (zadano 256 KiB) koriste istu rezervaciju za zahtjevne operacije kao strukturno složeni zahtjevi i isti izlaz `tryAcquireHealthyHeadroom` iz [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desetine istovremenih dugotrajnih SSE klijenata (operatorima je često potrebno 40–50) predstavljaju pitanje **memorijskog budžeta** — dimenzionirajte hrpu + primarne/dodatne slotove + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a ne čvrsto ograničenje proizvoda na „najviše 2“. Proces čija je hrpa pod pritiskom i dalje odbacuje zahtjeve uz ponovljivi odgovor `503`, kako se problem #7849 ne bi ponovio.

Za **umnožavanje hrpa** (nezavisnih V8 old-space prostora) **danas**:

| Radite                                                                                                                                                                                                     | Nemojte                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Pokrenite **N kontejnera/podova**, svaki sa **sopstvenim** `DATA_DIR` / volumenom                                                                                                                          | Postaviti `replicas > 1` nad jednom SQLite datotekom                         |
| Dimenzionirajte zahtjevne zahtjeve u obradi + dodatni kapacitet za zdravo stanje prema hrpi / budžetu bajtova u obradi; 1–2 je konzervativna zadana vrijednost za #7849, a ne čvrsto ograničenje proizvoda | Dodijeliti jednom procesu 8× RAM-a i neograničeno ograničenje broja zahtjeva |
| Opcionalno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za **zajedničke brojače kvota**                                                                                                           | Tretirati Redis kao zajednički SQLite — nije to                              |
| Kopirajte tajne pružalaca usluga u svaku instancu (ili prihvatite odvojene nadzorne ploče)                                                                                                                 | Očekivati jednu nadzornu ploču / jedan zapisnik poziva za sve instance       |
| Postavite bilo koji balanser opterećenja ispred instanci; vezivanje prema API ključu ili sesiji je dovoljno                                                                                                | Zahtijevati middleware specifičan za dobavljača koji uzima u obzir veličinu  |

Hardver: broj istovremenih dugih zahtjeva `/v1/responses` po instanci predstavlja pitanje **memorijskog budžeta** (hrpa + bajtovi u obradi / #10110). `N` nezavisnih direktorija `DATA_DIR` i dalje umnožava hrpe: RAM hosta mora podržavati `N × cgroup`, a ne „jedan pod od 16 Gi sa N=8“. Nikada nemojte koristiti `replicas > 1` nad jednom SQLite datotekom.

Primjer Compose konfiguracije (dvije hrpe, dva volumena — ne `deploy.replicas: 2`):

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

Gustoća unutar procesa (kompresija izvan HTTP izolata) opisana je u [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jedan logički klaster na zajedničkom trajnom stanju opisan je u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini regionalne greške unutar Dockera

Google AI Studio / Gemini API može vratiti HTTP 400 s FAILED_PRECONDITION i porukom
`Lokacija korisnika nije podržana za korištenje API-ja.` Uspješan zahtjev na hostu
ne dokazuje da kontejner koristi istu izlaznu rutu. Redoslijed DNS-a,
IPv4/IPv6 povezivost, VPN usmjeravanje i konfigurirani proxy serveri mogu se razlikovati. Provjerite
[Googleove podržane regije](https://ai.google.dev/gemini-api/docs/available-regions)
kao i stvarnu rutu veze; ova greška sama po sebi ne ukazuje na neispravan API ključ.

### Dajte prednost proxyju specifičnom za vezu

Koristite OmniRouteovu [konfiguraciju proxyja po vezi](../ops/PROXY_GUIDE.md#4-level-proxy-system)
za pogođenu Gemini vezu, a zatim ponovite **Testiranje veze** i mali zahtjev
s istim modelom. Time se promjena usmjeravanja ograničava na tu vezu. Provjerite
je li proxy dostupan iz kontejnera i koristi li ga veza zaista.
Promjena rute ne garantuje regionalnu prihvatljivost kod uzvodnog pružaoca usluge.

### Uporedite mrežne postavke hosta i kontejnera

Ključ, model i zahtjev moraju ostati identični pri poređenju autentificiranih rezultata; nikada
nemojte unositi pristupne podatke, lozinke proxyja ili kompletna autorizacijska zaglavlja u prijavu problema.
Najprije provjerite koje porodice adresa nudi OS razrješivač, koristeći istu naredbu
na hostu i unutar kontejnera:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Zamijenite `omniroute` servisom koji koristite (na primjer, `omniroute-web`). Ove
naredbe ispisuju porodice adresa bez pristupnih podataka ili IP adresa. Vraćena vrijednost `6`
pokazuje samo IPv6 DNS rezultat: ona **ne** dokazuje postojanje upotrebljive IPv6 rute ili pristupa API-ju.
Tamo gdje je `curl` instaliran, uporedite `curl -4 -I https://generativelanguage.googleapis.com`
s `curl -6 -I https://generativelanguage.googleapis.com` u oba okruženja.
HTTP odgovor dokazuje povezivost za tu provjeru, čak i ako je riječ o neautentificiranoj
grešci; samo autentificirani zahtjev modelu provjerava prihvatljivost za Gemini.

### Alternativa na nivou hosta: funkcionalan IPv6 i pravila razrješivača

Prijavitelj problema [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ponovo je uspostavio
pristup u svom okruženju omogućavanjem IPv6 u kontejneru i promjenom glibc odabira
adresa. Smatrajte ovo alternativom specifičnom za okruženje. Potvrdite da IPv6 na hostu radi
te provjerite izlazno povezivanje/usmjeravanje kontejnera i pravila vatrozida prije prilagođavanja prioriteta razrješivača.
Privatna ULA adresa sama po sebi ne uspostavlja javnu IPv6 povezivost.

Za servise koji su već povezani s Composeovom zadanom mrežom, ovaj fragment omogućava
IPv6 na toj mreži; zadržite ostatak konfiguracije servisa, portova, volumena i drugih postavki:

```yaml
networks:
  default:
    enable_ipv6: true
```

Za imenovanu mrežu omogućite ga na mreži kojoj se servis zaista pridružuje. Docker može
dodijeliti ULA podmrežu; odaberite eksplicitnu podmrežu bez preklapanja samo kada je vašoj mreži
potrebna. Pogledajte [Docker IPv6 umrežavanje](https://docs.docker.com/engine/daemon/ipv6/)
i [Opcije Compose mreže](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Na **slici zasnovanoj na glibc-u**, `/etc/gai.conf` može promijeniti odabir adresa. Trenutni
Dockerfile repozitorija koristi Debian; prilagođene slike zasnovane na musl-u ne koriste ovaj mehanizam.
Prijavljena izmjena mijenja ULA oznaku iz `label fc00::/7 6` u
`label fc00::/7 1`. Počnite s kompletnom tabelom pravila slike i sačuvajte ostale
unose: dodavanje unosa `label` ili `precedence` zamjenjuje tu zadanu tabelu, pa datoteka
koja sadrži samo izmijenjenu liniju nije dovoljna.
[Referenca konfiguracije glibc-a](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentuje tu semantiku. Montirajte pregledanu datoteku samo za čitanje na `/etc/gai.conf`
i ponovo kreirajte servis kako biste je primijenili.

Ovo mijenja OS-ov odabir adresa za **sav izlazni saobraćaj u tom kontejneru**.
Ne prisiljava svaku aplikaciju da odabere IPv6: važni su i Nodeov redoslijed DNS-a te
odabir veze. Konkretno, `--dns-result-order=ipv4first` daje prednost IPv4 protokolu i
nije rješenje za kvar koji se javlja samo s IPv4 protokolom. Pogledajte [Nodeov redoslijed DNS-a](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Ponovo testirajte Gemini i druge pružaoce usluga nakon bilo koje promjene na nivou hosta. Za vraćanje izmjena
uklonite prilagođeno montiranje datoteke `gai.conf`, vratite prethodnu mrežnu konfiguraciju i
ponovo kreirajte pogođeni servis/mrežu tokom perioda održavanja. Ponovno kreiranje mreže
može prekinuti rad drugih kontejnera povezanih s njom; nemojte brisati trajni podatkovni volumen.

## Važne napomene

- **SQLite WAL način rada:** Treba omogućiti da se `docker stop` završi kako bi OmniRoute mogao zapisati najnovije promjene iz kontrolne tačke nazad u `storage.sqlite`. Priložene Compose datoteke već postavljaju period odgode zaustavljanja od 40 s. Ako direktno pokrećete sliku, zadržite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Postavite na `true` ako se rutinskim sigurnosnim kopijama/sigurnosnim kopijama prije zapisivanja upravlja eksterno. Migracije postojećih baza podataka i dalje zahtijevaju vlastitu trajnu sigurnosnu snimku i zaštitu za masovnu migraciju.
- **Trajnost podataka:** Uvijek montirajte volumen na `/app/data` kako biste sačuvali bazu podataka, ključeve i konfiguracije nakon ponovnih pokretanja kontejnera.
- **Konfiguracija porta:** Promijenite varijablu okruženja `PORT` kako biste promijenili zadani port `20128`.

## Pogledajte također

- [Vodič za implementaciju na VM-u](../ops/VM_DEPLOYMENT_GUIDE.md) — Postavljanje VM-a, nginx-a i Cloudflarea
- [Vodič za implementaciju na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementacija na Fly.io
- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Potpuna referenca za `.env`
