# Monitoring & Costs — Navigation Structure (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

# Nadzor i troškovi — Struktura navigacije

> Implementirano u Grupi B (plan 16). Pogledajte `src/shared/constants/sidebarVisibility.ts`.

---

## Navigacija visokog nivoa

Bočna traka kontrolne ploče (nakon Grupe B) ima sljedeće sekcije najvišeg nivoa po redu:

```
Home
Providers
Combos
API Keys
Settings
Analytics
Costs          ← NOVO (Grupa B, plan 16)
Monitoring     ← REORGANIZOVANO (Grupa B, plan 16)
...
```

---

## Sekcija Troškovi (nova, nivo 1)

Prefiks putanje: `/dashboard/costs/`

| Stavka              | URL                                  | Opis                                                           |
| ------------------- | ------------------------------------ | -------------------------------------------------------------- |
| Pregled             | `/dashboard/costs`                   | Agregirana kontrolna ploča troškova (premješteno iz Analitike) |
| Cijene              | `/dashboard/costs/pricing`           | Tabela cijena po modelu                                        |
| Budžet              | `/dashboard/costs/budget`            | Pragovi budžeta + upozorenja                                   |
| Dijeljenje kvota    | `/dashboard/costs/quota-share`       | Poolovi dijeljenja kvota + upotreba                            |
| Konfiguracija plana | `/dashboard/costs/quota-share/plans` | Nadjačavanja plana po provajderu                               |

**Obrazloženje**: Cijene, Budžet i Dijeljenje kvota su se prethodno nalazili pod `Monitoring > Parametri troškova`. Premještanje u namjensku sekciju najvišeg nivoa čini ih lakšim za otkrivanje bez navigacije kroz alate za opservabilnost.

---

## Sekcija Monitoring (reorganizovana)

Sekcija Monitoring sada ima **Aktivnost na vrhu** praćenu sa **3 podgrupe**:

```
Monitoring
├── Activity             ← Feed vremenske linije (stavka najvišeg nivoa)
├── Grupa Logovi
│   ├── Logovi (svi)
│   ├── Proxy logovi
│   └── Konzolni logovi
├── Grupa Revizija
│   ├── Revizijski log
│   ├── MCP revizija
│   └── A2A revizija
└── Grupa Sistem
    ├── Zdravlje
    └── Runtime
```

### Šta se promijenilo u odnosu na staru strukturu

| Prije                                                                                       | Poslije                                            |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Aktivnost = kartica unutar Logova koja je prikazivala Revizijski log                        | Aktivnost = namjenski feed (`/dashboard/activity`) |
| Grupa Parametri troškova u Monitoringu                                                      | Premješteno u sekciju Troškovi                     |
| Ravna lista: Logovi, Aktivnost (logovi), Revizija, Zdravlje, Runtime, Cijene, Budžet, Kvota | Strukturirane 3 grupe + namjenska sekcija Troškovi |

---

## Aktivnost vs Revizijski log

Ove dvije stavke su sada različite:

| Dimenzija              | Aktivnost (`/dashboard/activity`)                                     | Revizijski log (`/dashboard/audit`)       |
| ---------------------- | --------------------------------------------------------------------- | ----------------------------------------- |
| **Svrha**              | Feed događaja za korisnike ("šta se nedavno desilo")                  | Log usklađenosti / sigurnosti             |
| **Izvor podataka**     | `GET /api/compliance/audit-log?level=high`                            | `GET /api/compliance/audit-log?level=all` |
| **Format**             | Vremenska linija, grupisana po danu, glagoli čitljivi ljudima + ikone | Gusta paginirana tabela, 50 po stranici   |
| **Filteri**            | Kategorija tipa događaja                                              | Akcija, ozbiljnost, akter, raspon datuma  |
| **Izvoz**              | Nije dostupno                                                         | JSON izvoz                                |
| **Filter aktera**      | Nije primjenjivo                                                      | Može se filtrirati po akteru              |
| **Prikazani događaji** | Samo akcije visokog nivoa (lista dozvoljenih)                         | Svi revizijski događaji                   |

### Lista dozvoljenih akcija visokog nivoa

Definisano u `src/lib/audit/highLevelActions.ts`. Kontroliše koji se događaji pojavljuju u feedu Aktivnosti. Lista dozvoljenih uključuje:

- Događaji dodavanja/uklanjanja/testiranja provajdera
- Kreiranje/ažuriranje/brisanje kombinacija
- Životni ciklus API ključa (kreiranje, opoziv, rotacija)
- Dostignut prag budžeta
- Auth prijava/odjava
- Kreiranje sesije cloud agenta
- Registracija MCP alata
- Kreiranje/brisanje webhooka
- Promjene poola/plana kvota (`quota.*` akcije, Grupa B)
- Platformski događaji (ažuriranje, raspoređivanje)
- Instalacija/uklanjanje vještine

Događaji koji nisu na ovoj listi pojavljuju se samo u Revizijskom logu.

### Dodavanje nove akcije visokog nivoa

Uredite `src/lib/audit/highLevelActions.ts` i dodajte string akcije u `HIGH_LEVEL_ACTIONS`. Ovo zahtijeva PR (lista je kod, nije konfigurabilna putem baze podataka). Odgovarajuća ikona se može dodati u `src/lib/audit/activityIcons.ts`.

---

## Preusmjeravanje: `/dashboard/logs/activity`

Stara putanja `/dashboard/logs/activity` je trajno preusmjerena (HTTP 308) na `/dashboard/activity` putem `permanentRedirect()` u `src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Naslijeđeni ID bočne trake `logs-activity` je sačuvan u `HIDEABLE_SIDEBAR_ITEM_IDS` (ali uklonjen iz `SIDEBAR_DEFINITIONS`) kako bi se izbjeglo narušavanje korisničkih postavki koje referenciraju stari ID.

---

## i18n

Imenski prostori dodati od strane Grupe B:

| Ključ imenskog prostora | Pokriva                                                                     |
| ----------------------- | --------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Oznaka sekcije troškova                                                     |
| `sidebar.activity`      | Stavka bočne trake aktivnosti                                               |
| `sidebar.logsGroup`     | Oznaka podgrupe logova                                                      |
| `sidebar.systemGroup`   | Oznaka podgrupe sistema                                                     |
| `sidebar.costsOverview` | Stavka pregleda troškova                                                    |
| `activity.*`            | Svi stringovi stranice Aktivnosti (naslov, glagoli, filteri, prazno stanje) |

Izvorni lokaliteti (source-of-truth): `pt-BR` i `en`. Svi ostali 40 lokaliteta koriste engleski kao rezervni putem `next-intl` mehanizma (konfigurisanog u `src/i18n/config.ts`).
