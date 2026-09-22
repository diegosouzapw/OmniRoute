# ADR: Pluggable persistence boundary (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Stare:** Propus — necesită aprobarea responsabilului de mentenanță înainte de începerea lucrului asupra runtime-ului
- **Problemă de urmărire:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Domeniu de aplicare:** Doar arhitectura de persistență; această decizie nu adaugă și nu selectează o bază de date externă

## Context

OmniRoute expune în prezent funcții de persistență orientate pe domeniu din `src/lib/db/`, în timp ce
conexiunea partajată returnată de `src/lib/db/core.ts` implementează contractul sincron `SqliteAdapter`
din `src/lib/db/adapters/types.ts`. Adaptorul respectiv acceptă mai multe runtime-uri SQLite, însă
suprafața sa rămâne specifică SQLite: instrucțiuni pregătite sincrone, `pragma`, tranzacții amânate și
imediate, backup nativ/prin copierea fișierului, checkpoint și un handle local al bazei de date.

Calea actuală de pornire și recuperare gestionează, de asemenea, ciclul de viață al fișierului SQLite. `src/lib/db/core.ts`
rezolvă `storage.sqlite`, menține un singur adaptor global per proces, execută checkpoint-uri WAL, păstrează tabelele
selectate în timpul recuperării și elimină fișierele auxiliare SQLite la reconstruirea unei baze de date. Selectarea
driverului în `src/lib/db/adapters/driverFactory.ts` alege dintre runtime-urile SQLite acceptate; aceasta
nu reprezintă o abstractizare pentru backend-uri externe.

Evoluția schemei este cuplată în mod similar. `src/lib/db/migrationRunner.ts` aplică fișiere SQL numerotate,
interoghează `sqlite_master` și `PRAGMA table_info`, detectează suportul opțional pentru FTS5 și execută
operațiunile de migrare în tranzacții SQLite. Modulele operaționale precum `src/lib/db/backup.ts` și
`src/lib/db/optimizationSettings.ts` utilizează direct semantica pentru backup, `PRAGMA`, WAL, dimensiunea paginii, vacuum automat și `VACUUM`.

Acestea sunt proprietăți valide ale implementării SQLite încorporate. Ele ar trebui să rămână disponibile fără
a obliga PostgreSQL sau MySQL să emuleze un API SQLite.

## Decizie

Se adoptă o limită de persistență pe două niveluri pentru starea durabilă portabilă:

1. **Contractele depozitelor de domeniu** definesc operațiunile de persistență necesare codului de business și de rutare.
   Apelanții depind de comportamentul și datele domeniului, nu de text SQL, instrucțiuni pregătite,
   fișiere de baze de date sau obiecte de dialect.
2. **Un contract intern asincron pentru backend** sprijină implementările depozitelor prin
   contexte de tranzacție, stare de funcționare/disponibilitate, coordonarea migrărilor, capabilități ale backend-ului și
   erori clasificate. Suprafața TypeScript exactă va fi propusă odată cu primul PR de implementare
   și validată prin teste de conformitate; acest ADR nu fixează în mod intenționat un API speculativ.

SQLite rămâne implementarea implicită. Cascada existentă de drivere SQLite și interfața sincronă
`SqliteAdapter` rămân în spatele implementării SQLite a depozitelor, în timp ce domeniile sunt migrate
în segmente verticale mici. Niciun utilizator nu este obligat să configureze un serviciu extern.

PostgreSQL este prima implementare externă propusă după validarea limitei depozitelor
cu SQLite. MySQL urmează ca implementare echivalentă, validată cu aceeași suită de conformitate,
nu ca o a doua ramură a logicii de business.

## Reguli privind limitele

### Suprafața portabilă a depozitelor

Un depozit portabil poate expune:

- citiri și scrieri la nivel de domeniu;
- operațiuni atomice explicite și acces la depozite în contextul tranzacțiilor;
- operațiuni de comparare/actualizare sau de închiriere, acolo unde semantica concurenței face parte din domeniu;
- paginare și ordonare neutre față de backend, precum și erori de constrângere independente de backend.

Starea de funcționare și disponibilitatea backend-ului, precum și coordonarea migrărilor, aparțin contractului
intern pentru backend/operațiuni, nu depozitelor individuale de domeniu.

Un depozit portabil nu trebuie să expună:

- `prepare`, `get`, `all`, `run` sau handle-uri brute ale driverelor;
- `PRAGMA`, moduri de checkpoint WAL, `VACUUM` sau reglaje pentru pagini/memoria cache;
- căi către fișiere SQLite, fișiere auxiliare sau backup prin copierea fișierelor;
- `lastInsertRowid` drept contract de domeniu comun mai multor backend-uri;
- sintaxă FTS5 sau `sqlite-vec`;
- un mecanism generic de evitare a abstractizării dialectului, utilizat de codul de business obișnuit.

### Suprafața capabilităților backend-ului

Comportamentul specific backend-ului rămâne explicit și ușor de identificat. Operațiunile de mentenanță
specifice SQLite rămân în spatele propriei implementări și interfețe operaționale, inclusiv:

- selectarea driverului pentru runtime;
- checkpoint WAL și comportamentul de oprire pentru SQLite;
- setări pentru dimensiunea paginii, dimensiunea memoriei cache și vacuum automat;
- backupul, restaurarea și recuperarea fișierului bazei de date;
- introspecția schemei SQLite;
- integrarea FTS5 și `sqlite-vec`.

Un backend extern nu este obligat să imite aceste funcționalități. Depozitele trebuie fie să utilizeze o
capabilitate portabilă, fie să ofere o implementare specifică backend-ului, cu un comportament documentat, fie să raporteze
că o capabilitate nu este disponibilă.

## Modelul de tranzacții și migrări

API-urile depozitelor definesc operațiunea de business atomică; apelanții nu selectează un mod de tranzacție SQL.
Fiecare operațiune trebuie să-și definească garanțiile observabile privind concurența: invariantele protejate, detectarea
conflictelor, clasificarea reîncercărilor, așteptările privind idempotența și propagarea contextului tranzacției.
Implementările pot utiliza mecanisme diferite de tranzacționare și izolare numai atunci când respectivele garanții
observabile rămân echivalente. SQLite poate continua să utilizeze intern comportamentul său actual privind tranzacțiile
amânate sau imediate, acolo unde acesta respectă contractul operațiunii.

Backend-urile externe necesită asumarea explicită a responsabilității pentru migrări, astfel încât mai multe replici ale aplicației să nu poată executa simultan
aceeași modificare de schemă. Istoricele migrărilor backend-urilor pot avea în comun etape logice, însă fișierele SQL
pentru SQLite nu sunt considerate portabile sau reutilizabile într-un alt dialect.

## Semantica de conformitate între backend-uri

Testele de conformitate trebuie să acopere comportamentul, nu doar semnăturile metodelor depozitelor. Fiecare domeniu migrat
trebuie să definească și să verifice:

- fusul orar, precizia și serializarea marcajelor temporale;
- ordonarea valorilor `NULL`, colaționarea și așteptările privind sensibilitatea la majuscule și minuscule;
- reprezentarea JSON și comportamentul de comparare;
- precizia numerelor întregi, zecimale și a valorilor monetare;
- ordonarea stabilă și criteriile deterministe de departajare pentru paginare;
- generarea ID-urilor fără a depinde de ID-urile rândurilor SQLite;
- clasificarea încălcărilor constrângerilor de unicitate și ale cheilor externe;
- comportamentul privind rândurile afectate pentru operațiunile care nu produc modificări, de comparare/actualizare și de ștergere;
- rezultatele scrierilor concurente, conflictele care permit reîncercarea și reîncercările idempotente.

Dacă un domeniu nu poate declara o semantică observabilă echivalentă, acesta nu este încă portabil și trebuie să rămână
specific backend-ului până la proiectarea contractului respectiv.

## Cerințe de compatibilitate

Orice implementare care urmează acest ADR trebuie să păstreze următoarele proprietăți:

- SQLite rămâne opțiunea implicită fără configurare.
- Fișierele SQLite existente și istoricul migrărilor rămân accesibile pentru citire.
- Mecanismele SQLite de rezervă pentru npm, Electron, Docker și mediile de execuție restricționate își păstrează fluxul actual de pornire.
- Acreditările stocate ale furnizorilor continuă să utilizeze comportamentul existent de criptare al aplicației.
- Migrarea unui depozit nu modifică în mod implicit semantica de rutare, cotă, cheie API sau audit.
- Comportamentul de backup și recuperare este documentat separat pentru fiecare backend, în loc să fie prezentat ca universal.
- O instalare curată exclusiv cu SQLite nu încarcă și nu necesită un driver de bază de date extern.

## Ordinea livrării

1. Publicarea unui inventar reproductibil al cuplajelor cu SQLite, ca artefact separat pentru revizuire.
2. Introducerea primelor contracte pentru depozitele de domeniu și a testelor de conformitate.
3. Adaptarea implementării SQLite existente în spatele acestor contracte, fără modificarea valorilor implicite.
4. Sub rezerva aprobării responsabililor de mentenanță, adăugarea PostgreSQL ca primă implementare externă pentru o
   secțiune delimitată a planului de control.
5. Extinderea stării partajate numai după existența testelor pentru scrieri concurente și asumarea responsabilității pentru migrări.
6. Adăugarea unei căi offline și validate de migrare de la SQLite către un backend extern înainte de promovarea posibilității de schimbare a bazei de date.
7. Adăugarea MySQL pe baza contractelor validate pentru depozite și backend-uri.

Fiecare etapă de execuție constituie un PR separat, care poate fi revizuit independent. O etapă ulterioară nu trebuie utilizată pentru a justifica fuzionarea unei
abstractizări nedovedite dintr-o etapă anterioară.

## Prima etapă de implementare

Prima etapă pentru runtime trebuie selectată după revizuirea inventarului de cuplări. Conexiunile la furnizori, cheile API, combinațiile și configurația de rutare sunt candidate, deoarece tabelele lor de bază sunt vizibile în `src/lib/db/core.ts`, dar acest ADR nu aprobă o listă de tabele sau un PR de migrare. Etapa trebuie să includă:

- teste de conservare a comportamentului SQLite;
- teste de conformitate pentru repository-uri;
- limite explicite ale tranzacțiilor;
- verificarea criptării și mascării credențialelor stocate;
- nicio modificare a configurației implicite de pornire.

## Alternative luate în considerare

### Adăugarea PostgreSQL sub `SqliteAdapter`

Respinsă. `SqliteAdapter` este un strat de compatibilitate pentru runtime-uri SQLite și expune operațiuni specifice SQLite. Emularea acelei suprafețe ar introduce într-un backend nou presupuneri sincrone și specifice dialectului.

### Expunerea unui API generic de interogare/execuție pentru toate domeniile

Respinsă drept limită principală. Aceasta ar centraliza gestionarea conexiunilor, dar ar menține cuplarea cu dialectul SQL, tranzacțiile și tabelele în modulele de business. O primitivă de backend de nivel scăzut poate exista în implementările repository-urilor, nu ca API de persistență expus aplicației.

### Rescrierea întregului strat de persistență înainte de validarea unei singure etape

Respinsă. Suprafața actuală de persistență este extinsă și include ciclul de viață al fișierelor, recuperarea, căutarea și setările operaționale. Etapele verticale oferă comportamente care pot fi revizuite și limite clare pentru revenirea la versiunea anterioară.

### Înlocuirea SQLite ca opțiune implicită

Respinsă. Implementările încorporate și desktop depind de modelul actual de pornire fără servicii suplimentare. Un backend extern este opțional.

### Utilizarea Redis drept autoritate pentru date durabile

Respinsă. Redis poate susține coordonarea explicit efemeră, cache-ul sau contoarele, dar nu înlocuiește contractul repository-urilor pentru date durabile descris aici.

## Consecințe

### Pozitive

- Codul de business dobândește un punct stabil de separare pentru persistență, independent de dialectul bazei de date.
- Comportamentul SQLite este testat înainte ca un backend extern să definească abstracția.
- PostgreSQL și MySQL folosesc în comun contracte și teste, în loc să dubleze logica de domeniu.
- Capabilitățile exclusive SQLite rămân de prim rang, în loc să devină straturi de compatibilitate cu abstracții deficitare.
- Comportamentul migrărilor și al tranzacțiilor în configurații cu mai multe replici devine o preocupare explicită de proiectare.

### Costuri și riscuri

- Extragerea repository-urilor necesită migrarea incrementală a punctelor de apel.
- Limitele asincrone se pot propaga prin codul de servicii care este în prezent sincron.
- Semantica între backend-uri necesită teste de conformitate care depășesc compatibilitatea sintaxei SQL.
- Copiile de siguranță, căutarea, stocarea vectorială și mentenanța rămân specifice fiecărei capabilități.
- Rularea mai multor implementări de persistență crește costurile de CI și de asistență operațională.

## Obiective excluse

Acest ADR nu:

- adaugă o dependență de bază de date, o variabilă de mediu, o schemă sau o migrare;
- modifică singleton-ul SQLite activ sau cascada de drivere;
- promite suport pentru PostgreSQL sau MySQL într-o anumită versiune;
- face portabile FTS5, `sqlite-vec`, fișierele de backup sau mentenanța SQLite;
- definește pregătirea pentru configurații active-active înainte de existența testelor pentru starea partajată și coordonare;
- aprobă o rescriere dintr-o singură etapă a `src/lib/db/`.

## Întrebări deschise pentru aprobarea responsabilului de mentenanță

1. Este depozitul împreună cu limita internă asincronă a backendului direcția preferată sau persistența externă ar trebui să fie plasată în spatele unui serviciu separat de plan de control?
2. Este PostgreSQL acceptabil ca primă implementare externă după confirmarea conformității cu SQLite?
3. Care domeniu ar trebui să fie prima secțiune delimitată a depozitului?
4. Ce stare trebuie partajată pentru prima etapă cu mai multe replici și ce stare rămâne locală nodului?
5. Ce perioadă de compatibilitate este necesară pentru o migrare a depozitului întreruptă sau anulată?

Până la clarificarea acestor întrebări, acest document reprezintă o propunere și nu implică nicio refactorizare în timpul execuției.
