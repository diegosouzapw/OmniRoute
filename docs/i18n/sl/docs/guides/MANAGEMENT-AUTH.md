# Management Authentication (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ima **štiri družine poverilnic**, ki lahko avtorizirajo upravljavske poti.
Niso medsebojno zamenljive. Ključi API-ja za sklepanje (`sk-…`) **ne** upravljajo
strežnika, razen če jim je bil izrecno dodeljen obseg `manage` ali `admin`.

Referenčna implementacija: `src/lib/api/requireManagementAuth.ts`.

| Poverilnica                | Običajna oblika                           | Kje je ustvarjena                                            | Predvidena uporaba                | Zmožnost upravljanja                                                                                      |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Seja JWT nadzorne plošče   | piškotek `auth_token`                     | Prijava v nadzorno ploščo                                    | Spletni uporabniški vmesnik       | Popolno upravljanje prek nadzorne plošče ob upoštevanju pravil za CSRF, lokalnost in vedno zaščitene poti |
| Žeton ID-ja naprave za CLI | interno/lokalno                           | Začetna nastavitev CLI-ja (`omniroute` na istem računalniku) | Lokalni CLI                       | Samo lokalno upravljanje                                                                                  |
| Žeton za dostop z obsegom  | `oma_live_…`                              | **Nastavitve → Žetoni za dostop** ali `omniroute connect`    | Oddaljeni CLI in upravljavski API | Izpolnjevati mora zahteve poti glede obsega `read`, `write` ali `admin`                                   |
| Ključ API-ja za sklepanje  | `sk-…` (in druge predpone ključev API-ja) | **Upravljalnik API-ja / Ključi API-ja**                      | Sklepanje prek `/v1/*`            | **Brez zmožnosti**, razen če metapodatki ključa vključujejo `manage` ali `admin`                          |

Poverilnice `oma_` so poverilnice za upravljanje/CLI. **Niso** ključi API-ja za sklepanje.

Če je preverjanje pristnosti s prijavo/ključem API-ja za strežnik onemogočeno, lahko nekatere upravljavske poti
sprejmejo neoverjene klice. Za samo lokalne in vedno zaščitene poti še vedno veljajo
njihova lastna pravila. Predložitev ene od teh poverilnic zato ni vedno
obvezna, njeno posedovanje pa brez zahtevanega obsega in ustrezne lokalnosti poti ni vedno
zadostno.

Povezano: [Oddaljeni način](./REMOTE-MODE.md) (kako se `oma_live_…` ustvari za oddaljeni CLI).

---

## Matrike obsegov

Ta dva nabora obsegov sta **različna**. Ne mešajte ju.

### Obsegi žetonov za dostop (`oma_live_…`)

| Obseg   | Običajne operacije                                                                            |
| ------- | --------------------------------------------------------------------------------------------- |
| `read`  | Zahteve GET za sezname/stanja, ki jih žeton sme videti                                        |
| `write` | Spremembe (ustvarjanje/posodabljanje/brisanje) pod ravnjo skrbnika                            |
| `admin` | Polni oddaljeni CLI/žeton za povezavo (začetna nastavitev z geslom privzeto uporabi ta obseg) |

Žeton z obsegom `read` ne more klicati poti, ki zahteva `write`. Oblika sporočila med izvajanjem:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Upravljavski obsegi ključev API-ja

| Obseg    | Pomen                                                                                  |
| -------- | -------------------------------------------------------------------------------------- |
| (brez)   | Samo sklepanje. Upravljavske poti vrnejo 403.                                          |
| `manage` | Upravljavski API (isto preverjanje kot veja za ključ API-ja v `requireManagementAuth`) |
| `admin`  | Prav tako izpolnjuje `hasManageScope` (obravnava se kot zmožen upravljanja)            |

Omogočite `manage` za ključ v uporabniškem vmesniku Ključi API-ja/Upravljalnik API-ja. Ključa
odjemalca za klepet ne uporabljajte znova za avtomatizacijo, razen če ste mu namerno dodelili ta obseg.

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

## Trenutne napake izvajalnega okolja (ne razkrivajte skrivnosti)

| Primer                                               | Običajna koda stanja | Sporočilo (očiščeno)                                                             |
| ---------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------- |
| Brez poverilnice                                     | 401                  | `Preverjanje pristnosti je obvezno`                                              |
| Neveljaven/potekel `oma_live_…`                      | 401                  | `Neveljaven ali potekel dostopni žeton`                                          |
| Veljaven ključ API brez obsega `manage`/`admin`      | 403                  | `Ključ API nima obsega 'manage'. Omogočite ga na nadzorni plošči za ključe API.` |
| Neveljaven običajni ključ API na poti za upravljanje | 403                  | `Neveljaven žeton za upravljanje`                                                |
| Premajhen obseg dostopnega žetona                    | 403                  | `Obseg dostopnega žetona '<have>' ne zadostuje; zahtevan je '<need>'.`           |

»Neveljaven žeton za upravljanje« pomeni, da nosilni žeton **ni** bil sprejet kot poverilnica za upravljanje. Sporočilo vam **ne** pove, katero vrsto poverilnice morate ustvariti. Uporabite zgornjo tabelo: ključi za izvajanje sklepanja potrebujejo obseg `manage`; oddaljeni CLI potrebuje `oma_live_…`; nadzorna plošča pa uporablja sejni piškotek.

---

## Priporočena izbira z najmanjšimi pravicami

| Klicatelj                                                | Uporabite                                            |
| -------------------------------------------------------- | ---------------------------------------------------- |
| Brskalnik                                                | Seja nadzorne plošče                                 |
| CLI na gostitelju strežnika                              | Strojni žeton                                        |
| CLI na prenosniku, ki komunicira z oddaljenim strežnikom | `oma_live_…` iz ukaza `omniroute connect`            |
| CI/skripti (samo upravljanje)                            | `oma_live_…` z najmanjšim ustreznim obsegom          |
| CI, ki mora klicati tako `/v1` kot `/api`                | Ključ API z obsegom `manage` **ali** dve poverilnici |
