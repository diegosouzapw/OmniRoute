# Guardrails (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

## Bariere de protecție încorporate

Registrul încarcă automat șase bariere de protecție în ordine de prioritate la import
(vezi `registry.ts` → `registerDefaultGuardrails()`):

| Prioritate | Nume                | Etapă(e)       | Fișier                |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Numerele de prioritate mai mici rulează **primele**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Interceptează cererile care conțin imagini, destinate **modelelor non-vizuale**, și fie
redirecționează întreaga cerere către un model capabil de viziune, fie înlocuiește părțile de imagine
cu descrieri text produse de un model de viziune configurabil înainte de
apelul upstream. Acest lucru permite furnizorilor doar text să gestioneze transparent
sarcini utile multimodale.

Flux:

1.  Se omite dacă modelul țintă suportă deja viziunea (cu excepția cazului în care apare în
    lista de forțare a punții `isVisionBridgeForcedModel`).
2.  Extrage părțile de imagine prin `extractImageParts(messages)`
    (`visionBridgeHelpers.ts`), care deleagă către **detectorul unificat de media**
    `detectMediaParts()` din `open-sse/utils/mediaParts.ts` — singura sursă de adevăr
    împărtășită cu filtrul de compatibilitate combo.
    Extracția este permisă doar pentru părțile de nivel superior ale formelor pe care
    `replaceImageParts` le poate reasambla (contractul extract↔replace): OpenAI
    `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
    `source.type:"url"`, și Responses API `input_image`. Potrivirile imbricate și
    formele doar indicatoare sunt material pentru filtrul combo și nu sunt niciodată extrase.
    Se omite dacă nu se găsește nimic.
3.  Rezoluția configurației de rulare prin `resolveVisionBridgeRuntimeSettings()`
    (`src/shared/constants/modalityBridgeDefaults.ts`): noile chei de setări `modalityBridge*`
    câștigă; cheile `visionBridge*` vechi rămân o **soluție de rezervă pentru un singur ciclu**
    (fereastră de rollback). Se omite înainte de orice traversare media atunci când puntea este dezactivată.
4.  Selectorul de mod (`modalityBridgeVisionMode`, vezi tabelul de mai jos) decide
    redirecționarea vs. descrierea. Redirecționarea returnează `modifiedPayload` cu doar
    `model` schimbat, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Calea de descriere: limitează imaginile la `maxImages`, compune promptul conștient de sarcină,
    consultă cache-ul de descriere, apelează modelul de viziune **în paralel**
    (`Promise.allSettled`), și injectează părți de text `[Image N]: <description>` în
    locul lor. O descriere eșuată produce `null` și partea originală a imaginii este
    **păstrată** (#4012) — cu excepția cazului în care, pe calea de descriere combo, fiecare
    descriere a eșuat, unde un upstream non-vizual confirmat primește un
    ` (indisponibil — niciun furnizor capabil de viziune conectat)` în loc (#8430).
6.  Returnează `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
    `processingTimeMs`, `visionModel`).

#### Selector de mod (`modalityBridgeVisionMode`)

| Mod        | Implicit | Comportament                                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Heuristică veche, neatinsă (#6640/#7204): modelele non-combo/`auto/` redirecționează către cel mai bun model de viziune, cu excepția cazului în care modelul original are deja credențiale utilizabile (atunci descrie); țintele combo descriu întotdeauna.                                                                  |
| `describe` |          | Descrie întotdeauna — blocul de redirecționare este complet omis; modelul ales de utilizator răspunde întotdeauna.                                                                                                                                                                                                           |
| `reroute`  |          | Forțează redirecționarea: garda `keep-credentialed-model` este ocolită. Garda de credențiale a **țintei** de redirecționare se aplică în continuare — atunci când nu există o țintă de viziune utilizabilă, cererea trece la descriere, astfel încât imaginile brute să nu ajungă niciodată la un backend doar text (#8430). |

Modurile forțate scurtcircuitează **înainte** ca euristica automată să ruleze; comportamentul `auto`
este identic byte-cu-byte cu bariera de protecție pre-PR-1.

#### Prompt de descriere conștient de sarcină (`modalityBridgeVisionTaskAware`)

Implicit **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) adaugă textul
**ultimului mesaj al utilizatorului** (trunchiat la 500 de caractere) la promptul de descriere de bază,
orientând descrierea către ceea ce a cerut de fapt utilizatorul (modelul codex-vision-proxy)
și cerând modelului de viziune să transcrie textul vizibil. Cu indicatorul dezactivat —
sau fără text de la utilizator — promptul de bază este folosit neschimbat.

Cererea compatibilă cu OpenAI (`callVisionModelSingle()` în `visionBridgeHelpers.ts`) a buclei interne de descriere solicită întotdeauna `image_url.detail: "high"` — necondiționat, pentru fiecare apelant/furnizor, fără a fi condiționată de vreun semnal client. Eșantionarea cu detalii reduse degradează acuratețea OCR exact pentru sarcina de transcriere a textului solicitată de acest prompt, astfel încât apelul de descriere în sine solicită întotdeauna detalii înalte, indiferent de nivelul de detaliu utilizat de cererea inițială. Acest lucru afectează doar corpul cererii interne de descriere; nu modifică modul în care OmniRoute transmite propriul `image_url.detail` al apelantului în cererea primară — acea valoare implicită este aplicată separat, și doar pentru clienții OpenCode detectați, în `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Ramura formatului Anthropic a buclei interne de descriere nu are câmpul `detail` și nu este afectată de niciuna dintre valorile implicite.

#### Limita de ieșire a descrierii (`modalityBridgeVisionMaxChars`)

| Cheie                          | Implicit | Interval          |
| ------------------------------ | -------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` sau 100–50000 |

`0` (implicit) înseamnă **fără limită** — descrierea returnată de `callVisionModel()` este transmisă nemodificată, păstrând comportamentul existent. Orice valoare din intervalul 100–50000 trunchiază descrierea cu un sufix `…` înainte de a fi reintrodusă ca `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` în `src/lib/guardrails/visionBridge.ts`). Măriți această valoare pentru sarcini OCR cu detalii intense, unde modelul din aval are nevoie de transcrierea completă; reduceți-o pentru a limita utilizarea token-urilor la modelele vizuale verbose. Câmpul din tabloul de bord se află în panoul Avansat al tab-ului Vision (`modality-bridge-max-chars` în `ModalityBridgeVisionTab.tsx`) și ajustează orice valoare între 1 și 99 la pragul de 100, lăsând un `0` explicit neatins — `0` este o valoare Zod validă în sine (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nu doar valoarea implicită "nesetată".

#### Cache-ul de descriere (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL în memorie pentru ieșirile de descriere, partajat la nivel de proces.
Cheie = `sha256(imageRef + composedPrompt + configuredBridgeModel)` cu încadrare cu prefix de lungime (fără coliziuni la limitele câmpurilor). Componenta modelului este modelul bridge **configurat**, nu modelul care a răspuns efectiv — `callVisionModel` poate recurge intern la un alt model, iar cheia per încercare ar fragmenta cache-ul. Descrierile eșuate nu sunt niciodată stocate în cache. Setări:

| Cheie                           | Implicit | Interval |
| ------------------------------- | -------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`   | —        |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000  |

#### Normalizarea imaginilor la distanță (descriere buclă internă/preluare base64)

Atunci când bridge-ul preia o imagine **la distanță** — apelul intern de descriere Anthropic și conversia base64 în format claude-wire (`ensureBase64ImagesForClaudeWire`), ambele prin `fetchRemoteImageAsDataUri()` în `visionBridgeHelpers.ts` — URI-ul de date rezultat este transmis prin `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) înainte de a fi încorporat în cererea modelului vizual. Imaginile supradimensionate sunt redimensionate la o **margine lungă de 2048px** (potrivindu-se cu limita de redimensionare pe care OpenAI/Anthropic o aplică deja pe server), ceea ce reduce byte-ii/latenta de încărcare fără a schimba ceea ce vede modelul vizual. Redimensionarea utilizează `sharp`, încărcat prin import dinamic: pe o platformă unde binarul său nativ nu reușește să se încarce, `normalizeDataUri()` **nu generează niciodată erori** — revine la o transmitere a byte-ilor originali, astfel încât calea de descriere/conversie base64 continuă întotdeauna să funcționeze. Byte-ii non-imagine (o preluare care nu a returnat o imagine decodabilă) sunt, de asemenea, transmiși neatinsi. Această normalizare este limitată la imaginile pe care bridge-ul le preia pentru propriul său apel intern — nu este niciodată aplicată sarcinii utile brute de la apelant, în concordanță cu principiul mutației doar prin opt-in (Regula Strictă #20).

#### Schema de setări + migrare

Noile chei `modalityBridge*` sunt validate Zod în `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio-ul `modalityBridgeCache*` și grupul `modalityBridgeAudio*` utilizat de Audio Bridge. Migrarea `141_modality_bridge_settings.sql` copiază valorile `visionBridge*` existente din vechea versiune către noile chei corespunzătoare (idempotent, nu suprascrie niciodată o valoare `modalityBridge*` setată de operator); cheile vechi rămân acceptate ca fallback de citire pentru un ciclu de lansare.

#### Antet de transparență + statistici

Răspunsurile transformate de descriere poartă `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construit de `buildModalityBridgeHeader()` în `modalityBridge/bridgeStats.ts`, ștampilat de `withModalityBridgeHeader()` în `src/sse/handlers/chatHelpers.ts`). Cererile redirecționate **nu** primesc antet — sarcina utilă a fost neatinsă, iar schimbarea modelului este deja vizibilă în câmpul `model` al corpului răspunsului.

`GET /api/modality-bridge/stats` (autentificare de management, același nivel ca `GET /api/settings`) returnează contoarele în memorie per-modalitate `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` pentru `vision`, `audio` și `video`. `averageLatencyMs` utilizează `latencySamples`, nu toate încercările, ca numitor; o operație fără cronometrare nu fabrică o mostră de zero milisecunde. `bridged` rămâne aliasul compatibil cu versiunile anterioare pentru conversiile reușite; încercările eșuate nu îl incrementează. Contoarele se resetează la repornirea procesului prin design (telemetrie, nu contabilitate).

#### Configurația tabloului de bord

Pagina dedicată a tabloului de bord este
`/dashboard/settings/modality-bridge`. Tab-urile sale `Vision`, `Audio`
și `Video`, adresabile prin URL, păstrează parametrii de interogare la schimbarea valorii `tab`.
Tab-ul Vision expune activarea, modul, selecția modelului (inclusiv implicitul automat),
prompt-uri conștiente de sarcină, limite avansate de timeout/imagine/lungime-descriere/cache,
contoare de rulare și o cerere de eșantion protejată. Tab-ul Audio este, de asemenea, activ:
expune activarea, un selector de model doar STT cu Auto, limite de timeout/clip-maxim,
contoare audio și un test de eșantion `input_audio`. Tab-ul Video este funcțional:
raportează starea de rulare FFmpeg/ffprobe — una dintre cele patru stări explicite ale interfeței de utilizator
(`unknown` în timp ce sonda este în curs sau nu a putut fi finalizată, `restricted` pe un host de tablou de bord non-loopback
unde sonda este omisă pe partea clientului, `unavailable` odată sondată și confirmată ca lipsă,
sau `available` cu versiunile FFmpeg/ffprobe) — menține limitele de activare/model/cadru/video/timeout,
filtrează selectorul de model la modele capabile de viziune și expune contoare video.

Fostul card Vision Bridge din setările AI este un link de compatibilitate către
noua pagină; nu mai deține o a doua copie a formularului. Furnizorii de Media leagă,
de asemenea, fluxurile de lucru Image-to-Text și Speech-to-Text la tab-urile Modality
Bridge corespunzătoare, fără a elimina playground-ul Speech-to-Text existent.

**Ocolirea admiterii prin buclă internă (self-loop):** atunci când apelul de descriere este rutat prin propria buclă internă `/v1` a OmniRoute (model de furnizor non-standard), sub-cererea trimite `x-omniroute-admission-bypass: internal` și este autentificată cu credențialul de buclă internă rezolvat — santinela locală `sk_omniroute` în modul local, sau cheia de mediu `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurată de operator (#1350) astfel încât implementările `REQUIRE_API_KEY=true` să poată rula în continuare apelul de descriere. Ocolirea este onorată doar pentru acele credențiale exacte, astfel încât clienții externi nu pot utiliza antetul pentru a sări peste admitere.

Valorile implicite vechi se găsesc în `src/shared/constants/visionBridgeDefaults.ts`;
noile valori implicite pentru mod/conștientizare-sarcină/cache și rezolvitorul de setări se găsesc în
`src/shared/constants/modalityBridgeDefaults.ts`. Mecanismul de siguranță expune o opțiune de constructor `deps` pentru ca testele să poată injecta implementări false de `getSettings` și `callVisionModel`.

### Puntea Audio (`audioBridge.ts`) — Puntea de Modalitate PR-3

Interceptează cererile de chat care conțin audio înainte ca acestea să ajungă la o țintă despre care nu se știe că acceptă intrare audio. Nu rerutează niciodată cererea de chat: părțile audio sunt transcrise prin intermediul endpoint-ului multipart existent, compatibil OpenAI, iar modelul de chat ales continuă cu transcrierile text.

Flux:

1.  Rezolvă `supportsAudio` prin `getResolvedModelCapabilities()`. Metadatele explicite din registrul furnizorilor au prioritate, apoi metadatele statice ale modelului, apoi `modalities_input` sincronizate. O listă de intrări declarată fără `audio` este `false`; nicio dovadă de capabilitate rămâne `null`. Atât `false`, cât și `null` activează puntea conservatoare, în timp ce `true` o ocolește.
2.  Rezolvă setările `modalityBridgeAudio*` și extrage părțile audio de nivel superior, care pot fi îmbinate, din fiecare mesaj prin detectorul partajat `detectMediaParts()`. Formatele de date acceptate sunt OpenAI `input_audio`, `audio_url` și `source.media_type: "audio/*"`. Audio-ul imbricat este detectat pentru rutare, dar nu este eliminat de calea de îmbinare. Lucrul este limitat de `modalityBridgeAudioMaxClips`; părțile ulterioare rămân neatinse.
3.  Respectă un `provider/model` configurat, sau lasă `selectAudioBridgeModel()` să parcurgă `AUDIO_TRANSCRIPTION_PROVIDERS` în ordine stabilă de catalog și să selecteze primul model cu un credențial de furnizor activ utilizabil.
4.  `callAudioTranscription()` convertește audio-ul base64/data-URI într-un `file` multipart, sau descarcă un `audio_url` la distanță prin garda de ieșire doar publică, cu fixare DNS și o limită de 25 MB. Apoi trimite prin POST fișierul și modelul selectat către bucla internă locală `/v1/audio/transcriptions`, autentificat cu `resolveSelfLoopBearer()`. Ruta de transcriere existentă efectuează căutarea normală a credențialelor, gestionarea răcirii/limitării ratei și expedierea către furnizor.
5.  Apelurile reușite își înlocuiesc părțile cu `[Audio N]: <transcript>`. Apelurile rulează cu `Promise.allSettled`: o eroare individuală păstrează acea parte audio originală (contract #4012). Dacă fiecare apel eșuează și ținta este dovedită `supportsAudio === false`, părțile devin `[Audio N]: (indisponibil — niciun furnizor STT conectat)` (contract #8430). Pentru o țintă necunoscută (`null`), un rezultat cu toate eșecurile rămâne neatins. O țintă dovedită doar text, fără credențial STT utilizabil, primește același stub explicit fără a iniția un apel de rețea.

Transcrierile reușite utilizează cache-ul LRU/TTL la nivel de proces al Puntei de Modalitate. Cheia combină referința audio, eticheta de operație stabilă `audio-transcription` și modelul STT selectat; eșecurile nu sunt niciodată stocate în cache. Încercările audio actualizează contoarele partajate `bridged`, `cacheHits`, `failures` și `lastUsedAt`. Răspunsurile transformate poartă
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; cererile neatinse nu primesc un segment Audio Bridge.

Setările de rulare sunt susținute de bază de date și validate cu Zod:

| Cheie                         | Implicit | Interval        |
| :---------------------------- | :------- | :-------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —               |
| `modalityBridgeAudioModel`    | `""`     | Auto sau STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10            |

Cache-ul partajat rămâne controlat de `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` și `modalityBridgeCacheMaxEntries`.

### Puntea Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceptează părți video de nivel superior în `messages` și Răspunsuri Chat Completions API `input` înainte de a apela o țintă fără suport video nativ cunoscut.
Formatele acceptate sunt `input_video`, `video_url`, `video_source`, URL-uri HTTPS,
și URI-uri de date `data:video/*;base64,...`. Numele de fișiere simple în text nu sunt tratate
ca video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gestionează parcurgerea cererilor,
verificarea capacității/politicii, agregarea per-cerere și sarcina utilă a răspunsului.
Munca per-video — achiziția, cache-ul rezultatului complet, descrierea unei secvențe de cadre
(care fuzionează orice transcriere audio declarată de apelant) și metricile/anularea/curățarea per-încercare —
este ascunsă în spatele `processVideoPart` din `videoBridgePipeline.ts`, apelată o dată
pentru fiecare parte video în bucla `preCall`.
Acest modul definește, de asemenea, limitele explicite ale porturilor `VideoMediaBrokerPort`
(achiziționarea de octeți și extragerea cadrelor eșantionate), `VideoAudioTranscriptionPort`
(fuzionarea unei transcrieri audio declarate de apelant cu subtitrările eșantionate) și
`VideoDrilldownPort` (limita de persistență a detaliilor cadrelor; nu este încă conectată
la `processVideoPart` — doar ruta separată `/api/modality-bridge/video/drilldown`
scrie intrări de detaliere astăzi).

Calea publică de solicitare `/v1` nu importă și nu invocă niciodată un subproces.
Videoclipurile la distanță sunt descărcate sub o limită de 50 MiB; videoclipurile inline base64 au o
limită conservatoare de 36 MiB decodate per-video, astfel încât anvelopa modelului/mesajelor/încadrării
să poată rămâne în limita publică de admitere a cererilor JSON de 50 MiB.
Estimările lungimii inline și ale dimensiunii decodate sunt verificate înainte de alocare.
HTTPS este necesar pe URL-ul inițial la distanță și la fiecare redirecționare, utilizând
gardul de ieșire existent, doar public, cu fixare DNS. Octeții traversează apoi
limita exactă a brokerului intern `POST /api/modality-bridge/video/extract`.
Această rută este atât `LOCAL_ONLY`, cât și `SPAWN_CAPABLE`, acceptă doar o cerere
autentificată per-proces, cu buclă de încredere, și nu acceptă niciodată un URL,
o cale de sistem de fișiere, un executabil sau o listă de argumente.
Pipeline-ul de dimensiune a corpului API și cititorul incremental de corp al handlerului
impun independent o limită de intrare a brokerului de 50 MiB. Coada sa limitată rulează
o extracție la un moment dat, permite patru sarcini în așteptare și limitează intrarea
în așteptare la 100 MiB.

În interiorul brokerului, `ffprobe` citește un fișier local privat; lista albă de formate fixe
exclude formatele de playlist și manifest. Pentru containerele din familia MOV permise,
referințele externe de date MOV rămân dezactivate implicit, iar comanda fixă nu le activează.
Atât `ffprobe`, cât și `ffmpeg` utilizează lista albă de protocoale `file`-only, un singur thread,
matrici de argumente fixe, fără shell și executabile rezolvate din `PATH`.
Fluxurile de copertă cu imagini atașate nu sunt candidați redabili.
Toate fluxurile redabile trebuie să respecte limitele, iar un flux implicit explicit este preferat
înaintea revenirii deterministe la cel mai mic index.
Videoclipurile sunt limitate la 600 de secunde, 8.192 de pixeli pe dimensiune și
33.554.432 de pixeli sursă. FFmpeg eșantionează 1–16 cadre JPEG la mijloc,
scalează latura lungă la cel mult 1.024 de pixeli fără a mări intrările mai mici și
nu primește niciodată un URL. Eșantionarea este `uniform` implicit.
Politicile opționale `scene_aware` și experimentale `segment_aware` efectuează o trecere
suplimentară fixă FFmpeg peste fluxul local deja validat, selectează timestamp-uri
de scenă `showinfo` limitate și revin determinist la aceleași puncte de mijloc uniforme
în caz de eșec al detectorului, timeout, ieșire malformată sau un set de candidați gol.
Modul segment-aware alocă eșantioane la mijloc proporțional cu intervalele de scenă validate;
dovezile segment-aware și comportamentul de revenire sunt detaliate mai jos.
Limita strictă de 16 cadre este aplicată după selecție în fiecare politică.
Atunci când o cerere scene-aware are un buget de un singur cadru, utilizează punctul de mijloc
uniform al ferestrei active video complete sau de focalizare și raportează `policyEffective: uniform`:
un singur cadru de scenă selectat nu poate păstra ambele capete temporale.
Un apelant poate furniza opțional o fereastră de focalizare finită (`start`/`end` secunde);
limitele sunt ajustate la durata media, ferestrele inversate sau non-finite sunt respinse,
iar toate politicile de eșantionare sunt efectuate numai în intervalul normalizat.
Fereastra rezultată este inclusă în metadatele de eșantionare și în prefixul descrierii
neîncrezătoare, astfel încât modelele din aval să poată distinge un extras focalizat
de cronologia completă.

Focalizarea semantică a subtitrărilor este o setare separată, explicită.
Modul de analiză implicit `full` păstrează promptul de cadru existent și nu transmite
niciodată textul cererii către modelul de subtitrări.
În modul `focused`, bridge-ul citește doar cel mai recent `text`/`input_text`
non-gol, scris de utilizator, din același container Chat sau Responses,
îl normalizează la NFC, colapsează caracterele de control și spațiile albe și
îl limitează la 500 de puncte de cod Unicode.
Un rezultat gol revine la promptul `full` exact.
O sugestie utilizabilă este serializată ca JSON într-un bloc dedicat de context
de utilizator neîncrezător și poate doar prioritiza detalii observabile;
nu poate anula avertismentul separat împotriva urmăririi instrucțiunilor vizibile
sau audibile în media. Focalizarea textuală nu deduce `start`/`end` și nu modifică
eșantionatorul temporal.

#### FU-07 dovezi structurale de segment

`segment_aware` utilizează o trecere de pre-analiză limitată peste fluxul video local
deja validat. Lanțul de filtre fix scalează mai întâi la cel mult 320 de pixeli lățime,
detectează schimbările de scenă și intervalele înghețate, apoi eșantionează la 1 cadru
pe secundă pentru estompare, luma medie și informații spațiale/temporale.
Trecerea este limitată la 600 de eșantioane structurale, un thread FFmpeg/filter,
aceleași liste albe de protocoale și containere `file`-only, o limită de ieșire a procesului
de 1 MiB și cel mult 30 de secunde în cadrul limitei de anulare/termen limită partajate a brokerului.
Nu acceptă niciodată o comandă, un filtru, o cale sau un URL din cerere.

Valorile structurale sunt dovezi de eșantionare deterministă, nu înțelegere semantică a videoclipului. Ele nu inferă subiecți, acțiuni, subtitrări, vorbire sau intenția utilizatorului. Limitele de scenă și de îngheț formează segmente; acoperirea înghețului, estomparea, expunerea, detaliile spațiale și modificarea temporală influențează doar modul în care este alocat bugetul existent de 1–16 cadre. Un segment complet înghețat este limitat la un singur cadru, în timp ce segmentele neînghețate concurează pentru bugetul rămas. Atunci când limitele depășesc numărul de cadre, acoperirea uniformă a cronologiei este reținută, astfel încât tăieturile rapide timpurii nu pot ascunde un segment lung final. Limitele de scenă aflate în rezoluția de analiză de 1 secundă a unei limite de îngheț sunt coalescente.

Filtrele lipsă, dovezile malformate/goale, o eroare de detector sau expirarea pre-analizei limitate eșuează deschis la politica exactă de punct median uniform. Un abandon al apelantului sau un termen limită al brokerului nu eșuează deschis: acesta termină subprocesul în curs, previne extragerea ulterioară a cadrelor, iar arborele temporar privat este eliminat în `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generează fixture FFmpeg reale deterministe pentru economii post-deduplicare la apelurile de subtitrare, alocarea bugetului pentru mișcare densă, dovezi de estompare/expunere/SI-TI, tăieturi rapide cu o coadă lungă și fals pozitive de estompare graduală. Înregistrează timpul real de pre-analiză și, acolo unde `/usr/bin/time` este disponibil, CPU-ul copilului și RSS-ul maxim. Verificările sale de calitate sunt doar oracole structurale. Calitatea reală a modelului de subtitrare rămâne `HOLD` deoarece acest ham nu are un punct final autorizat sau un judecător înghețat. Economiile monetare rămân, de asemenea, `HOLD` cu excepția cazului în care `--caption-cost-per-call-usd` furnizează o estimare explicită pozitivă per apel; scriptul nu fabrică niciodată niciun rezultat.

Fiecare cadru este limitat la 4 MiB, toate cadrele brute împreună la 23 MiB, iar răspunsul serializat al brokerului la 32 MiB. Un director temporar privat este eliminat în `finally`. OmniRoute nu include FFmpeg și nu acceptă o cale executabilă personalizată. Înainte de subtitrare, bridge-ul aplică o trecere conservatoare de deduplicare vizuală: fiecare JPEG este redus la un buffer de 16×16 în tonuri de gri și este comparat doar cu ultimul cadru reținut. Pentru un buget de subtitrare solicitat de peste un cadru, extragerea furnizează un set de candidați limitat de până la de două ori acel buget și niciodată mai mult de 16 cadre. Limita solicitată este aplicată numai după deduplicare, cu primii și ultimii candidați selectați păstrați în timpul subțierii finale atunci când bugetul este de cel puțin două. Politica versionată `grayscale-16x16-mean-cells-v2` utilizează cea mai mare dintre delta medie de luminanță și raportul celulelor miniaturilor a căror delta normalizată este de cel puțin 0,05. Pragul de duplicare este constanta 0,04, aleasă pentru predictibilitate, mai degrabă decât expusă ca o setare de rulare. Acest semnal secundar de contrast ridicat păstrează mișcarea mică și modificările de text vizibile pe care o comparație bazată doar pe medie le poate ascunde. Erorile comparatorului sau decodorului eșuează deschis și mențin acoperirea. Metadatele de ieșire separă candidații extrași, cadrele utilizate cu succes și duplicatele vizuale eliminate.

O parte video marcată explicit poate solicita o foaie de contact cu marcaj temporal. Bridge-ul construiește cel mult o grilă JPEG de 4 coloane, 16 cadre. Fiecare celulă de 512 pixeli își arde marcajul temporal sursă într-o bandă inferioară cu contrast ridicat, în timp ce aceleași marcaje temporale rămân în metadatele textuale pentru asociere și audit ulterioare. JPEG-ul complet rămâne limitat la 32 MiB. Dacă `sharp` nu poate decoda sau compune grila, bridge-ul revine la cadrele JPEG individuale; un abandon al clientului se propagă totuși prin operațiunea foii.

Dovezile de promovare sunt deliberat separate de microbenchmark-ul de compoziție sintetică. `scripts/perf/video-bridge-contact-sheet-eval.ts` definește un ham A/B versionat după schemă pentru modelele de viziune reale compatibile cu OpenAI. Măsoară token-urile raportate de furnizor, latența totală (inclusiv compoziția foii), numărul de apeluri de model și reținerea faptelor definite în manifest. Răspunsurile brute ale modelului nu sunt scrise în raport; sunt reținute doar digesturile SHA-256 și ID-urile faptelor potrivite. Hamul nu efectuează apeluri de rețea sau apeluri de model plătite decât dacă este transmis `--execute-real` și sunt configurate `--model`, `OMNIROUTE_BASE_URL` și `OMNIROUTE_API_KEY`. Fără acea rulare reală explicită, verdictul său lizibil de mașină rămâne `HOLD`; măsurătorile sintetice de sarcină utilă/număr de apeluri nu sunt singure dovezi de promovare.

Apelanții pot atașa un array opțional `transcript.cues` unei părți video suportate atunci când dețin deja text aliniat. Fiecare indiciu trebuie să conțină `text`, un interval finit `start`/`end` în cadrul duratei sondate și o `source` pe lista albă (`client`, `embedded` sau `audio-bridge`); `confidence` are valoarea implicită `1` și trebuie să rămână între `0` și `1`. Indiciile duplicate exacte sunt colapsate. OmniRoute nu începe niciodată transcrierea din aceste metadate: indiciile validate sunt copiate în rezultatul descris cu sursa, încrederea și intervalul, și sunt redate ca observații neîncrezătoare alături de subtitrările cadrelor. Textul invalid, în afara intervalului sau fără proveniență este respins, mai degrabă decât amestecat în fluxul de subtitrări. Câmpul `source` este în prezent declarat de apelant, nu verificat de server: OmniRoute impune ca valoarea să fie una dintre cele trei șiruri permise, dar nu confirmă încă criptografic că o etichetă `embedded` sau `audio-bridge` a provenit efectiv dintr-o extracție deținută de server. Tratați `source` ca pe un indiciu neîncrezător până la implementarea acelei verificări; nu construiți decizii de autorizare pe baza acestuia.

Un apelant avansat poate furniza o pistă `audioTranscript` deja autorizată pentru același videoclip. Fuziunea rulează observațiile vizuale și audio sub un singur termen limită și semnal de anulare, le ordonează pe o cronologie comună, colapsează duplicatele exacte și raportează un rezultat parțial atunci când doar o singură parte reușește. Un `audioTranscript` invalid degradează la acel rezultat parțial — descrierea vizuală este păstrată, iar ramura audio înregistrează un cod de eșec igienizat — în loc să eșueze întregul videoclip. Disponibilitatea pe ramură, indicatorul parțial și codurile de eșec igienizate sunt păstrate în rezultatul descris, în metadatele de siguranță (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), în metadatele cache-ului de rezultate și în contoarele de fuziune ale bridge-ului. Calea implicită Video Bridge nu invocă conversia vorbirii în text și nu descarcă o a doua copie media; fără acea pistă explicită, rămâne doar video.

**Retenția transcrierii (#12150 P1).** Aceasta se aplică automat ori de câte ori Video Bridge (care este opt-in) randează un indiciu de transcriere — nu există un indicator de retenție separat. Atunci când o cerere randează orice indiciu de transcriere (un `transcript` declarat de apelant sau un `audioTranscript` fuzionat), sistemul de siguranță îl marchează `videoBridgeObserved` și produce o umbră redactată a descrierii video — o redare identică în care corpul textului liber al fiecărui indiciu este înlocuit cu `[redacted-video-transcript]`, construit prin substituirea câmpului de indiciu structurat înainte ca șirul să fie asamblat (niciodată prin parsarea textului aplatizat, astfel încât niciun conținut de indiciu — adversar sau obișnuit, inclusiv corpuri care conțin `]` cum ar fi `[inaudible]`/`[music]` — nu poate supraviețui). Corpul cererii din jurnalul de apeluri persistat înlocuiește fiecare parte de text derivată din video cu acea umbră redactată, potrivită prin egalitatea conținutului; ancora `fullText` este recitită din sarcina utilă finalizată a sistemului de siguranță pre-apel, astfel încât potrivirea reușește chiar și după ce sistemele de siguranță ulterioare din lanț (mascările PII și ale credențialelor, prioritățile 10/95) rescriu textul descrierii pe loc și după ce injecția de prompt/transfer/memorie a sistemului remodelează matricea de mesaje. Corpul trimis în amonte către model rămâne neschimbat. O cerere observată nu populează, de asemenea, nicio Memorie durabilă (extracția derivată atât din cerere, cât și din răspuns este omisă), astfel încât propriul răspuns al modelului nu poate reproduce textul transcrierii în Memorie.

Copii suplimentare reținute utilizează același semnal de cerere observată. Instantaneul brut al cererii clientului pre-sistem de siguranță, cererea în așteptare în memorie și jurnalul de cereri respinse timpuriu înlocuiesc structural câmpurile de transcriere din părțile video; prompturile de șir sintetizate de etapele pipeline-ului și transferul de context sunt redactate la destinația corpului cererii persistate. Marcajul `video_content_removed` persistat face ca continuarea `previous_response_id` să eșueze închis, mai degrabă decât să reconstruiască textul care a fost intenționat eliminat. Dacă o cerere observată își pierde umbra de redactare per-parte înainte de înregistrare, sau chiar una dintre mai multe umbre video nu reușește să se potrivească după mutații ulterioare ale cererii, corpul cererii reținute este omis în întregime în loc să rețină o transcriere parțial redactată.

Pentru o cerere observată, un răspuns al modelului ar putea cita orice porțiune a transcrierii fără o limită de indiciu structurat. `responseBody`-ul său persistat din jurnalul de apeluri este, prin urmare, înlocuit cu un marcaj de omisiune; artefactul detaliat al pipeline-ului (care poate include corpuri upstream/client și fragmente de flux) nu este reținut. Cache-urile semantice, de idempotență și de reluare a raționamentului ocolesc citirile și scrierile pentru acea cerere. Cererea furnizorului și răspunsul vizibil pentru client rămân neschimbate. Byte-urile de keepalive timpurii sunt drenate din bufferul temporar atunci când artefactul detaliat este omis. Avertismentul Kiro pentru EventStream malformat raportează doar numărul de octeți ai sarcinii utile, niciodată conținutul său sau eroarea brută a parserului JSON. Aceasta nu pretinde că fiecare diagnostic necorelat al furnizorului/plugin-ului a fost auditat; scanarea mai amplă a destinației reținute este urmărită în #11658.

Ciclul de viață intern `/api/modality-bridge/video/drilldown` este un substrat de cache separat, cu buclă internă/autentificat prin token. Fiecare operațiune necesită, de asemenea, un ID principal opac canonic. Înainte ca un apelant de producție să fie activat, acesta trebuie să derive acel ID din chiriașul autentificat și nu trebuie să transmită niciodată o valoare selectată de client. Cheile cache-ului leagă acel principal de ID-uri canonice de sesiune și de referință video, stochează doar cheile lor derivate SHA-256 și limitează atât citirile, cât și ștergerile la același principal. Cache-ul stochează cel mult 16 cadre JPEG derivate per intrare, le expiră după zece minute și suportă citiri `start`/`end` delimitate sau ștergerea explicită a sesiunii.

Fiecare principal este limitat la 16 intrări și 64 MiB de date JPEG canonice. Aceste limite sunt independente de plafonul global de 64 de intrări/256 MiB: presiunea cotei principalului evacuează doar intrările cel mai puțin recent utilizate ale acelui principal înainte de a fi luată în considerare evacuarea globală LRU. Intrările expirate sunt eliminate atât din contabilitatea principalului, cât și din cea globală la activitatea cache-ului, în timp ce anularea și eșecul validării nu comit o înlocuire parțială.

Cache-ul respinge Base64 non-canonic, padding-ul în exces, media non-JPEG, JPEG-urile malformate sau trunchiate și JPEG-urile care produc un avertisment în timpul unei decodări `sharp` delimitate a imaginii complete. Re-codifică fiecare imagine acceptată ca un JPEG canonic, derivează lățimea și înălțimea din octeții decodați în loc să aibă încredere în câmpurile apelantului și elimină orice octeți poligloți de la sfârșit, în loc să-i rețină. Doar bufferul comprimat canonic delimitat este taxat ambelor cote. Limita de cablu JSON include suprasarcina Base64 pentru plafonul de intrare decodată de 32 MiB. Fiecare derivare stocată înregistrează formatul/rezoluția JPEG validată, politica de eșantionare, versiunea derivării, ora creării, hash-ul conținutului calculat de server și referința părinte hash-uită, plus hash-ul conținutului părinte al apelantului de încredere. Anularea este verificată între fazele asincrone de decodare/hash înainte de commit-ul atomic al cache-ului.

Această tranșă nu conectează încă un producător de producție la rută și nu
oferă selecție de variante multi-rezoluție. Calea transparentă de solicitare a
Video Bridge nu implică, prin urmare, nicio muncă suplimentară, în timp ce
derivarea principală legată de chiriaș și ciclul de viață complet multi-rezoluție
FU-08 rămân o muncă explicită de urmărire, mai degrabă decât un comportament
documentat ca fiind complet.

Cadrele sunt subtitrate secvențial cu modelul Video configurat. O suprascriere
Video goală moștenește setarea Vision; dacă ambele sunt goale, auto-routerul
Vision selectează modelul efectiv capabil de viziune. Subtitrările reușite
înlocuiesc partea originală cu un prefix stabil `[Video description:` care
marchează, de asemenea, textul ca o observație derivată din media, nesigură, și
spune modelelor din aval să nu urmeze instrucțiunile găsite în media. Cheile
cache pentru subtitrările cadrelor includ octeții JPEG, promptul, marcajul de
timp și modelul efectiv; doar subtitrările reușite sunt stocate în cache.
Intrările din cache rețin modelul producătorului real de succes, inclusiv un
model de rezervă; bridge-ul raportează `mixed` atunci când cadre diferite au
fost produse de modele diferite. O potrivire în cache reutilizează acea
identitate de producător în loc să o reeticheteze ca plan de rutare solicitat.
Cache-ul de rezultate pentru întregul videoclip este cheiat pe fiecare intrare
care modifică ieșirea — prompt, model efectiv, politică de eșantionare, număr
de cadre, mod de analiză semantică, amprenta SHA-256 a indiciului de focalizare
normalizat, fereastra de focalizare, `transcript`, `audioTranscript` și
indicatorul de foaie de contact — astfel încât modificarea oricăreia dintre
aceste dimensiuni este o ratare a cache-ului, niciodată o reutilizare învechită.
Versiunea politicii de dedublare vizuală, pragul și numărul limitat de cadre
candidate sunt, de asemenea, explicite în cheia cache-ului de rezultate și în
metadate; o modificare a politicii nu poate, prin urmare, reutiliza o descriere
învechită a întregului videoclip. Metadatele v4 ale cache-ului de rezultate
păstrează modul și amprenta, niciodată sarcina brută a utilizatorului.
Metadatele guardrail raportează atât modurile de analiză solicitate, cât și
cele efective; un mod `focused` solicitat fără text de utilizator utilizabil
este raportat ca fiind efectiv `full`.

Guardrail-ul extrage fiecare parte video suportată, dar descrie nu mai mult de
`modalityBridgeVideoMaxVideos`. Pentru o țintă dovedită a avea
`supportsVideo === false`, videoclipurile eșuate și cele care depășesc limita
devin markeri de text siguri expliciti, astfel încât niciun videoclip brut să nu
supraviețuiască. Când capacitatea este necunoscută, acele părți rămân
neatinse. Țintele cu `supportsVideo === true` ocolesc bridge-ul. Semnalul de
anulare a cererii clientului se propagă prin descărcare, coada brokerului,
subprocese și apeluri de subtitrare; anulările se opresc între videoclipuri și
nu eșuează niciodată deschis către media brută.

Setările de rulare sunt susținute de DB și validate cu Zod:

| Cheie                               | Valoare implicită | Interval / comportament                                                                                                  |
| :---------------------------------- | :---------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`           | Runtime opțional, activare explicită                                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`          | `full` păstrează subtitrările generice; `focused` utilizează contextul utilizatorului cel mai recent, limitat și nesigur |
| `modalityBridgeVideoModel`          | `""`              | Moștenește modelul Vision Bridge                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`               | 1–16                                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`       | `uniform`, `scene_aware`, sau `segment_aware` proporțional; eșecul detectorului revine la `uniform`                      |
| `modalityBridgeVideoMaxVideos`      | `1`               | 1–4                                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`          | 1000–120000 ms                                                                                                           |

Valorile de timeout Video persistate moștenite, peste 120 de secunde, sunt
limitate la termenul limită al brokerului; noile scrieri de setări peste acea
limită sunt respinse. `GET /api/modality-bridge/video/runtime` necesită
localitate loopback ștampilată de încredere înainte de autentificare sau
sondare la rulare, apoi necesită autentificare de management. Returnează doar
versiunile `available`, sanitizate FFmpeg/ffprobe și un motiv fix atunci când
runtime-ul nu este disponibil. Punctul final de extracție intern nu este un
API public de încărcare: saturația cozii returnează `503` plus `Retry-After`, o
deconectare a apelantului returnează `499`, iar termenul limită fix al
brokerului returnează `504`. Răspunsurile convertite adaugă
`video->text;model=<visionModel>;parts=<videos>` la antetul central
`x-omniroute-modality-bridge` fără a elimina segmentele Vision sau Audio.

### Mască PII (`piiMasker.ts`)

Rulează pe **ambele** etape.

- **`preCall`** clonează sarcina utilă, parcurge `system`, `messages`,
  `input` și `prompt` (inclusiv elementele șir simple) și aplică
  `processPII()` (din `@/shared/utils/inputSanitizer`) câmpurilor șir
  `content`/`text`. Când `PII_REDACTION_ENABLED=true`, PII-ul detectat este
  redactat în sarcina utilă de ieșire. Acest lucru este independent de
  `INPUT_SANITIZER_MODE` (care controlează doar politica de injectare a
  promptului). Când redactarea este dezactivată, apelul înregistrează
  numărul de detecții fără a rescrie conținutul.
- **`postCall`** clonează profund răspunsul, rulează `sanitizePIIResponse()`
  plus masca API-ului de răspunsuri (`maskResponsesOutput` — acoperă
  `output_text` și `output[].content[].text`). Dacă are loc vreo redactare,
  răspunsul modificat înlocuiește originalul.

Guardrail-ul nu blochează niciodată; doar adnotează (`meta.detections`,
`meta.redacted`) sau rescrie.

### Injectare Prompt (`promptInjection.ts`)

Detectează structuri adversare în conținutul furnizat de utilizator și aplică
politica configurată. Comportamentul este dictat de variabilele de mediu și
opțiunile constructorului:

| Setare          | Variabilă de mediu                                                                                      | Implicit | Efect                                                                                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                               | `true`   | Când este `false`, mecanismul de protecție face scurtcircuit (se dezactivează).                                                                                                                                               |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                         | `warn`   | Politică de injecție: `block`, `warn` sau `log`. (`redact` este acceptat pentru compatibilitate retroactivă, dar **nu** elimină textul de injecție; solicitarea de rescriere PII este controlată de `PII_REDACTION_ENABLED`.) |
| Prag de blocare | opțiunea `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Severitatea minimă necesară pentru blocare. Nivelul mediu este doar pentru observare în mod implicit.                                                                                                                         |

**Precedența modurilor** (`getMode`): `options.mode` al apelantului →
suprascriere prin **fanionul de funcționalitate din baza de date** `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → variabila de mediu `INJECTION_GUARD_MODE` → variabila de mediu `INPUT_SANITIZER_MODE` →
`warn`. Prin urmare, o suprascriere din panoul de control (dashboard) are întâietate față de variabilele de mediu, astfel încât interfața Feature Flags controlează garda în timp real (fără repornire). Citirea din baza de date este sigură în caz de eșec (fail-safe):
dacă apare o eroare, mecanismul revine la comportamentul bazat pe variabilele de mediu, iar când nu este setată nicio suprascriere, comportamentul este identic cu cel bazat exclusiv pe variabilele de mediu.

Surse de detecție:

1. `sanitizeRequest()` din `@/shared/utils/inputSanitizer` (set partajat de detectoare
   utilizat în altă parte în conductă / pipeline).
2. `DEFAULT_GUARD_PATTERNS` încorporate (în prezent `system_override_inline` și
   `markdown_system_block`, ambele cu severitate `high`).
3. `customPatterns` opționale transmise prin opțiunile constructorului (șiruri de caractere, expresii regulate sau
   înregistrări `{ name, pattern, severity }`).

Când `mode === "block"` **și** cel puțin o detecție atinge pragul de severitate, `preCall` returnează `{ block: true, message: "Request rejected:
suspicious content detected" }`. În modurile `warn`/`log`, mecanismul de protecție înregistrează în jurnal (log), dar
permite apelul. Funcția auxiliară partajată `evaluatePromptInjection()` este, de asemenea, exportată
pentru apelanții care trebuie să evalueze prompturile fără a trece prin registru.

**Limită de scanare (v3.8.20):** detectorul inspectează doar **primii 16 KB** din
textul de prompt concatenat — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 octeți) în
`src/shared/utils/inputSanitizer.ts`. Atât `detectInjection()`, cât și
`evaluatePromptInjection()` apelează `slice(0, MAX_INJECTION_SCAN_BYTES)` înainte de a rula
bucla de șabloane. Directivele de injecție se află în partea de sus a unei intrări, așa că acest lucru limitează consumul de CPU/GC al expresiilor regulate pentru sarcini utile de ordinul sutelor de KB, fără a slăbi detecția (cf.
#3932, #4041).

### Mascatorul de credențiale (`credentialMasker.ts`)

Rulează pe **ambele** etape, fiind ultimul în lanțul implicit (prioritate `95`). Redactează
șabloane cunoscute de chei API / token-uri secrete din payload-ul de ieșire (conținutul mesajului, argumentele apelului de instrument, rezultatele instrumentului) **și** din răspunsul furnizorului, astfel încât un credențial introdus într-un prompt (sau returnat de rezultatul unui instrument) să nu fie scurs către furnizorul din amonte sau înapoi la client.

- **Doar pe bază de înscriere (Opt-in)**, aceeași convenție ca și redactarea PII (adiacentă Regulei Stricte #20):
  dezactivat cu excepția cazului în care `settings.credentialRedactionEnabled === true` **sau**
  `CREDENTIAL_REDACTION_ENABLED=true`. Când este dezactivat, mecanismul de protecție nu face nimic —
  nu blochează niciodată și nu rescrie niciodată.
- `redactCredentials()` parcurge întregul arbore de payload/răspuns (`walkValue()`,
  sigur împotriva poluării prototipului, sigur împotriva ciclurilor prin `WeakSet`) și înlocuiește potrivirile cu
  un substituent `[REDACTED:<type>]`, clonând doar ramurile care s-au
  modificat efectiv.
- `CREDENTIAL_PATTERNS` acoperă chei ale furnizorilor LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token-uri VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chei de plată (Stripe, Square), chei cloud
  (cheie de acces AWS, Twilio, SendGrid, Mailgun), chei private / JWT-uri,
  șiruri de conexiune care conțin credențiale (`mongodb://user:pass@...` etc.) și
  un șablon generic pentru valoarea antetului `Authorization`/`x-api-key`/`api-key`/`apikey`. Cheile în formă de antet (`authorization`, `x-api-key`, `api-key`,
  `apikey`) sunt redactate structural (doar valoarea, prefixul schemei precum
  `Bearer `/`Basic ` fiind păstrat), mai degrabă decât prin expresia regulată text generică.
- Mecanismul de protecție nu blochează niciodată; el doar rescrie (`modifiedPayload` /
  `modifiedResponse`) și adnotează (`meta.credentialsRedacted`, `meta.count`).

Garda de regresie: `tests/unit/credential-masker-guardrail.test.ts`.

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
