# Kiro Setup Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Šajā ceļvedī ir aprakstīta Kiro (AWS mitināta MI programmēšanas asistenta) kontu pievienošana OmniRoute,
īpašu uzmanību pievēršot vairāku kontu vienlaicīgai izmantošanai bez sesiju konfliktiem.

---

## Pamatinformācija: kāpēc Kiro konti var konfliktēt

Kiro aizmugursistēma izmanto AWS SSO OIDC klientu reģistrācijas, lai izsekotu aktīvās sesijas.
Būtisks ierobežojums: **katra OIDC klienta reģistrācija vienlaikus atbalsta tikai vienu aktīvu
sesiju**. Kad otra ierīce vai lietotājs autentificējas, izmantojot to pašu
reģistrēto klientu, aizmugursistēma padara nederīgu pirmā konta atsvaidzināšanas pilnvaru.

Tas ir tas pats mehānisms, kas rada problēmas, izpildot `kiro-cli login` datorā,
kurā jau ir pierakstīts cits Kiro konts — jaunā pieteikšanās atsauc
pirmā konta pilnvaru.

---

## Kā OmniRoute to atrisina (v3.8.0+)

Sākot ar v3.8.0, OmniRoute katras Kiro savienojuma importēšanas laikā izsauc
`registerClient()` (AWS SSO OIDC). Tādējādi katrs OmniRoute savienojums iegūst savu
atsevišķu OIDC klienta reģistrāciju. Tā kā katra klienta reģistrācija ir neatkarīga,
viena konta atsvaidzināšana vai atkārtota autentificēšana neietekmē neviena cita
konta atsvaidzināšanas pilnvaru.

Izolācija attiecas uz atsvaidzināšanas pilnvaru importēšanas metodēm, savukārt autentifikācija
ar API atslēgu pilnībā neizmanto OIDC atsvaidzināšanas sesijas:

| Importēšanas metode                                                   | Izolācijas statuss                                                                                        |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC ierīces koda plūsma                              | Izolēta kopš ierīces koda plūsmas ieviešanas                                                              |
| **Importēt pilnvaru** (manuāla atsvaidzināšanas pilnvaras ielīmēšana) | Izolēta kopš v3.8.0                                                                                       |
| **Google / GitHub sociālā pieteikšanās**                              | Izolēta kopš v3.8.0                                                                                       |
| **Automātiskā importēšana** (kiro-cli SQLite)                         | Izolēta kopš v3.8.0 (SQLite ceļš jau bija izolēts; tagad ir izolēta arī SSO kešatmiņas atkāpšanās opcija) |
| **API atslēga** (ilgtermiņa CodeWhisperer atslēga)                    | Nav atsvaidzināšanas sesijas; atslēga tiek validēta un saglabāta kā nesēja akreditācijas dati             |

---

## Migrācijas piezīme savienojumiem, kas izveidoti pirms v3.8.0

Savienojumiem, kas importēti pirms v3.8.0, nav atsevišķas OIDC klienta reģistrācijas,
kas saglabāta laukā `providerSpecificData`. Šie savienojumi turpina darboties, taču izmanto
koplietoto sociālās autentifikācijas atsvaidzināšanas galapunktu, kas nozīmē, ka divi šādi
savienojumi joprojām var padarīt viens otra pilnvaras nederīgas.

**Lai iegūtu izolāciju:** izdzēsiet veco savienojumu sadaļā **Informācijas panelis → Pakalpojumu sniedzēji**
un importējiet to atkārtoti, izmantojot jebkuru no atbalstītajām importēšanas plūsmām. Visi jaunizveidotie
savienojumi automātiski saņems savu klienta reģistrāciju.

---

## Divu Kiro kontu pievienošana paralēlai izmantošanai

### Priekšnosacījumi

- OmniRoute v3.8.0 vai jaunāka versija.
- Darbojošs Kiro konts (e-pasts un parole vai pieteikšanās ar Google vai GitHub).
- Pēc izvēles — otrs Kiro konts.

### 1. darbība: importējiet pirmo kontu

1. Atveriet **Informācijas panelis → Pakalpojumu sniedzēji → Pievienot pakalpojumu sniedzēju → Kiro**.
2. Izvēlieties vienu no šīm iespējām:
   - **Importēt pilnvaru** — ielīmējiet atsvaidzināšanas pilnvaru, kas sākas ar `aorAAAAAG`.
   - **API atslēga** — ielīmējiet ilgtermiņa Kiro / CodeWhisperer API atslēgu.
   - **Pieteikšanās ar Google / GitHub** — pabeidziet OAuth plūsmu pārlūkprogrammā.
   - **Automātiskā importēšana** — noklikšķiniet uz pogas; OmniRoute nolasa akreditācijas datus no
     lokālās kiro-cli datubāzes vai `~/.aws/sso/cache`.
3. Savienojums tiek saglabāts. Atsvaidzināšanas pilnvaru plūsmas automātiski reģistrē atsevišķu
   OIDC klientu. API atslēgu plūsmas validē atslēgu ar AWS un nesaglabā atsvaidzināšanas pilnvaru.

### 2. darbība: importējiet otro kontu

Atkārtojiet 1. darbību otrajam kontam. Tā kā katra importēšana izveido atsevišķu OIDC
klienta reģistrāciju, abi savienojumi ir pilnībā izolēti.

### 3. darbība: pārbaudiet, vai abi savienojumi ir aktīvi

1. **Informācijas panelis → Pakalpojumu sniedzēji** — abiem Kiro savienojumiem jābūt statusam **Aktīvs**.
2. **Informācijas panelis → Veselība** — abiem savienojumiem sekmīgi jāiztur pilnvaru darbspējas pārbaude.

### 4. darbība: izmantojiet kombināciju maršrutēšanai starp kontiem

Izveidojiet kombināciju ar abiem savienojumiem kā mērķiem, lai līdzsvarotu slodzi vai kļūmes gadījumā pārslēgtos starp tiem:

```
kiro/kiro-dev → kiro/kiro-pro
```

Informāciju par kombināciju konfigurēšanu skatiet failā [FEATURES.md](./FEATURES.md) un maršrutēšanas dokumentācijā.

---

## Uzņēmumu / IDC lietotāji

AWS IAM Identity Center (IDC) kontiem izmantojiet **AWS Builder ID / IDC ierīces koda**
plūsmu sadaļā **Informācijas panelis → Pakalpojumu sniedzēji → Kiro → Ierīces kods**. Ierīces koda plūsma
vienmēr ir bijusi pilnībā izolēta. Šiem savienojumiem atkārtota importēšana nav nepieciešama.

Uzņēmumu lietotāji, kuri darbojas AWS reģionā, kas nav noklusējuma reģions, var norādīt reģionu,
importējot ar Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Ja lauks `region` nav norādīts, tā noklusējuma vērtība ir `us-east-1`.

---

## API atslēgas importēšanas plūsma

Autentifikācija ar API atslēgu ir paredzēta ilgtermiņa Kiro / AWS CodeWhisperer nesēja akreditācijas datiem. Tā
neizmanto OAuth atsvaidzināšanu, tādēļ novērš koplietojamu OIDC sesiju anulēšanu.

### Informācijas panelis

1. Atveriet **Informācijas panelis -> Pakalpojumu sniedzēji -> Kiro**.
2. Izvēlieties **API atslēga**.
3. Ielīmējiet API atslēgu un, ja nepieciešams, AWS reģionu (pēc noklusējuma — `us-east-1`).
4. OmniRoute validē atslēgu un saglabā savienojumu.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Iekšējais līgums

API maršruts validē atslēgu, izsaucot `KiroService.validateApiKey()`, kas
izmanto `ListAvailableProfiles` pret reģionam atbilstošo CodeWhisperer/Amazon Q
galapunktu un nosaka `profileArn`.

Saglabātajā savienojumā tiek izmantots:

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

Izpildes laikā `KiroExecutor.buildHeaders()` nosūta atslēgu kā
`Authorization: Bearer <key>` un pievieno `tokentype: API_KEY`. Kvotu/profilu izsaukumi
izmanto to pašu marķieri, lai AWS nesēju apstrādātu kā ilgtermiņa API atslēgu, nevis
OIDC vai sociālās autentifikācijas piekļuves pilnvaru.

---

## OIDC klienta derīguma termiņš

AWS SSO OIDC publisko klientu derīguma termiņš parasti beidzas pēc 90 dienām
(`clientSecretExpiresAt`). Novērojamības nolūkos OmniRoute saglabā šo laikspiedolu laukā `providerSpecificData`.
Ja savienojuma atsvaidzināšana pārstāj darboties pēc aptuveni 90 dienām, atkārtoti importējiet
savienojumu, lai iegūtu jaunu OIDC klienta reģistrāciju. Automātiska pārreģistrācija pēc
derīguma termiņa beigām ir ieplānota kā turpmāks uzlabojums.

API atslēgas savienojumiem nav OIDC klienta derīguma termiņa, jo tie netiek atsvaidzināti,
izmantojot AWS SSO OIDC.

---

## Problēmu novēršana

### Otrais konts joprojām tiek izrakstīts

- Pārbaudiet abus savienojumus sadaļā **Informācijas panelis → Pakalpojumu sniedzēji** un pārliecinieties, ka katram neapstrādātajā
  JSON ir norādīta `clientId` vērtība, kas nav null (to var skatīt, izmantojot informācijas ikonu). Ja kādam savienojumam
  trūkst `clientId`, tas tika importēts pirms v3.8.0 — importējiet to atkārtoti.

### Importēšana neizdodas ar kļūdu "Pilnvaras validācija neizdevās"

- Pārliecinieties, ka atsvaidzināšanas pilnvara sākas ar `aorAAAAAG`.
- Pārliecinieties, ka OmniRoute var sasniegt `https://oidc.us-east-1.amazonaws.com` (vai konfigurētā
  reģiona adresi). Ja izmantojat uzņēmuma starpniekserveri, iestatiet pakalpojumu sniedzēja līmeņa starpniekserveri sadaļā
  **Informācijas panelis → Iestatījumi → Starpniekserveri**.

### API atslēgas importēšana neizdodas

- Pārliecinieties, ka atslēga ir Kiro / CodeWhisperer API atslēga, nevis atsvaidzināšanas pilnvara.
- Pārliecinieties, ka AWS reģions atbilst atslēgai/kontam. Noklusējuma reģions ir `us-east-1`.
- Atslēgai jāspēj izsaukt `ListAvailableProfiles`; pretējā gadījumā OmniRoute nevar
  noteikt nepieciešamo `profileArn`.

Informāciju par citām problēmām skatiet galvenajā failā [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
