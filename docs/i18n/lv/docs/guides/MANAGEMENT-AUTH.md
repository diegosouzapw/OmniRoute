# Management Authentication (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ir **četras akreditācijas datu saimes**, kas var autorizēt pārvaldības maršrutus.
Tās nav savstarpēji aizvietojamas. Secinājumu API atslēgas (`sk-…`) **nevar** pārvaldīt
serveri, ja vien tām nav tieši piešķirts tvērums `manage` vai `admin`.

Kanoniskā implementācija: `src/lib/api/requireManagementAuth.ts`.

| Akreditācijas dati             | Tipiskā forma                         | Kur izveidoti                                              | Paredzētais lietojums               | Pārvaldības iespējas                                                                                     |
| ------------------------------ | ------------------------------------- | ---------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Informācijas paneļa JWT sesija | `auth_token` sīkdatne                 | Pieteikšanās informācijas panelī                           | Pārlūkprogrammas lietotāja saskarne | Pilna pārvaldība informācijas panelī, ievērojot CSRF, lokāluma un vienmēr aizsargāto maršrutu noteikumus |
| CLI ierīces ID tokens          | iekšējs / lokāls                      | CLI sākotnējā iestatīšana (`omniroute` tajā pašā ierīcē)   | Lokālais CLI                        | Tikai lokāla pārvaldība                                                                                  |
| Tvēruma piekļuves tokens       | `oma_live_…`                          | **Iestatījumi → Piekļuves tokeni** vai `omniroute connect` | Attālais CLI un pārvaldības API     | Jāatbilst maršrutam nepieciešamajam `read`, `write` vai `admin` tvērumam                                 |
| Secinājumu API atslēga         | `sk-…` (un citi API atslēgu prefiksi) | **API pārvaldnieks / API atslēgas**                        | `/v1/*` secinājumi                  | **Nav**, ja vien atslēgas metadatos nav ietverts `manage` vai `admin`                                    |

`oma_` akreditācijas dati ir pārvaldības/CLI akreditācijas dati. Tie **nav** secinājumu API atslēgas.

Ja serverī ir atspējota pieteikšanās/API atslēgu autentifikācija, daži pārvaldības maršruti var
pieņemt neautentificētus izsaukumus. Tikai lokāliem un vienmēr aizsargātiem maršrutiem joprojām ir
spēkā savi noteikumi. Tādēļ kādu no šiem akreditācijas datiem norādīt nav obligāti
visos gadījumos, un to esamība nav pietiekama visos gadījumos bez nepieciešamā
tvēruma un maršruta lokāluma.

Saistītā informācija: [Attālais režīms](./REMOTE-MODE.md) (kā `oma_live_…` tiek izveidots attālajam CLI).

---

## Tvērumu matricas

Šīs divas tvērumu vārdnīcas ir **atšķirīgas**. Nejauciet tās.

### Piekļuves tokena tvērumi (`oma_live_…`)

| Tvērums | Tipiskās darbības                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------------- |
| `read`  | Saraksta/statusa GET pieprasījumi, kurus tokenam ir atļauts skatīt                                             |
| `write` | Izmaiņu veikšana (izveide/atjaunināšana/dzēšana), kam nav nepieciešamas administratora tiesības                |
| `admin` | Pilna attālā CLI / savienojuma pilnvarošana (paroles sākotnējā iestatīšana pēc noklusējuma izmanto šo tvērumu) |

Tokens ar `read` nevar izsaukt `write` maršrutu. Izpildlaika ziņojuma forma:
`Piekļuves tokena tvērums '<have>' nav pietiekams; nepieciešams '<need>'.`

### API atslēgu pārvaldības tvērumi

| Tvērums  | Nozīme                                                                          |
| -------- | ------------------------------------------------------------------------------- |
| (nav)    | Tikai secinājumiem. Pārvaldības maršruti atgriež 403.                           |
| `manage` | Pārvaldības API (tā pati pārbaude kā `requireManagementAuth` API atslēgas zarā) |
| `admin`  | Atbilst arī `hasManageScope` (tiek uzskatīts par piemērotu pārvaldībai)         |

Iespējojiet atslēgai `manage` API atslēgu / API pārvaldnieka lietotāja saskarnē. Neizmantojiet
tērzēšanas klienta atslēgu automatizācijai, ja vien neesat apzināti piešķīris tai šo tvērumu.

---

## Kā izveidot un atsaukt

### Informācijas paneļa JWT sesija

1. Atveriet `/login` un piesakieties ar pārvaldības paroli (`INITIAL_PASSWORD` pirmajā palaišanas reizē).
2. Sīkdatne `auth_token` ir HttpOnly. Pārlūkprogrammas informācijas panelis to izmanto automātiski.
3. Atsakieties, izmantojot `/api/auth/logout`. Nav ilgtermiņa noslēpuma, ko kopēt.

### CLI ierīces ID tokens

1. Palaidiet `omniroute` servera **tajā pašā resursdatorā** (atgriezeniskās cilpas saskarnē).
2. CLI izveido ierīces ID tokenu direktorijā `~/.omniroute/` (chmod 600).
3. Tas **nedarbojas** no citas ierīces. Attālajam CLI izmantojiet piekļuves tokenu.

### Tvēruma piekļuves tokens (`oma_live_…`)

1. Informācijas panelis: **Iestatījumi → Piekļuves tokeni** → izveidot (nosaukums + tvērums). **Noslēpums tiek parādīts vienreiz.**
2. Vai CLI: `omniroute connect <host>` (parole → tokens). Skatiet [Attālais režīms](./REMOTE-MODE.md).
3. Galvene: `Authorization: Bearer oma_live_…`
4. Atsauciet tajā pašā piekļuves tokenu lapā (vai izdzēsiet CLI kontekstu).
5. Serveris glabā tikai jaucējvērtību. Rīkojieties ar atklāto tekstu kā ar paroli.

### API atslēga ar pārvaldības tvērumu

1. Informācijas panelis: **API pārvaldnieks / API atslēgas** → izveidojiet vai rediģējiet atslēgu → iespējojiet `manage` (vai `admin`).
2. Galvene: `Authorization: Bearer sk-…` (atslēgas faktiskais prefikss).
3. Atsauciet vai noņemiet `manage` tajā pašā lietotāja saskarnē.
4. Mazāko privilēģiju princips automatizācijai, kas nav CLI: darbiem tikai ar GET pieprasījumiem dodiet priekšroku `read` piekļuves tokenam; izmantojiet `manage` API atslēgai tikai tad, ja izsaucējam jāizmanto gan `/v1`, gan pārvaldība.

---

## Galvenes formāts

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Neievietojiet pārvaldības akreditācijas datus URL ceļā vai vaicājuma virknē. Pārvaldības
autentifikācijai izmantojiet tikai galveni/sīkfailu.

---

## Kopēšanai un ielīmēšanai gatavi piemēri

Tikai lasīšanai (pakalpojumu sniedzēju saraksta iegūšana). Izmantojiet `read` piekļuves pilnvaru:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Izmaiņu veikšanai (pakalpojumu sniedzēja savienojuma izveide). Izmantojiet `write`/`admin` piekļuves pilnvaru vai
API atslēgu ar `manage` tvērumu:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferencēšanai (nevis pārvaldībai). Parasta API atslēga; `manage` nav nepieciešams:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Pašreizējās izpildlaika kļūdas (neatspoguļojiet noslēpumus)

| Situācija                                         | Tipiskais statuss | Ziņojums (sanitizēts)                                                                |
| ------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| Nav akreditācijas datu                            | 401               | `Nepieciešama autentifikācija`                                                       |
| Nederīga/novecojusi `oma_live_…`                  | 401               | `Nederīga piekļuves pilnvara vai beidzies tās derīguma termiņš`                      |
| Derīga API atslēga bez `manage`/`admin`           | 403               | `API atslēgai nav tvēruma 'manage'. Iespējojiet to API atslēgu informācijas panelī.` |
| Nederīga parastā API atslēga pārvaldības maršrutā | 403               | `Nederīga pārvaldības pilnvara`                                                      |
| Piekļuves pilnvaras tvērums ir nepietiekams       | 403               | `Piekļuves pilnvaras tvērums '<have>' nav pietiekams; nepieciešams '<need>'.`        |

„Nederīga pārvaldības pilnvara” nozīmē, ka uzrādītāja pilnvara **netika** pieņemta kā pārvaldības
akreditācijas dati. Tas **nenorāda**, kuras saimes pilnvara jāizveido. Izmantojiet iepriekš minēto tabulu:
inferencēšanas atslēgām nepieciešams `manage` tvērums; attālinātajai CLI nepieciešama `oma_live_…`; informācijas
panelis izmanto sesijas sīkfailu.

---

## Ieteicamā mazāko privilēģiju izvēle

| Izsaucējs                                      | Izmantojamais līdzeklis                                 |
| ---------------------------------------------- | ------------------------------------------------------- |
| Pārlūkprogramma                                | Informācijas paneļa sesija                              |
| CLI servera resursdatorā                       | Iekārtas pilnvara                                       |
| CLI klēpjdatorā, kas sazinās ar attālu serveri | `oma_live_…` no `omniroute connect`                     |
| CI / skripti (tikai pārvaldībai)               | `oma_live_…` ar mazāko nepieciešamo tvērumu             |
| CI, kam jāizsauc gan `/v1`, gan `/api`         | API atslēga ar `manage` **vai** divi akreditācijas dati |
