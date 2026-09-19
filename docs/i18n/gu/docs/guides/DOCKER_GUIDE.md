# 🐳 Docker Guide — OmniRoute (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> સંપૂર્ણ Docker ડિપ્લોયમેન્ટ સંદર્ભ. ઝડપી શરૂઆત માટે, [README Docker વિભાગ](../README.md#-docker) જુઓ.

## વિષયસૂચિ

- [ઝડપી રીતે ચલાવો](#quick-run)
- [એન્વાયરમેન્ટ ફાઇલ સાથે](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ઉપલબ્ધ પ્રોફાઇલ્સ](#available-profiles)
- [જ્યારે OmniRoute Dockerમાં ચાલે ત્યારે હોસ્ટ CLI ટૂલ્સને કૉન્ફિગર કરવાં](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis સાઇડકાર](#redis-sidecar)
- [પ્રોડક્શન Compose](#production-compose)
- [Dockerfile સ્ટેજિસ](#dockerfile-stages)
- [મહત્ત્વપૂર્ણ એન્વાયરમેન્ટ વેરિએબલ્સ](#critical-environment-variables)
- [Caddy (HTTPS) સાથે Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ક્વિક ટનલ](#cloudflare-quick-tunnel)
- [ઇમેજ ટૅગ્સ](#image-tags)
- [ઉપલબ્ધતા: ડિફૉલ્ટ SQLite એક જ રેપ્લિકા ધરાવે છે](#availability-default-sqlite-is-single-replica)
- [મહત્ત્વપૂર્ણ નોંધો](#important-notes)

---

## ઝડપી ચલાવવું

> **એક જ આદેશથી સ્વ-હોસ્ટ કરવું છે?** જુઓ
> [સ્વ-હોસ્ટ માર્ગદર્શિકા](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (પ્રકાશિત ઇમેજ +
> Redis, ફક્ત લૂપબૅક, પ્રોફાઇલની કોઈ પસંદગી નહીં). નીચે આપેલ ઝડપી ચલાવવાનો વિકલ્પ એવા
> વપરાશકર્તાઓ માટેનો સિંગલ-કન્ટેનર માર્ગ છે, જેઓ પહેલેથી જ અન્યત્ર Redis ચલાવે છે.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## એન્વાયરમેન્ટ ફાઇલ સાથે

```bash
# પહેલાં .envની નકલ કરો અને તેને સંપાદિત કરો
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
# બેઝ પ્રોફાઇલ (કોઈ CLI ટૂલ્સ નહીં)
docker compose --profile base up -d

# CLI પ્રોફાઇલ (Claude Code, Codex, OpenClaw બિલ્ટ-ઇન)
docker compose --profile cli up -d

# હોસ્ટ પ્રોફાઇલ (મુખ્યત્વે Linux માટે; હોસ્ટ CLI બાઇનરીઝને ફક્ત વાંચવા માટે માઉન્ટ કરે છે)
docker compose --profile host up -d

# CLI + CLIProxyAPI સાઇડકારને સંયોજિત કરો
docker compose --profile cli --profile cliproxyapi up -d
```

## ઉપલબ્ધ પ્રોફાઇલ્સ

OmniRoute ચાર Compose પ્રોફાઇલ્સ સાથે આવે છે. તમારા એન્વાયરમેન્ટને અનુરૂપ પ્રોફાઇલ પસંદ કરો.

| પ્રોફાઇલ         | સર્વિસ           | ક્યારે ઉપયોગ કરવો                                                                                                                                        | કમાન્ડ                                       |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ડિફૉલ્ટ) | `omniroute-base` | હેડલેસ સર્વર / ન્યૂનતમ રનટાઇમ, કોઈ પ્રોવાઇડર CLI સામેલ નથી                                                                                               | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` અને સામેલ CLI (Codex, Claude Code, Droid, OpenClaw)ને કૉલ કરતા એજેન્ટિક વર્કફ્લો                                      | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | એવા Linux હોસ્ટ્સ કે જે `~/.local/bin`, `~/.codex`, `~/.claude` વગેરેને ફક્ત વાંચવા માટે માઉન્ટ કરીને હોસ્ટ CLI માટે `network_mode` જેવો ઍક્સેસ ઇચ્છે છે | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | અપસ્ટ્રીમ CLI પ્રોક્સીંગ માટે પોર્ટ `8317` પર [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) સાઇડકાર ચલાવો                                  | `docker compose --profile cliproxyapi up -d` |

> બહુવિધ પ્રોફાઇલ્સને સંયોજિત કરી શકાય છે: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker માં ચાલે ત્યારે હોસ્ટ CLI ટૂલ્સને કૉન્ફિગર કરવું

`omniroute setup-codex`, `setup-claude`, `config set <tool>` અને ડૅશબોર્ડનું
**કૉન્ફિગ સાચવો** બટન, બધાં `~/.codex/*.config.toml` જેવી ફાઇલો લખે છે. આ પાથનો
અર્થ ફક્ત એ મશીન પર જ હોય છે જ્યાં CLI ખરેખર ચાલે છે. તેમને કન્ટેનરની અંદર
ચલાવવાથી ફાઇલ કન્ટેનરના પોતાના હોમમાં (`/home/node` —
ઇમેજ `USER node` તરીકે ચાલે છે) લખાય છે, જ્યાં કોઈ હોસ્ટ CLI તેને ક્યારેય વાંચશે નહીં અને
કન્ટેનર ફરી બનાવવામાં આવે તે ક્ષણે તે કાઢી નાખવામાં આવશે.

OmniRoute આ પરિસ્થિતિ ઓળખે છે અને તમે ઉપયોગ ન કરી શકો એવી સફળતા દર્શાવવાને બદલે
સૂચનાઓ સાથે લખવાની ક્રિયાનો ઇનકાર કરે છે: CLI `2` સાથે બંધ થાય છે અને API
`containerEphemeralTarget: true` સાથે `422` જવાબ આપે છે.

### ભલામણ કરેલ: CLI હોસ્ટ પર અને OmniRoute Docker માં ચલાવો

કન્ટેનર API પ્રદાન કરે છે; CLI તમારા હોસ્ટ ટૂલ્સને કૉન્ફિગર કરે છે.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI ને કન્ટેનર તરફ નિર્દેશિત કરો
omniroute setup-codex                      # તમારા હોસ્ટ પર વાસ્તવિક ~/.codex લખે છે
```

જ્યારે Codex, Claude Code, Cursor અથવા સમાન ટૂલ્સ તમારા લેપટોપ પર ચાલતા હોય ત્યારે
આ યોગ્ય પસંદગી છે — અને આ જ સામાન્ય ગોઠવણી છે.

### વૈકલ્પિક રીત: હોસ્ટ કૉન્ફિગ ડિરેક્ટરીઓને bind-mount કરો (`host` પ્રોફાઇલ)

જો તમે કન્ટેનર દ્વારા જ તમારું હોસ્ટ કૉન્ફિગ લખાવવા માંગતા હો, તો ડિરેક્ટરીઓને
માઉન્ટ કરો અને `CLI_CONFIG_HOME` ને માઉન્ટ રૂટ તરફ નિર્દેશિત કરો. `host` પ્રોફાઇલ
આ પહેલેથી જ કરે છે:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount જ પાથને વિશ્વસનીય બનાવે છે: OmniRoute
`/proc/self/mountinfo` વાંચે છે અને માઉન્ટ કરેલા પાથમાં (તેમજ એવી ડિરેક્ટરીઓમાં
જેનાં ચાઇલ્ડ પાથ માઉન્ટ થયેલા હોય, જે ઉપર દર્શાવેલા `/host-home` ના માળખા જેવું જ છે)
લખવાની મંજૂરી આપે છે, જ્યારે માઉન્ટ ન થયેલા પાથનો હજી પણ ઇનકાર કરે છે.

### અંતિમ વિકલ્પ: કન્ટેનરના પોતાના CLI ને કૉન્ફિગર કરો (સંયમપૂર્વક ઉપયોગ કરો)

જ્યારે CLI ખરેખર કન્ટેનરની અંદર જ હોય (`cli` પ્રોફાઇલ), ત્યારે લખવાની ક્રિયા
ઇરાદાપૂર્વકની હોય છે. કોઈપણ `setup-*` કમાન્ડને `--allow-container-write` આપો અથવા
સર્વર માટે `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` સેટ કરો. લખવાની ક્રિયા
એ ચેતવણી સાથે આગળ વધે છે કે તે કન્ટેનર પછી ટકી રહેશે નહીં.

> **સુરક્ષા ચેતવણી — `cli` પ્રોફાઇલ + `docker.sock` માઉન્ટ.**
> કન્ટેનરની અંદરનું ઑટો-અપડેટર હોસ્ટ ડેમનમાંથી સ્ટૅક ફરી બનાવી શકે તે માટે
> `cli` પ્રોફાઇલ `/var/run/docker.sock` ને bind-mount કરે છે
> (`src/lib/system/autoUpdate.ts` તે સૉકેટ માટે તપાસ કરે છે અને તે ગેરહાજર હોય ત્યારે
> Docker પાથને છોડી દે છે). આ સૉકેટ **host-root વિશ્વાસની સીમા**
> છે: તેના સુધી પહોંચી શકતી કોઈપણ વસ્તુ હોસ્ટ Docker ડેમનને root તરીકે નિયંત્રિત કરે છે
> — તે હોસ્ટ પરના કોઈપણ કન્ટેનરને બનાવી, તપાસી, બંધ કરી અને દૂર કરી શકે છે.
> તેના પરિણામો:
>
> 1. **`cli` પ્રોફાઇલનો પોર્ટ ક્યારેય નેટવર્ક પર પ્રગટ કરશો નહીં.** તેને
>    `127.0.0.1` પર પ્રકાશિત કરો (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN દ્વારા પહોંચી શકાય તેવી `cli` પ્રોફાઇલ ડૅશબોર્ડ-સ્તરની કોઈપણ RCE ને
>    સંપૂર્ણ હોસ્ટ કબજામાં ફેરવે છે.
> 2. **`cli` પ્રોફાઇલમાં કોઈ વધારાની હોસ્ટ ડિરેક્ટરી bind કરશો નહીં.**
>    Docker સૉકેટ સાથે કોઈપણ વધારાનું માઉન્ટ કન્ટેનરને તમારી ફાઇલસિસ્ટમ અને હોસ્ટ
>    કૉન્ફિગ પર સંપૂર્ણ વાંચવા/લખવાની ઍક્સેસ આપે છે. જો કોઈ ટૂલને પ્રોજેક્ટ જોવાની
>    જરૂર હોય, તો તેને CLI બાઇનરી વડે સ્થાનિક રીતે ચલાવો — તેને `cli` કન્ટેનરમાં
>    માઉન્ટ કરશો નહીં.
>
> જો તમને કન્ટેનરની અંદર ઑટો-અપડેટની જરૂર ન હોય, તો `cli` પ્રોફાઇલ બંધ રાખો
> (`COMPOSE_PROFILES=core,redis` અથવા તેનાથી ટૂંકું). અન્ય પ્રોફાઇલ્સ
> Docker સૉકેટ માઉન્ટ કરતા નથી.
>
> MITM સંબંધિત જોખમ મોડેલ માટે `docs/security/MITM-TPROXY-DECRYPT.md` જુઓ
> (git માં ઉપલબ્ધ; `/docs` માં કમ્પાઇલ કરેલ નથી), અને
> `codex`/`claude-code`/`droid`/`openclaw` બાઇનરીના મૂળની શૃંખલા માટે
> `docs/security/SUPPLY_CHAIN.md` જુઓ.

## Redis સાઇડકાર

OmniRoute વિતરિત રેટ લિમિટર અને શેર કરેલ કૅશ માટે Redis પર આધાર રાખે છે. `redis` સર્વિસ `docker-compose.yml`માં **હંમેશાં વ્યાખ્યાયિત** હોય છે (તેમાં કોઈ પ્રોફાઇલ ગેટ નથી) અને અન્ય કોઈપણ પ્રોફાઇલની સાથે શરૂ થાય છે.

| વિગત                   | મૂલ્ય                                   |
| ---------------------- | --------------------------------------- |
| ઇમેજ                   | `redis:7-alpine`                        |
| કન્ટેનરનું નામ         | `omniroute-redis`                       |
| આંતરિક પોર્ટ           | `6379`                                  |
| હોસ્ટ પોર્ટ (ઓવરરાઇડ)  | `REDIS_PORT` (ડિફૉલ્ટ `6379`)           |
| હોસ્ટ બાઇન્ડ (ઓવરરાઇડ) | `REDIS_BIND_HOST` (ડિફૉલ્ટ `127.0.0.1`) |
| વોલ્યુમ                | `omniroute-redis-data` → `/data`        |
| હેલ્થચેક               | `redis-cli ping` (10s અંતરાલ)           |

સંબંધિત એન્વાયર્નમેન્ટ વેરિએબલ્સ:

- `REDIS_URL` — ઍપમાં દાખલ કરવામાં આવતી કનેક્શન સ્ટ્રિંગ (ડિફૉલ્ટ રૂપે `redis://redis:6379`).
- `REDIS_PORT` — Redis કન્ટેનર માટેનું હોસ્ટ-સાઇડ પોર્ટ મેપિંગ.
- `REDIS_BIND_HOST` — હોસ્ટ ઇન્ટરફેસ કે જેના પર પોર્ટ પ્રકાશિત થાય છે. ડિફૉલ્ટ `127.0.0.1`.

> **ડિફૉલ્ટ રૂપે લૂપબૅક શા માટે:** સાઇડકાર `requirepass` વિના ચાલે છે અને ઍપ
> કન્ટેનર્સ compose નેટવર્ક (`redis:6379`) દ્વારા તેના સુધી પહોંચે છે — પ્રકાશિત પોર્ટ
> ફક્ત હોસ્ટ-સાઇડ ટૂલિંગ (`redis-cli`, સ્થાનિક `npm run dev`) માટે છે. તેને
> `0.0.0.0` પર પ્રકાશિત કરવાથી પ્રમાણીકરણ વિનાનું Redis તમારા LAN પરના દરેક હોસ્ટ માટે ખુલ્લું થઈ જશે. જો તમે
> `REDIS_BIND_HOST=0.0.0.0` સેટ કરો, તો સર્વિસના `command:`માં `--requirepass` પણ ઉમેરો.

**Redisને અક્ષમ કરવાની** ભલામણ કરવામાં આવતી નથી (રેટ લિમિટર ઇન-મેમરી ફૉલબૅક સુધી અધોગતિ પામશે). જો આવું કરવું જ પડે, તો `docker-compose.yml`માંનો `redis:` સર્વિસ બ્લૉક દૂર કરો/કમેન્ટ કરો અથવા તેને શૂન્ય સુધી સ્કેલ કરો:

```bash
docker compose up -d --scale redis=0
```

## પ્રોડક્શન Compose

ડેવની સાથે ચાલતા એક અલગ પ્રોડક્શન સ્નૅપશૉટ માટે `docker-compose.prod.yml`નો ઉપયોગ કરો.

| વિગત                   | મૂલ્ય                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| ફાઇલ                   | `docker-compose.prod.yml`                                                                  |
| ડિફૉલ્ટ ડૅશબોર્ડ પોર્ટ | `PROD_DASHBOARD_PORT=20130` (આંતરિક `${DASHBOARD_PORT:-20128}` સાથે મેપ કરેલ)              |
| ડિફૉલ્ટ API પોર્ટ      | `PROD_API_PORT=20131`                                                                      |
| ઇમેજ                   | `omniroute:prod` (`runner-cli` ટાર્ગેટમાંથી બિલ્ડ કરેલ)                                    |
| Redis કન્ટેનર          | `omniroute-redis-prod` (`redis:8.6.2`, સમર્પિત `redis-prod-data` વોલ્યુમ)                  |
| ડેટા વોલ્યુમ           | `omniroute-prod-data` (નામિત, પુનઃબિલ્ડ દરમિયાન જળવાયેલું)                                 |
| હેલ્થચેક               | `node healthcheck.mjs` + `redis-cli ping`, જેમાં `depends_on` Redisની હેલ્થ પર ગેટ કરેલ છે |

ઉપયોગ કરવાની રીત:

```bash
# પ્રોડક્શન સ્ટૅક બિલ્ડ કરીને શરૂ કરો
docker compose -f docker-compose.prod.yml up -d --build

# લૉગ્સનું સ્ટ્રીમિંગ કરો
docker compose -f docker-compose.prod.yml logs -f

# બંધ કરો (વોલ્યુમ્સ જાળવી રાખો)
docker compose -f docker-compose.prod.yml down
```

પ્રોડ સ્ટૅક ડેવ composeની સમાંતરે ચાલે છે (અલગ કન્ટેનર નામો, પોર્ટ્સ અને વોલ્યુમ્સ), તેથી પ્રોડક્શન ચાલુ રહે ત્યારે તમે સ્થાનિક રીતે પુનરાવર્તિત વિકાસ કરવાનું ચાલુ રાખી શકો છો.

## Dockerfile સ્ટેજ

રિપોઝિટરી બહુ-સ્ટેજ Dockerfile (`Dockerfile`) સાથે આવે છે. ત્રણ સ્ટેજ ઉપલબ્ધ છે; તમારા ઉપયોગના કિસ્સા માટે યોગ્ય `target` પસંદ કરો.

| સ્ટેજ         | બેઝ ઇમેજ              | હેતુ                                                                                                                                                                   |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ડિપેન્ડન્સીઓ ઇન્સ્ટોલ કરે છે (`npm ci --legacy-peer-deps`) અને `npm run build` ચલાવે છે (ડિફૉલ્ટ રૂપે Turbopack — નીચે બિલ્ડ-ટાઇમ સંસાધનો જુઓ)                         |
| `runner-base` | `node:26-trixie-slim` | Next.js સ્ટેન્ડઅલોન આઉટપુટ સાથેનો પ્રોડક્શન રનટાઇમ. **કોઈ પ્રોવાઇડર CLI સમાવિષ્ટ નથી.**                                                                                |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` અને ગ્લોબલ CLI ઉમેરે છે: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **એજન્ટિક વર્કફ્લો માટે આ પસંદ કરો.** |

ચોક્કસ ટાર્ગેટ મેન્યુઅલી બિલ્ડ કરો:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### બિલ્ડ-ટાઇમ સંસાધનો

ત્રણ બિલ્ડ આર્ગ્યુમેન્ટ નક્કી કરે છે કે `builder` સ્ટેજ કેટલા સંસાધનો વાપરે છે. તેઓ ફક્ત બિલ્ડ-ટાઇમ માટે છે —
`OMNIROUTE_MEMORY_MB` (નીચે) એક અલગ રનટાઇમ નિયંત્રણ છે.

| બિલ્ડ આર્ગ્યુમેન્ટ          | ડિફૉલ્ટ | અસર                                                                                            |
| --------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`     | `0` સેટ કરવાથી તેના બદલે webpack વડે બિલ્ડ થાય છે. પીક મેમરી ઓછી, પરંતુ ધીમું.                 |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | શરૂ કરાયેલા `next build` માટે V8 હીપ મર્યાદા (`--max-old-space-size`).                         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | `CIRCLE_NODE_TOTAL` ને મૂલ્ય આપે છે; પેજ-ડેટા સંગ્રહ માટે Next `workers = N - 1` નક્કી કરે છે. |

મોટા બિલ્ડર પર `OMNIROUTE_BUILD_WORKERS` વધારવું જોઈએ અને મર્યાદિત સંસાધનોવાળો બિલ્ડ `✓ Compiled successfully` **પછી** નિષ્ફળ જાય ત્યારે સૌપ્રથમ તેના પર શંકા કરવી જોઈએ. દરેક
પેજ-ડેટા વર્કર તેની પોતાની પ્રોસેસ છે અને પેરેન્ટ `next build` પણ અલગ પ્રોસેસ છે;
લાઇવ VPS પુનરુત્પાદન (issue #7518)માં દરેક પ્રોસેસનું પીક RSS
`NODE_OPTIONS` હીપ ફ્લૅગથી સ્વતંત્ર રીતે ~4.5 GB માપવામાં આવ્યું હતું (Turbopack, V8 હીપની
બહાર નેટિવ/Rust મેમરીમાં કમ્પાઇલ કરે છે). `2` નું ડિફૉલ્ટ મૂલ્ય (→ 1 વર્કર, કુલ 2
પ્રોસેસ) પબ્લિશ પાઇપલાઇન દ્વારા ઉપયોગમાં લેવાતા 16 GB / 4 vCPU GitHub-હોસ્ટેડ રનર
માટે નિર્ધારિત છે. `8` પર (→ 7 વર્કર) તે રનરની મેમરી ખૂટી ગઈ અને
buildkit એ `ResourceExhausted: ... cannot allocate memory` સાથે સ્ટેપ નિષ્ફળ કર્યો;
પ્રત્યેક પ્રોસેસનું RSS અનુમાનવાને બદલે સીધું માપવામાં આવ્યું ત્યારે `3` (→ 2 વર્કર) પણ
ફિટ થયું નહીં. `tests/unit/docker-build-memory-budget.test.ts`
માપેલા આંકડાના આધારે ગણતરી કરે છે અને જો કોઈ પણ નિયંત્રણ રનરની ક્ષમતાથી વધી જાય
તો નિષ્ફળ જાય છે.

Turbopack એવી નેટિવ Rust મેમરીમાં કમ્પાઇલ કરે છે જે V8 હીપની **બહાર** રહે છે, તેથી
`OMNIROUTE_BUILD_MEMORY_MB` તેને મર્યાદિત કરતું નથી. મેમરી મર્યાદાવાળા હોસ્ટ પર બિલ્ડને
કોઈપણ ભૂલ લખાણ વિના OOM killer દ્વારા SIGKILL કરવામાં આવે છે — તે ફક્ત
`Creating an optimized production build` ની વચ્ચે અટકી જાય છે, જે મેમરી ખૂટી જવાને બદલે
અટકી ગયેલું હોય એવું લાગે છે. જો બિલ્ડ હોસ્ટ મર્યાદિત હોય, તો બન્ડલર બદલો:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` સક્રિય છે, તેથી `next build` એક પેરેન્ટ **અને** એક વર્કર
પ્રોસેસ ચલાવે છે અને દરેક `OMNIROUTE_BUILD_MEMORY_MB` ને અલગથી અનુસરે છે. કન્ટેનરની
મર્યાદા તે મૂલ્યથી લગભગ બમણી કરતાં વધુ રાખો, માત્ર એક ગણી નહીં.

આ ટ્રી પર માપેલું (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| બન્ડલર    | કન્ટેનર મર્યાદા | પરિણામ                                |
| --------- | --------------- | ------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | બંને પર કોઈ સંદેશ વિના OOM-killed     |
| webpack   | 8 GiB           | બિલ્ડ વર્કરને SIGKILL કરવામાં આવ્યો   |
| webpack   | 12 GiB          | સફળ થયું, પીક 11.1 GiB સુધી પહોંચ્યું |

### રનટાઇમ ડિફૉલ્ટ

`runner-base` દ્વારા એક્સપોર્ટ થતાં ડિફૉલ્ટ: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker માં મેમરીનું વર્તન:

- ઇમેજ `OMNIROUTE_MEMORY_MB=1024` સેટ કરે છે અને તેમાંથી `NODE_OPTIONS=--max-old-space-size=1024` મેળવે છે.
- વાસ્તવિક સર્વર પ્રોસેસ સ્ટેન્ડઅલોન લૉન્ચર દ્વારા શરૂ કરવામાં આવે છે, જે `OMNIROUTE_MEMORY_MB` વાંચે છે અને `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` ઉમેરે છે.
- Node વારંવાર આવેલા `--max-old-space-size` માંથી છેલ્લું મૂલ્ય વાપરે છે, તેથી `OMNIROUTE_MEMORY_MB` સેટ કરવાથી Docker ની અસરકારક હીપ મર્યાદા નિયંત્રિત થાય છે.
- ઇમેજ તેને હંમેશાં સેટ કરતી હોવાથી, લૉન્ચરનું પોતાનું RAM-આધારિત ફૉલબૅક Docker હેઠળ ક્યારેય લાગુ પડતું નથી. વર્કલોડ માટે તેને સ્પષ્ટ રીતે વધારો (નીચેનું કોષ્ટક જુઓ). કોડિંગ-એજન્ટના `/v1/responses` માટે `2048` હજુ પણ ખૂબ ઓછું છે.

### કોડિંગ એજન્ટ માટે રનટાઇમ RAM

1 GiB નો Docker ડિફૉલ્ટ ડૅશબોર્ડ/હળવી ચેટ માટેની લઘુત્તમ મર્યાદા છે, પ્રોડક્શન માટેનું કદ નહીં. લાંબી `POST /v1/responses` બૉડી (સેંકડો સંદેશા, દસેક ટૂલ) કમ્પ્રેશન દરમિયાન અનેક ઇન-મેમરી ગ્રાફ જાળવી રાખે છે. એકસાથે ચાલતી બે ~3 MiB / ~750k-token વિનંતીઓએ **12 GiB** old-space પર V8 ને બંધ કરાવ્યું છે (`FATAL ERROR: Reached heap limit`) અને 16 GiB cgroup OOM પણ સર્જ્યું છે. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) જુઓ.

cgroup `--memory` નું કદ **હીપ કરતાં વધુ** રાખો — નેટિવ બફર, SQLite અને કમ્પ્રેશનના મધ્યવર્તી ડેટા V8 ની બહાર રહે છે.

| કાર્યભાર                             | `OMNIROUTE_MEMORY_MB` | કન્ટેનર / cgroup            | નોંધો                                                                                                   |
| ------------------------------------ | --------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------- |
| ડેશબોર્ડ, એક હલકી ચેટ                | `1024` (ઇમેજ ડિફૉલ્ટ) | ≥2 GiB                      |                                                                                                         |
| એક કોડિંગ એજન્ટ (Claude/Codex/Grok)  | `8192`                | ≥10 GiB                     | સામાન્ય એકલ-સત્ર `/v1/responses`                                                                        |
| બે સમકાલીન લાંબા `/v1/responses`     | `10240`–`12288`       | ≥12–16 GiB                  | ~12 GiB હીપ પર V8 એબોર્ટ માપવામાં આવ્યો                                                                 |
| ત્રણથી વધુ સમકાલીન લાંબા કોન્ટેક્સ્ટ | એક પ્રોસેસ પર ન ચલાવો | ક્રમિક રીતે ચલાવો / વધુ RAM | ડિફૉલ્ટ હેવીવેઇટ એડમિશન મુજબ 1 કાર્ય ચાલુ હોય છે; RAM વધાર્યા વિના આ મર્યાદા વધારવાથી એબોર્ટ ફરી થાય છે |

બેર મેટલ પર `omniroute serve`, જ્યારે `OMNIROUTE_MEMORY_MB` **સેટ કરેલું ન હોય**, ત્યારે RAMના ~35% પ્રમાણે (જે `[512, 4096]` સુધી મર્યાદિત છે) કેલિબ્રેટ થાય છે. Docker હંમેશાં `1024` સેટ કરે છે, તેથી અધિકૃત ઇમેજમાં આ કેલિબ્રેશન ક્યારેય ચાલતું નથી.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## મહત્વપૂર્ણ પર્યાવરણ વેરિએબલ્સ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) માં દસ્તાવેજીકૃત ડિફૉલ્ટ્સ ઉપરાંત, Docker હેઠળ ચલાવતી વખતે નીચેના વેરિએબલ્સ સૌથી વધુ મહત્વ ધરાવે છે:

| વેરિએબલ                       | હેતુ                                                                                                                                                                                                                                                                       | ડિફૉલ્ટ                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket બ્રિજ માટેનું શેર કરેલું સિક્રેટ. **પ્રોડક્શનમાં આવશ્યક** — તેને મજબૂત રેન્ડમ સ્ટ્રિંગ પર સેટ કરો.                                                                                                                                                               | સેટ નથી (આપવું આવશ્યક છે) |
| `REDIS_URL`                   | રેટ લિમિટર / કૅશ બૅકએન્ડ માટેની કનેક્શન સ્ટ્રિંગ                                                                                                                                                                                                                           | `redis://redis:6379`      |
| `REDIS_PORT`                  | સાથે સમાવિષ્ટ Redis કન્ટેનર માટેનો હોસ્ટ-સાઇડ પોર્ટ                                                                                                                                                                                                                        | `6379`                    |
| `REDIS_BIND_HOST`             | હોસ્ટ ઇન્ટરફેસ કે જેના પર સાથે સમાવિષ્ટ Redis પોર્ટ પ્રકાશિત થાય છે (જ્યાં સુધી તમે AUTH ઉમેરતા નથી ત્યાં સુધી લૂપબૅક)                                                                                                                                                     | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | સ્વ-અપડેટ વર્કફ્લો માટે `/workspace/omniroute` પરના `cli` પ્રોફાઇલમાં માઉન્ટ કરેલો હોસ્ટ પાથ                                                                                                                                                                               | `.` (વર્તમાન ડિરેક્ટરી)   |
| `OMNIROUTE_MEMORY_MB`         | Docker સ્ટૅન્ડઅલોન સર્વર માટેની રનટાઇમ Node હીપ મર્યાદા; ઉપરના ઇમેજ ડિફૉલ્ટને ઓવરરાઇડ કરે છે. કોડિંગ એજન્ટ્સ: `8192`+ ([રનટાઇમ RAM](#runtime-ram-for-coding-agents) જુઓ).                                                                                                  | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | ડૅશબોર્ડ (20128) અને API (20129) માટે એક્સપોઝ કરેલા પોર્ટ્સને ઓવરરાઇડ કરો                                                                                                                                                                                                  | `20128` / `20129`         |
| `APP_BIND_HOST`               | હોસ્ટ ઇન્ટરફેસ કે જેના પર docker-compose ડૅશબોર્ડ/API/live-WS પોર્ટ્સ પ્રકાશિત કરે છે. `REQUIRE_API_KEY=false` (ડિફૉલ્ટ) સાથે, `0.0.0.0` અનામી `/v1` પ્રૉક્સીને LAN પર એક્સપોઝ કરે છે — ફક્ત `REQUIRE_API_KEY=true` હોય અથવા આગળ રિવર્સ પ્રૉક્સી હોય ત્યારે જ વ્યાપ વધારો. | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | હોસ્ટ ઇન્ટરફેસ કે જેના પર docker-compose `cliproxyapi` સાઇડકાર પ્રકાશિત કરે છે — તેના ડેટા વોલ્યુમમાં પ્રોવાઇડર ક્રેડેન્શિયલ્સ સંગ્રહિત હોય છે.                                                                                                                            | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | રનટાઇમ પ્લગઇન સ્કૅનર જે ડિરેક્ટરીમાંથી વાંચે છે અને જેમાં ઇન્સ્ટૉલ કરે છે. પ્લગઇન્સ બાઇન્ડ-માઉન્ટ કરેલા હોય ત્યારે તેને સેટ કરો: ડિફૉલ્ટ `HOME` ને અનુસરે છે, જેને ઇમેજ એક્સપોર્ટ કરે તે જરૂરી નથી.                                                                        | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | ઍપ રિવર્સ પ્રૉક્સી પાછળ પ્રકાશિત થાય ત્યારે URL સબપાથ (દા.ત. `/omniroute`)                                                                                                                                                                                                 | _(ખાલી = રૂટ)_            |
| `NEXT_PUBLIC_BASE_URL`        | સબપાથ સહિત સાર્વજનિક બ્રાઉઝર ઓરિજિન (દા.ત. `https://host/omniroute`)                                                                                                                                                                                                       | સેટ નથી                   |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` માટેનો હોસ્ટ-સાઇડ ડૅશબોર્ડ પોર્ટ                                                                                                                                                                                                                 | `20130`                   |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` સાઇડકાર માટેનો હોસ્ટ-સાઇડ પોર્ટ                                                                                                                                                                                                                              | `8317`                    |

## સબપાથ પર રિવર્સ પ્રોક્સી (Traefik / nginx)

Next.js `basePath` સ્ટૅન્ડઅલોન બંડલમાં કમ્પાઇલ થાય છે. OmniRoute ઍપ રૂટ પરની સેન્ટિનલ ફાઇલમાં બિલ્ડ સમયે નિર્ધારિત થયેલી
કિંમત નોંધે છે (`npm run build` દરમિયાન લખાય છે; `scripts/docker/ensure-docker-base-path.mjs` દ્વારા વાંચવામાં
આવે છે) અને કન્ટેનર શરૂ થાય ત્યારે તેની સરખામણી
`OMNIROUTE_BASE_PATH` સાથે કરે છે. જ્યારે બંને અલગ હોય અને ઇમેજ
ડોમેન રૂટ માટે બિલ્ડ કરેલી હોય, ત્યારે એન્ટ્રીપોઇન્ટ સ્ટૅન્ડઅલોન મેનિફેસ્ટ્સ,
એમ્બેડ કરેલા `basePath`/`assetPrefix` લિટરલ્સ (Next 16 માત્ર
`assetPrefix`માંથી SSR ઍસેટ URLs રેન્ડર કરે છે — પૅચર તેમાં પણ સબપાથ મૂકે છે), બિલ્ડમાં નિર્ધારિત
`/_next/static` ઍસેટ URLs (ક્લાયન્ટ-રેફરન્સ મેનિફેસ્ટ્સ, મીડિયા ઇમ્પોર્ટ્સ, પ્રીરેન્ડર કરેલા
ભૂલ પૃષ્ઠો) અને ક્લાયન્ટ `process.env` શિમને `node dev/run-standalone.mjs`
ચાલે તે પહેલાં ફરીથી લખે છે.

### Compose બિલ્ડ (ભલામણ કરેલ)

`.env`માં બંને વેરિએબલ્સ સેટ કરો, ત્યારબાદ ઇમેજ અને રનટાઇમ સુસંગત રહે તે માટે ફરીથી બિલ્ડ કરો:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`ને Docker બિલ્ડ-આર્ગ તરીકે અને
રનટાઇમ એન્વાયર્નમેન્ટ વેરિએબલ તરીકે ફોરવર્ડ કરે છે.

### અગાઉથી બિલ્ડ કરેલી રૂટ ઇમેજ + રનટાઇમ સબપાથ

પ્રકાશિત `diegosouzapw/omniroute:*` ઇમેજો ડોમેન રૂટ માટે બિલ્ડ કરેલી છે. તેમ છતાં તમે
રનટાઇમ પર `OMNIROUTE_BASE_PATH` સેટ કરી શકો છો; કન્ટેનર સ્ટાર્ટઅપ વખતે બંડલને એક વાર પૅચ કરે છે.
તેની સાથે મેળ ખાતું પબ્લિક ઓરિજિન સેટ કરો:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

રિવર્સ પ્રોક્સીને **સંપૂર્ણ** બાહ્ય પાથ ફોરવર્ડ કરવા માટે કન્ફિગર કરો (પ્રિફિક્સ દૂર કરશો નહીં).
Traefikએ `StripPrefix` વિના `PathPrefix(`/omniroute`)`ને કન્ટેનર તરફ
રૂટ કરવું જોઈએ, જેથી Next.jsને `/omniroute/...` મળે અને તે
`/omniroute/_next/...`માંથી ઍસેટ્સ સર્વ કરે.

Docker હેલ્થચેક સક્રિય `OMNIROUTE_BASE_PATH` પ્રિફિક્સ સાથેના હળવા
`/healthz` લાઇફસાઇકલ એન્ડપોઇન્ટની તપાસ કરે છે. માનવીય/ડૅશબોર્ડ ડાયગ્નોસ્ટિક્સ માટે
`/api/monitoring/health` ઉપલબ્ધ રહે છે; કન્ટેનર HEALTHCHECKને ફરીથી તેના તરફ નિર્દેશિત કરવા માટે (ઉદાહરણ તરીકે,
ઊંડા હેલ્થ અમલીકરણ માટે), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` સેટ કરો.
આ પાથ એક **ઊંડો** ચેક છે (DB + મોનિટરિંગ સારાંશ) — જો તમે તેને ફરીથી પસંદ કરો તો Dockerના
ઓછી વાર થતા `HEALTHCHECK` માટે યોગ્ય છે, પરંતુ Kubernetes `livenessProbe`
અંતરાલો માટે **યોગ્ય નથી**.

ઓર્કેસ્ટ્રેટર્સ (Kubernetes, Nomad વગેરે) માટે:

| પ્રોબ            | પ્રાધાન્ય આપો                                                        | ટાળો                                                |
| ---------------- | -------------------------------------------------------------------- | --------------------------------------------------- |
| લાઇવનેસ          | HTTP `GET /livez`, અથવા મુખ્ય પોર્ટ પર TCP (`PORT`, ડિફૉલ્ટ `20128`) | લાઇવનેસ તરીકે `/api/monitoring/health`              |
| રેડીનેસ          | HTTP `GET /healthz`                                                  | ઇવેન્ટ-લૂપ વ્યસ્ત હોય તેને બંધ ગણતા ટૂંકા ટાઇમઆઉટ્સ |
| ડીપ / બ્લૅકબૉક્સ | `/api/monitoring/health`                                             | —                                                   |

`/healthz` પ્રોસેસ લાઇફસાઇકલ (`ok` / `starting` / `stopping`)ની જાણ કરે છે. `/livez` માત્ર
પ્રોસેસ જીવંત છે કે નહીં તે દર્શાવે છે (હૅન્ડલર ચાલી શકે ત્યારે હંમેશાં 200; તે
રેડીનેસની રાહ જોતું નથી). બંને હજી પણ રિક્વેસ્ટ હૅન્ડલિંગ જેવા જ Node ઇવેન્ટ લૂપ પર ચાલે છે, તેથી
CPU-બાઉન્ડ કૅટલૉગ અથવા કમ્પ્રેશન કાર્ય તેમને વિલંબિત કરી શકે છે — વ્યસ્ત ≠ બંધ. HTTP પ્રોબ્સનો
સમય સમાપ્ત થાય તો TCP લાઇવનેસને પ્રાધાન્ય આપો. સંપૂર્ણ પ્રોબ માર્ગદર્શન:
[મોનિટરિંગ માર્ગદર્શિકા — Kubernetes પ્રોબ માટેની ભલામણો](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy સાથે Docker Compose (HTTPS Auto-TLS)

Caddyની સ્વચાલિત SSL પ્રોવિઝનિંગનો ઉપયોગ કરીને OmniRouteને સુરક્ષિત રીતે એક્સપોઝ કરી શકાય છે. ખાતરી કરો કે તમારા ડોમેનનો DNS A રેકોર્ડ તમારા સર્વરના IP તરફ નિર્દેશ કરે છે.

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
      # OAuth કૉલબૅક્સ, ડેશબોર્ડ લિંક્સ અને જનરેટ થયેલા જાહેર URLs માટે બ્રાઉઝર-ફેસિંગ ઑરિજિન.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # શેડ્યૂલ કરેલા જોબ્સ / સેલ્ફ-ફેચ માટે આંતરિક સર્વર-ટુ-સર્વર URL.
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

Caddy અપસ્ટ્રીમ કન્ટેનર માટે પ્રમાણભૂત ફોરવર્ડિંગ હેડર્સ સેટ કરે છે. OmniRoute OAuth કૉલબૅક્સ અને જનરેટ થયેલી જાહેર લિંક્સ માટે
`NEXT_PUBLIC_BASE_URL`નો કેનોનિકલ જાહેર ઑરિજિન તરીકે ઉપયોગ કરે છે; પ્રમાણિત ડેશબોર્ડ રાઇટ્સ સેમ-ઑરિજિન રિક્વેસ્ટ્સ ઉપરાંત સેશન-બાઉન્ડ CSRF
સુરક્ષાનો ઉપયોગ કરે છે. `OMNIROUTE_TRUST_PROXY`ને માત્ર એવા અદ્યતન ડિપ્લોયમેન્ટ્સ માટે સક્ષમ કરો જ્યાં તમે સ્પષ્ટ
કન્ફિગરેશનને બદલે વિશ્વસનીય ફોરવર્ડેડ હેડર્સમાંથી OmniRoute જાહેર ઑરિજિન નક્કી કરે એવું ઇરાદાપૂર્વક ઇચ્છતા હોવ.

## Cloudflare Quick Tunnel

Docker ડિપ્લોયમેન્ટ્સ માટેના ડેશબોર્ડ સપોર્ટમાં `Dashboard → Endpoints` પર એક-ક્લિક **Cloudflare Quick Tunnel** સામેલ છે. પ્રથમ વખત સક્ષમ કરવાથી માત્ર જરૂર હોય ત્યારે `cloudflared` ડાઉનલોડ થાય છે, તમારા વર્તમાન `/v1` એન્ડપોઇન્ટ માટે એક અસ્થાયી ટનલ શરૂ થાય છે અને જનરેટ થયેલ `https://*.trycloudflare.com/v1` URL તમારા સામાન્ય જાહેર URLની સીધી નીચે દર્શાવવામાં આવે છે.

સક્રિય ટનલની સ્થિતિ બદલ્યા વિના એન્ડપોઇન્ટ ટનલ પેનલ્સ (Cloudflare, Tailscale, ngrok)ને `Settings → Appearance`માંથી દર્શાવી અથવા છુપાવી શકાય છે.

### ટનલ નોંધો

- Quick Tunnel URLs અસ્થાયી હોય છે અને દરેક રિસ્ટાર્ટ પછી બદલાય છે.
- OmniRoute અથવા કન્ટેનર રિસ્ટાર્ટ થયા પછી Quick Tunnels આપમેળે પુનઃસ્થાપિત થતા નથી. જરૂર પડે ત્યારે તેમને ડેશબોર્ડમાંથી ફરી સક્ષમ કરો.
- મેનેજ્ડ ઇન્સ્ટોલ હાલમાં `x64` / `arm64` પર Linux, macOS અને Windowsને સપોર્ટ કરે છે.
- મર્યાદિત કન્ટેનર એન્વાયર્નમેન્ટ્સમાં ઘોંઘાટભરી QUIC UDP બફર ચેતવણીઓ ટાળવા માટે મેનેજ્ડ Quick Tunnels ડિફૉલ્ટરૂપે HTTP/2 ટ્રાન્સપોર્ટનો ઉપયોગ કરે છે. જો તમે કોઈ અલગ ટ્રાન્સપોર્ટ ઇચ્છતા હોવ તો `CLOUDFLARED_PROTOCOL=quic` અથવા `auto` સેટ કરો.
- Docker ઇમેજિસ સિસ્ટમ CA રૂટ્સને બંડલ કરે છે અને તેમને મેનેજ્ડ `cloudflared` સુધી પહોંચાડે છે, જે કન્ટેનરની અંદર ટનલ બૂટસ્ટ્રૅપ થાય ત્યારે TLS ટ્રસ્ટ નિષ્ફળતાઓ ટાળે છે.
- જો તમે ઇચ્છતા હોવ કે OmniRoute નવું બાઇનરી ડાઉનલોડ કરવાને બદલે હાલના બાઇનરીનો ઉપયોગ કરે, તો `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` સેટ કરો.

## ઇમેજ ટૅગ્સ

| ઇમેજ                     | ટૅગ      | કદ     | વર્ણન                                                |
| ------------------------ | -------- | ------ | ---------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | સર્વોચ્ચ **પ્રકાશિત** સ્થિર SemVer (git `main` નહીં) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps માટે આ પ્રકારનો ટૅગ પિન કરો                   |

મલ્ટિ-પ્લેટફોર્મ મેનિફેસ્ટ: `linux/amd64` + `linux/arm64` નેટિવ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker મેળ ખાતું આર્કિટેક્ચર આપમેળે પસંદ કરે છે; જો તમારે ARM હોસ્ટ્સ પર AMD64 ઇમ્યુલેશન ફરજિયાત કરવું હોય તો `--platform linux/amd64` પાસ કરો.

### રિલીઝ ચેનલ્સ

OmniRoute સ્થિર રિલીઝિસ, સક્રિય રિલીઝ-બ્રાન્ચ પરીક્ષણ અને ડેવલપમેન્ટ બિલ્ડ્સ માટે અલગ Docker ચેનલ્સ પ્રકાશિત કરે છે.

| ચેનલ                            | સ્રોત                                | પરિવર્તનક્ષમતા                  | ભલામણ કરેલ ઉપયોગ                                                                                                   |
| ------------------------------- | ------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | સાઇન કરેલ/વર્ઝન કરેલ રિલીઝ           | અપરિવર્તનીય                     | ચોક્કસ રિલીઝને પિન કરતા પ્રોડક્શન ડિપ્લોયમેન્ટ્સ                                                                   |
| `:latest` / `:latest-web`       | સર્વોચ્ચ **પ્રકાશિત** સ્થિર SemVer   | પરિવર્તનક્ષમ સ્થિર પોઇન્ટર      | SemVer પબ્લિશ જોબ **પછી** સ્થિર રિલીઝિસને અનુસરે છે — `main` અથવા અપ્રકાશિત `release/v*` કમિટ્સને અનુસરતું **નથી** |
| `:next` / `:next-web`           | વર્તમાન ડિફૉલ્ટ `release/v*` બ્રાન્ચ | પરિવર્તનક્ષમ પ્રી-રિલીઝ પોઇન્ટર | સક્રિય રિલીઝ બ્રાન્ચમાં સામેલ થઈ ગયેલા પરંતુ હજી સ્થિર રિલીઝમાં ન હોય તેવા સુધારાઓનું પરીક્ષણ                      |
| `:main` / `:main-web`           | `main` બ્રાન્ચ                       | પરિવર્તનક્ષમ ડેવલપમેન્ટ પોઇન્ટર | માત્ર ડેવલપમેન્ટ અને ઇન્ટિગ્રેશન પરીક્ષણ માટે                                                                      |

#### પ્રી-રિલીઝ ચેનલનો ઉપયોગ

વર્તમાન ડિફૉલ્ટ `release/v*` બ્રાન્ચ પરના દરેક પુશ વખતે `next` ચેનલ ફરીથી બિલ્ડ થાય છે અને AMD64 તથા ARM64 બંને માટે પ્રકાશિત થાય છે. જૂની મેઇન્ટેનન્સ બ્રાન્ચિસ તેને ઓવરરાઇટ કરી શકતી નથી. આગામી સ્થિર ટૅગ બનાવવામાં આવે તે પહેલાં સક્રિય રિલીઝ બ્રાન્ચમાં મર્જ થઈ ગયેલા સુધારાઓ માટે આ ચેનલ પુલ કરી શકાય તેવી ઇમેજ પૂરી પાડે છે.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose માટે, પસંદ કરેલી પ્રોફાઇલ દ્વારા ઉપયોગમાં લેવાતો ઇમેજ ટૅગ ઓવરરાઇડ કરો, ત્યારબાદ સર્વિસને પુલ કરીને ફરીથી બનાવો:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### સુરક્ષા અને રોલબૅક

`next` એક ફ્લોટિંગ પ્રી-રિલીઝ ચેનલ છે. તે સક્રિય રિલીઝ બ્રાન્ચ પરના કોઈપણ પુશ સાથે બદલાઈ શકે છે અને **પ્રોડક્શન ઉપયોગ માટે સપોર્ટેડ નથી**. કોઈ ચોક્કસ બિલ્ડનું મૂલ્યાંકન કરતી વખતે ઇમેજ ડાઇજેસ્ટને પિન કરો:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

પરીક્ષણ પહેલાં, OmniRoute ડેટા વોલ્યુમ અથવા bind-mounted ડેટા ડિરેક્ટરીનો બૅકઅપ લો. રોલ બૅક કરવા માટે, અગાઉ ઉપયોગમાં લેવાયેલ સ્થિર વર્ઝન અથવા digest પુનઃસ્થાપિત કરો અને કન્ટેનર ફરીથી બનાવો:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

રિલીઝ-બ્રાન્ચ બિલ્ડ ક્યારેય `latest`ને ખસેડી શકતું નથી; માત્ર પાત્ર સ્થિર semantic version જ સ્થિર પોઇન્ટરને પ્રમોટ કરી શકે છે. `next` ઇમેજો રિલીઝ ઇમેજની તપાસ અને CRITICAL નબળાઈઓને અવરોધિત કરતો ગેટ જાળવી રાખે છે.

**`latest` એ git માટે તાજગીની ખાતરી નથી.** `main` અથવા સક્રિય `release/v*` બ્રાન્ચમાં મર્જ કરાયેલા સુધારા, સ્થિર SemVer ઇમેજ પ્રકાશિત ન થાય અને પ્રકાશન જોબ `:latest`ને પ્રમોટ ન કરે ત્યાં સુધી `:latest`માં **હોતા નથી** (તે SemVer જેટલો જ digest). જો GitHub પર સુધારો પહેલેથી દેખાતો હોવા છતાં `latest` સ્થિર લાગતું હોય, તો રિલીઝ બ્રાન્ચનું પરીક્ષણ કરવા માટે `:next` pull કરો અથવા SemVer ટૅગની રાહ જુઓ.

| તમને શું જોઈએ છે                                                           | આનો ઉપયોગ કરો                       |
| -------------------------------------------------------------------------- | ----------------------------------- |
| GitOps / પ્રોડક્શન, જેમાં ફેરફાર ન થવો જોઈએ                                | `:X.Y.Z` (અથવા ઇમેજ digest) પિન કરો |
| પ્રકાશિત સ્થિર વર્ઝનને અનુસરો અને દરેક રિલીઝ વખતે ફરીથી બનાવવાનું સ્વીકારો | `:latest`                           |
| અપ્રકાશિત `release/v*` commitsનું પરીક્ષણ કરો                              | `:next` (પ્રોડક્શન માટે નહીં)       |
| `main`નું પરીક્ષણ કરો                                                      | `:main` (પ્રોડક્શન માટે નહીં)       |

## ઉપલબ્ધતા: ડિફૉલ્ટ SQLite એક જ રેપ્લિકા ધરાવે છે

સ્ટૉક Docker / Kubernetes OmniRoute એ **એક Node પ્રોસેસ + એક SQLite રાઇટર** છે. આ ટોપોલોજી પર ઉચ્ચ ઉપલબ્ધતા **સમર્થિત નથી**.

| મર્યાદા                                | પરિણામ                                                                                                                                                                                                                                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| એક જ રાઇટર                             | એક જ SQLite ફાઇલ સામે અનેક રેપ્લિકા **ચલાવશો નહીં**. તે DBને દૂષિત કરે છે.                                                                                                                                                                                                                                          |
| રિક્રિએટ / રિસ્ટાર્ટ / HEALTHCHECK કિલ | ચાલુ SSE, ડૅશબોર્ડ સેશનો અને ઇન-મેમરી સ્ટેટનો **સંપૂર્ણ આઉટેજ**. દરેક કનેક્ટેડ ક્લાયન્ટ ડિસ્કનેક્ટ થાય છે. એન્ડપૉઇન્ટ ખાલી હોય તે સમયગાળા દરમિયાન નવી રિક્વેસ્ટને OmniRoute JSONને બદલે રિવર્સ-પ્રૉક્સી **`502 Bad Gateway: Unknown error`** મળે છે — ક્લાયન્ટ આને પ્રદાતાની નિષ્ફળતાથી અલગ ઓળખી શકતા નથી (#11015). |
| `/healthz` જેવો જ ઇવેન્ટ લૂપ           | વ્યસ્ત કૅટલૉગ અથવા કમ્પ્રેશન ટિક પ્રોબમાં વિલંબ કરી શકે છે; ત્યારબાદ ટૂંકો ટાઇમઆઉટ **એકમાત્ર** રેપ્લિકાને રિસ્ટાર્ટ કરે છે.                                                                                                                                                                                         |

**પ્રોબ મેટ્રિક્સ** ([Kubernetes પ્રોબ ભલામણો](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) પણ જુઓ):

| પ્રોબ                    | લક્ષ્ય                                                      | આનો ઉપયોગ કરશો નહીં                             |
| ------------------------ | ----------------------------------------------------------- | ----------------------------------------------- |
| લાઇવનેસ                  | `PORT` પર TCP (ડિફૉલ્ટ `20128`), અથવા સૉફ્ટ HTTP `/healthz` | `/api/monitoring/health`                        |
| રેડીનેસ                  | HTTP `GET /healthz`                                         | ઇવેન્ટ લૂપ વ્યસ્ત હોય તેને ડેડ ગણતા કડક ટાઇમઆઉટ |
| ઊંડાણપૂર્વક / માનવો માટે | `/api/monitoring/health`                                    | ઑટોમેટેડ kubelet લાઇવનેસ                        |

**અપગ્રેડ્સ:** દરેક સેશન ડિસ્કનેક્ટ થશે તેવી અપેક્ષા રાખો. શક્ય હોય તો ક્લાયન્ટને ડ્રેઇન કરો; ડિફૉલ્ટ SQLite પર કોઈ રોલિંગ અપડેટ નથી. Compose `restart: unless-stopped` સાથે Docker `HEALTHCHECK` પણ કન્ટેનર Unhealthy થાય ત્યારે એકમાત્ર પ્રોસેસને બદલી નાખશે — તેની અસરનો વ્યાપ પણ સમાન રહેશે.

**એક જ રેપ્લિકા** માટે Kubernetes સ્નિપેટ (Recreate આવશ્યક છે; એક SQLite ફાઇલ સામે `replicas` વધારશો નહીં):

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

`preStop` સ્લીપથી SIGTERM પહેલાં kubeને Service એન્ડપૉઇન્ટ દૂર કરવાનો સમય મળે છે, જેથી **નવો** ટ્રાફિક બંધ થઈ રહેલી પ્રોસેસ સુધી પહોંચવાનું બંધ કરે. ચાલુ `/v1/responses` SSEને હેવીવેઇટ એડમિશન લીઝ દ્વારા `SHUTDOWN_TIMEOUT_MS` (ડિફૉલ્ટ 30s) સુધી ડ્રેઇન કરવામાં આવે છે (#11015). હજી પણ પ્રોસેસ સુધી પહોંચતી નવી રિક્વેસ્ટને `503` + `Retry-After: 5` મળે છે. રિપ્લેસમેન્ટ Ready થાય ત્યાં સુધીનો Recreateનો ખાલી-એન્ડપૉઇન્ટ ગૅપ સંપૂર્ણ આઉટેજ જ રહે છે — આ SQLite ટોપોલોજીની મર્યાદા છે, પ્રોબનું ખોટું કૉન્ફિગરેશન નહીં.

બાહ્ય Postgres / મલ્ટિ-રાઇટર HA એ દસ્તાવેજીકૃત સ્ટૉક માર્ગ **નથી**. જો તમને HAની જરૂર હોય, તો એક જ રેપ્લિકા રાખો અથવા પ્રોજેક્ટે અલગથી ચકાસેલી અને દસ્તાવેજીકૃત કરેલી ટોપોલોજી ચલાવો. Postgres/MySQL સંબંધિત કાર્ય [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)માં ચાલી રહ્યું છે. તે રિલીઝ ન થાય ત્યાં સુધી **મોટી** `/v1/responses` ક્ષમતા વધારવાની એકમાત્ર સમર્થિત રીત N સ્વતંત્ર પ્રોસેસ છે (આગલો વિભાગ), એક વૉલ્યુમ પર `replicas > 1` નહીં.

## સ્કેલ-આઉટ: N સ્વતંત્ર પ્રોસેસ

એક Node પ્રોસેસ એટલે **એક V8 heap**. એકબીજાને ઓવરલેપ કરતી ~3 MiB / ~750k-token કોડિંગ-એજન્ટ `POST /v1/responses` વિનંતીઓ (RTK + Caveman) ~12 Gi પર તે heap ને અબોર્ટ કરે છે (`FATAL ERROR: Reached heap limit`) અને 16 Gi cgroup માં OOM સર્જી શકે છે. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) જુઓ. આ માપન **મેમરી-બજેટ** ચેતવણી છે, બે સમકાલીન લાંબી `/v1/responses` માટેની ઉત્પાદનની મહત્તમ હાર્ડ મર્યાદા નથી. હેવીવેઇટ ચેટ એડમિશન આપમેળે મેળવાયેલા ઇન્જેસ્ટ બાઇટ બજેટ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) દ્વારા નિયંત્રિત થાય છે, જે એ જ V8/cgroup મર્યાદાના આધારે માપવામાં આવે છે — પહેલેથી માપબદ્ધ કરેલી પ્રોસેસમાં તેને વધારીને ઓવરરાઇડ કરવાથી (અથવા લેગસી `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` રિક્વેસ્ટ-કાઉન્ટ મર્યાદા સેટ કરવાથી) ફરીથી અબોર્ટ થાય છે. નાની ચેટ્સ, `/healthz`, `/v1/models`, અને MCP આ મર્યાદામાં **આવતાં નથી**.

### એક પ્રોસેસ: બે કરતાં વધુ લાંબી `/v1/responses`

એક **સ્વસ્થ** પ્રોસેસ (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`થી નીચે, ડિફૉલ્ટ `0.75`) જ્યારે પ્રોસેસ-વ્યાપી ઇનફ્લાઇટ-બાઇટ બજેટ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110)માં હજુ જગ્યા હોય ત્યારે બે કરતાં વધુ સમકાલીન લાંબી `POST /v1/responses` વિનંતીઓ ચલાવી **શકે છે**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` જેટલી કે તેનાથી મોટી બોડીઝ (ડિફૉલ્ટ 256 KiB) સ્ટ્રક્ચર-હેવી વિનંતીઓ જેટલો જ હેવીવેઇટ લીઝ લે છે અને એ જ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` એસ્કેપ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`)નો ઉપયોગ કરે છે. દસેક સમકાલીન લાંબા SSE ક્લાયન્ટ્સ (ઓપરેટરોને ઘણીવાર 40–50ની જરૂર પડે છે) એ **મેમરી-બજેટ**નો પ્રશ્ન છે — heap + પ્રાથમિક/headroom સ્લોટ્સ + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`નું યોગ્ય માપ નક્કી કરો — તે ઉત્પાદનની હાર્ડ “મહત્તમ 2” મર્યાદા નથી. દબાણ હેઠળનું heap હજી પણ ફરી પ્રયાસ કરી શકાય એવો `503` આપીને લોડ ઘટાડે છે, જેથી #7849 ફરી ન આવે.

**heaps ને ગુણાકારમાં વધારવા** (સ્વતંત્ર V8 old-spaces) **આજે**:

| આ કરો                                                                                                                                                 | આ ન કરો                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **N containers/pods** ચલાવો, દરેકનું પોતાનું `DATA_DIR` / volume હોવું જોઈએ                                                                           | એક SQLite ફાઇલ સામે `replicas > 1` સેટ કરો               |
| heap / inflight-byte બજેટના આધારે heavy in-flight + healthy-headroomનું માપ નક્કી કરો; 1–2 એ રૂઢિચુસ્ત #7849 ડિફૉલ્ટ છે, ઉત્પાદનની હાર્ડ મર્યાદા નહીં | એક પ્રોસેસને 8× RAM અને અમર્યાદિત કાઉન્ટ મર્યાદા આપો     |
| વૈકલ્પિક: **શેર્ડ ક્વોટા કાઉન્ટર્સ** માટે `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                        | Redis ને શેર્ડ SQLite તરીકે ગણો — તે એવું નથી            |
| દરેક ઇન્સ્ટન્સમાં પ્રોવાઇડર સિક્રેટ્સ ડુપ્લિકેટ કરો (અથવા વિભાજિત ડેશબોર્ડ્સ સ્વીકારો)                                                                | બધા ઇન્સ્ટન્સમાં એક ડેશબોર્ડ / એક કૉલ-લૉગની અપેક્ષા રાખો |
| આગળ કોઈપણ લોડ બેલેન્સર મૂકો; API key અથવા session મુજબ સ્ટિકીપણું પૂરતું છે                                                                           | વેન્ડર-વિશિષ્ટ સાઇઝ-અવેર મિડલવેર આવશ્યક ગણો              |

હાર્ડવેર: પ્રતિ-ઇન્સ્ટન્સ સમકાલીન લાંબી `/v1/responses` એ **મેમરી-બજેટ**નો પ્રશ્ન છે (heap + inflight-byte / #10110). `N` સ્વતંત્ર `DATA_DIR`s હજી પણ heaps ને ગુણાકારમાં વધારે છે: હોસ્ટ RAM એ `N × cgroup`ને સમાવી શકે એટલી હોવી જોઈએ, “N=8 સાથે એક 16 Gi pod” નહીં. એક SQLite ફાઇલ પર ક્યારેય `replicas > 1` ન રાખો.

Compose રૂપરેખા (બે heaps, બે volumes — `deploy.replicas: 2` નહીં):

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

ઇન-પ્રોસેસ ડેન્સિટી (HTTP isolateથી compression અલગ કરવું) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) છે. શેર્ડ ડ્યુરેબલ સ્ટેટ પર એક લોજિકલ ક્લસ્ટર [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) છે.

## મહત્વપૂર્ણ નોંધો

- **SQLite WAL મોડ:** `docker stop` ને પૂર્ણ થવા દેવું જોઈએ, જેથી OmniRoute નવીનતમ ફેરફારોને `storage.sqlite` માં પાછા checkpoint કરી શકે. સાથે આપેલી Compose ફાઇલો પહેલેથી જ 40s નો stop grace period સેટ કરે છે. જો તમે image ને સીધી ચલાવો છો, તો `--stop-timeout 40` જાળવી રાખો.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** જો નિયમિત/લખાણ-પૂર્વેના backup બાહ્ય રીતે સંચાલિત થતા હોય, તો તેને `true` પર સેટ કરો. હાલના database ના migration માટે હજુ પણ તેમનો પોતાનો ટકાઉ safety snapshot અને mass-migration guard જરૂરી છે.
- **ડેટાની સ્થાયિતા:** container restart દરમિયાન તમારા database, keys અને configurations જાળવી રાખવા માટે હંમેશાં `/app/data` પર volume mount કરો.
- **પોર્ટ configuration:** ડિફૉલ્ટ `20128` પોર્ટ બદલવા માટે `PORT` environment variable ને override કરો.

## આ પણ જુઓ

- [VM Deployment માર્ગદર્શિકા](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare setup
- [Fly.io Deployment માર્ગદર્શિકા](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io પર deploy કરો
- [Environment Config](../reference/ENVIRONMENT.md) — સંપૂર્ણ `.env` reference
