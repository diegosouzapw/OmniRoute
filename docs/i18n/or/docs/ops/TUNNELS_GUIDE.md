# Tunnels Guide (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **ସତ୍ୟର ମୂଳ ଉତ୍ସ:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **ଶେଷ ଅଦ୍ୟତନ:** 2026-06-28 — v3.8.40

OmniRoute ତିନୋଟି ଟନେଲ୍ ବ୍ୟାକେଣ୍ଡ୍ ମାଧ୍ୟମରେ ଏହାର ସ୍ଥାନୀୟ ସର୍ଭର୍ (`http://localhost:20128`)କୁ ସାର୍ବଜନୀନ
ଇଣ୍ଟରନେଟ୍ରେ ଉପଲବ୍ଧ କରାଇପାରେ। ଏହା ନିମ୍ନଲିଖିତ କ୍ଷେତ୍ରରେ ଉପଯୋଗୀ:

- ସାର୍ବଜନୀନ ଭାବରେ ପହଞ୍ଚଯୋଗ୍ୟ ରିଡାଇରେକ୍ଟ URL ଆବଶ୍ୟକ କରୁଥିବା କ୍ଲାଉଡ୍ ପ୍ରଦାନକାରୀମାନଙ୍କର (Antigravity, Gemini, Cursor)
  OAuth କଲ୍ବ୍ୟାକ୍।
- VM ଡିପ୍ଲୟ ନକରି ଆପଣଙ୍କର ସ୍ଥାନୀୟ ଇନ୍ଷ୍ଟାନ୍ସକୁ ସହକର୍ମୀମାନଙ୍କ ସହ ଅଂଶୀଦାର କରିବା।
- ମୋବାଇଲ୍, ଦୂରବର୍ତ୍ତୀ କିମ୍ବା ଭିନ୍ନ-ନେଟ୍ୱର୍କ ମଧ୍ୟରେ ପରୀକ୍ଷଣ।

ତିନୋଟିଯାକ ବ୍ୟାକେଣ୍ଡ୍ ପ୍ରକ୍ରିୟା ମଧ୍ୟରେ ପରିଚାଳିତ ହୁଏ — OmniRoute ଡ୍ୟାସ୍ବୋର୍ଡ୍ କିମ୍ବା REST APIରୁ ଅନ୍ତର୍ନିହିତ
ବାଇନାରି କିମ୍ବା SDKକୁ ଆରମ୍ଭ/ବନ୍ଦ କରେ। କୌଣସି ରିଭର୍ସ-ପ୍ରକ୍ସି କିମ୍ବା systemd ସେଟଅପ୍ର
ଆବଶ୍ୟକତା ନାହିଁ।

## ବ୍ୟାକେଣ୍ଡ୍ଗୁଡ଼ିକର ଏକ ନଜରରେ ଅବଲୋକନ

| ବ୍ୟାକେଣ୍ଡ୍                  | ସ୍ଥାୟିତ୍ୱ                                                             | ଖର୍ଚ୍ଚ                       | ସେଟଅପ୍                                                  |
| --------------------------- | --------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | ଅସ୍ଥାୟୀ (ପ୍ରତ୍ୟେକ ପୁନଃଆରମ୍ଭରେ URL ପରିବର୍ତ୍ତନ ହୁଏ)                     | ମାଗଣା                        | କିଛି ନାହିଁ — `cloudflared` ସ୍ୱୟଂଚାଳିତ ଭାବେ ଇନ୍ଷ୍ଟଲ୍ ହୁଏ |
| **ngrok**                   | ଏକ ସଶୁଳ୍କ ପ୍ଲାନ୍ କିମ୍ବା ସ୍ଥିର ଡୋମେନ୍ କନ୍ଫିଗର୍ ହୋଇଥିବା ପର୍ଯ୍ୟନ୍ତ ସ୍ଥିର | ମାଗଣା ସ୍ତର + ସଶୁଳ୍କ          | ngrok ଆକାଉଣ୍ଟ୍ + authtoken ଆବଶ୍ୟକ                       |
| **Tailscale Funnel**        | ଆପଣଙ୍କ tailnet ମଧ୍ୟରେ ପ୍ରତି ନୋଡ୍ ପାଇଁ ସ୍ଥିର                           | ବ୍ୟକ୍ତିଗତ ବ୍ୟବହାର ପାଇଁ ମାଗଣା | Tailscale ଇନ୍ଷ୍ଟଲେସନ୍ + ଲଗ୍ଇନ୍ + Funnel ACL ଆବଶ୍ୟକ      |

କାର୍ଯ୍ୟାନ୍ୱୟନଗୁଡ଼ିକ `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, ଏବଂ `src/lib/tailscaleTunnel.ts`ରେ ଅଛି। ତିନୋଟିଯାକ ଏକ
ସମାନ ଆକୃତିର `status` ଅବଜେକ୍ଟ୍ ଫେରାଏ, ଯେଉଁଥିରେ `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl`, ଏବଂ `lastError` ଫିଲ୍ଡ୍ ରହିଛି, ଯାହାଦ୍ୱାରା ଡ୍ୟାସ୍ବୋର୍ଡ୍ ସେଗୁଡ଼ିକୁ ଏକସମାନ ଭାବେ ପ୍ରଦର୍ଶନ କରିପାରେ।

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts`, `cloudflared`କୁ ଏକ ଚାଇଲ୍ଡ୍ ପ୍ରୋସେସ୍ ଭାବରେ ଚଲାଏ। ଏହା
ଦୁଇଟି ମୋଡ୍କୁ ସମର୍ଥନ କରେ, ଯେଉଁଥିରୁ ନାମିତ-ଟନେଲ୍ କନ୍ଫିଗ୍ ପ୍ରଦାନ କରାଯାଇଛି କି ନାହିଁ ତାହା ଆଧାରରେ ଗୋଟିଏ ଚୟନ ହୁଏ:

- **କ୍ୱିକ୍ ଟନେଲ୍ (ଡିଫଲ୍ଟ)।** `cloudflared tunnel --url
http://localhost:<apiPort>` ଚଲାଏ ଏବଂ stdoutରୁ ନ୍ୟସ୍ତ `*.trycloudflare.com` URLକୁ
  ପାର୍ସ କରେ। URLଗୁଡ଼ିକ ଅସ୍ଥାୟୀ ଏବଂ ପ୍ରତ୍ୟେକ ପୁନଃଆରମ୍ଭରେ ପରିବର୍ତ୍ତନ ହୁଏ।
- **ନାମିତ ଟନେଲ୍ (ଇଚ୍ଛାଧୀନ)।** ଯେତେବେଳେ `CLOUDFLARED_CONFIG` ଏକ ସ୍ଥାନୀୟ ଭାବରେ ପରିଚାଳିତ
  cloudflared `config.yml`କୁ ସୂଚାଏ, OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run` ଚଲାଏ, ଯାହା ଆପଣଙ୍କୁ ଏକ **ସ୍ଥିର, ନାମିତ ହୋଷ୍ଟନେମ୍** ଦିଏ। କନ୍ଫିଗ୍
  ଟନେଲ୍ UUID, `credentials-file`, ଏବଂ `ingress` ରାଉଟିଂ ପ୍ରଦାନ କରେ, ତେଣୁ କୌଣସି
  `--url` ପାସ୍ କରାଯାଏ ନାହିଁ ଏବଂ କୌଣସି Zero Trust ଡ୍ୟାସ୍ବୋର୍ଡ୍ ଟୋକେନ୍ ଆବଶ୍ୟକ ହୁଏ ନାହିଁ। `run`, କନ୍ଫିଗ୍ର ସମ୍ପୂର୍ଣ୍ଣ
  `credentials-file` ପଥରୁ କ୍ରେଡେନ୍ସିଆଲ୍ ପଢ଼େ — କୌଣସି `cert.pem`
  ଆବଶ୍ୟକ ନାହିଁ (ତାହା କେବଳ ଟନେଲ୍ ଲାଇଫ୍ସାଇକେଲ୍ ପରିଚାଳନା ପାଇଁ ବ୍ୟବହୃତ ହୁଏ)।

ମୁଖ୍ୟ ଆଚରଣଗୁଡ଼ିକ:

- **ସ୍ୱୟଂଚାଳିତ ଇନ୍ଷ୍ଟଲ୍।** ପ୍ରଥମ ବ୍ୟବହାରରେ, OmniRoute ଅଧିକୃତ GitHub ରିଲିଜ୍ରୁ ସର୍ବଶେଷ `cloudflared`
  ବାଇନାରି ଡାଉନ୍ଲୋଡ୍ କରେ (ପରିଚାଳିତ ଇନ୍ଷ୍ଟଲ୍
  `DATA_DIR/cloudflared/` ଅଧୀନରେ ରହେ)। ଡାଉନ୍ଲୋଡ୍ ହୋଇଥିବା ଆସେଟ୍ର SHA256କୁ ନିଷ୍ପାଦନ ପୂର୍ବରୁ
  ରିଲିଜ୍ ମାନିଫେଷ୍ଟ୍ ସହିତ ଯାଞ୍ଚ କରାଯାଏ।
- **ପ୍ରୋସେସ୍ ତଦାରଖ।** cloudflared PID ଏବଂ ନିର୍ଦ୍ଧାରିତ URLକୁ
  `quick-tunnel-state.json`ରେ ସ୍ଥାୟୀ ଭାବେ ସଞ୍ଚୟ କରାଯାଏ, ଯାହାଦ୍ୱାରା ଡ୍ୟାସ୍ବୋର୍ଡ୍ ପୁନଃଲୋଡ୍ ପରେ ମଧ୍ୟ ସ୍ଥିତି ପୁନରୁଦ୍ଧାର କରିପାରେ।

### ନାମିତ ଟନେଲ୍ ସେଟଅପ୍ (ସ୍ଥିର ହୋଷ୍ଟନେମ୍)

1. cloudflared CLI ବ୍ୟବହାର କରି ଏକ ସ୍ଥାନୀୟ ଭାବରେ ପରିଚାଳିତ ଟନେଲ୍ ତିଆରି କରନ୍ତୁ (ଗୋଟିଏ ଥର):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. ଆପଣଙ୍କ ହୋଷ୍ଟନେମ୍କୁ OmniRouteର ସ୍ଥାନୀୟ
   API ପୋର୍ଟ୍ (ଡିଫଲ୍ଟ 20128)କୁ ରାଉଟ୍ କରୁଥିବା ଏକ `~/.cloudflared/config.yml` ଲେଖନ୍ତୁ:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRouteକୁ କନ୍ଫିଗ୍କୁ ସୂଚାଇ ଟନେଲ୍କୁ (ପୁନଃ)ଆରମ୍ଭ କରନ୍ତୁ:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ଇଚ୍ଛାଧୀନ — OmniRoute ରିପୋର୍ଟ୍ କରୁଥିବା ହୋଷ୍ଟନେମ୍କୁ ଓଭର୍ରାଇଡ୍ କରେ; ନଚେତ୍
   # କନ୍ଫିଗ୍ର ପ୍ରଥମ ingress ନିୟମରୁ ପଢ଼ାଯାଏ:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   କ୍ୱିକ୍ ଟନେଲ୍ ଭଳି ସମାନ ଉପାୟରେ ଟନେଲ୍କୁ ସକ୍ଷମ କରନ୍ତୁ (ନିମ୍ନରେ REST / ଡ୍ୟାସ୍ବୋର୍ଡ୍ / CLI)।
   ଏକ ନାମିତ ଟନେଲ୍ ସଂଗ୍ରହ କରିବା ପାଇଁ କୌଣସି ସାର୍ବଜନୀନ URL ନିର୍ଗତ କରେ ନାହିଁ, ତେଣୁ ପ୍ରସ୍ତୁତି ସ୍ଥିତି
   cloudflaredର ପଞ୍ଜୀକୃତ ଏଜ୍ ସଂଯୋଗରୁ ଚିହ୍ନଟ କରାଯାଏ, ଏବଂ `publicUrl`/`apiUrl`କୁ
   `CLOUDFLARED_HOSTNAME`ରୁ (କିମ୍ବା କନ୍ଫିଗ୍ର ପ୍ରଥମ ingress ହୋଷ୍ଟନେମ୍ରୁ) ରିପୋର୍ଟ୍ କରାଯାଏ।

### REST ମାଧ୍ୟମରେ ସକ୍ଷମ / ଅକ୍ଷମ କରନ୍ତୁ

ଏଣ୍ଡପଏଣ୍ଟ୍ ପୃଥକ `start`/`stop` ପଥ ବଦଳରେ ଏକ `{action: "enable" | "disable"}`
ବଡି ବ୍ୟବହାର କରେ। ପରିଚାଳନା ପ୍ରମାଣୀକରଣ (ଆଡ୍ମିନ୍ ସେସନ୍ କିମ୍ବା ଆଡ୍ମିନ୍ API କି)
ଆବଶ୍ୟକ।

```bash
# ସକ୍ଷମ କରନ୍ତୁ
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# ସ୍ଥିତି
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# ଅକ୍ଷମ କରନ୍ତୁ
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

କିମ୍ବା ଡ୍ୟାସ୍ବୋର୍ଡ୍ ମାଧ୍ୟମରେ: **Settings → Tunnels → Cloudflare**।

### ଇଚ୍ଛାଧୀନ env vars

| ଭେରିଏବଲ୍                                             | ଉଦ୍ଦେଶ୍ୟ                                                                                                                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | ବାଇନାରୀ ପଥକୁ ଓଭରରାଇଡ୍ କରେ। ଏହା ସେଟ୍ ହୋଇଥିଲେ ଏବଂ ବୈଧ ଥିଲେ, OmniRoute ଡାଉନଲୋଡ୍ କରିବା ପରିବର୍ତ୍ତେ ଏହାକୁ ବ୍ୟବହାର କରେ।                                                      |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ପରିବହନ ପ୍ରୋଟୋକଲ୍ (ଡିଫଲ୍ଟ `http2`; `quic`, `auto` ମଧ୍ୟ ସମର୍ଥିତ)।                                                                                                       |
| `CLOUDFLARED_CONFIG`                                 | ସ୍ଥାନୀୟ ଭାବେ ପରିଚାଳିତ cloudflared `config.yml`ର ପଥ। ଏହା ସେଟ୍ ଥିଲେ, OmniRoute ଏକ ଦ୍ରୁତ ଟନେଲ୍ ପରିବର୍ତ୍ତେ ଏକ **ନାମିତ/ସ୍ଥାୟୀ** ଟନେଲ୍ (`tunnel --config <path> run`) ଚଲାଏ। |
| `CLOUDFLARED_HOSTNAME`                               | ନାମିତ ଟନେଲ୍ର ରିପୋର୍ଟ କରାଯାଇଥିବା ସାର୍ବଜନୀନ ହୋଷ୍ଟନାମ୍କୁ ଓଭରରାଇଡ୍ କରେ (ଯଥା `ai.example.com`)। ସେଟ୍ ନଥିଲେ, କନଫିଗ୍ର ପ୍ରଥମ `ingress` ହୋଷ୍ଟନାମ୍ରୁ ପଢ଼େ।                      |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK** ବ୍ୟବହାର କରେ (ପ୍ରକ୍ରିୟା ମଧ୍ୟରେ, କୌଣସି CLI ଉପପ୍ରକ୍ରିୟା ନାହିଁ)। ପ୍ରଥମ ଥର ଆରମ୍ଭ ହେବାବେଳେ ନେଟିଭ୍ ମଡ୍ୟୁଲ୍କୁ ଅଳସୁଆ ଭାବରେ ଇମ୍ପୋର୍ଟ କରାଯାଏ, ଯାହାଦ୍ୱାରା ପୂର୍ବରୁ ବିଲ୍ଡ ହୋଇଥିବା ବାଇନାରି ନଥିବା ପ୍ଲାଟଫର୍ମଗୁଡ଼ିକ ଆପ୍କୁ ବୁଟ୍ ସମୟରେ ବିଫଳ କରିବେ ନାହିଁ।

### ପୂର୍ବାବଶ୍ୟକତା

1. <https://ngrok.com> ରେ ସାଇନ୍ ଅପ୍ କରନ୍ତୁ।
2. ngrok ଡ୍ୟାସ୍ବୋର୍ଡରୁ ଆପଣଙ୍କ authtoken କପି କରନ୍ତୁ।
3. ନିମ୍ନ ମଧ୍ୟରୁ ଯେକୌଣସି ଗୋଟିଏ ମାଧ୍ୟମରେ ଏହା ପ୍ରଦାନ କରନ୍ତୁ:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, କିମ୍ବା
   - ଡ୍ୟାସ୍ବୋର୍ଡ: **Settings → Tunnels → ngrok**, କିମ୍ବା
   - REST ବଡି (ଏକକାଳୀନ): `{"action":"enable","authToken":"<token>"}`।

ଯଦି କୌଣସିଟି ବିନ୍ୟାସ କରାଯାଇନାହିଁ, ସ୍ଥିତି `phase: "needs_auth"` ଫେରାଏ।

### REST ମାଧ୍ୟମରେ ସକ୍ଷମ / ଅକ୍ଷମ କରିବା

```bash
# ସକ୍ଷମ କରନ୍ତୁ (env ରୁ NGROK_AUTHTOKEN ବ୍ୟବହାର କରେ)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# ଇନ୍ଲାଇନ୍ ଟୋକେନ୍ ସହିତ ସକ୍ଷମ କରନ୍ତୁ
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# ସ୍ଥିତି
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# ଅକ୍ଷମ କରନ୍ତୁ
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

ପ୍ରତିକ୍ରିୟାରେ ନ୍ୟସ୍ତ `publicUrl` ଅନ୍ତର୍ଭୁକ୍ତ ଥାଏ (ଉଦାହରଣସ୍ୱରୂପ
`https://abcd-1234.ngrok-free.app`)। କଷ୍ଟମ୍ ଡୋମେନ୍, ଅଞ୍ଚଳ ଏବଂ ନୀତି ନିୟମଗୁଡ଼ିକୁ
ngrok ଡ୍ୟାସ୍ବୋର୍ଡରେ ବିନ୍ୟାସ କରିବାକୁ ପଡ଼ିବ — OmniRoute ନିଜେ କେବଳ ସ୍ଥାନୀୟ
ଟାର୍ଗେଟ୍ URLକୁ SDKକୁ ଫରୱାର୍ଡ କରେ।

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` **Funnel** (serve ପାଇଁ Tailscaleର ସାର୍ବଜନୀନ-ଇଣ୍ଟରନେଟ୍ ଏଗ୍ରେସ୍) ମାଧ୍ୟମରେ ସ୍ଥାନୀୟ API ପୋର୍ଟକୁ ପ୍ରକାଶ କରିବା ପାଇଁ ସିଷ୍ଟମ୍ `tailscale` CLIକୁ ପରିଚାଳନା କରେ। ଏହା ସମ୍ପୂର୍ଣ୍ଣ ଜୀବନଚକ୍ରକୁ ସମର୍ଥନ କରେ: ଇନ୍ଷ୍ଟଲ୍, ଲଗ୍ଇନ୍, ଡେମନ୍ ଆରମ୍ଭ, ସକ୍ଷମ ଏବଂ ଅକ୍ଷମ।

କାର୍ଯ୍ୟାନ୍ୱୟନ `tailscale funnel --bg <port>` (ପୃଷ୍ଠଭୂମି ମୋଡ୍) ଆହ୍ୱାନ କରେ। ସାର୍ବଜନୀନ URLର ଆକୃତି `https://<machine>.<tailnet>.ts.net/` ହୋଇଥାଏ।

### ପୂର୍ବାବଶ୍ୟକତା

1. Tailscale ଇନ୍ଷ୍ଟଲ୍ କରନ୍ତୁ (କିମ୍ବା OmniRouteକୁ ଏହା କରିବାକୁ ଦିଅନ୍ତୁ — ତଳେ ଥିବା `install` ଏଣ୍ଡପଏଣ୍ଟ ଦେଖନ୍ତୁ)।
2. ସାଇନ୍ ଇନ୍ କରନ୍ତୁ (`tailscale login` କିମ୍ବା OmniRouteର `login` ଏଣ୍ଡପଏଣ୍ଟ ମାଧ୍ୟମରେ)।
3. Tailscale ଆଡ୍ମିନ୍ କନ୍ସୋଲ୍ରେ ଆପଣଙ୍କ tailnet ପାଇଁ Funnel ସକ୍ଷମ କରନ୍ତୁ:
   <https://login.tailscale.com/admin/settings/features>।

Linux ଏବଂ macOSରେ ଡେମନ୍ (`tailscaled`)କୁ ନିୟନ୍ତ୍ରଣ କରିବା ପାଇଁ `sudo` ଆବଶ୍ୟକ। POST ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ ଏକ ଇଚ୍ଛାଧୀନ `sudoPassword` ଫିଲ୍ଡ ଗ୍ରହଣ କରେ, ଯାହାକୁ କଲ୍ର ଅବଧି ପାଇଁ OmniRouteର MITM ପାସ୍ୱାର୍ଡ କ୍ୟାଶ୍ (`getCachedPassword` / `setCachedPassword`)କୁ ଫରୱାର୍ଡ କରାଯାଏ। Windows `C:\Program Files\Tailscale\tailscale.exe`ରେ ଥିବା ଡିଫଲ୍ଟ ସର୍ଭିସ୍ ଇନ୍ଷ୍ଟଲ୍ ବ୍ୟବହାର କରେ।

### REST ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ

Tailscaleର ଇଣ୍ଟରଫେସ୍ ଅନ୍ୟ ବ୍ୟାକ୍ଏଣ୍ଡଗୁଡ଼ିକ ତୁଳନାରେ ଅଧିକ ସମୃଦ୍ଧ, କାରଣ ଇନ୍ଷ୍ଟଲେସନ୍, ଲଗ୍ଇନ୍, ଡେମନ୍ ଏବଂ ଟନେଲ୍ ପୃଥକ୍ ବିଷୟ।

| ଏଣ୍ଡପଏଣ୍ଟ                             | ପଦ୍ଧତି | ଉଦ୍ଦେଶ୍ୟ                                                                     |
| ------------------------------------- | ------ | ---------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | ସମନ୍ୱିତ ଟନେଲ୍ ସ୍ଥିତି (`phase`, `tunnelUrl`, `apiUrl`, ଇତ୍ୟାଦି)               |
| `/api/tunnels/tailscale/check`        | `GET`  | ନିମ୍ନ-ସ୍ତରୀୟ ଯାଞ୍ଚ: ଇନ୍ଷ୍ଟଲ୍ ହୋଇଛି? ଲଗ୍ଇନ୍ ହୋଇଛି? ଡେମନ୍ ଚାଲୁଛି?              |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale ଇନ୍ଷ୍ଟଲ୍ କରନ୍ତୁ (SSE-ଷ୍ଟ୍ରିମ୍ ହୋଇଥିବା ପ୍ରଗତି ଇଭେଣ୍ଟ) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOSରେ `tailscaled` ଆରମ୍ଭ କରନ୍ତୁ                                      |
| `/api/tunnels/tailscale/login`        | `POST` | ଲଗ୍ଇନ୍ ପ୍ରବାହ ଆରମ୍ଭ କରନ୍ତୁ; ବ୍ରାଉଜର୍ରେ ଖୋଲିବା ପାଇଁ `authUrl` ଫେରାଏ           |
| `/api/tunnels/tailscale/enable`       | `POST` | API ପୋର୍ଟ ପାଇଁ Funnel ଆରମ୍ଭ କରନ୍ତୁ                                           |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel ବନ୍ଦ କରନ୍ତୁ                                                           |

ସମସ୍ତ Tailscale ଏଣ୍ଡପଏଣ୍ଟ ପାଇଁ ପରିଚାଳନା ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକ (`routeUtils.ts ::
requireTailscaleAuth` ଦେଖନ୍ତୁ)।

ସକ୍ଷମ କରିବାର ଉଦାହରଣ:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

ଯଦି ଆଡ୍ମିନ୍ କନ୍ସୋଲ୍ରେ Funnel ସକ୍ଷମ ହୋଇନଥାଏ, ପ୍ରତିକ୍ରିୟାରେ
`funnelNotEnabled: true` ସହିତ ବ୍ରାଉଜର୍ରେ ଖୋଲିବା ପାଇଁ ଏକ `enableUrl` ଅନ୍ତର୍ଭୁକ୍ତ ଥାଏ।

### ଇଚ୍ଛାଧୀନ env ଭେରିଏବଲ୍ଗୁଡ଼ିକ

| ଭେରିଏବଲ୍        | ଉଦ୍ଦେଶ୍ୟ                                  |
| --------------- | ----------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` ବାଇନାରି ପଥକୁ ଓଭର୍ରାଇଡ୍ କରନ୍ତୁ |

## ଏଣ୍ଡପଏଣ୍ଟ ସାରାଂଶ

| ଏଣ୍ଡପଏଣ୍ଟ                             | ପଦ୍ଧତି | ବଡି                                 | ପ୍ରାମାଣିକରଣ |
| ------------------------------------- | ------ | ----------------------------------- | ----------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | ପରିଚାଳନା    |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | ପରିଚାଳନା    |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | ପରିଚାଳନା    |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | ପରିଚାଳନା    |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | ପରିଚାଳନା    |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | ପରିଚାଳନା    |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | ପରିଚାଳନା    |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | ପରିଚାଳନା    |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | ପରିଚାଳନା    |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | ପରିଚାଳନା    |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | ପରିଚାଳନା    |

କୌଣସି କେନ୍ଦ୍ରୀୟ `/api/settings/tunnels` ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ — ପ୍ରତ୍ୟେକ ବ୍ୟାକଏଣ୍ଡ
ସ୍ୱାଧୀନ ଅଟେ।

## OAuth କଲ୍ବ୍ୟାକ୍ ବିଚାରଣୀୟ ବିଷୟ

ଆପଣ ଏକ ଟନେଲ୍ ମାଧ୍ୟମରେ OmniRouteକୁ ପ୍ରକାଶ କଲେ, ଡ୍ୟାସ୍ବୋର୍ଡ ଏବଂ OAuth ପ୍ରବାହଗୁଡ଼ିକୁ
`localhost` ନୁହେଁ, **ସାର୍ବଜନୀନ** ହୋଷ୍ଟନାମ ଆଧାରରେ କଲ୍ବ୍ୟାକ୍ URL ନିର୍ମାଣ କରିବାକୁ
ହେବ। ନଚେତ୍, OAuth ପ୍ରଦାନକାରୀ ବ୍ୟବହାରକାରୀଙ୍କୁ ଏପରି ଏକ URLକୁ ପୁନଃନିର୍ଦ୍ଦେଶିତ କରେ
ଯେଉଁଥିରେ ତାହାର ସର୍ଭରଗୁଡ଼ିକ ପହଞ୍ଚିପାରିବେ ନାହିଁ, ଏବଂ ହ୍ୟାଣ୍ଡସେକ୍ ବିଫଳ ହୁଏ।

ଡ୍ୟାସ୍ବୋର୍ଡ ସମ୍ପାଦନା ଏବଂ ସେଟିଂସ୍ ସଞ୍ଚୟ ପାଇଁ ଟନେଲ୍ ହୋଷ୍ଟନାମକୁ
`NEXT_PUBLIC_BASE_URL`ରେ ସ୍ଥିର କରିବା ଆବଶ୍ୟକ ନାହିଁ। ପ୍ରାମାଣିକୃତ ଡ୍ୟାସ୍ବୋର୍ଡ
ଏକ ସେସନ୍-ବାଉଣ୍ଡ CSRF ଟୋକନ୍ ସହିତ ସମାନ-ଉତ୍ସର ଅସୁରକ୍ଷିତ ଅନୁରୋଧ ପଠାଏ,
ତେଣୁ ଲଗ୍ଇନ୍ କରିବା ପରେ ଅସ୍ଥାୟୀ Cloudflare Quick Tunnel ହୋଷ୍ଟଗୁଡ଼ିକୁ ମଧ୍ୟ
ସାଧାରଣ UI ପରିଚାଳନା ପାଇଁ ବ୍ୟବହାର କରାଯାଇପାରିବ।

ସେଟ୍ କରନ୍ତୁ:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

ଏବଂ OAuth ଆରମ୍ଭ କରିବା ପୂର୍ବରୁ OmniRouteକୁ ପୁନଃଚାଳୁ କରନ୍ତୁ। ଅସ୍ଥାୟୀ
Cloudflare Quick Tunnels ପାଇଁ ପ୍ରତ୍ୟେକ ପୁନଃଚାଳନ ପରେ URL ପରିବର୍ତ୍ତିତ ହୁଏ,
ତେଣୁ ପ୍ରଡକ୍ସନ୍ OAuth ବ୍ୟବହାର ପାଇଁ ସଂରକ୍ଷିତ ଡୋମେନ୍ ସହିତ ngrok କିମ୍ବା
Tailscale Funnelକୁ ପ୍ରାଧାନ୍ୟ ଦିଅନ୍ତୁ।

## ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ନିରୀକ୍ଷଣ

ଡ୍ୟାସ୍ବୋର୍ଡ **Settings → Tunnels** ଅଧୀନରେ ଟନେଲ୍ର ସ୍ଥିତି ଦେଖାଏ:

- ସକ୍ରିୟ ବ୍ୟାକଏଣ୍ଡ(ଗୁଡ଼ିକ) ଏବଂ ବର୍ତ୍ତମାନର `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`)।
- ବର୍ତ୍ତମାନର ସାର୍ବଜନୀନ URL ଏବଂ ତାହାରୁ ପ୍ରାପ୍ତ API URL (`<publicUrl>/v1`)।
- ଟନେଲ୍ ଯେଉଁ ସ୍ଥାନୀୟ ଲକ୍ଷ୍ୟ URLକୁ ଅନୁରୋଧ ଅଗ୍ରସର କରୁଛି।
- ଶେଷ ତ୍ରୁଟି ସନ୍ଦେଶ, ଯଦି କିଛି ଥାଏ।

ପ୍ରୋଗ୍ରାମାଟିକ୍ ନିରୀକ୍ଷଣ ପାଇଁ ପ୍ରତ୍ୟେକ ବ୍ୟାକଏଣ୍ଡର `GET` ଏଣ୍ଡପଏଣ୍ଟକୁ ନିୟମିତ
ପୋଲ୍ କରନ୍ତୁ। ଏକାସାଙ୍ଗରେ ଏକାଧିକ ବ୍ୟାକଏଣ୍ଡ ଚଲାଇବା ଅନୁମୋଦିତ; OmniRoute
ପ୍ରତ୍ୟେକକୁ ସ୍ୱାଧୀନ ଭାବେ ଟ୍ରାକ୍ କରିବ।

## ସମସ୍ୟା ନିବାରଣ

### "cloudflared ବାଇନାରି ମିଳିଲା ନାହିଁ"

ପ୍ରଥମ ବ୍ୟବହାର ସମୟରେ OmniRoute ସ୍ୱୟଂଚାଳିତ ଭାବେ ଇନ୍ଷ୍ଟଲ୍ କରିବାକୁ ଚେଷ୍ଟା
କରେ। ଯଦି ଇନ୍ଷ୍ଟଲେସନ୍ ଅବରୋଧିତ ହୁଏ (ସୀମିତ ନେଟୱର୍କ, GitHub ପ୍ରବେଶ ନାହିଁ),
ତେବେ <https://github.com/cloudflare/cloudflared/releases>ରୁ `cloudflared`କୁ
ମାନୁଆଲ୍ ଭାବେ ଡାଉନଲୋଡ୍ କରନ୍ତୁ ଏବଂ
`CLOUDFLARED_BIN=/path/to/cloudflared` ସେଟ୍ କରନ୍ତୁ।

### "ngrok: authtoken ଆବଶ୍ୟକ"

`phase: "needs_auth"`ର ଅର୍ଥ ହେଉଛି କୌଣସି authtoken ମିଳିଲା ନାହିଁ। `.env`ରେ
`NGROK_AUTHTOKEN` ସେଟ୍ କରନ୍ତୁ, ଡ୍ୟାସ୍ବୋର୍ଡ ମାଧ୍ୟମରେ ଏହାକୁ ବିନ୍ୟାସ କରନ୍ତୁ,
କିମ୍ବା ସକ୍ରିୟକରଣ POST ବଡିରେ `authToken` ପାସ୍ କରନ୍ତୁ।

### "tailscale: funnel ସକ୍ରିୟ ନାହିଁ"

ସକ୍ରିୟକରଣ ପ୍ରତିକ୍ରିୟାରେ `funnelNotEnabled: true` ଥିଲେ, ଆପଣଙ୍କ tailnet ପାଇଁ
Funnel ଅକ୍ଷମ ଅଛି। ଫେରାଇ ଦିଆଯାଇଥିବା `enableUrl` (କିମ୍ବା ଆଡ୍ମିନ୍ କନସୋଲ୍ର
ବୈଶିଷ୍ଟ୍ୟ ପୃଷ୍ଠା) ଖୋଲନ୍ତୁ ଏବଂ Funnelକୁ ସକ୍ରିୟ କରନ୍ତୁ।

### ଟନେଲ୍ URL ପରିବର୍ତ୍ତନ OAuthକୁ ଭାଙ୍ଗିଦିଏ

ସଂରକ୍ଷିତ ଡୋମେନ୍ ସହିତ ngrok କିମ୍ବା Tailscale Funnel ବ୍ୟବହାର କରନ୍ତୁ (ଉଭୟ
ପ୍ରତି-ନୋଡ୍ ଭିତ୍ତିରେ ସ୍ଥିର)। Cloudflare Quick Tunnels ଡିଜାଇନ୍ ଅନୁଯାୟୀ
ଅସ୍ଥାୟୀ ଏବଂ ଦୀର୍ଘକାଳୀନ OAuth କଲ୍ବ୍ୟାକ୍ ପାଇଁ ସୁପାରିସ କରାଯାଏ ନାହିଁ।

### Tailscale ପାଇଁ Linux/macOSରେ ଅନୁମତି ପ୍ରତ୍ୟାଖ୍ୟାନ

`tailscaled` ପାଇଁ root ଆବଶ୍ୟକ। ସମ୍ପର୍କିତ POST ଏଣ୍ଡପଏଣ୍ଟକୁ `sudoPassword`
ପ୍ରଦାନ କରନ୍ତୁ, କିମ୍ବା ନିଜେ ଡିମନ୍ ଚଲାନ୍ତୁ (`sudo systemctl start tailscaled`)।

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ଆଉଟ୍ବାଉଣ୍ଡ ପ୍ରକ୍ସି (1proxy, SOCKS5, HTTP) ଦ୍ୱାରା
  ନିର୍ଗମନ ଟ୍ରାଫିକ୍।
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` ସମେତ
  ପରିବେଶ ଭେରିଏବଲ୍ଗୁଡ଼ିକର ସମ୍ପୂର୍ଣ୍ଣ ତାଲିକା।
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — ସ୍ଥିର ସାର୍ବଜନୀନ ହୋଷ୍ଟିଂ ପାଇଁ ଟନେଲିଂର
  ବିକଳ୍ପଗୁଡ଼ିକ।
- ଉତ୍ସ: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`।
