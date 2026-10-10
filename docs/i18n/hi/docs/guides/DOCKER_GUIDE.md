# 🐳 Docker Guide — OmniRoute (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker परिनियोजन का संपूर्ण संदर्भ। तुरंत शुरुआत करने के लिए, [README का Docker अनुभाग](../README.md#-docker) देखें।

## विषय-सूची

- [त्वरित रूप से चलाएँ](#quick-run)
- [पर्यावरण फ़ाइल के साथ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [उपलब्ध प्रोफ़ाइल](#available-profiles)
- [जब OmniRoute Docker में चलता है, तब होस्ट CLI टूल कॉन्फ़िगर करना](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis साइडकार](#redis-sidecar)
- [प्रोडक्शन Compose](#production-compose)
- [Dockerfile चरण](#dockerfile-stages)
- [महत्वपूर्ण पर्यावरण वेरिएबल](#critical-environment-variables)
- [Caddy (HTTPS) के साथ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare क्विक टनल](#cloudflare-quick-tunnel)
- [इमेज टैग](#image-tags)
- [उपलब्धता: डिफ़ॉल्ट SQLite केवल एक रेप्लिका का समर्थन करता है](#availability-default-sqlite-is-single-replica)
- [Docker के भीतर Gemini की क्षेत्रीय त्रुटियाँ](#gemini-regional-errors-inside-docker)
- [महत्वपूर्ण टिप्पणियाँ](#important-notes)

---

## त्वरित रूप से चलाएँ

> **एक कमांड से स्वयं होस्ट करना है?**
> [स्वयं-होस्टिंग मार्गदर्शिका](../getting-started/SELF_HOST_GUIDE.md) देखें —
> `docker compose -f docker-compose.selfhost.yml up -d` (प्रकाशित इमेज +
> Redis, केवल लूपबैक, प्रोफ़ाइल चुनने की आवश्यकता नहीं)। नीचे दिया गया त्वरित तरीका
> उन उपयोगकर्ताओं के लिए एकल-कंटेनर विकल्प है, जो पहले से Redis कहीं और चला रहे हैं।

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

# CLI प्रोफ़ाइल (Claude Code, Codex, OpenClaw अंतर्निहित)
docker compose --profile cli up -d

# होस्ट प्रोफ़ाइल (मुख्यतः Linux के लिए; होस्ट CLI बाइनरी को केवल-पढ़ने योग्य रूप में माउंट करता है)
docker compose --profile host up -d

# वेब प्रोफ़ाइल (वेब-सत्र प्रदाताओं के लिए Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI साइडकार को संयोजित करें
docker compose --profile cli --profile cliproxyapi up -d
```

## उपलब्ध प्रोफ़ाइल

OmniRoute मुख्य परिनियोजन संरचनाओं के लिए Compose प्रोफ़ाइल प्रदान करता है। अपने परिवेश से मेल खाने वाला प्रोफ़ाइल चुनें।

| प्रोफ़ाइल         | सेवा             | कब उपयोग करें                                                                                                                                           | कमांड                                        |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (डिफ़ॉल्ट) | `omniroute-base` | हेडलेस सर्वर / न्यूनतम रनटाइम, किसी प्रदाता की CLI शामिल नहीं                                                                                           | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | एजेंटिक वर्कफ़्लो, जो `omniroute providers/setup/doctor` और शामिल CLI (Codex, Claude Code, Droid, OpenClaw) को कॉल करते हैं                             | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | वे Linux होस्ट, जो `~/.local/bin`, `~/.codex`, `~/.claude` आदि को केवल-पढ़ने योग्य रूप में माउंट करके होस्ट CLI तक `network_mode` जैसे एक्सेस चाहते हैं | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | अपस्ट्रीम CLI प्रॉक्सी के लिए पोर्ट `8317` पर [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) साइडकार चलाएँ                                 | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | ऐसे वेब-सत्र प्रदाता जिन्हें ब्राउज़र चाहिए: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` बनाता है, Chromium शामिल है)                  | `docker compose --profile web up -d`         |

> एकाधिक प्रोफ़ाइल को संयोजित किया जा सकता है: `docker compose --profile cli --profile cliproxyapi up -d`।

## Docker में OmniRoute चलाते समय होस्ट CLI टूल्स को कॉन्फ़िगर करना

`omniroute setup-codex`, `setup-claude`, `config set <tool>` और डैशबोर्ड का
**कॉन्फ़िग सहेजें** बटन, सभी `~/.codex/*.config.toml` जैसी फ़ाइलें लिखते हैं। इन पाथ का
अर्थ केवल उस मशीन पर होता है जहाँ CLI वास्तव में चलता है। इन्हें कंटेनर के अंदर
चलाने पर फ़ाइल कंटेनर की अपनी होम डायरेक्टरी (`/home/node` —
इमेज `USER node` के रूप में चलती है) में लिखी जाती है, जहाँ कोई भी होस्ट CLI इसे कभी नहीं पढ़ेगा और जहाँ कंटेनर
दोबारा बनाए जाते ही यह हटा दी जाती है।

OmniRoute इसका पता लगाता है और ऐसी सफलता रिपोर्ट करने के बजाय, जिसका आप उपयोग नहीं कर सकते,
निर्देशों के साथ लिखने से इनकार करता है: CLI `2` के साथ बंद हो जाता है और API `422`
के साथ `containerEphemeralTarget: true` लौटाता है।

### अनुशंसित: CLI को होस्ट पर और OmniRoute को Docker में चलाएँ

कंटेनर API उपलब्ध कराता है; CLI आपके होस्ट टूल्स को कॉन्फ़िगर करता है।

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI को कंटेनर की ओर निर्देशित करें
omniroute setup-codex                      # आपके होस्ट पर वास्तविक ~/.codex लिखता है
```

जब Codex, Claude Code, Cursor या इसी तरह के टूल आपके
लैपटॉप पर चलते हैं, तब यह सही विकल्प है — और यही सामान्य सेटअप है।

### विकल्प: होस्ट कॉन्फ़िग डायरेक्टरियों को bind-mount करें (`host` प्रोफ़ाइल)

यदि आप चाहते हैं कि कंटेनर स्वयं आपके होस्ट कॉन्फ़िग में लिखे, तो
डायरेक्टरियों को माउंट करें और `CLI_CONFIG_HOME` को माउंट रूट पर इंगित करें। `host` प्रोफ़ाइल
पहले से ही ऐसा करती है:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount ही पाथ को विश्वसनीय बनाता है: OmniRoute
`/proc/self/mountinfo` पढ़ता है और माउंट किए गए पाथ पर (और उन डायरेक्टरियों में
जिनकी चाइल्ड डायरेक्टरियाँ माउंट हैं, जो ऊपर दिए गए `/host-home` की संरचना से बिल्कुल मेल खाता है) लिखने की अनुमति देता है, जबकि
अनमाउंट किए गए पाथ पर लिखने से अब भी इनकार करता है।

### वैकल्पिक उपाय: कंटेनर के अपने CLI कॉन्फ़िगर करें (संयम से उपयोग करें)

जब CLI वास्तव में कंटेनर के अंदर मौजूद हों (`cli` प्रोफ़ाइल), तब लिखना
जानबूझकर किया जाता है। किसी भी `setup-*` कमांड को `--allow-container-write` दें, या सर्वर के लिए
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सेट करें। लिखने की प्रक्रिया
इस चेतावनी के साथ जारी रहती है कि यह कंटेनर के बाद बनी नहीं रहेगी।

> **सुरक्षा चेतावनी — `cli` प्रोफ़ाइल + `docker.sock` माउंट।**
> `cli` प्रोफ़ाइल `/var/run/docker.sock` को bind-mount करती है, ताकि कंटेनर के अंदर मौजूद
> auto-updater होस्ट daemon से स्टैक को दोबारा बना सके
> (`src/lib/system/autoUpdate.ts` उस सॉकेट की जाँच करता है और उसके
> अनुपस्थित होने पर Docker पाथ को छोड़ देता है)। वह सॉकेट **होस्ट-root विश्वास
> सीमा** है: उस तक पहुँच रखने वाली कोई भी चीज़ होस्ट Docker daemon को
> root के रूप में नियंत्रित करती है — वह होस्ट पर किसी भी कंटेनर को बना सकती है, उसका निरीक्षण कर सकती है, उसे रोक और हटा सकती है।
> निहितार्थ:
>
> 1. **`cli` प्रोफ़ाइल के पोर्ट को कभी भी नेटवर्क पर उजागर न करें।** इसे
>    `127.0.0.1` पर प्रकाशित करें (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN से पहुँच योग्य `cli` प्रोफ़ाइल किसी भी डैशबोर्ड-स्तरीय RCE को
>    पूर्ण होस्ट नियंत्रण में बदल देती है।
> 2. **`cli` प्रोफ़ाइल में कोई अतिरिक्त होस्ट डायरेक्टरी bind न करें।**
>    Docker सॉकेट के साथ कोई भी अतिरिक्त माउंट कंटेनर को आपके फ़ाइलसिस्टम
>    और होस्ट कॉन्फ़िग पर पूर्ण read/write पहुँच देता है। यदि किसी टूल को
>    प्रोजेक्ट देखने की आवश्यकता है, तो उसे CLI बाइनरी के साथ स्थानीय रूप से चलाएँ — उसे
>    `cli` कंटेनर में माउंट न करें।
>
> यदि आपको कंटेनर के अंदर auto-update की आवश्यकता नहीं है, तो `cli` प्रोफ़ाइल को बंद रखें
> (`COMPOSE_PROFILES=core,redis` या इससे छोटा)। अन्य प्रोफ़ाइल
> Docker सॉकेट को माउंट नहीं करती हैं।
>
> MITM से संबंधित threat model के लिए `docs/security/MITM-TPROXY-DECRYPT.md` देखें (git में; `/docs` में संकलित नहीं),
> और `codex`/`claude-code`/`droid`/`openclaw` बाइनरी की provenance chain के लिए
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
- `REDIS_BIND_HOST` — वह होस्ट इंटरफ़ेस जिस पर पोर्ट प्रकाशित किया जाता है। डिफ़ॉल्ट `127.0.0.1` है।

> **डिफ़ॉल्ट रूप से लूपबैक क्यों:** साइडकार `requirepass` के बिना चलता है, और ऐप
> कंटेनर कंपोज़ नेटवर्क (`redis:6379`) के माध्यम से उस तक पहुँचते हैं — प्रकाशित पोर्ट
> केवल होस्ट-साइड टूलिंग (`redis-cli`, स्थानीय `npm run dev`) के लिए है। इसे
> `0.0.0.0` पर प्रकाशित करने से बिना प्रमाणीकरण वाला Redis आपके LAN के प्रत्येक होस्ट के लिए उपलब्ध हो जाएगा। यदि आप
> `REDIS_BIND_HOST=0.0.0.0` सेट करते हैं, तो सेवा के `command:` में `--requirepass` भी जोड़ें।

**Redis को अक्षम करना** अनुशंसित नहीं है (रेट लिमिटर इन-मेमोरी फ़ॉलबैक पर आ जाएगा)। यदि ऐसा करना आवश्यक हो, तो `docker-compose.yml` में `redis:` सेवा ब्लॉक को हटाएँ/कमेंट करें या इसे शून्य तक स्केल करें:

```bash
docker compose up -d --scale redis=0
```

## प्रोडक्शन कंपोज़

डेवलपमेंट के साथ चलने वाले अलग-थलग प्रोडक्शन स्नैपशॉट के लिए `docker-compose.prod.yml` का उपयोग करें।

| विवरण                   | मान                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| फ़ाइल                   | `docker-compose.prod.yml`                                                                |
| डिफ़ॉल्ट डैशबोर्ड पोर्ट | `PROD_DASHBOARD_PORT=20130` (आंतरिक `${DASHBOARD_PORT:-20128}` पर मैप किया गया)          |
| डिफ़ॉल्ट API पोर्ट      | `PROD_API_PORT=20131`                                                                    |
| इमेज                    | `omniroute:prod` (`runner-cli` टारगेट से बिल्ड किया गया)                                 |
| Redis कंटेनर            | `omniroute-redis-prod` (`redis:8.6.2`, समर्पित `redis-prod-data` वॉल्यूम)                |
| डेटा वॉल्यूम            | `omniroute-prod-data` (नामित, रीबिल्ड के दौरान बना रहता है)                              |
| हेल्थचेक                | `node healthcheck.mjs` + `redis-cli ping`, जहाँ `depends_on` Redis की हेल्थ पर निर्भर है |

उपयोग का तरीका:

```bash
# प्रोडक्शन स्टैक बिल्ड और शुरू करें
docker compose -f docker-compose.prod.yml up -d --build

# लॉग लगातार देखें
docker compose -f docker-compose.prod.yml logs -f

# बंद करें (वॉल्यूम बनाए रखें)
docker compose -f docker-compose.prod.yml down
```

प्रोडक्शन स्टैक डेवलपमेंट कंपोज़ के समानांतर चलता है (कंटेनर के नाम, पोर्ट और वॉल्यूम अलग हैं), इसलिए प्रोडक्शन को चालू रखते हुए आप स्थानीय रूप से काम करना जारी रख सकते हैं।

## Dockerfile चरण

रिपॉज़िटरी में एक मल्टी-स्टेज Dockerfile (`Dockerfile`) शामिल है। चार चरण उपलब्ध हैं; अपने उपयोग के अनुसार सही `target` चुनें।

| चरण           | बेस इमेज              | उद्देश्य                                                                                                                                                                                                                                                                                           |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | डिपेंडेंसी इंस्टॉल करता है (`npm ci --legacy-peer-deps`) और `npm run build` चलाता है (डिफ़ॉल्ट रूप से Turbopack — नीचे बिल्ड-समय संसाधन देखें)                                                                                                                                                     |
| `runner-base` | `node:26-trixie-slim` | Next.js के स्टैंडअलोन आउटपुट वाला प्रोडक्शन रनटाइम। **कोई प्रोवाइडर CLI बंडल नहीं किया गया है।**                                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` और ग्लोबल CLI जोड़ता है: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`। **एजेंटिक वर्कफ़्लो के लिए इसे चुनें।**                                                                                                                           |
| `runner-web`  | `runner-base`         | वेब-सेशन प्रोवाइडर के लिए Playwright + Chromium ब्राउज़र (`--with-deps`) जोड़ता है: `gemini-web`, `claude-web`, `claude-turnstile`। **इन प्रोवाइडर का उपयोग करते समय इसे चुनें** — इसके बिना सामान्य इमेज अनुरोध के समय विफल हो जाती है (Release Channels के अंतर्गत `-web` संबंधी टिप्पणी देखें)। |

किसी विशिष्ट लक्ष्य को मैन्युअल रूप से बिल्ड करें:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### बिल्ड-समय संसाधन

तीन बिल्ड आर्ग यह नियंत्रित करते हैं कि `builder` चरण में कितने संसाधन लगते हैं। ये केवल बिल्ड-समय के लिए हैं —
`OMNIROUTE_MEMORY_MB` (नीचे) एक अलग रनटाइम सेटिंग है।

| बिल्ड आर्ग                  | डिफ़ॉल्ट | प्रभाव                                                                                               |
| --------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` webpack के साथ बिल्ड करता है: कम पीक मेमोरी, लेकिन धीमा। `1` Turbopack को चुनता है।              |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | शुरू किए गए `next build` के लिए V8 हीप सीमा (`--max-old-space-size`)।                                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL` को मान देता है; Next पेज-डेटा संग्रह के लिए `workers = N - 1` निर्धारित करता है। |

बड़े बिल्डर पर `OMNIROUTE_BUILD_WORKERS` को बढ़ाना चाहिए और सीमित संसाधनों वाला बिल्ड
`✓ Compiled successfully` के **बाद** बंद हो जाए, तो सबसे पहले इसी पर संदेह करना
चाहिए। प्रत्येक पेज-डेटा वर्कर अपनी अलग प्रोसेस है, और पैरेंट `next build` भी;
एक लाइव VPS पुनरुत्पादन (issue #7518) में प्रत्येक प्रोसेस की पीक RSS
~4.5 GB मापी गई, जो `NODE_OPTIONS` हीप फ़्लैग से स्वतंत्र थी (Turbopack, V8 हीप
के बाहर नेटिव/Rust मेमोरी में कंपाइल करता है)। `2` का डिफ़ॉल्ट (→ 1 वर्कर, कुल
2 प्रोसेस) उन 16 GB / 4 vCPU GitHub-होस्टेड रनर के लिए निर्धारित किया गया है,
जिनका उपयोग प्रकाशन पाइपलाइन करती है। `8` पर (→ 7 वर्कर) उस रनर की मेमोरी
समाप्त हो गई और buildkit ने `ResourceExhausted: ... cannot allocate memory`
के साथ चरण को विफल कर दिया; प्रत्येक प्रोसेस की RSS का अनुमान लगाने के बजाय
उसे सीधे मापने पर `3` (→ 2 वर्कर) भी उपलब्ध मेमोरी में फ़िट नहीं हुआ।
`tests/unit/docker-build-memory-budget.test.ts` मापे गए आँकड़े के आधार पर गणना
करता है और यदि कोई भी सेटिंग रनर की क्षमता से अधिक हो जाए, तो विफल हो जाता है।

Turbopack ऐसी नेटिव Rust मेमोरी में कंपाइल करता है जो V8 हीप के **बाहर** रहती है,
इसलिए `OMNIROUTE_BUILD_MEMORY_MB` इसे सीमित नहीं करता। मेमोरी सीमा वाले होस्ट पर
बिल्ड को OOM किलर बिना किसी त्रुटि संदेश के SIGKILL कर देता है — यह
`Creating an optimized production build` के बीच में ही रुक जाता है, जो
आउट-ऑफ़-मेमोरी के बजाय अटका हुआ प्रतीत होता है। इसीलिए `Dockerfile` का डिफ़ॉल्ट
webpack (`OMNIROUTE_USE_TURBOPACK=0`) है, जबकि `npm run dev` / `npm run build`
में कोड का डिफ़ॉल्ट Turbopack है: बिना किसी बिल्ड आर्ग वाला साधारण
`docker build .` (जिसे Railway और अन्य वन-क्लिक होस्ट चलाते हैं) मेमोरी-सीमित
बिल्डर पर बिना संदेश के बंद नहीं होना चाहिए। प्रकाशित इमेज पहले से ही
`docker-publish.yml` में स्पष्ट रूप से `OMNIROUTE_USE_TURBOPACK=0` पास करती हैं।
पर्याप्त RAM वाले बिल्डर पर तेज़ बिल्ड के लिए Turbopack चुनें:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम है, इसलिए `next build` एक पैरेंट **और** एक वर्कर
प्रोसेस चलाता है और प्रत्येक अलग से `OMNIROUTE_BUILD_MEMORY_MB` का पालन करता है।
कंटेनर की सीमा इस मान के लगभग दोगुने से अधिक रखें, केवल इसके बराबर नहीं।

इस ट्री पर मापा गया (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| बंडलर     | कंटेनर सीमा    | परिणाम                             |
| --------- | -------------- | ---------------------------------- |
| Turbopack | 8 GiB / 16 GiB | दोनों पर OOM-killed, बिना संदेश के |
| webpack   | 8 GiB          | बिल्ड वर्कर SIGKILLed              |
| webpack   | 12 GiB         | सफल, पीक 11.1 GiB                  |

### रनटाइम डिफ़ॉल्ट

`runner-base` द्वारा एक्सपोर्ट किए गए डिफ़ॉल्ट: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`।

Docker में मेमोरी व्यवहार:

- इमेज `OMNIROUTE_MEMORY_MB=1024` सेट करती है और उससे `NODE_OPTIONS=--max-old-space-size=1024` प्राप्त करती है।
- वास्तविक सर्वर प्रोसेस को standalone launcher शुरू करता है, जो `OMNIROUTE_MEMORY_MB` पढ़ता है और `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` जोड़ता है।
- Node बार-बार दिए गए `--max-old-space-size` के अंतिम मान का उपयोग करता है, इसलिए `OMNIROUTE_MEMORY_MB` सेट करने से प्रभावी Docker heap सीमा नियंत्रित होती है।
- चूँकि इमेज इसे हमेशा सेट करती है, इसलिए launcher का अपना RAM के अनुसार समायोजित fallback Docker के अंतर्गत कभी लागू नहीं होता। workload के लिए इसे स्पष्ट रूप से बढ़ाएँ (नीचे तालिका देखें)। coding-agent `/v1/responses` के लिए `2048` अभी भी बहुत कम है।

### coding agents के लिए runtime RAM

1 GiB का Docker default dashboard/हल्की chat के लिए न्यूनतम सीमा है, production के लिए उपयुक्त आकार नहीं। लंबे `POST /v1/responses` bodies (सैकड़ों messages, दर्जनों tools) compression के दौरान कई in-memory graphs बनाए रखते हैं। एक साथ चलने वाले ~3 MiB / ~750k-token के दो requests ने **12 GiB** old-space पर V8 को रोक दिया है (`FATAL ERROR: Reached heap limit`) और 16 GiB cgroup OOM की सीमा भी पार की है। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) देखें।

cgroup `--memory` का आकार **heap से अधिक रखें** — native buffers, SQLite और compression intermediates V8 के बाहर रहते हैं।

| Workload                            | `OMNIROUTE_MEMORY_MB` | Container / cgroup             | टिप्पणियाँ                                                                                                            |
| ----------------------------------- | --------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Dashboard, एक हल्की chat            | `1024` (इमेज default) | ≥2 GiB                         |                                                                                                                       |
| एक coding agent (Claude/Codex/Grok) | `8192`                | ≥10 GiB                        | सामान्य single-session `/v1/responses`                                                                                |
| एक साथ दो लंबे `/v1/responses`      | `10240`–`12288`       | ≥12–16 GiB                     | ~12 GiB heap पर V8 abort मापा गया                                                                                     |
| एक साथ तीन या अधिक लंबे contexts    | एक process पर न चलाएँ | क्रमिक रूप से चलाएँ / अधिक RAM | default heavyweight admission में 1 request in-flight होता है; RAM बढ़ाए बिना इसे बढ़ाने पर abort फिर से होने लगता है |

bare metal पर `omniroute serve`, `OMNIROUTE_MEMORY_MB` के **unset** होने पर RAM का ~35% (सीमा `[512, 4096]`) निर्धारित करता है। Docker हमेशा `1024` सेट करता है, इसलिए official image में वह calibration कभी नहीं होता।

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## महत्वपूर्ण एनवायरनमेंट वेरिएबल

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) में प्रलेखित डिफ़ॉल्ट के अतिरिक्त, Docker के अंतर्गत चलाते समय निम्नलिखित वेरिएबल सबसे अधिक महत्वपूर्ण हैं:

| वेरिएबल                       | उद्देश्य                                                                                                                                                                                                                                                                           | डिफ़ॉल्ट                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ब्रिज के लिए साझा सीक्रेट। **प्रोडक्शन में आवश्यक** — इसे एक मजबूत रैंडम स्ट्रिंग पर सेट करें।                                                                                                                                                                           | सेट नहीं (प्रदान करना आवश्यक है) |
| `REDIS_URL`                   | रेट लिमिटर / कैश बैकएंड के लिए कनेक्शन स्ट्रिंग                                                                                                                                                                                                                                    | `redis://redis:6379`             |
| `REDIS_PORT`                  | बंडल किए गए Redis कंटेनर के लिए होस्ट-साइड पोर्ट                                                                                                                                                                                                                                   | `6379`                           |
| `REDIS_BIND_HOST`             | वह होस्ट इंटरफ़ेस जिस पर बंडल किया गया Redis पोर्ट प्रकाशित होता है (जब तक आप AUTH नहीं जोड़ते, लूपबैक)                                                                                                                                                                            | `127.0.0.1`                      |
| `AUTO_UPDATE_HOST_REPO_DIR`   | स्वयं-अपडेट वर्कफ़्लो के लिए `/workspace/omniroute` पर `cli` प्रोफ़ाइल में माउंट किया गया होस्ट पथ                                                                                                                                                                                 | `.` (वर्तमान डायरेक्टरी)         |
| `OMNIROUTE_MEMORY_MB`         | Docker स्टैंडअलोन सर्वर के लिए रनटाइम Node हीप सीमा; ऊपर दिए गए इमेज डिफ़ॉल्ट को ओवरराइड करती है। कोडिंग एजेंट: `8192`+ ([रनटाइम RAM](#runtime-ram-for-coding-agents) देखें)।                                                                                                      | `1024`                           |
| `DASHBOARD_PORT` / `API_PORT` | डैशबोर्ड (20128) और API (20129) के लिए एक्सपोज़ किए गए पोर्ट ओवरराइड करें                                                                                                                                                                                                          | `20128` / `20129`                |
| `APP_BIND_HOST`               | वह होस्ट इंटरफ़ेस जिस पर docker-compose डैशबोर्ड/API/live-WS पोर्ट प्रकाशित करता है। `REQUIRE_API_KEY=false` (डिफ़ॉल्ट) के साथ, `0.0.0.0` अनाम `/v1` प्रॉक्सी को LAN पर एक्सपोज़ करता है — इसे केवल `REQUIRE_API_KEY=true` के साथ या सामने रिवर्स प्रॉक्सी होने पर ही व्यापक करें। | `127.0.0.1`                      |
| `CLIPROXY_BIND_HOST`          | वह होस्ट इंटरफ़ेस जिस पर docker-compose `cliproxyapi` साइडकार प्रकाशित करता है — इसका डेटा वॉल्यूम प्रदाता क्रेडेंशियल संग्रहीत करता है।                                                                                                                                           | `127.0.0.1`                      |
| `OMNIROUTE_PLUGINS_DIR`       | वह डायरेक्टरी जिसे रनटाइम प्लगइन स्कैनर पढ़ता है और जिसमें इंस्टॉल करता है। प्लगइन bind-mounted होने पर इसे सेट करें: डिफ़ॉल्ट `HOME` का अनुसरण करता है, जिसे इमेज आवश्यक रूप से एक्सपोर्ट नहीं करती।                                                                              | `~/.omniroute/plugins`           |
| `OMNIROUTE_BASE_PATH`         | ऐप को रिवर्स प्रॉक्सी के पीछे प्रकाशित किए जाने पर URL उपपथ (उदा. `/omniroute`)                                                                                                                                                                                                    | _(खाली = रूट)_                   |
| `NEXT_PUBLIC_BASE_URL`        | उपपथ सहित सार्वजनिक ब्राउज़र ओरिजिन (उदा. `https://host/omniroute`)                                                                                                                                                                                                                | सेट नहीं                         |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` के लिए होस्ट-साइड डैशबोर्ड पोर्ट                                                                                                                                                                                                                         | `20130`                          |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` साइडकार के लिए होस्ट-साइड पोर्ट                                                                                                                                                                                                                                      | `8317`                           |

## उपपथ पर रिवर्स प्रॉक्सी (Traefik / nginx)

Next.js का `basePath` स्टैंडअलोन बंडल में कंपाइल किया जाता है। OmniRoute ऐप रूट पर एक सेंटिनल फ़ाइल में पहले से शामिल किए गए मान को रिकॉर्ड करता है (`npm run build` के दौरान लिखा जाता है; `scripts/docker/ensure-docker-base-path.mjs` द्वारा पढ़ा जाता है) और कंटेनर शुरू होने पर इसकी तुलना `OMNIROUTE_BASE_PATH` से करता है। जब दोनों अलग होते हैं और इमेज डोमेन रूट के लिए बनाई गई थी, तो `node dev/run-standalone.mjs` चलने से पहले एंट्रीपॉइंट स्टैंडअलोन मैनिफ़ेस्ट, एम्बेड किए गए `basePath`/`assetPrefix` लिटरल (Next 16 केवल `assetPrefix` से SSR एसेट URL रेंडर करता है — पैचर उपपथ को उसमें भी प्रतिबिंबित करता है), पहले से शामिल `/_next/static` एसेट URL (क्लाइंट-रेफ़रेंस मैनिफ़ेस्ट, मीडिया इंपोर्ट, पहले से रेंडर किए गए त्रुटि पृष्ठ) और क्लाइंट `process.env` शिम को फिर से लिखता है।

### Compose बिल्ड (अनुशंसित)

दोनों वेरिएबल `.env` में सेट करें, फिर इमेज और रनटाइम के बीच संगति सुनिश्चित करने के लिए दोबारा बिल्ड करें:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` को Docker बिल्ड आर्ग्युमेंट और रनटाइम एनवायरनमेंट वेरिएबल—दोनों के रूप में अग्रेषित करता है।

### पहले से बनी रूट इमेज + रनटाइम उपपथ

प्रकाशित `diegosouzapw/omniroute:*` इमेज डोमेन रूट के लिए बनाई गई हैं। फिर भी आप रनटाइम पर `OMNIROUTE_BASE_PATH` सेट कर सकते हैं; कंटेनर स्टार्टअप पर बंडल को एक बार पैच करता है। इसे संगत सार्वजनिक ओरिजिन के साथ उपयोग करें:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

रिवर्स प्रॉक्सी को **पूर्ण** बाहरी पथ अग्रेषित करने के लिए कॉन्फ़िगर करें (प्रीफ़िक्स न हटाएँ)। Traefik को `StripPrefix` के बिना `PathPrefix(`/omniroute`)` को कंटेनर पर रूट करना चाहिए, ताकि Next.js को `/omniroute/...` प्राप्त हो और वह `/omniroute/_next/...` से एसेट प्रदान करे।

Docker हेल्थचेक, सक्रिय `OMNIROUTE_BASE_PATH` से प्रीफ़िक्स किए गए हल्के `/healthz` लाइफ़साइकल एंडपॉइंट की जाँच करता है। मानव/डैशबोर्ड डायग्नोस्टिक्स के लिए `/api/monitoring/health` उपलब्ध रहता है; कंटेनर HEALTHCHECK को फिर से उस पर निर्देशित करने के लिए (उदाहरण के लिए, गहन स्वास्थ्य प्रवर्तन हेतु), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट करें। वह पथ एक **गहन** जाँच (DB + मॉनिटरिंग सारांश) है—यदि आप इसे दोबारा सक्षम करते हैं, तो यह Docker के कम आवृत्ति वाले `HEALTHCHECK` के लिए उपयुक्त है, लेकिन Kubernetes `livenessProbe` अंतरालों के लिए **नहीं**।

ऑर्केस्ट्रेटर (Kubernetes, Nomad, आदि) के लिए:

| जाँच             | प्राथमिकता दें                                                      | इससे बचें                                       |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------- |
| लाइवनेस          | HTTP `GET /livez`, या मुख्य पोर्ट (`PORT`, डिफ़ॉल्ट `20128`) पर TCP | लाइवनेस के रूप में `/api/monitoring/health`     |
| रेडीनेस          | HTTP `GET /healthz`                                                 | ऐसे कम टाइमआउट जो व्यस्त इवेंट लूप को मृत मानें |
| गहन / ब्लैकबॉक्स | `/api/monitoring/health`                                            | —                                               |

`/healthz` प्रोसेस लाइफ़साइकल (`ok` / `starting` / `stopping`) की रिपोर्ट करता है। `/livez` केवल यह जाँचता है कि प्रोसेस जीवित है (जब भी हैंडलर चल सकता है, 200 देता है; यह रेडीनेस की प्रतीक्षा नहीं करता)। दोनों अभी भी अनुरोध प्रबंधन वाले उसी Node इवेंट लूप पर चलते हैं, इसलिए CPU-बाउंड कैटलॉग या कंप्रेशन कार्य उनमें देरी कर सकते हैं—व्यस्त ≠ मृत। यदि HTTP जाँच का समय समाप्त हो जाता है, तो TCP लाइवनेस को प्राथमिकता दें। संपूर्ण जाँच मार्गदर्शन:
[मॉनिटरिंग गाइड — Kubernetes जाँच अनुशंसाएँ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)।

## Caddy के साथ Docker Compose (HTTPS Auto-TLS)

OmniRoute को Caddy की स्वचालित SSL प्रोविज़निंग का उपयोग करके सुरक्षित रूप से सार्वजनिक किया जा सकता है। सुनिश्चित करें कि आपके डोमेन का DNS A रिकॉर्ड आपके सर्वर के IP की ओर इंगित करता है।

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
      # शेड्यूल किए गए कार्यों / स्वयं-फ़ेच के लिए आंतरिक सर्वर-टू-सर्वर URL।
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

Caddy अपस्ट्रीम कंटेनर के लिए मानक फ़ॉरवर्डिंग हेडर सेट करता है। OmniRoute, OAuth कॉलबैक और जनरेट किए गए सार्वजनिक लिंक के लिए `NEXT_PUBLIC_BASE_URL` को कैनोनिकल सार्वजनिक ओरिजिन के रूप में उपयोग करता है; प्रमाणीकृत डैशबोर्ड राइट समान-ओरिजिन अनुरोधों के साथ सत्र-बद्ध CSRF सुरक्षा का उपयोग करते हैं। `OMNIROUTE_TRUST_PROXY` को केवल उन उन्नत डिप्लॉयमेंट के लिए सक्षम करें, जहाँ आप स्पष्ट कॉन्फ़िगरेशन के बजाय विश्वसनीय फ़ॉरवर्ड किए गए हेडर से सार्वजनिक ओरिजिन प्राप्त करने के लिए जानबूझकर OmniRoute को कॉन्फ़िगर करना चाहते हैं।

## Cloudflare Quick Tunnel

Docker डिप्लॉयमेंट के लिए डैशबोर्ड समर्थन में `Dashboard → Endpoints` पर एक-क्लिक वाला **Cloudflare Quick Tunnel** शामिल है। पहली बार सक्षम करने पर `cloudflared` केवल आवश्यकता होने पर डाउनलोड होता है, आपके वर्तमान `/v1` एंडपॉइंट के लिए एक अस्थायी टनल शुरू करता है और जनरेट किया गया `https://*.trycloudflare.com/v1` URL सीधे आपके सामान्य सार्वजनिक URL के नीचे दिखाता है।

एंडपॉइंट टनल पैनल (Cloudflare, Tailscale, ngrok) को सक्रिय टनल की स्थिति बदले बिना `Settings → Appearance` से दिखाया या छिपाया जा सकता है।

### टनल संबंधी टिप्पणियाँ

- Quick Tunnel URL अस्थायी होते हैं और प्रत्येक रीस्टार्ट के बाद बदल जाते हैं।
- OmniRoute या कंटेनर रीस्टार्ट होने के बाद Quick Tunnel स्वचालित रूप से पुनर्स्थापित नहीं होते। आवश्यकता होने पर उन्हें डैशबोर्ड से फिर से सक्षम करें।
- प्रबंधित इंस्टॉल वर्तमान में `x64` / `arm64` पर Linux, macOS और Windows का समर्थन करता है।
- सीमित कंटेनर परिवेशों में शोरपूर्ण QUIC UDP बफ़र चेतावनियों से बचने के लिए, प्रबंधित Quick Tunnel डिफ़ॉल्ट रूप से HTTP/2 ट्रांसपोर्ट का उपयोग करते हैं। यदि आप किसी अन्य ट्रांसपोर्ट का उपयोग करना चाहते हैं, तो `CLOUDFLARED_PROTOCOL=quic` या `auto` सेट करें।
- Docker इमेज में सिस्टम CA रूट शामिल होते हैं और उन्हें प्रबंधित `cloudflared` को भेजा जाता है, जिससे कंटेनर के भीतर टनल बूटस्ट्रैप होने पर TLS विश्वास संबंधी विफलताओं से बचा जा सकता है।
- यदि आप चाहते हैं कि OmniRoute किसी बाइनरी को डाउनलोड करने के बजाय मौजूदा बाइनरी का उपयोग करे, तो `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` सेट करें।

## इमेज टैग

| इमेज                     | टैग      | आकार   | विवरण                                              |
| ------------------------ | -------- | ------ | -------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | उच्चतम **प्रकाशित** स्थिर SemVer (git `main` नहीं) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps के लिए इस श्रेणी के टैग को पिन करें         |

बहु-प्लेटफ़ॉर्म मैनिफ़ेस्ट: `linux/amd64` + `linux/arm64` नेटिव (Apple Silicon, AWS Graviton, Raspberry Pi)। Docker स्वचालित रूप से मेल खाने वाली आर्किटेक्चर चुनता है; यदि आपको ARM होस्ट पर AMD64 एमुलेशन को बाध्य करना हो, तो `--platform linux/amd64` पास करें।

### रिलीज़ चैनल

OmniRoute स्थिर रिलीज़, सक्रिय रिलीज़-ब्रांच परीक्षण और डेवलपमेंट बिल्ड के लिए अलग-अलग Docker चैनल प्रकाशित करता है।

| चैनल                            | स्रोत                                | परिवर्तनशीलता                  | अनुशंसित उपयोग                                                                                                                |
| ------------------------------- | ------------------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | हस्ताक्षरित/संस्करणित रिलीज़         | अपरिवर्तनीय                    | ऐसे प्रोडक्शन डिप्लॉयमेंट जो किसी सटीक रिलीज़ को पिन करते हैं                                                                 |
| `:latest` / `:latest-web`       | उच्चतम **प्रकाशित** स्थिर SemVer     | परिवर्तनशील स्थिर पॉइंटर       | SemVer प्रकाशन कार्य के **बाद** स्थिर रिलीज़ का अनुसरण करता है — `main` या अप्रकाशित `release/v*` कमिट को ट्रैक **नहीं** करता |
| `:next` / `:next-web`           | वर्तमान डिफ़ॉल्ट `release/v*` ब्रांच | परिवर्तनशील प्री-रिलीज़ पॉइंटर | उन सुधारों का परीक्षण करना जो सक्रिय रिलीज़ ब्रांच में आ चुके हैं, लेकिन अभी तक स्थिर रिलीज़ में नहीं हैं                     |
| `:main` / `:main-web`           | `main` ब्रांच                        | परिवर्तनशील डेवलपमेंट पॉइंटर   | केवल डेवलपमेंट और इंटीग्रेशन परीक्षण                                                                                          |

#### वेब-सत्र प्रदाता: `-web` इमेज

ऊपर दिया गया प्रत्येक चैनल `-web` टैग (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) के रूप में भी उपलब्ध है, जिसे `runner-web` चरण से बनाया जाता है — वही इमेज, साथ में Playwright और Chromium ब्राउज़र। सामान्य इमेज Chromium के **बिना** आती है; `gemini-web`, `claude-web` और `claude-turnstile` को इसकी आवश्यकता होती है।

विफलता स्टार्टअप के समय नहीं, बल्कि बाद के लिए स्थगित रहती है: ये प्रदाता अपने मॉडल सूचीबद्ध करते हैं और डैशबोर्ड में कनेक्टेड दिखाई देते हैं, तथा केवल पहला अनुरोध निम्न त्रुटि के साथ विफल होता है

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

यदि आप इन प्रदाताओं का उपयोग करते हैं, तो जिस चैनल पर आप पहले से हैं उसका `-web` टैग पुल करें — इसके अलावा कुछ भी नहीं बदलता। npm/CLI इंस्टॉल (कोई Docker इमेज नहीं) पर इसके समकक्ष अनुपस्थित घटक ब्राउज़र बाइनरी है: होस्ट पर `npx playwright install chromium` चलाएँ।

#### प्री-रिलीज़ चैनल का उपयोग करना

`next` चैनल को मौजूदा डिफ़ॉल्ट `release/v*` ब्रांच पर प्रत्येक पुश के साथ दोबारा बनाया जाता है और AMD64 तथा ARM64, दोनों के लिए प्रकाशित किया जाता है। पुरानी रखरखाव ब्रांच इसे ओवरराइट नहीं कर सकतीं। यह चैनल उन सुधारों के लिए पुल की जा सकने वाली इमेज प्रदान करता है, जिन्हें अगला स्थिर टैग बनाए जाने से पहले सक्रिय रिलीज़ ब्रांच में मर्ज किया गया है।

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

`next` एक परिवर्तनशील प्री-रिलीज़ चैनल है। सक्रिय रिलीज़ ब्रांच पर किसी भी पुश के साथ यह बदल सकता है और यह **प्रोडक्शन उपयोग के लिए समर्थित नहीं है**। किसी विशिष्ट बिल्ड का मूल्यांकन करते समय इमेज डाइजेस्ट को पिन करें:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

परीक्षण से पहले, OmniRoute डेटा वॉल्यूम या बाइंड-माउंट की गई डेटा डायरेक्टरी का बैकअप लें। रोलबैक करने के लिए, पहले उपयोग किए गए स्थिर संस्करण या डाइजेस्ट को पुनर्स्थापित करें और कंटेनर को दोबारा बनाएँ:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

रिलीज़-ब्रांच बिल्ड कभी भी `latest` को आगे नहीं बढ़ा सकता; केवल एक योग्य स्थिर सिमेंटिक संस्करण ही स्थिर पॉइंटर को प्रमोट कर सकता है। `next` इमेज, रिलीज़ इमेज के निरीक्षण और CRITICAL कमजोरियों को रोकने वाले गेट को बनाए रखती हैं।

**`latest`, git के लिए नवीनता की गारंटी नहीं है।** `main` या सक्रिय `release/v*` ब्रांच पर मर्ज किए गए सुधार `:latest` में तब तक उपलब्ध **नहीं** होते, जब तक कोई स्थिर SemVer इमेज प्रकाशित नहीं हो जाती और प्रकाशन जॉब `:latest` को प्रमोट नहीं कर देती (उस SemVer के समान डाइजेस्ट के साथ)। यदि GitHub पर सुधार पहले से दिखाई देने के बावजूद `latest` अपरिवर्तित दिखता है, तो रिलीज़ ब्रांच का परीक्षण करने के लिए `:next` पुल करें या SemVer टैग की प्रतीक्षा करें।

| आपकी आवश्यकता                                                                                  | इसका उपयोग करें                         |
| ---------------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / प्रोडक्शन, जिसमें अनपेक्षित बदलाव नहीं होना चाहिए                                     | `:X.Y.Z` (या इमेज डाइजेस्ट) को पिन करें |
| प्रकाशित स्थिर संस्करणों का अनुसरण करना और प्रत्येक रिलीज़ पर दोबारा बनाए जाने को स्वीकार करना | `:latest`                               |
| अप्रकाशित `release/v*` कमिट का परीक्षण करना                                                    | `:next` (प्रोडक्शन के लिए नहीं)         |
| `main` का परीक्षण करना                                                                         | `:main` (प्रोडक्शन के लिए नहीं)         |

## उपलब्धता: डिफ़ॉल्ट SQLite एकल-रेप्लिका है

मानक Docker / Kubernetes OmniRoute में **एक Node प्रक्रिया + एक SQLite राइटर** होता है। इस टोपोलॉजी पर उच्च उपलब्धता **समर्थित नहीं है**।

| बाधा                                   | परिणाम                                                                                                                                                                                                                                                                                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| एकल राइटर                              | एक ही SQLite फ़ाइल के विरुद्ध कई रेप्लिका **न चलाएँ**। इससे DB दूषित हो जाता है।                                                                                                                                                                                                                                 |
| रीक्रिएट / रीस्टार्ट / HEALTHCHECK किल | जारी SSE, डैशबोर्ड सत्रों और इन-मेमोरी स्थिति का **पूर्ण आउटेज**। प्रत्येक कनेक्टेड क्लाइंट डिस्कनेक्ट हो जाता है। खाली-एंडपॉइंट अवधि के दौरान नए अनुरोधों को OmniRoute JSON के बजाय रिवर्स-प्रॉक्सी **`502 Bad Gateway: Unknown error`** मिलता है — क्लाइंट इसे प्रदाता की विफलता से अलग नहीं कर सकते (#11015)। |
| `/healthz` के समान इवेंट लूप           | व्यस्त कैटलॉग या कम्प्रेशन टिक प्रोब को विलंबित कर सकता है; छोटा टाइमआउट तब **एकमात्र** रेप्लिका को रीस्टार्ट कर देता है।                                                                                                                                                                                        |

**प्रोब मैट्रिक्स** ([Kubernetes प्रोब अनुशंसाएँ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) भी देखें):

| प्रोब                 | लक्ष्य                                                     | इसका उपयोग न करें                                 |
| --------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| लाइवनेस               | `PORT` पर TCP (डिफ़ॉल्ट `20128`), या सॉफ्ट HTTP `/healthz` | `/api/monitoring/health`                          |
| रेडीनेस               | HTTP `GET /healthz`                                        | ऐसे सख्त टाइमआउट जो व्यस्त इवेंट लूप को मृत मानें |
| डीप / मनुष्यों के लिए | `/api/monitoring/health`                                   | स्वचालित kubelet लाइवनेस                          |

**अपग्रेड:** प्रत्येक सत्र के डिस्कनेक्ट होने की अपेक्षा रखें। यदि संभव हो तो क्लाइंट ड्रेन करें; डिफ़ॉल्ट SQLite पर कोई रोलिंग अपडेट नहीं है। Compose `restart: unless-stopped` और Docker `HEALTHCHECK` भी कंटेनर के Unhealthy होने पर एकमात्र प्रक्रिया को बदल देंगे — प्रभाव का दायरा समान रहेगा।

**एकल रेप्लिका** के लिए Kubernetes स्निपेट (Recreate आवश्यक है; एक SQLite फ़ाइल के विरुद्ध `replicas` न बढ़ाएँ):

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

`preStop` स्लीप kube को SIGTERM से पहले Service एंडपॉइंट हटाने देता है, ताकि **नया** ट्रैफ़िक बंद हो रही प्रक्रिया तक पहुँचना बंद कर दे। जारी `/v1/responses` SSE को हेवीवेट एडमिशन लीज़ के माध्यम से `SHUTDOWN_TIMEOUT_MS` (डिफ़ॉल्ट 30 सेकंड) तक ड्रेन किया जाता है (#11015)। जो नए अनुरोध फिर भी प्रक्रिया तक पहुँचते हैं, उन्हें `503` + `Retry-After: 5` मिलता है। प्रतिस्थापन के Ready होने तक Recreate का खाली-एंडपॉइंट अंतराल एक पूर्ण आउटेज बना रहता है — यह SQLite टोपोलॉजी के कारण है, प्रोब की गलत कॉन्फ़िगरेशन के कारण नहीं।

बाहरी Postgres / मल्टी-राइटर HA कोई **प्रलेखित** मानक पथ नहीं है। यदि आपको HA चाहिए, तो एकल रेप्लिका बनाए रखें या ऐसी टोपोलॉजी चलाएँ जिसे प्रोजेक्ट ने अलग से परीक्षण और प्रलेखित किया हो। Postgres/MySQL से संबंधित कार्य [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) में है। उसके उपलब्ध होने तक **बड़े** `/v1/responses` की क्षमता बढ़ाने का एकमात्र समर्थित तरीका N स्वतंत्र प्रक्रियाएँ (अगला अनुभाग) हैं, न कि एक वॉल्यूम पर `replicas > 1`।

## स्केल-आउट: N स्वतंत्र प्रक्रियाएँ

एक Node प्रक्रिया में **एक V8 heap** होता है। दो ओवरलैपिंग ~3 MiB / ~750k-token वाले coding-agent `POST /v1/responses` (RTK + Caveman) उस heap को ~12 Gi पर निरस्त कर देते हैं (`FATAL ERROR: Reached heap limit`) और 16 Gi cgroup को OOM कर सकते हैं। [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) देखें। यह माप एक **मेमोरी-बजट** चेतावनी है, दो समवर्ती लंबे `/v1/responses` की उत्पाद-स्तरीय कठोर अधिकतम सीमा नहीं। भारी chat प्रवेश को स्वतः निर्धारित ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) द्वारा नियंत्रित किया जाता है, जिसका आकार उसी V8/cgroup सीमा से तय होता है — पहले से आकार निर्धारित की गई प्रक्रिया पर इसे बढ़ाकर ओवरराइड करना (या पुरानी `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` अनुरोध-संख्या सीमा सेट करना) फिर से प्रक्रिया निरस्त होने की समस्या उत्पन्न करता है। छोटे chats, `/healthz`, `/v1/models`, और MCP उस सीमा में **शामिल नहीं** हैं।

### एक प्रक्रिया: दो से अधिक लंबे `/v1/responses`

एक **स्वस्थ** प्रक्रिया (heap, `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` से नीचे; डिफ़ॉल्ट `0.75`) दो से अधिक समवर्ती लंबे `POST /v1/responses` चला **सकती है**, बशर्ते प्रक्रिया-व्यापी inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) में अभी भी जगह हो। `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (डिफ़ॉल्ट 256 KiB) के बराबर या उससे बड़े bodies, संरचना-भारी अनुरोधों जैसा ही heavyweight lease लेते हैं और उसी [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) का उपयोग करते हैं। दर्जनों समवर्ती लंबे SSE clients (ऑपरेटरों को अक्सर 40–50 की आवश्यकता होती है) एक **मेमोरी-बजट** का प्रश्न है — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` का आकार निर्धारित करें — यह उत्पाद की कठोर “अधिकतम 2” सीमा नहीं है। दबाव में आया heap फिर भी पुनः प्रयास योग्य `503` के साथ लोड घटाता है, ताकि #7849 दोबारा न हो।

**heaps की संख्या बढ़ाने** (स्वतंत्र V8 old-spaces) के लिए **आज**:

| करें                                                                                                                                                        | न करें                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **N containers/pods** चलाएँ, प्रत्येक का अपना **अलग** `DATA_DIR` / volume हो                                                                                | एक SQLite file के विरुद्ध `replicas > 1` सेट न करें               |
| heap / inflight-byte budget के आधार पर heavy in-flight + healthy-headroom का आकार तय करें; 1–2 रूढ़िवादी #7849 डिफ़ॉल्ट है, उत्पाद की कठोर अधिकतम सीमा नहीं | एक प्रक्रिया को 8× RAM और असीमित संख्या-सीमा न दें                |
| वैकल्पिक: **साझा quota counters** के लिए `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                               | Redis को साझा SQLite न मानें — वह ऐसा नहीं है                     |
| provider secrets को प्रत्येक instance में कॉपी करें (या विभाजित dashboards स्वीकार करें)                                                                    | सभी instances के लिए एक dashboard / एक call-log की अपेक्षा न करें |
| आगे कोई भी load balancer लगाएँ; API key या session के आधार पर sticky routing पर्याप्त है                                                                    | किसी vendor-विशिष्ट size-aware middleware को आवश्यक न मानें       |

हार्डवेयर: प्रति-instance समवर्ती लंबे `/v1/responses` की संख्या एक **मेमोरी-बजट** का प्रश्न है (heap + inflight-byte / #10110)। `N` स्वतंत्र `DATA_DIR`s फिर भी heaps की संख्या बढ़ाते हैं: host RAM को `N × cgroup` संभालना होगा, न कि “N=8 वाला एक 16 Gi pod।” एक SQLite file पर कभी भी `replicas > 1` न चलाएँ।

Compose रूपरेखा (दो heaps, दो volumes — `deploy.replicas: 2` नहीं):

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

प्रक्रिया के भीतर घनत्व (HTTP isolate से compression हटाना) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) है। साझा टिकाऊ state पर एक तार्किक cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) है।

## Docker के अंदर Gemini की क्षेत्रीय त्रुटियाँ

Google AI Studio / Gemini API, HTTP 400 के साथ FAILED_PRECONDITION और
`User location is not supported for the API use.` लौटा सकता है। होस्ट पर सफल अनुरोध
यह सिद्ध नहीं करता कि कंटेनर भी उसी आउटबाउंड रूट का उपयोग करता है। DNS क्रम,
IPv4/IPv6 कनेक्टिविटी, VPN रूटिंग और कॉन्फ़िगर किए गए प्रॉक्सी अलग हो सकते हैं।
[Google के समर्थित क्षेत्र](https://ai.google.dev/gemini-api/docs/available-regions)
और वास्तविक कनेक्शन रूट, दोनों की जाँच करें; केवल यह त्रुटि खराब API कुंजी की पहचान नहीं करती।

### कनेक्शन-विशिष्ट प्रॉक्सी को प्राथमिकता दें

प्रभावित Gemini कनेक्शन के लिए OmniRoute के [प्रति-कनेक्शन प्रॉक्सी कॉन्फ़िगरेशन](../ops/PROXY_GUIDE.md#4-level-proxy-system)
का उपयोग करें, फिर उसी मॉडल के साथ **कनेक्शन का परीक्षण करें** और एक छोटा अनुरोध
दोहराएँ। इससे रूटिंग परिवर्तन केवल उसी कनेक्शन तक सीमित रहता है। सत्यापित करें
कि प्रॉक्सी कंटेनर से पहुँच योग्य है और कनेक्शन वास्तव में उसी को चुनता है।
रूट बदलने से अपस्ट्रीम क्षेत्रीय पात्रता की गारंटी नहीं मिलती।

### होस्ट और कंटेनर नेटवर्किंग की तुलना करें

प्रमाणित परिणामों की तुलना करते समय कुंजी, मॉडल और अनुरोध को समान रखें; किसी समस्या में
क्रेडेंशियल, प्रॉक्सी पासवर्ड या पूर्ण प्राधिकरण हेडर कभी पेस्ट न करें।
सबसे पहले जाँचें कि OS रिज़ॉल्वर कौन-से एड्रेस फ़ैमिली उपलब्ध कराता है; होस्ट और
कंटेनर के अंदर समान कमांड का उपयोग करें:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` को आपके द्वारा चलाए जाने वाले सर्विस से बदलें (उदाहरण के लिए, `omniroute-web`)। ये
कमांड क्रेडेंशियल या IP एड्रेस के बिना एड्रेस फ़ैमिली प्रिंट करते हैं। लौटाया गया `6`
केवल IPv6 DNS परिणाम दर्शाता है: यह उपयोग योग्य IPv6 रूट या API एक्सेस को **सिद्ध नहीं**
करता। जहाँ `curl` इंस्टॉल है, वहाँ दोनों परिवेशों में
`curl -4 -I https://generativelanguage.googleapis.com` की तुलना
`curl -6 -I https://generativelanguage.googleapis.com` से करें।
HTTP प्रतिक्रिया उस जाँच के लिए कनेक्टिविटी सिद्ध करती है, भले ही वह अप्रमाणित
त्रुटि हो; केवल प्रमाणित मॉडल अनुरोध ही Gemini की पात्रता की जाँच करता है।

### होस्ट-स्तरीय विकल्प: कार्यशील IPv6 और रिज़ॉल्वर नीति

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) के रिपोर्टर ने
अपने परिवेश में कंटेनर IPv6 सक्षम करके और glibc एड्रेस चयन बदलकर एक्सेस पुनर्स्थापित
किया। इसे परिवेश-विशिष्ट विकल्प मानें। रिज़ॉल्वर प्राथमिकताएँ समायोजित करने से पहले
कार्यशील होस्ट IPv6, कंटेनर इग्रेस/रूटिंग और फ़ायरवॉल नियमों की पुष्टि करें।
केवल एक निजी ULA एड्रेस सार्वजनिक IPv6 कनेक्टिविटी स्थापित नहीं करता।

Compose के डिफ़ॉल्ट नेटवर्क से पहले से जुड़े सर्विस के लिए, यह फ़्रैगमेंट
उस नेटवर्क पर IPv6 सक्षम करता है; अपने सर्विस, पोर्ट, वॉल्यूम और कॉन्फ़िगरेशन के
बाकी हिस्से को बनाए रखें:

```yaml
networks:
  default:
    enable_ipv6: true
```

नामित नेटवर्क के लिए, इसे उसी नेटवर्क पर सक्षम करें जिससे सर्विस वास्तव में जुड़ता है। Docker
ULA सबनेट आवंटित कर सकता है; स्पष्ट, गैर-अतिव्यापी सबनेट केवल तभी चुनें जब आपके नेटवर्क
को इसकी आवश्यकता हो। [Docker IPv6 नेटवर्किंग](https://docs.docker.com/engine/daemon/ipv6/)
और [Compose नेटवर्क विकल्प](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) देखें।

**glibc-आधारित इमेज** पर, `/etc/gai.conf` एड्रेस चयन को बदल सकता है। वर्तमान
रिपॉज़िटरी Dockerfile Debian का उपयोग करता है; कस्टम musl-आधारित इमेज इस तंत्र को साझा
नहीं करते। रिपोर्ट किया गया समायोजन ULA लेबल को `label fc00::/7 6` से
`label fc00::/7 1` में बदलता है। इमेज की पूर्ण नीति तालिका से शुरू करें और उसकी अन्य
प्रविष्टियों को बनाए रखें: `label` या `precedence` प्रविष्टि जोड़ने पर वह डिफ़ॉल्ट तालिका
प्रतिस्थापित हो जाती है, इसलिए केवल बदली हुई पंक्ति वाली फ़ाइल पर्याप्त नहीं है।
[glibc कॉन्फ़िगरेशन संदर्भ](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
इन अर्थ-विन्यासों का दस्तावेज़ीकरण करता है। समीक्षा की गई फ़ाइल को `/etc/gai.conf` पर
केवल-पढ़ने योग्य रूप में बाइंड-माउंट करें और इसे लागू करने के लिए सर्विस को फिर से बनाएँ।

यह उस कंटेनर के **सभी आउटबाउंड ट्रैफ़िक** के लिए OS एड्रेस चयन बदलता है।
यह प्रत्येक एप्लिकेशन को IPv6 चुनने के लिए बाध्य नहीं करता: Node का DNS क्रम और कनेक्शन
चयन भी महत्वपूर्ण हैं। विशेष रूप से, `--dns-result-order=ipv4first` IPv4 को प्राथमिकता
देता है और यह केवल-IPv4 विफलता का समाधान नहीं है। [Node DNS क्रम](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) देखें।

किसी भी होस्ट-स्तरीय परिवर्तन के बाद Gemini और अपने अन्य प्रोवाइडर का फिर से परीक्षण करें।
रोल बैक करने के लिए, कस्टम `gai.conf` माउंट हटाएँ, पिछला नेटवर्क कॉन्फ़िगरेशन पुनर्स्थापित
करें और रखरखाव अवधि के दौरान प्रभावित सर्विस/नेटवर्क को फिर से बनाएँ। किसी नेटवर्क को
फिर से बनाने से उससे जुड़े अन्य कंटेनर बाधित हो सकते हैं; स्थायी डेटा वॉल्यूम को न हटाएँ।

## महत्वपूर्ण नोट्स

- **SQLite WAL मोड:** `docker stop` को पूरा होने देना चाहिए, ताकि OmniRoute नवीनतम परिवर्तनों को वापस `storage.sqlite` में चेकपॉइंट कर सके। बंडल की गई Compose फ़ाइलों में पहले से ही 40s की स्टॉप ग्रेस अवधि निर्धारित है। यदि आप इमेज को सीधे चलाते हैं, तो `--stop-timeout 40` बनाए रखें।
- **`DISABLE_SQLITE_AUTO_BACKUP`:** यदि नियमित/प्री-राइट बैकअप बाहरी रूप से प्रबंधित किए जाते हैं, तो इसे `true` पर सेट करें। मौजूदा डेटाबेस के माइग्रेशन के लिए फिर भी उनका अपना टिकाऊ सुरक्षा स्नैपशॉट और सामूहिक माइग्रेशन सुरक्षा उपाय आवश्यक है।
- **डेटा स्थायित्व:** कंटेनर रीस्टार्ट के दौरान अपने डेटाबेस, कुंजियों और कॉन्फ़िगरेशन को बनाए रखने के लिए हमेशा `/app/data` पर एक वॉल्यूम माउंट करें।
- **पोर्ट कॉन्फ़िगरेशन:** डिफ़ॉल्ट `20128` पोर्ट बदलने के लिए `PORT` एनवायरनमेंट वेरिएबल को ओवरराइड करें।

## यह भी देखें

- [VM डिप्लॉयमेंट गाइड](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लॉयमेंट गाइड](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io पर डिप्लॉय करें
- [एनवायरनमेंट कॉन्फ़िगरेशन](../reference/ENVIRONMENT.md) — संपूर्ण `.env` संदर्भ
