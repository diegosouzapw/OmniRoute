# Management Authentication (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

Ang OmniRoute ay may **apat na pamilya ng kredensyal** na maaaring magbigay pahintulot sa mga ruta ng pamamahala.
Hindi sila mapagpapalit. Ang mga Inference API key (`sk-…`) ay **hindi** namamahala sa
server maliban kung sila ay tahasang binigyan ng `manage` o `admin` scope.

Kanonyang implementasyon: `src/lib/api/requireManagementAuth.ts`.

| Kredensyal                 | Karaniwang anyo                            | Nilikha saan                                          | Nilalayon na gamit              | Kakayahan sa pamamahala                                                                                       |
| -------------------------- | ------------------------------------------ | ----------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Sesyon ng Dashboard JWT    | `auth_token` cookie                        | Pag-login sa Dashboard                                | UI ng Browser                   | Buong pamamahala ng dashboard, napapailalim sa CSRF, lokalidad, at mga panuntunan ng laging-protektadong-ruta |
| Token ng machine-id ng CLI | panloob / lokal                            | CLI bootstrap (`omniroute` sa parehong makina)        | Lokal na CLI                    | Pamamahala lamang sa lokal                                                                                    |
| Scoped Access Token        | `oma_live_…`                               | **Mga Setting → Access Tokens** o `omniroute connect` | Remote CLI at API ng pamamahala | Dapat matugunan ang kinakailangang `read`, `write`, o `admin` scope ng ruta                                   |
| Inference API key          | `sk-…` (at iba pang mga prefix ng API-key) | **API Manager / API Keys**                            | `/v1/*` inference               | **Wala** maliban kung ang metadata ng key ay naglalaman ng `manage` o `admin`                                 |

Ang mga kredensyal ng `oma_` ay mga kredensyal ng pamamahala/CLI. Sila ay **hindi** mga inference API key.

Kung ang pag-login/API-key auth ay hindi pinagana para sa server, ang ilang ruta ng pamamahala ay maaaring
tumanggap ng mga tawag na hindi napatunayan. Ang mga ruta na lokal lamang at laging protektado ay nagpapatupad pa rin
ng kanilang sariling mga panuntunan. Ang pagpapakita ng isa sa mga kredensyal na ito ay samakatuwid ay hindi unibersal na
sapilitan, at ang pagkakaroon ng isa ay hindi unibersal na sapat nang walang kinakailangang scope at lokalidad ng ruta.

Kaugnay: [Remote Mode](./REMOTE-MODE.md) (kung paano nililikha ang `oma_live_…` para sa isang remote CLI).

---

## Mga matris ng saklaw

Ang mga saklaw ng pamamahala ng API-key at mga saklaw ng access-token ay magkaibang bokabularyo. Ang mga saklaw ng tool ng MCP ay isang ikatlong bokabularyo, na sinusuri gamit ang `scopeMatches` sa halip na alinman sa mga function sa mga talahanayan sa ibaba. Magkatabi:
[Tatlong namespace ng saklaw](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Mga saklaw ng Access Token (`oma_live_…`)

| Saklaw  | Karaniwang operasyon                                                      |
| ------- | ------------------------------------------------------------------------- |
| `read`  | Mga GET ng listahan/status na pinapayagan ng token na makita              |
| `write` | Mga mutasyon (paglikha/pag-update/pagtanggal) na mas mababa sa admin      |
| `admin` | Buong remote CLI / connect token (mga default ng password bootstrap dito) |

Ang isang token na may `read` ay hindi maaaring tumawag sa isang `write` na ruta. Hugis ng mensahe sa runtime:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Mga saklaw ng pamamahala ng API-key

| Saklaw   | Kahulugan                                                                       |
| -------- | ------------------------------------------------------------------------------- |
| (wala)   | Pagtukoy lamang. Ang mga ruta ng pamamahala ay nagbabalik ng 403.               |
| `manage` | Management API (parehong gate gaya ng `requireManagementAuth` API-key branch)   |
| `admin`  | Nasisiyahan din ang `hasManageScope` (itinuturing na may kakayahang pamahalaan) |

Paganahin ang `manage` sa key sa API Keys / API Manager UI. Huwag muling gamitin ang isang chat client key para sa automation maliban kung sadyang ibinigay mo ang saklaw na iyon.

---

## Paano gumawa at mag-revoke

### Dashboard JWT session

1. Buksan ang `/login`, mag-sign in gamit ang password sa pamamahala (`INITIAL_PASSWORD` sa unang pag-boot).
2. HttpOnly ang cookie na `auth_token`. Awtomatiko itong ginagamit ng browser dashboard.
3. Mag-log out sa pamamagitan ng `/api/auth/logout`. Walang pangmatagalang secret na kokopyahin.

### CLI machine-id token

1. Patakbuhin ang `omniroute` sa **parehong host** ng server (loopback).
2. Nagbo-bootstrap ang CLI ng machine-id token sa ilalim ng `~/.omniroute/` (chmod 600).
3. **Hindi** ito gumagana mula sa ibang machine. Gumamit ng Access Token para sa remote CLI.

### Scoped Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → gumawa (pangalan + scope). **Isang beses lamang ipinapakita ang secret.**
2. O sa CLI: `omniroute connect <host>` (password → token). Tingnan ang [Remote Mode](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. I-revoke mula sa parehong pahina ng Access Tokens (o i-delete ang CLI context).
5. Hash lamang ang iniimbak ng server. Ituring ang plaintext na tulad ng isang password.

### API key na may manage scope

1. Dashboard: **API Manager / API Keys** → gumawa o mag-edit ng key → i-enable ang `manage` (o `admin`).
2. Header: `Authorization: Bearer sk-…` (ang aktuwal na prefix ng key).
3. I-revoke o alisin ang `manage` sa parehong UI.
4. Para sa least privilege sa automation na hindi CLI: mas mainam ang `read` Access Token para sa mga trabahong GET-only; gamitin lamang ang `manage` sa isang API key kapag kailangan ding makipag-ugnayan ng tumatawag sa `/v1` at sa management.

---

## Format ng header

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Huwag ilagay ang mga kredensyal sa pamamahala sa path ng URL o query string. Sa
header/cookie lamang dapat ilagay ang awtentikasyon sa pamamahala.

---

## Mga halimbawang maaaring kopyahin at i-paste

Read-only (ilista ang mga provider). Gumamit ng `read` Access Token:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Pagbabago (gumawa ng koneksyon sa provider). Gumamit ng `write`/`admin` Access Token o
API key na may saklaw na `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inference (hindi pamamahala). Karaniwang API key, hindi kailangan ang `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Mga kasalukuyang error sa runtime (huwag i-echo ang mga sikreto)

| Sitwasyon                                                | Karaniwang status | Mensahe (nilinis)                                                                |
| :------------------------------------------------------- | :---------------- | :------------------------------------------------------------------------------- |
| Walang kredensyal                                        | 401               | `Kinakailangan ang pagpapatunay`                                                 |
| Di-wasto/nag-expire na `oma_live_…`                      | 401               | `Di-wasto o nag-expire na access token`                                          |
| Wastong API key na walang `manage`/`admin`               | 403               | `Kulang ang 'manage' scope ng API key. Paganahin ito sa dashboard ng API Keys.`  |
| Di-wastong ordinaryong API key sa isang management route | 403               | `Di-wastong management token`                                                    |
| Masyadong mababa ang saklaw ng Access Token              | 403               | `Hindi sapat ang saklaw ng access token na '<have>'; kinakailangan ang '<need>'` |

Ang "Di-wastong management token" ay nangangahulugang ang bearer ay **hindi** tinanggap bilang isang kredensyal sa pamamahala. Hindi nito sinasabi sa iyo kung aling pamilya ang gagawin. Gamitin ang talahanayan sa itaas: ang mga inference key ay nangangailangan ng `manage` scope; ang remote CLI ay nangangailangan ng `oma_live_…`; ginagamit ng dashboard ang session cookie.

---

## Iminumungkahing pagpipilian ng pinakamababang pribilehiyo

| Tumatawag                                                 | Gamit                                                  |
| :-------------------------------------------------------- | :----------------------------------------------------- |
| Browser                                                   | Sesyon ng Dashboard                                    |
| CLI sa host ng server                                     | Token ng makina                                        |
| CLI sa laptop na nakikipag-ugnayan sa isang remote server | `oma_live_…` mula sa `omniroute connect`               |
| CI / scripts (pamamahala lamang)                          | `oma_live_…` na may pinakamaliit na saklaw na gumagana |
| CI na dapat tumawag sa parehong `/v1` at `/api`           | API key na may `manage` **o** dalawang kredensyal      |
