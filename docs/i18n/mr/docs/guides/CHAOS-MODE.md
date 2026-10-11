# Chaos Mode (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (साइडबार) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (डॅशबोर्ड सत्र) · `POST /api/skills/collect/chaos` (API की)  
> **स्रोत:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **एकच कार्य एकाच वेळी अनेक प्रदात्यांकडे पाठवतो** — सहभागी होणारा प्रत्येक प्रदाता
एका मॉडेल इन्स्टन्सचे योगदान देतो आणि तुम्हाला सर्व उत्तरे शेजारी-शेजारी (किंवा साखळीबद्ध) मिळतात. हा
बहु-मॉडेल अंमलबजावणी पृष्ठभाग आहे, राउटिंग धोरण नाही: तुमच्या नेहमीच्या `/v1/chat/completions`
ट्रॅफिकवर याचा कधीही परिणाम होत नाही.

**संदिग्धता निवारण — "chaos" नाव असलेल्या तीन भिन्न गोष्टी उपलब्ध आहेत:**

| गोष्ट                    | ती काय आहे                                                                                                                                                            | दस्तऐवजीकरण कुठे आहे                         |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**           | येथे वर्णन केलेले डॅशबोर्ड पृष्ठ + API: एक कार्य अनेक प्रदात्यांकडे वितरित करा (समांतर किंवा सहयोगात्मक पद्धतीने).                                                    | हे मार्गदर्शक                                |
| `auto/chaos`             | Auto-Combo मॉडेल आयडी: समांतर वितरण, प्रत्येक प्रदात्यासाठी एक मॉडेल आणि प्रत्येकी एक अपस्ट्रीम कॉल. हे दोष अंतःक्षेपण नाही ([तपशील](#autochaos-parallel-fan-out)).   | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos कॉम्बो कॉन्फिगरेशन | `config.chaos.enabled` असलेला कायमस्वरूपी जतन केलेला कॉम्बो त्याच प्रकारे वितरण करतो (केवळ API); `judgeModel` फक्त अंतिम उत्तर निवडतो, कोणताही संश्लेषण कॉल करत नाही. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: समांतर वितरण

`auto/chaos` हे दोष अंतःक्षेपण किंवा लवचिकता-चाचणीसाठीचे नियंत्रण **नाही**. `/v1/chat/completions` वर
`model: "auto/chaos"` ची विनंती केल्यास:

1. **प्रत्येक प्रदात्याकडून एक मॉडेल** असलेले पॅनेल तयार होते: प्रत्येक
   कनेक्ट केलेल्या प्रदात्याचा पहिला उमेदवार, उमेदवार-पूल क्रमाने, कमाल 5 सदस्यांपर्यंत
   (`OMNIROUTE_CHAOS_MAX_PANEL`, कमाल मर्यादा 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` वेट
   पॅक फक्त प्रत्येक सदस्याचे `weight` सेट करतो; वितरण प्रक्रिया ते वाचत नाही.
2. समान विनंती प्रत्येक पॅनेल सदस्याला **समांतरपणे** पाठवली जाते, त्यामुळे एका विनंतीसाठी
   प्रत्येक पॅनेल सदस्यामागे एक अपस्ट्रीम कॉल लागतो
   (`open-sse/services/autoCombo/chaosEngine.ts`, येथून पाठवले जाते:
   `open-sse/services/combo.ts`).
3. प्रत्येक पॅनेल सदस्याचा निकाल येताच त्याच्यासाठी एक स्थिती ओळ प्रवाहित केली जाते: डीफॉल्टनुसार एक SSE टिप्पणी
   (`: chaos <index> ok|fail <model>`), तसेच विनंतीमध्ये
   `stream_options.include_chaos_parts: true` सेट केलेले असल्यास एक `omni-chaos-part`
   इव्हेंट (`model`, `index`, `ok`, `error`). यांमध्ये उत्तराचा कोणताही मजकूर नसतो.
4. अंतिम OpenAI-शैलीतील खंड म्हणून पॅनेलमधील **एक** उत्तर पाठवले जाते: पहिल्या पॅनेल
   सदस्याचे (`auto/chaos` त्याला `judgeModel` म्हणून सेट करतो) उत्तर यशस्वी झाल्यास ते, अन्यथा
   शेवटच्या यशस्वी सदस्याचे उत्तर. पॅनेलमधील इतर उत्तरे परत केली जात नाहीत, त्यामुळे
   तुम्ही N कॉलसाठी पैसे देता आणि तुम्हाला एक पूर्ण प्रतिसाद मिळतो.

## सेटअप

1. **डॅशबोर्ड → Chaos Mode** (`/dashboard/chaos`) उघडा.
2. तो **सुरू** करा — Chaos Mode डीफॉल्टनुसार **बंद** असतो (`src/lib/chaos/chaosConfig.ts` मध्ये
   `enabled: false`). तो बंद असताना, `POST /api/chaos/run` कडून
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` असे उत्तर मिळते.
3. सहभागी आणि डीफॉल्ट्स निवडा (सेटिंग्ज स्टोअरद्वारे प्रत्येक इंस्टन्ससाठी जतन केले जातात):

   | फील्ड               | अर्थ                                                                    | डीफॉल्ट / मर्यादा                         |
   | ------------------- | ----------------------------------------------------------------------- | ----------------------------------------- |
   | `enabled`           | मुख्य स्विच                                                             | `false`                                   |
   | `defaultMode`       | `parallel` किंवा `collaborative` (खाली पाहा)                            | `parallel`                                |
   | `providerOverrides` | प्रत्येक प्रदात्याचा सहभाग (`providerId`, पर्यायी `modelId`, `enabled`) | रिक्त = प्रत्येक सक्रिय प्रदाता, कमाल 200 |
   | `systemPrompt`      | अंगभूत Chaos सिस्टम प्रॉम्प्टसाठी ओव्हरराइड                             | पर्यायी, कमाल 10 000 वर्ण                 |
   | `timeoutMs`         | प्रत्येक मॉडेल कॉलसाठी कमाल वेळ                                         | `120000` (5 000–600 000)                  |
   | `maxTokens`         | प्रत्येक मॉडेल कॉलसाठी `max_tokens`                                     | `4096` (256–128 000)                      |

4. **पृष्ठावरूनच चाचणी चालवा** — परिणाम पॅनेलमध्ये प्रत्येक प्रदात्याचे उत्तर,
   स्थिती आणि कालावधी दिसतो.

## अंमलबजावणी मोड

- **`parallel`** — प्रत्येक मॉडेलला एकच कार्य एकाच वेळी मिळते; तुम्हाला सर्व उत्तरे
  स्वतंत्रपणे मिळतात.
- **`collaborative`** — मॉडेल्स **साखळीमध्ये** चालतात: प्रत्येकाला मागील मॉडेलचे आउटपुट दिसते आणि
  ते सुधारण्यास, विस्तारण्यास, त्याचे समीक्षण करण्यास किंवा पर्याय सुचवण्यास सांगितले जाते. प्रतिसादातील `summary` फील्ड
  साखळीच्या क्रमाने यशस्वी आउटपुट्स एकत्र जोडते (`parallel` रनमध्ये `summary` नसतो).

## API

### `POST /api/chaos/run` — डॅशबोर्ड सत्र

कुकीद्वारे प्रमाणीकरण केलेले (व्यवस्थापन सत्र — पहा
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); डॅशबोर्ड पृष्ठाद्वारे वापरले जाते.

```jsonc
// बॉडी
{
  "task": "Compare approaches to X", // आवश्यक
  "providers": ["glm", "kimi"], // पर्यायी फिल्टर
  "mode": "parallel", // पर्यायी — defaultMode ओव्हरराइड करतो
  "systemPrompt": "…", // पर्यायी ओव्हरराइड
  "maxTokens": 4096, // पर्यायी ओव्हरराइड
}
```

### `POST /api/skills/collect/chaos` — API की

बाह्य कॉलर्ससाठी बेअरर-टोकन प्रकार. कीकडे **Chaos Mode परवानगी**
(`chaosModeEnabled`) असणे आवश्यक आहे, जी **डीफॉल्टनुसार बंद** असते — प्रत्येक कीसाठी ती
**डॅशबोर्ड → API Manager → की संपादित करा → परवानग्या → Chaos Mode** येथे सुरू करा. वरीलप्रमाणेच बॉडी वापरा.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

दोन्ही एंडपॉइंट्स समान संरचनेचा प्रतिसाद देतात:

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
  "summary": "…", // केवळ collaborative मोड
}
```

## समस्या निवारण

- **`400 Chaos Mode is not enabled`** — वरील पायरी 2: जागतिक स्विच बंद आहे.
- **`/api/skills/collect/chaos` वर API की नाकारली जाते** — कीकडे प्रत्येक कीसाठीची
  `chaosModeEnabled` परवानगी नाही (डीफॉल्टनुसार बंद; हे एक सेटिंग आहे, त्रुटी नाही).
- **अपेक्षित प्रदाता परिणामांमध्ये दिसत नाही** — Chaos Mode पृष्ठावरील `providerOverrides`
  तपासा (बंद केलेला ओव्हरराइड त्या प्रदात्याला वगळतो) आणि प्रदात्याचे कनेक्शन
  सक्रिय आहे का ते तपासा.
