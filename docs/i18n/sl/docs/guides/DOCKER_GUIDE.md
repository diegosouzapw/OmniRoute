# 🐳 Docker Guide — OmniRoute (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Celoten priročnik za uvajanje z Dockerjem. Za hiter začetek si oglejte [razdelek Docker v datoteki README](../README.md#-docker).

## Kazalo vsebine

- [Hiter zagon](#quick-run)
- [Z datoteko okolja](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Razpoložljivi profili](#available-profiles)
- [Konfiguriranje gostiteljskih orodij CLI, ko OmniRoute deluje v Dockerju](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Spremljevalni vsebnik Redis](#redis-sidecar)
- [Compose za produkcijsko okolje](#production-compose)
- [Faze datoteke Dockerfile](#dockerfile-stages)
- [Ključne okoljske spremenljivke](#critical-environment-variables)
- [Docker Compose s Caddyjem (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Hitri tunel Cloudflare](#cloudflare-quick-tunnel)
- [Oznake slik](#image-tags)
- [Razpoložljivost: privzeti SQLite podpira eno repliko](#availability-default-sqlite-is-single-replica)
- [Pomembne opombe](#important-notes)

---

## Hiter zagon

> **Samostojno gostovanje z enim ukazom?** Oglejte si
> [vodnik za samostojno gostovanje](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (objavljena slika +
> Redis, dostop samo prek povratne zanke, brez izbire profila). Spodnji hitri zagon je
> način z enim vsebnikom za uporabnike, ki Redis že izvajajo drugje.

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
# Najprej kopirajte in uredite .env
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

# Združite CLI in spremljevalni vsebnik CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Razpoložljivi profili

OmniRoute vključuje štiri profile Compose. Izberite tistega, ki ustreza vašemu okolju.

| Profil            | Storitev         | Kdaj ga uporabiti                                                                                                                                                        | Ukaz                                         |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (privzeto) | `omniroute-base` | Brezglavi strežnik/minimalno izvajalno okolje brez priloženih orodij CLI ponudnikov                                                                                      | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentski delovni tokovi, ki kličejo `omniroute providers/setup/doctor`, in priložena orodja CLI (Codex, Claude Code, Droid, OpenClaw)                                    | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Gostitelji Linux, ki želijo dostop do gostiteljskih orodij CLI, podoben `network_mode`, s priklopom `~/.local/bin`, `~/.codex`, `~/.claude` itd. samo za branje          | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Zagon spremljevalnega vsebnika [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na vratih `8317` za posredovanje prek nadrejenega posredniškega strežnika CLI | `docker compose --profile cliproxyapi up -d` |

> Kombinirate lahko več profilov: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguriranje gostiteljskih orodij CLI, ko OmniRoute deluje v Dockerju

`omniroute setup-codex`, `setup-claude`, `config set <tool>` in gumb **Shrani konfiguracijo** na nadzorni plošči zapisujejo datoteke, kot je `~/.codex/*.config.toml`. Te poti imajo pomen samo v računalniku, v katerem se CLI dejansko izvaja. Če jih zaženete znotraj vsebnika, se datoteke zapišejo v lastni domači imenik vsebnika (`/home/node` — slika se izvaja kot `USER node`), kjer jih noben gostiteljski CLI ne bo nikoli prebral in kjer se zavržejo takoj, ko se vsebnik znova ustvari.

OmniRoute to zazna in zavrne zapis ter namesto sporočila o uspehu, ki ga ne morete uporabiti, prikaže navodila: CLI se konča s kodo `2`, API pa odgovori s `422` in `containerEphemeralTarget: true`.

### Priporočeno: CLI zaženite na gostitelju, OmniRoute pa v Dockerju

Vsebnik zagotavlja API; CLI konfigurira vaša gostiteljska orodja.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # usmeri CLI na vsebnik
omniroute setup-codex                      # zapiše dejanski ~/.codex na vašem gostitelju
```

To je prava izbira, kadar se Codex, Claude Code, Cursor ali podobna orodja izvajajo na vašem prenosniku — kar je običajna nastavitev.

### Druga možnost: priklopite gostiteljske konfiguracijske imenike z vezanim priklopom (profil `host`)

Če želite, da vsebnik sam zapisuje gostiteljsko konfiguracijo, priklopite imenike in nastavite `CLI_CONFIG_HOME` na korenski imenik priklopa. Profil `host` to že omogoča:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Vezani priklop zagotavlja, da je pot vredna zaupanja: OmniRoute prebere `/proc/self/mountinfo` in dovoli zapisovanje v priklopljene poti (ter v imenike, katerih podrejeni imeniki so priklopi, kar natančno ustreza zgornji strukturi `/host-home`), medtem ko še vedno zavrača nepriklopljene poti.

### Izhod v sili: konfigurirajte lastne CLI-je vsebnika (uporabljajte zadržano)

Kadar so CLI-ji dejansko znotraj vsebnika (profil `cli`), je zapis nameren. Vsakemu ukazu `setup-*` posredujte `--allow-container-write` ali za strežnik nastavite `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Zapis se izvede z opozorilom, da ne bo preživel vsebnika.

> **Varnostno opozorilo — profil `cli` + priklop `docker.sock`.**
> Profil `cli` z vezanim priklopom priklopi `/var/run/docker.sock`, da lahko samodejni posodabljalnik v vsebniku znova ustvari sklad prek gostiteljskega demona
> (`src/lib/system/autoUpdate.ts` preveri prisotnost te vtičnice in preskoči
> pot Docker, kadar je ni). Ta vtičnica je **meja zaupanja s korenskimi pravicami gostitelja**: vse, kar lahko dostopa do nje, upravlja gostiteljski demon Docker kot
> uporabnik root — ustvari, pregleda, ustavi in odstrani lahko kateri koli vsebnik na gostitelju.
> Posledice:
>
> 1. **Vrat profila `cli` nikoli ne izpostavljajte omrežju.** Objavite
>    jih na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli`, ki je dosegljiv prek lokalnega omrežja, vsako izvajanje kode na daljavo na ravni nadzorne plošče spremeni v
>    popoln prevzem gostitelja.
> 2. **V profil `cli` ne priklapljajte nobenih dodatnih gostiteljskih imenikov.**
>    Vtičnica Docker skupaj s katerim koli dodatnim priklopom vsebniku omogoči popoln
>    dostop za branje in pisanje v vaš datotečni sistem ter gostiteljsko konfiguracijo. Če mora orodje
>    dostopati do projekta, ga zaženite lokalno z izvršilno datoteko CLI — ne priklapljajte ga
>    v vsebnik `cli`.
>
> Če ne potrebujete samodejnega posodabljanja znotraj vsebnika, profila `cli` ne vklopite
> (`COMPOSE_PROFILES=core,redis` ali krajše). Drugi profili ne
> priklapljajo vtičnice Docker.
>
> Za povezan model groženj
> MITM glejte `docs/security/MITM-TPROXY-DECRYPT.md` (git; ni prevedeno v `/docs`),
> za izvorno verigo izvršljivih datotek
> `codex`/`claude-code`/`droid`/`openclaw` pa `docs/security/SUPPLY_CHAIN.md`.

## Stranski vsebnik Redis

OmniRoute uporablja Redis kot podporo za porazdeljeni omejevalnik hitrosti in skupni predpomnilnik. Storitev `redis` je **vedno definirana** v datoteki `docker-compose.yml` (ni omejena s profilom) in se zažene skupaj s katerim koli drugim profilom.

| Podrobnost                      | Vrednost                                 |
| ------------------------------- | ---------------------------------------- |
| Slika                           | `redis:7-alpine`                         |
| Ime vsebnika                    | `omniroute-redis`                        |
| Notranja vrata                  | `6379`                                   |
| Vrata gostitelja (preglasitev)  | `REDIS_PORT` (privzeto `6379`)           |
| Vezava gostitelja (preglasitev) | `REDIS_BIND_HOST` (privzeto `127.0.0.1`) |
| Nosilec                         | `omniroute-redis-data` → `/data`         |
| Preverjanje stanja              | `redis-cli ping` (interval 10 s)         |

Povezane okoljske spremenljivke:

- `REDIS_URL` — povezovalni niz, posredovan aplikaciji (privzeto `redis://redis:6379`).
- `REDIS_PORT` — preslikava vrat gostitelja za vsebnik Redis.
- `REDIS_BIND_HOST` — gostiteljski vmesnik, na katerem so vrata objavljena. Privzeta vrednost je `127.0.0.1`.

> **Zakaj je privzeto uporabljen povratni vmesnik:** stranski vsebnik se izvaja brez možnosti `requirepass`,
> vsebniki aplikacije pa do njega dostopajo prek omrežja compose (`redis:6379`) — objavljena vrata
> so namenjena le orodjem na strani gostitelja (`redis-cli`, lokalni `npm run dev`). Objava na
> `0.0.0.0` bi Redis brez preverjanja pristnosti izpostavila vsakemu gostitelju v vašem krajevnem omrežju. Če nastavite
> `REDIS_BIND_HOST=0.0.0.0`, dodajte tudi `--requirepass` v `command:` storitve.

**Onemogočanje Redisa** ni priporočljivo (omejevalnik hitrosti bo prešel na nadomestno shrambo v pomnilniku). Če ga morate onemogočiti, odstranite oziroma zakomentirajte blok storitve `redis:` v datoteki `docker-compose.yml` ali zmanjšajte število primerkov na nič:

```bash
docker compose up -d --scale redis=0
```

## Produkcijska konfiguracija Compose

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

# Spremljajte dnevnike v živo
docker compose -f docker-compose.prod.yml logs -f

# Zaustavite sklad (ohranite nosilce)
docker compose -f docker-compose.prod.yml down
```

Produkcijski sklad se izvaja vzporedno z razvojnim skladom compose (uporablja drugačna imena vsebnikov, vrata in nosilce), zato lahko lokalno nadaljujete razvoj, medtem ko produkcijsko okolje ostane zagnano.

## Faze datoteke Dockerfile

Repozitorij vključuje večstopenjsko datoteko Dockerfile (`Dockerfile`). Na voljo so tri faze; izberite ustrezen `target` za svoj primer uporabe.

| Faza          | Osnovna slika         | Namen                                                                                                                                                                         |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Namesti odvisnosti (`npm ci --legacy-peer-deps`) in zažene `npm run build` (privzeto s Turbopackom — glejte spodnji razdelek Viri med gradnjo)                                |
| `runner-base` | `node:26-trixie-slim` | Produkcijsko izvajalno okolje s samostojnim izhodom Next.js. **Orodja CLI ponudnikov niso vključena.**                                                                        |
| `runner-cli`  | `runner-base`         | Doda `git`, `docker.io`, `docker-compose` in globalna orodja CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Izberite to za agentske poteke dela.** |

Ročno zgradite določen cilj:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Viri med gradnjo

Trije argumenti gradnje določajo zahtevnost faze `builder`. Veljajo samo med gradnjo —
`OMNIROUTE_MEMORY_MB` (spodaj) je ločena nastavitev za čas izvajanja.

| Argument gradnje            | Privzeto | Učinek                                                                                                    |
| --------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`      | Vrednost `0` namesto tega izvede gradnjo z webpackom. Nižja največja poraba pomnilnika, vendar počasneje. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Omejitev kopice V8 (`--max-old-space-size`) za zagnani proces `next build`.                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Nastavi `CIRCLE_NODE_TOTAL`; Next iz tega izračuna `workers = N - 1` za zbiranje podatkov strani.         |

`OMNIROUTE_BUILD_WORKERS` je nastavitev, ki jo povečajte pri zmogljivem gradniku, in
prva, na katero posumite, ko gradnja z omejenimi viri odpove **po** sporočilu
`✓ Compiled successfully`. Vsak delavec za podatke strani je ločen proces, enako
velja za nadrejeni proces `next build`; reprodukcija na delujočem VPS-u (težava
#7518) je izmerila največji RSS vsakega procesa pri ~4,5 GB, neodvisno od zastavice
kopice `NODE_OPTIONS` (Turbopack prevaja v izvornem pomnilniku/pomnilniku Rust zunaj
kopice V8). Privzeta vrednost `2` (→ 1 delavec, skupaj 2 procesa) je prilagojena
izvajalnikom, ki jih gosti GitHub, s 16 GB / 4 vCPU, ki jih uporablja cevovod za
objavljanje. Pri vrednosti `8` (→ 7 delavcev) je temu izvajalniku zmanjkalo
pomnilnika, BuildKit pa je korak prekinil z napako
`ResourceExhausted: ... cannot allocate memory`; tudi vrednost `3` (→ 2 delavca)
ni zadostovala, ko je bil RSS posameznega procesa izmerjen neposredno, namesto da
bi bil ocenjen. `tests/unit/docker-build-memory-budget.test.ts` opravi izračun na
podlagi izmerjene vrednosti in odpove, če katera koli nastavitev preseže
zmogljivost izvajalnika.

Turbopack prevaja v izvornem pomnilniku Rust, ki je **zunaj** kopice V8, zato ga
`OMNIROUTE_BUILD_MEMORY_MB` ne omejuje. Na gostitelju z omejitvijo pomnilnika nato
uničevalnik OOM prek SIGKILL prekine gradnjo brez kakršnega koli besedila napake —
gradnja se preprosto ustavi sredi koraka `Creating an optimized production build`,
kar je videti kot zastoj in ne kot pomanjkanje pomnilnika. Če ima gostitelj za
gradnjo omejene vire, zamenjajte povezovalnik modulov:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` je omogočen, zato `next build` zažene nadrejeni **in** delavski
proces, vsak pa ločeno upošteva `OMNIROUTE_BUILD_MEMORY_MB`. Omejitev vsebnika
nastavite nad približno dvakratno vrednostjo te nastavitve, ne nad enkratno.

Izmerjeno na tem drevesu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Povezovalnik modulov | Omejitev vsebnika | Rezultat                                    |
| -------------------- | ----------------- | ------------------------------------------- |
| Turbopack            | 8 GiB / 16 GiB    | v obeh primerih tiho prekinjeno z OOM       |
| webpack              | 8 GiB             | delavski proces gradnje prekinjen s SIGKILL |
| webpack              | 12 GiB            | uspelo, največja poraba 11,1 GiB            |

### Privzete nastavitve izvajalnega okolja

Privzete vrednosti, ki jih izvozi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Obnašanje pomnilnika v Dockerju:

- Slika nastavi `OMNIROUTE_MEMORY_MB=1024` in iz te vrednosti izpelje `NODE_OPTIONS=--max-old-space-size=1024`.
- Dejanski strežniški proces zažene samostojni zaganjalnik, ki prebere `OMNIROUTE_MEMORY_MB` in doda `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node uporabi zadnjo ponovljeno vrednost `--max-old-space-size`, zato nastavitev `OMNIROUTE_MEMORY_MB` določa dejansko omejitev kopice v Dockerju.
- Ker jo slika vedno nastavi, se lastna nadomestna vrednost zaganjalnika, prilagojena količini RAM-a, v Dockerju nikoli ne uporabi. Za delovno obremenitev jo izrecno povečajte (glejte spodnjo tabelo). Vrednost `2048` je še vedno prenizka za `/v1/responses` agentskega programiranja.

### RAM izvajalnega okolja za programerske agente

Privzeti 1 GiB v Dockerju je spodnja meja za nadzorno ploščo/lahek klepet, ne pa velikost za produkcijo. Dolga telesa zahtev `POST /v1/responses` (stotine sporočil, desetine orodij) med stiskanjem ohranijo več grafov v pomnilniku. Dve prekrivajoči se zahtevi velikosti ~3 MiB / ~750k žetonov sta prekinili V8 pri **12 GiB** prostora za stare objekte (`FATAL ERROR: Reached heap limit`) in sprožili tudi OOM skupine cgroup s 16 GiB. Glejte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nastavite **`--memory` skupine cgroup nad velikost kopice** — izvorni medpomnilniki, SQLite in vmesni podatki stiskanja so zunaj V8.

| Delovna obremenitev                           | `OMNIROUTE_MEMORY_MB`       | Vsebnik / cgroup           | Opombe                                                                                                                |
| --------------------------------------------- | --------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Nadzorna plošča, en lahek klepet              | `1024` (privzeto slike)     | ≥2 GiB                     |                                                                                                                       |
| En agent za programiranje (Claude/Codex/Grok) | `8192`                      | ≥10 GiB                    | Običajna seja z eno zahtevo `/v1/responses`                                                                           |
| Dve sočasni dolgi zahtevi `/v1/responses`     | `10240`–`12288`             | ≥12–16 GiB                 | Izmerjena prekinitev V8 pri približno 12 GiB kopice                                                                   |
| Trije ali več sočasnih dolgih kontekstov      | ne izvajajte v enem procesu | serializirajte / več RAM-a | Privzeta omejitev za zahtevne operacije je 1 aktivna zahteva; zvišanje brez dodatnega RAM-a znova povzroči prekinitev |

`omniroute serve` pri izvajanju neposredno na strojni opremi umeri približno 35 % RAM-a (omejeno na `[512, 4096]`), kadar spremenljivka `OMNIROUTE_MEMORY_MB` **ni nastavljena**. Docker vedno nastavi `1024`, zato se to umerjanje v uradni sliki nikoli ne izvede.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritične okoljske spremenljivke

Poleg privzetih vrednosti, dokumentiranih v [ENVIRONMENT.md](../reference/ENVIRONMENT.md), so pri izvajanju v okolju Docker najpomembnejše naslednje spremenljivke:

| Spremenljivka                 | Namen                                                                                                                                                                                                                                                                                                              | Privzeto                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Skupna skrivnost za most WebSocket. **Obvezna v produkciji** — nastavite jo na močan naključni niz.                                                                                                                                                                                                                | ni nastavljeno (treba je določiti) |
| `REDIS_URL`                   | Povezovalni niz za omejevalnik hitrosti / zaledni sistem predpomnilnika                                                                                                                                                                                                                                            | `redis://redis:6379`               |
| `REDIS_PORT`                  | Vrata na strani gostitelja za priloženi vsebnik Redis                                                                                                                                                                                                                                                              | `6379`                             |
| `REDIS_BIND_HOST`             | Gostiteljski vmesnik, na katerem so objavljena vrata priloženega vsebnika Redis (povratna zanka, razen če dodate AUTH)                                                                                                                                                                                             | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Pot na gostitelju, vpeta v profil `cli` na `/workspace/omniroute` za poteke dela samodejnega posodabljanja                                                                                                                                                                                                         | `.` (trenutni imenik)              |
| `OMNIROUTE_MEMORY_MB`         | Zgornja meja kopice Node med izvajanjem za samostojni strežnik Docker; preglasi zgornjo privzeto vrednost slike. Agenti za programiranje: `8192`+ (glejte [RAM med izvajanjem](#runtime-ram-for-coding-agents)).                                                                                                   | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Preglasi izpostavljena vrata za nadzorno ploščo (20128) in API (20129)                                                                                                                                                                                                                                             | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Gostiteljski vmesnik, na katerem docker-compose objavi vrata nadzorne plošče/API-ja/WebSocket v živo. Če je `REQUIRE_API_KEY=false` (privzeto), `0.0.0.0` izpostavi anonimni posredniški strežnik `/v1` omrežju LAN — dostop razširite le z `REQUIRE_API_KEY=true` ali obratnim posredniškim strežnikom pred njim. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Gostiteljski vmesnik, na katerem docker-compose objavi stranski vsebnik `cliproxyapi` — njegov podatkovni nosilec vsebuje poverilnice ponudnika.                                                                                                                                                                   | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Imenik, ki ga pregledovalnik vtičnikov med izvajanjem bere in vanj namešča vtičnike. Nastavite ga, kadar so vtičniki vpeti z vezavno priključitvijo: privzeta vrednost sledi `HOME`, ki je sliki ni treba izvoziti.                                                                                                | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | Podpot URL-ja, kadar je aplikacija objavljena za obratnim posredniškim strežnikom (npr. `/omniroute`)                                                                                                                                                                                                              | _(prazno = koren)_                 |
| `NEXT_PUBLIC_BASE_URL`        | Javni izvor brskalnika, vključno s podpotjo (npr. `https://host/omniroute`)                                                                                                                                                                                                                                        | ni nastavljeno                     |
| `PROD_DASHBOARD_PORT`         | Vrata nadzorne plošče na strani gostitelja za `docker-compose.prod.yml`                                                                                                                                                                                                                                            | `20130`                            |
| `CLIPROXYAPI_PORT`            | Vrata na strani gostitelja za stranski vsebnik `cliproxyapi`                                                                                                                                                                                                                                                       | `8317`                             |

## Obratni posredniški strežnik na podpotI (Traefik / nginx)

Next.js `basePath` je preveden v samostojni paket. OmniRoute zapiše vgrajeno
vrednost v nadzorno datoteko v korenu aplikacije (zapisano med `npm run build`; prebere jo
`scripts/docker/ensure-docker-base-path.mjs`) in jo ob zagonu vsebnika primerja z
`OMNIROUTE_BASE_PATH`. Če se vrednosti razlikujeta in je bila slika
zgrajena za koren domene, vstopna točka prepiše manifeste samostojnega paketa,
vgrajene literale `basePath`/`assetPrefix` (Next 16 upodablja URL-je sredstev SSR samo iz
`assetPrefix` — orodje za popravljanje vanj preslika tudi podpot), vgrajene
URL-je sredstev `/_next/static` (manifesti referenc odjemalca, uvozi predstavnostnih datotek, vnaprej upodobljene
strani z napakami) in odjemalski vstavek `process.env`, preden se zažene
`node dev/run-standalone.mjs`.

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

`docker-compose.yml` posreduje `OMNIROUTE_BASE_PATH` kot argument za gradnjo Docker in kot
okoljsko spremenljivko izvajalnega okolja.

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

Obratni posredniški strežnik konfigurirajte tako, da posreduje **celotno** zunanjo pot (predpone ne
odstranite). Traefik mora usmeriti `PathPrefix(`/omniroute`)` do vsebnika brez
`StripPrefix`, da Next.js prejme `/omniroute/...` in streže sredstva iz
`/omniroute/_next/...`.

Preverjanje zdravja Docker preverja lahkotno končno točko življenjskega cikla `/healthz`, ki je opremljena
s predpono aktivne vrednosti `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` ostane na voljo za
diagnostiko za uporabnike in nadzorne plošče; če želite preverjanje HEALTHCHECK vsebnika znova usmeriti nanjo (na primer
za uveljavljanje poglobljenega preverjanja zdravja), nastavite `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ta pot izvaja **poglobljeno** preverjanje (podatkovna zbirka + povzetek spremljanja) — primerno za Dockerjevo
redko izvajanje `HEALTHCHECK`, če ga znova omogočite, vendar **ne** za intervale Kubernetesovega
`livenessProbe`.

Za orkestratorje (Kubernetes, Nomad itd.):

| Preverjanje                         | Prednostno                                                             | Izogibajte se                                                                |
| ----------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Živost                              | HTTP `GET /livez` ali TCP na glavnih vratih (`PORT`, privzeto `20128`) | `/api/monitoring/health` kot preverjanju živosti                             |
| Pripravljenost                      | HTTP `GET /healthz`                                                    | Kratkim časovnim omejitvam, ki zasedeno zanko dogodkov obravnavajo kot mrtvo |
| Poglobljeno / z zunanje perspektive | `/api/monitoring/health`                                               | —                                                                            |

`/healthz` poroča o življenjskem ciklu procesa (`ok` / `starting` / `stopping`). `/livez` preverja
samo, ali proces deluje (200, kadar se obravnavalnik lahko izvede; ne čaka na
pripravljenost). Obe končni točki se še vedno izvajata v isti dogodkovni zanki Node kot obravnavanje zahtev, zato ju lahko
procesorsko zahtevno delo s katalogom ali stiskanjem zakasni — zasedeno ≠ mrtvo. Če se čas HTTP-preverjanj izteče, dajte prednost preverjanju
živosti prek TCP. Celotna navodila za preverjanja:
[Vodnik za spremljanje — priporočila za preverjanja Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

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
      # Notranji URL med strežniki za načrtovana opravila / samodejne poizvedbe.
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

Caddy nastavi standardne glave za posredovanje zahtev nadrejenemu vsebniku. OmniRoute uporablja
`NEXT_PUBLIC_BASE_URL` kot kanonični javni izvor za povratne klice OAuth in ustvarjene javne
povezave; overjeni zapisi z nadzorne plošče uporabljajo zahteve istega izvora skupaj z zaščito CSRF,
vezano na sejo. Možnost `OMNIROUTE_TRUST_PROXY` omogočite samo pri naprednih namestitvah, pri katerih
namerno želite, da OmniRoute javni izvor določi iz zaupanja vrednih posredovanih glav namesto izrecne
konfiguracije.

## Hitri tunel Cloudflare

Podpora nadzorne plošče za namestitve Docker vključuje **hitri tunel Cloudflare** z enim klikom na strani `Dashboard → Endpoints`. Ob prvi omogočitvi se `cloudflared` prenese samo, ko je potreben, zažene se začasni tunel do vaše trenutne končne točke `/v1`, ustvarjeni URL `https://*.trycloudflare.com/v1` pa se prikaže neposredno pod vašim običajnim javnim URL-jem.

Plošče tunelov končnih točk (Cloudflare, Tailscale, ngrok) lahko prikažete ali skrijete v `Settings → Appearance`, ne da bi spremenili stanje aktivnega tunela.

### Opombe o tunelih

- URL-ji hitrih tunelov so začasni in se spremenijo po vsakem ponovnem zagonu.
- Hitri tuneli se po ponovnem zagonu OmniRoute ali vsebnika ne obnovijo samodejno. Po potrebi jih znova omogočite na nadzorni plošči.
- Upravljana namestitev trenutno podpira Linux, macOS in Windows na arhitekturah `x64` / `arm64`.
- Upravljani hitri tuneli privzeto uporabljajo prenos HTTP/2, da se izognejo motečim opozorilom o medpomnilniku UDP za QUIC v omejenih okoljih vsebnikov. Nastavite `CLOUDFLARED_PROTOCOL=quic` ali `auto`, če želite drug način prenosa.
- Slike Docker vključujejo sistemske korenske overitelje potrdil in jih posredujejo upravljanemu programu `cloudflared`, kar prepreči napake zaupanja TLS, ko se tunel inicializira znotraj vsebnika.
- Nastavite `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, če želite, da OmniRoute namesto prenosa uporabi obstoječo izvršljivo datoteko.

## Oznake slik

| Slika                    | Oznaka   | Velikost | Opis                                                              |
| ------------------------ | -------- | -------- | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Najvišja **objavljena** stabilna različica SemVer (ne git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Za GitOps pripnite ta razred oznake                               |

Večplatformni manifest: izvorni različici `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker samodejno izbere ustrezno arhitekturo; podajte `--platform linux/amd64`, če morate na gostiteljih ARM vsiliti emulacijo AMD64.

### Kanali izdaj

OmniRoute objavlja ločene kanale Docker za stabilne izdaje, aktivno preizkušanje veje izdaje in razvojne gradnje.

| Kanal                           | Vir                                               | Spremenljivost                  | Priporočena uporaba                                                                                                        |
| ------------------------------- | ------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Podpisana/različičena izdaja                      | Nespremenljivo                  | Produkcijske namestitve, ki so pripete na točno določeno izdajo                                                            |
| `:latest` / `:latest-web`       | Najvišja **objavljena** stabilna različica SemVer | Spremenljiv stabilni kazalec    | Sledi stabilnim izdajam **po** opravilu objave SemVer — **ne** sledi veji `main` ali neobjavljenim spremembam `release/v*` |
| `:next` / `:next-web`           | Trenutna privzeta veja `release/v*`               | Spremenljiv predizdajni kazalec | Preizkušanje popravkov, ki so bili vključeni v aktivno vejo izdaje, vendar še niso del stabilne izdaje                     |
| `:main` / `:main-web`           | Veja `main`                                       | Spremenljiv razvojni kazalec    | Samo za razvojno in integracijsko preizkušanje                                                                             |

#### Uporaba predizdajnega kanala

Kanal `next` se znova zgradi ob vsakem potisku v trenutno privzeto vejo `release/v*` in je objavljen tako za AMD64 kot ARM64. Starejše vzdrževalne veje ga ne morejo prepisati. Kanal zagotavlja sliko, ki jo je mogoče prenesti, za popravke, ki so bili pred ustvarjanjem naslednje stabilne oznake združeni v aktivno vejo izdaje.

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

`next` je plavajoči predizdajni kanal. Spremeni se lahko ob vsakem potisku v aktivno vejo izdaje in **ni podprt za produkcijsko uporabo**. Med ocenjevanjem določene gradnje pripnite izvleček slike:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pred testiranjem varnostno kopirajte podatkovni nosilec OmniRoute ali podatkovni imenik, priklopljen z vezavo. Za povrnitev obnovite predhodno uporabljeno stabilno različico ali izvleček in znova ustvarite vsebnik:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Gradnja iz veje izdaje ne more nikoli premakniti oznake `latest`; stabilni kazalec lahko posodobi le ustrezna stabilna semantična različica. Slike `next` ohranjajo pregled slike izdaje in blokirajočo kontrolo za KRITIČNE ranljivosti.

**Oznaka `latest` ni zagotovilo aktualnosti glede na git.** Združeni popravki v veji `main` ali aktivni veji `release/v*` **niso** vključeni v `:latest`, dokler ni objavljena stabilna slika SemVer in opravilo objave ne posodobi oznake `:latest` (isti izvleček kot pri tej različici SemVer). Če je oznaka `latest` videti nespremenjena, čeprav GitHub že prikazuje popravek, za preizkus veje izdaje pridobite `:next` ali počakajte na oznako SemVer.

| Kaj želite                                                                                | Uporabite                              |
| ----------------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps/produkcija, kjer ne sme priti do nenadzorovanih sprememb                           | Pripnite `:X.Y.Z` (ali izvleček slike) |
| Slediti objavljenim stabilnim različicam in ob vsaki izdaji sprejeti vnovično ustvarjanje | `:latest`                              |
| Preizkusiti neobjavljene uveljavitve `release/v*`                                         | `:next` (ni za produkcijo)             |
| Preizkusiti `main`                                                                        | `:main` (ni za produkcijo)             |

## Razpoložljivost: privzeti SQLite podpira eno samo repliko

Standardna namestitev OmniRoute z Dockerjem/Kubernetesom uporablja **en proces Node + en zapisovalnik SQLite**. Visoka razpoložljivost v tej topologiji **ni podprta**.

| Omejitev                                                         | Posledica                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| En zapisovalnik                                                  | **Ne** izvajajte več replik z isto datoteko SQLite. To poškoduje podatkovno zbirko.                                                                                                                                                                                                                                                                                          |
| Ponovna izdelava / ponovni zagon / prekinitev zaradi HEALTHCHECK | **Popoln izpad** trenutnih povezav SSE, sej nadzorne plošče in stanja v pomnilniku. Povezava se prekine vsem povezanim odjemalcem. Nove zahteve med obdobjem brez končne točke od povratnega posredniškega strežnika prejmejo **`502 Bad Gateway: Unknown error`**, ne odgovora JSON storitve OmniRoute — odjemalci tega ne morejo razlikovati od napake ponudnika (#11015). |
| Ista dogodkovna zanka kot `/healthz`                             | Obremenjena posodobitev kataloga ali cikel stiskanja lahko zakasni preverjanja; kratka časovna omejitev nato znova zažene **edino** repliko.                                                                                                                                                                                                                                 |

**Matrika preverjanj** (glejte tudi [priporočila za preverjanja Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Preverjanje            | Cilj                                                                   | Ne uporabljajte                                                                     |
| ---------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Živost                 | TCP na `PORT` (privzeto `20128`) ali mehko preverjanje HTTP `/healthz` | `/api/monitoring/health`                                                            |
| Pripravljenost         | HTTP `GET /healthz`                                                    | Kratkih časovnih omejitev, ki zaposleno dogodkovno zanko obravnavajo kot nedelujočo |
| Poglobljeno / za ljudi | `/api/monitoring/health`                                               | Samodejnega preverjanja živosti kubelet                                             |

**Nadgradnje:** pričakujte prekinitev vsake seje. Če lahko, postopoma odklopite odjemalce; pri privzetem SQLite sprotna posodobitev ni mogoča. Nastavitev Compose `restart: unless-stopped` skupaj z Dockerjevim `HEALTHCHECK` prav tako zamenja edini proces, ko vsebnik postane Unhealthy — z enakim obsegom posledic.

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

Čakanje `preStop` omogoči, da kube odstrani končne točke Service pred signalom SIGTERM, tako da **nov** promet ne dosega procesa, ki se zaustavlja. Trenutne povezave SSE `/v1/responses` se zaključujejo največ `SHUTDOWN_TIMEOUT_MS` (privzeto 30 s) prek zahtevnih sprejemnih zakupov (#11015). Nove zahteve, ki še vedno dosežejo proces, prejmejo `503` + `Retry-After: 5`. Časovna vrzel brez končne točke pri Recreate, dokler nadomestna replika ni Ready, ostaja popoln izpad — to je posledica topologije SQLite in ne napačne konfiguracije preverjanja.

Zunanji Postgres / visoka razpoložljivost z več zapisovalniki **ni** dokumentirana standardna možnost. Če potrebujete visoko razpoložljivost, obdržite eno repliko ali uporabite topologijo, ki jo je projekt ločeno preizkusil in dokumentiral. Delo na podpori za Postgres/MySQL poteka v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dokler ta podpora ni izdana, je edini podprti način za povečanje zmogljivosti **velikih** zahtev `/v1/responses` uporaba N neodvisnih procesov (naslednji razdelek), ne pa `replicas > 1` na enem nosilcu.

## Horizontalno skaliranje: N neodvisnih procesov

En proces Node pomeni **eno kopico V8**. Dve prekrivajoči se zahtevi programskih agentov `POST /v1/responses` velikosti ~3 MiB oziroma ~750k žetonov (RTK + Caveman) prekineta izvajanje te kopice pri ~12 Gi (`FATAL ERROR: Reached heap limit`) in lahko povzročita OOM v kontrolni skupini z omejitvijo 16 Gi. Glejte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ta meritev je opozorilo glede **pomnilniškega proračuna**, ne stroga omejitev izdelka na dve sočasni dolgotrajni zahtevi `/v1/responses`. Sprejem zahtevnih klepetov je omejen s samodejno izpeljanim proračunom bajtov za vnos (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), določenim glede na isto omejitev V8/kontrolne skupine — zvišanje te vrednosti (ali nastavitev podedovane omejitve števila zahtev `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) v procesu z že določeno velikostjo znova povzroči prekinitev. Majhni klepeti, `/healthz`, `/v1/models` in MCP **niso** vključeni v to omejitev.

### En proces: več kot dve dolgotrajni zahtevi `/v1/responses`

**Zdrav** proces (kopica pod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, privzeto `0.75`) **lahko** izvaja več kot dve sočasni dolgotrajni zahtevi `POST /v1/responses`, kadar je v proračunu bajtov trenutno izvajanih zahtev za celoten proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) še dovolj prostora. Telesa velikosti `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ali več (privzeto 256 KiB) pridobijo enak zakup za zahtevne zahteve kot strukturno zahtevne zahteve in uporabljajo enak izhod `tryAcquireHealthyHeadroom` iz [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Več deset sočasnih dolgotrajnih odjemalcev SSE (upravljavci jih pogosto potrebujejo 40–50) je vprašanje **pomnilniškega proračuna** — ustrezno določite velikost kopice, število primarnih/dodatnih mest in `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — in ne stroga omejitev izdelka na »največ 2«. Proces s preobremenjeno kopico še vedno zavrača zahteve s ponovljivim odgovorom `503`, da se težava #7849 ne ponovi.

Če želite **pomnožiti kopice** (neodvisni stari prostori V8) **danes**:

| Naredite                                                                                                                                                                                                           | Ne naredite                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Zaženite **N vsebnikov/podov**, vsakega z **lastnim** `DATA_DIR` / nosilcem                                                                                                                                        | Ne nastavite `replicas > 1` za eno datoteko SQLite                                |
| Velikost omejitve zahtevnih zahtev v izvajanju in dodatnih mest zdravega procesa določite glede na kopico/proračun bajtov v izvajanju; 1–2 je konservativna privzeta vrednost iz #7849, ne stroga omejitev izdelka | Enemu procesu ne dodelite 8× več RAM-a in neomejene omejitve števila              |
| Izbirno: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` za **skupne števce kvot**                                                                                                                            | Redisa ne obravnavajte kot skupni SQLite — to ni                                  |
| Podvojite skrivnosti ponudnikov v vsaki instanci (ali sprejmite ločene nadzorne plošče)                                                                                                                            | Ne pričakujte ene nadzorne plošče/enega dnevnika klicev za vse instance           |
| Pred instance postavite poljuben izenačevalnik obremenitve; lepljivost po ključu API ali seji zadostuje                                                                                                            | Ne zahtevajte vmesne programske opreme določenega ponudnika, ki upošteva velikost |

Strojna oprema: število sočasnih dolgotrajnih zahtev `/v1/responses` na instanco je vprašanje **pomnilniškega proračuna** (kopica + bajti v izvajanju / #10110). `N` neodvisnih imenikov `DATA_DIR` še vedno pomeni pomnožitev kopic: RAM gostitelja mora zadostovati za `N × cgroup`, ne za »en pod s 16 Gi in N=8«. Nikoli ne uporabljajte `replicas > 1` za eno datoteko SQLite.

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

## Pomembne opombe

- **Način WAL za SQLite:** Ukazu `docker stop` je treba omogočiti, da se dokonča, tako da lahko OmniRoute zapiše najnovejše spremembe nazaj v `storage.sqlite` z izvedbo kontrolne točke. Priložene datoteke Compose že določajo 40-sekundno prehodno obdobje za zaustavitev. Če sliko zaganjate neposredno, ohranite `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nastavite na `true`, če se rutinske varnostne kopije oziroma varnostne kopije pred zapisovanjem upravljajo zunanje. Selitve obstoječih podatkovnih zbirk še vedno zahtevajo lasten trajen varnostni posnetek in zaščito pred množično selitvijo.
- **Trajnost podatkov:** Vedno priklopite nosilec na `/app/data`, da se vaša podatkovna zbirka, ključi in konfiguracije ohranijo med ponovnimi zagoni vsebnika.
- **Konfiguracija vrat:** Če želite spremeniti privzeta vrata `20128`, preglasite okoljsko spremenljivko `PORT`.

## Glejte tudi

- [Vodnik za namestitev v navidezni stroj](../ops/VM_DEPLOYMENT_GUIDE.md) — Nastavitev navideznega stroja, nginx in Cloudflare
- [Vodnik za namestitev v Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Namestitev v Fly.io
- [Konfiguracija okolja](../reference/ENVIRONMENT.md) — Celoten priročnik za `.env`
