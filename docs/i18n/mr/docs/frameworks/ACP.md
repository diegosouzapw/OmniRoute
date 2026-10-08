# ACP registry and registered CLI launchers (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute **CLI शोध**, **मूळ Agent Client Protocol**, आणि
**लेगसी stdio अडॅप्टर** वेगळे ठेवते. स्थापित बायनरी सापडल्याने तिचे
प्रमाणीकरण, मॉडेल सुसंगतता किंवा प्रॉम्प्ट हाताळण्याची सज्जता सिद्ध होत नाही.

डॅशबोर्ड इन्व्हेंटरी आणि कस्टम-एजंट नोंदणीसाठी `GET /api/acp/agents` आणि
`POST /api/acp/agents` वापरतो. हे केवळ स्थानिक व्यवस्थापन मार्ग आहेत; प्रक्रिया
सुरू करण्यासाठी किंवा प्रॉम्प्ट सबमिट करण्यासाठी असलेले सार्वजनिक API नाहीत. अंतर्गत
`AcpManager` आपोआप HTTP प्रदाता फॉलबॅक बनत नाही.

## नोंदणीकृत करार

अंगभूत लॉन्च बायनरी, आर्ग्युमेंट आणि बॅकएंड मोडसाठी
`config/cli-tools-manifest.json` हा अधिकृत स्रोत आहे. रजिस्ट्री तिच्या व्याख्या
त्या मॅनिफेस्टमधून प्राप्त करते. शोधाचे परिणाम 60 सेकंदांसाठी कॅश केले जातात.

- `acp`: Gemini करार `gemini --experimental-acp` लॉन्च करतो आणि अधिकृत
  TypeScript SDK द्वारे newline-delimited ACP JSON-RPC वापरून संवाद साधतो.
- `stdio-adapter`: इतर नोंदणीकृत करार लेगसी newline-input,
  stdout-output अडॅप्टर कायम ठेवतात. आउटपुट दोन सेकंद निष्क्रिय राहिल्यास त्याचा प्रतिसाद समाप्त होतो.
  हा अडॅप्टर त्या CLI साठी मूळ ACP समर्थन **प्रमाणित करत नाही**.

Gemini आपल्या [CLI संदर्भामध्ये](https://geminicli.com/docs/cli/cli-reference/) लॉन्च फ्लॅगचे दस्तऐवजीकरण करते.
क्लायंट प्रारंभीकरण, सेशन निर्मिती, प्रॉम्प्ट विनंत्या, सूचना आणि रद्दीकरणासाठी
[अधिकृत ACP SDK](https://github.com/agentclientprotocol/typescript-sdk) वापरतो.

कस्टम-एजंट व्याख्या प्रशासक-नियंत्रित लॉन्च करार म्हणून कायम राहतात.
बायनरी आणि आर्ग्युमेंट नोंदवल्याने त्या प्रक्रियेला सर्व्हर वापरकर्त्याचे स्थानिक
कार्यान्वयन विशेषाधिकार मिळतात; नोंदणी म्हणजे सँडबॉक्स नाही. आवृत्ती तपासण्या
केवळ नोंदणीकृत एक्झिक्युटेबल आणि मान्यताप्राप्त आवृत्ती फ्लॅग स्वीकारतात.

## अंतर्गत लॉन्च API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // या एजंटला जाणीवपूर्वक नियुक्त केलेली प्रदाता चलच फक्त पास करा.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // कॉल करणाऱ्या अनुप्रयोगामध्ये प्रतिसाद वापरा.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` नोंदणीकृत व्याख्येमधून एक्झिक्युटेबल आणि आर्ग्युमेंट
निश्चित करते. कॉलरसाठी उपलब्ध असलेले एकमेव पर्याय `cwd` आणि `env` आहेत; जुनी
`spawn(agentId, binary, args, env)` स्वाक्षरी आणि एक्झिक्युटेबल ओव्हरराइड
नाकारले जातात. हा व्यवस्थापक HTTP लॉन्च करारांना समर्थन देत नाही.

चाइल्ड प्रक्रियेला CLI लॉन्चरप्रमाणेच ऑपरेटिंग-सिस्टम, टर्मिनल, लोकेल आणि प्रमाणपत्र
अनुमतीसूची वारशाने मिळते. सर्व्हर/प्रदाता गुपिते पॅरेंट वातावरणातून कॉपी केली जात नाहीत.
निवडलेल्या CLI ला आवश्यक असलेली क्रेडेन्शियल्स स्पष्टपणे पास केली पाहिजेत किंवा त्या
CLI च्या स्वतःच्या स्थानिक प्रमाणीकरणाद्वारे पुरवली पाहिजेत. चाइल्डकडे तरीही स्थानिक
वापरकर्त्याच्या फाइलसिस्टम परवानग्या असतात आणि ती स्वतःचे कॉन्फिग वाचू शकते.

## मूळ जीवनचक्र आणि मर्यादा

1. नोंदणीकृत बायनरी सुरू करा, ACP प्रारंभ करा आणि निवडलेल्या कार्यरत डिरेक्टरीमध्ये
   रूट केलेले सेशन तयार करा. प्रारंभीकरणासाठी दहा सेकंदांची मर्यादा आहे.
2. प्रॉम्प्ट सबमिट करा आणि केवळ त्या सेशनसाठी मजकूर सूचना संकलित करा.
   प्रॉम्प्ट RPC प्रतिसाद म्हणजे पूर्णत्व; stdout शांत राहण्याचा कालावधी नव्हे.
3. अपूर्ण प्रारंभीकरणासह एकच प्रॉम्प्ट अंतिम मुदत वापरा; डीफॉल्ट
   120 सेकंद आहे. त्याच प्रक्रियेतील समकालीन प्रॉम्प्ट नाकारले जातात.
4. मूळ टाइमआउट झाल्यास, `session/cancel` चा प्रयत्न करा आणि प्रक्रिया समाप्त करा.
   100 ms ची मर्यादित विंडो समाप्तीपूर्वी सूचना फ्लश होऊ देते.
5. प्रारंभीकरण अयशस्वी झाल्यास, कनेक्शन बंद झाल्यास, प्रक्रिया बाहेर पडल्यास किंवा
   कॉलरने ती बंद केल्यास ट्रान्सपोर्ट स्थिती बंद करा आणि सेशन काढून टाका.

टूल परवानगी विनंत्या नाकारल्या जातात. कोणत्याही फाइलसिस्टम किंवा टर्मिनल क्लायंट
क्षमता जाहीर केल्या जात नाहीत. ही बंधने चाइल्ड बायनरीलाच सँडबॉक्स करत नाहीत किंवा
CLI च्या स्वतःच्या अधिकृतता सेटिंग्जची जागा घेत नाहीत.

मूळ मजकूर आणि लेगसी stdout/stderr दोन्ही जास्तीत जास्त 1 MiB वर्ण राखतात,
आणि छाटणीच्या सूचनेसह सर्वांत नवीन आउटपुट ठेवतात. SDK पार्सिंगपूर्वी स्वतंत्र
मूळ वायर फ्रेम 2 MiB बाइट्सपर्यंत मर्यादित असते. प्रत्येक प्रॉम्प्टसाठी बफर रीसेट होतात.

`kill(sessionId)` SIGTERM पाठवते आणि प्रक्रिया बाहेर पडली नसल्यास पाच सेकंदांनंतर
SIGKILL पाठवते. लेगसी प्रॉम्प्ट टाइमआउट लिसनर आणि टाइमर मुक्त करतात, परंतु
दुसऱ्या प्रॉम्प्टसाठी सेशन उपलब्ध ठेवतात; कार्य पूर्ण झाल्यावर `kill()` किंवा
`killAll()` कॉल करण्याची जबाबदारी कॉलरचीच राहते.

## इव्हेंट आणि तपासणी

व्यवस्थापक `stdout`, `stderr`, आणि `exit` उत्सर्जित करतो; प्रत्येकासोबत `sessionId`
असतो. `sessionError` निर्जंतुक केलेली ट्रान्सपोर्ट त्रुटी नोंदवते. सुसंगततेसाठीचा `error`
इव्हेंट केवळ त्याचा सदस्य असल्यासच उत्सर्जित होतो, त्यामुळे बायनरी उपलब्ध नसल्यास
न हाताळलेली EventEmitter त्रुटी उद्भवू शकत नाही.

- `getSession(sessionId)` व्यवस्थापित सेशन किंवा `undefined` परत करते.
- `getActiveSessions()` थांबलेली किंवा थांबवली जात असलेली सेशन वगळते.
- `sendInput(sessionId, input)` केवळ सक्रिय लेगसी अडॅप्टरसाठी उपलब्ध आहे;
  मूळ ACP आपल्या JSON-RPC स्ट्रीमचे संरक्षण करण्यासाठी कच्चे इनपुट नाकारते.
- `killAll()` त्या इन्स्टन्सद्वारे व्यवस्थापित प्रत्येक सेशन समाप्त करते.

## प्रमाणीकरणाच्या सीमा

निश्चिततावादी फिक्स्चर मूळ हँडशेक, मजकूर आउटपुट, नाकारलेल्या परवानग्या,
रद्दीकरण, समकालीन प्रॉम्प्ट, अयशस्वी प्रारंभीकरण, प्रक्रिया निर्गमन, आउटपुट मर्यादा
आणि गुपित विलगीकरण समाविष्ट करतात. विद्यमान लेगसी बफर/लिसनर रिग्रेशनचे
कव्हरेजही कायम आहे. या चाचण्या थेट Gemini लॉगिन किंवा प्रदात्याच्या यशस्वी
इन्फरन्सचे प्रदर्शन करत नाहीत; त्यासाठी लक्ष्य वातावरणात स्वतंत्रपणे अधिकृत केलेली
स्मोक चाचणी आवश्यक आहे.

## संबंधित दस्तऐवजीकरण

- [एजंट प्रोटोकॉल](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI लॉन्च करार](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI साधने](../reference/CLI-TOOLS.md)
- [A2A सर्व्हर](./A2A-SERVER.md)
- [क्लाउड एजंट](./CLOUD_AGENT.md)
