# 🐳 Docker Guide — OmniRoute (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> పూర్తి Docker డిప్లాయ్మెంట్ సూచన. త్వరగా ప్రారంభించడానికి, [README Docker విభాగం](../README.md#-docker) చూడండి.

## విషయ సూచిక

- [త్వరిత అమలు](#quick-run)
- [ఎన్విరాన్మెంట్ ఫైల్తో](#with-environment-file)
- [Docker Compose](#docker-compose)
- [అందుబాటులో ఉన్న ప్రొఫైల్లు](#available-profiles)
- [OmniRoute Dockerలో నడుస్తున్నప్పుడు హోస్ట్ CLI సాధనాలను కాన్ఫిగర్ చేయడం](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [ప్రొడక్షన్ Compose](#production-compose)
- [Dockerfile దశలు](#dockerfile-stages)
- [కీలకమైన ఎన్విరాన్మెంట్ వేరియబుల్స్](#critical-environment-variables)
- [Caddy (HTTPS)తో Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [ఇమేజ్ ట్యాగ్లు](#image-tags)
- [లభ్యత: డిఫాల్ట్ SQLite ఒకే రెప్లికాకు పరిమితం](#availability-default-sqlite-is-single-replica)
- [ముఖ్యమైన గమనికలు](#important-notes)

---

## త్వరిత అమలు

> **ఒకే కమాండ్తో స్వయంగా హోస్ట్ చేయాలా?**
> [స్వీయ-హోస్టింగ్ మార్గదర్శిని](../getting-started/SELF_HOST_GUIDE.md) చూడండి —
> `docker compose -f docker-compose.selfhost.yml up -d` (ప్రచురించిన ఇమేజ్ +
> Redis, లూప్బ్యాక్కు మాత్రమే పరిమితం, ప్రొఫైల్ ఎంపిక లేదు). ఇప్పటికే Redisను వేరే చోట అమలు చేస్తున్న
> వినియోగదారుల కోసం దిగువన ఉన్న త్వరిత అమలు ఒకే కంటైనర్ విధానం.

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
# బేస్ ప్రొఫైల్ (CLI సాధనాలు లేవు)
docker compose --profile base up -d

# CLI ప్రొఫైల్ (Claude Code, Codex, OpenClaw అంతర్నిర్మితంగా ఉంటాయి)
docker compose --profile cli up -d

# హోస్ట్ ప్రొఫైల్ (ప్రధానంగా Linux కోసం; హోస్ట్ CLI బైనరీలను చదవడానికి మాత్రమే మౌంట్ చేస్తుంది)
docker compose --profile host up -d

# CLI + CLIProxyAPI సైడ్కార్ను కలపండి
docker compose --profile cli --profile cliproxyapi up -d
```

## అందుబాటులో ఉన్న ప్రొఫైల్లు

OmniRoute నాలుగు Compose ప్రొఫైల్లతో అందించబడుతుంది. మీ ఎన్విరాన్మెంట్కు సరిపోయేదాన్ని ఎంచుకోండి.

| ప్రొఫైల్          | సర్వీస్          | ఎప్పుడు ఉపయోగించాలి                                                                                                                                           | కమాండ్                                       |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (డిఫాల్ట్) | `omniroute-base` | హెడ్లెస్ సర్వర్ / కనిష్ఠ రన్టైమ్; ప్రొవైడర్ CLIలు బండిల్ చేయబడవు                                                                                              | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` మరియు బండిల్ చేసిన CLIలను (Codex, Claude Code, Droid, OpenClaw) పిలిచే ఏజెంటిక్ వర్క్ఫ్లోలు                                | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` మొదలైనవాటిని చదవడానికి మాత్రమే మౌంట్ చేయడం ద్వారా హోస్ట్ CLIలకు `network_mode` తరహా యాక్సెస్ కావాల్సిన Linux హోస్ట్లు | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | అప్స్ట్రీమ్ CLI ప్రాక్సీయింగ్ కోసం [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) సైడ్కార్ను `8317` పోర్ట్లో అమలు చేయండి                         | `docker compose --profile cliproxyapi up -d` |

> అనేక ప్రొఫైల్లను కలపవచ్చు: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Dockerలో నడుస్తున్నప్పుడు హోస్ట్ CLI సాధనాలను కాన్ఫిగర్ చేయడం

`omniroute setup-codex`, `setup-claude`, `config set <tool>` మరియు డ్యాష్బోర్డ్లోని
**కాన్ఫిగ్ను సేవ్ చేయి** బటన్ అన్నీ `~/.codex/*.config.toml` వంటి ఫైళ్లను వ్రాస్తాయి. ఆ పాత్లకు
CLI వాస్తవంగా నడుస్తున్న మెషీన్లో మాత్రమే అర్థం ఉంటుంది. వాటిని కంటైనర్లోపల
అమలు చేస్తే, ఫైల్ కంటైనర్కు చెందిన హోమ్లో (`/home/node` —
ఇమేజ్ `USER node`గా నడుస్తుంది) వ్రాయబడుతుంది. దాన్ని హోస్ట్ CLI ఎప్పటికీ చదవదు,
అలాగే కంటైనర్ను మళ్లీ సృష్టించిన వెంటనే అది తొలగిపోతుంది.

OmniRoute దీన్ని గుర్తించి, మీరు ఉపయోగించలేని విజయాన్ని నివేదించడానికి బదులుగా
సూచనలతో వ్రాతను తిరస్కరిస్తుంది: CLI `2` కోడ్తో నిష్క్రమిస్తుంది మరియు API
`containerEphemeralTarget: true`తో `422` ప్రతిస్పందన ఇస్తుంది.

### సిఫార్సు చేయబడింది: CLIని హోస్ట్లో, OmniRouteని Dockerలో అమలు చేయండి

కంటైనర్ APIని అందిస్తుంది; CLI మీ హోస్ట్ సాధనాలను కాన్ఫిగర్ చేస్తుంది.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLIని కంటైనర్ వైపు మళ్లించండి
omniroute setup-codex                      # మీ హోస్ట్లోని నిజమైన ~/.codexలో వ్రాస్తుంది
```

Codex, Claude Code, Cursor లేదా ఇలాంటి సాధనాలు మీ ల్యాప్టాప్లో నడుస్తున్నప్పుడు
ఇదే సరైన ఎంపిక — సాధారణంగా ఉండే సెటప్ ఇదే.

### ప్రత్యామ్నాయం: హోస్ట్ కాన్ఫిగ్ డైరెక్టరీలను bind-mount చేయండి (`host` ప్రొఫైల్)

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

పాత్ను విశ్వసనీయంగా చేసేది bind mount: OmniRoute
`/proc/self/mountinfo`ను చదివి, మౌంట్ చేసిన పాత్లలో వ్రాయడానికి అనుమతిస్తుంది (అలాగే
చైల్డ్ డైరెక్టరీలు మౌంట్లుగా ఉన్న డైరెక్టరీలకూ అనుమతిస్తుంది; పైన ఉన్న `/host-home` నిర్మాణం
సరిగ్గా అలాంటిదే), అదే సమయంలో మౌంట్ చేయని పాత్లను తిరస్కరిస్తూనే ఉంటుంది.

### అత్యవసర ప్రత్యామ్నాయం: కంటైనర్కు చెందిన CLIలను కాన్ఫిగర్ చేయండి (పరిమితంగా ఉపయోగించండి)

CLIలు నిజంగానే కంటైనర్లోపల ఉన్నప్పుడు (`cli` ప్రొఫైల్), ఆ వ్రాత
ఉద్దేశపూర్వకమైనదే. ఏదైనా `setup-*` కమాండ్కు `--allow-container-write`ను పాస్ చేయండి, లేదా సర్వర్ కోసం
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`ను సెట్ చేయండి. ఈ వ్రాత కంటైనర్ తొలగిన తర్వాత
నిలిచి ఉండదనే హెచ్చరికతో కొనసాగుతుంది.

> **భద్రతా హెచ్చరిక — `cli` ప్రొఫైల్ + `docker.sock` మౌంట్.**
> కంటైనర్లోని ఆటో-అప్డేటర్ హోస్ట్ డీమన్ ద్వారా స్టాక్ను మళ్లీ సృష్టించగలిగేలా
> `cli` ప్రొఫైల్ `/var/run/docker.sock`ను bind-mount చేస్తుంది
> (`src/lib/system/autoUpdate.ts` ఆ సాకెట్ కోసం తనిఖీ చేసి, అది లేనప్పుడు
> Docker పాత్ను దాటవేస్తుంది). ఆ సాకెట్ **హోస్ట్-root విశ్వసనీయత
> సరిహద్దు**: దాన్ని యాక్సెస్ చేయగల ఏదైనా హోస్ట్ Docker డీమన్ను
> rootగా నియంత్రించగలదు — అది హోస్ట్లోని ఏ కంటైనర్నైనా సృష్టించగలదు, పరిశీలించగలదు,
> ఆపగలదు మరియు తొలగించగలదు. పర్యవసానాలు:
>
> 1. **`cli` ప్రొఫైల్ పోర్ట్ను ఎప్పుడూ నెట్వర్క్కు బహిర్గతం చేయవద్దు.** దాన్ని
>    `127.0.0.1`లో ప్రచురించండి (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN ద్వారా చేరుకోగల `cli` ప్రొఫైల్ ఏ డ్యాష్బోర్డ్-స్థాయి RCEనైనా
>    పూర్తి హోస్ట్ స్వాధీనంగా మారుస్తుంది.
> 2. **`cli` ప్రొఫైల్లో అదనపు హోస్ట్ డైరెక్టరీలను bind చేయవద్దు.**
>    Docker సాకెట్తో పాటు ఏదైనా అదనపు మౌంట్ ఉంటే, అది కంటైనర్కు మీ ఫైల్సిస్టమ్
>    మరియు హోస్ట్ కాన్ఫిగ్పై పూర్తి చదవడం/వ్రాయడం అనుమతిని ఇస్తుంది. ఒక సాధనం
>    ప్రాజెక్ట్ను చూడాల్సి ఉంటే, దాన్ని CLI బైనరీతో స్థానికంగా అమలు చేయండి —
>    దాన్ని `cli` కంటైనర్లోకి మౌంట్ చేయవద్దు.
>
> మీకు కంటైనర్లో ఆటో-అప్డేట్ అవసరం లేకపోతే, `cli` ప్రొఫైల్ను ఆఫ్లోనే ఉంచండి
> (`COMPOSE_PROFILES=core,redis` లేదా ఇంకా సంక్షిప్తంగా). ఇతర ప్రొఫైళ్లు
> Docker సాకెట్ను మౌంట్ చేయవు.
>
> MITMకు సంబంధించిన ముప్పు నమూనా కోసం `docs/security/MITM-TPROXY-DECRYPT.md`ను చూడండి (gitలో ఉంది; `/docs`లోకి కంపైల్ చేయబడదు),
> అలాగే `codex`/`claude-code`/`droid`/`openclaw` బైనరీ మూలాధార శ్రేణి కోసం
> `docs/security/SUPPLY_CHAIN.md`ను చూడండి.

## Redis సైడ్కార్

పంపిణీ చేయబడిన రేట్ లిమిటర్ మరియు షేర్డ్ క్యాష్కు మద్దతు ఇవ్వడానికి OmniRoute, Redisపై ఆధారపడుతుంది. `docker-compose.yml`లో `redis` సర్వీస్ **ఎల్లప్పుడూ నిర్వచించబడి ఉంటుంది** (దీనికి ప్రొఫైల్ గేట్ లేదు) మరియు ఇతర ఏ ప్రొఫైల్తోనైనా పాటు ప్రారంభమవుతుంది.

| వివరాలు                  | విలువ                                      |
| ------------------------ | ------------------------------------------ |
| ఇమేజ్                    | `redis:7-alpine`                           |
| కంటైనర్ పేరు             | `omniroute-redis`                          |
| అంతర్గత పోర్ట్           | `6379`                                     |
| హోస్ట్ పోర్ట్ (ఓవర్రైడ్) | `REDIS_PORT` (డిఫాల్ట్గా `6379`)           |
| హోస్ట్ బైండ్ (ఓవర్రైడ్)  | `REDIS_BIND_HOST` (డిఫాల్ట్గా `127.0.0.1`) |
| వాల్యూమ్                 | `omniroute-redis-data` → `/data`           |
| హెల్త్చెక్               | `redis-cli ping` (10s విరామం)              |

సంబంధిత ఎన్విరాన్మెంట్ వేరియబుల్స్:

- `REDIS_URL` — యాప్లోకి ఇంజెక్ట్ చేయబడే కనెక్షన్ స్ట్రింగ్ (డిఫాల్ట్గా `redis://redis:6379`).
- `REDIS_PORT` — Redis కంటైనర్ కోసం హోస్ట్-సైడ్ పోర్ట్ మ్యాపింగ్.
- `REDIS_BIND_HOST` — పోర్ట్ ప్రచురించబడే హోస్ట్ ఇంటర్ఫేస్. డిఫాల్ట్గా `127.0.0.1`.

> **డిఫాల్ట్గా లూప్బ్యాక్ ఎందుకు:** సైడ్కార్ `requirepass` లేకుండా రన్ అవుతుంది, మరియు యాప్
> కంటైనర్లు compose నెట్వర్క్ (`redis:6379`) ద్వారా దానిని చేరుకుంటాయి — ప్రచురించిన పోర్ట్
> హోస్ట్-సైడ్ టూలింగ్ (`redis-cli`, స్థానిక `npm run dev`) కోసం మాత్రమే ఉంటుంది. `0.0.0.0`పై
> ప్రచురించడం వలన ప్రామాణీకరణ లేని Redis మీ LANలోని ప్రతి హోస్ట్కు బహిర్గతమవుతుంది. మీరు
> `REDIS_BIND_HOST=0.0.0.0`ను సెట్ చేస్తే, సర్వీస్ `command:`కు `--requirepass`ను కూడా జోడించండి.

**Redisను నిలిపివేయడం** సిఫార్సు చేయబడదు (రేట్ లిమిటర్ ఇన్-మెమరీ ఫాల్బ్యాక్కు దిగజారుతుంది). తప్పనిసరి అయితే, `docker-compose.yml`లోని `redis:` సర్వీస్ బ్లాక్ను తొలగించండి/కామెంట్ చేయండి లేదా దానిని సున్నాకు స్కేల్ చేయండి:

```bash
docker compose up -d --scale redis=0
```

## ప్రొడక్షన్ Compose

డెవ్తో పాటు రన్ అయ్యే వివిక్త ప్రొడక్షన్ స్నాప్షాట్ కోసం, `docker-compose.prod.yml`ను ఉపయోగించండి.

| వివరాలు                      | విలువ                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| ఫైల్                         | `docker-compose.prod.yml`                                                                   |
| డిఫాల్ట్ డ్యాష్బోర్డ్ పోర్ట్ | `PROD_DASHBOARD_PORT=20130` (అంతర్గత `${DASHBOARD_PORT:-20128}`కు మ్యాప్ చేయబడింది)         |
| డిఫాల్ట్ API పోర్ట్          | `PROD_API_PORT=20131`                                                                       |
| ఇమేజ్                        | `omniroute:prod` (`runner-cli` టార్గెట్ నుండి బిల్డ్ చేయబడింది)                             |
| Redis కంటైనర్                | `omniroute-redis-prod` (`redis:8.6.2`, ప్రత్యేక `redis-prod-data` వాల్యూమ్)                 |
| డేటా వాల్యూమ్                | `omniroute-prod-data` (పేరుతో కూడినది, రీబిల్డ్ల మధ్య కొనసాగుతుంది)                         |
| హెల్త్చెక్లు                 | `node healthcheck.mjs` + `redis-cli ping`, Redis హెల్త్ ఆధారంగా గేట్ చేయబడిన `depends_on`తో |

ఉపయోగించే విధానం:

```bash
# ప్రొడక్షన్ స్టాక్ను బిల్డ్ చేసి ప్రారంభించండి
docker compose -f docker-compose.prod.yml up -d --build

# లాగ్లను స్ట్రీమ్ చేయండి
docker compose -f docker-compose.prod.yml logs -f

# నిలిపివేయండి (వాల్యూమ్లను అలాగే ఉంచండి)
docker compose -f docker-compose.prod.yml down
```

ప్రొడ్ స్టాక్, డెవ్ composeకు సమాంతరంగా రన్ అవుతుంది (వేర్వేరు కంటైనర్ పేర్లు, పోర్ట్లు మరియు వాల్యూమ్లు), కాబట్టి ప్రొడక్షన్ రన్ అవుతూనే మీరు లోకల్గా అభివృద్ధిని కొనసాగించవచ్చు.

## Dockerfile దశలు

ఈ రిపోజిటరీ బహుళ-దశల Dockerfile (`Dockerfile`)తో వస్తుంది. మూడు దశలు అందుబాటులో ఉన్నాయి; మీ వినియోగ సందర్భానికి సరైన `target`ను ఎంచుకోండి.

| దశ            | బేస్ ఇమేజ్            | ఉద్దేశ్యం                                                                                                                                                                                |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | డిపెండెన్సీలను ఇన్స్టాల్ చేస్తుంది (`npm ci --legacy-peer-deps`) మరియు `npm run build`ను అమలు చేస్తుంది (డిఫాల్ట్గా Turbopack — దిగువన ఉన్న బిల్డ్-సమయ వనరులను చూడండి)                   |
| `runner-base` | `node:26-trixie-slim` | Next.js స్వతంత్ర అవుట్పుట్తో కూడిన ప్రొడక్షన్ రన్టైమ్. **ఎలాంటి ప్రొవైడర్ CLIలు బండిల్ చేయబడవు.**                                                                                        |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` మరియు గ్లోబల్ CLIలను జోడిస్తుంది: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **ఏజెంటిక్ వర్క్ఫ్లోల కోసం దీన్ని ఎంచుకోండి.** |

నిర్దిష్ట టార్గెట్ను మాన్యువల్గా బిల్డ్ చేయండి:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### బిల్డ్-సమయ వనరులు

`builder` దశ వినియోగించే వనరులను మూడు బిల్డ్ ఆర్గ్యుమెంట్లు నియంత్రిస్తాయి. అవి బిల్డ్ సమయంలో మాత్రమే వర్తిస్తాయి —
`OMNIROUTE_MEMORY_MB` (దిగువన) ఒక ప్రత్యేకమైన రన్టైమ్ నియంత్రణ.

| బిల్డ్ ఆర్గ్యుమెంట్         | డిఫాల్ట్ | ప్రభావం                                                                                                 |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`      | `0` అయితే బదులుగా webpackతో బిల్డ్ చేస్తుంది. గరిష్ఠ మెమరీ వినియోగం తక్కువగా, వేగం నెమ్మదిగా ఉంటుంది.   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | ప్రారంభించబడిన `next build` కోసం V8 హీప్ పరిమితి (`--max-old-space-size`).                              |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL`కు విలువను అందిస్తుంది; పేజీ-డేటా సేకరణ కోసం Next `workers = N - 1`ను లెక్కిస్తుంది. |

పెద్ద బిల్డర్లో పెంచాల్సింది `OMNIROUTE_BUILD_WORKERS`; పరిమిత వనరులున్న బిల్డ్
`✓ Compiled successfully` **తర్వాత** విఫలమైతే ముందుగా అనుమానించాల్సింది కూడా ఇదే. ప్రతి
పేజీ-డేటా వర్కర్ ఒక ప్రత్యేక ప్రాసెస్, అలాగే పేరెంట్ `next build` కూడా;
ప్రత్యక్ష VPS పునరుత్పత్తిలో (issue #7518), `NODE_OPTIONS` హీప్ ఫ్లాగ్తో సంబంధం లేకుండా
ప్రతి ప్రాసెస్ గరిష్ఠ RSS ~4.5 GBగా నమోదైంది (Turbopack, V8 హీప్ వెలుపల ఉన్న
నేటివ్/Rust మెమరీలో కంపైల్ చేస్తుంది). `2` డిఫాల్ట్ (→ 1 వర్కర్, మొత్తం 2
ప్రాసెస్లు) ప్రచురణ పైప్లైన్ ఉపయోగించే 16 GB / 4 vCPU GitHub-హోస్టెడ్ రన్నర్లకు
సరిపోయేలా నిర్ణయించబడింది. `8` వద్ద (→ 7 వర్కర్లు), ఆ రన్నర్లో మెమరీ అయిపోయి,
buildkit `ResourceExhausted: ... cannot allocate memory`తో ఆ దశను విఫలం చేసింది;
ప్రతి ప్రాసెస్ RSSను పరోక్షంగా అంచనా వేయకుండా నేరుగా కొలిచినప్పుడు `3` (→ 2 వర్కర్లు)
కూడా సరిపోలేదు. `tests/unit/docker-build-memory-budget.test.ts`
కొలిచిన విలువ ఆధారంగా గణన చేసి, ఏ నియంత్రణ అయినా రన్నర్ సామర్థ్యాన్ని
మించితే విఫలమవుతుంది.

Turbopack, V8 హీప్కు **వెలుపల** ఉండే నేటివ్ Rust మెమరీలో కంపైల్ చేస్తుంది, కాబట్టి
`OMNIROUTE_BUILD_MEMORY_MB` దానిని పరిమితం చేయదు. మెమరీ పరిమితి ఉన్న హోస్ట్లో,
ఎలాంటి ఎర్రర్ టెక్స్ట్ లేకుండానే OOM కిల్లర్ బిల్డ్ను SIGKILL చేస్తుంది — అది
`Creating an optimized production build` మధ్యలోనే ఆగిపోతుంది; అందువల్ల మెమరీ
అయిపోయినట్లుగా కాకుండా నిలిచిపోయినట్లుగా కనిపిస్తుంది. బిల్డ్ హోస్ట్కు వనరుల పరిమితి ఉంటే, బండ్లర్లను మార్చండి:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` ప్రారంభించబడి ఉంటుంది, కాబట్టి `next build` ఒక పేరెంట్ **మరియు** ఒక వర్కర్
ప్రాసెస్ను అమలు చేస్తుంది; ప్రతి ప్రాసెస్ `OMNIROUTE_BUILD_MEMORY_MB`ను విడివిడిగా పాటిస్తుంది. కంటైనర్
పరిమితిని ఆ విలువకు ఒక్క రెట్టు కాకుండా, దాదాపు రెండు రెట్ల కంటే ఎక్కువగా నిర్ణయించండి.

ఈ ట్రీపై కొలిచిన ఫలితాలు (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| బండ్లర్   | కంటైనర్ పరిమితి | ఫలితం                                                         |
| --------- | --------------- | ------------------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | రెండింటిలోనూ ఎలాంటి సందేశం లేకుండా OOM ద్వారా నిలిపివేయబడింది |
| webpack   | 8 GiB           | బిల్డ్ వర్కర్ SIGKILL చేయబడింది                               |
| webpack   | 12 GiB          | విజయవంతమైంది, గరిష్ఠంగా 11.1 GiBకు చేరింది                    |

### రన్టైమ్ డిఫాల్ట్లు

`runner-base` ఎక్స్పోర్ట్ చేసే డిఫాల్ట్లు: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Dockerలో మెమరీ ప్రవర్తన:

- ఇమేజ్ `OMNIROUTE_MEMORY_MB=1024`ను సెట్ చేసి, దాని నుంచి `NODE_OPTIONS=--max-old-space-size=1024`ను ఉత్పన్నం చేస్తుంది.
- అసలు సర్వర్ ప్రాసెస్ స్వతంత్ర లాంచర్ ద్వారా ప్రారంభించబడుతుంది; అది `OMNIROUTE_MEMORY_MB`ను చదివి `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`ను జోడిస్తుంది.
- పునరావృతమైన `--max-old-space-size` విలువల్లో చివరిదాన్ని Node ఉపయోగిస్తుంది, కాబట్టి `OMNIROUTE_MEMORY_MB`ను సెట్ చేయడం ద్వారా ప్రభావవంతమైన Docker హీప్ పరిమితి నియంత్రించబడుతుంది.
- ఇమేజ్ దీన్ని ఎల్లప్పుడూ సెట్ చేస్తుంది కాబట్టి, లాంచర్కు చెందిన RAM-ఆధారిత ఫాల్బ్యాక్ Dockerలో ఎప్పుడూ వర్తించదు. వర్క్లోడ్కు అనుగుణంగా దాన్ని స్పష్టంగా పెంచండి (దిగువ పట్టిక). కోడింగ్-ఏజెంట్ `/v1/responses` కోసం `2048` కూడా ఇంకా చాలా తక్కువే.

### కోడింగ్ ఏజెంట్ల కోసం రన్టైమ్ RAM

1 GiB Docker డిఫాల్ట్ అనేది డాష్బోర్డ్/తేలికపాటి చాట్కు కనీస స్థాయి మాత్రమే, ప్రొడక్షన్ పరిమాణం కాదు. పొడవైన `POST /v1/responses` బాడీలు (వందల సందేశాలు, పదుల సంఖ్యలో టూల్స్) కంప్రెషన్ సమయంలో అనేక ఇన్-మెమరీ గ్రాఫ్లను నిలుపుకుంటాయి. ఒకే సమయంలో నడిచిన సుమారు ~3 MiB / ~750k-టోకెన్ల రెండు అభ్యర్థనలు **12 GiB** old-space వద్ద V8ను అబార్ట్ చేశాయి (`FATAL ERROR: Reached heap limit`), అలాగే 16 GiB cgroup OOM పరిమితిని కూడా తాకాయి. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) చూడండి.

**cgroup `--memory`ను హీప్ కంటే ఎక్కువగా** నిర్ణయించండి — నేటివ్ బఫర్లు, SQLite మరియు కంప్రెషన్ మధ్యంతర డేటా V8 వెలుపల ఉంటాయి.

| పనిభారం                               | `OMNIROUTE_MEMORY_MB`   | కంటైనర్ / cgroup               | గమనికలు                                                                                                                    |
| ------------------------------------- | ----------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| డ్యాష్బోర్డ్, ఒక తేలికపాటి చాట్       | `1024` (ఇమేజ్ డిఫాల్ట్) | ≥2 GiB                         |                                                                                                                            |
| ఒక కోడింగ్ ఏజెంట్ (Claude/Codex/Grok) | `8192`                  | ≥10 GiB                        | సాధారణ సింగిల్-సెషన్ `/v1/responses`                                                                                       |
| ఏకకాలంలో రెండు దీర్ఘ `/v1/responses`  | `10240`–`12288`         | ≥12–16 GiB                     | ~12 GiB హీప్ వద్ద V8 అబార్ట్ నమోదైంది                                                                                      |
| ఏకకాలంలో మూడు+ దీర్ఘ కాంటెక్స్ట్లు    | ఒక ప్రాసెస్లో చేయవద్దు  | వరుసగా అమలు చేయండి / మరింత RAM | డిఫాల్ట్ హెవీవెయిట్ అడ్మిషన్లో ఒకేసారి 1 మాత్రమే ప్రాసెస్లో ఉంటుంది; RAM లేకుండా దీన్ని పెంచితే అబార్ట్ మళ్లీ సంభవిస్తుంది |

బేర్ మెటల్పై `OMNIROUTE_MEMORY_MB` **సెట్ చేయనప్పుడు**, `omniroute serve` RAMలో ~35% మేరకు (`[512, 4096]` పరిమితుల్లో) కాలిబ్రేట్ చేస్తుంది. Docker ఎల్లప్పుడూ `1024`ని సెట్ చేస్తుంది, కాబట్టి అధికారిక ఇమేజ్లో ఆ కాలిబ్రేషన్ ఎప్పుడూ అమలు కాదు.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## కీలక పర్యావరణ వేరియబుల్స్

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)లో డాక్యుమెంట్ చేసిన డిఫాల్ట్లతో పాటు, Docker కింద రన్ చేస్తున్నప్పుడు కింది వేరియబుల్స్ అత్యంత ముఖ్యమైనవి:

| వేరియబుల్                     | ప్రయోజనం                                                                                                                                                                                                                                                                                         | డిఫాల్ట్                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket బ్రిడ్జ్ కోసం షేర్డ్ సీక్రెట్. **ప్రొడక్షన్లో తప్పనిసరి** — దీన్ని బలమైన యాదృచ్ఛిక స్ట్రింగ్గా సెట్ చేయండి.                                                                                                                                                                            | సెట్ చేయబడలేదు (తప్పనిసరిగా అందించాలి) |
| `REDIS_URL`                   | రేట్ లిమిటర్ / క్యాష్ బ్యాకెండ్ కోసం కనెక్షన్ స్ట్రింగ్                                                                                                                                                                                                                                          | `redis://redis:6379`                   |
| `REDIS_PORT`                  | బండిల్ చేసిన Redis కంటైనర్ కోసం హోస్ట్-సైడ్ పోర్ట్                                                                                                                                                                                                                                               | `6379`                                 |
| `REDIS_BIND_HOST`             | బండిల్ చేసిన Redis పోర్ట్ ప్రచురించబడే హోస్ట్ ఇంటర్ఫేస్ (మీరు AUTH జోడించకపోతే లూప్బ్యాక్)                                                                                                                                                                                                       | `127.0.0.1`                            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | స్వీయ-అప్డేట్ వర్క్ఫ్లోల కోసం `cli` ప్రొఫైల్లో `/workspace/omniroute` వద్ద మౌంట్ చేయబడే హోస్ట్ పాత్                                                                                                                                                                                              | `.` (ప్రస్తుత డైరెక్టరీ)               |
| `OMNIROUTE_MEMORY_MB`         | Docker స్వతంత్ర సర్వర్ కోసం రన్టైమ్ Node హీప్ గరిష్ఠ పరిమితి; పైన పేర్కొన్న ఇమేజ్ డిఫాల్ట్ను ఓవర్రైడ్ చేస్తుంది. కోడింగ్ ఏజెంట్లు: `8192`+ ([రన్టైమ్ RAM](#runtime-ram-for-coding-agents) చూడండి).                                                                                               | `1024`                                 |
| `DASHBOARD_PORT` / `API_PORT` | డ్యాష్బోర్డ్ (20128) మరియు API (20129) కోసం బహిర్గతం చేసిన పోర్ట్లను ఓవర్రైడ్ చేస్తుంది                                                                                                                                                                                                          | `20128` / `20129`                      |
| `APP_BIND_HOST`               | docker-compose డ్యాష్బోర్డ్/API/live-WS పోర్ట్లను ప్రచురించే హోస్ట్ ఇంటర్ఫేస్. `REQUIRE_API_KEY=false` (డిఫాల్ట్) ఉన్నప్పుడు, `0.0.0.0` అనామక `/v1` ప్రాక్సీని LANకు బహిర్గతం చేస్తుంది — `REQUIRE_API_KEY=true` ఉన్నప్పుడు లేదా ముందు రివర్స్ ప్రాక్సీ ఉన్నప్పుడు మాత్రమే పరిధిని విస్తరించండి. | `127.0.0.1`                            |
| `CLIPROXY_BIND_HOST`          | docker-compose `cliproxyapi` సైడ్కార్ను ప్రచురించే హోస్ట్ ఇంటర్ఫేస్ — దాని డేటా వాల్యూమ్ ప్రొవైడర్ క్రెడెన్షియల్స్ను కలిగి ఉంటుంది.                                                                                                                                                              | `127.0.0.1`                            |
| `OMNIROUTE_PLUGINS_DIR`       | రన్టైమ్ ప్లగిన్ స్కానర్ చదివి, ఇన్స్టాల్ చేసే డైరెక్టరీ. ప్లగిన్లు బైండ్-మౌంట్ చేయబడినప్పుడు దీన్ని సెట్ చేయండి: డిఫాల్ట్ `HOME`ను అనుసరిస్తుంది, అయితే ఇమేజ్ దాన్ని ఎక్స్పోర్ట్ చేయాల్సిన అవసరం లేదు.                                                                                           | `~/.omniroute/plugins`                 |
| `OMNIROUTE_BASE_PATH`         | యాప్ రివర్స్ ప్రాక్సీ వెనుక ప్రచురించబడినప్పుడు ఉపయోగించే URL సబ్పాత్ (ఉదా. `/omniroute`)                                                                                                                                                                                                        | _(ఖాళీ = రూట్)_                        |
| `NEXT_PUBLIC_BASE_URL`        | సబ్పాత్తో సహా పబ్లిక్ బ్రౌజర్ ఒరిజిన్ (ఉదా. `https://host/omniroute`)                                                                                                                                                                                                                            | సెట్ చేయబడలేదు                         |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` కోసం హోస్ట్-సైడ్ డ్యాష్బోర్డ్ పోర్ట్                                                                                                                                                                                                                                   | `20130`                                |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` సైడ్కార్ కోసం హోస్ట్-సైడ్ పోర్ట్                                                                                                                                                                                                                                                   | `8317`                                 |

## ఉపమార్గంలో రివర్స్ ప్రాక్సీ (Traefik / nginx)

Next.js `basePath` స్వతంత్ర బండిల్లో కంపైల్ చేయబడుతుంది. OmniRoute యాప్ రూట్లోని ఒక సెంటినెల్ ఫైల్లో నిర్మాణ సమయంలో పొందుపరిచిన విలువను నమోదు చేస్తుంది (`npm run build` సమయంలో వ్రాయబడుతుంది; `scripts/docker/ensure-docker-base-path.mjs` ద్వారా చదవబడుతుంది) మరియు కంటైనర్ ప్రారంభమైనప్పుడు దాన్ని `OMNIROUTE_BASE_PATH`తో పోలుస్తుంది. అవి భిన్నంగా ఉండి, ఇమేజ్ డొమైన్ రూట్ కోసం నిర్మించబడి ఉంటే, `node dev/run-standalone.mjs` అమలయ్యే ముందు ఎంట్రీపాయింట్ స్వతంత్ర మానిఫెస్ట్లను, పొందుపరిచిన `basePath`/`assetPrefix` లిటరల్లను (Next 16 కేవలం `assetPrefix` నుంచే SSR అసెట్ URLలను రెండర్ చేస్తుంది — ప్యాచర్ ఉపమార్గాన్ని దానిలోనూ ప్రతిబింబిస్తుంది), నిర్మాణంలో పొందుపరిచిన `/_next/static` అసెట్ URLలను (క్లయింట్-రిఫరెన్స్ మానిఫెస్ట్లు, మీడియా ఇంపోర్ట్లు, ముందుగా రెండర్ చేసిన ఎర్రర్ పేజీలు), అలాగే క్లయింట్ `process.env` షిమ్ను తిరిగి వ్రాస్తుంది.

### Compose బిల్డ్ (సిఫార్సు చేయబడింది)

ఇమేజ్ మరియు రన్టైమ్ ఒకే విలువలను ఉపయోగించేలా `.env`లో రెండు వేరియబుల్లనూ సెట్ చేసి, ఆపై మళ్లీ బిల్డ్ చేయండి:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`ను Docker బిల్డ్ ఆర్గ్యుమెంట్గా మరియు రన్టైమ్ ఎన్విరాన్మెంట్ వేరియబుల్గా ఫార్వర్డ్ చేస్తుంది.

### ముందుగా నిర్మించిన రూట్ ఇమేజ్ + రన్టైమ్ ఉపమార్గం

ప్రచురించబడిన `diegosouzapw/omniroute:*` ఇమేజ్లు డొమైన్ రూట్ కోసం నిర్మించబడ్డాయి. అయినప్పటికీ మీరు రన్టైమ్లో `OMNIROUTE_BASE_PATH`ను సెట్ చేయవచ్చు; కంటైనర్ ప్రారంభ సమయంలో బండిల్ను ఒకసారి ప్యాచ్ చేస్తుంది. దాన్ని సరిపోలే పబ్లిక్ ఒరిజిన్తో జత చేయండి:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**పూర్తి** బాహ్య మార్గాన్ని ఫార్వర్డ్ చేసేలా రివర్స్ ప్రాక్సీని కాన్ఫిగర్ చేయండి (ప్రిఫిక్స్ను తొలగించవద్దు). Traefik, `StripPrefix` లేకుండా `PathPrefix(`/omniroute`)`ను కంటైనర్కు రూట్ చేయాలి, తద్వారా Next.jsకు `/omniroute/...` అందుతుంది మరియు అది `/omniroute/_next/...` నుంచి అసెట్లను అందిస్తుంది.

Docker హెల్త్చెక్, సక్రియ `OMNIROUTE_BASE_PATH` ప్రిఫిక్స్తో తేలికపాటి `/healthz` లైఫ్సైకిల్ ఎండ్పాయింట్ను ప్రోబ్ చేస్తుంది. మానవ/డ్యాష్బోర్డ్ డయాగ్నస్టిక్స్ కోసం `/api/monitoring/health` అందుబాటులోనే ఉంటుంది; కంటైనర్ HEALTHCHECKను తిరిగి దానివైపు మళ్లించడానికి (ఉదాహరణకు, లోతైన ఆరోగ్య స్థితి అమలు కోసం), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`ను సెట్ చేయండి. ఆ మార్గం ఒక **లోతైన** తనిఖీ (DB + మానిటరింగ్ సారాంశం) — మీరు మళ్లీ దాన్ని ఎంచుకుంటే, Docker అరుదుగా నిర్వహించే `HEALTHCHECK`కు ఇది సముచితం, కానీ Kubernetes `livenessProbe` విరామాలకు **కాదు**.

ఆర్కెస్ట్రేటర్ల కోసం (Kubernetes, Nomad మొదలైనవి):

| ప్రోబ్               | ప్రాధాన్యం ఇవ్వండి                                                     | నివారించండి                                                       |
| -------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| లైవ్నెస్             | HTTP `GET /livez`, లేదా ప్రధాన పోర్ట్లో TCP (`PORT`, డిఫాల్ట్ `20128`) | లైవ్నెస్గా `/api/monitoring/health`                               |
| రెడీనెస్             | HTTP `GET /healthz`                                                    | ఈవెంట్-లూప్ బిజీగా ఉండటాన్ని డెడ్గా పరిగణించే కఠినమైన టైమ్అవుట్లు |
| లోతైన / బ్లాక్బాక్స్ | `/api/monitoring/health`                                               | —                                                                 |

`/healthz` ప్రాసెస్ లైఫ్సైకిల్ను (`ok` / `starting` / `stopping`) నివేదిస్తుంది. `/livez` కేవలం ప్రాసెస్ సజీవంగా ఉందో లేదో మాత్రమే సూచిస్తుంది (హ్యాండ్లర్ అమలు కాగలిగినప్పుడల్లా 200; ఇది రెడీనెస్ కోసం వేచి ఉండదు). రెండూ ఇప్పటికీ రిక్వెస్ట్ హ్యాండ్లింగ్కు ఉపయోగించే అదే Node ఈవెంట్ లూప్లో అమలవుతాయి, కాబట్టి CPU-బౌండ్ కేటలాగ్ లేదా కంప్రెషన్ పని వాటిని ఆలస్యం చేయవచ్చు — బిజీ ≠ డెడ్. HTTP ప్రోబ్లు టైమ్అవుట్ అయితే TCP లైవ్నెస్కు ప్రాధాన్యం ఇవ్వండి. పూర్తి ప్రోబ్ మార్గదర్శకం:
[మానిటరింగ్ గైడ్ — Kubernetes ప్రోబ్ సిఫార్సులు](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddyతో Docker Compose (HTTPS Auto-TLS)

Caddy యొక్క ఆటోమేటిక్ SSL ప్రొవిజనింగ్ను ఉపయోగించి OmniRouteను సురక్షితంగా అందుబాటులో ఉంచవచ్చు. మీ డొమైన్ యొక్క DNS A రికార్డ్ మీ సర్వర్ IPని సూచిస్తోందని నిర్ధారించుకోండి.

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
      # OAuth కాల్బ్యాక్లు, డ్యాష్బోర్డ్ లింక్లు మరియు జనరేట్ చేసిన పబ్లిక్ URLల కోసం బ్రౌజర్కు కనిపించే మూలం.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # షెడ్యూల్ చేసిన జాబ్లు / స్వీయ-ఫెచ్ల కోసం అంతర్గత సర్వర్-టు-సర్వర్ URL.
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

అప్స్ట్రీమ్ కంటైనర్ కోసం Caddy ప్రామాణిక ఫార్వార్డింగ్ హెడర్లను సెట్ చేస్తుంది. OAuth కాల్బ్యాక్లు మరియు జనరేట్ చేసిన పబ్లిక్
లింక్లకు `NEXT_PUBLIC_BASE_URL`ను ప్రామాణిక పబ్లిక్ మూలంగా OmniRoute ఉపయోగిస్తుంది; ప్రామాణీకరించిన డ్యాష్బోర్డ్ రైట్లు అదే-మూలం అభ్యర్థనలతో పాటు సెషన్కు అనుసంధానమైన CSRF
రక్షణను ఉపయోగిస్తాయి. స్పష్టమైన కాన్ఫిగరేషన్కు బదులుగా విశ్వసనీయ ఫార్వార్డెడ్ హెడర్ల నుండి పబ్లిక్ మూలాన్ని OmniRoute ఉద్దేశపూర్వకంగా
నిర్ణయించాలని మీరు కోరుకునే అధునాతన డిప్లాయ్మెంట్ల కోసం మాత్రమే `OMNIROUTE_TRUST_PROXY`ని ప్రారంభించండి.

## Cloudflare Quick Tunnel

Docker డిప్లాయ్మెంట్ల కోసం డ్యాష్బోర్డ్ మద్దతులో `Dashboard → Endpoints` వద్ద ఒకే క్లిక్తో ఉపయోగించగల **Cloudflare Quick Tunnel** ఉంటుంది. మొదటిసారి ప్రారంభించినప్పుడు, అవసరమైనప్పుడు మాత్రమే `cloudflared`ను డౌన్లోడ్ చేసి, మీ ప్రస్తుత `/v1` ఎండ్పాయింట్కు తాత్కాలిక టన్నెల్ను ప్రారంభించి, జనరేట్ చేసిన `https://*.trycloudflare.com/v1` URLను మీ సాధారణ పబ్లిక్ URLకు నేరుగా దిగువన చూపిస్తుంది.

సక్రియ టన్నెల్ స్థితిని మార్చకుండానే `Settings → Appearance` నుండి ఎండ్పాయింట్ టన్నెల్ ప్యానెల్లను (Cloudflare, Tailscale, ngrok) చూపించవచ్చు లేదా దాచవచ్చు.

### టన్నెల్ గమనికలు

- Quick Tunnel URLలు తాత్కాలికమైనవి మరియు ప్రతి రీస్టార్ట్ తర్వాత మారుతాయి.
- OmniRoute లేదా కంటైనర్ రీస్టార్ట్ తర్వాత Quick Tunnelలు ఆటోమేటిక్గా పునరుద్ధరించబడవు. అవసరమైనప్పుడు వాటిని డ్యాష్బోర్డ్ నుండి మళ్లీ ప్రారంభించండి.
- మేనేజ్డ్ ఇన్స్టాల్ ప్రస్తుతం `x64` / `arm64`పై Linux, macOS మరియు Windowsకు మద్దతు ఇస్తుంది.
- పరిమిత వనరులున్న కంటైనర్ వాతావరణాల్లో అధికంగా కనిపించే QUIC UDP బఫర్ హెచ్చరికలను నివారించేందుకు, మేనేజ్డ్ Quick Tunnelలు డిఫాల్ట్గా HTTP/2 ట్రాన్స్పోర్ట్ను ఉపయోగిస్తాయి. మీకు వేరే ట్రాన్స్పోర్ట్ కావాలంటే `CLOUDFLARED_PROTOCOL=quic` లేదా `auto`ను సెట్ చేయండి.
- Docker ఇమేజ్లు సిస్టమ్ CA రూట్లను కలిగి ఉండి, వాటిని మేనేజ్డ్ `cloudflared`కు అందిస్తాయి; దీనివల్ల కంటైనర్లో టన్నెల్ బూట్స్ట్రాప్ అయినప్పుడు TLS ట్రస్ట్ వైఫల్యాలు నివారించబడతాయి.
- OmniRoute డౌన్లోడ్ చేయడానికి బదులుగా ఇప్పటికే ఉన్న బైనరీని ఉపయోగించాలని మీరు కోరుకుంటే `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`ను సెట్ చేయండి.

## ఇమేజ్ ట్యాగ్లు

| ఇమేజ్                    | ట్యాగ్   | పరిమాణం | వివరణ                                                  |
| ------------------------ | -------- | ------- | ------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | అత్యధిక **ప్రచురిత** స్థిరమైన SemVer (git `main` కాదు) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | GitOps కోసం ఈ తరహా ట్యాగ్ను పిన్ చేయండి                |

మల్టీ-ప్లాట్ఫామ్ మానిఫెస్ట్: `linux/amd64` + `linux/arm64` నేటివ్ (Apple Silicon, AWS Graviton, Raspberry Pi). సరిపోలే ఆర్కిటెక్చర్ను Docker ఆటోమేటిక్గా ఎంచుకుంటుంది; ARM హోస్ట్లపై AMD64 ఎమ్యులేషన్ను బలవంతంగా ఉపయోగించాల్సి వస్తే `--platform linux/amd64`ను పాస్ చేయండి.

### విడుదల ఛానెల్లు

స్థిరమైన విడుదలలు, సక్రియ విడుదల-బ్రాంచ్ పరీక్ష మరియు డెవలప్మెంట్ బిల్డ్ల కోసం OmniRoute వేర్వేరు Docker ఛానెల్లను ప్రచురిస్తుంది.

| ఛానెల్                          | మూలం                                   | మార్పు సామర్థ్యం           | సిఫార్సు చేసిన వినియోగం                                                                                                    |
| ------------------------------- | -------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | సంతకం చేసిన/వెర్షన్ చేసిన విడుదల       | మార్పులేనిది               | నిర్దిష్ట విడుదలను పిన్ చేసే ప్రొడక్షన్ డిప్లాయ్మెంట్లు                                                                    |
| `:latest` / `:latest-web`       | అత్యధిక **ప్రచురిత** స్థిరమైన SemVer   | మారగల స్థిరమైన పాయింటర్    | SemVer ప్రచురణ జాబ్ **తర్వాత** స్థిరమైన విడుదలలను అనుసరిస్తుంది — `main` లేదా విడుదల కాని `release/v*` కమిట్లను అనుసరించదు |
| `:next` / `:next-web`           | ప్రస్తుత డిఫాల్ట్ `release/v*` బ్రాంచ్ | మారగల ప్రీ-రిలీజ్ పాయింటర్ | సక్రియ విడుదల బ్రాంచ్లో చేరినప్పటికీ ఇంకా స్థిరమైన విడుదలలో లేని పరిష్కారాలను పరీక్షించడం                                  |
| `:main` / `:main-web`           | `main` బ్రాంచ్                         | మారగల డెవలప్మెంట్ పాయింటర్ | డెవలప్మెంట్ మరియు ఇంటిగ్రేషన్ పరీక్షల కోసం మాత్రమే                                                                         |

#### ప్రీ-రిలీజ్ ఛానెల్ను ఉపయోగించడం

ప్రస్తుత డిఫాల్ట్ `release/v*` బ్రాంచ్కు చేసే ప్రతి పుష్పై `next` ఛానెల్ మళ్లీ బిల్డ్ చేయబడుతుంది మరియు AMD64, ARM64 రెండింటికీ ప్రచురించబడుతుంది. పాత మెయింటెనెన్స్ బ్రాంచ్లు దాన్ని ఓవర్రైట్ చేయలేవు. తదుపరి స్థిరమైన ట్యాగ్ రూపొందించబడటానికి ముందు సక్రియ విడుదల బ్రాంచ్లో విలీనం చేసిన పరిష్కారాల కోసం ఈ ఛానెల్ పుల్ చేయగల ఇమేజ్ను అందిస్తుంది.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose కోసం, ఎంచుకున్న ప్రొఫైల్ ఉపయోగించే ఇమేజ్ ట్యాగ్ను ఓవర్రైడ్ చేసి, ఆ తర్వాత సర్వీస్ను పుల్ చేసి మళ్లీ సృష్టించండి:

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

`next` అనేది మారుతూ ఉండే ప్రీ-రిలీజ్ ఛానెల్. సక్రియ విడుదల బ్రాంచ్కు చేసే ఏ పుష్పైనైనా ఇది మారవచ్చు మరియు **ప్రొడక్షన్ వినియోగానికి మద్దతు లేదు**. నిర్దిష్ట బిల్డ్ను మూల్యాంకనం చేస్తున్నప్పుడు ఇమేజ్ డైజెస్ట్ను పిన్ చేయండి:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

పరీక్షించే ముందు, OmniRoute డేటా వాల్యూమ్ లేదా bind-mounted డేటా డైరెక్టరీని బ్యాకప్ చేయండి. వెనక్కి మళ్లించడానికి, గతంలో ఉపయోగించిన స్థిరమైన వెర్షన్ లేదా digestను పునరుద్ధరించి, కంటైనర్ను మళ్లీ సృష్టించండి:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build ఎప్పటికీ `latest`ను మార్చలేదు; అర్హత కలిగిన స్థిరమైన semantic version మాత్రమే స్థిరమైన pointerను ముందుకు తీసుకెళ్లగలదు. `next` imagesలో release image తనిఖీ మరియు CRITICAL-vulnerabilityను నిరోధించే gate కొనసాగుతాయి.

**`latest` అనేది git తాజాదనానికి హామీ కాదు.** `main`లో లేదా క్రియాశీల `release/v*` branchలో merge చేసిన పరిష్కారాలు, స్థిరమైన SemVer image ప్రచురించబడి, publish job `:latest`ను ముందుకు తీసుకెళ్లే వరకు (ఆ SemVerతో ఒకే digest) `:latest`లో ఉండవు. GitHubలో పరిష్కారం ఇప్పటికే కనిపిస్తున్నప్పటికీ `latest` మారకుండా ఉన్నట్లు కనిపిస్తే, release branchను పరీక్షించడానికి `:next`ను pull చేయండి లేదా SemVer tag కోసం వేచి ఉండండి.

| మీకు కావలసింది                                                                        | ఉపయోగించాల్సింది                            |
| ------------------------------------------------------------------------------------- | ------------------------------------------- |
| మార్పులకు లోనుకాకూడని GitOps / production                                             | `:X.Y.Z`ను (లేదా image digestను) pin చేయండి |
| ప్రచురించిన స్థిరమైన విడుదలలను అనుసరించి, ప్రతి release సమయంలో recreateను అంగీకరించడం | `:latest`                                   |
| విడుదల కాని `release/v*` commitsను పరీక్షించడం                                        | `:next` (production కోసం కాదు)              |
| `main`ను పరీక్షించడం                                                                  | `:main` (production కోసం కాదు)              |

## లభ్యత: డిఫాల్ట్ SQLite ఒకే-రెప్లికా

ప్రామాణిక Docker / Kubernetes OmniRoute అనేది **ఒక Node ప్రాసెస్ + ఒక SQLite రైటర్**. ఈ టోపాలజీలో అధిక లభ్యతకు **మద్దతు లేదు**.

| పరిమితి                                      | పరిణామం                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ఒకే రైటర్                                    | ఒకే SQLite ఫైల్పై బహుళ రెప్లికాలను **అమలు చేయవద్దు**. అది DBని పాడుచేస్తుంది.                                                                                                                                                                                                                                                                                  |
| పునఃసృష్టి / పునఃప్రారంభం / HEALTHCHECK కిల్ | ప్రాసెస్లో ఉన్న SSE, డాష్బోర్డ్ సెషన్లు మరియు ఇన్-మెమరీ స్థితికి **పూర్తి అంతరాయం**. కనెక్ట్ అయి ఉన్న ప్రతి క్లయింట్ డిస్కనెక్ట్ అవుతుంది. ఎండ్పాయింట్లు ఖాళీగా ఉండే సమయంలో వచ్చే కొత్త అభ్యర్థనలకు OmniRoute JSONకు బదులుగా రివర్స్-ప్రాక్సీ **`502 Bad Gateway: Unknown error`** వస్తుంది — క్లయింట్లు దీనిని ప్రొవైడర్ వైఫల్యం నుండి వేరు చేయలేరు (#11015). |
| `/healthz`తో ఒకే ఈవెంట్ లూప్                 | రద్దీగా ఉన్న క్యాటలాగ్ లేదా కంప్రెషన్ టిక్ ప్రోబ్లను ఆలస్యం చేయవచ్చు; అప్పుడు తక్కువ టైమ్అవుట్ **ఏకైక** రెప్లికాను పునఃప్రారంభిస్తుంది.                                                                                                                                                                                                                        |

**ప్రోబ్ మ్యాట్రిక్స్** ([Kubernetes ప్రోబ్ సిఫార్సులు](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) కూడా చూడండి):

| ప్రోబ్                | లక్ష్యం                                                      | ఉపయోగించవద్దు                                                      |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| లైవ్నెస్              | `PORT`పై TCP (డిఫాల్ట్ `20128`), లేదా సాఫ్ట్ HTTP `/healthz` | `/api/monitoring/health`                                           |
| రెడీనెస్              | HTTP `GET /healthz`                                          | ఈవెంట్ లూప్ రద్దీగా ఉండటాన్ని డెడ్గా పరిగణించే కఠినమైన టైమ్అవుట్లు |
| లోతైన తనిఖీ / మానవులు | `/api/monitoring/health`                                     | ఆటోమేటెడ్ kubelet లైవ్నెస్                                         |

**అప్గ్రేడ్లు:** ప్రతి సెషన్ డిస్కనెక్ట్ అవుతుందని ఆశించండి. వీలైతే క్లయింట్లను డ్రెయిన్ చేయండి; డిఫాల్ట్ SQLiteలో రోలింగ్ అప్డేట్ లేదు. Compose `restart: unless-stopped`తో పాటు Docker `HEALTHCHECK` కూడా కంటైనర్ Unhealthy అయినప్పుడు ఏకైక ప్రాసెస్ను భర్తీ చేస్తుంది — ప్రభావ పరిధి అదే.

**ఒకే రెప్లికా** కోసం Kubernetes స్నిపెట్ (`Recreate` అవసరం; ఒక SQLite ఫైల్పై `replicas`ను పెంచవద్దు):

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

`preStop` స్లీప్ వల్ల SIGTERMకు ముందు kube, Service ఎండ్పాయింట్లను తొలగించగలుగుతుంది; అందువల్ల **కొత్త** ట్రాఫిక్ ముగుస్తున్న ప్రాసెస్ను చేరడం ఆగిపోతుంది. ప్రాసెస్లో ఉన్న `/v1/responses` SSE, హెవీవెయిట్ అడ్మిషన్ లీజ్ల ద్వారా `SHUTDOWN_TIMEOUT_MS` వరకు (డిఫాల్ట్ 30s) డ్రెయిన్ చేయబడుతుంది (#11015). అయినప్పటికీ ప్రాసెస్ను చేరే కొత్త అభ్యర్థనలకు `503` + `Retry-After: 5` వస్తుంది. భర్తీ ప్రాసెస్ Ready అయ్యే వరకు ఉండే Recreate ఖాళీ-ఎండ్పాయింట్ విరామం తీవ్రమైన అంతరాయంగానే ఉంటుంది — అది SQLite టోపాలజీ కారణంగా జరుగుతుంది, ప్రోబ్ తప్పు కాన్ఫిగరేషన్ వల్ల కాదు.

బాహ్య Postgres / మల్టీ-రైటర్ HA అనేది డాక్యుమెంట్ చేయబడిన ప్రామాణిక మార్గం **కాదు**. మీకు HA అవసరమైతే, ఒకే రెప్లికాను కొనసాగించండి లేదా ప్రాజెక్ట్ విడిగా పరీక్షించి డాక్యుమెంట్ చేసిన టోపాలజీని అమలు చేయండి. Postgres/MySQL పని [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)లో ఉంది. అది విడుదలయ్యే వరకు, **పెద్ద** `/v1/responses` సామర్థ్యాన్ని పెంచడానికి మద్దతు ఉన్న ఏకైక మార్గం N స్వతంత్ర ప్రాసెస్లు (తదుపరి విభాగం); ఒక వాల్యూమ్పై `replicas > 1` కాదు.

## స్కేల్-అవుట్: N స్వతంత్ర ప్రాసెస్లు

ఒక Node ప్రాసెస్ అంటే **ఒక V8 హీప్**. ఒకదానితో మరొకటి ఓవర్ల్యాప్ అయ్యే ~3 MiB / ~750k-token కోడింగ్-ఏజెంట్ `POST /v1/responses` అభ్యర్థనలు రెండు (RTK + Caveman), ~12 Gi వద్ద ఆ హీప్ను అబార్ట్ చేస్తాయి (`FATAL ERROR: Reached heap limit`) మరియు 16 Gi cgroupలో OOMకు కారణం కావచ్చు. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) చూడండి. ఆ కొలత ఒక **మెమరీ-బడ్జెట్** హెచ్చరిక మాత్రమే, ఏకకాలంలో నడిచే దీర్ఘకాలిక `/v1/responses` అభ్యర్థనలకు ఉత్పత్తి విధించిన గరిష్ఠ పరిమితి రెండు అని కాదు. హెవీవెయిట్ చాట్ అడ్మిషన్, అదే V8/cgroup పరిమితి ఆధారంగా పరిమాణం స్వయంచాలకంగా నిర్ణయించబడే ఇన్జెస్ట్ బైట్ బడ్జెట్ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ద్వారా నియంత్రించబడుతుంది — ఇప్పటికే పరిమాణం నిర్ణయించిన ప్రాసెస్లో దీన్ని పెంచి ఓవర్రైడ్ చేయడం (లేదా పాత `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` అభ్యర్థన-సంఖ్య పరిమితిని సెట్ చేయడం) అబార్ట్ సమస్యను మళ్లీ తీసుకొస్తుంది. చిన్న చాట్లు, `/healthz`, `/v1/models`, మరియు MCP ఆ పరిమితిలో **ఉండవు**.

### ఒకే ప్రాసెస్: రెండు కంటే ఎక్కువ దీర్ఘకాలిక `/v1/responses`

ఒక **ఆరోగ్యకరమైన** ప్రాసెస్ (హీప్ `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` కంటే తక్కువగా ఉన్నది, డిఫాల్ట్ `0.75`)లో, ప్రాసెస్-వ్యాప్త ఇన్ఫ్లైట్-బైట్ బడ్జెట్ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110)లో ఇంకా స్థలం ఉంటే, ఏకకాలంలో రెండు కంటే ఎక్కువ దీర్ఘకాలిక `POST /v1/responses` అభ్యర్థనలు నడవవచ్చు. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (డిఫాల్ట్ 256 KiB)కు సమానమైన లేదా అంతకంటే పెద్ద బాడీలు, నిర్మాణపరంగా భారీ అభ్యర్థనల మాదిరిగానే అదే హెవీవెయిట్ లీజ్ను తీసుకుంటాయి మరియు అదే [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ఎస్కేప్ను (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ఉపయోగిస్తాయి. ఏకకాలంలో పదుల సంఖ్యలో దీర్ఘకాలిక SSE క్లయింట్లను నడపడం (ఆపరేటర్లకు తరచుగా 40–50 అవసరమవుతాయి) అనేది ఒక **మెమరీ-బడ్జెట్** ప్రశ్న — హీప్ + ప్రైమరీ/హెడ్రూమ్ స్లాట్లు + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` పరిమాణాలను తగిన విధంగా నిర్ణయించాలి — ఇది ఉత్పత్తి స్థాయిలో అమలయ్యే “గరిష్ఠం 2” అనే కఠిన పరిమితి కాదు. ఒత్తిడిలో ఉన్న హీప్ ఇప్పటికీ మళ్లీ ప్రయత్నించగల `503`తో లోడ్ను తొలగిస్తుంది, తద్వారా #7849 తిరిగి సంభవించదు.

**హీప్లను గుణించడానికి** (స్వతంత్ర V8 old-spaces) **ప్రస్తుతం**:

| చేయాల్సినవి                                                                                                                                                                             | చేయకూడనివి                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **N containers/pods** నడపండి; ప్రతిదానికి దాని **స్వంత** `DATA_DIR` / వాల్యూమ్ ఉండాలి                                                                                                   | ఒకే SQLite ఫైల్కు వ్యతిరేకంగా `replicas > 1` సెట్ చేయవద్దు                 |
| హీప్ / ఇన్ఫ్లైట్-బైట్ బడ్జెట్ ఆధారంగా హెవీ ఇన్ఫ్లైట్ + హెల్తీ-హెడ్రూమ్ పరిమాణాన్ని నిర్ణయించండి; 1–2 అనేది సంరక్షణాత్మక #7849 డిఫాల్ట్ మాత్రమే, ఉత్పత్తి యొక్క కఠిన గరిష్ఠ పరిమితి కాదు | ఒక ప్రాసెస్కు 8× RAM మరియు అపరిమిత కౌంట్ పరిమితిని ఇవ్వవద్దు               |
| **షేర్డ్ కోటా కౌంటర్ల** కోసం ఐచ్ఛికంగా: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                                            | Redisను షేర్డ్ SQLiteగా పరిగణించవద్దు — అది అలాంటిది కాదు                  |
| ప్రతి ఇన్స్టాన్స్లో ప్రొవైడర్ సీక్రెట్లను నకలు చేయండి (లేదా విభజించబడిన డ్యాష్బోర్డ్లను అంగీకరించండి)                                                                                   | ఇన్స్టాన్స్లన్నింటిలో ఒకే డ్యాష్బోర్డ్ / ఒకే కాల్-లాగ్ ఉంటుందని ఆశించవద్దు |
| ఏదైనా లోడ్ బ్యాలెన్సర్ను ముందు ఉంచండి; API కీ లేదా సెషన్ ఆధారిత స్టికీనెస్ సరిపోతుంది                                                                                                   | వెండర్-నిర్దిష్ట సైజ్-అవేర్ మిడిల్వేర్ను తప్పనిసరి చేయవద్దు                |

హార్డ్వేర్: ప్రతి ఇన్స్టాన్స్లో ఏకకాలంలో నడిచే దీర్ఘకాలిక `/v1/responses` సంఖ్య ఒక **మెమరీ-బడ్జెట్** ప్రశ్న (హీప్ + ఇన్ఫ్లైట్-బైట్ / #10110). `N` స్వతంత్ర `DATA_DIR`లు ఇప్పటికీ హీప్లను గుణిస్తాయి: హోస్ట్ RAM తప్పనిసరిగా `N × cgroup`కు సరిపోవాలి, “N=8తో ఒక 16 Gi pod”కు కాదు. ఒకే SQLite ఫైల్పై ఎప్పటికీ `replicas > 1` ఉపయోగించవద్దు.

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

ఇన్-ప్రాసెస్ సాంద్రత (HTTP ఐసోలేట్ వెలుపల కంప్రెషన్) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). షేర్డ్ డ్యూరబుల్ స్టేట్పై ఒక లాజికల్ క్లస్టర్ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## ముఖ్యమైన గమనికలు

- **SQLite WAL మోడ్:** OmniRoute తాజా మార్పులను `storage.sqlite`లోకి checkpoint చేయడానికి, `docker stop` పూర్తయ్యే వరకు అనుమతించాలి. బండిల్ చేసిన Compose ఫైళ్లు ఇప్పటికే 40s stop grace periodను సెట్ చేశాయి. మీరు imageను నేరుగా అమలు చేస్తే, `--stop-timeout 40`ను అలాగే ఉంచండి.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** సాధారణ/pre-write బ్యాకప్లు బాహ్యంగా నిర్వహించబడితే దీనిని `true`గా సెట్ చేయండి. ఇప్పటికే ఉన్న డేటాబేస్ migrationsకు ఇప్పటికీ వాటి స్వంత మన్నికైన భద్రతా snapshot మరియు mass-migration guard అవసరం.
- **డేటా నిలకడ:** container పునఃప్రారంభాల మధ్య మీ డేటాబేస్, keys మరియు configurationsను నిల్వ ఉంచడానికి ఎల్లప్పుడూ `/app/data`కు volumeను mount చేయండి.
- **Port కాన్ఫిగరేషన్:** డిఫాల్ట్ `20128` portను మార్చడానికి `PORT` environment variableను override చేయండి.

## ఇవి కూడా చూడండి

- [VM డిప్లాయ్మెంట్ గైడ్](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare సెటప్
- [Fly.io డిప్లాయ్మెంట్ గైడ్](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.ioకు డిప్లాయ్ చేయడం
- [Environment కాన్ఫిగరేషన్](../reference/ENVIRONMENT.md) — పూర్తి `.env` రిఫరెన్స్
