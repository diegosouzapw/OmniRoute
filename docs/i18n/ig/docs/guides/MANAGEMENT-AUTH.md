# Management Authentication (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute nwere **ezinụlọ nzere anọ** nwere ike inye ikike iji ụzọ njikwa.
A pụghị iji otu dochie ibe ya. Igodo Inference API (`sk-…`) anaghị **ejikwa** sava ahụ
ọ gwụla ma e nyere ha scope `manage` ma ọ bụ `admin` n'ụzọ doro anya.

Mmejuputa iwu bụ isi: `src/lib/api/requireManagementAuth.ts`.

| Nzere                       | Ụdị a na-ahụkarị                     | Ebe e mepụtara ya                                        | Ojiji e zubere            | Ikike njikwa                                                                                     |
| --------------------------- | ------------------------------------ | -------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| Oge nnọkọ JWT nke Dashboard | kuki `auth_token`                    | Nbanye Dashboard                                         | UI ihe nchọgharị          | Njikwa dashboard zuru ezu, dabere na iwu CSRF, ọnọdụ mpaghara, na ụzọ ndị a na-echebe mgbe niile |
| Token machine-id nke CLI    | nke ime / mpaghara                   | Mbido CLI (`omniroute` n'otu kọmputa ahụ)                | CLI mpaghara              | Naanị njikwa mpaghara                                                                            |
| Access Token nwere scope    | `oma_live_…`                         | **Settings → Access Tokens** ma ọ bụ `omniroute connect` | CLI dị anya na API njikwa | Ga-emezurịrị scope `read`, `write`, ma ọ bụ `admin` nke ụzọ ahụ chọrọ                            |
| Igodo Inference API         | `sk-…` (na prefix igodo API ndị ọzọ) | **API Manager / API Keys**                               | inference `/v1/*`         | **Ọ dịghị** ọ gwụla ma metadata igodo ahụ nwere `manage` ma ọ bụ `admin`                         |

Nzere `oma_` bụ nzere njikwa/CLI. Ha abụghị **igodo Inference API**.

Ọ bụrụ na agbanyụrụ nyocha njirimara nbanye/igodo API maka sava ahụ, ụfọdụ ụzọ njikwa nwere ike
ịnakwere oku na-enweghị nyocha njirimara. Ụzọ ndị bụ naanị maka mpaghara na ndị a na-echebe mgbe niile ka na-etinye
iwu nke ha n'ọrụ. Ya mere, igosi otu n'ime nzere ndị a abụghị ihe a na-achọ mgbe niile
n'ọnọdụ niile, inwe otu n'ime ha adịghịkwa ezuru mgbe niile ma ọ bụrụ na enweghị
scope achọrọ na ọnọdụ mpaghara ụzọ ahụ.

Ihe metụtara ya: [Ụdị Dị Anya](./REMOTE-MODE.md) (otu esi emepụta `oma_live_…` maka CLI dị anya).

---

## Matriks scope

Okwu scope abụọ ndị a **dị iche**. Ejikọtala ha ọnụ.

### Scope nke Access Token (`oma_live_…`)

| Scope   | Ọrụ ndị a na-ahụkarị                                                                    |
| ------- | --------------------------------------------------------------------------------------- |
| `read`  | Ndepụta/ọnọdụ GET nke e kwere ka token ahụ hụ                                           |
| `write` | Mgbanwe (mepụta/melite/hichapụ) ndị na-erughị admin                                     |
| `admin` | CLI dị anya zuru ezu / token njikọ (mbido site na okwuntughe na-eji nke a dịka ndabara) |

Token nwere `read` enweghị ike ịkpọ ụzọ `write`. Ụdị ozi runtime:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Scope njikwa igodo API

| Scope     | Ihe ọ pụtara                                                                          |
| --------- | ------------------------------------------------------------------------------------- |
| (ọ dịghị) | Naanị inference. Ụzọ njikwa na-eweghachi 403.                                         |
| `manage`  | API njikwa (otu ọnụ ụzọ ikike ahụ alaka igodo API nke `requireManagementAuth` na-eji) |
| `admin`   | Na-emezukwa `hasManageScope` (a na-ewere ya dịka nke nwere ikike njikwa)              |

Gbanye `manage` na igodo ahụ n'ime UI API Keys / API Manager. Ejigharịla
igodo klayenti nkata maka akpaaka ọ gwụla ma i kpachaara anya nye ya scope ahụ.

---

## Otu esi emepụta ma kagbuo

### Oge nnọkọ JWT nke Dashboard

1. Mepee `/login`, jiri okwuntughe njikwa banye (`INITIAL_PASSWORD` na mbido mbụ).
2. Kuki `auth_token` bụ HttpOnly. Dashboard ihe nchọgharị na-eji ya na-akpaghị aka.
3. Si na `/api/auth/logout` pụọ. Enweghị nzuzo na-adịte aka a ga-edetuo.

### Token machine-id nke CLI

1. Gbaa `omniroute` na **otu host ahụ** sava ahụ dị na ya (loopback).
2. CLI na-amalite token machine-id n'okpuru `~/.omniroute/` (chmod 600).
3. Nke a anaghị arụ ọrụ site na kọmputa ọzọ. Jiri Access Token maka CLI dị anya.

### Access Token nwere scope (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → mepụta (aha + scope). **A na-egosi nzuzo ahụ naanị otu ugboro.**
2. Ma ọ bụ CLI: `omniroute connect <host>` (okwuntughe → token). Lee [Ụdị Dị Anya](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Kagbuo ya site n'otu ibe Access Tokens ahụ (ma ọ bụ hichapụ context CLI).
5. Sava na-echekwa naanị hash. Were plaintext ahụ dịka okwuntughe.

### Igodo API nwere scope manage

1. Dashboard: **API Manager / API Keys** → mepụta ma ọ bụ dezie igodo → gbanye `manage` (ma ọ bụ `admin`).
2. Header: `Authorization: Bearer sk-…` (prefix nke igodo ahụ n'ezie).
3. Kagbuo ya ma ọ bụ wepụ `manage` n'otu UI ahụ.
4. Maka ikike kacha nta n'akpaaka na-abụghị CLI: họrọ Access Token `read` maka ọrụ ndị bụ naanị GET; jiri `manage` n'igodo API naanị mgbe onye na-akpọ oku ga-ejikwa `/v1` na njikwa.

---

## Ọdịdị nkụnyeisi

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Etinyela nzere njikwa n'ụzọ URL ma ọ bụ n'ahịrị ajụjụ. Nyocha njirimara njikwa na-eji naanị nkụnyeisi/kuki.

---

## Ihe atụ e nwere ike idetuo ma mado

Naanị ọgụgụ (depụta ndị na-eweta ọrụ). Jiri Access Token nwere ikike `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Ime mgbanwe (mepụta njikọ onye na-eweta ọrụ). Jiri Access Token nwere ikike `write`/`admin` ma ọ bụ igodo API nwere ikike `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inference (ọ bụghị njikwa). Igodo API nkịtị; achọghị `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Njehie runtime dị ugbu a (ekwughachila ihe nzuzo)

| Ọnọdụ                                              | Ọkwa a na-ahụkarị | Ozi (e wepụrụ ihe nzuzo)                                             |
| -------------------------------------------------- | ----------------- | -------------------------------------------------------------------- |
| Enweghị nzere                                      | 401               | `Authentication required`                                            |
| `oma_live_…` ezighi ezi/agafeela oge               | 401               | `Invalid or expired access token`                                    |
| Igodo API ziri ezi nke na-enweghị `manage`/`admin` | 403               | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Igodo API nkịtị na-ezighi ezi n'ụzọ njikwa         | 403               | `Invalid management token`                                           |
| Ikike Access Token pere mpe                        | 403               | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" pụtara na **anabataghị** bearer ahụ dị ka nzere njikwa. Ọ **gụnyeghị** ụdị nzere ị ga-emepụta. Jiri tebụl dị n'elu: igodo inference chọrọ ikike `manage`; CLI dịpụrụ adịpụ chọrọ `oma_live_…`; dashboard na-eji kuki nnọkọ.

---

## Nhọrọ ikike kacha nta a na-atụ aro

| Onye na-akpọ                                                 | Jiri                                              |
| ------------------------------------------------------------ | ------------------------------------------------- |
| Ihe nchọgharị                                                | Nnọkọ dashboard                                   |
| CLI dị na kọmputa sava                                       | Token igwe                                        |
| CLI dị na laptọọpụ nke na-ekwurịta okwu na sava dịpụrụ adịpụ | `oma_live_…` sitere na `omniroute connect`        |
| CI / skripụ (naanị njikwa)                                   | `oma_live_…` nwere ikike kacha nta nke na-arụ ọrụ |
| CI nke ga-akpọrịrị ma `/v1` ma `/api`                        | Igodo API nwere `manage` **ma ọ bụ** nzere abụọ   |
