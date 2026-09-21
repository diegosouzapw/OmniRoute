# Kiro Setup Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Denne vejledning beskriver, hvordan du føjer Kiro-konti (en AWS-hostet AI-kodeassistent) til OmniRoute,
med fokus på at køre flere konti samtidigt uden sessionskonflikter.

---

## Baggrund: Hvorfor Kiro-konti kan være i konflikt

Kiros backend bruger AWS SSO OIDC-klientregistreringer til at holde styr på aktive sessioner.
Den afgørende begrænsning er: **Hver OIDC-klientregistrering understøtter kun én aktiv
session ad gangen**. Når en anden enhed eller bruger godkendes med den samme
registrerede klient, ugyldiggør backenden den første kontos opdateringstoken.

Det er den samme mekanisme, der forårsager problemer, når `kiro-cli login` køres på en
maskine, hvor en anden Kiro-konto allerede er logget ind — det nye login tilbagekalder
den første kontos token.

---

## Sådan løser OmniRoute dette (v3.8.0+)

Fra og med v3.8.0 kalder OmniRoute `registerClient()` (AWS SSO OIDC) under hver
import af en Kiro-forbindelse. Dette giver hver OmniRoute-forbindelse sin egen dedikerede
OIDC-klientregistrering. Da hver klientregistrering er uafhængig, påvirker opdatering eller
genautentificering af én konto ikke andre kontis opdateringstokens.

Isoleringen gælder for importmetoderne med opdateringstokens, mens godkendelse med API-nøgle
helt undgår OIDC-opdateringssessioner:

| Importmetode                                                | Isoleringsstatus                                                                                             |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| AWS Builder ID-/IDC-enhedskodeflow                          | Isoleret, siden enhedskodeflowet blev introduceret                                                           |
| **Importér token** (manuel indsættelse af opdateringstoken) | Isoleret fra v3.8.0                                                                                          |
| **Login med Google/GitHub**                                 | Isoleret fra v3.8.0                                                                                          |
| **Automatisk import** (kiro-cli SQLite)                     | Isoleret fra v3.8.0 (SQLite-stien var allerede isoleret; reserveløsningen med SSO-cache er nu også isoleret) |
| **API-nøgle** (langtidsholdbar CodeWhisperer-nøgle)         | Ingen opdateringssession; nøglen valideres og gemmes som en bearer-legitimationsoplysning                    |

---

## Migreringsbemærkning for forbindelser oprettet før v3.8.0

Forbindelser, der blev importeret før v3.8.0, har ikke en dedikeret OIDC-klientregistrering
gemt i `providerSpecificData`. Disse forbindelser fungerer fortsat, men bruger det delte
opdateringsslutpunkt til social godkendelse, hvilket betyder, at to sådanne forbindelser stadig kan ugyldiggøre
hinanden.

**Sådan opnår du isolering:** Slet den gamle forbindelse under **Kontrolpanel → Udbydere**, og
importér den igen ved hjælp af et af de understøttede importflows. Alle nyoprettede forbindelser
får automatisk deres egen klientregistrering.

---

## Tilføjelse af to Kiro-konti side om side

### Forudsætninger

- OmniRoute v3.8.0 eller nyere.
- En fungerende Kiro-konto (e-mail + adgangskode eller login med Google eller GitHub).
- Eventuelt en anden Kiro-konto.

### Trin 1: Importér den første konto

1. Åbn **Kontrolpanel → Udbydere → Tilføj udbyder → Kiro**.
2. Vælg en af følgende:
   - **Importér token** — indsæt et opdateringstoken, der starter med `aorAAAAAG`.
   - **API-nøgle** — indsæt en langtidsholdbar Kiro-/CodeWhisperer-API-nøgle.
   - **Login med Google/GitHub** — gennemfør OAuth-flowet i browseren.
   - **Automatisk import** — klik på knappen; OmniRoute læser legitimationsoplysninger fra den
     lokale kiro-cli-database eller `~/.aws/sso/cache`.
3. Forbindelsen gemmes. Flows med opdateringstokens registrerer automatisk en dedikeret
   OIDC-klient. Flows med API-nøgler validerer nøglen hos AWS og gemmer ikke et opdateringstoken.

### Trin 2: Importér den anden konto

Gentag trin 1 for den anden konto. Da hver import opretter en separat
OIDC-klientregistrering, er de to forbindelser fuldstændigt isolerede.

### Trin 3: Kontrollér, at begge forbindelser er aktive

1. **Kontrolpanel → Udbydere** — begge Kiro-forbindelser bør have status **Aktiv**.
2. **Kontrolpanel → Tilstand** — begge forbindelser bør bestå deres tokensundhedskontrol.

### Trin 4: Brug en kombination til at dirigere mellem konti

Opret en kombination med begge forbindelser som mål for at belastningsfordele eller bruge dem som reserveløsning for hinanden:

```
kiro/kiro-dev → kiro/kiro-pro
```

Se [FEATURES.md](./FEATURES.md) og routingdokumentationen for konfiguration af kombinationer.

---

## Enterprise-/IDC-brugere

For AWS IAM Identity Center-konti (IDC) skal du bruge flowet med **AWS Builder ID-/IDC-enhedskode**
fra **Dashboard → Providers → Kiro → Device Code**. Flowet med enhedskode har
altid været fuldstændigt isoleret. Det er ikke nødvendigt at importere disse forbindelser igen.

Enterprise-brugere, der arbejder i en anden AWS-region end standardregionen, kan angive regionen ved
import via Import Token-API'et:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Feltet `region` bruger som standard `us-east-1`, hvis det udelades.

---

## Importflow for API-nøgler

Godkendelse med API-nøgle er beregnet til langtidsholdbare bearer-legitimationsoplysninger til Kiro/AWS CodeWhisperer. Den
bruger ikke OAuth-opdatering og undgår derfor ugyldiggørelse af delte OIDC-sessioner.

### Dashboard

1. Åbn **Dashboard -> Providers -> Kiro**.
2. Vælg **API Key**.
3. Indsæt API-nøglen og eventuelt AWS-regionen (`us-east-1` som standard).
4. OmniRoute validerer nøglen og gemmer forbindelsen.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Intern kontrakt

API-ruten validerer nøglen ved at kalde `KiroService.validateApiKey()`, som
bruger `ListAvailableProfiles` mod det regionsmatchende CodeWhisperer-/Amazon Q-
slutpunkt og finder et `profileArn`.

Den gemte forbindelse bruger:

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

Under kørsel sender `KiroExecutor.buildHeaders()` nøglen som
`Authorization: Bearer <key>` og tilføjer `tokentype: API_KEY`. Kvote-/profilkald
bruger den samme markør, så AWS behandler bearer-legitimationsoplysningen som en langtidsholdbar API-nøgle frem for
et OIDC- eller socialt adgangstoken.

---

## Udløb af OIDC-klient

Offentlige AWS SSO OIDC-klienter udløber typisk efter 90 dage
(`clientSecretExpiresAt`). OmniRoute gemmer dette tidsstempel i `providerSpecificData`
for at sikre observerbarhed. Hvis en forbindelse holder op med at blive opdateret efter ca. 90 dage, skal du importere
forbindelsen igen for at få en ny OIDC-klientregistrering. Automatisk genregistrering ved
udløb er registreret som en fremtidig forbedring.

Forbindelser med API-nøgler har ikke udløb af OIDC-klienten, fordi de ikke opdateres
via AWS SSO OIDC.

---

## Fejlfinding

### Den anden konto bliver ved med at blive logget af

- Kontrollér begge forbindelser under **Dashboard → Providers**, og bekræft, at hver af dem viser en ikke-null-værdi for
  `clientId` i den rå JSON (synlig via infoikonet). Hvis en af forbindelserne mangler
  `clientId`, blev den importeret før v3.8.0 — importér den igen.

### Import mislykkes med "Token validation failed"

- Sørg for, at opdateringstokenet begynder med `aorAAAAAG`.
- Sørg for, at OmniRoute kan oprette forbindelse til `https://oidc.us-east-1.amazonaws.com` (eller den konfigurerede
  region). Hvis du er bag en virksomhedsproxy, skal du angive en proxy på providerniveau under
  **Dashboard → Settings → Proxies**.

### Import af API-nøgle mislykkes

- Bekræft, at nøglen er en Kiro-/CodeWhisperer-API-nøgle og ikke et opdateringstoken.
- Bekræft, at AWS-regionen matcher nøglen/kontoen. `us-east-1` er standardværdien.
- Nøglen skal kunne kalde `ListAvailableProfiles`; ellers kan OmniRoute ikke
  finde det påkrævede `profileArn`.

Se [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for andre problemer.
