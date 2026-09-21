# Kiro Setup Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Den här guiden beskriver hur du lägger till Kiro-konton (en AWS-baserad AI-kodningsassistent) i OmniRoute,
med fokus på att köra flera konton samtidigt utan sessionskonflikter.

---

## Bakgrund: Varför Kiro-konton kan hamna i konflikt

Kiros backend använder AWS SSO OIDC-klientregistreringar för att hålla reda på aktiva sessioner.
Den kritiska begränsningen är att **varje OIDC-klientregistrering endast stöder en aktiv
session åt gången**. När en andra enhet eller användare autentiseras med samma
registrerade klient ogiltigförklarar backend det första kontots uppdateringstoken.

Detta är samma mekanism som orsakar problem när du kör `kiro-cli login` på en
dator där ett annat Kiro-konto redan är inloggat — den nya inloggningen återkallar
det första kontots token.

---

## Så löser OmniRoute detta (v3.8.0+)

Från och med v3.8.0 anropar OmniRoute `registerClient()` (AWS SSO OIDC) vid varje
import av en Kiro-anslutning. Detta ger varje OmniRoute-anslutning en egen dedikerad
OIDC-klientregistrering. Eftersom varje klientregistrering är oberoende påverkar
uppdatering eller omautentisering av ett konto inte något annat kontos uppdateringstoken.

Isoleringen gäller för importmetoderna med uppdateringstoken, medan autentisering med
API-nyckel helt undviker OIDC-uppdateringssessioner:

| Importmetod                                                 | Isoleringsstatus                                                                                              |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID-/IDC-enhetskodflöde                          | Isolerat sedan enhetskodflödet introducerades                                                                 |
| **Importera token** (klistra in uppdateringstoken manuellt) | Isolerat från v3.8.0                                                                                          |
| **Google-/GitHub-inloggning**                               | Isolerat från v3.8.0                                                                                          |
| **Automatisk import** (kiro-cli SQLite)                     | Isolerat från v3.8.0 (SQLite-sökvägen var redan isolerad; reservlösningen med SSO-cache är nu också isolerad) |
| **API-nyckel** (långlivad CodeWhisperer-nyckel)             | Ingen uppdateringssession; nyckeln valideras och lagras som en bearer-autentiseringsuppgift                   |

---

## Migreringsanmärkning för anslutningar som skapats före v3.8.0

Anslutningar som importerades före v3.8.0 har ingen dedikerad OIDC-klientregistrering
lagrad i `providerSpecificData`. Dessa anslutningar fortsätter att fungera, men använder den delade
slutpunkten för uppdatering av social autentisering, vilket innebär att två sådana anslutningar fortfarande kan ogiltigförklara
varandra.

**För att få isolering:** ta bort den gamla anslutningen från **Instrumentpanel → Leverantörer** och
importera den på nytt med något av de importflöden som stöds. Alla nyskapade anslutningar får
automatiskt en egen klientregistrering.

---

## Lägga till två Kiro-konton sida vid sida

### Förutsättningar

- OmniRoute v3.8.0 eller senare.
- Ett fungerande Kiro-konto (e-postadress + lösenord eller inloggning med Google eller GitHub).
- Valfritt ett andra Kiro-konto.

### Steg 1: Importera det första kontot

1. Öppna **Instrumentpanel → Leverantörer → Lägg till leverantör → Kiro**.
2. Välj något av följande:
   - **Importera token** — klistra in en uppdateringstoken som börjar med `aorAAAAAG`.
   - **API-nyckel** — klistra in en långlivad Kiro-/CodeWhisperer-API-nyckel.
   - **Google-/GitHub-inloggning** — slutför OAuth-flödet i webbläsaren.
   - **Automatisk import** — klicka på knappen; OmniRoute läser autentiseringsuppgifterna från den
     lokala kiro-cli-databasen eller `~/.aws/sso/cache`.
3. Anslutningen sparas. Flöden med uppdateringstoken registrerar automatiskt en dedikerad
   OIDC-klient. Flöden med API-nyckel validerar nyckeln mot AWS och lagrar ingen uppdateringstoken.

### Steg 2: Importera det andra kontot

Upprepa steg 1 för det andra kontot. Eftersom varje import skapar en separat
OIDC-klientregistrering är de två anslutningarna helt isolerade.

### Steg 3: Kontrollera att båda anslutningarna är aktiva

1. **Instrumentpanel → Leverantörer** — båda Kiro-anslutningarna ska visa statusen **Aktiv**.
2. **Instrumentpanel → Hälsa** — båda anslutningarna ska klara sin hälsokontroll för token.

### Steg 4: Använd en kombination för dirigering mellan kontona

Skapa en kombination med båda anslutningarna som mål för att lastbalansera eller växla över mellan dem:

```
kiro/kiro-dev → kiro/kiro-pro
```

Se [FEATURES.md](./FEATURES.md) och dokumentationen om dirigering för konfiguration av kombinationer.

---

## Enterprise-/IDC-användare

För AWS IAM Identity Center-konton (IDC) använder du flödet med **AWS Builder ID-/IDC-enhetskod**
från **Dashboard → Providers → Kiro → Device Code**. Enhetskodflödet har
alltid varit helt isolerat. Ingen återimport krävs för dessa anslutningar.

Enterprise-användare som arbetar i en annan AWS-region än standardregionen kan ange regionen vid
import via API:t Import Token:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Fältet `region` får standardvärdet `us-east-1` om det utelämnas.

---

## Importflöde för API-nyckel

Autentisering med API-nyckel är avsedd för långlivade bearer-autentiseringsuppgifter för Kiro/AWS CodeWhisperer. Den
använder inte OAuth-uppdatering och undviker därför ogiltigförklaring av delade OIDC-sessioner.

### Dashboard

1. Öppna **Dashboard -> Providers -> Kiro**.
2. Välj **API Key**.
3. Klistra in API-nyckeln och valfri AWS-region (`us-east-1` som standard).
4. OmniRoute validerar nyckeln och sparar anslutningen.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Internt kontrakt

API-routen validerar nyckeln genom att anropa `KiroService.validateApiKey()`, som
använder `ListAvailableProfiles` mot CodeWhisperer-/Amazon Q-endpointen för den angivna regionen
och hämtar ett `profileArn`.

Den sparade anslutningen använder:

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

Vid körning skickar `KiroExecutor.buildHeaders()` nyckeln som
`Authorization: Bearer <key>` och lägger till `tokentype: API_KEY`. Kvot-/profilanrop
använder samma markör så att AWS behandlar bearer-token som en långlivad API-nyckel i stället för
en OIDC-token eller åtkomsttoken för social inloggning.

---

## OIDC-klientens giltighetstid

Offentliga AWS SSO OIDC-klienter upphör vanligtvis att gälla efter 90 dagar
(`clientSecretExpiresAt`). OmniRoute lagrar denna tidsstämpel i `providerSpecificData`
för observerbarhet. Om en anslutning slutar uppdateras efter cirka 90 dagar ska du återimportera
anslutningen för att få en ny OIDC-klientregistrering. Automatisk omregistrering när
giltighetstiden löper ut är planerad som en framtida förbättring.

Anslutningar med API-nyckel har ingen giltighetstid för OIDC-klienten eftersom de inte uppdateras
via AWS SSO OIDC.

---

## Felsökning

### Det andra kontot loggas hela tiden ut

- Kontrollera båda anslutningarna i **Dashboard → Providers** och bekräfta att båda visar ett värde som inte är null för
  `clientId` i sin råa JSON (synlig via informationsikonen). Om någon av anslutningarna saknar
  `clientId` importerades den före v3.8.0 – återimportera den.

### Importen misslyckas med "Token validation failed"

- Kontrollera att uppdateringstoken börjar med `aorAAAAAG`.
- Kontrollera att OmniRoute kan nå `https://oidc.us-east-1.amazonaws.com` (eller den konfigurerade
  regionen). Om du befinner dig bakom en företagsproxy anger du en proxy på leverantörsnivå i
  **Dashboard → Settings → Proxies**.

### Importen av API-nyckeln misslyckas

- Bekräfta att nyckeln är en API-nyckel för Kiro/CodeWhisperer och inte en uppdateringstoken.
- Bekräfta att AWS-regionen matchar nyckeln/kontot. `us-east-1` är standardvärdet.
- Nyckeln måste kunna anropa `ListAvailableProfiles`; annars kan OmniRoute inte
  hämta det `profileArn` som krävs.

För andra problem, se den huvudsakliga filen [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
