# Management Authentication (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute nwere **ụdị nzere anọ** nwere ike inye ikike ụzọ njikwa.
Ha anaghị agbanwe agbanwe. Igodo API nkwubi okwu (`sk-…`) anaghị **ejikwa** ihe nkesa ọ gwụla ma enyere ha ikike `manage` ma ọ bụ `admin` n'ụzọ doro anya.

Mmejuputa iwu: `src/lib/api/requireManagementAuth.ts`.

| Nzere                          | Ụdị a na-ahụkarị                         | Ebe e kere ya                                               | Ebumnuche e ji ya mee          | Ikike njikwa                                                                        |
| :----------------------------- | :--------------------------------------- | :---------------------------------------------------------- | :----------------------------- | :---------------------------------------------------------------------------------- |
| Nzukọ JWT Dashboard            | `auth_token` cookie                      | Ntinye aka Dashboard                                        | Njikọ onye ọrụ ihe nchọgharị   | Njikwa dashboard zuru oke, dabere na iwu CSRF, mpaghara, na ụzọ echedoro mgbe niile |
| Akara ngosi njirimara igwe CLI | ime / mpaghara                           | Nkwalite CLI (`omniroute` n'otu igwe ahụ)                   | CLI mpaghara                   | Njikwa mpaghara naanị                                                               |
| Akara ngosi nnweta nwere oke   | `oma_live_…`                             | **Ntọala → Akara ngosi nnweta** ma ọ bụ `omniroute connect` | CLI dịpụrụ adịpụ na API njikwa | Ga-emezurịrị oke `read`, `write`, ma ọ bụ `admin` achọrọ maka ụzọ ahụ               |
| Igodo API nkwubi okwu          | `sk-…` (na mgbakwunye igodo API ndị ọzọ) | **Onye njikwa API / Igodo API**                             | `/v1/*` nkwubi okwu            | **Ọ dịghị** ọ gwụla ma metadata igodo ahụ gụnyere `manage` ma ọ bụ `admin`          |

Nzere `oma_` bụ nzere njikwa/CLI. Ha **abụghị** igodo API nkwubi okwu.

Ọ bụrụ na agbanyụrụ ntinye aka/igodo API maka ihe nkesa, ụfọdụ ụzọ njikwa nwere ike ịnakwere oku na-enweghị nkwenye. Ụzọ naanị mpaghara na ndị echedoro mgbe niile ka na-etinye iwu nke ha. Ya mere, igosi otu n'ime nzere ndị a abụghị iwu zuru ụwa ọnse, na inwe otu ezughị oke n'ụwa niile na-enweghị oke achọrọ na mpaghara ụzọ.

Nke metụtara: [Ụdị dịpụrụ adịpụ](./REMOTE-MODE.md) (otu esi emepụta `oma_live_…` maka CLI dịpụrụ adịpụ).

---

## Oke matrices

Oke njikwa igodo API na oke akara nnweta bụ okwu dị iche iche.
Oke ngwaọrụ MCP bụ okwu nke atọ, a na-eji `scopeMatches` enyocha ya kama
iiji otu n'ime ọrụ ndị dị na tebụl dị n'okpuru. N'akụkụ ibe ya:
[Oghere aha oke atọ](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Oke Akara Nnweta (`oma_live_…`)

| Oke     | Ọrụ ndị a na-ahụkarị                                                     |
| ------- | ------------------------------------------------------------------------ |
| `read`  | Ndepụta/ọnọdụ GETs nke akara ahụ kwere ka ọ hụ                           |
| `write` | Mgbanwe (ịmepụta/ịgbanwe/ihichapụ) n'okpuru onye nchịkwa                 |
| `admin` | CLI dịpụrụ adịpụ zuru oke / jikọọ akara (ndabara mmalite paswọọdụ ebe a) |

Akara nwere `read` enweghị ike ịkpọ ụzọ `write`. Ụdị ozi oge ọrụ:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Oke njikwa igodo API

| Oke       | Pụtara                                                                 |
| --------- | ---------------------------------------------------------------------- |
| (ọ dịghị) | Nkwubi okwu naanị. Ụzọ njikwa na-eweghachi 403.                        |
| `manage`  | API njikwa (otu ọnụ ụzọ dị ka alaka igodo API `requireManagementAuth`) |
| `admin`   | Na-ezukwa `hasManageScope` (a na-ewere ya dị ka onye nwere ike ijikwa) |

Kwado `manage` na igodo dị na API Keys / API Manager UI. Ejikwala igodo onye ahịa nkata maka akpaaka ọzọ ma ọ bụrụ na ị nyere oke ahụ n'ebumnobi.

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

## Mmejọ na-eme ugbu a (ewepụtala ihe nzuzo)

| Ọnọdụ                                          | Ọnọdụ a na-ahụkarị | Ozi (edoziwo)                                                                |
| :--------------------------------------------- | :----------------- | :--------------------------------------------------------------------------- |
| Enweghị asambodo                               | 401                | `Achọrọ nkwenye`                                                             |
| `oma_live_…` ezighi ezi/oge agafeela           | 401                | `Akara nnweta ezighi ezi ma ọ bụ oge agafeela`                               |
| Igodo API ziri ezi na-enweghị `manage`/`admin` | 403                | `Igodo API enweghị ikike 'manage'. Mee ka ọ rụọ ọrụ na dashboard Igodo API.` |
| Igodo API nkịtị ezighi ezi na ụzọ njikwa       | 403                | `Akara njikwa ezighi ezi`                                                    |
| Ikike Akara Nnweta dị ala nke ukwuu            | 403                | `Ikike akara nnweta '<have>' ezughị ezu; achọrọ '<need>'.`                   |

"Akara njikwa ezighi ezi" pụtara na anabataghị onye na-ebu ya dị ka asambodo njikwa. Ọ naghị agwa gị ezinụlọ ị ga-emepụta. Jiri tebụl dị n'elu: igodo nkwubi okwu chọrọ ikike `manage`; CLI dịpụrụ adịpụ chọrọ `oma_live_…`; dashboard ahụ na-eji kuki nnọkọ.

---

## Nhọrọ kacha nta akwadoro

| Onye na-akpọ oku                                    | Ojiji                                              |
| :-------------------------------------------------- | :------------------------------------------------- |
| Ihe nchọgharị                                       | Nzukọ Dashboard                                    |
| CLI na nnabata ihe nkesa                            | Akara igwe                                         |
| CLI na laptọọpụ na-agwa ihe nkesa dịpụrụ adịpụ okwu | `oma_live_…` site na `omniroute connect`           |
| CI / edemede (naanị njikwa)                         | `oma_live_…` na obere oke kacha arụ ọrụ            |
| CI nke ga-akpọ ma `/v1` na `/api`                   | Igodo API nwere `manage` **ma ọ bụ** asambodo abụọ |
