# 🗜️ Prompt Compression Guide — OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Economisiți automat 15-95% din contextul eligibil. Pentru o prezentare rapidă, consultați [secțiunea despre compresie din README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Prezentare generală

OmniRoute implementează un flux modular de compresie a prompturilor, care rulează **proactiv** înainte ca solicitările să ajungă la furnizorii din amonte. Astfel, economisirea tokenurilor are loc în mod transparent — nu sunt necesare modificări ale fluxului dvs. de lucru.

```
Solicitarea clientului
  → Selectorul strategiei de compresie
    → Suprascriere prin combinație? → Se utilizează setarea combinației
    → Prag de declanșare automată? → Se utilizează modul automat
    → Mod implicit? → Se utilizează setarea globală
    → Dezactivat? → Se omite compresia
  → Modul de compresie selectat
    → Dezactivat: Fără compresie
    → Lite: Curățare sigură a spațiilor și formatării (~15%)
    → Standard: Eliminarea cuvintelor de umplutură în stil telegrafic (~30%)
    → Aggressive: Învechirea istoricului + rezumare (~50%)
    → Ultra: Eliminare euristică + reducerea blocurilor de cod (~75%)
    → RTK: Filtrarea rezultatelor terminalului/instrumentelor în funcție de comandă (interval de 60-90% în amonte)
    → Stacked: Flux ordonat cu mai multe motoare, de obicei RTK urmat de Caveman (interval eligibil de 78-95%)
  → Solicitare comprimată → Furnizor
```

---

## Moduri de compresie

### Off

Nu se aplică nicio compresie. Toate mesajele sunt transmise fără modificări.

### Modul Lite (economii de ~15%, latență <1ms)

Cel mai sigur mod — fără nicio modificare semantică, doar curățarea formatării:

| Tehnică                  | Descriere                                                    |
| ------------------------ | ------------------------------------------------------------ |
| `collapseWhitespace`     | Combină liniile goale consecutive și spațiile finale         |
| `dedupSystemPrompt`      | Elimină mesajele de sistem duplicate                         |
| `compressToolResults`    | Comprimă rezultatele detaliate ale instrumentelor/funcțiilor |
| `removeRedundantContent` | Elimină instrucțiunile repetate                              |
| `replaceImageUrls`       | Scurtează URI-urile de date pentru imagini base64            |

**Recomandat pentru:** Utilizare permanentă și fluxuri de lucru în care siguranța este esențială.

### Modul Standard (economii de ~30%)

Inspirat de [Caveman](https://github.com/JuliusBrussee/caveman) — elimină cuvintele de umplutură și formulările prolixe, păstrând sensul:

- Elimină cuvintele de umplutură („please”, „I think”, „basically”, „actually”)
- Condensează expresiile prolixe („in order to” → „to”, „as a result of” → „because”)
- Elimină formulările excesiv de politicoase și ezitante („Would you mind...”, „If you could possibly...”)
- Peste 30 de reguli regex optimizate pentru prompturi de programare

**Recomandat pentru:** Fluxuri zilnice de programare și echipe preocupate de costuri.

### Modul Aggressive (economii de ~50%)

Gestionare inteligentă a istoricului pentru sesiuni lungi:

- **Învechirea mesajelor** — mesajele mai vechi sunt comprimate progresiv
- **Compresia rezultatelor instrumentelor** — rezultatele lungi ale instrumentelor sunt trunchiate sau omise (primele/ultimele linii,
  filtrarea liniilor cu potriviri, compactarea cheilor JSON)
- **Mecanisme de protecție a integrității structurale** — asigură consecvența perechilor `tool_use` + `tool_result`
- **Adaptare la fereastra de context** — respectă limitele de tokenuri ale fiecărui model

**Recomandat pentru:** Sesiuni extinse de depanare și baze de cod mari.

### Modul Ultra (economii de ~75%)

Compresie maximă pentru scenarii în care economisirea tokenurilor este esențială:

- **Eliminare euristică** — eliminarea tokenurilor din proză pe baza unui scor
- **Păstrarea structurii** — blocurile de cod delimitate, codul inline, URL-urile și identificatorii sunt
  înlocuiți temporar cu marcaje și reintegrați textual, fără a fi eliminați vreodată
- **Nivel SLM opțional** — un model local mic poate rafina eliminarea atunci când este configurat
- Independent de modul Aggressive: nu efectuează învechirea mesajelor, compresia rezultatelor instrumentelor
  sau rezumarea de rezervă (doar o eroare la nivelul SLM poate direcționa o etapă de rezervă prin modul
  Aggressive)

**Recomandat pentru:** Situațiile în care atingeți în mod repetat limitele contextului.

### Modul RTK (interval de 60-90% în amonte)

Modul RTK este optimizat pentru rezultatele detaliate ale instrumentelor care apar în sesiunile agenților de programare:

- Detectează clase de comenzi/rezultate precum `git status`, `git diff`, `git log`, instrumente de rulare a testelor,
  compilări TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audituri/instalări npm, jurnale Docker, rezultate de infrastructură
  și rezultate generice de shell
- Aplică pachete de filtre JSON din `open-sse/services/compression/engines/rtk/filters/`
- Importă filtrele RTK cu schema TOML v1 din fișierele `filters.toml` ale proiectului sau globale, cu validarea testelor
  inline și verificarea încrederii pentru fișierele proiectului
- Include 55 de filtre încorporate, cu exemple de verificare inline
- Elimină secvențele de control ANSI, barele de progres, liniile repetate și zgomotul care nu permite acțiuni utile
- Păstrează eșecurile, erorile, avertismentele, fișierele modificate, rezumatele și finalul rezultatelor lungi
- Acceptă filtre de proiect bazate pe încredere, filtre globale și recuperarea opțională a rezultatelor brute redactate

**Recomandat pentru:** Sesiuni ale agenților cu shell, compilare, teste, git, grep și transcrieri ale rezultatelor fișierelor.

### Modul Stacked (interval eligibil de 78-95%)

Modul Stacked rulează mai multe motoare de compresie într-o ordine deterministă. Fluxul implicit este:

```txt
RTK -> Caveman
```

Această ordine compactează mai întâi rezultatele terminalului/instrumentelor, apoi aplică condensarea semantică Caveman
promptului rămas în limbaj natural. Fluxurile Stacked pot fi configurate global sau prin
combinații de compresie atribuite combinațiilor de rutare.

**Recomandat pentru:** Contexte mixte, cu jurnale voluminoase ale instrumentelor plus instrucțiuni umane sau rezumate ale asistentului.

---

## Calculul economiilor din sursele din amonte

OmniRoute documentează economiile obținute prin compresie din două surse: benchmarkurile proiectelor din amonte și
compoziția propriilor motoare OmniRoute.

| Sursă   | Valoarea din README-ul proiectului din amonte utilizată aici                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | cu `~75%` mai puțini tokeni de ieșire, economii medii de `65%` la ieșire în benchmarkuri, interval de `22-87%` și instrument de compresie a intrării de `~46%` |
| RTK     | economii de `60-90%` pentru ieșirea comenzilor; sesiune exemplu de `~118,000 -> ~23,900` tokeni sau economii de `79.7%` (`~80%`)                               |

Pentru sarcinile utile suprapuse ale instrumentelor/contextului, combinația implicită OmniRoute înlănțuie motoarele:

```txt
RTK -> Caveman
```

Economiile combinate sunt multiplicative, nu aditive:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Valoarea de `78-95%` se aplică atunci când atât RTK, cât și Caveman pot reduce aceeași sarcină utilă de intrare/context.
Modul de ieșire pentru răspunsuri Caveman este separat: când este activat, utilizați economiile proprii ale Caveman pentru ieșire (`65%`
în medie, valoare principală de `~75%`, interval de `22-87%`). Economiile totale la facturare depind de combinația dintre prompturi și ieșiri.

### Ce înseamnă de fapt „eligibil”

Intervalul principal de 15-95% este real, dar se aplică numai conținutului **redundant sau prolix** — linii de
eroare repetate, un jurnal de compilare care repetă excesiv același avertisment, un rezultat supradimensionat de la `grep`/citirea unui fișier. Acest lucru
**nu** înseamnă că fiecare solicitare economisește atât de mult.

Verificat empiric (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): o
rulare `stacked` (RTK + Caveman) asupra unui bloc `tool_result` în format Anthropic, care conținea 300 de linii
de eroare identice, a produs **economii de tokeni de 95.93% / economii de caractere de 96.26%** — exact în intervalul
promovat. Însă aceeași conductă, rulată asupra unei ieșiri normale și non-redundante a instrumentului (o listă curată de rezultate `grep`,
citirea unui fișier scurt, text conversațional obișnuit), produce în mod corect **economii aproape nule**, deoarece
nu există nimic repetitiv de eliminat, iar `validateCompression()` (`validation.ts`) refuză să livreze o
rescriere care ar elimina sau modifica blocuri de cod, URL-uri, titluri, versiuni sau identificatori de constante scriși INTEGRAL CU MAJUSCULE.

Acesta este un comportament sigur și previzibil, nu o eroare: o sesiune de programare care în principal citește/caută cu grep în fișiere curate va
înregistra economii totale modeste chiar și cu compresia activată complet, în timp ce o sesiune care întâlnește o buclă cu erori
sau un linter foarte prolix va beneficia de întregul interval de 78-95% pentru traficul respectiv. Nu folosiți procentul
redus al economiilor agregate dintr-o singură sesiune drept dovadă că funcția de compresie este configurată greșit — verificați mai întâi dacă
ieșirea instrumentului de bază era într-adevăr redundantă.

---

## Vizualizarea economiilor de tokeni

```
Fără compresie:      47K tokeni trimiși către LLM
Cu Lite:             40K tokeni trimiși         (15% economisiți — sigur, activ permanent)
Cu Standard:         33K tokeni trimiși         (30% economisiți — reguli caveman-speak)
Cu Aggressive:       24K tokeni trimiși         (50% economisiți — învechire + rezumare)
Cu Ultra:            12K tokeni trimiși         (75% economisiți — eliminare euristică)
Cu RTK:              19K-5K tokeni trimiși      (60-90% economisiți pentru ieșirea comenzilor/instrumentelor)
Cu Stacked:          10K-2.5K tokeni trimiși    (interval eligibil RTK+Caveman de 78-95%)
```

---

## Configurare

### Tablou de bord

Navigați la `Tablou de bord → Context și cache`:

- **Caveman** — selectarea modului, pachete lingvistice, previzualizare și valori implicite globale
- **RTK** — previzualizarea filtrului de comenzi, setările de siguranță RTK și catalogul de filtre
- **Combinații de compresie** — fluxuri de motoare denumite, atribuite combinațiilor de rutare
- **Prag de declanșare automată** — activează automat compresia atunci când numărul de tokenuri depășește pragul

### Suprascriere pentru fiecare combinație

În `Tablou de bord → Context și cache → Combinații de compresie`, atribuiți o combinație de compresie unei combinații de rutare:

```txt
Combinație: "free-tier-fallback"
  Combinație de compresie: "coding-agent-stack"
  Flux: RTK -> Caveman
  Ținte:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Aceasta vă permite să utilizați compresia stivuită pentru furnizorii gratuiți/de programare, păstrând în același timp modul lite pentru abonamentele cu plată.

Această atribuire „Suprascriere pentru fiecare combinație” este un control diferit de suprascrierea **modului de compresie al combinației de rutare** (Implicit/Dezactivat/Lite/Standard/Agresiv/Ultra/Răspunsuri Codex — schema câmpului acceptă, de asemenea, `rtk`, `stacked` și `omniglyph`) — această suprascriere nu selectează un flux denumit de combinație de compresie; doar setează câmpul `compressionMode` consultat de `resolveCompressionPlan`. Acesta poate fi setat fie pe cardul combinației (`Tablou de bord → Combinații`), fie, începând cu #6760, pentru fiecare combinație de rutare din lista „Atribuire rutării” de la `Tablou de bord → Context și cache → Combinații de compresie`, chiar lângă caseta de selectare pentru atribuirea fluxului documentată mai sus. Ambele interfețe persistă datele prin același endpoint `PUT /api/combos/{id}`.

### Suprascriere pentru fiecare solicitare

Trimiteți antetul de solicitare `x-omniroute-compression` pentru a suprascrie planul de compresie pentru o singură solicitare. Acesta are cea mai mare prioritate — prevalează asupra suprascrierii combinației de rutare, profilului activ, declanșării automate și valorii Implicit din panou. Valorile necunoscute sunt ignorate (solicitarea nu este respinsă niciodată), iar comutatorul principal global continuă să controleze totul: când compresia este dezactivată global, antetul nu o poate activa. Valori:

| Valoare       | Efect                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Fără compresie pentru această solicitare.                                                                                                |
| `default`     | Profilul Implicit derivat din panou (ignoră profilul activ). Motoarele cu pierderi rămân dezactivate.                                    |
| `safe`        | La fel ca omiterea antetului: doar deduplicare și compactarea spațiilor albe.                                                            |
| `allow-lossy` | Păstrează planul operatorului pentru această solicitare, inclusiv rezumatele, filtrele de relevanță și rescrierile de stil.              |
| `engine:<id>` | Un singur motor, când este activat, de exemplu `engine:rtk`. Aceasta este activarea explicită a motorului pentru solicitarea respectivă. |
| `<combo>`     | O combinație denumită, identificată mai întâi după nume (fără a ține cont de majuscule și minuscule), apoi după id.                      |

Fără `allow-lossy`, `engine:<id>` sau o combinație denumită, motoarele cu pierderi nu sunt aplicate. Solicitarea beneficiază în continuare de deduplicarea sesiunii și de compactarea spațiilor albe atunci când compresia este activată.

Planul aplicat este returnat în antetul de răspuns `X-OmniRoute-Compression: <mode>; source=<source>`, unde `<source>` este una dintre valorile `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` sau `off`.

### API

```bash
# Obțineți setările de compresie
curl http://localhost:20128/api/settings/compression

# Actualizați setările de compresie
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Previzualizați o sarcină utilă RTK/stacked specifică
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listați pachetele de filtre RTK
curl http://localhost:20128/api/context/rtk/filters

# Testați RTK direct, cu metadate opționale despre comandă
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ce este protejat

Motorul de compresie **păstrează întotdeauna:**

- ✅ Blocurile de cod (delimitate și inline)
- ✅ URL-urile și căile fișierelor
- ✅ Structurile JSON și datele structurate
- ✅ Identificatorii și tokenurile tehnice protejate
- ✅ Expresiile matematice
- ✅ Definițiile apelurilor de instrumente/funcții
- ✅ Prompturile de sistem (în modul lite)

Recuperarea ieșirii brute RTK maschează cheile API uzuale, tokenurile bearer, tokenurile Slack, cheile de acces AWS,
parolele, tokenurile și secretele înainte ca orice date să fie stocate.

---

## Statistici de compresie

Fiecare cerere comprimată include statistici în jurnalele serverului:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Foaia de parcurs a etapelor

| Etapă    | Moduri                                                                                                                                                              | Stare     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Etapa 1  | Off, Lite                                                                                                                                                           | ✅ Livrat |
| Etapa 2  | Standard, Aggressive, Ultra                                                                                                                                         | ✅ Livrat |
| Etapa 3  | RTK, Stacked, Combinații de compresie                                                                                                                               | ✅ Livrat |
| Etapa 4  | Stiluri de ieșire, Ultra de nivel SLM, infrastructură de evaluare                                                                                                   | ✅ Livrat |
| Etapa 4C | Buget adaptiv de context („selector”) — motor de calcul + API (`contextBudget` pe `PUT /api/settings/compression`) + comenzi pentru mod/politică în tabloul de bord | ✅ Livrat |

---

## Mulțumiri

Regulile de compresie ale modului Standard sunt inspirate de **[Caveman](https://github.com/JuliusBrussee/caveman)**, creat de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ peste 51K) — proiectul viral „de ce folosi multe tokenuri când puține tokenuri rezolvă treaba”. Caveman raportează cu `~75%` mai puține tokenuri de ieșire, o economie medie de `65%` a ieșirii în benchmarkuri, un interval de `22-87%` pentru ieșire și un instrument de compresie a intrării de `~46%`.

Modul RTK este inspirat de **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, creat de **[RTK AI](https://github.com/rtk-ai)** — proiectul de înaltă performanță pentru comprimarea ieșirilor comenzilor, destinat filtrării ieșirilor din terminal, builduri, teste, git și instrumente. RTK raportează economii de `60-90%`, iar sesiunea exemplificată în README arată o economie de `~80%`.

---

## Sisteme avansate de compresie

Pe lângă cele 7 moduri descrise mai sus (sursa acceptă și modurile `codex-responses` și
`omniglyph`, pe care acest ghid nu le acoperă), secțiunile de mai jos prezintă funcționalități
care operează în interiorul acestor moduri sau împreună cu ele: Comprimarea rezultatelor instrumentelor și Îmbătrânirea progresivă
sunt pașii 1 și 2 ai motorului agresiv (modul Aggressive și un pas `aggressive` al unei
conducte stivuite), Conducta stivuită reprezintă modul de funcționare al modului Stacked, Compresia adaptată la cache
retrogradează `aggressive` și `ultra` la `standard` pentru furnizorii cu cache în timp ce compresia
este activată, iar Modul de ieșire Caveman și Stilurile de ieșire sunt instrucțiuni opționale pentru promptul de sistem,
dezactivate implicit, care modelează ieșirea modelului în loc să comprime cererea.

### Compresie adaptată la cache

Unii furnizori (precum Anthropic cu memorarea în cache a prompturilor) acceptă **memorarea în cache a prompturilor**,
ceea ce le permite să stocheze în cache părți ale promptului pentru a reduce costurile și latența. Când
memorarea în cache este activată, compresia agresivă poate de fapt **afecta negativ** performanța,
deoarece modifică tokenurile din cache, invalidând cache-ul.

Modulul `cachingAware.ts` rezolvă această problemă prin **detectarea contextului de cache** și
**ajustarea corespunzătoare a strategiei de compresie**.

#### Cum funcționează

1. **Detectarea contextului de cache** — Scanează corpul cererii pentru marcatori `cache_control`
2. **Identificarea furnizorilor cu cache** — Verifică dacă furnizorul țintă acceptă memorarea în cache
3. **Ajustarea strategiei** — Retrogradează `aggressive`/`ultra` la `standard` pentru furnizorii cu cache
4. **Omiterea promptului de sistem** — Prompturile de sistem sunt de obicei stocate în cache, deci nu le comprimă

Funcția auxiliară pentru strategie returnează și un indicator `deterministicOnly`, însă constructorul planului utilizează
doar strategia — în prezent, nimic din aval nu citește indicatorul.

#### Exemplu de cod

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcator de cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Când se utilizează

Compresia adaptată la cache este **întotdeauna activată** — nu este necesară nicio configurare. Aceasta intră în funcțiune ori de câte ori
compresia este activată, iar furnizorul țintă acceptă memorarea prompturilor în cache (Anthropic, OpenAI
etc.); marcatorii expliciți `cache_control` nu sunt necesari — simpla prezență a unui furnizor cu cache
declanșează retrogradarea, iar marcatorii singuri nu o fac niciodată (detectarea marcatorilor alimentează telemetria
cache-ului, nu decizia privind strategia).

### Îmbătrânire progresivă

Conversațiile lungi acumulează multe schimburi de mesaje, însă schimburile mai vechi devin mai puțin
relevante. Modulul `progressiveAging.ts` **degradează mesajele în funcție de distanța dintre schimburi**
(distanța fiind măsurată de la sfârșitul conversației). Cu valorile implicite livrate
(`verbatim: 2, light: 2, moderate: 3`):

- **Ultimele 2 schimburi (distanță ≤ 2)**: Păstrate textual
- **Distanța 3**: Compresie „caveman” (eliminarea cuvintelor de umplutură)
- **Distanța 4+**: Mesajele asistentului sunt rezumate; mesajele utilizatorului sunt reduse la primul
  rând, limitat la 120 de caractere; celelalte roluri rămân nemodificate. Prompturile de sistem, mesajele
  deja învechite și cel mai recent mesaj al utilizatorului sunt păstrate întotdeauna textual, indiferent de distanță.
  Nimic nu este eliminat complet, iar banda `light`
  este inaccesibilă cu valorile implicite livrate (`light` este egal cu `verbatim`).

#### Exemplu de cod

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... încă 50 de schimburi ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // ultimele 3 schimburi: textual
  light: 8, // distanță <= 8: compresie ușoară
  moderate: 20, // distanță <= 20: compresie „caveman”
  fullSummary: 5, // cerut de tip, dar necitit de codul pentru benzi
  // distanță > 20: rezumat (asistent) / primul rând păstrat (utilizator)
});

// saved = numărul de tokenuri economisite
```

#### Când se utilizează

Învechirea progresivă este **întotdeauna activată** pentru modul `aggressive` — este pasul 2 din
`compressAggressive()`. Modul Ultra nu o execută. Este deosebit de eficientă pentru:

- Sesiuni de programare de lungă durată
- Conversații desfășurate pe mai multe zile
- Fluxuri de lucru agentice cu multe apeluri de instrumente

### Modul de ieșire Caveman

Modul de ieșire Caveman adaugă **instrucțiuni în promptul de sistem** care îi cer modelului
să producă un răspuns concis — nivelul `lite` solicită răspunsuri concise care păstrează propoziții complete, `full`
îi cere să „răspundă concis ca un om al peșterilor inteligent”, iar `ultra` solicită un răspuns telegrafic;
instrucțiunile doar solicită acest lucru, nu îl pot garanta. Solicitările le primesc prin
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` rezolvă mai întâi selecția folosind stratul de compatibilitate retroactivă
(`resolveOutputStyleSelection()` din
`open-sse/services/compression/outputStyles/backCompat.ts`), care, atunci când `outputStyles`
este gol, mapează un `cavemanOutputMode` activat la stilul de ieșire `terse-prose`, la
`cavemanOutputMode.intensity` (consultați Compatibilitatea retroactivă mai jos); o selecție `outputStyles`
care nu este goală este utilizată ca atare, iar `cavemanOutputMode.enabled` și `intensity` nu mai au
niciun efect, în timp ce opțiunea sa `autoClarity` continuă să se aplice. `outputMode.ts` conține
textele instrucțiunilor (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), ocolirea bazată pe conținut și
funcția auxiliară de poziționare folosită de injectare; propriul său injector `applyCavemanOutputMode()` nu are
niciun apelant în producție.

#### Cum funcționează

Acest mod nu comprimă intrarea. Adaugă un bloc de instrucțiuni în promptul de sistem
(consultați mai jos Cum funcționează injectarea), iar orice mod de comprimare a intrării selectat pentru solicitare
rulează în continuare după aceea, asupra corpului care conține acum blocul. Înaintea clauzei comune privind
limitele, cu care se încheie fiecare nivel, nivelul `full` în limba engleză este:

> „Răspunde concis ca un om al peșterilor inteligent. Elimină articolele (a/an/the), cuvintele de umplutură (just/really/basically/actually/simply), formulele de politețe și exprimările ezitante. Fragmentele sunt acceptate. Folosește sinonime scurte (big, nu extensive; fix, nu implement). Păstrează exact întreaga substanță tehnică, întregul cod, erorile, URL-urile și identificatorii.”

Acest lucru funcționează deosebit de bine pentru:

- Generarea de cod (răspuns mai concis = mai puține tokenuri)
- Întrebări și răspunsuri rapide (nu sunt necesare explicații elaborate)
- Procesarea în loturi (maximizează debitul)

#### Când se utilizează

Modul de ieșire Caveman este **opțional**. Cu comprimarea activată (`enabled: true`, comutatorul principal
de pe pagina Compression Settings), activați-l folosind `cavemanOutputMode.enabled`; `intensity`
selectează `lite`, `full` sau `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Comutatorul **Output Mode** al unei combinații de comprimare (`outputMode`, cu nivelul în `outputModeIntensity`)
setează același comutator pentru solicitările cărora li se aplică acea combinație, iar instrumentul MCP
`omniroute_set_compression_engine` îl scrie prin argumentul său boolean `outputMode`.
O selecție `outputStyles` care nu este goală are prioritate față de acest comutator. În
panoul de control, activarea stilului de ieșire **Terse prose** injectează același bloc (consultați mai jos Stiluri
de ieșire).

### Stiluri de ieșire (catalog)

Modul de ieșire Caveman de mai sus este **calea veche pentru un singur stil**. Faza 4 l-a generalizat
într-un catalog de stiluri de ieșire care pot fi combinate: `OUTPUT_STYLE_CATALOG` din
`open-sse/services/compression/outputStyles/catalog.ts`. Fiecare stil este o instrucțiune în promptul de sistem
care îi cere modelului să producă un răspuns mai ieftin; stilurile pot fi activate
împreună și sunt injectate în ordinea din catalog.

| Stil                            | `id`          | Ce face                                                                                                                                                                                                                                              | Limbi pentru instrucțiuni                           |
| ------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Proză concisă                   | `terse-prose` | Elimină umplutura/articolele/ezitările; păstrează cu exactitate conținutul tehnic. Același text ca în modul de ieșire caveman vechi (referențiat, nu rescris).                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi       |
| Mai puțin cod                   | `less-code`   | Ierarhie YAGNI: cea mai mică modificare funcțională, fără abstractizări nesolicitate.                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi       |
| Coadă de cal (dev senior comod) | `ponytail`    | „Cel mai bun cod este codul care nu a fost scris niciodată”: reutilizare > rescriere, cauză principală > simptom, cel mai scurt diff funcțional.                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi       |
| Am ADHD (acțiunea întâi)        | `i-have-adhd` | Acțiunea întâi (comandă/cale/fragment înaintea prozei), pași numerotați și limitați, UN singur pas următor concret, fără preambul/recapitulare/formule de încheiere. Adaptat după [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi       |
| CJK concis (文言)               | `terse-cjk`   | Răspuns `full`/`ultra` în chineza clasică (文言); `lite` solicită doar răspunsuri scurte, fără cuvinte funcționale, formule de politețe sau înflorituri.                                                                                             | zh (limitat în funcție de localizare, vezi mai jos) |

Fiecare stil este livrat cu trei niveluri de intensitate — `lite`, `full`, `ultra` — și fiecare nivel
se încheie cu clauza comună privind limitele (`SHARED_BOUNDARIES` în `outputMode.ts`), care
păstrează exacte blocurile de cod, căile fișierelor, comenzile, erorile și URL-urile. Textele nivelurilor
`terse-prose` și `terse-cjk` adaugă identificatorii la această listă.

`terse-cjk` este limitat la localizarea `zh` în două locuri. Pagina Setări de compresie afișează
rândul său numai când limba interfeței tabloului de bord este chineza (`zh-CN` sau `zh-TW`), iar
`applyOutputStyles()` îl injectează numai când limba rezolvată a cererii (vezi Selectarea limbii
mai jos) este `zh`. Ascunderea rândului nu șterge o selecție `terse-cjk` salvată:
API-ul de setări acceptă orice id de stil, iar salvarea altor stiluri pe pagină îl păstrează. În
momentul cererii, verificarea limbii din `applyOutputStyles()` este singura restricție de localizare.

#### Cum funcționează injectarea

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) rezolvă
selecția pe baza catalogului (id-urile necunoscute și stilurile care nu corespund localizării sunt
eliminate, fără a genera vreodată o eroare; o selecție care nu se rezolvă la niciun stil lasă corpul
nemodificat, fiind omisă ca `no_styles`), concatenează instrucțiunile selectate în ordinea din catalog,
adaugă clauza privind limitele **o singură dată** (plus clauza de siguranță, `SAFETY_BOUNDARIES` sau
traducerea sa, când este selectat `less-code` sau `ponytail`) și începe blocul cu un singur
marcaj de idempotentă (`[OmniRoute Output Styles]`), astfel încât reaplicarea nu are niciun efect. Când
limba rezolvată (vezi Selectarea limbii mai jos) are o traducere, este injectată instrucțiunea localizată
în locul celei în engleză.

Pentru un corp cu o matrice `messages` nevidă, verificarea idempotentei rulează înaintea
ocolirii bazate pe conținut: când marcajul `[OmniRoute Output Styles]` se află deja în câmpul
`system` de nivel superior (un șir sau o matrice de blocuri de conținut) ori într-un mesaj de sistem cu
conținut de tip șir, corpul este lăsat nemodificat ca `already_applied` și nu se execută nicio verificare
a cuvintelor-cheie. În caz contrar, o ocolire bazată pe conținut (`shouldBypassCavemanOutputMode()` din
`open-sse/services/compression/outputMode.ts`) verifică textul ultimelor trei
mesaje, indiferent de rolul lor, și omite stilurile pentru întreaga interacțiune când textul
corespunde cuvintelor-cheie privind securitatea, acțiunile ireversibile sau clarificarea ori unei
secvențe sensibile la ordine: `first`, `then`, `after that`, `before`, `rollback` sau
`backup`, urmat în maximum 240 de caractere de `delete`, `drop`, `migrate`, `deploy` sau
`release`. Ocolirea rulează cât timp comutatorul **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, activat implicit) este pornit; dezactivarea comutatorului omite
verificarea cuvintelor-cheie.

Când ocolirea permite continuarea interacțiunii, `placeSystemInstruction()` (același fișier), care
nu creează niciodată un nou `messages[0]`, plasează blocul în primul dintre următoarele locuri găsite:

1. Un mesaj de sistem inițial cu conținut de tip șir: blocul este adăugat după textul acestuia.
2. Câmpul `system` de nivel superior: blocul este adăugat după textul unui șir sau
   adăugat ca bloc text nou într-o matrice de blocuri de conținut.
3. Primul mesaj de sistem ulterior cu conținut de tip șir: blocul este adăugat după textul acestuia.
4. Niciunul dintre cele de mai sus: blocul este introdus într-un mesaj de sistem nou la sfârșitul `messages`.

Pentru un corp fără o matrice `messages` (sau cu una goală), nu rulează nicio ocolire bazată pe conținut,
iar un câmp `system` de nivel superior nu este consultat. Blocul este adăugat după textul unui câmp
`instructions` de tip șir, cu excepția cazului în care acel câmp conține deja marcajul
`[OmniRoute Output Styles]`, situație în care corpul este lăsat nemodificat ca
`already_applied`. Când corpul nu are un câmp `instructions` de tip șir, dar conține `input`
(un șir sau o matrice), blocul devine `instructions`, înlocuind orice valoare care nu este de tip șir
pe care o conținea acel câmp. Un corp care nu are nici un câmp `instructions` de tip șir, nici un `input`
de tip șir sau matrice este lăsat nemodificat și omis ca `no_messages`.

#### Cum se activează

În panoul de control: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), secțiunea Output styles: câte un rând pentru fiecare stil, cu un comutator de activare/dezactivare
și un selector de nivel. Stilurile sunt injectate cât timp compresia propriu-zisă este activată (comutatorul
principal al paginii, `enabled`). Comutatorul **Auto-Clarity Bypass** se află pe pagina **Caveman**
(`/dashboard/context/caveman`), în cardul **Output Mode**. Programatic, configurația
de compresie păstrează selecția astfel:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilitate retroactivă: cât timp `outputStyles` este gol, setarea veche
`cavemanOutputMode.enabled` este mapată la `terse-prose` la intensitatea
`cavemanOutputMode.intensity`. Blocul începe apoi cu marcajul `[OmniRoute Output Styles]`,
în timp ce injectorul vechi `applyCavemanOutputMode()` scria
`[OmniRoute Caveman Output Mode]`. Sub marcaj, textul corespunde injectării
vechi în en, pt-BR, es, de, fr, it, ru, id și vi; în ja și zh conține un
spațiu suplimentar înaintea clauzei privind limitele. `terse-prose` este tradus în pt-BR, es, de,
fr, it, ru, zh, ja, id și vi, astfel încât o cerere a cărei limbă determinată este `hu` primește
textul în engleză, în timp ce injectorul vechi folosea versiunea sa în maghiară.

Selectarea limbii pentru stilul de ieșire (`resolveOutputStyleLanguage()` din
`outputStyles/apply.ts`): cu `languageConfig.enabled` activat, `autoDetect` eșantionează cel mai
recent mesaj al utilizatorului din matricea `messages` a cererii care conține text (conținut de tip șir
sau câmpul `text` al părților conținutului său) și rulează asupra acestuia detectorul motorului Caveman
(`detectCompressionLanguage()`). Detectorul returnează `zh` pentru textul cu caractere Han
și fără kana; în caz contrar, returnează limba dintre `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` și `id` care are cele mai multe potriviri cu indiciile și `en` când
niciuna nu se potrivește — textul pe care nu îl poate clasifica primește engleza, niciodată
`defaultLanguage`, iar `vi` nu este detectată niciodată, deși stilurile includ text în `vi`.
Corpul unei cereri Responses API își păstrează schimburile în `input`, care nu este eșantionat,
astfel încât primește `defaultLanguage`, apoi engleza. Când niciun mesaj al utilizatorului din
`messages` nu conține text sau când `autoDetect` este dezactivat, se aplică
`defaultLanguage`, apoi engleza. Cu `languageConfig.enabled` dezactivat, limba este engleza —
cu excepția cazului în care cererii i se aplică o combinație de compresie (o combinație atribuită
combinației de rutare a cererii sau combinația de compresie implicită la care revine chatCore pentru
pipeline-ul stivuit încorporat): aplicarea unei combinații activează `languageConfig.enabled` pentru
cererea respectivă și setează `defaultLanguage` pe baza pachetelor lingvistice ale combinației
(valoarea salvată dacă este unul dintre pachetele combinației, altfel primul pachet al combinației,
care este implicit `en`), în timp ce valoarea salvată a `autoDetect` (activat implicit) continuă să se
aplice. Motorul de intrare Caveman își selectează diferit limba pachetului de reguli — pentru fiecare
parte de text și, cu detectarea automată dezactivată, în funcție de `enabledPacks`.

Matricea stil × limbă este fixată de
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: fiecare stil din catalog trebuie să aibă
o intrare în `BASELINE_LANGUAGES` din test; un stil care nu este restricționat în funcție de localizare
trebuie să includă o traducere în pt-BR (stilul `terse-cjk`, restricționat în funcție de localizare,
este exceptat de la această regulă), cu excepția cazului în care este enumerat în
`KNOWN_ENGLISH_ONLY`, care poate conține doar stiluri fără nicio traducere — un stil enumerat care
are orice traducere face ca testul să eșueze; de asemenea, un stil face ca testul să eșueze atunci când
pierde o limbă enumerată în intrarea sa din `BASELINE_LANGUAGES`. Pentru a adăuga un stil, consultați
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Comprimarea rezultatelor instrumentelor

`compressToolResult()` din `open-sse/services/compression/toolResultCompressor.ts`
comprimă textul rezultatului unui instrument folosind **5 strategii**. Le încearcă în această ordine,
iar prima strategie activată a cărei verificare corespunde conținutului determină rezultatul:

1. **`fileContent`**: conținut de 3 sau mai multe linii în care cel puțin o linie, ignorând
   indentarea inițială, începe cu `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` sau `return ` (cuvântul-cheie urmat de un spațiu) ori cu `if`,
   `for` sau `while` urmat de `(` sau ` (`, păstrează primele 20 și ultimele 5 linii, cu
   partea omisă din mijloc marcată.
2. **`grepSearch`**: conținut cu cel puțin o linie de forma `<path>:<digits>:`,
   unde textul dinaintea primului caracter două puncte nu conține spații albe, păstrează doar acele linii, cel
   mult 30, urmate de numărul eventualelor potriviri suplimentare și de lista fișierelor cu potriviri;
   toate celelalte linii sunt eliminate. O singură astfel de linie este suficientă pentru a declanșa strategia, astfel încât o
   linie de jurnal care începe cu un marcaj temporal precum `12:30:45` este, de asemenea, luată în considerare.
3. **`shellOutput`**: ieșirea care conține o secvență ANSI CSI (`ESC[` urmat de cifre sau
   punct și virgulă, apoi de o literă, ca în codurile de culoare) ori un `$` urmat de un spațiu alb
   oriunde în text pierde acele secvențe (alte secvențe escape, precum `ESC[?25l` sau o
   secvență OSC pentru titlul ferestrei, sunt păstrate) și își păstrează ultimele 50 de linii, cu liniile
   identice consecutive restrânse. Deoarece această verificare rulează înainte de `json` și `errorMessage`,
   ieșirile JSON sau de eroare care conțin un astfel de `$` nu ajung niciodată la acestea cât timp
   `shellOutput` este activat.
4. **`json`**: un payload JSON de peste 2.000 de caractere care începe cu `{` sau `[` (după
   eventuale spații albe) și poate fi analizat este rezumat: un tablou cu mai mult de 7 elemente își păstrează
   primele 5 și ultimele 2 elemente și numărul total, iar un obiect își păstrează primele 20
   de chei, fiecare valoare de tip obiect sau tablou imbricat fiind înlocuită cu un substituent `{…N keys}`
   (pentru un tablou, N este lungimea sa) și cu un marcaj `_remaining_<N>_keys` care numără cheile
   eliminate după primele 20. Valorile scalare sunt copiate integral, astfel încât un obiect cu 20 de chei
   sau mai puține, fără valori imbricate, este doar reindentat — unul minificat câștigă caractere
   și rămâne neschimbat.
5. **`errorMessage`**: ieșirea care conține, oriunde și indiferent de combinația de litere mari și mici, `error:`,
   `error ` (cuvântul urmat de un spațiu, ca în `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` sau `traceback` își păstrează prima linie,
   următoarele 10 linii și ultimele 3, cu un marcaj `… [N frames elided] …` în locul
   liniilor dintre acestea. Marcajul apare doar când după prima linie urmează mai mult de 13 linii,
   astfel încât ieșirile de eroare de 14 linii sau mai puține nu sunt scurtate (la 12 sau 13 linii,
   ultimele 3 repetă linii deja păstrate).

După ce o strategie se potrivește, chiar și una care nu economisește nimic, strategiile ulterioare nu sunt
încercate. Când strategia potrivită nu economisește niciun token estimat (lungimea ÷ 4, rotunjită în sus) —
de exemplu, un fișier asemănător codului, cu 25 de linii sau mai puține, ori un tablou JSON de peste 2.000
de caractere, cu 7 elemente sau mai puține — motorul agresiv păstrează rezultatul original al instrumentului:
ambii apelanți (`compressAggressive()` și `compressAnthropicToolResultBlock()`)
păstrează originalul când `saved` este 0 sau mai mic, în timp ce `compressToolResult()` însuși
returnează în continuare rezultatul strategiei respective. Etapa rezultatului instrumentului nu este ultima:
rezumatorul de rezervă al motorului poate scurta în continuare un mesaj `tool` sau `function` mai lung
de 8.192 de caractere (`maxTokensPerMessage`, 2.048, înmulțit cu 4).

#### Când se utilizează

Comprimarea rezultatelor instrumentelor este pasul 1 al motorului agresiv (`compressAggressive()` din
`open-sse/services/compression/aggressive.ts`), așadar rulează în modul Aggressive și într-un
pas `aggressive` al unei conducte stivuite. Comprimă mesajele `tool` și `function` în format OpenAI
și textul din blocurile Anthropic `tool_result`. Fiecare strategie are propriul
comutator în `aggressive.toolStrategies`, toate fiind activate implicit. În panoul de control,
comutatoarele se află în vizualizarea **Avansat** a paginii Caveman cât timp comprimarea este activată, iar
modul implicit este Aggressive.

### Conductă stivuită

Modul stivuit rulează **mai multe motoare în secvență** — de regulă mai întâi RTK
(economii de 60-90% pentru ieșirile instrumentelor), apoi Caveman pentru textul rămas (~46%
economii pentru intrare). Combinate, acestea oferă **intervalul eligibil de 78-95%** (consultați mai sus
Calculul economiilor din amonte): `1 - (1 - 0.60..0.90) × (1 - 0.46)` are o medie de ≈89%.

#### Cum funcționează

```
Intrare (1000 de tokenuri)
  → RTK (filtru care ține cont de comandă) → 200 de tokenuri
    → Caveman (eliminarea textului de umplutură) → 108 tokenuri
  → Ieșire (108 tokenuri, economii de ~89%)
```

#### Când se utilizează

Utilizați modul stivuit pentru:

- Fluxuri de lucru care folosesc intensiv instrumente (programare agentică, cercetare)
- Procesare pe loturi sensibilă la costuri
- Când aveți nevoie de economii maxime de tokenuri

Conductele stivuite sunt configurate prin setarea globală de comprimare `stackedPipeline`
sau printr-o combinație de comprimare denumită, atribuită unei combinații de rutare (consultați
Suprascriere per combinație de mai sus) — nu printr-un `modePack` al unei combinații automate (acel câmp doar
reponderează selecția modelelor pentru combinația automată, iar `stacked` nu este un nume valid de pachet).

---

## Suprascrieri ale compresiei pentru combinații

Puteți suprascrie modul global de compresie **pentru fiecare combinație** pentru a ajusta comportamentul
în funcție de diferitele cazuri de utilizare:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Acest lucru este util pentru:

- **Combinații pentru programare**: Utilizați modul `aggressive` pentru sesiuni lungi
- **Combinații pentru întrebări și răspunsuri rapide**: Utilizați modul `lite` pentru răspunsuri rapide
- **Combinații care utilizează intensiv instrumente**: Utilizați modul `stacked` pentru economii maxime
- **Combinații pentru producție**: lăsați suprascrierea dezactivată pentru furnizorii care utilizează memorarea în cache — ajustarea permanentă
  care ține cont de cache retrogradează automat `aggressive`/`ultra` la `standard`
  (nu există un mod `cache-aware` selectabil)

---

## Consultați și

- [Configurarea mediului](../reference/ENVIRONMENT.md) — Variabile de mediu pentru compresie
- [Ghid de arhitectură](../architecture/ARCHITECTURE.md) — Detalii interne ale fluxului de compresie
- [Ghidul utilizatorului](../guides/USER_GUIDE.md) — Introducere în utilizarea compresiei
- [Compresie RTK](./RTK_COMPRESSION.md) — Filtre RTK, model de încredere, poartă de verificare, recuperarea ieșirii brute
- [Motoare de compresie](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-uri, MCP, panou de control
- [Formatul regulilor de compresie](./COMPRESSION_RULES_FORMAT.md) — Format JSON pentru pachetele de reguli
- [Pachete lingvistice pentru compresie](./COMPRESSION_LANGUAGE_PACKS.md) — Reguli Caveman specifice fiecărei limbi
