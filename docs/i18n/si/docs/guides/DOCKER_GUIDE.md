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

# CLI පැතිකඩ (Claude Code, Codex, OpenClaw ඇතුළත් කර ඇත)
docker compose --profile cli up -d

# සත්කාරක පැතිකඩ (ප්රධාන වශයෙන් Linux සඳහා; සත්කාරක CLI ද්විමය ගොනු කියවීමට පමණක් හැකි ලෙස සවිකරයි)
docker compose --profile host up -d

# CLI + CLIProxyAPI sidecar ඒකාබද්ධ කරන්න
docker compose --profile cli --profile cliproxyapi up -d
```

## ලබාගත හැකි පැතිකඩ

OmniRoute සමඟ Compose පැතිකඩ හතරක් සපයනු ලැබේ. ඔබේ පරිසරයට ගැළපෙන එක තෝරන්න.

| පැතිකඩ           | සේවාව            | භාවිත කළ යුතු අවස්ථාව                                                                                                                             | විධානය                                       |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (පෙරනිමි) | `omniroute-base` | Headless සේවාදායකය / අවම ධාවන පරිසරය, සැපයුම්කරු CLI ඇතුළත් කර නැත                                                                                | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` සහ ඇතුළත් කර ඇති CLI (Codex, Claude Code, Droid, OpenClaw) කැඳවන නියෝජිත-මූලික කාර්ය ප්රවාහ                    | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` ආදිය කියවීමට පමණක් හැකි ලෙස සවිකිරීමෙන් සත්කාරක CLI වෙත `network_mode`-සමාන ප්රවේශයක් අවශ්ය Linux සත්කාරක | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | ඉහළ ප්රවාහ CLI ප්රොක්සි කිරීම සඳහා [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar එක `8317` පෝට් එකේ ධාවනය කරන්න             | `docker compose --profile cliproxyapi up -d` |

> පැතිකඩ කිහිපයක් ඒකාබද්ධ කළ හැක: `docker compose --profile cli --profile cliproxyapi up -d`.

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

ගබඩාව බහු-අදියර Dockerfile එකක් (`Dockerfile`) සමඟ නිකුත් වේ. අදියර තුනක් නිරාවරණය කර ඇත; ඔබේ භාවිත අවස්ථාව සඳහා නිවැරදි `target` එක තෝරන්න.

| අදියර         | මූලික image එක        | අරමුණ                                                                                                                                                                           |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | dependencies ස්ථාපනය කරයි (`npm ci --legacy-peer-deps`) සහ `npm run build` ධාවනය කරයි (පෙරනිමියෙන් Turbopack — පහත ගොඩනැගීම්-කාලීන සම්පත් බලන්න)                                |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone ප්රතිදානය සහිත නිෂ්පාදන ධාවන පරිසරය. **කිසිදු provider CLI එකක් ඇතුළත් කර නැත.**                                                                             |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` සහ ගෝලීය CLI එක් කරයි: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **ස්වයංක්රීය නියෝජිත workflow සඳහා මෙය තෝරන්න.** |

නිශ්චිත target එකක් අතින් ගොඩනඟන්න:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### ගොඩනැගීම්-කාලීන සම්පත්

`builder` අදියරේ සම්පත් පිරිවැය build args තුනකින් පාලනය වේ. ඒවා ගොඩනැගීම් කාලයට පමණක් අදාළ වේ —
`OMNIROUTE_MEMORY_MB` (පහත) යනු වෙනම ධාවන-කාලීන පාලකයකි.

| Build arg                   | පෙරනිමිය | බලපෑම                                                                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`      | `0` මඟින් ඒ වෙනුවට webpack භාවිතයෙන් ගොඩනඟයි. උපරිම මතක භාවිතය අඩු නමුත් මන්දගාමීය.                         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | ආරම්භ කරන ලද `next build` සඳහා V8 heap උපරිම සීමාව (`--max-old-space-size`).                                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL` වෙත අගය සපයයි; පිටු-දත්ත රැස් කිරීම සඳහා Next විසින් `workers = N - 1` ව්යුත්පන්න කරයි. |

විශාල builder එකකදී වැඩි කළ යුතු පාලකය `OMNIROUTE_BUILD_WORKERS` වන අතර, සම්පත් සීමා සහිත ගොඩනැගීමක් `✓ Compiled successfully` පසු **අසාර්ථක වන්නේ** නම් සැක කළ යුත්තේද එයයි. එක් එක් පිටු-දත්ත worker එක වෙනම process එකක් වන අතර, මව් `next build` එකද එසේම වේ;
සජීවී VPS ප්රතිනිෂ්පාදනයකදී (issue #7518), `NODE_OPTIONS` heap flag එකෙන් ස්වාධීනව එක් එක් process එකේ උපරිම RSS අගය ~4.5 GB ලෙස මනින ලදී (Turbopack, V8 heap එකෙන් පිටත native/Rust memory තුළ සම්පාදනය කරයි). පෙරනිමි `2` අගය (→ worker 1ක්, සමස්ත process 2ක්) publish pipeline එක භාවිත කරන 16 GB / 4 vCPU GitHub-hosted runners සඳහා ප්රමාණගත කර ඇත. `8` දී (→ workers 7ක්), එම runner එකේ මතකය අවසන් වූ අතර buildkit විසින් `ResourceExhausted: ... cannot allocate memory` සමඟ එම පියවර අසාර්ථක කරන ලදී;
එක් එක් process එකේ RSS අගය අනුමාන කිරීම වෙනුවට සෘජුවම මැනීමෙන් පසුව `3` (→ workers 2ක්) පවා ගැළපුණේ නැත. `tests/unit/docker-build-memory-budget.test.ts` මනින ලද අගය මත ගණනය කිරීම් සිදු කර, පාලක දෙකෙන් එකක් හෝ runner එකේ ධාරිතාව ඉක්මවන්නේ නම් අසාර්ථක වේ.

Turbopack, V8 heap එකෙන් **පිටත** පවතින native Rust memory තුළ සම්පාදනය කරන බැවින් `OMNIROUTE_BUILD_MEMORY_MB` මඟින් එය සීමා නොවේ. මතක සීමාවක් ඇති host එකකදී, කිසිදු දෝෂ පෙළක් නොමැතිව OOM killer මඟින් build එක SIGKILL කරනු ලැබේ — එය `Creating an optimized production build` අතරමඟ නතර වන අතර, එබැවින් මතකය අවසන් වීමකට වඩා සිරවීමක් ලෙස පෙනේ. build host එක සම්පත් සීමා සහිත නම්, bundler එක මාරු කරන්න:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` සක්රීය කර ඇති බැවින්, `next build` මව් process එකක් **සහ** worker process එකක් ධාවනය කරන අතර, ඒ සෑම එකක්ම `OMNIROUTE_BUILD_MEMORY_MB` වෙන වෙනම අනුගමනය කරයි. container සීමාව එම අගය මෙන් එක් ගුණයකට නොව, ආසන්න වශයෙන් දෙගුණයකට වඩා ඉහළින් ප්රමාණගත කරන්න.

මෙම tree එක මත මනින ලදී (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container සීමාව | ප්රතිඵලය                        |
| --------- | --------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | දෙකේදීම නිහඬව OOM-kill විය      |
| webpack   | 8 GiB           | build worker එක SIGKILL විය     |
| webpack   | 12 GiB          | සාර්ථක විය, උපරිමය 11.1 GiB විය |

### ධාවන-කාලීන පෙරනිමි

`runner-base` මඟින් export කරන පෙරනිමි: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker තුළ මතක හැසිරීම:

- image එක `OMNIROUTE_MEMORY_MB=1024` ලෙස සකසා, එයින් `NODE_OPTIONS=--max-old-space-size=1024` ව්යුත්පන්න කරයි.
- සැබෑ server process එක standalone launcher මඟින් ආරම්භ කරන අතර, එය `OMNIROUTE_MEMORY_MB` කියවා `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` එක් කරයි.
- නැවත නැවත ලබා දෙන `--max-old-space-size` අගයන්ගෙන් අවසාන අගය Node භාවිත කරන බැවින්, `OMNIROUTE_MEMORY_MB` සැකසීම මඟින් ක්රියාත්මක Docker heap සීමාව පාලනය වේ.
- image එක සෑම විටම එය සකසන බැවින්, launcher එකේම RAM අනුව සකස් වන fallback එක Docker යටතේ කිසිවිටෙක යෙදෙන්නේ නැත. workload එක සඳහා එය පැහැදිලිව වැඩි කරන්න (පහත වගුව). coding-agent `/v1/responses` සඳහා `2048` තවමත් ප්රමාණවත් නොවේ.

### Coding agents සඳහා ධාවන-කාලීන RAM

1 GiB Docker පෙරනිමිය dashboard/සැහැල්ලු-chat සඳහා අවම සීමාවක් මිස නිෂ්පාදන ප්රමාණයක් නොවේ. දිගු `POST /v1/responses` body (පණිවිඩ සිය ගණනක්, tools දස ගණනක්) compression අතරතුර memory තුළ graphs කිහිපයක් රඳවා ගනී. එකිනෙක මත අතිච්ඡාදනය වන ~3 MiB / ~750k-token ඉල්ලීම් දෙකක් **12 GiB** old-space එකකදී V8 නතර කර ඇත (`FATAL ERROR: Reached heap limit`) සහ 16 GiB cgroup OOM එකකටද ළඟා වී ඇත. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) බලන්න.

**cgroup `--memory` අගය heap එකට වඩා ඉහළින්** ප්රමාණගත කරන්න — native buffers, SQLite සහ compression අතරමැදි දත්ත V8 එකෙන් පිටත පවතී.

| කාර්ය භාරය                              | `OMNIROUTE_MEMORY_MB`            | කන්ටේනරය / cgroup                      | සටහන්                                                                                                      |
| --------------------------------------- | -------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Dashboard, සැහැල්ලු chat එකක්           | `1024` (image පෙරනිමිය)          | ≥2 GiB                                 |                                                                                                            |
| coding agent එකක් (Claude/Codex/Grok)   | `8192`                           | ≥10 GiB                                | සාමාන්ය තනි-session `/v1/responses`                                                                        |
| සමගාමී දිගු `/v1/responses` දෙකක්       | `10240`–`12288`                  | ≥12–16 GiB                             | ~12 GiB heap එකකදී මනින ලද V8 abort වීම                                                                    |
| සමගාමී දිගු context තුනක් හෝ වැඩි ගණනක් | එක් process එකක් මත සිදු නොකරන්න | අනුක්රමිකව ක්රියාත්මක කරන්න / වැඩි RAM | පෙරනිමි heavyweight admission එකෙහි in-flight ගණන 1කි; RAM වැඩි නොකර එය ඉහළ නැංවීමෙන් abort වීම යළි ඇති වේ |

bare metal මත `omniroute serve`, `OMNIROUTE_MEMORY_MB` **සකසා නොමැති** විට RAM ප්රමාණයෙන් ~35%ක් (`[512, 4096]` පරාසයට සීමා කර) ක්රමාංකනය කරයි. Docker සැමවිටම `1024` සකසන බැවින්, නිල image එක තුළ එම ක්රමාංකනය කිසිවිටෙක ක්රියාත්මක නොවේ.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## අත්යවශ්ය පරිසර විචල්ය

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) හි ලේඛනගත කර ඇති පෙරනිමි අගයන්ට අමතරව, Docker යටතේ ධාවනය කිරීමේදී පහත විචල්යයන් වඩාත් වැදගත් වේ:

| විචල්යය                       | අරමුණ                                                                                                                                                                                                                                                                                            | පෙරනිමිය                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket බ්රිජය සඳහා හවුල් රහස. **නිෂ්පාදන පරිසරයේ අනිවාර්යයි** — ප්රබල අහඹු තන්තුවකට සකසන්න.                                                                                                                                                                                                   | සකසා නැත (සැපයිය යුතුය) |
| `REDIS_URL`                   | වේග සීමාකාරකය / හැඹිලි පසුඅන්තය සඳහා සම්බන්ධතා තන්තුව                                                                                                                                                                                                                                            | `redis://redis:6379`    |
| `REDIS_PORT`                  | ඇතුළත් කර ඇති Redis කන්ටේනරය සඳහා ධාරක පාර්ශ්වයේ පෝර්ට් එක                                                                                                                                                                                                                                       | `6379`                  |
| `REDIS_BIND_HOST`             | ඇතුළත් කර ඇති Redis පෝර්ට් එක ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත (ඔබ AUTH එක් නොකරන්නේ නම් loopback)                                                                                                                                                                                              | `127.0.0.1`             |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ස්වයං-යාවත්කාලීන කාර්ය ප්රවාහ සඳහා `cli` පැතිකඩ තුළ `/workspace/omniroute` වෙත සවිකරන ධාරක මාර්ගය                                                                                                                                                                                                | `.` (වත්මන් නාමාවලිය)   |
| `OMNIROUTE_MEMORY_MB`         | Docker ස්වාධීන සේවාදායකය සඳහා ධාවනකාල Node heap උපරිම සීමාව; ඉහත image පෙරනිමිය අභිබවා යයි. කේතකරණ නියෝජිතයන්: `8192`+ ([ධාවනකාල RAM](#runtime-ram-for-coding-agents) බලන්න).                                                                                                                    | `1024`                  |
| `DASHBOARD_PORT` / `API_PORT` | උපකරණ පුවරුව (20128) සහ API (20129) සඳහා නිරාවරණය කළ පෝර්ට් අභිබවා යන්න                                                                                                                                                                                                                          | `20128` / `20129`       |
| `APP_BIND_HOST`               | docker-compose මඟින් උපකරණ පුවරුව/API/live-WS පෝර්ට් ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත. `REQUIRE_API_KEY=false` (පෙරනිමිය) සමඟින්, `0.0.0.0` විසින් නිර්නාමික `/v1` ප්රොක්සිය LAN වෙත නිරාවරණය කරයි — `REQUIRE_API_KEY=true` සමඟ හෝ ඉදිරියෙන් reverse proxy එකක් ඇති විට පමණක් මෙය පුළුල් කරන්න. | `127.0.0.1`             |
| `CLIPROXY_BIND_HOST`          | docker-compose මඟින් `cliproxyapi` sidecar එක ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත — එහි දත්ත volume එකේ සැපයුම්කරුගේ අක්තපත්ර අඩංගු වේ.                                                                                                                                                            | `127.0.0.1`             |
| `OMNIROUTE_PLUGINS_DIR`       | ධාවනකාල plugin scanner එක කියවා ස්ථාපනය කරන නාමාවලිය. plugins bind-mount කර ඇති විට එය සකසන්න: පෙරනිමිය `HOME` අනුගමනය කරන අතර image එකක් එය export කිරීම අනිවාර්ය නොවේ.                                                                                                                         | `~/.omniroute/plugins`  |
| `OMNIROUTE_BASE_PATH`         | යෙදුම reverse proxy එකක් පිටුපස ප්රකාශයට පත් කර ඇති විට භාවිත වන URL උපමාර්ගය (උදා. `/omniroute`)                                                                                                                                                                                                | _(හිස් = මූලය)_         |
| `NEXT_PUBLIC_BASE_URL`        | උපමාර්ගයද ඇතුළත් පොදු බ්රවුසර මූලාරම්භය (උදා. `https://host/omniroute`)                                                                                                                                                                                                                          | සකසා නැත                |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` සඳහා ධාරක පාර්ශ්වයේ උපකරණ පුවරු පෝර්ට් එක                                                                                                                                                                                                                              | `20130`                 |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar එක සඳහා ධාරක පාර්ශ්වයේ පෝර්ට් එක                                                                                                                                                                                                                                           | `8317`                  |

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

## රූප ටැග්

| රූපය                     | ටැගය     | ප්රමාණය | විස්තරය                                       |
| ------------------------ | -------- | ------- | --------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | ඉහළම **ප්රකාශිත** ස්ථාවර SemVer (`main` නොවේ) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | GitOps සඳහා මෙම ටැග් පන්තිය ස්ථිර කරන්න       |

බහු-වේදිකා මැනිෆෙස්ටය: `linux/amd64` + `linux/arm64` ස්වදේශීය (Apple Silicon, AWS Graviton, Raspberry Pi). Docker විසින් ගැළපෙන ගෘහනිර්මාණ ශිල්පය ස්වයංක්රීයව තෝරයි; ARM සත්කාරක මත AMD64 අනුකරණය බල කිරීමට අවශ්ය නම් `--platform linux/amd64` ලබා දෙන්න.

### නිකුතු නාලිකා

OmniRoute ස්ථාවර නිකුතු, සක්රිය නිකුතු-ශාඛා පරීක්ෂණ සහ සංවර්ධන ගොඩනැගීම් සඳහා වෙන වෙනම Docker නාලිකා ප්රකාශයට පත් කරයි.

| නාලිකාව                         | මූලාශ්රය                          | වෙනස් කළ හැකි බව                 | නිර්දේශිත භාවිතය                                                                                                           |
| ------------------------------- | --------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | අත්සන් කළ/අනුවාදිත නිකුතුව        | වෙනස් කළ නොහැකි                  | නිශ්චිත නිකුතුවක් ස්ථිර කරන නිෂ්පාදන යෙදවීම්                                                                               |
| `:latest` / `:latest-web`       | ඉහළම **ප්රකාශිත** ස්ථාවර SemVer   | වෙනස් කළ හැකි ස්ථාවර යොමුව       | SemVer ප්රකාශන කාර්යයකට **පසුව** ස්ථාවර නිකුතු අනුගමනය කරයි — `main` හෝ නිකුත් නොකළ `release/v*` commit අනුගමනය **නොකරයි** |
| `:next` / `:next-web`           | වත්මන් පෙරනිමි `release/v*` ශාඛාව | වෙනස් කළ හැකි පූර්ව-නිකුතු යොමුව | සක්රිය නිකුතු ශාඛාවට එක් කර ඇති නමුත් තවමත් ස්ථාවර නිකුතුවක නොමැති නිවැරදි කිරීම් පරීක්ෂා කිරීම                            |
| `:main` / `:main-web`           | `main` ශාඛාව                      | වෙනස් කළ හැකි සංවර්ධන යොමුව      | සංවර්ධන සහ ඒකාබද්ධතා පරීක්ෂණ සඳහා පමණි                                                                                     |

#### පූර්ව-නිකුතු නාලිකාව භාවිත කිරීම

වත්මන් පෙරනිමි `release/v*` ශාඛාව වෙත කරන සෑම push එකකදීම `next` නාලිකාව නැවත ගොඩනඟන අතර AMD64 සහ ARM64 යන දෙකටම ප්රකාශයට පත් කරයි. පැරණි නඩත්තු ශාඛාවලට එය උඩින් ලිවිය නොහැක. ඊළඟ ස්ථාවර ටැගය සෑදීමට පෙර සක්රිය නිකුතු ශාඛාවට ඒකාබද්ධ කළ නිවැරදි කිරීම් සඳහා මෙම නාලිකාව pull කළ හැකි රූපයක් සපයයි.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose සඳහා, තෝරාගත් පැතිකඩ විසින් භාවිත කරන රූප ටැගය අතික්රමණය කර, ඉන්පසු සේවාව pull කර නැවත සාදන්න:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ආරක්ෂාව සහ ආපසු හැරවීම

`next` යනු පාවෙන පූර්ව-නිකුතු නාලිකාවකි. සක්රිය නිකුතු ශාඛාව වෙත කරන ඕනෑම push එකකදී එය වෙනස් විය හැකි අතර **නිෂ්පාදන භාවිතය සඳහා සහාය නොදක්වයි**. නිශ්චිත ගොඩනැගීමක් ඇගයීමේදී රූප digest එක ස්ථිර කරන්න:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

පරීක්ෂා කිරීමට පෙර, OmniRoute දත්ත volume එක හෝ bind-mounted දත්ත directory එක උපස්ථ කරන්න. පෙර තත්ත්වයට ආපසු යාමට, කලින් භාවිත කළ ස්ථායී version එක හෝ digest එක ප්රතිස්ථාපනය කර container එක නැවත සාදන්න:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build එකකට කිසිවිටෙකත් `latest` ගෙන යා නොහැක; ස්ථායී pointer එක ඉදිරියට ගෙන යා හැක්කේ සුදුසුකම් ලත් ස්ථායී semantic version එකකට පමණි. `next` images, release image පරීක්ෂාව සහ CRITICAL අවදානම් සඳහා වන අවහිර කිරීමේ gate එක රඳවා ගනී.

**`latest` යනු git සඳහා නවතම බව පිළිබඳ සහතිකයක් නොවේ.** `main` හෝ සක්රිය `release/v*` branch එක මත merge කරන ලද fixes, ස්ථායී SemVer image එකක් publish කර publish job එක මඟින් `:latest` ප්රවර්ධනය කරන තුරු **`:latest` තුළ නොමැත** (එම SemVer එකට සමාන digest එක). GitHub හි fix එක දැනටමත් පෙන්වන අතර `latest` යාවත්කාලීන නොවූ බව පෙනේ නම්, release branch එක පරීක්ෂා කිරීමට `:next` pull කරන්න, නැතහොත් SemVer tag එක එන තුරු රැඳී සිටින්න.

| ඔබට අවශ්ය දේ                                                            | භාවිත කරන්න                                  |
| ----------------------------------------------------------------------- | -------------------------------------------- |
| වෙනස් නොවිය යුතු GitOps / production                                    | `:X.Y.Z` වෙත pin කරන්න (හෝ image digest එකට) |
| publish කළ stables අනුගමනය කර එක් එක් release එකේදී නැවත සෑදීම පිළිගන්න | `:latest`                                    |
| release නොකළ `release/v*` commits පරීක්ෂා කරන්න                         | `:next` (production සඳහා නොවේ)               |
| `main` පරීක්ෂා කරන්න                                                    | `:main` (production සඳහා නොවේ)               |

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
