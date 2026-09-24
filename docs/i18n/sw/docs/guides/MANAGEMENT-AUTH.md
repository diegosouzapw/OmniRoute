# Management Authentication (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ina **familia nne za vitambulisho** zinazoweza kuidhinisha njia za usimamizi.
Hazibadiliki. Funguo za API za Inference (`sk-…`) **hazisimamii**
seva isipokuwa kama zilipewa waziwazi upeo wa `manage` au `admin`.

Utekelezaji halisi: `src/lib/api/requireManagementAuth.ts`.

| Kitambulisho | Fomu ya kawaida | Imeundwa wapi | Matumizi yaliyokusudiwa | Uwezo wa usimamizi |
| --------------------- | ----------------------------------- | --------------------------------------------------- | ----------------------------- | Usimamizi kamili wa dashibodi, kulingana na CSRF, eneo, na sheria za njia zilizolindwa kila wakati |
| Kipindi cha JWT cha Dashibodi | kuki ya `auth_token` | Kuingia kwenye Dashibodi | UI ya Kivinjari | Usimamizi kamili wa dashibodi, kulingana na CSRF, eneo, na sheria za njia zilizolindwa kila wakati |
| Tokeni ya kitambulisho cha mashine ya CLI | ndani / ndani | Uanzishaji wa CLI (`omniroute` kwenye mashine moja) | CLI ya Ndani | Usimamizi wa ndani tu |
| Tokeni ya Ufikiaji Iliyopewa Upeo | `oma_live_…` | **Mipangilio → Tokeni za Ufikiaji** au `omniroute connect` | CLI ya Mbali na API ya usimamizi | Lazima itimize upeo unaohitajika wa njia wa `read`, `write`, au `admin` |
| Funguo ya API ya Inference | `sk-…` (na viambishi vingine vya API-key) | **Meneja wa API / Funguo za API** | `/v1/*` inference | **Hakuna** isipokuwa kama metadata ya funguo inajumuisha `manage` au `admin` |

Vitambulisho vya `oma_` ni vitambulisho vya usimamizi/CLI. Sio funguo za API za inference.

Ikiwa kuingia/uthibitishaji wa API-key umezimwa kwa seva, baadhi ya njia za usimamizi zinaweza
kukubali simu zisizothibitishwa. Njia za ndani tu na zilizolindwa kila wakati bado zinatumia
sheria zao wenyewe. Kuwasilisha mojawapo ya vitambulisho hivi kwa hivyo si lazima kila wakati,
na kumiliki kimoja hakitoshi kila wakati bila upeo unaohitajika na eneo la njia.

Kuhusiana: [Hali ya Mbali](./REMOTE-MODE.md) (jinsi `oma_live_…` inavyotengenezwa kwa CLI ya mbali).

---

## Matrisi za Wigo

Wigo wa usimamizi wa funguo za API na wigo wa tokeni za ufikiaji ni misamiati tofauti.
Wigo wa zana za MCP ni msamiati wa tatu, huchunguzwa kwa kutumia `scopeMatches` badala ya
mojawapo ya kazi katika jedwali hapa chini. Sambamba:
[Nafasi tatu za majina ya wigo](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Wigo wa Tokeni za Ufikiaji (`oma_live_…`)

| Wigo    | Shughuli za Kawaida                                                                    |
| ------- | -------------------------------------------------------------------------------------- |
| `read`  | Orodha/hali ya GETs ambazo tokeni inaruhusiwa kuona                                    |
| `write` | Mabadiliko (kuunda/kusasisha/kufuta) chini ya msimamizi                                |
| `admin` | CLI kamili ya mbali / tokeni ya kuunganisha (chaguo-msingi za kuanzisha nenosiri hapa) |

Tokeni yenye `read` haiwezi kuita njia ya `write`. Muundo wa ujumbe wa wakati wa utekelezaji:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Wigo wa usimamizi wa funguo za API

| Wigo     | Maana                                                                             |
| -------- | --------------------------------------------------------------------------------- |
| (none)   | Utabiri pekee. Njia za usimamizi hurejesha 403.                                   |
| `manage` | API ya Usimamizi (lango sawa na tawi la funguo za API la `requireManagementAuth`) |
| `admin`  | Pia inakidhi `hasManageScope` (inachukuliwa kuwa na uwezo wa usimamizi)           |

Washa `manage` kwenye ufunguo katika UI ya Funguo za API / Kidhibiti cha API. Usitumie tena
ufunguo wa mteja wa gumzo kwa otomatiki isipokuwa kama umetoa wigo huo kwa makusudi.

---

## Jinsi ya kuunda na kubatilisha

### Kipindi cha JWT cha dashibodi

1. Fungua `/login`, ingia kwa nenosiri la usimamizi (`INITIAL_PASSWORD` wakati wa uanzishaji wa kwanza).
2. Kidakuzi cha `auth_token` ni HttpOnly. Dashibodi ya kivinjari hukitumia kiotomatiki.
3. Toka kupitia `/api/auth/logout`. Hakuna siri ya muda mrefu ya kunakili.

### Tokeni ya machine-id ya CLI

1. Endesha `omniroute` kwenye **kipangishi kilekile** kama seva (loopback).
2. CLI huanzisha tokeni ya machine-id chini ya `~/.omniroute/` (chmod 600).
3. Hii **haifanyi kazi** kutoka kwenye mashine nyingine. Tumia Tokeni ya Ufikiaji kwa CLI ya mbali.

### Tokeni ya Ufikiaji yenye Upeo (`oma_live_…`)

1. Dashibodi: **Mipangilio → Tokeni za Ufikiaji** → unda (jina + upeo). **Siri huonyeshwa mara moja.**
2. Au CLI: `omniroute connect <host>` (nenosiri → tokeni). Tazama [Hali ya Mbali](./REMOTE-MODE.md).
3. Kichwa: `Authorization: Bearer oma_live_…`
4. Batilisha kutoka kwenye ukurasa huohuo wa Tokeni za Ufikiaji (au futa muktadha wa CLI).
5. Seva huhifadhi heshi pekee. Ichukulie matini wazi kama nenosiri.

### Ufunguo wa API wenye upeo wa usimamizi

1. Dashibodi: **Kidhibiti cha API / Funguo za API** → unda au hariri ufunguo → washa `manage` (au `admin`).
2. Kichwa: `Authorization: Bearer sk-…` (kiambishi awali halisi cha ufunguo).
3. Batilisha au ondoa `manage` katika kiolesura hicho hicho.
4. Kwa upendeleo wa kiwango cha chini zaidi kwa uendeshaji otomatiki ambao si CLI: pendelea Tokeni ya Ufikiaji ya `read` kwa kazi za GET pekee; tumia `manage` kwenye ufunguo wa API ikiwa tu mpigaji lazima pia awasiliane na `/v1` pamoja na usimamizi.

---

## Muundo wa kichwa

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Usiweke vitambulisho vya usimamizi katika njia ya URL au mfuatano wa hoja. Uthibitishaji wa
usimamizi hutumia kichwa/kidakuzi pekee.

---

## Mifano ya kunakili na kubandika

Kusoma pekee (orodhesha watoa huduma). Tumia Access Token yenye `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Kurekebisha (unda muunganisho wa mtoa huduma). Tumia Access Token yenye `write`/`admin` au
API key yenye upeo wa `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Uinferensi (si usimamizi). API key ya kawaida, `manage` haihitajiki:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Hitilafu za sasa za wakati wa utekelezaji (usirudishe siri)

| Hali                                                      | Hali ya kawaida | Ujumbe (umesafishwa)                                                 |
| :-------------------------------------------------------- | :-------------- | :------------------------------------------------------------------- |
| Hakuna kitambulisho                                       | 401             | `Authentication required`                                            |
| `oma_live_…` batili/imeisha muda                          | 401             | `Invalid or expired access token`                                    |
| Ufunguo halali wa API bila `manage`/`admin`               | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Ufunguo wa API wa kawaida batili kwenye njia ya usimamizi | 403             | `Invalid management token`                                           |
| Wigo wa Tokeni ya Kufikia ni mdogo sana                   | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Tokeni ya usimamizi batili" inamaanisha mbebaji **hakukubaliwa** kama kitambulisho cha usimamizi. Haielezi **ni familia gani** ya kutengeneza. Tumia jedwali hapo juu: funguo za inference zinahitaji wigo wa `manage`; CLI ya mbali inahitaji `oma_live_…`; dashibodi inatumia kuki ya kipindi.

---

## Chaguo linalopendekezwa la upendeleo mdogo

| Mpigaji                                                     | Matumizi                                                 |
| :---------------------------------------------------------- | :------------------------------------------------------- |
| Kivinjari                                                   | Kikao cha dashibodi                                      |
| CLI kwenye seva pangishi                                    | Tokeni ya mashine                                        |
| CLI kwenye kompyuta mpakato inayewasiliana na seva ya mbali | `oma_live_…` kutoka `omniroute connect`                  |
| CI / hati (usimamizi pekee)                                 | `oma_live_…` yenye wigo mdogo zaidi unaofanya kazi       |
| CI ambayo lazima iite zote mbili `/v1` na `/api`            | Ufunguo wa API wenye `manage` **au** vitambulisho viwili |
