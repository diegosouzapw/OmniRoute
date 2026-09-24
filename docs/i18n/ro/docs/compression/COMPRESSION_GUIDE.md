# 🗜️ Prompt Compression Guide — OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Economisiți automat 15-95% din contextul eligibil. Pentru o prezentare rapidă, consultați [secțiunea despre comprimare din README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Prezentare generală

OmniRoute implementează o conductă modulară de comprimare a prompturilor, care rulează **proactiv** înainte ca solicitările să ajungă la furnizorii din amonte. Astfel, economisirea tokenurilor are loc în mod transparent — nu sunt necesare modificări ale fluxului dvs. de lucru.

```
Solicitare client
  → Selector strategie de comprimare
    → Suprascriere prin combinație? → Utilizează setarea combinației
    → Prag de declanșare automată? → Utilizează modul automat
    → Mod implicit? → Utilizează setarea globală
    → Dezactivat? → Omite comprimarea
  → Mod de comprimare selectat
    → Dezactivat: Fără comprimare
    → Minimal: Curățare sigură a spațiilor/al formatării (~15%)
    → Standard: Eliminarea cuvintelor de umplutură în stil telegrafic (~30%)
    → Agresiv: Învechirea istoricului + rezumare (~50%)
    → Ultra: Eliminare euristică + reducerea blocurilor de cod (~75%)
    → RTK: Filtrare adaptată comenzilor pentru ieșirea terminalului/instrumentelor (interval de 60-90% în amonte)
    → Stivuit: Conductă ordonată cu mai multe motoare, de obicei RTK urmat de Caveman (interval eligibil de 78-95%)
  → Solicitare comprimată → Furnizor
```

---

## Moduri de comprimare

### Dezactivat

Nu se aplică nicio comprimare. Toate mesajele sunt transmise nemodificate.

### Mod minimal (~15% economie, latență <1ms)

Cel mai sigur mod — nicio modificare semantică, doar curățarea formatării:

| Tehnică                  | Descriere                                                                        |
| ------------------------ | -------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Combină liniile goale consecutive și elimină spațiile de la sfârșitul rândurilor |
| `dedupSystemPrompt`      | Elimină mesajele de sistem duplicate                                             |
| `compressToolResults`    | Comprimă ieșirile detaliate ale instrumentelor/funcțiilor                        |
| `removeRedundantContent` | Elimină instrucțiunile repetate                                                  |
| `replaceImageUrls`       | Scurtează URI-urile de date base64 ale imaginilor                                |

**Recomandat pentru:** Utilizare permanentă, fluxuri de lucru în care siguranța este esențială.

### Mod standard (~30% economie)

Inspirat de [Caveman](https://github.com/JuliusBrussee/caveman) — elimină cuvintele de umplutură și formulările prolixe, păstrând în același timp sensul:

- Elimină cuvintele de umplutură („vă rog”, „cred că”, „practic”, „de fapt”)
- Condensează expresiile prolixe („pentru a” → „să”, „ca rezultat al” → „deoarece”)
- Elimină formulările politicoase evazive („V-ar deranja să...”, „Dacă ați putea cumva...”)
- Peste 30 de reguli regex optimizate pentru prompturi de programare

**Recomandat pentru:** Fluxuri zilnice de programare, echipe preocupate de costuri.

### Mod agresiv (~50% economie)

Gestionare inteligentă a istoricului pentru sesiuni lungi:

- **Învechirea mesajelor** — mesajele mai vechi sunt comprimate progresiv
- **Rezumarea rezultatelor instrumentelor** — ieșirile lungi ale instrumentelor sunt înlocuite cu rezumate
- **Mecanisme de protecție a integrității structurale** — asigură consecvența perechilor `tool_use` + `tool_result`
- **Conștientizarea ferestrei de context** — respectă limitele de tokenuri specifice fiecărui model

**Recomandat pentru:** Sesiuni extinse de depanare, baze de cod mari.

### Mod ultra (~75% economie)

Comprimare maximă pentru scenarii în care tokenurile sunt esențiale:

- **Eliminare euristică** — elimină mesajele aflate sub pragul de relevanță
- **Reducerea blocurilor de cod** — comprimă exemplele de cod repetitive
- **Trunchiere prin căutare binară** — găsește punctul optim de tăiere pentru fereastra de context
- Include toate funcționalitățile modului Agresiv

**Recomandat pentru:** Situațiile în care atingeți în mod repetat limitele contextului.

### Mod RTK (interval de 60-90% în amonte)

Modul RTK este optimizat pentru ieșirile detaliate ale instrumentelor care apar în sesiunile agenților de programare:

- Detectează clase de comenzi/ieșiri precum `git status`, `git diff`, `git log`, instrumente de rulare a testelor,
  compilări TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditări/instalări npm, jurnale Docker, ieșiri
  de infrastructură și ieșiri shell generice
- Aplică pachete de filtre JSON din `open-sse/services/compression/engines/rtk/filters/`
- Importă filtre RTK conforme cu schema TOML v1 din fișierele `filters.toml` ale proiectului sau globale, cu validarea
  testelor incluse și verificarea nivelului de încredere pentru fișierele proiectului
- Include 49 de filtre încorporate, cu exemple incluse pentru verificare
- Elimină secvențele de control ANSI, barele de progres, liniile repetate și informațiile nerelevante
- Păstrează eșecurile, erorile, avertismentele, fișierele modificate, rezumatele și finalul ieșirilor lungi
- Acceptă filtre de proiect supuse verificării nivelului de încredere, filtre globale și recuperarea opțională a ieșirii brute redactate

**Recomandat pentru:** Sesiuni cu agenți care includ transcrieri shell, de compilare, de testare, git, grep și ieșiri din fișiere.

### Mod stivuit (interval eligibil de 78-95%)

Modul stivuit rulează mai multe motoare de comprimare într-o ordine deterministă. Conducta implicită este:

```txt
RTK -> Caveman
```

Această ordine comprimă mai întâi ieșirea terminalului/instrumentelor, apoi aplică condensarea semantică Caveman
promptului rămas în limbaj natural. Conductele stivuite pot fi configurate global sau prin intermediul
combinațiilor de comprimare atribuite combinațiilor de rutare.

**Recomandat pentru:** Context mixt, cu jurnale extinse ale instrumentelor, plus instrucțiuni umane sau rezumate ale asistentului.

---

## Calculul economiilor din sursele upstream

OmniRoute documentează economiile obținute prin compresie din două surse: benchmarkurile proiectelor upstream și
propria compoziție de motoare OmniRoute.

| Sursă   | Valoarea din README-ul upstream utilizată aici                                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | Cu `~75%` mai puțini tokeni de ieșire, economii medii de `65%` pentru ieșire în benchmarkuri, interval de `22-87%` și instrument de compresie a intrării de `~46%` |
| RTK     | Economii de `60-90%` pentru ieșirea comenzilor; sesiune exemplu de `~118,000 -> ~23,900` tokeni sau economii de `79.7%` (`~80%`)                                   |

Pentru sarcinile utile suprapuse ale instrumentelor/contextului, combinația OmniRoute implicită aplică motoarele în succesiune:

```txt
RTK -> Caveman
```

Economiile combinate sunt multiplicative, nu aditive:

```txt
combined = 1 - (1 - economii RTK) * (1 - economii Caveman pentru intrare)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Valoarea de `78-95%` se aplică atunci când atât RTK, cât și Caveman pot reduce aceeași sarcină utilă de intrare/context.
Modul pentru ieșirea răspunsurilor Caveman este separat: atunci când este activat, utilizați economiile proprii ale Caveman pentru ieșire (`65%`
în medie, `~75%` valoarea principală, interval de `22-87%`). Economiile totale la facturare depind de combinația de prompturi și ieșiri.

### Ce înseamnă de fapt „eligibil”

Intervalul principal de 15-95% este real, dar se aplică numai conținutului **redundant sau excesiv de detaliat** — linii de
eroare repetate, un jurnal de compilare care repetă excesiv același avertisment, un rezultat supradimensionat de la `grep`/citirea unui fișier. Acest lucru
**nu** înseamnă că fiecare cerere economisește la fel de mult.

Verificat empiric (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): o
rulare `stacked` (RTK + Caveman) pentru un bloc `tool_result` în format Anthropic, care conține 300 de linii de
eroare identice, a produs **economii de tokeni de 95.93% / economii de caractere de 96.26%** — încadrându-se exact în intervalul promovat.
Dar aceeași succesiune de procesare rulată pentru o ieșire normală, fără redundanțe, a unui instrument (o listă curată de potriviri `grep`,
citirea unui fișier scurt, text conversațional obișnuit) produce în mod corect **economii aproape de zero**, deoarece
nu există nimic repetitiv de eliminat, iar `validateCompression()` (`validation.ts`) refuză să livreze o
rescriere care ar elimina sau modifica blocuri de cod, URL-uri, titluri, versiuni sau identificatori de constante scriși INTEGRAL CU MAJUSCULE.

Acesta este un comportament normal și sigur, nu o eroare: o sesiune de programare care în principal citește/caută cu grep în fișiere fără redundanțe va
înregistra economii totale modeste chiar și cu compresia complet activată, în timp ce o sesiune care întâmpină o
buclă cu erori sau un linter prea verbose va înregistra intervalul complet de 78-95% pentru traficul respectiv. Nu utilizați procentul
scăzut al economiilor cumulate dintr-o singură sesiune ca dovadă că funcția de compresie este configurată greșit — verificați mai întâi dacă
ieșirea instrumentului era într-adevăr redundantă.

---

## Vizualizarea economiilor de tokeni

```
Fără compresie:      47K tokeni trimiși către LLM
Cu Lite:             40K tokeni trimiși          (economii de 15% — sigur, permanent activ)
Cu Standard:         33K tokeni trimiși          (economii de 30% — reguli caveman-speak)
Cu Aggressive:       24K tokeni trimiși          (economii de 50% — învechire + rezumare)
Cu Ultra:            12K tokeni trimiși          (economii de 75% — eliminare euristică)
Cu RTK:              19K-5K tokeni trimiși       (economii de 60-90% pentru ieșirea comenzilor/instrumentelor)
Cu Stacked:          10K-2.5K tokeni trimiși     (interval eligibil RTK+Caveman de 78-95%)
```

---

## Configurare

### Tablou de bord

Navigați la `Dashboard → Context & Cache`:

- **Caveman** — selecția modului, pachete lingvistice, previzualizare și setări globale implicite
- **RTK** — previzualizare filtru de comandă, setări de siguranță RTK și catalog de filtre
- **Compression Combos** — pipeline-uri de motor denumite, atribuite combo-urilor de rutare
- **Auto-Trigger Threshold** — activează automat compresia atunci când numărul de token-uri depășește pragul

### Suprascriere per-Combo

În `Dashboard → Context & Cache → Compression Combos`, atribuiți un combo de compresie unui combo de rutare:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Acest lucru vă permite să utilizați compresia stratificată pe furnizorii gratuiți/de codare, păstrând modul lite pe abonamentele plătite.

Această atribuire "Per-Combo Override" este un control diferit de suprascrierea **modului de compresie routing-combo** (Default/Off/Lite/Standard/Aggressive/Ultra) — acea suprascriere nu alege un pipeline de compresie-combo denumit; ea doar setează câmpul `compressionMode` consultat de `resolveCompressionPlan`. Poate fi setat fie pe cardul combo (`Dashboard → Combos`), fie, începând cu #6760, per combo de rutare în lista "Assign to routing" de pe `Dashboard → Context & Cache → Compression Combos`, chiar lângă caseta de bifare pentru atribuirea pipeline-ului documentată mai sus. Ambele interfețe persistă prin același endpoint `PUT /api/combos/{id}`.

### Suprascriere per-cerere

Trimiteți antetul de cerere `x-omniroute-compression` pentru a suprascrie planul de compresie pentru o singură cerere. Acesta are cea mai mare precedență — învinge suprascrierea routing-combo, profilul activ, declanșatorul automat și setarea implicită a panoului. Valorile necunoscute sunt ignorate (cererea nu este niciodată respinsă), iar comutatorul principal global încă guvernează totul: când compresia este oprită global, antetul nu o poate activa. Valori:

| Valoare       | Efect                                                                                                           |
| :------------ | :-------------------------------------------------------------------------------------------------------------- |
| `off`         | Fără compresie pentru această cerere.                                                                           |
| `default`     | Profilul implicit derivat din panou (ignoră profilul activ). Motoarele cu pierderi sunt lăsate oprite.          |
| `safe`        | Același lucru ca și omiterea antetului: doar dedup și plierea spațiilor albe.                                   |
| `allow-lossy` | Păstrează planul operator al acestei cereri, inclusiv rezumatele, filtrele de relevanță și rescrierile de stil. |
| `engine:<id>` | Un singur motor când este activat, de ex. `engine:rtk`. Aceasta este opțiunea per-cerere pentru acel motor.     |
| `<combo>`     | Un combo denumit, potrivit după nume (insensibil la majuscule) mai întâi, apoi după id.                         |

Fără `allow-lossy`, `engine:<id>` sau un combo denumit, motoarele cu pierderi nu sunt aplicate. Cererea primește în continuare dedup de sesiune și plierea spațiilor albe atunci când compresia este activată.

Planul aplicat este reflectat în antetul de răspuns `X-OmniRoute-Compression: <mode>; source=<source>`, unde `<source>` este una dintre `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` sau `off`.

### API

```bash
# Get compression settings
curl http://localhost:20128/api/settings/compression

# Update compression settings
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Preview a specific RTK/stacked payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# List RTK filter packs
curl http://localhost:20128/api/context/rtk/filters

# Test RTK directly with optional command metadata
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
- ✅ Prompturile de sistem (în modul Lite)

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

## Foaie de parcurs a fazelor

| Fază    | Moduri                                                                                                                                                    | Stare     |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Faza 1  | Oprit, Lite                                                                                                                                               | ✅ Livrat |
| Faza 2  | Standard, Agresiv, Ultra                                                                                                                                  | ✅ Livrat |
| Faza 3  | RTK, Stivuit, Combinații de compresie                                                                                                                     | ✅ Livrat |
| Faza 4  | Stiluri de ieșire, Ultra la nivel SLM, ham de evaluare                                                                                                    | ✅ Livrat |
| Faza 4C | Buget de context adaptiv ("dial") — motor de calcul + API (`contextBudget` pe `PUT /api/settings/compression`) + controale de mod/politică tablou de bord | ✅ Livrat |

---

## Mulțumiri

Regulile de compresie ale modului Standard sunt inspirate de **[Caveman](https://github.com/JuliusBrussee/caveman)**, creat de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — proiectul viral „de ce să folosești multe tokenuri când puține tokenuri își fac treaba”. Caveman raportează cu `~75%` mai puține tokenuri de ieșire, o economie medie de `65%` pentru ieșire în testele de performanță, un interval de `22-87%` pentru ieșire și un instrument cu o compresie a intrării de `~46%`.

Modul RTK este inspirat de **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, creat de **[RTK AI](https://github.com/rtk-ai)** — proiectul de înaltă performanță pentru comprimarea ieșirii comenzilor, destinat filtrării ieșirilor din terminal, compilare, teste, git și instrumente. RTK raportează economii de `60-90%`, iar sesiunea demonstrativă din README indică o economie de `~80%`.

---

## Sisteme avansate de compresie

Pe lângă cele 7 moduri standard, OmniRoute include mai multe sisteme avansate de compresie care funcționează automat în funcție de context.

### Compresie conștientă de cache

Unii furnizori (cum ar fi Anthropic cu prompt caching) suportă **prompt caching**, ceea ce le permite să memoreze în cache părți ale promptului pentru a reduce costurile și latența. Când caching-ul este activat, compresia agresivă poate de fapt **dăuna** performanței, deoarece modifică token-urile memorate în cache, invalidând cache-ul.

Modulul `cachingAware.ts` rezolvă această problemă prin **detectarea contextului de caching** și **ajustarea strategiei de compresie** în consecință.

#### Cum funcționează

1. **Detectează contextul de caching** — Scanează corpul cererii pentru marcatori `cache_control`
2. **Identifică furnizorii de caching** — Verifică dacă furnizorul țintă suportă caching
3. **Ajustează strategia** — Retrogradează `aggressive`/`ultra` la `standard` pentru furnizorii de caching
4. **Omite promptul de sistem** — Prompturile de sistem sunt de obicei memorate în cache, deci nu le comprima
5. **Utilizează transformări deterministe** — Utilizează doar transformări care produc o ieșire consistentă

#### Exemplu de cod

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcator cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Când se utilizează

Compresia conștientă de cache este **întotdeauna activă** — nu este necesară nicio configurare. Aceasta se activează doar atunci când:

- Cererea are marcatori `cache_control`
- Furnizorul țintă suportă prompt caching (Anthropic, OpenAI, etc.)

### Îmbătrânire progresivă

Conversațiile lungi acumulează multe rânduri de mesaje, dar rândurile mai vechi devin mai puțin relevante. Modulul `progressiveAging.ts` **degradează mesajele în funcție de distanța rândului**:

- **Rânduri recente (0-3)**: Păstrate ad litteram (detaliu complet)
- **Rânduri medii (4-8)**: Compresie ușoară (spații albe, curățare formatare)
- **Rânduri vechi (9+)**: Compresie de tip "om al peșterii" (eliminare umplutură, sumarizare)
- **Rânduri foarte vechi (20+)**: Sumarizate puternic sau eliminate

#### Exemplu de cod

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Primele 3 rânduri: ad litteram
  light: 8, // Rândurile 4-8: compresie ușoară
  moderate: 20, // Rândurile 9-20: compresie de tip "om al peșterii"
  // Rândurile 21+: sumarizare puternică
});

// saved = numărul de token-uri salvate
```

#### Când se utilizează

Îmbătrânirea progresivă este **întotdeauna activă** pentru modurile `aggressive` și `ultra`. Este deosebit de eficientă pentru:

- Sesiuni lungi de codare
- Conversații de mai multe zile
- Fluxuri de lucru agentice cu multe apeluri de instrumente

### Modul de ieșire "Om al peșterii"

Modulul `outputMode.ts` injectează **instrucțiuni de prompt de sistem** pentru a face ca modelul însuși să producă o ieșire comprimată, concisă (un stil "om al peșterii").

#### Cum funcționează

În loc să comprime intrarea, acest mod adaugă un prompt de sistem precum:

> "Răspunde în cuvinte minime. Omite amabilitățile. Folosește propoziții scurte."

Acest lucru funcționează deosebit de bine pentru:

- Generarea de cod (ieșire mai concisă = mai puține token-uri)
- Întrebări și răspunsuri rapide (nu este nevoie de explicații elaborate)
- Procesare în lot (maximizarea debitului)

#### Când se utilizează

Modul de ieșire "om al peșterii" este **opțional** — setați-l prin configurația combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Stiluri de ieșire (catalog)

Modul de ieșire "om al peșterii" de mai sus este **calea veche cu un singur stil**. Faza 4 a generalizat-o într-un catalog de stiluri de ieșire compozabile: `OUTPUT_STYLE_CATALOG` în `open-sse/services/compression/outputStyles/catalog.ts`. Fiecare stil este o instrucțiune de prompt de sistem care face ca modelul însuși să producă o ieșire mai ieftină; stilurile pot fi activate împreună și sunt injectate în ordinea catalogului.

| Stil                                | `id`          | Ce face                                                                                                                                                                                                                                    | Limbi de instruire                                                     |
| :---------------------------------- | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| Proza concisă                       | `terse-prose` | Elimină umplutura/articolele/ezitările; păstrează substanța tehnică exactă. Același text ca modul de ieșire `caveman` vechi (referențiat, nu re-tastat).                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Mai puțin cod                       | `less-code`   | Scara YAGNI: cea mai mică modificare funcțională, fără abstracții nesolicitate.                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Ponytail (dezvoltator senior leneș) | `ponytail`    | „Cel mai bun cod este codul care nu a fost scris niciodată”: reutilizare > rescriere, cauză principală > simptom, cea mai scurtă diferență funcțională.                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Am ADHD (acțiune-prima)             | `i-have-adhd` | Acțiune-prima (comandă/cale/fragment înainte de proză), pași numerotați și delimitați, UN singur pas concret următor, fără preambul/recapitulare/încheieri. Adaptat din [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| CJK concis (文言)                   | `terse-cjk`   | Stil ultra-concis chinezesc clasic.                                                                                                                                                                                                        | zh (limitat la localizare: oferit doar când limba rezolvată este `zh`) |

Fiecare stil oferă trei niveluri de intensitate — `lite`, `full`, `ultra` — și fiecare nivel
se încheie cu clauza de limite comune, care păstrează blocurile de cod, căile de fișiere, comenzile,
șirurile de eroare, URL-urile și identificatorii verbatim.

#### Cum funcționează injecția

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) rezolvă
selecția în raport cu catalogul (ID-urile necunoscute și stilurile care nu se potrivesc cu localizarea sunt
eliminate, niciodată o eroare), concatenează instrucțiunile selectate în ordinea catalogului,
adaugă clauza de limite **o singură dată** și plasează rezultatul în promptul de sistem
în spatele unui singur marcator de idempotență (`[OmniRoute Output Styles]`) — re-aplicarea
este o operație nulă. Când limba detectată a cererii are o traducere, instrucțiunea localizată
este injectată în locul celei în engleză.

#### Cum se activează

În tabloul de bord: **Context → Setări → Compresie** — un rând pentru fiecare stil cu un
comutator de activare/dezactivare și un selector de nivel. Programatic, configurația de compresie
persistă selecția ca:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilitate inversă: setarea combinată `outputMode: "caveman"` veche funcționează în continuare și se mapează la
`terse-prose`, identică la nivel de octet cu injecția veche în fiecare limbă veche.

Selecția limbii: cu `languageConfig.enabled` activat, `autoDetect` alege
limba ultimului mesaj al utilizatorului (același detector ca și motoarele de intrare);
dezactivarea `autoDetect` fixează `defaultLanguage`. Dezactivat → Engleză.

Matricea stil × limbă este fixată de
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: un stil nou nu poate fi livrat
fără cel puțin o traducere pt-BR (sau o excepție urmărită explicit), iar un
stil existent nu poate pierde în tăcere o localizare. Pentru a adăuga un stil, consultați
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compresia rezultatelor instrumentelor

Modulul `toolResultCompressor.ts` oferă **5 strategii specializate de compresie**
pentru rezultatele instrumentelor (apeluri de funcții, ieșiri ale agenților, rezultate de căutare etc.):

1. **Compresia rezultatelor căutării** — Elimină rezultatele redundante, păstrează primele N
2. **Compresia citirii fișierelor** — Trunchiază fișierele mari, păstrează anteturile/importurile
3. **Compresia execuției codului** — Păstrează doar stdout/stderr esențial
4. **Compresia interogărilor bazei de date** — Limitează rândurile, elimină metadatele verbose
5. **Compresia răspunsurilor API** — Elimină câmpurile nule, condensează array-urile

#### Când se utilizează

Compresia rezultatelor instrumentelor este **întotdeauna activă** atunci când sunt prezente apeluri de instrumente. Nu este
necesară configurare.

### Pipeline-ul stivuit

Modul stivuit rulează **mai multe motoare în secvență** — de obicei RTK mai întâi
(economii de 60-90% la ieșirea instrumentului), apoi Caveman (economii suplimentare de 30% la
textul rămas). Aceasta realizează **economii totale de 78-95%**.

#### Cum funcționează

```
Intrare (1000 token-uri)
  → RTK (filtru conștient de comandă) → 200 token-uri
    → Caveman (eliminarea umpluturii) → 140 token-uri
  → Ieșire (140 token-uri, 86% economii)
```

#### Când se utilizează

Utilizați modul stivuit pentru:

- Fluxuri de lucru intensive cu instrumente (codare agentică, cercetare)
- Procesare în loturi sensibilă la costuri
- Când aveți nevoie de economii maxime de token-uri

Configurați prin combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Suprascrieri ale comprimării pentru combinații

Puteți suprascrie modul global de comprimare **pentru fiecare combinație** pentru a ajusta comportamentul
în funcție de diferitele cazuri de utilizare:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Acest lucru este util pentru:

- **Combinații pentru programare**: Folosiți modul `aggressive` pentru sesiuni lungi
- **Combinații pentru întrebări și răspunsuri rapide**: Folosiți modul `lite` pentru răspunsuri rapide
- **Combinații care utilizează intensiv instrumente**: Folosiți modul `stacked` pentru economii maxime
- **Combinații pentru producție**: Folosiți modul `cache-aware` pentru furnizorii care oferă memorare în cache

---

## Consultați și

- [Configurarea mediului](../reference/ENVIRONMENT.md) — Variabile de mediu pentru comprimare
- [Ghid de arhitectură](../architecture/ARCHITECTURE.md) — Detalii interne ale fluxului de comprimare
- [Ghidul utilizatorului](../guides/USER_GUIDE.md) — Primii pași cu comprimarea
- [Comprimarea RTK](./RTK_COMPRESSION.md) — Filtre RTK, model de încredere, poartă de verificare, recuperarea ieșirii brute
- [Motoare de comprimare](./COMPRESSION_ENGINES.md) — Caveman, RTK, mod stivuit, API-uri, MCP, panou de control
- [Formatul regulilor de comprimare](./COMPRESSION_RULES_FORMAT.md) — Format JSON pentru pachetele de reguli
- [Pachete lingvistice pentru comprimare](./COMPRESSION_LANGUAGE_PACKS.md) — Reguli Caveman specifice limbii
