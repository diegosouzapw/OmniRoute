# Tunnels Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **प्रामाणिक स्रोत:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **अंतिम अपडेट:** 2026-06-28 — v3.8.40

OmniRoute अपने स्थानीय सर्वर (`http://localhost:20128`) को तीन टनल बैकएंड के
माध्यम से सार्वजनिक इंटरनेट पर उपलब्ध करा सकता है। यह निम्नलिखित के लिए उपयोगी है:

- क्लाउड प्रदाताओं (Antigravity, Gemini, Cursor) से आने वाले OAuth कॉलबैक, जिन्हें
  सार्वजनिक रूप से पहुँच योग्य रीडायरेक्ट URL की आवश्यकता होती है।
- VM डिप्लॉय किए बिना अपने स्थानीय इंस्टेंस को टीम के सदस्यों के साथ साझा करना।
- मोबाइल, रिमोट या क्रॉस-नेटवर्क परीक्षण।

तीनों बैकएंड इन-प्रोसेस प्रबंधित किए जाते हैं — OmniRoute डैशबोर्ड या REST API से
अंतर्निहित बाइनरी या SDK को शुरू/बंद करता है। किसी रिवर्स-प्रॉक्सी या systemd सेटअप
की आवश्यकता नहीं है।

## बैकएंड का संक्षिप्त अवलोकन

| बैकएंड                      | स्थायित्व                                             | लागत                            | सेटअप                                         |
| --------------------------- | ----------------------------------------------------- | ------------------------------- | --------------------------------------------- |
| **Cloudflare Quick Tunnel** | अस्थायी (प्रत्येक रीस्टार्ट पर URL बदलता है)          | निःशुल्क                        | शून्य — `cloudflared` स्वतः इंस्टॉल होता है   |
| **ngrok**                   | सशुल्क प्लान या निश्चित डोमेन कॉन्फ़िगर होने तक स्थिर | निःशुल्क टियर + सशुल्क          | ngrok अकाउंट + authtoken आवश्यक               |
| **Tailscale Funnel**        | आपके tailnet के भीतर प्रत्येक नोड के लिए स्थिर        | व्यक्तिगत उपयोग के लिए निःशुल्क | Tailscale इंस्टॉल + लॉगिन + Funnel ACL आवश्यक |

इनके कार्यान्वयन `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, और `src/lib/tailscaleTunnel.ts` में मौजूद हैं। तीनों
`phase`, `running`, `publicUrl`, `apiUrl`, `targetUrl`, और `lastError` फ़ील्ड वाला
समान संरचना का `status` ऑब्जेक्ट लौटाते हैं, ताकि डैशबोर्ड उन्हें एक समान रूप से
रेंडर कर सके।

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts`, `cloudflared` को चाइल्ड प्रोसेस के रूप में चलाता है।
यह दो मोड का समर्थन करता है, जिनका चयन इस आधार पर होता है कि named-tunnel कॉन्फ़िग
दिया गया है या नहीं:

- **क्विक टनल (डिफ़ॉल्ट)।** `cloudflared tunnel --url
http://localhost:<apiPort>` चलाता है और stdout से आवंटित `*.trycloudflare.com` URL
  को पार्स करता है। URL अस्थायी होते हैं और प्रत्येक रीस्टार्ट पर बदल जाते हैं।
- **नेम्ड टनल (वैकल्पिक)।** जब `CLOUDFLARED_CONFIG` स्थानीय रूप से प्रबंधित
  cloudflared `config.yml` की ओर संकेत करता है, तब OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run` चलाता है, जिससे आपको एक **स्थिर, नामित होस्टनेम** मिलता है। कॉन्फ़िग
  टनल UUID, `credentials-file`, और `ingress` रूटिंग प्रदान करता है, इसलिए कोई
  `--url` पास नहीं किया जाता और किसी Zero Trust डैशबोर्ड टोकन की आवश्यकता नहीं होती। `run`,
  कॉन्फ़िग के निरपेक्ष `credentials-file` पथ से क्रेडेंशियल पढ़ता है — `cert.pem`
  की आवश्यकता नहीं होती (इसका उपयोग केवल टनल लाइफ़साइकल प्रबंधन के लिए किया जाता है)।

मुख्य व्यवहार:

- **स्वतः इंस्टॉल।** पहली बार उपयोग करने पर, OmniRoute आधिकारिक GitHub रिलीज़ से नवीनतम
  `cloudflared` बाइनरी डाउनलोड करता है (प्रबंधित इंस्टॉलेशन
  `DATA_DIR/cloudflared/` के अंतर्गत रहता है)। निष्पादन से पहले डाउनलोड की गई एसेट के SHA256 को
  रिलीज़ मैनिफ़ेस्ट से सत्यापित किया जाता है।
- **प्रोसेस पर्यवेक्षण।** cloudflared PID और निर्धारित URL को
  `quick-tunnel-state.json` में स्थायी रूप से सहेजा जाता है, ताकि डैशबोर्ड रीलोड के बाद स्थिति पुनः प्राप्त कर सके।

### नेम्ड टनल सेटअप (स्थिर होस्टनेम)

1. cloudflared CLI से स्थानीय रूप से प्रबंधित टनल बनाएँ (एक बार):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. एक `~/.cloudflared/config.yml` लिखें, जो आपके होस्टनेम को OmniRoute के स्थानीय
   API पोर्ट (डिफ़ॉल्ट 20128) पर रूट करे:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute को कॉन्फ़िग की ओर इंगित करें और टनल को (पुनः) शुरू करें:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # वैकल्पिक — OmniRoute द्वारा रिपोर्ट किए जाने वाले होस्टनेम को ओवरराइड करता है; अन्यथा इसे
   # कॉन्फ़िग के पहले ingress नियम से पढ़ा जाता है:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   टनल को क्विक टनल की तरह ही सक्षम करें (नीचे REST / डैशबोर्ड / CLI)।
   नेम्ड टनल स्क्रैप करने के लिए कोई सार्वजनिक URL उत्सर्जित नहीं करता, इसलिए तत्परता का पता
   cloudflared के पंजीकृत एज कनेक्शन से लगाया जाता है, और `publicUrl`/`apiUrl` को
   `CLOUDFLARED_HOSTNAME` (या कॉन्फ़िग के पहले ingress होस्टनेम) से रिपोर्ट किया जाता है।

### REST के माध्यम से सक्षम / अक्षम करें

एंडपॉइंट अलग-अलग `start`/`stop` पथों के बजाय
`{action: "enable" | "disable"}` बॉडी का उपयोग करता है। प्रबंधन प्रमाणीकरण
(एडमिन सेशन या एडमिन API कुंजी) आवश्यक है।

```bash
# सक्षम करें
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# स्थिति
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# अक्षम करें
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

या डैशबोर्ड के माध्यम से: **Settings → Tunnels → Cloudflare**।

### वैकल्पिक env vars

| वेरिएबल                                              | उद्देश्य                                                                                                                                                                   |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | बाइनरी पाथ को ओवरराइड करता है। यदि यह सेट और मान्य है, तो OmniRoute इसे डाउनलोड करने के बजाय उपयोग करता है।                                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ट्रांसपोर्ट प्रोटोकॉल (डिफ़ॉल्ट `http2`; `quic`, `auto` भी)।                                                                                                               |
| `CLOUDFLARED_CONFIG`                                 | स्थानीय रूप से प्रबंधित cloudflared `config.yml` का पाथ। सेट होने पर, OmniRoute त्वरित टनल के बजाय एक **नामित/स्थायी** टनल (`tunnel --config <path> run`) चलाता है।        |
| `CLOUDFLARED_HOSTNAME`                               | नामित टनल द्वारा रिपोर्ट किए गए सार्वजनिक होस्टनेम को ओवरराइड करता है (उदा. `ai.example.com`)। सेट न होने पर, इसे कॉन्फ़िगरेशन के पहले `ingress` होस्टनेम से पढ़ा जाता है। |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK** का उपयोग करता है (प्रक्रिया के भीतर, कोई CLI
उपप्रक्रिया नहीं)। नेटिव मॉड्यूल को पहली बार शुरू किए जाने पर लेज़ी तरीके से आयात किया जाता है, ताकि
पहले से निर्मित बाइनरी के बिना भी प्लेटफ़ॉर्म पर ऐप बूट के समय बाधित न हो।

### पूर्वापेक्षाएँ

1. <https://ngrok.com> पर साइन अप करें।
2. ngrok डैशबोर्ड से अपना authtoken कॉपी करें।
3. इसे निम्न में से किसी एक तरीके से प्रदान करें:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, या
   - डैशबोर्ड: **Settings → Tunnels → ngrok**, या
   - REST बॉडी (एक बार के लिए): `{"action":"enable","authToken":"<token>"}`।

यदि इनमें से कोई भी कॉन्फ़िगर नहीं है, तो स्थिति `phase: "needs_auth"` लौटाती है।

### REST के माध्यम से सक्षम / अक्षम करना

```bash
# सक्षम करें (env से NGROK_AUTHTOKEN का उपयोग करता है)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# इनलाइन टोकन के साथ सक्षम करें
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# स्थिति
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# अक्षम करें
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

प्रतिक्रिया में असाइन किया गया `publicUrl` शामिल होता है (उदाहरण के लिए,
`https://abcd-1234.ngrok-free.app`)। कस्टम डोमेन, क्षेत्र और नीति नियम
ngrok डैशबोर्ड में कॉन्फ़िगर किए जाने चाहिए — OmniRoute स्वयं केवल स्थानीय
लक्ष्य URL को SDK पर अग्रेषित करता है।

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts`, स्थानीय API पोर्ट को **Funnel** (serve के लिए
Tailscale का सार्वजनिक-इंटरनेट निकास) के माध्यम से उपलब्ध कराने हेतु सिस्टम `tailscale` CLI को
संचालित करता है। यह संपूर्ण जीवनचक्र का समर्थन करता है: इंस्टॉल करना, लॉगिन करना, डेमन शुरू करना,
सक्षम करना और अक्षम करना।

कार्यान्वयन `tailscale funnel --bg <port>` (बैकग्राउंड मोड) को इनवोक करता है।
सार्वजनिक URL का प्रारूप `https://<machine>.<tailnet>.ts.net/` होता है।

### पूर्वापेक्षाएँ

1. Tailscale इंस्टॉल करें (या OmniRoute को ऐसा करने दें — नीचे दिया गया `install` एंडपॉइंट देखें)।
2. साइन इन करें (`tailscale login` या OmniRoute के `login` एंडपॉइंट के माध्यम से)।
3. Tailscale एडमिन कंसोल में अपने tailnet के लिए Funnel सक्षम करें:
   <https://login.tailscale.com/admin/settings/features>।

Linux और macOS पर डेमन (`tailscaled`) को नियंत्रित करने के लिए `sudo` आवश्यक है।
POST एंडपॉइंट एक वैकल्पिक `sudoPassword` फ़ील्ड स्वीकार करते हैं, जिसे कॉल की अवधि
के लिए OmniRoute के MITM पासवर्ड कैश (`getCachedPassword` / `setCachedPassword`) पर
अग्रेषित किया जाता है। Windows,
`C:\Program Files\Tailscale\tailscale.exe` पर मौजूद डिफ़ॉल्ट सर्विस इंस्टॉलेशन का उपयोग करता है।

### REST एंडपॉइंट

Tailscale में अन्य बैकएंड की तुलना में अधिक व्यापक इंटरफ़ेस है, क्योंकि इंस्टॉलेशन,
लॉगिन, डेमन और टनल अलग-अलग पहलू हैं।

| एंडपॉइंट                              | विधि   | उद्देश्य                                                               |
| ------------------------------------- | ------ | ---------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | समेकित टनल स्थिति (`phase`, `tunnelUrl`, `apiUrl`, आदि)                |
| `/api/tunnels/tailscale/check`        | `GET`  | निम्न-स्तरीय जाँच: इंस्टॉल है? लॉगिन किया है? डेमन चल रहा है?          |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale इंस्टॉल करें (SSE-स्ट्रीम किए गए प्रगति इवेंट) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS पर `tailscaled` शुरू करें                                  |
| `/api/tunnels/tailscale/login`        | `POST` | लॉगिन प्रवाह शुरू करें; ब्राउज़र में खोलने के लिए `authUrl` लौटाता है  |
| `/api/tunnels/tailscale/enable`       | `POST` | API पोर्ट के लिए Funnel शुरू करें                                      |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel बंद करें                                                        |

सभी Tailscale एंडपॉइंट के लिए प्रबंधन प्रमाणीकरण आवश्यक है (`routeUtils.ts ::
requireTailscaleAuth` देखें)।

सक्षम करने का उदाहरण:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

यदि एडमिन कंसोल में Funnel सक्षम नहीं है, तो प्रतिक्रिया में
`funnelNotEnabled: true` के साथ ब्राउज़र में खोलने के लिए एक `enableUrl` शामिल होता है।

### वैकल्पिक env वेरिएबल

| वेरिएबल         | उद्देश्य                              |
| --------------- | ------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` बाइनरी पथ को ओवरराइड करें |

## एंडपॉइंट सारांश

| एंडपॉइंट                              | विधि   | बॉडी                                | प्रमाणीकरण |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management |

कोई केंद्रीय `/api/settings/tunnels` एंडपॉइंट नहीं है — प्रत्येक बैकएंड
स्वतंत्र है।

## OAuth कॉलबैक संबंधी विचार

जब आप OmniRoute को किसी टनल के माध्यम से उपलब्ध कराते हैं, तो डैशबोर्ड और OAuth प्रवाहों को
कॉलबैक URL को `localhost` के बजाय **सार्वजनिक** होस्टनेम के आधार पर बनाना चाहिए। अन्यथा
OAuth प्रदाता उपयोगकर्ता को ऐसे URL पर वापस रीडायरेक्ट करता है जिस तक उसके सर्वर नहीं पहुँच सकते,
और हैंडशेक विफल हो जाता है।

डैशबोर्ड में किए गए संपादनों और सेटिंग्स को सहेजने के लिए टनल होस्टनेम को
`NEXT_PUBLIC_BASE_URL` में स्थायी रूप से सेट करने की आवश्यकता नहीं होती। प्रमाणित डैशबोर्ड समान-मूल के असुरक्षित
अनुरोधों को सत्र-बद्ध CSRF टोकन के साथ भेजता है, इसलिए लॉग इन करने के बाद सामान्य UI प्रबंधन के लिए
अस्थायी Cloudflare Quick Tunnel होस्ट का उपयोग किया जा सकता है।

इसे सेट करें:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

और OAuth आरंभ करने से पहले OmniRoute को पुनः चालू करें। अस्थायी Cloudflare Quick
Tunnels के लिए प्रत्येक पुनः आरंभ के बाद URL बदल जाता है, इसलिए उत्पादन में OAuth के उपयोग हेतु आरक्षित
डोमेन वाले ngrok या Tailscale Funnel को प्राथमिकता दें।

## स्वास्थ्य और निगरानी

डैशबोर्ड टनल की स्थिति को **Settings → Tunnels** के अंतर्गत प्रदर्शित करता है:

- सक्रिय बैकएंड और वर्तमान `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`)।
- वर्तमान सार्वजनिक URL और उससे प्राप्त API URL (`<publicUrl>/v1`)।
- वह स्थानीय लक्ष्य URL जिस पर टनल ट्रैफ़िक अग्रेषित कर रही है।
- अंतिम त्रुटि संदेश, यदि कोई हो।

प्रोग्रामेटिक निगरानी के लिए प्रत्येक बैकएंड के `GET` एंडपॉइंट को पोल करें। एक से अधिक
बैकएंड को एक साथ चलाने की अनुमति है; OmniRoute प्रत्येक को
स्वतंत्र रूप से ट्रैक करेगा।

## समस्या निवारण

### "cloudflared बाइनरी नहीं मिली"

OmniRoute पहली बार उपयोग किए जाने पर स्वतः इंस्टॉल करने का प्रयास करता है। यदि इंस्टॉलेशन अवरुद्ध है
(प्रतिबंधित नेटवर्क, GitHub तक पहुँच नहीं), तो `cloudflared` को
<https://github.com/cloudflare/cloudflared/releases> से मैन्युअल रूप से डाउनलोड करें और
`CLOUDFLARED_BIN=/path/to/cloudflared` सेट करें।

### "ngrok: authtoken आवश्यक है"

`phase: "needs_auth"` का अर्थ है कि कोई authtoken नहीं मिला। `.env` में
`NGROK_AUTHTOKEN` सेट करें, इसे डैशबोर्ड के माध्यम से कॉन्फ़िगर करें, या enable POST
बॉडी में `authToken` पास करें।

### "tailscale: funnel सक्षम नहीं है"

जब enable प्रतिक्रिया में `funnelNotEnabled: true` शामिल हो, तो आपके tailnet के लिए Funnel
अक्षम होता है। लौटाए गए `enableUrl` (या एडमिन कंसोल के फ़ीचर
पृष्ठ) को खोलें और Funnel को चालू करें।

### टनल URL में बदलाव से OAuth काम करना बंद कर देता है

आरक्षित डोमेन वाले ngrok या Tailscale Funnel का उपयोग करें (दोनों प्रत्येक नोड के लिए स्थिर हैं)।
Cloudflare Quick Tunnels मूलतः अस्थायी होते हैं और लंबे समय तक चलने वाले
OAuth कॉलबैक के लिए अनुशंसित नहीं हैं।

### Tailscale के लिए Linux/macOS पर अनुमति अस्वीकृत

`tailscaled` को root की आवश्यकता होती है। संबंधित POST एंडपॉइंट को `sudoPassword` प्रदान करें,
या डेमन को स्वयं चलाएँ (`sudo systemctl start tailscaled`)।

## यह भी देखें

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — निकास ट्रैफ़िक के लिए आउटबाउंड प्रॉक्सी (1proxy, SOCKS5, HTTP)।
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` सहित env vars की पूरी सूची।
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — स्थिर सार्वजनिक होस्टिंग के लिए टनलिंग के विकल्प।
- स्रोत: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`।
