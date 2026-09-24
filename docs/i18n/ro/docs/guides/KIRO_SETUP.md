# Kiro Setup Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Acest ghid descrie adăugarea conturilor Kiro (asistent de programare AI găzduit de AWS) în OmniRoute,
cu accent pe rularea simultană a mai multor conturi fără conflicte de sesiune.

---

## Context: de ce pot apărea conflicte între conturile Kiro

Backendul Kiro utilizează înregistrările de clienți AWS SSO OIDC pentru a urmări sesiunile active.
Constrângerea esențială: **fiecare înregistrare de client OIDC acceptă o singură sesiune
activă la un moment dat**. Atunci când un al doilea dispozitiv sau utilizator se autentifică folosind același
client înregistrat, backendul invalidează tokenul de reîmprospătare al primului cont.

Acesta este același mecanism care cauzează probleme atunci când rulați `kiro-cli login` pe un
sistem pe care este deja autentificat un alt cont Kiro — noua autentificare revocă tokenul
primului cont.

---

## Cum rezolvă OmniRoute această problemă (v3.8.0+)

Începând cu v3.8.0, OmniRoute apelează `registerClient()` (AWS SSO OIDC) la fiecare
import al unei conexiuni Kiro. Astfel, fiecare conexiune OmniRoute primește propria înregistrare
dedicată de client OIDC. Deoarece fiecare înregistrare de client este independentă, reîmprospătarea sau
reautentificarea unui cont nu afectează tokenul de reîmprospătare al niciunui alt cont.

Izolarea se aplică metodelor de import bazate pe tokenuri de reîmprospătare, iar autentificarea prin cheie API
evită complet sesiunile de reîmprospătare OIDC:

| Metodă de import                                                      | Starea izolării                                                                                                                   |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Flux cu cod de dispozitiv AWS Builder ID / IDC                        | Izolat de la introducerea fluxului cu cod de dispozitiv                                                                           |
| **Import Token** (introducerea manuală a tokenului de reîmprospătare) | Izolat începând cu v3.8.0                                                                                                         |
| **Autentificare socială Google / GitHub**                             | Izolată începând cu v3.8.0                                                                                                        |
| **Auto-Import** (SQLite kiro-cli)                                     | Izolat începând cu v3.8.0 (calea SQLite era deja izolată; metoda alternativă bazată pe memoria cache SSO este acum și ea izolată) |
| **API Key** (cheie CodeWhisperer cu durată lungă de viață)            | Fără sesiune de reîmprospătare; cheia este validată și stocată ca acreditare de tip bearer                                        |

---

## Notă privind migrarea conexiunilor create înainte de v3.8.0

Conexiunile importate înainte de v3.8.0 nu au o înregistrare dedicată de client OIDC
stocată în `providerSpecificData`. Aceste conexiuni continuă să funcționeze, dar utilizează
endpointul comun de reîmprospătare pentru autentificarea socială, ceea ce înseamnă că două astfel de conexiuni încă se pot invalida
reciproc.

**Pentru a beneficia de izolare:** ștergeți conexiunea veche din **Panou de control → Furnizori** și
reimportați-o folosind oricare dintre fluxurile de import acceptate. Toate conexiunile nou create vor
primi automat propria înregistrare de client.

---

## Adăugarea concomitentă a două conturi Kiro

### Cerințe preliminare

- OmniRoute v3.8.0 sau o versiune ulterioară.
- Un cont Kiro funcțional (autentificare prin e-mail + parolă, Google sau GitHub).
- Opțional, un al doilea cont Kiro.

### Pasul 1: importați primul cont

1. Deschideți **Panou de control → Furnizori → Adăugare furnizor → Kiro**.
2. Alegeți una dintre următoarele opțiuni:
   - **Import Token** — introduceți un token de reîmprospătare care începe cu `aorAAAAAG`.
   - **API Key** — introduceți o cheie API Kiro / CodeWhisperer cu durată lungă de viață.
   - **Autentificare Google / GitHub** — finalizați fluxul OAuth în browser.
   - **Auto-Import** — faceți clic pe buton; OmniRoute citește acreditările din baza de date
     locală kiro-cli sau din `~/.aws/sso/cache`.
3. Conexiunea este salvată. Fluxurile bazate pe tokenuri de reîmprospătare înregistrează automat un client
   OIDC dedicat. Fluxurile bazate pe chei API validează cheia prin AWS și nu stochează un token de reîmprospătare.

### Pasul 2: importați al doilea cont

Repetați pasul 1 pentru al doilea cont. Deoarece fiecare import creează o înregistrare separată de client
OIDC, cele două conexiuni sunt complet izolate.

### Pasul 3: verificați dacă ambele conexiuni sunt active

1. **Panou de control → Furnizori** — ambele conexiuni Kiro ar trebui să afișeze starea **Activă**.
2. **Panou de control → Stare de funcționare** — ambele conexiuni ar trebui să treacă verificarea stării tokenurilor.

### Pasul 4: utilizați o combinație pentru rutarea între conturi

Creați o combinație cu ambele conexiuni drept destinații, pentru echilibrarea încărcării sau comutarea automată între ele:

```
kiro/kiro-dev → kiro/kiro-pro
```

Consultați [FEATURES.md](./FEATURES.md) și documentația privind rutarea pentru configurarea combinațiilor.

---

## Utilizatori Enterprise / IDC

Pentru conturile AWS IAM Identity Center (IDC), utilizați fluxul **AWS Builder ID / cod de dispozitiv IDC**
din **Dashboard → Providers → Kiro → Device Code**. Fluxul cu cod de dispozitiv a fost
întotdeauna complet izolat. Pentru aceste conexiuni nu este necesară reimportarea.

Utilizatorii Enterprise care operează într-o regiune AWS diferită de cea implicită pot specifica regiunea atunci când
importă prin Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Câmpul `region` are valoarea implicită `us-east-1` atunci când este omis.

---

## Fluxul de importare prin cheie API

Autentificarea prin cheie API este destinată acreditărilor bearer Kiro / AWS CodeWhisperer cu durată lungă de viață. Aceasta
nu utilizează reîmprospătarea OAuth, evitând astfel invalidarea sesiunilor OIDC partajate.

### Dashboard

1. Deschideți **Dashboard -> Providers -> Kiro**.
2. Alegeți **API Key**.
3. Inserați cheia API și, opțional, regiunea AWS (`us-east-1` în mod implicit).
4. OmniRoute validează cheia și salvează conexiunea.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Contract intern

Ruta API validează cheia apelând `KiroService.validateApiKey()`, care
utilizează `ListAvailableProfiles` pentru endpoint-ul CodeWhisperer/Amazon Q corespunzător regiunii
și identifică un `profileArn`.

Conexiunea salvată utilizează:

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

La rulare, `KiroExecutor.buildHeaders()` trimite cheia ca
`Authorization: Bearer <key>` și adaugă `tokentype: API_KEY`. Apelurile pentru cote/profil
utilizează același marcaj, astfel încât AWS tratează valoarea bearer ca pe o cheie API cu durată lungă de viață, și nu ca pe
un token de acces OIDC sau social.

---

## Expirarea clientului OIDC

Clienții publici AWS SSO OIDC expiră de obicei după 90 de zile
(`clientSecretExpiresAt`). OmniRoute stochează acest marcaj temporal în `providerSpecificData`
pentru observabilitate. Dacă reîmprospătarea unei conexiuni încetează după aproximativ 90 de zile, reimportați
conexiunea pentru a obține o înregistrare nouă a clientului OIDC. Reînregistrarea automată la
expirare este urmărită ca o îmbunătățire viitoare.

Conexiunile prin cheie API nu au o dată de expirare a clientului OIDC, deoarece nu se reîmprospătează
prin AWS SSO OIDC.

---

## Depanare

### Al doilea cont continuă să fie deconectat

- Verificați ambele conexiuni în **Dashboard → Providers** și confirmați că fiecare afișează un
  `clientId` nenul în JSON-ul său brut (vizibil prin pictograma de informații). Dacă uneia dintre conexiuni îi lipsește
  `clientId`, aceasta a fost importată înainte de v3.8.0 — reimportați-o.

### Importarea eșuează cu „Token validation failed”

- Asigurați-vă că tokenul de reîmprospătare începe cu `aorAAAAAG`.
- Asigurați-vă că OmniRoute poate accesa `https://oidc.us-east-1.amazonaws.com` (sau regiunea
  configurată). Dacă vă aflați în spatele unui proxy corporativ, setați un proxy la nivel de furnizor în
  **Dashboard → Settings → Proxies**.

### Importarea cheii API eșuează

- Confirmați că cheia este o cheie API Kiro / CodeWhisperer, nu un token de reîmprospătare.
- Confirmați că regiunea AWS corespunde cheii/contului. `us-east-1` este valoarea implicită.
- Cheia trebuie să poată apela `ListAvailableProfiles`; în caz contrar, OmniRoute nu poate
  identifica valoarea `profileArn` necesară.

Pentru alte probleme, consultați documentul principal [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
