# 🐳 Docker Guide — OmniRoute (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker ડિપ્લોયમેન્ટનો સંપૂર્ણ સંદર્ભ. ઝડપથી શરૂ કરવા માટે, [READMEનો Docker વિભાગ](../README.md#-docker) જુઓ.

## વિષયસૂચિ

- [ઝડપી રીતે ચલાવો](#quick-run)
- [એન્વાયરમેન્ટ ફાઇલ સાથે](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ઉપલબ્ધ પ્રોફાઇલ્સ](#available-profiles)
- [OmniRoute Dockerમાં ચાલતું હોય ત્યારે હોસ્ટ CLI ટૂલ્સને ગોઠવવા](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis સાઇડકાર](#redis-sidecar)
- [પ્રોડક્શન Compose](#production-compose)
- [Dockerfile સ્ટેજ](#dockerfile-stages)
- [મહત્ત્વપૂર્ણ એન્વાયરમેન્ટ વેરિએબલ્સ](#critical-environment-variables)
- [Caddy (HTTPS) સાથે Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ક્વિક ટનલ](#cloudflare-quick-tunnel)
- [ઇમેજ ટૅગ્સ](#image-tags)
- [ઉપલબ્ધતા: ડિફૉલ્ટ SQLite માત્ર એક રેપ્લિકા માટે છે](#availability-default-sqlite-is-single-replica)
- [Dockerની અંદર Geminiની પ્રાદેશિક ભૂલો](#gemini-regional-errors-inside-docker)
- [મહત્ત્વપૂર્ણ નોંધો](#important-notes)

---

## ઝડપથી ચલાવો

> **એક જ કમાન્ડથી સ્વયં હોસ્ટ કરવું છે?**
> [સેલ્ફ-હોસ્ટ માર્ગદર્શિકા](../getting-started/SELF_HOST_GUIDE.md) જુઓ —
> `docker compose -f docker-compose.selfhost.yml up -d` (પ્રકાશિત ઇમેજ +
> Redis, માત્ર લૂપબૅક, પ્રોફાઇલ પસંદ કરવાની જરૂર નથી). નીચે આપેલો ઝડપી માર્ગ
> એવા વપરાશકર્તાઓ માટેનો એકલ-કન્ટેનર વિકલ્પ છે, જેઓ Redis પહેલેથી જ અન્યત્ર ચલાવે છે.

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
# પહેલાં .envની નકલ બનાવો અને તેમાં ફેરફાર કરો
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

# હોસ્ટ પ્રોફાઇલ (મુખ્યત્વે Linux માટે; હોસ્ટ CLI બાઇનરીઓને ફક્ત વાંચી શકાય તે રીતે માઉન્ટ કરે છે)
docker compose --profile host up -d

# વેબ પ્રોફાઇલ (વેબ-સેશન પ્રોવાઇડર્સ માટે Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI સાઇડકારને સંયોજિત કરો
docker compose --profile cli --profile cliproxyapi up -d
```

## ઉપલબ્ધ પ્રોફાઇલ્સ

OmniRoute મુખ્ય ડિપ્લોયમેન્ટ પ્રકારો માટે Compose પ્રોફાઇલ્સ સાથે આવે છે. તમારા એન્વાયરમેન્ટને અનુરૂપ પ્રોફાઇલ પસંદ કરો.

| પ્રોફાઇલ         | સર્વિસ           | ક્યારે ઉપયોગ કરવો                                                                                                                                 | કમાન્ડ                                       |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ડિફૉલ્ટ) | `omniroute-base` | હેડલેસ સર્વર / ન્યૂનતમ રનટાઇમ, કોઈ પ્રોવાઇડર CLI સમાવિષ્ટ નથી                                                                                     | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` અને સમાવિષ્ટ CLI (Codex, Claude Code, Droid, OpenClaw)ને કૉલ કરતા એજન્ટિક વર્કફ્લો                             | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` વગેરેને ફક્ત વાંચી શકાય તે રીતે માઉન્ટ કરીને હોસ્ટ CLI માટે `network_mode` જેવો ઍક્સેસ ઇચ્છતા Linux હોસ્ટ | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | અપસ્ટ્રીમ CLI પ્રોક્સી માટે પોર્ટ `8317` પર [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) સાઇડકાર ચલાવો                             | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | બ્રાઉઝરની જરૂર હોય એવા વેબ-સેશન પ્રોવાઇડર્સ: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` બિલ્ડ કરે છે, Chromium સમાવિષ્ટ છે)     | `docker compose --profile web up -d`         |

> અનેક પ્રોફાઇલ્સને સંયોજિત કરી શકાય છે: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker માં ચાલતું હોય ત્યારે હોસ્ટ CLI ટૂલ્સને કૉન્ફિગર કરવું

`omniroute setup-codex`, `setup-claude`, `config set <tool>` અને ડૅશબોર્ડનું
**કૉન્ફિગ સાચવો** બટન, બધાં `~/.codex/*.config.toml` જેવી ફાઇલો લખે છે. આ પાથનો
અર્થ ફક્ત એ જ મશીન પર હોય છે જ્યાં CLI વાસ્તવમાં ચાલે છે. તેમને કન્ટેનરની અંદર
ચલાવશો તો ફાઇલ કન્ટેનરના પોતાના હોમ (`/home/node` —
ઇમેજ `USER node` સાથે ચાલે છે)માં લખાશે, જ્યાં કોઈ હોસ્ટ CLI તેને ક્યારેય વાંચશે
નહીં અને કન્ટેનર ફરી બનાવવામાં આવે તે ક્ષણે તે કાઢી નાખવામાં આવશે.

OmniRoute આ પરિસ્થિતિ શોધી કાઢે છે અને તમે ઉપયોગ ન કરી શકો તેવી સફળતા દર્શાવવાને
બદલે સૂચનાઓ સાથે લખવાની ક્રિયાનો ઇનકાર કરે છે: CLI `2` સાથે બંધ થાય છે અને API
`containerEphemeralTarget: true` સાથે `422` જવાબ આપે છે.

### ભલામણ કરેલ: CLI હોસ્ટ પર અને OmniRoute Docker માં ચલાવો

કન્ટેનર API પ્રદાન કરે છે; CLI તમારા હોસ્ટ ટૂલ્સને કૉન્ફિગર કરે છે.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI ને કન્ટેનર તરફ દોરો
omniroute setup-codex                      # તમારા હોસ્ટ પર વાસ્તવિક ~/.codex લખે છે
```

જ્યારે Codex, Claude Code, Cursor અથવા સમાન ટૂલ્સ તમારા લેપટોપ પર ચાલતાં હોય ત્યારે
આ યોગ્ય પસંદગી છે — અને આ જ સામાન્ય સેટઅપ છે.

### વૈકલ્પિક: હોસ્ટ કૉન્ફિગ ડિરેક્ટરીઓને બાઇન્ડ-માઉન્ટ કરો (`host` પ્રોફાઇલ)

જો તમે કન્ટેનર દ્વારા જ તમારું હોસ્ટ કૉન્ફિગ લખાવવા માંગતા હો, તો ડિરેક્ટરીઓને
માઉન્ટ કરો અને `CLI_CONFIG_HOME` ને માઉન્ટ રૂટ તરફ દોરો. `host` પ્રોફાઇલમાં આ
પહેલેથી જ કરવામાં આવ્યું છે:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

બાઇન્ડ માઉન્ટ જ પાથને વિશ્વસનીય બનાવે છે: OmniRoute
`/proc/self/mountinfo` વાંચે છે અને માઉન્ટ કરેલા પાથ પર (અને એવી ડિરેક્ટરીઓમાં
જેની ચાઇલ્ડ ડિરેક્ટરીઓ માઉન્ટ હોય છે, જે ઉપરના `/host-home` ના માળખા જેવું જ છે)
લખવાની મંજૂરી આપે છે, જ્યારે માઉન્ટ ન થયેલા પાથનો હજી પણ ઇનકાર કરે છે.

### વૈકલ્પિક રસ્તો: કન્ટેનરના પોતાના CLI ને કૉન્ફિગર કરો (મર્યાદિત ઉપયોગ કરો)

જ્યારે CLI ખરેખર કન્ટેનરની અંદર જ હોય (`cli` પ્રોફાઇલ), ત્યારે લખવાની ક્રિયા
ઇરાદાપૂર્વકની હોય છે. કોઈપણ `setup-*` કમાન્ડને `--allow-container-write` આપો,
અથવા સર્વર માટે `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` સેટ કરો. લખવાની
ક્રિયા એ ચેતવણી સાથે આગળ વધે છે કે તે કન્ટેનર પછી પણ ટકી રહેશે નહીં.

> **સુરક્ષા ચેતવણી — `cli` પ્રોફાઇલ + `docker.sock` માઉન્ટ.**
> `cli` પ્રોફાઇલ `/var/run/docker.sock` ને બાઇન્ડ-માઉન્ટ કરે છે જેથી
> કન્ટેનરની અંદરનું ઑટો-અપડેટર હોસ્ટ ડિમનથી સ્ટૅક ફરી બનાવી શકે
> (`src/lib/system/autoUpdate.ts` તે સૉકેટની તપાસ કરે છે અને તે હાજર ન હોય
> ત્યારે Docker પાથને છોડે છે). તે સૉકેટ **હોસ્ટ-રૂટ વિશ્વાસ સીમા** છે:
> જે કંઈપણ તેના સુધી પહોંચી શકે છે તે હોસ્ટ Docker ડિમનને રૂટ તરીકે નિયંત્રિત
> કરે છે — તે હોસ્ટ પરના કોઈપણ કન્ટેનરને બનાવી, તપાસી, બંધ કરી અને દૂર કરી શકે છે.
> અસરો:
>
> 1. **`cli` પ્રોફાઇલનો પોર્ટ ક્યારેય નેટવર્ક પર જાહેર કરશો નહીં.** તેને
>    `127.0.0.1` પર પ્રકાશિત કરો (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN દ્વારા પહોંચી શકાય તેવી `cli` પ્રોફાઇલ કોઈપણ ડૅશબોર્ડ-સ્તરની RCE ને
>    સંપૂર્ણ હોસ્ટ કબજામાં ફેરવી દે છે.
> 2. **`cli` પ્રોફાઇલમાં કોઈ વધારાની હોસ્ટ ડિરેક્ટરી બાઇન્ડ કરશો નહીં.**
>    Docker સૉકેટ સાથેનું કોઈપણ વધારાનું માઉન્ટ કન્ટેનરને તમારી ફાઇલસિસ્ટમ અને
>    હોસ્ટ કૉન્ફિગ પર સંપૂર્ણ વાંચવા/લખવાની ઍક્સેસ આપે છે. જો કોઈ ટૂલને પ્રોજેક્ટ
>    જોવાની જરૂર હોય, તો તેને CLI બાઇનરી વડે સ્થાનિક રીતે ચલાવો — તેને `cli`
>    કન્ટેનરમાં માઉન્ટ કરશો નહીં.
>
> જો તમને કન્ટેનરની અંદર ઑટો-અપડેટની જરૂર ન હોય, તો `cli` પ્રોફાઇલ બંધ રાખો
> (`COMPOSE_PROFILES=core,redis` અથવા તેનાથી ટૂંકું). અન્ય પ્રોફાઇલ્સ Docker
> સૉકેટને માઉન્ટ કરતી નથી.
>
> MITM સંબંધિત જોખમ મોડેલ માટે `docs/security/MITM-TPROXY-DECRYPT.md` જુઓ
> (git માં ઉપલબ્ધ; `/docs` માં કમ્પાઇલ કરેલ નથી), અને
> `codex`/`claude-code`/`droid`/`openclaw` બાઇનરીના મૂળની સાંકળ માટે
> `docs/security/SUPPLY_CHAIN.md` જુઓ.

## Redis સાઇડકાર

OmniRoute વિતરિત રેટ લિમિટર અને શેર કરેલી કૅશ માટે Redis પર આધાર રાખે છે. `redis` સેવા `docker-compose.yml` માં **હંમેશાં વ્યાખ્યાયિત** હોય છે (તેમાં કોઈ પ્રોફાઇલ ગેટ નથી) અને અન્ય કોઈપણ પ્રોફાઇલ સાથે શરૂ થાય છે.

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

- `REDIS_URL` — ઍપમાં ઇન્જેક્ટ થતી કનેક્શન સ્ટ્રિંગ (ડિફૉલ્ટ રૂપે `redis://redis:6379`).
- `REDIS_PORT` — Redis કન્ટેનર માટે હોસ્ટ-સાઇડ પોર્ટ મેપિંગ.
- `REDIS_BIND_HOST` — જે હોસ્ટ ઇન્ટરફેસ પર પોર્ટ પ્રકાશિત થાય છે. ડિફૉલ્ટ `127.0.0.1`.

> **ડિફૉલ્ટ રૂપે લૂપબૅક શા માટે:** સાઇડકાર `requirepass` વિના ચાલે છે અને ઍપ
> કન્ટેનર્સ compose નેટવર્ક (`redis:6379`) મારફતે તેના સુધી પહોંચે છે — પ્રકાશિત પોર્ટ
> ફક્ત હોસ્ટ-સાઇડ ટૂલિંગ (`redis-cli`, સ્થાનિક `npm run dev`) માટે છે. તેને
> `0.0.0.0` પર પ્રકાશિત કરવાથી તમારા LAN પરના દરેક હોસ્ટ સમક્ષ પ્રમાણીકરણ વિનાનું Redis ખુલ્લું થઈ જશે. જો તમે
> `REDIS_BIND_HOST=0.0.0.0` સેટ કરો, તો સેવા `command:` માં `--requirepass` પણ ઉમેરો.

**Redis અક્ષમ કરવાની** ભલામણ કરવામાં આવતી નથી (રેટ લિમિટર ઇન-મેમરી ફૉલબૅકનો ઉપયોગ કરશે, જેનાથી કાર્યક્ષમતા ઘટશે). જો આવું કરવું જ પડે, તો `docker-compose.yml` માંથી `redis:` સેવા બ્લૉક દૂર કરો/કૉમેન્ટ કરો અથવા તેને શૂન્ય સુધી સ્કેલ કરો:

```bash
docker compose up -d --scale redis=0
```

## પ્રોડક્શન Compose

ડેવ સાથે સમાંતર ચાલતા અલાયદા પ્રોડક્શન સ્નૅપશૉટ માટે `docker-compose.prod.yml` નો ઉપયોગ કરો.

| વિગત                   | મૂલ્ય                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| ફાઇલ                   | `docker-compose.prod.yml`                                                                |
| ડિફૉલ્ટ ડૅશબોર્ડ પોર્ટ | `PROD_DASHBOARD_PORT=20130` (આંતરિક `${DASHBOARD_PORT:-20128}` સાથે મેપ થયેલ)            |
| ડિફૉલ્ટ API પોર્ટ      | `PROD_API_PORT=20131`                                                                    |
| ઇમેજ                   | `omniroute:prod` (`runner-cli` ટાર્ગેટમાંથી બિલ્ડ થયેલ)                                  |
| Redis કન્ટેનર          | `omniroute-redis-prod` (`redis:8.6.2`, સમર્પિત `redis-prod-data` વોલ્યુમ)                |
| ડેટા વોલ્યુમ           | `omniroute-prod-data` (નામિત, રિબિલ્ડ્સ દરમિયાન જળવાયેલું)                               |
| હેલ્થચેક               | `node healthcheck.mjs` + `redis-cli ping`, જેમાં `depends_on` Redisની હેલ્થ પર આધારિત છે |

ઉપયોગ કરવાની રીત:

```bash
# પ્રોડક્શન સ્ટૅક બિલ્ડ કરીને શરૂ કરો
docker compose -f docker-compose.prod.yml up -d --build

# લૉગ્સનું લાઇવ સ્ટ્રીમિંગ કરો
docker compose -f docker-compose.prod.yml logs -f

# બંધ કરો (વોલ્યુમ્સ જાળવી રાખો)
docker compose -f docker-compose.prod.yml down
```

પ્રોડ સ્ટૅક ડેવ compose સાથે સમાંતર ચાલે છે (અલગ કન્ટેનર નામો, પોર્ટ્સ અને વોલ્યુમ્સ), તેથી પ્રોડક્શન ચાલુ હોય ત્યારે પણ તમે સ્થાનિક રીતે પુનરાવર્તિત વિકાસ ચાલુ રાખી શકો છો.

## Dockerfile સ્ટેજ

રિપોઝિટરી બહુ-સ્ટેજ Dockerfile (`Dockerfile`) સાથે આવે છે. ચાર સ્ટેજ ઉપલબ્ધ છે; તમારા ઉપયોગના કેસ માટે યોગ્ય `target` પસંદ કરો.

| સ્ટેજ         | બેઝ ઇમેજ              | હેતુ                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ડિપેન્ડન્સીઓ ઇન્સ્ટોલ કરે છે (`npm ci --legacy-peer-deps`) અને `npm run build` ચલાવે છે (ડિફૉલ્ટ રૂપે Turbopack — નીચે બિલ્ડ-ટાઇમ સંસાધનો જુઓ)                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Next.js સ્ટૅન્ડઅલોન આઉટપુટ સાથેનું પ્રોડક્શન રનટાઇમ. **કોઈ પ્રોવાઇડર CLI સમાવિષ્ટ નથી.**                                                                                                                                                                                               |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` અને ગ્લોબલ CLI ઉમેરે છે: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **એજન્ટિક વર્કફ્લો માટે આ પસંદ કરો.**                                                                                                                 |
| `runner-web`  | `runner-base`         | વેબ-સેશન પ્રોવાઇડર માટે Playwright + Chromium બ્રાઉઝર (`--with-deps`) ઉમેરે છે: `gemini-web`, `claude-web`, `claude-turnstile`. **જ્યારે તમે આ પ્રોવાઇડરનો ઉપયોગ કરો ત્યારે આ પસંદ કરો** — તેના વિના સાદી ઇમેજ રિક્વેસ્ટ સમયે નિષ્ફળ જાય છે (Release Channels હેઠળની `-web` નોંધ જુઓ). |

ચોક્કસ ટાર્ગેટ મેન્યુઅલી બિલ્ડ કરો:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### બિલ્ડ-ટાઇમ સંસાધનો

ત્રણ બિલ્ડ આર્ગ્યુમેન્ટ `builder` સ્ટેજનો ખર્ચ નિયંત્રિત કરે છે. તે માત્ર બિલ્ડ-ટાઇમ માટે છે —
`OMNIROUTE_MEMORY_MB` (નીચે) એક અલગ, રનટાઇમ નિયંત્રણ છે.

| બિલ્ડ આર્ગ્યુમેન્ટ          | ડિફૉલ્ટ | અસર                                                                                           |
| --------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` webpack વડે બિલ્ડ કરે છે: ઓછી પીક મેમરી, ધીમું. `1` Turbopack પસંદ કરે છે.                |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | શરૂ કરાયેલા `next build` માટે V8 હીપની મર્યાદા (`--max-old-space-size`).                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | `CIRCLE_NODE_TOTAL`ને મૂલ્ય આપે છે; Next પેજ-ડેટા સંગ્રહ માટે `workers = N - 1` નક્કી કરે છે. |

મોટા બિલ્ડર પર `OMNIROUTE_BUILD_WORKERS`નું મૂલ્ય વધારવું જોઈએ અને મર્યાદિત
સંસાધનોવાળું બિલ્ડ `✓ Compiled successfully` **પછી** બંધ થઈ જાય ત્યારે સૌથી પહેલાં
આના પર શંકા કરવી જોઈએ. દરેક પેજ-ડેટા વર્કર પોતાની અલગ પ્રોસેસ છે અને પેરન્ટ
`next build` પણ અલગ પ્રોસેસ છે; લાઇવ VPS પુનરુત્પાદન (ઇશ્યૂ #7518)માં
`NODE_OPTIONS` હીપ ફ્લૅગથી સ્વતંત્ર રીતે દરેક પ્રોસેસનું પીક RSS
~4.5 GB માપવામાં આવ્યું હતું (Turbopack, V8 હીપની બહારની મૂળ/Rust મેમરીમાં
કમ્પાઇલ કરે છે). `2`નું ડિફૉલ્ટ મૂલ્ય (→ 1 વર્કર, કુલ 2 પ્રોસેસ)
પબ્લિશ પાઇપલાઇન દ્વારા ઉપયોગમાં લેવાતા 16 GB / 4 vCPU GitHub-હોસ્ટેડ રનર
માટે નક્કી કરવામાં આવ્યું છે. `8` પર (→ 7 વર્કર) તે રનરની મેમરી સમાપ્ત થઈ ગઈ
અને buildkitએ `ResourceExhausted: ... cannot allocate memory` સાથે સ્ટેપ નિષ્ફળ કર્યો;
પ્રતિ-પ્રોસેસ RSSનું અનુમાન કરવાને બદલે સીધું માપવામાં આવ્યા પછી
`3` (→ 2 વર્કર) પણ ઉપલબ્ધ મર્યાદામાં સમાયું નહીં. `tests/unit/docker-build-memory-budget.test.ts`
માપવામાં આવેલા આંકડા સામે ગણતરી કરે છે અને જો બેમાંથી કોઈપણ નિયંત્રણ
રનરની ક્ષમતા કરતાં વધી જાય તો નિષ્ફળ થાય છે.

Turbopack, V8 હીપની **બહાર** રહેલી મૂળ Rust મેમરીમાં કમ્પાઇલ કરે છે, તેથી
`OMNIROUTE_BUILD_MEMORY_MB` તેને મર્યાદિત કરતું નથી. મેમરી મર્યાદાવાળા હોસ્ટ પર
OOM કિલર દ્વારા બિલ્ડને કોઈપણ ભૂલ સંદેશા વિના SIGKILL કરવામાં આવે છે — તે ફક્ત
`Creating an optimized production build`ની વચ્ચે અટકી જાય છે, જે આઉટ-ઓફ-મેમરીને
બદલે હૅંગ થયું હોય તેમ લાગે છે. આ કારણે `Dockerfile` ડિફૉલ્ટ રૂપે webpack
(`OMNIROUTE_USE_TURBOPACK=0`)નો ઉપયોગ કરે છે, જ્યારે `npm run dev` / `npm run build`માં
Turbopack કોડ ડિફૉલ્ટ છે: કોઈ બિલ્ડ આર્ગ્યુમેન્ટ વિનાનું સાદું `docker build .`
(Railway અને અન્ય વન-ક્લિક હોસ્ટ જે ચલાવે છે) મેમરી-મર્યાદિત બિલ્ડર પર
કોઈ જાણ કર્યા વિના બંધ ન થવું જોઈએ. પ્રકાશિત ઇમેજ પહેલેથી જ `docker-publish.yml`માં
`OMNIROUTE_USE_TURBOPACK=0` સ્પષ્ટ રીતે પાસ કરે છે. પુષ્કળ RAM ધરાવતા બિલ્ડર પર,
ઝડપી બિલ્ડ માટે Turbopack પસંદ કરો:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` સક્ષમ છે, તેથી `next build` પેરન્ટ **અને** વર્કર
પ્રોસેસ ચલાવે છે અને બંને અલગથી `OMNIROUTE_BUILD_MEMORY_MB`નું પાલન કરે છે.
કન્ટેનરની મર્યાદા આ મૂલ્યના એક ગણા નહીં, પરંતુ અંદાજે બે ગણા કરતાં વધુ રાખો.

આ ટ્રી પર માપેલું (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| બંડલર     | કન્ટેનર મર્યાદા | પરિણામ                               |
| --------- | --------------- | ------------------------------------ |
| Turbopack | 8 GiB / 16 GiB  | બંને પર કોઈ જાણ વિના OOM-killed      |
| webpack   | 8 GiB           | બિલ્ડ વર્કરને SIGKILL કરવામાં આવ્યું |
| webpack   | 12 GiB          | સફળ, 11.1 GiBનું પીક નોંધાયું        |

### રનટાઇમ ડિફૉલ્ટ

`runner-base` દ્વારા એક્સપોર્ટ કરાયેલા ડિફૉલ્ટ: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Dockerમાં મેમરીની વર્તણૂક:

- ઇમેજ `OMNIROUTE_MEMORY_MB=1024` સેટ કરે છે અને તેમાંથી `NODE_OPTIONS=--max-old-space-size=1024` નિર્ધારિત કરે છે.
- વાસ્તવિક સર્વર પ્રોસેસ standalone launcher દ્વારા શરૂ થાય છે, જે `OMNIROUTE_MEMORY_MB` વાંચે છે અને `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` ઉમેરે છે.
- Node વારંવાર આપેલા `--max-old-space-size`નું છેલ્લું મૂલ્ય વાપરે છે, તેથી `OMNIROUTE_MEMORY_MB` સેટ કરવાથી અસરકારક Docker heap મર્યાદા નિયંત્રિત થાય છે.
- ઇમેજ હંમેશાં તેને સેટ કરતી હોવાથી, launcherનું પોતાનું RAM-આધારિત fallback Docker હેઠળ ક્યારેય લાગુ પડતું નથી. workload માટે તેને સ્પષ્ટપણે વધારો (નીચેનું કોષ્ટક). coding-agent `/v1/responses` માટે `2048` હજુ પણ ખૂબ ઓછું છે.

### coding agents માટે runtime RAM

1 GiBનું Docker ડિફૉલ્ટ dashboard/હળવા chat માટેની લઘુતમ મર્યાદા છે, production માટે યોગ્ય કદ નથી. લાંબી `POST /v1/responses` bodies (સેંકડો messages, દસેક tools) compression દરમિયાન અનેક in-memory graphs જાળવી રાખે છે. એકસાથે ચાલતી બે ~3 MiB / ~750k-token requestsએ **12 GiB** old-space પર V8ને બંધ કરી દીધું છે (`FATAL ERROR: Reached heap limit`) અને 16 GiB cgroup OOM પણ સર્જ્યું છે. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) જુઓ.

**cgroup `--memory`ને heap કરતાં વધુ રાખો** — native buffers, SQLite અને compression intermediates V8ની બહાર રહે છે.

| Workload                            | `OMNIROUTE_MEMORY_MB` | Container / cgroup     | નોંધો                                                                                                       |
| ----------------------------------- | --------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| Dashboard, એક હળવું chat            | `1024` (ઇમેજ ડિફૉલ્ટ) | ≥2 GiB                 |                                                                                                             |
| એક coding agent (Claude/Codex/Grok) | `8192`                | ≥10 GiB                | સામાન્ય single-session `/v1/responses`                                                                      |
| એકસાથે બે લાંબી `/v1/responses`     | `10240`–`12288`       | ≥12–16 GiB             | ~12 GiB heap પર માપવામાં આવેલ V8 abort                                                                      |
| એકસાથે ત્રણથી વધુ લાંબા contexts    | એક process પર ન ચલાવો | ક્રમિક ચલાવો / વધુ RAM | ડિફૉલ્ટ heavyweight admissionમાં એક request in-flight હોય છે; પૂરતી RAM વિના તેને વધારવાથી abort ફરી થાય છે |

જ્યારે `OMNIROUTE_MEMORY_MB` **સેટ ન હોય**, ત્યારે bare metal પર `omniroute serve` RAMના ~35% પ્રમાણે માપ નક્કી કરે છે (`[512, 4096]` સુધી મર્યાદિત). Docker હંમેશાં `1024` સેટ કરે છે, તેથી સત્તાવાર ઇમેજમાં આ calibration ક્યારેય ચાલતું નથી.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## મહત્ત્વપૂર્ણ પર્યાવરણ વેરિએબલ્સ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) માં દસ્તાવેજીકૃત ડિફૉલ્ટ્સ ઉપરાંત, Docker હેઠળ ચલાવતી વખતે નીચેના વેરિએબલ્સ સૌથી વધુ મહત્ત્વ ધરાવે છે:

| વેરિએબલ                       | હેતુ                                                                                                                                                                                                                                                                       | ડિફૉલ્ટ                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket બ્રિજ માટેનું શેર કરેલું સિક્રેટ. **પ્રોડક્શનમાં આવશ્યક** — તેને મજબૂત રેન્ડમ સ્ટ્રિંગ પર સેટ કરો.                                                                                                                                                               | સેટ કરેલું નથી (આપવું આવશ્યક છે) |
| `REDIS_URL`                   | રેટ લિમિટર / કૅશ બૅકએન્ડ માટેની કનેક્શન સ્ટ્રિંગ                                                                                                                                                                                                                           | `redis://redis:6379`             |
| `REDIS_PORT`                  | સાથે સમાવિષ્ટ Redis કન્ટેનર માટેનો હોસ્ટ-સાઇડ પોર્ટ                                                                                                                                                                                                                        | `6379`                           |
| `REDIS_BIND_HOST`             | હોસ્ટ ઇન્ટરફેસ જેના પર સાથે સમાવિષ્ટ Redis પોર્ટ પ્રકાશિત થાય છે (જ્યાં સુધી તમે AUTH ઉમેરો નહીં ત્યાં સુધી લૂપબૅક)                                                                                                                                                        | `127.0.0.1`                      |
| `AUTO_UPDATE_HOST_REPO_DIR`   | સ્વ-અપડેટ વર્કફ્લો માટે `/workspace/omniroute` પર `cli` પ્રોફાઇલમાં માઉન્ટ કરેલો હોસ્ટ પાથ                                                                                                                                                                                 | `.` (વર્તમાન ડિરેક્ટરી)          |
| `OMNIROUTE_MEMORY_MB`         | Docker સ્ટૅન્ડઅલોન સર્વર માટે રનટાઇમ Node હીપની મહત્તમ મર્યાદા; ઉપરના ઇમેજ ડિફૉલ્ટને ઓવરરાઇડ કરે છે. કોડિંગ એજન્ટ્સ: `8192`+ ([રનટાઇમ RAM](#runtime-ram-for-coding-agents) જુઓ).                                                                                           | `1024`                           |
| `DASHBOARD_PORT` / `API_PORT` | ડૅશબોર્ડ (20128) અને API (20129) માટે ખુલ્લા કરેલા પોર્ટ્સને ઓવરરાઇડ કરે છે                                                                                                                                                                                                | `20128` / `20129`                |
| `APP_BIND_HOST`               | હોસ્ટ ઇન્ટરફેસ જેના પર docker-compose ડૅશબોર્ડ/API/live-WS પોર્ટ્સ પ્રકાશિત કરે છે. `REQUIRE_API_KEY=false` (ડિફૉલ્ટ) સાથે, `0.0.0.0` અનામી `/v1` પ્રૉક્સીને LAN પર ખુલ્લું મૂકે છે — માત્ર `REQUIRE_API_KEY=true` સાથે અથવા આગળ રિવર્સ પ્રૉક્સી હોય ત્યારે જ વ્યાપ વધારો. | `127.0.0.1`                      |
| `CLIPROXY_BIND_HOST`          | હોસ્ટ ઇન્ટરફેસ જેના પર docker-compose `cliproxyapi` સાઇડકાર પ્રકાશિત કરે છે — તેના ડેટા વોલ્યુમમાં પ્રોવાઇડર ક્રેડેન્શિયલ્સ સંગ્રહિત હોય છે.                                                                                                                               | `127.0.0.1`                      |
| `OMNIROUTE_PLUGINS_DIR`       | ડિરેક્ટરી જેને રનટાઇમ પ્લગિન સ્કૅનર વાંચે છે અને જેમાં ઇન્સ્ટૉલ કરે છે. પ્લગિન્સ bind-mounted હોય ત્યારે તેને સેટ કરો: ડિફૉલ્ટ `HOME` ને અનુસરે છે, જેને ઇમેજ એક્સપોર્ટ કરે તે જરૂરી નથી.                                                                                  | `~/.omniroute/plugins`           |
| `OMNIROUTE_BASE_PATH`         | ઍપ રિવર્સ પ્રૉક્સીની પાછળ પ્રકાશિત થાય ત્યારે URL સબપાથ (દા.ત. `/omniroute`)                                                                                                                                                                                               | _(ખાલી = રૂટ)_                   |
| `NEXT_PUBLIC_BASE_URL`        | સબપાથ સહિતનું જાહેર બ્રાઉઝર ઑરિજિન (દા.ત. `https://host/omniroute`)                                                                                                                                                                                                        | સેટ કરેલું નથી                   |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` માટેનો હોસ્ટ-સાઇડ ડૅશબોર્ડ પોર્ટ                                                                                                                                                                                                                 | `20130`                          |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` સાઇડકાર માટેનો હોસ્ટ-સાઇડ પોર્ટ                                                                                                                                                                                                                              | `8317`                           |

## સબપાથ પર રિવર્સ પ્રોક્સી (Traefik / nginx)

Next.js `basePath` સ્ટેન્ડઅલોન બંડલમાં કમ્પાઇલ થાય છે. OmniRoute એપના રૂટ પરની સેન્ટિનલ ફાઇલમાં બિલ્ડ સમયે સમાવાયેલ મૂલ્ય રેકોર્ડ કરે છે (`npm run build` દરમિયાન લખાય છે; `scripts/docker/ensure-docker-base-path.mjs` દ્વારા વાંચવામાં આવે છે) અને કન્ટેનર શરૂ થાય ત્યારે તેની સરખામણી `OMNIROUTE_BASE_PATH` સાથે કરે છે. જ્યારે બંને અલગ હોય અને ઇમેજ ડોમેન રૂટ માટે બિલ્ડ કરવામાં આવી હોય, ત્યારે `node dev/run-standalone.mjs` ચાલે તે પહેલાં એન્ટ્રીપોઇન્ટ સ્ટેન્ડઅલોન મેનિફેસ્ટ્સ, એમ્બેડ કરેલા `basePath`/`assetPrefix` લિટરલ્સ (Next 16 માત્ર `assetPrefix`માંથી SSR એસેટ URLs રેન્ડર કરે છે — પેચર સબપાથને તેમાં પણ પ્રતિબિંબિત કરે છે), બિલ્ડમાં સમાવાયેલા `/_next/static` એસેટ URLs (ક્લાયન્ટ-રેફરન્સ મેનિફેસ્ટ્સ, મીડિયા ઇમ્પોર્ટ્સ, પ્રીરેન્ડર કરેલા એરર પેજીસ) અને ક્લાયન્ટ `process.env` શિમને ફરી લખે છે.

### Compose બિલ્ડ (ભલામણ કરેલ)

`.env`માં બંને વેરિયેબલ્સ સેટ કરો, પછી ઇમેજ અને રનટાઇમ સુસંગત રહે તે માટે ફરીથી બિલ્ડ કરો:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`ને Docker build-arg તરીકે અને રનટાઇમ એન્વાયર્નમેન્ટ વેરિયેબલ તરીકે ફોરવર્ડ કરે છે.

### પહેલેથી બિલ્ડ કરેલી રૂટ ઇમેજ + રનટાઇમ સબપાથ

પ્રકાશિત `diegosouzapw/omniroute:*` ઇમેજો ડોમેન રૂટ માટે બિલ્ડ કરવામાં આવી છે. તેમ છતાં તમે રનટાઇમ પર `OMNIROUTE_BASE_PATH` સેટ કરી શકો છો; કન્ટેનર સ્ટાર્ટઅપ વખતે બંડલને એક વાર પેચ કરે છે. તેની સાથે મેળ ખાતું પબ્લિક ઓરિજિન સેટ કરો:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

રિવર્સ પ્રોક્સીને **સંપૂર્ણ** બાહ્ય પાથ ફોરવર્ડ કરવા માટે કૉન્ફિગર કરો (પ્રિફિક્સ દૂર કરશો નહીં). Traefikએ `StripPrefix` વિના `PathPrefix(`/omniroute`)`ને કન્ટેનર તરફ રૂટ કરવું જોઈએ, જેથી Next.jsને `/omniroute/...` મળે અને તે `/omniroute/_next/...`માંથી એસેટ્સ સર્વ કરે.

Docker હેલ્થચેક સક્રિય `OMNIROUTE_BASE_PATH`થી પ્રિફિક્સ કરાયેલા હળવા `/healthz` લાઇફસાઇકલ એન્ડપોઇન્ટને પ્રોબ કરે છે. માનવીય/ડેશબોર્ડ ડાયગ્નોસ્ટિક્સ માટે `/api/monitoring/health` ઉપલબ્ધ રહે છે; કન્ટેનર HEALTHCHECKને ફરી તેના તરફ નિર્દેશિત કરવા માટે (ઉદાહરણ તરીકે, ડીપ હેલ્થ એન્ફોર્સમેન્ટ માટે), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` સેટ કરો. આ પાથ એક **ડીપ** ચેક છે (DB + મોનિટરિંગ સારાંશ) — જો તમે તેને ફરી પસંદ કરો તો Dockerના ઓછી આવર્તનવાળા `HEALTHCHECK` માટે યોગ્ય છે, પરંતુ Kubernetes `livenessProbe` ઇન્ટરવલ્સ માટે **નથી**.

ઓર્કેસ્ટ્રેટર્સ (Kubernetes, Nomad વગેરે) માટે:

| પ્રોબ            | પસંદ કરો                                                             | ટાળો                                              |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| લાઇવનેસ          | HTTP `GET /livez`, અથવા મુખ્ય પોર્ટ (`PORT`, ડિફૉલ્ટ `20128`) પર TCP | લાઇવનેસ તરીકે `/api/monitoring/health`            |
| રેડીનેસ          | HTTP `GET /healthz`                                                  | ટૂંકા ટાઇમઆઉટ્સ જે વ્યસ્ત ઇવેન્ટ લૂપને ડેડ ગણે છે |
| ડીપ / બ્લેકબોક્સ | `/api/monitoring/health`                                             | —                                                 |

`/healthz` પ્રોસેસ લાઇફસાઇકલ (`ok` / `starting` / `stopping`) રિપોર્ટ કરે છે. `/livez` માત્ર પ્રોસેસ જીવંત છે કે નહીં તે દર્શાવે છે (જ્યારે પણ હેન્ડલર ચાલી શકે ત્યારે 200 આપે છે; તે રેડીનેસની રાહ જોતું નથી). બંને હજુ પણ રિક્વેસ્ટ હેન્ડલિંગની સમાન Node ઇવેન્ટ લૂપ પર ચાલે છે, તેથી CPU-બાઉન્ડ કૅટલૉગ અથવા કમ્પ્રેશન કાર્ય તેમને વિલંબિત કરી શકે છે — વ્યસ્ત ≠ ડેડ. જો HTTP પ્રોબ્સનો સમય સમાપ્ત થઈ જાય, તો TCP લાઇવનેસ પસંદ કરો. સંપૂર્ણ પ્રોબ માર્ગદર્શન:
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
      # OAuth કૉલબૅક્સ, ડૅશબોર્ડ લિંક્સ અને જનરેટ કરેલા જાહેર URLs માટે બ્રાઉઝર-ફેસિંગ ઑરિજિન.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # શેડ્યૂલ કરેલાં કાર્યો / સ્વયં-ફેચ માટે આંતરિક સર્વર-ટુ-સર્વર URL.
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

Caddy અપસ્ટ્રીમ કન્ટેનર માટે પ્રમાણભૂત ફોરવર્ડિંગ હેડર્સ સેટ કરે છે. OmniRoute OAuth કૉલબૅક્સ અને જનરેટ કરેલી જાહેર
લિંક્સ માટે `NEXT_PUBLIC_BASE_URL`નો કેનોનિકલ જાહેર ઑરિજિન તરીકે ઉપયોગ કરે છે; પ્રમાણિત ડૅશબોર્ડ રાઇટ્સ સમાન-ઑરિજિન રિક્વેસ્ટ્સ ઉપરાંત સેશન-બાઉન્ડ CSRF
સુરક્ષાનો ઉપયોગ કરે છે. `OMNIROUTE_TRUST_PROXY`ને ફક્ત એવા અદ્યતન ડિપ્લોયમેન્ટ્સ માટે સક્ષમ કરો જ્યાં તમે સ્પષ્ટ
કન્ફિગરેશનને બદલે વિશ્વસનીય ફોરવર્ડેડ હેડર્સમાંથી OmniRoute જાહેર ઑરિજિન મેળવે એવું ઇરાદાપૂર્વક ઇચ્છતા હોવ.

## Cloudflare Quick Tunnel

Docker ડિપ્લોયમેન્ટ્સ માટેના ડૅશબોર્ડ સપોર્ટમાં `Dashboard → Endpoints` પર એક-ક્લિક **Cloudflare Quick Tunnel** સામેલ છે. પહેલી વાર સક્ષમ કરવાથી જરૂર હોય ત્યારે જ `cloudflared` ડાઉનલોડ થાય છે, તમારા વર્તમાન `/v1` એન્ડપોઇન્ટ માટે અસ્થાયી ટનલ શરૂ થાય છે અને જનરેટ થયેલ `https://*.trycloudflare.com/v1` URL તમારા સામાન્ય જાહેર URLની સીધી નીચે દેખાય છે.

એન્ડપોઇન્ટ ટનલ પેનલ્સ (Cloudflare, Tailscale, ngrok)ને સક્રિય ટનલની સ્થિતિ બદલ્યા વિના `Settings → Appearance`માંથી બતાવી અથવા છુપાવી શકાય છે.

### ટનલ નોંધો

- Quick Tunnel URLs અસ્થાયી હોય છે અને દરેક રીસ્ટાર્ટ પછી બદલાય છે.
- OmniRoute અથવા કન્ટેનર રીસ્ટાર્ટ થયા પછી Quick Tunnels આપમેળે પુનઃસ્થાપિત થતા નથી. જરૂર હોય ત્યારે તેમને ડૅશબોર્ડમાંથી ફરી સક્ષમ કરો.
- મેનેજ્ડ ઇન્સ્ટોલ હાલમાં `x64` / `arm64` પર Linux, macOS અને Windowsને સપોર્ટ કરે છે.
- મર્યાદિત કન્ટેનર પર્યાવરણોમાં અવાજભરી QUIC UDP બફર ચેતવણીઓ ટાળવા માટે મેનેજ્ડ Quick Tunnels ડિફૉલ્ટ રૂપે HTTP/2 ટ્રાન્સપોર્ટનો ઉપયોગ કરે છે. જો તમે અલગ ટ્રાન્સપોર્ટ ઇચ્છતા હોવ તો `CLOUDFLARED_PROTOCOL=quic` અથવા `auto` સેટ કરો.
- Docker ઇમેજિસમાં સિસ્ટમ CA રૂટ્સ સામેલ હોય છે અને તે મેનેજ્ડ `cloudflared`ને આપવામાં આવે છે, જે કન્ટેનરની અંદર ટનલ બૂટસ્ટ્રૅપ થાય ત્યારે TLS ટ્રસ્ટ નિષ્ફળતાઓ ટાળે છે.
- જો તમે OmniRouteને ડાઉનલોડ કરેલ બાઇનરીને બદલે હાલની બાઇનરીનો ઉપયોગ કરાવવા માંગતા હોવ તો `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` સેટ કરો.

## ઇમેજ ટૅગ્સ

| ઇમેજ                     | ટૅગ      | કદ     | વર્ણન                                                |
| ------------------------ | -------- | ------ | ---------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | સર્વોચ્ચ **પ્રકાશિત** સ્થિર SemVer (git `main` નહીં) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps માટે આ પ્રકારના ટૅગને પિન કરો                 |

મલ્ટિ-પ્લેટફોર્મ મેનિફેસ્ટ: `linux/amd64` + `linux/arm64` નેટિવ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker મેળ ખાતું આર્કિટેક્ચર આપમેળે પસંદ કરે છે; જો તમારે ARM હોસ્ટ્સ પર AMD64 ઇમ્યુલેશન ફરજિયાત કરવું હોય તો `--platform linux/amd64` આપો.

### રિલીઝ ચૅનલ્સ

OmniRoute સ્થિર રિલીઝ, સક્રિય રિલીઝ-બ્રાન્ચ પરીક્ષણ અને ડેવલપમેન્ટ બિલ્ડ્સ માટે અલગ Docker ચૅનલ્સ પ્રકાશિત કરે છે.

| ચૅનલ                            | સ્રોત                                | પરિવર્તનક્ષમતા                  | ભલામણ કરેલ ઉપયોગ                                                                                                    |
| ------------------------------- | ------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | સાઇન કરેલી/વર્ઝન કરેલી રિલીઝ         | અપરિવર્તનીય                     | ચોક્કસ રિલીઝને પિન કરતા પ્રોડક્શન ડિપ્લોયમેન્ટ્સ                                                                    |
| `:latest` / `:latest-web`       | સર્વોચ્ચ **પ્રકાશિત** સ્થિર SemVer   | પરિવર્તનક્ષમ સ્થિર પોઇન્ટર      | SemVer પ્રકાશન કાર્ય **પછી** સ્થિર રિલીઝને અનુસરે છે — `main` અથવા અપ્રકાશિત `release/v*` કમિટ્સને અનુસરતું **નથી** |
| `:next` / `:next-web`           | વર્તમાન ડિફૉલ્ટ `release/v*` બ્રાન્ચ | પરિવર્તનક્ષમ પ્રી-રિલીઝ પોઇન્ટર | સક્રિય રિલીઝ બ્રાન્ચ પર આવી ગયેલા પરંતુ હજી સ્થિર રિલીઝમાં ન હોય તેવા સુધારાઓનું પરીક્ષણ                            |
| `:main` / `:main-web`           | `main` બ્રાન્ચ                       | પરિવર્તનક્ષમ ડેવલપમેન્ટ પોઇન્ટર | ફક્ત ડેવલપમેન્ટ અને ઇન્ટિગ્રેશન પરીક્ષણ                                                                             |

#### વેબ-સેશન પ્રોવાઇડર્સ: `-web` ઇમેજિસ

ઉપરની દરેક ચૅનલ `-web` ટૅગ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) તરીકે પણ ઉપલબ્ધ છે, જે `runner-web` સ્ટેજમાંથી બને છે — એટલે એ જ ઇમેજ સાથે Playwright અને Chromium બ્રાઉઝર. સાદી ઇમેજ Chromium **વિના** આવે છે; `gemini-web`, `claude-web` અને `claude-turnstile`ને તેની જરૂર પડે છે.

નિષ્ફળતા સ્ટાર્ટઅપ સમયે નહીં, પરંતુ પછી સુધી મોકૂફ રહે છે: આ પ્રોવાઇડર્સ તેમના મૉડલ્સની યાદી બતાવે છે અને ડૅશબોર્ડમાં કનેક્ટેડ તરીકે દેખાય છે, પરંતુ માત્ર પ્રથમ રિક્વેસ્ટ નીચેની ભૂલ સાથે નિષ્ફળ જાય છે

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

જો તમે આ પ્રોવાઇડર્સનો ઉપયોગ કરો છો, તો તમે પહેલેથી જે ચૅનલ પર છો તેનો `-web` ટૅગ પુલ કરો — બીજું કશું બદલાતું નથી. npm/CLI ઇન્સ્ટોલમાં (Docker ઇમેજ વિના), તેની સમકક્ષ ખૂટતી વસ્તુ બ્રાઉઝર બાઇનરી છે: હોસ્ટ પર `npx playwright install chromium` ચલાવો.

#### પ્રી-રિલીઝ ચૅનલનો ઉપયોગ કરવો

`next` ચેનલ વર્તમાન ડિફૉલ્ટ `release/v*` બ્રાન્ચ પરના દરેક push વખતે ફરીથી build થાય છે અને AMD64 તથા ARM64 બંને માટે publish થાય છે. જૂની maintenance બ્રાન્ચો તેને overwrite કરી શકતી નથી. આગામી stable tag બનાવવામાં આવે તે પહેલાં સક્રિય release બ્રાન્ચમાં merge થયેલા fixes માટે આ ચેનલ pull કરી શકાય તેવી image પ્રદાન કરે છે.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose માટે, પસંદ કરેલી profile દ્વારા ઉપયોગમાં લેવાતો image tag override કરો, ત્યારબાદ service ને pull કરીને ફરીથી બનાવો:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### સુરક્ષા અને rollback

`next` એક બદલાતી pre-release ચેનલ છે. સક્રિય release બ્રાન્ચ પરના કોઈપણ push વખતે તે બદલાઈ શકે છે અને તે **production ઉપયોગ માટે supported નથી**. કોઈ ચોક્કસ build નું મૂલ્યાંકન કરતી વખતે image digest ને pin કરો:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

પરીક્ષણ કરતાં પહેલાં, OmniRoute data volume અથવા bind-mounted data directory નો backup લો. rollback કરવા માટે, અગાઉ ઉપયોગમાં લીધેલું stable version અથવા digest પુનઃસ્થાપિત કરો અને container ને ફરીથી બનાવો:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build ક્યારેય `latest` ને ખસેડી શકતું નથી; માત્ર પાત્ર stable semantic version જ stable pointer ને promote કરી શકે છે. `next` images, release image inspection અને blocking CRITICAL-vulnerability gate જાળવી રાખે છે.

**`latest`, git માટે નવીનતાની ખાતરી નથી.** `main` અથવા સક્રિય `release/v*` બ્રાન્ચ પર merge થયેલા fixes ત્યાં સુધી `:latest` માં હોતા **નથી**, જ્યાં સુધી stable SemVer image publish ન થાય અને publish job `:latest` ને promote ન કરે (તે SemVer જેવો જ digest). જો GitHub પર fix પહેલેથી દેખાતું હોવા છતાં `latest` સ્થિર લાગતું હોય, તો release બ્રાન્ચનું પરીક્ષણ કરવા માટે `:next` pull કરો અથવા SemVer tag ની રાહ જુઓ.

| તમને શું જોઈએ છે                                                       | આનો ઉપયોગ કરો                           |
| ---------------------------------------------------------------------- | --------------------------------------- |
| જે GitOps / production માં drift ન થવું જોઈએ                           | `:X.Y.Z` (અથવા image digest) ને pin કરો |
| published stable versions અનુસરો અને દરેક release પર recreate સ્વીકારો | `:latest`                               |
| unreleased `release/v*` commits નું પરીક્ષણ કરો                        | `:next` (production માટે નહીં)          |
| `main` નું પરીક્ષણ કરો                                                 | `:main` (production માટે નહીં)          |

## ઉપલબ્ધતા: ડિફૉલ્ટ SQLite એકલ-રિપ્લિકા છે

સ્ટૉક Docker / Kubernetes OmniRoute એ **એક Node પ્રક્રિયા + એક SQLite રાઇટર** છે. આ ટોપોલોજી પર ઉચ્ચ ઉપલબ્ધતા **સમર્થિત નથી**.

| મર્યાદા                                                 | પરિણામ                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| એકલ રાઇટર                                               | એક જ SQLite ફાઇલ સામે એકથી વધુ રિપ્લિકા **ચલાવશો નહીં**. તે DBને દૂષિત કરે છે.                                                                                                                                                                                                                                                   |
| પુનઃનિર્માણ / પુનઃપ્રારંભ / HEALTHCHECK દ્વારા બંધ થવું | પ્રગતિમાં રહેલા SSE, ડૅશબોર્ડ સત્રો અને ઇન-મેમરી સ્થિતિનો **સંપૂર્ણ આઉટેજ**. દરેક કનેક્ટેડ ક્લાયન્ટનું જોડાણ તૂટી જાય છે. એન્ડપૉઇન્ટ ખાલી હોય તે સમયગાળા દરમિયાન નવી વિનંતીઓને OmniRoute JSONના બદલે રિવર્સ-પ્રૉક્સી **`502 Bad Gateway: Unknown error`** મળે છે — ક્લાયન્ટ આને પ્રદાતાની નિષ્ફળતાથી અલગ ઓળખી શકતા નથી (#11015). |
| `/healthz` જેવો જ ઇવેન્ટ લૂપ                            | વ્યસ્ત કૅટલૉગ અથવા કમ્પ્રેશન ટિક પ્રોબ્સને વિલંબિત કરી શકે છે; ત્યારબાદ ટૂંકો ટાઇમઆઉટ **એકમાત્ર** રિપ્લિકાને પુનઃપ્રારંભ કરે છે.                                                                                                                                                                                                 |

**પ્રોબ મૅટ્રિક્સ** ([Kubernetes પ્રોબ ભલામણો](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) પણ જુઓ):

| પ્રોબ                    | લક્ષ્ય                                                      | આનો ઉપયોગ કરશો નહીં                                    |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------ |
| લાઇવનેસ                  | `PORT` પર TCP (ડિફૉલ્ટ `20128`), અથવા સૉફ્ટ HTTP `/healthz` | `/api/monitoring/health`                               |
| રેડીનેસ                  | HTTP `GET /healthz`                                         | ઇવેન્ટ લૂપ વ્યસ્ત હોવાને બંધ થયેલું ગણતા કડક ટાઇમઆઉટ્સ |
| ઊંડાણપૂર્વક / માનવો માટે | `/api/monitoring/health`                                    | સ્વચાલિત kubelet લાઇવનેસ                               |

**અપગ્રેડ્સ:** દરેક સત્રનું જોડાણ તૂટશે તેવી અપેક્ષા રાખો. શક્ય હોય તો ક્લાયન્ટ્સને ડ્રેઇન કરો; ડિફૉલ્ટ SQLite પર કોઈ રોલિંગ અપડેટ નથી. Compose `restart: unless-stopped` અને Docker `HEALTHCHECK` પણ કન્ટેનર અસ્વસ્થ થાય ત્યારે એકમાત્ર પ્રક્રિયાને બદલી દેશે — અસરનો વ્યાપ સમાન રહેશે.

**એકલ રિપ્લિકા** માટેનો Kubernetes સ્નિપેટ (Recreate આવશ્યક છે; એક SQLite ફાઇલ સામે `replicas` વધારશો નહીં):

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

`preStop` સ્લીપ SIGTERM પહેલાં kubeને Service એન્ડપૉઇન્ટ્સ દૂર કરવાની તક આપે છે, જેથી **નવો** ટ્રાફિક બંધ થઈ રહેલી પ્રક્રિયા સુધી પહોંચવાનું બંધ કરે. પ્રગતિમાં રહેલા `/v1/responses` SSEને હેવીવેઇટ ઍડમિશન લીઝ દ્વારા `SHUTDOWN_TIMEOUT_MS` (ડિફૉલ્ટ 30s) સુધી ડ્રેઇન કરવામાં આવે છે (#11015). તેમ છતાં પ્રક્રિયા સુધી પહોંચતી નવી વિનંતીઓને `503` + `Retry-After: 5` મળે છે. બદલીની રિપ્લિકા Ready થાય ત્યાં સુધીનો Recreate ખાલી-એન્ડપૉઇન્ટ અંતરાલ સંપૂર્ણ આઉટેજ જ રહે છે — આ SQLite ટોપોલોજી છે, પ્રોબનું ખોટું કૉન્ફિગરેશન નહીં.

બાહ્ય Postgres / મલ્ટિ-રાઇટર HA એ **દસ્તાવેજીકૃત સ્ટૉક માર્ગ નથી**. જો તમને HAની જરૂર હોય, તો એકલ રિપ્લિકા જ રાખો અથવા પ્રોજેક્ટે અલગથી પરીક્ષણ અને દસ્તાવેજીકરણ કરેલી ટોપોલોજી ચલાવો. Postgres/MySQL સંબંધિત કાર્ય [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)માં છે. તે ઉપલબ્ધ થાય ત્યાં સુધી, **મોટી** `/v1/responses` ક્ષમતા વધારવાનો એકમાત્ર સમર્થિત માર્ગ N સ્વતંત્ર પ્રક્રિયાઓ (આગળનો વિભાગ) છે, એક વૉલ્યૂમ પર `replicas > 1` નહીં.

## સ્કેલ-આઉટ: N સ્વતંત્ર પ્રોસેસ

એક Node પ્રોસેસ એટલે **એક V8 heap**. એકબીજા સાથે ઓવરલેપ થતી ~3 MiB / ~750k-token કોડિંગ-એજન્ટ `POST /v1/responses` વિનંતીઓ (RTK + Caveman) ~12 Gi પર તે heap ને બંધ કરાવે છે (`FATAL ERROR: Reached heap limit`) અને 16 Gi cgroup માં OOM સર્જી શકે છે. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) જુઓ. આ માપન **મેમરી-બજેટ** ચેતવણી છે, એકસાથે ચાલતી લાંબી `/v1/responses` વિનંતીઓ માટે ઉત્પાદનની બેની કઠોર મહત્તમ મર્યાદા નથી. હેવીવેઇટ ચેટ પ્રવેશને આપમેળે નિર્ધારિત થતા ઇનજેસ્ટ બાઇટ બજેટ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) દ્વારા નિયંત્રિત કરવામાં આવે છે, જે એ જ V8/cgroup મર્યાદાના આધારે માપાંકિત થાય છે — પહેલેથી માપાંકિત પ્રોસેસ પર તેને વધારીને ઓવરરાઇડ કરવાથી (અથવા લેગસી `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` વિનંતી-ગણતરી મર્યાદા સેટ કરવાથી) ફરીથી પ્રોસેસ બંધ થવાની સમસ્યા આવે છે. નાની ચેટ, `/healthz`, `/v1/models`, અને MCP આ મર્યાદામાં **સમાવિષ્ટ નથી**.

### એક પ્રોસેસ: બે કરતાં વધુ લાંબી `/v1/responses`

એક **સ્વસ્થ** પ્રોસેસ (heap, `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` કરતાં નીચે; ડિફૉલ્ટ `0.75`) એકસાથે બે કરતાં વધુ લાંબી `POST /v1/responses` વિનંતીઓ ચલાવી **શકે છે**, જો પ્રોસેસ-વ્યાપી ઇનફ્લાઇટ-બાઇટ બજેટ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) માં હજુ જગ્યા હોય. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` જેટલી કે તેથી મોટી બોડી (ડિફૉલ્ટ 256 KiB) સ્ટ્રક્ચર-હેવી વિનંતીઓ જેવી જ હેવીવેઇટ લીઝ લે છે અને એ જ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` એસ્કેપ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) નો ઉપયોગ કરે છે. એકસાથે દસકાઓ લાંબા SSE ક્લાયન્ટ્સ ચલાવવા (ઓપરેટરોને ઘણીવાર 40–50ની જરૂર પડે છે) એ **મેમરી-બજેટ**નો પ્રશ્ન છે — heap + પ્રાઇમરી/હેડરૂમ સ્લોટ્સ + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ને યોગ્ય રીતે માપાંકિત કરો — તે ઉત્પાદનની કઠોર “મહત્તમ 2” મર્યાદા નથી. દબાણ હેઠળનું heap હજુ પણ પુનઃપ્રયાસ કરી શકાય તેવા `503` સાથે લોડ ઘટાડે છે, જેથી #7849 ફરી ન આવે.

**અનેક heaps બનાવવા** (સ્વતંત્ર V8 old-spaces) માટે **અત્યારે**:

| આ કરો                                                                                                                                               | આ ન કરો                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **N containers/pods** ચલાવો, દરેકનું પોતાનું **અલગ** `DATA_DIR` / volume હોવું જોઈએ                                                                 | એક SQLite ફાઇલ સામે `replicas > 1` સેટ કરો                     |
| heap / inflight-byte બજેટના આધારે heavy in-flight + healthy-headroom માપાંકિત કરો; 1–2 એ સાવચેત #7849 ડિફૉલ્ટ છે, ઉત્પાદનની કઠોર મહત્તમ મર્યાદા નથી | એક પ્રોસેસને 8× RAM અને અમર્યાદિત ગણતરી મર્યાદા આપો            |
| **વહેંચાયેલા quota counters** માટે વૈકલ્પિક રીતે: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                              | Redis ને વહેંચાયેલ SQLite માનો — તે એવું નથી                   |
| દરેક instance માં provider secrets ની નકલ કરો (અથવા વિભાજિત dashboards સ્વીકારો)                                                                    | તમામ instances માટે એક dashboard / એક call-log ની અપેક્ષા રાખો |
| આગળ કોઈપણ load balancer મૂકો; API key અથવા session મુજબ sticky routing પૂરતું છે                                                                    | vendor-specific size-aware middleware ફરજિયાત માનો             |

હાર્ડવેર: દરેક instance દીઠ એકસાથે ચાલતી લાંબી `/v1/responses` વિનંતીઓની સંખ્યા એ **મેમરી-બજેટ**નો પ્રશ્ન છે (heap + inflight-byte / #10110). સ્વતંત્ર `DATA_DIR` ધરાવતા `N` instances હજુ પણ heaps ની સંખ્યા વધારે છે: હોસ્ટ RAM એ `N × cgroup` ને સમાવી શકે એટલી હોવી જોઈએ, “N=8 સાથે એક 16 Gi pod” નહીં. એક SQLite ફાઇલ પર ક્યારેય `replicas > 1` ન રાખો.

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

પ્રોસેસની અંદરની ઘનતા (HTTP isolate પરથી compression દૂર કરવું) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) માં છે. વહેંચાયેલ ટકાઉ state પર એક logical cluster માટે [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) જુઓ.

## Dockerની અંદર Geminiની પ્રાદેશિક ભૂલો

Google AI Studio / Gemini API, FAILED_PRECONDITION સાથે HTTP 400 અને
`User location is not supported for the API use.` પરત કરી શકે છે. હોસ્ટ પર સફળ થયેલી વિનંતી
એ સાબિત કરતી નથી કે કન્ટેનર પણ એ જ આઉટબાઉન્ડ રૂટનો ઉપયોગ કરે છે. DNS ક્રમ,
IPv4/IPv6 કનેક્ટિવિટી, VPN રૂટિંગ અને ગોઠવેલા પ્રોક્સી અલગ હોઈ શકે છે.
[Googleના સમર્થિત પ્રદેશો](https://ai.google.dev/gemini-api/docs/available-regions)
તેમજ વાસ્તવિક કનેક્શન રૂટ તપાસો; માત્ર આ ભૂલ ખરાબ API કી હોવાનો નિર્દેશ આપતી નથી.

### કનેક્શન-વિશિષ્ટ પ્રોક્સીને પ્રાથમિકતા આપો

અસરગ્રસ્ત Gemini કનેક્શન માટે OmniRouteની
[પ્રતિ-કનેક્શન પ્રોક્સી ગોઠવણી](../ops/PROXY_GUIDE.md#4-level-proxy-system)નો ઉપયોગ કરો,
ત્યારબાદ સમાન મોડેલ સાથે **કનેક્શનનું પરીક્ષણ કરો** અને નાની વિનંતી ફરીથી મોકલો.
આનાથી રૂટિંગમાં થયેલો ફેરફાર માત્ર તે કનેક્શન પૂરતો મર્યાદિત રહે છે. ખાતરી કરો કે
કન્ટેનરમાંથી પ્રોક્સી સુધી પહોંચી શકાય છે અને કનેક્શન ખરેખર તેને પસંદ કરે છે.
રૂટ બદલવાથી અપસ્ટ્રીમ પ્રાદેશિક પાત્રતાની ખાતરી મળતી નથી.

### હોસ્ટ અને કન્ટેનર નેટવર્કિંગની સરખામણી કરો

પ્રમાણિત પરિણામોની સરખામણી કરતી વખતે કી, મોડેલ અને વિનંતી સમાન રાખો; કોઈ ઇશ્યૂમાં
ક્યારેય ઓળખપત્રો, પ્રોક્સી પાસવર્ડ અથવા સંપૂર્ણ ઑથોરાઇઝેશન હેડર પેસ્ટ કરશો નહીં.
સૌપ્રથમ, હોસ્ટ અને કન્ટેનરની અંદર સમાન કમાન્ડનો ઉપયોગ કરીને તપાસો કે OS રિઝોલ્વર
કયા એડ્રેસ ફેમિલી પ્રદાન કરે છે:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute`ને તમે ચલાવતા હો તે સર્વિસથી બદલો (ઉદાહરણ તરીકે, `omniroute-web`).
આ કમાન્ડ ઓળખપત્રો અથવા IP એડ્રેસ વિના એડ્રેસ ફેમિલી પ્રિન્ટ કરે છે. પરત મળેલું `6`
માત્ર IPv6 DNS પરિણામ દર્શાવે છે: તે ઉપયોગ કરી શકાય એવો IPv6 રૂટ અથવા API ઍક્સેસ
હોવાનું સાબિત **કરતું નથી**. જ્યાં `curl` ઇન્સ્ટોલ કરેલું હોય ત્યાં બંને વાતાવરણમાં
`curl -4 -I https://generativelanguage.googleapis.com`ની સરખામણી
`curl -6 -I https://generativelanguage.googleapis.com` સાથે કરો. HTTP પ્રતિસાદ તે
ચકાસણી માટે કનેક્ટિવિટી સાબિત કરે છે, ભલે તે અપ્રમાણિત ભૂલ હોય; માત્ર પ્રમાણિત
મોડેલ વિનંતી જ Gemini પાત્રતાનું પરીક્ષણ કરે છે.

### હોસ્ટ-સ્તરનો વિકલ્પ: કાર્યરત IPv6 અને રિઝોલ્વર નીતિ

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)ના રિપોર્ટરે કન્ટેનર
IPv6 સક્ષમ કરીને અને glibc એડ્રેસ પસંદગી બદલીને પોતાના વાતાવરણમાં ઍક્સેસ પુનઃસ્થાપિત
કરી હતી. આને વાતાવરણ-વિશિષ્ટ વિકલ્પ તરીકે ગણો. રિઝોલ્વરની પસંદગીઓમાં ફેરફાર કરતાં
પહેલાં કાર્યરત હોસ્ટ IPv6, કન્ટેનર ઇગ્રેસ/રૂટિંગ અને ફાયરવૉલના નિયમોની ખાતરી કરો.
માત્ર ખાનગી ULA એડ્રેસ જાહેર IPv6 કનેક્ટિવિટી સ્થાપિત કરતું નથી.

Composeના ડિફૉલ્ટ નેટવર્ક સાથે પહેલેથી જોડાયેલી સર્વિસ માટે, આ ફ્રેગમેન્ટ તે નેટવર્ક પર
IPv6 સક્ષમ કરે છે; તમારી બાકીની સર્વિસ, પોર્ટ્સ, વોલ્યુમ્સ અને ગોઠવણી જાળવી રાખો:

```yaml
networks:
  default:
    enable_ipv6: true
```

નામિત નેટવર્ક માટે, સર્વિસ વાસ્તવમાં જે નેટવર્ક સાથે જોડાય છે તેના પર તેને સક્ષમ કરો.
Docker ULA સબનેટ ફાળવી શકે છે; તમારા નેટવર્કને તેની જરૂર હોય ત્યારે જ સ્પષ્ટ,
એકબીજા સાથે ઓવરલૅપ ન થતું સબનેટ પસંદ કરો. [Docker IPv6 નેટવર્કિંગ](https://docs.docker.com/engine/daemon/ipv6/)
અને [Compose નેટવર્ક વિકલ્પો](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) જુઓ.

**glibc-આધારિત ઇમેજ** પર, `/etc/gai.conf` એડ્રેસ પસંદગી બદલી શકે છે. વર્તમાન
રિપોઝિટરી Dockerfile Debianનો ઉપયોગ કરે છે; કસ્ટમ musl-આધારિત ઇમેજમાં આ મિકૅનિઝમ
હોતું નથી. રિપોર્ટ કરાયેલ સમાયોજન ULA લેબલને `label fc00::/7 6`માંથી
`label fc00::/7 1`માં બદલે છે. ઇમેજના સંપૂર્ણ પોલિસી ટેબલથી શરૂઆત કરો અને તેની અન્ય
એન્ટ્રીઓ જાળવી રાખો: `label` અથવા `precedence` એન્ટ્રી ઉમેરવાથી તે ડિફૉલ્ટ ટેબલ
બદલાઈ જાય છે, તેથી માત્ર બદલાયેલી લાઇન ધરાવતી ફાઇલ અપૂરતી છે.
[glibc ગોઠવણી સંદર્ભ](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
તે સિમેન્ટિક્સનું દસ્તાવેજીકરણ કરે છે. સમીક્ષા કરેલી ફાઇલને `/etc/gai.conf` પર
ફક્ત વાંચી શકાય તેવી રીતે બાઇન્ડ-માઉન્ટ કરો અને તેને લાગુ કરવા માટે સર્વિસ ફરીથી બનાવો.

આનાથી **તે કન્ટેનરના તમામ આઉટબાઉન્ડ ટ્રાફિક** માટે OS એડ્રેસ પસંદગી બદલાય છે.
તે દરેક એપ્લિકેશનને IPv6 પસંદ કરવા માટે ફરજ પાડતું નથી: Nodeનો DNS ક્રમ અને કનેક્શન
પસંદગી પણ મહત્ત્વ ધરાવે છે. ખાસ કરીને, `--dns-result-order=ipv4first` IPv4ને
પ્રાથમિકતા આપે છે અને માત્ર IPv4 સંબંધિત નિષ્ફળતા માટે તે ઉપાય નથી.
[Node DNS ક્રમ](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) જુઓ.

હોસ્ટ-સ્તરનો કોઈપણ ફેરફાર કર્યા પછી Gemini અને તમારા અન્ય પ્રદાતાઓનું ફરીથી પરીક્ષણ કરો.
પાછું પૂર્વવત્ કરવા માટે, કસ્ટમ `gai.conf` માઉન્ટ દૂર કરો, અગાઉની નેટવર્ક ગોઠવણી
પુનઃસ્થાપિત કરો અને જાળવણી વિન્ડો દરમિયાન અસરગ્રસ્ત સર્વિસ/નેટવર્ક ફરીથી બનાવો.
નેટવર્ક ફરીથી બનાવવાથી તેની સાથે જોડાયેલા અન્ય કન્ટેનર વિક્ષેપિત થઈ શકે છે;
કાયમી ડેટા વોલ્યુમ કાઢી નાખશો નહીં.

## મહત્વપૂર્ણ નોંધો

- **SQLite WAL મોડ:** OmniRoute નવીનતમ ફેરફારોને `storage.sqlite` માં ચેકપોઇન્ટ કરી શકે તે માટે `docker stop` ને પૂર્ણ થવા દેવું જોઈએ. સાથે આપવામાં આવેલી Compose ફાઇલો પહેલેથી જ 40s નો સ્ટોપ ગ્રેસ પિરિયડ સેટ કરે છે. જો તમે ઇમેજને સીધી ચલાવો છો, તો `--stop-timeout 40` જાળવી રાખો.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** જો નિયમિત/લખાણ-પૂર્વ બેકઅપ બાહ્ય રીતે સંચાલિત થતા હોય, તો તેને `true` પર સેટ કરો. હાલના ડેટાબેઝના માઇગ્રેશન માટે હજુ પણ તેમનો પોતાનો ટકાઉ સુરક્ષા સ્નૅપશૉટ અને સામૂહિક માઇગ્રેશન ગાર્ડ જરૂરી છે.
- **ડેટા પર્સિસ્ટન્સ:** કન્ટેનર રીસ્ટાર્ટ દરમિયાન તમારા ડેટાબેઝ, કીઝ અને કન્ફિગરેશન્સ જાળવી રાખવા માટે હંમેશાં `/app/data` પર વોલ્યુમ માઉન્ટ કરો.
- **પોર્ટ કન્ફિગરેશન:** ડિફૉલ્ટ `20128` પોર્ટ બદલવા માટે `PORT` એન્વાયર્નમેન્ટ વેરિએબલને ઓવરરાઇડ કરો.

## આ પણ જુઓ

- [VM ડિપ્લોયમેન્ટ માર્ગદર્શિકા](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare સેટઅપ
- [Fly.io ડિપ્લોયમેન્ટ માર્ગદર્શિકા](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io પર ડિપ્લોય કરો
- [એન્વાયર્નમેન્ટ કન્ફિગ](../reference/ENVIRONMENT.md) — સંપૂર્ણ `.env` સંદર્ભ
