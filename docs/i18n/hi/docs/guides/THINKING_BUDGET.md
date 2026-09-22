# Thinking Budget (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **डैशबोर्ड:** Settings → **AI** → Thinking Budget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **स्रोत:** `open-sse/services/thinkingBudget.ts`

Thinking Budget यह नियंत्रित करता है कि प्रदाताओं तक अनुरोध पहुँचने से पहले OmniRoute **क्लाइंट के थिंकिंग/रीज़निंग पैरामीटर को फिर से लिखता है या नहीं**। यह कम्प्रेशन, रूटिंग या प्रॉम्प्ट कैश को चालू या बंद **नहीं** करता।

## मोड

| मोड                          | OmniRoute क्या करता है                                                                                                    | कब उपयोग करें                                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (डिफ़ॉल्ट) | क्लाइंट फ़ील्ड को अपरिवर्तित रखता है (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config`, आदि)। | **Codex / Desktop / ऐसा कोई भी क्लाइंट जिसे प्रयास + रीज़निंग सारांश नियंत्रित करना चाहिए।** जब क्लाइंट `reasoning.summary` का अनुरोध करता है, तब दृश्यमान थिंकिंग पैनल के लिए आवश्यक।    |
| **`auto`**                   | अपस्ट्रीम को भेजने से पहले अनुरोध बॉडी से थिंकिंग/रीज़निंग के **सभी फ़ील्ड हटा देता है**।                                 | केवल तभी, जब आप जानबूझकर **प्रदाता** को डिफ़ॉल्ट निर्धारित करने देना चाहते हैं और आपको क्लाइंट-नियंत्रित थिंकिंग की आवश्यकता **नहीं** है। इसका अर्थ “थिंकिंग अपने-आप दिखाना” **नहीं** है। |
| **`custom`**                 | प्रत्येक अनुरोध में एक निश्चित थिंकिंग टोकन बजट सेट करता है।                                                              | सभी ट्रैफ़िक के थिंकिंग टोकन पर सख़्त सीमा के लिए।                                                                                                                                        |
| **`adaptive`**               | संदेशों की संख्या, टूल और प्रॉम्प्ट की लंबाई का उपयोग करके आधार प्रयास के अनुसार बजट को समायोजित करता है।                 | क्लाइंट के उद्देश्य को पूरी तरह हटाए बिना लचीले टोकन नियंत्रण के लिए।                                                                                                                     |

### `auto` क्या हटाता है

जब मोड `auto` होता है, तो `stripThinkingConfig()` अन्य फ़ील्ड के साथ इन्हें हटा देता है:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking`, और मौजूद होने पर `output_config.effort`
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

यदि किसी क्लाइंट (जैसे Codex Desktop) ने `reasoning: { effort: "ultra", summary: "detailed" }` भेजा है, तो **auto उस ऑब्जेक्ट को हटा देता है**। अपस्ट्रीम तब भी कुछ रीज़निंग टोकन के लिए शुल्क लगा सकता है, लेकिन अक्सर **खाली या केवल एन्क्रिप्ट किए गए** रीज़निंग आइटम लौटाता है—इसलिए UI कोई उपयोगी थिंकिंग स्ट्रीम नहीं दिखाता।

## यह क्या **नहीं** है

| सुविधा                                    | संबंध                                                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **कम्प्रेशन** (Caveman, RTK, stacked, …)  | अलग पाइपलाइन। प्रत्येक थिंकिंग-बजट मोड में काम करती है।                                                                              |
| **प्रॉम्प्ट / सिमेंटिक कैश**              | अलग है। थिंकिंग-बजट मोड से अप्रभावित।                                                                                                |
| **कॉम्बो रूटिंग / फ़ॉलबैक**               | अलग हैं। अप्रभावित।                                                                                                                  |
| **API-कुंजी टोकन सीमाएँ / लागत बजट**      | अलग हैं। अप्रभावित।                                                                                                                  |
| **रीज़निंग रिप्ले कैश**                   | सख़्त प्रदाताओं (DeepSeek, Kimi, Qwen-thinking, …) के लिए मल्टी-टर्न पुनः प्रविष्टि। यह Desktop के “थिंकिंग दिखाएँ” के समान नहीं है। |
| **`encrypted_content` को डिक्रिप्ट करना** | **असंभव है।** OpenAI/Codex के निजी रीज़निंग ब्लॉब अपारदर्शी हैं। OmniRoute उन्हें कभी डिक्रिप्ट नहीं करता (#7095 / #7176 / #7304)।   |

## दृश्यमान चिंतन (Codex / Responses क्लाइंट)

किसी क्लाइंट को चिंतन टेक्स्ट दिखाने के लिए आपको **इन सभी** की आवश्यकता है:

1. Thinking Budget मोड = **`passthrough`** (या custom/adaptive, जो आपके उपयोग किए जाने वाले पथ के लिए सारांश अनुरोधों को पर्याप्त रूप से बरकरार रखे)।
2. क्लाइंट सारांश का अनुरोध करे, जैसे Codex `model_reasoning_summary = "detailed"` / `auto` (`none` नहीं)।
3. अपस्ट्रीम वास्तव में `response.reasoning_summary_text.*` स्ट्रीम करे (या आइटम पर एक गैर-रिक्त `reasoning.summary` हो)।

यदि आपको केवल “एन्क्रिप्टेड निजी रीजनिंग” मिलती है, तो इनमें से कोई कारण हो सकता है:

- मोड **`auto`** था (क्लाइंट अनुरोध हटा दिया गया था), या
- अपस्ट्रीम ने सारांश टेक्स्ट के बिना `encrypted_content` लौटाया (प्रदाता की सीमा; OmniRoute केवल एक प्लेसहोल्डर प्रदर्शित कर सकता है, प्लेनटेक्स्ट नहीं)।

## API उदाहरण

```bash
# पढ़ें
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Codex / Desktop में चिंतन की दृश्यता के लिए अनुशंसित
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

स्कीमा (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; वैकल्पिक `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`।

### स्थायित्व / पुनः आरंभ

मान को सेटिंग्स कुंजी `thinkingBudget` के अंतर्गत संग्रहीत किया जाता है और प्रक्रिया शुरू होने पर (`hydrateThinkingBudgetConfig`) लोड किया जाता है। DB या कुछ गैर-API पथों के माध्यम से बदलाव करने के बाद, **OmniRoute प्रक्रिया को पुनः आरंभ करें**, ताकि इन-मेमोरी सिंगलटन डिस्क से मेल खाए।

## ऑपरेटर चेकलिस्ट

- [ ] Codex / Desktop उपयोगकर्ता: मोड = **passthrough**
- [ ] यदि आप चिंतन हटाकर नहीं, बल्कि **संदेशों** पर टोकन बचाना चाहते हैं, तो कंप्रेशन सक्षम रखें
- [ ] `auto` से “अधिक चिंतन दिखने” की अपेक्षा न करें
- [ ] केवल-एन्क्रिप्टेड सारांश एक **प्रदाता** व्यवहार है; passthrough उन्हें डिक्रिप्ट नहीं कर सकता

## संबंधित दस्तावेज़

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — मल्टी-टर्न `reasoning_content` कैश
- [USER_GUIDE.md](./USER_GUIDE.md) — सेटिंग्स डैशबोर्ड टैब
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — सेटिंग्स एंडपॉइंट्स
