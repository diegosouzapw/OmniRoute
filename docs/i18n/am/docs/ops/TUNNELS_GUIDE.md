# Tunnels Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **የእውነት ምንጭ:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **መጨረሻ የተዘመነው:** 2026-06-28 — v3.8.40

OmniRoute በሦስት የቱነል ባክኤንዶች አማካይነት የአካባቢ አገልጋዩን (`http://localhost:20128`) ለሕዝባዊ
በይነመረብ ተደራሽ ማድረግ ይችላል። ይህ ለሚከተሉት ጠቃሚ ነው፦

- በይፋ ተደራሽ የሆነ የማዘዋወሪያ URL ለሚፈልጉ የደመና አቅራቢዎች (Antigravity, Gemini, Cursor)
  የOAuth መልሶ ጥሪዎች።
- VM ሳያሰማሩ የአካባቢ ኢንስታንስዎን ከቡድን አባላትዎ ጋር ማጋራት።
- የሞባይል፣ የርቀት ወይም የኔትወርክ-ተሻጋሪ ሙከራ።

ሦስቱም ባክኤንዶች በሂደቱ ውስጥ ይተዳደራሉ — OmniRoute ከዳሽቦርዱ ወይም ከREST API መሠረታዊውን
ባይነሪ ወይም SDK ያስጀምራል/ያቆማል። የተገላቢጦሽ-ፕሮክሲ ወይም systemd ማዋቀር
አያስፈልግም።

## የባክኤንዶች አጭር መግለጫ

| ባክኤንድ                       | ቋሚነት                                      | ወጪ               | ማዋቀር                                      |
| --------------------------- | ----------------------------------------- | ---------------- | ----------------------------------------- |
| **Cloudflare Quick Tunnel** | ጊዜያዊ (በእያንዳንዱ ዳግም ማስጀመር URL ይለወጣል)        | ነፃ               | ምንም — `cloudflared`ን በራስ-ሰር ይጭናል          |
| **ngrok**                   | የሚከፈልበት ዕቅድ ወይም ቋሚ ዶሜይን እስከተዋቀረ ድረስ የተረጋጋ | ነፃ ደረጃ + የሚከፈልበት | የngrok መለያ + authtoken ያስፈልጋል             |
| **Tailscale Funnel**        | በእርስዎ tailnet ውስጥ በእያንዳንዱ ኖድ የተረጋጋ        | ለግል አጠቃቀም ነፃ     | የTailscale ጭነት + መግባት + Funnel ACL ያስፈልጋል |

አተገባበሮቹ በ`src/lib/cloudflaredTunnel.ts`፣
`src/lib/ngrokTunnel.ts` እና `src/lib/tailscaleTunnel.ts` ውስጥ ይገኛሉ። ሦስቱም `phase`፣ `running`፣ `publicUrl`፣ `apiUrl`፣
`targetUrl` እና `lastError` መስኮች ያሉት ተመሳሳይ ቅርጽ ያለው `status` ኦብጀክት ይመልሳሉ፤ ስለዚህ ዳሽቦርዱ በአንድ ወጥ መንገድ ሊያሳያቸው ይችላል።

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` `cloudflared`ን እንደ ልጅ ሂደት ያስኬዳል። የተሰየመ-ቱነል ውቅር መቅረቡ ወይም አለመቅረቡ በሚወስነው
ሁለት ሁነታዎችን ይደግፋል፦

- **ፈጣን ቱነል (ነባሪ)።** `cloudflared tunnel --url
http://localhost:<apiPort>`ን ያስኬዳል እና የተመደበውን `*.trycloudflare.com` URL
  ከstdout ይተነትናል። URL-ዎቹ ጊዜያዊ ሲሆኑ በእያንዳንዱ ዳግም ማስጀመር ይለወጣሉ።
- **የተሰየመ ቱነል (በምርጫ)።** `CLOUDFLARED_CONFIG` በአካባቢው ወደሚተዳደር
  የcloudflared `config.yml` ሲያመለክት፣ OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run`ን ያስኬዳል፤ ይህም **የተረጋጋ፣ የተሰየመ የአስተናጋጅ ስም** ይሰጥዎታል። ውቅሩ
  የቱነሉን UUID፣ `credentials-file` እና `ingress` ማዘዋወር ያቀርባል፤ ስለዚህ
  `--url` አይተላለፍም እና የZero Trust ዳሽቦርድ ቶከን አያስፈልግም። `run`
  ማረጋገጫዎችን ከውቅሩ ፍጹም የ`credentials-file` ዱካ ያነባል — `cert.pem`
  አያስፈልግም (ይህ ለቱነል የሕይወት ዑደት አስተዳደር ብቻ ጥቅም ላይ ይውላል)።

ቁልፍ ባህሪያት፦

- **በራስ-ሰር መጫን።** በመጀመሪያ አጠቃቀም፣ OmniRoute የቅርብ ጊዜውን `cloudflared`
  ባይነሪ ከይፋዊው GitHub releases ያወርዳል (የሚተዳደረው ጭነት በ
  `DATA_DIR/cloudflared/` ስር ይገኛል)። የወረደው ንብረት SHA256 ከመፈጸሙ በፊት ከrelease manifest ጋር ይረጋገጣል።
- **የሂደት ክትትል።** የcloudflared PID እና የተፈታው URL በ
  `quick-tunnel-state.json` ውስጥ በቋሚነት ይቀመጣሉ፤ ይህም ዳሽቦርዱ ከዳግም ጭነቶች በኋላ ሁኔታውን እንዲቀጥል ያስችለዋል።

### የተሰየመ ቱነል ማዋቀር (የተረጋጋ የአስተናጋጅ ስም)

1. በcloudflared CLI በአካባቢው የሚተዳደር ቱነል ይፍጠሩ (አንድ ጊዜ ብቻ)፦

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. የአስተናጋጅ ስምዎን ወደ OmniRoute የአካባቢ API ወደብ (ነባሪ 20128) የሚያዘዋውር
   `~/.cloudflared/config.yml` ይጻፉ፦

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRouteን ወደ ውቅሩ ያመልክቱ እና ቱነሉን (ዳግም) ያስጀምሩ፦

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # አማራጭ — OmniRoute የሚዘግበውን የአስተናጋጅ ስም ይተካል፤ አለበለዚያ ከውቅሩ
   # የመጀመሪያ ingress ደንብ ይነበባል፦
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   ቱነሉን እንደ ፈጣን ቱነል በተመሳሳይ መንገድ ያንቁት (ከታች REST / ዳሽቦርድ / CLI)።
   የተሰየመ ቱነል ለማውጣት የሚታሰስ ሕዝባዊ URL አያመነጭም፤ ስለዚህ ዝግጁነት የሚለየው
   ከcloudflared የተመዘገበ የedge ግንኙነት ሲሆን፣ `publicUrl`/`apiUrl`
   ከ`CLOUDFLARED_HOSTNAME` (ወይም ከውቅሩ የመጀመሪያ ingress የአስተናጋጅ ስም) ይዘገባሉ።

### በREST በኩል ማንቃት / ማሰናከል

endpoint-ው የተለያዩ `start`/`stop` ዱካዎችን ሳይሆን `{action: "enable" | "disable"}` body ይጠቀማል።
የአስተዳደር ማረጋገጫ (የአስተዳዳሪ ክፍለ ጊዜ ወይም የአስተዳዳሪ API ቁልፍ) ያስፈልጋል።

```bash
# አንቃ
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# ሁኔታ
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# አሰናክል
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

ወይም በዳሽቦርዱ በኩል፦ **ቅንብሮች → ቱነሎች → Cloudflare**።

### አማራጭ env vars

| ተለዋዋጭ                                                | ዓላማ                                                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | የሁለትዮሽ ፋይሉን ዱካ ይተካል። ከተዋቀረ እና ትክክለኛ ከሆነ፣ OmniRoute ከማውረድ ይልቅ ይህንን ይጠቀማል።                                                             |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | የማጓጓዣ ፕሮቶኮል (ነባሪው `http2`፤ `quic` እና `auto` እንዲሁም ይደገፋሉ)።                                                                            |
| `CLOUDFLARED_CONFIG`                                 | በአካባቢው የሚተዳደር የcloudflared `config.yml` ዱካ። ሲዋቀር፣ OmniRoute ፈጣን ቱነል ከማስኬድ ይልቅ **የተሰየመ/ቋሚ** ቱነል (`tunnel --config <path> run`) ያስኬዳል። |
| `CLOUDFLARED_HOSTNAME`                               | በተሰየመው ቱነል ሪፖርት የሚደረገውን ይፋዊ የአስተናጋጅ ስም ይተካል (ለምሳሌ `ai.example.com`)። ካልተዋቀረ፣ ከውቅሩ የመጀመሪያ `ingress` የአስተናጋጅ ስም ይነበባል።                 |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK**ን ይጠቀማል (በሂደቱ ውስጥ የሚሰራ፣ የCLI ንዑስ-ሂደት የሌለው)። ቀድሞ የተገነቡ ባይነሪዎች የሌሏቸው ፕላትፎርሞች መተግበሪያውን በሚነሳበት ጊዜ እንዳያበላሹ፣ የኔቲቭ ሞጁሉ ለመጀመሪያ ጊዜ ሲጀመር ዘግይቶ ይመጣል።

### ቅድመ ሁኔታዎች

1. በ<https://ngrok.com> ይመዝገቡ።
2. authtokenዎን ከngrok ዳሽቦርድ ይቅዱ።
3. ከሚከተሉት በአንዱ ያቅርቡት፦
   - `.env`: `NGROK_AUTHTOKEN=<token>`፣ ወይም
   - ዳሽቦርድ፦ **Settings → Tunnels → ngrok**፣ ወይም
   - የREST ይዘት (ለአንድ ጊዜ)፦ `{"action":"enable","authToken":"<token>"}`።

አንዳቸውም ካልተዋቀሩ፣ ሁኔታው `phase: "needs_auth"`ን ይመልሳል።

### በREST በኩል ማንቃት / ማሰናከል

```bash
# ማንቃት (NGROK_AUTHTOKENን ከenv ይጠቀማል)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# ኢንላይን token በመጠቀም ማንቃት
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# ሁኔታ
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# ማሰናከል
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

ምላሹ የተመደበውን `publicUrl` ያካትታል (ለምሳሌ፣
`https://abcd-1234.ngrok-free.app`)። ብጁ ዶሜይኖች፣ ክልሎች እና የፖሊሲ ደንቦች
በngrok ዳሽቦርድ ውስጥ መዋቀር አለባቸው — OmniRoute ራሱ የአካባቢውን ዒላማ URL ወደSDKው ከማስተላለፍ ውጭ ሌላ ነገር አያደርግም።

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` የአካባቢውን API ወደብ በ**Funnel** (ለserve የTailscale የወል በይነመረብ መውጫ) በኩል ተደራሽ ለማድረግ የስርዓቱን `tailscale` CLI ያቀናጃል። ሙሉውን የሕይወት ዑደት ይደግፋል፦ መጫን፣ መግባት፣ daemonን ማስጀመር፣ ማንቃት እና ማሰናከል።

ትግበራው `tailscale funnel --bg <port>`ን (የበስተጀርባ ሁነታ) ይጠራል። የወል URL ቅርጹ `https://<machine>.<tailnet>.ts.net/` ነው።

### ቅድመ ሁኔታዎች

1. Tailscaleን ይጫኑ (ወይም OmniRoute እንዲጭነው ይፍቀዱ — ከታች ያለውን `install` endpoint ይመልከቱ)።
2. ይግቡ (`tailscale login` ወይም በOmniRoute `login` endpoint በኩል)።
3. በTailscale የአስተዳዳሪ ኮንሶል ውስጥ Funnelን ለtailnetዎ ያንቁ፦
   <https://login.tailscale.com/admin/settings/features>።

በLinux እና macOS፣ daemonው (`tailscaled`) ለመቆጣጠር `sudo`ን ይፈልጋል። የPOST endpointዎቹ፣ ጥሪው በሚቆይበት ጊዜ ወደOmniRoute MITM የይለፍ ቃል መሸጎጫ (`getCachedPassword` / `setCachedPassword`) የሚተላለፍ አማራጭ `sudoPassword` መስክ ይቀበላሉ። Windows በ`C:\Program Files\Tailscale\tailscale.exe` ያለውን ነባሪ የአገልግሎት ጭነት ይጠቀማል።

### የREST endpointዎች

መጫን፣ መግባት፣ daemon እና tunnel የተለያዩ ጉዳዮች በመሆናቸው፣ Tailscale ከሌሎቹ backendዎች የበለጠ ሰፊ በይነገጽ አለው።

| Endpoint                              | ዘዴ     | ዓላማ                                                     |
| ------------------------------------- | ------ | ------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | የተዋሃደ የtunnel ሁኔታ (`phase`፣ `tunnelUrl`፣ `apiUrl`፣ ወዘተ) |
| `/api/tunnels/tailscale/check`        | `GET`  | ዝቅተኛ-ደረጃ ማረጋገጫ፦ ተጭኗል? ተገብቷል? daemon እየሰራ ነው?            |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscaleን መጫን (በSSE የሚለቀቁ የሂደት ክስተቶች) — Linux/macOS    |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `tailscaled`ን በLinux/macOS ማስጀመር                        |
| `/api/tunnels/tailscale/login`        | `POST` | የመግቢያ ሂደቱን መጀመር፤ በአሳሽ ውስጥ የሚከፈት `authUrl`ን ይመልሳል        |
| `/api/tunnels/tailscale/enable`       | `POST` | Funnelን ለAPI ወደብ ማስጀመር                                  |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnelን ማቆም                                             |

ሁሉም የTailscale endpointዎች የአስተዳደር ማረጋገጫ ይፈልጋሉ (`routeUtils.ts ::
requireTailscaleAuth`ን ይመልከቱ)።

የማንቃት ምሳሌ፦

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Funnel በአስተዳዳሪ ኮንሶሉ ውስጥ ካልነቃ፣ ምላሹ `funnelNotEnabled: true`ን እና በአሳሽ ውስጥ የሚከፈት `enableUrl`ን ያካትታል።

### አማራጭ env ተለዋዋጮች

| ተለዋዋጭ           | ዓላማ                        |
| --------------- | -------------------------- |
| `TAILSCALE_BIN` | የ`tailscale` ባይነሪ ዱካን መተካት |

## የመዳረሻ ነጥቦች ማጠቃለያ

| መዳረሻ ነጥብ                              | ዘዴ     | የጥያቄ አካል                            | ማረጋገጫ  |
| ------------------------------------- | ------ | ----------------------------------- | ------ |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | አስተዳደር |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | አስተዳደር |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | አስተዳደር |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | አስተዳደር |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | አስተዳደር |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | አስተዳደር |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | አስተዳደር |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | አስተዳደር |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | አስተዳደር |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | አስተዳደር |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | አስተዳደር |

ማዕከላዊ `/api/settings/tunnels` መዳረሻ ነጥብ የለም — እያንዳንዱ backend
ራሱን የቻለ ነው።

## የOAuth callback ግምትዎች

OmniRouteን በtunnel በኩል ሲያጋልጡ፣ dashboard እና የOAuth ፍሰቶች
የcallback URLዎችን በ`localhost` ሳይሆን በ**ይፋዊ** hostname መሠረት
መገንባት አለባቸው። ካልሆነ፣ የOAuth አቅራቢው ተጠቃሚውን አገልጋዮቹ
ሊደርሱበት ወደማይችሉት URL ይመልሰዋል፣ እና handshake አይሳካም።

የdashboard ማስተካከያዎች እና የቅንብሮች ማስቀመጫዎች የtunnel hostnameን
በ`NEXT_PUBLIC_BASE_URL` ውስጥ ማስቀመጥን አይጠይቁም። ማረጋገጫ ያለፈው
dashboard ከsession ጋር በተሳሰረ CSRF token ተመሳሳይ-origin unsafe
ጥያቄዎችን ይልካል፤ ስለዚህ ephemeral Cloudflare Quick Tunnel hostዎችም
ከገቡ በኋላ ለመደበኛ የUI አስተዳደር ጥቅም ላይ ሊውሉ ይችላሉ።

ይህን ያቀናብሩ፦

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

OAuthን ከማስጀመርዎ በፊት OmniRouteን እንደገና ያስጀምሩ። ለephemeral
Cloudflare Quick Tunnels URLው ከእያንዳንዱ ዳግም ማስጀመር በኋላ ይቀየራል፤
ስለዚህ በproduction ውስጥ OAuthን ለመጠቀም የተጠበቀ domain ያለውን ngrok
ወይም Tailscale Funnelን ይምረጡ።

## ጤና እና ክትትል

dashboard የtunnel ሁኔታን በ**ቅንብሮች → Tunnels** ሥር ያሳያል፦

- ንቁ backend(ዎች) እና የአሁኑ `phase` (`stopped`፣ `starting`፣ `running`፣
  `needs_auth`፣ `error`)።
- የአሁኑ ይፋዊ URL እና ከእሱ የተወሰነው API URL (`<publicUrl>/v1`)።
- tunnelው የሚያስተላልፍበት የአካባቢ target URL።
- ካለ፣ የመጨረሻው የስህተት መልዕክት።

በፕሮግራም ለመከታተል የእያንዳንዱን backend `GET` መዳረሻ ነጥብ በየጊዜው
ይጠይቁ። ከአንድ በላይ backendን በአንድ ጊዜ ማስኬድ ይፈቀዳል፤ OmniRoute
እያንዳንዱን ለብቻው ይከታተላል።

## መላ ፍለጋ

### "cloudflared binary አልተገኘም"

OmniRoute በመጀመሪያ አጠቃቀም ጊዜ በራስ-ሰር ለመጫን ይሞክራል። መጫኑ
ከታገደ (የተገደበ network፣ የGitHub መዳረሻ ከሌለ)፣ `cloudflared`ን ከ
<https://github.com/cloudflare/cloudflared/releases> በእጅ ያውርዱ እና
`CLOUDFLARED_BIN=/path/to/cloudflared` ያቀናብሩ።

### "ngrok፦ authtoken ያስፈልጋል"

`phase: "needs_auth"` ምንም authtoken አልተገኘም ማለት ነው።
`NGROK_AUTHTOKEN`ን በ`.env` ውስጥ ያቀናብሩ፣ በdashboard በኩል ያዋቅሩት፣
ወይም `authToken`ን በenable POST body ውስጥ ያስተላልፉ።

### "tailscale፦ funnel አልነቃም"

የenable ምላሹ `funnelNotEnabled: true`ን ሲያካትት፣ Funnel ለtailnetዎ
ቦዝኗል። የተመለሰውን `enableUrl` (ወይም የadmin console feature ገጽ)
ይክፈቱ እና Funnelን ያብሩ።

### የTunnel URL ለውጦች OAuthን ያበላሻሉ

ngrokን ከተጠበቀ domain ጋር ወይም Tailscale Funnelን ይጠቀሙ (ሁለቱም
በእያንዳንዱ node የተረጋጉ ናቸው)። Cloudflare Quick Tunnels በንድፋቸው
ephemeral ስለሆኑ ረጅም ጊዜ ለሚቆዩ የOAuth callbackዎች አይመከሩም።

### በLinux/macOS ላይ ለTailscale ፈቃድ ተከልክሏል

`tailscaled` root ያስፈልገዋል። `sudoPassword`ን ለሚመለከተው POST መዳረሻ
ነጥብ ያቅርቡ፣ ወይም daemonን እርስዎ ያስኪዱ (`sudo systemctl start tailscaled`)።

## በተጨማሪ ይመልከቱ

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ለወጪ ትራፊክ outbound proxy (1proxy, SOCKS5, HTTP)።
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL`ን ጨምሮ ሙሉ የenv vars ዝርዝር።
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — ለተረጋጋ የወል ማስተናገጃ ከtunneling ሌላ አማራጮች።
- ምንጭ፦ `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
