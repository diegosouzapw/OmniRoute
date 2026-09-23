# 🐳 Docker Guide — OmniRoute (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kompletní referenční dokumentace k nasazení pomocí Dockeru. Pro rychlý začátek si přečtěte [sekci README věnovanou Dockeru](../README.md#-docker).

## Obsah

- [Rychlé spuštění](#quick-run)
- [Se souborem prostředí](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupné profily](#available-profiles)
- [Konfigurace hostitelských nástrojů CLI při běhu OmniRoute v Dockeru](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Doprovodný kontejner Redis](#redis-sidecar)
- [Produkční konfigurace Compose](#production-compose)
- [Fáze Dockerfile](#dockerfile-stages)
- [Kritické proměnné prostředí](#critical-environment-variables)
- [Docker Compose s Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Rychlý tunel Cloudflare](#cloudflare-quick-tunnel)
- [Značky obrazů](#image-tags)
- [Dostupnost: výchozí SQLite podporuje jedinou repliku](#availability-default-sqlite-is-single-replica)
- [Důležité poznámky](#important-notes)

---

## Rychlé spuštění

> **Vlastní hostování jediným příkazem?** Viz
> [Průvodce vlastním hostováním](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publikovaný obraz +
> Redis, pouze na loopback rozhraní, bez volby profilu). Níže uvedené rychlé spuštění
> představuje variantu s jedním kontejnerem pro uživatele, kteří již provozují Redis jinde.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Se souborem prostředí

```bash
# Nejprve zkopírujte a upravte .env
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
# Základní profil (bez nástrojů CLI)
docker compose --profile base up -d

# Profil CLI (integrované Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Profil hostitele (primárně pro Linux; připojuje binární soubory CLI hostitele pouze pro čtení)
docker compose --profile host up -d

# Webový profil (Chromium/Playwright pro poskytovatele webových relací)
docker compose --profile web up -d

# Kombinace CLI + doprovodného kontejneru CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupné profily

OmniRoute obsahuje profily Compose pro hlavní způsoby nasazení. Vyberte ten, který odpovídá vašemu prostředí.

| Profil           | Služba           | Kdy použít                                                                                                                                                       | Příkaz                                       |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (výchozí) | `omniroute-base` | Server bez grafického rozhraní / minimální běhové prostředí, bez přibalených CLI poskytovatelů                                                                   | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Agentní pracovní postupy, které volají `omniroute providers/setup/doctor`, a přibalené CLI (Codex, Claude Code, Droid, OpenClaw)                                 | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Hostitelé se systémem Linux, kteří chtějí přístup podobný `network_mode` k CLI hostitele připojením `~/.local/bin`, `~/.codex`, `~/.claude` atd. pouze pro čtení | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Spuštění doprovodného kontejneru [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na portu `8317` pro proxy přístup k nadřazeným CLI                  | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | Poskytovatelé webových relací, kteří vyžadují prohlížeč: `gemini-web`, `claude-web`, `claude-turnstile` (sestaví `runner-web`, Chromium je součástí)             | `docker compose --profile web up -d`         |

> Lze kombinovat více profilů: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurace hostitelských nástrojů CLI, když OmniRoute běží v Dockeru

`omniroute setup-codex`, `setup-claude`, `config set <tool>` a tlačítko
**Uložit konfiguraci** na řídicím panelu zapisují soubory jako `~/.codex/*.config.toml`. Tyto cesty
mají význam pouze na počítači, na kterém CLI skutečně běží. Pokud je spustíte uvnitř
kontejneru, zápis skončí v domovském adresáři kontejneru (`/home/node` —
obraz běží jako `USER node`), odkud jej žádné hostitelské CLI nikdy nenačte a kde bude
zahozen v okamžiku, kdy bude kontejner znovu vytvořen.

OmniRoute tuto situaci rozpozná a místo nahlášení nepoužitelného úspěchu
zápis odmítne a zobrazí pokyny: CLI skončí s kódem `2` a API odpoví stavem `422`
s `containerEphemeralTarget: true`.

### Doporučeno: spusťte CLI na hostiteli a OmniRoute v Dockeru

Kontejner poskytuje API; CLI konfiguruje vaše hostitelské nástroje.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nasměruje CLI na kontejner
omniroute setup-codex                      # zapíše skutečný adresář ~/.codex na vašem hostiteli
```

Toto je správná volba, pokud Codex, Claude Code, Cursor nebo podobné nástroje běží na vašem
notebooku — což je obvyklé uspořádání.

### Alternativa: připojte konfigurační adresáře hostitele pomocí bind mountu (profil `host`)

Pokud chcete, aby kontejner sám zapisoval konfiguraci na hostitele, připojte do něj
příslušné adresáře a nastavte `CLI_CONFIG_HOME` na kořen připojení. Profil `host`
to již dělá:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Důvěryhodnost cesty zajišťuje právě bind mount: OmniRoute čte
`/proc/self/mountinfo` a povoluje zápisy do připojených cest (a do adresářů,
jejichž potomci jsou připojeními, což přesně odpovídá výše uvedené struktuře `/host-home`),
zatímco zápisy do nepřipojených cest nadále odmítá.

### Nouzová možnost: nakonfigurujte CLI uvnitř kontejneru (používejte střídmě)

Pokud CLI skutečně existují uvnitř kontejneru (profil `cli`), je zápis
záměrný. Předejte `--allow-container-write` libovolnému příkazu `setup-*` nebo nastavte
pro server `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Zápis proběhne
s upozorněním, že nepřežije zánik kontejneru.

> **Bezpečnostní upozornění — profil `cli` + připojení `docker.sock`.**
> Profil `cli` připojuje `/var/run/docker.sock` pomocí bind mountu, aby automatický
> aktualizátor uvnitř kontejneru mohl znovu vytvořit celou sestavu prostřednictvím hostitelského démona
> (`src/lib/system/autoUpdate.ts` zjišťuje přítomnost tohoto socketu a v jeho
> nepřítomnosti cestu pro Docker přeskočí). Tento socket představuje **hranici důvěry s oprávněními
> roota hostitele**: cokoli, co k němu má přístup, ovládá hostitelského démona Dockeru jako
> root — může vytvořit, prohlížet, zastavit a odstranit libovolný kontejner na hostiteli.
> Důsledky:
>
> 1. **Nikdy nevystavujte port profilu `cli` do sítě.** Zpřístupněte
>    jej na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupný z LAN promění jakékoli vzdálené spuštění kódu na úrovni řídicího panelu
>    v úplné napadení hostitele.
> 2. **Do profilu `cli` nepřipojujte žádné další hostitelské adresáře.**
>    Socket Dockeru v kombinaci s jakýmkoli dalším připojením poskytne kontejneru plný
>    přístup pro čtení i zápis k vašemu souborovému systému a konfiguraci hostitele. Pokud potřebujete,
>    aby nástroj viděl projekt, spusťte jej lokálně pomocí binárního souboru CLI — nepřipojujte jej
>    do kontejneru `cli`.
>
> Pokud automatické aktualizace uvnitř kontejneru nepotřebujete, profil `cli` nezapínejte
> (`COMPOSE_PROFILES=core,redis` nebo kratší varianta). Ostatní profily
> socket Dockeru nepřipojují.
>
> Související model hrozeb pro MITM najdete v `docs/security/MITM-TPROXY-DECRYPT.md` (git; nekompiluje se do `/docs`)
> a řetězec původu binárních souborů `codex`/`claude-code`/`droid`/`openclaw`
> je popsán v `docs/security/SUPPLY_CHAIN.md`.

## Redis Sidecar

OmniRoute využívá Redis jako úložiště pro distribuované omezování četnosti požadavků a sdílenou mezipaměť. Služba `redis` je v souboru `docker-compose.yml` definována **vždy** (není omezena žádným profilem) a spouští se společně s libovolným dalším profilem.

| Podrobnost                  | Hodnota                                 |
| --------------------------- | --------------------------------------- |
| Image                       | `redis:7-alpine`                        |
| Název kontejneru            | `omniroute-redis`                       |
| Interní port                | `6379`                                  |
| Port hostitele (přepsání)   | `REDIS_PORT` (výchozí hodnota `6379`)   |
| Adresa hostitele (přepsání) | `REDIS_BIND_HOST` (výchozí `127.0.0.1`) |
| Svazek                      | `omniroute-redis-data` → `/data`        |
| Kontrola stavu              | `redis-cli ping` (interval 10 s)        |

Související proměnné prostředí:

- `REDIS_URL` — připojovací řetězec vložený do aplikace (ve výchozím nastavení `redis://redis:6379`).
- `REDIS_PORT` — mapování portu kontejneru Redis na straně hostitele.
- `REDIS_BIND_HOST` — rozhraní hostitele, na kterém je port zveřejněn. Výchozí hodnota je `127.0.0.1`.

> **Proč se ve výchozím nastavení používá loopback:** sidecar běží bez `requirepass` a aplikační
> kontejnery k němu přistupují přes síť compose (`redis:6379`) — zveřejněný port slouží
> pouze pro nástroje spuštěné na hostiteli (`redis-cli`, lokální `npm run dev`). Zveřejnění na
> `0.0.0.0` by zpřístupnilo Redis bez ověřování všem hostitelům ve vaší síti LAN. Pokud nastavíte
> `REDIS_BIND_HOST=0.0.0.0`, přidejte ke službě do položky `command:` také `--requirepass`.

**Vypnutí služby Redis** se nedoporučuje (omezovač četnosti požadavků přejde na méně kvalitní záložní řešení v paměti). Pokud je to nutné, buď odstraňte/zakomentujte blok služby `redis:` v souboru `docker-compose.yml`, nebo ji škálujte na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkční Compose

Pro izolovaný produkční snímek běžící souběžně s vývojovým prostředím použijte `docker-compose.prod.yml`.

| Podrobnost                   | Hodnota                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| Soubor                       | `docker-compose.prod.yml`                                                          |
| Výchozí port řídicího panelu | `PROD_DASHBOARD_PORT=20130` (mapován na interní `${DASHBOARD_PORT:-20128}`)        |
| Výchozí port API             | `PROD_API_PORT=20131`                                                              |
| Image                        | `omniroute:prod` (sestavený z cíle `runner-cli`)                                   |
| Kontejner Redis              | `omniroute-redis-prod` (`redis:8.6.2`, vyhrazený svazek `redis-prod-data`)         |
| Datový svazek                | `omniroute-prod-data` (pojmenovaný, zachovaný při opakovaném sestavení)            |
| Kontroly stavu               | `node healthcheck.mjs` + `redis-cli ping`, přičemž `depends_on` čeká na stav Redis |

Použití:

```bash
# Sestavení a spuštění produkčního stacku
docker compose -f docker-compose.prod.yml up -d --build

# Průběžné sledování protokolů
docker compose -f docker-compose.prod.yml logs -f

# Ukončení (svazky zůstanou zachovány)
docker compose -f docker-compose.prod.yml down
```

Produkční stack běží souběžně s vývojovým compose (používá jiné názvy kontejnerů, porty a svazky), takže můžete pokračovat v lokálním vývoji, zatímco produkční prostředí zůstává spuštěné.

## Fáze Dockerfile

Repozitář obsahuje vícefázový Dockerfile (`Dockerfile`). K dispozici jsou čtyři fáze; vyberte správný `target` pro svůj případ použití.

| Fáze          | Základní image        | Účel                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Nainstaluje závislosti (`npm ci --legacy-peer-deps`) a spustí `npm run build` (ve výchozím nastavení pomocí Turbopacku — viz níže Zdroje při sestavení)                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Produkční běhové prostředí se samostatným výstupem Next.js. **Neobsahuje žádná CLI poskytovatelů.**                                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Přidává `git`, `docker.io`, `docker-compose` a globální CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Tuto variantu vyberte pro agentní pracovní postupy.**                                                                                                             |
| `runner-web`  | `runner-base`         | Přidává Playwright a prohlížeč Chromium (`--with-deps`) pro poskytovatele webových relací: `gemini-web`, `claude-web`, `claude-turnstile`. **Tuto variantu vyberte, pokud tyto poskytovatele používáte** — obyčejný image bez ní při požadavku selže (viz poznámka k `-web` v části Kanály vydání). |

Ruční sestavení konkrétního cíle:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Zdroje při sestavení

Nároky fáze `builder` řídí tři argumenty sestavení. Platí pouze při sestavení —
`OMNIROUTE_MEMORY_MB` (níže) je samostatné nastavení běhového prostředí.

| Argument sestavení          | Výchozí hodnota | Účinek                                                                                      |
| --------------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`             | Hodnota `0` sestavuje pomocí webpacku. Nižší špičková spotřeba paměti, ale pomalejší běh.   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`          | Limit haldy V8 (`--max-old-space-size`) pro spuštěný proces `next build`.                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`             | Nastavuje `CIRCLE_NODE_TOTAL`; Next odvodí `workers = N - 1` pro shromažďování dat stránek. |

`OMNIROUTE_BUILD_WORKERS` je parametr, který je vhodné zvýšit na výkonném sestavovacím stroji, a zároveň první podezřelý, když sestavení s omezenými prostředky selže **po** hlášení `✓ Compiled successfully`. Každý pracovní proces pro data stránek je samostatným procesem, stejně jako samotný nadřazený proces `next build`; reprodukce na živém VPS (issue #7518) naměřila špičkovou RSS každého procesu na úrovni ~4,5 GB bez ohledu na příznak haldy `NODE_OPTIONS` (Turbopack kompiluje v nativní paměti Rustu mimo haldu V8). Výchozí hodnota `2` (→ 1 pracovní proces, celkem 2 procesy) je dimenzována pro běhová prostředí hostovaná službou GitHub s 16 GB / 4 vCPU, která používá publikační pipeline. Při hodnotě `8` (→ 7 pracovních procesů) tomuto běhovému prostředí došla paměť a buildkit ukončil krok chybou `ResourceExhausted: ... cannot allocate memory`; ani hodnota `3` (→ 2 pracovní procesy) se nevešla poté, co byla RSS jednotlivých procesů změřena přímo namísto odhadu. `tests/unit/docker-build-memory-budget.test.ts` provádí výpočet podle naměřené hodnoty a selže, pokud některý z parametrů překročí možnosti běhového prostředí.

Turbopack kompiluje v nativní paměti Rustu, která se nachází **mimo** haldu V8, takže ji `OMNIROUTE_BUILD_MEMORY_MB` neomezuje. Na hostiteli s paměťovým limitem pak OOM killer ukončí sestavení pomocí SIGKILL zcela bez chybové zprávy — proces se jednoduše zastaví uprostřed `Creating an optimized production build`, což působí spíše jako zamrznutí než jako nedostatek paměti. Pokud má hostitel pro sestavení omezené prostředky, přepněte bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` je povolen, takže `next build` spouští nadřazený **i** pracovní proces a každý z nich samostatně respektuje `OMNIROUTE_BUILD_MEMORY_MB`. Nastavte limit kontejneru přibližně nad dvojnásobek této hodnoty, nikoli pouze nad její jednonásobek.

Naměřeno v tomto stromu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limit kontejneru | Výsledek                                  |
| --------- | ---------------- | ----------------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | v obou případech tiše ukončeno kvůli OOM  |
| webpack   | 8 GiB            | pracovní proces sestavení ukončen SIGKILL |
| webpack   | 12 GiB           | úspěch, špičková spotřeba 11,1 GiB        |

### Výchozí nastavení běhového prostředí

Výchozí hodnoty exportované fází `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Chování paměti v Dockeru:

- Image nastavuje `OMNIROUTE_MEMORY_MB=1024` a odvozuje z této hodnoty `NODE_OPTIONS=--max-old-space-size=1024`.
- Skutečný proces serveru spouští samostatný spouštěč, který načte `OMNIROUTE_MEMORY_MB` a přidá `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node používá poslední opakovanou hodnotu `--max-old-space-size`, takže nastavení `OMNIROUTE_MEMORY_MB` určuje efektivní limit haldy v Dockeru.
- Protože jej image nastavuje vždy, vlastní záložní nastavení spouštěče kalibrované podle RAM se v Dockeru nikdy nepoužije. Zvyšte tuto hodnotu explicitně podle pracovní zátěže (viz tabulka níže). Hodnota `2048` je pro `/v1/responses` programovacích agentů stále příliš nízká.

### Operační paměť pro programovací agenty

Výchozí hodnota 1 GiB v Dockeru je minimem pro řídicí panel a nenáročný chat, nikoli velikostí pro produkční nasazení. Dlouhá těla požadavků `POST /v1/responses` (stovky zpráv, desítky nástrojů) během komprese uchovávají v paměti několik grafů. Dva souběžné požadavky o velikosti přibližně 3 MiB / 750 tisíc tokenů způsobily ukončení V8 při velikosti old-space **12 GiB** (`FATAL ERROR: Reached heap limit`) a také narazily na OOM limit cgroup o velikosti 16 GiB. Viz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nastavte **cgroup `--memory` nad velikost haldy** — nativní buffery, SQLite a mezivýsledky komprese se nacházejí mimo V8.

| Pracovní zátěž                                | `OMNIROUTE_MEMORY_MB`         | Kontejner / cgroup     | Poznámky                                                                                                           |
| --------------------------------------------- | ----------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Řídicí panel, jeden nenáročný chat            | `1024` (výchozí image)        | ≥2 GiB                 |                                                                                                                    |
| Jeden programovací agent (Claude/Codex/Grok)  | `8192`                        | ≥10 GiB                | Typická jednorázová relace `/v1/responses`                                                                         |
| Dva souběžné dlouhé požadavky `/v1/responses` | `10240`–`12288`               | ≥12–16 GiB             | Naměřené ukončení V8 při haldě o velikosti ~12 GiB                                                                 |
| Tři či více souběžných dlouhých kontextů      | nespouštějte v jednom procesu | serializace / více RAM | Výchozí limit náročných požadavků je 1 probíhající požadavek; jeho zvýšení bez navýšení RAM znovu způsobí ukončení |

`omniroute serve` na fyzickém systému kalibruje přibližně 35 % RAM (omezeno na rozsah `[512, 4096]`), když proměnná `OMNIROUTE_MEMORY_MB` **není nastavena**. Docker vždy nastavuje `1024`, takže se tato kalibrace v oficiálním imagi nikdy nespustí.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritické proměnné prostředí

Kromě výchozích hodnot zdokumentovaných v souboru [ENVIRONMENT.md](../reference/ENVIRONMENT.md) jsou při spuštění v Dockeru nejdůležitější následující proměnné:

| Proměnná                      | Účel                                                                                                                                                                                                                                                                                            | Výchozí hodnota           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Sdílený tajný klíč pro most WebSocket. **Vyžadován v produkci** — nastavte jej na silný náhodný řetězec.                                                                                                                                                                                        | nenastaveno (nutno zadat) |
| `REDIS_URL`                   | Připojovací řetězec pro omezovač rychlosti / backend mezipaměti                                                                                                                                                                                                                                 | `redis://redis:6379`      |
| `REDIS_PORT`                  | Port na straně hostitele pro přibalený kontejner Redis                                                                                                                                                                                                                                          | `6379`                    |
| `REDIS_BIND_HOST`             | Síťové rozhraní hostitele, na kterém je publikován port přibaleného serveru Redis (místní smyčka, pokud nepřidáte AUTH)                                                                                                                                                                         | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Cesta na hostiteli připojená do profilu `cli` jako `/workspace/omniroute` pro pracovní postupy samočinné aktualizace                                                                                                                                                                            | `.` (aktuální adresář)    |
| `OMNIROUTE_MEMORY_MB`         | Horní limit haldy Node za běhu pro samostatný server Docker; přepisuje výše uvedenou výchozí hodnotu obrazu. Agenti pro programování: `8192`+ (viz [paměť RAM za běhu](#runtime-ram-for-coding-agents)).                                                                                        | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | Přepisuje zveřejněné porty řídicího panelu (20128) a API (20129)                                                                                                                                                                                                                                | `20128` / `20129`         |
| `APP_BIND_HOST`               | Síťové rozhraní hostitele, na kterém docker-compose publikuje porty řídicího panelu, API a živého WS. Při `REQUIRE_API_KEY=false` (výchozí hodnota) vystaví `0.0.0.0` anonymní proxy `/v1` do sítě LAN — přístup rozšiřujte pouze s `REQUIRE_API_KEY=true` nebo s reverzní proxy před aplikací. | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | Síťové rozhraní hostitele, na kterém docker-compose publikuje doprovodný kontejner `cliproxyapi` — jeho datový svazek obsahuje přihlašovací údaje poskytovatele.                                                                                                                                | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | Adresář, který skener modulů runtime prohledává a do kterého je instaluje. Nastavte jej, když jsou moduly připojeny pomocí bind mountu: výchozí hodnota se řídí proměnnou `HOME`, kterou obraz nemusí exportovat.                                                                               | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | Podcesta URL při publikování aplikace za reverzní proxy (např. `/omniroute`)                                                                                                                                                                                                                    | _(prázdné = kořen)_       |
| `NEXT_PUBLIC_BASE_URL`        | Veřejný počátek URL pro prohlížeč včetně podcesty (např. `https://host/omniroute`)                                                                                                                                                                                                              | nenastaveno               |
| `PROD_DASHBOARD_PORT`         | Port řídicího panelu na straně hostitele pro `docker-compose.prod.yml`                                                                                                                                                                                                                          | `20130`                   |
| `CLIPROXYAPI_PORT`            | Port na straně hostitele pro doprovodný kontejner `cliproxyapi`                                                                                                                                                                                                                                 | `8317`                    |

## Reverzní proxy na podcestě (Traefik / nginx)

Hodnota Next.js `basePath` je zkompilována do samostatného balíčku. OmniRoute zaznamenává tuto vloženou hodnotu do kontrolního souboru v kořenovém adresáři aplikace (zapsaného během `npm run build`; čteného skriptem `scripts/docker/ensure-docker-base-path.mjs`) a při spuštění kontejneru ji porovnává s `OMNIROUTE_BASE_PATH`. Pokud se hodnoty liší a image byl sestaven pro kořen domény, vstupní bod před spuštěním `node dev/run-standalone.mjs` přepíše manifesty samostatného balíčku, vložené literály `basePath`/`assetPrefix` (Next 16 vykresluje adresy URL prostředků SSR pouze z `assetPrefix` — nástroj pro úpravu do něj zkopíruje podcestu), vložené adresy URL prostředků `/_next/static` (manifesty klientských referencí, importy médií, předvykreslené chybové stránky) a klientskou náhradu za `process.env`.

### Sestavení pomocí Compose (doporučeno)

Nastavte obě proměnné v `.env` a poté image znovu sestavte, aby se sestavení a běhové prostředí shodovaly:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` předává `OMNIROUTE_BASE_PATH` jako argument sestavení Dockeru i jako proměnnou běhového prostředí.

### Předem sestavený image pro kořen domény + podcesta za běhu

Publikované image `diegosouzapw/omniroute:*` jsou sestaveny pro kořen domény. Proměnnou `OMNIROUTE_BASE_PATH` však můžete nastavit i za běhu; kontejner při spuštění jednorázově upraví balíček. Použijte ji společně s odpovídajícím veřejným počátkem adresy URL:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Nakonfigurujte reverzní proxy tak, aby předávala **úplnou** externí cestu (neodstraňujte prefix). Traefik by měl směrovat `PathPrefix(`/omniroute`)` do kontejneru bez `StripPrefix`, aby Next.js přijímal `/omniroute/...` a poskytoval prostředky z `/omniroute/_next/...`.

Kontrola stavu Dockeru testuje jednoduchý koncový bod životního cyklu `/healthz` s prefixem aktivní hodnoty `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` zůstává dostupný pro diagnostiku prováděnou uživateli nebo dashboardy; chcete-li na něj znovu nasměrovat kontrolu HEALTHCHECK kontejneru (například pro důkladné vynucování kontroly stavu), nastavte `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Tato cesta provádí **důkladnou** kontrolu (databáze + souhrn monitorování) — je vhodná pro nepříliš častý Docker `HEALTHCHECK`, pokud se ji rozhodnete znovu používat, ale **není** vhodná pro intervaly Kubernetes `livenessProbe`.

Pro orchestrátory (Kubernetes, Nomad atd.):

| Sonda               | Upřednostněte                                                         | Vyhněte se                                                                     |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Živost              | HTTP `GET /livez` nebo TCP na hlavním portu (`PORT`, výchozí `20128`) | `/api/monitoring/health` jako kontrolu živosti                                 |
| Připravenost        | HTTP `GET /healthz`                                                   | Krátkým časovým limitům, které považují vytíženou smyčku událostí za nefunkční |
| Důkladná / blackbox | `/api/monitoring/health`                                              | —                                                                              |

`/healthz` hlásí stav životního cyklu procesu (`ok` / `starting` / `stopping`). `/livez` kontroluje pouze to, zda je proces spuštěný (vrací 200 vždy, když lze obslužnou rutinu spustit; nečeká na připravenost). Obě kontroly stále běží ve stejné smyčce událostí Node jako zpracování požadavků, takže je mohou zpozdit výpočetně náročné operace s katalogem nebo kompresí — vytížený ≠ nefunkční. Pokud vyprší časový limit HTTP sond, upřednostněte kontrolu živosti přes TCP. Kompletní pokyny k sondám:
[Průvodce monitorováním — doporučení pro sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddy (automatické TLS přes HTTPS)

OmniRoute lze bezpečně zpřístupnit pomocí automatického zajišťování SSL certifikátů nástrojem Caddy. Ujistěte se, že DNS záznam A vaší domény odkazuje na IP adresu vašeho serveru.

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
      # Origin viditelný pro prohlížeč, používaný pro zpětná volání OAuth, odkazy ovládacího panelu a generované veřejné adresy URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interní adresa URL mezi servery pro naplánované úlohy / požadavky na sebe sama.
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

Caddy nastavuje standardní hlavičky pro předávání požadavků nadřazenému kontejneru. OmniRoute používá
`NEXT_PUBLIC_BASE_URL` jako kanonický veřejný origin pro zpětná volání OAuth a generované veřejné
odkazy; autentizované zápisy z ovládacího panelu používají požadavky stejného původu spolu s ochranou
CSRF navázanou na relaci. Proměnnou `OMNIROUTE_TRUST_PROXY` povolte pouze u pokročilých nasazení, kde
záměrně chcete, aby OmniRoute odvozoval veřejný origin z důvěryhodných předaných hlaviček namísto explicitní
konfigurace.

## Cloudflare Quick Tunnel

Podpora ovládacího panelu pro nasazení v Dockeru zahrnuje **Cloudflare Quick Tunnel** na jedno kliknutí na stránce `Dashboard → Endpoints`. Při prvním povolení se `cloudflared` stáhne pouze v případě potřeby, spustí se dočasný tunel k vašemu aktuálnímu koncovému bodu `/v1` a vygenerovaná adresa URL `https://*.trycloudflare.com/v1` se zobrazí přímo pod vaší běžnou veřejnou adresou URL.

Panely tunelů koncových bodů (Cloudflare, Tailscale, ngrok) lze zobrazit nebo skrýt v nabídce `Settings → Appearance`, aniž by se změnil stav aktivního tunelu.

### Poznámky k tunelům

- Adresy URL tunelů Quick Tunnel jsou dočasné a po každém restartu se změní.
- Tunely Quick Tunnel se po restartu OmniRoute nebo kontejneru automaticky neobnovují. V případě potřeby je znovu povolte z ovládacího panelu.
- Spravovaná instalace aktuálně podporuje Linux, macOS a Windows na architekturách `x64` / `arm64`.
- Spravované tunely Quick Tunnel ve výchozím nastavení používají přenos HTTP/2, aby se předešlo rušivým varováním o vyrovnávací paměti UDP protokolu QUIC v omezených kontejnerových prostředích. Pokud chcete použít jiný přenos, nastavte `CLOUDFLARED_PROTOCOL=quic` nebo `auto`.
- Obrazy Dockeru obsahují systémové kořenové certifikáty CA a předávají je spravovanému procesu `cloudflared`, čímž se předchází selháním důvěry TLS při inicializaci tunelu uvnitř kontejneru.
- Pokud chcete, aby OmniRoute místo stahování použil existující binární soubor, nastavte `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Tagy obrazů

| Obraz                    | Tag      | Velikost | Popis                                                              |
| ------------------------ | -------- | -------- | ------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Nejvyšší **publikovaná** stabilní verze SemVer (nikoli git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Pro GitOps připněte tuto třídu tagu                                |

Multiplatformní manifest: nativní `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automaticky vybere odpovídající architekturu; pokud potřebujete na hostitelích ARM vynutit emulaci AMD64, předejte `--platform linux/amd64`.

### Kanály vydání

OmniRoute publikuje samostatné kanály Dockeru pro stabilní vydání, testování aktivní větve vydání a vývojová sestavení.

| Kanál                           | Zdroj                                          | Proměnlivost                           | Doporučené použití                                                                                             |
| ------------------------------- | ---------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Podepsané/verzované vydání                     | Neměnný                                | Produkční nasazení s připnutým konkrétním vydáním                                                              |
| `:latest` / `:latest-web`       | Nejvyšší **publikovaná** stabilní verze SemVer | Proměnlivý stabilní ukazatel           | Sleduje stabilní vydání **po** publikování SemVer — **nesleduje** `main` ani nevydané commity `release/v*`     |
| `:next` / `:next-web`           | Aktuální výchozí větev `release/v*`            | Proměnlivý ukazatel předběžného vydání | Testování oprav, které již byly začleněny do aktivní větve vydání, ale zatím nejsou součástí stabilního vydání |
| `:main` / `:main-web`           | Větev `main`                                   | Proměnlivý vývojový ukazatel           | Pouze pro vývojové a integrační testování                                                                      |

#### Poskytovatelé webových relací: obrazy `-web`

Každý výše uvedený kanál je dostupný také jako tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) sestavený z fáze `runner-web` — jde o stejný obraz doplněný o Playwright a prohlížeč Chromium. Běžný obraz se dodává **bez** Chromia; poskytovatelé `gemini-web`, `claude-web` a `claude-turnstile` jej potřebují.

K selhání nedojde při spuštění, ale až později: tito poskytovatelé zobrazují své modely a na ovládacím panelu se jeví jako připojení; teprve první požadavek selže s chybou

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Pokud tyto poskytovatele používáte, stáhněte tag `-web` kanálu, který již používáte — nic dalšího se nemění. Při instalaci pomocí npm/CLI (bez obrazu Dockeru) je chybějící součástí binární soubor prohlížeče: na hostiteli spusťte `npx playwright install chromium`.

#### Použití kanálu předběžného vydání

Kanál `next` se znovu sestavuje při každém odeslání změn do aktuální výchozí větve `release/v*` a publikuje se pro AMD64 i ARM64. Starší větve údržby jej nemohou přepsat. Tento kanál poskytuje obraz ke stažení obsahující opravy, které byly začleněny do aktivní větve vydání před vytvořením dalšího stabilního tagu.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pro Docker Compose přepište tag obrazu používaný vybraným profilem a poté službu stáhněte a znovu vytvořte:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpečnost a návrat k předchozí verzi

`next` je plovoucí kanál předběžného vydání. Může se změnit při každém odeslání změn do aktivní větve vydání a **není podporován pro produkční použití**. Při vyhodnocování konkrétního sestavení připněte digest obrazu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Před testováním zálohujte datový svazek OmniRoute nebo připojený datový adresář. Chcete-li se vrátit k předchozí verzi, obnovte dříve používanou stabilní verzi nebo digest a znovu vytvořte kontejner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Sestavení z větve vydání nikdy nemůže posunout `latest`; stabilní ukazatel může aktualizovat pouze způsobilá stabilní sémantická verze. Obrazy `next` zachovávají kontrolu obrazu vydání a blokující bránu pro KRITICKÉ zranitelnosti.

**`latest` není zárukou aktuálnosti vůči gitu.** Sloučené opravy ve větvi `main` nebo v aktivní větvi `release/v*` **nejsou** součástí `:latest`, dokud není publikován stabilní obraz SemVer a publikační úloha neaktualizuje `:latest` (se stejným digestem jako daná verze SemVer). Pokud se `latest` jeví jako zamrzlý, zatímco GitHub již opravu zobrazuje, stáhněte `:next` pro otestování větve vydání nebo počkejte na tag SemVer.

| Co chcete                                                                             | Použijte                               |
| ------------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps / produkci, která se nesmí samovolně měnit                                     | Připněte `:X.Y.Z` (nebo digest obrazu) |
| Sledovat publikované stabilní verze a akceptovat opětovné vytvoření při každém vydání | `:latest`                              |
| Testovat nevydané commity `release/v*`                                                | `:next` (nikoli pro produkci)          |
| Testovat `main`                                                                       | `:main` (nikoli pro produkci)          |

## Dostupnost: výchozí SQLite podporuje pouze jednu repliku

Standardní nasazení OmniRoute v Dockeru / Kubernetes tvoří **jeden proces Node + jeden zapisující proces SQLite**. Vysoká dostupnost v této topologii **není podporována**.

| Omezení                                                | Důsledek                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jeden zapisující proces                                | **Nespouštějte** více replik nad stejným souborem SQLite. Došlo by k poškození databáze.                                                                                                                                                                                                                                                                                |
| Znovuvytvoření / restart / ukončení pomocí HEALTHCHECK | **Úplný výpadek** probíhajících připojení SSE, relací řídicího panelu a stavu v paměti. Každý připojený klient ztratí spojení. Nové požadavky během období bez dostupného koncového bodu obdrží od reverzního proxy serveru odpověď **`502 Bad Gateway: Unknown error`**, nikoli JSON z OmniRoute — klienti ji proto nemohou odlišit od selhání poskytovatele (#11015). |
| Stejná smyčka událostí jako `/healthz`                 | Vytížená aktualizace katalogu nebo komprese může zpozdit sondy; krátký časový limit pak restartuje **jedinou** repliku.                                                                                                                                                                                                                                                 |

**Matice sond** (viz také [doporučení pro sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda                  | Cíl                                                              | Nepoužívat                                                               |
| ---------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Kontrola živosti       | TCP na `PORT` (výchozí `20128`) nebo mírná HTTP sonda `/healthz` | `/api/monitoring/health`                                                 |
| Kontrola připravenosti | HTTP `GET /healthz`                                              | Krátké časové limity, které považují vytíženou smyčku událostí za mrtvou |
| Hloubková / pro lidi   | `/api/monitoring/health`                                         | Automatizovaná kontrola živosti kubeletu                                 |

**Aktualizace:** počítejte s ukončením každé relace. Pokud můžete, odveďte klienty; s výchozí SQLite není průběžná aktualizace možná. Nastavení Compose `restart: unless-stopped` společně s Docker `HEALTHCHECK` rovněž nahradí jediný proces, pokud kontejner přejde do nezdravého stavu — s totožným rozsahem dopadu.

Ukázka konfigurace Kubernetes pro **jednu repliku** (strategie Recreate je povinná; nezvyšujte `replicas` nad jedním souborem SQLite):

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

Prodleva `preStop` umožní kube odebrat koncové body služby před signálem SIGTERM, takže **nový** provoz přestane směřovat na ukončovaný proces. Probíhající SSE `/v1/responses` se dokončí nejdéle během `SHUTDOWN_TIMEOUT_MS` (výchozí hodnota 30 s) prostřednictvím náročných vstupních pronájmů (#11015). Nové požadavky, které přesto dorazí k procesu, obdrží odpověď `503` + `Retry-After: 5`. Prodleva strategie Recreate bez dostupného koncového bodu, dokud nebude náhradní instance připravena, zůstává úplným výpadkem — jde o vlastnost topologie SQLite, nikoli o chybnou konfiguraci sondy.

Externí Postgres / vysoká dostupnost s více zapisujícími procesy **není** zdokumentovanou standardní cestou. Pokud potřebujete vysokou dostupnost, zachovejte jednu repliku nebo použijte topologii, kterou projekt samostatně otestoval a zdokumentoval. Práce na podpoře Postgres/MySQL probíhají v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dokud nebude tato podpora vydána, jediným podporovaným způsobem zvýšení kapacity pro **velké** požadavky `/v1/responses` je N nezávislých procesů (další část), nikoli `replicas > 1` nad jedním svazkem.

## Horizontální škálování: N nezávislých procesů

Jeden proces Node představuje **jednu haldu V8**. Dva překrývající se požadavky kódovacího agenta `POST /v1/responses` (RTK + Caveman) o velikosti ~3 MiB / ~750k tokenů způsobí ukončení této haldy při ~12 Gi (`FATAL ERROR: Reached heap limit`) a mohou způsobit OOM v cgroup o velikosti 16 Gi. Viz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Toto měření je varováním ohledně **paměťového rozpočtu**, nikoli pevné produktové omezení na dva souběžné dlouhé požadavky `/v1/responses`. Přijímání náročných chatů je řízeno automaticky odvozeným rozpočtem bajtů na vstupu (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), jehož velikost vychází ze stejného limitu V8/cgroup — jeho ruční navýšení (nebo nastavení staršího limitu počtu požadavků `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) u již dimenzovaného procesu znovu způsobí ukončení. Malé chaty, `/healthz`, `/v1/models` a MCP **nejsou** do tohoto limitu zahrnuty.

### Jeden proces: více než dva dlouhé požadavky `/v1/responses`

**Zdravý** proces (halda pod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, výchozí hodnota `0.75`) **může** zpracovávat více než dva souběžné dlouhé požadavky `POST /v1/responses`, pokud má rozpočet bajtů zpracovávaných v rámci celého procesu (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) stále dostatečnou rezervu. Těla požadavků o velikosti alespoň `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (výchozí hodnota 256 KiB) získávají stejný prostředek pro náročné požadavky jako požadavky se složitou strukturou a používají stejný únikový mechanismus `tryAcquireHealthyHeadroom` z [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desítky souběžných dlouhých klientů SSE (operátoři často potřebují 40–50) jsou otázkou **paměťového rozpočtu** — dimenzujte haldu, primární/doplňkové sloty a `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nikoli pevného produktového omezení „max. 2“. Proces s přetíženou haldou nadále odmítá požadavky pomocí opakovatelné odpovědi `503`, aby se problém #7849 nevrátil.

Chcete-li **znásobit počet hald** (nezávislé old-space oblasti V8) **již dnes**:

| Doporučeno                                                                                                                                                                                          | Nedoporučeno                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Spusťte **N kontejnerů/podů**, každý s **vlastním** `DATA_DIR` / svazkem                                                                                                                            | Nastavovat `replicas > 1` nad jedním souborem SQLite                  |
| Dimenzujte počet náročných probíhajících požadavků + zdravou rezervu podle haldy / rozpočtu zpracovávaných bajtů; 1–2 je konzervativní výchozí hodnota podle #7849, nikoli pevné produktové maximum | Přidělit jednomu procesu 8× více RAM a neomezený limit počtu          |
| Volitelně: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pro **sdílená počítadla kvót**                                                                                                      | Považovat Redis za sdílené SQLite — není jím                          |
| Zkopírujte tajné údaje poskytovatelů do každé instance (nebo akceptujte oddělené řídicí panely)                                                                                                     | Očekávat jeden řídicí panel / jeden protokol volání napříč instancemi |
| Použijte libovolný nástroj pro vyvažování zátěže; stačí zachování příslušnosti podle klíče API nebo relace                                                                                          | Vyžadovat middleware konkrétního dodavatele zohledňující velikost     |

Hardware: počet souběžných dlouhých požadavků `/v1/responses` na instanci je otázkou **paměťového rozpočtu** (halda + zpracovávané bajty / #10110). `N` nezávislých adresářů `DATA_DIR` stále znamená znásobení počtu hald: RAM hostitele musí pokrýt `N × cgroup`, nikoli „jeden pod s 16 Gi a N=8“. Nikdy nepoužívejte `replicas > 1` nad jedním souborem SQLite.

Náčrt Compose (dvě haldy, dva svazky — nikoli `deploy.replicas: 2`):

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

Vyšší hustota v rámci procesu (komprese mimo HTTP isolate) je řešena v [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logický cluster nad sdíleným trvalým stavem je řešen v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Důležité poznámky

- **Režim WAL SQLite:** Příkaz `docker stop` je nutné nechat dokončit, aby OmniRoute mohl zapsat nejnovější změny zpět do `storage.sqlite` pomocí kontrolního bodu. Přiložené soubory Compose již nastavují 40sekundovou dobu odkladu pro zastavení. Pokud image spouštíte přímo, ponechte `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nastavte na `true`, pokud jsou pravidelné zálohy a zálohy před zápisem spravovány externě. Migrace existujících databází stále vyžadují vlastní trvalý bezpečnostní snímek a ochranu proti hromadné migraci.
- **Trvalé uložení dat:** Vždy připojte svazek k `/app/data`, aby vaše databáze, klíče a konfigurace zůstaly zachovány i po restartování kontejneru.
- **Konfigurace portu:** Výchozí port `20128` změníte přepsáním proměnné prostředí `PORT`.

## Viz také

- [Průvodce nasazením na virtuálním počítači](../ops/VM_DEPLOYMENT_GUIDE.md) — Nastavení virtuálního počítače, nginx a Cloudflare
- [Průvodce nasazením na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Nasazení na Fly.io
- [Konfigurace prostředí](../reference/ENVIRONMENT.md) — Kompletní přehled `.env`
