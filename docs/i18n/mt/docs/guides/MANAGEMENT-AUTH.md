# Management Authentication (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute għandu **erba' familji ta' kredenzjali** li jistgħu jawtorizzaw ir-rotot ta' ġestjoni.
Dawn ma jistgħux jintużaw minflok xulxin. Iċ-ċwievet tal-API għall-inferenza (`sk-…`) **ma**
jiġġestixxux is-server sakemm ma jkunux ingħataw espliċitament l-ambitu `manage` jew `admin`.

Implimentazzjoni kanonika: `src/lib/api/requireManagementAuth.ts`.

| Kredenzjali                     | Forma tipika                                 | Fejn jinħolqu                                              | Użu maħsub                   | Kapaċità ta' ġestjoni                                                                                  |
| ------------------------------- | -------------------------------------------- | ---------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| Sessjoni JWT tad-dashboard      | cookie `auth_token`                          | Login tad-dashboard                                        | UI tal-browser               | Ġestjoni sħiħa tad-dashboard, soġġetta għar-regoli tas-CSRF, tal-lokalità, u tar-rotot dejjem protetti |
| Token machine-id tas-CLI        | intern / lokali                              | Inizjalizzazzjoni tas-CLI (`omniroute` fuq l-istess magna) | CLI lokali                   | Ġestjoni lokali biss                                                                                   |
| Token ta' Aċċess b'Ambitu       | `oma_live_…`                                 | **Settings → Access Tokens** jew `omniroute connect`       | CLI remot u API ta' ġestjoni | Għandu jissodisfa l-ambitu `read`, `write`, jew `admin` meħtieġ mir-rotta                              |
| Ċavetta tal-API għall-inferenza | `sk-…` (u prefissi oħra taċ-ċwievet tal-API) | **API Manager / API Keys**                                 | Inferenza `/v1/*`            | **Ebda** sakemm il-metadata taċ-ċavetta ma tinkludix `manage` jew `admin`                              |

Il-kredenzjali `oma_` huma kredenzjali ta' ġestjoni/CLI. Dawn **mhumiex** ċwievet tal-API għall-inferenza.

Jekk l-awtentikazzjoni permezz tal-login/ċavetta tal-API tkun diżattivata għas-server, xi rotot ta'
ġestjoni jistgħu jaċċettaw sejħiet mhux awtentikati. Ir-rotot lokali biss u dawk dejjem protetti xorta
japplikaw ir-regoli tagħhom stess. Għalhekk, il-preżentazzjoni ta' waħda minn dawn il-kredenzjali mhijiex
dejjem obbligatorja, u l-pussess ta' waħda mhuwiex dejjem biżżejjed mingħajr l-ambitu u l-lokalità tar-rotta
meħtieġa.

Relatat: [Modalità Remota](./REMOTE-MODE.md) (kif jinħoloq `oma_live_…` għal CLI remot).

---

## Matriċijiet tal-ambiti

Dawn iż-żewġ vokabularji tal-ambiti huma **differenti**. Tħallathomx.

### Ambiti tat-Token ta' Aċċess (`oma_live_…`)

| Ambitu  | Operazzjonijiet tipiċi                                                                              |
| ------- | --------------------------------------------------------------------------------------------------- |
| `read`  | Talbiet GET għal listi/status li t-token huwa awtorizzat jara                                       |
| `write` | Bidliet (ħolqien/aġġornament/tħassir) taħt il-livell ta' amministratur                              |
| `admin` | CLI remot sħiħ / token ta' konnessjoni (l-inizjalizzazzjoni bil-password tuża dan b'mod awtomatiku) |

Token b'`read` ma jistax isejjaħ rotta `write`. Format tal-messaġġ waqt it-tħaddim:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Ambiti ta' ġestjoni taċ-ċwievet tal-API

| Ambitu   | Tifsira                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------- |
| (ebda)   | Inferenza biss. Ir-rotot ta' ġestjoni jirritornaw 403.                                            |
| `manage` | API ta' ġestjoni (l-istess kontroll bħall-fergħa taċ-ċavetta tal-API ta' `requireManagementAuth`) |
| `admin`  | Jissodisfa wkoll `hasManageScope` (jitqies li għandu kapaċità ta' ġestjoni)                       |

Attiva `manage` fuq iċ-ċavetta fl-UI ta' API Keys / API Manager. Terġax tuża
ċavetta ta' klijent taċ-chat għall-awtomatizzazzjoni sakemm ma tkunx tajtha dak l-ambitu apposta.

---

## Kif toħloq u tirrevoka

### Sessjoni JWT tad-dashboard

1. Iftaħ `/login`, u idħol bil-password tal-ġestjoni (`INITIAL_PASSWORD` fl-ewwel tħaddim).
2. Il-cookie `auth_token` hija HttpOnly. Id-dashboard fil-browser jużaha awtomatikament.
3. Oħroġ permezz ta' `/api/auth/logout`. M'hemm ebda sigriet fit-tul x'tikkopja.

### Token machine-id tas-CLI

1. Ħaddem `omniroute` fuq l-**istess host** bħas-server (loopback).
2. Is-CLI jinizjalizza token machine-id taħt `~/.omniroute/` (chmod 600).
3. Dan **ma** jaħdimx minn magna oħra. Uża Token ta' Aċċess għal CLI remot.

### Token ta' Aċċess b'Ambitu (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → oħloq (isem + ambitu). **Is-sigriet jintwera darba biss.**
2. Jew permezz tas-CLI: `omniroute connect <host>` (password → token). Ara [Modalità Remota](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Irrevokah mill-istess paġna ta' Access Tokens (jew ħassar il-kuntest tas-CLI).
5. Is-server jaħżen hash biss. Ittratta t-test sempliċi bħallikieku kien password.

### Ċavetta tal-API bl-ambitu manage

1. Dashboard: **API Manager / API Keys** → oħloq jew editja ċavetta → attiva `manage` (jew `admin`).
2. Header: `Authorization: Bearer sk-…` (il-prefiss reali taċ-ċavetta).
3. Irrevoka jew neħħi `manage` mill-istess UI.
4. Għall-inqas privileġġ fl-awtomatizzazzjoni li mhijiex is-CLI: agħżel Token ta' Aċċess `read` għal kompiti GET biss; uża `manage` fuq ċavetta tal-API biss meta min jagħmel is-sejħa jkollu bżonn ukoll jikkomunika ma' `/v1` u mal-ġestjoni.

---

## Format tal-header

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Tpoġġix kredenzjali ta’ ġestjoni fil-path tal-URL jew fil-query string. L-awtentikazzjoni tal-ġestjoni ssir biss permezz ta’ header/cookie.

---

## Eżempji biex tikkopja u twaħħal

Qari biss (elenka l-fornituri). Uża Access Token `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modifika (oħloq konnessjoni ma’ fornitur). Uża Access Token `write`/`admin` jew API key bi scope ta’ ġestjoni:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferenza (mhux ġestjoni). API key ordinarja, mingħajr il-ħtieġa ta’ `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Żbalji attwali waqt it-tħaddim (turix sigrieti)

| Sitwazzjoni                                       | Status tipiku | Messaġġ (sanitizzat)                                                 |
| ------------------------------------------------- | ------------- | -------------------------------------------------------------------- |
| Ebda kredenzjali                                  | 401           | `Authentication required`                                            |
| `oma_live_…` invalidu/skadut                      | 401           | `Invalid or expired access token`                                    |
| API key valida mingħajr `manage`/`admin`          | 403           | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| API key ordinarja invalida fuq rotta ta’ ġestjoni | 403           | `Invalid management token`                                           |
| Scope tal-Access Token baxx wisq                  | 403           | `Access token scope '<have>' is insufficient; '<need>' required.`    |

“Invalid management token” ifisser li l-bearer **ma ġiex** aċċettat bħala kredenzjali ta’ ġestjoni. Dan **ma jgħidlekx** liema familja għandek toħloq. Uża t-tabella ta’ hawn fuq: iċ-ċwievet tal-inferenza jeħtieġu l-scope `manage`; is-CLI remot jeħtieġ `oma_live_…`; id-dashboard juża l-cookie tas-sessjoni.

---

## Għażla rakkomandata bl-inqas privileġġi

| Min qed jagħmel it-talba                       | Uża                                         |
| ---------------------------------------------- | ------------------------------------------- |
| Browser                                        | Sessjoni tad-dashboard                      |
| CLI fuq il-host tas-server                     | Machine token                               |
| CLI fuq laptop li jikkomunika ma’ server remot | `oma_live_…` minn `omniroute connect`       |
| CI / scripts (ġestjoni biss)                   | `oma_live_…` bl-iżgħar scope li jaħdem      |
| CI li jrid isejjaħ kemm `/v1` kif ukoll `/api` | API key b’`manage` **jew** żewġ kredenzjali |
