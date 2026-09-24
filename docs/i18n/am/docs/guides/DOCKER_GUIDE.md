# 🐳 Docker Guide — OmniRoute (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> የተሟላ የDocker ማሰማሪያ ማጣቀሻ። በፍጥነት ለመጀመር [የREADME Docker ክፍልን](../README.md#-docker) ይመልከቱ።

## ማውጫ

- [ፈጣን ማስኬድ](#quick-run)
- [ከአካባቢ ፋይል ጋር](#with-environment-file)
- [Docker Compose](#docker-compose)
- [የሚገኙ መገለጫዎች](#available-profiles)
- [OmniRoute በDocker ውስጥ ሲሄድ የአስተናጋጁን CLI መሣሪያዎች ማዋቀር](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [የምርት Compose](#production-compose)
- [የDockerfile ደረጃዎች](#dockerfile-stages)
- [ወሳኝ የአካባቢ ተለዋዋጮች](#critical-environment-variables)
- [Docker Compose ከCaddy (HTTPS) ጋር](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ፈጣን Tunnel](#cloudflare-quick-tunnel)
- [የImage መለያዎች](#image-tags)
- [ተገኝነት፦ ነባሪው SQLite ነጠላ-ቅጂ ነው](#availability-default-sqlite-is-single-replica)
- [አስፈላጊ ማስታወሻዎች](#important-notes)

---

## ፈጣን ማስኬድ

> **በአንድ ትዕዛዝ በራስዎ ማስተናገድ ይፈልጋሉ?**
> [በራስዎ የማስተናገድ መመሪያን](../getting-started/SELF_HOST_GUIDE.md) ይመልከቱ —
> `docker compose -f docker-compose.selfhost.yml up -d` (የታተመ image +
> Redis፣ loopback ብቻ፣ የprofile ምርጫ የለም)። ከታች ያለው ፈጣን ማስኬድ Redisን በሌላ ቦታ
> አስቀድመው ለሚያስኬዱ ተጠቃሚዎች የታሰበ የአንድ-container መንገድ ነው።

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
# መጀመሪያ .envን ይቅዱ እና ያርትዑ
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
# መሠረታዊ መገለጫ (የCLI መሣሪያዎች የሉትም)
docker compose --profile base up -d

# የCLI መገለጫ (Claude Code፣ Codex፣ OpenClaw አብረው የተካተቱ)
docker compose --profile cli up -d

# የአስተናጋጅ መገለጫ (በዋናነት ለLinux፤ የአስተናጋጁን CLI ሁለትዮሾች ለንባብ ብቻ ይጭናል)
docker compose --profile host up -d

# የድር መገለጫ (ለድር-ክፍለ-ጊዜ አቅራቢዎች Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecarን ያጣምሩ
docker compose --profile cli --profile cliproxyapi up -d
```

## የሚገኙ ፕሮፋይሎች

OmniRoute ለዋና ዋና የማሰማሪያ ቅርጾች Compose ፕሮፋይሎችን ይዞ ይመጣል። ከአካባቢዎ ጋር የሚዛመደውን ይምረጡ።

| ፕሮፋይል         | አገልግሎት           | መቼ መጠቀም እንዳለብዎ                                                                                                          | ትዕዛዝ                                         |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ነባሪ)  | `omniroute-base` | ገጽታ-አልባ ሰርቨር / አነስተኛ የማስኬጃ አካባቢ፤ የአቅራቢ CLI-ዎች አብረው አልተካተቱም                                                              | `docker compose --profile base up -d`        |
| `cli`         | `omniroute-cli`  | `omniroute providers/setup/doctor`ን እና አብረው የተካተቱ CLI-ዎችን (Codex, Claude Code, Droid, OpenClaw) የሚጠሩ ወኪላዊ የሥራ ፍሰቶች      | `docker compose --profile cli up -d`         |
| `host`        | `omniroute-host` | `~/.local/bin`፣ `~/.codex`፣ `~/.claude` ወዘተን ለንባብ ብቻ በመጫን ወደ አስተናጋጅ CLI-ዎች `network_mode`-የመሰለ መዳረሻ የሚፈልጉ Linux አስተናጋጆች | `docker compose --profile host up -d`        |
| `cliproxyapi` | `cliproxyapi`    | ወደላይኛው የCLI ፕሮክሲ ለማድረግ የ[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) የጎን ኮንቴይነርን በፖርት `8317` ላይ ያስኪዱ     | `docker compose --profile cliproxyapi up -d` |
| `web`         | `omniroute-web`  | አሳሽ የሚያስፈልጋቸው የድር-ክፍለ-ጊዜ አቅራቢዎች፦ `gemini-web`፣ `claude-web`፣ `claude-turnstile` (`runner-web`ን ይገነባል፣ Chromium ተካትቷል)   | `docker compose --profile web up -d`         |

> ብዙ ፕሮፋይሎችን በአንድ ላይ ማጣመር ይቻላል፦ `docker compose --profile cli --profile cliproxyapi up -d`።

## OmniRoute በDocker ውስጥ ሲሠራ የhost CLI መሣሪያዎችን ማዋቀር

`omniroute setup-codex`፣ `setup-claude`፣ `config set <tool>` እና የdashboard
**ውቅር አስቀምጥ** አዝራር ሁሉም እንደ `~/.codex/*.config.toml` ያሉ ፋይሎችን ይጽፋሉ። እነዚህ ዱካዎች
ትርጉም የሚኖራቸው CLIው በትክክል በሚሠራበት ማሽን ላይ ብቻ ነው። በcontainer
ውስጥ ካስኬዷቸው ጽሑፉ በcontainerው የራሱ home (`/home/node` —
imageው `USER node` በመጠቀም ይሠራል) ውስጥ ያርፋል፤ እዚያም ምንም የhost CLI ፈጽሞ አያነበውም፣ እንዲሁም
containerው እንደገና በተፈጠረበት ቅጽበት ይጣላል።

OmniRoute ይህን ሁኔታ ፈልጎ ያገኝና ሊጠቀሙበት የማይችሉትን ስኬት ከመዘገብ ይልቅ
መመሪያዎችን በማቅረብ ጽሑፉን ይከለክላል፦ CLIው `2` በሚለው ኮድ ይወጣል፣ APIው ደግሞ `422`
እና `containerEphemeralTarget: true` ይመልሳል።

### የሚመከር፦ CLIውን በhost ላይ፣ OmniRouteን በDocker ውስጥ ያስኪዱ

containerው APIውን ያቀርባል፤ CLIው ደግሞ የhost መሣሪያዎችዎን ያዋቅራል።

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLIውን ወደ containerው ያመልክቱ
omniroute setup-codex                      # በhostዎ ላይ ያለውን ትክክለኛ ~/.codex ይጽፋል
```

Codex፣ Claude Code፣ Cursor ወይም ተመሳሳይ መሣሪያዎች በlaptopዎ ላይ ሲሠሩ ይህ
ትክክለኛው ምርጫ ነው — ይህም የተለመደው አወቃቀር ነው።

### አማራጭ፦ የhost ውቅር ማውጫዎችን bind-mount ያድርጉ (`host` profile)

containerው ራሱ የhost ውቅርዎን እንዲጽፍ ከፈለጉ፣
ማውጫዎቹን mount አድርገው ያስገቡና `CLI_CONFIG_HOME`ን ወደ mount root ያመልክቱ። `host` profile
ይህንን አስቀድሞ ያደርጋል፦

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

ዱካውን አስተማማኝ የሚያደርገው bind mount ነው፦ OmniRoute
`/proc/self/mountinfo`ን ያነባል፣ እንዲሁም mounted ለሆኑ ዱካዎች (እና ልጅ ማውጫዎቻቸው mount ለሆኑ
ማውጫዎች፤ ይህም ከላይ ያለውን የ`/host-home` ቅርጽ በትክክል ይገልጻል) መጻፍን ይፈቅዳል፤
mounted ያልሆኑትን ግን አሁንም ይከለክላል።

### የአደጋ ጊዜ መውጫ፦ የcontainerውን የራሱ CLIs ያዋቅሩ (በጥንቃቄ ይጠቀሙ)

CLIs በእርግጥ በcontainerው ውስጥ በሚኖሩበት ጊዜ (`cli` profile)፣ መጻፉ
የታሰበ ነው። `--allow-container-write`ን ለማንኛውም `setup-*` ትእዛዝ ያስተላልፉ፣ ወይም ለserverው
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ያዘጋጁ። ጽሑፉ containerው ከጠፋ በኋላ
እንደማይቆይ ከሚገልጽ ማስጠንቀቂያ ጋር ይቀጥላል።

> **የደህንነት ማስጠንቀቂያ — `cli` profile + `docker.sock` mount።**
> የ`cli` profileው `/var/run/docker.sock`ን bind-mount ያደርጋል፤ ይህም በcontainer ውስጥ ያለው
> auto-updater ከhost daemon stackውን እንደገና እንዲፈጥር ያስችለዋል
> (`src/lib/system/autoUpdate.ts` ያንን socket መኖሩን ይመረምራል፣ ከሌለ ደግሞ
> የDocker ዱካውን ይዘላል)። ያ socket **የhost-root እምነት
> ወሰን** ነው፦ ሊደርስበት የሚችል ማንኛውም ነገር የhost Docker daemonን እንደ
> root ያንቀሳቅሳል — በhostው ላይ ያለን ማንኛውንም container መፍጠር፣ መመርመር፣ ማቆም እና ማስወገድ ይችላል።
> አንድምታዎቹ፦
>
> 1. **የ`cli` profileውን port ፈጽሞ ለnetwork አያጋልጡ።** በ
>    `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`) ላይ ያትሙት
>    — LAN ላይ ሊደረስበት የሚችል `cli` profile ማንኛውንም የdashboard-ደረጃ RCE ወደ
>    ሙሉ የhost መጣስ ይለውጣል።
> 2. **ተጨማሪ የhost ማውጫዎችን ወደ `cli` profile አታስገቡ።**
>    የDocker socket ከማንኛውም ተጨማሪ mount ጋር ሲሆን containerው የfilesystemዎን እና የhost ውቅርዎን
>    ሙሉ በሙሉ እንዲያነብና እንዲጽፍ ያስችለዋል። አንድ መሣሪያ projectን ማየት ካስፈለገው፣
>    በCLI binaryው በአካባቢው ያስኪዱት — ወደ `cli` container አታስገቡት።
>
> በcontainer ውስጥ auto-update ካላስፈለገዎት፣ `cli` profileውን አያብሩ
> (`COMPOSE_PROFILES=core,redis` ወይም አጭር አማራጭ)። ሌሎቹ profiles
> የDocker socketን mount አያደርጉም።
>
> ከMITM ጋር የተያያዘውን የአደጋ ሞዴል ለማየት `docs/security/MITM-TPROXY-DECRYPT.md`ን (git፤ ወደ `/docs` አልተጠናቀረም) ይመልከቱ፤
> ስለ `codex`/`claude-code`/`droid`/`openclaw` binary ምንጭ ሰንሰለት ደግሞ
> `docs/security/SUPPLY_CHAIN.md`ን ይመልከቱ።

## Redis Sidecar

OmniRoute ለተሰራጨው የጥያቄ መጠን ገዳቢ እና ለጋራ መሸጎጫ Redisን ይጠቀማል። የ`redis` አገልግሎት በ`docker-compose.yml` ውስጥ **ሁልጊዜ ይገለጻል** (የፕሮፋይል ገደብ የለውም) እና ከማንኛውም ሌላ ፕሮፋይል ጋር አብሮ ይጀምራል።

| ዝርዝር                  | እሴት                                  |
| --------------------- | ------------------------------------ |
| ምስል                   | `redis:7-alpine`                     |
| የኮንቴይነር ስም            | `omniroute-redis`                    |
| ውስጣዊ ፖርት              | `6379`                               |
| የሆስት ፖርት (ሊቀየር የሚችል)  | `REDIS_PORT` (ነባሪው `6379`)           |
| የሆስት ማሰሪያ (ሊቀየር የሚችል) | `REDIS_BIND_HOST` (ነባሪው `127.0.0.1`) |
| ቮልዩም                  | `omniroute-redis-data` → `/data`     |
| የጤና ምርመራ              | `redis-cli ping` (በየ10 ሰከንዱ)         |

ተዛማጅ የአካባቢ ተለዋዋጮች፦

- `REDIS_URL` — ወደ መተግበሪያው የሚገባ የግንኙነት ሕብረቁምፊ (በነባሪ `redis://redis:6379`)።
- `REDIS_PORT` — ለRedis ኮንቴይነሩ የሆስት-ወገን ፖርት ማዛመድ።
- `REDIS_BIND_HOST` — ፖርቱ የሚታተምበት የሆስት በይነገጽ። ነባሪው `127.0.0.1` ነው።

> **ለምን loopback በነባሪ እንደሚጠቀም፦** sidecarው ያለ `requirepass` ይሰራል፣ እና የመተግበሪያው
> ኮንቴይነሮች በcompose አውታረ መረብ (`redis:6379`) በኩል ይደርሱበታል — የታተመው ፖርት
> ለሆስት-ወገን መሣሪያዎች (`redis-cli`፣ አካባቢያዊ `npm run dev`) ብቻ ነው። በ
> `0.0.0.0` ላይ ማተም ያልተረጋገጠ Redisን በLANዎ ላይ ላለ እያንዳንዱ ሆስት ያጋልጣል።
> `REDIS_BIND_HOST=0.0.0.0` ካዘጋጁ፣ `--requirepass`ንም ወደ አገልግሎቱ `command:` ያክሉ።

**Redisን ማሰናከል** አይመከርም (የጥያቄ መጠን ገዳቢው ወደ በማህደረ ትውስታ ውስጥ የሚሰራ አማራጭ ዝቅ ይላል)። ግድ ከሆነ፣ በ`docker-compose.yml` ውስጥ ያለውን የ`redis:` አገልግሎት ብሎክ ያስወግዱ/በአስተያየት ያሰናክሉ ወይም ወደ ዜሮ ይመጥኑት፦

```bash
docker compose up -d --scale redis=0
```

## የምርት Compose

ከdev ጎን ለጎን ለሚሰራ የተነጠለ የምርት ቅጽበታዊ ግልባጭ፣ `docker-compose.prod.yml`ን ይጠቀሙ።

| ዝርዝር           | እሴት                                                                           |
| -------------- | ----------------------------------------------------------------------------- |
| ፋይል            | `docker-compose.prod.yml`                                                     |
| ነባሪ የዳሽቦርድ ፖርት | `PROD_DASHBOARD_PORT=20130` (ወደ ውስጣዊ `${DASHBOARD_PORT:-20128}` የተዛመደ)        |
| ነባሪ API ፖርት    | `PROD_API_PORT=20131`                                                         |
| ምስል            | `omniroute:prod` (ከ`runner-cli` ዒላማ የተገነባ)                                    |
| Redis ኮንቴይነር   | `omniroute-redis-prod` (`redis:8.6.2`፣ የተለየ `redis-prod-data` ቮልዩም)           |
| የውሂብ ቮልዩም      | `omniroute-prod-data` (ስም ያለው፣ በድጋሚ ግንባታዎች መካከል የሚቆይ)                         |
| የጤና ምርመራዎች     | `node healthcheck.mjs` + `redis-cli ping`፣ `depends_on` በRedis ጤንነት ላይ የተመሠረተ |

አጠቃቀም፦

```bash
# የምርት ስታኩን ይገንቡ እና ያስጀምሩ
docker compose -f docker-compose.prod.yml up -d --build

# ሎጎችን በቀጥታ ይመልከቱ
docker compose -f docker-compose.prod.yml logs -f

# ያቁሙ እና ያስወግዱ (ቮልዩሞችን ያቆዩ)
docker compose -f docker-compose.prod.yml down
```

የምርት ስታኩ ከdev compose ጋር በትይዩ ይሰራል (የተለያዩ የኮንቴይነር ስሞች፣ ፖርቶች እና ቮልዩሞች አሉት)፣ ስለዚህ ምርት እንደተነሳ ሳለ በአካባቢዎ ላይ ማሻሻልዎን መቀጠል ይችላሉ።

## የDockerfile ደረጃዎች

ማከማቻው ባለብዙ ደረጃ Dockerfile (`Dockerfile`) ይዟል። አራት ደረጃዎች ቀርበዋል፤ ለአጠቃቀምዎ ተገቢውን `target` ይምረጡ።

| ደረጃ           | መሠረታዊ ምስል             | ዓላማ                                                                                                                                                                                                                           |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ጥገኞችን ይጭናል (`npm ci --legacy-peer-deps`) እና `npm run build` ያስኬዳል (በነባሪ Turbopack — ከታች ያለውን የግንባታ ጊዜ ሀብቶች ይመልከቱ)                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | የNext.js ራሱን የቻለ ውጤት ያለው የምርት አሂድ ጊዜ። **ምንም የአቅራቢ CLIዎች አልተካተቱም።**                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | `git`፣ `docker.io`፣ `docker-compose` እና አለምአቀፍ CLIዎችን ይጨምራል፦ `@openai/codex`፣ `@anthropic-ai/claude-code`፣ `droid`፣ `openclaw`። **ወኪል-ተኮር የሥራ ፍሰቶችን ለመጠቀም ይህን ይምረጡ።**                                                         |
| `runner-web`  | `runner-base`         | ለድር-ክፍለ-ጊዜ አቅራቢዎች Playwright + Chromium አሳሽ (`--with-deps`) ይጨምራል፦ `gemini-web`፣ `claude-web`፣ `claude-turnstile`። **እነዚህን አቅራቢዎች ሲጠቀሙ ይህን ይምረጡ** — ያለዚህ ተራው ምስል ጥያቄ በሚቀርብበት ጊዜ ይሳካል (በልቀት ቻናሎች ስር ያለውን የ`-web` ማስታወሻ ይመልከቱ)። |

የተወሰነ targetን በእጅ ይገንቡ፦

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### የግንባታ ጊዜ ሀብቶች

የ`builder` ደረጃ የሚጠቀመውን ሀብት ሦስት የግንባታ ነጋሪ እሴቶች ይቆጣጠራሉ። እነሱ ለግንባታ ጊዜ ብቻ ናቸው —
`OMNIROUTE_MEMORY_MB` (ከታች) የተለየ የአሂድ ጊዜ ማስተካከያ ነው።

| የግንባታ ነጋሪ እሴት               | ነባሪ    | ተጽዕኖ                                                                    |
| --------------------------- | ------ | ----------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | `0` በምትኩ በwebpack ይገነባል። ከፍተኛው የማስታወሻ አጠቃቀም ዝቅተኛ ነው፣ ግን ቀርፋፋ ነው።        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | ለሚጀመረው `next build` የV8 ሂፕ ጣሪያ (`--max-old-space-size`)።                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL`ን ያቀርባል፤ Next ለገጽ-ውሂብ ስብስብ `workers = N - 1`ን ያስገኛል። |

ትልቅ builder ላይ መጨመር ያለበት እና ሀብት የተገደበበት ግንባታ
**ከ** `✓ Compiled successfully` በኋላ ሲቋረጥ መጠርጠር ያለበት `OMNIROUTE_BUILD_WORKERS` ነው። እያንዳንዱ
የገጽ-ውሂብ worker የራሱ ሂደት ነው፣ ዋናው `next build` ራሱም እንዲሁ ነው፤
በቀጥታ VPS ላይ የተደረገ ድጋሚ ሙከራ (issue #7518) የእያንዳንዱን ሂደት ከፍተኛ RSS
ከ`NODE_OPTIONS` ሂፕ ጠቋሚ ነፃ ሆኖ ~4.5 GB እንደሆነ ለካ (Turbopack ከV8 ሂፕ
ውጭ ባለ ቤተኛ/Rust ማስታወሻ ውስጥ ያጠናቅራል)። የ`2` ነባሪው (→ 1 worker፣ በአጠቃላይ 2
ሂደቶች) የህትመት pipeline ለሚጠቀምባቸው 16 GB / 4 vCPU GitHub-hosted runners
ተመጣጣኝ እንዲሆን ተወስኗል። `8` ላይ (→ 7 workers) ያ runner ማስታወሻ አልቆበት
እና buildkit ደረጃውን `ResourceExhausted: ... cannot allocate memory` በሚል ስህተት አቋረጠው፤
`3` (→ 2 workers) እንኳን የእያንዳንዱ ሂደት RSS በግምት ፈንታ
በቀጥታ ከተለካ በኋላ አልተመጣጠነም። `tests/unit/docker-build-memory-budget.test.ts`
በተለካው አሃዝ ላይ ስሌቱን ያከናውናል፣ ከሁለቱ ማስተካከያዎች አንዱ
ከrunner አቅም በላይ ካደገም ይሳካል።

Turbopack ከV8 ሂፕ **ውጭ** ባለ ቤተኛ Rust ማስታወሻ ውስጥ ያጠናቅራል፣ ስለዚህ
`OMNIROUTE_BUILD_MEMORY_MB` አይገድበውም። የማስታወሻ ጣሪያ ባለው አስተናጋጅ ላይ ግንባታው
ያለምንም የስህተት ጽሑፍ በOOM killer SIGKILL ይደረጋል — በ`Creating an optimized production build`
መካከል በድንገት ብቻ ይቆማል፣ ይህም የማስታወሻ እጥረት ሳይሆን የተንጠለጠለ ያስመስለዋል።
የግንባታ አስተናጋጁ ሀብት የተገደበ ከሆነ bundlerን ይቀይሩ፦

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` ነቅቷል፣ ስለዚህ `next build` ዋና **እና** worker
ሂደት ያስኬዳል፣ እያንዳንዳቸውም `OMNIROUTE_BUILD_MEMORY_MB`ን ለየብቻ ያከብራሉ። የcontainer
ጣሪያውን ከእሴቱ አንድ እጥፍ ሳይሆን በግምት ከሁለት እጥፉ በላይ ያድርጉ።

በዚህ tree ላይ የተለካ (`--target runner-base`፣ `OMNIROUTE_BUILD_MEMORY_MB=6144`)፦

| Bundler   | የcontainer ጣሪያ | ውጤት                           |
| --------- | -------------- | ----------------------------- |
| Turbopack | 8 GiB / 16 GiB | በሁለቱም OOM ተደርጎ ተቋርጧል፣ ያለማሳወቂያ |
| webpack   | 8 GiB          | build worker SIGKILL ተደርጓል    |
| webpack   | 12 GiB         | ተሳክቷል፣ ከፍተኛው 11.1 GiB ደርሷል    |

### የአሂድ ጊዜ ነባሪዎች

በ`runner-base` የሚላኩ ነባሪዎች፦ `PORT=20128`፣ `HOSTNAME=0.0.0.0`፣ `OMNIROUTE_MEMORY_MB=1024`፣ `NODE_OPTIONS=--max-old-space-size=1024`፣ `DATA_DIR=/app/data`፣ `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`።

በDocker ውስጥ የማስታወሻ ባህሪ፦

- ምስሉ `OMNIROUTE_MEMORY_MB=1024` ያስቀምጣል፣ ከእሱም `NODE_OPTIONS=--max-old-space-size=1024` ያመነጫል።
- ትክክለኛው የሰርቨር ፕሮሰስ `OMNIROUTE_MEMORY_MB`ን በሚያነብና `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`ን በሚያክል ራሱን የቻለ ማስጀመሪያ ይጀመራል።
- Node የመጨረሻውን የተደጋገመ `--max-old-space-size` እሴት ይጠቀማል፣ ስለዚህ `OMNIROUTE_MEMORY_MB`ን ማስቀመጥ ተግባራዊውን የDocker heap ገደብ ይቆጣጠራል።
- ምስሉ ሁልጊዜ ይህን ስለሚያስቀምጥ፣ የማስጀመሪያው የራሱ በRAM የተመጠነ አማራጭ በDocker ስር ፈጽሞ አይተገበርም። ለየስራ ጫናው በግልጽ ያሳድጉት (ከታች ያለውን ሰንጠረዥ ይመልከቱ)። `2048` እንኳን ለcoding-agent `/v1/responses` አሁንም በጣም ትንሽ ነው።

### ለcoding agents የሚያስፈልግ የሩጫ ጊዜ RAM

የ1 GiB Docker ነባሪ ለdashboard/ቀላል ውይይት ዝቅተኛ መነሻ ነው፣ የproduction መጠን አይደለም። ረጅም `POST /v1/responses` የጥያቄ ይዘቶች (በመቶዎች የሚቆጠሩ መልዕክቶች፣ በአስርዎች የሚቆጠሩ መሳሪያዎች) በመጭመቅ ወቅት በማህደረ ትውስታ ውስጥ በርካታ ግራፎችን ይይዛሉ። ሁለት ተደራራቢ ~3 MiB / ~750k-token ጥያቄዎች V8ን በ**12 GiB** old-space (`FATAL ERROR: Reached heap limit`) ላይ አቋርጠዋል፣ እንዲሁም የ16 GiB cgroup OOM ላይ ደርሰዋል። [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)ን ይመልከቱ።

የ**cgroup `--memory`ን ከheap በላይ ያስቀምጡ** — የnative buffers፣ SQLite እና የመጭመቂያ መካከለኛ ውጤቶች ከV8 ውጭ ይቀመጣሉ።

| የስራ ጫና                               | `OMNIROUTE_MEMORY_MB` | Container / cgroup     | ማስታወሻዎች                                                                           |
| ------------------------------------ | --------------------- | ---------------------- | --------------------------------------------------------------------------------- |
| Dashboard፣ አንድ ቀላል ውይይት              | `1024` (የምስሉ ነባሪ)     | ≥2 GiB                 |                                                                                   |
| አንድ coding agent (Claude/Codex/Grok) | `8192`                | ≥10 GiB                | የተለመደ ባለአንድ-session `/v1/responses`                                               |
| ሁለት በአንድ ጊዜ የሚሄዱ ረጅም `/v1/responses` | `10240`–`12288`       | ≥12–16 GiB             | በ~12 GiB heap ላይ የተለካ የV8 መቋረጥ                                                    |
| ሦስት+ በአንድ ጊዜ የሚሄዱ ረጅም contexts       | በአንድ process ላይ አያድርጉ | በተከታታይ ያስኬዱ / ተጨማሪ RAM | ነባሪው heavyweight admission 1 in-flight ነው፤ RAMን ሳያሳድጉ እሱን ማሳደግ መቋረጡን እንደገና ያስከትላል |

`OMNIROUTE_MEMORY_MB` **ካልተቀመጠ**፣ `omniroute serve` በbare metal ላይ ወደ ~35% RAM (`[512, 4096]` ውስጥ ተገድቦ) ያመጣጥናል። Docker ሁልጊዜ `1024`ን ስለሚያስቀምጥ፣ ያ ማመጣጠን በofficial image ውስጥ ፈጽሞ አይሰራም።

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## ወሳኝ የአካባቢ ተለዋዋጮች

በ[ENVIRONMENT.md](../reference/ENVIRONMENT.md) ውስጥ ከተመዘገቡት ነባሪ ቅንብሮች በተጨማሪ፣ በ Docker ስር ሲያሄዱ የሚከተሉት ተለዋዋጮች ከፍተኛ ጠቀሜታ አላቸው፦

| ተለዋዋጭ                         | ዓላማ                                                                                                                                                                                                                               | ነባሪ                    |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | ለWebSocket bridge የሚያገለግል የጋራ ምስጢር። **በምርት አካባቢ ያስፈልጋል** — ወደ ጠንካራ የዘፈቀደ ሕብረቁምፊ ያዋቅሩት።                                                                                                                                            | አልተዋቀረም (መቅረብ አለበት)    |
| `REDIS_URL`                   | ለፍጥነት ገዳቢው / cache backend የግንኙነት ሕብረቁምፊ                                                                                                                                                                                          | `redis://redis:6379`   |
| `REDIS_PORT`                  | ለተካተተው Redis container የhost-side port                                                                                                                                                                                            | `6379`                 |
| `REDIS_BIND_HOST`             | የተካተተው Redis port የሚታተምበት የhost interface (AUTH ካላከሉ በስተቀር loopback)                                                                                                                                                              | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ለራስ-ማዘመን የሥራ ፍሰቶች በ`cli` profile ውስጥ በ`/workspace/omniroute` ላይ የሚጫን የhost path                                                                                                                                                   | `.` (የአሁኑ ማውጫ)         |
| `OMNIROUTE_MEMORY_MB`         | ለDocker standalone server የruntime Node heap ከፍተኛ ገደብ፤ ከላይ ያለውን የimage ነባሪ ይተካል። Coding agents፦ `8192`+ ([runtime RAM](#runtime-ram-for-coding-agents)ን ይመልከቱ)።                                                                   | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | ለdashboard (20128) እና API (20129) የተጋለጡ port-ዎችን ይተካል                                                                                                                                                                             | `20128` / `20129`      |
| `APP_BIND_HOST`               | docker-compose የdashboard/API/live-WS port-ዎችን የሚያትምበት የhost interface። `REQUIRE_API_KEY=false` ሲሆን (ነባሪው)፣ `0.0.0.0` ስም-አልባውን `/v1` proxy ለLAN ያጋልጣል — ወሰኑን ያስፉት `REQUIRE_API_KEY=true` ሲሆን ወይም ከፊት ለፊት reverse proxy ሲኖር ብቻ ነው። | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | docker-compose የ`cliproxyapi` sidecarን የሚያትምበት የhost interface — የውሂብ volume-ው የአቅራቢ ማረጋገጫዎችን ይይዛል።                                                                                                                               | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | የruntime plugin scanner የሚያነብበትና የሚጭንበት ማውጫ። plugins በbind-mount ሲደረጉ ያዋቅሩት፦ ነባሪው `HOME`ን ይከተላል፣ image ግን ይህን ወደ ውጭ ላይልክ ይችላል።                                                                                                    | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | app-ው ከreverse proxy ጀርባ ሲታተም የሚጠቀመው የURL subpath (ለምሳሌ፦ `/omniroute`)                                                                                                                                                            | _(ባዶ = root)_          |
| `NEXT_PUBLIC_BASE_URL`        | subpathን ያካተተ ይፋዊ የbrowser origin (ለምሳሌ፦ `https://host/omniroute`)                                                                                                                                                                | አልተዋቀረም                |
| `PROD_DASHBOARD_PORT`         | ለ`docker-compose.prod.yml` የhost-side dashboard port                                                                                                                                                                              | `20130`                |
| `CLIPROXYAPI_PORT`            | ለ`cliproxyapi` sidecar የhost-side port                                                                                                                                                                                            | `8317`                 |

## በንዑስ ዱካ ላይ Reverse Proxy (Traefik / nginx)

የNext.js `basePath` በstandalone bundle ውስጥ ይካተታል። OmniRoute በapp root ላይ ባለ sentinel file ውስጥ የተካተተውን
እሴት ይመዘግባል (በ`npm run build` ጊዜ ይጻፋል፤ በ
`scripts/docker/ensure-docker-base-path.mjs` ይነበባል) እና container ሲጀምር ከ
`OMNIROUTE_BASE_PATH` ጋር ያወዳድረዋል። እሴቶቹ ሲለያዩ እና image-ው ለ
domain root የተገነባ ከሆነ፣ entrypoint-ው standalone manifests-ን፣ በውስጡ የተካተቱትን
`basePath`/`assetPrefix` literals (Next 16 የSSR asset URL-ዎችን ከ
`assetPrefix` ብቻ ያቀርባል — patcher-ው ንዑስ ዱካውን ወደዚያ ይገለብጣል)፣ የተካተቱትን
`/_next/static` asset URL-ዎች (client-reference manifests፣ media imports፣ አስቀድመው የቀረቡ
የስህተት ገጾች) እና client `process.env` shim-ን `node dev/run-standalone.mjs`
ከመሠራቱ በፊት እንደገና ይጽፋል።

### በCompose መገንባት (የሚመከር)

image-ው እና runtime-ው እንዲጣጣሙ ሁለቱንም variables በ`.env` ውስጥ ያዘጋጁ፣ ከዚያም እንደገና ይገንቡ፦

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

የታተሙት `diegosouzapw/omniroute:*` images ለdomain root የተገነቡ ናቸው። ሆኖም
`OMNIROUTE_BASE_PATH`-ን በruntime ላይ ማዘጋጀት ይችላሉ፤ container-ው ሲጀምር bundle-ውን አንድ ጊዜ
ያስተካክላል። ከሚዛመደው public origin ጋር ያጣምሩት፦

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Reverse proxy-ው **ሙሉውን** ውጫዊ ዱካ እንዲያስተላልፍ ያዋቅሩት (prefix-ን አያስወግዱ)።
Next.js `/omniroute/...`-ን ተቀብሎ assets-ን ከ
`/omniroute/_next/...` እንዲያቀርብ፣ Traefik `PathPrefix(`/omniroute`)`-ን ያለ
`StripPrefix` ወደ container-ው መምራት አለበት።

የDocker healthcheck በንቁው `OMNIROUTE_BASE_PATH` prefix የተደረገበትን ቀላል
`/healthz` lifecycle endpoint ይፈትሻል። `/api/monitoring/health` ለ
ሰው/dashboard diagnostics እንደቀረበ ይቆያል፤ የcontainer HEALTHCHECK-ን እንደገና ወደዚያ ለማመልከት (ለምሳሌ
ጥልቅ የጤና ማስፈጸሚያ)፣ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` ያዘጋጁ።
ያ ዱካ **ጥልቅ** ፍተሻ ነው (DB + monitoring summary) — እንደገና መጠቀምን ከመረጡ ለDocker
አልፎ አልፎ ለሚሠራው `HEALTHCHECK` ተስማሚ ነው፣ ነገር ግን ለKubernetes `livenessProbe`
ክፍተቶች **አይደለም**።

ለorchestrators (Kubernetes፣ Nomad፣ ወዘተ)፦

| Probe           | የሚመረጥ                                                             | የሚወገድ                                           |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------- |
| Liveness        | HTTP `GET /livez`፣ ወይም በዋናው port ላይ TCP (`PORT`፣ default `20128`) | `/api/monitoring/health` እንደ liveness           |
| Readiness       | HTTP `GET /healthz`                                               | event-loop በሥራ መጠመድን እንደ መሞት የሚቆጥሩ አጭር timeouts |
| Deep / blackbox | `/api/monitoring/health`                                          | —                                               |

`/healthz` የprocess lifecycle (`ok` / `starting` / `stopping`) ሪፖርት ያደርጋል። `/livez`
process-ው በሕይወት መኖሩን ብቻ ይፈትሻል (handler-ው መሥራት በቻለ ቁጥር 200 ይመልሳል፤
readiness-ን አይጠብቅም)። ሁለቱም አሁንም request handling ከሚሠራበት ተመሳሳይ Node event loop ላይ
ይሠራሉ፤ ስለዚህ CPU-bound catalog ወይም compression ሥራ ሊያዘገያቸው ይችላል — በሥራ መጠመድ ≠ መሞት። HTTP
probes time out ካደረጉ TCP liveness-ን ይምረጡ። ሙሉ የprobe መመሪያ፦
[የMonitoring መመሪያ — የKubernetes probe ምክረ ሐሳቦች](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose ከ Caddy ጋር (HTTPS Auto-TLS)

OmniRoute የCaddy ራስ-ሰር SSL ማቅረብን በመጠቀም በደህንነት ለውጭ ሊቀርብ ይችላል። የጎራዎ DNS A መዝገብ ወደ አገልጋይዎ IP አድራሻ መጠቆሙን ያረጋግጡ።

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
      # ለOAuth መልሶ ጥሪዎች፣ ለዳሽቦርድ አገናኞች እና ለሚፈጠሩ የወል ዩአርኤሎች በአሳሹ በኩል የሚታይ መነሻ።
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # ለጊዜ ሰሌዳ የተያዙ ሥራዎች / ራስ-ሰር ጥያቄዎች የውስጥ ከአገልጋይ-ወደ-አገልጋይ ዩአርኤል።
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

Caddy ለወደላይኛው ኮንቴይነር መደበኛዎቹን የማስተላለፊያ ራስጌዎች ያዘጋጃል። OmniRoute
`NEXT_PUBLIC_BASE_URL`ን ለOAuth መልሶ ጥሪዎች እና ለሚፈጠሩ የወል
አገናኞች ቀኖናዊ የወል መነሻ አድርጎ ይጠቀማል፤ ማንነት የተረጋገጠባቸው የዳሽቦርድ የመጻፍ ጥያቄዎች ተመሳሳይ-መነሻ ጥያቄዎችን ከክፍለ-ጊዜ ጋር የተሳሰረ CSRF
ጥበቃ ጋር ይጠቀማሉ። OmniRoute የወል መነሻውን ከግልጽ
ውቅር ይልቅ ከታመኑ የተላለፉ ራስጌዎች እንዲወስን ሆን ብለው በሚፈልጉባቸው የላቁ ማሰማሪያዎች ላይ ብቻ `OMNIROUTE_TRUST_PROXY`ን ያንቁ።

## Cloudflare Quick Tunnel

ለDocker ማሰማሪያዎች የዳሽቦርድ ድጋፍ በ`Dashboard → Endpoints` ላይ በአንድ ጠቅታ የሚነቃ **Cloudflare Quick Tunnel**ን ያካትታል። መጀመሪያ ሲነቃ `cloudflared`ን አስፈላጊ ሲሆን ብቻ ያወርዳል፣ ወደ አሁኑ `/v1` የመጨረሻ ነጥብዎ ጊዜያዊ ቱነል ያስጀምራል፣ እና የተፈጠረውን `https://*.trycloudflare.com/v1` ዩአርኤል በመደበኛው የወል ዩአርኤልዎ ሥር በቀጥታ ያሳያል።

የመጨረሻ ነጥብ ቱነል ፓነሎችን (Cloudflare፣ Tailscale፣ ngrok) የነቃውን የቱነል ሁኔታ ሳይቀይሩ ከ`Settings → Appearance` ማሳየት ወይም መደበቅ ይቻላል።

### የቱነል ማስታወሻዎች

- የQuick Tunnel ዩአርኤሎች ጊዜያዊ ሲሆኑ ከእያንዳንዱ ዳግም ማስጀመር በኋላ ይቀየራሉ።
- ከOmniRoute ወይም ከኮንቴይነር ዳግም ማስጀመር በኋላ Quick Tunnels በራስ-ሰር አይመለሱም። በሚያስፈልግበት ጊዜ ከዳሽቦርዱ እንደገና ያንቋቸው።
- የሚተዳደረው ጭነት በአሁኑ ጊዜ Linux፣ macOS እና Windowsን በ`x64` / `arm64` ይደግፋል።
- በተገደቡ የኮንቴይነር አካባቢዎች ውስጥ ጫጫታ የሚያበዙ የQUIC UDP ቋት ማስጠንቀቂያዎችን ለማስወገድ፣ የሚተዳደሩ Quick Tunnels በነባሪ HTTP/2 ማጓጓዣን ይጠቀማሉ። የተለየ ማጓጓዣ ከፈለጉ `CLOUDFLARED_PROTOCOL=quic` ወይም `auto` ያዘጋጁ።
- የDocker ምስሎች የስርዓቱን CA ሥሮች ያካትታሉ እና ወደሚተዳደረው `cloudflared` ያስተላልፏቸዋል፤ ይህም ቱነሉ በኮንቴይነሩ ውስጥ ሲጀመር የTLS እምነት አለመሳካቶችን ያስወግዳል።
- OmniRoute አንድ ሁለትዮሽ ፋይል ከማውረድ ይልቅ ቀድሞ ያለውን እንዲጠቀም ከፈለጉ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`ን ያዘጋጁ።

## የኢሜጅ መለያዎች

| ኢሜጅ                      | መለያ      | መጠን    | መግለጫ                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | ከፍተኛው **የታተመ** የተረጋጋ SemVer (git `main` አይደለም) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ለGitOps ይህን የመለያ ምድብ ቋሚ ያድርጉ                   |

ባለብዙ ፕላትፎርም ማኒፌስት፦ `linux/amd64` + `linux/arm64` ቤተኛ (Apple Silicon፣ AWS Graviton፣ Raspberry Pi)። Docker ተዛማጁን አርክቴክቸር በራስ-ሰር ይመርጣል፤ በARM አስተናጋጆች ላይ የAMD64 ኢሙሌሽንን ማስገደድ ካስፈለገዎት `--platform linux/amd64` ያስተላልፉ።

### የልቀት ቻናሎች

OmniRoute ለተረጋጉ ልቀቶች፣ ለንቁ የልቀት ቅርንጫፍ ሙከራ እና ለልማት ግንባታዎች የተለያዩ Docker ቻናሎችን ያትማል።

| ቻናል                             | ምንጭ                         | የመቀየር አቅም              | የሚመከር አጠቃቀም                                                                                   |
| ------------------------------- | --------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | የተፈረመ/ስሪት የተሰጠው ልቀት         | የማይቀየር                 | ትክክለኛ ልቀትን ቋሚ የሚያደርጉ የምርት ማሰማራቶች                                                              |
| `:latest` / `:latest-web`       | ከፍተኛው **የታተመ** የተረጋጋ SemVer | ሊቀየር የሚችል የተረጋጋ ጠቋሚ    | ከSemVer የማተም ስራ **በኋላ** የተረጋጉ ልቀቶችን ይከተላል — `main`ን ወይም ያልተለቀቁ `release/v*` ኮሚቶችን **አይከታተልም** |
| `:next` / `:next-web`           | የአሁኑ ነባሪ `release/v*` ቅርንጫፍ | ሊቀየር የሚችል የቅድመ-ልቀት ጠቋሚ | በንቁው የልቀት ቅርንጫፍ ላይ የገቡ፣ ነገር ግን ገና በተረጋጋ ልቀት ውስጥ ያልተካተቱ ማስተካከያዎችን ለመሞከር                        |
| `:main` / `:main-web`           | `main` ቅርንጫፍ                | ሊቀየር የሚችል የልማት ጠቋሚ     | ለልማት እና ውህደት ሙከራ ብቻ                                                                           |

#### የድር-ክፍለ-ጊዜ አቅራቢዎች፦ የ`-web` ኢሜጆች

ከላይ ያለው እያንዳንዱ ቻናል ከ`runner-web` ደረጃ የተገነባ `-web` መለያ (`:latest-web`፣ `:<version>-web`፣ `:next-web`፣ `:main-web`) አለው — ይኸውም ተመሳሳዩ ኢሜጅ ላይ Playwright እና Chromium አሳሽ የተጨመሩበት ነው። መደበኛው ኢሜጅ Chromiumን **አያካትትም**፤ `gemini-web`፣ `claude-web` እና `claude-turnstile` ያስፈልጋቸዋል።

ውድቀቱ የሚከሰተው ዘግይቶ እንጂ ሲጀመር አይደለም፦ እነዚያ አቅራቢዎች ሞዴሎቻቸውን ይዘረዝራሉ እና በዳሽቦርዱ ላይ እንደተገናኙ ይታያሉ፤ የመጀመሪያው ጥያቄ ብቻ በሚከተለው ስህተት ይወድቃል፦

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

እነዚያን አቅራቢዎች የሚጠቀሙ ከሆነ፣ አሁን ያሉበትን ቻናል የ`-web` መለያ ያውርዱ — ሌላ ምንም ነገር አይቀየርም። በnpm/CLI ጭነት (Docker ኢሜጅ በሌለበት) ተመጣጣኙ የጎደለው ክፍል የአሳሹ ባይነሪ ነው፦ በአስተናጋጁ ላይ `npx playwright install chromium`ን ያስኪዱ።

#### የቅድመ-ልቀት ቻናሉን መጠቀም

የ`next` ቻናል ወደ የአሁኑ ነባሪ `release/v*` ቅርንጫፍ በሚደረግ እያንዳንዱ push እንደገና ይገነባል፣ ለAMD64 እና ARM64ም ይታተማል። የቆዩ የጥገና ቅርንጫፎች በላዩ ላይ መጻፍ አይችሉም። ቻናሉ ቀጣዩ የተረጋጋ መለያ ከመዘጋጀቱ በፊት ወደ ንቁው የልቀት ቅርንጫፍ ለተዋሃዱ ማስተካከያዎች ሊወርድ የሚችል ኢሜጅ ያቀርባል።

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

ለDocker Compose፣ በተመረጠው ፕሮፋይል የሚጠቀመውን የኢሜጅ መለያ ይተኩ፣ ከዚያም አገልግሎቱን ያውርዱ እና እንደገና ይፍጠሩ፦

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ደህንነት እና ወደ ቀድሞው መመለስ

`next` ተንሳፋፊ የቅድመ-ልቀት ቻናል ነው። ወደ ንቁው የልቀት ቅርንጫፍ በሚደረግ ማንኛውም push ሊቀየር ይችላል፣ እና **ለምርት አጠቃቀም አይደገፍም**። አንድን የተወሰነ ግንባታ በሚገመግሙበት ጊዜ የኢሜጁን digest ቋሚ ያድርጉ፦

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ከመሞከርዎ በፊት የOmniRoute ዳታ ቮልዩምን ወይም bind-mounted የዳታ ማውጫውን ምትኬ ይያዙ። ወደ ቀድሞው ለመመለስ፣ ከዚህ በፊት ጥቅም ላይ የዋለውን የተረጋጋ ስሪት ወይም digest ይመልሱ እና ኮንቴይነሩን እንደገና ይፍጠሩ፦

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

የልቀት-ቅርንጫፍ ግንባታ `latest`ን በፍጹም ማንቀሳቀስ አይችልም፤ የተረጋጋውን ጠቋሚ ሊያሳድግ የሚችለው ብቁ የሆነ የተረጋጋ ሴማንቲክ ስሪት ብቻ ነው። የ`next` ኢሜጆች የልቀት ኢሜጅ ፍተሻውን እና የCRITICAL-ተጋላጭነት ማገጃ መቆጣጠሪያውን ይዘው ይቆያሉ።

**`latest` ለgit ወቅታዊነት ዋስትና አይደለም።** በ`main` ወይም በንቁው `release/v*` ቅርንጫፍ ላይ የተዋሃዱ ማስተካከያዎች፣ የተረጋጋ SemVer ኢሜጅ ታትሞ የማተም ስራው `:latest`ን እስኪያሳድግ ድረስ (ከዚያ SemVer ጋር ተመሳሳይ digest) በ`:latest` ውስጥ **አይካተቱም**። GitHub ማስተካከያውን አስቀድሞ ቢያሳይም `latest` እንደቆመ ከታየ፣ የልቀት ቅርንጫፉን ለመሞከር `:next`ን ያውርዱ ወይም የSemVer መለያውን ይጠብቁ።

| የሚፈልጉት                                                | ይጠቀሙ                                 |
| ----------------------------------------------------- | ------------------------------------ |
| መለወጥ የሌለበት GitOps / ምርት                               | `:X.Y.Z`ን (ወይም የኢሜጁን digest) ቋሚ ያድርጉ |
| የታተሙ የተረጋጉ ልቀቶችን ይከተሉ እና በእያንዳንዱ ልቀት እንደገና መፍጠርን ይቀበሉ | `:latest`                            |
| ያልተለቀቁ `release/v*` ኮሚቶችን ይሞክሩ                        | `:next` (ለምርት አይደለም)                 |
| `main`ን ይሞክሩ                                          | `:main` (ለምርት አይደለም)                 |

## ተገኝነት፦ ነባሪ SQLite አንድ ቅጂ ብቻ ነው

መደበኛው Docker / Kubernetes OmniRoute **አንድ Node ሂደት + አንድ SQLite ጻፊ** ነው። በዚህ ቶፖሎጂ ከፍተኛ ተገኝነት **አይደገፍም**።

| ገደብ                                     | ውጤት                                                                                                                                                                                                                                                                          |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| አንድ ጻፊ                                  | በተመሳሳዩ SQLite ፋይል ላይ በርካታ ቅጂዎችን **አያስኬዱ**። ይህ DBውን ያበላሻል።                                                                                                                                                                                                                    |
| ዳግም መፍጠር / ዳግም ማስጀመር / HEALTHCHECK ማቋረጥ | በሂደት ላይ ያሉ SSEዎች፣ የዳሽቦርድ ክፍለ-ጊዜዎች እና በማህደረ ትውስታ ውስጥ ያለ ሁኔታ **ሙሉ በሙሉ ይቋረጣሉ**። ሁሉም የተገናኙ ደንበኞች ግንኙነታቸውን ያጣሉ። endpoint ባዶ በሆነበት ጊዜ የሚመጡ አዳዲስ ጥያቄዎች OmniRoute JSON ሳይሆን ከreverse-proxy **`502 Bad Gateway: Unknown error`** ያገኛሉ — ደንበኞች ይህን ከአቅራቢ ብልሽት ለይተው ማወቅ አይችሉም (#11015)። |
| ከ`/healthz` ጋር ተመሳሳይ event loop         | ሥራ የበዛበት የካታሎግ ወይም የመጭመቅ tick ፍተሻዎችን ሊያዘገይ ይችላል፤ አጭር timeout ደግሞ **ብቸኛውን** ቅጂ እንደገና ያስጀምራል።                                                                                                                                                                                  |

**የፍተሻ ማትሪክስ** ([የKubernetes ፍተሻ ምክረ ሐሳቦችን](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ይመልከቱ)፦

| ፍተሻ        | ዒላማ                                                    | አይጠቀሙ                                          |
| ---------- | ------------------------------------------------------ | ---------------------------------------------- |
| ሕያውነት      | በ`PORT` ላይ TCP (ነባሪ `20128`)፣ ወይም ለስላሳ HTTP `/healthz` | `/api/monitoring/health`                       |
| ዝግጁነት      | HTTP `GET /healthz`                                    | የevent loop ሥራ መብዛትን እንደ ሞት የሚቆጥሩ ጥብቅ timeouts |
| ጥልቅ / ለሰዎች | `/api/monitoring/health`                               | ራስ-ሰር የkubelet ሕያውነት ፍተሻ                       |

**ማሻሻያዎች፦** እያንዳንዱ ክፍለ-ጊዜ እንደሚቋረጥ ይጠብቁ። ከቻሉ ደንበኞችን ቀስ በቀስ ያስወጡ፤ በነባሪ SQLite ላይ rolling update የለም። Compose `restart: unless-stopped` ከDocker `HEALTHCHECK` ጋር ኮንቴይነሩ Unhealthy ሲሆን ብቸኛውን ሂደት ይተካል — የጉዳቱ ስፋትም ተመሳሳይ ነው።

ለ**አንድ ቅጂ** የKubernetes ቅንጭብ (Recreate ያስፈልጋል፤ በአንድ SQLite ፋይል ላይ `replicas`ን አይጨምሩ)፦

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

የ`preStop` sleep ከSIGTERM በፊት kube የService endpointsን እንዲያስወግድ ያስችለዋል፤ በዚህም **አዲስ** ትራፊክ እየተቋረጠ ያለውን ሂደት መድረስ ያቆማል። በሂደት ላይ ያለ `/v1/responses` SSE በከባድ admission leases አማካኝነት እስከ `SHUTDOWN_TIMEOUT_MS` (ነባሪ 30s) ድረስ ቀስ በቀስ ይጠናቀቃል (#11015)። አሁንም ሂደቱን የሚደርሱ አዳዲስ ጥያቄዎች `503` + `Retry-After: 5` ያገኛሉ። ተተኪው Ready እስኪሆን ድረስ ያለው የRecreate ባዶ-endpoint ክፍተት ሙሉ መቋረጥ ሆኖ ይቀራል — ይህ የSQLite ቶፖሎጂ ነው እንጂ የፍተሻ የተሳሳተ ውቅር አይደለም።

ውጫዊ Postgres / multi-writer HA **በሰነድ የተገለጸ መደበኛ መንገድ አይደለም**። HA ካስፈለገዎት አንድ ቅጂ ብቻ ይጠቀሙ ወይም ፕሮጀክቱ ለየብቻ የፈተሸውንና በሰነድ ያስቀመጠውን ቶፖሎጂ ያስኪዱ። የPostgres/MySQL ሥራ በ[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ውስጥ ይገኛል። ይህ እስኪለቀቅ ድረስ **ትልቅ** የ`/v1/responses` አቅምን ለማባዛት የሚደገፈው ብቸኛ መንገድ N እርስ በርሳቸው ገለልተኛ ሂደቶችን (የሚቀጥለውን ክፍል ይመልከቱ) ማስኬድ ነው እንጂ በአንድ volume ላይ `replicas > 1` ማድረግ አይደለም።

## የአቅም ማስፋፋት፦ N ነጻ ሂደቶች

አንድ Node ሂደት **አንድ V8 heap** ነው። ሁለት በጊዜ የሚደራረቡ ~3 MiB / ~~750k-token የኮዲንግ-ወኪል `POST /v1/responses` ጥያቄዎች (RTK + Caveman) ያንን heap በ~~12 Gi (`FATAL ERROR: Reached heap limit`) ላይ እንዲቋረጥ ያደርጉታል፣ እንዲሁም 16 Gi cgroupን OOM ሊያደርጉ ይችላሉ። [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)ን ይመልከቱ። ይህ መለኪያ የ**ማህደረ ትውስታ በጀት** ማስጠንቀቂያ እንጂ፣ በአንድ ጊዜ ለሚሰሩ ረጅም `/v1/responses` ጥያቄዎች የምርቱ ጥብቅ ከፍተኛ ገደብ ሁለት ነው ማለት አይደለም። ከባድ የchat መግቢያ፣ ከዚያው V8/cgroup ጣሪያ በራስ-ሰር በሚወሰን የገቢ ባይት በጀት (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`፣ `src/shared/middleware/admissionBudget.ts`) ይቆጣጠራል — አስቀድሞ መጠኑ በተወሰነ ሂደት ላይ ይህን ወደ ላይ መቀየር (ወይም የቀድሞውን `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` የጥያቄ-ብዛት ገደብ ማዘጋጀት) መቋረጡን እንደገና ያስከትላል። አነስተኛ chats፣ `/healthz`፣ `/v1/models` እና MCP በዚያ ገደብ ውስጥ **አይካተቱም**።

### አንድ ሂደት፦ ከሁለት በላይ ረጅም `/v1/responses`

**ጤናማ** ሂደት (heap ከ`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` በታች፣ ነባሪው `0.75`) የሂደቱ አጠቃላይ በሂደት ላይ ያለ የባይት በጀት (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) በቂ ቦታ ካለው፣ በአንድ ጊዜ ከሁለት በላይ ረጅም `POST /v1/responses` ጥያቄዎችን ማስኬድ **ይችላል**። ከ`OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ነባሪው 256 KiB) ጋር እኩል ወይም ከዚያ በላይ የሆኑ bodies፣ እንደ መዋቅር-ከባድ ጥያቄዎች ተመሳሳይ የከባድ ስራ lease ይወስዳሉ፣ እንዲሁም ተመሳሳዩን [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ማምለጫ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ይጠቀማሉ። በአንድ ጊዜ በአስርዎች የሚቆጠሩ ረጅም SSE clientsን ማስኬድ (ኦፕሬተሮች ብዙውን ጊዜ 40–50 ያስፈልጋቸዋል) የ**ማህደረ ትውስታ በጀት** ጉዳይ ነው — heap + ዋና/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`ን በተገቢው መጠን ያዘጋጁ — የምርቱ ጥብቅ “ከፍተኛው 2” ገደብ አይደለም። ጫና ያለበት heap አሁንም ዳግም ሊሞከር በሚችል `503` ጥያቄዎችን ይቀንሳል፣ ስለዚህ #7849 ተመልሶ አይከሰትም።

**heapsን ለማባዛት** (ነጻ የV8 old-spaces) **ዛሬ**፦

| ያድርጉ                                                                                                                                            | አያድርጉ                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **N containers/pods**ን ያስኪዱ፤ እያንዳንዳቸውም የራሳቸው `DATA_DIR` / volume ይኑራቸው                                                                          | በአንድ SQLite file ላይ `replicas > 1` አያዘጋጁ           |
| ከባድ በሂደት ላይ ያሉ ጥያቄዎችን + healthy-headroomን ከheap / በሂደት ላይ ካለው የባይት በጀት አንጻር መጠናቸውን ይወስኑ፤ 1–2 ጥንቃቄ የተሞላበት የ#7849 ነባሪ እንጂ የምርቱ ጥብቅ ከፍተኛ ገደብ አይደለም | ለአንድ ሂደት 8× RAM እና ያልተገደበ የብዛት ገደብ አይስጡ            |
| አማራጭ፦ ለ**ጋራ የquota counters** `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                              | Redisን እንደ የጋራ SQLite አይቁጠሩት — አይደለም               |
| የprovider secretsን ወደ እያንዳንዱ instance ይቅዱ (ወይም የተከፋፈሉ dashboardsን ይቀበሉ)                                                                         | በinstances መካከል አንድ dashboard / አንድ call-log አይጠብቁ |
| ከፊት ለፊት ማንኛውንም load balancer ይጠቀሙ፤ በAPI key ወይም session የተጣበቀ ማድረግ በቂ ነው                                                                        | ለአንድ vendor የተወሰነ መጠን-አዋቂ middleware አይጠይቁ         |

ሃርድዌር፦ በእያንዳንዱ instance በአንድ ጊዜ የሚሰሩ ረጅም `/v1/responses` ጥያቄዎች ብዛት የ**ማህደረ ትውስታ በጀት** ጉዳይ ነው (heap + በሂደት ላይ ያሉ ባይቶች / #10110)። N ነጻ `DATA_DIR`s አሁንም heapsን ያባዛሉ፦ የhost RAM `N × cgroup`ን መሸፈን አለበት፣ “N=8 ያለው አንድ 16 Gi pod”ን አይደለም። በአንድ SQLite file ላይ ፈጽሞ `replicas > 1` አያዘጋጁ።

የCompose ንድፍ (ሁለት heaps፣ ሁለት volumes — `deploy.replicas: 2` አይደለም)፦

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

የሂደት ውስጥ ጥግግት (compressionን ከHTTP isolate ማውጣት) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ነው። በጋራ durable state ላይ ያለ አንድ ሎጂካዊ cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ነው።

## ጠቃሚ ማስታወሻዎች

- **SQLite WAL ሁነታ፦** OmniRoute የቅርብ ጊዜ ለውጦችን ወደ `storage.sqlite` checkpoint ማድረግ እንዲችል `docker stop` እስኪጠናቀቅ ድረስ ጊዜ ሊሰጠው ይገባል። አብረው የቀረቡት Compose ፋይሎች የ40 ሰከንድ የማቆሚያ የእፎይታ ጊዜን አስቀድመው አዘጋጅተዋል። image-ውን በቀጥታ የሚያስኬዱ ከሆነ፣ `--stop-timeout 40`ን ይጠቀሙ።
- **`DISABLE_SQLITE_AUTO_BACKUP`፦** መደበኛ/ከመጻፍ በፊት የሚደረጉ ምትኬዎች በውጫዊ ሥርዓት የሚተዳደሩ ከሆነ ወደ `true` ያቀናብሩት። ያሉ የውሂብ ጎታዎች ፍልሰቶች አሁንም የራሳቸውን ዘላቂ የደህንነት ቅጂ እና የጅምላ ፍልሰት መከላከያ ይፈልጋሉ።
- **የውሂብ ቋሚነት፦** ኮንቴይነሩ ዳግም በሚጀምርበት ጊዜ ሁሉ የውሂብ ጎታዎን፣ ቁልፎችዎን እና ውቅሮችዎን ለማቆየት ሁልጊዜ volumeን ወደ `/app/data` mount ያድርጉ።
- **የፖርት ውቅር፦** ነባሪውን `20128` ፖርት ለመቀየር `PORT` environment variableን override ያድርጉ።

## ተጨማሪ ይመልከቱ

- [የVM ማሰማሪያ መመሪያ](../ops/VM_DEPLOYMENT_GUIDE.md) — የVM + nginx + Cloudflare ማዋቀር
- [የFly.io ማሰማሪያ መመሪያ](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — ወደ Fly.io ያሰማሩ
- [የEnvironment ውቅር](../reference/ENVIRONMENT.md) — ሙሉ የ`.env` ማጣቀሻ
