# 🐳 Docker Guide — OmniRoute (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker-ის განთავსების სრული ცნობარი. სწრაფად დასაწყებად იხილეთ [README-ის Docker-ის სექცია](../README.md#-docker).

## სარჩევი

- [სწრაფი გაშვება](#quick-run)
- [გარემოს ფაილით](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ხელმისაწვდომი პროფილები](#available-profiles)
- [ჰოსტის CLI ხელსაწყოების კონფიგურაცია, როდესაც OmniRoute Docker-ში მუშაობს](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [საწარმოო Compose](#production-compose)
- [Dockerfile-ის ეტაპები](#dockerfile-stages)
- [კრიტიკული გარემოს ცვლადები](#critical-environment-variables)
- [Docker Compose Caddy-სთან ერთად (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare-ის სწრაფი გვირაბი](#cloudflare-quick-tunnel)
- [იმიჯის ტეგები](#image-tags)
- [ხელმისაწვდომობა: ნაგულისხმევი SQLite ერთრეპლიკიანია](#availability-default-sqlite-is-single-replica)
- [Gemini-ის რეგიონული შეცდომები Docker-ში](#gemini-regional-errors-inside-docker)
- [მნიშვნელოვანი შენიშვნები](#important-notes)

---

## სწრაფი გაშვება

> **თვითჰოსტინგი ერთი ბრძანებით?** იხილეთ
> [თვითჰოსტინგის სახელმძღვანელო](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (გამოქვეყნებული იმიჯი +
> Redis, მხოლოდ loopback-ზე, პროფილის არჩევის გარეშე). ქვემოთ მოცემული სწრაფი გაშვება
> ერთკონტეინერიანი გზაა იმ მომხმარებლებისთვის, რომლებსაც Redis უკვე სხვაგან აქვთ გაშვებული.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## გარემოს ფაილით

```bash
# ჯერ დააკოპირეთ და დაარედაქტირეთ .env
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
# საბაზისო პროფილი (CLI ხელსაწყოების გარეშე)
docker compose --profile base up -d

# CLI პროფილი (ჩაშენებული Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# ჰოსტის პროფილი (პირველ რიგში Linux-ისთვის; ჰოსტის CLI ბინარულ ფაილებს მხოლოდ წაკითხვის რეჟიმში ამონტაჟებს)
docker compose --profile host up -d

# ვებპროფილი (Chromium/Playwright ვებსესიის პროვაიდერებისთვის)
docker compose --profile web up -d

# CLI-ისა და CLIProxyAPI sidecar-ის გაერთიანება
docker compose --profile cli --profile cliproxyapi up -d
```

## ხელმისაწვდომი პროფილები

OmniRoute მთავარ განთავსების ვარიანტებისთვის Compose პროფილებით ვრცელდება. აირჩიეთ ის, რომელიც თქვენს გარემოს შეესაბამება.

| პროფილი               | სერვისი          | როდის გამოვიყენოთ                                                                                                                                                                  | ბრძანება                                     |
| --------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ნაგულისხმევი) | `omniroute-base` | ინტერფეისის გარეშე მომუშავე სერვერი / მინიმალური გაშვების გარემო, პროვაიდერების CLI-ები არ მოჰყვება                                                                                | `docker compose --profile base up -d`        |
| `cli`                 | `omniroute-cli`  | აგენტური სამუშაო პროცესები, რომლებიც იძახებენ `omniroute providers/setup/doctor`-სა და თანდართულ CLI-ებს (Codex, Claude Code, Droid, OpenClaw)                                     | `docker compose --profile cli up -d`         |
| `host`                | `omniroute-host` | Linux ჰოსტები, რომლებსაც სურთ ჰოსტის CLI-ებზე `network_mode`-ის მსგავსი წვდომა `~/.local/bin`, `~/.codex`, `~/.claude` და სხვა დირექტორიების მხოლოდ წაკითხვის რეჟიმში დამონტაჟებით | `docker compose --profile host up -d`        |
| `cliproxyapi`         | `cliproxyapi`    | გაუშვით [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar პორტზე `8317`, ზედა დონის CLI პროქსირებისთვის                                                          | `docker compose --profile cliproxyapi up -d` |
| `web`                 | `omniroute-web`  | ვებსესიის პროვაიდერები, რომლებსაც ბრაუზერი სჭირდებათ: `gemini-web`, `claude-web`, `claude-turnstile` (აგებს `runner-web`-ს, Chromium მოყვება)                                      | `docker compose --profile web up -d`         |

> შესაძლებელია რამდენიმე პროფილის გაერთიანება: `docker compose --profile cli --profile cliproxyapi up -d`.

## ჰოსტის CLI ხელსაწყოების კონფიგურაცია, როდესაც OmniRoute Docker-ში მუშაობს

`omniroute setup-codex`, `setup-claude`, `config set <tool>` და მართვის პანელის
**კონფიგურაციის შენახვა** ღილაკი ყველა წერს ისეთ ფაილებს, როგორიცაა `~/.codex/*.config.toml`. ამ გზებს
მნიშვნელობა მხოლოდ იმ მანქანაზე აქვს, სადაც CLI რეალურად მუშაობს. თუ მათ
კონტეინერის შიგნით გაუშვებთ, ჩაწერა მოხდება თავად კონტეინერის home დირექტორიაში (`/home/node` —
image მუშაობს `USER node`-ით), საიდანაც მას ჰოსტის არცერთი CLI არასდროს წაიკითხავს და სადაც ის
კონტეინერის ხელახლა შექმნისთანავე წაიშლება.

OmniRoute ამას აღმოაჩენს და ისეთი წარმატების შეტყობინების ნაცვლად, რომელსაც ვერ გამოიყენებთ,
ინსტრუქციებთან ერთად უარს ამბობს ჩაწერაზე: CLI სრულდება კოდით `2`, ხოლო API პასუხობს `422`-ით,
`containerEphemeralTarget: true` მნიშვნელობით.

### რეკომენდებულია: გაუშვით CLI ჰოსტზე, ხოლო OmniRoute — Docker-ში

კონტეინერი API-ს ემსახურება; CLI კი თქვენი ჰოსტის ხელსაწყოებს აკონფიგურირებს.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # მიუთითეთ CLI-ს კონტეინერი
omniroute setup-codex                      # ჩაწერს რეალურ ~/.codex-ს თქვენს ჰოსტზე
```

ეს სწორი არჩევანია, როდესაც Codex, Claude Code, Cursor ან მსგავსი ხელსაწყოები თქვენს
ლეპტოპზე მუშაობს — რაც ჩვეულებრივი კონფიგურაციაა.

### ალტერნატივა: ჰოსტის კონფიგურაციის დირექტორიების bind-mount (`host` პროფილი)

თუ გსურთ, რომ თავად კონტეინერმა ჩაწეროს თქვენი ჰოსტის კონფიგურაცია, დაამონტაჟეთ
დირექტორიები და `CLI_CONFIG_HOME`-ს მიუთითეთ mount-ის root დირექტორია. `host` პროფილი
ამას უკვე აკეთებს:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount არის ის, რაც გზას სანდოს ხდის: OmniRoute კითხულობს
`/proc/self/mountinfo`-ს და ჩაწერას უშვებს დამონტაჟებულ გზებში (ასევე იმ დირექტორიებში,
რომელთა შვილებიც mount-ებია, რაც ზუსტად ზემოთ ნაჩვენები `/host-home` სტრუქტურაა), ხოლო
დაუმონტაჟებელ გზებში ჩაწერაზე კვლავ უარს ამბობს.

### სათადარიგო გზა: კონტეინერის საკუთარი CLI-ების კონფიგურაცია (გამოიყენეთ იშვიათად)

როდესაც CLI-ები ნამდვილად კონტეინერის შიგნით მდებარეობს (`cli` პროფილი), ჩაწერა
განზრახულია. ნებისმიერ `setup-*` ბრძანებას გადასცით `--allow-container-write`, ან სერვერისთვის
დააყენეთ `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. ჩაწერა შესრულდება გაფრთხილებით,
რომ ის კონტეინერის არსებობის დასრულების შემდეგ არ შენარჩუნდება.

> **უსაფრთხოების გაფრთხილება — `cli` პროფილი + `docker.sock` mount.**
> `cli` პროფილი bind-mount-ით ამონტაჟებს `/var/run/docker.sock`-ს, რათა კონტეინერის შიგნით
> არსებულმა ავტომატურმა განმაახლებელმა ჰოსტის daemon-ის მეშვეობით stack ხელახლა შექმნას
> (`src/lib/system/autoUpdate.ts` ამოწმებს ამ socket-ის არსებობას და მისი
> არარსებობის შემთხვევაში Docker-ის გზას გამოტოვებს). ეს socket არის **ჰოსტის root დონის ნდობის
> საზღვარი**: ყველაფერს, რასაც მასთან წვდომა აქვს, შეუძლია ჰოსტის Docker daemon-ის
> root-ის უფლებებით მართვა — მას შეუძლია ჰოსტზე ნებისმიერი კონტეინერის შექმნა, შემოწმება,
> გაჩერება და წაშლა.
> შედეგები:
>
> 1. **არასოდეს გახადოთ `cli` პროფილის პორტი ქსელიდან ხელმისაწვდომი.** გამოაქვეყნეთ
>    ის `127.0.0.1`-ზე (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN-იდან ხელმისაწვდომი `cli` პროფილი მართვის პანელის დონის ნებისმიერ RCE-ს
>    ჰოსტის სრულ კომპრომეტირებად აქცევს.
> 2. **არ დაამონტაჟოთ ჰოსტის დამატებითი დირექტორიები `cli` პროფილში.**
>    Docker socket დამატებით ნებისმიერ mount-თან ერთად კონტეინერს თქვენს
>    ფაილურ სისტემასა და ჰოსტის კონფიგურაციაზე სრულ წაკითხვა/ჩაწერის წვდომას აძლევს. თუ ხელსაწყოს
>    პროექტის ნახვა სჭირდება, გაუშვით ის ლოკალურად CLI binary-ით — ნუ დაამონტაჟებთ მას
>    `cli` კონტეინერში.
>
> თუ კონტეინერის შიგნით ავტომატური განახლება არ გჭირდებათ, დატოვეთ `cli` პროფილი გამორთული
> (`COMPOSE_PROFILES=core,redis` ან უფრო მოკლე ვარიანტი). სხვა პროფილები
> Docker socket-ს არ ამონტაჟებს.
>
> MITM-თან დაკავშირებული საფრთხეების მოდელისთვის იხილეთ `docs/security/MITM-TPROXY-DECRYPT.md` (git; არ კომპილირდება `/docs`-ში),
> ხოლო `codex`/`claude-code`/`droid`/`openclaw` binary-ების წარმოშობის ჯაჭვისთვის —
> `docs/security/SUPPLY_CHAIN.md`.

## Redis Sidecar

OmniRoute იყენებს Redis-ს განაწილებული მოთხოვნების სიხშირის შემზღუდველისა და საზიარო ქეშის უზრუნველსაყოფად. `redis` სერვისი **ყოველთვის განსაზღვრულია** `docker-compose.yml`-ში (ის პროფილით არ იზღუდება) და ნებისმიერ სხვა პროფილთან ერთად იშვება.

| დეტალი                   | მნიშვნელობა                                   |
| ------------------------ | --------------------------------------------- |
| იმიჯი                    | `redis:7-alpine`                              |
| კონტეინერის სახელი       | `omniroute-redis`                             |
| შიდა პორტი               | `6379`                                        |
| ჰოსტის პორტი (გადაფარვა) | `REDIS_PORT` (ნაგულისხმევად `6379`)           |
| ჰოსტზე მიბმა (გადაფარვა) | `REDIS_BIND_HOST` (ნაგულისხმევად `127.0.0.1`) |
| ტომი                     | `omniroute-redis-data` → `/data`              |
| მდგომარეობის შემოწმება   | `redis-cli ping` (10-წამიანი ინტერვალი)       |

დაკავშირებული გარემოს ცვლადები:

- `REDIS_URL` — აპლიკაციაში გადაცემული კავშირის სტრიქონი (ნაგულისხმევად `redis://redis:6379`).
- `REDIS_PORT` — Redis-ის კონტეინერის ჰოსტის მხარეს პორტის მიბმა.
- `REDIS_BIND_HOST` — ჰოსტის ინტერფეისი, რომელზეც პორტი ქვეყნდება. ნაგულისხმევად `127.0.0.1`.

> **რატომ გამოიყენება ნაგულისხმევად loopback:** sidecar მუშაობს `requirepass`-ის გარეშე, ხოლო აპლიკაციის
> კონტეინერები მას compose-ის ქსელის (`redis:6379`) მეშვეობით უკავშირდებიან — გამოქვეყნებული პორტი
> მხოლოდ ჰოსტის მხარეს არსებული ხელსაწყოებისთვისაა (`redis-cli`, ლოკალური `npm run dev`). `0.0.0.0`-ზე
> გამოქვეყნება არაავთენტიფიცირებულ Redis-ს თქვენს LAN-ში არსებულ ყველა ჰოსტს გაუხსნიდა. თუ დააყენებთ
> `REDIS_BIND_HOST=0.0.0.0`-ს, სერვისის `command:`-საც დაამატეთ `--requirepass`.

**Redis-ის გამორთვა** რეკომენდებული არ არის (მოთხოვნების სიხშირის შემზღუდველი გადავა მეხსიერებაში მუშაობის სარეზერვო რეჟიმზე, რომლის შესაძლებლობებიც შეზღუდულია). აუცილებლობის შემთხვევაში, ან წაშალეთ/დააკომენტარეთ `redis:` სერვისის ბლოკი `docker-compose.yml`-ში, ან გაანულეთ მისი მასშტაბი:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

დეველოპმენტის გარემოს პარალელურად იზოლირებული საწარმოო სნეპშოტის გასაშვებად გამოიყენეთ `docker-compose.prod.yml`.

| დეტალი                    | მნიშვნელობა                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ფაილი                     | `docker-compose.prod.yml`                                                                                  |
| დაფის ნაგულისხმევი პორტი  | `PROD_DASHBOARD_PORT=20130` (მიბმულია შიდა `${DASHBOARD_PORT:-20128}`-ზე)                                  |
| API-ის ნაგულისხმევი პორტი | `PROD_API_PORT=20131`                                                                                      |
| იმიჯი                     | `omniroute:prod` (აგებულია `runner-cli` სამიზნიდან)                                                        |
| Redis-ის კონტეინერი       | `omniroute-redis-prod` (`redis:8.6.2`, გამოყოფილი `redis-prod-data` ტომი)                                  |
| მონაცემთა ტომი            | `omniroute-prod-data` (სახელდებული, ხელახლა აგებისას შენარჩუნებული)                                        |
| მდგომარეობის შემოწმებები  | `node healthcheck.mjs` + `redis-cli ping`, ხოლო `depends_on` დამოკიდებულია Redis-ის გამართულ მდგომარეობაზე |

გამოყენება:

```bash
# ააგეთ და გაუშვით საწარმოო სტეკი
docker compose -f docker-compose.prod.yml up -d --build

# ჟურნალების უწყვეტად ჩვენება
docker compose -f docker-compose.prod.yml logs -f

# გათიშეთ (ტომები შეინარჩუნეთ)
docker compose -f docker-compose.prod.yml down
```

საწარმოო სტეკი დეველოპმენტის compose-ის პარალელურად მუშაობს (განსხვავებული კონტეინერების სახელებით, პორტებითა და ტომებით), ამიტომ შეგიძლიათ ლოკალურად მუშაობა განაგრძოთ, სანამ საწარმოო გარემო გაშვებული რჩება.

## Dockerfile-ის ეტაპები

რეპოზიტორიას მოჰყვება მრავალეტაპიანი Dockerfile (`Dockerfile`). ხელმისაწვდომია ოთხი ეტაპი; თქვენი გამოყენების შემთხვევისთვის შესაბამისი `target` აირჩიეთ.

| ეტაპი         | საბაზისო იმიჯი        | დანიშნულება                                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | აყენებს დამოკიდებულებებს (`npm ci --legacy-peer-deps`) და უშვებს `npm run build`-ს (ნაგულისხმევად Turbopack — იხილეთ ქვემოთ „რესურსები აგების დროს“)                                                                                                                                                                       |
| `runner-base` | `node:26-trixie-slim` | საწარმოო გაშვების გარემო Next.js-ის ავტონომიური შედეგით. **პროვაიდერების CLI-ები არ მოჰყვება.**                                                                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | ამატებს `git`-ს, `docker.io`-ს, `docker-compose`-ს და გლობალურ CLI-ებს: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **აგენტური სამუშაო პროცესებისთვის ეს ვარიანტი აირჩიეთ.**                                                                                                                        |
| `runner-web`  | `runner-base`         | ამატებს Playwright-სა და Chromium ბრაუზერს (`--with-deps`) ვებსესიის პროვაიდერებისთვის: `gemini-web`, `claude-web`, `claude-turnstile`. **ეს ვარიანტი აირჩიეთ, თუ ამ პროვაიდერებს იყენებთ** — მის გარეშე ჩვეულებრივი იმიჯი მოთხოვნის დამუშავებისას მარცხდება (იხილეთ `-web`-ის შენიშვნა გამოშვების არხების განყოფილებაში). |

კონკრეტული სამიზნე ხელით ააგეთ:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### რესურსები აგების დროს

სამი აგების არგუმენტი განსაზღვრავს `builder` ეტაპის რესურსების ხარჯს. ისინი მხოლოდ აგების დროს მოქმედებს —
`OMNIROUTE_MEMORY_MB` (ქვემოთ) გაშვების დროის ცალკე პარამეტრია.

| აგების არგუმენტი            | ნაგულისხმევი | ეფექტი                                                                                                             |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` აგებას webpack-ით ასრულებს: პიკური მეხსიერება ნაკლებია, სიჩქარე — დაბალი. `1` რთავს Turbopack-ს.               |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | V8-ის heap-ის ზედა ზღვარი (`--max-old-space-size`) გაშვებული `next build`-ისთვის.                                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | მნიშვნელობას აწვდის `CIRCLE_NODE_TOTAL`-ს; გვერდის მონაცემების შეგროვებისთვის Next გამოითვლის `workers = N - 1`-ს. |

`OMNIROUTE_BUILD_WORKERS` არის პარამეტრი, რომელიც მძლავრ ამგებზე უნდა გაზარდოთ და
რომელიც უნდა შეამოწმოთ, როდესაც შეზღუდული რესურსების მქონე აგება **`✓ Compiled successfully`-ის შემდეგ** წყდება. გვერდის
მონაცემების თითოეული worker ცალკე პროცესია, ისევე როგორც თავად მშობელი `next build`;
რეალურ VPS-ზე ჩატარებულმა გამეორებითმა ტესტმა (issue #7518) თითოეული პროცესის პიკური RSS
~4.5 GB-ად გაზომა, `NODE_OPTIONS`-ის heap-ის ალმისგან დამოუკიდებლად (Turbopack კომპილაციას
V8 heap-ის გარეთ, ნატიურ/Rust მეხსიერებაში ასრულებს). ნაგულისხმევი მნიშვნელობა `2` (→ 1 worker, სულ 2
პროცესი) გათვლილია 16 GB / 4 vCPU GitHub-ის ჰოსტირებულ runner-ებზე, რომლებსაც
გამოქვეყნების pipeline იყენებს. `8`-ის შემთხვევაში (→ 7 worker) ამ runner-ს მეხსიერება ამოეწურა და
buildkit-მა ეტაპი დაასრულა შეცდომით `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 worker) მაინც არ ეტეოდა, როდესაც თითოეული პროცესის RSS პირდაპირ გაიზომა
და არა ირიბად განისაზღვრა. `tests/unit/docker-build-memory-budget.test.ts`
გაზომილი მნიშვნელობის საფუძველზე ასრულებს გამოთვლებს და მარცხდება, თუ რომელიმე პარამეტრი
runner-ის შესაძლებლობებს გადააჭარბებს.

Turbopack კომპილაციას ასრულებს ნატიურ Rust მეხსიერებაში, რომელიც V8 heap-ის **გარეთაა**, ამიტომ
`OMNIROUTE_BUILD_MEMORY_MB` მას არ ზღუდავს. მეხსიერების ლიმიტის მქონე ჰოსტზე
აგების პროცესს OOM killer ყოველგვარი შეცდომის ტექსტის გარეშე SIGKILL სიგნალით წყვეტს — ის უბრალოდ
ჩერდება `Creating an optimized production build`-ის შუაში, რაც მეხსიერების
ამოწურვის ნაცვლად გაჭედვას ჰგავს. სწორედ ამიტომ `Dockerfile` ნაგულისხმევად webpack-ს
იყენებს (`OMNIROUTE_USE_TURBOPACK=0`), განსხვავებით `npm run dev` / `npm run build`-ისგან, სადაც
კოდში ნაგულისხმევი ვარიანტი Turbopack-ია: აგების არგუმენტების გარეშე შესრულებული უბრალო `docker build .`
(რასაც Railway და სხვა ერთი დაწკაპუნებით გასაშვები ჰოსტები ასრულებენ) მეხსიერებაშეზღუდულ
ამგებზე უხმოდ არ უნდა შეწყდეს. გამოქვეყნებული იმიჯები `docker-publish.yml`-ში
უკვე ცალსახად გადასცემენ `OMNIROUTE_USE_TURBOPACK=0`-ს. საკმარისი RAM-ის მქონე ამგებზე უფრო
სწრაფი აგებისთვის ჩართეთ Turbopack:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ჩართულია, ამიტომ `next build` უშვებს როგორც მშობელ, **ასევე** worker
პროცესს და თითოეული მათგანი ცალ-ცალკე ითვალისწინებს `OMNIROUTE_BUILD_MEMORY_MB`-ს. კონტეინერის
ლიმიტი დააყენეთ დაახლოებით ამ მნიშვნელობის ორმაგზე მეტი და არა ერთმაგზე.

ამ კოდის ხეზე გაზომილი შედეგები (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| შემკვრელი | კონტეინერის ლიმიტი | შედეგი                                 |
| --------- | ------------------ | -------------------------------------- |
| Turbopack | 8 GiB / 16 GiB     | ორივე შემთხვევაში OOM-ით შეწყდა, უხმოდ |
| webpack   | 8 GiB              | აგების worker SIGKILL-ით შეწყდა        |
| webpack   | 12 GiB             | წარმატებით დასრულდა, პიკი — 11.1 GiB   |

### გაშვების დროის ნაგულისხმევი პარამეტრები

`runner-base`-ის მიერ ექსპორტირებული ნაგულისხმევი მნიშვნელობები: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

მეხსიერების ქცევა Docker-ში:

- იმიჯი ადგენს `OMNIROUTE_MEMORY_MB=1024`-ს და მისგან გამოითვლის `NODE_OPTIONS=--max-old-space-size=1024`-ს.
- სერვერის ფაქტობრივ პროცესს standalone გამშვები იწყებს, რომელიც კითხულობს `OMNIROUTE_MEMORY_MB`-ს და ამატებს `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`-ს.
- Node იყენებს ბოლოს გამეორებულ `--max-old-space-size` მნიშვნელობას, ამიტომ `OMNIROUTE_MEMORY_MB`-ის დაყენება Docker-ის heap-ის ეფექტურ ლიმიტს აკონტროლებს.
- რადგან იმიჯი მას ყოველთვის ადგენს, გამშვების საკუთარი, RAM-ის მიხედვით დაკალიბრებული სარეზერვო მნიშვნელობა Docker-ში არასოდეს გამოიყენება. დატვირთვისთვის ის ცალსახად გაზარდეთ (იხილეთ ქვემოთ მოცემული ცხრილი). `2048` მაინც ძალიან მცირეა coding-agent-ის `/v1/responses` მოთხოვნებისთვის.

### სამუშაო RAM coding agent-ებისთვის

Docker-ის ნაგულისხმევი 1 GiB dashboard-ისა და მსუბუქი ჩატის მინიმუმია და არა საწარმოო გარემოსთვის განკუთვნილი ზომა. გრძელი `POST /v1/responses` მოთხოვნის სხეულები (ასობით შეტყობინება, ათობით ხელსაწყო) შეკუმშვისას მეხსიერებაში რამდენიმე გრაფს ინარჩუნებს. ორმა ერთმანეთზე გადაფარულმა ~3 MiB / ~750k-token მოთხოვნამ V8-ის ავარიული შეწყვეტა გამოიწვია **12 GiB** old-space-ზე (`FATAL ERROR: Reached heap limit`) და ასევე მიაღწია 16 GiB cgroup-ის OOM ლიმიტს. იხილეთ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

cgroup-ის **`--memory` heap-ზე მაღლა დააყენეთ** — native ბუფერები, SQLite და შეკუმშვის შუალედური მონაცემები V8-ის ფარგლებს გარეთაა განთავსებული.

| დატვირთვა                               | `OMNIROUTE_MEMORY_MB`                    | კონტეინერი / cgroup     | შენიშვნები                                                                                                                                           |
| --------------------------------------- | ---------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, ერთი მსუბუქი ჩატი            | `1024` (იმიჯის ნაგულისხმევი მნიშვნელობა) | ≥2 GiB                  |                                                                                                                                                      |
| ერთი coding agent (Claude/Codex/Grok)   | `8192`                                   | ≥10 GiB                 | ტიპური ერთსესიანი `/v1/responses`                                                                                                                    |
| ორი ერთდროული გრძელი `/v1/responses`    | `10240`–`12288`                          | ≥12–16 GiB              | გაზომვისას V8 ავარიულად შეწყდა ~12 GiB heap-ზე                                                                                                       |
| სამი ან მეტი ერთდროული გრძელი კონტექსტი | ერთ პროცესზე არ გამოიყენოთ               | სერიალიზაცია / მეტი RAM | ნაგულისხმევად მძიმე მოთხოვნებისთვის დაშვებულია 1 მიმდინარე მოთხოვნა; საკმარისი RAM-ის გარეშე ამ რაოდენობის გაზრდა ავარიულ შეწყვეტას კვლავ გამოიწვევს |

`omniroute serve` bare metal გარემოში RAM-ის ~35%-ს აკალიბრებს (დიაპაზონში `[512, 4096]`), როდესაც `OMNIROUTE_MEMORY_MB` **დაყენებული არ არის**. Docker ყოველთვის ადგენს `1024`-ს, ამიტომ ოფიციალურ იმიჯში ეს კალიბრაცია არასოდეს სრულდება.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## კრიტიკული გარემოს ცვლადები

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-ში აღწერილი ნაგულისხმევი პარამეტრების გარდა, Docker-ში გაშვებისას ყველაზე მნიშვნელოვანია შემდეგი ცვლადები:

| ცვლადი                        | დანიშნულება                                                                                                                                                                                                                                                                  | ნაგულისხმევი მნიშვნელობა          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket-ხიდის საზიარო საიდუმლო გასაღები. **აუცილებელია საწარმოო გარემოში** — მიუთითეთ ძლიერი შემთხვევითი სტრიქონი.                                                                                                                                                         | არ არის მითითებული (სავალდებულოა) |
| `REDIS_URL`                   | სიჩქარის შემზღუდველთან / ქეშის ბეკენდთან დასაკავშირებელი სტრიქონი                                                                                                                                                                                                            | `redis://redis:6379`              |
| `REDIS_PORT`                  | ჰოსტის მხარის პორტი ჩაშენებული Redis-კონტეინერისთვის                                                                                                                                                                                                                         | `6379`                            |
| `REDIS_BIND_HOST`             | ჰოსტის ინტერფეისი, რომელზეც ქვეყნდება ჩაშენებული Redis-ის პორტი (ლოკალური უკუკავშირის ინტერფეისი, თუ AUTH-ს არ დაამატებთ)                                                                                                                                                    | `127.0.0.1`                       |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ჰოსტის ბილიკი, რომელიც თვითგანახლების სამუშაო პროცესებისთვის `cli` პროფილში `/workspace/omniroute`-ზე მონტაჟდება                                                                                                                                                             | `.` (მიმდინარე დირექტორია)        |
| `OMNIROUTE_MEMORY_MB`         | Docker-ის დამოუკიდებელი სერვერისთვის Node-ის გროვის ზედა ზღვარი გაშვებისას; გადაფარავს ზემოთ მოცემულ იმიჯის ნაგულისხმევ მნიშვნელობას. კოდირების აგენტებისთვის: `8192`+ (იხილეთ [ოპერატიული მეხსიერება გაშვებისას](#runtime-ram-for-coding-agents)).                          | `1024`                            |
| `DASHBOARD_PORT` / `API_PORT` | გადაფარავს გამოქვეყნებულ პორტებს მართვის პანელისთვის (20128) და API-სთვის (20129)                                                                                                                                                                                            | `20128` / `20129`                 |
| `APP_BIND_HOST`               | ჰოსტის ინტერფეისი, რომელზეც docker-compose აქვეყნებს მართვის პანელის/API/live-WS პორტებს. როდესაც `REQUIRE_API_KEY=false` (ნაგულისხმევი მნიშვნელობაა), `0.0.0.0` ანონიმურ `/v1` პროქსის LAN-ში ხსნის — გააფართოეთ მხოლოდ `REQUIRE_API_KEY=true`-ით ან წინ მდგომი უკუპროქსით. | `127.0.0.1`                       |
| `CLIPROXY_BIND_HOST`          | ჰოსტის ინტერფეისი, რომელზეც docker-compose აქვეყნებს `cliproxyapi` თანმხლებ კონტეინერს — მის მონაცემთა ტომში ინახება პროვაიდერის ავტორიზაციის მონაცემები.                                                                                                                    | `127.0.0.1`                       |
| `OMNIROUTE_PLUGINS_DIR`       | დირექტორია, რომელსაც გაშვების გარემოს დანამატების სკანერი კითხულობს და რომელშიც დანამატებს აყენებს. მიუთითეთ იგი, როდესაც დანამატები bind-მონტაჟითაა მიერთებული: ნაგულისხმევი მნიშვნელობა მიჰყვება `HOME`-ს, რომლის ექსპორტირებაც იმიჯმა შეიძლება არ მოახდინოს.              | `~/.omniroute/plugins`            |
| `OMNIROUTE_BASE_PATH`         | URL-ის ქვებილიკი, როდესაც აპი უკუპროქსის უკან ქვეყნდება (მაგ. `/omniroute`)                                                                                                                                                                                                  | _(ცარიელი = ძირეული)_             |
| `NEXT_PUBLIC_BASE_URL`        | ბრაუზერის საჯარო წყარო ქვებილიკის ჩათვლით (მაგ. `https://host/omniroute`)                                                                                                                                                                                                    | არ არის მითითებული                |
| `PROD_DASHBOARD_PORT`         | ჰოსტის მხარის მართვის პანელის პორტი `docker-compose.prod.yml`-ისთვის                                                                                                                                                                                                         | `20130`                           |
| `CLIPROXYAPI_PORT`            | ჰოსტის მხარის პორტი `cliproxyapi` თანმხლები კონტეინერისთვის                                                                                                                                                                                                                  | `8317`                            |

## უკუ პროქსი ქვეფილურ გზაზე (Traefik / nginx)

Next.js-ის `basePath` კომპილირდება standalone-პაკეტში. OmniRoute ჩაშენებულ
მნიშვნელობას აპლიკაციის ძირეულ დირექტორიაში არსებულ საკონტროლო ფაილში ინახავს (`npm run build`-ის დროს იწერება; მას
`scripts/docker/ensure-docker-base-path.mjs` კითხულობს) და კონტეინერის გაშვებისას
`OMNIROUTE_BASE_PATH`-ს ადარებს. როდესაც ისინი განსხვავდება და image
დომენის ძირეული გზისთვისაა აგებული, entrypoint ხელახლა წერს standalone manifest-ებს,
ჩაშენებულ `basePath`/`assetPrefix` ლიტერალებს (Next 16 SSR რესურსების URL-ებს მხოლოდ
`assetPrefix`-იდან აგენერირებს — patcher მასში ქვეფილურ გზასაც ასახავს), ჩაშენებულ
`/_next/static` რესურსების URL-ებს (client-reference manifest-ები, მედიის import-ები, წინასწარ დარენდერებული
შეცდომის გვერდები) და კლიენტის `process.env` shim-ს, სანამ `node dev/run-standalone.mjs`
გაეშვება.

### Compose-ით აგება (რეკომენდებული)

ორივე ცვლადი დააყენეთ `.env`-ში, შემდეგ ხელახლა ააგეთ, რათა image-ისა და runtime-ის პარამეტრები ერთმანეთს ემთხვეოდეს:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` გადასცემს `OMNIROUTE_BASE_PATH`-ს როგორც Docker-ის build-arg-ს და როგორც
runtime გარემოს ცვლადს.

### წინასწარ აგებული ძირეული image + runtime ქვეფილური გზა

გამოქვეყნებული `diegosouzapw/omniroute:*` image-ები დომენის ძირეული გზისთვისაა აგებული. ამის მიუხედავად,
შეგიძლიათ `OMNIROUTE_BASE_PATH` runtime-ის დროს დააყენოთ; კონტეინერი გაშვებისას პაკეტს ერთხელ დააპატჩავს.
მასთან ერთად მიუთითეთ შესაბამისი საჯარო origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

უკუ პროქსი ისე დააკონფიგურირეთ, რომ **სრული** გარე გზა გადაამისამართოს (პრეფიქსი არ მოაშოროთ).
Traefik-მა `PathPrefix(`/omniroute`)` კონტეინერისკენ
`StripPrefix`-ის გარეშე უნდა მარშრუტიზოს, რათა Next.js-მა მიიღოს `/omniroute/...` და რესურსები
`/omniroute/_next/...`-დან მოემსახუროს.

Docker-ის healthcheck ამოწმებს მსუბუქ `/healthz` სასიცოცხლო ციკლის endpoint-ს, რომელსაც წინ
აქტიური `OMNIROUTE_BASE_PATH` ერთვის. `/api/monitoring/health` კვლავ ხელმისაწვდომია
ადამიანის მიერ ან dashboard-იდან დიაგნოსტიკისთვის; კონტეინერის HEALTHCHECK-ის მისკენ კვლავ მისამართებისთვის (მაგალითად,
ღრმა ჯანმრთელობის შემოწმების უზრუნველსაყოფად), დააყენეთ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
ეს გზა **ღრმა** შემოწმებაა (DB + მონიტორინგის შეჯამება) — გამოსადეგია Docker-ის
იშვიათი `HEALTHCHECK`-ისთვის, თუ მის გამოყენებას კვლავ აირჩევთ, მაგრამ **არა** Kubernetes-ის `livenessProbe`-ის
ინტერვალებისთვის.

ორკესტრატორებისთვის (Kubernetes, Nomad და სხვ.):

| შემოწმება           | უპირატესობა მიანიჭეთ                                                     | მოერიდეთ                                                            |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| სიცოცხლისუნარიანობა | HTTP `GET /livez`, ან TCP ძირითად პორტზე (`PORT`, ნაგულისხმევად `20128`) | `/api/monitoring/health`-ს სიცოცხლისუნარიანობის შესამოწმებლად       |
| მზადყოფნა           | HTTP `GET /healthz`                                                      | მოკლე timeout-ებს, რომლებიც დატვირთულ event loop-ს მკვდრად მიიჩნევს |
| ღრმა / blackbox     | `/api/monitoring/health`                                                 | —                                                                   |

`/healthz` პროცესის სასიცოცხლო ციკლის მდგომარეობას აბრუნებს (`ok` / `starting` / `stopping`). `/livez`
მხოლოდ პროცესის სიცოცხლეს ამოწმებს (200-ს აბრუნებს ყოველთვის, როდესაც handler-ს შესრულება შეუძლია; ის
მზადყოფნას არ ელოდება). ორივე მაინც იმავე Node event loop-ზე მუშაობს, რომელზეც მოთხოვნები მუშავდება, ამიტომ
CPU-ზე ინტენსიურმა კატალოგის ან შეკუმშვის სამუშაოებმა შეიძლება ისინი შეაფერხოს — დატვირთული ≠ მკვდარი. თუ HTTP
შემოწმებებს timeout ეწურება, უპირატესობა TCP სიცოცხლისუნარიანობის შემოწმებას მიანიჭეთ. შემოწმებების სრული სახელმძღვანელო:
[მონიტორინგის სახელმძღვანელო — Kubernetes-ის შემოწმებების რეკომენდაციები](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose Caddy-სთან ერთად (HTTPS Auto-TLS)

OmniRoute-ის უსაფრთხოდ გამოქვეყნება შესაძლებელია Caddy-ის მიერ SSL-ის ავტომატური მომართვის გამოყენებით. დარწმუნდით, რომ თქვენი დომენის DNS A ჩანაწერი თქვენი სერვერის IP მისამართზე მიუთითებს.

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
      # ბრაუზერისთვის განკუთვნილი წყარო OAuth-ის უკუგამოძახებებისთვის, მართვის პანელის ბმულებისა და გენერირებული საჯარო URL-ებისთვის.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # შიდა სერვერიდან სერვერზე URL დაგეგმილი ამოცანებისთვის / საკუთარ თავთან მოთხოვნებისთვის.
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

Caddy ზემდგომი კონტეინერისთვის გადამისამართების სტანდარტულ სათაურებს აყენებს. OmniRoute
`NEXT_PUBLIC_BASE_URL`-ს იყენებს, როგორც კანონიკურ საჯარო წყაროს OAuth-ის უკუგამოძახებებისა და გენერირებული საჯარო
ბმულებისთვის; ავთენტიფიცირებული მართვის პანელის ჩაწერის ოპერაციები იყენებს იმავე წყაროს მოთხოვნებს სესიაზე მიბმულ CSRF
დაცვასთან ერთად. `OMNIROUTE_TRUST_PROXY` ჩართეთ მხოლოდ გაფართოებული განთავსებებისთვის, სადაც განზრახ
გსურთ, რომ OmniRoute-მა საჯარო წყარო მკაფიო კონფიგურაციის ნაცვლად სანდო გადამისამართების სათაურებიდან განსაზღვროს.

## Cloudflare Quick Tunnel

Docker-ის განთავსებებისთვის მართვის პანელის მხარდაჭერა მოიცავს ერთი დაწკაპუნებით ჩასართავ **Cloudflare Quick Tunnel**-ს გვერდზე `Dashboard → Endpoints`. პირველად ჩართვისას `cloudflared` ჩამოიტვირთება მხოლოდ საჭიროების შემთხვევაში, გაეშვება დროებითი გვირაბი თქვენი მიმდინარე `/v1` საბოლოო წერტილისკენ და გენერირებული `https://*.trycloudflare.com/v1` URL პირდაპირ თქვენი ჩვეულებრივი საჯარო URL-ის ქვემოთ გამოჩნდება.

საბოლოო წერტილის გვირაბების პანელების (Cloudflare, Tailscale, ngrok) ჩვენება ან დამალვა შესაძლებელია `Settings → Appearance`-დან, აქტიური გვირაბის მდგომარეობის შეუცვლელად.

### შენიშვნები გვირაბის შესახებ

- Quick Tunnel-ის URL-ები დროებითია და ყოველი გადატვირთვის შემდეგ იცვლება.
- Quick Tunnel-ები OmniRoute-ის ან კონტეინერის გადატვირთვის შემდეგ ავტომატურად არ აღდგება. საჭიროების შემთხვევაში ისინი მართვის პანელიდან ხელახლა ჩართეთ.
- მართული ინსტალაცია ამჟამად მხარს უჭერს Linux-ს, macOS-სა და Windows-ს `x64` / `arm64` არქიტექტურებზე.
- მართული Quick Tunnel-ები ნაგულისხმევად HTTP/2 ტრანსპორტს იყენებს, რათა რესურსებით შეზღუდულ საკონტეინერო გარემოებში QUIC UDP ბუფერთან დაკავშირებული ხმაურიანი გაფრთხილებები აიცილოს თავიდან. თუ სხვა ტრანსპორტის გამოყენება გსურთ, დააყენეთ `CLOUDFLARED_PROTOCOL=quic` ან `auto`.
- Docker-ის იმიჯები შეიცავს სისტემურ CA ძირეულ სერტიფიკატებს და მათ მართულ `cloudflared`-ს გადასცემს, რაც გვირაბის კონტეინერში საწყისი გაშვებისას TLS ნდობასთან დაკავშირებულ შეცდომებს თავიდან აცილებს.
- თუ გსურთ, რომ OmniRoute-მა ჩამოტვირთვის ნაცვლად არსებული ბინარული ფაილი გამოიყენოს, დააყენეთ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## იმიჯის ტეგები

| იმიჯი                    | ტეგი     | ზომა   | აღწერა                                                              |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | ყველაზე მაღალი **გამოქვეყნებული** სტაბილური SemVer (არა git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps-ისთვის დააფიქსირეთ ამ კლასის ტეგი                            |

მრავალპლატფორმიანი მანიფესტი: `linux/amd64` + `linux/arm64` ნატიურად (Apple Silicon, AWS Graviton, Raspberry Pi). Docker შესაბამის არქიტექტურას ავტომატურად ირჩევს; თუ ARM ჰოსტებზე AMD64 ემულაციის იძულებით გამოყენება გჭირდებათ, მიუთითეთ `--platform linux/amd64`.

### გამოშვების არხები

OmniRoute აქვეყნებს Docker-ის ცალკეულ არხებს სტაბილური გამოშვებებისთვის, აქტიური გამოშვების განშტოების ტესტირებისა და დეველოპერული ანაწყობებისთვის.

| არხი                            | წყარო                                              | ცვალებადობა                                | რეკომენდებული გამოყენება                                                                                                                     |
| ------------------------------- | -------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | ხელმოწერილი/ვერსიონირებული გამოშვება               | უცვლელი                                    | საწარმოო განთავსებები, რომლებიც ზუსტ გამოშვებას აფიქსირებს                                                                                   |
| `:latest` / `:latest-web`       | ყველაზე მაღალი **გამოქვეყნებული** სტაბილური SemVer | ცვალებადი სტაბილური მაჩვენებელი            | მიჰყვება სტაბილურ გამოშვებებს **SemVer-ის გამოქვეყნების ამოცანის შემდეგ** — **არ** მიჰყვება `main`-ს ან გამოუქვეყნებელ `release/v*` კომიტებს |
| `:next` / `:next-web`           | მიმდინარე ნაგულისხმევი `release/v*` განშტოება      | ცვალებადი წინასწარი გამოშვების მაჩვენებელი | იმ შესწორებების ტესტირება, რომლებიც აქტიურ გამოშვების განშტოებაში მოხვდა, მაგრამ ჯერ სტაბილურ გამოშვებაში არ არის                            |
| `:main` / `:main-web`           | `main` განშტოება                                   | ცვალებადი დეველოპერული მაჩვენებელი         | მხოლოდ დეველოპმენტისა და ინტეგრაციის ტესტირებისთვის                                                                                          |

#### ვებსესიის პროვაიდერები: `-web` იმიჯები

ზემოთ მოცემულ თითოეულ არხს ასევე აქვს `-web` ტეგი (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), რომელიც აგებულია `runner-web` ეტაპიდან — იგივე იმიჯი Playwright-ისა და Chromium ბრაუზერის დამატებით. ჩვეულებრივი იმიჯი Chromium-ის **გარეშე** ვრცელდება; ის საჭიროა `gemini-web`, `claude-web` და `claude-turnstile`-ისთვის.

შეცდომა ჩნდება მოგვიანებით და არა გაშვებისას: ეს პროვაიდერები მართვის პანელში თავიანთ მოდელებს ჩამოთვლის და დაკავშირებულად გამოჩნდება, ხოლო მხოლოდ პირველი მოთხოვნა დასრულდება შემდეგი შეცდომით

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

თუ ამ პროვაიდერებს იყენებთ, ჩამოტვირთეთ იმ არხის `-web` ტეგი, რომელზეც უკვე იმყოფებით — სხვა არაფერი იცვლება. npm/CLI ინსტალაციის შემთხვევაში (Docker-ის იმიჯის გარეშე), შესაბამისი გამოტოვებული კომპონენტი ბრაუზერის ბინარული ფაილია: ჰოსტზე გაუშვით `npx playwright install chromium`.

#### წინასწარი გამოშვების არხის გამოყენება

`next` არხი თავიდან იგება მიმდინარე ნაგულისხმევ `release/v*` ბრენჩზე ყოველი push-ისას და ქვეყნდება როგორც AMD64-ისთვის, ისე ARM64-ისთვის. ძველი მხარდაჭერის ბრენჩები მას ვერ გადააწერენ. არხი გთავაზობთ ჩამოსატვირთ image-ს იმ შესწორებებით, რომლებიც აქტიურ release ბრენჩში შემდეგი სტაბილური tag-ის შექმნამდე გაერთიანდა.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-ისთვის გადააწერეთ არჩეული პროფილის მიერ გამოყენებული image-ის tag, შემდეგ ჩამოტვირთეთ და ხელახლა შექმენით სერვისი:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### უსაფრთხოება და წინა ვერსიაზე დაბრუნება

`next` არის ცვალებადი წინასწარი გამოშვების არხი. ის შეიძლება შეიცვალოს აქტიურ release ბრენჩზე ნებისმიერი push-ისას და **არ არის მხარდაჭერილი საწარმოო გარემოში გამოსაყენებლად**. კონკრეტული build-ის შეფასებისას დააფიქსირეთ image-ის digest:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ტესტირებამდე შექმენით OmniRoute-ის მონაცემთა volume-ის ან bind-mounted მონაცემთა დირექტორიის სარეზერვო ასლი. წინა ვერსიაზე დასაბრუნებლად აღადგინეთ მანამდე გამოყენებული სტაბილური ვერსია ან digest და ხელახლა შექმენით კონტეინერი:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release ბრენჩის build ვერასოდეს გადაადგილებს `latest`-ს; სტაბილური მაჩვენებლის წინ წაწევა მხოლოდ შესაბამის სტაბილურ სემანტიკურ ვერსიას შეუძლია. `next` image-ები ინარჩუნებს release image-ის შემოწმებას და ბლოკირების მექანიზმს CRITICAL დონის მოწყვლადობებისთვის.

**`latest` არ იძლევა git-თან აქტუალურობის გარანტიას.** `main`-ში ან აქტიურ `release/v*` ბრენჩში გაერთიანებული შესწორებები **არ შედის** `:latest`-ში, სანამ სტაბილური SemVer image არ გამოქვეყნდება და გამოქვეყნების job არ განაახლებს `:latest`-ს (იმავე digest-ით, რაც ამ SemVer-ს აქვს). თუ `latest` გაყინული ჩანს, მაშინ როცა GitHub-ზე შესწორება უკვე ჩანს, release ბრენჩის შესამოწმებლად ჩამოტვირთეთ `:next` ან დაელოდეთ SemVer tag-ს.

| თქვენი მიზანი                                                                          | გამოიყენეთ                                |
| -------------------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps / საწარმოო გარემო, რომელიც არ უნდა გადაიხაროს                                   | დააფიქსირეთ `:X.Y.Z` (ან image-ის digest) |
| მიჰყვეთ გამოქვეყნებულ სტაბილურ ვერსიებს და დაეთანხმოთ ყოველ release-ზე ხელახლა შექმნას | `:latest`                                 |
| შეამოწმოთ გამოუშვებელი `release/v*` commit-ები                                         | `:next` (არა საწარმოო გარემოსთვის)        |
| შეამოწმოთ `main`                                                                       | `:main` (არა საწარმოო გარემოსთვის)        |

## ხელმისაწვდომობა: ნაგულისხმევი SQLite ერთ რეპლიკაზე მუშაობს

სტანდარტული Docker / Kubernetes OmniRoute არის **ერთი Node პროცესი + ერთი SQLite ჩამწერი**. ამ ტოპოლოგიაზე მაღალი ხელმისაწვდომობა **მხარდაჭერილი არ არის**.

| შეზღუდვა                                                    | შედეგი                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ერთი ჩამწერი                                                | **არ გაუშვათ** რამდენიმე რეპლიკა ერთი და იმავე SQLite ფაილის გამოყენებით. ეს მონაცემთა ბაზას დააზიანებს.                                                                                                                                                                                                                                                                                         |
| ხელახლა შექმნა / გადატვირთვა / HEALTHCHECK-ის მიერ შეწყვეტა | შესრულების პროცესში მყოფი SSE კავშირების, მართვის პანელის სესიებისა და მეხსიერებაში არსებული მდგომარეობის **სრული გათიშვა**. ყველა დაკავშირებული კლიენტი ითიშება. ცარიელი endpoint-ის პერიოდის განმავლობაში ახალი მოთხოვნები იღებს reverse-proxy-ის **`502 Bad Gateway: Unknown error`** პასუხს და არა OmniRoute JSON-ს — კლიენტები ამას პროვაიდერის გაუმართაობისგან ვერ განასხვავებენ (#11015). |
| იგივე event loop, რასაც `/healthz` იყენებს                  | დატვირთულმა კატალოგმა ან შეკუმშვის ციკლმა შეიძლება შემოწმებები შეაყოვნოს; მოკლე timeout-ის შემთხვევაში კი **ერთადერთი** რეპლიკა გადაიტვირთება.                                                                                                                                                                                                                                                   |

**შემოწმებების მატრიცა** (ასევე იხილეთ [Kubernetes-ის შემოწმებების რეკომენდაციები](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| შემოწმება                     | სამიზნე                                                         | არ გამოიყენოთ                                                          |
| ----------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| სიცოცხლისუნარიანობა           | TCP `PORT`-ზე (ნაგულისხმევად `20128`), ან რბილი HTTP `/healthz` | `/api/monitoring/health`                                               |
| მზადყოფნა                     | HTTP `GET /healthz`                                             | მკაცრი timeout-ები, რომლებიც დატვირთულ event loop-ს გათიშულად მიიჩნევს |
| სიღრმისეული / ადამიანებისთვის | `/api/monitoring/health`                                        | kubelet-ის ავტომატიზებული სიცოცხლისუნარიანობის შემოწმება               |

**განახლებები:** გაითვალისწინეთ, რომ ყველა სესია გაითიშება. თუ შესაძლებელია, კლიენტების კავშირები თანდათანობით დაასრულეთ; ნაგულისხმევ SQLite-ზე rolling update არ არსებობს. Compose-ის `restart: unless-stopped` და Docker-ის `HEALTHCHECK` ასევე ჩაანაცვლებს ერთადერთ პროცესს, როდესაც კონტეინერის მდგომარეობა Unhealthy გახდება — ზემოქმედების არეალი იგივეა.

Kubernetes-ის ფრაგმენტი **ერთი რეპლიკისთვის** (Recreate სავალდებულოა; ერთი SQLite ფაილის გამოყენებისას `replicas` არ გაზარდოთ):

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

`preStop`-ის დაყოვნება საშუალებას აძლევს kube-ს, SIGTERM-მდე Service-ის endpoint-ები ამოიღოს, რათა **ახალი** ტრაფიკი აღარ მოხვდეს პროცესში, რომელიც ითიშება. შესრულების პროცესში მყოფი `/v1/responses` SSE კავშირების დასრულებას heavyweight admission leases-ის საშუალებით (#11015) მაქსიმუმ `SHUTDOWN_TIMEOUT_MS` დრო (ნაგულისხმევად 30 წმ) ეძლევა. ახალი მოთხოვნები, რომლებიც კვლავ აღწევს პროცესამდე, იღებს `503` + `Retry-After: 5` პასუხს. Recreate-ის დროს, ჩანაცვლების Ready მდგომარეობაში გადასვლამდე არსებული ცარიელი endpoint-ის შუალედი კვლავ სრულ გათიშვად რჩება — ეს SQLite-ის ტოპოლოგიის შედეგია და არა შემოწმების არასწორი კონფიგურაცია.

გარე Postgres / multi-writer HA **არ არის** დოკუმენტირებული სტანდარტული გზა. თუ HA გჭირდებათ, შეინარჩუნეთ ერთი რეპლიკა ან გამოიყენეთ ტოპოლოგია, რომელიც პროექტმა ცალკე გამოსცადა და დაადოკუმენტირა. Postgres/MySQL-ზე მუშაობა მიმდინარეობს [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-ში. მის გამოშვებამდე **დიდი** `/v1/responses` მოთხოვნების გამტარუნარიანობის გაზრდის ერთადერთი მხარდაჭერილი გზაა N დამოუკიდებელი პროცესი (შემდეგი განყოფილება) და არა `replicas > 1` ერთ volume-ზე.

## ჰორიზონტალური მასშტაბირება: N დამოუკიდებელი პროცესი

ერთი Node პროცესი არის **ერთი V8 heap**. ორი ერთმანეთის გადამფარავი ~3 MiB / ~750k-token მოცულობის coding-agent-ის `POST /v1/responses` მოთხოვნა (RTK + Caveman) ამ heap-ს ~12 Gi-ზე ავარიულად აჩერებს (`FATAL ERROR: Reached heap limit`) და შეუძლია 16 Gi cgroup-ში OOM გამოიწვიოს. იხილეთ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). ეს გაზომვა არის **მეხსიერების ბიუჯეტის** გაფრთხილება და არა პროდუქტის მიერ დაწესებული, ერთდროული ხანგრძლივი `/v1/responses` მოთხოვნების მაქსიმალური რაოდენობა — ორი. რესურსტევადი ჩატების მიღება იმართება ავტომატურად გამოთვლილი შემომავალი ბაიტების ბიუჯეტით (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), რომლის ზომაც იმავე V8/cgroup ზღვრის საფუძველზე განისაზღვრება — უკვე შესაბამისი ზომით კონფიგურირებულ პროცესზე მისი მნიშვნელობის გაზრდით ჩანაცვლება (ან მოთხოვნების რაოდენობაზე დაფუძნებული ძველი `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ლიმიტის დაყენება) კვლავ იწვევს ავარიულ შეწყვეტას. მცირე ჩატები, `/healthz`, `/v1/models` და MCP ამ ლიმიტში **არ** შედის.

### ერთი პროცესი: ორზე მეტი ხანგრძლივი `/v1/responses`

**ჯანსაღმა** პროცესმა (heap არის `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-ზე ნაკლები, ნაგულისხმევად `0.75`) **შეიძლება** ორზე მეტი ერთდროული ხანგრძლივი `POST /v1/responses` შეასრულოს, როდესაც პროცესის მასშტაბით მოქმედ შემუშავების პროცესში მყოფი ბაიტების ბიუჯეტში (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ჯერ კიდევ არის ადგილი. `OMNIROUTE_CHAT_LARGE_BODY_BYTES`-ის ტოლი ან მასზე დიდი სხეულები (ნაგულისხმევად 256 KiB) იღებს იმავე რესურსტევადი მოთხოვნის ლიზს, რასაც რთული სტრუქტურის მქონე მოთხოვნები, და იყენებს იმავე [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` გვერდის ავლის მექანიზმს (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). ათობით ერთდროული ხანგრძლივი SSE კლიენტის მხარდაჭერა (ოპერატორებს ხშირად 40–50 სჭირდებათ) **მეხსიერების ბიუჯეტის** საკითხია — სათანადოდ განსაზღვრეთ heap-ის, ძირითადი/სარეზერვო სლოტებისა და `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`-ის ზომები — და არა პროდუქტის მკაცრი „მაქსიმუმ 2“ შეზღუდვა. დატვირთული heap კვლავ უარყოფს მოთხოვნებს ხელახლა ცდადი `503` პასუხით, რათა #7849 არ განმეორდეს.

**heap-ების გასამრავლებლად** (დამოუკიდებელი V8 old-space-ები) **დღესვე**:

| გააკეთეთ                                                                                                                                                                                                                     | არ გააკეთოთ                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| გაუშვით **N კონტეინერი/pod**, თითოეული თავისი **საკუთარი** `DATA_DIR`-ით / ტომით                                                                                                                                             | არ დააყენოთ `replicas > 1` ერთი SQLite ფაილისთვის                                    |
| რესურსტევადი მიმდინარე მოთხოვნებისა და ჯანსაღი სარეზერვო რესურსის ზომები heap-ის / მიმდინარე ბაიტების ბიუჯეტის მიხედვით განსაზღვრეთ; 1–2 არის კონსერვატიული #7849 ნაგულისხმევი მნიშვნელობა და არა პროდუქტის მკაცრი მაქსიმუმი | არ გამოუყოთ ერთ პროცესს 8× RAM და შეუზღუდავი რაოდენობრივი ლიმიტი                     |
| სურვილისამებრ: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **საერთო კვოტის მრიცხველებისთვის**                                                                                                                       | არ ჩათვალოთ Redis საზიარო SQLite-ად — ის ასეთი არ არის                               |
| დააკოპირეთ პროვაიდერის საიდუმლოებები თითოეულ ინსტანციაში (ან შეეგუეთ დაყოფილ საინფორმაციო პანელებს)                                                                                                                          | ნუ მოელით ერთ საინფორმაციო პანელს / ერთიან გამოძახებათა ჟურნალს ყველა ინსტანციისთვის |
| წინ განათავსეთ ნებისმიერი დატვირთვის გამანაწილებელი; API გასაღების ან სესიის მიხედვით მიბმა საკმარისია                                                                                                                       | ნუ მოითხოვთ მომწოდებელზე დამოკიდებულ, ზომის გამთვალისწინებელ middleware-ს            |

აპარატურული უზრუნველყოფა: თითოეულ ინსტანციაში ერთდროული ხანგრძლივი `/v1/responses` მოთხოვნების რაოდენობა **მეხსიერების ბიუჯეტის** საკითხია (heap + მიმდინარე ბაიტები / #10110). N დამოუკიდებელი `DATA_DIR` მაინც ამრავლებს heap-ებს: ჰოსტის RAM უნდა ფარავდეს `N × cgroup`-ს და არა „ერთ 16 Gi pod-ს N=8-ით“. არასოდეს გამოიყენოთ `replicas > 1` ერთ SQLite ფაილზე.

Compose-ის მონახაზი (ორი heap, ორი ტომი — არა `deploy.replicas: 2`):

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

პროცესის შიდა სიმჭიდროვე (კომპრესიის HTTP isolate-იდან გატანა) განხილულია [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)-ში. საერთო მდგრად მდგომარეობაზე დაფუძნებული ერთი ლოგიკური კლასტერი განხილულია [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-ში.

## Gemini-ის რეგიონული შეცდომები Docker-ის შიგნით

Google AI Studio / Gemini API-მ შეიძლება დააბრუნოს HTTP 400 სტატუსი FAILED_PRECONDITION-ით და შეტყობინებით
`User location is not supported for the API use.` ჰოსტზე წარმატებული მოთხოვნა
არ ადასტურებს, რომ კონტეინერი იმავე გამავალ მარშრუტს იყენებს. DNS-ის თანმიმდევრობა,
IPv4/IPv6 კავშირი, VPN-ის მარშრუტიზაცია და კონფიგურირებული პროქსი-სერვერები შეიძლება განსხვავდებოდეს. შეამოწმეთ
[Google-ის მხარდაჭერილი რეგიონები](https://ai.google.dev/gemini-api/docs/available-regions)
და ასევე კავშირის ფაქტობრივი მარშრუტი; მხოლოდ ეს შეცდომა არ მიუთითებს, რომ API გასაღები არასწორია.

### უპირატესობა მიანიჭეთ კონკრეტული კავშირისთვის განკუთვნილ პროქსი-სერვერს

პრობლემური Gemini კავშირისთვის გამოიყენეთ OmniRoute-ის [თითოეული კავშირისთვის პროქსი-სერვერის კონფიგურაცია](../ops/PROXY_GUIDE.md#4-level-proxy-system),
შემდეგ კვლავ გაუშვით **კავშირის ტესტირება** და მცირე მოთხოვნა
იმავე მოდელით. ამგვარად, მარშრუტის ცვლილება მხოლოდ ამ კავშირით შემოიფარგლება. დარწმუნდით,
რომ პროქსი-სერვერი ხელმისაწვდომია კონტეინერიდან და რომ კავშირი ნამდვილად ირჩევს
მას. მარშრუტის შეცვლა ზედა დონის სერვისის რეგიონულ შესაბამისობას არ უზრუნველყოფს.

### შეადარეთ ჰოსტისა და კონტეინერის ქსელური გარემო

ავთენტიფიცირებული შედეგების შედარებისას გასაღები, მოდელი და მოთხოვნა უცვლელი დატოვეთ; პრობლემის აღწერაში არასოდეს
ჩასვათ ავტორიზაციის მონაცემები, პროქსი-სერვერის პაროლები ან ავტორიზაციის სრული სათაურები.
თავდაპირველად შეამოწმეთ, მისამართების რომელ ოჯახებს გთავაზობთ OS-ის რეზოლვერი, რისთვისაც ჰოსტზე
და კონტეინერის შიგნით ერთი და იგივე ბრძანება გამოიყენეთ:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` ჩაანაცვლეთ იმ სერვისით, რომელსაც უშვებთ (მაგალითად, `omniroute-web`). ეს
ბრძანებები მისამართების ოჯახებს ავტორიზაციის მონაცემებისა და IP მისამართების გარეშე დაბეჭდავს. დაბრუნებული `6`
მხოლოდ IPv6 DNS შედეგს აჩვენებს: ის გამოსადეგ IPv6 მარშრუტს ან API-ზე წვდომას **არ** ადასტურებს.
იქ, სადაც `curl` დაყენებულია, ორივე გარემოში შეადარეთ `curl -4 -I https://generativelanguage.googleapis.com`
და `curl -6 -I https://generativelanguage.googleapis.com`.
HTTP პასუხი ამ შემოწმებისთვის კავშირის არსებობას ადასტურებს, მაშინაც კი, თუ ეს არაავთენტიფიცირებული
შეცდომაა; Gemini-ს გამოყენების შესაძლებლობას მხოლოდ ავთენტიფიცირებული მოდელის მოთხოვნა ამოწმებს.

### ჰოსტის დონის ალტერნატივა: გამართული IPv6 და რეზოლვერის პოლიტიკა

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)-ის ავტორმა თავის გარემოში წვდომა აღადგინა
კონტეინერისთვის IPv6-ის ჩართვითა და glibc-ის მისამართების არჩევის წესის შეცვლით.
ეს განიხილეთ, როგორც კონკრეტულ გარემოზე დამოკიდებული ალტერნატივა. რეზოლვერის პარამეტრების შეცვლამდე დაადასტურეთ, რომ გამართულად მუშაობს
ჰოსტის IPv6, კონტეინერის გამავალი კავშირი/მარშრუტიზაცია და firewall-ის წესები.
მხოლოდ კერძო ULA მისამართი საჯარო IPv6 კავშირის არსებობას არ ადასტურებს.

Compose-ის ნაგულისხმევ ქსელთან უკვე მიერთებული სერვისებისთვის ეს ფრაგმენტი ამ ქსელში
IPv6-ს ჩართავს; შეინარჩუნეთ თქვენი სერვისის, პორტების, ტომებისა და კონფიგურაციის დანარჩენი ნაწილი:

```yaml
networks:
  default:
    enable_ipv6: true
```

სახელდებული ქსელის შემთხვევაში IPv6 ჩართეთ იმ ქსელში, რომელსაც სერვისი რეალურად უერთდება. Docker-ს შეუძლია
ULA ქვექსელის გამოყოფა; ცხადად განსაზღვრული, გადაუფარავი ქვექსელი მხოლოდ მაშინ აირჩიეთ, როდესაც ამას თქვენი ქსელი
მოითხოვს. იხილეთ [Docker-ის IPv6 ქსელი](https://docs.docker.com/engine/daemon/ipv6/)
და [Compose-ის ქსელის პარამეტრები](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc-ზე დაფუძნებულ იმიჯში** `/etc/gai.conf`-ს მისამართების არჩევის შეცვლა შეუძლია. მიმდინარე
რეპოზიტორიის Dockerfile Debian-ს იყენებს; musl-ზე დაფუძნებული მორგებული იმიჯები ამ მექანიზმს არ იზიარებს.
აღწერილი ცვლილება ULA-ს ჭდეს `label fc00::/7 6`-დან
`label fc00::/7 1`-ზე ცვლის. დაიწყეთ იმიჯის სრული პოლიტიკის ცხრილით და შეინარჩუნეთ მისი სხვა
ჩანაწერები: `label` ან `precedence` ჩანაწერის დამატება ნაგულისხმევ ცხრილს ანაცვლებს, ამიტომ ფაილი,
რომელიც მხოლოდ შეცვლილ სტრიქონს შეიცავს, საკმარისი არ არის.
[glibc-ის კონფიგურაციის ცნობარი](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ამ სემანტიკას აღწერს. შემოწმებული ფაილი `/etc/gai.conf`-ზე მხოლოდ წაკითხვის რეჟიმში bind-mount-ით მიამაგრეთ
და ცვლილების გამოსაყენებლად სერვისი ხელახლა შექმენით.

ეს ცვლის OS-ის მიერ მისამართების არჩევას **ამ კონტეინერიდან მთელი გამავალი ტრაფიკისთვის**.
ის ყველა აპლიკაციას IPv6-ის არჩევას არ აიძულებს: ასევე მნიშვნელოვანია Node-ის DNS თანმიმდევრობა და კავშირის
არჩევის მექანიზმი. კერძოდ, `--dns-result-order=ipv4first` უპირატესობას IPv4-ს ანიჭებს და
მხოლოდ IPv4-თან დაკავშირებული შეფერხების გამოსასწორებლად არ გამოდგება. იხილეთ [Node-ის DNS თანმიმდევრობა](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

ჰოსტის დონეზე ნებისმიერი ცვლილების შემდეგ ხელახლა შეამოწმეთ Gemini და თქვენი სხვა პროვაიდერები. უკან დასაბრუნებლად
წაშალეთ მორგებული `gai.conf`-ის mount, აღადგინეთ ქსელის წინა კონფიგურაცია და
ტექნიკური მომსახურების პერიოდში ხელახლა შექმენით პრობლემური სერვისი/ქსელი. ქსელის ხელახლა შექმნამ
შეიძლება მასთან მიერთებული სხვა კონტეინერების მუშაობა შეაფერხოს; არ წაშალოთ მუდმივი მონაცემების ტომი.

## მნიშვნელოვანი შენიშვნები

- **SQLite WAL რეჟიმი:** საჭიროა, `docker stop`-ს დასრულების საშუალება მიეცეს, რათა OmniRoute-მა უახლესი ცვლილებების `storage.sqlite`-ში საკონტროლო წერტილის სახით ჩაწერა შეძლოს. თანდართულ Compose ფაილებში გაჩერების საშეღავათო პერიოდად უკვე განსაზღვრულია 40 წამი. თუ იმიჯს პირდაპირ უშვებთ, შეინარჩუნეთ `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** დააყენეთ `true`, თუ რეგულარული/ჩაწერამდე სარეზერვო ასლების შექმნა გარე საშუალებებით იმართება. არსებული მონაცემთა ბაზის მიგრაციებისთვის კვლავ საჭიროა საკუთარი გამძლე უსაფრთხოების სნეპშოტი და მასობრივი მიგრაციისგან დაცვის მექანიზმი.
- **მონაცემთა მუდმივი შენახვა:** კონტეინერის ხელახალი გაშვებებისას მონაცემთა ბაზის, გასაღებებისა და კონფიგურაციების შესანარჩუნებლად ყოველთვის მიამაგრეთ ტომი `/app/data`-ზე.
- **პორტის კონფიგურაცია:** ნაგულისხმევი `20128` პორტის შესაცვლელად გადააწერეთ `PORT` გარემოს ცვლადს.

## აგრეთვე იხილეთ

- [VM-ზე განთავსების სახელმძღვანელო](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare-ის გამართვა
- [Fly.io-ზე განთავსების სახელმძღვანელო](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-ზე განთავსება
- [გარემოს კონფიგურაცია](../reference/ENVIRONMENT.md) — `.env`-ის სრული ცნობარი
