# OmniRoute Auto-Combo Engine (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Pentru utilizatori**: Căutați un ghid de pornire rapidă? Consultați [Ghidul utilizatorului Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) pentru explicații simple și exemple.

> Lanțuri de modele care se autogestionează, cu evaluare adaptivă + rutare automată fără configurare

## Rutare automată fără configurare (prefixul `auto/`)

> **NOU:** Nu este necesară crearea unui combo. Utilizați prefixul `auto/` direct în orice client.

### Exemple rapide

| ID model       | Variantă | Comportament                                                                                 |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `auto`         | implicit | Toți furnizorii conectați, strategie LKGP, ponderi echilibrate                               |
| `auto/coding`  | coding   | Ponderi axate pe calitate, adecvate pentru generarea de cod                                  |
| `auto/fast`    | fast     | Selecție ponderată pentru latență redusă                                                     |
| `auto/cheap`   | cheap    | Rutare optimizată pentru cost (mai întâi costul cel mai mic)                                 |
| `auto/offline` | offline  | Favorizează furnizorii cu cea mai mare disponibilitate a cotei                               |
| `auto/smart`   | smart    | Axat pe calitate + rată de explorare mai mare (10%) pentru descoperirea mai bună a modelelor |
| `auto/lkgp`    | lkgp     | LKGP explicit (identic cu `auto` implicit)                                                   |
| `auto/chaos`   | chaos    | Ponderi pentru injectarea defecțiunilor în testarea rezilienței (ingineria haosului)         |

### Compoziție categorie × nivel (`auto/<category>:<tier>`)

Sufixele în stil OpenRouter separă **ce fel de rută** (categoria) de **modul de optimizare** (nivelul), astfel încât să le puteți combina liber (#4235 Faza B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorii** (filtrează grupul de candidați după capabilitate): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` păstrează modelele cu capabilități vizuale; `reasoning` păstrează modelele de raționament/gândire.
- **Niveluri** (aleg ponderile de evaluare/filtrul grupului): `fast` (livrare rapidă) · `cheap` (alias `floor`, economisire de costuri) · `reliable` (starea întrerupătorului de circuit + stabilitatea latenței) · `free` / `pro` (filtrează grupul după nivelul modelului prin `classifyTier` — nivel gratuit vs. premium).

| Exemplu                | Se rezolvă la                                                             |
| ---------------------- | ------------------------------------------------------------------------- |
| `auto/coding:fast`     | grup pentru programare, ponderi pentru latență redusă                     |
| `auto/coding:cheap`    | grup pentru programare, optimizat pentru cost (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | doar modele de raționament/gândire, nivel premium                         |
| `auto/vision`          | modele cu capabilități vizuale (fără nivel → ponderi echilibrate)         |
| `auto/multimodal:free` | modele cu capabilități multimodale, doar nivelul gratuit                  |

Orice valoare validă `auto/<category>[:<tier>]` este rezolvată la cerere; un subset selectat este afișat în `/v1/models` și în panoul de control (`AUTO_SUFFIX_VARIANTS` din `open-sse/services/autoCombo/builtinCatalog.ts`). Filtrarea este **fail-open** — dacă nicio constrângere nu corespunde vreunui model conectat, este utilizat întregul grup, astfel încât rutarea să nu eșueze niciodată. Evaluatorul principal (`combo.ts`) rămâne neschimbat; filtrul pentru categorie/nivel este aplicat în `buildAutoCandidates`.

> **Informații în timp real despre modele:** adecvarea pentru rutarea automată este determinată de clasamentele **Arena ELO** în timp real + datele despre niveluri de la **models.dev** atunci când indicatorul `ARENA_ELO_SYNC_ENABLED` este activat (în caz contrar, se revine la harta statică de adecvare).

**Mod de utilizare:**

```bash
# Orice IDE sau instrument CLI care acceptă formatul OpenAI
Base URL: http://localhost:20128/v1
API Key:  <cheia-endpointului-dvs.>

# În codul/configurația dvs., setați modelul la:
model: "auto"                 # valoarea implicită echilibrată
model: "auto/coding"          # cel mai bun pentru sarcini de programare
model: "auto/fast"            # cel mai rapid disponibil
model: "auto/cheap"           # cel mai ieftin per token
```

**Ce se întâmplă:**

1. OmniRoute detectează prefixul `auto/` în `src/sse/handlers/chat.ts`
2. Interoghează toate **conexiunile active la furnizori** din baza de date
3. Filtrează conexiunile care au acreditări valide (cheie API sau token OAuth)
4. Determină modelul pentru fiecare conexiune (`connection.defaultModel` sau primul model al furnizorului)
5. Construiește în memorie un **combo virtual** (nu este stocat în DB)
6. Efectuează rutarea folosind profilul de ponderi al variantei selectate + strategia LKGP

**Proprietăți principale:**

- ✅ **Întotdeauna activ:** Nu este necesară nicio comutare, creare de combo sau configurare
- ✅ **Dinamic:** Reflectă automat furnizorii conectați în prezent
- ✅ **Persistența sesiunii:** LKGP asigură prioritizarea ultimului furnizor utilizat cu succes
- ✅ **Compatibil cu mai multe conturi:** Fiecare conexiune la un furnizor devine un candidat separat
- ✅ **Fără scrieri în DB:** Combo-ul virtual există doar pe durata solicitării, fără costuri suplimentare de persistență

### Controlul candidaților per cheie (#7819, Nivelurile 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufixul de după `auto/` sau
valoarea literală `auto` pentru canalul de bază) este un endpoint **doar pentru citire** care listează
grupul curent de candidați al unui canal `auto/*`, completat cu accesibilitatea în timp real, reutilizând
citirile existente privind reziliența (niciodată valoarea brută `state` a întrerupătorului):

- întrerupătorul de circuit al furnizorului — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- perioada de așteptare a conexiunii — `rateLimitedUntil` / `testStatus` pe rândul
  `provider_connections` rezolvat
- blocarea modelului — `isModelLocked(provider, connectionId, model)`

Fiecare candidat include și indicatorul `excluded` al acestei chei API. Excluderile sunt stocate
per cheie API (tabelul `auto_candidate_overrides`, migrarea `128`) — OmniRoute este
single-tenant și nu are niciun tabel `users`, astfel încât `apiKeyId` este cea mai apropiată
identitate reală per apelant — și sunt aplicate în punctul critic al grupului de candidați din
`open-sse/services/autoCombo/virtualFactory.ts` prin funcția pură și testată unitar
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filtrul este **fail-open**: un apiKeyId/canal nesetat sau eșecul unei interogări DB lasă
grupul nefiltrat, astfel încât un operator fără suprascrieri configurate beneficiază de o rutare
identică la nivel de octet cu cea de dinaintea acestei funcționalități.

**Amânat pentru o problemă ulterioară:** ponderi per candidat + ordonare explicită (Nivelul 3
— se integrează în fluxurile existente ale strategiilor bazate pe ponderi/priorități) și fixarea unei anumite
strategii `combo.ts` pentru fiecare canal `auto/*` (Nivelul 4). Consultați planul #7819 pentru întrebarea deschisă
dacă suprascrierile ar trebui să rămână per cheie API sau să devină globale, având în vedere
modelul cu un singur tenant.

**În culise:**

```txt
Solicitare: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detectează prefixul
   ↓
createVirtualAutoCombo('coding') → candidatePool din conexiunile active
   ↓
handleComboChat (același motor ca pentru combinațiile persistate)
   ↓
Evaluarea automată selectează cel mai bun furnizor/model pentru fiecare solicitare
```

**Fișiere de implementare:**

| Fișier                                                    | Scop                                                          |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser pentru prefix (`parseAutoPrefix`)                      |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Creează obiecte virtuale `AutoComboConfig`                    |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Mecanism de testare pentru simularea registrului de furnizori |
| `src/sse/handlers/chat.ts`                                | Integrare: scurtcircuitarea prefixului automat                |
| `src/shared/constants/providers.ts`                       | Intrare de sistem `SYSTEM_PROVIDERS.auto`                     |

## Nume de combo-uri care corespund unui ID real de model

Un combo al cărui `name` este identic cu un ID simplu de model (de exemplu, un combo numit
`gpt-5.5`) este un **tipar intenționat și acceptat**, nu o eroare: acesta este
mecanismul pentru fallback-ul furnizorilor per ID de model, documentat în
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Deoarece rezoluția
combo-urilor este verificată înaintea rezoluției ID-ului simplu de model
(`getComboForModel()` în `src/sse/services/model.ts`), o cerere pentru ID-ul simplu
`gpt-5.5` este direcționată prin țintele combo-ului (de exemplu,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`), în loc să ajungă direct la
un singur furnizor — astfel este reutilizată precedența combo-înainte-de-rescriere construită pentru
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), iar
comportamentul este testat împotriva regresiilor prin `tests/unit/responses-combo-resolution-3227.test.ts` și
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Crearea sau redenumirea unui combo cu un nume care maschează un ID real de model
**nu este niciodată respinsă** — acest lucru ar afecta acest flux de lucru documentat. În schimb
(#8530), `POST /api/combos` și `PUT /api/combos/[id]` atașează răspunsului un câmp
`warning` neblocant atunci când numele (nou) intră în conflict cu un ID real de
model:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

La pornire, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) înregistrează, de asemenea, un avertisment `[STARTUP]` pe o singură linie,
enumerând fiecare combo existent care maschează un ID de model, astfel încât operatorii care
ajung accidental în această situație (și nu intenționat, conform #6940) să primească un semnal.
Funcția auxiliară de detectare se află în `src/lib/combos/modelNameCollision.ts`.

## Apelarea unui combo personalizat dintr-un client

Combo-urile persistente (Setări → Combo-uri) sunt utilizate numai atunci când clientul trimite **numele exact** al combo-ului în câmpul `model` — nu există potrivire aproximativă sau parțială a numelui combo-ului și nu este implicat niciun prefix `auto/`. Ordinea rezoluției (`getComboForModel()` în `src/sse/services/model.ts`):

1. potrivire exactă a numelui combo-ului (`model: "my-combo"`),
2. prefixul `combo/<name>` (`model: "combo/my-combo"`),
3. mapări glob model→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Două capcane frecvente:

- **`auto` nu utilizează combo-urile dvs.** `auto`/`auto/*` își construiește propriul grup de candidați fără configurare și consultă combo-urile persistente numai dacă un combo este numit literalmente `auto` (nerecomandat). Pentru a direcționa printr-un combo, trimiteți numele exact al acestuia — nu `auto`.
- **`openrouter/auto` este un produs OpenRouter real și contra cost** („Auto Best Available”), nu un alias OmniRoute. Este singura intrare statică de model din registrul OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) și este facturată separat. Utilizați Setări → Rutare → Ascunde modelele contra cost pentru a-l exclude din grupurile `auto`.

Consultați [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) și [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) pentru confuzia inițială documentată aici.

## Cum funcționează (combinații automate persistente)

Motorul Auto-Combo selectează dinamic cel mai bun furnizor/model pentru fiecare solicitare, utilizând o **funcție de evaluare cu 16 factori** (definită în `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Suma ponderilor implicite este `1.0`; ponderile personalizate sunt renormalizate de `normalizeScoringWeights()`. Doi dintre cei șaisprezece factori — `cacheAffinity` și `resetWindowAffinity` — au o pondere implicită de `0`; `reliability` are `0` în `DEFAULT_WEIGHTS`, dar `0.03` în pachetele generice și `0.04` în `reliability-first`, iar `quality` are `0.02` în pachete (`0.03` în `quality-first`): aceștia sunt totuși calculați pentru fiecare candidat, iar `cacheAffinity` controlează deduplicarea cache-ului de prompturi în afara scorului, astfel încât factorii cu valoare implicită zero pur și simplu nu contribuie implicit, în timp ce pachetele îi utilizează.

![Evaluarea Auto-Combo cu 16 factori](../diagrams/exported/auto-combo-scoring.svg)

> Sursă: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regenerați prin `npm run docs:render-diagrams`). Numele fișierului este istoric; sursa și diagrama randată prezintă toți cei 16 factori declarați în `DEFAULT_WEIGHTS`.

| Factor                | Pondere implicită | Descriere                                                                                                                                                                                                                                                            |
| :-------------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429            | Cotă rămasă / marjă disponibilă până la limita de rată [0..1]                                                                                                                                                                                                        |
| `health`              | 0.1605            | Scor de sănătate de la întrerupătorul de circuit (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                               |
| `costInv`             | 0.1429            | Cost **combinat** invers (60% prețul tokenurilor de intrare + 40% prețul tokenurilor de ieșire, normalizat) — mai ieftin = scor mai mare                                                                                                                             |
| `latencyInv`          | 0.1143            | Latență p95 inversă normalizată la grup — mai rapid = scor mai mare                                                                                                                                                                                                  |
| `taskFit`             | 0.0762            | Potrivire cu tipul sarcinii (programare, revizuire, planificare, analiză, depanare, documentație)                                                                                                                                                                    |
| `stability`           | 0.0476            | Stabilitate bazată pe varianța abaterii standard a latenței — un candidat al cărui timp de răspuns fluctuează obține un scor mai mic                                                                                                                                 |
| `tierPriority`        | 0.0476            | Prioritatea nivelului contului — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                                        |
| `tierAffinity`        | 0.0476            | Afinitatea dintre nivelul candidatului și nivelul recomandat de manifest                                                                                                                                                                                             |
| `specificityMatch`    | 0.0476            | Potrivirea dintre specificitatea solicitării (indiciul din manifest) și nivelul modelului                                                                                                                                                                            |
| `contextAffinity`     | 0.0476            | Afinitatea dintre necesarul de fereastră de context al solicitării și fereastra de context a modelului                                                                                                                                                               |
| `sessionAvailability` | 0.0476            | Disponibilitatea sesiunii OAuth a conexiunii candidate pentru această sesiune (`getOAuthSessionAvailability()`; conexiunile non-OAuth primesc scorul 1.0)                                                                                                            |
| `connectionDensity`   | 0.0476            | Distribuie sarcina între conexiunile aceluiași furnizor (anti-concentrare)                                                                                                                                                                                           |
| `cacheAffinity`       | 0.00              | Afinitate bazată pe hash rendezvous față de conexiunea cu cea mai mare probabilitate de a deține deja prefixul cache-ului de prompturi al acestei solicitări (`open-sse/services/combo/promptCacheAffinity.ts`); dezactivată implicit (#8008)                        |
| `resetWindowAffinity` | 0.00              | Favorizează conexiunile a căror fereastră de resetare a cotei este avantajoasă (dezactivată implicit)                                                                                                                                                                |
| `quality`             | 0.03              | Semnal privind calitatea rezultatului, bazat pe feedback de la instrumentul de urmărire a calității evenimentelor de rutare; candidații fără observații primesc valoarea neutră 0.5                                                                                  |
| `reliability`         | 0.00              | Proporția observată de reușite, `1 - failureRate`, din istoricul de utilizare pe 24h, cu un prag minim de zece eșantioane (în caz contrar, se folosesc metrici în timp real); candidații fără observații sunt considerați ca având valoarea 1.0. Dezactivat implicit |

**Sumă:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, așa cum este declarat în `DEFAULT_WEIGHTS`; ponderile configurate de utilizator sunt renormalizate într-o distribuție de `normalizeScoringWeights()` înainte de calcularea scorului.

## Pachete de moduri

6 profiluri de ponderi predefinite în `open-sse/services/autoCombo/modePacks.ts`. Fiecare pachet înlocuiește integral ponderile implicite pentru a orienta selecția către un singur obiectiv. Suma ponderilor fiecărui pachet este deja `1.0` (`0.9999` când este afișată cu patru zecimale), astfel încât `normalizeScoringWeights()` nu are nimic semnificativ de corectat atunci când un pachet este activ — valorile de mai jos sunt, cu aproximația dată de rotunjire, cele aplicate de sistemul de punctare.

| Factor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Note:

- **Pachetele includ `quality` și `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) și înlocuiesc integral harta ponderilor (`weights = pack`, nu o îmbinare). `DEFAULT_WEIGHTS` include `quality 0.03 / reliability 0`; selectarea `balanced`/`default` păstrează aceste valori implicite, iar selectarea unui pachet utilizează valorile pachetului de mai sus. Într-un pool rece (încă nu există observații, deci `quality 0.5` și `reliability 1`), acești doi factori adaugă `+0.04` pentru un pachet generic (`0.03 + 0.01`), `+0.045` pentru `quality-first` și `+0.05` pentru `reliability-first`.
- `tierAffinity`, `specificityMatch` și `resetWindowAffinity` sunt setate explicit la `0` în fiecare pachet.
- Pe scurt, accentul fiecărui pachet:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (conexiuni sănătoase, cu latență redusă)
  - **cost-saver** → costInv 0.3324 (câștigă tokenurile cu cel mai mic cost)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, cea mai mare valoare dintre toate pachetele (cel mai bun model pentru sarcină, cu rezultate consecvente)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (marjă disponibilă maximă, indiferent de viteză/cost)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, cea mai mare valoare dintre toate pachetele (cele mai puține surprize)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil pentru injectarea defecțiunilor)

### Controale per cerere (antete) — #6023 / #6024 / #6025 / #3470

Un combo `auto` poate fi dirijat **pentru fiecare cerere** prin intermediul a trei antete, fără a modifica configurația stocată a combo-ului. Acestea se aplică numai strategiei `auto` și numai cererii care le conține; valorile `modePack`/`budgetCap`/`budgetFallback` salvate ale combo-ului sunt utilizate atunci când antetul lipsește.

| Antet                         | Acceptă                                                                                                                                                                                                | Efect                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | un alias de presetare (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) sau un nume brut de pachet (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Suprascrie ponderile de evaluare pentru această solicitare. `balanced`/`default` impun ponderile implicite (fără pachet). Valorile necunoscute sunt ignorate (configurația este păstrată).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `X-OmniRoute-Budget`          | un număr pozitiv (valoarea maximă în USD per solicitare)                                                                                                                                               | Plafon strict de cost: candidații al căror cost estimat îl depășește sunt filtrați înainte de selecție. Comportamentul atunci când **fiecare** candidat îl depășește este controlat de `X-OmniRoute-Budget-Fallback` de mai jos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (implicit, aliasuri: `cheapest-viable`, `soft`) sau `strict` (aliasuri: `block`, `hard`)                                                                                                    | `cheapest`: revine la candidatul cu cel mai mic cost la nivel global, chiar dacă acesta depășește în continuare plafonul (comportament moștenit). `strict`: refuză selecția — solicitarea eșuează imediat cu `HTTP 402`, în loc să depășească bugetul în mod silențios. Valorile necunoscute sunt ignorate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Effort`          | `auto` (alte valori sunt rezervate)                                                                                                                                                                    | Buget adaptiv de raționament: când solicitarea nu conține **niciun** câmp de raționament, indiferent de formă (`reasoning_effort`, `reasoning`, `thinking`), gateway-ul transformă `auto` în `low`/`medium`/`high` pe baza unor semnale deterministe privind structura solicitării (lungimea ultimului mesaj al utilizatorului, dimensiunea contextului până la ultimul mesaj al utilizatorului, rezultatele anterioare ale instrumentelor, adâncimea buclei de instrumente). Semnalele sunt limitate la runda curentă — tot ce urmează după ultimul mesaj al utilizatorului este ignorat — astfel încât fiecare solicitare dintr-o buclă de instrumente este evaluată la același nivel (fixare fără stare per rundă, fără stare de sesiune, fără escaladare în mijlocul buclei care ar invalida prefixele cache-ului de prompturi din amonte). Un câmp de raționament explicit furnizat de client are întotdeauna prioritate. Se aplică solicitărilor a căror expediere în amonte utilizează formatul OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` este un câmp specific formatului OpenAI, astfel încât antetul nu are niciun efect asupra unei solicitări direcționate către Claude sau Gemini (consultați `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forțează profilul cel mai rapid, limitează această solicitare la 0,05 USD și blochează ferm în loc să depășească bugetul
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Rezolvarea este o funcție pură (`open-sse/services/autoCombo/requestControls.ts`); valorile
rezolvate sunt transmise intrărilor existente `config.modePack` / `config.budgetCap` /
`config.budgetFallback` ale motorului. Valoarea `config.budgetFallback` stocată a unei combinații ("strict" |
"cheapest") stabilește politica persistentă; antetul o suprascrie pentru o singură solicitare.

## Toate strategiile de rutare

Motorul de combinații OmniRoute acceptă **19 strategii de rutare** (declarate în `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Motorul Auto Combo propriu-zis este disponibil prin strategia `auto`; celelalte sunt disponibile pentru combinațiile persistate.

| Strategie           | Descriere                                                                                                                                                                                                                                                 |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Listă ordonată după prima țintă, cu prioritate explicită                                                                                                                                                                                                  |
| `weighted`          | Selecție aleatorie ponderată în funcție de ponderea fiecărei ținte                                                                                                                                                                                        |
| `round-robin`       | Parcurgerea ciclică a țintelor, în ordine                                                                                                                                                                                                                 |
| `context-relay`     | Transferă contextul între ținte (conversații lungi)                                                                                                                                                                                                       |
| `fill-first`        | Umple cota fiecărei ținte înainte de a trece la următoarea                                                                                                                                                                                                |
| `p2c`               | Echilibrare aleatorie a sarcinii prin alegerea dintre 2 opțiuni                                                                                                                                                                                           |
| `random`            | Selecție aleatorie uniformă                                                                                                                                                                                                                               |
| `least-used`        | Alege ținta cu cea mai mică sarcină curentă                                                                                                                                                                                                               |
| `cost-optimized`    | Minimizează costul în $ per solicitare pe baza tarifelor din catalog                                                                                                                                                                                      |
| `reset-aware` ⭐    | Prioritizează în funcție de momentul resetării cotei — intervalele scurte de resetare sunt clasate mai sus                                                                                                                                                |
| `reset-window`      | Preferă țintele a căror fereastră de cotă se resetează cel mai curând                                                                                                                                                                                     |
| `headroom`          | Alege ținta cu cea mai mare marjă de cotă rămasă                                                                                                                                                                                                          |
| `strict-random`     | Selecție aleatorie fără deduplicarea repetărilor                                                                                                                                                                                                          |
| `auto`              | Utilizează punctajul Auto Combo (16 factori) — **recomandat**                                                                                                                                                                                             |
| `lkgp`              | Ultima rută funcțională cunoscută (fixează ultimul furnizor care a reușit, apoi revine la reguli în caz de eșec)                                                                                                                                          |
| `context-optimized` | Alege ținta care se potrivește cel mai bine dimensiunii actuale a contextului                                                                                                                                                                             |
| `cache-optimized`   | Reordonează țintele după afinitatea cu memoria cache a promptului — conexiunea care are cele mai mari șanse să dețină deja prefixul memorat în cache al acestei solicitări este încercată prima (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Trimite solicitarea în paralel unui grup de modele, apoi sintetizează un singur răspuns prin intermediul unui arbitru (vezi mai jos)                                                                                                                      |
| `pipeline`          | Rulează țintele secvențial, transmițând ieșirea fiecărui pas ca intrare pentru pasul următor; este returnat doar răspunsul final (#6396)                                                                                                                  |

⭐ = Nou în v3.8.0 · 🧬 = Nou în v3.8.36

### Semantica `weighted`

`weighted` reprezintă o **extragere aleatorie proporțională pentru fiecare solicitare**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nu un mecanism de egalizare:

- Pentru fiecare solicitare este extras **un** pas cu probabilitatea `weight / totalWeight`; pașii rămași
  sunt ordonați descrescător după pondere și formează lanțul de rezervă pentru solicitarea respectivă.
- Un pas a cărui pondere este `0` (sau lipsește) nu este **niciodată extras** atât timp cât orice alt pas are o
  pondere > 0 — acesta poate servi doar ca opțiune de rezervă după ce pasul extras eșuează. Selecția devine uniformă numai atunci când **toate**
  ponderile sunt 0.
- Pașii ale căror ținte sunt toate indisponibile — întrerupătorul de circuit al furnizorului este `OPEN`, conexiunea
  se află în perioada de așteptare, modelul este blocat — sunt eliminați din extragere înainte ca aceasta să aibă loc
  (`open-sse/services/combo/targetResolution.ts`), astfel încât un singur pas funcțional poate câștiga temporar
  fiecare solicitare.
- `stickyWeightedLimit` (configurația combinației, valoarea implicită `1` = dezactivat) fixează pasul extras pentru acel număr de
  reușite consecutive înainte de o nouă extragere.

Pentru o rotație strictă, utilizați `round-robin`; ponderile egale cu `weighted` oferă un echilibru statistic — nu
strict.

## Strategia Fusion

`fusion` este singura strategie care **nu** selectează o singură țintă. Aceasta distribuie promptul
către **fiecare model din panel, în paralel**, după care un **model evaluator** configurabil sintetizează
un singur răspuns final din toate răspunsurile panelului. Portată din proiectul upstream `decolua/9router`
(designul Fusion al OpenRouter); implementarea se află în `open-sse/services/fusion.ts`.

Cum funcționează:

0. **Ocolire pentru cererile cu instrumente** — o cerere care conține un array `tools` nevid, cu
   `tool_choice` nesetat explicit la `"none"`, omite complet panelul: este direcționată direct către
   un singur model (evaluatorul configurat sau `panel[0]`), iar `tools`/`tool_choice`
   sunt transmise nemodificate. Membrii panelului nu au acces la instrumente, iar directiva de
   sinteză a evaluatorului descurajează emiterea apelurilor de instrumente, astfel încât clienții
   agentici/care apelează instrumente primesc o decizie reală de apelare a unui instrument, în locul
   unei descrieri sintetizate (#6771).
1. **Distribuire în evantai** (doar pentru cererile fără instrumente) — promptul este trimis simultan
   către fiecare model din panel, cu modul non-streaming impus și instrumentele eliminate (evaluatorul
   are nevoie de textul complet pentru a realiza sinteza).
2. **Colectare cu cvorum și perioadă de grație** — imediat ce sosesc `minPanel` răspunsuri, pornește
   un scurt temporizator de grație pentru modelele întârziate, după care fuziunea continuă cu toate
   răspunsurile colectate. Astfel, impactul celui mai lent model asupra timpului total este limitat,
   în cadrul unei expirări stricte.
3. **Sinteza evaluatorului** — răspunsurile panelului sunt anonimizate (`Source 1`, `Source 2`, … —
   astfel încât evaluatorul să analizeze conținutul, nu marca modelului) și transmise evaluatorului,
   care analizează consensul / contradicțiile / acoperirea parțială / perspectivele unice / punctele
   oarbe, apoi redactează **un singur** răspuns cu autoritate. Apelul evaluatorului păstrează valoarea
   originală `stream` a clientului și instrumentele acestuia, astfel încât streamingul și utilizarea
   ulterioară a instrumentelor să funcționeze în continuare.
4. **Degradare controlată** — 0 răspunsuri din panel → `503`; exact 1 răspuns supraviețuitor → acel
   răspuns este returnat direct (nu există nimic de combinat); un panel cu un singur model răspunde direct.

Un membru al panelului poate fi și un pas `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) care face
referire la un alt combo — acesta este rezolvat ca **o singură voce opacă în panel** (o rutare recursivă
completă către combo-ul referit, nu o distribuire către țintele acelui combo), cu aceeași protecție
împotriva adâncimii excesive și a ciclurilor pe care o folosesc deja toate celelalte strategii care
consumă `combo-ref` (#6764).

### Configurare

Se configurează în obiectul `config` al combo-ului (fără migrare de schemă — reutilizează tabela
existentă `combos`):

| Câmp                                     | Tip      | Valoare implicită      | Scop                                                                                                     |
| :--------------------------------------- | :------- | :--------------------- | :------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | primul model din panel | Modelul care sintetizează răspunsul final                                                                |
| `config.fusionTuning.minPanel`           | `number` | `2`                    | Răspunsuri reușite necesare înainte de pornirea temporizatorului de grație (limitat la `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                 | Cât timp sunt așteptate modelele întârziate după atingerea cvorumului                                    |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                | Limită absolută, astfel încât un model blocat să nu poată întârzia cererea                               |

Valorile implicite se află în `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Exemplu

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Apoi apelați-l ca pe orice alt combo: `{"model":"fusion-panel","messages":[...]}`.

## Fabrica virtuală Auto-Combo

Motorul Auto Combo nu necesită combinații predefinite. În schimb, `open-sse/services/autoCombo/virtualFactory.ts` construiește candidații dinamic:

1. Preia `getProviderConnections({ isActive: true })` (toate conexiunile activate)
2. Filtrează conexiunile care au credențiale valide (cheie API sau token OAuth neexpirat, prin `hasUsableOAuthToken()`)
3. Face o referință încrucișată cu `getProviderRegistry()` pentru disponibilitatea modelelor și prețuri
4. Pentru fiecare tuplu `(provider, model, connection)`, construiește un `VirtualAutoComboCandidate`
5. Alege `connection.defaultModel` (sau primul model din registru) drept țintă pentru trimitere
6. Evaluează fiecare candidat folosind `scorePool()` cu 16 factori și pachetul de ponderi al variantei
7. Returnează configurația `AutoComboConfig` rezultată în memorie către `handleComboChat()` — aceasta nu este salvată niciodată în baza de date

Aceasta înseamnă că **adăugarea unui furnizor nou cu `auto/*` activat extinde automat grupul de candidați** — nu este necesară editarea manuală a combinației. Combinația virtuală este reconstruită pentru fiecare solicitare, astfel încât conexiunile adăugate recent sau redevenite funcționale sunt utilizate imediat.

## Auto-remediere

- **Excludere temporară**: Scor < 0.2 → excludere timp de 5 min (backoff progresiv, maximum 30 min)
- **Detectarea stării întrerupătorului de circuit**: OPEN → excludere automată; HALF_OPEN → solicitări de testare
- **Mod incident**: >50% OPEN → dezactivează explorarea, maximizează stabilitatea
- **Recuperare după perioada de așteptare**: După excludere, prima solicitare este una de „testare”, cu un timeout redus

## Explorare de tip bandit

5% dintre solicitări (procent configurabil) sunt direcționate către furnizori aleatori în scop de explorare. Aceasta este dezactivată în modul incident.

## API

**Nu există niciun endpoint dedicat `POST /api/combos/auto`** — Auto-Combo este utilizat în două moduri:

1. **Fără configurare (recomandat):** Trimiteți orice solicitare de completare a conversației cu `model: "auto"` sau `model: "auto/<variant>"`. Fabrica virtuală construiește combinația pentru fiecare solicitare — fără persistență și fără apeluri API suplimentare.

2. **Combinație persistentă cu `strategy: "auto"`:** Creați o combinație obișnuită prin `POST /api/combos` și setați `strategy: "auto"`, împreună cu `config.auto.weights` / `config.auto.candidatePool`. Este utilizat același motor de evaluare; combinația este stocată în `combos` și poate fi reutilizată prin ID.

Pentru descoperire, `GET /api/combos/auto` listează fiecare variantă împreună cu grupul său de candidați rezolvat, plus `context_length` / `max_output_tokens` — valorile MAXIME dintre ferestrele grupului de candidați. Clienții (de exemplu, pluginul opencode) trebuie să publice aceste valori în loc de `0`: un context zero dezactivează complet compactarea automată din opencode, permițând sesiunilor să crească până când eliminarea istoricului de către gateway distruge contextul. Publicarea valorii MAXIME este sigură deoarece prefiltrarea contextului Auto-Combo direcționează solicitările supradimensionate către candidați cu ferestre mari.

```bash
# Utilizare fără configurare (fără crearea unei combinații)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combinație automată persistentă prin endpointul obișnuit pentru combinații
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategii ale routerului automat

Combinațiile persistente cu `strategy: "auto"` pot seta `config.routerStrategy` (sau vechea opțiune
`config.auto.routerStrategy`) la una dintre următoarele valori:

- `rules` — evaluare ponderată implicită
- `score` — selectează cel mai mare scor ponderat configurat. În cazul scorurilor perfect egale, se păstrează ordinea configurată
  a candidaților; opțiunea existentă `explorationRate` eșantionează din întregul grup clasificat.
- `cost` / `eco` — cel mai ieftin furnizor funcțional
- `latency` / `fast` — cea mai mică latență p95, cu penalizare pentru fiabilitate
- `sla-aware` / `sla` — preferă candidații care îndeplinesc obiectivele SLO privind latența p95, rata de eroare și, opțional,
  costurile
- `lkgp` — ultimul furnizor cunoscut ca fiind funcțional are prioritate

### Strategiile routerului în detaliu

Motorul Auto-Combo expune 6 implementări **RouterStrategy** interschimbabile, pe care
le puteți schimba prin `config.routerStrategy` (sau vechea opțiune `config.auto.routerStrategy`).
Fiecare strategie alege un furnizor din grupul de candidați, pe baza unui `RoutingContext`
(tipul sarcinii, indicii privind instrumentele/viziunea, estimarea numărului de tokenuri, politica SLA opțională și
ultimul furnizor cunoscut ca fiind funcțional, opțional).

#### 1. `rules` (implicit) — evaluare ponderată pe baza a 16 factori

Încapsulează motorul de evaluare existent. Filtrează candidații al căror întrerupător de circuit
este în starea `OPEN`, apoi rulează `scorePool()` cu tipul curent al sarcinii și `getTaskFitness()`,
alegând furnizorul cu cel mai mare scor.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Când se utilizează**: Implicit. Utilizați această strategie atunci când doriți un compromis echilibrat între toate semnalele.

**Alias**: `rules` (fără alias)

---

#### 2. `cost` / `eco` — cel mai ieftin furnizor funcțional

Sortează grupul de candidați după `costPer1MTokens` (în ordine crescătoare) și îl alege pe cel mai ieftin.
Filtrează mai întâi candidații aflați în starea `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Când se utilizează**: Sarcini sensibile la costuri, procesare în loturi sau activități în fundal.

**Aliasuri**: `cost`, `eco`

---

#### 3. `latency` / `fast` — cea mai mică latență p95, cu penalizare pentru fiabilitate

Sortează după `p95LatencyMs + (errorRate * 1000)`. Penalizarea ratei de eroare asigură că furnizorii
nesiguri sunt clasați mai jos, chiar dacă latența lor nominală este redusă.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Când se utilizează**: Sarcini de lucru sensibile la latență, precum chatul în timp real, completarea automată sau
asistenții interactivi pentru programare.

**Aliasuri**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — conformitatea cu SLO-urile de latență/eroare/cost

Acordă fiecărui candidat un scor în funcție de cât de bine respectă politica SLO configurată:

| Factor              | Pondere | Formulă                                           |
| ------------------- | ------- | ------------------------------------------------- |
| Scor de latență     | 35%     | `threshold / max(value, ε)`                       |
| Scor de eroare      | 35%     | `threshold / max(value, ε)`                       |
| Scor de sănătate    | 15%     | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| Scor de cost        | 10%     | `threshold / max(value, ε)` sau invers normalizat |
| Scor de stabilitate | 5%      | abaterea standard a latenței, invers normalizată  |

Când `hardConstraints: true`, candidații sunt sortați în primul rând după **scorul de încălcare**
(cu cât depășesc orice SLO), apoi după scorul compus. În caz contrar, se utilizează doar
scorul compus.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... acordă fiecărui candidat un scor în raport cu politica: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Câmpuri SLA** (configurate în configurația combo):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Când se utilizează**: Sarcini de lucru de producție cu bugete stricte pentru latență, rată de eroare sau cost.

**Aliasuri**: `sla-aware`, `sla`

---

#### 5. `lkgp` — ultimul furnizor cunoscut ca fiind bun este încercat primul

Încearcă mai întâi **ultimul furnizor cunoscut ca fiind bun** (dacă este setat), apoi revine la
strategia `rules`. Util pentru persistența sesiunii — același furnizor gestionează
solicitările ulterioare dintr-o conversație.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Revine la strategia rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Când se utilizează**: Conversații cu mai multe schimburi în care doriți ca același furnizor să gestioneze
solicitările ulterioare (de exemplu, pentru memorare în cache, continuitatea contextului sau consecvența tarifării).

**Alias**: `lkgp` (fără alias)

---

### Strategii personalizate pentru router

Vă puteți înregistra propria implementare `RouterStrategy` prin intermediul API-ului public:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Logica dumneavoastră de rutare aici
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Apoi utilizați-o:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Ghid de selectare a strategiei routerului

| Caz de utilizare       | Strategie   | Motiv                                          |
| ---------------------- | ----------- | ---------------------------------------------- |
| Sarcină echilibrată    | `rules`     | Implicită — ia în considerare toți factorii    |
| Minimizarea costului   | `cost`      | Alege întotdeauna cea mai ieftină opțiune      |
| Minimizarea latenței   | `latency`   | Alege cel mai rapid furnizor de încredere      |
| SLO-uri stricte        | `sla-aware` | Filtrează după pragurile p95/de eroare/de cost |
| Chat cu mai multe ture | `lkgp`      | Persistența sesiunii                           |

Câmpuri compatibile cu SLA:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Adecvarea pentru sarcini

Peste 30 de modele evaluate pentru 6 tipuri de sarcini (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Acceptă modele wildcard (de exemplu, `*-coder` → scor ridicat pentru programare).

## Recapitularea variantelor Auto

Incluzând varianta simplă `auto` (implicită), plus cele 6 valori `AutoVariant` declarate în `autoPrefix.ts`, există **7 ID-uri de model care pot fi invocate**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` enumeră în sine 6 valori; a 7-a opțiune este „fără variantă” — varianta simplă `auto` — gestionată de `parseAutoPrefix()` ca `variant: undefined`.)

## Cum se integrează nivelurile în Auto-Combo

Funcția de punctare cu 16 factori (`open-sse/services/autoCombo/scoring.ts`) tratează apartenența la nivel drept două semnale: `tierPriority` (0.0476) și `tierAffinity` (0.0476). Consultați [tabelul canonic al factorilor de punctare](#how-it-works-persisted-auto-combos) de mai sus pentru setul complet `DEFAULT_WEIGHTS` — suprascrierile pentru fiecare pachet (ship-fast/cost-saver/quality-first/offline-friendly) sunt enumerate în tabelul „Profiluri de ponderare pentru fiecare pachet”.

Nivelul singur **nu** impune ca Nivelul 1 să fie primul — dacă latența Nivelului 1 este slabă sau raportul cost-calitate este suboptim, Nivelul 2 câștigă. Pentru a impune ordinea nivelurilor, utilizați strategia de combinație `priority` și aranjați furnizorii în funcție de nivel.

Pentru a favoriza puternic Nivelul 1 (abonament), creșteți ponderea `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consultați `docs/marketing/TIERS.md` pentru definițiile nivelurilor și clasificarea furnizorilor.

## Testare și acoperire

### Matrice deterministă a deciziilor de rutare (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` demonstrează **decizia** de rutare a tuturor celor 19 strategii publice, de la un capăt la altul, prin conducta reală de combinație, cu un upstream simulat. Acoperirea include:

- Toate cele 19 strategii `ROUTING_STRATEGY_VALUES` (ordonate, ponderate, cost, context, fuziune, …).
- `quota-share` (internă) de la un capăt la altul: echitate DRR + reducerea priorității la saturație prin punctul real de integrare `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Acoperirea transferului universal `context-relay` pentru fiecare număr de ținte.

Această suită rulează în CI (jobul `test:integration`) cu `--test-concurrency=1` și `--test-force-exit`, astfel încât este deterministă și nu necesită credențiale reale.

### Teste smoke reale condiționate (NU sunt în CI — furnizori reali)

| Comandă                                | Ce face                                                                                                   |
| :------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Rutare reală în proces cu `RUN_COMBO_LIVE=1`; creează un instantaneu al unei baze de date OmniRoute reale |
| `npm run test:combo:live:vps`          | Apeluri HTTP către un server OmniRoute real (setați `COMBO_LIVE_BASE_URL`)                                |
| `npm run test:combo:live:vps:failover` | La fel, cu scenarii deliberate de comutare în caz de eroare                                               |

Aceste teste smoke verifică traseul real de comunicație (combinație → furnizor → finalizare). Ele sunt excluse intenționat din CI deoarece necesită credențiale reale și acces la VPS.

---

## Fișiere

| Fișier                                                    | Scop                                                                                                  |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Funcție de punctare cu 16 factori, `DEFAULT_WEIGHTS`, normalizarea pool-ului                          |
| `open-sse/services/autoCombo/taskFitness.ts`              | Tabel de corespondență pentru compatibilitatea model × sarcină                                        |
| `open-sse/services/autoCombo/engine.ts`                   | Logica de selecție, bandit, plafon bugetar                                                            |
| `open-sse/services/autoCombo/selfHealing.ts`              | Excludere, probe, mod pentru incidente                                                                |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profiluri de ponderi (livrare rapidă, economisire, calitate prioritară, offline, fiabilitate, haos) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser pentru prefixul `auto/` + 6 variante                                                           |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Construiește în memorie `AutoComboConfig` din conexiunile active                                      |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Hook de testare pentru simularea registrului de furnizori                                             |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategii)                                                              |
| `src/sse/handlers/chat.ts`                                | Integrare: scurtcircuit pentru prefixul auto                                                          |
