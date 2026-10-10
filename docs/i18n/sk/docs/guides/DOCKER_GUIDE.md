# 🐳 Docker Guide — OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kompletná referenčná dokumentácia nasadenia pomocou Dockeru. Ak chcete začať rýchlo, pozrite si [sekciu o Dockeri v README](../README.md#-docker).

## Obsah

- [Rýchle spustenie](#quick-run)
- [So súborom prostredia](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupné profily](#available-profiles)
- [Konfigurácia nástrojov CLI hostiteľa, keď OmniRoute beží v Dockeri](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sprievodný kontajner Redis](#redis-sidecar)
- [Produkčný Compose](#production-compose)
- [Fázy Dockerfile](#dockerfile-stages)
- [Kritické premenné prostredia](#critical-environment-variables)
- [Docker Compose s Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Rýchly tunel Cloudflare](#cloudflare-quick-tunnel)
- [Značky obrazov](#image-tags)
- [Dostupnosť: predvolená databáza SQLite podporuje iba jednu repliku](#availability-default-sqlite-is-single-replica)
- [Regionálne chyby Gemini v Dockeri](#gemini-regional-errors-inside-docker)
- [Dôležité poznámky](#important-notes)

---

## Rýchle spustenie

> **Chcete vlastný hosting jediným príkazom?** Pozrite si
> [Sprievodcu vlastným hostingom](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publikovaný obraz +
> Redis, prístup iba cez loopback, bez výberu profilu). Nižšie uvedené rýchle spustenie
> predstavuje postup s jedným kontajnerom pre používateľov, ktorí už prevádzkujú Redis inde.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## So súborom prostredia

```bash
# Najskôr skopírujte a upravte .env
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
# Základný profil (bez nástrojov CLI)
docker compose --profile base up -d

# Profil CLI (vstavané Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Profil hostiteľa (primárne pre Linux; pripája binárne súbory CLI hostiteľa iba na čítanie)
docker compose --profile host up -d

# Webový profil (Chromium/Playwright pre poskytovateľov webových relácií)
docker compose --profile web up -d

# Kombinácia CLI + sprievodného kontajnera CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupné profily

OmniRoute obsahuje profily Compose pre hlavné spôsoby nasadenia. Vyberte ten, ktorý zodpovedá vášmu prostrediu.

| Profil              | Služba           | Kedy použiť                                                                                                                                                    | Príkaz                                       |
| ------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predvolený) | `omniroute-base` | Bezobslužný server/minimálne runtime prostredie bez pribalených CLI poskytovateľov                                                                             | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | Agentné pracovné postupy, ktoré volajú `omniroute providers/setup/doctor`, a pribalené CLI (Codex, Claude Code, Droid, OpenClaw)                               | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | Hostitelia so systémom Linux, ktorí chcú prístup podobný `network_mode` k CLI hostiteľa pripojením `~/.local/bin`, `~/.codex`, `~/.claude` atď. iba na čítanie | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Spustenie sprievodného kontajnera [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porte `8317` na sprostredkovanie upstream CLI                 | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | Poskytovatelia webových relácií, ktorí potrebujú prehliadač: `gemini-web`, `claude-web`, `claude-turnstile` (zostavuje `runner-web`, Chromium je súčasťou)     | `docker compose --profile web up -d`         |

> Viaceré profily možno kombinovať: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurácia hostiteľských nástrojov CLI, keď OmniRoute beží v Dockeri

`omniroute setup-codex`, `setup-claude`, `config set <tool>` a tlačidlo
**Uložiť konfiguráciu** na ovládacom paneli zapisujú súbory ako `~/.codex/*.config.toml`. Tieto cesty
majú význam iba na počítači, na ktorom sa CLI skutočne spúšťa. Ak ich spustíte
v kontajneri, zápis sa vykoná do vlastného domovského adresára kontajnera (`/home/node` —
obraz sa spúšťa ako `USER node`), odkiaľ ho žiadne hostiteľské CLI nikdy neprečíta a kde sa
zahodí v okamihu opätovného vytvorenia kontajnera.

OmniRoute túto situáciu rozpozná a namiesto oznámenia o úspechu, ktoré nemôžete využiť,
odmietne zápis a zobrazí pokyny: CLI sa ukončí s kódom `2` a API odpovie stavom `422`
s `containerEphemeralTarget: true`.

### Odporúčané: spustite CLI na hostiteľovi a OmniRoute v Dockeri

Kontajner poskytuje API; CLI konfiguruje vaše hostiteľské nástroje.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nasmeruje CLI na kontajner
omniroute setup-codex                      # zapíše skutočný ~/.codex na vašom hostiteľovi
```

Toto je správna voľba, keď Codex, Claude Code, Cursor alebo podobné nástroje bežia na vašom
notebooku — čo je obvyklé nastavenie.

### Alternatíva: pripojte adresáre konfigurácie hostiteľa pomocou bind mountu (profil `host`)

Ak chcete, aby samotný kontajner zapisoval konfiguráciu hostiteľa, pripojte doň
adresáre a nastavte `CLI_CONFIG_HOME` na koreňový adresár pripojenia. Profil `host`
to už robí:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount zaisťuje dôveryhodnosť cesty: OmniRoute číta
`/proc/self/mountinfo` a povoľuje zápisy do pripojených ciest (a do adresárov,
ktorých podriadené adresáre sú pripojené, čo presne zodpovedá štruktúre `/host-home` uvedenej vyššie),
pričom naďalej odmieta nepripojené cesty.

### Núdzová možnosť: nakonfigurujte vlastné CLI kontajnera (používajte uvážlivo)

Keď sa CLI skutočne nachádzajú v kontajneri (profil `cli`), zápis je zámerný.
Odovzdajte parameter `--allow-container-write` ľubovoľnému príkazu `setup-*` alebo nastavte
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` pre server. Zápis sa vykoná
s upozornením, že po odstránení kontajnera nezostane zachovaný.

> **Bezpečnostné upozornenie — profil `cli` + pripojenie `docker.sock`.**
> Profil `cli` pripája `/var/run/docker.sock` pomocou bind mountu, aby mohol automatický
> aktualizátor v kontajneri znova vytvoriť zásobník prostredníctvom hostiteľského démona
> (`src/lib/system/autoUpdate.ts` kontroluje prítomnosť tohto socketu a vynechá
> cestu Dockeru, keď chýba). Tento socket predstavuje **hranicu dôvery s oprávneniami root
> na hostiteľovi**: čokoľvek, čo k nemu má prístup, ovláda hostiteľského démona Docker ako
> root — môže vytvoriť, kontrolovať, zastaviť a odstrániť ľubovoľný kontajner na hostiteľovi.
> Dôsledky:
>
> 1. **Nikdy nevystavujte port profilu `cli` do siete.** Zverejnite
>    ho na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupný zo siete LAN mení akékoľvek RCE na úrovni ovládacieho panela na
>    úplné napadnutie hostiteľa.
> 2. **Do profilu `cli` nepripájajte žiadne ďalšie hostiteľské adresáre.**
>    Docker socket spolu s akýmkoľvek ďalším pripojením poskytuje kontajneru úplný
>    prístup na čítanie a zápis do vášho súborového systému a konfigurácie hostiteľa. Ak nástroj potrebuje
>    vidieť projekt, spustite ho lokálne pomocou binárneho súboru CLI — nepripájajte ho
>    do kontajnera `cli`.
>
> Ak nepotrebujete automatické aktualizácie v kontajneri, profil `cli` nezapínajte
> (`COMPOSE_PROFILES=core,redis` alebo kratšia hodnota). Ostatné profily
> nepripájajú Docker socket.
>
> Súvisiaci model hrozieb v oblasti MITM nájdete v `docs/security/MITM-TPROXY-DECRYPT.md` (git; neskompilované do `/docs`)
> a reťazec pôvodu binárnych súborov
> `codex`/`claude-code`/`droid`/`openclaw` nájdete v `docs/security/SUPPLY_CHAIN.md`.

## Sprievodný kontajner Redis

OmniRoute využíva Redis ako úložisko pre distribuované obmedzovanie frekvencie požiadaviek a zdieľanú vyrovnávaciu pamäť. Služba `redis` je **vždy definovaná** v súbore `docker-compose.yml` (nie je obmedzená žiadnym profilom) a spúšťa sa spolu s ľubovoľným ďalším profilom.

| Podrobnosť                   | Hodnota                                            |
| ---------------------------- | -------------------------------------------------- |
| Obraz                        | `redis:7-alpine`                                   |
| Názov kontajnera             | `omniroute-redis`                                  |
| Interný port                 | `6379`                                             |
| Port hostiteľa (prepísanie)  | `REDIS_PORT` (predvolená hodnota `6379`)           |
| Väzba hostiteľa (prepísanie) | `REDIS_BIND_HOST` (predvolená hodnota `127.0.0.1`) |
| Zväzok                       | `omniroute-redis-data` → `/data`                   |
| Kontrola stavu               | `redis-cli ping` (interval 10 s)                   |

Súvisiace premenné prostredia:

- `REDIS_URL` — reťazec pripojenia vložený do aplikácie (predvolene `redis://redis:6379`).
- `REDIS_PORT` — mapovanie portu kontajnera Redis na strane hostiteľa.
- `REDIS_BIND_HOST` — rozhranie hostiteľa, na ktorom je port zverejnený. Predvolená hodnota je `127.0.0.1`.

> **Prečo je predvolená adresa spätnej slučky:** sprievodný kontajner beží bez `requirepass`
> a kontajnery aplikácie k nemu pristupujú cez sieť Compose (`redis:6379`) — zverejnený port
> slúži iba pre nástroje na strane hostiteľa (`redis-cli`, lokálne `npm run dev`). Zverejnenie na
> `0.0.0.0` by sprístupnilo Redis bez overenia každému hostiteľovi vo vašej sieti LAN. Ak nastavíte
> `REDIS_BIND_HOST=0.0.0.0`, pridajte do položky `command:` služby aj `--requirepass`.

**Vypnutie systému Redis** sa neodporúča (obmedzovač frekvencie požiadaviek prejde na menej výkonnú záložnú implementáciu v pamäti). Ak ho musíte vypnúť, odstráňte alebo zakomentujte blok služby `redis:` v súbore `docker-compose.yml`, prípadne nastavte počet jej inštancií na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkčné prostredie Compose

Pre izolovanú produkčnú snímku bežiacu súbežne s vývojovým prostredím použite `docker-compose.prod.yml`.

| Podrobnosť                         | Hodnota                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| Súbor                              | `docker-compose.prod.yml`                                                                 |
| Predvolený port ovládacieho panela | `PROD_DASHBOARD_PORT=20130` (mapovaný na interný `${DASHBOARD_PORT:-20128}`)              |
| Predvolený port API                | `PROD_API_PORT=20131`                                                                     |
| Obraz                              | `omniroute:prod` (zostavený z cieľa `runner-cli`)                                         |
| Kontajner Redis                    | `omniroute-redis-prod` (`redis:8.6.2`, vyhradený zväzok `redis-prod-data`)                |
| Dátový zväzok                      | `omniroute-prod-data` (pomenovaný, zachovaný medzi opätovnými zostaveniami)               |
| Kontroly stavu                     | `node healthcheck.mjs` + `redis-cli ping`, pričom `depends_on` je podmienené stavom Redis |

Použitie:

```bash
# Zostavenie a spustenie produkčného zásobníka
docker compose -f docker-compose.prod.yml up -d --build

# Priebežné zobrazovanie protokolov
docker compose -f docker-compose.prod.yml logs -f

# Zastavenie a odstránenie (zväzky sa zachovajú)
docker compose -f docker-compose.prod.yml down
```

Produkčný zásobník beží súbežne s vývojovým prostredím Compose (používa odlišné názvy kontajnerov, porty a zväzky), takže môžete pokračovať v lokálnom vývoji, zatiaľ čo produkčné prostredie zostáva spustené.

## Fázy Dockerfile

Repozitár obsahuje viacfázový Dockerfile (`Dockerfile`). K dispozícii sú štyri fázy; vyberte správny `target` pre svoj prípad použitia.

| Fáza          | Základný obraz        | Účel                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Nainštaluje závislosti (`npm ci --legacy-peer-deps`) a spustí `npm run build` (predvolene Turbopack — pozrite si časť Zdroje počas zostavovania nižšie)                                                                                                                                                   |
| `runner-base` | `node:26-trixie-slim` | Produkčné runtime prostredie so samostatným výstupom Next.js. **Neobsahuje žiadne CLI poskytovateľov.**                                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | Pridáva `git`, `docker.io`, `docker-compose` a globálne CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Vyberte túto fázu pre agentné pracovné postupy.**                                                                                                                       |
| `runner-web`  | `runner-base`         | Pridáva Playwright a prehliadač Chromium (`--with-deps`) pre poskytovateľov webových relácií: `gemini-web`, `claude-web`, `claude-turnstile`. **Vyberte túto fázu, keď používate týchto poskytovateľov** — obyčajný obraz bez nej zlyhá pri požiadavke (pozrite poznámku o `-web` v časti Kanály vydaní). |

Manuálne zostavenie konkrétneho cieľa:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Zdroje počas zostavovania

Náklady fázy `builder` riadia tri argumenty zostavenia. Platia iba počas zostavovania —
`OMNIROUTE_MEMORY_MB` (nižšie) je samostatné nastavenie runtime prostredia.

| Argument zostavenia         | Predvolené | Účinok                                                                                          |
| --------------------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0` zostavuje pomocou webpacku: nižšie maximum pamäte, pomalšie. `1` zapína Turbopack.          |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | Horný limit haldy V8 (`--max-old-space-size`) pre spustený proces `next build`.                 |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | Nastavuje `CIRCLE_NODE_TOTAL`; Next odvodí `workers = N - 1` pre zhromažďovanie údajov stránok. |

`OMNIROUTE_BUILD_WORKERS` je parameter, ktorý treba zvýšiť na výkonnom zostavovacom stroji, a zároveň prvý podozrivý parameter, keď zostavenie s obmedzenými zdrojmi zlyhá **po** hlásení `✓ Compiled successfully`. Každý pracovný proces pre údaje stránok je samostatný proces, rovnako ako samotný rodičovský proces `next build`; reprodukcia na živom VPS (problém č. 7518) namerala maximum RSS každého procesu na úrovni ~4,5 GB bez ohľadu na príznak haldy `NODE_OPTIONS` (Turbopack kompiluje v natívnej/Rust pamäti mimo haldy V8). Predvolená hodnota `2` (→ 1 pracovný proces, celkovo 2 procesy) je nastavená pre hostované spúšťacie prostredia GitHubu so 16 GB / 4 vCPU, ktoré používa pipeline publikovania. Pri hodnote `8` (→ 7 pracovných procesov) sa tomuto prostrediu minula pamäť a buildkit ukončil krok chybou `ResourceExhausted: ... cannot allocate memory`; hodnota `3` (→ 2 pracovné procesy) sa stále nezmestila po priamom zmeraní RSS jednotlivých procesov namiesto jeho odhadu. `tests/unit/docker-build-memory-budget.test.ts` vykonáva výpočet podľa nameranej hodnoty a zlyhá, ak ktorýkoľvek z parametrov prekročí možnosti spúšťacieho prostredia.

Turbopack kompiluje v natívnej pamäti Rustu, ktorá sa nachádza **mimo** haldy V8, takže `OMNIROUTE_BUILD_MEMORY_MB` ju neobmedzuje. Na hostiteľovi s pamäťovým limitom potom OOM killer ukončí zostavenie signálom SIGKILL úplne bez chybového textu — jednoducho sa zastaví uprostred hlásenia `Creating an optimized production build`, čo pôsobí skôr ako zamrznutie než ako nedostatok pamäte. Preto `Dockerfile` predvolene používa webpack (`OMNIROUTE_USE_TURBOPACK=0`), na rozdiel od `npm run dev` / `npm run build`, kde je v kóde predvolený Turbopack: samotný príkaz `docker build .` bez argumentov zostavenia (ktorý spúšťajú Railway a ďalší poskytovatelia nasadenia jedným kliknutím) nesmie na zostavovacom stroji s obmedzenou pamäťou potichu zlyhať. Publikované obrazy už explicitne odovzdávajú `OMNIROUTE_USE_TURBOPACK=0` v súbore `docker-publish.yml`. Na zostavovacom stroji s dostatkom RAM zapnite Turbopack na rýchlejšie zostavenie:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je zapnutý, takže `next build` spúšťa rodičovský **aj** pracovný proces a každý z nich samostatne rešpektuje `OMNIROUTE_BUILD_MEMORY_MB`. Limit kontajnera nastavte približne nad dvojnásobok tejto hodnoty, nie iba nad jej jednonásobok.

Namerané v tomto strome (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limit kontajnera | Výsledok                                        |
| --------- | ---------------- | ----------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | v oboch prípadoch potichu ukončené cez OOM      |
| webpack   | 8 GiB            | pracovný proces zostavenia ukončený cez SIGKILL |
| webpack   | 12 GiB           | úspešné, maximum 11,1 GiB                       |

### Predvolené nastavenia runtime prostredia

Predvolené hodnoty exportované fázou `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Správanie pamäte v Dockeri:

- Obraz nastavuje `OMNIROUTE_MEMORY_MB=1024` a odvodzuje z neho `NODE_OPTIONS=--max-old-space-size=1024`.
- Samotný serverový proces spúšťa samostatný spúšťač, ktorý načíta `OMNIROUTE_MEMORY_MB` a pridá `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node používa poslednú opakovanú hodnotu `--max-old-space-size`, takže nastavenie `OMNIROUTE_MEMORY_MB` určuje efektívny limit haldy v Dockeri.
- Keďže ho obraz vždy nastavuje, vlastná záložná hodnota spúšťača kalibrovaná podľa RAM sa v Dockeri nikdy nepoužije. Pre danú pracovnú záťaž ju explicitne zvýšte (tabuľka nižšie). Hodnota `2048` je pre `/v1/responses` kódovacích agentov stále príliš nízka.

### Operačná pamäť pre kódovacích agentov

Predvolená hodnota 1 GiB v Dockeri je minimom pre ovládací panel alebo nenáročný chat, nie veľkosťou vhodnou pre produkčné prostredie. Dlhé telá požiadaviek `POST /v1/responses` (stovky správ, desiatky nástrojov) počas kompresie uchovávajú v pamäti viacero grafov. Dve prekrývajúce sa požiadavky s veľkosťou približne 3 MiB / 750-tisíc tokenov spôsobili zlyhanie V8 pri **12 GiB** priestoru old-space (`FATAL ERROR: Reached heap limit`) a tiež OOM v cgroup s limitom 16 GiB. Pozrite si [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nastavte **cgroup `--memory` vyššie než veľkosť haldy** — natívne vyrovnávacie pamäte, SQLite a medzivýsledky kompresie sa nachádzajú mimo V8.

| Pracovná záťaž                              | `OMNIROUTE_MEMORY_MB`        | Kontajner / cgroup      | Poznámky                                                                                                         |
| ------------------------------------------- | ---------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Ovládací panel, jeden nenáročný chat        | `1024` (predvolené v obraze) | ≥2 GiB                  |                                                                                                                  |
| Jeden kódovací agent (Claude/Codex/Grok)    | `8192`                       | ≥10 GiB                 | Typická jedna relácia `/v1/responses`                                                                            |
| Dve súbežné dlhé požiadavky `/v1/responses` | `10240`–`12288`              | ≥12–16 GiB              | Namerané zlyhanie V8 pri halde s veľkosťou približne 12 GiB                                                      |
| Tri alebo viac súbežných dlhých kontextov   | nespúšťajte v jednom procese | serializácia / viac RAM | Predvolene je povolená 1 prebiehajúca náročná požiadavka; zvýšenie limitu bez pridania RAM opäť spôsobí zlyhanie |

Príkaz `omniroute serve` na fyzickom systéme nastaví približne 35 % RAM (obmedzené na rozsah `[512, 4096]`), keď premenná `OMNIROUTE_MEMORY_MB` **nie je nastavená**. Docker vždy nastavuje hodnotu `1024`, takže sa táto kalibrácia v oficiálnom obraze nikdy nevykoná.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritické premenné prostredia

Okrem predvolených hodnôt zdokumentovaných v súbore [ENVIRONMENT.md](../reference/ENVIRONMENT.md) sú pri spúšťaní v Dockeri najdôležitejšie nasledujúce premenné:

| Premenná                      | Účel                                                                                                                                                                                                                                                                                                 | Predvolená hodnota          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Zdieľaný tajný kľúč pre most WebSocket. **Vyžaduje sa v produkcii** — nastavte ho na silný náhodný reťazec.                                                                                                                                                                                          | nenastavená (musí sa zadať) |
| `REDIS_URL`                   | Pripojovací reťazec pre obmedzovač frekvencie požiadaviek / backend vyrovnávacej pamäte                                                                                                                                                                                                              | `redis://redis:6379`        |
| `REDIS_PORT`                  | Port na strane hostiteľa pre pribalený kontajner Redis                                                                                                                                                                                                                                               | `6379`                      |
| `REDIS_BIND_HOST`             | Hostiteľské rozhranie, na ktorom je publikovaný port pribaleného Redisu (rozhranie spätnej slučky, pokiaľ nepridáte AUTH)                                                                                                                                                                            | `127.0.0.1`                 |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Cesta na hostiteľovi pripojená do profilu `cli` ako `/workspace/omniroute` pre pracovné postupy samočinnej aktualizácie                                                                                                                                                                              | `.` (aktuálny adresár)      |
| `OMNIROUTE_MEMORY_MB`         | Limit haldy Node počas behu pre samostatný server Docker; prepíše predvolenú hodnotu obrazu uvedenú vyššie. Agenti na programovanie: `8192`+ (pozrite si [operačnú pamäť počas behu](#runtime-ram-for-coding-agents)).                                                                               | `1024`                      |
| `DASHBOARD_PORT` / `API_PORT` | Prepíše sprístupnené porty pre ovládací panel (20128) a API (20129)                                                                                                                                                                                                                                  | `20128` / `20129`           |
| `APP_BIND_HOST`               | Hostiteľské rozhranie, na ktorom docker-compose publikuje porty ovládacieho panela/API/živého WS. Pri `REQUIRE_API_KEY=false` (predvolená hodnota) vystaví `0.0.0.0` anonymný proxy server `/v1` sieti LAN — rozsah rozšírte iba s `REQUIRE_API_KEY=true` alebo s reverzným proxy serverom pred ním. | `127.0.0.1`                 |
| `CLIPROXY_BIND_HOST`          | Hostiteľské rozhranie, na ktorom docker-compose publikuje pomocný kontajner `cliproxyapi` — jeho dátový zväzok uchováva prihlasovacie údaje poskytovateľa.                                                                                                                                           | `127.0.0.1`                 |
| `OMNIROUTE_PLUGINS_DIR`       | Adresár, ktorý skener zásuvných modulov za behu prehľadáva a do ktorého ich inštaluje. Nastavte ho, keď sú zásuvné moduly pripojené pomocou bind mountu: predvolená hodnota sa riadi premennou `HOME`, ktorú obraz nemusí exportovať.                                                                | `~/.omniroute/plugins`      |
| `OMNIROUTE_BASE_PATH`         | Podcesta URL, keď je aplikácia publikovaná za reverzným proxy serverom (napr. `/omniroute`)                                                                                                                                                                                                          | _(prázdna = koreň)_         |
| `NEXT_PUBLIC_BASE_URL`        | Verejný zdroj pre prehliadač vrátane podcesty (napr. `https://host/omniroute`)                                                                                                                                                                                                                       | nenastavená                 |
| `PROD_DASHBOARD_PORT`         | Port ovládacieho panela na strane hostiteľa pre `docker-compose.prod.yml`                                                                                                                                                                                                                            | `20130`                     |
| `CLIPROXYAPI_PORT`            | Port na strane hostiteľa pre pomocný kontajner `cliproxyapi`                                                                                                                                                                                                                                         | `8317`                      |

## Reverzný proxy server na podceste (Traefik / nginx)

Hodnota `basePath` systému Next.js sa skompiluje do samostatného balíka. OmniRoute zaznamená vloženú
hodnotu do kontrolného súboru v koreňovom adresári aplikácie (zapísaného počas `npm run build`; čítaného
skriptom `scripts/docker/ensure-docker-base-path.mjs`) a pri spustení kontajnera ju porovná
s hodnotou `OMNIROUTE_BASE_PATH`. Keď sa líšia a obraz bol zostavený
pre koreň domény, vstupný bod prepíše samostatné manifesty,
vložené literály `basePath`/`assetPrefix` (Next 16 vykresľuje adresy URL SSR assetov iba
z `assetPrefix` — nástroj na úpravu doň zrkadlí podcestu), vložené
adresy URL assetov `/_next/static` (manifesty klientskych referencií, importy médií, vopred vykreslené
chybové stránky) a klientsku náhradu `process.env` pred spustením `node dev/run-standalone.mjs`.

### Zostavenie pomocou Compose (odporúčané)

Nastavte obe premenné v `.env` a potom obraz znova zostavte, aby sa jeho konfigurácia zhodovala s konfiguráciou za behu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` odovzdáva `OMNIROUTE_BASE_PATH` ako argument zostavenia Dockeru aj ako
premennú prostredia za behu.

### Vopred zostavený obraz pre koreňovú cestu + podcesta za behu

Publikované obrazy `diegosouzapw/omniroute:*` sú zostavené pre koreň domény. Hodnotu
`OMNIROUTE_BASE_PATH` môžete napriek tomu nastaviť za behu; kontajner pri spustení jednorazovo upraví balík.
Použite ju spolu so zodpovedajúcim verejným pôvodom:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Nakonfigurujte reverzný proxy server tak, aby preposielal **úplnú** externú cestu (neodstraňujte
prefix). Traefik má smerovať `PathPrefix(`/omniroute`)` do kontajnera bez
`StripPrefix`, aby Next.js prijímal `/omniroute/...` a poskytoval assety z
`/omniroute/_next/...`.

Kontrola stavu Dockeru testuje odľahčený koncový bod životného cyklu `/healthz` s prefixom
aktívnej hodnoty `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` zostáva dostupný na
diagnostiku pre používateľov a informačné panely; ak naň chcete znova nasmerovať HEALTHCHECK kontajnera (napríklad
na vynútenie hĺbkovej kontroly stavu), nastavte `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Táto cesta vykonáva **hĺbkovú** kontrolu (databáza + súhrn monitorovania) — je vhodná pre
zriedkavý `HEALTHCHECK` Dockeru, ak sa ju rozhodnete opäť použiť, ale **nie** pre intervaly
`livenessProbe` v Kubernetes.

Pre orchestrátory (Kubernetes, Nomad atď.):

| Sonda              | Uprednostnite                                                             | Vyhnite sa                                                                    |
| ------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Životaschopnosť    | HTTP `GET /livez` alebo TCP na hlavnom porte (`PORT`, predvolene `20128`) | `/api/monitoring/health` ako kontrola životaschopnosti                        |
| Pripravenosť       | HTTP `GET /healthz`                                                       | Krátkym časovým limitom, ktoré považujú vyťaženú slučku udalostí za nefunkčnú |
| Hĺbková / blackbox | `/api/monitoring/health`                                                  | —                                                                             |

`/healthz` hlási stav životného cyklu procesu (`ok` / `starting` / `stopping`). `/livez` kontroluje
iba to, či proces beží (vracia 200 vždy, keď je možné obslužnú rutinu spustiť; nečaká
na pripravenosť). Obe kontroly stále bežia v rovnakej slučke udalostí Node ako spracovanie požiadaviek, takže
spracovanie katalógu alebo kompresia náročné na CPU ich môžu oneskoriť — vyťažený ≠ nefunkčný. Ak HTTP
sondám vyprší časový limit, uprednostnite kontrolu životaschopnosti cez TCP. Kompletné odporúčania ku kontrolám:
[Sprievodca monitorovaním — odporúčania pre sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddy (automatické HTTPS TLS)

OmniRoute možno bezpečne sprístupniť pomocou automatického poskytovania SSL certifikátov v Caddy. Uistite sa, že DNS záznam typu A vašej domény smeruje na IP adresu vášho servera.

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
      # Origin viditeľný pre prehliadač, používaný pre spätné volania OAuth, odkazy ovládacieho panela a generované verejné URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interná URL medzi servermi pre naplánované úlohy / požiadavky na seba samého.
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

Caddy nastavuje štandardné hlavičky preposielania pre nadradený kontajner. OmniRoute používa
`NEXT_PUBLIC_BASE_URL` ako kanonický verejný origin pre spätné volania OAuth a generované verejné
odkazy; autentifikované zápisy z ovládacieho panela používajú požiadavky s rovnakým originom spolu s ochranou CSRF
viazanou na reláciu. Premennú `OMNIROUTE_TRUST_PROXY` povoľte iba pri pokročilých nasadeniach, pri ktorých zámerne
chcete, aby OmniRoute odvodzoval verejný origin z dôveryhodných preposlaných hlavičiek namiesto explicitnej
konfigurácie.

## Rýchly tunel Cloudflare

Podpora ovládacieho panela pre nasadenia Docker zahŕňa **rýchly tunel Cloudflare** na jedno kliknutie v časti `Dashboard → Endpoints`. Pri prvom povolení sa `cloudflared` stiahne iba v prípade potreby, spustí sa dočasný tunel k vášmu aktuálnemu koncovému bodu `/v1` a generovaná URL `https://*.trycloudflare.com/v1` sa zobrazí priamo pod vašou bežnou verejnou URL.

Panely tunelov koncových bodov (Cloudflare, Tailscale, ngrok) možno zobraziť alebo skryť v časti `Settings → Appearance` bez zmeny stavu aktívneho tunela.

### Poznámky k tunelom

- URL rýchlych tunelov sú dočasné a po každom reštarte sa zmenia.
- Rýchle tunely sa po reštarte OmniRoute alebo kontajnera automaticky neobnovia. V prípade potreby ich znova povoľte z ovládacieho panela.
- Spravovaná inštalácia v súčasnosti podporuje Linux, macOS a Windows na architektúrach `x64` / `arm64`.
- Spravované rýchle tunely predvolene používajú prenos HTTP/2, aby sa predišlo rušivým upozorneniam na vyrovnávaciu pamäť UDP protokolu QUIC v obmedzených kontajnerových prostrediach. Ak chcete použiť iný prenos, nastavte `CLOUDFLARED_PROTOCOL=quic` alebo `auto`.
- Obrazy Docker obsahujú systémové koreňové certifikáty CA a odovzdávajú ich spravovanému procesu `cloudflared`, čím sa predchádza zlyhaniam dôveryhodnosti TLS pri inicializácii tunela vnútri kontajnera.
- Ak chcete, aby OmniRoute namiesto stiahnutia použil existujúci binárny súbor, nastavte `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Značky obrazov

| Obraz                    | Značka   | Veľkosť | Popis                                                             |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Najvyššia **publikovaná** stabilná verzia SemVer (nie git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Pre GitOps pripnite značku tejto triedy                           |

Manifest pre viacero platforiem: natívne `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automaticky vyberie zodpovedajúcu architektúru; ak potrebujete na hostiteľoch ARM vynútiť emuláciu AMD64, zadajte `--platform linux/amd64`.

### Kanály vydaní

OmniRoute publikuje samostatné kanály Docker pre stabilné vydania, testovanie aktívnej vetvy vydania a vývojové zostavy.

| Kanál                           | Zdroj                                            | Meniteľnosť                              | Odporúčané použitie                                                                                                |
| ------------------------------- | ------------------------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Podpísané/verziované vydanie                     | Nemenné                                  | Produkčné nasadenia, ktoré pripínajú presné vydanie                                                                |
| `:latest` / `:latest-web`       | Najvyššia **publikovaná** stabilná verzia SemVer | Meniteľný stabilný ukazovateľ            | Sleduje stabilné vydania **po** úlohe publikovania SemVer — **nesleduje** `main` ani nevydané commity `release/v*` |
| `:next` / `:next-web`           | Aktuálna predvolená vetva `release/v*`           | Meniteľný ukazovateľ predbežného vydania | Testovanie opráv, ktoré sa dostali do aktívnej vetvy vydania, ale ešte nie sú súčasťou stabilného vydania          |
| `:main` / `:main-web`           | Vetva `main`                                     | Meniteľný vývojový ukazovateľ            | Iba na vývojové a integračné testovanie                                                                            |

#### Poskytovatelia webových relácií: obrazy `-web`

Každý z vyššie uvedených kanálov je dostupný aj ako značka `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) vytvorená z fázy `runner-web` — ide o rovnaký obraz doplnený o Playwright a prehliadač Chromium. Základný obraz sa dodáva **bez** prehliadača Chromium; poskytovatelia `gemini-web`, `claude-web` a `claude-turnstile` ho vyžadujú.

Zlyhanie je odložené a nenastáva pri spustení: títo poskytovatelia uvádzajú svoje modely a v ovládacom paneli sa zobrazujú ako pripojení, pričom zlyhá až prvá požiadavka s hlásením

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ak používate týchto poskytovateľov, stiahnite značku `-web` kanála, ktorý už používate — nič iné sa nemení. Pri inštalácii cez npm/CLI (bez obrazu Docker) je zodpovedajúcou chýbajúcou súčasťou binárny súbor prehliadača: na hostiteľovi spustite `npx playwright install chromium`.

#### Používanie kanála predbežného vydania

Kanál `next` sa znovu zostavuje pri každom odoslaní zmien do aktuálnej predvolenej vetvy `release/v*` a publikuje sa pre AMD64 aj ARM64. Staršie vetvy údržby ho nemôžu prepísať. Kanál poskytuje obraz, ktorý možno stiahnuť a ktorý obsahuje opravy zlúčené do aktívnej vetvy vydania ešte pred vytvorením ďalšej stabilnej značky.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pre Docker Compose prepíšte značku obrazu používanú vybratým profilom, potom stiahnite obraz a znova vytvorte službu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpečnosť a návrat k predchádzajúcej verzii

`next` je pohyblivý kanál predbežných vydaní. Môže sa zmeniť pri každom odoslaní zmien do aktívnej vetvy vydania a **nie je podporovaný na produkčné použitie**. Pri vyhodnocovaní konkrétneho zostavenia pripnite súhrn obrazu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pred testovaním zálohujte dátový zväzok OmniRoute alebo pripojený dátový adresár. Ak sa chcete vrátiť k predchádzajúcej verzii, obnovte predtým používanú stabilnú verziu alebo súhrn a znova vytvorte kontajner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Zostavenie z vetvy vydania nikdy nemôže presunúť `latest`; stabilný ukazovateľ môže aktualizovať iba oprávnená stabilná sémantická verzia. Obrazy `next` zachovávajú kontrolu obrazu vydania a blokovaciu bránu pre zraniteľnosti úrovne CRITICAL.

**`latest` nie je zárukou aktuálnosti voči systému git.** Zlúčené opravy vo vetve `main` alebo v aktívnej vetve `release/v*` sa v `:latest` **nenachádzajú**, kým sa nepublikuje stabilný obraz SemVer a úloha publikovania neaktualizuje `:latest` (rovnaký súhrn ako daná verzia SemVer). Ak sa zdá, že `latest` zostal nezmenený, hoci GitHub už opravu zobrazuje, stiahnite `:next` na otestovanie vetvy vydania alebo počkajte na značku SemVer.

| Čo chcete                                                                               | Použite                                |
| --------------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps/produkciu, ktorá nesmie samovoľne prejsť na inú verziu                           | Pripnite `:X.Y.Z` (alebo súhrn obrazu) |
| Sledovať publikované stabilné verzie a pri každom vydaní akceptovať opätovné vytvorenie | `:latest`                              |
| Testovať nevydané revízie vo vetve `release/v*`                                         | `:next` (nie pre produkciu)            |
| Testovať vetvu `main`                                                                   | `:main` (nie pre produkciu)            |

## Dostupnosť: predvolený SQLite podporuje iba jednu repliku

Štandardné nasadenie OmniRoute cez Docker / Kubernetes predstavuje **jeden proces Node + jeden zapisovač SQLite**. Vysoká dostupnosť **nie je v tejto topológii podporovaná**.

| Obmedzenie                                                | Dôsledok                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jeden zapisovač                                           | **Nespúšťajte** viacero replík nad rovnakým súborom SQLite. Došlo by k poškodeniu databázy.                                                                                                                                                                                                                                                                |
| Opätovné vytvorenie / reštart / ukončenie cez HEALTHCHECK | **Úplný výpadok** prebiehajúcich spojení SSE, relácií ovládacieho panela a stavu v pamäti. Každý pripojený klient bude odpojený. Nové požiadavky počas obdobia bez koncového bodu dostanú od reverzného proxy servera odpoveď **`502 Bad Gateway: Unknown error`**, nie JSON z OmniRoute — klienti ju nedokážu odlíšiť od zlyhania poskytovateľa (#11015). |
| Rovnaká slučka udalostí ako `/healthz`                    | Vyťažený katalóg alebo cyklus kompresie môže oneskoriť sondy; krátky časový limit potom reštartuje **jedinú** repliku.                                                                                                                                                                                                                                     |

**Matica sond** (pozrite si aj [odporúčania pre sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda              | Cieľ                                                                 | Nepoužívajte                                                               |
| ------------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Životnosť          | TCP na `PORT` (predvolene `20128`) alebo mäkká HTTP sonda `/healthz` | `/api/monitoring/health`                                                   |
| Pripravenosť       | HTTP `GET /healthz`                                                  | Krátke časové limity, ktoré považujú vyťaženú slučku udalostí za nefunkčnú |
| Hĺbková / pre ľudí | `/api/monitoring/health`                                             | Automatizovanú sondu životnosti kubeletu                                   |

**Aktualizácie:** počítajte s ukončením každej relácie. Ak môžete, najprv odpojte klientov; pri predvolenom SQLite nie je možná priebežná aktualizácia. Kombinácia `restart: unless-stopped` v Compose a `HEALTHCHECK` v Dockeri takisto nahradí jediný proces, keď sa kontajner dostane do stavu Unhealthy — s rovnakým rozsahom následkov.

Ukážka konfigurácie Kubernetes pre **jednu repliku** (vyžaduje sa Recreate; pri jednom súbore SQLite nezvyšujte hodnotu `replicas`):

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

Oneskorenie `preStop` umožní Kubernetes odstrániť koncové body služby pred odoslaním SIGTERM, takže **nová** prevádzka prestane smerovať na ukončovaný proces. Prebiehajúce spojenia SSE `/v1/responses` sa ukončujú kontrolovane až do uplynutia `SHUTDOWN_TIMEOUT_MS` (predvolene 30 s) prostredníctvom robustných prenájmov riadenia prístupu (#11015). Nové požiadavky, ktoré napriek tomu dorazia k procesu, dostanú odpoveď `503` + `Retry-After: 5`. Obdobie bez koncového bodu pri stratégii Recreate, kým nebude náhrada v stave Ready, zostáva úplným výpadkom — je to vlastnosť topológie SQLite, nie nesprávna konfigurácia sondy.

Externý Postgres / vysoká dostupnosť s viacerými zapisovačmi **nie je** zdokumentovaným štandardným spôsobom nasadenia. Ak potrebujete vysokú dostupnosť, ponechajte jednu repliku alebo použite topológiu, ktorú projekt samostatne otestoval a zdokumentoval. Práce na podpore Postgres/MySQL sú vedené v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kým nebude táto podpora vydaná, jediným podporovaným spôsobom zvýšenia kapacity pre **veľké** požiadavky `/v1/responses` je N nezávislých procesov (ďalšia časť), nie `replicas > 1` na jednom zväzku.

## Horizontálne škálovanie: N nezávislých procesov

Jeden proces Node predstavuje **jednu haldu V8**. Dve prekrývajúce sa požiadavky kódovacieho agenta `POST /v1/responses` (RTK + Caveman) s veľkosťou približne 3 MiB / 750 000 tokenov spôsobia ukončenie tejto haldy pri približne 12 Gi (`FATAL ERROR: Reached heap limit`) a môžu spôsobiť OOM v cgroup s veľkosťou 16 Gi. Pozrite si [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Toto meranie je upozornením na **pamäťový rozpočet**, nie pevne stanoveným produktovým maximom dvoch súbežných dlhých požiadaviek `/v1/responses`. Prijímanie náročných chatových požiadaviek riadi automaticky odvodený rozpočet bajtov na vstupe (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dimenzovaný podľa rovnakého limitu V8/cgroup — jeho zvýšenie prepísaním predvolenej hodnoty (alebo nastavenie staršieho limitu počtu požiadaviek `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) v už dimenzovanom procese opätovne spôsobí ukončenie. Malé chaty, `/healthz`, `/v1/models` a MCP **nie sú** zahrnuté do tohto limitu.

### Jeden proces: viac ako dve dlhé požiadavky `/v1/responses`

**Zdravý** proces (halda pod hodnotou `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, predvolene `0.75`) **môže** spúšťať viac ako dve súbežné dlhé požiadavky `POST /v1/responses`, pokiaľ má celoprocesový rozpočet bajtov pre prebiehajúce požiadavky (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) stále voľnú kapacitu. Telá s veľkosťou aspoň `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (predvolene 256 KiB) získavajú rovnaký prenájom kapacity pre náročné požiadavky ako štruktúrne náročné požiadavky a používajú rovnaký mechanizmus `tryAcquireHealthyHeadroom` z [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desiatky súbežných dlhotrvajúcich klientov SSE (prevádzkovatelia často potrebujú 40–50) sú otázkou **pamäťového rozpočtu** — dimenzujte haldu, primárne sloty/sloty rezervnej kapacity a `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nie pevného produktového limitu „max. 2“. Proces s preťaženou haldou naďalej odmieta požiadavky pomocou opakovateľnej chyby `503`, aby sa problém #7849 nevrátil.

Ak chcete **znásobiť počet háld** (nezávislé staré priestory V8) **už dnes**:

| Urobte                                                                                                                                                                                                                      | Nerobte                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Spustite **N kontajnerov/podov**, každý s **vlastným** `DATA_DIR` / zväzkom                                                                                                                                                 | Nenastavujte `replicas > 1` nad jedným súborom SQLite                |
| Dimenzujte počet náročných prebiehajúcich požiadaviek + zdravú rezervnú kapacitu podľa haldy / rozpočtu bajtov pre prebiehajúce požiadavky; 1–2 je konzervatívna predvolená hodnota pre #7849, nie pevné produktové maximum | Neprideľujte jednému procesu 8× viac RAM a neobmedzený limit počtu   |
| Voliteľne: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pre **zdieľané počítadlá kvót**                                                                                                                             | Nepovažujte Redis za zdieľaný SQLite — nie je ním                    |
| Duplikujte tajné údaje poskytovateľov do každej inštancie (alebo akceptujte oddelené prehľady)                                                                                                                              | Neočakávajte jeden prehľad / jeden denník volaní naprieč inštanciami |
| Pred inštancie umiestnite ľubovoľný nástroj na vyvažovanie záťaže; postačuje afinita podľa kľúča API alebo relácie                                                                                                          | Nevyžadujte middleware konkrétneho dodávateľa zohľadňujúci veľkosť   |

Hardvér: počet súbežných dlhých požiadaviek `/v1/responses` na jednu inštanciu je otázkou **pamäťového rozpočtu** (halda + rozpočet bajtov pre prebiehajúce požiadavky / #10110). `N` nezávislých adresárov `DATA_DIR` stále znásobuje počet háld: RAM hostiteľa musí pokryť `N × cgroup`, nie „jeden pod s 16 Gi a N=8“. Nikdy nepoužívajte `replicas > 1` nad jedným súborom SQLite.

Náčrt konfigurácie Compose (dve haldy, dva zväzky — nie `deploy.replicas: 2`):

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

Hustota v rámci procesu (kompresia mimo izolátu HTTP) je riešená v [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logický klaster nad zdieľaným trvalým stavom je riešený v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionálne chyby Gemini v Dockeri

Google AI Studio / Gemini API môže vrátiť HTTP 400 s chybou FAILED_PRECONDITION a správou
`User location is not supported for the API use.` Úspešná požiadavka na hostiteľovi
nedokazuje, že kontajner používa rovnakú odchádzajúcu trasu. Poradie DNS,
pripojenie IPv4/IPv6, smerovanie VPN a nakonfigurované proxy servery sa môžu líšiť. Skontrolujte
[regióny podporované spoločnosťou Google](https://ai.google.dev/gemini-api/docs/available-regions),
ako aj skutočnú trasu pripojenia; samotná táto chyba neznamená, že kľúč API je neplatný.

### Uprednostnite proxy špecifické pre pripojenie

Pre príslušné pripojenie Gemini použite [konfiguráciu proxy pre jednotlivé pripojenia](../ops/PROXY_GUIDE.md#4-level-proxy-system)
v OmniRoute a potom zopakujte **Test Connection** a malú požiadavku
s rovnakým modelom. Zmena smerovania tak zostane obmedzená na dané pripojenie. Overte,
že proxy je dostupné z kontajnera a že ho pripojenie skutočne používa.
Zmena trasy nezaručuje regionálnu dostupnosť služby upstream.

### Porovnajte sieťové pripojenie hostiteľa a kontajnera

Pri porovnávaní autentifikovaných výsledkov zachovajte rovnaký kľúč, model aj požiadavku; nikdy
nevkladajte prihlasovacie údaje, heslá proxy ani úplné autorizačné hlavičky do hlásenia problému.
Najprv pomocou rovnakého príkazu na hostiteľovi aj v kontajneri skontrolujte,
ktoré rodiny adries ponúka resolver operačného systému:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Nahraďte `omniroute` službou, ktorú používate (napríklad `omniroute-web`). Tieto
príkazy vypíšu rodiny adries bez prihlasovacích údajov alebo IP adries. Vrátená hodnota `6`
iba označuje výsledok DNS pre IPv6: **nedokazuje** použiteľnú trasu IPv6 ani prístup k API.
Ak je nainštalovaný `curl`, porovnajte `curl -4 -I https://generativelanguage.googleapis.com`
s `curl -6 -I https://generativelanguage.googleapis.com` v oboch prostrediach.
Odpoveď HTTP dokazuje dostupnosť pripojenia pre túto skúšobnú požiadavku, aj keď ide o neautentifikovanú
chybu; dostupnosť Gemini overí iba autentifikovaná požiadavka na model.

### Alternatíva na úrovni hostiteľa: funkčné IPv6 a politika resolvera

Autor hlásenia [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) obnovil
prístup vo svojom prostredí povolením IPv6 pre kontajnery a zmenou výberu adries v glibc.
Považujte to za alternatívu špecifickú pre dané prostredie. Pred úpravou preferencií resolvera
overte funkčnosť IPv6 na hostiteľovi, odchádzajúce pripojenie a smerovanie kontajnera aj pravidlá firewallu.
Samotná súkromná adresa ULA nepotvrdzuje verejné pripojenie IPv6.

Pre služby, ktoré sú už pripojené k predvolenej sieti Compose, tento fragment povolí
IPv6 v danej sieti; zachovajte zvyšok konfigurácie služby, portov, zväzkov a ďalších nastavení:

```yaml
networks:
  default:
    enable_ipv6: true
```

V prípade pomenovanej siete povoľte IPv6 v sieti, ku ktorej je služba skutočne pripojená. Docker môže
prideliť podsieť ULA; explicitnú, neprekrývajúcu sa podsieť vyberte iba vtedy, keď to vaša sieť
vyžaduje. Pozrite si dokumentáciu [Sieť IPv6 v Dockeri](https://docs.docker.com/engine/daemon/ipv6/)
a [Možnosti siete Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

V **obraze založenom na glibc** môže `/etc/gai.conf` zmeniť výber adries. Aktuálny
Dockerfile repozitára používa Debian; vlastné obrazy založené na musl tento mechanizmus nepodporujú.
Opísaná úprava mení označenie ULA z `label fc00::/7 6` na
`label fc00::/7 1`. Začnite s úplnou tabuľkou politík obrazu a zachovajte jej ostatné
položky: pridaním položky `label` alebo `precedence` sa nahradí predvolená tabuľka, takže súbor
obsahujúci iba zmenený riadok nestačí. Tieto pravidlá sú zdokumentované v
[referenčnej príručke ku konfigurácii glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf).
Skontrolovaný súbor pripojte iba na čítanie do `/etc/gai.conf`
a znova vytvorte službu, aby sa zmena použila.

Táto úprava zmení výber adries operačného systému pre **všetku odchádzajúcu komunikáciu v danom kontajneri**.
Nevynúti, aby každá aplikácia vybrala IPv6: záleží aj na poradí DNS a výbere
pripojenia v Node. Konkrétne `--dns-result-order=ipv4first` uprednostňuje IPv4 a
nie je riešením zlyhania pri používaní výlučne IPv4. Pozrite si [poradie DNS v Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po každej zmene na úrovni hostiteľa znova otestujte Gemini aj ostatných poskytovateľov. Ak chcete zmenu vrátiť späť,
odstráňte vlastné pripojenie súboru `gai.conf`, obnovte predchádzajúcu konfiguráciu siete a
počas servisného okna znova vytvorte príslušnú službu alebo sieť. Opätovné vytvorenie siete
môže prerušiť ostatné kontajnery, ktoré sú k nej pripojené; neodstraňujte zväzok s trvalými údajmi.

## Dôležité poznámky

- **Režim SQLite WAL:** Príkazu `docker stop` je potrebné umožniť dokončenie, aby mohol OmniRoute zapísať najnovšie zmeny späť do `storage.sqlite` prostredníctvom kontrolného bodu. Pribalené súbory Compose už nastavujú 40-sekundnú lehotu na korektné zastavenie. Ak obraz spúšťate priamo, ponechajte `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nastavte na `true`, ak sú pravidelné zálohy a zálohy pred zápisom spravované externe. Migrácie existujúcej databázy naďalej vyžadujú vlastnú trvalú bezpečnostnú snímku a ochranu pred hromadnou migráciou.
- **Perzistencia údajov:** Vždy pripojte zväzok k `/app/data`, aby sa databáza, kľúče a konfigurácie zachovali aj po reštartovaní kontajnera.
- **Konfigurácia portu:** Ak chcete zmeniť predvolený port `20128`, prepíšte premennú prostredia `PORT`.

## Pozrite tiež

- [Príručka nasadenia na VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Nastavenie VM + nginx + Cloudflare
- [Príručka nasadenia na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Nasadenie na Fly.io
- [Konfigurácia prostredia](../reference/ENVIRONMENT.md) — Kompletný prehľad súboru `.env`
