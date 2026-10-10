# 🐳 Docker Guide — OmniRoute (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> முழுமையான Docker நிறுவல் குறிப்பு. விரைவாகத் தொடங்க, [README Docker பகுதியைப்](../README.md#-docker) பார்க்கவும்.

## உள்ளடக்க அட்டவணை

- [விரைவான இயக்கம்](#quick-run)
- [சூழல் கோப்புடன்](#with-environment-file)
- [Docker Compose](#docker-compose)
- [கிடைக்கக்கூடிய சுயவிவரங்கள்](#available-profiles)
- [OmniRoute Docker-இல் இயங்கும்போது ஹோஸ்ட் CLI கருவிகளை உள்ளமைத்தல்](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [உற்பத்திச் சூழலுக்கான Compose](#production-compose)
- [Dockerfile நிலைகள்](#dockerfile-stages)
- [முக்கியமான சூழல் மாறிகள்](#critical-environment-variables)
- [Caddy (HTTPS) உடனான Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare விரைவுச் சுரங்கம்](#cloudflare-quick-tunnel)
- [இமேஜ் குறிச்சொற்கள்](#image-tags)
- [கிடைக்கும் தன்மை: இயல்புநிலை SQLite ஒற்றைப் பிரதியை மட்டுமே ஆதரிக்கிறது](#availability-default-sqlite-is-single-replica)
- [Docker-க்குள் Gemini பிராந்தியப் பிழைகள்](#gemini-regional-errors-inside-docker)
- [முக்கியக் குறிப்புகள்](#important-notes)

---

## விரைவான இயக்கம்

> **ஒரே கட்டளையில் சுயமாக ஹோஸ்ட் செய்ய வேண்டுமா?**
> [சுய-ஹோஸ்ட் வழிகாட்டியைப்](../getting-started/SELF_HOST_GUIDE.md) பார்க்கவும் —
> `docker compose -f docker-compose.selfhost.yml up -d` (வெளியிடப்பட்ட இமேஜ் +
> Redis, loopback மட்டும், சுயவிவரத் தேர்வு இல்லை). கீழேயுள்ள விரைவான இயக்கம்,
> ஏற்கெனவே வேறொரு இடத்தில் Redis-ஐ இயக்கும் பயனர்களுக்கான
> ஒற்றைக் கண்டெய்னர் வழிமுறையாகும்.

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
# அடிப்படைச் சுயவிவரம் (CLI கருவிகள் இல்லை)
docker compose --profile base up -d

# CLI சுயவிவரம் (Claude Code, Codex, OpenClaw உள்ளமைக்கப்பட்டுள்ளன)
docker compose --profile cli up -d

# ஹோஸ்ட் சுயவிவரம் (முதன்மையாக Linux-க்கானது; ஹோஸ்ட் CLI பைனரிகளை படிக்க-மட்டும் முறையில் மவுண்ட் செய்கிறது)
docker compose --profile host up -d

# வலைச் சுயவிவரம் (வலை அமர்வு வழங்குநர்களுக்கான Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecar-ஐ இணைக்கவும்
docker compose --profile cli --profile cliproxyapi up -d
```

## கிடைக்கக்கூடிய சுயவிவரங்கள்

முக்கிய நிறுவல் வடிவங்களுக்கான Compose சுயவிவரங்களுடன் OmniRoute வழங்கப்படுகிறது. உங்கள் சூழலுக்குப் பொருந்தும் ஒன்றைத் தேர்ந்தெடுக்கவும்.

| சுயவிவரம்           | சேவை             | எப்போது பயன்படுத்த வேண்டும்                                                                                                                                                | கட்டளை                                       |
| ------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (இயல்புநிலை) | `omniroute-base` | Headless சேவையகம் / குறைந்தபட்ச இயக்கச் சூழல்; வழங்குநர் CLI-கள் எதுவும் தொகுக்கப்படவில்லை                                                                                 | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | `omniroute providers/setup/doctor` மற்றும் தொகுக்கப்பட்ட CLI-களை (Codex, Claude Code, Droid, OpenClaw) அழைக்கும் முகவர் சார்ந்த பணிப்பாய்வுகள்                             | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` போன்றவற்றை படிக்க-மட்டும் முறையில் மவுண்ட் செய்து, ஹோஸ்ட் CLI-களுக்கு `network_mode` போன்ற அணுகலைப் பெற விரும்பும் Linux ஹோஸ்ட்கள் | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | மேல் நிலை CLI ப்ராக்ஸிக்காக [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar-ஐ `8317` போர்ட்டில் இயக்கவும்                                              | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | உலாவி தேவைப்படும் வலை அமர்வு வழங்குநர்கள்: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web`-ஐ உருவாக்குகிறது; Chromium சேர்க்கப்பட்டுள்ளது)                    | `docker compose --profile web up -d`         |

> பல சுயவிவரங்களை இணைக்கலாம்: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker-இல் இயங்கும்போது host CLI கருவிகளை உள்ளமைத்தல்

`omniroute setup-codex`, `setup-claude`, `config set <tool>` மற்றும் dashboard-இன்
**உள்ளமைவைச் சேமி** பொத்தான் ஆகிய அனைத்தும் `~/.codex/*.config.toml` போன்ற கோப்புகளை எழுதுகின்றன. CLI உண்மையில் இயங்கும் கணினியில் மட்டுமே
அந்தப் பாதைகளுக்குப் பொருள் உண்டு. அவற்றைக் container-க்குள் இயக்கினால்,
எழுதப்படும் கோப்பு container-இன் சொந்த home (`/home/node` —
image `USER node` ஆக இயங்குகிறது) அடைவில் சேமிக்கப்படும்; எந்த host CLI-யும் அதை ஒருபோதும் படிக்காது, மேலும் container மீண்டும் உருவாக்கப்பட்டவுடன்
அது நீக்கப்படும்.

OmniRoute இதைக் கண்டறிந்து, நீங்கள் பயன்படுத்த முடியாத வெற்றியைத்
தெரிவிப்பதற்குப் பதிலாக வழிமுறைகளுடன் எழுதுவதை மறுக்கிறது: CLI `2` என்ற வெளியேற்றக் குறியீட்டுடன் முடிவடைகிறது, மேலும் API `422`
மற்றும் `containerEphemeralTarget: true` உடன் பதிலளிக்கிறது.

### பரிந்துரைக்கப்படுவது: CLI-ஐ host-இலும், OmniRoute-ஐ Docker-இலும் இயக்கவும்

Container API-ஐ வழங்குகிறது; CLI உங்கள் host கருவிகளை உள்ளமைக்கிறது.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI-ஐ container-ஐ நோக்கச் செய்யவும்
omniroute setup-codex                      # உங்கள் host-இல் உண்மையான ~/.codex அடைவில் எழுதுகிறது
```

Codex, Claude Code, Cursor அல்லது இதுபோன்றவை உங்கள்
laptop-இல் இயங்கும்போது இதுவே சரியான தேர்வு — இதுவே வழக்கமான அமைப்பாகும்.

### மாற்று வழி: host config அடைவுகளை bind-mount செய்யவும் (`host` profile)

Container தானாகவே உங்கள் host config-ஐ எழுத வேண்டுமெனில்,
அடைவுகளை mount செய்து, mount root-ஐ நோக்குமாறு `CLI_CONFIG_HOME`-ஐ அமைக்கவும். `host` profile
ஏற்கெனவே இதைச் செய்கிறது:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount இருப்பதால்தான் அந்தப் பாதையை நம்ப முடிகிறது: OmniRoute
`/proc/self/mountinfo`-ஐப் படித்து, mount செய்யப்பட்ட பாதைகளிலும் (மேலும் அவற்றின்
குழந்தை அடைவுகள் mount செய்யப்பட்டுள்ள அடைவுகளிலும்—மேலே உள்ள `/host-home` அமைப்பு துல்லியமாக இதுதான்) எழுத அனுமதிக்கிறது; அதே நேரத்தில்
mount செய்யப்படாத பாதைகளில் எழுதுவதைத் தொடர்ந்து மறுக்கிறது.

### அவசர மாற்றுவழி: container-இன் சொந்த CLI-களை உள்ளமைக்கவும் (அளவோடு பயன்படுத்தவும்)

CLI-கள் உண்மையிலேயே container-க்குள் இருக்கும் போது (`cli` profile), எழுதுவது
வேண்டுமென்றே செய்யப்படும் செயலாகும். எந்த `setup-*` command-க்கும் `--allow-container-write`-ஐ அனுப்பவும் அல்லது server-க்காக
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`-ஐ அமைக்கவும். அந்த எழுத்து container-ஐத் தாண்டி
நிலைத்திருக்காது என்ற எச்சரிக்கையுடன் செயல்பாடு தொடரும்.

> **பாதுகாப்பு எச்சரிக்கை — `cli` profile + `docker.sock` mount.**
> Container-க்குள் உள்ள auto-updater, host daemon-இலிருந்து stack-ஐ மீண்டும் உருவாக்குவதற்காக, `cli` profile
> `/var/run/docker.sock`-ஐ bind-mount செய்கிறது
> (`src/lib/system/autoUpdate.ts` அந்த socket இருக்கிறதா எனச் சோதித்து, அது
> இல்லாதபோது Docker பாதையைத் தவிர்க்கிறது). அந்த socket என்பது **host root அதிகாரத்திற்கான நம்பிக்கை
> எல்லை**: அதை அணுகக்கூடிய எதுவும் host Docker daemon-ஐ
> root ஆக இயக்க முடியும் — host-இல் உள்ள எந்த container-ஐயும் உருவாக்க, ஆய்வு செய்ய, நிறுத்த மற்றும் நீக்க முடியும்.
> இதன் விளைவுகள்:
>
> 1. **`cli` profile-இன் port-ஐ ஒருபோதும் network-க்கு வெளிப்படுத்த வேண்டாம்.**
>    அதை `127.0.0.1`-இல் publish செய்யவும் (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN வழியாக அணுகக்கூடிய `cli` profile, dashboard மட்டத்திலான எந்த RCE-யையும்
>    host முழுவதையும் கைப்பற்றக்கூடிய தாக்குதலாக மாற்றும்.
> 2. **`cli` profile-க்குள் கூடுதல் host அடைவுகள் எதையும் bind செய்ய வேண்டாம்.**
>    Docker socket உடன் வேறு எந்த mount-ஐயும் சேர்ப்பது, container-க்கு உங்கள் filesystem மற்றும் host config மீது முழுமையான
>    படிக்க/எழுதும் அணுகலை வழங்கும். ஒரு கருவி
>    project-ஐ அணுக வேண்டுமெனில், CLI binary-ஐப் பயன்படுத்தி அதை உள்ளூரில் இயக்கவும் — அதை
>    `cli` container-க்குள் mount செய்ய வேண்டாம்.
>
> Container-க்குள் auto-update தேவையில்லை எனில், `cli` profile-ஐ இயக்காமல் விடவும்
> (`COMPOSE_PROFILES=core,redis` அல்லது அதைவிடச் சுருக்கமாக). மற்ற profile-கள்
> Docker socket-ஐ mount செய்வதில்லை.
>
> MITM தொடர்பான threat model-க்கு `docs/security/MITM-TPROXY-DECRYPT.md`-ஐப் பார்க்கவும் (git-இல் உள்ளது; `/docs`-க்குள் தொகுக்கப்படவில்லை);
> மேலும் `codex`/`claude-code`/`droid`/`openclaw` binary-களின் மூலத் தடச் சங்கிலிக்கு
> `docs/security/SUPPLY_CHAIN.md`-ஐப் பார்க்கவும்.

## Redis சைட்கார்

விநியோகிக்கப்பட்ட வீத வரம்பியையும் பகிரப்பட்ட தற்காலிகச் சேமிப்பையும் ஆதரிக்க OmniRoute, Redis-ஐச் சார்ந்துள்ளது. `docker-compose.yml`-இல் `redis` சேவை **எப்போதும் வரையறுக்கப்பட்டிருக்கும்** (அதற்கு சுயவிவரக் கட்டுப்பாடு இல்லை); மேலும், அது வேறு எந்தச் சுயவிவரத்துடனும் சேர்ந்து தொடங்கும்.

| விவரம்                     | மதிப்பு                                    |
| -------------------------- | ------------------------------------------ |
| இமேஜ்                      | `redis:7-alpine`                           |
| கண்டெய்னர் பெயர்           | `omniroute-redis`                          |
| உள் போர்ட்                 | `6379`                                     |
| ஹோஸ்ட் போர்ட் (மாற்றீடு)   | `REDIS_PORT` (இயல்புநிலை `6379`)           |
| ஹோஸ்ட் பிணைப்பு (மாற்றீடு) | `REDIS_BIND_HOST` (இயல்புநிலை `127.0.0.1`) |
| வால்யூம்                   | `omniroute-redis-data` → `/data`           |
| ஆரோக்கியச் சரிபார்ப்பு     | `redis-cli ping` (10 வினாடி இடைவெளி)       |

தொடர்புடைய சூழல் மாறிகள்:

- `REDIS_URL` — செயலியில் செலுத்தப்படும் இணைப்புச் சரம் (இயல்புநிலையாக `redis://redis:6379`).
- `REDIS_PORT` — Redis கண்டெய்னருக்கான ஹோஸ்ட்-பக்க போர்ட் மேப்பிங்.
- `REDIS_BIND_HOST` — போர்ட் வெளியிடப்படும் ஹோஸ்ட் இடைமுகம். இயல்புநிலை `127.0.0.1`.

> **இயல்புநிலையாக loopback ஏன்:** சைட்கார் `requirepass` இல்லாமல் இயங்குகிறது; மேலும், செயலி
> கண்டெய்னர்கள் compose நெட்வொர்க் (`redis:6379`) வழியாக அதை அணுகுகின்றன — வெளியிடப்பட்ட போர்ட்
> ஹோஸ்ட்-பக்கக் கருவிகளுக்காக மட்டுமே உள்ளது (`redis-cli`, உள்ளூர் `npm run dev`). `0.0.0.0`-இல்
> வெளியிடுவது, அங்கீகாரம் இல்லாத Redis-ஐ உங்கள் LAN-இல் உள்ள ஒவ்வொரு ஹோஸ்டிற்கும் வெளிப்படுத்தும்.
> நீங்கள் `REDIS_BIND_HOST=0.0.0.0` என அமைத்தால், சேவையின் `command:`-இல் `--requirepass`-ஐயும் சேர்க்கவும்.

**Redis-ஐ முடக்குவது** பரிந்துரைக்கப்படவில்லை (வீத வரம்பி நினைவகத்திலுள்ள மாற்று முறைக்குத் தரம் குறையும்). கட்டாயமாகச் செய்ய வேண்டுமெனில், `docker-compose.yml`-இலுள்ள `redis:` சேவைத் தொகுதியை அகற்றவும்/கருத்துரையாக்கவும் அல்லது அதை பூஜ்ஜியமாக அளவிடவும்:

```bash
docker compose up -d --scale redis=0
```

## உற்பத்தி Compose

மேம்பாட்டுச் சூழலுடன் இணையாக இயங்கும் தனிமைப்படுத்தப்பட்ட உற்பத்தி ஸ்னாப்ஷாட்டிற்கு, `docker-compose.prod.yml`-ஐப் பயன்படுத்தவும்.

| விவரம்                       | மதிப்பு                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| கோப்பு                       | `docker-compose.prod.yml`                                                                                           |
| இயல்புநிலை டாஷ்போர்டு போர்ட் | `PROD_DASHBOARD_PORT=20130` (உள் `${DASHBOARD_PORT:-20128}`-க்கு மேப் செய்யப்படுகிறது)                              |
| இயல்புநிலை API போர்ட்        | `PROD_API_PORT=20131`                                                                                               |
| இமேஜ்                        | `omniroute:prod` (`runner-cli` இலக்கிலிருந்து உருவாக்கப்பட்டது)                                                     |
| Redis கண்டெய்னர்             | `omniroute-redis-prod` (`redis:8.6.2`, பிரத்யேக `redis-prod-data` வால்யூம்)                                         |
| தரவு வால்யூம்                | `omniroute-prod-data` (பெயரிடப்பட்டது, மறுஉருவாக்கங்களுக்கிடையே நிலைத்திருக்கும்)                                   |
| ஆரோக்கியச் சரிபார்ப்புகள்    | `node healthcheck.mjs` + `redis-cli ping`, Redis ஆரோக்கியத்தின் அடிப்படையில் கட்டுப்படுத்தப்படும் `depends_on` உடன் |

பயன்படுத்தும் முறை:

```bash
# உற்பத்தி ஸ்டாக்கை உருவாக்கித் தொடங்கவும்
docker compose -f docker-compose.prod.yml up -d --build

# பதிவுகளைத் தொடர்ச்சியாகக் காண்பிக்கவும்
docker compose -f docker-compose.prod.yml logs -f

# நிறுத்தி அகற்றவும் (வால்யூம்களை வைத்திருக்கவும்)
docker compose -f docker-compose.prod.yml down
```

உற்பத்தி ஸ்டாக், மேம்பாட்டு compose-உடன் இணையாக இயங்குகிறது (வேறுபட்ட கண்டெய்னர் பெயர்கள், போர்ட்கள் மற்றும் வால்யூம்கள்); எனவே உற்பத்திச் சூழல் தொடர்ந்து இயங்கிக்கொண்டிருக்கும்போது, உள்ளூரில் நீங்கள் தொடர்ந்து மேம்பாடுகளைச் செய்யலாம்.

## Dockerfile நிலைகள்

இந்த repository பல நிலைகளைக் கொண்ட Dockerfile-ஐ (`Dockerfile`) வழங்குகிறது. நான்கு நிலைகள் கிடைக்கின்றன; உங்கள் பயன்பாட்டிற்கு ஏற்ற `target`-ஐத் தேர்ந்தெடுக்கவும்.

| நிலை          | அடிப்படை image        | நோக்கம்                                                                                                                                                                                                                                                                                                                                           |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | சார்புகளை நிறுவி (`npm ci --legacy-peer-deps`), `npm run build`-ஐ இயக்குகிறது (இயல்பாக Turbopack — கீழேயுள்ள உருவாக்க நேர வளங்களைப் பார்க்கவும்)                                                                                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone வெளியீட்டைக் கொண்ட production runtime. **Provider CLI-கள் எதுவும் சேர்க்கப்படவில்லை.**                                                                                                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` மற்றும் global CLI-களைச் சேர்க்கிறது: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agentic workflow-களுக்கு இதைத் தேர்ந்தெடுக்கவும்.**                                                                                                                                               |
| `runner-web`  | `runner-base`         | Web-session provider-களுக்காக Playwright + Chromium browser (`--with-deps`) ஆகியவற்றைச் சேர்க்கிறது: `gemini-web`, `claude-web`, `claude-turnstile`. **இந்த provider-களைப் பயன்படுத்தும்போது இதைத் தேர்ந்தெடுக்கவும்** — இது இல்லாமல் சாதாரண image கோரிக்கை நேரத்தில் தோல்வியடையும் (Release Channels-இன் கீழுள்ள `-web` குறிப்பைப் பார்க்கவும்). |

குறிப்பிட்ட target-ஐக் கைமுறையாக உருவாக்க:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### உருவாக்க நேர வளங்கள்

`builder` நிலையின் வளச் செலவைக் கட்டுப்படுத்த மூன்று build arg-கள் உள்ளன. இவை உருவாக்க நேரத்திற்கு மட்டும் பொருந்தும் —
`OMNIROUTE_MEMORY_MB` (கீழே) என்பது தனியான runtime அமைப்பாகும்.

| Build arg                   | இயல்புநிலை | விளைவு                                                                                                          |
| --------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0` webpack மூலம் உருவாக்கும்: உச்ச நினைவகப் பயன்பாடு குறைவு, ஆனால் மெதுவானது. `1` Turbopack-ஐப் பயன்படுத்தும். |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | தொடங்கப்படும் `next build`-க்கான V8 heap உச்சவரம்பு (`--max-old-space-size`).                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL`-க்கு மதிப்பளிக்கிறது; page-data சேகரிப்பிற்காக Next, `workers = N - 1` எனக் கணக்கிடுகிறது.  |

பெரிய builder-இல் அதிகரிக்க வேண்டியதும், வரம்பான வளங்களைக் கொண்ட build ஒன்று `✓ Compiled successfully` என்பதற்குப் **பிறகு** செயலிழக்கும்போது சந்தேகிக்க வேண்டியதும் `OMNIROUTE_BUILD_WORKERS` ஆகும். ஒவ்வொரு
page-data worker-உம் தனித்தனி process ஆகும்; முதன்மை `next build`-உம் தனி process ஆகும்;
நேரடி VPS மறுஉருவாக்கத்தில் (issue #7518), `NODE_OPTIONS` heap flag-ஐச் சாராமல் ஒவ்வொரு process-இன் உச்ச RSS
~4.5 GB என அளவிடப்பட்டது (Turbopack, V8 heap-க்கு வெளியேயுள்ள
native/Rust நினைவகத்தில் compile செய்கிறது). இயல்புநிலையான `2` (→ 1 worker, மொத்தம் 2
process-கள்) என்பது publish pipeline பயன்படுத்தும் 16 GB / 4 vCPU GitHub-hosted runner-களுக்கேற்ப
அமைக்கப்பட்டுள்ளது. `8`-இல் (→ 7 worker-கள்), அந்த runner-க்கு நினைவகம் தீர்ந்தது; மேலும்
buildkit, `ResourceExhausted: ... cannot allocate memory` எனும் பிழையுடன் அந்தப் படியைத் தோல்வியடையச் செய்தது;
ஒவ்வொரு process-க்குமான RSS ஊகிக்கப்படாமல் நேரடியாக அளவிடப்பட்டபோது,
`3` (→ 2 worker-கள்) கூட பொருந்தவில்லை. `tests/unit/docker-build-memory-budget.test.ts`
அளவிடப்பட்ட மதிப்பைப் பயன்படுத்திக் கணக்கீடு செய்து, ஏதேனும் ஒரு அமைப்பு
runner-இன் வரம்பை மீறினால் தோல்வியடைகிறது.

Turbopack, V8 heap-க்கு **வெளியே** இருக்கும் native Rust நினைவகத்தில் compile செய்வதால்,
`OMNIROUTE_BUILD_MEMORY_MB` அதைக் கட்டுப்படுத்தாது. நினைவக உச்சவரம்புள்ள host-இல்,
OOM killer எந்தப் பிழைச் செய்தியும் இல்லாமல் build-ஐ SIGKILL செய்கிறது — அது
`Creating an optimized production build` என்பதன் நடுவில் வெறுமனே நின்றுவிடுகிறது; ஆகவே இது
நினைவகம் தீர்ந்ததுபோல் அல்லாமல் செயல்பாடு சிக்கிக்கொண்டதுபோல் தோன்றுகிறது.
அதனால்தான் `npm run dev` / `npm run build` ஆகியவற்றில் Turbopack code இயல்புநிலையாக இருந்தாலும்,
`Dockerfile` இயல்பாக webpack-ஐப் பயன்படுத்துகிறது (`OMNIROUTE_USE_TURBOPACK=0`):
எந்த build arg-களும் இல்லாத ஒரு சாதாரண `docker build .` (Railway மற்றும் பிற one-click host-கள் இயக்குவது)
நினைவக வரம்புள்ள builder-இல் எந்தச் செய்தியுமின்றி செயலிழக்கக் கூடாது.
வெளியிடப்பட்ட image-கள் ஏற்கெனவே `docker-publish.yml`-இல்
`OMNIROUTE_USE_TURBOPACK=0`-ஐ வெளிப்படையாக வழங்குகின்றன. போதுமான RAM கொண்ட builder-இல்,
விரைவான build-க்காக Turbopack-ஐத் தேர்ந்தெடுக்கவும்:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` இயக்கப்பட்டுள்ளதால், `next build` ஒரு முதன்மை process-ஐயும் ஒரு worker
process-ஐயும் இயக்குகிறது; ஒவ்வொன்றும் தனித்தனியாக `OMNIROUTE_BUILD_MEMORY_MB`-ஐப் பின்பற்றும். Container
உச்சவரம்பை அந்த மதிப்பின் சுமார் இரு மடங்கிற்கும் மேலாக அமைக்கவும்; ஒரு மடங்காக அல்ல.

இந்த tree-இல் அளவிடப்பட்டது (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container உச்சவரம்பு | முடிவு                                         |
| --------- | -------------------- | ---------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | இரண்டிலும் எந்தச் செய்தியுமின்றி OOM-killed    |
| webpack   | 8 GiB                | build worker SIGKILL செய்யப்பட்டது             |
| webpack   | 12 GiB               | வெற்றிபெற்றது; உச்சமாக 11.1 GiB பயன்படுத்தியது |

### Runtime இயல்புநிலைகள்

`runner-base` export செய்யும் இயல்புநிலைகள்: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker-இல் நினைவகச் செயல்பாடு:

- இந்த image `OMNIROUTE_MEMORY_MB=1024` என்பதை அமைத்து, அதிலிருந்து `NODE_OPTIONS=--max-old-space-size=1024` என்பதைப் பெறுகிறது.
- உண்மையான server process, standalone launcher மூலம் தொடங்கப்படுகிறது; அது `OMNIROUTE_MEMORY_MB` என்பதைப் படித்து `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` என்பதைச் சேர்க்கிறது.
- மீண்டும் மீண்டும் வழங்கப்படும் `--max-old-space-size` மதிப்புகளில் கடைசி மதிப்பை Node பயன்படுத்துகிறது; எனவே `OMNIROUTE_MEMORY_MB` என்பதை அமைப்பது செயல்பாட்டிலுள்ள Docker heap வரம்பைக் கட்டுப்படுத்துகிறது.
- image எப்போதும் அதை அமைப்பதால், launcher's RAM அடிப்படையிலான fallback Docker-இன் கீழ் ஒருபோதும் பயன்படுத்தப்படாது. பணிச்சுமைக்கு ஏற்ப அதை வெளிப்படையாக உயர்த்தவும் (கீழுள்ள அட்டவணையைப் பார்க்கவும்). coding-agent `/v1/responses`-க்கு `2048` இன்னும் மிகக் குறைவாகும்.

### Coding agent-களுக்கான இயக்கநேர RAM

1 GiB Docker இயல்புநிலை என்பது dashboard/இலகுவான chat-க்கான குறைந்தபட்ச அளவே தவிர, production அளவு அல்ல. நீண்ட `POST /v1/responses` body-கள் (நூற்றுக்கணக்கான messages, பத்துக்கணக்கான tools) compression-இன் போது பல in-memory graph-களைத் தக்கவைத்துக்கொள்கின்றன. ஒரே நேரத்தில் இயங்கிய, ஒவ்வொன்றும் சுமார் ~3 MiB / ~750k-token அளவுள்ள இரண்டு request-கள் **12 GiB** old-space-இல் V8-ஐ நிறுத்தியுள்ளன (`FATAL ERROR: Reached heap limit`); மேலும் 16 GiB cgroup OOM-ஐயும் எட்டியுள்ளன. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)-ஐப் பார்க்கவும்.

**heap-ஐ விட அதிகமாக cgroup `--memory` அளவை அமைக்கவும்** — native buffer-கள், SQLite மற்றும் compression இடைநிலைத் தரவுகள் V8-க்கு வெளியே இருக்கும்.

| பணிச்சுமை                                                     | `OMNIROUTE_MEMORY_MB`          | Container / cgroup                   | குறிப்புகள்                                                                                                                                           |
| ------------------------------------------------------------- | ------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, ஓர் இலகுவான chat                                   | `1024` (image இயல்புநிலை)      | ≥2 GiB                               |                                                                                                                                                       |
| ஒரு coding agent (Claude/Codex/Grok)                          | `8192`                         | ≥10 GiB                              | வழக்கமான ஒற்றை-session `/v1/responses`                                                                                                                |
| ஒரே நேரத்தில் இரண்டு நீண்ட `/v1/responses`                    | `10240`–`12288`                | ≥12–16 GiB                           | சுமார் 12 GiB heap-இல் V8 நிறுத்தம் அளவிடப்பட்டது                                                                                                     |
| ஒரே நேரத்தில் மூன்று அல்லது அதற்கு மேற்பட்ட நீண்ட context-கள் | ஒரே process-இல் இயக்க வேண்டாம் | தொடர்ச்சியாக இயக்கவும் / கூடுதல் RAM | இயல்புநிலையில் heavyweight admission-க்கு 1 in-flight மட்டுமே அனுமதிக்கப்படும்; RAM-ஐ அதிகரிக்காமல் இதை உயர்த்துவது நிறுத்தத்தை மீண்டும் ஏற்படுத்தும் |

bare metal-இல் `OMNIROUTE_MEMORY_MB` **அமைக்கப்படாதபோது**, `omniroute serve` RAM-இன் சுமார் 35%-ஐ (`[512, 4096]` வரம்புக்குள்) கணக்கிட்டு அமைக்கிறது. Docker எப்போதும் `1024` என்பதை அமைப்பதால், அதிகாரப்பூர்வ image-இல் அந்தக் கணக்கீடு ஒருபோதும் இயங்காது.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## முக்கியமான சூழல் மாறிகள்

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-இல் ஆவணப்படுத்தப்பட்டுள்ள இயல்புநிலைகளுக்கு அப்பால், Docker-இன் கீழ் இயக்கும்போது பின்வரும் மாறிகள் மிகவும் முக்கியமானவை:

| மாறி                          | நோக்கம்                                                                                                                                                                                                                                                                              | இயல்புநிலை                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket bridge-க்கான பகிரப்பட்ட ரகசியம். **உற்பத்திச் சூழலில் கட்டாயம்** — வலுவான சீரற்ற சரமாக அமைக்கவும்.                                                                                                                                                                         | அமைக்கப்படவில்லை (வழங்கப்பட வேண்டும்) |
| `REDIS_URL`                   | rate limiter / cache backend-க்கான இணைப்புச் சரம்                                                                                                                                                                                                                                    | `redis://redis:6379`                  |
| `REDIS_PORT`                  | தொகுப்பிலுள்ள Redis container-க்கான host-side port                                                                                                                                                                                                                                   | `6379`                                |
| `REDIS_BIND_HOST`             | தொகுப்பிலுள்ள Redis port வெளியிடப்படும் host interface (AUTH-ஐச் சேர்க்காவிட்டால் loopback)                                                                                                                                                                                          | `127.0.0.1`                           |
| `AUTO_UPDATE_HOST_REPO_DIR`   | self-update பணிப்பாய்வுகளுக்காக `cli` profile-இல் `/workspace/omniroute` என்ற இடத்தில் mount செய்யப்படும் host path                                                                                                                                                                  | `.` (தற்போதைய கோப்பகம்)               |
| `OMNIROUTE_MEMORY_MB`         | Docker standalone server-க்கான இயக்கநேர Node heap உச்சவரம்பு; மேலே உள்ள image இயல்புநிலையை மீறி அமைக்கும். Coding agents: `8192`+ ([இயக்கநேர RAM](#runtime-ram-for-coding-agents) பார்க்கவும்).                                                                                      | `1024`                                |
| `DASHBOARD_PORT` / `API_PORT` | dashboard (20128) மற்றும் API (20129)-க்காக வெளிப்படுத்தப்படும் ports-ஐ மாற்றியமைக்கிறது                                                                                                                                                                                             | `20128` / `20129`                     |
| `APP_BIND_HOST`               | docker-compose, dashboard/API/live-WS ports-ஐ வெளியிடும் host interface. `REQUIRE_API_KEY=false` (இயல்புநிலை) என இருக்கும்போது, `0.0.0.0` அநாமதேய `/v1` proxy-ஐ LAN-க்கு வெளிப்படுத்தும் — `REQUIRE_API_KEY=true` அல்லது முன்னால் ஒரு reverse proxy இருந்தால் மட்டுமே விரிவாக்கவும். | `127.0.0.1`                           |
| `CLIPROXY_BIND_HOST`          | docker-compose, `cliproxyapi` sidecar-ஐ வெளியிடும் host interface — அதன் data volume வழங்குநர் சான்றுகளை வைத்திருக்கும்.                                                                                                                                                             | `127.0.0.1`                           |
| `OMNIROUTE_PLUGINS_DIR`       | இயக்கநேர plugin scanner படித்து நிறுவும் கோப்பகம். plugins bind-mount செய்யப்பட்டிருக்கும்போது இதை அமைக்கவும்: இயல்புநிலை `HOME`-ஐப் பின்பற்றுகிறது; ஆனால் ஒரு image அதை export செய்ய வேண்டிய அவசியமில்லை.                                                                           | `~/.omniroute/plugins`                |
| `OMNIROUTE_BASE_PATH`         | செயலி reverse proxy-க்குப் பின்னால் வெளியிடப்படும்போது பயன்படுத்தப்படும் URL துணைப் பாதை (எ.கா. `/omniroute`)                                                                                                                                                                        | _(காலி = root)_                       |
| `NEXT_PUBLIC_BASE_URL`        | துணைப் பாதையையும் உள்ளடக்கிய பொதுப் browser origin (எ.கா. `https://host/omniroute`)                                                                                                                                                                                                  | அமைக்கப்படவில்லை                      |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`-க்கான host-side dashboard port                                                                                                                                                                                                                             | `20130`                               |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar-க்கான host-side port                                                                                                                                                                                                                                           | `8317`                                |

## துணைப் பாதையில் Reverse Proxy (Traefik / nginx)

Next.js `basePath`, standalone bundle-இல் தொகுக்கப்படுகிறது. செயலியின் மூலத்தில் உள்ள ஒரு sentinel கோப்பில், உட்பொதிக்கப்பட்ட மதிப்பை OmniRoute பதிவுசெய்கிறது (`npm run build` இயங்கும்போது எழுதப்படுகிறது; `scripts/docker/ensure-docker-base-path.mjs` மூலம் படிக்கப்படுகிறது); மேலும் container தொடங்கும்போது அதை `OMNIROUTE_BASE_PATH` உடன் ஒப்பிடுகிறது. அவை வேறுபட்டு, image domain root-க்காக உருவாக்கப்பட்டிருந்தால், `node dev/run-standalone.mjs` இயங்குவதற்கு முன் entrypoint ஆனது standalone manifests, உட்பொதிக்கப்பட்ட `basePath`/`assetPrefix` literals (Next 16, SSR asset URL-களை `assetPrefix`-இலிருந்து மட்டுமே உருவாக்குகிறது — patcher துணைப் பாதையையும் அதில் பிரதிபலிக்கிறது), உட்பொதிக்கப்பட்ட `/_next/static` asset URL-கள் (client-reference manifests, media imports, முன்கூட்டியே render செய்யப்பட்ட பிழைப் பக்கங்கள்) மற்றும் client `process.env` shim ஆகியவற்றை மீண்டும் எழுதுகிறது.

### Compose build (பரிந்துரைக்கப்படுகிறது)

`.env`-இல் இரு மாறிகளையும் அமைத்துவிட்டு, image மற்றும் runtime ஒன்றுக்கொன்று பொருந்துமாறு மீண்டும் build செய்யவும்:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`-ஐ Docker build-arg ஆகவும் runtime environment variable ஆகவும் அனுப்புகிறது.

### முன்கூட்டியே உருவாக்கப்பட்ட root image + runtime துணைப் பாதை

வெளியிடப்பட்ட `diegosouzapw/omniroute:*` images, domain root-க்காக உருவாக்கப்பட்டுள்ளன. இருப்பினும் runtime-இல் `OMNIROUTE_BASE_PATH`-ஐ அமைக்கலாம்; startup-இன்போது container bundle-ஐ ஒருமுறை patch செய்யும். அதற்குப் பொருந்தும் public origin-ஐயும் அமைக்கவும்:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

முழுமையான வெளிப்புறப் பாதையை அனுப்புமாறு reverse proxy-ஐ உள்ளமைக்கவும் (prefix-ஐ அகற்ற வேண்டாம்). `StripPrefix` இல்லாமல், Traefik ஆனது `PathPrefix(`/omniroute`)`-ஐ container-க்கு route செய்ய வேண்டும்; இதனால் Next.js, `/omniroute/...`-ஐப் பெற்று, `/omniroute/_next/...`-இலிருந்து assets-ஐ வழங்கும்.

Docker healthcheck, செயலில் உள்ள `OMNIROUTE_BASE_PATH` prefix சேர்க்கப்பட்ட இலகுரக `/healthz` lifecycle endpoint-ஐச் சோதிக்கிறது. மனிதர்கள்/dashboard மூலம் diagnostics செய்வதற்கு `/api/monitoring/health` தொடர்ந்து கிடைக்கும்; container HEALTHCHECK-ஐ மீண்டும் அதற்கு சுட்டிக்காட்ட (எடுத்துக்காட்டாக, ஆழமான health enforcement-க்காக), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` என அமைக்கவும். அந்தப் பாதை ஒரு **ஆழமான** சோதனை (DB + monitoring summary) — நீங்கள் அதை மீண்டும் தேர்வுசெய்தால் Docker-இன் அரிதாக இயங்கும் `HEALTHCHECK`-க்கு ஏற்றது; ஆனால் Kubernetes `livenessProbe` இடைவெளிகளுக்கு **ஏற்றதல்ல**.

Orchestrators-க்கு (Kubernetes, Nomad போன்றவை):

| Probe           | விரும்பத்தக்கது                                                             | தவிர்க்க வேண்டியது                                         |
| --------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, அல்லது முதன்மை port-இல் TCP (`PORT`, இயல்புநிலை `20128`) | liveness ஆக `/api/monitoring/health`                       |
| Readiness       | HTTP `GET /healthz`                                                         | event loop பரபரப்பை செயலிழப்பாகக் கருதும் குறுகிய timeouts |
| Deep / blackbox | `/api/monitoring/health`                                                    | —                                                          |

`/healthz`, process lifecycle நிலையை (`ok` / `starting` / `stopping`) தெரிவிக்கிறது. `/livez` என்பது process உயிருடன் உள்ளதா என்பதை மட்டும் சரிபார்க்கிறது (handler இயங்கக்கூடிய போதெல்லாம் 200; அது readiness-க்காகக் காத்திருக்காது). இரண்டும் request handling பயன்படுத்தும் அதே Node event loop-இல்தான் இயங்குகின்றன; எனவே CPU-bound catalog அல்லது compression பணிகள் அவற்றைத் தாமதப்படுத்தக்கூடும் — பரபரப்பு ≠ செயலிழப்பு. HTTP probes timeout ஆனால் TCP liveness-ஐ விரும்பவும். முழுமையான probe வழிகாட்டுதல்:
[Monitoring வழிகாட்டி — Kubernetes probe பரிந்துரைகள்](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy உடன் Docker Compose (HTTPS Auto-TLS)

Caddy-யின் தானியங்கி SSL வழங்கலைப் பயன்படுத்தி OmniRoute-ஐப் பாதுகாப்பாக வெளிப்படுத்தலாம். உங்கள் டொமைனின் DNS A பதிவு உங்கள் சர்வரின் IP முகவரியைச் சுட்டிக்காட்டுவதை உறுதிசெய்யவும்.

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
      # OAuth callback-கள், dashboard இணைப்புகள் மற்றும் உருவாக்கப்பட்ட பொது URL-களுக்கான browser-ஐ எதிர்கொள்ளும் origin.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # திட்டமிடப்பட்ட பணிகள் / self-fetch-களுக்கான அகச் server-to-server URL.
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

Upstream container-க்கான நிலையான forwarding header-களை Caddy அமைக்கிறது. OAuth callback-கள் மற்றும் உருவாக்கப்பட்ட பொது இணைப்புகளுக்கான canonical public origin ஆக
`NEXT_PUBLIC_BASE_URL`-ஐ OmniRoute பயன்படுத்துகிறது; அங்கீகரிக்கப்பட்ட dashboard write-கள் same-origin கோரிக்கைகளுடன் session-bound CSRF
பாதுகாப்பைப் பயன்படுத்துகின்றன. வெளிப்படையான configuration-க்குப் பதிலாக நம்பகமான forwarded header-களிலிருந்து public origin-ஐ OmniRoute பெற வேண்டுமென நீங்கள் திட்டமிட்டு விரும்பும் மேம்பட்ட deployment-களுக்கு மட்டும் `OMNIROUTE_TRUST_PROXY`-ஐச் செயல்படுத்தவும்.

## Cloudflare Quick Tunnel

Docker deployment-களுக்கான dashboard ஆதரவில் `Dashboard → Endpoints` என்பதில் ஒரே கிளிக்கில் பயன்படுத்தக்கூடிய **Cloudflare Quick Tunnel** அடங்கியுள்ளது. முதன்முறையாகச் செயல்படுத்தும்போது, தேவைப்பட்டால் மட்டும் `cloudflared` பதிவிறக்கப்பட்டு, உங்கள் தற்போதைய `/v1` endpoint-க்கு ஒரு தற்காலிக tunnel தொடங்கப்பட்டு, உருவாக்கப்பட்ட `https://*.trycloudflare.com/v1` URL உங்கள் வழக்கமான பொது URL-க்கு நேரடியாகக் கீழே காட்டப்படும்.

செயலில் உள்ள tunnel நிலையை மாற்றாமல், endpoint tunnel panel-களை (Cloudflare, Tailscale, ngrok) `Settings → Appearance` என்பதிலிருந்து காட்டவோ மறைக்கவோ முடியும்.

### Tunnel குறிப்புகள்

- Quick Tunnel URL-கள் தற்காலிகமானவை; ஒவ்வொரு மறுதொடக்கத்திற்குப் பிறகும் அவை மாறும்.
- OmniRoute அல்லது container மறுதொடக்கத்திற்குப் பிறகு Quick Tunnel-கள் தானாக மீட்டமைக்கப்படாது. தேவைப்படும்போது dashboard-இலிருந்து அவற்றை மீண்டும் செயல்படுத்தவும்.
- நிர்வகிக்கப்பட்ட நிறுவல் தற்போது Linux, macOS மற்றும் Windows ஆகியவற்றில் `x64` / `arm64`-ஐ ஆதரிக்கிறது.
- கட்டுப்பாடுகள் உள்ள container சூழல்களில் இரைச்சலான QUIC UDP buffer எச்சரிக்கைகளைத் தவிர்க்க, நிர்வகிக்கப்பட்ட Quick Tunnel-கள் இயல்பாக HTTP/2 transport-ஐப் பயன்படுத்துகின்றன. வேறு transport தேவைப்பட்டால் `CLOUDFLARED_PROTOCOL=quic` அல்லது `auto` என அமைக்கவும்.
- Docker image-கள் system CA root-களை உள்ளடக்கி, அவற்றை நிர்வகிக்கப்பட்ட `cloudflared`-க்கு அனுப்புகின்றன; tunnel container-க்குள் bootstrap ஆகும்போது இது TLS trust தோல்விகளைத் தவிர்க்கிறது.
- புதிய binary-ஐப் பதிவிறக்குவதற்குப் பதிலாக ஏற்கனவே உள்ள binary-ஐ OmniRoute பயன்படுத்த வேண்டுமெனில் `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` என அமைக்கவும்.

## Image Tag-கள்

| Image                    | Tag      | அளவு   | விளக்கம்                                                       |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | மிக உயர்ந்த **வெளியிடப்பட்ட** நிலையான SemVer (git `main` அல்ல) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps-க்காக இந்த வகை tag-ஐ pin செய்யவும்                      |

பல-platform manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). பொருந்தும் architecture-ஐ Docker தானாகத் தேர்ந்தெடுக்கிறது; ARM host-களில் AMD64 emulation-ஐக் கட்டாயப்படுத்த வேண்டுமெனில் `--platform linux/amd64` என்பதை வழங்கவும்.

### Release Channel-கள்

நிலையான release-கள், செயலில் உள்ள release-branch சோதனை மற்றும் development build-களுக்குத் தனித்தனி Docker channel-களை OmniRoute வெளியிடுகிறது.

| Channel                         | மூலம்                                        | மாற்றத்தன்மை                     | பரிந்துரைக்கப்படும் பயன்பாடு                                                                                                               |
| ------------------------------- | -------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | கையொப்பமிடப்பட்ட/version செய்யப்பட்ட release | மாற்ற முடியாதது                  | ஒரு துல்லியமான release-ஐ pin செய்யும் production deployment-கள்                                                                            |
| `:latest` / `:latest-web`       | மிக உயர்ந்த **வெளியிடப்பட்ட** நிலையான SemVer | மாற்றக்கூடிய நிலையான pointer     | SemVer publish பணி முடிந்த **பிறகு** நிலையான release-களைப் பின்தொடரும் — `main` அல்லது வெளியிடப்படாத `release/v*` commit-களைப் பின்தொடராது |
| `:next` / `:next-web`           | தற்போதைய இயல்புநிலை `release/v*` branch      | மாற்றக்கூடிய pre-release pointer | செயலில் உள்ள release branch-க்கு வந்துள்ள, ஆனால் இன்னும் நிலையான release-இல் சேர்க்கப்படாத fix-களைச் சோதித்தல்                             |
| `:main` / `:main-web`           | `main` branch                                | மாற்றக்கூடிய development pointer | development மற்றும் integration சோதனைக்கு மட்டும்                                                                                          |

#### Web-session provider-கள்: `-web` image-கள்

மேலே உள்ள ஒவ்வொரு channel-மும் `-web` tag ஆகவும் (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) கிடைக்கிறது; இவை `runner-web` stage-இலிருந்து உருவாக்கப்படுகின்றன — அதே image-உடன் Playwright மற்றும் Chromium browser-ம் சேர்க்கப்பட்டிருக்கும். சாதாரண image Chromium **இல்லாமல்** வழங்கப்படுகிறது; `gemini-web`, `claude-web` மற்றும் `claude-turnstile` ஆகியவற்றுக்கு அது தேவை.

தோல்வி startup நேரத்தில் அல்லாமல் பின்னுக்குத் தள்ளப்படுகிறது: அந்த provider-கள் தங்களின் model-களைப் பட்டியலிட்டு dashboard-இல் connected எனக் காட்டப்படும்; முதல் கோரிக்கை மட்டும் பின்வருமாறு தோல்வியடையும்

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

அந்த provider-களைப் பயன்படுத்தினால், நீங்கள் ஏற்கனவே பயன்படுத்தும் channel-இன் `-web` tag-ஐ pull செய்யவும் — வேறு எதுவும் மாறாது. npm/CLI நிறுவலில் (Docker image இல்லாமல்), அதற்குச் சமமான விடுபட்ட பகுதி browser binary ஆகும்: host-இல் `npx playwright install chromium`-ஐ இயக்கவும்.

#### Pre-release channel-ஐப் பயன்படுத்துதல்

தற்போதைய இயல்புநிலை `release/v*` கிளைக்கு ஒவ்வொரு push செய்யப்படும்போதும் `next` சேனல் மீண்டும் உருவாக்கப்பட்டு, AMD64 மற்றும் ARM64 ஆகிய இரண்டிற்கும் வெளியிடப்படுகிறது. பழைய பராமரிப்புக் கிளைகளால் அதை மேலெழுத முடியாது. அடுத்த நிலையான tag உருவாக்கப்படுவதற்கு முன்பு செயலில் உள்ள வெளியீட்டுக் கிளையில் merge செய்யப்பட்ட திருத்தங்களுக்கான, pull செய்யக்கூடிய image-ஐ இந்தச் சேனல் வழங்குகிறது.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-க்கு, தேர்ந்தெடுக்கப்பட்ட profile பயன்படுத்தும் image tag-ஐ override செய்து, பின்னர் service-ஐ pull செய்து மீண்டும் உருவாக்கவும்:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### பாதுகாப்பும் முந்தைய நிலைக்குத் திரும்புதலும்

`next` என்பது மாறிக்கொண்டிருக்கும் முன்-வெளியீட்டுச் சேனல். செயலில் உள்ள வெளியீட்டுக் கிளைக்கு எந்த push செய்யப்பட்டாலும் இது மாறக்கூடும்; மேலும் இது **உற்பத்திப் பயன்பாட்டிற்கு ஆதரிக்கப்படவில்லை**. குறிப்பிட்ட build ஒன்றை மதிப்பீடு செய்யும்போது image digest-ஐ pin செய்யவும்:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

சோதிப்பதற்கு முன், OmniRoute data volume அல்லது bind-mounted data directory-ஐக் காப்புப் பிரதி எடுக்கவும். முந்தைய நிலைக்குத் திரும்ப, முன்பு பயன்படுத்திய நிலையான version அல்லது digest-ஐ மீட்டமைத்து container-ஐ மீண்டும் உருவாக்கவும்:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

வெளியீட்டுக் கிளையின் build ஒருபோதும் `latest`-ஐ நகர்த்த முடியாது; தகுதியுள்ள நிலையான semantic version மட்டுமே நிலையான pointer-ஐ முன்னேற்ற முடியும். `next` images, வெளியீட்டு image ஆய்வையும் தடுக்கும் CRITICAL-vulnerability நுழைவாயிலையும் தொடர்ந்து கொண்டிருக்கும்.

**git-க்கு `latest` என்பது அண்மைநிலைக்கான உத்தரவாதம் அல்ல.** `main` அல்லது செயலில் உள்ள `release/v*` கிளையில் merge செய்யப்பட்ட திருத்தங்கள், நிலையான SemVer image வெளியிடப்பட்டு, publish job `:latest`-ஐ முன்னேற்றும் வரை **`:latest`-இல் இடம்பெறாது** (அந்த SemVer-இன் அதே digest). GitHub-ல் திருத்தம் ஏற்கனவே காணப்பட்டாலும் `latest` மாறாமல் இருப்பதாகத் தோன்றினால், வெளியீட்டுக் கிளையைச் சோதிக்க `:next`-ஐ pull செய்யவும் அல்லது SemVer tag-க்காகக் காத்திருக்கவும்.

| உங்கள் தேவை                                                                                                 | பயன்படுத்த வேண்டியது                             |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| மாறக்கூடாத GitOps / உற்பத்திச் சூழல்                                                                        | `:X.Y.Z`-ஐ pin செய்யவும் (அல்லது image digest-ஐ) |
| வெளியிடப்பட்ட நிலையான பதிப்புகளைப் பின்தொடர்ந்து, ஒவ்வொரு வெளியீட்டிலும் மீண்டும் உருவாக்கப்படுவதை ஏற்கவும் | `:latest`                                        |
| வெளியிடப்படாத `release/v*` commits-ஐச் சோதிக்கவும்                                                          | `:next` (உற்பத்திக்கு அல்ல)                      |
| `main`-ஐச் சோதிக்கவும்                                                                                      | `:main` (உற்பத்திக்கு அல்ல)                      |

## கிடைப்புத்தன்மை: இயல்புநிலை SQLite ஒற்றைப் பிரதியைக் கொண்டது

வழக்கமான Docker / Kubernetes OmniRoute என்பது **ஒரு Node செயல்முறை + ஒரு SQLite எழுதி** ஆகும். இந்த இடவமைப்பில் உயர் கிடைப்புத்தன்மை **ஆதரிக்கப்படவில்லை**.

| கட்டுப்பாடு                                                 | விளைவு                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ஒற்றை எழுதி                                                 | ஒரே SQLite கோப்பிற்கு எதிராகப் பல பிரதிகளை **இயக்க வேண்டாம்**. அது DB-ஐச் சிதைக்கும்.                                                                                                                                                                                                                                                                                                                                                       |
| மீண்டும் உருவாக்குதல் / மறுதொடக்கம் / HEALTHCHECK நிறுத்தம் | செயல்பாட்டிலுள்ள SSE, டாஷ்போர்டு அமர்வுகள் மற்றும் நினைவகத்திலுள்ள நிலை ஆகியவற்றுக்கு **முழுமையான செயலிழப்பு** ஏற்படும். இணைக்கப்பட்டுள்ள ஒவ்வொரு கிளையன்டின் இணைப்பும் துண்டிக்கப்படும். எண்ட்பாயிண்ட் இல்லாத நேரச் சாளரத்தில் வரும் புதிய கோரிக்கைகள் OmniRoute JSON-க்குப் பதிலாக ரிவர்ஸ்-ப்ராக்ஸியிலிருந்து **`502 Bad Gateway: Unknown error`** பெறும் — கிளையன்ட்களால் இதை வழங்குநர் செயலிழப்பிலிருந்து வேறுபடுத்த முடியாது (#11015). |
| `/healthz` பயன்படுத்தும் அதே நிகழ்வு மடக்கு                 | பரபரப்பான கேட்டலாக் அல்லது சுருக்கச் சுழற்சி ஆய்வுகளைத் தாமதப்படுத்தலாம்; குறுகிய நேர முடிவு பின்னர் **ஒரே** பிரதியை மறுதொடக்கம் செய்யும்.                                                                                                                                                                                                                                                                                                  |

**ஆய்வு அணி** ([Kubernetes ஆய்வுப் பரிந்துரைகள்](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) என்பதையும் காண்க):

| ஆய்வு                  | இலக்கு                                                                | பயன்படுத்த வேண்டாம்                                                             |
| ---------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| உயிர்நிலை              | `PORT`-இல் TCP (இயல்புநிலை `20128`), அல்லது மென்மையான HTTP `/healthz` | `/api/monitoring/health`                                                        |
| தயார்நிலை              | HTTP `GET /healthz`                                                   | நிகழ்வு மடக்கு பரபரப்பாக இருப்பதை செயலிழப்பாகக் கருதும் இறுக்கமான நேர முடிவுகள் |
| ஆழமான / மனிதர்களுக்கான | `/api/monitoring/health`                                              | தானியக்க kubelet உயிர்நிலை ஆய்வு                                                |

**மேம்படுத்தல்கள்:** ஒவ்வொரு அமர்வும் துண்டிக்கப்படும் என எதிர்பார்க்கவும். உங்களால் முடிந்தால் கிளையன்ட்களைப் படிப்படியாக வெளியேற்றவும்; இயல்புநிலை SQLite-இல் தொடர்ச்சியான புதுப்பிப்பு இல்லை. Compose `restart: unless-stopped` மற்றும் Docker `HEALTHCHECK` ஆகியவையும் கண்டெய்னர் ஆரோக்கியமற்றதாக இருக்கும்போது ஒரே செயல்முறையை மாற்றிவிடும் — இதனால் ஏற்படும் பாதிப்பு வரம்பும் அதேதான்.

**ஒற்றைப் பிரதிக்கான** Kubernetes துணுக்கு (`Recreate` அவசியம்; ஒரே SQLite கோப்பிற்கு எதிராக `replicas` எண்ணிக்கையை அதிகரிக்க வேண்டாம்):

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

`preStop` உறக்கம் SIGTERM-க்கு முன் Service எண்ட்பாயிண்ட்களை kube நீக்க அனுமதிக்கிறது; எனவே **புதிய** போக்குவரத்து நிறுத்தப்படும் செயல்முறையை அடைவது தவிர்க்கப்படுகிறது. செயல்பாட்டிலுள்ள `/v1/responses` SSE, ஹெவிவெயிட் அனுமதிக் குத்தகைகள் வழியாக `SHUTDOWN_TIMEOUT_MS` வரை (இயல்புநிலை 30 வி.) வெளியேற்றப்படும் (#11015). இன்னும் செயல்முறையை அடையும் புதிய கோரிக்கைகள் `503` + `Retry-After: 5` பெறும். மாற்றுப் பிரதி தயாராகும் வரையிலான Recreate எண்ட்பாயிண்ட்-இல்லா இடைவெளி ஒரு முழுமையான செயலிழப்பாகவே நீடிக்கும் — அது SQLite இடவமைப்பின் தன்மை, ஆய்வின் தவறான உள்ளமைவு அல்ல.

வெளிப்புற Postgres / பல-எழுதி HA என்பது ஆவணப்படுத்தப்பட்ட வழக்கமான பாதை **அல்ல**. உங்களுக்கு HA தேவைப்பட்டால், ஒற்றைப் பிரதியை வைத்திருக்கவும் அல்லது திட்டம் தனியாகச் சோதித்து ஆவணப்படுத்திய இடவமைப்பை இயக்கவும். Postgres/MySQL பணி [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-இல் உள்ளது. அது வெளியிடப்படும் வரை, **பெரிய** `/v1/responses` திறனைப் பெருக்குவதற்கான ஒரே ஆதரிக்கப்படும் வழி N தனித்தனி செயல்முறைகளே (அடுத்த பகுதி); ஒரே தொகுதியில் `replicas > 1` பயன்படுத்துவது அல்ல.

## கிடைமட்ட அளவாக்கம்: N சுயாதீனச் செயல்முறைகள்

ஒரு Node செயல்முறை என்பது **ஒரு V8 heap** ஆகும். ஒன்றுடன் ஒன்று நேரத்தில் ஒத்துப்போகும் ~3 MiB / ~750k-token கொண்ட இரண்டு coding-agent `POST /v1/responses` கோரிக்கைகள் (RTK + Caveman), ~12 Gi அளவில் அந்த heap-ஐ நிறுத்திவிடுகின்றன (`FATAL ERROR: Reached heap limit`); மேலும் 16 Gi cgroup-ஐ OOM நிலைக்குக் கொண்டுசெல்லக்கூடும். [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)-ஐப் பார்க்கவும். அந்த அளவீடு ஒரு **நினைவக-ஒதுக்கீட்டு** எச்சரிக்கையே தவிர, ஒரே நேரத்தில் இயங்கும் நீண்ட `/v1/responses` கோரிக்கைகளுக்கு தயாரிப்பால் விதிக்கப்பட்ட அதிகபட்ச வரம்பு இரண்டு என்பதல்ல. அதிக வளம் தேவைப்படும் chat அனுமதி, அதே V8/cgroup உச்சவரம்பிலிருந்து தானாகக் கணக்கிடப்படும் ingest byte ஒதுக்கீட்டால் (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) கட்டுப்படுத்தப்படுகிறது — ஏற்கெனவே அளவிடப்பட்ட செயல்முறையில் அதை உயர்த்தி override செய்வது (அல்லது பழைய `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` கோரிக்கை-எண்ணிக்கை வரம்பை அமைப்பது) மீண்டும் செயல்முறை நிறுத்தத்தை ஏற்படுத்தும். சிறிய chats, `/healthz`, `/v1/models`, மற்றும் MCP ஆகியவை அந்த வரம்பில் **சேர்க்கப்படவில்லை**.

### ஒற்றைச் செயல்முறை: இரண்டுக்கும் மேற்பட்ட நீண்ட `/v1/responses`

ஒரு **ஆரோக்கியமான** செயல்முறை (heap, `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-க்குக் கீழே இருக்கும்; இயல்புநிலை `0.75`) செயல்முறை முழுவதற்குமான inflight-byte ஒதுக்கீட்டில் (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) இன்னும் இடம் இருந்தால், ஒரே நேரத்தில் இரண்டுக்கும் மேற்பட்ட நீண்ட `POST /v1/responses` கோரிக்கைகளை இயக்க **முடியும்**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` அளவிலோ அதற்கு மேலோ உள்ள bodies (இயல்புநிலை 256 KiB), கட்டமைப்பு அதிகமுள்ள கோரிக்கைகளைப் போலவே அதே heavyweight lease-ஐப் பெறுவதுடன், அதே [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` விலக்கையும் (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) பயன்படுத்துகின்றன. ஒரே நேரத்தில் பல பத்துக் கணக்கான நீண்ட SSE clients-ஐ இயக்குவது (operators-க்கு பெரும்பாலும் 40–50 தேவைப்படும்) ஒரு **நினைவக-ஒதுக்கீட்டு** கேள்வியாகும் — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ஆகியவற்றை அதற்கேற்ப அளவிடுங்கள் — இது தயாரிப்பின் கடுமையான “அதிகபட்சம் 2” வரம்பு அல்ல. அழுத்தத்திலுள்ள heap, #7849 மீண்டும் நிகழாதவாறு retry செய்யக்கூடிய `503` பதிலுடன் கோரிக்கைகளை இன்னும் shed செய்யும்.

**heaps-ஐப் பெருக்க** (சுயாதீன V8 old-spaces) **தற்போது**:

| செய்ய வேண்டியது                                                                                                                                                                    | செய்யக்கூடாதது                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **N containers/pods**-ஐ இயக்கவும்; ஒவ்வொன்றுக்கும் அதன் **சொந்த** `DATA_DIR` / volume இருக்க வேண்டும்                                                                              | ஒரே SQLite file-க்கு எதிராக `replicas > 1` அமைக்க வேண்டாம்                              |
| heap / inflight-byte ஒதுக்கீட்டிலிருந்து heavy in-flight + healthy-headroom-ஐ அளவிடவும்; 1–2 என்பது பாதுகாப்பான #7849 இயல்புநிலையே தவிர, தயாரிப்பின் கடுமையான அதிகபட்ச வரம்பு அல்ல | ஒரு செயல்முறைக்கு 8× RAM மற்றும் வரம்பற்ற எண்ணிக்கை வரம்பை வழங்க வேண்டாம்               |
| விருப்பத்தேர்வு: **பகிரப்பட்ட quota counters**-க்காக `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                          | Redis-ஐ பகிரப்பட்ட SQLite ஆகக் கருத வேண்டாம் — அது அப்படியல்ல                           |
| provider secrets-ஐ ஒவ்வொரு instance-லும் நகலெடுக்கவும் (அல்லது பிரிக்கப்பட்ட dashboards-ஐ ஏற்றுக்கொள்ளவும்)                                                                        | instances முழுவதற்கும் ஒரே dashboard / ஒரே call-log கிடைக்கும் என எதிர்பார்க்க வேண்டாம் |
| ஏதேனும் ஒரு load balancer-ஐ முன்புறத்தில் பயன்படுத்தவும்; API key அல்லது session அடிப்படையிலான sticky routing போதுமானது                                                            | vendor-specific size-aware middleware கட்டாயம் எனக் கருத வேண்டாம்                       |

வன்பொருள்: ஒவ்வொரு instance-லும் ஒரே நேரத்தில் இயங்கும் நீண்ட `/v1/responses`-இன் எண்ணிக்கை ஒரு **நினைவக-ஒதுக்கீட்டு** கேள்வியாகும் (heap + inflight-byte / #10110). `N` சுயாதீன `DATA_DIR`-கள் இன்னும் heaps-ஐப் பெருக்குகின்றன: host RAM, `N × cgroup`-ஐத் தாங்க வேண்டும்; “N=8 கொண்ட ஒரு 16 Gi pod” என்று கணக்கிடக்கூடாது. ஒரே SQLite file-இல் ஒருபோதும் `replicas > 1` அமைக்க வேண்டாம்.

Compose மாதிரி (இரண்டு heaps, இரண்டு volumes — `deploy.replicas: 2` அல்ல):

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

செயல்முறைக்குள் அடர்த்தியை அதிகரிப்பது (HTTP isolate-இலிருந்து compression-ஐ வெளியேற்றுவது) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)-இல் உள்ளது. பகிரப்பட்ட நிலையான state-இல் ஒரு logical cluster அமைப்பது [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-இல் உள்ளது.

## Docker-க்குள் Gemini பிராந்தியப் பிழைகள்

Google AI Studio / Gemini API ஆனது FAILED_PRECONDITION உடன் HTTP 400 மற்றும்
`User location is not supported for the API use.` என்ற பிழையை வழங்கக்கூடும். ஹோஸ்டில் ஒரு கோரிக்கை
வெற்றிபெறுவது, கண்டெய்னரும் அதே வெளிச்செல்லும் வழித்தடத்தைப் பயன்படுத்துகிறது என்பதை நிரூபிக்காது. DNS வரிசைப்படுத்தல்,
IPv4/IPv6 இணைப்பு, VPN வழித்தடம் மற்றும் உள்ளமைக்கப்பட்ட ப்ராக்ஸிகள் வேறுபடலாம்.
[Google ஆதரிக்கும் பிராந்தியங்கள்](https://ai.google.dev/gemini-api/docs/available-regions)
மற்றும் உண்மையான இணைப்பு வழித்தடம் ஆகிய இரண்டையும் சரிபார்க்கவும்; இந்தப் பிழை மட்டும் தவறான API key-ஐ அடையாளம் காட்டாது.

### இணைப்புக்கே உரிய ப்ராக்ஸியைப் பயன்படுத்துவது சிறந்தது

பாதிக்கப்பட்ட Gemini இணைப்பிற்கு OmniRoute-இன்
[ஒவ்வொரு இணைப்புக்குமான ப்ராக்ஸி உள்ளமைப்பைப்](../ops/PROXY_GUIDE.md#4-level-proxy-system)
பயன்படுத்தவும்; பின்னர் அதே மாடலைக் கொண்டு **Test Connection** மற்றும் ஒரு சிறிய கோரிக்கையை மீண்டும் இயக்கவும்.
இது வழித்தட மாற்றத்தை அந்த இணைப்பிற்குள் மட்டுமே கட்டுப்படுத்துகிறது. கண்டெய்னரிலிருந்து ப்ராக்ஸியை
அணுக முடிகிறதா என்பதையும், இணைப்பு உண்மையில் அதையே தேர்ந்தெடுக்கிறதா என்பதையும் சரிபார்க்கவும்.
வழித்தடத்தை மாற்றுவது, மேல்நிலைச் சேவையின் பிராந்தியத் தகுதிக்கு உத்தரவாதம் அளிக்காது.

### ஹோஸ்ட் மற்றும் கண்டெய்னர் நெட்வொர்க்கிங்கை ஒப்பிடுதல்

அங்கீகரிக்கப்பட்ட முடிவுகளை ஒப்பிடும்போது key, model மற்றும் request ஆகியவற்றை ஒரே மாதிரியாக வைத்திருக்கவும்;
நற்சான்றுகள், ப்ராக்ஸி கடவுச்சொற்கள் அல்லது முழுமையான authorization header-களை ஒருபோதும் issue-இல் ஒட்ட வேண்டாம்.
முதலில் OS resolver எந்த address family-களை வழங்குகிறது என்பதை, ஹோஸ்டிலும் கண்டெய்னருக்குள்ளும்
அதே command-ஐப் பயன்படுத்திச் சரிபார்க்கவும்:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` என்பதற்குப் பதிலாக நீங்கள் இயக்கும் service-ஐப் பயன்படுத்தவும் (எடுத்துக்காட்டாக, `omniroute-web`).
இந்த command-கள் நற்சான்றுகள் அல்லது IP முகவரிகள் இல்லாமல் address family-களை அச்சிடுகின்றன.
`6` திரும்பக் கிடைப்பது IPv6 DNS முடிவை மட்டுமே காட்டுகிறது: பயன்படுத்தக்கூடிய IPv6 வழித்தடம் அல்லது API அணுகல்
உள்ளது என்பதை அது நிரூபிக்காது. `curl` நிறுவப்பட்டுள்ள இடங்களில், இரண்டு சூழல்களிலும்
`curl -4 -I https://generativelanguage.googleapis.com` மற்றும்
`curl -6 -I https://generativelanguage.googleapis.com` ஆகியவற்றை ஒப்பிடவும்.
அது அங்கீகரிக்கப்படாத பிழையாக இருந்தாலும், ஒரு HTTP பதில் கிடைப்பது அந்தச் சோதனைக்கான இணைப்பை நிரூபிக்கிறது;
அங்கீகரிக்கப்பட்ட model request மட்டுமே Gemini தகுதியைச் சோதிக்கிறது.

### ஹோஸ்ட்-நிலை மாற்று வழி: செயல்படும் IPv6 மற்றும் resolver கொள்கை

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)-ஐப் புகாரளித்தவர்,
கண்டெய்னர் IPv6-ஐச் செயல்படுத்தி glibc முகவரித் தேர்வை மாற்றியதன் மூலம் தங்கள் சூழலில் அணுகலை மீட்டெடுத்தார்.
இதைச் சூழலுக்கே உரிய மாற்று வழியாகக் கருதவும். Resolver முன்னுரிமைகளைச் சரிசெய்வதற்கு முன்,
ஹோஸ்ட் IPv6 செயல்படுவதையும், கண்டெய்னரின் வெளிச்செல்லும் போக்குவரத்து/வழித்தடத்தையும், firewall விதிகளையும் உறுதிப்படுத்தவும்.
ஒரு தனிப்பட்ட ULA முகவரி மட்டுமே பொது IPv6 இணைப்பை நிறுவாது.

Compose-இன் default network-உடன் ஏற்கெனவே இணைக்கப்பட்டுள்ள service-களுக்கு, இந்தத் துணுக்கு
அந்த network-இல் IPv6-ஐச் செயல்படுத்துகிறது; உங்கள் service, ports, volumes மற்றும் configuration-இன்
மீதமுள்ள பகுதிகளை அப்படியே வைத்திருக்கவும்:

```yaml
networks:
  default:
    enable_ipv6: true
```

பெயரிடப்பட்ட network-க்கு, service உண்மையில் இணையும் network-இல் இதைச் செயல்படுத்தவும்.
Docker ஒரு ULA subnet-ஐ ஒதுக்க முடியும்; உங்கள் network-க்கு அது தேவைப்படும்போது மட்டும்,
ஒன்றுடன் ஒன்று மேலிடாத வெளிப்படையான subnet-ஐத் தேர்ந்தெடுக்கவும்.
[Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/) மற்றும்
[Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) ஆகியவற்றைப் பார்க்கவும்.

**glibc அடிப்படையிலான image**-இல், `/etc/gai.conf` முகவரித் தேர்வை மாற்ற முடியும்.
தற்போதைய repository Dockerfile Debian-ஐப் பயன்படுத்துகிறது; தனிப்பயன் musl அடிப்படையிலான image-கள்
இந்தச் செயல்முறையைப் பகிர்வதில்லை. புகாரளிக்கப்பட்ட சரிசெய்தல், ULA label-ஐ
`label fc00::/7 6` என்பதிலிருந்து `label fc00::/7 1` என்பதாக மாற்றுகிறது.
Image-இன் முழுமையான policy table-இலிருந்து தொடங்கி, அதன் பிற entry-களைப் பாதுகாக்கவும்:
ஒரு `label` அல்லது `precedence` entry-ஐச் சேர்ப்பது அந்த default table-ஐ மாற்றிவிடுவதால்,
மாற்றப்பட்ட வரியை மட்டும் கொண்ட file போதாது.
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
அந்தச் செயல்பாட்டு விதிகளை ஆவணப்படுத்துகிறது. மதிப்பாய்வு செய்யப்பட்ட file-ஐ `/etc/gai.conf`-இல்
படிக்க மட்டும் இயலும் வகையில் bind-mount செய்து, மாற்றத்தைப் பயன்படுத்த service-ஐ மீண்டும் உருவாக்கவும்.

இது **அந்தக் கண்டெய்னரிலுள்ள அனைத்து வெளிச்செல்லும் போக்குவரத்திற்குமான** OS முகவரித் தேர்வை மாற்றுகிறது.
ஒவ்வொரு application-உம் IPv6-ஐத் தேர்ந்தெடுக்குமாறு இது கட்டாயப்படுத்தாது: Node-இன் DNS வரிசையும்
இணைப்புத் தேர்வும் தாக்கம் செலுத்துகின்றன. குறிப்பாக, `--dns-result-order=ipv4first` ஆனது IPv4-ஐ
முன்னுரிமைப்படுத்துகிறது; IPv4-க்கு மட்டுமே ஏற்படும் தோல்விக்கு இது தீர்வல்ல.
[Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)-ஐப் பார்க்கவும்.

ஹோஸ்ட்-நிலை மாற்றம் ஏதேனும் செய்த பிறகு Gemini மற்றும் உங்கள் பிற provider-களை மீண்டும் சோதிக்கவும்.
முந்தைய நிலைக்குத் திரும்ப, தனிப்பயன் `gai.conf` mount-ஐ அகற்றி, முந்தைய network configuration-ஐ
மீட்டமைத்து, பராமரிப்பு நேரத்தின்போது பாதிக்கப்பட்ட service/network-ஐ மீண்டும் உருவாக்கவும்.
ஒரு network-ஐ மீண்டும் உருவாக்குவது அதனுடன் இணைக்கப்பட்டுள்ள பிற கண்டெய்னர்களுக்கு இடையூறு ஏற்படுத்தலாம்;
நிரந்தரத் தரவு volume-ஐ நீக்க வேண்டாம்.

## முக்கிய குறிப்புகள்

- **SQLite WAL பயன்முறை:** சமீபத்திய மாற்றங்களை `storage.sqlite`-க்குள் OmniRoute checkpoint செய்யும் வகையில், `docker stop` முழுமையாக நிறைவடைய அனுமதிக்க வேண்டும். தொகுப்பில் உள்ள Compose கோப்புகள் ஏற்கனவே 40 வினாடிகள் நிறுத்தக் கால அவகாசத்தை அமைத்துள்ளன. image-ஐ நேரடியாக இயக்கினால், `--stop-timeout 40`-ஐத் தொடர்ந்து பயன்படுத்தவும்.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** வழக்கமான/எழுதுவதற்கு முந்தைய காப்புப்பிரதிகள் வெளிப்புறமாக நிர்வகிக்கப்பட்டால், இதை `true` என அமைக்கவும். ஏற்கனவே உள்ள database migration-களுக்கு அவற்றுக்கென நீடித்த பாதுகாப்பு snapshot மற்றும் பெருமளவு migration பாதுகாப்புக் கட்டுப்பாடு இன்னும் தேவை.
- **தரவு நிலைத்தன்மை:** container மறுதொடக்கங்களுக்கிடையே உங்கள் database, key-கள் மற்றும் configuration-களை நிலைநிறுத்த, எப்போதும் `/app/data`-க்கு ஒரு volume-ஐ mount செய்யவும்.
- **Port உள்ளமைவு:** இயல்புநிலை `20128` port-ஐ மாற்ற, `PORT` environment variable-ஐ override செய்யவும்.

## மேலும் காண்க

- [VM நிறுவல் வழிகாட்டி](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare அமைப்பு
- [Fly.io நிறுவல் வழிகாட்டி](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-க்கு நிறுவுதல்
- [சூழல் உள்ளமைவு](../reference/ENVIRONMENT.md) — முழுமையான `.env` குறிப்பு
