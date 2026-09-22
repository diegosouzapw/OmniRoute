# Management Authentication (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute har **fire legitimasjonsfamilier** som kan autorisere administrasjonsruter.
De kan ikke brukes om hverandre. API-nøkler for inferens (`sk-…`) administrerer **ikke**
serveren med mindre de uttrykkelig har fått omfanget `manage` eller `admin`.

Kanonisk implementasjon: `src/lib/api/requireManagementAuth.ts`.

| Legitimasjon                | Typisk format                         | Opprettet hvor                                                | Tiltenkt bruk                      | Administrasjonsmulighet                                                                                  |
| --------------------------- | ------------------------------------- | ------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| JWT-økt for kontrollpanelet | `auth_token`-informasjonskapsel       | Innlogging i kontrollpanelet                                  | Nettlesergrensesnitt               | Full administrasjon via kontrollpanelet, underlagt regler for CSRF, lokalitet og alltid beskyttede ruter |
| Maskin-ID-token for CLI     | internt / lokalt                      | CLI-initialisering (`omniroute` på samme maskin)              | Lokal CLI                          | Kun lokal administrasjon                                                                                 |
| Tilgangstoken med omfang    | `oma_live_…`                          | **Innstillinger → Tilgangstokener** eller `omniroute connect` | Ekstern CLI og administrasjons-API | Må oppfylle rutens påkrevde omfang `read`, `write` eller `admin`                                         |
| API-nøkkel for inferens     | `sk-…` (og andre API-nøkkelprefikser) | **API-administrator / API-nøkler**                            | `/v1/*`-inferens                   | **Ingen** med mindre nøkkelens metadata inkluderer `manage` eller `admin`                                |

`oma_`-legitimasjon brukes til administrasjon/CLI. Den er **ikke** en API-nøkkel for inferens.

Hvis innlogging/API-nøkkelautentisering er deaktivert for serveren, kan enkelte administrasjonsruter
godta uautentiserte kall. Ruter som kun er lokale, og ruter som alltid er beskyttet, følger fortsatt
sine egne regler. Det er derfor ikke alltid obligatorisk å oppgi en av disse legitimasjonene,
og det å ha en slik legitimasjon er heller ikke alltid tilstrekkelig uten det nødvendige
omfanget og riktig rutelokalitet.

Relatert: [Ekstern modus](./REMOTE-MODE.md) (hvordan `oma_live_…` utstedes for en ekstern CLI).

---

## Omfangsmatriser

Disse to omfangsvokabularene er **forskjellige**. Ikke bland dem.

### Omfang for tilgangstokener (`oma_live_…`)

| Omfang  | Typiske operasjoner                                                                          |
| ------- | -------------------------------------------------------------------------------------------- |
| `read`  | Liste-/statusforespørsler med GET som tokenet har tilgang til å se                           |
| `write` | Endringer (opprett/oppdater/slett) under administratornivå                                   |
| `admin` | Full ekstern CLI / tilkoblingstoken (passordbasert initialisering bruker dette som standard) |

Et token med `read` kan ikke kalle en `write`-rute. Meldingsformat under kjøring:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Administrasjonsomfang for API-nøkler

| Omfang   | Betydning                                                                                   |
| -------- | ------------------------------------------------------------------------------------------- |
| (ingen)  | Kun inferens. Administrasjonsruter returnerer 403.                                          |
| `manage` | Administrasjons-API (samme tilgangskontroll som API-nøkkelgrenen i `requireManagementAuth`) |
| `admin`  | Oppfyller også `hasManageScope` (behandles som administrasjonsberettiget)                   |

Aktiver `manage` for nøkkelen i grensesnittet for API-nøkler / API-administratoren. Ikke gjenbruk en
klientnøkkel for chat til automatisering med mindre du uttrykkelig har gitt den dette omfanget.

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

## Gjeldende kjøretidsfeil (ikke gjengi hemmeligheter)

| Situasjon                                            | Typisk status | Melding (sanert)                                                     |
| ---------------------------------------------------- | ------------- | -------------------------------------------------------------------- |
| Ingen legitimasjon                                   | 401           | `Authentication required`                                            |
| Ugyldig/utløpt `oma_live_…`                          | 401           | `Invalid or expired access token`                                    |
| Gyldig API-nøkkel uten `manage`/`admin`              | 403           | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Ugyldig ordinær API-nøkkel på en administrasjonsrute | 403           | `Invalid management token`                                           |
| Tilgangstokenets omfang er for lavt                  | 403           | `Access token scope '<have>' is insufficient; '<need>' required.`    |

«Invalid management token» betyr at bearer-tokenet **ikke** ble godkjent som
administrasjonslegitimasjon. Det forteller deg **ikke** hvilken type du skal opprette. Bruk tabellen ovenfor:
Inferensnøkler trenger `manage`-omfang, ekstern CLI trenger `oma_live_…`, og kontrollpanelet
bruker øktinformasjonskapselen.

---

## Anbefalt valg med minste privilegium

| Klient                                                             | Bruk                                                |
| ------------------------------------------------------------------ | --------------------------------------------------- |
| Nettleser                                                          | Kontrollpaneløkt                                    |
| CLI på serververten                                                | Maskintoken                                         |
| CLI på en bærbar datamaskin som kommuniserer med en ekstern server | `oma_live_…` fra `omniroute connect`                |
| CI / skript (kun administrasjon)                                   | `oma_live_…` med det minste omfanget som fungerer   |
| CI som må kalle både `/v1` og `/api`                               | API-nøkkel med `manage` **eller** to legitimasjoner |
