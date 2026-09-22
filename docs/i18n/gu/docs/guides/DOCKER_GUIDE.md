# 🐳 Docker Guide — OmniRoute (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> સંપૂર્ણ Docker ડિપ્લોયમેન્ટ સંદર્ભ. ઝડપથી શરૂ કરવા માટે, [READMEનો Docker વિભાગ](../README.md#-docker) જુઓ.

## વિષયસૂચિ

- [ઝડપી રીતે ચલાવો](#quick-run)
- [એન્વાયર્નમેન્ટ ફાઇલ સાથે](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ઉપલબ્ધ પ્રોફાઇલ્સ](#available-profiles)
- [OmniRoute Dockerમાં ચાલતું હોય ત્યારે હોસ્ટ CLI ટૂલ્સને ગોઠવવા](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis સાઇડકાર](#redis-sidecar)
- [પ્રોડક્શન Compose](#production-compose)
- [Dockerfile સ્ટેજ](#dockerfile-stages)
- [મહત્વપૂર્ણ એન્વાયર્નમેન્ટ વેરિએબલ્સ](#critical-environment-variables)
- [Caddy (HTTPS) સાથે Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ક્વિક ટનલ](#cloudflare-quick-tunnel)
- [ઇમેજ ટૅગ્સ](#image-tags)
- [ઉપલબ્ધતા: ડિફૉલ્ટ SQLite એક જ રેપ્લિકા ધરાવે છે](#availability-default-sqlite-is-single-replica)
- [મહત્વપૂર્ણ નોંધો](#important-notes)

---

## ઝડપથી ચલાવો

> **એક જ કમાન્ડ વડે સેલ્ફ-હોસ્ટ કરવું છે?**
> [સેલ્ફ-હોસ્ટ માર્ગદર્શિકા](../getting-started/SELF_HOST_GUIDE.md) જુઓ —
> `docker compose -f docker-compose.selfhost.yml up -d` (પ્રકાશિત ઇમેજ +
> Redis, માત્ર લૂપબૅક, પ્રોફાઇલ પસંદગી વિના). નીચેનો ઝડપી રીતે ચલાવવાનો વિકલ્પ એવા વપરાશકર્તાઓ માટે
> સિંગલ-કન્ટેનર માર્ગ છે, જેઓ પહેલેથી જ અન્યત્ર Redis ચલાવે છે.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## એન્વાયર્નમેન્ટ ફાઇલ સાથે

```bash
# પહેલાં .env કૉપિ અને સંપાદિત કરો
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

OmniRoute ચાર Compose પ્રોફાઇલ્સ સાથે આવે છે. તમારા એન્વાયર્નમેન્ટને અનુરૂપ હોય તે પસંદ કરો.

| પ્રોફાઇલ         | સર્વિસ           | ક્યારે ઉપયોગ કરવો                                                                                                                                         | કમાન્ડ                                       |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ડિફૉલ્ટ) | `omniroute-base` | હેડલેસ સર્વર / ન્યૂનતમ રનટાઇમ, કોઈ પ્રોવાઇડર CLI સામેલ નથી                                                                                                | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` અને સામેલ CLI (Codex, Claude Code, Droid, OpenClaw)ને કૉલ કરતા એજન્ટિક વર્કફ્લો                                        | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | એવા Linux હોસ્ટ્સ કે જેઓ `~/.local/bin`, `~/.codex`, `~/.claude` વગેરેને ફક્ત વાંચવા માટે માઉન્ટ કરીને હોસ્ટ CLI માટે `network_mode` જેવો ઍક્સેસ ઇચ્છે છે | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | અપસ્ટ્રીમ CLI પ્રૉક્સી માટે પોર્ટ `8317` પર [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) સાઇડકાર ચલાવો                                     | `docker compose --profile cliproxyapi up -d` |

> એકથી વધુ પ્રોફાઇલ્સને સંયોજિત કરી શકાય છે: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker માં ચાલે ત્યારે હોસ્ટ CLI ટૂલ્સને કૉન્ફિગર કરવા

`omniroute setup-codex`, `setup-claude`, `config set <tool>` અને ડૅશબોર્ડનું
**કૉન્ફિગ સાચવો** બટન, બધા `~/.codex/*.config.toml` જેવી ફાઇલો લખે છે. આ પાથનો
અર્થ માત્ર એ મશીન પર હોય છે જ્યાં CLI ખરેખર ચાલે છે. તેમને કન્ટેનરની અંદર
ચલાવવાથી લખાણ કન્ટેનરના પોતાના હોમ (`/home/node` —
ઇમેજ `USER node` તરીકે ચાલે છે) માં જાય છે, જ્યાં કોઈ હોસ્ટ CLI તેને ક્યારેય વાંચશે
નહીં અને કન્ટેનર ફરીથી બનાવવામાં આવે તે ક્ષણે તે કાઢી નાખવામાં આવશે.

OmniRoute આને ઓળખે છે અને તમે ઉપયોગ ન કરી શકો એવી સફળતા દર્શાવવાને બદલે
સૂચનાઓ સાથે લખવાનો ઇનકાર કરે છે: CLI `2` સાથે બંધ થાય છે અને API
`containerEphemeralTarget: true` સાથે `422` પ્રતિસાદ આપે છે.

### ભલામણ કરેલ: CLI ને હોસ્ટ પર અને OmniRoute ને Docker માં ચલાવો

કન્ટેનર API પ્રદાન કરે છે; CLI તમારા હોસ્ટ ટૂલ્સને કૉન્ફિગર કરે છે.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI ને કન્ટેનર તરફ નિર્દેશિત કરો
omniroute setup-codex                      # તમારા હોસ્ટ પર વાસ્તવિક ~/.codex લખે છે
```

જ્યારે Codex, Claude Code, Cursor અથવા તેના જેવા ટૂલ્સ તમારા લેપટોપ પર ચાલે
ત્યારે આ યોગ્ય પસંદગી છે — જે સામાન્ય સેટઅપ છે.

### વિકલ્પ: હોસ્ટ કૉન્ફિગ ડિરેક્ટરીઓને બાઇન્ડ-માઉન્ટ કરો (`host` પ્રોફાઇલ)

જો તમે કન્ટેનર દ્વારા જ તમારા હોસ્ટ કૉન્ફિગમાં લખાવવા માંગતા હો, તો
ડિરેક્ટરીઓને માઉન્ટ કરો અને `CLI_CONFIG_HOME` ને માઉન્ટ રૂટ તરફ નિર્દેશિત કરો.
`host` પ્રોફાઇલ પહેલેથી જ આ કરે છે:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

બાઇન્ડ માઉન્ટ જ પાથને વિશ્વસનીય બનાવે છે: OmniRoute
`/proc/self/mountinfo` વાંચે છે અને માઉન્ટ કરેલા પાથમાં (તેમજ એવી
ડિરેક્ટરીઓમાં જેના ચાઇલ્ડ માઉન્ટ હોય છે, જે ઉપરના `/host-home` નું ચોક્કસ
સ્વરૂપ છે) લખવાની મંજૂરી આપે છે, જ્યારે હજુ પણ માઉન્ટ ન થયેલા પાથમાં
લખવાનો ઇનકાર કરે છે.

### વૈકલ્પિક રસ્તો: કન્ટેનરના પોતાના CLI ને કૉન્ફિગર કરો (સંયમપૂર્વક ઉપયોગ કરો)

જ્યારે CLI ખરેખર કન્ટેનરની અંદર જ હોય (`cli` પ્રોફાઇલ), ત્યારે લખવાની ક્રિયા
ઇરાદાપૂર્વકની હોય છે. કોઈપણ `setup-*` કમાન્ડને `--allow-container-write`
આપો અથવા સર્વર માટે `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` સેટ કરો.
કન્ટેનર ફરી બનાવ્યા પછી લખાણ ટકશે નહીં તેવી ચેતવણી સાથે લખવાની પ્રક્રિયા
આગળ વધે છે.

> **સુરક્ષા ચેતવણી — `cli` પ્રોફાઇલ + `docker.sock` માઉન્ટ.**
> `cli` પ્રોફાઇલ `/var/run/docker.sock` ને બાઇન્ડ-માઉન્ટ કરે છે જેથી કન્ટેનરની
> અંદરનો ઑટો-અપડેટર હોસ્ટ ડેમનમાંથી સ્ટૅક ફરી બનાવી શકે
> (`src/lib/system/autoUpdate.ts` તે સૉકેટ માટે તપાસ કરે છે અને તે હાજર ન હોય
> ત્યારે Docker પાથને છોડી દે છે). આ સૉકેટ **હોસ્ટ-રૂટ વિશ્વાસની
> સીમા** છે: તેની ઍક્સેસ ધરાવતી કોઈપણ વસ્તુ હોસ્ટ Docker ડેમનને
> રૂટ તરીકે ચલાવી શકે છે — તે હોસ્ટ પર કોઈપણ કન્ટેનર બનાવી, તપાસી, બંધ કરી
> અને દૂર કરી શકે છે.
> તેના પરિણામો:
>
> 1. **`cli` પ્રોફાઇલનો પોર્ટ ક્યારેય નેટવર્ક પર ખુલ્લો ન મૂકો.** તેને
>    `127.0.0.1` પર પ્રકાશિત કરો (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN દ્વારા ઍક્સેસ કરી શકાય તેવી `cli` પ્રોફાઇલ, ડૅશબોર્ડ-સ્તરની કોઈપણ RCE ને
>    સંપૂર્ણ હોસ્ટ કબજામાં ફેરવે છે.
> 2. **`cli` પ્રોફાઇલમાં કોઈ વધારાની હોસ્ટ ડિરેક્ટરીઓ બાઇન્ડ ન કરો.**
>    Docker સૉકેટ સાથે કોઈપણ વધારાનું માઉન્ટ કન્ટેનરને તમારી ફાઇલસિસ્ટમ અને
>    હોસ્ટ કૉન્ફિગ પર સંપૂર્ણ વાંચન/લેખન ઍક્સેસ આપે છે. જો કોઈ ટૂલને
>    પ્રોજેક્ટ જોવાની જરૂર હોય, તો તેને CLI બાઇનરી વડે સ્થાનિક રીતે ચલાવો —
>    તેને `cli` કન્ટેનરમાં માઉન્ટ ન કરો.
>
> જો તમને કન્ટેનરની અંદર ઑટો-અપડેટની જરૂર ન હોય, તો `cli` પ્રોફાઇલ બંધ રાખો
> (`COMPOSE_PROFILES=core,redis` અથવા તેનાથી ટૂંકું). અન્ય પ્રોફાઇલ્સ
> Docker સૉકેટ માઉન્ટ કરતા નથી.
>
> MITM સંબંધિત થ્રેટ મોડલ માટે `docs/security/MITM-TPROXY-DECRYPT.md` (git; `/docs` માં કમ્પાઇલ કરેલ નથી) જુઓ,
> અને `codex`/`claude-code`/`droid`/`openclaw` બાઇનરીના મૂળસ્રોતની શૃંખલા માટે
> `docs/security/SUPPLY_CHAIN.md` જુઓ.

## Redis સાઇડકાર

OmniRoute વિતરિત રેટ લિમિટર અને શેર કરેલી કૅશ માટે Redis પર આધાર રાખે છે. `redis` સર્વિસ `docker-compose.yml` માં **હંમેશાં વ્યાખ્યાયિત** હોય છે (તેમાં કોઈ પ્રોફાઇલ ગેટ નથી) અને અન્ય કોઈપણ પ્રોફાઇલની સાથે શરૂ થાય છે.

| વિગત                   | મૂલ્ય                                   |
| ---------------------- | --------------------------------------- |
| ઇમેજ                   | `redis:7-alpine`                        |
| કન્ટેનરનું નામ         | `omniroute-redis`                       |
| આંતરિક પોર્ટ           | `6379`                                  |
| હોસ્ટ પોર્ટ (ઓવરરાઇડ)  | `REDIS_PORT` (ડિફૉલ્ટ `6379`)           |
| હોસ્ટ બાઇન્ડ (ઓવરરાઇડ) | `REDIS_BIND_HOST` (ડિફૉલ્ટ `127.0.0.1`) |
| વોલ્યુમ                | `omniroute-redis-data` → `/data`        |
| હેલ્થચેક               | `redis-cli ping` (10s અંતરાલ)           |

સંબંધિત એન્વાયરમેન્ટ વેરિએબલ્સ:

- `REDIS_URL` — ઍપમાં ઇન્જેક્ટ કરાતી કનેક્શન સ્ટ્રિંગ (ડિફૉલ્ટ રૂપે `redis://redis:6379`).
- `REDIS_PORT` — Redis કન્ટેનર માટેનું હોસ્ટ-સાઇડ પોર્ટ મેપિંગ.
- `REDIS_BIND_HOST` — હોસ્ટ ઇન્ટરફેસ જેના પર પોર્ટ પ્રકાશિત થાય છે. ડિફૉલ્ટ `127.0.0.1` છે.

> **ડિફૉલ્ટ રૂપે લૂપબૅક શા માટે:** સાઇડકાર `requirepass` વિના ચાલે છે અને ઍપ
> કન્ટેનર્સ compose નેટવર્ક (`redis:6379`) મારફતે તેના સુધી પહોંચે છે — પ્રકાશિત પોર્ટ
> માત્ર હોસ્ટ-સાઇડ ટૂલિંગ (`redis-cli`, સ્થાનિક `npm run dev`) માટે છે. તેને
> `0.0.0.0` પર પ્રકાશિત કરવાથી તમારા LAN પરના દરેક હોસ્ટ સામે પ્રમાણીકરણ વિનાનું Redis ખુલ્લું થઈ જશે. જો તમે
> `REDIS_BIND_HOST=0.0.0.0` સેટ કરો, તો સર્વિસના `command:` માં `--requirepass` પણ ઉમેરો.

**Redis ને અક્ષમ કરવાની** ભલામણ કરવામાં આવતી નથી (રેટ લિમિટર ઇન-મેમરી ફૉલબૅક પર ઉતરી જશે). જો તેમ કરવું જ પડે, તો `docker-compose.yml` માંથી `redis:` સર્વિસ બ્લૉક દૂર કરો/કમેન્ટ કરો અથવા તેને શૂન્ય સુધી સ્કેલ કરો:

```bash
docker compose up -d --scale redis=0
```

## પ્રોડક્શન Compose

dev ની સાથે ચાલતા અલગ પ્રોડક્શન સ્નૅપશૉટ માટે `docker-compose.prod.yml` નો ઉપયોગ કરો.

| વિગત                   | મૂલ્ય                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| ફાઇલ                   | `docker-compose.prod.yml`                                                                 |
| ડિફૉલ્ટ ડૅશબોર્ડ પોર્ટ | `PROD_DASHBOARD_PORT=20130` (આંતરિક `${DASHBOARD_PORT:-20128}` સાથે મેપ થયેલ)             |
| ડિફૉલ્ટ API પોર્ટ      | `PROD_API_PORT=20131`                                                                     |
| ઇમેજ                   | `omniroute:prod` (`runner-cli` ટાર્ગેટમાંથી બિલ્ડ કરેલ)                                   |
| Redis કન્ટેનર          | `omniroute-redis-prod` (`redis:8.6.2`, સમર્પિત `redis-prod-data` વોલ્યુમ)                 |
| ડેટા વોલ્યુમ           | `omniroute-prod-data` (નામિત, રિબિલ્ડ્સ દરમિયાન જળવાયેલું)                                |
| હેલ્થચેક               | `node healthcheck.mjs` + `redis-cli ping`, જેમાં `depends_on` Redis ની હેલ્થ પર આધારિત છે |

ઉપયોગ કરવાની રીત:

```bash
# પ્રોડક્શન સ્ટૅક બિલ્ડ કરીને શરૂ કરો
docker compose -f docker-compose.prod.yml up -d --build

# લૉગ્સનું લાઇવ સ્ટ્રીમિંગ કરો
docker compose -f docker-compose.prod.yml logs -f

# બંધ કરો (વોલ્યુમ્સ જાળવી રાખો)
docker compose -f docker-compose.prod.yml down
```

પ્રોડક્શન સ્ટૅક dev compose ની સમાંતરે ચાલે છે (અલગ કન્ટેનર નામો, પોર્ટ્સ અને વોલ્યુમ્સ સાથે), તેથી પ્રોડક્શન ચાલુ રહે ત્યારે તમે સ્થાનિક રીતે કામ ચાલુ રાખી શકો છો.

## Dockerfile સ્ટેજ

રિપોઝિટરીમાં મલ્ટિ-સ્ટેજ Dockerfile (`Dockerfile`) આપવામાં આવે છે. ત્રણ સ્ટેજ ઉપલબ્ધ છે; તમારા ઉપયોગના કેસ માટે યોગ્ય `target` પસંદ કરો.

| સ્ટેજ         | બેઝ ઇમેજ              | હેતુ                                                                                                                                                                   |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ડિપેન્ડન્સીઓ ઇન્સ્ટોલ કરે છે (`npm ci --legacy-peer-deps`) અને `npm run build` ચલાવે છે (ડિફૉલ્ટ રૂપે Turbopack — નીચે બિલ્ડ-સમયનાં સંસાધનો જુઓ)                       |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone આઉટપુટ સાથેનું પ્રોડક્શન રનટાઇમ. **કોઈ પ્રોવાઇડર CLI સામેલ નથી.**                                                                                   |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` અને ગ્લોબલ CLI ઉમેરે છે: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **એજન્ટિક વર્કફ્લો માટે આ પસંદ કરો.** |

ચોક્કસ ટાર્ગેટને મેન્યુઅલી બિલ્ડ કરો:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### બિલ્ડ-સમયનાં સંસાધનો

ત્રણ બિલ્ડ આર્ગ્યુમેન્ટ `builder` સ્ટેજ કેટલાં સંસાધનો વાપરે છે તે નિયંત્રિત કરે છે. તેઓ ફક્ત બિલ્ડ સમયે લાગુ પડે છે —
`OMNIROUTE_MEMORY_MB` (નીચે) એક અલગ રનટાઇમ નિયંત્રણ છે.

| બિલ્ડ આર્ગ્યુમેન્ટ          | ડિફૉલ્ટ | અસર                                                                                                   |
| --------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`     | `0` તેના બદલે webpack વડે બિલ્ડ કરે છે. પીક મેમરી ઓછી, પરંતુ ધીમું.                                   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | શરૂ કરાયેલા `next build` માટે V8 હીપ મર્યાદા (`--max-old-space-size`).                                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | `CIRCLE_NODE_TOTAL`ને મૂલ્ય આપે છે; પેજ-ડેટા એકત્ર કરવા માટે Next `workers = N - 1` નિર્ધારિત કરે છે. |

મોટા બિલ્ડર પર `OMNIROUTE_BUILD_WORKERS`નું મૂલ્ય વધારવું જોઈએ અને મર્યાદિત
બિલ્ડ `✓ Compiled successfully` **પછી** નિષ્ફળ જાય ત્યારે સૌપ્રથમ તેના પર
શંકા કરવી જોઈએ. દરેક પેજ-ડેટા વર્કર પોતાની અલગ પ્રોસેસ છે અને પેરન્ટ
`next build` પોતે પણ એક અલગ પ્રોસેસ છે; લાઇવ VPS પુનરુત્પાદનમાં (ઇશ્યૂ #7518)
દરેક પ્રોસેસનું પીક RSS `NODE_OPTIONS` હીપ ફ્લેગથી સ્વતંત્ર રીતે ~4.5 GB
મપાયું હતું (Turbopack V8 હીપની બહાર નેટિવ/Rust મેમરીમાં કમ્પાઇલ કરે છે).
`2`નું ડિફૉલ્ટ મૂલ્ય (→ 1 વર્કર, કુલ 2 પ્રોસેસ) પબ્લિશ પાઇપલાઇન દ્વારા
વપરાતા 16 GB / 4 vCPU GitHub-હોસ્ટેડ રનર માટે નક્કી કરાયું છે. `8` પર
(→ 7 વર્કર) તે રનરની મેમરી ખૂટી ગઈ અને buildkitએ
`ResourceExhausted: ... cannot allocate memory` સાથે સ્ટેપ નિષ્ફળ કર્યો;
પ્રતિ-પ્રોસેસ RSSનું અનુમાન કરવાને બદલે તેને સીધું માપ્યા પછી `3`
(→ 2 વર્કર) પણ ફિટ થયું નહોતું. `tests/unit/docker-build-memory-budget.test.ts`
માપેલા આંકડાના આધારે ગણતરી કરે છે અને કોઈપણ નિયંત્રણ રનરની ક્ષમતાથી
વધી જાય તો નિષ્ફળ થાય છે.

Turbopack એવી નેટિવ Rust મેમરીમાં કમ્પાઇલ કરે છે જે V8 હીપની **બહાર** રહે છે,
તેથી `OMNIROUTE_BUILD_MEMORY_MB` તેને મર્યાદિત કરતું નથી. મેમરી મર્યાદાવાળા
હોસ્ટ પર OOM killer કોઈપણ એરર ટેક્સ્ટ વિના બિલ્ડને SIGKILL કરે છે — તે ફક્ત
`Creating an optimized production build`ની વચ્ચે અટકી જાય છે, જે આઉટ-ઓફ-મેમરીને
બદલે હેંગ થયું હોય તેવું લાગે છે. જો બિલ્ડ હોસ્ટ મર્યાદિત હોય, તો બંડલર બદલો:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` સક્ષમ છે, તેથી `next build` એક પેરન્ટ **અને** એક વર્કર
પ્રોસેસ ચલાવે છે અને દરેક `OMNIROUTE_BUILD_MEMORY_MB`ને અલગથી અનુસરે છે.
કન્ટેનરની મર્યાદા આ મૂલ્યથી આશરે બમણી કરતાં વધુ રાખો, માત્ર એકગણી નહીં.

આ ટ્રી પર માપેલું (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| બંડલર     | કન્ટેનર મર્યાદા | પરિણામ                               |
| --------- | --------------- | ------------------------------------ |
| Turbopack | 8 GiB / 16 GiB  | બંને પર કોઈ સંદેશ વિના OOM-kill થયું |
| webpack   | 8 GiB           | બિલ્ડ વર્કર SIGKILL થયો              |
| webpack   | 12 GiB          | સફળ થયું, 11.1 GiB પર પીક થયું       |

### રનટાઇમ ડિફૉલ્ટ

`runner-base` દ્વારા એક્સપોર્ટ કરાયેલા ડિફૉલ્ટ: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Dockerમાં મેમરીનું વર્તન:

- ઇમેજ `OMNIROUTE_MEMORY_MB=1024` સેટ કરે છે અને તેમાંથી `NODE_OPTIONS=--max-old-space-size=1024` નિર્ધારિત કરે છે.
- વાસ્તવિક સર્વર પ્રોસેસ standalone launcher દ્વારા શરૂ થાય છે, જે `OMNIROUTE_MEMORY_MB` વાંચે છે અને `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` ઉમેરે છે.
- Node વારંવાર આપેલા `--max-old-space-size`નું છેલ્લું મૂલ્ય વાપરે છે, તેથી `OMNIROUTE_MEMORY_MB` સેટ કરવાથી Dockerની અસરકારક હીપ મર્યાદા નિયંત્રિત થાય છે.
- ઇમેજ તેને હંમેશાં સેટ કરતી હોવાથી launcherનું પોતાનું RAM-કેલિબ્રેટેડ ફૉલબૅક Docker હેઠળ ક્યારેય લાગુ પડતું નથી. વર્કલોડ માટે તેને સ્પષ્ટ રીતે વધારો (નીચેનું કોષ્ટક). કોડિંગ-એજન્ટ `/v1/responses` માટે `2048` હજુ પણ બહુ ઓછું છે.

### કોડિંગ એજન્ટ માટે રનટાઇમ RAM

1 GiBનું Docker ડિફૉલ્ટ ડૅશબોર્ડ/હળવી-ચેટ માટેનું ન્યૂનતમ સ્તર છે, પ્રોડક્શન સાઇઝ નથી. લાંબી `POST /v1/responses` બોડી (સેંકડો સંદેશા, દસેક ટૂલ) કમ્પ્રેશન દરમિયાન મેમરીમાં અનેક ગ્રાફ જાળવી રાખે છે. એકસાથે આવતી ~3 MiB / ~750k-tokenની બે રિક્વેસ્ટે **12 GiB** old-space પર V8ને બંધ કરાવી દીધું છે (`FATAL ERROR: Reached heap limit`) અને 16 GiB cgroup OOM પણ સર્જ્યો છે. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) જુઓ.

cgroup `--memory`નું કદ **હીપ કરતાં વધુ** રાખો — નેટિવ બફર, SQLite અને કમ્પ્રેશનનાં મધ્યવર્તી ડેટા V8ની બહાર રહે છે.

| વર્કલોડ                             | `OMNIROUTE_MEMORY_MB` | કન્ટેનર / cgroup       | નોંધો                                                                               |
| ----------------------------------- | --------------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| ડૅશબોર્ડ, એક હળવી ચેટ               | `1024` (ઇમેજ ડિફૉલ્ટ) | ≥2 GiB                 |                                                                                     |
| એક કોડિંગ એજન્ટ (Claude/Codex/Grok) | `8192`                | ≥10 GiB                | સામાન્ય એકલ-સત્ર `/v1/responses`                                                    |
| એકસાથે બે લાંબા `/v1/responses`     | `10240`–`12288`       | ≥12–16 GiB             | ~12 GiB હીપ પર માપવામાં આવેલ V8 અબૉર્ટ                                              |
| એકસાથે ત્રણથી વધુ લાંબા કોન્ટેક્સ્ટ | એક પ્રોસેસ પર ન ચલાવો | ક્રમશઃ ચલાવો / વધુ RAM | ડિફૉલ્ટ હેવીવેઇટ એડમિશનમાં 1 ઇન-ફ્લાઇટ છે; RAM વિના તેને વધારવાથી અબૉર્ટ ફરી થાય છે |

જ્યારે `OMNIROUTE_MEMORY_MB` **સેટ ન હોય**, ત્યારે બેર મેટલ પર `omniroute serve` RAMના ~35% મુજબ કેલિબ્રેટ થાય છે (`[512, 4096]` સુધી મર્યાદિત). Docker હંમેશાં `1024` સેટ કરે છે, તેથી અધિકૃત ઇમેજમાં આ કેલિબ્રેશન ક્યારેય ચાલતું નથી.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## મહત્વપૂર્ણ એન્વાયરમેન્ટ વેરિએબલ્સ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) માં દસ્તાવેજીકૃત ડિફૉલ્ટ્સ ઉપરાંત, Docker હેઠળ ચલાવતી વખતે નીચેના વેરિએબલ્સ સૌથી વધુ મહત્વ ધરાવે છે:

| વેરિએબલ                       | હેતુ                                                                                                                                                                                                                                                                              | ડિફૉલ્ટ                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket બ્રિજ માટેનું સહિયારું સિક્રેટ. **પ્રોડક્શનમાં આવશ્યક** — તેને એક મજબૂત રેન્ડમ સ્ટ્રિંગ પર સેટ કરો.                                                                                                                                                                     | સેટ કરેલ નથી (આપવું આવશ્યક છે) |
| `REDIS_URL`                   | રેટ લિમિટર / કૅશ બૅકએન્ડ માટેની કનેક્શન સ્ટ્રિંગ                                                                                                                                                                                                                                  | `redis://redis:6379`           |
| `REDIS_PORT`                  | બંડલ કરેલા Redis કન્ટેનર માટેનો હોસ્ટ-સાઇડ પોર્ટ                                                                                                                                                                                                                                  | `6379`                         |
| `REDIS_BIND_HOST`             | હોસ્ટ ઇન્ટરફેસ કે જેના પર બંડલ કરેલો Redis પોર્ટ પ્રકાશિત થાય છે (જ્યાં સુધી તમે AUTH ઉમેરતા નથી ત્યાં સુધી લૂપબૅક)                                                                                                                                                               | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | સ્વ-અપડેટ વર્કફ્લો માટે `cli` પ્રોફાઇલમાં `/workspace/omniroute` પર માઉન્ટ કરેલો હોસ્ટ પાથ                                                                                                                                                                                        | `.` (વર્તમાન ડિરેક્ટરી)        |
| `OMNIROUTE_MEMORY_MB`         | Docker સ્ટૅન્ડઅલોન સર્વર માટેની રનટાઇમ Node હીપ મર્યાદા; ઉપરના ઇમેજ ડિફૉલ્ટને ઓવરરાઇડ કરે છે. કોડિંગ એજન્ટ્સ: `8192`+ ([રનટાઇમ RAM](#runtime-ram-for-coding-agents) જુઓ).                                                                                                         | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | ડૅશબોર્ડ (20128) અને API (20129) માટેના એક્સપોઝ કરેલા પોર્ટ્સને ઓવરરાઇડ કરે છે                                                                                                                                                                                                    | `20128` / `20129`              |
| `APP_BIND_HOST`               | હોસ્ટ ઇન્ટરફેસ કે જેના પર docker-compose ડૅશબોર્ડ/API/live-WS પોર્ટ્સ પ્રકાશિત કરે છે. `REQUIRE_API_KEY=false` (ડિફૉલ્ટ) સાથે, `0.0.0.0` અનામી `/v1` પ્રૉક્સીને LAN પર એક્સપોઝ કરે છે — તેને માત્ર `REQUIRE_API_KEY=true` સાથે અથવા આગળ રિવર્સ પ્રૉક્સી હોય ત્યારે જ વિસ્તૃત કરો. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | હોસ્ટ ઇન્ટરફેસ કે જેના પર docker-compose `cliproxyapi` સાઇડકાર પ્રકાશિત કરે છે — તેના ડેટા વૉલ્યુમમાં પ્રદાતાના ઓળખપત્રો સંગ્રહિત હોય છે.                                                                                                                                         | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | ડિરેક્ટરી કે જેને રનટાઇમ પ્લગઇન સ્કૅનર વાંચે છે અને જેમાં ઇન્સ્ટૉલ કરે છે. પ્લગઇન્સ બાઇન્ડ-માઉન્ટ કરેલા હોય ત્યારે તેને સેટ કરો: ડિફૉલ્ટ `HOME`ને અનુસરે છે, જેને ઇમેજ એક્સપોર્ટ કરે તે જરૂરી નથી.                                                                                | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | જ્યારે ઍપ રિવર્સ પ્રૉક્સી પાછળ પ્રકાશિત કરવામાં આવે ત્યારેનો URL સબપાથ (દા.ત. `/omniroute`)                                                                                                                                                                                       | _(ખાલી = રૂટ)_                 |
| `NEXT_PUBLIC_BASE_URL`        | સબપાથ સહિતનું સાર્વજનિક બ્રાઉઝર ઑરિજિન (દા.ત. `https://host/omniroute`)                                                                                                                                                                                                           | સેટ કરેલ નથી                   |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` માટેનો હોસ્ટ-સાઇડ ડૅશબોર્ડ પોર્ટ                                                                                                                                                                                                                        | `20130`                        |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` સાઇડકાર માટેનો હોસ્ટ-સાઇડ પોર્ટ                                                                                                                                                                                                                                     | `8317`                         |

## સબપાથ પર રિવર્સ પ્રોક્સી (Traefik / nginx)

Next.js `basePath` ને સ્ટૅન્ડઅલોન બંડલમાં કમ્પાઇલ કરવામાં આવે છે. OmniRoute બેક કરેલું
મૂલ્ય ઍપ રૂટ પરની સેન્ટિનલ ફાઇલમાં નોંધે છે (`npm run build` દરમિયાન લખાય છે;
`scripts/docker/ensure-docker-base-path.mjs` દ્વારા વાંચવામાં આવે છે) અને કન્ટેનર શરૂ થાય
ત્યારે તેની તુલના `OMNIROUTE_BASE_PATH` સાથે કરે છે. જ્યારે બંને અલગ હોય અને ઇમેજ
ડોમેન રૂટ માટે બિલ્ડ કરવામાં આવી હોય, ત્યારે એન્ટ્રીપોઇન્ટ સ્ટૅન્ડઅલોન મેનિફેસ્ટ્સ,
એમ્બેડ કરેલા `basePath`/`assetPrefix` લિટરલ્સ (Next 16 માત્ર `assetPrefix` માંથી SSR
ઍસેટ URL રેન્ડર કરે છે — પૅચર તેમાં સબપાથને પ્રતિબિંબિત કરે છે), બેક કરેલા
`/_next/static` ઍસેટ URL (ક્લાયન્ટ-રેફરન્સ મેનિફેસ્ટ્સ, મીડિયા ઇમ્પોર્ટ્સ, પ્રીરેન્ડર
કરેલા એરર પેજ) અને ક્લાયન્ટ `process.env` શિમને `node dev/run-standalone.mjs`
ચાલે તે પહેલાં ફરીથી લખે છે.

### Compose બિલ્ડ (ભલામણ કરેલ)

બંને વેરિએબલ્સ `.env` માં સેટ કરો, ત્યારબાદ ઇમેજ અને રનટાઇમ સુસંગત રહે તે માટે ફરીથી બિલ્ડ કરો:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` ને Docker બિલ્ડ-આર્ગ તરીકે અને
રનટાઇમ એન્વાયર્નમેન્ટ વેરિએબલ તરીકે ફોરવર્ડ કરે છે.

### અગાઉથી બિલ્ડ કરેલી રૂટ ઇમેજ + રનટાઇમ સબપાથ

પ્રકાશિત `diegosouzapw/omniroute:*` ઇમેજ ડોમેન રૂટ માટે બિલ્ડ કરવામાં આવે છે. તમે હજી પણ
રનટાઇમ પર `OMNIROUTE_BASE_PATH` સેટ કરી શકો છો; કન્ટેનર સ્ટાર્ટઅપ વખતે બંડલને એક વાર પૅચ કરે છે.
તેને મેળ ખાતા પબ્લિક ઓરિજિન સાથે જોડી દો:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**સંપૂર્ણ** બાહ્ય પાથ ફોરવર્ડ કરવા માટે રિવર્સ પ્રોક્સીને કૉન્ફિગર કરો (પ્રિફિક્સ દૂર કરશો
નહીં). Traefik એ `StripPrefix` વિના `PathPrefix(`/omniroute`)` ને કન્ટેનર તરફ
રૂટ કરવું જોઈએ, જેથી Next.js ને `/omniroute/...` મળે અને તે
`/omniroute/_next/...` માંથી ઍસેટ્સ સર્વ કરે.

Docker હેલ્થચેક, સક્રિય `OMNIROUTE_BASE_PATH` પ્રિફિક્સ સાથેના હળવા `/healthz`
લાઇફસાઇકલ એન્ડપોઇન્ટને પ્રોબ કરે છે. માનવીય/ડૅશબોર્ડ ડાયગ્નોસ્ટિક્સ માટે
`/api/monitoring/health` ઉપલબ્ધ રહે છે; કન્ટેનર HEALTHCHECK ને ફરીથી તેના પર નિર્દેશિત
કરવા માટે (ઉદાહરણ તરીકે, ડીપ હેલ્થ એન્ફોર્સમેન્ટ માટે),
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` સેટ કરો. તે પાથ એક **ડીપ**
ચેક (DB + મોનિટરિંગ સારાંશ) છે — જો તમે ફરીથી તેને પસંદ કરો તો Docker ના ઓછા
આવર્તનવાળા `HEALTHCHECK` માટે યોગ્ય છે, પરંતુ Kubernetes `livenessProbe`
ઇન્ટરવલ્સ માટે **નહીં**.

ઓર્કેસ્ટ્રેટર્સ (Kubernetes, Nomad, વગેરે) માટે:

| પ્રોબ            | પસંદ કરો                                                             | ટાળો                                           |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------- |
| લાઇવનેસ          | HTTP `GET /livez`, અથવા મુખ્ય પોર્ટ (`PORT`, ડિફૉલ્ટ `20128`) પર TCP | લાઇવનેસ તરીકે `/api/monitoring/health`         |
| રેડીનેસ          | HTTP `GET /healthz`                                                  | ઇવેન્ટ-લૂપ વ્યસ્તતાને ડેડ ગણતા ટૂંકા ટાઇમઆઉટ્સ |
| ડીપ / બ્લૅકબૉક્સ | `/api/monitoring/health`                                             | —                                              |

`/healthz` પ્રોસેસ લાઇફસાઇકલ (`ok` / `starting` / `stopping`) રિપોર્ટ કરે છે. `/livez`
માત્ર પ્રોસેસ ચાલુ છે કે નહીં તે દર્શાવે છે (જ્યારે પણ હૅન્ડલર ચાલી શકે ત્યારે 200; તે
રેડીનેસની રાહ જોતું નથી). બંને હજી પણ રિક્વેસ્ટ હૅન્ડલિંગ જેવા જ Node ઇવેન્ટ લૂપ પર
ચાલે છે, તેથી CPU-બાઉન્ડ કૅટલૉગ અથવા કમ્પ્રેશન કાર્ય તેમને વિલંબિત કરી શકે છે —
વ્યસ્ત ≠ ડેડ. જો HTTP પ્રોબ્સ ટાઇમઆઉટ થાય તો TCP લાઇવનેસને પ્રાધાન્ય આપો. પ્રોબ વિશે
સંપૂર્ણ માર્ગદર્શન:
[મોનિટરિંગ માર્ગદર્શિકા — Kubernetes પ્રોબ ભલામણો](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy સાથે Docker Compose (HTTPS Auto-TLS)

Caddyની સ્વચાલિત SSL પ્રોવિઝનિંગનો ઉપયોગ કરીને OmniRouteને સુરક્ષિત રીતે જાહેર કરી શકાય છે. ખાતરી કરો કે તમારા ડોમેનનો DNS A રેકોર્ડ તમારા સર્વરના IP તરફ નિર્દેશ કરે છે.

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
      # OAuth કૉલબૅક્સ, ડૅશબોર્ડ લિંક્સ અને જનરેટ થયેલા જાહેર URLs માટે બ્રાઉઝર-સામેનું ઓરિજિન.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # શેડ્યૂલ કરેલ જોબ્સ / સેલ્ફ-ફેચ માટે આંતરિક સર્વર-ટુ-સર્વર URL.
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

Caddy અપસ્ટ્રીમ કન્ટેનર માટે પ્રમાણભૂત ફોરવર્ડિંગ હેડર્સ સેટ કરે છે. OmniRoute OAuth કૉલબૅક્સ અને જનરેટ થયેલી જાહેર
લિંક્સ માટે `NEXT_PUBLIC_BASE_URL`નો કેનોનિકલ જાહેર ઓરિજિન તરીકે ઉપયોગ કરે છે; પ્રમાણિત ડૅશબોર્ડ રાઇટ્સ સમાન-ઓરિજિન વિનંતીઓની સાથે સેશન-બાઉન્ડ CSRF
સુરક્ષાનો ઉપયોગ કરે છે. `OMNIROUTE_TRUST_PROXY`ને માત્ર એવા અદ્યતન ડિપ્લોયમેન્ટ્સ માટે સક્ષમ કરો, જ્યાં તમે સ્પષ્ટ
કન્ફિગરેશનના બદલે વિશ્વસનીય ફોરવર્ડેડ હેડર્સમાંથી OmniRoute દ્વારા જાહેર ઓરિજિન મેળવવા ઇરાદાપૂર્વક ઇચ્છતા હોવ.

## Cloudflare Quick Tunnel

Docker ડિપ્લોયમેન્ટ્સ માટેના ડૅશબોર્ડ સપોર્ટમાં `Dashboard → Endpoints` પર એક-ક્લિક **Cloudflare Quick Tunnel** સામેલ છે. પ્રથમ વખત સક્ષમ કરવાથી માત્ર જરૂર પડે ત્યારે `cloudflared` ડાઉનલોડ થાય છે, તમારા વર્તમાન `/v1` એન્ડપોઇન્ટ માટે અસ્થાયી ટનલ શરૂ થાય છે અને જનરેટ થયેલ `https://*.trycloudflare.com/v1` URL તમારા સામાન્ય જાહેર URLની સીધી નીચે દેખાય છે.

સક્રિય ટનલની સ્થિતિ બદલ્યા વિના એન્ડપોઇન્ટ ટનલ પેનલ્સ (Cloudflare, Tailscale, ngrok)ને `Settings → Appearance`માંથી બતાવી અથવા છુપાવી શકાય છે.

### ટનલ નોંધો

- Quick Tunnel URLs અસ્થાયી હોય છે અને દરેક રીસ્ટાર્ટ પછી બદલાય છે.
- OmniRoute અથવા કન્ટેનર રીસ્ટાર્ટ થયા પછી Quick Tunnels આપમેળે પુનઃસ્થાપિત થતા નથી. જરૂર પડે ત્યારે તેમને ડૅશબોર્ડમાંથી ફરીથી સક્ષમ કરો.
- મેનેજ્ડ ઇન્સ્ટોલ હાલમાં `x64` / `arm64` પર Linux, macOS અને Windowsને સપોર્ટ કરે છે.
- મર્યાદિત કન્ટેનર વાતાવરણોમાં ઘોંઘાટભરી QUIC UDP બફર ચેતવણીઓ ટાળવા માટે મેનેજ્ડ Quick Tunnels ડિફૉલ્ટ રૂપે HTTP/2 ટ્રાન્સપોર્ટનો ઉપયોગ કરે છે. જો તમને અલગ ટ્રાન્સપોર્ટ જોઈતું હોય તો `CLOUDFLARED_PROTOCOL=quic` અથવા `auto` સેટ કરો.
- Docker ઇમેજિસ સિસ્ટમ CA રૂટ્સને સાથે સમાવે છે અને તેમને મેનેજ્ડ `cloudflared`ને પાસ કરે છે, જે કન્ટેનરની અંદર ટનલ બૂટસ્ટ્રૅપ થાય ત્યારે TLS ટ્રસ્ટ નિષ્ફળતાઓને ટાળે છે.
- જો તમે ઇચ્છતા હોવ કે OmniRoute નવું બાઇનરી ડાઉનલોડ કરવાને બદલે હાલના બાઇનરીનો ઉપયોગ કરે, તો `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` સેટ કરો.

## ઇમેજ ટૅગ્સ

| ઇમેજ                     | ટૅગ      | કદ     | વર્ણન                                                |
| ------------------------ | -------- | ------ | ---------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | સર્વોચ્ચ **પ્રકાશિત** સ્થિર SemVer (git `main` નહીં) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps માટે આ પ્રકારનો ટૅગ પિન કરો                   |

મલ્ટિ-પ્લેટફોર્મ મેનિફેસ્ટ: `linux/amd64` + `linux/arm64` નેટિવ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker મેળ ખાતું આર્કિટેક્ચર આપમેળે પસંદ કરે છે; જો તમારે ARM હોસ્ટ્સ પર AMD64 ઇમ્યુલેશન ફરજિયાત કરવું હોય, તો `--platform linux/amd64` પાસ કરો.

### રિલીઝ ચેનલ્સ

OmniRoute સ્થિર રિલીઝિસ, સક્રિય રિલીઝ-બ્રાન્ચ પરીક્ષણ અને ડેવલપમેન્ટ બિલ્ડ્સ માટે અલગ Docker ચેનલ્સ પ્રકાશિત કરે છે.

| ચેનલ                            | સ્રોત                                | પરિવર્તનક્ષમતા                 | ભલામણ કરેલો ઉપયોગ                                                                                                   |
| ------------------------------- | ------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | સાઇન કરેલી/વર્ઝન કરેલી રિલીઝ         | અપરિવર્તનશીલ                   | ચોક્કસ રિલીઝને પિન કરતા પ્રોડક્શન ડિપ્લોયમેન્ટ્સ                                                                    |
| `:latest` / `:latest-web`       | સર્વોચ્ચ **પ્રકાશિત** સ્થિર SemVer   | પરિવર્તનશીલ સ્થિર પોઇન્ટર      | SemVer પ્રકાશન જોબ **પછી** સ્થિર રિલીઝિસને અનુસરે છે — `main` અથવા અપ્રકાશિત `release/v*` કમિટ્સને અનુસરતું **નથી** |
| `:next` / `:next-web`           | વર્તમાન ડિફૉલ્ટ `release/v*` બ્રાન્ચ | પરિવર્તનશીલ પ્રી-રિલીઝ પોઇન્ટર | સક્રિય રિલીઝ બ્રાન્ચ પર આવી ગયેલા પરંતુ હજી સ્થિર રિલીઝમાં ન હોય તેવા સુધારાઓનું પરીક્ષણ                            |
| `:main` / `:main-web`           | `main` બ્રાન્ચ                       | પરિવર્તનશીલ ડેવલપમેન્ટ પોઇન્ટર | માત્ર ડેવલપમેન્ટ અને ઇન્ટિગ્રેશન પરીક્ષણ માટે                                                                       |

#### પ્રી-રિલીઝ ચેનલનો ઉપયોગ

વર્તમાન ડિફૉલ્ટ `release/v*` બ્રાન્ચ પરના દરેક પુશ વખતે `next` ચેનલ ફરીથી બિલ્ડ થાય છે અને AMD64 તથા ARM64 બંને માટે પ્રકાશિત થાય છે. જૂની મેન્ટેનન્સ બ્રાન્ચિસ તેને ઓવરરાઇટ કરી શકતી નથી. આ ચેનલ આગામી સ્થિર ટૅગ બનાવવામાં આવે તે પહેલાં સક્રિય રિલીઝ બ્રાન્ચમાં મર્જ થયેલા સુધારાઓ માટે પુલ કરી શકાય તેવી ઇમેજ પૂરી પાડે છે.

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

પરીક્ષણ પહેલાં, OmniRoute ડેટા વોલ્યુમ અથવા bind-mounted ડેટા ડિરેક્ટરીનો બૅકઅપ લો. પાછા ફરવા માટે, અગાઉ ઉપયોગમાં લીધેલું સ્થિર વર્ઝન અથવા digest પુનઃસ્થાપિત કરો અને કન્ટેનર ફરીથી બનાવો:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch બિલ્ડ ક્યારેય `latest`ને ખસેડી શકતું નથી; માત્ર પાત્ર સ્થિર semantic version જ સ્થિર pointerને પ્રોત્સાહિત કરી શકે છે. `next` imagesમાં release imageનું નિરીક્ષણ અને અવરોધક CRITICAL-vulnerability gate યથાવત્ રહે છે.

**`latest` એ git માટે તાજગીની બાંયધરી નથી.** `main` અથવા સક્રિય `release/v*` branch પર merge થયેલા સુધારાઓ ત્યાં સુધી `:latest`માં હોતા **નથી**, જ્યાં સુધી સ્થિર SemVer image પ્રકાશિત ન થાય અને publish job `:latest`ને પ્રોત્સાહિત ન કરે (તે SemVer જેટલો જ digest). જો GitHub પર સુધારો પહેલેથી દેખાતો હોવા છતાં `latest` સ્થિર જણાય, તો release branchનું પરીક્ષણ કરવા માટે `:next` pull કરો અથવા SemVer tagની રાહ જુઓ.

| તમને શું જોઈએ છે                                                               | ઉપયોગ કરો                                |
| ------------------------------------------------------------------------------ | ---------------------------------------- |
| GitOps / production જેમાં drift થવું ન જોઈએ                                    | `:X.Y.Z`ને pin કરો (અથવા image digestને) |
| પ્રકાશિત stable releasesને અનુસરો અને દરેક release પર ફરીથી બનાવવાનું સ્વીકારો | `:latest`                                |
| અપ્રકાશિત `release/v*` commitsનું પરીક્ષણ કરો                                  | `:next` (production માટે નહીં)           |
| `main`નું પરીક્ષણ કરો                                                          | `:main` (production માટે નહીં)           |

## ઉપલબ્ધતા: ડિફૉલ્ટ SQLite સિંગલ-રિપ્લિકા છે

સ્ટાન્ડર્ડ Docker / Kubernetes OmniRoute એ **એક Node પ્રોસેસ + એક SQLite રાઇટર** છે. આ ટોપોલોજી પર ઉચ્ચ ઉપલબ્ધતા **સમર્થિત નથી**.

| મર્યાદા                                     | પરિણામ                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| સિંગલ રાઇટર                                 | એક જ SQLite ફાઇલ સામે બહુવિધ રિપ્લિકા **ચલાવશો નહીં**. તેનાથી DB દૂષિત થાય છે.                                                                                                                                                                                                                                              |
| ફરી બનાવવું / પુનઃપ્રારંભ / HEALTHCHECK કિલ | ચાલુ SSE, ડૅશબોર્ડ સેશનો અને ઇન-મેમરી સ્થિતિનો **સંપૂર્ણ આઉટેજ**. દરેક જોડાયેલ ક્લાયન્ટનું કનેક્શન તૂટી જાય છે. એન્ડપૉઇન્ટ ખાલી હોય તે સમયગાળા દરમિયાન નવી વિનંતીઓને OmniRoute JSONને બદલે રિવર્સ-પ્રૉક્સી **`502 Bad Gateway: Unknown error`** મળે છે — ક્લાયન્ટ્સ તેને પ્રોવાઇડરની નિષ્ફળતાથી અલગ ઓળખી શકતા નથી (#11015). |
| `/healthz` જેવો જ ઇવેન્ટ લૂપ                | વ્યસ્ત કૅટલૉગ અથવા કમ્પ્રેશન ટિક પ્રોબ્સમાં વિલંબ કરી શકે છે; ત્યારબાદ ટૂંકો ટાઇમઆઉટ **એકમાત્ર** રિપ્લિકાને પુનઃપ્રારંભ કરે છે.                                                                                                                                                                                             |

**પ્રોબ મેટ્રિક્સ** ([Kubernetes પ્રોબ ભલામણો](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) પણ જુઓ):

| પ્રોબ            | લક્ષ્ય                                                      | આનો ઉપયોગ કરશો નહીં                                    |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| લાઇવનેસ          | `PORT` પર TCP (ડિફૉલ્ટ `20128`), અથવા સોફ્ટ HTTP `/healthz` | `/api/monitoring/health`                               |
| રેડીનેસ          | HTTP `GET /healthz`                                         | ઇવેન્ટ લૂપ વ્યસ્ત હોય તેને બંધ માને તેવા ચુસ્ત ટાઇમઆઉટ |
| ડીપ / માનવો માટે | `/api/monitoring/health`                                    | સ્વચાલિત kubelet લાઇવનેસ                               |

**અપગ્રેડ્સ:** દરેક સેશન તૂટી જવાની અપેક્ષા રાખો. શક્ય હોય તો ક્લાયન્ટ્સને ડ્રેઇન કરો; ડિફૉલ્ટ SQLite પર કોઈ રોલિંગ અપડેટ નથી. Compose `restart: unless-stopped` અને Docker `HEALTHCHECK` સાથે મળીને કન્ટેનર Unhealthy થાય ત્યારે એકમાત્ર પ્રોસેસને પણ બદલી દેશે — અસરનો વ્યાપ સમાન રહેશે.

**સિંગલ રિપ્લિકા** માટેનો Kubernetes સ્નિપેટ (Recreate આવશ્યક છે; એક SQLite ફાઇલ સામે `replicas` વધારશો નહીં):

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

`preStop` સ્લીપ kubeને SIGTERM પહેલાં Service એન્ડપૉઇન્ટ્સ દૂર કરવાની તક આપે છે, જેથી **નવો** ટ્રાફિક બંધ થઈ રહેલી પ્રોસેસ સુધી પહોંચવાનું બંધ કરે. ચાલુ `/v1/responses` SSEને હેવીવેઇટ એડમિશન લીઝ દ્વારા `SHUTDOWN_TIMEOUT_MS` (ડિફૉલ્ટ 30s) સુધી ડ્રેઇન કરવામાં આવે છે (#11015). હજુ પણ પ્રોસેસ સુધી પહોંચતી નવી વિનંતીઓને `503` + `Retry-After: 5` મળે છે. બદલીની પ્રોસેસ Ready થાય ત્યાં સુધીનો Recreate ખાલી-એન્ડપૉઇન્ટ અંતરાલ સંપૂર્ણ આઉટેજ જ રહે છે — આ SQLite ટોપોલોજીની મર્યાદા છે, પ્રોબનું ખોટું કૉન્ફિગરેશન નહીં.

બાહ્ય Postgres / મલ્ટિ-રાઇટર HA એ દસ્તાવેજીકૃત સ્ટાન્ડર્ડ માર્ગ **નથી**. જો તમને HAની જરૂર હોય, તો એક જ રિપ્લિકા રાખો અથવા એવો ટોપોલોજી ચલાવો જેને પ્રોજેક્ટે અલગથી પરીક્ષણ કરીને દસ્તાવેજીકૃત કર્યો હોય. Postgres/MySQL સંબંધિત કાર્ય [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)માં છે. તે ઉપલબ્ધ થાય ત્યાં સુધી, **મોટી** `/v1/responses` ક્ષમતા વધારવાની એકમાત્ર સમર્થિત રીત N સ્વતંત્ર પ્રોસેસ છે (આગળનો વિભાગ), એક વોલ્યુમ પર `replicas > 1` નહીં.

## સ્કેલ-આઉટ: N સ્વતંત્ર પ્રક્રિયાઓ

એક Node પ્રક્રિયા એટલે **એક V8 heap**. એકબીજા સાથે ઓવરલેપ થતી ~3 MiB / ~750k-token coding-agent `POST /v1/responses` વિનંતીઓની જોડી (RTK + Caveman) ~12 Gi પર તે heap ને એબોર્ટ કરે છે (`FATAL ERROR: Reached heap limit`) અને 16 Gi cgroup માં OOM સર્જી શકે છે. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) જુઓ. આ માપન એક **મેમરી-બજેટ** ચેતવણી છે, એકસાથે ચાલતી લાંબી `/v1/responses` વિનંતીઓ માટે ઉત્પાદનની બેની હાર્ડ મહત્તમ મર્યાદા નથી. હેવીવેઇટ ચેટનો પ્રવેશ આપમેળે નિર્ધારિત ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) દ્વારા નિયંત્રિત થાય છે, જે એ જ V8/cgroup મર્યાદાના આધારે માપવામાં આવે છે — પહેલેથી માપ નક્કી કરેલી પ્રક્રિયામાં તેને ઉપરની તરફ ઓવરરાઇડ કરવાથી (અથવા જૂની `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count મર્યાદા સેટ કરવાથી) ફરી એબોર્ટ થાય છે. નાની ચેટ્સ, `/healthz`, `/v1/models`, અને MCP એ મર્યાદામાં **આવતાં નથી**.

### એક પ્રક્રિયા: બે કરતાં વધુ લાંબી `/v1/responses`

એક **સ્વસ્થ** પ્રક્રિયા (heap એ `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` કરતાં નીચે, ડિફૉલ્ટ `0.75`) પ્રક્રિયા-વ્યાપી inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) માં હજુ જગ્યા હોય ત્યારે એકસાથે બે કરતાં વધુ લાંબી `POST /v1/responses` વિનંતીઓ ચલાવી **શકે છે**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` જેટલી કે તેથી મોટી bodies (ડિફૉલ્ટ 256 KiB) structure-heavy વિનંતીઓ જેવી જ હેવીવેઇટ લીઝ લે છે અને એ જ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) નો ઉપયોગ કરે છે. એકસાથે ચાલતા દસકાઓ લાંબા SSE clients (ઓપરેટરોને ઘણી વાર 40–50ની જરૂર પડે છે) એ **મેમરી-બજેટ**નો પ્રશ્ન છે — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ને યોગ્ય રીતે માપો — તે ઉત્પાદનની હાર્ડ “મહત્તમ 2” મર્યાદા નથી. દબાણ હેઠળનું heap હજુ પણ ફરી પ્રયાસ કરી શકાય તેવા `503` સાથે લોડ ઘટાડે છે, જેથી #7849 ફરી ન આવે.

**heaps ને ગુણાકારે વધારવા** (સ્વતંત્ર V8 old-spaces) **આજે જ**:

| કરો                                                                                                                                                             | ન કરો                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **N containers/pods** ચલાવો, દરેકનું **પોતાનું** `DATA_DIR` / volume હોવું જોઈએ                                                                                 | એક SQLite file માટે `replicas > 1` સેટ ન કરો                    |
| heap / inflight-byte budget ના આધારે heavy in-flight + healthy-headroom નું માપ નક્કી કરો; 1–2 એ રૂઢિચુસ્ત #7849 ડિફૉલ્ટ છે, ઉત્પાદનની હાર્ડ મહત્તમ મર્યાદા નથી | એક પ્રક્રિયાને 8× RAM અને અમર્યાદિત count cap ન આપો             |
| વૈકલ્પિક: **વહેંચાયેલા quota counters** માટે `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                               | Redis ને વહેંચાયેલ SQLite ન માનો — તે એવું નથી                  |
| દરેક instance માં provider secrets ની નકલ કરો (અથવા વિભાજિત dashboards સ્વીકારો)                                                                                | બધા instances માટે એક dashboard / એક call-log ની અપેક્ષા ન રાખો |
| આગળ કોઈપણ load balancer મૂકો; API key અથવા session પ્રમાણે sticky routing પૂરતું છે                                                                             | vendor-specific size-aware middleware આવશ્યક ન બનાવો            |

હાર્ડવેર: દરેક instance પર એકસાથે ચાલતી લાંબી `/v1/responses` વિનંતીઓની સંખ્યા એ **મેમરી-બજેટ**નો પ્રશ્ન છે (heap + inflight-byte / #10110). `N` સ્વતંત્ર `DATA_DIR`s હજુ પણ heaps ને ગુણાકારે વધારે છે: host RAM એ `N × cgroup` ને સમાવવા માટે પૂરતી હોવી જોઈએ, “N=8 ધરાવતો એક 16 Gi pod” નહીં. એક SQLite file પર ક્યારેય `replicas > 1` ન રાખો.

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

પ્રક્રિયાની અંદરની ઘનતા (HTTP isolate પરથી compression દૂર કરવું) માટે [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) જુઓ. વહેંચાયેલી durable state પરના એક logical cluster માટે [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) જુઓ.

## મહત્વપૂર્ણ નોંધો

- **SQLite WAL મોડ:** `docker stop` ને પૂર્ણ થવા દેવું જોઈએ, જેથી OmniRoute નવીનતમ ફેરફારોને ફરીથી `storage.sqlite` માં ચેકપોઇન્ટ કરી શકે. સાથે આપેલી Compose ફાઇલો પહેલેથી જ 40s નો સ્ટોપ ગ્રેસ પિરિયડ સેટ કરે છે. જો તમે ઇમેજને સીધી ચલાવો છો, તો `--stop-timeout 40` જાળવી રાખો.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** જો નિયમિત/લખાણ-પૂર્વ બૅકઅપ બાહ્ય રીતે સંચાલિત થતા હોય, તો તેને `true` પર સેટ કરો. હાલના ડેટાબેઝના માઇગ્રેશન માટે હજી પણ તેમનો પોતાનો ટકાઉ સુરક્ષા સ્નૅપશૉટ અને સામૂહિક-માઇગ્રેશન ગાર્ડ જરૂરી છે.
- **ડેટા જાળવણી:** કન્ટેનર રીસ્ટાર્ટ દરમિયાન તમારા ડેટાબેઝ, કીઓ અને કન્ફિગરેશનો જાળવી રાખવા માટે હંમેશાં `/app/data` પર વોલ્યુમ માઉન્ટ કરો.
- **પોર્ટ કન્ફિગરેશન:** ડિફૉલ્ટ `20128` પોર્ટ બદલવા માટે `PORT` એન્વાયરમેન્ટ વેરિએબલને ઓવરરાઇડ કરો.

## આ પણ જુઓ

- [VM ડિપ્લોયમેન્ટ માર્ગદર્શિકા](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare સેટઅપ
- [Fly.io ડિપ્લોયમેન્ટ માર્ગદર્શિકા](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io પર ડિપ્લોય કરો
- [એન્વાયરમેન્ટ કન્ફિગ](../reference/ENVIRONMENT.md) — સંપૂર્ણ `.env` સંદર્ભ
