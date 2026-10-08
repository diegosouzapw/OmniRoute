# Tunnels Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Huling na-update:** 2026-06-28 — v3.8.40

Maaaring ilantad ng OmniRoute ang lokal nitong server (`http://localhost:20128`) sa pampublikong
internet sa pamamagitan ng tatlong tunnel backend. Kapaki-pakinabang ito para sa:

- Mga OAuth callback mula sa mga cloud provider (Antigravity, Gemini, Cursor) na nangangailangan ng
  redirect URL na maaabot ng publiko.
- Pagbabahagi ng iyong lokal na instance sa mga kasamahan nang hindi nagde-deploy ng VM.
- Pagsubok gamit ang mobile, remote, o magkaibang network.

Ang lahat ng tatlong backend ay pinamamahalaan sa loob ng proseso — sinisimulan/ihihinto ng OmniRoute ang kaugnay na
binary o SDK mula sa dashboard o REST API. Walang kinakailangang pag-setup ng reverse-proxy o systemd.

## Mabilisang paghahambing ng mga backend

| Backend                     | Pagpapanatili                                                        | Gastos                             | Pag-setup                                                             |
| --------------------------- | -------------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Pansamantala (nagbabago ang URL sa bawat pag-restart)                | Libre                              | Wala — awtomatikong ini-install ang `cloudflared`                     |
| **ngrok**                   | Stable habang naka-configure ang bayad na plano o nakapirming domain | Libreng tier + bayad               | Nangangailangan ng ngrok account + authtoken                          |
| **Tailscale Funnel**        | Stable sa bawat node sa loob ng iyong tailnet                        | Libre para sa personal na paggamit | Nangangailangan ng pag-install at pag-login sa Tailscale + Funnel ACL |

Matatagpuan ang mga implementation sa `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, at `src/lib/tailscaleTunnel.ts`. Nagbabalik ang lahat ng tatlo ng
magkakaparehong anyong `status` object na may mga field na `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl`, at `lastError`, upang maipakita ng dashboard ang mga ito nang pare-pareho.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

Pinapatakbo ng `src/lib/cloudflaredTunnel.ts` ang `cloudflared` bilang child process. Sinusuportahan nito ang
dalawang mode, na pinipili batay sa kung may ibinigay na named-tunnel config:

- **Quick tunnel (default).** Pinapatakbo ang `cloudflared tunnel --url
http://localhost:<apiPort>` at kinukuha mula sa stdout ang itinalagang `*.trycloudflare.com` URL.
  Pansamantala ang mga URL at nagbabago sa bawat pag-restart.
- **Named tunnel (opsyonal).** Kapag nakaturo ang `CLOUDFLARED_CONFIG` sa isang lokal na pinamamahalaang
  `config.yml` ng cloudflared, pinapatakbo ng OmniRoute ang `cloudflared tunnel --no-autoupdate
--config <path> run`, na nagbibigay sa iyo ng **stable at pinangalanang hostname**. Ang config
  ang nagbibigay ng tunnel UUID, `credentials-file`, at `ingress` routing, kaya walang ipinapasang
  `--url` at hindi kailangan ang token ng Zero Trust dashboard. Binabasa ng `run` ang
  mga credential mula sa absolute na `credentials-file` path ng config — hindi kailangan ang `cert.pem`
  (ginagamit lamang iyon para sa pamamahala ng lifecycle ng tunnel).

Mahahalagang gawi:

- **Awtomatikong pag-install.** Sa unang paggamit, dina-download ng OmniRoute ang pinakabagong `cloudflared`
  binary mula sa opisyal na GitHub releases (matatagpuan ang pinamamahalaang installation sa ilalim ng
  `DATA_DIR/cloudflared/`). Bine-verify ang SHA256 ng na-download na asset gamit ang
  release manifest bago ito patakbuhin.
- **Pangangasiwa sa proseso.** Ang cloudflared PID at natukoy na URL ay sine-save sa
  `quick-tunnel-state.json` upang maipagpatuloy ng dashboard ang status pagkatapos ng mga reload.

### Pag-setup ng named tunnel (stable na hostname)

1. Gumawa ng lokal na pinamamahalaang tunnel gamit ang cloudflared CLI (isang beses lamang):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Gumawa ng `~/.cloudflared/config.yml` na nagru-route ng iyong hostname sa lokal na
   API port ng OmniRoute (default na 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Ituro ang OmniRoute sa config at (muling) simulan ang tunnel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # opsyonal — ino-override ang hostname na iniuulat ng OmniRoute; kung hindi, babasahin ito mula sa
   # unang ingress rule ng config:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   I-enable ang tunnel sa parehong paraan tulad ng quick tunnel (REST / dashboard / CLI
   sa ibaba). Walang inilalabas na pampublikong URL ang named tunnel na maaaring kunin, kaya natutukoy
   ang pagiging handa mula sa nakarehistrong edge connection ng cloudflared, at iniuulat ang `publicUrl`/`apiUrl`
   mula sa `CLOUDFLARED_HOSTNAME` (o sa unang ingress hostname ng config).

### I-enable / i-disable sa pamamagitan ng REST

Gumagamit ang endpoint ng body na `{action: "enable" | "disable"}`, hindi ng magkahiwalay na
`start`/`stop` path. Kinakailangan ang management auth (admin session o admin API key).

```bash
# I-enable
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# I-disable
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

O sa pamamagitan ng dashboard: **Settings → Tunnels → Cloudflare**.

### Mga opsyonal na env var

| Variable                                             | Layunin                                                                                                                                                                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | I-override ang path ng binary. Kung nakatakda at valid, ito ang ginagamit ng OmniRoute sa halip na mag-download.                                                                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transport protocol (default na `http2`; maaari rin ang `quic`, `auto`).                                                                                                                                         |
| `CLOUDFLARED_CONFIG`                                 | Path patungo sa lokal na pinamamahalaang cloudflared `config.yml`. Kapag nakatakda, nagpapatakbo ang OmniRoute ng **pinangalanan/permanenteng** tunnel (`tunnel --config <path> run`) sa halip na quick tunnel. |
| `CLOUDFLARED_HOSTNAME`                               | Ino-override ang iniulat na pampublikong hostname ng pinangalanang tunnel (hal. `ai.example.com`). Kapag hindi nakatakda, binabasa ito mula sa unang `ingress` hostname ng config.                              |

## 2. ngrok

Ginagamit ng `src/lib/ngrokTunnel.ts` ang **`@ngrok/ngrok` SDK** (in-process, walang CLI subprocess). Lazy na ini-import ang native module sa unang pagsisimula upang hindi masira sa pag-boot ang app sa mga platform na walang mga prebuilt binary.

### Mga kinakailangan

1. Mag-sign up sa <https://ngrok.com>.
2. Kopyahin ang iyong authtoken mula sa dashboard ng ngrok.
3. Ibigay ito sa alinman sa mga sumusunod:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, o
   - Dashboard: **Settings → Tunnels → ngrok**, o
   - REST body (isang beses lang): `{"action":"enable","authToken":"<token>"}`.

Kung walang naka-configure sa dalawa, magbabalik ang status ng `phase: "needs_auth"`.

### Paganahin / i-disable sa pamamagitan ng REST

```bash
# Paganahin (ginagamit ang NGROK_AUTHTOKEN mula sa env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Paganahin gamit ang inline token
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# I-disable
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Kasama sa tugon ang nakatalagang `publicUrl` (hal.
`https://abcd-1234.ngrok-free.app`). Dapat i-configure sa dashboard ng ngrok ang mga custom domain, rehiyon, at panuntunan ng policy — ipinapasa lamang ng OmniRoute sa SDK ang lokal na target URL.

## 3. Tailscale Funnel

Inoorkestra ng `src/lib/tailscaleTunnel.ts` ang system `tailscale` CLI upang ilantad ang lokal na API port sa pamamagitan ng **Funnel** (ang public-internet egress ng Tailscale para sa serve). Sinusuportahan nito ang buong lifecycle: pag-install, pag-login, pagsisimula ng daemon, pagpapagana, at pag-disable.

Pinapatakbo ng implementasyon ang `tailscale funnel --bg <port>` (background mode). Ang public URL ay may anyong `https://<machine>.<tailnet>.ts.net/`.

### Mga kinakailangan

1. I-install ang Tailscale (o hayaang gawin ito ng OmniRoute — tingnan ang `install` endpoint sa ibaba).
2. Mag-sign in (`tailscale login` o sa pamamagitan ng `login` endpoint ng OmniRoute).
3. Paganahin ang Funnel para sa iyong tailnet sa Tailscale admin console:
   <https://login.tailscale.com/admin/settings/features>.

Sa Linux at macOS, nangangailangan ang daemon (`tailscaled`) ng `sudo` upang makontrol. Tumatanggap ang mga POST endpoint ng opsyonal na `sudoPassword` field na ipinapasa sa MITM password cache ng OmniRoute (`getCachedPassword` / `setCachedPassword`) habang isinasagawa ang tawag. Ginagamit ng Windows ang default na service installation sa `C:\Program Files\Tailscale\tailscale.exe`.

### Mga REST endpoint

Mas malawak ang surface ng Tailscale kaysa sa ibang mga backend dahil magkakahiwalay na concern ang pag-install, pag-login, daemon, at tunnel.

| Endpoint                              | Method | Layunin                                                                          |
| ------------------------------------- | ------ | -------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Pinagsama-samang status ng tunnel (`phase`, `tunnelUrl`, `apiUrl`, atbp.)        |
| `/api/tunnels/tailscale/check`        | `GET`  | Mas mababang antas na pagsusuri: naka-install? naka-login? tumatakbo ang daemon? |
| `/api/tunnels/tailscale/install`      | `POST` | I-install ang Tailscale (mga progress event na ini-stream sa SSE) — Linux/macOS  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Simulan ang `tailscaled` sa Linux/macOS                                          |
| `/api/tunnels/tailscale/login`        | `POST` | Simulan ang daloy ng pag-login; ibinabalik ang `authUrl` na bubuksan sa browser  |
| `/api/tunnels/tailscale/enable`       | `POST` | Simulan ang Funnel para sa API port                                              |
| `/api/tunnels/tailscale/disable`      | `POST` | Ihinto ang Funnel                                                                |

Nangangailangan ang lahat ng Tailscale endpoint ng management auth (tingnan ang `routeUtils.ts ::
requireTailscaleAuth`).

Halimbawa ng pagpapagana:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Kung hindi pinagana ang Funnel sa admin console, kasama sa tugon ang `funnelNotEnabled: true` at isang `enableUrl` na bubuksan sa browser.

### Mga opsyonal na env var

| Variable        | Layunin                                   |
| --------------- | ----------------------------------------- |
| `TAILSCALE_BIN` | I-override ang binary path ng `tailscale` |

## Buod ng mga endpoint

| Endpoint                              | Paraan | Body                                | Awtorisasyon |
| ------------------------------------- | ------ | ----------------------------------- | ------------ |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | pamamahala   |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | pamamahala   |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | pamamahala   |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | pamamahala   |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | pamamahala   |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | pamamahala   |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | pamamahala   |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | pamamahala   |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | pamamahala   |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | pamamahala   |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | pamamahala   |

Walang sentral na endpoint na `/api/settings/tunnels` — magkakahiwalay ang
bawat backend.

## Mga pagsasaalang-alang para sa OAuth callback

Kapag inilalantad mo ang OmniRoute sa pamamagitan ng tunnel, dapat buuin ng
dashboard at mga daloy ng OAuth ang mga callback URL gamit ang **pampublikong**
hostname, hindi ang `localhost`. Kung hindi, ire-redirect ng OAuth provider ang
user pabalik sa isang URL na hindi maaabot ng mga server nito, at mabibigo ang
handshake.

Hindi kinakailangan sa mga pagbabago sa dashboard at pag-save ng mga setting na
italaga nang permanente ang tunnel hostname sa `NEXT_PUBLIC_BASE_URL`. Ang
authenticated na dashboard ay nagpapadala ng mga hindi ligtas na same-origin
request gamit ang CSRF token na nakatali sa session, kaya magagamit pa rin ang
mga pansamantalang host ng Cloudflare Quick Tunnel para sa karaniwang pamamahala
sa UI pagkatapos mag-log in.

Itakda ang:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

at i-restart ang OmniRoute bago simulan ang OAuth. Para sa mga pansamantalang
Cloudflare Quick Tunnel, nagbabago ang URL pagkatapos ng bawat pag-restart, kaya
mas mainam ang ngrok na may nakareserbang domain o Tailscale Funnel para sa
paggamit ng OAuth sa production.

## Kalusugan at pagsubaybay

Ipinapakita ng dashboard ang estado ng tunnel sa ilalim ng **Settings → Tunnels**:

- Mga aktibong backend at kasalukuyang `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Ang kasalukuyang pampublikong URL at ang hinangong API URL (`<publicUrl>/v1`).
- Ang lokal na target URL kung saan nagfo-forward ang tunnel.
- Ang huling mensahe ng error, kung mayroon.

Para sa programatikong pagsubaybay, regular na i-poll ang mga `GET` endpoint ng
bawat backend. Pinapayagan ang sabay-sabay na pagpapatakbo ng higit sa isang
backend; susubaybayan ng OmniRoute ang bawat isa nang hiwalay.

## Pag-troubleshoot

### "Hindi natagpuan ang cloudflared binary"

Sinusubukan ng OmniRoute na awtomatikong mag-install sa unang paggamit. Kung
naka-block ang pag-install (limitadong network, walang access sa GitHub),
manu-manong i-download ang `cloudflared` mula sa
<https://github.com/cloudflare/cloudflared/releases> at itakda ang
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: kinakailangan ang authtoken"

Ang `phase: "needs_auth"` ay nangangahulugang walang natagpuang authtoken.
Itakda ang `NGROK_AUTHTOKEN` sa `.env`, i-configure ito sa pamamagitan ng
dashboard, o ipasa ang `authToken` sa body ng enable POST.

### "tailscale: hindi naka-enable ang funnel"

Kapag kasama sa enable response ang `funnelNotEnabled: true`, naka-disable ang
Funnel para sa iyong tailnet. Buksan ang ibinalik na `enableUrl` (o ang pahina
ng feature sa admin console) at i-on ang Funnel.

### Sinisira ng mga pagbabago sa tunnel URL ang OAuth

Gamitin ang ngrok na may nakareserbang domain o Tailscale Funnel (parehong
stable para sa bawat node). Pansamantala ang mga Cloudflare Quick Tunnel ayon sa
disenyo at hindi inirerekomenda para sa mga pangmatagalang OAuth callback.

### Tinanggihan ang pahintulot sa Linux/macOS para sa Tailscale

Nangangailangan ang `tailscaled` ng root. Ibigay ang `sudoPassword` sa
nauugnay na POST endpoint, o ikaw mismo ang magpatakbo sa daemon
(`sudo systemctl start tailscaled`).

## Tingnan din

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — outbound proxy (1proxy, SOCKS5, HTTP) para sa
  trapikong palabas.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — kumpletong listahan ng mga env var kabilang ang
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — mga alternatibo sa tunneling para sa matatag na
  pampublikong pagho-host.
- Pinagmulan: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
