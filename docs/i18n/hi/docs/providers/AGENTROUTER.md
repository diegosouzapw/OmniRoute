# AgentRouter Setup Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) एक Anthropic-संगत रिले है, जो Claude और अन्य मॉडलों को अक्सर सीधे Anthropic API से कम कीमतों पर पुनर्विक्रय करता है। इसे आधिकारिक Claude Code क्लाइंट के लिए ड्रॉप-इन `ANTHROPIC_BASE_URL` प्रतिस्थापन के रूप में डिज़ाइन किया गया है, इसलिए यह केवल ऐसे ट्रैफ़िक को स्वीकार करता है जो Claude Code वायर इमेज (विशिष्ट User-Agent, `anthropic-beta` फ़्लैग, Stainless SDK हेडर आदि) से मेल खाता हो।

## त्वरित शुरुआत — मूल `agentrouter` प्रदाता का उपयोग करें (अनुशंसित)

अधिकांश उपयोगकर्ताओं के लिए, **किसी विशेष सेटअप की आवश्यकता नहीं है**। OmniRoute में पूर्ण Claude Code वायर इमेज के साथ एक अंतर्निहित `agentrouter` प्रदाता पहले से शामिल है (`open-sse/config/providerRegistry.ts` → `agentrouter` देखें)। इसका उपयोग करने के लिए:

1. **डैशबोर्ड → प्रदाता → प्रदाता जोड़ें** खोलें।
2. सूची से **AgentRouter** चुनें।
3. अपनी `sk-...` API कुंजी पेस्ट करें और सहेजें।

बस इतना ही — किसी environment variable या कस्टम प्रदाता प्रकार की आवश्यकता नहीं है। अंतर्निहित मॉडलों में `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, और `deepseek-v3.2` शामिल हैं।

इस गाइड का शेष भाग **उन्नत विधि** को कवर करता है: `anthropic-compatible-cc-*` प्रदाता प्रकार का उपयोग। इसका उपयोग तब करें, जब आपको वायर इमेज पर अधिक नियंत्रण चाहिए — उदाहरण के लिए, ऐसे अन्य AgentRouter-जैसे रिले से कनेक्ट करते समय जो अभी मूल प्रदाता रजिस्ट्री में उपलब्ध नहीं हैं, या base URL, chat path अथवा हेडर सेट को ओवरराइड करते समय।

---

## उन्नत: Claude Code संगत प्रदाता प्रकार के माध्यम से कनेक्ट करना

OmniRoute, **Claude Code संगत** प्रदाता प्रकार (`anthropic-compatible-cc-*`) के माध्यम से AgentRouter (और समान रिले) का भी समर्थन करता है, जो सही वायर इमेज के साथ Anthropic Messages API का उपयोग करता है। `https://agentrouter.org` की ओर इंगित करने वाला सामान्य `openai-compatible-chat` प्रदाता काम **नहीं** करेगा — अपस्ट्रीम WAF उन अनुरोधों को अस्वीकार कर देता है जो Claude Code जैसे नहीं दिखते।

---

## पूर्वापेक्षाएँ

- एक AgentRouter खाता और API कुंजी। नए साइनअप को प्रोजेक्ट [README](../README.md) में दिए गए एफिलिएट लिंक के माध्यम से निःशुल्क क्रेडिट मिलते हैं।
- `ENABLE_CC_COMPATIBLE_PROVIDER` फ़ीचर फ़्लैग सक्षम करके चल रहा OmniRoute (नीचे देखें)।

## 1. CC-संगत प्रदाता प्रकार सक्षम करें

Claude Code संगत प्रदाता प्रकार को एक फ़ीचर फ़्लैग के पीछे रखा गया है, क्योंकि यह ऐसा ट्रैफ़िक भेजता है जो आधिकारिक Claude Code क्लाइंट से काफ़ी हद तक मेल खाता है। OmniRoute शुरू करने से पहले एक environment variable सेट करके इसे सक्षम करें:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker उदाहरण:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

पुनः शुरू करने के बाद, डैशबोर्ड मौजूदा OpenAI-संगत और Anthropic-संगत प्रवाहों के अतिरिक्त **Claude Code संगत जोड़ें** विकल्प प्रदर्शित करता है।

## 2. डैशबोर्ड में प्रदाता बनाएँ

1. **डैशबोर्ड → प्रदाता → प्रदाता जोड़ें** खोलें।
2. **Claude Code संगत जोड़ें** चुनें (यह केवल तभी दिखाई देता है, जब ऊपर दिया गया फ़्लैग सेट हो)।
3. फ़ील्ड भरें:

| फ़ील्ड    | मान                                                                  |
| --------- | -------------------------------------------------------------------- |
| नाम       | `AgentRouter` (या कोई भी लेबल)                                       |
| उपसर्ग    | `agentrouter` (लॉग और डैशबोर्ड में दिखाया जाने वाला सुविधाजनक उपनाम) |
| Base URL  | `https://agentrouter.org`                                            |
| Chat path | `/v1/messages?beta=true` (डिफ़ॉल्ट — जैसा है वैसा ही रहने दें)       |

> कैनोनिकल मॉडल पहचानकर्ता अब भी पूर्ण प्रदाता नोड ID
> (`anthropic-compatible-cc-{uuid}/{model}`) का उपयोग करता है। **उपसर्ग** केवल एक प्रदर्शन
> उपनाम है, जिसे अधिक सुविधाजनक लॉग आउटपुट के लिए `src/lib/usage/callLogs.ts` द्वारा हल किया जाता है।

4. (वैकल्पिक) अपनी API कुंजी **सत्यापित करें** फ़ील्ड में पेस्ट करें और सहेजने से पहले कनेक्टिविटी की पुष्टि करने के लिए **जाँचें** पर क्लिक करें।
5. **जोड़ें** पर क्लिक करें।

बन जाने के बाद, प्रदाता खोलें और अपनी AgentRouter API कुंजी (`sk-...`) के साथ एक **कनेक्शन** जोड़ें। कनेक्शन का `test_status`, `active` हो जाना चाहिए।

## 3. इसे कॉम्बो के माध्यम से या सीधे उपयोग करें

अपने प्रदाता के प्रीफ़िक्स को नेमस्पेस के रूप में उपयोग करके मॉडल का संदर्भ दें:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

कैनोनिकल मॉडल ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` भी काम करती है
और डेटाबेस तथा कॉम्बो कॉन्फ़िगरेशन में यही दिखाई देती है।

या किसी अन्य प्रदाता की तरह रूटिंग, फ़ॉलबैक और कोटा प्रबंधन के लिए इसे किसी
कॉम्बो में जोड़ें।

---

## वायर इमेज का विवरण

संदर्भ के लिए, cc-compatible ब्रिज प्रत्येक अपस्ट्रीम अनुरोध में निम्नलिखित भेजता है
(`open-sse/services/claudeCodeCompatible.ts` देखें):

| हेडर                                        | मान                                                                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Authorization`                             | `Bearer <api-key>`                                                                                                             |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                       |
| `anthropic-version`                         | `2023-06-01`                                                                                                                   |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                       |
| प्रति-कनेक्शन redact-thinking बीटा टॉगल     | उन अपस्ट्रीम के लिए `redact-thinking-2026-02-12` जोड़ता है, जिन्हें विशेष रूप से रेडैक्टेड थिंकिंग स्ट्रीम की आवश्यकता होती है |
| प्रति-कनेक्शन summarized thinking टॉगल      | उन CC Compatible थिंकिंग अनुरोधों में `display: "summarized"` जोड़ता है, जिनमें पहले से डिस्प्ले मोड सेट नहीं था               |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                                         |
| `x-app`                                     | `cli`                                                                                                                          |
| `X-Stainless-*`                             | विभिन्न Stainless SDK हेडर (भाषा, पैकेज संस्करण, OS, आर्किटेक्चर आदि)                                                          |

यही अनुरोधों को अपस्ट्रीम WAF / क्लाइंट अनुमति-सूची से गुज़रने देता है।

---

## समस्या निवारण

**`{"error":{"message":"unauthorized client detected, ..."}}`** — आपका अनुरोध
Claude Code वायर इमेज से मेल नहीं खाता। ऐसा तब होता है, जब प्रदाता को
`anthropic-compatible-cc` के बजाय `openai-compatible-chat` के रूप में कॉन्फ़िगर किया
गया हो, या स्टार्टअप पर `ENABLE_CC_COMPATIBLE_PROVIDER=true` फ़्लैग सेट न किया गया हो।

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"अमान्य टोकन"। वायर इमेज सही है, लेकिन API कुंजी अस्वीकार कर दी गई है। AgentRouter
डैशबोर्ड में एक नई कुंजी जनरेट करें और कनेक्शन अपडेट करें।

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter के मॉडरेशन हुक ने अनुरोध की सामग्री अस्वीकार कर दी है,
या कुंजी का प्लान अनुरोधित मॉडल की अनुमति नहीं देता। कोई अलग प्रॉम्प्ट या मॉडल
आज़माएँ; यदि कोई अहानिकर प्रॉम्प्ट लगातार ब्लॉक हो रहा है, तो AgentRouter सहायता
से संपर्क करें।

**केवल विशिष्ट मॉडलों पर `[400]: content-blocked`** — अधिकांश AgentRouter प्लान
केवल मॉडलों के एक उपसमुच्चय (उदा. `claude-opus-4-6`) की अनुमति देते हैं। कुंजी
मान्य होने के बावजूद अन्य मॉडल ID `unauthorized_client_error` लौटाती हैं।
AgentRouter डैशबोर्ड में जाँचें कि आपके प्लान में कौन-से मॉडल शामिल हैं।

**omniroute लॉग में `Invalid JSON response from provider (reset after Ns)`** —
अपस्ट्रीम ने गैर-JSON बॉडी लौटाई है (आमतौर पर WAF से मिला HTML त्रुटि पृष्ठ)।
इसका सामान्यतः अर्थ है कि अनुरोध AgentRouter बैकएंड तक कभी पहुँचा ही नहीं —
दोबारा जाँचें कि प्रदाता ID `anthropic-compatible-cc-` से शुरू होती है (अंत में
डैश पर ध्यान दें — `open-sse/services/claudeCodeCompatible.ts` में
`CLAUDE_CODE_COMPATIBLE_PREFIX` देखें) और फ़ीचर फ़्लैग सक्षम है।

**AgentRouter प्रदाता पहले से मौजूद होने के बावजूद `unauthorized client detected`
/ HTML त्रुटि पृष्ठ** — संभवतः आपके पास **एक से अधिक** AgentRouter प्रदाता हैं
और आपका अनुरोध गलत प्रदाता तक पहुँच रहा है। यदि `agentrouter` प्रीफ़िक्स के साथ
कोई बचा हुआ, मैन्युअल रूप से बनाया गया `anthropic-compatible-*` (गैर-`cc`) या
`openai-compatible-chat-*` प्रदाता बनाया गया था, तो वह `agentrouter/<model>` मॉडल
ID का स्वामी हो सकता है (और कॉम्बो उसे नोड ID द्वारा संदर्भित कर सकते हैं), इसलिए
ट्रैफ़िक उस प्रदाता की ओर रूट होता है — जो एक सामान्य User-Agent भेजता है और
अस्वीकार हो जाता है — न कि उस बिल्ट-इन `agentrouter` प्रदाता की ओर, जिसमें सही
वायर इमेज पहले से शामिल है। omniroute लॉग में जाँचें कि मॉडल वास्तव में कहाँ
रिज़ॉल्व होता है (`ROUTING` टैग
`agentrouter/<model> → <providerId>/<model>` दिखाता है); यदि `<providerId>`
`agentrouter` नहीं है, तो नेटिव प्रदाता पर समेकित करें: कॉम्बो को
`agentrouter/<model>` (providerId `agentrouter`) की ओर इंगित करें और डुप्लिकेट
compatible प्रदाताओं को हटा दें। नेटिव प्रदाता को किसी वायर-इमेज कॉन्फ़िगरेशन या
`customUserAgent` की आवश्यकता नहीं है।

---

## यह भी देखें

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web प्रदाता एकीकरण संबंधी टिप्पणियाँ
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — निःशुल्क-स्तर प्रदाता
  सूची
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — वायर इमेज कार्यान्वयन
