# Monitoring & Costs — Navigation Structure (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Įgyvendinta B grupėje (16 planas). Žr. `src/shared/constants/sidebarVisibility.ts`.

---

## Aukšto lygio navigacija

Prietaisų skydelio šoninėje juostoje (po B grupės pakeitimų) šie aukščiausio lygio skyriai pateikiami tokia tvarka:

```
Pradžia
Teikėjai
Deriniai
API raktai
Nustatymai
Analitika
Išlaidos       ← NAUJA (B grupė, 16 planas)
Stebėjimas     ← PERTVARKYTA (B grupė, 16 planas)
...
```

---

## Išlaidų skyrius (naujas, 1 lygis)

Kelio prefiksas: `/dashboard/costs/`

| Elementas           | URL                                  | Aprašymas                                             |
| ------------------- | ------------------------------------ | ----------------------------------------------------- |
| Apžvalga            | `/dashboard/costs`                   | Suvestinis išlaidų skydelis (perkeltas iš Analitikos) |
| Kainodara           | `/dashboard/costs/pricing`           | Kiekvieno modelio kainų lentelė                       |
| Biudžetas           | `/dashboard/costs/budget`            | Biudžeto ribinės vertės ir įspėjimai                  |
| Kvotos bendrinimas  | `/dashboard/costs/quota-share`       | Kvotos bendrinimo telkiniai ir naudojimas             |
| Plano konfigūracija | `/dashboard/costs/quota-share/plans` | Kiekvieno teikėjo plano perrašymai                    |

**Pagrindimas**: Kainodara, Biudžetas ir Kvotos bendrinimas anksčiau buvo
`Stebėjimas > Išlaidų parametrai` dalyje. Perkėlus juos į atskirą aukščiausio lygio
skyrių, juos galima rasti neperėjus per stebimumo įrankius.

---

## Stebėjimo skyrius (pertvarkytas)

Stebėjimo skyriaus **viršuje dabar yra Veikla**, o po jos pateikiami **3 pogrupiai**:

```
Stebėjimas
├── Veikla               ← Laiko juostos srautas (aukščiausio lygio elementas)
├── Žurnalų grupė
│   ├── Žurnalai (visi)
│   ├── Tarpinio serverio žurnalai
│   └── Konsolės žurnalai
├── Audito grupė
│   ├── Audito žurnalas
│   ├── MCP auditas
│   └── A2A auditas
└── Sistemos grupė
    ├── Būsena
    └── Vykdymo aplinka
```

### Kas pasikeitė, palyginti su sena struktūra

| Anksčiau                                                                                                   | Dabar                                               |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Veikla = Žurnalų skirtukas, kuriame buvo rodomas Audito žurnalas                                           | Veikla = atskiras srautas (`/dashboard/activity`)   |
| Išlaidų parametrų grupė Stebėjimo skyriuje                                                                 | Perkelta į Išlaidų skyrių                           |
| Vienas sąrašas: Žurnalai, Veikla (žurnalai), Auditas, Būsena, Vykdymo aplinka, Kainodara, Biudžetas, Kvota | Struktūra su 3 grupėmis ir atskiru Išlaidų skyriumi |

---

## Veikla ir Audito žurnalas

Dabar tai yra du skirtingi dalykai:

| Aspektas              | Veikla (`/dashboard/activity`)                                                         | Audito žurnalas (`/dashboard/audit`)                              |
| --------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Paskirtis**         | Naudotojams skirtas įvykių srautas („kas neseniai įvyko“)                              | Atitikties / saugumo žurnalas                                     |
| **Duomenų šaltinis**  | `GET /api/compliance/audit-log?level=high`                                             | `GET /api/compliance/audit-log?level=all`                         |
| **Formatas**          | Laiko juosta, sugrupuota pagal dieną, lengvai suprantami veiksmažodžiai ir piktogramos | Kompaktiška puslapiais suskirstyta lentelė, po 50 įrašų puslapyje |
| **Filtrai**           | Įvykio tipo kategorija                                                                 | Veiksmas, svarbos lygis, vykdytojas, datų intervalas              |
| **Eksportavimas**     | Nepasiekiamas                                                                          | JSON eksportavimas                                                |
| **Vykdytojo filtras** | Netaikoma                                                                              | Galima filtruoti pagal vykdytoją                                  |
| **Rodomi įvykiai**    | Tik aukšto lygio veiksmai (leidžiamųjų sąrašas)                                        | Visi audito įvykiai                                               |

### Aukšto lygio veiksmų leidžiamųjų sąrašas

Apibrėžtas faile `src/lib/audit/highLevelActions.ts`. Jis nustato, kurie įvykiai
rodomi Veiklos sraute. Leidžiamųjų sąrašą sudaro:

- Teikėjo pridėjimo / pašalinimo / testavimo įvykiai
- Derinio sukūrimas / atnaujinimas / ištrynimas
- API rakto gyvavimo ciklas (sukūrimas, atšaukimas, pakeitimas)
- Pasiekta biudžeto ribinė vertė
- Prisijungimas / atsijungimas
- Debesijos agento sesijos sukūrimas
- MCP įrankio registravimas
- Webhook sukūrimas / ištrynimas
- Kvotos telkinio / plano pakeitimai (`quota.*` veiksmai, B grupė)
- Platformos įvykiai (atnaujinimas, diegimas)
- Įgūdžio įdiegimas / pašalinimas

Į šį sąrašą neįtraukti įvykiai rodomi tik Audito žurnale.

### Naujo aukšto lygio veiksmo pridėjimas

Redaguokite `src/lib/audit/highLevelActions.ts` ir pridėkite veiksmo eilutę prie
`HIGH_LEVEL_ACTIONS`. Tam reikalingas PR (sąrašas apibrėžtas kode, jo negalima
konfigūruoti DB). Atitinkamą piktogramą galima pridėti faile
`src/lib/audit/activityIcons.ts`.

---

## Peradresavimas: `/dashboard/logs/activity`

Senasis kelias `/dashboard/logs/activity` naudojant `permanentRedirect()` visam
laikui peradresuojamas (HTTP 308) į `/dashboard/activity` faile
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Senasis šoninės juostos ID `logs-activity` išsaugotas `HIDEABLE_SIDEBAR_ITEM_IDS`
(bet pašalintas iš `SIDEBAR_DEFINITIONS`), kad nebūtų sugadintos naudotojų
išankstinės parinktys, kuriose nurodytas senasis ID.

---

## i18n

B grupės pridėtos vardų sritys:

| Vardų srities raktas    | Apima                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Išlaidų skyriaus etiketę                                                                     |
| `sidebar.activity`      | Veiklos elementą šoninėje juostoje                                                           |
| `sidebar.logsGroup`     | Žurnalų pogrupio etiketę                                                                     |
| `sidebar.systemGroup`   | Sistemos pogrupio etiketę                                                                    |
| `sidebar.costsOverview` | Išlaidų apžvalgos elementą                                                                   |
| `activity.*`            | Visas Veiklos puslapio eilutes (pavadinimą, veiksmažodžius, filtrus, tuščios būsenos tekstą) |

Pirminiai lokalizacijos šaltiniai: `pt-BR` ir `en`. Visoms kitoms 40 lokalizacijų
naudojama anglų kalba, pasitelkiant `next-intl` atsarginės kalbos mechanizmą
(sukonfigūruotą faile `src/i18n/config.ts`).
