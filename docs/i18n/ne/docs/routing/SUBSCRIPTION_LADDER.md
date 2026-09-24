# Subscription-first routing (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> दुई नयाँ `auto/*` id — `auto/subscription` र `auto/thrifty`। दुवै अनुरोध गरिएपछि मात्र अप्ट-इन हुन्छन्:
> कलरले नामद्वारा id नमागेसम्म कुनै पनि कुरा तिनमार्फत रुट हुँदैन, र कुनै पनि
> विद्यमान पूल, रणनीति वा पूर्वनिर्धारित मान परिवर्तन हुँदैन।

## यो किन अवस्थित छ

OmniRoute ले लागतसम्बन्धी दुई प्रश्नको उत्तर पहिल्यै दिन्छ, तर तीमध्ये कुनै पनि अधिकांश अपरेटरहरूले सोध्ने प्रश्न होइन।

| विद्यमान संयन्त्र                                        | उत्तर दिने प्रश्न                             |
| -------------------------------------------------------- | --------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "के यो मोडेल क्याटलगमा निःशुल्क छ?"           |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "के यो कनेक्सनले मलाई कहिल्यै बिल गर्न सक्छ?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "के यो कनेक्सन आफ्नो सीमाको नजिक छ?"          |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "खर्च सीमित गर, सबैभन्दा सस्तोमा झार"         |

प्रत्येक निःशुल्क-मात्र संयन्त्र **बन्द भएर असफल हुन्छ** — सकिएको निःशुल्क पूल भनेको खाली पूल हो, सशुल्क
विकल्पतर्फ उक्लने चरण कहिल्यै होइन — र प्रत्येक सशुल्क-पक्षीय संयन्त्र टियर-निरपेक्ष हुन्छ। कुनैले पनि यसको उत्तर दिँदैन:

> "मैले पहिल्यै भुक्तानी गर्ने कोटा प्रयोग गर। त्यो सकिएपछि, कि रोक, कि सबैभन्दा सस्ता सशुल्क
> विकल्पहरू हुँदै एक पटकमा एक तह माथि उक्ल — र यो रिसेट हुनेबित्तिकै फर्क।"

## बिलिङ मोडेलको होइन, कनेक्सनको तथ्य हो

`classifyTier()` (`open-sse/services/tierResolver.ts`) ले `(provider, model)` का आधारमा कुञ्जीकरण गर्छ र
क्याटलग मूल्यबाट `free | cheap | premium` फर्काउँछ। तर कुनै अनुरोधले थप पैसा खर्च गराउँछ कि गराउँदैन भन्ने कुरा
**कुन कनेक्सनले त्यसलाई सेवा दिन्छ** भन्नेमा निर्भर हुन्छ: एउटै मोडेल Claude Code
OAuth कनेक्सनमार्फत प्लानमा समावेश हुन्छ र API-key कनेक्सनमार्फत प्रति टोकन बिल गरिन्छ।

`provider_connections.auth_type` कुनै पनि दिशामा सुरक्षित प्रोक्सी होइन — मिटर गरिएका OAuth
कनेक्सनहरू अवस्थित छन्, र प्लानमा समावेश API-key कनेक्सनहरू पनि अवस्थित छन् (Copilot सिट टोकन मिटर गरिएको
API कुञ्जी होइन)। त्यसैले बिलिङ वर्ग **क्युरेट गरिएको क्याटलग**,
`open-sse/config/connectionBillingCatalog.ts`, बाट आउँछ, जसलाई प्रत्येक प्रदायकका प्रकाशित सर्तहरूका आधारमा
हातैले सेट गरिन्छ — निःशुल्क मोडेलहरूका लागि `FreeModelBudget.hardStopGuaranteed` ले पहिल्यै स्थापित गरेको
उही ढाँचा।

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

रिजोल्युसन क्रम (`autoCombo/connectionBilling.ts`): सिन्थेटिक no-auth सेन्टिनेल →
`keyless`; provider **र** `authType` सँग मेल खाने क्याटलग प्रविष्टि; provider-व्यापी प्रविष्टि;
अन्यथा `unknown`। **क्युरेट नगरिएको निःशुल्क हुँदैन** — `unknown` लाई सबैतिर `metered`
का रूपमा प्रयोग गरिन्छ, त्यसैले भोलि थपिएको प्रदायक subscription तहबाहिरबाट सुरु हुन्छ र त्यसलाई
जानाजानी क्युरेट गर्नुपर्छ।

## तह मोडेल

एस्केलेसन क्रममा पाँच तह। तिनीहरू मूल्यमा मात्र फरक छैनन् — प्रत्येकसँग आफ्नो **छुट्टै**
समाप्ति सङ्केत हुन्छ, त्यसैले यो केवल क्रमबद्ध गर्ने कार्य होइन।

| #   | तह             | सदस्यता                                             | समाप्त हुने अवस्था                 |
| --- | -------------- | --------------------------------------------------- | ---------------------------------- |
| 0   | `subscription` | क्युरेट गरिएको `billing: "subscription"`            | कोटा विन्डो कटअफमा वा त्यसभन्दा तल |
| 1   | `keyless`      | सिन्थेटिक no-auth मार्ग                             | कनेक्सन कूलडाउन / ब्रेकर           |
| 2   | `free`         | मिटर गरिएको कनेक्सन, `classifyTier() === "free"`    | निःशुल्क भत्ता समाप्त              |
| 3   | `cheap`        | मिटर गरिएको कनेक्सन, `classifyTier() === "cheap"`   | प्रति-तह बजेट खपत                  |
| 4   | `premium`      | मिटर गरिएको कनेक्सन, `classifyTier() === "premium"` | प्रति-तह बजेट खपत                  |

तह 0-2 **कोटा** का आधारमा समाप्त हुन्छन्, जुन अवलोकन गर्न सकिन्छ र पहिल्यै ट्र्याक गरिएको छ। तह 3-4 मा
कोटा हुँदैन — सशुल्क कनेक्सनले अनिश्चितकालसम्म सेवा दिन्छ — त्यसैले तिनको एकमात्र उचित समाप्ति सङ्केत प्रति-तह
**बजेट** हो। त्यो नभए, "cheap समाप्त हुँदा एस्केलेट गर" भन्ने कुराको कुनै ट्रिगर हुँदैन।

## `auto/subscription` — बन्द अवस्थामा असफल हुने

पुल = केवल rung 0, र त्यस्ता कनेक्सनहरूमा सीमित जसको अतिरिक्त प्रयोग दस्तावेजीकृत `hard-stop` हो र प्रत्येकमा पर्याप्त कोटा बाँकी रहेको प्रत्यक्ष रूपमा प्रमाणित गरिएको छ।
अस्पष्ट सबै कुरा बहिष्कृत गरिन्छ: क्युरेट नगरिएको प्रदायक, पुष्टि गर्न नसकिने कोटा रिडिङ, पुरानो रिडिङ, वा सशुल्क रूपमा मिटर हुने अतिरिक्त प्रयोग।

खाली पुल त्रुटि होइन, **अभिप्रेत** उत्तर हो — कलरको विद्यमान खाली-पुल पथले यसलाई मौन र बिल लाग्ने fallback को सट्टा स्पष्ट त्रुटिमा परिणत गर्छ। यस id को सम्पूर्ण प्रत्याभूति यही हो।

`keyless` जानाजानी योग्य **हुँदैन**: यो समूहको अर्थ "मैले भुक्तानी गर्ने योजना" हो, त्यसैले प्रमाणीकरण नचाहिने backend यसमा पर्दैन। त्यसका लागि `auto/thrifty` (वा `auto/best-free`) प्रयोग गर्नुहोस्।

### कनेक्सन सुरक्षा

उम्मेदवार सधैँ एउटै कनेक्सनसँग बाँधिएको हुँदैन — तार्किक उम्मेदवारले `allowedConnectionIds` अनुमति-सूची बोक्छ, र वास्तवमा प्रयोग हुने खाता पछि dispatch को समयमा `open-sse/services/combo/autoStrategy.ts` द्वारा चयन गरिन्छ। त्यसैले दुवै समूहले **प्रत्येक कनेक्सनलाई छुट्टाछुट्टै** प्रमाणित गर्छन् र `allowedConnectionIds` लाई बाँचेको उपसमूहमै ठ्याक्कै सीमित हुने गरी पुनर्लेखन गर्छन् — कहिल्यै पनि पूरा मूल सूचीमा होइन, कहिल्यै पनि मनपरी चयन गरिएको एउटा सदस्यमा होइन। `autoStrategy.ts` ले त्यो array लाई पहिले नै कडा अनुमति-सूचीका रूपमा लागू गर्ने भएकाले, यसलाई यहाँ पुनर्लेखन गर्दा संरचनागत रूपमै "प्रमाणित" र "वास्तवमा प्रयोग गरिएको" सेट एउटै हुन्छन्। यो [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) कै जस्तो invariant र तर्क हो।

## `auto/thrifty` — एकपटकमा एउटा rung माथि जाने

पुल = सबै rung, rung index अनुसार क्रमबद्ध, र कोटा सकिएका उम्मेदवारहरूलाई बाहिर राखिएको। `auto` इन्जिनले बाँकी रहेको पुल **भित्रै** अझै स्कोर गर्छ: कुन-कुन rung प्रयोगमा आउने भन्ने ladder ले निर्णय गर्छ, र तिनभित्र कुन उम्मेदवार विजेता हुने भन्ने scoring ले निर्णय गर्छ। एउटा rung भित्रको क्रम स्थिर हुन्छ, त्यसैले यो overlay ले scorer को आफ्नै ranking लाई कहिल्यै फेरबदल गर्दैन।

यो ordering + gating overlay हो, नयाँ dispatcher **होइन**: `combo.ts` को speculative loop ले पहिले नै लक्ष्यहरूलाई क्रमअनुसार पार गर्छ र असफल हुँदा अर्कोमा जान्छ, त्यसैले preflight ले पत्ता नलगाएको runtime exhaustion भए पनि त्यही request भित्र अर्को rung मा जान्छ।

जहाँ `auto/subscription` बन्द अवस्थामा असफल हुन्छ, त्यहाँ `auto/thrifty` खुला अवस्थामा **असफल** हुन्छ: प्रयोगयोग्य कोटा रिडिङ नभएको, योजनामा समावेश कनेक्सनलाई अझै पनि पहिले प्रयास गरिन्छ। त्यसलाई प्रयास गर्दा कुनै खर्च लाग्दैन, र यदि त्यसको कोटा सकिएको रहेछ भने fall-through मार्फत अर्को rung मा पुगिन्छ — तर त्यसलाई प्रयास गर्न अस्वीकार गर्दा telemetry नभएको कारण request सशुल्क rung मा पठाइन्थ्यो, जुन यो समूहले टार्न खोजेको ठीक त्यही परिणाम हो।

## रिसेटपछि योजनामा फर्किने

routing rung 0 मा फर्कनुअघि तीनवटा स्वतन्त्र कुरा expire हुनुपर्छ। तीमध्ये एउटा मात्र ठीक गर्दा योजना पुनः भरिएको लामो समयपछि पनि ladder सशुल्क rung हरूमै अड्किरहन्छ।

1. **कोटा-अवस्था cache** — `freeAccessQuota.ts` ले प्रत्येक `(provider, connection)` का लागि 180s TTL सहित cache गर्छ। आफ्नै `resetAt` पहिले नै बितिसकेको cached entry ले अब अस्तित्वमै नरहेको window वर्णन गर्छ, त्यसैले त्यसलाई अब उमेरको **पर्वाह नगरी** stale मानिन्छ र refresh गर्न बाध्य पारिन्छ। यसबिना, मध्यरातमा पुनः भरिएको योजनालाई TTL समाप्त नहुँदासम्म कोटा सकिएको भनेरै पढिरहिन्छ।
2. **ladder को आफ्नै अवस्था** — डिजाइनअनुसार यस्तो कुनै अवस्था छैन। प्रत्येक पटक पुल निर्माण गर्दा live quota state बाट rung eligibility पुनः गणना गरिन्छ; reset भन्दा लामो समय टिकेर routing लाई wedge गर्न सक्ने persist गरिएको "हाल rung 3 मा" भन्ने कुनै record हुँदैन।
3. **कनेक्सन cooldown** — कोटा सकाउने 429 ले exponential backoff बाट `rateLimitedUntil` सेट गर्छ, जुन योजना कनेक्सनका लागि वास्तविक reset भन्दा पछि पुग्न सक्छ। `clampCooldownToReset()` (`subscriptionLadder.ts`) ले cooldown लाई upstream को आफ्नै reset instant सम्म सीमित गर्छ र यसलाई कहिल्यै लम्ब्याउन सक्दैन। **यो implement र test गरिएको छ तर अझै wired गरिएको छैन**: कुनै cooldown लेखिनुअघि नै `src/sse/services/auth.ts` मा quota cache invalidate गरिन्छ, त्यसैले त्यस function मा `resetAt` अझ पहिल्यै capture गर्नुपर्छ — resilience hot path मा गर्नुपर्ने यस्तो परिवर्तन आफ्नै reviewed PR मा समावेश हुनुपर्छ। त्यतिन्जेल, पुनः प्रवेशले कनेक्सन cooldown सकिन पर्खन्छ (जसले प्रदायकले पठाउँदा upstream का `Retry-After` hint लाई पहिले नै प्राथमिकता दिन्छ)।

### Anti-flap

भर्खरै reset भएको rung लाई `reentryMinRemainingPercent` (पूर्वनिर्धारित 5) भन्दा माथि पुगेपछि मात्र पुनः समावेश गरिन्छ, जबकि पहिले नै प्रयोगमा रहेको कनेक्सन `exitCutoffPercent` (पूर्वनिर्धारित 2, `quotaPreflight.defaultThresholdPercent` सँग मेल खाने) भन्दा माथि रहे पुग्छ। यो अन्तर hysteresis band हो — यो नभए cutoff वरिपरि रहेको कनेक्सन लगातार request हरूमा rung बीच दोहोरिएर आवतजावत गर्छ।

## कन्फिगरेसन

ट्युनिङका लागि मात्र। जानाजानी **कुनै** `enabled` फ्ल्याग छैन: यी बन्द गर्न सक्ने टगलले
`auto/subscription` लाई पूर्ण पूल — सशुल्क मोडेलहरूसहित — त्यसको विपरीत अर्थ दिने
नामअन्तर्गत चुपचाप सेवा दिइरहन दिन्थ्यो।

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 ले एउटा रङलाई पूर्ण रूपमा निष्क्रिय गर्छ
  },
}
```

खर्च रिजोल्भर नजोडिएसम्म बजेट गेटिङ निष्क्रिय रहन्छ: कुनै लेखाङ्कन उपलब्ध नभएमा सशुल्क
रङ क्रमबद्ध त हुन्छ तर कहिल्यै गेट गरिँदैन। v3.8.51 सम्ममा `rungBudgetUsd` सेटिङलाई
स्किमाले स्वीकार गर्छ तर अझै लागू गर्दैन — यसलाई सक्रिय खर्च सीमाको रूपमा होइन, आरक्षित कन्फिगरेसनको रूपमा लिनुहोस्। रङ क्रमबद्धता, कोटा-आधारित समाप्ति, र रिसेटपछिको पुनः-प्रवेश सबै
यसविना काम गर्छन्।

## संयोजन

`subscription` र `thrifty`, `AutoTier` मानहरू हुन्, त्यसैले तिनीहरू प्रत्येक श्रेणीसँग संयोजन हुन्छन्:
`auto/coding:thrifty`, `auto/reasoning:subscription`, आदि। दुईवटा फ्ल्याट आईडीहरू
(`auto/subscription`, `auto/thrifty`) `/v1/models` र ड्यासबोर्डमा प्रदर्शित गरिन्छन्।

कुनै पनि आईडी सशुल्क-टियर होइन, त्यसैले `isPaidTierAutoId()` ले दुवैका लागि `false` फर्काउँछ र
`auto/subscription`, `hidePaidModels` पछि पनि उपलब्ध रहन्छ।

## कोड कहाँ छ

| सरोकार                            | फाइल                                                |
| --------------------------------- | --------------------------------------------------- |
| क्युरेट गरिएका बिलिङ तथ्यहरू      | `open-sse/config/connectionBillingCatalog.ts`       |
| वर्गीकारक                         | `open-sse/services/autoCombo/connectionBilling.ts`  |
| रङहरू, दुवै समूहीकरण, पुनः-प्रवेश | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| उम्मेदवार पूलमा जडान              | `open-sse/services/autoCombo/virtualFactory.ts`     |
| रिसेट-सचेत क्यास पुरानोपन         | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| टियर सतह                          | `open-sse/services/autoCombo/suffixComposition.ts`  |
| प्रदर्शित आईडीहरू                 | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| परीक्षणहरू                        | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
