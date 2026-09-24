# 🐳 Docker Guide — OmniRoute (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> සම්පූර්ණ Docker යෙදවීම් යොමුව. ඉක්මන් ආරම්භයක් සඳහා, [README හි Docker කොටස](../README.md#-docker) බලන්න.

## පටුන

- [ඉක්මන් ධාවනය](#quick-run)
- [පරිසර ගොනුවක් සමඟ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ලබාගත හැකි පැතිකඩ](#available-profiles)
- [OmniRoute Docker තුළ ධාවනය වන විට සත්කාරක CLI මෙවලම් වින්යාස කිරීම](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [නිෂ්පාදන Compose](#production-compose)
- [Dockerfile අදියර](#dockerfile-stages)
- [තීරණාත්මක පරිසර විචල්ය](#critical-environment-variables)
- [Caddy (HTTPS) සමඟ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [රූප ටැග](#image-tags)
- [ලබාගත හැකි බව: පෙරනිමි SQLite තනි අනුරුවකි](#availability-default-sqlite-is-single-replica)
- [වැදගත් සටහන්](#important-notes)

---

## ඉක්මන් ධාවනය

> **එක් විධානයකින් ස්වයං-සත්කාරක කරන්නද?**
> [ස්වයං-සත්කාරක මාර්ගෝපදේශය](../getting-started/SELF_HOST_GUIDE.md) බලන්න —
> `docker compose -f docker-compose.selfhost.yml up -d` (ප්රකාශිත image එක +
> Redis, loopback සඳහා පමණි, profile තේරීමක් නැත). පහත ඉක්මන් ධාවනය,
> දැනටමත් වෙනත් ස්ථානයක Redis ධාවනය කරන පරිශීලකයන් සඳහා වන
> තනි-container ක්රමයයි.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## පරිසර ගොනුවක් සමඟ

```bash
# පළමුව .env පිටපත් කර සංස්කරණය කරන්න
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
# මූලික පැතිකඩ (CLI මෙවලම් නොමැත)
docker compose --profile base up -d

# CLI පැතිකඩ (Claude Code, Codex, OpenClaw අන්තර්ගතයි)
docker compose --profile cli up -d

# සත්කාරක පැතිකඩ (Linux-ප්රමුඛ; සත්කාරක CLI ද්විමය ගොනු කියවීමට පමණක් සවිකරයි)
docker compose --profile host up -d

# වෙබ් පැතිකඩ (වෙබ්-සැසි සැපයුම්කරුවන් සඳහා Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI අතුරු බහාලුම ඒකාබද්ධ කරන්න
docker compose --profile cli --profile cliproxyapi up -d
```

## පවතින Profiles

OmniRoute ප්රධාන යෙදවුම් ආකාර සඳහා Compose profiles සමඟ නිකුත් වේ. ඔබේ පරිසරයට ගැළපෙන එක තෝරන්න.

| Profile          | Service          | භාවිත කළ යුතු අවස්ථාව                                                                                                                        | Command                                      |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (පෙරනිමි) | `omniroute-base` | Headless server / අවම runtime, provider CLIs අන්තර්ගත කර නොමැත                                                                               | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` සහ අන්තර්ගත CLIs (Codex, Claude Code, Droid, OpenClaw) කැඳවන agentic workflows සඳහා                       | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` ආදිය read-only ලෙස mount කිරීමෙන් host CLIs වෙත `network_mode`-වැනි ප්රවේශයක් අවශ්ය Linux hosts සඳහා | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | upstream CLI proxying සඳහා `8317` port එකේ [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar එක ධාවනය කරන්න                | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | browser එකක් අවශ්ය web-session providers සඳහා: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` build කරයි, Chromium අන්තර්ගතයි) | `docker compose --profile web up -d`         |

> Profiles කිහිපයක් ඒකාබද්ධ කළ හැක: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker තුළ ධාවනය වන විට සත්කාරක CLI මෙවලම් වින්යාස කිරීම

`omniroute setup-codex`, `setup-claude`, `config set <tool>` සහ උපකරණ පුවරුවේ
**වින්යාසය සුරකින්න** බොත්තම යන සියල්ල `~/.codex/*.config.toml` වැනි ගොනු ලියයි. එම මාර්ග
අර්ථවත් වන්නේ CLI එක සැබවින්ම ධාවනය වන යන්ත්රය මත පමණි. ඒවා කන්ටේනරය තුළ
ධාවනය කළහොත්, ලිවීම කන්ටේනරයේම home නාමාවලියට (`/home/node` —
image එක `USER node` ලෙස ධාවනය වේ) සිදු වන අතර, කිසිදු සත්කාරක CLI එකක් එය කිසිදා කියවන්නේ නැතිවා සේම
කන්ටේනරය නැවත නිර්මාණය කළ සැණින් එය ඉවත දමනු ලැබේ.

OmniRoute මෙය හඳුනාගෙන, ඔබට භාවිත කළ නොහැකි සාර්ථකත්වයක් වාර්තා කිරීම වෙනුවට
උපදෙස් සමඟ ලිවීම ප්රතික්ෂේප කරයි: CLI එක `2` සමඟ පිටවෙන අතර API එක
`containerEphemeralTarget: true` සමඟ `422` පිළිතුරු දෙයි.

### නිර්දේශිත ක්රමය: CLI එක සත්කාරකය මතත්, OmniRoute Docker තුළත් ධාවනය කරන්න

කන්ටේනරය API එක සපයයි; CLI එක ඔබේ සත්කාරක මෙවලම් වින්යාස කරයි.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI එක කන්ටේනරය වෙත යොමු කරන්න
omniroute setup-codex                      # ඔබේ සත්කාරකයේ සැබෑ ~/.codex වෙත ලියයි
```

Codex, Claude Code, Cursor හෝ සමාන මෙවලම් ඔබේ
ලැප්ටොප් පරිගණකයේ ධාවනය වන විට මෙය නිවැරදි තේරීමයි — සාමාන්ය සැකසුම වන්නේද එයයි.

### විකල්පය: සත්කාරක වින්යාස නාමාවලි bind-mount කරන්න (`host` profile)

කන්ටේනරය විසින්ම ඔබේ සත්කාරක වින්යාසය ලිවීමට අවශ්ය නම්,
නාමාවලි mount කර `CLI_CONFIG_HOME` එක mount root වෙත යොමු කරන්න. `host` profile එක
දැනටමත් මෙය සිදු කරයි:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

මාර්ගය විශ්වාසදායක කරන්නේ bind mount එකයි: OmniRoute
`/proc/self/mountinfo` කියවා mount කළ මාර්ගවලට (සහ ඒවායේ child නාමාවලි mount වී ඇති
නාමාවලිවලටද, ඉහත `/host-home` ආකෘතිය හරියටම එවැන්නකි) ලිවීමට ඉඩ දෙමින්,
mount නොකළ ඒවා තවදුරටත් ප්රතික්ෂේප කරයි.

### හදිසි විකල්පය: කන්ටේනරයේම CLI වින්යාස කරන්න (අවම වශයෙන් භාවිත කරන්න)

CLI ඇත්තෙන්ම කන්ටේනරය තුළ තිබෙන විට (`cli` profile), මෙම ලිවීම
චේතාන්විතය. ඕනෑම `setup-*` විධානයකට `--allow-container-write` ලබා දෙන්න, නැතහොත්
සේවාදායකය සඳහා `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` සකසන්න. මෙම ලිවීම
කන්ටේනරයට වඩා දිගුකල් නොපවතින බවට අනතුරු ඇඟවීමක් සමඟ ඉදිරියට යයි.

> **ආරක්ෂක අනතුරු ඇඟවීම — `cli` profile + `docker.sock` mount.**
> කන්ටේනරය තුළ ඇති ස්වයංක්රීය යාවත්කාලීනකාරකයට සත්කාරක daemon එකෙන් stack එක
> නැවත නිර්මාණය කිරීමට හැකි වන පරිදි `cli` profile එක `/var/run/docker.sock` bind-mount කරයි
> (`src/lib/system/autoUpdate.ts` එම socket එක තිබේදැයි පරීක්ෂා කර, එය නොමැති විට
> Docker මාර්ගය මඟ හරියි). එම socket එක **සත්කාරක root විශ්වාස
> සීමාවකි**: එයට ප්රවේශ විය හැකි ඕනෑම දෙයකට root ලෙස සත්කාරක Docker daemon එක
> පාලනය කළ හැකිය — එයට සත්කාරකයේ ඕනෑම කන්ටේනරයක් නිර්මාණය කිරීමට, පරීක්ෂා කිරීමට,
> නැවැත්වීමට සහ ඉවත් කිරීමට හැකිය. එහි ප්රතිවිපාක:
>
> 1. **`cli` profile එකේ port එක කිසිවිටෙක ජාලයට නිරාවරණය නොකරන්න.**
>    එය `127.0.0.1` මත publish කරන්න (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN හරහා ප්රවේශ විය හැකි `cli` profile එකක්, උපකරණ පුවරු මට්ටමේ ඕනෑම RCE එකක්
>    සම්පූර්ණ සත්කාරක අත්පත් කරගැනීමක් බවට පත් කරයි.
> 2. **`cli` profile එක තුළට අමතර සත්කාරක නාමාවලි කිසිවක් bind නොකරන්න.**
>    Docker socket එක සමඟ වෙනත් ඕනෑම mount එකක් තිබීමෙන් කන්ටේනරයට ඔබේ ගොනු පද්ධතියට
>    සහ සත්කාරක වින්යාසයට සම්පූර්ණ කියවීමේ/ලිවීමේ ප්රවේශය ලැබේ. මෙවලමකට
>    ව්යාපෘතියක් දැකීමට අවශ්ය නම්, එය CLI binary එක සමඟ දේශීයව ධාවනය කරන්න — එය
>    `cli` කන්ටේනරය තුළට mount නොකරන්න.
>
> කන්ටේනරය තුළ ස්වයංක්රීය යාවත්කාලීන කිරීම අවශ්ය නොවේ නම්, `cli` profile එක අක්රියව තබන්න
> (`COMPOSE_PROFILES=core,redis` හෝ ඊට කෙටි එකක්). අනෙක් profiles
> Docker socket එක mount නොකරයි.
>
> MITM සම්බන්ධ තර්ජන ආකෘතිය සඳහා `docs/security/MITM-TPROXY-DECRYPT.md` (git තුළ ඇත; `/docs` වෙත සම්පාදනය කර නැත) බලන්න,
> එමෙන්ම `codex`/`claude-code`/`droid`/`openclaw` binary මූලාශ්ර දාමය සඳහා
> `docs/security/SUPPLY_CHAIN.md` බලන්න.

## Redis Sidecar

OmniRoute බෙදාහැරුණු වේග සීමාකාරකය සහ හවුල් හැඹිලිය සඳහා Redis මත රඳා පවතී. `redis` සේවාව `docker-compose.yml` තුළ **සැමවිටම නිර්වචනය කර ඇත** (එයට profile සීමාවක් නොමැත) සහ වෙනත් ඕනෑම profile එකක් සමඟ ආරම්භ වේ.

| විස්තරය                      | අගය                                      |
| ---------------------------- | ---------------------------------------- |
| Image                        | `redis:7-alpine`                         |
| Container නාමය               | `omniroute-redis`                        |
| අභ්යන්තර port එක             | `6379`                                   |
| Host port එක (අභිබවා යාම)    | `REDIS_PORT` (පෙරනිමිය `6379`)           |
| Host bind කිරීම (අභිබවා යාම) | `REDIS_BIND_HOST` (පෙරනිමිය `127.0.0.1`) |
| Volume                       | `omniroute-redis-data` → `/data`         |
| Healthcheck                  | `redis-cli ping` (තත්පර 10ක පරතරය)       |

අදාළ environment variables:

- `REDIS_URL` — යෙදුමට ඇතුළත් කරන connection string එක (පෙරනිමියෙන් `redis://redis:6379`).
- `REDIS_PORT` — Redis container එක සඳහා host පාර්ශ්වයේ port mapping එක.
- `REDIS_BIND_HOST` — port එක ප්රකාශයට පත් කරන host interface එක. පෙරනිමිය `127.0.0.1` වේ.

> **පෙරනිමියෙන් loopback භාවිත කරන්නේ ඇයි:** sidecar එක `requirepass` නොමැතිව ක්රියාත්මක වන අතර, යෙදුම්
> containers එය compose ජාලය (`redis:6379`) හරහා සම්බන්ධ කර ගනී — ප්රකාශිත port එක ඇත්තේ
> host පාර්ශ්වයේ මෙවලම් (`redis-cli`, දේශීය `npm run dev`) සඳහා පමණි. එය
> `0.0.0.0` මත ප්රකාශයට පත් කිරීමෙන් සත්යාපනය නොකළ Redis එකක් ඔබගේ LAN එකේ සෑම host එකකටම නිරාවරණය වේ. ඔබ
> `REDIS_BIND_HOST=0.0.0.0` සකසන්නේ නම්, සේවාවේ `command:` වෙත `--requirepass` ද එක් කරන්න.

**Redis අක්රිය කිරීම** නිර්දේශ නොකෙරේ (වේග සීමාකාරකය මතකය තුළ ක්රියාත්මක වන fallback එකකට පහත වැටෙනු ඇත). එය අත්යවශ්ය නම්, `docker-compose.yml` තුළ ඇති `redis:` සේවා block එක ඉවත් කරන්න/අදහස් සටහනක් බවට පත් කරන්න, නැතහොත් එය ශුන්යය දක්වා scale කරන්න:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

dev සමඟ එකවර ක්රියාත්මක වන හුදකලා production snapshot එකක් සඳහා `docker-compose.prod.yml` භාවිත කරන්න.

| විස්තරය                   | අගය                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| ගොනුව                     | `docker-compose.prod.yml`                                                                 |
| පෙරනිමි dashboard port එක | `PROD_DASHBOARD_PORT=20130` (අභ්යන්තර `${DASHBOARD_PORT:-20128}` වෙත map කර ඇත)           |
| පෙරනිමි API port එක       | `PROD_API_PORT=20131`                                                                     |
| Image                     | `omniroute:prod` (`runner-cli` target එකෙන් build කර ඇත)                                  |
| Redis container එක        | `omniroute-redis-prod` (`redis:8.6.2`, වෙන් කළ `redis-prod-data` volume එක)               |
| Data volume එක            | `omniroute-prod-data` (නාමික, නැවත build කිරීම් අතරතුර පවත්වා ගනී)                        |
| Healthchecks              | `node healthcheck.mjs` + `redis-cli ping`, Redis සෞඛ්ය තත්ත්වය මත `depends_on` සීමා කර ඇත |

භාවිත කරන ආකාරය:

```bash
# Production stack එක build කර ආරම්භ කරන්න
docker compose -f docker-compose.prod.yml up -d --build

# Logs අඛණ්ඩව පෙන්වන්න
docker compose -f docker-compose.prod.yml logs -f

# නවත්වන්න (volumes තබා ගන්න)
docker compose -f docker-compose.prod.yml down
```

prod stack එක dev compose එකට සමාන්තරව ක්රියාත්මක වේ (වෙනස් container නාම, ports සහ volumes භාවිත කරයි), එබැවින් production ක්රියාත්මකව පවතින අතරතුර ඔබට දේශීයව අඛණ්ඩව සංවර්ධනය කළ හැකිය.

## Dockerfile අදියර

ගබඩාව සමඟ බහු-අදියර Dockerfile එකක් (`Dockerfile`) සපයනු ලැබේ. අදියර හතරක් නිරාවරණය කර ඇත; ඔබේ භාවිත අවස්ථාව සඳහා නිවැරදි `target` එක තෝරන්න.

| අදියර         | මූලික image එක        | අරමුණ                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | පරායත්තතා ස්ථාපනය කරයි (`npm ci --legacy-peer-deps`) සහ `npm run build` ධාවනය කරයි (පෙරනිමියෙන් Turbopack — පහත ගොඩනැගීම්-කාලීන සම්පත් බලන්න)                                                                                                                                        |
| `runner-base` | `node:26-trixie-slim` | Next.js ස්වාධීන ප්රතිදානය සහිත නිෂ්පාදන ධාවන පරිසරය. **සපයන්නන්ගේ CLI කිසිවක් ඇතුළත් කර නැත.**                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` සහ ගෝලීය CLI එක් කරයි: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **නියෝජිත-පාදක කාර්ය ප්රවාහ සඳහා මෙය තෝරන්න.**                                                                                                        |
| `runner-web`  | `runner-base`         | වෙබ්-සැසි සපයන්නන් සඳහා Playwright + Chromium බ්රවුසරයක් (`--with-deps`) එක් කරයි: `gemini-web`, `claude-web`, `claude-turnstile`. **ඔබ එම සපයන්නන් භාවිත කරන විට මෙය තෝරන්න** — මෙය නොමැති සාමාන්ය image එක ඉල්ලීම් අවස්ථාවේ අසාර්ථක වේ (නිකුතු නාලිකා යටතේ ඇති `-web` සටහන බලන්න). |

නිශ්චිත target එකක් අතින් ගොඩනඟන්න:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ගොඩනැගීම්-කාලීන සම්පත්

`builder` අදියරේ සම්පත් පිරිවැය පාලනය කරන්නේ build args තුනකි. ඒවා ගොඩනැගීම් කාලයට පමණක් අදාළ වේ —
`OMNIROUTE_MEMORY_MB` (පහත) යනු වෙනම ධාවන-කාලීන පාලකයකි.

| Build arg                   | පෙරනිමිය | බලපෑම                                                                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`      | `0` නම් ඒ වෙනුවට webpack සමඟ ගොඩනඟයි. උපරිම මතක භාවිතය අඩු නමුත් මන්දගාමී වේ.                               |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | ආරම්භ කරන `next build` සඳහා V8 heap සීමාව (`--max-old-space-size`).                                         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL` වෙත අගය සපයයි; පිටු-දත්ත රැස් කිරීම සඳහා Next විසින් `workers = N - 1` ව්යුත්පන්න කරයි. |

විශාල builder එකකදී වැඩි කළ යුතු සහ සම්පත් සීමිත ගොඩනැගීමක් `✓ Compiled successfully` **පසු** නතර වුවහොත් සැක කළ යුතු අගය වන්නේ `OMNIROUTE_BUILD_WORKERS` ය.
සෑම පිටු-දත්ත worker එකක්ම වෙනම ක්රියාවලියක් වන අතර, මව් `next build` එකද වෙනම ක්රියාවලියකි;
සජීවී VPS ප්රතිනිෂ්පාදනයකදී (issue #7518), `NODE_OPTIONS` heap flag එකෙන් ස්වාධීනව සෑම ක්රියාවලියකම උපරිම RSS අගය ~4.5 GB ලෙස මනින ලදී (Turbopack, V8 heap එකෙන් පිටත native/Rust මතකයේ compile කරයි). `2` පෙරනිමිය (→ worker 1ක්, සමස්ත ක්රියාවලි 2ක්) ප්රකාශන pipeline එක භාවිත කරන 16 GB / 4 vCPU GitHub-hosted runner සඳහා සකසා ඇත. `8` දී (→ workers 7ක්) එම runner එකේ මතකය අවසන් වූ අතර buildkit විසින් `ResourceExhausted: ... cannot allocate memory` සමඟ පියවර අසාර්ථක කරන ලදී;
එක් එක් ක්රියාවලියේ RSS අගය අනුමාන කිරීම වෙනුවට සෘජුව මැනීමෙන් පසුව `3` (→ workers 2ක්) පවා ප්රමාණවත් නොවීය. `tests/unit/docker-build-memory-budget.test.ts` මනින ලද අගයට එරෙහිව ගණනය කිරීම් සිදු කරන අතර, ඕනෑම පාලකයක් runner එකේ ධාරිතාව ඉක්මවන්නේ නම් අසාර්ථක වේ.

Turbopack, V8 heap එකෙන් **පිටත** පවතින native Rust මතකයේ compile කරන බැවින් `OMNIROUTE_BUILD_MEMORY_MB` මඟින් එය සීමා නොවේ. මතක සීමාවක් සහිත host එකකදී OOM killer විසින් කිසිදු දෝෂ පෙළක් නොමැතිව ගොඩනැගීම SIGKILL කරනු ලැබේ — එය `Creating an optimized production build` අතරමැද සරලව නවතින බැවින්, මතකය අවසන් වීමක් වෙනුවට සිරවීමක් මෙන් පෙනේ. ගොඩනැගීම් host එක සම්පත් සීමිත නම්, bundler එක මාරු කරන්න:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` සක්රීය කර ඇති බැවින්, `next build` මව් ක්රියාවලියක් **සහ** worker ක්රියාවලියක් ධාවනය කරන අතර ඒ සෑම එකක්ම `OMNIROUTE_BUILD_MEMORY_MB` සඳහා වෙන වෙනම අනුගත වේ. Container සීමාව එම අගයේ එක් ගුණයකට නොව, දළ වශයෙන් දෙගුණයකට වඩා ඉහළින් සකසන්න.

මෙම tree එක මත මනින ලදී (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container සීමාව | ප්රතිඵලය                           |
| --------- | --------------- | ---------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | දෙකේදීම නිහඬව OOM-killed විය       |
| webpack   | 8 GiB           | build worker එක SIGKILL කරන ලදී    |
| webpack   | 12 GiB          | සාර්ථක විය, උපරිම අගය 11.1 GiB විය |

### ධාවන-කාලීන පෙරනිමි

`runner-base` මඟින් export කරන පෙරනිමි: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker තුළ මතක හැසිරීම:

- රූපය `OMNIROUTE_MEMORY_MB=1024` ලෙස සකසා, එයින් `NODE_OPTIONS=--max-old-space-size=1024` ව්යුත්පන්න කරයි.
- සැබෑ සේවාදායක ක්රියාවලිය standalone launcher මඟින් ආරම්භ කරන අතර, එය `OMNIROUTE_MEMORY_MB` කියවා `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` එක් කරයි.
- නැවත නැවත සඳහන් කළ `--max-old-space-size` අගයන්ගෙන් අවසාන අගය Node භාවිත කරන බැවින්, `OMNIROUTE_MEMORY_MB` සැකසීමෙන් සත්ය වශයෙන් ක්රියාත්මක වන Docker heap සීමාව පාලනය වේ.
- රූපය සැමවිටම එය සකසන බැවින්, launcher සතු RAM අනුව ක්රමාංකනය කළ fallback අගය Docker යටතේ කිසිවිටෙක යෙදෙන්නේ නැත. කාර්යභාරයට ගැළපෙන පරිදි එය පැහැදිලිව වැඩි කරන්න (පහත වගුව බලන්න). coding-agent `/v1/responses` සඳහා `2048` තවමත් ඉතා කුඩාය.

### coding agents සඳහා runtime RAM

1 GiB Docker පෙරනිමිය යනු dashboard/සැහැල්ලු chat සඳහා අවම මට්ටමක් මිස නිෂ්පාදන භාවිතයට සුදුසු ප්රමාණයක් නොවේ. දිගු `POST /v1/responses` body (පණිවිඩ සිය ගණනක් සහ මෙවලම් දස ගණනක්) compression අතරතුර මතකය තුළ graphs කිහිපයක් රඳවා තබයි. එකිනෙක අතිච්ඡාදනය වන ~3 MiB / ~750k-token ඉල්ලීම් දෙකක් **12 GiB** old-space එකකදී V8 නවතා දමා ඇත (`FATAL ERROR: Reached heap limit`), එමෙන්ම 16 GiB cgroup OOM සීමාවටද ළඟා වී ඇත. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) බලන්න.

cgroup `--memory` ප්රමාණය **heap එකට වඩා වැඩිව** සකසන්න — native buffers, SQLite සහ compression අතරමැදි දත්ත V8 පිටත පවතී.

| කාර්යභාරය                                 | `OMNIROUTE_MEMORY_MB`   | Container / cgroup                     | සටහන්                                                                                                           |
| ----------------------------------------- | ----------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Dashboard, එක් සැහැල්ලු chat එකක්         | `1024` (රූපයේ පෙරනිමිය) | ≥2 GiB                                 |                                                                                                                 |
| එක් coding agent එකක් (Claude/Codex/Grok) | `8192`                  | ≥10 GiB                                | සාමාන්ය single-session `/v1/responses`                                                                          |
| සමගාමී දිගු `/v1/responses` දෙකක්         | `10240`–`12288`         | ≥12–16 GiB                             | ~12 GiB heap එකකදී V8 නවතා දැමීම මැන ඇත                                                                         |
| සමගාමී දිගු contexts තුනක් හෝ වැඩි ගණනක්  | එක් ක්රියාවලියක නොකරන්න | අනුක්රමිකව ක්රියාත්මක කරන්න / වැඩි RAM | පෙරනිමි heavyweight admission අගය එකවර ක්රියාත්මක වන 1කි; RAM වැඩි නොකර එය ඉහළ දැමීමෙන් නැවත නවතා දැමීම සිදු වේ |

`OMNIROUTE_MEMORY_MB` **සකසා නොමැති** විට, bare metal මත `omniroute serve` RAM ප්රමාණයෙන් ~35%කට ක්රමාංකනය කරයි (`[512, 4096]` පරාසයට සීමා කරයි). Docker සැමවිටම `1024` සකසන බැවින්, නිල රූපය තුළ එම ක්රමාංකනය කිසිවිටෙක ක්රියාත්මක නොවේ.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## තීරණාත්මක පරිසර විචල්ය

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) හි ලේඛනගත කර ඇති පෙරනිමි අගයන්ට අමතරව, Docker යටතේ ධාවනය කිරීමේදී පහත විචල්ය වඩාත් වැදගත් වේ:

| විචල්යය                       | අරමුණ                                                                                                                                                                                                                                                                                   | පෙරනිමිය                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket bridge සඳහා හවුල් රහස් අගය. **නිෂ්පාදන පරිසරයේදී අවශ්යයි** — ප්රබල අහඹු අක්ෂර මාලාවකට සකසන්න.                                                                                                                                                                                 | සකසා නැත (සැපයිය යුතුය) |
| `REDIS_URL`                   | rate limiter / cache backend සඳහා සම්බන්ධතා අක්ෂර මාලාව                                                                                                                                                                                                                                 | `redis://redis:6379`    |
| `REDIS_PORT`                  | ඇතුළත් Redis container එක සඳහා host පාර්ශ්වයේ port එක                                                                                                                                                                                                                                   | `6379`                  |
| `REDIS_BIND_HOST`             | ඇතුළත් Redis port එක ප්රකාශයට පත් කරන host interface එක (ඔබ AUTH එක් නොකරන්නේ නම් loopback)                                                                                                                                                                                             | `127.0.0.1`             |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ස්වයං-යාවත්කාලීන කාර්ය ප්රවාහ සඳහා `cli` profile එක තුළ `/workspace/omniroute` වෙත mount කරන host path එක                                                                                                                                                                               | `.` (වත්මන් නාමාවලිය)   |
| `OMNIROUTE_MEMORY_MB`         | Docker standalone server එක සඳහා runtime Node heap උපරිම සීමාව; ඉහත image පෙරනිමිය අභිබවා යයි. Coding agents: `8192`+ ([runtime RAM](#runtime-ram-for-coding-agents) බලන්න).                                                                                                            | `1024`                  |
| `DASHBOARD_PORT` / `API_PORT` | dashboard (20128) සහ API (20129) සඳහා නිරාවරණය කරන ports අභිබවා සකසයි                                                                                                                                                                                                                   | `20128` / `20129`       |
| `APP_BIND_HOST`               | docker-compose මඟින් dashboard/API/live-WS ports ප්රකාශයට පත් කරන host interface එක. `REQUIRE_API_KEY=false` (පෙරනිමිය) සමඟ, `0.0.0.0` මඟින් නිර්නාමික `/v1` proxy එක LAN වෙත නිරාවරණය කරයි — එය පුළුල් කරන්නෙ `REQUIRE_API_KEY=true` සමඟ හෝ ඉදිරියෙන් reverse proxy එකක් ඇති විට පමණි. | `127.0.0.1`             |
| `CLIPROXY_BIND_HOST`          | docker-compose මඟින් `cliproxyapi` sidecar එක ප්රකාශයට පත් කරන host interface එක — එහි data volume එක තුළ provider credentials රඳවා ඇත.                                                                                                                                                 | `127.0.0.1`             |
| `OMNIROUTE_PLUGINS_DIR`       | runtime plugin scanner එක කියවා ස්ථාපනය කරන නාමාවලිය. plugins bind-mount කර ඇති විට මෙය සකසන්න: පෙරනිමිය `HOME` අනුව සැකසෙන අතර, image එකක් එය export නොකර තිබිය හැක.                                                                                                                   | `~/.omniroute/plugins`  |
| `OMNIROUTE_BASE_PATH`         | app එක reverse proxy එකක් පසුපස ප්රකාශයට පත් කරන විට භාවිත වන URL උපමාර්ගය (උදා. `/omniroute`)                                                                                                                                                                                          | _(හිස් = මූලය)_         |
| `NEXT_PUBLIC_BASE_URL`        | උපමාර්ගය ඇතුළත් පොදු browser origin එක (උදා. `https://host/omniroute`)                                                                                                                                                                                                                  | සකසා නැත                |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` සඳහා host පාර්ශ්වයේ dashboard port එක                                                                                                                                                                                                                         | `20130`                 |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar එක සඳහා host පාර්ශ්වයේ port එක                                                                                                                                                                                                                                    | `8317`                  |

## උපමාර්ගයක ප්රතිලෝම ප්රොක්සිය (Traefik / nginx)

Next.js `basePath` ස්වාධීන bundle එක තුළට සම්පාදනය කර ඇත. OmniRoute විසින් යෙදුම් මූලයේ ඇති sentinel ගොනුවක එම ඇතුළත් කළ අගය සටහන් කරයි (`npm run build` අතරතුර ලියනු ලැබේ; `scripts/docker/ensure-docker-base-path.mjs` මඟින් කියවනු ලැබේ) සහ container එක ආරම්භ වන විට එය `OMNIROUTE_BASE_PATH` සමඟ සසඳයි. ඒවා වෙනස් වන විට සහ image එක domain මූලය සඳහා build කර ඇති විට, `node dev/run-standalone.mjs` ධාවනය වීමට පෙර entrypoint එක ස්වාධීන manifests, කාවැද්දූ `basePath`/`assetPrefix` literals (Next 16 විසින් SSR asset URLs `assetPrefix` වෙතින් පමණක් render කරයි — patcher එක උපමාර්ගය එයටද පිටපත් කරයි), ඇතුළත් කළ `/_next/static` asset URLs (client-reference manifests, media imports, පූර්ව-render කළ error pages) සහ client `process.env` shim එක නැවත ලියයි.

### Compose build එක (නිර්දේශිතයි)

Image එක සහ runtime එක එකඟ වන පරිදි `.env` තුළ variables දෙකම සකසා, ඉන්පසු නැවත build කරන්න:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` විසින් `OMNIROUTE_BASE_PATH`, Docker build-arg එකක් ලෙසත් runtime environment variable එකක් ලෙසත් ඉදිරියට යවයි.

### පෙර-build කළ root image එක + runtime උපමාර්ගය

ප්රකාශිත `diegosouzapw/omniroute:*` images domain මූලය සඳහා build කර ඇත. එසේ වුවද, ඔබට runtime එකේදී `OMNIROUTE_BASE_PATH` සැකසිය හැක; container එක startup අවස්ථාවේදී bundle එක එක් වරක් patch කරයි. එයට ගැළපෙන public origin එකද සමඟ සකසන්න:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**සම්පූර්ණ** බාහිර මාර්ගය ඉදිරියට යැවීමට ප්රතිලෝම ප්රොක්සිය වින්යාස කරන්න (prefix එක ඉවත් නොකරන්න). Next.js වෙත `/omniroute/...` ලැබී `/omniroute/_next/...` වෙතින් assets සපයන පරිදි, Traefik විසින් `StripPrefix` නොමැතිව `PathPrefix(`/omniroute`)` container එක වෙත route කළ යුතුය.

Docker healthcheck එක සක්රිය `OMNIROUTE_BASE_PATH` prefix එක සහිත සැහැල්ලු `/healthz` lifecycle endpoint එක පරීක්ෂා කරයි. මිනිසුන්/උපකරණ පුවරු diagnostics සඳහා `/api/monitoring/health` තවදුරටත් ලබාගත හැක; container HEALTHCHECK එක නැවත එයට යොමු කිරීමට (උදාහරණයක් ලෙස ගැඹුරු සෞඛ්ය තත්ත්ව බලාත්මක කිරීම සඳහා), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` සකසන්න. එම මාර්ගය **ගැඹුරු** පරීක්ෂාවකි (DB + monitoring සාරාංශය) — ඔබ එය නැවත සක්රිය කිරීමට තෝරාගන්නේ නම් Docker හි කලාතුරකින් ක්රියාත්මක වන `HEALTHCHECK` සඳහා සුදුසු නමුත්, Kubernetes `livenessProbe` කාලාන්තර සඳහා **සුදුසු නොවේ**.

Orchestrators (Kubernetes, Nomad, ආදිය) සඳහා:

| Probe           | වඩාත් සුදුසුයි                                                       | වළකින්න                                                         |
| --------------- | -------------------------------------------------------------------- | --------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, හෝ ප්රධාන port එකේ TCP (`PORT`, පෙරනිමිය `20128`) | liveness ලෙස `/api/monitoring/health`                           |
| Readiness       | HTTP `GET /healthz`                                                  | event loop එක කාර්යබහුල වීම අක්රිය වීමක් ලෙස සලකන දැඩි timeouts |
| Deep / blackbox | `/api/monitoring/health`                                             | —                                                               |

`/healthz` process lifecycle එක (`ok` / `starting` / `stopping`) වාර්තා කරයි. `/livez` යනු process එක සජීවීද යන්න පමණක් පරීක්ෂා කරන endpoint එකකි (handler එක ක්රියාත්මක විය හැකි සෑම විටම 200; එය readiness සඳහා බලා නොසිටී). දෙකම request handling සඳහා භාවිත කරන Node event loop එකේම තවදුරටත් ක්රියාත්මක වන බැවින්, CPU-බර catalog හෝ compression කාර්යයන් ඒවා ප්රමාද කළ හැක — කාර්යබහුල ≠ අක්රිය. HTTP probes කල් ඉකුත් වන්නේ නම් TCP liveness වඩාත් සුදුසුය. සම්පූර්ණ probe මාර්ගෝපදේශය:
[Monitoring මාර්ගෝපදේශය — Kubernetes probe නිර්දේශ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy සමඟ Docker Compose (HTTPS Auto-TLS)

Caddy හි ස්වයංක්රීය SSL සැපයීම භාවිතයෙන් OmniRoute ආරක්ෂිතව නිරාවරණය කළ හැක. ඔබේ වසමේ DNS A වාර්තාව ඔබේ සේවාදායකයේ IP ලිපිනය වෙත යොමු වන බව තහවුරු කරගන්න.

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
      # OAuth ආපසු-කැඳවීම්, උපකරණ පුවරු සබැඳි සහ ජනනය කළ පොදු URL සඳහා බ්රවුසරය වෙත මුහුණලා ඇති මූලය.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # කාලසටහන්ගත කාර්යයන් / ස්වයං-ලබාගැනීම් සඳහා අභ්යන්තර සේවාදායකයෙන්-සේවාදායකයට URL එක.
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

Caddy ඉහළ ප්රවාහයේ කන්ටේනරය සඳහා සම්මත ඉදිරියට යැවීමේ ශීර්ෂක සකසයි. OAuth ආපසු-කැඳවීම් සහ ජනනය කළ පොදු සබැඳි සඳහා OmniRoute විසින්
`NEXT_PUBLIC_BASE_URL` කැනොනිකල් පොදු මූලය ලෙස භාවිත කරයි; සත්යාපිත උපකරණ පුවරු ලිවීම් එකම-මූල ඉල්ලීම් සහ සැසියට බැඳුණු CSRF
ආරක්ෂාව භාවිත කරයි. පැහැදිලි වින්යාසය වෙනුවට විශ්වාසදායක ඉදිරියට යැවූ ශීර්ෂක මඟින් OmniRoute විසින් පොදු මූලය නිර්ණය කිරීමට ඔබ හිතාමතාම
අවශ්ය කරන උසස් යෙදවීම් සඳහා පමණක් `OMNIROUTE_TRUST_PROXY` සබල කරන්න.

## Cloudflare Quick Tunnel

Docker යෙදවීම් සඳහා වන උපකරණ පුවරු සහායට `Dashboard → Endpoints` හි එක්-ක්ලික් **Cloudflare Quick Tunnel** එකක් ඇතුළත් වේ. පළමු වරට සබල කිරීමේදී අවශ්ය වූ විට පමණක් `cloudflared` බාගත කර, ඔබේ වත්මන් `/v1` අන්ත ලක්ෂ්යය වෙත තාවකාලික උමඟක් ආරම්භ කර, ජනනය කළ `https://*.trycloudflare.com/v1` URL එක ඔබේ සාමාන්ය පොදු URL එකට සෘජුවම පහළින් පෙන්වයි.

සක්රිය උමඟේ තත්ත්වය වෙනස් නොකර `Settings → Appearance` වෙතින් අන්ත ලක්ෂ්ය උමං පැනල (Cloudflare, Tailscale, ngrok) පෙන්වීමට හෝ සැඟවීමට හැක.

### උමං සටහන්

- Quick Tunnel URL තාවකාලික වන අතර සෑම නැවත ආරම්භ කිරීමකටම පසුව වෙනස් වේ.
- OmniRoute හෝ කන්ටේනරයක් නැවත ආරම්භ කිරීමෙන් පසුව Quick Tunnels ස්වයංක්රීයව ප්රතිස්ථාපනය නොවේ. අවශ්ය විට උපකරණ පුවරුවෙන් ඒවා නැවත සබල කරන්න.
- කළමනාකරණය කළ ස්ථාපනය දැනට `x64` / `arm64` මත Linux, macOS සහ Windows සඳහා සහය දක්වයි.
- සීමාකළ කන්ටේනර් පරිසරවල ශබ්දකාරී QUIC UDP බෆර් අනතුරු ඇඟවීම් වළක්වා ගැනීම සඳහා, කළමනාකරණය කළ Quick Tunnels පෙරනිමියෙන් HTTP/2 ප්රවාහනය භාවිත කරයි. ඔබට වෙනත් ප්රවාහනයක් අවශ්ය නම් `CLOUDFLARED_PROTOCOL=quic` හෝ `auto` සකසන්න.
- Docker රූප පද්ධති CA මූලයන් ඇතුළත් කර ඒවා කළමනාකරණය කළ `cloudflared` වෙත ලබා දෙයි. එමඟින් උමඟ කන්ටේනරය තුළ ආරම්භ වන විට TLS විශ්වාස අසාර්ථක වීම් වළක්වයි.
- OmniRoute විසින් එකක් බාගත කිරීම වෙනුවට පවතින ද්විමය ගොනුවක් භාවිත කිරීමට ඔබට අවශ්ය නම් `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` සකසන්න.

## Image ටැග්

| Image                    | Tag      | ප්රමාණය | විස්තරය                                                 |
| ------------------------ | -------- | ------- | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | ඉහළම **ප්රකාශිත** ස්ථාවර SemVer (`main` git ශාඛාව නොවේ) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | GitOps සඳහා මෙම ටැග් පන්තිය ස්ථිර කරන්න                 |

බහු-වේදිකා manifest එක: ස්වදේශීය `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker ස්වයංක්රීයව ගැළපෙන architecture එක තෝරයි; ARM host මත AMD64 emulation බලයෙන් යෙදීමට අවශ්ය නම් `--platform linux/amd64` ලබා දෙන්න.

### නිකුතු නාලිකා

OmniRoute ස්ථාවර නිකුතු, සක්රිය නිකුතු-ශාඛා පරීක්ෂණ සහ සංවර්ධන build සඳහා වෙන වෙනම Docker නාලිකා ප්රකාශයට පත් කරයි.

| නාලිකාව                         | මූලාශ්රය                          | වෙනස් කළ හැකි බව               | නිර්දේශිත භාවිතය                                                                                                           |
| ------------------------------- | --------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | අත්සන් කළ/අනුවාදගත නිකුතුව        | වෙනස් කළ නොහැක                 | නිශ්චිත නිකුතුවකට ස්ථිර කළ නිෂ්පාදන deployment                                                                             |
| `:latest` / `:latest-web`       | ඉහළම **ප්රකාශිත** ස්ථාවර SemVer   | වෙනස් කළ හැකි ස්ථාවර යොමුව     | SemVer publish job එකකට **පසුව** ස්ථාවර නිකුතු අනුගමනය කරයි — `main` හෝ නිකුත් නොකළ `release/v*` commit අනුගමනය **නොකරයි** |
| `:next` / `:next-web`           | වත්මන් පෙරනිමි `release/v*` ශාඛාව | වෙනස් කළ හැකි පෙර-නිකුතු යොමුව | සක්රිය නිකුතු ශාඛාවට එක් කර ඇති නමුත් තවමත් ස්ථාවර නිකුතුවක නොමැති නිවැරදි කිරීම් පරීක්ෂා කිරීම                            |
| `:main` / `:main-web`           | `main` ශාඛාව                      | වෙනස් කළ හැකි සංවර්ධන යොමුව    | සංවර්ධන සහ ඒකාබද්ධතා පරීක්ෂණ සඳහා පමණි                                                                                     |

#### වෙබ්-සැසි providers: `-web` images

ඉහත සෑම නාලිකාවකටම `-web` ටැගයක් (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ඇත; එය `runner-web` stage එකෙන් build කරනු ලබයි — එනම් එම image එකටම Playwright සහ Chromium browser එකක් එක් කළ ආකාරයයි. සාමාන්ය image එක Chromium **නොමැතිව** සපයනු ලැබේ; `gemini-web`, `claude-web` සහ `claude-turnstile` සඳහා එය අවශ්ය වේ.

අසාර්ථක වීම startup අවස්ථාවේ සිදු නොවී පසුවට කල් යයි: එම providers තම models ලැයිස්තුගත කර dashboard එකේ සම්බන්ධ වී ඇති ලෙස පෙන්වන අතර, පහත දෝෂය සමඟ අසාර්ථක වන්නේ පළමු request එක පමණි:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

ඔබ එම providers භාවිත කරන්නේ නම්, ඔබ දැනටමත් භාවිත කරන නාලිකාවේ `-web` ටැගය pull කරන්න — වෙනත් කිසිවක් වෙනස් නොවේ. npm/CLI ස්ථාපනයකදී (Docker image එකක් නොමැතිව), ඊට සමානව අස්ථානගත කොටස වන්නේ browser binary එකයි: host එක මත `npx playwright install chromium` ධාවනය කරන්න.

#### පෙර-නිකුතු නාලිකාව භාවිත කිරීම

වත්මන් පෙරනිමි `release/v*` ශාඛාවට සිදු කරන සෑම push එකකදීම `next` නාලිකාව නැවත build කෙරෙන අතර, එය AMD64 සහ ARM64 යන දෙකටම ප්රකාශයට පත් කෙරේ. පැරණි maintenance ශාඛාවලට එය උඩින් ලිවිය නොහැක. ඊළඟ ස්ථාවර ටැගය නිර්මාණය කිරීමට පෙර සක්රිය නිකුතු ශාඛාවට merge කර ඇති නිවැරදි කිරීම් සඳහා මෙම නාලිකාව pull කළ හැකි image එකක් සපයයි.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose සඳහා, තෝරාගත් profile එක භාවිත කරන image ටැගය override කර, පසුව service එක pull කර නැවත සාදන්න:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ආරක්ෂාව සහ rollback කිරීම

`next` යනු වෙනස් වෙමින් පවතින පෙර-නිකුතු නාලිකාවකි. සක්රිය නිකුතු ශාඛාවට සිදු කරන ඕනෑම push එකකදී එය වෙනස් විය හැකි අතර, එය **නිෂ්පාදන භාවිතය සඳහා සහාය නොදක්වයි**. නිශ්චිත build එකක් ඇගයීමේදී image digest එක ස්ථිර කරන්න:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

පරීක්ෂා කිරීමට පෙර, OmniRoute data volume එක හෝ bind-mount කළ data directory එක backup කරන්න. rollback කිරීමට, පෙර භාවිත කළ ස්ථාවර අනුවාදය හෝ digest එක ප්රතිස්ථාපනය කර container එක නැවත සාදන්න:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

නිකුතු-ශාඛා build එකකට කිසිවිටෙක `latest` ගෙන යා නොහැක; ස්ථාවර යොමුව promote කළ හැක්කේ සුදුසුකම් ලබන ස්ථාවර semantic version එකකට පමණි. `next` images නිකුතු image පරීක්ෂාව සහ අවහිර කරන CRITICAL-vulnerability gate එක තබා ගනී.

**`latest` යනු git සඳහා අලුත්ම තත්ත්වය පිළිබඳ සහතිකයක් නොවේ.** ස්ථාවර SemVer image එකක් ප්රකාශයට පත් කර publish job එක විසින් `:latest` promote කරන තෙක් (එම SemVer එකට සමාන digest එක සමඟ), `main` වෙත හෝ සක්රිය `release/v*` ශාඛාව වෙත merge කළ නිවැරදි කිරීම් `:latest` තුළ **අඩංගු නොවේ**. GitHub දැනටමත් නිවැරදි කිරීම පෙන්වන නමුත් `latest` වෙනස් නොවී ඇති බව පෙනේ නම්, නිකුතු ශාඛාව පරීක්ෂා කිරීමට `:next` pull කරන්න, නැතහොත් SemVer ටැගය නිකුත් වන තෙක් රැඳී සිටින්න.

| ඔබට අවශ්ය දේ                                                           | භාවිත කරන්න                               |
| ---------------------------------------------------------------------- | ----------------------------------------- |
| වෙනස් නොවිය යුතු GitOps / නිෂ්පාදන පරිසරය                              | `:X.Y.Z` (හෝ image digest එක) ස්ථිර කරන්න |
| ප්රකාශිත ස්ථාවර නිකුතු අනුගමනය කර සෑම නිකුතුවකදීම නැවත සෑදීම පිළිගැනීම | `:latest`                                 |
| නිකුත් නොකළ `release/v*` commit පරීක්ෂා කිරීම                          | `:next` (නිෂ්පාදනය සඳහා නොවේ)             |
| `main` පරීක්ෂා කිරීම                                                   | `:main` (නිෂ්පාදනය සඳහා නොවේ)             |

## ලබාගත හැකි බව: පෙරනිමි SQLite තනි-ප්රතිරූපයකි

සම්මත Docker / Kubernetes OmniRoute යනු **එක් Node ක්රියාවලියක් + එක් SQLite ලේඛකයෙක්** වේ. එම ස්ථල වින්යාසය මත ඉහළ ලබාගත හැකි බව **සහාය නොදක්වයි**.

| සීමාව                                                       | ප්රතිවිපාකය                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| තනි ලේඛකයා                                                  | එකම SQLite ගොනුව සමඟ ප්රතිරූප කිහිපයක් ක්රියාත්මක **නොකරන්න**. එය DB එක දූෂිත කරයි.                                                                                                                                                                                                                                                                                  |
| නැවත සෑදීම / නැවත ආරම්භ කිරීම / HEALTHCHECK මඟින් නතර කිරීම | ක්රියාත්මක වෙමින් පවතින SSE, උපකරණ පුවරු සැසි සහ මතකය තුළ ඇති තත්ත්වය **සම්පූර්ණයෙන්ම ඇණහිටී**. සම්බන්ධිත සෑම සේවාලාභියෙක්ම විසන්ධි වේ. අන්ත ලක්ෂ්ය නොමැති කාල පරාසය තුළ ලැබෙන නව ඉල්ලීම්වලට OmniRoute JSON වෙනුවට ප්රතිවිරුද්ධ ප්රොක්සියෙන් **`502 Bad Gateway: Unknown error`** ලැබේ — සේවාලාභීන්ට මෙය සැපයුම්කරුගේ අසාර්ථකත්වයකින් වෙන්කර හඳුනාගත නොහැක (#11015). |
| `/healthz` සමඟ එකම සිදුවීම් ලූපය                            | කාර්යබහුල නාමාවලි හෝ සම්පීඩන චක්රයක් මඟින් පරීක්ෂණ ප්රමාද කළ හැක; එවිට කෙටි කල් ඉකුත්වීමක් **එකම** ප්රතිරූපය නැවත ආරම්භ කරයි.                                                                                                                                                                                                                                        |

**පරීක්ෂණ අනුකෘතිය** ([Kubernetes පරීක්ෂණ නිර්දේශ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ද බලන්න):

| පරීක්ෂණය               | ඉලක්කය                                                    | භාවිත නොකළ යුතු දේ                                                       |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| සජීවීභාවය              | `PORT` මත TCP (පෙරනිමිය `20128`), හෝ මෘදු HTTP `/healthz` | `/api/monitoring/health`                                                 |
| සූදානම                 | HTTP `GET /healthz`                                       | සිදුවීම් ලූපය කාර්යබහුල වීම මියගිය තත්ත්වයක් ලෙස සලකන දැඩි කල් ඉකුත්වීම් |
| ගැඹුරු / මිනිසුන් සඳහා | `/api/monitoring/health`                                  | ස්වයංක්රීය kubelet සජීවීභාව පරීක්ෂණය                                     |

**උත්ශ්රේණි කිරීම්:** සෑම සැසියක්ම විසන්ධි වනු ඇතැයි අපේක්ෂා කරන්න. හැකි නම් සේවාලාභීන් ක්රමයෙන් ඉවත් කරන්න; පෙරනිමි SQLite මත අඛණ්ඩ යාවත්කාලීනයක් නොමැත. Compose `restart: unless-stopped` සහ Docker `HEALTHCHECK` මඟින්ද බහාලුම Unhealthy වූ විට එකම ක්රියාවලිය ප්රතිස්ථාපනය කරනු ඇත — බලපෑමේ පරාසය එලෙසමය.

**තනි ප්රතිරූපයක්** සඳහා Kubernetes කොටසක් (Recreate අවශ්ය වේ; එක් SQLite ගොනුවක් සඳහා `replicas` වැඩි නොකරන්න):

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

`preStop` නිද්රාව මඟින් SIGTERM ට පෙර Service අන්ත ලක්ෂ්ය ඉවත් කිරීමට kube වෙත ඉඩ සලසන බැවින්, මියයමින් පවතින ක්රියාවලිය වෙත **නව** ගමනාගමනය යැවීම නතර වේ. ක්රියාත්මක වෙමින් පවතින `/v1/responses` SSE, බර වැඩි ඇතුළත් කිරීමේ බදු ගිවිසුම් හරහා `SHUTDOWN_TIMEOUT_MS` දක්වා (පෙරනිමිය තත්පර 30කි) ක්රමයෙන් අවසන් කෙරේ (#11015). තවමත් ක්රියාවලිය වෙත ළඟා වන නව ඉල්ලීම්වලට `503` + `Retry-After: 5` ලැබේ. ප්රතිස්ථාපනය සූදානම් වන තෙක් පවතින Recreate හි හිස්-අන්ත-ලක්ෂ්ය පරතරය දැඩි ඇණහිටීමක් ලෙස පවතී — එය SQLite ස්ථල වින්යාසය නිසා වන අතර, පරීක්ෂණයේ වැරදි වින්යාසයක් නොවේ.

බාහිර Postgres / බහු-ලේඛක HA යනු ලේඛනගත කළ සම්මත ක්රමයක් **නොවේ**. ඔබට HA අවශ්ය නම්, තනි ප්රතිරූපයක් පවත්වා ගන්න හෝ ව්යාපෘතිය විසින් පරීක්ෂා කර වෙනම ලේඛනගත කර ඇති ස්ථල වින්යාසයක් ක්රියාත්මක කරන්න. Postgres/MySQL වැඩ කටයුතු [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) හි ඇත. එය නිකුත් වන තුරු, **විශාල** `/v1/responses` ධාරිතාව වැඩි කිරීමට සහාය දක්වන එකම ක්රමය ස්වාධීන ක්රියාවලි N ක්රියාත්මක කිරීමයි (ඊළඟ කොටස බලන්න), එක් පරිමාවක් මත `replicas > 1` භාවිත කිරීම නොවේ.

## පරිමාණය පිටතට පුළුල් කිරීම: ස්වාධීන ක්රියාවලි Nක්

එක් Node ක්රියාවලියක් යනු **එක් V8 heap එකකි**. එකිනෙක අතිච්ඡාදනය වන ~3 MiB / ~750k-token coding-agent `POST /v1/responses` ඉල්ලීම් දෙකක් (RTK + Caveman), ~12 Gi දී එම heap එක නවතා දමයි (`FATAL ERROR: Reached heap limit`) සහ 16 Gi cgroup එකක් OOM තත්ත්වයට පත් කළ හැක. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) බලන්න. එම මිනුම **මතක අයවැය** පිළිබඳ අනතුරු ඇඟවීමක් මිස, එකවර ක්රියාත්මක වන දිගු `/v1/responses` ඉල්ලීම් දෙකක නිෂ්පාදනමය දෘඪ උපරිමයක් නොවේ. අධි-බර chat ඇතුළත් කිරීම, එම V8/cgroup සීමාවෙන්ම ප්රමාණය ස්වයංක්රීයව නිර්ණය කරන ingest byte අයවැයක් (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) මඟින් පාලනය වේ — දැනටමත් ප්රමාණගත කර ඇති ක්රියාවලියක එය ඉහළ අගයකින් අතික්රමණය කිරීම (හෝ පැරණි `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ඉල්ලීම්-සංඛ්යා සීමාව සැකසීම) එම නවතා දැමීම නැවත ඇති කරයි. කුඩා chats, `/healthz`, `/v1/models`, සහ MCP මෙම සීමාවට **ඇතුළත් නොවේ**.

### එක් ක්රියාවලියක්: දිගු `/v1/responses` දෙකකට වැඩියෙන්

**සෞඛ්ය සම්පන්න** ක්රියාවලියකට (heap එක `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` අගයට පහළින් තිබේ නම්, පෙරනිමිය `0.75`) ක්රියාවලිය පුරා බලපාන inflight-byte අයවැයෙහි (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) තවමත් ඉඩ ඇති විට, එකවර දිගු `POST /v1/responses` ඉල්ලීම් දෙකකට වැඩියෙන් ක්රියාත්මක කිරීමට **හැකිය**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` අගයට සමාන හෝ ඊට වැඩි bodies (පෙරනිමිය 256 KiB) ව්යුහමය වශයෙන් බර ඉල්ලීම් භාවිත කරන අධි-බර lease එකම ලබාගෙන, එම [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ගැලවීම (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) භාවිත කරයි. එකවර ක්රියාත්මක දිගු SSE clients දස ගණනක් (මෙහෙයුම්කරුවන්ට බොහෝ විට 40–50ක් අවශ්ය වේ) යනු **මතක අයවැය** පිළිබඳ ප්රශ්නයකි — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ප්රමාණගත කරන්න — එය නිෂ්පාදනයේ දෘඪ “උපරිමය 2” සීමාවක් නොවේ. පීඩනයට ලක් වූ heap එකක් තවමත් නැවත උත්සාහ කළ හැකි `503` සමඟ ඉල්ලීම් ඉවත් කරන බැවින් #7849 නැවත ඇති නොවේ.

**heaps ගණන වැඩි කිරීමට** (ස්වාධීන V8 old-spaces) **අදම**:

| කළ යුතු දේ                                                                                                                                           | නොකළ යුතු දේ                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **N containers/pods** ක්රියාත්මක කර, එකිනෙකට **තමන්ගේම** `DATA_DIR` / volume එකක් ලබා දෙන්න                                                          | එක් SQLite file එකකට එරෙහිව `replicas > 1` සකසන්න                 |
| heap / inflight-byte අයවැයෙන් heavy in-flight + healthy-headroom ප්රමාණගත කරන්න; 1–2 යනු සංරක්ෂණශීලී #7849 පෙරනිමිය මිස නිෂ්පාදනයේ දෘඪ උපරිමයක් නොවේ | එක් ක්රියාවලියකට 8× RAM සහ සීමා රහිත සංඛ්යා සීමාවක් දෙන්න         |
| විකල්ප: **හවුල් quota counters** සඳහා `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                           | Redis හවුල් SQLite ලෙස සලකන්න — එය එසේ නොවේ                       |
| provider secrets එක් එක් instance එකට පිටපත් කරන්න (නැතිනම් වෙන් වූ dashboards පිළිගන්න)                                                             | instances හරහා එක් dashboard / එක් call-log එකක් බලාපොරොත්තු වන්න |
| ඕනෑම load balancer එකක් ඉදිරියෙන් යොදන්න; API key හෝ session අනුව sticky කිරීම ප්රමාණවත්ය                                                            | vendor-specific, size-aware middleware එකක් අනිවාර්ය කරන්න        |

දෘඩාංග: එක් instance එකකට එකවර ක්රියාත්මක දිගු `/v1/responses` ගණන **මතක අයවැය** පිළිබඳ ප්රශ්නයකි (heap + inflight-byte / #10110). ස්වාධීන `DATA_DIR` Nක් තවමත් heaps ගුණ කරයි: host RAM එක “N=8 සහිත එක් 16 Gi pod එකක්” නොව, `N × cgroup` සඳහා ප්රමාණවත් විය යුතුය. කිසිවිටෙක එක් SQLite file එකක් මත `replicas > 1` භාවිත නොකරන්න.

Compose සැලැස්මක් (heaps දෙකක්, volumes දෙකක් — `deploy.replicas: 2` නොවේ):

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

ක්රියාවලිය තුළ ඝනත්වය (HTTP isolate එකෙන් compression ඉවත් කිරීම) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) වේ. හවුල්, ස්ථායී state එකක් මත එක් තාර්කික cluster එකක් [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) වේ.

## වැදගත් සටහන්

- **SQLite WAL ප්රකාරය:** නවතම වෙනස්කම් `storage.sqlite` වෙත checkpoint කිරීමට OmniRoute හට හැකි වන පරිදි `docker stop` සම්පූර්ණ වීමට ඉඩ දිය යුතුය. ඇතුළත් කර ඇති Compose ගොනු දැනටමත් තත්පර 40ක නැවතුම් සහන කාලයක් සකසා ඇත. ඔබ image එක සෘජුවම ධාවනය කරන්නේ නම්, `--stop-timeout 40` තබා ගන්න.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** සාමාන්ය/ලිවීමට-පෙර උපස්ථ බාහිරව කළමනාකරණය කරන්නේ නම් මෙය `true` ලෙස සකසන්න. පවතින database සඳහා migrations සිදු කිරීමේදී තවමත් ඒවාටම වෙන්වූ කල්පවත්නා ආරක්ෂිත snapshot එකක් සහ සමූහ migration ආරක්ෂකයක් අවශ්ය වේ.
- **දත්ත ස්ථායිතාව:** container නැවත ආරම්භ කිරීම් අතරතුර ඔබගේ database, keys සහ configurations ස්ථිරව තබා ගැනීමට සෑම විටම `/app/data` වෙත volume එකක් mount කරන්න.
- **Port වින්යාසය:** පෙරනිමි `20128` port එක වෙනස් කිරීමට `PORT` environment variable එක override කරන්න.

## තවද බලන්න

- [VM යෙදවීම් මාර්ගෝපදේශය](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare සැකසුම
- [Fly.io යෙදවීම් මාර්ගෝපදේශය](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io වෙත යොදවන්න
- [Environment වින්යාසය](../reference/ENVIRONMENT.md) — සම්පූර්ණ `.env` යොමුව
