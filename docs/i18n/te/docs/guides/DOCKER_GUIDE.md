# 🐳 Docker Guide — OmniRoute (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> పూర్తి Docker డిప్లాయ్మెంట్ సూచన. త్వరగా ప్రారంభించడానికి, [README Docker విభాగం](../README.md#-docker) చూడండి.

## విషయ సూచిక

- [త్వరిత అమలు](#quick-run)
- [ఎన్విరాన్మెంట్ ఫైల్తో](#with-environment-file)
- [Docker Compose](#docker-compose)
- [అందుబాటులో ఉన్న ప్రొఫైల్లు](#available-profiles)
- [OmniRoute Dockerలో నడుస్తున్నప్పుడు హోస్ట్ CLI సాధనాలను కాన్ఫిగర్ చేయడం](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis సైడ్కార్](#redis-sidecar)
- [ప్రొడక్షన్ Compose](#production-compose)
- [Dockerfile దశలు](#dockerfile-stages)
- [కీలకమైన ఎన్విరాన్మెంట్ వేరియబుల్స్](#critical-environment-variables)
- [Caddyతో Docker Compose (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare త్వరిత టన్నెల్](#cloudflare-quick-tunnel)
- [ఇమేజ్ ట్యాగ్లు](#image-tags)
- [లభ్యత: డిఫాల్ట్ SQLite ఒకే రెప్లికాకు పరిమితం](#availability-default-sqlite-is-single-replica)
- [Dockerలో Gemini ప్రాంతీయ ఎర్రర్లు](#gemini-regional-errors-inside-docker)
- [ముఖ్యమైన గమనికలు](#important-notes)

---

## త్వరిత అమలు

> **ఒకే కమాండ్తో స్వయంగా హోస్ట్ చేయాలా?**
> [సెల్ఫ్-హోస్ట్ గైడ్](../getting-started/SELF_HOST_GUIDE.md) చూడండి —
> `docker compose -f docker-compose.selfhost.yml up -d` (ప్రచురించిన ఇమేజ్ +
> Redis, లూప్బ్యాక్కు మాత్రమే పరిమితం, ప్రొఫైల్ ఎంపిక లేదు). ఇప్పటికే Redisను వేరేచోట
> నడుపుతున్న వినియోగదారుల కోసం దిగువ త్వరిత అమలు ఒకే కంటైనర్ మార్గం.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## ఎన్విరాన్మెంట్ ఫైల్తో

```bash
# ముందుగా .envను కాపీ చేసి సవరించండి
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
# ప్రాథమిక ప్రొఫైల్ (CLI సాధనాలు లేవు)
docker compose --profile base up -d

# CLI ప్రొఫైల్ (Claude Code, Codex, OpenClaw అంతర్నిర్మితం)
docker compose --profile cli up -d

# హోస్ట్ ప్రొఫైల్ (ప్రధానంగా Linux కోసం; హోస్ట్ CLI బైనరీలను చదవడానికి మాత్రమే మౌంట్ చేస్తుంది)
docker compose --profile host up -d

# వెబ్ ప్రొఫైల్ (వెబ్-సెషన్ ప్రొవైడర్ల కోసం Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI సైడ్కార్ను కలపండి
docker compose --profile cli --profile cliproxyapi up -d
```

## అందుబాటులో ఉన్న ప్రొఫైల్లు

ప్రధాన డిప్లాయ్మెంట్ విధానాల కోసం OmniRoute Compose ప్రొఫైల్లను అందిస్తుంది. మీ ఎన్విరాన్మెంట్కు సరిపోయేదాన్ని ఎంచుకోండి.

| ప్రొఫైల్          | సర్వీస్          | ఎప్పుడు ఉపయోగించాలి                                                                                                                                           | కమాండ్                                       |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (డిఫాల్ట్) | `omniroute-base` | హెడ్లెస్ సర్వర్ / కనిష్ఠ రన్టైమ్, ప్రొవైడర్ CLIలు బండిల్ చేయబడవు                                                                                              | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` మరియు బండిల్ చేసిన CLIలను (Codex, Claude Code, Droid, OpenClaw) పిలిచే ఏజెంటిక్ వర్క్ఫ్లోలు                                | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` మొదలైనవాటిని చదవడానికి మాత్రమే మౌంట్ చేయడం ద్వారా హోస్ట్ CLIలకు `network_mode`-లాంటి యాక్సెస్ కోరుకునే Linux హోస్ట్లు | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | అప్స్ట్రీమ్ CLI ప్రాక్సీయింగ్ కోసం పోర్ట్ `8317`లో [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) సైడ్కార్ను అమలు చేయండి                         | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | బ్రౌజర్ అవసరమయ్యే వెబ్-సెషన్ ప్రొవైడర్లు: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web`ను బిల్డ్ చేస్తుంది, Chromium చేర్చబడింది)              | `docker compose --profile web up -d`         |

> బహుళ ప్రొఫైల్లను కలపవచ్చు: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Dockerలో నడుస్తున్నప్పుడు హోస్ట్ CLI సాధనాలను కాన్ఫిగర్ చేయడం

`omniroute setup-codex`, `setup-claude`, `config set <tool>` మరియు డ్యాష్బోర్డ్లోని
**కాన్ఫిగ్ను సేవ్ చేయి** బటన్ అన్నీ `~/.codex/*.config.toml` వంటి ఫైళ్లను వ్రాస్తాయి. ఆ పాత్లకు
CLI వాస్తవంగా నడిచే మెషీన్లో మాత్రమే అర్థం ఉంటుంది. వాటిని కంటైనర్లోపల
అమలు చేస్తే, వ్రాత కంటైనర్ స్వంత హోమ్లో (`/home/node` —
ఇమేజ్ `USER node`గా నడుస్తుంది) జరుగుతుంది; దాన్ని ఏ హోస్ట్ CLI కూడా ఎప్పటికీ చదవదు, అలాగే
కంటైనర్ను మళ్లీ సృష్టించిన వెంటనే అది తొలగిపోతుంది.

OmniRoute దీనిని గుర్తించి, మీరు ఉపయోగించలేని విజయాన్ని నివేదించడానికి బదులుగా
సూచనలతో వ్రాతను నిరాకరిస్తుంది: CLI `2`తో నిష్క్రమిస్తుంది, API `422`తో
`containerEphemeralTarget: true` అని సమాధానమిస్తుంది.

### సిఫార్సు చేయబడిన విధానం: CLIని హోస్ట్పై, OmniRouteని Dockerలో అమలు చేయండి

కంటైనర్ APIని అందిస్తుంది; CLI మీ హోస్ట్ సాధనాలను కాన్ఫిగర్ చేస్తుంది.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLIని కంటైనర్కు అనుసంధానించండి
omniroute setup-codex                      # మీ హోస్ట్లోని అసలైన ~/.codexలో వ్రాస్తుంది
```

Codex, Claude Code, Cursor లేదా ఇలాంటి సాధనాలు మీ
ల్యాప్టాప్లో నడుస్తున్నప్పుడు ఇది సరైన ఎంపిక — సాధారణంగా ఉండే సెటప్ ఇదే.

### ప్రత్యామ్నాయం: హోస్ట్ కాన్ఫిగ్ డైరెక్టరీలను బైండ్-మౌంట్ చేయండి (`host` ప్రొఫైల్)

కంటైనర్ స్వయంగా మీ హోస్ట్ కాన్ఫిగ్లో వ్రాయాలని మీరు కోరుకుంటే,
డైరెక్టరీలను మౌంట్ చేసి, `CLI_CONFIG_HOME`ను మౌంట్ రూట్కు సూచించేలా చేయండి. `host` ప్రొఫైల్
ఇప్పటికే ఇలా చేస్తుంది:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

బైండ్ మౌంట్ వల్లనే ఆ పాత్ నమ్మదగినదిగా మారుతుంది: OmniRoute
`/proc/self/mountinfo`ను చదివి, మౌంట్ చేసిన పాత్లలో (అలాగే, వాటి చైల్డ్ డైరెక్టరీలు
మౌంట్లుగా ఉన్న డైరెక్టరీలలో కూడా — పైన ఉన్న `/host-home` నిర్మాణం సరిగ్గా అలాంటిదే) వ్రాయడానికి అనుమతిస్తుంది;
అదే సమయంలో మౌంట్ చేయని వాటిని మాత్రం నిరాకరిస్తూనే ఉంటుంది.

### ప్రత్యామ్నాయ మార్గం: కంటైనర్ స్వంత CLIలను కాన్ఫిగర్ చేయండి (అవసరమైనప్పుడు మాత్రమే ఉపయోగించండి)

CLIలు నిజంగానే కంటైనర్లోపల ఉన్నప్పుడు (`cli` ప్రొఫైల్), వ్రాత
ఉద్దేశపూర్వకమైనదే. ఏదైనా `setup-*` కమాండ్కు `--allow-container-write`ను పంపండి లేదా సర్వర్ కోసం
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`ను సెట్ చేయండి. ఆ వ్రాత కంటైనర్ను మించి
మనుగడ సాగించదనే హెచ్చరికతో కొనసాగుతుంది.

> **భద్రతా హెచ్చరిక — `cli` ప్రొఫైల్ + `docker.sock` మౌంట్.**
> కంటైనర్లోని ఆటో-అప్డేటర్ హోస్ట్ డీమన్ నుండి స్టాక్ను మళ్లీ సృష్టించగలిగేలా
> `cli` ప్రొఫైల్ `/var/run/docker.sock`ను బైండ్-మౌంట్ చేస్తుంది
> (`src/lib/system/autoUpdate.ts` ఆ సాకెట్ ఉందో లేదో పరిశీలించి, అది
> లేనప్పుడు Docker మార్గాన్ని దాటవేస్తుంది). ఆ సాకెట్ **హోస్ట్-root విశ్వాస
> సరిహద్దు**: దాన్ని చేరుకోగల ఏదైనా హోస్ట్ Docker డీమన్ను
> rootగా నియంత్రిస్తుంది — అది హోస్ట్లోని ఏ కంటైనర్నైనా సృష్టించగలదు, పరిశీలించగలదు,
> ఆపగలదు మరియు తొలగించగలదు. పర్యవసానాలు:
>
> 1. **`cli` ప్రొఫైల్ పోర్ట్ను ఎప్పుడూ నెట్వర్క్కు బహిర్గతం చేయవద్దు.** దాన్ని
>    `127.0.0.1`పై పబ్లిష్ చేయండి (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN ద్వారా చేరుకోగల `cli` ప్రొఫైల్, డ్యాష్బోర్డ్-స్థాయి RCE ఏదైనా
>    పూర్తి హోస్ట్ రాజీగా మారేలా చేస్తుంది.
> 2. **`cli` ప్రొఫైల్లోకి అదనపు హోస్ట్ డైరెక్టరీలను బైండ్ చేయవద్దు.**
>    Docker సాకెట్తో పాటు ఏదైనా అదనపు మౌంట్, కంటైనర్కు మీ ఫైల్సిస్టమ్ మరియు
>    హోస్ట్ కాన్ఫిగ్పై పూర్తి చదవడం/వ్రాయడం ప్రాప్యతను ఇస్తుంది. ఒక సాధనం
>    ప్రాజెక్ట్ను చూడాల్సి ఉంటే, దాన్ని CLI బైనరీతో స్థానికంగా అమలు చేయండి — దాన్ని
>    `cli` కంటైనర్లోకి మౌంట్ చేయవద్దు.
>
> మీకు కంటైనర్లో ఆటో-అప్డేట్ అవసరం లేకపోతే, `cli` ప్రొఫైల్ను ఆఫ్లోనే ఉంచండి
> (`COMPOSE_PROFILES=core,redis` లేదా ఇంకా సంక్షిప్తంగా). ఇతర ప్రొఫైళ్లు
> Docker సాకెట్ను మౌంట్ చేయవు.
>
> MITMకు సంబంధించిన ముప్పు నమూనా కోసం `docs/security/MITM-TPROXY-DECRYPT.md`ను చూడండి
> (gitలో ఉంది; `/docs`లోకి కంపైల్ చేయబడదు), అలాగే
> `codex`/`claude-code`/`droid`/`openclaw` బైనరీ మూలాధార గొలుసు కోసం
> `docs/security/SUPPLY_CHAIN.md`ను చూడండి.

## Redis సైడ్కార్

పంపిణీ చేయబడిన రేట్ లిమిటర్ మరియు భాగస్వామ్య క్యాష్కు మద్దతు ఇవ్వడానికి OmniRoute, Redisపై ఆధారపడుతుంది. `docker-compose.yml`లో `redis` సర్వీస్ **ఎల్లప్పుడూ నిర్వచించబడి ఉంటుంది** (దీనికి ప్రొఫైల్ గేట్ లేదు), అలాగే ఇది ఏ ఇతర ప్రొఫైల్తోనైనా కలిసి ప్రారంభమవుతుంది.

| వివరాలు                  | విలువ                                    |
| ------------------------ | ---------------------------------------- |
| ఇమేజ్                    | `redis:7-alpine`                         |
| కంటైనర్ పేరు             | `omniroute-redis`                        |
| అంతర్గత పోర్ట్           | `6379`                                   |
| హోస్ట్ పోర్ట్ (ఓవర్రైడ్) | `REDIS_PORT` (`6379` డిఫాల్ట్)           |
| హోస్ట్ బైండ్ (ఓవర్రైడ్)  | `REDIS_BIND_HOST` (`127.0.0.1` డిఫాల్ట్) |
| వాల్యూమ్                 | `omniroute-redis-data` → `/data`         |
| హెల్త్చెక్               | `redis-cli ping` (10s వ్యవధి)            |

సంబంధిత ఎన్విరాన్మెంట్ వేరియబుల్స్:

- `REDIS_URL` — యాప్లోకి ఇంజెక్ట్ చేయబడే కనెక్షన్ స్ట్రింగ్ (డిఫాల్ట్గా `redis://redis:6379`).
- `REDIS_PORT` — Redis కంటైనర్ కోసం హోస్ట్ వైపు పోర్ట్ మ్యాపింగ్.
- `REDIS_BIND_HOST` — పోర్ట్ ప్రచురించబడే హోస్ట్ ఇంటర్ఫేస్. డిఫాల్ట్గా `127.0.0.1`.

> **డిఫాల్ట్గా లూప్బ్యాక్ ఎందుకు:** సైడ్కార్ `requirepass` లేకుండా రన్ అవుతుంది, అలాగే యాప్
> కంటైనర్లు compose నెట్వర్క్ (`redis:6379`) ద్వారా దానిని చేరుకుంటాయి — ప్రచురించిన పోర్ట్
> హోస్ట్ వైపు టూలింగ్ (`redis-cli`, స్థానిక `npm run dev`) కోసం మాత్రమే ఉంటుంది. `0.0.0.0`పై
> ప్రచురిస్తే, ప్రామాణీకరణ లేని Redis మీ LANలోని ప్రతి హోస్ట్కు బహిర్గతమవుతుంది. మీరు
> `REDIS_BIND_HOST=0.0.0.0` సెట్ చేస్తే, సర్వీస్ `command:`కు `--requirepass`ను కూడా జోడించండి.

**Redisను నిలిపివేయడం** సిఫార్సు చేయబడదు (రేట్ లిమిటర్ ఇన్-మెమరీ ఫాల్బ్యాక్కు దిగజారుతుంది). తప్పనిసరైతే, `docker-compose.yml`లోని `redis:` సర్వీస్ బ్లాక్ను తొలగించండి/కామెంట్ చేయండి లేదా దానిని సున్నాకు స్కేల్ చేయండి:

```bash
docker compose up -d --scale redis=0
```

## ప్రొడక్షన్ Compose

డెవ్తో సమాంతరంగా రన్ అయ్యే ఐసోలేటెడ్ ప్రొడక్షన్ స్నాప్షాట్ కోసం, `docker-compose.prod.yml`ను ఉపయోగించండి.

| వివరాలు                      | విలువ                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| ఫైల్                         | `docker-compose.prod.yml`                                                                   |
| డిఫాల్ట్ డ్యాష్బోర్డ్ పోర్ట్ | `PROD_DASHBOARD_PORT=20130` (అంతర్గత `${DASHBOARD_PORT:-20128}`కు మ్యాప్ చేయబడుతుంది)       |
| డిఫాల్ట్ API పోర్ట్          | `PROD_API_PORT=20131`                                                                       |
| ఇమేజ్                        | `omniroute:prod` (`runner-cli` టార్గెట్ నుండి బిల్డ్ చేయబడింది)                             |
| Redis కంటైనర్                | `omniroute-redis-prod` (`redis:8.6.2`, ప్రత్యేక `redis-prod-data` వాల్యూమ్)                 |
| డేటా వాల్యూమ్                | `omniroute-prod-data` (పేరుతో కూడినది, రీబిల్డ్ల మధ్య నిల్వ ఉంటుంది)                        |
| హెల్త్చెక్లు                 | `node healthcheck.mjs` + `redis-cli ping`, Redis హెల్త్ ఆధారంగా గేట్ చేయబడిన `depends_on`తో |

ఉపయోగించే విధానం:

```bash
# ప్రొడక్షన్ స్టాక్ను బిల్డ్ చేసి ప్రారంభించండి
docker compose -f docker-compose.prod.yml up -d --build

# లాగ్లను స్ట్రీమ్ చేయండి
docker compose -f docker-compose.prod.yml logs -f

# నిలిపివేయండి (వాల్యూమ్లను ఉంచండి)
docker compose -f docker-compose.prod.yml down
```

ప్రొడ్ స్టాక్, డెవ్ composeతో సమాంతరంగా రన్ అవుతుంది (వేర్వేరు కంటైనర్ పేర్లు, పోర్ట్లు మరియు వాల్యూమ్లు), కాబట్టి ప్రొడక్షన్ రన్ అవుతూనే మీరు స్థానికంగా పనిని కొనసాగించవచ్చు.

## Dockerfile దశలు

ఈ రిపోజిటరీ బహుళ-దశల Dockerfile (`Dockerfile`)ను అందిస్తుంది. నాలుగు దశలు అందుబాటులో ఉన్నాయి; మీ వినియోగ సందర్భానికి సరైన `target`ను ఎంచుకోండి.

| దశ            | బేస్ ఇమేజ్            | ప్రయోజనం                                                                                                                                                                                                                                                                                                           |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | డిపెండెన్సీలను ఇన్స్టాల్ చేస్తుంది (`npm ci --legacy-peer-deps`) మరియు `npm run build`ను అమలు చేస్తుంది (డిఫాల్ట్గా Turbopack — దిగువన ఉన్న బిల్డ్-సమయ వనరులను చూడండి)                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Next.js స్వతంత్ర అవుట్పుట్తో ప్రొడక్షన్ రన్టైమ్. **ప్రొవైడర్ CLIలు ఏవీ బండిల్ చేయబడలేదు.**                                                                                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose`తో పాటు గ్లోబల్ CLIలను జోడిస్తుంది: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **ఏజెంటిక్ వర్క్ఫ్లోల కోసం దీన్ని ఎంచుకోండి.**                                                                                                                          |
| `runner-web`  | `runner-base`         | వెబ్-సెషన్ ప్రొవైడర్లు `gemini-web`, `claude-web`, `claude-turnstile` కోసం Playwrightతో పాటు Chromium బ్రౌజర్ను (`--with-deps`) జోడిస్తుంది. **మీరు ఆ ప్రొవైడర్లను ఉపయోగించినప్పుడు దీన్ని ఎంచుకోండి** — ఇది లేకుండా సాధారణ ఇమేజ్ అభ్యర్థన సమయంలో విఫలమవుతుంది (Release Channels కింద ఉన్న `-web` గమనికను చూడండి). |

నిర్దిష్ట targetను మాన్యువల్గా బిల్డ్ చేయండి:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### బిల్డ్-సమయ వనరులు

`builder` దశకు అవసరమయ్యే వనరులను మూడు బిల్డ్ ఆర్గ్యుమెంట్లు నియంత్రిస్తాయి. ఇవి బిల్డ్ సమయంలో మాత్రమే వర్తిస్తాయి —
`OMNIROUTE_MEMORY_MB` (దిగువన) అనేది వేరైన రన్టైమ్ నియంత్రణ.

| బిల్డ్ ఆర్గ్యుమెంట్         | డిఫాల్ట్ | ప్రభావం                                                                                                      |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` webpackతో బిల్డ్ చేస్తుంది: గరిష్ఠ మెమరీ వినియోగం తక్కువ, వేగం నెమ్మది. `1` Turbopackను ఉపయోగిస్తుంది.   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | ప్రారంభించబడిన `next build` కోసం V8 హీప్ పరిమితి (`--max-old-space-size`).                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL`కు విలువను అందిస్తుంది; పేజీ-డేటా సేకరణ కోసం Next `workers = N - 1`ను ఉత్పన్నం చేస్తుంది. |

పెద్ద builderపై పెంచాల్సింది `OMNIROUTE_BUILD_WORKERS`; పరిమిత వనరులున్న బిల్డ్
`✓ Compiled successfully` **తర్వాత** ఆగిపోతే అనుమానించాల్సిందీ ఇదే. ప్రతి
పేజీ-డేటా worker దానికదే ఒక process, అలాగే పేరెంట్ `next build` కూడా;
ప్రత్యక్ష VPS పునరుత్పత్తిలో (issue #7518), `NODE_OPTIONS` హీప్ ఫ్లాగ్తో
సంబంధం లేకుండా ప్రతి process గరిష్ఠ RSS ~4.5 GBగా కొలవబడింది (Turbopack,
V8 హీప్కు వెలుపల native/Rust మెమరీలో కంపైల్ చేస్తుంది). డిఫాల్ట్ `2`
(→ 1 worker, మొత్తం 2 processలు) అనేది ప్రచురణ pipeline ఉపయోగించే
16 GB / 4 vCPU GitHub-hosted runnerలకు సరిపోయేలా నిర్ణయించబడింది.
`8` వద్ద (→ 7 workerలు) ఆ runnerలో మెమరీ అయిపోయింది మరియు buildkit
`ResourceExhausted: ... cannot allocate memory`తో ఆ దశను విఫలం చేసింది;
ఒక్కో process RSSను పరోక్షంగా అంచనా వేయడానికి బదులుగా నేరుగా కొలిచినప్పుడు,
`3` (→ 2 workerలు) కూడా సరిపోలేదు. `tests/unit/docker-build-memory-budget.test.ts`
కొలిచిన విలువ ఆధారంగా గణన చేసి, ఏ నియంత్రణ అయినా runner సామర్థ్యాన్ని
మించితే విఫలమవుతుంది.

Turbopack, V8 హీప్కు **వెలుపల** ఉండే native Rust మెమరీలో కంపైల్ చేస్తుంది,
కాబట్టి `OMNIROUTE_BUILD_MEMORY_MB` దాన్ని పరిమితం చేయదు. మెమరీ పరిమితి ఉన్న
హోస్ట్లో, ఎలాంటి లోప వచనం లేకుండానే OOM killer బిల్డ్ను SIGKILL చేస్తుంది —
అది `Creating an optimized production build` మధ్యలోనే ఆగిపోతుంది; దీనివల్ల
మెమరీ అయిపోవడంలా కాకుండా ప్రక్రియ నిలిచిపోయినట్లు కనిపిస్తుంది. అందుకే
`npm run dev` / `npm run build`లో కోడ్ డిఫాల్ట్ Turbopack అయినప్పటికీ,
`Dockerfile`లో webpack (`OMNIROUTE_USE_TURBOPACK=0`) డిఫాల్ట్గా ఉంటుంది:
ఎలాంటి బిల్డ్ ఆర్గ్యుమెంట్లు లేని సాధారణ `docker build .` (Railway మరియు ఇతర
ఒక-క్లిక్ హోస్ట్లు అమలు చేసేది) మెమరీ పరిమితి ఉన్న builderలో నిశ్శబ్దంగా
విఫలమవకూడదు. ప్రచురించిన ఇమేజ్లు ఇప్పటికే `docker-publish.yml`లో
`OMNIROUTE_USE_TURBOPACK=0`ను స్పష్టంగా పంపిస్తాయి. తగినంత RAM ఉన్న builderలో
వేగవంతమైన బిల్డ్ కోసం Turbopackను ఎంచుకోండి:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ప్రారంభించబడి ఉంది, కాబట్టి `next build` ఒక పేరెంట్
processతో పాటు ఒక worker processను అమలు చేస్తుంది, మరియు ప్రతి ఒక్కటీ
`OMNIROUTE_BUILD_MEMORY_MB`ను వేర్వేరుగా పాటిస్తుంది. కంటైనర్ పరిమితిని ఆ
విలువకు ఒక రెట్టు కాకుండా, సుమారు రెండు రెట్ల కంటే ఎక్కువగా నిర్ణయించండి.

ఈ treeపై కొలిచిన ఫలితాలు (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| బండ్లర్   | కంటైనర్ పరిమితి | ఫలితం                                      |
| --------- | --------------- | ------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB  | రెండింటిలోనూ నిశ్శబ్దంగా OOM-killed        |
| webpack   | 8 GiB           | build worker SIGKILL చేయబడింది             |
| webpack   | 12 GiB          | విజయవంతమైంది, గరిష్ఠంగా 11.1 GiBకి చేరింది |

### రన్టైమ్ డిఫాల్ట్లు

`runner-base` ద్వారా ఎగుమతి చేయబడే డిఫాల్ట్లు: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Dockerలో మెమరీ ప్రవర్తన:

- ఇమేజ్ `OMNIROUTE_MEMORY_MB=1024`ను సెట్ చేసి, దాని నుండి `NODE_OPTIONS=--max-old-space-size=1024`ను ఉత్పన్నం చేస్తుంది.
- అసలు సర్వర్ ప్రాసెస్ను standalone launcher ప్రారంభిస్తుంది; ఇది `OMNIROUTE_MEMORY_MB`ను చదివి, `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`ను జోడిస్తుంది.
- పునరావృతమైన `--max-old-space-size` విలువల్లో చివరిదాన్ని Node ఉపయోగిస్తుంది, కాబట్టి `OMNIROUTE_MEMORY_MB`ను సెట్ చేయడం ద్వారా ప్రభావవంతమైన Docker heap పరిమితిని నియంత్రించవచ్చు.
- ఇమేజ్ దీన్ని ఎల్లప్పుడూ సెట్ చేస్తుంది కాబట్టి, launcherకు చెందిన RAM-ఆధారిత fallback Dockerలో ఎప్పటికీ వర్తించదు. workloadకు అనుగుణంగా దీన్ని స్పష్టంగా పెంచండి (దిగువ పట్టిక). coding-agent `/v1/responses` కోసం `2048` కూడా చాలా తక్కువే.

### coding agents కోసం runtime RAM

1 GiB Docker default అనేది dashboard/తేలికపాటి chat కోసం కనీస స్థాయి మాత్రమే, production పరిమాణం కాదు. పొడవైన `POST /v1/responses` bodyలు (వందలాది messages, పదుల సంఖ్యలో tools) compression సమయంలో అనేక in-memory graphలను నిల్వ ఉంచుతాయి. ఒకేసారి నడిచిన సుమారు ~3 MiB / ~750k-token పరిమాణం గల రెండు requests, **12 GiB** old-space వద్ద V8ను నిలిపివేశాయి (`FATAL ERROR: Reached heap limit`), అలాగే 16 GiB cgroup OOMకు కూడా కారణమయ్యాయి. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) చూడండి.

cgroup `--memory`ను **heap కంటే ఎక్కువగా** కేటాయించండి — native buffers, SQLite, మరియు compression intermediateలు V8 వెలుపల ఉంటాయి.

| Workload                                         | `OMNIROUTE_MEMORY_MB`  | Container / cgroup                  | గమనికలు                                                                                                              |
| ------------------------------------------------ | ---------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Dashboard, ఒక తేలికపాటి chat                     | `1024` (ఇమేజ్ default) | ≥2 GiB                              |                                                                                                                      |
| ఒక coding agent (Claude/Codex/Grok)              | `8192`                 | ≥10 GiB                             | సాధారణ single-session `/v1/responses`                                                                                |
| ఒకేసారి రెండు పొడవైన `/v1/responses`             | `10240`–`12288`        | ≥12–16 GiB                          | సుమారు 12 GiB heap వద్ద V8 నిలిచిపోవడం కొలవబడింది                                                                    |
| ఒకేసారి మూడు లేదా అంతకంటే ఎక్కువ పొడవైన contexts | ఒకే processలో చేయవద్దు | క్రమబద్ధంగా అమలు చేయండి / మరింత RAM | default heavyweight admissionలో 1 in-flight మాత్రమే ఉంటుంది; RAMను పెంచకుండా దీన్ని పెంచితే abort మళ్లీ సంభవిస్తుంది |

`OMNIROUTE_MEMORY_MB` **సెట్ చేయనప్పుడు**, bare metalపై `omniroute serve` RAMలో సుమారు 35% మేరకు (`[512, 4096]` పరిధిలో పరిమితం చేసి) సర్దుబాటు చేస్తుంది. Docker ఎల్లప్పుడూ `1024`ను సెట్ చేస్తుంది కాబట్టి, అధికారిక ఇమేజ్లో ఆ calibration ఎప్పటికీ అమలవదు.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## కీలక ఎన్విరాన్మెంట్ వేరియబుల్స్

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)లో డాక్యుమెంట్ చేసిన డిఫాల్ట్లతో పాటు, Docker కింద అమలు చేస్తున్నప్పుడు కింది వేరియబుల్స్ అత్యంత ముఖ్యమైనవి:

| వేరియబుల్                     | ఉద్దేశ్యం                                                                                                                                                                                                                                                                               | డిఫాల్ట్                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket బ్రిడ్జ్ కోసం షేర్డ్ సీక్రెట్. **ప్రొడక్షన్లో తప్పనిసరి** — దీన్ని బలమైన యాదృచ్ఛిక స్ట్రింగ్కు సెట్ చేయండి.                                                                                                                                                                   | సెట్ చేయబడలేదు (అందించాలి) |
| `REDIS_URL`                   | రేట్ లిమిటర్ / క్యాష్ బ్యాకెండ్ కోసం కనెక్షన్ స్ట్రింగ్                                                                                                                                                                                                                                 | `redis://redis:6379`       |
| `REDIS_PORT`                  | బండిల్ చేసిన Redis కంటైనర్ కోసం హోస్ట్-సైడ్ పోర్ట్                                                                                                                                                                                                                                      | `6379`                     |
| `REDIS_BIND_HOST`             | బండిల్ చేసిన Redis పోర్ట్ ప్రచురించబడే హోస్ట్ ఇంటర్ఫేస్ (మీరు AUTH జోడించకపోతే లూప్బ్యాక్)                                                                                                                                                                                              | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | స్వీయ-నవీకరణ వర్క్ఫ్లోల కోసం `/workspace/omniroute` వద్ద `cli` ప్రొఫైల్లో మౌంట్ చేయబడే హోస్ట్ పాత్                                                                                                                                                                                      | `.` (ప్రస్తుత డైరెక్టరీ)   |
| `OMNIROUTE_MEMORY_MB`         | Docker స్వతంత్ర సర్వర్ కోసం రన్టైమ్ Node హీప్ గరిష్ఠ పరిమితి; పైన పేర్కొన్న ఇమేజ్ డిఫాల్ట్ను ఓవర్రైడ్ చేస్తుంది. కోడింగ్ ఏజెంట్లు: `8192`+ ([రన్టైమ్ RAM](#runtime-ram-for-coding-agents) చూడండి).                                                                                      | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | డ్యాష్బోర్డ్ (20128) మరియు API (20129) కోసం బహిర్గతం చేసిన పోర్ట్లను ఓవర్రైడ్ చేస్తుంది                                                                                                                                                                                                 | `20128` / `20129`          |
| `APP_BIND_HOST`               | docker-compose డ్యాష్బోర్డ్/API/live-WS పోర్ట్లను ప్రచురించే హోస్ట్ ఇంటర్ఫేస్. `REQUIRE_API_KEY=false` (డిఫాల్ట్) ఉన్నప్పుడు, `0.0.0.0` అనామక `/v1` ప్రాక్సీని LANకు బహిర్గతం చేస్తుంది — `REQUIRE_API_KEY=true`తో లేదా ముందు రివర్స్ ప్రాక్సీ ఉన్నప్పుడు మాత్రమే పరిధిని విస్తరించండి. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | docker-compose `cliproxyapi` సైడ్కార్ను ప్రచురించే హోస్ట్ ఇంటర్ఫేస్ — దాని డేటా వాల్యూమ్ ప్రొవైడర్ క్రెడెన్షియల్స్ను కలిగి ఉంటుంది.                                                                                                                                                     | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | రన్టైమ్ ప్లగిన్ స్కానర్ చదివే మరియు ఇన్స్టాల్ చేసే డైరెక్టరీ. ప్లగిన్లు బైండ్-మౌంట్ చేయబడినప్పుడు దీన్ని సెట్ చేయండి: డిఫాల్ట్ `HOME`ను అనుసరిస్తుంది, కానీ ఇమేజ్ దాన్ని ఎక్స్పోర్ట్ చేయాల్సిన అవసరం లేదు.                                                                              | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | యాప్ రివర్స్ ప్రాక్సీ వెనుక ప్రచురించబడినప్పుడు ఉపయోగించే URL సబ్పాత్ (ఉదా. `/omniroute`)                                                                                                                                                                                               | _(ఖాళీ = రూట్)_            |
| `NEXT_PUBLIC_BASE_URL`        | సబ్పాత్తో సహా పబ్లిక్ బ్రౌజర్ ఒరిజిన్ (ఉదా. `https://host/omniroute`)                                                                                                                                                                                                                   | సెట్ చేయబడలేదు             |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` కోసం హోస్ట్-సైడ్ డ్యాష్బోర్డ్ పోర్ట్                                                                                                                                                                                                                          | `20130`                    |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` సైడ్కార్ కోసం హోస్ట్-సైడ్ పోర్ట్                                                                                                                                                                                                                                          | `8317`                     |

## ఉపపథంపై రివర్స్ ప్రాక్సీ (Traefik / nginx)

Next.js `basePath` అనేది స్టాండ్అలోన్ బండిల్లో కంపైల్ చేయబడుతుంది. OmniRoute, యాప్ రూట్లోని ఒక సెంటినల్ ఫైల్లో బేక్ చేసిన విలువను నమోదు చేస్తుంది (`npm run build` సమయంలో వ్రాయబడుతుంది; `scripts/docker/ensure-docker-base-path.mjs` ద్వారా చదవబడుతుంది) మరియు కంటైనర్ ప్రారంభమైనప్పుడు దానిని `OMNIROUTE_BASE_PATH`తో పోలుస్తుంది. అవి వేరుగా ఉండి, ఇమేజ్ డొమైన్ రూట్ కోసం బిల్డ్ చేయబడి ఉంటే, `node dev/run-standalone.mjs` రన్ కావడానికి ముందు ఎంట్రీపాయింట్ స్టాండ్అలోన్ మానిఫెస్ట్లను, ఎంబెడ్ చేసిన `basePath`/`assetPrefix` లిటరల్స్ను (Next 16 SSR అసెట్ URLలను `assetPrefix` నుంచే రెండర్ చేస్తుంది — ప్యాచర్ ఉపపథాన్ని దానిలోనూ ప్రతిబింబిస్తుంది), బేక్ చేసిన `/_next/static` అసెట్ URLలను (క్లయింట్-రిఫరెన్స్ మానిఫెస్ట్లు, మీడియా ఇంపోర్ట్లు, ముందుగా రెండర్ చేసిన ఎర్రర్ పేజీలు) మరియు క్లయింట్ `process.env` షిమ్ను తిరిగి వ్రాస్తుంది.

### Compose బిల్డ్ (సిఫార్సు చేయబడింది)

ఇమేజ్ మరియు రన్టైమ్ ఒకే విధంగా ఉండేలా `.env`లో రెండు వేరియబుల్స్ను సెట్ చేసి, ఆపై మళ్లీ బిల్డ్ చేయండి:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`ను Docker build-argగా మరియు రన్టైమ్ ఎన్విరాన్మెంట్ వేరియబుల్గా ఫార్వర్డ్ చేస్తుంది.

### ముందుగా బిల్డ్ చేసిన రూట్ ఇమేజ్ + రన్టైమ్ ఉపపథం

ప్రచురించిన `diegosouzapw/omniroute:*` ఇమేజ్లు డొమైన్ రూట్ కోసం బిల్డ్ చేయబడ్డాయి. అయినప్పటికీ, మీరు రన్టైమ్లో `OMNIROUTE_BASE_PATH`ను సెట్ చేయవచ్చు; కంటైనర్ ప్రారంభమైనప్పుడు బండిల్ను ఒకసారి ప్యాచ్ చేస్తుంది. దానికి సరిపోలే పబ్లిక్ ఆరిజిన్ను జత చేయండి:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**పూర్తి** బాహ్య పథాన్ని ఫార్వర్డ్ చేసేలా రివర్స్ ప్రాక్సీని కాన్ఫిగర్ చేయండి (ప్రిఫిక్స్ను తొలగించవద్దు). Traefik, `StripPrefix` లేకుండా `PathPrefix(`/omniroute`)`ను కంటైనర్కు రూట్ చేయాలి. తద్వారా Next.jsకు `/omniroute/...` అందుతుంది మరియు అది `/omniroute/_next/...` నుంచి అసెట్లను అందిస్తుంది.

Docker హెల్త్చెక్, సక్రియ `OMNIROUTE_BASE_PATH`తో ప్రిఫిక్స్ చేయబడిన తేలికపాటి `/healthz` లైఫ్సైకిల్ ఎండ్పాయింట్ను ప్రోబ్ చేస్తుంది. మానవ/డ్యాష్బోర్డ్ డయాగ్నస్టిక్స్ కోసం `/api/monitoring/health` అందుబాటులోనే ఉంటుంది; కంటైనర్ HEALTHCHECKను తిరిగి దాని వైపు మళ్లించడానికి (ఉదాహరణకు, డీప్ హెల్త్ అమలు కోసం), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`ను సెట్ చేయండి. ఆ పథం ఒక **డీప్** చెక్ (DB + మానిటరింగ్ సారాంశం) — మీరు తిరిగి దాన్ని ఎంచుకుంటే Docker యొక్క అరుదైన `HEALTHCHECK`కు తగినది, కానీ Kubernetes `livenessProbe` విరామాలకు **తగినది కాదు**.

ఆర్కెస్ట్రేటర్ల కోసం (Kubernetes, Nomad మొదలైనవి):

| ప్రోబ్              | ప్రాధాన్యం ఇవ్వాల్సినది                                                | నివారించాల్సినది                                                  |
| ------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| లైవ్నెస్            | HTTP `GET /livez`, లేదా ప్రధాన పోర్ట్పై TCP (`PORT`, డిఫాల్ట్ `20128`) | లైవ్నెస్గా `/api/monitoring/health`                               |
| రెడీనెస్            | HTTP `GET /healthz`                                                    | ఈవెంట్-లూప్ బిజీగా ఉండటాన్ని డెడ్గా పరిగణించే కఠినమైన టైమ్అవుట్లు |
| డీప్ / బ్లాక్బాక్స్ | `/api/monitoring/health`                                               | —                                                                 |

`/healthz` ప్రాసెస్ లైఫ్సైకిల్ను (`ok` / `starting` / `stopping`) నివేదిస్తుంది. `/livez` కేవలం ప్రాసెస్ సజీవంగా ఉందో లేదో మాత్రమే సూచిస్తుంది (హ్యాండ్లర్ రన్ చేయగలిగినప్పుడల్లా 200; ఇది రెడీనెస్ కోసం వేచి ఉండదు). రెండూ ఇప్పటికీ రిక్వెస్ట్ హ్యాండ్లింగ్ ఉపయోగించే అదే Node ఈవెంట్ లూప్పై రన్ అవుతాయి, కాబట్టి CPU-బౌండ్ కాటలాగ్ లేదా కంప్రెషన్ పని వాటిని ఆలస్యం చేయవచ్చు — బిజీ ≠ డెడ్. HTTP ప్రోబ్లు టైమ్అవుట్ అయితే TCP లైవ్నెస్కు ప్రాధాన్యం ఇవ్వండి. పూర్తి ప్రోబ్ మార్గదర్శకత్వం:
[మానిటరింగ్ గైడ్ — Kubernetes ప్రోబ్ సిఫార్సులు](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddyతో Docker Compose (HTTPS Auto-TLS)

Caddy యొక్క ఆటోమేటిక్ SSL ప్రొవిజనింగ్ను ఉపయోగించి OmniRouteను సురక్షితంగా బహిర్గతం చేయవచ్చు. మీ డొమైన్ యొక్క DNS A రికార్డ్ మీ సర్వర్ IPని సూచిస్తున్నట్లు నిర్ధారించుకోండి.

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
      # OAuth కాల్బ్యాక్లు, డ్యాష్బోర్డ్ లింక్లు మరియు రూపొందించిన పబ్లిక్ URLల కోసం బ్రౌజర్కు ఎదురుగా ఉండే ఆరిజిన్.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # షెడ్యూల్ చేసిన జాబ్లు / సెల్ఫ్-ఫెచ్ల కోసం అంతర్గత సర్వర్-టు-సర్వర్ URL.
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

అప్స్ట్రీమ్ కంటైనర్ కోసం Caddy ప్రామాణిక ఫార్వార్డింగ్ హెడర్లను సెట్ చేస్తుంది. OAuth కాల్బ్యాక్లు మరియు రూపొందించిన పబ్లిక్
లింక్ల కోసం OmniRoute `NEXT_PUBLIC_BASE_URL`ను ప్రామాణిక పబ్లిక్ ఆరిజిన్గా ఉపయోగిస్తుంది; ప్రమాణీకరించిన డ్యాష్బోర్డ్ రైట్లు అదే-ఆరిజిన్ అభ్యర్థనలతో పాటు సెషన్కు అనుసంధానించిన CSRF
రక్షణను ఉపయోగిస్తాయి. స్పష్టమైన కాన్ఫిగరేషన్కు బదులుగా విశ్వసనీయ ఫార్వార్డెడ్ హెడర్ల నుంచి OmniRoute పబ్లిక్ ఆరిజిన్ను ఉద్దేశపూర్వకంగా
నిర్ణయించాలని మీరు కోరుకునే అధునాతన డిప్లాయ్మెంట్ల కోసం మాత్రమే `OMNIROUTE_TRUST_PROXY`ను ప్రారంభించండి.

## Cloudflare Quick Tunnel

Docker డిప్లాయ్మెంట్ల కోసం డ్యాష్బోర్డ్ మద్దతులో `Dashboard → Endpoints` వద్ద ఒక-క్లిక్ **Cloudflare Quick Tunnel** ఉంటుంది. మొదటిసారి ప్రారంభించినప్పుడు అవసరమైతే మాత్రమే `cloudflared`ను డౌన్లోడ్ చేసి, మీ ప్రస్తుత `/v1` ఎండ్పాయింట్కు తాత్కాలిక టన్నెల్ను ప్రారంభించి, రూపొందించిన `https://*.trycloudflare.com/v1` URLను మీ సాధారణ పబ్లిక్ URLకు నేరుగా దిగువన చూపిస్తుంది.

సక్రియ టన్నెల్ స్థితిని మార్చకుండానే `Settings → Appearance` నుంచి ఎండ్పాయింట్ టన్నెల్ ప్యానెల్లను (Cloudflare, Tailscale, ngrok) చూపించవచ్చు లేదా దాచవచ్చు.

### టన్నెల్ గమనికలు

- Quick Tunnel URLలు తాత్కాలికమైనవి మరియు ప్రతి రీస్టార్ట్ తర్వాత మారుతాయి.
- OmniRoute లేదా కంటైనర్ రీస్టార్ట్ తర్వాత Quick Tunnelలు స్వయంచాలకంగా పునరుద్ధరించబడవు. అవసరమైనప్పుడు వాటిని డ్యాష్బోర్డ్ నుంచి మళ్లీ ప్రారంభించండి.
- మేనేజ్డ్ ఇన్స్టాల్ ప్రస్తుతం `x64` / `arm64`పై Linux, macOS మరియు Windowsకు మద్దతు ఇస్తుంది.
- పరిమిత కంటైనర్ వాతావరణాల్లో అనవసరమైన QUIC UDP బఫర్ హెచ్చరికలను నివారించడానికి మేనేజ్డ్ Quick Tunnelలు డిఫాల్ట్గా HTTP/2 ట్రాన్స్పోర్ట్ను ఉపయోగిస్తాయి. మీకు వేరే ట్రాన్స్పోర్ట్ కావాలంటే `CLOUDFLARED_PROTOCOL=quic` లేదా `auto`గా సెట్ చేయండి.
- Docker ఇమేజ్లు సిస్టమ్ CA రూట్లను బండిల్ చేసి, వాటిని మేనేజ్డ్ `cloudflared`కు పంపిస్తాయి; దీనివల్ల కంటైనర్ లోపల టన్నెల్ బూట్స్ట్రాప్ అయినప్పుడు TLS విశ్వసనీయత వైఫల్యాలు నివారించబడతాయి.
- OmniRoute ఒకదాన్ని డౌన్లోడ్ చేయడానికి బదులుగా ఇప్పటికే ఉన్న బైనరీని ఉపయోగించాలని మీరు కోరుకుంటే `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`గా సెట్ చేయండి.

## ఇమేజ్ ట్యాగ్లు

| ఇమేజ్                    | ట్యాగ్   | పరిమాణం | వివరణ                                                    |
| ------------------------ | -------- | ------- | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | అత్యధిక **ప్రచురించబడిన** స్థిర SemVer (git `main` కాదు) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | GitOps కోసం ఈ తరహా ట్యాగ్ను స్థిరంగా ఉంచండి              |

మల్టీ-ప్లాట్ఫారమ్ మానిఫెస్ట్: `linux/amd64` + `linux/arm64` నేటివ్ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker సరిపోలే ఆర్కిటెక్చర్ను స్వయంచాలకంగా ఎంచుకుంటుంది; ARM హోస్ట్లపై AMD64 ఎమ్యులేషన్ను బలవంతం చేయాల్సి వస్తే `--platform linux/amd64`ను పాస్ చేయండి.

### విడుదల ఛానెల్లు

స్థిర విడుదలలు, సక్రియ విడుదల-బ్రాంచ్ పరీక్ష మరియు డెవలప్మెంట్ బిల్డ్ల కోసం OmniRoute వేర్వేరు Docker ఛానెల్లను ప్రచురిస్తుంది.

| ఛానెల్                          | మూలం                                   | మార్పుచెందగల స్వభావం              | సిఫార్సు చేసిన వినియోగం                                                                                                 |
| ------------------------------- | -------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | సంతకం చేసిన/వెర్షన్ చేసిన విడుదల       | మార్పుచేయలేనిది                   | ఖచ్చితమైన విడుదలకు పిన్ చేసే ప్రొడక్షన్ డిప్లాయ్మెంట్లు                                                                 |
| `:latest` / `:latest-web`       | అత్యధిక **ప్రచురించబడిన** స్థిర SemVer | మార్పుచెందగల స్థిర పాయింటర్       | SemVer ప్రచురణ జాబ్ **తర్వాత** స్థిర విడుదలలను అనుసరిస్తుంది — `main` లేదా విడుదల కాని `release/v*` కమిట్లను అనుసరించదు |
| `:next` / `:next-web`           | ప్రస్తుత డిఫాల్ట్ `release/v*` బ్రాంచ్ | మార్పుచెందగల ప్రీ-రిలీజ్ పాయింటర్ | సక్రియ విడుదల బ్రాంచ్లో చేర్చబడినప్పటికీ ఇంకా స్థిర విడుదలలో లేని పరిష్కారాలను పరీక్షించడం                              |
| `:main` / `:main-web`           | `main` బ్రాంచ్                         | మార్పుచెందగల డెవలప్మెంట్ పాయింటర్ | డెవలప్మెంట్ మరియు ఇంటిగ్రేషన్ పరీక్ష కోసం మాత్రమే                                                                       |

#### వెబ్-సెషన్ ప్రొవైడర్లు: `-web` ఇమేజ్లు

పైన ఉన్న ప్రతి ఛానెల్కు `-web` ట్యాగ్ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) కూడా ఉంటుంది; ఇది `runner-web` స్టేజ్ నుంచి బిల్డ్ చేయబడుతుంది — అదే ఇమేజ్కు అదనంగా Playwright మరియు Chromium బ్రౌజర్ ఉంటాయి. సాధారణ ఇమేజ్ Chromium **లేకుండా** వస్తుంది; `gemini-web`, `claude-web` మరియు `claude-turnstile`లకు అది అవసరం.

వైఫల్యం స్టార్టప్ సమయంలో కాకుండా వాయిదా వేయబడుతుంది: ఆ ప్రొవైడర్లు తమ మోడల్లను జాబితా చేసి, డ్యాష్బోర్డ్లో కనెక్ట్ అయినట్లు చూపిస్తాయి; మొదటి అభ్యర్థన మాత్రమే ఈ లోపంతో విఫలమవుతుంది

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

మీరు ఆ ప్రొవైడర్లను ఉపయోగిస్తే, మీరు ఇప్పటికే ఉపయోగిస్తున్న ఛానెల్ యొక్క `-web` ట్యాగ్ను పుల్ చేయండి — మరేమీ మారదు. npm/CLI ఇన్స్టాల్లో (Docker ఇమేజ్ లేకుండా), దీనికి సమానమైన లోపించిన భాగం బ్రౌజర్ బైనరీ: హోస్ట్లో `npx playwright install chromium`ను అమలు చేయండి.

#### ప్రీ-రిలీజ్ ఛానెల్ను ఉపయోగించడం

ప్రస్తుత డిఫాల్ట్ `release/v*` బ్రాంచ్కు జరిగే ప్రతి push సమయంలో `next` ఛానల్ మళ్లీ నిర్మించబడుతుంది మరియు AMD64, ARM64 రెండింటికీ ప్రచురించబడుతుంది. పాత నిర్వహణ బ్రాంచ్లు దానిని ఓవర్రైట్ చేయలేవు. తదుపరి స్థిరమైన ట్యాగ్ను రూపొందించే ముందు, సక్రియ విడుదల బ్రాంచ్లో విలీనం చేయబడిన పరిష్కారాల కోసం ఈ ఛానల్ pull చేయగల ఇమేజ్ను అందిస్తుంది.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose కోసం, ఎంచుకున్న ప్రొఫైల్ ఉపయోగించే ఇమేజ్ ట్యాగ్ను ఓవర్రైడ్ చేసి, ఆపై సర్వీస్ను pull చేసి మళ్లీ సృష్టించండి:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### భద్రత మరియు రోల్బ్యాక్

`next` అనేది మారుతూ ఉండే ప్రీ-రిలీజ్ ఛానల్. సక్రియ విడుదల బ్రాంచ్కు జరిగే ఏ push సమయంలోనైనా ఇది మారవచ్చు మరియు **ప్రొడక్షన్ వినియోగానికి మద్దతు లేదు**. నిర్దిష్ట బిల్డ్ను మూల్యాంకనం చేస్తున్నప్పుడు ఇమేజ్ డైజెస్ట్ను పిన్ చేయండి:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

పరీక్షించే ముందు, OmniRoute డేటా వాల్యూమ్ లేదా bind-mounted డేటా డైరెక్టరీని బ్యాకప్ చేయండి. రోల్బ్యాక్ చేయడానికి, గతంలో ఉపయోగించిన స్థిరమైన వెర్షన్ లేదా డైజెస్ట్ను పునరుద్ధరించి, కంటైనర్ను మళ్లీ సృష్టించండి:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

విడుదల-బ్రాంచ్ బిల్డ్ ఎప్పటికీ `latest`ను మార్చలేదు; అర్హత కలిగిన స్థిరమైన సేమాంటిక్ వెర్షన్ మాత్రమే స్థిరమైన పాయింటర్ను ముందుకు తీసుకెళ్లగలదు. `next` ఇమేజ్లు విడుదల ఇమేజ్ తనిఖీని మరియు CRITICAL దుర్బలతల నిరోధక గేట్ను కొనసాగిస్తాయి.

**`latest` అనేది git తాజాదనానికి హామీ కాదు.** `main`లో లేదా సక్రియ `release/v*` బ్రాంచ్లో విలీనం చేసిన పరిష్కారాలు, స్థిరమైన SemVer ఇమేజ్ ప్రచురించబడి, ప్రచురణ జాబ్ `:latest`ను ముందుకు తీసుకెళ్లే వరకు **`:latest`లో ఉండవు** (ఆ SemVerకు ఉన్న అదే డైజెస్ట్). GitHubలో పరిష్కారం ఇప్పటికే కనిపిస్తున్నప్పటికీ `latest` మారకుండా ఉన్నట్లు అనిపిస్తే, విడుదల బ్రాంచ్ను పరీక్షించడానికి `:next`ను pull చేయండి లేదా SemVer ట్యాగ్ కోసం వేచి ఉండండి.

| మీకు కావలసినది                                                                             | ఉపయోగించాల్సింది                               |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| మార్పులకు లోనుకాకూడని GitOps / ప్రొడక్షన్                                                  | `:X.Y.Z`ను (లేదా ఇమేజ్ డైజెస్ట్ను) పిన్ చేయండి |
| ప్రచురించిన స్థిరమైన విడుదలలను అనుసరిస్తూ, ప్రతి విడుదలకు మళ్లీ సృష్టించడాన్ని అంగీకరించడం | `:latest`                                      |
| విడుదల కాని `release/v*` commitలను పరీక్షించడం                                             | `:next` (ప్రొడక్షన్ కోసం కాదు)                 |
| `main`ను పరీక్షించడం                                                                       | `:main` (ప్రొడక్షన్ కోసం కాదు)                 |

## లభ్యత: డిఫాల్ట్ SQLite సింగిల్-రెప్లికా

ప్రామాణిక Docker / Kubernetes OmniRoute అనేది **ఒక Node ప్రాసెస్ + ఒక SQLite రైటర్**. ఈ టోపాలజీలో అధిక లభ్యతకు **మద్దతు లేదు**.

| పరిమితి                                      | పరిణామం                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ఒకే రైటర్                                    | ఒకే SQLite ఫైల్పై బహుళ రెప్లికాలను అమలు **చేయవద్దు**. అది DBని పాడుచేస్తుంది.                                                                                                                                                                                                                                                                                 |
| పునఃసృష్టి / పునఃప్రారంభం / HEALTHCHECK కిల్ | కొనసాగుతున్న SSE, డ్యాష్బోర్డ్ సెషన్లు మరియు ఇన్-మెమరీ స్థితికి **పూర్తి అంతరాయం**. కనెక్ట్ అయిన ప్రతి క్లయింట్ డిస్కనెక్ట్ అవుతుంది. ఎండ్పాయింట్లు ఖాళీగా ఉండే వ్యవధిలో కొత్త అభ్యర్థనలకు OmniRoute JSON కాకుండా రివర్స్-ప్రాక్సీ **`502 Bad Gateway: Unknown error`** వస్తుంది — క్లయింట్లు దీనిని ప్రొవైడర్ వైఫల్యం నుండి వేరు చేసి గుర్తించలేరు (#11015). |
| `/healthz`తో ఒకే ఈవెంట్ లూప్                 | బిజీగా ఉన్న కేటలాగ్ లేదా కంప్రెషన్ టిక్ ప్రోబ్లను ఆలస్యం చేయవచ్చు; అప్పుడు తక్కువ టైమ్అవుట్ **ఒక్కటే ఉన్న** రెప్లికాను పునఃప్రారంభిస్తుంది.                                                                                                                                                                                                                   |

**ప్రోబ్ మ్యాట్రిక్స్** ([Kubernetes ప్రోబ్ సిఫార్సులు](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) కూడా చూడండి):

| ప్రోబ్             | లక్ష్యం                                                      | ఉపయోగించకూడనివి                                                   |
| ------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| లైవ్నెస్           | `PORT`పై TCP (డిఫాల్ట్ `20128`), లేదా సాఫ్ట్ HTTP `/healthz` | `/api/monitoring/health`                                          |
| రెడీనెస్           | HTTP `GET /healthz`                                          | ఈవెంట్ లూప్ బిజీగా ఉండటాన్ని డెడ్గా పరిగణించే కఠినమైన టైమ్అవుట్లు |
| డీప్ / మానవుల కోసం | `/api/monitoring/health`                                     | ఆటోమేటెడ్ kubelet లైవ్నెస్                                        |

**అప్గ్రేడ్లు:** ప్రతి సెషన్ డిస్కనెక్ట్ అవుతుందని భావించండి. సాధ్యమైతే క్లయింట్లను డ్రెయిన్ చేయండి; డిఫాల్ట్ SQLiteపై రోలింగ్ అప్డేట్ లేదు. Compose `restart: unless-stopped`తో పాటు Docker `HEALTHCHECK` కూడా కంటైనర్ Unhealthyగా మారినప్పుడు ఒక్కటే ఉన్న ప్రాసెస్ను భర్తీ చేస్తుంది — దీని ప్రభావ పరిధి కూడా అదే.

**ఒకే రెప్లికా** కోసం Kubernetes స్నిపెట్ (Recreate అవసరం; ఒకే SQLite ఫైల్పై `replicas`ను పెంచవద్దు):

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

`preStop` స్లీప్ వల్ల SIGTERMకు ముందు kube, Service ఎండ్పాయింట్లను తొలగించగలదు; అందువల్ల **కొత్త** ట్రాఫిక్ ముగుస్తున్న ప్రాసెస్ను చేరడం ఆగుతుంది. కొనసాగుతున్న `/v1/responses` SSE, హెవీవెయిట్ అడ్మిషన్ లీజ్ల ద్వారా `SHUTDOWN_TIMEOUT_MS` (డిఫాల్ట్ 30s) వరకు డ్రెయిన్ చేయబడుతుంది (#11015). అయినప్పటికీ ప్రాసెస్ను చేరే కొత్త అభ్యర్థనలకు `503` + `Retry-After: 5` వస్తుంది. ప్రత్యామ్నాయ ప్రాసెస్ Ready అయ్యే వరకు ఉండే Recreate ఖాళీ-ఎండ్పాయింట్ విరామం పూర్తి అంతరాయంగానే ఉంటుంది — అది SQLite టోపాలజీ లక్షణం, ప్రోబ్ తప్పు కాన్ఫిగరేషన్ కాదు.

బాహ్య Postgres / మల్టీ-రైటర్ HA అనేది డాక్యుమెంట్ చేయబడిన ప్రామాణిక మార్గం **కాదు**. మీకు HA అవసరమైతే, ఒకే రెప్లికాను కొనసాగించండి లేదా ప్రాజెక్ట్ పరీక్షించి విడిగా డాక్యుమెంట్ చేసిన టోపాలజీని అమలు చేయండి. Postgres/MySQL పని [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)లో ఉంది. అది విడుదలయ్యే వరకు, **పెద్ద** `/v1/responses` సామర్థ్యాన్ని పెంచడానికి మద్దతు ఉన్న ఏకైక మార్గం N స్వతంత్ర ప్రాసెస్లు (తదుపరి విభాగం); ఒకే వాల్యూమ్పై `replicas > 1` కాదు.

## స్కేల్-అవుట్: N స్వతంత్ర ప్రాసెస్లు

ఒక Node ప్రాసెస్ అంటే **ఒక V8 హీప్**. ఒకదానితో మరొకటి ఓవర్ల్యాప్ అయ్యే ~3 MiB / ~750k-token కోడింగ్-ఏజెంట్ `POST /v1/responses` అభ్యర్థనలు రెండు (RTK + Caveman), ~12 Gi వద్ద ఆ హీప్ను అబార్ట్ చేస్తాయి (`FATAL ERROR: Reached heap limit`), అలాగే 16 Gi cgroupలో OOM కలిగించగలవు. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) చూడండి. ఆ కొలత ఒక **మెమరీ-బడ్జెట్** హెచ్చరిక; ఏకకాలంలో అమలయ్యే దీర్ఘకాలిక `/v1/responses` అభ్యర్థనలకు రెండు అనేది ప్రోడక్ట్ హార్డ్-మాక్స్ కాదు. హెవీవెయిట్ చాట్ అడ్మిషన్, అదే V8/cgroup పరిమితి ఆధారంగా సైజ్ చేయబడిన, స్వయంచాలకంగా ఉత్పన్నమయ్యే ఇన్జెస్ట్ బైట్ బడ్జెట్ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ద్వారా నియంత్రించబడుతుంది — ఇప్పటికే సైజ్ చేసిన ప్రాసెస్లో దాన్ని పెంచి ఓవర్రైడ్ చేయడం (లేదా పాత `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` రిక్వెస్ట్-కౌంట్ పరిమితిని సెట్ చేయడం) మళ్లీ అబార్ట్కు దారితీస్తుంది. చిన్న చాట్లు, `/healthz`, `/v1/models`, మరియు MCP ఆ పరిమితిలో **ఉండవు**.

### ఒక ప్రాసెస్: రెండు కంటే ఎక్కువ దీర్ఘకాలిక `/v1/responses`

ఒక **ఆరోగ్యకరమైన** ప్రాసెస్ (హీప్ `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` కంటే తక్కువగా ఉన్నప్పుడు, డిఫాల్ట్ `0.75`), ప్రాసెస్-వ్యాప్త ఇన్ఫ్లైట్-బైట్ బడ్జెట్లో (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ఇంకా స్థలం ఉంటే, ఏకకాలంలో రెండు కంటే ఎక్కువ దీర్ఘకాలిక `POST /v1/responses` అభ్యర్థనలను అమలు **చేయవచ్చు**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (డిఫాల్ట్ 256 KiB)కు సమానమైన లేదా అంతకంటే పెద్ద బాడీలు, స్ట్రక్చర్-హెవీ అభ్యర్థనల మాదిరిగానే అదే హెవీవెయిట్ లీజ్ను తీసుకుంటాయి మరియు అదే [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ఎస్కేప్ను (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ఉపయోగిస్తాయి. పదుల సంఖ్యలో ఏకకాలిక దీర్ఘకాలిక SSE క్లయింట్లు (ఆపరేటర్లకు తరచుగా 40–50 అవసరమవుతాయి) అనేది ఒక **మెమరీ-బడ్జెట్** ప్రశ్న — హీప్ + ప్రైమరీ/హెడ్రూమ్ స్లాట్లు + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`ను తగిన విధంగా సైజ్ చేయాలి — ఇది “గరిష్ఠంగా 2” అనే ప్రోడక్ట్ పరిమితి కాదు. ఒత్తిడిలో ఉన్న హీప్ ఇప్పటికీ మళ్లీ ప్రయత్నించగల `503`తో లోడ్ను తొలగిస్తుంది, తద్వారా #7849 మళ్లీ సంభవించదు.

**హీప్లను గుణించడానికి** (స్వతంత్ర V8 ఓల్డ్-స్పేస్లు) **ప్రస్తుతం**:

| చేయవలసినవి                                                                                                                                                                 | చేయకూడనివి                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **N containers/pods**ను అమలు చేయండి; ప్రతిదానికి దాని **సొంత** `DATA_DIR` / వాల్యూమ్ ఉండాలి                                                                                | ఒకే SQLite ఫైల్పై `replicas > 1` సెట్ చేయవద్దు                          |
| హీప్ / ఇన్ఫ్లైట్-బైట్ బడ్జెట్ ఆధారంగా హెవీ ఇన్-ఫ్లైట్ + హెల్తీ-హెడ్రూమ్ను సైజ్ చేయండి; 1–2 అనేది సురక్షితమైన #7849 డిఫాల్ట్ మాత్రమే, కఠినమైన ప్రోడక్ట్ గరిష్ఠ పరిమితి కాదు | ఒక ప్రాసెస్కు 8× RAM మరియు అపరిమిత కౌంట్ పరిమితిని ఇవ్వవద్దు            |
| **షేర్డ్ కోటా కౌంటర్ల** కోసం ఐచ్ఛికంగా: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                               | Redisను షేర్డ్ SQLiteగా పరిగణించవద్దు — అది అలాంటిది కాదు               |
| ప్రతి ఇన్స్టాన్స్లో ప్రొవైడర్ సీక్రెట్లను నకలు చేయండి (లేదా విభజించబడిన డాష్బోర్డ్లను అంగీకరించండి)                                                                        | అన్ని ఇన్స్టాన్స్లలో ఒకే డాష్బోర్డ్ / ఒకే కాల్-లాగ్ ఉంటుందని ఆశించవద్దు |
| ఏదైనా లోడ్ బ్యాలెన్సర్ను ముందుంచండి; API కీ లేదా సెషన్ ఆధారంగా స్టికీ చేయడం సరిపోతుంది                                                                                     | వెండర్కు ప్రత్యేకమైన సైజ్-అవేర్ మిడిల్వేర్ను తప్పనిసరిగా కోరవద్దు       |

హార్డ్వేర్: ప్రతి ఇన్స్టాన్స్లో ఏకకాలిక దీర్ఘకాలిక `/v1/responses` సామర్థ్యం ఒక **మెమరీ-బడ్జెట్** ప్రశ్న (హీప్ + ఇన్ఫ్లైట్-బైట్ / #10110). `N` స్వతంత్ర `DATA_DIR`లు ఇప్పటికీ హీప్లను గుణిస్తాయి: హోస్ట్ RAM, “N=8తో ఒక 16 Gi pod”ను కాకుండా `N × cgroup`ను భరించగలగాలి. ఒకే SQLite ఫైల్పై ఎప్పటికీ `replicas > 1` ఉపయోగించవద్దు.

Compose నమూనా (రెండు హీప్లు, రెండు వాల్యూమ్లు — `deploy.replicas: 2` కాదు):

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

ఇన్-ప్రాసెస్ సాంద్రత (HTTP ఐసోలేట్ వెలుపల కంప్రెషన్) గురించి [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)లో ఉంది. షేర్డ్ డ్యూరబుల్ స్టేట్పై ఒక లాజికల్ క్లస్టర్ గురించి [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)లో ఉంది.

## Docker లో Gemini ప్రాంతీయ లోపాలు

Google AI Studio / Gemini API, FAILED_PRECONDITION తో పాటు HTTP 400 మరియు
`User location is not supported for the API use.` సందేశాన్ని తిరిగి ఇవ్వవచ్చు. హోస్ట్పై అభ్యర్థన విజయవంతం కావడం,
కంటైనర్ కూడా అదే అవుట్బౌండ్ మార్గాన్ని ఉపయోగిస్తుందని నిరూపించదు. DNS క్రమం,
IPv4/IPv6 కనెక్టివిటీ, VPN రూటింగ్ మరియు కాన్ఫిగర్ చేసిన ప్రాక్సీలు వేర్వేరుగా ఉండవచ్చు.
[Google మద్దతిచ్చే ప్రాంతాలు](https://ai.google.dev/gemini-api/docs/available-regions)
అలాగే వాస్తవ కనెక్షన్ మార్గాన్ని తనిఖీ చేయండి; ఈ లోపం ఒక్కటే API key తప్పుగా ఉందని సూచించదు.

### కనెక్షన్కు నిర్దిష్టమైన ప్రాక్సీకి ప్రాధాన్యత ఇవ్వండి

ప్రభావిత Gemini కనెక్షన్ కోసం OmniRoute యొక్క [ప్రతి కనెక్షన్ ప్రాక్సీ కాన్ఫిగరేషన్](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ను ఉపయోగించి, ఆపై అదే మోడల్తో **కనెక్షన్ను పరీక్షించండి** మరియు ఒక చిన్న అభ్యర్థనను
మళ్లీ అమలు చేయండి. ఇది రూటింగ్ మార్పును ఆ కనెక్షన్కే పరిమితం చేస్తుంది. కంటైనర్ నుండి
ప్రాక్సీని చేరుకోగలరని, అలాగే కనెక్షన్ నిజంగానే దానిని ఎంచుకుంటోందని ధృవీకరించండి.
మార్గాన్ని మార్చడం వలన అప్స్ట్రీమ్ ప్రాంతీయ అర్హతకు హామీ లభించదు.

### హోస్ట్ మరియు కంటైనర్ నెట్వర్కింగ్ను సరిపోల్చండి

ప్రామాణీకరించిన ఫలితాలను సరిపోల్చేటప్పుడు key, model మరియు request ఒకేలా ఉంచండి; credentials,
proxy passwords లేదా పూర్తి authorization headersను ఎప్పుడూ issueలో అతికించవద్దు.
మొదట OS resolver ఏ address familiesను అందిస్తుందో, హోస్ట్పై మరియు కంటైనర్ లోపల
ఒకే commandను ఉపయోగించి పరిశీలించండి:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` స్థానంలో మీరు అమలు చేసే serviceను ఉంచండి (ఉదాహరణకు, `omniroute-web`). ఈ
commands, credentials లేదా IP addresses లేకుండా address familiesను ముద్రిస్తాయి. తిరిగి వచ్చిన `6`
కేవలం IPv6 DNS ఫలితాన్ని మాత్రమే చూపుతుంది: అది ఉపయోగించగల IPv6 route లేదా API accessను
**నిరూపించదు**. `curl` ఇన్స్టాల్ చేయబడిన చోట, రెండు environmentsలోనూ
`curl -4 -I https://generativelanguage.googleapis.com` ను
`curl -6 -I https://generativelanguage.googleapis.com` తో సరిపోల్చండి.
ప్రామాణీకరించని error అయినప్పటికీ, HTTP response ఆ probeకు connectivity ఉందని నిరూపిస్తుంది;
ప్రామాణీకరించిన model request మాత్రమే Gemini అర్హతను పరీక్షిస్తుంది.

### హోస్ట్-స్థాయి ప్రత్యామ్నాయం: పనిచేసే IPv6 మరియు resolver policy

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) నివేదించిన వ్యక్తి, container IPv6ను ప్రారంభించి
glibc address selectionను మార్చడం ద్వారా వారి environmentలో accessను పునరుద్ధరించారు.
దీనిని environmentకు నిర్దిష్టమైన ప్రత్యామ్నాయంగా పరిగణించండి. Resolver preferencesను
సర్దుబాటు చేయడానికి ముందు పనిచేసే host IPv6, container egress/routing మరియు firewall rulesను
నిర్ధారించండి. ఒక private ULA address మాత్రమే public IPv6 connectivityని స్థాపించదు.

Compose యొక్క default networkకు ఇప్పటికే జోడించబడిన services కోసం, ఈ fragment
ఆ networkపై IPv6ను ప్రారంభిస్తుంది; మీ మిగతా service, ports, volumes మరియు configurationను అలాగే ఉంచండి:

```yaml
networks:
  default:
    enable_ipv6: true
```

Named network కోసం, service వాస్తవంగా చేరే networkపై దాన్ని ప్రారంభించండి. Docker
ఒక ULA subnetను కేటాయించగలదు; మీ networkకు అవసరమైనప్పుడు మాత్రమే స్పష్టమైన, overlap కాని
subnetను ఎంచుకోండి. [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
మరియు [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) చూడండి.

**glibc-ఆధారిత image**లో, `/etc/gai.conf` address selectionను మార్చగలదు. ప్రస్తుత
repository Dockerfile Debianను ఉపయోగిస్తుంది; అనుకూల musl-ఆధారిత images ఈ mechanismను పంచుకోవు.
నివేదించబడిన సర్దుబాటు ULA labelను `label fc00::/7 6` నుండి
`label fc00::/7 1` కు మారుస్తుంది. Image యొక్క పూర్తి policy tableతో ప్రారంభించి, దాని ఇతర
entriesను అలాగే ఉంచండి: ఒక `label` లేదా `precedence` entryని జోడిస్తే ఆ default table
భర్తీ అవుతుంది, కాబట్టి మార్చిన line మాత్రమే ఉన్న file సరిపోదు.
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ఈ semanticsను వివరిస్తుంది. సమీక్షించిన fileను `/etc/gai.conf` వద్ద read-onlyగా bind-mount
చేసి, దాన్ని వర్తింపజేయడానికి serviceను మళ్లీ సృష్టించండి.

ఇది **ఆ కంటైనర్లోని అన్ని అవుట్బౌండ్ ట్రాఫిక్కు** OS address selectionను మారుస్తుంది.
ప్రతి application IPv6ను ఎంచుకునేలా ఇది బలవంతం చేయదు: Node యొక్క DNS order మరియు connection
selection కూడా ముఖ్యమైనవి. ముఖ్యంగా, `--dns-result-order=ipv4first` IPv4కు ప్రాధాన్యత ఇస్తుంది,
కాబట్టి IPv4-only failureకు ఇది పరిష్కారం కాదు. [Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) చూడండి.

ఏదైనా host-level మార్పు తర్వాత Gemini మరియు మీ ఇతర providersను మళ్లీ పరీక్షించండి.
వెనక్కి మార్చడానికి, అనుకూల `gai.conf` mountను తొలగించి, మునుపటి network configurationను
పునరుద్ధరించి, maintenance window సమయంలో ప్రభావిత service/networkను మళ్లీ సృష్టించండి.
Networkను మళ్లీ సృష్టించడం దానికి జోడించబడిన ఇతర containersకు అంతరాయం కలిగించవచ్చు;
persistent data volumeను తొలగించవద్దు.

## ముఖ్యమైన గమనికలు

- **SQLite WAL మోడ్:** OmniRoute తాజా మార్పులను `storage.sqlite`లోకి checkpoint చేయగలిగేలా `docker stop` పూర్తయ్యేందుకు అనుమతించాలి. చేర్చబడిన Compose ఫైళ్లు ఇప్పటికే 40s స్టాప్ గ్రేస్ పీరియడ్ను సెట్ చేశాయి. మీరు imageను నేరుగా రన్ చేస్తే, `--stop-timeout 40`ను అలాగే ఉంచండి.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** సాధారణ/రైట్కు ముందు చేసే బ్యాకప్లు బాహ్యంగా నిర్వహించబడితే దీన్ని `true`గా సెట్ చేయండి. ఇప్పటికే ఉన్న database మైగ్రేషన్లకు ఇప్పటికీ వాటి స్వంత మన్నికైన భద్రతా snapshot మరియు సామూహిక మైగ్రేషన్ guard అవసరం.
- **డేటా నిలకడ:** కంటైనర్ రీస్టార్ట్ల మధ్య మీ database, keys మరియు configurationsను నిలిపి ఉంచడానికి ఎల్లప్పుడూ `/app/data`కు volumeను mount చేయండి.
- **పోర్ట్ కాన్ఫిగరేషన్:** డిఫాల్ట్ `20128` పోర్ట్ను మార్చడానికి `PORT` environment variableను override చేయండి.

## ఇవి కూడా చూడండి

- [VM డిప్లాయ్మెంట్ గైడ్](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare సెటప్
- [Fly.io డిప్లాయ్మెంట్ గైడ్](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.ioకు డిప్లాయ్ చేయండి
- [ఎన్విరాన్మెంట్ కాన్ఫిగ్](../reference/ENVIRONMENT.md) — పూర్తి `.env` రిఫరెన్స్
