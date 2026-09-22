# AgentRouter Setup Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) हा Anthropic-सुसंगत रिले आहे, जो Claude आणि इतर मॉडेल्सची पुनर्विक्री करतो, अनेकदा थेट Anthropic API पेक्षा कमी किमतीत. अधिकृत Claude Code क्लायंटसाठी थेट वापरता येईल असा `ANTHROPIC_BASE_URL` पर्याय म्हणून तो डिझाइन केला आहे, त्यामुळे तो फक्त Claude Code च्या वायर प्रतिरूपाशी जुळणारी ट्रॅफिक स्वीकारतो (विशिष्ट User-Agent, `anthropic-beta` फ्लॅग्स, Stainless SDK हेडर्स इत्यादी).

## झटपट सुरुवात — मूळ `agentrouter` प्रदाता वापरा (शिफारस केलेले)

बहुतेक वापरकर्त्यांसाठी, **कोणत्याही विशेष सेटअपची आवश्यकता नाही**. OmniRoute मध्ये संपूर्ण Claude Code वायर प्रतिरूप आधीपासूनच समाविष्ट असलेला अंगभूत `agentrouter` प्रदाता येतो (`open-sse/config/providerRegistry.ts` → `agentrouter` पहा). तो वापरण्यासाठी:

1. **डॅशबोर्ड → प्रदाते → प्रदाता जोडा** उघडा.
2. सूचीमधून **AgentRouter** निवडा.
3. तुमची `sk-...` API की पेस्ट करा आणि जतन करा.

इतकेच — कोणतेही पर्यावरणीय चल किंवा सानुकूल प्रदाता प्रकार आवश्यक नाही. अंगभूत मॉडेल्समध्ये `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, आणि `deepseek-v3.2` यांचा समावेश आहे.

या मार्गदर्शिकेचा उर्वरित भाग **प्रगत पद्धत** समाविष्ट करतो: `anthropic-compatible-cc-*` प्रदाता प्रकार वापरणे. वायर प्रतिरूपावर अधिक नियंत्रण आवश्यक असताना ही पद्धत वापरा — उदाहरणार्थ, मूळ प्रदाता रजिस्ट्रीमध्ये अद्याप समाविष्ट नसलेल्या इतर AgentRouter-शैलीतील रिलेशी कनेक्ट करताना किंवा बेस URL, चॅट पथ अथवा हेडर संच अधिलिखित करताना.

---

## प्रगत: Claude Code सुसंगत प्रदाता प्रकाराद्वारे कनेक्ट करणे

OmniRoute **Claude Code सुसंगत** प्रदाता प्रकाराद्वारे (`anthropic-compatible-cc-*`) AgentRouter (आणि तत्सम रिले) ला देखील समर्थन देते; हा प्रकार योग्य वायर प्रतिरूपासह Anthropic Messages API वापरतो. `https://agentrouter.org` कडे निर्देश करणारा सर्वसाधारण `openai-compatible-chat` प्रदाता **कार्य करणार नाही** — Claude Code सारख्या न दिसणाऱ्या विनंत्या अपस्ट्रीम WAF नाकारतो.

---

## पूर्वापेक्षित गोष्टी

- AgentRouter खाते आणि API की. नवीन नोंदणी करणाऱ्यांना प्रकल्पाच्या [README](../README.md) मधील संलग्न दुव्याद्वारे मोफत क्रेडिट्स मिळतात.
- `ENABLE_CC_COMPATIBLE_PROVIDER` वैशिष्ट्य फ्लॅग सक्षम करून चालणारे OmniRoute (खाली पहा).

## 1. CC-सुसंगत प्रदाता प्रकार सक्षम करा

Claude Code सुसंगत प्रदाता प्रकार वैशिष्ट्य फ्लॅगच्या मागे ठेवला आहे, कारण तो अधिकृत Claude Code क्लायंटचे जवळून अनुकरण करणारी ट्रॅफिक पाठवतो. OmniRoute सुरू करण्यापूर्वी पर्यावरणीय चल सेट करून तो सक्षम करा:

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

पुन्हा सुरू केल्यानंतर, विद्यमान OpenAI-सुसंगत आणि Anthropic-सुसंगत प्रक्रियांव्यतिरिक्त डॅशबोर्डमध्ये **Claude Code सुसंगत प्रदाता जोडा** हा पर्याय दिसतो.

## 2. डॅशबोर्डमध्ये प्रदाता तयार करा

1. **डॅशबोर्ड → प्रदाते → प्रदाता जोडा** उघडा.
2. **Claude Code सुसंगत प्रदाता जोडा** निवडा (वरील फ्लॅग सेट केलेला असतानाच हा पर्याय दिसतो).
3. फील्ड्स भरा:

| फील्ड   | मूल्य                                                            |
| ------- | ---------------------------------------------------------------- |
| नाव     | `AgentRouter` (किंवा कोणतेही लेबल)                               |
| उपसर्ग  | `agentrouter` (लॉग्स आणि डॅशबोर्डमध्ये दाखवला जाणारा सोपा उपनाम) |
| बेस URL | `https://agentrouter.org`                                        |
| चॅट पथ  | `/v1/messages?beta=true` (डीफॉल्ट — जसे आहे तसेच ठेवा)           |

> प्रमाणित मॉडेल अभिज्ञापक अद्याप पूर्ण प्रदाता नोड ID वापरतो
> (`anthropic-compatible-cc-{uuid}/{model}`). **उपसर्ग** हा केवळ अधिक सुलभ लॉग आउटपुटसाठी `src/lib/usage/callLogs.ts` द्वारे निश्चित केला जाणारा प्रदर्शन उपनाम आहे.

4. (पर्यायी) जतन करण्यापूर्वी कनेक्टिव्हिटीची पुष्टी करण्यासाठी **प्रमाणित करा** फील्डमध्ये तुमची API की पेस्ट करा आणि **तपासा** क्लिक करा.
5. **जोडा** क्लिक करा.

प्रदाता तयार झाल्यानंतर, तो उघडा आणि तुमच्या AgentRouter API कीसह (`sk-...`) एक **कनेक्शन** जोडा. कनेक्शनचे `test_status` बदलून `active` झाले पाहिजे.

## 3. कॉम्बोद्वारे किंवा थेट वापरा

तुमच्या प्रदात्याचा प्रीफिक्स नेमस्पेस म्हणून वापरून मॉडेलचा संदर्भ द्या:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

कॅनॉनिकल मॉडेल ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` हेदेखील कार्य करते
आणि डेटाबेस व कॉम्बो कॉन्फिगरेशनमध्ये हेच दिसते.

किंवा इतर कोणत्याही प्रदात्याप्रमाणे रूटिंग, फॉलबॅक आणि कोटा व्यवस्थापनासाठी ते
कॉम्बोमध्ये जोडा.

---

## वायर इमेजचे तपशील

संदर्भासाठी, cc-सुसंगत ब्रिज प्रत्येक अपस्ट्रीम विनंतीवर पुढील माहिती पाठवतो
(`open-sse/services/claudeCodeCompatible.ts` पाहा):

| हेडर                                           | मूल्य                                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `Authorization`                                | `Bearer <api-key>`                                                                                |
| `User-Agent`                                   | `claude-cli/2.1.258 (external, sdk-cli)`                                                          |
| `anthropic-version`                            | `2023-06-01`                                                                                      |
| `anthropic-beta`                               | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                          |
| प्रत्येक-कनेक्शनसाठी redact-thinking बीटा टॉगल | विशेषतः संपादित थिंकिंग स्ट्रीम आवश्यक असलेल्या अपस्ट्रीमसाठी `redact-thinking-2026-02-12` जोडतो  |
| प्रत्येक-कनेक्शनसाठी संक्षिप्त थिंकिंग टॉगल    | आधीच डिस्प्ले मोड सेट नसलेल्या CC Compatible थिंकिंग विनंत्यांमध्ये `display: "summarized"` जोडतो |
| `anthropic-dangerous-direct-browser-access`    | `true`                                                                                            |
| `x-app`                                        | `cli`                                                                                             |
| `X-Stainless-*`                                | विविध Stainless SDK हेडर (भाषा, पॅकेज आवृत्ती, OS, आर्किटेक्चर इ.)                                |

यामुळे विनंत्या अपस्ट्रीम WAF / क्लायंट श्वेतसूचीमधून पुढे जाऊ शकतात.

---

## समस्यानिवारण

**`{"error":{"message":"unauthorized client detected, ..."}}`** — तुमची विनंती
Claude Code वायर इमेजशी जुळली नाही. प्रदाता `anthropic-compatible-cc` ऐवजी
`openai-compatible-chat` म्हणून कॉन्फिगर केलेला असताना किंवा स्टार्टअपच्या वेळी
`ENABLE_CC_COMPATIBLE_PROVIDER=true` फ्लॅग सेट केलेला नसताना असे घडते.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"अवैध टोकन". वायर इमेज योग्य आहे, परंतु API की नाकारली गेली आहे. AgentRouter
डॅशबोर्डमध्ये नवीन की तयार करा आणि कनेक्शन अपडेट करा.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter च्या मॉडरेशन हुकने विनंतीमधील मजकूर नाकारला आहे किंवा
कीच्या प्लॅनमध्ये विनंती केलेल्या मॉडेलला परवानगी नाही. वेगळा प्रॉम्प्ट किंवा मॉडेल
वापरून पाहा; निरुपद्रवी प्रॉम्प्ट सातत्याने ब्लॉक होत असल्यास AgentRouter सपोर्टशी
संपर्क साधा.

**`[400]: content-blocked` केवळ विशिष्ट मॉडेलवर** — बहुतांश AgentRouter प्लॅन
फक्त मॉडेलच्या एका उपसंचाला (उदा. `claude-opus-4-6`) परवानगी देतात. की वैध असली
तरी इतर मॉडेल ID `unauthorized_client_error` परत करतात. तुमच्या प्लॅनमध्ये कोणती
मॉडेल समाविष्ट आहेत ते AgentRouter डॅशबोर्डमध्ये तपासा.

**omniroute लॉगमधील `Invalid JSON response from provider (reset after Ns)`** —
अपस्ट्रीमने JSON नसलेला प्रतिसाद-बॉडी परत केला (सामान्यतः WAF कडून आलेले HTML
त्रुटी पृष्ठ). याचा सामान्यतः अर्थ असा होतो की विनंती AgentRouter बॅकएंडपर्यंत
पोहोचलीच नाही — प्रदाता ID `anthropic-compatible-cc-` ने सुरू होत असल्याचे पुन्हा
तपासा (शेवटचा डॅश लक्षात घ्या — `open-sse/services/claudeCodeCompatible.ts`
मधील `CLAUDE_CODE_COMPATIBLE_PREFIX` पाहा) आणि फीचर फ्लॅग सक्षम असल्याची खात्री करा.

**AgentRouter प्रदाता आधीपासून अस्तित्वात असूनही `unauthorized client detected` /
HTML त्रुटी पृष्ठ** — तुमच्याकडे बहुधा **एकापेक्षा जास्त** AgentRouter प्रदाते आहेत
आणि तुमची विनंती चुकीच्या प्रदात्याकडे जात आहे. `agentrouter` प्रीफिक्ससह तयार केलेला
एखादा शिल्लक राहिलेला हाताने बनवलेला `anthropic-compatible-*` (`cc` नसलेला) किंवा
`openai-compatible-chat-*` प्रदाता असल्यास, तो `agentrouter/<model>` मॉडेल ID चा
मालक होऊ शकतो (आणि कॉम्बो नोड ID द्वारे त्याचा संदर्भ घेऊ शकतात), त्यामुळे ट्रॅफिक
आधीपासूनच योग्य वायर इमेजसह उपलब्ध असलेल्या अंगभूत `agentrouter` प्रदात्याऐवजी त्या
प्रदात्याकडे रूट होते — जो सामान्य User-Agent पाठवतो आणि त्यामुळे नाकारला जातो.
मॉडेल प्रत्यक्षात कुठे रिझॉल्व्ह होते ते omniroute लॉगमध्ये तपासा (`ROUTING` टॅग
`agentrouter/<model> → <providerId>/<model>` दाखवतो); `<providerId>` हे
`agentrouter` नसल्यास, मूळ प्रदात्यावर एकत्रीकरण करा: कॉम्बोना
`agentrouter/<model>` कडे निर्देशित करा (providerId `agentrouter`) आणि डुप्लिकेट
सुसंगत प्रदाते हटवा. मूळ प्रदात्याला वायर-इमेज कॉन्फिगरेशन किंवा
`customUserAgent` ची आवश्यकता नसते.

---

## हे देखील पहा

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web प्रदाता एकत्रीकरणाच्या नोंदी
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — मोफत-स्तर प्रदात्यांची
  सूची
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — वायर इमेज अंमलबजावणी
