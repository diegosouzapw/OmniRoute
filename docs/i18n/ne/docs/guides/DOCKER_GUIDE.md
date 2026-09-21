# 🐳 Docker Guide — OmniRoute (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> पूर्ण Docker परिनियोजन सन्दर्भ। द्रुत सुरुवातका लागि, [README को Docker खण्ड](../README.md#-docker) हेर्नुहोस्।

## विषयसूची

- [द्रुत रूपमा चलाउनुहोस्](#quick-run)
- [वातावरण फाइलसहित](#with-environment-file)
- [Docker Compose](#docker-compose)
- [उपलब्ध प्रोफाइलहरू](#available-profiles)
- [OmniRoute Docker मा चल्दा होस्ट CLI उपकरणहरू कन्फिगर गर्ने](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis साइडकार](#redis-sidecar)
- [उत्पादन Compose](#production-compose)
- [Dockerfile चरणहरू](#dockerfile-stages)
- [महत्त्वपूर्ण वातावरण चरहरू](#critical-environment-variables)
- [Caddy (HTTPS) सहित Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare द्रुत टनेल](#cloudflare-quick-tunnel)
- [इमेज ट्यागहरू](#image-tags)
- [उपलब्धता: पूर्वनिर्धारित SQLite एकल-प्रतिकृति हो](#availability-default-sqlite-is-single-replica)
- [महत्त्वपूर्ण टिप्पणीहरू](#important-notes)

---

## द्रुत रूपमा चलाउनुहोस्

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## वातावरण फाइलसहित

```bash
# पहिले .env प्रतिलिपि गरेर सम्पादन गर्नुहोस्
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
# आधारभूत प्रोफाइल (CLI उपकरणहरूबिना)
docker compose --profile base up -d

# CLI प्रोफाइल (Claude Code, Codex, OpenClaw अन्तर्निर्मित)
docker compose --profile cli up -d

# होस्ट प्रोफाइल (मुख्यतः Linux का लागि; होस्ट CLI बाइनरीहरूलाई पढ्न-मात्र मिल्ने गरी माउन्ट गर्छ)
docker compose --profile host up -d

# CLI + CLIProxyAPI साइडकार संयोजन गर्नुहोस्
docker compose --profile cli --profile cliproxyapi up -d
```

## उपलब्ध प्रोफाइलहरू

OmniRoute चारवटा Compose प्रोफाइलसहित आउँछ। तपाईंको वातावरणसँग मेल खाने प्रोफाइल छान्नुहोस्।

| प्रोफाइल                | सेवा             | कहिले प्रयोग गर्ने                                                                                                                             | कमाण्ड                                       |
| ----------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (पूर्वनिर्धारित) | `omniroute-base` | हेडलेस सर्भर / न्यूनतम रनटाइम, कुनै पनि प्रदायक CLI समावेश गरिएको छैन                                                                          | `docker compose --profile base up -d`        |
| `cli`                   | `omniroute-cli`  | `omniroute providers/setup/doctor` र समावेश गरिएका CLI हरू (Codex, Claude Code, Droid, OpenClaw) कल गर्ने एजेन्टिक कार्यप्रवाहहरू              | `docker compose --profile cli up -d`         |
| `host`                  | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude`, आदि पढ्न-मात्र मिल्ने गरी माउन्ट गरेर होस्ट CLI हरूमा `network_mode`-जस्तै पहुँच चाहने Linux होस्टहरू | `docker compose --profile host up -d`        |
| `cliproxyapi`           | `cliproxyapi`    | अपस्ट्रिम CLI प्रोक्सीका लागि पोर्ट `8317` मा [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) साइडकार चलाउनुहोस्                   | `docker compose --profile cliproxyapi up -d` |

> धेरै प्रोफाइलहरू संयोजन गर्न सकिन्छ: `docker compose --profile cli --profile cliproxyapi up -d`।

## OmniRoute लाई Docker मा चलाउँदा होस्ट CLI उपकरणहरू कन्फिगर गर्ने

`omniroute setup-codex`, `setup-claude`, `config set <tool>` र ड्यासबोर्डको
**कन्फिग सेभ गर्नुहोस्** बटनले `~/.codex/*.config.toml` जस्ता फाइलहरू लेख्छन्। ती पथहरूको
अर्थ CLI वास्तवमै चल्ने मेसिनमा मात्र हुन्छ। तिनलाई कन्टेनरभित्र चलाउँदा
लेखिएको फाइल कन्टेनरकै होम (`/home/node` —
इमेज `USER node` का रूपमा चल्छ) मा पुग्छ, जहाँ कुनै पनि होस्ट CLI ले त्यसलाई कहिल्यै पढ्दैन र
कन्टेनर पुनः सिर्जना हुनेबित्तिकै त्यो हट्छ।

OmniRoute ले यो अवस्था पत्ता लगाउँछ र तपाईंले प्रयोग गर्न नसक्ने सफलताको सूचना दिनुको सट्टा
निर्देशनसहित लेख्न अस्वीकार गर्छ: CLI `2` सहित बन्द हुन्छ, र API ले
`containerEphemeralTarget: true` सहित `422` जवाफ दिन्छ।

### सिफारिस गरिएको: CLI होस्टमा र OmniRoute Docker मा चलाउनुहोस्

कन्टेनरले API उपलब्ध गराउँछ; CLI ले तपाईंका होस्ट उपकरणहरू कन्फिगर गर्छ।

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI लाई कन्टेनरतर्फ निर्देशित गर्नुहोस्
omniroute setup-codex                      # तपाईंको होस्टमा वास्तविक ~/.codex लेख्छ
```

Codex, Claude Code, Cursor वा यस्तै उपकरणहरू तपाईंको
ल्यापटपमा चल्ने अवस्थामा यो सही विकल्प हो — र सामान्य सेटअप यही हो।

### वैकल्पिक: होस्टका कन्फिग डाइरेक्टरीहरू bind-mount गर्नुहोस् (`host` प्रोफाइल)

यदि तपाईं कन्टेनर आफैँले तपाईंको होस्ट कन्फिग लेखोस् भन्ने चाहनुहुन्छ भने,
डाइरेक्टरीहरू माउन्ट गर्नुहोस् र `CLI_CONFIG_HOME` लाई माउन्ट रुटतर्फ निर्देशित गर्नुहोस्। `host` प्रोफाइलले
यो काम पहिल्यै गर्छ:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount ले नै पथलाई विश्वसनीय बनाउँछ: OmniRoute ले
`/proc/self/mountinfo` पढ्छ र माउन्ट गरिएका पथहरूमा (र जसका चाइल्ड डाइरेक्टरीहरू
माउन्ट गरिएका छन्, जुन माथिको `/host-home` संरचनासँग ठ्याक्कै मेल खान्छ) लेख्न अनुमति दिन्छ, तर
माउन्ट नगरिएका पथहरूमा भने अझै पनि लेख्न अस्वीकार गर्छ।

### आपत्कालीन विकल्प: कन्टेनरकै CLI हरू कन्फिगर गर्नुहोस् (सीमित रूपमा प्रयोग गर्नुहोस्)

CLI हरू वास्तवमै कन्टेनरभित्रै रहने अवस्थामा (`cli` प्रोफाइल), लेख्ने कार्य
जानाजानी गरिएको हुन्छ। कुनै पनि `setup-*` कमान्डमा `--allow-container-write` दिनुहोस्, वा सर्भरका लागि
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सेट गर्नुहोस्। कन्टेनर हटेपछि लेखिएको सामग्री
नरहने चेतावनीसहित लेख्ने कार्य अगाडि बढ्छ।

> **सुरक्षा चेतावनी — `cli` प्रोफाइल + `docker.sock` माउन्ट।**
> `cli` प्रोफाइलले `/var/run/docker.sock` लाई bind-mount गर्छ, जसले गर्दा कन्टेनरभित्रको
> स्वतः-अपडेटरले होस्ट डेमनबाट स्ट्याक पुनः सिर्जना गर्न सक्छ
> (`src/lib/system/autoUpdate.ts` ले उक्त सकेटको जाँच गर्छ र त्यो
> अनुपस्थित हुँदा Docker पथ छोड्छ)। उक्त सकेट **होस्ट-root विश्वास
> सीमा** हो: त्यसमा पहुँच पुग्ने कुनै पनि चीजले होस्टको Docker डेमनलाई
> root का रूपमा सञ्चालन गर्छ — यसले होस्टको कुनै पनि कन्टेनर सिर्जना गर्न, निरीक्षण गर्न, रोक्न र हटाउन सक्छ।
> यसका प्रभावहरू:
>
> 1. **`cli` प्रोफाइलको पोर्टलाई नेटवर्कमा कहिल्यै नखोल्नुहोस्।** यसलाई
>    `127.0.0.1` मा प्रकाशित गर्नुहोस् (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN बाट पहुँचयोग्य `cli` प्रोफाइलले ड्यासबोर्ड-स्तरको कुनै पनि RCE लाई
>    पूर्ण होस्ट नियन्त्रणमा परिणत गर्छ।
> 2. **`cli` प्रोफाइलमा कुनै पनि अतिरिक्त होस्ट डाइरेक्टरी bind नगर्नुहोस्।**
>    Docker सकेटसँगै थप गरिएको कुनै पनि माउन्टले कन्टेनरलाई तपाईंको फाइलसिस्टम र
>    होस्ट कन्फिगमा पूर्ण पढ्ने/लेख्ने पहुँच दिन्छ। यदि कुनै उपकरणलाई प्रोजेक्ट
>    देखाउन आवश्यक छ भने, त्यसलाई CLI बाइनरी प्रयोग गरेर स्थानीय रूपमा चलाउनुहोस् — त्यसलाई
>    `cli` कन्टेनरमा माउन्ट नगर्नुहोस्।
>
> यदि तपाईंलाई कन्टेनरभित्र स्वतः-अपडेट आवश्यक छैन भने, `cli` प्रोफाइल बन्द नै राख्नुहोस्
> (`COMPOSE_PROFILES=core,redis` वा अझ छोटो)। अन्य प्रोफाइलहरूले
> Docker सकेट माउन्ट गर्दैनन्।
>
> MITM सम्बन्धी जोखिम मोडेलका लागि `docs/security/MITM-TPROXY-DECRYPT.md` (git मा; `/docs` मा कम्पाइल नगरिएको) हेर्नुहोस्,
> र `codex`/`claude-code`/`droid`/`openclaw` बाइनरीको उत्पत्ति शृङ्खलाका लागि
> `docs/security/SUPPLY_CHAIN.md` हेर्नुहोस्।

## Redis साइडकार

OmniRoute ले वितरित दर सीमक र साझा क्यासलाई समर्थन गर्न Redis मा निर्भर गर्छ। `redis` सेवा `docker-compose.yml` मा **सधैं परिभाषित** हुन्छ (यसमा कुनै प्रोफाइल गेट छैन) र अन्य कुनै पनि प्रोफाइलसँगै सुरु हुन्छ।

| विवरण                  | मान                                            |
| ---------------------- | ---------------------------------------------- |
| इमेज                   | `redis:7-alpine`                               |
| कन्टेनरको नाम          | `omniroute-redis`                              |
| आन्तरिक पोर्ट          | `6379`                                         |
| होस्ट पोर्ट (ओभरराइड)  | `REDIS_PORT` (पूर्वनिर्धारित `6379`)           |
| होस्ट बाइन्ड (ओभरराइड) | `REDIS_BIND_HOST` (पूर्वनिर्धारित `127.0.0.1`) |
| भोल्युम                | `omniroute-redis-data` → `/data`               |
| स्वास्थ्य जाँच         | `redis-cli ping` (10s अन्तराल)                 |

सम्बन्धित वातावरणीय चरहरू:

- `REDIS_URL` — एपमा इन्जेक्ट गरिने जडान स्ट्रिङ (पूर्वनिर्धारित रूपमा `redis://redis:6379`)।
- `REDIS_PORT` — Redis कन्टेनरका लागि होस्ट-साइड पोर्ट म्यापिङ।
- `REDIS_BIND_HOST` — पोर्ट प्रकाशित हुने होस्ट इन्टरफेस। पूर्वनिर्धारित मान `127.0.0.1` हो।

> **पूर्वनिर्धारित रूपमा लूपब्याक किन:** साइडकार `requirepass` बिना चल्छ, र एप
> कन्टेनरहरूले compose नेटवर्क (`redis:6379`) मार्फत यसलाई पहुँच गर्छन् — प्रकाशित पोर्ट
> होस्ट-साइड उपकरण (`redis-cli`, स्थानीय `npm run dev`) का लागि मात्र हो। यसलाई
> `0.0.0.0` मा प्रकाशित गर्दा तपाईंको LAN का प्रत्येक होस्टमा प्रमाणीकरणविहीन Redis खुला हुनेछ। यदि तपाईंले
> `REDIS_BIND_HOST=0.0.0.0` सेट गर्नुभयो भने, सेवा `command:` मा `--requirepass` पनि थप्नुहोस्।

**Redis असक्षम पार्न** सिफारिस गरिँदैन (दर सीमक इन-मेमोरी वैकल्पिक व्यवस्थामा खस्किनेछ)। यदि त्यसो गर्नैपर्छ भने, `docker-compose.yml` मा रहेको `redis:` सेवा ब्लक हटाउनुहोस्/टिप्पणी बनाउनुहोस् वा यसलाई शून्यमा स्केल गर्नुहोस्:

```bash
docker compose up -d --scale redis=0
```

## उत्पादन Compose

डेभसँगै चल्ने पृथक उत्पादन स्न्यापसटको लागि `docker-compose.prod.yml` प्रयोग गर्नुहोस्।

| विवरण                           | मान                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| फाइल                            | `docker-compose.prod.yml`                                                                   |
| पूर्वनिर्धारित ड्यासबोर्ड पोर्ट | `PROD_DASHBOARD_PORT=20130` (आन्तरिक `${DASHBOARD_PORT:-20128}` मा म्याप गरिएको)            |
| पूर्वनिर्धारित API पोर्ट        | `PROD_API_PORT=20131`                                                                       |
| इमेज                            | `omniroute:prod` (`runner-cli` लक्ष्यबाट बिल्ड गरिएको)                                      |
| Redis कन्टेनर                   | `omniroute-redis-prod` (`redis:8.6.2`, समर्पित `redis-prod-data` भोल्युम)                   |
| डेटा भोल्युम                    | `omniroute-prod-data` (नाम दिइएको, पुनः बिल्ड गर्दा पनि सुरक्षित रहने)                      |
| स्वास्थ्य जाँचहरू               | `node healthcheck.mjs` + `redis-cli ping`, Redis को स्वास्थ्यमा निर्भर `depends_on` गेटसहित |

प्रयोग गर्ने तरिका:

```bash
# उत्पादन स्ट्याक बिल्ड गरी सुरु गर्नुहोस्
docker compose -f docker-compose.prod.yml up -d --build

# लगहरू स्ट्रिम गर्नुहोस्
docker compose -f docker-compose.prod.yml logs -f

# बन्द गर्नुहोस् (भोल्युमहरू कायम राख्नुहोस्)
docker compose -f docker-compose.prod.yml down
```

उत्पादन स्ट्याक डेभ compose सँग समानान्तर रूपमा चल्छ (कन्टेनरका नाम, पोर्ट र भोल्युमहरू फरक छन्), त्यसैले उत्पादन चलिरहँदा तपाईं स्थानीय रूपमा पुनरावृत्त सुधार जारी राख्न सक्नुहुन्छ।

## Dockerfile का चरणहरू

रिपोजिटरीमा बहु-चरणीय Dockerfile (`Dockerfile`) समावेश छ। तीनवटा चरण उपलब्ध छन्; आफ्नो प्रयोगका लागि उपयुक्त `target` छान्नुहोस्।

| चरण           | आधार इमेज             | उद्देश्य                                                                                                                                                                           |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | निर्भरताहरू स्थापना गर्छ (`npm ci --legacy-peer-deps`) र `npm run build` चलाउँछ (पूर्वनिर्धारित रूपमा Turbopack — तलको निर्माण-समयका स्रोतहरू हेर्नुहोस्)                          |
| `runner-base` | `node:26-trixie-slim` | Next.js को standalone आउटपुटसहितको उत्पादन रनटाइम। **कुनै पनि प्रदायक CLI हरू समावेश छैनन्।**                                                                                      |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` र विश्वव्यापी CLI हरू थप्छ: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`। **एजेन्टिक कार्यप्रवाहका लागि यो छान्नुहोस्।** |

कुनै निश्चित target म्यानुअल रूपमा निर्माण गर्नुहोस्:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### निर्माण-समयका स्रोतहरू

तीनवटा build arg ले `builder` चरणको लागत नियन्त्रण गर्छन्। तिनीहरू निर्माण-समयका लागि मात्र हुन् —
`OMNIROUTE_MEMORY_MB` (तल) एउटा छुट्टै रनटाइम समायोजन हो।

| Build arg                   | पूर्वनिर्धारित | प्रभाव                                                                                       |
| --------------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`            | `0` ले यसको सट्टा webpack मार्फत निर्माण गर्छ। अधिकतम मेमोरी कम लाग्छ, तर ढिलो हुन्छ।        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`         | सुरु गरिएको `next build` का लागि V8 heap सीमा (`--max-old-space-size`)।                      |
| `OMNIROUTE_BUILD_WORKERS`   | `2`            | `CIRCLE_NODE_TOTAL` मा मान दिन्छ; Next ले page-data सङ्कलनका लागि `workers = N - 1` निकाल्छ। |

ठूलो builder मा बढाउनुपर्ने र सीमित स्रोत भएको build **पछि** `✓ Compiled successfully` मा बन्द हुँदा शङ्का गर्नुपर्ने सेटिङ `OMNIROUTE_BUILD_WORKERS` हो। प्रत्येक page-data worker आफ्नै process हो, र मूल `next build` पनि छुट्टै process हो; प्रत्यक्ष VPS पुनरुत्पादन (issue #7518) मा प्रत्येक process को अधिकतम RSS `NODE_OPTIONS` heap flag बाट स्वतन्त्र रूपमा ~4.5 GB मापन गरिएको थियो (Turbopack ले V8 heap बाहिरको native/Rust मेमोरीमा कम्पाइल गर्छ)। पूर्वनिर्धारित `2` (→ 1 worker, जम्मा 2 process) प्रकाशन pipeline ले प्रयोग गर्ने 16 GB / 4 vCPU GitHub-hosted runner का लागि निर्धारण गरिएको हो। `8` मा (→ 7 workers) उक्त runner को मेमोरी सकियो र buildkit ले `ResourceExhausted: ... cannot allocate memory` सहित चरण असफल गर्यो; प्रति-process RSS लाई अनुमान गर्नुको सट्टा प्रत्यक्ष मापन गरेपछि `3` (→ 2 workers) पनि अटेन। `tests/unit/docker-build-memory-budget.test.ts` ले मापन गरिएको आँकडाका आधारमा गणना गर्छ र कुनै पनि knob runner को क्षमताभन्दा बढेमा असफल हुन्छ।

Turbopack ले V8 heap को **बाहिर** रहने native Rust मेमोरीमा कम्पाइल गर्छ, त्यसैले `OMNIROUTE_BUILD_MEMORY_MB` ले यसलाई सीमित गर्दैन। मेमोरी सीमा भएको host मा त्यसपछि build लाई OOM killer ले कुनै त्रुटि पाठ नदिई SIGKILL गर्छ — यो `Creating an optimized production build` को बीचमै रोकिन्छ, जसले मेमोरी सकिएको भन्दा अड्किएको जस्तो देखिन्छ। build host सीमित छ भने bundler परिवर्तन गर्नुहोस्:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम छ, त्यसैले `next build` ले एउटा मूल **र** एउटा worker process चलाउँछ र प्रत्येकले `OMNIROUTE_BUILD_MEMORY_MB` लाई छुट्टाछुट्टै पालना गर्छ। container सीमा उक्त मानको एक गुणा होइन, करिब दुई गुणाभन्दा माथि निर्धारण गर्नुहोस्।

यस tree मा मापन गरिएको (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container सीमा | परिणाम                          |
| --------- | -------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB | दुवैमा चुपचाप OOM-killed भयो    |
| webpack   | 8 GiB          | build worker SIGKILL भयो        |
| webpack   | 12 GiB         | सफल भयो, अधिकतम 11.1 GiB पुग्यो |

### रनटाइमका पूर्वनिर्धारित मानहरू

`runner-base` द्वारा निर्यात गरिएका पूर्वनिर्धारित मानहरू: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker मा मेमोरीको व्यवहार:

- इमेजले `OMNIROUTE_MEMORY_MB=1024` सेट गर्छ र त्यसबाट `NODE_OPTIONS=--max-old-space-size=1024` निकाल्छ।
- वास्तविक server process standalone launcher द्वारा सुरु गरिन्छ, जसले `OMNIROUTE_MEMORY_MB` पढ्छ र `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` थप्छ।
- Node ले दोहोरिएको अन्तिम `--max-old-space-size` मान प्रयोग गर्छ, त्यसैले `OMNIROUTE_MEMORY_MB` सेट गर्दा प्रभावकारी Docker heap सीमा नियन्त्रण हुन्छ।
- इमेजले यसलाई सधैं सेट गर्ने भएकाले launcher को आफ्नै RAM-अनुकूलित fallback Docker अन्तर्गत कहिल्यै लागू हुँदैन। workload का लागि यसलाई स्पष्ट रूपमा बढाउनुहोस् (तलको तालिका)। coding-agent `/v1/responses` का लागि `2048` अझै पनि धेरै सानो छ।

### coding agent हरूका लागि रनटाइम RAM

1 GiB को Docker पूर्वनिर्धारित मान dashboard/light-chat का लागि न्यूनतम सीमा हो, उत्पादनका लागि उपयुक्त आकार होइन। लामा `POST /v1/responses` body हरूले (सयौँ message, दर्जनौँ tool) compression का क्रममा मेमोरीभित्र धेरैवटा graph राख्छन्। एकै समयमा चलेका ~3 MiB / ~750k-token का दुईवटा request ले **12 GiB** old-space मा V8 रोकिएका छन् (`FATAL ERROR: Reached heap limit`) र 16 GiB cgroup OOM पनि निम्त्याएका छन्। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) हेर्नुहोस्।

cgroup को `--memory` लाई **heap भन्दा माथि** निर्धारण गर्नुहोस् — native buffer, SQLite, र compression का मध्यवर्ती सामग्रीहरू V8 बाहिर रहन्छन्।

| कार्यभार                              | `OMNIROUTE_MEMORY_MB`              | कन्टेनर / cgroup                 | टिप्पणी                                                                                                            |
| ------------------------------------- | ---------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| ड्यासबोर्ड, एउटा हल्का च्याट          | `1024` (इमेजको पूर्वनिर्धारित मान) | ≥2 GiB                           |                                                                                                                    |
| एउटा कोडिङ एजेन्ट (Claude/Codex/Grok) | `8192`                             | ≥10 GiB                          | सामान्य एकल-सत्र `/v1/responses`                                                                                   |
| एकैसाथ दुईवटा लामो `/v1/responses`    | `10240`–`12288`                    | ≥12–16 GiB                       | ~12 GiB हिपमा V8 अवरोध मापन गरिएको                                                                                 |
| एकैसाथ तीन वा बढी लामो कन्टेक्स्टहरू  | एउटै प्रोसेसमा नगर्नुहोस्          | क्रमिक रूपमा चलाउनुहोस् / थप RAM | पूर्वनिर्धारित हेभीवेट एडमिसनमा 1 वटा अनुरोध मात्र प्रक्रियामा रहन्छ; RAM नबढाई यसलाई बढाउँदा अवरोध पुनः देखा पर्छ |

बेयर मेटलमा `omniroute serve` चलाउँदा, `OMNIROUTE_MEMORY_MB` **सेट नगरिएको** अवस्थामा यसले RAM को ~35% (`[512, 4096]` सीमाभित्र) अनुसार क्यालिब्रेट गर्छ। Docker ले सधैँ `1024` सेट गर्ने भएकाले आधिकारिक इमेजमा उक्त क्यालिब्रेसन कहिल्यै चल्दैन।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## महत्त्वपूर्ण वातावरणीय चरहरू

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) मा अभिलेखीकृत पूर्वनिर्धारित मानहरूबाहेक, Docker अन्तर्गत चलाउँदा निम्न चरहरू सबैभन्दा महत्त्वपूर्ण हुन्छन्:

| चर                            | उद्देश्य                                                                                                                                                                                                                                                                                   | पूर्वनिर्धारित मान             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ब्रिजका लागि साझा गोप्य कुञ्जी। **उत्पादनमा आवश्यक** — बलियो अनियमित स्ट्रिङमा सेट गर्नुहोस्।                                                                                                                                                                                    | सेट नगरिएको (प्रदान गर्नैपर्छ) |
| `REDIS_URL`                   | दर सीमक / क्यास ब्याकएन्डका लागि जडान स्ट्रिङ                                                                                                                                                                                                                                              | `redis://redis:6379`           |
| `REDIS_PORT`                  | समावेश गरिएको Redis कन्टेनरका लागि होस्ट-साइड पोर्ट                                                                                                                                                                                                                                        | `6379`                         |
| `REDIS_BIND_HOST`             | समावेश गरिएको Redis पोर्ट प्रकाशित हुने होस्ट इन्टरफेस (तपाईंले AUTH नथपेसम्म लुपब्याक)                                                                                                                                                                                                    | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | स्व-अद्यावधिक कार्यप्रवाहहरूका लागि `cli` प्रोफाइलमा `/workspace/omniroute` मा माउन्ट गरिएको होस्ट पथ                                                                                                                                                                                      | `.` (हालको डाइरेक्टरी)         |
| `OMNIROUTE_MEMORY_MB`         | Docker स्ट्यान्डअलोन सर्भरका लागि रनटाइम Node हिपको अधिकतम सीमा; माथिको इमेज पूर्वनिर्धारित मानलाई अधिलेखन गर्छ। कोडिङ एजेन्टहरू: `8192`+ ([रनटाइम RAM](#runtime-ram-for-coding-agents) हेर्नुहोस्)।                                                                                       | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | ड्यासबोर्ड (20128) र API (20129) का लागि एक्सपोज गरिएका पोर्टहरू अधिलेखन गर्छ                                                                                                                                                                                                              | `20128` / `20129`              |
| `APP_BIND_HOST`               | docker-compose ले ड्यासबोर्ड/API/live-WS पोर्टहरू प्रकाशित गर्ने होस्ट इन्टरफेस। `REQUIRE_API_KEY=false` (पूर्वनिर्धारित) हुँदा, `0.0.0.0` ले अज्ञात `/v1` प्रोक्सीलाई LAN मा एक्सपोज गर्छ — `REQUIRE_API_KEY=true` वा अगाडि रिभर्स प्रोक्सी भएको अवस्थामा मात्र दायरा फराकिलो बनाउनुहोस्। | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | docker-compose ले `cliproxyapi` साइडकार प्रकाशित गर्ने होस्ट इन्टरफेस — यसको डेटा भोल्युममा प्रदायकका प्रमाणहरू राखिन्छन्।                                                                                                                                                                 | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | रनटाइम प्लगइन स्क्यानरले पढ्ने र स्थापना गर्ने डाइरेक्टरी। प्लगइनहरू बाइन्ड-माउन्ट गरिएका बेला यसलाई सेट गर्नुहोस्: पूर्वनिर्धारित मानले `HOME` पछ्याउँछ, जुन इमेजले निर्यात नगर्न सक्छ।                                                                                                   | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | एप रिभर्स प्रोक्सी पछाडि प्रकाशित हुँदा प्रयोग हुने URL उपपथ (जस्तै, `/omniroute`)                                                                                                                                                                                                         | _(खाली = रुट)_                 |
| `NEXT_PUBLIC_BASE_URL`        | उपपथसहितको सार्वजनिक ब्राउजर ओरिजिन (जस्तै, `https://host/omniroute`)                                                                                                                                                                                                                      | सेट नगरिएको                    |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` का लागि होस्ट-साइड ड्यासबोर्ड पोर्ट                                                                                                                                                                                                                              | `20130`                        |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` साइडकारका लागि होस्ट-साइड पोर्ट                                                                                                                                                                                                                                              | `8317`                         |

## सबपाथमा रिभर्स प्रोक्सी (Traefik / nginx)

Next.js `basePath` लाई स्ट्यान्डअलोन बन्डलमा कम्पाइल गरिन्छ। OmniRoute ले एपको रुटमा रहेको एउटा सेन्टिनेल फाइलमा बिल्ड गर्दा समावेश गरिएको मान रेकर्ड गर्छ (`npm run build` चलाउँदा लेखिन्छ; `scripts/docker/ensure-docker-base-path.mjs` ले पढ्छ) र कन्टेनर सुरु हुँदा त्यसलाई `OMNIROUTE_BASE_PATH` सँग तुलना गर्छ। ती फरक हुँदा र इमेज डोमेन रुटका लागि बिल्ड गरिएको भए, `node dev/run-standalone.mjs` चल्नुअघि एन्ट्रीपोइन्टले स्ट्यान्डअलोन म्यानिफेस्टहरू, इम्बेड गरिएका `basePath`/`assetPrefix` लिटरलहरू (Next 16 ले SSR एसेट URL हरू `assetPrefix` बाट मात्र रेन्डर गर्छ — प्याचरले यसमा पनि सबपाथ प्रतिलिपि गर्छ), बिल्डमै समावेश गरिएका `/_next/static` एसेट URL हरू (क्लाइन्ट-रेफरेन्स म्यानिफेस्टहरू, मिडिया इम्पोर्टहरू, प्रिरेन्डर गरिएका त्रुटि पृष्ठहरू) र क्लाइन्ट `process.env` शिम पुनर्लेखन गर्छ।

### Compose बिल्ड (सिफारिस गरिएको)

इमेज र रनटाइम मिल्ने बनाउन `.env` मा दुवै भेरिएबल सेट गर्नुहोस्, त्यसपछि पुनः बिल्ड गर्नुहोस्:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` ले `OMNIROUTE_BASE_PATH` लाई Docker build-arg र रनटाइम वातावरण भेरिएबल दुवैका रूपमा फर्वार्ड गर्छ।

### पूर्वनिर्मित रुट इमेज + रनटाइम सबपाथ

प्रकाशित `diegosouzapw/omniroute:*` इमेजहरू डोमेन रुटका लागि बिल्ड गरिएका हुन्छन्। तपाईंले अझै पनि रनटाइममा `OMNIROUTE_BASE_PATH` सेट गर्न सक्नुहुन्छ; कन्टेनरले स्टार्टअपमा एकपटक बन्डल प्याच गर्छ। यसलाई मिल्दो सार्वजनिक ओरिजिनसँग प्रयोग गर्नुहोस्:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

रिभर्स प्रोक्सीलाई **पूर्ण** बाह्य पाथ फर्वार्ड गर्ने गरी कन्फिगर गर्नुहोस् (प्रिफिक्स नहटाउनुहोस्)। Traefik ले `StripPrefix` बिना `PathPrefix(`/omniroute`)` लाई कन्टेनरतर्फ रुट गर्नुपर्छ, ताकि Next.js ले `/omniroute/...` प्राप्त गरोस् र `/omniroute/_next/...` बाट एसेटहरू सर्भ गरोस्।

Docker हेल्थचेकले सक्रिय `OMNIROUTE_BASE_PATH` प्रिफिक्स गरिएको हल्का `/healthz` लाइफसाइकल एन्डपोइन्ट जाँच गर्छ। मानवीय/ड्यासबोर्ड निदानका लागि `/api/monitoring/health` उपलब्ध रहन्छ; कन्टेनरको HEALTHCHECK लाई पुनः त्यहीँ लक्षित गर्न (उदाहरणका लागि, गहन स्वास्थ्य जाँच लागू गर्न), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट गर्नुहोस्। त्यो पाथ एउटा **गहन** जाँच हो (DB + मोनिटरिङ सारांश) — तपाईंले पुनः रोज्नुभएको अवस्थामा Docker को कम आवृत्तिको `HEALTHCHECK` का लागि उपयुक्त, तर Kubernetes का `livenessProbe` अन्तरालहरूका लागि **उपयुक्त होइन**।

अर्केस्ट्रेटरहरूका लागि (Kubernetes, Nomad आदि):

| जाँच              | प्राथमिकता दिनुहोस्                                                      | नदिनुहोस्                                          |
| ----------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| लाइभनेस           | HTTP `GET /livez`, वा मुख्य पोर्टमा TCP (`PORT`, पूर्वनिर्धारित `20128`) | लाइभनेसका रूपमा `/api/monitoring/health`           |
| रेडिनेस           | HTTP `GET /healthz`                                                      | इभेन्ट लुप व्यस्त हुँदा मृत ठान्ने छोटो टाइमआउटहरू |
| गहन / ब्ल्याकबक्स | `/api/monitoring/health`                                                 | —                                                  |

`/healthz` ले प्रक्रियाको लाइफसाइकल (`ok` / `starting` / `stopping`) रिपोर्ट गर्छ। `/livez` ले प्रक्रिया जीवित छ कि छैन मात्र जाँच गर्छ (ह्यान्डलर चल्न सक्ने अवस्थामा सधैँ 200; यसले रेडिनेसको प्रतीक्षा गर्दैन)। दुवै अझै पनि अनुरोध ह्यान्डलिङकै Node इभेन्ट लुपमा चल्छन्, त्यसैले CPU-बाउन्ड क्याटलग वा कम्प्रेसन कार्यले तिनलाई ढिलो बनाउन सक्छ — व्यस्त ≠ मृत। HTTP जाँचहरू टाइमआउट भएमा TCP लाइभनेसलाई प्राथमिकता दिनुहोस्। जाँचसम्बन्धी पूर्ण मार्गदर्शन:
[मोनिटरिङ मार्गदर्शिका — Kubernetes जाँच सिफारिसहरू](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)।

## Caddy सहित Docker Compose (HTTPS Auto-TLS)

Caddy को स्वचालित SSL प्रावधान प्रयोग गरेर OmniRoute लाई सुरक्षित रूपमा सार्वजनिक गर्न सकिन्छ। तपाईंको डोमेनको DNS A रेकर्डले तपाईंको सर्भरको IP तर्फ सङ्केत गरेको सुनिश्चित गर्नुहोस्।

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
      # OAuth कलब्याक, ड्यासबोर्ड लिङ्क र उत्पन्न गरिएका सार्वजनिक URL हरूका लागि ब्राउजरले देख्ने ओरिजिन।
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # निर्धारित कार्यहरू / सेल्फ-फेचहरूका लागि आन्तरिक सर्भर-टु-सर्भर URL।
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

Caddy ले अपस्ट्रिम कन्टेनरका लागि मानक फर्वार्डिङ हेडरहरू सेट गर्छ। OmniRoute ले
OAuth कलब्याक र उत्पन्न गरिएका सार्वजनिक लिङ्कहरूका लागि `NEXT_PUBLIC_BASE_URL` लाई आधिकारिक सार्वजनिक
ओरिजिनको रूपमा प्रयोग गर्छ; प्रमाणीकरण गरिएका ड्यासबोर्ड लेखनहरूले सेसनसँग आबद्ध CSRF
सुरक्षासहित समान-ओरिजिन अनुरोधहरू प्रयोग गर्छन्। उन्नत डिप्लोयमेन्टहरूमा मात्र `OMNIROUTE_TRUST_PROXY` सक्षम गर्नुहोस्, जहाँ तपाईं स्पष्ट
कन्फिगरेसनको सट्टा विश्वसनीय फर्वार्ड गरिएका हेडरहरूबाट OmniRoute ले सार्वजनिक ओरिजिन निर्धारण गरोस् भन्ने जानाजानी
चाहनुहुन्छ।

## Cloudflare Quick Tunnel

Docker डिप्लोयमेन्टहरूका लागि ड्यासबोर्ड समर्थनमा `Dashboard → Endpoints` मा एक-क्लिक **Cloudflare Quick Tunnel** समावेश छ। पहिलो पटक सक्षम गर्दा आवश्यक परेको अवस्थामा मात्र `cloudflared` डाउनलोड हुन्छ, तपाईंको हालको `/v1` एन्डपोइन्टमा अस्थायी टनेल सुरु हुन्छ र उत्पन्न गरिएको `https://*.trycloudflare.com/v1` URL तपाईंको सामान्य सार्वजनिक URL को ठीक तल देखाइन्छ।

एन्डपोइन्ट टनेल प्यानलहरू (Cloudflare, Tailscale, ngrok) सक्रिय टनेलको अवस्था परिवर्तन नगरी `Settings → Appearance` बाट देखाउन वा लुकाउन सकिन्छ।

### टनेलसम्बन्धी टिप्पणीहरू

- Quick Tunnel URL हरू अस्थायी हुन्छन् र प्रत्येक पुनःसुरुआतपछि परिवर्तन हुन्छन्।
- OmniRoute वा कन्टेनर पुनःसुरु भएपछि Quick Tunnels स्वतः पुनर्स्थापित हुँदैनन्। आवश्यक पर्दा तिनलाई ड्यासबोर्डबाट पुनः सक्षम गर्नुहोस्।
- व्यवस्थित स्थापनाले हाल Linux, macOS र Windows मा `x64` / `arm64` समर्थन गर्छ।
- सीमित कन्टेनर वातावरणहरूमा आउने अनावश्यक QUIC UDP बफर चेतावनीहरूबाट बच्न व्यवस्थित Quick Tunnels ले पूर्वनिर्धारित रूपमा HTTP/2 ट्रान्सपोर्ट प्रयोग गर्छन्। फरक ट्रान्सपोर्ट चाहनुहुन्छ भने `CLOUDFLARED_PROTOCOL=quic` वा `auto` सेट गर्नुहोस्।
- Docker इमेजहरूमा प्रणालीका CA रुटहरू समावेश हुन्छन् र तिनलाई व्यवस्थित `cloudflared` मा पठाइन्छ, जसले कन्टेनरभित्र टनेल बुटस्ट्र्याप हुँदा TLS विश्वाससम्बन्धी विफलताहरूबाट जोगाउँछ।
- OmniRoute ले डाउनलोड गर्नुको सट्टा विद्यमान बाइनरी प्रयोग गरोस् भन्ने चाहनुहुन्छ भने `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` सेट गर्नुहोस्।

## इमेज ट्यागहरू

| इमेज                     | ट्याग    | आकार   | विवरण                                                     |
| ------------------------ | -------- | ------ | --------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | सबैभन्दा उच्च **प्रकाशित** स्थिर SemVer (git `main` होइन) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps का लागि यस वर्गको ट्याग पिन गर्नुहोस्              |

बहु-प्लेटफर्म म्यानिफेस्ट: `linux/amd64` + `linux/arm64` नेटिभ (Apple Silicon, AWS Graviton, Raspberry Pi)। Docker ले मिल्दो आर्किटेक्चर स्वतः चयन गर्छ; ARM होस्टहरूमा AMD64 इमुलेसन जबरजस्ती प्रयोग गर्न आवश्यक भए `--platform linux/amd64` पठाउनुहोस्।

### रिलिज च्यानलहरू

OmniRoute ले स्थिर रिलिजहरू, सक्रिय रिलिज-ब्रान्च परीक्षण र विकास बिल्डहरूका लागि अलग-अलग Docker च्यानलहरू प्रकाशित गर्छ।

| च्यानल                          | स्रोत                                     | परिवर्तनशीलता                | सिफारिस गरिएको प्रयोग                                                                                      |
| ------------------------------- | ----------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | हस्ताक्षरित/संस्करणयुक्त रिलिज            | अपरिवर्तनीय                  | निश्चित रिलिज पिन गर्ने उत्पादन डिप्लोयमेन्टहरू                                                            |
| `:latest` / `:latest-web`       | सबैभन्दा उच्च **प्रकाशित** स्थिर SemVer   | परिवर्तनशील स्थिर सूचक       | SemVer प्रकाशन कार्य **पछि** स्थिर रिलिजहरू पछ्याउँछ — `main` वा अप्रकाशित `release/v*` कमिटहरू पछ्याउँदैन |
| `:next` / `:next-web`           | हालको पूर्वनिर्धारित `release/v*` ब्रान्च | परिवर्तनशील पूर्व-रिलिज सूचक | सक्रिय रिलिज ब्रान्चमा समावेश भइसकेका तर अझै स्थिर रिलिजमा नआएका सुधारहरूको परीक्षण                        |
| `:main` / `:main-web`           | `main` ब्रान्च                            | परिवर्तनशील विकास सूचक       | विकास र एकीकरण परीक्षणका लागि मात्र                                                                        |

#### पूर्व-रिलिज च्यानल प्रयोग गर्ने

`next` च्यानल हालको पूर्वनिर्धारित `release/v*` ब्रान्चमा हुने प्रत्येक पुशमा पुनः निर्माण गरिन्छ र AMD64 तथा ARM64 दुवैका लागि प्रकाशित हुन्छ। पुराना मर्मतसम्भार ब्रान्चहरूले यसलाई अधिलेखन गर्न सक्दैनन्। यस च्यानलले अर्को स्थिर ट्याग तयार हुनुअघि सक्रिय रिलिज ब्रान्चमा मर्ज भएका सुधारहरूका लागि पुल गर्न मिल्ने इमेज उपलब्ध गराउँछ।

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose का लागि चयन गरिएको प्रोफाइलले प्रयोग गर्ने इमेज ट्याग ओभरराइड गर्नुहोस्, त्यसपछि सर्भिस पुल गरी पुनः सिर्जना गर्नुहोस्:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### सुरक्षा र रोलब्याक

`next` एक परिवर्तनशील पूर्व-रिलिज च्यानल हो। सक्रिय रिलिज ब्रान्चमा हुने कुनै पनि पुशसँगै यो परिवर्तन हुन सक्छ र यो **उत्पादन प्रयोगका लागि समर्थित छैन**। कुनै निश्चित बिल्डको मूल्याङ्कन गर्दा इमेज डाइजेस्ट पिन गर्नुहोस्:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

परीक्षण गर्नुअघि, OmniRoute डेटा भोल्युम वा bind-mounted डेटा डाइरेक्टरीको ब्याकअप लिनुहोस्। रोल ब्याक गर्न, पहिले प्रयोग गरिएको स्थिर संस्करण वा digest पुनर्स्थापना गर्नुहोस् र कन्टेनर पुनः सिर्जना गर्नुहोस्:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build ले कहिल्यै `latest` सार्न सक्दैन; योग्य स्थिर semantic version ले मात्र स्थिर पोइन्टरलाई प्रवर्द्धन गर्न सक्छ। `next` इमेजहरूले release image निरीक्षण र ब्लक गर्ने CRITICAL-दुर्बलता गेट कायम राख्छन्।

**`latest` ले git को नवीनताको प्रत्याभूति दिँदैन।** `main` वा सक्रिय `release/v*` ब्रान्चमा मर्ज गरिएका समाधानहरू स्थिर SemVer इमेज प्रकाशित नभएसम्म र प्रकाशन job ले `:latest` लाई प्रवर्द्धन नगरेसम्म (त्यो SemVer कै समान digest सहित) `:latest` मा हुँदैनन्। GitHub मा समाधान पहिले नै देखिइसक्दा पनि `latest` स्थिर देखिन्छ भने, release branch परीक्षण गर्न `:next` pull गर्नुहोस् वा SemVer ट्यागको प्रतीक्षा गर्नुहोस्।

| तपाईं के चाहनुहुन्छ                                                             | प्रयोग गर्नुहोस्                           |
| ------------------------------------------------------------------------------- | ------------------------------------------ |
| परिवर्तन हुन नहुने GitOps / उत्पादन                                             | `:X.Y.Z` (वा इमेज digest) मा pin गर्नुहोस् |
| प्रकाशित स्थिर संस्करणहरू पछ्याउने र प्रत्येक release मा recreate स्वीकार गर्ने | `:latest`                                  |
| अप्रकाशित `release/v*` commits परीक्षण गर्ने                                    | `:next` (उत्पादनका लागि होइन)              |
| `main` परीक्षण गर्ने                                                            | `:main` (उत्पादनका लागि होइन)              |

## उपलब्धता: पूर्वनिर्धारित SQLite एकल-रेप्लिका हो

मानक Docker / Kubernetes OmniRoute भनेको **एउटा Node प्रक्रिया + एउटा SQLite राइटर** हो। यस टोपोलोजीमा उच्च उपलब्धता **समर्थित छैन**।

| सीमा                                      | परिणाम                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| एकल राइटर                                 | एउटै SQLite फाइलमा धेरै रेप्लिका **नचलाउनुहोस्**। त्यसले DB भ्रष्ट बनाउँछ।                                                                                                                                                                                                                                                    |
| पुनःसिर्जना / पुनःसुरु / HEALTHCHECK kill | प्रगतिमा रहेका SSE, ड्यासबोर्ड सत्रहरू र इन-मेमोरी अवस्थाको **पूर्ण अवरोध**। जडान भएका प्रत्येक क्लाइन्टको जडान टुट्छ। खाली-इन्डपोइन्ट अवधिमा आएका नयाँ अनुरोधहरूले OmniRoute JSON होइन, रिभर्स-प्रोक्सीको **`502 Bad Gateway: Unknown error`** पाउँछन् — क्लाइन्टहरूले यसलाई प्रदायकको विफलताबाट छुट्याउन सक्दैनन् (#11015)। |
| `/healthz` कै इभेन्ट लुप                  | व्यस्त क्याटलग वा कम्प्रेसन टिकले प्रोबहरूमा ढिलाइ गराउन सक्छ; छोटो टाइमआउटले त्यसपछि **एक मात्र** रेप्लिका पुनःसुरु गर्छ।                                                                                                                                                                                                    |

**प्रोब म्याट्रिक्स** ([Kubernetes प्रोब सिफारिसहरू](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) पनि हेर्नुहोस्):

| प्रोब                 | लक्ष्य                                                          | प्रयोग नगर्नुहोस्                                      |
| --------------------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| लाइभनेस               | `PORT` मा TCP (पूर्वनिर्धारित `20128`), वा सफ्ट HTTP `/healthz` | `/api/monitoring/health`                               |
| रेडिनेस               | HTTP `GET /healthz`                                             | इभेन्ट लुप व्यस्त हुनुलाई बन्द भएको ठान्ने कडा टाइमआउट |
| गहन / मानिसहरूका लागि | `/api/monitoring/health`                                        | स्वचालित kubelet लाइभनेस                               |

**अपग्रेडहरू:** प्रत्येक सत्र टुट्ने अपेक्षा गर्नुहोस्। सक्नुहुन्छ भने क्लाइन्टहरूलाई ड्रेन गर्नुहोस्; पूर्वनिर्धारित SQLite मा रोलिङ अपडेट उपलब्ध छैन। Compose को `restart: unless-stopped` र Docker को `HEALTHCHECK` ले पनि कन्टेनर Unhealthy हुँदा एक मात्र प्रक्रियालाई प्रतिस्थापन गर्नेछ — प्रभावको दायरा उही हुन्छ।

**एकल रेप्लिका** का लागि Kubernetes स्निपेट (Recreate आवश्यक छ; एउटै SQLite फाइलमा `replicas` नबढाउनुहोस्):

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

`preStop` sleep ले SIGTERM अघि kube लाई Service इन्डपोइन्टहरू हटाउन समय दिन्छ, जसले गर्दा **नयाँ** ट्राफिक बन्द हुँदै गरेको प्रक्रियामा पुग्न छोड्छ। प्रगतिमा रहेको `/v1/responses` SSE लाई हेभीवेट एडमिसन लिजहरू (#11015) मार्फत `SHUTDOWN_TIMEOUT_MS` (पूर्वनिर्धारित 30s) सम्म ड्रेन गरिन्छ। अझै पनि प्रक्रियामा पुग्ने नयाँ अनुरोधहरूले `503` + `Retry-After: 5` पाउँछन्। प्रतिस्थापन Ready नहुन्जेल कायम रहने Recreate को खाली-इन्डपोइन्ट अन्तराल पूर्ण अवरोध नै रहन्छ — त्यो SQLite टोपोलोजी हो, प्रोबको गलत कन्फिगरेसन होइन।

बाह्य Postgres / मल्टि-राइटर HA कुनै दस्तावेजीकृत मानक मार्ग **होइन**। तपाईंलाई HA आवश्यक छ भने, एकल रेप्लिका कायम राख्नुहोस् वा परियोजनाले छुट्टै परीक्षण र दस्तावेजीकरण गरेको टोपोलोजी चलाउनुहोस्। Postgres/MySQL सम्बन्धी काम [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) मा छ। त्यो उपलब्ध नहुन्जेल, **ठूलो** `/v1/responses` क्षमता बढाउने एक मात्र समर्थित तरिका N वटा स्वतन्त्र प्रक्रियाहरू (अर्को खण्ड) हो, एउटै भोल्युममा `replicas > 1` होइन।

## स्केल-आउट: N स्वतन्त्र प्रक्रियाहरू

एउटा Node प्रक्रिया भनेको **एउटा V8 heap** हो। एकअर्कासँग ओभरल्याप हुने ~3 MiB / ~750k-token का दुई coding-agent `POST /v1/responses` (RTK + Caveman) ले ~12 Gi मा उक्त heap लाई बन्द गराउँछन् (`FATAL ERROR: Reached heap limit`) र 16 Gi cgroup लाई OOM गराउन सक्छन्। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) हेर्नुहोस्। त्यो मापन **मेमोरी-बजेट** चेतावनी हो, एकैसाथ चल्ने लामो `/v1/responses` का लागि उत्पादनको हार्ड-अधिकतम दुई होइन। हेभीवेट च्याट प्रवेशलाई स्वतः व्युत्पन्न गरिएको इनजेस्ट बाइट बजेट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ले नियन्त्रण गर्छ, जसको आकार त्यही V8/cgroup सीमाबाट तय हुन्छ — पहिले नै आकार निर्धारण गरिएको प्रक्रियामा यसलाई माथितिर ओभरराइड गर्दा (वा पुरानो `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` अनुरोध-सङ्ख्या सीमा सेट गर्दा) पुनः प्रक्रिया बन्द हुने समस्या निम्तिन्छ। साना च्याटहरू, `/healthz`, `/v1/models`, र MCP उक्त सीमाभित्र **पर्दैनन्**।

### एक प्रक्रिया: दुईभन्दा बढी लामो `/v1/responses`

एउटा **स्वस्थ** प्रक्रिया (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` भन्दा तल, पूर्वनिर्धारित `0.75`) ले प्रक्रिया-व्यापी इनफ्लाइट-बाइट बजेट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) मा अझै ठाउँ हुँदा एकैसाथ दुईभन्दा बढी लामो `POST /v1/responses` चलाउन **सक्छ**। `OMNIROUTE_CHAT_LARGE_BODY_BYTES` बराबर वा त्यसभन्दा ठूला body हरूले (पूर्वनिर्धारित 256 KiB) संरचना-भारी अनुरोधहरूले जस्तै उही हेभीवेट lease लिन्छन् र उही [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) प्रयोग गर्छन्। एकैसाथ दर्जनौँ लामो SSE क्लाइन्टहरू (अपरेटरहरूलाई प्रायः 40–50 चाहिन्छ) चलाउनु **मेमोरी-बजेट** को प्रश्न हो — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` को आकार निर्धारण गर्नुहोस् — यो उत्पादनको हार्ड “अधिकतम 2” सीमा होइन। दबाबमा परेको heap ले अझै पनि पुनः प्रयास गर्न मिल्ने `503` सहित लोड घटाउँछ, जसले गर्दा #7849 दोहोरिँदैन।

**heap हरू गुणा गर्न** (स्वतन्त्र V8 old-spaces) **हाल**:

| गर्नुहोस्                                                                                                                                                     | नगर्नुहोस्                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **N containers/pods** चलाउनुहोस्, प्रत्येकको **आफ्नै** `DATA_DIR` / volume सहित                                                                               | एउटै SQLite फाइलमा `replicas > 1` सेट नगर्नुहोस्                     |
| heap / inflight-byte बजेटबाट heavy in-flight + healthy-headroom को आकार निर्धारण गर्नुहोस्; 1–2 रूढिवादी #7849 पूर्वनिर्धारित हो, उत्पादनको हार्ड अधिकतम होइन | एउटा प्रक्रियालाई 8× RAM र असीमित सङ्ख्या सीमा नदिनुहोस्             |
| वैकल्पिक: **साझा quota counters** का लागि `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                | Redis लाई साझा SQLite नठान्नुहोस् — त्यो होइन                        |
| प्रत्येक instance मा provider secrets प्रतिलिपि गर्नुहोस् (वा विभाजित dashboards स्वीकार गर्नुहोस्)                                                           | instance हरूभरि एउटै dashboard / एउटै call-log को अपेक्षा नगर्नुहोस् |
| अगाडि कुनै पनि load balancer राख्नुहोस्; API key वा session अनुसार sticky बनाउनु पर्याप्त हुन्छ                                                               | vendor-विशिष्ट size-aware middleware अनिवार्य नठान्नुहोस्            |

हार्डवेयर: प्रति-instance एकैसाथ चल्ने लामो `/v1/responses` को सङ्ख्या **मेमोरी-बजेट** को प्रश्न हो (heap + inflight-byte / #10110)। `N` स्वतन्त्र `DATA_DIR` हरूले अझै पनि heap हरू गुणा गर्छन्: host RAM ले `N × cgroup` धान्नुपर्छ, “N=8 भएको एउटै 16 Gi pod” होइन। एउटै SQLite फाइलमा कहिल्यै पनि `replicas > 1` नराख्नुहोस्।

Compose को नमुना (दुई heap, दुई volume — `deploy.replicas: 2` होइन):

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

In-process density (HTTP isolate बाहिर compression) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) हो। साझा टिकाउ state मा एउटा logical cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) हो।

## महत्त्वपूर्ण टिप्पणीहरू

- **SQLite WAL मोड:** OmniRoute ले पछिल्ला परिवर्तनहरूलाई `storage.sqlite` मा फिर्ता चेकपोइन्ट गर्न सकोस् भनेर `docker stop` लाई पूरा हुन दिनुपर्छ। समावेश गरिएका Compose फाइलहरूले पहिले नै 40s को रोक्ने ग्रेस अवधि सेट गरेका छन्। यदि तपाईंले इमेज सिधै चलाउनुहुन्छ भने, `--stop-timeout 40` कायम राख्नुहोस्।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** नियमित/लेख्नुअघिका ब्याकअपहरू बाह्य रूपमा व्यवस्थापन गरिएका छन् भने यसलाई `true` मा सेट गर्नुहोस्। अवस्थित-डेटाबेस माइग्रेसनहरूका लागि अझै पनि तिनको आफ्नै टिकाउ सुरक्षा स्न्यापसट र सामूहिक-माइग्रेसन सुरक्षा आवश्यक हुन्छ।
- **डेटा स्थायित्व:** कन्टेनर पुनः सुरु हुँदा पनि तपाईंको डेटाबेस, कुञ्जीहरू र कन्फिगरेसनहरू कायम राख्न सधैं `/app/data` मा भोल्युम माउन्ट गर्नुहोस्।
- **पोर्ट कन्फिगरेसन:** पूर्वनिर्धारित `20128` पोर्ट परिवर्तन गर्न `PORT` वातावरणीय भेरिएबल ओभरराइड गर्नुहोस्।

## यो पनि हेर्नुहोस्

- [VM डिप्लोयमेन्ट गाइड](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लोयमेन्ट गाइड](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io मा डिप्लोय गर्नुहोस्
- [वातावरण कन्फिगरेसन](../reference/ENVIRONMENT.md) — पूर्ण `.env` सन्दर्भ
