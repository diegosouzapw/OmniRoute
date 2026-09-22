# Management Authentication (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

Ang OmniRoute ay may **apat na pamilya ng kredensyal** na maaaring mag-awtorisa sa mga management route.
Hindi maaaring gamitin ang mga ito nang pamalit sa isa't isa. Ang mga Inference API key (`sk-…`) ay **hindi** namamahala sa
server maliban kung tahasang binigyan ang mga ito ng `manage` o `admin` scope.

Kanonikal na implementasyon: `src/lib/api/requireManagementAuth.ts`.

| Kredensyal            | Karaniwang anyo                            | Saan ginagawa                                      | Nilalayong gamit             | Kakayahang mamahala                                                                                                      |
| --------------------- | ------------------------------------------ | -------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Dashboard JWT session | `auth_token` cookie                        | Pag-login sa dashboard                             | Browser UI                   | Ganap na pamamahala sa dashboard, napapailalim sa mga panuntunan ng CSRF, lokalidad, at mga route na palaging protektado |
| CLI machine-id token  | internal / local                           | CLI bootstrap (`omniroute` sa parehong machine)    | Lokal na CLI                 | Lokal na pamamahala lamang                                                                                               |
| Scoped Access Token   | `oma_live_…`                               | **Settings → Access Tokens** o `omniroute connect` | Remote CLI at management API | Dapat matugunan ang kinakailangang `read`, `write`, o `admin` scope ng route                                             |
| Inference API key     | `sk-…` (at iba pang mga prefix ng API key) | **API Manager / API Keys**                         | `/v1/*` inference            | **Wala** maliban kung kasama sa metadata ng key ang `manage` o `admin`                                                   |

Ang mga kredensyal na `oma_` ay mga kredensyal para sa pamamahala/CLI. **Hindi** mga inference API key ang mga ito.

Kung naka-disable ang login/API-key auth para sa server, maaaring tumanggap ang ilang management route ng
mga tawag na walang authentication. Nalalapat pa rin ang sariling mga panuntunan ng mga local-only at palaging protektadong route.
Samakatuwid, ang pagpapakita ng isa sa mga kredensyal na ito ay hindi palaging
sapilitan, at ang pagkakaroon ng isa ay hindi palaging sapat kung wala ang kinakailangang
scope at lokalidad ng route.

Kaugnay: [Remote Mode](./REMOTE-MODE.md) (kung paano ginagawa ang `oma_live_…` para sa isang remote CLI).

---

## Mga matrix ng scope

**Magkaiba** ang dalawang bokabularyo ng scope na ito. Huwag paghaluin ang mga ito.

### Mga scope ng Access Token (`oma_live_…`)

| Scope   | Karaniwang mga operasyon                                                                       |
| ------- | ---------------------------------------------------------------------------------------------- |
| `read`  | Mga GET para sa listahan/status na pinapayagang makita ng token                                |
| `write` | Mga pagbabago (paggawa/pag-update/pagtanggal) na mas mababa sa admin                           |
| `admin` | Ganap na remote CLI / connect token (ito ang default para sa pag-bootstrap gamit ang password) |

Hindi maaaring tumawag ang isang token na may `read` sa isang `write` route. Anyo ng runtime message:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Mga scope ng pamamahala ng API key

| Scope    | Kahulugan                                                                     |
| -------- | ----------------------------------------------------------------------------- |
| (wala)   | Inference lamang. Nagbabalik ng 403 ang mga management route.                 |
| `manage` | Management API (kaparehong gate ng API-key branch ng `requireManagementAuth`) |
| `admin`  | Natutugunan din ang `hasManageScope` (itinuturing na may kakayahang mamahala) |

I-enable ang `manage` sa key sa UI ng API Keys / API Manager. Huwag muling gamitin ang isang
chat client key para sa automation maliban kung sinadya mong ibigay ang scope na iyon.

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

## Mga kasalukuyang error sa runtime (huwag ilantad ang mga secret)

| Sitwasyon                                                  | Karaniwang status | Mensahe (na-sanitize)                                                |
| ---------------------------------------------------------- | ----------------- | -------------------------------------------------------------------- |
| Walang kredensyal                                          | 401               | `Authentication required`                                            |
| Invalid/expired na `oma_live_…`                            | 401               | `Invalid or expired access token`                                    |
| Valid na API key na walang `manage`/`admin`                | 403               | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Invalid na karaniwang API key sa isang route ng pamamahala | 403               | `Invalid management token`                                           |
| Masyadong mababa ang saklaw ng Access Token                | 403               | `Access token scope '<have>' is insufficient; '<need>' required.`    |

Ang "Invalid management token" ay nangangahulugang ang bearer ay **hindi** tinanggap bilang
kredensyal sa pamamahala. **Hindi** nito sinasabi kung aling uri ang dapat gawin. Gamitin ang talahanayan sa itaas:
kailangan ng mga inference key ang saklaw na `manage`; kailangan ng remote CLI ang `oma_live_…`; ginagamit ng dashboard
ang session cookie.

---

## Inirerekomendang pagpili ayon sa least-privilege

| Tumatawag                                            | Gamitin                                                |
| ---------------------------------------------------- | ------------------------------------------------------ |
| Browser                                              | Session ng dashboard                                   |
| CLI sa server host                                   | Machine token                                          |
| CLI sa laptop na nakikipag-ugnayan sa remote server  | `oma_live_…` mula sa `omniroute connect`               |
| CI / mga script (pamamahala lamang)                  | `oma_live_…` na may pinakamaliit na saklaw na gumagana |
| CI na kailangang tumawag sa parehong `/v1` at `/api` | API key na may `manage` **o** dalawang kredensyal      |
