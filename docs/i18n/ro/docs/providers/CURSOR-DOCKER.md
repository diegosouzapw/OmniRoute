# Cursor Provider in Docker Environments (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Când OmniRoute rulează în Docker, fluxurile vechi **Import din Cursor IDE** /
`cursor-agent` eșuează deoarece containerul nu poate vedea instalarea Cursor de
pe gazdă. Folosiți în schimb **Autentificare cu Cursor** (PKCE deep-control).

## De ce importul din IDE / CLI eșuează în Docker

1. **Izolarea sistemului de fișiere** — Importul automat caută căi Linux precum
   `~/.config/Cursor/User/globalStorage/state.vscdb` _în interiorul_ containerului.
   În Docker Desktop pentru macOS, baza de date a IDE-ului de pe gazdă nu este
   montată implicit, iar sistemul de operare al containerului este Linux chiar
   și atunci când gazda este Darwin.
2. **Lipsește binarul `cursor-agent`** — Imaginile oficiale OmniRoute nu includ
   `cursor-agent`. Anterior, Modelele disponibile executau
   `cursor-agent --list-models` și reveneau la un catalog static în caz de eșec.
3. **Binar greșit** — **Nu** montați prin bind un `cursor-agent` pentru macOS
   într-un container Linux. Acesta nu va putea fi executat.

## Recomandare: Autentificare cu Cursor

1. Deschideți **Panou de control → Furnizori → Cursor**.
2. Selectați fila **Autentificare cu Cursor**.
3. Faceți clic pe **Autentificare cu Cursor** — OmniRoute deschide
   `https://cursor.com/loginDeepControl?…` în browserul de pe **gazdă**.
4. Aprobați autentificarea în browser, apoi reveniți la panoul de control.
   OmniRoute interoghează periodic `api2.cursor.sh/auth/poll` până la primirea
   tokenurilor.
5. OmniRoute stochează tokenurile de **acces + reîmprospătare** și le
   reîmprospătează prin `https://api2.cursor.sh/auth/exchange_user_api_key`.

Această metodă nu necesită Cursor IDE sau `cursor-agent` în interiorul
containerului.

## Descoperirea modelelor

Cu o conexiune autentificată, **Modele disponibile / Sincronizare automată**
preferă catalogul HTTP `AiService/AvailableModels` al Cursor, utilizând tokenul
bearer al conexiunii. Dacă această metodă eșuează, OmniRoute încearcă în
continuare `cursor-agent` de pe gazdă (când este prezent), apoi datele inițiale
din registrul static.

OmniRoute expune întotdeauna **`auto`** în catalog (afișat drept „Auto”), plus
modurile de rutare în stil OpenCodex **`auto-cost`**, **`auto-balance`** și
**`auto-intelligence`**. La nivelul protocolului, acestea sunt mapate la modelul
`default` al Cursor (cu un `ModelParameter` `optimization` pentru cele trei
variante). Preferați `cu/auto` când utilizarea modelelor premium este epuizată —
Auto are adesea încă buget disponibil.

### Catalogul live este exclusiv după sincronizare

După o sincronizare reușită a modelelor Cursor (`cursor-agent --list-models` →
catalog sincronizat persistent sau preluarea autentificată prin bearer a
`AvailableModels` de mai sus), **panoul de control**, **`/v1/models`** și
**Testează tot** afișează:

1. Modelele returnate de sincronizarea live
2. ID-urile injectate ale routerului automat: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Modelele **personalizate** ale operatorului (Import / manual) — nu sunt
   eliminate niciodată prin sincronizare

Registrul static extins din
`open-sse/config/providers/registry/cursor/` este **doar o soluție de rezervă
offline**. Când lista sincronizată este goală (sau descoperirea eșuează),
listarea revine la acel registru.

ID-urile cu sufix de efort (de exemplu `claude-4.6-sonnet-high`) pot fi în
continuare **solicitate** în timpul rulării: `resolveRequestedModel` elimină
sufixul și îl transformă într-un `ModelParameter` transmis prin protocol.
Listarea exclusivă ascunde în mod intenționat acele variante statice din
Testează tot, astfel încât verificările să corespundă modelelor pe care Cursor
le returnează efectiv ca fiind disponibile.

### Funcții auxiliare

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — îmbinarea din panoul de control
- `ensureCursorAutoCatalogEntry` — injectarea auto* la descoperire + listare
- `shouldSuppressStaticModelForExclusiveListing` — bucla statică `/v1/models`

## Limitele furnizorului (cotă)

**Utilizare → Limitele furnizorului** pentru Cursor folosește API-uri Bearer de
pe `api2.cursor.sh` (`GetCurrentPeriodUsage` → rezumatul utilizării →
auth/usage) după PKCE sau importul tokenurilor. Metoda veche bazată pe cookie și
panoul `cursor.com` rămâne o ultimă soluție de rezervă pentru sesiunile mai
vechi importate din IDE.

Ferestrele includ de obicei **Total**, **Auto + Composer** și **API**. Dacă
limitele apar goale, executați din nou **Autentificare cu Cursor** sau
reimportați tokenurile (importul exclusiv din IDE nu mai este necesar).

## Răspunsuri goale / utilizare epuizată

Când Cursor acceptă o rulare, dar nu returnează text de la asistent (situație
frecventă când utilizarea premium este epuizată), OmniRoute afișează o eroare
**429** relevantă (indicii privind cota) sau **502** cu îndrumări — nu doar
„Furnizorul a returnat conținut gol”. Erorile de streaming precum
`not_found: AI Model Not Found` (fereastra de utilizare epuizată) sunt
clasificate drept **limită de rată Cursor / utilizare depășită**, iar mesajul
este păstrat în întregul flux SSE (mecanismul comun de protecție împotriva
fluxurilor goale nu suprascrie o eroare deja emisă). Verificați Limitele
furnizorului, încercați modelul **`auto`** sau măriți limitele abonamentului
Cursor.

## Versiunea clientului (fără interfață grafică)

Fără o instalare locală `cursor-agent`, OmniRoute determină
`x-cursor-client-version` prin variabila de mediu `CURSOR_AGENT_CLI_VERSION`,
apoi printr-o extragere stocată în cache pe disc din scriptul de instalare
Cursor și, în final, printr-un ID de versiune fixat. Suprascrieți valoarea cu
`CURSOR_AGENT_CLI_VERSION` atunci când este necesar.

## Soluție de rezervă: Importul manual al tokenurilor

Dacă nu puteți finaliza autentificarea în browser:

1. Pe gazdă, extrageți tokenurile din `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Deschideți **Import token** în fereastra modală de autentificare Cursor.
3. Inserați **Tokenul de acces** și, când este disponibil, **Tokenul de
   reîmprospătare** (necesar pentru reîmprospătarea automată). ID-ul mașinii este
   opțional.

Importurile care conțin doar tokenul de acces funcționează în continuare, dar
vor expira fără un token de reîmprospătare — reimportați-l atunci când chatul
returnează erori de autentificare.

## Resurse conexe

- Îndrumări Zed pentru Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referință externă pentru autentificarea Cursor în OpenCodex:
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
