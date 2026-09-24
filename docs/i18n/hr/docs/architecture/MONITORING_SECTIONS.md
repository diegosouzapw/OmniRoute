# Monitoring & Costs — Navigation Structure (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementirano u Grupi B (plan 16). Pogledajte `src/shared/constants/sidebarVisibility.ts`.

---

## Navigacija visoke razine

Bočna traka nadzorne ploče (nakon Grupe B) sadrži sljedeće odjeljke najviše razine, navedenim redoslijedom:

```
Početna
Pružatelji usluga
Kombinacije
API ključevi
Postavke
Analitika
Troškovi      ← NOVO (Grupa B, plan 16)
Nadzor         ← REORGANIZIRANO (Grupa B, plan 16)
...
```

---

## Odjeljak Troškovi (novi, 1. razina)

Prefiks putanje: `/dashboard/costs/`

| Stavka              | URL                                  | Opis                                                           |
| ------------------- | ------------------------------------ | -------------------------------------------------------------- |
| Pregled             | `/dashboard/costs`                   | Objedinjena nadzorna ploča troškova (premještena iz Analitike) |
| Cijene              | `/dashboard/costs/pricing`           | Tablica cijena po modelu                                       |
| Proračun            | `/dashboard/costs/budget`            | Pragovi proračuna + upozorenja                                 |
| Dijeljenje kvote    | `/dashboard/costs/quota-share`       | Skupovi za dijeljenje kvote + upotreba                         |
| Konfiguracija plana | `/dashboard/costs/quota-share/plans` | Prilagođavanja plana po pružatelju usluga                      |

**Obrazloženje**: Cijene, Proračun i Dijeljenje kvote prethodno su se nalazili pod
`Nadzor > Parametri troškova`. Premještanjem u zaseban odjeljak najviše razine
postaju dostupni bez potrebe za navigacijom kroz alate za opservabilnost.

---

## Odjeljak Nadzor (reorganiziran)

Odjeljak Nadzor sada ima **Aktivnost na vrhu**, nakon koje slijede **3 podgrupe**:

```
Nadzor
├── Aktivnost             ← Kronološki sažetak (stavka najviše razine)
├── Grupa Zapisnici
│   ├── Zapisnici (svi)
│   ├── Zapisnici proxyja
│   └── Zapisnici konzole
├── Grupa Revizija
│   ├── Revizijski zapisnik
│   ├── MCP revizija
│   └── A2A revizija
└── Grupa Sustav
    ├── Stanje
    └── Izvršavanje
```

### Što se promijenilo u odnosu na staru strukturu

| Prije                                                                                                 | Poslije                                             |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Aktivnost = kartica unutar Zapisnika koja je prikazivala Revizijski zapisnik                          | Aktivnost = zaseban sažetak (`/dashboard/activity`) |
| Grupa Parametri troškova unutar Nadzora                                                               | Premještena u odjeljak Troškovi                     |
| Ravan popis: Zapisnici, Aktivnost (zapisnici), Revizija, Stanje, Izvršavanje, Cijene, Proračun, Kvota | Strukturirano u 3 grupe + zaseban odjeljak Troškovi |

---

## Aktivnost i Revizijski zapisnik

To su sada dvije različite značajke:

| Dimenzija              | Aktivnost (`/dashboard/activity`)                           | Revizijski zapisnik (`/dashboard/audit`)      |
| ---------------------- | ----------------------------------------------------------- | --------------------------------------------- |
| **Svrha**              | Sažetak događaja za korisnike („što se nedavno dogodilo”)   | Zapisnik za usklađenost / sigurnost           |
| **Izvor podataka**     | `GET /api/compliance/audit-log?level=high`                  | `GET /api/compliance/audit-log?level=all`     |
| **Format**             | Vremenska crta, grupirana po danu, čitljivi glagoli + ikone | Zbijena tablica s paginacijom, 50 po stranici |
| **Filtri**             | Kategorija vrste događaja                                   | Radnja, ozbiljnost, izvršitelj, raspon datuma |
| **Izvoz**              | Nije dostupan                                               | Izvoz u JSON formatu                          |
| **Filtar izvršitelja** | Nije primjenjivo                                            | Moguće filtriranje prema izvršitelju          |
| **Prikazani događaji** | Samo radnje visoke razine (popis dopuštenih radnji)         | Svi revizijski događaji                       |

### Popis dopuštenih radnji visoke razine

Definiran je u `src/lib/audit/highLevelActions.ts`. Određuje koji će se događaji
pojaviti u sažetku Aktivnosti. Popis dopuštenih radnji uključuje:

- Događaje dodavanja/uklanjanja/testiranja pružatelja usluga
- Stvaranje/ažuriranje/brisanje kombinacija
- Životni ciklus API ključa (stvaranje, opoziv, rotacija)
- Dosegnut prag proračuna
- Prijavu/odjavu autentifikacije
- Stvaranje sesije agenta u oblaku
- Registraciju MCP alata
- Stvaranje/brisanje webhooka
- Promjene skupova/planova kvota (radnje `quota.*`, Grupa B)
- Događaje platforme (ažuriranje, implementacija)
- Instalaciju/uklanjanje vještine

Događaji koji nisu na ovom popisu pojavljuju se samo u Revizijskom zapisniku.

### Dodavanje nove radnje visoke razine

Uredite `src/lib/audit/highLevelActions.ts` i dodajte niz radnje u
`HIGH_LEVEL_ACTIONS`. Za to je potreban PR (popis je dio kôda i ne može se
konfigurirati putem baze podataka). Odgovarajuća ikona može se dodati u
`src/lib/audit/activityIcons.ts`.

---

## Preusmjeravanje: `/dashboard/logs/activity`

Stara putanja `/dashboard/logs/activity` trajno se preusmjerava (HTTP 308) na
`/dashboard/activity` putem funkcije `permanentRedirect()` u
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Naslijeđeni ID bočne trake `logs-activity` zadržan je u `HIDEABLE_SIDEBAR_ITEM_IDS`
(ali je uklonjen iz `SIDEBAR_DEFINITIONS`) kako se ne bi narušile korisničke
unaprijed definirane postavke koje upućuju na stari ID.

---

## i18n

Prostori naziva koje je dodala Grupa B:

| Ključ prostora naziva   | Obuhvaća                                                                 |
| ----------------------- | ------------------------------------------------------------------------ |
| `sidebar.costsSection`  | Oznaku odjeljka Troškovi                                                 |
| `sidebar.activity`      | Stavku Aktivnost na bočnoj traci                                         |
| `sidebar.logsGroup`     | Oznaku podgrupe Zapisnici                                                |
| `sidebar.systemGroup`   | Oznaku podgrupe Sustav                                                   |
| `sidebar.costsOverview` | Stavku pregleda troškova                                                 |
| `activity.*`            | Sve tekstove stranice Aktivnost (naslov, glagole, filtre, prazno stanje) |

Izvorni lokaliteti: `pt-BR` i `en`. Svih ostalih 40 lokaliteta vraća se na
engleski putem zamjenskog mehanizma paketa `next-intl` (konfiguriranog u `src/i18n/config.ts`).
