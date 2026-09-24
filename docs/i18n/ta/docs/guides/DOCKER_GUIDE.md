# 🐳 Docker Guide — OmniRoute (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> முழுமையான Docker வரிசைப்படுத்தல் குறிப்பு. விரைவாகத் தொடங்க, [README-இன் Docker பகுதியைப்](../README.md#-docker) பார்க்கவும்.

## உள்ளடக்க அட்டவணை

- [விரைவாக இயக்குதல்](#quick-run)
- [சூழல் கோப்புடன்](#with-environment-file)
- [Docker Compose](#docker-compose)
- [கிடைக்கும் சுயவிவரங்கள்](#available-profiles)
- [OmniRoute Docker-இல் இயங்கும்போது ஹோஸ்ட் CLI கருவிகளை உள்ளமைத்தல்](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [உற்பத்திக்கான Compose](#production-compose)
- [Dockerfile நிலைகள்](#dockerfile-stages)
- [முக்கியமான சூழல் மாறிகள்](#critical-environment-variables)
- [Caddy (HTTPS) உடன் Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare விரைவு Tunnel](#cloudflare-quick-tunnel)
- [Image குறிச்சொற்கள்](#image-tags)
- [கிடைக்கும் தன்மை: இயல்புநிலை SQLite ஒற்றைப் பிரதியை மட்டுமே ஆதரிக்கிறது](#availability-default-sqlite-is-single-replica)
- [முக்கியக் குறிப்புகள்](#important-notes)

---

## விரைவான இயக்கம்

> **ஒரே கட்டளையில் சுயமாக ஹோஸ்ட் செய்ய வேண்டுமா?**
> [சுய-ஹோஸ்ட் வழிகாட்டியைப்](../getting-started/SELF_HOST_GUIDE.md) பார்க்கவும் —
> `docker compose -f docker-compose.selfhost.yml up -d` (வெளியிடப்பட்ட image +
> Redis, loopback-க்கு மட்டும், profile தேர்வு இல்லை). கீழே உள்ள விரைவான இயக்கம்,
> ஏற்கனவே Redis-ஐ வேறிடத்தில் இயக்கும் பயனர்களுக்கான ஒற்றை-container வழிமுறையாகும்.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## சூழல் கோப்புடன்

```bash
# முதலில் .env கோப்பை நகலெடுத்து திருத்தவும்
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
# அடிப்படை சுயவிவரம் (CLI கருவிகள் இல்லை)
docker compose --profile base up -d

# CLI சுயவிவரம் (Claude Code, Codex, OpenClaw உள்ளமைந்தவை)
docker compose --profile cli up -d

# புரவலன் சுயவிவரம் (Linux-க்கு முன்னுரிமை; புரவலன் CLI இருமக் கோப்புகளை வாசிக்க மட்டும் ஏற்றுகிறது)
docker compose --profile host up -d

# வலை சுயவிவரம் (வலை அமர்வு வழங்குநர்களுக்கான Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI துணைக் கொள்கலனை ஒன்றிணைக்கவும்
docker compose --profile cli --profile cliproxyapi up -d
```

## கிடைக்கக்கூடிய சுயவிவரங்கள்

முக்கிய வரிசைப்படுத்தல் அமைப்புகளுக்கான Compose சுயவிவரங்களுடன் OmniRoute வழங்கப்படுகிறது. உங்கள் சூழலுக்குப் பொருந்தும் ஒன்றைத் தேர்ந்தெடுக்கவும்.

| சுயவிவரம்           | சேவை             | எப்போது பயன்படுத்த வேண்டும்                                                                                                                                             | கட்டளை                                       |
| ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (இயல்புநிலை) | `omniroute-base` | திரையற்ற சேவையகம் / குறைந்தபட்ச இயக்கச் சூழல்; வழங்குநர் CLI-கள் சேர்க்கப்படவில்லை                                                                                      | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | `omniroute providers/setup/doctor` மற்றும் தொகுப்பில் சேர்க்கப்பட்ட CLI-களை (Codex, Claude Code, Droid, OpenClaw) அழைக்கும் முகவர் சார்ந்த பணிப்பாய்வுகள்               | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` போன்றவற்றை வாசிக்க மட்டும் அனுமதித்து ஏற்றுவதன் மூலம் ஹோஸ்ட் CLI-களுக்கு `network_mode` போன்ற அணுகலை விரும்பும் Linux ஹோஸ்ட்கள் | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | அப்ஸ்ட்ரீம் CLI ப்ராக்ஸிக்காக `8317` போர்ட்டில் [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) சைட்காரை இயக்கவும்                                          | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | உலாவி தேவைப்படும் வலை அமர்வு வழங்குநர்கள்: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web`-ஐ உருவாக்குகிறது; Chromium சேர்க்கப்பட்டுள்ளது)                 | `docker compose --profile web up -d`         |

> பல சுயவிவரங்களை ஒன்றிணைக்கலாம்: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker-இல் இயங்கும்போது ஹோஸ்ட் CLI கருவிகளை உள்ளமைத்தல்

`omniroute setup-codex`, `setup-claude`, `config set <tool>` மற்றும் டாஷ்போர்டின்
**உள்ளமைவைச் சேமி** பொத்தான் ஆகிய அனைத்தும் `~/.codex/*.config.toml` போன்ற கோப்புகளை எழுதுகின்றன. அந்தப் பாதைகள்
CLI உண்மையில் இயங்கும் கணினியில் மட்டுமே பொருள்படும். அவற்றைக் கண்டெய்னருக்குள்
இயக்கினால், எழுதப்படுவது கண்டெய்னரின் சொந்த home (`/home/node` —
image ஆனது `USER node` ஆக இயங்குகிறது) பகுதிக்குச் செல்லும்; எந்த ஹோஸ்ட் CLI-யும் அதை ஒருபோதும் படிக்காது, மேலும் கண்டெய்னர்
மீண்டும் உருவாக்கப்படும் தருணத்திலேயே அது நீக்கப்படும்.

OmniRoute இதைக் கண்டறிந்து, நீங்கள் பயன்படுத்த முடியாத வெற்றியைத்
தெரிவிப்பதற்குப் பதிலாக வழிமுறைகளுடன் எழுதுவதை மறுக்கிறது: CLI `2` என்ற நிலையுடன் வெளியேறும், மேலும் API
`containerEphemeralTarget: true` உடன் `422` எனப் பதிலளிக்கும்.

### பரிந்துரைக்கப்படுவது: CLI-ஐ ஹோஸ்டில் இயக்கி, OmniRoute-ஐ Docker-இல் இயக்கவும்

கண்டெய்னர் API-ஐ வழங்குகிறது; CLI உங்கள் ஹோஸ்ட் கருவிகளை உள்ளமைக்கிறது.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI-ஐ கண்டெய்னரை நோக்கிச் சுட்டவும்
omniroute setup-codex                      # உங்கள் ஹோஸ்டிலுள்ள உண்மையான ~/.codex-ஐ எழுதுகிறது
```

Codex, Claude Code, Cursor அல்லது இதுபோன்றவை உங்கள்
மடிக்கணினியில் இயங்கும்போது இதுவே சரியான தேர்வாகும் — இதுவே வழக்கமான அமைப்பு.

### மாற்று வழி: ஹோஸ்ட் உள்ளமைவு அடைவுகளை bind-mount செய்யவும் (`host` profile)

கண்டெய்னரே உங்கள் ஹோஸ்ட் உள்ளமைவை எழுத வேண்டும் என விரும்பினால்,
அடைவுகளை mount செய்து, mount root-ஐ நோக்கி `CLI_CONFIG_HOME`-ஐ அமைக்கவும். `host` profile
ஏற்கெனவே இதைச் செய்கிறது:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount தான் பாதையை நம்பகமானதாக ஆக்குகிறது: OmniRoute
`/proc/self/mountinfo`-ஐப் படித்து, mount செய்யப்பட்ட பாதைகளில் (மேலும் அவற்றின்
துணை அடைவுகள் mount செய்யப்பட்டிருக்கும் அடைவுகளிலும் எழுத அனுமதிக்கிறது; மேலே உள்ள `/host-home` அமைப்பு இதற்கு மிகச் சரியான எடுத்துக்காட்டு), அதே நேரத்தில்
mount செய்யப்படாத பாதைகளில் எழுதுவதைத் தொடர்ந்து மறுக்கிறது.

### தப்பிக்கும் வழி: கண்டெய்னரின் சொந்த CLI-களை உள்ளமைக்கவும் (மிகக் குறைவாகப் பயன்படுத்தவும்)

CLI-கள் உண்மையாகவே கண்டெய்னருக்குள் இருக்கும்போது (`cli` profile), எழுதுவது
நோக்கத்துடனானதாகும். எந்த `setup-*` கட்டளைக்கும் `--allow-container-write`-ஐ வழங்கவும் அல்லது
சர்வருக்காக `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`-ஐ அமைக்கவும். கண்டெய்னர் நீடிக்காவிட்டால்
எழுத்தும் நீடிக்காது என்ற எச்சரிக்கையுடன் எழுதுதல் தொடரும்.

> **பாதுகாப்பு எச்சரிக்கை — `cli` profile + `docker.sock` mount.**
> கண்டெய்னருக்குள் உள்ள தானியங்கு புதுப்பிப்பான் ஹோஸ்ட் daemon-இலிருந்து stack-ஐ மீண்டும் உருவாக்குவதற்காக,
> `cli` profile ஆனது `/var/run/docker.sock`-ஐ bind-mount செய்கிறது
> (`src/lib/system/autoUpdate.ts` அந்த socket உள்ளதா எனச் சோதித்து, அது
> இல்லாதபோது Docker பாதையைத் தவிர்க்கிறது). அந்த socket என்பது **ஹோஸ்ட்-root நம்பிக்கை
> எல்லை**: அதை அணுகக்கூடிய எதுவும் ஹோஸ்ட் Docker daemon-ஐ
> root ஆக இயக்க முடியும் — ஹோஸ்டிலுள்ள எந்தக் கண்டெய்னரையும் உருவாக்கவும், ஆய்வு செய்யவும், நிறுத்தவும், அகற்றவும் முடியும்.
> இதன் விளைவுகள்:
>
> 1. **`cli` profile-இன் port-ஐ ஒருபோதும் நெட்வொர்க்கில் வெளிப்படுத்த வேண்டாம்.** அதை
>    `127.0.0.1`-இல் வெளியிடவும் (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN வழியாக அணுகக்கூடிய `cli` profile, டாஷ்போர்டு-நிலை RCE எதையும்
>    ஹோஸ்டின் முழுமையான சமரசமாக மாற்றிவிடும்.
> 2. **கூடுதல் ஹோஸ்ட் அடைவுகள் எதையும் `cli` profile-இல் bind செய்ய வேண்டாம்.**
>    Docker socket உடன் எந்தக் கூடுதல் mount-உம் சேர்ந்தால், கண்டெய்னருக்கு உங்கள்
>    கோப்பு முறைமை மற்றும் ஹோஸ்ட் உள்ளமைவின் மீது முழுமையான படிக்க/எழுத அணுகல் கிடைக்கும். ஒரு கருவி
>    project-ஐப் பார்க்க வேண்டுமெனில், அதை CLI binary உடன் உள்ளூரிலேயே இயக்கவும் — அதை
>    `cli` கண்டெய்னருக்குள் mount செய்ய வேண்டாம்.
>
> கண்டெய்னருக்குள் தானியங்கு புதுப்பிப்பு தேவையில்லை என்றால், `cli` profile-ஐ முடக்கியே வைத்திருக்கவும்
> (`COMPOSE_PROFILES=core,redis` அல்லது இன்னும் சுருக்கமாக). மற்ற profile-கள்
> Docker socket-ஐ mount செய்வதில்லை.
>
> MITM தொடர்பான அச்சுறுத்தல் மாதிரிக்கு `docs/security/MITM-TPROXY-DECRYPT.md`-ஐ (git-இல் உள்ளது; `/docs`-இல் தொகுக்கப்படவில்லை) பார்க்கவும்,
> மேலும் `codex`/`claude-code`/`droid`/`openclaw` binary மூலாதாரச் சங்கிலிக்கு
> `docs/security/SUPPLY_CHAIN.md`-ஐ பார்க்கவும்.

## Redis சைட்கார்

பகிர்ந்தளிக்கப்பட்ட விகிதக் கட்டுப்படுத்தி மற்றும் பகிரப்பட்ட தற்காலிக சேமிப்பகத்திற்கான பின்தளமாக OmniRoute, Redis-ஐச் சார்ந்துள்ளது. `redis` சேவை `docker-compose.yml`-இல் **எப்போதும் வரையறுக்கப்பட்டிருக்கும்** (அதற்கு profile gate இல்லை), மேலும் வேறு எந்த profile உடனும் சேர்ந்து தொடங்கும்.

| விவரம்                    | மதிப்பு                                    |
| ------------------------- | ------------------------------------------ |
| இமேஜ்                     | `redis:7-alpine`                           |
| கண்டெய்னர் பெயர்          | `omniroute-redis`                          |
| உள் port                  | `6379`                                     |
| host port (மாற்றியமைப்பு) | `REDIS_PORT` (இயல்புநிலை `6379`)           |
| host bind (மாற்றியமைப்பு) | `REDIS_BIND_HOST` (இயல்புநிலை `127.0.0.1`) |
| volume                    | `omniroute-redis-data` → `/data`           |
| ஆரோக்கியச் சோதனை          | `redis-cli ping` (10 வினாடி இடைவெளி)       |

தொடர்புடைய சூழல் மாறிகள்:

- `REDIS_URL` — செயலியில் செலுத்தப்படும் இணைப்புச் சரம் (இயல்புநிலையாக `redis://redis:6379`).
- `REDIS_PORT` — Redis கண்டெய்னருக்கான host-பக்க port mapping.
- `REDIS_BIND_HOST` — port வெளியிடப்படும் host interface. இயல்புநிலை `127.0.0.1`.

> **இயல்புநிலையாக loopback ஏன்:** சைட்கார் `requirepass` இல்லாமல் இயங்குகிறது, மேலும் செயலி
> கண்டெய்னர்கள் compose network வழியாக அதை (`redis:6379`) அணுகுகின்றன — வெளியிடப்பட்ட port
> host-பக்கக் கருவிகளுக்காக (`redis-cli`, உள்ளூர் `npm run dev`) மட்டுமே உள்ளது. அதை
> `0.0.0.0`-இல் வெளியிடுவது, அங்கீகாரம் இல்லாத Redis-ஐ உங்கள் LAN-இல் உள்ள ஒவ்வொரு host-க்கும் வெளிப்படுத்தும். நீங்கள்
> `REDIS_BIND_HOST=0.0.0.0` என அமைத்தால், சேவையின் `command:`-இல் `--requirepass`-ஐயும் சேர்க்கவும்.

**Redis-ஐ முடக்குவது** பரிந்துரைக்கப்படவில்லை (விகிதக் கட்டுப்படுத்தி நினைவக அடிப்படையிலான மாற்று முறைக்குத் தரம் குறையும்). அவசியம் முடக்க வேண்டுமெனில், `docker-compose.yml`-இல் உள்ள `redis:` சேவைத் தொகுதியை நீக்கவும்/கருத்துரையாக்கவும் அல்லது அதை பூஜ்ஜியமாக scale செய்யவும்:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

dev உடன் இணையாக இயங்கும் தனிமைப்படுத்தப்பட்ட production snapshot-க்கு, `docker-compose.prod.yml`-ஐப் பயன்படுத்தவும்.

| விவரம்                    | மதிப்பு                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| கோப்பு                    | `docker-compose.prod.yml`                                                                                           |
| இயல்புநிலை dashboard port | `PROD_DASHBOARD_PORT=20130` (உள் `${DASHBOARD_PORT:-20128}`-க்கு map செய்யப்பட்டது)                                 |
| இயல்புநிலை API port       | `PROD_API_PORT=20131`                                                                                               |
| இமேஜ்                     | `omniroute:prod` (`runner-cli` target-இலிருந்து உருவாக்கப்பட்டது)                                                   |
| Redis கண்டெய்னர்          | `omniroute-redis-prod` (`redis:8.6.2`, பிரத்யேக `redis-prod-data` volume)                                           |
| தரவு volume               | `omniroute-prod-data` (பெயரிடப்பட்டது, மறுஉருவாக்கங்களுக்கிடையே நிலைத்திருக்கும்)                                   |
| ஆரோக்கியச் சோதனைகள்       | `node healthcheck.mjs` + `redis-cli ping`, Redis ஆரோக்கியத்தின் அடிப்படையில் கட்டுப்படுத்தப்படும் `depends_on` உடன் |

பயன்படுத்துவது எப்படி:

```bash
# production stack-ஐ உருவாக்கித் தொடங்கவும்
docker compose -f docker-compose.prod.yml up -d --build

# logs-ஐ தொடர்ச்சியாகப் பார்க்கவும்
docker compose -f docker-compose.prod.yml logs -f

# நிறுத்தி அகற்றவும் (volumes-ஐத் தக்கவைக்கவும்)
docker compose -f docker-compose.prod.yml down
```

prod stack, dev compose உடன் இணையாக இயங்கும் (வேறுபட்ட கண்டெய்னர் பெயர்கள், ports மற்றும் volumes), எனவே production தொடர்ந்து இயங்கிக்கொண்டிருக்கும்போது நீங்கள் உள்ளூரில் தொடர்ந்து மாற்றங்களைச் செய்து சோதிக்கலாம்.

## Dockerfile கட்டங்கள்

இந்தக் களஞ்சியம் பல-கட்ட Dockerfile (`Dockerfile`) ஒன்றை வழங்குகிறது. நான்கு கட்டங்கள் வெளிப்படுத்தப்பட்டுள்ளன; உங்கள் பயன்பாட்டிற்கு ஏற்ற `target`-ஐத் தேர்ந்தெடுக்கவும்.

| கட்டம்        | அடிப்படை image        | நோக்கம்                                                                                                                                                                                                                                                                                                                                               |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | சார்புகளை நிறுவி (`npm ci --legacy-peer-deps`), `npm run build`-ஐ இயக்குகிறது (இயல்பாக Turbopack — கீழே உள்ள உருவாக்க நேர வளங்களைப் பார்க்கவும்)                                                                                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone வெளியீட்டைக் கொண்ட production runtime. **எந்த provider CLI-களும் சேர்க்கப்படவில்லை.**                                                                                                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` மற்றும் global CLI-களைச் சேர்க்கிறது: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agentic workflow-களுக்கு இதைத் தேர்ந்தெடுக்கவும்.**                                                                                                                                                   |
| `runner-web`  | `runner-base`         | Web-session provider-களுக்காக Playwright + Chromium browser (`--with-deps`) ஆகியவற்றைச் சேர்க்கிறது: `gemini-web`, `claude-web`, `claude-turnstile`. **அந்த provider-களைப் பயன்படுத்தும்போது இதைத் தேர்ந்தெடுக்கவும்** — இது இல்லாமல் plain image request நேரத்தில் தோல்வியடையும் (Release Channels என்பதன் கீழ் உள்ள `-web` குறிப்பைப் பார்க்கவும்). |

குறிப்பிட்ட target ஒன்றைக் கைமுறையாக உருவாக்கவும்:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### உருவாக்க நேர வளங்கள்

`builder` கட்டத்தின் வளச் செலவைக் கட்டுப்படுத்தும் மூன்று build arg-கள் உள்ளன. அவை உருவாக்க நேரத்திற்கு மட்டுமே உரியவை —
`OMNIROUTE_MEMORY_MB` (கீழே) என்பது தனியான runtime கட்டுப்பாடு.

| Build arg                   | இயல்புநிலை | விளைவு                                                                                                             |
| --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `1`        | `0` எனில் அதற்குப் பதிலாக webpack மூலம் உருவாக்கும். உச்ச memory குறைவாக இருக்கும், ஆனால் மெதுவாக இயங்கும்.        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | தொடங்கப்படும் `next build`-க்கான V8 heap உச்சவரம்பு (`--max-old-space-size`).                                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL`-க்கு மதிப்பை வழங்குகிறது; page-data சேகரிப்பிற்காக Next, `workers = N - 1` எனக் கணக்கிடுகிறது. |

பெரிய builder ஒன்றில் அதிகரிக்க வேண்டியதும், குறைந்த வளமுள்ள build ஒன்று
`✓ Compiled successfully` என்பதற்குப் **பிறகு** செயலிழக்கும்போது சந்தேகிக்க வேண்டியதும் `OMNIROUTE_BUILD_WORKERS`
ஆகும். ஒவ்வொரு page-data worker-உம் தனித்தனி process ஆகும்; parent `next build`-உம்
அப்படியே தனி process ஆகும்; ஒரு நேரடி VPS மறுஉருவாக்கத்தில் (issue #7518), ஒவ்வொரு process-இன்
உச்ச RSS-உம் `NODE_OPTIONS` heap flag-இலிருந்து சுயாதீனமாக ~4.5 GB என்று அளவிடப்பட்டது
(Turbopack, V8 heap-க்கு வெளியே உள்ள native/Rust memory-இல் compile செய்கிறது).
இயல்புநிலையான `2` (→ 1 worker, மொத்தம் 2 process-கள்) என்பது publish pipeline பயன்படுத்தும்
16 GB / 4 vCPU GitHub-hosted runner-களுக்கேற்ப நிர்ணயிக்கப்பட்டுள்ளது.
`8` (→ 7 worker-கள்) என அமைத்தபோது அந்த runner-இன் memory தீர்ந்துவிட்டதால்,
buildkit அந்தப் படிநிலையை `ResourceExhausted: ... cannot allocate memory` என்பதுடன்
தோல்வியடையச் செய்தது; process ஒன்றிற்கான RSS ஊகிக்கப்படாமல் நேரடியாக அளவிடப்பட்டபோது,
`3` (→ 2 worker-கள்) என்பதும் போதவில்லை. `tests/unit/docker-build-memory-budget.test.ts`
அளவிடப்பட்ட மதிப்பை அடிப்படையாகக் கொண்டு கணக்கீடு செய்து, இரண்டு கட்டுப்பாடுகளில்
ஏதேனும் ஒன்று runner-இன் கொள்ளளவை மீறினால் தோல்வியடைகிறது.

Turbopack, V8 heap-க்கு **வெளியே** இருக்கும் native Rust memory-இல் compile செய்வதால்,
`OMNIROUTE_BUILD_MEMORY_MB` அதற்கு வரம்பிடாது. Memory உச்சவரம்புள்ள host ஒன்றில்,
எந்த error உரையும் இல்லாமல் OOM killer மூலம் build SIGKILL செய்யப்படும் — அது
`Creating an optimized production build` என்பதன் நடுவில் அப்படியே நின்றுவிடும்;
இதனால் out-of-memory பிரச்சினையாகத் தெரியாமல், செயல்முறை சிக்கிக்கொண்டதுபோல் தோன்றும்.
Build host-இல் வளங்கள் குறைவாக இருந்தால், bundler-களை மாற்றவும்:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` இயக்கப்பட்டிருப்பதால், `next build` ஒரு parent process-ஐயும்
ஒரு worker process-ஐயும் இயக்குகிறது; ஒவ்வொன்றும் `OMNIROUTE_BUILD_MEMORY_MB`-ஐத்
தனித்தனியாகப் பின்பற்றுகின்றன. Container உச்சவரம்பை அந்த மதிப்பின் ஒரு மடங்கிற்கு அல்ல,
தோராயமாக இரண்டு மடங்கிற்கு மேல் அமைக்கவும்.

இந்த tree-இல் அளவிடப்பட்டது (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container உச்சவரம்பு | முடிவு                                                  |
| --------- | -------------------- | ------------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | இரண்டிலும் எந்தச் செய்தியுமின்றி OOM-kill செய்யப்பட்டது |
| webpack   | 8 GiB                | build worker SIGKILL செய்யப்பட்டது                      |
| webpack   | 12 GiB               | வெற்றியடைந்தது; உச்சப் பயன்பாடு 11.1 GiB                |

### Runtime இயல்புநிலைகள்

`runner-base` மூலம் export செய்யப்படும் இயல்புநிலைகள்: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker-இல் memory செயல்பாடு:

- இந்த image `OMNIROUTE_MEMORY_MB=1024` என்பதை அமைத்து, அதிலிருந்து `NODE_OPTIONS=--max-old-space-size=1024` என்பதைப் பெறுகிறது.
- உண்மையான server process, standalone launcher மூலம் தொடங்கப்படுகிறது; அது `OMNIROUTE_MEMORY_MB` மதிப்பைப் படித்து, `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` என்பதைச் சேர்க்கிறது.
- மீண்டும் மீண்டும் குறிப்பிடப்பட்ட `--max-old-space-size` மதிப்புகளில் கடைசி மதிப்பை Node பயன்படுத்துகிறது; எனவே `OMNIROUTE_MEMORY_MB` அமைப்பது நடைமுறையிலுள்ள Docker heap வரம்பைக் கட்டுப்படுத்துகிறது.
- image இதை எப்போதும் அமைப்பதால், launcher's RAM-அளவீடு செய்யப்பட்ட fallback Docker-இன் கீழ் ஒருபோதும் பயன்படுத்தப்படாது. workload-க்கு ஏற்ப இதை வெளிப்படையாக உயர்த்தவும் (கீழேயுள்ள அட்டவணையைப் பார்க்கவும்). coding-agent `/v1/responses` பயன்பாட்டிற்கு `2048` இன்னும் போதுமானதல்ல.

### Coding agents-க்கான இயக்கநேர RAM

1 GiB Docker இயல்புநிலை என்பது dashboard/இலகுவான-chat பயன்பாட்டிற்கான குறைந்தபட்ச அளவே தவிர, production அளவு அல்ல. நீண்ட `POST /v1/responses` body-கள் (நூற்றுக்கணக்கான messages, பத்துக்கணக்கான tools) compression நடைபெறும்போது பல in-memory graph-களைத் தக்கவைத்துக்கொள்கின்றன. ஒரே நேரத்தில் செயல்பட்ட சுமார் ~3 MiB / ~750k-token அளவுடைய இரண்டு requests, **12 GiB** old-space-இல் V8-ஐ நிறுத்தியுள்ளன (`FATAL ERROR: Reached heap limit`); மேலும் 16 GiB cgroup OOM வரம்பையும் எட்டியுள்ளன. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)-ஐப் பார்க்கவும்.

**heap அளவைவிட அதிகமாக cgroup `--memory`-ஐ நிர்ணயிக்கவும்** — native buffer-கள், SQLite மற்றும் compression இடைநிலைத் தரவுகள் V8-க்கு வெளியே உள்ளன.

| Workload                                                      | `OMNIROUTE_MEMORY_MB`          | Container / cgroup                   | குறிப்புகள்                                                                                                                                           |
| ------------------------------------------------------------- | ------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, ஓர் இலகுவான chat                                   | `1024` (image இயல்புநிலை)      | ≥2 GiB                               |                                                                                                                                                       |
| ஒரு coding agent (Claude/Codex/Grok)                          | `8192`                         | ≥10 GiB                              | வழக்கமான ஒற்றை-session `/v1/responses`                                                                                                                |
| ஒரே நேரத்தில் இரண்டு நீண்ட `/v1/responses`                    | `10240`–`12288`                | ≥12–16 GiB                           | சுமார் ~12 GiB heap-இல் V8 நிறுத்தம் அளவிடப்பட்டது                                                                                                    |
| ஒரே நேரத்தில் மூன்று அல்லது அதற்கு மேற்பட்ட நீண்ட context-கள் | ஒரே process-இல் செய்ய வேண்டாம் | தொடர்ச்சியாக இயக்கவும் / கூடுதல் RAM | இயல்புநிலை heavyweight admission-இல் 1 request மட்டுமே செயல்பாட்டில் இருக்கும்; RAM-ஐ அதிகரிக்காமல் இதை உயர்த்துவது மீண்டும் நிறுத்தத்தை ஏற்படுத்தும் |

bare metal-இல் `omniroute serve`, `OMNIROUTE_MEMORY_MB` **அமைக்கப்படாதபோது**, RAM-இன் சுமார் 35%-க்கு (`[512, 4096]` வரம்பிற்குள் கட்டுப்படுத்தப்பட்டு) அளவீடு செய்கிறது. Docker எப்போதும் `1024` என்பதை அமைப்பதால், அதிகாரப்பூர்வ image-இல் அந்த அளவீடு ஒருபோதும் இயங்காது.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## முக்கியமான சூழல் மாறிகள்

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-இல் ஆவணப்படுத்தப்பட்டுள்ள இயல்புநிலைகளுக்கு அப்பால், Docker-இன் கீழ் இயக்கும்போது பின்வரும் மாறிகள் மிகவும் முக்கியமானவை:

| மாறி                          | நோக்கம்                                                                                                                                                                                                                                                                                                      | இயல்புநிலை                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket இணைப்புப் பாலத்திற்கான பகிரப்பட்ட ரகசியம். **உற்பத்திச் சூழலில் கட்டாயம்** — வலுவான சீரற்ற சரமாக அமைக்கவும்.                                                                                                                                                                                       | அமைக்கப்படவில்லை (வழங்கப்பட வேண்டும்) |
| `REDIS_URL`                   | விகிதக் கட்டுப்படுத்தி / தற்காலிகச் சேமிப்பகப் பின்தளத்திற்கான இணைப்புச் சரம்                                                                                                                                                                                                                                | `redis://redis:6379`                  |
| `REDIS_PORT`                  | தொகுப்பில் உள்ள Redis கண்டெய்னருக்கான ஹோஸ்ட்-பக்கப் போர்ட்                                                                                                                                                                                                                                                   | `6379`                                |
| `REDIS_BIND_HOST`             | தொகுப்பில் உள்ள Redis போர்ட் வெளியிடப்படும் ஹோஸ்ட் இடைமுகம் (நீங்கள் AUTH-ஐச் சேர்க்காவிட்டால் loopback)                                                                                                                                                                                                     | `127.0.0.1`                           |
| `AUTO_UPDATE_HOST_REPO_DIR`   | சுய-புதுப்பிப்புப் பணிப்பாய்வுகளுக்காக `cli` சுயவிவரத்தில் `/workspace/omniroute` என்ற இடத்தில் ஏற்றப்படும் ஹோஸ்ட் பாதை                                                                                                                                                                                      | `.` (தற்போதைய அடைவு)                  |
| `OMNIROUTE_MEMORY_MB`         | Docker தனித்த சேவையகத்திற்கான இயக்கநேர Node heap உச்சவரம்பு; மேலே உள்ள image இயல்புநிலையை இது மீறி அமைக்கும். நிரலாக்க முகவர்கள்: `8192`+ ([இயக்கநேர RAM](#runtime-ram-for-coding-agents)-ஐப் பார்க்கவும்).                                                                                                  | `1024`                                |
| `DASHBOARD_PORT` / `API_PORT` | dashboard (20128) மற்றும் API (20129) ஆகியவற்றிற்கான வெளிப்படுத்தப்பட்ட போர்ட்களை மீறி அமைக்கும்                                                                                                                                                                                                             | `20128` / `20129`                     |
| `APP_BIND_HOST`               | dashboard/API/live-WS போர்ட்களை docker-compose வெளியிடும் ஹோஸ்ட் இடைமுகம். `REQUIRE_API_KEY=false` (இயல்புநிலை) என இருக்கும்போது, `0.0.0.0` பெயரற்ற `/v1` proxy-ஐ LAN-க்கு வெளிப்படுத்தும் — `REQUIRE_API_KEY=true` என அமைத்தோ அல்லது முன்புறத்தில் reverse proxy ஒன்றை வைத்தோ மட்டுமே அணுகலை விரிவாக்கவும். | `127.0.0.1`                           |
| `CLIPROXY_BIND_HOST`          | `cliproxyapi` sidecar-ஐ docker-compose வெளியிடும் ஹோஸ்ட் இடைமுகம் — அதன் தரவுத் தொகுதி வழங்குநரின் நற்சான்றுகளை வைத்திருக்கும்.                                                                                                                                                                              | `127.0.0.1`                           |
| `OMNIROUTE_PLUGINS_DIR`       | இயக்கநேர plugin scanner வாசித்து நிறுவும் அடைவு. plugins bind-mounted செய்யப்பட்டிருந்தால் இதை அமைக்கவும்: இயல்புநிலை `HOME`-ஐப் பின்பற்றுகிறது; ஓர் image அதை export செய்ய வேண்டிய அவசியமில்லை.                                                                                                             | `~/.omniroute/plugins`                |
| `OMNIROUTE_BASE_PATH`         | app ஒரு reverse proxy-க்குப் பின்னால் வெளியிடப்படும்போது பயன்படுத்தப்படும் URL துணைப்பாதை (எ.கா. `/omniroute`)                                                                                                                                                                                               | _(காலி = root)_                       |
| `NEXT_PUBLIC_BASE_URL`        | துணைப்பாதையையும் உள்ளடக்கிய பொதுப் browser origin (எ.கா. `https://host/omniroute`)                                                                                                                                                                                                                           | அமைக்கப்படவில்லை                      |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`-க்கான ஹோஸ்ட்-பக்க dashboard போர்ட்                                                                                                                                                                                                                                                 | `20130`                               |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar-க்கான ஹோஸ்ட்-பக்கப் போர்ட்                                                                                                                                                                                                                                                             | `8317`                                |

## துணைப் பாதையில் ரிவர்ஸ் ப்ராக்ஸி (Traefik / nginx)

Next.js `basePath` தனித்தியங்கும் பண்டிலில் தொகுக்கப்படுகிறது. OmniRoute, செயலியின் மூலக் கோப்பகத்தில் உள்ள ஒரு சென்டினல் கோப்பில் உள்ளமைக்கப்பட்ட மதிப்பைப் பதிவு செய்கிறது (`npm run build`-இன் போது எழுதப்படுகிறது; `scripts/docker/ensure-docker-base-path.mjs` மூலம் படிக்கப்படுகிறது), மேலும் கண்டெய்னர் தொடங்கும்போது அதை `OMNIROUTE_BASE_PATH` உடன் ஒப்பிடுகிறது. அவை வேறுபட்டு, இமேஜ் டொமைன் மூலத்திற்காக உருவாக்கப்பட்டிருந்தால், `node dev/run-standalone.mjs` இயங்குவதற்கு முன் என்ட்ரிபாயின்ட் தனித்தியங்கும் மேனிஃபெஸ்ட்கள், உட்பொதிக்கப்பட்ட `basePath`/`assetPrefix` லிட்டரல்கள் (Next 16, SSR அசெட் URL-களை `assetPrefix`-இலிருந்து மட்டும் உருவாக்குகிறது — பேட்சர் துணைப் பாதையை அதிலும் பிரதிபலிக்கிறது), உள்ளமைக்கப்பட்ட `/_next/static` அசெட் URL-கள் (கிளையன்ட்-ரெஃபரன்ஸ் மேனிஃபெஸ்ட்கள், மீடியா இம்போர்ட்கள், முன்கூட்டியே ரெண்டர் செய்யப்பட்ட பிழைப் பக்கங்கள்) மற்றும் கிளையன்ட் `process.env` ஷிம் ஆகியவற்றை மீண்டும் எழுதுகிறது.

### Compose பில்ட் (பரிந்துரைக்கப்படுகிறது)

`.env`-இல் இரண்டு மாறிகளையும் அமைத்து, இமேஜும் இயக்கநேரமும் ஒத்துப்போகுமாறு மீண்டும் உருவாக்கவும்:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`-ஐ Docker பில்ட் ஆர்க்யூமென்டாகவும் இயக்கநேர சூழல் மாறியாகவும் அனுப்புகிறது.

### முன்கூட்டியே உருவாக்கப்பட்ட ரூட் இமேஜ் + இயக்கநேர துணைப் பாதை

வெளியிடப்பட்ட `diegosouzapw/omniroute:*` இமேஜ்கள் டொமைன் மூலத்திற்காக உருவாக்கப்பட்டவை. இருந்தாலும் இயக்கநேரத்தில் `OMNIROUTE_BASE_PATH`-ஐ அமைக்கலாம்; கண்டெய்னர் தொடக்கத்தின்போது பண்டிலை ஒருமுறை பேட்ச் செய்யும். அதற்குப் பொருந்தும் பொது ஆரிஜினையும் சேர்த்து அமைக்கவும்:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ரிவர்ஸ் ப்ராக்ஸி, **முழுமையான** வெளிப்புறப் பாதையை முன்னனுப்புமாறு உள்ளமைக்கவும் (முன்னொட்டைப் பிரிக்க வேண்டாம்). Traefik, `StripPrefix` இல்லாமல் `PathPrefix(`/omniroute`)`-ஐ கண்டெய்னருக்கு ரூட் செய்ய வேண்டும்; இதனால் Next.js `/omniroute/...`-ஐப் பெற்று, `/omniroute/_next/...`-இலிருந்து அசெட்களை வழங்கும்.

Docker ஹெல்த்செக், செயலில் உள்ள `OMNIROUTE_BASE_PATH` முன்னொட்டுடன் கூடிய இலகுவான `/healthz` லைஃப்சைக்கிள் என்ட்பாயின்டைச் சோதிக்கிறது. மனிதர்/டாஷ்போர்டு கண்டறிதல்களுக்காக `/api/monitoring/health` தொடர்ந்து கிடைக்கும்; கண்டெய்னர் HEALTHCHECK-ஐ மீண்டும் அதற்குச் சுட்டிக்காட்ட (எடுத்துக்காட்டாக, ஆழமான ஆரோக்கிய அமலாக்கத்திற்காக), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`-ஐ அமைக்கவும். அந்தப் பாதை ஒரு **ஆழமான** சோதனை (DB + கண்காணிப்புச் சுருக்கம்) — நீங்கள் அதை மீண்டும் பயன்படுத்தத் தேர்வுசெய்தால் Docker-இன் அரிதாக இயங்கும் `HEALTHCHECK`-க்கு ஏற்றது, ஆனால் Kubernetes `livenessProbe` இடைவெளிகளுக்கு **ஏற்றதல்ல**.

ஆர்கெஸ்ட்ரேட்டர்களுக்கு (Kubernetes, Nomad போன்றவை):

| சோதனை                | விரும்பத்தக்கது                                                               | தவிர்க்க வேண்டியது                                                       |
| -------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| லைவ்னஸ்              | HTTP `GET /livez`, அல்லது முதன்மை போர்ட்டில் TCP (`PORT`, இயல்புநிலை `20128`) | லைவ்னஸ் சோதனையாக `/api/monitoring/health`                                |
| தயார்நிலை            | HTTP `GET /healthz`                                                           | ஈவென்ட் லூப் பிஸியாக இருப்பதை செயலிழப்பாகக் கருதும் குறுகிய காலக்கெடுகள் |
| ஆழமான / பிளாக்பாக்ஸ் | `/api/monitoring/health`                                                      | —                                                                        |

`/healthz`, செயல்முறை லைஃப்சைக்கிள் நிலையை (`ok` / `starting` / `stopping`) தெரிவிக்கிறது. `/livez` என்பது செயல்முறை இயங்குகிறதா என்பதை மட்டும் காட்டும் (ஹேண்ட்லர் இயங்கக்கூடிய போதெல்லாம் 200; அது தயார்நிலைக்காகக் காத்திருக்காது). இரண்டும் கோரிக்கைகளைக் கையாளும் அதே Node ஈவென்ட் லூப்பில்தான் இயங்குகின்றன; எனவே CPU-சார்ந்த கேட்டலாக் அல்லது கம்ப்ரஷன் பணிகள் அவற்றைத் தாமதப்படுத்தலாம் — பிஸி ≠ செயலிழப்பு. HTTP சோதனைகள் காலாவதியானால் TCP லைவ்னஸை விரும்பவும். முழுமையான சோதனை வழிகாட்டுதல்:
[கண்காணிப்பு வழிகாட்டி — Kubernetes சோதனைப் பரிந்துரைகள்](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy உடன் Docker Compose (HTTPS Auto-TLS)

Caddy-யின் தானியங்கி SSL வழங்கலைப் பயன்படுத்தி OmniRoute-ஐப் பாதுகாப்பாக வெளிப்படுத்தலாம். உங்கள் டொமைனின் DNS A பதிவு, உங்கள் சேவையகத்தின் IP-ஐச் சுட்டிக்காட்டுவதை உறுதிசெய்யவும்.

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
      # OAuth அழைப்புத் திருப்பல்கள், டாஷ்போர்டு இணைப்புகள் மற்றும் உருவாக்கப்பட்ட பொது URL-களுக்கான உலாவி எதிர்கொள்ளும் மூலம்.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # திட்டமிடப்பட்ட பணிகள் / சுயப் பெறுதல்களுக்கான உள் சேவையகம்-சேவையகம் URL.
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

அப்ஸ்ட்ரீம் கண்டெய்னருக்கான நிலையான முன்னனுப்பல் தலைப்புகளை Caddy அமைக்கிறது. OAuth அழைப்புத் திருப்பல்கள் மற்றும் உருவாக்கப்பட்ட பொது இணைப்புகளுக்கான அதிகாரப்பூர்வப் பொது மூலமாக
`NEXT_PUBLIC_BASE_URL`-ஐ OmniRoute பயன்படுத்துகிறது; அங்கீகரிக்கப்பட்ட டாஷ்போர்டு எழுதுதல்கள், அதே-மூலக் கோரிக்கைகளுடன் அமர்வுடன் பிணைக்கப்பட்ட CSRF
பாதுகாப்பைப் பயன்படுத்துகின்றன. வெளிப்படையான
உள்ளமைவுக்குப் பதிலாக நம்பகமான முன்னனுப்பப்பட்ட தலைப்புகளிலிருந்து பொது மூலத்தை OmniRoute பெற வேண்டுமென நீங்கள் திட்டமிட்டுள்ள மேம்பட்ட நிறுவல்களுக்கு மட்டும் `OMNIROUTE_TRUST_PROXY`-ஐ இயக்கவும்.

## Cloudflare Quick Tunnel

Docker நிறுவல்களுக்கான டாஷ்போர்டு ஆதரவில், `Dashboard → Endpoints` என்பதில் ஒரே கிளிக்கில் இயக்கக்கூடிய **Cloudflare Quick Tunnel** உள்ளது. முதன்முறையாக இயக்கும்போது, தேவைப்பட்டால் மட்டுமே `cloudflared` பதிவிறக்கப்பட்டு, உங்கள் தற்போதைய `/v1` முனைப்புள்ளிக்கு ஒரு தற்காலிக சுரங்கம் தொடங்கப்பட்டு, உருவாக்கப்பட்ட `https://*.trycloudflare.com/v1` URL உங்கள் வழக்கமான பொது URL-க்குக் கீழே நேரடியாகக் காட்டப்படும்.

செயலில் உள்ள சுரங்கத்தின் நிலையை மாற்றாமல், முனைப்புள்ளி சுரங்கப் பலகைகளை (Cloudflare, Tailscale, ngrok) `Settings → Appearance` என்பதிலிருந்து காட்டவோ மறைக்கவோ முடியும்.

### சுரங்கக் குறிப்புகள்

- Quick Tunnel URL-கள் தற்காலிகமானவை; ஒவ்வொரு மறுதொடக்கத்திற்குப் பிறகும் அவை மாறும்.
- OmniRoute அல்லது கண்டெய்னர் மறுதொடக்கத்திற்குப் பிறகு Quick Tunnels தானாக மீட்டமைக்கப்படாது. தேவைப்படும்போது டாஷ்போர்டிலிருந்து அவற்றை மீண்டும் இயக்கவும்.
- நிர்வகிக்கப்பட்ட நிறுவல் தற்போது Linux, macOS மற்றும் Windows ஆகியவற்றில் `x64` / `arm64`-ஐ ஆதரிக்கிறது.
- கட்டுப்பாடுகள் உள்ள கண்டெய்னர் சூழல்களில் அதிகப்படியான QUIC UDP இடையக எச்சரிக்கைகளைத் தவிர்க்க, நிர்வகிக்கப்பட்ட Quick Tunnels இயல்பாக HTTP/2 போக்குவரத்தைப் பயன்படுத்தும். வேறு போக்குவரத்தைப் பயன்படுத்த விரும்பினால் `CLOUDFLARED_PROTOCOL=quic` அல்லது `auto` என அமைக்கவும்.
- Docker படிமங்களில் கணினி CA வேர்கள் சேர்க்கப்பட்டுள்ளன; அவை நிர்வகிக்கப்பட்ட `cloudflared`-க்கு அனுப்பப்படுகின்றன. இதனால் கண்டெய்னருக்குள் சுரங்கம் தொடங்கப்படும்போது ஏற்படக்கூடிய TLS நம்பிக்கைத் தோல்விகள் தவிர்க்கப்படுகின்றன.
- OmniRoute ஒன்று பதிவிறக்குவதற்குப் பதிலாக ஏற்கனவே உள்ள பைனரியைப் பயன்படுத்த வேண்டுமெனில் `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` என அமைக்கவும்.

## படக் குறிச்சொற்கள்

| படம்                     | குறிச்சொல் | அளவு   | விளக்கம்                                                    |
| ------------------------ | ---------- | ------ | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest`   | ~250MB | அதிகபட்ச **வெளியிடப்பட்ட** நிலையான SemVer (git `main` அல்ல) |
| `diegosouzapw/omniroute` | `3.8.0`    | ~250MB | GitOps-க்காக இந்த வகைக் குறிச்சொல்லை நிலையாகப் பொருத்தவும்  |

பல-தள manifest: `linux/amd64` + `linux/arm64` ஆகியவற்றுக்கு இயல்பான ஆதரவு (Apple Silicon, AWS Graviton, Raspberry Pi). பொருந்தும் architecture-ஐ Docker தானாகவே தேர்ந்தெடுக்கிறது; ARM host-களில் AMD64 emulation-ஐக் கட்டாயப்படுத்த வேண்டுமானால் `--platform linux/amd64` என்பதை வழங்கவும்.

### வெளியீட்டுச் சேனல்கள்

நிலையான வெளியீடுகள், செயலில் உள்ள release branch சோதனை மற்றும் development build-களுக்காக OmniRoute தனித்தனி Docker சேனல்களை வெளியிடுகிறது.

| சேனல்                           | மூலம்                                     | மாற்றத்தன்மை                    | பரிந்துரைக்கப்படும் பயன்பாடு                                                                                                              |
| ------------------------------- | ----------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | கையொப்பமிடப்பட்ட/versioned வெளியீடு       | மாற்ற முடியாதது                 | துல்லியமான வெளியீட்டைப் பொருத்தும் production deployment-கள்                                                                              |
| `:latest` / `:latest-web`       | அதிகபட்ச **வெளியிடப்பட்ட** நிலையான SemVer | மாற்றக்கூடிய நிலையான சுட்டி     | SemVer publish job-க்குப் **பிறகு** நிலையான வெளியீடுகளைப் பின்தொடரும் — `main` அல்லது வெளியிடப்படாத `release/v*` commit-களைப் பின்தொடராது |
| `:next` / `:next-web`           | தற்போதைய இயல்புநிலை `release/v*` branch   | மாற்றக்கூடிய pre-release சுட்டி | செயலில் உள்ள release branch-இல் சேர்க்கப்பட்டிருந்தாலும் இன்னும் நிலையான வெளியீட்டில் இடம்பெறாத திருத்தங்களைச் சோதித்தல்                  |
| `:main` / `:main-web`           | `main` branch                             | மாற்றக்கூடிய development சுட்டி | Development மற்றும் integration சோதனைக்கு மட்டும்                                                                                         |

#### Web-session provider-கள்: `-web` image-கள்

மேலே உள்ள ஒவ்வொரு சேனலும் `-web` குறிச்சொல்லாகவும் (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) கிடைக்கிறது; இவை `runner-web` stage-இலிருந்து உருவாக்கப்படுகின்றன — அதே image-உடன் Playwright மற்றும் Chromium browser-உம் சேர்க்கப்பட்டிருக்கும். சாதாரண image Chromium **இல்லாமல்** வழங்கப்படுகிறது; `gemini-web`, `claude-web` மற்றும் `claude-turnstile` ஆகியவற்றுக்கு அது தேவை.

தோல்வி startup நேரத்தில் ஏற்படாமல் தள்ளிவைக்கப்படுகிறது: அந்த provider-கள் தங்கள் model-களைப் பட்டியலிட்டு dashboard-இல் இணைக்கப்பட்டதாகக் காட்டும்; முதல் request மட்டுமே பின்வரும் பிழையுடன் தோல்வியடையும்

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

அந்த provider-களை நீங்கள் பயன்படுத்தினால், ஏற்கெனவே பயன்படுத்தும் சேனலின் `-web` குறிச்சொல்லை pull செய்யவும் — வேறு எதுவும் மாறாது. npm/CLI நிறுவலில் (Docker image இல்லாமல்), இதற்கு இணையான விடுபட்ட பகுதி browser binary ஆகும்: host-இல் `npx playwright install chromium` என்பதை இயக்கவும்.

#### Pre-release சேனலைப் பயன்படுத்துதல்

தற்போதைய இயல்புநிலை `release/v*` branch-க்கு ஒவ்வொரு push செய்யப்படும்போதும் `next` சேனல் மீண்டும் build செய்யப்படுகிறது; மேலும் அது AMD64 மற்றும் ARM64 இரண்டிற்கும் வெளியிடப்படுகிறது. பழைய maintenance branch-கள் அதை overwrite செய்ய முடியாது. அடுத்த நிலையான குறிச்சொல் உருவாக்கப்படுவதற்கு முன் செயலில் உள்ள release branch-இல் merge செய்யப்பட்ட திருத்தங்களுக்கான pull செய்யக்கூடிய image-ஐ இந்தச் சேனல் வழங்குகிறது.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-க்காக, தேர்ந்தெடுக்கப்பட்ட profile பயன்படுத்தும் image குறிச்சொல்லை override செய்து, பின்னர் service-ஐ pull செய்து மீண்டும் உருவாக்கவும்:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### பாதுகாப்பும் rollback-உம்

`next` என்பது மாறிக்கொண்டிருக்கும் pre-release சேனலாகும். செயலில் உள்ள release branch-க்கு ஏதேனும் push செய்யப்படும்போது அது மாறக்கூடும்; மேலும் அது **production பயன்பாட்டிற்கு ஆதரிக்கப்படவில்லை**. குறிப்பிட்ட build ஒன்றை மதிப்பீடு செய்யும்போது image digest-ஐ நிலையாகப் பொருத்தவும்:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

சோதிப்பதற்கு முன், OmniRoute data volume அல்லது bind-mount செய்யப்பட்ட data directory-ஐ backup எடுக்கவும். rollback செய்ய, முன்பு பயன்படுத்தப்பட்ட நிலையான version அல்லது digest-ஐ மீட்டமைத்து container-ஐ மீண்டும் உருவாக்கவும்:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

ஒரு release-branch build ஒருபோதும் `latest`-ஐ நகர்த்த முடியாது; தகுதியான நிலையான semantic version மட்டுமே நிலையான சுட்டியை முன்னேற்ற முடியும். `next` image-கள் release image inspection மற்றும் தடுக்கும் CRITICAL-vulnerability gate ஆகியவற்றைத் தொடர்ந்து கொண்டிருக்கும்.

**`latest` என்பது git-க்கான புதுமை உத்தரவாதம் அல்ல.** `main` அல்லது செயலில் உள்ள `release/v*` branch-இல் merge செய்யப்பட்ட திருத்தங்கள், நிலையான SemVer image வெளியிடப்பட்டு publish job `:latest`-ஐ முன்னேற்றும் வரை (அந்த SemVer-இன் அதே digest) `:latest`-இல் இடம்பெறாது. GitHub-இல் திருத்தம் ஏற்கெனவே தெரிந்தாலும் `latest` மாறாமல் இருப்பதாகத் தோன்றினால், release branch-ஐச் சோதிக்க `:next`-ஐ pull செய்யவும் அல்லது SemVer குறிச்சொல்லுக்காகக் காத்திருக்கவும்.

| உங்களுக்கு வேண்டியது                                                                                             | பயன்படுத்தவும்                                           |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| மாறாமல் இருக்க வேண்டிய GitOps / production                                                                       | `:X.Y.Z`-ஐ (அல்லது image digest-ஐ) நிலையாகப் பொருத்தவும் |
| வெளியிடப்பட்ட நிலையான வெளியீடுகளைப் பின்தொடர்ந்து, ஒவ்வொரு வெளியீட்டிலும் மீண்டும் உருவாக்குவதை ஏற்றுக்கொள்ளுதல் | `:latest`                                                |
| வெளியிடப்படாத `release/v*` commit-களைச் சோதித்தல்                                                                | `:next` (production அல்ல)                                |
| `main`-ஐச் சோதித்தல்                                                                                             | `:main` (production அல்ல)                                |

## கிடைக்கும் தன்மை: இயல்புநிலை SQLite ஒற்றைப் பிரதியை மட்டுமே கொண்டது

வழக்கமான Docker / Kubernetes OmniRoute என்பது **ஒரு Node செயல்முறை + ஒரு SQLite writer** ஆகும். இந்த topology-இல் உயர் கிடைக்கும் தன்மை **ஆதரிக்கப்படவில்லை**.

| கட்டுப்பாடு                                    | விளைவு                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ஒற்றை writer                                   | ஒரே SQLite கோப்பைப் பயன்படுத்தி பல பிரதிகளை இயக்க **வேண்டாம்**. அது DB-ஐச் சிதைக்கும்.                                                                                                                                                                                                                                                                                                      |
| மீளுருவாக்கம் / மறுதொடக்கம் / HEALTHCHECK kill | செயல்பாட்டிலுள்ள SSE, dashboard அமர்வுகள் மற்றும் நினைவகத்திலுள்ள நிலை ஆகியவை **முழுமையாகச் செயலிழக்கும்**. இணைக்கப்பட்ட ஒவ்வொரு client-உம் துண்டிக்கப்படும். endpoint இல்லாத காலச் சாளரத்தில் வரும் புதிய கோரிக்கைகள் OmniRoute JSON-க்குப் பதிலாக reverse-proxy **`502 Bad Gateway: Unknown error`**-ஐப் பெறும் — இதை provider தோல்வியிலிருந்து clients-ஆல் வேறுபடுத்த முடியாது (#11015). |
| `/healthz` பயன்படுத்தும் அதே event loop        | அதிகப் பணிச்சுமையுள்ள catalog அல்லது compression tick, probes-ஐத் தாமதப்படுத்தலாம்; குறுகிய timeout பின்னர் **ஒரே** பிரதியை மறுதொடக்கம் செய்துவிடும்.                                                                                                                                                                                                                                       |

**Probe அணி** ([Kubernetes probe பரிந்துரைகள்](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)-ஐயும் பார்க்கவும்):

| Probe                   | இலக்கு                                                               | பயன்படுத்த வேண்டாம்                                               |
| ----------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Liveness                | `PORT`-இல் TCP (இயல்புநிலை `20128`) அல்லது மென்மையான HTTP `/healthz` | `/api/monitoring/health`                                          |
| Readiness               | HTTP `GET /healthz`                                                  | event-loop பணிச்சுமையைச் செயலிழப்பாகக் கருதும் இறுக்கமான timeouts |
| ஆழமான சோதனை / மனிதர்கள் | `/api/monitoring/health`                                             | தானியக்க kubelet liveness                                         |

**மேம்படுத்தல்கள்:** ஒவ்வொரு அமர்வும் துண்டிக்கப்படும் என எதிர்பார்க்கவும். முடிந்தால் clients-ஐப் படிப்படியாக வெளியேற்றவும்; இயல்புநிலை SQLite-இல் rolling update இல்லை. Compose `restart: unless-stopped` மற்றும் Docker `HEALTHCHECK` ஆகியவையும் container Unhealthy ஆகும்போது ஒரே செயல்முறையை மாற்றிவிடும் — பாதிப்பின் பரப்பளவும் அதேதான்.

**ஒற்றைப் பிரதிக்கான** Kubernetes துணுக்கு (Recreate கட்டாயம்; ஒரே SQLite கோப்பைப் பயன்படுத்தும்போது `replicas` எண்ணிக்கையை உயர்த்த வேண்டாம்):

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

`preStop` sleep, SIGTERM-க்கு முன் kube-ஆல் Service endpoints-ஐ அகற்ற அனுமதிக்கிறது; எனவே **புதிய** போக்குவரத்து முடிவடையும் செயல்முறையை அடைவது நிறுத்தப்படுகிறது. செயல்பாட்டிலுள்ள `/v1/responses` SSE, heavyweight admission leases (#11015) வழியாக `SHUTDOWN_TIMEOUT_MS` (இயல்புநிலை 30s) வரை வெளியேற்றப்படுகிறது. செயல்முறையை இன்னும் அடையும் புதிய கோரிக்கைகள் `503` + `Retry-After: 5`-ஐப் பெறும். மாற்றுப் பிரதி Ready ஆகும்வரை நீடிக்கும் Recreate empty-endpoint இடைவெளி முழுமையான செயலிழப்பாகவே இருக்கும் — அது SQLite topology-இன் தன்மை; probe தவறான கட்டமைப்பு அல்ல.

வெளிப்புற Postgres / multi-writer HA என்பது ஆவணப்படுத்தப்பட்ட வழக்கமான பாதை **அல்ல**. உங்களுக்கு HA தேவைப்பட்டால், ஒற்றைப் பிரதியை வைத்திருங்கள் அல்லது திட்டம் தனியாகச் சோதித்து ஆவணப்படுத்திய topology-ஐ இயக்குங்கள். Postgres/MySQL பணிகள் [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-இல் உள்ளன. அது வெளியிடப்படும் வரை, **பெரிய** `/v1/responses` திறனைப் பெருக்குவதற்கான ஒரே ஆதரிக்கப்பட்ட வழி N தனித்தனி செயல்முறைகள் (அடுத்த பகுதி) மட்டுமே; ஒரே volume-இல் `replicas > 1` அல்ல.

## கிடைமட்ட அளவாக்கம்: N சுயாதீன செயல்முறைகள்

ஒரு Node செயல்முறை என்பது **ஒரு V8 heap** ஆகும். ஒன்றுடன் ஒன்று மேற்பொருந்தும் ~3 MiB / ~750k-token coding-agent `POST /v1/responses` கோரிக்கைகள் இரண்டு (RTK + Caveman), அந்த heap-ஐ ~12 Gi அளவில் (`FATAL ERROR: Reached heap limit`) நிறுத்திவிடுகின்றன; மேலும் 16 Gi cgroup-இல் OOM ஏற்படுத்தக்கூடும். [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)-ஐப் பார்க்கவும். இந்த அளவீடு ஒரு **நினைவக-ஒதுக்கீட்டு** எச்சரிக்கையே அன்றி, ஒரே நேரத்தில் இயங்கக்கூடிய நீண்ட `/v1/responses` கோரிக்கைகளுக்கான தயாரிப்பின் கடினமான அதிகபட்ச வரம்பு இரண்டு என்பதல்ல. அதிக வளம் தேவைப்படும் chat அனுமதி, அதே V8/cgroup உச்சவரம்பிலிருந்து தானாகப் பெறப்பட்ட ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) மூலம் கட்டுப்படுத்தப்படுகிறது — ஏற்கெனவே அளவிடப்பட்ட செயல்முறையில் அதை மேல்நோக்கி override செய்வது (அல்லது பழைய `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap-ஐ அமைப்பது) மீண்டும் செயல்முறை நிறுத்தத்தை ஏற்படுத்தும். சிறிய chat-கள், `/healthz`, `/v1/models`, மற்றும் MCP ஆகியவை அந்த cap-க்குள் **இல்லை**.

### ஒற்றைச் செயல்முறை: இரண்டுக்கும் மேற்பட்ட நீண்ட `/v1/responses`

ஒரு **ஆரோக்கியமான** செயல்முறை (heap, `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-ஐவிடக் குறைவாக இருக்கும்; இயல்புநிலை `0.75`) செயல்முறை முழுவதற்குமான inflight-byte budget-இல் (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) இன்னும் இடம் இருந்தால், ஒரே நேரத்தில் இரண்டுக்கும் மேற்பட்ட நீண்ட `POST /v1/responses` கோரிக்கைகளை இயக்க **முடியும்**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` அளவிற்கு அல்லது அதற்கு மேல் உள்ள body-கள் (இயல்புநிலை 256 KiB), அதிக கட்டமைப்பைக் கொண்ட கோரிக்கைகளைப் போலவே அதே heavyweight lease-ஐப் பெற்று, அதே [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` தப்புவழியைப் (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) பயன்படுத்துகின்றன. ஒரே நேரத்தில் இயங்கும் பல பத்து நீண்ட SSE client-கள் (operator-களுக்கு பெரும்பாலும் 40–50 தேவைப்படும்) என்பது ஒரு **நினைவக-ஒதுக்கீட்டு** கேள்வி — heap + primary/headroom slot-கள் + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ஆகியவற்றைச் சரியான அளவில் அமைக்க வேண்டும் — இது தயாரிப்பின் கடினமான “அதிகபட்சம் 2” வரம்பு அல்ல. அழுத்தத்திலுள்ள heap இன்னும் மீண்டும் முயற்சிக்கக்கூடிய `503` உடன் சுமையைக் குறைக்கும்; எனவே #7849 மீண்டும் ஏற்படாது.

**heap-களைப் பெருக்க** (சுயாதீன V8 old-space-கள்) **தற்போது**:

| செய்ய வேண்டியது                                                                                                                                                                | செய்யக்கூடாதது                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **N container/pod-களை**, ஒவ்வொன்றுக்கும் அதற்கெனத் தனியான `DATA_DIR` / volume உடன் இயக்கவும்                                                                                   | ஒரே SQLite file-ஐப் பயன்படுத்தி `replicas > 1` அமைக்க வேண்டாம்                            |
| heap / inflight-byte budget அடிப்படையில் heavy in-flight + healthy-headroom-ஐ அளவிடவும்; 1–2 என்பது பாதுகாப்பான #7849 இயல்புநிலையே அன்றி தயாரிப்பின் கடினமான அதிகபட்ச வரம்பல்ல | ஒரு செயல்முறைக்கு 8× RAM மற்றும் வரம்பற்ற count cap வழங்க வேண்டாம்                        |
| விருப்பத்திற்குரியது: **பகிரப்பட்ட quota counter-களுக்காக** `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                               | Redis-ஐ பகிரப்பட்ட SQLite எனக் கருத வேண்டாம் — அது அப்படியல்ல                             |
| provider secret-களை ஒவ்வொரு instance-இலும் நகலெடுக்கவும் (அல்லது பிரிக்கப்பட்ட dashboard-களை ஏற்கவும்)                                                                         | instance-கள் அனைத்திலும் ஒரே dashboard / ஒரே call-log கிடைக்கும் என எதிர்பார்க்க வேண்டாம் |
| எந்த load balancer-ஐயும் முன்புறத்தில் பயன்படுத்தலாம்; API key அல்லது session அடிப்படையிலான sticky routing போதுமானது                                                           | vendor-க்கே உரிய size-aware middleware அவசியம் எனக் கருத வேண்டாம்                         |

வன்பொருள்: ஒவ்வொரு instance-இலும் ஒரே நேரத்தில் இயங்கக்கூடிய நீண்ட `/v1/responses` எண்ணிக்கை என்பது ஒரு **நினைவக-ஒதுக்கீட்டு** கேள்வி (heap + inflight-byte / #10110). `N` சுயாதீன `DATA_DIR`-கள் இன்னும் heap-களைப் பெருக்குகின்றன: host RAM ஆனது `N × cgroup`-ஐத் தாங்க வேண்டும்; “N=8 கொண்ட ஒரு 16 Gi pod” அல்ல. ஒரே SQLite file-இல் ஒருபோதும் `replicas > 1` அமைக்க வேண்டாம்.

Compose மாதிரி (இரண்டு heap-கள், இரண்டு volume-கள் — `deploy.replicas: 2` அல்ல):

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

செயல்முறைக்குள் அடர்த்தி அதிகரிப்பு (HTTP isolate-க்கு வெளியே compression) என்பது [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). பகிரப்பட்ட நீடித்த state-இல் ஒரு logical cluster என்பது [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## முக்கிய குறிப்புகள்

- **SQLite WAL பயன்முறை:** சமீபத்திய மாற்றங்களை `storage.sqlite`-க்கு OmniRoute checkpoint செய்யும் வகையில், `docker stop` முழுமையாக முடிவடைய அனுமதிக்க வேண்டும். தொகுப்பில் உள்ள Compose கோப்புகளில் ஏற்கனவே 40 வினாடிகள் stop grace period அமைக்கப்பட்டுள்ளது. image-ஐ நேரடியாக இயக்கினால், `--stop-timeout 40`-ஐத் தொடர்ந்து பயன்படுத்தவும்.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** வழக்கமான/எழுதுவதற்கு முந்தைய காப்புப்பிரதிகள் வெளிப்புறமாக நிர்வகிக்கப்பட்டால், இதை `true` என அமைக்கவும். ஏற்கனவே உள்ள database migration-களுக்கு, அவற்றுக்கென நீடித்த பாதுகாப்பு snapshot மற்றும் பெருமளவு migration பாதுகாப்பு இன்னும் தேவைப்படும்.
- **தரவு நிலைத்தன்மை:** container மறுதொடக்கங்களுக்குப் பிறகும் உங்கள் database, key-கள் மற்றும் configuration-களைத் தக்கவைக்க, எப்போதும் `/app/data`-க்கு ஒரு volume-ஐ mount செய்யவும்.
- **Port உள்ளமைவு:** இயல்புநிலை `20128` port-ஐ மாற்ற, `PORT` environment variable-ஐ override செய்யவும்.

## மேலும் காண்க

- [VM Deployment வழிகாட்டி](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare அமைப்பு
- [Fly.io Deployment வழிகாட்டி](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-க்கு deploy செய்யவும்
- [Environment உள்ளமைவு](../reference/ENVIRONMENT.md) — முழுமையான `.env` reference
