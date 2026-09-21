# Monitoring & Costs — Navigation Structure (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Toteutettu ryhmässä B (suunnitelma 16). Katso `src/shared/constants/sidebarVisibility.ts`.

---

## Ylätason navigointi

Hallintapaneelin sivupalkissa (ryhmän B jälkeen) ovat seuraavat ylätason osiot tässä järjestyksessä:

```
Etusivu
Palveluntarjoajat
Yhdistelmät
API-avaimet
Asetukset
Analytiikka
Kustannukset   ← UUSI (ryhmä B, suunnitelma 16)
Valvonta       ← JÄRJESTELTY UUDELLEEN (ryhmä B, suunnitelma 16)
...
```

---

## Kustannukset-osio (uusi, taso 1)

Polun etuliite: `/dashboard/costs/`

| Kohde                 | URL                                  | Kuvaus                                                 |
| --------------------- | ------------------------------------ | ------------------------------------------------------ |
| Yleiskatsaus          | `/dashboard/costs`                   | Koottu kustannusnäkymä (siirretty Analytiikka-osiosta) |
| Hinnoittelu           | `/dashboard/costs/pricing`           | Mallikohtainen hinnoittelutaulukko                     |
| Budjetti              | `/dashboard/costs/budget`            | Budjettirajat + hälytykset                             |
| Kiintiön jakaminen    | `/dashboard/costs/quota-share`       | Quota Share -poolit + käyttö                           |
| Suunnitelman määritys | `/dashboard/costs/quota-share/plans` | Palveluntarjoajakohtaiset suunnitelman ohitukset       |

**Perustelu**: Hinnoittelu, Budjetti ja Kiintiön jakaminen olivat aiemmin
kohdassa `Valvonta > Kustannusparametrit`. Niiden siirtäminen omaan ylätason osioonsa
tekee niistä helposti löydettäviä ilman havainnoitavuustyökalujen kautta navigointia.

---

## Valvonta-osio (järjestelty uudelleen)

Valvonta-osiossa on nyt **Toiminta ylimpänä**, ja sen jälkeen **3 aliryhmää**:

```
Valvonta
├── Toiminta             ← Aikajanasyöte (ylätason kohde)
├── Lokit-ryhmä
│   ├── Lokit (kaikki)
│   ├── Välityspalvelinlokit
│   └── Konsolilokit
├── Tarkastus-ryhmä
│   ├── Tarkastusloki
│   ├── MCP-tarkastus
│   └── A2A-tarkastus
└── Järjestelmä-ryhmä
    ├── Terveys
    └── Suorituksenaikainen tila
```

### Muutokset vanhaan rakenteeseen verrattuna

| Ennen                                                                                                                    | Jälkeen                                            |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| Toiminta = Lokit-osion välilehti, joka näytti Tarkastuslokin                                                             | Toiminta = erillinen syöte (`/dashboard/activity`) |
| Kustannusparametrit-ryhmä Valvonta-osiossa                                                                               | Siirretty Kustannukset-osioon                      |
| Tasainen luettelo: Lokit, Toiminta (lokit), Tarkastus, Terveys, Suorituksenaikainen tila, Hinnoittelu, Budjetti, Kiintiö | Jäsennelty 3 ryhmään + erillinen Kustannukset-osio |

---

## Toiminta vs. Tarkastusloki

Nämä kaksi ovat nyt erillisiä:

| Ominaisuus                 | Toiminta (`/dashboard/activity`)                                  | Tarkastusloki (`/dashboard/audit`)          |
| -------------------------- | ----------------------------------------------------------------- | ------------------------------------------- |
| **Tarkoitus**              | Käyttäjälle suunnattu tapahtumasyöte ("mitä tapahtui äskettäin")  | Vaatimustenmukaisuus-/tietoturvaloki        |
| **Tietolähde**             | `GET /api/compliance/audit-log?level=high`                        | `GET /api/compliance/audit-log?level=all`   |
| **Muoto**                  | Aikajana, ryhmitelty päivittäin, selkokieliset verbit + kuvakkeet | Tiivis sivutettu taulukko, 50/sivu          |
| **Suodattimet**            | Tapahtumatyyppien luokka                                          | Toiminto, vakavuus, toimija, päivämääräväli |
| **Vienti**                 | Ei käytettävissä                                                  | JSON-vienti                                 |
| **Toimijasuodatin**        | Ei sovellu                                                        | Suodatettavissa toimijan mukaan             |
| **Näytettävät tapahtumat** | Vain ylätason toiminnot (sallittujen luettelo)                    | Kaikki tarkastustapahtumat                  |

### Ylätason toimintojen sallittujen luettelo

Määritetty tiedostossa `src/lib/audit/highLevelActions.ts`. Määrittää, mitkä tapahtumat näkyvät
Toiminta-syötteessä. Sallittujen luettelo sisältää:

- Palveluntarjoajan lisäys-, poisto- ja testaustapahtumat
- Yhdistelmän luonti, päivitys ja poisto
- API-avaimen elinkaari (luonti, kumoaminen, kierrätys)
- Budjettirajan saavuttaminen
- Tunnistautumisen sisään- ja uloskirjautuminen
- Pilviagentin istunnon luonti
- MCP-työkalun rekisteröinti
- Webhookin luonti ja poisto
- Kiintiöpoolin tai -suunnitelman muutokset (`quota.*`-toiminnot, ryhmä B)
- Alustatapahtumat (päivitys, käyttöönotto)
- Taidon asennus ja poisto

Tapahtumat, joita ei ole tässä luettelossa, näkyvät vain Tarkastuslokissa.

### Uuden ylätason toiminnon lisääminen

Muokkaa tiedostoa `src/lib/audit/highLevelActions.ts` ja lisää toimintomerkkijono kohteeseen
`HIGH_LEVEL_ACTIONS`. Tämä edellyttää PR:ää (luettelo on koodissa, eikä sitä voi määrittää tietokannan kautta).
Vastaava kuvake voidaan lisätä tiedostoon `src/lib/audit/activityIcons.ts`.

---

## Uudelleenohjaus: `/dashboard/logs/activity`

Vanha polku `/dashboard/logs/activity` uudelleenohjataan pysyvästi (HTTP 308) polkuun
`/dashboard/activity` käyttämällä funktiota `permanentRedirect()` tiedostossa
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Vanha sivupalkin tunniste `logs-activity` säilytetään kohteessa `HIDEABLE_SIDEBAR_ITEM_IDS`
(mutta poistetaan kohteesta `SIDEBAR_DEFINITIONS`), jotta vanhaan tunnisteeseen
viittaavat käyttäjien esiasetukset eivät rikkoudu.

---

## i18n

Ryhmän B lisäämät nimiavaruudet:

| Nimiavaruusavain        | Kattaa                                                                       |
| ----------------------- | ---------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Kustannukset-osion selite                                                    |
| `sidebar.activity`      | Toiminta-kohde sivupalkissa                                                  |
| `sidebar.logsGroup`     | Lokit-aliryhmän selite                                                       |
| `sidebar.systemGroup`   | Järjestelmä-aliryhmän selite                                                 |
| `sidebar.costsOverview` | Kustannusten yleiskatsauskohde                                               |
| `activity.*`            | Kaikki Toiminta-sivun merkkijonot (otsikko, verbit, suodattimet, tyhjä tila) |

Ensisijaiset lokaalit: `pt-BR` ja `en`. Kaikki muut 40 lokaalia käyttävät
englantia varakielenä `next-intl`-varamekanismin kautta (määritetty tiedostossa `src/i18n/config.ts`).
