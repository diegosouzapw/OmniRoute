# Tunnels Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Chanzo rasmi:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Ilisasishwa mwisho:** 2026-06-28 — v3.8.40

OmniRoute inaweza kuweka seva yake ya ndani (`http://localhost:20128`) kwenye
intaneti ya umma kupitia mifumo mitatu ya tunnel. Hii ni muhimu kwa:

- Miito ya kurudi ya OAuth kutoka kwa watoa huduma za cloud (Antigravity, Gemini, Cursor) inayohitaji
  URL ya uelekezaji upya inayoweza kufikiwa hadharani.
- Kushiriki instance yako ya ndani na wenzako bila kupeleka VM.
- Majaribio kupitia simu, kwa mbali, au kati ya mitandao tofauti.

Mifumo yote mitatu inadhibitiwa ndani ya mchakato — OmniRoute huanzisha/husimamisha
binary au SDK inayohusika kutoka kwenye dashboard au REST API. Hakuna usanidi wa
reverse-proxy au systemd unaohitajika.

## Muhtasari wa mifumo

| Mfumo                       | Udumishaji                                                           | Gharama                    | Usanidi                                                    |
| --------------------------- | -------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Ya muda mfupi (URL hubadilika kila inapoanzishwa upya)               | Bila malipo                | Hakuna — husakinisha `cloudflared` kiotomatiki             |
| **ngrok**                   | Thabiti wakati mpango wa kulipia au domain isiyobadilika imesanidiwa | Kiwango cha bure + kulipia | Inahitaji akaunti ya ngrok + authtoken                     |
| **Tailscale Funnel**        | Thabiti kwa kila node ndani ya tailnet yako                          | Bure kwa matumizi binafsi  | Inahitaji usakinishaji wa Tailscale + kuingia + Funnel ACL |

Utekelezaji hupatikana katika `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, na `src/lib/tailscaleTunnel.ts`. Mifumo yote mitatu hurudisha
object ya `status` yenye muundo sawa na fields za `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl`, na `lastError`, ili dashboard iweze kuzionyesha kwa namna moja.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` huendesha `cloudflared` kama mchakato mtoto. Inatumia
hali mbili, zinazochaguliwa kulingana na kama config ya named tunnel imetolewa:

- **Quick tunnel (chaguo-msingi).** Huendesha `cloudflared tunnel --url
http://localhost:<apiPort>` na kuchanganua URL ya `*.trycloudflare.com` iliyotolewa
  kutoka stdout. URL ni za muda mfupi na hubadilika kila inapoanzishwa upya.
- **Named tunnel (ya hiari).** Wakati `CLOUDFLARED_CONFIG` inaelekeza kwenye
  `config.yml` ya cloudflared inayodhibitiwa ndani ya mashine, OmniRoute huendesha `cloudflared tunnel --no-autoupdate
--config <path> run`, na kukupa **hostname thabiti yenye jina**. Config
  hutoa UUID ya tunnel, `credentials-file`, na uelekezaji wa `ingress`, kwa hivyo
  `--url` haitumiki na token ya dashboard ya Zero Trust haihitajiki. `run` husoma
  vitambulisho kutoka kwenye path kamili ya `credentials-file` iliyo kwenye config — `cert.pem`
  haihitajiki (hiyo hutumika tu kwa usimamizi wa mzunguko wa maisha wa tunnel).

Tabia muhimu:

- **Usakinishaji wa kiotomatiki.** Inapotumiwa kwa mara ya kwanza, OmniRoute hupakua binary ya hivi karibuni ya `cloudflared`
  kutoka matoleo rasmi ya GitHub (usakinishaji unaodhibitiwa huhifadhiwa chini ya
  `DATA_DIR/cloudflared/`). SHA256 ya asset iliyopakuliwa huthibitishwa dhidi ya
  manifest ya toleo kabla ya kutekelezwa.
- **Usimamizi wa mchakato.** PID ya cloudflared na URL iliyotambuliwa huhifadhiwa katika
  `quick-tunnel-state.json` ili dashboard iweze kuendelea kuonyesha hali baada ya kupakiwa upya.

### Usanidi wa named tunnel (hostname thabiti)

1. Unda tunnel inayodhibitiwa ndani ya mashine ukitumia cloudflared CLI (mara moja):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Andika `~/.cloudflared/config.yml` inayoelekeza hostname yako kwenye port ya ndani ya
   API ya OmniRoute (chaguo-msingi ni 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Elekeza OmniRoute kwenye config na uanzishe (upya) tunnel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # si lazima — hubatilisha hostname ambayo OmniRoute huripoti; vinginevyo husomwa kutoka
   # kwenye kanuni ya kwanza ya ingress ya config:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Washa tunnel kwa njia sawa na quick tunnel (REST / dashboard / CLI
   hapa chini). Named tunnel haitoi URL ya umma ya kuchanganuliwa, kwa hivyo utayari hutambuliwa
   kupitia muunganisho wa edge uliosajiliwa wa cloudflared, na `publicUrl`/`apiUrl`
   huripotiwa kutoka `CLOUDFLARED_HOSTNAME` (au hostname ya kwanza ya ingress kwenye config).

### Kuwasha / kuzima kupitia REST

Endpoint hutumia body ya `{action: "enable" | "disable"}`, si paths tofauti za
`start`/`stop`. Uthibitishaji wa usimamizi (session ya admin au API key ya admin)
unahitajika.

```bash
# Washa
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Hali
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Zima
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Au kupitia dashboard: **Settings → Tunnels → Cloudflare**.

### Env vars za hiari

| Kigeu                                                | Kusudi                                                                                                                                                                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Hubatilisha njia ya faili tekelezi. Ikiwa imewekwa na ni halali, OmniRoute huitumia badala ya kuipakua.                                                                                                       |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Itifaki ya usafirishaji (chaguo-msingi `http2`; pia `quic`, `auto`).                                                                                                                                          |
| `CLOUDFLARED_CONFIG`                                 | Njia ya kuelekea kwenye `config.yml` ya cloudflared inayodhibitiwa ndani ya mfumo. Ikiwekwa, OmniRoute huendesha handaki **lenye jina/la kudumu** (`tunnel --config <path> run`) badala ya handaki la haraka. |
| `CLOUDFLARED_HOSTNAME`                               | Hubatilisha jina la mpangishi wa umma linaloripotiwa la handaki lenye jina (k.m. `ai.example.com`). Ikiwa halijawekwa, husomwa kutoka kwenye jina la mpangishi la kwanza la `ingress` katika usanidi.         |

## 2. ngrok

`src/lib/ngrokTunnel.ts` hutumia **SDK ya `@ngrok/ngrok`** (ndani ya mchakato, bila mchakato mdogo wa CLI). Moduli asilia huingizwa kwa kucheleweshwa wakati wa uanzishaji wa kwanza ili majukwaa yasiyo na faili jozi zilizoundwa mapema yasisababishe programu ishindwe wakati wa kuwashwa.

### Mahitaji ya awali

1. Jisajili kwenye <https://ngrok.com>.
2. Nakili authtoken yako kutoka kwenye dashibodi ya ngrok.
3. Itoe kupitia mojawapo ya njia hizi:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, au
   - Dashibodi: **Mipangilio → Tunnels → ngrok**, au
   - Mwili wa REST (mara moja): `{"action":"enable","authToken":"<token>"}`.

Ikiwa hakuna iliyosanidiwa, hali hurudisha `phase: "needs_auth"`.

### Kuwasha / kuzima kupitia REST

```bash
# Washa (hutumia NGROK_AUTHTOKEN kutoka env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Washa kwa token iliyowekwa moja kwa moja
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Hali
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Zima
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Jibu linajumuisha `publicUrl` iliyotolewa (k.m.
`https://abcd-1234.ngrok-free.app`). Vikoa maalum, maeneo, na kanuni za sera
lazima zisanidiwe kwenye dashibodi ya ngrok — OmniRoute yenyewe hupeleka tu URL
lengwa ya ndani kwenye SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` huratibu CLI ya mfumo ya `tailscale` ili kufichua
mlango wa API ya ndani kupitia **Funnel** (njia ya Tailscale ya kutoka kwenda
kwenye intaneti ya umma kwa huduma). Inatumia mzunguko kamili wa uendeshaji:
usakinishaji, kuingia, kuanzisha daemoni, kuwasha, na kuzima.

Utekelezaji huendesha `tailscale funnel --bg <port>` (hali ya mandharinyuma). URL
ya umma huwa na muundo `https://<machine>.<tailnet>.ts.net/`.

### Mahitaji ya awali

1. Sakinisha Tailscale (au iruhusu OmniRoute ifanye hivyo — tazama endpoint ya `install` hapa chini).
2. Ingia (`tailscale login` au kupitia endpoint ya `login` ya OmniRoute).
3. Washa Funnel kwa ajili ya tailnet yako katika dashibodi ya msimamizi wa Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Kwenye Linux na macOS, daemoni (`tailscaled`) huhitaji `sudo` ili kudhibitiwa.
Endpoint za POST zinakubali uga wa hiari wa `sudoPassword`, ambao hupelekwa
kwenye akiba ya nenosiri ya MITM ya OmniRoute (`getCachedPassword` /
`setCachedPassword`) kwa muda wa ombi. Windows hutumia usakinishaji chaguo-msingi
wa huduma katika `C:\Program Files\Tailscale\tailscale.exe`.

### Endpoint za REST

Tailscale ina kiolesura kipana zaidi kuliko mifumo mingine ya nyuma kwa sababu
usakinishaji, kuingia, daemoni, na handaki ni masuala tofauti.

| Endpoint                              | Mbinu  | Madhumuni                                                                         |
| ------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Hali iliyojumuishwa ya handaki (`phase`, `tunnelUrl`, `apiUrl`, n.k.)             |
| `/api/tunnels/tailscale/check`        | `GET`  | Ukaguzi wa kiwango cha chini: imesakinishwa? umeingia? daemoni inaendeshwa?       |
| `/api/tunnels/tailscale/install`      | `POST` | Sakinisha Tailscale (matukio ya maendeleo yanayotiririshwa kwa SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Anzisha `tailscaled` kwenye Linux/macOS                                           |
| `/api/tunnels/tailscale/login`        | `POST` | Anza mchakato wa kuingia; hurudisha `authUrl` ya kufungua kwenye kivinjari        |
| `/api/tunnels/tailscale/enable`       | `POST` | Anzisha Funnel kwa ajili ya mlango wa API                                         |
| `/api/tunnels/tailscale/disable`      | `POST` | Simamisha Funnel                                                                  |

Endpoint zote za Tailscale zinahitaji uthibitishaji wa usimamizi (tazama
`routeUtils.ts :: requireTailscaleAuth`).

Mfano wa kuwasha:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Ikiwa Funnel haijawashwa katika dashibodi ya msimamizi, jibu linajumuisha
`funnelNotEnabled: true` pamoja na `enableUrl` ya kufungua kwenye kivinjari.

### Vigeu vya hiari vya env

| Kigeu           | Madhumuni                                   |
| --------------- | ------------------------------------------- |
| `TAILSCALE_BIN` | Badilisha njia ya faili jozi ya `tailscale` |

## Muhtasari wa endpoint

| Endpoint                              | Mbinu  | Mwili                               | Uthibitishaji |
| ------------------------------------- | ------ | ----------------------------------- | ------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | usimamizi     |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | usimamizi     |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | usimamizi     |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | usimamizi     |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | usimamizi     |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | usimamizi     |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | usimamizi     |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | usimamizi     |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | usimamizi     |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | usimamizi     |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | usimamizi     |

Hakuna endpoint kuu ya `/api/settings/tunnels` — kila backend inajitegemea.

## Mambo ya kuzingatia kuhusu callback ya OAuth

Unapoweka OmniRoute ipatikane kupitia tunnel, dashibodi na mitiririko ya OAuth lazima
iunde URL za callback kwa kutumia hostname ya **umma**, si `localhost`. Vinginevyo,
mtoa huduma wa OAuth humwelekeza mtumiaji kwenye URL ambayo seva zake haziwezi kufikia,
na mchakato wa kuanzisha muunganisho hushindwa.

Mabadiliko kwenye dashibodi na uhifadhi wa mipangilio havihitaji kuweka hostname ya tunnel
moja kwa moja katika `NEXT_PUBLIC_BASE_URL`. Dashibodi iliyothibitishwa hutuma maombi yasiyo
salama ya same-origin yenye tokeni ya CSRF iliyounganishwa na kipindi, kwa hivyo host za
muda mfupi za Cloudflare Quick Tunnel bado zinaweza kutumika kwa usimamizi wa kawaida wa UI
baada ya kuingia.

Weka:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

na uanzishe upya OmniRoute kabla ya kuanzisha OAuth. Kwa Cloudflare Quick
Tunnels za muda mfupi, URL hubadilika baada ya kila uanzishaji upya, kwa hivyo kwa matumizi
ya OAuth katika uzalishaji, pendelea ngrok yenye domain iliyohifadhiwa au Tailscale Funnel.

## Afya na ufuatiliaji

Dashibodi huonyesha hali ya tunnel chini ya **Mipangilio → Tunnel**:

- Backend zinazotumika na `phase` ya sasa (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- URL ya sasa ya umma na URL ya API inayotokana nayo (`<publicUrl>/v1`).
- URL ya lengo la ndani ambayo tunnel inaelekeza trafiki kwake.
- Ujumbe wa mwisho wa hitilafu, ikiwa upo.

Kwa ufuatiliaji wa kiprogramu, fanya polling ya endpoint za `GET` za kila backend.
Kuendesha zaidi ya backend moja kwa wakati mmoja kunaruhusiwa; OmniRoute itafuatilia kila
moja kivyake.

## Utatuzi wa matatizo

### "cloudflared binary not found"

OmniRoute hujaribu kusakinisha kiotomatiki inapotumiwa kwa mara ya kwanza. Ikiwa usakinishaji
umezuiwa (mtandao wenye vikwazo, hakuna ufikiaji wa GitHub), pakua `cloudflared` mwenyewe kutoka
<https://github.com/cloudflare/cloudflared/releases> na uweke
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken required"

`phase: "needs_auth"` inamaanisha hakuna authtoken iliyopatikana. Weka `NGROK_AUTHTOKEN` katika
`.env`, isanidi kupitia dashibodi, au pitisha `authToken` katika mwili wa ombi la POST la
kuwasha.

### "tailscale: funnel not enabled"

Jibu la kuwasha linapojumuisha `funnelNotEnabled: true`, Funnel imezimwa
kwa tailnet yako. Fungua `enableUrl` iliyorejeshwa (au ukurasa wa kipengele katika dashibodi
ya msimamizi) na uwashe Funnel.

### Mabadiliko ya URL ya tunnel huharibu OAuth

Tumia ngrok yenye domain iliyohifadhiwa au Tailscale Funnel (zote ni thabiti kwa kila node).
Cloudflare Quick Tunnels ni za muda mfupi kimakusudi na hazipendekezwi kwa callback za OAuth
za muda mrefu.

### Ruhusa imekataliwa kwenye Linux/macOS kwa Tailscale

`tailscaled` inahitaji ruhusa za root. Toa `sudoPassword` kwa endpoint husika ya POST,
au endesha daemon mwenyewe (`sudo systemctl start tailscaled`).

## Tazama pia

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proksi ya nje (1proxy, SOCKS5, HTTP) kwa
  trafiki inayotoka.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — orodha kamili ya vigezo vya mazingira ikijumuisha
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — njia mbadala za tunneling kwa upangishaji thabiti
  wa umma.
- Chanzo: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
