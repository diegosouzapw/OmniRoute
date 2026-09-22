# 🐳 Docker Guide — OmniRoute (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker परिनियोजन का संपूर्ण संदर्भ। शीघ्र शुरुआत के लिए, [README का Docker अनुभाग](../README.md#-docker) देखें।

## विषय-सूची

- [शीघ्र संचालन](#quick-run)
- [पर्यावरण फ़ाइल के साथ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [उपलब्ध प्रोफ़ाइल](#available-profiles)
- [जब OmniRoute Docker में चलता है, तब होस्ट CLI टूल्स को कॉन्फ़िगर करना](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis साइडकार](#redis-sidecar)
- [प्रोडक्शन Compose](#production-compose)
- [Dockerfile चरण](#dockerfile-stages)
- [महत्वपूर्ण पर्यावरण वेरिएबल](#critical-environment-variables)
- [Caddy (HTTPS) के साथ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare क्विक टनल](#cloudflare-quick-tunnel)
- [इमेज टैग](#image-tags)
- [उपलब्धता: डिफ़ॉल्ट SQLite एकल-रेप्लिका है](#availability-default-sqlite-is-single-replica)
- [महत्वपूर्ण टिप्पणियाँ](#important-notes)

---

## त्वरित संचालन

> **एक ही कमांड से स्वयं होस्ट करना चाहते हैं?** देखें
> [स्वयं-होस्ट मार्गदर्शिका](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (प्रकाशित इमेज +
> Redis, केवल लूपबैक, कोई प्रोफ़ाइल चयन नहीं)। नीचे दिया गया त्वरित संचालन उन
> उपयोगकर्ताओं के लिए एकल-कंटेनर तरीका है, जो Redis को पहले से कहीं और चला रहे हैं।

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## पर्यावरण फ़ाइल के साथ

```bash
# पहले .env को कॉपी और संपादित करें
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
# बेस प्रोफ़ाइल (कोई CLI टूल नहीं)
docker compose --profile base up -d

# CLI प्रोफ़ाइल (Claude Code, Codex, OpenClaw अंतर्निहित हैं)
docker compose --profile cli up -d

# होस्ट प्रोफ़ाइल (मुख्यतः Linux के लिए; होस्ट CLI बाइनरी को केवल-पढ़ने योग्य रूप में माउंट करता है)
docker compose --profile host up -d

# CLI + CLIProxyAPI साइडकार को संयोजित करें
docker compose --profile cli --profile cliproxyapi up -d
```

## उपलब्ध प्रोफ़ाइल

OmniRoute चार Compose प्रोफ़ाइल के साथ आता है। वह प्रोफ़ाइल चुनें जो आपके परिवेश के अनुकूल हो।

| प्रोफ़ाइल         | सेवा             | कब उपयोग करें                                                                                                                                          | कमांड                                        |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (डिफ़ॉल्ट) | `omniroute-base` | हेडलेस सर्वर / न्यूनतम रनटाइम, कोई प्रदाता CLI बंडल नहीं                                                                                               | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | एजेंटिक वर्कफ़्लो जो `omniroute providers/setup/doctor` और बंडल किए गए CLI (Codex, Claude Code, Droid, OpenClaw) को कॉल करते हैं                       | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | वे Linux होस्ट जो `~/.local/bin`, `~/.codex`, `~/.claude` आदि को केवल-पढ़ने योग्य रूप में माउंट करके होस्ट CLI तक `network_mode` जैसा एक्सेस चाहते हैं | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | अपस्ट्रीम CLI प्रॉक्सी के लिए पोर्ट `8317` पर [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) साइडकार चलाएँ                                | `docker compose --profile cliproxyapi up -d` |

> एकाधिक प्रोफ़ाइल को संयोजित किया जा सकता है: `docker compose --profile cli --profile cliproxyapi up -d`।

## Docker में OmniRoute चलने पर होस्ट CLI टूल्स को कॉन्फ़िगर करना

`omniroute setup-codex`, `setup-claude`, `config set <tool>` और डैशबोर्ड का
**कॉन्फ़िगरेशन सहेजें** बटन, सभी `~/.codex/*.config.toml` जैसी फ़ाइलें लिखते हैं। उन पथों का
अर्थ केवल उस मशीन पर होता है जहाँ CLI वास्तव में चलता है। इन्हें कंटेनर के अंदर
चलाने पर फ़ाइल कंटेनर के अपने होम (`/home/node` —
इमेज `USER node` के रूप में चलती है) में लिखी जाती है, जहाँ कोई भी होस्ट CLI इसे कभी नहीं पढ़ेगा और जहाँ कंटेनर
दोबारा बनते ही यह हटा दी जाती है।

OmniRoute इसका पता लगाता है और ऐसी सफलता रिपोर्ट करने के बजाय, जिसका आप उपयोग नहीं कर सकते,
निर्देशों के साथ लिखने से इनकार करता है: CLI `2` के साथ बंद हो जाता है और API `422`
के साथ `containerEphemeralTarget: true` लौटाता है।

### अनुशंसित: CLI को होस्ट पर और OmniRoute को Docker में चलाएँ

कंटेनर API उपलब्ध कराता है; CLI आपके होस्ट टूल्स को कॉन्फ़िगर करता है।

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI को कंटेनर की ओर इंगित करें
omniroute setup-codex                      # आपके होस्ट पर वास्तविक ~/.codex लिखता है
```

जब Codex, Claude Code, Cursor या इसी तरह के टूल आपके
लैपटॉप पर चलते हैं, तब यह सही विकल्प है — और सामान्य सेटअप भी यही है।

### विकल्प: होस्ट कॉन्फ़िगरेशन डायरेक्टरियों को bind-mount करें (`host` प्रोफ़ाइल)

यदि आप चाहते हैं कि कंटेनर स्वयं आपके होस्ट कॉन्फ़िगरेशन में लिखे, तो
डायरेक्टरियों को माउंट करें और `CLI_CONFIG_HOME` को माउंट रूट पर इंगित करें। `host` प्रोफ़ाइल
पहले से ऐसा करती है:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount ही पथ को विश्वसनीय बनाता है: OmniRoute
`/proc/self/mountinfo` पढ़ता है और माउंट किए गए पथों में लिखने की अनुमति देता है (और उन डायरेक्टरियों में भी
जिनके चाइल्ड माउंट हैं, जो ऊपर दिए गए `/host-home` के विन्यास जैसा ही है), जबकि
अनमाउंट किए गए पथों में लिखने से अब भी इनकार करता है।

### वैकल्पिक निकास: कंटेनर के अपने CLI कॉन्फ़िगर करें (संयम से उपयोग करें)

जब CLI वास्तव में कंटेनर के अंदर मौजूद हों (`cli` प्रोफ़ाइल), तब लिखना
जानबूझकर किया जाता है। किसी भी `setup-*` कमांड को `--allow-container-write` दें या सर्वर के लिए
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सेट करें। लिखने की प्रक्रिया
इस चेतावनी के साथ आगे बढ़ती है कि यह कंटेनर के बने रहने के बाद सुरक्षित नहीं रहेगी।

> **सुरक्षा चेतावनी — `cli` प्रोफ़ाइल + `docker.sock` माउंट।**
> `cli` प्रोफ़ाइल `/var/run/docker.sock` को bind-mount करती है, ताकि कंटेनर के अंदर का
> ऑटो-अपडेटर होस्ट डेमन से स्टैक दोबारा बना सके
> (`src/lib/system/autoUpdate.ts` उस सॉकेट की जाँच करता है और उसके
> अनुपस्थित होने पर Docker पथ को छोड़ देता है)। वह सॉकेट **होस्ट-root विश्वास
> सीमा** है: उस तक पहुँच सकने वाली कोई भी चीज़ होस्ट Docker डेमन को
> root के रूप में नियंत्रित करती है — वह होस्ट पर किसी भी कंटेनर को बना सकती है, उसका निरीक्षण कर सकती है, रोक सकती है और हटा सकती है।
> परिणाम:
>
> 1. **`cli` प्रोफ़ाइल के पोर्ट को कभी भी नेटवर्क पर उजागर न करें।** इसे
>    `127.0.0.1` पर प्रकाशित करें (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN से पहुँच योग्य `cli` प्रोफ़ाइल किसी भी डैशबोर्ड-स्तरीय RCE को
>    पूर्ण होस्ट अधिग्रहण में बदल देती है।
> 2. **`cli` प्रोफ़ाइल में कोई अतिरिक्त होस्ट डायरेक्टरी bind न करें।**
>    Docker सॉकेट के साथ कोई भी अतिरिक्त माउंट कंटेनर को आपके फ़ाइल सिस्टम और होस्ट कॉन्फ़िगरेशन पर पूर्ण
>    पढ़ने/लिखने की पहुँच देता है। यदि किसी टूल को कोई प्रोजेक्ट
>    देखना आवश्यक हो, तो उसे CLI बाइनरी के साथ स्थानीय रूप से चलाएँ — उसे `cli` कंटेनर
>    में माउंट न करें।
>
> यदि आपको कंटेनर के अंदर ऑटो-अपडेट की आवश्यकता नहीं है, तो `cli` प्रोफ़ाइल को बंद रखें
> (`COMPOSE_PROFILES=core,redis` या इससे छोटा)। अन्य प्रोफ़ाइल
> Docker सॉकेट को माउंट नहीं करतीं।
>
> MITM से संबंधित ख़तरे के मॉडल के लिए `docs/security/MITM-TPROXY-DECRYPT.md` (git; `/docs` में संकलित नहीं)
> देखें, और `codex`/`claude-code`/`droid`/`openclaw` बाइनरी की उद्गम शृंखला के लिए
> `docs/security/SUPPLY_CHAIN.md` देखें।

## Redis साइडकार

OmniRoute वितरित रेट लिमिटर और साझा कैश के लिए Redis पर निर्भर करता है। `redis` सेवा `docker-compose.yml` में **हमेशा परिभाषित** होती है (इस पर कोई प्रोफ़ाइल गेट नहीं है) और किसी भी अन्य प्रोफ़ाइल के साथ शुरू होती है।

| विवरण                 | मान                                      |
| --------------------- | ---------------------------------------- |
| इमेज                  | `redis:7-alpine`                         |
| कंटेनर का नाम         | `omniroute-redis`                        |
| आंतरिक पोर्ट          | `6379`                                   |
| होस्ट पोर्ट (ओवरराइड) | `REDIS_PORT` (डिफ़ॉल्ट `6379`)           |
| होस्ट बाइंड (ओवरराइड) | `REDIS_BIND_HOST` (डिफ़ॉल्ट `127.0.0.1`) |
| वॉल्यूम               | `omniroute-redis-data` → `/data`         |
| हेल्थचेक              | `redis-cli ping` (10s अंतराल)            |

संबंधित एनवायरनमेंट वेरिएबल:

- `REDIS_URL` — ऐप में इंजेक्ट की गई कनेक्शन स्ट्रिंग (डिफ़ॉल्ट रूप से `redis://redis:6379`)।
- `REDIS_PORT` — Redis कंटेनर के लिए होस्ट-साइड पोर्ट मैपिंग।
- `REDIS_BIND_HOST` — वह होस्ट इंटरफ़ेस जिस पर पोर्ट प्रकाशित होता है। डिफ़ॉल्ट `127.0.0.1` है।

> **डिफ़ॉल्ट रूप से लूपबैक क्यों:** साइडकार `requirepass` के बिना चलता है, और ऐप
> कंटेनर compose नेटवर्क (`redis:6379`) के माध्यम से उस तक पहुँचते हैं — प्रकाशित पोर्ट
> केवल होस्ट-साइड टूलिंग (`redis-cli`, एक स्थानीय `npm run dev`) के लिए है। इसे
> `0.0.0.0` पर प्रकाशित करने से एक अप्रमाणित Redis आपके LAN के प्रत्येक होस्ट के लिए उपलब्ध हो जाएगा। यदि आप
> `REDIS_BIND_HOST=0.0.0.0` सेट करते हैं, तो सेवा के `command:` में `--requirepass` भी जोड़ें।

**Redis को अक्षम करना** अनुशंसित नहीं है (रेट लिमिटर इन-मेमोरी फ़ॉलबैक पर आ जाएगा)। यदि ऐसा करना आवश्यक हो, तो `docker-compose.yml` में `redis:` सेवा ब्लॉक को हटाएँ/कमेंट करें या इसे शून्य तक स्केल करें:

```bash
docker compose up -d --scale redis=0
```

## प्रोडक्शन Compose

डेव के साथ-साथ चलने वाले एक पृथक प्रोडक्शन स्नैपशॉट के लिए `docker-compose.prod.yml` का उपयोग करें।

| विवरण                   | मान                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| फ़ाइल                   | `docker-compose.prod.yml`                                                                   |
| डिफ़ॉल्ट डैशबोर्ड पोर्ट | `PROD_DASHBOARD_PORT=20130` (आंतरिक `${DASHBOARD_PORT:-20128}` से मैप किया गया)             |
| डिफ़ॉल्ट API पोर्ट      | `PROD_API_PORT=20131`                                                                       |
| इमेज                    | `omniroute:prod` (`runner-cli` लक्ष्य से बिल्ड की गई)                                       |
| Redis कंटेनर            | `omniroute-redis-prod` (`redis:8.6.2`, समर्पित `redis-prod-data` वॉल्यूम)                   |
| डेटा वॉल्यूम            | `omniroute-prod-data` (नामित, रीबिल्ड के दौरान बना रहता है)                                 |
| हेल्थचेक                | `node healthcheck.mjs` + `redis-cli ping`, जिसमें `depends_on` Redis की स्थिति पर निर्भर है |

उपयोग करने का तरीका:

```bash
# प्रोडक्शन स्टैक को बिल्ड और शुरू करें
docker compose -f docker-compose.prod.yml up -d --build

# लॉग स्ट्रीम करें
docker compose -f docker-compose.prod.yml logs -f

# बंद करें (वॉल्यूम बनाए रखें)
docker compose -f docker-compose.prod.yml down
```

प्रोडक्शन स्टैक डेव compose के समानांतर चलता है (कंटेनर के नाम, पोर्ट और वॉल्यूम अलग होते हैं), इसलिए प्रोडक्शन को चालू रखते हुए आप स्थानीय रूप से पुनरावृत्तियाँ जारी रख सकते हैं।

## Dockerfile चरण

रिपॉज़िटरी एक multi-stage Dockerfile (`Dockerfile`) प्रदान करती है। तीन चरण उपलब्ध हैं; अपने उपयोग के अनुसार सही `target` चुनें।

| चरण           | बेस इमेज              | उद्देश्य                                                                                                                                                                      |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | निर्भरताएँ इंस्टॉल करता है (`npm ci --legacy-peer-deps`) और `npm run build` चलाता है (डिफ़ॉल्ट रूप से Turbopack — नीचे बिल्ड-समय संसाधन देखें)                                |
| `runner-base` | `node:26-trixie-slim` | Next.js के standalone आउटपुट के साथ प्रोडक्शन रनटाइम। **कोई provider CLI शामिल नहीं है।**                                                                                     |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` और global CLI जोड़ता है: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`। **एजेंट-आधारित वर्कफ़्लो के लिए इसे चुनें।** |

किसी विशिष्ट target को मैन्युअल रूप से बिल्ड करें:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### बिल्ड-समय संसाधन

तीन build arg नियंत्रित करते हैं कि `builder` चरण कितने संसाधन इस्तेमाल करता है। ये केवल बिल्ड-समय के लिए हैं —
`OMNIROUTE_MEMORY_MB` (नीचे) एक अलग रनटाइम नियंत्रण है।

| Build arg                   | डिफ़ॉल्ट | प्रभाव                                                                                                |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`      | `0` इसके बजाय webpack के साथ बिल्ड करता है। अधिकतम मेमोरी कम, गति धीमी।                               |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | शुरू किए गए `next build` के लिए V8 heap सीमा (`--max-old-space-size`)।                                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL` को मान देता है; Next page-data संग्रह के लिए `workers = N - 1` निर्धारित करता है। |

बड़े builder पर `OMNIROUTE_BUILD_WORKERS` को बढ़ाना चाहिए और सीमित संसाधनों वाला बिल्ड
**`✓ Compiled successfully` के बाद** विफल होने पर सबसे पहले इसी पर संदेह करना चाहिए। प्रत्येक
page-data worker अपनी अलग प्रक्रिया है और मूल `next build` भी एक अलग प्रक्रिया है;
एक वास्तविक VPS पुनरुत्पादन (issue #7518) में प्रत्येक प्रक्रिया का अधिकतम RSS
~4.5 GB मापा गया, जो `NODE_OPTIONS` heap flag से स्वतंत्र था (Turbopack, V8 heap के
बाहर native/Rust मेमोरी में संकलित करता है)। `2` का डिफ़ॉल्ट (→ 1 worker, कुल 2
प्रक्रियाएँ) उन 16 GB / 4 vCPU GitHub-hosted runners के लिए निर्धारित है जिनका
publish pipeline उपयोग करती है। `8` पर (→ 7 workers) उस runner की मेमोरी समाप्त हो गई और
buildkit ने `ResourceExhausted: ... cannot allocate memory` के साथ चरण को विफल कर दिया;
प्रति-प्रक्रिया RSS का अनुमान लगाने के बजाय उसे सीधे मापने पर `3` (→ 2 workers) भी
फिट नहीं हुआ। `tests/unit/docker-build-memory-budget.test.ts`
मापे गए आँकड़े के आधार पर गणना करता है और किसी भी नियंत्रण के runner की क्षमता से
अधिक होने पर विफल हो जाता है।

Turbopack ऐसी native Rust मेमोरी में संकलित करता है जो V8 heap के **बाहर** होती है, इसलिए
`OMNIROUTE_BUILD_MEMORY_MB` उसे सीमित नहीं करता। मेमोरी सीमा वाले host पर
OOM killer द्वारा बिल्ड को बिना किसी error text के SIGKILL कर दिया जाता है — यह बस
`Creating an optimized production build` के बीच में रुक जाता है, जो out-of-memory
समस्या के बजाय hang जैसा दिखाई देता है। यदि build host के संसाधन सीमित हैं, तो bundler बदलें:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम है, इसलिए `next build` एक मूल प्रक्रिया **और** एक worker
प्रक्रिया चलाता है तथा दोनों अलग-अलग `OMNIROUTE_BUILD_MEMORY_MB` का पालन करते हैं। container
सीमा को उस मान के लगभग दोगुने से अधिक रखें, न कि केवल एक गुना।

इस tree पर मापा गया (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container सीमा | परिणाम                                |
| --------- | -------------- | ------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | दोनों पर बिना संदेश के OOM-killed हुआ |
| webpack   | 8 GiB          | build worker SIGKILLed हुआ            |
| webpack   | 12 GiB         | सफल रहा, अधिकतम उपयोग 11.1 GiB रहा    |

### रनटाइम डिफ़ॉल्ट

`runner-base` द्वारा export किए गए डिफ़ॉल्ट: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker में मेमोरी का व्यवहार:

- इमेज `OMNIROUTE_MEMORY_MB=1024` सेट करती है और उससे `NODE_OPTIONS=--max-old-space-size=1024` प्राप्त करती है।
- वास्तविक server प्रक्रिया standalone launcher द्वारा शुरू की जाती है, जो `OMNIROUTE_MEMORY_MB` पढ़ता है और `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` जोड़ता है।
- Node अंतिम बार दोहराए गए `--max-old-space-size` मान का उपयोग करता है, इसलिए `OMNIROUTE_MEMORY_MB` सेट करने से प्रभावी Docker heap सीमा नियंत्रित होती है।
- चूँकि इमेज इसे हमेशा सेट करती है, इसलिए launcher का अपना RAM के अनुसार कैलिब्रेट किया गया fallback Docker के अंतर्गत कभी लागू नहीं होता। workload के लिए इसे स्पष्ट रूप से बढ़ाएँ (नीचे दी गई तालिका)। coding-agent `/v1/responses` के लिए `2048` भी बहुत कम है।

### कोडिंग एजेंट के लिए रनटाइम RAM

1 GiB का Docker डिफ़ॉल्ट dashboard/हल्की chat के लिए न्यूनतम स्तर है, प्रोडक्शन आकार नहीं। लंबे `POST /v1/responses` body (सैकड़ों messages, दर्जनों tools) compression के दौरान कई in-memory graph बनाए रखते हैं। एक साथ चल रहे दो ~3 MiB / ~750k-token requests ने **12 GiB** old-space पर V8 को निरस्त कर दिया है (`FATAL ERROR: Reached heap limit`) और 16 GiB cgroup OOM सीमा भी पार की है। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) देखें।

**cgroup `--memory` को heap से अधिक रखें** — native buffers, SQLite और compression के मध्यवर्ती डेटा V8 के बाहर रहते हैं।

| कार्यभार                            | `OMNIROUTE_MEMORY_MB`  | कंटेनर / cgroup          | टिप्पणियाँ                                                                                                             |
| ----------------------------------- | ---------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| डैशबोर्ड, एक हल्की चैट              | `1024` (इमेज डिफ़ॉल्ट) | ≥2 GiB                   |                                                                                                                        |
| एक कोडिंग एजेंट (Claude/Codex/Grok) | `8192`                 | ≥10 GiB                  | सामान्य एकल-सत्र `/v1/responses`                                                                                       |
| दो समवर्ती लंबे `/v1/responses`     | `10240`–`12288`        | ≥12–16 GiB               | लगभग 12 GiB हीप पर V8 का रुकना मापा गया                                                                                |
| तीन+ समवर्ती लंबे कॉन्टेक्स्ट       | एक प्रोसेस पर न चलाएँ  | क्रमबद्ध करें / अधिक RAM | डिफ़ॉल्ट रूप से हेवीवेट एडमिशन में 1 अनुरोध प्रगति पर रहता है; RAM बढ़ाए बिना इसे बढ़ाने पर रुकने की समस्या फिर आती है |

बेयर मेटल पर `omniroute serve`, `OMNIROUTE_MEMORY_MB` के **सेट न होने** पर RAM के ~35% पर कैलिब्रेट करता है (जिसे `[512, 4096]` के बीच सीमित किया जाता है)। Docker हमेशा `1024` सेट करता है, इसलिए आधिकारिक इमेज में वह कैलिब्रेशन कभी नहीं चलता।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## महत्वपूर्ण एनवायरनमेंट वेरिएबल

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) में दस्तावेज़ीकृत डिफ़ॉल्ट के अतिरिक्त, Docker के अंतर्गत चलाते समय निम्नलिखित वेरिएबल सबसे महत्वपूर्ण हैं:

| वेरिएबल                       | उद्देश्य                                                                                                                                                                                                                                                                             | डिफ़ॉल्ट                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ब्रिज के लिए साझा सीक्रेट। **प्रोडक्शन में आवश्यक** — इसे एक मज़बूत रैंडम स्ट्रिंग पर सेट करें।                                                                                                                                                                            | सेट नहीं (प्रदान करना आवश्यक) |
| `REDIS_URL`                   | रेट लिमिटर / कैश बैकएंड के लिए कनेक्शन स्ट्रिंग                                                                                                                                                                                                                                      | `redis://redis:6379`          |
| `REDIS_PORT`                  | बंडल किए गए Redis कंटेनर के लिए होस्ट-साइड पोर्ट                                                                                                                                                                                                                                     | `6379`                        |
| `REDIS_BIND_HOST`             | वह होस्ट इंटरफ़ेस जिस पर बंडल किया गया Redis पोर्ट प्रकाशित होता है (जब तक आप AUTH नहीं जोड़ते, लूपबैक)                                                                                                                                                                              | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | स्व-अपडेट वर्कफ़्लो के लिए `cli` प्रोफ़ाइल में `/workspace/omniroute` पर माउंट किया गया होस्ट पाथ                                                                                                                                                                                    | `.` (वर्तमान डायरेक्टरी)      |
| `OMNIROUTE_MEMORY_MB`         | Docker स्टैंडअलोन सर्वर के लिए रनटाइम Node हीप की अधिकतम सीमा; ऊपर दिए गए इमेज डिफ़ॉल्ट को ओवरराइड करती है। कोडिंग एजेंट: `8192`+ ([रनटाइम RAM](#runtime-ram-for-coding-agents) देखें)।                                                                                              | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | डैशबोर्ड (20128) और API (20129) के लिए एक्सपोज़ किए गए पोर्ट को ओवरराइड करता है                                                                                                                                                                                                      | `20128` / `20129`             |
| `APP_BIND_HOST`               | वह होस्ट इंटरफ़ेस जिस पर docker-compose डैशबोर्ड/API/live-WS पोर्ट प्रकाशित करता है। `REQUIRE_API_KEY=false` (डिफ़ॉल्ट) होने पर, `0.0.0.0` अनाम `/v1` प्रॉक्सी को LAN पर एक्सपोज़ करता है — इसे केवल `REQUIRE_API_KEY=true` के साथ या सामने रिवर्स प्रॉक्सी होने पर ही विस्तृत करें। | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | वह होस्ट इंटरफ़ेस जिस पर docker-compose `cliproxyapi` साइडकार प्रकाशित करता है — इसका डेटा वॉल्यूम प्रोवाइडर क्रेडेंशियल संग्रहीत करता है।                                                                                                                                           | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | वह डायरेक्टरी जिसे रनटाइम प्लगइन स्कैनर पढ़ता है और जिसमें इंस्टॉल करता है। जब प्लगइन bind-mount किए गए हों, तो इसे सेट करें: डिफ़ॉल्ट `HOME` का अनुसरण करता है, जिसे किसी इमेज द्वारा एक्सपोर्ट करना आवश्यक नहीं है।                                                                | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | जब ऐप को रिवर्स प्रॉक्सी के पीछे प्रकाशित किया जाता है, तब URL सबपाथ (उदा. `/omniroute`)                                                                                                                                                                                             | _(रिक्त = रूट)_               |
| `NEXT_PUBLIC_BASE_URL`        | सबपाथ सहित सार्वजनिक ब्राउज़र ओरिजिन (उदा. `https://host/omniroute`)                                                                                                                                                                                                                 | सेट नहीं                      |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` के लिए होस्ट-साइड डैशबोर्ड पोर्ट                                                                                                                                                                                                                           | `20130`                       |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` साइडकार के लिए होस्ट-साइड पोर्ट                                                                                                                                                                                                                                        | `8317`                        |

## सबपाथ पर रिवर्स प्रॉक्सी (Traefik / nginx)

Next.js का `basePath` स्टैंडअलोन बंडल में कंपाइल किया जाता है। OmniRoute ऐप रूट पर एक सेंटिनल फ़ाइल में बिल्ड किया गया
मान दर्ज करता है (`npm run build` के दौरान लिखा जाता है;
`scripts/docker/ensure-docker-base-path.mjs` द्वारा पढ़ा जाता है) और कंटेनर शुरू होने पर इसकी तुलना
`OMNIROUTE_BASE_PATH` से करता है। जब वे अलग होते हैं और इमेज को
डोमेन रूट के लिए बनाया गया था, तो `node dev/run-standalone.mjs` के चलने से पहले एंट्रीपॉइंट स्टैंडअलोन मैनिफ़ेस्ट,
एम्बेड किए गए `basePath`/`assetPrefix` लिटरल (Next 16 केवल
`assetPrefix` से SSR एसेट URL रेंडर करता है — पैचर सबपाथ को इसमें भी प्रतिबिंबित करता है), बिल्ड किए गए
`/_next/static` एसेट URL (क्लाइंट-रेफ़रेंस मैनिफ़ेस्ट, मीडिया इंपोर्ट, पहले से रेंडर किए गए
त्रुटि पेज) और क्लाइंट `process.env` शिम को फिर से लिखता है।

### Compose बिल्ड (अनुशंसित)

दोनों वेरिएबल `.env` में सेट करें, फिर दोबारा बिल्ड करें ताकि इमेज और रनटाइम एक-दूसरे के अनुरूप हों:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` को Docker बिल्ड-आर्ग और
रनटाइम एनवायरनमेंट वेरिएबल—दोनों के रूप में अग्रेषित करता है।

### पहले से बनी रूट इमेज + रनटाइम सबपाथ

प्रकाशित `diegosouzapw/omniroute:*` इमेज डोमेन रूट के लिए बनाई गई हैं। फिर भी आप
रनटाइम पर `OMNIROUTE_BASE_PATH` सेट कर सकते हैं; कंटेनर स्टार्टअप पर बंडल को एक बार पैच करता है।
इसे मेल खाने वाले सार्वजनिक ओरिजिन के साथ जोड़ें:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

रिवर्स प्रॉक्सी को **पूर्ण** बाहरी पाथ अग्रेषित करने के लिए कॉन्फ़िगर करें (प्रीफ़िक्स न हटाएँ)।
Traefik को `StripPrefix` के बिना `PathPrefix(`/omniroute`)` को कंटेनर पर रूट करना चाहिए,
ताकि Next.js को `/omniroute/...` प्राप्त हो और वह
`/omniroute/_next/...` से एसेट सर्व करे।

Docker हेल्थचेक, सक्रिय `OMNIROUTE_BASE_PATH` से प्रीफ़िक्स किए गए हल्के
`/healthz` लाइफ़साइकल एंडपॉइंट की जाँच करता है। मानव/डैशबोर्ड डायग्नोस्टिक्स के लिए
`/api/monitoring/health` उपलब्ध रहता है; कंटेनर HEALTHCHECK को वापस उसकी ओर इंगित करने के लिए (उदाहरण के लिए,
गहन स्वास्थ्य प्रवर्तन हेतु), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट करें।
वह पाथ एक **गहन** जाँच (DB + मॉनिटरिंग सारांश) है — यदि आप इसे फिर से चुनते हैं, तो Docker के
कम आवृत्ति वाले `HEALTHCHECK` के लिए उपयुक्त है, लेकिन Kubernetes `livenessProbe`
अंतरालों के लिए **नहीं**।

ऑर्केस्ट्रेटर (Kubernetes, Nomad आदि) के लिए:

| प्रोब            | इसे प्राथमिकता दें                                                  | इससे बचें                                          |
| ---------------- | ------------------------------------------------------------------- | -------------------------------------------------- |
| लाइवनेस          | HTTP `GET /livez`, या मुख्य पोर्ट (`PORT`, डिफ़ॉल्ट `20128`) पर TCP | लाइवनेस के रूप में `/api/monitoring/health`        |
| रेडीनेस          | HTTP `GET /healthz`                                                 | ऐसे सख़्त टाइमआउट जो व्यस्त इवेंट लूप को मृत मानें |
| गहन / ब्लैकबॉक्स | `/api/monitoring/health`                                            | —                                                  |

`/healthz` प्रोसेस लाइफ़साइकल (`ok` / `starting` / `stopping`) की रिपोर्ट करता है। `/livez`
केवल प्रोसेस के सक्रिय होने की जाँच करता है (जब भी हैंडलर चल सकता है, 200; यह
रेडीनेस की प्रतीक्षा नहीं करता)। दोनों अब भी अनुरोध प्रबंधन वाले उसी Node इवेंट लूप पर चलते हैं, इसलिए
CPU-बाउंड कैटलॉग या कंप्रेशन कार्य उनमें विलंब कर सकता है — व्यस्त ≠ मृत। यदि HTTP
प्रोब टाइम आउट हों, तो TCP लाइवनेस को प्राथमिकता दें। संपूर्ण प्रोब मार्गदर्शन:
[मॉनिटरिंग गाइड — Kubernetes प्रोब अनुशंसाएँ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)।

## Caddy के साथ Docker Compose (HTTPS Auto-TLS)

OmniRoute को Caddy की स्वचालित SSL प्रोविज़निंग का उपयोग करके सुरक्षित रूप से उपलब्ध कराया जा सकता है। सुनिश्चित करें कि आपके डोमेन का DNS A रिकॉर्ड आपके सर्वर के IP की ओर इंगित करता है।

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
      # OAuth कॉलबैक, डैशबोर्ड लिंक और जनरेट किए गए सार्वजनिक URL के लिए ब्राउज़र-सामना करने वाला ओरिजिन।
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # शेड्यूल किए गए जॉब / स्वयं फ़ेच करने के लिए आंतरिक सर्वर-टू-सर्वर URL।
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

Caddy अपस्ट्रीम कंटेनर के लिए मानक फ़ॉरवर्डिंग हेडर सेट करता है। OmniRoute, OAuth कॉलबैक और जनरेट किए गए सार्वजनिक लिंक के लिए `NEXT_PUBLIC_BASE_URL` को कैनोनिकल सार्वजनिक ओरिजिन के रूप में उपयोग करता है; प्रमाणीकृत डैशबोर्ड राइट अनुरोध समान-ओरिजिन अनुरोधों के साथ सत्र-बद्ध CSRF सुरक्षा का उपयोग करते हैं। `OMNIROUTE_TRUST_PROXY` को केवल उन उन्नत डिप्लॉयमेंट के लिए सक्षम करें जहाँ आप स्पष्ट कॉन्फ़िगरेशन के बजाय विश्वसनीय फ़ॉरवर्डेड हेडर से सार्वजनिक ओरिजिन प्राप्त करने के लिए जानबूझकर OmniRoute को कॉन्फ़िगर करना चाहते हैं।

## Cloudflare Quick Tunnel

Docker डिप्लॉयमेंट के लिए डैशबोर्ड समर्थन में `Dashboard → Endpoints` पर एक-क्लिक **Cloudflare Quick Tunnel** शामिल है। पहली बार सक्षम करने पर यह केवल आवश्यकता होने पर `cloudflared` डाउनलोड करता है, आपके वर्तमान `/v1` एंडपॉइंट के लिए एक अस्थायी टनल शुरू करता है, और जनरेट किया गया `https://*.trycloudflare.com/v1` URL आपके सामान्य सार्वजनिक URL के ठीक नीचे दिखाता है।

एंडपॉइंट टनल पैनल (Cloudflare, Tailscale, ngrok) को सक्रिय टनल की स्थिति बदले बिना `Settings → Appearance` से दिखाया या छिपाया जा सकता है।

### टनल संबंधी नोट्स

- Quick Tunnel URL अस्थायी होते हैं और प्रत्येक रीस्टार्ट के बाद बदल जाते हैं।
- OmniRoute या कंटेनर के रीस्टार्ट होने के बाद Quick Tunnel स्वचालित रूप से पुनर्स्थापित नहीं होते। आवश्यकता होने पर उन्हें डैशबोर्ड से फिर से सक्षम करें।
- प्रबंधित इंस्टॉल वर्तमान में `x64` / `arm64` पर Linux, macOS और Windows का समर्थन करता है।
- सीमित कंटेनर परिवेशों में शोर उत्पन्न करने वाली QUIC UDP बफ़र चेतावनियों से बचने के लिए, प्रबंधित Quick Tunnel डिफ़ॉल्ट रूप से HTTP/2 ट्रांसपोर्ट का उपयोग करते हैं। यदि आप कोई अलग ट्रांसपोर्ट चाहते हैं, तो `CLOUDFLARED_PROTOCOL=quic` या `auto` सेट करें।
- Docker इमेज में सिस्टम CA रूट शामिल होते हैं और उन्हें प्रबंधित `cloudflared` को दिया जाता है, जिससे कंटेनर के भीतर टनल बूटस्ट्रैप होने पर TLS विश्वास संबंधी विफलताओं से बचा जा सकता है।
- यदि आप चाहते हैं कि OmniRoute किसी बाइनरी को डाउनलोड करने के बजाय पहले से मौजूद बाइनरी का उपयोग करे, तो `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` सेट करें।

## इमेज टैग

| इमेज                     | टैग      | आकार   | विवरण                                              |
| ------------------------ | -------- | ------ | -------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | उच्चतम **प्रकाशित** स्थिर SemVer (git `main` नहीं) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps के लिए इस श्रेणी के टैग को पिन करें         |

मल्टी-प्लेटफ़ॉर्म मैनिफ़ेस्ट: `linux/amd64` + `linux/arm64` नेटिव (Apple Silicon, AWS Graviton, Raspberry Pi)। Docker स्वचालित रूप से मेल खाने वाला आर्किटेक्चर चुनता है; यदि आपको ARM होस्ट पर AMD64 एम्यूलेशन को बाध्य करना हो, तो `--platform linux/amd64` पास करें।

### रिलीज़ चैनल

OmniRoute स्थिर रिलीज़, सक्रिय रिलीज़-ब्रांच परीक्षण और डेवलपमेंट बिल्ड के लिए अलग-अलग Docker चैनल प्रकाशित करता है।

| चैनल                            | स्रोत                                | परिवर्तनशीलता                  | अनुशंसित उपयोग                                                                                                              |
| ------------------------------- | ------------------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | हस्ताक्षरित/संस्करणयुक्त रिलीज़      | अपरिवर्तनीय                    | ऐसे प्रोडक्शन डिप्लॉयमेंट जो किसी सटीक रिलीज़ को पिन करते हैं                                                               |
| `:latest` / `:latest-web`       | उच्चतम **प्रकाशित** स्थिर SemVer     | परिवर्तनशील स्थिर पॉइंटर       | SemVer प्रकाशन जॉब के **बाद** स्थिर रिलीज़ का अनुसरण करता है — `main` या अप्रकाशित `release/v*` कमिट को ट्रैक **नहीं** करता |
| `:next` / `:next-web`           | वर्तमान डिफ़ॉल्ट `release/v*` ब्रांच | परिवर्तनशील प्री-रिलीज़ पॉइंटर | उन सुधारों का परीक्षण जो सक्रिय रिलीज़ ब्रांच में आ चुके हैं, लेकिन अभी तक स्थिर रिलीज़ में शामिल नहीं हैं                  |
| `:main` / `:main-web`           | `main` ब्रांच                        | परिवर्तनशील डेवलपमेंट पॉइंटर   | केवल डेवलपमेंट और इंटीग्रेशन परीक्षण                                                                                        |

#### प्री-रिलीज़ चैनल का उपयोग करना

`next` चैनल को वर्तमान डिफ़ॉल्ट `release/v*` ब्रांच पर प्रत्येक पुश के साथ फिर से बनाया जाता है और AMD64 तथा ARM64, दोनों के लिए प्रकाशित किया जाता है। पुरानी मेंटेनेंस ब्रांच इसे ओवरराइट नहीं कर सकतीं। यह चैनल उन सुधारों के लिए पुल की जा सकने वाली इमेज प्रदान करता है जिन्हें अगला स्थिर टैग बनाए जाने से पहले सक्रिय रिलीज़ ब्रांच में मर्ज किया जा चुका है।

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose के लिए, चयनित प्रोफ़ाइल द्वारा उपयोग किए जाने वाले इमेज टैग को ओवरराइड करें, फिर सर्विस को पुल करके दोबारा बनाएँ:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### सुरक्षा और रोलबैक

`next` एक फ़्लोटिंग प्री-रिलीज़ चैनल है। यह सक्रिय रिलीज़ ब्रांच पर किसी भी पुश के साथ बदल सकता है और **प्रोडक्शन उपयोग के लिए समर्थित नहीं है**। किसी विशिष्ट बिल्ड का मूल्यांकन करते समय इमेज डाइजेस्ट को पिन करें:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

परीक्षण से पहले, OmniRoute डेटा वॉल्यूम या bind-mounted डेटा डायरेक्टरी का बैकअप लें। वापस रोल करने के लिए, पहले उपयोग किए गए स्थिर वर्ज़न या digest को पुनर्स्थापित करें और कंटेनर को दोबारा बनाएँ:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch बिल्ड कभी भी `latest` को स्थानांतरित नहीं कर सकता; केवल एक योग्य स्थिर semantic version ही स्थिर पॉइंटर को आगे बढ़ा सकता है। `next` इमेज में रिलीज़ इमेज निरीक्षण और CRITICAL कमज़ोरियों को अवरुद्ध करने वाला गेट बरकरार रहता है।

**`latest`, git के लिए नवीनता की गारंटी नहीं है।** `main` या सक्रिय `release/v*` ब्रांच पर मर्ज किए गए सुधार `:latest` में तब तक **नहीं** होते, जब तक कि एक स्थिर SemVer इमेज प्रकाशित न हो जाए और publish जॉब `:latest` को आगे न बढ़ा दे (उस SemVer के समान digest)। यदि `latest` स्थिर दिखाई देता है जबकि GitHub पर सुधार पहले से दिख रहा है, तो रिलीज़ ब्रांच का परीक्षण करने के लिए `:next` पुल करें या SemVer टैग की प्रतीक्षा करें।

| आपकी आवश्यकता                                                                        | इसका उपयोग करें                       |
| ------------------------------------------------------------------------------------ | ------------------------------------- |
| ऐसा GitOps / प्रोडक्शन जिसमें बदलाव नहीं होना चाहिए                                  | `:X.Y.Z` (या इमेज digest) को पिन करें |
| प्रकाशित स्थिर रिलीज़ का अनुसरण करना और प्रत्येक रिलीज़ पर पुनर्निर्माण स्वीकार करना | `:latest`                             |
| अप्रकाशित `release/v*` कमिट का परीक्षण करना                                          | `:next` (प्रोडक्शन के लिए नहीं)       |
| `main` का परीक्षण करना                                                               | `:main` (प्रोडक्शन के लिए नहीं)       |

## उपलब्धता: डिफ़ॉल्ट SQLite एकल-रेप्लिका है

मानक Docker / Kubernetes OmniRoute में **एक Node प्रक्रिया + एक SQLite राइटर** होता है। इस टोपोलॉजी पर उच्च उपलब्धता **समर्थित नहीं है**।

| बाधा                                   | परिणाम                                                                                                                                                                                                                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| एकल राइटर                              | एक ही SQLite फ़ाइल के लिए कई रेप्लिका **न चलाएँ**। इससे DB दूषित हो जाता है।                                                                                                                                                                                                                                       |
| रीक्रिएट / रीस्टार्ट / HEALTHCHECK किल | सक्रिय SSE, डैशबोर्ड सत्रों और इन-मेमोरी स्थिति का **पूर्ण आउटेज**। प्रत्येक कनेक्टेड क्लाइंट डिस्कनेक्ट हो जाता है। खाली-एंडपॉइंट अवधि के दौरान नए अनुरोधों को OmniRoute JSON के बजाय रिवर्स-प्रॉक्सी **`502 Bad Gateway: Unknown error`** मिलता है — क्लाइंट इसे प्रदाता की विफलता से अलग नहीं कर सकते (#11015)। |
| `/healthz` वाला ही इवेंट लूप           | व्यस्त कैटलॉग या कंप्रेशन टिक प्रोब में देरी कर सकता है; कम टाइमआउट तब **एकमात्र** रेप्लिका को रीस्टार्ट कर देता है।                                                                                                                                                                                               |

**प्रोब मैट्रिक्स** ([Kubernetes प्रोब अनुशंसाएँ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) भी देखें):

| प्रोब          | लक्ष्य                                                     | इसका उपयोग न करें                                   |
| -------------- | ---------------------------------------------------------- | --------------------------------------------------- |
| लाइवनेस        | `PORT` पर TCP (डिफ़ॉल्ट `20128`), या सॉफ्ट HTTP `/healthz` | `/api/monitoring/health`                            |
| रेडीनेस        | HTTP `GET /healthz`                                        | कम टाइमआउट, जो व्यस्त इवेंट लूप को बंद मान लेते हैं |
| विस्तृत / मानव | `/api/monitoring/health`                                   | स्वचालित kubelet लाइवनेस                            |

**अपग्रेड:** प्रत्येक सत्र के डिस्कनेक्ट होने की अपेक्षा करें। यदि संभव हो, तो क्लाइंट को ड्रेन करें; डिफ़ॉल्ट SQLite पर कोई रोलिंग अपडेट नहीं है। Compose `restart: unless-stopped` और Docker `HEALTHCHECK` भी कंटेनर के Unhealthy होने पर एकमात्र प्रक्रिया को बदल देंगे — प्रभाव का दायरा वही रहेगा।

**एकल रेप्लिका** के लिए Kubernetes स्निपेट (Recreate आवश्यक है; एक SQLite फ़ाइल के लिए `replicas` न बढ़ाएँ):

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

`preStop` स्लीप kube को SIGTERM से पहले Service एंडपॉइंट हटाने देता है, ताकि **नया** ट्रैफ़िक बंद हो रही प्रक्रिया तक पहुँचना बंद कर दे। सक्रिय `/v1/responses` SSE को हेवीवेट एडमिशन लीज़ के माध्यम से `SHUTDOWN_TIMEOUT_MS` (डिफ़ॉल्ट 30s) तक ड्रेन किया जाता है (#11015)। जो नए अनुरोध फिर भी प्रक्रिया तक पहुँचते हैं, उन्हें `503` + `Retry-After: 5` मिलता है। प्रतिस्थापन के Ready होने तक Recreate का खाली-एंडपॉइंट अंतराल एक पूर्ण आउटेज बना रहता है — यह SQLite टोपोलॉजी है, प्रोब का गलत कॉन्फ़िगरेशन नहीं।

बाहरी Postgres / मल्टी-राइटर HA कोई **प्रलेखित मानक मार्ग नहीं** है। यदि आपको HA की आवश्यकता है, तो एकल रेप्लिका बनाए रखें या ऐसी टोपोलॉजी चलाएँ जिसे प्रोजेक्ट ने अलग से परीक्षण और प्रलेखित किया हो। Postgres/MySQL से संबंधित कार्य [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) में है। उसके जारी होने तक, **बड़े** `/v1/responses` की क्षमता बढ़ाने का एकमात्र समर्थित तरीका N स्वतंत्र प्रक्रियाएँ (अगला अनुभाग) हैं, न कि एक वॉल्यूम पर `replicas > 1`।

## स्केल-आउट: N स्वतंत्र प्रक्रियाएँ

एक Node प्रक्रिया **एक V8 हीप** होती है। दो ओवरलैपिंग ~3 MiB / ~750k-token कोडिंग-एजेंट `POST /v1/responses` (RTK + Caveman) उस हीप को ~12 Gi पर अबॉर्ट कर देते हैं (`FATAL ERROR: Reached heap limit`) और 16 Gi cgroup को OOM कर सकते हैं। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) देखें। यह माप एक **मेमोरी-बजट** चेतावनी है, एक साथ चलने वाले लंबे `/v1/responses` की उत्पाद-स्तरीय अधिकतम सीमा दो नहीं है। हेवीवेट चैट का प्रवेश स्वतः निर्धारित किए गए इनजेस्ट बाइट बजट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) द्वारा नियंत्रित होता है, जिसका आकार उसी V8/cgroup सीमा से तय किया जाता है — पहले से आकारित प्रक्रिया में इसे बढ़ाकर ओवरराइड करना (या पुरानी `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` अनुरोध-संख्या सीमा सेट करना) अबॉर्ट को फिर से उत्पन्न करता है। छोटी चैट, `/healthz`, `/v1/models`, और MCP उस सीमा में **शामिल नहीं** हैं।

### एक प्रक्रिया: दो से अधिक लंबे `/v1/responses`

एक **स्वस्थ** प्रक्रिया (हीप `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` से नीचे, डिफ़ॉल्ट `0.75`) दो से अधिक समवर्ती लंबे `POST /v1/responses` चला **सकती है**, जब प्रक्रिया-व्यापी इनफ्लाइट-बाइट बजट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) में अभी भी जगह हो। `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (डिफ़ॉल्ट 256 KiB) या उससे बड़े बॉडी संरचना-भारी अनुरोधों वाला वही हेवीवेट लीज़ लेते हैं और उसी [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` एस्केप (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) का उपयोग करते हैं। दर्जनों समवर्ती लंबे SSE क्लाइंट (ऑपरेटरों को अक्सर 40–50 की आवश्यकता होती है) एक **मेमोरी-बजट** प्रश्न है — हीप + प्राथमिक/हेडरूम स्लॉट + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` का आकार तय करें — न कि उत्पाद की कठोर “अधिकतम 2” सीमा। दबाव में आया हीप अब भी पुनः प्रयास योग्य `503` के साथ लोड घटाता है, ताकि #7849 दोबारा न हो।

**हीप्स को गुणा करने** (स्वतंत्र V8 old-spaces) के लिए **अभी**:

| यह करें                                                                                                                                                    | यह न करें                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **N containers/pods** चलाएँ, प्रत्येक का **अपना** `DATA_DIR` / वॉल्यूम हो                                                                                  | एक SQLite फ़ाइल के लिए `replicas > 1` सेट करें            |
| हीप / इनफ्लाइट-बाइट बजट के आधार पर हेवी इन-फ्लाइट + स्वस्थ-हेडरूम का आकार निर्धारित करें; 1–2 रूढ़िवादी #7849 डिफ़ॉल्ट है, उत्पाद की कठोर अधिकतम सीमा नहीं | एक प्रक्रिया को 8× RAM और असीमित संख्या सीमा दें          |
| वैकल्पिक: **साझा कोटा काउंटरों** के लिए `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                               | Redis को साझा SQLite समझें — वह ऐसा नहीं है               |
| प्रदाता सीक्रेट्स को प्रत्येक इंस्टेंस में डुप्लिकेट करें (या विभाजित डैशबोर्ड स्वीकार करें)                                                               | सभी इंस्टेंस में एक डैशबोर्ड / एक कॉल-लॉग की अपेक्षा करें |
| सामने कोई भी लोड बैलेंसर रखें; API कुंजी या सेशन के आधार पर स्टिकी रूटिंग पर्याप्त है                                                                      | विक्रेता-विशिष्ट आकार-जागरूक मिडलवेयर को आवश्यक मानें     |

हार्डवेयर: प्रति-इंस्टेंस समवर्ती लंबे `/v1/responses` एक **मेमोरी-बजट** प्रश्न हैं (हीप + इनफ्लाइट-बाइट / #10110)। स्वतंत्र `DATA_DIR` वाले `N` इंस्टेंस फिर भी हीप्स को गुणा करते हैं: होस्ट RAM को `N × cgroup` संभालना होगा, न कि “N=8 वाला एक 16 Gi pod।” एक SQLite फ़ाइल पर कभी भी `replicas > 1` न रखें।

Compose रूपरेखा (दो हीप्स, दो वॉल्यूम — `deploy.replicas: 2` नहीं):

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

इन-प्रोसेस घनत्व (HTTP आइसोलेट से बाहर कम्प्रेशन) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) है। साझा टिकाऊ स्टेट पर एक तार्किक क्लस्टर [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) है।

## महत्वपूर्ण टिप्पणियाँ

- **SQLite WAL मोड:** `docker stop` को पूरा होने देना चाहिए, ताकि OmniRoute नवीनतम परिवर्तनों को वापस `storage.sqlite` में चेकपॉइंट कर सके। बंडल की गई Compose फ़ाइलों में पहले से ही 40s की स्टॉप ग्रेस अवधि सेट है। यदि आप इमेज को सीधे चलाते हैं, तो `--stop-timeout 40` बनाए रखें।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** यदि नियमित/लिखने-से-पहले के बैकअप बाहरी रूप से प्रबंधित किए जाते हैं, तो इसे `true` पर सेट करें। मौजूदा डेटाबेस के माइग्रेशन के लिए फिर भी उनका अपना टिकाऊ सुरक्षा स्नैपशॉट और सामूहिक-माइग्रेशन सुरक्षा आवश्यक है।
- **डेटा स्थायित्व:** कंटेनर के पुनः प्रारंभ होने पर अपने डेटाबेस, कुंजियों और कॉन्फ़िगरेशन को बनाए रखने के लिए हमेशा `/app/data` पर एक वॉल्यूम माउंट करें।
- **पोर्ट कॉन्फ़िगरेशन:** डिफ़ॉल्ट `20128` पोर्ट को बदलने के लिए `PORT` एनवायरनमेंट वेरिएबल को ओवरराइड करें।

## यह भी देखें

- [VM डिप्लॉयमेंट गाइड](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लॉयमेंट गाइड](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io पर डिप्लॉय करें
- [एनवायरनमेंट कॉन्फ़िगरेशन](../reference/ENVIRONMENT.md) — संपूर्ण `.env` संदर्भ
