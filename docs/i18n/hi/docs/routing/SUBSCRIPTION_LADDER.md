# Subscription-first routing (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> दो नए `auto/*` ids — `auto/subscription` और `auto/thrifty`। दोनों को अनुरोध करके opt-in किया जाता है:
> जब तक कोई caller नाम से id नहीं माँगता, तब तक उनके माध्यम से कुछ भी route नहीं होता, और किसी
> मौजूदा pool, strategy या default में कोई बदलाव नहीं होता।

## यह क्यों मौजूद है

OmniRoute पहले से लागत से जुड़े दो प्रश्नों के उत्तर देता है, लेकिन उनमें से कोई भी वह प्रश्न नहीं है जो अधिकांश operators पूछते हैं।

| मौजूदा mechanism                                         | उत्तर देता है                                  |
| -------------------------------------------------------- | ---------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "क्या यह model catalog में free है?"           |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "क्या यह connection कभी मुझे bill कर सकता है?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "क्या यह connection अपनी सीमा के निकट है?"     |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "खर्च सीमित करें, सबसे सस्ते विकल्प पर जाएँ"   |

हर free-only mechanism **fails closed** — समाप्त हो चुका free pool एक खाली pool होता है, कभी भी
किसी paid विकल्प की ओर अगला कदम नहीं — और हर paid-side mechanism tier-agnostic है। इनमें से कोई भी इसका उत्तर नहीं देता:

> "उस quota का उपयोग करें जिसके लिए मैं पहले ही भुगतान करता हूँ। उसके समाप्त होने पर या तो रुक जाएँ,
> या सबसे सस्ते paid विकल्पों से होते हुए एक बार में एक पायदान ऊपर जाएँ — और उसके reset होते ही वापस आ जाएँ।"

## Billing connection का तथ्य है, model का नहीं

`classifyTier()` (`open-sse/services/tierResolver.ts`) `(provider, model)` के आधार पर निर्णय करता है और
catalog pricing से `free | cheap | premium` लौटाता है। लेकिन किसी request पर अतिरिक्त लागत आएगी या नहीं,
यह इस पर निर्भर करता है कि **कौन-सा connection उसे serve करता है**: वही model Claude Code OAuth
connection के माध्यम से plan में शामिल होता है और API-key connection के माध्यम से प्रति token bill किया जाता है।

`provider_connections.auth_type` किसी भी दिशा में सुरक्षित proxy नहीं है — metered OAuth
connections मौजूद हैं, और plan-included API-key connections भी मौजूद हैं (Copilot seat token कोई
metered API key नहीं है)। इसलिए billing class एक **curated catalog**,
`open-sse/config/connectionBillingCatalog.ts`, से आता है, जिसे प्रत्येक provider की प्रकाशित शर्तों के आधार पर
हाथ से निर्धारित किया जाता है — वही pattern जिसे `FreeModelBudget.hardStopGuaranteed` ने free models के लिए पहले ही स्थापित किया है।

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Resolution क्रम (`autoCombo/connectionBilling.ts`): synthetic no-auth sentinel →
`keyless`; provider **और** `authType` से मेल खाने वाली catalog entry; provider-wide entry;
अन्यथा `unknown`। **Uncurated का अर्थ free नहीं है** — `unknown` को हर जगह `metered`
के रूप में उपयोग किया जाता है, इसलिए कल जोड़ा गया provider subscription पायदान के बाहर से शुरू होता है और
उसे जानबूझकर curate करना पड़ता है।

## पायदान model

Escalation क्रम में पाँच पायदान। वे केवल कीमत में ही अलग नहीं हैं — प्रत्येक का **अपना**
exhaustion signal है, इसलिए यह महज़ sorting नहीं है।

| #   | पायदान         | Membership                                         | कब समाप्त माना जाता है           |
| --- | -------------- | -------------------------------------------------- | -------------------------------- |
| 0   | `subscription` | curated `billing: "subscription"`                  | quota window cutoff पर/उससे नीचे |
| 1   | `keyless`      | synthetic no-auth path                             | connection cooldown / breaker    |
| 2   | `free`         | metered connection, `classifyTier() === "free"`    | free allowance समाप्त            |
| 3   | `cheap`        | metered connection, `classifyTier() === "cheap"`   | प्रति-पायदान budget समाप्त       |
| 4   | `premium`      | metered connection, `classifyTier() === "premium"` | प्रति-पायदान budget समाप्त       |

पायदान 0-2 **quota** पर समाप्त होते हैं, जिसे देखा जा सकता है और पहले से track किया जाता है। पायदान 3-4 में कोई
quota नहीं है — paid connection हमेशा serve करता रहता है — इसलिए उनका एकमात्र समझदार exhaustion signal प्रति-पायदान
**budget** है। इसके बिना, "cheap समाप्त होने पर escalate करें" के पास कोई trigger नहीं है।

## `auto/subscription` — बंद विफलता

पूल = केवल पायदान 0, और केवल उन कनेक्शनों तक सीमित जिनका ओवरेज दस्तावेज़ित `hard-stop` है तथा जिनमें कोटा की अतिरिक्त उपलब्धता होने का लाइव सत्यापन किया गया है। प्रत्येक अस्पष्ट स्थिति को बाहर रखा जाता है: कोई अक्यूरेटेड प्रदाता, सत्यापित न की जा सकने वाली कोटा रीडिंग, पुरानी रीडिंग, या ऐसा ओवरेज जिसका मीटरिंग भुगतान में होता है।

खाली पूल **अभीष्ट** उत्तर है, कोई दोष नहीं — कॉलर का मौजूदा खाली-पूल पथ इसे एक स्पष्ट त्रुटि में बदल देता है, न कि किसी मौन, बिल योग्य फ़ॉलबैक में। यही इस id का पूरा आश्वासन है।

`keyless` जानबूझकर योग्य **नहीं** है: इस समूहीकरण का अर्थ है "वह प्लान जिसके लिए मैं भुगतान करता हूँ", इसलिए बिना प्रमाणीकरण वाला बैकएंड इसमें शामिल नहीं होता। उसके लिए `auto/thrifty` (या `auto/best-free`) का उपयोग करें।

### कनेक्शन सुरक्षा

कोई उम्मीदवार हमेशा केवल एक कनेक्शन से बँधा नहीं होता — एक तार्किक उम्मीदवार में `allowedConnectionIds` की अनुमत-सूची होती है, और वास्तव में उपयोग किया जाने वाला अकाउंट बाद में, डिस्पैच के समय, `open-sse/services/combo/autoStrategy.ts` द्वारा चुना जाता है। इसलिए दोनों समूहीकरण **प्रत्येक कनेक्शन को अलग-अलग** सत्यापित करते हैं और `allowedConnectionIds` को दोबारा लिखकर केवल जीवित बचे उपसमुच्चय तक सीमित कर देते हैं — कभी भी पूरी मूल सूची नहीं, और न ही मनमाने ढंग से चुना गया कोई एक सदस्य। क्योंकि `autoStrategy.ts` पहले से उस ऐरे को कठोर अनुमत-सूची के रूप में लागू करता है, इसलिए उसे यहाँ दोबारा लिखना "सत्यापित" और "वास्तव में उपयोग किए गए" सेट को संरचनात्मक रूप से समान बना देता है। यह वही अपरिवर्तनीय नियम और वही तर्क है जो [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) में है।

## `auto/thrifty` — एक बार में एक पायदान ऊपर जाएँ

पूल = सभी पायदान, पायदान सूचकांक के क्रम में, समाप्त हो चुके उम्मीदवारों को बाहर रखते हुए। `auto` इंजन अब भी जीवित बचे पूल के **भीतर** स्कोर करता है: लैडर तय करता है कि कौन-से पायदान सक्रिय हैं, जबकि स्कोरिंग तय करती है कि उनके भीतर कौन-सा उम्मीदवार जीतता है। एक पायदान के भीतर क्रम स्थिर रहता है, इसलिए इस ओवरले द्वारा स्कोरर की अपनी रैंकिंग कभी पुनर्व्यवस्थित नहीं होती।

यह क्रम निर्धारण + गेटिंग ओवरले है, कोई नया डिस्पैचर **नहीं**: `combo.ts` का स्पेक्युलेटिव लूप पहले से लक्ष्य क्रमवार देखता है और विफलता पर अगले पर चला जाता है, इसलिए प्रीफ़्लाइट द्वारा न पकड़ी गई रनटाइम समाप्ति भी उसी अनुरोध के भीतर अगले पायदान तक एस्केलेट करती है।

जहाँ `auto/subscription` बंद रूप में विफल होता है, वहीं `auto/thrifty` **खुले** रूप में विफल होता है: उपयोग योग्य कोटा रीडिंग के बिना भी प्लान में शामिल कनेक्शन को पहले आज़माया जाता है। उसे आज़माने में कोई लागत नहीं आती, और यदि वह समाप्त निकलता है तो फ़ॉल-थ्रू फिर भी अगले पायदान तक पहुँच जाता है — जबकि उसे आज़माने से इनकार करने पर अनुपलब्ध टेलीमेट्री के कारण अनुरोध भुगतान वाले पायदान पर भेज दिया जाएगा, ठीक वही परिणाम जिसे रोकने के लिए यह समूहीकरण बनाया गया है।

## रीसेट के बाद प्लान पर वापस जाना

रूटिंग के पायदान 0 पर वापस आने से पहले तीन स्वतंत्र चीज़ों की अवधि समाप्त होनी चाहिए। इनमें से केवल एक को ठीक करने पर लैडर प्लान के दोबारा भर जाने के काफ़ी समय बाद तक भुगतान वाले पायदानों पर अटका रहता है।

1. **कोटा-स्थिति कैश** — `freeAccessQuota.ts`, `(provider, connection)` के अनुसार, 180s TTL के साथ कैश करता है। ऐसी कैश की गई प्रविष्टि जिसका अपना `resetAt` पहले ही बीत चुका है, उस विंडो का वर्णन करती है जो अब मौजूद नहीं है, इसलिए अब उसे उम्र की **परवाह किए बिना** पुराना माना जाता है और वह रीफ़्रेश को बाध्य करती है। इसके बिना, मध्यरात्रि में दोबारा भरा गया प्लान TTL के संयोगवश समाप्त होने तक समाप्त ही दिखता रहता है।
2. **लैडर की अपनी स्थिति** — डिज़ाइन के अनुसार ऐसी कोई स्थिति नहीं है। प्रत्येक पूल निर्माण पर लाइव कोटा स्थिति से पायदान की पात्रता की दोबारा गणना होती है; ऐसा कोई सहेजा गया "वर्तमान में पायदान 3 पर" रिकॉर्ड मौजूद नहीं है जो रीसेट से अधिक समय तक बना रहकर रूटिंग को अटका सके।
3. **कनेक्शन कूलडाउन** — समाप्ति कराने वाला 429, एक्सपोनेंशियल बैकऑफ़ से `rateLimitedUntil` सेट करता है, जो किसी प्लान कनेक्शन के लिए वास्तविक रीसेट से आगे जा सकता है। `clampCooldownToReset()` (`subscriptionLadder.ts`) कूलडाउन को अपस्ट्रीम के अपने रीसेट समय तक सीमित करता है और उसे कभी बढ़ा नहीं सकता। **इसे कार्यान्वित और परीक्षित किया जा चुका है, लेकिन अभी जोड़ा नहीं गया है**: `src/sse/services/auth.ts` में कोई भी कूलडाउन लिखे जाने से _पहले_ कोटा कैश अमान्य कर दिया जाता है, इसलिए `resetAt` को उस फ़ंक्शन में पहले कैप्चर करना होगा — यह रेज़िलिएंस हॉट पाथ में बदलाव है, जिसे अपनी अलग समीक्षित PR में होना चाहिए। तब तक, पुनः प्रवेश कनेक्शन कूलडाउन समाप्त होने की प्रतीक्षा करता है (जो पहले से ही, प्रदाता द्वारा भेजे जाने पर, अपस्ट्रीम `Retry-After` संकेतों को प्राथमिकता देता है)।

### बार-बार बदलाव से बचाव

हाल ही में रीसेट किए गए पायदान को केवल तभी दोबारा प्रवेश मिलता है जब वह `reentryMinRemainingPercent` (डिफ़ॉल्ट 5) से ऊपर हो, जबकि पहले से सक्रिय कनेक्शन को केवल `exitCutoffPercent` (डिफ़ॉल्ट 2, जो `quotaPreflight.defaultThresholdPercent` से मेल खाता है) से ऊपर बने रहना होता है। यह अंतर हिस्टेरिसिस बैंड है — इसके बिना, कटऑफ़ के आसपास मंडराता कनेक्शन लगातार अनुरोधों में पायदानों के बीच दोलन करता है।

## कॉन्फ़िगरेशन

केवल ट्यूनिंग के लिए। जानबूझकर कोई `enabled` फ़्लैग **नहीं** है: इन्हें बंद करने में सक्षम टॉगल
`auto/subscription` को चुपचाप पूरे पूल — सशुल्क मॉडल सहित — को ऐसे नाम के तहत उपलब्ध कराते रहने देगा,
जो इसके विपरीत होने का वादा करता है।

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 किसी पायदान को पूरी तरह अक्षम कर देता है
  },
}
```

जब तक कोई व्यय रिज़ॉल्वर जोड़ा नहीं जाता, बजट गेटिंग निष्क्रिय रहती है: कोई लेखांकन उपलब्ध न होने पर सशुल्क
पायदान को क्रम में रखा जाता है, लेकिन उस पर कभी गेटिंग लागू नहीं होती। v3.8.51 के अनुसार `rungBudgetUsd` सेटिंग को
स्कीमा स्वीकार करता है, लेकिन इसे अभी लागू **नहीं** किया गया है — इसे सक्रिय व्यय सीमा नहीं, बल्कि आरक्षित कॉन्फ़िगरेशन मानें। पायदान क्रमांकन, कोटा-आधारित समाप्ति और रीसेट के बाद पुनः-प्रवेश, सभी
इसके बिना काम करते हैं।

## संयोजन

`subscription` और `thrifty`, `AutoTier` मान हैं, इसलिए वे प्रत्येक श्रेणी के साथ संयोजित होते हैं:
`auto/coding:thrifty`, `auto/reasoning:subscription`, इत्यादि। दोनों फ़्लैट आईडी
(`auto/subscription`, `auto/thrifty`) `/v1/models` और डैशबोर्ड में प्रदर्शित किए जाते हैं।

दोनों में से कोई भी आईडी सशुल्क-टियर नहीं है, इसलिए `isPaidTierAutoId()` दोनों के लिए `false` लौटाता है और
`auto/subscription`, `hidePaidModels` के बाद भी बना रहता है।

## कोड कहाँ स्थित है

| विषय                                | फ़ाइल                                               |
| ----------------------------------- | --------------------------------------------------- |
| क्यूरेट किए गए बिलिंग तथ्य          | `open-sse/config/connectionBillingCatalog.ts`       |
| क्लासिफ़ायर                         | `open-sse/services/autoCombo/connectionBilling.ts`  |
| पायदान, दोनों समूहीकरण, पुनः-प्रवेश | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| उम्मीदवार पूल में वायरिंग           | `open-sse/services/autoCombo/virtualFactory.ts`     |
| रीसेट-जागरूक कैश अप्रचलन            | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| टियर सतह                            | `open-sse/services/autoCombo/suffixComposition.ts`  |
| प्रदर्शित आईडी                      | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| परीक्षण                             | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
