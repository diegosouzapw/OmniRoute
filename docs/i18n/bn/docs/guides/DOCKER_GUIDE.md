# 🐳 Docker Guide — OmniRoute (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> সম্পূর্ণ Docker ডিপ্লয়মেন্ট রেফারেন্স। দ্রুত শুরু করার জন্য [README-এর Docker বিভাগ](../README.md#-docker) দেখুন।

## সূচিপত্র

- [দ্রুত চালু করা](#quick-run)
- [এনভায়রনমেন্ট ফাইলসহ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [উপলভ্য প্রোফাইলসমূহ](#available-profiles)
- [OmniRoute Docker-এ চলার সময় হোস্ট CLI টুল কনফিগার করা](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis সাইডকার](#redis-sidecar)
- [প্রোডাকশন Compose](#production-compose)
- [Dockerfile-এর স্টেজসমূহ](#dockerfile-stages)
- [গুরুত্বপূর্ণ এনভায়রনমেন্ট ভেরিয়েবলসমূহ](#critical-environment-variables)
- [Caddy (HTTPS) সহ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [ইমেজ ট্যাগসমূহ](#image-tags)
- [উপলভ্যতা: ডিফল্ট SQLite একক-রেপ্লিকা](#availability-default-sqlite-is-single-replica)
- [গুরুত্বপূর্ণ নোটসমূহ](#important-notes)

---

## দ্রুত চালু করুন

> **একটি কমান্ডেই স্ব-হোস্ট করতে চান?** দেখুন
> [স্ব-হোস্ট নির্দেশিকা](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (প্রকাশিত ইমেজ +
> Redis, শুধুমাত্র লুপব্যাক, কোনো প্রোফাইল নির্বাচন নেই)। নিচের দ্রুত চালুর পদ্ধতিটি
> সেই ব্যবহারকারীদের জন্য একক-কনটেইনার পদ্ধতি, যাঁরা ইতিমধ্যেই অন্যত্র Redis চালান।

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## এনভায়রনমেন্ট ফাইলসহ

```bash
# প্রথমে .env কপি ও সম্পাদনা করুন
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
# বেস প্রোফাইল (কোনো CLI টুল নেই)
docker compose --profile base up -d

# CLI প্রোফাইল (Claude Code, Codex, OpenClaw বিল্ট-ইন)
docker compose --profile cli up -d

# হোস্ট প্রোফাইল (প্রধানত Linux-এর জন্য; হোস্ট CLI বাইনারিগুলো শুধু-পঠনযোগ্য হিসেবে মাউন্ট করে)
docker compose --profile host up -d

# CLI + CLIProxyAPI সাইডকার একত্রে ব্যবহার করুন
docker compose --profile cli --profile cliproxyapi up -d
```

## উপলভ্য প্রোফাইলসমূহ

OmniRoute-এর সঙ্গে চারটি Compose প্রোফাইল দেওয়া হয়। আপনার পরিবেশের সঙ্গে মেলে এমনটি বেছে নিন।

| প্রোফাইল        | সার্ভিস          | কখন ব্যবহার করবেন                                                                                                                                | কমান্ড                                       |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (ডিফল্ট) | `omniroute-base` | হেডলেস সার্ভার / ন্যূনতম রানটাইম, কোনো প্রোভাইডার CLI অন্তর্ভুক্ত নেই                                                                            | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | `omniroute providers/setup/doctor` এবং অন্তর্ভুক্ত CLI-গুলো (Codex, Claude Code, Droid, OpenClaw) ব্যবহারকারী এজেন্টিক ওয়ার্কফ্লো               | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | যেসব Linux হোস্ট `~/.local/bin`, `~/.codex`, `~/.claude` ইত্যাদি শুধু-পঠনযোগ্য হিসেবে মাউন্ট করে হোস্ট CLI-তে `network_mode`-সদৃশ অ্যাক্সেস চায় | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | আপস্ট্রিম CLI প্রক্সিংয়ের জন্য `8317` পোর্টে [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) সাইডকার চালান                          | `docker compose --profile cliproxyapi up -d` |

> একাধিক প্রোফাইল একত্রে ব্যবহার করা যায়: `docker compose --profile cli --profile cliproxyapi up -d`।

## OmniRoute Docker-এ চলার সময় হোস্ট CLI টুল কনফিগার করা

`omniroute setup-codex`, `setup-claude`, `config set <tool>` এবং ড্যাশবোর্ডের
**কনফিগ সংরক্ষণ করুন** বোতাম—সবই `~/.codex/*.config.toml`-এর মতো ফাইল লেখে। এই পাথগুলোর
অর্থ কেবল সেই মেশিনেই রয়েছে, যেখানে CLI প্রকৃতপক্ষে চলে। এগুলো কনটেইনারের ভেতরে
চালালে ফাইলটি কনটেইনারের নিজস্ব home-এ (`/home/node` —
ইমেজটি `USER node` হিসেবে চলে) লেখা হয়, যেখান থেকে কোনো হোস্ট CLI কখনো এটি পড়বে না এবং
কনটেইনারটি পুনরায় তৈরি হওয়ার সঙ্গে সঙ্গেই এটি মুছে যাবে।

OmniRoute এটি শনাক্ত করে এবং আপনার কাজে আসবে না এমন সফলতার বার্তা দেখানোর পরিবর্তে
নির্দেশনাসহ ফাইল লেখা প্রত্যাখ্যান করে: CLI `2` কোড দিয়ে বন্ধ হয় এবং API `422`
ও `containerEphemeralTarget: true` দিয়ে উত্তর দেয়।

### প্রস্তাবিত: CLI হোস্টে এবং OmniRoute Docker-এ চালান

কনটেইনারটি API পরিবেশন করে; CLI আপনার হোস্ট টুলগুলো কনফিগার করে।

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI-কে কনটেইনারের দিকে নির্দেশ করুন
omniroute setup-codex                      # আপনার হোস্টের প্রকৃত ~/.codex-এ লেখে
```

Codex, Claude Code, Cursor বা অনুরূপ টুল আপনার
ল্যাপটপে চললে এটিই সঠিক পছন্দ—যা সাধারণত প্রচলিত সেটআপ।

### বিকল্প: হোস্টের কনফিগ ডিরেক্টরিগুলো bind-mount করুন (`host` প্রোফাইল)

আপনি যদি কনটেইনার থেকেই হোস্টের কনফিগ লিখতে চান, তাহলে
ডিরেক্টরিগুলো mount করুন এবং `CLI_CONFIG_HOME`-কে mount root-এর দিকে নির্দেশ করুন। `host` প্রোফাইল
ইতোমধ্যেই এটি করে:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

একটি bind mount-ই পাথটিকে নির্ভরযোগ্য করে তোলে: OmniRoute
`/proc/self/mountinfo` পড়ে এবং mounted পাথে (এবং যেসব ডিরেক্টরির
সন্তানগুলো mount করা, যা ওপরের `/host-home` বিন্যাসের সঙ্গে হুবহু মেলে) ফাইল লেখার অনুমতি দেয়, একই সঙ্গে
unmounted পাথে লেখা প্রত্যাখ্যান করে।

### বিকল্প ব্যবস্থা: কনটেইনারের নিজস্ব CLI-গুলো কনফিগার করুন (সীমিতভাবে ব্যবহার করুন)

CLI-গুলো যখন সত্যিই কনটেইনারের ভেতরে থাকে (`cli` প্রোফাইল), তখন ফাইল
লেখাটি ইচ্ছাকৃত। যেকোনো `setup-*` কমান্ডে `--allow-container-write` দিন অথবা
সার্ভারের জন্য `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` সেট করুন। ফাইল লেখা
এগিয়ে যাবে, তবে একটি সতর্কবার্তা দেখানো হবে যে এটি কনটেইনারের স্থায়িত্বকাল অতিক্রম করে টিকবে না।

> **নিরাপত্তা সতর্কতা — `cli` প্রোফাইল + `docker.sock` mount।**
> কনটেইনারের ভেতরের auto-updater যেন হোস্ট daemon থেকে stack পুনরায় তৈরি করতে পারে,
> সে জন্য `cli` প্রোফাইল `/var/run/docker.sock` bind-mount করে
> (`src/lib/system/autoUpdate.ts` ওই socket-এর উপস্থিতি পরীক্ষা করে এবং সেটি
> অনুপস্থিত থাকলে Docker পাথ এড়িয়ে যায়)। ওই socket একটি **host-root trust
> boundary**: এতে প্রবেশাধিকার থাকা যেকোনো কিছু root হিসেবে হোস্ট Docker daemon
> নিয়ন্ত্রণ করে—এটি হোস্টের যেকোনো কনটেইনার তৈরি, পরিদর্শন, বন্ধ এবং অপসারণ করতে পারে।
> এর প্রভাব:
>
> 1. **`cli` প্রোফাইলের port কখনোই নেটওয়ার্কে উন্মুক্ত করবেন না।** এটিকে
>    `127.0.0.1`-এ প্রকাশ করুন (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN থেকে প্রবেশযোগ্য একটি `cli` প্রোফাইল dashboard-স্তরের যেকোনো RCE-কে
>    সম্পূর্ণ হোস্ট দখলে পরিণত করে।
> 2. **`cli` প্রোফাইলে অতিরিক্ত কোনো হোস্ট ডিরেক্টরি bind করবেন না।**
>    Docker socket-এর সঙ্গে যেকোনো অতিরিক্ত mount কনটেইনারকে আপনার filesystem এবং
>    হোস্ট কনফিগে পূর্ণ read/write প্রবেশাধিকার দেয়। কোনো টুলের একটি project দেখার
>    প্রয়োজন হলে, CLI binary দিয়ে সেটি স্থানীয়ভাবে চালান—`cli` কনটেইনারে
>    mount করবেন না।
>
> কনটেইনারের ভেতরে auto-update প্রয়োজন না হলে, `cli` প্রোফাইল বন্ধ রাখুন
> (`COMPOSE_PROFILES=core,redis` অথবা আরও সংক্ষিপ্ত কিছু)। অন্য প্রোফাইলগুলো
> Docker socket mount করে না।
>
> MITM-সংক্রান্ত threat model-এর জন্য `docs/security/MITM-TPROXY-DECRYPT.md` দেখুন (git-এ রয়েছে; `/docs`-এ compile করা হয়নি),
> এবং `codex`/`claude-code`/`droid`/`openclaw` binary provenance chain-এর জন্য
> `docs/security/SUPPLY_CHAIN.md` দেখুন।

## Redis সাইডকার

OmniRoute ডিস্ট্রিবিউটেড রেট লিমিটার এবং শেয়ার্ড ক্যাশ সমর্থন করতে Redis-এর ওপর নির্ভর করে। `redis` সার্ভিসটি `docker-compose.yml`-এ **সবসময় সংজ্ঞায়িত থাকে** (এতে কোনো প্রোফাইল গেট নেই) এবং অন্য যেকোনো প্রোফাইলের পাশাপাশি চালু হয়।

| বিবরণ                   | মান                                    |
| ----------------------- | -------------------------------------- |
| ইমেজ                    | `redis:7-alpine`                       |
| কনটেইনারের নাম          | `omniroute-redis`                      |
| অভ্যন্তরীণ পোর্ট        | `6379`                                 |
| হোস্ট পোর্ট (ওভাররাইড)  | `REDIS_PORT` (ডিফল্ট `6379`)           |
| হোস্ট বাইন্ড (ওভাররাইড) | `REDIS_BIND_HOST` (ডিফল্ট `127.0.0.1`) |
| ভলিউম                   | `omniroute-redis-data` → `/data`       |
| হেলথচেক                 | `redis-cli ping` (10s ব্যবধান)         |

সংশ্লিষ্ট এনভায়রনমেন্ট ভেরিয়েবলসমূহ:

- `REDIS_URL` — অ্যাপে ইনজেক্ট করা সংযোগ স্ট্রিং (ডিফল্টরূপে `redis://redis:6379`)।
- `REDIS_PORT` — Redis কনটেইনারের হোস্ট-সাইড পোর্ট ম্যাপিং।
- `REDIS_BIND_HOST` — যে হোস্ট ইন্টারফেসে পোর্টটি প্রকাশ করা হয়। ডিফল্ট `127.0.0.1`।

> **ডিফল্টরূপে লুপব্যাক কেন:** সাইডকারটি `requirepass` ছাড়াই চলে এবং অ্যাপ
> কনটেইনারগুলো compose নেটওয়ার্কের মাধ্যমে (`redis:6379`) এতে পৌঁছায় — প্রকাশিত পোর্টটি
> কেবল হোস্ট-সাইড টুলিংয়ের জন্য (`redis-cli`, একটি স্থানীয় `npm run dev`)। `0.0.0.0`-এ
> প্রকাশ করলে আপনার LAN-এর প্রতিটি হোস্টের কাছে প্রমাণীকরণবিহীন Redis উন্মুক্ত হয়ে যাবে। আপনি
> `REDIS_BIND_HOST=0.0.0.0` সেট করলে, সার্ভিসের `command:`-এও `--requirepass` যোগ করুন।

**Redis নিষ্ক্রিয় করা** সুপারিশ করা হয় না (রেট লিমিটার ইন-মেমরি ফলব্যাকে অবনমিত হবে)। একান্তই প্রয়োজন হলে, `docker-compose.yml` থেকে `redis:` সার্ভিস ব্লকটি সরিয়ে দিন/কমেন্ট করুন অথবা এটিকে শূন্যে স্কেল করুন:

```bash
docker compose up -d --scale redis=0
```

## প্রোডাকশন Compose

ডেভের পাশাপাশি চলমান একটি বিচ্ছিন্ন প্রোডাকশন স্ন্যাপশটের জন্য `docker-compose.prod.yml` ব্যবহার করুন।

| বিবরণ                   | মান                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| ফাইল                    | `docker-compose.prod.yml`                                                                    |
| ডিফল্ট ড্যাশবোর্ড পোর্ট | `PROD_DASHBOARD_PORT=20130` (অভ্যন্তরীণ `${DASHBOARD_PORT:-20128}`-এ ম্যাপ করা)              |
| ডিফল্ট API পোর্ট        | `PROD_API_PORT=20131`                                                                        |
| ইমেজ                    | `omniroute:prod` (`runner-cli` টার্গেট থেকে বিল্ড করা)                                       |
| Redis কনটেইনার          | `omniroute-redis-prod` (`redis:8.6.2`, নিবেদিত `redis-prod-data` ভলিউম)                      |
| ডেটা ভলিউম              | `omniroute-prod-data` (নামযুক্ত, পুনরায় বিল্ডের পরও সংরক্ষিত থাকে)                          |
| হেলথচেক                 | `node healthcheck.mjs` + `redis-cli ping`, যেখানে `depends_on` Redis-এর হেলথের ওপর নির্ভরশীল |

ব্যবহারের পদ্ধতি:

```bash
# প্রোডাকশন স্ট্যাক বিল্ড ও চালু করুন
docker compose -f docker-compose.prod.yml up -d --build

# লগ স্ট্রিম করুন
docker compose -f docker-compose.prod.yml logs -f

# বন্ধ করুন (ভলিউম রেখে দিন)
docker compose -f docker-compose.prod.yml down
```

প্রোড স্ট্যাকটি ডেভ compose-এর সমান্তরালে চলে (কনটেইনারের নাম, পোর্ট এবং ভলিউম আলাদা), তাই প্রোডাকশন চালু রেখেই আপনি স্থানীয়ভাবে কাজ চালিয়ে যেতে পারবেন।

## Dockerfile স্টেজসমূহ

রিপোজিটরিটিতে একটি মাল্টি-স্টেজ Dockerfile (`Dockerfile`) অন্তর্ভুক্ত রয়েছে। তিনটি স্টেজ উন্মুক্ত করা হয়েছে; আপনার ব্যবহারের ক্ষেত্র অনুযায়ী সঠিক `target` বেছে নিন।

| স্টেজ         | বেস ইমেজ              | উদ্দেশ্য                                                                                                                                                                      |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ডিপেন্ডেন্সি ইনস্টল করে (`npm ci --legacy-peer-deps`) এবং `npm run build` চালায় (ডিফল্টভাবে Turbopack — নিচের বিল্ড-টাইম রিসোর্স অংশটি দেখুন)                                |
| `runner-base` | `node:26-trixie-slim` | Next.js-এর standalone আউটপুটসহ প্রোডাকশন রানটাইম। **কোনো প্রোভাইডার CLI অন্তর্ভুক্ত নেই।**                                                                                    |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` এবং গ্লোবাল CLI যোগ করে: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`। **এজেন্টিক ওয়ার্কফ্লোর জন্য এটি বেছে নিন।** |

নির্দিষ্ট কোনো টার্গেট ম্যানুয়ালি বিল্ড করুন:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### বিল্ড-টাইম রিসোর্স

তিনটি বিল্ড আর্গুমেন্ট `builder` স্টেজের রিসোর্স খরচ নিয়ন্ত্রণ করে। এগুলো কেবল বিল্ড-টাইমে প্রযোজ্য —
`OMNIROUTE_MEMORY_MB` (নিচে) একটি স্বতন্ত্র রানটাইম নিয়ন্ত্রণ।

| বিল্ড আর্গুমেন্ট            | ডিফল্ট | প্রভাব                                                                                                     |
| --------------------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | `0` দিলে এর পরিবর্তে webpack দিয়ে বিল্ড হয়। সর্বোচ্চ মেমোরি ব্যবহার কম, তবে ধীর।                         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | তৈরি হওয়া `next build`-এর জন্য V8 হিপের সর্বোচ্চ সীমা (`--max-old-space-size`)।                           |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL`-এ মান সরবরাহ করে; পেজ-ডেটা সংগ্রহের জন্য Next এটি থেকে `workers = N - 1` নির্ধারণ করে। |

বড় বিল্ডারে `OMNIROUTE_BUILD_WORKERS`-এর মান বাড়ানো উচিত এবং সীমিত রিসোর্সের বিল্ড
`✓ Compiled successfully`-এর **পরে** ব্যর্থ হলে প্রথমে এটিকেই সন্দেহ করা উচিত। প্রতিটি
পেজ-ডেটা ওয়ার্কার একটি স্বতন্ত্র প্রসেস, এবং মূল `next build` নিজেও একটি পৃথক প্রসেস;
একটি সচল VPS-এ পুনরুৎপাদন পরীক্ষায় (ইস্যু #7518) প্রতিটি প্রসেসের সর্বোচ্চ RSS
~4.5 GB পরিমাপ করা হয়েছে, যা `NODE_OPTIONS` হিপ ফ্ল্যাগের ওপর নির্ভরশীল নয়
(Turbopack, V8 হিপের বাইরে নেটিভ/Rust মেমোরিতে কম্পাইল করে)। ডিফল্ট মান `2`
(→ 1টি ওয়ার্কার, মোট 2টি প্রসেস) প্রকাশনা পাইপলাইনে ব্যবহৃত 16 GB / 4 vCPU
GitHub-হোস্টেড রানারের উপযোগী করে নির্ধারণ করা হয়েছে। `8`-এ (→ 7টি ওয়ার্কার)
সেই রানারের মেমোরি শেষ হয়ে যায় এবং buildkit ধাপটিকে
`ResourceExhausted: ... cannot allocate memory` ত্রুটিসহ ব্যর্থ করে;
প্রতি-প্রসেস RSS অনুমান না করে সরাসরি পরিমাপ করার পর `3`-ও (→ 2টি ওয়ার্কার)
ফিট হয়নি। `tests/unit/docker-build-memory-budget.test.ts` পরিমাপ করা মানের
সাপেক্ষে হিসাব করে এবং যেকোনো একটি নিয়ন্ত্রণ রানারের ধারণক্ষমতা ছাড়িয়ে গেলে
ব্যর্থ হয়।

Turbopack এমন নেটিভ Rust মেমোরিতে কম্পাইল করে যা V8 হিপের **বাইরে** থাকে, তাই
`OMNIROUTE_BUILD_MEMORY_MB` এটিকে সীমাবদ্ধ করে না। মেমোরি সীমাযুক্ত কোনো হোস্টে
OOM killer কোনো ত্রুটি বার্তা ছাড়াই বিল্ডটিকে SIGKILL করে — এটি
`Creating an optimized production build`-এর মাঝপথে স্রেফ থেমে যায়, যা
মেমোরি ফুরিয়ে যাওয়ার পরিবর্তে আটকে যাওয়ার মতো মনে হয়। বিল্ড হোস্টের রিসোর্স
সীমিত হলে bundler পরিবর্তন করুন:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` সক্রিয় রয়েছে, তাই `next build` একটি মূল প্রসেস **এবং**
একটি ওয়ার্কার প্রসেস চালায় এবং প্রতিটি আলাদাভাবে `OMNIROUTE_BUILD_MEMORY_MB`
মেনে চলে। কনটেইনারের সীমা ওই মানের এক গুণ নয়, বরং আনুমানিক দ্বিগুণের বেশি
নির্ধারণ করুন।

এই ট্রিতে পরিমাপ করা হয়েছে (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | কনটেইনারের সীমা | ফলাফল                                 |
| --------- | --------------- | ------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | উভয় ক্ষেত্রেই নীরবে OOM-killed       |
| webpack   | 8 GiB           | বিল্ড ওয়ার্কার SIGKILLed হয়েছে      |
| webpack   | 12 GiB          | সফল হয়েছে, সর্বোচ্চ ব্যবহার 11.1 GiB |

### রানটাইমের ডিফল্ট মান

`runner-base` দ্বারা এক্সপোর্ট করা ডিফল্ট মান: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker-এ মেমোরির আচরণ:

- ইমেজটি `OMNIROUTE_MEMORY_MB=1024` সেট করে এবং এটি থেকে `NODE_OPTIONS=--max-old-space-size=1024` নির্ধারণ করে।
- প্রকৃত সার্ভার প্রসেসটি standalone launcher দ্বারা চালু হয়, যা `OMNIROUTE_MEMORY_MB` পড়ে এবং `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` যোগ করে।
- Node পুনরাবৃত্ত `--max-old-space-size` মানগুলোর মধ্যে শেষেরটি ব্যবহার করে, তাই `OMNIROUTE_MEMORY_MB` সেট করলে Docker-এর কার্যকর হিপ সীমা নিয়ন্ত্রিত হয়।
- ইমেজটি সবসময় এটি সেট করায় Docker-এর অধীনে launcher-এর নিজস্ব RAM-অনুযায়ী নির্ধারিত fallback কখনো প্রয়োগ হয় না। কাজের চাপ অনুযায়ী এটি স্পষ্টভাবে বাড়ান (নিচের টেবিল দেখুন)। কোডিং-এজেন্টের `/v1/responses`-এর জন্য `2048` এখনও খুব কম।

### কোডিং এজেন্টের জন্য রানটাইম RAM

1 GiB Docker ডিফল্টটি ড্যাশবোর্ড/হালকা চ্যাটের ন্যূনতম সীমা, প্রোডাকশন উপযোগী আকার নয়। দীর্ঘ `POST /v1/responses` বডি (শত শত বার্তা, কয়েক ডজন টুল) কম্প্রেশনের সময় একাধিক ইন-মেমোরি গ্রাফ ধরে রাখে। একই সময়ে চলা প্রায় ~3 MiB / ~750k-token-এর দুটি রিকোয়েস্ট **12 GiB** old-space-এ V8 বন্ধ করে দিয়েছে (`FATAL ERROR: Reached heap limit`) এবং 16 GiB cgroup OOM-ও ঘটিয়েছে। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) দেখুন।

**হিপের চেয়ে বেশি cgroup `--memory` নির্ধারণ করুন** — নেটিভ বাফার, SQLite এবং কম্প্রেশনের মধ্যবর্তী ডেটা V8-এর বাইরে থাকে।

| কাজের চাপ                                | `OMNIROUTE_MEMORY_MB`   | কন্টেইনার / cgroup         | মন্তব্য                                                                                                                      |
| ---------------------------------------- | ----------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ড্যাশবোর্ড, একটি হালকা চ্যাট             | `1024` (ইমেজের ডিফল্ট)  | ≥2 GiB                     |                                                                                                                              |
| একটি কোডিং এজেন্ট (Claude/Codex/Grok)    | `8192`                  | ≥10 GiB                    | সাধারণ একক-সেশন `/v1/responses`                                                                                              |
| একই সময়ে দুটি দীর্ঘ `/v1/responses`     | `10240`–`12288`         | ≥12–16 GiB                 | প্রায় 12 GiB হিপে V8 বন্ধ হয়ে যাওয়া পরিমাপ করা হয়েছে                                                                     |
| একই সময়ে তিন বা তার বেশি দীর্ঘ কনটেক্সট | একটি প্রসেসে চালাবেন না | সিরিয়ালাইজ করুন / আরও RAM | ডিফল্টভাবে ভারী কাজের জন্য একবারে 1টি অনুরোধ গৃহীত হয়; RAM না বাড়িয়ে এটি বাড়ালে আবারও বন্ধ হয়ে যাওয়ার সমস্যা দেখা দেবে |

বেয়ার মেটালে `omniroute serve`, `OMNIROUTE_MEMORY_MB` **সেট করা না থাকলে**, RAM-এর প্রায় 35% অনুযায়ী ক্যালিব্রেট করে (`[512, 4096]` সীমার মধ্যে)। Docker সর্বদা `1024` সেট করে, তাই অফিসিয়াল ইমেজে এই ক্যালিব্রেশন কখনোই চলে না।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## গুরুত্বপূর্ণ এনভায়রনমেন্ট ভেরিয়েবলসমূহ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-এ নথিভুক্ত ডিফল্টগুলোর পাশাপাশি, Docker-এর অধীনে চালানোর সময় নিচের ভেরিয়েবলগুলো সবচেয়ে গুরুত্বপূর্ণ:

| ভেরিয়েবল                     | উদ্দেশ্য                                                                                                                                                                                                                                                               | ডিফল্ট                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ব্রিজের জন্য শেয়ার্ড সিক্রেট। **প্রোডাকশনে আবশ্যক** — একটি শক্তিশালী র্যান্ডম স্ট্রিং হিসেবে সেট করুন।                                                                                                                                                      | সেট করা নেই (প্রদান করতে হবে) |
| `REDIS_URL`                   | রেট লিমিটার / ক্যাশ ব্যাকএন্ডের জন্য সংযোগ স্ট্রিং                                                                                                                                                                                                                     | `redis://redis:6379`          |
| `REDIS_PORT`                  | অন্তর্ভুক্ত Redis কনটেইনারের হোস্ট-সাইড পোর্ট                                                                                                                                                                                                                          | `6379`                        |
| `REDIS_BIND_HOST`             | যে হোস্ট ইন্টারফেসে অন্তর্ভুক্ত Redis পোর্ট প্রকাশিত হয় (আপনি AUTH যোগ না করলে লুপব্যাক)                                                                                                                                                                              | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | স্বয়ংক্রিয় আপডেট ওয়ার্কফ্লোর জন্য `/workspace/omniroute`-এ `cli` প্রোফাইলে মাউন্ট করা হোস্ট পাথ                                                                                                                                                                     | `.` (বর্তমান ডিরেক্টরি)       |
| `OMNIROUTE_MEMORY_MB`         | Docker স্বতন্ত্র সার্ভারের জন্য রানটাইম Node হিপের সর্বোচ্চ সীমা; উপরের ইমেজ ডিফল্টকে ওভাররাইড করে। কোডিং এজেন্ট: `8192`+ ([রানটাইম RAM](#runtime-ram-for-coding-agents) দেখুন)।                                                                                       | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | ড্যাশবোর্ড (20128) এবং API (20129)-এর প্রকাশিত পোর্ট ওভাররাইড করে                                                                                                                                                                                                      | `20128` / `20129`             |
| `APP_BIND_HOST`               | যে হোস্ট ইন্টারফেসে docker-compose ড্যাশবোর্ড/API/live-WS পোর্টগুলো প্রকাশ করে। `REQUIRE_API_KEY=false` (ডিফল্ট) থাকলে, `0.0.0.0` অজ্ঞাতনামা `/v1` প্রক্সিকে LAN-এ উন্মুক্ত করে — কেবল `REQUIRE_API_KEY=true` থাকলে বা সামনে একটি রিভার্স প্রক্সি থাকলেই পরিসর বাড়ান। | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | যে হোস্ট ইন্টারফেসে docker-compose `cliproxyapi` সাইডকার প্রকাশ করে — এর ডেটা ভলিউমে প্রোভাইডারের ক্রেডেনশিয়াল সংরক্ষিত থাকে।                                                                                                                                         | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | রানটাইম প্লাগইন স্ক্যানার যে ডিরেক্টরি পড়ে এবং যেখানে ইনস্টল করে। প্লাগইনগুলো bind-mounted হলে এটি সেট করুন: ডিফল্টটি `HOME` অনুসরণ করে, যা কোনো ইমেজ এক্সপোর্ট নাও করতে পারে।                                                                                        | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | অ্যাপটি রিভার্স প্রক্সির পেছনে প্রকাশিত হলে ব্যবহৃত URL সাবপাথ (যেমন `/omniroute`)                                                                                                                                                                                     | _(খালি = রুট)_                |
| `NEXT_PUBLIC_BASE_URL`        | সাবপাথসহ পাবলিক ব্রাউজার অরিজিন (যেমন `https://host/omniroute`)                                                                                                                                                                                                        | সেট করা নেই                   |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`-এর জন্য হোস্ট-সাইড ড্যাশবোর্ড পোর্ট                                                                                                                                                                                                          | `20130`                       |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` সাইডকারের জন্য হোস্ট-সাইড পোর্ট                                                                                                                                                                                                                          | `8317`                        |

## সাবপাথে রিভার্স প্রক্সি (Traefik / nginx)

Next.js-এর `basePath` standalone bundle-এর মধ্যে কম্পাইল করা হয়। OmniRoute অ্যাপের রুটে একটি sentinel ফাইলে বিল্ডের সময় নির্ধারিত মানটি সংরক্ষণ করে (`npm run build` চলাকালে লেখা হয়; `scripts/docker/ensure-docker-base-path.mjs` দ্বারা পড়া হয়) এবং কনটেইনার চালু হলে সেটিকে `OMNIROUTE_BASE_PATH`-এর সঙ্গে তুলনা করে। মান দুটি ভিন্ন হলে এবং ইমেজটি ডোমেইন রুটের জন্য বিল্ড করা হয়ে থাকলে, `node dev/run-standalone.mjs` চালু হওয়ার আগে entrypoint standalone manifest-গুলো, এম্বেড করা `basePath`/`assetPrefix` literal-গুলো (Next 16 শুধু `assetPrefix` থেকেই SSR asset URL রেন্ডার করে—patcher সাবপাথটিকেও এতে প্রতিফলিত করে), বিল্ডে অন্তর্ভুক্ত `/_next/static` asset URL-গুলো (client-reference manifest, media import, আগে থেকে রেন্ডার করা error page) এবং client `process.env` shim পুনর্লিখন করে।

### Compose build (প্রস্তাবিত)

`.env`-এ উভয় variable সেট করুন, তারপর পুনরায় বিল্ড করুন, যাতে ইমেজ ও runtime-এর কনফিগারেশন মিলে যায়:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`-কে Docker build-arg এবং runtime environment variable—উভয় হিসেবেই পাঠায়।

### আগে থেকে বিল্ড করা root image + runtime subpath

প্রকাশিত `diegosouzapw/omniroute:*` image-গুলো ডোমেইন root-এর জন্য বিল্ড করা। তারপরও আপনি runtime-এ `OMNIROUTE_BASE_PATH` সেট করতে পারেন; কনটেইনার startup-এর সময় bundle-টি একবার patch করে। এর সঙ্গে মিল থাকা public origin সেট করুন:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**সম্পূর্ণ** external path forward করার জন্য reverse proxy কনফিগার করুন (prefix বাদ দেবেন না)। Traefik-এর `StripPrefix` ছাড়াই `PathPrefix(`/omniroute`)`-কে কনটেইনারে route করা উচিত, যাতে Next.js `/omniroute/...` পায় এবং `/omniroute/_next/...` থেকে asset পরিবেশন করে।

Docker healthcheck সক্রিয় `OMNIROUTE_BASE_PATH` prefix-সহ হালকা `/healthz` lifecycle endpoint-এ probe করে। ব্যবহারকারী/dashboard-এর diagnostics-এর জন্য `/api/monitoring/health` এখনও উপলভ্য; কনটেইনারের HEALTHCHECK-কে আবার সেখানে নির্দেশ করতে (উদাহরণস্বরূপ, কঠোর health enforcement-এর জন্য), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` সেট করুন। ওই path একটি **deep** check (DB + monitoring summary)—আপনি আবার এটি ব্যবহার করার সিদ্ধান্ত নিলে Docker-এর বিরতিপূর্ণ `HEALTHCHECK`-এর জন্য উপযুক্ত, কিন্তু Kubernetes `livenessProbe` interval-এর জন্য **নয়**।

Orchestrator-গুলোর জন্য (Kubernetes, Nomad ইত্যাদি):

| Probe           | অগ্রাধিকার দিন                                                    | এড়িয়ে চলুন                                                      |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, অথবা main port-এ TCP (`PORT`, default `20128`) | liveness হিসেবে `/api/monitoring/health`                          |
| Readiness       | HTTP `GET /healthz`                                               | event loop ব্যস্ত থাকাকে dead হিসেবে বিবেচনা করে এমন কঠোর timeout |
| Deep / blackbox | `/api/monitoring/health`                                          | —                                                                 |

`/healthz` process lifecycle (`ok` / `starting` / `stopping`) রিপোর্ট করে। `/livez` কেবল process-alive নির্দেশ করে (handler চলতে পারলেই 200 দেয়; এটি readiness-এর জন্য অপেক্ষা করে না)। উভয়ই request handling-এর একই Node event loop-এ চলে, তাই CPU-bound catalog বা compression-এর কাজ এগুলোকে বিলম্বিত করতে পারে—ব্যস্ত ≠ dead। HTTP probe timeout হলে TCP liveness-কে অগ্রাধিকার দিন। সম্পূর্ণ probe নির্দেশিকা:
[Monitoring guide — Kubernetes probe recommendations](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)।

## Caddy সহ Docker Compose (HTTPS Auto-TLS)

Caddy-এর স্বয়ংক্রিয় SSL প্রভিশনিং ব্যবহার করে OmniRoute-কে নিরাপদে উন্মুক্ত করা যায়। নিশ্চিত করুন যে আপনার ডোমেইনের DNS A রেকর্ডটি আপনার সার্ভারের IP-এর দিকে নির্দেশ করছে।

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
      # OAuth কলব্যাক, ড্যাশবোর্ড লিংক এবং তৈরি করা পাবলিক URL-এর জন্য ব্রাউজার-মুখী অরিজিন।
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # নির্ধারিত কাজ / স্বয়ংক্রিয় ফেচের জন্য অভ্যন্তরীণ সার্ভার-টু-সার্ভার URL।
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

Caddy আপস্ট্রিম কনটেইনারের জন্য স্ট্যান্ডার্ড ফরওয়ার্ডিং হেডার সেট করে। OAuth কলব্যাক এবং তৈরি করা পাবলিক
লিংকের ক্যানোনিক্যাল পাবলিক অরিজিন হিসেবে OmniRoute `NEXT_PUBLIC_BASE_URL` ব্যবহার করে;
প্রমাণীকৃত ড্যাশবোর্ড রাইটগুলো একই-অরিজিন রিকোয়েস্টের পাশাপাশি সেশন-সংযুক্ত CSRF
সুরক্ষা ব্যবহার করে। কেবল উন্নত ডিপ্লয়মেন্টের ক্ষেত্রে `OMNIROUTE_TRUST_PROXY` সক্রিয় করুন, যেখানে আপনি স্পষ্ট
কনফিগারেশনের পরিবর্তে বিশ্বস্ত ফরওয়ার্ডেড হেডার থেকে OmniRoute-কে ইচ্ছাকৃতভাবে পাবলিক অরিজিন
নির্ধারণ করতে দিতে চান।

## Cloudflare Quick Tunnel

Docker ডিপ্লয়মেন্টের জন্য ড্যাশবোর্ড সমর্থনে `Dashboard → Endpoints`-এ এক ক্লিকে চালু করার মতো একটি **Cloudflare Quick Tunnel** অন্তর্ভুক্ত রয়েছে। প্রথমবার সক্রিয় করলে কেবল প্রয়োজনের সময় `cloudflared` ডাউনলোড হয়, আপনার বর্তমান `/v1` এন্ডপয়েন্টে একটি অস্থায়ী টানেল চালু হয় এবং আপনার সাধারণ পাবলিক URL-এর ঠিক নিচে তৈরি করা `https://*.trycloudflare.com/v1` URL দেখানো হয়।

সক্রিয় টানেলের অবস্থা পরিবর্তন না করেই `Settings → Appearance` থেকে এন্ডপয়েন্ট টানেল প্যানেলগুলো (Cloudflare, Tailscale, ngrok) দেখানো বা লুকানো যায়।

### টানেল-সংক্রান্ত নোট

- Quick Tunnel URL অস্থায়ী এবং প্রতিবার পুনরায় চালু করার পর পরিবর্তিত হয়।
- OmniRoute বা কনটেইনার পুনরায় চালু হওয়ার পর Quick Tunnel স্বয়ংক্রিয়ভাবে পুনরুদ্ধার হয় না। প্রয়োজন হলে ড্যাশবোর্ড থেকে সেগুলো পুনরায় সক্রিয় করুন।
- পরিচালিত ইনস্টলেশন বর্তমানে `x64` / `arm64`-এ Linux, macOS এবং Windows সমর্থন করে।
- সীমাবদ্ধ কনটেইনার পরিবেশে কোলাহলপূর্ণ QUIC UDP বাফার সতর্কতা এড়াতে পরিচালিত Quick Tunnel ডিফল্টভাবে HTTP/2 ট্রান্সপোর্ট ব্যবহার করে। ভিন্ন ট্রান্সপোর্ট চাইলে `CLOUDFLARED_PROTOCOL=quic` বা `auto` সেট করুন।
- Docker ইমেজে সিস্টেম CA রুট অন্তর্ভুক্ত থাকে এবং সেগুলো পরিচালিত `cloudflared`-এ পাঠানো হয়, যা কনটেইনারের ভেতরে টানেল বুটস্ট্র্যাপ হওয়ার সময় TLS ট্রাস্ট ব্যর্থতা এড়ায়।
- OmniRoute যেন ডাউনলোড করার পরিবর্তে আগে থেকেই থাকা একটি বাইনারি ব্যবহার করে, তা চাইলে `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` সেট করুন।

## ইমেজ ট্যাগ

| ইমেজ                     | ট্যাগ    | আকার   | বিবরণ                                                   |
| ------------------------ | -------- | ------ | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | সর্বোচ্চ **প্রকাশিত** স্থিতিশীল SemVer (git `main` নয়) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps-এর জন্য এই শ্রেণির ট্যাগ পিন করুন                |

মাল্টি-প্ল্যাটফর্ম ম্যানিফেস্ট: নেটিভ `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi)। Docker স্বয়ংক্রিয়ভাবে উপযুক্ত আর্কিটেকচার নির্বাচন করে; ARM হোস্টে AMD64 ইমুলেশন বাধ্যতামূলক করতে হলে `--platform linux/amd64` দিন।

### রিলিজ চ্যানেল

স্থিতিশীল রিলিজ, সক্রিয় রিলিজ-ব্রাঞ্চ পরীক্ষা এবং ডেভেলপমেন্ট বিল্ডের জন্য OmniRoute পৃথক Docker চ্যানেল প্রকাশ করে।

| চ্যানেল                         | উৎস                                    | পরিবর্তনযোগ্যতা                     | প্রস্তাবিত ব্যবহার                                                                                                       |
| ------------------------------- | -------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | স্বাক্ষরিত/সংস্করণযুক্ত রিলিজ          | অপরিবর্তনীয়                        | যেসব প্রোডাকশন ডিপ্লয়মেন্টে একটি নির্দিষ্ট রিলিজ পিন করা হয়                                                            |
| `:latest` / `:latest-web`       | সর্বোচ্চ **প্রকাশিত** স্থিতিশীল SemVer | পরিবর্তনযোগ্য স্থিতিশীল পয়েন্টার   | একটি SemVer প্রকাশনার কাজের **পরে** স্থিতিশীল রিলিজ অনুসরণ করে — `main` বা অপ্রকাশিত `release/v*` কমিট অনুসরণ করে **না** |
| `:next` / `:next-web`           | বর্তমান ডিফল্ট `release/v*` ব্রাঞ্চ    | পরিবর্তনযোগ্য প্রি-রিলিজ পয়েন্টার  | সক্রিয় রিলিজ ব্রাঞ্চে অন্তর্ভুক্ত হলেও এখনও স্থিতিশীল রিলিজে না থাকা সংশোধনগুলো পরীক্ষা করা                             |
| `:main` / `:main-web`           | `main` ব্রাঞ্চ                         | পরিবর্তনযোগ্য ডেভেলপমেন্ট পয়েন্টার | কেবল ডেভেলপমেন্ট এবং ইন্টিগ্রেশন পরীক্ষা                                                                                 |

#### প্রি-রিলিজ চ্যানেল ব্যবহার

বর্তমান ডিফল্ট `release/v*` ব্রাঞ্চে প্রতিটি push-এর সময় `next` চ্যানেলটি পুনর্নির্মিত হয় এবং AMD64 ও ARM64 উভয়ের জন্য প্রকাশিত হয়। পুরোনো রক্ষণাবেক্ষণ ব্রাঞ্চগুলো এটিকে ওভাররাইট করতে পারে না। পরবর্তী স্থিতিশীল ট্যাগ তৈরির আগে সক্রিয় রিলিজ ব্রাঞ্চে মার্জ হওয়া সংশোধনগুলোর জন্য এই চ্যানেল একটি pull-যোগ্য ইমেজ সরবরাহ করে।

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-এর জন্য নির্বাচিত প্রোফাইলে ব্যবহৃত ইমেজ ট্যাগটি ওভাররাইড করুন, তারপর সার্ভিসটি pull করে পুনরায় তৈরি করুন:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### নিরাপত্তা এবং রোলব্যাক

`next` একটি ফ্লোটিং প্রি-রিলিজ চ্যানেল। সক্রিয় রিলিজ ব্রাঞ্চে যেকোনো push-এর ফলে এটি পরিবর্তিত হতে পারে এবং এটি **প্রোডাকশনে ব্যবহারের জন্য সমর্থিত নয়**। নির্দিষ্ট কোনো বিল্ড মূল্যায়নের সময় ইমেজ ডাইজেস্ট পিন করুন:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

পরীক্ষার আগে, OmniRoute ডেটা ভলিউম বা bind-mounted ডেটা ডিরেক্টরির ব্যাকআপ নিন। রোল ব্যাক করতে, পূর্বে ব্যবহৃত স্থিতিশীল সংস্করণ বা digest পুনরুদ্ধার করুন এবং container-টি পুনরায় তৈরি করুন:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

একটি release-branch build কখনোই `latest` সরাতে পারে না; কেবল একটি যোগ্য স্থিতিশীল semantic version-ই স্থিতিশীল pointer-টি উন্নীত করতে পারে। `next` image-গুলো release image inspection এবং CRITICAL vulnerability প্রতিরোধকারী gate বজায় রাখে।

**`latest` git-এর হালনাগাদ অবস্থার নিশ্চয়তা নয়।** `main` বা সক্রিয় `release/v*` branch-এ merge করা fix-গুলো একটি স্থিতিশীল SemVer image প্রকাশিত না হওয়া এবং publish job দ্বারা `:latest` উন্নীত না হওয়া পর্যন্ত `:latest`-এ থাকে না (সেই SemVer-এর একই digest)। GitHub-এ fix-টি ইতোমধ্যে দেখা গেলেও `latest` যদি অপরিবর্তিত মনে হয়, release branch পরীক্ষা করতে `:next` pull করুন অথবা SemVer tag-এর জন্য অপেক্ষা করুন।

| আপনার লক্ষ্য                                                          | ব্যবহার করুন                          |
| --------------------------------------------------------------------- | ------------------------------------- |
| GitOps / production যেখানে কোনো অনিচ্ছাকৃত পরিবর্তন গ্রহণযোগ্য নয়    | `:X.Y.Z` pin করুন (অথবা image digest) |
| প্রকাশিত stable অনুসরণ করা এবং প্রতিটি release-এ recreate মেনে নেওয়া | `:latest`                             |
| অপ্রকাশিত `release/v*` commit পরীক্ষা করা                             | `:next` (production-এর জন্য নয়)      |
| `main` পরীক্ষা করা                                                    | `:main` (production-এর জন্য নয়)      |

## উপলভ্যতা: ডিফল্ট SQLite একক-রেপ্লিকা

স্ট্যান্ডার্ড Docker / Kubernetes OmniRoute হলো **একটি Node প্রসেস + একটি SQLite রাইটার**। এই টপোলজিতে উচ্চ উপলভ্যতা **সমর্থিত নয়**।

| সীমাবদ্ধতা                                 | পরিণতি                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| একক রাইটার                                 | একই SQLite ফাইলের বিপরীতে একাধিক রেপ্লিকা চালাবেন **না**। এতে DB ক্ষতিগ্রস্ত হয়।                                                                                                                                                                                                                                                |
| পুনরায় তৈরি / রিস্টার্ট / HEALTHCHECK কিল | চলমান SSE, ড্যাশবোর্ড সেশন এবং ইন-মেমরি স্টেটের **সম্পূর্ণ বিভ্রাট**। সংযুক্ত প্রতিটি ক্লায়েন্টের সংযোগ বিচ্ছিন্ন হয়। এন্ডপয়েন্ট-শূন্য উইন্ডোতে নতুন অনুরোধগুলো OmniRoute JSON-এর পরিবর্তে রিভার্স-প্রক্সি **`502 Bad Gateway: Unknown error`** পায় — ক্লায়েন্ট এটিকে প্রোভাইডার ব্যর্থতা থেকে আলাদা করতে পারে না (#11015)। |
| `/healthz`-এর মতো একই ইভেন্ট লুপ           | ব্যস্ত ক্যাটালগ বা কম্প্রেশন টিক প্রোব বিলম্বিত করতে পারে; তখন স্বল্প টাইমআউট **একমাত্র** রেপ্লিকাটি রিস্টার্ট করে।                                                                                                                                                                                                              |

**প্রোব ম্যাট্রিক্স** ([Kubernetes প্রোবের সুপারিশ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)-ও দেখুন):

| প্রোব                       | লক্ষ্য                                                  | ব্যবহার করবেন না                                             |
| --------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| লাইভনেস                     | `PORT`-এ TCP (ডিফল্ট `20128`), অথবা সফট HTTP `/healthz` | `/api/monitoring/health`                                     |
| রেডিনেস                     | HTTP `GET /healthz`                                     | এমন কঠোর টাইমআউট, যা ব্যস্ত ইভেন্ট লুপকে মৃত হিসেবে গণ্য করে |
| গভীর পরীক্ষা / মানুষের জন্য | `/api/monitoring/health`                                | স্বয়ংক্রিয় kubelet লাইভনেস                                 |

**আপগ্রেড:** প্রতিটি সেশন বিচ্ছিন্ন হবে বলে ধরে নিন। সম্ভব হলে ক্লায়েন্টগুলো ড্রেইন করুন; ডিফল্ট SQLite-এ কোনো রোলিং আপডেট নেই। Compose-এর `restart: unless-stopped` এবং Docker-এর `HEALTHCHECK` কনটেইনারটি Unhealthy হলে একমাত্র প্রসেসটিকেও প্রতিস্থাপন করবে — প্রভাবের পরিধি একই।

একটি **একক রেপ্লিকা**-র জন্য Kubernetes স্নিপেট (Recreate আবশ্যক; একটি SQLite ফাইলের বিপরীতে `replicas` বাড়াবেন না):

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

`preStop`-এর sleep SIGTERM-এর আগে kube-কে Service এন্ডপয়েন্ট সরিয়ে ফেলার সুযোগ দেয়, যাতে **নতুন** ট্রাফিক বন্ধ হতে থাকা প্রসেসে পৌঁছানো বন্ধ করে। চলমান `/v1/responses` SSE হেভিওয়েট অ্যাডমিশন লিজের মাধ্যমে `SHUTDOWN_TIMEOUT_MS` (ডিফল্ট 30s) পর্যন্ত ড্রেইন করা হয় (#11015)। এরপরও প্রসেসে পৌঁছানো নতুন অনুরোধ `503` + `Retry-After: 5` পায়। প্রতিস্থাপনটি Ready হওয়া পর্যন্ত Recreate-এর এন্ডপয়েন্ট-শূন্য ব্যবধানটি একটি সম্পূর্ণ বিভ্রাট হিসেবেই থাকে — এটি SQLite টপোলজির বৈশিষ্ট্য, প্রোবের ভুল কনফিগারেশন নয়।

বহিঃস্থ Postgres / মাল্টি-রাইটার HA কোনো নথিভুক্ত স্ট্যান্ডার্ড পাথ **নয়**। আপনার HA প্রয়োজন হলে একটি একক রেপ্লিকা বজায় রাখুন, অথবা এমন একটি টপোলজি চালান যা প্রজেক্টটি আলাদাভাবে পরীক্ষা ও নথিভুক্ত করেছে। Postgres/MySQL-এর কাজ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-এ রয়েছে। সেটি প্রকাশিত না হওয়া পর্যন্ত **বড়** `/v1/responses`-এর সক্ষমতা বাড়ানোর একমাত্র সমর্থিত উপায় হলো Nটি স্বাধীন প্রসেস (পরবর্তী বিভাগ), একটি ভলিউমে `replicas > 1` নয়।

## স্কেল-আউট: Nটি স্বাধীন প্রসেস

একটি Node প্রসেস হলো **একটি V8 heap**। পরস্পর ওভারল্যাপ করা দুটি ~3 MiB / ~750k-token coding-agent `POST /v1/responses` (RTK + Caveman) ~12 Gi-তে সেই heap-কে অ্যাবোর্ট করায় (`FATAL ERROR: Reached heap limit`) এবং একটি 16 Gi cgroup-কে OOM করাতে পারে। দেখুন [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)। এই পরিমাপটি একটি **মেমরি-বাজেট** সতর্কতা, একই সময়ে সর্বোচ্চ দুটি দীর্ঘ `/v1/responses`-এর কোনো প্রোডাক্ট-স্তরের কঠোর সীমা নয়। হেভিওয়েট চ্যাটের অ্যাডমিশন একটি স্বয়ংক্রিয়ভাবে নির্ধারিত ইনজেস্ট বাইট বাজেট (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) দ্বারা নিয়ন্ত্রিত হয়, যা একই V8/cgroup সীমা থেকে নির্ধারিত—আগেই সাইজ করা কোনো প্রসেসে এটিকে বাড়িয়ে ওভাররাইড করলে (অথবা লিগ্যাসি `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` রিকোয়েস্ট-কাউন্ট সীমা সেট করলে) আবারও অ্যাবোর্ট হওয়ার ঝুঁকি ফিরে আসে। ছোট চ্যাট, `/healthz`, `/v1/models`, এবং MCP এই সীমার অন্তর্ভুক্ত **নয়**।

### এক প্রসেস: দুটির বেশি দীর্ঘ `/v1/responses`

একটি **সুস্থ** প্রসেস (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-এর নিচে, ডিফল্ট `0.75`) একই সময়ে দুটির বেশি দীর্ঘ `POST /v1/responses` চালাতে **পারে**, যদি প্রসেসজুড়ে প্রযোজ্য ইনফ্লাইট-বাইট বাজেটে (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) এখনও জায়গা থাকে। `OMNIROUTE_CHAT_LARGE_BODY_BYTES`-এর সমান বা বেশি আকারের body (ডিফল্ট 256 KiB) স্ট্রাকচার-হেভি রিকোয়েস্টের মতো একই হেভিওয়েট লিজ নেয় এবং একই [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` এস্কেপ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ব্যবহার করে। একই সময়ে কয়েক দশক দীর্ঘ SSE ক্লায়েন্ট চালানো (অপারেটরদের প্রায়ই 40–50টি প্রয়োজন হয়) একটি **মেমরি-বাজেট**-সংক্রান্ত বিষয়—heap + primary/headroom slot + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` যথাযথভাবে সাইজ করুন—এটি প্রোডাক্টের কঠোর “সর্বোচ্চ 2” সীমা নয়। চাপের মুখে থাকা heap তখনও পুনরায় চেষ্টা করা যায় এমন `503` দিয়ে লোড ঝরিয়ে দেয়, যাতে #7849 ফিরে না আসে।

**একাধিক heap তৈরি করতে** (স্বাধীন V8 old-space) **বর্তমানে**:

| যা করবেন                                                                                                                                             | যা করবেন না                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Nটি container/pod** চালান, প্রতিটির **নিজস্ব** `DATA_DIR` / volume সহ                                                                              | একটি SQLite ফাইলের বিপরীতে `replicas > 1` সেট করবেন না                         |
| heap / inflight-byte budget অনুযায়ী heavy in-flight + healthy-headroom সাইজ করুন; 1–2 হলো রক্ষণশীল #7849 ডিফল্ট, প্রোডাক্টের কঠোর সর্বোচ্চ সীমা নয় | একটি প্রসেসকে 8× RAM ও সীমাহীন count cap দেবেন না                              |
| ঐচ্ছিক: **শেয়ার করা quota counter**-এর জন্য `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                    | Redis-কে shared SQLite হিসেবে বিবেচনা করবেন না—এটি তা নয়                      |
| প্রতিটি instance-এ provider secret অনুলিপি করুন (অথবা বিভক্ত dashboard মেনে নিন)                                                                     | instance-গুলোর মধ্যে একটি dashboard / একটি call-log পাওয়ার প্রত্যাশা করবেন না |
| সামনে যেকোনো load balancer ব্যবহার করুন; API key বা session অনুযায়ী sticky routing-ই যথেষ্ট                                                         | vendor-নির্দিষ্ট size-aware middleware আবশ্যক বলে ধরে নেবেন না                 |

হার্ডওয়্যার: প্রতি instance-এ একই সময়ে কতগুলো দীর্ঘ `/v1/responses` চলবে, তা একটি **মেমরি-বাজেট**-সংক্রান্ত বিষয় (heap + inflight-byte / #10110)। `N`টি স্বাধীন `DATA_DIR` তখনও heap-এর সংখ্যা গুণ করে: host RAM-কে `N × cgroup` ধারণ করতে হবে, “N=8-সহ একটি 16 Gi pod” নয়। একটি SQLite ফাইলে কখনোই `replicas > 1` ব্যবহার করবেন না।

Compose-এর নমুনা (দুটি heap, দুটি volume—`deploy.replicas: 2` নয়):

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

ইন-প্রসেস ঘনত্ব (HTTP isolate-এর বাইরে compression) হলো [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)। শেয়ার করা টেকসই state-এর ওপর একটি যৌক্তিক cluster হলো [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)।

## গুরুত্বপূর্ণ নোটসমূহ

- **SQLite WAL মোড:** `docker stop`-কে সম্পন্ন হওয়ার সুযোগ দিতে হবে, যাতে OmniRoute সর্বশেষ পরিবর্তনগুলো `storage.sqlite`-এ চেকপয়েন্ট করতে পারে। সংযুক্ত Compose ফাইলগুলোতে ইতোমধ্যেই 40s স্টপ গ্রেস পিরিয়ড নির্ধারণ করা আছে। আপনি সরাসরি ইমেজটি চালালে `--stop-timeout 40` বজায় রাখুন।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** নিয়মিত/লেখার-পূর্ববর্তী ব্যাকআপ বাহ্যিকভাবে পরিচালিত হলে এটি `true`-তে সেট করুন। বিদ্যমান ডেটাবেসের মাইগ্রেশনের জন্য এখনও নিজস্ব টেকসই সুরক্ষা স্ন্যাপশট এবং গণ-মাইগ্রেশন সুরক্ষা প্রয়োজন।
- **ডেটার স্থায়িত্ব:** কনটেইনার পুনরায় চালু হওয়ার পরও আপনার ডেটাবেস, কী এবং কনফিগারেশন সংরক্ষণ করতে সর্বদা `/app/data`-তে একটি ভলিউম মাউন্ট করুন।
- **পোর্ট কনফিগারেশন:** ডিফল্ট `20128` পোর্ট পরিবর্তন করতে `PORT` এনভায়রনমেন্ট ভেরিয়েবল ওভাররাইড করুন।

## আরও দেখুন

- [VM ডিপ্লয়মেন্ট নির্দেশিকা](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare সেটআপ
- [Fly.io ডিপ্লয়মেন্ট নির্দেশিকা](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-তে ডিপ্লয় করুন
- [এনভায়রনমেন্ট কনফিগারেশন](../reference/ENVIRONMENT.md) — সম্পূর্ণ `.env` রেফারেন্স
