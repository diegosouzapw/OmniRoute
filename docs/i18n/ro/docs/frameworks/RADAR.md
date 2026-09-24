# Radar Free-Model Catalog (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Sursa de referință:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Ultima actualizare:** 2026-09-01 — v3.8.51
> **Limita dovezilor privind serviciul găzduit:** regulile de pe server descrise aici au fost verificate la
> 2026-09-01 în raport cu serverul Radar menținut în mod intenționat privat, la revizia exactă
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Implementarea respectivă nu este distribuită în
> acest depozit OSS; disponibilitatea serviciului găzduit rămâne o stare operațională separată.

Radar este un **modul suplimentar opțional** care suprapune un catalog semnat și recent
actualizat de modele gratuite peste baza de referință a versiunii (`FREE_MODEL_BUDGETS` din
`open-sse/config/freeModelCatalog.data.ts`). Acesta există deoarece ecosistemul nivelurilor gratuite
se schimbă mai rapid decât ritmul lansărilor — furnizorii adaugă, reduc sau elimină cotele gratuite între
lansări, iar catalogul de referință poate fi actualizat numai atunci când este publicată o versiune nouă.

**Nimic din ceea ce este gratuit astăzi nu încetează să fie gratuit din cauza fluxului de la distanță.** Radar nu
restricționează niciodată contra cost o intrare din baza de referință; acesta doar actualizează câmpurile privind limitele/starea la citire și poate
adăuga modele gratuite nou descoperite între lansări. Un operator poate în continuare să ascundă local un
model și îl poate restaura din același panou de control. Catalogul de referință în sine
nu este niciodată modificat pe disc — consultați
[Regulile de îmbinare prin suprapunere la citire](#read-time-overlay-merge-rules) de mai jos.

---

## Starea livrării în v3.8.51

Următoarea stare diferențiază ceea ce implementează această versiune OSS de fluxurile de lucru Radar
ulterioare. Este o stare la nivel de cod, nu o promisiune că o anumită implementare găzduită
sau integrare externă este disponibilă în prezent.

| Domeniu                                    | Starea în această versiune                                                                                                                                                                                                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client pentru catalogul semnat             | Implementat în spatele `RADAR_ENABLED`, cu înscriere separată, verificare Ed25519, setări/cache locale criptate, suprascrieri persistente pentru afișare/activare, marcaje de ștergere reversibile, planificator și panou de control.                                              |
| Activarea contribuitorilor                 | Panoul de control oferă un link către fluxul GitHub de revendicare găzduit pe server și acceptă o cheie `omr_…` existentă. Eligibilitatea contribuitorilor este stabilită de serviciul privat; clientul OSS nu conține niciun token GitHub sau logică de emitere.                  |
| Activarea prin cheia de susținător         | Implementată. Cheia brută este validată, criptată în repaus, mascată la citire și trimisă numai prin sincronizarea de pe server. Modificarea sau ștergerea cheii invalidează toate cele patru cache-uri de flux sensibile la drepturi.                                             |
| Linkuri de recomandare                     | Implementate ca un flux semnat separat, reîmprospătat din oră în oră. Linkurile fixe sunt disponibile imediat nivelului comunității; campaniile limitate rămân date ale nivelului live.                                                                                            |
| Oferte pentru susținători                  | Implementate ca un flux separat, semnat și exclusiv live, precum și ca o pagină în panoul de control. Clientul revalidează schema închisă a beneficiilor, păstrează ultimul cache valid, filtrează intrările expirate și etichetează explicit ofertele partenerilor.               |
| Informații și recunoașterea susținătorilor | Implementate ca un flux strict, semnat și exclusiv live, cu ELO administrat de Radar, informații factuale despre actualitatea/tendința catalogului, o insignă locală verificată de susținător, o pagină în panoul de control și comenzi CLI doar locale pentru stare/sincronizare. |
| Plăți și e-mailuri tranzacționale          | Neimplementate în clientul OSS. Achiziția, donația, verificarea chitanțelor, recuperarea și livrarea e-mailurilor aparțin serviciului privat; disponibilitatea găzduită depinde în continuare de implementarea sa supravegheată și de configurarea furnizorului.                   |
| Fluxul de lucru al agentului de cercetare  | Nu face parte din această versiune a clientului. Conținutul organizat al fluxului rămâne reprezentat de date de pe server; niciun agent autonom de cercetare nu rulează într-o instalare OmniRoute.                                                                                |

---

## Cititorul de anunțuri publice

Cititorul generic de anunțuri este separat de flagul de funcționalitate Radar. Pagina principală a panoului de control și
vizualizatorul Jurnalului de modificări preiau fișierul public `news.json` al depozitului printr-un simplu `GET` către
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Acestea nu trimit nicio setare Radar, niciun prompt, nicio configurație
de furnizor, nicio înregistrare de utilizare și nicio stare locală de ignorare.

`news.json` utilizează schema v2 închisă implementată de `parseNewsPayload()`:

- `schemaVersion: 2` și o colecție `items[]` cu dimensiune limitată;
- valori `id` stabile și unice pentru anunțuri;
- câmpuri explicite `active` și ISO `publishedAt`;
- text în limba engleză obligatoriu, cu text localizat opțional;
- linkuri HTTPS opționale, care nu necesită acreditări, și o pictogramă dintr-o listă de permisiuni;
- selectarea celui mai nou anunț activ, revenirea la limba engleză când localizarea nu este disponibilă și ignorarea locală per ID.

Parserul acceptă temporar vechiul format singular `{ active, title, message, ... }`, astfel încât
forkurile mai vechi să poată migra fără ca vizualizarea Jurnalului de modificări să fie nefuncțională. Fluxurile nevalide sunt inactive. Intrarea de
lansare Radar este livrată cu `active: false`; schimbarea acesteia la `true` este o acțiune de lansare separată,
efectuată după îmbinare și implementare, și nu modifică `RADAR_ENABLED` sau opțiunea independentă de sincronizare a fluxului.

---

## Flag: `RADAR_ENABLED` (dezactivat implicit)

Radar este protejat integral de flagul de funcționalitate `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, categoria `policies`,
`defaultValue: "false"`).

**Când flagul este dezactivat, suprafața nu există:**

- Toate endpointurile `/api/radar/*`, inclusiv citirile și scrierile locale ale stării modelului,
  returnează `404` înainte de a accesa orice modul Radar.
- Ecranele panoului de control (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) redau
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) returnează baza de referință nemodificată —
  același număr de intrări, aceleași valori, fiecare intrare etichetată cu `origin: "baseline"` — și nu
  citește niciodată memoria cache a fluxului.
- Nu este efectuat niciodată niciun apel Radar în rețea; fiecare modul de sincronizare returnează `{ status: "disabled" }`
  înainte de a apela `fetch`.

Aceasta este o barieră strictă de tip superset: activarea flagului deblochează doar _ecranele_,
nimic mai mult. Nu încarcă date, nu pornește o sincronizare în fundal și nu modifică
rutarea sau selectarea modelului — consultați opțiunea separată de mai jos.

---

## Sincronizarea datelor este o opțiune SEPARATĂ — promisiunea privind confidențialitatea

Activarea `RADAR_ENABLED` deblochează doar interfața cu utilizatorul. Sincronizarea fluxului necesită o a doua
opțiune independentă, stocată în `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migrarea `136_radar_cache_settings.sql`). `syncRadar()` verifică flagul _și_ opțiunea
înainte de a efectua orice apel în rețea:

```
Flag dezactivat  → { status: "disabled" }   — niciun apel în rețea
Opțiune refuzată → { status: "opt_out" }    — niciun apel în rețea
```

Când ambele sunt activate, calea de sincronizare este:

1. `GET <URL de bază al fluxului>/v1/catalog/latest` cu `x-omniroute-radar-schema: 2` și un antet opțional
   `Authorization: Bearer <cheie de susținător>` (consultați mai jos). În absența antetului schemei, serverele utilizează implicit
   artefactul de tranziție v1 semnat separat, astfel încât clienții instalați mai vechi să continue
   să primească actualizări.
2. Acesta este un flux al aplicației exclusiv pentru descărcare, dar reprezintă totuși o solicitare HTTPS. Infrastructura
   găzduită primește metadate obișnuite ale conexiunii, precum adresa IP sursă. Când este configurată o cheie de susținător,
   sincronizarea trimite și cheia respectivă în antetul Bearer, astfel încât serviciul să poată determina
   drepturile de acces. La revizia exactă a serverului privat identificată în limita dovezilor de mai sus,
   contabilizarea solicitărilor fluxului utilizează hashuri ale cheilor, utilizare agregată și un HMAC trunchiat, cu rotație
   zilnică, al adresei IP pentru verificarea manuală a abuzurilor; aceste tabele nu păstrează nici cheia, nici adresa IP în formă brută.
   Jurnalele de acces ale infrastructurii și căsuța de livrare criptată reprezintă limite operaționale
   separate.
3. OmniRoute nu trimite niciodată prompturi, răspunsuri, conversații, acreditări ale furnizorilor, trafic al modelelor,
   disponibilitate, latență sau configurația locală a furnizorilor către serviciul Radar.
4. Răspunsul este verificat, validat și stocat local în cache (consultați
   [Modelul de securitate](#security-model)). Radar are exact patru căi de rețea pe partea de server:
   `syncRadar()` pentru catalog, `syncRadarReferrals()` pentru recomandări și
   `syncRadarOffers()` / `syncRadarIntel()` pentru oferte și informații Intel destinate exclusiv susținătorilor.

**Cheia de susținător** este un token Bearer opțional (`radar_settings.supporter_key`)
care permite serviciului de flux să decidă ce nivel să furnizeze (consultați
[Niveluri](#tiers-community-and-live)). Aceasta este:

- Stocată **criptat în repaus** cu aceleași funcții auxiliare AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) utilizate pentru acreditările furnizorilor.
- Setată prin `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) și
  **nu este niciodată returnată integral** — răspunsul returnează o formă mascată (`omr_****abcd`).
- Modificarea sau ștergerea acesteia invalidează atomic cache-urile pentru catalog, recomandări, oferte și Intel.
  Următoarea sincronizare/citire determină noile drepturi de acces pe partea de server; salvarea unei chei nu efectuează
  în sine o solicitare de rețea și nu consumă o cheie de activare de unică folosință.
- Trimisă serviciului de flux ca token Bearer în solicitarea GET de sincronizare — nicio altă informație despre
  cheie nu părăsește vreodată clientul.

---

## Reguli de acces și siguranță afișate înainte de înscriere

Panoul de control inactiv afișează aceste reguli din
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **înainte** de oricare dintre acțiunile de activare.
Scala canonică de acces este:

| Nivel                    | Eligibilitate                                                                                               | Acces                                                 | Regulă privind repetarea/expirarea                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| Comunitate               | Oricine; fără cheie                                                                                         | Catalog complet întârziat cu aproximativ 30 de zile   | Disponibil permanent; fără emitere                                           |
| Stea + urmărire          | GitHub OAuth verifică atât acordarea unei stele repository-ului, cât și urmărirea proprietarului            | O citire a catalogului live, apoi acces de Comunitate | O emitere per autentificare; nu se reemite niciodată                         |
| Contributor Top 10       | Pozițiile 1–10 în cel mai recent clasament săptămânal complet                                               | 365 de zile de acces live                             | Revendicat la cerere; ieșirea din clasament nu scurtează o perioadă acordată |
| Contributor Top 100      | Pozițiile 11–100 în acel clasament                                                                          | 90 de zile de acces live                              | Aceeași regulă de revendicare la cerere/idempotentă                          |
| Achiziție de susținător  | Achiziție unică pentru 6 luni, 1 an sau pe viață                                                            | Catalog live, oferte live semnate și Intel            | Fără reînnoire automată                                                      |
| Donație/acordare manuală | Donație verificată de proprietar sau acordare de către proprietar pentru un număr explicit de zile/pe viață | Același drept de acces live pentru perioada acordată  | Acordare auditată, idempotentă                                               |

PR-urile fuzionate, commit-urile și liniile modificate sunt **doar date de intrare pentru clasament**. O autentificare din afara Top 100 nu primește
niciun drept de acces pentru contributori, indiferent de numărul de PR-uri. Achizițiile finite, donațiile, perioadele pentru contributori și
acordările manuale se cumulează începând de la data expirării curente; accesul pe viață prevalează. O schimbare de clasament nu
revocă și nu scurtează retroactiv perioada deja acordată.

Licența găzduită este personală, iar regula prezentată utilizatorului permite o singură instalare activă la un moment dat. Această
versiune **nu** pretinde că folosește o blocare hardware: sincronizarea OSS nu generează amprente hardware și nu menține un
contract criptografic de închiriere a dispozitivului. La revizia verificată a serverului privat menționată mai sus, mecanismul de aplicare implementat
constă în validarea drepturilor de acces plus un semnal pentru verificare manuală atunci când aceeași cheie live este detectată de la o a patra
adresă IP distinctă în decurs de 24 de ore. Semnalul respectiv nu blochează și nu revocă niciodată automat o cheie. Recuperarea
revocă și înlocuiește cheia pierdută, păstrând data de expirare existentă; aceasta nu reîncepe
perioada achiziționată sau acordată.

Ofertele live sunt gestionate manual și se pot modifica sau pot expira. Ecranul de înscriere precizează, de asemenea, limita exactă
a confidențialității: sunt descărcate metadatele semnate ale catalogului/recomandărilor; o cheie validă deblochează suplimentar
ofertele semnate și Intel; cheia Bearer și metadatele normale ale conexiunii ajung la serviciul găzduit;
prompturile, răspunsurile, conversațiile, datele de autentificare ale furnizorilor, traficul modelelor, timpul de funcționare, latența și configurația locală
a furnizorilor nu ajung la acesta.

---

## Obținerea unei chei de susținător

Ecranul de activare (`/dashboard/radar`) oferă linkuri către două fluxuri pentru **obținerea** unei
chei de susținător. Repo-ul OSS nu emite niciodată o astfel de cheie, nu execută cod pentru plăți și
**nu menționează niciodată un preț** — prețurile sunt stabilite și afișate în întregime pe
paginile de destinație, nu în acest repo (decizia de specificație D14).

- **„Sunt contribuitor”** — deschide `RADAR_CONTRIBUTOR_CLAIM_URL` (implicit
  `https://radar.omniroute.online/auth/github`), un flux de revendicare GitHub OAuth găzduit pe
  serverul Radar privat. Acesta verifică cel mai recent clasament săptămânal complet: primii 10 primesc 365 de zile,
  iar pozițiile 11–100 primesc 90 de zile. În afara primilor 100, numărul de PR-uri nu acordă niciodată acces; fluxul
  verifică în schimb nivelul separat, cu utilizare unică, bazat pe acordarea unei stele + urmărire.
- **„Susține proiectul”** — deschide `RADAR_SUPPORTER_PLANS_URL` (implicit
  `https://radar.omniroute.online/planos`), pagina găzduită pentru opțiunile cu plată unică pentru 6 luni, 1 an și
  pe viață. Pagina OSS continuă să nu afișeze nicio valoare monetară.

Ambele URL-uri sunt rezolvate pe server (`src/lib/radar/links.ts`, același model de suprascriere
prin variabile de mediu ca `RADAR_FEED_URL`) și transmise către panoul de control prin răspunsul existent
`GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) — componenta
client nu citește niciodată direct `process.env`.

| Variabilă                     | Scop                                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Suprascrie URL-ul de revendicare pentru contribuitori (implicit `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Suprascrie URL-ul planurilor pentru susținători (implicit `https://radar.omniroute.online/planos`).            |

### Recuperarea unei chei de susținător pierdute

Punctul de intrare pentru recuperare al serviciului găzduit este `https://radar.omniroute.online/recover`; acesta este, de asemenea,
accesibil printr-un link de pe pagina planurilor. Recuperarea rămâne în întregime în afara clientului OSS, deoarece instalarea locală
nu primește niciodată adresa de e-mail a cumpărătorului/contribuitorului și nu poate reconstrui o cheie brută din
setările sale criptate.

1. Trimiteți adresa de e-mail asociată cheii. Serviciul returnează aceeași pagină de confirmare indiferent dacă
   există sau nu o licență recuperabilă, astfel încât formularul nu permite enumerarea conturilor.
2. Dacă există eligibilitate, procesul de livrare trimite un link cu durată scurtă de valabilitate și care poate fi utilizat o singură dată. Deschiderea acestuia mută imediat
   tokenul într-un cookie criptat temporar `HttpOnly`/`Secure` și redirecționează către URL-ul curat
   `/recover`; pagina nu conține niciun token, nicio adresă de e-mail, nicio cheie veche și nicio cheie de înlocuire.
3. Confirmați revocarea. Serviciul privat revocă cheia anterioară, creează cheia de înlocuire cu
   același plan/aceeași expirare și o plasează în coada de trimitere prin e-mail în cadrul unei singure tranzacții. Cheia de înlocuire nu este niciodată
   returnată browserului.
4. Lipiți cheia de înlocuire în `/dashboard/radar`. Cheia veche trebuie acum să retrogradeze la `community`;
   cheia de înlocuire trebuie să producă o sincronizare `live` verificată. Redeschiderea aceluiași link de recuperare trebuie să eșueze cu
   un răspuns generic de tip nevalid/expirat.

Ruta de recuperare găzduită și procesul de e-mail pot fi prezente în cod, dar totuși indisponibile într-o anumită
implementare. Nu considerați fluxul pregătit pentru producție până când serverul nu a fost implementat, furnizorul de
livrare nu a fost configurat cu un destinatar controlat, iar linkul complet cu utilizare unică nu a fost testat.

După ce un vizitator are o cheie (`omr_` + 40 de caractere hexazecimale), ecranul de activare
(`src/app/(dashboard)/dashboard/radar/page.tsx`) oferă ca flux principal un câmp pentru lipirea cheii:
lipirea unei chei și trimiterea formularului efectuează `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) într-un singur apel — lipirea unei chei o setează și activează participarea,
deblocând ecranul. Formatul (`omr_` + 40 de caractere hexazecimale) este verificat mai întâi pe partea de client
cu funcția auxiliară partajată `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`),
pentru o experiență de utilizare mai bună; schema Zod a serverului reprezintă în orice caz verificarea autoritativă. După ce o
cheie este setată, ecranul de activare afișează forma mascată (`supporterKeyMasked` din
`GET /api/radar/settings`) în locul unui câmp gol, împreună cu un control „schimbă cheia” pentru
lipirea uneia noi — cheia brută nu este afișată din nou niciodată. Cele două butoane de revendicare/planuri de mai sus
rămân modalitatea de a _obține_ inițial o cheie; acest câmp este locul în care un operator
care are deja una o activează.

### Activarea integrală și configurarea ghidată

Serviciul privat de flux și acest client OSS au o delimitare restrânsă în mod intenționat: serviciul
emite și validează cheia de susținător, în timp ce instalarea locală OmniRoute criptează cheia,
sincronizează artefactele semnate pe server și ghidează configurarea furnizorului. Ordinea validării asistate este:

1. Obțineți o cheie nou emisă sau recuperată din revendicarea contributorului, fluxul pentru planuri/finalizarea comenzii, procesul de recuperare sau de la un operator autorizat al unui server privat. Nu inserați cheia brută în jurnale, capturi de ecran, comentarii la probleme sau argumente în linia de comandă.
2. Activați indicatorul de funcționalitate `RADAR_ENABLED` în instalarea locală OmniRoute. Acesta expune interfața, dar nu inițiază activitate de rețea până când opțiunea separată de participare este salvată.
3. Deschideți `/dashboard/radar`, inserați cheia și activați. Browserul trimite local o singură solicitare `POST /api/radar/settings` cu `{ optIn: true, supporterKey }`; cheia este criptată local, iar răspunsul conține numai `omr_****<last4>`.
4. Permiteți ecranului de activare să execute sincronizarea catalogului sau selectați **Sincronizați acum**. Confirmați că pagina raportează `live`, o versiune a fluxului și ora preluării. Pentru o diagnosticare locală autentificată, `GET /api/radar/status` raportează starea participării/prezenței cheii și cele patru stări ale memoriei cache, fără a returna cheia. `POST /api/radar/sync-all` poate reîmprospăta în mod explicit catalogul, recomandările, ofertele și Intel.
5. Deschideți `/dashboard/radar/setup?provider=<provider>`. Accesați URL-ul pentru acreditări gestionat de furnizor, selectați **Adăugați cheia API**, salvați prin formularul real al furnizorului, reveniți la ghid și executați **Testați conexiunea**. Ghidul utilizează rutele obișnuite `/api/providers` și `/api/providers/<connection-id>/test`; acesta nu creează o acreditare Radar paralelă.
6. Deschideți `/dashboard/radar/combos` după ce sunt active cel puțin două conexiuni de furnizor compatibile. Examinați familia sugerată și creați combinația prin API-ul existent pentru combinații. Ofertele și Intel rămân memorii cache semnate separate, disponibile numai în modul live, și pot fi verificate în paginile Radar dedicate.
7. Reîncărcați `/dashboard/radar` și pagina de configurare. Participarea, starea cheii mascate, memoria cache verificată, conexiunea salvată a furnizorului și acțiunea de testare trebuie să persiste după reîncărcare. Capturați dovezi numai după ce cheia brută și acreditarea furnizorului nu mai sunt vizibile.

Salvarea unei chei nu reprezintă în sine dovada unui drept de acces live. Dovada constă în combinația dintre rezultatul `GET /v1/license/check` al serviciului privat, nivelul `live` furnizat de catalogul OSS, o memorie cache semnată și verificată și fluxul real de conectare/testare a furnizorului. O cheie nevalidă, expirată sau revocată retrogradează în siguranță catalogul la `community`; aceasta nu trebuie raportată drept validare reușită a unei chei live.

### Link către panoul privat de administrare

`RADAR_ADMIN_URL` adaugă opțional **Administrare Radar ↗** imediat după elementul Radar destinat utilizatorilor din secțiunea Costuri a barei laterale. În mod deliberat, acesta nu are nicio valoare implicită: când variabila nu este setată sau este nevalidă, bara laterală statică, paleta de comenzi și ecranul de personalizare a barei laterale nu conțin niciun element de administrare și niciun URL privat.

Valoarea este rezolvată pe server și transmisă prin răspunsul `GET /api/settings`, autentificat pentru administrare, numai unei sesiuni autentificate a tabloului de bord sau proprietarului de încredere de pe interfața loopback în timpul inițializării locale fără autentificare. Autentificarea prin CLI, servicii interne și chei API cu domeniu de administrare nu primește această valoare. Browserul validează din nou răspunsul înainte de a crea linkul extern, care se deschide cu `noopener noreferrer`.

Utilizați un URL HTTPS de tunel/tailnet fără acreditări. HTTP simplu este acceptat numai pentru o redirecționare SSH prin interfața loopback, precum `http://127.0.0.1:9351`; alte scheme, acreditările încorporate, URL-urile incorect formate și destinațiile HTTP la distanță sunt respinse în mod sigur și lasă navigarea inactivă.

---

## Model de securitate

### Semnătură Ed25519 aplicată octeților exacți

Conținutul fluxului este semnat cu Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifică semnătura aplicată **octeților exacți ai răspunsului**
primiți prin rețea — conținutul nu este niciodată serializat din nou înainte de verificare,
astfel încât o recodificare octet cu octet nu poate invalida sau ocoli în mod neobservat
verificarea semnăturii. Eșecul verificării (`invalid_signature`) întrerupe sincronizarea
înainte ca acel conținut să fie analizat sau stocat în cache.

### Cheie publică fixată + rotație

Cheia publică de verificare este fixată în `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), o matrice în care o cheie nouă poate fi adăugată la
început înaintea unei rotații, în timp ce fluxurile vechi din cache, semnate cu o cheie
anterioară, rămân valide până la resincronizare.

### Suprascrieri prin variabile de mediu, adecvate pentru fork-uri

Două variabile de mediu permit fork-urilor și instanțelor găzduite individual să
direcționeze clientul către propriul flux în locul serviciului OmniRoute implicit —
consultați mai jos
[Cum să găzduiți individual un flux](#how-to-self-host-a-feed):

| Variabilă           | Scop                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | Suprascrie URL-ul de bază al fluxului (implicit `https://radar.omniroute.online`).                                             |
| `RADAR_FEED_PUBKEY` | Suprascrie cheia publică fixată (SPKI DER codificat în base64 sau PEM), înlocuind matricea încorporată cu această cheie unică. |

### Versiune minimă

`syncRadar()` respinge un flux descărcat a cărui `version` nu este strict mai nouă decât
versiunea aflată în prezent în cache (comparație `compareVersions()`, în formatul
punctat `YYYY.MM.DD.n`) — `{ status: "stale" }`. Acest lucru împiedică un endpoint de
flux compromis sau configurat greșit să readucă un client la un conținut mai vechi,
semnat diferit.

### Două date și motivul pentru care sunt păstrate ambele

Un flux stocat în cache conține două date distincte, iar evitarea confundării lor este
tocmai motivul pentru care sunt păstrate ambele:

| Câmp          | Provine din               | Indică                                    |
| ------------- | ------------------------- | ----------------------------------------- |
| `generatedAt` | corpul semnat al fluxului | cât de vechi sunt **datele**              |
| `fetchedAt`   | ceasul acestei instalări  | când le-a **descărcat** această instalare |

Un flux preluat cu câteva minute în urmă poate conține cifre vechi de câteva săptămâni,
astfel încât `fetchedAt` singur nu îi poate indica unui operator dacă suprapunerea este
mai recentă decât baza pe care este aplicată. Ambele sunt păstrate în
`radar_feed_cache`, returnate de `getRadarCatalog().meta` și raportate separat de
`GET /api/radar/status`. Un rând stocat în cache înainte de existența coloanei
`generated_at` (migrarea 163) este citit ca `null` — o valoare necunoscută rămâne
necunoscută, în loc să preia momentul descărcării. `radar_referrals_cache` și-a păstrat
propriul `generated_at` începând cu migrarea 142.

Versiunea minimă de mai sus compară `version`, nu vreuna dintre date.

Au rămas două lacune, ambele intenționate: tabloul de bord afișează în continuare doar
`Last fetched`, astfel încât afișarea acolo a datei versiunii necesită o etichetă nouă
(și cele 41 de intrări localizate ale acesteia); iar cache-urile pentru oferte și informații
nu păstrează deloc data versiunii, chiar dacă schemele fluxurilor lor includ una —
`GET /api/radar/status` omite, așadar, câmpul pentru acestea două, în loc să raporteze
un `null` care ar fi interpretat drept „necunoscut”.

### Validarea schemei

Octeții descărcați sunt analizați și validați în raport cu `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, o schemă Zod) **după** verificarea semnăturii. O
nepotrivire a schemei returnează `{ status: "invalid_schema" }`, iar cache-ul rămâne
nemodificat. Conținutul din cache este revalidat preventiv la fiecare citire
(`getRadarCatalog()`) — un rând de cache corupt sau editat manual determină revenirea
la baza implicită, în loc să fie furnizat.

### Limită pentru dimensiunea răspunsului (10 MB)

`syncRadar()` impune o **limită strictă de 10 MB** pentru corpul răspunsului fluxului —
fluxul semnat este un document JSON de ordinul kiloocteților, astfel încât orice
depășește această dimensiune indică un `RADAR_FEED_URL` configurat greșit sau ostil
(ori o sursă din amonte care furnizează date nevalide), nu un catalog legitim.
Aplicarea limitei are două niveluri:

1. O verificare preliminară a `Content-Length` omite complet citirea corpului atunci
   când antetul declară deja o valoare care depășește limita.
2. O verificare continuă a totalului în timpul citirii corpului impune limita chiar și
   atunci când `Content-Length` lipsește sau declară o dimensiune mai mică decât cea
   reală — antetul nu este niciodată considerat suficient de unul singur. Concatenarea
   fragmentelor acumulate păstrează octeții exacți necesari pentru verificarea
   ulterioară a semnăturii Ed25519.

Depășirea limitei returnează `{ status: "too_large" }` și lasă cache-ul nemodificat,
urmând același model nedistructiv ca orice alt eșec de sincronizare
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Niveluri: `community` și `live`

Schema fluxului conține un câmp `tier: "community" | "live"`, stabilit **pe server**
de serviciul de flux pe baza cererii (prezența și validitatea cheii de susținător)
— clientul nu își stabilește niciodată propriul nivel.

- **`community`** — catalogul gratuit, decalat cu aproximativ 30 de zile față de cele
  mai recente date. Acesta este primit de o cerere neautentificată sau cu o cheie nevalidă.
- **`live`** — cel mai recent catalog, furnizat cererilor care conțin o cheie de
  susținător validă.

**O cheie de susținător nevalidă sau expirată retrogradează la `community` — nu reprezintă
niciodată o eroare.** Calea de sincronizare face distincție doar între eșecurile de semnătură/schemă/versiune (toate
recuperabile, toate nefatale pentru starea din cache) și un rezultat reușit `{ status:
"updated", version, tier }`. Nu există o cale de eroare specifică nivelului pe care clientul trebuie să o
gestioneze.

### Nivelul furnizat provine dintr-un antet de răspuns, nu din corpul semnat

Câmpul `tier` din **corpul** fluxului semnat este întotdeauna `"live"` — serviciul de flux livrează
**două artefacte semnate pentru fiecare versiune**: cel live include campaniile curente, iar cel community
le omite. Fiecare artefact este semnat pe baza propriilor octeți exacți. Corpul tot nu
servește drept decizie privind drepturile de acces; nivelul selectat efectiv pentru o cerere este transmis
în **antetul de răspuns `x-omniroute-feed-tier`**, stabilit pe server pe baza cheii
`Authorization` din cerere.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) este singurul loc
care determină nivelul în care un client trebuie să aibă încredere:

1. Analizează `x-omniroute-feed-tier` cu `RadarTierSchema` (Zod) — un antet absent sau
   o valoare care nu este exact `"community"` ori `"live"` este tratată ca **nefiind
   prezentă** (nu este niciodată considerată ca atare de încredere în cache/UI; aceasta acoperă și serverele de flux
   mai vechi, anterioare antetului).
2. Revine la câmpul `tier` din corpul semnat (întotdeauna `"live"`) numai atunci când pasul 1
   nu produce niciun rezultat.
3. Nivelul determinat este cel memorat în cache și returnat ca `{ status: "updated",
version, tier }` — aceasta este valoarea afișată de panoul de control, niciodată câmpul brut din
   corp.

---

## Reguli de îmbinare a suprapunerii la citire

`applyFeed()` (`src/lib/radar/applyFeed.ts`) îmbină fluxul din cache **peste**
referința statică la **momentul citirii**, în interiorul `getRadarCatalog()`. Matricea de referință
(`FREE_MODEL_BUDGETS`) nu este modificată niciodată — un `MergedEntry[]` este calculat de la zero la fiecare
apel.

Patru reguli, în ordinea precedenței:

1. **Fluxul nu suprascrie niciodată o valoare locală personalizată.** Pentru fiecare câmp: dacă operatorul a
   personalizat un câmp al unei intrări (harta `localOverrides`, indexată după `provider:modelId`),
   valoarea din flux pentru acel câmp specific este omisă — valoarea operatorului are prioritate.
2. **`enabled: false` dezactivează intrarea, păstrând proveniența.** O intrare din flux care
   dezactivează o intrare setează `enabled: false` și `disabledBy: "radar"` în rezultatul îmbinat,
   astfel încât UI-ul să poată explica _de ce_ o intrare a trecut de la disponibilă la dezactivată.
3. **O intrare adăugată de utilizator, care nu este prezentă în flux, rămâne nealterată.** Intrările care
   există numai în referință (sau au fost adăugate local) și nu au o intrare corespunzătoare în flux
   sunt transmise mai departe fără modificări.
4. **O intrare marcată pentru ștergere nu este reactivată niciodată.** Dacă operatorul a șters explicit o
   intrare (setul `tombstones`), readăugarea acelui `provider:modelId` de către flux într-o versiune
   ulterioară nu o readuce.

Câmpurile editabile și marcajele de ștergere sunt persistate în
`radar_local_model_state` (migrarea `153_radar_local_model_state.sql`). Adaptorul public pentru baza de date
(`src/lib/db/radar.ts`) convertește acele rânduri în harta `localOverrides` și
setul `tombstones` utilizate de `applyFeed()`; în producție, `getRadarCatalog()` încarcă acea stare
după ce sunt trecute verificările pentru indicator, cache și schemă. Numai `displayName` și `enabled` pot fi
editate de operator. Identitatea furnizorului/modelului, proveniența fluxului, cota, capabilitățile, ToS
și datele de configurare nu pot fi scrise prin această interfață.

Panoul de control oferă patru acțiuni locale:

- **Editare** modifică numele afișat local și starea de activare.
- **Resetarea modificărilor locale** șterge ambele câmpuri editabile fără a modifica un marcaj de ștergere.
- **Ascundere** creează un marcaj de ștergere, astfel încât actualizările ulterioare ale fluxului să nu poată recrea rândul.
- **Restaurare** elimină marcajul de ștergere; orice valoare personalizată salvată separat rămâne în vigoare.

Un `enabled: false` din flux rămâne excepția de siguranță: are prioritate față de un
`enabled: true` local învechit, păstrează intrarea îmbinată dezactivată și înregistrează `disabledBy: "radar"`.

Publicările catalogului utilizează `schemaVersion: 2`. `contextWindow` și fiecare dintre `tools`, `vision` și
`thinking` sunt în mod independent `number | null` / `boolean | null`: `null` înseamnă necunoscut, în timp ce
`false` înseamnă că o sursă oficială a furnizorului, confirmată conform D16, afirmă explicit că respectiva capabilitate este absentă.
Indicatorii interni ai registrului/specificațiilor de model OmniRoute nu sunt niciodată promovați direct ca fapte în flux. Clientul
acceptă în continuare instantanee v1; deoarece vechiul constructor utiliza `false` drept substituent pentru absență, valoarea v1 `false` este
normalizată la necunoscut, în timp ce v1 `true` rămâne factuală. Versiunile necunoscute ale schemei eșuează în mod sigur, iar
ultimul cache valid rămâne disponibil. Fiecare model v2 cu un context/o capabilitate nenul(ă) trebuie să conțină un
`metadataEvidenceUrls[]` HTTPS care nu necesită acreditări; în caz contrar, validarea schemei eșuează, iar cache-ul
nu este înlocuit. Tabelul catalogului afișează toate cele trei stări ca `✓`, `✕` și `?`.

### Combinații ghidate și acces MCP

Valorile `familyId` confirmate supraviețuiesc suprapunerii la citire și controlează modulul pur
`buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). O familie este sugerată
numai atunci când cel puțin doi furnizori distincți au conexiuni active și expun exact ID-ul de model selectat.
Modelele dezactivate, furnizorii inactivi, ID-urile de model lipsă, familiile cu un singur membru și potrivirile
ambigue de alias/prefix eșuează în mod sigur. Sugestiile utilizează strategia existentă `priority`, ordonând
mai întâi cel mai mare buget lunar recurent; UI-ul le creează numai prin `POST /api/combos`.

Interfața ghidată se află la `/dashboard/radar/combos`. Aceasta citește doar endpointurile locale
`GET /api/radar/catalog` și `GET /api/combos/builder/options`. Nu declanșează niciodată sincronizarea Radar,
nu citește credențialele furnizorului și nu scrie direct în baza de date cu combinații.

Clienții MCP pot citi aceeași proiecție locală cu `omniroute_radar_catalog` (`read:radar`). Filtrele
opționale `provider`, `familyId` și `enabledOnly` sunt evaluate după o singură citire locală
`GET /api/radar/catalog`. Rezultatul său restricționat include metadatele catalogului, precum și furnizorul/modelul,
numele afișat, `familyId`, cota, capabilitățile, starea de activare, originea și `disabledBy`; URL-urile de configurare,
pașii, conexiunile, adresele de e-mail, cheile și datele de recomandare nu sunt returnate niciodată. Acest instrument
este doar pentru citire și nu invocă niciodată `/api/radar/sync`.

### Marcatori de proveniență

Fiecare intrare îmbinată conține un câmp `origin`, pe care interfața îl afișează ca insignă:

- `"baseline"` — nemodificată față de catalogul static al versiunii.
- `"radar"` — unul sau mai multe câmpuri au fost actualizate de flux.
- `"local"` — operatorul are cel puțin o suprascriere locală pentru această intrare (suprascrierile
  locale au întotdeauna prioritate față de flux, conform regulii 1, indiferent de ceea ce indică fluxul).

---

## Suprafețe locale — niciodată un proxy pentru feed

Familiile de rute Radar locale de mai jos susțin interfața de utilizare din `src/app/api/radar/`:

| Rută                           | Metodă | Scop                                                                                                                                            |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Returnează catalogul combinat (`getRadarCatalog()`) din memoria cache locală.                                                                   |
| `/api/radar/sync`              | POST   | Declanșează `syncRadar()` pe server; returnează starea rezultată.                                                                               |
| `/api/radar/settings`          | GET    | Returnează `{ optIn, hasSupporterKey, supporterKeyMasked }` — niciodată cheia neprelucrată.                                                     |
| `/api/radar/settings`          | POST   | Setează consimțământul și/sau cheia (criptată) de susținător.                                                                                   |
| `/api/radar/referrals`         | GET    | Returnează `{ fixed, campaigns, tier }` din memoria cache locală — consultați [Linkuri de recomandare](#referral-links-free-credits) mai jos.   |
| `/api/radar/offers`            | GET    | Returnează ofertele active din memoria cache locală live verificată; nu returnează niciodată cheia de susținător.                               |
| `/api/radar/offers/sync`       | POST   | Declanșează pipeline-ul `syncRadarOffers()` de pe server, care utilizează exclusiv cheia live.                                                  |
| `/api/radar/intel`             | GET    | Returnează datele Intel live locale verificate și un indicator boolean pentru recunoașterea susținătorului; niciodată o identitate sau o cheie. |
| `/api/radar/intel/sync`        | POST   | Declanșează pipeline-ul `syncRadarIntel()` de pe server, care utilizează exclusiv cheia live.                                                   |
| `/api/radar/status`            | GET    | Returnează starea locală, doar în citire, a setărilor/memoriei cache pentru catalog, recomandări, oferte și Intel, fără secrete.                |
| `/api/radar/sync-all`          | POST   | Rulează toate cele patru module de sincronizare pe server și returnează o stare separată pentru fiecare feed.                                   |
| `/api/radar/local-model-state` | GET    | Listează suprascrierile persistente și marcajele de ștergere pentru controalele de editare/restaurare.                                          |
| `/api/radar/local-model-state` | PATCH  | Setează sau elimină câmpurile de suprascriere validate `displayName`/`enabled`.                                                                 |
| `/api/radar/local-model-state` | PUT    | Creează sau elimină un marcaj de ștergere cu `{ provider, modelId, tombstoned }`.                                                               |
| `/api/radar/local-model-state` | DELETE | Elimină câmpurile de suprascriere editabile, păstrând orice marcaj de ștergere.                                                                 |

**Regulă strictă: aceste rute nu acționează niciodată ca proxy pentru serviciul de feed.** Browserul comunică întotdeauna
doar cu serverul OmniRoute local. Cele patru module care interacționează cu serviciul Radar sunt
`src/lib/radar/sync.ts` (catalog), `src/lib/radar/referralsSync.ts` (recomandări) și
`src/lib/radar/offersSync.ts` (oferte), plus `src/lib/radar/intelSync.ts` (Intel); toate rulează
pe server, niciodată pe client. Astfel, URL-ul feedului și orice cheie de susținător
rămân complet absente din traficul de rețea destinat clientului.

Toate endpointurile Radar returnează `404` când `RADAR_ENABLED` este dezactivat (consultați
[Indicator](#flag-radar_enabled-default-off) mai sus) și procesează răspunsurile de eroare prin
`buildErrorBody()`/`sanitizeErrorMessage()`, conform regulii de sanitizare a erorilor aplicabile
întregului repo (`docs/security/ERROR_SANITIZATION.md`).

### Autentificare

Toate endpointurile Radar necesită autentificare prin `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — un cookie de sesiune al panoului de administrare sau o cheie
API cu permisiuni de administrare, aceeași barieră care protejează restul rutelor
`/api/settings/*`. Verificarea `404` pentru indicatorul dezactivat rulează întotdeauna
**înaintea** verificării autentificării, astfel încât o instalare cu `RADAR_ENABLED`
dezactivat rămâne identică la nivel de octet (fără solicitare de autentificare doar pentru a afla
că suprafața nu există); odată ce indicatorul este activat, o cerere neautentificată primește
`401` înainte de orice citire sau scriere în baza de date. `GET /api/radar/settings` nu returnează
niciodată cheia de susținător neprelucrată, indiferent de starea autentificării — doar forma
mascată și un indicator boolean `hasSupporterKey`.

---

## Oferte pentru susținători

Ofertele folosesc propriul artefact semnat, `GET /v1/offers/latest`, și nu partajează niciodată memoria cache a catalogului sau pe cea a recomandărilor. Endpointul serverului necesită o cheie Bearer validă pentru susținători live; nu există o alternativă pentru comunitate. Prin urmare, `syncRadarOffers()` se oprește înainte de a accesa rețeaua atunci când indicatorul funcționalității este dezactivat, operatorul nu și-a dat consimțământul sau nu este configurată nicio cheie pentru susținători.

După un GET reușit, clientul verifică semnătura Ed25519 pentru octeții exacți ai răspunsului, validează `RadarOffersFeedSchema`, impune ca atât corpul semnat, cât și antetul `x-omniroute-feed-tier` să indice `live`, impune o versiune cu notație punctată strict mai nouă și abia apoi înlocuiește atomic `radar_offers_cache` (migrarea `144_radar_offers_cache.sql`). Se aplică aceeași limită de 10 MB pentru antet plus flux utilizată de celelalte fluxuri. Erorile de semnătură, schemă, nivel, reluare, dimensiune, HTTP și rețea păstrează toate ultima memorie cache verificată.

Structura închisă a ofertelor acceptă trei tipuri comparabile de beneficii: procent în puncte de bază, credit în unități monetare minore sau zile de probă. O ofertă a unui partener trebuie să includă o referință publică de același tip, iar beneficiul său trebuie să fie strict mai mare; ofertele oficiale nu au o referință de partener. URL-urile trebuie să folosească HTTPS și să nu conțină date de autentificare. `getRadarOffers()` revalidează în mod defensiv sarcina utilă din memoria cache și filtrează intrările expirate la fiecare citire locală; `/dashboard/radar/offers` filtrează din nou intrările expirate înainte de randare, folosește textul în portugheză atunci când este disponibil, cu engleza drept variantă de rezervă, și etichetează explicit ofertele partenerilor.

Browserul apelează numai rute locale: citește instantaneul mascat al setărilor, solicită `POST /api/radar/offers/sync` pentru actualizarea pe server, apoi citește `GET /api/radar/offers`. În absența unei chei, afișează linkurile existente pentru contribuitori și susținere în loc să încerce o solicitare către flux. Linkurile externe ale ofertelor se deschid într-o filă nouă cu `noopener noreferrer`. În această versiune nu este expus niciun instrument MCP `radar_offers`.

---

## Radar Intel, insigna de susținător și CLI

Intel este un artefact semnat disponibil la `GET /v1/intel/latest`. Schema închisă `RadarIntelFeedSchema` acceptă numai clasamente ELO deținute de Radar, derivate de curatorul privat din comparații confirmate, precum și diferențe factuale de vechime/număr ale catalogului, derivate din instantanee semnate ale catalogului. Metodologia este fixată la un rating inițial de 1000 și K=32. Un clasament gol este valid atunci când nu a fost confirmată nicio comparație; clientul nu generează niciodată unul în mod sintetic.

`syncRadarIntel()` aplică aceleași cerințe ca ofertele: Bearer pe server, expirare după 30 de secunde, limită de flux de 10 MiB, verificare Ed25519 a octeților exacți, schemă strictă, cerința `live` pentru corp/antet, prag minim de versiune și păstrarea ultimei memorii cache valide. După ce un instantaneu live verificat este stocat persistent, clientul derivă `radar:<sha256(supporter key)>`, stochează numai acea identitate unidirecțională și emite evenimentul dedicat de recunoaștere `radar_supporter`. Insigna sa `radar-supporter` este idempotentă și acordă zero XP; nu actualizează niciodată clasamentele și nu reutilizează `token_share`. `/dashboard/radar/intel` randează insigna numai pe baza metadatelor verificate din memoria cache locală.

CLI-ul expune `omniroute radar status` și `omniroute radar sync`. Ambele comunică numai cu API-ul OmniRoute local. `status` efectuează o solicitare doar pentru citire `GET /api/radar/status`; `sync` trimite o singură solicitare `POST /api/radar/sync-all` și afișează câte un rezultat pentru fiecare flux. Niciuna dintre comenzi nu citește, nu acceptă și nu afișează cheia de susținător și niciuna nu contactează direct serviciul Radar.

---

## Linkuri de recomandare (credite gratuite)

Linkurile de recomandare sunt furnizate dintr-un flux **independent, mereu actualizat** —
`GET /v1/referrals/latest` — separat de fluxul catalogului. Acest lucru este intenționat:
fluxul catalogului pentru nivelul community este un instantaneu care poate avea o vechime
de până la 30 de zile, astfel încât un link de recomandare extras din acesta rămânea în
urma listei reale de linkuri a serverului cu aceeași perioadă (un link de recomandare
adăugat recent putea să nu ajungă la un utilizator free/community timp de până la o
lună). Fluxul de recomandări elimină această întârziere prin sincronizarea după propria
cadență, mult mai scurtă.

```ts
// Corpul răspunsului GET /v1/referrals/latest (semnat cu Ed25519, aceeași cheie fixată ca
// pentru fluxul catalogului):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — determinist: max(updatedAt) pentru toate linkurile
                                  // de recomandare, astfel încât două cereri identice produc exact
                                  // aceiași octeți semnați/aceeași semnătură
  referrals: {
    fixed: RadarReferral[],      // prezent la FIECARE nivel, inclusiv fără autentificare/community
    campaigns: RadarReferral[],  // populat numai pentru o cheie Bearer validă și activă (supporter);
                                  // cererile fără autentificare/cu o cheie expirată primesc []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Spre deosebire de fluxul catalogului, acest corp nu conține deloc câmpul `tier` —
serverul decide ce să includă pentru fiecare cerere pe baza cheii `Authorization`, astfel
încât antetul de răspuns `x-omniroute-feed-tier` este SINGURA sursă pentru nivelul
furnizat (`referralsSync.ts::syncRadarReferrals`); un antet absent/nerecunoscut este
retrogradat la `"community"`, presupunerea cu cele mai puține privilegii.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) validează întregul
corp, reutilizând aceeași schemă `RadarReferralSchema` pentru fiecare recomandare,
exportată din `feedSchema.ts`, astfel încât ambele fluxuri să valideze identic
recomandările individuale. Fiecare `RadarReferral.url` trebuie să fie `https://` — un
url `http://` nu trece validarea schemei.

VECHIUL câmp `referrals` încorporat în catalog din `RadarFeedSchema` (`feedSchema.ts`)
este păstrat pentru compatibilitate retroactivă cu fluxurile catalogului deja memorate
în cache, însă `getRadarReferrals()` nu îl mai citește — consultați
[Accesor](#accesor) mai jos.

### Sincronizare

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) este SINGURUL modul care
accesează rețeaua pentru recomandări, reproducând exact contractul lui `syncRadar()`:
indicator dezactivat → `disabled`; consimțământ fals → `opt_out`; descarcă
`${RADAR_FEED_URL}/v1/referrals/latest` (aceleași suprascrieri de ramificare
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` ca pentru catalog), verifică semnătura Ed25519
pentru octeții exacți ai răspunsului (`verifyFeedBytes`), validează folosind
`RadarReferralsFeedSchema` și memorează în cache în tabelul `radar_referrals_cache`
(migrarea `142_radar_referrals_cache.sql`) — un tabel complet separat de
`radar_feed_cache` al catalogului. O limită de 10 MB pentru răspuns și un prag inferior
pentru `generatedAt` resping un flux primit care este mai vechi decât cel din cache,
protejând împotriva reluării unui artefact semnat mai vechi. Un marcaj temporal egal este
acceptat: serverul atribuie intenționat variantelor community și live ale recomandărilor
același `generatedAt` determinist, astfel încât conținutul semnat și nivelul furnizat se
pot schimba după modificarea unei chei supporter fără ca setul de linkuri subiacent să se
schimbe. Nu generează niciodată excepții — returnează întotdeauna un obiect de stare;
erorile nu conțin niciodată o urmă a stivei în `reason`.

Două declanșatoare mențin actualizat cache-ul recomandărilor, ambele fiind independente
de cadența de 24h a catalogului:

- **Sincronizare la citire** — `GET /api/radar/referrals` apelează el însuși
  `syncRadarReferrals()` în linie ori de câte ori cache-ul lipsește sau este mai vechi
  decât `REFERRALS_STALE_MS` (1h, `shouldSyncReferralsOnRead()`), înainte de a furniza
  răspunsul. Acesta este mecanismul care face ca linkurile fixe să fie „mereu actualizate”
  chiar la următoarea încărcare a panoului de control, fără a aștepta vreun temporizator
  din fundal.
- **Sincronizare secundară a planificatorului** — `radarSchedulerTick()` (`scheduler.ts`)
  evaluează independent vechimea recomandărilor la același interval orar utilizat pentru
  catalog, apelând `syncRadarReferrals()` atunci când este necesar. Aceasta rulează
  indiferent dacă sincronizarea catalogului era sau nu necesară în acel interval și nu
  afectează niciodată forma lui `RadarTickResult` (doar un efect secundar de tip
  best-effort, ignorat în caz de eroare).

### Accesor

`src/lib/radar/index.ts` exportă doi accesori numai în citire, ambii negenerând niciodată
excepții (același contract defensiv ca `getRadarCatalog()` — un indicator dezactivat,
absența cache-ului sau un conținut din cache corupt sunt toate rezolvate la forma goală
în locul unei erori):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  citește din `radar_referrals_cache` (prin `getRadarReferralsCache()`) și validează
  folosind `RadarReferralsFeedSchema` — **nu** cache-ul catalogului.
- `getDefaultReferralFor(provider)` → recomandarea `fixed` cu `isDefault: true` pentru
  furnizorul respectiv sau `null`. Verifică numai `fixed` — o campanie nu este niciodată
  utilizată drept link „implicit” al unui furnizor.

Regula efectivă care stabilește „care recomandare este cea implicită pentru un furnizor”
se află în `findDefaultReferral()` (`src/lib/radar/referrals.ts`), o funcție pură,
restrânsă, **fără import DB** — poate fi importată în siguranță într-o componentă
`"use client"`. `getRadarReferrals`/`getDefaultReferralFor` (din `index.ts`) importă
`@/lib/db/radar` și, prin urmare, rămân disponibile numai pe server; panoul de control
al furnizorilor importă direct `referrals.ts` în loc de `index.ts` (consultați mai jos)
pentru a evita includerea `better-sqlite3` în pachetul pentru browser.

### `GET /api/radar/referrals`

Urmează exact aceeași ordine a verificărilor ca toate celelalte rute Radar: `RADAR_ENABLED` dezactivat →
`404` (verificat primul, comportament identic la nivel de octet); neautentificat → `401`; în caz contrar,
declanșează o sincronizare la citire (vezi mai sus) când datele sunt învechite, apoi răspunde cu `200` și
`{ fixed, campaigns, tier }` — `tier` provine direct din rândul cache-ului (posibil tocmai reîmprospătat)
și are un rol pur informativ (determină mesajul subtil de upsell din interfața descris mai jos). Nu
intermediază niciodată direct serverul de feed — propriul cod sursă al rutei nu conține niciun apel `fetch(`;
rețeaua este accesată exclusiv din `syncRadarReferrals()`, conform aceluiași principiu de utilizare
doar a cache-ului local ca în `/api/radar/catalog`.

### Interfața panoului de control — fila „Credite gratuite” din `/dashboard/radar`

Reutilizează pagina Radar existentă (`src/app/(dashboard)/dashboard/radar/page.tsx`) ca
a doua filă, în locul unei rute noi — o suprafață mai redusă de rutare/i18n pentru o funcționalitate care
este o variație a datelor deja preluate de pagină. După activare, bara de file oferă
**Catalog** (tabelul existent) și **Credite gratuite**:

- Linkurile fixe sunt grupate după furnizor, fiecare afișând `requiredAction` (când este prezent)
  și un buton `target="_blank" rel="noopener noreferrer"` către URL-ul de recomandare.
- Campaniile afișează aceleași informații, plus `validUntil` când este prezent.
- Când `campaigns` este gol **și** nivelul furnizat este `community`, interfața afișează o
  scurtă notă de upsell („campaniile pe perioadă limitată sunt un beneficiu suplimentar pentru susținători”) — aceasta **nu**
  ascunde și nu restricționează niciodată lista linkurilor fixe, care rămâne complet populată pentru fiecare nivel. Mesajul
  de upsell este doar o sugestie discretă, niciodată un blocaj.

### Link de recomandare pe numele furnizorului (panoul de control al furnizorilor)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
asocia deja numelui furnizorului un link către `providerInfo.website`, atunci când era prezent, cu un
precedent pentru un link monetizat: nota privind linkul de parteneriat Kimi (Moonshot AI)
(cheia i18n `providers.kimiPartnerLinkNote`). D28 reutilizează exact același tipar de notă discretă
pentru recomandările implicite Radar, în loc să introducă o cheie nouă.

Cuplare slabă, în mod intenționat:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  este o funcție **pură** — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — fără nicio dependență de `@/lib/radar` sau `@/lib/db/*`. Fișierul `providerPageUtils.ts`, în
  ansamblu, rămâne lipsit de aceste importuri (fapt verificat de
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (o componentă `"use client"`) este singurul loc în care este permisă
  preluarea datelor Radar — prin `fetch("/api/radar/referrals")`, același tipar bazat pe o rută locală
  pe care îl folosește chiar pagina panoului de control Radar — și calculează recomandarea implicită
  în client cu `findDefaultReferral()` din fișierul fără dependențe de DB `src/lib/radar/referrals.ts`.
- Cu `RADAR_ENABLED` dezactivat, solicitarea returnează 404, `referralUrl` rămâne `null`, iar
  `resolveProviderHeaderLink()` returnează neschimbat `website` static din catalog — pagina
  furnizorului este identică la nivel de octet cu cea de dinaintea existenței acestei funcționalități. Același rezultat apare când
  încă nu există un cache sau când nu există nicio recomandare implicită pentru furnizorul respectiv.
- Când se aplică o recomandare implicită, `ProviderPageHeader` primește `isReferralLink`
  și afișează aceeași notă/descriere discretă ca linkul de parteneriat Kimi (reutilizând cheia
  `providers.kimiPartnerLinkNote`) — niciodată un tratament vizual nou și separat.

---

## Cum să găzduiești singur un flux

Un fork sau un operator care dorește control deplin asupra catalogului își poate rula propriul serviciu de flux fără a modifica codul clientului:

1. Expune un endpoint `GET /v1/catalog/latest` care returnează un corp JSON ce respectă `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — la nivel superior: `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` și `totals`. Respectă `x-omniroute-radar-schema: 2`; un server compatibil cu tranziția ar trebui ca, pentru cererile care nu îl includ, să utilizeze implicit un artefact v1 semnat separat.
2. Semnează octeții exacți ai răspunsului cu o pereche de chei Ed25519 și returnează semnătura base64 în antetul de răspuns `x-omniroute-feed-signature`.
3. Setează `RADAR_FEED_URL` la noul URL de bază și `RADAR_FEED_PUBKEY` la cheia publică aferentă (SPKI DER codificată base64 sau PEM) — consultă
   [referința variabilelor de mediu](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Activează `RADAR_ENABLED` și înscrie-te prin `POST /api/radar/settings`
   (`{ optIn: true }`).

Nu sunt necesare alte modificări ale codului — `verifyFeedBytes()` preia automat suprascrierea (`getFeedPublicKeys()` din `src/lib/radar/pinnedKeys.ts`), iar compararea versiunilor, validarea schemei și regulile de îmbinare se aplică în mod identic unui flux găzduit pe cont propriu.

Linkurile de recomandare (consultă secțiunea [Linkuri de recomandare (credite gratuite)](#referral-links-free-credits) de mai sus) reprezintă un artefact separat și opțional: un fork care expune doar `/v1/catalog/latest` funcționează în continuare pe deplin — `syncRadarReferrals()` revine la `{ status: "error" }` la un răspuns `404` de la `/v1/referrals/latest`, iar memoria cache rămâne pur și simplu goală, astfel încât `GET /api/radar/referrals` continuă să returneze `{ fixed: [], campaigns: [], tier: null }` în loc să provoace eșecul restului paginii. Pentru a oferi și linkuri de recomandare, expune `GET /v1/referrals/latest` astfel încât să respecte `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) și semnează-l cu aceeași pereche de chei Ed25519 ca fluxul catalogului.

Ofertele pentru susținători reprezintă un alt artefact opțional. Pentru a le furniza, implementează `GET /v1/offers/latest` folosind schema închisă `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`), impune un drept de acces activ, returnează `x-omniroute-feed-tier: live` și semnează octeții exacți cu aceeași cheie. Un fork care omite acest endpoint păstrează neschimbat comportamentul catalogului și al recomandărilor; reîmprospătarea ofertelor eșuează fără efecte distructive, iar ultima memorie cache locală verificată a ofertelor rămâne disponibilă.

Datele Intel sunt opționale în același mod. Un operator își poate găzdui singur `GET /v1/intel/latest` folosind `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), poate impune un drept de acces activ, poate returna `x-omniroute-feed-tier: live` și poate semna octeții exacți cu cheia Ed25519 partajată. Omiterea endpointului lasă neschimbate catalogul, recomandările și ofertele; reîmprospătarea Intel păstrează orice ultim instantaneu local verificat.

---

## Documentație asociată

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — modelul de răspuns la erori urmat de rutele `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — referința pentru `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
