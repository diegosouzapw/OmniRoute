# Management Authentication (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute yana da **iyalai huɗu na takardun shaida** waɗanda zasu iya ba da izinin hanyoyin gudanarwa.
Ba za a iya musanya su ba. Maɓallan API na Inference (`sk-…`) ba sa sarrafa
sabar sai dai idan an ba su izini a fili `manage` ko `admin` scope.

Aiwatarwa ta asali: `src/lib/api/requireManagementAuth.ts`.

| Takardar Shaida             | Tsarin yau da kullun                        | An ƙirƙira shi a ina                                   | Amfani da aka nufa               | Ƙarfin Gudanarwa                                                                                |
| --------------------------- | ------------------------------------------- | ------------------------------------------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| Zaman JWT na Dashboard      | `auth_token` kuki                           | Shiga Dashboard                                        | UI na Browser                    | Cikakken gudanarwar dashboard, ƙarƙashin CSRF, wuri, da ƙa'idodin hanyoyin da aka kare koyaushe |
| Alamar ID na Injin CLI      | na ciki / na gida                           | Fara CLI (`omniroute` akan inji ɗaya)                  | CLI na gida                      | Gudanarwa na gida kawai                                                                         |
| Alamar Samun Dama Mai Iyaka | `oma_live_…`                                | **Saituna → Alamar Samun Dama** ko `omniroute connect` | CLI mai nisa da API na gudanarwa | Dole ne ya gamsar da `read`, `write`, ko `admin` scope da ake buƙata na hanya                   |
| Maɓallin API na Inference   | `sk-…` (da sauran prefixes na maɓallin API) | **Manajan API / Maɓallan API**                         | `/v1/*` inference                | **Babu** sai dai idan metadata na maɓallin ya haɗa da `manage` ko `admin`                       |

Takardun shaida na `oma_` takardun shaida ne na gudanarwa/CLI. Ba maɓallan API na inference ba ne.

Idan an kashe shiga/API-key auth don sabar, wasu hanyoyin gudanarwa na iya
karɓar kira marasa inganci. Hanyoyin da ke na gida kawai da waɗanda aka kare koyaushe har yanzu suna amfani da nasu ƙa'idodin. Gabatar da ɗaya daga cikin waɗannan takardun shaida saboda haka ba wajibi bane a ko'ina, kuma mallakar ɗaya bai isa ba a ko'ina ba tare da scope da wuri na hanya da ake buƙata ba.

Mai alaƙa: [Yanayin Nesa](./REMOTE-MODE.md) (yadda ake ƙirƙirar `oma_live_…` don CLI mai nisa).

---

## Ma'aunan fannoni

Fannonin sarrafa maɓallin API da fannonin alamar shiga (access-token) kalmomi ne daban-daban.
Fannonin kayan aikin MCP kalma ce ta uku, ana bincika ta da `scopeMatches` maimakon
kowane aiki a cikin teburin da ke ƙasa. Gefe da gefe:
[Fannoni uku na iyakoki](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Fannonin Alamar Shiga (Access Token) (`oma_live_…`)

| Fanni   | Ayyuka na yau da kullun                                              |
| ------- | -------------------------------------------------------------------- |
| `read`  | Jerin/matakin GETs da alamar shiga ke da izinin gani                 |
| `write` | Canje-canje (ƙirƙira/sabunta/share) ƙarƙashin mai gudanarwa          |
| `admin` | Cikakken CLI mai nisa / alamar haɗi (kalmar sirri ta asali tana nan) |

Alamar shiga mai `read` ba za ta iya kiran hanyar `write` ba. Siffar saƙon lokacin aiki:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Fannonin sarrafa maɓallin API

| Fanni    | Ma'ana                                                                         |
| -------- | ------------------------------------------------------------------------------ |
| `(babu)` | Hasashe kawai. Hanyoyin sarrafawa suna dawo da 403.                            |
| `manage` | API na sarrafawa (ƙofa ɗaya da reshen maɓallin API na `requireManagementAuth`) |
| `admin`  | Hakanan yana gamsar da `hasManageScope` (ana ɗaukar shi mai iya sarrafawa)     |

Kunna `manage` akan maɓallin a cikin API Keys / API Manager UI. Kada a sake amfani da
maɓallin abokin ciniki na hira don sarrafa kai sai dai idan da gangan ka ba da wannan fannin.

---

## Yadda ake ƙirƙira da sokewa

### Zaman Dashboard JWT

1. Buɗe `/login`, shiga da kalmar sirrin gudanarwa (`INITIAL_PASSWORD` a fara kunnawa).
2. Cookie na `auth_token` HttpOnly ne. Dashboard na browser yana amfani da shi ta atomatik.
3. Fita ta `/api/auth/logout`. Babu wani sirri mai daɗewar amfani da za a kwafa.

### Token na machine-id na CLI

1. Gudanar da `omniroute` a kan **host ɗaya** da uwar garken (loopback).
2. CLI yana fara token na machine-id a ƙarƙashin `~/.omniroute/` (chmod 600).
3. Wannan ba ya aiki daga wata na'ura. Yi amfani da Access Token don CLI na nesa.

### Scoped Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → ƙirƙira (suna + izini). **Ana nuna sirrin sau ɗaya kawai.**
2. Ko CLI: `omniroute connect <host>` (kalmar sirri → token). Duba [Yanayin Nesa](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Soke shi daga shafin Access Tokens ɗin (ko share mahallin CLI).
5. Uwar garken tana adana hash kawai. Ɗauki rubutaccen sirrin kamar kalmar sirri.

### Maɓallin API mai izinin gudanarwa

1. Dashboard: **API Manager / API Keys** → ƙirƙira ko gyara maɓalli → kunna `manage` (ko `admin`).
2. Header: `Authorization: Bearer sk-…` (ainihin farkon maɓallin).
3. Soke ko cire `manage` a cikin UI ɗin.
4. Mafi ƙarancin gata ga sarrafa kansa wanda ba CLI ba: fi son Access Token mai `read` don ayyukan GET-kawai; yi amfani da `manage` a kan maɓallin API ne kawai idan mai kiran dole ne ya kuma yi magana da `/v1` da tsarin gudanarwa.

---

## Tsarin header

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Kada a sanya bayanan shaidar gudanarwa a cikin hanyar URL ko query string. Tabbatar da shaidar
gudanarwa ta header/cookie ce kawai.

---

## Misalan kwafa-da-liƙawa

Karatu kawai (jera masu samarwa). Yi amfani da Access Token mai izinin `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Yin gyara (ƙirƙirar haɗin mai samarwa). Yi amfani da Access Token mai izinin `write`/`admin` ko
API key mai scope na manage:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inference (ba gudanarwa ba). API key na yau da kullum, ba a buƙatar `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Kurakuran lokacin aiki na yanzu (kada a nuna sirri)

| Halin da ake ciki                                                | Matsayin da aka saba | Saƙo (an tsarkake)                                                   |
| :--------------------------------------------------------------- | :------------------- | :------------------------------------------------------------------- |
| Babu takardar shaidda                                            | 401                  | `Authentication required`                                            |
| `oma_live_…` mara inganci/ya ƙare                                | 401                  | `Invalid or expired access token`                                    |
| Maɓallin API mai inganci ba tare da `manage`/`admin` ba          | 403                  | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Maɓallin API na yau da kullun mara inganci akan hanyar gudanarwa | 403                  | `Invalid management token`                                           |
| Iyakar shiga ta Access Token ta yi ƙasa                          | 403                  | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" yana nufin cewa ba a karɓi mai ɗauka ba a matsayin
takardar shaidda ta gudanarwa. Ba ya gaya muku wane iyali za ku ƙirƙira. Yi amfani da teburin da ke sama:
maɓallan inference suna buƙatar iyakar `manage`; CLI mai nisa yana buƙatar `oma_live_…`; dashboard
yana amfani da kuki na zaman.

---

## Zaɓin mafi ƙarancin gata da aka ba da shawarar

| Mai kira                                                     | Amfani                                                         |
| :----------------------------------------------------------- | :------------------------------------------------------------- |
| Mai bincike                                                  | Zaman Dashboard                                                |
| CLI akan mai masaukin sabar                                  | Alamar inji                                                    |
| CLI akan kwamfutar tafi-da-gidanka yana magana da sabar nesa | `oma_live_…` daga `omniroute connect`                          |
| CI / rubutun (sarrafawa kawai)                               | `oma_live_…` tare da mafi ƙarancin iyakacin aiki               |
| CI wanda dole ne ya kira `/v1` da `/api`                     | Maɓallin API tare da `manage` **ko** takardun shaida guda biyu |
