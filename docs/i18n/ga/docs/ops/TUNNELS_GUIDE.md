# Tunnels Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Foinse na fírinne:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Nuashonraithe den uair dheireanach:** 2026-06-28 — v3.8.40

Is féidir le OmniRoute a fhreastalaí áitiúil (`http://localhost:20128`) a nochtadh don
idirlíon poiblí trí thrí inneall tolláin. Tá sé seo úsáideach le haghaidh:

- Aisghlaonna OAuth ó sholáthraithe néil (Antigravity, Gemini, Cursor) a bhfuil URL
  atreoraithe atá inrochtana go poiblí de dhíth orthu.
- Do shampla áitiúil a roinnt le comhghleacaithe gan VM a imscaradh.
- Tástáil mhóibíleach, chianda nó trast-líonra.

Déantar na trí inneall a bhainistiú laistigh den phróiseas — tosaíonn/stadann OmniRoute an
dénártha nó an SDK foluiteach ón deais nó ón REST API. Ní theastaíonn aon socrú
seachfhreastalaí droim ar ais ná systemd.

## Sracfhéachaint ar na hinnill

| Inneall                     | Marthanacht                                              | Costas                           | Socrú                                                       |
| --------------------------- | -------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Sealadach (athraíonn an URL le gach atosú)               | Saor in aisce                    | Dada — suiteálann sé `cloudflared` go huathoibríoch         |
| **ngrok**                   | Cobhsaí fad atá plean íoctha nó fearann seasta cumraithe | Sraith saor in aisce + íoctha    | Teastaíonn cuntas ngrok + authtoken                         |
| **Tailscale Funnel**        | Cobhsaí in aghaidh an nóid laistigh de do tailnet        | Saor in aisce d'úsáid phearsanta | Teastaíonn suiteáil Tailscale + logáil isteach + ACL Funnel |

Tá na feidhmiúcháin le fáil in `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, agus `src/lib/tailscaleTunnel.ts`. Filleann an triúr acu
oibiacht `status` ar aon chruth amháin ina bhfuil na réimsí `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl`, agus `lastError`, ionas gur féidir leis an deais iad a léiriú ar an gcaoi chéanna.

## 1. Tollán Cloudflare (Tollán Tapa + Tollán Ainmnithe)

Ritheann `src/lib/cloudflaredTunnel.ts` `cloudflared` mar mhacphróiseas. Tacaíonn sé le
dhá mhód, a roghnaítear de réir an gcuirtear cumraíocht tolláin ainmnithe ar fáil:

- **Tollán tapa (réamhshocrú).** Ritheann sé `cloudflared tunnel --url
http://localhost:<apiPort>` agus parsálann sé an URL sannta `*.trycloudflare.com`
  ón aschur caighdeánach. Tá na URLanna sealadach agus athraíonn siad le gach atosú.
- **Tollán ainmnithe (rogha roghnach).** Nuair a dhíríonn `CLOUDFLARED_CONFIG` ar
  `config.yml` cloudflared a bhainistítear go háitiúil, ritheann OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run`, rud a thugann **óstainm cobhsaí ainmnithe** duit. Soláthraíonn an chumraíocht
  UUID an tolláin, `credentials-file`, agus ródú `ingress`, mar sin ní chuirtear
  `--url` ar aghaidh agus ní theastaíonn aon chomhartha deaise Zero Trust. Léann `run`
  dintiúir ó chonair absalóideach `credentials-file` na cumraíochta — ní theastaíonn `cert.pem`
  (ní úsáidtear é sin ach amháin chun saolré an tolláin a bhainistiú).

Príomhiompraíochtaí:

- **Uathshuiteáil.** Ar an gcéad úsáid, íoslódálann OmniRoute an dénártha `cloudflared`
  is déanaí ó eisiúintí oifigiúla GitHub (tá an tsuiteáil bhainistithe faoi
  `DATA_DIR/cloudflared/`). Fíoraítear SHA256 na sócmhainne íoslódáilte i gcoinne
  léiriú na heisiúna sula ritear í.
- **Maoirseacht próisis.** Coinnítear PID cloudflared agus an URL réitithe in
  `quick-tunnel-state.json` ionas gur féidir leis an deais an stádas a atosú thar athlódálacha.

### Socrú tolláin ainmnithe (óstainm cobhsaí)

1. Cruthaigh tollán a bhainistítear go háitiúil leis an CLI cloudflared (uair amháin):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Scríobh `~/.cloudflared/config.yml` a ródálann d'óstainm chuig port API áitiúil
   OmniRoute (20128 de réir réamhshocraithe):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Dírigh OmniRoute ar an gcumraíocht agus (atosaigh) an tollán:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # roghnach — sáraíonn sé an t-óstainm a thuairiscíonn OmniRoute; seachas sin léitear é ó
   # chéad riail ingress na cumraíochta:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Cumasaigh an tollán ar an mbealach céanna le tollán tapa (REST / deais / CLI
   thíos). Ní astaíonn tollán ainmnithe aon URL poiblí le baint, mar sin braitear
   ullmhacht ó nasc imeallach cláraithe cloudflared, agus tuairiscítear `publicUrl`/`apiUrl`
   ó `CLOUDFLARED_HOSTNAME` (nó ó chéad óstainm ingress na cumraíochta).

### Cumasaigh / díchumasaigh trí REST

Úsáideann an críochphointe corp `{action: "enable" | "disable"}`, seachas conairí
`start`/`stop` ar leith. Teastaíonn fíordheimhniú bainistíochta (seisiún riarthóra nó eochair API riarthóra).

```bash
# Cumasaigh
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Stádas
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Díchumasaigh
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Nó tríd an deais: **Socruithe → Tolláin → Cloudflare**.

### Athróga timpeallachta roghnacha

| Athróg                                               | Cuspóir                                                                                                                                                                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Sáraíonn sé conair an chomhaid dhénártha. Má tá sé socraithe agus bailí, úsáideann OmniRoute é seachas é a íoslódáil.                                                                                          |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Prótacal iompair (`http2` de réir réamhshocraithe; `quic` agus `auto` freisin).                                                                                                                                |
| `CLOUDFLARED_CONFIG`                                 | Conair chuig `config.yml` de chuid cloudflared a bhainistítear go háitiúil. Nuair a bhíonn sé socraithe, ritheann OmniRoute tollán **ainmnithe/seasmhach** (`tunnel --config <path> run`) seachas tollán tapa. |
| `CLOUDFLARED_HOSTNAME`                               | Sáraíonn sé óstainm poiblí tuairiscithe an tolláin ainmnithe (m.sh. `ai.example.com`). Nuair nach mbíonn sé socraithe, léitear é ón gcéad óstainm `ingress` sa chumraíocht.                                    |

## 2. ngrok

Úsáideann `src/lib/ngrokTunnel.ts` an **SDK `@ngrok/ngrok`** (sa phróiseas, gan aon fhophróiseas CLI). Iompórtáiltear an modúl dúchasach go mall ar an gcéad tosú ionas nach gcliseann an aip ag am tosaithe ar ardáin nach bhfuil dénártha réamhthógtha acu.

### Réamhriachtanais

1. Cláraigh ag <https://ngrok.com>.
2. Cóipeáil d’uathchomhartha ó dheais ngrok.
3. Cuir ar fáil é trí cheann amháin díobh seo:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, nó
   - Deais: **Socruithe → Tolláin → ngrok**, nó
   - Corp REST (aonuaire): `{"action":"enable","authToken":"<token>"}`.

Mura bhfuil ceachtar acu cumraithe, filleann an stádas `phase: "needs_auth"`.

### Cumasaigh / díchumasaigh trí REST

```bash
# Cumasaigh (úsáideann sé NGROK_AUTHTOKEN ón timpeallacht)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Cumasaigh le comhartha inlíne
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Stádas
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Díchumasaigh
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Áirítear sa fhreagra an `publicUrl` sannta (m.sh.
`https://abcd-1234.ngrok-free.app`). Ní mór fearainn shaincheaptha, réigiúin agus rialacha beartais a chumrú i ndeais ngrok — ní dhéanann OmniRoute féin ach URL na sprice áitiúla a chur ar aghaidh chuig an SDK.

## 3. Tailscale Funnel

Déanann `src/lib/tailscaleTunnel.ts` CLI córais `tailscale` a chomhordú chun port áitiúil an API a nochtadh trí **Funnel** (éalú poiblí-idirlín Tailscale le haghaidh freastal). Tacaíonn sé leis an saolré iomlán: suiteáil, logáil isteach, tosú an deamhain, cumasú agus díchumasú.

Glaonn an cur chun feidhme ar `tailscale funnel --bg <port>` (mód cúlra). Bíonn an cruth `https://<machine>.<tailnet>.ts.net/` ar an URL poiblí.

### Réamhriachtanais

1. Suiteáil Tailscale (nó lig do OmniRoute é a dhéanamh — féach an críochphointe `install` thíos).
2. Logáil isteach (`tailscale login` nó trí chríochphointe `login` OmniRoute).
3. Cumasaigh Funnel do do tailnet i gconsól riaracháin Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Ar Linux agus macOS, teastaíonn `sudo` ón deamhan (`tailscaled`) chun é a rialú. Glacann na críochphointí POST le réimse roghnach `sudoPassword`, a chuirtear ar aghaidh chuig taisce pasfhocail MITM OmniRoute (`getCachedPassword` / `setCachedPassword`) ar feadh ré an ghlao. Úsáideann Windows suiteáil réamhshocraithe na seirbhíse ag `C:\Program Files\Tailscale\tailscale.exe`.

### Críochphointí REST

Tá dromchla níos saibhre ag Tailscale ná mar atá ag na hinnill eile toisc gur ábhair ar leith iad an tsuiteáil, an logáil isteach, an deamhan agus an tollán.

| Críochphointe                         | Modh   | Cuspóir                                                                                     |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Stádas comhiomlán an tolláin (`phase`, `tunnelUrl`, `apiUrl`, srl.)                         |
| `/api/tunnels/tailscale/check`        | `GET`  | Seiceáil ar leibhéal níos ísle: suiteáilte? logáilte isteach? deamhan ag rith?              |
| `/api/tunnels/tailscale/install`      | `POST` | Suiteáil Tailscale (teagmhais dul chun cinn sruthaithe le SSE) — Linux/macOS                |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Tosaigh `tailscaled` ar Linux/macOS                                                         |
| `/api/tunnels/tailscale/login`        | `POST` | Cuir tús leis an sreabhadh logála isteach; filleann sé `authUrl` lena oscailt i mbrabhsálaí |
| `/api/tunnels/tailscale/enable`       | `POST` | Tosaigh Funnel do phort an API                                                              |
| `/api/tunnels/tailscale/disable`      | `POST` | Stop Funnel                                                                                 |

Teastaíonn fíordheimhniú bainistíochta ó gach críochphointe Tailscale (féach `routeUtils.ts ::
requireTailscaleAuth`).

Sampla cumasaithe:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Mura bhfuil Funnel cumasaithe sa chonsól riaracháin, áirítear sa fhreagra `funnelNotEnabled: true` chomh maith le `enableUrl` lena oscailt i mbrabhsálaí.

### Athróga timpeallachta roghnacha

| Athróg          | Cuspóir                                  |
| --------------- | ---------------------------------------- |
| `TAILSCALE_BIN` | Sáraigh cosán an dénárthaigh `tailscale` |

## Achoimre ar na críochphointí

| Críochphointe                         | Modh   | Corp                                | Fíordheimhniú |
| ------------------------------------- | ------ | ----------------------------------- | ------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | bainistíocht  |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | bainistíocht  |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | bainistíocht  |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | bainistíocht  |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | bainistíocht  |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | bainistíocht  |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | bainistíocht  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | bainistíocht  |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | bainistíocht  |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | bainistíocht  |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | bainistíocht  |

Níl aon chríochphointe lárnach `/api/settings/tunnels` ann — tá gach inneall
neamhspleách.

## Breithnithe maidir le haisghlaonna OAuth

Nuair a nochtann tú OmniRoute trí thollán, ní mór don deais agus do shreafaí OAuth
URLanna aisghlao a chruthú bunaithe ar an óstainm **poiblí**, seachas `localhost`. Murach sin,
atreoraíonn an soláthraí OAuth an t-úsáideoir ar ais chuig URL nach féidir lena fhreastalaithe a rochtain,
agus teipeann ar an gcroitheadh láimhe.

Ní gá óstainm an tolláin a fheannadh in
`NEXT_PUBLIC_BASE_URL` le haghaidh athruithe ar an deais ná sábhálacha socruithe. Seolann an deais fhíordheimhnithe
iarratais neamhshábháilte den bhunús céanna le comhartha CSRF atá ceangailte leis an seisiún, mar sin is féidir
óstainmneacha sealadacha Cloudflare Quick Tunnel a úsáid fós le haghaidh ghnáthbhainistiú an chomhéadain úsáideora tar éis logáil isteach.

Socraigh:

```bash
NEXT_PUBLIC_BASE_URL=https://<d'óstach-tolláin>
```

agus atosaigh OmniRoute sula gcuireann tú OAuth ar bun. I gcás Cloudflare Quick
Tunnels sealadacha, athraíonn an URL tar éis gach atosaithe, mar sin b’fhearr ngrok le fearann
forchoimeádta nó Tailscale Funnel a úsáid le haghaidh OAuth táirgthe.

## Sláinte agus monatóireacht

Taispeánann an deais staid an tolláin faoi **Socruithe → Tolláin**:

- An t-inneall/na hinnill ghníomhacha agus an `phase` reatha (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- An URL poiblí reatha agus an URL API díorthaithe (`<publicUrl>/v1`).
- An sprioc-URL áitiúil a bhfuil an tollán á chur ar aghaidh chuige.
- An teachtaireacht earráide is déanaí, más ann di.

Le haghaidh monatóireacht ríomhchláraithe, déan na críochphointí `GET` in aghaidh an innill a pholláil. Ceadaítear níos mó
ná inneall amháin a rith ag an am céanna; rianóidh OmniRoute gach ceann acu
go neamhspleách.

## Fabhtcheartú

### "níor aimsíodh an dénártha cloudflared"

Déanann OmniRoute iarracht é a uathshuiteáil ar an gcéad úsáid. Má chuirtear bac ar an tsuiteáil
(líonra srianta, gan rochtain ar GitHub), íoslódáil `cloudflared` de láimh ó
<https://github.com/cloudflare/cloudflared/releases> agus socraigh
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken de dhíth"

Ciallaíonn `phase: "needs_auth"` nár aimsíodh aon authtoken. Socraigh `NGROK_AUTHTOKEN` in
`.env`, cumraigh é tríd an deais, nó cuir `authToken` ar aghaidh i gcorp an iarratais POST
cumasúcháin.

### "tailscale: níl funnel cumasaithe"

Nuair a chuimsíonn an freagra cumasúcháin `funnelNotEnabled: true`, tá Funnel díchumasaithe
do do tailnet. Oscail an `enableUrl` a cuireadh ar ais (nó leathanach na gné i gconsól an riarthóra)
agus cuir Funnel ar siúl.

### Briseann athruithe ar URL an tolláin OAuth

Úsáid ngrok le fearann forchoimeádta nó Tailscale Funnel (tá an dá cheann cobhsaí in aghaidh an nóid).
Tá Cloudflare Quick Tunnels sealadach de réir dearaidh agus ní mholtar iad le haghaidh
aisghlaonna OAuth fadtéarmacha.

### Cead diúltaithe ar Linux/macOS le haghaidh Tailscale

Teastaíonn pribhléidí fréimhe ó `tailscaled`. Cuir `sudoPassword` ar fáil don chríochphointe POST ábhartha,
nó rith an deamhan tú féin (`sudo systemctl start tailscaled`).

## Féach freisin

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — seachfhreastalaí amach (1proxy, SOCKS5, HTTP) le haghaidh
  tráchta amach.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — liosta iomlán na n-athróg timpeallachta, lena n-áirítear
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — roghanna eile seachas tollánú le haghaidh óstáil phoiblí
  chobhsaí.
- Foinse: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
