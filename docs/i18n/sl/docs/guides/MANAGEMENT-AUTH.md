# Management Authentication (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ima **štiri družine poverilnic**, ki lahko odobrijo dostop do upravljavskih poti.
Med seboj niso zamenljive. Ključi API za sklepanje (`sk-…`) **ne** upravljajo
strežnika, razen če jim je bil izrecno dodeljen obseg `manage` ali `admin`.

Kanonična implementacija: `src/lib/api/requireManagementAuth.ts`.

| Poverilnica               | Običajna oblika                        | Kje je ustvarjena                                         | Predvidena uporaba                | Zmožnost upravljanja                                                                                      |
| ------------------------- | -------------------------------------- | --------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Seja JWT nadzorne plošče  | piškotek `auth_token`                  | Prijava v nadzorno ploščo                                 | Spletni uporabniški vmesnik       | Celovito upravljanje prek nadzorne plošče ob upoštevanju pravil CSRF, lokalnosti in vedno zaščitenih poti |
| Žeton ID-ja naprave CLI   | interno / lokalno                      | Inicializacija CLI-ja (`omniroute` na istem računalniku)  | Lokalni CLI                       | Samo lokalno upravljanje                                                                                  |
| Žeton za dostop z obsegom | `oma_live_…`                           | **Nastavitve → Žetoni za dostop** ali `omniroute connect` | Oddaljeni CLI in upravljavski API | Izpolnjevati mora zahtevani obseg poti `read`, `write` ali `admin`                                        |
| Ključ API za sklepanje    | `sk-…` (in druge predpone ključev API) | **Upravitelj API-ja / Ključi API**                        | Sklepanje prek `/v1/*`            | **Brez** možnosti, razen če metapodatki ključa vključujejo `manage` ali `admin`                           |

Poverilnice `oma_` so poverilnice za upravljanje/CLI. **Niso** ključi API za sklepanje.

Če je preverjanje pristnosti s prijavo/ključem API za strežnik onemogočeno, lahko nekatere upravljavske poti
sprejmejo klice brez preverjanja pristnosti. Poti, ki so samo lokalne, in vedno zaščitene poti še vedno uporabljajo
lastna pravila. Predložitev ene od teh poverilnic zato ni vedno
obvezna, prav tako njeno posedovanje brez zahtevanega
obsega in ustrezne lokalnosti poti ni vedno zadostno.

Sorodno: [Oddaljeni način](./REMOTE-MODE.md) (kako se `oma_live_…` ustvari za oddaljeni CLI).

---

## Matrike obsegov

Upravljavski obsegi ključev API in obsegi žetonov za dostop uporabljajo različno izrazje.
Obsegi orodij MCP uporabljajo tretje izrazje in se preverjajo s `scopeMatches`, ne pa
z nobeno od funkcij v spodnjih tabelah. Vzporedni pregled:
[Trije imenski prostori obsegov](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Obsegi žetonov za dostop (`oma_live_…`)

| Obseg   | Običajna opravila                                                                         |
| ------- | ----------------------------------------------------------------------------------------- |
| `read`  | Zahteve GET za sezname/stanje, ki jih žeton sme videti                                    |
| `write` | Spremembe (ustvarjanje/posodabljanje/brisanje) pod ravnjo skrbnika                        |
| `admin` | Polni oddaljeni CLI / žeton za povezavo (privzeta nastavitev pri inicializaciji z geslom) |

Žeton z obsegom `read` ne more klicati poti `write`. Oblika sporočila med izvajanjem:
`Obseg žetona za dostop '<have>' ni zadosten; zahtevan je '<need>'.`

### Upravljavski obsegi ključev API

| Obseg    | Pomen                                                                             |
| -------- | --------------------------------------------------------------------------------- |
| (brez)   | Samo sklepanje. Upravljavske poti vrnejo 403.                                     |
| `manage` | Upravljavski API (enaka kontrola kot veja za ključ API v `requireManagementAuth`) |
| `admin`  | Izpolnjuje tudi `hasManageScope` (obravnava se kot zmožen upravljanja)            |

Omogočite `manage` za ključ v uporabniškem vmesniku Ključi API / Upravitelj API-ja. Ključa
odjemalca za klepet ne uporabljajte znova za avtomatizacijo, razen če ste mu namenoma dodelili ta obseg.

---

## Kako ustvariti in preklicati

### Seja JWT nadzorne plošče

1. Odprite `/login` in se prijavite z geslom za upravljanje (`INITIAL_PASSWORD` ob prvem zagonu).
2. Piškotek `auth_token` je HttpOnly. Nadzorna plošča v brskalniku ga uporablja samodejno.
3. Odjavite se prek `/api/auth/logout`. Dolgotrajne skrivnosti, ki bi jo bilo treba kopirati, ni.

### Žeton ID-ja naprave za CLI

1. Zaženite `omniroute` na **istem gostitelju** kot strežnik (prek vmesnika loopback).
2. CLI inicializira žeton ID-ja naprave v `~/.omniroute/` (chmod 600).
3. To **ne** deluje iz druge naprave. Za oddaljeni CLI uporabite dostopni žeton.

### Dostopni žeton z določenim obsegom (`oma_live_…`)

1. Nadzorna plošča: **Nastavitve → Dostopni žetoni** → ustvarite žeton (ime + obseg). **Skrivnost se prikaže samo enkrat.**
2. Ali prek CLI-ja: `omniroute connect <host>` (geslo → žeton). Glejte [Oddaljeni način](./REMOTE-MODE.md).
3. Glava: `Authorization: Bearer oma_live_…`
4. Prekličite ga na isti strani z dostopnimi žetoni (ali izbrišite kontekst CLI-ja).
5. Strežnik shrani samo zgoščeno vrednost. Z besedilom v nešifrirani obliki ravnajte kot z geslom.

### Ključ API z obsegom `manage`

1. Nadzorna plošča: **Upravitelj API-jev / Ključi API** → ustvarite ali uredite ključ → omogočite `manage` (ali `admin`).
2. Glava: `Authorization: Bearer sk-…` (dejanska predpona ključa).
3. Prekličite ključ ali odstranite obseg `manage` v istem uporabniškem vmesniku.
4. Za avtomatizacijo, ki ne uporablja CLI-ja, upoštevajte načelo najmanjših pravic: za opravila, ki uporabljajo samo GET, izberite dostopni žeton z obsegom `read`; obseg `manage` na ključu API uporabite samo, kadar mora klicatelj dostopati tudi do `/v1` in upravljanja.

---

## Oblika glave

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Poverilnic za upravljanje ne vstavljajte v pot URL-ja ali poizvedbeni niz. Preverjanje
pristnosti za upravljanje uporablja samo glavo ali piškotek.

---

## Primeri za kopiranje in lepljenje

Samo za branje (prikaz ponudnikov). Uporabite dostopni žeton z obsegom `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Spreminjanje (ustvarjanje povezave s ponudnikom). Uporabite dostopni žeton z obsegom
`write`/`admin` ali ključ API z obsegom `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Sklepanje (ne upravljanje). Običajen ključ API; obseg `manage` ni potreben:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Trenutne napake med izvajanjem (ne razkrivajte skrivnosti)

| Primer                                             | Običajno stanje | Sporočilo (brez občutljivih podatkov)                                |
| -------------------------------------------------- | --------------- | -------------------------------------------------------------------- |
| Ni poverilnice                                     | 401             | `Authentication required`                                            |
| Neveljaven/potekel `oma_live_…`                    | 401             | `Invalid or expired access token`                                    |
| Veljaven ključ API brez `manage`/`admin`           | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Neveljaven običajni ključ API na upravljavski poti | 403             | `Invalid management token`                                           |
| Obseg dostopnega žetona je premajhen               | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

»Invalid management token« pomeni, da žeton bearer **ni** bil sprejet kot
poverilnica za upravljanje. Sporočilo **ne** pove, katero vrsto poverilnice morate
ustvariti. Uporabite zgornjo tabelo: ključi za sklepanje potrebujejo obseg `manage`;
oddaljeni CLI potrebuje `oma_live_…`; nadzorna plošča pa uporablja sejni piškotek.

---

## Priporočena izbira z najmanjšimi pravicami

| Klicatelj                                                | Uporaba                                              |
| -------------------------------------------------------- | ---------------------------------------------------- |
| Brskalnik                                                | Seja nadzorne plošče                                 |
| CLI na gostitelju strežnika                              | Žeton naprave                                        |
| CLI na prenosniku, ki komunicira z oddaljenim strežnikom | `oma_live_…` iz `omniroute connect`                  |
| CI / skripti (samo upravljanje)                          | `oma_live_…` z najmanjšim obsegom, ki zadostuje      |
| CI, ki mora klicati tako `/v1` kot `/api`                | Ključ API z obsegom `manage` **ali** dve poverilnici |
