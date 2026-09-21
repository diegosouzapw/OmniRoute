# Guardrails (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sursa de referință:** `src/lib/guardrails/`
> **Ultima actualizare:** 2026-08-29 — v3.8.51 (proveniența transcrierii Video Bridge este declarată de apelant,
> dar nu este încă verificată de server — clarificat conform #11661)

Mecanismele de protecție aplică reguli de siguranță, politici și transformări de conținut la limita
dintre OmniRoute și furnizorii din amonte. Fiecare mecanism de protecție poate inspecta (și
opțional respinge, transforma sau adnota) sarcinile utile ale cererilor (`preCall`) și
răspunsurile din amonte (`postCall`).

Sistemul este de tip **fail-open**: dacă un mecanism de protecție generează o excepție în timpul execuției, registrul
înregistrează eroarea și continuă cu următorul mecanism de protecție, în loc să determine eșecul
cererii. Blocarea este o decizie explicită (`block: true`), niciodată un accident.

## Mecanisme de protecție încorporate

La import, registrul încarcă automat șase mecanisme de protecție în ordinea priorității
(consultați `registry.ts` → `registerDefaultGuardrails()`):

| Prioritate | Nume                | Etapă(e)       | Fișier                |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Numerele de prioritate mai mici se execută **primele**.

### Vision Bridge (`visionBridge.ts`) — Punte de modalitate PR-1

Interceptează cererile care conțin imagini și care vizează **modele fără suport vizual** și fie
rerutează întreaga cerere către un model cu suport vizual, fie înlocuiește părțile de imagine
cu descrieri text produse de un model vizual configurabil înaintea
apelului din amonte. Acest lucru permite furnizorilor exclusiv text să gestioneze în mod transparent
sarcini utile multimodale.

Flux:

1. Omite procesarea dacă modelul țintă acceptă deja conținut vizual (cu excepția cazului în care apare în
   lista de punți forțate `isVisionBridgeForcedModel`).
2. Extrage părțile de imagine prin `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), care deleagă către **detectorul media unificat**
   `detectMediaParts()` din `open-sse/utils/mediaParts.ts` — unica
   sursă de referință partajată cu filtrul de compatibilitate combo.
   Extragerea este limitată printr-o listă de permisiuni la părțile de nivel superior cu formele
   pe care `replaceImageParts` le poate reintroduce (contractul extragere↔înlocuire): OpenAI
   `image_url`, `source.type:"base64"` cu date base64 Anthropic, URL Anthropic
   `source.type:"url"` și `input_image` din Responses API. Potrivirile imbricate și
   formele bazate exclusiv pe indicatori sunt destinate filtrului combo și nu sunt extrase niciodată.
   Omite procesarea dacă nu este găsită niciuna.
3. Rezolvă configurația din timpul execuției prin `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): noile chei de setări `modalityBridge*`
   au prioritate; cheile vechi `visionBridge*` rămân o **variantă de rezervă pentru un singur ciclu**
   (fereastră de revenire). Omite procesarea înainte de orice parcurgere a conținutului media atunci când
   puntea este dezactivată.
4. Selectorul de mod (`modalityBridgeVisionMode`, consultați tabelul de mai jos) decide între
   rerutare și descriere. Rerutarea returnează `modifiedPayload` având doar `model`
   înlocuit, împreună cu metadatele `{ rerouted, fromModel, toModel, imagesKept }`.
5. Calea de descriere: limitează imaginile la `maxImages`, compune promptul adaptat sarcinii,
   consultă memoria cache pentru descrieri, apelează modelul vizual **în paralel**
   (`Promise.allSettled`) și injectează în locul imaginilor părți text `[Image N]: <description>`.
   O descriere eșuată produce `null`, iar partea de imagine originală este
   **păstrată** (#4012) — cu excepția căii de descriere combo, atunci când toate
   descrierile au eșuat, caz în care un furnizor din amonte confirmat ca neavând suport vizual primește în schimb un substituent
   `(indisponibil — niciun furnizor cu suport vizual nu este conectat)` (#8430).
6. Returnează `modifiedPayload` + metadate (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selector de mod (`modalityBridgeVisionMode`)

| Mod        | Implicit | Comportament                                                                                                                                                                                                                                                                                                                                       |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Euristică veche, nemodificată (#6640/#7204): modelele non-combo/`auto/` sunt rerutate către cel mai bun model vizual, cu excepția cazului în care modelul original are deja acreditări utilizabile (atunci se folosește descrierea); țintele combo folosesc întotdeauna descrierea.                                                                |
| `describe` |          | Folosește întotdeauna descrierea — blocul de rerutare este omis complet; modelul ales de utilizator răspunde întotdeauna.                                                                                                                                                                                                                          |
| `reroute`  |          | Forțează rerutarea: verificarea care păstrează modelul cu acreditări este ocolită. Verificarea acreditărilor pentru **ținta** rerutării se aplică în continuare — când nu există nicio țintă vizuală utilizabilă, cererea continuă pe calea de descriere, astfel încât imaginile brute să nu ajungă niciodată la un backend exclusiv text (#8430). |

Modurile forțate scurtcircuitează **înainte** de executarea euristicii automate; comportamentul `auto`
este identic la nivel de octet cu mecanismul de protecție anterior PR-1.

#### Prompt de descriere adaptat sarcinii (`modalityBridgeVisionTaskAware`)

Valoarea implicită este **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) adaugă
textul **ultimului mesaj al utilizatorului** (trunchiat la 500 de caractere) la promptul de bază
pentru descriere, orientând descrierea spre ceea ce a cerut efectiv utilizatorul
(modelul codex-vision-proxy) și solicitând modelului vizual să transcrie textul vizibil.
Cu opțiunea dezactivată — sau în absența textului utilizatorului — promptul de bază este utilizat fără modificări.

Auto-bucla de descriere pentru cererea proprie compatibilă cu OpenAI (`callVisionModelSingle()`
din `visionBridgeHelpers.ts`) solicită întotdeauna `image_url.detail: "high"` —
necondiționat, pentru fiecare apelant/furnizor, fără a depinde de vreun semnal al clientului.
Eșantionarea cu nivel redus de detaliu degradează acuratețea OCR exact pentru sarcina de
transcriere a textului solicitată de acest prompt, astfel încât apelul de descriere solicită
întotdeauna un nivel ridicat de detaliu, indiferent de nivelul de detaliu utilizat de cererea
inițială primită. Acest lucru afectează doar corpul cererii interne de descriere; nu modifică
modul în care OmniRoute transmite mai departe valoarea `image_url.detail` proprie apelantului
în cererea principală — valoarea implicită respectivă este aplicată separat și numai pentru
clienții OpenCode detectați, în `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Ramura cu format wire Anthropic a
auto-buclei de descriere nu are niciun câmp `detail` și nu este afectată de niciuna dintre
valorile implicite.

#### Limita ieșirii descrierii (`modalityBridgeVisionMaxChars`)

| Cheie                          | Valoare implicită | Interval          |
| ------------------------------ | ----------------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`               | `0` sau 100–50000 |

`0` (valoarea implicită) înseamnă **fără limită** — descrierea returnată de
`callVisionModel()` este transmisă nemodificată, păstrând comportamentul
existent. Orice valoare din intervalul 100–50000 trunchiază descrierea și adaugă
sufixul `…` înainte ca aceasta să fie inserată ca `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` în `src/lib/guardrails/visionBridge.ts`).
Măriți această valoare pentru sarcinile OCR cu multe detalii, în care modelul din aval are
nevoie de transcrierea completă; micșorați-o pentru a limita utilizarea tokenurilor de către
modelele vizuale prea prolixe. Câmpul din panoul de control se află în panoul Advanced al
filei Vision (`modality-bridge-max-chars` în `ModalityBridgeVisionTab.tsx`) și ajustează
orice valoare între 1 și 99 în sus, până la pragul minim de 100, lăsând nemodificată o
valoare `0` explicită — `0` este o valoare Zod validă de sine stătătoare
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nu doar
valoarea implicită pentru „nesetat”.

#### Cache-ul descrierilor (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL în memorie pentru ieșirile descrierilor, partajat la nivelul întregului proces.
Cheie = `sha256(imageRef + composedPrompt + configuredBridgeModel)`, cu
încadrare bazată pe prefixarea lungimii (fără coliziuni la limitele câmpurilor). Componenta
modelului este modelul bridge **configurat**, nu modelul care a răspuns efectiv —
`callVisionModel` poate utiliza intern o variantă de rezervă, iar generarea unei chei pentru
fiecare încercare ar fragmenta cache-ul. Descrierile eșuate nu sunt memorate niciodată în
cache. Setări:

| Cheie                           | Valoare implicită | Interval |
| ------------------------------- | ----------------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`            | —        |
| `modalityBridgeCacheTtlMinutes` | `60`              | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`             | 10–5000  |

#### Normalizarea imaginilor de la distanță (descriere prin auto-buclă/preluare base64)

Atunci când bridge-ul preia singur o imagine **de la distanță** — auto-apelul de
descriere Anthropic și conversia în base64 pentru formatul wire Claude
(`ensureBase64ImagesForClaudeWire`), ambele prin
`fetchRemoteImageAsDataUri()` din `visionBridgeHelpers.ts` — URI-ul de date rezultat
este procesat prin `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) înainte de a fi încorporat în cererea către
modelul vizual. Imaginile supradimensionate sunt micșorate la o **latură lungă de 2048px**
(corespunzând limitei de redimensionare pe care OpenAI/Anthropic o aplică deja pe server),
ceea ce reduce numărul de octeți încărcați și latența fără a modifica ceea ce vede modelul
vizual. Redimensionarea utilizează `sharp`, încărcat prin import dinamic: pe o platformă
unde binarul său nativ nu se poate încărca, `normalizeDataUri()` **nu generează niciodată
o excepție** — revine la transmiterea nemodificată a octeților originali, astfel încât calea
de descriere/conversie base64 continuă întotdeauna să funcționeze. Octeții care nu reprezintă
o imagine (o preluare care nu a returnat o imagine decodificabilă) sunt, de asemenea,
transmiși nemodificați. Această normalizare este limitată la imaginile pe care bridge-ul le
preia pentru propriul auto-apel — nu este aplicată niciodată sarcinii utile brute transmise
direct de apelant, în conformitate cu principiul mutațiilor exclusiv opționale (Regula strictă
nr. 20).

#### Schema setărilor + migrare

Noile chei `modalityBridge*` sunt validate cu Zod în `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trioul `modalityBridgeCache*` și grupul
`modalityBridgeAudio*` utilizat de Audio Bridge. Migrarea
`141_modality_bridge_settings.sql` copiază valorile vechi existente
`visionBridge*` în noile chei corespunzătoare (este idempotentă și nu suprascrie
niciodată o valoare `modalityBridge*` setată de operator); cheile vechi rămân
acceptate ca soluție alternativă la citire pentru un ciclu de lansare.

#### Antet de transparență + statistici

Răspunsurile transformate prin descriere conțin
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(construit de `buildModalityBridgeHeader()` în `modalityBridge/bridgeStats.ts`,
aplicat de `withModalityBridgeHeader()` în `src/sse/handlers/chatHelpers.ts`).
Cererile redirecționate nu primesc **niciun** antet — sarcina utilă nu a fost modificată,
iar schimbarea modelului este deja vizibilă în câmpul `model` din corpul răspunsului.

`GET /api/modality-bridge/stats` (autentificare de administrare, același nivel ca
`GET /api/settings`) returnează contoarele din memorie pentru fiecare modalitate
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pentru `vision`, `audio` și
`video`. `averageLatencyMs` utilizează `latencySamples`, nu toate încercările, ca
numitor; o operație fără cronometrare nu inventează un eșantion de zero milisecunde.
`bridged` rămâne aliasul compatibil retroactiv pentru conversiile reușite; încercările
eșuate nu îl incrementează.
Contoarele sunt resetate la repornirea procesului în mod intenționat
(telemetrie, nu contabilitate).

#### Configurarea panoului de control

Pagina dedicată a panoului de control este
`/dashboard/settings/modality-bridge`. Filele sale `Vision`, `Audio`
și `Video`, adresabile prin URL, păstrează parametrii de interogare atunci când se schimbă valoarea `tab`.
Fila Vision oferă activarea, modul, selectarea modelului (inclusiv opțiunea implicită
automată), instrucțiuni adaptate sarcinii, limite avansate pentru expirare/imagine/lungimea-descrierii/cache,
contoare de execuție
și o cerere exemplu protejată. Fila Audio este, de asemenea, funcțională: oferă
activarea, un selector de modele exclusiv STT cu opțiunea Auto, limite pentru expirare/durata-maximă-a-clipului, contoare
audio și un test exemplu `input_audio`. Fila Video este funcțională: raportează
starea de execuție FFmpeg/ffprobe — una dintre cele patru stări explicite ale interfeței (`unknown` cât timp
sondarea este în curs sau nu a putut fi finalizată, `restricted` pe o gazdă a
panoului de control care nu este loopback, unde sondarea este omisă pe partea de client, `unavailable` după sondare
și confirmarea absenței sau `available` împreună cu versiunile FFmpeg/ffprobe) — persistă
limitele de activare/model/cadre/video/expirare, filtrează selectorul de modele pentru modelele
capabile de procesare vizuală și oferă contoare video.

Fostul card Vision Bridge din setările AI este un link de compatibilitate către
pagina nouă; acesta nu mai deține o a doua copie a formularului. Media Providers include, de asemenea,
linkuri de la fluxurile de lucru Image-to-Text și Speech-to-Text către filele Modality
Bridge corespunzătoare, fără a elimina spațiul de testare Speech-to-Text existent.

**Ocolirea admiterii pentru auto-buclă:** când apelul de descriere este rutat prin
auto-bucla `/v1` a OmniRoute (model de furnizor nestandard), subcererea trimite
`x-omniroute-admission-bypass: internal` și este autentificată cu acreditarea
auto-buclei rezolvată — santinela locală `sk_omniroute` în modul local sau cheia
de mediu `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurată de operator (#1350), astfel încât
implementările cu `REQUIRE_API_KEY=true` să poată executa în continuare apelul de descriere. Ocolirea
este acceptată numai pentru acele acreditări exacte, astfel încât clienții externi nu pot utiliza
antetul pentru a omite admiterea.

Valorile implicite moștenite se află în `src/shared/constants/visionBridgeDefaults.ts`;
noile valori implicite pentru mod/adaptarea-la-sarcină/cache și resolverul de setări se află în
`src/shared/constants/modalityBridgeDefaults.ts`. Mecanismul de protecție oferă o
opțiune de constructor `deps`, astfel încât testele să poată injecta implementări false pentru `getSettings` și
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Interceptează cererile de chat care conțin date audio înainte ca acestea să ajungă la o destinație despre care nu se
știe că acceptă intrări audio. Nu rerutează niciodată cererea de chat: părțile audio sunt
transcrise prin endpointul multipart compatibil cu OpenAI existent, iar
modelul de chat ales continuă cu transcrierile text.

Flux:

1. Rezolvă `supportsAudio` prin `getResolvedModelCapabilities()`. Metadatele explicite
   din registrul furnizorilor au prioritate, urmate de metadatele statice ale modelului și apoi de
   `modalities_input` sincronizat. O listă declarată de intrări fără `audio` este `false`; absența
   oricărei dovezi privind capabilitatea rămâne `null`. Atât `false`, cât și `null` activează
   puntea conservatoare, în timp ce `true` o ocolește.
2. Rezolvă setările `modalityBridgeAudio*` și extrage părțile audio de nivel superior
   care pot fi înlocuite din fiecare mesaj prin detectorul comun `detectMediaParts()`.
   Formatele acceptate pentru transmisie sunt `input_audio` OpenAI, `audio_url` și
   `source.media_type: "audio/*"`. Conținutul audio imbricat este detectat pentru rutare, dar nu este
   eliminat de calea de înlocuire. Volumul de lucru este limitat de `modalityBridgeAudioMaxClips`;
   părțile ulterioare rămân nemodificate.
3. Respectă o configurație `provider/model` sau permite ca `selectAudioBridgeModel()` să parcurgă
   `AUDIO_TRANSCRIPTION_PROVIDERS` în ordinea stabilă a catalogului și să selecteze primul
   model cu o acreditare activă și utilizabilă a furnizorului.
4. `callAudioTranscription()` convertește datele audio base64/data-URI într-un
   `file` multipart sau descarcă un `audio_url` de la distanță prin mecanismul de protecție pentru conexiuni
   de ieșire exclusiv publice, cu fixare DNS și o limită de 25 MB. Apoi trimite prin POST fișierul și modelul
   selectat către auto-bucla locală `/v1/audio/transcriptions`, autentificată cu
   `resolveSelfLoopBearer()`. Ruta de transcriere existentă efectuează procesul normal de
   căutare a acreditărilor, gestionarea perioadelor de așteptare/limitării ratei și expedierea către furnizor.
5. Apelurile reușite își înlocuiesc părțile cu `[Audio N]: <transcript>`. Apelurile
   rulează cu `Promise.allSettled`: un eșec individual păstrează partea audio
   originală respectivă (contractul #4012). Dacă toate apelurile eșuează, iar destinația are în mod dovedit
   `supportsAudio === false`, părțile devin
   `[Audio N]: (unavailable — no STT provider connected)` (contractul #8430). Pentru
   o destinație necunoscută (`null`), un rezultat în care toate apelurile eșuează rămâne nemodificat. O destinație
   despre care s-a dovedit că acceptă numai text și care nu are nicio acreditare STT utilizabilă primește același
   substitut explicit fără emiterea unui apel de rețea.

Transcrierile reușite utilizează cache-ul LRU/TTL Modality Bridge comun întregului proces. Cheia
combină referința audio, eticheta stabilă a operației `audio-transcription`
și modelul STT selectat; eșecurile nu sunt memorate niciodată în cache. Încercările audio actualizează
contoarele comune `bridged`, `cacheHits`, `failures` și `lastUsedAt`.
Răspunsurile transformate conțin
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; cererile
nemodificate nu primesc un segment Audio Bridge.

Setările din timpul execuției sunt stocate în baza de date și validate cu Zod:

| Cheie                         | Valoare implicită | Interval        |
| ----------------------------- | ----------------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`            | —               |
| `modalityBridgeAudioModel`    | `""`              | Auto sau ID STT |
| `modalityBridgeAudioTimeout`  | `60000`           | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`               | 1–10            |

Cache-ul comun rămâne controlat de `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` și `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceptează părțile video de nivel superior din `messages` pentru Chat Completions și din `input` pentru API-ul Responses înainte de apelarea unei ținte despre care nu se știe că oferă suport video nativ.
Formele acceptate sunt `input_video`, `video_url`, `video_source`, URL-uri HTTPS și URI-uri de date `data:video/*;base64,...`. Numele simple de fișiere din text nu sunt tratate drept conținut video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gestionează parcurgerea cererii, verificarea capabilităților/politicilor, agregarea la nivelul cererii și sarcina utilă a răspunsului.
Procesarea fiecărui videoclip — achiziția, memoria cache pentru rezultatul complet, descrierea unei secvențe de cadre (care combină orice transcriere audio declarată de apelant) și metricele/anularea/curățarea pentru fiecare încercare — este ascunsă în spatele `processVideoPart` din `videoBridgePipeline.ts`, apelată o dată pentru fiecare parte video în bucla din `preCall`.
Modulul respectiv definește și limitele explicite ale porturilor `VideoMediaBrokerPort` (achiziționarea octeților și extragerea cadrelor eșantionate), `VideoAudioTranscriptionPort` (combinarea unei transcrieri audio declarate de apelant cu descrierile cadrelor eșantionate) și `VideoDrilldownPort` (limita de persistență pentru analiza aprofundată a cadrelor; încă neconectată la `processVideoPart` — în prezent, numai ruta separată `/api/modality-bridge/video/drilldown` scrie intrări de analiză aprofundată).

Calea publică a cererilor `/v1` nu importă și nu invocă niciodată un subproces. Videoclipurile de la distanță sunt descărcate în limita a 50 MiB; videoclipurile base64 inline au o limită conservatoare de 36 MiB decodați pentru fiecare videoclip, astfel încât anvelopa modelului/mesajelor/încadrării să poată rămâne în limita publică de acceptare a cererilor JSON, de 50 MiB. Lungimea inline și estimările dimensiunii decodate sunt verificate înainte de alocare. HTTPS este obligatoriu pentru URL-ul inițial de la distanță și pentru fiecare redirecționare, utilizând protecția existentă pentru conexiunile de ieșire exclusiv publice, cu fixare DNS. Octeții traversează apoi exact limita brokerului intern `POST /api/modality-bridge/video/extract`. Ruta respectivă este atât `LOCAL_ONLY`, cât și `SPAWN_CAPABLE`, acceptă numai o cerere autentificată per proces, prin interfața loopback de încredere, și nu acceptă niciodată un URL, o cale din sistemul de fișiere, un executabil sau o listă de argumente. Fluxul API pentru dimensiunea corpului și cititorul incremental al corpului din handler impun independent o limită de 50 MiB pentru intrarea brokerului. Coada sa limitată execută câte o singură extragere, permite patru sarcini în așteptare și limitează intrările în așteptare la 100 MiB.

În interiorul brokerului, `ffprobe` citește un fișier local privat; lista fixă de formate permise exclude formatele de listă de redare și manifest. Pentru containerele permise din familia MOV, referințele externe la date MOV rămân dezactivate în mod implicit, iar comanda fixă nu le activează. Atât `ffprobe`, cât și `ffmpeg` utilizează lista de protocoale permise limitată la `file`, un singur fir de execuție, vectori ficși de argumente, fără shell și executabile rezolvate din `PATH`. Fluxurile de copertă cu imagine atașată nu sunt candidate redabile. Toate fluxurile redabile trebuie să respecte limitele, iar un flux implicit explicit este preferat înaintea alternativei deterministe cu cel mai mic index. Videoclipurile sunt limitate la 600 de secunde, 8.192 de pixeli pe dimensiune și 33.554.432 de pixeli sursă. FFmpeg eșantionează între 1 și 16 cadre JPEG din punctele de mijloc, reduce latura lungă la cel mult 1.024 de pixeli fără a mări intrările mai mici și nu primește niciodată un URL. Politica implicită de eșantionare este `uniform`. Politicile opționale `scene_aware` și cea experimentală `segment_aware` efectuează încă o trecere FFmpeg fixă peste fluxul local deja validat, selectează marcaje temporale de scenă `showinfo` în limitele stabilite și revin în mod determinist la aceleași puncte de mijloc uniforme în cazul unei erori a detectorului, al expirării timpului, al unui rezultat malformat sau al unui set gol de candidați. Modul bazat pe segmente alocă proporțional eșantioanele din punctele de mijloc intervalelor de scenă validate; dovezile pentru modul bazat pe segmente și comportamentul de rezervă sunt detaliate mai jos. Limita strictă de 16 cadre este aplicată după selecție în cadrul fiecărei politici. Atunci când o cerere bazată pe scene are un buget de un singur cadru, aceasta utilizează punctul de mijloc uniform al întregului videoclip activ sau al ferestrei de focalizare și raportează `policyEffective: uniform`: un singur cadru de scenă selectat nu poate păstra ambele capete temporale. Opțional, apelantul poate furniza o fereastră de focalizare finită (`start`/`end` în secunde); limitele sunt restrânse la durata conținutului media, ferestrele inversate sau nefinite sunt respinse, iar toate politicile de eșantionare sunt aplicate numai în interiorul intervalului normalizat. Fereastra rezultată este inclusă în metadatele de eșantionare și în prefixul descrierii care nu prezintă încredere, astfel încât modelele din aval să poată distinge un fragment focalizat de cronologia completă.

Focalizarea semantică a descrierilor este o setare separată și explicită. Modul implicit de analiză `full` păstrează promptul existent pentru cadre și nu transmite niciodată textul cererii către modelul de descriere. În modul `focused`, puntea citește numai cel mai recent `text`/`input_text` nevid creat de utilizator din același container Chat sau Responses, îl normalizează în NFC, restrânge caracterele de control și spațiile albe și îl limitează la 500 de puncte de cod Unicode. Un rezultat gol determină revenirea la promptul `full` exact. Un indiciu utilizabil este serializat ca JSON într-un bloc dedicat contextului utilizatorului care nu prezintă încredere și poate doar să prioritizeze detalii observabile; acesta nu poate suprascrie avertismentul separat împotriva urmării instrucțiunilor vizibile sau audibile în conținutul media. Focalizarea textuală nu deduce niciodată `start`/`end` și nu modifică eșantionatorul temporal.

#### Dovezi structurale privind segmentele pentru FU-07

`segment_aware` utilizează o singură trecere limitată de preanaliză peste fluxul video local deja validat. Lanțul fix de filtre reduce mai întâi lățimea la cel mult 320 de pixeli, detectează schimbările de scenă și intervalele înghețate, apoi eșantionează cu 1 cadru pe secundă pentru neclaritate, luminanță medie și informații spațiale/temporale. Trecerea este limitată la 600 de eșantioane structurale, un singur fir FFmpeg/de filtrare, aceleași liste de protocoale limitate la `file` și de containere permise, o limită de 1 MiB pentru ieșirea procesului și cel mult 30 de secunde în cadrul mecanismului comun de anulare/termen-limită al brokerului. Nu acceptă niciodată din cerere o comandă, un filtru, o cale sau un URL.

Valorile structurale reprezintă dovezi de eșantionare deterministe, nu o înțelegere semantică a materialului video. Acestea nu deduc subiecți, acțiuni, subtitrări, vorbire sau intenția utilizatorului. Limitele scenelor și ale secvențelor înghețate formează segmente; acoperirea secvențelor înghețate, neclaritatea, expunerea, detaliile spațiale și schimbarea temporală influențează doar modul în care este alocat bugetul existent de 1–16 cadre. Un segment complet înghețat este limitat la un cadru, în timp ce segmentele neînghețate concurează pentru bugetul rămas. Când numărul limitelor depășește numărul cadrelor, se păstrează o acoperire uniformă a cronologiei, astfel încât tăieturile rapide de la început să nu poată ascunde un segment final lung. Limitele scenelor aflate în rezoluția de analiză de 1 secundă a unei limite de îngheț sunt comasate.

Filtrele lipsă, dovezile malformate/goale, o eroare a detectorului sau expirarea timpului-limită restricționat pentru preanaliză revin la politica exactă și uniformă a punctului median. O anulare din partea apelantului sau termenul-limită al brokerului nu produce această revenire: aceasta încheie subprocesul aflat în execuție, împiedică extragerea ulterioară a cadrelor, iar arborele temporar privat este eliminat în `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generează seturi de test FFmpeg reale și deterministe pentru economiile de apeluri de subtitrare de după deduplicare, alocarea bugetului pentru mișcare densă, dovezile privind neclaritatea/expunerea/SI-TI, tăieturile rapide cu o secțiune finală lungă și rezultatele fals pozitive produse de estompările graduale. Acesta înregistrează timpul real al preanalizei și, acolo unde este disponibil `/usr/bin/time`, timpul CPU al procesului copil și valoarea RSS maximă. Verificările sale de calitate sunt exclusiv oracole structurale. Calitatea modelului real de subtitrare rămâne `HOLD`, deoarece acest cadru de testare nu dispune de un endpoint autorizat sau de un evaluator fixat. Economiile monetare rămân, de asemenea, `HOLD`, cu excepția cazului în care `--caption-cost-per-call-usd` furnizează o estimare pozitivă explicită a costului per apel; scriptul nu fabrică niciodată niciunul dintre aceste rezultate.

Fiecare cadru este limitat la 4 MiB, toate cadrele brute împreună la 23 MiB, iar răspunsul serializat al brokerului la 32 MiB. Un director temporar privat este eliminat în `finally`. OmniRoute nu include FFmpeg și nu acceptă o cale personalizată către executabil. Înainte de subtitrare, puntea aplică o etapă conservatoare de deduplicare vizuală: fiecare JPEG este redus la un buffer în tonuri de gri de 16×16 și este comparat numai cu ultimul cadru păstrat. Pentru un buget de subtitrare solicitat mai mare de un cadru, extragerea furnizează un grup restricționat de candidați de până la de două ori acel buget și niciodată mai mult de 16 cadre. Limita solicitată este aplicată numai după deduplicare, iar primul și ultimul candidat selectat sunt păstrați în timpul răririi finale atunci când bugetul este de cel puțin două cadre. Politica cu versiune
`grayscale-16x16-mean-cells-v2` utilizează valoarea mai mare dintre diferența medie de luminanță și proporția celulelor miniaturii a căror diferență normalizată este de cel puțin 0,05. Pragul de duplicare este constanta 0,04, aleasă pentru predictibilitate, nu expusă drept setare în timpul execuției. Acest semnal secundar cu contrast ridicat păstrează mișcările mici și modificările textului vizibil pe care o comparație bazată exclusiv pe medie le poate ascunde. Erorile comparatorului sau ale decodorului nu blochează procesarea și păstrează acoperirea. Metadatele de ieșire diferențiază candidații extrași, cadrele utilizate cu succes și duplicatele vizuale eliminate.

O parte video marcată explicit poate solicita o foaie de contact cu marcaje temporale. Puntea construiește o grilă JPEG cu cel mult 4 coloane și 16 cadre. Fiecare celulă de 512 pixeli înscrie marcajul temporal al sursei într-o bandă inferioară cu contrast ridicat, iar aceleași marcaje temporale rămân în metadatele textuale pentru asociere și auditare ulterioare. Fișierul JPEG complet rămâne limitat la 32 MiB. Dacă `sharp` nu poate decoda sau compune grila, puntea revine la cadrele JPEG individuale; anularea de către client continuă să se propage prin operația asupra foii.

Dovezile pentru promovare sunt separate în mod deliberat de microbenchmarkul sintetic de compoziție. `scripts/perf/video-bridge-contact-sheet-eval.ts` definește un cadru de testare A/B cu schemă versionată pentru modele vizuale reale compatibile cu OpenAI. Acesta măsoară tokenurile raportate de furnizor, latența reală de la un capăt la altul (inclusiv compunerea foii), numărul de apeluri ale modelului și păstrarea faptelor definite în manifest. Răspunsurile brute ale modelului nu sunt scrise în raport; sunt păstrate numai rezumatele SHA-256 și ID-urile faptelor corespunzătoare. Cadrul de testare nu efectuează niciun apel de rețea sau către un model cu plată decât dacă este transmis `--execute-real`, iar `--model`, `OMNIROUTE_BASE_URL` și `OMNIROUTE_API_KEY` sunt configurate. Fără această execuție reală explicită, verdictul său prelucrabil automat rămâne `HOLD`; măsurătorile sintetice ale sarcinii utile/numărului de apeluri nu constituie, singure, dovezi pentru promovare.

Apelanții pot atașa o matrice opțională `transcript.cues` unei părți video acceptate atunci când dețin deja text aliniat. Fiecare indiciu trebuie să conțină `text`, un interval finit `start`/`end` aflat în durata detectată și un `source` din lista permisă (`client`, `embedded` sau `audio-bridge`); `confidence` are valoarea implicită `1` și trebuie să rămână între `0` și `1`. Indiciile care sunt duplicate exacte sunt comasate. OmniRoute nu pornește niciodată transcrierea pe baza acestor metadate: indiciile validate sunt copiate în rezultatul descris împreună cu sursa, nivelul de încredere și intervalul și sunt redate drept observații care nu sunt de încredere, alături de subtitrările cadrelor. Textul nevalid, din afara intervalului sau fără proveniență este respins, nu amestecat în fluxul de subtitrări. Câmpul `source` este în prezent declarat de apelant, nu verificat de server: OmniRoute impune ca valoarea să fie unul dintre cele trei șiruri permise, dar încă nu confirmă criptografic că o etichetă `embedded` sau `audio-bridge` provine într-adevăr dintr-o extragere aflată sub controlul serverului. Tratați `source` drept un indiciu care nu este de încredere până la implementarea acelei verificări; nu fundamentați deciziile de autorizare pe acesta.

Un apelant avansat poate furniza o pistă `audioTranscript` deja autorizată
pentru același videoclip. Punctul de îmbinare rulează observațiile vizuale și audio în cadrul
aceluiași termen-limită și al aceluiași semnal de anulare, le ordonează pe o cronologie comună, elimină
dublurile exacte și raportează un rezultat parțial atunci când doar una dintre ramuri reușește.
Un `audioTranscript` nevalid este redus la acel rezultat parțial — descrierea
vizuală este păstrată, iar ramura audio înregistrează un cod de eroare igienizat —
în loc ca întregul videoclip să eșueze. Disponibilitatea fiecărei ramuri, indicatorul de rezultat parțial
și codurile de eroare igienizate sunt păstrate în rezultatul descris, în
metadatele mecanismului de protecție (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), în metadatele cache-ului de rezultate și în contoarele
de fuziune ale punții. Calea implicită Video Bridge nu invocă funcționalitatea de conversie a vorbirii în text
și nu descarcă o a doua copie a conținutului media; fără acea pistă explicită, rămâne
exclusiv video.

**Păstrarea transcrierii (#12150 P1).** Aceasta se aplică automat ori de câte ori
Video Bridge (ea însăși opțională) redă un indiciu de transcriere — nu există un
indicator separat de păstrare. Atunci când o solicitare redă orice indiciu de transcriere (un
`transcript` declarat de apelant sau un `audioTranscript` fuzionat), mecanismul de protecție îl marchează drept
`videoBridgeObserved` și produce o copie umbră cu informații mascate a descrierii videoclipului —
o redare identică în care corpul de text liber al fiecărui indiciu este înlocuit cu
`[redacted-video-transcript]`, construită prin substituirea câmpului structurat al indiciului
înainte de asamblarea șirului (niciodată prin parsarea textului aplatizat, astfel încât niciun
conținut al indiciului — ostil sau obișnuit, inclusiv corpuri care conțin `]`, precum
`[inaudible]`/`[music]` — să nu poată rămâne). Corpul solicitării din jurnalul de apeluri persistent
înlocuiește fiecare parte de text derivată din videoclip cu acea copie umbră mascată, asociată prin
egalitatea conținutului; ancora `fullText` este recitită din sarcina utilă finalizată a mecanismului de protecție
premergător apelului, astfel încât asocierea reușește în continuare după ce mecanismele de protecție ulterioare din lanț (mecanismele de
mascare a informațiilor cu caracter personal și a datelor de autentificare, cu prioritățile 10/95) rescriu pe loc textul descrierii și
după ce injectarea promptului de sistem, a transferului și a memoriei remodelează matricea de mesaje. Corpul
trimis în amonte către model rămâne neschimbat. De asemenea, o solicitare observată nu populează
nicio memorie durabilă (este omisă atât extragerea derivată din solicitare, cât și cea derivată din răspuns),
astfel încât răspunsul propriu al modelului nu poate reproduce textul transcrierii în memorie.

Suprafețele de păstrare rămase deschise, urmărite pentru o etapă ulterioară (**P2**, #12430): instantaneul brut
al solicitării clientului, anterior mecanismului de protecție, din artefactul jurnalului detaliat;
continuarea `previous_response_id` cu eșec în mod închis; expedierile interne ale
prompturilor derivate care încorporează transcrierea într-un prompt tip șir sintetizat
(etape de pipeline, transfer de context); și corpul răspunsului / copia din cache-ul semantic
a unui răspuns al modelului care citează transcrierea. Acestea sunt suprafețe brute/de tip răspuns sau
opționale, aflate în afara domeniului P1 privind corpul persistent al solicitării + memoria.

Ciclul de viață intern `/api/modality-bridge/video/drilldown` este un substrat de cache
separat, pe interfața loopback și autentificat prin token. Fiecare operațiune necesită, de asemenea, un
ID principal opac canonic. Înainte ca un apelant de producție să fie activat, acesta trebuie
să derive acel ID din entitatea găzduită autentificată și nu trebuie niciodată să redirecționeze o
valoare selectată de client. Cheile cache-ului leagă acel principal de ID-urile canonice ale sesiunii și
referinței videoclipului, stochează numai cheile lor derivate prin SHA-256 și restricționează atât citirile,
cât și ștergerea la același principal. Cache-ul stochează cel mult 16 cadre JPEG derivate
pentru fiecare intrare, le expiră după zece minute și acceptă citiri limitate prin
`start`/`end` sau ștergerea explicită a sesiunii.

Fiecare principal este limitat la 16 intrări și 64 MiB de date JPEG canonice. Aceste
limite sunt independente de plafonul global de 64 de intrări/256 MiB: presiunea cotei
principalului evacuează numai intrările cel mai puțin recent utilizate ale principalului respectiv înainte ca
evacuarea LRU globală să fie luată în considerare. Intrările expirate sunt eliminate atât din contabilizarea per principal,
cât și din cea globală în timpul activității cache-ului, în timp ce anularea și eșecul validării nu
salvează o înlocuire parțială.

Cache-ul respinge Base64 necanonic, umplerea excesivă, conținutul media care nu este JPEG, fișierele JPEG
malformate sau trunchiate și fișierele JPEG care produc un avertisment în timpul unei decodări `sharp`
limitate a imaginii complete. Acesta recodifică fiecare imagine acceptată ca JPEG canonic, determină lățimea și înălțimea
din octeții decodați în loc să acorde încredere câmpurilor apelantului și elimină orice octeți
poligloți rămași la final, în loc să îi păstreze. Numai bufferul comprimat canonic limitat
este contorizat în ambele cote. Limita de transmisie JSON include suprasarcina Base64 pentru plafonul de 32 MiB
al intrării decodificate. Fiecare
derivare stocată înregistrează formatul/rezoluția JPEG validate, politica de eșantionare,
versiunea derivării, momentul creării, hash-ul conținutului calculat de server și referința părinte
sub formă de hash, plus hash-ul conținutului părinte furnizat de apelantul de încredere. Anularea este verificată
între fazele asincrone de decodare/hash, înainte de salvarea atomică în cache.

Această tranșă nu conectează încă un producător de producție la rută și nu
oferă selectarea variantelor cu rezoluții multiple. Prin urmare, calea transparentă de solicitare
Video Bridge nu implică operațiuni suplimentare, în timp ce derivarea principalului asociat entității găzduite și
ciclul de viață FU-08 complet, cu rezoluții multiple, rămân activități ulterioare explicite, în loc
să fie documentate drept comportamente finalizate.

Cadrele sunt descrise secvențial cu modelul Video configurat. O suprascriere Video goală moștenește setarea Vision; dacă ambele sunt goale, routerul automat Vision selectează modelul efectiv cu capabilități de procesare vizuală. Descrierile generate cu succes înlocuiesc partea originală cu un prefix stabil `[Video description:`, care marchează, de asemenea, textul drept o observație nevalidată derivată din conținut media și indică modelelor din aval să nu urmeze instrucțiunile găsite în conținutul media. Cheile cache-ului pentru descrierile cadrelor includ octeții JPEG, promptul, marcajul temporal și modelul efectiv; sunt memorate în cache numai descrierile generate cu succes. Intrările din cache păstrează modelul producător care a reușit efectiv, inclusiv un model de rezervă; puntea raportează `mixed` atunci când cadre diferite au fost produse de modele diferite. O accesare reușită a cache-ului reutilizează identitatea producătorului respectiv, în loc să o reeticheteze drept planul de rutare solicitat. Cache-ul rezultatelor pentru întregul videoclip este indexat după fiecare intrare care modifică rezultatul — prompt, model efectiv, politică de eșantionare, număr de cadre, mod de analiză semantică, amprenta SHA-256 a indicației de focalizare normalizate, fereastra de focalizare, `transcript`, `audioTranscript` și indicatorul foii de contact — astfel încât modificarea oricăreia dintre aceste dimensiuni produce o ratare a cache-ului, niciodată reutilizarea unor date învechite. Versiunea politicii de deduplicare vizuală, pragul și numărul limitat de cadre candidate sunt, de asemenea, explicite în cheia și metadatele cache-ului de rezultate; prin urmare, o modificare a politicii nu poate reutiliza o descriere învechită a întregului videoclip. Metadatele v4 ale cache-ului de rezultate păstrează modul și amprenta, niciodată sarcina brută a utilizatorului. Metadatele mecanismului de protecție raportează atât modul de analiză solicitat, cât și pe cel efectiv; un mod `focused` solicitat fără text utilizabil furnizat de utilizator este raportat ca fiind efectiv `full`.

Mecanismul de protecție extrage fiecare parte video acceptată, dar nu descrie mai mult de `modalityBridgeVideoMaxVideos`. Pentru o țintă despre care s-a demonstrat că are `supportsVideo === false`, videoclipurile a căror procesare a eșuat și cele care depășesc limita devin marcaje text explicite și sigure, astfel încât să nu rămână niciun videoclip brut. Când capabilitatea este necunoscută, acele părți rămân nemodificate. Țintele cu `supportsVideo === true` ocolesc puntea. Semnalul de anulare al cererii clientului este propagat prin descărcare, coada brokerului, subprocese și apelurile de descriere; anulările opresc procesarea între videoclipuri și nu permit niciodată continuarea nesigură cu conținutul media brut.

Setările din timpul rulării sunt stocate în baza de date și validate cu Zod:

| Cheie                               | Valoare implicită | Interval / comportament                                                                                          |
| ----------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`           | Opțional în timpul rulării, necesită activare explicită                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`          | `full` păstrează descrierile generice; `focused` folosește context limitat și nevalidat de la ultimul utilizator |
| `modalityBridgeVideoModel`          | `""`              | Moștenește modelul punții Vision                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`               | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`       | `uniform`, `scene_aware` sau `segment_aware` proporțional; eșecul detectorului revine la `uniform`               |
| `modalityBridgeVideoMaxVideos`      | `1`               | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`          | 1000–120000 ms                                                                                                   |

Valorile persistente moștenite pentru expirarea Video care depășesc 120 de secunde sunt limitate la termenul brokerului; noile scrieri de setări care depășesc această limită sunt respinse. `GET /api/modality-bridge/video/runtime` necesită o origine locală loopback de încredere și marcată înainte de autentificare sau de verificarea mediului de rulare, apoi necesită autentificare de administrare. Acesta returnează numai `available`, versiunile FFmpeg/ffprobe igienizate și un motiv fix atunci când mediul de rulare nu este disponibil. Endpointul intern de extragere nu este un API public pentru încărcări: saturarea cozii returnează `503` împreună cu `Retry-After`, deconectarea apelantului returnează `499`, iar termenul fix al brokerului returnează `504`. Răspunsurile convertite adaugă `video->text;model=<visionModel>;parts=<videos>` la antetul central `x-omniroute-modality-bridge`, fără a elimina segmentele Vision sau Audio.

### Mascarea PII (`piiMasker.ts`)

Rulează în **ambele** etape.

- **`preCall`** clonează sarcina utilă, parcurge `system`, `messages`, `input` și `prompt` (inclusiv elementele de tip șir simplu) și aplică `processPII()` (din `@/shared/utils/inputSanitizer`) câmpurilor șir `content`/`text`. Când `PII_REDACTION_ENABLED=true`, PII detectate sunt redactate în sarcina utilă de ieșire. Acest lucru este independent de `INPUT_SANITIZER_MODE` (care controlează numai politica privind injectarea de prompturi). Când redactarea este dezactivată, apelul înregistrează numărul detectărilor fără a rescrie conținutul.
- **`postCall`** clonează în profunzime răspunsul, rulează `sanitizePIIResponse()` împreună cu mecanismul de mascare pentru structura Responses API (`maskResponsesOutput` — acoperă `output_text` și `output[].content[].text`). Dacă are loc vreo redactare, răspunsul modificat îl înlocuiește pe cel original.

Mecanismul de protecție nu blochează niciodată; doar adnotează (`meta.detections`, `meta.redacted`) sau rescrie.

### Injectarea de prompturi (`promptInjection.ts`)

Detectează structuri ostile în conținutul furnizat de utilizator și aplică politica configurată. Comportamentul este determinat de variabilele de mediu și de opțiunile constructorului:

| Setare          | Variabilă de mediu                                                                                      | Valoare implicită | Efect                                                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activat         | `INPUT_SANITIZER_ENABLED`                                                                               | `true`            | Când este `false`, mecanismul de protecție încheie anticipat procesarea.                                                                                                                                                           |
| Mod             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                         | `warn`            | Politica privind injectarea: `block`, `warn` sau `log`. (`redact` este acceptat pentru compatibilitate retroactivă, dar **nu** elimină textul de injectare; rescrierea PII din cerere este controlată de `PII_REDACTION_ENABLED`.) |
| Prag de blocare | Opțiunea `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`            | Severitatea minimă necesară pentru blocare. În mod implicit, severitatea medie este doar observată.                                                                                                                                |

**Precedența modurilor** (`getMode`): `options.mode` al apelantului →
**suprascrierea indicatorului de funcționalitate din BD** pentru `INJECTION_GUARD_MODE` (Tablou de bord → Setări →
Indicatori de funcționalitate) → variabila de mediu `INJECTION_GUARD_MODE` → variabila de mediu `INPUT_SANITIZER_MODE` →
`warn`. Prin urmare, o suprascriere din tabloul de bord are prioritate față de variabilele de mediu, astfel încât interfața
Indicatori de funcționalitate controlează în timp real mecanismul de protecție aflat în execuție (fără repornire). Citirea din BD este tolerantă la erori:
dacă aceasta eșuează, mecanismul de protecție revine la comportamentul bazat pe variabilele de mediu, iar când nu este
setată nicio suprascriere, comportamentul este identic cu rezoluția bazată exclusiv pe variabilele de mediu.

Surse de detecție:

1. `sanitizeRequest()` din `@/shared/utils/inputSanitizer` (set comun de detectoare
   utilizat în alte părți ale fluxului de procesare).
2. `DEFAULT_GUARD_PATTERNS` încorporate (în prezent `system_override_inline` și
   `markdown_system_block`, ambele cu severitate `high`).
3. `customPatterns` opționale transmise prin opțiunile constructorului (șiruri, expresii regulate
   sau înregistrări `{ name, pattern, severity }`).

Când `mode === "block"` **și** cel puțin o detecție atinge pragul de severitate,
`preCall` returnează `{ block: true, message: "Request rejected:
suspicious content detected" }`. În modurile `warn`/`log`, mecanismul de protecție înregistrează evenimentul, dar
permite apelul. Funcția auxiliară comună `evaluatePromptInjection()` este, de asemenea, exportată
pentru apelanții care trebuie să evalueze prompturi fără a trece prin registru.

**Limită de scanare (v3.8.20):** detectorul inspectează doar **primii 16 KB** din
textul concatenat al promptului — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 de octeți) în
`src/shared/utils/inputSanitizer.ts`. Atât `detectInjection()`, cât și
`evaluatePromptInjection()` aplică `slice(0, MAX_INJECTION_SCAN_BYTES)` înainte de a executa
bucla de tipare. Directivele de injectare se află aproape de începutul unei intrări, astfel încât această
limită reduce utilizarea CPU/GC de către expresiile regulate pentru sarcini utile de sute de KB fără a slăbi detecția (cf.
#3932, #4041).

### Mascarea acreditărilor (`credentialMasker.ts`)

Rulează în **ambele** etape, ultima în lanțul implicit (prioritate `95`). Redactează
tiparele cunoscute de chei API / tokenuri secrete din sarcina utilă de ieșire (conținutul
mesajelor, argumentele apelurilor de instrumente, rezultatele instrumentelor) **și** din răspunsul furnizorului, astfel încât o
acreditare lipită într-un prompt (sau reprodusă într-un rezultat de instrument) să nu fie divulgată
furnizorului din amonte sau clientului.

- **Numai cu activare explicită**, conform aceleiași convenții ca redactarea PII (în proximitatea Regulii stricte #20):
  dezactivată dacă `settings.credentialRedactionEnabled === true` **sau**
  `CREDENTIAL_REDACTION_ENABLED=true` nu este setat. Când este dezactivat, mecanismul de protecție nu efectuează nicio operațiune —
  nu blochează și nu rescrie niciodată.
- `redactCredentials()` parcurge întregul arbore al sarcinii utile/răspunsului (`walkValue()`,
  protejat împotriva poluării prototipului, protejat împotriva ciclurilor prin `WeakSet`) și înlocuiește potrivirile cu
  un substituent `[REDACTED:<type>]`, clonând numai ramurile care s-au
  modificat efectiv.
- `CREDENTIAL_PATTERNS` acoperă cheile furnizorilor LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokenurile VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), cheile de plată (Stripe, Square), cheile
  pentru servicii cloud (cheie de acces AWS, Twilio, SendGrid, Mailgun), cheile private / JWT-urile,
  șirurile de conexiune care conțin acreditări (`mongodb://user:pass@...` etc.) și
  un tipar generic pentru valorile antetelor `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Cheile cu formă de antet (`authorization`, `x-api-key`, `api-key`,
  `apikey`) sunt redactate structural (numai valoarea, păstrând prefixul schemei, precum
  `Bearer `/`Basic `), și nu prin expresia regulată generică pentru text.
- Mecanismul de protecție nu blochează niciodată; acesta doar rescrie (`modifiedPayload` /
  `modifiedResponse`) și adnotează (`meta.credentialsRedacted`, `meta.count`).

Protecție împotriva regresiilor: `tests/unit/credential-masker-guardrail.test.ts`.

## Contract de bază (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // valoarea true întrerupe lanțul
  message?: string; // afișat în cazul blocării
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returnat de preCall pentru a rescrie cererea
  modifiedResponse?: TValue; // returnat de postCall pentru a rescrie răspunsul
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Un mecanism de protecție semnalează „nicio modificare” returnând fie `void`, `{}`, fie
`{ block: false }`. Returnarea unui `modifiedPayload`/`modifiedResponse` înlocuiește
valoarea transmisă prin lanț către mecanismele de protecție ulterioare.
`signal?: AbortSignal` transmite ciclul de viață al apelantului către mecanismele de protecție. Anularea unei cereri reprezintă excepția intenționată de tip „fail-open”: punțile media își opresc activitatea și efectuează curățarea fără a restaura conținutul media brut către o destinație despre care se știe că nu îl acceptă.

## Registru (`registry.ts`)

Instanța singleton `guardrailRegistry` expune:

- `register(guardrail)` — adaugă un mecanism de protecție (sau îl înlocuiește după numele normalizat) și
  reordonează elementele în ordine crescătoare după `priority`.
- `clear()` / `list()` — funcții auxiliare administrative.
- `runPreCallHooks(payload, context)` — parcurge mecanismele de protecție active, transmite succesiv
  sarcina utilă prin `modifiedPayload` și se oprește la primul `block: true`.
- `runPostCallHooks(response, context)` — același flux pentru răspuns.
- `resetGuardrailsForTests({ registerDefaults })` — golește starea și, opțional,
  reînregistrează valorile implicite pentru o izolare curată a testelor.

Ambele funcții de execuție returnează `{ blocked, payload|response, results, guardrail?, message? }`,
unde `results` este un tablou de înregistrări `GuardrailExecutionResult` care includ
câmpurile `blocked`, `skipped`, `modified`, `error` și `meta` pentru fiecare mecanism de protecție,
utile pentru trasare.

### Dezactivarea mecanismelor de protecție pentru fiecare cerere

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agregă o listă
fără duplicate cu numele mecanismelor de protecție care trebuie omise pentru cererea
curentă. Sursele (toate opționale și combinate) sunt:

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` din corpul cererii (la nivel superior)
- `metadata.disabledGuardrails` din corpul cererii
- Antetul `x-omniroute-disabled-guardrails` (sau varianta veche
  `x-disabled-guardrails`)

Valorile pot fi tablouri de șiruri sau un șir separat prin virgule; numele sunt
normalizate la litere mici în format kebab-case (`pii_masker` → `pii-masker`). Rezultatul
este transmis prin `context.disabledGuardrails` către registru, care omite
mecanismele de protecție corespunzătoare (`skipped: true` în `results`).

## Ordinea de execuție

Pentru fiecare cerere care trece prin `src/sse/handlers/chat.ts` și
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` construiește lista de omitere pe baza cheii API, a corpului
   și a antetelor.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` execută mecanismele de protecție în ordinea
   crescătoare a priorității:
   - Mecanismele de protecție dezactivate sunt înregistrate ca `skipped`.
   - Metoda `preCall` a fiecărui mecanism de protecție poate rescrie conținutul transmis prin `modifiedPayload`.
   - Primul `block: true` întrerupe lanțul, iar handlerul returnează
     un răspuns de respingere din partea mecanismului de protecție.
3. Conținutul transmis (eventual rescris) trece în rutarea combinată și în trimiterea
   către serviciul upstream.
4. După asamblarea răspunsului, `guardrailRegistry.runPostCallHooks(...)`
   execută același lanț asupra răspunsului. Un `block: true` în acest punct elimină răspunsul
   upstream.

Mecanismele de protecție care generează excepții sunt înregistrate cu `error: <message>` și consemnate prin
`logger.warn`, însă lanțul continuă — prin proiectare, comportamentul este fail-open.

## Configurare

Variabile de mediu citite de mecanismele de protecție încorporate:

| Variabilă                             | Utilizată de              | Efect                                                                                                                                                      |
| ------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Setați la `false` pentru a dezactiva complet detectarea.                                                                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politica pentru injecții: `warn`, `block` sau `log`. Valoarea veche `redact` nu rescrie textul injecției.                                                  |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modul mecanismului de protecție împotriva injecțiilor; este și un indicator de funcționalitate din DB care **suprascrie** variabilele de mediu (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Severitatea minimă respinsă de `MODE=block`: `high` (implicit), `medium` sau `low`.                                                                        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias vechi pentru `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                                      |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Când este `true`, datele PII din cerere sunt redactate (independent de modul pentru injecții).                                                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Controlează comportamentul de mascare aplicat răspunsului.                                                                                                 |

Mecanismele de protecție Modality Bridge citesc configurația din timpul execuției din depozitul de setări
susținut de DB (`getSettings()`), nu din variabilele de mediu. Cheile principale pentru Vision sunt
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` și
`modalityBridgeCacheMaxEntries`. Cheile vechi
`visionBridge*` sunt acceptate numai ca mecanism documentat de rezervă pentru citire pe durata unui singur ciclu;
scrierile din tabloul de bord utilizează cheile principale. Valorile implicite și resolverul de rezervă
se află în `src/shared/constants/modalityBridgeDefaults.ts`, iar constantele vechi
sunt păstrate în `src/shared/constants/visionBridgeDefaults.ts`.

Pentru audio se utilizează `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` și `modalityBridgeAudioMaxClips`, împreună cu setările comune
`modalityBridgeCache*`. Pentru audio nu există un mecanism de rezervă bazat pe chei vechi, deoarece aceste
chei au fost introduse odată cu schema Modality Bridge.

Pentru video se utilizează `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` și
`modalityBridgeVideoTimeout`, împreună cu setările comune `modalityBridgeCache*`.
Funcționalitatea este dezactivată implicit deoarece FFmpeg/ffprobe sunt dependențe operaționale
opționale, iar generarea descrierilor pentru cadre adaugă latență și costuri asociate modelului.

## Mecanisme de protecție personalizate

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Pași:

1. Creați `src/lib/guardrails/myGuardrail.ts` extinzând `BaseGuardrail`.
2. Implementați `preCall` și/sau `postCall`.
3. Fie înregistrați la momentul importului (adăugând din `registerDefaultGuardrails`), fie
   apelați `guardrailRegistry.register(...)` în timpul execuției — registrul înlocuiește
   orice mecanism de protecție anterior cu același nume normalizat.
4. Adăugați teste în `tests/unit/` (exemple existente:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testare

Utilizați `resetGuardrailsForTests()` între teste pentru a porni de la o stare cunoscută.
Transmiteți `{ registerDefaults: false }` pentru a porni cu un registru gol și
înregistrați doar mecanismele de protecție testate. Vision Bridge acceptă injectarea
dependențelor (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge expune
punctele de extensie echivalente pentru setări, capabilități, selectarea modelului STT,
verificarea acreditărilor și transcriere. Astfel, testele pot verifica ambele fluxuri fără
acces la baza de date sau la rețea.

## Consultați și

- `src/lib/guardrails/` — implementare
- `src/shared/utils/inputSanitizer.ts` — detector partajat care asigură
  detectarea injectării în prompturi și mascarea PII
- `src/shared/constants/visionBridgeDefaults.ts` — valorile implicite Vision Bridge și
  lista modelelor care impun utilizarea punții
- `src/shared/constants/modalityBridgeDefaults.ts` — valorile implicite partajate de execuție pentru Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — strat ortogonal (întrerupător de circuit, perioade de așteptare)
- `docs/reference/ENVIRONMENT.md` — referința completă a variabilelor de mediu

## Acoperirea rutelor de mecanismul anti-injectare și red-team (Faza 8 · Blocul D)

Mecanismul anti-injectare (`createInjectionGuard` / `withInjectionGuard`) acoperă toate rutele
care acceptă prompturi de la utilizatori. Acesta respectă `INJECTION_GUARD_MODE` (valoarea implicită `warn` = doar jurnalizare;
`block` = returnează HTTP 400 `SECURITY_001`).

| Tip             | Rute                                                                                                                                                 | Mod implicit |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Text (existent) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generativ       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Date            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Extragerea textului (`extractMessageContents`) acoperă `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nocturn, `nightly-llm-security.yml`):** promptfoo validează că fiecare rută blochează
corpusul OWASP-LLM când `INJECTION_GUARD_MODE=block`; garak execută sonde (este omis fără secret).
`moderations` este inclus pentru consecvență — operatorii care utilizează modul de blocare îl pot excepta prin
`resolveDisabledGuardrails`.

Fluxul de lucru nocturn (`.github/workflows/nightly-llm-security.yml`, cron + declanșare
manuală) are două joburi:

- **`promptfoo-guard` (blocant)** — execută `promptfoo eval -c promptfooconfig.yaml`
  cu `INJECTION_GUARD_MODE=block`. Fiecare caz adversarial (de exemplu, „ignorați toate
  instrucțiunile anterioare…”, jailbreak-uri în stil DAN) verifică dacă răspunsul conține
  `error.code === "SECURITY_001"`, adică mecanismul de protecție a respins efectiv cererea.
- **`garak` (consultativ)** — execută garak `--probes promptinject,dan,leakreplay`
  asupra unei instanțe OmniRoute locale (`http://localhost:20128/v1`). Este condiționat de
  un secret al furnizorului (`PROMPTFOO_PROVIDER_KEY`); este omis fără eroare și are sufixul
  `|| true`, astfel încât raportează fără a provoca eșecul CI.

Acoperirea funcției ajutătoare a mecanismului de protecție (`createInjectionGuard` / `withInjectionGuard`)
include fiecare rută `/v1` care conține prompturi; textul promptului este preluat din
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` de către
`extractMessageContents()` din `src/shared/utils/inputSanitizer.ts`.
