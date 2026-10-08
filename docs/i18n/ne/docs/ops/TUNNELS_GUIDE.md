# Tunnels Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **आधिकारिक स्रोत:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **पछिल्लो अद्यावधिक:** 2026-06-28 — v3.8.40

OmniRoute ले आफ्नो स्थानीय सर्भर (`http://localhost:20128`) लाई तीनवटा टनेल
ब्याकएन्डमार्फत सार्वजनिक इन्टरनेटमा उपलब्ध गराउन सक्छ। यो निम्न प्रयोजनका लागि उपयोगी छ:

- सार्वजनिक रूपमा पहुँचयोग्य रिडाइरेक्ट URL आवश्यक पर्ने क्लाउड प्रदायकहरू
  (Antigravity, Gemini, Cursor) बाट आउने OAuth कलब्याकहरू।
- VM डिप्लोय नगरी आफ्नो स्थानीय इन्स्ट्यान्स टोलीका सदस्यहरूसँग साझा गर्न।
- मोबाइल, रिमोट वा क्रस-नेटवर्क परीक्षण।

तीनवटै ब्याकएन्डहरू इन-प्रोसेस व्यवस्थापन गरिन्छन् — OmniRoute ले ड्यासबोर्ड वा
REST API बाट अन्तर्निहित बाइनरी वा SDK सुरु/बन्द गर्छ। कुनै रिभर्स-प्रोक्सी वा
systemd सेटअप आवश्यक पर्दैन।

## ब्याकएन्डहरूको संक्षिप्त अवलोकन

| ब्याकएन्ड                   | स्थायित्व                                             | लागत                             | सेटअप                                             |
| --------------------------- | ----------------------------------------------------- | -------------------------------- | ------------------------------------------------- |
| **Cloudflare Quick Tunnel** | अस्थायी (हरेक पुनः सुरुमा URL परिवर्तन हुन्छ)         | निःशुल्क                         | केही पर्दैन — `cloudflared` स्वतः इन्स्टल हुन्छ   |
| **ngrok**                   | सशुल्क योजना वा निश्चित डोमेन कन्फिगर हुँदासम्म स्थिर | निःशुल्क तह + सशुल्क             | ngrok खाता + authtoken आवश्यक पर्छ                |
| **Tailscale Funnel**        | तपाईंको tailnet भित्र प्रत्येक नोडका लागि स्थिर       | व्यक्तिगत प्रयोगका लागि निःशुल्क | Tailscale इन्स्टल + लगइन + Funnel ACL आवश्यक पर्छ |

कार्यान्वयनहरू `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, र `src/lib/tailscaleTunnel.ts` मा छन्। तीनवटैले
`phase`, `running`, `publicUrl`, `apiUrl`, `targetUrl`, र `lastError` फिल्डहरू
भएको समान संरचनाको `status` वस्तु फर्काउँछन्, जसले गर्दा ड्यासबोर्डले तिनलाई
एकरूप रूपमा रेन्डर गर्न सक्छ।

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` ले `cloudflared` लाई चाइल्ड प्रोसेसका रूपमा चलाउँछ।
यसले दुई मोड समर्थन गर्छ, जसमध्ये named-tunnel कन्फिग उपलब्ध गराइएको छ वा छैन
भन्ने आधारमा एउटा चयन हुन्छ:

- **Quick tunnel (पूर्वनिर्धारित)।** `cloudflared tunnel --url
http://localhost:<apiPort>` चलाउँछ र stdout बाट प्रदान गरिएको
  `*.trycloudflare.com` URL पार्स गर्छ। URL हरू अस्थायी हुन्छन् र हरेक पुनः सुरुमा
  परिवर्तन हुन्छन्।
- **Named tunnel (ऐच्छिक)।** `CLOUDFLARED_CONFIG` ले स्थानीय रूपमा व्यवस्थापन गरिएको
  cloudflared `config.yml` लाई सङ्केत गर्दा, OmniRoute ले `cloudflared tunnel --no-autoupdate
--config <path> run` चलाउँछ, जसले तपाईंलाई **स्थिर, नाम दिइएको होस्टनेम** दिन्छ।
  कन्फिगले tunnel UUID, `credentials-file`, र `ingress` राउटिङ उपलब्ध गराउने
  भएकाले कुनै `--url` पास गरिँदैन र Zero Trust ड्यासबोर्ड टोकन आवश्यक पर्दैन।
  `run` ले कन्फिगको निरपेक्ष `credentials-file` पथबाट क्रेडेन्सियलहरू पढ्छ —
  `cert.pem` आवश्यक पर्दैन (त्यो टनेलको जीवनचक्र व्यवस्थापनका लागि मात्र प्रयोग हुन्छ)।

मुख्य व्यवहारहरू:

- **स्वतः इन्स्टल।** पहिलो प्रयोगमा OmniRoute ले आधिकारिक GitHub रिलिजहरूबाट
  नवीनतम `cloudflared` बाइनरी डाउनलोड गर्छ (व्यवस्थित इन्स्टल
  `DATA_DIR/cloudflared/` अन्तर्गत रहन्छ)। कार्यान्वयनअघि डाउनलोड गरिएको एसेटको
  SHA256 लाई रिलिज म्यानिफेस्टसँग प्रमाणीकरण गरिन्छ।
- **प्रोसेस सुपरिवेक्षण।** cloudflared PID र निर्धारण गरिएको URL लाई
  `quick-tunnel-state.json` मा सुरक्षित राखिन्छ, जसले गर्दा ड्यासबोर्डले
  पुनः लोडहरूबीच स्थिति पुनःस्थापना गर्न सक्छ।

### Named tunnel सेटअप (स्थिर होस्टनेम)

1. cloudflared CLI प्रयोग गरेर स्थानीय रूपमा व्यवस्थापन गरिएको टनेल सिर्जना गर्नुहोस्
   (एक पटक मात्र):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. आफ्नो होस्टनेमलाई OmniRoute को स्थानीय API पोर्ट (पूर्वनिर्धारित 20128) तर्फ
   रुट गर्ने `~/.cloudflared/config.yml` लेख्नुहोस्:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute लाई उक्त कन्फिगतर्फ सङ्केत गराउनुहोस् र टनेल (पुनः) सुरु गर्नुहोस्:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ऐच्छिक — OmniRoute ले रिपोर्ट गर्ने होस्टनेमलाई ओभरराइड गर्छ; अन्यथा
   # कन्फिगको पहिलो ingress नियमबाट पढिन्छ:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   टनेललाई quick tunnel कै तरिकाले सक्षम गर्नुहोस् (तल REST / ड्यासबोर्ड / CLI)।
   named tunnel ले सङ्कलन गर्न मिल्ने कुनै सार्वजनिक URL उत्सर्जन नगर्ने भएकाले,
   तत्परता cloudflared को दर्ता गरिएको edge जडानबाट पत्ता लगाइन्छ, र
   `publicUrl`/`apiUrl` लाई `CLOUDFLARED_HOSTNAME` (वा कन्फिगको पहिलो ingress
   होस्टनेम) बाट रिपोर्ट गरिन्छ।

### REST मार्फत सक्षम / असक्षम गर्ने

एन्डपोइन्टले छुट्टाछुट्टै `start`/`stop` पथ होइन,
`{action: "enable" | "disable"}` बडी प्रयोग गर्छ। व्यवस्थापन प्रमाणीकरण
(admin session वा admin API key) आवश्यक पर्छ।

```bash
# सक्षम गर्नुहोस्
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# स्थिति
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# असक्षम गर्नुहोस्
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

वा ड्यासबोर्डमार्फत: **Settings → Tunnels → Cloudflare**।

### ऐच्छिक env vars

| चर                                                   | उद्देश्य                                                                                                                                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | बाइनरी पथलाई अधिलेखन गर्छ। सेट गरिएको र मान्य भएमा, OmniRoute ले डाउनलोड गर्नुको सट्टा यसैलाई प्रयोग गर्छ।                                                                             |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ट्रान्सपोर्ट प्रोटोकल (पूर्वनिर्धारित `http2`; `quic`, `auto` पनि)।                                                                                                                    |
| `CLOUDFLARED_CONFIG`                                 | स्थानीय रूपमा व्यवस्थापन गरिएको cloudflared `config.yml` को पथ। सेट गरिएको अवस्थामा, OmniRoute ले द्रुत टनेलको सट्टा **नाम दिइएको/स्थायी** टनेल (`tunnel --config <path> run`) चलाउँछ। |
| `CLOUDFLARED_HOSTNAME`                               | नाम दिइएको टनेलले रिपोर्ट गर्ने सार्वजनिक होस्टनामलाई अधिलेखन गर्छ (जस्तै `ai.example.com`)। सेट नगरिएको अवस्थामा, कन्फिगको पहिलो `ingress` होस्टनामबाट पढिन्छ।                        |

## 2. ngrok

`src/lib/ngrokTunnel.ts` ले **`@ngrok/ngrok` SDK** प्रयोग गर्छ (प्रक्रियाभित्रै, कुनै CLI
उपप्रक्रिया छैन)। पूर्वनिर्मित बाइनरीहरू नभएका प्लेटफर्महरूमा एप बुट हुँदा नबिग्रियोस् भनेर
नेटिभ मोड्युललाई पहिलोपटक सुरु गर्दा मात्र आयात गरिन्छ।

### पूर्वापेक्षाहरू

1. <https://ngrok.com> मा साइन अप गर्नुहोस्।
2. ngrok ड्यासबोर्डबाट आफ्नो authtoken प्रतिलिपि गर्नुहोस्।
3. यसलाई निम्नमध्ये कुनै एक माध्यमबाट उपलब्ध गराउनुहोस्:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, वा
   - ड्यासबोर्ड: **सेटिङहरू → टनेलहरू → ngrok**, वा
   - REST बडी (एकपटकका लागि): `{"action":"enable","authToken":"<token>"}`।

कुनै पनि कन्फिगर गरिएको छैन भने, स्थितिले `phase: "needs_auth"` फर्काउँछ।

### REST मार्फत सक्षम / असक्षम गर्ने

```bash
# सक्षम गर्नुहोस् (env बाट NGROK_AUTHTOKEN प्रयोग गर्छ)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# इनलाइन टोकनसहित सक्षम गर्नुहोस्
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# स्थिति
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# असक्षम गर्नुहोस्
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

प्रतिक्रियामा तोकिएको `publicUrl` समावेश हुन्छ (जस्तै
`https://abcd-1234.ngrok-free.app`)। अनुकूलन डोमेनहरू, क्षेत्रहरू र नीति नियमहरू
ngrok ड्यासबोर्डमा कन्फिगर गर्नुपर्छ — OmniRoute आफैंले स्थानीय लक्ष्य URL लाई
SDK मा फर्वार्ड मात्र गर्छ।

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` ले **Funnel** (serve का लागि Tailscale को सार्वजनिक-इन्टरनेट
बहिर्गमन) मार्फत स्थानीय API पोर्ट सार्वजनिक गर्न प्रणालीको `tailscale` CLI सञ्चालन गर्छ।
यसले पूर्ण जीवनचक्र समर्थन गर्छ: स्थापना, लगइन, डेमन सुरु गर्ने, सक्षम गर्ने र असक्षम गर्ने।

कार्यान्वयनले `tailscale funnel --bg <port>` (पृष्ठभूमि मोड) आह्वान गर्छ। सार्वजनिक
URL को स्वरूप `https://<machine>.<tailnet>.ts.net/` हुन्छ।

### पूर्वापेक्षाहरू

1. Tailscale स्थापना गर्नुहोस् (वा OmniRoute लाई गर्न दिनुहोस् — तलको `install` एन्डपोइन्ट हेर्नुहोस्)।
2. साइन इन गर्नुहोस् (`tailscale login` वा OmniRoute को `login` एन्डपोइन्टमार्फत)।
3. Tailscale एडमिन कन्सोलमा आफ्नो tailnet का लागि Funnel सक्षम गर्नुहोस्:
   <https://login.tailscale.com/admin/settings/features>।

Linux र macOS मा डेमन (`tailscaled`) नियन्त्रण गर्न `sudo` आवश्यक पर्छ। POST
एन्डपोइन्टहरूले वैकल्पिक `sudoPassword` फिल्ड स्वीकार गर्छन्, जसलाई कलको अवधिभर
OmniRoute को MITM पासवर्ड क्यास (`getCachedPassword` / `setCachedPassword`) मा
फर्वार्ड गरिन्छ। Windows ले `C:\Program Files\Tailscale\tailscale.exe` मा रहेको
पूर्वनिर्धारित सेवा स्थापना प्रयोग गर्छ।

### REST एन्डपोइन्टहरू

स्थापना, लगइन, डेमन र टनेल अलग-अलग पक्ष भएकाले Tailscale मा अन्य ब्याकएन्डहरूको
तुलनामा थप विस्तृत सतह छ।

| एन्डपोइन्ट                            | विधि   | उद्देश्य                                                                         |
| ------------------------------------- | ------ | -------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | समग्र टनेल स्थिति (`phase`, `tunnelUrl`, `apiUrl`, आदि)                          |
| `/api/tunnels/tailscale/check`        | `GET`  | तल्लो-स्तरको जाँच: स्थापित छ? लगइन गरिएको छ? डेमन चलिरहेको छ?                    |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale स्थापना गर्ने (SSE-मार्फत स्ट्रिम गरिएका प्रगति घटनाहरू) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS मा `tailscaled` सुरु गर्ने                                           |
| `/api/tunnels/tailscale/login`        | `POST` | लगइन प्रवाह सुरु गर्ने; ब्राउजरमा खोल्नका लागि `authUrl` फर्काउँछ                |
| `/api/tunnels/tailscale/enable`       | `POST` | API पोर्टका लागि Funnel सुरु गर्ने                                               |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel रोक्ने                                                                    |

सबै Tailscale एन्डपोइन्टहरूलाई व्यवस्थापन प्रमाणीकरण आवश्यक हुन्छ (`routeUtils.ts ::
requireTailscaleAuth` हेर्नुहोस्)।

सक्षम गर्ने उदाहरण:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

एडमिन कन्सोलमा Funnel सक्षम गरिएको छैन भने, प्रतिक्रियामा
`funnelNotEnabled: true` र ब्राउजरमा खोल्नका लागि एउटा `enableUrl` समावेश हुन्छ।

### वैकल्पिक env चरहरू

| चर              | उद्देश्य                            |
| --------------- | ----------------------------------- |
| `TAILSCALE_BIN` | `tailscale` बाइनरी पथ ओभरराइड गर्ने |

## एन्डपोइन्ट सारांश

| एन्डपोइन्ट                            | विधि   | बडी                                 | प्रमाणीकरण |
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

कुनै केन्द्रीय `/api/settings/tunnels` एन्डपोइन्ट छैन — प्रत्येक ब्याकएन्ड
स्वतन्त्र छ।

## OAuth कलब्याकसम्बन्धी विचारहरू

तपाईंले टनेलमार्फत OmniRoute उपलब्ध गराउँदा, ड्यासबोर्ड र OAuth प्रवाहहरूले
`localhost` नभई **सार्वजनिक** होस्टनाम प्रयोग गरेर कलब्याक URL हरू बनाउनुपर्छ। अन्यथा,
OAuth प्रदायकले प्रयोगकर्तालाई आफ्ना सर्भरहरूले पहुँच गर्न नसक्ने URL मा फिर्ता
पठाउँछ, र ह्यान्डसेक असफल हुन्छ।

ड्यासबोर्डमा गरिने सम्पादन र सेटिङ सेभ गर्दा टनेल होस्टनामलाई
`NEXT_PUBLIC_BASE_URL` मा स्थिर राख्न आवश्यक पर्दैन। प्रमाणीकरण गरिएको ड्यासबोर्डले
सेसनसँग बाँधिएको CSRF टोकनसहित समान-ओरिजिनका असुरक्षित अनुरोधहरू पठाउँछ, त्यसैले
लगइन गरेपछि अस्थायी Cloudflare Quick Tunnel होस्टहरू पनि सामान्य UI व्यवस्थापनका
लागि प्रयोग गर्न सकिन्छ।

सेट गर्नुहोस्:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

र OAuth सुरु गर्नुअघि OmniRoute पुनः सुरु गर्नुहोस्। अस्थायी Cloudflare Quick
Tunnels का लागि प्रत्येक पुनः सुरु गरेपछि URL परिवर्तन हुन्छ, त्यसैले उत्पादनमा
OAuth प्रयोग गर्न आरक्षित डोमेनसहितको ngrok वा Tailscale Funnel रोज्नुहोस्।

## स्वास्थ्य र अनुगमन

ड्यासबोर्डले **Settings → Tunnels** अन्तर्गत टनेलको अवस्था देखाउँछ:

- सक्रिय ब्याकएन्ड(हरू) र हालको `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`)।
- हालको सार्वजनिक URL र त्यसबाट निकालिएको API URL (`<publicUrl>/v1`)।
- टनेलले फर्वार्ड गरिरहेको स्थानीय लक्ष्य URL।
- अन्तिम त्रुटि सन्देश, यदि कुनै भएमा।

प्रोग्राममार्फत अनुगमन गर्न प्रत्येक ब्याकएन्डका `GET` एन्डपोइन्टहरू पोल गर्नुहोस्।
एकै समयमा एकभन्दा बढी ब्याकएन्ड चलाउन अनुमति छ; OmniRoute ले प्रत्येकलाई
स्वतन्त्र रूपमा ट्र्याक गर्नेछ।

## समस्या समाधान

### "cloudflared बाइनरी फेला परेन"

OmniRoute ले पहिलो प्रयोगमा स्वतः इन्स्टल गर्ने प्रयास गर्छ। यदि इन्स्टलेसन
अवरुद्ध छ भने (प्रतिबन्धित नेटवर्क, GitHub मा पहुँच छैन), `cloudflared` लाई
<https://github.com/cloudflare/cloudflared/releases> बाट म्यानुअल रूपमा डाउनलोड
गर्नुहोस् र `CLOUDFLARED_BIN=/path/to/cloudflared` सेट गर्नुहोस्।

### "ngrok: authtoken आवश्यक छ"

`phase: "needs_auth"` को अर्थ कुनै authtoken फेला परेन भन्ने हो। `.env` मा
`NGROK_AUTHTOKEN` सेट गर्नुहोस्, ड्यासबोर्डमार्फत यसलाई कन्फिगर गर्नुहोस्, वा
सक्षम गर्ने POST बडीमा `authToken` पठाउनुहोस्।

### "tailscale: funnel सक्षम गरिएको छैन"

सक्षम गर्ने प्रतिक्रियामा `funnelNotEnabled: true` समावेश हुँदा, तपाईंको
tailnet का लागि Funnel अक्षम गरिएको हुन्छ। फिर्ता आएको `enableUrl` (वा एडमिन
कन्सोलको फिचर पृष्ठ) खोल्नुहोस् र Funnel सक्रिय गर्नुहोस्।

### टनेल URL परिवर्तन हुँदा OAuth बिग्रन्छ

आरक्षित डोमेनसहितको ngrok वा Tailscale Funnel प्रयोग गर्नुहोस् (दुवै प्रत्येक
नोडका लागि स्थिर हुन्छन्)। Cloudflare Quick Tunnels डिजाइनअनुसार अस्थायी हुन्छन्
र दीर्घकालीन OAuth कलब्याकका लागि सिफारिस गरिँदैनन्।

### Tailscale का लागि Linux/macOS मा अनुमति अस्वीकृत

`tailscaled` लाई root चाहिन्छ। सम्बन्धित POST एन्डपोइन्टमा `sudoPassword`
प्रदान गर्नुहोस्, वा डेमन आफैँ चलाउनुहोस् (`sudo systemctl start tailscaled`)।

## यो पनि हेर्नुहोस्

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — बाहिरिने ट्राफिकका लागि आउटबाउन्ड प्रोक्सी (1proxy, SOCKS5, HTTP)।
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` सहितका वातावरण चरहरूको पूर्ण सूची।
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — स्थिर सार्वजनिक होस्टिङका लागि टनेलिङका विकल्पहरू।
- स्रोत: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`।
