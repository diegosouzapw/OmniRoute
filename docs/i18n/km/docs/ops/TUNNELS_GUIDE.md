# Tunnels Guide (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **ប្រភពយោងចម្បង:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ:** 2026-06-28 — v3.8.40

OmniRoute អាចបើកឱ្យម៉ាស៊ីនមេមូលដ្ឋានរបស់វា (`http://localhost:20128`) អាចចូលប្រើបានពី
អ៊ីនធឺណិតសាធារណៈតាមរយៈប្រព័ន្ធខាងក្រោយ tunnel ចំនួនបី។ វាមានប្រយោជន៍សម្រាប់៖

- OAuth callbacks ពីអ្នកផ្ដល់សេវា cloud (Antigravity, Gemini, Cursor) ដែលត្រូវការ
  redirect URL ដែលអាចចូលប្រើបានជាសាធារណៈ។
- ការចែករំលែក instance មូលដ្ឋានរបស់អ្នកជាមួយមិត្តរួមក្រុមដោយមិនចាំបាច់ដាក់ពង្រាយ VM។
- ការធ្វើតេស្តតាមឧបករណ៍ចល័ត ពីចម្ងាយ ឬឆ្លងបណ្ដាញ។

ប្រព័ន្ធខាងក្រោយទាំងបីត្រូវបានគ្រប់គ្រងនៅក្នុង process ផ្ទាល់ — OmniRoute ចាប់ផ្ដើម/បញ្ឈប់ binary
ឬ SDK មូលដ្ឋានពី dashboard ឬ REST API។ មិនចាំបាច់រៀបចំ reverse-proxy ឬ systemd
ឡើយ។

## ទិដ្ឋភាពទូទៅនៃប្រព័ន្ធខាងក្រោយ

| ប្រព័ន្ធខាងក្រោយ            | ភាពអចិន្ត្រៃយ៍                                       | តម្លៃ                                    | ការរៀបចំ                                                |
| --------------------------- | ---------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | បណ្ដោះអាសន្ន (URL ផ្លាស់ប្ដូររាល់ពេលចាប់ផ្ដើមឡើងវិញ) | ឥតគិតថ្លៃ                                | មិនត្រូវការរៀបចំ — ដំឡើង `cloudflared` ដោយស្វ័យប្រវត្តិ |
| **ngrok**                   | មានស្ថិរភាពនៅពេលបានកំណត់គម្រោងបង់ប្រាក់ ឬ domain ថេរ | កម្រិតឥតគិតថ្លៃ + បង់ប្រាក់              | តម្រូវឱ្យមានគណនី ngrok + authtoken                      |
| **Tailscale Funnel**        | មានស្ថិរភាពតាម node នីមួយៗនៅក្នុង tailnet របស់អ្នក   | ឥតគិតថ្លៃសម្រាប់ការប្រើប្រាស់ផ្ទាល់ខ្លួន | តម្រូវឱ្យដំឡើង Tailscale + login + Funnel ACL           |

ការអនុវត្តទាំងនេះស្ថិតនៅក្នុង `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` និង `src/lib/tailscaleTunnel.ts`។ ទាំងបីត្រឡប់
object `status` ដែលមានទម្រង់ដូចគ្នា និងមាន field `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` និង `lastError` ដូច្នេះ dashboard អាចបង្ហាញពួកវាតាមរបៀបដូចគ្នា។

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` ដំណើរការ `cloudflared` ជា child process។ វាគាំទ្រ
របៀបពីរ ដែលត្រូវបានជ្រើសរើសអាស្រ័យលើថាតើមានផ្ដល់ config សម្រាប់ named tunnel ដែរឬទេ៖

- **Quick tunnel (លំនាំដើម)។** ដំណើរការ `cloudflared tunnel --url
http://localhost:<apiPort>` ហើយញែកយក URL `*.trycloudflare.com` ដែលបានកំណត់
  ពី stdout។ URL ទាំងនេះជាបណ្ដោះអាសន្ន ហើយផ្លាស់ប្ដូររាល់ពេលចាប់ផ្ដើមឡើងវិញ។
- **Named tunnel (ជម្រើសបើកប្រើ)។** នៅពេល `CLOUDFLARED_CONFIG` ចង្អុលទៅកាន់
  `config.yml` របស់ cloudflared ដែលគ្រប់គ្រងក្នុងមូលដ្ឋាន OmniRoute នឹងដំណើរការ `cloudflared tunnel --no-autoupdate
--config <path> run` ដែលផ្ដល់ឱ្យអ្នកនូវ **hostname មានឈ្មោះ និងមានស្ថិរភាព**។ config
  ផ្ដល់ tunnel UUID, `credentials-file` និងការកំណត់ផ្លូវ `ingress` ដូច្នេះ
  មិនមានការបញ្ជូន `--url` ហើយក៏មិនត្រូវការ token ពី Zero Trust dashboard ដែរ។ `run` អាន
  credentials ពី path ដាច់ខាតនៃ `credentials-file` ក្នុង config — មិនត្រូវការ `cert.pem`
  ទេ (វាត្រូវបានប្រើសម្រាប់តែការគ្រប់គ្រងវដ្ដជីវិតរបស់ tunnel ប៉ុណ្ណោះ)។

ឥរិយាបថសំខាន់ៗ៖

- **ការដំឡើងដោយស្វ័យប្រវត្តិ។** នៅពេលប្រើលើកដំបូង OmniRoute ទាញយក binary `cloudflared`
  ចុងក្រោយបំផុតពី GitHub releases ផ្លូវការ (ការដំឡើងដែលបានគ្រប់គ្រងស្ថិតនៅក្រោម
  `DATA_DIR/cloudflared/`)។ SHA256 របស់ asset ដែលបានទាញយកត្រូវបានផ្ទៀងផ្ទាត់ជាមួយ
  release manifest មុនពេលប្រតិបត្តិ។
- **ការត្រួតពិនិត្យ process។** PID របស់ cloudflared និង URL ដែលបានដោះស្រាយត្រូវបានរក្សាទុកក្នុង
  `quick-tunnel-state.json` ដើម្បីឱ្យ dashboard អាចបន្តបង្ហាញស្ថានភាពក្រោយពេល reload។

### ការរៀបចំ named tunnel (hostname មានស្ថិរភាព)

1. បង្កើត tunnel ដែលគ្រប់គ្រងក្នុងមូលដ្ឋានដោយប្រើ cloudflared CLI (តែម្ដងប៉ុណ្ណោះ)៖

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. សរសេរ `~/.cloudflared/config.yml` ដើម្បីកំណត់ផ្លូវ hostname របស់អ្នកទៅកាន់
   API port មូលដ្ឋានរបស់ OmniRoute (លំនាំដើម 20128)៖

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. ឱ្យ OmniRoute ចង្អុលទៅកាន់ config ហើយចាប់ផ្ដើម tunnel (ឡើងវិញ)៖

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ជាជម្រើស — ជំនួស hostname ដែល OmniRoute រាយការណ៍; បើមិនដូច្នោះទេ វានឹងអានពី
   # ingress rule ដំបូងរបស់ config៖
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   បើក tunnel តាមរបៀបដូចគ្នានឹង quick tunnel (REST / dashboard / CLI
   ខាងក្រោម)។ named tunnel មិនបញ្ចេញ public URL សម្រាប់ញែកយកទេ ដូច្នេះភាពរួចរាល់ត្រូវបានរកឃើញ
   ពី edge connection ដែលបានចុះឈ្មោះរបស់ cloudflared ហើយ `publicUrl`/`apiUrl` ត្រូវបាន
   រាយការណ៍ពី `CLOUDFLARED_HOSTNAME` (ឬ ingress hostname ដំបូងរបស់ config)។

### បើក / បិទតាម REST

endpoint ប្រើ body `{action: "enable" | "disable"}` មិនមែន path `start`/`stop`
ដាច់ដោយឡែកទេ។ តម្រូវឱ្យមាន management auth (admin session ឬ admin API key)។

```bash
# បើក
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# ស្ថានភាព
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# បិទ
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

ឬតាម dashboard៖ **Settings → Tunnels → Cloudflare**។

### អថេរបរិស្ថានជាជម្រើស

| អថេរ                                                 | គោលបំណង                                                                                                                                                                                        |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | កំណត់ជាន់លើផ្លូវទៅកាន់ binary។ ប្រសិនបើបានកំណត់ និងត្រឹមត្រូវ OmniRoute នឹងប្រើវាជំនួសឱ្យការទាញយក។                                                                                             |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ពិធីការដឹកជញ្ជូន (លំនាំដើម `http2`; ក៏គាំទ្រ `quic`, `auto` ផងដែរ)។                                                                                                                            |
| `CLOUDFLARED_CONFIG`                                 | ផ្លូវទៅកាន់ `config.yml` របស់ cloudflared ដែលគ្រប់គ្រងក្នុងមូលដ្ឋាន។ នៅពេលកំណត់ OmniRoute នឹងដំណើរការ tunnel **ដែលមានឈ្មោះ/អចិន្ត្រៃយ៍** (`tunnel --config <path> run`) ជំនួសឱ្យ quick tunnel។ |
| `CLOUDFLARED_HOSTNAME`                               | កំណត់ជាន់លើ hostname សាធារណៈដែលបានរាយការណ៍របស់ tunnel ដែលមានឈ្មោះ (ឧ. `ai.example.com`)។ នៅពេលមិនបានកំណត់ វានឹងអានពី hostname `ingress` ដំបូងក្នុង config។                                     |

## 2. ngrok

`src/lib/ngrokTunnel.ts` ប្រើ **`@ngrok/ngrok` SDK** (ដំណើរការនៅក្នុង process ដោយមិនមាន CLI subprocess)។ native module ត្រូវបាន import តាមតម្រូវការនៅពេលចាប់ផ្ដើមលើកដំបូង ដូច្នេះ platform ដែលមិនមាន binary ដែលបាន build ទុកជាមុន នឹងមិនធ្វើឱ្យកម្មវិធីខូចនៅពេល boot ឡើយ។

### តម្រូវការជាមុន

1. ចុះឈ្មោះនៅ <https://ngrok.com>។
2. ចម្លង authtoken របស់អ្នកពី dashboard របស់ ngrok។
3. ផ្ដល់វាតាមវិធីណាមួយខាងក្រោម៖
   - `.env`: `NGROK_AUTHTOKEN=<token>` ឬ
   - Dashboard: **Settings → Tunnels → ngrok** ឬ
   - REST body (ប្រើតែម្ដង): `{"action":"enable","authToken":"<token>"}`។

ប្រសិនបើមិនបានកំណត់រចនាសម្ព័ន្ធទាំងពីរទេ ស្ថានភាពនឹងត្រឡប់ `phase: "needs_auth"`។

### បើក / បិទតាម REST

```bash
# បើក (ប្រើ NGROK_AUTHTOKEN ពី env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# បើកដោយប្រើ token ក្នុងសំណើផ្ទាល់
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# ស្ថានភាព
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# បិទ
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

ចម្លើយតបរួមបញ្ចូល `publicUrl` ដែលបានកំណត់ (ឧ.
`https://abcd-1234.ngrok-free.app`)។ domain ផ្ទាល់ខ្លួន តំបន់ និងច្បាប់គោលការណ៍ ត្រូវតែកំណត់រចនាសម្ព័ន្ធនៅក្នុង dashboard របស់ ngrok — OmniRoute ខ្លួនវាគ្រាន់តែបញ្ជូនបន្ត URL គោលដៅ local ទៅ SDK ប៉ុណ្ណោះ។

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` សម្របសម្រួល CLI `tailscale` របស់ប្រព័ន្ធ ដើម្បីបើកបង្ហាញ port របស់ API local តាមរយៈ **Funnel** (ច្រកចេញទៅអ៊ីនធឺណិតសាធារណៈរបស់ Tailscale សម្រាប់ serve)។ វាគាំទ្រវដ្ដជីវិតពេញលេញ៖ ដំឡើង ចូលគណនី ចាប់ផ្ដើម daemon បើក និងបិទ។

ការអនុវត្តនេះហៅ `tailscale funnel --bg <port>` (របៀបផ្ទៃខាងក្រោយ)។ URL សាធារណៈមានទម្រង់ `https://<machine>.<tailnet>.ts.net/`។

### តម្រូវការជាមុន

1. ដំឡើង Tailscale (ឬអនុញ្ញាតឱ្យ OmniRoute ដំឡើងវា — សូមមើល endpoint `install` ខាងក្រោម)។
2. ចូលគណនី (`tailscale login` ឬតាមរយៈ endpoint `login` របស់ OmniRoute)។
3. បើក Funnel សម្រាប់ tailnet របស់អ្នកនៅក្នុង console គ្រប់គ្រងរបស់ Tailscale៖
   <https://login.tailscale.com/admin/settings/features>។

នៅលើ Linux និង macOS daemon (`tailscaled`) ត្រូវការ `sudo` ដើម្បីគ្រប់គ្រង។ endpoint ប្រភេទ POST ទទួលយក field `sudoPassword` ជាជម្រើស ដែលត្រូវបានបញ្ជូនបន្តទៅឃ្លាំងសម្ងាត់ពាក្យសម្ងាត់ MITM របស់ OmniRoute (`getCachedPassword` / `setCachedPassword`) សម្រាប់រយៈពេលនៃការហៅនោះ។ Windows ប្រើការដំឡើង service លំនាំដើមនៅ `C:\Program Files\Tailscale\tailscale.exe`។

### REST endpoints

Tailscale មានផ្ទៃមុខងារទូលំទូលាយជាង backend ផ្សេងទៀត ពីព្រោះការដំឡើង ការចូលគណនី daemon និង tunnel គឺជាកិច្ចការដាច់ដោយឡែកពីគ្នា។

| Endpoint                              | Method | គោលបំណង                                                                 |
| ------------------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | ស្ថានភាព tunnel សរុប (`phase`, `tunnelUrl`, `apiUrl`, ជាដើម)            |
| `/api/tunnels/tailscale/check`        | `GET`  | ការត្រួតពិនិត្យកម្រិតទាប៖ បានដំឡើង? បានចូលគណនី? daemon កំពុងដំណើរការ?   |
| `/api/tunnels/tailscale/install`      | `POST` | ដំឡើង Tailscale (ព្រឹត្តិការណ៍វឌ្ឍនភាពដែល stream តាម SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | ចាប់ផ្ដើម `tailscaled` នៅលើ Linux/macOS                                 |
| `/api/tunnels/tailscale/login`        | `POST` | ចាប់ផ្ដើមលំហូរចូលគណនី; ត្រឡប់ `authUrl` សម្រាប់បើកក្នុង browser         |
| `/api/tunnels/tailscale/enable`       | `POST` | ចាប់ផ្ដើម Funnel សម្រាប់ port របស់ API                                  |
| `/api/tunnels/tailscale/disable`      | `POST` | បញ្ឈប់ Funnel                                                           |

endpoint ទាំងអស់របស់ Tailscale តម្រូវឱ្យមានការផ្ទៀងផ្ទាត់សិទ្ធិគ្រប់គ្រង (សូមមើល `routeUtils.ts ::
requireTailscaleAuth`)។

ឧទាហរណ៍នៃការបើក៖

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

ប្រសិនបើ Funnel មិនត្រូវបានបើកនៅក្នុង console គ្រប់គ្រងទេ ចម្លើយតបនឹងរួមបញ្ចូល `funnelNotEnabled: true` ព្រមទាំង `enableUrl` សម្រាប់បើកក្នុង browser។

### env vars ជាជម្រើស

| អថេរ            | គោលបំណង                                 |
| --------------- | --------------------------------------- |
| `TAILSCALE_BIN` | កំណត់ជំនួស path របស់ binary `tailscale` |

## សេចក្តីសង្ខេប Endpoint

| Endpoint                              | វិធីសាស្ត្រ | Body                                | ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ |
| ------------------------------------- | ----------- | ----------------------------------- | ------------------------ |
| `/api/tunnels/cloudflared`            | `GET`       | —                                   | ការគ្រប់គ្រង             |
| `/api/tunnels/cloudflared`            | `POST`      | `{action: "enable" \| "disable"}`   | ការគ្រប់គ្រង             |
| `/api/tunnels/ngrok`                  | `GET`       | —                                   | ការគ្រប់គ្រង             |
| `/api/tunnels/ngrok`                  | `POST`      | `{action, authToken?}`              | ការគ្រប់គ្រង             |
| `/api/tunnels/tailscale`              | `GET`       | —                                   | ការគ្រប់គ្រង             |
| `/api/tunnels/tailscale/check`        | `GET`       | —                                   | ការគ្រប់គ្រង             |
| `/api/tunnels/tailscale/install`      | `POST`      | `{sudoPassword?}` (SSE)             | ការគ្រប់គ្រង             |
| `/api/tunnels/tailscale/start-daemon` | `POST`      | `{sudoPassword?}`                   | ការគ្រប់គ្រង             |
| `/api/tunnels/tailscale/login`        | `POST`      | `{hostname?}`                       | ការគ្រប់គ្រង             |
| `/api/tunnels/tailscale/enable`       | `POST`      | `{sudoPassword?, hostname?, port?}` | ការគ្រប់គ្រង             |
| `/api/tunnels/tailscale/disable`      | `POST`      | `{sudoPassword?}`                   | ការគ្រប់គ្រង             |

មិនមាន endpoint កណ្ដាល `/api/settings/tunnels` ទេ — backend នីមួយៗដំណើរការ
ដោយឯករាជ្យ។

## ចំណុចដែលត្រូវពិចារណាសម្រាប់ OAuth callback

នៅពេលអ្នកបង្ហាញ OmniRoute តាមរយៈ tunnel ផ្ទាំងគ្រប់គ្រង និងលំហូរ OAuth ត្រូវតែ
បង្កើត callback URL ដោយប្រើ hostname **សាធារណៈ** មិនមែន `localhost` ទេ។ បើមិនដូច្នោះទេ
អ្នកផ្តល់សេវា OAuth នឹងបញ្ជូនអ្នកប្រើត្រឡប់ទៅ URL ដែលម៉ាស៊ីនមេរបស់វាមិនអាចចូលដល់បាន
ហើយដំណើរការ handshake នឹងបរាជ័យ។

ការកែប្រែក្នុងផ្ទាំងគ្រប់គ្រង និងការរក្សាទុកការកំណត់ មិនតម្រូវឱ្យកំណត់ថេរ hostname របស់ tunnel ក្នុង
`NEXT_PUBLIC_BASE_URL` ទេ។ ផ្ទាំងគ្រប់គ្រងដែលបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណ ផ្ញើសំណើដែលមិនមានសុវត្ថិភាពទៅកាន់ origin ដូចគ្នា
ដោយប្រើ CSRF token ដែលភ្ជាប់នឹង session ដូច្នេះ host របស់ Cloudflare Quick Tunnel ដែលមានលក្ខណៈបណ្ដោះអាសន្ន
នៅតែអាចប្រើសម្រាប់ការគ្រប់គ្រង UI ធម្មតា បន្ទាប់ពីចូលប្រើរួច។

កំណត់៖

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

ហើយចាប់ផ្ដើម OmniRoute ឡើងវិញ មុនពេលចាប់ផ្ដើម OAuth។ សម្រាប់ Cloudflare Quick
Tunnel ដែលមានលក្ខណៈបណ្ដោះអាសន្ន URL នឹងផ្លាស់ប្ដូរបន្ទាប់ពីការចាប់ផ្ដើមឡើងវិញរាល់លើក ដូច្នេះសម្រាប់ការប្រើប្រាស់ OAuth ក្នុង production
សូមប្រើ ngrok ជាមួយ domain ដែលបានកក់ទុក ឬ Tailscale Funnel ជំនួសវិញ។

## សុខភាព និងការត្រួតពិនិត្យ

ផ្ទាំងគ្រប់គ្រងបង្ហាញស្ថានភាព tunnel នៅក្រោម **ការកំណត់ → Tunnels**៖

- Backend ដែលសកម្ម និង `phase` បច្ចុប្បន្ន (`stopped`, `starting`, `running`,
  `needs_auth`, `error`)។
- URL សាធារណៈបច្ចុប្បន្ន និង API URL ដែលបានបង្កើតពីវា (`<publicUrl>/v1`)។
- URL គោលដៅក្នុងម៉ាស៊ីនដែល tunnel កំពុងបញ្ជូនបន្តទៅ។
- សារកំហុសចុងក្រោយ ប្រសិនបើមាន។

សម្រាប់ការត្រួតពិនិត្យដោយកម្មវិធី សូម poll endpoint `GET` របស់ backend នីមួយៗ។ ការដំណើរការ backend
ច្រើនជាងមួយក្នុងពេលដំណាលគ្នាត្រូវបានអនុញ្ញាត ហើយ OmniRoute នឹងតាមដាន backend នីមួយៗ
ដោយឯករាជ្យ។

## ការដោះស្រាយបញ្ហា

### "រកមិនឃើញ binary របស់ cloudflared"

OmniRoute ព្យាយាមដំឡើងដោយស្វ័យប្រវត្តិនៅពេលប្រើប្រាស់លើកដំបូង។ ប្រសិនបើការដំឡើងត្រូវបានរារាំង
(បណ្ដាញមានការរឹតត្បិត ឬមិនអាចចូលប្រើ GitHub) សូមទាញយក `cloudflared` ដោយដៃពី
<https://github.com/cloudflare/cloudflared/releases> ហើយកំណត់
`CLOUDFLARED_BIN=/path/to/cloudflared`។

### "ngrok៖ តម្រូវឱ្យមាន authtoken"

`phase: "needs_auth"` មានន័យថា រកមិនឃើញ authtoken។ កំណត់ `NGROK_AUTHTOKEN` ក្នុង
`.env` កំណត់រចនាសម្ព័ន្ធវាតាមរយៈផ្ទាំងគ្រប់គ្រង ឬបញ្ជូន `authToken` ក្នុង enable POST
body។

### "tailscale៖ funnel មិនត្រូវបានបើក"

នៅពេល response ពី enable រួមមាន `funnelNotEnabled: true` នោះ Funnel ត្រូវបានបិទ
សម្រាប់ tailnet របស់អ្នក។ បើក `enableUrl` ដែលបានត្រឡប់មកវិញ (ឬទំព័រមុខងារក្នុង admin console)
ហើយបើក Funnel។

### ការផ្លាស់ប្ដូរ URL របស់ tunnel ធ្វើឱ្យ OAuth ខូច

ប្រើ ngrok ជាមួយ domain ដែលបានកក់ទុក ឬ Tailscale Funnel (ទាំងពីរមានស្ថិរភាពសម្រាប់ node នីមួយៗ)។
Cloudflare Quick Tunnel មានលក្ខណៈបណ្ដោះអាសន្នតាមការរចនា និងមិនត្រូវបានណែនាំសម្រាប់
OAuth callback ដែលប្រើប្រាស់រយៈពេលវែងទេ។

### ការអនុញ្ញាតត្រូវបានបដិសេធលើ Linux/macOS សម្រាប់ Tailscale

`tailscaled` ត្រូវការសិទ្ធិ root។ ផ្ដល់ `sudoPassword` ទៅ endpoint POST ដែលពាក់ព័ន្ធ
ឬដំណើរការ daemon ដោយខ្លួនឯង (`sudo systemctl start tailscaled`)។

## សូមមើលផងដែរ

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ប្រូកស៊ីចេញក្រៅ (1proxy, SOCKS5, HTTP) សម្រាប់
  ចរាចរណ៍ចេញ។
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — បញ្ជីពេញលេញនៃអថេរបរិស្ថាន រួមទាំង
  `NEXT_PUBLIC_BASE_URL`។
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — ជម្រើសជំនួសការប្រើ tunnel សម្រាប់ការ
  បង្ហោះជាសាធារណៈដែលមានស្ថិរភាព។
- កូដប្រភព៖ `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`។
