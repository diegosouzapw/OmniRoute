# Kiro Setup Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Deze handleiding beschrijft hoe je Kiro-accounts (een door AWS gehoste AI-codeerassistent) aan OmniRoute toevoegt,
met speciale aandacht voor het gelijktijdig gebruiken van meerdere accounts zonder sessieconflicten.

---

## Achtergrond: waarom Kiro-accounts conflicten kunnen veroorzaken

De backend van Kiro gebruikt AWS SSO OIDC-clientregistraties om actieve sessies bij te houden.
De belangrijkste beperking: **elke OIDC-clientregistratie ondersteunt slechts één actieve
sessie tegelijk**. Wanneer een tweede apparaat of een tweede gebruiker zich met dezelfde
geregistreerde client verifieert, maakt de backend het vernieuwingstoken van het eerste account ongeldig.

Dit is hetzelfde mechanisme dat problemen veroorzaakt wanneer je `kiro-cli login` uitvoert op een
machine waarop al een ander Kiro-account is aangemeld: de nieuwe aanmelding trekt het token van
het eerste account in.

---

## Hoe OmniRoute dit oplost (v3.8.0+)

Vanaf v3.8.0 roept OmniRoute tijdens elke import van een Kiro-verbinding `registerClient()` (AWS SSO OIDC) aan.
Hierdoor krijgt elke OmniRoute-verbinding een eigen toegewezen OIDC-clientregistratie.
Omdat elke clientregistratie onafhankelijk is, heeft het vernieuwen of opnieuw verifiëren van
één account geen invloed op het vernieuwingstoken van andere accounts.

De isolatie is van toepassing op de importmethoden met vernieuwingstokens, terwijl verificatie via een API-sleutel
OIDC-vernieuwingssessies volledig vermijdt:

| Importmethode                                              | Isolatiestatus                                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID-/IDC-apparaatcodestroom                     | Geïsoleerd sinds de apparaatcodestroom werd geïntroduceerd                                                          |
| **Token importeren** (handmatig vernieuwingstoken plakken) | Geïsoleerd vanaf v3.8.0                                                                                             |
| **Aanmelden met Google / GitHub**                          | Geïsoleerd vanaf v3.8.0                                                                                             |
| **Automatisch importeren** (kiro-cli SQLite)               | Geïsoleerd vanaf v3.8.0 (het SQLite-pad was al geïsoleerd; de terugvaloptie voor de SSO-cache is nu ook geïsoleerd) |
| **API-sleutel** (langlevende CodeWhisperer-sleutel)        | Geen vernieuwingssessie; de sleutel wordt gevalideerd en opgeslagen als bearer-referentie                           |

---

## Migratieopmerking voor verbindingen die vóór v3.8.0 zijn gemaakt

Verbindingen die vóór v3.8.0 zijn geïmporteerd, hebben geen toegewezen OIDC-clientregistratie
opgeslagen in `providerSpecificData`. Deze verbindingen blijven werken, maar gebruiken het gedeelde
vernieuwingseindpunt voor sociale verificatie. Daardoor kunnen twee van dergelijke verbindingen
elkaar nog steeds ongeldig maken.

**Om isolatie te verkrijgen:** verwijder de oude verbinding via **Dashboard → Providers** en
importeer deze opnieuw met een van de ondersteunde importstromen. Alle nieuw gemaakte verbindingen
krijgen automatisch een eigen clientregistratie.

---

## Twee Kiro-accounts naast elkaar toevoegen

### Vereisten

- OmniRoute v3.8.0 of nieuwer.
- Een werkend Kiro-account (e-mailadres + wachtwoord, of aanmelden via Google of GitHub).
- Optioneel een tweede Kiro-account.

### Stap 1: Importeer het eerste account

1. Open **Dashboard → Providers → Add Provider → Kiro**.
2. Kies een van de volgende opties:
   - **Token importeren** — plak een vernieuwingstoken dat begint met `aorAAAAAG`.
   - **API-sleutel** — plak een langlevende Kiro-/CodeWhisperer-API-sleutel.
   - **Aanmelden met Google / GitHub** — voltooi de OAuth-stroom in de browser.
   - **Automatisch importeren** — klik op de knop; OmniRoute leest de referenties uit de
     lokale kiro-cli-database of `~/.aws/sso/cache`.
3. De verbinding wordt opgeslagen. Bij stromen met vernieuwingstokens wordt automatisch een toegewezen
   OIDC-client geregistreerd. Bij stromen met API-sleutels wordt de sleutel door AWS gevalideerd en wordt er geen vernieuwingstoken opgeslagen.

### Stap 2: Importeer het tweede account

Herhaal stap 1 voor het tweede account. Omdat bij elke import een afzonderlijke OIDC-clientregistratie
wordt gemaakt, zijn de twee verbindingen volledig van elkaar geïsoleerd.

### Stap 3: Controleer of beide verbindingen actief zijn

1. **Dashboard → Providers** — beide Kiro-verbindingen moeten de status **Actief** tonen.
2. **Dashboard → Health** — beide verbindingen moeten slagen voor hun tokenstatuscontrole.

### Stap 4: Gebruik een combinatie om tussen accounts te routeren

Maak een combinatie met beide verbindingen als doelen om de belasting te verdelen of bij uitval naar de andere verbinding over te schakelen:

```
kiro/kiro-dev → kiro/kiro-pro
```

Zie [FEATURES.md](./FEATURES.md) en de routeringsdocumentatie voor de configuratie van combinaties.

---

## Enterprise- / IDC-gebruikers

Gebruik voor AWS IAM Identity Center-accounts (IDC) de **AWS Builder ID-/IDC-apparaatcode**
-flow via **Dashboard → Providers → Kiro → Device Code**. De apparaatcodestroom is
altijd volledig geïsoleerd geweest. Voor deze verbindingen is opnieuw importeren niet nodig.

Enterprisegebruikers die in een niet-standaard AWS-regio werken, kunnen de regio opgeven
bij het importeren via de Import Token-API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Het veld `region` wordt standaard ingesteld op `us-east-1` wanneer het wordt weggelaten.

---

## Importstroom voor API-sleutels

Authenticatie met een API-sleutel is bedoeld voor langlevende bearer-inloggegevens van Kiro / AWS CodeWhisperer. Deze
maakt geen gebruik van OAuth-vernieuwing en voorkomt daardoor de ongeldigverklaring van gedeelde OIDC-sessies.

### Dashboard

1. Open **Dashboard -> Providers -> Kiro**.
2. Kies **API Key**.
3. Plak de API-sleutel en optioneel de AWS-regio (standaard `us-east-1`).
4. OmniRoute valideert de sleutel en slaat de verbinding op.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Intern contract

De API-route valideert de sleutel door `KiroService.validateApiKey()` aan te roepen. Deze methode
gebruikt `ListAvailableProfiles` voor het CodeWhisperer/Amazon Q-eindpunt dat bij de regio hoort en bepaalt een `profileArn`.

De opgeslagen verbinding gebruikt:

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

Tijdens runtime verzendt `KiroExecutor.buildHeaders()` de sleutel als
`Authorization: Bearer <key>` en voegt `tokentype: API_KEY` toe. Aanroepen voor quota/profielen
gebruiken dezelfde markering, zodat AWS de bearer behandelt als een langlevende API-sleutel in plaats van
een OIDC- of sociaal toegangstoken.

---

## Verloopdatum van OIDC-clients

Openbare AWS SSO OIDC-clients verlopen doorgaans na 90 dagen
(`clientSecretExpiresAt`). OmniRoute slaat dit tijdstip op in `providerSpecificData`
ten behoeve van observeerbaarheid. Als een verbinding na ongeveer 90 dagen niet meer wordt vernieuwd, importeert u de
verbinding opnieuw om een nieuwe OIDC-clientregistratie te verkrijgen. Automatische herregistratie bij
het verlopen wordt bijgehouden als een toekomstige verbetering.

Verbindingen met API-sleutels hebben geen verloopdatum voor OIDC-clients, omdat ze niet worden vernieuwd
via AWS SSO OIDC.

---

## Probleemoplossing

### Tweede account wordt steeds afgemeld

- Controleer beide verbindingen in **Dashboard → Providers** en bevestig dat voor elke verbinding een niet-null
  `clientId` in de onbewerkte JSON wordt weergegeven (zichtbaar via het informatiepictogram). Als bij een van de verbindingen
  `clientId` ontbreekt, is deze vóór v3.8.0 geïmporteerd — importeer de verbinding opnieuw.

### Importeren mislukt met "Token validation failed"

- Controleer of het vernieuwingstoken begint met `aorAAAAAG`.
- Controleer of OmniRoute `https://oidc.us-east-1.amazonaws.com` (of de geconfigureerde
  regio) kan bereiken. Als u zich achter een bedrijfsproxy bevindt, stelt u een proxy op providerniveau in via
  **Dashboard → Settings → Proxies**.

### Importeren van API-sleutel mislukt

- Controleer of de sleutel een Kiro-/CodeWhisperer-API-sleutel is en geen vernieuwingstoken.
- Controleer of de AWS-regio overeenkomt met de sleutel/het account. `us-east-1` is de standaardwaarde.
- De sleutel moet `ListAvailableProfiles` kunnen aanroepen; anders kan OmniRoute
  de vereiste `profileArn` niet bepalen.

Raadpleeg voor andere problemen het algemene bestand [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
