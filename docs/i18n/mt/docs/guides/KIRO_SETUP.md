# Kiro Setup Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Din il-gwida tkopri kif iżżid kontijiet ta’ Kiro (assistent tal-ipprogrammar bl-IA ospitat minn AWS) ma’ OmniRoute,
b’enfasi fuq it-tħaddim ta’ diversi kontijiet fl-istess ħin mingħajr kunflitti bejn is-sessjonijiet.

---

## Sfond: Għaliex il-Kontijiet ta’ Kiro Jistgħu Jikkonfliġġu

Il-backend ta’ Kiro juża r-reġistrazzjonijiet tal-klijenti AWS SSO OIDC biex isegwi s-sessjonijiet attivi.
Ir-restrizzjoni kritika hija li: **kull reġistrazzjoni ta’ klijent OIDC tappoġġja sessjoni attiva
waħda biss kull darba**. Meta apparat jew utent ieħor jawtentika ruħu bl-istess
klijent irreġistrat, il-backend jinvalida t-token ta’ aġġornament tal-ewwel kont.

Dan huwa l-istess mekkaniżmu li jikkawża problemi meta tħaddem `kiro-cli login` fuq
magna fejn diġà hemm kont ieħor ta’ Kiro illoggjat — il-login il-ġdid jirrevoka t-token
tal-ewwel kont.

---

## Kif OmniRoute Jsolvi Dan (v3.8.0+)

Minn v3.8.0 ’il quddiem, OmniRoute jsejjaħ `registerClient()` (AWS SSO OIDC) matul kull
importazzjoni ta’ konnessjoni ta’ Kiro. Dan jagħti lil kull konnessjoni ta’ OmniRoute
reġistrazzjoni ddedikata tagħha stess ta’ klijent OIDC. Minħabba li kull reġistrazzjoni
ta’ klijent hija indipendenti, l-aġġornament jew l-awtentikazzjoni mill-ġdid ta’ kont
wieħed ma jaffettwawx it-token ta’ aġġornament ta’ xi kont ieħor.

L-iżolament japplika għall-metodi ta’ importazzjoni permezz ta’ token ta’ aġġornament,
filwaqt li l-awtentikazzjoni b’API key tevita għalkollox is-sessjonijiet ta’ aġġornament OIDC:

| Metodu ta’ importazzjoni                                     | Status tal-iżolament                                                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Fluss tal-kodiċi tal-apparat AWS Builder ID / IDC            | Iżolat minn meta ġie introdott il-fluss tal-kodiċi tal-apparat                                                |
| **Import Token** (twaħħil manwali tat-token ta’ aġġornament) | Iżolat minn v3.8.0                                                                                            |
| **Login soċjali b’Google / GitHub**                          | Iżolat minn v3.8.0                                                                                            |
| **Auto-Import** (SQLite ta’ kiro-cli)                        | Iżolat minn v3.8.0 (il-perkors SQLite kien diġà iżolat; l-alternattiva tal-cache SSO issa hija iżolata wkoll) |
| **API Key** (ċavetta CodeWhisperer b’tul ta’ ħajja twil)     | L-ebda sessjoni ta’ aġġornament; iċ-ċavetta tiġi vvalidata u maħżuna bħala kredenzjali bearer                 |

---

## Nota dwar il-Migrazzjoni għal Konnessjonijiet Maħluqa Qabel v3.8.0

Il-konnessjonijiet importati qabel v3.8.0 ma għandhomx reġistrazzjoni ddedikata ta’ klijent OIDC
maħżuna f’`providerSpecificData`. Dawn il-konnessjonijiet jibqgħu jaħdmu, iżda jużaw l-endpoint
kondiviż ta’ aġġornament għall-awtentikazzjoni soċjali, li jfisser li żewġ konnessjonijiet bħal dawn
xorta jistgħu jinvalidaw lil xulxin.

**Biex tikseb l-iżolament:** ħassar il-konnessjoni l-qadima minn **Dashboard → Providers** u
erġa’ importaha billi tuża kwalunkwe wieħed mill-flussi ta’ importazzjoni appoġġjati. Il-konnessjonijiet
kollha maħluqa mill-ġdid jirċievu awtomatikament ir-reġistrazzjoni tagħhom stess ta’ klijent.

---

## Kif Iżżid Żewġ Kontijiet ta’ Kiro Maġenb Xulxin

### Prerekwiżiti

- OmniRoute v3.8.0 jew aktar riċenti.
- Kont ta’ Kiro li jaħdem (email + password, jew login b’Google jew GitHub).
- B’mod fakultattiv, kont ieħor ta’ Kiro.

### Pass 1: Importa l-ewwel kont

1. Iftaħ **Dashboard → Providers → Add Provider → Kiro**.
2. Agħżel waħda minn dawn:
   - **Import Token** — waħħal token ta’ aġġornament li jibda b’`aorAAAAAG`.
   - **API Key** — waħħal API key ta’ Kiro / CodeWhisperer b’tul ta’ ħajja twil.
   - **Login b’Google / GitHub** — lesti l-fluss OAuth fil-brawżer.
   - **Auto-Import** — ikklikkja l-buttuna; OmniRoute jaqra l-kredenzjali mid-database
     lokali ta’ kiro-cli jew minn `~/.aws/sso/cache`.
3. Il-konnessjoni tiġi ssejvjata. Il-flussi bit-token ta’ aġġornament jirreġistraw
   awtomatikament klijent OIDC iddedikat. Il-flussi b’API key jivvalidaw iċ-ċavetta
   ma’ AWS u ma jaħżnux token ta’ aġġornament.

### Pass 2: Importa t-tieni kont

Irrepeti l-pass 1 għat-tieni kont. Minħabba li kull importazzjoni toħloq reġistrazzjoni
separata ta’ klijent OIDC, iż-żewġ konnessjonijiet ikunu kompletament iżolati.

### Pass 3: Ivverifika li ż-żewġ konnessjonijiet huma attivi

1. **Dashboard → Providers** — iż-żewġ konnessjonijiet ta’ Kiro għandhom juru l-istatus **Active**.
2. **Dashboard → Health** — iż-żewġ konnessjonijiet għandhom jgħaddu mill-kontroll tas-saħħa tat-token tagħhom.

### Pass 4: Uża combo biex tidderieġi bejn il-kontijiet

Oħloq combo biż-żewġ konnessjonijiet bħala miri sabiex tqassam it-tagħbija jew taqleb għal waħda minnhom jekk l-oħra ma taħdimx:

```
kiro/kiro-dev → kiro/kiro-pro
```

Ara [FEATURES.md](./FEATURES.md) u d-dokumentazzjoni tar-routing għall-konfigurazzjoni tal-combo.

---

## Utenti Enterprise / IDC

Għall-kontijiet tal-AWS IAM Identity Center (IDC), uża l-fluss tal-**kodiċi tal-apparat ta’ AWS Builder ID / IDC**
minn **Dashboard → Fornituri → Kiro → Kodiċi tal-Apparat**. Il-fluss tal-kodiċi tal-apparat
dejjem kien iżolat kompletament. Għal dawn il-konnessjonijiet mhu meħtieġ l-ebda importazzjoni mill-ġdid.

L-utenti enterprise li joperaw f’reġjun AWS mhux predefinit jistgħu jispeċifikaw ir-reġjun meta
jimportaw permezz tal-Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Meta jitħalla barra, il-field `region` jieħu `us-east-1` bħala valur predefinit.

---

## Fluss tal-Importazzjoni b’API Key

L-awtentikazzjoni b’API key hija għal kredenzjali bearer fit-tul ta’ Kiro / AWS CodeWhisperer. Din
ma tużax it-tiġdid ta’ OAuth, u għalhekk tevita l-invalidazzjoni ta’ sessjonijiet OIDC kondiviżi.

### Dashboard

1. Iftaħ **Dashboard -> Fornituri -> Kiro**.
2. Agħżel **API Key**.
3. Waħħal l-API key u, jekk tixtieq, ir-reġjun AWS (`us-east-1` bħala valur predefinit).
4. OmniRoute jivvalida l-key u jsalva l-konnessjoni.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Kuntratt Intern

Ir-route tal-API jivvalida l-key billi jsejjaħ `KiroService.validateApiKey()`, li
juża `ListAvailableProfiles` mal-endpoint ta’ CodeWhisperer/Amazon Q li jaqbel mar-reġjun
u jiddetermina `profileArn`.

Il-konnessjoni ssejvjata tuża:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Waqt l-eżekuzzjoni, `KiroExecutor.buildHeaders()` jibgħat il-key bħala
`Authorization: Bearer <key>` u jżid `tokentype: API_KEY`. Is-sejħiet għall-kwota/profil
jużaw l-istess indikatur sabiex AWS jittratta l-bearer bħala API key fit-tul minflok
bħala token ta’ aċċess OIDC jew soċjali.

---

## Skadenza tal-Klijent OIDC

Il-klijenti pubbliċi tal-AWS SSO OIDC tipikament jiskadu wara 90 jum
(`clientSecretExpiresAt`). OmniRoute jaħżen dan it-timestamp f’`providerSpecificData`
għall-osservabbiltà. Jekk konnessjoni tieqaf tiġġedded wara madwar 90 jum, erġa’ importa
l-konnessjoni sabiex tikseb reġistrazzjoni ġdida tal-klijent OIDC. Ir-reġistrazzjoni mill-ġdid
awtomatika mal-iskadenza hija ppjanata bħala titjib futur.

Il-konnessjonijiet b’API key ma għandhomx skadenza tal-klijent OIDC għaliex ma jiġġeddux
permezz tal-AWS SSO OIDC.

---

## Soluzzjoni tal-Problemi

### It-tieni kont jibqa’ jiġi skonnettjat

- Iċċekkja ż-żewġ konnessjonijiet f’**Dashboard → Fornituri** u kkonferma li kull waħda turi
  `clientId` mhux null fil-JSON mhux ipproċessat tagħha (viżibbli permezz tal-ikona tal-informazzjoni).
  Jekk xi waħda mill-konnessjonijiet ma jkollhiex `clientId`, tkun ġiet importata qabel v3.8.0 — erġa’ importaha.

### L-importazzjoni tfalli bi "Il-validazzjoni tat-token falliet"

- Kun żgur li r-refresh token jibda b’`aorAAAAAG`.
- Kun żgur li OmniRoute jista’ jaċċessa `https://oidc.us-east-1.amazonaws.com` (jew ir-reġjun
  ikkonfigurat). Jekk tinsab wara proxy korporattiv, issettja proxy fil-livell tal-fornitur f’
  **Dashboard → Settings → Proxies**.

### L-importazzjoni b’API key tfalli

- Ikkonferma li l-key hija API key ta’ Kiro / CodeWhisperer, mhux refresh token.
- Ikkonferma li r-reġjun AWS jaqbel mal-key/kont. `us-east-1` huwa l-valur predefinit.
- Il-key trid tkun tista’ ssejjaħ `ListAvailableProfiles`; inkella OmniRoute ma jistax
  jiddetermina l-`profileArn` meħtieġ.

Għal problemi oħra, ara l-[TROUBLESHOOTING.md](./TROUBLESHOOTING.md) prinċipali.
