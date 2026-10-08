# Tunnels Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Sors awtorevoli:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jista’ jesponi s-server lokali tiegħu (`http://localhost:20128`) għall-internet
pubbliku permezz ta’ tliet backends ta’ tunnel. Dan huwa utli għal:

- Callbacks ta’ OAuth minn fornituri tal-cloud (Antigravity, Gemini, Cursor) li jeħtieġu
  URL ta’ ridirezzjoni aċċessibbli pubblikament.
- Il-kondiviżjoni tal-istanza lokali tiegħek ma’ membri tat-tim mingħajr ma tiskjera VM.
- Ittestjar minn apparat mobbli, mill-bogħod, jew bejn networks differenti.

It-tliet backends kollha huma ġestiti fl-istess proċess — OmniRoute jibda/jwaqqaf il-binary
jew l-SDK sottostanti mid-dashboard jew mir-REST API. Mhu meħtieġ l-ebda setup
ta’ reverse proxy jew systemd.

## Ħarsa ġenerali lejn il-backends

| Backend                     | Persistenza                                                  | Spiża                        | Setup                                                           |
| --------------------------- | ------------------------------------------------------------ | ---------------------------- | --------------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Temporanju (il-URL jinbidel ma’ kull startjar mill-ġdid)     | Bla ħlas                     | Xejn — jinstalla `cloudflared` awtomatikament                   |
| **ngrok**                   | Stabbli meta jkun ikkonfigurat pjan imħallas jew domain fiss | Livell bla ħlas + imħallas   | Jeħtieġ kont ta’ ngrok + authtoken                              |
| **Tailscale Funnel**        | Stabbli għal kull node fit-tailnet tiegħek                   | Bla ħlas għall-użu personali | Jeħtieġ l-installazzjoni ta’ Tailscale + login + ACL ta’ Funnel |

L-implimentazzjonijiet jinsabu f’`src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, u `src/lib/tailscaleTunnel.ts`. It-tlieta jirritornaw
oġġett `status` bl-istess struttura bil-fields `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl`, u `lastError`, sabiex id-dashboard ikun jista’ jurihom b’mod uniformi.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` iħaddem `cloudflared` bħala proċess wild. Jappoġġja
żewġ modi, magħżula skont jekk tiġix ipprovduta konfigurazzjoni ta’ named tunnel:

- **Quick tunnel (predefinit).** Iħaddem `cloudflared tunnel --url
http://localhost:<apiPort>` u janalizza l-URL `*.trycloudflare.com` assenjat
  mill-output standard. Il-URLs huma temporanji u jinbidlu ma’ kull startjar mill-ġdid.
- **Named tunnel (mhux obbligatorju).** Meta `CLOUDFLARED_CONFIG` jindika lejn
  `config.yml` ta’ cloudflared ġestit lokalment, OmniRoute jħaddem `cloudflared tunnel --no-autoupdate
--config <path> run`, u b’hekk jagħtik **hostname stabbli u msemmi**. Il-konfigurazzjoni
  tipprovdi l-UUID tat-tunnel, `credentials-file`, u r-routing ta’ `ingress`, għalhekk ma
  jiġi mgħoddi l-ebda `--url` u ma jkun meħtieġ l-ebda token tad-dashboard ta’ Zero Trust. `run` jaqra
  l-kredenzjali mill-path assolut ta’ `credentials-file` fil-konfigurazzjoni — `cert.pem`
  mhuwiex meħtieġ (dan jintuża biss għall-ġestjoni taċ-ċiklu tal-ħajja tat-tunnel).

Imġibiet ewlenin:

- **Installazzjoni awtomatika.** Mal-ewwel użu, OmniRoute jniżżel l-aħħar binary ta’ `cloudflared`
  mir-rilaxxi uffiċjali ta’ GitHub (l-installazzjoni ġestita tinsab taħt
  `DATA_DIR/cloudflared/`). Is-SHA256 tal-asset imniżżel jiġi vverifikat mal-manifest
  tar-rilaxx qabel l-eżekuzzjoni.
- **Superviżjoni tal-proċess.** Il-PID ta’ cloudflared u l-URL riżolt jinħażnu b’mod
  persistenti f’`quick-tunnel-state.json` sabiex id-dashboard ikun jista’ jerġa’ jkompli juri l-istatus wara li jerġa’ jitgħabba.

### Setup ta’ named tunnel (hostname stabbli)

1. Oħloq tunnel ġestit lokalment bil-CLI ta’ cloudflared (darba biss):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Ikteb `~/.cloudflared/config.yml` li jirrotja l-hostname tiegħek lejn il-port lokali
   tal-API ta’ OmniRoute (il-valur predefinit huwa 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Ipponta OmniRoute lejn il-konfigurazzjoni u erġa’ ibda t-tunnel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # mhux obbligatorju — jissostitwixxi l-hostname li jirrapporta OmniRoute; inkella jinqara mill-ewwel
   # regola ta’ ingress tal-konfigurazzjoni:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Attiva t-tunnel bl-istess mod bħal quick tunnel (REST / dashboard / CLI
   hawn taħt). Named tunnel ma jipproduċi l-ebda URL pubbliku li jista’ jiġi estratt, għalhekk il-prontezza tiġi identifikata
   mill-konnessjoni rreġistrata ta’ cloudflared mal-edge, u `publicUrl`/`apiUrl` jiġu
   rrapportati minn `CLOUDFLARED_HOSTNAME` (jew mill-ewwel hostname ta’ ingress fil-konfigurazzjoni).

### Attiva / iddiżattiva permezz ta’ REST

L-endpoint juża body `{action: "enable" | "disable"}`, mhux paths separati
`start`/`stop`. Hija meħtieġa awtentikazzjoni ta’ ġestjoni (sessjoni tal-amministratur jew API key tal-amministratur).

```bash
# Attiva
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Iddiżattiva
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Jew permezz tad-dashboard: **Settings → Tunnels → Cloudflare**.

### Varjabbli env mhux obbligatorji

| Varjabbli                                            | Għan                                                                                                                                                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Jissostitwixxi l-mogħdija tal-fajl binarju. Jekk ikun issettjat u validu, OmniRoute jużah minflok iniżżlu.                                                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protokoll tat-trasport (predefinit `http2`; ukoll `quic`, `auto`).                                                                                                                        |
| `CLOUDFLARED_CONFIG`                                 | Mogħdija għal `config.yml` ta’ cloudflared ġestit lokalment. Meta jkun issettjat, OmniRoute jħaddem mina **imsemmija/persistenti** (`tunnel --config <path> run`) minflok mina rapida.    |
| `CLOUDFLARED_HOSTNAME`                               | Jissostitwixxi l-isem tal-host pubbliku rrappurtat tal-mina msemmija (eż. `ai.example.com`). Meta ma jkunx issettjat, jinqara mill-ewwel isem tal-host ta’ `ingress` fil-konfigurazzjoni. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` juża l-**SDK `@ngrok/ngrok`** (fl-istess proċess, mingħajr sottoproċess CLI). Il-modulu nattiv jiġi importat b'mod differit mal-ewwel tħaddim sabiex pjattaformi mingħajr binarji kkompilati minn qabel ma jwaqqfux l-app waqt l-istartjar.

### Prerekwiżiti

1. Irreġistra fuq <https://ngrok.com>.
2. Ikkopja l-authtoken tiegħek mid-dashboard ta' ngrok.
3. Ipprovdih b'wieħed minn dawn il-modi:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, jew
   - Dashboard: **Settings → Tunnels → ngrok**, jew
   - Korp REST (għal darba waħda): `{"action":"enable","authToken":"<token>"}`.

Jekk l-ebda wieħed minnhom ma jkun ikkonfigurat, l-istatus jirritorna `phase: "needs_auth"`.

### Attiva / iddiżattiva permezz ta' REST

```bash
# Attiva (juża NGROK_AUTHTOKEN mill-ambjent)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Attiva b'token inline
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Iddiżattiva
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Ir-rispons jinkludi l-`publicUrl` assenjat (eż.
`https://abcd-1234.ngrok-free.app`). Dominji personalizzati, reġjuni, u regoli tal-politika jridu jiġu kkonfigurati fid-dashboard ta' ngrok — OmniRoute innifsu jgħaddi biss il-URL tal-mira lokali lill-SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` jorkestra s-CLI `tailscale` tas-sistema biex jesponi l-port lokali tal-API permezz ta' **Funnel** (il-ħruġ ta' Tailscale lejn l-internet pubbliku għas-serve). Jappoġġja ċ-ċiklu tal-ħajja kollu: installazzjoni, login, startjar tad-daemon, attivazzjoni, diżattivazzjoni.

L-implimentazzjoni tħaddem `tailscale funnel --bg <port>` (modalità fl-isfond). Il-URL pubbliku għandu l-format `https://<machine>.<tailnet>.ts.net/`.

### Prerekwiżiti

1. Installa Tailscale (jew ħalli lil OmniRoute jagħmel dan — ara l-endpoint `install` hawn taħt).
2. Idħol (`tailscale login` jew permezz tal-endpoint `login` ta' OmniRoute).
3. Attiva Funnel għat-tailnet tiegħek fil-console tal-amministrazzjoni ta' Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Fuq Linux u macOS id-daemon (`tailscaled`) jeħtieġ `sudo` biex jiġi kkontrollat. L-endpoints POST jaċċettaw field fakultattiv `sudoPassword` li jiġi mgħoddi lill-cache tal-passwords MITM ta' OmniRoute (`getCachedPassword` / `setCachedPassword`) għat-tul tas-sejħa. Windows juża l-installazzjoni awtomatika tas-servizz f'
`C:\Program Files\Tailscale\tailscale.exe`.

### Endpoints REST

Tailscale għandu superfiċje aktar rikka mill-backends l-oħrajn minħabba li l-installazzjoni, il-login, id-daemon, u t-tunnel huma aspetti separati.

| Endpoint                              | Metodu | Għan                                                                        |
| ------------------------------------- | ------ | --------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Status aggregat tat-tunnel (`phase`, `tunnelUrl`, `apiUrl`, eċċ.)           |
| `/api/tunnels/tailscale/check`        | `GET`  | Verifika ta' livell aktar baxx: installat? illoggjat? id-daemon jaħdem?     |
| `/api/tunnels/tailscale/install`      | `POST` | Installa Tailscale (avvenimenti tal-progress trażmessi b'SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Ibda `tailscaled` fuq Linux/macOS                                           |
| `/api/tunnels/tailscale/login`        | `POST` | Ibda l-fluss tal-login; jirritorna `authUrl` biex jinfetaħ fi browser       |
| `/api/tunnels/tailscale/enable`       | `POST` | Ibda l-Funnel għall-port tal-API                                            |
| `/api/tunnels/tailscale/disable`      | `POST` | Waqqaf il-Funnel                                                            |

L-endpoints kollha ta' Tailscale jeħtieġu awtentikazzjoni ta' ġestjoni (ara `routeUtils.ts ::
requireTailscaleAuth`).

Eżempju ta' attivazzjoni:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Jekk Funnel ma jkunx attivat fil-console tal-amministrazzjoni, ir-rispons jinkludi
`funnelNotEnabled: true` flimkien ma' `enableUrl` biex jinfetaħ fi browser.

### Varjabbli fakultattivi tal-ambjent

| Varjabbli       | Għan                                         |
| --------------- | -------------------------------------------- |
| `TAILSCALE_BIN` | Issostitwixxi l-path tal-binarju `tailscale` |

## Sommarju tal-endpoints

| Endpoint                              | Metodu | Body                                | Awtorizzazzjoni |
| ------------------------------------- | ------ | ----------------------------------- | --------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | ġestjoni        |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | ġestjoni        |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | ġestjoni        |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | ġestjoni        |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | ġestjoni        |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | ġestjoni        |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | ġestjoni        |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | ġestjoni        |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | ġestjoni        |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | ġestjoni        |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | ġestjoni        |

Ma hemm l-ebda endpoint ċentrali `/api/settings/tunnels` — kull backend huwa
indipendenti.

## Konsiderazzjonijiet dwar il-callback ta' OAuth

Meta tesponi OmniRoute permezz ta' mina, id-dashboard u l-flussi ta' OAuth iridu
jibnu l-URLs tal-callback abbażi tal-isem tal-host **pubbliku**, mhux `localhost`.
Inkella, il-fornitur ta' OAuth jirridirezzjona lill-utent lura lejn URL li
s-servers tiegħu ma jistgħux jilħqu, u l-handshake ifalli.

Il-modifiki fid-dashboard u l-issejvjar tas-settings ma jeħtiġux li l-isem
tal-host tal-mina jiġi ffissat f'`NEXT_PUBLIC_BASE_URL`. Id-dashboard awtentikat
jibgħat talbiet mhux sikuri tal-istess oriġini b'token CSRF marbut mas-sessjoni,
għalhekk il-hosts temporanji ta' Cloudflare Quick Tunnel xorta jistgħu jintużaw
għall-ġestjoni normali tal-UI wara l-login.

Issettja:

```bash
NEXT_PUBLIC_BASE_URL=https://<il-host-tal-mina-tiegħek>
```

u erġa' ibda OmniRoute qabel tibda OAuth. Għal Cloudflare Quick Tunnels
temporanji, il-URL jinbidel wara kull restart, għalhekk għall-użu ta' OAuth
fil-produzzjoni agħżel ngrok b'dominju riżervat jew Tailscale Funnel.

## Saħħa u monitoraġġ

Id-dashboard juri l-istat tal-mina taħt **Settings → Tunnels**:

- Il-backend(s) attiv(i) u l-`phase` attwali (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Il-URL pubbliku attwali u l-URL tal-API derivat (`<publicUrl>/v1`).
- Il-URL fil-mira lokali li lejh il-mina qed tibgħat it-traffiku.
- L-aħħar messaġġ ta' żball, jekk ikun hemm.

Għal monitoraġġ programmatiku, ivverifika perjodikament l-endpoints `GET` ta'
kull backend. Huwa permess li tħaddem aktar minn backend wieħed fl-istess ħin;
OmniRoute se jsegwi lil kull wieħed minnhom b'mod indipendenti.

## Soluzzjoni tal-problemi

### "il-binary cloudflared ma nstabx"

OmniRoute jipprova jinstallah awtomatikament mal-ewwel użu. Jekk l-installazzjoni
tkun imblukkata (network ristrett, ebda aċċess għal GitHub), niżżel
`cloudflared` manwalment minn
<https://github.com/cloudflare/cloudflared/releases> u ssettja
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: huwa meħtieġ authtoken"

`phase: "needs_auth"` ifisser li ma nstab l-ebda authtoken. Issettja
`NGROK_AUTHTOKEN` f'`.env`, ikkonfigurah permezz tad-dashboard, jew għaddi
`authToken` fil-body tal-POST għall-attivazzjoni.

### "tailscale: funnel mhuwiex attivat"

Meta r-rispons tal-attivazzjoni jinkludi `funnelNotEnabled: true`, Funnel ikun
diżattivat għat-tailnet tiegħek. Iftaħ l-`enableUrl` ritornat (jew il-paġna
tal-funzjonalità fil-console tal-amministrazzjoni) u attiva Funnel.

### Bidliet fil-URL tal-mina jkissru OAuth

Uża ngrok b'dominju riżervat jew Tailscale Funnel (it-tnejn huma stabbli għal
kull node). Cloudflare Quick Tunnels huma temporanji apposta u mhumiex
rakkomandati għal callbacks ta' OAuth fit-tul.

### Permess miċħud fuq Linux/macOS għal Tailscale

`tailscaled` jeħtieġ aċċess root. Ipprovdi `sudoPassword` lill-endpoint POST
rilevanti, jew ħaddem id-daemon int stess (`sudo systemctl start tailscaled`).

## Ara wkoll

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy ’l barra (1proxy, SOCKS5, HTTP) għat-traffiku
  li joħroġ.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — lista sħiħa tal-varjabbli tal-ambjent inkluż
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternattivi għat-tunneling għal
  hosting pubbliku stabbli.
- Sors: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
