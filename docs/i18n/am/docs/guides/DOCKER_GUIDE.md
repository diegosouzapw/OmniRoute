# 🐳 Docker Guide — OmniRoute (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> የተሟላ የDocker ማሰማራት ማጣቀሻ። በፍጥነት ለመጀመር [የREADME Docker ክፍልን](../README.md#-docker) ይመልከቱ።

## የይዘት ማውጫ

- [ፈጣን ማስኬድ](#quick-run)
- [ከአካባቢ ፋይል ጋር](#with-environment-file)
- [Docker Compose](#docker-compose)
- [የሚገኙ መገለጫዎች](#available-profiles)
- [OmniRoute በDocker ውስጥ ሲሠራ የhost CLI መሣሪያዎችን ማዋቀር](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [የምርት Compose](#production-compose)
- [የDockerfile ደረጃዎች](#dockerfile-stages)
- [ወሳኝ የአካባቢ ተለዋዋጮች](#critical-environment-variables)
- [Docker Compose ከCaddy (HTTPS) ጋር](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ፈጣን Tunnel](#cloudflare-quick-tunnel)
- [የImage መለያዎች](#image-tags)
- [ተደራሽነት፦ ነባሪው SQLite ነጠላ-replica ነው](#availability-default-sqlite-is-single-replica)
- [በDocker ውስጥ የGemini ክልላዊ ስህተቶች](#gemini-regional-errors-inside-docker)
- [ጠቃሚ ማስታወሻዎች](#important-notes)

---

## ፈጣን ማስኬድ

> **በአንድ ትዕዛዝ በራስዎ ማስተናገድ ይፈልጋሉ?**
> [በራስ የማስተናገድ መመሪያን](../getting-started/SELF_HOST_GUIDE.md) ይመልከቱ —
> `docker compose -f docker-compose.selfhost.yml up -d` (የታተመ image +
> Redis፣ loopback-only፣ የመገለጫ ምርጫ የሌለው)። ከታች ያለው ፈጣን ማስኬድ Redisን አስቀድመው
> በሌላ ቦታ ለሚያስኬዱ ተጠቃሚዎች የተዘጋጀው የነጠላ-container መንገድ ነው።

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## ከአካባቢ ፋይል ጋር

```bash
# በመጀመሪያ .envን ይቅዱ እና ያርትዑ
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
# መሠረታዊ መገለጫ (የCLI መሣሪያዎች የሉም)
docker compose --profile base up -d

# የCLI መገለጫ (Claude Code፣ Codex፣ OpenClaw አብረው የተካተቱ)
docker compose --profile cli up -d

# የHost መገለጫ (በዋናነት ለLinux፤ የhost CLI binariesን በread-only ሁኔታ ያያይዛል)
docker compose --profile host up -d

# የWeb መገለጫ (ለweb-session providers Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecarን ያጣምሩ
docker compose --profile cli --profile cliproxyapi up -d
```

## የሚገኙ መገለጫዎች

OmniRoute ለዋና ዋና የማሰማራት አወቃቀሮች የCompose መገለጫዎችን አካትቶ ይመጣል። ከአካባቢዎ ጋር የሚዛመደውን ይምረጡ።

| መገለጫ          | አገልግሎት           | መቼ መጠቀም እንደሚገባ                                                                                                             | ትዕዛዝ                                         |
| ------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ነባሪ)  | `omniroute-base` | ማሳያ የሌለው server / አነስተኛ runtime፣ የታሸጉ የprovider CLIዎች የሉትም                                                                 | `docker compose --profile base up -d`        |
| `cli`         | `omniroute-cli`  | `omniroute providers/setup/doctor`ን እና አብረው የታሸጉ CLIዎችን (Codex፣ Claude Code፣ Droid፣ OpenClaw) የሚጠሩ ወኪላዊ የሥራ ፍሰቶች           | `docker compose --profile cli up -d`         |
| `host`        | `omniroute-host` | `~/.local/bin`፣ `~/.codex`፣ `~/.claude` ወዘተን በread-only በማያያዝ ወደ host CLIዎች `network_mode`-ዓይነት መዳረሻ የሚፈልጉ Linux hosts     | `docker compose --profile host up -d`        |
| `cliproxyapi` | `cliproxyapi`    | ለupstream CLI proxying [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecarን በport `8317` ላይ ያስኪዱ           | `docker compose --profile cliproxyapi up -d` |
| `web`         | `omniroute-web`  | browser የሚፈልጉ የweb-session providers፦ `gemini-web`፣ `claude-web`፣ `claude-turnstile` (`runner-web`ን ይገነባል፣ Chromium ተካትቷል) | `docker compose --profile web up -d`         |

> በርካታ መገለጫዎችን ማጣመር ይቻላል፦ `docker compose --profile cli --profile cliproxyapi up -d`።

## OmniRoute በDocker ውስጥ ሲሠራ የአስተናጋጁን CLI መሣሪያዎች ማዋቀር

`omniroute setup-codex`፣ `setup-claude`፣ `config set <tool>` እና የዳሽቦርዱ
**ውቅር አስቀምጥ** አዝራር ሁሉም እንደ `~/.codex/*.config.toml` ያሉ ፋይሎችን ይጽፋሉ። እነዚህ ዱካዎች
ትርጉም የሚኖራቸው CLIው በትክክል በሚሠራበት ማሽን ላይ ብቻ ነው። በኮንቴነሩ ውስጥ
ካስኬዷቸው፣ ጽሑፉ በኮንቴነሩ የራሱ መነሻ ማውጫ (`/home/node` —
ኢሜጁ `USER node` በመጠቀም ይሠራል) ውስጥ ይቀመጣል፤ በዚያም ምንም የአስተናጋጅ CLI አያነበውም፣
እንዲሁም ኮንቴነሩ እንደገና በተፈጠረበት ቅጽበት ይወገዳል።

OmniRoute ይህን በመለየት ሊጠቀሙበት የማይችሉትን ስኬት ከመዘገብ ይልቅ
መመሪያዎችን በመስጠት ጽሑፉን አይቀበልም፦ CLIው በ`2` ይወጣል፣ APIው ደግሞ `422`
እና `containerEphemeralTarget: true` የያዘ ምላሽ ይሰጣል።

### የሚመከር፦ CLIውን በአስተናጋጁ ላይ፣ OmniRouteን በDocker ውስጥ ያስኪዱ

ኮንቴነሩ APIውን ያቀርባል፤ CLIው ደግሞ የአስተናጋጅ መሣሪያዎችዎን ያዋቅራል።

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLIውን ወደ ኮንቴነሩ ያመልክቱ
omniroute setup-codex                      # በአስተናጋጅዎ ላይ እውነተኛውን ~/.codex ይጽፋል
```

Codex፣ Claude Code፣ Cursor ወይም ተመሳሳይ መሣሪያዎች በላፕቶፕዎ ላይ
ሲሠሩ ይህ ትክክለኛው ምርጫ ነው — ይህም የተለመደው አዋቅር ነው።

### አማራጭ፦ የአስተናጋጁን የውቅር ማውጫዎች bind-mount ያድርጉ (`host` ፕሮፋይል)

ኮንቴነሩ ራሱ የአስተናጋጅ ውቅርዎን እንዲጽፍ ከፈለጉ፣
ማውጫዎቹን ወደ ውስጥ mount ያድርጉ እና `CLI_CONFIG_HOME`ን ወደ mount root ያመልክቱ። `host` ፕሮፋይል
ይህን አስቀድሞ ያደርጋል፦

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

ዱካውን ታማኝ የሚያደርገው bind mount ነው፦ OmniRoute
`/proc/self/mountinfo`ን ያነባል፣ እና ወደ mount የተደረጉ ዱካዎች (እንዲሁም ልጅ ማውጫዎቻቸው mount ወደሆኑ
ማውጫዎች፤ ይህም በትክክል ከላይ ያለው የ`/host-home` ቅርጽ ነው) መጻፍን ይፈቅዳል፣
mount ያልተደረጉትን ግን አሁንም አይቀበልም።

### የማምለጫ አማራጭ፦ የኮንቴነሩን የራሱ CLIs ያዋቅሩ (በጥንቃቄ ይጠቀሙ)

CLIs በእውነት በኮንቴነሩ ውስጥ ሲኖሩ (የ`cli` ፕሮፋይል)፣ ጽሑፉ
ሆን ተብሎ የሚደረግ ነው። ለማንኛውም `setup-*` ትእዛዝ `--allow-container-write`ን ያስተላልፉ፣ ወይም ለሰርቨሩ
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`ን ያቀናብሩ። ጽሑፉ ከኮንቴነሩ በኋላ እንደማይቆይ
በሚገልጽ ማስጠንቀቂያ ይቀጥላል።

> **የደህንነት ማስጠንቀቂያ — `cli` ፕሮፋይል + `docker.sock` mount።**
> በኮንቴነሩ ውስጥ ያለው ራስ-አዘምን ከአስተናጋጁ daemon ላይ stackን እንደገና እንዲፈጥር
> የ`cli` ፕሮፋይል `/var/run/docker.sock`ን bind-mount ያደርጋል
> (`src/lib/system/autoUpdate.ts` ያንን socket መኖሩን ይፈትሻል፣ በማይኖርበት ጊዜ ደግሞ
> የDocker ዱካውን ይዘላል)። ያ socket **የአስተናጋጅ-root እምነት
> ወሰን** ነው፦ እሱን ማግኘት የሚችል ማንኛውም ነገር የአስተናጋጁን Docker daemon እንደ
> root ይቆጣጠራል — በአስተናጋጁ ላይ ያለን ማንኛውንም ኮንቴነር መፍጠር፣ መመርመር፣ ማቆም እና ማስወገድ ይችላል።
> ይህ የሚያስከትላቸው ነገሮች፦
>
> 1. **የ`cli` ፕሮፋይሉን port ፈጽሞ ለኔትወርኩ አያጋልጡ።** በ
>    `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`) ላይ publish ያድርጉት
>    — በLAN ሊደረስበት የሚችል `cli` ፕሮፋይል ማንኛውንም የዳሽቦርድ ደረጃ RCE ወደ
>    ሙሉ የአስተናጋጅ ጥሰት ይቀይራል።
> 2. **ወደ `cli` ፕሮፋይል ምንም ተጨማሪ የአስተናጋጅ ማውጫዎችን bind አያድርጉ።**
>    Docker socket ከማንኛውም ተጨማሪ mount ጋር ሲደመር ኮንቴነሩ የፋይል ስርዓትዎን እና የአስተናጋጅ ውቅርዎን
>    ሙሉ በሙሉ እንዲያነብና እንዲጽፍ ያስችለዋል። አንድ መሣሪያ ፕሮጀክትን እንዲያይ ከፈለጉ፣
>    የCLI binaryውን በመጠቀም በአካባቢዎ ያስኪዱት — ወደ `cli` ኮንቴነር mount አያድርጉት።
>
> በኮንቴነሩ ውስጥ ራስ-አዘምን ካላስፈለገዎት፣ የ`cli` ፕሮፋይሉን አያብሩ
> (`COMPOSE_PROFILES=core,redis` ወይም አጭር ቅርጹን ይጠቀሙ)። ሌሎቹ ፕሮፋይሎች
> Docker socketን mount አያደርጉም።
>
> ከMITM ጋር የተያያዘውን የስጋት ሞዴል ለማየት `docs/security/MITM-TPROXY-DECRYPT.md`ን (git፤ ወደ `/docs` አልተጠናቀረም) ይመልከቱ፣
> እንዲሁም ለ`codex`/`claude-code`/`droid`/`openclaw` binary የምንጭ ሰንሰለት
> `docs/security/SUPPLY_CHAIN.md`ን ይመልከቱ።

## Redis Sidecar

OmniRoute ለተሰራጨው የጥያቄ መጠን ገዳቢ እና ለጋራ መሸጎጫ Redis ላይ ይመረኮዛል። የ`redis` አገልግሎት በ`docker-compose.yml` ውስጥ **ሁልጊዜ ይገለጻል** (የprofile ገደብ የለውም) እና ከማንኛውም ሌላ profile ጋር አብሮ ይጀምራል።

| ዝርዝር                   | ዋጋ                                   |
| ---------------------- | ------------------------------------ |
| Image                  | `redis:7-alpine`                     |
| የcontainer ስም          | `omniroute-redis`                    |
| ውስጣዊ port              | `6379`                               |
| የhost port (ሊቀየር የሚችል) | `REDIS_PORT` (ነባሪው `6379`)           |
| የhost bind (ሊቀየር የሚችል) | `REDIS_BIND_HOST` (ነባሪው `127.0.0.1`) |
| Volume                 | `omniroute-redis-data` → `/data`     |
| የጤና ምርመራ               | `redis-cli ping` (በየ10 ሰከንዱ)         |

ተዛማጅ የአካባቢ ተለዋዋጮች፦

- `REDIS_URL` — ወደመተግበሪያው የሚገባ የግንኙነት ሕብረቁምፊ (በነባሪ `redis://redis:6379`)።
- `REDIS_PORT` — ለRedis container የhost-ወገን port mapping።
- `REDIS_BIND_HOST` — port-ው የሚታተምበት የhost interface። ነባሪው `127.0.0.1` ነው።

> **በነባሪ loopback የሚጠቀምበት ምክንያት፦** sidecar-ው `requirepass` ሳይኖረው ይሰራል፣ እና የመተግበሪያው
> containers በcompose network (`redis:6379`) በኩል ይደርሱበታል — የታተመው port
> ያለው ለhost-ወገን መሣሪያዎች (`redis-cli`፣ አካባቢያዊ `npm run dev`) ብቻ ነው። በ
> `0.0.0.0` ላይ ማተም ማረጋገጫ የሌለውን Redis በLANዎ ላይ ላሉ ሁሉም host-ዎች ያጋልጣል።
> `REDIS_BIND_HOST=0.0.0.0` ካዘጋጁ፣ `--requirepass`ንም ወደአገልግሎቱ `command:` ያክሉ።

**Redisን ማሰናከል** አይመከርም (የጥያቄ መጠን ገዳቢው ወደin-memory fallback ዝቅ ይላል)። የግድ ከሆነ፣ በ`docker-compose.yml` ውስጥ ያለውን የ`redis:` አገልግሎት block ያስወግዱ/በcomment ያስወጡ ወይም መጠኑን ወደዜሮ ያውርዱ፦

```bash
docker compose up -d --scale redis=0
```

## የProduction Compose

ከdev ጎን ለጎን ለሚሰራ ራሱን የቻለ የproduction snapshot፣ `docker-compose.prod.yml`ን ይጠቀሙ።

| ዝርዝር                | ዋጋ                                                                         |
| ------------------- | -------------------------------------------------------------------------- |
| ፋይል                 | `docker-compose.prod.yml`                                                  |
| ነባሪ የdashboard port | `PROD_DASHBOARD_PORT=20130` (ወደውስጣዊ `${DASHBOARD_PORT:-20128}` የተዛመደ)      |
| ነባሪ API port        | `PROD_API_PORT=20131`                                                      |
| Image               | `omniroute:prod` (ከ`runner-cli` target የተገነባ)                              |
| Redis container     | `omniroute-redis-prod` (`redis:8.6.2`፣ የተለየ `redis-prod-data` volume)      |
| የውሂብ volume         | `omniroute-prod-data` (ስም ያለው፣ በድጋሚ ሲገነባም የሚቆይ)                            |
| የጤና ምርመራዎች          | `node healthcheck.mjs` + `redis-cli ping`፣ `depends_on` በRedis ጤናማነት የተገደበ |

አጠቃቀም፦

```bash
# የproduction stackን ይገንቡ እና ያስጀምሩ
docker compose -f docker-compose.prod.yml up -d --build

# logsን ቀጥታ ይመልከቱ
docker compose -f docker-compose.prod.yml logs -f

# ያቁሙ እና ያስወግዱ (volumesን ያቆዩ)
docker compose -f docker-compose.prod.yml down
```

የprod stack ከdev compose ጋር በትይዩ ይሰራል (የተለያዩ የcontainer ስሞች፣ ports እና volumes አሉት)፤ ስለዚህ production እንደተነሳ ሳለ በአካባቢዎ ላይ ማሻሻሉን መቀጠል ይችላሉ።

## የDockerfile ደረጃዎች

ማከማቻው ባለብዙ-ደረጃ Dockerfile (`Dockerfile`) ያቀርባል። አራት ደረጃዎች ቀርበዋል፤ ለአጠቃቀምዎ ትክክለኛውን `target` ይምረጡ።

| ደረጃ           | መሠረታዊ ምስል             | ዓላማ                                                                                                                                                                                                                               |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ጥገኞችን ይጭናል (`npm ci --legacy-peer-deps`) እና `npm run build`ን ያስኬዳል (በነባሪ Turbopack — ከታች ያሉትን የግንባታ-ጊዜ ሀብቶች ይመልከቱ)                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | የNext.js ራሱን የቻለ ውጤት ያለው የምርት አካባቢ አሂድ። **ምንም የአቅራቢ CLIዎች አልተካተቱም።**                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | `git`፣ `docker.io`፣ `docker-compose` እና ዓለም አቀፍ CLIዎችን ይጨምራል፦ `@openai/codex`፣ `@anthropic-ai/claude-code`፣ `droid`፣ `openclaw`። **ወኪል-ተኮር የሥራ ፍሰቶችን ለመጠቀም ይህን ይምረጡ።**                                                            |
| `runner-web`  | `runner-base`         | ለድር-ክፍለጊዜ አቅራቢዎች Playwright + Chromium አሳሽ (`--with-deps`) ይጨምራል፦ `gemini-web`፣ `claude-web`፣ `claude-turnstile`። **እነዚህን አቅራቢዎች ሲጠቀሙ ይህን ይምረጡ** — ተራው ምስል ይህ ከሌለው ጥያቄ በሚቀርብበት ጊዜ ይከሽፋል (በየልቀት ቻናሎች ሥር ያለውን የ`-web` ማስታወሻ ይመልከቱ)። |

አንድን የተወሰነ target በእጅ ይገንቡ፦

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### የግንባታ-ጊዜ ሀብቶች

የ`builder` ደረጃው የሚጠቀመውን ሀብት ሦስት የግንባታ ነጋሪ እሴቶች ይቆጣጠራሉ። እነሱ ለግንባታ ጊዜ ብቻ ናቸው —
`OMNIROUTE_MEMORY_MB` (ከታች) የተለየ የአሂድ-ጊዜ መቆጣጠሪያ ነው።

| የግንባታ ነጋሪ እሴት               | ነባሪ    | ተጽዕኖ                                                                            |
| --------------------------- | ------ | ------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` በwebpack ይገነባል፦ ዝቅተኛ ከፍተኛው የማህደረ ትውስታ አጠቃቀም፣ ግን የዘገየ። `1` Turbopackን ይጠቀማል። |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | ለሚጀመረው `next build` የV8 heap ከፍተኛ ገደብ (`--max-old-space-size`)።                 |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL`ን ይመግባል፤ Next ለገጽ-ውሂብ ስብስብ `workers = N - 1`ን ያወጣል።          |

ትልቅ builder ላይ ከፍ ማድረግ ያለብዎት እና የተገደበ ግንባታ **ከ** `✓ Compiled successfully`
**በኋላ** ሲቋረጥ መጠርጠር ያለብዎት `OMNIROUTE_BUILD_WORKERS`ን ነው። እያንዳንዱ
የገጽ-ውሂብ worker ራሱን የቻለ process ነው፣ ዋናው `next build` ራሱም እንዲሁ ነው፤
በቀጥታ VPS ላይ የተደረገ ድጋሚ ሙከራ (issue #7518) የእያንዳንዱን process ከፍተኛ RSS
ከ`NODE_OPTIONS` heap flag ነጻ በሆነ መልኩ ~4.5 GB እንደሆነ ለካ (Turbopack ከV8 heap ውጭ
ባለ ቤተኛ/Rust ማህደረ ትውስታ ውስጥ ያጠናቅራል)። የ`2` ነባሪ እሴት (→ 1 worker፣ በድምሩ 2
processes) የህትመት pipeline ለሚጠቀምባቸው 16 GB / 4 vCPU GitHub-hosted runners
የተመጠነ ነው። `8` ላይ (→ 7 workers) ያ runner ማህደረ ትውስታው አለቀበት እና
buildkit ደረጃውን `ResourceExhausted: ... cannot allocate memory` በሚል ስህተት አቋረጠው፤
የእያንዳንዱ process RSS በግምት ፈንታ በቀጥታ ከተለካ በኋላ `3` (→ 2 workers) እንኳን
አልበቃም። `tests/unit/docker-build-memory-budget.test.ts`
በተለካው አሃዝ ላይ ስሌቱን ያከናውናል፣ ከሁለቱ መቆጣጠሪያዎች አንዱ ከrunner አቅም
በላይ ካደገም ይከሽፋል።

Turbopack ከV8 heap **ውጭ** በሚገኝ ቤተኛ Rust ማህደረ ትውስታ ውስጥ ያጠናቅራል፣ ስለዚህ
`OMNIROUTE_BUILD_MEMORY_MB` አይገድበውም። የማህደረ ትውስታ ገደብ ባለው host ላይ
ግንባታው ምንም የስህተት ጽሑፍ ሳያሳይ በOOM killer SIGKILL ይደረጋል — በ`Creating an optimized production build`
መካከል በቀላሉ ይቆማል፣ ይህም የማህደረ ትውስታ መሟጠጥ ከመምሰል ይልቅ እንደተንጠለጠለ
ያስመስለዋል። ለዚህም ነው `Dockerfile` በነባሪ webpackን
(`OMNIROUTE_USE_TURBOPACK=0`) የሚጠቀመው፤ ይህም Turbopack የኮዱ ነባሪ ከሆነባቸው
`npm run dev` / `npm run build` የተለየ ነው፦ ምንም የግንባታ ነጋሪ እሴቶች የሌሉት ተራ
`docker build .` (Railway እና ሌሎች ባለአንድ-ጠቅታ hosts የሚያስኬዱት) የማህደረ ትውስታ
ገደብ ባለው builder ላይ ያለምንም ማስጠንቀቂያ መቋረጥ የለበትም። የታተሙት ምስሎች
`OMNIROUTE_USE_TURBOPACK=0`ን ቀድሞውኑ በ`docker-publish.yml` ውስጥ በግልጽ ያስተላልፋሉ።
በቂ RAM ባለው builder ላይ ፈጣን ግንባታ ለማግኘት Turbopackን ይምረጡ፦

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ነቅቷል፣ ስለዚህ `next build` ዋና process **እና** worker
process ያስኬዳል፣ እያንዳንዳቸውም `OMNIROUTE_BUILD_MEMORY_MB`ን በተናጠል ያከብራሉ። የcontainer
ገደቡን ከዚያ እሴት አንድ ጊዜ ሳይሆን በግምት ከእጥፉ በላይ ያድርጉት።

በዚህ tree ላይ የተለካ (`--target runner-base`፣ `OMNIROUTE_BUILD_MEMORY_MB=6144`)፦

| Bundler   | የContainer ገደብ | ውጤት                              |
| --------- | -------------- | -------------------------------- |
| Turbopack | 8 GiB / 16 GiB | በሁለቱም ላይ ያለማስጠንቀቂያ OOM-killed ሆነ |
| webpack   | 8 GiB          | build worker SIGKILLed ሆነ        |
| webpack   | 12 GiB         | ተሳካ፣ ከፍተኛው 11.1 GiB ደረሰ          |

### የአሂድ-ጊዜ ነባሪዎች

በ`runner-base` ወደ ውጭ የሚላኩ ነባሪዎች፦ `PORT=20128`፣ `HOSTNAME=0.0.0.0`፣ `OMNIROUTE_MEMORY_MB=1024`፣ `NODE_OPTIONS=--max-old-space-size=1024`፣ `DATA_DIR=/app/data`፣ `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`።

በDocker ውስጥ የማህደረ ትውስታ ባህሪ፦

- ምስሉ `OMNIROUTE_MEMORY_MB=1024` ያዘጋጃል፣ ከእሱም `NODE_OPTIONS=--max-old-space-size=1024` ያመነጫል።
- ትክክለኛው የሰርቨር ሂደት የሚጀምረው `OMNIROUTE_MEMORY_MB`ን በሚያነብና `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`ን በሚጨምር ራሱን ችሎ በሚሰራው ማስጀመሪያ ነው።
- Node በተደጋጋሚ ከተሰጡት `--max-old-space-size` እሴቶች የመጨረሻውን ይጠቀማል፤ ስለዚህ `OMNIROUTE_MEMORY_MB`ን ማዘጋጀት ተግባራዊውን የDocker heap ገደብ ይቆጣጠራል።
- ምስሉ ሁልጊዜ ይህን ስለሚያዘጋጅ፣ የማስጀመሪያው በራሱ RAM መጠን የተመጠነ አማራጭ በDocker ስር ፈጽሞ ጥቅም ላይ አይውልም። ለሥራው ጫና በግልጽ ያሳድጉት (ከታች ያለውን ሰንጠረዥ ይመልከቱ)። `2048` እንኳን ለcoding-agent `/v1/responses` አሁንም በጣም ትንሽ ነው።

### ለኮድ አዘጋጅ ወኪሎች የማስኬጃ RAM

የ1 GiB Docker ነባሪው ለዳሽቦርድ/ቀላል ውይይት ዝቅተኛ መነሻ እንጂ የምርት አገልግሎት መጠን አይደለም። ረጅም `POST /v1/responses` ይዘቶች (በመቶዎች የሚቆጠሩ መልዕክቶች፣ በአስርዎች የሚቆጠሩ መሣሪያዎች) በመጭመቅ ወቅት በርካታ በማህደረ ትውስታ ውስጥ ያሉ ግራፎችን ይዘው ይቆያሉ። ሁለት ተደራራቢ ~3 MiB / ~750k-token ጥያቄዎች V8ን በ**12 GiB** old-space (`FATAL ERROR: Reached heap limit`) ላይ አቋርጠውታል፣ እንዲሁም የ16 GiB cgroup OOM ገደብን ደርሰዋል። [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)ን ይመልከቱ።

የ**cgroup `--memory`ን ከheap በላይ ያድርጉ** — native buffers፣ SQLite እና የመጭመቂያ መካከለኛ ውሂቦች ከV8 ውጭ ይቀመጣሉ።

| የሥራ ጫና                               | `OMNIROUTE_MEMORY_MB` | Container / cgroup     | ማስታወሻዎች                                                                 |
| ------------------------------------ | --------------------- | ---------------------- | ----------------------------------------------------------------------- |
| ዳሽቦርድ፣ አንድ ቀላል ውይይት                  | `1024` (የምስሉ ነባሪ)     | ≥2 GiB                 |                                                                         |
| አንድ የኮድ አዘጋጅ ወኪል (Claude/Codex/Grok) | `8192`                | ≥10 GiB                | የተለመደ የአንድ ክፍለ ጊዜ `/v1/responses`                                       |
| ሁለት በአንድ ጊዜ የሚሰሩ ረጅም `/v1/responses` | `10240`–`12288`       | ≥12–16 GiB             | በ~12 GiB heap ላይ የተለካ የV8 መቋረጥ                                          |
| ሦስት+ በአንድ ጊዜ የሚሰሩ ረጅም contexts       | በአንድ process ላይ አያድርጉ | በተከታታይ ያስኪዱ / ተጨማሪ RAM | የከባድ ጫና ነባሪ መቀበያ 1 in-flight ነው፤ RAMን ሳይጨምሩ ይህን ማሳደግ መቋረጡን እንደገና ያስከትላል |

`OMNIROUTE_MEMORY_MB` **ካልተዘጋጀ**፣ በbare metal ላይ ያለው `omniroute serve` ከRAM ውስጥ ~35% ያህሉን (`[512, 4096]` ውስጥ ተገድቦ) ያመጣጥናል። Docker ሁልጊዜ `1024` ስለሚያዘጋጅ፣ ይህ ማመጣጠን በይፋዊው ምስል ውስጥ ፈጽሞ አይሰራም።

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## ወሳኝ የአካባቢ ተለዋዋጮች

በ[ENVIRONMENT.md](../reference/ENVIRONMENT.md) ውስጥ ከተመዘገቡት ነባሪ ቅንብሮች በተጨማሪ፣ በDocker ስር ሲያሄዱ የሚከተሉት ተለዋዋጮች ከፍተኛ ጠቀሜታ አላቸው፦

| ተለዋዋጭ                         | ዓላማ                                                                                                                                                                                                                                  | ነባሪ                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | ለWebSocket ድልድይ የሚያገለግል የጋራ ምስጢር። **በproduction ውስጥ ያስፈልጋል** — ወደ ጠንካራ የዘፈቀደ ሕብረቁምፊ ያዘጋጁት።                                                                                                                                           | አልተዘጋጀም (መቅረብ አለበት)    |
| `REDIS_URL`                   | ለrate limiter / cache backend የግንኙነት ሕብረቁምፊ                                                                                                                                                                                          | `redis://redis:6379`   |
| `REDIS_PORT`                  | አብሮ ለተካተተው Redis container የhost-side port                                                                                                                                                                                           | `6379`                 |
| `REDIS_BIND_HOST`             | አብሮ የተካተተው Redis port የሚታተምበት የhost interface (AUTH ካላከሉ በስተቀር loopback)                                                                                                                                                             | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ለራስ-ማዘመን workflows በ`cli` profile ውስጥ በ`/workspace/omniroute` ላይ የሚጫን የhost path                                                                                                                                                     | `.` (የአሁኑ directory)   |
| `OMNIROUTE_MEMORY_MB`         | ለDocker standalone server የruntime Node heap ከፍተኛ ገደብ፤ ከላይ ያለውን የimage ነባሪ ይተካል። ለcoding agents፦ `8192`+ ([runtime RAM](#runtime-ram-for-coding-agents)ን ይመልከቱ)።                                                                     | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | ለdashboard (20128) እና API (20129) የሚጋለጡ portsን ይተኩ                                                                                                                                                                                   | `20128` / `20129`      |
| `APP_BIND_HOST`               | docker-compose የdashboard/API/live-WS portsን የሚያትምበት የhost interface። `REQUIRE_API_KEY=false` (ነባሪው) ሲሆን፣ `0.0.0.0` ማንነቱ ያልተረጋገጠውን `/v1` proxy ለLAN ያጋልጣል — ወሰኑን ያስፉት `REQUIRE_API_KEY=true` ከሆነ ወይም ከፊት ለፊቱ reverse proxy ካለ ብቻ ነው። | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | docker-compose የ`cliproxyapi` sidecarን የሚያትምበት የhost interface — የdata volume የprovider credentialsን ይይዛል።                                                                                                                           | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | የruntime plugin scanner የሚያነብበትና የሚጭንበት directory። plugins በbind-mount ሲደረጉ ያዘጋጁት፦ ነባሪው `HOME`ን ይከተላል፣ ይህንም image ወደ ውጭ export ላያደርግ ይችላል።                                                                                           | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | መተግበሪያው ከreverse proxy ጀርባ ሲታተም የURL subpath (ለምሳሌ፦ `/omniroute`)                                                                                                                                                                    | _(ባዶ = root)_          |
| `NEXT_PUBLIC_BASE_URL`        | subpathን ጨምሮ ይፋዊ የbrowser origin (ለምሳሌ፦ `https://host/omniroute`)                                                                                                                                                                    | አልተዘጋጀም                |
| `PROD_DASHBOARD_PORT`         | ለ`docker-compose.prod.yml` የhost-side dashboard port                                                                                                                                                                                 | `20130`                |
| `CLIPROXYAPI_PORT`            | ለ`cliproxyapi` sidecar የhost-side port                                                                                                                                                                                               | `8317`                 |

## በንዑስ ዱካ ላይ Reverse Proxy (Traefik / nginx)

የNext.js `basePath` ወደ standalone bundle ውስጥ ይካተታል። OmniRoute በተተገበሪያው መነሻ ላይ ባለ sentinel ፋይል ውስጥ የተካተተውን
እሴት ይመዘግባል (በ`npm run build` ጊዜ ይጻፋል፤ በ
`scripts/docker/ensure-docker-base-path.mjs` ይነበባል) እና container-ው ሲጀምር ከ
`OMNIROUTE_BASE_PATH` ጋር ያነጻጽረዋል። እሴቶቹ ሲለያዩ እና image-ው ለዶሜኑ root
የተገነባ ከሆነ፣ entrypoint-ው standalone manifests፣ የተካተቱትን
`basePath`/`assetPrefix` literals (Next 16 የSSR asset URL-ዎችን ከ
`assetPrefix` ብቻ ያቀርባል — patcher-ው ንዑስ ዱካውን በዚያ ውስጥም ያንጸባርቃል)፣ የተካተቱትን
`/_next/static` asset URL-ዎች (client-reference manifests፣ media imports፣ አስቀድመው የተቀረጹ
የስህተት ገጾች) እና የclient `process.env` shim-ን፣ `node dev/run-standalone.mjs`
ከመሄዱ በፊት እንደገና ይጽፋል።

### Compose build (የሚመከር)

image-ውና runtime-ው እንዲጣጣሙ ሁለቱንም variables በ`.env` ውስጥ ያዘጋጁ፣ ከዚያም እንደገና ይገንቡ፦

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH`-ን እንደ Docker build-arg እና እንደ
runtime environment variable ያስተላልፋል።

### አስቀድሞ የተገነባ root image + runtime ንዑስ ዱካ

የታተሙት `diegosouzapw/omniroute:*` images ለዶሜኑ root የተገነቡ ናቸው። ቢሆንም
በruntime ጊዜ `OMNIROUTE_BASE_PATH`-ን ማዘጋጀት ይችላሉ፤ container-ው ሲጀምር bundle-ውን አንድ ጊዜ ያስተካክላል።
ከሚዛመደው public origin ጋር ያጣምሩት፦

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

reverse proxy-ው **ሙሉውን** ውጫዊ ዱካ እንዲያስተላልፍ ያዋቅሩት (prefix-ውን አያስወግዱ)።
Next.js `/omniroute/...`-ን እንዲቀበልና assets-ን ከ
`/omniroute/_next/...` እንዲያቀርብ፣ Traefik `PathPrefix(`/omniroute`)`-ን ያለ
`StripPrefix` ወደ container-ው መምራት አለበት።

የDocker healthcheck በነቃው `OMNIROUTE_BASE_PATH` prefix የተደረገበትን ቀላል
`/healthz` lifecycle endpoint ይፈትሻል። `/api/monitoring/health` ለሰው/dashboard
ምርመራዎች እንዳለ ይቆያል፤ የcontainer HEALTHCHECK-ን እንደገና ወደዚያ ለማመልከት (ለምሳሌ
ጥልቅ የጤና ሁኔታ ማስፈጸሚያ)፣ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` ያዘጋጁ።
ይህ ዱካ **ጥልቅ** ምርመራ ነው (DB + monitoring summary) — እንደገና ለመጠቀም ከመረጡ ለDocker
አልፎ አልፎ ለሚካሄደው `HEALTHCHECK` ተስማሚ ነው፣ ነገር ግን ለKubernetes `livenessProbe`
ክፍተቶች **ተስማሚ አይደለም**።

ለorchestrators (Kubernetes፣ Nomad፣ ወዘተ)፦

| Probe           | የሚመረጠው                                                        | የሚወገደው                                              |
| --------------- | ------------------------------------------------------------- | --------------------------------------------------- |
| Liveness        | HTTP `GET /livez`፣ ወይም በዋናው port ላይ TCP (`PORT`፣ ነባሪ `20128`) | `/api/monitoring/health`ን እንደ liveness              |
| Readiness       | HTTP `GET /healthz`                                           | event-loop በስራ የተጠመደ መሆኑን እንደ ሞት የሚቆጥሩ አጭር timeouts |
| Deep / blackbox | `/api/monitoring/health`                                      | —                                                   |

`/healthz` የprocess lifecycle-ን (`ok` / `starting` / `stopping`) ሪፖርት ያደርጋል። `/livez`
process-alive ብቻ ነው (handler-ው መሄድ በቻለ ቁጥር 200 ይመልሳል፤
readiness-ን አይጠብቅም)። ሁለቱም አሁንም request handling ከሚጠቀምበት ተመሳሳይ Node event loop ላይ ይሰራሉ፣ ስለዚህ
CPU-bound የcatalog ወይም compression ስራ ሊያዘገያቸው ይችላል — በስራ መጠመድ ≠ መሞት። HTTP probes
ጊዜያቸው ካለፈ TCP liveness-ን ይምረጡ። ሙሉ የprobe መመሪያ፦
[የMonitoring መመሪያ — የKubernetes probe ምክረ ሐሳቦች](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose ከ Caddy ጋር (HTTPS Auto-TLS)

OmniRoute የCaddyን ራስ-ሰር SSL ማቅረብ በመጠቀም በደህንነት ለውጭ ሊቀርብ ይችላል። የዶሜይንዎ DNS A መዝገብ ወደ አገልጋይዎ IP እንደሚያመለክት ያረጋግጡ።

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
      # ለOAuth የመልሶ ጥሪዎች፣ የዳሽቦርድ አገናኞች እና ለሚፈጠሩ ይፋዊ URLs በአሳሽ በኩል የሚታይ መነሻ።
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # ለታቀዱ ሥራዎች / ራስን ለሚጠይቁ ጥያቄዎች ውስጣዊ ከአገልጋይ-ወደ-አገልጋይ URL።
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

Caddy ለላይኛው የመዳረሻ ኮንቴይነር መደበኛ የማስተላለፊያ ራስጌዎችን ያዘጋጃል። OmniRoute
`NEXT_PUBLIC_BASE_URL`ን ለOAuth የመልሶ ጥሪዎች እና ለሚፈጠሩ ይፋዊ
አገናኞች እንደ ቀኖናዊ ይፋዊ መነሻ ይጠቀማል፤ ማረጋገጫ የተደረገላቸው የዳሽቦርድ የጽሑፍ ጥያቄዎች ተመሳሳይ-መነሻ ጥያቄዎችን ከክፍለ-ጊዜ ጋር ከተሳሰረ CSRF
ጥበቃ ጋር ይጠቀማሉ። OmniRoute ይፋዊውን መነሻ ከግልጽ
ውቅር ይልቅ ከታመኑ የተላለፉ ራስጌዎች እንዲወስን ሆን ብለው
ለሚፈልጉባቸው የላቁ ማሰማሪያዎች ብቻ `OMNIROUTE_TRUST_PROXY`ን ያንቁ።

## Cloudflare Quick Tunnel

ለDocker ማሰማሪያዎች የዳሽቦርድ ድጋፍ በ`Dashboard → Endpoints` ላይ በአንድ ጠቅታ የሚነቃ **Cloudflare Quick Tunnel**ን ያካትታል። ለመጀመሪያ ጊዜ ሲነቃ `cloudflared`ን ሲያስፈልግ ብቻ ያወርዳል፣ ወደ የአሁኑ `/v1` መጨረሻዎ ጊዜያዊ tunnel ያስጀምራል፣ እና የተፈጠረውን `https://*.trycloudflare.com/v1` URL ከመደበኛ ይፋዊ URLዎ በታች በቀጥታ ያሳያል።

የመጨረሻ tunnel ፓነሎች (Cloudflare፣ Tailscale፣ ngrok) ንቁ የtunnel ሁኔታን ሳይቀይሩ ከ`Settings → Appearance` ሊታዩ ወይም ሊደበቁ ይችላሉ።

### የTunnel ማስታወሻዎች

- የQuick Tunnel URLs ጊዜያዊ ሲሆኑ ከእያንዳንዱ ዳግም ማስጀመር በኋላ ይቀየራሉ።
- OmniRoute ወይም ኮንቴይነሩ ዳግም ከተጀመረ በኋላ Quick Tunnels በራስ-ሰር አይመለሱም። በሚያስፈልግበት ጊዜ ከዳሽቦርዱ እንደገና ያንቋቸው።
- የሚተዳደረው ጭነት በአሁኑ ጊዜ Linux፣ macOS እና Windowsን በ`x64` / `arm64` ይደግፋል።
- የሚተዳደሩ Quick Tunnels፣ ሀብት በተገደበባቸው የኮንቴይነር አካባቢዎች ጫጫታ የሚፈጥሩ የQUIC UDP ቋት ማስጠንቀቂያዎችን ለማስወገድ በነባሪ HTTP/2 ማጓጓዣን ይጠቀማሉ። የተለየ ማጓጓዣ ከፈለጉ `CLOUDFLARED_PROTOCOL=quic` ወይም `auto` ያዘጋጁ።
- የDocker ምስሎች የስርዓት CA rootsን አካተው ይመጣሉ እና ለሚተዳደረው `cloudflared` ያስተላልፏቸዋል፤ ይህም tunnel በኮንቴይነሩ ውስጥ ሲነሳ የTLS እምነት ውድቀቶችን ያስወግዳል።
- OmniRoute አንድን ነባር binary ከማውረድ ይልቅ እንዲጠቀም ከፈለጉ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`ን ያዘጋጁ።

## የምስል መለያዎች

| ምስል                      | መለያ      | መጠን    | መግለጫ                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | ከፍተኛው **የታተመ** የተረጋጋ SemVer (git `main` አይደለም) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ለGitOps ይህን የመለያ ምድብ ይቆልፉ                      |

ባለብዙ-መድረክ manifest፦ `linux/amd64` + `linux/arm64` native (Apple Silicon፣ AWS Graviton፣ Raspberry Pi)። Docker ተዛማጁን architecture በራስ-ሰር ይመርጣል፤ በARM hosts ላይ AMD64 emulationን ማስገደድ ካስፈለገዎት `--platform linux/amd64`ን ያስተላልፉ።

### የልቀት ቻናሎች

OmniRoute ለተረጋጉ ልቀቶች፣ ንቁ የልቀት-ቅርንጫፍ ሙከራ እና የልማት builds የተለያዩ Docker ቻናሎችን ያትማል።

| ቻናል                             | ምንጭ                         | ተለዋዋጭነት            | የሚመከር አጠቃቀም                                                                                       |
| ------------------------------- | --------------------------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | የተፈረመ/ስሪት የተሰጠው ልቀት         | የማይለወጥ             | ትክክለኛ ልቀትን የሚቆልፉ የምርት ማሰማሪያዎች                                                                     |
| `:latest` / `:latest-web`       | ከፍተኛው **የታተመ** የተረጋጋ SemVer | ተለዋዋጭ የተረጋጋ ጠቋሚ    | ከSemVer የህትመት ሥራ **በኋላ** የተረጋጉ ልቀቶችን ይከተላል — `main`ን ወይም ያልተለቀቁ `release/v*` commitsን **አይከታተልም** |
| `:next` / `:next-web`           | የአሁኑ ነባሪ `release/v*` ቅርንጫፍ | ተለዋዋጭ የቅድመ-ልቀት ጠቋሚ | በንቁው የልቀት ቅርንጫፍ ላይ የገቡ ነገር ግን ገና በተረጋጋ ልቀት ውስጥ ያልገቡ ማስተካከያዎችን መሞከር                                |
| `:main` / `:main-web`           | `main` ቅርንጫፍ                | ተለዋዋጭ የልማት ጠቋሚ     | ለልማት እና ውህደት ሙከራ ብቻ                                                                               |

#### የድር-ክፍለ-ጊዜ አቅራቢዎች፦ የ`-web` ምስሎች

ከላይ ያለው እያንዳንዱ ቻናል ከ`runner-web` stage የተገነባ የ`-web` መለያ (`:latest-web`፣ `:<version>-web`፣ `:next-web`፣ `:main-web`) አለው — ተመሳሳይ ምስል ሲሆን Playwrightን እና Chromium አሳሽን ይጨምራል። መደበኛው ምስል Chromiumን **ሳያካትት** ይቀርባል፤ `gemini-web`፣ `claude-web` እና `claude-turnstile` ያስፈልጋቸዋል።

ውድቀቱ የሚዘገይ እንጂ በማስጀመሪያ-ጊዜ አይከሰትም፦ እነዚያ አቅራቢዎች ሞዴሎቻቸውን ይዘረዝራሉ እና በዳሽቦርዱ ላይ እንደተገናኙ ይታያሉ፤ የመጀመሪያው ጥያቄ ብቻ በሚከተለው ይወድቃል

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

እነዚያን አቅራቢዎች የሚጠቀሙ ከሆነ፣ አሁን ያሉበትን ቻናል የ`-web` መለያ ይጎትቱ — ሌላ ምንም ነገር አይቀየርም። በnpm/CLI ጭነት (የDocker ምስል የሌለው) ተመጣጣኙ የጎደለው ክፍል የአሳሹ binary ነው፦ በhost ላይ `npx playwright install chromium`ን ያሂዱ።

#### የቅድመ-ልቀት ቻናሉን መጠቀም

የ`next` ቻናል ወደ ወቅታዊው ነባሪ `release/v*` ቅርንጫፍ በሚደረግ እያንዳንዱ push እንደገና ይገነባል፣ እንዲሁም ለAMD64 እና ARM64 ይታተማል። የቆዩ የጥገና ቅርንጫፎች በላዩ ላይ ደርበው መጻፍ አይችሉም። ቻናሉ ቀጣዩ የተረጋጋ tag ከመዘጋጀቱ በፊት ወደ ንቁው የልቀት ቅርንጫፍ ለተዋሃዱ ማስተካከያዎች pull ሊደረግ የሚችል image ያቀርባል።

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

ለDocker Compose፣ በተመረጠው profile ጥቅም ላይ የዋለውን image tag ይቀይሩ፣ ከዚያም service-ውን pull አድርገው እንደገና ይፍጠሩ፦

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ደህንነት እና ወደ ቀድሞው ስሪት መመለስ

`next` ተንሳፋፊ የቅድመ-ልቀት ቻናል ነው። ወደ ንቁው የልቀት ቅርንጫፍ በሚደረግ ማንኛውም push ላይ ሊለወጥ ይችላል፣ እና **በproduction ውስጥ ለመጠቀም ድጋፍ አይደረግለትም**። አንድን የተወሰነ build በሚገመግሙበት ጊዜ image digest-ን pin ያድርጉ፦

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ከመሞከርዎ በፊት የOmniRoute data volume ወይም bind-mounted data directory ምትኬ ይያዙ። ወደ ቀድሞው ስሪት ለመመለስ፣ ከዚህ በፊት ጥቅም ላይ የዋለውን የተረጋጋ ስሪት ወይም digest ይመልሱ፣ ከዚያም container-ውን እንደገና ይፍጠሩ፦

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

የrelease-branch build `latest`ን በፍጹም ማንቀሳቀስ አይችልም፤ የተረጋጋውን pointer ከፍ ማድረግ የሚችለው መስፈርቱን የሚያሟላ የተረጋጋ semantic version ብቻ ነው። የ`next` images የrelease image inspection እና CRITICAL ተጋላጭነቶችን የሚከለክለውን gate ይዘው ይቆያሉ።

**`latest` ለgit የወቅታዊነት ዋስትና አይደለም።** በ`main` ወይም በንቁው `release/v*` ቅርንጫፍ ላይ የተዋሃዱ ማስተካከያዎች የተረጋጋ SemVer image ታትሞ publish job `:latest`ን እስኪያሳድገው ድረስ በ`:latest` ውስጥ **አይኖሩም** (ከዚያ SemVer ጋር ተመሳሳይ digest)። GitHub ማስተካከያውን አስቀድሞ እያሳየ ሳለ `latest` የቆመ መስሎ ከታየ፣ የልቀት ቅርንጫፉን ለመሞከር `:next`ን pull ያድርጉ ወይም የSemVer tag-ን ይጠብቁ።

| የሚፈልጉት                                                   | ይጠቀሙ                                    |
| -------------------------------------------------------- | --------------------------------------- |
| መቀየር የሌለበት GitOps / production                           | `:X.Y.Z`ን pin ያድርጉ (ወይም image digest-ን) |
| የታተሙ የተረጋጉ ልቀቶችን መከተል እና በእያንዳንዱ ልቀት ላይ እንደገና መፈጠርን መቀበል | `:latest`                               |
| ያልተለቀቁ `release/v*` commitsን መሞከር                        | `:next` (ለproduction አይደለም)             |
| `main`ን መሞከር                                             | `:main` (ለproduction አይደለም)             |

## ተገኝነት፦ ነባሪ SQLite አንድ ቅጂ ብቻ ነው

መደበኛ Docker / Kubernetes OmniRoute **አንድ Node ፕሮሰስ + አንድ SQLite ጻፊ** ነው። በዚህ ቶፖሎጂ ከፍተኛ ተገኝነት **አይደገፍም**።

| ገደብ                                     | ውጤት                                                                                                                                                                                                                                                                    |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| አንድ ጻፊ                                  | በተመሳሳይ SQLite ፋይል ላይ ብዙ ቅጂዎችን **አያስኪዱ**። ይህ DBውን ያበላሻል።                                                                                                                                                                                                                |
| ዳግም መፍጠር / ዳግም ማስጀመር / HEALTHCHECK ማቋረጥ | በሂደት ላይ ያሉ SSEዎች፣ የዳሽቦርድ ክፍለ-ጊዜዎች እና በማህደረ ትውስታ ያለ ሁኔታ **ሙሉ በሙሉ ይቋረጣሉ**። እያንዳንዱ የተገናኘ ደንበኛ ግንኙነቱ ይቋረጣል። endpoint ባዶ በሚሆንበት ጊዜ የሚመጡ አዲስ ጥያቄዎች OmniRoute JSONን ሳይሆን ከreverse-proxy **`502 Bad Gateway: Unknown error`** ያገኛሉ — ደንበኞች ይህን ከአቅራቢ ብልሽት መለየት አይችሉም (#11015)። |
| ከ`/healthz` ጋር ተመሳሳይ event loop         | ስራ የበዛበት catalog ወይም compression tick የምርመራ ምላሾችን ሊያዘገይ ይችላል፤ ከዚያም አጭር timeout **ብቸኛውን** ቅጂ ዳግም ያስጀምራል።                                                                                                                                                                |

**የምርመራ ማትሪክስ** ([የKubernetes ምርመራ ምክሮችን](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ይመልከቱ):

| ምርመራ       | ዒላማ                                                   | አይጠቀሙበት                                         |
| ---------- | ----------------------------------------------------- | ----------------------------------------------- |
| ሕያውነት      | በ`PORT` ላይ TCP (ነባሪ `20128`)፣ ወይም ቀላል HTTP `/healthz` | `/api/monitoring/health`                        |
| ዝግጁነት      | HTTP `GET /healthz`                                   | የevent-loop ስራ መብዛትን እንደ ሞት የሚቆጥሩ ጥብቅ timeoutዎች |
| ጥልቅ / ለሰዎች | `/api/monitoring/health`                              | ራስ-ሰር kubelet የሕያውነት ምርመራ                       |

**ማሻሻያዎች፦** እያንዳንዱ ክፍለ-ጊዜ እንደሚቋረጥ ይጠብቁ። ከቻሉ ደንበኞችን ቀስ በቀስ ያስወጡ፤ በነባሪ SQLite ላይ rolling update የለም። Compose `restart: unless-stopped` ከDocker `HEALTHCHECK` ጋር ሲሆን containerው Unhealthy በሚሆንበት ጊዜ ብቸኛውን ፕሮሰስ ይተካል — የተፅዕኖው ስፋትም ተመሳሳይ ነው።

ለ**አንድ ቅጂ** የKubernetes ቅንጣቢ (Recreate ያስፈልጋል፤ በአንድ SQLite ፋይል ላይ `replicas`ን አይጨምሩ):

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

የ`preStop` sleep፣ SIGTERM ከመላኩ በፊት kube የService endpointዎችን እንዲያስወግድ ያስችለዋል፤ በዚህም **አዲስ** ትራፊክ እየተዘጋ ያለውን ፕሮሰስ መምታቱን ያቆማል። በሂደት ላይ ያለ `/v1/responses` SSE ከከፍተኛ ወጪ ያላቸው admission leaseዎች ጋር እስከ `SHUTDOWN_TIMEOUT_MS` (ነባሪ 30 ሰከንድ) ድረስ እንዲጠናቀቅ ይጠበቃል (#11015)። አሁንም ፕሮሰሱ ጋር የሚደርሱ አዲስ ጥያቄዎች `503` + `Retry-After: 5` ያገኛሉ። ምትኩ Ready እስኪሆን ድረስ ያለው የRecreate ባዶ-endpoint ክፍተት አሁንም ሙሉ መቋረጥ ነው — ይህ የSQLite ቶፖሎጂ እንጂ የምርመራ የተሳሳተ ውቅር አይደለም።

ውጫዊ Postgres / multi-writer HA **በሰነድ የተደገፈ መደበኛ መንገድ አይደለም**። HA ካስፈለገዎት አንድ ቅጂ ብቻ ይጠቀሙ ወይም ፕሮጀክቱ በተናጠል የፈተነውንና በሰነድ ያቀረበውን ቶፖሎጂ ያስኪዱ። የPostgres/MySQL ሥራው በ[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ውስጥ ይገኛል። ያ እስኪለቀቅ ድረስ **ትልቅ** የ`/v1/responses` አቅምን ለማባዛት የሚደገፈው ብቸኛ መንገድ N እርስ በርሳቸው ገለልተኛ ፕሮሰሶችን ማስኬድ ነው (የሚቀጥለውን ክፍል ይመልከቱ)፤ በአንድ volume ላይ `replicas > 1` ማድረግ አይደለም።

## ስኬል-አውት፦ N ነጻ ሂደቶች

አንድ Node ሂደት **አንድ V8 ሂፕ** ነው። ሁለት ተደራራቢ ~3 MiB / ~~750k-token የኮዲንግ-ወኪል `POST /v1/responses` (RTK + Caveman) ጥያቄዎች በ~~12 Gi ላይ ያንን ሂፕ ያቋርጣሉ (`FATAL ERROR: Reached heap limit`) እና 16 Gi cgroupን OOM ሊያደርጉ ይችላሉ። [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)ን ይመልከቱ። ያ ልኬት የ**ማህደረ ትውስታ-በጀት** ማስጠንቀቂያ ነው፤ በአንድ ጊዜ ለሚሄዱ ሁለት ረጅም `/v1/responses` የምርቱ ጠንካራ ከፍተኛ ገደብ አይደለም። ከባድ የውይይት መግቢያ፣ ከዚያው V8/cgroup ጣሪያ በራስ-ሰር በሚወጣ የውሂብ-ግቤት ባይት በጀት (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ይገደባል፤ ቀድሞ መጠኑ በተወሰነ ሂደት ላይ ከፍ ብሎ መተካት (ወይም የቆየውን `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` የጥያቄ-ብዛት ገደብ ማዘጋጀት) ማቋረጡን እንደገና ያስከትላል። ትናንሽ ውይይቶች፣ `/healthz`፣ `/v1/models` እና MCP በዚያ ገደብ ውስጥ **አይካተቱም**።

### አንድ-ሂደት፦ ከሁለት በላይ ረጅም `/v1/responses`

**ጤናማ** ሂደት (ሂፑ ከ`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` በታች፣ ነባሪው `0.75`) የሂደቱ አጠቃላይ በሂደት-ላይ ያለ የባይት በጀት (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) በቂ ቦታ ካለው፣ ከሁለት በላይ በአንድ ጊዜ የሚሄዱ ረጅም `POST /v1/responses` ጥያቄዎችን **ሊያስኬድ ይችላል**። `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ነባሪው 256 KiB) የሚደርሱ ወይም የሚበልጡ ይዘቶች ከመዋቅር-ከባድ ጥያቄዎች ጋር ተመሳሳይ የከባድ ሥራ ፈቃድ ይወስዳሉ፣ እንዲሁም ተመሳሳዩን [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ማምለጫ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ይጠቀማሉ። በአንድ ጊዜ የሚገናኙ በአሥርዎች የሚቆጠሩ ረጅም SSE ደንበኞች (ኦፕሬተሮች ብዙውን ጊዜ 40–50 ያስፈልጋቸዋል) የ**ማህደረ ትውስታ-በጀት** ጉዳይ ነው — የሂፕ + ዋና/ትርፍ-አቅም ማስገቢያዎችን + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`ን መጠን ይወስኑ — የምርቱ ጠንካራ “ከፍተኛው 2” ገደብ አይደለም። ጫና ያለበት ሂፕ #7849 እንዳይመለስ አሁንም እንደገና ሊሞከር በሚችል `503` ጥያቄዎችን ይቀንሳል።

**ሂፖችን ለማባዛት** (ነጻ የV8 old-spaces) **ዛሬ**፦

| ያድርጉ                                                                                                                           | አያድርጉ                                              |
| ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| **N containers/pods**ን ያስኪዱ፤ እያንዳንዳቸውም የራሳቸው `DATA_DIR` / volume ይኑራቸው                                                         | በአንድ SQLite ፋይል ላይ `replicas > 1` አያዘጋጁ            |
| የከባድ በሂደት-ላይ ሥራ + የጤናማ ትርፍ-አቅምን ከሂፕ / በሂደት-ላይ የባይት በጀት በመነሳት መጠን ይወስኑ፤ 1–2 ጥንቃቄ የተሞላበት የ#7849 ነባሪ እንጂ የምርቱ ጠንካራ ከፍተኛ ገደብ አይደለም | ለአንድ ሂደት 8× RAM እና ወሰን የሌለው የብዛት ገደብ አይስጡ          |
| አማራጭ፦ `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` ለ**የጋራ ኮታ ቆጣሪዎች**                                                   | Redisን እንደ የጋራ SQLite አይቁጠሩት — እንደዚያ አይደለም         |
| የአቅራቢ ምስጢሮችን ወደ እያንዳንዱ instance ይቅዱ (ወይም የተከፋፈሉ dashboardsን ይቀበሉ)                                                              | በinstances መካከል አንድ dashboard / አንድ call-log አይጠብቁ |
| ከፊት ማንኛውንም load balancer ያስቀምጡ፤ በAPI key ወይም session የሚጣበቅ ማስተላለፍ በቂ ነው                                                        | ለአንድ አቅራቢ የተወሰነ መጠን-አዋቂ middleware አያስፈልግዎት        |

ሃርድዌር፦ በእያንዳንዱ instance በአንድ ጊዜ የሚሄዱ ረጅም `/v1/responses` ጥያቄዎች የ**ማህደረ ትውስታ-በጀት** ጉዳይ ናቸው (ሂፕ + በሂደት-ላይ ያለ ባይት / #10110)። ነጻ `DATA_DIR`ዎች ያላቸው `N` instances አሁንም ሂፖችን ያባዛሉ፦ የhost RAM `N × cgroup`ን መሸፈን አለበት፤ “N=8 ያለው አንድ 16 Gi pod” አይደለም። በአንድ SQLite ፋይል ላይ `replicas > 1`ን በፍጹም አይጠቀሙ።

የCompose ንድፍ (ሁለት ሂፖች፣ ሁለት volumes — `deploy.replicas: 2` አይደለም)፦

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

በሂደት ውስጥ ያለ ጥግግት (compressionን ከHTTP isolate ውጭ ማድረግ) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ነው። በጋራ ዘላቂ state ላይ ያለ አንድ ሎጂካዊ cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ነው።

## በDocker ውስጥ የGemini ክልላዊ ስህተቶች

Google AI Studio / Gemini API HTTP 400ን ከFAILED_PRECONDITION እና
`User location is not supported for the API use.` ጋር ሊመልስ ይችላል። በአስተናጋጁ ላይ የተሳካ ጥያቄ
ኮንቴይነሩ ተመሳሳይ የወጪ መስመርን እንደሚጠቀም አያረጋግጥም። የDNS ቅደም ተከተል፣
የIPv4/IPv6 ግንኙነት፣ የVPN ማዘዋወር እና የተዋቀሩ ፕሮክሲዎች ሊለያዩ ይችላሉ።
[Google የሚደግፋቸውን ክልሎች](https://ai.google.dev/gemini-api/docs/available-regions)
እንዲሁም ትክክለኛውን የግንኙነት መስመር ያረጋግጡ፤ ይህ ስህተት ብቻውን የተሳሳተ API ቁልፍን አያመለክትም።

### ለተወሰነ ግንኙነት የተመደበ ፕሮክሲን ይምረጡ

ለተጎዳው የGemini ግንኙነት የOmniRouteን [የየግንኙነት ፕሮክሲ ውቅር](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ይጠቀሙ፤ ከዚያም **ግንኙነትን ፈትሽ** እና በተመሳሳይ ሞዴል አነስተኛ ጥያቄን
እንደገና ያከናውኑ። ይህ የማዘዋወር ለውጡን በዚያ ግንኙነት ብቻ ይገድባል።
ፕሮክሲው ከኮንቴይነሩ ሊደረስበት እንደሚችል እና ግንኙነቱ በእርግጥ እሱን
እንደሚመርጥ ያረጋግጡ። መስመሩን መቀየር በዋናው አገልግሎት በኩል ያለውን ክልላዊ ብቁነት ዋስትና አይሰጥም።

### የአስተናጋጁን እና የኮንቴይነሩን አውታረ መረብ ያወዳድሩ

የተረጋገጡ ውጤቶችን ሲያወዳድሩ ቁልፉን፣ ሞዴሉን እና ጥያቄውን ተመሳሳይ ያድርጉ፤
የመግቢያ ማስረጃዎችን፣ የፕሮክሲ የይለፍ ቃሎችን ወይም ሙሉ የፈቃድ ራስጌዎችን በችግር ሪፖርት ውስጥ ፈጽሞ
አይለጥፉ። በመጀመሪያ፣ ተመሳሳይ ትዕዛዝን በአስተናጋጁ እና በኮንቴይነሩ ውስጥ
በመጠቀም የOS መፍቻው የትኞቹን የአድራሻ ቤተሰቦች እንደሚያቀርብ ይመርምሩ፦

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute`ን በሚያስኬዱት አገልግሎት ይተኩት (ለምሳሌ፣ `omniroute-web`)። እነዚህ
ትዕዛዞች የመግቢያ ማስረጃዎችን ወይም IP አድራሻዎችን ሳያሳዩ የአድራሻ ቤተሰቦችን ያትማሉ። የተመለሰ `6`
የIPv6 DNS ውጤትን ብቻ ያሳያል፤ ሊሠራበት የሚችል የIPv6 መስመር ወይም የAPI መዳረሻ መኖሩን
**አያረጋግጥም**። `curl` በተጫነባቸው ቦታዎች፣ በሁለቱም አካባቢዎች
`curl -4 -I https://generativelanguage.googleapis.com`ን ከ
`curl -6 -I https://generativelanguage.googleapis.com` ጋር ያወዳድሩ።
የHTTP ምላሽ፣ ያልተረጋገጠ ስህተት ቢሆንም፣ ለዚያ ሙከራ ግንኙነት መኖሩን ያረጋግጣል፤
የGemini ብቁነትን የሚፈትሸው የተረጋገጠው የሞዴል ጥያቄ ብቻ ነው።

### በአስተናጋጅ ደረጃ ያለ አማራጭ፦ የሚሠራ IPv6 እና የመፍቻ መመሪያ

የ[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ሪፖርት አቅራቢ
የኮንቴይነር IPv6ን በማንቃት እና የglibc አድራሻ ምርጫን በመቀየር በአካባቢያቸው
መዳረሻውን መልሰዋል። ይህን እንደ አካባቢ-ተኮር አማራጭ ይቁጠሩት። የመፍቻ ምርጫዎችን ከማስተካከልዎ በፊት
የሚሠራ የአስተናጋጅ IPv6፣ የኮንቴይነር የወጪ ግንኙነት/ማዘዋወር እና የፋየርዎል ደንቦችን ያረጋግጡ።
የግል ULA አድራሻ ብቻውን የወል IPv6 ግንኙነት መኖሩን አያረጋግጥም።

አስቀድመው ከCompose ነባሪ አውታረ መረብ ጋር ለተያያዙ አገልግሎቶች፣ ይህ ቁራጭ
በዚያ አውታረ መረብ ላይ IPv6ን ያነቃል፤ የቀሩትን አገልግሎትዎን፣ ports፣ volumes እና ውቅር እንዳሉ ያቆዩ፦

```yaml
networks:
  default:
    enable_ipv6: true
```

ለተሰየመ አውታረ መረብ፣ አገልግሎቱ በትክክል በሚቀላቀለው አውታረ መረብ ላይ ያንቁት። Docker
የULA subnet ሊመድብ ይችላል፤ ግልጽ የሆነና የማይደራረብ subnet የሚምረጡት አውታረ መረብዎ
ሲፈልገው ብቻ ነው። [Docker IPv6 አውታረ መረብ](https://docs.docker.com/engine/daemon/ipv6/)
እና [የCompose አውታረ መረብ አማራጮች](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)ን ይመልከቱ።

በ**glibc-based image** ላይ፣ `/etc/gai.conf` የአድራሻ ምርጫን ሊቀይር ይችላል። የአሁኑ
የrepository Dockerfile Debianን ይጠቀማል፤ ብጁ musl-based images ይህን ዘዴ አይጋሩም።
በሪፖርቱ የቀረበው ማስተካከያ የULA labelን ከ`label fc00::/7 6` ወደ
`label fc00::/7 1` ይቀይራል። ከimage ሙሉ የመመሪያ ሰንጠረዥ ይጀምሩ እና ሌሎቹን
ግቤቶች ያቆዩ፤ የ`label` ወይም `precedence` ግቤት ማከል ያንን ነባሪ ሰንጠረዥ ይተካል፣ ስለዚህ
የተቀየረውን መስመር ብቻ የያዘ ፋይል በቂ አይደለም።
[የglibc ውቅር ማጣቀሻ](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
እነዚያን የአሠራር ደንቦች ይመዘግባል። የተገመገመውን ፋይል በ`/etc/gai.conf`
ላይ ለንባብ ብቻ bind-mount ያድርጉት እና ለውጡን ለመተግበር አገልግሎቱን እንደገና ይፍጠሩ።

ይህ በ**ዚያ ኮንቴይነር ውስጥ ላለው ሁሉም የወጪ ትራፊክ** የOS አድራሻ ምርጫን ይቀይራል።
እያንዳንዱ መተግበሪያ IPv6ን እንዲመርጥ አያስገድድም፤ የNode DNS ቅደም ተከተል እና የግንኙነት
ምርጫም አስፈላጊ ናቸው። በተለይ፣ `--dns-result-order=ipv4first` IPv4ን ይመርጣል እና
ለIPv4-ብቻ ውድቀት መፍትሔ አይደለም። [የNode DNS ቅደም ተከተል](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)ን ይመልከቱ።

ማንኛውንም በአስተናጋጅ ደረጃ የሚደረግ ለውጥ ካደረጉ በኋላ Geminiን እና ሌሎች አቅራቢዎችዎን እንደገና ይፈትሹ። ወደነበረበት ለመመለስ፣
ብጁ የ`gai.conf` mountን ያስወግዱ፣ የቀድሞውን የአውታረ መረብ ውቅር ይመልሱ እና
በጥገና ጊዜ የተጎዳውን አገልግሎት/አውታረ መረብ እንደገና ይፍጠሩ። አውታረ መረብን እንደገና መፍጠር
ከእሱ ጋር የተያያዙ ሌሎች ኮንቴይነሮችን ሊያቋርጥ ይችላል፤ ቋሚ የውሂብ volumeን አይሰርዙ።

## ጠቃሚ ማስታወሻዎች

- **SQLite WAL ሁነታ፦** OmniRoute የቅርብ ጊዜ ለውጦችን ወደ `storage.sqlite` checkpoint ማድረጉን እንዲያጠናቅቅ፣ `docker stop` ለመጨረስ በቂ ጊዜ ሊሰጠው ይገባል። አብረው የተካተቱት Compose ፋይሎች አስቀድመው የ40 ሰከንድ የማቆሚያ የእፎይታ ጊዜ አዘጋጅተዋል። image-ውን በቀጥታ የሚያስኬዱ ከሆነ፣ `--stop-timeout 40` እንዳለ ያቆዩት።
- **`DISABLE_SQLITE_AUTO_BACKUP`፦** መደበኛ/ከመጻፍ-በፊት ምትኬዎች በውጫዊ ሁኔታ የሚተዳደሩ ከሆነ ወደ `true` ያዋቅሩት። ነባር የውሂብ ጎታ ፍልሰቶች አሁንም የራሳቸውን ዘላቂ የደህንነት snapshot እና የጅምላ ፍልሰት መከላከያ ይፈልጋሉ።
- **የውሂብ ቋሚነት፦** በcontainer ዳግም ማስጀመሮች መካከል የውሂብ ጎታዎን፣ ቁልፎችዎን እና ውቅሮችዎን ለማቆየት ሁልጊዜ volume ወደ `/app/data` mount ያድርጉ።
- **የፖርት ውቅር፦** ነባሪውን `20128` ፖርት ለመቀየር `PORT` የአካባቢ ተለዋዋጭን override ያድርጉ።

## እንዲሁም ይመልከቱ

- [የVM ማሰማሪያ መመሪያ](../ops/VM_DEPLOYMENT_GUIDE.md) — የVM + nginx + Cloudflare ማዋቀር
- [የFly.io ማሰማሪያ መመሪያ](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — ወደ Fly.io ያሰማሩ
- [የአካባቢ ውቅር](../reference/ENVIRONMENT.md) — የተሟላ `.env` ማጣቀሻ
