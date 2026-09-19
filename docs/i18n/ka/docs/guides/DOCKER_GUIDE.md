# 🐳 Docker Guide — OmniRoute (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker-ის განთავსების სრული ცნობარი. სწრაფად დასაწყებად იხილეთ [README-ის Docker-ის განყოფილება](../README.md#-docker).

## სარჩევი

- [სწრაფი გაშვება](#quick-run)
- [გარემოს ფაილით](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ხელმისაწვდომი პროფილები](#available-profiles)
- [ჰოსტის CLI ინსტრუმენტების კონფიგურაცია, როდესაც OmniRoute Docker-ში მუშაობს](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-ის თანმხლები კონტეინერი](#redis-sidecar)
- [საწარმოო Compose](#production-compose)
- [Dockerfile-ის ეტაპები](#dockerfile-stages)
- [გარემოს კრიტიკული ცვლადები](#critical-environment-variables)
- [Docker Compose Caddy-ით (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare-ის სწრაფი გვირაბი](#cloudflare-quick-tunnel)
- [იმიჯის ტეგები](#image-tags)
- [ხელმისაწვდომობა: ნაგულისხმევი SQLite მხოლოდ ერთ რეპლიკას უჭერს მხარს](#availability-default-sqlite-is-single-replica)
- [მნიშვნელოვანი შენიშვნები](#important-notes)

---

## სწრაფი გაშვება

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
# საბაზისო პროფილი (CLI ინსტრუმენტების გარეშე)
docker compose --profile base up -d

# CLI პროფილი (ჩაშენებული Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# ჰოსტის პროფილი (უპირველესად Linux-ისთვის; ჰოსტის CLI-ის ბინარულ ფაილებს მხოლოდ წაკითხვის რეჟიმში ამონტაჟებს)
docker compose --profile host up -d

# CLI-ისა და CLIProxyAPI-ის თანმხლები კონტეინერის გაერთიანება
docker compose --profile cli --profile cliproxyapi up -d
```

## ხელმისაწვდომი პროფილები

OmniRoute-ს მოჰყვება Compose-ის ოთხი პროფილი. აირჩიეთ თქვენი გარემოს შესაბამისი.

| პროფილი               | სერვისი          | როდის უნდა გამოიყენოთ                                                                                                                                                  | ბრძანება                                     |
| --------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ნაგულისხმევი) | `omniroute-base` | უგრაფიკო სერვერი / მინიმალური გაშვების გარემო, მომწოდებლების CLI-ების გარეშე                                                                                           | `docker compose --profile base up -d`        |
| `cli`                 | `omniroute-cli`  | აგენტური სამუშაო პროცესები, რომლებიც იძახებენ `omniroute providers/setup/doctor`-ს და თანდართულ CLI-ებს (Codex, Claude Code, Droid, OpenClaw)                          | `docker compose --profile cli up -d`         |
| `host`                | `omniroute-host` | Linux ჰოსტები, რომლებსაც სურთ ჰოსტის CLI-ებზე `network_mode`-ის მსგავსი წვდომა `~/.local/bin`, `~/.codex`, `~/.claude` და სხვათა მხოლოდ წაკითხვის რეჟიმში დამონტაჟებით | `docker compose --profile host up -d`        |
| `cliproxyapi`         | `cliproxyapi`    | გაუშვით [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-ის თანმხლები კონტეინერი პორტზე `8317`, ზემდგომი CLI-ის პროქსირებისთვის                             | `docker compose --profile cliproxyapi up -d` |

> შესაძლებელია რამდენიმე პროფილის გაერთიანება: `docker compose --profile cli --profile cliproxyapi up -d`.

## ჰოსტის CLI ხელსაწყოების კონფიგურაცია, როდესაც OmniRoute Docker-ში მუშაობს

`omniroute setup-codex`, `setup-claude`, `config set <tool>` და მართვის პანელის
**კონფიგურაციის შენახვა** ღილაკი წერენ ფაილებს, როგორიცაა `~/.codex/*.config.toml`. ამ მისამართებს
მნიშვნელობა მხოლოდ იმ კომპიუტერზე აქვს, სადაც CLI რეალურად მუშაობს. თუ მათ კონტეინერის შიგნით
გაუშვებთ, ჩანაწერი კონტეინერის საკუთარ home დირექტორიაში მოხვდება (`/home/node` —
image მუშაობს როგორც `USER node`), საიდანაც ჰოსტის არცერთი CLI მას არასოდეს წაიკითხავს და სადაც ის
კონტეინერის ხელახლა შექმნისთანავე წაიშლება.

OmniRoute ამას ამოიცნობს და, ისეთი წარმატების შეტყობინების ნაცვლად, რომელსაც ვერ გამოიყენებთ,
ინსტრუქციების თანხლებით უარს ამბობს ჩაწერაზე: CLI სრულდება კოდით `2`, ხოლო API პასუხობს `422`
კოდით და `containerEphemeralTarget: true` მნიშვნელობით.

### რეკომენდებული: გაუშვით CLI ჰოსტზე, ხოლო OmniRoute — Docker-ში

კონტეინერი ემსახურება API-ს; CLI კი თქვენი ჰოსტის ხელსაწყოებს აკონფიგურირებს.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # მიუთითეთ CLI-ს კონტეინერზე
omniroute setup-codex                      # წერს რეალურ ~/.codex-ში თქვენს ჰოსტზე
```

ეს სწორი არჩევანია, როდესაც Codex, Claude Code, Cursor ან მსგავსი ხელსაწყოები თქვენს
ლეპტოპზე მუშაობს — რაც ჩვეულებრივი კონფიგურაციაა.

### ალტერნატივა: ჰოსტის კონფიგურაციის დირექტორიების bind-mount (`host` პროფილი)

თუ გსურთ, რომ თავად კონტეინერმა ჩაწეროს თქვენი ჰოსტის კონფიგურაციაში, დაამონტაჟეთ
დირექტორიები და მიუთითეთ `CLI_CONFIG_HOME`-ს mount-ის ძირეული დირექტორია. `host` პროფილი
ამას უკვე აკეთებს:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount სწორედ ისაა, რაც მისამართს სანდოს ხდის: OmniRoute კითხულობს
`/proc/self/mountinfo`-ს და ჩაწერას უშვებს დამონტაჟებულ მისამართებში (ასევე იმ დირექტორიებში,
რომელთა შვილობილებიც mount-ებია — რაც ზუსტად შეესაბამება ზემოთ ნაჩვენებ `/host-home` სტრუქტურას),
ამავდროულად კი კვლავ უარს ამბობს დაუმონტაჟებელ მისამართებში ჩაწერაზე.

### ავარიული გამოსავალი: დააკონფიგურირეთ კონტეინერის საკუთარი CLI-ები (გამოიყენეთ იშვიათად)

როდესაც CLI-ები ნამდვილად კონტეინერის შიგნითაა განთავსებული (`cli` პროფილი), ჩაწერა
განზრახულია. ნებისმიერ `setup-*` ბრძანებას გადასცით `--allow-container-write`, ან სერვერისთვის
დააყენეთ `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. ჩაწერა გაგრძელდება გაფრთხილებით,
რომ მონაცემები კონტეინერის არსებობის დასრულების შემდეგ არ შენარჩუნდება.

> **უსაფრთხოების გაფრთხილება — `cli` პროფილი + `docker.sock` mount.**
> `cli` პროფილი bind-mount-ის საშუალებით ამონტაჟებს `/var/run/docker.sock`-ს, რათა კონტეინერში
> არსებულმა ავტომატურმა განმაახლებელმა ჰოსტის daemon-ის მეშვეობით შეძლოს stack-ის ხელახლა შექმნა
> (`src/lib/system/autoUpdate.ts` ამოწმებს ამ socket-ის არსებობას და მისი
> არარსებობისას Docker-ის გზას გამოტოვებს). ეს socket არის **ჰოსტის root წვდომის ნდობის
> საზღვარი**: ყველაფერს, რასაც მასთან წვდომა შეუძლია, შეუძლია ჰოსტის Docker daemon-ის
> root-ის უფლებებით მართვა — მას შეუძლია ჰოსტზე ნებისმიერი კონტეინერის შექმნა, შემოწმება,
> გაჩერება და წაშლა. შედეგები:
>
> 1. **არასოდეს გახადოთ `cli` პროფილის პორტი ქსელიდან ხელმისაწვდომი.** გამოაქვეყნეთ
>    ის `127.0.0.1`-ზე (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN-იდან ხელმისაწვდომი `cli` პროფილი მართვის პანელის დონის ნებისმიერ RCE-ს
>    ჰოსტის სრულ კომპრომეტაციად აქცევს.
> 2. **არ დაამონტაჟოთ ჰოსტის დამატებითი დირექტორიები `cli` პროფილში.**
>    Docker-ის socket-ი ნებისმიერ დამატებით mount-თან ერთად კონტეინერს თქვენს
>    ფაილურ სისტემასა და ჰოსტის კონფიგურაციაზე სრულ წაკითხვის/ჩაწერის წვდომას აძლევს.
>    თუ ხელსაწყოს პროექტზე წვდომა სჭირდება, გაუშვით ის ლოკალურად CLI binary-ით —
>    ნუ დაამონტაჟებთ მას `cli` კონტეინერში.
>
> თუ კონტეინერის შიგნით ავტომატური განახლება არ გჭირდებათ, დატოვეთ `cli` პროფილი გამორთული
> (`COMPOSE_PROFILES=core,redis` ან უფრო მოკლე ვარიანტი). სხვა პროფილები
> Docker-ის socket-ს არ ამონტაჟებენ.
>
> MITM-თან დაკავშირებული საფრთხეების მოდელისთვის იხილეთ `docs/security/MITM-TPROXY-DECRYPT.md`
> (git-შია; `/docs`-ში არ კომპილირდება), ხოლო
> `codex`/`claude-code`/`droid`/`openclaw` binary-ების წარმომავლობის ჯაჭვისთვის —
> `docs/security/SUPPLY_CHAIN.md`.

## Redis Sidecar

OmniRoute განაწილებული მოთხოვნების სიხშირის შემზღუდველისა და საზიარო კეშის მუშაობისთვის Redis-ს ეყრდნობა. `redis` სერვისი **ყოველთვის განსაზღვრულია** `docker-compose.yml`-ში (მას პროფილის შეზღუდვა არ აქვს) და ნებისმიერ სხვა პროფილთან ერთად გაეშვება.

| დეტალი                    | მნიშვნელობა                                   |
| ------------------------- | --------------------------------------------- |
| იმიჯი                     | `redis:7-alpine`                              |
| კონტეინერის სახელი        | `omniroute-redis`                             |
| შიდა პორტი                | `6379`                                        |
| ჰოსტის პორტი (გადაფარვა)  | `REDIS_PORT` (ნაგულისხმევია `6379`)           |
| ჰოსტთან მიბმა (გადაფარვა) | `REDIS_BIND_HOST` (ნაგულისხმევია `127.0.0.1`) |
| ტომი                      | `omniroute-redis-data` → `/data`              |
| ჯანმრთელობის შემოწმება    | `redis-cli ping` (10s ინტერვალი)              |

დაკავშირებული გარემოს ცვლადები:

- `REDIS_URL` — აპლიკაციაში ჩასმული კავშირის სტრიქონი (ნაგულისხმევად `redis://redis:6379`).
- `REDIS_PORT` — Redis-ის კონტეინერისთვის ჰოსტის მხარეს პორტის ასახვა.
- `REDIS_BIND_HOST` — ჰოსტის ინტერფეისი, რომელზეც პორტი ქვეყნდება. ნაგულისხმევია `127.0.0.1`.

> **რატომ გამოიყენება ნაგულისხმევად loopback:** sidecar მუშაობს `requirepass`-ის გარეშე, ხოლო აპლიკაციის
> კონტეინერები მას compose-ის ქსელის (`redis:6379`) მეშვეობით უკავშირდებიან — გამოქვეყნებული პორტი
> მხოლოდ ჰოსტის მხარეს არსებული ხელსაწყოებისთვისაა (`redis-cli`, ლოკალური `npm run dev`). `0.0.0.0`-ზე
> გამოქვეყნება არაავთენტიფიცირებულ Redis-ს თქვენს LAN-ში არსებულ ყველა ჰოსტს გაუხსნიდა. თუ დააყენებთ
> `REDIS_BIND_HOST=0.0.0.0`-ს, სერვისის `command:`-ს ასევე დაამატეთ `--requirepass`.

**Redis-ის გათიშვა** რეკომენდებული არ არის (მოთხოვნების სიხშირის შემზღუდველი გაუარესებულ, მეხსიერებაში შენახულ სარეზერვო რეჟიმზე გადავა). აუცილებლობის შემთხვევაში ან წაშალეთ/დააკომენტარეთ `redis:` სერვისის ბლოკი `docker-compose.yml`-ში, ან მისი მასშტაბი ნულამდე შეამცირეთ:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

დეველოპმენტის გარემოს პარალელურად იზოლირებული საწარმოო სნეპშოტის გასაშვებად გამოიყენეთ `docker-compose.prod.yml`.

| დეტალი                    | მნიშვნელობა                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| ფაილი                     | `docker-compose.prod.yml`                                                                    |
| დაფის ნაგულისხმევი პორტი  | `PROD_DASHBOARD_PORT=20130` (ასახულია შიდა `${DASHBOARD_PORT:-20128}`-ზე)                    |
| API-ის ნაგულისხმევი პორტი | `PROD_API_PORT=20131`                                                                        |
| იმიჯი                     | `omniroute:prod` (აგებულია `runner-cli` სამიზნიდან)                                          |
| Redis-ის კონტეინერი       | `omniroute-redis-prod` (`redis:8.6.2`, გამოყოფილი `redis-prod-data` ტომი)                    |
| მონაცემთა ტომი            | `omniroute-prod-data` (სახელდებული, ხელახალ აგებებს შორის შენარჩუნებული)                     |
| ჯანმრთელობის შემოწმებები  | `node healthcheck.mjs` + `redis-cli ping`, `depends_on` დამოკიდებულია Redis-ის ჯანმრთელობაზე |

გამოყენების წესი:

```bash
# ააგეთ და გაუშვით საწარმოო სტეკი
docker compose -f docker-compose.prod.yml up -d --build

# ჟურნალების ნაკადის ჩვენება
docker compose -f docker-compose.prod.yml logs -f

# გააჩერეთ და წაშალეთ სტეკი (ტომების შენარჩუნებით)
docker compose -f docker-compose.prod.yml down
```

საწარმოო სტეკი დეველოპმენტის compose-ის პარალელურად მუშაობს (კონტეინერების განსხვავებული სახელებით, პორტებითა და ტომებით), ამიტომ შეგიძლიათ ლოკალურად განაგრძოთ მუშაობა, სანამ საწარმოო გარემო გაშვებული რჩება.

## Dockerfile-ის ეტაპები

რეპოზიტორიას მოჰყვება მრავალეტაპიანი Dockerfile (`Dockerfile`). ხელმისაწვდომია სამი ეტაპი; თქვენი გამოყენების შემთხვევისთვის აირჩიეთ შესაბამისი `target`.

| ეტაპი         | საბაზისო იმიჯი        | დანიშნულება                                                                                                                                                                             |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | აყენებს დამოკიდებულებებს (`npm ci --legacy-peer-deps`) და უშვებს `npm run build`-ს (ნაგულისხმევად Turbopack — იხილეთ ქვემოთ აგების დროის რესურსები)                                     |
| `runner-base` | `node:26-trixie-slim` | საწარმოო შესრულების გარემო Next.js-ის standalone გამომავალი შედეგით. **პროვაიდერების CLI-ები ჩართული არ არის.**                                                                         |
| `runner-cli`  | `runner-base`         | ამატებს `git`, `docker.io`, `docker-compose`-სა და გლობალურ CLI-ებს: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **აგენტური სამუშაო პროცესებისთვის აირჩიეთ ეს.** |

კონკრეტული სამიზნის ხელით ასაგებად:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### აგების დროის რესურსები

სამი აგების არგუმენტი აკონტროლებს `builder` ეტაპის რესურსულ ღირებულებას. ისინი მხოლოდ აგების დროს გამოიყენება —
`OMNIROUTE_MEMORY_MB` (ქვემოთ) ცალკე, შესრულების დროის პარამეტრია.

| აგების არგუმენტი            | ნაგულისხმევი | ეფექტი                                                                                                                |
| --------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`          | `0` აგებისთვის სანაცვლოდ webpack-ს იყენებს. მეხსიერების ნაკლები პიკური მოხმარება, მაგრამ უფრო ნელია.                  |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | V8 heap-ის ზედა ზღვარი (`--max-old-space-size`) გაშვებული `next build`-ისთვის.                                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | მნიშვნელობას გადასცემს `CIRCLE_NODE_TOTAL`-ს; გვერდის მონაცემების შეგროვებისთვის Next გამოითვლის `workers = N - 1`-ს. |

`OMNIROUTE_BUILD_WORKERS` არის პარამეტრი, რომელიც მძლავრ ამგებზე უნდა გაზარდოთ და
რომელიც უნდა მიიჩნიოთ შესაძლო მიზეზად, როდესაც შეზღუდული რესურსების მქონე აგება
**შემდეგ** წყდება: `✓ Compiled successfully`. გვერდის მონაცემების თითოეული worker
ცალკე პროცესია, ისევე როგორც თავად მშობელი `next build`; რეალურ VPS-ზე ჩატარებულმა
რეპროდუქციამ (issue #7518) აჩვენა, რომ თითოეული პროცესის პიკური RSS შეადგენდა
~4.5 GB-ს, `NODE_OPTIONS` heap-ის პარამეტრისგან დამოუკიდებლად (Turbopack კომპილაციას
ასრულებს ნატიურ/Rust მეხსიერებაში, V8 heap-ის გარეთ). ნაგულისხმევი `2` (→ 1 worker,
სულ 2 პროცესი) გათვლილია 16 GB / 4 vCPU GitHub-ის მიერ ჰოსტირებულ runner-ებზე,
რომლებსაც გამოქვეყნების pipeline იყენებს. მნიშვნელობით `8` (→ 7 worker) ამ runner-ს
მეხსიერება ამოეწურა და buildkit-მა ეტაპი დაასრულა შეცდომით
`ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 worker) ასევე ვერ ჩაეტია,
როდესაც თითოეული პროცესის RSS პირდაპირ გაზომეს და არა ირიბად გამოთვალეს.
`tests/unit/docker-build-memory-budget.test.ts` გაზომილი მაჩვენებლის საფუძველზე
ასრულებს გამოთვლებს და შეცდომით სრულდება, თუ რომელიმე პარამეტრი runner-ის
შესაძლებლობებს გადააჭარბებს.

Turbopack კომპილაციას ასრულებს ნატიურ Rust მეხსიერებაში, რომელიც V8 heap-ის
**გარეთ** მდებარეობს, ამიტომ `OMNIROUTE_BUILD_MEMORY_MB` მას არ ზღუდავს. მეხსიერების
ზღვრის მქონე ჰოსტზე OOM killer შემდეგ აგების პროცესს SIGKILL-ით ასრულებს, ყოველგვარი
შეცდომის ტექსტის გარეშე — პროცესი უბრალოდ შუა `Creating an optimized production build`
ეტაპზე ჩერდება, რაც მეხსიერების ამოწურვის ნაცვლად გაჭედვას ჰგავს. თუ აგების ჰოსტს
შეზღუდული რესურსები აქვს, შეცვალეთ bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` ჩართულია, ამიტომ `next build` უშვებს როგორც მშობელ, ისე worker
პროცესს და თითოეული ცალ-ცალკე ითვალისწინებს `OMNIROUTE_BUILD_MEMORY_MB`-ს. კონტეინერის
ზღვარი დააყენეთ დაახლოებით ამ მნიშვნელობის ორმაგზე მეტი და არა მხოლოდ მასზე მეტი.

გაზომილია ამ ხეზე (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | კონტეინერის ზღვარი | შედეგი                                 |
| --------- | ------------------ | -------------------------------------- |
| Turbopack | 8 GiB / 16 GiB     | ორივე შემთხვევაში OOM-ით შეწყდა, უხმოდ |
| webpack   | 8 GiB              | build worker SIGKILL-ით შეწყდა         |
| webpack   | 12 GiB             | წარმატებით დასრულდა, პიკი იყო 11.1 GiB |

### შესრულების დროის ნაგულისხმევი პარამეტრები

`runner-base`-ის მიერ ექსპორტირებული ნაგულისხმევი მნიშვნელობები: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

მეხსიერების ქცევა Docker-ში:

- იმიჯი აყენებს `OMNIROUTE_MEMORY_MB=1024`-ს და მისგან გამოითვლის `NODE_OPTIONS=--max-old-space-size=1024`-ს.
- სერვერის ფაქტობრივ პროცესს standalone launcher უშვებს, რომელიც კითხულობს `OMNIROUTE_MEMORY_MB`-ს და ამატებს `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`-ს.
- Node იყენებს ბოლოს გამეორებულ `--max-old-space-size` მნიშვნელობას, ამიტომ `OMNIROUTE_MEMORY_MB`-ის დაყენება Docker-ის heap-ის ეფექტურ ზღვარს აკონტროლებს.
- რადგან იმიჯი ამ მნიშვნელობას ყოველთვის აყენებს, launcher-ის RAM-ზე მორგებული სარეზერვო მექანიზმი Docker-ში არასოდეს გამოიყენება. სამუშაო დატვირთვისთვის ის აშკარად გაზარდეთ (იხილეთ ქვემოთ მოცემული ცხრილი). `2048` მაინც ძალიან მცირეა coding-agent-ის `/v1/responses`-ისთვის.

### შესრულების დროის RAM კოდირების აგენტებისთვის

Docker-ის ნაგულისხმევი 1 GiB არის dashboard-ის/მსუბუქი ჩატის მინიმუმი და არა საწარმოო ზომა. გრძელი `POST /v1/responses` body-ები (ასობით შეტყობინება, ათობით ინსტრუმენტი) შეკუმშვისას მეხსიერებაში რამდენიმე გრაფს ინარჩუნებს. ორმა გადაფარულმა ~3 MiB / ~750k-token მოთხოვნამ V8 **12 GiB** old-space-ზე ავარიულად დაასრულა (`FATAL ERROR: Reached heap limit`) და ასევე მიაღწია 16 GiB cgroup-ის OOM-ს. იხილეთ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

cgroup-ის **`--memory` heap-ზე მაღლა დააყენეთ** — ნატიური ბუფერები, SQLite და შეკუმშვის შუალედური მონაცემები V8-ის გარეთ ინახება.

| სამუშაო დატვირთვა                           | `OMNIROUTE_MEMORY_MB`                    | კონტეინერი / cgroup     | შენიშვნები                                                                                                                            |
| ------------------------------------------- | ---------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| მართვის პანელი, ერთი მსუბუქი ჩატი           | `1024` (იმიჯის ნაგულისხმევი მნიშვნელობა) | ≥2 GiB                  |                                                                                                                                       |
| ერთი კოდირების აგენტი (Claude/Codex/Grok)   | `8192`                                   | ≥10 GiB                 | ტიპური ერთსესიანი `/v1/responses`                                                                                                     |
| ორი ერთდროული ხანგრძლივი `/v1/responses`    | `10240`–`12288`                          | ≥12–16 GiB              | გაზომილი V8-ის ავარიული შეწყვეტა დაახლოებით 12 GiB heap-ზე                                                                            |
| სამი ან მეტი ერთდროული ხანგრძლივი კონტექსტი | არ გაუშვათ ერთ პროცესში                  | სერიალიზაცია / მეტი RAM | მძიმე დატვირთვების მიღების ნაგულისხმევი ლიმიტია 1 მიმდინარე მოთხოვნა; RAM-ის გაზრდის გარეშე მისი აწევა კვლავ იწვევს ავარიულ შეწყვეტას |

`omniroute serve` ფიზიკურ სერვერზე RAM-ის დაახლოებით 35%-ზე კალიბრირდება (შეზღუდული დიაპაზონით `[512, 4096]`), როდესაც `OMNIROUTE_MEMORY_MB` **არ არის დაყენებული**. Docker ყოველთვის აყენებს `1024`-ს, ამიტომ ოფიციალურ იმიჯში ეს კალიბრაცია არასდროს სრულდება.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## კრიტიკული გარემოს ცვლადები

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-ში დოკუმენტირებული ნაგულისხმევი მნიშვნელობების გარდა, Docker-ის გარემოში გაშვებისას ყველაზე მნიშვნელოვანია შემდეგი ცვლადები:

| ცვლადი                        | დანიშნულება                                                                                                                                                                                                                                                                                                                         | ნაგულისხმევი მნიშვნელობა           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket-ხიდის საერთო საიდუმლო გასაღები. **სავალდებულოა საწარმოო გარემოში** — მიუთითეთ ძლიერი შემთხვევითი სტრიქონი.                                                                                                                                                                                                                | არ არის მითითებული (უნდა მიეთითოს) |
| `REDIS_URL`                   | სიჩქარის შემზღუდველის / კეშის სერვერთან კავშირის სტრიქონი                                                                                                                                                                                                                                                                           | `redis://redis:6379`               |
| `REDIS_PORT`                  | ჰოსტზე ხელმისაწვდომი პორტი ჩაშენებული Redis-კონტეინერისთვის                                                                                                                                                                                                                                                                         | `6379`                             |
| `REDIS_BIND_HOST`             | ჰოსტის ინტერფეისი, რომელზეც ქვეყნდება ჩაშენებული Redis-ის პორტი (loopback, თუ AUTH-ს არ დაამატებთ)                                                                                                                                                                                                                                  | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ჰოსტის ბილიკი, რომელიც თვითგანახლების სამუშაო პროცესებისთვის `cli` პროფილში `/workspace/omniroute` მისამართზე მონტაჟდება                                                                                                                                                                                                            | `.` (მიმდინარე დირექტორია)         |
| `OMNIROUTE_MEMORY_MB`         | Docker-ის დამოუკიდებელი სერვერისთვის Node-ის heap-ის ზედა ზღვარი შესრულების დროს; ჩაანაცვლებს ზემოთ მითითებულ image-ის ნაგულისხმევ მნიშვნელობას. კოდის დამწერი აგენტები: `8192`+ (იხილეთ [ოპერატიული მეხსიერება შესრულების დროს](#runtime-ram-for-coding-agents)).                                                                  | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | dashboard-ისა (20128) და API-სთვის (20129) გამოქვეყნებული პორტების გადაფარვა                                                                                                                                                                                                                                                        | `20128` / `20129`                  |
| `APP_BIND_HOST`               | ჰოსტის ინტერფეისი, რომელზეც docker-compose აქვეყნებს dashboard/API/live-WS პორტებს. როდესაც `REQUIRE_API_KEY=false` (ნაგულისხმევი მნიშვნელობა), `0.0.0.0` ანონიმურ `/v1` პროქსის LAN-ში ხელმისაწვდომს ხდის — გააფართოეთ წვდომა მხოლოდ `REQUIRE_API_KEY=true`-ის გამოყენებისას ან წინ მდგომი reverse proxy-ის არსებობის შემთხვევაში. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | ჰოსტის ინტერფეისი, რომელზეც docker-compose აქვეყნებს `cliproxyapi` sidecar-ს — მის data volume-ში ინახება პროვაიდერის ავტორიზაციის მონაცემები.                                                                                                                                                                                      | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | დირექტორია, რომელსაც შესრულების გარემოს plugin-სკანერი კითხულობს და სადაც plugin-ებს აყენებს. მიუთითეთ ის, როდესაც plugin-ები bind-mount-ით არის დამონტაჟებული: ნაგულისხმევი მნიშვნელობა მიჰყვება `HOME`-ს, რომლის ექსპორტიც image-ს შესაძლოა არ ჰქონდეს.                                                                           | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | URL-ის ქვებილიკი, როდესაც აპლიკაცია reverse proxy-ის უკან ქვეყნდება (მაგ. `/omniroute`)                                                                                                                                                                                                                                             | _(ცარიელი = root)_                 |
| `NEXT_PUBLIC_BASE_URL`        | ბრაუზერის საჯარო origin, ქვებილიკის ჩათვლით (მაგ. `https://host/omniroute`)                                                                                                                                                                                                                                                         | არ არის მითითებული                 |
| `PROD_DASHBOARD_PORT`         | ჰოსტის მხარეს არსებული dashboard-ის პორტი `docker-compose.prod.yml`-ისთვის                                                                                                                                                                                                                                                          | `20130`                            |
| `CLIPROXYAPI_PORT`            | ჰოსტის მხარეს არსებული პორტი `cliproxyapi` sidecar-ისთვის                                                                                                                                                                                                                                                                           | `8317`                             |

## უკუ პროქსი ქვეკატალოგზე (Traefik / nginx)

Next.js-ის `basePath` კომპილირდება standalone პაკეტში. OmniRoute ჩაშენებულ
მნიშვნელობას აპლიკაციის ძირეულ დირექტორიაში მდებარე sentinel ფაილში ინახავს (იწერება
`npm run build`-ის დროს; იკითხება `scripts/docker/ensure-docker-base-path.mjs`-ის მიერ)
და კონტეინერის გაშვებისას მას `OMNIROUTE_BASE_PATH`-ს ადარებს. როდესაც ისინი
განსხვავდება და image დომენის ძირეული მისამართისთვის არის აგებული, entrypoint
ხელახლა წერს standalone manifest-ებს, ჩაშენებულ `basePath`/`assetPrefix` ლიტერალებს
(Next 16 SSR რესურსების URL-ებს მხოლოდ `assetPrefix`-იდან აგენერირებს — patcher მასში
ქვეკატალოგსაც იმეორებს), ჩაშენებულ `/_next/static` რესურსების URL-ებს
(client-reference manifest-ებს, მედია-იმპორტებს, წინასწარ დარენდერებულ შეცდომის
გვერდებს) და კლიენტის `process.env` shim-ს, სანამ `node dev/run-standalone.mjs`
გაეშვება.

### Compose-ით აგება (რეკომენდებულია)

ორივე ცვლადი `.env`-ში განსაზღვრეთ, შემდეგ კი image ხელახლა ააგეთ, რათა მისი და
გაშვების გარემოს კონფიგურაციები ერთმანეთს ემთხვეოდეს:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` გადასცემს `OMNIROUTE_BASE_PATH`-ს როგორც Docker-ის build-arg-ს,
ასევე გაშვების გარემოს ცვლადს.

### წინასწარ აგებული ძირეული image + გაშვებისას განსაზღვრული ქვეკატალოგი

გამოქვეყნებული `diegosouzapw/omniroute:*` image-ები დომენის ძირეული მისამართისთვისაა
აგებული. `OMNIROUTE_BASE_PATH`-ის გაშვებისას განსაზღვრა მაინც შეგიძლიათ; კონტეინერი
გაშვებისას პაკეტს ერთხელ ასწორებს. მას შესაბამისი საჯარო origin მიუთითეთ:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

დააკონფიგურირეთ უკუ პროქსი ისე, რომ მან **სრული** გარე ბილიკი გადააგზავნოს
(პრეფიქსი არ მოაშოროთ). Traefik-მა `PathPrefix(`/omniroute`)` კონტეინერისკენ
`StripPrefix`-ის გარეშე უნდა მიმართოს, რათა Next.js-მა მიიღოს `/omniroute/...` და
რესურსები `/omniroute/_next/...`-იდან მოემსახუროს.

Docker-ის healthcheck ამოწმებს მსუბუქ `/healthz` სასიცოცხლო ციკლის endpoint-ს,
რომელსაც აქტიური `OMNIROUTE_BASE_PATH` პრეფიქსი ემატება.
`/api/monitoring/health` კვლავ ხელმისაწვდომია ადამიანებისა და dashboard-ების
დიაგნოსტიკისთვის; კონტეინერის HEALTHCHECK-ის კვლავ მასზე მისამართებლად (მაგალითად,
სიღრმისეული ჯანმრთელობის შემოწმების იძულებით გამოსაყენებლად), განსაზღვრეთ
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. ეს ბილიკი **სიღრმისეულ**
შემოწმებას ასრულებს (DB + მონიტორინგის შეჯამება) — მისი ხელახლა არჩევის შემთხვევაში
იგი შესაფერისია Docker-ის იშვიათი `HEALTHCHECK`-ისთვის, მაგრამ **არა** Kubernetes-ის
`livenessProbe` ინტერვალებისთვის.

ორკესტრატორებისთვის (Kubernetes, Nomad და სხვ.):

| შემოწმება              | უპირატესობა მიანიჭეთ                                                    | მოერიდეთ                                                            |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| სიცოცხლისუნარიანობა    | HTTP `GET /livez`, ან TCP მთავარ პორტზე (`PORT`, ნაგულისხმევად `20128`) | `/api/monitoring/health`-ს სიცოცხლისუნარიანობის შესამოწმებლად       |
| მზადყოფნა              | HTTP `GET /healthz`                                                     | მოკლე timeout-ებს, რომლებიც დატვირთულ event loop-ს მკვდრად მიიჩნევს |
| სიღრმისეული / blackbox | `/api/monitoring/health`                                                | —                                                                   |

`/healthz` პროცესის სასიცოცხლო ციკლის მდგომარეობას (`ok` / `starting` / `stopping`)
აბრუნებს. `/livez` მხოლოდ პროცესის მუშაობას ამოწმებს (აბრუნებს 200-ს ყოველთვის,
როდესაც handler-ს შესრულება შეუძლია; იგი მზადყოფნას არ ელოდება). ორივე მათგანი
კვლავ იმავე Node event loop-ზე მუშაობს, რომელზეც მოთხოვნები მუშავდება, ამიტომ
CPU-ზე დამოკიდებულმა კატალოგის ან შეკუმშვის ოპერაციებმა შეიძლება მათი პასუხი
დააყოვნოს — დატვირთული ≠ მკვდარი. თუ HTTP შემოწმებებს timeout ეწურებათ,
სიცოცხლისუნარიანობის TCP შემოწმებას მიანიჭეთ უპირატესობა. შემოწმებების სრული
სახელმძღვანელო:
[მონიტორინგის სახელმძღვანელო — Kubernetes-ის შემოწმებების რეკომენდაციები](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose Caddy-სთან ერთად (HTTPS Auto-TLS)

OmniRoute-ის უსაფრთხოდ გამოქვეყნება შესაძლებელია Caddy-ის ავტომატური SSL უზრუნველყოფის გამოყენებით. დარწმუნდით, რომ თქვენი დომენის DNS A ჩანაწერი თქვენი სერვერის IP მისამართზე მიუთითებს.

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
      # ბრაუზერისთვის ხილული წყარო OAuth უკუგამოძახებებისთვის, დაფის ბმულებისა და გენერირებული საჯარო URL-ებისთვის.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # შიდა სერვერიდან სერვერზე URL დაგეგმილი დავალებებისთვის / საკუთარ თავზე მოთხოვნებისთვის.
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

Caddy ზედა დონის კონტეინერისთვის სტანდარტულ გადამისამართების სათაურებს ადგენს. OmniRoute
`NEXT_PUBLIC_BASE_URL`-ს იყენებს, როგორც კანონიკურ საჯარო წყაროს OAuth უკუგამოძახებებისა და გენერირებული საჯარო
ბმულებისთვის; ავტორიზებული დაფის ჩაწერის ოპერაციები იყენებს იმავე წყაროს მოთხოვნებს სესიასთან მიბმულ CSRF
დაცვასთან ერთად. `OMNIROUTE_TRUST_PROXY` ჩართეთ მხოლოდ გაფართოებულ განთავსებებში, სადაც განზრახ
გსურთ, რომ OmniRoute-მა საჯარო წყარო აშკარა კონფიგურაციის ნაცვლად სანდო გადამისამართების სათაურებიდან
განსაზღვროს.

## Cloudflare Quick Tunnel

Docker-ის განთავსებებისთვის დაფის მხარდაჭერა `Dashboard → Endpoints` გვერდზე მოიცავს ერთი დაწკაპუნებით გასაშვებ **Cloudflare Quick Tunnel**-ს. პირველად ჩართვისას `cloudflared` ჩამოიტვირთება მხოლოდ საჭიროების შემთხვევაში, გაეშვება დროებითი გვირაბი თქვენი მიმდინარე `/v1` საბოლოო წერტილისკენ და გენერირებული `https://*.trycloudflare.com/v1` URL პირდაპირ თქვენი ჩვეულებრივი საჯარო URL-ის ქვემოთ გამოჩნდება.

საბოლოო წერტილის გვირაბის პანელების (Cloudflare, Tailscale, ngrok) ჩვენება ან დამალვა შესაძლებელია `Settings → Appearance`-დან, აქტიური გვირაბის მდგომარეობის შეცვლის გარეშე.

### გვირაბის შენიშვნები

- Quick Tunnel-ის URL-ები დროებითია და ყოველი გადატვირთვის შემდეგ იცვლება.
- Quick Tunnel-ები OmniRoute-ის ან კონტეინერის გადატვირთვის შემდეგ ავტომატურად არ აღდგება. საჭიროების შემთხვევაში ისინი ხელახლა ჩართეთ დაფიდან.
- მართული ინსტალაცია ამჟამად მხარს უჭერს Linux-ს, macOS-სა და Windows-ს `x64` / `arm64` არქიტექტურებზე.
- მართული Quick Tunnel-ები ნაგულისხმევად HTTP/2 ტრანსპორტს იყენებს, რათა შეზღუდულ კონტეინერულ გარემოებში თავიდან აიცილოს QUIC UDP ბუფერის ხმაურიანი გაფრთხილებები. თუ სხვა ტრანსპორტის გამოყენება გსურთ, დააყენეთ `CLOUDFLARED_PROTOCOL=quic` ან `auto`.
- Docker-ის იმიჯები შეიცავს სისტემურ CA root სერტიფიკატებს და მათ მართულ `cloudflared`-ს გადასცემს, რაც კონტეინერში გვირაბის საწყისი გაშვებისას TLS სანდოობის შეცდომებს თავიდან იცილებს.
- თუ გსურთ, რომ OmniRoute-მა ჩამოტვირთვის ნაცვლად არსებული ბინარული ფაილი გამოიყენოს, დააყენეთ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## იმიჯის ტეგები

| იმიჯი                    | ტეგი     | ზომა   | აღწერა                                                        |
| ------------------------ | -------- | ------ | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | უმაღლესი **გამოქვეყნებული** სტაბილური SemVer (არა git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps-ისთვის დაამაგრეთ ამ კლასის ტეგი                        |

მრავალპლატფორმიანი მანიფესტი: ნატიური `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker შესაბამის არქიტექტურას ავტომატურად ირჩევს; თუ ARM ჰოსტებზე AMD64 ემულაციის იძულებით გამოყენება გჭირდებათ, მიუთითეთ `--platform linux/amd64`.

### გამოშვების არხები

OmniRoute აქვეყნებს Docker-ის ცალკეულ არხებს სტაბილური გამოშვებებისთვის, აქტიური გამოშვების განშტოების ტესტირებისა და დეველოპერული აგებებისთვის.

| არხი                            | წყარო                                         | ცვალებადობა                                | რეკომენდებული გამოყენება                                                                                                                   |
| ------------------------------- | --------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | ხელმოწერილი/ვერსირებული გამოშვება             | უცვლელი                                    | საწარმოო განთავსებები, რომლებიც გამოშვების ზუსტ ვერსიას ამაგრებს                                                                           |
| `:latest` / `:latest-web`       | უმაღლესი **გამოქვეყნებული** სტაბილური SemVer  | ცვალებადი სტაბილური მაჩვენებელი            | მიჰყვება სტაბილურ გამოშვებებს SemVer გამოქვეყნების დავალების **შემდეგ** — **არ** მიჰყვება `main`-ს ან გამოუქვეყნებელ `release/v*` კომიტებს |
| `:next` / `:next-web`           | მიმდინარე ნაგულისხმევი `release/v*` განშტოება | ცვალებადი წინასწარი გამოშვების მაჩვენებელი | იმ შესწორებების ტესტირება, რომლებიც აქტიურ გამოშვების განშტოებაში მოხვდა, მაგრამ ჯერ არ არის სტაბილურ გამოშვებაში                          |
| `:main` / `:main-web`           | `main` განშტოება                              | ცვალებადი დეველოპერული მაჩვენებელი         | მხოლოდ დეველოპერული და ინტეგრაციული ტესტირებისთვის                                                                                         |

#### წინასწარი გამოშვების არხის გამოყენება

`next` არხი თავიდან აიგება მიმდინარე ნაგულისხმევ `release/v*` განშტოებაში ყოველი push-ისას და ქვეყნდება როგორც AMD64-ისთვის, ისე ARM64-ისთვის. ძველ ტექნიკური მხარდაჭერის განშტოებებს მისი გადაწერა არ შეუძლია. ეს არხი გთავაზობთ ჩამოსატვირთ იმიჯს იმ შესწორებებისთვის, რომლებიც მომდევნო სტაბილური ტეგის შექმნამდე აქტიურ გამოშვების განშტოებაში გაერთიანდა.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-ისთვის გადააწერეთ არჩეული პროფილის მიერ გამოყენებული იმიჯის ტეგი, შემდეგ ჩამოტვირთეთ და ხელახლა შექმენით სერვისი:

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

`next` მცურავი წინასწარი გამოშვების არხია. ის შეიძლება შეიცვალოს აქტიურ გამოშვების განშტოებაში ყოველი push-ისას და **საწარმოო გამოყენებისთვის მხარდაჭერილი არ არის**. კონკრეტული აგების შეფასებისას დაამაგრეთ იმიჯის დაიჯესტი:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ტესტირებამდე შექმენით OmniRoute-ის მონაცემთა ტომის ან bind-მონტაჟით მიერთებული მონაცემთა დირექტორიის სარეზერვო ასლი. უკან დასაბრუნებლად აღადგინეთ ადრე გამოყენებული სტაბილური ვერსია ან digest და ხელახლა შექმენით კონტეინერი:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch-ის build ვერასოდეს გადაადგილებს `latest`-ს; სტაბილური მაჩვენებლის განახლება მხოლოდ შესაბამის სტაბილურ სემანტიკურ ვერსიას შეუძლია. `next` image-ები ინარჩუნებს release image-ის შემოწმებასა და CRITICAL მოწყვლადობების დამბლოკავ ბარიერს.

**`latest` არ იძლევა git-თან აქტუალურობის გარანტიას.** `main`-ში ან აქტიურ `release/v*` branch-ში შერწყმული შესწორებები **არ** მოხვდება `:latest`-ში, სანამ სტაბილური SemVer image არ გამოქვეყნდება და გამოქვეყნების job `:latest`-ს არ განაახლებს (იმავე digest-ით, რაც ამ SemVer-ს აქვს). თუ `latest` უცვლელი ჩანს, მაშინ როდესაც GitHub-ზე შესწორება უკვე ნაჩვენებია, release branch-ის სატესტოდ ჩამოტვირთეთ `:next`, ან დაელოდეთ SemVer tag-ს.

| თქვენი მიზანი                                                                             | გამოიყენეთ                           |
| ----------------------------------------------------------------------------------------- | ------------------------------------ |
| GitOps / production, რომელიც არ უნდა შეიცვალოს                                            | მიამაგრეთ `:X.Y.Z` (ან image digest) |
| მიჰყვეთ გამოქვეყნებულ სტაბილურ ვერსიებს და დაეთანხმოთ ყოველი release-ისას ხელახლა შექმნას | `:latest`                            |
| შეამოწმოთ გამოუქვეყნებელი `release/v*` commit-ები                                         | `:next` (არა production-ისთვის)      |
| შეამოწმოთ `main`                                                                          | `:main` (არა production-ისთვის)      |

## ხელმისაწვდომობა: ნაგულისხმევი SQLite ერთ რეპლიკიანია

სტანდარტული Docker / Kubernetes OmniRoute არის **ერთი Node პროცესი + ერთი SQLite ჩამწერი**. ამ ტოპოლოგიაში მაღალი ხელმისაწვდომობა **არ არის მხარდაჭერილი**.

| შეზღუდვა                                                    | შედეგი                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ერთი ჩამწერი                                                | **არ გაუშვათ** რამდენიმე რეპლიკა ერთსა და იმავე SQLite ფაილთან. ეს მონაცემთა ბაზას დააზიანებს.                                                                                                                                                                                                                                                                           |
| ხელახლა შექმნა / გადატვირთვა / HEALTHCHECK-ის მიერ შეწყვეტა | მიმდინარე SSE კავშირების, დაფის სესიებისა და მეხსიერებაში არსებული მდგომარეობის **სრული გათიშვა**. ყველა დაკავშირებული კლიენტის კავშირი წყდება. ცარიელი endpoint-ის ფანჯრის დროს ახალი მოთხოვნები reverse proxy-სგან იღებს **`502 Bad Gateway: Unknown error`** პასუხს და არა OmniRoute-ის JSON-ს — კლიენტები ამას პროვაიდერის შეფერხებისგან ვერ განასხვავებენ (#11015). |
| იგივე event loop, რომელზეც `/healthz`                       | დატვირთულმა კატალოგმა ან შეკუმშვის ციკლმა შეიძლება probe-ები შეაყოვნოს; მოკლე timeout კი შემდეგ **ერთადერთ** რეპლიკას გადატვირთავს.                                                                                                                                                                                                                                      |

**Probe-ების მატრიცა** (ასევე იხილეთ [Kubernetes-ის probe-ების რეკომენდაციები](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                  | სამიზნე                                                         | არ გამოიყენოთ                                                              |
| ---------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| სიცოცხლისუნარიანობა    | TCP `PORT`-ზე (ნაგულისხმევად `20128`), ან რბილი HTTP `/healthz` | `/api/monitoring/health`                                                   |
| მზადყოფნა              | HTTP `GET /healthz`                                             | მკაცრი timeout-ები, რომლებიც event loop-ის დატვირთულობას გათიშვად მიიჩნევს |
| ღრმა / ადამიანებისთვის | `/api/monitoring/health`                                        | kubelet-ის ავტომატიზებული სიცოცხლისუნარიანობის შემოწმება                   |

**განახლებები:** მოელოდეთ ყველა სესიის გაწყვეტას. თუ შეგიძლიათ, კლიენტების მოთხოვნები წინასწარ დაასრულეთ; ნაგულისხმევ SQLite-ზე rolling update არ არსებობს. Compose-ის `restart: unless-stopped` და Docker-ის `HEALTHCHECK` ასევე ჩაანაცვლებს ერთადერთ პროცესს, როდესაც კონტეინერი არაჯანსაღ მდგომარეობაშია — ზემოქმედების არეალი იგივეა.

Kubernetes-ის ფრაგმენტი **ერთი რეპლიკისთვის** (Recreate აუცილებელია; ერთ SQLite ფაილთან `replicas` არ გაზარდოთ):

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

`preStop`-ის დაყოვნება საშუალებას აძლევს kube-ს, SIGTERM-მდე Service-ის endpoint-ები ამოიღოს, რათა **ახალი** ტრაფიკი შეწყვეტის პროცესში მყოფ პროცესთან აღარ მოხვდეს. მიმდინარე `/v1/responses` SSE მძიმე admission lease-ების მეშვეობით იცლება მაქსიმუმ `SHUTDOWN_TIMEOUT_MS`-ის განმავლობაში (ნაგულისხმევად 30 წმ) (#11015). ახალი მოთხოვნები, რომლებიც მაინც მიაღწევს პროცესს, მიიღებს `503` + `Retry-After: 5` პასუხს. Recreate-ის ცარიელი endpoint-ის შუალედი, სანამ შემცვლელი მზად გახდება, სრულ გათიშვად რჩება — ეს SQLite-ის ტოპოლოგიის შედეგია და არა probe-ის არასწორი კონფიგურაციის.

გარე Postgres / მრავალჩამწერიანი მაღალი ხელმისაწვდომობა **არ არის** დოკუმენტირებული სტანდარტული გზა. თუ მაღალი ხელმისაწვდომობა გჭირდებათ, შეინარჩუნეთ ერთი რეპლიკა ან გამოიყენეთ ტოპოლოგია, რომელიც პროექტმა ცალკე გამოსცადა და დაადოკუმენტირა. Postgres/MySQL-ზე მუშაობა მიმდინარეობს [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-ში. მის გამოშვებამდე **დიდი** `/v1/responses` მოთხოვნების გამტარუნარიანობის გაზრდის ერთადერთი მხარდაჭერილი გზა არის N დამოუკიდებელი პროცესი (შემდეგი განყოფილება) და არა `replicas > 1` ერთ volume-ზე.

## ჰორიზონტალური მასშტაბირება: N დამოუკიდებელი პროცესი

ერთი Node პროცესი არის **ერთი V8 heap**. ორი ერთმანეთის გადამფარავი ~3 MiB / ~750k-token მოცულობის coding-agent-ის `POST /v1/responses` მოთხოვნა (RTK + Caveman) ამ heap-ს ~12 GiB-ზე ავარიულად წყვეტს (`FATAL ERROR: Reached heap limit`) და შეუძლია 16 GiB-იანი cgroup-ის OOM გამოიწვიოს. იხილეთ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). ეს გაზომვა **მეხსიერების ბიუჯეტის** გაფრთხილებაა და არა პროდუქტში ჩაშენებული მაქსიმალური ზღვარი ორი პარალელური ხანგრძლივი `/v1/responses` მოთხოვნისთვის. რესურსტევადი ჩატის მიღება იზღუდება ავტომატურად გამოთვლილი შემომავალი ბაიტების ბიუჯეტით (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), რომლის ზომაც იმავე V8/cgroup ზღვრის მიხედვით განისაზღვრება — უკვე შესაბამისი ზომის პროცესისთვის მისი ხელით გაზრდა (ან მოთხოვნების რაოდენობაზე დაფუძნებული მოძველებული `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ზღვრის დაყენება) კვლავ იწვევს ავარიულ შეწყვეტას. მცირე ჩატები, `/healthz`, `/v1/models` და MCP ამ ზღვარში **არ** შედის.

### ერთი პროცესი: ორზე მეტი ხანგრძლივი `/v1/responses`

**ჯანმრთელ** პროცესს (heap არის `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-ზე დაბლა, ნაგულისხმევად `0.75`) **შეუძლია** ორზე მეტი პარალელური ხანგრძლივი `POST /v1/responses` მოთხოვნის შესრულება, თუ პროცესის დონეზე inflight-ბაიტების ბიუჯეტში (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ჯერ კიდევ არის ადგილი. `OMNIROUTE_CHAT_LARGE_BODY_BYTES`-ის ტოლი ან მასზე დიდი სხეულები (ნაგულისხმევად 256 KiB) იღებენ იმავე რესურსტევად lease-ს, რასაც სტრუქტურულად რთული მოთხოვნები, და იყენებენ იმავე [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` გამონაკლისს (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). ათობით პარალელური ხანგრძლივი SSE კლიენტი (ოპერატორებს ხშირად 40–50 სჭირდებათ) **მეხსიერების ბიუჯეტის** საკითხია — სათანადოდ განსაზღვრეთ heap-ის ზომა, ძირითადი/headroom სლოტები და `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — და არა პროდუქტში ჩაშენებული „მაქს. 2“ ზღვარი. დატვირთული heap კვლავ უარყოფს მოთხოვნებს ხელახლა ცდადი `503` პასუხით, რათა #7849 არ განმეორდეს.

**რამდენიმე heap-ის** (დამოუკიდებელი V8 old-space-ების) მისაღებად **დღესვე**:

| გააკეთეთ                                                                                                                                                                                                        | არ გააკეთოთ                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| გაუშვით **N კონტეინერი/pod**, თითოეული თავისი **საკუთარი** `DATA_DIR`-ით / volume-ით                                                                                                                            | არ დააყენოთ `replicas > 1` ერთი SQLite ფაილისთვის                                    |
| რესურსტევადი inflight-მოთხოვნებისა და healthy-headroom-ის ზომები განსაზღვრეთ heap-ის / inflight-ბაიტების ბიუჯეტიდან; 1–2 არის #7849-ის კონსერვატიული ნაგულისხმევი მნიშვნელობა და არა პროდუქტის მკაცრი მაქსიმუმი | არ გამოუყოთ ერთ პროცესს 8× RAM და რაოდენობის შეუზღუდავი ზღვარი                       |
| სურვილისამებრ: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **გაზიარებული კვოტის მრიცხველებისთვის**                                                                                                     | არ მიიჩნიოთ Redis გაზიარებულ SQLite-ად — ის ასეთი არ არის                            |
| დააკოპირეთ პროვაიდერის საიდუმლოებები თითოეულ ინსტანციაში (ან შეეგუეთ განცალკევებულ dashboard-ებს)                                                                                                               | არ მოელოდოთ ერთ dashboard-ს / ერთიან call-log-ს ყველა ინსტანციისთვის                 |
| წინ განათავსეთ ნებისმიერი load balancer; API key-ის ან სესიის მიხედვით sticky-მარშრუტიზაცია საკმარისია                                                                                                          | არ მოითხოვოთ კონკრეტულ მომწოდებელზე დამოკიდებული, ზომის გამთვალისწინებელი middleware |

აპარატურული რესურსები: თითოეულ ინსტანციაზე პარალელური ხანგრძლივი `/v1/responses` მოთხოვნების რაოდენობა **მეხსიერების ბიუჯეტის** საკითხია (heap + inflight-ბაიტები / #10110). N დამოუკიდებელი `DATA_DIR` კვლავ ამრავლებს heap-ების რაოდენობას: ჰოსტის RAM უნდა ფარავდეს `N × cgroup`-ს და არა „ერთ 16 GiB-იან pod-ს N=8-ით“. არასოდეს გამოიყენოთ `replicas > 1` ერთი SQLite ფაილისთვის.

Compose-ის მონახაზი (ორი heap, ორი volume — არა `deploy.replicas: 2`):

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

პროცესის შიგნით სიმჭიდროვე (კომპრესიის HTTP isolate-იდან გატანა) აღწერილია [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)-ში. გაზიარებულ მდგრად მდგომარეობაზე დაფუძნებული ერთი ლოგიკური კლასტერი აღწერილია [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-ში.

## მნიშვნელოვანი შენიშვნები

- **SQLite WAL რეჟიმი:** `docker stop`-ს დასრულების საშუალება უნდა მიეცეს, რათა OmniRoute-მა უახლესი ცვლილებების `storage.sqlite`-ში საკონტროლო წერტილის სახით ჩაწერა შეძლოს. თანდართულ Compose ფაილებში გაჩერებისთვის უკვე მითითებულია 40-წამიანი საშეღავათო პერიოდი. თუ image-ს პირდაპირ უშვებთ, შეინარჩუნეთ `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** დააყენეთ `true`, თუ რეგულარულ/ჩაწერამდე სარეზერვო ასლებს გარე სისტემა მართავს. არსებული მონაცემთა ბაზის მიგრაციებისთვის კვლავ საჭიროა ცალკე, საიმედო დამცავი snapshot და მასობრივი მიგრაციის დამცავი მექანიზმი.
- **მონაცემთა მუდმივი შენახვა:** კონტეინერის გადატვირთვებს შორის მონაცემთა ბაზის, გასაღებებისა და კონფიგურაციების შესანარჩუნებლად ყოველთვის დაამონტაჟეთ volume მისამართზე `/app/data`.
- **პორტის კონფიგურაცია:** ნაგულისხმევი `20128` პორტის შესაცვლელად გადაწერეთ `PORT` გარემოს ცვლადი.

## ასევე იხილეთ

- [VM-ზე განთავსების სახელმძღვანელო](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare-ის კონფიგურაცია
- [Fly.io-ზე განთავსების სახელმძღვანელო](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-ზე განთავსება
- [გარემოს კონფიგურაცია](../reference/ENVIRONMENT.md) — `.env`-ის სრული ცნობარი
