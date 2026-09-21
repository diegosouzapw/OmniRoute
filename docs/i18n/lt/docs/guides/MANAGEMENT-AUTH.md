# Management Authentication (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute turi **keturias prisijungimo duomenų grupes**, kuriomis galima autorizuoti valdymo maršrutus.
Jos nėra tarpusavyje pakeičiamos. Išvadų API raktai (`sk-…`) **nevaldo**
serverio, nebent jiems buvo aiškiai suteikta `manage` arba `admin` aprėptis.

Kanoninis įgyvendinimas: `src/lib/api/requireManagementAuth.ts`.

| Prisijungimo duomenys            | Įprasta forma                          | Kur sukuriami                                             | Paskirtis                     | Valdymo galimybės                                                                                         |
| -------------------------------- | -------------------------------------- | --------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| Valdymo skydelio JWT sesija      | `auth_token` slapukas                  | Prisijungiant prie valdymo skydelio                       | Naršyklės sąsaja              | Visas valdymas per valdymo skydelį, atsižvelgiant į CSRF, vietovės ir visada apsaugotų maršrutų taisykles |
| CLI įrenginio ID prieigos raktas | vidinis / vietinis                     | Pradinė CLI sąranka (`omniroute` tame pačiame įrenginyje) | Vietinis CLI                  | Tik vietinis valdymas                                                                                     |
| Aprėptį turintis prieigos raktas | `oma_live_…`                           | **Settings → Access Tokens** arba `omniroute connect`     | Nuotolinis CLI ir valdymo API | Turi atitikti maršrutui reikalingą `read`, `write` arba `admin` aprėptį                                   |
| Išvadų API raktas                | `sk-…` (ir kiti API raktų priešdėliai) | **API Manager / API Keys**                                | `/v1/*` išvados               | **Jokių**, nebent rakto metaduomenyse yra `manage` arba `admin`                                           |

`oma_` prisijungimo duomenys yra valdymo / CLI prisijungimo duomenys. Jie **nėra** išvadų API raktai.

Jei prisijungimo / API rakto autentifikavimas serveryje išjungtas, kai kurie valdymo maršrutai gali
priimti neautentifikuotas užklausas. Tik vietiniams ir visada apsaugotiems maršrutams vis tiek taikomos
jų pačių taisyklės. Todėl pateikti vienus iš šių prisijungimo duomenų ne visada
privaloma, o juos turėti ne visada pakanka, jei nėra reikiamos
aprėpties arba neatitinkama maršruto vietovės sąlyga.

Susijusi informacija: [Nuotolinis režimas](./REMOTE-MODE.md) (kaip `oma_live_…` sukuriamas nuotoliniam CLI).

---

## Aprėpčių matricos

Šie du aprėpčių žodynai yra **skirtingi**. Jų nemaišykite.

### Prieigos rakto aprėptys (`oma_live_…`)

| Aprėptis | Įprastos operacijos                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `read`   | Sąrašų / būsenos GET užklausos, kurias prieigos raktui leidžiama matyti                                                       |
| `write`  | Žemesnio nei administratoriaus lygio pakeitimai (kūrimas / atnaujinimas / šalinimas)                                          |
| `admin`  | Visavertis nuotolinio CLI / prisijungimo prieigos raktas (numatytasis slaptažodžiu atliekamos pradinės sąrankos pasirinkimas) |

Prieigos raktas su `read` negali iškviesti `write` maršruto. Vykdymo metu pateikiamas pranešimas:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API rakto valdymo aprėptys

| Aprėptis | Reikšmė                                                                                   |
| -------- | ----------------------------------------------------------------------------------------- |
| (nėra)   | Tik išvados. Valdymo maršrutai grąžina 403.                                               |
| `manage` | Valdymo API (tas pats patikros mechanizmas kaip `requireManagementAuth` API rakto šakoje) |
| `admin`  | Taip pat atitinka `hasManageScope` (laikoma, kad raktas gali atlikti valdymą)             |

Įjunkite rakto `manage` aprėptį API Keys / API Manager sąsajoje. Nenaudokite
pokalbių kliento rakto automatizavimui, nebent sąmoningai suteikėte jam šią aprėptį.

---

## Kaip sukurti ir atšaukti

### Valdymo skydelio JWT sesija

1. Atidarykite `/login` ir prisijunkite naudodami valdymo slaptažodį (`INITIAL_PASSWORD` pirmojo paleidimo metu).
2. Slapukas `auth_token` yra HttpOnly. Naršyklės valdymo skydelis jį naudoja automatiškai.
3. Atsijunkite per `/api/auth/logout`. Nėra jokios ilgalaikės paslapties, kurią reikėtų nukopijuoti.

### CLI įrenginio ID prieigos raktas

1. Paleiskite `omniroute` **tame pačiame pagrindiniame kompiuteryje** kaip ir serveris (per loopback).
2. CLI sukuria pradinį įrenginio ID prieigos raktą kataloge `~/.omniroute/` (chmod 600).
3. Tai **neveikia** iš kito įrenginio. Nuotoliniam CLI naudokite prieigos raktą.

### Aprėptį turintis prieigos raktas (`oma_live_…`)

1. Valdymo skydelyje: **Settings → Access Tokens** → sukurkite (pavadinimas + aprėptis). **Paslaptis parodoma tik vieną kartą.**
2. Arba CLI: `omniroute connect <host>` (slaptažodis → prieigos raktas). Žr. [Nuotolinis režimas](./REMOTE-MODE.md).
3. Antraštė: `Authorization: Bearer oma_live_…`
4. Atšaukite tame pačiame Access Tokens puslapyje (arba pašalinkite CLI kontekstą).
5. Serveris saugo tik maišos reikšmę. Nešifruotą reikšmę saugokite kaip slaptažodį.

### `manage` aprėptį turintis API raktas

1. Valdymo skydelyje: **API Manager / API Keys** → sukurkite arba redaguokite raktą → įjunkite `manage` (arba `admin`).
2. Antraštė: `Authorization: Bearer sk-…` (tikrasis rakto priešdėlis).
3. Atšaukite raktą arba pašalinkite `manage` toje pačioje sąsajoje.
4. Automatizavimui, kuriam nenaudojamas CLI, taikykite mažiausių privilegijų principą: tik GET užduotims rinkitės `read` prieigos raktą; API raktui suteikite `manage` tik tada, kai klientas turi naudoti ir `/v1`, ir valdymo sąsają.

---

## Antraštės formatas

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Nedėkite valdymo prisijungimo duomenų į URL kelią ar užklausos eilutę. Valdymo
autentifikavimui naudojama tik antraštė arba slapukas.

---

## Kopijavimo ir įklijavimo pavyzdžiai

Tik skaitymui (teikėjų sąrašui gauti). Naudokite `read` prieigos prieigos raktą:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Keitimui (teikėjo ryšiui sukurti). Naudokite `write` / `admin` prieigos raktą arba
API raktą su `manage` apimtimi:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Išvadoms gauti (ne valdymui). Įprastas API raktas, `manage` nereikalinga:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Dabartinės vykdymo aplinkos klaidos (neatkartokite slaptų duomenų)

| Situacija                                       | Įprastas būsenos kodas | Pranešimas (nuasmenintas)                                                        |
| ----------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| Nėra prisijungimo duomenų                       | 401                    | `Reikalingas autentifikavimas`                                                   |
| Netinkamas arba nebegaliojantis `oma_live_…`    | 401                    | `Netinkamas arba nebegaliojantis prieigos raktas`                                |
| Galiojantis API raktas be `manage` / `admin`    | 403                    | `API raktui trūksta „manage“ apimties. Įjunkite ją API raktų valdymo skydelyje.` |
| Netinkamas įprastas API raktas valdymo maršrute | 403                    | `Netinkamas valdymo prieigos raktas`                                             |
| Nepakankama prieigos rakto apimtis              | 403                    | `Prieigos rakto apimtis „<have>“ yra nepakankama; reikalinga „<need>“.`          |

„Netinkamas valdymo prieigos raktas“ reiškia, kad pateiktas prieigos raktas **nebuvo**
priimtas kaip valdymo prisijungimo duomuo. Tai **nenurodo**, kurios šeimos raktą
reikia sugeneruoti. Vadovaukitės pirmiau pateikta lentele: išvadų raktams reikia
`manage` apimties; nuotolinei CLI reikia `oma_live_…`; valdymo skydelyje naudojamas
seanso slapukas.

---

## Rekomenduojamas mažiausių privilegijų pasirinkimas

| Kvietėjas                                                                  | Naudotina priemonė                                          |
| -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Naršyklė                                                                   | Valdymo skydelio seansas                                    |
| CLI serverio pagrindiniame kompiuteryje                                    | Įrenginio prieigos raktas                                   |
| CLI nešiojamajame kompiuteryje, prisijungiančiame prie nuotolinio serverio | `oma_live_…` iš `omniroute connect`                         |
| CI / scenarijai (tik valdymui)                                             | `oma_live_…` su mažiausia tinkama apimtimi                  |
| CI, kuri turi kreiptis ir į `/v1`, ir į `/api`                             | API raktas su `manage` **arba** dveji prisijungimo duomenys |
