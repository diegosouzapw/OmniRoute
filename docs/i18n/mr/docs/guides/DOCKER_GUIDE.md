# 🐳 Docker Guide — OmniRoute (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> संपूर्ण Docker उपयोजन संदर्भ. झटपट सुरुवातीसाठी, [README मधील Docker विभाग](../README.md#-docker) पहा.

## अनुक्रमणिका

- [झटपट चालवा](#quick-run)
- [पर्यावरण फाइलसह](#with-environment-file)
- [Docker Compose](#docker-compose)
- [उपलब्ध प्रोफाइल्स](#available-profiles)
- [OmniRoute Docker मध्ये चालत असताना होस्ट CLI साधने कॉन्फिगर करणे](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [उत्पादनासाठी Compose](#production-compose)
- [Dockerfile टप्पे](#dockerfile-stages)
- [महत्त्वाचे पर्यावरण चल](#critical-environment-variables)
- [Caddy (HTTPS) सह Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare झटपट टनेल](#cloudflare-quick-tunnel)
- [इमेज टॅग्स](#image-tags)
- [उपलब्धता: डीफॉल्ट SQLite एकल-प्रतिकृती आहे](#availability-default-sqlite-is-single-replica)
- [महत्त्वाच्या नोंदी](#important-notes)

---

## झटपट चालवा

> **एका आदेशाने स्वतः होस्ट करायचे आहे?**
> [स्वयं-होस्ट मार्गदर्शक](../getting-started/SELF_HOST_GUIDE.md) पहा —
> `docker compose -f docker-compose.selfhost.yml up -d` (प्रकाशित इमेज +
> Redis, फक्त लूपबॅक, प्रोफाइल निवड नाही). खालील झटपट चालवण्याची पद्धत
> आधीपासून इतरत्र Redis चालवत असलेल्या वापरकर्त्यांसाठी एकल-कंटेनर मार्ग आहे.

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
# बेस प्रोफाइल (CLI साधनांशिवाय)
docker compose --profile base up -d

# CLI प्रोफाइल (Claude Code, Codex, OpenClaw अंगभूत)
docker compose --profile cli up -d

# होस्ट प्रोफाइल (Linux-प्रथम; होस्ट CLI बायनरी केवळ-वाचनासाठी माउंट करते)
docker compose --profile host up -d

# वेब प्रोफाइल (वेब-सत्र प्रदात्यांसाठी Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI साइडकार एकत्र करा
docker compose --profile cli --profile cliproxyapi up -d
```

## उपलब्ध प्रोफाइल्स

OmniRoute मुख्य डिप्लॉयमेंट प्रकारांसाठी Compose प्रोफाइल्ससह येते. तुमच्या वातावरणाशी जुळणारे प्रोफाइल निवडा.

| प्रोफाइल         | सेवा             | कधी वापरावे                                                                                                                                        | कमांड                                        |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (डीफॉल्ट) | `omniroute-base` | हेडलेस सर्व्हर / किमान रनटाइम, कोणतेही प्रोव्हायडर CLI समाविष्ट नाहीत                                                                              | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` आणि समाविष्ट CLI (Codex, Claude Code, Droid, OpenClaw) वापरणारे एजंटिक वर्कफ्लो                                 | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` इत्यादी फक्त-वाचनीय स्वरूपात माउंट करून होस्ट CLI साठी `network_mode`-सदृश प्रवेश हवा असलेले Linux होस्ट्स | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | अपस्ट्रीम CLI प्रॉक्सीइंगसाठी पोर्ट `8317` वर [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) साइडकार चालवा                            | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | ब्राउझरची आवश्यकता असलेले वेब-सेशन प्रोव्हायडर्स: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` बिल्ड करते, Chromium समाविष्ट)      | `docker compose --profile web up -d`         |

> एकाधिक प्रोफाइल्स एकत्रित करता येतात: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker मध्ये चालत असताना होस्ट CLI साधने कॉन्फिगर करणे

`omniroute setup-codex`, `setup-claude`, `config set <tool>` आणि डॅशबोर्डचे
**कॉन्फिगरेशन जतन करा** बटण हे सर्व `~/.codex/*.config.toml` सारख्या फाइल्स लिहितात. त्या पाथना
फक्त CLI प्रत्यक्षात ज्या मशीनवर चालते तिथेच अर्थ असतो. त्या कंटेनरच्या आत
चालवल्यास, लेखन कंटेनरच्या स्वतःच्या होममध्ये (`/home/node` —
इमेज `USER node` म्हणून चालते) होते, जिथून कोणतेही होस्ट CLI कधीही ते वाचणार नाही आणि कंटेनर
पुन्हा तयार होताच ते हटवले जाते.

OmniRoute हे ओळखते आणि वापरता न येणारे यश नोंदवण्याऐवजी
सूचनांसह लेखनास नकार देते: CLI `2` सह बंद होते आणि API
`containerEphemeralTarget: true` सह `422` प्रतिसाद देते.

### शिफारस केलेली पद्धत: CLI होस्टवर आणि OmniRoute Docker मध्ये चालवा

कंटेनर API पुरवतो; CLI तुमची होस्ट साधने कॉन्फिगर करते.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI ला कंटेनरकडे निर्देशित करा
omniroute setup-codex                      # तुमच्या होस्टवरील वास्तविक ~/.codex मध्ये लिहिते
```

Codex, Claude Code, Cursor किंवा तत्सम साधने तुमच्या
लॅपटॉपवर चालत असतील तेव्हा हा योग्य पर्याय आहे — आणि हीच नेहमीची मांडणी असते.

### पर्याय: होस्ट कॉन्फिगरेशन डिरेक्टरी bind-mount करा (`host` प्रोफाइल)

कंटेनरनेच तुमचे होस्ट कॉन्फिगरेशन लिहावे असे वाटत असल्यास,
डिरेक्टरी माउंट करा आणि `CLI_CONFIG_HOME` ला माउंट रूटकडे निर्देशित करा. `host` प्रोफाइल
हे आधीच करते:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount मुळेच पाथ विश्वासार्ह बनतो: OmniRoute
`/proc/self/mountinfo` वाचते आणि माउंट केलेल्या पाथवर (तसेच ज्या डिरेक्टरींची चाइल्ड डिरेक्टरी माउंट आहेत त्यांवर,
जे वरील `/host-home` च्या रचनेस तंतोतंत लागू होते) लेखन करण्यास अनुमती देते, तसेच
माउंट न केलेल्या पाथना नकार देणे सुरू ठेवते.

### पर्यायी मार्ग: कंटेनरचे स्वतःचे CLI कॉन्फिगर करा (जपून वापरा)

CLI खरोखरच कंटेनरमध्ये असतील (`cli` प्रोफाइल), तेव्हा लेखन
हेतुपुरस्सर असते. कोणत्याही `setup-*` कमांडला `--allow-container-write` द्या किंवा सर्व्हरसाठी
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` सेट करा. हे लेखन कंटेनरनंतर
टिकणार नाही, अशा इशाऱ्यासह पुढे जाते.

> **सुरक्षा इशारा — `cli` प्रोफाइल + `docker.sock` माउंट.**
> कंटेनरमधील स्वयंचलित अपडेटरला होस्ट daemon वरून स्टॅक पुन्हा तयार करता यावा म्हणून
> `cli` प्रोफाइल `/var/run/docker.sock` bind-mount करते
> (`src/lib/system/autoUpdate.ts` त्या socket ची तपासणी करते आणि तो
> अनुपस्थित असल्यास Docker पाथ वगळते). तो socket ही **होस्ट-root विश्वास
> सीमा** आहे: त्याच्यापर्यंत पोहोचू शकणारी कोणतीही गोष्ट होस्ट Docker daemon ला
> root म्हणून नियंत्रित करते — ती होस्टवरील कोणताही कंटेनर तयार करू शकते, तपासू शकते, थांबवू शकते आणि काढून टाकू शकते.
> परिणाम:
>
> 1. **`cli` प्रोफाइलचे port नेटवर्कवर कधीही उघडे करू नका.** ते
>    `127.0.0.1` वर प्रकाशित करा (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN वरून पोहोचता येणारे `cli` प्रोफाइल डॅशबोर्ड-स्तरीय कोणत्याही RCE चे
>    संपूर्ण होस्ट ताब्यात घेण्यात रूपांतर करते.
> 2. **`cli` प्रोफाइलमध्ये कोणत्याही अतिरिक्त होस्ट डिरेक्टरी bind करू नका.**
>    Docker socket सोबत कोणतेही अतिरिक्त mount दिल्यास कंटेनरला तुमच्या फाइलसिस्टम आणि
>    होस्ट कॉन्फिगरेशनवर पूर्ण वाचन/लेखन प्रवेश मिळतो. एखाद्या साधनाला प्रोजेक्ट पाहण्याची आवश्यकता असल्यास,
>    ते CLI binary सह स्थानिकरीत्या चालवा — ते `cli` कंटेनरमध्ये
>    माउंट करू नका.
>
> तुम्हाला कंटेनरमधील स्वयंचलित अपडेटची आवश्यकता नसल्यास, `cli` प्रोफाइल बंद ठेवा
> (`COMPOSE_PROFILES=core,redis` किंवा त्याहून लहान). इतर प्रोफाइल
> Docker socket माउंट करत नाहीत.
>
> MITM शी संबंधित धोका मॉडेल पाहण्यासाठी `docs/security/MITM-TPROXY-DECRYPT.md` (git मध्ये; `/docs` मध्ये संकलित केलेले नाही) पहा
> आणि `codex`/`claude-code`/`droid`/`openclaw` binary उगम-साखळीसाठी
> `docs/security/SUPPLY_CHAIN.md` पहा.

## Redis साइडकार

OmniRoute वितरित दर-मर्यादक आणि सामायिक कॅशेसाठी Redis वर अवलंबून आहे. `redis` सेवा `docker-compose.yml` मध्ये **नेहमी परिभाषित केलेली असते** (तिच्यावर कोणतेही प्रोफाइल बंधन नाही) आणि ती इतर कोणत्याही प्रोफाइलसोबत सुरू होते.

| तपशील                   | मूल्य                                   |
| ----------------------- | --------------------------------------- |
| इमेज                    | `redis:7-alpine`                        |
| कंटेनरचे नाव            | `omniroute-redis`                       |
| अंतर्गत पोर्ट           | `6379`                                  |
| होस्ट पोर्ट (ओव्हरराइड) | `REDIS_PORT` (डीफॉल्ट `6379`)           |
| होस्ट बाइंड (ओव्हरराइड) | `REDIS_BIND_HOST` (डीफॉल्ट `127.0.0.1`) |
| व्हॉल्यूम               | `omniroute-redis-data` → `/data`        |
| आरोग्य तपासणी           | `redis-cli ping` (10s अंतराने)          |

संबंधित पर्यावरण चल:

- `REDIS_URL` — ॲपमध्ये इंजेक्ट केली जाणारी कनेक्शन स्ट्रिंग (डीफॉल्टनुसार `redis://redis:6379`).
- `REDIS_PORT` — Redis कंटेनरसाठी होस्ट-बाजूचे पोर्ट मॅपिंग.
- `REDIS_BIND_HOST` — ज्या होस्ट इंटरफेसवर पोर्ट प्रकाशित केला जातो. डीफॉल्ट `127.0.0.1`.

> **डीफॉल्टनुसार लूपबॅक का:** साइडकार `requirepass` शिवाय चालतो आणि ॲप
> कंटेनर compose नेटवर्कवरून (`redis:6379`) त्याच्याशी जोडले जातात — प्रकाशित केलेला पोर्ट
> केवळ होस्ट-बाजूच्या साधनांसाठी (`redis-cli`, स्थानिक `npm run dev`) आहे. तो
> `0.0.0.0` वर प्रकाशित केल्यास, प्रमाणीकरण नसलेला Redis तुमच्या LAN वरील प्रत्येक होस्टसाठी उघडा होईल. तुम्ही
> `REDIS_BIND_HOST=0.0.0.0` सेट केल्यास, सेवेच्या `command:` मध्ये `--requirepass` देखील जोडा.

**Redis अक्षम करण्याची** शिफारस केली जात नाही (दर-मर्यादक इन-मेमरी फॉलबॅकवर अवनत होईल). ते आवश्यक असल्यास, `docker-compose.yml` मधील `redis:` सेवा ब्लॉक काढून टाका/टिप्पणीबद्ध करा किंवा तिचे प्रमाण शून्यावर आणा:

```bash
docker compose up -d --scale redis=0
```

## उत्पादनासाठी Compose

विकास वातावरणासोबत स्वतंत्र उत्पादन स्नॅपशॉट चालवण्यासाठी `docker-compose.prod.yml` वापरा.

| तपशील                  | मूल्य                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| फाइल                   | `docker-compose.prod.yml`                                                                          |
| डीफॉल्ट डॅशबोर्ड पोर्ट | `PROD_DASHBOARD_PORT=20130` (अंतर्गत `${DASHBOARD_PORT:-20128}` शी मॅप केलेला)                     |
| डीफॉल्ट API पोर्ट      | `PROD_API_PORT=20131`                                                                              |
| इमेज                   | `omniroute:prod` (`runner-cli` लक्ष्यापासून बिल्ड केलेली)                                          |
| Redis कंटेनर           | `omniroute-redis-prod` (`redis:8.6.2`, समर्पित `redis-prod-data` व्हॉल्यूम)                        |
| डेटा व्हॉल्यूम         | `omniroute-prod-data` (नामित, रीबिल्डदरम्यान कायम राखला जाणारा)                                    |
| आरोग्य तपासण्या        | `node healthcheck.mjs` + `redis-cli ping`, `depends_on` ला Redis च्या आरोग्यानुसार मर्यादित केलेले |

वापरण्याची पद्धत:

```bash
# उत्पादन स्टॅक बिल्ड करा आणि सुरू करा
docker compose -f docker-compose.prod.yml up -d --build

# लॉग सतत प्रवाहित करा
docker compose -f docker-compose.prod.yml logs -f

# बंद करा (व्हॉल्यूम कायम ठेवा)
docker compose -f docker-compose.prod.yml down
```

उत्पादन स्टॅक विकास compose च्या समांतर चालतो (कंटेनरची नावे, पोर्ट आणि व्हॉल्यूम वेगवेगळे असतात), त्यामुळे उत्पादन सुरू असतानाही तुम्ही स्थानिक पातळीवर पुनरावृत्तीपूर्वक विकास सुरू ठेवू शकता.

## Dockerfile टप्पे

रिपॉझिटरीमध्ये बहु-टप्पीय Dockerfile (`Dockerfile`) समाविष्ट आहे. चार टप्पे उपलब्ध आहेत; तुमच्या वापराच्या परिस्थितीसाठी योग्य `target` निवडा.

| टप्पा         | मूळ इमेज              | उद्देश                                                                                                                                                                                                                                                      |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | अवलंबने स्थापित करतो (`npm ci --legacy-peer-deps`) आणि `npm run build` चालवतो (डीफॉल्टनुसार Turbopack — खालील बिल्ड-वेळ संसाधने पाहा)                                                                                                                       |
| `runner-base` | `node:26-trixie-slim` | Next.js च्या स्वतंत्र आउटपुटसह उत्पादन रनटाइम. **कोणतेही प्रदाता CLI समाविष्ट नाहीत.**                                                                                                                                                                      |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` आणि ग्लोबल CLI जोडतो: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **एजंटिक कार्यप्रवाहांसाठी हा निवडा.**                                                                                        |
| `runner-web`  | `runner-base`         | वेब-सत्र प्रदात्यांसाठी Playwright + Chromium ब्राउझर (`--with-deps`) जोडतो: `gemini-web`, `claude-web`, `claude-turnstile`. **हे प्रदाते वापरत असल्यास हा निवडा** — याशिवाय साधी इमेज विनंतीच्या वेळी अयशस्वी होते (प्रकाशन चॅनेल्सखालील `-web` टीप पाहा). |

विशिष्ट लक्ष्य स्वहस्ते बिल्ड करा:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### बिल्ड-वेळ संसाधने

तीन बिल्ड आर्ग्युमेंट्स `builder` टप्प्याचा संसाधन-वापर नियंत्रित करतात. ते केवळ बिल्डच्या वेळी लागू होतात —
`OMNIROUTE_MEMORY_MB` (खाली) हे स्वतंत्र रनटाइम नियंत्रण आहे.

| बिल्ड आर्ग्युमेंट           | डीफॉल्ट | परिणाम                                                                                             |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`     | `0` असल्यास त्याऐवजी webpack वापरून बिल्ड करतो. कमाल मेमरी-वापर कमी, परंतु गती मंद.                |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | सुरू केलेल्या `next build` साठी V8 हीप मर्यादा (`--max-old-space-size`).                           |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | `CIRCLE_NODE_TOTAL` ला मूल्य पुरवतो; पृष्ठ-डेटा संकलनासाठी Next `workers = N - 1` व्युत्पन्न करतो. |

मोठ्या बिल्डरवर वाढवण्यासाठी `OMNIROUTE_BUILD_WORKERS` हेच नियंत्रण आहे आणि मर्यादित संसाधनांचा बिल्ड `✓ Compiled successfully` **नंतर** बंद पडल्यास सर्वप्रथम याच्यावर संशय घ्यावा. प्रत्येक पृष्ठ-डेटा वर्कर ही स्वतंत्र प्रोसेस असते आणि मूळ `next build` स्वतःही स्वतंत्र प्रोसेस असते; प्रत्यक्ष VPS पुनरुत्पादनात (समस्या #7518) `NODE_OPTIONS` हीप फ्लॅगपासून स्वतंत्रपणे प्रत्येक प्रोसेसचा कमाल RSS ~4.5 GB मोजला गेला (Turbopack हे V8 हीपच्या बाहेरील नेटिव्ह/Rust मेमरीमध्ये संकलित करते). `2` ही डीफॉल्ट संख्या (→ 1 वर्कर, एकूण 2 प्रोसेस) प्रकाशन पाइपलाइन वापरत असलेल्या 16 GB / 4 vCPU GitHub-होस्टेड रनर्ससाठी निश्चित केली आहे. `8` असताना (→ 7 वर्कर्स) त्या रनरची मेमरी संपली आणि buildkit ने `ResourceExhausted: ... cannot allocate memory` सह तो टप्पा अयशस्वी केला; प्रति-प्रोसेस RSS चा अंदाज बांधण्याऐवजी तो थेट मोजल्यानंतर `3` (→ 2 वर्कर्स) देखील उपलब्ध मर्यादेत बसला नाही. `tests/unit/docker-build-memory-budget.test.ts` मोजलेल्या आकड्याच्या आधारे गणना करते आणि कोणतेही नियंत्रण रनरच्या क्षमतेपलीकडे वाढल्यास अयशस्वी होते.

Turbopack ही V8 हीपच्या **बाहेर** असलेल्या नेटिव्ह Rust मेमरीमध्ये संकलित करते, त्यामुळे `OMNIROUTE_BUILD_MEMORY_MB` तिच्यावर मर्यादा घालत नाही. मेमरीची कमाल मर्यादा असलेल्या होस्टवर बिल्ड कोणताही त्रुटी-संदेश न देता OOM किलरकडून SIGKILL केला जातो — तो `Creating an optimized production build` च्या मध्यातच थांबतो, त्यामुळे मेमरी संपल्यासारखे वाटण्याऐवजी प्रक्रिया अडकल्यासारखी दिसते. बिल्ड होस्टवर संसाधनांची मर्यादा असल्यास बंडलर बदला:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` सक्षम आहे, त्यामुळे `next build` एक मूळ **आणि** एक वर्कर प्रोसेस चालवते आणि प्रत्येक प्रोसेस स्वतंत्रपणे `OMNIROUTE_BUILD_MEMORY_MB` चे पालन करते. कंटेनरची मर्यादा त्या मूल्याच्या एकपट नव्हे, तर साधारण दुप्पट मूल्यापेक्षा जास्त ठेवा.

या ट्रीवर मोजलेले परिणाम (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| बंडलर     | कंटेनरची मर्यादा | परिणाम                                            |
| --------- | ---------------- | ------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | दोन्ही मर्यादांवर कोणताही संदेश न देता OOM-killed |
| webpack   | 8 GiB            | बिल्ड वर्कर SIGKILLed झाला                        |
| webpack   | 12 GiB           | यशस्वी; कमाल वापर 11.1 GiB                        |

### रनटाइम डीफॉल्ट्स

`runner-base` द्वारे निर्यात केलेली डीफॉल्ट मूल्ये: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker मधील मेमरीचे वर्तन:

- इमेजमध्ये `OMNIROUTE_MEMORY_MB=1024` सेट केले जाते आणि त्यावरून `NODE_OPTIONS=--max-old-space-size=1024` प्राप्त केले जाते.
- प्रत्यक्ष सर्व्हर प्रक्रिया standalone launcher द्वारे सुरू केली जाते; तो `OMNIROUTE_MEMORY_MB` वाचतो आणि `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` जोडतो.
- वारंवार दिलेल्या `--max-old-space-size` मूल्यांपैकी शेवटचे मूल्य Node वापरतो, त्यामुळे `OMNIROUTE_MEMORY_MB` सेट केल्याने प्रभावी Docker heap मर्यादा नियंत्रित होते.
- इमेज नेहमीच ते सेट करत असल्यामुळे, Docker अंतर्गत launcher चा स्वतःचा RAM-कॅलिब्रेटेड fallback कधीही लागू होत नाही. कार्यभारासाठी ते स्पष्टपणे वाढवा (खालील तक्ता). coding-agent `/v1/responses` साठी `2048` अजूनही खूप कमी आहे.

### कोडिंग एजंट्ससाठी रनटाइम RAM

1 GiB ची Docker डीफॉल्ट मर्यादा ही dashboard/हलके-chat यांसाठीची किमान मर्यादा आहे, production साठी योग्य आकार नाही. मोठ्या `POST /v1/responses` bodies (शेकडो messages, अनेक tools) compression दरम्यान अनेक in-memory graphs राखून ठेवतात. एकाच वेळी चालणाऱ्या सुमारे 3 MiB / सुमारे 750k-token आकाराच्या दोन requests मुळे **12 GiB** old-space वर V8 बंद पडले आहे (`FATAL ERROR: Reached heap limit`) आणि 16 GiB cgroup OOM देखील झाले आहे. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) पहा.

**cgroup `--memory` चा आकार heap पेक्षा अधिक ठेवा** — native buffers, SQLite आणि compression intermediates हे V8 च्या बाहेर असतात.

| कार्यभार                                | `OMNIROUTE_MEMORY_MB`    | Container / cgroup       | नोंदी                                                                                                                          |
| --------------------------------------- | ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Dashboard, एक हलके chat                 | `1024` (इमेज डीफॉल्ट)    | ≥2 GiB                   |                                                                                                                                |
| एक coding agent (Claude/Codex/Grok)     | `8192`                   | ≥10 GiB                  | सामान्य single-session `/v1/responses`                                                                                         |
| एकाच वेळी दोन दीर्घ `/v1/responses`     | `10240`–`12288`          | ≥12–16 GiB               | सुमारे 12 GiB heap वर V8 बंद पडल्याचे मोजले गेले                                                                               |
| एकाच वेळी तीन किंवा अधिक दीर्घ contexts | एका process वर चालवू नका | क्रमाने चालवा / अधिक RAM | डीफॉल्ट heavyweight admission मध्ये 1 in-flight request अनुमत आहे; RAM न वाढवता ही मर्यादा वाढवल्यास पुन्हा प्रक्रिया बंद पडेल |

bare metal वर `omniroute serve`, `OMNIROUTE_MEMORY_MB` **सेट नसताना**, RAM च्या सुमारे 35% वर कॅलिब्रेट होते (`[512, 4096]` मध्ये मर्यादित). Docker नेहमी `1024` सेट करत असल्यामुळे, अधिकृत इमेजमध्ये हे कॅलिब्रेशन कधीही चालत नाही.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## महत्त्वपूर्ण पर्यावरणीय चल

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) मध्ये दस्तऐवजीकरण केलेल्या डीफॉल्ट मूल्यांव्यतिरिक्त, Docker अंतर्गत चालवताना खालील चल सर्वाधिक महत्त्वाचे आहेत:

| चल                            | उद्देश                                                                                                                                                                                                                                                                        | डीफॉल्ट                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ब्रिजसाठी सामायिक गुप्त मूल्य. **प्रॉडक्शनमध्ये आवश्यक** — यासाठी मजबूत यादृच्छिक स्ट्रिंग सेट करा.                                                                                                                                                                 | सेट केलेले नाही (देणे आवश्यक) |
| `REDIS_URL`                   | रेट लिमिटर / कॅश बॅकएंडसाठी कनेक्शन स्ट्रिंग                                                                                                                                                                                                                                  | `redis://redis:6379`          |
| `REDIS_PORT`                  | समाविष्ट Redis कंटेनरसाठी होस्ट-साइड पोर्ट                                                                                                                                                                                                                                    | `6379`                        |
| `REDIS_BIND_HOST`             | समाविष्ट Redis पोर्ट ज्या होस्ट इंटरफेसवर प्रकाशित केला जातो तो इंटरफेस (तुम्ही AUTH जोडत नाही तोपर्यंत लूपबॅक)                                                                                                                                                               | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | स्वयं-अद्यतन कार्यप्रवाहांसाठी `/workspace/omniroute` येथे `cli` प्रोफाइलमध्ये माउंट केलेला होस्ट पथ                                                                                                                                                                          | `.` (सध्याची डिरेक्टरी)       |
| `OMNIROUTE_MEMORY_MB`         | Docker स्टँडअलोन सर्व्हरसाठी रनटाइम Node हीपची कमाल मर्यादा; वरील इमेज डीफॉल्टला ओव्हरराइड करते. कोडिंग एजंट: `8192`+ ([रनटाइम RAM](#runtime-ram-for-coding-agents) पहा).                                                                                                     | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | डॅशबोर्ड (20128) आणि API (20129) साठी उघडे केलेले पोर्ट ओव्हरराइड करते                                                                                                                                                                                                        | `20128` / `20129`             |
| `APP_BIND_HOST`               | docker-compose ज्या होस्ट इंटरफेसवर डॅशबोर्ड/API/live-WS पोर्ट प्रकाशित करते तो इंटरफेस. `REQUIRE_API_KEY=false` (डीफॉल्ट) असताना, `0.0.0.0` अनामिक `/v1` प्रॉक्सी LAN वर उघड करते — केवळ `REQUIRE_API_KEY=true` असताना किंवा समोर रिव्हर्स प्रॉक्सी असल्यासच व्याप्ती वाढवा. | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | docker-compose ज्या होस्ट इंटरफेसवर `cliproxyapi` साइडकार प्रकाशित करते तो इंटरफेस — त्याच्या डेटा व्हॉल्यूममध्ये प्रदात्याची क्रेडेन्शियल्स साठवली जातात.                                                                                                                    | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | रनटाइम प्लगइन स्कॅनर ज्या डिरेक्टरीमधून वाचतो आणि ज्यामध्ये इंस्टॉल करतो ती डिरेक्टरी. प्लगइन bind-mounted केलेले असताना हे सेट करा: डीफॉल्ट `HOME` चे अनुसरण करते, जे इमेजने एक्सपोर्ट केलेले असेलच असे नाही.                                                                | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | अॅप रिव्हर्स प्रॉक्सीच्या मागे प्रकाशित केलेले असताना वापरला जाणारा URL उपपथ (उदा. `/omniroute`)                                                                                                                                                                              | _(रिक्त = रूट)_               |
| `NEXT_PUBLIC_BASE_URL`        | उपपथासह सार्वजनिक ब्राउझर ओरिजिन (उदा. `https://host/omniroute`)                                                                                                                                                                                                              | सेट केलेले नाही               |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` साठी होस्ट-साइड डॅशबोर्ड पोर्ट                                                                                                                                                                                                                      | `20130`                       |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` साइडकारसाठी होस्ट-साइड पोर्ट                                                                                                                                                                                                                                    | `8317`                        |

## उपपथावरील रिव्हर्स प्रॉक्सी (Traefik / nginx)

Next.js `basePath` स्टँडअलोन बंडलमध्ये संकलित केला जातो. OmniRoute अॅपच्या रूटवरील एका सेंटिनेल फाइलमध्ये बिल्डवेळी समाविष्ट केलेले मूल्य नोंदवते (`npm run build` दरम्यान लिहिले जाते; `scripts/docker/ensure-docker-base-path.mjs` द्वारे वाचले जाते) आणि कंटेनर सुरू झाल्यावर त्याची `OMNIROUTE_BASE_PATH` शी तुलना करते. ही मूल्ये वेगळी असल्यास आणि इमेज डोमेन रूटसाठी बिल्ड केलेली असल्यास, `node dev/run-standalone.mjs` चालण्यापूर्वी एंट्रीपॉइंट स्टँडअलोन मॅनिफेस्ट, एम्बेड केलेले `basePath`/`assetPrefix` लिटरल्स (Next 16 केवळ `assetPrefix` वरून SSR अॅसेट URL रेंडर करते — पॅचर त्यातही उपपथ प्रतिबिंबित करतो), बिल्डवेळी समाविष्ट केलेले `/_next/static` अॅसेट URL (क्लायंट-रेफरन्स मॅनिफेस्ट, मीडिया इम्पोर्ट्स, प्रीरेंडर केलेली त्रुटी पृष्ठे) आणि क्लायंट `process.env` शिम पुन्हा लिहितो.

### Compose बिल्ड (शिफारस केलेले)

`.env` मध्ये दोन्ही व्हेरिएबल्स सेट करा, त्यानंतर इमेज आणि रनटाइम जुळण्यासाठी पुन्हा बिल्ड करा:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH` ला Docker बिल्ड आर्ग्युमेंट म्हणून आणि रनटाइम एन्व्हायर्नमेंट व्हेरिएबल म्हणून फॉरवर्ड करते.

### आधीच बिल्ड केलेली रूट इमेज + रनटाइम उपपथ

प्रकाशित केलेल्या `diegosouzapw/omniroute:*` इमेजेस डोमेन रूटसाठी बिल्ड केलेल्या आहेत. तरीही तुम्ही रनटाइमवेळी `OMNIROUTE_BASE_PATH` सेट करू शकता; कंटेनर स्टार्टअपवेळी बंडल एकदा पॅच करतो. त्यास जुळणाऱ्या सार्वजनिक ओरिजिनसह वापरा:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**संपूर्ण** बाह्य पाथ फॉरवर्ड करण्यासाठी रिव्हर्स प्रॉक्सी कॉन्फिगर करा (उपसर्ग काढू नका). Traefik ने `StripPrefix` शिवाय `PathPrefix(`/omniroute`)` कंटेनरकडे रूट केले पाहिजे, जेणेकरून Next.js ला `/omniroute/...` प्राप्त होईल आणि ते `/omniroute/_next/...` मधून अॅसेट्स सर्व्ह करेल.

Docker हेल्थचेक सक्रिय `OMNIROUTE_BASE_PATH` उपसर्ग असलेल्या हलक्या `/healthz` लाइफसायकल एंडपॉइंटची तपासणी करतो. मानवी/डॅशबोर्ड निदानासाठी `/api/monitoring/health` उपलब्ध राहतो; कंटेनरचा HEALTHCHECK पुन्हा त्याकडे निर्देशित करण्यासाठी (उदाहरणार्थ, सखोल हेल्थ अंमलबजावणीसाठी), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` सेट करा. तो पाथ एक **सखोल** तपासणी आहे (DB + मॉनिटरिंग सारांश) — तुम्ही पुन्हा त्याचा पर्याय निवडल्यास Docker च्या कमी वारंवारतेच्या `HEALTHCHECK` साठी योग्य, परंतु Kubernetes `livenessProbe` अंतरालांसाठी **योग्य नाही**.

ऑर्केस्ट्रेटर्ससाठी (Kubernetes, Nomad इत्यादी):

| प्रोब             | प्राधान्य द्या                                                         | टाळा                                                     |
| ----------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| लाइव्हनेस         | HTTP `GET /livez`, किंवा मुख्य पोर्टवरील TCP (`PORT`, डीफॉल्ट `20128`) | लाइव्हनेस म्हणून `/api/monitoring/health`                |
| रेडीनेस           | HTTP `GET /healthz`                                                    | इव्हेंट-लूप व्यस्त असण्याला बंद पडणे मानणारे कमी टाइमआउट |
| सखोल / ब्लॅकबॉक्स | `/api/monitoring/health`                                               | —                                                        |

`/healthz` प्रोसेस लाइफसायकल (`ok` / `starting` / `stopping`) कळवतो. `/livez` केवळ प्रोसेस चालू आहे की नाही हे तपासतो (हँडलर चालू शकत असेल तेव्हा नेहमी 200; तो रेडीनेसची प्रतीक्षा करत नाही). दोन्हीही विनंती हाताळणीप्रमाणे त्याच Node इव्हेंट लूपवर चालतात, त्यामुळे CPU-बाउंड कॅटलॉग किंवा कॉम्प्रेशन कामामुळे त्यांना विलंब होऊ शकतो — व्यस्त ≠ बंद. HTTP प्रोब्स टाइमआउट होत असल्यास TCP लाइव्हनेसला प्राधान्य द्या. प्रोब्ससाठी संपूर्ण मार्गदर्शन:
[मॉनिटरिंग मार्गदर्शिका — Kubernetes प्रोब शिफारसी](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy सह Docker Compose (HTTPS Auto-TLS)

Caddy च्या स्वयंचलित SSL प्रोव्हिजनिंगचा वापर करून OmniRoute सुरक्षितपणे उपलब्ध करता येते. आपल्या डोमेनचा DNS A रेकॉर्ड आपल्या सर्व्हरच्या IP कडे निर्देशित करत असल्याची खात्री करा.

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
      # OAuth कॉलबॅक, डॅशबोर्ड लिंक आणि व्युत्पन्न केलेल्या सार्वजनिक URL साठी ब्राउझरला दिसणारे ओरिजिन.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # नियोजित जॉब / सेल्फ-फेचसाठी अंतर्गत सर्व्हर-टू-सर्व्हर URL.
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

Caddy अपस्ट्रीम कंटेनरसाठी मानक फॉरवर्डिंग हेडर सेट करते. OmniRoute हे
`NEXT_PUBLIC_BASE_URL` OAuth कॉलबॅक आणि व्युत्पन्न केलेल्या सार्वजनिक
लिंकसाठी अधिकृत सार्वजनिक ओरिजिन म्हणून वापरते; प्रमाणीकृत डॅशबोर्ड लेखनासाठी समान-ओरिजिन विनंत्यांसह सत्राशी-बांधलेले CSRF
संरक्षण वापरले जाते. केवळ अशा प्रगत डिप्लॉयमेंटसाठी `OMNIROUTE_TRUST_PROXY` सक्षम करा जिथे स्पष्ट
कॉन्फिगरेशनऐवजी विश्वसनीय फॉरवर्डेड हेडरमधून OmniRoute ने सार्वजनिक ओरिजिन निर्धारित करावे असे आपल्याला हेतुपुरस्सर
वाटते.

## Cloudflare Quick Tunnel

Docker डिप्लॉयमेंटसाठी डॅशबोर्ड समर्थनामध्ये `Dashboard → Endpoints` वर एका क्लिकमध्ये वापरता येणारे **Cloudflare Quick Tunnel** समाविष्ट आहे. प्रथमच सक्षम केल्यावर केवळ गरज असेल तेव्हाच `cloudflared` डाउनलोड केले जाते, आपल्या सध्याच्या `/v1` एंडपॉइंटसाठी तात्पुरता टनेल सुरू केला जातो आणि व्युत्पन्न केलेला `https://*.trycloudflare.com/v1` URL आपल्या नेहमीच्या सार्वजनिक URL च्या थेट खाली दाखवला जातो.

सक्रिय टनेलची स्थिती न बदलता एंडपॉइंट टनेल पॅनेल (Cloudflare, Tailscale, ngrok) `Settings → Appearance` मधून दाखवता किंवा लपवता येतात.

### टनेलविषयी टिपा

- Quick Tunnel URL तात्पुरते असतात आणि प्रत्येक रीस्टार्टनंतर बदलतात.
- OmniRoute किंवा कंटेनर रीस्टार्ट झाल्यानंतर Quick Tunnel आपोआप पूर्ववत होत नाहीत. गरज असेल तेव्हा डॅशबोर्डमधून ते पुन्हा सक्षम करा.
- व्यवस्थापित इन्स्टॉलेशन सध्या Linux, macOS आणि Windows वरील `x64` / `arm64` ला समर्थन देते.
- मर्यादित कंटेनर वातावरणातील अनावश्यक QUIC UDP बफर चेतावण्या टाळण्यासाठी व्यवस्थापित Quick Tunnel डीफॉल्टनुसार HTTP/2 ट्रान्सपोर्ट वापरतात. वेगळा ट्रान्सपोर्ट हवा असल्यास `CLOUDFLARED_PROTOCOL=quic` किंवा `auto` सेट करा.
- Docker इमेजमध्ये सिस्टीम CA रूट समाविष्ट असतात आणि ते व्यवस्थापित `cloudflared` कडे पाठवले जातात, ज्यामुळे कंटेनरमध्ये टनेल बूटस्ट्रॅप होताना TLS विश्वसनीयतेशी संबंधित अपयश टाळले जाते.
- OmniRoute ने एखादी विद्यमान बायनरी डाउनलोड करण्याऐवजी वापरावी असे वाटत असल्यास `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` सेट करा.

## इमेज टॅग

| इमेज                     | टॅग      | आकार   | वर्णन                                                 |
| ------------------------ | -------- | ------ | ----------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | सर्वोच्च **प्रकाशित** स्थिर SemVer (git `main` नव्हे) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps साठी या प्रकारचा टॅग निश्चित करा               |

मल्टी-प्लॅटफॉर्म मॅनिफेस्ट: `linux/amd64` + `linux/arm64` नेटिव्ह (Apple Silicon, AWS Graviton, Raspberry Pi). Docker जुळणारे आर्किटेक्चर स्वयंचलितपणे निवडतो; ARM होस्टवर AMD64 इम्युलेशन सक्तीने वापरायचे असल्यास `--platform linux/amd64` द्या.

### रिलीज चॅनेल

OmniRoute स्थिर रिलीज, सक्रिय रिलीज-ब्रँच चाचणी आणि डेव्हलपमेंट बिल्डसाठी स्वतंत्र Docker चॅनेल प्रकाशित करतो.

| चॅनेल                           | स्रोत                              | बदलण्याची क्षमता           | शिफारस केलेला वापर                                                                                                |
| ------------------------------- | ---------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | स्वाक्षरी केलेले/आवृत्तीबद्ध रिलीज | अपरिवर्तनीय                | अचूक रिलीज निश्चित करणारी प्रॉडक्शन उपयोजने                                                                       |
| `:latest` / `:latest-web`       | सर्वोच्च **प्रकाशित** स्थिर SemVer | बदलणारा स्थिर पॉइंटर       | SemVer प्रकाशन जॉबनंतर स्थिर रिलीजचे अनुसरण करतो — `main` किंवा अप्रकाशित `release/v*` कमिटचे अनुसरण **करत नाही** |
| `:next` / `:next-web`           | सध्याची डीफॉल्ट `release/v*` ब्रँच | बदलणारा प्री-रिलीज पॉइंटर  | सक्रिय रिलीज ब्रँचमध्ये समाविष्ट झालेले, परंतु अद्याप स्थिर रिलीजमध्ये नसलेले निराकरण तपासणे                      |
| `:main` / `:main-web`           | `main` ब्रँच                       | बदलणारा डेव्हलपमेंट पॉइंटर | केवळ डेव्हलपमेंट आणि इंटिग्रेशन चाचणीसाठी                                                                         |

#### वेब-सेशन प्रोव्हायडर: `-web` इमेज

वरील प्रत्येक चॅनेलला संबंधित `-web` टॅगही असतो (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), जो `runner-web` स्टेजमधून बिल्ड केला जातो — तीच इमेज, तसेच Playwright आणि Chromium ब्राउझर. साध्या इमेजमध्ये Chromium **समाविष्ट नसतो**; `gemini-web`, `claude-web` आणि `claude-turnstile` यांना त्याची आवश्यकता असते.

अपयश स्टार्टअपच्या वेळी न होता नंतर घडते: हे प्रोव्हायडर त्यांच्या मॉडेलची सूची दाखवतात आणि डॅशबोर्डमध्ये कनेक्ट केलेले दिसतात, परंतु केवळ पहिली विनंती खालील त्रुटीसह अयशस्वी होते

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

तुम्ही हे प्रोव्हायडर वापरत असल्यास, सध्या वापरत असलेल्या चॅनेलचा `-web` टॅग पुल करा — इतर काहीही बदलत नाही. npm/CLI इन्स्टॉलेशनमध्ये (Docker इमेजशिवाय), याचा समतुल्य गहाळ घटक म्हणजे ब्राउझर बायनरी: होस्टवर `npx playwright install chromium` चालवा.

#### प्री-रिलीज चॅनेल वापरणे

सध्याच्या डीफॉल्ट `release/v*` ब्रँचवरील प्रत्येक पुशनंतर `next` चॅनेल पुन्हा बिल्ड केले जाते आणि AMD64 व ARM64 दोन्हींसाठी प्रकाशित केले जाते. जुन्या मेंटेनन्स ब्रँच ते ओव्हरराइट करू शकत नाहीत. पुढील स्थिर टॅग तयार होण्यापूर्वी सक्रिय रिलीज ब्रँचमध्ये मर्ज झालेल्या निराकरणांसाठी हे चॅनेल पुल करता येणारी इमेज पुरवते.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose साठी, निवडलेल्या प्रोफाइलद्वारे वापरला जाणारा इमेज टॅग ओव्हरराइड करा, त्यानंतर सर्व्हिस पुल करून पुन्हा तयार करा:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### सुरक्षितता आणि रोलबॅक

`next` हे बदलते प्री-रिलीज चॅनेल आहे. सक्रिय रिलीज ब्रँचवरील कोणत्याही पुशनंतर ते बदलू शकते आणि **प्रॉडक्शन वापरासाठी समर्थित नाही**. एखाद्या विशिष्ट बिल्डचे मूल्यमापन करताना इमेज डायजेस्ट निश्चित करा:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

चाचणीपूर्वी OmniRoute डेटा व्हॉल्यूम किंवा बाइंड-माउंट केलेल्या डेटा डायरेक्टरीचा बॅकअप घ्या. रोलबॅक करण्यासाठी, पूर्वी वापरलेली स्थिर आवृत्ती किंवा डायजेस्ट पुनर्स्थापित करा आणि कंटेनर पुन्हा तयार करा:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

रिलीज-ब्रँच बिल्ड कधीही `latest` हलवू शकत नाही; केवळ पात्र स्थिर सिमॅंटिक आवृत्ती स्थिर पॉइंटरला पुढे नेऊ शकते. `next` इमेजमध्ये रिलीज इमेज तपासणी आणि CRITICAL-असुरक्षा आढळल्यास रोखणारे गेट कायम असते.

**`latest` हे git अद्ययावत असल्याची हमी नाही.** `main` किंवा सक्रिय `release/v*` ब्रँचमध्ये मर्ज केलेली निराकरणे स्थिर SemVer इमेज प्रकाशित होईपर्यंत आणि प्रकाशन जॉबने `:latest` पुढे नेईपर्यंत `:latest` मध्ये **नसतात** (त्या SemVer सारखाच डायजेस्ट). GitHub वर निराकरण आधीच दिसत असताना `latest` बदललेले दिसत नसल्यास, रिलीज ब्रँचची चाचणी करण्यासाठी `:next` पुल करा किंवा SemVer टॅगची प्रतीक्षा करा.

| तुम्हाला हवे आहे                                                                     | वापरा                                      |
| ------------------------------------------------------------------------------------ | ------------------------------------------ |
| बदल होऊ नये असे GitOps / प्रॉडक्शन                                                   | `:X.Y.Z` (किंवा इमेज डायजेस्ट) निश्चित करा |
| प्रकाशित स्थिर रिलीजचे अनुसरण करणे आणि प्रत्येक रिलीजवेळी पुन्हा तयार करणे स्वीकारणे | `:latest`                                  |
| अप्रकाशित `release/v*` कमिटची चाचणी करणे                                             | `:next` (प्रॉडक्शनसाठी नाही)               |
| `main` ची चाचणी करणे                                                                 | `:main` (प्रॉडक्शनसाठी नाही)               |

## उपलब्धता: डीफॉल्ट SQLite एकाच प्रतिकृतीपुरते मर्यादित आहे

मानक Docker / Kubernetes OmniRoute म्हणजे **एक Node प्रक्रिया + एक SQLite लेखक**. या टोपोलॉजीवर उच्च उपलब्धता **समर्थित नाही**.

| मर्यादा                                     | परिणाम                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| एकच लेखक                                    | एकाच SQLite फाइलसाठी अनेक प्रतिकृती **चालवू नका**. त्यामुळे DB दूषित होतो.                                                                                                                                                                                                                                                                  |
| पुनर्निर्मिती / रीस्टार्ट / HEALTHCHECK किल | प्रक्रियेत असलेल्या SSE, डॅशबोर्ड सत्रे आणि इन-मेमरी स्थिती यांचे **पूर्ण आउटेज**. कनेक्ट केलेला प्रत्येक क्लायंट डिस्कनेक्ट होतो. एंडपॉइंट उपलब्ध नसलेल्या कालावधीत नवीन विनंत्यांना OmniRoute JSON ऐवजी रिव्हर्स-प्रॉक्सीकडून **`502 Bad Gateway: Unknown error`** मिळतो — क्लायंटला हे प्रदाता अपयशापासून वेगळे ओळखता येत नाही (#11015). |
| `/healthz` सारखाच इव्हेंट लूप               | व्यस्त कॅटलॉग किंवा कॉम्प्रेशन टिकमुळे प्रोबला विलंब होऊ शकतो; कमी टाइमआउटमुळे नंतर **एकमेव** प्रतिकृती रीस्टार्ट होते.                                                                                                                                                                                                                     |

**प्रोब मॅट्रिक्स** ([Kubernetes प्रोब शिफारसी](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) देखील पहा):

| प्रोब                  | लक्ष्य                                                       | वापरू नका                                                |
| ---------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| लाइव्हनेस              | `PORT` वर TCP (डीफॉल्ट `20128`), किंवा सौम्य HTTP `/healthz` | `/api/monitoring/health`                                 |
| रेडीनेस                | HTTP `GET /healthz`                                          | इव्हेंट लूप व्यस्त असण्याला बंद पडणे मानणारे कमी टाइमआउट |
| सखोल / मानवी वापरासाठी | `/api/monitoring/health`                                     | स्वयंचलित kubelet लाइव्हनेस                              |

**अपग्रेड्स:** प्रत्येक सत्र डिस्कनेक्ट होईल असे गृहीत धरा. शक्य असल्यास क्लायंट्स ड्रेन करा; डीफॉल्ट SQLite वर रोलिंग अपडेट उपलब्ध नाही. Compose `restart: unless-stopped` आणि Docker `HEALTHCHECK` यांचे संयोजन कंटेनर Unhealthy झाल्यावर एकमेव प्रक्रिया देखील बदलेल — त्याची परिणामव्याप्तीही तितकीच आहे.

**एकाच प्रतिकृतीसाठी** Kubernetes स्निपेट (Recreate आवश्यक आहे; एका SQLite फाइलसाठी `replicas` वाढवू नका):

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

`preStop` स्लीपमुळे SIGTERM पूर्वी kube ला Service एंडपॉइंट्स काढून टाकता येतात, त्यामुळे **नवीन** ट्रॅफिक बंद होत असलेल्या प्रक्रियेकडे जाणे थांबते. प्रक्रियेत असलेले `/v1/responses` SSE हे हेवीवेट अॅडमिशन लीजद्वारे (#11015) `SHUTDOWN_TIMEOUT_MS` पर्यंत (डीफॉल्ट 30s) ड्रेन केले जाते. तरीही प्रक्रियेपर्यंत पोहोचणाऱ्या नवीन विनंत्यांना `503` + `Retry-After: 5` मिळते. बदली प्रतिकृती Ready होईपर्यंत Recreate मुळे निर्माण होणारा एंडपॉइंट-विरहित कालावधी हा पूर्ण आउटेजच राहतो — ही SQLite टोपोलॉजीची मर्यादा आहे, प्रोबच्या चुकीच्या कॉन्फिगरेशनची नाही.

बाह्य Postgres / मल्टी-रायटर HA हा **दस्तऐवजीकरण केलेला मानक मार्ग नाही**. तुम्हाला HA आवश्यक असल्यास, एकच प्रतिकृती ठेवा किंवा प्रकल्पाने स्वतंत्रपणे चाचणी करून दस्तऐवजीकरण केलेली टोपोलॉजी चालवा. Postgres/MySQL संबंधित काम [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) मध्ये सुरू आहे. ते उपलब्ध होईपर्यंत, **मोठ्या** `/v1/responses` क्षमतेचा विस्तार करण्याचा एकमेव समर्थित मार्ग म्हणजे N स्वतंत्र प्रक्रिया (पुढील विभाग), एका व्हॉल्यूमवर `replicas > 1` नव्हे.

## Scale-out: N स्वतंत्र प्रक्रिया

एक Node प्रक्रिया म्हणजे **एक V8 heap**. एकमेकांवर ओव्हरलॅप होणाऱ्या ~3 MiB / ~750k-token coding-agent `POST /v1/responses` (RTK + Caveman) विनंत्या ~12 Gi वर त्या heap ला निरस्त करतात (`FATAL ERROR: Reached heap limit`) आणि 16 Gi cgroup मध्ये OOM घडवू शकतात. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) पहा. हे मापन एक **मेमरी-बजेट** इशारा आहे; दोन समवर्ती दीर्घ `/v1/responses` ही उत्पादनाची कमाल कठोर मर्यादा नाही. heavyweight chat प्रवेशाला स्वयं-निर्धारित ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) द्वारे मर्यादा घातली जाते; त्याचा आकार त्याच V8/cgroup मर्यादेवरून ठरवला जातो — आधीच योग्य आकार दिलेल्या प्रक्रियेसाठी ही मर्यादा वाढवून अधिलिखित केल्यास (किंवा जुन्या `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count मर्यादेचे मूल्य सेट केल्यास) प्रक्रिया पुन्हा निरस्त होऊ शकते. लहान chats, `/healthz`, `/v1/models`, आणि MCP यांचा या मर्यादेत **समावेश नाही**.

### एक प्रक्रिया: दोनपेक्षा अधिक दीर्घ `/v1/responses`

एक **निरोगी** प्रक्रिया (heap हे `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` पेक्षा कमी; डीफॉल्ट `0.75`) प्रक्रिया-व्यापी inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) मध्ये अजून जागा असल्यास दोनपेक्षा अधिक समवर्ती दीर्घ `POST /v1/responses` चालवू **शकते**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` इतक्या किंवा त्यापेक्षा मोठ्या bodies (डीफॉल्ट 256 KiB) structure-heavy विनंत्यांप्रमाणेच heavyweight lease घेतात आणि त्याच [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) चा वापर करतात. एकाच वेळी अनेक दीर्घ SSE clients (ऑपरेटरना बहुधा 40–50 आवश्यक असतात) चालवणे हा **मेमरी-बजेट**चा प्रश्न आहे — heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` यांना योग्य आकार द्या — ही उत्पादनाची कठोर “कमाल 2” मर्यादा नाही. दबावाखालील heap अजूनही पुन्हा प्रयत्न करता येण्याजोगा `503` प्रतिसाद देऊन भार कमी करते, जेणेकरून #7849 पुन्हा उद्भवणार नाही.

**अनेक heap तयार करण्यासाठी** (स्वतंत्र V8 old-spaces) **आजच**:

| हे करा                                                                                                                                                   | हे करू नका                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **N containers/pods** चालवा आणि प्रत्येकासाठी त्याचा **स्वतःचा** `DATA_DIR` / volume वापरा                                                               | एकाच SQLite file साठी `replicas > 1` सेट करू नका                   |
| heavy in-flight + healthy-headroom चा आकार heap / inflight-byte budget नुसार ठरवा; 1–2 हा #7849 साठी सावध डीफॉल्ट आहे, उत्पादनाची कठोर कमाल मर्यादा नाही | एका प्रक्रियेला 8× RAM आणि अमर्याद count cap देऊ नका               |
| पर्यायी: **सामायिक quota counters** साठी `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                            | Redis ला सामायिक SQLite समजू नका — ते तसे नाही                     |
| प्रत्येक instance मध्ये provider secrets डुप्लिकेट करा (किंवा विभाजित dashboards स्वीकारा)                                                               | सर्व instances साठी एकच dashboard / एकच call-log अपेक्षित ठेवू नका |
| कोणताही load balancer समोर वापरा; API key किंवा session नुसार sticky routing पुरेसे आहे                                                                  | vendor-specific size-aware middleware अनिवार्य समजू नका            |

हार्डवेअर: प्रत्येक instance मधील समवर्ती दीर्घ `/v1/responses` हा **मेमरी-बजेट**चा प्रश्न आहे (heap + inflight-byte / #10110). `N` स्वतंत्र `DATA_DIR` वापरल्याने heap ची संख्याही वाढते: host RAM ने `N × cgroup` सांभाळले पाहिजे; “N=8 असलेला एक 16 Gi pod” पुरेसा नाही. एकाच SQLite file वर कधीही `replicas > 1` वापरू नका.

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

In-process density (HTTP isolate च्या बाहेर compression) यासाठी [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) पहा. सामायिक durable state वरील एक logical cluster यासाठी [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) पहा.

## महत्त्वाच्या नोंदी

- **SQLite WAL मोड:** OmniRoute ला नवीनतम बदल `storage.sqlite` मध्ये चेकपॉइंट करता यावेत यासाठी `docker stop` ला पूर्ण होऊ द्यावे. समाविष्ट Compose फाइल्समध्ये आधीच 40s चा स्टॉप ग्रेस कालावधी सेट केलेला आहे. तुम्ही इमेज थेट चालवत असल्यास, `--stop-timeout 40` कायम ठेवा.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** नियमित/लेखन-पूर्व बॅकअप बाहेरून व्यवस्थापित केले जात असल्यास हे `true` वर सेट करा. विद्यमान डेटाबेसच्या माइग्रेशनसाठी तरीही स्वतंत्र टिकाऊ सुरक्षितता स्नॅपशॉट आणि मोठ्या प्रमाणातील माइग्रेशनपासून संरक्षण आवश्यक आहे.
- **डेटा सातत्य:** कंटेनर रीस्टार्टदरम्यान तुमचा डेटाबेस, कीज आणि कॉन्फिगरेशन्स टिकवून ठेवण्यासाठी नेहमी `/app/data` वर व्हॉल्यूम माउंट करा.
- **पोर्ट कॉन्फिगरेशन:** डीफॉल्ट `20128` पोर्ट बदलण्यासाठी `PORT` एन्व्हायर्नमेंट व्हेरिएबल ओव्हरराइड करा.

## हे देखील पहा

- [VM डिप्लॉयमेंट मार्गदर्शक](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare सेटअप
- [Fly.io डिप्लॉयमेंट मार्गदर्शक](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io वर डिप्लॉय करा
- [एन्व्हायर्नमेंट कॉन्फिगरेशन](../reference/ENVIRONMENT.md) — संपूर्ण `.env` संदर्भ
