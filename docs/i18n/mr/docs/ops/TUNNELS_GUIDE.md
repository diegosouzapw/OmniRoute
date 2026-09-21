# Tunnels Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **अधिकृत स्रोत:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **शेवटचे अद्यतन:** 2026-06-28 — v3.8.40

OmniRoute त्याचा स्थानिक सर्व्हर (`http://localhost:20128`) तीन टनेल बॅकएंडद्वारे
सार्वजनिक इंटरनेटवर उपलब्ध करू शकतो. हे पुढील गोष्टींसाठी उपयुक्त आहे:

- सार्वजनिकरीत्या उपलब्ध असलेल्या रीडायरेक्ट URL ची आवश्यकता असणारे क्लाउड
  प्रदात्यांकडील (Antigravity, Gemini, Cursor) OAuth कॉलबॅक.
- VM डिप्लॉय न करता तुमचा स्थानिक इंस्टन्स सहकाऱ्यांसोबत शेअर करणे.
- मोबाइल, दूरस्थ किंवा क्रॉस-नेटवर्क चाचणी.

तिन्ही बॅकएंड प्रक्रियेअंतर्गत व्यवस्थापित केले जातात — OmniRoute डॅशबोर्ड किंवा
REST API मधून अंतर्निहित बायनरी किंवा SDK सुरू/बंद करतो. कोणत्याही रिव्हर्स-प्रॉक्सी
किंवा systemd सेटअपची आवश्यकता नाही.

## बॅकएंडचा एका नजरेत आढावा

| बॅकएंड                      | सातत्य                                                           | किंमत                   | सेटअप                                            |
| --------------------------- | ---------------------------------------------------------------- | ----------------------- | ------------------------------------------------ |
| **Cloudflare Quick Tunnel** | तात्पुरता (प्रत्येक रीस्टार्टवेळी URL बदलतो)                     | मोफत                    | काहीही नाही — `cloudflared` आपोआप इंस्टॉल करतो   |
| **ngrok**                   | सशुल्क योजना किंवा निश्चित डोमेन कॉन्फिगर केलेले असेपर्यंत स्थिर | मोफत श्रेणी + सशुल्क    | ngrok खाते + authtoken आवश्यक                    |
| **Tailscale Funnel**        | तुमच्या tailnet मधील प्रत्येक नोडसाठी स्थिर                      | वैयक्तिक वापरासाठी मोफत | Tailscale इंस्टॉलेशन + लॉगिन + Funnel ACL आवश्यक |

अंमलबजावणी `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` आणि `src/lib/tailscaleTunnel.ts` मध्ये आहे. तिन्ही
`phase`, `running`, `publicUrl`, `apiUrl`, `targetUrl` आणि `lastError`
फील्ड असलेला समान रचनेचा `status` ऑब्जेक्ट परत करतात, ज्यामुळे डॅशबोर्ड त्यांना
एकसमान पद्धतीने दाखवू शकतो.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts`, `cloudflared` ला चाइल्ड प्रोसेस म्हणून चालवते. नामित-टनेल
कॉन्फिग दिले आहे की नाही यानुसार निवडले जाणारे दोन मोड ते समर्थित करते:

- **क्विक टनेल (डीफॉल्ट).** `cloudflared tunnel --url
http://localhost:<apiPort>` चालवते आणि stdout मधून नियुक्त केलेला
  `*.trycloudflare.com` URL पार्स करते. URL तात्पुरते असतात आणि प्रत्येक रीस्टार्टवेळी बदलतात.
- **नामित टनेल (ऐच्छिक).** `CLOUDFLARED_CONFIG` स्थानिकरीत्या व्यवस्थापित
  केलेल्या cloudflared `config.yml` कडे निर्देश करत असताना, OmniRoute
  `cloudflared tunnel --no-autoupdate
--config <path> run` चालवतो, ज्यामुळे तुम्हाला **स्थिर, नामित होस्टनेम** मिळते. कॉन्फिग
  टनेल UUID, `credentials-file` आणि `ingress` रूटिंग पुरवते, त्यामुळे कोणताही
  `--url` दिला जात नाही आणि Zero Trust डॅशबोर्ड टोकनची आवश्यकता नसते. `run`,
  कॉन्फिगच्या परिपूर्ण `credentials-file` पाथमधून क्रेडेन्शियल्स वाचते — `cert.pem`
  आवश्यक नसते (ते केवळ टनेलच्या जीवनचक्र व्यवस्थापनासाठी वापरले जाते).

महत्त्वाची वर्तणूक:

- **स्वयंचलित इंस्टॉलेशन.** पहिल्या वापरावेळी OmniRoute अधिकृत GitHub रिलीजमधून
  नवीनतम `cloudflared` बायनरी डाउनलोड करतो (व्यवस्थापित इंस्टॉलेशन
  `DATA_DIR/cloudflared/` अंतर्गत असते). डाउनलोड केलेल्या ॲसेटचा SHA256
  कार्यान्वित करण्यापूर्वी रिलीज मॅनिफेस्टशी पडताळला जातो.
- **प्रोसेस पर्यवेक्षण.** cloudflared PID आणि निर्धारित URL
  `quick-tunnel-state.json` मध्ये जतन केले जातात, ज्यामुळे डॅशबोर्ड रीलोडनंतर
  स्थिती पुन्हा प्राप्त करू शकतो.

### नामित टनेल सेटअप (स्थिर होस्टनेम)

1. cloudflared CLI वापरून स्थानिकरीत्या व्यवस्थापित टनेल तयार करा (एकदाच):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. तुमचा होस्टनेम OmniRoute च्या स्थानिक API पोर्टकडे (डीफॉल्ट 20128) रूट करणारी
   `~/.cloudflared/config.yml` लिहा:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute ला कॉन्फिगकडे निर्देशित करा आणि टनेल (पुन्हा) सुरू करा:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ऐच्छिक — OmniRoute ज्या होस्टनेमची नोंद करतो तो बदलतो; अन्यथा तो
   # कॉन्फिगच्या पहिल्या ingress नियमातून वाचला जातो:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   क्विक टनेलप्रमाणेच टनेल सक्षम करा (खाली REST / डॅशबोर्ड / CLI).
   नामित टनेल स्क्रेप करण्यासाठी कोणताही सार्वजनिक URL उत्सर्जित करत नाही, त्यामुळे
   cloudflared च्या नोंदणीकृत एज कनेक्शनवरून तयारी ओळखली जाते आणि
   `publicUrl`/`apiUrl`, `CLOUDFLARED_HOSTNAME` मधून (किंवा कॉन्फिगच्या
   पहिल्या ingress होस्टनेममधून) नोंदवले जातात.

### REST द्वारे सक्षम / अक्षम करा

हा एंडपॉइंट स्वतंत्र `start`/`stop` पाथऐवजी
`{action: "enable" | "disable"}` बॉडी वापरतो. व्यवस्थापन प्रमाणीकरण
(ॲडमिन सेशन किंवा ॲडमिन API की) आवश्यक आहे.

```bash
# सक्षम करा
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# स्थिती
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# अक्षम करा
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

किंवा डॅशबोर्डद्वारे: **Settings → Tunnels → Cloudflare**.

### ऐच्छिक env vars

| चल                                                   | उद्देश                                                                                                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | बायनरीचा पथ अधिलिखित करतो. हे सेट केलेले आणि वैध असल्यास, OmniRoute डाउनलोड करण्याऐवजी त्याचा वापर करते.                                                                       |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ट्रान्सपोर्ट प्रोटोकॉल (डीफॉल्ट `http2`; तसेच `quic`, `auto`).                                                                                                                 |
| `CLOUDFLARED_CONFIG`                                 | स्थानिकरीत्या व्यवस्थापित केलेल्या cloudflared `config.yml` चा पथ. हे सेट केल्यावर, OmniRoute क्विक टनेलऐवजी **नामित/कायमस्वरूपी** टनेल (`tunnel --config <path> run`) चालवते. |
| `CLOUDFLARED_HOSTNAME`                               | नामित टनेलने नोंदवलेले सार्वजनिक होस्टनेम अधिलिखित करते (उदा. `ai.example.com`). सेट केलेले नसल्यास, कॉन्फिगमधील पहिल्या `ingress` होस्टनेममधून वाचले जाते.                    |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK** वापरते (प्रक्रियेअंतर्गत, कोणतीही CLI
उपप्रक्रिया नाही). पूर्वनिर्मित बायनरी नसलेल्या प्लॅटफॉर्मवर अॅप सुरू होताना
बिघाड होऊ नये म्हणून नेटिव्ह मॉड्यूल पहिल्यांदा सुरू करताना विलंबाने इंपोर्ट केले जाते.

### पूर्वावश्यकता

1. <https://ngrok.com> वर नोंदणी करा.
2. ngrok डॅशबोर्डवरून तुमचा authtoken कॉपी करा.
3. तो खालीलपैकी एका मार्गाने द्या:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, किंवा
   - डॅशबोर्ड: **Settings → Tunnels → ngrok**, किंवा
   - REST body (एकदाच): `{"action":"enable","authToken":"<token>"}`.

यांपैकी काहीही कॉन्फिगर केलेले नसल्यास, स्थितीमध्ये `phase: "needs_auth"` परत केले जाते.

### REST द्वारे सक्षम / अक्षम करणे

```bash
# सक्षम करा (env मधील NGROK_AUTHTOKEN वापरते)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# इनलाइन टोकनसह सक्षम करा
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# स्थिती
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# अक्षम करा
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

प्रतिसादामध्ये नियुक्त केलेले `publicUrl` समाविष्ट असते (उदा.
`https://abcd-1234.ngrok-free.app`). सानुकूल डोमेन, प्रदेश आणि धोरण नियम
ngrok डॅशबोर्डमध्ये कॉन्फिगर करणे आवश्यक आहे — OmniRoute स्वतः फक्त
स्थानिक लक्ष्य URL SDK कडे फॉरवर्ड करते.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts`, **Funnel** द्वारे स्थानिक API पोर्ट उघड करण्यासाठी
सिस्टम `tailscale` CLI चे व्यवस्थापन करते (serve साठी Tailscale चे सार्वजनिक-इंटरनेट निर्गमन).
ते संपूर्ण जीवनचक्राला समर्थन देते: इन्स्टॉल करणे, लॉगिन, डिमन सुरू करणे, सक्षम करणे, अक्षम करणे.

अंमलबजावणी `tailscale funnel --bg <port>` (पार्श्वभूमी मोड) वापरते. सार्वजनिक
URL चे स्वरूप `https://<machine>.<tailnet>.ts.net/` असे असते.

### पूर्वावश्यकता

1. Tailscale इन्स्टॉल करा (किंवा OmniRoute ला ते करू द्या — खालील `install` endpoint पहा).
2. साइन इन करा (`tailscale login` किंवा OmniRoute च्या `login` endpoint द्वारे).
3. Tailscale प्रशासन कन्सोलमध्ये तुमच्या tailnet साठी Funnel सक्षम करा:
   <https://login.tailscale.com/admin/settings/features>.

Linux आणि macOS वर डिमन (`tailscaled`) नियंत्रित करण्यासाठी `sudo` आवश्यक असते.
POST endpoints पर्यायी `sudoPassword` फील्ड स्वीकारतात, जे कॉलच्या कालावधीसाठी
OmniRoute च्या MITM पासवर्ड कॅशेकडे (`getCachedPassword` / `setCachedPassword`)
फॉरवर्ड केले जाते. Windows येथे डीफॉल्ट सेवा इन्स्टॉलेशन वापरते:
`C:\Program Files\Tailscale\tailscale.exe`.

### REST endpoints

Tailscale चे पृष्ठभाग इतर बॅकएंडपेक्षा अधिक समृद्ध आहे, कारण इन्स्टॉलेशन,
लॉगिन, डिमन आणि टनेल या स्वतंत्र बाबी आहेत.

| Endpoint                              | पद्धत  | उद्देश                                                               |
| ------------------------------------- | ------ | -------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | एकत्रित टनेल स्थिती (`phase`, `tunnelUrl`, `apiUrl`, इत्यादी)        |
| `/api/tunnels/tailscale/check`        | `GET`  | निम्न-स्तरीय तपासणी: इन्स्टॉल आहे? लॉगिन केले आहे? डिमन सुरू आहे?    |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale इन्स्टॉल करा (SSE-प्रवाहित प्रगती इव्हेंट्स) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS वर `tailscaled` सुरू करा                                 |
| `/api/tunnels/tailscale/login`        | `POST` | लॉगिन प्रवाह सुरू करा; ब्राउझरमध्ये उघडण्यासाठी `authUrl` परत करते   |
| `/api/tunnels/tailscale/enable`       | `POST` | API पोर्टसाठी Funnel सुरू करा                                        |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel थांबवा                                                        |

सर्व Tailscale endpoints साठी व्यवस्थापन प्रमाणीकरण आवश्यक आहे (`routeUtils.ts ::
requireTailscaleAuth` पहा).

सक्षम करण्याचे उदाहरण:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

प्रशासन कन्सोलमध्ये Funnel सक्षम केलेले नसल्यास, प्रतिसादामध्ये
`funnelNotEnabled: true` आणि ब्राउझरमध्ये उघडण्यासाठी `enableUrl` समाविष्ट असते.

### पर्यायी env vars

| Variable        | उद्देश                               |
| --------------- | ------------------------------------ |
| `TAILSCALE_BIN` | `tailscale` बायनरीचा पथ अधिलिखित करा |

## एंडपॉइंटचा सारांश

| एंडपॉइंट                              | पद्धत  | बॉडी                                | प्रमाणीकरण |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | व्यवस्थापन |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | व्यवस्थापन |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | व्यवस्थापन |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | व्यवस्थापन |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | व्यवस्थापन |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | व्यवस्थापन |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | व्यवस्थापन |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | व्यवस्थापन |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | व्यवस्थापन |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | व्यवस्थापन |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | व्यवस्थापन |

केंद्रीय `/api/settings/tunnels` एंडपॉइंट उपलब्ध नाही — प्रत्येक बॅकएंड
स्वतंत्र आहे.

## OAuth कॉलबॅकसंबंधी विचार

तुम्ही OmniRoute टनेलद्वारे उघड करता तेव्हा, डॅशबोर्ड आणि OAuth प्रवाहांनी
कॉलबॅक URL `localhost` ऐवजी **सार्वजनिक** होस्टनावाच्या आधारे तयार करणे आवश्यक आहे. अन्यथा,
OAuth प्रदाता वापरकर्त्याला अशा URL कडे परत पुनर्निर्देशित करतो ज्यापर्यंत त्याचे सर्व्हर पोहोचू शकत नाहीत,
आणि हँडशेक अयशस्वी होतो.

डॅशबोर्डमधील संपादने आणि सेटिंग्ज जतन करण्यासाठी टनेलचे होस्टनाव
`NEXT_PUBLIC_BASE_URL` मध्ये कायम निश्चित करण्याची आवश्यकता नाही. प्रमाणीकृत डॅशबोर्ड
सत्राशी संलग्न असलेल्या CSRF टोकनसह समान-ओरिजिन असुरक्षित विनंत्या पाठवतो, त्यामुळे लॉग इन केल्यानंतर
तात्पुरते Cloudflare Quick Tunnel होस्टसुद्धा सामान्य UI व्यवस्थापनासाठी वापरता येतात.

हे सेट करा:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

आणि OAuth सुरू करण्यापूर्वी OmniRoute रीस्टार्ट करा. तात्पुरत्या Cloudflare Quick
Tunnels साठी प्रत्येक रीस्टार्टनंतर URL बदलतो, त्यामुळे उत्पादनातील OAuth वापरासाठी आरक्षित
डोमेनसह ngrok किंवा Tailscale Funnel ला प्राधान्य द्या.

## आरोग्य आणि देखरेख

डॅशबोर्डमध्ये **Settings → Tunnels** अंतर्गत टनेलची स्थिती दिसते:

- सक्रिय बॅकएंड आणि सध्याचा `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- सध्याचा सार्वजनिक URL आणि त्यावरून मिळवलेला API URL (`<publicUrl>/v1`).
- टनेल ज्या स्थानिक लक्ष्य URL कडे फॉरवर्ड करत आहे तो URL.
- शेवटचा त्रुटी संदेश, असल्यास.

प्रोग्रामद्वारे देखरेख करण्यासाठी प्रत्येक बॅकएंडच्या `GET` एंडपॉइंटचे नियमित पोलिंग करा. एकाच वेळी
एकापेक्षा जास्त बॅकएंड चालवण्याची परवानगी आहे; OmniRoute प्रत्येकाचा
स्वतंत्रपणे मागोवा घेईल.

## समस्यांचे निवारण

### "cloudflared बायनरी आढळली नाही"

पहिल्यांदा वापरताना OmniRoute स्वयंचलितपणे इन्स्टॉल करण्याचा प्रयत्न करतो. इन्स्टॉलेशन ब्लॉक झाले असल्यास
(प्रतिबंधित नेटवर्क, GitHub प्रवेश नाही), `cloudflared` व्यक्तिचलितपणे
<https://github.com/cloudflare/cloudflared/releases> येथून डाउनलोड करा आणि
`CLOUDFLARED_BIN=/path/to/cloudflared` सेट करा.

### "ngrok: authtoken आवश्यक आहे"

`phase: "needs_auth"` याचा अर्थ कोणतेही authtoken आढळले नाही. `.env` मध्ये
`NGROK_AUTHTOKEN` सेट करा, डॅशबोर्डद्वारे ते कॉन्फिगर करा किंवा enable POST
बॉडीमध्ये `authToken` पाठवा.

### "tailscale: funnel सक्षम केलेले नाही"

enable प्रतिसादात `funnelNotEnabled: true` समाविष्ट असल्यास, तुमच्या tailnet साठी Funnel अक्षम
आहे. परत मिळालेला `enableUrl` (किंवा अॅडमिन कन्सोलचे वैशिष्ट्य
पृष्ठ) उघडा आणि Funnel सुरू करा.

### टनेल URL मधील बदलांमुळे OAuth खंडित होते

आरक्षित डोमेनसह ngrok किंवा Tailscale Funnel वापरा (दोन्ही प्रत्येक नोडसाठी स्थिर असतात).
Cloudflare Quick Tunnels हे मुळातच तात्पुरते असतात आणि दीर्घकाळ वापरल्या जाणाऱ्या
OAuth कॉलबॅकसाठी त्यांची शिफारस केली जात नाही.

### Tailscale साठी Linux/macOS वर परवानगी नाकारली

`tailscaled` ला root आवश्यक आहे. संबंधित POST एंडपॉइंटला `sudoPassword` द्या,
किंवा डेमन स्वतः चालवा (`sudo systemctl start tailscaled`).

## हे देखील पहा

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — बाहेर जाणाऱ्या ट्रॅफिकसाठी आउटबाउंड प्रॉक्सी (1proxy, SOCKS5, HTTP).
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` सह सर्व पर्यावरण चलांची संपूर्ण यादी.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — स्थिर सार्वजनिक होस्टिंगसाठी टनेलिंगचे पर्याय.
- स्रोत: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
