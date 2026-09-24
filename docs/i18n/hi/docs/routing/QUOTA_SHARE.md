# Quota Sharing Engine (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **दस्तावेज़ संदर्भ**: `docs/routing/QUOTA_SHARE.md`
> Group B (योजनाएँ 16 + 22) का भाग।

---

## अवलोकन

Quota Sharing Engine किसी प्रदाता के समय-आधारित कोटा (जैसे Codex की
5-घंटे की विंडो, Kimi की 1500 req/h सीमा) को समान कनेक्शन साझा करने वाली
कई API कुंजियों के बीच निष्पक्ष रूप से वितरित करता है।

**इससे हल होने वाली समस्या:** OmniRoute एक ही अपस्ट्रीम प्रदाता खाते के लिए कई API
कुंजियों को प्रॉक्सी करता है। साझाकरण तर्क के बिना, कुंजी A से अनुरोधों का अचानक उछाल
उस घंटे के लिए प्रदाता कोटा समाप्त कर सकता है, जिससे विंडो रीसेट होने तक कुंजियाँ B और C
अवरुद्ध रह जाती हैं। इंजन इसे निम्न प्रकार रोकता है:

1. प्रत्येक आयाम (%, अनुरोध, टोकन, $) के अनुसार हर कुंजी की रोलिंग खपत को ट्रैक करके।
2. कार्य-संरक्षणकारी निष्पक्ष-साझेदारी एल्गोरिथ्म लागू करके: जब तक वैश्विक पूल संतृप्त नहीं होता,
   कोई कुंजी निष्क्रिय हिस्सों से उधार ले सकती है।
3. अनुरोध के अपस्ट्रीम एक्ज़ीक्यूटर तक पहुँचने से पहले हॉट पाथ (`chatCore.ts`) में
   परिणाम को लागू करके।

---

## एल्गोरिथ्म: निष्पक्ष-साझेदारी कार्य-संरक्षणकारी

`src/lib/quota/fairShare.ts` में कार्यान्वित।

### मोड

| शर्त                                       | मोड      | व्यवहार                                                             |
| ------------------------------------------ | -------- | ------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **उदार** | कुंजी वैश्विक सीमा में से कुल खपत घटाकर बची सीमा तक उधार ले सकती है |
| `globalUsedPercent >= saturationThreshold` | **सख्त** | व्यक्तिगत निष्पक्ष हिस्सा सख्ती से लागू करें                        |

डिफ़ॉल्ट `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`)।

### प्रति-आयाम निर्णय

पूल में प्रत्येक सक्रिय आयाम के लिए इंजन यह गणना करता है:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = इस कुंजी के लिए वर्तमान रोलिंग मान (QuotaStore.peek से)
remaining       = fairShareAllowed - consumed
```

फिर:

- **`policy = hard`**: यदि `consumed > fairShareAllowed` है और मोड सख्त है → **अवरुद्ध करें**।
- **`policy = soft`**: यदि `consumed > fairShareAllowed` है और मोड सख्त है → **दंडित करें** (कॉम्बो में प्राथमिकता घटाएँ; कभी भी पूर्णतः अवरुद्ध न करें)।
- **`policy = burst`**: निष्पक्ष हिस्से की परवाह किए बिना, वैश्विक क्षमता उपलब्ध रहने तक अनुमति दें।

### पूर्ण सीमा

किसी आवंटन पर `capValue` + `capUnit`, मोड या नीति से स्वतंत्र एक अपरिवर्तनीय अधिकतम सीमा है।
जिस भी आयाम में `consumed >= capValue` हो, वह अनुरोध को हमेशा **अवरुद्ध** करता है।

### बहु-आयाम जाँच

यदि पूल का **कोई भी** आयाम अनुरोध को अवरुद्ध करेगा, तो अनुरोध अवरुद्ध कर दिया जाता है। आयाम
स्वतंत्र होते हैं — 5h% समाप्त होने से weekly% आयाम प्रभावित नहीं होता।

### उधार लेना

उदार मोड में, जिस कुंजी के आवंटन की खपत कम हुई हो, वह अन्य कुंजियों के अनावंटित हिस्सों
का अधिशेष उपयोग कर सकती है। सूत्र है:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

जहाँ `consumedByOtherKeys = consumedTotal - consumedByThisKey`। वैश्विक अधिकतम सीमा
(उस आयाम के लिए पूल `limit`) हमेशा अपरिवर्तनीय सीमा होती है।

---

## स्लाइडिंग विंडो काउंटर

`src/lib/quota/sqliteQuotaStore.ts` और `redisQuotaStore.ts` में कार्यान्वित।

प्रत्येक `(apiKeyId, dimensionKey)` के लिए दो बकेट:

- `curr`: वर्तमान बकेट (`floor(nowMs / windowMs)`)
- `prev`: पिछला बकेट (`curr - 1`)

प्रभावी रोलिंग मान:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**परिशुद्धता**: लगभग 99% सटीक। बकेटों की सीमा पर त्रुटि विंडो आकार की अधिकतम 1% होती है
(यह 2-बकेट सन्निकटन में अंतर्निहित है)।

### समवर्तीता

SQLite ड्राइवर: प्रत्येक `(apiKeyId | dimensionKey)` कुंजी के लिए इन-मेमोरी म्यूटेक्स
रीड-मॉडिफ़ाई-राइट रेस को रोकता है। पैटर्न `src/sse/services/auth.ts` के
एंटी-थंडरिंग-हर्ड जैसा है।

Redis ड्राइवर: एटॉमिक इंक्रीमेंट के लिए Lua EVAL स्क्रिप्ट — यह एकल Redis कमांड के रूप में चलती है।

---

## ड्राइवर

### SQLite (डिफ़ॉल्ट, 0-इंस्टॉल)

- तालिका: `quota_consumption` (माइग्रेशन `073_quota_pools.sql` / `074_quota_consumption.sql` देखें)।
- एकल-इंस्टेंस डिप्लॉयमेंट के लिए सर्वोत्तम।
- समस्त स्थायी डेटा मौजूदा OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`) में होता है।

### Redis (वैकल्पिक, मल्टी-इंस्टेंस)

- `ioredis` npm पैकेज आवश्यक है।
- काउंटर Redis में संग्रहीत होते हैं; मेटाडेटा (पूल/आवंटन) अब भी SQLite में रहता है।
- मल्टी-रेप्लिका डिप्लॉयमेंट के लिए सर्वोत्तम, जहाँ काउंटर साझा किए जाने चाहिए।

### ड्राइवर बदलना

सेटिंग्स UI (`/dashboard/settings` → Quota Store) के माध्यम से, या env vars के माध्यम से:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB सेटिंग को env पर प्राथमिकता मिलती है। यदि `driver=redis` है, लेकिन URL अनुपस्थित है या
`ioredis` इंस्टॉल नहीं है, तो फ़ैक्टरी SQLite पर वापस चली जाती है और चेतावनी लॉग करती है।

ड्राइवर चयन क्रम:

1. DB सेटिंग `quotaStore.driver`
2. Env `QUOTA_STORE_DRIVER`
3. डिफ़ॉल्ट: `sqlite`

---

## बहु-आयाम

एक पूल में अनेक आयाम हो सकते हैं। प्रत्येक आयाम स्वतंत्र होता है:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // इस आयाम के लिए वैश्विक पूल की अधिकतम सीमा
}
```

**उदाहरण: Codex प्लान** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

अनुमति प्राप्त करने के लिए अनुरोध को सभी आयामों की शर्तें पूरी करनी होंगी।

---

## प्लान रिज़ॉल्वर

`src/lib/quota/planResolver.ts` में कार्यान्वित।

प्राथमिकता (उच्चतम से निम्नतम):

1. **मैन्युअल DB ओवरराइड** — `provider_plans` तालिका, प्रत्येक `connectionId` के लिए।
2. **ज्ञात कैटलॉग** — `src/lib/quota/planRegistry.ts` (केवल डेटा)।
3. **रिक्त प्लान** — कोई आयाम नहीं, मैन्युअल कॉन्फ़िगरेशन आवश्यक है।

### ज्ञात कैटलॉग

| प्रदाता               | आयाम                                                          |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, अज्ञात), `tokens/weekly`                |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | कोई डिफ़ॉल्ट नहीं — मैन्युअल कॉन्फ़िगरेशन आवश्यक है           |

---

## पाइपलाइन एकीकरण

### PRE हुक (`open-sse/handlers/chatCore.ts`)

प्रमाणीकरण और नीति जाँच के बाद, अपस्ट्रीम एक्ज़ीक्यूटर से पहले चलता है:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → प्रत्येक आयाम के लिए getQuotaStore().peek()
      → fairShare.decideFairShare()
      → यदि ब्लॉक हो → 429 लौटाएँ (buildErrorBody, हार्ड नियम #12)
      → यदि अनुमति हो + प्राथमिकता घटानी हो → कैंडिडेट पर quotaSoftPenalty=true सेट करें
  → executor.execute()
```

**फ़ेल-ओपन**: यदि `enforceQuotaShare` त्रुटि देता है, तो अनुरोध को
`pino.warn` लॉग के साथ आगे जाने दिया जाता है। यह कोटा-इंजन की किसी त्रुटि को समस्त
ट्रैफ़िक अवरुद्ध करने से रोकता है।

### POST हुक (खपत दर्ज करना)

सफल प्रतिक्रिया के बाद:

```
एक्ज़ीक्यूटर सफलता लौटाता है
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → प्रत्येक आयाम के लिए getQuotaStore().consume()
      → फ़ेल-ओपन: त्रुटियाँ pino.warn के रूप में लॉग होती हैं, क्लाइंट तक कभी नहीं पहुँचतीं
```

**ड्रिफ़्ट नोट**: यदि प्रतिक्रिया के बाद `consume` विफल हो जाता है, तो रोलिंग काउंटर वास्तविक गणना से कम दर्ज करता है।
प्रदाता से मिलने वाला संतृप्ति संकेत (उदा. `anthropic-ratelimit-unified-5h-utilization`)
अगले अनुरोध पर वैश्विक अनुमान को सही करता है।

### कॉम्बो सॉफ़्ट पेनल्टी (`open-sse/services/combo.ts`)

जब `decision.deprioritize === true` हो:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // डिफ़ॉल्ट 0.7
}
```

पेनल्टी अन्य सभी स्कोरिंग कारकों के बाद लागू होती है। यह किसी संतृप्त कुंजी को हार्ड-ब्लॉक किए बिना
उसे चुनने की ऑटो-कॉम्बो संभावना को कम करती है।

---

## UI का चरण-दर-चरण विवरण

### `/dashboard/costs/quota-share` — मुख्य पूल पेज

घटक (सभी `src/app/(dashboard)/dashboard/costs/quota-share/` में):

| घटक                    | उद्देश्य                                                         |
| ---------------------- | ---------------------------------------------------------------- |
| `QuotaConceptCard`     | नए उपयोगकर्ताओं को कोटा साझाकरण समझाने वाला परिचयात्मक कार्ड     |
| `CreatePoolModal`      | नया कोटा पूल बनाएँ (कनेक्शन + नाम + प्रारंभिक आवंटन)             |
| `PoolCard`             | प्रत्येक पूल का सारांश: नाम, कनेक्शन, आवंटनों की संख्या          |
| `DimensionBar`         | प्रत्येक आयाम का स्टैक्ड बार: हर कुंजी का हिस्सा + वैश्विक उपयोग |
| `AllocationTable`      | खपत, उचित हिस्सा, कमी/अधिशेष और उधारी फ़्लैग वाली तालिका         |
| `BurnRateChart`        | EMA खपत-दर लाइन चार्ट (`dynamic()` के माध्यम से लेज़ी Recharts)  |
| `EditAllocationsModal` | किसी पूल के लिए आवंटन भार, सीमाएँ और नीतियाँ संपादित करें        |

पेज हुक:

- `usePools` — प्रत्येक 30 सेकंड में `GET /api/quota/pools` से डेटा प्राप्त करता है।
- `usePoolUsage` — माँग पर `GET /api/quota/pools/[id]/usage` से डेटा प्राप्त करता है।
- `useLocalStoragePoolMigration` — पुराने LS डेटा को माइग्रेट करने के लिए माउंट होने पर एक बार चलता है।

### `/dashboard/costs/quota-share/plans` — प्रदाता प्लान कॉन्फ़िगरेशन

- `ProviderPlanConfigClient.tsx`: प्रदाता चुनने, निर्धारित प्लान देखने
  (कैटलॉग से स्वचालित या मैन्युअल ओवरराइड), और आयाम संपादित करने के लिए ड्रॉपडाउन।
- परिवर्तन `PUT /api/quota/plans/[connectionId]` में लिखे जाते हैं।
- हटाने पर कैटलॉग प्लान या खाली प्लान पर वापस चला जाता है।

---

## परिवेश चर

| चर                                 | डिफ़ॉल्ट | विवरण                                                        |
| ---------------------------------- | -------- | ------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite` | उपयोग किया जाने वाला ड्राइवर: `sqlite` या `redis`            |
| `QUOTA_STORE_REDIS_URL`            | _(खाली)_ | Redis URL, उदाहरण: `redis://localhost:6379`                  |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`    | 0..1; `>= threshold` होने पर सख्त मोड सक्रिय होता है         |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`    | 0..1; सॉफ्ट-पॉलिसी संयोजन स्कोर के लिए गुणक                  |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`     | पुराने `quota_consumption` बकेट हटाने से पहले GC की दिन-सीमा |

DB सेटिंग्स (`quotaStore.*`) परिवेश चरों को ओवरराइड करती हैं।

---

## समस्या निवारण

### Redis कॉन्फ़िगर किया गया है, लेकिन कनेक्ट नहीं हो रहा

जाँचें कि `ioredis` इंस्टॉल है (`npm ls ioredis`) और `QUOTA_STORE_REDIS_URL`
तक पहुँचा जा सकता है। कनेक्शन विफल होने पर फ़ैक्टरी SQLite पर वापस चली जाती है
(`warn` स्तर पर लॉग किया जाता है)।

### `peek` पुराना डेटा लौटाता है / विफल होने पर अनुरोध स्वीकार करता है

यदि `peek` त्रुटि देता है, तो `enforceQuotaShare` परिणाम को "अनुमति दें" मानता है
(विफल होने पर अनुरोध स्वीकार करना)। मूल कारण पहचानने के लिए `pino` लॉग में
`quota:enforce` और `quota:factory` प्रविष्टियाँ जाँचें।

### खपत काउंटर में विचलन

यदि प्रदाता का वास्तविक उपयोग काउंटर से अलग है, तो यह अपेक्षित है — 2-बकेट
स्लाइडिंग विंडो में विंडो सीमाओं पर लगभग 1% त्रुटि होती है और `consume`
प्रतिक्रिया के बाद फ़ायर-एंड-फ़ॉरगेट तरीके से चलता है। संतृप्ति संकेत
(`saturationSignals.ts`) 30 सेकंड TTL के साथ प्रदाता का वास्तविक उपयोग पढ़ता
है और उसके अनुसार `globalUsedPercent` समायोजित करता है।

### पूल, खपत दर के लिए "कोई डेटा नहीं" दिखाता है

`computeBurnRate` के लिए कम-से-कम 2 ऐतिहासिक नमूने आवश्यक हैं। बिना किसी पूर्व
`consume` कॉल वाले नए पूल `tokensPerSecond: 0` और `timeToExhaustionMs: null`
दिखाएँगे।

---

## localStorage से माइग्रेशन

जब `/dashboard/costs/quota-share` पहली बार लोड होता है, तो हुक `useLocalStoragePoolMigration`
इनकी जाँच करता है:

1. `localStorage.getItem("omniroute:quota-share:pools")` खाली नहीं है।
2. `GET /api/quota/pools` से `[]` लौटता है (DB खाली है)।

यदि दोनों शर्तें सही हैं, तो यह प्रत्येक पुराने पूल को बैच में `POST /api/quota/pools` पर पोस्ट करता है,
फिर localStorage कुंजी हटा देता है। माइग्रेशन इडेम्पोटेंट है: शर्त 2
दोबारा माइग्रेशन होने से रोकती है।

---

## आंतरिक रणनीति वर्गीकरण

`quota-share` एक **केवल-आंतरिक** रूटिंग रणनीति है (`src/shared/constants/routingStrategies.ts` में
`INTERNAL_ROUTING_STRATEGY_VALUES`)। इसका उपयोग विशेष रूप से सिस्टम द्वारा बनाए गए
`qtSd/` पूल कॉम्बो द्वारा किया जाता है और इसे जानबूझकर `ROUTING_STRATEGY_VALUES` से बाहर रखा गया है, ताकि यह
UI या API में उपयोगकर्ता द्वारा चुने जा सकने वाले विकल्प के रूप में कभी दिखाई न दे।

---

## परीक्षण कवरेज

quota-share इंजन के साथ स्वचालित कवरेज की दो परतें उपलब्ध हैं:

| सुइट                 | कमांड                                                                  | इसमें क्या कवर होता है                                                                                                                                                                                                  |
| :------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| यूनिट (29 परीक्षण)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR शेड्यूलर, सैचुरेशन गेटिंग, समवर्तीता सीमाएँ, fairShare गणित, बैकलॉग क्यूइंग                                                                                                                                         |
| इंटीग्रेशन मैट्रिक्स | `npm run test:combo:matrix`                                            | वास्तविक कॉम्बो पाइपलाइन के माध्यम से शुरू से अंत तक रूटिंग निर्णय; लाइव सीम्स (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) के माध्यम से DRR निष्पक्षता + सैचुरेशन डी-प्रायोरिटाइज़ेशन |

इंटीग्रेशन मैट्रिक्स सभी 19 सार्वजनिक रणनीतियों के साथ CI में चलता है। यूनिट सुइट
को स्वतंत्र रूप से चलाया जा सकता है।

---

## DB स्कीमा सारांश

माइग्रेशन `078`, `079` और `085` द्वारा जोड़ी गई तीन तालिकाएँ:

- `quota_pools` + `quota_allocations` — पूल परिभाषाएँ और प्रति-कुंजी आवंटन।
- `quota_consumption` — प्रत्येक `(apiKeyId, dimensionKey)` के लिए रोलिंग 2-बकेट काउंटर।
- `provider_plans` — मैन्युअल प्रदाता प्लान ओवरराइड (प्रत्येक connectionId के लिए आयाम JSON)।

सभी तालिकाएँ इडेम्पोटेंट `CREATE TABLE IF NOT EXISTS` माइग्रेशन के माध्यम से जोड़ी गई हैं।
