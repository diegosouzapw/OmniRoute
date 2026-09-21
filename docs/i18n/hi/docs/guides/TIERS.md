# OmniRoute Tiers — User Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute 352 समर्थित प्रदाताओं को 3 आर्थिक टियर में व्यवस्थित करता है। प्रत्येक
अनुरोध क्रमवार इनके माध्यम से जाता है, जब तक कि कोई सफल प्रतिक्रिया नहीं देता — इस तरह
बिना कोई फ़ॉलबैक कोड लिखे आपको सबसे सस्ती व्यावहारिक प्रतिक्रिया मिलती है।

## टियर 1 — सदस्यता

**वे प्रदाता जिनके लिए आप पहले से भुगतान करते हैं।** OmniRoute कोटा समाप्त होने से पहले
उसका पूरा उपयोग करता है।

| प्रदाता                        | टियर 1 में होने का कारण                          |
| ------------------------------ | ------------------------------------------------ |
| Claude Code OAuth              | Anthropic Pro/Team — निश्चित दर, अक्सर अप्रयुक्त |
| OpenAI Codex (ChatGPT सदस्यता) | Plus/Team में Codex कोटा शामिल है                |
| GitHub Copilot                 | प्रति-सीट — कोटा मासिक रीसेट होता है             |
| Cursor IDE                     | Pro प्लान का कोटा                                |
| Antigravity / Devin Desktop    | अंतर्निहित कोटा                                  |

**रणनीति**: मॉडल की क्षमताओं के अनुरूप हर अनुरोध को पहले यहाँ रूट करें।
कोटा ट्रैकर निकट आते रीसेट की निगरानी करता है और `reset-aware`
कॉम्बो रणनीति उसी के अनुसार प्राथमिकता देती है। पहले टियर 1 पर रूट करने और कोटा
समाप्त होने पर ही सशुल्क टियर पर जाने के लिए `auto/thrifty` id का उपयोग करें — या
प्लान में शामिल क्षमता तक सीमित रहने और अन्यथा विफल होने के लिए `auto/subscription`
का उपयोग करें। [सदस्यता-प्रथम रूटिंग](../routing/SUBSCRIPTION_LADDER.md) देखें।

## टियर 2 — सस्ता

**प्रति 1M टोकन $1 से कम शुल्क वाले भुगतान-प्रति-टोकन प्रदाता।** अधिक मात्रा वाले कार्य
या टियर 1 कोटा की सीमाएँ पूरी हो जाने के बाद उपयोग के लिए आरक्षित।

| प्रदाता                     | मूल्य (इनपुट/आउटपुट)   | विशेषताएँ           |
| --------------------------- | ---------------------- | ------------------- |
| DeepSeek V4 Pro             | $0.27 / $1.10 प्रति 1M | कोड, तर्कशक्ति      |
| GLM-4.5                     | $0.60 / $2.20 प्रति 1M | लंबा कॉन्टेक्स्ट    |
| MiniMax M1                  | $0.20 / $1.10 प्रति 1M | गति                 |
| Qwen Coder                  | $0.30 / $1.20 प्रति 1M | कोड                 |
| OpenRouter (मूल्य-अनुकूलित) | परिवर्तनीय             | 100+ मॉडल, डायनेमिक |

**रणनीति**: कॉम्बो `cost-optimized` उस सबसे कम $/टोकन वाले मॉडल को चुनता है, जो
कार्य के क्षमता फ़िल्टर (विज़न, JSON मोड, टूल्स, अधिकतम-कॉन्टेक्स्ट) को पूरा करता है।

## टियर 3 — निःशुल्क

**शून्य-लागत प्रदाता** — निःशुल्क टियर, क्रेडिट प्रोग्राम, OAuth दैनिक कोटा।

| प्रदाता          | निःशुल्क कोटा / क्रेडिट                     |
| ---------------- | ------------------------------------------- |
| Kiro AI          | निःशुल्क Claude टियर (उदार उचित-उपयोग)      |
| OpenCode Free    | प्रमाणीकरण की आवश्यकता नहीं, उदार दर सीमाएँ |
| Qoder            | निःशुल्क OAuth                              |
| Google Vertex AI | नए खाते के लिए $300 के क्रेडिट              |
| Amazon Q         | AWS उपयोगकर्ताओं के लिए निःशुल्क टियर       |
| Pollinations     | खुला सार्वजनिक API                          |
| Cloudflare AI    | Workers AI का निःशुल्क टियर                 |

**रणनीति**: बजट सीमा वाला कॉम्बो `auto`, टियर 1+2 के विफल होने पर
या `useFreeOnly=true` सेट होने पर अनुरोधों को यहाँ रूट करता है। निःशुल्क प्रदाताओं की
दर सीमाएँ अक्सर अधिक कठोर होती हैं — सर्किट ब्रेकर बैकऑफ़ के बाद उन्हें पुनः सक्रिय करता है।

## टियर कॉन्फ़िगर करना

डैशबोर्ड → **टियर** → अपने प्रदाता निर्दिष्ट करें। डिफ़ॉल्ट (`tierDefaults.json` से) व्यावहारिक
हैं; जब आपको विशिष्ट सदस्यताओं को प्राथमिकता देनी हो या प्रदाताओं को बाहर रखना हो, तब इन्हें संपादित करें।

Auto-Combo की 16-कारक स्कोरिंग टियर को भी ध्यान में रखती है। देखें
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md)।

## टेलीमेट्री

डैशबोर्ड → **उपयोग** प्रत्येक टियर पर प्रतिदिन खर्च किए गए टोकन दिखाता है। इसका उपयोग इन कार्यों के लिए करें:

- पुष्टि करें कि टियर 1 का पूरा उपयोग हो रहा है (अन्यथा आप सदस्यता का मूल्य व्यर्थ कर रहे हैं)
- पहचानें कि टियर 2 के कौन-से मॉडल सबसे अधिक चुने जाते हैं (उन्हें 1-2 तक समेकित करें)
- सत्यापित करें कि टियर 3 परीक्षण/अन्वेषण कार्यभार पर धन बचाता है

## सामान्य पैटर्न

### पूर्णतः निःशुल्क कार्यभार

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

टियर 3 की ओर अत्यधिक प्राथमिकता देता है; टियर 3 अनुपलब्ध होने पर ही टियर 2 का उपयोग करता है।

### सस्ते फ़ॉलबैक के साथ सदस्यता-प्रथम

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

टियर 1 → टियर 2 → टियर 3 से मेल खाती स्पष्ट क्रमबद्ध सूची।
