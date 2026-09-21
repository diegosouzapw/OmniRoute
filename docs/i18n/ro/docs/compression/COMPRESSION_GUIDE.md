# 🗜️ Prompt Compression Guide — OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

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

### Panou de control

Navigați la `Dashboard → Context & Cache`:

- **Caveman** — selectarea modului, pachete lingvistice, previzualizare și valori implicite globale
- **RTK** — previzualizarea filtrului de comenzi, setările de siguranță RTK și catalogul de filtre
- **Compression Combos** — pipeline-uri de motoare denumite, atribuite combinațiilor de rutare
- **Auto-Trigger Threshold** — activează automat compresia atunci când numărul de tokenuri depășește pragul

### Suprascriere per combinație

În `Dashboard → Context & Cache → Compression Combos`, atribuiți o combinație de compresie unei combinații
de rutare:

```txt
Combinație: "free-tier-fallback"
  Combinație de compresie: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Ținte:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Acest lucru vă permite să utilizați compresia suprapusă pentru furnizorii gratuiți/de programare, păstrând în același timp modul lite pentru
abonamentele cu plată.

Această atribuire „Suprascriere per combinație” este un control diferit de suprascrierea **modului de compresie al combinației
de rutare** (Default/Off/Lite/Standard/Aggressive/Ultra) — acea suprascriere nu selectează un pipeline denumit
de combinație de compresie; doar setează câmpul `compressionMode` consultat de
`resolveCompressionPlan`. Aceasta poate fi setată fie pe cardul combinației (`Dashboard → Combos`), fie, începând cu
#6760, per combinație de rutare în lista „Assign to routing” din
`Dashboard → Context & Cache → Compression Combos`, chiar lângă caseta de selectare pentru atribuirea pipeline-ului
documentată mai sus. Ambele interfețe persistă datele prin același endpoint `PUT /api/combos/{id}`.

### Suprascriere per solicitare

Trimiteți antetul de solicitare `x-omniroute-compression` pentru a suprascrie planul de compresie pentru o singură
solicitare. Acesta are cea mai mare prioritate — are întâietate față de suprascrierea combinației de rutare, profilul activ,
declanșarea automată și valoarea Default din panou. Valorile necunoscute sunt ignorate (solicitarea nu este niciodată respinsă), iar
comutatorul principal global controlează în continuare totul: când compresia este dezactivată global, antetul nu o poate
activa. Valori:

| Valoare       | Efect                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `off`         | Fără compresie pentru această solicitare.                                                              |
| `default`     | Profilul Default derivat din panou (ignoră profilul activ).                                            |
| `engine:<id>` | Un singur motor, atunci când este activat, de exemplu `engine:rtk`.                                    |
| `<combo>`     | O combinație denumită, identificată mai întâi după nume (fără a ține cont de majuscule), apoi după id. |

Planul aplicat este returnat în antetul de răspuns `X-OmniRoute-Compression: <mode>; source=<source>`,
unde `<source>` este una dintre valorile `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` sau `off`.

### API

```bash
# Obține setările de compresie
curl http://localhost:20128/api/settings/compression

# Actualizează setările de compresie
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Previzualizează un payload RTK/suprapus specific
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listează pachetele de filtre RTK
curl http://localhost:20128/api/context/rtk/filters

# Testează RTK direct cu metadate opționale despre comandă
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

## Foaia de parcurs a etapelor

| Etapă    | Moduri                                                                                                                                                                      | Stare     |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Etapa 1  | Dezactivat, Lite                                                                                                                                                            | ✅ Livrat |
| Etapa 2  | Standard, Agresiv, Ultra                                                                                                                                                    | ✅ Livrat |
| Etapa 3  | RTK, Stivuit, Combinații de compresie                                                                                                                                       | ✅ Livrat |
| Etapa 4  | Stiluri de ieșire, Ultra pentru nivelul SLM, infrastructură de evaluare                                                                                                     | ✅ Livrat |
| Etapa 4C | Buget de context adaptiv („selector”) — motor de calcul + API (`contextBudget` pentru `PUT /api/settings/compression`) + controale pentru mod/politică în panoul de control | ✅ Livrat |

---

## Mulțumiri

Regulile de compresie ale modului Standard sunt inspirate de **[Caveman](https://github.com/JuliusBrussee/caveman)**, creat de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — proiectul viral „de ce să folosești multe tokenuri când puține tokenuri își fac treaba”. Caveman raportează cu `~75%` mai puține tokenuri de ieșire, o economie medie de `65%` pentru ieșire în testele de performanță, un interval de `22-87%` pentru ieșire și un instrument cu o compresie a intrării de `~46%`.

Modul RTK este inspirat de **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, creat de **[RTK AI](https://github.com/rtk-ai)** — proiectul de înaltă performanță pentru comprimarea ieșirii comenzilor, destinat filtrării ieșirilor din terminal, compilare, teste, git și instrumente. RTK raportează economii de `60-90%`, iar sesiunea demonstrativă din README indică o economie de `~80%`.

---

## Sisteme avansate de compresie

Pe lângă cele 7 moduri standard, OmniRoute include mai multe sisteme avansate de compresie
care funcționează automat în funcție de context.

### Compresie adaptată memoriei cache

Unii furnizori (precum Anthropic, cu memorarea în cache a prompturilor) acceptă **memorarea în cache a prompturilor**,
ceea ce le permite să memoreze în cache părți ale promptului pentru a reduce costurile și latența. Când
memorarea în cache este activată, compresia agresivă poate chiar să **afecteze negativ** performanța,
deoarece modifică tokenurile memorate în cache, invalidând memoria cache.

Modulul `cachingAware.ts` rezolvă această problemă prin **detectarea contextului de memorare în cache** și
**ajustarea corespunzătoare a strategiei de compresie**.

#### Cum funcționează

1. **Detectează contextul de memorare în cache** — Scanează corpul cererii pentru marcatori `cache_control`
2. **Identifică furnizorii cu memorare în cache** — Verifică dacă furnizorul țintă acceptă memorarea în cache
3. **Ajustează strategia** — Retrogradează `aggressive`/`ultra` la `standard` pentru furnizorii cu memorare în cache
4. **Omite promptul de sistem** — Prompturile de sistem sunt de obicei memorate în cache, deci nu le comprimă
5. **Folosește transformări deterministe** — Folosește numai transformări care produc rezultate consecvente

#### Exemplu de cod

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcator pentru memoria cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Când se utilizează

Compresia adaptată memoriei cache este **activată permanent** — nu necesită configurare. Aceasta intră în acțiune
numai atunci când:

- Cererea conține marcatori `cache_control`
- Furnizorul țintă acceptă memorarea în cache a prompturilor (Anthropic, OpenAI etc.)

### Învechire progresivă

Conversațiile lungi acumulează multe schimburi de mesaje, dar schimburile mai vechi devin mai puțin
relevante. Modulul `progressiveAging.ts` **degradează mesajele în funcție de distanța dintre schimburi**:

- **Schimburi recente (0-3)**: Păstrate ca atare (toate detaliile)
- **Schimburi intermediare (4-8)**: Compresie Lite (eliminarea spațiilor albe inutile și curățarea formatării)
- **Schimburi vechi (9+)**: Compresie Caveman (eliminarea elementelor de umplutură și rezumare)
- **Schimburi foarte vechi (20+)**: Rezumate considerabil sau eliminate

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
  verbatim: 3, // Primele 3 schimburi: păstrate ca atare
  light: 8, // Schimburile 4-8: compresie Lite
  moderate: 20, // Schimburile 9-20: compresie Caveman
  // Schimburile 21+: rezumare intensă
});

// saved = numărul de tokenuri economisite
```

#### Când se utilizează

Îmbătrânirea progresivă este **întotdeauna activată** pentru modurile `aggressive` și `ultra`. Este
deosebit de eficientă pentru:

- Sesiuni de programare de lungă durată
- Conversații desfășurate pe parcursul mai multor zile
- Fluxuri de lucru bazate pe agenți, cu multe apeluri de instrumente

### Modul de ieșire Caveman

Modulul `outputMode.ts` injectează **instrucțiuni în promptul de sistem** pentru a determina
modelul să producă el însuși un răspuns comprimat și concis (un stil „caveman”).

#### Cum funcționează

În loc să comprime intrarea, acest mod adaugă un prompt de sistem precum:

> „Răspunde folosind cât mai puține cuvinte. Omite formulele de politețe. Folosește propoziții scurte.”

Acest lucru funcționează deosebit de bine pentru:

- Generarea de cod (rezultat mai concis = mai puțini tokeni)
- Întrebări și răspunsuri rapide (nu sunt necesare explicații elaborate)
- Procesarea în loturi (maximizează debitul)

#### Când să îl utilizați

Modul de ieșire Caveman este **opțional** — configurați-l prin configurația combinată:

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

Modul de ieșire Caveman de mai sus este **calea veche, cu un singur stil**. Faza 4 l-a generalizat
într-un catalog de stiluri de ieșire combinabile: `OUTPUT_STYLE_CATALOG` din
`open-sse/services/compression/outputStyles/catalog.ts`. Fiecare stil este o instrucțiune de prompt de sistem
care determină modelul să producă el însuși un rezultat mai economic; stilurile pot fi activate
împreună și sunt injectate în ordinea din catalog.

| Stil                                    | `id`          | Ce face                                                                                                                                                                                                                                                              | Limbile instrucțiunilor                                                                         |
| --------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Proză concisă                           | `terse-prose` | Elimină umplutura/articolele/formulările ezitante; păstrează exact conținutul tehnic. Același text ca în modul de ieșire Caveman vechi (referențiat, nu rescris).                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                   |
| Mai puțin cod                           | `less-code`   | Ierarhie YAGNI: cea mai mică modificare funcțională, fără abstractizări nesolicitate.                                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                   |
| Coadă de cal (dezvoltator senior comod) | `ponytail`    | „Cel mai bun cod este codul care nu a fost scris niciodată”: reutilizare > rescriere, cauză principală > simptom, cel mai scurt diff funcțional.                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                   |
| Am ADHD (acțiunea pe primul loc)        | `i-have-adhd` | Acțiunea mai întâi (comandă/cale/fragment înaintea textului explicativ), pași numerotați și limitați, UN singur pas următor concret, fără preambul/recapitulare/formule de încheiere. Adaptat din [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                   |
| CJK concis (文言)                       | `terse-cjk`   | Stil ultra-concis în chineza clasică.                                                                                                                                                                                                                                | zh (restricționat în funcție de localizare: este oferit numai când limba determinată este `zh`) |

Fiecare stil include trei niveluri de intensitate — `lite`, `full`, `ultra` — iar fiecare nivel
se încheie cu clauza comună privind limitele, care păstrează neschimbate blocurile de cod, căile fișierelor, comenzile,
mesajele de eroare, URL-urile și identificatorii.

#### Cum funcționează injectarea

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) validează
selecția în raport cu catalogul (id-urile necunoscute și stilurile care nu corespund localizării sunt
eliminate, fără a genera vreodată o eroare), concatenează instrucțiunile selectate în ordinea din catalog,
adaugă clauza privind limitele **o singură dată** și inserează rezultatul la începutul promptului de sistem,
după un singur marcaj de idempotență (`[OmniRoute Output Styles]`) — reaplicarea
nu produce niciun efect. Când limba detectată a solicitării are o traducere, este injectată
instrucțiunea localizată în locul celei în limba engleză.

#### Cum se activează

În panoul de control: **Context → Setări → Compresie** — câte un rând pentru fiecare stil, cu un
comutator de activare/dezactivare și un selector de nivel. Programatic, configurația de compresie păstrează
selecția astfel:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilitate cu versiunile anterioare: setarea combinată veche `outputMode: "caveman"` continuă să funcționeze și este asociată cu
`terse-prose`, fiind identică la nivel de octet cu vechea injectare în fiecare limbă acceptată anterior.

Selectarea limbii: când `languageConfig.enabled` este activat, `autoDetect` alege
limba celui mai recent mesaj al utilizatorului (același detector ca al motoarelor de intrare);
dezactivarea `autoDetect` fixează `defaultLanguage`. Dezactivat → engleză.

Matricea stil × limbă este stabilită prin
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: un stil nou nu poate fi livrat
fără cel puțin o traducere pt-BR (sau o excepție explicită urmărită), iar un
stil existent nu poate pierde în mod neobservat o localizare. Pentru a adăuga un stil, consultați
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Comprimarea rezultatelor instrumentelor

Modulul `toolResultCompressor.ts` oferă **5 strategii specializate de comprimare**
pentru rezultatele instrumentelor (apeluri de funcții, rezultate ale agenților, rezultate de căutare etc.):

1. **Comprimarea rezultatelor căutării** — Elimină rezultatele redundante, păstrează primele N rezultate
2. **Comprimarea citirii fișierelor** — Trunchiază fișierele mari, păstrează antetele/importurile
3. **Comprimarea execuției codului** — Păstrează numai elementele stdout/stderr esențiale
4. **Comprimarea interogărilor bazei de date** — Limitează rândurile, elimină metadatele detaliate
5. **Comprimarea răspunsurilor API** — Elimină câmpurile nule, condensează matricele

#### Când să o utilizați

Comprimarea rezultatelor instrumentelor este **întotdeauna activată** când sunt prezente apeluri de instrumente. Nu este
necesară nicio configurare.

### Flux de procesare stivuit

Modul stivuit execută **mai multe motoare în succesiune** — de obicei, mai întâi RTK
(economii de 60-90% pentru rezultatele instrumentelor), apoi Caveman (economii suplimentare de 30% pentru
textul rămas). Astfel se obțin **economii totale de 78-95%**.

#### Cum funcționează

```
Intrare (1000 de tokeni)
  → RTK (filtru care recunoaște comenzile) → 200 de tokeni
    → Caveman (eliminarea textului de umplutură) → 140 de tokeni
  → Ieșire (140 de tokeni, economie de 86%)
```

#### Când să îl utilizați

Utilizați modul stivuit pentru:

- Fluxuri de lucru care folosesc intens instrumente (programare bazată pe agenți, cercetare)
- Procesare în loturi sensibilă la costuri
- Situațiile în care aveți nevoie de economii maxime de tokeni

Configurați-l prin configurația combinată:

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
