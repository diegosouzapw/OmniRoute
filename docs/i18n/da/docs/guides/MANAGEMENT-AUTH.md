# Management Authentication (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute har **fire legitimationsfamilier**, der kan autorisere administrationsruter.
De kan ikke bruges i stedet for hinanden. Inferens-API-nøgler (`sk-…`) administrerer
**ikke** serveren, medmindre de udtrykkeligt er blevet tildelt omfanget `manage` eller `admin`.

Kanonisk implementering: `src/lib/api/requireManagementAuth.ts`.

| Legitimationsoplysninger | Typisk format                        | Oprettet hvor                                               | Tilsigtet brug                   | Administrationsmuligheder                                                                  |
| ------------------------ | ------------------------------------ | ----------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| Dashboard-JWT-session    | `auth_token`-cookie                  | Login på dashboardet                                        | Browsergrænseflade               | Fuld dashboardadministration underlagt regler om CSRF, lokalitet og altid beskyttede ruter |
| CLI-machine-id-token     | intern / lokal                       | CLI-bootstrap (`omniroute` på den samme maskine)            | Lokal CLI                        | Kun lokal administration                                                                   |
| Adgangstoken med omfang  | `oma_live_…`                         | **Indstillinger → Adgangstokens** eller `omniroute connect` | Fjern-CLI og administrations-API | Skal opfylde rutens påkrævede omfang `read`, `write` eller `admin`                         |
| Inferens-API-nøgle       | `sk-…` (og andre API-nøglepræfikser) | **API-administrator / API-nøgler**                          | `/v1/*`-inferens                 | **Ingen**, medmindre nøglens metadata inkluderer `manage` eller `admin`                    |

`oma_`-legitimationsoplysninger er administrations-/CLI-legitimationsoplysninger. De er **ikke** inferens-API-nøgler.

Hvis login-/API-nøglegodkendelse er deaktiveret for serveren, kan nogle administrationsruter
acceptere ikke-godkendte kald. Ruter, der kun er lokale eller altid er beskyttede, anvender
stadig deres egne regler. Det er derfor ikke altid obligatorisk at præsentere en af disse
legitimationsoplysninger, og det er heller ikke altid tilstrækkeligt at være i besiddelse af
en uden det påkrævede omfang og den påkrævede rutelokalitet.

Relateret: [Fjerntilstand](./REMOTE-MODE.md) (hvordan `oma_live_…` udstedes til en fjern-CLI).

---

## Omfangsmatricer

Omfang for administration af API-nøgler og omfang for adgangstokens bruger forskellige ordforråd.
Omfang for MCP-værktøjer udgør et tredje ordforråd, som kontrolleres med `scopeMatches` i stedet for
nogen af funktionerne i tabellerne nedenfor. Side om side:
[Tre navnerum for omfang](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Omfang for adgangstokens (`oma_live_…`)

| Omfang  | Typiske handlinger                                                                            |
| ------- | --------------------------------------------------------------------------------------------- |
| `read`  | GET-anmodninger til lister/status, som tokenet har tilladelse til at se                       |
| `write` | Ændringer (opret/opdater/slet) under administratorniveau                                      |
| `admin` | Fuld ekstern CLI / forbindelsestoken (standardindstillingen for adgangskode-bootstrap er her) |

Et token med `read` kan ikke kalde en `write`-rute. Formen på runtime-meddelelsen:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Omfang for administration af API-nøgler

| Omfang   | Betydning                                                                                |
| -------- | ---------------------------------------------------------------------------------------- |
| (intet)  | Kun inferens. Administrationsruter returnerer 403.                                       |
| `manage` | Administrations-API (samme adgangskontrol som API-nøglegrenen i `requireManagementAuth`) |
| `admin`  | Opfylder også `hasManageScope` (behandles som egnet til administration)                  |

Aktivér `manage` for nøglen i brugergrænsefladen API Keys / API Manager. Genbrug ikke en
chatklientnøgle til automatisering, medmindre du bevidst har tildelt den dette omfang.

---

## Sådan opretter og tilbagekalder du

### Dashboard-JWT-session

1. Åbn `/login`, og log ind med administrationsadgangskoden (`INITIAL_PASSWORD` ved første opstart).
2. Cookien `auth_token` er HttpOnly. Browserdashboardet bruger den automatisk.
3. Log ud via `/api/auth/logout`. Der er ingen langtidsholdbar hemmelighed at kopiere.

### CLI-maskin-id-token

1. Kør `omniroute` på **samme vært** som serveren (loopback).
2. CLI'en bootstrapper et maskin-id-token under `~/.omniroute/` (chmod 600).
3. Dette fungerer **ikke** fra en anden maskine. Brug et adgangstoken til en fjern-CLI.

### Adgangstoken med scope (`oma_live_…`)

1. Dashboard: **Indstillinger → Adgangstokens** → opret (navn + scope). **Hemmeligheden vises én gang.**
2. Eller CLI: `omniroute connect <host>` (adgangskode → token). Se [Fjerntilstand](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Tilbagekald fra den samme side med adgangstokens (eller slet CLI-konteksten).
5. Serveren gemmer kun en hash. Behandl klarteksten som en adgangskode.

### API-nøgle med administrationsscope

1. Dashboard: **API-administrator / API-nøgler** → opret eller rediger en nøgle → aktivér `manage` (eller `admin`).
2. Header: `Authorization: Bearer sk-…` (nøglens faktiske præfiks).
3. Tilbagekald nøglen, eller fjern `manage` i den samme brugergrænseflade.
4. Brug færrest mulige rettigheder til automatisering, der ikke er CLI'en: Foretræk et `read`-adgangstoken til opgaver, der kun bruger GET; brug kun `manage` på en API-nøgle, når kalderen også skal kommunikere med både `/v1` og administrationsgrænsefladen.

---

## Headerformat

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Anbring ikke administrationslegitimationsoplysninger i URL-stien eller forespørgselsstrengen. Administrationsgodkendelse må kun angives via header/cookie.

---

## Eksempler til kopiering og indsættelse

Skrivebeskyttet (vis udbydere). Brug et `read`-adgangstoken:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Ændring (opret en udbyderforbindelse). Brug et `write`/`admin`-adgangstoken eller en API-nøgle med `manage`-scope:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferens (ikke administration). Almindelig API-nøgle; `manage` er ikke påkrævet:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Aktuelle runtime-fejl (afslør ikke hemmeligheder)

| Situation                                              | Typisk status | Meddelelse (sanitiseret)                                             |
| ------------------------------------------------------ | ------------- | -------------------------------------------------------------------- |
| Ingen legitimationsoplysninger                         | 401           | `Authentication required`                                            |
| Ugyldig/udløbet `oma_live_…`                           | 401           | `Invalid or expired access token`                                    |
| Gyldig API-nøgle uden `manage`/`admin`                 | 403           | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Ugyldig almindelig API-nøgle på en administrationsrute | 403           | `Invalid management token`                                           |
| Access Token-scope er for lavt                         | 403           | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" betyder, at bearer-tokenet **ikke** blev accepteret som en
administrationslegitimationsoplysning. Det fortæller dig **ikke**, hvilken type du skal oprette. Brug tabellen ovenfor:
inferensnøgler kræver `manage`-scope; fjern-CLI'en kræver `oma_live_…`; dashboardet
bruger sessionscookien.

---

## Anbefalet valg med færrest mulige rettigheder

| Kaldende part                                         | Brug                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| Browser                                               | Dashboard-session                                            |
| CLI på serverværten                                   | Maskintoken                                                  |
| CLI på en laptop, der kommunikerer med en fjernserver | `oma_live_…` fra `omniroute connect`                         |
| CI / scripts (kun administration)                     | `oma_live_…` med det mindst mulige omfang, der fungerer      |
| CI, der skal kalde både `/v1` og `/api`               | API-nøgle med `manage` **eller** to legitimationsoplysninger |
