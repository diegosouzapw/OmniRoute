# Management Authentication (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute har **fire legitimasjonsfamilier** som kan autorisere administrasjonsruter.
De er ikke utskiftbare. Inference API-nøkler (`sk-…`) administrerer **ikke** serveren med mindre de eksplisitt ble tildelt `manage`- eller `admin`-omfang.

Kanonisk implementasjon: `src/lib/api/requireManagementAuth.ts`.

| Legitimasjon                | Typisk form                            | Opprettet hvor                                                | Tiltenkt bruk                    | Administrasjonskapasitet                                                                       |
| --------------------------- | -------------------------------------- | ------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| Dashboard JWT-sesjon        | `auth_token`-cookie                    | Dashboard-pålogging                                           | Nettleser-UI                     | Full dashboard-administrasjon, underlagt CSRF, lokalitet og regler for alltid-beskyttede ruter |
| CLI maskin-ID-token         | intern / lokal                         | CLI-oppstart (`omniroute` på samme maskin)                    | Lokal CLI                        | Kun lokal administrasjon                                                                       |
| Omfangsbasert tilgangstoken | `oma_live_…`                           | **Innstillinger → Tilgangstokener** eller `omniroute connect` | Fjern-CLI og administrasjons-API | Må tilfredsstille rutens påkrevde `read`-, `write`- eller `admin`-omfang                       |
| Inference API-nøkkel        | `sk-…` (og andre API-nøkkel-prefikser) | **API-behandler / API-nøkler**                                | `/v1/*` inferens                 | **Ingen** med mindre nøkkelmetadataene inkluderer `manage` eller `admin`                       |

`oma_`-legitimasjoner er administrasjons-/CLI-legitimasjoner. De er **ikke** inference API-nøkler.

Hvis pålogging/API-nøkkel-autentisering er deaktivert for serveren, kan noen administrasjonsruter akseptere uautentiserte kall. Kun-lokale og alltid-beskyttede ruter anvender fortsatt sine egne regler. Å presentere en av disse legitimasjonene er derfor ikke universelt obligatorisk, og å besitte en er ikke universelt tilstrekkelig uten det påkrevde omfanget og rutelokaliteten.

Relatert: [Fjernmodus](./REMOTE-MODE.md) (hvordan `oma_live_…` preges for en fjern-CLI).

---

## Omfangsmatriser

API-nøkkeladministrasjons-scopes og access-token-scopes er forskjellige vokabularer.
MCP-verktøy-scopes er et tredje vokabular, sjekket med `scopeMatches` i stedet for
noen av funksjonene i tabellene nedenfor. Side om side:
[Tre scope-navneområder](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Access Token-scopes (`oma_live_…`)

| Scope   | Typiske operasjoner                                                  |
| ------- | -------------------------------------------------------------------- |
| `read`  | Liste-/status-GET-forespørsler som tokenet har tillatelse til å se   |
| `write` | Mutasjoner (opprett/oppdater/slett) under admin                      |
| `admin` | Full fjern-CLI / tilkoblingstoken (passord-bootstrap standarder her) |

Et token med `read` kan ikke kalle en `write`-rute. Kjøretidsmeldingsformat:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-nøkkeladministrasjons-scopes

| Scope    | Betydning                                                                   |
| -------- | --------------------------------------------------------------------------- |
| (ingen)  | Kun inferens. Administrasjonsruter returnerer 403.                          |
| `manage` | Administrasjons-API (samme port som `requireManagementAuth` API-nøkkelgren) |
| `admin`  | Tilfredsstiller også `hasManageScope` (behandles som administrasjonsdyktig) |

Aktiver `manage` på nøkkelen i API Keys / API Manager UI. Ikke gjenbruk en
chat-klientnøkkel for automatisering med mindre du bevisst har gitt den scopet.

---

## Slik oppretter og tilbakekaller du

### JWT-økt for kontrollpanelet

1. Åpne `/login`, og logg inn med administrasjonspassordet (`INITIAL_PASSWORD` ved første oppstart).
2. Informasjonskapselen `auth_token` er HttpOnly. Nettleserens kontrollpanel bruker den automatisk.
3. Logg ut via `/api/auth/logout`. Det finnes ingen langvarig hemmelighet som kan kopieres.

### Maskin-ID-token for CLI

1. Kjør `omniroute` på **samme vert** som serveren (tilbakekoblingsgrensesnittet).
2. CLI-en initialiserer et maskin-ID-token under `~/.omniroute/` (chmod 600).
3. Dette fungerer **ikke** fra en annen maskin. Bruk et tilgangstoken for ekstern CLI.

### Tilgangstoken med omfang (`oma_live_…`)

1. Kontrollpanel: **Innstillinger → Tilgangstokener** → opprett (navn + omfang). **Hemmeligheten vises én gang.**
2. Eller CLI: `omniroute connect <host>` (passord → token). Se [Ekstern modus](./REMOTE-MODE.md).
3. Topptekst: `Authorization: Bearer oma_live_…`
4. Tilbakekall fra den samme siden for tilgangstokener (eller slett CLI-konteksten).
5. Serveren lagrer bare en hash. Behandle klarteksten som et passord.

### API-nøkkel med administrasjonsomfang

1. Kontrollpanel: **API-administrator / API-nøkler** → opprett eller rediger en nøkkel → aktiver `manage` (eller `admin`).
2. Topptekst: `Authorization: Bearer sk-…` (nøkkelens faktiske prefiks).
3. Tilbakekall nøkkelen eller fjern `manage` i det samme grensesnittet.
4. Minste privilegium for automatisering som ikke bruker CLI: Foretrekk et `read`-tilgangstoken for jobber som kun bruker GET; bruk `manage` på en API-nøkkel bare når kalleren også må kommunisere med `/v1` og administrasjonsgrensesnittet.

---

## Topptekstformat

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Ikke legg administrasjonslegitimasjon i URL-banen eller spørringsstrengen. Autentisering for
administrasjon skal kun angis i en topptekst eller informasjonskapsel.

---

## Eksempler som kan kopieres og limes inn

Skrivebeskyttet (vis leverandører). Bruk et `read`-tilgangstoken:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Endring (opprett en leverandørtilkobling). Bruk et `write`-/`admin`-tilgangstoken eller en
API-nøkkel med `manage`-omfang:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferens (ikke administrasjon). Ordinær API-nøkkel, `manage` er ikke påkrevd:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Gjeldende kjøretidsfeil (ikke vis hemmeligheter)

| Situasjon                                           | Typisk status | Melding (renset)                                                             |
| :-------------------------------------------------- | :------------ | :--------------------------------------------------------------------------- |
| Ingen legitimasjon                                  | 401           | `Autentisering påkrevd`                                                      |
| Ugyldig/utløpt `oma_live_…`                         | 401           | `Ugyldig eller utløpt tilgangstoken`                                         |
| Gyldig API-nøkkel uten `manage`/`admin`             | 403           | `API-nøkkelen mangler 'manage'-omfang. Aktiver den i API-nøkkel-dashbordet.` |
| Ugyldig vanlig API-nøkkel på en administrasjonsrute | 403           | `Ugyldig administrasjonstoken`                                               |
| Tilgangstoken-omfang for lavt                       | 403           | `Tilgangstoken-omfang '<have>' er utilstrekkelig; '<need>' påkrevd.`         |

"Ugyldig administrasjonstoken" betyr at bæreren **ikke** ble akseptert som en
administrasjonslegitimasjon. Det forteller deg **ikke** hvilken familie du skal
prege. Bruk tabellen ovenfor: inferensnøkler trenger `manage`-omfang; fjern-CLI
trenger `oma_live_…`; dashbordet bruker sesjonskapselen.

---

## Anbefalt valg med minst privilegier

| Kaller                                                             | Bruk                                                |
| :----------------------------------------------------------------- | :-------------------------------------------------- |
| Nettleser                                                          | Dashboard-sesjon                                    |
| CLI på serververten                                                | Maskintoken                                         |
| CLI på en bærbar datamaskin som kommuniserer med en ekstern server | `oma_live_…` fra `omniroute connect`                |
| CI / skript (kun administrasjon)                                   | `oma_live_…` med det minste omfanget som fungerer   |
| CI som må kalle både `/v1` og `/api`                               | API-nøkkel med `manage` **eller** to legitimasjoner |
