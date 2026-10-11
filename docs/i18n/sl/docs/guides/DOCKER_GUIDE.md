# 🐳 Docker Guide — OmniRoute (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Celoten referenčni priročnik za uvedbo z Dockerjem. Za hiter začetek si oglejte [razdelek o Dockerju v datoteki README](../README.md#-docker).

## Kazalo vsebine

- [Hiter zagon](#quick-run)
- [Z datoteko okolja](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Razpoložljivi profili](#available-profiles)
- [Konfiguriranje gostiteljskih orodij CLI, ko OmniRoute deluje v Dockerju](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Spremljevalni vsebnik Redis](#redis-sidecar)
- [Produkcijski Compose](#production-compose)
- [Faze datoteke Dockerfile](#dockerfile-stages)
- [Ključne okoljske spremenljivke](#critical-environment-variables)
- [Docker Compose s Caddyjem (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Hitri tunel Cloudflare](#cloudflare-quick-tunnel)
- [Oznake slik](#image-tags)
- [Razpoložljivost: privzeti SQLite podpira eno repliko](#availability-default-sqlite-is-single-replica)
- [Regionalne napake Gemini znotraj Dockerja](#gemini-regional-errors-inside-docker)
- [Pomembne opombe](#important-notes)

---

## Hiter zagon

> **Samostojno gostovanje z enim ukazom?** Oglejte si
> [Vodnik za samostojno gostovanje](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika +
> Redis, dostop samo prek povratne zanke, brez izbire profila). Spodnji hitri zagon
> uporablja en sam vsebnik in je namenjen uporabnikom, ki Redis že izvajajo drugje.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Z datoteko okolja

```bash
# Najprej kopirajte in uredite datoteko .env
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
# Osnovni profil (brez orodij CLI)
docker compose --profile base up -d

# Profil CLI (vgrajeni Claude Code, Codex in OpenClaw)
docker compose --profile cli up -d

# Gostiteljski profil (prednostno za Linux; gostiteljske izvršljive datoteke CLI priklopi samo za branje)
docker compose --profile host up -d

# Spletni profil (Chromium/Playwright za ponudnike spletnih sej)
docker compose --profile web up -d

# Združite CLI in spremljevalni vsebnik CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Razpoložljivi profili

OmniRoute vključuje profile Compose za glavne načine uvedbe. Izberite tistega, ki ustreza vašemu okolju.

| Profil            | Storitev         | Kdaj ga uporabiti                                                                                                                                               | Ukaz                                         |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (privzeto) | `omniroute-base` | Strežnik brez grafičnega vmesnika/minimalno izvajalno okolje, brez vključenih orodij CLI ponudnikov                                                             | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentski delovni tokovi, ki kličejo `omniroute providers/setup/doctor`, in vključena orodja CLI (Codex, Claude Code, Droid, OpenClaw)                           | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Gostitelji Linux, ki želijo dostop, podoben `network_mode`, do gostiteljskih orodij CLI s priklopom `~/.local/bin`, `~/.codex`, `~/.claude` itd. samo za branje | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Zaženite spremljevalni vsebnik [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na vratih `8317` za posredovanje zahtev do izvornih orodij CLI       | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Ponudniki spletnih sej, ki potrebujejo brskalnik: `gemini-web`, `claude-web`, `claude-turnstile` (zgradi `runner-web`, Chromium je vključen)                    | `docker compose --profile web up -d`         |

> Združite lahko več profilov: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguriranje gostiteljskih orodij CLI, ko OmniRoute deluje v Dockerju

`omniroute setup-codex`, `setup-claude`, `config set <tool>` in gumb
**Shrani konfiguracijo** na nadzorni plošči zapisujejo datoteke, kot je `~/.codex/*.config.toml`. Te poti
imajo pomen samo v računalniku, v katerem CLI dejansko deluje. Če jih zaženete
znotraj vsebnika, se zapis izvede v lastni domači imenik vsebnika (`/home/node` —
slika se izvaja kot `USER node`), kjer ga noben gostiteljski CLI ne bo nikoli prebral in kjer bo
zavrženo takoj, ko bo vsebnik znova ustvarjen.

OmniRoute to zazna in zavrne zapis ter namesto
poročanja o uspehu, ki ga ne morete uporabiti, prikaže navodila: CLI se konča s kodo `2`, API pa odgovori s `422`
in `containerEphemeralTarget: true`.

### Priporočeno: CLI zaženite na gostitelju, OmniRoute pa v Dockerju

Vsebnik zagotavlja API; CLI konfigurira vaša gostiteljska orodja.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # usmerite CLI na vsebnik
omniroute setup-codex                      # zapiše dejanski ~/.codex na vašem gostitelju
```

To je prava izbira, kadar se Codex, Claude Code, Cursor ali podobna orodja izvajajo na vašem
prenosniku — kar je običajna nastavitev.

### Druga možnost: priklopite gostiteljske konfiguracijske imenike z vezanim priklopom (profil `host`)

Če želite, da vsebnik sam zapisuje gostiteljsko konfiguracijo, priklopite
imenike in nastavite `CLI_CONFIG_HOME` na koren priklopa. Profil `host`
to že omogoča:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Vezani priklop zagotavlja, da je pot zaupanja vredna: OmniRoute prebere
`/proc/self/mountinfo` in dovoli zapisovanje v priklopljene poti (ter v imenike,
katerih podrejeni elementi so priklopi, kar natančno ustreza zgornji strukturi `/host-home`), medtem ko
še vedno zavrača nepriklopljene poti.

### Izhod v sili: konfigurirajte CLI-je samega vsebnika (uporabljajte zadržano)

Kadar so CLI-ji dejansko nameščeni znotraj vsebnika (profil `cli`), je zapis
nameren. Vsakemu ukazu `setup-*` podajte `--allow-container-write` ali pa za strežnik nastavite
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Zapis se izvede
z opozorilom, da po odstranitvi vsebnika ne bo ohranjen.

> **Varnostno opozorilo — profil `cli` + priklop `docker.sock`.**
> Profil `cli` z vezanim priklopom priklopi `/var/run/docker.sock`, da lahko samodejni
> posodabljalnik v vsebniku znova ustvari sklad prek gostiteljskega demona
> (`src/lib/system/autoUpdate.ts` preveri prisotnost te vtičnice in preskoči
> pot Dockerja, kadar je ni). Ta vtičnica predstavlja **mejo zaupanja z dostopom root do
> gostitelja**: vse, kar lahko dostopa do nje, upravlja gostiteljski demon Docker kot
> root — ustvari, pregleda, ustavi in odstrani lahko kateri koli vsebnik na gostitelju.
> Posledice:
>
> 1. **Vrat profila `cli` nikoli ne izpostavljajte omrežju.** Objavite
>    jih na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli`, dosegljiv prek omrežja LAN, spremeni katero koli izvajanje kode na daljavo na ravni nadzorne plošče v
>    popoln prevzem gostitelja.
> 2. **V profil `cli` ne priklapljajte dodatnih gostiteljskih imenikov.**
>    Vtičnica Docker skupaj s katerim koli dodatnim priklopom vsebniku omogoči popoln
>    dostop za branje in pisanje v vaš datotečni sistem ter gostiteljsko konfiguracijo. Če mora orodje
>    dostopati do projekta, ga zaženite lokalno z izvedljivo datoteko CLI — ne priklapljajte ga
>    v vsebnik `cli`.
>
> Če samodejnega posodabljanja v vsebniku ne potrebujete, profila `cli` ne vklopite
> (`COMPOSE_PROFILES=core,redis` ali manj). Drugi profili ne
> priklapljajo vtičnice Docker.
>
> Za povezani model groženj glede MITM glejte `docs/security/MITM-TPROXY-DECRYPT.md` (git; ni prevedeno v `/docs`),
> za verigo izvora izvedljivih datotek
> `codex`/`claude-code`/`droid`/`openclaw` pa `docs/security/SUPPLY_CHAIN.md`.

## Redis Sidecar

OmniRoute uporablja Redis kot osnovo za porazdeljeni omejevalnik hitrosti in skupni predpomnilnik. Storitev `redis` je **vedno definirana** v datoteki `docker-compose.yml` (ni omejena s profilom) in se zažene skupaj s katerim koli drugim profilom.

| Podrobnost                 | Vrednost                                 |
| -------------------------- | ---------------------------------------- |
| Slika                      | `redis:7-alpine`                         |
| Ime vsebnika               | `omniroute-redis`                        |
| Notranja vrata             | `6379`                                   |
| Vrata gostitelja (prepis)  | `REDIS_PORT` (privzeto `6379`)           |
| Vezava gostitelja (prepis) | `REDIS_BIND_HOST` (privzeto `127.0.0.1`) |
| Nosilec                    | `omniroute-redis-data` → `/data`         |
| Preverjanje stanja         | `redis-cli ping` (interval 10 s)         |

Povezane okoljske spremenljivke:

- `REDIS_URL` — povezovalni niz, posredovan aplikaciji (privzeto `redis://redis:6379`).
- `REDIS_PORT` — preslikava vrat gostitelja za vsebnik Redis.
- `REDIS_BIND_HOST` — omrežni vmesnik gostitelja, na katerem so objavljena vrata. Privzeta vrednost je `127.0.0.1`.

> **Zakaj je privzeto uporabljen povratni vmesnik:** pomožni vsebnik se izvaja brez možnosti `requirepass`, aplikacijski
> vsebniki pa do njega dostopajo prek omrežja compose (`redis:6379`) — objavljena vrata so
> namenjena samo orodjem na gostitelju (`redis-cli`, lokalni `npm run dev`). Objava na
> `0.0.0.0` bi neoverjeni Redis izpostavila vsakemu gostitelju v vašem lokalnem omrežju. Če nastavite
> `REDIS_BIND_HOST=0.0.0.0`, dodajte tudi `--requirepass` v `command:` storitve.

**Onemogočanje Redisa** ni priporočljivo (omejevalnik hitrosti bo prešel na nadomestno delovanje v pomnilniku). Če ga morate onemogočiti, odstranite oziroma zakomentirajte blok storitve `redis:` v datoteki `docker-compose.yml` ali zmanjšajte število primerkov na nič:

```bash
docker compose up -d --scale redis=0
```

## Produkcijski Compose

Za izoliran produkcijski posnetek, ki se izvaja vzporedno z razvojnim okoljem, uporabite `docker-compose.prod.yml`.

| Podrobnost                     | Vrednost                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| Datoteka                       | `docker-compose.prod.yml`                                                                     |
| Privzeta vrata nadzorne plošče | `PROD_DASHBOARD_PORT=20130` (preslikana na notranja `${DASHBOARD_PORT:-20128}`)               |
| Privzeta vrata API-ja          | `PROD_API_PORT=20131`                                                                         |
| Slika                          | `omniroute:prod` (zgrajena iz cilja `runner-cli`)                                             |
| Vsebnik Redis                  | `omniroute-redis-prod` (`redis:8.6.2`, namenski nosilec `redis-prod-data`)                    |
| Podatkovni nosilec             | `omniroute-prod-data` (imenovan, ohranjen med ponovnimi gradnjami)                            |
| Preverjanja stanja             | `node healthcheck.mjs` + `redis-cli ping`, pri čemer je `depends_on` pogojen s stanjem Redisa |

Uporaba:

```bash
# Zgradite in zaženite produkcijski sklad
docker compose -f docker-compose.prod.yml up -d --build

# Sprotno spremljajte dnevnike
docker compose -f docker-compose.prod.yml logs -f

# Zaustavite sklad (ohranite nosilce)
docker compose -f docker-compose.prod.yml down
```

Produkcijski sklad se izvaja vzporedno z razvojnim skladom compose (uporablja drugačna imena vsebnikov, vrata in nosilce), zato lahko nadaljujete lokalni razvoj, medtem ko produkcijsko okolje ostane zagnano.

## Faze datoteke Dockerfile

Repozitorij vključuje večstopenjsko datoteko Dockerfile (`Dockerfile`). Na voljo so štiri faze; izberite ustrezen `target` za svoj primer uporabe.

| Faza          | Osnovna slika         | Namen                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Namesti odvisnosti (`npm ci --legacy-peer-deps`) in zažene `npm run build` (privzeto Turbopack — glejte spodnji razdelek Viri med gradnjo)                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Produkcijsko izvajalno okolje s samostojnim izhodom Next.js. **Orodja CLI ponudnikov niso vključena.**                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | Doda `git`, `docker.io`, `docker-compose` in globalna orodja CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **To možnost izberite za agentske delovne tokove.**                                                                                              |
| `runner-web`  | `runner-base`         | Doda Playwright in brskalnik Chromium (`--with-deps`) za ponudnike spletnih sej: `gemini-web`, `claude-web`, `claude-turnstile`. **To možnost izberite, kadar uporabljate te ponudnike** — navadna slika brez nje odpove ob zahtevi (glejte opombo o `-web` v razdelku Kanali izdaj). |

Ročno zgradite določen cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Viri med gradnjo

Trije argumenti gradnje določajo porabo virov faze `builder`. Uporabljajo se samo med gradnjo —
`OMNIROUTE_MEMORY_MB` (spodaj) je ločena nastavitev za čas izvajanja.

| Argument gradnje            | Privzeto | Učinek                                                                                            |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` gradi z webpackom: nižja največja poraba pomnilnika, vendar počasneje. `1` vključi Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Zgornja meja kopice V8 (`--max-old-space-size`) za zagnani proces `next build`.                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Nastavi `CIRCLE_NODE_TOTAL`; Next za zbiranje podatkov strani izpelje `workers = N - 1`.          |

`OMNIROUTE_BUILD_WORKERS` je nastavitev, ki jo povečajte pri zmogljivem graditelju, in
prva, na katero posumite, ko gradnja z omejenimi viri odpove **po** sporočilu `✓ Compiled successfully`. Vsak
delavec za podatke strani je samostojen proces, prav tako tudi nadrejeni proces `next build`;
reprodukcija na delujočem strežniku VPS (težava #7518) je izmerila največji RSS vsakega procesa pri
~4,5 GB, neodvisno od zastavice kopice `NODE_OPTIONS` (Turbopack prevaja v
izvornem pomnilniku/Rustu zunaj kopice V8). Privzeta vrednost `2` (→ 1 delavec, skupaj 2
procesa) je prilagojena izvajalnikom, ki jih gosti GitHub, s 16 GB pomnilnika in 4 vCPU, ki jih
uporablja cevovod za objavljanje. Pri `8` (→ 7 delavcev) je temu izvajalniku zmanjkalo pomnilnika in
buildkit je korak prekinil z napako `ResourceExhausted: ... cannot allocate memory`;
tudi `3` (→ 2 delavca) se ni prileglo, ko je bil RSS na proces izmerjen
neposredno namesto ocenjen. `tests/unit/docker-build-memory-budget.test.ts`
izvede izračun na podlagi izmerjene vrednosti in spodleti, če katera koli nastavitev
preseže zmogljivost izvajalnika.

Turbopack prevaja v izvornem pomnilniku Rust, ki je **zunaj** kopice V8, zato ga
`OMNIROUTE_BUILD_MEMORY_MB` ne omejuje. Na gostitelju z omejitvijo pomnilnika
gradnjo nato brez kakršnega koli besedila napake prekine ubijalec OOM s signalom SIGKILL — preprosto
se ustavi sredi koraka `Creating an optimized production build`, kar je videti kot zastoj in ne
kot pomanjkanje pomnilnika. Zato datoteka `Dockerfile` privzeto uporablja webpack
(`OMNIROUTE_USE_TURBOPACK=0`), v nasprotju z `npm run dev` / `npm run build`, kjer je
Turbopack privzeta izbira v kodi: goli ukaz `docker build .` brez argumentov gradnje (ki ga
izvajajo Railway in drugi gostitelji z namestitvijo z enim klikom) ne sme tiho odpovedati na
graditelju z omejenim pomnilnikom. Objavljene slike že izrecno posredujejo
`OMNIROUTE_USE_TURBOPACK=0` v `docker-publish.yml`. Na graditelju z veliko
pomnilnika RAM vključite Turbopack za hitrejšo gradnjo:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogočen, zato `next build` zažene nadrejeni **in** delavski
proces, vsak pa ločeno upošteva `OMNIROUTE_BUILD_MEMORY_MB`. Omejitev vsebnika
nastavite nad približno dvakratno vrednostjo te nastavitve, ne le nad enkratno.

Izmerjeno na tem drevesu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketnik  | Omejitev vsebnika | Rezultat                                     |
| --------- | ----------------- | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB    | v obeh primerih tiho prekinjeno zaradi OOM   |
| webpack   | 8 GiB             | delavec gradnje prekinjen s signalom SIGKILL |
| webpack   | 12 GiB            | uspešno, največja poraba 11,1 GiB            |

### Privzete nastavitve med izvajanjem

Privzete vrednosti, ki jih izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Obnašanje pomnilnika v okolju Docker:

- Slika nastavi `OMNIROUTE_MEMORY_MB=1024` in iz te vrednosti izpelje `NODE_OPTIONS=--max-old-space-size=1024`.
- Dejanski strežniški proces zažene samostojni zaganjalnik, ki prebere `OMNIROUTE_MEMORY_MB` in doda `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node uporabi zadnjo ponovljeno vrednost `--max-old-space-size`, zato nastavitev `OMNIROUTE_MEMORY_MB` določa dejansko omejitev kopice v Dockerju.
- Ker jo slika vedno nastavi, se lastna nadomestna vrednost zaganjalnika, prilagojena količini RAM-a, v Dockerju nikoli ne uporabi. Za delovno obremenitev jo izrecno povečajte (glejte spodnjo tabelo). `2048` je še vedno premalo za `/v1/responses` agenta za programiranje.

### RAM med izvajanjem za agente za programiranje

Privzeti 1 GiB v Dockerju je spodnja meja za nadzorno ploščo oziroma lahek klepet, ne pa velikost za produkcijsko okolje. Dolga telesa zahtev `POST /v1/responses` (stotine sporočil, več deset orodij) med stiskanjem ohranijo več grafov v pomnilniku. Dve prekrivajoči se zahtevi velikosti približno 3 MiB oziroma približno 750.000 žetonov sta povzročili prekinitev V8 pri **12 GiB** prostora za stare objekte (`FATAL ERROR: Reached heap limit`) in tudi prekoračili omejitev pomnilnika cgroup v velikosti 16 GiB, zaradi česar je OOM končal proces. Glejte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Omejitev **cgroup `--memory` nastavite višje od velikosti kopice** — izvorni medpomnilniki, SQLite in vmesni podatki stiskanja so zunaj V8.

| Delovna obremenitev                           | `OMNIROUTE_MEMORY_MB`       | Vsebnik / cgroup                | Opombe                                                                                                                      |
| --------------------------------------------- | --------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Nadzorna plošča, en lahek klepet              | `1024` (privzeto v sliki)   | ≥2 GiB                          |                                                                                                                             |
| En agent za programiranje (Claude/Codex/Grok) | `8192`                      | ≥10 GiB                         | Običajna enojna seja `/v1/responses`                                                                                        |
| Dve sočasni dolgi zahtevi `/v1/responses`     | `10240`–`12288`             | ≥12–16 GiB                      | Izmerjena prekinitev V8 pri približno 12 GiB kopice                                                                         |
| Trije ali več sočasnih dolgih kontekstov      | ne izvajajte v enem procesu | izvajajte zaporedno / več RAM-a | Privzeto je dovoljena 1 zahtevna zahteva v izvajanju; povečanje te vrednosti brez dodatnega RAM-a znova povzroči prekinitev |

`omniroute serve` pri neposrednem izvajanju na strojni opremi nastavi približno 35 % RAM-a (omejeno na `[512, 4096]`), kadar `OMNIROUTE_MEMORY_MB` **ni nastavljen**. Docker vedno nastavi `1024`, zato se to prilagajanje v uradni sliki nikoli ne izvede.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Ključne okoljske spremenljivke

Poleg privzetih vrednosti, dokumentiranih v [ENVIRONMENT.md](../reference/ENVIRONMENT.md), so pri izvajanju v okolju Docker najpomembnejše naslednje spremenljivke:

| Spremenljivka                 | Namen                                                                                                                                                                                                                                                                                                | Privzeta vrednost                   |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Skupna skrivnost za most WebSocket. **Obvezna v produkciji** — nastavite jo na močan naključni niz.                                                                                                                                                                                                  | ni nastavljena (treba jo je podati) |
| `REDIS_URL`                   | Niz za povezavo z zalednim sistemom za omejevanje hitrosti/cache                                                                                                                                                                                                                                     | `redis://redis:6379`                |
| `REDIS_PORT`                  | Vrata gostitelja za priloženi vsebnik Redis                                                                                                                                                                                                                                                          | `6379`                              |
| `REDIS_BIND_HOST`             | Gostiteljski vmesnik, na katerem so objavljena vrata priloženega vsebnika Redis (povratna zanka, razen če dodate AUTH)                                                                                                                                                                               | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Pot na gostitelju, vpeta v profil `cli` na `/workspace/omniroute` za postopke samodejnega posodabljanja                                                                                                                                                                                              | `.` (trenutni imenik)               |
| `OMNIROUTE_MEMORY_MB`         | Omejitev kopice Node med izvajanjem za samostojni strežnik Docker; preglasi zgornjo privzeto vrednost slike. Agenti za programiranje: `8192`+ (glejte [pomnilnik RAM med izvajanjem](#runtime-ram-for-coding-agents)).                                                                               | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Preglasitev izpostavljenih vrat za nadzorno ploščo (20128) in API (20129)                                                                                                                                                                                                                            | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Gostiteljski vmesnik, na katerem docker-compose objavi vrata nadzorne plošče/API/live-WS. Če je `REQUIRE_API_KEY=false` (privzeto), `0.0.0.0` izpostavi anonimni posredniški strežnik `/v1` lokalnemu omrežju — obseg razširite le z `REQUIRE_API_KEY=true` ali s posredniškim strežnikom pred njim. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Gostiteljski vmesnik, na katerem docker-compose objavi stranski vsebnik `cliproxyapi` — njegov podatkovni nosilec hrani poverilnice ponudnika.                                                                                                                                                       | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Imenik, ki ga pregledovalnik vtičnikov med izvajanjem bere in vanj namešča vtičnike. Nastavite ga, ko so vtičniki vpeti z vezavo: privzeta vrednost sledi `HOME`, ki je sliki ni treba izvoziti.                                                                                                     | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | Podpot URL-ja, ko je aplikacija objavljena za posredniškim strežnikom (npr. `/omniroute`)                                                                                                                                                                                                            | _(prazno = koren)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Javni izvor brskalnika, vključno s podpotjo (npr. `https://host/omniroute`)                                                                                                                                                                                                                          | ni nastavljena                      |
| `PROD_DASHBOARD_PORT`         | Vrata nadzorne plošče na strani gostitelja za `docker-compose.prod.yml`                                                                                                                                                                                                                              | `20130`                             |
| `CLIPROXYAPI_PORT`            | Vrata na strani gostitelja za stranski vsebnik `cliproxyapi`                                                                                                                                                                                                                                         | `8317`                              |

## Povratni posredniški strežnik na podpoti (Traefik / nginx)

Vrednost `basePath` ogrodja Next.js se prevede v samostojni paket. OmniRoute zapiše vgrajeno
vrednost v označevalno datoteko v korenu aplikacije (zapisano med `npm run build`; prebrano v
`scripts/docker/ensure-docker-base-path.mjs`) in jo ob zagonu vsebnika primerja z
`OMNIROUTE_BASE_PATH`. Če se vrednosti razlikujeta in je bila slika zgrajena za koren
domene, vstopna točka prepiše manifeste samostojnega paketa, vdelane
literale `basePath`/`assetPrefix` (Next 16 upodablja URL-je sredstev SSR zgolj iz
`assetPrefix` — program za popravke vanj preslika tudi podpot), vgrajene
URL-je sredstev `/_next/static` (manifeste sklicev odjemalca, uvoze predstavnostnih
datotek, vnaprej upodobljene strani z napakami) in odjemalski nadomestek `process.env`,
preden se zažene `node dev/run-standalone.mjs`.

### Gradnja s Compose (priporočeno)

Nastavite obe spremenljivki v `.env`, nato znova zgradite sliko, da se slika in izvajalno okolje ujemata:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` posreduje `OMNIROUTE_BASE_PATH` kot argument gradnje Docker in kot
spremenljivko izvajalnega okolja.

### Vnaprej zgrajena korenska slika + podpot med izvajanjem

Objavljene slike `diegosouzapw/omniroute:*` so zgrajene za koren domene. Kljub temu lahko
med izvajanjem nastavite `OMNIROUTE_BASE_PATH`; vsebnik ob zagonu enkrat popravi paket.
Uporabite ga skupaj z ustreznim javnim izvorom:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Povratni posredniški strežnik konfigurirajte tako, da posreduje **celotno** zunanjo pot (predpone ne
odstranite). Traefik mora usmerjati `PathPrefix(`/omniroute`)` v vsebnik brez
`StripPrefix`, tako da Next.js prejme `/omniroute/...` in streže sredstva iz
`/omniroute/_next/...`.

Preverjanje stanja Docker preverja lahkotno končno točko življenjskega cikla `/healthz`, ki ima
predpono aktivne vrednosti `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostaja na voljo za
diagnostiko za uporabnike in nadzorne plošče; če želite preverjanje HEALTHCHECK vsebnika znova usmeriti nanjo (na primer
za uveljavljanje poglobljenega preverjanja stanja), nastavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ta pot izvaja **poglobljeno** preverjanje (podatkovna zbirka + povzetek spremljanja) — primerno za Dockerjevo
redko izvajanje `HEALTHCHECK`, če ga znova omogočite, vendar **ne** za intervale Kubernetesovega preverjanja `livenessProbe`.

Za orkestratorje (Kubernetes, Nomad itd.):

| Preverjanje            | Priporočeno                                                            | Izogibajte se                                                                   |
| ---------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Živost                 | HTTP `GET /livez` ali TCP na glavnih vratih (`PORT`, privzeto `20128`) | uporabi `/api/monitoring/health` za preverjanje živosti                         |
| Pripravljenost         | HTTP `GET /healthz`                                                    | kratkim časovnim omejitvam, ki obremenjeno zanko dogodkov obravnavajo kot mrtvo |
| Poglobljeno / blackbox | `/api/monitoring/health`                                               | —                                                                               |

`/healthz` poroča o življenjskem ciklu procesa (`ok` / `starting` / `stopping`). `/livez` preverja
zgolj, ali je proces živ (vrne 200, kadar se obdelovalnik lahko izvede; ne čaka na
pripravljenost). Obe preverjanji še vedno tečeta v isti zanki dogodkov Node kot obdelava zahtev, zato ju lahko
procesorsko intenzivno delo s katalogom ali stiskanjem zakasni — obremenjeno ≠ mrtvo. Če preverjanja HTTP
prekoračijo časovno omejitev, za preverjanje živosti raje uporabite TCP. Celotna navodila za preverjanja:
[vodnik za spremljanje — priporočila za preverjanja Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddyjem (samodejni TLS za HTTPS)

OmniRoute lahko varno izpostavite z uporabo Caddyjevega samodejnega zagotavljanja potrdil SSL. Prepričajte se, da zapis DNS A vaše domene kaže na naslov IP vašega strežnika.

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
      # Izvor, viden brskalniku, za povratne klice OAuth, povezave nadzorne plošče in ustvarjene javne URL-je.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Notranji URL med strežniki za načrtovana opravila/samodejne poizvedbe.
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

Caddy nastavi standardne glave za posredovanje za nadrejeni vsebnik. OmniRoute uporablja
`NEXT_PUBLIC_BASE_URL` kot kanonični javni izvor za povratne klice OAuth in ustvarjene javne
povezave; overjeni zapisi z nadzorne plošče uporabljajo zahteve istega izvora in zaščito CSRF,
vezano na sejo. `OMNIROUTE_TRUST_PROXY` omogočite samo pri naprednih uvedbah, pri katerih želite,
da OmniRoute javni izvor namenoma določi iz zaupanja vrednih posredovanih glav namesto izrecne
konfiguracije.

## Hitri tunel Cloudflare

Podpora nadzorne plošče za uvedbe Docker vključuje **hitri tunel Cloudflare** z enim klikom na strani `Nadzorna plošča → Končne točke`. Ob prvi omogočitvi se `cloudflared` prenese samo, ko je potreben, zažene se začasni tunel do vaše trenutne končne točke `/v1`, ustvarjeni URL `https://*.trycloudflare.com/v1` pa se prikaže neposredno pod vašim običajnim javnim URL-jem.

Plošče tunelov končnih točk (Cloudflare, Tailscale, ngrok) lahko prikažete ali skrijete v `Nastavitve → Videz`, ne da bi spremenili stanje aktivnega tunela.

### Opombe o tunelih

- URL-ji hitrih tunelov so začasni in se spremenijo po vsakem ponovnem zagonu.
- Hitri tuneli se po ponovnem zagonu OmniRoute ali vsebnika ne obnovijo samodejno. Po potrebi jih znova omogočite na nadzorni plošči.
- Upravljana namestitev trenutno podpira Linux, macOS in Windows na arhitekturah `x64` / `arm64`.
- Upravljani hitri tuneli privzeto uporabljajo prenos HTTP/2, da se izognejo hrupnim opozorilom o medpomnilniku UDP za QUIC v okoljih vsebnikov z omejenimi viri. Če želite drug način prenosa, nastavite `CLOUDFLARED_PROTOCOL=quic` ali `auto`.
- Slike Docker vključujejo sistemska korenska potrdila CA in jih posredujejo upravljanemu programu `cloudflared`, kar prepreči napake zaupanja TLS, ko se tunel inicializira znotraj vsebnika.
- Če želite, da OmniRoute namesto prenosa uporabi obstoječo binarno datoteko, nastavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Oznake slik

| Slika                    | Oznaka   | Velikost | Opis                                                              |
| ------------------------ | -------- | -------- | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Najvišja **objavljena** stabilna različica SemVer (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | To vrsto oznake pripnite za GitOps                                |

Večplatformni manifest: izvorni `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker samodejno izbere ustrezno arhitekturo; če morate na gostiteljih ARM vsiliti emulacijo AMD64, podajte `--platform linux/amd64`.

### Kanali izdaj

OmniRoute objavlja ločene kanale Docker za stabilne izdaje, preizkušanje aktivne veje izdaje in razvojne gradnje.

| Kanal                           | Vir                                               | Spremenljivost                  | Priporočena uporaba                                                                                                          |
| ------------------------------- | ------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Podpisana/različicena izdaja                      | Nespremenljivo                  | Produkcijske uvedbe, ki so pripete na točno določeno izdajo                                                                  |
| `:latest` / `:latest-web`       | Najvišja **objavljena** stabilna različica SemVer | Spremenljiv stabilni kazalec    | Sledi stabilnim izdajam **po** opravilu objave SemVer — **ne** sledi veji `main` ali neobjavljenim uveljavitvam `release/v*` |
| `:next` / `:next-web`           | Trenutna privzeta veja `release/v*`               | Spremenljiv predizdajni kazalec | Preizkušanje popravkov, ki so že vključeni v aktivno vejo izdaje, vendar še niso del stabilne izdaje                         |
| `:main` / `:main-web`           | Veja `main`                                       | Spremenljiv razvojni kazalec    | Samo za razvojno in integracijsko preizkušanje                                                                               |

#### Ponudniki spletnih sej: slike `-web`

Vsak zgornji kanal ima tudi oznako `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), zgrajeno iz stopnje `runner-web` — gre za isto sliko z dodanima Playwrightom in brskalnikom Chromium. Običajna slika je dobavljena **brez** Chromiuma; `gemini-web`, `claude-web` in `claude-turnstile` ga potrebujejo.

Napaka se pojavi šele pozneje, ne ob zagonu: ti ponudniki navedejo svoje modele in so na nadzorni plošči prikazani kot povezani, napaka pa se pojavi šele pri prvi zahtevi:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Če uporabljate te ponudnike, prenesite oznako `-web` kanala, ki ga že uporabljate — nič drugega se ne spremeni. Pri namestitvi npm/CLI (brez slike Docker) manjka enakovredna komponenta, in sicer binarna datoteka brskalnika: na gostitelju zaženite `npx playwright install chromium`.

#### Uporaba predizdajnega kanala

Kanal `next` se znova zgradi ob vsakem potisku v trenutno privzeto vejo `release/v*` in je objavljen za AMD64 ter ARM64. Starejše vzdrževalne veje ga ne morejo prepisati. Kanal zagotavlja sliko, ki jo je mogoče prenesti, za popravke, združene v aktivno vejo izdaje, preden je ustvarjena naslednja stabilna oznaka.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Za Docker Compose preglasite oznako slike, ki jo uporablja izbrani profil, nato prenesite sliko in znova ustvarite storitev:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Varnost in povrnitev

`next` je plavajoči kanal predizdajnih različic. Spremeni se lahko ob vsakem potisku v aktivno vejo izdaje in **ni podprt za uporabo v produkciji**. Med preverjanjem določene gradnje pripnite izvleček slike:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pred preizkušanjem varnostno kopirajte podatkovni nosilec OmniRoute ali priklopljeni podatkovni imenik. Za povrnitev obnovite prej uporabljeno stabilno različico ali izvleček in znova ustvarite vsebnik:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Gradnja iz veje izdaje ne more nikoli premakniti oznake `latest`; stabilni kazalec lahko posodobi samo ustrezna stabilna semantična različica. Slike `next` ohranjajo preverjanje slike izdaje in blokirajoča vrata za ranljivosti stopnje CRITICAL.

**`latest` ni jamstvo aktualnosti glede na git.** Združenih popravkov v veji `main` ali aktivni veji `release/v*` **ni** v `:latest`, dokler ni objavljena stabilna slika SemVer in opravilo objave ne posodobi oznake `:latest` (isti izvleček kot pri tej različici SemVer). Če je oznaka `latest` videti nespremenjena, čeprav GitHub že prikazuje popravek, za preizkus veje izdaje prenesite `:next` ali počakajte na oznako SemVer.

| Kaj želite                                                                                | Uporabite                              |
| ----------------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps / produkcija, ki se ne sme nenadzorovano spreminjati                               | Pripnite `:X.Y.Z` (ali izvleček slike) |
| Slediti objavljenim stabilnim različicam in ob vsaki izdaji sprejeti vnovično ustvarjanje | `:latest`                              |
| Preizkusiti neobjavljene uveljavitve `release/v*`                                         | `:next` (ne za produkcijo)             |
| Preizkusiti `main`                                                                        | `:main` (ne za produkcijo)             |

## Razpoložljivost: privzeti SQLite podpira eno samo repliko

Standardna namestitev OmniRoute z Dockerjem / Kubernetesom je **en proces Node + en zapisovalnik SQLite**. Visoka razpoložljivost v tej topologiji **ni podprta**.

| Omejitev                                                         | Posledica                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| En zapisovalnik                                                  | **Ne** zaganjajte več replik z isto datoteko SQLite. S tem poškodujete podatkovno zbirko.                                                                                                                                                                                                                                                                      |
| Ponovna izdelava / ponovni zagon / prekinitev zaradi HEALTHCHECK | **Popoln izpad** aktivnih povezav SSE, sej nadzorne plošče in stanja v pomnilniku. Povezava se prekine vsem povezanim odjemalcem. Nove zahteve med obdobjem brez končnih točk od povratnega posredniškega strežnika prejmejo **`502 Bad Gateway: Unknown error`**, ne pa JSON-a OmniRoute — odjemalci tega ne morejo razlikovati od napake ponudnika (#11015). |
| Ista zanka dogodkov kot `/healthz`                               | Obremenjena operacija kataloga ali stiskanja lahko zakasni preverjanja; kratka časovna omejitev nato ponovno zažene **edino** repliko.                                                                                                                                                                                                                         |

**Matrika preverjanj** (glejte tudi [priporočila za preverjanja Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Preverjanje            | Cilj                                                               | Ne uporabljajte                                                                  |
| ---------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Živost                 | TCP na `PORT` (privzeto `20128`) ali prizanesljivi HTTP `/healthz` | `/api/monitoring/health`                                                         |
| Pripravljenost         | HTTP `GET /healthz`                                                | Kratkih časovnih omejitev, ki zasedeno zanko dogodkov obravnavajo kot nedelujočo |
| Poglobljeno / za ljudi | `/api/monitoring/health`                                           | Samodejnega preverjanja živosti kubelet                                          |

**Nadgradnje:** pričakujte prekinitev vsake seje. Če je mogoče, postopoma odklopite odjemalce; pri privzetem SQLite sprotna posodobitev ni mogoča. Nastavitev Compose `restart: unless-stopped` skupaj z Dockerjevim `HEALTHCHECK` prav tako zamenja edini proces, ko je vsebnik v stanju Unhealthy — obseg posledic je enak.

Izsek konfiguracije Kubernetes za **eno repliko** (zahtevan je Recreate; pri eni datoteki SQLite ne povečujte vrednosti `replicas`):

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

Premor `preStop` omogoči, da kube odstrani končne točke Service pred signalom SIGTERM, tako da **nov** promet ne dosega več procesa, ki se ustavlja. Aktivne povezave SSE `/v1/responses` se zaključujejo največ `SHUTDOWN_TIMEOUT_MS` (privzeto 30 s) prek težkih zakupov za sprejem (#11015). Nove zahteve, ki še vedno dosežejo proces, prejmejo `503` + `Retry-After: 5`. Vrzel brez končnih točk med izvajanjem Recreate, dokler nadomestna replika ni Ready, ostaja popoln izpad — to je lastnost topologije SQLite in ne napačna konfiguracija preverjanja.

Zunanji Postgres / HA z več zapisovalniki **ni** dokumentirana standardna možnost. Če potrebujete HA, ohranite eno repliko ali uporabite topologijo, ki jo je projekt ločeno preizkusil in dokumentiral. Delo na podpori za Postgres/MySQL poteka v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dokler ta podpora ni izdana, je edini podprti način za povečanje zmogljivosti **velikih** zahtev `/v1/responses` uporaba N neodvisnih procesov (naslednji razdelek), ne pa `replicas > 1` na enem nosilcu.

## Horizontalno razširjanje: N neodvisnih procesov

En proces Node pomeni **eno kopico V8**. Dve prekrivajoči se zahtevi kodirnega agenta `POST /v1/responses` (RTK + Caveman), veliki približno 3 MiB oziroma 750k žetonov, prekineta to kopico pri približno 12 Gi (`FATAL ERROR: Reached heap limit`) in lahko povzročita OOM v cgroup z omejitvijo 16 Gi. Glejte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ta meritev je opozorilo glede **pomnilniškega proračuna**, ne trda omejitev izdelka na dve sočasni dolgotrajni zahtevi `/v1/responses`. Sprejem zahtevnih klepetov omejuje samodejno izpeljan proračun vhodnih bajtov (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), določen glede na isto omejitev V8/cgroup — če ga v že ustrezno dimenzioniranem procesu ročno povečate (ali nastavite podedovano omejitev števila zahtev `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`), znova povzročite prekinitev. Majhni klepeti, `/healthz`, `/v1/models` in MCP **niso** vključeni v to omejitev.

### En proces: več kot dve dolgotrajni zahtevi `/v1/responses`

**Zdrav** proces (kopica pod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, privzeto `0.75`) **lahko** izvaja več kot dve sočasni dolgotrajni zahtevi `POST /v1/responses`, če je v proračunu bajtov zahtev v izvajanju na ravni procesa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) še dovolj prostora. Telesa velikosti najmanj `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (privzeto 256 KiB) pridobijo isti zakup za zahtevne operacije kot strukturno zahtevne zahteve in uporabljajo isti izhod `tryAcquireHealthyHeadroom` iz [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Več deset sočasnih dolgotrajnih odjemalcev SSE (upravljavci jih pogosto potrebujejo 40–50) je vprašanje **pomnilniškega proračuna** — ustrezno dimenzionirajte kopico, primarna/dodatna mesta in `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — in ne trda omejitev izdelka na »največ 2«. Obremenjena kopica še vedno zavrača zahteve s ponovljivo napako `503`, da se težava #7849 ne ponovi.

Za **pomnožitev kopic** (neodvisni stari prostori V8) **danes**:

| Naredite                                                                                                                                                                                               | Ne naredite                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Zaženite **N vsebnikov/podov**, vsakega z **lastnim** `DATA_DIR` / nosilcem                                                                                                                            | Ne nastavite `replicas > 1` za eno datoteko SQLite                                 |
| Zahtevne zahteve v izvajanju in dodatna mesta ob zdravem stanju dimenzionirajte glede na kopico/proračun bajtov v izvajanju; 1–2 je konservativna privzeta vrednost iz #7849, ne trda omejitev izdelka | Enemu procesu ne dodelite 8× RAM-a in neomejene omejitve števila                   |
| Izbirno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za **skupne števce kvot**                                                                                                                | Redisa ne obravnavajte kot skupni SQLite — to ni                                   |
| Skrivnosti ponudnikov podvojite v vsak primerek (ali sprejmite ločene nadzorne plošče)                                                                                                                 | Ne pričakujte ene nadzorne plošče/enega dnevnika klicev za vse primerke            |
| Pred primerke postavite poljuben izenačevalnik obremenitve; lepljivost po ključu API ali seji zadostuje                                                                                                | Ne zahtevajte vmesne programske opreme posameznega ponudnika, ki upošteva velikost |

Strojna oprema: število sočasnih dolgotrajnih zahtev `/v1/responses` na primerek je vprašanje **pomnilniškega proračuna** (kopica + bajti v izvajanju / #10110). `N` neodvisnih imenikov `DATA_DIR` še vedno pomnoži kopice: gostiteljski RAM mora zadoščati za `N × cgroup`, ne za »en pod s 16 Gi in N=8«. Nikoli ne uporabljajte `replicas > 1` za eno datoteko SQLite.

Osnutek Compose (dve kopici, dva nosilca — ne `deploy.replicas: 2`):

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

Gostota znotraj procesa (stiskanje zunaj izolata HTTP) je obravnavana v [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ena logična gruča na skupnem trajnem stanju je obravnavana v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionalne napake Gemini znotraj Dockerja

Google AI Studio / Gemini API lahko vrne HTTP 400 s FAILED_PRECONDITION in sporočilom
`User location is not supported for the API use.` Uspešna zahteva na gostitelju
ne dokazuje, da vsebnik uporablja isto izhodno pot. Vrstni red DNS,
povezljivost IPv4/IPv6, usmerjanje VPN in nastavljeni posredniški strežniki se lahko razlikujejo. Preverite
[Googlove podprte regije](https://ai.google.dev/gemini-api/docs/available-regions)
in dejansko pot povezave; ta napaka sama po sebi ne pomeni, da je ključ API napačen.

### Prednostno uporabite posredniški strežnik za posamezno povezavo

Za zadevno povezavo Gemini uporabite Omniroutovo [konfiguracijo posredniškega strežnika za posamezno povezavo](../ops/PROXY_GUIDE.md#4-level-proxy-system),
nato pa ponovite **Preizkus povezave** in manjšo zahtevo
z istim modelom. Tako bo sprememba usmerjanja omejena na to povezavo. Preverite,
ali je posredniški strežnik dosegljiv iz vsebnika in ali ga povezava dejansko izbere.
Sprememba poti ne zagotavlja, da bo zaledna storitev dovolila dostop iz te regije.

### Primerjajte omrežje gostitelja in vsebnika

Pri primerjavi overjenih rezultatov naj bodo ključ, model in zahteva enaki; v poročilo o težavi nikoli
ne prilepite poverilnic, gesel posredniškega strežnika ali celotnih glav za avtorizacijo.
Najprej preverite, katere družine naslovov ponuja razreševalnik operacijskega sistema, tako da uporabite isti ukaz
na gostitelju in znotraj vsebnika:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Zamenjajte `omniroute` s storitvijo, ki jo izvajate (na primer `omniroute-web`). Ti
ukazi izpišejo družine naslovov brez poverilnic ali naslovov IP. Vrnjena vrednost `6`
pomeni le rezultat DNS za IPv6: **ne** dokazuje uporabne poti IPv6 ali dostopa do API-ja.
Kjer je nameščen `curl`, primerjajte `curl -4 -I https://generativelanguage.googleapis.com`
z `curl -6 -I https://generativelanguage.googleapis.com` v obeh okoljih.
Odziv HTTP dokazuje povezljivost za ta preizkus, tudi če gre za napako zaradi neoverjene zahteve;
upravičenost do uporabe Gemini preveri le overjena zahteva modela.

### Alternativa na ravni gostitelja: delujoč IPv6 in pravilnik razreševalnika

Prijavitelj težave [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) je
v svojem okolju obnovil dostop tako, da je omogočil IPv6 za vsebnike in spremenil
izbiro naslovov glibc. To obravnavajte kot alternativo, specifično za posamezno okolje. Preden
prilagodite nastavitve razreševalnika, preverite delovanje IPv6 na gostitelju,
izhodni promet in usmerjanje vsebnika ter pravila požarnega zidu.
Zasebni naslov ULA sam po sebi ne vzpostavi javne povezljivosti IPv6.

Za storitve, ki so že povezane s privzetim omrežjem Compose, ta izsek omogoči
IPv6 v tem omrežju; ohranite preostanek konfiguracije storitve, vrat, nosilcev in drugih nastavitev:

```yaml
networks:
  default:
    enable_ipv6: true
```

Pri poimenovanem omrežju ga omogočite v omrežju, s katerim je storitev dejansko povezana. Docker lahko
dodeli podomrežje ULA; izrecno, neprekrivajoče se podomrežje izberite le, če ga vaše omrežje
zahteva. Glejte [Omrežje IPv6 v Dockerju](https://docs.docker.com/engine/daemon/ipv6/)
in [Možnosti omrežij Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

V **sliki, ki temelji na glibc**, lahko `/etc/gai.conf` spremeni izbiro naslovov. Trenutna
datoteka Dockerfile repozitorija uporablja Debian; prilagojene slike, ki temeljijo na musl, tega mehanizma nimajo.
Prijavljena prilagoditev spremeni oznako ULA iz `label fc00::/7 6` v
`label fc00::/7 1`. Začnite s celotno tabelo pravilnikov slike in ohranite druge
vnose: dodajanje vnosa `label` ali `precedence` nadomesti privzeto tabelo, zato datoteka,
ki vsebuje samo spremenjeno vrstico, ne zadostuje.
[Referenca konfiguracije glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentira to vedenje. Pregledano datoteko priklopite samo za branje na `/etc/gai.conf`
in znova ustvarite storitev, da uveljavite spremembo.

To spremeni izbiro naslovov operacijskega sistema za **ves izhodni promet v tem vsebniku**.
Vendar ne prisili vsake aplikacije, da izbere IPv6: pomembna sta tudi vrstni red DNS in
izbira povezave v Node. Zlasti `--dns-result-order=ipv4first` daje prednost IPv4 in
ni rešitev za napako pri uporabi izključno IPv4. Glejte [Vrstni red DNS v Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po vsaki spremembi na ravni gostitelja znova preizkusite Gemini in druge ponudnike. Za povrnitev sprememb
odstranite prilagojeni priklop `gai.conf`, obnovite prejšnjo omrežno konfiguracijo ter
v vzdrževalnem obdobju znova ustvarite zadevno storitev oziroma omrežje. Ponovno ustvarjanje omrežja
lahko prekine delovanje drugih vsebnikov, povezanih z njim; ne izbrišite nosilca s trajnimi podatki.

## Pomembne opombe

- **Način WAL za SQLite:** Ukazu `docker stop` je treba omogočiti, da se dokonča, da lahko OmniRoute zapiše najnovejše spremembe nazaj v `storage.sqlite` z izvedbo kontrolne točke. Priložene datoteke Compose že določajo 40-sekundno obdobje mirovanja pred zaustavitvijo. Če sliko zaganjate neposredno, ohranite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nastavite na `true`, če se rutinske varnostne kopije oziroma varnostne kopije pred pisanjem upravljajo zunanje. Selitve obstoječe podatkovne zbirke še vedno zahtevajo lasten trajen varnostni posnetek in zaščito pred množično selitvijo.
- **Trajnost podatkov:** Vedno priklopite nosilec na `/app/data`, da se vaša podatkovna zbirka, ključi in konfiguracije ohranijo ob ponovnih zagonih vsebnika.
- **Konfiguracija vrat:** Če želite spremeniti privzeta vrata `20128`, preglasite spremenljivko okolja `PORT`.

## Glejte tudi

- [Vodnik za uvedbo v navideznem računalniku](../ops/VM_DEPLOYMENT_GUIDE.md) — Nastavitev navideznega računalnika, nginx in Cloudflare
- [Vodnik za uvedbo v Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Uvedba v Fly.io
- [Konfiguracija okolja](../reference/ENVIRONMENT.md) — Celoten referenčni priročnik za `.env`
