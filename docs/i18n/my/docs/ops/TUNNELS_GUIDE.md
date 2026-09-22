# Tunnels Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **အမှန်တရား၏ မူလရင်းမြစ်:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **နောက်ဆုံး အပ်ဒိတ်လုပ်ထားသည့်ရက်:** 2026-06-28 — v3.8.40

OmniRoute သည် tunnel backend သုံးမျိုးမှတစ်ဆင့် ၎င်း၏ local server (`http://localhost:20128`) ကို အများသုံး
အင်တာနက်သို့ ဖွင့်ပေးနိုင်သည်။ ၎င်းသည် အောက်ပါကိစ္စများအတွက် အသုံးဝင်သည်-

- အများပြည်သူ ဝင်ရောက်နိုင်သည့် redirect URL လိုအပ်သော cloud provider များ (Antigravity, Gemini, Cursor) ထံမှ OAuth callback များ။
- VM တစ်ခု deploy လုပ်စရာမလိုဘဲ သင့် local instance ကို အသင်းဖော်များနှင့် မျှဝေခြင်း။
- Mobile၊ remote သို့မဟုတ် network မတူညီသည့် စမ်းသပ်မှုများ။

Backend သုံးမျိုးလုံးကို process အတွင်းမှ စီမံသည် — OmniRoute သည် dashboard သို့မဟုတ် REST API မှတစ်ဆင့်
နောက်ခံ binary သို့မဟုတ် SDK ကို စတင်/ရပ်တန့်ပေးသည်။ Reverse proxy သို့မဟုတ် systemd setup
မလိုအပ်ပါ။

## Backend များကို အကျဉ်းချုပ်ကြည့်ခြင်း

| Backend                     | တည်မြဲမှု                                                           | ကုန်ကျစရိတ်               | Setup                                                   |
| --------------------------- | ------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | ယာယီ (ပြန်လည်စတင်တိုင်း URL ပြောင်းလဲသည်)                           | အခမဲ့                     | မလိုအပ် — `cloudflared` ကို အလိုအလျောက် ထည့်သွင်းပေးသည် |
| **ngrok**                   | အခပေးအစီအစဉ် သို့မဟုတ် သတ်မှတ် domain ကို စီစဉ်ထားသရွေ့ တည်ငြိမ်သည် | အခမဲ့အဆင့် + အခပေး        | ngrok account + authtoken လိုအပ်သည်                     |
| **Tailscale Funnel**        | သင့် tailnet အတွင်း node တစ်ခုချင်းစီအတွက် တည်ငြိမ်သည်              | ကိုယ်ပိုင်သုံးအတွက် အခမဲ့ | Tailscale ထည့်သွင်းခြင်း + login + Funnel ACL လိုအပ်သည် |

Implementation များသည် `src/lib/cloudflaredTunnel.ts`၊
`src/lib/ngrokTunnel.ts` နှင့် `src/lib/tailscaleTunnel.ts` တို့တွင် ရှိသည်။ သုံးမျိုးလုံးသည်
`phase`၊ `running`၊ `publicUrl`၊ `apiUrl`၊
`targetUrl` နှင့် `lastError` field များပါဝင်သည့် ပုံစံတူ `status` object တစ်ခုကို ပြန်ပေးသောကြောင့် dashboard တွင် ၎င်းတို့ကို တစ်သမတ်တည်း ဖော်ပြနိုင်သည်။

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` သည် `cloudflared` ကို child process အဖြစ် လုပ်ဆောင်သည်။ Named-tunnel config ပေးထားခြင်း ရှိ/မရှိအပေါ် မူတည်၍ ရွေးချယ်သည့်
mode နှစ်မျိုးကို ပံ့ပိုးသည်-

- **Quick tunnel (ပုံသေသတ်မှတ်ချက်)။** `cloudflared tunnel --url
http://localhost:<apiPort>` ကို လုပ်ဆောင်ပြီး သတ်မှတ်ပေးထားသည့် `*.trycloudflare.com` URL ကို
  stdout မှ ခွဲထုတ်ရယူသည်။ URL များသည် ယာယီဖြစ်ပြီး ပြန်လည်စတင်တိုင်း ပြောင်းလဲသည်။
- **Named tunnel (ရွေးချယ်ဖွင့်နိုင်သည်)။** `CLOUDFLARED_CONFIG` က local တွင် စီမံထားသော
  cloudflared `config.yml` ကို ညွှန်ပြသည့်အခါ OmniRoute သည် `cloudflared tunnel --no-autoupdate
--config <path> run` ကို လုပ်ဆောင်ပေးပြီး **တည်ငြိမ်သော အမည်ပေးထားသည့် hostname** တစ်ခု ရရှိစေသည်။ Config က
  tunnel UUID၊ `credentials-file` နှင့် `ingress` routing တို့ကို ပေးသောကြောင့်
  `--url` ကို ထည့်သွင်းမပေးဘဲ Zero Trust dashboard token လည်း မလိုအပ်ပါ။ `run` သည်
  config ထဲရှိ absolute `credentials-file` path မှ credential များကို ဖတ်သည် — `cert.pem`
  မလိုအပ်ပါ (၎င်းကို tunnel lifecycle စီမံခန့်ခွဲမှုအတွက်သာ အသုံးပြုသည်)။

အဓိက လုပ်ဆောင်ပုံများ-

- **အလိုအလျောက် ထည့်သွင်းခြင်း။** ပထမဆုံး အသုံးပြုချိန်တွင် OmniRoute သည် နောက်ဆုံးထွက် `cloudflared`
  binary ကို တရားဝင် GitHub release များမှ download လုပ်သည် (စီမံထားသော install ကို
  `DATA_DIR/cloudflared/` အောက်တွင် ထားရှိသည်)။ Download လုပ်ထားသော asset ၏ SHA256 ကို မလုပ်ဆောင်မီ
  release manifest နှင့် တိုက်စစ်အတည်ပြုသည်။
- **Process ကြီးကြပ်ခြင်း။** Dashboard ကို reload လုပ်သည့်အခါ status ကို ပြန်လည်ဆက်လက်ဖော်ပြနိုင်ရန် cloudflared PID နှင့် ဖြေရှင်းရရှိထားသော URL ကို
  `quick-tunnel-state.json` တွင် အမြဲတမ်းသိမ်းဆည်းထားသည်။

### Named tunnel setup (တည်ငြိမ်သော hostname)

1. cloudflared CLI ဖြင့် local တွင် စီမံသည့် tunnel တစ်ခု ဖန်တီးပါ (တစ်ကြိမ်သာ)-

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. သင့် hostname ကို OmniRoute ၏ local
   API port (ပုံသေ 20128) သို့ route လုပ်ပေးသည့် `~/.cloudflared/config.yml` ကို ရေးပါ-

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute ကို config သို့ ညွှန်ပြပြီး tunnel ကို (ပြန်လည်)စတင်ပါ-

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ရွေးချယ်နိုင်သည် — OmniRoute က ဖော်ပြသည့် hostname ကို အစားထိုးသတ်မှတ်သည်၊ မဟုတ်ပါက
   # config ၏ ပထမဆုံး ingress rule မှ ဖတ်ယူသည်-
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Quick tunnel ဖွင့်သည့်နည်းအတိုင်းပင် tunnel ကို ဖွင့်ပါ (အောက်ရှိ REST / dashboard / CLI
   ကို ကြည့်ပါ)။ Named tunnel သည် ခွဲထုတ်ရယူရန် public URL မထုတ်ပေးသောကြောင့် အသင့်ဖြစ်မှုကို
   cloudflared ၏ မှတ်ပုံတင်ထားသော edge connection မှ သိရှိပြီး `publicUrl`/`apiUrl` ကို
   `CLOUDFLARED_HOSTNAME` (သို့မဟုတ် config ၏ ပထမဆုံး ingress hostname) မှ ဖော်ပြသည်။

### REST မှတစ်ဆင့် ဖွင့်ခြင်း / ပိတ်ခြင်း

Endpoint သည် သီးခြား `start`/`stop` path များအစား `{action: "enable" | "disable"}` body ကို
အသုံးပြုသည်။ Management auth (admin session သို့မဟုတ် admin API key)
လိုအပ်သည်။

```bash
# ဖွင့်ရန်
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# အခြေအနေ
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# ပိတ်ရန်
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

သို့မဟုတ် dashboard မှတစ်ဆင့်- **Settings → Tunnels → Cloudflare**။

### ရွေးချယ်သတ်မှတ်နိုင်သော env var များ

| Variable                                             | ရည်ရွယ်ချက်                                                                                                                                                                                           |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | binary path ကို အစားထိုးသတ်မှတ်သည်။ သတ်မှတ်ထားပြီး မှန်ကန်ပါက OmniRoute သည် download လုပ်မည့်အစား ၎င်းကို အသုံးပြုသည်။                                                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ပို့ဆောင်ရေး protocol (မူလသတ်မှတ်ချက်မှာ `http2`; `quic` နှင့် `auto` ကိုလည်း အသုံးပြုနိုင်သည်)။                                                                                                      |
| `CLOUDFLARED_CONFIG`                                 | စက်တွင်းတွင် စီမံထားသော cloudflared `config.yml` သို့ path။ သတ်မှတ်ထားပါက OmniRoute သည် quick tunnel အစား **အမည်ပေးထားသော/အမြဲတမ်းတည်ရှိသော** tunnel (`tunnel --config <path> run`) ကို လုပ်ဆောင်သည်။ |
| `CLOUDFLARED_HOSTNAME`                               | အမည်ပေးထားသော tunnel မှ ဖော်ပြသည့် အများသုံး hostname ကို အစားထိုးသတ်မှတ်သည် (ဥပမာ `ai.example.com`)။ မသတ်မှတ်ထားပါက config ၏ ပထမဆုံး `ingress` hostname မှ ဖတ်ယူသည်။                                 |

## 2. ngrok

`src/lib/ngrokTunnel.ts` သည် **`@ngrok/ngrok` SDK** ကို အသုံးပြုသည် (လုပ်ငန်းစဉ်အတွင်း အသုံးပြုပြီး CLI လုပ်ငန်းစဉ်ခွဲ မပါဝင်ပါ)။ ကြိုတင်တည်ဆောက်ထားသော binary များ မရှိသည့် platform များတွင် app စတင်ချိန်၌ ပျက်သွားခြင်း မရှိစေရန် native module ကို ပထမဆုံး စတင်သည့်အချိန်မှသာ တင်သွင်းသည်။

### ကြိုတင်လိုအပ်ချက်များ

1. <https://ngrok.com> တွင် အကောင့်ဖွင့်ပါ။
2. ngrok dashboard မှ သင်၏ authtoken ကို ကူးယူပါ။
3. ၎င်းကို အောက်ပါနည်းလမ်းများထဲမှ တစ်ခုဖြင့် ထည့်သွင်းပါ-
   - `.env`: `NGROK_AUTHTOKEN=<token>`၊ သို့မဟုတ်
   - Dashboard: **Settings → Tunnels → ngrok**၊ သို့မဟုတ်
   - REST body (တစ်ကြိမ်သုံး): `{"action":"enable","authToken":"<token>"}`။

မည်သည့်နေရာတွင်မျှ သတ်မှတ်မထားပါက status သည် `phase: "needs_auth"` ကို ပြန်ပေးသည်။

### REST မှတစ်ဆင့် ဖွင့်ခြင်း / ပိတ်ခြင်း

```bash
# ဖွင့်ရန် (env မှ NGROK_AUTHTOKEN ကို အသုံးပြုသည်)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# တိုက်ရိုက်ထည့်သွင်းထားသော token ဖြင့် ဖွင့်ရန်
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# အခြေအနေ
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# ပိတ်ရန်
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

တုံ့ပြန်ချက်တွင် သတ်မှတ်ပေးထားသော `publicUrl` (ဥပမာ
`https://abcd-1234.ngrok-free.app`) ပါဝင်သည်။ စိတ်ကြိုက် domain များ၊ region များနှင့် policy rule များကို ngrok dashboard တွင် ပြင်ဆင်သတ်မှတ်ရမည် — OmniRoute ကိုယ်တိုင်က local target URL ကို SDK သို့သာ လွှဲပို့သည်။

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` သည် local API port ကို **Funnel** (serve အတွက် Tailscale ၏ အများသုံးအင်တာနက်သို့ ထွက်ပေါက်) မှတစ်ဆင့် ဖော်ထုတ်ရန် system `tailscale` CLI ကို စီမံလုပ်ဆောင်သည်။ ၎င်းသည် ထည့်သွင်းခြင်း၊ ဝင်ရောက်ခြင်း၊ daemon စတင်ခြင်း၊ ဖွင့်ခြင်းနှင့် ပိတ်ခြင်းတို့ပါဝင်သော lifecycle တစ်ခုလုံးကို ပံ့ပိုးသည်။

အကောင်အထည်ဖော်မှုသည် `tailscale funnel --bg <port>` (နောက်ခံမုဒ်) ကို ခေါ်ယူအသုံးပြုသည်။ အများသုံး URL ၏ ပုံစံမှာ `https://<machine>.<tailnet>.ts.net/` ဖြစ်သည်။

### ကြိုတင်လိုအပ်ချက်များ

1. Tailscale ကို ထည့်သွင်းပါ (သို့မဟုတ် OmniRoute အား ထည့်သွင်းစေပါ — အောက်ပါ `install` endpoint ကို ကြည့်ပါ)။
2. ဝင်ရောက်ပါ (`tailscale login` သို့မဟုတ် OmniRoute ၏ `login` endpoint မှတစ်ဆင့်)။
3. Tailscale admin console တွင် သင်၏ tailnet အတွက် Funnel ကို ဖွင့်ပါ-
   <https://login.tailscale.com/admin/settings/features>။

Linux နှင့် macOS တွင် daemon (`tailscaled`) ကို ထိန်းချုပ်ရန် `sudo` လိုအပ်သည်။ POST endpoint များသည် ခေါ်ယူမှုကြာချိန်အတွင်း OmniRoute ၏ MITM စကားဝှက် cache (`getCachedPassword` / `setCachedPassword`) သို့ လွှဲပို့ပေးမည့် ရွေးချယ်နိုင်သော `sudoPassword` field ကို လက်ခံသည်။ Windows သည် `C:\Program Files\Tailscale\tailscale.exe` ရှိ မူလ service ထည့်သွင်းမှုကို အသုံးပြုသည်။

### REST endpoint များ

ထည့်သွင်းခြင်း၊ ဝင်ရောက်ခြင်း၊ daemon နှင့် tunnel တို့သည် သီးခြားကိစ္စများဖြစ်သောကြောင့် Tailscale တွင် အခြား backend များထက် ပိုမိုပြည့်စုံသော interface ရှိသည်။

| Endpoint                              | Method | ရည်ရွယ်ချက်                                                                                  |
| ------------------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | စုစည်းထားသော tunnel အခြေအနေ (`phase`, `tunnelUrl`, `apiUrl` စသည်)                            |
| `/api/tunnels/tailscale/check`        | `GET`  | အောက်ခြေအဆင့် စစ်ဆေးမှု- ထည့်သွင်းထားသလား။ ဝင်ရောက်ထားသလား။ daemon လည်ပတ်နေသလား။             |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale ကို ထည့်သွင်းရန် (SSE ဖြင့် stream လုပ်ထားသော တိုးတက်မှု event များ) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS တွင် `tailscaled` ကို စတင်ရန်                                                    |
| `/api/tunnels/tailscale/login`        | `POST` | ဝင်ရောက်မှုလုပ်ငန်းစဉ်ကို စတင်ရန်၊ browser တွင် ဖွင့်ရန် `authUrl` ကို ပြန်ပေးသည်            |
| `/api/tunnels/tailscale/enable`       | `POST` | API port အတွက် Funnel ကို စတင်ရန်                                                            |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel ကို ရပ်တန့်ရန်                                                                        |

Tailscale endpoint အားလုံးသည် စီမံခန့်ခွဲမှုဆိုင်ရာ authentication လိုအပ်သည် (`routeUtils.ts ::
requireTailscaleAuth` ကို ကြည့်ပါ)။

ဖွင့်ရန် နမူနာ-

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

admin console တွင် Funnel ကို မဖွင့်ထားပါက တုံ့ပြန်ချက်တွင် `funnelNotEnabled: true` နှင့် browser တွင် ဖွင့်ရန် `enableUrl` တို့ ပါဝင်သည်။

### ရွေးချယ်နိုင်သော env var များ

| Variable        | ရည်ရွယ်ချက်                                    |
| --------------- | ---------------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` binary path ကို အစားထိုးသတ်မှတ်ရန် |

## Endpoint အကျဉ်းချုပ်

| Endpoint                              | Method | Body                                | Auth       |
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

ဗဟိုချုပ်ကိုင်ထားသော `/api/settings/tunnels` endpoint မရှိပါ — backend တစ်ခုချင်းစီသည်
သီးခြားလွတ်လပ်စွာ အလုပ်လုပ်ပါသည်။

## OAuth callback အတွက် ထည့်သွင်းစဉ်းစားရမည့်အချက်များ

OmniRoute ကို tunnel မှတစ်ဆင့် ပြင်ပသို့ ဖွင့်ပေးသည့်အခါ dashboard နှင့် OAuth flow များသည်
callback URL များကို `localhost` မဟုတ်ဘဲ **အများသုံး** hostname ကိုအခြေခံ၍
တည်ဆောက်ရပါမည်။ မဟုတ်ပါက OAuth provider သည် အသုံးပြုသူကို ၎င်း၏ server များမှ
ရောက်ရှိ၍မရနိုင်သော URL သို့ ပြန်လည်လွှဲပြောင်းမည်ဖြစ်ပြီး handshake မအောင်မြင်ပါ။

Dashboard မှ ပြင်ဆင်မှုများနှင့် setting သိမ်းဆည်းမှုများအတွက် tunnel hostname ကို
`NEXT_PUBLIC_BASE_URL` တွင် သတ်မှတ်ထားရန် မလိုအပ်ပါ။ အထောက်အထားစစ်ဆေးပြီးသော
dashboard သည် session နှင့်ချိတ်ဆက်ထားသည့် CSRF token ဖြင့် same-origin unsafe
request များကို ပေးပို့သောကြောင့် login ဝင်ပြီးနောက် ယာယီ Cloudflare Quick Tunnel
host များကို ပုံမှန် UI စီမံခန့်ခွဲမှုအတွက် ဆက်လက်အသုံးပြုနိုင်ပါသည်။

အောက်ပါအတိုင်း သတ်မှတ်ပါ-

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

ထို့နောက် OAuth မစတင်မီ OmniRoute ကို restart လုပ်ပါ။ ယာယီ Cloudflare Quick
Tunnel များအတွက် restart လုပ်တိုင်း URL ပြောင်းလဲသွားသောကြောင့် production OAuth
အသုံးပြုမှုအတွက် reserved domain ပါသည့် ngrok သို့မဟုတ် Tailscale Funnel ကို
ဦးစားပေးအသုံးပြုပါ။

## ကျန်းမာရေးအခြေအနေနှင့် စောင့်ကြည့်ခြင်း

Dashboard သည် tunnel အခြေအနေကို **Settings → Tunnels** အောက်တွင် ဖော်ပြပေးပါသည်-

- လက်ရှိအသုံးပြုနေသော backend များနှင့် လက်ရှိ `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`)။
- လက်ရှိ public URL နှင့် ၎င်းမှ ဆင်းသက်တွက်ချက်ထားသော API URL (`<publicUrl>/v1`)။
- Tunnel က request များ ပေးပို့နေသည့် local target URL။
- ရှိပါက နောက်ဆုံး error message။

ပရိုဂရမ်ဖြင့် စောင့်ကြည့်ရန် backend တစ်ခုချင်းစီ၏ `GET` endpoint များကို အချိန်မှန်
poll လုပ်ပါ။ Backend တစ်ခုထက်ပို၍ တစ်ပြိုင်နက် run ခြင်းကို ခွင့်ပြုထားပြီး OmniRoute သည်
တစ်ခုချင်းစီကို သီးခြားခြေရာခံပါမည်။

## ပြဿနာဖြေရှင်းခြင်း

### "cloudflared binary ကို ရှာမတွေ့ပါ"

OmniRoute သည် ပထမဆုံးအသုံးပြုချိန်တွင် အလိုအလျောက် install လုပ်ရန် ကြိုးစားပါသည်။
Install လုပ်ခြင်းကို ပိတ်ဆို့ထားပါက (ကန့်သတ်ထားသော network၊ GitHub ကို ဝင်ရောက်ခွင့်မရှိခြင်း)
<https://github.com/cloudflare/cloudflared/releases> မှ `cloudflared` ကို ကိုယ်တိုင်
download လုပ်ပြီး `CLOUDFLARED_BIN=/path/to/cloudflared` ဟု သတ်မှတ်ပါ။

### "ngrok: authtoken လိုအပ်သည်"

`phase: "needs_auth"` သည် authtoken မတွေ့ရှိကြောင်း ဆိုလိုပါသည်။ `.env` တွင်
`NGROK_AUTHTOKEN` ကို သတ်မှတ်ပါ၊ dashboard မှတစ်ဆင့် ပြင်ဆင်သတ်မှတ်ပါ သို့မဟုတ်
enable POST body ထဲတွင် `authToken` ကို ထည့်ပေးပါ။

### "tailscale: funnel ကို ဖွင့်မထားပါ"

Enable response တွင် `funnelNotEnabled: true` ပါဝင်ပါက သင့် tailnet အတွက် Funnel ကို
ပိတ်ထားခြင်းဖြစ်သည်။ ပြန်လာသော `enableUrl` (သို့မဟုတ် admin console ၏ feature
စာမျက်နှာ) ကို ဖွင့်ပြီး Funnel ကို on လုပ်ပါ။

### Tunnel URL ပြောင်းလဲမှုများကြောင့် OAuth ပျက်တောက်ခြင်း

Reserved domain ပါသည့် ngrok သို့မဟုတ် Tailscale Funnel (နှစ်ခုစလုံးသည် node
တစ်ခုချင်းစီအတွက် တည်ငြိမ်သည်) ကို အသုံးပြုပါ။ Cloudflare Quick Tunnel များသည်
မူလဒီဇိုင်းအရ ယာယီဖြစ်ပြီး ရေရှည်အသုံးပြုမည့် OAuth callback များအတွက် မသင့်တော်ပါ။

### Linux/macOS တွင် Tailscale အတွက် ခွင့်ပြုချက်ငြင်းပယ်ခံရခြင်း

`tailscaled` သည် root အခွင့်အရေးလိုအပ်ပါသည်။ သက်ဆိုင်ရာ POST endpoint သို့
`sudoPassword` ကို ပေးပို့ပါ သို့မဟုတ် daemon ကို ကိုယ်တိုင် run ပါ
(`sudo systemctl start tailscaled`)။

## ထပ်မံကြည့်ရှုရန်

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — အပြင်ထွက် traffic အတွက် outbound proxy (1proxy, SOCKS5, HTTP)။
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` အပါအဝင် env vars စာရင်းအပြည့်အစုံ။
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — တည်ငြိမ်သော public hosting အတွက် tunneling အစား အသုံးပြုနိုင်သည့် နည်းလမ်းများ။
- ရင်းမြစ်: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`။
