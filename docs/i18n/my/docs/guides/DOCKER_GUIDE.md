# 🐳 Docker Guide — OmniRoute (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker ဖြန့်ကျက်မှုဆိုင်ရာ အပြည့်အစုံ ကိုးကားချက်။ အမြန်စတင်ရန် [README ရှိ Docker ကဏ္ဍ](../README.md#-docker) ကို ကြည့်ပါ။

## မာတိကာ

- [အမြန် အသုံးပြုခြင်း](#quick-run)
- [Environment ဖိုင်ဖြင့် အသုံးပြုခြင်း](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ရရှိနိုင်သော Profile များ](#available-profiles)
- [OmniRoute ကို Docker တွင် အသုံးပြုသည့်အခါ Host CLI Tool များကို ပြင်ဆင်သတ်မှတ်ခြင်း](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Production Compose](#production-compose)
- [Dockerfile Stage များ](#dockerfile-stages)
- [အရေးကြီးသော Environment Variable များ](#critical-environment-variables)
- [Caddy (HTTPS) ဖြင့် Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image Tag များ](#image-tags)
- [အသုံးပြုနိုင်မှု: မူလ SQLite သည် Replica တစ်ခုတည်းသာ ပံ့ပိုးသည်](#availability-default-sqlite-is-single-replica)
- [Docker အတွင်းရှိ Gemini ဒေသဆိုင်ရာ Error များ](#gemini-regional-errors-inside-docker)
- [အရေးကြီး မှတ်ချက်များ](#important-notes)

---

## အမြန် အသုံးပြုခြင်း

> **Command တစ်ခုတည်းဖြင့် ကိုယ်ပိုင် Host ပေါ်တွင် အသုံးပြုလိုပါသလား။**
> [Self-Host လမ်းညွှန်](../getting-started/SELF_HOST_GUIDE.md) ကို ကြည့်ပါ —
> `docker compose -f docker-compose.selfhost.yml up -d` (ထုတ်ဝေထားသော Image +
> Redis၊ loopback သာ၊ Profile ရွေးချယ်ရန်မလို)။ အောက်ပါ အမြန်အသုံးပြုနည်းသည်
> အခြားနေရာတွင် Redis ကို အသုံးပြုပြီးသား အသုံးပြုသူများအတွက်
> Container တစ်ခုတည်းသုံးသည့် နည်းလမ်းဖြစ်သည်။

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Environment ဖိုင်ဖြင့် အသုံးပြုခြင်း

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
# အခြေခံ Profile (CLI Tool မပါဝင်ပါ)
docker compose --profile base up -d

# CLI Profile (Claude Code၊ Codex၊ OpenClaw တို့ အသင့်ထည့်သွင်းထားသည်)
docker compose --profile cli up -d

# Host Profile (Linux ကို ဦးစားပေးထားပြီး Host CLI Binary များကို ဖတ်ရန်သီးသန့်အဖြစ် Mount လုပ်သည်)
docker compose --profile host up -d

# Web Profile (Web-session Provider များအတွက် Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI Sidecar ကို ပေါင်းစပ်အသုံးပြုခြင်း
docker compose --profile cli --profile cliproxyapi up -d
```

## ရရှိနိုင်သော Profile များ

OmniRoute တွင် အဓိက ဖြန့်ကျက်မှုပုံစံများအတွက် Compose Profile များ ပါဝင်သည်။ သင့် Environment နှင့် ကိုက်ညီသည့် Profile ကို ရွေးချယ်ပါ။

| Profile       | Service          | အသုံးပြုသင့်သည့်အချိန်                                                                                                                                           | Command                                      |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (မူလ)  | `omniroute-base` | Headless Server / အနည်းဆုံး Runtime၊ Provider CLI များ ထည့်သွင်းမထားပါ                                                                                           | `docker compose --profile base up -d`        |
| `cli`         | `omniroute-cli`  | `omniroute providers/setup/doctor` နှင့် ထည့်သွင်းပေးထားသော CLI များ (Codex၊ Claude Code၊ Droid၊ OpenClaw) ကို ခေါ်ယူသုံးစွဲသည့် Agentic Workflow များ           | `docker compose --profile cli up -d`         |
| `host`        | `omniroute-host` | `~/.local/bin`၊ `~/.codex`၊ `~/.claude` စသည်တို့ကို ဖတ်ရန်သီးသန့်အဖြစ် Mount လုပ်၍ Host CLI များထံ `network_mode` ကဲ့သို့ ဝင်ရောက်အသုံးပြုလိုသော Linux Host များ | `docker compose --profile host up -d`        |
| `cliproxyapi` | `cliproxyapi`    | Upstream CLI Proxying အတွက် [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) Sidecar ကို Port `8317` တွင် အသုံးပြုခြင်း                               | `docker compose --profile cliproxyapi up -d` |
| `web`         | `omniroute-web`  | Browser လိုအပ်သော Web-session Provider များဖြစ်သည့် `gemini-web`၊ `claude-web`၊ `claude-turnstile` (`runner-web` ကို Build လုပ်ပြီး Chromium ပါဝင်သည်)           | `docker compose --profile web up -d`         |

> Profile အများအပြားကို ပေါင်းစပ်အသုံးပြုနိုင်သည်: `docker compose --profile cli --profile cliproxyapi up -d`။

## OmniRoute ကို Docker တွင် လုပ်ဆောင်နေချိန် host CLI ကိရိယာများကို စီစဉ်သတ်မှတ်ခြင်း

`omniroute setup-codex`, `setup-claude`, `config set <tool>` နှင့် dashboard ၏
**Save config** ခလုတ်တို့သည် `~/.codex/*.config.toml` ကဲ့သို့သော ဖိုင်များကို ရေးသားကြသည်။ ထို path များသည်
CLI အမှန်တကယ် လုပ်ဆောင်နေသော စက်ပေါ်တွင်သာ အဓိပ္ပာယ်ရှိသည်။ ၎င်းတို့ကို
container အတွင်း လုပ်ဆောင်ပါက ရေးသားမှုသည် container ၏ ကိုယ်ပိုင် home (`/home/node` —
image သည် `USER node` ဖြင့် လုပ်ဆောင်သည်) ထဲသို့ ရောက်ရှိသွားမည်ဖြစ်ပြီး မည်သည့် host CLI ကမျှ ၎င်းကို ဖတ်မည်မဟုတ်သည့်အပြင်
container ကို ပြန်လည်ဖန်တီးသည်နှင့် ချက်ချင်း ပျက်သွားမည်ဖြစ်သည်။

OmniRoute သည် ဤအခြေအနေကို စစ်ဆေးသိရှိပြီး သင် အသုံးမပြုနိုင်သော အောင်မြင်မှုတစ်ခုကို
အစီရင်ခံမည့်အစား လမ်းညွှန်ချက်များနှင့်အတူ ရေးသားမှုကို ငြင်းပယ်သည်။ CLI သည် `2` ဖြင့် ထွက်ပြီး API က `422`
နှင့် `containerEphemeralTarget: true` ကို ပြန်လည်ဖြေကြားသည်။

### အကြံပြုထားသည့်နည်းလမ်း- CLI ကို host ပေါ်တွင် လုပ်ဆောင်ပြီး OmniRoute ကို Docker တွင် လုပ်ဆောင်ပါ

Container က API ကို ဝန်ဆောင်မှုပေးပြီး CLI က သင့် host ကိရိယာများကို စီစဉ်သတ်မှတ်ပေးသည်။

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI ကို container သို့ ချိတ်ဆက်ပါ
omniroute setup-codex                      # သင့် host ပေါ်ရှိ အမှန်တကယ် ~/.codex ထဲသို့ ရေးသားသည်
```

Codex, Claude Code, Cursor သို့မဟုတ် အလားတူကိရိယာများကို သင့်
laptop ပေါ်တွင် လုပ်ဆောင်သည့်အခါ ဤနည်းလမ်းသည် မှန်ကန်သော ရွေးချယ်မှုဖြစ်သည် — ပုံမှန်အားဖြင့်လည်း ဤသို့ပင် စီစဉ်ထားကြသည်။

### အခြားနည်းလမ်း- host config directory များကို bind-mount လုပ်ပါ (`host` profile)

Container ကိုယ်တိုင်က သင့် host config ထဲသို့ ရေးသားစေလိုပါက
directory များကို mount လုပ်ပြီး `CLI_CONFIG_HOME` ကို mount root သို့ ညွှန်ပါ။ `host` profile က
ဤအရာကို အသင့်လုပ်ဆောင်ထားပြီးဖြစ်သည်-

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount ကသာ path ကို ယုံကြည်စိတ်ချရစေသည်။ OmniRoute သည်
`/proc/self/mountinfo` ကို ဖတ်ပြီး mount လုပ်ထားသော path များသို့ ရေးသားမှုကို ခွင့်ပြုသည် (ထို့ပြင် child directory များကို mount လုပ်ထားသည့်
directory များကိုလည်း ခွင့်ပြုသည်၊ အထက်ပါ `/host-home` ပုံစံက ထိုအခြေအနေနှင့် အတိအကျ ကိုက်ညီသည်)။ တစ်ချိန်တည်းတွင်
mount မလုပ်ထားသော path များကို ဆက်လက်ငြင်းပယ်သည်။

### အရေးပေါ်ကျော်လွှားနည်း- container ၏ ကိုယ်ပိုင် CLI များကို စီစဉ်သတ်မှတ်ပါ (အနည်းဆုံးသာ အသုံးပြုပါ)

CLI များသည် container အတွင်း အမှန်တကယ် ရှိနေသည့်အခါ (`cli` profile) ရေးသားမှုမှာ
ရည်ရွယ်ထားသည့်အတိုင်း ဖြစ်သည်။ မည်သည့် `setup-*` command ကိုမဆို `--allow-container-write` ပေးပါ၊ သို့မဟုတ်
server အတွက် `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ကို သတ်မှတ်ပါ။ ရေးသားမှု ဆက်လက်လုပ်ဆောင်မည်ဖြစ်ပြီး
container ကို ကျော်လွန်၍ တည်တံ့မည်မဟုတ်ကြောင်း သတိပေးချက် ပြသမည်ဖြစ်သည်။

> **လုံခြုံရေးသတိပေးချက် — `cli` profile + `docker.sock` mount။**
> `cli` profile သည် container အတွင်းရှိ
> auto-updater က host daemon မှတစ်ဆင့် stack ကို ပြန်လည်ဖန်တီးနိုင်ရန် `/var/run/docker.sock` ကို bind-mount လုပ်သည်
> (`src/lib/system/autoUpdate.ts` သည် ထို socket ရှိမရှိ စမ်းသပ်စစ်ဆေးပြီး
> မရှိပါက Docker နည်းလမ်းကို ကျော်သွားသည်)။ ထို socket သည် **host-root ယုံကြည်မှု
> နယ်နိမိတ်တစ်ခု** ဖြစ်သည်။ ၎င်းကို ရယူအသုံးပြုနိုင်သည့် မည်သည့်အရာမဆို host Docker daemon ကို
> root အဖြစ် ထိန်းချုပ်နိုင်သည် — host ပေါ်ရှိ မည်သည့် container ကိုမဆို ဖန်တီးခြင်း၊ စစ်ဆေးခြင်း၊ ရပ်တန့်ခြင်းနှင့် ဖယ်ရှားခြင်းတို့ ပြုလုပ်နိုင်သည်။
> သက်ရောက်မှုများမှာ-
>
> 1. **`cli` profile ၏ port ကို network သို့ လုံးဝ မဖွင့်ပါနှင့်။**
>    ၎င်းကို `127.0.0.1` ပေါ်တွင် publish လုပ်ပါ (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN မှ ရယူအသုံးပြုနိုင်သော `cli` profile သည် dashboard အဆင့် RCE တစ်ခုခုကို
>    host တစ်ခုလုံး ဖောက်ထွင်းထိန်းချုပ်နိုင်သည့် အခြေအနေအဖြစ် ပြောင်းလဲစေသည်။
> 2. **အပို host directory တစ်ခုခုကို `cli` profile ထဲသို့ bind မလုပ်ပါနှင့်။**
>    Docker socket နှင့် နောက်ထပ် mount တစ်ခုခု ပေါင်းစပ်ထားပါက container က သင့် filesystem နှင့် host config ကို
>    အပြည့်အဝ ဖတ်/ရေးနိုင်မည်ဖြစ်သည်။ ကိရိယာတစ်ခုက project ကို မြင်ရန် လိုအပ်ပါက
>    CLI binary ဖြင့် local တွင် လုပ်ဆောင်ပါ — ၎င်းကို `cli` container ထဲသို့ mount မလုပ်ပါနှင့်။
>
> Container အတွင်း auto-update မလိုအပ်ပါက `cli` profile ကို ပိတ်ထားပါ
> (`COMPOSE_PROFILES=core,redis` သို့မဟုတ် ထိုထက်တိုသော သတ်မှတ်ချက်)။ အခြား profile များသည်
> Docker socket ကို mount မလုပ်ပါ။
>
> MITM နှင့် သက်ဆိုင်သည့် threat model အတွက် `docs/security/MITM-TPROXY-DECRYPT.md` (git ထဲတွင်ရှိပြီး `/docs` ထဲသို့ compile မလုပ်ထားပါ) ကို ကြည့်ပါ။
> ထို့ပြင် `codex`/`claude-code`/`droid`/`openclaw` binary များ၏ မူလရင်းမြစ် အဆင့်ဆင့်အတွက်
> `docs/security/SUPPLY_CHAIN.md` ကို ကြည့်ပါ။

## Redis Sidecar

OmniRoute သည် ဖြန့်ဝေထားသော rate limiter နှင့် မျှဝေသုံး cache အတွက် Redis ကို အသုံးပြုပါသည်။ `redis` service ကို `docker-compose.yml` ထဲတွင် **အမြဲတမ်း သတ်မှတ်ထားပြီး** (profile gate မရှိပါ) အခြားမည်သည့် profile နှင့်မဆို အတူ စတင်ပါသည်။

| အသေးစိတ်             | တန်ဖိုး                                         |
| -------------------- | ----------------------------------------------- |
| Image                | `redis:7-alpine`                                |
| Container အမည်       | `omniroute-redis`                               |
| အတွင်းပိုင်း port    | `6379`                                          |
| Host port (အစားထိုး) | `REDIS_PORT` (ပုံသေတန်ဖိုးမှာ `6379`)           |
| Host bind (အစားထိုး) | `REDIS_BIND_HOST` (ပုံသေတန်ဖိုးမှာ `127.0.0.1`) |
| Volume               | `omniroute-redis-data` → `/data`                |
| Healthcheck          | `redis-cli ping` (10s ခြားတစ်ကြိမ်)             |

ဆက်စပ် environment variable များ-

- `REDIS_URL` — app ထဲသို့ ထည့်သွင်းပေးသော connection string (ပုံသေအားဖြင့် `redis://redis:6379`)။
- `REDIS_PORT` — Redis container အတွက် host ဘက်ခြမ်း port mapping။
- `REDIS_BIND_HOST` — port ကို ထုတ်လွှင့်ထားသည့် host interface။ ပုံသေအားဖြင့် `127.0.0.1` ဖြစ်သည်။

> **ပုံသေအားဖြင့် loopback သုံးရသည့်အကြောင်းရင်း-** sidecar သည် `requirepass` မပါဘဲ အလုပ်လုပ်ပြီး app
> container များက compose network (`redis:6379`) မှတစ်ဆင့် ၎င်းကို ဆက်သွယ်ကြသည် — ထုတ်လွှင့်ထားသော port သည်
> host ဘက်ခြမ်း tool များ (`redis-cli`၊ local `npm run dev`) အတွက်သာ ဖြစ်သည်။ `0.0.0.0` ပေါ်တွင်
> ထုတ်လွှင့်ပါက အထောက်အထားစစ်ဆေးမှုမရှိသော Redis ကို သင့် LAN ပေါ်ရှိ host အားလုံးထံ ဖွင့်ပေးထားသကဲ့သို့ ဖြစ်မည်။ အကယ်၍
> `REDIS_BIND_HOST=0.0.0.0` ဟု သတ်မှတ်ပါက service `command:` တွင်လည်း `--requirepass` ကို ထည့်ပါ။

**Redis ကို ပိတ်ထားခြင်း** အား မအကြံပြုပါ (rate limiter သည် memory အတွင်းရှိ fallback ကို အသုံးပြုသည့် အဆင့်သို့ လျော့ကျသွားမည်)။ မဖြစ်မနေ လုပ်ရမည်ဆိုပါက `docker-compose.yml` ထဲရှိ `redis:` service block ကို ဖယ်ရှား/မှတ်ချက်ပြုပါ သို့မဟုတ် ၎င်းကို zero အထိ scale လုပ်ပါ-

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Dev နှင့်အတူ သီးခြားခွဲထားသော production snapshot ကို လုပ်ဆောင်ရန် `docker-compose.prod.yml` ကို အသုံးပြုပါ။

| အသေးစိတ်             | တန်ဖိုး                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| ဖိုင်                | `docker-compose.prod.yml`                                                                        |
| ပုံသေ dashboard port | `PROD_DASHBOARD_PORT=20130` (အတွင်းပိုင်း `${DASHBOARD_PORT:-20128}` သို့ mapping လုပ်ထားသည်)    |
| ပုံသေ API port       | `PROD_API_PORT=20131`                                                                            |
| Image                | `omniroute:prod` (`runner-cli` target မှ build လုပ်ထားသည်)                                       |
| Redis container      | `omniroute-redis-prod` (`redis:8.6.2`၊ သီးခြား `redis-prod-data` volume)                         |
| Data volume          | `omniroute-prod-data` (အမည်ပေးထားပြီး rebuild လုပ်သည့်အခါတိုင်း ဆက်လက်သိမ်းဆည်းထားသည်)           |
| Healthcheck များ     | `node healthcheck.mjs` + `redis-cli ping`၊ Redis health ပေါ်မူတည်ပြီး ကန့်သတ်ထားသော `depends_on` |

အသုံးပြုပုံ-

```bash
# Production stack ကို build လုပ်ပြီး စတင်ပါ
docker compose -f docker-compose.prod.yml up -d --build

# Log များကို ဆက်တိုက်ကြည့်ရှုပါ
docker compose -f docker-compose.prod.yml logs -f

# ရပ်တန့်ပြီး ဖယ်ရှားပါ (volume များကို ဆက်လက်ထားရှိပါ)
docker compose -f docker-compose.prod.yml down
```

Prod stack သည် dev compose နှင့်အပြိုင် အလုပ်လုပ်ပြီး (container အမည်များ၊ port များနှင့် volume များ မတူပါ) production ကို ဆက်လက်လည်ပတ်နေစေစဉ် local တွင် ဆက်လက်ပြင်ဆင်စမ်းသပ်နိုင်ပါသည်။

## Dockerfile အဆင့်များ

Repository တွင် အဆင့်များစွာပါသော Dockerfile (`Dockerfile`) ကို ထည့်သွင်းပေးထားသည်။ အဆင့်လေးခုကို အသုံးပြုနိုင်ပြီး သင့်အသုံးပြုမှုအခြေအနေအတွက် သင့်လျော်သော `target` ကို ရွေးချယ်ပါ။

| အဆင့်         | အခြေခံ image          | ရည်ရွယ်ချက်                                                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Dependency များကို ထည့်သွင်းပြီး (`npm ci --legacy-peer-deps`) `npm run build` ကို လုပ်ဆောင်သည် (ပုံသေအားဖြင့် Turbopack — အောက်ရှိ Build-time resource များကို ကြည့်ပါ)                                                                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone output ပါဝင်သော production runtime ဖြစ်သည်။ **Provider CLI များ မပါဝင်ပါ။**                                                                                                                                                                                                                                                          |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` နှင့် global CLI များဖြစ်သော `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw` တို့ကို ထည့်သွင်းပေးသည်။ **Agent အခြေပြု workflow များအတွက် ဤအဆင့်ကို ရွေးချယ်ပါ။**                                                                                                                                 |
| `runner-web`  | `runner-base`         | Web-session provider များဖြစ်သော `gemini-web`, `claude-web`, `claude-turnstile` အတွက် Playwright နှင့် Chromium browser (`--with-deps`) ကို ထည့်သွင်းပေးသည်။ **အဆိုပါ provider များကို အသုံးပြုသည့်အခါ ဤအဆင့်ကို ရွေးချယ်ပါ** — ၎င်းမပါဘဲ သာမန် image သည် request ပြုလုပ်ချိန်တွင် အလုပ်မလုပ်ပါ (Release Channels အောက်ရှိ `-web` မှတ်ချက်ကို ကြည့်ပါ)။ |

သတ်မှတ်ထားသော target တစ်ခုကို ကိုယ်တိုင် build လုပ်ရန်-

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Build လုပ်ချိန် resource များ

Build arg သုံးခုက `builder` အဆင့်တွင် အသုံးပြုမည့် resource ပမာဏကို ထိန်းချုပ်သည်။ ၎င်းတို့သည် build လုပ်ချိန်အတွက်သာ ဖြစ်သည် —
`OMNIROUTE_MEMORY_MB` (အောက်တွင်ဖော်ပြထားသည်) သည် သီးခြား runtime ချိန်ညှိချက်တစ်ခု ဖြစ်သည်။

| Build arg                   | ပုံသေတန်ဖိုး | သက်ရောက်မှု                                                                                                                      |
| --------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` သည် webpack ဖြင့် build လုပ်သည်- အမြင့်ဆုံး memory သုံးစွဲမှု ပိုနည်းသော်လည်း ပိုနှေးသည်။ `1` သည် Turbopack ကို အသုံးပြုသည်။ |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | စတင်လုပ်ဆောင်ထားသော `next build` အတွက် V8 heap အမြင့်ဆုံးကန့်သတ်ချက် (`--max-old-space-size`) ဖြစ်သည်။                           |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | `CIRCLE_NODE_TOTAL` သို့ ပေးပို့သည်။ Next က page-data စုဆောင်းမှုအတွက် `workers = N - 1` ဟု တွက်ချက်သတ်မှတ်သည်။                  |

Builder ကြီးတစ်ခုတွင် တိုးမြှင့်သင့်သော တန်ဖိုးမှာ `OMNIROUTE_BUILD_WORKERS` ဖြစ်ပြီး resource အကန့်အသတ်ရှိသော build တစ်ခုသည် `✓ Compiled successfully` **ပြီးနောက်** ရပ်တန့်သွားပါကလည်း ၎င်းကို သံသယရှိသင့်သည်။ Page-data worker တစ်ခုချင်းစီသည် သီးခြား process ဖြစ်သကဲ့သို့ parent `next build` ကိုယ်တိုင်လည်း သီးခြား process ဖြစ်သည်။ လက်တွေ့ VPS ပြန်လည်စမ်းသပ်မှု (issue #7518) အရ process တစ်ခုချင်းစီ၏ အမြင့်ဆုံး RSS သည် `NODE_OPTIONS` heap flag နှင့် မသက်ဆိုင်ဘဲ ~4.5 GB ရှိကြောင်း တိုင်းတာတွေ့ရှိခဲ့သည် (Turbopack သည် V8 heap ပြင်ပရှိ native/Rust memory တွင် compile လုပ်သည်)။ ပုံသေတန်ဖိုး `2` (→ worker 1 ခု၊ စုစုပေါင်း process 2 ခု) ကို publish pipeline အသုံးပြုသော 16 GB / 4 vCPU GitHub-hosted runner များအတွက် ချိန်ညှိထားသည်။ `8` (→ worker 7 ခု) တွင် အဆိုပါ runner သည် memory ကုန်ဆုံးသွားပြီး buildkit က `ResourceExhausted: ... cannot allocate memory` ဖြင့် အဆိုပါအဆင့်ကို မအောင်မြင်စေခဲ့သည်။ Process တစ်ခုချင်းစီ၏ RSS ကို မှန်းဆခြင်းမဟုတ်ဘဲ တိုက်ရိုက်တိုင်းတာပြီးနောက် `3` (→ worker 2 ခု) သည်လည်း မလုံလောက်သေးပါ။ `tests/unit/docker-build-memory-budget.test.ts` သည် တိုင်းတာထားသော ကိန်းဂဏန်းကို အခြေခံ၍ တွက်ချက်ပြီး ချိန်ညှိချက်နှစ်ခုအနက် တစ်ခုခုသည် runner ၏ လုပ်ဆောင်နိုင်စွမ်းထက် ကျော်လွန်ပါက မအောင်မြင်စေသည်။

Turbopack သည် V8 heap ၏ **ပြင်ပ** တွင်ရှိသော native Rust memory ထဲ၌ compile လုပ်သောကြောင့် `OMNIROUTE_BUILD_MEMORY_MB` က ၎င်းကို ကန့်သတ်မပေးနိုင်ပါ။ Memory အမြင့်ဆုံးကန့်သတ်ချက်ရှိသော host တွင် build ကို OOM killer က မည်သည့် error စာသားမျှမပြဘဲ SIGKILL လုပ်လိုက်သည် — `Creating an optimized production build` အလယ်တွင် ရိုးရိုးရပ်သွားသောကြောင့် memory ကုန်ဆုံးခြင်းထက် တုံ့ဆိုင်းနေသကဲ့သို့ မြင်ရသည်။ ထို့ကြောင့် `npm run dev` / `npm run build` တွင် Turbopack ကို code ပုံသေအဖြစ် အသုံးပြုထားခြင်းနှင့် မတူဘဲ `Dockerfile` သည် webpack (`OMNIROUTE_USE_TURBOPACK=0`) ကို ပုံသေအဖြစ် အသုံးပြုသည်။ Build arg မပါသော `docker build .` သက်သက် (Railway နှင့် အခြား one-click host များ လုပ်ဆောင်သည့်ပုံစံ) သည် memory ကန့်သတ်ထားသော builder ပေါ်တွင် မည်သည့်သတိပေးချက်မျှမရှိဘဲ ရပ်တန့်သွားခြင်း မဖြစ်ရပါ။ ထုတ်ဝေထားသော image များအတွက် `docker-publish.yml` တွင် `OMNIROUTE_USE_TURBOPACK=0` ကို ရှင်းလင်းစွာ ပေးပို့ထားပြီးဖြစ်သည်။ RAM များများရှိသော builder တွင် ပိုမြန်သော build အတွက် Turbopack ကို အသုံးပြုနိုင်သည်-

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ကို ဖွင့်ထားသဖြင့် `next build` သည် parent process တစ်ခုနှင့် worker process တစ်ခုကို လုပ်ဆောင်ပြီး process တစ်ခုချင်းစီက `OMNIROUTE_BUILD_MEMORY_MB` ကို သီးခြားစီ လိုက်နာသည်။ Container ၏ အမြင့်ဆုံးကန့်သတ်ချက်ကို အဆိုပါတန်ဖိုး၏ တစ်ဆမဟုတ်ဘဲ အကြမ်းဖျင်း နှစ်ဆထက် ပို၍ သတ်မှတ်ပါ။

ဤ source tree တွင် တိုင်းတာထားသော ရလဒ်များ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`)-

| Bundler   | Container အမြင့်ဆုံးကန့်သတ်ချက် | ရလဒ်                                                             |
| --------- | ------------------------------- | ---------------------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB                  | နှစ်ခုစလုံးတွင် မည်သည့်သတိပေးချက်မျှမရှိဘဲ OOM-killed ဖြစ်ခဲ့သည် |
| webpack   | 8 GiB                           | Build worker သည် SIGKILLed ဖြစ်ခဲ့သည်                            |
| webpack   | 12 GiB                          | အောင်မြင်ခဲ့ပြီး အမြင့်ဆုံး 11.1 GiB အထိ ရောက်ရှိခဲ့သည်          |

### Runtime ပုံသေတန်ဖိုးများ

`runner-base` က export လုပ်ပေးသော ပုံသေတန်ဖိုးများ- `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`။

Docker ရှိ memory လုပ်ဆောင်ပုံ-

- Image သည် `OMNIROUTE_MEMORY_MB=1024` ကို သတ်မှတ်ပြီး ၎င်းမှ `NODE_OPTIONS=--max-old-space-size=1024` ကို ရယူသတ်မှတ်သည်။
- အမှန်တကယ် server process ကို standalone launcher က စတင်ပေးပြီး၊ ၎င်းသည် `OMNIROUTE_MEMORY_MB` ကို ဖတ်ကာ `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` ကို ထပ်ပေါင်းသည်။
- Node သည် ထပ်ခါတလဲလဲ ပါရှိသည့် `--max-old-space-size` တန်ဖိုးများအနက် နောက်ဆုံးတန်ဖိုးကို အသုံးပြုသောကြောင့် `OMNIROUTE_MEMORY_MB` ကို သတ်မှတ်ခြင်းဖြင့် အမှန်တကယ် သက်ရောက်မည့် Docker heap ကန့်သတ်ချက်ကို ထိန်းချုပ်နိုင်သည်။
- Image က ၎င်းကို အမြဲသတ်မှတ်ထားသောကြောင့် launcher ကိုယ်တိုင်၏ RAM အလိုက် ချိန်ညှိထားသော fallback သည် Docker အောက်တွင် မည်သည့်အခါမျှ အသုံးမဝင်ပါ။ Workload အတွက် ၎င်းကို အတိအလင်း မြှင့်တင်ပါ (အောက်ပါဇယားကို ကြည့်ပါ)။ Coding-agent `/v1/responses` အတွက် `2048` သည်လည်း နည်းလွန်းနေသေးသည်။

### Coding agent များအတွက် Runtime RAM

1 GiB Docker မူလတန်ဖိုးသည် production အသုံးပြုမှုအရွယ်အစားမဟုတ်ဘဲ dashboard/light-chat အတွက် အနိမ့်ဆုံးအဆင့်သာ ဖြစ်သည်။ ရှည်လျားသော `POST /v1/responses` body များ (message ရာပေါင်းများစွာ၊ tool ဆယ်ဂဏန်းများစွာ) သည် compression လုပ်နေစဉ်အတွင်း in-memory graph အများအပြားကို ထိန်းသိမ်းထားသည်။ တစ်ခုနှင့်တစ်ခု အချိန်ထပ်နေသော ~3 MiB / ~750k-token request နှစ်ခုသည် **12 GiB** old-space တွင် V8 ကို ရပ်တန့်စေခဲ့ပြီး (`FATAL ERROR: Reached heap limit`) 16 GiB cgroup OOM ကိုလည်း ဖြစ်ပေါ်စေခဲ့သည်။ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ကို ကြည့်ပါ။

**cgroup `--memory` ကို heap ထက် ပိုကြီးအောင်** သတ်မှတ်ပါ — native buffer များ၊ SQLite နှင့် compression အလယ်အလတ်ဒေတာများသည် V8 ပြင်ပတွင် ရှိနေသည်။

| Workload                                                           | `OMNIROUTE_MEMORY_MB`              | Container / cgroup                   | မှတ်ချက်များ                                                                                                                          |
| ------------------------------------------------------------------ | ---------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard၊ ပေါ့ပါးသော chat တစ်ခု                                   | `1024` (image မူလတန်ဖိုး)          | ≥2 GiB                               |                                                                                                                                       |
| Coding agent တစ်ခု (Claude/Codex/Grok)                             | `8192`                             | ≥10 GiB                              | ပုံမှန် single-session `/v1/responses`                                                                                                |
| တစ်ပြိုင်နက်တည်း လုပ်ဆောင်သော ရှည်လျားသည့် `/v1/responses` နှစ်ခု  | `10240`–`12288`                    | ≥12–16 GiB                           | ~12 GiB heap တွင် V8 ရပ်တန့်မှုကို တိုင်းတာတွေ့ရှိခဲ့သည်                                                                              |
| တစ်ပြိုင်နက်တည်း လုပ်ဆောင်သော ရှည်လျားသည့် context သုံးခုနှင့်အထက် | process တစ်ခုတည်းတွင် မလုပ်ပါနှင့် | အစဉ်လိုက်လုပ်ဆောင်ပါ / RAM ပိုထည့်ပါ | မူလ heavyweight admission သည် တစ်ကြိမ်လျှင် လုပ်ဆောင်ဆဲ 1 ခုဖြစ်သည်။ RAM မထည့်ဘဲ ၎င်းကို မြှင့်တင်ပါက ရပ်တန့်မှု ပြန်လည်ဖြစ်ပေါ်လာမည် |

Bare metal ပေါ်ရှိ `omniroute serve` သည် `OMNIROUTE_MEMORY_MB` ကို **မသတ်မှတ်ထားသည့်အခါ** RAM ၏ ~35% ခန့်ကို ချိန်ညှိအသုံးပြုသည် (`[512, 4096]` အတွင်း ကန့်သတ်ထားသည်)။ Docker သည် `1024` ကို အမြဲသတ်မှတ်ထားသောကြောင့် official image တွင် ထိုချိန်ညှိမှုကို မည်သည့်အခါမျှ မလုပ်ဆောင်ပါ။

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## အရေးကြီးသော Environment Variable များ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) တွင် မှတ်တမ်းတင်ထားသော မူလသတ်မှတ်ချက်များအပြင် Docker အောက်တွင် လုပ်ဆောင်သည့်အခါ အောက်ပါ variable များသည် အရေးအကြီးဆုံးဖြစ်သည်-

| Variable                      | ရည်ရွယ်ချက်                                                                                                                                                                                                                                                                                                                                | မူလတန်ဖိုး                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket bridge အတွက် မျှဝေသုံးစွဲသည့် လျှို့ဝှက်တန်ဖိုး။ **Production တွင် မဖြစ်မနေလိုအပ်သည်** — ခန့်မှန်းရခက်သော ကျပန်း string တစ်ခုအဖြစ် သတ်မှတ်ပါ။                                                                                                                                                                                    | မသတ်မှတ်ထားပါ (ထည့်သွင်းပေးရမည်) |
| `REDIS_URL`                   | Rate limiter / cache backend အတွက် ချိတ်ဆက်မှု string                                                                                                                                                                                                                                                                                      | `redis://redis:6379`             |
| `REDIS_PORT`                  | ပူးတွဲပါဝင်သော Redis container အတွက် host ဘက်ခြမ်း port                                                                                                                                                                                                                                                                                    | `6379`                           |
| `REDIS_BIND_HOST`             | ပူးတွဲပါဝင်သော Redis port ကို ထုတ်လွှင့်ထားသည့် host interface (AUTH မထည့်ထားပါက loopback)                                                                                                                                                                                                                                                 | `127.0.0.1`                      |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ကိုယ်တိုင်အပ်ဒိတ်လုပ်သည့် workflow များအတွက် `cli` profile ထဲရှိ `/workspace/omniroute` သို့ mount လုပ်ထားသော host path                                                                                                                                                                                                                    | `.` (လက်ရှိ directory)           |
| `OMNIROUTE_MEMORY_MB`         | Docker standalone server အတွက် runtime Node heap အများဆုံးပမာဏ။ အထက်ပါ image မူလသတ်မှတ်ချက်ကို အစားထိုးသည်။ Coding agent များအတွက်- `8192`+ ([runtime RAM](#runtime-ram-for-coding-agents) ကို ကြည့်ပါ)။                                                                                                                                   | `1024`                           |
| `DASHBOARD_PORT` / `API_PORT` | Dashboard (20128) နှင့် API (20129) အတွက် ထုတ်ဖော်ထားသော port များကို အစားထိုးသတ်မှတ်ရန်                                                                                                                                                                                                                                                   | `20128` / `20129`                |
| `APP_BIND_HOST`               | Dashboard/API/live-WS port များကို docker-compose က ထုတ်လွှင့်ထားသည့် host interface။ `REQUIRE_API_KEY=false` (မူလသတ်မှတ်ချက်) ဖြစ်လျှင် `0.0.0.0` သည် အမည်မသိအသုံးပြုနိုင်သော `/v1` proxy ကို LAN သို့ ဖွင့်ပေးမည်ဖြစ်သောကြောင့် `REQUIRE_API_KEY=true` ဖြစ်သည့်အခါ သို့မဟုတ် ရှေ့တွင် reverse proxy တစ်ခုရှိသည့်အခါမှသာ ချဲ့ထွင်ဖွင့်ပါ။ | `127.0.0.1`                      |
| `CLIPROXY_BIND_HOST`          | `cliproxyapi` sidecar ကို docker-compose က ထုတ်လွှင့်ထားသည့် host interface — ၎င်း၏ data volume တွင် provider အထောက်အထားများ သိမ်းဆည်းထားသည်။                                                                                                                                                                                              | `127.0.0.1`                      |
| `OMNIROUTE_PLUGINS_DIR`       | Runtime plugin scanner က ဖတ်ရှုပြီး install လုပ်သည့် directory။ Plugin များကို bind-mount လုပ်ထားပါက ၎င်းကို သတ်မှတ်ပါ။ မူလသတ်မှတ်ချက်သည် image တစ်ခုက export လုပ်ထားရန် မလိုအပ်သည့် `HOME` ကို လိုက်နာသည်။                                                                                                                                | `~/.omniroute/plugins`           |
| `OMNIROUTE_BASE_PATH`         | App ကို reverse proxy နောက်ကွယ်တွင် ထုတ်လွှင့်ထားသည့်အခါ အသုံးပြုမည့် URL subpath (ဥပမာ `/omniroute`)                                                                                                                                                                                                                                      | _(ဗလာ = root)_                   |
| `NEXT_PUBLIC_BASE_URL`        | Subpath အပါအဝင် public browser origin (ဥပမာ `https://host/omniroute`)                                                                                                                                                                                                                                                                      | မသတ်မှတ်ထားပါ                    |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` အတွက် host ဘက်ခြမ်း dashboard port                                                                                                                                                                                                                                                                               | `20130`                          |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar အတွက် host ဘက်ခြမ်း port                                                                                                                                                                                                                                                                                             | `8317`                           |

## Subpath တစ်ခုပေါ်ရှိ Reverse Proxy (Traefik / nginx)

Next.js `basePath` ကို standalone bundle ထဲသို့ compile လုပ်ထားသည်။ OmniRoute သည် build အတွင်း ထည့်သွင်းထားသော တန်ဖိုးကို app root ရှိ sentinel file တစ်ခုတွင် မှတ်တမ်းတင်ထားပြီး (`npm run build` လုပ်စဉ် ရေးသားကာ `scripts/docker/ensure-docker-base-path.mjs` က ဖတ်သည်) container စတင်ချိန်တွင် ၎င်းကို `OMNIROUTE_BASE_PATH` နှင့် နှိုင်းယှဉ်သည်။ တန်ဖိုးများ မတူညီဘဲ image ကို domain root အတွက် build လုပ်ထားပါက entrypoint သည် `node dev/run-standalone.mjs` မလည်ပတ်မီ standalone manifests များ၊ ထည့်သွင်းထားသော `basePath`/`assetPrefix` literals များ (Next 16 သည် SSR asset URL များကို `assetPrefix` တစ်ခုတည်းမှ render လုပ်သည် — patcher က subpath ကို ၎င်းထဲသို့ ထပ်တူကူးထည့်ပေးသည်)၊ build အတွင်း ထည့်သွင်းထားသော `/_next/static` asset URL များ (client-reference manifests၊ media imports၊ ကြိုတင် render လုပ်ထားသော error pages) နှင့် client `process.env` shim တို့ကို ပြန်လည်ရေးသားသည်။

### Compose build (အကြံပြုထားသည်)

Variable နှစ်ခုလုံးကို `.env` ထဲတွင် သတ်မှတ်ပြီးနောက် image နှင့် runtime ကိုက်ညီစေရန် ပြန်လည် build လုပ်ပါ-

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` သည် `OMNIROUTE_BASE_PATH` ကို Docker build-arg အဖြစ်လည်းကောင်း၊ runtime environment variable အဖြစ်လည်းကောင်း လွှဲပို့ပေးသည်။

### ကြိုတင် build လုပ်ထားသော root image + runtime subpath

ထုတ်ဝေထားသော `diegosouzapw/omniroute:*` images များကို domain root အတွက် build လုပ်ထားသည်။ Runtime တွင် `OMNIROUTE_BASE_PATH` ကို သတ်မှတ်နိုင်ဆဲဖြစ်ပြီး container သည် စတင်ချိန်တွင် bundle ကို တစ်ကြိမ် patch လုပ်ပေးမည်။ ၎င်းနှင့် ကိုက်ညီသော public origin ကို တွဲဖက်သတ်မှတ်ပါ-

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**အပြည့်အစုံ** ဖြစ်သော external path ကို လွှဲပို့ရန် reverse proxy ကို စီစဉ်သတ်မှတ်ပါ (prefix ကို မဖယ်ရှားပါနှင့်)။ Traefik သည် `StripPrefix` မပါဘဲ `PathPrefix(`/omniroute`)` ကို container သို့ route လုပ်သင့်သည်။ ထိုသို့ပြုလုပ်ခြင်းဖြင့် Next.js သည် `/omniroute/...` ကို လက်ခံရရှိပြီး assets များကို `/omniroute/_next/...` မှ ပေးပို့နိုင်သည်။

Docker healthcheck သည် အသုံးပြုနေသော `OMNIROUTE_BASE_PATH` prefix ပါဝင်သည့် ပေါ့ပါးသော `/healthz` lifecycle endpoint ကို စစ်ဆေးသည်။ လူများ သို့မဟုတ် dashboard များက စစ်ဆေးရှာဖွေရန် `/api/monitoring/health` ကို ဆက်လက်အသုံးပြုနိုင်သည်။ Container HEALTHCHECK ကို ထို endpoint သို့ ပြန်ညွှန်လိုပါက (ဥပမာ၊ အတွင်းကျကျ health enforcement အတွက်) `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` ဟု သတ်မှတ်ပါ။ ထို path သည် **အတွင်းကျကျ** စစ်ဆေးမှုတစ်ခု (DB + monitoring summary) ဖြစ်သည် — ပြန်လည်အသုံးပြုရန် ရွေးချယ်ပါက Docker ၏ အကြိမ်ရေနည်းသော `HEALTHCHECK` အတွက် သင့်လျော်သော်လည်း Kubernetes `livenessProbe` ကြားကာလများအတွက်မူ **မသင့်လျော်ပါ**။

Orchestrator များ (Kubernetes၊ Nomad စသည်) အတွက်-

| Probe           | ဦးစားပေးရန်                                                                    | ရှောင်ရန်                                                                   |
| --------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez` သို့မဟုတ် ပင်မ port (`PORT`၊ မူလတန်ဖိုး `20128`) ပေါ်ရှိ TCP | Liveness အဖြစ် `/api/monitoring/health`                                     |
| Readiness       | HTTP `GET /healthz`                                                            | Event loop အလုပ်များနေခြင်းကို dead ဟု သတ်မှတ်သည့် တင်းကျပ်သော timeout များ |
| Deep / blackbox | `/api/monitoring/health`                                                       | —                                                                           |

`/healthz` သည် process lifecycle (`ok` / `starting` / `stopping`) ကို အစီရင်ခံသည်။ `/livez` သည် process အသက်ရှင်နေခြင်းကိုသာ စစ်ဆေးသည် (handler လည်ပတ်နိုင်သည့်အခါတိုင်း 200 ပြန်ပေးပြီး readiness ကို မစောင့်ပါ)။ နှစ်ခုစလုံးသည် request handling နှင့် တူညီသော Node event loop ပေါ်တွင် လည်ပတ်ဆဲဖြစ်သောကြောင့် CPU-bound catalog သို့မဟုတ် compression လုပ်ငန်းများက ၎င်းတို့ကို နှောင့်နှေးစေနိုင်သည် — busy ≠ dead။ HTTP probes များ timeout ဖြစ်ပါက TCP liveness ကို ဦးစားပေးပါ။ Probe ဆိုင်ရာ လမ်းညွှန်ချက်အပြည့်အစုံ-
[Monitoring လမ်းညွှန် — Kubernetes probe အကြံပြုချက်များ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)။

## Caddy ပါဝင်သော Docker Compose (HTTPS Auto-TLS)

Caddy ၏ အလိုအလျောက် SSL စီစဉ်ပေးမှုကို အသုံးပြု၍ OmniRoute ကို လုံခြုံစွာ အများပြည်သူ အသုံးပြုနိုင်အောင် ပြုလုပ်နိုင်သည်။ သင့် domain ၏ DNS A record သည် သင့် server ၏ IP ကို ညွှန်ပြထားကြောင်း သေချာပါစေ။

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
      # OAuth callback များ၊ dashboard link များနှင့် ဖန်တီးထားသော public URL များအတွက် browser အသုံးပြုသည့် origin။
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # အချိန်ဇယားသတ်မှတ်ထားသော job များ / self-fetch များအတွက် server အချင်းချင်းအသုံးပြုသည့် အတွင်းပိုင်း URL။
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

Caddy သည် upstream container အတွက် စံသတ်မှတ်ထားသော forwarding header များကို သတ်မှတ်ပေးသည်။ OmniRoute သည် OAuth callback များနှင့် ဖန်တီးထားသော public link များအတွက် `NEXT_PUBLIC_BASE_URL` ကို စံသတ်မှတ်ထားသည့် public origin အဖြစ် အသုံးပြုသည်။ အထောက်အထားစစ်ဆေးပြီးသော dashboard write များသည် same-origin request များနှင့် session-bound CSRF ကာကွယ်မှုကို အသုံးပြုသည်။ တိကျသော configuration အစား ယုံကြည်ရသည့် forwarded header များမှ public origin ကို OmniRoute အား ရယူစေလိုသည့် အဆင့်မြင့် deployment များတွင်သာ `OMNIROUTE_TRUST_PROXY` ကို ဖွင့်ပါ။

## Cloudflare Quick Tunnel

Docker deployment များအတွက် dashboard ပံ့ပိုးမှုတွင် `Dashboard → Endpoints` ပေါ်၌ တစ်ချက်နှိပ်ရုံဖြင့် အသုံးပြုနိုင်သော **Cloudflare Quick Tunnel** ပါဝင်သည်။ ပထမဆုံး ဖွင့်သည့်အခါ လိုအပ်မှသာ `cloudflared` ကို download လုပ်ပြီး၊ သင်၏ လက်ရှိ `/v1` endpoint သို့ ယာယီ tunnel တစ်ခု စတင်ကာ ဖန်တီးထားသော `https://*.trycloudflare.com/v1` URL ကို သင့်ပုံမှန် public URL အောက်တွင် တိုက်ရိုက်ပြသပေးသည်။

Endpoint tunnel panel များ (Cloudflare၊ Tailscale၊ ngrok) ကို လက်ရှိ tunnel အခြေအနေ မပြောင်းလဲစေဘဲ `Settings → Appearance` မှ ပြသနိုင်သလို ဖျောက်ထားနိုင်သည်။

### Tunnel မှတ်ချက်များ

- Quick Tunnel URL များသည် ယာယီဖြစ်ပြီး restart လုပ်သည့်အကြိမ်တိုင်း ပြောင်းလဲသည်။
- OmniRoute သို့မဟုတ် container ကို restart လုပ်ပြီးနောက် Quick Tunnel များကို အလိုအလျောက် ပြန်လည်ဖွင့်မပေးပါ။ လိုအပ်သည့်အခါ dashboard မှ ပြန်လည်ဖွင့်ပါ။
- Managed install သည် လက်ရှိတွင် `x64` / `arm64` သုံးသည့် Linux၊ macOS နှင့် Windows တို့ကို ပံ့ပိုးသည်။
- Managed Quick Tunnel များသည် အရင်းအမြစ်ကန့်သတ်ထားသော container environment များတွင် ဆူညံသော QUIC UDP buffer သတိပေးချက်များကို ရှောင်ရှားရန် HTTP/2 transport ကို မူလအဖြစ် အသုံးပြုသည်။ အခြား transport တစ်ခု အသုံးပြုလိုပါက `CLOUDFLARED_PROTOCOL=quic` သို့မဟုတ် `auto` ဟု သတ်မှတ်ပါ။
- Docker image များတွင် system CA root များ ပါဝင်ပြီး ၎င်းတို့ကို managed `cloudflared` သို့ ပေးပို့သည်။ ထို့ကြောင့် container အတွင်း tunnel စတင်ချိန်၌ TLS ယုံကြည်မှုဆိုင်ရာ ချို့ယွင်းမှုများကို ရှောင်ရှားနိုင်သည်။
- OmniRoute က download လုပ်မည့်အစား ရှိပြီးသား binary တစ်ခုကို အသုံးပြုစေလိုပါက `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ဟု သတ်မှတ်ပါ။

## Image Tag များ

| Image                    | Tag      | အရွယ်အစား | ဖော်ပြချက်                                                      |
| ------------------------ | -------- | --------- | --------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB    | **ထုတ်ဝေပြီးသော** အမြင့်ဆုံး stable SemVer (git `main` မဟုတ်ပါ) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB    | GitOps အတွက် ဤ tag အမျိုးအစားကို အတိအကျသတ်မှတ်ပါ                |

Multi-platform manifest- `linux/amd64` + `linux/arm64` native (Apple Silicon၊ AWS Graviton၊ Raspberry Pi)။ Docker သည် ကိုက်ညီသည့် architecture ကို အလိုအလျောက် ရွေးချယ်သည်။ ARM host များပေါ်တွင် AMD64 emulation ကို အတင်းအကျပ် အသုံးပြုရန် လိုအပ်ပါက `--platform linux/amd64` ကို ထည့်သွင်းပါ။

### Release Channel များ

OmniRoute သည် stable release များ၊ လက်ရှိ release branch စမ်းသပ်မှုများနှင့် development build များအတွက် သီးခြား Docker channel များကို ထုတ်ဝေသည်။

| Channel                         | ရင်းမြစ်                                         | ပြောင်းလဲနိုင်မှု                     | အကြံပြုထားသော အသုံးပြုမှု                                                                                                                   |
| ------------------------------- | ------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | လက်မှတ်ရေးထိုးပြီး/version သတ်မှတ်ထားသော release | ပြောင်းလဲ၍မရ                          | release အတိအကျတစ်ခုကို သတ်မှတ်အသုံးပြုသော production deployment များ                                                                        |
| `:latest` / `:latest-web`       | **ထုတ်ဝေပြီးသော** အမြင့်ဆုံး stable SemVer       | ပြောင်းလဲနိုင်သော stable pointer      | SemVer publish job ပြီးနောက် stable release များကို လိုက်နာသည် — `main` သို့မဟုတ် မထုတ်ဝေရသေးသော `release/v*` commit များကို **မ**လိုက်နာပါ |
| `:next` / `:next-web`           | လက်ရှိ မူလ `release/v*` branch                   | ပြောင်းလဲနိုင်သော pre-release pointer | လက်ရှိ release branch သို့ ရောက်ရှိပြီးဖြစ်သော်လည်း stable release ထဲ မပါဝင်သေးသော ပြင်ဆင်ချက်များကို စမ်းသပ်ခြင်း                          |
| `:main` / `:main-web`           | `main` branch                                    | ပြောင်းလဲနိုင်သော development pointer | Development နှင့် integration စမ်းသပ်မှုအတွက်သာ                                                                                             |

#### Web-session provider များ- `-web` image များ

အထက်ပါ channel တစ်ခုစီတွင် `-web` tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) တစ်ခုစီလည်း ရှိပြီး `runner-web` stage မှ build လုပ်ထားသည်။ ၎င်းသည် တူညီသော image တွင် Playwright နှင့် Chromium browser ကို ထပ်မံထည့်သွင်းထားခြင်းဖြစ်သည်။ ပုံမှန် image တွင် Chromium **မပါဝင်ပါ**။ `gemini-web`, `claude-web` နှင့် `claude-turnstile` တို့သည် ၎င်းကို လိုအပ်သည်။

ချို့ယွင်းမှုသည် startup အချိန်တွင် မဖြစ်ဘဲ နောက်မှ ဖြစ်ပေါ်သည်။ ထို provider များသည် ၎င်းတို့၏ model များကို စာရင်းပြုပြီး dashboard တွင် ချိတ်ဆက်ထားသည့်အဖြစ် ပြသသော်လည်း ပထမဆုံး request မှသာ အောက်ပါ error ဖြင့် မအောင်မြင်ပါ။

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

ထို provider များကို အသုံးပြုပါက လက်ရှိအသုံးပြုနေသော channel ၏ `-web` tag ကို pull လုပ်ပါ — အခြားမည်သည့်အရာမျှ မပြောင်းလဲပါ။ npm/CLI install (Docker image မပါ) တွင် အလားတူ လိုအပ်နေသောအရာမှာ browser binary ဖြစ်သည်။ host ပေါ်တွင် `npx playwright install chromium` ကို run ပါ။

#### Pre-release channel ကို အသုံးပြုခြင်း

`next` channel ကို လက်ရှိ မူလသတ်မှတ်ထားသော `release/v*` branch သို့ push လုပ်တိုင်း ပြန်လည်တည်ဆောက်ပြီး AMD64 နှင့် ARM64 နှစ်မျိုးလုံးအတွက် ထုတ်ဝေပါသည်။ အဟောင်း maintenance branch များက ၎င်းကို overwrite မလုပ်နိုင်ပါ။ နောက်ထပ် stable tag မထုတ်မီ လက်ရှိအသုံးပြုနေသော release branch ထဲသို့ merge လုပ်ပြီးသည့် ပြင်ဆင်ချက်များအတွက် ဤ channel က pull လုပ်နိုင်သော image တစ်ခုကို ပံ့ပိုးပေးပါသည်။

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose အတွက် ရွေးချယ်ထားသော profile က အသုံးပြုသည့် image tag ကို override လုပ်ပြီးနောက် service ကို pull လုပ်၍ ပြန်လည်ဖန်တီးပါ။

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ဘေးကင်းရေးနှင့် နောက်ဗားရှင်းသို့ ပြန်လှည့်ခြင်း

`next` သည် ပြောင်းလဲနေသော pre-release channel တစ်ခုဖြစ်သည်။ လက်ရှိအသုံးပြုနေသော release branch သို့ push လုပ်သည့်အခါတိုင်း ၎င်းသည် ပြောင်းလဲနိုင်ပြီး **production အသုံးပြုမှုအတွက် ပံ့ပိုးမထားပါ**။ သီးခြား build တစ်ခုကို အကဲဖြတ်နေစဉ် image digest ကို pin လုပ်ထားပါ။

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

စမ်းသပ်ခြင်းမပြုမီ OmniRoute data volume သို့မဟုတ် bind-mount လုပ်ထားသော data directory ကို အရန်သိမ်းပါ။ နောက်ဗားရှင်းသို့ ပြန်လှည့်ရန် ယခင်အသုံးပြုခဲ့သော stable version သို့မဟုတ် digest ကို ပြန်လည်ထားရှိပြီး container ကို ပြန်လည်ဖန်တီးပါ။

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build တစ်ခုသည် `latest` ကို မည်သည့်အခါမျှ ရွှေ့ပြောင်းနိုင်မည်မဟုတ်ပါ။ သတ်မှတ်ချက်နှင့်ကိုက်ညီသော stable semantic version တစ်ခုသာ stable pointer ကို မြှင့်တင်နိုင်ပါသည်။ `next` image များတွင် release image စစ်ဆေးခြင်းနှင့် CRITICAL vulnerability တွေ့ရှိပါက ပိတ်ဆို့သည့် gate ကို ဆက်လက်ထိန်းသိမ်းထားပါသည်။

**`latest` သည် git အတွက် နောက်ဆုံးအခြေအနေဖြစ်ကြောင်း အာမခံချက်မဟုတ်ပါ။** `main` သို့မဟုတ် လက်ရှိ `release/v*` branch တွင် merge လုပ်ထားသော ပြင်ဆင်ချက်များသည် stable SemVer image တစ်ခုကို ထုတ်ဝေပြီး publish job က `:latest` ကို မြှင့်တင်ပေးသည့်အချိန်အထိ **`:latest` ထဲတွင် မပါဝင်သေးပါ** (ထို SemVer နှင့် digest တူညီပါသည်)။ GitHub တွင် ပြင်ဆင်ချက်ကို ပြသထားပြီးဖြစ်သော်လည်း `latest` က မပြောင်းလဲဘဲ ရှိနေပါက release branch ကို စမ်းသပ်ရန် `:next` ကို pull လုပ်ပါ သို့မဟုတ် SemVer tag ထွက်လာသည်အထိ စောင့်ပါ။

| သင်လိုချင်သည့်အရာ                                                                          | အသုံးပြုရန်                                      |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| မပြောင်းလဲရမည့် GitOps / production                                                        | `:X.Y.Z` (သို့မဟုတ် image digest) ကို pin လုပ်ပါ |
| ထုတ်ဝေထားသော stable များကို လိုက်နာပြီး release တစ်ခုစီတွင် ပြန်လည်ဖန်တီးခြင်းကို လက်ခံရန် | `:latest`                                        |
| မထုတ်ဝေရသေးသော `release/v*` commit များကို စမ်းသပ်ရန်                                      | `:next` (production မဟုတ်ပါ)                     |
| `main` ကို စမ်းသပ်ရန်                                                                      | `:main` (production မဟုတ်ပါ)                     |

## ရရှိနိုင်မှု: မူလ SQLite သည် replica တစ်ခုတည်းသာ ဖြစ်သည်

ပုံမှန် Docker / Kubernetes OmniRoute သည် **Node process တစ်ခု + SQLite writer တစ်ခု** ဖြစ်သည်။ ဤ topology တွင် high availability ကို **ပံ့ပိုးမထားပါ**။

| ကန့်သတ်ချက်                                              | အကျိုးဆက်                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Writer တစ်ခုတည်း                                         | SQLite file တစ်ခုတည်းကို အသုံးပြု၍ replica များစွာကို **မလည်ပတ်ပါနှင့်**။ ထိုသို့ပြုလုပ်ပါက DB ပျက်စီးသွားမည်။                                                                                                                                                                                                                                                                                |
| ပြန်လည်ဖန်တီးခြင်း / ပြန်လည်စတင်ခြင်း / HEALTHCHECK kill | လုပ်ဆောင်ဆဲ SSE များ၊ dashboard session များနှင့် memory အတွင်းရှိ state များအားလုံး **လုံးဝပြတ်တောက်မည်**။ ချိတ်ဆက်ထားသော client အားလုံး ပြတ်တောက်သွားမည်။ Endpoint မရှိသည့်ကြားကာလအတွင်း request အသစ်များသည် OmniRoute JSON မဟုတ်ဘဲ reverse-proxy **`502 Bad Gateway: Unknown error`** ကို ရရှိမည်ဖြစ်သောကြောင့် client များက ၎င်းကို provider ပျက်ကွက်မှုနှင့် ခွဲခြားမသိနိုင်ပါ (#11015)။ |
| `/healthz` နှင့် တူညီသော event loop                      | အလုပ်များနေသော catalog သို့မဟုတ် compression tick က probe များကို နှောင့်နှေးစေနိုင်သည်။ ထို့နောက် timeout တိုလွန်းပါက **တစ်ခုတည်းသော** replica ကို ပြန်လည်စတင်စေမည်။                                                                                                                                                                                                                         |

**Probe matrix** ([Kubernetes probe အကြံပြုချက်များ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ကိုလည်း ကြည့်ပါ):

| Probe              | ပစ်မှတ်                                                                | အသုံးမပြုရမည့်အရာ                                                          |
| ------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Liveness           | `PORT` (မူလတန်ဖိုး `20128`) ပေါ်ရှိ TCP သို့မဟုတ် soft HTTP `/healthz` | `/api/monitoring/health`                                                   |
| Readiness          | HTTP `GET /healthz`                                                    | Event loop အလုပ်များနေခြင်းကို ရပ်တန့်သွားသည်ဟု သတ်မှတ်သော timeout တိုများ |
| Deep / လူများအတွက် | `/api/monitoring/health`                                               | အလိုအလျောက် kubelet liveness                                               |

**အဆင့်မြှင့်တင်မှုများ:** session တိုင်း ပြတ်တောက်မည်ဟု မျှော်မှန်းထားပါ။ ဖြစ်နိုင်ပါက client များကို drain လုပ်ပါ။ မူလ SQLite တွင် rolling update မရှိပါ။ Compose `restart: unless-stopped` နှင့် Docker `HEALTHCHECK` တို့သည် container က Unhealthy ဖြစ်သည့်အခါ တစ်ခုတည်းသော process ကိုလည်း အစားထိုးမည်ဖြစ်ပြီး သက်ရောက်မှုအတိုင်းအတာမှာလည်း အတူတူပင်ဖြစ်သည်။

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

`preStop` sleep သည် SIGTERM မပို့မီ kube အား Service endpoint များကို ဖယ်ရှားနိုင်စေသောကြောင့် traffic **အသစ်** သည် ရပ်တန့်တော့မည့် process ထံ မရောက်တော့ပါ။ လုပ်ဆောင်ဆဲ `/v1/responses` SSE ကို heavyweight admission lease များမှတစ်ဆင့် `SHUTDOWN_TIMEOUT_MS` (မူလတန်ဖိုး 30s) အထိ drain လုပ်သည် (#11015)။ Process ထံ ရောက်ရှိနေဆဲ request အသစ်များသည် `503` + `Retry-After: 5` ကို ရရှိမည်။ အစားထိုး process က Ready ဖြစ်လာသည်အထိ Recreate ၏ endpoint မရှိသည့်ကြားကာလသည် အပြည့်အဝပြတ်တောက်မှုအဖြစ် ဆက်လက်ရှိနေမည်ဖြစ်သည်။ ၎င်းသည် probe configuration မှားယွင်းမှုမဟုတ်ဘဲ SQLite topology ကြောင့်ဖြစ်သည်။

External Postgres / multi-writer HA သည် မှတ်တမ်းပြုထားသော ပုံမှန်နည်းလမ်း **မဟုတ်ပါ**။ HA လိုအပ်ပါက replica တစ်ခုတည်းကို ထားရှိပါ သို့မဟုတ် project က သီးခြားစမ်းသပ်ပြီး မှတ်တမ်းပြုထားသည့် topology ကို အသုံးပြုပါ။ Postgres/MySQL အလုပ်ကို [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) တွင် လုပ်ဆောင်နေသည်။ ၎င်းကို ထုတ်ဝေမပြီးမချင်း **ကြီးမားသော** `/v1/responses` capacity ကို တိုးမြှင့်ရန် ပံ့ပိုးထားသည့် တစ်ခုတည်းသောနည်းလမ်းမှာ သီးခြား process N ခု (နောက်အပိုင်း) ဖြစ်ပြီး volume တစ်ခုပေါ်တွင် `replicas > 1` အသုံးပြုခြင်း မဟုတ်ပါ။

## Scale-out: အမှီအခိုကင်းသော process N ခု

Node process တစ်ခုသည် **V8 heap တစ်ခု** ဖြစ်သည်။ တစ်ခုနှင့်တစ်ခု ထပ်နေသော ~3 MiB / ~750k-token coding-agent `POST /v1/responses` နှစ်ခု (RTK + Caveman) သည် ~12 Gi တွင် ထို heap ကို ရပ်တန့်စေပြီး (`FATAL ERROR: Reached heap limit`) 16 Gi cgroup တစ်ခုကို OOM ဖြစ်စေနိုင်သည်။ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ကို ကြည့်ပါ။ ထိုတိုင်းတာချက်သည် **memory-budget** သတိပေးချက်ဖြစ်ပြီး တစ်ပြိုင်နက်လုပ်ဆောင်နိုင်သော ရှည်လျားသည့် `/v1/responses` နှစ်ခုဟူသော product hard-max မဟုတ်ပါ။ Heavyweight chat လက်ခံမှုကို တူညီသည့် V8/cgroup အမြင့်ဆုံးကန့်သတ်ချက်မှ အလိုအလျောက်တွက်ချက်ထားသော ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ဖြင့် ထိန်းချုပ်ထားသည် — အရွယ်အစားသတ်မှတ်ပြီးသား process တစ်ခုတွင် ၎င်းကို ပိုမြင့်အောင် override လုပ်ခြင်း (သို့မဟုတ် legacy `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap ကို သတ်မှတ်ခြင်း) သည် အဆိုပါ ရပ်တန့်မှုကို ပြန်လည်ဖြစ်ပေါ်စေသည်။ သေးငယ်သော chat များ၊ `/healthz`၊ `/v1/models` နှင့် MCP တို့သည် ထို cap ထဲတွင် **မပါဝင်ပါ**။

### Process တစ်ခုတည်းတွင် ရှည်လျားသည့် `/v1/responses` နှစ်ခုထက်ပို၍ လုပ်ဆောင်ခြင်း

**ကောင်းမွန်သည့်အခြေအနေရှိသော** process တစ်ခုသည် (heap သည် `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` အောက်တွင်ရှိပြီး မူလတန်ဖိုးမှာ `0.75` ဖြစ်သည်) process တစ်ခုလုံးအတွက် inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) တွင် နေရာရှိနေသေးပါက တစ်ပြိုင်နက် ရှည်လျားသည့် `POST /v1/responses` နှစ်ခုထက်ပို၍ လုပ်ဆောင်နိုင်သည်။ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (မူလတန်ဖိုး 256 KiB) နှင့်ညီမျှသော သို့မဟုတ် ၎င်းထက်ကြီးသော body များသည် structure-heavy request များကဲ့သို့ တူညီသည့် heavyweight lease ကို ရယူပြီး တူညီသည့် [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` လွတ်မြောက်ရေးနည်းလမ်း (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ကို အသုံးပြုသည်။ တစ်ပြိုင်နက် ရှည်လျားသည့် SSE client ဆယ်နှင့်ချီ၍ (operator များသည် မကြာခဏ 40–50 အထိ လိုအပ်သည်) အသုံးပြုခြင်းသည် **memory-budget** ဆိုင်ရာ မေးခွန်းဖြစ်သည် — heap + primary/headroom slot များ + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ကို အရွယ်အစားမှန်ကန်စွာ သတ်မှတ်ရန်ဖြစ်ပြီး hard “max 2” product limit မဟုတ်ပါ။ ဖိအားများနေသော heap သည် #7849 ပြန်လည်မဖြစ်ပေါ်စေရန် retry လုပ်နိုင်သည့် `503` ဖြင့် request များကို ဆက်လက်ဖယ်ရှားသည်။

**heap များကို မြှောက်ပွားရန်** (အမှီအခိုကင်းသော V8 old-space များ) **လက်ရှိတွင်**:

| လုပ်ဆောင်ရန်                                                                                                                                                    | မလုပ်ဆောင်ရန်                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **N containers/pods** ကို run ပြီး တစ်ခုစီအတွက် ၎င်း၏ **ကိုယ်ပိုင်** `DATA_DIR` / volume ကို အသုံးပြုပါ                                                         | SQLite file တစ်ခုတည်းကို အသုံးပြုပြီး `replicas > 1` သတ်မှတ်ခြင်း                   |
| Heavy in-flight + healthy-headroom ကို heap / inflight-byte budget အရ အရွယ်အစားသတ်မှတ်ပါ။ 1–2 သည် ရှေးရိုးစွဲ #7849 မူလတန်ဖိုးဖြစ်ပြီး hard product max မဟုတ်ပါ | Process တစ်ခုကို RAM 8× နှင့် ကန့်သတ်မထားသော count cap ပေးခြင်း                     |
| ရွေးချယ်နိုင်သည်- **မျှဝေထားသော quota counter များ** အတွက် `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                 | Redis ကို shared SQLite အဖြစ် သတ်မှတ်ယူဆခြင်း — ၎င်းတို့ မတူညီပါ                    |
| Provider secret များကို instance တစ်ခုစီသို့ ပွားထည့်ပါ (သို့မဟုတ် သီးခြားခွဲထားသော dashboard များကို လက်ခံပါ)                                                  | Instance အားလုံးအတွက် dashboard တစ်ခု / call-log တစ်ခု ရရှိမည်ဟု မျှော်လင့်ခြင်း    |
| မည်သည့် load balancer ဖြင့်မဆို ရှေ့ခံပေးပါ။ API key သို့မဟုတ် session အလိုက် sticky ဖြစ်လျှင် လုံလောက်သည်                                                      | Vendor တစ်ခုအတွက် သီးသန့်ဖြစ်သော size-aware middleware ကို လိုအပ်သည်ဟု သတ်မှတ်ခြင်း |

Hardware: Instance တစ်ခုစီအတွက် တစ်ပြိုင်နက် ရှည်လျားသည့် `/v1/responses` အရေအတွက်သည် **memory-budget** ဆိုင်ရာ မေးခွန်းဖြစ်သည် (heap + inflight-byte / #10110)။ အမှီအခိုကင်းသော `DATA_DIR` N ခုသည် heap များကို မြှောက်ပွားဆဲဖြစ်သည်။ Host RAM သည် “N=8 ပါသည့် 16 Gi pod တစ်ခု” ကိုသာမက `N × cgroup` ကိုပါ လုံလောက်စွာ ပံ့ပိုးနိုင်ရမည်။ SQLite file တစ်ခုတည်းတွင် `replicas > 1` ကို မည်သည့်အခါမျှ မသုံးပါနှင့်။

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

In-process သိပ်သည်းဆ (HTTP isolate မှ compression ကို ဖယ်ထုတ်ခြင်း) သည် [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ဖြစ်သည်။ မျှဝေထားသော ရေရှည်ခံ state ပေါ်ရှိ logical cluster တစ်ခုသည် [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ဖြစ်သည်။

## Docker အတွင်းရှိ Gemini ဒေသဆိုင်ရာ အမှားများ

Google AI Studio / Gemini API သည် HTTP 400 ကို FAILED_PRECONDITION နှင့်အတူ ပြန်ပေးနိုင်ပြီး
`User location is not supported for the API use.` ဟု ဖော်ပြနိုင်သည်။ Host ပေါ်တွင် တောင်းဆိုမှု အောင်မြင်ခြင်းက
container သည် တူညီသော outbound route ကို အသုံးပြုနေကြောင်း သက်သေမပြနိုင်ပါ။ DNS အစီအစဉ်၊
IPv4/IPv6 ချိတ်ဆက်နိုင်မှု၊ VPN routing နှင့် သတ်မှတ်ထားသော proxy များ ကွာခြားနိုင်သည်။
[Google ပံ့ပိုးထားသော ဒေသများ](https://ai.google.dev/gemini-api/docs/available-regions) နှင့်
အမှန်တကယ် ချိတ်ဆက်သည့် route ကိုပါ စစ်ဆေးပါ။ ဤအမှားတစ်ခုတည်းဖြင့် မမှန်ကန်သော API key ဖြစ်ကြောင်း မသတ်မှတ်နိုင်ပါ။

### ချိတ်ဆက်မှုတစ်ခုချင်းစီအလိုက် proxy ကို ဦးစားပေးပါ

သက်ရောက်မှုရှိသော Gemini ချိတ်ဆက်မှုအတွက် OmniRoute ၏
[ချိတ်ဆက်မှုတစ်ခုချင်းစီအလိုက် proxy ဖွဲ့စည်းသတ်မှတ်မှု](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ကို အသုံးပြုပြီးနောက် **Test Connection** နှင့် တူညီသော model ကို အသုံးပြုသည့် တောင်းဆိုမှုအသေးစားတစ်ခုကို
ထပ်မံလုပ်ဆောင်ပါ။ ထိုသို့ပြုလုပ်ခြင်းဖြင့် routing ပြောင်းလဲမှုကို ထိုချိတ်ဆက်မှုတစ်ခုတည်းအတွင်း ကန့်သတ်ထားနိုင်သည်။
Container မှ proxy ကို ဆက်သွယ်နိုင်ကြောင်းနှင့် ချိတ်ဆက်မှုက ထို proxy ကို အမှန်တကယ် ရွေးချယ်ထားကြောင်း
အတည်ပြုပါ။ Route ပြောင်းလဲခြင်းသည် upstream ဒေသဆိုင်ရာ အသုံးပြုခွင့်ရရှိမည်ဟု အာမမခံပါ။

### Host နှင့် container ကွန်ရက်ကို နှိုင်းယှဉ်ပါ

Authentication ပါဝင်သော ရလဒ်များကို နှိုင်းယှဉ်သည့်အခါ key၊ model နှင့် request ကို တူညီအောင်ထားပါ။ Credentials၊
proxy password များ သို့မဟုတ် authorization header အပြည့်အစုံကို issue တစ်ခုအတွင်း မည်သည့်အခါမျှ
မထည့်ပါနှင့်။ ပထမဦးစွာ OS resolver က မည်သည့် address family များကို ပေးထားသည်ကို စစ်ဆေးရန်
host နှင့် container အတွင်း နှစ်နေရာစလုံးတွင် တူညီသော command ကို အသုံးပြုပါ။

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` ကို သင်အသုံးပြုနေသော service (ဥပမာ `omniroute-web`) ဖြင့် အစားထိုးပါ။ ဤ command များသည်
credentials သို့မဟုတ် IP address များ မပါဝင်ဘဲ address family များကို ဖော်ပြပေးသည်။ ပြန်ရရှိလာသော `6` သည်
IPv6 DNS ရလဒ်တစ်ခုရှိကြောင်းကိုသာ ပြသသည်။ အသုံးပြုနိုင်သော IPv6 route သို့မဟုတ် API အသုံးပြုခွင့်ရှိကြောင်း
သက်သေပြခြင်း **မဟုတ်ပါ**။ `curl` ကို ထည့်သွင်းထားပါက environment နှစ်ခုစလုံးတွင်
`curl -4 -I https://generativelanguage.googleapis.com` နှင့်
`curl -6 -I https://generativelanguage.googleapis.com` ကို နှိုင်းယှဉ်ပါ။
Authentication မပါဝင်သော အမှားဖြစ်နေလျှင်ပင် HTTP response တစ်ခုရရှိခြင်းသည် ထိုစမ်းသပ်မှုအတွက်
ချိတ်ဆက်နိုင်ကြောင်း သက်သေပြသည်။ Authentication ပါဝင်သော model request ဖြင့်သာ Gemini အသုံးပြုခွင့်ကို စမ်းသပ်နိုင်သည်။

### Host အဆင့် အခြားနည်းလမ်း—အလုပ်လုပ်သော IPv6 နှင့် resolver policy

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ကို အစီရင်ခံသူသည်
container IPv6 ကို ဖွင့်ပြီး glibc address ရွေးချယ်မှုကို ပြောင်းလဲခြင်းဖြင့် ၎င်းတို့၏ environment တွင်
အသုံးပြုခွင့် ပြန်လည်ရရှိခဲ့သည်။ ၎င်းကို environment တစ်ခုချင်းစီအလိုက်သာ သက်ဆိုင်သော အခြားနည်းလမ်းအဖြစ်
မှတ်ယူပါ။ Resolver ဦးစားပေးမှုများကို မပြင်ဆင်မီ host IPv6 အလုပ်လုပ်ကြောင်း၊ container egress/routing နှင့်
firewall rule များကို အတည်ပြုပါ။ Private ULA address တစ်ခုရှိရုံဖြင့် public IPv6 ချိတ်ဆက်နိုင်ကြောင်း
မသက်သေပြနိုင်ပါ။

Compose ၏ default network နှင့် ချိတ်ဆက်ထားပြီးဖြစ်သော service များအတွက် အောက်ပါ fragment သည်
ထို network တွင် IPv6 ကို ဖွင့်ပေးသည်။ သင်၏ service၊ port၊ volume နှင့် configuration အခြားအစိတ်အပိုင်းများကို
မပြောင်းလဲဘဲ ဆက်လက်ထိန်းသိမ်းပါ။

```yaml
networks:
  default:
    enable_ipv6: true
```

Named network အတွက် service အမှန်တကယ် ချိတ်ဆက်ထားသော network ပေါ်တွင် ၎င်းကို ဖွင့်ပါ။ Docker သည်
ULA subnet တစ်ခုကို ခွဲဝေပေးနိုင်သည်။ သင်၏ network က လိုအပ်သည့်အခါမှသာ တိကျစွာသတ်မှတ်ထားပြီး
တစ်ခုနှင့်တစ်ခု မထပ်သော subnet ကို ရွေးချယ်ပါ။
[Docker IPv6 ကွန်ရက်](https://docs.docker.com/engine/daemon/ipv6/) နှင့်
[Compose network ရွေးချယ်စရာများ](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)
ကို ကြည့်ပါ။

**glibc အခြေခံ image** တစ်ခုတွင် `/etc/gai.conf` က address ရွေးချယ်မှုကို ပြောင်းလဲနိုင်သည်။ လက်ရှိ
repository Dockerfile သည် Debian ကို အသုံးပြုထားသည်။ စိတ်ကြိုက် musl အခြေခံ image များတွင် ဤစနစ်
မရှိပါ။ အစီရင်ခံထားသော ပြင်ဆင်မှုသည် ULA label ကို `label fc00::/7 6` မှ
`label fc00::/7 1` သို့ ပြောင်းလဲသည်။ Image ၏ policy table အပြည့်အစုံမှ စတင်ပြီး အခြား entry များကို
မပြောင်းလဲဘဲ ထိန်းသိမ်းပါ။ `label` သို့မဟုတ် `precedence` entry တစ်ခု ထည့်ခြင်းသည် ထို default table ကို
အစားထိုးသောကြောင့် ပြောင်းလဲထားသော စာကြောင်းတစ်ကြောင်းသာ ပါဝင်သည့် file သည် မလုံလောက်ပါ။
[glibc configuration အကိုးအကား](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
တွင် ထိုလုပ်ဆောင်ပုံများကို မှတ်တမ်းတင်ထားသည်။ ပြန်လည်စစ်ဆေးပြီးသော file ကို `/etc/gai.conf` တွင်
read-only အဖြစ် bind-mount လုပ်ပြီး ပြောင်းလဲမှုသက်ရောက်စေရန် service ကို ပြန်လည်ဖန်တီးပါ။

ဤပြောင်းလဲမှုသည် **ထို container အတွင်းရှိ outbound traffic အားလုံးအတွက်** OS address ရွေးချယ်မှုကို
ပြောင်းလဲသည်။ Application တိုင်းကို IPv6 ရွေးချယ်ရန် အတင်းအကျပ် သတ်မှတ်ပေးခြင်း မဟုတ်ပါ။ Node ၏
DNS အစီအစဉ်နှင့် ချိတ်ဆက်မှုရွေးချယ်ခြင်းတို့လည်း အရေးကြီးသည်။ အထူးသဖြင့်
`--dns-result-order=ipv4first` သည် IPv4 ကို ဦးစားပေးသဖြင့် IPv4-only ချို့ယွင်းမှုအတွက် ဖြေရှင်းချက်
မဟုတ်ပါ။ [Node DNS အစီအစဉ်](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) ကို ကြည့်ပါ။

Host အဆင့် ပြောင်းလဲမှုတစ်ခုခု ပြုလုပ်ပြီးတိုင်း Gemini နှင့် သင်၏ အခြား provider များကို ပြန်လည်စမ်းသပ်ပါ။
မူလအခြေအနေသို့ ပြန်ပြောင်းရန် စိတ်ကြိုက် `gai.conf` mount ကို ဖယ်ရှားပြီး ယခင် network configuration ကို
ပြန်ထားကာ maintenance window အတွင်း သက်ရောက်မှုရှိသော service/network ကို ပြန်လည်ဖန်တီးပါ။ Network တစ်ခုကို
ပြန်လည်ဖန်တီးခြင်းသည် ၎င်းနှင့် ချိတ်ဆက်ထားသော အခြား container များကို ပြတ်တောက်စေနိုင်သည်။ Persistent data volume ကို
မဖျက်ပါနှင့်။

## အရေးကြီးသော မှတ်ချက်များ

- **SQLite WAL မုဒ်:** OmniRoute က နောက်ဆုံးပြောင်းလဲမှုများကို `storage.sqlite` သို့ checkpoint ပြန်လုပ်နိုင်ရန် `docker stop` ကို အပြီးသတ်ခွင့်ပြုသင့်သည်။ ထည့်သွင်းပေးထားသော Compose ဖိုင်များတွင် ရပ်တန့်ရန် အချိန်ပို 40s ကို သတ်မှတ်ထားပြီးဖြစ်သည်။ Image ကို တိုက်ရိုက် run ပါက `--stop-timeout 40` ကို ဆက်လက်ထားရှိပါ။
- **`DISABLE_SQLITE_AUTO_BACKUP`:** ပုံမှန်/ရေးသားခြင်းမပြုမီ backup များကို ပြင်ပမှ စီမံခန့်ခွဲထားပါက `true` ဟု သတ်မှတ်ပါ။ ရှိပြီးသား database များကို migration လုပ်ရာတွင် ၎င်းတို့အတွက် သီးခြားတာရှည်ခံသော ဘေးကင်းရေး snapshot နှင့် အစုလိုက် migration ကာကွယ်မှု လိုအပ်နေဆဲဖြစ်သည်။
- **ဒေတာ တည်မြဲစွာသိမ်းဆည်းခြင်း:** Container ပြန်လည်စတင်မှုများတစ်လျှောက် သင့် database၊ key များနှင့် configuration များကို ဆက်လက်သိမ်းဆည်းထားရန် `/app/data` သို့ volume တစ်ခုကို အမြဲ mount လုပ်ပါ။
- **Port ဖွဲ့စည်းသတ်မှတ်မှု:** မူလ `20128` port ကို ပြောင်းလဲရန် `PORT` environment variable ကို override လုပ်ပါ။

## ဆက်လက်ကြည့်ရှုရန်

- [VM ဖြန့်ကျက်ခြင်း လမ်းညွှန်](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare စနစ်ထည့်သွင်းခြင်း
- [Fly.io ဖြန့်ကျက်ခြင်း လမ်းညွှန်](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io သို့ ဖြန့်ကျက်ခြင်း
- [Environment ဖွဲ့စည်းသတ်မှတ်မှု](../reference/ENVIRONMENT.md) — ပြည့်စုံသော `.env` အကိုးအကား
