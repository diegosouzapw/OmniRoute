# Management Authentication (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute turi **keturias kredencialų šeimas**, kurios gali autorizuoti valdymo maršrutus.
Jos nėra tarpusavyje keičiamos. Inference API raktai (`sk-…`) **nevaldo**
serverio, nebent jiems buvo aiškiai suteikta `manage` arba `admin` apimtis.

Kanoninė implementacija: `src/lib/api/requireManagementAuth.ts`.

| Kredencialas               | Tipinė forma                         | Sukurta kur                                                | Numatytas naudojimas          | Valdymo galimybė                                                                                    |
| -------------------------- | ------------------------------------ | ---------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| Valdymo pulto JWT sesija   | `auth_token` slapukas                | Prisijungimas prie valdymo pulto                           | Naršyklės vartotojo sąsaja    | Visas valdymo pulto valdymas, atsižvelgiant į CSRF, lokalumo ir visada apsaugotų maršrutų taisykles |
| CLI mašinos ID žetonas     | vidinis / vietinis                   | CLI paleidimas (`omniroute` toje pačioje mašinoje)         | Vietinis CLI                  | Tik vietinis valdymas                                                                               |
| Apribotos prieigos žetonas | `oma_live_…`                         | **Nustatymai → Prieigos žetonai** arba `omniroute connect` | Nuotolinis CLI ir valdymo API | Turi atitikti maršruto reikalaujamą `read`, `write` arba `admin` apimtį                             |
| Inference API raktas       | `sk-…` (ir kiti API raktų prefiksai) | **API tvarkyklė / API raktai**                             | `/v1/*` inference             | **Jokio** nebent rakto metaduomenyse yra `manage` arba `admin`                                      |

`oma_` kredencialai yra valdymo/CLI kredencialai. Jie **nėra** inference API raktai.

Jei prisijungimo/API rakto autentifikavimas yra išjungtas serveryje, kai kurie valdymo maršrutai gali
priimti neautentifikuotus iškvietimus. Tik vietiniai ir visada apsaugoti maršrutai vis tiek taiko
savo taisykles. Todėl vieno iš šių kredencialų pateikimas nėra visuotinai
privalomas, ir jo turėjimas nėra visuotinai pakankamas be reikiamos
apimties ir maršruto lokalumo.

Susiję: [Nuotolinis režimas](./REMOTE-MODE.md) (kaip `oma_live_…` yra sukuriamas nuotoliniam CLI).

---

## Apimties matricos

API rakto valdymo apimtys ir prieigos žetonų apimtys yra skirtingi žodynai.
MCP įrankio apimtys yra trečias žodynas, tikrinamas naudojant `scopeMatches`, o ne
bet kurią iš žemiau esančių lentelių funkcijų. Gretinimas:
[Trys apimties vardų sritys](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Prieigos žetonų apimtys (`oma_live_…`)

| Apimtis | Tipinės operacijos                                                                       |
| ------- | ---------------------------------------------------------------------------------------- |
| `read`  | Sąrašo/būsenos GET užklausos, kurias žetonas gali matyti                                 |
| `write` | Mutacijos (kurti/atnaujinti/ištrinti) žemiau administratoriaus lygio                     |
| `admin` | Visiškas nuotolinis CLI / prisijungimo žetonas (čia numatytasis slaptažodžio paleidimas) |

Žetonas su `read` negali iškviesti `write` maršruto. Vykdymo laiko pranešimo forma:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API rakto valdymo apimtys

| Apimtis  | Reikšmė                                                                   |
| -------- | ------------------------------------------------------------------------- |
| (jokia)  | Tik inference. Valdymo maršrutai grąžina 403.                             |
| `manage` | Valdymo API (tas pats vartai kaip `requireManagementAuth` API rakto šaka) |
| `admin`  | Taip pat atitinka `hasManageScope` (laikoma galinčia valdyti)             |

Įjunkite `manage` raktui API raktų / API tvarkyklės vartotojo sąsajoje. Nenaudokite
pokalbių kliento rakto automatizavimui, nebent sąmoningai suteikėte tą apimtį.

---

## Kaip sukurti ir atšaukti

### Valdymo pulto JWT sesija

1. Atidarykite `/login`, prisijunkite naudodami valdymo slaptažodį (`INITIAL_PASSWORD` pirmojo paleidimo metu).
2. Slapukas `auth_token` yra HttpOnly. Naršyklės valdymo pultas jį naudoja automatiškai.
3. Atsijunkite per `/api/auth/logout`. Nėra ilgalaikio slapto rakto, kurį būtų galima nukopijuoti.

### CLI mašinos ID prieigos raktas

1. Paleiskite `omniroute` tame **pačiame serveryje** kaip ir serveris (loopback).
2. CLI sukuria mašinos ID prieigos raktą kataloge `~/.omniroute/` (chmod 600).
3. Tai **neveikia** iš kitos mašinos. Nuotoliniam CLI naudokite prieigos raktą (Access Token).

### Apriboto veikimo prieigos raktas (Scoped Access Token) (`oma_live_…`)

1. Valdymo pultas: **Nustatymai → Prieigos raktai** → sukurti (pavadinimas + apimtis). **Slaptas raktas rodomas tik vieną kartą.**
2. Arba CLI: `omniroute connect <host>` (slaptažodis → prieigos raktas). Žr. [Nuotolinis režimas](./REMOTE-MODE.md).
3. Antraštė: `Authorization: Bearer oma_live_…`
4. Atšaukite iš to paties Prieigos raktų puslapio (arba ištrinkite CLI kontekstą).
5. Serveris saugo tik maišos funkcijos rezultatą (hash). Su paprastu tekstu elkitės kaip su slaptažodžiu.

### Valdymo apimties API raktas (Manage-scoped API key)

1. Valdymo pultas: **API valdytojas / API raktai** → sukurti arba redaguoti raktą → įjungti `manage` (arba `admin`).
2. Antraštė: `Authorization: Bearer sk-…` (tikrasis rakto priešdėlis).
3. Atšaukite arba pašalinkite `manage` tame pačiame vartotojo sąsajos lange.
4. Mažiausių privilegijų principas automatizavimui, kuris nėra CLI: teikite pirmenybę `read` prieigos raktui (Access Token) tik GET užklausoms; naudokite `manage` API rakte tik tada, kai iškvietėjas taip pat turi bendrauti su `/v1` ir valdymo funkcijomis.

---

## Antraštės formatas

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Nedėkite valdymo kredencialų į URL kelią ar užklausos eilutę. Valdymo
autentifikavimas vykdomas tik per antraštę/slapuką.

---

## Kopijavimo ir įklijavimo pavyzdžiai

Tik skaitymui (sąrašo teikėjai). Naudokite `read` prieigos raktą (Access Token):

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Keitimui (sukurti teikėjo ryšį). Naudokite `write`/`admin` prieigos raktą (Access Token) arba
valdymo apimties API raktą (manage-scoped API key):

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Išvadoms (ne valdymui). Įprastas API raktas, `manage` nereikalingas:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Dabartinės vykdymo klaidos (neskelbti slaptų duomenų)

| Situation                                      | Typical status | Message (sanitized)                                                  |
| ---------------------------------------------- | -------------- | -------------------------------------------------------------------- |
| No credential                                  | 401            | `Authentication required`                                            |
| Invalid/expired `oma_live_…`                   | 401            | `Invalid or expired access token`                                    |
| Valid API key without `manage`/`admin`         | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Invalid ordinary API key on a management route | 403            | `Invalid management token`                                           |
| Access Token scope too low                     | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Invalid management token“ reiškia, kad nešėjas **nebuvo** priimtas kaip valdymo
kredencialas. Tai **nenurodo**, kokios rūšies raktą reikia sukurti. Naudokite aukščiau pateiktą lentelę:
išvadų raktai reikalauja `manage` apimties; nuotoliniam CLI reikia `oma_live_…`; valdymo pultas
naudoja sesijos slapuką.

## Rekomenduojamas mažiausių privilegijų pasirinkimas

| Iškviestojas                                                         | Naudojimas                                      |
| :------------------------------------------------------------------- | :---------------------------------------------- |
| Naršyklė                                                             | Prietaisų skydelio sesija                       |
| CLI serverio pagrindiniame kompiuteryje                              | Mašinos prieigos raktas                         |
| CLI nešiojamajame kompiuteryje, bendraujantis su nuotoliniu serveriu | `oma_live_…` iš `omniroute connect`             |
| CI / scenarijai (tik valdymui)                                       | `oma_live_…` su mažiausia veikiančia apimtimi   |
| CI, kuris turi iškviesti ir `/v1`, ir `/api`                         | API raktas su `manage` **arba** du kredencialai |
