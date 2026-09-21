# Quota Sharing Engine (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **कागजात सन्दर्भ**: `docs/routing/QUOTA_SHARE.md`
> समूह B (योजनाहरू 16 + 22) को अंश।

---

## अवलोकन

कोटा साझेदारी इन्जिनले प्रदायकको समय-आधारित कोटा (जस्तै Codex को
5-घण्टे विन्डो, Kimi को 1500 req/h) एउटै जडान साझा गर्ने धेरै API कुञ्जीहरूबीच
निष्पक्ष रूपमा वितरण गर्छ।

**यसले समाधान गर्ने समस्या:** OmniRoute ले एउटै अपस्ट्रिम प्रदायक खातामार्फत
धेरै API कुञ्जीहरू प्रोक्सी गर्छ। साझेदारी तर्कबिना, कुञ्जी A बाट आएको अनुरोधको
अचानक वृद्धिले एक घण्टाका लागि प्रदायकको कोटा समाप्त गर्न सक्छ, जसले विन्डो
रिसेट नभएसम्म कुञ्जी B र C लाई अवरुद्ध राख्छ। इन्जिनले यसलाई निम्न तरिकाले रोक्छ:

1. प्रत्येक आयाम (%, अनुरोध, टोकन, $) अनुसार हरेक कुञ्जीको रोलिङ खपत ट्र्याक गरेर।
2. कार्य-संरक्षण गर्ने निष्पक्ष-साझेदारी एल्गोरिदम लागू गरेर: ग्लोबल पूल स्याचुरेट
   नभएसम्म कुनै कुञ्जीले निष्क्रिय हिस्साबाट सापटी लिन सक्छ।
3. अनुरोध अपस्ट्रिम एक्जिक्युटरसम्म पुग्नुअघि हट पाथ (`chatCore.ts`) मा परिणाम
   लागू गरेर।

---

## एल्गोरिदम: कार्य-संरक्षण गर्ने निष्पक्ष-साझेदारी

`src/lib/quota/fairShare.ts` मा कार्यान्वयन गरिएको छ।

### मोडहरू

| सर्त                                       | मोड      | व्यवहार                                                    |
| ------------------------------------------ | -------- | ---------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **उदार** | कुञ्जीले ग्लोबल सीमाबाट कुल खपत घटाउँदासम्म सापटी लिन सक्छ |
| `globalUsedPercent >= saturationThreshold` | **कडा**  | व्यक्तिगत निष्पक्ष हिस्सा कडाइका साथ लागू गर्ने            |

पूर्वनिर्धारित `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`)।

### प्रति-आयाम निर्णय

पूलको प्रत्येक सक्रिय आयामका लागि, इन्जिनले निम्न गणना गर्छ:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = यस कुञ्जीको हालको रोलिङ मान (QuotaStore.peek बाट)
remaining       = fairShareAllowed - consumed
```

त्यसपछि:

- **`policy = hard`**: यदि `consumed > fairShareAllowed` छ र मोड कडा छ भने → **अवरुद्ध गर्ने**।
- **`policy = soft`**: यदि `consumed > fairShareAllowed` छ र मोड कडा छ भने → **दण्डित गर्ने** (कम्बोमा प्राथमिकता घटाउने; कहिल्यै पूर्ण रूपमा अवरुद्ध नगर्ने)।
- **`policy = burst`**: निष्पक्ष हिस्साको वास्ता नगरी ग्लोबल हेडरुम उपलब्ध हुँदासम्म अनुमति दिने।

### पूर्ण सीमा

कुनै विनियोजनमा रहेको `capValue` + `capUnit`, मोड वा नीतिबाट स्वतन्त्र कडा अधिकतम
सीमा हो। `consumed >= capValue` भएको कुनै पनि आयामले अनुरोधलाई सधैँ **अवरुद्ध गर्छ**।

### बहु-आयाम जाँच

पूलको **कुनै पनि** आयामले अनुरोध अवरुद्ध गर्ने भएमा अनुरोध अवरुद्ध हुन्छ। आयामहरू
स्वतन्त्र हुन्छन् — 5h% समाप्त हुँदा weekly% आयाममा असर पर्दैन।

### सापटी

उदार मोडमा, आफ्नो विनियोजनभन्दा कम खपत गरेको कुञ्जीले अन्य कुञ्जीका विनियोजन
नगरिएका हिस्साबाट बचत प्रयोग गर्न सक्छ। सूत्र यस्तो छ:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

जहाँ `consumedByOtherKeys = consumedTotal - consumedByThisKey` हुन्छ। ग्लोबल अधिकतम
सीमा (त्यस आयामका लागि पूलको `limit`) सधैँ कडा सीमा हुन्छ।

---

## स्लाइडिङ विन्डो काउन्टर

`src/lib/quota/sqliteQuotaStore.ts` र `redisQuotaStore.ts` मा कार्यान्वयन गरिएको छ।

प्रत्येक `(apiKeyId, dimensionKey)` का लागि दुई बकेटहरू:

- `curr`: हालको बकेट (`floor(nowMs / windowMs)`)
- `prev`: अघिल्लो बकेट (`curr - 1`)

प्रभावकारी रोलिङ मान:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**शुद्धता**: ~99% शुद्ध। बकेटहरूबीचको सीमामा त्रुटि बढीमा विन्डो आकारको 1%
हुन्छ (यो 2-बकेट अनुमानमा अन्तर्निहित हुन्छ)।

### समवर्तीता

SQLite ड्राइभर: प्रत्येक `(apiKeyId | dimensionKey)` कुञ्जीका लागि इन-मेमोरी
म्युटेक्सले रिड-मोडिफाइ-राइट रेस रोक्छ। यसको ढाँचाले
`src/sse/services/auth.ts` को एन्टी-थन्डरिङ-हर्ड ढाँचा अनुसरण गर्छ।

Redis ड्राइभर: एटोमिक इन्क्रिमेन्टका लागि Lua EVAL स्क्रिप्ट — यो एकल Redis
कमाण्डका रूपमा चल्छ।

---

## ड्राइभरहरू

### SQLite (पूर्वनिर्धारित, 0-install)

- तालिका: `quota_consumption` (माइग्रेसन `073_quota_pools.sql` / `074_quota_consumption.sql` हेर्नुहोस्)।
- एकल-इन्स्ट्यान्स डिप्लोयमेन्टका लागि सबैभन्दा उपयुक्त।
- सबै स्थायी डेटा अवस्थित OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`) मा रहन्छ।

### Redis (वैकल्पिक, बहु-इन्स्ट्यान्स)

- `ioredis` npm प्याकेज आवश्यक पर्छ।
- काउन्टरहरू Redis मा भण्डारण हुन्छन्; मेटाडेटा (पुलहरू/आवंटनहरू) भने अझै SQLite मै रहन्छ।
- काउन्टरहरू साझा गर्नुपर्ने बहु-रेप्लिका डिप्लोयमेन्टका लागि सबैभन्दा उपयुक्त।

### ड्राइभरहरू परिवर्तन गर्ने

सेटिङ्स UI (`/dashboard/settings` → Quota Store) मार्फत, वा env vars मार्फत:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB सेटिङले env भन्दा प्राथमिकता पाउँछ। यदि `driver=redis` छ तर URL उपलब्ध छैन वा
`ioredis` स्थापना गरिएको छैन भने, फ्याक्ट्री SQLite मा फर्कन्छ र चेतावनी लग गर्छ।

ड्राइभर चयन क्रम:

1. DB सेटिङ `quotaStore.driver`
2. Env `QUOTA_STORE_DRIVER`
3. पूर्वनिर्धारित: `sqlite`

---

## बहु-आयाम

एउटा पुलमा धेरै आयामहरू हुन सक्छन्। प्रत्येक आयाम स्वतन्त्र हुन्छ:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // यस आयामका लागि ग्लोबल पुल सीमा
}
```

**उदाहरण: Codex योजना** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

अनुमति पाउन अनुरोधले सबै आयामहरू पूरा गर्नुपर्छ।

---

## योजना रिजल्भर

`src/lib/quota/planResolver.ts` मा कार्यान्वयन गरिएको छ।

प्राथमिकता (उच्चतमदेखि न्यूनतमसम्म):

1. **म्यानुअल DB ओभरराइड** — `provider_plans` तालिका, प्रत्येक `connectionId` का लागि।
2. **ज्ञात क्याटलग** — `src/lib/quota/planRegistry.ts` (डेटा-मात्र)।
3. **खाली योजना** — कुनै आयाम छैन, म्यानुअल कन्फिगरेसन आवश्यक।

### ज्ञात क्याटलग

| प्रदायक               | आयामहरू                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, अज्ञात), `tokens/weekly`                |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | कुनै पूर्वनिर्धारित छैन — म्यानुअल कन्फिगरेसन आवश्यक          |

---

## पाइपलाइन एकीकरण

### PRE हुक (`open-sse/handlers/chatCore.ts`)

प्रमाणीकरण र नीति जाँचपछि, अपस्ट्रिम एक्जिक्युटरअघि चल्छ:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → प्रत्येक आयामका लागि getQuotaStore().peek()
      → fairShare.decideFairShare()
      → यदि ब्लक भयो भने → 429 फर्काउनुहोस् (buildErrorBody, Hard Rule #12)
      → यदि अनुमति + डिप्रायोरिटाइज भयो भने → क्यान्डिडेटमा quotaSoftPenalty=true सेट गर्नुहोस्
  → executor.execute()
```

**Fail-open**: यदि `enforceQuotaShare` ले त्रुटि फ्याँक्छ भने, अनुरोधलाई
`pino.warn` लगसहित अगाडि बढ्न दिइन्छ। यसले कोटा-इन्जिनको बगका कारण सबै
ट्राफिक अवरुद्ध हुनबाट रोक्छ।

### POST हुक (खपत रेकर्ड गर्नुहोस्)

सफल प्रतिक्रिया प्राप्त भएपछि:

```
एक्जिक्युटरले सफलता फर्काउँछ
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → प्रत्येक आयामका लागि getQuotaStore().consume()
      → fail-open: त्रुटिहरू pino.warn का रूपमा लग हुन्छन्, क्लाइन्टसम्म कहिल्यै प्रसारित हुँदैनन्
```

**ड्रिफ्टसम्बन्धी टिप्पणी**: यदि प्रतिक्रियापछि `consume` असफल भयो भने, रोलिङ काउन्टरले
कम गणना गर्छ। प्रदायकबाट आउने स्याचुरेसन सङ्केत (जस्तै `anthropic-ratelimit-unified-5h-utilization`)
ले अर्को अनुरोधमा ग्लोबल अनुमान सच्याउँछ।

### कम्बो सफ्ट पेनाल्टी (`open-sse/services/combo.ts`)

जब `decision.deprioritize === true` हुन्छ:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // पूर्वनिर्धारित 0.7
}
```

पेनाल्टी अन्य सबै स्कोरिङ कारकहरूपछि लागू गरिन्छ। यसले पूर्ण रूपमा अवरुद्ध नगरी
स्याचुरेटेड की चयन गर्ने अटो-कम्बो सम्भावना घटाउँछ।

---

## UI मार्गदर्शन

### `/dashboard/costs/quota-share` — मुख्य पूल पृष्ठ

कम्पोनेन्टहरू (सबै `src/app/(dashboard)/dashboard/costs/quota-share/` मा):

| कम्पोनेन्ट             | उद्देश्य                                                                     |
| ---------------------- | ---------------------------------------------------------------------------- |
| `QuotaConceptCard`     | नयाँ प्रयोगकर्ताहरूलाई कोटा साझेदारीबारे व्याख्या गर्ने परिचयात्मक कार्ड     |
| `CreatePoolModal`      | नयाँ कोटा पूल सिर्जना गर्ने (कनेक्सन + नाम + प्रारम्भिक बाँडफाँटहरू)         |
| `PoolCard`             | प्रत्येक पूलको सारांश: नाम, कनेक्सन, बाँडफाँट सङ्ख्या                        |
| `DimensionBar`         | प्रत्येक डाइमेन्सनको स्ट्याक गरिएको बार: हरेक कुञ्जीको हिस्सा + समग्र प्रयोग |
| `AllocationTable`      | खपत, उचित हिस्सा, घाटा/बचत र उधारो फ्ल्यागसहितको तालिका                      |
| `BurnRateChart`        | EMA खपत-दर लाइन चार्ट (`dynamic()` मार्फत लेजी Recharts)                     |
| `EditAllocationsModal` | पूलका लागि बाँडफाँट भार, सीमा र नीतिहरू सम्पादन गर्ने                        |

पृष्ठका हुकहरू:

- `usePools` — प्रत्येक 30s मा `GET /api/quota/pools` प्राप्त गर्छ।
- `usePoolUsage` — आवश्यकताअनुसार `GET /api/quota/pools/[id]/usage` प्राप्त गर्छ।
- `useLocalStoragePoolMigration` — पुरानो LS डेटा माइग्रेट गर्न माउन्ट हुँदा एक पटक चल्छ।

### `/dashboard/costs/quota-share/plans` — प्रदायक योजना कन्फिगरेसन

- `ProviderPlanConfigClient.tsx`: प्रदायक चयन गर्ने, निर्धारित योजना
  (क्याटलगबाट स्वचालित वा म्यानुअल ओभरराइड) हेर्ने र डाइमेन्सनहरू सम्पादन गर्ने ड्रपडाउन।
- परिवर्तनहरू `PUT /api/quota/plans/[connectionId]` मा लेखिन्छन्।
- मेटाउँदा क्याटलग वा खाली योजनामा फर्किन्छ।

---

## वातावरणीय भेरिएबलहरू

| भेरिएबल                            | पूर्वनिर्धारित | विवरण                                                       |
| ---------------------------------- | -------------- | ----------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`       | प्रयोग गरिने ड्राइभर: `sqlite` वा `redis`                   |
| `QUOTA_STORE_REDIS_URL`            | _(खाली)_       | Redis URL, जस्तै `redis://localhost:6379`                   |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`          | 0..1; `>= threshold` हुँदा कडा मोड सक्रिय हुन्छ             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`          | 0..1; सफ्ट-पोलिसी कम्बो स्कोरका लागि गुणक                   |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`           | GC ले पुराना `quota_consumption` बकेटहरू हटाउनुअघिका दिनहरू |

DB सेटिङहरूले (`quotaStore.*`) वातावरणीय भेरिएबलहरूलाई ओभरराइड गर्छन्।

---

## समस्या समाधान

### Redis कन्फिगर गरिएको छ तर कनेक्ट भइरहेको छैन

`ioredis` इन्स्टल भएको (`npm ls ioredis`) र `QUOTA_STORE_REDIS_URL`
पहुँचयोग्य भएको जाँच गर्नुहोस्। कनेक्सन विफल हुँदा फ्याक्ट्री SQLite मा फर्किन्छ
(`warn` मा लग गरिन्छ)।

### `peek` ले पुरानो परिणाम दिन्छ / फेल-ओपन हुन्छ

यदि `peek` ले त्रुटि फ्याँक्छ भने, `enforceQuotaShare` ले परिणामलाई "अनुमति दिनुहोस्"
(फेल-ओपन) का रूपमा लिन्छ। मूल कारण पहिचान गर्न `quota:enforce` र
`quota:factory` प्रविष्टिहरूका लागि `pino` लगहरू जाँच गर्नुहोस्।

### खपत काउन्टरमा विचलन

यदि वास्तविक प्रदायक प्रयोग काउन्टरहरूभन्दा फरक छ भने, यो अपेक्षित हो —
२-बकेट स्लाइडिङ विन्डोमा विन्डो सीमाहरूमा ~1% त्रुटि हुन्छ र `consume`
रेस्पोन्सपछि फायर-एन्ड-फर्गेट रूपमा चल्छ। स्याचुरेसन सङ्केत (`saturationSignals.ts`)
ले 30s TTL सहित प्रदायकको वास्तविक उपयोग पढ्छ र सोहीअनुसार `globalUsedPercent`
समायोजन गर्छ।

### पूलले खपत दरका लागि "डेटा छैन" देखाउँछ

`computeBurnRate` लाई कम्तीमा २ वटा ऐतिहासिक नमुना आवश्यक पर्छ। अघिल्ला
`consume` कलहरू नभएका नयाँ पूलहरूले `tokensPerSecond: 0` र `timeToExhaustionMs: null` देखाउनेछन्।

---

## localStorage बाट माइग्रेसन

`/dashboard/costs/quota-share` पहिलो पटक लोड हुँदा, हुक `useLocalStoragePoolMigration`
ले निम्न कुराहरू जाँच गर्छ:

1. `localStorage.getItem("omniroute:quota-share:pools")` खाली छैन।
2. `GET /api/quota/pools` ले `[]` फर्काउँछ (DB खाली छ)।

दुवै सत्य भएमा, यसले प्रत्येक पुरानो पूललाई ब्याचमा `POST /api/quota/pools` मा पोस्ट गर्छ,
त्यसपछि localStorage कुञ्जी हटाउँछ। माइग्रेसन आइडेम्पोटेन्ट छ: सर्त 2 ले
पुनः माइग्रेसन हुनबाट रोक्छ।

---

## आन्तरिक रणनीति वर्गीकरण

`quota-share` एउटा **आन्तरिक-प्रयोगका लागि मात्र** राउटिङ रणनीति हो (`src/shared/constants/routingStrategies.ts`
मा `INTERNAL_ROUTING_STRATEGY_VALUES`)। यो प्रणालीद्वारा सिर्जना गरिएका `qtSd/` पूल कम्बोहरूमा
विशेष रूपमा प्रयोग हुन्छ र जानाजानी `ROUTING_STRATEGY_VALUES` बाट हटाइएको छ, ताकि यो UI वा API मा
प्रयोगकर्ताले चयन गर्न मिल्ने विकल्पका रूपमा कहिल्यै नदेखियोस्।

---

## परीक्षण कभरेज

quota-share इन्जिनसँग स्वचालित कभरेजका दुई तहहरू उपलब्ध छन्:

| सुइट                    | कमाण्ड                                                                 | यसले समेट्ने क्षेत्रहरू                                                                                                                                                                                           |
| :---------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| युनिट (29 परीक्षण)      | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR शेड्युलर, स्याचुरेसन गेटिङ, कन्करेन्सी सीमा, fairShare गणित, ब्याकलग क्यूइङ                                                                                                                                   |
| इन्टिग्रेसन म्याट्रिक्स | `npm run test:combo:matrix`                                            | वास्तविक कम्बो पाइपलाइनमार्फत सुरुदेखि अन्त्यसम्मको राउटिङ निर्णय; लाइभ सिमहरू (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) मार्फत DRR निष्पक्षता + स्याचुरेसन डिप्रायोरिटाइजेसन |

इन्टिग्रेसन म्याट्रिक्स सबै 19 सार्वजनिक रणनीतिहरूसँगै CI मा चल्छ। युनिट सुइटलाई
छुट्टै चलाउन सकिन्छ।

---

## DB स्किमा सारांश

माइग्रेसन `078`, `079` र `085` द्वारा थपिएका तीनवटा तालिका:

- `quota_pools` + `quota_allocations` — पूल परिभाषाहरू र प्रत्येक कुञ्जीका लागि छुट्याइएका परिमाणहरू।
- `quota_consumption` — प्रत्येक `(apiKeyId, dimensionKey)` का लागि रोलिङ 2-बकेट काउन्टरहरू।
- `provider_plans` — म्यानुअल प्रदायक योजना ओभरराइडहरू (प्रत्येक connectionId का लागि dimensions JSON)।

सबै तालिकाहरू आइडेम्पोटेन्ट `CREATE TABLE IF NOT EXISTS` माइग्रेसनहरूद्वारा थपिएका छन्।
