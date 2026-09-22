# Monitoring & Observability Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **थोडक्यात**: OmniRoute मध्ये अंगभूत आरोग्य निरीक्षण, प्रदाता ऑटोपायलट, कोटा ट्रॅकिंग आणि निरीक्षणीयता हुक्स समाविष्ट आहेत. या मार्गदर्शकामध्ये डॅशबोर्ड, सूचना आणि समस्यानिवारण समाविष्ट आहे.

**स्रोत:**

- `src/lib/monitoring/observability.ts` — निरीक्षणीयता स्नॅपशॉट
- `src/lib/monitoring/comboHealthAutopilot.ts` — कॉम्बो आरोग्य ऑटोपायलट
- `src/lib/monitoring/providerHealthAutopilot.ts` — प्रदाता ऑटोपायलट
- `src/lib/monitoring/providerHealthMatrix.ts` — प्रदाता आरोग्य मॅट्रिक्स
- `src/lib/localHealthCheck.ts` — स्थानिक आरोग्य तपासणी
- `src/lib/tokenHealthCheck.ts` — टोकन रिफ्रेश आरोग्य
- `src/lib/proxyHealth.ts` — प्रॉक्सी आरोग्य कॅशे (PROXY_GUIDE.md मध्ये समाविष्ट)

---

## विहंगावलोकन

OmniRoute मध्ये **निरीक्षणाचे 3 स्तर** आहेत:

```
┌──────────────────────────────────────────────────────────────┐
│  स्तर 1: प्रणालीचे आरोग्य (सर्व्हर स्तरावरील)                │
│  ├─ localHealthCheck.ts — DB, पोर्ट्स, नेटिव्ह अवलंबने        │
│  ├─ db/healthCheck.ts — अखंडता, FK, अनाथ आर्टिफॅक्ट्स         │
│  └─ डॅशबोर्ड: /dashboard/health                               │
├──────────────────────────────────────────────────────────────┤
│  स्तर 2: प्रदाता आरोग्य (प्रति-प्रदाता लवचिकता)               │
│  ├─ providerHealthAutopilot.ts — सर्किट ब्रेकर, कूलडाउन्स     │
│  ├─ providerHealthMatrix.ts — प्रदाता/मॉडेलनुसार आरोग्य गुणांक │
│  └─ डॅशबोर्ड: /dashboard/providers                            │
├──────────────────────────────────────────────────────────────┤
│  स्तर 3: थेट निरीक्षणीयता (रनटाइम स्नॅपशॉट्स)                │
│  ├─ observability.ts — सर्किट ब्रेकर्स, सत्रे, कोटा            │
│  ├─ tokenHealthCheck.ts — OAuth टोकन रिफ्रेश आरोग्य           │
│  └─ MCP साधने: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## डॅशबोर्ड पृष्ठे

### `/dashboard/health` (प्रणालीचे आरोग्य)

उच्च-स्तरीय आरोग्य डॅशबोर्डवर पुढील माहिती दिसते:

| विभाग              | काय दाखवते                                             |
| ------------------ | ------------------------------------------------------ |
| **सर्व्हर स्थिती** | अपटाइम, आवृत्ती, पोर्ट, सक्रिय कनेक्शन्स               |
| **डेटाबेस**        | कनेक्शन, अखंडता, WAL आकार, अलीकडील मायग्रेशन्स         |
| **प्रदाता सारांश** | सक्रिय संख्या, निरोगी संख्या, उघड्या ब्रेकर्सची संख्या |
| **कोटा मॉनिटर्स**  | सक्रिय सत्रे, सूचना देणारे, संपलेले                    |
| **अलीकडील त्रुटी** | स्टॅक ट्रेसेससह शेवटच्या 10 त्रुटी                     |
| **संसाधन वापर**    | मेमरी, CPU, हीप दाब निर्देशक                           |

### `/dashboard/providers` (प्रदाता आरोग्य)

प्रति-प्रदाता डॅशबोर्ड:

| स्तंभ     | वर्णन                                                  |
| --------- | ------------------------------------------------------ |
| प्रदाता   | प्रदाता ID + दर्शविलेले नाव                            |
| आरोग्य    | हिरवी/पिवळी/लाल स्थिती                                 |
| सर्किट    | उघडी/बंद/अर्ध-उघडी स्थिती                              |
| कनेक्शन्स | कनेक्शन्सची संख्या, शेवटचा रिफ्रेश                     |
| मॉडेल्स   | उपलब्ध मॉडेल्स, प्रति-मॉडेल आरोग्य                     |
| खर्च      | आजचा खर्च, 7-दिवसांचा कल                               |
| त्रुटी    | मागील 24 तासांतील त्रुटींची संख्या, प्रमुख त्रुटी वर्ग |

प्रदात्यावर क्लिक करून पुढील माहिती पाहा:

- विलंबाच्या तपशीलवार विभाजनासह अलीकडील विनंत्या
- प्रति-कनेक्शन आरोग्य गुणांक
- प्रति-मॉडेल लॉकआउट्स
- ऑटोपायलट शिफारसी

### `/dashboard/quota` (कोटा ट्रॅकिंग)

प्रत्येक API कीसाठी:

- सध्याचा वापर विरुद्ध मर्यादा (प्रगती पट्टी)
- कोटा कल (30-दिवसांचा चार्ट)
- पुढील रीसेट वेळ
- सूचना इतिहास

### `/dashboard/combos` (कॉम्बो आरोग्य)

प्रति-कॉम्बो:

- धोरण + लक्ष्ये
- प्रति-लक्ष्य आरोग्य
- अलीकडील फॉलबॅक घटना
- यशाचा दर (24 तास, 7 दिवस, 30 दिवस)

---

## आरोग्य तपासणी API

OmniRoute **दोन** HTTP आरोग्य पृष्ठभाग उपलब्ध करून देते. ऑर्केस्ट्रेटर्ससाठी ते परस्पर बदलून वापरता येत नाहीत.

| पथ                           | उद्देश                                                     | भार                              | यासाठी वापरा                                                            |
| ---------------------------- | ---------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `GET /healthz`               | जीवनचक्र सक्रियता/तत्परता (`ok` / `starting` / `stopping`) | अत्यल्प (केवळ टप्पा ध्वज)        | Kubernetes **readiness**; HTTP वापरणे आवश्यक असल्यास सौम्य **liveness** |
| `GET /api/monitoring/health` | सखोल प्रणाली + प्रदाता सारांश (DB, heap, कॅटलॉग संख्या, …) | जड (समकालीन DB / निरीक्षण कार्य) | डॅशबोर्ड्स, ब्लॅकबॉक्स सखोल तपासण्या, Docker ची अंगभूत आरोग्य तपासणी    |

> **टीप:** प्रदाता आरोग्य मॅट्रिक्स, autopilot समस्या, कोटा मॉनिटर्स, टोकन आरोग्य आणि `/api/monitoring/health` पलीकडील विलंब तपशील **MCP tool** `observability_snapshot` किंवा **dashboard** पृष्ठांद्वारे उपलब्ध आहेत — त्यांच्यासाठी स्वतंत्र REST मार्ग नाहीत.

दोन्ही मार्ग विनंती हाताळणीसाठी वापरल्या जाणाऱ्या **त्याच Node event loop** वर चालतात. CPU-बाउंड पथ (मोठ्या `GET /v1/models` कॅटलॉगवरील कार्य, दीर्घ-संदर्भ कॉम्प्रेशन / टोकन मोजणी) `/healthz` सह **सर्व** HTTP हँडलर्सना विलंब करू शकतो. व्यस्त event loop ≠ बंद पडलेली प्रक्रिया. संसाधन बळकावणाऱ्या प्रक्रियेचे निराकरण करण्यास प्राधान्य द्या; प्रोब ट्यूनिंग केवळ चुकीच्या समाप्ती कमी करते.

### हलका ऑर्केस्ट्रेटर प्रोब

```bash
GET /healthz
# किंवा HEAD /healthz
```

- सर्व्हरच्या जीवनचक्राचा टप्पा तयार असताना **200** + मुख्य भाग `ok`
- बूट किंवा शटडाउनदरम्यान **503** + `starting` / `stopping`
- अंमलबजावणी: `src/app/healthz/route.ts` (DB ping नाही)

### प्रणाली आरोग्य (सखोल)

```bash
GET /api/monitoring/health
```

प्रतिसाद:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: प्रोब-कॅश विरुद्ध SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` हे **इन-मेमरी प्रोब-कॅश
गेज** आहे, `provider_connections.test_status` चा थेट डंप नाही. #12532 नंतर
विनंती पथ केवळ `getCachedCredentialHealthSummary()` वाचतो; पार्श्वभूमी प्रोब्स
event loop च्या बाहेर कॅश रीफ्रेश करतात.

| स्तर                    | कुठे                                                                  | त्याचा अर्थ                                                                                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| प्रोब-कॅश गेज           | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | प्रक्रियेच्या मेमरीत अजूनही असलेले अंतिम क्रेडेन्शियल-आरोग्य प्रोब परिणाम. `source` नेहमी `probe-cache` असतो.                                                                                                             |
| अयशस्वी कनेक्शनचा तपशील | `credentialHealth.failedConnections`                                  | **केवळ `failed > 0` असताना** उपस्थित. `status=error` असलेल्या कॅश पंक्तींची मर्यादित सूची (`connectionId`, `status`, स्वच्छ केलेले `lastError` / `lastErrorType`). सूचीची मर्यादा गाठल्यास `failedOmitted` सेट केले जाते. |
| SQLite चिकट स्थिती      | `credentialHealth.staleDbNonOkCount`                                  | ज्यांचे कायमस्वरूपी जतन केलेले `test_status` ज्ञात non-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) आहे अशा **सक्रिय** (`is_active=1`) कनेक्शन पंक्तींची संख्या.                  |

हे दोन स्तर हेतुपुरस्सर विसंगत असू शकतात:

- गेज `failed=0`, तर `staleDbNonOkCount>0` — SQLite मध्ये अजूनही चिकट
  `test_status` आहे (उदाहरणार्थ `expired` किंवा `credits_exhausted`), ज्याची नवीनतम
  प्रोब-कॅश स्नॅपशॉटमध्ये `status=error` म्हणून गणना केलेली नाही.
- गेज `failed>0`, तर SQLite निरोगी दिसते — अलीकडील प्रोब अयशस्वी झाला आणि तो
  कॅशमध्ये आहे; DB पंक्ती अद्याप अद्ययावत झालेली नाही किंवा नंतर ती साफ केली गेली.

हा एंडपॉइंट स्क्रेप करताना केवळ `provider_connections.test_status` वर आधारित
अलर्ट देऊ नका. थेट प्रोब अपयशांसाठी `failed` + `failedConnections` वापरा आणि
कायमस्वरूपी जतन केलेल्या चिकट-स्थितीची संख्या आवश्यक असल्यास `staleDbNonOkCount` वापरा.

### Kubernetes प्रोब शिफारसी

OmniRoute ही **एकल Node प्रक्रिया** आहे (एक event loop). Docker चे मानक `HEALTHCHECK` हलक्या `/healthz` ला लक्ष्य करते. kubelet सक्रियता मध्यांतरांसाठी `/api/monitoring/health` **अतिशय जड** आहे.

| प्रोब           | शिफारस केलेले लक्ष्य                                                          | नोंदी                                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **स्टार्टअप**   | दीर्घ `failureThreshold` (किंवा मोठ्या `startPeriod`) सह HTTP `GET /healthz`  | कोल्ड स्टार्ट + SQLite माइग्रेशनला काही सेकंदांपेक्षा अधिक वेळ लागू शकतो                                                                                                                                                                                                                                                                                                         |
| **रेडिनेस**     | HTTP `GET /healthz`                                                           | लाइफसायकल `ok` / `starting` / `stopping` (200 विरुद्ध 503). लूप CPU-ब्लॉक झाल्यास तरीही स्थिती वारंवार बदलते. **अनेक सेकंदांनंतर मिळालेला 200 प्रतिसाद आरोग्यदर्शक नाही** (#10303) — त्याचा अर्थ 3-बाइट हँडलर चालण्यापूर्वी इव्हेंट लूपला संसाधने मिळाली नाहीत                                                                                                                   |
| **लाइव्हनेस**   | HTTP `GET /livez`, **किंवा मुख्य सेवा पोर्टवर TCP** (`PORT`, डीफॉल्ट `20128`) | `/livez` फक्त प्रोसेस चालू आहे की नाही हे दर्शवते (हँडलर चालल्यास नेहमी 200). तीदेखील तोच इव्हेंट लूप वापरते — व्यस्त ≠ बंद, आणि TCP पेक्षा अधिक चांगल्या प्रकारे इव्हेंट-लूप स्टार्व्हेशन (#10303) शोधत नाही. कॅटलॉग/कॉम्प्रेशन लोडमध्ये HTTP प्रोब टाइम आउट होत असल्यास **TCP** ला प्राधान्य द्या; कोणत्याही परिस्थितीत अल्पकालीन इव्हेंट-लूप अडथळ्यांमुळे pod बंद करू **नका** |
| **सखोल आरोग्य** | बाह्य तपासकाकडून `GET /api/monitoring/health`                                 | kubelet `livenessProbe` / वारंवार होणाऱ्या `readinessProbe` साठी नाही                                                                                                                                                                                                                                                                                                            |

उदाहरण स्वरूप (तुमच्या कोल्ड-स्टार्ट आणि कॉम्प्रेशन लोडनुसार थ्रेशोल्ड समायोजित करा):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # इव्हेंट-लूपमध्ये अडथळा आल्यास HTTP /livez अद्याप टाइम आउट होऊ शकते. TCP हा
  # सुरक्षित पर्याय आहे:
  # tcpSocket:
  #   port: http
```

kubelet **लाइव्हनेस**साठी `/api/monitoring/health` वापरू **नका**. हा पाथ प्रत्यक्ष DB/मॉनिटरिंग कार्य करतो आणि लोडमध्ये चुकीचा पॉझिटिव्ह निकाल देईल.

संबंधित: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (इव्हेंट लूप व्यस्त असतानाचे प्रोब), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (कॅटलॉग किंमत-निर्धारणामुळे संसाधनांचा अतिवापर), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (कॉम्प्रेशन टोकन-मोजणीमुळे संसाधनांचा अतिवापर).

### पर्यायी विनंती-पाथ कार्य (मेमरी, स्किल्स, टोकन रिफ्रेश)

मेमरी एक्स्ट्रॅक्शन, स्किल्स इंजेक्शन आणि OAuth टोकन रिफ्रेश `/healthz` सोबत **मुख्य Node इव्हेंट लूप** वापरतात. ही डॅशबोर्डवरून टॉगल करता येणारी वैशिष्ट्ये (`memoryEnabled`, `skillsEnabled`) आहेत, वर्कर पूल नाहीत. [Environment — event-loop cost](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) पहा.

### प्रोव्हायडरचे आरोग्य

> **REST एंडपॉइंट नाही.** प्रोव्हायडरचे आरोग्यविषयक डेटा MCP टूल `observability_snapshot` किंवा डॅशबोर्डवरील `/dashboard/providers` पृष्ठाद्वारे उपलब्ध आहे.

### प्रोव्हायडरचे तपशील

> **REST एंडपॉइंट नाही.** प्रत्येक प्रोव्हायडरचे तपशील डॅशबोर्डवरील `/dashboard/providers` पृष्ठाद्वारे उपलब्ध आहेत.

---

## प्रदाता आरोग्य ऑटोपायलट

`providerHealthAutopilot.ts` मॉड्यूल ही एक **स्वयं-दुरुस्ती करणारी प्रणाली** आहे, जी:

1. प्रदात्याशी संबंधित समस्या शोधते (सर्किट उघडे असणे, कूलडाउन, लॉकआउट, कोटा चेतावण्या)
2. त्या सोडवण्यासाठी **शिफारस केलेल्या कृती** तयार करते
3. कमी जोखमीच्या कृती वैकल्पिकरित्या **स्वयंचलितपणे अंमलात आणते**

### शोधल्या जाणाऱ्या समस्यांचे प्रकार

| समस्येचा प्रकार              | तीव्रता | उदाहरण स्थिती                                 |
| ---------------------------- | ------- | --------------------------------------------- |
| `provider_circuit_open`      | गंभीर   | 5 अपयशांनंतर सर्किट ब्रेकर उघडा झाला          |
| `provider_circuit_half_open` | चेतावणी | सर्किट पुनर्प्राप्तीची चाचणी सुरू आहे         |
| `connection_cooldown`        | चेतावणी | 429 नंतर कनेक्शन कूलडाउनमध्ये आहे             |
| `stale_connection_error`     | चेतावणी | शेवटचे रिफ्रेश 30+ मिनिटांपूर्वी अयशस्वी झाले |
| `terminal_connection_error`  | गंभीर   | OAuth रद्द केले, की अवैध आहे                  |
| `inactive_connection`        | माहिती  | सेटिंग्जमध्ये कनेक्शन अक्षम केले आहे          |
| `model_lockout`              | चेतावणी | विशिष्ट मॉडेल क्वारंटाइनमध्ये आहे             |
| `quota_monitor_warning`      | चेतावणी | कोटाचा वापर 80%+ झाला आहे                     |

### तयार होणाऱ्या कृतींचे प्रकार

| कृती                           | जोखीम | वर्णन                                     |
| ------------------------------ | ----- | ----------------------------------------- |
| `clear_provider_breaker`       | मध्यम | सर्किट ब्रेकर बंद स्थितीवर रीसेट करा      |
| `clear_connection_cooldown`    | कमी   | कनेक्शनवरील कूलडाउन काढून टाका            |
| `clear_stale_connection_error` | कमी   | जुना त्रुटी फ्लॅग साफ करा                 |
| `clear_model_lockout`          | कमी   | क्वारंटाइन केलेले मॉडेल पुन्हा सक्षम करा  |
| `reactivate_connection`        | मध्यम | निष्क्रिय केलेले कनेक्शन पुन्हा सक्षम करा |
| `deactivate_connection`        | जास्त | समस्याग्रस्त कनेक्शन अक्षम करा            |

### API

> **REST एंडपॉइंट नाही.** ऑटोपायलट समस्या MCP साधन `observability_snapshot` किंवा डॅशबोर्डद्वारे उपलब्ध आहेत. ऑटोपायलट अंतर्गत कार्यरत असतो; त्याचे वर्तन पर्यावरण चलांद्वारे नव्हे, तर सेटिंग्ज DB मधून (प्रत्येक कनेक्शनच्या `autopilotMode` फील्डद्वारे) कॉन्फिगर केले जाते — ऑटोपायलट-मोड पर्यावरण चलासाठी `grep -rn` केल्यास शून्य परिणाम मिळतात.

### ऑटोपायलट मोड

ऑटोपायलट डीफॉल्टनुसार **मॅन्युअल मोडमध्ये** कार्य करतो — तो समस्या शोधतो आणि शिफारस केलेल्या कृती तयार करतो, परंतु त्या स्वयंचलितपणे लागू करत नाही. कृती डॅशबोर्डद्वारे लागू करता येतात.

---

## कॉम्बो आरोग्य ऑटोपायलट

`comboHealthAutopilot.ts` हे प्रदाता ऑटोपायलटचे **कॉम्बो-विशिष्ट** समकक्ष आहे. ते:

- अस्वस्थ कॉम्बो शोधते
- लक्ष्यांचा क्रम बदलण्याची शिफारस करते
- बिघडलेली लक्ष्ये अक्षम करण्याचे सुचवते
- N अपयशांनंतर निष्क्रिय लक्ष्ये स्वयंचलितपणे काढून टाकते

### कॉम्बो समस्यांची उदाहरणे

```
कॉम्बो "always-on" (प्राधान्य धोरण)
├─ लक्ष्य 1: openai/gpt-5 (निरोगी)
├─ लक्ष्य 2: anthropic/claude-opus-4-6 (⚠️ 14:00 पर्यंत मॉडेल लॉकआउट)
└─ लक्ष्य 3: kiro/claude-sonnet-4-5 (निरोगी)

शिफारस केलेली कृती: क्रम बदला — लॉकआउट संपेपर्यंत kiro ला anthropic च्या वर हलवा
```

---

## कोटा मॉनिटर्स

`observability.ts` सदस्यता प्रदात्यांसाठी (Claude Code, Codex, GitHub Copilot) **प्रत्येक सत्रानुसार कोटा मॉनिटर्स** उपलब्ध करून देते:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### स्थितींचे अर्थ

| स्थिती      | कधी                          | UI कृती                               |
| ----------- | ---------------------------- | ------------------------------------- |
| `starting`  | प्रारंभिक पोलिंग सुरू आहे    | स्पिनर                                |
| `idle`      | अलीकडे कोणतीही गतिविधी नाही  | डॅशबोर्डवरून लपवलेले                  |
| `healthy`   | 50% पेक्षा जास्त कोटा शिल्लक | हिरवा बिंदू                           |
| `warning`   | 50% पेक्षा कमी कोटा शिल्लक   | पिवळी सूचना                           |
| `exhausted` | कोटा = 0%                    | लाल ब्लॉक, पुढील प्रदात्याकडे रूट करा |
| `error`     | पोलिंग अयशस्वी झाले          | लाल बिंदू, लवकरच पुन्हा प्रयत्न करा   |

### API

> **REST एंडपॉइंट नाही.** कोटा मॉनिटर डेटा MCP साधन `observability_snapshot` किंवा डॅशबोर्डद्वारे उपलब्ध आहे.

---

## निरीक्षणक्षमता स्नॅपशॉट

MCP साधन `observability_snapshot` AI एजंटसाठी **संपूर्ण प्रणाली स्नॅपशॉट** परत करते:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* वरील माहिती पाहा */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

एजंट याचा वापर **रूटिंग निर्णय** घेण्यासाठी करतात — उदाहरणार्थ, "openai चे सर्किट उघडे असल्यास, विनंती प्रथम anthropic कडे रूट करा".

---

## टोकन आरोग्य तपासणी

OAuth प्रदात्यांना (Claude Code, GitHub Copilot, Cursor) **ठरावीक कालांतराने टोकन रिफ्रेश** करणे आवश्यक असते. `src/lib/tokenHealthCheck.ts` पार्श्वभूमी शेड्युलर चालवते:

- **स्वीप टिक**: दर 60 सेकंदांनी (`src/lib/tokenHealthCheck.ts:30` येथे `TICK_MS = 60 * 1000` मधील स्वीप)
- **प्रति-कनेक्शन आरोग्य तपासणीचे अंतर**: डीफॉल्टनुसार 60 मिनिटे (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); सेटिंग्ज DB द्वारे कॉन्फिगर करता येते
- **401 आल्यावर प्रतिबंधात्मक रिफ्रेश**: प्रति-कनेक्शन इंटरसेप्टरद्वारे हाताळले जाते

### टोकन आरोग्य स्थिती

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### कॉन्फिगरेशन

टोकन आरोग्य तपासणीचे कॉन्फिगरेशन `tokenHealthCheck.ts` द्वारे अंतर्गतरीत्या हाताळले जाते.

### टोकन आरोग्य

> **REST एंडपॉइंट उपलब्ध नाही.** टोकन आरोग्य डेटा डॅशबोर्ड किंवा MCP साधन `observability_snapshot` द्वारे उपलब्ध आहे.

---

## अलर्टिंग

### अंगभूत चॅनेल

OmniRoute **3 अलर्ट चॅनेलना** समर्थन देते:

| चॅनेल         | सेटअप            | वापराचे प्रकरण            |
| ------------- | ---------------- | ------------------------- |
| डॅशबोर्ड बॅनर | नेहमी सुरू       | ॲपमधील सूचना              |
| Webhook       | URL कॉन्फिगर करा | Slack, Discord, PagerDuty |
| लॉग           | डीफॉल्ट          | बाह्य लॉग एकत्रीकरणासाठी  |

### Webhook कॉन्फिगरेशन

> **टीप:** Webhook अलर्टिंगचे कॉन्फिगरेशन डॅशबोर्डवरील Settings पृष्ठाद्वारे हाताळले जाते. Webhook URL, इव्हेंट फिल्टरिंग आणि पेलोड कस्टमायझेशनसाठी Settings UI पाहा.

### अलर्टचे प्रकार

| अलर्ट                        | केव्हा                                                 | डीफॉल्ट तीव्रता |
| ---------------------------- | ------------------------------------------------------ | --------------- |
| `provider_circuit_open`      | सर्किट उघडते                                           | गंभीर           |
| `provider_circuit_half_open` | सर्किट पुनर्प्राप्तीची चाचणी सुरू असते                 | माहिती          |
| `quota_warning`              | कोटा 80%+ असतो                                         | चेतावणी         |
| `quota_exhausted`            | कोटा 100% असतो                                         | गंभीर           |
| `token_refresh_failed`       | सलग 3+ रिफ्रेश अयशस्वी होतात                           | चेतावणी         |
| `token_expired`              | टोकनची मुदत संपलेली असते                               | गंभीर           |
| `combo_target_unhealthy`     | कॉम्बो लक्ष्य 1 तासापेक्षा जास्त काळ कूलडाउनमध्ये असते | चेतावणी         |
| `db_integrity_warning`       | FK उल्लंघने > 0 असतात                                  | चेतावणी         |
| `heap_pressure`              | हीपचा वापर थ्रेशोल्डच्या 80% पेक्षा जास्त असतो         | चेतावणी         |

---

## कार्यप्रदर्शन मेट्रिक्स

### ट्रॅक केलेले मेट्रिक्स

| मेट्रिक                 | प्रकार      | स्रोत                           |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | काउंटर      | `services/usage.ts`             |
| `request_latency_ms`    | हिस्टोग्राम | `services/usage.ts`             |
| `tokens_consumed`       | काउंटर      | `services/usage.ts`             |
| `cost_usd`              | काउंटर      | `services/usage.ts`             |
| `provider_errors`       | काउंटर      | `services/errorClassifier.ts`   |
| `circuit_state_changes` | काउंटर      | `services/resilience.ts`        |
| `cache_hits`            | काउंटर      | `services/signatureCache.ts`    |
| `compression_savings`   | हिस्टोग्राम | `services/compression/stats.ts` |
| `quota_used`            | गेज         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | गेज         | `observability.ts`              |

### विलंबता पर्सेंटाइल्स (p50/p95/p99)

> **REST एंडपॉइंट उपलब्ध नाही.** विलंबता पर्सेंटाइल डेटा डॅशबोर्डच्या `/dashboard/health` पृष्ठावर उपलब्ध आहे. Prometheus/OpenTelemetry निर्यात v3.9 साठी नियोजित आहे.

### Prometheus / OpenTelemetry निर्यात (टप्पा 2)

v3.9 साठी नियोजित: Prometheus, OpenTelemetry, Datadog वर नेटिव्ह निर्यात.

सध्या, कोणत्याही HTTP-आधारित मॉनिटरिंग प्रणालीद्वारे (Prometheus blackbox exporter, Datadog HTTP check इ.) `/api/monitoring/health` स्क्रेप करा.

---

## अलर्टिंग कृतीविधी

### Slack

> **टीप:** Webhook अलर्टिंग डॅशबोर्डच्या Settings पृष्ठाद्वारे कॉन्फिगर केले जाते — यासाठी स्वतंत्र webhook env vars नाहीत (`grep -rn` केल्यास एकही परिणाम मिळत नाही). Webhook URL, इव्हेंट फिल्टरिंग आणि पेलोड कस्टमायझेशनसाठी Settings UI पाहा.

### Discord

> Webhook अलर्टिंगसाठी Slack प्रमाणेच Settings UI प्रक्रिया वापरली जाते. Discord त्याच JSON पेलोड स्वरूपाचा स्वीकार करते.

### PagerDuty

> Webhook अलर्टिंगसाठी तीच Settings UI प्रक्रिया वापरली जाते. PagerDuty Events API v2 राउटिंग कीज Settings UI मध्ये कॉन्फिगर केल्या जातात.

### कस्टम Webhook (JSON)

> JSON बॉडीसह POST स्वीकारणारा कोणताही HTTP एंडपॉइंट वापरता येईल. URL हे Settings UI मध्ये कॉन्फिगर करा.

---

## डॅशबोर्ड कॉन्फिगरेशन

### आरोग्य डॅशबोर्ड कस्टमाइझ करा

`~/.omniroute/dashboard.json` तयार करा:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### प्रदात्याला सर्वांत वर पिन करा

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## समस्यानिवारण

### "प्रदाता निरोगी असल्याचे सांगतो, पण विनंत्या अयशस्वी होतात"

1. **autopilot समस्या** तपासा — कदाचित एखादे मॉडेल लॉक आउट झाले आहे
2. विशिष्ट त्रुटी वर्गासाठी **अलीकडील त्रुटी** पाहा
3. प्रदाता कार्डमधील **कनेक्शन चाचणी** करून पाहा
4. प्रदाता **अपस्ट्रीमवर दर-मर्यादित** आहे का ते तपासा (स्थानिक पातळीवर दिसत नाही)

### "कोटा ठीक असल्याचे दिसते, पण मला 429 त्रुटी दिसतात"

- 429 चा अर्थ प्रदात्याच्या मते तुम्ही तुमचा कोटा वापरून संपवला आहे
- OmniRoute चे कोटा ट्रॅकिंग **कालबाह्य** असू शकते — प्रदात्याकडील अपस्ट्रीम माहिती हीच अचूक मानावी
- अंतर्गत कोटा मॉनिटरद्वारे कोटा डेटा आपोआप रिफ्रेश होतो

### "सर्व लक्ष्ये निरोगी दिसत असूनही कॉम्बो अयशस्वी होत आहे"

- लक्ष्य क्रमवारीतील समस्यांसाठी **कॉम्बो आरोग्य** डॅशबोर्ड तपासा
- **फॉलबॅक इव्हेंट्स** पाहा — कदाचित कॉम्बो खूप लवकर सर्व पर्याय वापरून संपवत आहे
- **धोरण** तुमच्या वापराच्या परिस्थितीशी जुळते याची खात्री करा (प्राधान्य विरुद्ध राउंड-रॉबिन विरुद्ध स्वयंचलित)

### "डेटाबेस आरोग्य तपासणी अयशस्वी होत आहे"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` चालवा
- "ok" असल्यास — हा खोटा इशारा आहे; आरोग्य तपासणी अतिशय कठोर आहे
- इतर काहीही असल्यास — **OmniRoute थांबवा** आणि [आपत्ती पुनर्प्राप्ती मार्गदर्शक](./DATABASE_GUIDE.md#disaster-recovery) अनुसरा

### "मेमरी हीपवरील दबाव गंभीर आहे"

```bash
# सध्याची हीप तपासा
node -e "console.log(process.memoryUsage())"

# मॅन्युअल GC ट्रिगर करा (--expose-gc असल्यास)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# समकालीन विनंत्या कमी करा (env var द्वारे नव्हे, तर डॅशबोर्डच्या Settings पृष्ठाद्वारे सेट करा)
# `MAX_CONCURRENT_REQUESTS` env var अस्तित्वात नाही — ते Settings → Concurrency मध्ये कॉन्फिगर करा.
```

---

## हे देखील पहा

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — वापर आणि खर्चाचे ट्रॅकिंग
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB स्कीमा + स्थिती
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — प्रॉक्सी स्थिती (स्वतंत्र कॅशे)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — प्रणाली आर्किटेक्चर
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकरचे तपशील
- स्रोत: `src/lib/monitoring/` (4 फाइल्स, 2121 LOC)
