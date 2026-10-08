# ACP registry and registered CLI launchers (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute ले **CLI खोज**, **नेटिभ Agent Client Protocol**, र
**लिगेसी stdio एडेप्टरहरू** अलग गर्छ। इन्स्टल गरिएको बाइनरी फेला पर्दैमा त्यसको
प्रमाणीकरण, मोडेल अनुकूलता, वा प्रम्प्ट सम्हाल्ने तत्परता प्रमाणित हुँदैन।

ड्यासबोर्डले इन्भेन्टरी र कस्टम-एजेन्ट दर्ताका लागि `GET /api/acp/agents` र
`POST /api/acp/agents` प्रयोग गर्छ। यी स्थानीय-मात्र व्यवस्थापन रुटहरू हुन्,
प्रोसेस सुरु गर्ने वा प्रम्प्ट पेस गर्ने सार्वजनिक API होइनन्। आन्तरिक
`AcpManager` स्वतः HTTP प्रदायकको फल्ब्याक बन्दैन।

## दर्ता गरिएका सम्झौताहरू

`config/cli-tools-manifest.json` बिल्ट-इन लन्च बाइनरीहरू, आर्गुमेन्टहरू, र
ब्याकएन्ड मोडहरूका लागि आधिकारिक स्रोत हो। रजिस्ट्रीले आफ्ना परिभाषाहरू त्यही
म्यानिफेस्टबाट निकाल्छ। पहिचानको नतिजा 60 सेकेन्डका लागि क्यास गरिन्छ।

- `acp`: Gemini सम्झौताले `gemini --experimental-acp` सुरु गर्छ र आधिकारिक
  TypeScript SDK मार्फत न्यूलाइनद्वारा छुट्याइएको ACP JSON-RPC मा सञ्चार गर्छ।
- `stdio-adapter`: अन्य दर्ता गरिएका सम्झौताहरूले लिगेसी न्यूलाइन-इनपुट,
  stdout-आउटपुट एडेप्टर कायम राख्छन्। आउटपुट दुई सेकेन्डसम्म निष्क्रिय हुँदा
  यसको प्रतिक्रिया समाप्त हुन्छ। यस एडेप्टरले ती CLI हरूका लागि नेटिभ ACP
  समर्थन **प्रमाणित गर्दैन**।

Gemini ले लन्च फ्ल्यागलाई आफ्नो [CLI सन्दर्भ](https://geminicli.com/docs/cli/cli-reference/) मा अभिलेखित गरेको छ।
क्लाइन्टले प्रारम्भीकरण, सेसन सिर्जना, प्रम्प्ट अनुरोधहरू, सूचनाहरू, र रद्दीकरणका
लागि [आधिकारिक ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
प्रयोग गर्छ।

कस्टम-एजेन्ट परिभाषाहरू प्रशासकद्वारा नियन्त्रित लन्च सम्झौताकै रूपमा रहन्छन्।
बाइनरी र आर्गुमेन्टहरू दर्ता गर्दा उक्त प्रोसेसलाई सर्भर प्रयोगकर्ताका स्थानीय
कार्यान्वयन विशेषाधिकारहरू प्राप्त हुन्छन्; दर्ता स्यान्डबक्स होइन। संस्करण
प्रोबहरूले दर्ता गरिएको एक्जिक्युटेबल र मान्यता प्राप्त संस्करण फ्ल्याग मात्र
स्वीकार गर्छन्।

## आन्तरिक लन्च API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // यस एजेन्टलाई जानाजानी तोकिएका प्रदायक भेरिएबलहरू मात्र पठाउनुहोस्।
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(
    session.id,
    "यो परियोजनाको व्याख्या गर्नुहोस्",
    120_000
  );
  // कल गर्ने एप्लिकेसनमा प्रतिक्रिया उपभोग गर्नुहोस्।
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` ले दर्ता गरिएको परिभाषाबाट एक्जिक्युटेबल र आर्गुमेन्टहरू
समाधान गर्छ। कलरका विकल्पहरू `cwd` र `env` मात्र हुन्; पुरानो
`spawn(agentId, binary, args, env)` सिग्नेचर र एक्जिक्युटेबल ओभरराइडहरू
अस्वीकार गरिन्छन्। यस म्यानेजरले HTTP लन्च सम्झौताहरू समर्थन गर्दैन।

चाइल्डले CLI लन्चरहरूकै अपरेटिङ सिस्टम, टर्मिनल, लोकेल, र सर्टिफिकेट अनुमतिसूची
इनहेरिट गर्छ। सर्भर/प्रदायक गोप्य मानहरू प्यारेन्ट वातावरणबाट प्रतिलिपि गरिँदैनन्।
छानिएको CLI लाई आवश्यक पर्ने क्रेडेन्सियलहरू स्पष्ट रूपमा पठाइनुपर्छ वा उक्त
CLI को आफ्नै स्थानीय प्रमाणीकरणमार्फत उपलब्ध गराइनुपर्छ। चाइल्डसँग अझै पनि
स्थानीय प्रयोगकर्ताका फाइलसिस्टम अनुमतिहरू हुन्छन् र यसले आफ्नै कन्फिग पढ्न सक्छ।

## नेटिभ जीवनचक्र र सीमाहरू

1. दर्ता गरिएको बाइनरी सुरु गर्नुहोस्, ACP प्रारम्भ गर्नुहोस्, र चयन गरिएको
   कार्य डाइरेक्टरीमा आधारित सेसन सिर्जना गर्नुहोस्। प्रारम्भीकरणको सीमा दस
   सेकेन्ड हो।
2. प्रम्प्ट पेस गर्नुहोस् र त्यही सेसनका लागि मात्र टेक्स्ट सूचनाहरू सङ्कलन
   गर्नुहोस्। समाप्ति भनेको प्रम्प्ट RPC प्रतिक्रिया हो, stdout मौन रहेको अवधि
   होइन।
3. अधुरो प्रारम्भीकरणसमेत समेट्ने एउटा प्रम्प्ट समयसीमा प्रयोग गर्नुहोस्; पूर्वनिर्धारित
   समय 120 सेकेन्ड हो। एउटै प्रोसेसभित्रका समवर्ती प्रम्प्टहरू अस्वीकार गरिन्छन्।
4. नेटिभ टाइमआउट हुँदा `session/cancel` प्रयास गर्नुहोस् र प्रोसेस समाप्त
   गर्नुहोस्। समाप्तिअघि 100 ms को सीमित अवधिले सूचना फ्लस हुन दिन्छ।
5. प्रारम्भीकरण असफल हुँदा, कनेक्सन बन्द हुँदा, प्रोसेस बाहिरिँदा, वा कलरले
   यसलाई बन्द गर्दा ट्रान्सपोर्ट अवस्था बन्द गर्नुहोस् र सेसन हटाउनुहोस्।

उपकरण अनुमति अनुरोधहरू अस्वीकार गरिन्छन्। कुनै फाइलसिस्टम वा टर्मिनल क्लाइन्ट
क्षमताहरू विज्ञापित गरिँदैनन्। यी प्रतिबन्धहरूले चाइल्ड बाइनरी स्वयंलाई
स्यान्डबक्स गर्दैनन् वा CLI का आफ्नै प्राधिकरण सेटिङहरू प्रतिस्थापन गर्दैनन्।

नेटिभ टेक्स्ट र लिगेसी stdout/stderr दुवैले बढीमा 1 MiB क्यारेक्टरहरू राख्छन्,
र काटिएको सूचना सहित सबैभन्दा नयाँ आउटपुट कायम राख्छन्। SDK पार्सिङअघि एउटा
नेटिभ वायर फ्रेम बढीमा 2 MiB बाइटमा सीमित हुन्छ। प्रत्येक प्रम्प्टमा बफरहरू
रिसेट हुन्छन्।

`kill(sessionId)` ले SIGTERM पठाउँछ, त्यसपछि प्रोसेस पाँच सेकेन्डसम्म पनि
नबाहिरिएमा SIGKILL पठाउँछ। लिगेसी प्रम्प्ट टाइमआउटहरूले लिस्नर र टाइमरहरू
रिलिज गर्छन्, तर सेसनलाई अर्को प्रम्प्टका लागि उपलब्ध राख्छन्; काम सकिएपछि
`kill()` वा `killAll()` चलाउने जिम्मेवारी कलरकै हुन्छ।

## इभेन्टहरू र निरीक्षण

म्यानेजरले `stdout`, `stderr`, र `exit` उत्सर्जन गर्छ, प्रत्येकसँग `sessionId`
हुन्छ। `sessionError` ले सफा गरिएको ट्रान्सपोर्ट त्रुटि रिपोर्ट गर्छ। अनुकूलताका
लागि रहेको `error` इभेन्टको सब्सक्राइबर हुँदा मात्र त्यो उत्सर्जित हुन्छ, त्यसैले
हराएको बाइनरीले ह्यान्डल नगरिएको EventEmitter त्रुटि निम्त्याउन सक्दैन।

- `getSession(sessionId)` ले व्यवस्थापित सेसन वा `undefined` फर्काउँछ।
- `getActiveSessions()` ले रोकिएका वा रोकिँदै गरेका सेसनहरू समावेश गर्दैन।
- `sendInput(sessionId, input)` प्रत्यक्ष रहेको लिगेसी एडेप्टरका लागि मात्र
  उपलब्ध हुन्छ; आफ्नो JSON-RPC स्ट्रिम सुरक्षित राख्न नेटिभ ACP ले कच्चा इनपुट
  अस्वीकार गर्छ।
- `killAll()` ले त्यस इन्स्ट्यान्सद्वारा व्यवस्थापित प्रत्येक सेसन समाप्त गर्छ।

## प्रमाणीकरणका सीमाहरू

निश्चित नतिजा दिने फिक्स्चरहरूले नेटिभ ह्यान्डशेक, टेक्स्ट आउटपुट, अस्वीकार
गरिएका अनुमतिहरू, रद्दीकरण, समवर्ती प्रम्प्टहरू, असफल प्रारम्भीकरण, प्रोसेस
बहिर्गमन, आउटपुट सीमाहरू, र गोप्य मानहरूको पृथकीकरण समेट्छन्। विद्यमान लिगेसी
बफर/लिस्नर रिग्रेसनहरू पनि समेटिएका छन्। यी परीक्षणहरूले प्रत्यक्ष Gemini लगइन
वा सफल प्रदायक इन्फरेन्स प्रमाणित गर्दैनन्; तिनका लागि लक्षित वातावरणमा छुट्टै
प्राधिकृत स्मोक टेस्ट आवश्यक हुन्छ।

## सम्बन्धित दस्तावेज

- [एजेन्ट प्रोटोकलहरू](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI लन्च सम्झौताहरू](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI उपकरणहरू](../reference/CLI-TOOLS.md)
- [A2A सर्भर](./A2A-SERVER.md)
- [क्लाउड एजेन्टहरू](./CLOUD_AGENT.md)
