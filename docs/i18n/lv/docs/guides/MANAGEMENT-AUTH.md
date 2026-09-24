# Management Authentication (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ir **četras akreditācijas datu saimes**, kas var autorizēt pārvaldības maršrutus.
Tās nav savstarpēji aizstājamas. Secinājumu API atslēgas (`sk-…`) **nepārvalda**
serveri, ja vien tām nav skaidri piešķirta `manage` vai `admin` darbības joma.

Kanonska implementācija: `src/lib/api/requireManagementAuth.ts`.

| Akreditācijas dati                 | Tipiska forma                         | Izveidots kur                                        | Paredzētais lietojums               | Pārvaldības iespējas                                                                           |
| ---------------------------------- | ------------------------------------- | ---------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| Paneļa JWT sesija                  | `auth_token` sīkfails                 | Paneļa pieteikšanās                                  | Pārlūkprogrammas lietotāja saskarne | Pilna paneļa pārvaldība, ievērojot CSRF, lokalitātes un vienmēr aizsargāto maršrutu noteikumus |
| CLI mašīnas-ID marķieris           | iekšējs / lokāls                      | CLI sāknēšana (`omniroute` tajā pašā mašīnā)         | Lokāls CLI                          | Tikai lokāla pārvaldība                                                                        |
| Darbības jomas piekļuves marķieris | `oma_live_…`                          | **Settings → Access Tokens** vai `omniroute connect` | Attālais CLI un pārvaldības API     | Jāatbilst maršruta nepieciešamajai `read`, `write` vai `admin` darbības jomai                  |
| Secinājumu API atslēga             | `sk-…` (un citi API atslēgu prefiksi) | **API Manager / API Keys**                           | `/v1/*` secinājumi                  | **Nav**, ja vien atslēgas metadatos nav iekļauts `manage` vai `admin`                          |

`oma_` akreditācijas dati ir pārvaldības/CLI akreditācijas dati. Tās **nav** secinājumu API atslēgas.

Ja serverim ir atspējota pieteikšanās/API atslēgas autentifikācija, daži pārvaldības maršruti var
pieņemt neautentificētus zvanus. Tikai lokāli un vienmēr aizsargāti maršruti joprojām piemēro
savus noteikumus. Tādēļ viena no šīm akreditācijas datu uzrādīšana nav universāli
obligāta, un tās esamība nav universāli pietiekama bez nepieciešamās
darbības jomas un maršruta lokalitātes.

Saistīts: [Attālais režīms](./REMOTE-MODE.md) (kā `oma_live_…` tiek izveidots attālam CLI).

---

## Darbības jomu matricas

API atslēgu pārvaldības darbības jomas un piekļuves pilnvaru darbības jomas ir atšķirīgas vārdnīcas.
MCP rīka darbības jomas ir trešā vārdnīca, kas tiek pārbaudīta ar `scopeMatches`, nevis ar kādu no tālāk esošajās tabulās minētajām funkcijām. Salīdzinājumam:
[Trīs darbības jomu nosaukumvietas](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Piekļuves pilnvaru darbības jomas (`oma_live_…`)

| Darbības joma | Tipiskās darbības                                                            |
| ------------- | ---------------------------------------------------------------------------- |
| `read`        | Saraksta/statusa GET pieprasījumi, ko pilnvara drīkst redzēt                 |
| `write`       | Mutācijas (izveidot/atjaunināt/dzēst) zem administratora līmeņa              |
| `admin`       | Pilna attālā CLI / savienojuma pilnvara (šeit noklusējuma paroles sāknēšana) |

Pilnvara ar `read` nevar izsaukt `write` maršrutu. Izpildlaika ziņojuma forma:
`Piekļuves pilnvaras darbības joma '<have>' nav pietiekama; nepieciešama '<need>'`

### API atslēgu pārvaldības darbības jomas

| Darbības joma | Nozīme                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------- |
| (nav)         | Tikai secinājums. Pārvaldības maršruti atgriež 403.                                         |
| `manage`      | Pārvaldības API (tāda pati piekļuves kontrole kā `requireManagementAuth` API atslēgas zarā) |
| `admin`       | Apstiprina arī `hasManageScope` (uzskatīts par pārvaldības spējīgu)                         |

Iespējojiet `manage` atslēgai API atslēgu / API pārvaldnieka lietotāja saskarnē. Neizmantojiet tērzēšanas klienta atslēgu automatizācijai, ja vien jūs apzināti neesat piešķīris šo darbības jomu.

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

## Pašreizējās izpildlaika kļūdas (neizvadīt slepenos datus)

| Situācija                                         | Tipiskais statuss | Ziņojums (sanitizēts)                                                |
| :------------------------------------------------ | :---------------- | :------------------------------------------------------------------- |
| Nav akreditācijas datu                            | 401               | `Authentication required`                                            |
| Nederīgs/beidzies `oma_live_…`                    | 401               | `Invalid or expired access token`                                    |
| Derīga API atslēga bez `manage`/`admin`           | 403               | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Nederīga parasta API atslēga pārvaldības maršrutā | 403               | `Invalid management token`                                           |
| Piekļuves pilnvaras tvērums ir pārāk zems         | 403               | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" nozīmē, ka nesējs **netika** pieņemts kā pārvaldības
akreditācijas dati. Tas **nenorāda**, kuru saimi izveidot. Izmantojiet iepriekš redzamo tabulu:
secinājumu atslēgām ir nepieciešams `manage` tvērums; attālajai CLI ir nepieciešams `oma_live_…`; informācijas panelis
izmanto sesijas sīkfailu.

---

## Ieteicamā mazāko privilēģiju izvēle

| Izsaucējs                                      | Lietojums                                               |
| :--------------------------------------------- | :------------------------------------------------------ |
| Pārlūkprogramma                                | Paneļa sesija                                           |
| CLI servera resursdatorā                       | Mašīnas marķieris                                       |
| CLI klēpjdatorā, kas sazinās ar attālo serveri | `oma_live_…` no `omniroute connect`                     |
| CI / skripti (tikai pārvaldībai)               | `oma_live_…` ar mazāko darbības jomu, kas darbojas      |
| CI, kam jāizsauc gan `/v1`, gan `/api`         | API atslēga ar `manage` **vai** divi akreditācijas dati |
