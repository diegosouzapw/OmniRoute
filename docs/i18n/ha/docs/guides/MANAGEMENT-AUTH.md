# Management Authentication (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute na da **rukunin bayanan shaida guda huɗu** waɗanda za su iya ba da izini ga hanyoyin gudanarwa.
Ba za a iya amfani da su a madadin juna ba. Maɓallan Inference API (`sk-…`) ba sa **gudanar da**
uwar garken sai idan an ba su izinin `manage` ko `admin` kai tsaye.

Aiwatarwa ta asali: `src/lib/api/requireManagementAuth.ts`.

| Bayanan shaida             | Siffar da aka saba                     | Inda ake ƙirƙira                                    | Amfanin da aka nufa           | Ƙarfin gudanarwa                                                                                          |
| -------------------------- | -------------------------------------- | --------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| Zaman Dashboard JWT        | cookie na `auth_token`                 | Shiga Dashboard                                     | Browser UI                    | Cikakken gudanarwar dashboard, bisa ƙa'idojin CSRF, kasancewar gida, da hanyoyin da ake karewa a koyaushe |
| Token na machine-id na CLI | na ciki / na gida                      | Fara CLI (`omniroute` a kan na'ura ɗaya)            | CLI na gida                   | Gudanarwa ta gida kawai                                                                                   |
| Scoped Access Token        | `oma_live_…`                           | **Settings → Access Tokens** ko `omniroute connect` | CLI na nesa da management API | Dole ne ya cika izinin `read`, `write`, ko `admin` da hanyar ke buƙata                                    |
| Maɓallin Inference API     | `sk-…` (da sauran farkon maɓallan API) | **API Manager / API Keys**                          | inference na `/v1/*`          | **Babu** sai idan metadata na maɓallin ya ƙunshi `manage` ko `admin`                                      |

Bayanan shaida na `oma_` bayanan shaidar gudanarwa/CLI ne. **Ba** maɓallan inference API ba ne.

Idan an kashe tantancewar shiga/maɓallin API ga uwar garken, wasu hanyoyin gudanarwa za su iya
karɓar kira marasa tantancewa. Hanyoyin gida-kawai da hanyoyin da ake karewa a koyaushe har yanzu suna
bin nasu ƙa'idojin. Saboda haka, gabatar da ɗaya daga cikin waɗannan bayanan shaida ba wajibi ba ne a
kowane yanayi, kuma mallakar ɗaya ba ya wadatarwa a kowane yanayi ba tare da izinin da ake buƙata
da kasancewar hanyar a gida ba.

Mai alaƙa: [Yanayin Nesa](./REMOTE-MODE.md) (yadda ake samar da `oma_live_…` don CLI na nesa).

---

## Jadawalan izini

Waɗannan ƙamus na izini guda biyu **sun bambanta**. Kada a gauraya su.

### Izinin Access Token (`oma_live_…`)

| Izini   | Ayyukan da aka saba                                                                               |
| ------- | ------------------------------------------------------------------------------------------------- |
| `read`  | Jerin/halin buƙatun GET waɗanda aka ba token damar gani                                           |
| `write` | Sauye-sauye (ƙirƙira/sabuntawa/sharewa) da ke ƙasa da admin                                       |
| `admin` | Cikakken CLI na nesa / connect token (fara aiki ta kalmar sirri yana amfani da wannan ta tsohuwa) |

Token mai `read` ba zai iya kiran hanyar `write` ba. Siffar saƙon lokacin aiki:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Izinin gudanarwar maɓallin API

| Izini    | Ma'ana                                                                            |
| -------- | --------------------------------------------------------------------------------- |
| (babu)   | Inference kawai. Hanyoyin gudanarwa suna mayar da 403.                            |
| `manage` | Management API (ƙofa ɗaya da reshen maɓallin API na `requireManagementAuth`)      |
| `admin`  | Haka kuma yana cika `hasManageScope` (ana ɗaukarsa a matsayin mai ikon gudanarwa) |

Kunna `manage` a kan maɓallin cikin UI na API Keys / API Manager. Kada a sake amfani da
maɓallin manhajar taɗi don sarrafa kansa sai idan da gangan ka ba shi wannan izinin.

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

## Kurakuran runtime na yanzu (kada a maimaita sirrika)

| Yanayi                                                   | Matsayin da aka saba gani | Saƙo (an tsabtace shi)                                               |
| -------------------------------------------------------- | ------------------------- | -------------------------------------------------------------------- |
| Babu bayanan shaida                                      | 401                       | `Authentication required`                                            |
| `oma_live_…` mara inganci/wa'adinsa ya ƙare              | 401                       | `Invalid or expired access token`                                    |
| API key mai inganci ba tare da `manage`/`admin` ba       | 403                       | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| API key na yau da kullum mara inganci a hanyar gudanarwa | 403                       | `Invalid management token`                                           |
| Scope na Access Token ya yi ƙasa sosai                   | 403                       | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" na nufin cewa **ba a** karɓi bearer ɗin a matsayin bayanan shaidar
gudanarwa ba. Wannan **ba ya** bayyana irin wanda ya kamata ka ƙirƙira. Yi amfani da teburin da ke sama:
inference keys suna buƙatar scope na `manage`; CLI na nesa yana buƙatar `oma_live_…`; dashboard
yana amfani da session cookie.

---

## Zaɓin mafi ƙarancin izini da aka ba da shawara

| Mai kira                                         | Abin da za a yi amfani da shi                        |
| ------------------------------------------------ | ---------------------------------------------------- |
| Browser                                          | Session na dashboard                                 |
| CLI a kan host ɗin server                        | Token na na'ura                                      |
| CLI a kan laptop da ke sadarwa da server na nesa | `oma_live_…` daga `omniroute connect`                |
| CI / scripts (gudanarwa kawai)                   | `oma_live_…` mai mafi ƙarancin scope da zai yi aiki  |
| CI da dole ne ya kira duka `/v1` da `/api`       | API key mai `manage` **ko** bayanan shaida guda biyu |
