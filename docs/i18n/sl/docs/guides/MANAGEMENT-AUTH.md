# Management Authentication (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ima **štiri družine poverilnic**, ki lahko avtorizirajo upravljavske poti.
Niso zamenljive. API ključi za sklepanje (`sk-…`) NE upravljajo
strežnika, razen če jim je bil izrecno dodeljen obseg `manage` ali `admin`.

Kanonična implementacija: `src/lib/api/requireManagementAuth.ts`.

| Poverilnica               | Tipična oblika                         | Ustvarjeno kje                                            | Predvidena uporaba                  | Zmožnost upravljanja                                                                                 |
| ------------------------- | -------------------------------------- | --------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Seja JWT nadzorne plošče  | piškotek `auth_token`                  | Prijava v nadzorno ploščo                                 | Uporabniški vmesnik brskalnika      | Popolno upravljanje nadzorne plošče, ob upoštevanju pravil CSRF, lokalnosti in vedno zaščitenih poti |
| Žeton ID-ja stroja CLI    | interno / lokalno                      | Zagon CLI (`omniroute` na istem stroju)                   | Lokalni CLI                         | Samo lokalno upravljanje                                                                             |
| Žeton za dostop z obsegom | `oma_live_…`                           | **Nastavitve → Žetoni za dostop** ali `omniroute connect` | Oddaljeni CLI in API za upravljanje | Mora izpolnjevati zahtevani obseg `read`, `write` ali `admin` poti                                   |
| API ključ za sklepanje    | `sk-…` (in druge predpone API ključev) | **Upravitelj API-jev / API ključi**                       | sklepanje `/v1/*`                   | **Nobeno**, razen če metapodatki ključa vključujejo `manage` ali `admin`                             |

Poverilnice `oma_` so poverilnice za upravljanje/CLI. Niso API ključi za sklepanje.

Če je avtentikacija z prijavo/API ključem onemogočena za strežnik, lahko nekatere upravljavske poti
sprejmejo neavtenticirane klice. Samo lokalne in vedno zaščitene poti še vedno uporabljajo
svoja pravila. Predstavitev ene od teh poverilnic torej ni univerzalno
obvezna, in posedovanje ene ni univerzalno zadostno brez zahtevanega
obsega in lokalnosti poti.

Povezano: [Oddaljeni način](./REMOTE-MODE.md) (kako se `oma_live_…` izda za oddaljeni CLI).

---

## Matrike obsegov

Obsegi za upravljanje API-ključev in obsegi dostopnih žetonov so različni besednjaki.
Obsegi orodij MCP so tretji besednjak, preverjen z `scopeMatches` namesto
s katero koli funkcijo v spodnjih tabelah. Primerjava:
[Trije imenski prostori obsegov](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Obsegi dostopnih žetonov (`oma_live_…`)

| Obseg   | Tipične operacije                                                                      |
| ------- | -------------------------------------------------------------------------------------- |
| `read`  | Seznami/statusni GET-i, ki jih žeton sme videti                                        |
| `write` | Mutacije (ustvarjanje/posodabljanje/brisanje) pod skrbnikom                            |
| `admin` | Popoln oddaljeni CLI / žeton za povezavo (privzete nastavitve za zagon gesla so tukaj) |

Žeton z `read` ne more klicati poti `write`. Oblika sporočila med izvajanjem:
`Obseg dostopnega žetona '<have>' je nezadosten; zahtevan je '<need>'.`

### Obsegi za upravljanje API-ključev

| Obseg    | Pomen                                                                          |
| -------- | ------------------------------------------------------------------------------ |
| (brez)   | Samo sklepanje. Poti za upravljanje vrnejo 403.                                |
| `manage` | Upravljalni API (isto preverjanje kot veja API-ključa `requireManagementAuth`) |
| `admin`  | Prav tako izpolnjuje `hasManageScope` (obravnavano kot zmožno upravljanja)     |

Omogočite `manage` na ključu v uporabniškem vmesniku API Keys / API Manager. Ne uporabljajte
ključa odjemalca za klepet za avtomatizacijo, razen če ste ta obseg namerno dodelili.

---

## Kako ustvariti in preklicati

### Seja JWT nadzorne plošče

1. Odprite `/login` in se prijavite z upravljavskim geslom (`INITIAL_PASSWORD` ob prvem zagonu).
2. Piškotek `auth_token` ima oznako HttpOnly. Nadzorna plošča v brskalniku ga uporablja samodejno.
3. Odjavite se prek `/api/auth/logout`. Dolgotrajne skrivnosti, ki bi jo lahko kopirali, ni.

### Žeton ID-ja naprave za CLI

1. Zaženite `omniroute` na **istem gostitelju** kot strežnik (povratna zanka).
2. CLI ustvari žeton ID-ja naprave v `~/.omniroute/` (chmod 600).
3. To **ne** deluje z drugega računalnika. Za oddaljeni CLI uporabite žeton za dostop.

### Žeton za dostop z obsegom (`oma_live_…`)

1. Nadzorna plošča: **Nastavitve → Žetoni za dostop** → ustvarite žeton (ime + obseg). **Skrivnost je prikazana samo enkrat.**
2. Ali CLI: `omniroute connect <host>` (geslo → žeton). Glejte [Oddaljeni način](./REMOTE-MODE.md).
3. Glava: `Authorization: Bearer oma_live_…`
4. Prekličite ga na isti strani Žetoni za dostop (ali izbrišite kontekst CLI-ja).
5. Strežnik shrani samo zgoščeno vrednost. Čistopisno vrednost obravnavajte kot geslo.

### Ključ API-ja z upravljavskim obsegom

1. Nadzorna plošča: **Upravljalnik API-ja / Ključi API-ja** → ustvarite ali uredite ključ → omogočite `manage` (ali `admin`).
2. Glava: `Authorization: Bearer sk-…` (dejanska predpona ključa).
3. Prekličite ključ ali odstranite `manage` v istem uporabniškem vmesniku.
4. Za avtomatizacijo, ki ne uporablja CLI-ja, upoštevajte načelo najmanjših pravic: za opravila samo z zahtevami GET raje uporabite žeton za dostop z obsegom `read`; obseg `manage` na ključu API-ja uporabite samo, kadar mora klicatelj komunicirati tako z `/v1` kot z upravljavskim API-jem.

---

## Oblika glave

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Poverilnic za upravljanje ne vključujte v pot URL-ja ali poizvedbeni niz. Preverjanje pristnosti za upravljanje je dovoljeno samo prek glave/piškotka.

---

## Primeri za kopiranje in lepljenje

Samo za branje (seznam ponudnikov). Uporabite dostopni žeton z obsegom `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Spreminjanje (ustvarjanje povezave s ponudnikom). Uporabite dostopni žeton z obsegom `write`/`admin` ali ključ API z obsegom `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Izvajanje sklepanja (ne upravljanje). Običajen ključ API; obseg `manage` ni potreben:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Trenutne napake med izvajanjem (ne izpisujte skrivnosti)

| Situacija                                          | Tipični status | Sporočilo (očiščeno)                                                             |
| :------------------------------------------------- | :------------- | :------------------------------------------------------------------------------- |
| Ni poverilnice                                     | 401            | `Zahtevana avtentikacija`                                                        |
| Neveljaven/potekel `oma_live_…`                    | 401            | `Neveljaven ali potekel žeton za dostop`                                         |
| Veljaven API ključ brez `manage`/`admin`           | 403            | `API ključu manjka obseg 'manage'. Omogočite ga na nadzorni plošči API ključev.` |
| Neveljaven običajni API ključ na upravljavski poti | 403            | `Neveljaven upravljavski žeton`                                                  |
| Obseg žetona za dostop je prenizek                 | 403            | `Obseg žetona za dostop '<have>' je nezadosten; zahtevan je '<need>'`            |

"Neveljaven upravljavski žeton" pomeni, da nosilec **ni** bil sprejet kot upravljavska
poverilnica. **Ne** pove vam, katero družino naj ustvarite. Uporabite zgornjo
tabelo: ključem za sklepanje je potreben obseg `manage`; oddaljeni CLI potrebuje
`oma_live_…`; nadzorna plošča uporablja sejo piškotka.

---

## Priporočena izbira z najmanj privilegiji

| Klicatelj                                  | Uporaba                                      |
| :----------------------------------------- | :------------------------------------------- |
| Browser                                    | Seja nadzorne plošče                         |
| CLI on the server host                     | Žeton stroja                                 |
| CLI on a laptop talking to a remote server | `oma_live_…` iz `omniroute connect`          |
| CI / scripts (management only)             | `oma_live_…` z najmanjšim delujočim obsegom  |
| CI that must call both `/v1` and `/api`    | API ključ z `manage` **ali** dve poverilnici |
