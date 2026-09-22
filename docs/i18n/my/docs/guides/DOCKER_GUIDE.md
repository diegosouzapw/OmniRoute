# 🐳 Docker Guide — OmniRoute (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker ဖြန့်ကျက်မှုဆိုင်ရာ အပြည့်အစုံ ကိုးကားချက်။ အမြန်စတင်ရန် [README ၏ Docker အပိုင်း](../README.md#-docker) ကို ကြည့်ပါ။

## မာတိကာ

- [အမြန် လုပ်ဆောင်ခြင်း](#quick-run)
- [Environment ဖိုင်ဖြင့်](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ရရှိနိုင်သော Profile များ](#available-profiles)
- [OmniRoute ကို Docker တွင် လုပ်ဆောင်နေချိန် Host CLI ကိရိယာများကို သတ်မှတ်ခြင်း](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Production Compose](#production-compose)
- [Dockerfile Stage များ](#dockerfile-stages)
- [အရေးကြီးသော Environment Variable များ](#critical-environment-variables)
- [Caddy (HTTPS) ဖြင့် Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image Tag များ](#image-tags)
- [ရရှိနိုင်မှု- မူလ SQLite သည် Replica တစ်ခုတည်းသာဖြစ်သည်](#availability-default-sqlite-is-single-replica)
- [အရေးကြီးသော မှတ်ချက်များ](#important-notes)

---

## အမြန် စတင်အသုံးပြုခြင်း

> **Command တစ်ခုတည်းဖြင့် ကိုယ်ပိုင် Host ပေါ်တွင် အသုံးပြုလိုပါသလား။**  
> [ကိုယ်ပိုင် Host ပေါ်တွင် အသုံးပြုခြင်း လမ်းညွှန်](../getting-started/SELF_HOST_GUIDE.md) ကို ကြည့်ပါ —
> `docker compose -f docker-compose.selfhost.yml up -d` (ဖြန့်ချိထားသော image +
> Redis၊ loopback-only၊ profile ရွေးချယ်ရန်မလိုပါ)။ အောက်ပါ အမြန်စတင်အသုံးပြုခြင်းသည်
> အခြားနေရာတွင် Redis ကို အသုံးပြုထားပြီးသော အသုံးပြုသူများအတွက် single-container နည်းလမ်းဖြစ်သည်။

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Environment ဖိုင်ဖြင့်

```bash
# ဦးစွာ .env ကို ကူးယူပြီး ပြင်ဆင်ပါ
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
# အခြေခံပရိုဖိုင် (CLI ကိရိယာများ မပါဝင်ပါ)
docker compose --profile base up -d

# CLI ပရိုဖိုင် (Claude Code၊ Codex နှင့် OpenClaw တို့ အသင့်ပါဝင်သည်)
docker compose --profile cli up -d

# Host ပရိုဖိုင် (Linux ကို ဦးစားပေးထားပြီး host CLI binary များကို ဖတ်ရန်သက်သက်ဖြင့် mount လုပ်သည်)
docker compose --profile host up -d

# Web ပရိုဖိုင် (web-session provider များအတွက် Chromium/Playwright)
docker compose --profile web up -d

# CLI နှင့် CLIProxyAPI sidecar ကို ပေါင်းစပ်ပါ
docker compose --profile cli --profile cliproxyapi up -d
```

## ရရှိနိုင်သော Profiles

OmniRoute တွင် အဓိက ဖြန့်ကျက်အသုံးပြုမှုပုံစံများအတွက် Compose profiles များ ပါဝင်သည်။ သင့်ပတ်ဝန်းကျင်နှင့် ကိုက်ညီသော profile ကို ရွေးချယ်ပါ။

| Profile                 | Service          | အသုံးပြုသင့်သည့်အခြေအနေ                                                                                                                                            | Command                                      |
| ----------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (မူလသတ်မှတ်ချက်) | `omniroute-base` | Headless server / အနည်းဆုံး runtime၊ provider CLIs များ ထည့်သွင်းပေးထားခြင်းမရှိပါ                                                                                 | `docker compose --profile base up -d`        |
| `cli`                   | `omniroute-cli`  | `omniroute providers/setup/doctor` နှင့် ထည့်သွင်းပေးထားသော CLIs များ (Codex, Claude Code, Droid, OpenClaw) ကို ခေါ်သုံးသည့် agentic workflows များ                | `docker compose --profile cli up -d`         |
| `host`                  | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` စသည်တို့ကို ဖတ်ရန်သီးသန့်အဖြစ် mount လုပ်၍ host CLIs များကို `network_mode` ဆန်ဆန် ဝင်ရောက်အသုံးပြုလိုသော Linux hosts များ | `docker compose --profile host up -d`        |
| `cliproxyapi`           | `cliproxyapi`    | upstream CLI proxying အတွက် port `8317` တွင် [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar ကို လုပ်ဆောင်ရန်                                  | `docker compose --profile cliproxyapi up -d` |
| `web`                   | `omniroute-web`  | browser လိုအပ်သော web-session providers များ—`gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` ကို build လုပ်ပြီး Chromium ပါဝင်သည်)                    | `docker compose --profile web up -d`         |

> Profiles အများအပြားကို ပေါင်းစပ်အသုံးပြုနိုင်သည်—`docker compose --profile cli --profile cliproxyapi up -d`။

## OmniRoute ကို Docker တွင် လုပ်ဆောင်နေစဉ် host CLI ကိရိယာများကို စီစဉ်သတ်မှတ်ခြင်း

`omniroute setup-codex`, `setup-claude`, `config set <tool>` နှင့် dashboard ၏
**စီစဉ်သတ်မှတ်ချက်ကို သိမ်းဆည်းရန်** ခလုတ်တို့သည် `~/.codex/*.config.toml` ကဲ့သို့သော ဖိုင်များကို ရေးသားကြသည်။ ထိုလမ်းကြောင်းများသည်
CLI အမှန်တကယ် လုပ်ဆောင်နေသည့် စက်ပေါ်တွင်သာ အဓိပ္ပာယ်ရှိသည်။ ၎င်းတို့ကို container အတွင်း
လုပ်ဆောင်ပါက ရေးသားမှုသည် container ၏ ကိုယ်ပိုင် home (`/home/node` —
image သည် `USER node` အဖြစ် လုပ်ဆောင်သည်) ထဲသို့ ရောက်ရှိသွားမည်ဖြစ်ပြီး host CLI မည်သည့်အရာကမျှ ၎င်းကို ဖတ်မည်မဟုတ်သည့်အပြင် container ကို
ပြန်လည်ဖန်တီးသည်နှင့် ဖယ်ရှားခံရမည်ဖြစ်သည်။

OmniRoute သည် ဤအခြေအနေကို ရှာဖွေသိရှိပြီး သင်အသုံးမပြုနိုင်သည့် အောင်မြင်ကြောင်း ရလဒ်ကို
တင်ပြမည့်အစား ညွှန်ကြားချက်များနှင့်အတူ ရေးသားမှုကို ငြင်းပယ်သည်။ CLI သည် `2` ဖြင့် ထွက်ပြီး API သည်
`containerEphemeralTarget: true` နှင့်အတူ `422` ကို ပြန်ပေးသည်။

### အကြံပြုချက်- CLI ကို host ပေါ်တွင်၊ OmniRoute ကို Docker တွင် လုပ်ဆောင်ပါ

Container သည် API ကို ဝန်ဆောင်မှုပေးပြီး CLI သည် သင့် host ကိရိယာများကို စီစဉ်သတ်မှတ်သည်။

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI ကို container သို့ ညွှန်ပါ
omniroute setup-codex                      # သင့် host ပေါ်ရှိ ~/.codex အစစ်ထဲသို့ ရေးသားသည်
```

Codex, Claude Code, Cursor သို့မဟုတ် အလားတူကိရိယာများကို သင့်
လက်ပ်တော့ပေါ်တွင် လုပ်ဆောင်သည့်အခါ ဤနည်းလမ်းသည် မှန်ကန်သော ရွေးချယ်မှုဖြစ်သည် — ပုံမှန်အားဖြင့်လည်း ဤကဲ့သို့ပင် စီစဉ်ထားကြသည်။

### အခြားနည်းလမ်း- host config directory များကို bind-mount လုပ်ပါ (`host` profile)

Container ကိုယ်တိုင်က သင့် host config ထဲသို့ ရေးသားစေလိုပါက directory များကို
mount လုပ်ပြီး `CLI_CONFIG_HOME` ကို mount root သို့ ညွှန်ပါ။ `host` profile တွင်
ဤသို့ ကြိုတင်စီစဉ်ထားပြီးဖြစ်သည်-

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount ကြောင့်သာ ထိုလမ်းကြောင်းကို ယုံကြည်စိတ်ချနိုင်ခြင်းဖြစ်သည်။ OmniRoute သည်
`/proc/self/mountinfo` ကို ဖတ်ပြီး mount လုပ်ထားသော လမ်းကြောင်းများသို့ ရေးသားမှုများကို ခွင့်ပြုသည် (ထို့အပြင်
၎င်းတို့၏ child directory များသည် mount များဖြစ်သည့် directory များကိုလည်း ခွင့်ပြုသည်၊ ယင်းမှာ အထက်ပါ `/host-home` ပုံစံနှင့် အတိအကျကိုက်ညီသည်)။ တစ်ချိန်တည်းတွင်
mount မလုပ်ထားသော လမ်းကြောင်းများကို ဆက်လက်ငြင်းပယ်ထားသည်။

### အရေးပေါ်ကျော်လွှားနည်း- container ၏ ကိုယ်ပိုင် CLI များကို စီစဉ်သတ်မှတ်ပါ (အလွန်လိုအပ်မှသာ အသုံးပြုပါ)

CLI များသည် container အတွင်း အမှန်တကယ် ရှိနေသည့်အခါ (`cli` profile) ရေးသားမှုသည်
ရည်ရွယ်ထားသော လုပ်ဆောင်ချက်ဖြစ်သည်။ မည်သည့် `setup-*` command မဆို `--allow-container-write` ကို ထည့်သွင်းပေးပါ၊ သို့မဟုတ် server အတွက်
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ကို သတ်မှတ်ပါ။ ရေးသားမှုကို ဆက်လက်လုပ်ဆောင်မည်ဖြစ်သော်လည်း
container ပျောက်သွားပါက ၎င်းလည်း ကျန်ရှိမည်မဟုတ်ကြောင်း သတိပေးချက် ပြသမည်ဖြစ်သည်။

> **လုံခြုံရေးသတိပေးချက် — `cli` profile + `docker.sock` mount။**
> `cli` profile သည် `/var/run/docker.sock` ကို bind-mount လုပ်ထားသဖြင့် container အတွင်းရှိ
> အလိုအလျောက် အပ်ဒိတ်လုပ်သည့်စနစ်သည် host daemon မှတစ်ဆင့် stack ကို ပြန်လည်ဖန်တီးနိုင်သည်
> (`src/lib/system/autoUpdate.ts` သည် ထို socket ရှိမရှိ စမ်းသပ်ပြီး
> မရှိပါက Docker လမ်းကြောင်းကို ကျော်သွားသည်)။ ထို socket သည် **host-root ယုံကြည်မှု
> နယ်နိမိတ်** ဖြစ်သည်။ ၎င်းကို ချိတ်ဆက်အသုံးပြုနိုင်သည့် မည်သည့်အရာမဆို host Docker daemon ကို
> root အဖြစ် ထိန်းချုပ်နိုင်သည် — host ပေါ်ရှိ မည်သည့် container မဆို ဖန်တီးခြင်း၊ စစ်ဆေးခြင်း၊ ရပ်တန့်ခြင်းနှင့် ဖယ်ရှားခြင်းတို့ကို ပြုလုပ်နိုင်သည်။
> အကျိုးဆက်များမှာ-
>
> 1. **`cli` profile ၏ port ကို network သို့ မည်သည့်အခါမျှ မဖွင့်ပါနှင့်။** ၎င်းကို
>    `127.0.0.1` ပေါ်တွင် publish လုပ်ပါ (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN မှ ချိတ်ဆက်နိုင်သော `cli` profile သည် dashboard အဆင့် RCE တစ်ခုခုကို
>    host အပြည့်အဝ ထိန်းချုပ်ခံရခြင်းအဖြစ် ပြောင်းလဲစေနိုင်သည်။
> 2. **နောက်ထပ် host directory မည်သည့်အရာကိုမျှ `cli` profile ထဲသို့ bind မလုပ်ပါနှင့်။**
>    Docker socket နှင့် နောက်ထပ် mount တစ်ခုခု ပေါင်းစပ်မိပါက container သည် သင့် filesystem နှင့် host config တို့ကို
>    အပြည့်အဝ ဖတ်/ရေးနိုင်သွားမည်ဖြစ်သည်။ ကိရိယာတစ်ခုက project တစ်ခုကို
>    မြင်ရန်လိုအပ်ပါက CLI binary ဖြင့် local တွင် လုပ်ဆောင်ပါ — ၎င်းကို
>    `cli` container ထဲသို့ mount မလုပ်ပါနှင့်။
>
> Container အတွင်း အလိုအလျောက် အပ်ဒိတ်လုပ်ရန် မလိုအပ်ပါက `cli` profile ကို မဖွင့်ထားပါနှင့်
> (`COMPOSE_PROFILES=core,redis` သို့မဟုတ် ပိုတိုသည့်ပုံစံ)။ အခြား profile များသည်
> Docker socket ကို mount မလုပ်ပါ။
>
> MITM နှင့်ဆိုင်သော ခြိမ်းခြောက်မှုပုံစံအတွက် `docs/security/MITM-TPROXY-DECRYPT.md` (git တွင်ရှိပြီး `/docs` ထဲသို့ compile မလုပ်ထားပါ) ကို ကြည့်ပါ။
> ထို့အပြင် `codex`/`claude-code`/`droid`/`openclaw` binary များ၏ မူလရင်းမြစ်ဆိုင်ရာ ကွင်းဆက်အတွက်
> `docs/security/SUPPLY_CHAIN.md` ကို ကြည့်ပါ။

## Redis Sidecar

OmniRoute သည် ဖြန့်ဝေထားသော rate limiter နှင့် မျှဝေထားသော cache ကို ပံ့ပိုးရန် Redis ကို အသုံးပြုသည်။ `redis` service ကို `docker-compose.yml` တွင် **အမြဲတမ်း သတ်မှတ်ထားပြီး** (profile gate မရှိပါ) အခြား မည်သည့် profile နှင့်မဆို အတူ စတင်သည်။

| အသေးစိတ်အချက်အလက်                | တန်ဖိုး                                    |
| -------------------------------- | ------------------------------------------ |
| Image                            | `redis:7-alpine`                           |
| Container အမည်                   | `omniroute-redis`                          |
| အတွင်းပိုင်း port                | `6379`                                     |
| Host port (အစားထိုးသတ်မှတ်နိုင်) | `REDIS_PORT` (မူလတန်ဖိုး `6379`)           |
| Host bind (အစားထိုးသတ်မှတ်နိုင်) | `REDIS_BIND_HOST` (မူလတန်ဖိုး `127.0.0.1`) |
| Volume                           | `omniroute-redis-data` → `/data`           |
| Healthcheck                      | `redis-cli ping` (ကြားကာလ 10s)             |

ဆက်စပ် environment variable များ-

- `REDIS_URL` — app ထဲသို့ ထည့်သွင်းပေးသည့် connection string (မူလတန်ဖိုး `redis://redis:6379`)။
- `REDIS_PORT` — Redis container အတွက် host ဘက်မှ port mapping။
- `REDIS_BIND_HOST` — port ကို publish လုပ်မည့် host interface။ မူလတန်ဖိုးမှာ `127.0.0.1` ဖြစ်သည်။

> **မူလအားဖြင့် loopback ကို အသုံးပြုရသည့်အကြောင်းရင်း:** sidecar သည် `requirepass` မပါဘဲ အလုပ်လုပ်ပြီး app
> container များက compose network (`redis:6379`) မှတစ်ဆင့် ၎င်းကို ဆက်သွယ်ကြသည် — publish လုပ်ထားသော port သည်
> host ဘက်ရှိ tool များ (`redis-cli`၊ local `npm run dev`) အတွက်သာ ဖြစ်သည်။ `0.0.0.0` ပေါ်တွင် publish လုပ်ပါက
> စစ်မှန်ကြောင်းအတည်ပြုမှုမရှိသည့် Redis ကို သင့် LAN ရှိ host တိုင်းထံ ဖွင့်ပေးရာ ရောက်မည်။ `REDIS_BIND_HOST=0.0.0.0` ဟု သတ်မှတ်ပါက
> service ၏ `command:` ထဲသို့ `--requirepass` ကိုလည်း ထည့်ပါ။

**Redis ကို ပိတ်ခြင်း** ကို မအကြံပြုပါ (rate limiter သည် in-memory fallback သို့ အဆင့်လျော့သွားမည်)။ မဖြစ်မနေ လုပ်ရမည်ဆိုပါက `docker-compose.yml` ထဲရှိ `redis:` service block ကို ဖယ်ရှား/မှတ်ချက်ပြုပါ၊ သို့မဟုတ် zero အထိ scale လုပ်ပါ-

```bash
docker compose up -d --scale redis=0
```

## Production Compose

dev နှင့်အတူ သီးခြားခွဲထားသော production snapshot တစ်ခုကို run ရန် `docker-compose.prod.yml` ကို အသုံးပြုပါ။

| အသေးစိတ်အချက်အလက်  | တန်ဖိုး                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| File               | `docker-compose.prod.yml`                                                                                |
| မူလ dashboard port | `PROD_DASHBOARD_PORT=20130` (အတွင်းပိုင်း `${DASHBOARD_PORT:-20128}` သို့ map လုပ်ထားသည်)                |
| မူလ API port       | `PROD_API_PORT=20131`                                                                                    |
| Image              | `omniroute:prod` (`runner-cli` target မှ build လုပ်ထားသည်)                                               |
| Redis container    | `omniroute-redis-prod` (`redis:8.6.2`၊ သီးသန့် `redis-prod-data` volume)                                 |
| Data volume        | `omniroute-prod-data` (အမည်ပေးထားပြီး rebuild များအကြား ဆက်လက်သိမ်းဆည်းထားသည်)                           |
| Healthcheck များ   | `node healthcheck.mjs` + `redis-cli ping`၊ Redis health ပေါ်မူတည်၍ gate လုပ်ထားသော `depends_on` ပါဝင်သည် |

အသုံးပြုပုံ-

```bash
# Production stack ကို build လုပ်ပြီး စတင်ပါ
docker compose -f docker-compose.prod.yml up -d --build

# Log များကို ဆက်တိုက်ကြည့်ရှုပါ
docker compose -f docker-compose.prod.yml logs -f

# ပိတ်သိမ်းပါ (volume များကို ဆက်လက်ထားရှိပါ)
docker compose -f docker-compose.prod.yml down
```

prod stack သည် dev compose နှင့်အပြိုင် အလုပ်လုပ်သည် (container အမည်များ၊ port များနှင့် volume များ မတူညီပါ)။ ထို့ကြောင့် production ကို ဆက်လက် run ထားစဉ် local တွင် ဆက်လက်ပြင်ဆင်စမ်းသပ်နိုင်သည်။

## Dockerfile အဆင့်များ

Repository တွင် အဆင့်များစွာပါဝင်သော Dockerfile (`Dockerfile`) ကို ထည့်သွင်းပေးထားသည်။ အဆင့်လေးခုကို အသုံးပြုနိုင်ပြီး သင့်အသုံးပြုမှုအခြေအနေအတွက် သင့်လျော်သော `target` ကို ရွေးချယ်ပါ။

| အဆင့်         | အခြေခံ image          | ရည်ရွယ်ချက်                                                                                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Dependencies များကို ထည့်သွင်းပြီး (`npm ci --legacy-peer-deps`) `npm run build` ကို လုပ်ဆောင်သည် (ပုံသေအားဖြင့် Turbopack — အောက်ရှိ Build-time အရင်းအမြစ်များကို ကြည့်ပါ)                                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone output ပါဝင်သော production runtime ဖြစ်သည်။ **Provider CLI များ မပါဝင်ပါ။**                                                                                                                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` နှင့် global CLI များဖြစ်သည့် `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw` တို့ကို ထည့်သွင်းပေးသည်။ **Agentic workflow များအတွက် ဤအဆင့်ကို ရွေးချယ်ပါ။**                                                                                                                                     |
| `runner-web`  | `runner-base`         | Web-session provider များဖြစ်သည့် `gemini-web`, `claude-web`, `claude-turnstile` အတွက် Playwright နှင့် Chromium browser (`--with-deps`) ကို ထည့်သွင်းပေးသည်။ **အဆိုပါ provider များကို အသုံးပြုသည့်အခါ ဤအဆင့်ကို ရွေးချယ်ပါ** — ၎င်းမပါသော သာမန် image သည် request လုပ်ချိန်တွင် အလုပ်မလုပ်ပါ (Release Channels အောက်ရှိ `-web` မှတ်ချက်ကို ကြည့်ပါ)။ |

သတ်မှတ်ထားသော target တစ်ခုကို ကိုယ်တိုင် build လုပ်ရန်-

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Build-time အရင်းအမြစ်များ

Build arg သုံးခုက `builder` အဆင့်၏ အရင်းအမြစ်သုံးစွဲမှုကို ထိန်းချုပ်သည်။ ၎င်းတို့သည် build လုပ်ချိန်အတွက်သာ ဖြစ်သည် —
`OMNIROUTE_MEMORY_MB` (အောက်တွင် ဖော်ပြထားသည်) သည် သီးခြား runtime ချိန်ညှိချက်တစ်ခု ဖြစ်သည်။

| Build arg                   | ပုံသေတန်ဖိုး | သက်ရောက်မှု                                                                                                          |
| --------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`          | `0` ဟု သတ်မှတ်ပါက webpack ဖြင့် build လုပ်သည်။ အမြင့်ဆုံး memory အသုံးပြုမှု ပိုနည်းသော်လည်း ပိုနှေးသည်။             |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | စတင်လုပ်ဆောင်ထားသော `next build` အတွက် V8 heap အများဆုံးကန့်သတ်ချက် (`--max-old-space-size`) ဖြစ်သည်။                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | `CIRCLE_NODE_TOTAL` သို့ တန်ဖိုးပေးသည်။ Next သည် page-data စုဆောင်းရန်အတွက် `workers = N - 1` ဟု တွက်ချက်သတ်မှတ်သည်။ |

Builder ကြီးတစ်ခုတွင် မြှင့်တင်သင့်သည့် တန်ဖိုးမှာ `OMNIROUTE_BUILD_WORKERS` ဖြစ်ပြီး အရင်းအမြစ်ကန့်သတ်ထားသော build တစ်ခုသည် **`✓ Compiled successfully` ပြီးနောက်** ရပ်သွားပါက ပထမဆုံး သံသယရှိသင့်သည့် တန်ဖိုးလည်း ၎င်းပင်ဖြစ်သည်။ Page-data worker တစ်ခုစီသည် သီးခြား process ဖြစ်ပြီး မူလ `next build` ကိုယ်တိုင်လည်း သီးခြား process တစ်ခုဖြစ်သည်။ တကယ့် VPS ပေါ်တွင် ပြန်လည်စမ်းသပ်မှုတစ်ခု (issue #7518) အရ process တစ်ခုစီ၏ အမြင့်ဆုံး RSS သည် `NODE_OPTIONS` heap flag နှင့် မသက်ဆိုင်ဘဲ ~4.5 GB ရှိကြောင်း တိုင်းတာတွေ့ရှိခဲ့သည် (Turbopack သည် V8 heap ပြင်ပရှိ native/Rust memory တွင် compile လုပ်သည်)။ ပုံသေတန်ဖိုး `2` (→ worker 1 ခု၊ စုစုပေါင်း process 2 ခု) ကို publish pipeline က အသုံးပြုသော 16 GB / 4 vCPU GitHub-hosted runner များနှင့် ကိုက်ညီအောင် သတ်မှတ်ထားသည်။ `8` (→ worker 7 ခု) ဟု သတ်မှတ်သောအခါ အဆိုပါ runner တွင် memory ကုန်ဆုံးသွားပြီး buildkit က `ResourceExhausted: ... cannot allocate memory` ဖြင့် အဆင့်ကို မအောင်မြင်စေခဲ့သည်။ Process တစ်ခုစီ၏ RSS ကို ခန့်မှန်းခြင်းအစား တိုက်ရိုက်တိုင်းတာသောအခါ `3` (→ worker 2 ခု) သည်လည်း memory အတွင်း မဆံ့သေးပါ။ `tests/unit/docker-build-memory-budget.test.ts` သည် တိုင်းတာထားသော ကိန်းဂဏန်းကို အသုံးပြု၍ တွက်ချက်ပြီး ချိန်ညှိချက်တစ်ခုခုက runner ၏ စွမ်းဆောင်ရည်ထက် ကျော်လွန်ပါက မအောင်မြင်စေသည်။

Turbopack သည် V8 heap ၏ **ပြင်ပ** တွင်ရှိသော native Rust memory ၌ compile လုပ်သောကြောင့် `OMNIROUTE_BUILD_MEMORY_MB` က ၎င်းကို ကန့်သတ်မပေးနိုင်ပါ။ Memory အများဆုံးကန့်သတ်ချက်ရှိသော host တစ်ခုတွင် build ကို OOM killer က မည်သည့် error စာသားမျှ မပြဘဲ SIGKILL လုပ်မည် — ၎င်းသည် `Creating an optimized production build` လုပ်နေစဉ် အလယ်တွင် ရိုးရှင်းစွာ ရပ်တန့်သွားသဖြင့် memory မလုံလောက်ခြင်းထက် လုပ်ငန်းစဉ် ရပ်ဆိုင်းနေသကဲ့သို့ ထင်ရသည်။ Build host တွင် အရင်းအမြစ်ကန့်သတ်ထားပါက bundler ကို ပြောင်းပါ-

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` ကို ဖွင့်ထားသောကြောင့် `next build` သည် မူလ process **နှင့်** worker process တစ်ခုကို လုပ်ဆောင်ပြီး process တစ်ခုစီက `OMNIROUTE_BUILD_MEMORY_MB` ကို သီးခြားစီ လိုက်နာသည်။ Container ၏ အများဆုံးကန့်သတ်ချက်ကို အဆိုပါတန်ဖိုး၏ တစ်ဆမဟုတ်ဘဲ ခန့်မှန်းခြေအားဖြင့် နှစ်ဆထက်ပို၍ သတ်မှတ်ပါ။

ဤ tree တွင် တိုင်းတာထားသော ရလဒ်များ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`)-

| Bundler   | Container အများဆုံးကန့်သတ်ချက် | ရလဒ်                                                                   |
| --------- | ------------------------------ | ---------------------------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB                 | နှစ်ခုစလုံးတွင် မည်သည့်အကြောင်းကြားချက်မျှမရှိဘဲ OOM-killed ဖြစ်ခဲ့သည် |
| webpack   | 8 GiB                          | Build worker သည် SIGKILLed ဖြစ်ခဲ့သည်                                  |
| webpack   | 12 GiB                         | အောင်မြင်ခဲ့ပြီး အမြင့်ဆုံး 11.1 GiB အထိ အသုံးပြုခဲ့သည်                |

### Runtime ပုံသေတန်ဖိုးများ

`runner-base` က export လုပ်ပေးသော ပုံသေတန်ဖိုးများမှာ `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations` တို့ဖြစ်သည်။

Docker အတွင်းရှိ memory ပြုမူပုံ-

- Image သည် `OMNIROUTE_MEMORY_MB=1024` ကို သတ်မှတ်ပြီး ၎င်းမှ `NODE_OPTIONS=--max-old-space-size=1024` ကို ဆင်းသက်သတ်မှတ်သည်။
- အမှန်တကယ် server process ကို standalone launcher က စတင်ပေးပြီး ၎င်းသည် `OMNIROUTE_MEMORY_MB` ကို ဖတ်ကာ `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` ကို ထပ်ဖြည့်သည်။
- Node သည် ထပ်ခါတလဲလဲ သတ်မှတ်ထားသော `--max-old-space-size` တန်ဖိုးများအနက် နောက်ဆုံးတန်ဖိုးကို အသုံးပြုသောကြောင့် `OMNIROUTE_MEMORY_MB` ကို သတ်မှတ်ခြင်းဖြင့် အမှန်တကယ်သက်ရောက်သော Docker heap ကန့်သတ်ချက်ကို ထိန်းချုပ်နိုင်သည်။
- Image က ၎င်းကို အမြဲသတ်မှတ်ထားသောကြောင့် launcher ၏ RAM ပမာဏအလိုက် ချိန်ညှိသည့် အရန်တန်ဖိုးသည် Docker အောက်တွင် မည်သည့်အခါမျှ သက်ရောက်မှုမရှိပါ။ အလုပ်ဝန်အတွက် ၎င်းကို တိတိကျကျ မြှင့်သတ်မှတ်ပါ (အောက်ပါဇယားကို ကြည့်ပါ)။ Coding-agent `/v1/responses` အတွက် `2048` သည်ပင် သေးလွန်းနေသေးသည်။

### Coding agent များအတွက် runtime RAM

1 GiB Docker မူလတန်ဖိုးသည် production အရွယ်အစားမဟုတ်ဘဲ dashboard/ပေါ့ပါးသော chat အတွက် အနိမ့်ဆုံးပမာဏသာ ဖြစ်သည်။ ရှည်လျားသော `POST /v1/responses` body များ (message ရာပေါင်းများစွာနှင့် tool ဆယ်ဂဏန်းများစွာ) သည် compression ပြုလုပ်နေစဉ် in-memory graph အများအပြားကို ဆက်လက်ထိန်းသိမ်းထားသည်။ တစ်ပြိုင်နက်တည်း ထပ်နေသော ~3 MiB / ~750k-token request နှစ်ခုကြောင့် **12 GiB** old-space တွင် V8 ရပ်တန့်ခဲ့ဖူးပြီး (`FATAL ERROR: Reached heap limit`) 16 GiB cgroup OOM ကိုလည်း ဖြစ်ပေါ်စေခဲ့သည်။ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ကို ကြည့်ပါ။

**cgroup `--memory` ကို heap ထက်ပိုကြီးအောင် သတ်မှတ်ပါ** — native buffer များ၊ SQLite နှင့် compression ကြားခံဒေတာများသည် V8 ပြင်ပတွင် ရှိသည်။

| အလုပ်ဝန်                                                            | `OMNIROUTE_MEMORY_MB`              | Container / cgroup                   | မှတ်ချက်                                                                                                                 |
| ------------------------------------------------------------------- | ---------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Dashboard၊ ပေါ့ပါးသော chat တစ်ခု                                    | `1024` (image မူလတန်ဖိုး)          | ≥2 GiB                               |                                                                                                                          |
| Coding agent တစ်ခု (Claude/Codex/Grok)                              | `8192`                             | ≥10 GiB                              | ပုံမှန် single-session `/v1/responses`                                                                                   |
| တစ်ပြိုင်နက်တည်း လုပ်ဆောင်နေသော ရှည်လျားသည့် `/v1/responses` နှစ်ခု | `10240`–`12288`                    | ≥12–16 GiB                           | ~12 GiB heap တွင် V8 ရပ်တန့်မှုကို တိုင်းတာတွေ့ရှိခဲ့သည်                                                                 |
| တစ်ပြိုင်နက်တည်း ရှည်လျားသော context သုံးခုနှင့်အထက်                | process တစ်ခုတည်းတွင် မလုပ်ပါနှင့် | အစဉ်လိုက်လုပ်ဆောင်ပါ / RAM ပိုထည့်ပါ | မူလ heavyweight admission သည် in-flight 1 ခုဖြစ်သည်။ RAM မတိုးဘဲ ၎င်းကို မြှင့်ခြင်းက ရပ်တန့်မှုကို ပြန်လည်ဖြစ်ပေါ်စေသည် |

Bare metal ပေါ်ရှိ `omniroute serve` သည် `OMNIROUTE_MEMORY_MB` ကို **မသတ်မှတ်ထားသည့်အခါ** RAM ၏ ~35% ခန့်ကို ချိန်ညှိသတ်မှတ်သည် (`[512, 4096]` အတွင်း ကန့်သတ်ထားသည်)။ Docker သည် `1024` ကို အမြဲသတ်မှတ်သောကြောင့် official image တွင် ထိုချိန်ညှိမှုသည် မည်သည့်အခါမျှ မလုပ်ဆောင်ပါ။

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## အရေးကြီးသော Environment Variable များ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) တွင် မှတ်တမ်းတင်ထားသော မူလသတ်မှတ်ချက်များအပြင် Docker အောက်တွင် အသုံးပြုသည့်အခါ အောက်ပါ variable များသည် အရေးအကြီးဆုံးဖြစ်သည်-

| Variable                      | ရည်ရွယ်ချက်                                                                                                                                                                                                                                                                                                           | မူလတန်ဖိုး                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket bridge အတွက် မျှဝေသုံးစွဲသည့် လျှို့ဝှက်တန်ဖိုး။ **Production တွင် မဖြစ်မနေလိုအပ်သည်** — ခန့်မှန်းရခက်သော ကျပန်းစာကြောင်းတစ်ခုအဖြစ် သတ်မှတ်ပါ။                                                                                                                                                              | မသတ်မှတ်ထားပါ (ထည့်သွင်းပေးရမည်) |
| `REDIS_URL`                   | Rate limiter / cache backend အတွက် ချိတ်ဆက်မှုစာကြောင်း                                                                                                                                                                                                                                                               | `redis://redis:6379`             |
| `REDIS_PORT`                  | ပူးတွဲပါဝင်သော Redis container အတွက် host ဘက်ရှိ port                                                                                                                                                                                                                                                                 | `6379`                           |
| `REDIS_BIND_HOST`             | ပူးတွဲပါဝင်သော Redis port ကို ထုတ်ပြန်ထားသည့် host interface (AUTH ထည့်သွင်းမထားလျှင် loopback)                                                                                                                                                                                                                       | `127.0.0.1`                      |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ကိုယ်တိုင် update လုပ်သည့် workflow များအတွက် `cli` profile ထဲရှိ `/workspace/omniroute` သို့ mount လုပ်ထားသော host path                                                                                                                                                                                              | `.` (လက်ရှိ directory)           |
| `OMNIROUTE_MEMORY_MB`         | Docker standalone server အတွက် runtime Node heap ၏ အများဆုံးပမာဏဖြစ်ပြီး အထက်ပါ image မူလတန်ဖိုးကို အစားထိုးသတ်မှတ်သည်။ Coding agent များအတွက်- `8192`+ ([runtime RAM](#runtime-ram-for-coding-agents) ကိုကြည့်ပါ)။                                                                                                   | `1024`                           |
| `DASHBOARD_PORT` / `API_PORT` | Dashboard (20128) နှင့် API (20129) အတွက် ဖွင့်ပြထားသော port များကို အစားထိုးသတ်မှတ်ရန်                                                                                                                                                                                                                               | `20128` / `20129`                |
| `APP_BIND_HOST`               | docker-compose က dashboard/API/live-WS port များကို ထုတ်ပြန်သည့် host interface။ `REQUIRE_API_KEY=false` (မူလတန်ဖိုး) ဖြစ်ပါက `0.0.0.0` သည် အမည်မဖော်ဘဲ အသုံးပြုနိုင်သော `/v1` proxy ကို LAN သို့ ဖွင့်ပေးသည် — `REQUIRE_API_KEY=true` ဖြစ်မှသာ သို့မဟုတ် အရှေ့တွင် reverse proxy ရှိမှသာ ပိုမိုကျယ်ပြန့်စွာ ဖွင့်ပါ။ | `127.0.0.1`                      |
| `CLIPROXY_BIND_HOST`          | docker-compose က `cliproxyapi` sidecar ကို ထုတ်ပြန်သည့် host interface — ၎င်း၏ data volume တွင် provider အထောက်အထားများကို သိမ်းဆည်းထားသည်။                                                                                                                                                                           | `127.0.0.1`                      |
| `OMNIROUTE_PLUGINS_DIR`       | Runtime plugin scanner က ဖတ်ရှုပြီး install လုပ်သည့် directory။ Plugin များကို bind-mount လုပ်ထားသည့်အခါ ၎င်းကို သတ်မှတ်ပါ။ မူလတန်ဖိုးသည် `HOME` ကို လိုက်နာပြီး image တစ်ခုက ၎င်းကို export လုပ်ထားမည်ဟု မသေချာပါ။                                                                                                   | `~/.omniroute/plugins`           |
| `OMNIROUTE_BASE_PATH`         | App ကို reverse proxy နောက်ကွယ်တွင် ထုတ်ပြန်သည့်အခါ အသုံးပြုသော URL subpath (ဥပမာ `/omniroute`)                                                                                                                                                                                                                       | _(ဗလာ = root)_                   |
| `NEXT_PUBLIC_BASE_URL`        | Subpath ပါဝင်သော အများသုံး browser origin (ဥပမာ `https://host/omniroute`)                                                                                                                                                                                                                                             | မသတ်မှတ်ထားပါ                    |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` အတွက် host ဘက်ရှိ dashboard port                                                                                                                                                                                                                                                            | `20130`                          |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar အတွက် host ဘက်ရှိ port                                                                                                                                                                                                                                                                          | `8317`                           |

## လမ်းကြောင်းခွဲတစ်ခုပေါ်ရှိ Reverse Proxy (Traefik / nginx)

Next.js `basePath` ကို standalone bundle ထဲသို့ compile လုပ်ထားသည်။ OmniRoute သည် app root ရှိ sentinel file တစ်ခုတွင် ထည့်သွင်းထားသော တန်ဖိုးကို မှတ်တမ်းတင်သည် (`npm run build` လုပ်စဉ် ရေးသားပြီး `scripts/docker/ensure-docker-base-path.mjs` က ဖတ်သည်)။ ထို့နောက် container စတင်သည့်အခါ ၎င်းတန်ဖိုးကို `OMNIROUTE_BASE_PATH` နှင့် နှိုင်းယှဉ်သည်။ တန်ဖိုးများ မတူညီဘဲ image ကို domain root အတွက် build လုပ်ထားပါက entrypoint သည် `node dev/run-standalone.mjs` မလည်ပတ်မီ standalone manifests များ၊ ထည့်သွင်းထားသော `basePath`/`assetPrefix` literal များ (Next 16 သည် SSR asset URL များကို `assetPrefix` တစ်ခုတည်းမှ render လုပ်သည် — patcher က လမ်းကြောင်းခွဲကို ၎င်းထဲသို့ ကူးထည့်ပေးသည်)၊ ထည့်သွင်းထားသော `/_next/static` asset URL များ (client-reference manifests၊ media imports၊ ကြိုတင် render လုပ်ထားသော error pages) နှင့် client `process.env` shim တို့ကို ပြန်လည်ရေးသားသည်။

### Compose build (အကြံပြုထားသည်)

Variable နှစ်ခုလုံးကို `.env` တွင် သတ်မှတ်ပြီး image နှင့် runtime ကိုက်ညီစေရန် ပြန်လည် build လုပ်ပါ-

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` သည် `OMNIROUTE_BASE_PATH` ကို Docker build-arg အဖြစ်နှင့် runtime environment variable အဖြစ် ပေးပို့သည်။

### ကြိုတင် build လုပ်ထားသော root image + runtime လမ်းကြောင်းခွဲ

ထုတ်ဝေထားသော `diegosouzapw/omniroute:*` image များကို domain root အတွက် build လုပ်ထားသည်။ Runtime တွင် `OMNIROUTE_BASE_PATH` ကို သတ်မှတ်နိုင်ဆဲဖြစ်ပြီး container စတင်ချိန်တွင် bundle ကို တစ်ကြိမ် patch လုပ်ပေးမည်။ ၎င်းနှင့် ကိုက်ညီသော public origin ကို တွဲဖက်သတ်မှတ်ပါ-

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ပြင်ပလမ်းကြောင်း **အပြည့်အစုံ** ကို ပေးပို့ရန် reverse proxy ကို စီစဉ်သတ်မှတ်ပါ (ရှေ့ဆက်စာသားကို မဖယ်ရှားပါနှင့်)။ Next.js က `/omniroute/...` ကို လက်ခံရရှိပြီး `/omniroute/_next/...` မှ asset များကို ပေးပို့နိုင်စေရန် Traefik သည် `StripPrefix` မပါဘဲ `PathPrefix(`/omniroute`)` ကို container ထံ route လုပ်သင့်သည်။

Docker healthcheck သည် အသုံးပြုနေသော `OMNIROUTE_BASE_PATH` ကို ရှေ့တွင် ထည့်ထားသည့် ပေါ့ပါးသော `/healthz` lifecycle endpoint ကို စစ်ဆေးသည်။ လူကိုယ်တိုင် သို့မဟုတ် dashboard မှ diagnostic စစ်ဆေးမှုများအတွက် `/api/monitoring/health` ကို ဆက်လက်အသုံးပြုနိုင်သည်။ Container HEALTHCHECK ကို ထိုလမ်းကြောင်းသို့ ပြန်ညွှန်လိုပါက (ဥပမာ deep health enforcement အတွက်) `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` ကို သတ်မှတ်ပါ။ ထိုလမ်းကြောင်းသည် **နက်ရှိုင်းသော** စစ်ဆေးမှု (DB + monitoring summary) ဖြစ်သည် — ပြန်လည်အသုံးပြုရန် ရွေးချယ်ပါက Docker ၏ အကြိမ်ရေနည်းသော `HEALTHCHECK` အတွက် သင့်လျော်သော်လည်း Kubernetes `livenessProbe` ကြားကာလများအတွက်မူ **မသင့်လျော်ပါ**။

Orchestrator များ (Kubernetes၊ Nomad စသည်) အတွက်-

| Probe           | ဦးစားပေးရန်                                                                    | ရှောင်ကြဉ်ရန်                                                                                     |
| --------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez` သို့မဟုတ် အဓိက port (`PORT`၊ မူလတန်ဖိုး `20128`) ပေါ်ရှိ TCP | Liveness အဖြစ် `/api/monitoring/health` ကို အသုံးပြုခြင်း                                         |
| Readiness       | HTTP `GET /healthz`                                                            | Event loop အလုပ်များနေခြင်းကို process သေဆုံးခြင်းအဖြစ် သတ်မှတ်သည့် တင်းကျပ်လွန်းသော timeout များ |
| Deep / blackbox | `/api/monitoring/health`                                                       | —                                                                                                 |

`/healthz` သည် process lifecycle (`ok` / `starting` / `stopping`) ကို အစီရင်ခံသည်။ `/livez` သည် process အသက်ရှင်နေမှုကိုသာ စစ်ဆေးသည် (handler လည်ပတ်နိုင်သည့်အခါတိုင်း 200 ပြန်ပေးပြီး readiness ကို မစောင့်ပါ)။ နှစ်ခုစလုံးသည် request များကို ကိုင်တွယ်သည့် Node event loop တစ်ခုပေါ်တွင်ပင် လည်ပတ်သောကြောင့် CPU-bound catalog သို့မဟုတ် compression အလုပ်များက ၎င်းတို့ကို နှောင့်နှေးစေနိုင်သည် — အလုပ်များနေခြင်း ≠ သေဆုံးနေခြင်း။ HTTP probe များ timeout ဖြစ်ပါက TCP liveness ကို ဦးစားပေးပါ။ Probe လမ်းညွှန်ချက်အပြည့်အစုံ-
[Monitoring လမ်းညွှန် — Kubernetes probe အကြံပြုချက်များ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)။

## Caddy ဖြင့် Docker Compose (HTTPS Auto-TLS)

Caddy ၏ အလိုအလျောက် SSL စီစဉ်ပေးမှုကို အသုံးပြု၍ OmniRoute ကို လုံခြုံစွာ ပြင်ပသို့ ဖွင့်ပေးနိုင်သည်။ သင့်ဒိုမိန်း၏ DNS A record သည် သင့်ဆာဗာ၏ IP ကို ညွှန်ပြထားကြောင်း သေချာစေပါ။

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
      # OAuth callback များ၊ dashboard လင့်ခ်များနှင့် ထုတ်လုပ်ထားသော အများသုံး URL များအတွက် ဘရောက်ဇာဘက်မှ အသုံးပြုသည့် origin။
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # စီစဉ်ထားသော အလုပ်များ / ကိုယ်တိုင် fetch လုပ်ခြင်းများအတွက် အတွင်းပိုင်း server-to-server URL။
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

Caddy သည် upstream container အတွက် စံ forwarding header များကို သတ်မှတ်ပေးသည်။ OmniRoute သည်
OAuth callback များနှင့် ထုတ်လုပ်ထားသော အများသုံးလင့်ခ်များအတွက် `NEXT_PUBLIC_BASE_URL` ကို တရားဝင်
public origin အဖြစ် အသုံးပြုသည်။ အထောက်အထားစိစစ်ပြီးသော dashboard write များသည် same-origin request များနှင့်
session-bound CSRF ကာကွယ်မှုကို အသုံးပြုသည်။ တိကျစွာ သတ်မှတ်ထားသော configuration အစား
ယုံကြည်ရသည့် forwarded header များမှ public origin ကို OmniRoute အား ရယူစေလိုသည့် အဆင့်မြင့် deployment များတွင်သာ
`OMNIROUTE_TRUST_PROXY` ကို ဖွင့်ပါ။

## Cloudflare Quick Tunnel

Docker deployment များအတွက် Dashboard ပံ့ပိုးမှုတွင် `Dashboard → Endpoints` ရှိ တစ်ချက်နှိပ်ရုံဖြင့် အသုံးပြုနိုင်သော **Cloudflare Quick Tunnel** ပါဝင်သည်။ ပထမဆုံး ဖွင့်သည့်အခါ လိုအပ်မှသာ `cloudflared` ကို ဒေါင်းလုဒ်လုပ်ပြီး၊ လက်ရှိ `/v1` endpoint သို့ ယာယီ tunnel တစ်ခု စတင်ကာ ထုတ်ပေးထားသော `https://*.trycloudflare.com/v1` URL ကို သာမန် public URL အောက်တွင် တိုက်ရိုက်ပြသသည်။

Endpoint tunnel panel များ (Cloudflare၊ Tailscale၊ ngrok) ကို လက်ရှိ tunnel အခြေအနေ မပြောင်းလဲဘဲ `Settings → Appearance` မှ ပြသနိုင်သည် သို့မဟုတ် ဖျောက်ထားနိုင်သည်။

### Tunnel မှတ်ချက်များ

- Quick Tunnel URL များသည် ယာယီဖြစ်ပြီး restart လုပ်တိုင်း ပြောင်းလဲသည်။
- OmniRoute သို့မဟုတ် container ကို restart လုပ်ပြီးနောက် Quick Tunnel များကို အလိုအလျောက် ပြန်လည်ဖွင့်ပေးမည် မဟုတ်ပါ။ လိုအပ်သည့်အခါ dashboard မှ ပြန်လည်ဖွင့်ပါ။
- Managed install သည် လက်ရှိတွင် `x64` / `arm64` ပေါ်ရှိ Linux၊ macOS နှင့် Windows ကို ပံ့ပိုးထားသည်။
- Managed Quick Tunnel များသည် အရင်းအမြစ်ကန့်သတ်ထားသော container environment များတွင် ဆူညံသော QUIC UDP buffer သတိပေးချက်များကို ရှောင်ရှားရန် မူလအတိုင်း HTTP/2 transport ကို အသုံးပြုသည်။ အခြား transport တစ်ခုကို အသုံးပြုလိုပါက `CLOUDFLARED_PROTOCOL=quic` သို့မဟုတ် `auto` ဟု သတ်မှတ်ပါ။
- Docker image များတွင် system CA root များ ပါဝင်ပြီး ၎င်းတို့ကို managed `cloudflared` သို့ ပေးပို့သည်။ ထို့ကြောင့် container အတွင်း tunnel စတင်ချိတ်ဆက်စဉ် TLS trust failure များကို ရှောင်ရှားနိုင်သည်။
- OmniRoute အား အသစ်တစ်ခု ဒေါင်းလုဒ်လုပ်မည့်အစား ရှိပြီးသား binary တစ်ခုကို အသုံးပြုစေလိုပါက `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ဟု သတ်မှတ်ပါ။

## Image Tag များ

| Image                    | Tag      | အရွယ်အစား | ဖော်ပြချက်                                                                          |
| ------------------------ | -------- | --------- | ----------------------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB    | ထုတ်ဝေထားသော stable SemVer များအနက် အမြင့်ဆုံး (**published**) (git `main` မဟုတ်ပါ) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB    | GitOps အတွက် ဤ tag အမျိုးအစားကို အတိအကျ သတ်မှတ်အသုံးပြုပါ                           |

Multi-platform manifest: မူရင်း `linux/amd64` + `linux/arm64` (Apple Silicon၊ AWS Graviton၊ Raspberry Pi)။ Docker သည် ကိုက်ညီသည့် architecture ကို အလိုအလျောက် ရွေးချယ်ပေးသည်။ ARM host များတွင် AMD64 emulation ကို အတင်းအကျပ် အသုံးပြုရန်လိုအပ်ပါက `--platform linux/amd64` ကို ထည့်သွင်းပါ။

### Release Channel များ

OmniRoute သည် stable release များ၊ လက်ရှိအသုံးပြုနေသော release branch စမ်းသပ်မှုများနှင့် development build များအတွက် သီးခြား Docker channel များကို ထုတ်ဝေသည်။

| Channel                         | အရင်းအမြစ်                                        | ပြောင်းလဲနိုင်မှု                     | အကြံပြုထားသော အသုံးပြုမှု                                                                                                                   |
| ------------------------------- | ------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | လက်မှတ်ထိုးထားပြီး version သတ်မှတ်ထားသည့် release | ပြောင်းလဲ၍မရ                          | release အတိအကျတစ်ခုကို အတည်ပြုသတ်မှတ်အသုံးပြုသည့် production deployment များ                                                                |
| `:latest` / `:latest-web`       | ထုတ်ဝေထားသော stable SemVer များအနက် အမြင့်ဆုံး    | ပြောင်းလဲနိုင်သော stable pointer      | SemVer publish job ပြီးနောက် stable release များကို လိုက်နာသည် — `main` သို့မဟုတ် မထုတ်ဝေရသေးသော `release/v*` commit များကို **မလိုက်နာပါ** |
| `:next` / `:next-web`           | လက်ရှိ မူလသတ်မှတ်ထားသော `release/v*` branch       | ပြောင်းလဲနိုင်သော pre-release pointer | လက်ရှိ release branch သို့ ရောက်ရှိပြီးသော်လည်း stable release တစ်ခုထဲတွင် မပါဝင်သေးသော ပြင်ဆင်ချက်များကို စမ်းသပ်ခြင်း                     |
| `:main` / `:main-web`           | `main` branch                                     | ပြောင်းလဲနိုင်သော development pointer | Development နှင့် integration စမ်းသပ်မှုအတွက်သာ                                                                                             |

#### Web-session provider များ: `-web` image များ

အထက်ပါ channel တစ်ခုစီတွင် `runner-web` stage မှ တည်ဆောက်ထားသော `-web` tag (`:latest-web`၊ `:<version>-web`၊ `:next-web`၊ `:main-web`) တစ်ခုစီလည်း ရှိသည် — ၎င်းသည် တူညီသော image တွင် Playwright နှင့် Chromium browser ကို ထပ်မံထည့်သွင်းထားခြင်းဖြစ်သည်။ ပုံမှန် image တွင် Chromium **မပါဝင်ပါ**။ `gemini-web`၊ `claude-web` နှင့် `claude-turnstile` တို့သည် ၎င်းကို လိုအပ်သည်။

အမှားသည် startup အချိန်တွင် ဖြစ်ပေါ်ခြင်းမဟုတ်ဘဲ နောက်မှသာ ဖြစ်ပေါ်သည်။ ထို provider များသည် ၎င်းတို့၏ model များကို စာရင်းပြသပြီး dashboard တွင် ချိတ်ဆက်ထားသည့်ပုံစံဖြင့် ပြသသော်လည်း ပထမဆုံး request တွင်သာ အောက်ပါအမှားဖြင့် ပျက်ကွက်သည်။

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

ထို provider များကို အသုံးပြုပါက လက်ရှိအသုံးပြုနေသော channel ၏ `-web` tag ကို pull လုပ်ပါ — အခြားမည်သည့်အရာမျှ ပြောင်းလဲရန်မလိုပါ။ npm/CLI install တစ်ခုတွင် (Docker image မပါဘဲ) တူညီစွာ ပျောက်ဆုံးနေသည့် အစိတ်အပိုင်းမှာ browser binary ဖြစ်သည်။ host ပေါ်တွင် `npx playwright install chromium` ကို run ပါ။

#### Pre-release channel ကို အသုံးပြုခြင်း

လက်ရှိ မူလသတ်မှတ်ထားသော `release/v*` branch သို့ push လုပ်တိုင်း `next` channel ကို ပြန်လည်တည်ဆောက်ပြီး AMD64 နှင့် ARM64 နှစ်မျိုးလုံးအတွက် ထုတ်ဝေသည်။ အဟောင်း maintenance branch များသည် ၎င်းကို overwrite မလုပ်နိုင်ပါ။ ဤ channel သည် နောက်ထပ် stable tag မထုတ်မီ လက်ရှိ release branch ထဲသို့ merge လုပ်ပြီးသော ပြင်ဆင်ချက်များအတွက် pull လုပ်နိုင်သည့် image ကို ပံ့ပိုးပေးသည်။

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose အတွက် ရွေးချယ်ထားသည့် profile က အသုံးပြုသော image tag ကို override လုပ်ပြီးနောက် service ကို pull လုပ်ကာ ပြန်လည်ဖန်တီးပါ။

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### လုံခြုံရေးနှင့် နောက်ပြန်ပြန်သွားခြင်း

`next` သည် အလိုက်သင့်ပြောင်းလဲနေသော pre-release channel ဖြစ်သည်။ လက်ရှိ release branch သို့ push လုပ်သည့်အခါတိုင်း ပြောင်းလဲနိုင်ပြီး **production အသုံးပြုမှုအတွက် ပံ့ပိုးမထားပါ**။ သီးခြား build တစ်ခုကို အကဲဖြတ်နေစဉ် image digest ကို အတိအကျ သတ်မှတ်အသုံးပြုပါ။

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

မစမ်းသပ်မီ OmniRoute data volume သို့မဟုတ် bind-mount လုပ်ထားသော data directory ကို backup ပြုလုပ်ပါ။ နောက်ပြန်ပြန်သွားရန် ယခင်အသုံးပြုခဲ့သည့် stable version သို့မဟုတ် digest ကို ပြန်လည်အသုံးပြုပြီး container ကို ပြန်လည်ဖန်တီးပါ။

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Release branch build တစ်ခုသည် `latest` ကို မည်သည့်အခါမျှ ရွှေ့ပြောင်းနိုင်မည်မဟုတ်ပါ။ သတ်မှတ်ချက်နှင့် ကိုက်ညီသော stable semantic version တစ်ခုသာ stable pointer ကို မြှင့်တင်နိုင်သည်။ `next` image များတွင် release image စစ်ဆေးမှုနှင့် ပိတ်ဆို့တားဆီးသည့် CRITICAL-vulnerability gate ကို ဆက်လက်ထိန်းသိမ်းထားသည်။

**`latest` သည် git အတွက် နောက်ဆုံးအခြေအနေဖြစ်ကြောင်း အာမခံချက်မဟုတ်ပါ။** `main` သို့မဟုတ် လက်ရှိ `release/v*` branch ပေါ်ရှိ merge လုပ်ပြီးသော ပြင်ဆင်ချက်များသည် stable SemVer image တစ်ခုကို ထုတ်ဝေပြီး publish job က `:latest` ကို မြှင့်တင်ပေးသည့်အချိန်အထိ `:latest` ထဲတွင် **မပါဝင်ပါ** (ထို SemVer နှင့် digest တူညီသည်)။ GitHub တွင် ပြင်ဆင်ချက်ကို ပြသပြီးဖြစ်သော်လည်း `latest` က ပြောင်းလဲခြင်းမရှိသည့်ပုံပေါ်နေပါက release branch ကို စမ်းသပ်ရန် `:next` ကို pull လုပ်ပါ သို့မဟုတ် SemVer tag ထွက်လာသည်အထိ စောင့်ပါ။

| သင်လိုချင်သည့်အရာ                                                                                  | အသုံးပြုရန်                                                    |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| ပြောင်းလဲမှုမဖြစ်ရမည့် GitOps / production                                                         | `:X.Y.Z` (သို့မဟုတ် image digest) ကို အတိအကျ သတ်မှတ်အသုံးပြုပါ |
| ထုတ်ဝေထားသော stable release များကို လိုက်နာပြီး release တစ်ခုစီတွင် ပြန်လည်ဖန်တီးမှုကို လက်ခံခြင်း | `:latest`                                                      |
| မထုတ်ဝေရသေးသော `release/v*` commit များကို စမ်းသပ်ခြင်း                                            | `:next` (production မဟုတ်ပါ)                                   |
| `main` ကို စမ်းသပ်ခြင်း                                                                            | `:main` (production မဟုတ်ပါ)                                   |

## ရရှိနိုင်မှု: မူလ SQLite သည် replica တစ်ခုတည်းသာ ဖြစ်သည်

ပုံမှန် Docker / Kubernetes OmniRoute တွင် **Node process တစ်ခု + SQLite writer တစ်ခု** သာ ပါဝင်သည်။ ဤ topology တွင် high availability ကို **မပံ့ပိုးပါ**။

| ကန့်သတ်ချက်                                                         | အကျိုးဆက်                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Writer တစ်ခုတည်း                                                    | SQLite file တစ်ခုတည်းကို အသုံးပြု၍ replica အများအပြားကို **မလည်ပတ်ပါနှင့်**။ ထိုသို့လုပ်ပါက DB ပျက်စီးသွားမည်။                                                                                                                                                                                                                                                                                         |
| ပြန်လည်ဖန်တီးခြင်း / ပြန်စတင်ခြင်း / HEALTHCHECK ဖြင့် ရပ်တန့်ခြင်း | လုပ်ဆောင်ဆဲ SSE များ၊ dashboard session များနှင့် memory အတွင်းရှိ state များ **လုံးဝပြတ်တောက်သွားမည်**။ ချိတ်ဆက်ထားသော client အားလုံး ပြတ်တောက်သွားမည်။ Endpoint မရှိသည့် အချိန်ကာလအတွင်း request အသစ်များသည် OmniRoute JSON မဟုတ်ဘဲ reverse-proxy **`502 Bad Gateway: Unknown error`** ကို ရရှိမည်ဖြစ်သောကြောင့် client များအနေဖြင့် ၎င်းကို provider ချို့ယွင်းမှုနှင့် ခွဲခြားမသိနိုင်ပါ (#11015)။ |
| `/healthz` နှင့် event loop တစ်ခုတည်း အသုံးပြုခြင်း                 | အလုပ်များနေသော catalog သို့မဟုတ် compression tick က probe များကို နှောင့်နှေးစေနိုင်ပြီး timeout တိုလွန်းပါက **တစ်ခုတည်းသော** replica ကို ပြန်လည်စတင်စေမည်။                                                                                                                                                                                                                                            |

**Probe ဇယား** ([Kubernetes probe အကြံပြုချက်များ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ကိုလည်း ကြည့်ပါ):

| Probe                      | ပစ်မှတ်                                                                | မသုံးရမည့်အရာ                                                                                  |
| -------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Liveness                   | `PORT` (မူလတန်ဖိုး `20128`) ပေါ်ရှိ TCP သို့မဟုတ် soft HTTP `/healthz` | `/api/monitoring/health`                                                                       |
| Readiness                  | HTTP `GET /healthz`                                                    | Event loop အလုပ်များနေခြင်းကို process သေဆုံးခြင်းဟု သတ်မှတ်သည့် တင်းကျပ်လွန်းသော timeout များ |
| အသေးစိတ်စစ်ဆေးမှု / လူများ | `/api/monitoring/health`                                               | အလိုအလျောက် kubelet liveness                                                                   |

**အဆင့်မြှင့်တင်မှုများ:** session အားလုံး ပြတ်တောက်မည်ဟု မျှော်လင့်ထားပါ။ ဖြစ်နိုင်ပါက client များကို drain လုပ်ပါ။ မူလ SQLite တွင် rolling update မရှိပါ။ Compose `restart: unless-stopped` နှင့် Docker `HEALTHCHECK` တို့သည် container က Unhealthy ဖြစ်သည့်အခါ တစ်ခုတည်းသော process ကိုလည်း အစားထိုးမည်ဖြစ်ပြီး ထိခိုက်မှုအတိုင်းအတာမှာ အတူတူပင် ဖြစ်သည်။

**Replica တစ်ခုတည်း** အတွက် Kubernetes snippet (Recreate ကို မဖြစ်မနေ အသုံးပြုရမည်။ SQLite file တစ်ခုတည်းအတွက် `replicas` ကို မတိုးပါနှင့်):

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

`preStop` sleep သည် SIGTERM မတိုင်မီ kube က Service endpoint များကို ဖယ်ရှားနိုင်စေသဖြင့် **အသစ်ဝင်လာသော** traffic သည် ရပ်တန့်နေသော process သို့ မရောက်တော့ပါ။ လုပ်ဆောင်ဆဲ `/v1/responses` SSE ကို heavyweight admission lease များမှတစ်ဆင့် `SHUTDOWN_TIMEOUT_MS` (မူလတန်ဖိုး 30s) အထိ drain လုပ်သည် (#11015)။ Process သို့ ဆက်လက်ရောက်ရှိနေသေးသော request အသစ်များသည် `503` + `Retry-After: 5` ကို ရရှိမည်။ အစားထိုး process က Ready ဖြစ်လာသည်အထိ Recreate ကြောင့် ဖြစ်ပေါ်သော endpoint မရှိသည့် ကာလသည် လုံးဝပြတ်တောက်မှုအဖြစ် ဆက်လက်တည်ရှိမည် — ၎င်းသည် SQLite topology ကြောင့်ဖြစ်ပြီး probe configuration မှားယွင်းမှုကြောင့် မဟုတ်ပါ။

ပြင်ပ Postgres / multi-writer HA သည် မှတ်တမ်းတင်ထားသော ပုံမှန်အသုံးပြုနည်းလမ်းကြောင်း **မဟုတ်ပါ**။ HA လိုအပ်ပါက replica တစ်ခုတည်းကိုသာ ထားရှိပါ သို့မဟုတ် project က သီးခြားစမ်းသပ်ပြီး မှတ်တမ်းတင်ထားသော topology ကို အသုံးပြုပါ။ Postgres/MySQL ဆိုင်ရာ လုပ်ဆောင်မှုများကို [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) တွင် ပြုလုပ်နေသည်။ ၎င်းကို မထုတ်ပြန်မီအထိ **ကြီးမားသော** `/v1/responses` capacity ကို တိုးချဲ့ရန် ပံ့ပိုးထားသည့် တစ်ခုတည်းသောနည်းလမ်းမှာ သီးခြား process N ခု (နောက်အပိုင်း) ဖြစ်ပြီး volume တစ်ခုတည်းပေါ်တွင် `replicas > 1` ပြုလုပ်ခြင်း မဟုတ်ပါ။

## အလျားလိုက်ချဲ့ထွင်ခြင်း: သီးခြား process N ခု

Node process တစ်ခုသည် **V8 heap တစ်ခု** ဖြစ်သည်။ တစ်ခုနှင့်တစ်ခု အချိန်ထပ်နေသည့် ~3 MiB / ~750k-token coding-agent `POST /v1/responses` နှစ်ခု (RTK + Caveman) သည် ~12 Gi တွင် ထို heap ကို ရပ်ဆိုင်းပျက်ကျစေပြီး (`FATAL ERROR: Reached heap limit`) 16 Gi cgroup တစ်ခုကို OOM ဖြစ်စေနိုင်သည်။ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ကို ကြည့်ပါ။ ထိုတိုင်းတာချက်သည် **memory-budget** သတိပေးချက်ဖြစ်ပြီး၊ တစ်ပြိုင်နက်လုပ်ဆောင်နေသော ကြာရှည် `/v1/responses` နှစ်ခုသာ ခွင့်ပြုသည့် ထုတ်ကုန်၏ အမြင့်ဆုံးကန့်သတ်ချက် မဟုတ်ပါ။ Heavyweight chat ဝင်ခွင့်ကို တူညီသော V8/cgroup အမြင့်ဆုံးကန့်သတ်ချက်မှ အလိုအလျောက်တွက်ချက်ထားသည့် ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ဖြင့် ထိန်းချုပ်ထားသည် — အရွယ်အစားသတ်မှတ်ပြီးသား process တစ်ခုတွင် ၎င်းတန်ဖိုးကို ပိုမြှင့်၍ override လုပ်ခြင်း (သို့မဟုတ် အဟောင်း `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap ကို သတ်မှတ်ခြင်း) သည် အဆိုပါရပ်ဆိုင်းပျက်ကျမှုကို ပြန်လည်ဖြစ်ပေါ်စေသည်။ Chat အသေးများ၊ `/healthz`၊ `/v1/models` နှင့် MCP တို့သည် ထို cap ထဲတွင် **မပါဝင်ပါ**။

### Process တစ်ခုတည်း: ကြာရှည် `/v1/responses` နှစ်ခုထက်ပို၍

**ကျန်းမာသော** process တစ်ခု (heap သည် `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` အောက်တွင်ရှိပြီး၊ မူလတန်ဖိုးမှာ `0.75`) သည် process တစ်ခုလုံးဆိုင်ရာ inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) တွင် နေရာကျန်နေသေးပါက တစ်ပြိုင်နက်လုပ်ဆောင်သော ကြာရှည် `POST /v1/responses` နှစ်ခုထက်ပို၍ **လည်ပတ်နိုင်သည်**။ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (မူလတန်ဖိုး 256 KiB) နှင့်ညီမျှသော သို့မဟုတ် ထို့ထက်ကြီးသော body များသည် ဖွဲ့စည်းပုံရှုပ်ထွေးသော request များကဲ့သို့ တူညီသည့် heavyweight lease ကို ရယူပြီး၊ တူညီသော [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` လွတ်မြောက်ရေးလမ်းကြောင်း (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ကို အသုံးပြုသည်။ တစ်ပြိုင်နက် ချိတ်ဆက်ထားသော ကြာရှည် SSE client ဆယ်ဂဏန်းများ (operator များသည် မကြာခဏ 40–50 အထိ လိုအပ်သည်) သည် **memory-budget** ဆိုင်ရာ မေးခွန်းဖြစ်သည် — heap + primary/headroom slot များ + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ကို အရွယ်အစားသတ်မှတ်ရမည် — ထုတ်ကုန်၏ “အများဆုံး 2 ခု” ဟူသော အတိအကျကန့်သတ်ချက် မဟုတ်ပါ။ ဖိအားများနေသော heap သည် #7849 ပြန်မဖြစ်လာစေရန် ပြန်လည်ကြိုးစားနိုင်သည့် `503` ဖြင့် request များကို ဆက်လက်ပယ်ချသည်။

**Heap များကို တိုးပွားစေရန်** (သီးခြား V8 old-space များ) **လက်ရှိတွင်**:

| လုပ်ရန်                                                                                                                                                                                         | မလုပ်ရန်                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **N containers/pods** ကို run ပြီး တစ်ခုစီအတွက် **သီးခြား** `DATA_DIR` / volume အသုံးပြုပါ                                                                                                      | SQLite file တစ်ခုတည်းအတွက် `replicas > 1` မသတ်မှတ်ပါနှင့်                                |
| Heap / inflight-byte budget ကို အခြေခံ၍ heavy in-flight + healthy-headroom ကို အရွယ်အစားသတ်မှတ်ပါ။ 1–2 သည် ရှေးရိုးစွဲ #7849 မူလတန်ဖိုးသာဖြစ်ပြီး ထုတ်ကုန်၏ အတိအကျအမြင့်ဆုံးကန့်သတ်ချက် မဟုတ်ပါ | Process တစ်ခုကို RAM 8 ဆနှင့် အကန့်အသတ်မရှိသော count cap မပေးပါနှင့်                     |
| ရွေးချယ်နိုင်သည်: **မျှဝေထားသော quota counter များ** အတွက် `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                                 | Redis ကို မျှဝေထားသော SQLite အဖြစ် မယူဆပါနှင့် — ထိုသို့မဟုတ်ပါ                          |
| Provider secret များကို instance တစ်ခုစီတွင် မိတ္တူပွားထားပါ (သို့မဟုတ် သီးခြားခွဲထားသော dashboard များကို လက်ခံပါ)                                                                             | Instance များအနှံ့ dashboard တစ်ခုတည်း / call-log တစ်ခုတည်း ရရှိမည်ဟု မမျှော်လင့်ပါနှင့် |
| မည်သည့် load balancer ဖြင့်မဆို ရှေ့ခံပေးပါ။ API key သို့မဟုတ် session အလိုက် sticky ဖြစ်ရုံနှင့် လုံလောက်သည်                                                                                   | Vendor သီးသန့် size-aware middleware ကို မဖြစ်မနေလိုအပ်သည်ဟု မယူဆပါနှင့်                 |

Hardware အရ instance တစ်ခုစီတွင် တစ်ပြိုင်နက်လုပ်ဆောင်နိုင်သော ကြာရှည် `/v1/responses` အရေအတွက်သည် **memory-budget** ဆိုင်ရာ မေးခွန်းဖြစ်သည် (heap + inflight-byte / #10110)။ သီးခြား `DATA_DIR` N ခုသည် heap များကိုလည်း တိုးပွားစေသည်။ Host RAM သည် “N=8 ပါသော 16 Gi pod တစ်ခု” မဟုတ်ဘဲ `N × cgroup` ကို လုံလောက်အောင် ထောက်ပံ့ရမည်။ SQLite file တစ်ခုတည်းတွင် `replicas > 1` ကို မည်သည့်အခါမျှ မသုံးပါနှင့်။

Compose နမူနာ (heap နှစ်ခု၊ volume နှစ်ခု — `deploy.replicas: 2` မဟုတ်ပါ):

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

In-process density (HTTP isolate မှ compression ကို ဖယ်ထုတ်ခြင်း) သည် [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ဖြစ်သည်။ မျှဝေထားသော တာရှည်ခံ state ပေါ်ရှိ logical cluster တစ်ခုသည် [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ဖြစ်သည်။

## အရေးကြီးသော မှတ်ချက်များ

- **SQLite WAL မုဒ်:** OmniRoute သည် နောက်ဆုံးပြောင်းလဲမှုများကို `storage.sqlite` သို့ checkpoint ပြန်လုပ်နိုင်ရန် `docker stop` ကို ပြီးဆုံးသည်အထိ လုပ်ဆောင်ခွင့်ပြုသင့်သည်။ ပူးတွဲပါဝင်သော Compose ဖိုင်များတွင် ရပ်တန့်ရန် အချိန် 40s ကို သတ်မှတ်ထားပြီးဖြစ်သည်။ image ကို တိုက်ရိုက် run ပါက `--stop-timeout 40` ကို ဆက်လက်ထားရှိပါ။
- **`DISABLE_SQLITE_AUTO_BACKUP`:** ပုံမှန်/ရေးသားခြင်းမပြုမီ backup များကို ပြင်ပမှ စီမံခန့်ခွဲထားပါက `true` ဟု သတ်မှတ်ပါ။ ရှိပြီးသား database များကို migration လုပ်ရာတွင် ၎င်းတို့အတွက် သီးခြား ရေရှည်ခံ လုံခြုံရေး snapshot နှင့် အစုလိုက် migration အကာအကွယ်တို့ လိုအပ်နေဆဲဖြစ်သည်။
- **ဒေတာ တည်မြဲသိမ်းဆည်းမှု:** Container ပြန်လည်စတင်မှုများတစ်လျှောက် သင်၏ database၊ key များနှင့် configuration များကို တည်မြဲစွာ သိမ်းဆည်းထားရန် `/app/data` သို့ volume တစ်ခုကို အမြဲ mount လုပ်ပါ။
- **Port ဖွဲ့စည်းသတ်မှတ်မှု:** ပုံသေ `20128` port ကို ပြောင်းလဲရန် `PORT` environment variable ကို override လုပ်ပါ။

## ထပ်မံကြည့်ရှုရန်

- [VM ဖြန့်ကျက်မှု လမ်းညွှန်](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare စနစ်တပ်ဆင်မှု
- [Fly.io ဖြန့်ကျက်မှု လမ်းညွှန်](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io သို့ ဖြန့်ကျက်ရန်
- [Environment ဖွဲ့စည်းသတ်မှတ်မှု](../reference/ENVIRONMENT.md) — ပြည့်စုံသော `.env` အကိုးအကား
