# 🐳 Docker Guide — OmniRoute (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker उपयोजनाचा संपूर्ण संदर्भ. जलद प्रारंभासाठी, [README मधील Docker विभाग](../README.md#-docker) पहा.

## अनुक्रमणिका

- [त्वरित चालवा](#quick-run)
- [पर्यावरण फाइलसह](#with-environment-file)
- [Docker Compose](#docker-compose)
- [उपलब्ध प्रोफाइल](#available-profiles)
- [OmniRoute Docker मध्ये चालत असताना होस्ट CLI साधने कॉन्फिगर करणे](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis साइडकार](#redis-sidecar)
- [उत्पादनासाठी Compose](#production-compose)
- [Dockerfile टप्पे](#dockerfile-stages)
- [महत्त्वपूर्ण पर्यावरण चल](#critical-environment-variables)
- [Caddy (HTTPS) सह Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare त्वरित टनेल](#cloudflare-quick-tunnel)
- [इमेज टॅग](#image-tags)
- [उपलब्धता: डीफॉल्ट SQLite केवळ एका प्रतिकृतीसाठी आहे](#availability-default-sqlite-is-single-replica)
- [Docker मधील Gemini प्रादेशिक त्रुटी](#gemini-regional-errors-inside-docker)
- [महत्त्वाच्या सूचना](#important-notes)

---

## त्वरित चालवा

> **एका कमांडद्वारे स्वतः होस्ट करायचे आहे का?**
> [स्वयं-होस्ट मार्गदर्शक](../getting-started/SELF_HOST_GUIDE.md) पहा —
> `docker compose -f docker-compose.selfhost.yml up -d` (प्रकाशित इमेज +
> Redis, केवळ लूपबॅक, प्रोफाइल निवडीची आवश्यकता नाही). खालील त्वरित चालवण्याचा मार्ग
> आधीपासून इतरत्र Redis चालवणाऱ्या वापरकर्त्यांसाठी एकल-कंटेनर पर्याय आहे.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## पर्यावरण फाइलसह

```bash
# प्रथम .env कॉपी करून संपादित करा
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
# मूलभूत प्रोफाइल (CLI साधने नाहीत)
docker compose --profile base up -d

# CLI प्रोफाइल (Claude Code, Codex, OpenClaw अंगभूत)
docker compose --profile cli up -d

# होस्ट प्रोफाइल (प्रामुख्याने Linux साठी; होस्ट CLI बायनरी केवळ-वाचनीय स्वरूपात माउंट करते)
docker compose --profile host up -d

# वेब प्रोफाइल (वेब-सत्र प्रदात्यांसाठी Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI साइडकार एकत्र वापरा
docker compose --profile cli --profile cliproxyapi up -d
```

## उपलब्ध प्रोफाइल

OmniRoute मुख्य उपयोजन प्रकारांसाठी Compose प्रोफाइलसह उपलब्ध आहे. तुमच्या पर्यावरणाशी जुळणारे प्रोफाइल निवडा.

| प्रोफाइल         | सेवा             | केव्हा वापरावे                                                                                                                                    | कमांड                                        |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (डीफॉल्ट) | `omniroute-base` | हेडलेस सर्व्हर / किमान रनटाइम, कोणतेही प्रदाता CLI समाविष्ट नाहीत                                                                                 | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` आणि समाविष्ट CLI (Codex, Claude Code, Droid, OpenClaw) वापरणारे एजंटिक कार्यप्रवाह                             | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` इत्यादी केवळ-वाचनीय स्वरूपात माउंट करून होस्ट CLI मध्ये `network_mode`-सदृश प्रवेश हवा असलेले Linux होस्ट | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | अपस्ट्रीम CLI प्रॉक्सीकरणासाठी पोर्ट `8317` वर [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) साइडकार चालवा                          | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | ब्राउझर आवश्यक असलेले वेब-सत्र प्रदाते: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` बिल्ड करते, Chromium समाविष्ट आहे)           | `docker compose --profile web up -d`         |

> एकाधिक प्रोफाइल एकत्र वापरता येतात: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker मध्ये चालत असताना होस्ट CLI साधने कॉन्फिगर करणे

`omniroute setup-codex`, `setup-claude`, `config set <tool>` आणि डॅशबोर्डचे
**कॉन्फिग जतन करा** बटण हे सर्व `~/.codex/*.config.toml` सारख्या फायली लिहितात. त्या पाथना
केवळ CLI प्रत्यक्षात ज्या मशीनवर चालतो तेथेच अर्थ असतो. त्या कमांड्स कंटेनरमध्ये
चालवल्यास, लेखन कंटेनरच्या स्वतःच्या होममध्ये (`/home/node` —
इमेज `USER node` म्हणून चालते) होते, जिथून कोणताही होस्ट CLI ते कधीही वाचणार नाही आणि कंटेनर
पुन्हा तयार होताच ते काढून टाकले जाते.

OmniRoute हे ओळखते आणि तुम्हाला वापरता न येणारे यश नोंदवण्याऐवजी
सूचनांसह लेखन नाकारते: CLI `2` सह बंद होते आणि API `422`
सोबत `containerEphemeralTarget: true` असे उत्तर देते.

### शिफारस केलेली पद्धत: CLI होस्टवर आणि OmniRoute Docker मध्ये चालवा

कंटेनर API उपलब्ध करून देतो; CLI तुमची होस्ट साधने कॉन्फिगर करतो.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI ला कंटेनरकडे निर्देशित करा
omniroute setup-codex                      # तुमच्या होस्टवरील वास्तविक ~/.codex मध्ये लिहिते
```

Codex, Claude Code, Cursor किंवा तत्सम साधने तुमच्या लॅपटॉपवर चालत असतील,
तर हा योग्य पर्याय आहे — आणि हीच नेहमीची मांडणी असते.

### पर्याय: होस्ट कॉन्फिग डिरेक्टरी bind-mount करा (`host` प्रोफाइल)

कंटेनरनेच तुमचे होस्ट कॉन्फिग लिहावे असे तुम्हाला वाटत असल्यास,
डिरेक्टरी माउंट करा आणि `CLI_CONFIG_HOME` ला माउंट रूटकडे निर्देशित करा. `host` प्रोफाइल
हे आधीपासूनच करते:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount मुळेच पाथ विश्वसनीय ठरतो: OmniRoute
`/proc/self/mountinfo` वाचते आणि माउंट केलेल्या पाथवर (तसेच ज्यांच्या
चाइल्ड डिरेक्टरी माउंट केलेल्या आहेत अशा डिरेक्टरींवर, जे वरील `/host-home` च्या रचनेशी तंतोतंत जुळते)
लेखनास अनुमती देते, तर माउंट न केलेल्या पाथवरील लेखन अजूनही नाकारते.

### पर्यायी मार्ग: कंटेनरचे स्वतःचे CLI कॉन्फिगर करा (मर्यादितपणे वापरा)

जेव्हा CLI खरोखरच कंटेनरमध्ये असतात (`cli` प्रोफाइल), तेव्हा लेखन
हेतुपुरस्सर असते. कोणत्याही `setup-*` कमांडला `--allow-container-write` द्या किंवा सर्व्हरसाठी
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सेट करा. हे लेखन कंटेनरनंतर
टिकून राहणार नाही अशा इशाऱ्यासह पुढे जाते.

> **सुरक्षा इशारा — `cli` प्रोफाइल + `docker.sock` माउंट.**
> `cli` प्रोफाइल `/var/run/docker.sock` bind-mount करते, ज्यामुळे कंटेनरमधील
> ऑटो-अपडेटर होस्ट डिमनकडून स्टॅक पुन्हा तयार करू शकतो
> (`src/lib/system/autoUpdate.ts` त्या सॉकेटची तपासणी करते आणि ते
> अनुपस्थित असल्यास Docker पाथ वगळते). ते सॉकेट म्हणजे **होस्ट-root विश्वासाची
> सीमा** आहे: त्यापर्यंत पोहोचू शकणारी कोणतीही गोष्ट होस्ट Docker डिमनला
> root म्हणून नियंत्रित करते — ती होस्टवरील कोणताही कंटेनर तयार करू शकते, तपासू शकते, थांबवू शकते आणि काढून टाकू शकते.
> परिणाम:
>
> 1. **`cli` प्रोफाइलचा पोर्ट कधीही नेटवर्कवर उघडा करू नका.** तो
>    `127.0.0.1` वर प्रकाशित करा (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN वरून पोहोचता येणारे `cli` प्रोफाइल डॅशबोर्ड-स्तरीय कोणत्याही RCE ला
>    संपूर्ण होस्ट ताब्यात घेण्याची क्षमता देते.
> 2. **`cli` प्रोफाइलमध्ये कोणत्याही अतिरिक्त होस्ट डिरेक्टरी bind करू नका.**
>    Docker सॉकेटसोबत आणखी कोणतेही माउंट दिल्यास कंटेनरला तुमच्या फाइलसिस्टम आणि
>    होस्ट कॉन्फिगवर पूर्ण वाचन/लेखन प्रवेश मिळतो. एखाद्या साधनाला प्रकल्प पाहण्याची गरज असल्यास,
>    ते CLI बायनरीसह स्थानिकरीत्या चालवा — ते `cli` कंटेनरमध्ये माउंट करू नका.
>
> तुम्हाला कंटेनरमधील ऑटो-अपडेटची गरज नसल्यास, `cli` प्रोफाइल बंद ठेवा
> (`COMPOSE_PROFILES=core,redis` किंवा यापेक्षा लहान मूल्य). इतर प्रोफाइल
> Docker सॉकेट माउंट करत नाहीत.
>
> MITM संबंधित धोका मॉडेलसाठी `docs/security/MITM-TPROXY-DECRYPT.md` (git; `/docs` मध्ये संकलित केलेले नाही) पहा,
> तसेच `codex`/`claude-code`/`droid`/`openclaw` बायनरींच्या
> उत्पत्ती-साखळीसाठी `docs/security/SUPPLY_CHAIN.md` पहा.

## Redis साइडकार

OmniRoute वितरित रेट लिमिटर आणि सामायिक कॅशेसाठी Redis वर अवलंबून आहे. `redis` सेवा `docker-compose.yml` मध्ये **नेहमी परिभाषित केलेली असते** (तिच्यावर कोणतेही प्रोफाइल गेट नाही) आणि इतर कोणत्याही प्रोफाइलसोबत सुरू होते.

| तपशील                   | मूल्य                                   |
| ----------------------- | --------------------------------------- |
| इमेज                    | `redis:7-alpine`                        |
| कंटेनरचे नाव            | `omniroute-redis`                       |
| अंतर्गत पोर्ट           | `6379`                                  |
| होस्ट पोर्ट (ओव्हरराइड) | `REDIS_PORT` (डीफॉल्ट `6379`)           |
| होस्ट बाइंड (ओव्हरराइड) | `REDIS_BIND_HOST` (डीफॉल्ट `127.0.0.1`) |
| व्हॉल्यूम               | `omniroute-redis-data` → `/data`        |
| हेल्थचेक                | `redis-cli ping` (10s अंतराल)           |

संबंधित पर्यावरणीय चल:

- `REDIS_URL` — ॲपमध्ये इंजेक्ट केलेली कनेक्शन स्ट्रिंग (डीफॉल्टनुसार `redis://redis:6379`).
- `REDIS_PORT` — Redis कंटेनरसाठी होस्ट-साइड पोर्ट मॅपिंग.
- `REDIS_BIND_HOST` — पोर्ट प्रकाशित केला जाणारा होस्ट इंटरफेस. डीफॉल्ट `127.0.0.1`.

> **डीफॉल्टनुसार लूपबॅक का:** साइडकार `requirepass` शिवाय चालतो आणि ॲप
> कंटेनर कंपोज नेटवर्कवरून (`redis:6379`) त्याच्याशी संपर्क साधतात — प्रकाशित पोर्ट
> केवळ होस्ट-साइड साधनांसाठी (`redis-cli`, स्थानिक `npm run dev`) आहे. तो
> `0.0.0.0` वर प्रकाशित केल्यास तुमच्या LAN वरील प्रत्येक होस्टसाठी प्रमाणीकरण नसलेला Redis उघडा पडेल. तुम्ही
> `REDIS_BIND_HOST=0.0.0.0` सेट केल्यास, सेवा `command:` मध्ये `--requirepass` देखील जोडा.

**Redis अक्षम करण्याची** शिफारस केली जात नाही (रेट लिमिटर इन-मेमरी फॉलबॅकवर अवनत होईल). ते आवश्यकच असल्यास, `docker-compose.yml` मधील `redis:` सेवा ब्लॉक काढा/कॉमेंट करा किंवा ती शून्यावर स्केल करा:

```bash
docker compose up -d --scale redis=0
```

## प्रॉडक्शन कंपोज

डेव्हलपमेंटसोबत चालणाऱ्या विलग प्रॉडक्शन स्नॅपशॉटसाठी `docker-compose.prod.yml` वापरा.

| तपशील                  | मूल्य                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| फाइल                   | `docker-compose.prod.yml`                                                                    |
| डीफॉल्ट डॅशबोर्ड पोर्ट | `PROD_DASHBOARD_PORT=20130` (अंतर्गत `${DASHBOARD_PORT:-20128}` वर मॅप केलेले)               |
| डीफॉल्ट API पोर्ट      | `PROD_API_PORT=20131`                                                                        |
| इमेज                   | `omniroute:prod` (`runner-cli` टार्गेटपासून बिल्ड केलेली)                                    |
| Redis कंटेनर           | `omniroute-redis-prod` (`redis:8.6.2`, समर्पित `redis-prod-data` व्हॉल्यूम)                  |
| डेटा व्हॉल्यूम         | `omniroute-prod-data` (नामित, रीबिल्डदरम्यान कायम राखलेले)                                   |
| हेल्थचेक्स             | `node healthcheck.mjs` + `redis-cli ping`, Redis च्या आरोग्यावर गेट केलेल्या `depends_on` सह |

वापरण्याची पद्धत:

```bash
# प्रॉडक्शन स्टॅक बिल्ड करून सुरू करा
docker compose -f docker-compose.prod.yml up -d --build

# लॉग्स सतत दाखवा
docker compose -f docker-compose.prod.yml logs -f

# बंद करा (व्हॉल्यूम कायम ठेवा)
docker compose -f docker-compose.prod.yml down
```

प्रॉडक्शन स्टॅक डेव्हलपमेंट कंपोजच्या समांतर चालतो (कंटेनरची नावे, पोर्ट आणि व्हॉल्यूम वेगवेगळे आहेत), त्यामुळे प्रॉडक्शन चालू ठेवून तुम्ही स्थानिक पातळीवर पुनरावृत्तीने विकास सुरू ठेवू शकता.

## Dockerfile टप्पे

रिपॉझिटरीसोबत बहु-टप्प्यांचा Dockerfile (`Dockerfile`) दिला जातो. चार टप्पे उपलब्ध आहेत; तुमच्या वापरासाठी योग्य `target` निवडा.

| टप्पा         | बेस इमेज              | उद्देश                                                                                                                                                                                                                                                                     |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | अवलंबने स्थापित करतो (`npm ci --legacy-peer-deps`) आणि `npm run build` चालवतो (डीफॉल्टनुसार Turbopack — खालील बिल्ड-वेळ संसाधने पाहा)                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Next.js च्या स्वतंत्र आउटपुटसह उत्पादन रनटाइम. **कोणतेही प्रदाता CLI समाविष्ट केलेले नाहीत.**                                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` आणि जागतिक CLI जोडतो: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **एजंटिक कार्यप्रवाहांसाठी हा निवडा.**                                                                                                       |
| `runner-web`  | `runner-base`         | वेब-सत्र प्रदात्यांसाठी Playwright + Chromium ब्राउझर (`--with-deps`) जोडतो: `gemini-web`, `claude-web`, `claude-turnstile`. **तुम्ही हे प्रदाते वापरत असाल तेव्हा हा निवडा** — याशिवाय साधी इमेज विनंतीच्या वेळी अयशस्वी होते (Release Channels अंतर्गत `-web` टीप पाहा). |

विशिष्ट लक्ष्य हाताने बिल्ड करा:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### बिल्ड-वेळ संसाधने

तीन बिल्ड आर्ग्युमेंट्स `builder` टप्प्याचा संसाधन-खर्च नियंत्रित करतात. ते केवळ बिल्डच्या वेळी लागू होतात —
`OMNIROUTE_MEMORY_MB` (खाली) हे स्वतंत्र रनटाइम नियंत्रण आहे.

| बिल्ड आर्ग्युमेंट           | डीफॉल्ट | परिणाम                                                                                          |
| --------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` webpack सह बिल्ड करतो: कमाल मेमरी कमी, पण गती मंद. `1` Turbopack वापरण्याची निवड करतो.      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | सुरू केलेल्या `next build` साठी V8 हीप मर्यादा (`--max-old-space-size`).                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | `CIRCLE_NODE_TOTAL` ला मूल्य पुरवतो; पृष्ठ-डेटा संकलनासाठी Next `workers = N - 1` निश्चित करतो. |

मोठ्या बिल्डरवर `OMNIROUTE_BUILD_WORKERS` वाढवावे आणि मर्यादित संसाधनांवरील बिल्ड
`✓ Compiled successfully` **नंतर** बंद पडल्यास प्रथम त्याच्यावर संशय घ्यावा. प्रत्येक
पृष्ठ-डेटा वर्कर ही स्वतंत्र प्रक्रिया असते आणि मूळ `next build` स्वतःदेखील स्वतंत्र प्रक्रिया
असते; प्रत्यक्ष VPS पुनरुत्पादनात (issue #7518), प्रत्येक प्रक्रियेचा कमाल RSS
`NODE_OPTIONS` हीप फ्लॅगपासून स्वतंत्रपणे ~4.5 GB मोजला गेला (Turbopack हे V8 हीपच्या
बाहेरील नेटिव्ह/Rust मेमरीमध्ये संकलित करतो). `2` हा डीफॉल्ट (→ 1 वर्कर, एकूण 2
प्रक्रिया) प्रकाशन पाइपलाइन वापरत असलेल्या 16 GB / 4 vCPU GitHub-होस्टेड रनरसाठी
निश्चित केला आहे. `8` वर (→ 7 वर्कर) त्या रनरची मेमरी संपली आणि
buildkit ने `ResourceExhausted: ... cannot allocate memory` सह टप्पा अयशस्वी केला;
प्रत्येक प्रक्रियेचा RSS अंदाजावरून ठरवण्याऐवजी थेट मोजल्यानंतर `3` (→ 2 वर्कर)
देखील उपलब्ध मेमरीत बसला नाही. `tests/unit/docker-build-memory-budget.test.ts`
मोजलेल्या आकड्याच्या आधारे गणना करतो आणि कोणतेही नियंत्रण रनरच्या क्षमतेबाहेर
गेल्यास अयशस्वी होतो.

Turbopack हे V8 हीपच्या **बाहेर** असलेल्या नेटिव्ह Rust मेमरीमध्ये संकलित करतो, त्यामुळे
`OMNIROUTE_BUILD_MEMORY_MB` त्यावर मर्यादा घालत नाही. मेमरी मर्यादा असलेल्या होस्टवर
OOM killer कोणताही त्रुटी मजकूर न देता बिल्डला SIGKILL करतो — तो
`Creating an optimized production build` च्या मध्यावर थांबतो, त्यामुळे मेमरी संपल्यासारखे
वाटण्याऐवजी तो अडकल्यासारखा वाटतो. म्हणूनच `Dockerfile` मध्ये डीफॉल्टनुसार webpack
(`OMNIROUTE_USE_TURBOPACK=0`) वापरले जाते; मात्र `npm run dev` / `npm run build` मध्ये
Turbopack हा कोडचा डीफॉल्ट आहे: कोणतेही बिल्ड आर्ग्युमेंट न देता चालवलेला साधा
`docker build .` (Railway आणि इतर एका-क्लिकमधील होस्ट जे चालवतात) मेमरी-मर्यादित
बिल्डरवर कोणतीही सूचना न देता बंद पडू नये. प्रकाशित इमेजेसमध्ये आधीच
`docker-publish.yml` मधून `OMNIROUTE_USE_TURBOPACK=0` स्पष्टपणे दिले जाते.
भरपूर RAM असलेल्या बिल्डरवर अधिक वेगवान बिल्डसाठी Turbopack निवडा:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम आहे, त्यामुळे `next build` एक मूळ प्रक्रिया **आणि** एक वर्कर
प्रक्रिया चालवतो आणि प्रत्येक प्रक्रिया स्वतंत्रपणे `OMNIROUTE_BUILD_MEMORY_MB` चे
पालन करते. कंटेनरची मर्यादा त्या मूल्याच्या साधारण दुप्पटपेक्षा अधिक ठेवा, केवळ
एकपट नाही.

या ट्रीवर मोजलेले परिणाम (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| बंडलर     | कंटेनर मर्यादा | परिणाम                                        |
| --------- | -------------- | --------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | दोन्ही ठिकाणी कोणतीही सूचना न देता OOM-killed |
| webpack   | 8 GiB          | बिल्ड वर्करला SIGKILL केले गेले               |
| webpack   | 12 GiB         | यशस्वी, कमाल वापर 11.1 GiB                    |

### रनटाइम डीफॉल्ट

`runner-base` द्वारे निर्यात केलेली डीफॉल्ट मूल्ये: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker मधील मेमरीचे वर्तन:

- इमेज `OMNIROUTE_MEMORY_MB=1024` सेट करते आणि त्यावरून `NODE_OPTIONS=--max-old-space-size=1024` मिळवते.
- प्रत्यक्ष सर्व्हर प्रक्रिया स्टँडअलोन लाँचरद्वारे सुरू केली जाते; तो `OMNIROUTE_MEMORY_MB` वाचतो आणि `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` जोडतो.
- पुनरावृत्ती झालेल्या `--max-old-space-size` पर्यायांपैकी Node शेवटचे मूल्य वापरते, त्यामुळे `OMNIROUTE_MEMORY_MB` सेट केल्याने Docker ची प्रभावी हीप मर्यादा नियंत्रित होते.
- इमेज ते नेहमी सेट करत असल्यामुळे, लाँचरचा स्वतःचा RAM-कॅलिब्रेटेड फॉलबॅक Docker अंतर्गत कधीही लागू होत नाही. वर्कलोडसाठी ते स्पष्टपणे वाढवा (खालील तक्ता). कोडिंग-एजंटच्या `/v1/responses` साठी `2048` अजूनही खूप कमी आहे.

### कोडिंग एजंटसाठी रनटाइम RAM

1 GiB ची Docker डीफॉल्ट मर्यादा ही डॅशबोर्ड/हलके चॅट यांसाठीची किमान पातळी आहे, प्रॉडक्शनसाठी योग्य आकार नाही. मोठ्या `POST /v1/responses` बॉडीज (शेकडो संदेश, डझनावारी साधने) कॉम्प्रेशनदरम्यान अनेक इन-मेमरी ग्राफ राखून ठेवतात. एकमेकांशी ओव्हरलॅप होणाऱ्या ~3 MiB / ~750k-टोकनच्या दोन विनंत्यांमुळे **12 GiB** old-space वर V8 थांबले आहे (`FATAL ERROR: Reached heap limit`) आणि 16 GiB cgroup OOM देखील झाला आहे. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) पहा.

**cgroup `--memory` चा आकार हीपपेक्षा जास्त ठेवा** — नेटिव्ह बफर्स, SQLite आणि कॉम्प्रेशनची मध्यवर्ती माहिती V8 च्या बाहेर असते.

| वर्कलोड                                    | `OMNIROUTE_MEMORY_MB`   | कंटेनर / cgroup         | नोंदी                                                                                                       |
| ------------------------------------------ | ----------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| डॅशबोर्ड, एक हलके चॅट                      | `1024` (इमेज डीफॉल्ट)   | ≥2 GiB                  |                                                                                                             |
| एक कोडिंग एजंट (Claude/Codex/Grok)         | `8192`                  | ≥10 GiB                 | सामान्य एकल-सेशन `/v1/responses`                                                                            |
| एकाच वेळी दोन दीर्घ `/v1/responses`        | `10240`–`12288`         | ≥12–16 GiB              | ~12 GiB हीपवर मोजलेला V8 अबॉर्ट                                                                             |
| एकाच वेळी तीन किंवा अधिक दीर्घ कॉन्टेक्स्ट | एका प्रक्रियेवर करू नका | क्रमशः चालवा / अधिक RAM | डीफॉल्ट हेवीवेट अॅडमिशनमध्ये एकावेळी 1 विनंती प्रक्रियेत असते; RAM न वाढवता हे वाढवल्यास अबॉर्ट पुन्हा होतो |

बेअर मेटलवरील `omniroute serve`, `OMNIROUTE_MEMORY_MB` **सेट नसताना**, RAM च्या ~35% प्रमाणे कॅलिब्रेट होते (`[512, 4096]` मर्यादेत). Docker नेहमी `1024` सेट करते, त्यामुळे अधिकृत इमेजमध्ये हे कॅलिब्रेशन कधीही चालत नाही.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## महत्त्वपूर्ण पर्यावरणीय चल

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) मध्ये दस्तऐवजीकरण केलेल्या डीफॉल्ट्सव्यतिरिक्त, Docker अंतर्गत चालवताना खालील चल सर्वाधिक महत्त्वाचे आहेत:

| चल                            | उद्देश                                                                                                                                                                                                                                                                       | डीफॉल्ट                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ब्रिजसाठी सामायिक गुप्त मूल्य. **प्रॉडक्शनमध्ये आवश्यक** — एक मजबूत यादृच्छिक स्ट्रिंग सेट करा.                                                                                                                                                                    | सेट केलेले नाही (द्यावेच लागेल) |
| `REDIS_URL`                   | रेट लिमिटर / कॅश बॅकएंडसाठी कनेक्शन स्ट्रिंग                                                                                                                                                                                                                                 | `redis://redis:6379`            |
| `REDIS_PORT`                  | समाविष्ट Redis कंटेनरसाठी होस्ट-साइड पोर्ट                                                                                                                                                                                                                                   | `6379`                          |
| `REDIS_BIND_HOST`             | समाविष्ट Redis पोर्ट ज्या होस्ट इंटरफेसवर प्रकाशित केला जातो तो इंटरफेस (तुम्ही AUTH जोडत नाही तोपर्यंत लूपबॅक)                                                                                                                                                              | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | स्वयं-अपडेट कार्यप्रवाहांसाठी `/workspace/omniroute` येथे `cli` प्रोफाइलमध्ये माउंट केलेला होस्ट पथ                                                                                                                                                                          | `.` (वर्तमान निर्देशिका)        |
| `OMNIROUTE_MEMORY_MB`         | Docker स्टँडअलोन सर्व्हरसाठी रनटाइम Node हीप मर्यादा; वरील इमेज डीफॉल्टला अधिलिखित करते. कोडिंग एजंट्स: `8192`+ ([रनटाइम RAM](#runtime-ram-for-coding-agents) पहा).                                                                                                          | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | डॅशबोर्ड (20128) आणि API (20129) साठी उघडे केलेले पोर्ट अधिलिखित करा                                                                                                                                                                                                         | `20128` / `20129`               |
| `APP_BIND_HOST`               | docker-compose ज्या होस्ट इंटरफेसवर डॅशबोर्ड/API/live-WS पोर्ट प्रकाशित करते तो इंटरफेस. `REQUIRE_API_KEY=false` (डीफॉल्ट) असताना, `0.0.0.0` अनामिक `/v1` प्रॉक्सी LAN वर उघड करते — केवळ `REQUIRE_API_KEY=true` असताना किंवा पुढे रिव्हर्स प्रॉक्सी असतानाच व्याप्ती वाढवा. | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | docker-compose ज्या होस्ट इंटरफेसवर `cliproxyapi` साइडकार प्रकाशित करते तो इंटरफेस — त्याच्या डेटा व्हॉल्यूममध्ये प्रदाता क्रेडेन्शियल्स असतात.                                                                                                                              | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | रनटाइम प्लगइन स्कॅनर ज्या निर्देशिकेतून वाचतो आणि ज्यामध्ये स्थापित करतो ती निर्देशिका. प्लगइन्स बाइंड-माउंट केलेले असताना ती सेट करा: डीफॉल्ट `HOME` चे अनुसरण करते, जे इमेजने एक्सपोर्ट केलेले असेलच असे नाही.                                                             | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | ॲप रिव्हर्स प्रॉक्सीच्या मागे प्रकाशित केलेले असताना वापरला जाणारा URL उपपथ (उदा. `/omniroute`)                                                                                                                                                                              | _(रिक्त = रूट)_                 |
| `NEXT_PUBLIC_BASE_URL`        | उपपथासह सार्वजनिक ब्राउझर ओरिजिन (उदा. `https://host/omniroute`)                                                                                                                                                                                                             | सेट केलेले नाही                 |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` साठी होस्ट-साइड डॅशबोर्ड पोर्ट                                                                                                                                                                                                                     | `20130`                         |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` साइडकारसाठी होस्ट-साइड पोर्ट                                                                                                                                                                                                                                   | `8317`                          |

## उपपथावरील रिव्हर्स प्रॉक्सी (Traefik / nginx)

Next.js `basePath` स्टँडअलोन बंडलमध्ये कंपाइल केला जातो. OmniRoute ॲपच्या रूटवरील सेंटिनेल फाइलमध्ये तयार केलेले मूल्य नोंदवते (`npm run build` दरम्यान लिहिले जाते; `scripts/docker/ensure-docker-base-path.mjs` द्वारे वाचले जाते) आणि कंटेनर सुरू होताना त्याची `OMNIROUTE_BASE_PATH` सोबत तुलना करते. ही मूल्ये वेगळी असल्यास आणि इमेज डोमेन रूटसाठी बिल्ड केलेली असल्यास, `node dev/run-standalone.mjs` चालण्यापूर्वी एंट्रीपॉइंट स्टँडअलोन मॅनिफेस्ट, एम्बेड केलेले `basePath`/`assetPrefix` लिटरल्स (Next 16 SSR ॲसेट URL केवळ `assetPrefix` वरून रेंडर करते — पॅचर त्यामध्ये उपपथ प्रतिबिंबित करतो), तयार केलेले `/_next/static` ॲसेट URL (क्लायंट-रेफरन्स मॅनिफेस्ट, मीडिया इम्पोर्ट्स, प्रीरेंडर केलेली त्रुटी पृष्ठे) आणि क्लायंट `process.env` शिम पुन्हा लिहितो.

### Compose बिल्ड (शिफारस केलेले)

दोन्ही व्हेरिएबल्स `.env` मध्ये सेट करा, त्यानंतर इमेज आणि रनटाइम सुसंगत राहावेत यासाठी पुन्हा बिल्ड करा:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` हे Docker बिल्ड-आर्ग्युमेंट आणि रनटाइम एन्व्हायर्नमेंट व्हेरिएबल अशा दोन्ही स्वरूपांत फॉरवर्ड करते.

### पूर्व-बिल्ड केलेली रूट इमेज + रनटाइम उपपथ

प्रकाशित `diegosouzapw/omniroute:*` इमेजेस डोमेन रूटसाठी बिल्ड केलेल्या असतात. तरीही तुम्ही रनटाइमच्या वेळी `OMNIROUTE_BASE_PATH` सेट करू शकता; कंटेनर स्टार्टअपच्या वेळी एकदा बंडल पॅच करतो. त्यास जुळणाऱ्या सार्वजनिक ओरिजिनसोबत वापरा:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**संपूर्ण** बाह्य पथ फॉरवर्ड करण्यासाठी रिव्हर्स प्रॉक्सी कॉन्फिगर करा (प्रिफिक्स काढू नका). Traefik ने `StripPrefix` शिवाय `PathPrefix(`/omniroute`)` कंटेनरकडे रूट केले पाहिजे, जेणेकरून Next.js ला `/omniroute/...` प्राप्त होईल आणि ते `/omniroute/_next/...` वरून ॲसेट्स सर्व्ह करेल.

Docker हेल्थचेक सक्रिय `OMNIROUTE_BASE_PATH` प्रिफिक्स लावलेल्या हलक्या `/healthz` लाइफसायकल एंडपॉइंटची तपासणी करतो. मानवी/डॅशबोर्ड निदानासाठी `/api/monitoring/health` उपलब्ध राहते; कंटेनरचा HEALTHCHECK पुन्हा त्याकडे निर्देशित करण्यासाठी (उदाहरणार्थ, सखोल आरोग्य तपासणी लागू करण्यासाठी), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट करा. हा पथ एक **सखोल** तपास आहे (DB + मॉनिटरिंग सारांश) — तुम्ही तो पुन्हा निवडल्यास Docker च्या कमी वारंवार होणाऱ्या `HEALTHCHECK` साठी योग्य आहे, परंतु Kubernetes `livenessProbe` च्या अंतरालांसाठी **योग्य नाही**.

ऑर्केस्ट्रेटर्ससाठी (Kubernetes, Nomad इ.):

| प्रोब             | प्राधान्य द्या                                                         | टाळा                                                     |
| ----------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| लाइव्हनेस         | HTTP `GET /livez`, किंवा मुख्य पोर्टवरील TCP (`PORT`, डीफॉल्ट `20128`) | लाइव्हनेस म्हणून `/api/monitoring/health`                |
| रेडीनेस           | HTTP `GET /healthz`                                                    | इव्हेंट-लूप व्यस्त असण्याला बंद पडणे मानणारे कमी टाइमआउट |
| सखोल / ब्लॅकबॉक्स | `/api/monitoring/health`                                               | —                                                        |

`/healthz` प्रक्रियेची लाइफसायकल स्थिती (`ok` / `starting` / `stopping`) नोंदवते. `/livez` फक्त प्रक्रिया कार्यरत आहे की नाही हे तपासते (हँडलर चालू शकत असेल तेव्हा नेहमी 200; ते रेडीनेसची प्रतीक्षा करत नाही). दोन्हीही विनंती हाताळणीसारख्याच Node इव्हेंट लूपवर चालतात, त्यामुळे CPU-बाउंड कॅटलॉग किंवा कॉम्प्रेशनचे काम त्यांना विलंबित करू शकते — व्यस्त ≠ बंद. HTTP प्रोब्सचा टाइमआउट होत असल्यास TCP लाइव्हनेसला प्राधान्य द्या. प्रोब्ससाठी संपूर्ण मार्गदर्शन:
[मॉनिटरिंग मार्गदर्शक — Kubernetes प्रोब शिफारसी](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy सह Docker Compose (HTTPS Auto-TLS)

Caddy च्या स्वयंचलित SSL प्रोव्हिजनिंगचा वापर करून OmniRoute सुरक्षितपणे उपलब्ध करता येते. तुमच्या डोमेनचा DNS A रेकॉर्ड तुमच्या सर्व्हरच्या IP कडे निर्देशित असल्याची खात्री करा.

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
      # OAuth कॉलबॅक, डॅशबोर्ड लिंक आणि व्युत्पन्न सार्वजनिक URL साठी ब्राउझरसमोरील ओरिजिन.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # शेड्यूल केलेल्या जॉब्स / सेल्फ-फेचेससाठी अंतर्गत सर्व्हर-टू-सर्व्हर URL.
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

Caddy अपस्ट्रीम कंटेनरसाठी मानक फॉरवर्डिंग हेडर्स सेट करते. OAuth कॉलबॅक आणि व्युत्पन्न सार्वजनिक
लिंक्ससाठी OmniRoute `NEXT_PUBLIC_BASE_URL` चा कॅनॉनिकल सार्वजनिक ओरिजिन म्हणून वापर करते;
प्रमाणीकृत डॅशबोर्ड राइट्स समान-ओरिजिन विनंत्यांसह सेशन-बाउंड CSRF संरक्षण वापरतात.
ज्या प्रगत डिप्लॉयमेंटमध्ये स्पष्ट कॉन्फिगरेशनऐवजी विश्वसनीय फॉरवर्डेड हेडर्समधून सार्वजनिक ओरिजिन
मिळवण्याची OmniRoute ला हेतुपुरस्सर परवानगी द्यायची आहे, केवळ त्यांच्यासाठीच `OMNIROUTE_TRUST_PROXY` सक्षम करा.

## Cloudflare Quick Tunnel

Docker डिप्लॉयमेंटसाठीच्या डॅशबोर्ड समर्थनामध्ये `Dashboard → Endpoints` वर एका क्लिकने वापरता येणारा **Cloudflare Quick Tunnel** समाविष्ट आहे. प्रथमच सक्षम केल्यावर, केवळ गरज असेल तेव्हाच `cloudflared` डाउनलोड केले जाते, तुमच्या सध्याच्या `/v1` एंडपॉइंटसाठी तात्पुरता टनेल सुरू केला जातो आणि व्युत्पन्न केलेला `https://*.trycloudflare.com/v1` URL तुमच्या नेहमीच्या सार्वजनिक URL च्या थेट खाली दाखवला जातो.

सक्रिय टनेलची स्थिती न बदलता एंडपॉइंट टनेल पॅनेल्स (Cloudflare, Tailscale, ngrok) `Settings → Appearance` मधून दाखवता किंवा लपवता येतात.

### टनेलविषयक नोंदी

- Quick Tunnel URL तात्पुरते असतात आणि प्रत्येक रीस्टार्टनंतर बदलतात.
- OmniRoute किंवा कंटेनर रीस्टार्ट झाल्यानंतर Quick Tunnels आपोआप पुनर्संचयित होत नाहीत. गरज असेल तेव्हा डॅशबोर्डमधून ते पुन्हा सक्षम करा.
- व्यवस्थापित इन्स्टॉलेशन सध्या `x64` / `arm64` वरील Linux, macOS आणि Windows ला समर्थन देते.
- मर्यादित कंटेनर वातावरणांमध्ये गोंगाट करणाऱ्या QUIC UDP बफर इशाऱ्यांना टाळण्यासाठी व्यवस्थापित Quick Tunnels डीफॉल्टनुसार HTTP/2 ट्रान्सपोर्ट वापरतात. तुम्हाला वेगळा ट्रान्सपोर्ट हवा असल्यास `CLOUDFLARED_PROTOCOL=quic` किंवा `auto` सेट करा.
- Docker इमेजमध्ये सिस्टीम CA रूट्स समाविष्ट असतात आणि त्या व्यवस्थापित `cloudflared` कडे पाठवल्या जातात, ज्यामुळे कंटेनरमध्ये टनेल बूटस्ट्रॅप होताना TLS विश्वासासंबंधी अपयश टाळले जाते.
- OmniRoute ने डाउनलोड करण्याऐवजी विद्यमान बायनरी वापरावी असे तुम्हाला वाटत असल्यास `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` सेट करा.

## इमेज टॅग्ज

| इमेज                     | टॅग      | आकार   | वर्णन                                                 |
| ------------------------ | -------- | ------ | ----------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | सर्वोच्च **प्रकाशित** स्थिर SemVer (git `main` नव्हे) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps साठी या प्रकारचा टॅग पिन करा                   |

मल्टी-प्लॅटफॉर्म मॅनिफेस्ट: `linux/amd64` + `linux/arm64` नेटिव्ह (Apple Silicon, AWS Graviton, Raspberry Pi). Docker जुळणारे आर्किटेक्चर आपोआप निवडते; ARM होस्टवर AMD64 इम्युलेशन सक्तीने वापरायचे असल्यास `--platform linux/amd64` द्या.

### रिलीज चॅनेल्स

OmniRoute स्थिर रिलीज, सक्रिय रिलीज-ब्रँच चाचणी आणि डेव्हलपमेंट बिल्ड्ससाठी स्वतंत्र Docker चॅनेल्स प्रकाशित करते.

| चॅनेल                           | स्रोत                              | परिवर्तनशीलता                  | शिफारस केलेला वापर                                                                                                  |
| ------------------------------- | ---------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | स्वाक्षरी केलेले/आवृत्तीबद्ध रिलीज | अपरिवर्तनीय                    | अचूक रिलीज पिन करणारे प्रॉडक्शन डिप्लॉयमेंट                                                                         |
| `:latest` / `:latest-web`       | सर्वोच्च **प्रकाशित** स्थिर SemVer | परिवर्तनशील स्थिर पॉइंटर       | SemVer प्रकाशन जॉबनंतर स्थिर रिलीजचे अनुसरण करते — `main` किंवा अप्रकाशित `release/v*` कमिट्सचे अनुसरण करत **नाही** |
| `:next` / `:next-web`           | सध्याची डीफॉल्ट `release/v*` ब्रँच | परिवर्तनशील प्री-रिलीज पॉइंटर  | सक्रिय रिलीज ब्रँचमध्ये समाविष्ट झालेले, परंतु अद्याप स्थिर रिलीजमध्ये नसलेले निराकरण तपासणे                        |
| `:main` / `:main-web`           | `main` ब्रँच                       | परिवर्तनशील डेव्हलपमेंट पॉइंटर | केवळ डेव्हलपमेंट आणि इंटिग्रेशन चाचणीसाठी                                                                           |

#### वेब-सेशन प्रोव्हायडर्स: `-web` इमेजेस

वरील प्रत्येक चॅनेल `-web` टॅगच्या स्वरूपातही उपलब्ध आहे (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), जो `runner-web` स्टेजमधून बिल्ड केला जातो — Playwright आणि Chromium ब्राउझरसह तीच इमेज. साधी इमेज Chromium **शिवाय** वितरित केली जाते; `gemini-web`, `claude-web` आणि `claude-turnstile` यांना त्याची आवश्यकता असते.

अपयश स्टार्टअपच्या वेळी न होता पुढे ढकलले जाते: हे प्रोव्हायडर्स त्यांच्या मॉडेल्सची यादी दाखवतात आणि डॅशबोर्डमध्ये कनेक्टेड म्हणून दिसतात; केवळ पहिली विनंती खालील त्रुटीसह अयशस्वी होते

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

तुम्ही हे प्रोव्हायडर्स वापरत असल्यास, तुम्ही सध्या वापरत असलेल्या चॅनेलचा `-web` टॅग पुल करा — इतर काहीही बदलत नाही. npm/CLI इन्स्टॉलेशनमध्ये (Docker इमेजशिवाय), याच्या समतुल्य गहाळ घटक म्हणजे ब्राउझर बायनरी: होस्टवर `npx playwright install chromium` चालवा.

#### प्री-रिलीज चॅनेल वापरणे

`next` चॅनेल सध्याच्या डीफॉल्ट `release/v*` शाखेवरील प्रत्येक push वेळी पुन्हा तयार केले जाते आणि AMD64 व ARM64 या दोन्हींसाठी प्रकाशित केले जाते. जुन्या देखभाल शाखा ते अधिलिखित करू शकत नाहीत. पुढील स्थिर tag तयार होण्यापूर्वी सक्रिय release शाखेत विलीन झालेल्या सुधारणांसाठी हे चॅनेल pull करता येणारी image उपलब्ध करून देते.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose साठी, निवडलेल्या profile द्वारे वापरला जाणारा image tag अधिलिखित करा, त्यानंतर service pull करून पुन्हा तयार करा:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### सुरक्षितता आणि rollback

`next` हे बदलते pre-release चॅनेल आहे. सक्रिय release शाखेवरील कोणत्याही push मुळे ते बदलू शकते आणि ते **production वापरासाठी समर्थित नाही**. विशिष्ट build चे मूल्यमापन करताना image digest निश्चित करा:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

चाचणी करण्यापूर्वी OmniRoute data volume किंवा bind-mounted data directory चा backup घ्या. rollback करण्यासाठी, यापूर्वी वापरलेली स्थिर आवृत्ती किंवा digest पुनर्स्थापित करा आणि container पुन्हा तयार करा:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build कधीही `latest` हलवू शकत नाही; केवळ पात्र स्थिर semantic version स्थिर pointer ला पुढे नेऊ शकते. `next` images मध्ये release image तपासणी आणि CRITICAL vulnerability आढळल्यास रोखणारे gate कायम ठेवले जाते.

**`latest` हे git साठी अद्ययावतपणाची हमी नाही.** `main` किंवा सक्रिय `release/v*` शाखेत विलीन केलेल्या सुधारणा, स्थिर SemVer image प्रकाशित होऊन publish job ने `:latest` ला पुढे नेईपर्यंत (त्या SemVer प्रमाणेच digest) `:latest` मध्ये **समाविष्ट होत नाहीत**. GitHub वर सुधारणा आधीच दिसत असताना `latest` स्थिर झाल्यासारखे वाटत असल्यास, release शाखेची चाचणी करण्यासाठी `:next` pull करा किंवा SemVer tag ची प्रतीक्षा करा.

| तुम्हाला हवे आहे                                                                          | वापरा                                     |
| ----------------------------------------------------------------------------------------- | ----------------------------------------- |
| ज्यात अनपेक्षित बदल होता कामा नये असे GitOps / production                                 | `:X.Y.Z` (किंवा image digest) निश्चित करा |
| प्रकाशित स्थिर आवृत्त्यांचे अनुसरण करणे आणि प्रत्येक release वेळी पुनर्निर्मिती स्वीकारणे | `:latest`                                 |
| अप्रकाशित `release/v*` commits ची चाचणी करणे                                              | `:next` (production साठी नाही)            |
| `main` ची चाचणी करणे                                                                      | `:main` (production साठी नाही)            |

## उपलब्धता: डीफॉल्ट SQLite एकाच प्रतिकृतीपुरते मर्यादित आहे

स्टॉक Docker / Kubernetes OmniRoute म्हणजे **एक Node प्रक्रिया + एक SQLite लेखक**. या टोपोलॉजीवर उच्च उपलब्धता **समर्थित नाही**.

| मर्यादा                                       | परिणाम                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| एकच लेखक                                      | एकाच SQLite फाइलविरुद्ध अनेक प्रतिकृती **चालवू नका**. त्यामुळे DB दूषित होतो.                                                                                                                                                                                                                                                                 |
| पुन्हा निर्माण / रीस्टार्ट / HEALTHCHECK kill | प्रक्रियेत असलेल्या SSE, डॅशबोर्ड सत्रे आणि इन-मेमरी स्थिती यांचा **पूर्ण खंड** पडतो. कनेक्ट केलेला प्रत्येक क्लायंट डिस्कनेक्ट होतो. एंडपॉइंट उपलब्ध नसलेल्या कालावधीत नवीन विनंत्यांना OmniRoute JSON ऐवजी रिव्हर्स-प्रॉक्सीचा **`502 Bad Gateway: Unknown error`** मिळतो — क्लायंट याला प्रदाता बिघाडापासून वेगळे ओळखू शकत नाहीत (#11015). |
| `/healthz` प्रमाणेच समान इव्हेंट लूप          | व्यस्त कॅटलॉग किंवा कंप्रेशन टिकमुळे प्रोबला विलंब होऊ शकतो; कमी टाइमआउटमुळे नंतर **एकमेव** प्रतिकृती रीस्टार्ट होते.                                                                                                                                                                                                                         |

**प्रोब मॅट्रिक्स** ([Kubernetes प्रोब शिफारसी](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) देखील पहा):

| प्रोब                  | लक्ष्य                                                         | वापरू नका                                                       |
| ---------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| लाइव्हनेस              | `PORT` वरील TCP (डीफॉल्ट `20128`), किंवा सॉफ्ट HTTP `/healthz` | `/api/monitoring/health`                                        |
| रेडीनेस                | HTTP `GET /healthz`                                            | इव्हेंट लूप व्यस्त असणे म्हणजे बंद पडणे असे मानणारे कमी टाइमआउट |
| सखोल / मानवी वापरासाठी | `/api/monitoring/health`                                       | स्वयंचलित kubelet लाइव्हनेस                                     |

**अपग्रेड्स:** प्रत्येक सत्र डिस्कनेक्ट होईल अशी अपेक्षा ठेवा. शक्य असल्यास क्लायंट्स ड्रेन करा; डीफॉल्ट SQLite वर रोलिंग अपडेट उपलब्ध नाही. Compose मधील `restart: unless-stopped` आणि Docker `HEALTHCHECK` यांमुळे कंटेनर Unhealthy झाल्यावर एकमेव प्रक्रिया देखील बदलली जाईल — परिणामाची व्याप्ती तीच राहील.

**एकाच प्रतिकृतीसाठी** Kubernetes स्निपेट (Recreate आवश्यक आहे; एका SQLite फाइलविरुद्ध `replicas` वाढवू नका):

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

`preStop` स्लीपमुळे SIGTERM पूर्वी kube ला Service एंडपॉइंट्स काढून टाकता येतात, त्यामुळे **नवीन** ट्रॅफिक बंद होत असलेल्या प्रक्रियेकडे जाणे थांबते. प्रक्रियेत असलेले `/v1/responses` SSE हे हेवीवेट अॅडमिशन लीसेसद्वारे `SHUTDOWN_TIMEOUT_MS` पर्यंत (डीफॉल्ट 30s) ड्रेन केले जातात (#11015). तरीही प्रक्रियेपर्यंत पोहोचणाऱ्या नवीन विनंत्यांना `503` + `Retry-After: 5` मिळते. बदली प्रतिकृती Ready होईपर्यंतचा Recreate मधील रिकाम्या-एंडपॉइंटचा कालावधी पूर्ण खंडच राहतो — ही SQLite टोपोलॉजीची मर्यादा आहे, प्रोबचे चुकीचे कॉन्फिगरेशन नाही.

बाह्य Postgres / मल्टी-रायटर HA हा दस्तऐवजीकृत स्टॉक मार्ग **नाही**. तुम्हाला HA आवश्यक असल्यास, एकच प्रतिकृती ठेवा किंवा प्रकल्पाने स्वतंत्रपणे तपासलेली आणि दस्तऐवजीकृत केलेली टोपोलॉजी चालवा. Postgres/MySQL वरील काम [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) मध्ये सुरू आहे. ते उपलब्ध होईपर्यंत, **मोठ्या** `/v1/responses` क्षमतेचा विस्तार करण्याचा एकमेव समर्थित मार्ग म्हणजे N स्वतंत्र प्रक्रिया (पुढील विभाग), एका व्हॉल्यूमवर `replicas > 1` नव्हे.

## स्केल-आउट: N स्वतंत्र प्रोसेसेस

एक Node प्रोसेस म्हणजे **एक V8 heap**. एकाच वेळी चालणाऱ्या दोन ~3 MiB / ~750k-token coding-agent `POST /v1/responses` विनंत्या (RTK + Caveman) ~12 Gi वर त्या heap ला निरस्त करतात (`FATAL ERROR: Reached heap limit`) आणि 16 Gi cgroup मध्ये OOM घडवू शकतात. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) पहा. हे मापन म्हणजे **मेमरी-बजेट**विषयक इशारा आहे; एकाच वेळी चालणाऱ्या दीर्घ `/v1/responses` विनंत्यांसाठी उत्पादनातील दोनची कठोर कमाल मर्यादा नाही. heavyweight chat प्रवेशावर, त्याच V8/cgroup मर्यादेवरून आकारलेले स्वयंचलितपणे निर्धारित ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) नियंत्रण ठेवते — आधीच योग्य आकार दिलेल्या प्रोसेसवर ते वाढवून अधिलिखित केल्यास (किंवा जुनी `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count मर्यादा सेट केल्यास) निरस्तीकरण पुन्हा उद्भवते. लहान chats, `/healthz`, `/v1/models`, आणि MCP यांचा त्या मर्यादेत **समावेश नाही**.

### एक प्रोसेस: दोनपेक्षा अधिक दीर्घ `/v1/responses`

एखादी **सुदृढ** प्रोसेस (heap हा `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`पेक्षा कमी, डीफॉल्ट `0.75`) प्रोसेस-व्यापी inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) मध्ये अजून जागा असल्यास, एकाच वेळी दोनपेक्षा अधिक दीर्घ `POST /v1/responses` चालवू **शकते**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (डीफॉल्ट 256 KiB) एवढ्या किंवा त्याहून मोठ्या bodies, रचना-जड विनंत्यांप्रमाणेच heavyweight lease घेतात आणि तोच [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) वापरतात. एकाच वेळी चालणारे अनेक दीर्घ SSE clients (ऑपरेटर्सना अनेकदा 40–50 आवश्यक असतात) हा **मेमरी-बजेट**चा प्रश्न आहे — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` यांना योग्य आकार द्या — ही उत्पादनातील “कमाल 2” अशी कठोर मर्यादा नाही. दबावाखालील heap तरीही पुन्हा प्रयत्न करता येण्याजोग्या `503`सह भार कमी करतो, जेणेकरून #7849 पुन्हा उद्भवणार नाही.

**heaps ची संख्या वाढवण्यासाठी** (स्वतंत्र V8 old-spaces) **आजच**:

| हे करा                                                                                                                                                | हे करू नका                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **N containers/pods** चालवा, प्रत्येकाचा **स्वतःचा** `DATA_DIR` / volume असावा                                                                        | एका SQLite file साठी `replicas > 1` सेट करू नका              |
| heap / inflight-byte budget वरून heavy in-flight + healthy-headroom चा आकार ठरवा; 1–2 हा #7849 चा पुराणमतवादी डीफॉल्ट आहे, उत्पादनातील कठोर कमाल नाही | एका प्रोसेसला 8× RAM आणि अमर्याद count cap देऊ नका           |
| पर्यायी: **सामायिक quota counters**साठी `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                          | Redis ला सामायिक SQLite समजू नका — ते तसे नाही               |
| प्रत्येक instance मध्ये provider secrets डुप्लिकेट करा (किंवा विभाजित dashboards स्वीकारा)                                                            | instances मध्ये एक dashboard / एक call-log अपेक्षित ठेवू नका |
| कोणताही load balancer पुढे ठेवा; API key किंवा session नुसार sticky असणे पुरेसे आहे                                                                   | vendor-specific size-aware middleware आवश्यक समजू नका        |

हार्डवेअर: प्रत्येक instance वरील एकाच वेळी चालणाऱ्या दीर्घ `/v1/responses`ची संख्या हा **मेमरी-बजेट**चा प्रश्न आहे (heap + inflight-byte / #10110). `N` स्वतंत्र `DATA_DIR`s तरीही heaps ची संख्या वाढवतात: host RAM ने `N × cgroup` सामावून घेतले पाहिजे, “N=8 असलेला एक 16 Gi pod” नव्हे. एका SQLite file वर कधीही `replicas > 1` वापरू नका.

Compose आराखडा (दोन heaps, दोन volumes — `deploy.replicas: 2` नव्हे):

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

In-process density (HTTP isolate पासून compression वेगळे करणे) म्हणजे [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). सामायिक durable state वरील एक logical cluster म्हणजे [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Docker मधील Gemini प्रादेशिक त्रुटी

Google AI Studio / Gemini API कडून HTTP 400, FAILED_PRECONDITION आणि
`User location is not supported for the API use.` असा प्रतिसाद मिळू शकतो. होस्टवर विनंती यशस्वी झाल्याने
कंटेनरही त्याच आउटबाउंड मार्गाचा वापर करतो हे सिद्ध होत नाही. DNS क्रम,
IPv4/IPv6 कनेक्टिव्हिटी, VPN रूटिंग आणि कॉन्फिगर केलेले प्रॉक्सी वेगवेगळे असू शकतात.
[Google चे समर्थित प्रदेश](https://ai.google.dev/gemini-api/docs/available-regions)
तसेच प्रत्यक्ष कनेक्शन मार्ग तपासा; केवळ ही त्रुटी API key चुकीची असल्याचे दर्शवत नाही.

### कनेक्शन-विशिष्ट प्रॉक्सीला प्राधान्य द्या

प्रभावित Gemini कनेक्शनसाठी OmniRoute चे [प्रति-कनेक्शन प्रॉक्सी कॉन्फिगरेशन](../ops/PROXY_GUIDE.md#4-level-proxy-system)
वापरा, त्यानंतर त्याच मॉडेलसह **Test Connection** आणि एक छोटी विनंती
पुन्हा चालवा. यामुळे रूटिंगमधील बदल त्या कनेक्शनपुरताच मर्यादित राहतो. प्रॉक्सी
कंटेनरमधून उपलब्ध आहे आणि कनेक्शन प्रत्यक्षात त्याचीच निवड करते याची खात्री करा.
मार्ग बदलल्याने अपस्ट्रीम प्रादेशिक पात्रतेची हमी मिळत नाही.

### होस्ट आणि कंटेनर नेटवर्किंगची तुलना करा

प्रमाणीकृत परिणामांची तुलना करताना key, मॉडेल आणि विनंती समान ठेवा; कोणत्याही issue मध्ये
क्रेडेन्शियल्स, प्रॉक्सी पासवर्ड किंवा संपूर्ण authorization headers कधीही पेस्ट करू नका.
प्रथम OS resolver कोणती address families उपलब्ध करून देतो ते होस्टवर आणि कंटेनरच्या आत
समान command वापरून तपासा:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` च्या जागी तुम्ही चालवत असलेली service वापरा (उदाहरणार्थ, `omniroute-web`). हे
commands क्रेडेन्शियल्स किंवा IP addresses शिवाय address families प्रिंट करतात. परत आलेला `6`
केवळ IPv6 DNS परिणाम दर्शवतो: तो वापरण्यायोग्य IPv6 मार्ग किंवा API access सिद्ध
करत **नाही**. जिथे `curl` इन्स्टॉल केलेले आहे, तिथे दोन्ही वातावरणांमध्ये
`curl -4 -I https://generativelanguage.googleapis.com` आणि
`curl -6 -I https://generativelanguage.googleapis.com` यांची तुलना करा.
HTTP प्रतिसाद त्या तपासणीसाठी कनेक्टिव्हिटी सिद्ध करतो, भलेही तो प्रमाणीकृत नसलेला
त्रुटी प्रतिसाद असला तरी; फक्त प्रमाणीकृत मॉडेल विनंतीच Gemini पात्रता तपासते.

### होस्ट-स्तरीय पर्याय: कार्यरत IPv6 आणि resolver धोरण

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) च्या रिपोर्टरने
त्यांच्या वातावरणात कंटेनर IPv6 सक्षम करून आणि glibc address selection बदलून
access पूर्ववत केला. याला वातावरण-विशिष्ट पर्याय समजा. resolver प्राधान्ये बदलण्यापूर्वी
कार्यरत होस्ट IPv6, कंटेनर egress/routing आणि firewall नियमांची खात्री करा.
केवळ private ULA address असल्याने सार्वजनिक IPv6 कनेक्टिव्हिटी सिद्ध होत नाही.

Compose च्या default network शी आधीपासून जोडलेल्या services साठी, हा fragment
त्या network वर IPv6 सक्षम करतो; तुमच्या service, ports, volumes आणि configuration चा
उर्वरित भाग तसाच ठेवा:

```yaml
networks:
  default:
    enable_ipv6: true
```

named network साठी, service प्रत्यक्षात ज्या network शी जोडली जाते त्यावर ते सक्षम करा. Docker
ULA subnet वाटप करू शकतो; तुमच्या network साठी आवश्यक असेल तेव्हाच स्पष्टपणे निर्दिष्ट केलेला,
इतर subnet शी overlap न होणारा subnet निवडा. [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
आणि [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) पहा.

**glibc-आधारित image** वर, `/etc/gai.conf` address selection बदलू शकते. सध्याच्या
repository Dockerfile मध्ये Debian वापरले आहे; custom musl-आधारित images मध्ये ही यंत्रणा उपलब्ध नसते.
नोंदवलेला बदल ULA label हे `label fc00::/7 6` वरून
`label fc00::/7 1` मध्ये बदलतो. image च्या संपूर्ण policy table पासून सुरुवात करा आणि त्यातील इतर
entries जतन करा: `label` किंवा `precedence` entry जोडल्याने ती default table बदलली जाते, त्यामुळे फक्त
बदललेली ओळ असलेली file पुरेशी नाही.
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
मध्ये या semantics चे दस्तऐवजीकरण केले आहे. तपासलेली file `/etc/gai.conf` येथे read-only स्वरूपात
bind-mount करा आणि बदल लागू करण्यासाठी service पुन्हा तयार करा.

यामुळे **त्या कंटेनरमधील सर्व outbound traffic साठी** OS address selection बदलते.
यामुळे प्रत्येक application ला IPv6 निवडण्यास भाग पाडले जात नाही: Node चा DNS क्रम आणि connection
selection देखील महत्त्वाचे असतात. विशेषतः, `--dns-result-order=ipv4first` IPv4 ला प्राधान्य देतो आणि
IPv4-only अपयशासाठी तो उपाय नाही. [Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) पहा.

कोणताही होस्ट-स्तरीय बदल केल्यानंतर Gemini आणि तुमचे इतर providers पुन्हा तपासा. बदल मागे घेण्यासाठी,
custom `gai.conf` mount काढून टाका, मागील network configuration पूर्ववत करा आणि
देखभाल कालावधीत प्रभावित service/network पुन्हा तयार करा. network पुन्हा तयार केल्याने
त्याच्याशी जोडलेल्या इतर containers मध्ये व्यत्यय येऊ शकतो; persistent data volume हटवू नका.

## महत्त्वाच्या नोंदी

- **SQLite WAL मोड:** OmniRoute ला नवीनतम बदल पुन्हा `storage.sqlite` मध्ये चेकपॉइंट करता यावेत यासाठी `docker stop` पूर्ण होऊ द्यावे. समाविष्ट Compose फायलींमध्ये आधीच 40s चा स्टॉप ग्रेस पीरियड सेट केलेला आहे. तुम्ही इमेज थेट चालवत असल्यास, `--stop-timeout 40` कायम ठेवा.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** नियमित/लेखनपूर्व बॅकअप बाह्यरित्या व्यवस्थापित केले जात असल्यास हे `true` वर सेट करा. विद्यमान डेटाबेसच्या माइग्रेशनसाठी तरीही स्वतंत्र टिकाऊ सुरक्षा स्नॅपशॉट आणि मोठ्या प्रमाणातील माइग्रेशनसाठी संरक्षण आवश्यक आहे.
- **डेटा सातत्य:** कंटेनर रीस्टार्टदरम्यान तुमचा डेटाबेस, कीज आणि कॉन्फिगरेशन्स जतन करण्यासाठी नेहमी `/app/data` वर व्हॉल्यूम माउंट करा.
- **पोर्ट कॉन्फिगरेशन:** डीफॉल्ट `20128` पोर्ट बदलण्यासाठी `PORT` एन्व्हायर्नमेंट व्हेरिएबल ओव्हरराइड करा.

## हे देखील पहा

- [VM डिप्लॉयमेंट मार्गदर्शक](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लॉयमेंट मार्गदर्शक](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io वर डिप्लॉय करा
- [एन्व्हायर्नमेंट कॉन्फिगरेशन](../reference/ENVIRONMENT.md) — संपूर्ण `.env` संदर्भ
