# Kiro Setup Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Denne veiledningen beskriver hvordan du legger til Kiro-kontoer (AWS-driftet AI-kodingsassistent) i OmniRoute,
med fokus på å kjøre flere kontoer samtidig uten øktkonflikter.

---

## Bakgrunn: Hvorfor Kiro-kontoer kan komme i konflikt

Kiros serverdel bruker AWS SSO OIDC-klientregistreringer til å spore aktive økter.
Den avgjørende begrensningen er: **Hver OIDC-klientregistrering støtter bare én aktiv
økt om gangen**. Når en annen enhet eller bruker autentiserer seg med den samme
registrerte klienten, ugyldiggjør serverdelen oppdateringstokenet til den første kontoen.

Dette er den samme mekanismen som skaper problemer når du kjører `kiro-cli login` på en
maskin der en annen Kiro-konto allerede er logget på – den nye påloggingen tilbakekaller
tokenet til den første kontoen.

---

## Slik løser OmniRoute dette (v3.8.0+)

Fra og med v3.8.0 kaller OmniRoute `registerClient()` (AWS SSO OIDC) under hver
import av en Kiro-tilkobling. Dette gir hver OmniRoute-tilkobling sin egen dedikerte
OIDC-klientregistrering. Fordi hver klientregistrering er uavhengig, påvirker ikke
oppdatering eller ny autentisering av én konto oppdateringstokenet til noen annen konto.

Isolasjonen gjelder importmetodene for oppdateringstokener, mens autentisering med API-nøkkel
unngår OIDC-oppdateringsøkter fullstendig:

| Importmetode                                           | Isolasjonsstatus                                                                                                 |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC-enhetskodeflyt                    | Isolert siden enhetskodeflyten ble introdusert                                                                   |
| **Importer token** (lim inn oppdateringstoken manuelt) | Isolert fra v3.8.0                                                                                               |
| **Google-/GitHub-pålogging**                           | Isolert fra v3.8.0                                                                                               |
| **Automatisk import** (kiro-cli SQLite)                | Isolert fra v3.8.0 (SQLite-banen var allerede isolert; reserveløsningen med SSO-hurtigbuffer er nå også isolert) |
| **API-nøkkel** (langlivet CodeWhisperer-nøkkel)        | Ingen oppdateringsøkt; nøkkelen valideres og lagres som en bearer-legitimasjon                                   |

---

## Merknad om migrering av tilkoblinger opprettet før v3.8.0

Tilkoblinger som ble importert før v3.8.0, har ikke en dedikert OIDC-klientregistrering
lagret i `providerSpecificData`. Disse tilkoblingene fortsetter å fungere, men bruker det delte
endepunktet for oppdatering av sosial autentisering, noe som betyr at to slike tilkoblinger fortsatt kan ugyldiggjøre
hverandre.

**For å oppnå isolasjon:** Slett den gamle tilkoblingen fra **Kontrollpanel → Leverandører**, og
importer den på nytt ved hjelp av en av de støttede importflytene. Alle nyopprettede tilkoblinger vil
automatisk få sin egen klientregistrering.

---

## Legge til to Kiro-kontoer side om side

### Forutsetninger

- OmniRoute v3.8.0 eller nyere.
- En fungerende Kiro-konto (e-postadresse + passord, Google- eller GitHub-pålogging).
- Eventuelt en annen Kiro-konto.

### Trinn 1: Importer den første kontoen

1. Åpne **Kontrollpanel → Leverandører → Legg til leverandør → Kiro**.
2. Velg ett av følgende:
   - **Importer token** – lim inn et oppdateringstoken som begynner med `aorAAAAAG`.
   - **API-nøkkel** – lim inn en langlivet Kiro-/CodeWhisperer-API-nøkkel.
   - **Google-/GitHub-pålogging** – fullfør OAuth-flyten i nettleseren.
   - **Automatisk import** – klikk på knappen; OmniRoute leser legitimasjonen fra den
     lokale kiro-cli-databasen eller `~/.aws/sso/cache`.
3. Tilkoblingen lagres. Flyter for oppdateringstokener registrerer automatisk en dedikert
   OIDC-klient. Flyter for API-nøkler validerer nøkkelen mot AWS og lagrer ikke et oppdateringstoken.

### Trinn 2: Importer den andre kontoen

Gjenta trinn 1 for den andre kontoen. Fordi hver import oppretter en separat
OIDC-klientregistrering, er de to tilkoblingene fullstendig isolert.

### Trinn 3: Kontroller at begge tilkoblingene er aktive

1. **Kontrollpanel → Leverandører** – begge Kiro-tilkoblingene skal vise statusen **Aktiv**.
2. **Kontrollpanel → Tilstand** – begge tilkoblingene skal bestå helsekontrollen for tokenet.

### Trinn 4: Bruk en kombinasjon til å rute mellom kontoene

Opprett en kombinasjon med begge tilkoblingene som mål for å lastbalansere eller bruke dem som reserveløsning:

```
kiro/kiro-dev → kiro/kiro-pro
```

Se [FEATURES.md](./FEATURES.md) og rutingsdokumentasjonen for konfigurasjon av kombinasjoner.

---

## Enterprise-/IDC-brukere

For AWS IAM Identity Center-kontoer (IDC) bruker du flyten med **AWS Builder ID / IDC-enhetskode**
fra **Dashboard → Providers → Kiro → Device Code**. Enhetskodeflyten har
alltid vært fullstendig isolert. Disse tilkoblingene trenger ikke å importeres på nytt.

Enterprise-brukere som opererer i en annen AWS-region enn standardregionen, kan angi regionen ved
import via Import Token-API-et:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Feltet `region` bruker som standard `us-east-1` når det utelates.

---

## Importflyt for API-nøkler

Autentisering med API-nøkkel er beregnet på varige bearer-legitimasjoner for Kiro / AWS CodeWhisperer. Den
bruker ikke OAuth-oppdatering og unngår derfor ugyldiggjøring av delte OIDC-økter.

### Kontrollpanel

1. Åpne **Dashboard -> Providers -> Kiro**.
2. Velg **API Key**.
3. Lim inn API-nøkkelen og eventuelt AWS-regionen (`us-east-1` som standard).
4. OmniRoute validerer nøkkelen og lagrer tilkoblingen.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Intern kontrakt

API-ruten validerer nøkkelen ved å kalle `KiroService.validateApiKey()`, som
bruker `ListAvailableProfiles` mot CodeWhisperer/Amazon Q-endepunktet som samsvarer med regionen,
og finner en `profileArn`.

Den lagrede tilkoblingen bruker:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Under kjøring sender `KiroExecutor.buildHeaders()` nøkkelen som
`Authorization: Bearer <key>` og legger til `tokentype: API_KEY`. Kvote-/profilkall
bruker den samme markøren, slik at AWS behandler bearer-legitimasjonen som en varig API-nøkkel i stedet for
et OIDC- eller sosialt tilgangstoken.

---

## Utløp av OIDC-klient

Offentlige AWS SSO OIDC-klienter utløper vanligvis etter 90 dager
(`clientSecretExpiresAt`). OmniRoute lagrer dette tidsstempelet i `providerSpecificData`
for observerbarhet. Hvis en tilkobling slutter å oppdateres etter omtrent 90 dager, importerer du
tilkoblingen på nytt for å få en ny OIDC-klientregistrering. Automatisk omregistrering ved
utløp er registrert som en fremtidig forbedring.

Tilkoblinger med API-nøkkel har ikke utløp av OIDC-klienten fordi de ikke oppdateres
gjennom AWS SSO OIDC.

---

## Feilsøking

### Den andre kontoen blir stadig logget ut

- Kontroller begge tilkoblingene i **Dashboard → Providers**, og bekreft at begge viser en `clientId`
  som ikke er null, i rå-JSON-en (synlig via informasjonsikonet). Hvis en av tilkoblingene mangler
  `clientId`, ble den importert før v3.8.0 – importer den på nytt.

### Import mislykkes med «Token validation failed»

- Kontroller at oppdateringstokenet begynner med `aorAAAAAG`.
- Kontroller at OmniRoute kan nå `https://oidc.us-east-1.amazonaws.com` (eller den konfigurerte
  regionen). Hvis du er bak en bedriftsproxy, angir du en proxy på leverandørnivå under
  **Dashboard → Settings → Proxies**.

### Import av API-nøkkel mislykkes

- Bekreft at nøkkelen er en API-nøkkel for Kiro / CodeWhisperer, ikke et oppdateringstoken.
- Bekreft at AWS-regionen samsvarer med nøkkelen/kontoen. `us-east-1` er standardregionen.
- Nøkkelen må kunne kalle `ListAvailableProfiles`; ellers kan ikke OmniRoute
  finne den nødvendige `profileArn`.

For andre problemer, se hovedfilen [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
