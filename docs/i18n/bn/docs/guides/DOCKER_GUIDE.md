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
- [Dockerfile স্টেজসমূহ](#dockerfile-stages)
- [গুরুত্বপূর্ণ এনভায়রনমেন্ট ভেরিয়েবলসমূহ](#critical-environment-variables)
- [Caddy (HTTPS)-সহ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [ইমেজ ট্যাগসমূহ](#image-tags)
- [উপলভ্যতা: ডিফল্ট SQLite একক-রেপ্লিকার](#availability-default-sqlite-is-single-replica)
- [Docker-এর মধ্যে Gemini-এর আঞ্চলিক ত্রুটি](#gemini-regional-errors-inside-docker)
- [গুরুত্বপূর্ণ নোটসমূহ](#important-notes)

---

## দ্রুত চালু করা

> **একটি কমান্ডেই স্ব-হোস্ট করতে চান?** দেখুন
> [স্ব-হোস্ট নির্দেশিকা](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (প্রকাশিত ইমেজ +
> Redis, শুধুমাত্র লুপব্যাক, কোনো প্রোফাইল বাছাই নয়)। নিচের দ্রুত চালুর পদ্ধতিটি
> সেইসব ব্যবহারকারীর জন্য একক-কনটেইনার পদ্ধতি, যাঁরা ইতিমধ্যেই অন্য কোথাও Redis চালান।

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

# হোস্ট প্রোফাইল (প্রাথমিকভাবে Linux-এর জন্য; হোস্ট CLI বাইনারিগুলো শুধু-পঠনযোগ্য হিসেবে মাউন্ট করে)
docker compose --profile host up -d

# ওয়েব প্রোফাইল (ওয়েব-সেশন প্রোভাইডারগুলোর জন্য Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI সাইডকার একত্রে ব্যবহার করুন
docker compose --profile cli --profile cliproxyapi up -d
```

## উপলভ্য প্রোফাইলসমূহ

প্রধান ডিপ্লয়মেন্ট বিন্যাসগুলোর জন্য OmniRoute-এর সঙ্গে Compose প্রোফাইল দেওয়া হয়। আপনার পরিবেশের সঙ্গে সামঞ্জস্যপূর্ণ প্রোফাইলটি বেছে নিন।

| প্রোফাইল        | সার্ভিস          | কখন ব্যবহার করবেন                                                                                                                                    | কমান্ড                                       |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ডিফল্ট) | `omniroute-base` | হেডলেস সার্ভার / ন্যূনতম রানটাইম, কোনো প্রোভাইডার CLI অন্তর্ভুক্ত নেই                                                                                | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | যেসব এজেন্টিক ওয়ার্কফ্লো `omniroute providers/setup/doctor` ও অন্তর্ভুক্ত CLI-গুলো (Codex, Claude Code, Droid, OpenClaw) কল করে                     | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | যেসব Linux হোস্ট `~/.local/bin`, `~/.codex`, `~/.claude` ইত্যাদি শুধু-পঠনযোগ্য হিসেবে মাউন্ট করে হোস্ট CLI-গুলোতে `network_mode`-সদৃশ অ্যাক্সেস চায় | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | আপস্ট্রিম CLI প্রক্সির জন্য `8317` পোর্টে [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) সাইডকার চালান                                  | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | ব্রাউজার প্রয়োজন এমন ওয়েব-সেশন প্রোভাইডার: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` বিল্ড করে, Chromium অন্তর্ভুক্ত)           | `docker compose --profile web up -d`         |

> একাধিক প্রোফাইল একত্রে ব্যবহার করা যায়: `docker compose --profile cli --profile cliproxyapi up -d`।

## Docker-এ OmniRoute চলার সময় হোস্ট CLI টুল কনফিগার করা

`omniroute setup-codex`, `setup-claude`, `config set <tool>` এবং ড্যাশবোর্ডের
**কনফিগ সংরক্ষণ করুন** বোতাম—সবই `~/.codex/*.config.toml`-এর মতো ফাইল লেখে। ওই পাথগুলোর
অর্থ কেবল সেই মেশিনেই আছে, যেখানে CLI বাস্তবে চলে। এগুলো কনটেইনারের ভেতরে
চালালে ফাইলটি কনটেইনারের নিজস্ব হোমে (`/home/node` —
ইমেজটি `USER node` হিসেবে চলে) লেখা হয়, যেখান থেকে কোনো হোস্ট CLI কখনো এটি পড়বে না এবং
কনটেইনার পুনরায় তৈরি হওয়ার সঙ্গে সঙ্গেই এটি মুছে যাবে।

OmniRoute এটি শনাক্ত করে এবং এমন কোনো সাফল্য জানানোর বদলে, যা আপনি ব্যবহারই করতে পারবেন না,
নির্দেশনাসহ লেখার কার্যক্রম প্রত্যাখ্যান করে: CLI `2` কোড দিয়ে বন্ধ হয় এবং API `422`
ও `containerEphemeralTarget: true` সহ উত্তর দেয়।

### প্রস্তাবিত: CLI হোস্টে এবং OmniRoute Docker-এ চালান

কনটেইনার API পরিবেশন করে; CLI আপনার হোস্ট টুলগুলো কনফিগার করে।

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI-কে কনটেইনারের দিকে নির্দেশ করুন
omniroute setup-codex                      # আপনার হোস্টের প্রকৃত ~/.codex-এ লেখে
```

Codex, Claude Code, Cursor বা অনুরূপ টুল আপনার ল্যাপটপে চললে এটিই সঠিক পছন্দ —
এবং এটিই সাধারণ সেটআপ।

### বিকল্প: হোস্ট কনফিগ ডিরেক্টরিগুলো bind-mount করুন (`host` প্রোফাইল)

আপনি যদি চান কনটেইনার নিজেই আপনার হোস্ট কনফিগে লিখুক, তাহলে
ডিরেক্টরিগুলো মাউন্ট করুন এবং `CLI_CONFIG_HOME`-কে মাউন্ট রুটে নির্দেশ করুন। `host` প্রোফাইল
ইতিমধ্যেই এটি করে:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount-ই পাথটিকে বিশ্বস্ত করে তোলে: OmniRoute
`/proc/self/mountinfo` পড়ে এবং মাউন্ট করা পাথে (এবং যেসব ডিরেক্টরির
সন্তান পাথ মাউন্ট করা আছে, যা ঠিক উপরের `/host-home` কাঠামোর মতো) লেখার অনুমতি দেয়, একই সঙ্গে
মাউন্ট না করা পাথগুলো প্রত্যাখ্যান করতে থাকে।

### জরুরি বিকল্প: কনটেইনারের নিজস্ব CLI-গুলো কনফিগার করুন (খুব সীমিতভাবে ব্যবহার করুন)

CLI-গুলো যখন সত্যিই কনটেইনারের ভেতরেই থাকে (`cli` প্রোফাইল), তখন লেখার কাজটি
ইচ্ছাকৃত। যেকোনো `setup-*` কমান্ডে `--allow-container-write` দিন, অথবা সার্ভারের জন্য
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` সেট করুন। লেখার কাজটি সম্পন্ন হবে,
তবে একটি সতর্কতা দেখানো হবে যে এটি কনটেইনারের পরেও টিকে থাকবে না।

> **নিরাপত্তা সতর্কতা — `cli` প্রোফাইল + `docker.sock` মাউন্ট।**
> `cli` প্রোফাইলটি `/var/run/docker.sock` bind-mount করে, যাতে কনটেইনারের ভেতরের
> স্বয়ংক্রিয় আপডেটার হোস্ট daemon থেকে stack পুনরায় তৈরি করতে পারে
> (`src/lib/system/autoUpdate.ts` ওই socket-এর উপস্থিতি যাচাই করে এবং এটি
> অনুপস্থিত থাকলে Docker পাথটি এড়িয়ে যায়)। ওই socket হলো **হোস্ট-root আস্থার
> সীমানা**: যেকোনো কিছু এতে প্রবেশাধিকার পেলে root হিসেবে হোস্ট Docker daemon
> নিয়ন্ত্রণ করতে পারে — এটি হোস্টের যেকোনো কনটেইনার তৈরি, পরিদর্শন, বন্ধ এবং অপসারণ করতে পারে।
> এর প্রভাব:
>
> 1. **`cli` প্রোফাইলের port কখনোই নেটওয়ার্কে উন্মুক্ত করবেন না।** এটি
>    `127.0.0.1`-এ প্রকাশ করুন (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN থেকে প্রবেশযোগ্য একটি `cli` প্রোফাইল ড্যাশবোর্ড-স্তরের যেকোনো RCE-কে
>    সম্পূর্ণ হোস্ট দখলে পরিণত করে।
> 2. **`cli` প্রোফাইলে কোনো অতিরিক্ত হোস্ট ডিরেক্টরি bind করবেন না।**
>    Docker socket-এর সঙ্গে যেকোনো অতিরিক্ত mount কনটেইনারকে আপনার filesystem এবং
>    হোস্ট কনফিগে সম্পূর্ণ read/write প্রবেশাধিকার দেয়। কোনো টুলের যদি একটি project দেখার প্রয়োজন হয়,
>    তাহলে CLI binary দিয়ে সেটি স্থানীয়ভাবে চালান — সেটিকে `cli` কনটেইনারে
>    mount করবেন না।
>
> কনটেইনারের ভেতরে স্বয়ংক্রিয় আপডেটের প্রয়োজন না হলে `cli` প্রোফাইল বন্ধ রাখুন
> (`COMPOSE_PROFILES=core,redis` বা আরও সংক্ষিপ্ত)। অন্য প্রোফাইলগুলো
> Docker socket mount করে না।
>
> MITM-সংক্রান্ত হুমকি মডেলের জন্য `docs/security/MITM-TPROXY-DECRYPT.md` দেখুন (git-এ আছে; `/docs`-এ কম্পাইল করা হয়নি)
> এবং `codex`/`claude-code`/`droid`/`openclaw` binary-এর উৎস-শৃঙ্খলের জন্য
> `docs/security/SUPPLY_CHAIN.md` দেখুন।

## Redis সাইডকার

ডিস্ট্রিবিউটেড রেট লিমিটার এবং শেয়ার্ড ক্যাশের ব্যাকএন্ড হিসেবে OmniRoute Redis-এর ওপর নির্ভর করে। `redis` সার্ভিসটি `docker-compose.yml`-এ **সবসময় সংজ্ঞায়িত থাকে** (এটির কোনো প্রোফাইল গেট নেই) এবং অন্য যেকোনো প্রোফাইলের পাশাপাশি চালু হয়।

| বিবরণ                   | মান                                    |
| ----------------------- | -------------------------------------- |
| ইমেজ                    | `redis:7-alpine`                       |
| কনটেইনারের নাম          | `omniroute-redis`                      |
| অভ্যন্তরীণ পোর্ট        | `6379`                                 |
| হোস্ট পোর্ট (ওভাররাইড)  | `REDIS_PORT` (ডিফল্ট `6379`)           |
| হোস্ট বাইন্ড (ওভাররাইড) | `REDIS_BIND_HOST` (ডিফল্ট `127.0.0.1`) |
| ভলিউম                   | `omniroute-redis-data` → `/data`       |
| হেলথচেক                 | `redis-cli ping` (10s ব্যবধান)         |

সংশ্লিষ্ট এনভায়রনমেন্ট ভেরিয়েবল:

- `REDIS_URL` — অ্যাপে ইনজেক্ট করা কানেকশন স্ট্রিং (ডিফল্টভাবে `redis://redis:6379`)।
- `REDIS_PORT` — Redis কনটেইনারের জন্য হোস্ট-সাইড পোর্ট ম্যাপিং।
- `REDIS_BIND_HOST` — যে হোস্ট ইন্টারফেসে পোর্টটি প্রকাশ করা হয়। ডিফল্ট `127.0.0.1`।

> **ডিফল্টভাবে লুপব্যাক ব্যবহারের কারণ:** সাইডকারটি `requirepass` ছাড়াই চলে, এবং অ্যাপ
> কনটেইনারগুলো compose নেটওয়ার্কের মাধ্যমে (`redis:6379`) এতে পৌঁছায় — প্রকাশিত পোর্টটি
> শুধু হোস্ট-সাইড টুলিংয়ের (`redis-cli`, স্থানীয় `npm run dev`) জন্য রয়েছে। `0.0.0.0`-এ
> প্রকাশ করলে আপনার LAN-এর প্রতিটি হোস্টের কাছে প্রমাণীকরণবিহীন Redis উন্মুক্ত হয়ে যাবে। আপনি
> `REDIS_BIND_HOST=0.0.0.0` সেট করলে, সার্ভিসের `command:`-এ `--requirepass`-ও যোগ করুন।

**Redis নিষ্ক্রিয় করা** সুপারিশ করা হয় না (রেট লিমিটার ইন-মেমরি ফলব্যাকে অবনমিত হবে)। এটি করতেই হলে, `docker-compose.yml` থেকে `redis:` সার্ভিস ব্লকটি সরিয়ে দিন/কমেন্ট করে দিন অথবা এটিকে শূন্যে স্কেল করুন:

```bash
docker compose up -d --scale redis=0
```

## প্রোডাকশন Compose

ডেভের পাশাপাশি একটি বিচ্ছিন্ন প্রোডাকশন স্ন্যাপশট চালাতে `docker-compose.prod.yml` ব্যবহার করুন।

| বিবরণ                   | মান                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------- |
| ফাইল                    | `docker-compose.prod.yml`                                                              |
| ডিফল্ট ড্যাশবোর্ড পোর্ট | `PROD_DASHBOARD_PORT=20130` (অভ্যন্তরীণ `${DASHBOARD_PORT:-20128}`-এ ম্যাপ করা)        |
| ডিফল্ট API পোর্ট        | `PROD_API_PORT=20131`                                                                  |
| ইমেজ                    | `omniroute:prod` (`runner-cli` টার্গেট থেকে বিল্ড করা)                                 |
| Redis কনটেইনার          | `omniroute-redis-prod` (`redis:8.6.2`, ডেডিকেটেড `redis-prod-data` ভলিউম)              |
| ডেটা ভলিউম              | `omniroute-prod-data` (নামযুক্ত, পুনরায় বিল্ডের পরও সংরক্ষিত থাকে)                    |
| হেলথচেক                 | `node healthcheck.mjs` + `redis-cli ping`, Redis-এর হেলথ অনুযায়ী `depends_on` গেট করা |

ব্যবহারের পদ্ধতি:

```bash
# প্রোডাকশন স্ট্যাক বিল্ড ও চালু করুন
docker compose -f docker-compose.prod.yml up -d --build

# লগ স্ট্রিম করুন
docker compose -f docker-compose.prod.yml logs -f

# বন্ধ করুন (ভলিউমগুলো রাখুন)
docker compose -f docker-compose.prod.yml down
```

প্রোড স্ট্যাকটি ডেভ compose-এর সমান্তরালে চলে (কনটেইনারের নাম, পোর্ট ও ভলিউম আলাদা), ফলে প্রোডাকশন চালু রেখেই আপনি স্থানীয়ভাবে কাজ চালিয়ে যেতে পারবেন।

## Dockerfile স্টেজসমূহ

রিপোজিটরিটির সঙ্গে একটি মাল্টি-স্টেজ Dockerfile (`Dockerfile`) সরবরাহ করা হয়। চারটি স্টেজ উন্মুক্ত রয়েছে; আপনার ব্যবহারের ক্ষেত্র অনুযায়ী সঠিক `target` বেছে নিন।

| স্টেজ         | বেস ইমেজ              | উদ্দেশ্য                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ডিপেন্ডেন্সি ইনস্টল করে (`npm ci --legacy-peer-deps`) এবং `npm run build` চালায় (ডিফল্টভাবে Turbopack — নিচের বিল্ড-টাইম রিসোর্স দেখুন)                                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Next.js-এর স্ট্যান্ডঅ্যালোন আউটপুটসহ প্রোডাকশন রানটাইম। **কোনো প্রোভাইডার CLI অন্তর্ভুক্ত নেই।**                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` এবং গ্লোবাল CLI যোগ করে: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`। **এজেন্টিক ওয়ার্কফ্লোর জন্য এটি বেছে নিন।**                                                                                                                        |
| `runner-web`  | `runner-base`         | ওয়েব-সেশন প্রোভাইডারগুলোর জন্য Playwright + একটি Chromium ব্রাউজার (`--with-deps`) যোগ করে: `gemini-web`, `claude-web`, `claude-turnstile`। **এসব প্রোভাইডার ব্যবহার করলে এটি বেছে নিন** — এটি ছাড়া সাধারণ ইমেজটি রিকোয়েস্টের সময় ব্যর্থ হয় (রিলিজ চ্যানেলের অধীনে `-web`-সংক্রান্ত নোট দেখুন)। |

নির্দিষ্ট কোনো টার্গেট ম্যানুয়ালি বিল্ড করুন:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### বিল্ড-টাইম রিসোর্স

তিনটি বিল্ড আর্গুমেন্ট `builder` স্টেজের রিসোর্স ব্যয় নিয়ন্ত্রণ করে। এগুলো শুধু বিল্ড-টাইমের জন্য —
`OMNIROUTE_MEMORY_MB` (নিচে) একটি পৃথক রানটাইম নিয়ন্ত্রণ।

| বিল্ড আর্গুমেন্ট            | ডিফল্ট | প্রভাব                                                                                        |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` webpack দিয়ে বিল্ড করে: সর্বোচ্চ মেমরি কম লাগে, তবে ধীর। `1` Turbopack ব্যবহার করে।      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | চালু করা `next build`-এর জন্য V8 হিপের সর্বোচ্চ সীমা (`--max-old-space-size`)।                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL`-এ মান পাঠায়; পেজ-ডেটা সংগ্রহের জন্য Next `workers = N - 1` নির্ধারণ করে। |

বড় বিল্ডারে `OMNIROUTE_BUILD_WORKERS`-এর মান বাড়ানো উচিত এবং সীমিত রিসোর্সের
কোনো বিল্ড **`✓ Compiled successfully`-এর পরে** বন্ধ হয়ে গেলে প্রথমে এটিকেই
সন্দেহ করা উচিত। প্রতিটি পেজ-ডেটা ওয়ার্কার নিজস্ব প্রক্রিয়া, এবং মূল
`next build`-ও নিজস্ব প্রক্রিয়া; একটি সচল VPS-এ পুনরুৎপাদনে (issue #7518)
`NODE_OPTIONS` হিপ ফ্ল্যাগ নির্বিশেষে প্রতিটি প্রক্রিয়ার সর্বোচ্চ RSS
~4.5 GB পরিমাপ করা হয়েছে (Turbopack V8 হিপের বাইরে নেটিভ/Rust মেমরিতে
কম্পাইল করে)। ডিফল্ট মান `2` (→ 1টি ওয়ার্কার, মোট 2টি প্রক্রিয়া) প্রকাশনা
পাইপলাইনে ব্যবহৃত 16 GB / 4 vCPU GitHub-হোস্টেড রানারের উপযোগী করে নির্ধারণ
করা হয়েছে। `8`-এ (→ 7টি ওয়ার্কার) সেই রানারের মেমরি শেষ হয়ে যায় এবং
buildkit `ResourceExhausted: ... cannot allocate memory` দেখিয়ে ধাপটি ব্যর্থ
করে; প্রতি-প্রক্রিয়ার RSS অনুমান না করে সরাসরি পরিমাপ করার পর দেখা যায়,
`3`-ও (→ 2টি ওয়ার্কার) যথেষ্ট ছিল না। `tests/unit/docker-build-memory-budget.test.ts`
পরিমাপ করা সংখ্যার ভিত্তিতে হিসাব করে এবং কোনো একটি নিয়ন্ত্রণের মান রানারের
সক্ষমতা ছাড়িয়ে গেলে ব্যর্থ হয়।

Turbopack নেটিভ Rust মেমরিতে কম্পাইল করে, যা V8 হিপের **বাইরে** থাকে; তাই
`OMNIROUTE_BUILD_MEMORY_MB` এটিকে সীমাবদ্ধ করে না। মেমরি সীমাবদ্ধ কোনো হোস্টে
বিল্ডটি তখন কোনো ত্রুটির বার্তা ছাড়াই OOM killer দ্বারা SIGKILL করা হয় —
এটি কেবল `Creating an optimized production build`-এর মাঝপথে থেমে যায়, ফলে
মেমরি ফুরিয়ে যাওয়ার পরিবর্তে এটিকে হ্যাং হয়েছে বলে মনে হয়। এ কারণেই
`Dockerfile`-এ ডিফল্ট হিসেবে webpack (`OMNIROUTE_USE_TURBOPACK=0`) ব্যবহৃত হয়,
যা `npm run dev` / `npm run build` থেকে আলাদা; সেখানে কোডের ডিফল্ট হলো
Turbopack: কোনো বিল্ড আর্গুমেন্ট ছাড়া সাধারণ `docker build .` (যা Railway
এবং অন্যান্য ওয়ান-ক্লিক হোস্ট চালায়) মেমরি-সীমাবদ্ধ বিল্ডারে নীরবে বন্ধ
হয়ে যাওয়া উচিত নয়। প্রকাশিত ইমেজগুলো ইতিমধ্যেই `docker-publish.yml`-এ
স্পষ্টভাবে `OMNIROUTE_USE_TURBOPACK=0` পাস করে। পর্যাপ্ত RAM-সহ কোনো বিল্ডারে
দ্রুততর বিল্ডের জন্য Turbopack বেছে নিন:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` সক্রিয় আছে, তাই `next build` একটি মূল প্রক্রিয়া **এবং**
একটি ওয়ার্কার প্রক্রিয়া চালায় এবং প্রতিটি আলাদাভাবে `OMNIROUTE_BUILD_MEMORY_MB`
মেনে চলে। কনটেইনারের সীমা এই মানের প্রায় দ্বিগুণের বেশি নির্ধারণ করুন,
একগুণ নয়।

এই ট্রিতে পরিমাপ করা হয়েছে (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| বান্ডলার  | কনটেইনারের সীমা | ফলাফল                           |
| --------- | --------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | উভয় ক্ষেত্রেই নীরবে OOM-killed |
| webpack   | 8 GiB           | বিল্ড ওয়ার্কার SIGKILLed       |
| webpack   | 12 GiB          | সফল, সর্বোচ্চ ব্যবহার 11.1 GiB  |

### রানটাইমের ডিফল্ট মান

`runner-base` দ্বারা এক্সপোর্ট করা ডিফল্ট মান: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker-এ মেমরির আচরণ:

- ইমেজটি `OMNIROUTE_MEMORY_MB=1024` সেট করে এবং এটি থেকে `NODE_OPTIONS=--max-old-space-size=1024` নির্ধারণ করে।
- প্রকৃত সার্ভার প্রসেসটি standalone launcher দ্বারা চালু হয়, যা `OMNIROUTE_MEMORY_MB` পড়ে এবং `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` যোগ করে।
- Node বারবার উল্লেখ করা `--max-old-space-size`-এর সর্বশেষ মানটি ব্যবহার করে, তাই `OMNIROUTE_MEMORY_MB` সেট করার মাধ্যমে কার্যকর Docker heap সীমা নিয়ন্ত্রণ করা যায়।
- যেহেতু ইমেজটি সবসময় এটি সেট করে, তাই Docker-এর অধীনে launcher-এর নিজস্ব RAM-অনুযায়ী নির্ধারিত fallback কখনোই প্রয়োগ হয় না। workload অনুযায়ী এটি স্পষ্টভাবে বাড়ান (নিচের টেবিল দেখুন)। coding-agent `/v1/responses`-এর জন্য `2048` এখনও খুব কম।

### coding agent-এর জন্য runtime RAM

1 GiB Docker default হলো dashboard/হালকা chat-এর জন্য ন্যূনতম সীমা, production-এর উপযোগী আকার নয়। দীর্ঘ `POST /v1/responses` body (শত শত message, কয়েক ডজন tool) compression-এর সময় একাধিক in-memory graph ধরে রাখে। একই সময়ে চলা প্রায় 3 MiB / প্রায় 750k-token-এর দুটি request **12 GiB** old-space-এ V8 বন্ধ করে দিয়েছে (`FATAL ERROR: Reached heap limit`) এবং 16 GiB cgroup OOM-ও ঘটিয়েছে। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) দেখুন।

**heap-এর চেয়ে বেশি cgroup `--memory` নির্ধারণ করুন** — native buffer, SQLite এবং compression-এর মধ্যবর্তী data V8-এর বাইরে থাকে।

| Workload                              | `OMNIROUTE_MEMORY_MB`     | Container / cgroup            | নোট                                                                                                             |
| ------------------------------------- | ------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Dashboard, একটি হালকা chat            | `1024` (ইমেজের default)   | ≥2 GiB                        |                                                                                                                 |
| একটি coding agent (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                       | সাধারণ single-session `/v1/responses`                                                                           |
| একই সময়ে দুটি দীর্ঘ `/v1/responses`  | `10240`–`12288`           | ≥12–16 GiB                    | প্রায় 12 GiB heap-এ V8 বন্ধ হয়ে যাওয়া পরিমাপ করা হয়েছে                                                      |
| একই সময়ে তিন বা ততোধিক দীর্ঘ context | একটি process-এ চালাবেন না | ধারাবাহিকভাবে চালান / আরও RAM | default heavyweight admission-এ 1টি request চলমান থাকে; RAM না বাড়িয়ে এটি বাড়ালে আবারও প্রসেস বন্ধ হয়ে যাবে |

bare metal-এ `omniroute serve`, `OMNIROUTE_MEMORY_MB` **সেট করা না থাকলে**, RAM-এর প্রায় 35% অনুযায়ী নির্ধারণ করে (`[512, 4096]` সীমার মধ্যে)। Docker সবসময় `1024` সেট করে, তাই official image-এ এই calibration কখনোই চলে না।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## গুরুত্বপূর্ণ এনভায়রনমেন্ট ভেরিয়েবলসমূহ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-এ নথিভুক্ত ডিফল্টগুলোর পাশাপাশি, Docker-এর অধীনে চালানোর সময় নিম্নলিখিত ভেরিয়েবলগুলো সবচেয়ে গুরুত্বপূর্ণ:

| ভেরিয়েবল                     | উদ্দেশ্য                                                                                                                                                                                                                                                               | ডিফল্ট                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ব্রিজের জন্য শেয়ার্ড সিক্রেট। **প্রোডাকশনে আবশ্যক** — একটি শক্তিশালী র্যান্ডম স্ট্রিং নির্ধারণ করুন।                                                                                                                                                        | সেট করা নেই (প্রদান করতে হবে) |
| `REDIS_URL`                   | রেট লিমিটার / ক্যাশ ব্যাকএন্ডের সংযোগ স্ট্রিং                                                                                                                                                                                                                          | `redis://redis:6379`          |
| `REDIS_PORT`                  | অন্তর্ভুক্ত Redis কনটেইনারের হোস্ট-সাইড পোর্ট                                                                                                                                                                                                                          | `6379`                        |
| `REDIS_BIND_HOST`             | যে হোস্ট ইন্টারফেসে অন্তর্ভুক্ত Redis পোর্ট প্রকাশিত হয় (AUTH যোগ না করলে লুপব্যাক)                                                                                                                                                                                   | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | স্বয়ংক্রিয় আপডেট ওয়ার্কফ্লোর জন্য `/workspace/omniroute`-এ `cli` প্রোফাইলের মধ্যে মাউন্ট করা হোস্ট পাথ                                                                                                                                                              | `.` (বর্তমান ডিরেক্টরি)       |
| `OMNIROUTE_MEMORY_MB`         | Docker স্ট্যান্ডঅ্যালোন সার্ভারের রানটাইম Node হিপ সীমা; উপরের ইমেজ ডিফল্টকে ওভাররাইড করে। কোডিং এজেন্ট: `8192`+ ([রানটাইম RAM](#runtime-ram-for-coding-agents) দেখুন)।                                                                                                | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | ড্যাশবোর্ড (20128) এবং API (20129)-এর প্রকাশিত পোর্ট ওভাররাইড করে                                                                                                                                                                                                      | `20128` / `20129`             |
| `APP_BIND_HOST`               | যে হোস্ট ইন্টারফেসে docker-compose ড্যাশবোর্ড/API/live-WS পোর্টগুলো প্রকাশ করে। `REQUIRE_API_KEY=false` (ডিফল্ট) হলে, `0.0.0.0` অজ্ঞাতনামা `/v1` প্রক্সিকে LAN-এ উন্মুক্ত করে — কেবল `REQUIRE_API_KEY=true` থাকলে বা সামনে একটি রিভার্স প্রক্সি থাকলে এর পরিধি বাড়ান। | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | যে হোস্ট ইন্টারফেসে docker-compose `cliproxyapi` সাইডকারটি প্রকাশ করে — এর ডেটা ভলিউমে প্রোভাইডারের ক্রেডেনশিয়াল সংরক্ষিত থাকে।                                                                                                                                       | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | যে ডিরেক্টরি থেকে রানটাইম প্লাগইন স্ক্যানার পড়ে এবং যেখানে ইনস্টল করে। প্লাগইনগুলো bind-mounted হলে এটি সেট করুন: ডিফল্টটি `HOME` অনুসরণ করে, যা কোনো ইমেজ এক্সপোর্ট না-ও করতে পারে।                                                                                  | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | অ্যাপটি রিভার্স প্রক্সির পেছনে প্রকাশিত হলে ব্যবহৃত URL সাবপাথ (যেমন `/omniroute`)                                                                                                                                                                                     | _(খালি = রুট)_                |
| `NEXT_PUBLIC_BASE_URL`        | সাবপাথসহ পাবলিক ব্রাউজার অরিজিন (যেমন `https://host/omniroute`)                                                                                                                                                                                                        | সেট করা নেই                   |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`-এর হোস্ট-সাইড ড্যাশবোর্ড পোর্ট                                                                                                                                                                                                               | `20130`                       |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` সাইডকারের হোস্ট-সাইড পোর্ট                                                                                                                                                                                                                               | `8317`                        |

## সাবপাথে রিভার্স প্রক্সি (Traefik / nginx)

Next.js-এর `basePath` স্ট্যান্ডঅ্যালোন বান্ডলের মধ্যে কম্পাইল করা হয়। OmniRoute অ্যাপের রুটে একটি সেন্টিনেল ফাইলে বিল্ডের সময় নির্ধারিত মানটি সংরক্ষণ করে (`npm run build` চলাকালীন লেখা হয়; `scripts/docker/ensure-docker-base-path.mjs` দ্বারা পড়া হয়) এবং কনটেইনার চালু হওয়ার সময় সেটিকে `OMNIROUTE_BASE_PATH`-এর সঙ্গে তুলনা করে। মান দুটি ভিন্ন হলে এবং ইমেজটি ডোমেইন রুটের জন্য বিল্ড করা হয়ে থাকলে, `node dev/run-standalone.mjs` চালু হওয়ার আগে এন্ট্রিপয়েন্ট স্ট্যান্ডঅ্যালোন ম্যানিফেস্ট, এমবেড করা `basePath`/`assetPrefix` লিটারেল (Next 16 কেবল `assetPrefix` থেকেই SSR অ্যাসেট URL রেন্ডার করে—প্যাচারটি সাবপাথকেও এতে প্রতিফলিত করে), বিল্ডের মধ্যে থাকা `/_next/static` অ্যাসেট URL (ক্লায়েন্ট-রেফারেন্স ম্যানিফেস্ট, মিডিয়া ইমপোর্ট, প্রিরেন্ডার করা ত্রুটি পৃষ্ঠা) এবং ক্লায়েন্টের `process.env` শিম পুনর্লিখন করে।

### Compose বিল্ড (প্রস্তাবিত)

`.env`-এ উভয় ভেরিয়েবল সেট করুন, তারপর ইমেজ ও রানটাইমের মান যেন মিলে যায় তা নিশ্চিত করতে পুনরায় বিল্ড করুন:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`-কে Docker build-arg এবং রানটাইম এনভায়রনমেন্ট ভেরিয়েবল—উভয় হিসেবেই ফরোয়ার্ড করে।

### আগে থেকে বিল্ড করা রুট ইমেজ + রানটাইম সাবপাথ

প্রকাশিত `diegosouzapw/omniroute:*` ইমেজগুলো ডোমেইন রুটের জন্য বিল্ড করা। তবুও আপনি রানটাইমে `OMNIROUTE_BASE_PATH` সেট করতে পারেন; কনটেইনারটি স্টার্টআপের সময় একবার বান্ডল প্যাচ করবে। এর সঙ্গে সামঞ্জস্যপূর্ণ পাবলিক অরিজিন ব্যবহার করুন:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

রিভার্স প্রক্সিকে **সম্পূর্ণ** বাহ্যিক পাথ ফরোয়ার্ড করার জন্য কনফিগার করুন (প্রিফিক্স বাদ দেবেন না)। Traefik-এর উচিত `StripPrefix` ছাড়াই `PathPrefix(`/omniroute`)`-কে কনটেইনারে রাউট করা, যাতে Next.js `/omniroute/...` গ্রহণ করে এবং `/omniroute/_next/...` থেকে অ্যাসেট পরিবেশন করে।

Docker healthcheck সক্রিয় `OMNIROUTE_BASE_PATH` দিয়ে প্রিফিক্স করা হালকা `/healthz` লাইফসাইকেল এন্ডপয়েন্ট পরীক্ষা করে। মানুষের ব্যবহারের উপযোগী/ড্যাশবোর্ড ডায়াগনস্টিকের জন্য `/api/monitoring/health` উপলভ্য থাকে; কনটেইনারের HEALTHCHECK-কে আবার সেখানে নির্দেশ করতে (উদাহরণস্বরূপ, গভীর স্বাস্থ্য যাচাই প্রয়োগ করতে), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` সেট করুন। ওই পাথটি একটি **গভীর** পরীক্ষা (DB + মনিটরিং সারসংক্ষেপ)—আপনি পুনরায় এটি বেছে নিলে Docker-এর কম ঘনঘন চালানো `HEALTHCHECK`-এর জন্য উপযুক্ত, কিন্তু Kubernetes `livenessProbe` ইন্টারভালের জন্য **নয়**।

অর্কেস্ট্রেটরগুলোর জন্য (Kubernetes, Nomad ইত্যাদি):

| প্রোব              | অগ্রাধিকার দিন                                                     | এড়িয়ে চলুন                                              |
| ------------------ | ------------------------------------------------------------------ | --------------------------------------------------------- |
| লাইভনেস            | HTTP `GET /livez`, অথবা প্রধান পোর্টে TCP (`PORT`, ডিফল্ট `20128`) | লাইভনেস হিসেবে `/api/monitoring/health`                   |
| রেডিনেস            | HTTP `GET /healthz`                                                | ইভেন্ট লুপ ব্যস্ত থাকাকে মৃত হিসেবে গণ্য করা কঠোর টাইমআউট |
| গভীর / ব্ল্যাকবক্স | `/api/monitoring/health`                                           | —                                                         |

`/healthz` প্রসেসের লাইফসাইকেল (`ok` / `starting` / `stopping`) রিপোর্ট করে। `/livez` কেবল প্রসেস চালু আছে কি না তা নির্দেশ করে (হ্যান্ডলার চলতে পারলেই 200 দেয়; এটি রেডিনেসের জন্য অপেক্ষা করে না)। উভয়ই রিকোয়েস্ট হ্যান্ডলিংয়ের মতো একই Node ইভেন্ট লুপে চলে, তাই CPU-নির্ভর ক্যাটালগ বা কম্প্রেশন কাজ এগুলোকে বিলম্বিত করতে পারে—ব্যস্ত ≠ মৃত। HTTP প্রোবের সময়সীমা শেষ হয়ে গেলে TCP লাইভনেসকে অগ্রাধিকার দিন। প্রোব সম্পর্কিত সম্পূর্ণ নির্দেশিকা:
[মনিটরিং নির্দেশিকা—Kubernetes প্রোবের সুপারিশ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)।

## Caddy সহ Docker Compose (HTTPS Auto-TLS)

Caddy-এর স্বয়ংক্রিয় SSL প্রভিশনিং ব্যবহার করে OmniRoute-কে নিরাপদভাবে উন্মুক্ত করা যায়। নিশ্চিত করুন যে আপনার ডোমেইনের DNS A রেকর্ডটি আপনার সার্ভারের IP-এর দিকে নির্দেশ করে।

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

Caddy আপস্ট্রিম কনটেইনারের জন্য প্রচলিত ফরোয়ার্ডিং হেডারগুলো সেট করে। OAuth কলব্যাক এবং তৈরি করা পাবলিক
লিংকের ক্যানোনিক্যাল পাবলিক অরিজিন হিসেবে OmniRoute `NEXT_PUBLIC_BASE_URL` ব্যবহার করে;
প্রমাণীকৃত ড্যাশবোর্ড রাইটগুলো সেশন-সংযুক্ত CSRF সুরক্ষাসহ একই-অরিজিনের অনুরোধ ব্যবহার করে।
শুধু উন্নত ডিপ্লয়মেন্টের ক্ষেত্রে `OMNIROUTE_TRUST_PROXY` সক্রিয় করুন, যেখানে আপনি সুস্পষ্ট
কনফিগারেশনের পরিবর্তে বিশ্বস্ত ফরোয়ার্ড করা হেডার থেকে OmniRoute-কে পাবলিক অরিজিন নির্ধারণ করাতে চান।

## Cloudflare Quick Tunnel

Docker ডিপ্লয়মেন্টের জন্য ড্যাশবোর্ড সহায়তায় `Dashboard → Endpoints`-এ এক-ক্লিকের **Cloudflare Quick Tunnel** অন্তর্ভুক্ত রয়েছে। প্রথমবার সক্রিয় করলে কেবল প্রয়োজনের সময় `cloudflared` ডাউনলোড হয়, আপনার বর্তমান `/v1` এন্ডপয়েন্টে একটি অস্থায়ী টানেল চালু হয় এবং আপনার স্বাভাবিক পাবলিক URL-এর ঠিক নিচে তৈরি করা `https://*.trycloudflare.com/v1` URL দেখানো হয়।

সক্রিয় টানেলের অবস্থা পরিবর্তন না করেই `Settings → Appearance` থেকে এন্ডপয়েন্ট টানেল প্যানেলগুলো (Cloudflare, Tailscale, ngrok) দেখানো বা লুকানো যায়।

### টানেল-সংক্রান্ত নোট

- Quick Tunnel URL-গুলো অস্থায়ী এবং প্রতিবার পুনরায় চালু করার পর পরিবর্তিত হয়।
- OmniRoute বা কনটেইনার পুনরায় চালু করার পর Quick Tunnel স্বয়ংক্রিয়ভাবে পুনরুদ্ধার হয় না। প্রয়োজন হলে ড্যাশবোর্ড থেকে সেগুলো আবার সক্রিয় করুন।
- ম্যানেজড ইনস্টল বর্তমানে `x64` / `arm64`-এ Linux, macOS এবং Windows সমর্থন করে।
- সীমাবদ্ধ কনটেইনার পরিবেশে কোলাহলপূর্ণ QUIC UDP বাফার সতর্কতা এড়াতে ম্যানেজড Quick Tunnel ডিফল্টভাবে HTTP/2 ট্রান্সপোর্ট ব্যবহার করে। ভিন্ন ট্রান্সপোর্ট চাইলে `CLOUDFLARED_PROTOCOL=quic` অথবা `auto` সেট করুন।
- Docker ইমেজে সিস্টেম CA রুট অন্তর্ভুক্ত থাকে এবং সেগুলো ম্যানেজড `cloudflared`-এ পাঠানো হয়, যা কনটেইনারের ভেতরে টানেল বুটস্ট্র্যাপ হওয়ার সময় TLS ট্রাস্ট ব্যর্থতা এড়ায়।
- OmniRoute-কে কোনো একটি ডাউনলোড করার পরিবর্তে বিদ্যমান বাইনারি ব্যবহার করাতে চাইলে `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` সেট করুন।

## ইমেজ ট্যাগ

| ইমেজ                     | ট্যাগ    | আকার   | বিবরণ                                                   |
| ------------------------ | -------- | ------ | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | সর্বোচ্চ **প্রকাশিত** স্থিতিশীল SemVer (git `main` নয়) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps-এর জন্য এই শ্রেণির ট্যাগ পিন করুন                |

মাল্টি-প্ল্যাটফর্ম ম্যানিফেস্ট: `linux/amd64` + `linux/arm64` নেটিভ (Apple Silicon, AWS Graviton, Raspberry Pi)। Docker স্বয়ংক্রিয়ভাবে মিলে যাওয়া আর্কিটেকচার নির্বাচন করে; ARM হোস্টে জোরপূর্বক AMD64 ইমুলেশন ব্যবহার করতে হলে `--platform linux/amd64` দিন।

### রিলিজ চ্যানেল

OmniRoute স্থিতিশীল রিলিজ, সক্রিয় রিলিজ-ব্রাঞ্চ পরীক্ষা এবং ডেভেলপমেন্ট বিল্ডের জন্য পৃথক Docker চ্যানেল প্রকাশ করে।

| চ্যানেল                         | উৎস                                    | পরিবর্তনযোগ্যতা                     | প্রস্তাবিত ব্যবহার                                                                                                      |
| ------------------------------- | -------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | স্বাক্ষরিত/সংস্করণযুক্ত রিলিজ          | অপরিবর্তনীয়                        | সুনির্দিষ্ট রিলিজ পিন করা প্রোডাকশন ডিপ্লয়মেন্ট                                                                        |
| `:latest` / `:latest-web`       | সর্বোচ্চ **প্রকাশিত** স্থিতিশীল SemVer | পরিবর্তনযোগ্য স্থিতিশীল পয়েন্টার   | একটি SemVer প্রকাশনা কাজের **পরে** স্থিতিশীল রিলিজ অনুসরণ করে — `main` বা অপ্রকাশিত `release/v*` কমিট অনুসরণ করে **না** |
| `:next` / `:next-web`           | বর্তমান ডিফল্ট `release/v*` ব্রাঞ্চ    | পরিবর্তনযোগ্য প্রি-রিলিজ পয়েন্টার  | সক্রিয় রিলিজ ব্রাঞ্চে যুক্ত হওয়া, কিন্তু এখনো স্থিতিশীল রিলিজে অন্তর্ভুক্ত না হওয়া সংশোধনগুলো পরীক্ষা করা            |
| `:main` / `:main-web`           | `main` ব্রাঞ্চ                         | পরিবর্তনযোগ্য ডেভেলপমেন্ট পয়েন্টার | শুধু ডেভেলপমেন্ট এবং ইন্টিগ্রেশন পরীক্ষা                                                                                |

#### ওয়েব-সেশন প্রোভাইডার: `-web` ইমেজ

উপরের প্রতিটি চ্যানেলের একটি `-web` ট্যাগও রয়েছে (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), যা `runner-web` স্টেজ থেকে তৈরি—একই ইমেজের সঙ্গে Playwright এবং একটি Chromium ব্রাউজার। সাধারণ ইমেজটি Chromium **ছাড়া** সরবরাহ করা হয়; `gemini-web`, `claude-web` এবং `claude-turnstile`-এর এটি প্রয়োজন।

ব্যর্থতাটি স্টার্টআপের সময় ঘটে না, বরং পিছিয়ে দেওয়া হয়: এই প্রোভাইডারগুলো তাদের মডেল তালিকাভুক্ত করে এবং ড্যাশবোর্ডে সংযুক্ত হিসেবে দেখা যায়, আর শুধু প্রথম অনুরোধটি নিচের ত্রুটিসহ ব্যর্থ হয়

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

আপনি এসব প্রোভাইডার ব্যবহার করলে, বর্তমানে যে চ্যানেলে আছেন সেটির `-web` ট্যাগ পুল করুন—আর কিছু পরিবর্তন হবে না। npm/CLI ইনস্টলে (Docker ইমেজ ছাড়া) সমতুল্য অনুপস্থিত অংশটি হলো ব্রাউজার বাইনারি: হোস্টে `npx playwright install chromium` চালান।

#### প্রি-রিলিজ চ্যানেল ব্যবহার করা

বর্তমান ডিফল্ট `release/v*` ব্রাঞ্চে প্রতিটি push-এর সময় `next` চ্যানেলটি পুনর্নির্মিত হয় এবং AMD64 ও ARM64—উভয়ের জন্য প্রকাশিত হয়। পুরোনো maintenance ব্রাঞ্চগুলো এটিকে overwrite করতে পারে না। পরবর্তী stable tag তৈরি হওয়ার আগে active release ব্রাঞ্চে merge হওয়া fix-গুলোর জন্য এই চ্যানেলটি pull করা যায় এমন একটি image সরবরাহ করে।

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-এর ক্ষেত্রে, নির্বাচিত profile-এ ব্যবহৃত image tag override করুন, তারপর service-টি pull করে পুনরায় তৈরি করুন:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### নিরাপত্তা ও rollback

`next` একটি পরিবর্তনশীল pre-release চ্যানেল। active release ব্রাঞ্চে যেকোনো push-এর সময় এটি পরিবর্তিত হতে পারে এবং এটি **production-এ ব্যবহারের জন্য সমর্থিত নয়**। নির্দিষ্ট কোনো build মূল্যায়নের সময় image digest pin করুন:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

পরীক্ষার আগে OmniRoute data volume অথবা bind-mounted data directory-এর backup নিন। rollback করতে, আগে ব্যবহৃত stable version বা digest পুনরুদ্ধার করুন এবং container-টি পুনরায় তৈরি করুন:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

কোনো release-branch build কখনোই `latest` সরাতে পারে না; কেবল একটি উপযুক্ত stable semantic version-ই stable pointer-কে promote করতে পারে। `next` image-গুলো release image inspection এবং CRITICAL vulnerability-এর blocking gate বজায় রাখে।

**`latest` git-এর সাম্প্রতিক অবস্থার নিশ্চয়তা নয়।** `main` অথবা active `release/v*` ব্রাঞ্চে merge হওয়া fix-গুলো **`:latest`-এ থাকে না**, যতক্ষণ না একটি stable SemVer image প্রকাশিত হয় এবং publish job `:latest`-কে promote করে (সেই SemVer-এর একই digest)। GitHub-এ fix দেখা গেলেও `latest` যদি অপরিবর্তিত মনে হয়, তাহলে release ব্রাঞ্চ পরীক্ষা করতে `:next` pull করুন অথবা SemVer tag-এর জন্য অপেক্ষা করুন।

| আপনার প্রয়োজন                                                                | ব্যবহার করুন                          |
| ----------------------------------------------------------------------------- | ------------------------------------- |
| যে GitOps / production-এ কোনো অনাকাঙ্ক্ষিত পরিবর্তন গ্রহণযোগ্য নয়            | `:X.Y.Z` (অথবা image digest) pin করুন |
| প্রকাশিত stable release অনুসরণ করা এবং প্রতিটি release-এ recreate মেনে নেওয়া | `:latest`                             |
| অপ্রকাশিত `release/v*` commit পরীক্ষা করা                                     | `:next` (production-এর জন্য নয়)      |
| `main` পরীক্ষা করা                                                            | `:main` (production-এর জন্য নয়)      |

## উপলভ্যতা: ডিফল্ট SQLite একক-রেপ্লিকা

স্টক Docker / Kubernetes OmniRoute হলো **একটি Node প্রক্রিয়া + একটি SQLite রাইটার**। এই টপোলজিতে উচ্চ উপলভ্যতা **সমর্থিত নয়**।

| সীমাবদ্ধতা                                 | পরিণতি                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| একক রাইটার                                 | একই SQLite ফাইলের বিপরীতে একাধিক রেপ্লিকা চালাবেন **না**। এতে DB ক্ষতিগ্রস্ত হয়।                                                                                                                                                                                                                                                             |
| পুনরায় তৈরি / রিস্টার্ট / HEALTHCHECK কিল | চলমান SSE, ড্যাশবোর্ড সেশন এবং ইন-মেমরি স্টেটের **সম্পূর্ণ বিভ্রাট** ঘটে। সংযুক্ত প্রতিটি ক্লায়েন্টের সংযোগ বিচ্ছিন্ন হয়। এন্ডপয়েন্ট-শূন্য সময়সীমায় নতুন অনুরোধগুলো OmniRoute JSON-এর পরিবর্তে রিভার্স-প্রক্সি **`502 Bad Gateway: Unknown error`** পায় — ক্লায়েন্টরা এটিকে কোনো প্রোভাইডার ব্যর্থতা থেকে আলাদা করতে পারে না (#11015)। |
| `/healthz`-এর মতো একই ইভেন্ট লুপ           | ব্যস্ত ক্যাটালগ বা কম্প্রেশন টিক প্রোবগুলোকে বিলম্বিত করতে পারে; এরপর একটি স্বল্প টাইমআউট **একমাত্র** রেপ্লিকাটি রিস্টার্ট করে।                                                                                                                                                                                                               |

**প্রোব ম্যাট্রিক্স** ([Kubernetes প্রোবের সুপারিশসমূহ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)-ও দেখুন):

| প্রোব                       | লক্ষ্য                                                  | ব্যবহার করবেন না                                                |
| --------------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| লাইভনেস                     | `PORT`-এ TCP (ডিফল্ট `20128`), অথবা সফট HTTP `/healthz` | `/api/monitoring/health`                                        |
| রেডিনেস                     | HTTP `GET /healthz`                                     | এমন কঠোর টাইমআউট, যা ব্যস্ত ইভেন্ট লুপকে মৃত হিসেবে বিবেচনা করে |
| গভীর পরীক্ষা / মানুষের জন্য | `/api/monitoring/health`                                | স্বয়ংক্রিয় kubelet লাইভনেস                                    |

**আপগ্রেড:** প্রতিটি সেশন বিচ্ছিন্ন হবে বলে ধরে নিন। সম্ভব হলে ক্লায়েন্টগুলোকে ড্রেন করুন; ডিফল্ট SQLite-এ কোনো রোলিং আপডেট নেই। Compose `restart: unless-stopped` এবং Docker `HEALTHCHECK` একসঙ্গে কনটেইনারটি Unhealthy হলে একমাত্র প্রক্রিয়াটিকেও প্রতিস্থাপন করবে — ক্ষতির পরিধি একই।

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

`preStop`-এর sleep kube-কে SIGTERM-এর আগে Service এন্ডপয়েন্টগুলো সরিয়ে ফেলতে দেয়, ফলে **নতুন** ট্রাফিক বন্ধ হয়ে যাওয়া প্রক্রিয়াটিতে পৌঁছানো বন্ধ করে। চলমান `/v1/responses` SSE-কে হেভিওয়েট অ্যাডমিশন লিজের মাধ্যমে `SHUTDOWN_TIMEOUT_MS` (ডিফল্ট 30s) পর্যন্ত ড্রেন করা হয় (#11015)। যেসব নতুন অনুরোধ তবুও প্রক্রিয়াটিতে পৌঁছে যায়, সেগুলো `503` + `Retry-After: 5` পায়। প্রতিস্থাপনটি Ready না হওয়া পর্যন্ত Recreate-এর এন্ডপয়েন্ট-শূন্য ব্যবধান একটি পূর্ণ বিভ্রাট হিসেবেই থাকে — এটি SQLite টপোলজির বৈশিষ্ট্য, প্রোবের ভুল কনফিগারেশন নয়।

বাহ্যিক Postgres / মাল্টি-রাইটার HA কোনো নথিভুক্ত স্টক পদ্ধতি **নয়**। আপনার HA প্রয়োজন হলে, একটি একক রেপ্লিকা বজায় রাখুন অথবা প্রকল্পটি আলাদাভাবে পরীক্ষা ও নথিভুক্ত করেছে এমন কোনো টপোলজি চালান। Postgres/MySQL-এর কাজ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-এ রয়েছে। এটি প্রকাশিত না হওয়া পর্যন্ত **বৃহৎ** `/v1/responses` সক্ষমতা বাড়ানোর একমাত্র সমর্থিত উপায় হলো Nটি স্বতন্ত্র প্রক্রিয়া (পরবর্তী বিভাগ), একটি ভলিউমে `replicas > 1` নয়।

## স্কেল-আউট: Nটি স্বাধীন প্রসেস

একটি Node প্রসেস হলো **একটি V8 heap**। পরস্পর ওভারল্যাপ করা ~3 MiB / ~750k-token-এর দুটি coding-agent `POST /v1/responses` (RTK + Caveman) ~12 Gi-এ সেই heap-কে abort করে (`FATAL ERROR: Reached heap limit`) এবং একটি 16 Gi cgroup-কে OOM করাতে পারে। দেখুন [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)। এই পরিমাপটি একটি **মেমরি-বাজেট** সতর্কতা, একই সময়ে চলা দীর্ঘ `/v1/responses`-এর সংখ্যা সর্বোচ্চ দুই—এমন কোনো পণ্যগত কঠোর সীমা নয়। ভারী chat-এর admission একটি স্বয়ংক্রিয়ভাবে নির্ধারিত ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) দ্বারা নিয়ন্ত্রিত হয়, যা একই V8/cgroup সীমা থেকে নির্ধারিত — ইতিমধ্যে যথাযথ আকারে কনফিগার করা প্রসেসে এটিকে বাড়িয়ে override করলে (অথবা পুরোনো `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap সেট করলে) আবারও abort ঘটবে। ছোট chat, `/healthz`, `/v1/models`, এবং MCP এই cap-এর **অন্তর্ভুক্ত নয়**।

### এক প্রসেস: দুইটির বেশি দীর্ঘ `/v1/responses`

একটি **সুস্থ** প্রসেস (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-এর নিচে, default `0.75`) একই সময়ে দুইটির বেশি দীর্ঘ `POST /v1/responses` চালাতে **পারে**, যদি প্রসেসজুড়ে প্রযোজ্য inflight-byte budget-এ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) এখনও জায়গা থাকে। `OMNIROUTE_CHAT_LARGE_BODY_BYTES`-এর সমান বা বেশি আকারের body (default 256 KiB) structure-heavy request-এর মতো একই heavyweight lease নেয় এবং একই [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ব্যবহার করে। একই সময়ে কয়েক দশক দীর্ঘ SSE client (operator-দের প্রায়ই 40–50টি প্রয়োজন হয়) চালানো একটি **মেমরি-বাজেট** বিষয় — heap + primary/headroom slot + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`-এর আকার নির্ধারণ করুন — এটি পণ্যের কোনো কঠোর “সর্বোচ্চ 2” সীমা নয়। চাপের মধ্যে থাকা heap এখনও retry করা যায় এমন `503` দিয়ে load shed করে, যাতে #7849 আবার না ঘটে।

**heap-এর সংখ্যা বাড়াতে** (স্বাধীন V8 old-space) **বর্তমানে**:

| যা করবেন                                                                                                                                                         | যা করবেন না                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Nটি container/pod** চালান, প্রতিটির **নিজস্ব** `DATA_DIR` / volume থাকবে                                                                                       | একটি SQLite file-এর বিপরীতে `replicas > 1` সেট করবেন না                        |
| heap / inflight-byte budget অনুসারে heavy in-flight + healthy-headroom-এর আকার নির্ধারণ করুন; 1–2 হলো রক্ষণশীল #7849 default, পণ্যের কোনো কঠোর সর্বোচ্চ সীমা নয় | একটি প্রসেসকে 8× RAM ও সীমাহীন count cap দেবেন না                              |
| ঐচ্ছিক: **shared quota counter**-এর জন্য `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                    | Redis-কে shared SQLite হিসেবে বিবেচনা করবেন না — এটি তা নয়                    |
| প্রতিটি instance-এ provider secret কপি করুন (অথবা বিভক্ত dashboard মেনে নিন)                                                                                     | instance-গুলোর মধ্যে একটি dashboard / একটি call-log পাওয়ার প্রত্যাশা করবেন না |
| সামনে যেকোনো load balancer ব্যবহার করুন; API key বা session অনুযায়ী sticky করাই যথেষ্ট                                                                          | vendor-specific size-aware middleware আবশ্যক করবেন না                          |

হার্ডওয়্যার: প্রতি instance-এ একই সময়ে চলা দীর্ঘ `/v1/responses`-এর সংখ্যা একটি **মেমরি-বাজেট** বিষয় (heap + inflight-byte / #10110)। Nটি স্বাধীন `DATA_DIR` এখনও heap-এর সংখ্যা বাড়ায়: host RAM-কে `N × cgroup` ধারণ করতে হবে, “N=8 সহ একটি 16 Gi pod” নয়। একটি SQLite file-এর ওপর কখনোই `replicas > 1` ব্যবহার করবেন না।

Compose-এর নমুনা (দুটি heap, দুটি volume — `deploy.replicas: 2` নয়):

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

In-process density (HTTP isolate-এর বাইরে compression) হলো [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)। shared durable state-এর ওপর একটি logical cluster হলো [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)।

## Docker-এর ভিতরে Gemini-এর আঞ্চলিক ত্রুটি

Google AI Studio / Gemini API HTTP 400-এর সঙ্গে FAILED_PRECONDITION এবং
`User location is not supported for the API use.` ফেরত দিতে পারে। হোস্টে কোনো অনুরোধ সফল
হওয়া প্রমাণ করে না যে কনটেইনার একই বহির্গামী রুট ব্যবহার করছে। DNS ক্রম,
IPv4/IPv6 সংযোগ, VPN রাউটিং এবং কনফিগার করা প্রক্সি ভিন্ন হতে পারে।
[Google-এর সমর্থিত অঞ্চলসমূহ](https://ai.google.dev/gemini-api/docs/available-regions)
এবং প্রকৃত সংযোগ রুট—উভয়ই পরীক্ষা করুন; শুধু এই ত্রুটি থেকে API key-টি ত্রুটিপূর্ণ বলে শনাক্ত করা যায় না।

### সংযোগ-নির্দিষ্ট প্রক্সিকে অগ্রাধিকার দিন

প্রভাবিত Gemini সংযোগের জন্য OmniRoute-এর [প্রতি-সংযোগ প্রক্সি কনফিগারেশন](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ব্যবহার করুন, তারপর একই model দিয়ে **সংযোগ পরীক্ষা করুন** এবং একটি ছোট অনুরোধ
পুনরায় চালান। এতে রাউটিং পরিবর্তনটি কেবল সেই সংযোগের মধ্যেই সীমাবদ্ধ থাকে। যাচাই করুন
যে প্রক্সিটি কনটেইনার থেকে অ্যাক্সেসযোগ্য এবং সংযোগটি সত্যিই সেটি নির্বাচন করছে।
রুট পরিবর্তন করলেই আপস্ট্রিমের আঞ্চলিক যোগ্যতা নিশ্চিত হয় না।

### হোস্ট এবং কনটেইনারের নেটওয়ার্কিং তুলনা করুন

প্রমাণীকৃত ফলাফল তুলনা করার সময় key, model এবং request একই রাখুন; কোনো issue-তে কখনোই
শংসাপত্র, প্রক্সি password বা সম্পূর্ণ authorization header পেস্ট করবেন না।
প্রথমে OS resolver কোন address family-গুলো প্রদান করে তা পরীক্ষা করুন; হোস্টে এবং
কনটেইনারের ভিতরে একই command ব্যবহার করুন:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute`-এর জায়গায় আপনি যে service চালান সেটি ব্যবহার করুন (উদাহরণস্বরূপ, `omniroute-web`)। এই
command-গুলো শংসাপত্র বা IP address ছাড়াই address family প্রিন্ট করে। ফেরত পাওয়া `6`
শুধু একটি IPv6 DNS ফলাফল নির্দেশ করে: এটি ব্যবহারযোগ্য IPv6 route বা API access প্রমাণ
করে **না**। যেখানে `curl` ইনস্টল করা আছে, সেখানে উভয় environment-এ
`curl -4 -I https://generativelanguage.googleapis.com` এবং
`curl -6 -I https://generativelanguage.googleapis.com` তুলনা করুন।
কোনো HTTP response সেই probe-এর সংযোগ প্রমাণ করে, এমনকি সেটি প্রমাণীকরণবিহীন
ত্রুটি হলেও; শুধু প্রমাণীকৃত model request-ই Gemini-এর যোগ্যতা পরীক্ষা করে।

### হোস্ট-স্তরের বিকল্প: কার্যকর IPv6 এবং resolver policy

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)-এর প্রতিবেদক container IPv6 সক্রিয়
করে এবং glibc address selection পরিবর্তন করে তাঁদের environment-এ access পুনরুদ্ধার
করেছিলেন। এটিকে environment-নির্দিষ্ট বিকল্প হিসেবে বিবেচনা করুন। Resolver preference
সমন্বয় করার আগে হোস্টের কার্যকর IPv6, container egress/routing এবং firewall rule
নিশ্চিত করুন। শুধু একটি private ULA address থাকাই public IPv6 connectivity প্রতিষ্ঠা করে না।

Compose-এর default network-এ ইতিমধ্যে যুক্ত service-গুলোর ক্ষেত্রে, এই fragment-টি
সেই network-এ IPv6 সক্রিয় করে; আপনার service, port, volume এবং configuration-এর বাকি অংশ অপরিবর্তিত রাখুন:

```yaml
networks:
  default:
    enable_ipv6: true
```

কোনো named network-এর ক্ষেত্রে, service-টি প্রকৃতপক্ষে যে network-এ যুক্ত হয় সেটিতে এটি সক্রিয় করুন। Docker
একটি ULA subnet বরাদ্দ করতে পারে; কেবল আপনার network-এর প্রয়োজন হলেই একটি স্পষ্ট,
overlap না-করা subnet নির্বাচন করুন। [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
এবং [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) দেখুন।

একটি **glibc-ভিত্তিক image**-এ `/etc/gai.conf` address selection পরিবর্তন করতে পারে। বর্তমান
repository Dockerfile Debian ব্যবহার করে; custom musl-ভিত্তিক image-গুলো এই mechanism
ব্যবহার করে না। প্রতিবেদন করা সমন্বয়টি ULA label-কে `label fc00::/7 6` থেকে
`label fc00::/7 1`-এ পরিবর্তন করে। Image-এর সম্পূর্ণ policy table দিয়ে শুরু করুন এবং এর অন্যান্য
entry সংরক্ষণ করুন: একটি `label` বা `precedence` entry যোগ করলে সেই default table প্রতিস্থাপিত হয়,
তাই শুধু পরিবর্তিত line-টি থাকা file যথেষ্ট নয়।
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
এই semantics নথিভুক্ত করে। পর্যালোচনা করা file-টি read-only অবস্থায় `/etc/gai.conf`-এ
bind-mount করুন এবং এটি প্রয়োগ করতে service-টি পুনরায় তৈরি করুন।

এটি সেই container-এর **সমস্ত বহির্গামী traffic-এর** জন্য OS address selection পরিবর্তন করে।
এটি প্রতিটি application-কে IPv6 বেছে নিতে বাধ্য করে না: Node-এর DNS order এবং connection
selection-ও গুরুত্বপূর্ণ। বিশেষ করে, `--dns-result-order=ipv4first` IPv4-কে অগ্রাধিকার দেয় এবং
শুধু IPv4-সংক্রান্ত ব্যর্থতার প্রতিকার নয়। [Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) দেখুন।

হোস্ট-স্তরের যেকোনো পরিবর্তনের পরে Gemini এবং আপনার অন্যান্য provider পুনরায় পরীক্ষা করুন। আগের অবস্থায় ফিরতে,
custom `gai.conf` mount সরিয়ে দিন, আগের network configuration পুনরুদ্ধার করুন এবং
maintenance window-এর সময় প্রভাবিত service/network পুনরায় তৈরি করুন। কোনো network পুনরায় তৈরি করলে
সেটিতে যুক্ত অন্যান্য container ব্যাহত হতে পারে; persistent data volume মুছবেন না।

## গুরুত্বপূর্ণ নোটসমূহ

- **SQLite WAL মোড:** `docker stop`-কে সম্পন্ন হওয়ার সুযোগ দিতে হবে, যাতে OmniRoute সর্বশেষ পরিবর্তনগুলো `storage.sqlite`-এ চেকপয়েন্ট করতে পারে। সঙ্গে দেওয়া Compose ফাইলগুলোতে ইতোমধ্যেই 40s-এর স্টপ গ্রেস পিরিয়ড নির্ধারিত আছে। আপনি যদি ইমেজটি সরাসরি চালান, তাহলে `--stop-timeout 40` বজায় রাখুন।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** নিয়মিত/লেখার-পূর্ববর্তী ব্যাকআপ বাহ্যিকভাবে পরিচালিত হলে এটিকে `true` হিসেবে সেট করুন। বিদ্যমান ডেটাবেসের মাইগ্রেশনের জন্য এখনও নিজস্ব টেকসই সুরক্ষা স্ন্যাপশট এবং গণ-মাইগ্রেশন সুরক্ষা ব্যবস্থা প্রয়োজন।
- **ডেটা স্থায়িত্ব:** কনটেইনার পুনরায় চালু হওয়ার পরও আপনার ডেটাবেস, কী এবং কনফিগারেশন সংরক্ষণ করতে সর্বদা `/app/data`-তে একটি ভলিউম মাউন্ট করুন।
- **পোর্ট কনফিগারেশন:** ডিফল্ট `20128` পোর্ট পরিবর্তন করতে `PORT` এনভায়রনমেন্ট ভেরিয়েবল ওভাররাইড করুন।

## আরও দেখুন

- [VM ডিপ্লয়মেন্ট নির্দেশিকা](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare সেটআপ
- [Fly.io ডিপ্লয়মেন্ট নির্দেশিকা](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-তে ডিপ্লয় করুন
- [এনভায়রনমেন্ট কনফিগারেশন](../reference/ENVIRONMENT.md) — সম্পূর্ণ `.env` রেফারেন্স
