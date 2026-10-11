# 🐳 Docker Guide — OmniRoute (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Potpuna referenca za implementaciju putem Dockera. Za brzi početak pogledajte [odjeljak o Dockeru u README-u](../README.md#-docker).

## Sadržaj

- [Brzo pokretanje](#quick-run)
- [S datotekom okruženja](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupni profili](#available-profiles)
- [Konfiguriranje CLI alata glavnog računala kada se OmniRoute izvodi u Dockeru](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis kao pomoćni spremnik](#redis-sidecar)
- [Compose za produkciju](#production-compose)
- [Faze Dockerfilea](#dockerfile-stages)
- [Ključne varijable okruženja](#critical-environment-variables)
- [Docker Compose s Caddyjem (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Oznake slika](#image-tags)
- [Dostupnost: zadani SQLite podržava samo jednu repliku](#availability-default-sqlite-is-single-replica)
- [Regionalne pogreške Geminija unutar Dockera](#gemini-regional-errors-inside-docker)
- [Važne napomene](#important-notes)

---

## Brzo pokretanje

> **Samostalno hostiranje jednom naredbom?** Pogledajte
> [Vodič za samostalno hostiranje](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika +
> Redis, samo na sučelju povratne petlje, bez odabira profila). Brzo pokretanje u nastavku
> predstavlja način rada s jednim spremnikom za korisnike koji Redis već izvode drugdje.

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

# Web-profil (Chromium/Playwright za pružatelje web-sesija)
docker compose --profile web up -d

# Kombinirajte CLI i pomoćni spremnik CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupni profili

OmniRoute se isporučuje s Compose profilima za glavne oblike implementacije. Odaberite onaj koji odgovara vašem okruženju.

| Profil          | Usluga           | Kada upotrijebiti                                                                                                                                                                          | Naredba                                      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (zadano) | `omniroute-base` | Poslužitelj bez grafičkog sučelja / minimalno okruženje za izvođenje, bez uključenih CLI-jeva pružatelja                                                                                   | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Agentski tijekovi rada koji pozivaju `omniroute providers/setup/doctor` i uključene CLI-jeve (Codex, Claude Code, Droid, OpenClaw)                                                         | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Linux glavna računala kojima je potreban pristup CLI-jevima glavnog računala nalik na `network_mode`, montiranjem direktorija `~/.local/bin`, `~/.codex`, `~/.claude` itd. samo za čitanje | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Pokretanje pomoćnog spremnika [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na priključku `8317` za prosljeđivanje prema nadređenom CLI proxyju                              | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Pružatelji web-sesija kojima je potreban preglednik: `gemini-web`, `claude-web`, `claude-turnstile` (izgrađuje `runner-web`, Chromium je uključen)                                         | `docker compose --profile web up -d`         |

> Moguće je kombinirati više profila: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguriranje CLI alata glavnog računala kada se OmniRoute izvodi u Dockeru

`omniroute setup-codex`, `setup-claude`, `config set <tool>` i gumb
**Spremi konfiguraciju** na nadzornoj ploči zapisuju datoteke poput `~/.codex/*.config.toml`. Te putanje
imaju značenje samo na računalu na kojem se CLI stvarno izvodi. Ako ih pokrenete unutar
spremnika, zapis završava u vlastitom matičnom direktoriju spremnika (`/home/node` —
slika se izvodi kao `USER node`), gdje ga nijedan CLI na glavnom računalu nikada neće pročitati i gdje se
odbacuje čim se spremnik ponovno stvori.

OmniRoute to otkriva i odbija zapisivanje uz prikaz uputa umjesto
prijave uspjeha koje ne možete iskoristiti: CLI završava s kodom `2`, a API odgovara kodom `422`
uz `containerEphemeralTarget: true`.

### Preporučeno: pokrenite CLI na glavnom računalu, a OmniRoute u Dockeru

Spremnik poslužuje API; CLI konfigurira vaše alate na glavnom računalu.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # usmjerite CLI na spremnik
omniroute setup-codex                      # zapisuje stvarni ~/.codex na vašem glavnom računalu
```

Ovo je pravi izbor kada se Codex, Claude Code, Cursor ili slični alati izvode na vašem
prijenosnom računalu — što je uobičajena konfiguracija.

### Alternativa: povežite direktorije konfiguracije glavnog računala pomoću bind mounta (profil `host`)

Ako želite da sam spremnik zapisuje konfiguraciju vašeg glavnog računala, montirajte
direktorije u spremnik i usmjerite `CLI_CONFIG_HOME` na korijenski direktorij montiranja. Profil `host`
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
`/proc/self/mountinfo` i dopušta zapisivanje u montirane putanje (i u direktorije
čiji su podređeni direktoriji montirani, što točno odgovara gornjoj strukturi `/host-home`), dok
i dalje odbija nemontirane putanje.

### Izlaz u nuždi: konfigurirajte CLI-je samog spremnika (koristite štedljivo)

Kada se CLI-jevi doista nalaze unutar spremnika (profil `cli`), zapisivanje
je namjerno. Proslijedite `--allow-container-write` bilo kojoj naredbi `setup-*` ili postavite
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` za poslužitelj. Zapisivanje se izvršava
uz upozorenje da neće preživjeti ponovno stvaranje spremnika.

> **Sigurnosno upozorenje — profil `cli` + montiranje `docker.sock`.**
> Profil `cli` povezuje `/var/run/docker.sock` pomoću bind mounta kako bi alat za
> automatsko ažuriranje unutar spremnika mogao ponovno stvoriti stog putem demona glavnog računala
> (`src/lib/system/autoUpdate.ts` provjerava postojanje te utičnice i preskače
> Docker putanju kada je nema). Ta utičnica predstavlja **granicu povjerenja za root pristup
> glavnom računalu**: sve što joj može pristupiti upravlja Docker demonom glavnog računala kao
> root — može stvarati, pregledavati, zaustavljati i uklanjati bilo koji spremnik na glavnom računalu.
> Posljedice:
>
> 1. **Nikada ne izlažite priključak profila `cli` mreži.** Objavite
>    ga na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupan putem LAN-a pretvara svaki RCE na razini nadzorne ploče u
>    potpunu kompromitaciju glavnog računala.
> 2. **Nemojte povezivati nikakve dodatne direktorije glavnog računala s profilom `cli`.**
>    Docker utičnica u kombinaciji s bilo kojim dodatnim montiranjem spremniku daje puni
>    pristup za čitanje i pisanje vašeg datotečnog sustava i konfiguracije glavnog računala. Ako alat treba
>    vidjeti projekt, pokrenite ga lokalno pomoću CLI binarne datoteke — nemojte ga montirati
>    u spremnik `cli`.
>
> Ako vam nije potrebno automatsko ažuriranje unutar spremnika, nemojte uključivati profil `cli`
> (`COMPOSE_PROFILES=core,redis` ili kraće). Ostali profili ne
> montiraju Docker utičnicu.
>
> Pogledajte `docs/security/MITM-TPROXY-DECRYPT.md` (git; nije ugrađeno u `/docs`) za povezani model prijetnji
> vezan uz MITM te `docs/security/SUPPLY_CHAIN.md` za lanac podrijetla binarnih datoteka
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute se oslanja na Redis kao podršku za distribuirano ograničavanje brzine i dijeljenu predmemoriju. Usluga `redis` je **uvijek definirana** u datoteci `docker-compose.yml` (nije ograničena profilom) i pokreće se zajedno s bilo kojim drugim profilom.

| Pojedinost              | Vrijednost                             |
| ----------------------- | -------------------------------------- |
| Slika                   | `redis:7-alpine`                       |
| Naziv spremnika         | `omniroute-redis`                      |
| Interni port            | `6379`                                 |
| Port glavnog računala   | `REDIS_PORT` (zadano `6379`)           |
| Adresa glavnog računala | `REDIS_BIND_HOST` (zadano `127.0.0.1`) |
| Volumen                 | `omniroute-redis-data` → `/data`       |
| Provjera ispravnosti    | `redis-cli ping` (interval od 10 s)    |

Povezane varijable okruženja:

- `REDIS_URL` — niz za povezivanje koji se prosljeđuje aplikaciji (zadano `redis://redis:6379`).
- `REDIS_PORT` — mapiranje porta na strani glavnog računala za Redisov spremnik.
- `REDIS_BIND_HOST` — sučelje glavnog računala na kojem se port objavljuje. Zadana je vrijednost `127.0.0.1`.

> **Zašto je zadano sučelje povratne petlje:** sidecar se izvodi bez opcije `requirepass`, a spremnici
> aplikacije pristupaju mu putem mreže servisa Compose (`redis:6379`) — objavljeni port postoji
> samo za alate na glavnom računalu (`redis-cli`, lokalni `npm run dev`). Objavljivanje na adresi
> `0.0.0.0` izložilo bi Redis bez autentifikacije svakom glavnom računalu u vašem LAN-u. Ako postavite
> `REDIS_BIND_HOST=0.0.0.0`, dodajte i `--requirepass` u `command:` usluge.

**Onemogućavanje Redisa** nije preporučljivo (ograničivač brzine prijeći će na pričuvnu implementaciju u memoriji). Ako to ipak morate učiniti, uklonite ili zakomentirajte blok usluge `redis:` u datoteci `docker-compose.yml` ili smanjite broj njezinih instanci na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkcijski Compose

Za izoliranu produkcijsku snimku koja se izvodi uz razvojno okruženje upotrijebite `docker-compose.prod.yml`.

| Pojedinost                 | Vrijednost                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------- |
| Datoteka                   | `docker-compose.prod.yml`                                                           |
| Zadani port nadzorne ploče | `PROD_DASHBOARD_PORT=20130` (mapiran na interni `${DASHBOARD_PORT:-20128}`)         |
| Zadani API port            | `PROD_API_PORT=20131`                                                               |
| Slika                      | `omniroute:prod` (izgrađena iz cilja `runner-cli`)                                  |
| Redisov spremnik           | `omniroute-redis-prod` (`redis:8.6.2`, namjenski volumen `redis-prod-data`)         |
| Volumen podataka           | `omniroute-prod-data` (imenovan, zadržava se između ponovnih izgradnji)             |
| Provjere ispravnosti       | `node healthcheck.mjs` + `redis-cli ping`, uz `depends_on` uvjetovan stanjem Redisa |

Način upotrebe:

```bash
# Izgradite i pokrenite produkcijski skup
docker compose -f docker-compose.prod.yml up -d --build

# Pratite zapisnike u stvarnom vremenu
docker compose -f docker-compose.prod.yml logs -f

# Zaustavite i uklonite skup (zadržite volumene)
docker compose -f docker-compose.prod.yml down
```

Produkcijski skup izvodi se paralelno s razvojnim okruženjem Compose (različiti nazivi spremnika, portovi i volumeni), pa možete nastaviti s lokalnim razvojem dok produkcijsko okruženje ostaje pokrenuto.

## Faze Dockerfilea

Repozitorij sadrži višefazni Dockerfile (`Dockerfile`). Dostupne su četiri faze; odaberite odgovarajući `target` za svoj slučaj upotrebe.

| Faza          | Osnovna slika         | Namjena                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalira ovisnosti (`npm ci --legacy-peer-deps`) i pokreće `npm run build` (prema zadanim postavkama koristi Turbopack — pogledajte odjeljak Resursi tijekom izgradnje u nastavku)                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | Produkcijsko izvršno okruženje sa samostalnim izlazom Next.js-a. **Ne uključuje CLI alate pružatelja.**                                                                                                                                                                                             |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` i globalne CLI alate: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Odaberite ovu fazu za agentske tijekove rada.**                                                                                                              |
| `runner-web`  | `runner-base`         | Dodaje Playwright i preglednik Chromium (`--with-deps`) za pružatelje web-sesija: `gemini-web`, `claude-web`, `claude-turnstile`. **Odaberite ovu fazu kada koristite te pružatelje** — obična slika bez nje ne uspijeva tijekom zahtjeva (pogledajte napomenu o `-web` u odjeljku Kanali izdanja). |

Ručno izgradite određeni cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Resursi tijekom izgradnje

Tri argumenta izgradnje određuju potrošnju resursa faze `builder`. Primjenjuju se samo tijekom izgradnje —
`OMNIROUTE_MEMORY_MB` (u nastavku) zasebna je postavka za vrijeme izvođenja.

| Argument izgradnje          | Zadano | Učinak                                                                                           |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` izgrađuje pomoću webpacka: manja vršna potrošnja memorije, sporije. `1` uključuje Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Gornja granica V8 hrpe (`--max-old-space-size`) za pokrenuti proces `next build`.                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Postavlja `CIRCLE_NODE_TOTAL`; Next izvodi `workers = N - 1` za prikupljanje podataka stranica.  |

`OMNIROUTE_BUILD_WORKERS` treba povećati na snažnom sustavu za izgradnju, a na njega
treba posumnjati kada izgradnja s ograničenim resursima prestane raditi **nakon**
poruke `✓ Compiled successfully`. Svaki radni proces za podatke stranica zaseban
je proces, kao i sam nadređeni proces `next build`; reprodukcija na aktivnom VPS-u
(problem #7518) izmjerila je vršni RSS svakog procesa na ~4.5 GB, neovisno o
zastavici hrpe `NODE_OPTIONS` (Turbopack kompilira u izvornoj/Rust memoriji izvan
V8 hrpe). Zadana vrijednost `2` (→ 1 radni proces, ukupno 2 procesa) prilagođena
je GitHubovim izvršiteljima sa 16 GB / 4 vCPU-a koje koristi cjevovod za
objavljivanje. Pri vrijednosti `8` (→ 7 radnih procesa) taj je izvršitelj ostao
bez memorije, a buildkit je prekinuo korak pogreškom
`ResourceExhausted: ... cannot allocate memory`; vrijednost `3` (→ 2 radna
procesa) i dalje nije bila dovoljna nakon što je RSS po procesu izravno izmjeren
umjesto procijenjen. `tests/unit/docker-build-memory-budget.test.ts` provodi
izračun na temelju izmjerene vrijednosti i ne prolazi ako bilo koja postavka
preraste mogućnosti izvršitelja.

Turbopack kompilira u izvornoj Rust memoriji koja se nalazi **izvan** V8 hrpe,
pa je `OMNIROUTE_BUILD_MEMORY_MB` ne ograničava. Na računalu s ograničenjem
memorije OOM killer tada prekida izgradnju signalom SIGKILL bez ikakvog teksta
pogreške — ona se jednostavno zaustavlja usred poruke
`Creating an optimized production build`, što izgleda kao zastoj, a ne kao
nedostatak memorije. Zbog toga `Dockerfile` prema zadanim postavkama koristi
webpack (`OMNIROUTE_USE_TURBOPACK=0`), za razliku od `npm run dev` /
`npm run build`, gdje je Turbopack zadana opcija u kodu: osnovni
`docker build .` bez argumenata izgradnje (koji pokreću Railway i ostali
pružatelji s implementacijom jednim klikom) ne smije se neprimjetno prekinuti na
sustavu za izgradnju s ograničenom memorijom. Objavljene slike već izričito
prosljeđuju `OMNIROUTE_USE_TURBOPACK=0` u datoteci `docker-publish.yml`. Na
sustavu za izgradnju s dovoljno RAM-a uključite Turbopack radi brže izgradnje:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogućen, pa `next build` pokreće nadređeni **i** radni
proces, a svaki zasebno poštuje `OMNIROUTE_BUILD_MEMORY_MB`. Postavite ograničenje
spremnika na vrijednost veću od otprilike dvostruke vrijednosti te postavke, a ne
samo jednake vrijednosti.

Izmjereno na ovom stablu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Alat za pakiranje | Ograničenje spremnika | Rezultat                                         |
| ----------------- | --------------------- | ------------------------------------------------ |
| Turbopack         | 8 GiB / 16 GiB        | OOM prekid na obje vrijednosti, bez poruke       |
| webpack           | 8 GiB                 | radni proces izgradnje prekinut signalom SIGKILL |
| webpack           | 12 GiB                | uspješno, vršna potrošnja 11.1 GiB               |

### Zadane postavke tijekom izvođenja

Zadane vrijednosti koje izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Ponašanje memorije u Dockeru:

- Slika postavlja `OMNIROUTE_MEMORY_MB=1024` i iz njega izvodi `NODE_OPTIONS=--max-old-space-size=1024`.
- Stvarni poslužiteljski proces pokreće samostalni pokretač, koji čita `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node koristi posljednju ponovljenu vrijednost `--max-old-space-size`, pa postavljanje varijable `OMNIROUTE_MEMORY_MB` kontrolira efektivno ograničenje Docker heap memorije.
- Budući da je slika uvijek postavlja, vlastita rezervna vrijednost pokretača, kalibrirana prema RAM-u, nikada se ne primjenjuje u Dockeru. Izričito je povećajte prema radnom opterećenju (tablica u nastavku). `2048` je i dalje premalo za `/v1/responses` agenta za programiranje.

### RAM tijekom izvođenja za agente za programiranje

Zadana vrijednost od 1 GiB u Dockeru donja je granica za nadzornu ploču i lagani razgovor, a ne veličina za produkcijsko okruženje. Duga tijela zahtjeva `POST /v1/responses` (stotine poruka, deseci alata) tijekom kompresije zadržavaju više grafova u memoriji. Dva preklapajuća zahtjeva veličine ~3 MiB / ~750k tokena uzrokovala su prekid V8 pri **12 GiB** old-space memorije (`FATAL ERROR: Reached heap limit`), a također su dosegla OOM ograničenje cgroupa od 16 GiB. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Postavite **cgroup `--memory` iznad veličine heap memorije** — nativni međuspremnici, SQLite i međurezultati kompresije nalaze se izvan V8.

| Radno opterećenje                                | `OMNIROUTE_MEMORY_MB`     | Spremnik / cgroup            | Napomene                                                                                                                            |
| ------------------------------------------------ | ------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Nadzorna ploča, jedan lagani razgovor            | `1024` (zadano u slici)   | ≥2 GiB                       |                                                                                                                                     |
| Jedan agent za programiranje (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                      | Tipična pojedinačna sesija `/v1/responses`                                                                                          |
| Dva istodobna duga zahtjeva `/v1/responses`      | `10240`–`12288`           | ≥12–16 GiB                   | Izmjeren prekid V8 pri ~12 GiB heap memorije                                                                                        |
| Tri ili više istodobnih dugih konteksta          | nemojte na jednom procesu | serijalizirajte / više RAM-a | Zadano ograničenje za zahtjevna opterećenja jest 1 zahtjev u obradi; njegovo povećavanje bez dodatnog RAM-a ponovno uzrokuje prekid |

`omniroute serve` na fizičkom poslužitelju kalibrira približno 35% RAM-a (ograničeno na `[512, 4096]`) kada varijabla `OMNIROUTE_MEMORY_MB` **nije postavljena**. Docker uvijek postavlja `1024`, pa se ta kalibracija nikada ne izvršava u službenoj slici.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritične varijable okruženja

Osim zadanih vrijednosti dokumentiranih u [ENVIRONMENT.md](../reference/ENVIRONMENT.md), sljedeće su varijable najvažnije pri pokretanju u Dockeru:

| Varijabla                     | Svrha                                                                                                                                                                                                                                                                            | Zadano                             |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Dijeljena tajna za WebSocket most. **Obavezna u produkciji** — postavite je na snažan nasumični niz znakova.                                                                                                                                                                     | nije postavljeno (mora se navesti) |
| `REDIS_URL`                   | Niz za povezivanje s pozadinskim sustavom za ograničavanje brzine / predmemoriju                                                                                                                                                                                                 | `redis://redis:6379`               |
| `REDIS_PORT`                  | Port na strani hosta za uključeni Redis spremnik                                                                                                                                                                                                                                 | `6379`                             |
| `REDIS_BIND_HOST`             | Mrežno sučelje hosta na kojem se objavljuje uključeni Redis port (povratna petlja, osim ako ne dodate AUTH)                                                                                                                                                                      | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Putanja na hostu montirana u profil `cli` na `/workspace/omniroute` za tijekove rada samostalnog ažuriranja                                                                                                                                                                      | `.` (trenutačni direktorij)        |
| `OMNIROUTE_MEMORY_MB`         | Gornja granica Node heap memorije tijekom izvođenja za samostalni Docker poslužitelj; nadjačava prethodno navedenu zadanu vrijednost slike. Agenti za programiranje: `8192`+ (pogledajte [RAM tijekom izvođenja](#runtime-ram-for-coding-agents)).                               | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Nadjačava izložene portove za nadzornu ploču (20128) i API (20129)                                                                                                                                                                                                               | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Mrežno sučelje hosta na kojem docker-compose objavljuje portove nadzorne ploče/API-ja/WS-a uživo. Uz `REQUIRE_API_KEY=false` (zadana vrijednost), `0.0.0.0` izlaže anonimni proxy `/v1` LAN-u — proširite pristup samo uz `REQUIRE_API_KEY=true` ili obrnuti proxy ispred njega. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Mrežno sučelje hosta na kojem docker-compose objavljuje pomoćni spremnik `cliproxyapi` — njegov podatkovni volumen sadrži vjerodajnice pružatelja usluga.                                                                                                                        | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Direktorij koji skener dodataka tijekom izvođenja čita i u koji ih instalira. Postavite ga kada su dodaci montirani vezanim montiranjem: zadana vrijednost slijedi `HOME`, koji slika ne mora izvesti.                                                                           | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | URL podputanja kada je aplikacija objavljena iza obrnutog proxyja (npr. `/omniroute`)                                                                                                                                                                                            | _(prazno = korijen)_               |
| `NEXT_PUBLIC_BASE_URL`        | Javno izvorište preglednika koje uključuje podputanju (npr. `https://host/omniroute`)                                                                                                                                                                                            | nije postavljeno                   |
| `PROD_DASHBOARD_PORT`         | Port nadzorne ploče na strani hosta za `docker-compose.prod.yml`                                                                                                                                                                                                                 | `20130`                            |
| `CLIPROXYAPI_PORT`            | Port na strani hosta za pomoćni spremnik `cliproxyapi`                                                                                                                                                                                                                           | `8317`                             |

## Obrnuti proxy na podputanji (Traefik / nginx)

Next.js `basePath` kompilira se u samostalni paket. OmniRoute bilježi ugrađenu
vrijednost u kontrolnu datoteku u korijenu aplikacije (zapisuje se tijekom `npm run build`; čita je
`scripts/docker/ensure-docker-base-path.mjs`) i uspoređuje je s
`OMNIROUTE_BASE_PATH` pri pokretanju spremnika. Kada se razlikuju, a slika je
izgrađena za korijen domene, ulazna točka prepisuje samostalne manifeste,
ugrađene literale `basePath`/`assetPrefix` (Next 16 prikazuje URL-ove SSR resursa samo iz
`assetPrefix` — alat za izmjene u njega preslikava podputanju), ugrađene
URL-ove resursa `/_next/static` (manifesti klijentskih referenci, uvozi medijskih sadržaja, unaprijed generirane
stranice pogrešaka) i klijentsku zamjenu za `process.env` prije nego što se pokrene
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
varijablu okruženja tijekom izvođenja.

### Unaprijed izgrađena korijenska slika + podputanja tijekom izvođenja

Objavljene slike `diegosouzapw/omniroute:*` izgrađene su za korijen domene. I dalje možete
postaviti `OMNIROUTE_BASE_PATH` tijekom izvođenja; spremnik će jednom izmijeniti paket pri pokretanju.
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
`StripPrefix`, kako bi Next.js primao `/omniroute/...` i posluživao resurse iz
`/omniroute/_next/...`.

Dockerova provjera stanja ispituje laganu krajnju točku životnog ciklusa `/healthz`, kojoj je dodan prefiks
aktivnog `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostaje dostupan za
dijagnostiku namijenjenu korisnicima i nadzornim pločama; da biste HEALTHCHECK spremnika ponovno usmjerili na njega (primjerice
radi provođenja dubinske provjere stanja), postavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ta je putanja **dubinska** provjera (baza podataka + sažetak nadzora) — prikladna za Dockerov
rijetki `HEALTHCHECK` ako ga ponovno uključite, ali **nije** prikladna za intervale Kubernetesova
`livenessProbe`.

Za orkestratore (Kubernetes, Nomad itd.):

| Provjera            | Preporučeno                                                              | Izbjegavati                                                               |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Živost              | HTTP `GET /livez` ili TCP na glavnom priključku (`PORT`, zadano `20128`) | `/api/monitoring/health` kao provjeru živosti                             |
| Spremnost           | HTTP `GET /healthz`                                                      | Kratka vremenska ograničenja koja zauzetu petlju događaja smatraju mrtvom |
| Dubinska / blackbox | `/api/monitoring/health`                                                 | —                                                                         |

`/healthz` izvještava o životnom ciklusu procesa (`ok` / `starting` / `stopping`). `/livez` je
isključivo provjera je li proces aktivan (200 kad god se rukovatelj može izvršiti; ne čeka
spremnost). Obje se i dalje izvode u istoj Nodeovoj petlji događaja kao i obrada zahtjeva, pa ih
procesorski intenzivan rad s katalogom ili kompresijom može odgoditi — zauzeto ≠ mrtvo. Ako HTTP
provjere prekorače vremensko ograničenje, dajte prednost TCP provjeri živosti. Potpune smjernice za provjere:
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
      # Ishodište vidljivo pregledniku za OAuth povratne pozive, poveznice nadzorne ploče i generirane javne URL-ove.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interni URL između poslužitelja za zakazane zadatke / zahtjeve prema samom sebi.
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
poveznice; autentificirani zahtjevi za pisanje na nadzornoj ploči upotrebljavaju zahtjeve istog ishodišta uz CSRF
zaštitu povezanu sa sesijom. Omogućite `OMNIROUTE_TRUST_PROXY` samo za napredne implementacije u kojima namjerno
želite da OmniRoute izvede javno ishodište iz pouzdanih proslijeđenih zaglavlja umjesto iz izričite
konfiguracije.

## Cloudflare Quick Tunnel

Podrška na nadzornoj ploči za Docker implementacije uključuje **Cloudflare Quick Tunnel** koji se pokreće jednim klikom na `Dashboard → Endpoints`. Pri prvom omogućavanju `cloudflared` se preuzima samo kada je potreban, pokreće se privremeni tunel do vaše trenutačne krajnje točke `/v1`, a generirani URL `https://*.trycloudflare.com/v1` prikazuje se neposredno ispod vašeg uobičajenog javnog URL-a.

Ploče tunela krajnjih točaka (Cloudflare, Tailscale, ngrok) mogu se prikazati ili sakriti putem `Settings → Appearance` bez promjene stanja aktivnog tunela.

### Napomene o tunelu

- URL-ovi Quick Tunnela privremeni su i mijenjaju se nakon svakog ponovnog pokretanja.
- Quick Tunneli ne obnavljaju se automatski nakon ponovnog pokretanja OmniRoutea ili spremnika. Ponovno ih omogućite na nadzornoj ploči kada budu potrebni.
- Upravljana instalacija trenutačno podržava Linux, macOS i Windows na arhitekturama `x64` / `arm64`.
- Upravljani Quick Tunneli prema zadanim postavkama upotrebljavaju HTTP/2 prijenos kako bi se izbjegla bučna upozorenja o QUIC UDP međuspremniku u ograničenim okruženjima spremnika. Postavite `CLOUDFLARED_PROTOCOL=quic` ili `auto` ako želite drugačiji prijenos.
- Docker slike uključuju korijenske certifikate pouzdanih izdavatelja sustava i prosljeđuju ih upravljanom procesu `cloudflared`, čime se izbjegavaju pogreške pouzdanosti TLS-a kada se tunel inicijalizira unutar spremnika.
- Postavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ako želite da OmniRoute upotrebljava postojeću binarnu datoteku umjesto preuzimanja nove.

## Oznake slika

| Slika                    | Oznaka   | Veličina | Opis                                                           |
| ------------------------ | -------- | -------- | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Najviša **objavljena** stabilna SemVer verzija (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Fiksirajte ovu vrstu oznake za GitOps                          |

Manifest za više platformi: izvorne verzije za `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatski odabire odgovarajuću arhitekturu; proslijedite `--platform linux/amd64` ako morate prisilno upotrebljavati AMD64 emulaciju na ARM domaćinima.

### Kanali izdanja

OmniRoute objavljuje zasebne Docker kanale za stabilna izdanja, testiranje aktivne grane izdanja i razvojne međuverzije.

| Kanal                           | Izvor                                          | Promjenjivost                    | Preporučena uporaba                                                                                                              |
| ------------------------------- | ---------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Potpisano/verzionirano izdanje                 | Nepromjenjivo                    | Produkcijske implementacije koje su fiksirane na točno određeno izdanje                                                          |
| `:latest` / `:latest-web`       | Najviša **objavljena** stabilna SemVer verzija | Promjenjiv stabilni pokazivač    | Prati stabilna izdanja **nakon** zadatka objave SemVer verzije — **ne** prati `main` ni neobjavljene revizije grane `release/v*` |
| `:next` / `:next-web`           | Trenutačna zadana grana `release/v*`           | Promjenjiv pokazivač predizdanja | Testiranje ispravaka koji su uvršteni u aktivnu granu izdanja, ali još nisu uključeni u stabilno izdanje                         |
| `:main` / `:main-web`           | Grana `main`                                   | Promjenjiv razvojni pokazivač    | Samo za razvojno i integracijsko testiranje                                                                                      |

#### Pružatelji web-sesija: slike `-web`

Svaki prethodno navedeni kanal dostupan je i kao oznaka `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), izrađena iz faze `runner-web` — ista slika uz Playwright i preglednik Chromium. Osnovna slika isporučuje se **bez** Chromiuma; potreban je pružateljima `gemini-web`, `claude-web` i `claude-turnstile`.

Pogreška je odgođena i ne javlja se pri pokretanju: ti pružatelji navode svoje modele i prikazuju se kao povezani na nadzornoj ploči, a tek prvi zahtjev ne uspijeva uz poruku

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ako upotrebljavate te pružatelje, povucite oznaku `-web` kanala koji već upotrebljavate — ništa se drugo ne mijenja. Pri instalaciji putem npm-a/CLI-ja (bez Docker slike) odgovarajuća komponenta koja nedostaje jest binarna datoteka preglednika: pokrenite `npx playwright install chromium` na domaćinu.

#### Uporaba kanala predizdanja

Kanal `next` ponovno se izgrađuje pri svakom slanju promjena na trenutačnu zadanu granu `release/v*` i objavljuje se za AMD64 i ARM64. Starije grane održavanja ne mogu ga prebrisati. Kanal pruža sliku koja se može preuzeti, a sadrži ispravke spojene u aktivnu granu izdanja prije izrade sljedeće stabilne oznake.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose nadjačajte oznaku slike koju koristi odabrani profil, a zatim preuzmite sliku i ponovno izradite servis:

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

`next` je promjenjivi kanal predizdanja. Može se promijeniti pri svakom slanju promjena na aktivnu granu izdanja i **nije podržan za upotrebu u produkciji**. Tijekom procjene određene međuverzije fiksirajte sažetak slike:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Prije testiranja sigurnosno kopirajte podatkovni volumen OmniRoutea ili povezani direktorij s podacima. Za vraćanje na prethodnu verziju obnovite prethodno korištenu stabilnu verziju ili sažetak te ponovno izradite spremnik:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Međuverzija grane izdanja nikada ne može pomaknuti `latest`; samo prihvatljiva stabilna semantička verzija može ažurirati pokazivač stabilne verzije. Slike `next` zadržavaju provjeru slike izdanja i blokirajuću provjeru ranjivosti razine CRITICAL.

**`latest` nije jamstvo ažurnosti u odnosu na git.** Spojeni ispravci na grani `main` ili aktivnoj grani `release/v*` **nisu** uključeni u `:latest` sve dok se ne objavi stabilna SemVer slika i zadatak objave ne ažurira `:latest` (isti sažetak kao taj SemVer). Ako se čini da je `latest` zamrznut, dok GitHub već prikazuje ispravak, preuzmite `:next` kako biste testirali granu izdanja ili pričekajte SemVer oznaku.

| Želite                                                                                | Upotrijebite                            |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / produkciju koja ne smije odstupati                                           | Fiksirajte `:X.Y.Z` (ili sažetak slike) |
| Pratiti objavljena stabilna izdanja i prihvatiti ponovno stvaranje pri svakom izdanju | `:latest`                               |
| Testirati neobjavljene revizije grane `release/v*`                                    | `:next` (nije za produkciju)            |
| Testirati `main`                                                                      | `:main` (nije za produkciju)            |

## Dostupnost: zadani SQLite podržava samo jednu repliku

Standardni Docker / Kubernetes OmniRoute sastoji se od **jednog Node procesa + jednog SQLite zapisivača**. Visoka dostupnost **nije podržana** u toj topologiji.

| Ograničenje                                                         | Posljedica                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jedan zapisivač                                                     | **Nemojte** pokretati više replika nad istom SQLite datotekom. To će oštetiti bazu podataka.                                                                                                                                                                                                                                                         |
| Ponovno stvaranje / ponovno pokretanje / prekid putem HEALTHCHECK-a | **Potpuni prekid rada** za aktivne SSE veze, sesije nadzorne ploče i stanje u memoriji. Prekida se veza svakog povezanog klijenta. Novi zahtjevi tijekom razdoblja bez krajnjih točaka od obrnutog proxyja dobivaju **`502 Bad Gateway: Unknown error`**, a ne OmniRoute JSON — klijenti to ne mogu razlikovati od kvara pružatelja usluge (#11015). |
| Ista petlja događaja kao `/healthz`                                 | Opterećeni ciklus kataloga ili kompresije može odgoditi provjere; kratko vremensko ograničenje zatim ponovno pokreće **jedinu** repliku.                                                                                                                                                                                                             |

**Matrica provjera** (pogledajte i [preporuke za Kubernetes provjere](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Provjera            | Cilj                                                     | Nemojte koristiti                                                              |
| ------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Aktivnost           | TCP na `PORT` (zadano `20128`) ili blagi HTTP `/healthz` | `/api/monitoring/health`                                                       |
| Spremnost           | HTTP `GET /healthz`                                      | Kratka vremenska ograničenja koja zauzetu petlju događaja smatraju nedostupnom |
| Dubinska / za ljude | `/api/monitoring/health`                                 | Automatiziranu kubelet provjeru aktivnosti                                     |

**Nadogradnje:** očekujte prekid svake sesije. Ako možete, postupno odspojite klijente; sa zadanim SQLiteom nema postupnog ažuriranja. Compose `restart: unless-stopped` u kombinaciji s Docker `HEALTHCHECK` provjerom također će zamijeniti jedini proces kada spremnik postane nezdrav — uz isti opseg posljedica.

Kubernetes isječak za **jednu repliku** (Recreate je obavezan; nemojte povećavati `replicas` za jednu SQLite datoteku):

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

Pauza `preStop` omogućuje Kubernetesu uklanjanje krajnjih točaka servisa prije SIGTERM-a kako **novi** promet ne bi nastavio dolaziti do procesa koji se gasi. Aktivni `/v1/responses` SSE zahtjevi dovršavaju se do ograničenja `SHUTDOWN_TIMEOUT_MS` (zadano 30 s) putem zahtjevnih prijamnih zakupa (#11015). Novi zahtjevi koji ipak stignu do procesa dobivaju `503` + `Retry-After: 5`. Razdoblje bez krajnjih točaka tijekom ponovnog stvaranja, sve dok zamjenska replika ne bude spremna, ostaje potpuni prekid rada — to je posljedica SQLite topologije, a ne pogrešne konfiguracije provjera.

Vanjski Postgres / HA s više zapisivača **nije** dokumentirani standardni način rada. Ako vam je potreban HA, zadržite jednu repliku ili koristite topologiju koju je projekt zasebno testirao i dokumentirao. Rad na podršci za Postgres/MySQL nalazi se u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dok to ne bude dostupno, jedini podržani način povećanja kapaciteta za **velike** `/v1/responses` zahtjeve jest N neovisnih procesa (sljedeći odjeljak), a ne `replicas > 1` na jednom volumenu.

## Horizontalno skaliranje: N neovisnih procesa

Jedan Node proces predstavlja **jednu V8 hrpu**. Dva preklapajuća zahtjeva agenta za kodiranje `POST /v1/responses` (RTK + Caveman), svaki veličine ~3 MiB / ~750k tokena, prekidaju tu hrpu na ~12 Gi (`FATAL ERROR: Reached heap limit`) i mogu uzrokovati OOM u cgroupu od 16 Gi. Pogledajte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). To mjerenje upozorava na **ograničenje memorijskog budžeta**, a nije strogo ograničenje proizvoda na dva istodobna duga zahtjeva `/v1/responses`. Prihvat zahtjevnih chatova ograničen je automatski izvedenim proračunom ulaznih bajtova (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimenzioniranim prema istoj granici V8-a/cgroupa — povećanje te vrijednosti (ili postavljanje starog ograničenja broja zahtjeva `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) u već dimenzioniranom procesu ponovno uzrokuje prekid. Mali chatovi, `/healthz`, `/v1/models` i MCP **nisu** obuhvaćeni tim ograničenjem.

### Jedan proces: više od dva duga zahtjeva `/v1/responses`

**Zdrav** proces (hrpa ispod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, zadano `0.75`) **može** izvršavati više od dva istodobna duga zahtjeva `POST /v1/responses` kada u proračunu bajtova zahtjeva u obradi za cijeli proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) još ima prostora. Tijela veličine jednake ili veće od `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (zadano 256 KiB) zauzimaju isti resurs za zahtjevne zahtjeve kao i strukturno složeni zahtjevi te upotrebljavaju isti izlaz `tryAcquireHealthyHeadroom` iz [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Deseci istodobnih dugotrajnih SSE klijenata (operatorima ih često treba 40–50) pitanje su **memorijskog budžeta** — dimenzionirajte hrpu + primarna/dodatna mjesta + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a ne strogog ograničenja proizvoda na „najviše 2”. Opterećena hrpa i dalje odbacuje zahtjeve s ponovljivom pogreškom `503` kako se #7849 ne bi ponovio.

Za **umnožavanje hrpa** (neovisnih starih prostora V8-a) **danas**:

| Učinite                                                                                                                                                                                                           | Nemojte                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Pokrenite **N kontejnera/podova**, svaki s **vlastitim** `DATA_DIR` / volumenom                                                                                                                                   | Postaviti `replicas > 1` nad jednom SQLite datotekom                     |
| Dimenzionirajte zahtjevne zahtjeve u obradi + dodatna mjesta za zdrav proces prema hrpi / proračunu bajtova zahtjeva u obradi; 1–2 konzervativna je zadana vrijednost iz #7849, a ne strogo ograničenje proizvoda | Jednom procesu dodijeliti 8× više RAM-a i neograničeno ograničenje broja |
| Neobavezno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za **dijeljene brojače kvota**                                                                                                                   | Tretirati Redis kao dijeljeni SQLite — on to nije                        |
| Kopirajte tajne pružatelja u svaku instancu (ili prihvatite odvojene nadzorne ploče)                                                                                                                              | Očekivati jednu nadzornu ploču / jedan dnevnik poziva među instancama    |
| Postavite bilo koji raspoređivač opterećenja ispred instanci; afinitet prema API ključu ili sesiji je dovoljan                                                                                                    | Zahtijevati međuopremu određenog dobavljača koja uzima u obzir veličinu  |

Hardver: broj istodobnih dugih zahtjeva `/v1/responses` po instanci pitanje je **memorijskog budžeta** (hrpa + bajtovi zahtjeva u obradi / #10110). `N` neovisnih direktorija `DATA_DIR` i dalje umnožava hrpe: RAM glavnog računala mora pokriti `N × cgroup`, a ne „jedan pod od 16 Gi s N=8”. Nikada nemojte postaviti `replicas > 1` nad jednom SQLite datotekom.

Skica za Compose (dvije hrpe, dva volumena — ne `deploy.replicas: 2`):

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

Gustoća unutar procesa (kompresija izvan HTTP izolata) opisana je u [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jedan logički klaster na dijeljenom trajnom stanju opisan je u [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionalne pogreške Geminija unutar Dockera

Google AI Studio / Gemini API može vratiti HTTP 400 sa statusom FAILED_PRECONDITION i porukom
`User location is not supported for the API use.` Uspješan zahtjev na glavnom računalu
ne dokazuje da spremnik koristi istu izlaznu rutu. Redoslijed DNS-a,
IPv4/IPv6 povezivost, VPN usmjeravanje i konfigurirani proxy poslužitelji mogu se razlikovati. Provjerite
[regije koje Google podržava](https://ai.google.dev/gemini-api/docs/available-regions)
kao i stvarnu rutu povezivanja; ova pogreška sama po sebi ne upućuje na neispravan API ključ.

### Dajte prednost proxyju specifičnom za vezu

Upotrijebite OmniRouteovu [konfiguraciju proxyja po vezi](../ops/PROXY_GUIDE.md#4-level-proxy-system)
za zahvaćenu Gemini vezu, a zatim ponovite **Test Connection** i mali zahtjev
s istim modelom. Time se promjena usmjeravanja ograničava na tu vezu. Provjerite
je li proxy dostupan iz spremnika i odabire li ga veza doista.
Promjena rute ne jamči regionalnu prihvatljivost kod nadređenog pružatelja usluge.

### Usporedite mrežne postavke glavnog računala i spremnika

Pri usporedbi autentificiranih rezultata zadržite isti ključ, model i zahtjev; nikada
ne umećite vjerodajnice, lozinke proxyja ili cjelovita autorizacijska zaglavlja u prijavu problema.
Najprije provjerite koje obitelji adresa nudi OS-ov razrješivač, koristeći istu naredbu
na glavnom računalu i unutar spremnika:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Zamijenite `omniroute` uslugom koju pokrećete (na primjer, `omniroute-web`). Ove
naredbe ispisuju obitelji adresa bez vjerodajnica ili IP adresa. Vraćena vrijednost `6`
prikazuje samo IPv6 DNS rezultat: ona **ne** dokazuje postojanje upotrebljive IPv6 rute ni pristupa API-ju.
Ako je `curl` instaliran, usporedite `curl -4 -I https://generativelanguage.googleapis.com`
s `curl -6 -I https://generativelanguage.googleapis.com` u oba okruženja.
HTTP odgovor potvrđuje povezivost za tu provjeru, čak i ako je riječ o pogrešci
neautentificiranog zahtjeva; samo autentificirani zahtjev modelu provjerava prihvatljivost za Gemini.

### Alternativa na razini glavnog računala: funkcionalni IPv6 i pravila razrješivača

Prijavitelj problema [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) obnovio je
pristup u svojem okruženju omogućivanjem IPv6-a za spremnik i promjenom glibc-ova odabira
adresa. Smatrajte ovo alternativom specifičnom za okruženje. Prije prilagođavanja postavki
razrješivača potvrdite funkcionalan IPv6 na glavnom računalu, izlazno povezivanje/usmjeravanje spremnika
i pravila vatrozida. Privatna ULA adresa sama po sebi ne potvrđuje javnu IPv6 povezivost.

Za usluge koje su već povezane sa zadanom Compose mrežom, ovaj fragment omogućuje
IPv6 na toj mreži; zadržite ostatak postavki usluge, priključke, volumene i konfiguraciju:

```yaml
networks:
  default:
    enable_ipv6: true
```

Za imenovanu mrežu omogućite ga na mreži s kojom se usluga doista povezuje. Docker može
dodijeliti ULA podmrežu; izričitu podmrežu koja se ne preklapa odaberite samo kada to vaša mreža
zahtijeva. Pogledajte [Dockerovo IPv6 umrežavanje](https://docs.docker.com/engine/daemon/ipv6/)
i [opcije Compose mreže](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Na **slici temeljenoj na glibc-u**, `/etc/gai.conf` može promijeniti odabir adresa. Trenutačni
Dockerfile repozitorija koristi Debian; prilagođene slike temeljene na musl-u ne koriste taj mehanizam.
Prijavljena prilagodba mijenja ULA oznaku iz `label fc00::/7 6` u
`label fc00::/7 1`. Započnite s cjelovitom tablicom pravila slike i sačuvajte njezine ostale
unose: dodavanje unosa `label` ili `precedence` zamjenjuje tu zadanu tablicu, pa datoteka
koja sadrži samo promijenjeni redak nije dovoljna.
[Referenca konfiguracije glibc-a](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentira tu semantiku. Montirajte pregledanu datoteku kao povezani resurs samo za čitanje na `/etc/gai.conf`
i ponovno stvorite uslugu kako biste primijenili promjenu.

Time se mijenja OS-ov odabir adresa za **sav izlazni promet u tom spremniku**.
To ne prisiljava svaku aplikaciju da odabere IPv6: važni su i Nodeov redoslijed DNS-a te
odabir veze. Konkretno, `--dns-result-order=ipv4first` daje prednost IPv4-u i
nije rješenje za problem koji se javlja samo uz IPv4. Pogledajte [redoslijed DNS-a u Nodeu](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Nakon svake promjene na razini glavnog računala ponovno testirajte Gemini i druge pružatelje usluga. Za vraćanje promjena
uklonite prilagođeno montiranje datoteke `gai.conf`, vratite prethodnu mrežnu konfiguraciju i
ponovno stvorite zahvaćenu uslugu/mrežu tijekom razdoblja održavanja. Ponovno stvaranje mreže
može prekinuti rad drugih spremnika povezanih s njom; nemojte brisati volumen s trajnim podacima.

## Važne napomene

- **SQLite WAL način rada:** Treba dopustiti da se `docker stop` dovrši kako bi OmniRoute mogao zapisati najnovije promjene natrag u `storage.sqlite` putem kontrolne točke. Priložene Compose datoteke već postavljaju razdoblje odgode zaustavljanja na 40 s. Ako izravno pokrećete sliku, zadržite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Postavite na `true` ako se rutinskim sigurnosnim kopijama i sigurnosnim kopijama prije zapisivanja upravlja izvana. Migracije postojećih baza podataka i dalje zahtijevaju vlastitu trajnu sigurnosnu snimku i zaštitu od masovne migracije.
- **Trajnost podataka:** Uvijek montirajte volumen na `/app/data` kako biste sačuvali bazu podataka, ključeve i konfiguracije nakon ponovnih pokretanja spremnika.
- **Konfiguracija priključka:** Nadjačajte varijablu okruženja `PORT` kako biste promijenili zadani priključak `20128`.

## Pogledajte također

- [Vodič za implementaciju na VM-u](../ops/VM_DEPLOYMENT_GUIDE.md) — Postavljanje VM-a, nginx-a i Cloudflarea
- [Vodič za implementaciju na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementacija na Fly.io
- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Potpuna referenca za `.env`
