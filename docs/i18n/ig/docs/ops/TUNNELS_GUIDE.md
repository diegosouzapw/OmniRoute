# Tunnels Guide (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Isi iyi nke eziokwu:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Emelitere ikpeazụ:** 2026-06-28 — v3.8.40

OmniRoute nwere ike ime ka sava mpaghara ya (`http://localhost:20128`) dịrị ịntanetị
ọha site na backend ọwara atọ. Nke a bara uru maka:

- Nlaghachi OAuth sitere n'aka ndị na-eweta ọrụ igwe ojii (Antigravity, Gemini, Cursor) nke chọrọ
  URL ntụgharị a ga-enweta n'ihu ọha.
- Ịkekọrịta instance mpaghara gị na ndị otu gị n'ebunyeghị VM.
- Nnwale site na ekwentị, ebe dị anya, ma ọ bụ n'ofe netwọkụ.

A na-ejikwa backend atọ ahụ n'ime process — OmniRoute na-amalite/akwụsị binary
ma ọ bụ SDK dị n'okpuru site na dashboard ma ọ bụ REST API. Achọghị nhazi
reverse-proxy ma ọ bụ systemd.

## Nchịkọta backend

| Backend                     | Ịdịgide                                                          | Ọnụ ahịa                 | Nhazi                                         |
| --------------------------- | ---------------------------------------------------------------- | ------------------------ | --------------------------------------------- |
| **Cloudflare Quick Tunnel** | Nwa oge (URL na-agbanwe na mmalitegharị ọ bụla)                  | N'efu                    | Ọ dịghị — ọ na-etinye `cloudflared` n'onwe ya |
| **ngrok**                   | Na-adịgide mgbe ahaziri atụmatụ akwụ ụgwọ ma ọ bụ domain edoziri | Ọkwa efu + akwụ ụgwọ     | Chọrọ akaụntụ ngrok + authtoken               |
| **Tailscale Funnel**        | Na-adịgide maka node ọ bụla n'ime tailnet gị                     | N'efu maka ojiji nkeonwe | Chọrọ itinye Tailscale + nbanye + Funnel ACL  |

Mmejuputa ndị ahụ dị na `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, na `src/lib/tailscaleTunnel.ts`. Ha atọ na-eweghachi
object `status` nwere otu ụdị, nke nwere mpaghara `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl`, na `lastError`, ka dashboard nwee ike igosipụta ha n'otu ụzọ.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` na-agba `cloudflared` dịka child process. Ọ na-akwado
ọnọdụ abụọ, nke a na-ahọrọ dabere na ma e nyere nhazi named-tunnel:

- **Quick tunnel (ndabara).** Na-agba `cloudflared tunnel --url
http://localhost:<apiPort>` ma na-enyocha URL `*.trycloudflare.com` e kenyere
  site na stdout. URL ndị a bụ nwa oge ma na-agbanwe na mmalitegharị ọ bụla.
- **Named tunnel (nhọrọ).** Mgbe `CLOUDFLARED_CONFIG` na-atụ aka na
  `config.yml` nke cloudflared a na-ejikwa na mpaghara, OmniRoute na-agba `cloudflared tunnel --no-autoupdate
--config <path> run`, nke na-enye gị **hostname aha ya doro anya ma na-adịgide**. Nhazi ahụ
  na-enye UUID nke ọwara, `credentials-file`, na ntụgharị `ingress`, ya mere anaghị
  enyefe `--url`, achọghịkwa token dashboard Zero Trust. `run` na-agụ
  credentials site na path `credentials-file` zuru oke dị na nhazi ahụ — achọghị `cert.pem`
  (a na-eji nke ahụ naanị maka njikwa usoro ndụ ọwara).

Omume ndị dị mkpa:

- **Ntinye akpaka.** N'iji ya nke mbụ, OmniRoute na-ebudata binary `cloudflared`
  kacha ọhụrụ site na releases GitHub gọọmentị (ntinye a na-ejikwa dị n'okpuru
  `DATA_DIR/cloudflared/`). A na-enyocha SHA256 nke asset ebudatara megide manifest nke
  release ahụ tupu e mee ya.
- **Nlekọta process.** A na-echekwa PID nke cloudflared na URL a chọpụtara na
  `quick-tunnel-state.json` ka dashboard nwee ike ịmaliteghachi igosi status mgbe a reload.

### Nhazi named tunnel (hostname na-adịgide)

1. Jiri cloudflared CLI mepụta ọwara a na-ejikwa na mpaghara (naanị otu ugboro):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Dee `~/.cloudflared/config.yml` nke na-atụgharị hostname gị gaa na port API mpaghara
   nke OmniRoute (ndabara bụ 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Mee ka OmniRoute tụọ aka na nhazi ahụ ma (malitegharị) ọwara ahụ:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # nhọrọ — na-edochi hostname OmniRoute na-akọ; ma ọ bụghị ya, a ga-agụ ya site na
   # iwu ingress mbụ nke nhazi ahụ:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Kwado ọwara ahụ n'otu ụzọ ahụ dịka quick tunnel (REST / dashboard / CLI
   dị n'okpuru). Named tunnel anaghị ewepụta URL ọha a ga-enyocha, ya mere a na-achọpụta
   ịdị njikere site na njikọ edge nke cloudflared debanyere aha, a na-akọkwa `publicUrl`/`apiUrl`
   site na `CLOUDFLARED_HOSTNAME` (ma ọ bụ hostname ingress mbụ nke nhazi ahụ).

### Kwado / gbanyụọ site na REST

Endpoint ahụ na-eji body `{action: "enable" | "disable"}`, ọ bụghị path
`start`/`stop` dị iche iche. Achọrọ njirimara njikwa (session admin ma ọ bụ igodo API admin).

```bash
# Kwado
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Ọnọdụ
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Gbanyụọ
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Ma ọ bụ site na dashboard: **Settings → Tunnels → Cloudflare**.

### Env vars nhọrọ

| Ngbanwe                                              | Ebumnuche                                                                                                                                                                                    |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Dochie ụzọ faịlụ binary ahụ. Ọ bụrụ na edobere ya ma bụrụ nke ziri ezi, OmniRoute ga-eji ya kama ibudata ya.                                                                                 |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protocol mbufe (ndabara bụ `http2`; e nwekwara `quic`, `auto`).                                                                                                                              |
| `CLOUDFLARED_CONFIG`                                 | Ụzọ gaa na cloudflared `config.yml` a na-elekọta na mpaghara. Mgbe edobere ya, OmniRoute na-agba ọwara **nwere aha/na-adịgide adịgide** (`tunnel --config <path> run`) kama ọwara ngwa ngwa. |
| `CLOUDFLARED_HOSTNAME`                               | Dochie aha nnabata ọha nke ọwara nwere aha na-akọ (dịka `ai.example.com`). Mgbe edoghị ya, a na-agụ ya site na aha nnabata `ingress` mbụ dị na nhazi ahụ.                                    |

## 2. ngrok

`src/lib/ngrokTunnel.ts` na-eji **`@ngrok/ngrok` SDK** (n'ime usoro ahụ, enweghị
usoro nta CLI). A na-ebubata modul native ahụ naanị mgbe mmalite mbụ mere ka
nyiwe ndị na-enweghị binaries e wuru tupu oge eruo ghara ime ka ngwa ahụ daa mgbe ọ na-amalite.

### Ihe ndị achọrọ tupu ịmalite

1. Debanye aha na <https://ngrok.com>.
2. Detuo authtoken gị site na dashboard ngrok.
3. Nye ya site n'otu n'ime ụzọ ndị a:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, ma ọ bụ
   - Dashboard: **Settings → Tunnels → ngrok**, ma ọ bụ
   - Ahụ REST (otu ojiji): `{"action":"enable","authToken":"<token>"}`.

Ọ bụrụ na ahazighị nke ọ bụla, status ga-eweghachi `phase: "needs_auth"`.

### Kwado / gbanyụọ site na REST

```bash
# Kwado (na-eji NGROK_AUTHTOKEN sitere na env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Jiri token dị n'ime arịrịọ kwado
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Ọnọdụ
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Gbanyụọ
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Nzaghachi ahụ gụnyere `publicUrl` e kenyere (dịka ọmụmaatụ,
`https://abcd-1234.ngrok-free.app`). A ghaghị ịhazi ngalaba omenala, mpaghara, na iwu policy
na dashboard ngrok — OmniRoute n'onwe ya na-ebufe naanị URL ebumnuche mpaghara
gaa na SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` na-ahazi CLI `tailscale` nke sistemụ iji kpughee
ọdụ ụgbọ API mpaghara site na **Funnel** (ụzọ Tailscale si ezipụ serve gaa na ịntanetị ọha).
Ọ na-akwado usoro ndụ niile: nrụnye, nbanye, mmalite daemon, nkwado, na mgbanyụ.

Mmejuputa ahụ na-akpọ `tailscale funnel --bg <port>` (ọnọdụ ndabere). URL
ọha na-adị n'ụdị `https://<machine>.<tailnet>.ts.net/`.

### Ihe ndị achọrọ tupu ịmalite

1. Wụnye Tailscale (ma ọ bụ kwe ka OmniRoute mee ya — lee endpoint `install` dị n'okpuru).
2. Banye (`tailscale login` ma ọ bụ site na endpoint `login` nke OmniRoute).
3. Kwado Funnel maka tailnet gị na console nchịkwa Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Na Linux na macOS, daemon (`tailscaled`) chọrọ `sudo` iji chịkwaa ya. Endpoint
POST na-anabata field `sudoPassword` nhọrọ, nke a na-ebufe na cache okwuntughe MITM
nke OmniRoute (`getCachedPassword` / `setCachedPassword`) ruo oge oku ahụ na-adị. Windows
na-eji nrụnye service ndabara dị na
`C:\Program Files\Tailscale\tailscale.exe`.

### Endpoint REST

Tailscale nwere interface sara mbara karịa backend ndị ọzọ n'ihi na nrụnye,
nbanye, daemon, na tunnel bụ ihe dị iche iche.

| Endpoint                              | Method | Ebumnuche                                                            |
| ------------------------------------- | ------ | -------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Ọnọdụ tunnel agbakọtara (`phase`, `tunnelUrl`, `apiUrl`, wdg.)       |
| `/api/tunnels/tailscale/check`        | `GET`  | Nlele ọkwa dị ala: arụnyere ya? abanyela? daemon na-agba ọsọ?        |
| `/api/tunnels/tailscale/install`      | `POST` | Wụnye Tailscale (mmemme ọganihu ebugharị site na SSE) — Linux/macOS  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Malite `tailscaled` na Linux/macOS                                   |
| `/api/tunnels/tailscale/login`        | `POST` | Bido usoro nbanye; na-eweghachi `authUrl` ka emepee na ihe nchọgharị |
| `/api/tunnels/tailscale/enable`       | `POST` | Malite Funnel maka ọdụ ụgbọ API                                      |
| `/api/tunnels/tailscale/disable`      | `POST` | Kwụsị Funnel                                                         |

Endpoint Tailscale niile chọrọ njirimara nchịkwa (lee `routeUtils.ts ::
requireTailscaleAuth`).

Ọmụmaatụ nkwado:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Ọ bụrụ na akwadoghị Funnel na console nchịkwa, nzaghachi ahụ ga-agụnye
`funnelNotEnabled: true` yana `enableUrl` a ga-emepe na ihe nchọgharị.

### Env vars nhọrọ

| Variable        | Ebumnuche                      |
| --------------- | ------------------------------ |
| `TAILSCALE_BIN` | Dochie path binary `tailscale` |

## Nchịkọta endpoint

| Endpoint                              | Usoro  | Ahụ                                 | Nyocha ikike |
| ------------------------------------- | ------ | ----------------------------------- | ------------ |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | njikwa       |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | njikwa       |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | njikwa       |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | njikwa       |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | njikwa       |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | njikwa       |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | njikwa       |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | njikwa       |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | njikwa       |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | njikwa       |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | njikwa       |

Enweghị endpoint etiti `/api/settings/tunnels` — backend nke ọ bụla na-arụ ọrụ
n'onwe ya.

## Ihe ndị a ga-atụle gbasara OAuth callback

Mgbe ị na-eme ka a nweta OmniRoute site na tunnel, dashboard na usoro OAuth ga-
eji aha host **ọha** wuo URL callback, ọ bụghị `localhost`. Ma ọ bụghị ya,
onye na-enye OAuth ga-akpọghachi onye ọrụ na URL nke sava ya enweghị ike iru,
usoro njikọ ahụ agaghịkwa aga nke ọma.

Mgbanwe dashboard na ichekwa ntọala anaghị achọ ka etinye aha host tunnel ahụ
n'ụzọ na-adịgide adịgide na `NEXT_PUBLIC_BASE_URL`. Dashboard a nyochara ikike ya
na-eziga arịrịọ ndị same-origin na-adịghị nchebe site na token CSRF ejikọtara na
session, ya mere a ka nwere ike iji host Cloudflare Quick Tunnel ndị na-adịru nwa
oge maka njikwa UI nkịtị mgbe ịbanyechara.

Tọọ:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

ma malitegharịa OmniRoute tupu ịmalite OAuth. Maka Cloudflare Quick Tunnels ndị
na-adịru nwa oge, URL na-agbanwe mgbe ọ bụla e malitegharịrị ya, ya mere maka iji
OAuth na production, họrọ ngrok nwere domain edobere iche ma ọ bụ Tailscale
Funnel.

## Ahụike na nlekota

Dashboard na-egosi ọnọdụ tunnel n'okpuru **Settings → Tunnels**:

- Backend ndị na-arụ ọrụ na `phase` dị ugbu a (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- URL ọha dị ugbu a na URL API e si na ya nweta (`<publicUrl>/v1`).
- URL target mpaghara nke tunnel na-ebuga arịrịọ na ya.
- Ozi njehie ikpeazụ, ma ọ bụrụ na e nwere.

Maka nlekota site na mmemme, na-enyocha endpoint `GET` nke backend ọ bụla mgbe
niile. A na-ekwe ka ihe karịrị otu backend rụọ ọrụ n'otu oge; OmniRoute ga-
eso nke ọ bụla n'onwe ya.

## Ịdozi nsogbu

### "ahụghị binary cloudflared"

OmniRoute na-anwa ịwụnye ya na-akpaghị aka mgbe e ji ya rụọ ọrụ na nke mbụ. Ọ
bụrụ na egbochiri nrụnye ahụ (netwọk amachibidoro, enweghị ohere ịnweta GitHub),
jiri aka budata `cloudflared` site na
<https://github.com/cloudflare/cloudflared/releases> ma tọọ
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: achọrọ authtoken"

`phase: "needs_auth"` pụtara na ahụghị authtoken ọ bụla. Tọọ `NGROK_AUTHTOKEN`
na `.env`, hazie ya site na dashboard, ma ọ bụ tinye `authToken` n'ahụ arịrịọ
POST nke enable.

### "tailscale: agbanyeghị funnel"

Mgbe nzaghachi enable nwere `funnelNotEnabled: true`, agbanyụrụ Funnel maka
tailnet gị. Mepee `enableUrl` eweghachiri (ma ọ bụ ibe njirimara dị na admin
console) wee gbanye Funnel.

### Mgbanwe URL tunnel na-emebi OAuth

Jiri ngrok nwere domain edobere iche ma ọ bụ Tailscale Funnel (ha abụọ na-adịgide
adịgide maka node ọ bụla). Cloudflare Quick Tunnels na-adịru nwa oge n'ihi
nhazi ha, a naghị atụ aro ha maka OAuth callback ndị ga-adị ogologo oge.

### Ajụrụ ikike na Linux/macOS maka Tailscale

`tailscaled` chọrọ ikike root. Nye `sudoPassword` na endpoint POST kwesịrị
ekwesị, ma ọ bụ jiri aka gị mee ka daemon rụọ ọrụ
(`sudo systemctl start tailscaled`).

## Hụkwa

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy ọpụpụ (1proxy, SOCKS5, HTTP) maka
  okporo ụzọ na-apụ apụ.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — ndepụta zuru ezu nke env vars gụnyere
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — ụzọ ndị ọzọ kama tunneling maka nnabata
  ọha kwụsiri ike.
- Isi mmalite: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
