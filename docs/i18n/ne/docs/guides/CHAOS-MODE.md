# Chaos Mode (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ड्यासबोर्ड:** **Chaos Mode** (साइडबार) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ड्यासबोर्ड सत्र) · `POST /api/skills/collect/chaos` (API कुञ्जी)  
> **स्रोत:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode ले **एउटै कार्य एकैपटक धेरै प्रदायकहरूलाई पठाउँछ** — सहभागी प्रत्येक प्रदायकले
एउटा मोडेल इन्स्ट्यान्स योगदान गर्छ, र तपाईंले सबै उत्तरहरू सँगसँगै (वा शृङ्खलाबद्ध रूपमा) प्राप्त
गर्नुहुन्छ। यो बहु-मोडेल कार्यान्वयन सतह हो, राउटिङ रणनीति होइन: तपाईंको सामान्य
`/v1/chat/completions` ट्राफिकलाई यसले कहिल्यै असर गर्दैन।

**स्पष्टीकरण — नाममा "chaos" भएका तीन फरक कुराहरू उपलब्ध छन्:**

| कुरा               | यो के हो                                                                                                          | दस्तावेज उपलब्ध स्थान                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**     | यहाँ वर्णन गरिएको ड्यासबोर्ड पृष्ठ + API: एउटा कार्य धेरै प्रदायकहरूमा विस्तार गर्ने (समानान्तर वा सहकार्यात्मक)। | यो मार्गदर्शिका                              |
| `auto/chaos`       | लचिलोपन परीक्षणका लागि फल्ट-इन्जेक्सन स्कोरिङ भारहरू भएको Auto-Combo मोडेल id। कन्फिगर गर्नुपर्ने केही छैन।       | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo कन्फिग | `config.chaos.enabled` भएको स्थायी कम्बोले वैकल्पिक निर्णायक मोडेलसहितको प्यानलमा विस्तार गर्छ (API-मात्र)।       | `open-sse/services/autoCombo/chaosEngine.ts` |

## सेटअप

1. **ड्यासबोर्ड → Chaos Mode** (`/dashboard/chaos`) खोल्नुहोस्।
2. यसलाई **अन गर्नुहोस्** — Chaos Mode पूर्वनिर्धारित रूपमा **असक्षम हुन्छ**
   (`src/lib/chaos/chaosConfig.ts` मा `enabled: false`)। असक्षम हुँदा,
   `POST /api/chaos/run` ले `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`
   जवाफ दिन्छ।
3. सहभागीहरू र पूर्वनिर्धारित मानहरू चयन गर्नुहोस् (सेटिङ्स स्टोरमार्फत प्रत्येक इन्स्ट्यान्सका लागि स्थायी रूपमा भण्डारण हुन्छन्):

   | फिल्ड               | अर्थ                                                                      | पूर्वनिर्धारित / सीमाहरू                   |
   | ------------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
   | `enabled`           | मुख्य स्विच                                                               | `false`                                    |
   | `defaultMode`       | `parallel` वा `collaborative` (तल हेर्नुहोस्)                             | `parallel`                                 |
   | `providerOverrides` | प्रत्येक प्रदायकको सहभागिता (`providerId`, वैकल्पिक `modelId`, `enabled`) | खाली = प्रत्येक सक्रिय प्रदायक, अधिकतम 200 |
   | `systemPrompt`      | अन्तर्निर्मित Chaos प्रणाली प्रम्प्टको ओभरराइड                            | वैकल्पिक, अधिकतम 10 000 अक्षर              |
   | `timeoutMs`         | प्रत्येक मोडेल कलको अधिकतम समय                                            | `120000` (5 000–600 000)                   |
   | `maxTokens`         | प्रत्येक मोडेल कलको `max_tokens`                                          | `4096` (256–128 000)                       |

4. **पृष्ठबाटै परीक्षण चलाउनुहोस्** — नतिजा प्यानलले प्रत्येक प्रदायकको उत्तर,
   स्थिति र अवधि देखाउँछ।

## कार्यान्वयन मोडहरू

- **`parallel`** — प्रत्येक मोडेलले एउटै कार्य एकैसाथ प्राप्त गर्छ; तपाईंले सबै उत्तरहरू
  स्वतन्त्र रूपमा प्राप्त गर्नुहुन्छ।
- **`collaborative`** — मोडेलहरू **शृङ्खलामा** चल्छन्: प्रत्येकले अघिल्लो मोडेलको आउटपुट देख्छ र
  त्यसलाई परिष्कृत गर्न, विस्तार गर्न, समीक्षा गर्न वा विकल्प प्रस्तुत गर्न भनिन्छ। प्रतिक्रियाको
  `summary` फिल्डले सफल आउटपुटहरूलाई शृङ्खलाको क्रमअनुसार जोड्छ (`parallel` रनहरूमा `summary` हुँदैन)।

## API

### `POST /api/chaos/run` — ड्यासबोर्ड सत्र

कुकीद्वारा प्रमाणीकरण गरिएको (व्यवस्थापन सत्र —
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) हेर्नुहोस्); ड्यासबोर्ड पृष्ठले प्रयोग गर्छ।

```jsonc
// अनुरोध बडी
{
  "task": "Compare approaches to X", // आवश्यक
  "providers": ["glm", "kimi"], // वैकल्पिक फिल्टर
  "mode": "parallel", // वैकल्पिक — defaultMode लाई ओभरराइड गर्छ
  "systemPrompt": "…", // वैकल्पिक ओभरराइड
  "maxTokens": 4096, // वैकल्पिक ओभरराइड
}
```

### `POST /api/skills/collect/chaos` — API कुञ्जी

बाह्य कलरहरूका लागि Bearer-token भेरियन्ट। कुञ्जीसँग **Chaos Mode अनुमति**
(`chaosModeEnabled`) हुनुपर्छ, जुन **पूर्वनिर्धारित रूपमा अफ हुन्छ** — प्रत्येक कुञ्जीका लागि
**ड्यासबोर्ड → API Manager → कुञ्जी सम्पादन → अनुमतिहरू → Chaos Mode** मा यसलाई सक्षम गर्नुहोस्।
बडी माथिको जस्तै हुन्छ।

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

दुवै एन्डपोइन्टले एउटै संरचनामा प्रतिक्रिया फर्काउँछन्:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative मोडमा मात्र
}
```

## समस्या समाधान

- **`400 Chaos Mode is not enabled`** — माथिको चरण 2 हेर्नुहोस्: ग्लोबल स्विच अफ छ।
- **`/api/skills/collect/chaos` मा API कुञ्जी अस्वीकृत हुन्छ** — कुञ्जीसँग प्रतिकुञ्जी
  `chaosModeEnabled` अनुमति छैन (पूर्वनिर्धारित रूपमा अफ; यो सेटिङ हो, त्रुटि होइन)।
- **तपाईंले अपेक्षा गरेको प्रदायक नतिजाहरूमा छैन** — Chaos Mode पृष्ठमा
  `providerOverrides` जाँच गर्नुहोस् (असक्षम ओभरराइडले त्यसलाई बाहिर राख्छ) र प्रदायकको जडान
  सक्रिय छ कि छैन जाँच गर्नुहोस्।
