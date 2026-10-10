# 🐳 Docker Guide — OmniRoute (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> ឯកសារយោងពេញលេញសម្រាប់ការដាក់ឱ្យដំណើរការជាមួយ Docker។ សម្រាប់ការចាប់ផ្ដើមរហ័ស សូមមើល [ផ្នែក Docker ក្នុង README](../README.md#-docker)។

## មាតិកា

- [ដំណើរការរហ័ស](#quick-run)
- [ជាមួយឯកសារបរិស្ថាន](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ប្រូហ្វាល់ដែលមាន](#available-profiles)
- [ការកំណត់រចនាសម្ព័ន្ធឧបករណ៍ CLI របស់ម៉ាស៊ីនមេ នៅពេល OmniRoute ដំណើរការក្នុង Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose សម្រាប់ផលិតកម្ម](#production-compose)
- [ដំណាក់កាល Dockerfile](#dockerfile-stages)
- [អថេរបរិស្ថានសំខាន់ៗ](#critical-environment-variables)
- [Docker Compose ជាមួយ Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [ស្លាក Image](#image-tags)
- [ភាពអាចប្រើបាន៖ SQLite លំនាំដើមគាំទ្រតែ replica មួយ](#availability-default-sqlite-is-single-replica)
- [កំហុសតាមតំបន់របស់ Gemini នៅក្នុង Docker](#gemini-regional-errors-inside-docker)
- [កំណត់សម្គាល់សំខាន់ៗ](#important-notes)

---

## ដំណើរការរហ័ស

> **ចង់បង្ហោះដោយខ្លួនឯងដោយប្រើ command តែមួយមែនទេ?** សូមមើល
> [មគ្គុទ្ទេសក៍បង្ហោះដោយខ្លួនឯង](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image ដែលបានបោះផ្សាយ +
> Redis, សម្រាប់តែ loopback, មិនចាំបាច់ជ្រើសរើសប្រូហ្វាល់)។ ការដំណើរការរហ័សខាងក្រោមគឺជា
> វិធីសាស្ត្រ container តែមួយ សម្រាប់អ្នកប្រើប្រាស់ដែលដំណើរការ Redis នៅកន្លែងផ្សេងរួចហើយ។

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## ជាមួយឯកសារបរិស្ថាន

```bash
# ជាដំបូង ចម្លង និងកែសម្រួល .env
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
# ប្រូហ្វាល់មូលដ្ឋាន (គ្មានឧបករណ៍ CLI)
docker compose --profile base up -d

# ប្រូហ្វាល់ CLI (មាន Claude Code, Codex និង OpenClaw ស្រាប់)
docker compose --profile cli up -d

# ប្រូហ្វាល់ម៉ាស៊ីនមេ (ផ្តោតលើ Linux; ម៉ោន binary របស់ CLI ពីម៉ាស៊ីនមេជារបៀបបានតែអាន)
docker compose --profile host up -d

# ប្រូហ្វាល់វេប (Chromium/Playwright សម្រាប់អ្នកផ្តល់សេវាដែលប្រើសម័យវេប)
docker compose --profile web up -d

# បញ្ចូល CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## ប្រូហ្វាល់ដែលមាន

OmniRoute ផ្តល់ជូនប្រូហ្វាល់ Compose សម្រាប់ទម្រង់ការដាក់ឱ្យដំណើរការចម្បងៗ។ ជ្រើសរើសប្រូហ្វាល់ដែលត្រូវនឹងបរិស្ថានរបស់អ្នក។

| ប្រូហ្វាល់        | សេវាកម្ម         | ពេលដែលគួរប្រើ                                                                                                                                             | Command                                      |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (លំនាំដើម) | `omniroute-base` | ម៉ាស៊ីនមេគ្មានផ្ទៃប្រទាក់ / runtime អប្បបរមា ដោយមិនភ្ជាប់មកជាមួយ CLI របស់អ្នកផ្តល់សេវា                                                                    | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | លំហូរការងារបែបភ្នាក់ងារដែលហៅ `omniroute providers/setup/doctor` និង CLI ដែលភ្ជាប់មកជាមួយ (Codex, Claude Code, Droid, OpenClaw)                            | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | ម៉ាស៊ីន Linux ដែលចង់បានការចូលប្រើ CLI របស់ម៉ាស៊ីនមេស្រដៀងនឹង `network_mode` តាមរយៈការម៉ោន `~/.local/bin`, `~/.codex`, `~/.claude` ជាដើម ក្នុងរបៀបបានតែអាន | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | ដំណើរការ [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar លើ port `8317` សម្រាប់ធ្វើប្រូកស៊ីទៅកាន់ CLI ខាងលើ                           | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | អ្នកផ្តល់សេវាដែលប្រើសម័យវេប និងត្រូវការកម្មវិធីរុករក៖ `gemini-web`, `claude-web`, `claude-turnstile` (បង្កើត `runner-web` និងរួមបញ្ចូល Chromium)          | `docker compose --profile web up -d`         |

> អាចបញ្ចូលប្រូហ្វាល់ច្រើនជាមួយគ្នាបាន៖ `docker compose --profile cli --profile cliproxyapi up -d`។

## ការកំណត់រចនាសម្ព័ន្ធឧបករណ៍ CLI លើ host នៅពេល OmniRoute ដំណើរការក្នុង Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` និងប៊ូតុង
**រក្សាទុកការកំណត់រចនាសម្ព័ន្ធ** របស់ dashboard សុទ្ធតែសរសេរឯកសារដូចជា `~/.codex/*.config.toml`។ Path ទាំងនោះ
មានន័យតែលើម៉ាស៊ីនដែល CLI កំពុងដំណើរការពិតប្រាកដប៉ុណ្ណោះ។ ប្រសិនបើដំណើរការពួកវានៅក្នុង
container ការសរសេរនឹងទៅដល់ home ផ្ទាល់ខ្លួនរបស់ container (`/home/node` —
image ដំណើរការជា `USER node`) ដែល CLI នៅលើ host នឹងមិនអានជាដាច់ខាត ហើយវានឹងត្រូវ
លុបចោលភ្លាមៗនៅពេល container ត្រូវបានបង្កើតឡើងវិញ។

OmniRoute រកឃើញស្ថានភាពនេះ ហើយបដិសេធការសរសេរ ព្រមទាំងផ្តល់ការណែនាំជំនួសឱ្យ
ការរាយការណ៍ថាជោគជ័យ ដែលអ្នកមិនអាចប្រើបាន៖ CLI បញ្ចប់ដោយលេខកូដ `2` ហើយ API ឆ្លើយតប `422`
ជាមួយ `containerEphemeralTarget: true`។

### បានណែនាំ៖ ដំណើរការ CLI លើ host និង OmniRoute ក្នុង Docker

Container ផ្តល់សេវា API ចំណែក CLI កំណត់រចនាសម្ព័ន្ធឧបករណ៍នៅលើ host របស់អ្នក។

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # តម្រង់ CLI ទៅកាន់ container
omniroute setup-codex                      # សរសេរទៅកាន់ ~/.codex ពិតប្រាកដនៅលើ host របស់អ្នក
```

នេះជាជម្រើសត្រឹមត្រូវ នៅពេល Codex, Claude Code, Cursor ឬឧបករណ៍ស្រដៀងគ្នា ដំណើរការលើ
កុំព្យូទ័រយួរដៃរបស់អ្នក — ដែលជាការរៀបចំប្រើប្រាស់ទូទៅ។

### ជម្រើសផ្សេង៖ bind-mount ថត config របស់ host (profile `host`)

ប្រសិនបើអ្នកចង់ឱ្យ container ខ្លួនវាសរសេរ config របស់ host អ្នក សូម mount
ថតទាំងនោះចូល ហើយតម្រង់ `CLI_CONFIG_HOME` ទៅកាន់ mount root។ Profile `host`
បានធ្វើដូច្នេះរួចហើយ៖

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount គឺជាអ្វីដែលធ្វើឱ្យ path អាចទុកចិត្តបាន៖ OmniRoute អាន
`/proc/self/mountinfo` ហើយអនុញ្ញាតឱ្យសរសេរទៅកាន់ path ដែលបាន mount (និងទៅកាន់ថត
ដែលថតកូនរបស់វាជា mount ដែលត្រូវគ្នាពិតប្រាកដនឹងទម្រង់ `/host-home` ខាងលើ) ខណៈដែល
នៅតែបដិសេធ path ដែលមិនបាន mount។

### មធ្យោបាយបម្រុង៖ កំណត់រចនាសម្ព័ន្ធ CLI ផ្ទាល់ខ្លួនរបស់ container (ប្រើដោយប្រុងប្រយ័ត្ន)

នៅពេល CLI ពិតជាស្ថិតនៅក្នុង container (profile `cli`) ការសរសេរនោះ
គឺធ្វើឡើងដោយចេតនា។ ផ្តល់ `--allow-container-write` ទៅ command `setup-*` ណាមួយ ឬកំណត់
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` សម្រាប់ server។ ការសរសេរនឹងបន្ត
ជាមួយការព្រមានថា វានឹងមិនស្ថិតស្ថេរបន្ទាប់ពី container នោះទេ។

> **ការព្រមានសុវត្ថិភាព — profile `cli` + ការ mount `docker.sock`។**
> Profile `cli` ធ្វើ bind-mount `/var/run/docker.sock` ដើម្បីឱ្យ
> auto-updater ក្នុង container អាចបង្កើត stack ឡើងវិញពី daemon របស់ host
> (`src/lib/system/autoUpdate.ts` ពិនិត្យរក socket នោះ ហើយរំលង
> Docker path នៅពេលវាមិនមាន)។ Socket នោះគឺជា **ព្រំដែនទំនុកចិត្តកម្រិត root របស់ host**៖
> អ្វីក៏ដោយដែលអាចចូលប្រើវា អាចបញ្ជា Docker daemon របស់ host ក្នុងនាមជា
> root — វាអាចបង្កើត ត្រួតពិនិត្យ បញ្ឈប់ និងលុប container ណាមួយនៅលើ host។
> ផលប៉ះពាល់រួមមាន៖
>
> 1. **កុំបង្ហាញ port របស់ profile `cli` ទៅកាន់បណ្តាញជាដាច់ខាត។** Publish
>    វានៅលើ `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profile `cli` ដែលអាចចូលប្រើបានពី LAN នឹងបម្លែង RCE កម្រិត dashboard ណាមួយទៅជា
>    ការគ្រប់គ្រង host ទាំងស្រុង។
> 2. **កុំ bind ថតបន្ថែមណាមួយរបស់ host ចូលទៅក្នុង profile `cli`។**
>    Docker socket បូកនឹង mount បន្ថែមណាមួយ ផ្តល់ឱ្យ container នូវសិទ្ធិ
>    អាន/សរសេរពេញលេញលើប្រព័ន្ធឯកសារ និង config របស់ host អ្នក។ ប្រសិនបើអ្នកត្រូវការឱ្យឧបករណ៍មួយ
>    មើលឃើញ project សូមដំណើរការវានៅលើម៉ាស៊ីនផ្ទាល់ជាមួយ CLI binary — កុំ mount វា
>    ចូលទៅក្នុង container `cli`។
>
> ប្រសិនបើអ្នកមិនត្រូវការ auto-update ក្នុង container ទេ សូមកុំបើក profile `cli`
> (`COMPOSE_PROFILES=core,redis` ឬខ្លីជាងនេះ)។ Profile ផ្សេងទៀតមិន
> mount Docker socket ទេ។
>
> សូមមើល `docs/security/MITM-TPROXY-DECRYPT.md` (git; មិនត្រូវបាន compile ចូលក្នុង `/docs`) សម្រាប់ threat model ដែលពាក់ព័ន្ធ
> ជុំវិញ MITM និង `docs/security/SUPPLY_CHAIN.md` សម្រាប់ខ្សែប្រភពដើមនៃ binary
> `codex`/`claude-code`/`droid`/`openclaw`។

## Redis Sidecar

OmniRoute ពឹងផ្អែកលើ Redis ដើម្បីគាំទ្រកម្មវិធីកំណត់អត្រាបែបចែកចាយ និងឃ្លាំងសម្ងាត់រួម។ សេវា `redis` ត្រូវបាន **កំណត់ជានិច្ច** នៅក្នុង `docker-compose.yml` (វាមិនមានការកំណត់តាម profile ទេ) ហើយចាប់ផ្ដើមជាមួយ profile ផ្សេងទៀតណាមួយ។

| ព័ត៌មានលម្អិត                            | តម្លៃ                                      |
| ---------------------------------------- | ------------------------------------------ |
| Image                                    | `redis:7-alpine`                           |
| ឈ្មោះ container                          | `omniroute-redis`                          |
| Port ខាងក្នុង                            | `6379`                                     |
| Port របស់ host (អាចកំណត់ជំនួស)           | `REDIS_PORT` (លំនាំដើមគឺ `6379`)           |
| អាសយដ្ឋាន bind របស់ host (អាចកំណត់ជំនួស) | `REDIS_BIND_HOST` (លំនាំដើមគឺ `127.0.0.1`) |
| Volume                                   | `omniroute-redis-data` → `/data`           |
| ការពិនិត្យសុខភាព                         | `redis-cli ping` (ចន្លោះពេល 10 វិនាទី)     |

អថេរបរិស្ថានដែលពាក់ព័ន្ធ៖

- `REDIS_URL` — ខ្សែអក្សរតភ្ជាប់ដែលត្រូវបានបញ្ចូលទៅក្នុងកម្មវិធី (លំនាំដើមគឺ `redis://redis:6379`)។
- `REDIS_PORT` — ការផ្គូផ្គង port ខាង host សម្រាប់ Redis container។
- `REDIS_BIND_HOST` — interface របស់ host ដែល port ត្រូវបានផ្សព្វផ្សាយនៅលើនោះ។ លំនាំដើមគឺ `127.0.0.1`។

> **ហេតុអ្វីបានជាប្រើ loopback ជាលំនាំដើម៖** sidecar ដំណើរការដោយគ្មាន `requirepass` ហើយ container
> របស់កម្មវិធីចូលប្រើវាតាមរយៈបណ្ដាញ compose (`redis:6379`) — port ដែលបានផ្សព្វផ្សាយមាន
> សម្រាប់តែឧបករណ៍ខាង host ប៉ុណ្ណោះ (`redis-cli`, `npm run dev` នៅលើម៉ាស៊ីន)។ ការផ្សព្វផ្សាយនៅលើ
> `0.0.0.0` នឹងបើកឱ្យរាល់ host នៅក្នុង LAN របស់អ្នកចូលប្រើ Redis ដែលគ្មានការផ្ទៀងផ្ទាត់។ ប្រសិនបើអ្នកកំណត់
> `REDIS_BIND_HOST=0.0.0.0` សូមបន្ថែម `--requirepass` ទៅកាន់ `command:` របស់សេវាផងដែរ។

**ការបិទ Redis** មិនត្រូវបានណែនាំទេ (កម្មវិធីកំណត់អត្រានឹងបន្ទាបទៅប្រើការបម្រុងទុកក្នុងអង្គចងចាំ)។ ប្រសិនបើអ្នកត្រូវតែធ្វើ សូមលុប/ដាក់ជា comment លើប្លុកសេវា `redis:` ក្នុង `docker-compose.yml` ឬកំណត់ scale របស់វាទៅសូន្យ៖

```bash
docker compose up -d --scale redis=0
```

## Production Compose

សម្រាប់ snapshot ផលិតកម្មដាច់ដោយឡែកដែលដំណើរការជាមួយបរិស្ថានអភិវឌ្ឍន៍ សូមប្រើ `docker-compose.prod.yml`។

| ព័ត៌មានលម្អិត               | តម្លៃ                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| ឯកសារ                       | `docker-compose.prod.yml`                                                                   |
| Port លំនាំដើមរបស់ dashboard | `PROD_DASHBOARD_PORT=20130` (ផ្គូផ្គងទៅ port ខាងក្នុង `${DASHBOARD_PORT:-20128}`)           |
| Port លំនាំដើមរបស់ API       | `PROD_API_PORT=20131`                                                                       |
| Image                       | `omniroute:prod` (បាន build ពី target `runner-cli`)                                         |
| Redis container             | `omniroute-redis-prod` (`redis:8.6.2`, ប្រើ volume `redis-prod-data` ដាច់ដោយឡែក)            |
| Data volume                 | `omniroute-prod-data` (មានឈ្មោះ និងត្រូវបានរក្សាទុកឆ្លងកាត់ការបង្កើតឡើងវិញ)                 |
| ការពិនិត្យសុខភាព            | `node healthcheck.mjs` + `redis-cli ping` ដោយ `depends_on` រង់ចាំរហូតដល់ Redis មានសុខភាពល្អ |

របៀបប្រើប្រាស់៖

```bash
# Build និងចាប់ផ្ដើម production stack
docker compose -f docker-compose.prod.yml up -d --build

# បង្ហាញ logs ជាបន្តបន្ទាប់
docker compose -f docker-compose.prod.yml logs -f

# បិទ stack (រក្សាទុក volumes)
docker compose -f docker-compose.prod.yml down
```

Prod stack ដំណើរការស្របគ្នាជាមួយ dev compose (ឈ្មោះ container, port និង volume ខុសគ្នា) ដូច្នេះអ្នកអាចបន្តកែសម្រួល និងសាកល្បងនៅលើម៉ាស៊ីនមូលដ្ឋាន ខណៈដែល production នៅតែដំណើរការ។

## ដំណាក់កាល Dockerfile

Repository នេះភ្ជាប់មកជាមួយ Dockerfile ពហុដំណាក់កាល (`Dockerfile`)។ មានដំណាក់កាលចំនួនបួនសម្រាប់ប្រើប្រាស់; សូមជ្រើសរើស `target` ដែលត្រឹមត្រូវសម្រាប់ករណីប្រើប្រាស់របស់អ្នក។

| ដំណាក់កាល     | Base image            | គោលបំណង                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | ដំឡើង dependencies (`npm ci --legacy-peer-deps`) និងដំណើរការ `npm run build` (ប្រើ Turbopack តាមលំនាំដើម — សូមមើលធនធានពេល build ខាងក្រោម)                                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Runtime សម្រាប់ production ជាមួយលទ្ធផល standalone របស់ Next.js។ **មិនមាន CLI របស់ provider ភ្ជាប់មកជាមួយទេ។**                                                                                                                                                                                          |
| `runner-cli`  | `runner-base`         | បន្ថែម `git`, `docker.io`, `docker-compose` និង CLI ជាសកល៖ `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`។ **សូមជ្រើសរើសវាសម្រាប់ workflow ដែលប្រើ agent។**                                                                                                                         |
| `runner-web`  | `runner-base`         | បន្ថែម Playwright + កម្មវិធីរុករក Chromium (`--with-deps`) សម្រាប់ provider ដែលប្រើ web session៖ `gemini-web`, `claude-web`, `claude-turnstile`។ **សូមជ្រើសរើសវានៅពេលអ្នកប្រើ provider ទាំងនោះ** — image ធម្មតានឹងបរាជ័យនៅពេល request បើគ្មានវា (សូមមើលកំណត់ចំណាំ `-web` ក្រោមផ្នែក Release Channels)។ |

Build target ជាក់លាក់មួយដោយផ្ទាល់៖

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ធនធានពេល build

Build args ចំនួនបីកំណត់បរិមាណធនធានដែលដំណាក់កាល `builder` ប្រើប្រាស់។ ពួកវាមានប្រសិទ្ធភាពតែក្នុងពេល build ប៉ុណ្ណោះ —
`OMNIROUTE_MEMORY_MB` (ខាងក្រោម) គឺជាការកំណត់សម្រាប់ runtime ដាច់ដោយឡែក។

| Build arg                   | លំនាំដើម | ប្រសិទ្ធភាព                                                                                  |
| --------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` build ដោយប្រើ webpack៖ ប្រើ memory អតិបរមាតិចជាង ប៉ុន្តែយឺតជាង។ `1` ជ្រើសប្រើ Turbopack។ |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | ដែនកំណត់ V8 heap (`--max-old-space-size`) សម្រាប់ `next build` ដែលត្រូវបានចាប់ផ្ដើម។         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | បញ្ជូនតម្លៃទៅ `CIRCLE_NODE_TOTAL`; Next កំណត់ `workers = N - 1` សម្រាប់ការប្រមូល page-data។  |

`OMNIROUTE_BUILD_WORKERS` គឺជាតម្លៃដែលត្រូវបង្កើននៅលើ builder ដែលមានធនធានច្រើន ហើយជាតម្លៃដែលត្រូវ
សង្ស័យនៅពេល build ដែលមានធនធានកំណត់ត្រូវបានបញ្ឈប់ **បន្ទាប់ពី** `✓ Compiled successfully`។ Worker
សម្រាប់ page-data នីមួយៗគឺជា process ដាច់ដោយឡែក ហើយ parent `next build` ខ្លួនវាក៏ដូចគ្នា;
ការធ្វើតេស្តជាក់ស្ដែងឡើងវិញលើ VPS (issue #7518) បានវាស់ឃើញ peak RSS របស់ process នីមួយៗនៅ
~4.5 GB ដោយមិនអាស្រ័យលើ heap flag របស់ `NODE_OPTIONS` ឡើយ (Turbopack compile ក្នុង
native/Rust memory ដែលនៅក្រៅ V8 heap)។ តម្លៃលំនាំដើម `2` (→ 1 worker, សរុប 2
processes) ត្រូវបានកំណត់សម្រាប់ runner ដែល host ដោយ GitHub ដែលមាន 16 GB / 4 vCPU និងត្រូវបាន
ប្រើដោយ publish pipeline។ នៅតម្លៃ `8` (→ 7 workers) runner នោះអស់ memory ហើយ
buildkit បានបរាជ័យនៅជំហាននោះដោយមាន `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) នៅតែមិនអាចដំណើរការបាន បន្ទាប់ពី per-process RSS ត្រូវបានវាស់
ដោយផ្ទាល់ជំនួសឱ្យការប៉ាន់ស្មាន។ `tests/unit/docker-build-memory-budget.test.ts`
ធ្វើការគណនាដោយផ្អែកលើតម្លៃដែលបានវាស់ ហើយនឹងបរាជ័យ ប្រសិនបើការកំណត់ណាមួយក្នុងចំណោមទាំងពីរ
លើសសមត្ថភាពរបស់ runner។

Turbopack compile ក្នុង native Rust memory ដែលស្ថិតនៅ **ក្រៅ** V8 heap ដូច្នេះ
`OMNIROUTE_BUILD_MEMORY_MB` មិនកំណត់ព្រំដែនវាទេ។ នៅលើ host ដែលមានដែនកំណត់ memory
build នឹងត្រូវបាន OOM killer បញ្ជូន SIGKILL ដោយគ្មានអត្ថបទ error ទាល់តែសោះ — វាគ្រាន់តែ
ឈប់នៅពាក់កណ្ដាល `Creating an optimized production build` ដែលធ្វើឱ្យវាមើលទៅដូចជាគាំង
ជាជាងអស់ memory។ នេះជាមូលហេតុដែល `Dockerfile` ប្រើ webpack តាមលំនាំដើម
(`OMNIROUTE_USE_TURBOPACK=0`) ខុសពី `npm run dev` / `npm run build` ដែល
Turbopack ជាលំនាំដើមរបស់កូដ៖ `docker build .` ធម្មតាដែលគ្មាន build args (ជាអ្វីដែល
Railway និង host ដំឡើងដោយចុចតែមួយផ្សេងទៀតដំណើរការ) មិនត្រូវបរាជ័យដោយស្ងៀមស្ងាត់នៅលើ
builder ដែលមានដែនកំណត់ memory ទេ។ Image ដែលបាន publish ក៏បានបញ្ជូន
`OMNIROUTE_USE_TURBOPACK=0` យ៉ាងច្បាស់នៅក្នុង `docker-publish.yml` រួចហើយ។ នៅលើ
builder ដែលមាន RAM ច្រើន សូមជ្រើសប្រើ Turbopack ដើម្បីឱ្យ build លឿនជាងមុន៖

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ត្រូវបានបើក ដូច្នេះ `next build` ដំណើរការ process មេ **និង** process
worker ហើយ process នីមួយៗគោរពតាម `OMNIROUTE_BUILD_MEMORY_MB` ដោយឡែកពីគ្នា។ កំណត់ដែន
memory របស់ container ឱ្យលើសប្រហែលពីរដងនៃតម្លៃនោះ មិនមែនត្រឹមមួយដងទេ។

តម្លៃដែលបានវាស់លើ source tree នេះ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`)៖

| Bundler   | ដែន memory របស់ container | លទ្ធផល                                       |
| --------- | ------------------------- | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB            | ត្រូវបាន OOM-killed នៅទាំងពីរ ដោយស្ងៀមស្ងាត់ |
| webpack   | 8 GiB                     | build worker ត្រូវបាន SIGKILL                |
| webpack   | 12 GiB                    | ជោគជ័យ ដោយ peak ឡើងដល់ 11.1 GiB              |

### តម្លៃលំនាំដើមសម្រាប់ runtime

តម្លៃលំនាំដើមដែល export ដោយ `runner-base`៖ `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`។

ឥរិយាបថ memory នៅក្នុង Docker៖

- Image នេះកំណត់ `OMNIROUTE_MEMORY_MB=1024` ហើយទាញយក `NODE_OPTIONS=--max-old-space-size=1024` ពីវា។
- ដំណើរការ server ជាក់ស្តែងត្រូវបានចាប់ផ្ដើមដោយ standalone launcher ដែលអាន `OMNIROUTE_MEMORY_MB` ហើយបន្ថែម `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`។
- Node ប្រើតម្លៃ `--max-old-space-size` ដែលបានធ្វើម្តងទៀតចុងក្រោយ ដូច្នេះការកំណត់ `OMNIROUTE_MEMORY_MB` គ្រប់គ្រងដែនកំណត់ heap ដែលមានប្រសិទ្ធភាពរបស់ Docker។
- ដោយសារ image តែងតែកំណត់វា fallback ដែលកែតម្រូវតាម RAM របស់ launcher ផ្ទាល់មិនដែលត្រូវបានអនុវត្តនៅក្រោម Docker ទេ។ បង្កើនវាដោយជាក់លាក់សម្រាប់ workload (តារាងខាងក្រោម)។ `2048` នៅតែតូចពេកសម្រាប់ coding-agent `/v1/responses`។

### RAM ពេលដំណើរការសម្រាប់ coding agents

តម្លៃលំនាំដើម 1 GiB របស់ Docker គឺជាកម្រិតអប្បបរមាសម្រាប់ dashboard/light-chat មិនមែនជាទំហំសម្រាប់ production ទេ។ ខ្លឹមសារ `POST /v1/responses` វែងៗ (សាររាប់រយ និង tools រាប់សិប) រក្សាទុក graph ច្រើននៅក្នុង memory អំឡុងពេល compression។ Request ពីរដែលត្រួតគ្នា ទំហំប្រហែល ~3 MiB / ~750k-token បានធ្វើឱ្យ V8 បញ្ឈប់នៅ old-space ទំហំ **12 GiB** (`FATAL ERROR: Reached heap limit`) ហើយក៏បានប៉ះ cgroup OOM ទំហំ 16 GiB ផងដែរ។ សូមមើល [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)។

កំណត់ទំហំ **cgroup `--memory` ឱ្យធំជាង heap** — native buffers, SQLite និងទិន្នន័យបណ្ដោះអាសន្នសម្រាប់ compression ស្ថិតនៅខាងក្រៅ V8។

| Workload                                     | `OMNIROUTE_MEMORY_MB`            | Container / cgroup             | កំណត់សម្គាល់                                                                                                         |
| -------------------------------------------- | -------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Dashboard និង light chat មួយ                 | `1024` (តម្លៃលំនាំដើមរបស់ image) | ≥2 GiB                         |                                                                                                                      |
| Coding agent មួយ (Claude/Codex/Grok)         | `8192`                           | ≥10 GiB                        | `/v1/responses` សម្រាប់ session តែមួយជាទូទៅ                                                                          |
| `/v1/responses` វែងពីរដែលដំណើរការព្រមគ្នា    | `10240`–`12288`                  | ≥12–16 GiB                     | បានវាស់ឃើញថា V8 បញ្ឈប់នៅ heap ប្រហែល ~12 GiB                                                                         |
| Context វែងៗដែលដំណើរការព្រមគ្នាចាប់ពីបីឡើងទៅ | កុំដំណើរការលើ process តែមួយ      | ដំណើរការតាមលំដាប់ / បន្ថែម RAM | ការអនុញ្ញាត workload ធ្ងន់តាមលំនាំដើមគឺ 1 in-flight; ការបង្កើនវាដោយមិនបន្ថែម RAM នឹងធ្វើឱ្យការបញ្ឈប់នេះកើតឡើងម្តងទៀត |

`omniroute serve` លើ bare metal កែតម្រូវតាម RAM ប្រហែល ~35% (កំណត់ក្នុងចន្លោះ `[512, 4096]`) នៅពេល `OMNIROUTE_MEMORY_MB` **មិនត្រូវបានកំណត់**។ Docker តែងតែកំណត់ `1024` ដូច្នេះការកែតម្រូវនេះមិនដែលដំណើរការនៅក្នុង image ផ្លូវការទេ។

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## អថេរបរិស្ថានសំខាន់ៗ

ក្រៅពីតម្លៃលំនាំដើមដែលបានចងក្រងជាឯកសារនៅក្នុង [ENVIRONMENT.md](../reference/ENVIRONMENT.md) អថេរខាងក្រោមមានសារៈសំខាន់បំផុតនៅពេលដំណើរការក្រោម Docker៖

| អថេរ                          | គោលបំណង                                                                                                                                                                                                                                                                             | លំនាំដើម                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | ពាក្យសម្ងាត់រួមសម្រាប់ WebSocket bridge។ **តម្រូវឱ្យមានក្នុងបរិស្ថានផលិតកម្ម** — កំណត់វាជាខ្សែអក្សរចៃដន្យដែលមានសុវត្ថិភាពខ្ពស់។                                                                                                                                                     | មិនបានកំណត់ (ត្រូវតែផ្តល់ឱ្យ) |
| `REDIS_URL`                   | ខ្សែអក្សរតភ្ជាប់សម្រាប់ rate limiter / cache backend                                                                                                                                                                                                                                | `redis://redis:6379`          |
| `REDIS_PORT`                  | ច្រកនៅផ្នែក host សម្រាប់ Redis container ដែលបានភ្ជាប់មកជាមួយ                                                                                                                                                                                                                        | `6379`                        |
| `REDIS_BIND_HOST`             | ចំណុចប្រទាក់ host ដែលច្រក Redis ដែលបានភ្ជាប់មកជាមួយត្រូវបានផ្សព្វផ្សាយនៅលើ (loopback លុះត្រាតែអ្នកបន្ថែម AUTH)                                                                                                                                                                      | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ផ្លូវនៅលើ host ដែលត្រូវបាន mount ចូលក្នុង profile `cli` នៅ `/workspace/omniroute` សម្រាប់លំហូរការងារ self-update                                                                                                                                                                    | `.` (ថតបច្ចុប្បន្ន)           |
| `OMNIROUTE_MEMORY_MB`         | កម្រិតអតិបរមា Node heap ពេលដំណើរការសម្រាប់ម៉ាស៊ីនមេ Docker standalone; កំណត់ជំនួសលំនាំដើមរបស់ image ខាងលើ។ សម្រាប់ភ្នាក់ងារសរសេរកូដ៖ `8192`+ (សូមមើល [RAM ពេលដំណើរការ](#runtime-ram-for-coding-agents))។                                                                            | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | កំណត់ជំនួសច្រកដែលត្រូវបានបង្ហាញសម្រាប់ dashboard (20128) និង API (20129)                                                                                                                                                                                                            | `20128` / `20129`             |
| `APP_BIND_HOST`               | ចំណុចប្រទាក់ host ដែល docker-compose ផ្សព្វផ្សាយច្រក dashboard/API/live-WS នៅលើ។ ជាមួយ `REQUIRE_API_KEY=false` (ជាលំនាំដើម) `0.0.0.0` នឹងបង្ហាញ proxy `/v1` ដែលមិនទាមទារការផ្ទៀងផ្ទាត់ទៅកាន់ LAN — ពង្រីកការចូលប្រើតែជាមួយ `REQUIRE_API_KEY=true` ឬ reverse proxy នៅខាងមុខប៉ុណ្ណោះ។ | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | ចំណុចប្រទាក់ host ដែល docker-compose ផ្សព្វផ្សាយ sidecar `cliproxyapi` នៅលើ — data volume របស់វាផ្ទុកព័ត៌មានសម្គាល់អត្តសញ្ញាណរបស់ provider។                                                                                                                                         | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | ថតដែល runtime plugin scanner អាន និងដំឡើងចូល។ កំណត់វានៅពេល plugins ត្រូវបាន bind-mounted៖ លំនាំដើមអនុវត្តតាម `HOME` ដែល image មិនចាំបាច់ export ទេ។                                                                                                                                 | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | ផ្លូវរង URL នៅពេលកម្មវិធីត្រូវបានផ្សព្វផ្សាយនៅពីក្រោយ reverse proxy (ឧ. `/omniroute`)                                                                                                                                                                                               | _(ទទេ = root)_                |
| `NEXT_PUBLIC_BASE_URL`        | ប្រភពដើមសាធារណៈរបស់ browser ដែលរួមបញ្ចូលផ្លូវរង (ឧ. `https://host/omniroute`)                                                                                                                                                                                                       | មិនបានកំណត់                   |
| `PROD_DASHBOARD_PORT`         | ច្រក dashboard នៅផ្នែក host សម្រាប់ `docker-compose.prod.yml`                                                                                                                                                                                                                       | `20130`                       |
| `CLIPROXYAPI_PORT`            | ច្រកនៅផ្នែក host សម្រាប់ sidecar `cliproxyapi`                                                                                                                                                                                                                                      | `8317`                        |

## ប្រូកស៊ីបញ្ច្រាសលើផ្លូវរង (Traefik / nginx)

`basePath` របស់ Next.js ត្រូវបានចងក្រងបញ្ចូលទៅក្នុង standalone bundle។ OmniRoute កត់ត្រា
តម្លៃដែលបានបង្កប់ក្នុងឯកសារ sentinel នៅ root របស់កម្មវិធី (ត្រូវបានសរសេរអំឡុងពេល `npm run build`; និងអានដោយ
`scripts/docker/ensure-docker-base-path.mjs`) ហើយប្រៀបធៀបវាជាមួយ
`OMNIROUTE_BASE_PATH` នៅពេល container ចាប់ផ្ដើម។ នៅពេលតម្លៃទាំងពីរខុសគ្នា ហើយ image ត្រូវបាន
build សម្រាប់ domain root នោះ entrypoint នឹងសរសេរ standalone manifests ឡើងវិញ ព្រមទាំង
literal `basePath`/`assetPrefix` ដែលបានបង្កប់ (Next 16 render URL របស់ asset សម្រាប់ SSR ដោយប្រើតែ
`assetPrefix` ប៉ុណ្ណោះ — patcher នឹងចម្លងផ្លូវរងទៅក្នុងវាផងដែរ), URL របស់ asset
`/_next/static` ដែលបានបង្កប់ (client-reference manifests, media imports និងទំព័រកំហុសដែលបាន prerender)
និង shim `process.env` របស់ client មុនពេល `node dev/run-standalone.mjs`
ដំណើរការ។

### Compose build (បានណែនាំ)

កំណត់អថេរទាំងពីរក្នុង `.env` បន្ទាប់មក build ឡើងវិញ ដើម្បីឱ្យ image និង runtime ស្របគ្នា៖

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` បញ្ជូនបន្ត `OMNIROUTE_BASE_PATH` ជា Docker build-arg និងជា
អថេរបរិស្ថាន runtime។

### Root image ដែលបាន build ជាមុន + ផ្លូវរង runtime

Image `diegosouzapw/omniroute:*` ដែលបានបោះពុម្ព ត្រូវបាន build សម្រាប់ domain root។ អ្នកនៅតែអាច
កំណត់ `OMNIROUTE_BASE_PATH` នៅពេល runtime បាន; container នឹង patch bundle ម្ដងនៅពេលចាប់ផ្ដើម។
ត្រូវផ្គូផ្គងវាជាមួយ public origin ដែលត្រូវគ្នា៖

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

កំណត់រចនាសម្ព័ន្ធប្រូកស៊ីបញ្ច្រាសឱ្យបញ្ជូនបន្តផ្លូវខាងក្រៅ **ទាំងមូល** (កុំដក
prefix ចេញ)។ Traefik គួរតែ route `PathPrefix(`/omniroute`)` ទៅកាន់ container ដោយគ្មាន
`StripPrefix` ដើម្បីឱ្យ Next.js ទទួលបាន `/omniroute/...` និងបម្រើ asset ពី
`/omniroute/_next/...`។

Docker healthcheck ធ្វើការ probe លើ lifecycle endpoint `/healthz` ដ៏ស្រាល ដែលមាន
prefix ជា `OMNIROUTE_BASE_PATH` សកម្ម។ `/api/monitoring/health` នៅតែអាចប្រើបានសម្រាប់
ការធ្វើរោគវិនិច្ឆ័យដោយមនុស្ស/dashboard; ដើម្បីបង្វែរ HEALTHCHECK របស់ container ឱ្យប្រើវាវិញ (ឧទាហរណ៍
សម្រាប់ការអនុវត្ត deep health យ៉ាងតឹងរ៉ឹង) សូមកំណត់ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`។
ផ្លូវនោះជាការត្រួតពិនិត្យ **deep** (DB + សេចក្ដីសង្ខេប monitoring) — សមស្របសម្រាប់
`HEALTHCHECK` ដែលមិនញឹកញាប់របស់ Docker ប្រសិនបើអ្នកជ្រើសរើសប្រើវាវិញ ប៉ុន្តែ **មិន** សមស្របសម្រាប់ interval របស់ Kubernetes `livenessProbe`
ទេ។

សម្រាប់ orchestrator (Kubernetes, Nomad ជាដើម)៖

| Probe           | គួរប្រើ                                                       | គួរជៀសវាង                                            |
| --------------- | ------------------------------------------------------------- | ---------------------------------------------------- |
| Liveness        | HTTP `GET /livez` ឬ TCP លើ port មេ (`PORT`, លំនាំដើម `20128`) | ការប្រើ `/api/monitoring/health` ជា liveness         |
| Readiness       | HTTP `GET /healthz`                                           | timeout ខ្លីពេកដែលចាត់ទុក event-loop រវល់ថាបានស្លាប់ |
| Deep / blackbox | `/api/monitoring/health`                                      | —                                                    |

`/healthz` រាយការណ៍អំពី lifecycle របស់ process (`ok` / `starting` / `stopping`)។ `/livez` គ្រាន់តែ
ពិនិត្យថា process នៅរស់ប៉ុណ្ណោះ (200 នៅពេលណាដែល handler អាចដំណើរការ; វាមិនរង់ចាំ
readiness ទេ)។ ទាំងពីរនៅតែដំណើរការលើ Node event loop ដូចគ្នានឹងការគ្រប់គ្រង request ដែរ ដូច្នេះ
ការងារ catalog ឬ compression ដែលប្រើ CPU ច្រើនអាចពន្យារពេលពួកវា — រវល់ ≠ ស្លាប់។ គួរប្រើ TCP
liveness ប្រសិនបើ HTTP probe អស់ពេល។ សេចក្ដីណែនាំពេញលេញអំពី probe៖
[មគ្គុទ្ទេសក៍ Monitoring — អនុសាសន៍សម្រាប់ Kubernetes probe](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)។

## Docker Compose ជាមួយ Caddy (HTTPS Auto-TLS)

OmniRoute អាចត្រូវបានដាក់ឱ្យប្រើប្រាស់ដោយសុវត្ថិភាព ដោយប្រើការផ្តល់ SSL ដោយស្វ័យប្រវត្តិរបស់ Caddy។ សូមប្រាកដថា DNS A record របស់ដែនរបស់អ្នកចង្អុលទៅកាន់ IP របស់ម៉ាស៊ីនមេអ្នក។

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
      # ប្រភពដើមដែលបង្ហាញទៅកម្មវិធីរុករក សម្រាប់ OAuth callbacks តំណ dashboard និង URL សាធារណៈដែលបានបង្កើត។
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL ខាងក្នុងពីម៉ាស៊ីនមេទៅម៉ាស៊ីនមេ សម្រាប់កិច្ចការដែលបានកំណត់ពេល / ការទាញយកពីខ្លួនឯង។
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

Caddy កំណត់ forwarding headers ស្តង់ដារសម្រាប់ container ខាងលើ។ OmniRoute ប្រើ
`NEXT_PUBLIC_BASE_URL` ជាប្រភពដើមសាធារណៈតាមបទដ្ឋាន សម្រាប់ OAuth callbacks និងតំណសាធារណៈដែលបានបង្កើត។
ការសរសេរទិន្នន័យក្នុង dashboard ដែលបានផ្ទៀងផ្ទាត់ ប្រើសំណើ same-origin រួមជាមួយការការពារ CSRF
ដែលភ្ជាប់ទៅនឹង session។ បើក `OMNIROUTE_TRUST_PROXY` សម្រាប់តែការដាក់ឱ្យប្រើប្រាស់កម្រិតខ្ពស់ ដែលអ្នកមានបំណង
ឱ្យ OmniRoute កំណត់ប្រភពដើមសាធារណៈពី forwarded headers ដែលទុកចិត្ត ជំនួសឱ្យការកំណត់រចនាសម្ព័ន្ធ
ដោយច្បាស់លាស់។

## Cloudflare Quick Tunnel

ការគាំទ្រ dashboard សម្រាប់ការដាក់ឱ្យប្រើប្រាស់តាម Docker រួមមាន **Cloudflare Quick Tunnel** ដែលអាចបើកដោយចុចម្តង នៅលើ `Dashboard → Endpoints`។ ការបើកជាលើកដំបូង ទាញយក `cloudflared` តែនៅពេលត្រូវការ ចាប់ផ្តើម tunnel បណ្តោះអាសន្នទៅកាន់ endpoint `/v1` បច្ចុប្បន្នរបស់អ្នក និងបង្ហាញ URL `https://*.trycloudflare.com/v1` ដែលបានបង្កើត នៅខាងក្រោម URL សាធារណៈធម្មតារបស់អ្នកដោយផ្ទាល់។

ផ្ទាំង tunnel របស់ endpoint (Cloudflare, Tailscale, ngrok) អាចត្រូវបានបង្ហាញ ឬលាក់ពី `Settings → Appearance` ដោយមិនផ្លាស់ប្តូរស្ថានភាព tunnel ដែលកំពុងសកម្ម។

### កំណត់សម្គាល់អំពី Tunnel

- URL របស់ Quick Tunnel គឺបណ្តោះអាសន្ន ហើយផ្លាស់ប្តូរបន្ទាប់ពីការចាប់ផ្តើមឡើងវិញរាល់លើក។
- Quick Tunnels មិនត្រូវបានស្តារឡើងវិញដោយស្វ័យប្រវត្តិ បន្ទាប់ពីការចាប់ផ្តើម OmniRoute ឬ container ឡើងវិញទេ។ សូមបើកពួកវាឡើងវិញពី dashboard នៅពេលត្រូវការ។
- ការដំឡើងដែលបានគ្រប់គ្រង បច្ចុប្បន្នគាំទ្រ Linux, macOS និង Windows លើ `x64` / `arm64`។
- Managed Quick Tunnels ប្រើ HTTP/2 transport ជាលំនាំដើម ដើម្បីជៀសវាងការព្រមានអំពី QUIC UDP buffer ដែលរំខាន នៅក្នុងបរិស្ថាន container ដែលមានធនធានកំណត់។ កំណត់ `CLOUDFLARED_PROTOCOL=quic` ឬ `auto` ប្រសិនបើអ្នកចង់បាន transport ផ្សេង។
- Docker images រួមបញ្ចូល system CA roots ហើយបញ្ជូនពួកវាទៅកាន់ `cloudflared` ដែលបានគ្រប់គ្រង ដើម្បីជៀសវាងបញ្ហាបរាជ័យនៃការទុកចិត្ត TLS នៅពេល tunnel ចាប់ផ្តើមនៅក្នុង container។
- កំណត់ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ប្រសិនបើអ្នកចង់ឱ្យ OmniRoute ប្រើ binary ដែលមានស្រាប់ ជំនួសឱ្យការទាញយកថ្មី។

## Image Tags

| Image                    | Tag      | ទំហំ   | ការពិពណ៌នា                                                           |
| ------------------------ | -------- | ------ | -------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer មានស្ថិរភាពដែលបាន **ចេញផ្សាយ** ខ្ពស់បំផុត (មិនមែន git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | កំណត់ tag ប្រភេទនេះឱ្យថេរសម្រាប់ GitOps                              |

Multi-platform manifest៖ `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi)។ Docker ជ្រើសរើសស្ថាបត្យកម្មដែលត្រូវគ្នាដោយស្វ័យប្រវត្តិ។ បញ្ជូន `--platform linux/amd64` ប្រសិនបើអ្នកត្រូវការបង្ខំឱ្យប្រើ AMD64 emulation លើ ARM hosts។

### Release Channels

OmniRoute ចេញផ្សាយ Docker channels ដាច់ដោយឡែកសម្រាប់ stable releases ការសាកល្បង release-branch ដែលកំពុងសកម្ម និង development builds។

| Channel                         | ប្រភព                                            | ភាពអាចផ្លាស់ប្តូរបាន                    | ការប្រើប្រាស់ដែលបានណែនាំ                                                                                                          |
| ------------------------------- | ------------------------------------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned release                         | មិនអាចផ្លាស់ប្តូរបាន                    | ការដាក់ឱ្យប្រើប្រាស់ក្នុង production ដែលកំណត់ release ជាក់លាក់ឱ្យថេរ                                                              |
| `:latest` / `:latest-web`       | SemVer មានស្ថិរភាពដែលបាន **ចេញផ្សាយ** ខ្ពស់បំផុត | ទ្រនិច stable ដែលអាចផ្លាស់ប្តូរបាន      | តាមដាន stable releases **បន្ទាប់ពី** កិច្ចការចេញផ្សាយ SemVer — **មិន** តាមដាន `main` ឬ commits `release/v*` ដែលមិនទាន់បានចេញផ្សាយ |
| `:next` / `:next-web`           | branch `release/v*` លំនាំដើមបច្ចុប្បន្ន          | ទ្រនិច pre-release ដែលអាចផ្លាស់ប្តូរបាន | សាកល្បងការកែតម្រូវដែលបានបញ្ចូលក្នុង release branch សកម្ម ប៉ុន្តែមិនទាន់មាននៅក្នុង stable release                                  |
| `:main` / `:main-web`           | branch `main`                                    | ទ្រនិច development ដែលអាចផ្លាស់ប្តូរបាន | សម្រាប់តែ development និង integration testing                                                                                     |

#### Web-session providers៖ images `-web`

Channel នីមួយៗខាងលើក៏មាន tag `-web` ផងដែរ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ដែលបាន build ពី stage `runner-web` — ជា image ដូចគ្នា ប៉ុន្តែបន្ថែម Playwright និងកម្មវិធីរុករក Chromium។ Image ធម្មតាត្រូវបានផ្តល់ជូន **ដោយគ្មាន** Chromium។ `gemini-web`, `claude-web` និង `claude-turnstile` ត្រូវការវា។

បញ្ហាបរាជ័យត្រូវបានពន្យារពេល មិនមែនកើតឡើងនៅពេលចាប់ផ្តើមទេ៖ providers ទាំងនោះរាយម៉ូដែលរបស់ពួកវា និងបង្ហាញថាបានភ្ជាប់នៅក្នុង dashboard ហើយមានតែសំណើដំបូងប៉ុណ្ណោះដែលបរាជ័យជាមួយ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

ប្រសិនបើអ្នកប្រើ providers ទាំងនោះ សូមទាញយក tag `-web` របស់ channel ដែលអ្នកកំពុងប្រើ — មិនមានអ្វីផ្សេងទៀតផ្លាស់ប្តូរទេ។ សម្រាប់ការដំឡើង npm/CLI (គ្មាន Docker image) ផ្នែកដែលខ្វះសមមូលគឺ browser binary៖ ដំណើរការ `npx playwright install chromium` លើ host។

#### ការប្រើប្រាស់ pre-release channel

ឆានែល `next` ត្រូវបាន build ឡើងវិញរាល់ពេលមានការ push ទៅកាន់ branch លំនាំដើម `release/v*` បច្ចុប្បន្ន ហើយត្រូវបាន publish សម្រាប់ទាំង AMD64 និង ARM64។ Branch ថែទាំចាស់ៗមិនអាចសរសេរជាន់លើវាបានទេ។ ឆានែលនេះផ្តល់ image ដែលអាច pull បាន សម្រាប់ការកែបញ្ហាដែលបាន merge ចូលក្នុង release branch សកម្ម មុនពេល stable tag បន្ទាប់ត្រូវបានបង្កើត។

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

សម្រាប់ Docker Compose សូមកំណត់ជំនួស image tag ដែល profile បានជ្រើសរើសប្រើ បន្ទាប់មក pull និងបង្កើត service ឡើងវិញ៖

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### សុវត្ថិភាព និងការត្រឡប់ទៅកំណែមុន

`next` គឺជាឆានែល pre-release ដែលប្រែប្រួលជានិច្ច។ វាអាចផ្លាស់ប្តូរនៅពេលមានការ push ណាមួយទៅកាន់ release branch សកម្ម ហើយវា **មិនត្រូវបានគាំទ្រសម្រាប់ការប្រើប្រាស់ក្នុង production ទេ**។ សូម pin image digest នៅពេលវាយតម្លៃ build ជាក់លាក់មួយ៖

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

មុនពេលសាកល្បង សូមបម្រុងទុក OmniRoute data volume ឬ data directory ដែលបាន bind-mount។ ដើម្បីត្រឡប់ទៅកំណែមុន សូមស្ដារកំណែ stable ឬ digest ដែលបានប្រើពីមុន ហើយបង្កើត container ឡើងវិញ៖

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build ពី release branch មិនអាចផ្លាស់ទី `latest` បានឡើយ។ មានតែកំណែ semantic stable ដែលមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់ប៉ុណ្ណោះ ដែលអាច promote ទ្រនិច stable បាន។ Image `next` នៅតែរក្សាការត្រួតពិនិត្យ release image និងច្រកទប់ស្កាត់ភាពងាយរងគ្រោះកម្រិត CRITICAL។

**`latest` មិនមែនជាការធានាអំពីភាពថ្មីបំផុតរបស់ git ទេ។** ការកែបញ្ហាដែលបាន merge នៅលើ `main` ឬ release branch សកម្ម `release/v*` **មិនទាន់មាន** នៅក្នុង `:latest` ទេ រហូតដល់ image ដែលមាន stable SemVer ត្រូវបាន publish ហើយ publish job promote `:latest` (មាន digest ដូចគ្នានឹង SemVer នោះ)។ ប្រសិនបើ `latest` ហាក់ដូចជាមិនផ្លាស់ប្តូរ ខណៈដែល GitHub បង្ហាញការកែបញ្ហានោះរួចហើយ សូម pull `:next` ដើម្បីសាកល្បង release branch ឬរង់ចាំ SemVer tag។

| អ្វីដែលអ្នកចង់បាន                                                   | ប្រើ                               |
| ------------------------------------------------------------------- | ---------------------------------- |
| GitOps / production ដែលត្រូវតែមិនមានការប្រែប្រួលដោយស្វ័យប្រវត្តិ    | Pin `:X.Y.Z` (ឬ image digest)      |
| តាមដាន stable ដែលបាន publish និងទទួលយកការបង្កើតឡើងវិញនៅរាល់ release | `:latest`                          |
| សាកល្បង commit របស់ `release/v*` ដែលមិនទាន់បាន release              | `:next` (មិនមែនសម្រាប់ production) |
| សាកល្បង `main`                                                      | `:main` (មិនមែនសម្រាប់ production) |

## ភាពអាចប្រើបាន៖ SQLite លំនាំដើមគាំទ្រតែ replica តែមួយ

OmniRoute លំនាំដើមលើ Docker / Kubernetes គឺជា **ដំណើរការ Node មួយ + កម្មវិធីសរសេរ SQLite មួយ**។ ភាពអាចប្រើបានខ្ពស់ **មិនត្រូវបានគាំទ្រ** លើ topology នេះទេ។

| កម្រិតកំណត់                                         | ផលវិបាក                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| កម្មវិធីសរសេរតែមួយ                                  | **កុំ** ដំណើរការ replica ច្រើនលើឯកសារ SQLite តែមួយ។ វានឹងធ្វើឱ្យ DB ខូច។                                                                                                                                                                                                                                                                        |
| បង្កើតឡើងវិញ / ចាប់ផ្ដើមឡើងវិញ / បិទដោយ HEALTHCHECK | **ដាច់សេវាទាំងស្រុង** សម្រាប់ SSE ដែលកំពុងដំណើរការ, session របស់ dashboard និង state ក្នុងអង្គចងចាំ។ client ដែលបានភ្ជាប់ទាំងអស់នឹងដាច់។ request ថ្មីក្នុងអំឡុងពេលដែលគ្មាន endpoint នឹងទទួលបាន **`502 Bad Gateway: Unknown error`** ពី reverse proxy មិនមែន OmniRoute JSON ទេ — client មិនអាចបែងចែកវាចេញពីការបរាជ័យរបស់ provider បានទេ (#11015)។ |
| ប្រើ event loop ដូចគ្នានឹង `/healthz`               | ដំណើរការ catalog ឬ compression tick ដែលជាប់រវល់អាចពន្យារពេល probe; បន្ទាប់មក timeout ខ្លីនឹងចាប់ផ្ដើម replica **តែមួយគត់** ឡើងវិញ។                                                                                                                                                                                                              |

**តារាង probe** (សូមមើលផងដែរ [ការណែនាំអំពី probe របស់ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations))៖

| Probe                    | គោលដៅ                                                          | កុំប្រើ                                                       |
| ------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------- |
| Liveness                 | TCP លើ `PORT` (លំនាំដើម `20128`) ឬ HTTP `/healthz` បែបទន់ភ្លន់ | `/api/monitoring/health`                                      |
| Readiness                | HTTP `GET /healthz`                                            | timeout ខ្លីពេកដែលចាត់ទុក event loop ជាប់រវល់ថាបានឈប់ដំណើរការ |
| ពិនិត្យស៊ីជម្រៅ / មនុស្ស | `/api/monitoring/health`                                       | liveness ស្វ័យប្រវត្តិរបស់ kubelet                            |

**ការដំឡើងកំណែ៖** រំពឹងថា session ទាំងអស់នឹងដាច់។ ផ្ទេរ client ចេញជាមុន ប្រសិនបើអាចធ្វើបាន; មិនមាន rolling update លើ SQLite លំនាំដើមទេ។ Compose `restart: unless-stopped` រួមជាមួយ Docker `HEALTHCHECK` ក៏នឹងជំនួសដំណើរការតែមួយគត់ នៅពេល container ស្ថិតក្នុងស្ថានភាព Unhealthy — វាមានវិសាលភាពផលប៉ះពាល់ដូចគ្នា។

ឧទាហរណ៍កំណត់រចនាសម្ព័ន្ធ Kubernetes សម្រាប់ **replica តែមួយ** (តម្រូវឱ្យប្រើ Recreate; កុំបង្កើន `replicas` លើឯកសារ SQLite តែមួយ)៖

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

ការរង់ចាំរបស់ `preStop` អនុញ្ញាតឱ្យ kube ដក endpoint របស់ Service ចេញមុន SIGTERM ដូច្នេះ traffic **ថ្មី** ឈប់ចូលទៅកាន់ដំណើរការដែលកំពុងបិទ។ SSE របស់ `/v1/responses` ដែលកំពុងដំណើរការ ត្រូវបានទុកឱ្យបញ្ចប់រហូតដល់ `SHUTDOWN_TIMEOUT_MS` (លំនាំដើម 30 វិនាទី) តាមរយៈ heavyweight admission leases (#11015)។ request ថ្មីដែលនៅតែទៅដល់ដំណើរការនឹងទទួលបាន `503` + `Retry-After: 5`។ ចន្លោះពេលដែលគ្មាន endpoint របស់ Recreate រហូតដល់ replacement រួចរាល់ នៅតែជាការដាច់សេវាទាំងស្រុង — នេះជាលក្ខណៈរបស់ topology SQLite មិនមែនជាការកំណត់ probe ខុសទេ។

Postgres ខាងក្រៅ / multi-writer HA **មិនមែន** ជាវិធីស្តង់ដារដែលបានចងក្រងជាឯកសារទេ។ ប្រសិនបើអ្នកត្រូវការ HA សូមរក្សា replica តែមួយ ឬដំណើរការ topology ដែលគម្រោងបានសាកល្បង និងចងក្រងជាឯកសារដាច់ដោយឡែក។ ការងារ Postgres/MySQL ស្ថិតនៅក្នុង [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)។ រហូតដល់មុខងារនោះត្រូវបានចេញផ្សាយ វិធីតែមួយគត់ដែលត្រូវបានគាំទ្រសម្រាប់ពង្រីកសមត្ថភាព `/v1/responses` **ធំៗ** គឺដំណើរការឯករាជ្យ N (ផ្នែកបន្ទាប់) មិនមែន `replicas > 1` លើ volume តែមួយទេ។

## ពង្រីកចេញក្រៅ: ដំណើរការឯករាជ្យ N

ដំណើរការ Node មួយគឺជា **V8 heap មួយ**។ Coding-agent `POST /v1/responses` ពីរ (RTK + Caveman) ដែលត្រួតគ្នា និងមានទំហំប្រហែល ~3 MiB / ~750k-token ធ្វើឱ្យ heap នោះបញ្ឈប់នៅប្រហែល ~12 Gi (`FATAL ERROR: Reached heap limit`) ហើយអាចបង្ក OOM ដល់ cgroup ទំហំ 16 Gi។ សូមមើល [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)។ ការវាស់វែងនោះគឺជាការព្រមានអំពី **ថវិកាអង្គចងចាំ** មិនមែនជាកម្រិតអតិបរមាថេររបស់ផលិតផល ដែលអនុញ្ញាតត្រឹមតែ `/v1/responses` រយៈពេលវែងពីរក្នុងពេលដំណាលគ្នានោះទេ។ ការទទួលយក chat ដែលប្រើធនធានខ្ពស់ ត្រូវបានគ្រប់គ្រងដោយថវិកាបៃសម្រាប់ ingest ដែលបានគណនាដោយស្វ័យប្រវត្តិ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ដោយកំណត់ទំហំផ្អែកលើពិដាន V8/cgroup ដូចគ្នានោះ — ការកំណត់វាឡើងខ្ពស់ជាងនេះ (ឬការកំណត់កម្រិតចំនួនសំណើចាស់ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) លើដំណើរការដែលបានកំណត់ទំហំរួច នឹងនាំឱ្យមានការបញ្ឈប់ឡើងវិញ។ Chat តូចៗ, `/healthz`, `/v1/models` និង MCP **មិន** ស្ថិតនៅក្នុងកម្រិតនោះទេ។

### ដំណើរការមួយ: `/v1/responses` រយៈពេលវែងច្រើនជាងពីរ

ដំណើរការដែលមានស្ថានភាព **ល្អប្រក្រតី** (heap ទាបជាង `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, លំនាំដើម `0.75`) **អាច** ដំណើរការ `POST /v1/responses` រយៈពេលវែងច្រើនជាងពីរក្នុងពេលដំណាលគ្នា នៅពេលថវិកាបៃ inflight ទូទាំងដំណើរការ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) នៅមានទំហំទំនេរ។ Body ដែលមានទំហំស្មើ ឬធំជាង `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (លំនាំដើម 256 KiB) ប្រើ heavyweight lease ដូចគ្នានឹងសំណើដែលមានរចនាសម្ព័ន្ធស្មុគស្មាញ ហើយប្រើច្រកជំនួស `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ដូចគ្នាពី [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)។ ការមាន client SSE រយៈពេលវែងរាប់សិបក្នុងពេលដំណាលគ្នា (ជាញឹកញាប់ operator ត្រូវការ 40–50) គឺជាបញ្ហា **ថវិកាអង្គចងចាំ** — ត្រូវកំណត់ទំហំ heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — មិនមែនជាកម្រិតថេររបស់ផលិតផល “អតិបរមា 2” នោះទេ។ Heap ដែលស្ថិតក្រោមសម្ពាធ នៅតែបដិសេធបន្ទុកដោយប្រើ `503` ដែលអាចសាកល្បងឡើងវិញបាន ដើម្បីកុំឱ្យបញ្ហា #7849 កើតឡើងវិញ។

ដើម្បី **គុណចំនួន heap** (V8 old-spaces ឯករាជ្យ) **នៅពេលនេះ**៖

| គួរធ្វើ                                                                                                                                                   | មិនគួរធ្វើ                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| ដំណើរការ **container/pod ចំនួន N** ដោយនីមួយៗមាន `DATA_DIR` / volume **ផ្ទាល់ខ្លួន**                                                                       | កំណត់ `replicas > 1` ឱ្យប្រើឯកសារ SQLite តែមួយ                  |
| កំណត់ទំហំ heavy in-flight + healthy-headroom តាម heap / ថវិកាបៃ inflight; 1–2 គឺជាលំនាំដើមបែបប្រុងប្រយ័ត្នរបស់ #7849 មិនមែនជាកម្រិតអតិបរមាថេររបស់ផលិតផលទេ | ផ្តល់ RAM 8× ឱ្យដំណើរការមួយ និងកម្រិតចំនួនដែលគ្មានព្រំដែន       |
| ជាជម្រើស៖ `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` សម្រាប់ **counter កូតារួម**                                                                | ចាត់ទុក Redis ជា SQLite រួម — វាមិនមែនដូច្នោះទេ                 |
| ចម្លង secret របស់ provider ទៅក្នុង instance នីមួយៗ (ឬទទួលយក dashboard ដែលបែងចែកដាច់ដោយឡែក)                                                                | រំពឹងថាមាន dashboard មួយ / call-log មួយសម្រាប់ instance ទាំងអស់ |
| ដាក់ load balancer ណាមួយនៅខាងមុខ; sticky តាម API key ឬ session គឺគ្រប់គ្រាន់                                                                              | តម្រូវឱ្យមាន middleware ដែលដឹងពីទំហំ និងជាក់លាក់តាម vendor      |

ផ្នែក hardware៖ ចំនួន `/v1/responses` រយៈពេលវែងក្នុងពេលដំណាលគ្នា សម្រាប់ instance នីមួយៗ គឺជាបញ្ហា **ថវិកាអង្គចងចាំ** (heap + inflight-byte / #10110)។ `DATA_DIR` ឯករាជ្យចំនួន `N` នៅតែគុណចំនួន heap៖ RAM របស់ host ត្រូវតែគ្រប់គ្រាន់សម្រាប់ `N × cgroup` មិនមែន “pod ទំហំ 16 Gi មួយដែលមាន N=8” នោះទេ។ កុំប្រើ `replicas > 1` លើឯកសារ SQLite តែមួយឱ្យសោះ។

គំរូ Compose (heap ពីរ, volume ពីរ — មិនមែន `deploy.replicas: 2`)៖

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

ដង់ស៊ីតេក្នុងដំណើរការ (បំបែក compression ចេញពី HTTP isolate) ស្ថិតនៅ [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)។ Cluster ឡូជីខលមួយនៅលើ durable state រួម ស្ថិតនៅ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)។

## កំហុសតាមតំបន់របស់ Gemini នៅក្នុង Docker

Google AI Studio / Gemini API អាចត្រឡប់ HTTP 400 ជាមួយ FAILED_PRECONDITION និង
`User location is not supported for the API use.`។ សំណើដែលជោគជ័យនៅលើ host
មិនបញ្ជាក់ថា container ប្រើផ្លូវចេញដូចគ្នានោះទេ។ លំដាប់ DNS,
ការតភ្ជាប់ IPv4/IPv6, ការកំណត់ផ្លូវ VPN និង proxy ដែលបានកំណត់ អាចខុសគ្នា។ សូមពិនិត្យ
[តំបន់ដែល Google គាំទ្រ](https://ai.google.dev/gemini-api/docs/available-regions)
ព្រមទាំងផ្លូវតភ្ជាប់ជាក់ស្តែងផងដែរ។ កំហុសនេះតែឯងមិនអាចបញ្ជាក់ថា API key មិនត្រឹមត្រូវបានទេ។

### ផ្តល់អាទិភាពដល់ proxy ជាក់លាក់សម្រាប់ការតភ្ជាប់

ប្រើ [ការកំណត់រចនាសម្ព័ន្ធ proxy សម្រាប់ការតភ្ជាប់នីមួយៗ](../ops/PROXY_GUIDE.md#4-level-proxy-system)
របស់ OmniRoute សម្រាប់ការតភ្ជាប់ Gemini ដែលរងផលប៉ះពាល់ បន្ទាប់មកធ្វើ **Test Connection** ម្តងទៀត និងផ្ញើសំណើតូចមួយ
ដោយប្រើ model ដដែល។ វាធ្វើឱ្យការផ្លាស់ប្តូរផ្លូវត្រូវបានកំណត់ត្រឹមការតភ្ជាប់នោះ។ ផ្ទៀងផ្ទាត់
ថា container អាចភ្ជាប់ទៅ proxy បាន ហើយការតភ្ជាប់ពិតជាបានជ្រើសរើស
proxy នោះ។ ការផ្លាស់ប្តូរផ្លូវមិនធានាថា upstream អនុញ្ញាតតាមតំបន់នោះទេ។

### ប្រៀបធៀបបណ្តាញរបស់ host និង container

រក្សា key, model និងសំណើឱ្យដូចគ្នា នៅពេលប្រៀបធៀបលទ្ធផលដែលបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណ។ កុំ
បិទភ្ជាប់ព័ត៌មានសម្ងាត់ ពាក្យសម្ងាត់ proxy ឬ authorization header ពេញលេញទៅក្នុង issue។
ដំបូង ពិនិត្យមើលថា OS resolver ផ្តល់ address family ណាខ្លះ ដោយប្រើ command ដូចគ្នា
នៅលើ host និងនៅក្នុង container៖

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

ជំនួស `omniroute` ដោយ service ដែលអ្នកដំណើរការ (ឧទាហរណ៍ `omniroute-web`)។ Command ទាំងនេះ
បង្ហាញ address family ដោយគ្មានព័ត៌មានសម្ងាត់ ឬអាសយដ្ឋាន IP។ តម្លៃ `6` ដែលបានត្រឡប់មកវិញ
គ្រាន់តែបង្ហាញលទ្ធផល DNS របស់ IPv6 ប៉ុណ្ណោះ៖ វា**មិន**បញ្ជាក់ថាមានផ្លូវ IPv6 ដែលអាចប្រើបាន ឬអាចចូលប្រើ API បានទេ។
នៅកន្លែងដែលបានដំឡើង `curl` សូមប្រៀបធៀប `curl -4 -I https://generativelanguage.googleapis.com`
ជាមួយ `curl -6 -I https://generativelanguage.googleapis.com` ក្នុងបរិស្ថានទាំងពីរ។
ការឆ្លើយតប HTTP បញ្ជាក់ពីការតភ្ជាប់សម្រាប់ការសាកល្បងនោះ ទោះបីជាវាជាកំហុសដែលមិនបាន
ផ្ទៀងផ្ទាត់អត្តសញ្ញាណក៏ដោយ។ មានតែសំណើ model ដែលបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណប៉ុណ្ណោះ ដែលអាចសាកល្បងសិទ្ធិប្រើប្រាស់ Gemini។

### ជម្រើសនៅកម្រិត host៖ IPv6 ដែលដំណើរការ និងគោលការណ៍ resolver

អ្នករាយការណ៍នៃ [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) បានស្ដារ
ការចូលប្រើក្នុងបរិស្ថានរបស់ពួកគេ ដោយបើក IPv6 សម្រាប់ container និងផ្លាស់ប្តូរការជ្រើសរើសអាសយដ្ឋាន
របស់ glibc។ ចាត់ទុកវិធីនេះជាជម្រើសជាក់លាក់សម្រាប់បរិស្ថាននីមួយៗ។ ផ្ទៀងផ្ទាត់ថា IPv6 របស់ host
ដំណើរការ ព្រមទាំងផ្លូវចេញ/ការកំណត់ផ្លូវរបស់ container និងច្បាប់ firewall មុនពេលកែសម្រួលចំណូលចិត្តរបស់ resolver។
អាសយដ្ឋាន ULA ឯកជនតែមួយ មិនបញ្ជាក់ថាមានការតភ្ជាប់ IPv6 សាធារណៈទេ។

សម្រាប់ service ដែលបានភ្ជាប់ទៅ default network របស់ Compose រួចហើយ fragment នេះនឹងបើក
IPv6 នៅលើ network នោះ។ សូមរក្សា service, port, volume និងការកំណត់រចនាសម្ព័ន្ធផ្សេងទៀតរបស់អ្នក៖

```yaml
networks:
  default:
    enable_ipv6: true
```

សម្រាប់ named network សូមបើកវានៅលើ network ដែល service ពិតជាបានភ្ជាប់។ Docker អាច
បែងចែក ULA subnet បាន។ ជ្រើសរើស subnet ជាក់លាក់ដែលមិនជាន់គ្នា លុះត្រាតែ network របស់អ្នក
ត្រូវការវា។ សូមមើល [បណ្តាញ IPv6 របស់ Docker](https://docs.docker.com/engine/daemon/ipv6/)
និង [ជម្រើស network របស់ Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)។

នៅលើ **image ដែលផ្អែកលើ glibc** ឯកសារ `/etc/gai.conf` អាចផ្លាស់ប្តូរការជ្រើសរើសអាសយដ្ឋាន។ Dockerfile
បច្ចុប្បន្នរបស់ repository ប្រើ Debian។ image ផ្ទាល់ខ្លួនដែលផ្អែកលើ musl មិនប្រើយន្តការនេះទេ។
ការកែសម្រួលដែលបានរាយការណ៍ ផ្លាស់ប្តូរ label របស់ ULA ពី `label fc00::/7 6` ទៅ
`label fc00::/7 1`។ ចាប់ផ្តើមពីតារាងគោលការណ៍ពេញលេញរបស់ image ហើយរក្សាទុក entry ផ្សេងទៀត
របស់វា៖ ការបន្ថែម entry `label` ឬ `precedence` នឹងជំនួសតារាងលំនាំដើមនោះ ដូច្នេះ file
ដែលមានតែបន្ទាត់ដែលបានផ្លាស់ប្តូរ គឺមិនគ្រប់គ្រាន់ទេ។
[ឯកសារយោងនៃការកំណត់រចនាសម្ព័ន្ធ glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ពិពណ៌នាអំពីអត្ថន័យទាំងនោះ។ Bind-mount file ដែលបានត្រួតពិនិត្យក្នុងទម្រង់ read-only នៅ `/etc/gai.conf`
ហើយបង្កើត service ឡើងវិញ ដើម្បីអនុវត្តវា។

វានឹងផ្លាស់ប្តូរការជ្រើសរើសអាសយដ្ឋានរបស់ OS សម្រាប់ **ចរាចរណ៍ចេញទាំងអស់នៅក្នុង container នោះ**។
វាមិនបង្ខំឱ្យ application ទាំងអស់ជ្រើសរើស IPv6 ទេ៖ លំដាប់ DNS និងការជ្រើសរើស
ការតភ្ជាប់របស់ Node ក៏មានឥទ្ធិពលផងដែរ។ ជាពិសេស `--dns-result-order=ipv4first` ផ្តល់អាទិភាពដល់ IPv4 ហើយ
មិនមែនជាដំណោះស្រាយសម្រាប់ការបរាជ័យដែលកើតមានតែលើ IPv4 ទេ។ សូមមើល [លំដាប់ DNS របស់ Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)។

សាកល្បង Gemini និង provider ផ្សេងទៀតរបស់អ្នកឡើងវិញ បន្ទាប់ពីការផ្លាស់ប្តូរណាមួយនៅកម្រិត host។ ដើម្បី rollback
សូមដក custom `gai.conf` mount ចេញ ស្ដារការកំណត់ network ពីមុន និង
បង្កើត service/network ដែលរងផលប៉ះពាល់ឡើងវិញ ក្នុងអំឡុងពេល maintenance window។ ការបង្កើត network ឡើងវិញ
អាចផ្អាក container ផ្សេងទៀតដែលភ្ជាប់ទៅវា។ កុំលុប persistent data volume។

## កំណត់សម្គាល់សំខាន់ៗ

- **របៀប SQLite WAL:** គួរអនុញ្ញាតឱ្យ `docker stop` ដំណើរការរហូតដល់ចប់ ដើម្បីឱ្យ OmniRoute អាចរក្សាទុកការផ្លាស់ប្តូរចុងក្រោយបំផុតត្រឡប់ទៅក្នុង `storage.sqlite`។ ឯកសារ Compose ដែលភ្ជាប់មកជាមួយបានកំណត់រយៈពេលអនុគ្រោះសម្រាប់ការបញ្ឈប់ចំនួន 40 វិនាទីរួចហើយ។ ប្រសិនបើអ្នកដំណើរការ image ដោយផ្ទាល់ សូមរក្សា `--stop-timeout 40`។
- **`DISABLE_SQLITE_AUTO_BACKUP`:** កំណត់ជា `true` ប្រសិនបើការបម្រុងទុកតាមកាលកំណត់/មុនពេលសរសេរ ត្រូវបានគ្រប់គ្រងដោយប្រព័ន្ធខាងក្រៅ។ ការធ្វើ migration លើមូលដ្ឋានទិន្នន័យដែលមានស្រាប់ នៅតែតម្រូវឱ្យមាន snapshot សុវត្ថិភាពដែលរក្សាទុកបានយូររបស់ខ្លួន និងរបាំងការពារសម្រាប់ mass migration។
- **ការរក្សាទុកទិន្នន័យ:** ត្រូវ mount volume ទៅកាន់ `/app/data` ជានិច្ច ដើម្បីរក្សាទុកមូលដ្ឋានទិន្នន័យ keys និងការកំណត់របស់អ្នក ឱ្យនៅដដែលឆ្លងកាត់ការចាប់ផ្តើម container ឡើងវិញ។
- **ការកំណត់ Port:** កំណត់ជំនួស environment variable `PORT` ដើម្បីផ្លាស់ប្តូរ port លំនាំដើម `20128`។

## សូមមើលផងដែរ

- [មគ្គុទ្ទេសក៍ដាក់ឱ្យដំណើរការលើ VM](../ops/VM_DEPLOYMENT_GUIDE.md) — ការដំឡើង VM + nginx + Cloudflare
- [មគ្គុទ្ទេសក៍ដាក់ឱ្យដំណើរការលើ Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — ដាក់ឱ្យដំណើរការលើ Fly.io
- [ការកំណត់ Environment](../reference/ENVIRONMENT.md) — ឯកសារយោង `.env` ពេញលេញ
