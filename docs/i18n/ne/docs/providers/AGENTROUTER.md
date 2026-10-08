# AgentRouter Setup Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) एउटा Anthropic-संगत रिले हो जसले Claude तथा अन्य मोडेलहरू पुनः बिक्री गर्छ, प्रायः प्रत्यक्ष Anthropic API भन्दा कम मूल्यमा। यसलाई आधिकारिक Claude Code क्लाइन्टका लागि ड्रप-इन `ANTHROPIC_BASE_URL` प्रतिस्थापनका रूपमा डिजाइन गरिएको छ, त्यसैले यसले Claude Code को वायर इमेजसँग मेल खाने ट्राफिक मात्र स्वीकार गर्छ (विशिष्ट User-Agent, `anthropic-beta` फ्ल्यागहरू, Stainless SDK हेडरहरू आदि)।

## द्रुत सुरुवात — नेटिभ `agentrouter` प्रदायक प्रयोग गर्नुहोस् (सिफारिस गरिएको)

अधिकांश प्रयोगकर्ताका लागि, **कुनै विशेष सेटअप आवश्यक पर्दैन**। OmniRoute मा पूर्ण Claude Code वायर इमेज पहिल्यै समावेश गरिएको बिल्ट-इन `agentrouter` प्रदायक आउँछ (`open-sse/config/providerRegistry.ts` → `agentrouter` हेर्नुहोस्)। यसलाई प्रयोग गर्न:

1. **ड्यासबोर्ड → प्रदायकहरू → प्रदायक थप्नुहोस्** खोल्नुहोस्।
2. सूचीबाट **AgentRouter** चयन गर्नुहोस्।
3. आफ्नो `sk-...` API कुञ्जी टाँस्नुहोस् र सुरक्षित गर्नुहोस्।

यति नै हो — वातावरणीय चरहरू वा आफूअनुकूल प्रदायक प्रकार आवश्यक पर्दैन। बिल्ट-इन मोडेलहरूमा `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, र `deepseek-v3.2` समावेश छन्।

यस मार्गदर्शिकाको बाँकी भागले **उन्नत मार्ग** समेट्छ: `anthropic-compatible-cc-*` प्रदायक प्रकारको प्रयोग। वायर इमेजमाथि थप नियन्त्रण आवश्यक हुँदा यसलाई प्रयोग गर्नुहोस् — उदाहरणका लागि, नेटिभ प्रदायक रजिस्ट्रीमा अझै नरहेका अन्य AgentRouter-जस्ता रिलेहरूमा जडान गर्दा, वा आधार URL, च्याट पथ वा हेडर सेट अधिलेखन गर्दा।

---

## उन्नत: Claude Code-संगत प्रदायक प्रकारमार्फत जडान गर्ने

OmniRoute ले सही वायर इमेजसहित Anthropic Messages API प्रयोग गर्ने **Claude Code-संगत** प्रदायक प्रकार (`anthropic-compatible-cc-*`) मार्फत AgentRouter (र यस्तै रिलेहरू) लाई पनि समर्थन गर्छ। `https://agentrouter.org` तर्फ निर्देशित सामान्य `openai-compatible-chat` प्रदायकले **काम गर्नेछैन** — Claude Code जस्तो नदेखिने अनुरोधहरूलाई अपस्ट्रिम WAF ले अस्वीकार गर्छ।

---

## पूर्वापेक्षाहरू

- AgentRouter खाता र API कुञ्जी। नयाँ साइनअपहरूले परियोजनाको [README](../README.md) मा रहेको सहबद्ध लिङ्कमार्फत निःशुल्क क्रेडिट प्राप्त गर्छन्।
- `ENABLE_CC_COMPATIBLE_PROVIDER` फिचर फ्ल्याग सक्षम गरिएको अवस्थामा चलिरहेको OmniRoute (तल हेर्नुहोस्)।

## 1. CC-संगत प्रदायक प्रकार सक्षम गर्नुहोस्

Claude Code-संगत प्रदायक प्रकार फिचर फ्ल्यागद्वारा नियन्त्रित छ, किनभने यसले आधिकारिक Claude Code क्लाइन्टसँग निकै नजिकबाट मेल खाने ट्राफिक पठाउँछ। OmniRoute सुरु गर्नुअघि वातावरणीय चर सेट गरेर यसलाई सक्षम गर्नुहोस्:

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

पुनः सुरु गरेपछि, ड्यासबोर्डले विद्यमान OpenAI-संगत र Anthropic-संगत प्रवाहहरूका अतिरिक्त **Claude Code-संगत थप्नुहोस्** विकल्प देखाउँछ।

## 2. ड्यासबोर्डमा प्रदायक सिर्जना गर्नुहोस्

1. **ड्यासबोर्ड → प्रदायकहरू → प्रदायक थप्नुहोस्** खोल्नुहोस्।
2. **Claude Code-संगत थप्नुहोस्** चयन गर्नुहोस् (माथिको फ्ल्याग सेट गरिएको अवस्थामा मात्र देखिन्छ)।
3. फिल्डहरू भर्नुहोस्:

| फिल्ड    | मान                                                                  |
| -------- | -------------------------------------------------------------------- |
| नाम      | `AgentRouter` (वा कुनै पनि लेबल)                                     |
| उपसर्ग   | `agentrouter` (लगहरू र ड्यासबोर्डमा देखाइने मैत्रीपूर्ण उपनाम)       |
| आधार URL | `https://agentrouter.org`                                            |
| च्याट पथ | `/v1/messages?beta=true` (पूर्वनिर्धारित — जस्ताको तस्तै छोड्नुहोस्) |

> प्रामाणिक मोडेल पहिचानकर्ताले अझै पनि पूर्ण प्रदायक नोड ID प्रयोग गर्छ
> (`anthropic-compatible-cc-{uuid}/{model}`)। **उपसर्ग** भनेको अझ मैत्रीपूर्ण लग आउटपुटका लागि `src/lib/usage/callLogs.ts` द्वारा समाधान गरिने प्रदर्शन उपनाम मात्र हो।

4. (वैकल्पिक) आफ्नो API कुञ्जी **प्रमाणीकरण गर्नुहोस्** फिल्डमा टाँस्नुहोस् र सुरक्षित गर्नुअघि जडान पुष्टि गर्न **जाँच गर्नुहोस्** मा क्लिक गर्नुहोस्।
5. **थप्नुहोस्** मा क्लिक गर्नुहोस्।

सिर्जना भएपछि, प्रदायक खोल्नुहोस् र आफ्नो AgentRouter API कुञ्जी (`sk-...`) सहित एउटा **जडान** थप्नुहोस्। जडानको `test_status` `active` हुनुपर्छ।

## 3. यसलाई कम्बोमार्फत वा सिधै प्रयोग गर्नुहोस्

आफ्नो प्रदायकको उपसर्गलाई नेमस्पेसका रूपमा प्रयोग गरेर मोडेल सन्दर्भ गर्नुहोस्:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

क्यानोनिकल मोडेल ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` ले पनि काम गर्छ
र यही नै डेटाबेस तथा कम्बो कन्फिगरेसनमा देखिन्छ।

वा अन्य कुनै प्रदायकजस्तै राउटिङ, फलब्याक, र कोटा व्यवस्थापनका लागि यसलाई कम्बोमा
थप्नुहोस्।

---

## वायर इमेजका विवरणहरू

सन्दर्भका लागि, cc-compatible ब्रिजले प्रत्येक अपस्ट्रिम अनुरोधमा निम्न कुरा पठाउँछ
(`open-sse/services/claudeCodeCompatible.ts` हेर्नुहोस्):

| हेडर                                        | मान                                                                                                            |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                             |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                                       |
| `anthropic-version`                         | `2023-06-01`                                                                                                   |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                       |
| प्रति-कनेक्सन redact-thinking बिटा टगल      | विशेष रूपमा रेड्याक्ट गरिएका थिंकिङ स्ट्रिम आवश्यक पर्ने अपस्ट्रिमहरूका लागि `redact-thinking-2026-02-12` थप्छ |
| प्रति-कनेक्सन summarized thinking टगल       | पहिले नै डिस्प्ले मोड सेट नगरेका CC Compatible थिंकिङ अनुरोधहरूमा `display: "summarized"` थप्छ                 |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                         |
| `x-app`                                     | `cli`                                                                                                          |
| `X-Stainless-*`                             | विभिन्न Stainless SDK हेडरहरू (भाषा, प्याकेज संस्करण, OS, आर्किटेक्चर आदि)                                     |

यसैले अनुरोधहरूलाई अपस्ट्रिम WAF / क्लाइन्ट ह्वाइटलिस्ट पार गर्न दिन्छ।

---

## समस्या समाधान

**`{"error":{"message":"unauthorized client detected, ..."}}`** — तपाईंको अनुरोध
Claude Code वायर इमेजसँग मेल खाएन। प्रदायकलाई `anthropic-compatible-cc` को सट्टा
`openai-compatible-chat` का रूपमा कन्फिगर गरिएको बेला, वा स्टार्टअपमा
`ENABLE_CC_COMPATIBLE_PROVIDER=true` फ्ल्याग सेट नगरिएको बेला यस्तो हुन्छ।

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"अमान्य टोकन"। वायर इमेज सही छ तर API की अस्वीकार गरिएको छ। AgentRouter
ड्यासबोर्डमा नयाँ की सिर्जना गर्नुहोस् र कनेक्सन अद्यावधिक गर्नुहोस्।

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter को मोडरेसन हुकले अनुरोधको सामग्री अस्वीकार गर्यो, वा
कीको योजनाले अनुरोध गरिएको मोडेल प्रयोग गर्न अनुमति दिँदैन। फरक प्रम्प्ट वा मोडेल
प्रयास गर्नुहोस्; सामान्य प्रम्प्ट निरन्तर ब्लक भएमा AgentRouter समर्थनलाई सम्पर्क
गर्नुहोस्।

**विशेष मोडेलहरूमा मात्र `[400]: content-blocked`** — धेरैजसो AgentRouter योजनाहरूले
मोडेलहरूको एउटा उपसमूह मात्र प्रयोग गर्न दिन्छन् (जस्तै `claude-opus-4-6`)। की मान्य
भए पनि अन्य मोडेल ID हरूले `unauthorized_client_error` फर्काउँछन्। तपाईंको योजनाले
कुन-कुन मोडेल समेट्छ भन्ने कुरा AgentRouter ड्यासबोर्डमा जाँच गर्नुहोस्।

**omniroute लगहरूबाट प्राप्त `Invalid JSON response from provider (reset after Ns)`** —
अपस्ट्रिमले गैर-JSON बडी फर्कायो (सामान्यतया WAF बाट आएको HTML त्रुटि पृष्ठ)।
यसको अर्थ प्रायः अनुरोध AgentRouter ब्याकइन्डसम्म कहिल्यै पुगेन — प्रदायक ID
`anthropic-compatible-cc-` बाट सुरु हुन्छ कि हुँदैन पुनः जाँच गर्नुहोस् (अन्तिम ड्यासमा
ध्यान दिनुहोस् — `open-sse/services/claudeCodeCompatible.ts` मा
`CLAUDE_CODE_COMPATIBLE_PREFIX` हेर्नुहोस्) र फिचर फ्ल्याग सक्षम भएको सुनिश्चित गर्नुहोस्।

**AgentRouter प्रदायक पहिले नै अवस्थित भए पनि `unauthorized client detected` / HTML
त्रुटि पृष्ठ** — सम्भवतः तपाईंसँग **एकभन्दा बढी** AgentRouter प्रदायक छन् र तपाईंको
अनुरोध गलत प्रदायकमा पुगिरहेको छ। यदि `agentrouter` उपसर्गसहित बाँकी रहेको हातैले
बनाइएको `anthropic-compatible-*` (गैर-`cc`) वा `openai-compatible-chat-*` प्रदायक
सिर्जना गरिएको थियो भने, त्यसले `agentrouter/<model>` मोडेल ID हरू आफ्नो बनाउन सक्छ
(र कम्बोहरूले त्यसलाई नोड ID मार्फत सन्दर्भ गर्न सक्छन्), जसका कारण ट्राफिक सही
वायर इमेजसहित आउने बिल्ट-इन `agentrouter` प्रदायकको सट्टा त्यही प्रदायकमा राउट हुन्छ —
जसले सामान्य User-Agent पठाउँछ र अस्वीकार हुन्छ। मोडेल वास्तवमा कहाँ रिजल्भ हुन्छ
भनेर omniroute लगहरूमा जाँच गर्नुहोस् (`ROUTING` ट्यागले
`agentrouter/<model> → <providerId>/<model>` देखाउँछ); यदि `<providerId>`
`agentrouter` होइन भने, नेटिभ प्रदायकमा एकीकृत गर्नुहोस्: कम्बोहरूलाई
`agentrouter/<model>` (providerId `agentrouter`) तर्फ देखाउनुहोस् र डुप्लिकेट
compatible प्रदायकहरू मेटाउनुहोस्। नेटिभ प्रदायकलाई वायर-इमेज कन्फिगरेसन वा
`customUserAgent` कुनै पनि आवश्यक पर्दैन।

---

## यो पनि हेर्नुहोस्

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web प्रदायक एकीकरणसम्बन्धी टिप्पणीहरू
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — निःशुल्क-स्तरका प्रदायकहरूको
  सूची
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — वायर इमेज कार्यान्वयन
