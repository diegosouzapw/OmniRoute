# Monitoring & Observability Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **संक्षेपमा**: OmniRoute मा अन्तर्निर्मित स्वास्थ्य अनुगमन, प्रदायक अटोपाइलट, कोटा ट्र्याकिङ र अवलोकनीयता हुकहरू समावेश छन्। यस मार्गदर्शिकाले ड्यासबोर्ड, चेतावनी र समस्या निवारण समेट्छ।

**स्रोतहरू:**

- `src/lib/monitoring/observability.ts` — अवलोकनीयता स्न्यापसट
- `src/lib/monitoring/comboHealthAutopilot.ts` — कम्बो स्वास्थ्य अटोपाइलट
- `src/lib/monitoring/providerHealthAutopilot.ts` — प्रदायक अटोपाइलट
- `src/lib/monitoring/providerHealthMatrix.ts` — प्रदायक स्वास्थ्य म्याट्रिक्स
- `src/lib/localHealthCheck.ts` — स्थानीय स्वास्थ्य जाँच
- `src/lib/tokenHealthCheck.ts` — टोकन रिफ्रेस स्वास्थ्य
- `src/lib/proxyHealth.ts` — प्रोक्सी स्वास्थ्य क्यास (PROXY_GUIDE.md मा समेटिएको)

---

## सिंहावलोकन

OmniRoute मा **अनुगमनका ३ तहहरू** छन्:

```
┌──────────────────────────────────────────────────────────────┐
│  तह १: प्रणाली स्वास्थ्य (सर्भर-स्तर)                         │
│  ├─ localHealthCheck.ts — DB, पोर्टहरू, नेटिभ निर्भरताहरू     │
│  ├─ db/healthCheck.ts — अखण्डता, FK, अनाथ आर्टिफ्याक्टहरू     │
│  └─ ड्यासबोर्ड: /dashboard/health                            │
├──────────────────────────────────────────────────────────────┤
│  तह २: प्रदायक स्वास्थ्य (प्रति-प्रदायक लचिलोपन)              │
│  ├─ providerHealthAutopilot.ts — सर्किट ब्रेकर, कूलडाउनहरू    │
│  ├─ providerHealthMatrix.ts — प्रदायक/मोडेलअनुसार स्वास्थ्य स्कोर │
│  └─ ड्यासबोर्ड: /dashboard/providers                         │
├──────────────────────────────────────────────────────────────┤
│  तह ३: प्रत्यक्ष अवलोकनीयता (रनटाइम स्न्यापसटहरू)             │
│  ├─ observability.ts — सर्किट ब्रेकरहरू, सत्रहरू, कोटा         │
│  ├─ tokenHealthCheck.ts — OAuth टोकन रिफ्रेस स्वास्थ्य        │
│  └─ MCP उपकरणहरू: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ड्यासबोर्ड पृष्ठहरू

### `/dashboard/health` (प्रणाली स्वास्थ्य)

शीर्ष-स्तरीय स्वास्थ्य ड्यासबोर्डले निम्न कुराहरू देखाउँछ:

| खण्ड                 | यसले के देखाउँछ                                     |
| -------------------- | --------------------------------------------------- |
| **सर्भर स्थिति**     | अपटाइम, संस्करण, पोर्ट, सक्रिय जडानहरू              |
| **डेटाबेस**          | जडान, अखण्डता, WAL आकार, हालैका माइग्रेसनहरू        |
| **प्रदायक सारांश**   | सक्रिय सङ्ख्या, स्वस्थ सङ्ख्या, खुला ब्रेकर सङ्ख्या |
| **कोटा मनिटरहरू**    | सक्रिय सत्रहरू, चेतावनी अवस्था, समाप्त भएका         |
| **हालैका त्रुटिहरू** | स्ट्याक ट्रेससहितका पछिल्ला १० त्रुटिहरू            |
| **स्रोत उपयोग**      | मेमोरी, CPU, हिप दबाब सूचक                          |

### `/dashboard/providers` (प्रदायक स्वास्थ्य)

प्रति-प्रदायक ड्यासबोर्ड:

| स्तम्भ    | विवरण                                                 |
| --------- | ----------------------------------------------------- |
| प्रदायक   | प्रदायक ID + प्रदर्शन नाम                             |
| स्वास्थ्य | हरियो/पहेंलो/रातो स्थिति                              |
| सर्किट    | खुला/बन्द/आधा-खुला अवस्था                             |
| जडानहरू   | जडानहरूको सङ्ख्या, पछिल्लो रिफ्रेस                    |
| मोडेलहरू  | उपलब्ध मोडेलहरू, प्रति-मोडेल स्वास्थ्य                |
| लागत      | आजको लागत, ७-दिने प्रवृत्ति                           |
| त्रुटिहरू | पछिल्लो २४ घण्टाको त्रुटि सङ्ख्या, प्रमुख त्रुटि वर्ग |

प्रदायकमा क्लिक गरेर निम्न विवरणहरू हेर्नुहोस्:

- विलम्बता विवरणसहितका हालैका अनुरोधहरू
- प्रति-जडान स्वास्थ्य स्कोरहरू
- प्रति-मोडेल लकआउटहरू
- अटोपाइलट सिफारिसहरू

### `/dashboard/quota` (कोटा ट्र्याकिङ)

प्रत्येक API कुञ्जीका लागि:

- सीमाको तुलनामा हालको प्रयोग (प्रगति पट्टी)
- कोटा प्रवृत्ति (३०-दिने चार्ट)
- अर्को रिसेट समय
- चेतावनी इतिहास

### `/dashboard/combos` (कम्बो स्वास्थ्य)

प्रति-कम्बो:

- रणनीति + लक्ष्यहरू
- प्रति-लक्ष्य स्वास्थ्य
- हालैका फलब्याक घटनाहरू
- सफलता दर (२४ घण्टा, ७ दिन, ३० दिन)

---

## स्वास्थ्य जाँच API

OmniRoute ले **दुईवटा** HTTP स्वास्थ्य सतहहरू उपलब्ध गराउँछ। अर्केस्ट्रेटरहरूका लागि तिनलाई परस्पर साटेर प्रयोग गर्न मिल्दैन।

| मार्ग                        | उद्देश्य                                                   | भार                                  | प्रयोग                                                                         |
| ---------------------------- | ---------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `GET /healthz`               | जीवनचक्र सक्रियता/तत्परता (`ok` / `starting` / `stopping`) | नगण्य (चरण फ्ल्याग मात्र)            | Kubernetes **readiness**; HTTP प्रयोग गर्नैपर्ने भए नरम **liveness**           |
| `GET /api/monitoring/health` | प्रणाली + प्रदायकको गहन सारांश (DB, हिप, क्याटलग गणना, …)  | भारी (सिङ्क्रोनस DB / निगरानी कार्य) | ड्यासबोर्डहरू, ब्ल्याकबक्स गहन जाँचहरू, Docker को अन्तर्निर्मित स्वास्थ्य जाँच |

> **नोट:** प्रदायक स्वास्थ्य म्याट्रिक्सहरू, अटोपाइलट समस्याहरू, कोटा मनिटरहरू, टोकन स्वास्थ्य, र `/api/monitoring/health` भन्दा विस्तृत विलम्बता विवरण **MCP उपकरण** `observability_snapshot` वा **ड्यासबोर्ड** पृष्ठहरूबाट उपलब्ध छन् — तिनका लागि समर्पित REST मार्गहरू छैनन्।

दुवै मार्गहरू अनुरोध ह्यान्डलिङकै **एउटै Node इभेन्ट लुप** मा चल्छन्। CPU-बाउन्ड मार्गले (ठूलो `GET /v1/models` क्याटलग कार्य, लामो-कन्टेक्स्ट कम्प्रेसन / टोकन गणना) `/healthz` सहित **सबै** HTTP ह्यान्डलरहरूलाई ढिलो गराउन सक्छ। इभेन्ट लुप व्यस्त हुनु ≠ प्रक्रिया मृत हुनु। अत्यधिक स्रोत खपत गर्ने कार्यलाई समाधान गर्न प्राथमिकता दिनुहोस्; प्रोब ट्युनिङले गलत रूपमा प्रक्रिया अन्त्य हुने घटना मात्र घटाउँछ।

### हलुका अर्केस्ट्रेटर प्रोब

```bash
GET /healthz
# वा HEAD /healthz
```

- सर्भरको जीवनचक्र चरण तयार हुँदा **200** + बडी `ok`
- बुट वा शटडाउनको समयमा **503** + `starting` / `stopping`
- कार्यान्वयन: `src/app/healthz/route.ts` (DB पिङ छैन)

### प्रणाली स्वास्थ्य (गहन)

```bash
GET /api/monitoring/health
```

प्रतिक्रिया:

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

#### `credentialHealth`: प्रोब-क्यास बनाम SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` **इन-मेमोरी प्रोब-क्यास
गेज** हो, `provider_connections.test_status` को प्रत्यक्ष डम्प होइन। #12532 पछि
अनुरोध मार्गले `getCachedCredentialHealthSummary()` मात्र पढ्छ; पृष्ठभूमि प्रोबहरूले
इभेन्ट लुपबाहिर क्यास ताजा गर्छन्।

| तह                   | कहाँ                                                                  | यसको अर्थ                                                                                                                                                                                                            |
| -------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| प्रोब-क्यास गेज      | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | प्रक्रिया मेमोरीमा अझै राखिएका पछिल्ला क्रेडेन्सियल-स्वास्थ्य प्रोब परिणामहरू। `source` सधैँ `probe-cache` हुन्छ।                                                                                                    |
| असफल कनेक्सन विवरण   | `credentialHealth.failedConnections`                                  | **`failed > 0` हुँदा मात्र** उपस्थित हुन्छ। `status=error` भएका क्यास पङ्क्तिहरूको सीमित सूची (`connectionId`, `status`, परिष्कृत `lastError` / `lastErrorType`)। सूचीमा सीमा लगाइएको भए `failedOmitted` सेट गरिन्छ। |
| SQLite स्थायी स्थिति | `credentialHealth.staleDbNonOkCount`                                  | सुरक्षित गरिएको `test_status` ज्ञात गैर-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) भएका **सक्रिय** (`is_active=1`) कनेक्सन पङ्क्तिहरूको सङ्ख्या।                           |

यी दुई तहहरू उद्देश्यअनुसार फरक हुन सक्छन्:

- गेज `failed=0` हुँदा `staleDbNonOkCount>0` — SQLite मा अझै स्थायी
  `test_status` (उदाहरणका लागि `expired` वा `credits_exhausted`) छ, जसलाई पछिल्लो
  प्रोब-क्यास स्न्यापसटले `status=error` का रूपमा गणना गर्दैन।
- गेज `failed>0` हुँदा SQLite स्वस्थ देखिन्छ — हालैको प्रोब असफल भएको र
  क्यास गरिएको छ; DB पङ्क्ति अद्यावधिक भएको छैन, वा पछि खाली गरिएको थियो।

यो एन्डपोइन्ट स्क्रेप गर्दा `provider_connections.test_status` का आधारमा मात्र अलर्ट
नगर्नुहोस्। प्रत्यक्ष प्रोब विफलताहरूका लागि `failed` + `failedConnections`, र
सुरक्षित गरिएको स्थायी-स्थिति गणना आवश्यक हुँदा `staleDbNonOkCount` प्रयोग गर्नुहोस्।

### Kubernetes प्रोब सिफारिसहरू

OmniRoute एउटा **एकल Node प्रक्रिया** (एउटा इभेन्ट लुप) हो। मानक Docker `HEALTHCHECK` ले हलुका `/healthz` लाई लक्षित गर्छ। `/api/monitoring/health` kubelet सक्रियता अन्तरालहरूका लागि **अत्यधिक भारी** छ।

| प्रोब             | सिफारिस गरिएको लक्ष्य                                                             | टिप्पणीहरू                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **स्टार्टअप**     | लामो `failureThreshold` (वा ठूलो `startPeriod`) सहित HTTP `GET /healthz`          | कोल्ड स्टार्ट + SQLite माइग्रेसनले केही सेकेन्डभन्दा बढी समय लिन सक्छ                                                                                                                                                                                                                                                                             |
| **तत्परता**       | HTTP `GET /healthz`                                                               | लाइफसाइकल `ok` / `starting` / `stopping` (200 विरुद्ध 503)। लुप CPU द्वारा अवरुद्ध भएमा अझै पनि स्थिति बारम्बार बदलिन्छ। **धेरै सेकेन्डपछि आएको 200 स्वस्थ अवस्था होइन** (#10303) — यसको अर्थ 3-बाइट ह्यान्डलर चल्नुअघि इभेन्ट लुपले समय पाएको थिएन                                                                                               |
| **जीवितता**       | HTTP `GET /livez`, **वा मुख्य सेवा पोर्टमा TCP** (`PORT`, पूर्वनिर्धारित `20128`) | `/livez` ले प्रक्रिया जीवित छ कि छैन मात्र जनाउँछ (ह्यान्डलर चलेमा सधैँ 200)। यसले पनि उही इभेन्ट लुप साझा गर्छ — व्यस्त ≠ मृत, र यसले TCP भन्दा राम्रोसँग इभेन्ट-लुप अवरोध (#10303) पत्ता लगाउँदैन। क्याटलग/कम्प्रेसन लोडअन्तर्गत HTTP प्रोबहरू टाइम आउट भएमा **TCP** रोज्नुहोस्; दुवै अवस्थामा छोटो इभेन्ट-लुप अवरोधका कारण pod लाई नमार्नुहोस् |
| **गहन स्वास्थ्य** | बाह्य जाँचकर्ताबाट `GET /api/monitoring/health`                                   | kubelet `livenessProbe` / छोटो अन्तरालको `readinessProbe` का लागि होइन                                                                                                                                                                                                                                                                            |

उदाहरण संरचना (आफ्नो कोल्ड-स्टार्ट र कम्प्रेसन लोडअनुसार थ्रेसहोल्डहरू समायोजन गर्नुहोस्):

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
  # इभेन्ट-लुप अवरोध हुँदा HTTP /livez अझै पनि टाइम आउट हुन सक्छ। TCP
  # सावधानीपूर्ण विकल्प हो:
  # tcpSocket:
  #   port: http
```

kubelet को **जीवितता**लाई `/api/monitoring/health` तर्फ **नदेखाउनुहोस्**। त्यो पथले वास्तविक DB/निगरानी कार्य गर्छ र लोडअन्तर्गत गलत-सकारात्मक नतिजा दिनेछ।

सम्बन्धित: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (इभेन्ट लुप व्यस्त हुँदाका प्रोबहरू), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (क्याटलग मूल्य निर्धारणले स्रोत अत्यधिक ओगट्ने समस्या), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (कम्प्रेसन टोकन-गणनाले स्रोत अत्यधिक ओगट्ने समस्या)।

### वैकल्पिक अनुरोध-पथ कार्य (मेमोरी, सीपहरू, टोकन रिफ्रेस)

मेमोरी एक्स्ट्र्याक्सन, सीप इन्जेक्सन, र OAuth टोकन रिफ्रेसले `/healthz` सँग **मुख्य Node इभेन्ट लुप** साझा गर्छन्। ती ड्यासबोर्डबाट टगल गर्न मिल्ने सुविधाहरू (`memoryEnabled`, `skillsEnabled`) हुन्, वर्कर पुल होइनन्। [वातावरण — इभेन्ट-लुप लागत](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) हेर्नुहोस्।

### प्रदायकको स्वास्थ्य

> **REST एन्डपोइन्ट छैन।** प्रदायकको स्वास्थ्यसम्बन्धी डेटा MCP उपकरण `observability_snapshot` वा ड्यासबोर्डको `/dashboard/providers` पृष्ठमार्फत उपलब्ध छ।

### प्रदायकको विवरण

> **REST एन्डपोइन्ट छैन।** प्रत्येक प्रदायकको विवरण ड्यासबोर्डको `/dashboard/providers` पृष्ठमार्फत उपलब्ध छ।

---

## प्रदायक स्वास्थ्य अटोपाइलट

`providerHealthAutopilot.ts` मोड्युल एउटा **स्वतः सुधार हुने प्रणाली** हो, जसले:

1. प्रदायकसम्बन्धी समस्याहरू पत्ता लगाउँछ (सर्किट खुला हुनु, कूलडाउन, लकआउट, कोटा चेतावनीहरू)
2. तिनको समाधानका लागि **सिफारिस गरिएका कार्यहरू** उत्पन्न गर्छ
3. वैकल्पिक रूपमा कम जोखिम भएका कार्यहरू **स्वतः कार्यान्वयन** गर्छ

### पत्ता लगाइने समस्याका प्रकारहरू

| समस्याको प्रकार              | गम्भीरता | उदाहरण अवस्था                         |
| ---------------------------- | -------- | ------------------------------------- |
| `provider_circuit_open`      | गम्भीर   | 5 पटक असफल भएपछि सर्किट ब्रेकर खुला   |
| `provider_circuit_half_open` | चेतावनी  | सर्किटले पुनःप्राप्तिको परीक्षण गर्दै |
| `connection_cooldown`        | चेतावनी  | 429 पछि जडान कूलडाउनमा                |
| `stale_connection_error`     | चेतावनी  | अन्तिम रिफ्रेस 30+ मिनेटअघि असफल      |
| `terminal_connection_error`  | गम्भीर   | OAuth रद्द गरिएको, कुञ्जी अमान्य      |
| `inactive_connection`        | जानकारी  | सेटिङहरूमा जडान निष्क्रिय गरिएको      |
| `model_lockout`              | चेतावनी  | निर्दिष्ट मोडेल क्वारेन्टिनमा         |
| `quota_monitor_warning`      | चेतावनी  | कोटा प्रयोग 80%+ मा                   |

### उत्पन्न गरिने कार्यका प्रकारहरू

| कार्य                          | जोखिम | विवरण                                      |
| ------------------------------ | ----- | ------------------------------------------ |
| `clear_provider_breaker`       | मध्यम | सर्किट ब्रेकरलाई बन्द अवस्थामा रिसेट गर्ने |
| `clear_connection_cooldown`    | न्यून | जडानबाट कूलडाउन हटाउने                     |
| `clear_stale_connection_error` | न्यून | पुरानो त्रुटि फ्ल्याग हटाउने               |
| `clear_model_lockout`          | न्यून | क्वारेन्टिन गरिएको मोडेल पुनः सक्षम गर्ने  |
| `reactivate_connection`        | मध्यम | निष्क्रिय गरिएको जडान पुनः सक्षम गर्ने     |
| `deactivate_connection`        | उच्च  | समस्याग्रस्त जडान निष्क्रिय गर्ने          |

### API

> **कुनै REST endpoint छैन।** अटोपाइलटका समस्याहरू MCP उपकरण `observability_snapshot` वा ड्यासबोर्डमार्फत उपलब्ध छन्। अटोपाइलट आन्तरिक रूपमा चल्छ; यसको व्यवहार environment variables द्वारा होइन, settings DB (प्रत्येक जडानको `autopilotMode` फिल्ड) मार्फत कन्फिगर गरिन्छ — autopilot-mode env var का लागि `grep -rn` गर्दा कुनै नतिजा आउँदैन।

### अटोपाइलट मोड

अटोपाइलट पूर्वनिर्धारित रूपमा **म्यानुअल मोड** मा सञ्चालन हुन्छ — यसले समस्याहरू पत्ता लगाउँछ र सिफारिस गरिएका कार्यहरू उत्पन्न गर्छ, तर तिनलाई स्वतः लागू गर्दैन। कार्यहरू ड्यासबोर्डमार्फत लागू गर्न सकिन्छ।

---

## कम्बो स्वास्थ्य अटोपाइलट

`comboHealthAutopilot.ts`, प्रदायक अटोपाइलटको **कम्बो-विशिष्ट** समकक्ष हो। यसले:

- अस्वस्थ कम्बोहरू पत्ता लगाउँछ
- लक्ष्यहरूको क्रम परिवर्तन गर्न सिफारिस गर्छ
- बिग्रिएका लक्ष्यहरू निष्क्रिय गर्न सुझाव दिन्छ
- N पटक असफल भएपछि निष्क्रिय लक्ष्यहरू स्वतः हटाउँछ

### कम्बो समस्याका उदाहरणहरू

```
कम्बो "always-on" (प्राथमिकता रणनीति)
├─ लक्ष्य 1: openai/gpt-5 (स्वस्थ)
├─ लक्ष्य 2: anthropic/claude-opus-4-6 (⚠️ 14:00 सम्म मोडेल लकआउट)
└─ लक्ष्य 3: kiro/claude-sonnet-4-5 (स्वस्थ)

सिफारिस गरिएको कार्य: क्रम परिवर्तन — लकआउट समाप्त नभएसम्म kiro लाई anthropic भन्दा माथि सार्नुहोस्
```

---

## कोटा मोनिटरहरू

`observability.ts` ले सदस्यता प्रदायकहरू (Claude Code, Codex, GitHub Copilot) का लागि **प्रत्येक सत्रका कोटा मोनिटरहरू** उपलब्ध गराउँछ:

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

### स्थितिका अर्थहरू

| स्थिति      | कहिले                      | UI कार्य                             |
| ----------- | -------------------------- | ------------------------------------ |
| `starting`  | प्रारम्भिक पोल जारी हुँदा  | स्पिनर                               |
| `idle`      | हालसालै कुनै गतिविधि नभएको | ड्यासबोर्डबाट लुकाइने                |
| `healthy`   | 50% भन्दा बढी कोटा बाँकी   | हरियो बिन्दु                         |
| `warning`   | 50% भन्दा कम कोटा बाँकी    | पहेँलो चेतावनी                       |
| `exhausted` | कोटा = 0%                  | रातो ब्लक, अर्को प्रदायकमा रुट गर्ने |
| `error`     | पोलिङ असफल हुँदा           | रातो बिन्दु, चाँडै पुनः प्रयास गर्ने |

### API

> **कुनै REST endpoint छैन।** कोटा मोनिटर डेटा MCP उपकरण `observability_snapshot` वा ड्यासबोर्डमार्फत उपलब्ध छ।

---

## अवलोकनयोग्यता स्न्यापसट

MCP उपकरण `observability_snapshot` ले AI एजेन्टहरूका लागि **पूर्ण प्रणाली स्न्यापसट** फिर्ता गर्छ:

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
  "quotaMonitors": {/* माथि हेर्नुहोस् */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

एजेन्टहरूले यसलाई **राउटिङ निर्णयहरू** गर्न प्रयोग गर्छन् — उदाहरणका लागि, "यदि openai को सर्किट खुला छ भने, पहिले anthropic मा राउट गर्नुहोस्"।

---

## टोकन स्वास्थ्य जाँच

OAuth प्रदायकहरू (Claude Code, GitHub Copilot, Cursor) लाई **आवधिक टोकन रिफ्रेस** आवश्यक पर्छ। `src/lib/tokenHealthCheck.ts` ले पृष्ठभूमि शेड्युलर चलाउँछ:

- **स्विप टिक**: प्रत्येक 60 सेकेन्डमा (`src/lib/tokenHealthCheck.ts:30` मा `TICK_MS = 60 * 1000` अनुसार स्विप)
- **प्रति-कनेक्सन स्वास्थ्य जाँच अन्तराल**: पूर्वनिर्धारित रूपमा 60 मिनेट (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); सेटिङ्स DB मार्फत कन्फिगर गर्न मिल्ने
- **401 मा पूर्व-सक्रिय रिफ्रेस**: प्रति-कनेक्सन इन्टरसेप्टरद्वारा व्यवस्थापन गरिन्छ

### टोकन स्वास्थ्य स्थिति

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

### कन्फिगरेसन

टोकन स्वास्थ्य जाँच कन्फिगरेसन `tokenHealthCheck.ts` द्वारा आन्तरिक रूपमा व्यवस्थापन गरिन्छ।

### टोकन स्वास्थ्य

> **कुनै REST एन्डपोइन्ट छैन।** टोकन स्वास्थ्यसम्बन्धी डेटा ड्यासबोर्ड वा MCP उपकरण `observability_snapshot` मार्फत उपलब्ध हुन्छ।

---

## अलर्टिङ

### अन्तर्निर्मित च्यानलहरू

OmniRoute ले **3 वटा अलर्ट च्यानलहरू** समर्थन गर्छ:

| च्यानल            | सेटअप                 | प्रयोगको अवस्था           |
| ----------------- | --------------------- | ------------------------- |
| ड्यासबोर्ड ब्यानर | सधैँ सक्रिय           | एपभित्रका सूचनाहरू        |
| वेबहुक            | URL कन्फिगर गर्नुहोस् | Slack, Discord, PagerDuty |
| लग                | पूर्वनिर्धारित        | बाह्य लग एकत्रीकरणका लागि |

### वेबहुक कन्फिगरेसन

> **नोट:** वेबहुक अलर्टिङ कन्फिगरेसन ड्यासबोर्डको सेटिङ्स पृष्ठमार्फत व्यवस्थापन गरिन्छ। वेबहुक URL, इभेन्ट फिल्टरिङ, र पेलोड अनुकूलनका लागि सेटिङ्स UI हेर्नुहोस्।

### अलर्टका प्रकारहरू

| अलर्ट                        | कहिले                                      | पूर्वनिर्धारित गम्भीरता |
| ---------------------------- | ------------------------------------------ | ----------------------- |
| `provider_circuit_open`      | सर्किट खुल्दा                              | गम्भीर                  |
| `provider_circuit_half_open` | सर्किटले रिकभरी परीक्षण गर्दा              | जानकारी                 |
| `quota_warning`              | कोटा 80%+ हुँदा                            | चेतावनी                 |
| `quota_exhausted`            | कोटा 100% हुँदा                            | गम्भीर                  |
| `token_refresh_failed`       | लगातार 3+ रिफ्रेस विफलताहरू हुँदा          | चेतावनी                 |
| `token_expired`              | टोकनको म्याद सकिएपछि                       | गम्भीर                  |
| `combo_target_unhealthy`     | कम्बो लक्ष्य 1 घण्टा+ सम्म कुलडाउनमा हुँदा | चेतावनी                 |
| `db_integrity_warning`       | FK उल्लङ्घनहरू > 0 हुँदा                   | चेतावनी                 |
| `heap_pressure`              | हिप प्रयोग थ्रेसहोल्डको > 80% हुँदा        | चेतावनी                 |

---

## कार्यसम्पादन मेट्रिक्स

### ट्र्याक गरिएका मेट्रिक्स

| मेट्रिक                 | प्रकार      | स्रोत                           |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | काउन्टर     | `services/usage.ts`             |
| `request_latency_ms`    | हिस्टोग्राम | `services/usage.ts`             |
| `tokens_consumed`       | काउन्टर     | `services/usage.ts`             |
| `cost_usd`              | काउन्टर     | `services/usage.ts`             |
| `provider_errors`       | काउन्टर     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | काउन्टर     | `services/resilience.ts`        |
| `cache_hits`            | काउन्टर     | `services/signatureCache.ts`    |
| `compression_savings`   | हिस्टोग्राम | `services/compression/stats.ts` |
| `quota_used`            | गेज         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | गेज         | `observability.ts`              |

### विलम्बता प्रतिशतकहरू (p50/p95/p99)

> **REST endpoint छैन।** विलम्बता प्रतिशतक डेटा ड्यासबोर्डको `/dashboard/health` पृष्ठमार्फत उपलब्ध छ। Prometheus/OpenTelemetry निर्यात v3.9 का लागि योजनाबद्ध छ।

### Prometheus / OpenTelemetry निर्यात (चरण 2)

v3.9 का लागि योजनाबद्ध: Prometheus, OpenTelemetry र Datadog मा नेटिभ निर्यात।

अहिलेलाई, कुनै पनि HTTP-आधारित निगरानी प्रणाली (Prometheus blackbox exporter, Datadog HTTP check आदि) प्रयोग गरी `/api/monitoring/health` स्क्र्याप गर्नुहोस्।

---

## अलर्टिङ विधिहरू

### Slack

> **नोट:** Webhook अलर्टिङ ड्यासबोर्डको Settings पृष्ठमार्फत कन्फिगर गरिन्छ — यसका लागि छुट्टै webhook env vars छैनन् (`grep -rn` ले शून्य नतिजा फर्काउँछ)। Webhook URL, घटना फिल्टरिङ र payload अनुकूलनका लागि Settings UI हेर्नुहोस्।

### Discord

> Webhook अलर्टिङले Slack कै Settings UI प्रक्रिया प्रयोग गर्छ। Discord ले उही JSON payload ढाँचा स्वीकार गर्छ।

### PagerDuty

> Webhook अलर्टिङले उही Settings UI प्रक्रिया प्रयोग गर्छ। PagerDuty Events API v2 routing keys Settings UI मा कन्फिगर गरिन्छन्।

### अनुकूलित Webhook (JSON)

> JSON body सहित POST स्वीकार गर्ने कुनै पनि HTTP endpoint ले काम गर्छ। URL लाई Settings UI मा कन्फिगर गर्नुहोस्।

---

## ड्यासबोर्ड कन्फिगरेसन

### स्वास्थ्य ड्यासबोर्ड अनुकूलित गर्नुहोस्

एउटा `~/.omniroute/dashboard.json` सिर्जना गर्नुहोस्:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### प्रदायकलाई शीर्षमा पिन गर्नुहोस्

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## समस्या निवारण

### "प्रदायकले स्वस्थ भएको बताउँछ तर अनुरोधहरू असफल हुन्छन्"

1. **autopilot समस्याहरू** जाँच गर्नुहोस् — कुनै मोडेल लक आउट भएको हुन सक्छ
2. निश्चित त्रुटि वर्गका लागि **हालैका त्रुटिहरू** हेर्नुहोस्
3. प्रदायक कार्डमा रहेको **जडान परीक्षण** प्रयास गर्नुहोस्
4. प्रदायक **upstream मा rate-limited** छ कि छैन जाँच गर्नुहोस् (स्थानीय रूपमा देखिँदैन)

### "कोटाले स्वस्थ भएको बताउँछ तर मैले 429s देख्छु"

- 429 को अर्थ प्रदायकका अनुसार तपाईंले आफ्नो कोटा प्रयोग गरिसक्नुभएको छ
- OmniRoute को कोटा ट्र्याकिङ **पुरानो** हुन सक्छ — प्रदायकको वास्तविक स्थिति upstream मा हुन्छ
- आन्तरिक कोटा मोनिटरमार्फत कोटा डेटा स्वतः ताजा हुन्छ

### "सबै लक्ष्यहरू स्वस्थ देखिए पनि Combo असफल भइरहेको छ"

- लक्ष्य क्रमसम्बन्धी समस्याहरूका लागि **combo health** ड्यासबोर्ड जाँच गर्नुहोस्
- **fallback घटनाहरू** हेर्नुहोस् — combo धेरै छिटो सकिँदै गएको हुन सक्छ
- **strategy** तपाईंको प्रयोग अवस्थासँग मेल खान्छ भनी पुष्टि गर्नुहोस् (priority vs round-robin vs auto)

### "डेटाबेस स्वास्थ्य जाँच असफल भइरहेको छ"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` चलाउनुहोस्
- यदि "ok" आएमा — यो गलत चेतावनी हो, स्वास्थ्य जाँच अत्यधिक कडा भइरहेको छ
- अरू केही आएमा — **OmniRoute रोक्नुहोस्** र [विपद् पुनःप्राप्ति गाइड](./DATABASE_GUIDE.md#disaster-recovery) पालना गर्नुहोस्

### "मेमोरी heap दबाब गम्भीर छ"

```bash
# हालको heap जाँच गर्नुहोस्
node -e "console.log(process.memoryUsage())"

# म्यानुअल GC ट्रिगर गर्नुहोस् (यदि --expose-gc छ भने)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# समवर्ती अनुरोधहरू घटाउनुहोस् (env var बाट होइन, ड्यासबोर्डको Settings पृष्ठमार्फत सेट गर्नुहोस्)
# `MAX_CONCURRENT_REQUESTS` env var छैन — यसलाई Settings → Concurrency मा कन्फिगर गर्नुहोस्।
```

---

## यो पनि हेर्नुहोस्

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — प्रयोग र लागत ट्र्याकिङ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB स्किमा + स्वास्थ्य
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — प्रोक्सी स्वास्थ्य (छुट्टै क्यास)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — प्रणाली वास्तुकला
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकरका विवरणहरू
- स्रोत: `src/lib/monitoring/` (4 फाइलहरू, 2121 LOC)
