# Cursor Image Generation (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute, चॅटसाठी वापरल्या जाणाऱ्या त्याच प्रदाता आयडीद्वारे `POST /v1/images/generations` वर Cursor योजनेची **प्रतिमा निर्मिती** उपलब्ध करून देते: `cursor` (उपनाव `cu`).

| फील्ड                  | मूल्य                                                                          |
| ---------------------- | ------------------------------------------------------------------------------ |
| `IMAGE_PROVIDERS` आयडी | `cursor`                                                                       |
| स्वरूप                 | `cursor-agent-image`                                                           |
| प्रमाणीकरण             | चॅटसारखेच OAuth / API-key कनेक्शन (`provider_connections.provider = "cursor"`) |
| मॉडेल्स                | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                      |

## Agent CLI का वापरले जाते

OmniRoute मधील Cursor चॅट `agent.v1.AgentService/Run` (protobuf) वापरते. हा मार्ग अंगभूत क्लायंट साधने (shell, write, …) **नाकारतो**. प्रतिमा निर्मिती हे सीटच्या संदर्भात **`agent` CLI** द्वारे कार्यान्वित केले जाणारे Cursor-मूळ साधन आहे. त्यामुळे प्रतिमा हँडलर एका प्रतिबंधित प्रॉम्प्टसह आणि प्रत्येक विनंतीसाठी तात्पुरत्या कार्यक्षेत्रासह `agent` सुरू करतो (कम्युनिटी सीट ब्रिजेससारखीच रचना), आणि नंतर OpenAI-सुसंगत `b64_json` परत करतो.

## प्रवेश निर्बंध (कठोर नियम #15 + #17)

बाल प्रक्रिया (`agent` बायनरी) सुरू करणारे हे एकमेव `IMAGE_PROVIDERS` स्वरूप आहे. `POST /v1/images/generations` हा मार्ग दूरस्थ कॉलर वैधपणे वापरत असलेल्या सुमारे 40 इतर, प्रक्रिया सुरू न करणाऱ्या प्रतिमा प्रदात्यांद्वारे सामायिक केला जात असल्यामुळे, संपूर्ण मार्गाला **`LOCAL_ONLY`** म्हणून वर्गीकृत केलेले नाही — त्याऐवजी `handleCursorAgentImageGeneration` स्वतःचे प्रवेशद्वार लागू करते. यासाठी ती प्रत्येक विनंतीवर authz पाइपलाइनने नोंदवलेला विश्वसनीय `AUTHZ_HEADER_PEER_LOCALITY` निर्णय वापरते (वास्तविक TCP पीअरवरून, सहज बनावट करता येणाऱ्या `Host` हेडरवरून कधीही नाही): केवळ `loopback` आणि `lan` कॉलरच प्रक्रिया सुरू करण्यापर्यंत पोहोचू शकतात; इतर सर्वांना (सार्वजनिक टनेलद्वारे पुन्हा वापरलेल्या लीक झालेल्या API कीसह) कोणतीही क्रेडेन्शियल शोधण्यापूर्वी किंवा प्रक्रिया सुरू होण्यापूर्वी `403` मिळतो. उर्वरित `LOCAL_ONLY` स्तरावर लागू केलेल्या त्याच धोरणासाठी `src/server/authz/policies/management.ts` पहा.

## समवर्ती प्रवेशद्वार मॉड्यूल-स्तरीय आहे (एकल-इन्स्टन्स मर्यादा)

`CURSOR_IMG_MAX_CONCURRENT` हे Node मॉड्यूल इन्स्टन्सच्या व्याप्तीतील इन-मेमरी काउंटर/क्यूद्वारे लागू केले जाते (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). ते एका OmniRoute प्रक्रियेमधील समवर्ती `agent` प्रक्रिया योग्यरीत्या मर्यादित करते, परंतु समान Cursor सीट सामायिक करणाऱ्या अनेक प्रक्रिया/इन्स्टन्समध्ये (उदा. मल्टी-रेप्लिका डिप्लॉयमेंट) समन्वय साधत **नाही** — प्रत्येक इन्स्टन्स स्वतःची स्वतंत्र मर्यादा लागू करते. एकल-इन्स्टन्स डिप्लॉयमेंटसाठी (डीफॉल्ट) ही मर्यादा अचूक असते; क्षैतिजरीत्या स्केल केलेल्या डिप्लॉयमेंटमध्ये प्रत्येक इन्स्टन्ससाठी `CURSOR_IMG_MAX_CONCURRENT` सावधपणे कमी ठेवावे किंवा Cursor प्रतिमा ट्रॅफिक एका इन्स्टन्सकडे रूट करावे.

## आवश्यकता

1. डॅशबोर्डमध्ये कनेक्ट केलेले Cursor खाते (OAuth किंवा `crsr_…` API की).
2. OmniRoute प्रक्रियेसाठी Cursor Agent बायनरी उपलब्ध असणे:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, किंवा
   - `~/.local/bin/agent`, किंवा
   - Cursor कनेक्शनवरील `providerSpecificData.agentBin`.

पर्यायी समायोजन:

| Env                         | डीफॉल्ट                    | अर्थ                                   |
| --------------------------- | -------------------------- | -------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                   | प्रत्येक प्रतिमेसाठीची एकूण कालमर्यादा |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                        | सामायिक-सीट समवर्ती प्रवेशद्वार        |
| `CURSOR_IMG_MODEL`          | (विनंतीतील मॉडेल / `auto`) | CLI `--model` अधिलिखित करा             |

## उदाहरण

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

निर्मितीस सामान्यतः 1–2 मिनिटे लागतात. अंतर्गत नेटवर्क मार्गाला प्राधान्य द्या; सुमारे 100 सेकंदांची कालमर्यादा असलेले एज प्रॉक्सी अयशस्वी होतील.

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, आणि `model: openai/cursor/auto` (किंवा तुमच्या LiteLLM आवृत्तीनुसार फक्त `cursor/auto`) वापरून प्रतिमा मॉडेलची नोंदणी करा.
