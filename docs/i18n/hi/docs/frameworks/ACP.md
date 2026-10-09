# ACP registry and registered CLI launchers (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute **CLI खोज**, **मूल Agent Client Protocol**, और
**लीगेसी stdio अडैप्टरों** को अलग रखता है। किसी इंस्टॉल किए गए बाइनरी का मिलना उसके
प्रमाणीकरण, मॉडल संगतता, या किसी प्रॉम्प्ट को संभालने की तत्परता को सिद्ध नहीं करता।

डैशबोर्ड इन्वेंटरी और कस्टम-एजेंट पंजीकरण के लिए `GET /api/acp/agents` और
`POST /api/acp/agents` का उपयोग करता है। ये केवल-स्थानीय प्रबंधन रूट हैं, प्रक्रियाएँ
आरंभ करने या प्रॉम्प्ट सबमिट करने के लिए कोई सार्वजनिक API नहीं। आंतरिक
`AcpManager` स्वचालित रूप से HTTP प्रदाता फ़ॉलबैक नहीं बनता।

## पंजीकृत अनुबंध

`config/cli-tools-manifest.json` अंतर्निहित लॉन्च बाइनरी, आर्ग्युमेंट और बैकएंड
मोड के लिए सत्य का स्रोत है। रजिस्ट्री अपनी परिभाषाएँ इसी मैनिफ़ेस्ट से प्राप्त
करती है। पहचान के परिणाम 60 सेकंड के लिए कैश किए जाते हैं।

- `acp`: Gemini अनुबंध `gemini --experimental-acp` लॉन्च करता है और
  आधिकारिक TypeScript SDK के माध्यम से नई-पंक्ति-सीमांकित ACP JSON-RPC में संचार करता है।
- `stdio-adapter`: अन्य पंजीकृत अनुबंध लीगेसी नई-पंक्ति इनपुट,
  stdout आउटपुट अडैप्टर बनाए रखते हैं। आउटपुट में दो सेकंड की निष्क्रियता उसकी प्रतिक्रिया
  समाप्त कर देती है। यह अडैप्टर उन CLI के लिए मूल ACP समर्थन को **प्रमाणित नहीं** करता।

Gemini अपने [CLI संदर्भ](https://geminicli.com/docs/cli/cli-reference/) में लॉन्च फ़्लैग का दस्तावेज़ीकरण करता है।
क्लाइंट आरंभीकरण, सत्र निर्माण, प्रॉम्प्ट अनुरोधों, सूचनाओं और रद्दीकरण के लिए
[आधिकारिक ACP SDK](https://github.com/agentclientprotocol/typescript-sdk) का उपयोग करता है।

कस्टम-एजेंट परिभाषाएँ व्यवस्थापक-नियंत्रित लॉन्च अनुबंध बनी रहती हैं।
किसी बाइनरी और आर्ग्युमेंट को पंजीकृत करना उस प्रक्रिया को सर्वर उपयोगकर्ता के स्थानीय
निष्पादन विशेषाधिकार देता है; पंजीकरण कोई सैंडबॉक्स नहीं है। संस्करण जाँच केवल
पंजीकृत एक्ज़ीक्यूटेबल और किसी मान्य संस्करण फ़्लैग को स्वीकार करती है।

## आंतरिक लॉन्च API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // केवल इस एजेंट को जानबूझकर असाइन किए गए प्रदाता वेरिएबल पास करें।
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // कॉल करने वाले एप्लिकेशन में प्रतिक्रिया का उपयोग करें।
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` पंजीकृत परिभाषा से एक्ज़ीक्यूटेबल और आर्ग्युमेंट का
समाधान करता है। कॉलर के लिए उपलब्ध एकमात्र विकल्प `cwd` और `env` हैं; पुराना
`spawn(agentId, binary, args, env)` सिग्नेचर और एक्ज़ीक्यूटेबल ओवरराइड
अस्वीकार किए जाते हैं। यह मैनेजर HTTP लॉन्च अनुबंधों का समर्थन नहीं करता।

चाइल्ड प्रक्रिया को वही ऑपरेटिंग सिस्टम, टर्मिनल, लोकेल और प्रमाणपत्र
अनुमति-सूची विरासत में मिलती है जो CLI लॉन्चरों के पास होती है। सर्वर/प्रदाता सीक्रेट
पैरेंट एनवायरनमेंट से कॉपी नहीं किए जाते। चुने गए CLI के लिए आवश्यक क्रेडेंशियल
स्पष्ट रूप से पास किए जाने चाहिए या उस CLI के अपने स्थानीय प्रमाणीकरण के माध्यम से
प्रदान किए जाने चाहिए। चाइल्ड प्रक्रिया के पास फिर भी स्थानीय उपयोगकर्ता की फ़ाइल-सिस्टम
अनुमतियाँ होती हैं और वह अपना कॉन्फ़िगरेशन पढ़ सकती है।

## मूल जीवनचक्र और सीमाएँ

1. पंजीकृत बाइनरी आरंभ करें, ACP को इनिशियलाइज़ करें, और चयनित कार्यशील
   डायरेक्टरी पर आधारित एक सत्र बनाएँ। इनिशियलाइज़ेशन की सीमा दस सेकंड है।
2. एक प्रॉम्प्ट सबमिट करें और केवल उस सत्र की टेक्स्ट सूचनाएँ एकत्र करें।
   पूर्णता का अर्थ प्रॉम्प्ट RPC प्रतिक्रिया है, stdout की निष्क्रियता की अवधि नहीं।
3. एक प्रॉम्प्ट समय-सीमा का उपयोग करें, जिसमें कोई भी अधूरा इनिशियलाइज़ेशन शामिल हो; डिफ़ॉल्ट
   120 सेकंड है। एक ही प्रक्रिया में समवर्ती प्रॉम्प्ट अस्वीकार किए जाते हैं।
4. मूल टाइमआउट होने पर, `session/cancel` का प्रयास करें और प्रक्रिया समाप्त करें।
   100 ms की सीमित विंडो समाप्ति से पहले सूचना को फ़्लश होने देती है।
5. इनिशियलाइज़ेशन विफल होने, कनेक्शन बंद होने, प्रक्रिया के बाहर निकलने, या कॉलर द्वारा
   उसे समाप्त करने पर ट्रांसपोर्ट स्थिति बंद करें और सत्र हटा दें।

टूल अनुमति अनुरोध अस्वीकार किए जाते हैं। किसी फ़ाइल-सिस्टम या टर्मिनल क्लाइंट
क्षमता का विज्ञापन नहीं किया जाता। ये प्रतिबंध स्वयं चाइल्ड बाइनरी को सैंडबॉक्स
नहीं करते या किसी CLI की अपनी प्राधिकरण सेटिंग को प्रतिस्थापित नहीं करते।

मूल टेक्स्ट और लीगेसी stdout/stderr, दोनों अधिकतम 1 MiB वर्ण बनाए रखते हैं,
और सबसे नए आउटपुट को ट्रंकेशन सूचना के साथ रखते हैं। SDK पार्सिंग से पहले किसी
एक मूल वायर फ़्रेम की सीमा 2 MiB बाइट है। बफ़र प्रत्येक प्रॉम्प्ट पर रीसेट होते हैं।

`kill(sessionId)` SIGTERM भेजता है, फिर यदि प्रक्रिया पाँच सेकंड के बाद भी
बाहर नहीं निकली है तो SIGKILL भेजता है। लीगेसी प्रॉम्प्ट टाइमआउट लिसनर और टाइमर
रिलीज़ करते हैं, लेकिन सत्र को किसी अन्य प्रॉम्प्ट के लिए उपलब्ध रखते हैं; काम पूरा होने पर
`kill()` या `killAll()` के लिए कॉलर ही उत्तरदायी रहते हैं।

## इवेंट और निरीक्षण

मैनेजर `stdout`, `stderr`, और `exit` उत्सर्जित करता है, प्रत्येक के साथ `sessionId`
होता है। `sessionError` एक सैनिटाइज़ किया गया ट्रांसपोर्ट त्रुटि संदेश देता है। संगतता
`error` इवेंट केवल तभी उत्सर्जित होता है जब उसका कोई सब्सक्राइबर हो, ताकि अनुपस्थित
बाइनरी किसी अनहैंडल्ड EventEmitter त्रुटि का कारण न बने।

- `getSession(sessionId)` एक प्रबंधित सत्र या `undefined` लौटाता है।
- `getActiveSessions()` रुके हुए या रुक रहे सत्रों को शामिल नहीं करता।
- `sendInput(sessionId, input)` केवल किसी सक्रिय लीगेसी अडैप्टर के लिए उपलब्ध है;
  मूल ACP अपनी JSON-RPC स्ट्रीम की सुरक्षा के लिए रॉ इनपुट अस्वीकार करता है।
- `killAll()` उस इंस्टेंस द्वारा प्रबंधित प्रत्येक सत्र को समाप्त करता है।

## सत्यापन सीमाएँ

नियतात्मक फ़िक्स्चर मूल हैंडशेक, टेक्स्ट आउटपुट, अस्वीकृत अनुमतियों,
रद्दीकरण, समवर्ती प्रॉम्प्ट, विफल इनिशियलाइज़ेशन, प्रक्रिया निकास, आउटपुट सीमाओं
और सीक्रेट अलगाव को कवर करते हैं। मौजूदा लीगेसी बफ़र/लिसनर रिग्रेशन भी कवर
रहते हैं। ये परीक्षण सक्रिय Gemini लॉगिन या सफल प्रदाता इन्फ़रेंस प्रदर्शित नहीं
करते; इनके लिए लक्ष्य एनवायरनमेंट में अलग से अधिकृत स्मोक टेस्ट आवश्यक है।

## संबंधित दस्तावेज़

- [एजेंट प्रोटोकॉल](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI लॉन्च अनुबंध](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI टूल](../reference/CLI-TOOLS.md)
- [A2A सर्वर](./A2A-SERVER.md)
- [क्लाउड एजेंट](./CLOUD_AGENT.md)
