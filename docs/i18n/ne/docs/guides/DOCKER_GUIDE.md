# 🐳 Docker Guide — OmniRoute (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker परिनियोजनको पूर्ण सन्दर्भ। छिटो सुरु गर्न, [README को Docker खण्ड](../README.md#-docker) हेर्नुहोस्।

## विषयसूची

- [द्रुत सञ्चालन](#quick-run)
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
- [उपलब्धता: पूर्वनिर्धारित SQLite एकल-रेप्लिका हो](#availability-default-sqlite-is-single-replica)
- [Docker भित्रका Gemini क्षेत्रीय त्रुटिहरू](#gemini-regional-errors-inside-docker)
- [महत्त्वपूर्ण टिप्पणीहरू](#important-notes)

---

## द्रुत सञ्चालन

> **एउटै आदेशबाट सेल्फ-होस्ट गर्ने?**
> [सेल्फ-होस्ट मार्गदर्शिका](../getting-started/SELF_HOST_GUIDE.md) हेर्नुहोस् —
> `docker compose -f docker-compose.selfhost.yml up -d` (प्रकाशित इमेज +
> Redis, loopback-मात्र, प्रोफाइल छनोट आवश्यक छैन)। तलको द्रुत सञ्चालन
> अन्यत्र Redis चलाइरहेका प्रयोगकर्ताहरूका लागि एकल-कन्टेनर विधि हो।

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
# आधारभूत प्रोफाइल (CLI उपकरणहरू छैनन्)
docker compose --profile base up -d

# CLI प्रोफाइल (Claude Code, Codex, OpenClaw अन्तर्निर्मित)
docker compose --profile cli up -d

# होस्ट प्रोफाइल (मुख्यतः Linux का लागि; होस्ट CLI बाइनरीहरू पढ्न-मात्र मिल्ने गरी माउन्ट गर्छ)
docker compose --profile host up -d

# वेब प्रोफाइल (वेब-सत्र प्रदायकहरूका लागि Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI साइडकार संयोजन गर्नुहोस्
docker compose --profile cli --profile cliproxyapi up -d
```

## उपलब्ध प्रोफाइलहरू

OmniRoute मुख्य परिनियोजन संरचनाहरूका लागि Compose प्रोफाइलहरूसहित आउँछ। आफ्नो वातावरणसँग मेल खाने प्रोफाइल छान्नुहोस्।

| प्रोफाइल                | सेवा             | कहिले प्रयोग गर्ने                                                                                                                            | आदेश                                         |
| ----------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (पूर्वनिर्धारित) | `omniroute-base` | हेडलेस सर्भर / न्यूनतम रनटाइम, कुनै प्रदायक CLI समावेश गरिएको छैन                                                                             | `docker compose --profile base up -d`        |
| `cli`                   | `omniroute-cli`  | `omniroute providers/setup/doctor` र समावेश गरिएका CLI हरू (Codex, Claude Code, Droid, OpenClaw) प्रयोग गर्ने एजेन्टिक कार्यप्रवाहहरू         | `docker compose --profile cli up -d`         |
| `host`                  | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` आदि पढ्न-मात्र मिल्ने गरी माउन्ट गरेर होस्ट CLI हरूमा `network_mode`-जस्तो पहुँच चाहने Linux होस्टहरू | `docker compose --profile host up -d`        |
| `cliproxyapi`           | `cliproxyapi`    | अपस्ट्रिम CLI प्रोक्सीका लागि पोर्ट `8317` मा [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) साइडकार चलाउने                      | `docker compose --profile cliproxyapi up -d` |
| `web`                   | `omniroute-web`  | ब्राउजर आवश्यक पर्ने वेब-सत्र प्रदायकहरू: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` बिल्ड गर्छ, Chromium समावेश छ)         | `docker compose --profile web up -d`         |

> धेरै प्रोफाइलहरू संयोजन गर्न सकिन्छ: `docker compose --profile cli --profile cliproxyapi up -d`।

## OmniRoute Docker मा चल्दा होस्ट CLI उपकरणहरू कन्फिगर गर्ने

`omniroute setup-codex`, `setup-claude`, `config set <tool>` र ड्यासबोर्डको
**कन्फिग सेभ गर्नुहोस्** बटन सबैले `~/.codex/*.config.toml` जस्ता फाइलहरू लेख्छन्। ती पथहरू
CLI वास्तवमै चल्ने मेसिनमा मात्र अर्थपूर्ण हुन्छन्। तिनलाई कन्टेनरभित्र
चलाउँदा लेखाइ कन्टेनरकै होममा (`/home/node` —
इमेज `USER node` का रूपमा चल्छ) पुग्छ, जहाँ कुनै पनि होस्ट CLI ले त्यसलाई कहिल्यै पढ्दैन र
कन्टेनर पुनः सिर्जना हुनेबित्तिकै त्यो हट्छ।

OmniRoute ले यसलाई पत्ता लगाउँछ र तपाईंले प्रयोग गर्न नसक्ने सफलता रिपोर्ट गर्नुको सट्टा
निर्देशनसहित लेख्न अस्वीकार गर्छ: CLI `2` सहित बन्द हुन्छ, र API ले `422`
सहित `containerEphemeralTarget: true` जवाफ दिन्छ।

### सिफारिस गरिएको: CLI होस्टमा र OmniRoute Docker मा चलाउनुहोस्

कन्टेनरले API उपलब्ध गराउँछ; CLI ले तपाईंका होस्ट उपकरणहरू कन्फिगर गर्छ।

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI लाई कन्टेनरतर्फ निर्देशित गर्नुहोस्
omniroute setup-codex                      # तपाईंको होस्टको वास्तविक ~/.codex मा लेख्छ
```

Codex, Claude Code, Cursor वा यस्तै उपकरणहरू तपाईंको
ल्यापटपमा चल्दा यो सही विकल्प हो — र सामान्य सेटअप पनि यही हो।

### वैकल्पिक: होस्ट कन्फिग डाइरेक्टरीहरू bind-mount गर्नुहोस् (`host` प्रोफाइल)

यदि तपाईं कन्टेनर आफैँले तपाईंको होस्ट कन्फिग लेखोस् भन्ने चाहनुहुन्छ भने,
डाइरेक्टरीहरू माउन्ट गर्नुहोस् र `CLI_CONFIG_HOME` लाई माउन्ट रुटतर्फ निर्देशित गर्नुहोस्। `host` प्रोफाइलले
यो पहिले नै गर्छ:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount ले नै पथलाई विश्वसनीय बनाउँछ: OmniRoute ले
`/proc/self/mountinfo` पढ्छ र माउन्ट गरिएका पथहरूमा (र जसका चाइल्ड डाइरेक्टरीहरू माउन्ट गरिएका छन् ती
डाइरेक्टरीहरूमा पनि, जुन माथिको `/host-home` संरचना ठ्याक्कै हो) लेख्न अनुमति दिन्छ, तर
माउन्ट नगरिएका पथहरूमा भने अझै अस्वीकार गर्छ।

### वैकल्पिक निकास: कन्टेनरकै CLI हरू कन्फिगर गर्नुहोस् (संयमतापूर्वक प्रयोग गर्नुहोस्)

CLI हरू साँच्चिकै कन्टेनरभित्रै हुँदा (`cli` प्रोफाइल), लेखाइ
जानाजानी गरिएको हुन्छ। कुनै पनि `setup-*` कमान्डमा `--allow-container-write` दिनुहोस्, वा
सर्भरका लागि `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सेट गर्नुहोस्। लेखाइ
कन्टेनर पुनः सिर्जना हुँदा सुरक्षित नरहने चेतावनीसहित अगाडि बढ्छ।

> **सुरक्षा चेतावनी — `cli` प्रोफाइल + `docker.sock` माउन्ट।**
> कन्टेनरभित्रको स्वतः-अपडेटरले होस्ट डेमनबाट स्ट्याक पुनः सिर्जना गर्न सकोस् भनेर
> `cli` प्रोफाइलले `/var/run/docker.sock` लाई bind-mount गर्छ
> (`src/lib/system/autoUpdate.ts` ले उक्त सकेट जाँच गर्छ र त्यो अनुपस्थित हुँदा
> Docker पथ छोड्छ)। उक्त सकेट **होस्ट-root विश्वास
> सीमा** हो: त्यसमा पहुँच पाउने कुनै पनि चीजले होस्ट Docker डेमनलाई
> root का रूपमा सञ्चालन गर्छ — त्यसले होस्टको कुनै पनि कन्टेनर सिर्जना, निरीक्षण, रोक्न र हटाउन सक्छ।
> यसका प्रभावहरू:
>
> 1. **`cli` प्रोफाइलको पोर्टलाई नेटवर्कमा कहिल्यै खुला नगर्नुहोस्।** यसलाई
>    `127.0.0.1` मा प्रकाशित गर्नुहोस् (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN बाट पहुँचयोग्य `cli` प्रोफाइलले ड्यासबोर्ड-स्तरको कुनै पनि RCE लाई
>    पूर्ण होस्ट अतिक्रमणमा परिणत गर्छ।
> 2. **`cli` प्रोफाइलमा कुनै पनि अतिरिक्त होस्ट डाइरेक्टरी bind नगर्नुहोस्।**
>    Docker सकेटसँगै कुनै थप माउन्टले कन्टेनरलाई तपाईंको फाइलसिस्टम र होस्ट कन्फिगमा
>    पूर्ण पढ्ने/लेख्ने पहुँच दिन्छ। यदि कुनै उपकरणले प्रोजेक्ट हेर्न आवश्यक छ भने,
>    त्यसलाई CLI बाइनरीमार्फत स्थानीय रूपमा चलाउनुहोस् — त्यसलाई `cli` कन्टेनरमा
>    माउन्ट नगर्नुहोस्।
>
> यदि तपाईंलाई कन्टेनरभित्र स्वतः-अपडेट आवश्यक छैन भने, `cli` प्रोफाइल बन्द राख्नुहोस्
> (`COMPOSE_PROFILES=core,redis` वा अझ छोटो)। अन्य प्रोफाइलहरूले
> Docker सकेट माउन्ट गर्दैनन्।
>
> MITM सम्बन्धी खतरा मोडेलका लागि `docs/security/MITM-TPROXY-DECRYPT.md` (git मा; `/docs` मा कम्पाइल गरिएको छैन) हेर्नुहोस्,
> र `codex`/`claude-code`/`droid`/`openclaw` बाइनरीको उत्पत्ति शृङ्खलाका लागि
> `docs/security/SUPPLY_CHAIN.md` हेर्नुहोस्।

## Redis साइडकार

OmniRoute ले वितरित दर सीमक र साझा क्यासका लागि Redis मा निर्भर गर्छ। `redis` सेवा `docker-compose.yml` मा **सधैँ परिभाषित** हुन्छ (यसमा कुनै प्रोफाइल गेट छैन) र अन्य जुनसुकै प्रोफाइलसँगै सुरु हुन्छ।

| विवरण                  | मान                                            |
| ---------------------- | ---------------------------------------------- |
| इमेज                   | `redis:7-alpine`                               |
| कन्टेनरको नाम          | `omniroute-redis`                              |
| आन्तरिक पोर्ट          | `6379`                                         |
| होस्ट पोर्ट (ओभरराइड)  | `REDIS_PORT` (पूर्वनिर्धारित `6379`)           |
| होस्ट बाइन्ड (ओभरराइड) | `REDIS_BIND_HOST` (पूर्वनिर्धारित `127.0.0.1`) |
| भोल्युम                | `omniroute-redis-data` → `/data`               |
| स्वास्थ्य जाँच         | `redis-cli ping` (10s अन्तराल)                 |

सम्बन्धित वातावरण चरहरू:

- `REDIS_URL` — एपमा इन्जेक्ट गरिने जडान स्ट्रिङ (पूर्वनिर्धारित रूपमा `redis://redis:6379`)।
- `REDIS_PORT` — Redis कन्टेनरका लागि होस्ट-साइड पोर्ट म्यापिङ।
- `REDIS_BIND_HOST` — पोर्ट प्रकाशित हुने होस्ट इन्टरफेस। पूर्वनिर्धारित मान `127.0.0.1` हो।

> **पूर्वनिर्धारित रूपमा लुपब्याक किन:** साइडकार `requirepass` बिना चल्छ, र एप
> कन्टेनरहरू compose नेटवर्क (`redis:6379`) मार्फत यसमा पुग्छन् — प्रकाशित पोर्ट
> होस्ट-साइड उपकरणहरू (`redis-cli`, स्थानीय `npm run dev`) का लागि मात्र हो। यसलाई
> `0.0.0.0` मा प्रकाशित गर्दा प्रमाणीकरण नभएको Redis तपाईंको LAN का प्रत्येक होस्टमा खुला हुनेछ। यदि तपाईंले
> `REDIS_BIND_HOST=0.0.0.0` सेट गर्नुभयो भने, सेवा `command:` मा `--requirepass` पनि थप्नुहोस्।

**Redis असक्षम गर्न** सिफारिस गरिँदैन (दर सीमक इन-मेमोरी फल्ब्याकमा अवनत हुनेछ)। यदि तपाईंले गर्नैपर्छ भने, `docker-compose.yml` मा रहेको `redis:` सेवा ब्लक हटाउनुहोस्/टिप्पणी बनाउनुहोस् वा यसलाई शून्यमा स्केल गर्नुहोस्:

```bash
docker compose up -d --scale redis=0
```

## उत्पादन Compose

डेभसँगै चल्ने पृथक उत्पादन स्न्यापसटका लागि `docker-compose.prod.yml` प्रयोग गर्नुहोस्।

| विवरण                           | मान                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| फाइल                            | `docker-compose.prod.yml`                                                                    |
| पूर्वनिर्धारित ड्यासबोर्ड पोर्ट | `PROD_DASHBOARD_PORT=20130` (आन्तरिक `${DASHBOARD_PORT:-20128}` मा म्याप गरिएको)             |
| पूर्वनिर्धारित API पोर्ट        | `PROD_API_PORT=20131`                                                                        |
| इमेज                            | `omniroute:prod` (`runner-cli` टार्गेटबाट निर्माण गरिएको)                                    |
| Redis कन्टेनर                   | `omniroute-redis-prod` (`redis:8.6.2`, समर्पित `redis-prod-data` भोल्युम)                    |
| डेटा भोल्युम                    | `omniroute-prod-data` (नाम दिइएको, पुनर्निर्माणहरूमा कायम रहने)                              |
| स्वास्थ्य जाँचहरू               | `node healthcheck.mjs` + `redis-cli ping`, Redis को स्वास्थ्यमा गेट गरिएको `depends_on` सहित |

प्रयोग गर्ने तरिका:

```bash
# उत्पादन स्ट्याक निर्माण गरी सुरु गर्नुहोस्
docker compose -f docker-compose.prod.yml up -d --build

# लगहरू स्ट्रिम गर्नुहोस्
docker compose -f docker-compose.prod.yml logs -f

# बन्द गर्नुहोस् (भोल्युमहरू कायम राख्नुहोस्)
docker compose -f docker-compose.prod.yml down
```

उत्पादन स्ट्याक डेभ compose सँग समानान्तर रूपमा चल्छ (कन्टेनरका नाम, पोर्ट र भोल्युमहरू फरक छन्), त्यसैले उत्पादन चलिरहेकै अवस्थामा तपाईं स्थानीय रूपमा पुनरावृत्तिमूलक विकास जारी राख्न सक्नुहुन्छ।

## Dockerfile चरणहरू

रिपोजिटरीमा बहु-चरणीय Dockerfile (`Dockerfile`) समावेश छ। चारवटा चरण उपलब्ध छन्; आफ्नो प्रयोग अवस्थाका लागि सही `target` छान्नुहोस्।

| चरण           | आधार इमेज             | उद्देश्य                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | निर्भरताहरू स्थापना गर्छ (`npm ci --legacy-peer-deps`) र `npm run build` चलाउँछ (पूर्वनिर्धारित रूपमा Turbopack — तलको बिल्ड-समयका स्रोतहरू हेर्नुहोस्)                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Next.js को standalone आउटपुटसहितको उत्पादन रनटाइम। **कुनै पनि प्रदायक CLI समावेश गरिएको छैन।**                                                                                                                                                                                      |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` र विश्वव्यापी CLI हरू थप्छ: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`। **एजेन्ट-आधारित कार्यप्रवाहहरूका लागि यो छान्नुहोस्।**                                                                                          |
| `runner-web`  | `runner-base`         | वेब-सत्र प्रदायकहरूका लागि Playwright + Chromium ब्राउजर (`--with-deps`) थप्छ: `gemini-web`, `claude-web`, `claude-turnstile`। **ती प्रदायकहरू प्रयोग गर्दा यो छान्नुहोस्** — यसविना साधारण इमेज अनुरोधको समयमा असफल हुन्छ (Release Channels अन्तर्गतको `-web` टिप्पणी हेर्नुहोस्)। |

कुनै विशिष्ट लक्ष्य म्यानुअल रूपमा बिल्ड गर्नुहोस्:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### बिल्ड-समयका स्रोतहरू

तीनवटा बिल्ड आर्गुमेन्टले `builder` चरणको स्रोत लागत नियन्त्रण गर्छन्। तिनीहरू बिल्ड-समयका लागि मात्र हुन् —
`OMNIROUTE_MEMORY_MB` (तल) छुट्टै रनटाइम समायोजन हो।

| बिल्ड आर्गुमेन्ट            | पूर्वनिर्धारित | प्रभाव                                                                                         |
| --------------------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`            | `0` ले webpack प्रयोग गरेर बिल्ड गर्छ: अधिकतम मेमोरी कम, तर ढिलो। `1` ले Turbopack रोज्छ।      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`         | सुरु गरिएको `next build` का लागि V8 heap सीमा (`--max-old-space-size`)।                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`            | `CIRCLE_NODE_TOTAL` लाई मान दिन्छ; Next ले पृष्ठ-डेटा सङ्कलनका लागि `workers = N - 1` निकाल्छ। |

ठूलो builder मा बढाउनुपर्ने र सीमित स्रोत भएको बिल्ड **पछि**
`✓ Compiled successfully` मा बन्द हुँदा शङ्का गर्नुपर्ने सेटिङ `OMNIROUTE_BUILD_WORKERS` हो। प्रत्येक
पृष्ठ-डेटा worker छुट्टै प्रक्रिया हो, र मूल `next build` स्वयं पनि छुट्टै प्रक्रिया हो;
प्रत्यक्ष VPS पुनरुत्पादन (issue #7518) ले प्रत्येक प्रक्रियाको अधिकतम RSS
`NODE_OPTIONS` heap फ्ल्यागबाट स्वतन्त्र रूपमा ~4.5 GB भएको मापन गर्यो (Turbopack ले
V8 heap बाहिरको native/Rust मेमोरीमा कम्पाइल गर्छ)। `2` को पूर्वनिर्धारित मान (→ 1 worker, जम्मा 2
प्रक्रिया) प्रकाशन पाइपलाइनले प्रयोग गर्ने 16 GB / 4 vCPU GitHub-hosted runner हरूका लागि
निर्धारण गरिएको हो। `8` मा (→ 7 workers) उक्त runner को मेमोरी सकियो र
buildkit ले `ResourceExhausted: ... cannot allocate memory` सहित चरण असफल गरायो;
प्रति-प्रक्रिया RSS लाई अनुमान गर्नुको सट्टा प्रत्यक्ष रूपमा मापन गरेपछि `3` (→ 2 workers)
पनि पर्याप्त भएन। `tests/unit/docker-build-memory-budget.test.ts`
ले मापन गरिएको आँकडाविरुद्ध गणना गर्छ र कुनै पनि समायोजनले
runner को क्षमता नाघेमा असफल हुन्छ।

Turbopack ले V8 heap को **बाहिर** रहने native Rust मेमोरीमा कम्पाइल गर्छ, त्यसैले
`OMNIROUTE_BUILD_MEMORY_MB` ले यसको सीमा निर्धारण गर्दैन। मेमोरी सीमा भएको host मा
OOM killer ले कुनै त्रुटि पाठविनै बिल्डलाई SIGKILL गर्छ — यो
`Creating an optimized production build` को बीचमै रोकिन्छ, जसले मेमोरी समाप्त भएको भन्दा
अड्किएको जस्तो देखाउँछ। त्यसैले `npm run dev` / `npm run build` मा
Turbopack कोडको पूर्वनिर्धारित विकल्प भए पनि `Dockerfile` ले webpack लाई
पूर्वनिर्धारित (`OMNIROUTE_USE_TURBOPACK=0`) बनाउँछ: कुनै बिल्ड आर्गुमेन्टविनाको सामान्य `docker build .`
(Railway र अन्य एक-क्लिक host हरूले चलाउने) मेमोरी-सीमित builder मा
चुपचाप बन्द हुनु हुँदैन। प्रकाशित इमेजहरूले `docker-publish.yml` मा पहिले नै
`OMNIROUTE_USE_TURBOPACK=0` स्पष्ट रूपमा पास गर्छन्। प्रशस्त RAM भएको builder मा छिटो
बिल्डका लागि Turbopack रोज्नुहोस्:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम छ, त्यसैले `next build` ले मूल **र** worker
प्रक्रिया चलाउँछ र प्रत्येकले `OMNIROUTE_BUILD_MEMORY_MB` लाई अलग-अलग पालना गर्छ। कन्टेनरको
सीमा उक्त मानको एक गुणाभन्दा लगभग दुई गुणा बढी निर्धारण गर्नुहोस्।

यस tree मा मापन गरिएको (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | कन्टेनर सीमा   | परिणाम                            |
| --------- | -------------- | --------------------------------- |
| Turbopack | 8 GiB / 16 GiB | दुवैमा कुनै सन्देशविना OOM-killed |
| webpack   | 8 GiB          | build worker SIGKILLed भयो        |
| webpack   | 12 GiB         | सफल भयो, अधिकतम 11.1 GiB पुग्यो   |

### रनटाइमका पूर्वनिर्धारित मानहरू

`runner-base` द्वारा export गरिएका पूर्वनिर्धारित मानहरू: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker मा मेमोरीको व्यवहार:

- इमेजले `OMNIROUTE_MEMORY_MB=1024` सेट गर्छ र त्यसबाट `NODE_OPTIONS=--max-old-space-size=1024` निर्धारण गर्छ।
- वास्तविक सर्भर प्रक्रिया standalone launcher द्वारा सुरु हुन्छ, जसले `OMNIROUTE_MEMORY_MB` पढ्छ र `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` थप्छ।
- Node ले दोहोरिएको अन्तिम `--max-old-space-size` मान प्रयोग गर्छ, त्यसैले `OMNIROUTE_MEMORY_MB` सेट गर्दा प्रभावकारी Docker heap सीमा नियन्त्रण हुन्छ।
- इमेजले यसलाई सधैँ सेट गर्ने भएकाले, launcher को आफ्नै RAM-अनुसार समायोजित fallback Docker अन्तर्गत कहिल्यै लागू हुँदैन। workload का लागि यसलाई स्पष्ट रूपमा बढाउनुहोस् (तलको तालिका)। coding-agent `/v1/responses` का लागि `2048` अझै पनि अत्यन्त सानो छ।

### coding agents का लागि runtime RAM

1 GiB को Docker पूर्वनिर्धारित मान dashboard/हल्का chat का लागि न्यूनतम सीमा हो, production आकार होइन। लामो `POST /v1/responses` body हरूले (सयौँ messages, दर्जनौँ tools) compression का क्रममा memory भित्र धेरै graphs कायम राख्छन्। एकै समयमा चल्ने करिब ~3 MiB / ~750k-token का दुई requests ले **12 GiB** old-space मा V8 लाई रोकिदिएका छन् (`FATAL ERROR: Reached heap limit`) र 16 GiB cgroup OOM पनि निम्त्याएका छन्। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) हेर्नुहोस्।

**cgroup `--memory` लाई heap भन्दा माथि** निर्धारण गर्नुहोस् — native buffers, SQLite, र compression intermediates V8 बाहिर रहन्छन्।

| Workload                                    | `OMNIROUTE_MEMORY_MB`              | Container / cgroup               | टिप्पणी                                                                                                      |
| ------------------------------------------- | ---------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Dashboard, एउटा हल्का chat                  | `1024` (इमेजको पूर्वनिर्धारित मान) | ≥2 GiB                           |                                                                                                              |
| एउटा coding agent (Claude/Codex/Grok)       | `8192`                             | ≥10 GiB                          | सामान्य single-session `/v1/responses`                                                                       |
| एकै समयमा चल्ने दुईवटा लामो `/v1/responses` | `10240`–`12288`                    | ≥12–16 GiB                       | करिब 12 GiB heap मा V8 रोकिएको मापन गरिएको छ                                                                 |
| एकै समयमा चल्ने तीन वा बढी लामो contexts    | एउटै process मा नचलाउनुहोस्        | क्रमिक रूपमा चलाउनुहोस् / थप RAM | पूर्वनिर्धारित heavyweight admission मा 1 in-flight हुन्छ; RAM नबढाई यसलाई बढाउँदा समस्या फेरि उत्पन्न हुन्छ |

bare metal मा `omniroute serve` ले `OMNIROUTE_MEMORY_MB` **सेट नभएको** अवस्थामा RAM को करिब 35% (`[512, 4096]` भित्र सीमित) अनुसार समायोजन गर्छ। Docker ले सधैँ `1024` सेट गर्छ, त्यसैले official image मा उक्त समायोजन कहिल्यै चल्दैन।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## महत्वपूर्ण वातावरणीय चरहरू

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) मा दस्तावेजीकरण गरिएका पूर्वनिर्धारित मानहरूबाहेक, Docker अन्तर्गत चलाउँदा निम्न चरहरू सबैभन्दा महत्त्वपूर्ण हुन्छन्:

| चर                            | उद्देश्य                                                                                                                                                                                                                                                                          | पूर्वनिर्धारित मान              |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ब्रिजका लागि साझा गोप्य मान। **उत्पादन वातावरणमा अनिवार्य** — यसलाई बलियो अनियमित स्ट्रिङमा सेट गर्नुहोस्।                                                                                                                                                              | सेट नगरिएको (उपलब्ध गराउनैपर्छ) |
| `REDIS_URL`                   | दर सीमक / क्यास ब्याकइन्डका लागि जडान स्ट्रिङ                                                                                                                                                                                                                                     | `redis://redis:6379`            |
| `REDIS_PORT`                  | समावेश गरिएको Redis कन्टेनरका लागि होस्ट-साइड पोर्ट                                                                                                                                                                                                                               | `6379`                          |
| `REDIS_BIND_HOST`             | समावेश गरिएको Redis पोर्ट प्रकाशित हुने होस्ट इन्टरफेस (तपाईंले AUTH नथपेसम्म लुपब्याक)                                                                                                                                                                                           | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | स्व-अद्यावधिक कार्यप्रवाहहरूका लागि `cli` प्रोफाइलमा `/workspace/omniroute` मा माउन्ट गरिने होस्ट पथ                                                                                                                                                                              | `.` (हालको डाइरेक्टरी)          |
| `OMNIROUTE_MEMORY_MB`         | Docker स्ट्यान्डअलोन सर्भरका लागि रनटाइम Node हिपको अधिकतम सीमा; यसले माथिको इमेज पूर्वनिर्धारित मानलाई अधिलेखन गर्छ। कोडिङ एजेन्टहरू: `8192`+ ([रनटाइम RAM](#runtime-ram-for-coding-agents) हेर्नुहोस्)।                                                                         | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | ड्यासबोर्ड (20128) र API (20129) का लागि एक्सपोज गरिएका पोर्टहरू अधिलेखन गर्छ                                                                                                                                                                                                     | `20128` / `20129`               |
| `APP_BIND_HOST`               | docker-compose ले ड्यासबोर्ड/API/live-WS पोर्टहरू प्रकाशित गर्ने होस्ट इन्टरफेस। `REQUIRE_API_KEY=false` (पूर्वनिर्धारित) हुँदा, `0.0.0.0` ले बेनामी `/v1` प्रोक्सीलाई LAN मा एक्सपोज गर्छ — `REQUIRE_API_KEY=true` हुँदा वा अगाडि रिभर्स प्रोक्सी हुँदा मात्र विस्तार गर्नुहोस्। | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | docker-compose ले `cliproxyapi` साइडकार प्रकाशित गर्ने होस्ट इन्टरफेस — यसको डेटा भोल्युममा प्रदायकका प्रमाणहरू राखिन्छन्।                                                                                                                                                        | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | रनटाइम प्लगइन स्क्यानरले पढ्ने र प्लगइनहरू स्थापना गर्ने डाइरेक्टरी। प्लगइनहरू bind-mount गरिएको अवस्थामा यसलाई सेट गर्नुहोस्: पूर्वनिर्धारित मानले `HOME` लाई पछ्याउँछ, जुन इमेजले export नगर्न सक्छ।                                                                            | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | एप रिभर्स प्रोक्सीपछाडि प्रकाशित हुँदा प्रयोग हुने URL उपपथ (उदाहरण: `/omniroute`)                                                                                                                                                                                                | _(खाली = रुट)_                  |
| `NEXT_PUBLIC_BASE_URL`        | उपपथसहितको सार्वजनिक ब्राउजर मूल ठेगाना (उदाहरण: `https://host/omniroute`)                                                                                                                                                                                                        | सेट नगरिएको                     |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` का लागि होस्ट-साइड ड्यासबोर्ड पोर्ट                                                                                                                                                                                                                     | `20130`                         |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` साइडकारका लागि होस्ट-साइड पोर्ट                                                                                                                                                                                                                                     | `8317`                          |

## उपपथमा रिभर्स प्रोक्सी (Traefik / nginx)

Next.js को `basePath` स्ट्यान्डअलोन बन्डलमा कम्पाइल गरिएको हुन्छ। OmniRoute ले एपको रुटमा रहेको एउटा सेन्टिनल फाइलमा बिल्ड हुँदा समावेश गरिएको मान रेकर्ड गर्छ (`npm run build` का क्रममा लेखिन्छ; `scripts/docker/ensure-docker-base-path.mjs` द्वारा पढिन्छ) र कन्टेनर सुरु हुँदा त्यसलाई `OMNIROUTE_BASE_PATH` सँग तुलना गर्छ। मानहरू फरक हुँदा र इमेज डोमेन रुटका लागि बिल्ड गरिएको हुँदा, `node dev/run-standalone.mjs` चल्नुअघि एन्ट्रीपोइन्टले स्ट्यान्डअलोन म्यानिफेस्टहरू, समावेश गरिएका `basePath`/`assetPrefix` लिटरलहरू (Next 16 ले SSR एसेट URL हरू `assetPrefix` बाट मात्र रेन्डर गर्छ — प्याचरले उपपथलाई यसमा पनि प्रतिबिम्बित गर्छ), बिल्डमा समावेश गरिएका `/_next/static` एसेट URL हरू (क्लाइन्ट-रेफरेन्स म्यानिफेस्टहरू, मिडिया इम्पोर्टहरू, पहिले नै रेन्डर गरिएका त्रुटि पृष्ठहरू) र क्लाइन्ट `process.env` शिमलाई पुनर्लेखन गर्छ।

### Compose बिल्ड (सिफारिस गरिएको)

दुवै भेरिएबल `.env` मा सेट गर्नुहोस्, त्यसपछि इमेज र रनटाइम मिल्ने गरी पुनः बिल्ड गर्नुहोस्:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` ले `OMNIROUTE_BASE_PATH` लाई Docker build-arg र रनटाइम वातावरण भेरिएबल दुवैका रूपमा फर्वार्ड गर्छ।

### पहिले नै बिल्ड गरिएको रुट इमेज + रनटाइम उपपथ

प्रकाशित `diegosouzapw/omniroute:*` इमेजहरू डोमेन रुटका लागि बिल्ड गरिएका हुन्छन्। तपाईं अझै पनि रनटाइममा `OMNIROUTE_BASE_PATH` सेट गर्न सक्नुहुन्छ; कन्टेनरले स्टार्टअपमा एकपटक बन्डल प्याच गर्छ। यसलाई मिल्दो सार्वजनिक ओरिजिनसँग जोडा बनाउनुहोस्:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

रिभर्स प्रोक्सीलाई **पूर्ण** बाह्य पथ फर्वार्ड गर्ने गरी कन्फिगर गर्नुहोस् (प्रिफिक्स नहटाउनुहोस्)। Traefik ले `StripPrefix` बिना `PathPrefix(`/omniroute`)` लाई कन्टेनरतर्फ रुट गर्नुपर्छ, ताकि Next.js ले `/omniroute/...` प्राप्त गरोस् र `/omniroute/_next/...` बाट एसेटहरू सर्भ गरोस्।

Docker हेल्थचेकले सक्रिय `OMNIROUTE_BASE_PATH` प्रिफिक्स गरिएको हलुका `/healthz` लाइफसाइकल एन्डपोइन्ट जाँच गर्छ। मानवीय/ड्यासबोर्ड निदानका लागि `/api/monitoring/health` उपलब्ध रहन्छ; कन्टेनर HEALTHCHECK लाई फेरि त्यसतर्फ निर्देशित गर्न (उदाहरणका लागि, गहन स्वास्थ्य जाँच लागू गर्न), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट गर्नुहोस्। त्यो पथ एउटा **गहन** जाँच हो (DB + मोनिटरिङ सारांश) — तपाईंले पुनः सक्रिय गर्न रोज्नुभयो भने Docker को कम आवृत्तिमा चल्ने `HEALTHCHECK` का लागि उपयुक्त हुन्छ, तर Kubernetes का `livenessProbe` अन्तरालहरूका लागि **होइन**।

अर्केस्ट्रेटरहरूका लागि (Kubernetes, Nomad, आदि):

| जाँच              | प्राथमिकता दिनुहोस्                                                      | नअपनाउनुहोस्                                      |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------------------------- |
| लाइभनेस           | HTTP `GET /livez`, वा मुख्य पोर्टमा TCP (`PORT`, पूर्वनिर्धारित `20128`) | लाइभनेसका रूपमा `/api/monitoring/health`          |
| रेडिनेस           | HTTP `GET /healthz`                                                      | इभेन्ट लुप व्यस्त हुँदा मृत ठान्ने कडा टाइमआउटहरू |
| गहन / ब्ल्याकबक्स | `/api/monitoring/health`                                                 | —                                                 |

`/healthz` ले प्रोसेस लाइफसाइकल (`ok` / `starting` / `stopping`) रिपोर्ट गर्छ। `/livez` ले प्रोसेस जीवित छ कि छैन मात्र जाँच्छ (ह्यान्डलर चल्न सक्दा सधैँ 200; यसले रेडिनेसको प्रतीक्षा गर्दैन)। दुवै अझै पनि अनुरोध ह्यान्डलिङकै Node इभेन्ट लुपमा चल्छन्, त्यसैले CPU-बाउन्ड क्याटलग वा कम्प्रेसन कार्यले तिनलाई ढिलो गराउन सक्छ — व्यस्त ≠ मृत। HTTP जाँचहरू टाइमआउट भएमा TCP लाइभनेसलाई प्राथमिकता दिनुहोस्। जाँचसम्बन्धी पूर्ण मार्गदर्शन:
[मोनिटरिङ गाइड — Kubernetes जाँचसम्बन्धी सिफारिसहरू](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)।

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
      # OAuth कलब्याकहरू, ड्यासबोर्ड लिङ्कहरू र उत्पन्न गरिएका सार्वजनिक URL हरूका लागि ब्राउजरले देख्ने ओरिजिन।
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # निर्धारित कार्यहरू / स्वयं-फेचहरूका लागि आन्तरिक सर्भर-देखि-सर्भर URL।
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

Caddy ले अपस्ट्रिम कन्टेनरका लागि मानक फर्वार्डिङ हेडरहरू सेट गर्छ। OmniRoute ले OAuth कलब्याकहरू र उत्पन्न गरिएका सार्वजनिक
लिङ्कहरूका लागि `NEXT_PUBLIC_BASE_URL` लाई प्रामाणिक सार्वजनिक ओरिजिनको रूपमा प्रयोग गर्छ; प्रमाणीकरण गरिएका ड्यासबोर्ड लेखनहरूले समान-ओरिजिन अनुरोधहरूका साथै सत्र-बाउन्ड CSRF
सुरक्षा प्रयोग गर्छन्। स्पष्ट
कन्फिगरेसनको सट्टा विश्वसनीय फर्वार्डेड हेडरहरूबाट सार्वजनिक ओरिजिन निकाल्न OmniRoute लाई जानाजानी प्रयोग गराउन चाहने उन्नत डिप्लोयमेन्टहरूमा मात्र `OMNIROUTE_TRUST_PROXY` सक्षम गर्नुहोस्।

## Cloudflare Quick Tunnel

Docker डिप्लोयमेन्टहरूका लागि ड्यासबोर्ड समर्थनले `Dashboard → Endpoints` मा एक-क्लिक **Cloudflare Quick Tunnel** समावेश गर्छ। पहिलो पटक सक्षम गर्दा आवश्यक परेको अवस्थामा मात्र `cloudflared` डाउनलोड हुन्छ, तपाईंको हालको `/v1` एन्डपोइन्टमा अस्थायी टनेल सुरु हुन्छ र उत्पन्न गरिएको `https://*.trycloudflare.com/v1` URL तपाईंको सामान्य सार्वजनिक URL को ठीक तल देखाइन्छ।

एन्डपोइन्ट टनेल प्यानलहरू (Cloudflare, Tailscale, ngrok) सक्रिय टनेलको अवस्था परिवर्तन नगरी `Settings → Appearance` बाट देखाउन वा लुकाउन सकिन्छ।

### टनेलसम्बन्धी टिप्पणीहरू

- Quick Tunnel URL हरू अस्थायी हुन्छन् र प्रत्येक पुनःसुरुआतपछि परिवर्तन हुन्छन्।
- OmniRoute वा कन्टेनर पुनःसुरु भएपछि Quick Tunnel हरू स्वतः पुनर्स्थापित हुँदैनन्। आवश्यक पर्दा तिनीहरूलाई ड्यासबोर्डबाट पुनः सक्षम गर्नुहोस्।
- व्यवस्थित इन्स्टलले हाल `x64` / `arm64` मा Linux, macOS र Windows समर्थन गर्छ।
- सीमित कन्टेनर वातावरणहरूमा अनावश्यक QUIC UDP बफर चेतावनीहरूबाट बच्न व्यवस्थित Quick Tunnel हरूले पूर्वनिर्धारित रूपमा HTTP/2 ट्रान्सपोर्ट प्रयोग गर्छन्। फरक ट्रान्सपोर्ट चाहनुहुन्छ भने `CLOUDFLARED_PROTOCOL=quic` वा `auto` सेट गर्नुहोस्।
- Docker इमेजहरूले प्रणालीका CA रुटहरू समावेश गर्छन् र तिनलाई व्यवस्थित `cloudflared` मा पठाउँछन्, जसले टनेल कन्टेनरभित्र बुटस्ट्र्याप हुँदा TLS विश्वाससम्बन्धी विफलताहरूबाट जोगाउँछ।
- OmniRoute ले डाउनलोड गर्नुको सट्टा पहिल्यै उपलब्ध बाइनरी प्रयोग गरोस् भन्ने चाहनुहुन्छ भने `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` सेट गर्नुहोस्।

## इमेज ट्यागहरू

| इमेज                     | ट्याग    | आकार   | विवरण                                               |
| ------------------------ | -------- | ------ | --------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | उच्चतम **प्रकाशित** स्थिर SemVer (git `main` होइन)  |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps का लागि यस वर्गको ट्यागलाई निश्चित गर्नुहोस् |

बहु-प्लेटफर्म म्यानिफेस्ट: `linux/amd64` + `linux/arm64` नेटिभ (Apple Silicon, AWS Graviton, Raspberry Pi)। Docker ले मिल्दो आर्किटेक्चर स्वचालित रूपमा चयन गर्छ; ARM होस्टहरूमा AMD64 इमुलेसन बलपूर्वक प्रयोग गर्न आवश्यक भए `--platform linux/amd64` पास गर्नुहोस्।

### रिलिज च्यानलहरू

OmniRoute ले स्थिर रिलिजहरू, सक्रिय रिलिज-ब्रान्च परीक्षण र विकास बिल्डहरूका लागि छुट्टाछुट्टै Docker च्यानलहरू प्रकाशित गर्छ।

| च्यानल                          | स्रोत                                     | परिवर्तनशीलता                  | सिफारिस गरिएको प्रयोग                                                                                 |
| ------------------------------- | ----------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | हस्ताक्षरित/संस्करणयुक्त रिलिज            | अपरिवर्तनीय                    | ठ्याक्कै निश्चित रिलिजमा पिन गरिएका उत्पादन डिप्लोयमेन्टहरू                                           |
| `:latest` / `:latest-web`       | उच्चतम **प्रकाशित** स्थिर SemVer          | परिवर्तनशील स्थिर पोइन्टर      | SemVer प्रकाशन कार्यपछि स्थिर रिलिजहरू पछ्याउँछ — `main` वा अप्रकाशित `release/v*` कमिटहरू पछ्याउँदैन |
| `:next` / `:next-web`           | हालको पूर्वनिर्धारित `release/v*` ब्रान्च | परिवर्तनशील प्रि-रिलिज पोइन्टर | सक्रिय रिलिज ब्रान्चमा समावेश भइसकेका तर अझै स्थिर रिलिजमा नआएका सुधारहरूको परीक्षण                   |
| `:main` / `:main-web`           | `main` ब्रान्च                            | परिवर्तनशील विकास पोइन्टर      | विकास र एकीकरण परीक्षणका लागि मात्र                                                                   |

#### वेब-सत्र प्रदायकहरू: `-web` इमेजहरू

माथिका प्रत्येक च्यानलको `-web` ट्याग पनि हुन्छ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), जुन `runner-web` चरणबाट निर्माण गरिएको हुन्छ — उही इमेजमा Playwright र Chromium ब्राउजर थपिएको। साधारण इमेज Chromium **बिना** उपलब्ध हुन्छ; `gemini-web`, `claude-web` र `claude-turnstile` लाई यसको आवश्यकता पर्छ।

विफलता सुरुआतको समयमा नभई पछि हुन्छ: ती प्रदायकहरूले आफ्ना मोडेलहरू सूचीबद्ध गर्छन् र ड्यासबोर्डमा जडान भएको देखिन्छन्, तर पहिलो अनुरोध मात्र निम्न त्रुटिसहित विफल हुन्छ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

यदि तपाईं ती प्रदायकहरू प्रयोग गर्नुहुन्छ भने, आफूले हाल प्रयोग गरिरहेकै च्यानलको `-web` ट्याग पुल गर्नुहोस् — अरू केही परिवर्तन हुँदैन। npm/CLI इन्स्टलमा (Docker इमेज बिना), त्यसको समतुल्य छुटेको अंश ब्राउजर बाइनरी हो: होस्टमा `npx playwright install chromium` चलाउनुहोस्।

#### प्रि-रिलिज च्यानल प्रयोग गर्ने तरिका

`next` च्यानल हालको पूर्वनिर्धारित `release/v*` शाखामा हुने प्रत्येक push मा पुनः निर्माण गरिन्छ र AMD64 तथा ARM64 दुवैका लागि प्रकाशित गरिन्छ। पुराना मर्मतसम्भार शाखाहरूले यसलाई अधिलेखन गर्न सक्दैनन्। अर्को स्थिर tag सिर्जना हुनुअघि सक्रिय release शाखामा merge गरिएका सुधारहरूका लागि यस च्यानलले pull गर्न मिल्ने image उपलब्ध गराउँछ।

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose का लागि, चयन गरिएको profile ले प्रयोग गर्ने image tag लाई override गर्नुहोस्, त्यसपछि service लाई pull गरी पुनः सिर्जना गर्नुहोस्:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### सुरक्षा र rollback

`next` परिवर्तनशील pre-release च्यानल हो। सक्रिय release शाखामा कुनै पनि push हुँदा यो परिवर्तन हुन सक्छ र यसलाई **production प्रयोगका लागि समर्थन गरिएको छैन**। कुनै निश्चित build को मूल्याङ्कन गर्दा image digest लाई pin गर्नुहोस्:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

परीक्षण गर्नुअघि OmniRoute data volume वा bind-mounted data directory को backup लिनुहोस्। rollback गर्न, पहिले प्रयोग गरिएको स्थिर version वा digest पुनर्स्थापना गर्नुहोस् र container पुनः सिर्जना गर्नुहोस्:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release शाखाको build ले कहिल्यै `latest` लाई सार्न सक्दैन; योग्य स्थिर semantic version ले मात्र स्थिर pointer लाई प्रवर्द्धन गर्न सक्छ। `next` image हरूमा release image inspection र अवरोध गर्ने CRITICAL-vulnerability gate कायम रहन्छ।

**`latest` ले git को नवीनताको प्रत्याभूति गर्दैन।** `main` वा सक्रिय `release/v*` शाखामा merge गरिएका सुधारहरू स्थिर SemVer image प्रकाशित भएर publish job ले `:latest` लाई प्रवर्द्धन नगरेसम्म **`:latest` मा हुँदैनन्** (त्यो SemVer कै समान digest)। GitHub मा सुधार पहिले नै देखिए पनि `latest` स्थिर देखिएमा, release शाखा परीक्षण गर्न `:next` pull गर्नुहोस् वा SemVer tag को प्रतीक्षा गर्नुहोस्।

| तपाईंको आवश्यकता                                                                     | प्रयोग गर्नुहोस्                             |
| ------------------------------------------------------------------------------------ | -------------------------------------------- |
| परिवर्तन हुन नहुने GitOps / production                                               | `:X.Y.Z` (वा image digest) लाई pin गर्नुहोस् |
| प्रकाशित स्थिर release हरू पछ्याउने र प्रत्येक release मा पुनः सिर्जना स्वीकार गर्ने | `:latest`                                    |
| अप्रकाशित `release/v*` commit हरू परीक्षण गर्ने                                      | `:next` (production का लागि होइन)            |
| `main` परीक्षण गर्ने                                                                 | `:main` (production का लागि होइन)            |

## उपलब्धता: पूर्वनिर्धारित SQLite एकल-प्रतिकृति हो

मानक Docker / Kubernetes OmniRoute भनेको **एउटा Node प्रक्रिया + एउटा SQLite writer** हो। यस topology मा उच्च उपलब्धता **समर्थित छैन**।

| बाधा                                      | परिणाम                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| एकल writer                                | एउटै SQLite फाइलमा धेरै प्रतिकृतिहरू **नचलाउनुहोस्**। त्यसो गर्दा DB बिग्रन्छ।                                                                                                                                                                                                                                                         |
| पुनःसिर्जना / पुनःसुरु / HEALTHCHECK kill | प्रक्रियामा रहेका SSE, dashboard session र memory भित्रको state को **पूर्ण अवरोध**। जडान भएका प्रत्येक client को जडान टुट्छ। endpoint खाली भएको अवधिमा नयाँ request हरूले OmniRoute JSON होइन, reverse-proxy **`502 Bad Gateway: Unknown error`** प्राप्त गर्छन् — client हरूले यसलाई provider failure बाट छुट्याउन सक्दैनन् (#11015)। |
| `/healthz` कै event loop                  | व्यस्त catalog वा compression tick ले probe ढिलो गराउन सक्छ; त्यसपछि छोटो timeout ले **एक मात्र** प्रतिकृति पुनःसुरु गर्छ।                                                                                                                                                                                                             |

**Probe matrix** ([Kubernetes probe सिफारिसहरू](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) पनि हेर्नुहोस्):

| Probe         | लक्ष्य                                                          | प्रयोग नगर्नुहोस्                                       |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| Liveness      | `PORT` मा TCP (पूर्वनिर्धारित `20128`), वा soft HTTP `/healthz` | `/api/monitoring/health`                                |
| Readiness     | HTTP `GET /healthz`                                             | event-loop व्यस्त हुनुलाई बन्द भएको मान्ने छोटो timeout |
| Deep / humans | `/api/monitoring/health`                                        | स्वचालित kubelet liveness                               |

**अपग्रेडहरू:** प्रत्येक session को जडान टुट्ने अपेक्षा गर्नुहोस्। सम्भव भए client हरू drain गर्नुहोस्; पूर्वनिर्धारित SQLite मा rolling update हुँदैन। Compose को `restart: unless-stopped` र Docker को `HEALTHCHECK` ले container Unhealthy हुँदा एक मात्र प्रक्रियालाई पनि प्रतिस्थापन गर्नेछ — प्रभावको दायरा उही हुन्छ।

**एकल प्रतिकृति** का लागि Kubernetes snippet (Recreate आवश्यक छ; एउटै SQLite फाइल प्रयोग गर्दा `replicas` नबढाउनुहोस्):

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

`preStop` sleep ले SIGTERM अघि kube लाई Service endpoint हटाउन समय दिन्छ, जसले गर्दा **नयाँ** traffic बन्द हुँदै गरेको प्रक्रियामा पुग्न रोकिन्छ। प्रक्रियामा रहेको `/v1/responses` SSE लाई heavyweight admission lease मार्फत `SHUTDOWN_TIMEOUT_MS` (पूर्वनिर्धारित 30s) सम्म drain गरिन्छ (#11015)। अझै पनि प्रक्रियामा पुग्ने नयाँ request हरूले `503` + `Retry-After: 5` प्राप्त गर्छन्। प्रतिस्थापन Ready नहुँदासम्म रहने Recreate को खाली-endpoint अन्तराल पूर्ण अवरोधकै रूपमा रहन्छ — यो SQLite topology को विशेषता हो, probe को गलत configuration होइन।

बाह्य Postgres / multi-writer HA एउटा दस्तावेजीकृत मानक मार्ग **होइन**। तपाईंलाई HA आवश्यक छ भने एकल प्रतिकृति कायम राख्नुहोस् वा project ले छुट्टै परीक्षण र दस्तावेजीकरण गरेको topology चलाउनुहोस्। Postgres/MySQL सम्बन्धी काम [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) मा भइरहेको छ। त्यो उपलब्ध नहुँदासम्म, **ठूलो** `/v1/responses` क्षमता बढाउने एक मात्र समर्थित तरिका N वटा स्वतन्त्र प्रक्रिया (अर्को खण्ड) हो, एउटै volume मा `replicas > 1` होइन।

## स्केल-आउट: N स्वतन्त्र प्रक्रियाहरू

एउटा Node प्रक्रिया भनेको **एउटा V8 heap** हो। एकअर्कासँग ओभरल्याप हुने ~3 MiB / ~750k-token का दुई coding-agent `POST /v1/responses` (RTK + Caveman) अनुरोधहरूले ~12 Gi मा उक्त heap लाई अबोर्ट गर्छन् (`FATAL ERROR: Reached heap limit`) र 16 Gi cgroup मा OOM गराउन सक्छन्। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) हेर्नुहोस्। त्यो मापन **मेमोरी-बजेट** चेतावनी हो, एकैसाथ चल्ने लामा `/v1/responses` का लागि उत्पादनको अधिकतम दुईको कठोर सीमा होइन। हेभिवेट च्याटको प्रवेश त्यही V8/cgroup सीमाबाट आकार निर्धारण गरिएको स्वतः-व्युत्पन्न इनजेस्ट बाइट बजेट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) द्वारा नियन्त्रित हुन्छ — पहिल्यै आकार निर्धारण गरिएको प्रक्रियामा यसलाई बढाएर ओभरराइड गर्दा (वा पुरानो `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` अनुरोध-सङ्ख्या सीमा सेट गर्दा) अबोर्ट फेरि देखा पर्छ। साना च्याटहरू, `/healthz`, `/v1/models`, र MCP उक्त सीमाभित्र **पर्दैनन्**।

### एक प्रक्रिया: दुईभन्दा बढी लामा `/v1/responses`

एउटा **स्वस्थ** प्रक्रिया (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` भन्दा कम, पूर्वनिर्धारित `0.75`) ले प्रक्रिया-व्यापी इनफ्लाइट-बाइट बजेट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) मा अझै ठाउँ हुँदा एकैसाथ दुईभन्दा बढी लामा `POST /v1/responses` चलाउन **सक्छ**। `OMNIROUTE_CHAT_LARGE_BODY_BYTES` बराबर वा त्यसभन्दा ठूला बडीहरू (पूर्वनिर्धारित 256 KiB) ले संरचनात्मक रूपमा जटिल अनुरोधहरूले जस्तै उही हेभिवेट लिज लिन्छन् र उही [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` एस्केप (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) प्रयोग गर्छन्। एकैसाथ चल्ने दर्जनौँ लामा SSE क्लाइन्टहरू (अपरेटरहरूलाई प्रायः 40–50 चाहिन्छ) **मेमोरी-बजेट** सम्बन्धी प्रश्न हो — heap + प्राथमिक/headroom स्लटहरू + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` लाई उचित आकार दिनुहोस् — यो उत्पादनको कठोर “अधिकतम 2” सीमा होइन। दबाबमा परेको heap ले अझै पनि पुनः प्रयास गर्न मिल्ने `503` सहित अनुरोधहरू हटाउँछ, जसले गर्दा #7849 फेरि देखा पर्दैन।

**heap हरू गुणा गर्न** (स्वतन्त्र V8 old-spaces) **हाल**:

| गर्नुहोस्                                                                                                                                                        | नगर्नुहोस्                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **N containers/pods** चलाउनुहोस्, प्रत्येकको **आफ्नै** `DATA_DIR` / volume सहित                                                                                  | एउटै SQLite फाइलमा `replicas > 1` सेट नगर्नुहोस्                       |
| heap / inflight-byte बजेटबाट heavy in-flight + healthy-headroom को आकार निर्धारण गर्नुहोस्; 1–2 रूढिवादी #7849 पूर्वनिर्धारित मान हो, उत्पादनको कठोर अधिकतम होइन | एउटै प्रक्रियालाई 8× RAM र असीमित सङ्ख्या सीमा नदिनुहोस्               |
| वैकल्पिक: **साझा कोटा काउन्टरहरू** का लागि `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                  | Redis लाई साझा SQLite नठान्नुहोस् — यो त्यस्तो होइन                    |
| प्रत्येक instance मा provider secrets प्रतिलिपि गर्नुहोस् (वा विभाजित dashboards स्वीकार गर्नुहोस्)                                                              | instance हरूभरि एउटै dashboard / एउटै call-log हुने अपेक्षा नगर्नुहोस् |
| अगाडि कुनै पनि load balancer राख्नुहोस्; API key वा session अनुसार sticky हुनु पर्याप्त छ                                                                        | vendor-विशिष्ट size-aware middleware आवश्यक नठान्नुहोस्                |

हार्डवेयर: प्रत्येक instance मा एकैसाथ चल्ने लामा `/v1/responses` को सङ्ख्या **मेमोरी-बजेट** सम्बन्धी प्रश्न हो (heap + inflight-byte / #10110)। `N` स्वतन्त्र `DATA_DIR` हरूले अझै पनि heap हरू गुणा गर्छन्: host RAM ले `N × cgroup` समेट्नुपर्छ, “N=8 सहितको एउटै 16 Gi pod” होइन। एउटै SQLite फाइलमा कहिल्यै `replicas > 1` नराख्नुहोस्।

Compose रूपरेखा (दुई heap, दुई volume — `deploy.replicas: 2` होइन):

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

इन-प्रोसेस घनत्व (HTTP isolate बाहिरको compression) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) हो। साझा टिकाउ state मा एउटा तार्किक cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) हो।

## Docker भित्र Gemini का क्षेत्रीय त्रुटिहरू

Google AI Studio / Gemini API ले HTTP 400 सँग FAILED_PRECONDITION र
`User location is not supported for the API use.` फर्काउन सक्छ। होस्टमा अनुरोध सफल हुनुले
कन्टेनरले उही बहिर्गमन मार्ग प्रयोग गर्छ भन्ने प्रमाणित गर्दैन। DNS क्रम,
IPv4/IPv6 कनेक्टिभिटी, VPN राउटिङ र कन्फिगर गरिएका प्रोक्सीहरू फरक हुन सक्छन्।
[Google का समर्थित क्षेत्रहरू](https://ai.google.dev/gemini-api/docs/available-regions)
का साथै वास्तविक जडान मार्ग पनि जाँच गर्नुहोस्; यो त्रुटि मात्रले खराब API key भएको पहिचान गर्दैन।

### जडान-विशिष्ट प्रोक्सीलाई प्राथमिकता दिनुहोस्

प्रभावित Gemini जडानका लागि OmniRoute को [प्रति-जडान प्रोक्सी कन्फिगरेसन](../ops/PROXY_GUIDE.md#4-level-proxy-system)
प्रयोग गर्नुहोस्, त्यसपछि उही मोडेलसहित **Test Connection** र एउटा सानो अनुरोध
दोहोर्याउनुहोस्। यसले राउटिङ परिवर्तनलाई त्यही जडानमा सीमित राख्छ। प्रोक्सी
कन्टेनरबाट पहुँचयोग्य छ र जडानले वास्तवमै त्यसैलाई चयन गर्छ भन्ने पुष्टि गर्नुहोस्।
मार्ग परिवर्तन गर्दैमा अपस्ट्रिम क्षेत्रीय योग्यता सुनिश्चित हुँदैन।

### होस्ट र कन्टेनर नेटवर्किङ तुलना गर्नुहोस्

प्रमाणीकृत परिणामहरू तुलना गर्दा key, मोडेल र अनुरोध उस्तै राख्नुहोस्; कुनै issue मा
क्रेडेन्सियल, प्रोक्सी पासवर्ड वा पूर्ण authorization headers कहिल्यै नटाँस्नुहोस्।
पहिले OS resolver ले कुन address families उपलब्ध गराउँछ भनेर होस्ट र कन्टेनरभित्र
उही कमाण्ड प्रयोग गरी निरीक्षण गर्नुहोस्:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` लाई तपाईंले चलाउने सेवाले प्रतिस्थापन गर्नुहोस् (उदाहरणका लागि, `omniroute-web`)। यी
कमाण्डहरूले क्रेडेन्सियल वा IP addresses बिना address families प्रिन्ट गर्छन्। फर्काइएको `6`
ले IPv6 DNS परिणाम मात्र देखाउँछ: यसले प्रयोगयोग्य IPv6 मार्ग वा API पहुँच प्रमाणित
गर्दैन। जहाँ `curl` इन्स्टल गरिएको छ, दुवै वातावरणमा
`curl -4 -I https://generativelanguage.googleapis.com` लाई
`curl -6 -I https://generativelanguage.googleapis.com` सँग तुलना गर्नुहोस्।
HTTP response ले त्यो परीक्षणका लागि कनेक्टिभिटी प्रमाणित गर्छ, चाहे त्यो अप्रमाणीकृत
त्रुटि नै किन नहोस्; प्रमाणीकृत मोडेल अनुरोधले मात्र Gemini योग्यता परीक्षण गर्छ।

### होस्ट-स्तरीय विकल्प: कार्यरत IPv6 र resolver नीति

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) का रिपोर्टकर्ताले
कन्टेनर IPv6 सक्षम गरेर र glibc address selection परिवर्तन गरेर आफ्नो वातावरणमा
पहुँच पुनर्स्थापित गरेका थिए। यसलाई वातावरण-विशिष्ट विकल्पका रूपमा लिनुहोस्। resolver
प्राथमिकताहरू समायोजन गर्नुअघि कार्यरत होस्ट IPv6, कन्टेनर egress/routing र firewall
नियमहरू पुष्टि गर्नुहोस्। निजी ULA address ले मात्र सार्वजनिक IPv6 कनेक्टिभिटी स्थापित गर्दैन।

Compose को default network मा पहिल्यै संलग्न सेवाहरूका लागि, यो fragment ले
त्यो network मा IPv6 सक्षम गर्छ; आफ्नो सेवाका बाँकी भाग, ports, volumes र configuration यथावत् राख्नुहोस्:

```yaml
networks:
  default:
    enable_ipv6: true
```

named network का लागि, सेवाले वास्तवमै join गर्ने network मा यसलाई सक्षम गर्नुहोस्। Docker ले
ULA subnet छुट्याउन सक्छ; तपाईंको network लाई आवश्यक हुँदा मात्र स्पष्ट रूपमा निर्दिष्ट गरिएको,
नखप्टिने subnet चयन गर्नुहोस्। [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
र [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) हेर्नुहोस्।

**glibc-based image** मा, `/etc/gai.conf` ले address selection परिवर्तन गर्न सक्छ। हालको
repository Dockerfile ले Debian प्रयोग गर्छ; अनुकूलित musl-based images मा यो संयन्त्र लागू हुँदैन।
रिपोर्ट गरिएको समायोजनले ULA label लाई `label fc00::/7 6` बाट
`label fc00::/7 1` मा परिवर्तन गर्छ। image को पूर्ण policy table बाट सुरु गर्नुहोस् र यसका अन्य
entries सुरक्षित राख्नुहोस्: `label` वा `precedence` entry थप्दा त्यो default table प्रतिस्थापन हुन्छ,
त्यसैले परिवर्तन गरिएको line मात्र भएको file पर्याप्त हुँदैन।
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ले ती semantics को दस्तावेजीकरण गर्छ। समीक्षा गरिएको file लाई read-only रूपमा `/etc/gai.conf`
मा bind-mount गर्नुहोस् र यसलाई लागू गर्न service पुनः सिर्जना गर्नुहोस्।

यसले **त्यो कन्टेनरको सबै outbound traffic** का लागि OS address selection परिवर्तन गर्छ।
यसले प्रत्येक application लाई IPv6 चयन गर्न बाध्य पार्दैन: Node को DNS क्रम र connection
selection पनि महत्त्वपूर्ण हुन्छन्। विशेष रूपमा, `--dns-result-order=ipv4first` ले IPv4 लाई
प्राथमिकता दिन्छ र IPv4-only failure का लागि समाधान होइन।
[Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) हेर्नुहोस्।

कुनै पनि होस्ट-स्तरीय परिवर्तनपछि Gemini र आफ्ना अन्य providers पुनः परीक्षण गर्नुहोस्। rollback गर्न,
अनुकूलित `gai.conf` mount हटाउनुहोस्, अघिल्लो network configuration पुनर्स्थापित गर्नुहोस् र
maintenance window का बेला प्रभावित service/network पुनः सिर्जना गर्नुहोस्। network पुनः सिर्जना गर्दा
त्यसमा संलग्न अन्य कन्टेनरहरू अवरुद्ध हुन सक्छन्; persistent data volume नमेटाउनुहोस्।

## महत्त्वपूर्ण टिप्पणीहरू

- **SQLite WAL मोड:** OmniRoute ले नवीनतम परिवर्तनहरू `storage.sqlite` मा पुनः चेकपोइन्ट गर्न सकोस् भनेर `docker stop` लाई पूरा हुन दिनुपर्छ। समावेश गरिएका Compose फाइलहरूले पहिले नै 40s को स्टप ग्रेस अवधि सेट गरेका छन्। यदि तपाईं इमेजलाई सिधै चलाउनुहुन्छ भने, `--stop-timeout 40` कायम राख्नुहोस्।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** नियमित/लेखन-अघिका ब्याकअपहरू बाह्य रूपमा व्यवस्थापन गरिएका छन् भने यसलाई `true` मा सेट गर्नुहोस्। विद्यमान-डेटाबेस माइग्रेसनहरूका लागि अझै पनि आफ्नै टिकाउ सुरक्षा स्न्यापसट र सामूहिक-माइग्रेसन गार्ड आवश्यक हुन्छ।
- **डेटा स्थायित्व:** कन्टेनर पुनः सुरु हुँदा पनि आफ्नो डेटाबेस, कुञ्जीहरू र कन्फिगरेसनहरू कायम राख्न सधैं `/app/data` मा भोल्युम माउन्ट गर्नुहोस्।
- **पोर्ट कन्फिगरेसन:** पूर्वनिर्धारित `20128` पोर्ट परिवर्तन गर्न `PORT` वातावरण चर ओभरराइड गर्नुहोस्।

## थप हेर्नुहोस्

- [VM डिप्लोयमेन्ट गाइड](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लोयमेन्ट गाइड](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io मा डिप्लोय गर्नुहोस्
- [वातावरण कन्फिगरेसन](../reference/ENVIRONMENT.md) — पूर्ण `.env` सन्दर्भ
