# 🐳 Docker Guide — OmniRoute (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> සම්පූර්ණ Docker යෙදවුම් යොමුව. ඉක්මන් ආරම්භයක් සඳහා, [README හි Docker කොටස](../README.md#-docker) බලන්න.

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
- [Image ටැග](#image-tags)
- [ලබාගත හැකි බව: පෙරනිමි SQLite තනි අනුරුවකි](#availability-default-sqlite-is-single-replica)
- [Docker තුළ Gemini කලාපීය දෝෂ](#gemini-regional-errors-inside-docker)
- [වැදගත් සටහන්](#important-notes)

---

## ඉක්මන් ධාවනය

> **එක් විධානයකින් ස්වයං-සත්කාරක කරන්නද?**
> [ස්වයං-සත්කාරක මාර්ගෝපදේශය](../getting-started/SELF_HOST_GUIDE.md) බලන්න —
> `docker compose -f docker-compose.selfhost.yml up -d` (ප්රකාශිත image එක +
> Redis, loopback පමණි, පැතිකඩ තේරීමක් නැත). පහත ඉක්මන් ධාවනය, දැනටමත් වෙනත් ස්ථානයක
> Redis ධාවනය කරන පරිශීලකයන් සඳහා වන තනි-container ක්රමයයි.

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

# සත්කාරක පැතිකඩ (මූලිකව Linux සඳහා; සත්කාරක CLI binary කියවීමට පමණක් mount කරයි)
docker compose --profile host up -d

# වෙබ් පැතිකඩ (වෙබ්-සැසි සැපයුම්කරුවන් සඳහා Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecar ඒකාබද්ධ කරන්න
docker compose --profile cli --profile cliproxyapi up -d
```

## ලබාගත හැකි පැතිකඩ

ප්රධාන යෙදවුම් ආකාර සඳහා OmniRoute සමඟ Compose පැතිකඩ සපයනු ලැබේ. ඔබේ පරිසරයට ගැළපෙන එක තෝරන්න.

| පැතිකඩ           | සේවාව            | භාවිත කළ යුතු අවස්ථාව                                                                                                                        | විධානය                                       |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (පෙරනිමි) | `omniroute-base` | Headless server / අවම runtime එක, සැපයුම්කරුගේ CLI අන්තර්ගත කර නැත                                                                           | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` සහ අන්තර්ගත CLI (Codex, Claude Code, Droid, OpenClaw) අමතන agentic කාර්ය ප්රවාහ                           | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude`, ආදිය කියවීමට පමණක් mount කිරීමෙන් සත්කාරක CLI වෙත `network_mode`-වැනි ප්රවේශයක් අවශ්ය Linux සත්කාරක | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Upstream CLI proxy කිරීම සඳහා `8317` port එක මත [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar එක ධාවනය කරන්න           | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | Browser එකක් අවශ්ය වෙබ්-සැසි සැපයුම්කරුවන්: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` build කරයි, Chromium ඇතුළත්ය)       | `docker compose --profile web up -d`         |

> පැතිකඩ කිහිපයක් ඒකාබද්ධ කළ හැක: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker තුළ ක්රියාත්මක වන විට සත්කාරක CLI මෙවලම් වින්යාස කිරීම

`omniroute setup-codex`, `setup-claude`, `config set <tool>` සහ උපකරණ පුවරුවේ
**වින්යාසය සුරකින්න** බොත්තම යන සියල්ල `~/.codex/*.config.toml` වැනි ගොනු ලියයි. එම මාර්ග
අර්ථවත් වන්නේ CLI එක සැබවින්ම ක්රියාත්මක වන යන්ත්රය මත පමණි. ඒවා කන්ටේනරය තුළ
ක්රියාත්මක කළහොත්, ලිවීම කන්ටේනරයේම home නාමාවලියට (`/home/node` —
image එක `USER node` ලෙස ක්රියාත්මක වේ) සිදු වන අතර, කිසිදු සත්කාරක CLI එකක් එය කිසිදා කියවන්නේ නැති අතර
කන්ටේනරය නැවත නිර්මාණය කළ මොහොතේම එය ඉවතලනු ලැබේ.

OmniRoute මෙය හඳුනාගෙන, ඔබට භාවිත කළ නොහැකි සාර්ථකත්වයක් වාර්තා කිරීම වෙනුවට
උපදෙස් සමඟ ලිවීම ප්රතික්ෂේප කරයි: CLI එක `2` සමඟ පිටවන අතර API එක
`containerEphemeralTarget: true` සමඟ `422` පිළිතුරු දෙයි.

### නිර්දේශිත ක්රමය: CLI එක සත්කාරකය මතත්, OmniRoute Docker තුළත් ක්රියාත්මක කරන්න

කන්ටේනරය API එක සපයයි; CLI එක ඔබේ සත්කාරක මෙවලම් වින්යාස කරයි.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI එක කන්ටේනරය වෙත යොමු කරන්න
omniroute setup-codex                      # ඔබේ සත්කාරකයේ සැබෑ ~/.codex වෙත ලියයි
```

Codex, Claude Code, Cursor හෝ සමාන මෙවලම් ඔබේ ලැප්ටොප් පරිගණකය මත ක්රියාත්මක වන විට —
සාමාන්යයෙන් භාවිත වන සැකසුම මෙය බැවින් — මෙය නිවැරදි තේරීමයි.

### විකල්පය: සත්කාරක වින්යාස නාමාවලි bind-mount කරන්න (`host` පැතිකඩ)

කන්ටේනරය මඟින්ම ඔබේ සත්කාරක වින්යාසය ලිවීමට අවශ්ය නම්, එම
නාමාවලි mount කර `CLI_CONFIG_HOME` mount root එක වෙත යොමු කරන්න. `host` පැතිකඩ
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
`/proc/self/mountinfo` කියවා mount කළ මාර්ගවලට (සහ ඉහත දැක්වෙන `/host-home` ආකෘතියට
හරියටම ගැළපෙන පරිදි, ඒවායේ child නාමාවලි mount කර ඇති නාමාවලිවලටද) ලිවීමට ඉඩ දෙන අතර,
mount නොකළ ඒවා තවදුරටත් ප්රතික්ෂේප කරයි.

### හදිසි විකල්පය: කන්ටේනරයේම CLI වින්යාස කරන්න (අවම වශයෙන් භාවිත කරන්න)

CLI සැබවින්ම කන්ටේනරය තුළ පවතින විට (`cli` පැතිකඩ), ලිවීම
චේතාන්විතය. ඕනෑම `setup-*` විධානයකට `--allow-container-write` ලබා දෙන්න, නැතහොත්
සේවාදායකය සඳහා `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` සකසන්න. එම ලිවීම
කන්ටේනරයෙන් පසුව නොපවතින බවට අනතුරු ඇඟවීමක් සමඟ ඉදිරියට යයි.

> **ආරක්ෂක අනතුරු ඇඟවීම — `cli` පැතිකඩ + `docker.sock` mount කිරීම.**
> කන්ටේනරය තුළ ඇති ස්වයංක්රීය යාවත්කාලීනකරුට සත්කාරක daemon එකෙන් stack එක
> නැවත නිර්මාණය කළ හැකි වන පරිදි `cli` පැතිකඩ `/var/run/docker.sock` bind-mount කරයි
> (`src/lib/system/autoUpdate.ts` එම socket එක තිබේදැයි පරීක්ෂා කර, එය නොමැති විට
> Docker මාර්ගය මඟ හරියි). එම socket එක **සත්කාරක root විශ්වාස
> සීමාවකි**: එයට ප්රවේශ විය හැකි ඕනෑම දෙයකට සත්කාරක Docker daemon එක
> root ලෙස පාලනය කළ හැක — එයට සත්කාරකයේ ඕනෑම කන්ටේනරයක් නිර්මාණය කිරීමට, පරීක්ෂා කිරීමට,
> නැවැත්වීමට සහ ඉවත් කිරීමට හැකිය.
> ප්රතිවිපාක:
>
> 1. **`cli` පැතිකඩෙහි port එක කිසිවිටෙක ජාලයට නිරාවරණය නොකරන්න.**
>    එය `127.0.0.1` මත publish කරන්න (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN හරහා ප්රවේශ විය හැකි `cli` පැතිකඩක්, උපකරණ පුවරු මට්ටමේ ඕනෑම RCE එකක්
>    සම්පූර්ණ සත්කාරක පාලනය අහිමි වීමක් බවට පත් කරයි.
> 2. **`cli` පැතිකඩ තුළට අමතර සත්කාරක නාමාවලි කිසිවක් bind නොකරන්න.**
>    Docker socket එක සමඟ තවත් ඕනෑම mount එකක් එක් කිරීමෙන් කන්ටේනරයට ඔබේ ගොනු පද්ධතියට සහ
>    සත්කාරක වින්යාසයට සම්පූර්ණ කියවීමේ/ලිවීමේ ප්රවේශය ලැබේ. මෙවලමකට project එකක්
>    දැකීමට අවශ්ය නම්, එය CLI binary එක සමඟ දේශීයව ක්රියාත්මක කරන්න — එය
>    `cli` කන්ටේනරය තුළට mount නොකරන්න.
>
> කන්ටේනරය තුළ ස්වයංක්රීය යාවත්කාලීන කිරීම අවශ්ය නොවේ නම්, `cli` පැතිකඩ අක්රියව තබන්න
> (`COMPOSE_PROFILES=core,redis` හෝ ඊට කෙටි එකක්). අනෙකුත් පැතිකඩ
> Docker socket එක mount නොකරයි.
>
> MITM සම්බන්ධ තර්ජන ආකෘතිය සඳහා `docs/security/MITM-TPROXY-DECRYPT.md` (git තුළ ඇත; `/docs` තුළට compile කර නැත) බලන්න,
> එමෙන්ම `codex`/`claude-code`/`droid`/`openclaw` binary මූලාශ්ර දාමය සඳහා
> `docs/security/SUPPLY_CHAIN.md` බලන්න.

## Redis සයිඩ්කාර්

OmniRoute බෙදාහැරුණු අනුපාත සීමාකාරකය සහ හවුල් හැඹිලිය සඳහා Redis මත රඳා පවතී. `redis` සේවාව `docker-compose.yml` තුළ **සැමවිටම අර්ථ දක්වා ඇත** (එයට පැතිකඩ සීමාවක් නොමැත) සහ වෙනත් ඕනෑම පැතිකඩක් සමඟ ආරම්භ වේ.

| විස්තරය                   | අගය                                      |
| ------------------------- | ---------------------------------------- |
| ඉමේජය                     | `redis:7-alpine`                         |
| කන්ටේනරයේ නම              | `omniroute-redis`                        |
| අභ්යන්තර පෝට් එක          | `6379`                                   |
| ධාරක පෝට් එක (අභිබවා යාම) | `REDIS_PORT` (පෙරනිමිය `6379`)           |
| ධාරක බැඳීම (අභිබවා යාම)   | `REDIS_BIND_HOST` (පෙරනිමිය `127.0.0.1`) |
| වොලියුමය                  | `omniroute-redis-data` → `/data`         |
| සෞඛ්ය පරීක්ෂාව            | `redis-cli ping` (තත්පර 10ක පරතරය)       |

අදාළ පරිසර විචල්ය:

- `REDIS_URL` — යෙදුමට ඇතුළු කරන සම්බන්ධතා තන්තුව (පෙරනිමියෙන් `redis://redis:6379`).
- `REDIS_PORT` — Redis කන්ටේනරය සඳහා ධාරක-පාර්ශ්වීය පෝට් සිතියම්කරණය.
- `REDIS_BIND_HOST` — පෝට් එක ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත. පෙරනිමිය `127.0.0.1` වේ.

> **පෙරනිමියෙන් ලූප්බැක් භාවිත කරන්නේ ඇයි:** සයිඩ්කාර් එක `requirepass` නොමැතිව ක්රියාත්මක වන අතර, යෙදුම්
> කන්ටේනර් compose ජාලය (`redis:6379`) හරහා එයට ළඟා වේ — ප්රකාශිත පෝට් එක
> ඇත්තේ ධාරක-පාර්ශ්වීය මෙවලම් (`redis-cli`, දේශීය `npm run dev`) සඳහා පමණි. එය
> `0.0.0.0` මත ප්රකාශයට පත් කිරීමෙන් ඔබගේ LAN හි සෑම ධාරකයකටම සත්යාපනය නොකළ Redis සේවාවක් නිරාවරණය වේ. ඔබ
> `REDIS_BIND_HOST=0.0.0.0` සකසන්නේ නම්, සේවාවේ `command:` වෙත `--requirepass` ද එක් කරන්න.

**Redis අක්රිය කිරීම** නිර්දේශ නොකරයි (අනුපාත සීමාකාරකය මතකය-තුළ පසුබැසීමකට පිරිහෙනු ඇත). එය අත්යවශ්ය නම්, `docker-compose.yml` තුළ ඇති `redis:` සේවා කොටස ඉවත් කරන්න/අදහස් සටහනක් බවට පත් කරන්න, නැතහොත් එය ශුන්යය දක්වා පරිමාණය කරන්න:

```bash
docker compose up -d --scale redis=0
```

## නිෂ්පාදන Compose

සංවර්ධන පරිසරය සමඟ ක්රියාත්මක වන හුදකලා නිෂ්පාදන ස්නැප්ෂොට් එකක් සඳහා, `docker-compose.prod.yml` භාවිත කරන්න.

| විස්තරය                     | අගය                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------- |
| ගොනුව                       | `docker-compose.prod.yml`                                                             |
| පෙරනිමි උපකරණ පුවරු පෝට් එක | `PROD_DASHBOARD_PORT=20130` (අභ්යන්තර `${DASHBOARD_PORT:-20128}` වෙත සිතියම්ගත කර ඇත) |
| පෙරනිමි API පෝට් එක         | `PROD_API_PORT=20131`                                                                 |
| ඉමේජය                       | `omniroute:prod` (`runner-cli` ඉලක්කයෙන් ගොඩනඟා ඇත)                                   |
| Redis කන්ටේනරය              | `omniroute-redis-prod` (`redis:8.6.2`, වෙන් කළ `redis-prod-data` වොලියුම)             |
| දත්ත වොලියුමය               | `omniroute-prod-data` (නම් කළ, නැවත ගොඩනැඟීම් අතර සුරැකෙන)                            |
| සෞඛ්ය පරීක්ෂා               | `node healthcheck.mjs` + `redis-cli ping`, Redis සෞඛ්යය මත සීමා කළ `depends_on` සමඟ   |

භාවිත කරන ආකාරය:

```bash
# නිෂ්පාදන ස්ටැක් එක ගොඩනඟා ආරම්භ කරන්න
docker compose -f docker-compose.prod.yml up -d --build

# ලොග් අඛණ්ඩව පෙන්වන්න
docker compose -f docker-compose.prod.yml logs -f

# නවතා ඉවත් කරන්න (වොලියුම් තබා ගන්න)
docker compose -f docker-compose.prod.yml down
```

නිෂ්පාදන ස්ටැක් එක සංවර්ධන compose එකට සමාන්තරව ක්රියාත්මක වේ (වෙනස් කන්ටේනර් නම්, පෝට් සහ වොලියුම්), එබැවින් නිෂ්පාදන පරිසරය ක්රියාත්මකව පවතින අතරතුර ඔබට දේශීයව අඛණ්ඩව සංවර්ධනය කළ හැක.

## Dockerfile අදියර

Repository එක බහු-අදියර Dockerfile එකක් (`Dockerfile`) සමඟ නිකුත් වේ. අදියර හතරක් නිරාවරණය කර ඇත; ඔබේ භාවිත අවස්ථාව සඳහා නිවැරදි `target` එක තෝරන්න.

| අදියර         | මූලික image එක        | අරමුණ                                                                                                                                                                                                                                                                               |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | dependencies ස්ථාපනය කරයි (`npm ci --legacy-peer-deps`) සහ `npm run build` ධාවනය කරයි (පෙරනිමියෙන් Turbopack — පහත ගොඩනැගීම්-කාල සම්පත් බලන්න)                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone ප්රතිදානය සහිත නිෂ්පාදන runtime එක. **කිසිදු provider CLI එකක් ඇතුළත් කර නැත.**                                                                                                                                                                                  |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` සහ global CLI එක් කරයි: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **agentic කාර්ය ප්රවාහ සඳහා මෙය තෝරන්න.**                                                                                                           |
| `runner-web`  | `runner-base`         | web-session providers සඳහා Playwright + Chromium browser එකක් (`--with-deps`) එක් කරයි: `gemini-web`, `claude-web`, `claude-turnstile`. **එම providers භාවිත කරන විට මෙය තෝරන්න** — මෙය නොමැති සරල image එක request අවස්ථාවේ අසාර්ථක වේ (නිකුතු නාලිකා යටතේ ඇති `-web` සටහන බලන්න). |

නිශ්චිත target එකක් අතින් ගොඩනඟන්න:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ගොඩනැගීම්-කාල සම්පත්

build args තුනක් `builder` අදියරේ සම්පත් පිරිවැය පාලනය කරයි. ඒවා ගොඩනැගීම්-කාලයට පමණක් අදාළ වේ —
`OMNIROUTE_MEMORY_MB` (පහත) වෙනම runtime සැකසුමකි.

| Build arg                   | පෙරනිමිය | බලපෑම                                                                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` webpack සමඟ ගොඩනඟයි: උපරිම memory භාවිතය අඩු නමුත් මන්දගාමීය. `1` Turbopack සක්රීය කරයි.                |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | ආරම්භ කරන ලද `next build` සඳහා V8 heap උපරිම සීමාව (`--max-old-space-size`).                                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL` වෙත අගය සපයයි; page-data රැස් කිරීම සඳහා Next විසින් `workers = N - 1` ව්යුත්පන්න කරයි. |

විශාල builder එකකදී වැඩි කළ යුතු සැකසුමත්, සීමිත සම්පත් සහිත build එකක් `✓ Compiled successfully` යන්නෙන් **පසුව** බිඳ වැටෙන විට සැක කළ යුතු සැකසුමත් `OMNIROUTE_BUILD_WORKERS` වේ. සෑම
page-data worker එකක්ම වෙනම process එකක් වන අතර, මව් `next build` එකද එසේමය;
සජීවී VPS ප්රතිනිෂ්පාදනයකදී (issue #7518), `NODE_OPTIONS` heap flag එකෙන් ස්වාධීනව
සෑම process එකකම උපරිම RSS අගය ~4.5 GB ලෙස මනින ලදී (Turbopack, V8 heap එකෙන්
පිටත native/Rust memory තුළ compile කරයි). පෙරනිමි `2` අගය (→ worker 1ක්, සමස්ත
process 2ක්) publish pipeline එක භාවිත කරන 16 GB / 4 vCPU GitHub-hosted runners
සඳහා ප්රමාණගත කර ඇත. `8` දී (→ workers 7ක්), එම runner එකේ memory අවසන් වූ අතර
buildkit විසින් `ResourceExhausted: ... cannot allocate memory` සමඟ එම පියවර
අසාර්ථක කරන ලදී; process එකකට අදාළ RSS අගය අනුමාන කිරීම වෙනුවට සෘජුව මැනීමෙන්
පසු `3` (→ workers 2ක්) පවා ගැළපුණේ නැත. `tests/unit/docker-build-memory-budget.test.ts`
මනින ලද අගය මත ගණනය සිදු කරන අතර, සැකසුම් දෙකෙන් එකක් හෝ runner එකේ ධාරිතාව
ඉක්මවා ගියහොත් අසාර්ථක වේ.

Turbopack, V8 heap එකෙන් **පිටත** පවතින native Rust memory තුළ compile කරන බැවින්
`OMNIROUTE_BUILD_MEMORY_MB` මඟින් එය සීමා නොකෙරේ. memory සීමාවක් ඇති host එකකදී
build එක කිසිදු error පෙළක් නොමැතිව OOM killer මඟින් SIGKILL කරනු ලැබේ — එය
`Creating an optimized production build` අතරමැද නවතින අතර, එබැවින් memory
අවසන් වීමක් වෙනුවට hang වීමක් ලෙස පෙනේ. `npm run dev` / `npm run build` සඳහා
Turbopack පෙරනිමි code සැකසුම වුවද, `Dockerfile` හි පෙරනිමිය webpack
(`OMNIROUTE_USE_TURBOPACK=0`) වන්නේ එබැවිනි: build args කිසිවක් නොමැති සරල
`docker build .` එකක් (Railway සහ අනෙකුත් එක්-click hosts ධාවනය කරන ආකාරය)
memory සීමා කළ builder එකක නිහඬව බිඳ වැටිය යුතු නැත. ප්රකාශිත images දැනටමත්
`docker-publish.yml` තුළ `OMNIROUTE_USE_TURBOPACK=0` පැහැදිලිව ලබා දෙයි. ප්රමාණවත්
RAM සහිත builder එකක වේගවත් build එකක් සඳහා Turbopack සක්රීය කරන්න:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` සක්රීය කර ඇති බැවින්, `next build` මව් process එකක් **සහ**
worker process එකක් ධාවනය කරන අතර, ඒ සෑම එකක්ම `OMNIROUTE_BUILD_MEMORY_MB`
වෙන වෙනම පිළිපදියි. container සීමාව එම අගය මෙන් එක් ගුණයකට නොව, ආසන්න වශයෙන්
දෙගුණයකට වඩා ඉහළින් ප්රමාණගත කරන්න.

මෙම tree එක මත මනින ලදී (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container සීමාව | ප්රතිඵලය                        |
| --------- | --------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | දෙකේදීම නිහඬව OOM-kill කරන ලදී  |
| webpack   | 8 GiB           | build worker එක SIGKILL කරන ලදී |
| webpack   | 12 GiB          | සාර්ථක විය, උපරිමය 11.1 GiB විය |

### Runtime පෙරනිමි

`runner-base` මඟින් export කරන පෙරනිමි: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker තුළ memory හැසිරීම:

- රූපය `OMNIROUTE_MEMORY_MB=1024` සකසන අතර, එයින් `NODE_OPTIONS=--max-old-space-size=1024` ව්යුත්පන්න කරයි.
- සැබෑ සේවාදායක ක්රියාවලිය ස්වාධීන දියත්කය මඟින් ආරම්භ කරනු ලබන අතර, එය `OMNIROUTE_MEMORY_MB` කියවා `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` අගට එක් කරයි.
- Node අවසානයට නැවත යෙදූ `--max-old-space-size` අගය භාවිත කරන බැවින්, `OMNIROUTE_MEMORY_MB` සැකසීමෙන් ක්රියාත්මක වන Docker heap සීමාව පාලනය වේ.
- රූපය සෑම විටම එය සකසන බැවින්, දියත්කයේම RAM අනුව ක්රමාංකනය කළ විකල්ප අගය Docker යටතේ කිසි විටෙක යෙදෙන්නේ නැත. කාර්යභාරයට ගැළපෙන ලෙස එය පැහැදිලිව වැඩි කරන්න (පහත වගුව බලන්න). කේතකරණ නියෝජිත `/v1/responses` සඳහා `2048` තවමත් ඉතා කුඩාය.

### කේතකරණ නියෝජිතයන් සඳහා ධාවනකාල RAM

1 GiB Docker පෙරනිමිය නිෂ්පාදන භාවිතය සඳහා ප්රමාණයක් නොව, උපකරණ පුවරුව/සැහැල්ලු කතාබස් සඳහා අවම සීමාවකි. දිගු `POST /v1/responses` body (පණිවිඩ සිය ගණනක් සහ මෙවලම් දස ගණනක්) සම්පීඩනය අතරතුර මතකය තුළ ඇති graph කිහිපයක් රඳවා ගනී. එකිනෙක අතිච්ඡාදනය වන ~3 MiB / ~750k-token ඉල්ලීම් දෙකක් **12 GiB** old-space එකකදී V8 අත්හිටුවා ඇත (`FATAL ERROR: Reached heap limit`), එමෙන්ම 16 GiB cgroup OOM සීමාවකටද ළඟා වී ඇත. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) බලන්න.

**cgroup `--memory` heap එකට වඩා ඉහළින්** ප්රමාණගත කරන්න — native buffer, SQLite සහ සම්පීඩන අතරමැදි දත්ත V8 වෙතින් පිටත පවතී.

| කාර්යභාරය                                  | `OMNIROUTE_MEMORY_MB`        | Container / cgroup         | සටහන්                                                                                                            |
| ------------------------------------------ | ---------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| උපකරණ පුවරුව, එක් සැහැල්ලු කතාබසක්         | `1024` (රූපයේ පෙරනිමිය)      | ≥2 GiB                     |                                                                                                                  |
| එක් කේතකරණ නියෝජිතයෙක් (Claude/Codex/Grok) | `8192`                       | ≥10 GiB                    | සාමාන්ය තනි-සැසි `/v1/responses`                                                                                 |
| සමගාමී දිගු `/v1/responses` දෙකක්          | `10240`–`12288`              | ≥12–16 GiB                 | ~12 GiB heap එකකදී V8 අත්හිටුවීම මනින ලදී                                                                        |
| සමගාමී දිගු context තුනක් හෝ වැඩි ගණනක්    | එක් ක්රියාවලියක සිදු නොකරන්න | අනුක්රමික කරන්න / වැඩි RAM | පෙරනිමි බර වැඩි admission සීමාව ක්රියාත්මක වෙමින් පවතින 1කි; RAM වැඩි නොකර එය ඉහළ දැමීමෙන් අත්හිටුවීම යළි ඇති වේ |

`OMNIROUTE_MEMORY_MB` **සකසා නොමැති** විට bare metal මත `omniroute serve`, RAM ප්රමාණයෙන් ~35%කට ක්රමාංකනය කරයි (`[512, 4096]` සීමාවට යටත්ව). Docker සෑම විටම `1024` සකසන බැවින්, නිල රූපය තුළ එම ක්රමාංකනය කිසි විටෙක ක්රියාත්මක නොවේ.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## තීරණාත්මක පරිසර විචල්ය

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) හි ලේඛනගත කර ඇති පෙරනිමි අගයන්ට අමතරව, Docker යටතේ ධාවනය කිරීමේදී පහත විචල්ය වඩාත් වැදගත් වේ:

| විචල්යය                       | අරමුණ                                                                                                                                                                                                                                                                              | පෙරනිමිය                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket පාලම සඳහා හවුල් රහස් අගය. **නිෂ්පාදන පරිසරයේදී අවශ්ය වේ** — ශක්තිමත් අහඹු තන්තුවක් ලෙස සකසන්න.                                                                                                                                                                           | සකසා නැත (සැපයිය යුතුය) |
| `REDIS_URL`                   | ඉල්ලීම් අනුපාත සීමාකාරකය / හැඹිලි පසුබිම සඳහා සම්බන්ධතා තන්තුව                                                                                                                                                                                                                     | `redis://redis:6379`    |
| `REDIS_PORT`                  | ඇතුළත් කර ඇති Redis කන්ටේනරය සඳහා ධාරක පාර්ශ්වයේ පෝට් එක                                                                                                                                                                                                                           | `6379`                  |
| `REDIS_BIND_HOST`             | ඇතුළත් කර ඇති Redis පෝට් එක ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත (ඔබ AUTH එක් නොකරන්නේ නම් loopback)                                                                                                                                                                                  | `127.0.0.1`             |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ස්වයං-යාවත්කාලීන කාර්ය ප්රවාහ සඳහා `cli` පැතිකඩ තුළ `/workspace/omniroute` වෙත සවිකරන ධාරක මාර්ගය                                                                                                                                                                                  | `.` (වත්මන් නාමාවලිය)   |
| `OMNIROUTE_MEMORY_MB`         | Docker ස්වාධීන සේවාදායකය සඳහා ධාවනකාල Node heap උපරිම සීමාව; ඉහත image පෙරනිමිය අතික්රමණය කරයි. කේතකරණ නියෝජිතයන්: `8192`+ ([ධාවනකාල RAM](#runtime-ram-for-coding-agents) බලන්න).                                                                                                  | `1024`                  |
| `DASHBOARD_PORT` / `API_PORT` | dashboard (20128) සහ API (20129) සඳහා නිරාවරණය කළ පෝට් අතික්රමණය කරයි                                                                                                                                                                                                              | `20128` / `20129`       |
| `APP_BIND_HOST`               | docker-compose මඟින් dashboard/API/live-WS පෝට් ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත. `REQUIRE_API_KEY=false` (පෙරනිමිය) සමඟ, `0.0.0.0` නිර්නාමික `/v1` proxy එක LAN වෙත නිරාවරණය කරයි — `REQUIRE_API_KEY=true` සමඟ හෝ ඉදිරිපස reverse proxy එකක් ඇති විට පමණක් ප්රවේශය පුළුල් කරන්න. | `127.0.0.1`             |
| `CLIPROXY_BIND_HOST`          | docker-compose මඟින් `cliproxyapi` sidecar එක ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත — එහි දත්ත volume එකෙහි සැපයුම්කරු අක්තපත්ර අඩංගු වේ.                                                                                                                                              | `127.0.0.1`             |
| `OMNIROUTE_PLUGINS_DIR`       | ධාවනකාල plugin scanner එක කියවන සහ ස්ථාපනය කරන නාමාවලිය. plugins bind-mount කර ඇති විට මෙය සකසන්න: පෙරනිමිය `HOME` අනුගමනය කරයි, නමුත් image එකක් එය export නොකරනු ඇත.                                                                                                             | `~/.omniroute/plugins`  |
| `OMNIROUTE_BASE_PATH`         | යෙදුම reverse proxy එකක් පිටුපස ප්රකාශයට පත් කරන විට භාවිත කරන URL උපමාර්ගය (උදා. `/omniroute`)                                                                                                                                                                                    | _(හිස් = මූලය)_         |
| `NEXT_PUBLIC_BASE_URL`        | උපමාර්ගය ඇතුළත් පොදු browser origin එක (උදා. `https://host/omniroute`)                                                                                                                                                                                                             | සකසා නැත                |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` සඳහා ධාරක පාර්ශ්වයේ dashboard පෝට් එක                                                                                                                                                                                                                    | `20130`                 |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar එක සඳහා ධාරක පාර්ශ්වයේ පෝට් එක                                                                                                                                                                                                                               | `8317`                  |

## උපමාර්ගයක Reverse Proxy (Traefik / nginx)

Next.js `basePath` එක standalone bundle එක තුළට compile කර ඇත. OmniRoute විසින් කලින් ඇතුළත් කළ
අගය යෙදුම් මූලයේ ඇති sentinel ගොනුවක සටහන් කරයි (`npm run build` අතරතුර ලියනු ලැබේ;
`scripts/docker/ensure-docker-base-path.mjs` මඟින් කියවනු ලැබේ) සහ container එක ආරම්භ වන විට එය
`OMNIROUTE_BASE_PATH` සමඟ සසඳයි. ඒවා වෙනස් වන විට සහ image එක domain root එක සඳහා
සාදා ඇති විට, entrypoint එක standalone manifests, කාවැද්දූ
`basePath`/`assetPrefix` literals (Next 16 විසින් SSR asset URL ලබා දෙන්නේ
`assetPrefix` වෙතින් පමණි — patcher එක උපමාර්ගය එයට ද පිටපත් කරයි), කලින් ඇතුළත් කළ
`/_next/static` asset URL (client-reference manifests, media imports, කලින් render කළ
error pages) සහ client `process.env` shim එක `node dev/run-standalone.mjs`
ධාවනය වීමට පෙර නැවත ලියයි.

### Compose build (නිර්දේශිතයි)

විචල්ය දෙකම `.env` තුළ සකසා, පසුව image එක සහ runtime එක එකඟ වන පරිදි නැවත build කරන්න:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` විසින් `OMNIROUTE_BASE_PATH` Docker build-arg එකක් ලෙසත්
runtime environment variable එකක් ලෙසත් ඉදිරියට යවයි.

### පෙර සාදන ලද root image එක + runtime උපමාර්ගය

ප්රකාශිත `diegosouzapw/omniroute:*` images domain root එක සඳහා සාදා ඇත. ඔබට තවමත්
runtime හිදී `OMNIROUTE_BASE_PATH` සැකසිය හැක; container එක startup අවස්ථාවේ bundle එක
එක් වරක් patch කරයි. එය ගැළපෙන public origin එක සමඟ භාවිත කරන්න:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**සම්පූර්ණ** බාහිර මාර්ගය ඉදිරියට යැවීමට reverse proxy එක වින්යාස කරන්න (prefix එක ඉවත්
නොකරන්න). Next.js වෙත `/omniroute/...` ලැබෙන පරිදි සහ එය
`/omniroute/_next/...` වෙතින් assets සැපයීමට හැකි වන පරිදි, Traefik විසින්
`StripPrefix` නොමැතිව `PathPrefix(`/omniroute`)` container එක වෙත route කළ යුතුය.

Docker healthcheck එක, සක්රිය `OMNIROUTE_BASE_PATH` prefix එක යෙදූ සැහැල්ලු
`/healthz` lifecycle endpoint එක පරීක්ෂා කරයි. මිනිසුන්/dashboard සඳහා වන diagnostics
වෙනුවෙන් `/api/monitoring/health` තවමත් ලබා ගත හැක; container HEALTHCHECK එක නැවත ඒ වෙත
යොමු කිරීමට (උදාහරණයක් ලෙස, ගැඹුරු health enforcement සඳහා),
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` සකසන්න. එම මාර්ගය **ගැඹුරු**
පරීක්ෂාවකි (DB + monitoring summary) — ඔබ නැවත එය තෝරා ගන්නේ නම්, Docker හි
කලාතුරකින් සිදුවන `HEALTHCHECK` සඳහා සුදුසු නමුත් Kubernetes `livenessProbe`
කාලාන්තර සඳහා **සුදුසු නොවේ**.

orchestrators (Kubernetes, Nomad, ආදිය) සඳහා:

| Probe           | වඩාත් සුදුසු                                                         | වළක්වන්න                                                  |
| --------------- | -------------------------------------------------------------------- | --------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, හෝ ප්රධාන port එකේ TCP (`PORT`, පෙරනිමිය `20128`) | `/api/monitoring/health` liveness ලෙස                     |
| Readiness       | HTTP `GET /healthz`                                                  | event-loop එක කාර්යබහුල වීම මියගිය ලෙස සලකන දැඩි timeouts |
| Deep / blackbox | `/api/monitoring/health`                                             | —                                                         |

`/healthz` විසින් process lifecycle එක (`ok` / `starting` / `stopping`) වාර්තා කරයි.
`/livez` යනු process එක සජීවීද යන්න පමණක් පරීක්ෂා කිරීමකි (handler එක ධාවනය කළ හැකි සෑම
විටම 200; එය readiness සඳහා රැඳී නොසිටී). මේ දෙකම request handling කරන Node event loop
එකේම ධාවනය වන බැවින්, CPU-බර catalog හෝ compression කාර්යයන් මඟින් ඒවා ප්රමාද කළ හැක —
කාර්යබහුල ≠ මියගොස් ඇත. HTTP probes කල් ඉකුත් වේ නම් TCP liveness වඩාත් සුදුසුය.
සම්පූර්ණ probe මාර්ගෝපදේශය:
[Monitoring මාර්ගෝපදේශය — Kubernetes probe නිර්දේශ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy සමඟ Docker Compose (HTTPS ස්වයංක්රීය-TLS)

Caddy හි ස්වයංක්රීය SSL සැපයීම භාවිතයෙන් OmniRoute ආරක්ෂිතව බාහිරයට නිරාවරණය කළ හැක. ඔබේ ඩොමේනයේ DNS A වාර්තාව ඔබේ සේවාදායකයේ IP ලිපිනය වෙත යොමු වන බවට වග බලා ගන්න.

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
      # OAuth callback, dashboard සබැඳි සහ ජනනය කරන පොදු URL සඳහා බ්රවුසරයට මුහුණ දෙන මූලය.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # නියමිත කාර්යයන් / ස්වයං-fetch සඳහා අභ්යන්තර සේවාදායකයෙන්-සේවාදායකයට URL එක.
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

Caddy විසින් upstream කන්ටේනරය සඳහා සම්මත forwarding header සකසයි. OAuth callback සහ ජනනය කරන පොදු
සබැඳි සඳහා OmniRoute විසින් `NEXT_PUBLIC_BASE_URL` නියමිත පොදු මූලය ලෙස භාවිත කරයි;
සත්යාපිත dashboard ලිවීම් එකම මූලයේ ඉල්ලීම් සමඟ session එකට බැඳුණු CSRF
ආරක්ෂාව භාවිත කරයි. පැහැදිලි වින්යාසයක් වෙනුවට විශ්වාසදායක forwarded header වෙතින්
පොදු මූලය ව්යුත්පන්න කිරීමට OmniRoute හිතාමතා යොදාගන්නා උසස් deployment සඳහා පමණක්
`OMNIROUTE_TRUST_PROXY` සබල කරන්න.

## Cloudflare Quick Tunnel

Docker deployment සඳහා වන dashboard සහායට `Dashboard → Endpoints` හි එක්-ක්ලික් **Cloudflare Quick Tunnel** එකක් ඇතුළත් වේ. පළමු වරට සබල කරන විට, අවශ්ය වූ විට පමණක් `cloudflared` බාගත කර, ඔබේ වත්මන් `/v1` endpoint එක වෙත තාවකාලික tunnel එකක් ආරම්භ කර, ජනනය කළ `https://*.trycloudflare.com/v1` URL එක ඔබේ සාමාන්ය පොදු URL එකට කෙළින්ම පහළින් පෙන්වයි.

සක්රිය tunnel තත්ත්වය වෙනස් නොකර `Settings → Appearance` වෙතින් endpoint tunnel panel (Cloudflare, Tailscale, ngrok) පෙන්වීමට හෝ සැඟවීමට හැක.

### Tunnel සටහන්

- Quick Tunnel URL තාවකාලික වන අතර සෑම නැවත ආරම්භ කිරීමකටම පසුව වෙනස් වේ.
- OmniRoute හෝ කන්ටේනරය නැවත ආරම්භ කිරීමෙන් පසුව Quick Tunnel ස්වයංක්රීයව ප්රතිස්ථාපනය නොවේ. අවශ්ය විට dashboard වෙතින් ඒවා නැවත සබල කරන්න.
- කළමනාකරණය කළ ස්ථාපනය දැනට `x64` / `arm64` මත Linux, macOS සහ Windows සඳහා සහාය දක්වයි.
- සීමා සහිත කන්ටේනර් පරිසරවල ඝෝෂාකාරී QUIC UDP buffer අනතුරු ඇඟවීම් වළක්වා ගැනීමට, කළමනාකරණය කළ Quick Tunnel පෙරනිමියෙන් HTTP/2 ප්රවාහනය භාවිත කරයි. ඔබට වෙනත් ප්රවාහනයක් අවශ්ය නම් `CLOUDFLARED_PROTOCOL=quic` හෝ `auto` සකසන්න.
- Docker image තුළ පද්ධති CA root අන්තර්ගත වන අතර ඒවා කළමනාකරණය කළ `cloudflared` වෙත ලබා දෙයි; මෙය කන්ටේනරය තුළ tunnel එක ආරම්භ වන විට TLS විශ්වාස අසාර්ථකවීම් වළක්වයි.
- OmniRoute විසින් එකක් බාගත කිරීම වෙනුවට පවතින binary එකක් භාවිත කිරීමට ඔබට අවශ්ය නම් `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` සකසන්න.

## Image Tag

| Image                    | Tag      | ප්රමාණය | විස්තරය                                           |
| ------------------------ | -------- | ------- | ------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | ඉහළම **ප්රකාශිත** ස්ථාවර SemVer (`main` git නොවේ) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | GitOps සඳහා මෙම tag පන්තිය නිශ්චිතව සවිකරන්න      |

බහු-වේදිකා manifest එක: `linux/amd64` + `linux/arm64` ස්වදේශීය (Apple Silicon, AWS Graviton, Raspberry Pi). Docker විසින් ගැළපෙන architecture එක ස්වයංක්රීයව තෝරා ගනී; ARM host මත AMD64 emulation බලහත්කාරයෙන් භාවිත කිරීමට අවශ්ය නම් `--platform linux/amd64` ලබා දෙන්න.

### නිකුතු නාලිකා

OmniRoute විසින් ස්ථාවර නිකුතු, සක්රිය නිකුතු-branch පරීක්ෂණ සහ සංවර්ධන build සඳහා වෙන වෙනම Docker නාලිකා ප්රකාශයට පත් කරයි.

| නාලිකාව                         | මූලාශ්රය                              | වෙනස් කළ හැකි බව                | නිර්දේශිත භාවිතය                                                                                                             |
| ------------------------------- | ------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | අත්සන් කළ/අනුවාදගත නිකුතුව            | වෙනස් කළ නොහැකි                 | නිශ්චිත නිකුතුවකට සවිකරන production deployment                                                                               |
| `:latest` / `:latest-web`       | ඉහළම **ප්රකාශිත** ස්ථාවර SemVer       | වෙනස් කළ හැකි ස්ථාවර දර්ශකය     | SemVer ප්රකාශන කාර්යයකින් **පසුව** ස්ථාවර නිකුතු අනුගමනය කරයි — `main` හෝ නිකුත් නොකළ `release/v*` commit අනුගමනය **නොකරයි** |
| `:next` / `:next-web`           | වත්මන් පෙරනිමි `release/v*` branch එක | වෙනස් කළ හැකි පෙර-නිකුතු දර්ශකය | සක්රිය නිකුතු branch එකට එක් කර ඇති නමුත් තවමත් ස්ථාවර නිකුතුවකට ඇතුළත් නොවූ නිවැරදි කිරීම් පරීක්ෂා කිරීම                    |
| `:main` / `:main-web`           | `main` branch එක                      | වෙනස් කළ හැකි සංවර්ධන දර්ශකය    | සංවර්ධන සහ ඒකාබද්ධතා පරීක්ෂණ සඳහා පමණි                                                                                       |

#### Web-session provider: `-web` image

ඉහත සෑම නාලිකාවක්ම `runner-web` stage එකෙන් build කළ `-web` tag එකක් (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ලෙස ද ලබා ගත හැක — එය Playwright සහ Chromium බ්රවුසරයක් එක් කළ එම image එකම වේ. සාමාන්ය image එක Chromium **නොමැතිව** සපයනු ලැබේ; `gemini-web`, `claude-web` සහ `claude-turnstile` සඳහා එය අවශ්ය වේ.

අසාර්ථක වීම ආරම්භයේදී නොව, කල් දමනු ලැබේ: එම provider ඔවුන්ගේ model ලැයිස්තුගත කර dashboard තුළ සම්බන්ධ වී ඇති ලෙස පෙන්වන අතර, පළමු ඉල්ලීම පමණක් පහත දෝෂය සමඟ අසාර්ථක වේ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

ඔබ එම provider භාවිත කරන්නේ නම්, ඔබ දැනටමත් භාවිත කරන නාලිකාවේ `-web` tag එක pull කරන්න — වෙනත් කිසිවක් වෙනස් නොවේ. npm/CLI ස්ථාපනයකදී (Docker image එකක් නොමැතිව), ඊට සමානව අඩු වී ඇති කොටස වන්නේ browser binary එකයි: host එක මත `npx playwright install chromium` ධාවනය කරන්න.

#### පෙර-නිකුතු නාලිකාව භාවිත කිරීම

`next` නාලිකාව වත්මන් පෙරනිමි `release/v*` ශාඛාවට සිදු කරන සෑම push කිරීමකදීම නැවත ගොඩනඟන අතර AMD64 සහ ARM64 යන දෙක සඳහාම ප්රකාශයට පත් කෙරේ. පැරණි නඩත්තු ශාඛාවලට එය උඩින් ලිවිය නොහැක. ඊළඟ ස්ථාවර tag එක නිර්මාණය කිරීමට පෙර සක්රිය නිකුතු ශාඛාවට ඒකාබද්ධ කර ඇති නිවැරදි කිරීම් සඳහා pull කළ හැකි image එකක් මෙම නාලිකාව සපයයි.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose සඳහා, තෝරාගත් profile එක භාවිත කරන image tag එක අභිබවා සකසා, පසුව service එක pull කර නැවත සාදන්න:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ආරක්ෂාව සහ ආපසු පෙරළීම

`next` යනු ස්ථාවර නොවන පූර්ව-නිකුතු නාලිකාවකි. සක්රිය නිකුතු ශාඛාවට සිදු කරන ඕනෑම push කිරීමකදී එය වෙනස් විය හැකි අතර, එය **නිෂ්පාදන භාවිතය සඳහා සහාය නොදක්වයි**. නිශ්චිත build එකක් ඇගයීමේදී image digest එක pin කරන්න:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

පරීක්ෂා කිරීමට පෙර, OmniRoute data volume එක හෝ bind-mounted data directory එක උපස්ථ කරන්න. ආපසු පෙරළීමට, පෙර භාවිත කළ ස්ථාවර version එක හෝ digest එක ප්රතිස්ථාපනය කර container එක නැවත සාදන්න:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

නිකුතු-ශාඛා build එකකට කිසිවිටෙක `latest` ගෙන යා නොහැක; ස්ථාවර pointer එක ඉදිරියට ගෙන යා හැක්කේ සුදුසුකම් ලබන ස්ථාවර semantic version එකකට පමණි. `next` images, නිකුතු image පරීක්ෂාව සහ CRITICAL අවදානම් අවහිර කිරීමේ දොරටුව රඳවා ගනී.

**`latest` යනු git සඳහා යාවත්කාලීන බව පිළිබඳ සහතිකයක් නොවේ.** `main` හෝ සක්රිය `release/v*` ශාඛාවට ඒකාබද්ධ කළ නිවැරදි කිරීම්, ස්ථාවර SemVer image එකක් ප්රකාශයට පත් කර publish job එක විසින් `:latest` ඉදිරියට ගෙන යන තුරු **`:latest` තුළ නොමැත** (එම SemVer එකට සමාන digest එක). GitHub දැනටමත් නිවැරදි කිරීම පෙන්වුවත් `latest` වෙනස් නොවී ඇති බව පෙනේ නම්, නිකුතු ශාඛාව පරීක්ෂා කිරීමට `:next` pull කරන්න, නැතහොත් SemVer tag එක එන තෙක් රැඳී සිටින්න.

| ඔබට අවශ්ය දේ                                                                 | භාවිත කරන්න                             |
| ---------------------------------------------------------------------------- | --------------------------------------- |
| වෙනස් නොවිය යුතු GitOps / නිෂ්පාදන පරිසරය                                    | `:X.Y.Z` pin කරන්න (හෝ image digest එක) |
| ප්රකාශිත ස්ථාවර නිකුතු අනුගමනය කරමින් සෑම නිකුතුවකදීම නැවත සෑදීමක් පිළිගැනීම | `:latest`                               |
| නිකුත් නොකළ `release/v*` commits පරීක්ෂා කිරීම                               | `:next` (නිෂ්පාදනය සඳහා නොවේ)           |
| `main` පරීක්ෂා කිරීම                                                         | `:main` (නිෂ්පාදනය සඳහා නොවේ)           |

## ලබාගත හැකි බව: පෙරනිමි SQLite එකම ප්රතිරුවක් පමණි

සාමාන්ය Docker / Kubernetes OmniRoute සැකසුම යනු **එක් Node ක්රියාවලියක් + එක් SQLite ලේඛකයක්** වේ. එම ටොපොලොජිය මත ඉහළ ලබාගත හැකි බව **සහාය නොදක්වයි**.

| සීමාව                                                     | ප්රතිවිපාකය                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| එක් ලේඛකයෙක්                                              | එකම SQLite ගොනුවට එරෙහිව ප්රතිරූ කිහිපයක් **ක්රියාත්මක නොකරන්න**. එය DB එක දූෂිත කරයි.                                                                                                                                                                                                                                                           |
| නැවත නිර්මාණය / නැවත ආරම්භය / HEALTHCHECK මඟින් නතර කිරීම | ක්රියාත්මක වෙමින් පවතින SSE, dashboard සැසි සහ මතකය තුළ ඇති තත්ත්වය **සම්පූර්ණයෙන්ම ඇනහිටියි**. සම්බන්ධිත සෑම client එකක්ම විසන්ධි වේ. endpoint කිසිවක් නොමැති කාල කවුළුව තුළ නව ඉල්ලීම්වලට OmniRoute JSON වෙනුවට reverse-proxy **`502 Bad Gateway: Unknown error`** ලැබේ — clients හට මෙය provider අසමත් වීමකින් වෙන්කර හඳුනාගත නොහැක (#11015). |
| `/healthz` සමඟ එකම event loop එක                          | කාර්යබහුල catalog හෝ compression tick එකක් නිසා probes ප්රමාද විය හැක; එවිට කෙටි timeout එකක් **එකම** ප්රතිරුව නැවත ආරම්භ කරයි.                                                                                                                                                                                                                  |

**Probe අනුකෘතිය** ([Kubernetes probe නිර්දේශ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ද බලන්න):

| Probe         | ඉලක්කය                                                    | භාවිත නොකරන්න                                                   |
| ------------- | --------------------------------------------------------- | --------------------------------------------------------------- |
| Liveness      | `PORT` මත TCP (පෙරනිමිය `20128`), හෝ මෘදු HTTP `/healthz` | `/api/monitoring/health`                                        |
| Readiness     | HTTP `GET /healthz`                                       | event loop එක කාර්යබහුල වීම අක්රිය වීමක් ලෙස සලකන දැඩි timeouts |
| ගැඹුරු / මානව | `/api/monitoring/health`                                  | ස්වයංක්රීය kubelet liveness                                     |

**උත්ශ්රේණි කිරීම්:** සෑම සැසියක්ම විසන්ධි වනු ඇතැයි අපේක්ෂා කරන්න. හැකි නම් clients ක්රමයෙන් ඉවත් කරන්න; පෙරනිමි SQLite සමඟ rolling update එකක් නොමැත. Compose `restart: unless-stopped` සහ Docker `HEALTHCHECK` එකට එක්ව container එක Unhealthy වූ විට එකම ක්රියාවලියද ප්රතිස්ථාපනය කරනු ඇත — බලපෑමේ පරාසයද එයම වේ.

**එක් ප්රතිරුවක්** සඳහා Kubernetes කොටසක් (Recreate අවශ්ය වේ; එක් SQLite ගොනුවකට එරෙහිව `replicas` වැඩි නොකරන්න):

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

`preStop` sleep එක SIGTERM ලැබීමට පෙර kube හට Service endpoints ඉවත් කිරීමට ඉඩ දෙයි; එමඟින් **නව** traffic එක අවසන් වෙමින් පවතින ක්රියාවලියට ළඟා වීම නවතී. ක්රියාත්මක වෙමින් පවතින `/v1/responses` SSE, heavyweight admission leases හරහා `SHUTDOWN_TIMEOUT_MS` (පෙරනිමිය 30s) දක්වා ඉවත් වීමට ඉඩ දෙනු ලැබේ (#11015). තවමත් ක්රියාවලිය වෙත ළඟා වන නව ඉල්ලීම්වලට `503` + `Retry-After: 5` ලැබේ. ප්රතිස්ථාපනය Ready වන තෙක් පවතින Recreate empty-endpoint පරතරය සම්පූර්ණ ඇනහිටීමක් ලෙසම පවතී — එය SQLite ටොපොලොජියේ ස්වභාවය මිස probe වැරදි වින්යාසයක් නොවේ.

බාහිර Postgres / multi-writer HA යනු ලේඛනගත කළ සාමාන්ය මාර්ගයක් **නොවේ**. ඔබට HA අවශ්ය නම්, එක් ප්රතිරුවක් පවත්වා ගන්න, නැතහොත් ව්යාපෘතිය විසින් වෙනම පරීක්ෂා කර ලේඛනගත කර ඇති ටොපොලොජියක් ක්රියාත්මක කරන්න. Postgres/MySQL කාර්යය [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) හි ඇත. එය නිකුත් වන තෙක්, **විශාල** `/v1/responses` ධාරිතාව වැඩි කිරීමට සහාය දක්වන එකම ක්රමය වන්නේ ස්වාධීන ක්රියාවලි N ක් (ඊළඟ කොටස) භාවිත කිරීමයි; එක් volume එකක් මත `replicas > 1` භාවිත කිරීම නොවේ.

## පරිමාණය පුළුල් කිරීම: ස්වාධීන ක්රියාවලි Nක්

එක් Node ක්රියාවලියක් යනු **එක් V8 heap එකකි**. එකිනෙක අතිච්ඡාදනය වන ~3 MiB / ~750k-token coding-agent `POST /v1/responses` ඉල්ලීම් දෙකක් (RTK + Caveman), ~12 Gi දී එම heap එක නවතා දමන අතර (`FATAL ERROR: Reached heap limit`) 16 Gi cgroup එකක් OOM තත්ත්වයට පත් කළ හැක. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) බලන්න. එම මිනුම **මතක අයවැය** පිළිබඳ අනතුරු ඇඟවීමක් මිස, සමගාමී දිගු `/v1/responses` ඉල්ලීම් දෙකක නිෂ්පාදන මට්ටමේ දැඩි උපරිම සීමාවක් නොවේ. බර වැඩි chat පිළිගැනීම, එම V8/cgroup සීමාවෙන්ම ප්රමාණය ස්වයංක්රීයව නිර්ණය කරන ingest byte අයවැයක් (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) මඟින් පාලනය වේ — දැනටමත් ප්රමාණගත කර ඇති ක්රියාවලියක එය ඉහළ අගයකින් override කිරීම (හෝ පැරණි `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ඉල්ලීම්-ගණන සීමාව සැකසීම) නැවතත් එම abort තත්ත්වය ඇති කරයි. කුඩා chats, `/healthz`, `/v1/models`, සහ MCP මෙම සීමාවට **ඇතුළත් නොවේ**.

### එක් ක්රියාවලියක්: දිගු `/v1/responses` දෙකකට වඩා

**සෞඛ්ය සම්පන්න** ක්රියාවලියකට (heap එක `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ට අඩු, පෙරනිමිය `0.75`) ක්රියාවලිය පුරා ඇති inflight-byte අයවැය (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) තුළ තවමත් ඉඩ තිබේ නම්, සමගාමී දිගු `POST /v1/responses` ඉල්ලීම් දෙකකට වඩා ධාවනය **කළ හැක**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ට සමාන හෝ ඊට වැඩි body (පෙරනිමිය 256 KiB) ව්යුහමය වශයෙන් බර ඉල්ලීම් භාවිත කරන heavyweight lease එකම ලබාගෙන, එම [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` මඟහැරීම (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) භාවිත කරයි. සමගාමී දිගු SSE clients දස ගණනක් (ක්රියාකරුවන්ට බොහෝ විට 40–50 අවශ්ය වේ) යනු **මතක අයවැය** පිළිබඳ ප්රශ්නයකි — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ප්රමාණගත කරන්න — එය නිෂ්පාදනයේ දැඩි “උපරිමය 2යි” සීමාවක් නොවේ. පීඩනයට ලක් වූ heap එකක් තවමත් නැවත උත්සාහ කළ හැකි `503` ප්රතිචාර සමඟ load එක ඉවත් කරන බැවින් #7849 නැවත ඇති නොවේ.

**heap ගණන වැඩි කිරීමට** (ස්වාධීන V8 old-spaces) **අදම**:

| කරන්න                                                                                                                                                | නොකරන්න                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **N containers/pods** ධාවනය කරන්න; එක් එක් එකට එයටම වෙන් වූ `DATA_DIR` / volume එකක් ලබා දෙන්න                                                       | එක් SQLite ගොනුවකට එරෙහිව `replicas > 1` සකසන්න                        |
| heap / inflight-byte අයවැයෙන් heavy in-flight + healthy-headroom ප්රමාණගත කරන්න; 1–2 යනු ආරක්ෂාකාරී #7849 පෙරනිමිය මිස නිෂ්පාදනයේ දැඩි උපරිමයක් නොවේ | එක් ක්රියාවලියකට 8× RAM සහ සීමා රහිත ගණන් සීමාවක් ලබා දෙන්න            |
| **හවුල් quota counters** සඳහා විකල්ප ලෙස: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` භාවිත කරන්න                                           | Redis හවුල් SQLite එකක් ලෙස සලකන්න — එය එසේ නොවේ                       |
| provider රහස් එක් එක් instance එකට පිටපත් කරන්න (නැතහොත් වෙන්වූ dashboards පිළිගන්න)                                                                 | instances හරහා එක් dashboard එකක් / එක් call-log එකක් බලාපොරොත්තු වන්න |
| ඕනෑම load balancer එකක් ඉදිරියෙන් යොදන්න; API key හෝ session අනුව sticky කිරීම ප්රමාණවත්ය                                                            | vendor එකකට විශේෂිත size-aware middleware එකක් අනිවාර්ය කරන්න          |

දෘඩාංග: instance එකකට අදාළ සමගාමී දිගු `/v1/responses` ගණන යනු **මතක අයවැය** පිළිබඳ ප්රශ්නයකි (heap + inflight-byte / #10110). ස්වාධීන `DATA_DIR` Nක් තවමත් heap ගණන වැඩි කරයි: host RAM එක “N=8 සහිත එක් 16 Gi pod එකක්” නොව `N × cgroup` ආවරණය කළ යුතුය. එක් SQLite ගොනුවක් මත කිසිවිටෙක `replicas > 1` භාවිත නොකරන්න.

Compose සැලැස්මක් (heap දෙකක්, volume දෙකක් — `deploy.replicas: 2` නොවේ):

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

ක්රියාවලිය තුළ ඝනත්වය (HTTP isolate එකෙන් compression ඉවත් කිරීම) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) හි ඇත. හවුල් durable state එකක් මත එක් තාර්කික cluster එකක් [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) හි ඇත.

## Docker තුළ Gemini කලාපීය දෝෂ

Google AI Studio / Gemini API මඟින් FAILED_PRECONDITION සමඟ HTTP 400 සහ
`User location is not supported for the API use.` යන පණිවිඩය ආපසු ලබා දිය හැක. සත්කාරකය මත ඉල්ලීමක් සාර්ථක වීමෙන්
කන්ටේනරයද එකම පිටතට යන මාර්ගය භාවිත කරන බව තහවුරු නොවේ. DNS අනුපිළිවෙළ,
IPv4/IPv6 සම්බන්ධතාව, VPN මාර්ගගත කිරීම සහ වින්යාස කළ ප්රොක්සි වෙනස් විය හැක. මෙම දෝෂය පමණක් නරක API යතුරක් හඳුනා නොගන්නා බැවින්,
[Google විසින් සහාය දක්වන කලාප](https://ai.google.dev/gemini-api/docs/available-regions)
මෙන්ම සැබෑ සම්බන්ධතා මාර්ගයද පරීක්ෂා කරන්න.

### සම්බන්ධතාවට විශේෂිත ප්රොක්සියක් වඩාත් යෝග්ය වේ

බලපෑමට ලක්වූ Gemini සම්බන්ධතාව සඳහා OmniRoute හි [සම්බන්ධතාවකට විශේෂිත ප්රොක්සි වින්යාසය](../ops/PROXY_GUIDE.md#4-level-proxy-system)
භාවිත කර, ඉන්පසු එම ආකෘතියම සමඟ **සම්බන්ධතාව පරීක්ෂා කරන්න** සහ කුඩා ඉල්ලීමක්
නැවත සිදු කරන්න. මෙය මාර්ගගත කිරීමේ වෙනස එම සම්බන්ධතාවට පමණක් සීමා කරයි. ප්රොක්සිය
කන්ටේනරයෙන් ප්රවේශ විය හැකි බවත්, සම්බන්ධතාව සැබවින්ම එය තෝරන බවත් තහවුරු කරන්න.
මාර්ගය වෙනස් කිරීමෙන් ඉහළ ධාරාවේ කලාපීය සුදුසුකම සහතික නොවේ.

### සත්කාරකයේ සහ කන්ටේනරයේ ජාලකරණය සසඳන්න

සත්යාපනය කළ ප්රතිඵල සසඳන විට යතුර, ආකෘතිය සහ ඉල්ලීම එකම ලෙස තබා ගන්න; කිසිවිටෙකත්
අක්තපත්ර, ප්රොක්සි මුරපද හෝ සම්පූර්ණ අවසර ශීර්ෂක ගැටලුවකට ඇතුළත් නොකරන්න.
පළමුව, සත්කාරකයේ සහ කන්ටේනරය තුළ එකම විධානය භාවිත කරමින් OS විභේදකය සපයන ලිපින
පවුල් මොනවාදැයි පරීක්ෂා කරන්න:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` වෙනුවට ඔබ ධාවනය කරන සේවාව යොදන්න (උදාහරණයක් ලෙස, `omniroute-web`). මෙම
විධාන අක්තපත්ර හෝ IP ලිපින නොමැතිව ලිපින පවුල් මුද්රණය කරයි. ආපසු ලැබෙන `6`
මඟින් පෙන්වන්නේ IPv6 DNS ප්රතිඵලයක් පමණි: එය භාවිත කළ හැකි IPv6 මාර්ගයක් හෝ API ප්රවේශයක්
තහවුරු **නොකරයි**. `curl` ස්ථාපනය කර ඇති විට, පරිසර දෙකෙහිම
`curl -4 -I https://generativelanguage.googleapis.com` සහ
`curl -6 -I https://generativelanguage.googleapis.com` සසඳන්න.
එය සත්යාපනය නොකළ දෝෂයක් වුවද, HTTP ප්රතිචාරයක් එම පරීක්ෂණය සඳහා සම්බන්ධතාව තහවුරු කරයි;
Gemini සුදුසුකම පරීක්ෂා කරන්නේ සත්යාපනය කළ ආකෘති ඉල්ලීම පමණි.

### සත්කාරක මට්ටමේ විකල්පය: ක්රියාකාරී IPv6 සහ විභේදක ප්රතිපත්තිය

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) වාර්තා කළ තැනැත්තා කන්ටේනර් IPv6 සක්රීය කිරීමෙන් සහ glibc ලිපින
තේරීම වෙනස් කිරීමෙන් ඔවුන්ගේ පරිසරයේ ප්රවේශය ප්රතිස්ථාපනය කළේය. මෙය පරිසරයට විශේෂිත
විකල්පයක් ලෙස සලකන්න. විභේදක මනාප සකස් කිරීමට පෙර ක්රියාකාරී සත්කාරක IPv6,
කන්ටේනර් පිටතට යාම/මාර්ගගත කිරීම සහ ෆයර්වෝල් නීති තහවුරු කරන්න.
පෞද්ගලික ULA ලිපිනයක් තිබීමෙන් පමණක් පොදු IPv6 සම්බන්ධතාව ස්ථාපිත නොවේ.

Compose හි පෙරනිමි ජාලයට දැනටමත් සම්බන්ධ කර ඇති සේවා සඳහා, මෙම කොටස එම ජාලයේ
IPv6 සක්රීය කරයි; ඔබගේ සේවාවේ අනෙකුත් කොටස්, පෝට්, වෙළුම් සහ වින්යාසය එලෙසම තබා ගන්න:

```yaml
networks:
  default:
    enable_ipv6: true
```

නම් කළ ජාලයක් සඳහා, සේවාව සැබවින්ම සම්බන්ධ වන ජාලය මත එය සක්රීය කරන්න. Docker හට
ULA උපජාලයක් වෙන් කළ හැක; පැහැදිලි, එකිනෙක නොගැටෙන උපජාලයක් තෝරන්නෙ ඔබගේ ජාලයට
එය අවශ්ය වන විට පමණි. [Docker IPv6 ජාලකරණය](https://docs.docker.com/engine/daemon/ipv6/)
සහ [Compose ජාල විකල්ප](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) බලන්න.

**glibc-පාදක රූපයක**, `/etc/gai.conf` මඟින් ලිපින තේරීම වෙනස් කළ හැක. වත්මන්
ගබඩාවේ Dockerfile එක Debian භාවිත කරයි; අභිරුචි musl-පාදක රූප මෙම යාන්ත්රණය හවුලේ භාවිත නොකරයි.
වාර්තා කළ සැකසීම ULA ලේබලය `label fc00::/7 6` සිට
`label fc00::/7 1` දක්වා වෙනස් කරයි. රූපයේ සම්පූර්ණ ප්රතිපත්ති වගුවෙන් ආරම්භ කර එහි අනෙකුත්
ඇතුළත් කිරීම් ආරක්ෂා කරන්න: `label` හෝ `precedence` ඇතුළත් කිරීමක් එක් කිරීමෙන් එම පෙරනිමි වගුව
ප්රතිස්ථාපනය වන බැවින්, වෙනස් කළ පේළිය පමණක් අඩංගු ගොනුවක් ප්රමාණවත් නොවේ.
[glibc වින්යාස යොමුව](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
එම අර්ථ විස්තර කරයි. සමාලෝචනය කළ ගොනුව `/etc/gai.conf` හි කියවීමට පමණක් හැකි ලෙස bind-mount කර,
එය යෙදීම සඳහා සේවාව නැවත සාදන්න.

මෙය **එම කන්ටේනරයේ පිටතට යන සියලු ගමනාගමනය** සඳහා OS ලිපින තේරීම වෙනස් කරයි.
එය සෑම යෙදුමකටම IPv6 තෝරා ගැනීමට බල නොකරයි: Node හි DNS අනුපිළිවෙළ සහ සම්බන්ධතා
තේරීමද බලපායි. විශේෂයෙන්ම, `--dns-result-order=ipv4first` IPv4 සඳහා ප්රමුඛතාව ලබා දෙන අතර,
IPv4-පමණක් ඇති අසාර්ථකත්වයකට පිළියමක් නොවේ. [Node DNS අනුපිළිවෙළ](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) බලන්න.

සත්කාරක මට්ටමේ වෙනසකින් පසු Gemini සහ ඔබගේ අනෙකුත් සැපයුම්කරුවන් නැවත පරීක්ෂා කරන්න.
පෙර තත්ත්වයට හැරවීමට, අභිරුචි `gai.conf` mount කිරීම ඉවත් කර, පෙර ජාල වින්යාසය ප්රතිස්ථාපනය කර,
නඩත්තු කාල කවුළුවක් තුළ බලපෑමට ලක්වූ සේවාව/ජාලය නැවත සාදන්න. ජාලයක් නැවත සෑදීමෙන් එයට
සම්බන්ධ අනෙකුත් කන්ටේනර්වලට බාධා ඇති විය හැක; ස්ථිර දත්ත වෙළුම මකා නොදමන්න.

## වැදගත් සටහන්

- **SQLite WAL මාදිලිය:** නවතම වෙනස්කම් `storage.sqlite` වෙත checkpoint කිරීමට OmniRoute හට හැකි වන පරිදි `docker stop` සම්පූර්ණ වීමට ඉඩ දිය යුතුය. ඇතුළත් කර ඇති Compose ගොනු දැනටමත් තත්පර 40ක නැවැත්වීමේ සහන කාලයක් සකසා ඇත. ඔබ image එක සෘජුවම ධාවනය කරන්නේ නම්, `--stop-timeout 40` එලෙසම තබා ගන්න.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** සාමාන්ය/ලිවීමට-පෙර backups බාහිරව කළමනාකරණය කරන්නේ නම් මෙය `true` ලෙස සකසන්න. පවතින database migrations සඳහා තවමත් ඒවාටම වෙන් වූ කල්පවත්නා ආරක්ෂිත snapshot එකක් සහ සමූහ-migration ආරක්ෂණයක් අවශ්ය වේ.
- **දත්ත ස්ථායිතාව:** container නැවත ආරම්භ කිරීම් අතරතුර ඔබේ database, keys සහ configurations ස්ථිරව තබා ගැනීමට සැමවිටම `/app/data` වෙත volume එකක් mount කරන්න.
- **Port වින්යාසය:** පෙරනිමි `20128` port එක වෙනස් කිරීමට `PORT` environment variable එක override කරන්න.

## මෙයද බලන්න

- [VM යෙදවීමේ මාර්ගෝපදේශය](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare පිහිටුවීම
- [Fly.io යෙදවීමේ මාර්ගෝපදේශය](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io වෙත යොදවන්න
- [Environment වින්යාසය](../reference/ENVIRONMENT.md) — සම්පූර්ණ `.env` යොමුව
