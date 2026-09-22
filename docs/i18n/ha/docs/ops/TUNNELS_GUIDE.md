# Tunnels Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Tushen gaskiya:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Sabuntawa na ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute na iya buɗe sabar gida (`http://localhost:20128`) ga intanet na
jama'a ta hanyoyin tunnel guda uku. Wannan yana da amfani wajen:

- Karɓar OAuth callbacks daga masu samar da cloud (Antigravity, Gemini, Cursor) waɗanda ke buƙatar
  redirect URL da jama'a za su iya isa gare shi.
- Raba instance ɗin gida tare da abokan aiki ba tare da tura VM ba.
- Gwaji ta wayar hannu, daga nesa, ko tsakanin hanyoyin sadarwa daban-daban.

Ana sarrafa dukkan backends ukun a cikin process ɗin — OmniRoute yana fara/tsayar da binary
ko SDK daga dashboard ko REST API. Ba a buƙatar saitin reverse-proxy ko systemd.

## Taƙaitaccen bayani kan backends

| Backend                     | Dorewa                                                          | Farashi                  | Saiti                                                 |
| --------------------------- | --------------------------------------------------------------- | ------------------------ | ----------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Na wucin gadi (URL yana canzawa duk lokacin sake farawa)        | Kyauta                   | Babu — yana shigar da `cloudflared` ta atomatik       |
| **ngrok**                   | Tsayayye muddin an saita shirin biyan kuɗi ko takamaiman domain | Matakin kyauta + na biya | Yana buƙatar asusun ngrok + authtoken                 |
| **Tailscale Funnel**        | Tsayayye ga kowane node a cikin tailnet ɗinka                   | Kyauta don amfanin kai   | Yana buƙatar shigar da Tailscale + login + Funnel ACL |

Implementations ɗin suna cikin `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, da `src/lib/tailscaleTunnel.ts`. Dukkan ukun suna mayar da
object ɗin `status` mai tsari iri ɗaya, wanda ke da fields na `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl`, da `lastError`, domin dashboard ya iya nuna su iri ɗaya.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` yana gudanar da `cloudflared` a matsayin child process. Yana goyon bayan
modes guda biyu, waɗanda ake zaɓa bisa ko an samar da named-tunnel config:

- **Quick tunnel (na asali).** Yana gudanar da `cloudflared tunnel --url
http://localhost:<apiPort>` sannan ya fitar da URL ɗin `*.trycloudflare.com` da aka ware
  daga stdout. URLs ɗin na wucin gadi ne kuma suna canzawa duk lokacin sake farawa.
- **Named tunnel (na zaɓi).** Lokacin da `CLOUDFLARED_CONFIG` yake nuna locally-managed
  cloudflared `config.yml`, OmniRoute yana gudanar da `cloudflared tunnel --no-autoupdate
--config <path> run`, wanda ke ba ka **hostname mai tsayayyen suna**. Config ɗin
  yana samar da tunnel UUID, `credentials-file`, da `ingress` routing, don haka ba a
  tura `--url` kuma ba a buƙatar token na Zero Trust dashboard. `run` yana karanta
  credentials daga cikakken path na `credentials-file` da ke cikin config — ba a buƙatar `cert.pem`
  (ana amfani da shi ne kawai don sarrafa lifecycle na tunnel).

Muhimman halaye:

- **Shigarwa ta atomatik.** A amfani na farko, OmniRoute yana sauke sabon binary na `cloudflared`
  daga releases na hukuma na GitHub (managed install yana ƙarƙashin
  `DATA_DIR/cloudflared/`). Ana tabbatar da SHA256 na asset ɗin da aka sauke ta hanyar kwatanta shi da
  release manifest kafin a gudanar da shi.
- **Kula da process.** Ana adana cloudflared PID da URL ɗin da aka gano a cikin
  `quick-tunnel-state.json` domin dashboard ya iya ci gaba da nuna status bayan reloads.

### Saitin named tunnel (hostname mai tsayayye)

1. Ƙirƙiri locally-managed tunnel da cloudflared CLI (sau ɗaya kawai):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Rubuta `~/.cloudflared/config.yml` da zai tura hostname ɗinka zuwa port na API na gida
   na OmniRoute (na asali 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Nuna wa OmniRoute config ɗin sannan ka (sake) fara tunnel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # na zaɓi — yana maye gurbin hostname da OmniRoute ke bayarwa; in ba haka ba ana karanta shi daga
   # ingress rule na farko na config:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Kunna tunnel kamar yadda ake kunna quick tunnel (REST / dashboard / CLI
   da ke ƙasa). Named tunnel ba ya fitar da public URL da za a tattara, don haka ana gano
   shirye-shiryensa daga edge connection da cloudflared ya yi rajista, sannan ana bayar da
   `publicUrl`/`apiUrl` daga `CLOUDFLARED_HOSTNAME` (ko ingress hostname na farko a config).

### Kunna / kashewa ta REST

Endpoint ɗin yana amfani da body na `{action: "enable" | "disable"}`, ba paths daban na
`start`/`stop` ba. Ana buƙatar management auth (admin session ko admin API key).

```bash
# Kunna
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Matsayi
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Kashe
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Ko ta dashboard: **Settings → Tunnels → Cloudflare**.

### Env vars na zaɓi

| Sauyi                                                | Manufa                                                                                                                                                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Maye gurbin hanyar fayil ɗin binary. Idan an saita ta kuma tana aiki, OmniRoute zai yi amfani da ita maimakon sauke wani.                                                                           |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Ka'idar sufuri (tsohuwa ita ce `http2`; akwai kuma `quic`, `auto`).                                                                                                                                 |
| `CLOUDFLARED_CONFIG`                                 | Hanyar zuwa `config.yml` na cloudflared da ake sarrafawa a cikin gida. Idan an saita, OmniRoute zai gudanar da rami **mai suna/dindindin** (`tunnel --config <path> run`) maimakon rami na gaggawa. |
| `CLOUDFLARED_HOSTNAME`                               | Yana maye gurbin sunan mai masaukin jama'a da rami mai suna yake bayarwa (misali `ai.example.com`). Idan ba a saita ba, za a karanta shi daga sunan mai masaukin `ingress` na farko a cikin saitin. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` yana amfani da **`@ngrok/ngrok` SDK** (a cikin tsari ɗaya, ba tare da ƙaramin tsari na CLI ba). Ana shigo da native module ɗin ne a hankali lokacin fara amfani da shi, domin manhajar kada ta samu matsala yayin farawa a dandamalin da ba su da binaries da aka riga aka gina.

### Abubuwan da ake buƙata

1. Yi rajista a <https://ngrok.com>.
2. Kwafi authtoken ɗinka daga dashboard na ngrok.
3. Samar da shi ta ɗaya daga cikin waɗannan hanyoyin:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, ko
   - Dashboard: **Settings → Tunnels → ngrok**, ko
   - Jikin REST (amfani sau ɗaya): `{"action":"enable","authToken":"<token>"}`.

Idan ba a saita ko ɗaya ba, matsayin zai dawo da `phase: "needs_auth"`.

### Kunna / kashe ta REST

```bash
# Kunna (yana amfani da NGROK_AUTHTOKEN daga env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Kunna tare da token a ciki kai tsaye
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Matsayi
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Kashe
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Amsar tana ƙunshe da `publicUrl` da aka ware (misali,
`https://abcd-1234.ngrok-free.app`). Dole ne a saita domains na musamman, yankuna, da ƙa’idojin manufofi a dashboard na ngrok — OmniRoute da kansa yana tura local target URL kawai zuwa SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` yana tsara aikin `tailscale` CLI na tsarin domin fallasa local API port ta hanyar **Funnel** (hanyar fitar da serve zuwa intanet na jama'a ta Tailscale). Yana tallafa wa cikakken tsarin rayuwa: girkawa, shiga, fara daemon, kunnawa, da kashewa.

Aiwatarwar tana kiran `tailscale funnel --bg <port>` (yanayin aiki a bango). Public URL ɗin yana da sigar `https://<machine>.<tailnet>.ts.net/`.

### Abubuwan da ake buƙata

1. Girka Tailscale (ko ka bar OmniRoute ya yi hakan — duba endpoint na `install` da ke ƙasa).
2. Shiga (`tailscale login` ko ta endpoint na `login` na OmniRoute).
3. Kunna Funnel ga tailnet ɗinka a admin console na Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

A Linux da macOS, daemon (`tailscaled`) yana buƙatar `sudo` domin sarrafa shi. Endpoints na POST suna karɓar filin `sudoPassword` na zaɓi, wanda ake tura shi zuwa ma'ajiyar kalmar sirri ta MITM ta OmniRoute (`getCachedPassword` / `setCachedPassword`) na tsawon lokacin kiran. Windows yana amfani da default service install a `C:\Program Files\Tailscale\tailscale.exe`.

### Endpoints na REST

Tailscale yana da ayyuka masu faɗi fiye da sauran backends saboda girkawa, shiga, daemon, da tunnel batutuwa ne masu zaman kansu.

| Endpoint                              | Hanya  | Manufa                                                                 |
| ------------------------------------- | ------ | ---------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Haɗaɗɗen matsayin tunnel (`phase`, `tunnelUrl`, `apiUrl`, da sauransu) |
| `/api/tunnels/tailscale/check`        | `GET`  | Bincike na ƙasa-ƙasa: an girka? an shiga? daemon yana aiki?            |
| `/api/tunnels/tailscale/install`      | `POST` | Girka Tailscale (abubuwan ci-gaba da ake watsawa ta SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Fara `tailscaled` a Linux/macOS                                        |
| `/api/tunnels/tailscale/login`        | `POST` | Fara tsarin shiga; yana dawo da `authUrl` da za a buɗe a browser       |
| `/api/tunnels/tailscale/enable`       | `POST` | Fara Funnel don API port                                               |
| `/api/tunnels/tailscale/disable`      | `POST` | Dakatar da Funnel                                                      |

Duk endpoints na Tailscale suna buƙatar management auth (duba `routeUtils.ts ::
requireTailscaleAuth`).

Misalin kunnawa:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Idan ba a kunna Funnel a admin console ba, amsar za ta ƙunshi `funnelNotEnabled: true` tare da `enableUrl` da za a buɗe a browser.

### Env vars na zaɓi

| Variable        | Manufa                           |
| --------------- | -------------------------------- |
| `TAILSCALE_BIN` | Sauya binary path na `tailscale` |

## Taƙaitaccen bayani kan endpoint

| Endpoint                              | Hanya  | Body                                | Tantancewa |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | gudanarwa  |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | gudanarwa  |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | gudanarwa  |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | gudanarwa  |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | gudanarwa  |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | gudanarwa  |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | gudanarwa  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | gudanarwa  |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | gudanarwa  |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | gudanarwa  |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | gudanarwa  |

Babu endpoint na tsakiya `/api/settings/tunnels` — kowane backend yana aiki ne
da kansa.

## Abubuwan la'akari game da callback na OAuth

Lokacin da ka fitar da OmniRoute ta hanyar tunnel, dashboard da tsarin OAuth dole
su gina URLs na callback bisa sunan host na **jama'a**, ba `localhost` ba. In ba
haka ba, mai samar da OAuth zai mayar da mai amfani zuwa URL da sabobinsa ba za
su iya isa gare shi ba, kuma haɗin tantancewar zai gaza.

Gyare-gyaren dashboard da adana saituna ba sa buƙatar ɗaure sunan host na tunnel a
cikin `NEXT_PUBLIC_BASE_URL`. Dashboard da aka tantance yana aika buƙatun
same-origin marasa aminci tare da alamar CSRF da ke daure da zaman, saboda haka
har yanzu ana iya amfani da hosts na Cloudflare Quick Tunnel na wucin gadi don
gudanar da UI na yau da kullum bayan shiga.

Saita:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

sannan ka sake kunna OmniRoute kafin fara OAuth. Ga Cloudflare Quick Tunnels na
wucin gadi, URL yana canzawa bayan kowace sake kunnawa, saboda haka a fi son ngrok
mai domain da aka tanada ko Tailscale Funnel don amfani da OAuth a samarwa.

## Lafiya da sa ido

Dashboard yana nuna halin tunnel a ƙarƙashin **Settings → Tunnels**:

- Backend(s) masu aiki da `phase` na yanzu (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- URL na jama'a na yanzu da URL na API da aka samo (`<publicUrl>/v1`).
- URL na target na cikin gida da tunnel yake tura zirga-zirga zuwa gare shi.
- Saƙon kuskure na ƙarshe, idan akwai.

Don sa ido ta hanyar shirye-shirye, yi polling na endpoints na `GET` na kowane
backend. An yarda a tafiyar da backend fiye da ɗaya a lokaci guda; OmniRoute zai
bibiyi kowannensu da kansa.

## Warware matsaloli

### "Ba a sami binary na cloudflared ba"

OmniRoute yana ƙoƙarin girka shi kai tsaye lokacin amfani na farko. Idan an hana
girkawar (ƙuntatacciyar hanyar sadarwa, babu damar shiga GitHub), sauke
`cloudflared` da hannu daga
<https://github.com/cloudflare/cloudflared/releases> sannan saita
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: ana buƙatar authtoken"

`phase: "needs_auth"` yana nufin ba a sami authtoken ba. Saita `NGROK_AUTHTOKEN` a
cikin `.env`, daidaita shi ta dashboard, ko aika `authToken` a cikin body na POST
na enable.

### "tailscale: ba a kunna funnel ba"

Lokacin da amsar enable ta ƙunshi `funnelNotEnabled: true`, an kashe Funnel
ga tailnet ɗinka. Buɗe `enableUrl` da aka mayar (ko shafin fasalin admin console)
sannan kunna Funnel.

### Canje-canjen URL na tunnel suna lalata OAuth

Yi amfani da ngrok mai domain da aka tanada ko Tailscale Funnel (dukansu suna da
kwanciyar hankali ga kowane node). Cloudflare Quick Tunnels na wucin gadi ne bisa
ƙira kuma ba a ba da shawarar amfani da su don callbacks na OAuth na dogon lokaci
ba.

### An hana izini a Linux/macOS don Tailscale

`talescaled` yana buƙatar root. Bayar da `sudoPassword` ga endpoint na POST da ya
dace, ko ka gudanar da daemon da kanka (`sudo systemctl start tailscaled`).

## Duba kuma

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — wakilin haɗin waje (1proxy, SOCKS5, HTTP) don
  zirga-zirgar bayanai masu fita.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — cikakken jerin sauye-sauyen muhalli, ciki har da
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — hanyoyin madadin tunneling don tsayayyen
  ɗaukar nauyi na jama'a.
- Tushe: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
