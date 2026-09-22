# Management Authentication (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute are **patru familii de credențiale** care pot autoriza rutele de administrare.
Acestea nu sunt interschimbabile. Cheile API pentru inferență (`sk-…`) **nu** administrează
serverul decât dacă li s-a acordat explicit domeniul `manage` sau `admin`.

Implementare canonică: `src/lib/api/requireManagementAuth.ts`.

| Credențială                          | Formă tipică                           | Unde este creată                                       | Utilizare prevăzută                    | Capabilitate de administrare                                                                                            |
| ------------------------------------ | -------------------------------------- | ------------------------------------------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Sesiune JWT pentru panoul de control | Cookie `auth_token`                    | Autentificare în panoul de control                     | Interfață web                          | Administrare completă prin panoul de control, supusă regulilor CSRF, de localitate și pentru rutele protejate permanent |
| Token CLI bazat pe ID-ul mașinii     | intern / local                         | Inițializare CLI (`omniroute` pe aceeași mașină)       | CLI local                              | Doar administrare locală                                                                                                |
| Token de acces cu domeniu            | `oma_live_…`                           | **Setări → Tokenuri de acces** sau `omniroute connect` | CLI la distanță și API de administrare | Trebuie să îndeplinească domeniul `read`, `write` sau `admin` necesar rutei                                             |
| Cheie API pentru inferență           | `sk-…` (și alte prefixuri de chei API) | **Manager API / Chei API**                             | Inferență `/v1/*`                      | **Niciuna**, cu excepția cazului în care metadatele cheii includ `manage` sau `admin`                                   |

Credențialele `oma_` sunt credențiale de administrare/CLI. Acestea **nu** sunt chei API pentru inferență.

Dacă autentificarea prin conectare/cheie API este dezactivată pentru server, unele rute de administrare pot
accepta apeluri neautentificate. Rutele exclusiv locale și cele protejate permanent continuă să aplice
propriile reguli. Prin urmare, prezentarea uneia dintre aceste credențiale nu este obligatorie în mod universal,
iar deținerea uneia nu este suficientă în mod universal fără domeniul necesar și localitatea corespunzătoare
rutei.

Subiect asociat: [Modul la distanță](./REMOTE-MODE.md) (cum este emis `oma_live_…` pentru un CLI la distanță).

---

## Matrice de domenii

Aceste două vocabulare de domenii sunt **diferite**. Nu le combinați.

### Domeniile tokenurilor de acces (`oma_live_…`)

| Domeniu | Operațiuni tipice                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------- |
| `read`  | Operațiuni GET de listare/stare pe care tokenul are permisiunea să le acceseze                              |
| `write` | Modificări (creare/actualizare/ștergere) sub nivelul de administrator                                       |
| `admin` | Token complet pentru CLI la distanță/conectare (inițializarea prin parolă folosește implicit acest domeniu) |

Un token cu `read` nu poate apela o rută `write`. Formatul mesajului din timpul execuției:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Domenii de administrare pentru cheile API

| Domeniu    | Semnificație                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------- |
| (niciunul) | Doar inferență. Rutele de administrare returnează 403.                                         |
| `manage`   | API de administrare (aceeași verificare ca ramura pentru chei API din `requireManagementAuth`) |
| `admin`    | Satisface și `hasManageScope` (este tratat ca având capacități de administrare)                |

Activați `manage` pentru cheie în interfața Chei API / Manager API. Nu reutilizați o
cheie de client de chat pentru automatizare decât dacă i-ați acordat în mod intenționat acel domeniu.

---

## Cum se creează și se revocă

### Sesiune JWT pentru panoul de control

1. Deschideți `/login` și autentificați-vă cu parola de administrare (`INITIAL_PASSWORD` la prima pornire).
2. Cookie-ul `auth_token` este HttpOnly. Panoul de control din browser îl utilizează automat.
3. Deconectați-vă prin `/api/auth/logout`. Nu există niciun secret persistent de copiat.

### Token CLI bazat pe ID-ul mașinii

1. Rulați `omniroute` pe **aceeași gazdă** ca serverul (loopback).
2. CLI-ul inițializează un token bazat pe ID-ul mașinii în `~/.omniroute/` (chmod 600).
3. Acesta **nu** funcționează de pe altă mașină. Utilizați un token de acces pentru un CLI la distanță.

### Token de acces cu domeniu (`oma_live_…`)

1. Panou de control: **Setări → Tokenuri de acces** → creați unul (nume + domeniu). **Secretul este afișat o singură dată.**
2. Sau prin CLI: `omniroute connect <host>` (parolă → token). Consultați [Modul la distanță](./REMOTE-MODE.md).
3. Antet: `Authorization: Bearer oma_live_…`
4. Revocați-l din aceeași pagină Tokenuri de acces (sau ștergeți contextul CLI).
5. Serverul stochează doar un hash. Tratați textul în clar ca pe o parolă.

### Cheie API cu domeniul manage

1. Panou de control: **Manager API / Chei API** → creați sau editați o cheie → activați `manage` (sau `admin`).
2. Antet: `Authorization: Bearer sk-…` (prefixul real al cheii).
3. Revocați cheia sau eliminați `manage` din aceeași interfață.
4. Pentru privilegii minime în automatizările care nu utilizează CLI-ul: preferați un token de acces `read` pentru sarcinile care folosesc exclusiv GET; utilizați `manage` pentru o cheie API numai atunci când apelantul trebuie să comunice atât cu `/v1`, cât și cu interfața de administrare.

---

## Formatul antetului

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Nu includeți acreditările de administrare în calea URL sau în șirul de interogare. Autentificarea pentru administrare se face numai prin antet/cookie.

---

## Exemple de copiat și lipit

Doar în citire (listarea furnizorilor). Utilizați un token de acces `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modificare (crearea unei conexiuni la un furnizor). Utilizați un token de acces `write`/`admin` sau o cheie API cu domeniul de aplicare `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferență (nu administrare). Cheie API obișnuită, fără a necesita `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Erori curente de execuție (nu afișați secretele)

| Situație                                                | Stare tipică | Mesaj (secretizat)                                                   |
| ------------------------------------------------------- | ------------ | -------------------------------------------------------------------- |
| Nicio acreditare                                        | 401          | `Authentication required`                                            |
| `oma_live_…` nevalid/expirat                            | 401          | `Invalid or expired access token`                                    |
| Cheie API validă fără `manage`/`admin`                  | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Cheie API obișnuită nevalidă pe o rută de administrare  | 403          | `Invalid management token`                                           |
| Domeniu de aplicare insuficient pentru tokenul de acces | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Invalid management token” înseamnă că tokenul purtător **nu** a fost acceptat drept acreditare de administrare. Mesajul **nu** indică ce tip de acreditare trebuie generat. Utilizați tabelul de mai sus: cheile de inferență necesită domeniul de aplicare `manage`; CLI-ul la distanță necesită `oma_live_…`; panoul de control utilizează cookie-ul de sesiune.

---

## Opțiunea recomandată cu privilegii minime

| Apelant                                                 | Utilizare                                                              |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| Browser                                                 | Sesiunea panoului de control                                           |
| CLI pe gazda serverului                                 | Token de mașină                                                        |
| CLI pe un laptop care comunică cu un server la distanță | `oma_live_…` de la `omniroute connect`                                 |
| CI / scripturi (doar administrare)                      | `oma_live_…` cu cel mai restrâns domeniu de aplicare care funcționează |
| CI care trebuie să apeleze atât `/v1`, cât și `/api`    | Cheie API cu `manage` **sau** două acreditări                          |
