# 🐳 Docker Guide — OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kompletná referenčná príručka k nasadeniu pomocou Dockeru. Stručný úvod nájdete v [sekcii Docker v súbore README](../README.md#-docker).

## Obsah

- [Rýchle spustenie](#quick-run)
- [So súborom prostredia](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupné profily](#available-profiles)
- [Konfigurácia nástrojov CLI hostiteľa, keď OmniRoute beží v Dockeri](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis ako sprievodný kontajner](#redis-sidecar)
- [Produkčný Compose](#production-compose)
- [Fázy súboru Dockerfile](#dockerfile-stages)
- [Kritické premenné prostredia](#critical-environment-variables)
- [Docker Compose s Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Rýchly tunel Cloudflare](#cloudflare-quick-tunnel)
- [Značky obrazov](#image-tags)
- [Dostupnosť: predvolená databáza SQLite podporuje iba jednu repliku](#availability-default-sqlite-is-single-replica)
- [Dôležité poznámky](#important-notes)

---

## Rýchle spustenie

> **Vlastný hosting jediným príkazom?** Pozrite si
> [Sprievodcu vlastným hostingom](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publikovaný obraz +
> Redis, prístupný iba cez loopback, bez výberu profilu). Nižšie uvedené Rýchle spustenie
> predstavuje postup s jedným kontajnerom pre používateľov, ktorí už používajú Redis inde.

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
# Najprv skopírujte a upravte súbor .env
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

# Profil CLI (integrované Claude Code, Codex a OpenClaw)
docker compose --profile cli up -d

# Profil hostiteľa (primárne pre Linux; pripája binárne súbory CLI hostiteľa iba na čítanie)
docker compose --profile host up -d

# Kombinácia CLI a sprievodného kontajnera CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupné profily

OmniRoute sa dodáva so štyrmi profilmi Compose. Vyberte profil, ktorý zodpovedá vášmu prostrediu.

| Profil              | Služba           | Kedy použiť                                                                                                                                                                   | Príkaz                                       |
| ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predvolený) | `omniroute-base` | Server bez grafického rozhrania/minimálne runtime prostredie bez pribalených rozhraní CLI poskytovateľov                                                                      | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | Agentné pracovné postupy, ktoré volajú `omniroute providers/setup/doctor`, a pribalené rozhrania CLI (Codex, Claude Code, Droid, OpenClaw)                                    | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | Hostitelia so systémom Linux, ktorí požadujú prístup podobný `network_mode` k rozhraniam CLI hostiteľa pripojením `~/.local/bin`, `~/.codex`, `~/.claude` atď. iba na čítanie | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Spustenie sprievodného kontajnera [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porte `8317` na proxyovanie nadradených rozhraní CLI                         | `docker compose --profile cliproxyapi up -d` |

> Je možné kombinovať viacero profilov: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurácia hostiteľských nástrojov CLI, keď OmniRoute beží v Dockeri

`omniroute setup-codex`, `setup-claude`, `config set <tool>` a tlačidlo
**Uložiť konfiguráciu** na ovládacom paneli zapisujú súbory ako `~/.codex/*.config.toml`. Tieto cesty
majú význam iba na počítači, na ktorom CLI skutočne beží. Ak ich spustíte vnútri
kontajnera, zápis skončí vo vlastnom domovskom adresári kontajnera (`/home/node` —
obraz beží ako `USER node`), odkiaľ ho žiadne hostiteľské CLI nikdy neprečíta a kde sa
zahodí vo chvíli, keď sa kontajner znova vytvorí.

OmniRoute túto situáciu rozpozná a namiesto hlásenia úspechu, ktoré nemôžete využiť,
zápis odmietne a zobrazí pokyny: CLI skončí s kódom `2` a API odpovie stavom `422`
s `containerEphemeralTarget: true`.

### Odporúčané: spustite CLI na hostiteľovi a OmniRoute v Dockeri

Kontajner poskytuje API; CLI konfiguruje vaše hostiteľské nástroje.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nasmeruje CLI na kontajner
omniroute setup-codex                      # zapíše skutočný adresár ~/.codex na vašom hostiteľovi
```

Toto je správna voľba, keď Codex, Claude Code, Cursor alebo podobné nástroje bežia na vašom
notebooku — čo je bežné nastavenie.

### Alternatíva: pripojte hostiteľské konfiguračné adresáre pomocou bind mount (`host` profil)

Ak chcete, aby samotný kontajner zapisoval vašu hostiteľskú konfiguráciu, pripojte
adresáre a nastavte `CLI_CONFIG_HOME` na koreň pripojenia. Profil `host`
to už robí:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Dôveryhodnosť cesty zabezpečuje práve bind mount: OmniRoute číta
`/proc/self/mountinfo` a povoľuje zápis do pripojených ciest (a do adresárov,
ktorých potomkovia sú pripojenými bodmi, čo presne zodpovedá vyššie uvedenej štruktúre `/host-home`), pričom
naďalej odmieta nepripojené cesty.

### Núdzová možnosť: nakonfigurujte vlastné CLI kontajnera (používajte obozretne)

Keď sa CLI skutočne nachádzajú vnútri kontajnera (profil `cli`), zápis
je zámerný. Odovzdajte parameter `--allow-container-write` ľubovoľnému príkazu `setup-*` alebo nastavte
pre server `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Zápis sa vykoná
s upozornením, že po zániku kontajnera sa nezachová.

> **Bezpečnostné upozornenie — profil `cli` + pripojenie `docker.sock`.**
> Profil `cli` pripája `/var/run/docker.sock` pomocou bind mount, aby automatický aktualizátor
> v kontajneri mohol znova vytvoriť stack prostredníctvom hostiteľského démona
> (`src/lib/system/autoUpdate.ts` kontroluje prítomnosť tohto socketu a preskočí
> cestu Docker, keď socket chýba). Tento socket predstavuje **hranicu dôveryhodnosti
> s oprávneniami root na hostiteľovi**: čokoľvek, čo k nemu má prístup, ovláda hostiteľský démon Docker ako
> root — môže vytvoriť, kontrolovať, zastaviť a odstrániť ľubovoľný kontajner na hostiteľovi.
> Dôsledky:
>
> 1. **Nikdy nevystavujte port profilu `cli` do siete.** Publikujte
>    ho na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupný zo siete LAN zmení akúkoľvek možnosť vzdialeného vykonania kódu na úrovni ovládacieho panela
>    na úplné kompromitovanie hostiteľa.
> 2. **Do profilu `cli` nepripájajte žiadne ďalšie hostiteľské adresáre.**
>    Socket Docker spolu s akýmkoľvek ďalším pripojením poskytne kontajneru úplný
>    prístup na čítanie a zápis do vášho súborového systému a hostiteľskej konfigurácie. Ak nástroj potrebuje
>    pristupovať k projektu, spustite ho lokálne pomocou binárneho súboru CLI — nepripájajte ho
>    do kontajnera `cli`.
>
> Ak nepotrebujete automatické aktualizácie v kontajneri, profil `cli` nezapínajte
> (`COMPOSE_PROFILES=core,redis` alebo kratšia hodnota). Ostatné profily
> socket Docker nepripájajú.
>
> Súvisiaci model hrozieb týkajúci sa MITM nájdete v `docs/security/MITM-TPROXY-DECRYPT.md` (git; neskompilované do `/docs`)
> a reťazec pôvodu binárnych súborov
> `codex`/`claude-code`/`droid`/`openclaw` nájdete v `docs/security/SUPPLY_CHAIN.md`.

## Sprievodný kontajner Redis

OmniRoute využíva Redis ako základ distribuovaného obmedzovača rýchlosti a zdieľanej vyrovnávacej pamäte. Služba `redis` je v súbore `docker-compose.yml` definovaná **vždy** (nie je obmedzená žiadnym profilom) a spúšťa sa spolu s akýmkoľvek iným profilom.

| Podrobnosť                   | Hodnota                                    |
| ---------------------------- | ------------------------------------------ |
| Obraz                        | `redis:7-alpine`                           |
| Názov kontajnera             | `omniroute-redis`                          |
| Interný port                 | `6379`                                     |
| Port hostiteľa (prepísanie)  | `REDIS_PORT` (predvolene `6379`)           |
| Väzba hostiteľa (prepísanie) | `REDIS_BIND_HOST` (predvolene `127.0.0.1`) |
| Zväzok                       | `omniroute-redis-data` → `/data`           |
| Kontrola stavu               | `redis-cli ping` (interval 10 s)           |

Súvisiace premenné prostredia:

- `REDIS_URL` — reťazec pripojenia vložený do aplikácie (predvolene `redis://redis:6379`).
- `REDIS_PORT` — mapovanie portu kontajnera Redis na strane hostiteľa.
- `REDIS_BIND_HOST` — rozhranie hostiteľa, na ktorom sa port zverejní. Predvolená hodnota je `127.0.0.1`.

> **Prečo je predvolená spätná slučka:** sprievodný kontajner beží bez `requirepass` a kontajnery
> aplikácie k nemu pristupujú cez sieť compose (`redis:6379`) — zverejnený port je
> určený iba pre nástroje na strane hostiteľa (`redis-cli`, lokálny `npm run dev`). Zverejnenie na
> `0.0.0.0` by vystavilo Redis bez autentifikácie každému hostiteľovi vo vašej sieti LAN. Ak nastavíte
> `REDIS_BIND_HOST=0.0.0.0`, pridajte tiež `--requirepass` do položky `command:` služby.

**Vypnutie systému Redis** sa neodporúča (obmedzovač rýchlosti prejde na menej efektívny záložný mechanizmus v pamäti). Ak je to nevyhnutné, odstráňte alebo zakomentujte blok služby `redis:` v súbore `docker-compose.yml`, prípadne nastavte počet jej inštancií na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkčný Compose

Pre izolovanú produkčnú snímku spustenú súbežne s vývojovým prostredím použite `docker-compose.prod.yml`.

| Podrobnosť                         | Hodnota                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| Súbor                              | `docker-compose.prod.yml`                                                            |
| Predvolený port ovládacieho panela | `PROD_DASHBOARD_PORT=20130` (mapovaný na interný `${DASHBOARD_PORT:-20128}`)         |
| Predvolený port API                | `PROD_API_PORT=20131`                                                                |
| Obraz                              | `omniroute:prod` (zostavený z cieľa `runner-cli`)                                    |
| Kontajner Redis                    | `omniroute-redis-prod` (`redis:8.6.2`, vyhradený zväzok `redis-prod-data`)           |
| Dátový zväzok                      | `omniroute-prod-data` (pomenovaný, zachovaný medzi opätovnými zostaveniami)          |
| Kontroly stavu                     | `node healthcheck.mjs` + `redis-cli ping`, pričom `depends_on` závisí od stavu Redis |

Použitie:

```bash
# Zostavenie a spustenie produkčného zásobníka
docker compose -f docker-compose.prod.yml up -d --build

# Priebežné zobrazovanie protokolov
docker compose -f docker-compose.prod.yml logs -f

# Zastavenie a odstránenie zásobníka (zväzky sa zachovajú)
docker compose -f docker-compose.prod.yml down
```

Produkčný zásobník beží súbežne s vývojovým prostredím compose (používa odlišné názvy kontajnerov, porty a zväzky), takže môžete pokračovať v lokálnom vývoji, zatiaľ čo produkčné prostredie zostane spustené.

## Fázy Dockerfile

Repozitár obsahuje viacfázový Dockerfile (`Dockerfile`). K dispozícii sú tri fázy; vyberte správny `target` pre svoj prípad použitia.

| Fáza          | Základný obraz        | Účel                                                                                                                                                                                |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Nainštaluje závislosti (`npm ci --legacy-peer-deps`) a spustí `npm run build` (predvolene Turbopack — pozrite si nižšie Zdroje počas zostavovania)                                  |
| `runner-base` | `node:26-trixie-slim` | Produkčné behové prostredie so samostatným výstupom Next.js. **Neobsahuje žiadne CLI poskytovateľov.**                                                                              |
| `runner-cli`  | `runner-base`         | Pridáva `git`, `docker.io`, `docker-compose` a globálne CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Vyberte túto fázu pre agentné pracovné postupy.** |

Manuálne zostavenie konkrétneho cieľa:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Zdroje počas zostavovania

Náklady fázy `builder` riadia tri argumenty zostavenia. Používajú sa iba počas zostavovania —
`OMNIROUTE_MEMORY_MB` (nižšie) je samostatné nastavenie behového prostredia.

| Argument zostavenia         | Predvolená hodnota | Účinok                                                                                                          |
| --------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`                | Hodnota `0` namiesto toho zostavuje pomocou webpacku. Nižšia špičková spotreba pamäte, ale pomalšie zostavenie. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`             | Limit haldy V8 (`--max-old-space-size`) pre spustený proces `next build`.                                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`                | Nastavuje `CIRCLE_NODE_TOTAL`; Next z neho odvodí `workers = N - 1` pre zhromažďovanie údajov stránok.          |

`OMNIROUTE_BUILD_WORKERS` je hodnota, ktorú treba zvýšiť na výkonnom zostavovacom systéme, a zároveň prvá hodnota,
ktorú treba preveriť, keď zostavovanie s obmedzenými zdrojmi zlyhá **po** hlásení `✓ Compiled successfully`. Každý
pracovný proces údajov stránok je samostatný proces, rovnako ako samotný nadradený proces `next build`;
reprodukcia na aktívnom VPS (problém #7518) namerala špičkové RSS každého procesu na úrovni
~4,5 GB bez ohľadu na príznak haldy `NODE_OPTIONS` (Turbopack kompiluje v natívnej/Rust pamäti
mimo haldy V8). Predvolená hodnota `2` (→ 1 pracovný proces, celkovo 2
procesy) je dimenzovaná pre hostované spúšťače GitHubu so 16 GB / 4 vCPU, ktoré
používa publikačný kanál. Pri hodnote `8` (→ 7 pracovných procesov) sa tomuto spúšťaču minula pamäť a
buildkit ukončil krok s chybou `ResourceExhausted: ... cannot allocate memory`;
ani hodnota `3` (→ 2 pracovné procesy) sa nezmestila, keď sa RSS jednotlivých procesov meralo
priamo namiesto odhadovania. `tests/unit/docker-build-memory-budget.test.ts`
vykonáva výpočet na základe nameranej hodnoty a zlyhá, ak ktorékoľvek nastavenie
prekročí kapacitu spúšťača.

Turbopack kompiluje v natívnej pamäti Rust, ktorá sa nachádza **mimo** haldy V8, takže
`OMNIROUTE_BUILD_MEMORY_MB` ju neobmedzuje. Na hostiteľovi s pamäťovým limitom potom
OOM killer ukončí zostavovanie pomocou SIGKILL bez akéhokoľvek chybového textu — proces sa jednoducho
zastaví uprostred `Creating an optimized production build`, čo pôsobí skôr ako zamrznutie
než ako nedostatok pamäte. Ak má hostiteľ zostavovania obmedzené zdroje, zmeňte bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` je povolený, takže `next build` spúšťa nadradený **aj** pracovný
proces a každý z nich samostatne rešpektuje `OMNIROUTE_BUILD_MEMORY_MB`. Nastavte limit
kontajnera približne nad dvojnásobok tejto hodnoty, nie iba nad jej jednonásobok.

Merané v tomto strome (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limit kontajnera | Výsledok                                            |
| --------- | ---------------- | --------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | v oboch prípadoch potichu ukončené OOM killerom     |
| webpack   | 8 GiB            | pracovný proces zostavenia ukončený pomocou SIGKILL |
| webpack   | 12 GiB           | úspešné, špičková spotreba 11,1 GiB                 |

### Predvolené hodnoty behového prostredia

Predvolené hodnoty exportované fázou `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Správanie pamäte v Dockeri:

- Obraz nastavuje `OMNIROUTE_MEMORY_MB=1024` a odvodzuje z neho `NODE_OPTIONS=--max-old-space-size=1024`.
- Skutočný serverový proces spúšťa samostatný spúšťací mechanizmus, ktorý načíta `OMNIROUTE_MEMORY_MB` a pridá `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node používa poslednú zopakovanú hodnotu `--max-old-space-size`, takže nastavenie `OMNIROUTE_MEMORY_MB` riadi efektívny limit haldy v Dockeri.
- Keďže ju obraz vždy nastavuje, vlastná záložná hodnota spúšťacieho mechanizmu kalibrovaná podľa RAM sa v Dockeri nikdy nepoužije. Pre dané pracovné zaťaženie ju zvýšte explicitne (tabuľka nižšie). Hodnota `2048` je pre `/v1/responses` kódovacích agentov stále príliš nízka.

### RAM behového prostredia pre kódovacích agentov

Predvolená hodnota 1 GiB v Dockeri je minimom pre dashboard/ľahký chat, nie veľkosťou pre produkčné nasadenie. Dlhé telá požiadaviek `POST /v1/responses` (stovky správ, desiatky nástrojov) uchovávajú počas kompresie viacero grafov v pamäti. Dve prekrývajúce sa požiadavky s veľkosťou ~3 MiB / ~750-tisíc tokenov spôsobili ukončenie V8 pri **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) a takisto narazili na OOM cgroup s limitom 16 GiB. Pozrite si [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nastavte **cgroup `--memory` nad veľkosť haldy** — natívne buffery, SQLite a medzivýsledky kompresie sa nachádzajú mimo V8.

| Pracovné zaťaženie                          | `OMNIROUTE_MEMORY_MB`         | Kontajner / cgroup      | Poznámky                                                                                                                               |
| ------------------------------------------- | ----------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Ovládací panel, jeden nenáročný chat        | `1024` (predvolené pre image) | ≥2 GiB                  |                                                                                                                                        |
| Jeden kódovací agent (Claude/Codex/Grok)    | `8192`                        | ≥10 GiB                 | Typická jedna relácia `/v1/responses`                                                                                                  |
| Dve súbežné dlhé požiadavky `/v1/responses` | `10240`–`12288`               | ≥12–16 GiB              | Namerané prerušenie V8 pri halde s veľkosťou približne 12 GiB                                                                          |
| Tri alebo viac súbežných dlhých kontextov   | nespúšťajte v jednom procese  | serializovať / viac RAM | Predvolený limit prijímania náročných požiadaviek je 1 prebiehajúca požiadavka; jeho zvýšenie bez pridania RAM opäť spôsobí prerušenie |

`omniroute serve` pri spustení priamo na hardvéri kalibruje približne 35 % RAM (s obmedzením na rozsah `[512, 4096]`), keď premenná `OMNIROUTE_MEMORY_MB` **nie je nastavená**. Docker vždy nastavuje hodnotu `1024`, takže v oficiálnom image sa táto kalibrácia nikdy nevykoná.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritické premenné prostredia

Okrem predvolených hodnôt zdokumentovaných v súbore [ENVIRONMENT.md](../reference/ENVIRONMENT.md) sú pri spúšťaní v prostredí Docker najdôležitejšie nasledujúce premenné:

| Premenná                      | Účel                                                                                                                                                                                                                                                                                                | Predvolená hodnota          |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Zdieľaný tajný kľúč pre most WebSocket. **Vyžaduje sa v produkčnom prostredí** — nastavte ho na silný náhodný reťazec.                                                                                                                                                                              | nenastavené (musí sa zadať) |
| `REDIS_URL`                   | Pripojovací reťazec pre obmedzovač frekvencie požiadaviek/backend vyrovnávacej pamäte                                                                                                                                                                                                               | `redis://redis:6379`        |
| `REDIS_PORT`                  | Port hostiteľa pre pribalený kontajner Redis                                                                                                                                                                                                                                                        | `6379`                      |
| `REDIS_BIND_HOST`             | Rozhranie hostiteľa, na ktorom je publikovaný port pribaleného Redis (spätná slučka, pokiaľ nepridáte AUTH)                                                                                                                                                                                         | `127.0.0.1`                 |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Cesta na hostiteľovi pripojená k profilu `cli` v umiestnení `/workspace/omniroute` pre pracovné postupy samočinnej aktualizácie                                                                                                                                                                     | `.` (aktuálny adresár)      |
| `OMNIROUTE_MEMORY_MB`         | Maximálna veľkosť haldy Node za behu pre samostatný server Docker; prepíše predvolenú hodnotu obrazu uvedenú vyššie. Agenti na programovanie: `8192`+ (pozrite si [RAM za behu](#runtime-ram-for-coding-agents)).                                                                                   | `1024`                      |
| `DASHBOARD_PORT` / `API_PORT` | Prepíše zverejnené porty pre ovládací panel (20128) a API (20129)                                                                                                                                                                                                                                   | `20128` / `20129`           |
| `APP_BIND_HOST`               | Rozhranie hostiteľa, na ktorom docker-compose publikuje porty ovládacieho panela/API/živého WS. Pri `REQUIRE_API_KEY=false` (predvolená hodnota) vystaví `0.0.0.0` anonymný proxy server `/v1` do siete LAN — rozsah rozšírte iba s `REQUIRE_API_KEY=true` alebo reverzným proxy serverom pred ním. | `127.0.0.1`                 |
| `CLIPROXY_BIND_HOST`          | Rozhranie hostiteľa, na ktorom docker-compose publikuje pomocný kontajner `cliproxyapi` — jeho dátový zväzok uchováva prihlasovacie údaje poskytovateľa.                                                                                                                                            | `127.0.0.1`                 |
| `OMNIROUTE_PLUGINS_DIR`       | Adresár, ktorý skener zásuvných modulov za behu prehľadáva a do ktorého ich inštaluje. Nastavte ho, keď sú zásuvné moduly pripojené pomocou bind mount: predvolená hodnota sa riadi premennou `HOME`, ktorú obraz nemusí exportovať.                                                                | `~/.omniroute/plugins`      |
| `OMNIROUTE_BASE_PATH`         | Podcesta URL, keď je aplikácia publikovaná za reverzným proxy serverom (napr. `/omniroute`)                                                                                                                                                                                                         | _(prázdne = koreň)_         |
| `NEXT_PUBLIC_BASE_URL`        | Verejný pôvod prehliadača vrátane podcesty (napr. `https://host/omniroute`)                                                                                                                                                                                                                         | nenastavené                 |
| `PROD_DASHBOARD_PORT`         | Port ovládacieho panela na strane hostiteľa pre `docker-compose.prod.yml`                                                                                                                                                                                                                           | `20130`                     |
| `CLIPROXYAPI_PORT`            | Port na strane hostiteľa pre pomocný kontajner `cliproxyapi`                                                                                                                                                                                                                                        | `8317`                      |

## Reverzný proxy server na podceste (Traefik / nginx)

Hodnota `basePath` systému Next.js sa skompiluje do samostatného balíka. OmniRoute zaznamená vloženú
hodnotu do kontrolného súboru v koreňovom adresári aplikácie (zapíše sa počas `npm run build`; číta ho
`scripts/docker/ensure-docker-base-path.mjs`) a pri spustení kontajnera ju porovná
s `OMNIROUTE_BASE_PATH`. Keď sa hodnoty líšia a obraz bol zostavený pre koreň domény,
vstupný bod prepíše manifesty samostatného balíka, vložené literály
`basePath`/`assetPrefix` (Next 16 generuje adresy URL prostriedkov SSR výhradne z
`assetPrefix` — nástroj na úpravu doň zrkadlí podcestu), vložené adresy URL prostriedkov
`/_next/static` (manifesty klientskych referencií, importy médií, predgenerované
chybové stránky) a klientsku náhradu `process.env` pred spustením
`node dev/run-standalone.mjs`.

### Zostavenie pomocou Compose (odporúčané)

Nastavte obe premenné v súbore `.env` a potom obraz znova zostavte, aby sa nastavenia obrazu a prostredia behu zhodovali:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Súbor `docker-compose.yml` odovzdáva `OMNIROUTE_BASE_PATH` ako argument zostavenia Dockeru aj ako
premennú prostredia behu.

### Vopred zostavený koreňový obraz + podcesta počas behu

Publikované obrazy `diegosouzapw/omniroute:*` sú zostavené pre koreň domény. Napriek tomu môžete
nastaviť `OMNIROUTE_BASE_PATH` počas behu; kontajner pri spustení jednorazovo upraví balík.
Použite ho spolu so zodpovedajúcim verejným pôvodom:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Nakonfigurujte reverzný proxy server tak, aby odovzdával **úplnú** externú cestu (neodstraňujte
predponu). Traefik by mal smerovať `PathPrefix(`/omniroute`)` do kontajnera bez
`StripPrefix`, aby Next.js prijímal `/omniroute/...` a poskytoval prostriedky z
`/omniroute/_next/...`.

Kontrola stavu Dockeru testuje jednoduchý koncový bod životného cyklu `/healthz` s predponou
aktívnej hodnoty `OMNIROUTE_BASE_PATH`. Koncový bod `/api/monitoring/health` zostáva dostupný na
diagnostiku vykonávanú používateľmi alebo ovládacími panelmi; ak chcete kontrolu HEALTHCHECK kontajnera znova nasmerovať na tento bod (napríklad
na vynútenie hĺbkovej kontroly stavu), nastavte `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Táto cesta vykonáva **hĺbkovú** kontrolu (databáza + súhrn monitorovania) — je vhodná pre
zriedkavý Docker `HEALTHCHECK`, ak sa ju rozhodnete znova zapnúť, ale **nie** pre intervaly
Kubernetes `livenessProbe`.

Pre orchestrátory (Kubernetes, Nomad atď.):

| Sonda              | Uprednostnite                                                             | Vyhnite sa                                                                         |
| ------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Životaschopnosť    | HTTP `GET /livez` alebo TCP na hlavnom porte (`PORT`, predvolene `20128`) | `/api/monitoring/health` ako kontrolu životaschopnosti                             |
| Pripravenosť       | HTTP `GET /healthz`                                                       | Krátkym časovým limitom, ktoré považujú zaneprázdnenú slučku udalostí za nefunkčnú |
| Hĺbková / blackbox | `/api/monitoring/health`                                                  | —                                                                                  |

`/healthz` hlási stav životného cyklu procesu (`ok` / `starting` / `stopping`). `/livez`
kontroluje iba to, či je proces spustený (vráti stav 200 vždy, keď sa obslužná rutina môže spustiť; nečaká na
pripravenosť). Obe kontroly sa stále vykonávajú v rovnakej slučke udalostí Node ako spracovanie požiadaviek, takže
výpočtovo náročná práca s katalógom alebo kompresiou ich môže oneskoriť — zaneprázdnený ≠ nefunkčný. Ak vyprší časový limit sond HTTP, uprednostnite
kontrolu životaschopnosti cez TCP. Úplné pokyny ku kontrolám:
[Sprievodca monitorovaním — odporúčania pre sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddy (automatické TLS pre HTTPS)

OmniRoute možno bezpečne sprístupniť pomocou automatického poskytovania SSL certifikátov v Caddy. Uistite sa, že záznam DNS typu A vašej domény smeruje na IP adresu vášho servera.

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
      # Pôvod viditeľný pre prehliadač, používaný pre spätné volania OAuth, odkazy ovládacieho panela a generované verejné adresy URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interná adresa URL medzi servermi pre naplánované úlohy a požiadavky na seba.
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
`NEXT_PUBLIC_BASE_URL` ako kanonický verejný pôvod pre spätné volania OAuth a generované verejné
odkazy; autentifikované zápisy z ovládacieho panela používajú požiadavky rovnakého pôvodu spolu s ochranou CSRF
naviazanou na reláciu. Premennú `OMNIROUTE_TRUST_PROXY` povoľte iba pri pokročilých nasadeniach, v ktorých zámerne
chcete, aby OmniRoute odvodzoval verejný pôvod z dôveryhodných preposlaných hlavičiek namiesto explicitnej
konfigurácie.

## Rýchly tunel Cloudflare

Podpora ovládacieho panela pre nasadenia Docker zahŕňa **rýchly tunel Cloudflare** na jedno kliknutie v časti `Dashboard → Endpoints`. Pri prvom povolení sa `cloudflared` stiahne iba v prípade potreby, spustí sa dočasný tunel k vášmu aktuálnemu koncovému bodu `/v1` a generovaná adresa URL `https://*.trycloudflare.com/v1` sa zobrazí priamo pod vašou bežnou verejnou adresou URL.

Panely tunelov koncových bodov (Cloudflare, Tailscale, ngrok) možno zobraziť alebo skryť v časti `Settings → Appearance` bez zmeny stavu aktívneho tunela.

### Poznámky k tunelom

- Adresy URL rýchlych tunelov sú dočasné a po každom reštarte sa zmenia.
- Rýchle tunely sa po reštarte OmniRoute alebo kontajnera automaticky neobnovia. V prípade potreby ich znova povoľte z ovládacieho panela.
- Spravovaná inštalácia momentálne podporuje Linux, macOS a Windows na architektúrach `x64` / `arm64`.
- Spravované rýchle tunely predvolene používajú prenos HTTP/2, aby sa predišlo rušivým upozorneniam QUIC na vyrovnávaciu pamäť UDP v obmedzených kontajnerových prostrediach. Ak chcete použiť iný prenos, nastavte `CLOUDFLARED_PROTOCOL=quic` alebo `auto`.
- Obrazy Docker obsahujú koreňové certifikáty systémových certifikačných autorít a odovzdávajú ich spravovanému procesu `cloudflared`, čím sa predchádza zlyhaniam dôveryhodnosti TLS pri inicializácii tunela v kontajneri.
- Ak chcete, aby OmniRoute namiesto stiahnutia použil existujúci binárny súbor, nastavte `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Značky obrazov

| Obraz                    | Značka   | Veľkosť | Popis                                                             |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Najvyššia **publikovaná** stabilná verzia SemVer (nie git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Pre GitOps pripnite túto triedu značky                            |

Natívny manifest pre viacero platforiem: `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automaticky vyberie zodpovedajúcu architektúru; ak potrebujete na hostiteľoch ARM vynútiť emuláciu AMD64, zadajte `--platform linux/amd64`.

### Kanály vydaní

OmniRoute publikuje samostatné kanály Docker pre stabilné vydania, testovanie aktívnej vetvy vydania a vývojové zostavy.

| Kanál                           | Zdroj                                            | Premenlivosť                              | Odporúčané použitie                                                                                                      |
| ------------------------------- | ------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Podpísané/verzionované vydanie                   | Nemenné                                   | Produkčné nasadenia, ktoré pripínajú presné vydanie                                                                      |
| `:latest` / `:latest-web`       | Najvyššia **publikovaná** stabilná verzia SemVer | Premenlivý stabilný ukazovateľ            | Sleduje stabilné vydania **po** úlohe publikovania SemVer — **nesleduje** vetvu `main` ani nevydané revízie `release/v*` |
| `:next` / `:next-web`           | Aktuálna predvolená vetva `release/v*`           | Premenlivý ukazovateľ predbežného vydania | Testovanie opráv, ktoré boli začlenené do aktívnej vetvy vydania, ale zatiaľ nie sú súčasťou stabilného vydania          |
| `:main` / `:main-web`           | Vetva `main`                                     | Premenlivý vývojový ukazovateľ            | Iba na vývojové a integračné testovanie                                                                                  |

#### Používanie kanála predbežného vydania

Kanál `next` sa znova zostaví pri každom odoslaní zmien do aktuálnej predvolenej vetvy `release/v*` a publikuje sa pre AMD64 aj ARM64. Staršie vetvy údržby ho nemôžu prepísať. Kanál poskytuje obraz, ktorý možno stiahnuť, pre opravy začlenené do aktívnej vetvy vydania ešte pred vytvorením ďalšej stabilnej značky.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pre Docker Compose prepíšte značku obrazu používanú vybraným profilom a potom stiahnite a znova vytvorte službu:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpečnosť a návrat na predchádzajúcu verziu

`next` je plávajúci kanál predbežného vydania. Môže sa zmeniť pri každom odoslaní zmien do aktívnej vetvy vydania a **nie je podporovaný na produkčné použitie**. Pri vyhodnocovaní konkrétnej zostavy pripnite súhrn obrazu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pred testovaním zálohujte dátový zväzok OmniRoute alebo dátový adresár pripojený pomocou bind mountu. Ak chcete vykonať návrat k predchádzajúcej verzii, obnovte predtým používanú stabilnú verziu alebo digest a znova vytvorte kontajner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Zostavenie z vydávacej vetvy nikdy nemôže presunúť `latest`; stabilný ukazovateľ môže aktualizovať iba oprávnená stabilná sémantická verzia. Obrazy `next` si zachovávajú kontrolu obrazu vydania a blokovaciu bránu pre zraniteľnosti so závažnosťou CRITICAL.

**`latest` nie je zárukou aktuálnosti voči systému git.** Zlúčené opravy vo vetve `main` alebo v aktívnej vetve `release/v*` sa v `:latest` **nenachádzajú**, kým sa nepublikuje stabilný obraz SemVer a úloha publikovania neaktualizuje `:latest` (na rovnaký digest ako daná verzia SemVer). Ak sa zdá, že `latest` je neaktuálny, zatiaľ čo GitHub už opravu zobrazuje, na otestovanie vydávacej vetvy stiahnite `:next` alebo počkajte na značku SemVer.

| Čo chcete                                                                               | Použite                                 |
| --------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps/produkčné prostredie, ktoré sa nesmie samovoľne meniť                            | Pripnite `:X.Y.Z` (alebo digest obrazu) |
| Sledovať publikované stabilné verzie a akceptovať opätovné vytvorenie pri každom vydaní | `:latest`                               |
| Testovať nevydané commity vetvy `release/v*`                                            | `:next` (nie na produkčné použitie)     |
| Testovať `main`                                                                         | `:main` (nie na produkčné použitie)     |

## Dostupnosť: predvolená SQLite podporuje iba jednu repliku

Štandardné nasadenie OmniRoute v Docker / Kubernetes predstavuje **jeden proces Node + jeden zapisovač SQLite**. Vysoká dostupnosť v tejto topológii **nie je podporovaná**.

| Obmedzenie                                                | Dôsledok                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jeden zapisovač                                           | **Nespúšťajte** viacero replík nad tým istým súborom SQLite. Databáza by sa poškodila.                                                                                                                                                                                                                                                          |
| Opätovné vytvorenie / reštart / ukončenie cez HEALTHCHECK | **Úplný výpadok** prebiehajúcich SSE, relácií ovládacieho panela a stavu v pamäti. Všetci pripojení klienti sa odpoja. Nové požiadavky počas obdobia bez koncových bodov dostanú od reverzného proxy servera odpoveď **`502 Bad Gateway: Unknown error`**, nie JSON OmniRoute — klienti ju nedokážu odlíšiť od zlyhania poskytovateľa (#11015). |
| Rovnaká slučka udalostí ako `/healthz`                    | Vyťažená aktualizácia katalógu alebo kompresie môže oneskoriť sondy; krátky časový limit potom reštartuje **jedinú** repliku.                                                                                                                                                                                                                   |

**Matica sond** (pozrite si aj [odporúčania pre sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda              | Cieľ                                                               | Nepoužívajte                                                               |
| ------------------ | ------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Životnosť          | TCP na `PORT` (predvolene `20128`) alebo nenáročné HTTP `/healthz` | `/api/monitoring/health`                                                   |
| Pripravenosť       | HTTP `GET /healthz`                                                | Krátke časové limity, ktoré považujú vyťaženú slučku udalostí za nefunkčnú |
| Hĺbková / pre ľudí | `/api/monitoring/health`                                           | Automatizovanú kontrolu životnosti kubeletu                                |

**Aktualizácie:** počítajte s ukončením každej relácie. Ak môžete, odstavte klientov; s predvolenou SQLite nie je priebežná aktualizácia možná. Nastavenie Compose `restart: unless-stopped` spolu s Docker `HEALTHCHECK` tiež nahradí jediný proces, keď sa kontajner dostane do stavu Unhealthy — s rovnakým rozsahom následkov.

Ukážka konfigurácie Kubernetes pre **jednu repliku** (vyžaduje sa Recreate; nezvyšujte hodnotu `replicas` nad jedným súborom SQLite):

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

Oneskorenie `preStop` umožní kube odstrániť koncové body služby pred SIGTERM, takže **nová** prevádzka prestane smerovať na ukončovaný proces. Prebiehajúce SSE `/v1/responses` sa dokončia najviac do času `SHUTDOWN_TIMEOUT_MS` (predvolene 30 s) prostredníctvom robustných vstupných prenájmov (#11015). Nové požiadavky, ktoré sa napriek tomu dostanú k procesu, dostanú odpoveď `503` + `Retry-After: 5`. Obdobie bez koncových bodov pri Recreate, kým náhrada nedosiahne stav Ready, zostáva úplným výpadkom — ide o vlastnosť topológie SQLite, nie o nesprávnu konfiguráciu sondy.

Externý Postgres / vysoká dostupnosť s viacerými zapisovačmi **nie je** zdokumentovanou štandardnou cestou. Ak potrebujete vysokú dostupnosť, ponechajte jednu repliku alebo použite topológiu, ktorú projekt samostatne otestoval a zdokumentoval. Práca na podpore Postgres/MySQL prebieha v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kým nebude táto podpora vydaná, jediným podporovaným spôsobom zvýšenia kapacity pre **veľké** požiadavky `/v1/responses` je použitie N nezávislých procesov (ďalšia časť), nie `replicas > 1` nad jedným zväzkom.

## Horizontálne škálovanie: N nezávislých procesov

Jeden proces Node predstavuje **jednu haldu V8**. Dve prekrývajúce sa požiadavky kódovacieho agenta `POST /v1/responses` (RTK + Caveman) s veľkosťou ~3 MiB / ~750 000 tokenov ukončia túto haldu pri ~12 Gi (`FATAL ERROR: Reached heap limit`) a môžu spôsobiť OOM v cgroup s veľkosťou 16 Gi. Pozrite si [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Toto meranie je upozornením týkajúcim sa **pamäťového rozpočtu**, nie pevne stanoveným produktovým maximom dvoch súbežných dlhých požiadaviek `/v1/responses`. Prijímanie náročných chatových požiadaviek je riadené automaticky odvodeným rozpočtom bajtov na vstupe (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), ktorého veľkosť vychádza z rovnakého limitu V8/cgroup — jeho zvýšenie prepísaním hodnoty (alebo nastavenie staršieho limitu počtu požiadaviek `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) v už nadimenzovanom procese znova spôsobí ukončenie. Malé chaty, `/healthz`, `/v1/models` a MCP **nie sú** zahrnuté do tohto limitu.

### Jeden proces: viac než dve dlhé požiadavky `/v1/responses`

**Zdravý** proces (halda pod hodnotou `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, predvolene `0.75`) **môže** spúšťať viac než dve súbežné dlhé požiadavky `POST /v1/responses`, ak má rozpočet bajtov spracovávaných požiadaviek pre celý proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) stále dostatočnú rezervu. Telá s veľkosťou najmenej `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (predvolene 256 KiB) získavajú rovnaký prenájom pre náročné požiadavky ako štrukturálne náročné požiadavky a používajú rovnaký únikový mechanizmus `tryAcquireHealthyHeadroom` z [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desiatky súbežných dlhých klientov SSE (prevádzkovatelia často potrebujú 40–50) sú otázkou **pamäťového rozpočtu** — nadimenzujte haldu, primárne/doplnkové sloty a `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nie pevného produktového limitu „max. 2“. Proces s preťaženou haldou bude požiadavky naďalej odmietať pomocou opakovateľnej chyby `503`, aby sa problém #7849 nevrátil.

Ak chcete **znásobiť počet háld** (nezávislé old-space oblasti V8) **už dnes**:

| Robte                                                                                                                                                                                                          | Nerobte                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Spustite **N kontajnerov/podov**, každý s **vlastným** `DATA_DIR` / zväzkom                                                                                                                                    | Nenastavujte `replicas > 1` pre jeden súbor SQLite                          |
| Dimenzujte náročné spracovávané požiadavky + doplnkovú rezervu pre zdravý stav podľa haldy / rozpočtu spracovávaných bajtov; 1–2 je konzervatívna predvolená hodnota podľa #7849, nie pevné produktové maximum | Neprideľujte jednému procesu 8× viac RAM a neobmedzený limit počtu          |
| Voliteľne: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pre **zdieľané počítadlá kvót**                                                                                                                | Nepovažujte Redis za zdieľaný SQLite — nie je ním                           |
| Skopírujte tajné kľúče poskytovateľov do každej inštancie (alebo akceptujte oddelené ovládacie panely)                                                                                                         | Neočakávajte jeden ovládací panel / jeden denník volaní naprieč inštanciami |
| Pred ne umiestnite ľubovoľný nástroj na vyvažovanie záťaže; postačí afinita podľa kľúča API alebo relácie                                                                                                      | Nevyžadujte middleware konkrétneho dodávateľa zohľadňujúci veľkosť          |

Hardvér: počet súbežných dlhých požiadaviek `/v1/responses` na jednu inštanciu je otázkou **pamäťového rozpočtu** (halda + spracovávané bajty / #10110). `N` nezávislých adresárov `DATA_DIR` stále znásobuje počet háld: RAM hostiteľa musí pokryť `N × cgroup`, nie „jeden pod s 16 Gi a N=8“. Nikdy nepoužívajte `replicas > 1` nad jedným súborom SQLite.

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

Hustota v rámci procesu (kompresia mimo izolovaného vlákna HTTP) je riešená v [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logický klaster so zdieľaným trvalým stavom je riešený v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Dôležité poznámky

- **Režim SQLite WAL:** Príkazu `docker stop` by sa malo umožniť dokončenie, aby OmniRoute mohol zapísať najnovšie zmeny späť do `storage.sqlite` prostredníctvom kontrolného bodu. Pribalené súbory Compose už nastavujú 40-sekundovú dobu odkladu pred zastavením. Ak obraz spúšťate priamo, zachovajte `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nastavte na `true`, ak sú pravidelné zálohy a zálohy pred zápisom spravované externe. Migrácie existujúcej databázy stále vyžadujú vlastnú trvalú bezpečnostnú snímku a ochranu proti hromadnej migrácii.
- **Trvalé uloženie údajov:** Vždy pripojte zväzok k `/app/data`, aby sa databáza, kľúče a konfigurácie zachovali aj po reštartoch kontajnera.
- **Konfigurácia portu:** Ak chcete zmeniť predvolený port `20128`, prepíšte premennú prostredia `PORT`.

## Pozrite si tiež

- [Sprievodca nasadením na VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Nastavenie VM + nginx + Cloudflare
- [Sprievodca nasadením na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Nasadenie na Fly.io
- [Konfigurácia prostredia](../reference/ENVIRONMENT.md) — Kompletná referencia k súboru `.env`
