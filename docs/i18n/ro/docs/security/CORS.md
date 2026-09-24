# CORS Configuration & Security (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute controlează ce **origini ale browserului** pot citi răspunsurile între origini
printr-o singură listă centralizată de permisiuni. Modelul este **închis implicit în caz de eșec**:
nicio origine nu este permisă până când nu o autorizați explicit. Această pagină documentează modul în care este
evaluată lista de permisiuni, ce expune de fapt `CORS_ALLOW_ALL=true` (și, aspect important, ce
**nu** expune), cum să configurați în siguranță mediile de dezvoltare și de producție și avertismentul din timpul execuției
pe care îl afișează panoul de control atunci când este activ un wildcard.

**Sursa adevărului:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Lista de permisiuni este aplicată o singură dată, în
middleware (`src/server/authz/pipeline.ts`) — gestionarii rutelor individuale nu setează ei înșiși
`Access-Control-Allow-Origin`.

## Cum este evaluată o origine

Pentru fiecare solicitare, middleware-ul calculează valoarea `Access-Control-Allow-Origin`
în această ordine:

1. **`CORS_ALLOW_ALL=true`** (sau opțiunea moștenită `CORS_ORIGIN=*`) → returnează originea
   `Origin` a apelantului (sau `*` atunci când antetul `Origin` lipsește), împreună cu `Vary: Origin`,
   astfel încât cache-urile să rămână corecte. Același punct unic de control `applyCorsHeaders()` adaugă și
   `Vary: Accept-Encoding` la fiecare răspuns 2xx cu corp de pe suprafața
   `/v1*`/`/v1beta*` autentificată prin token (`relaxForTokenAuth`, RFC 9110 §12.5.5, problema #6737), astfel încât
   cache-urile din aval/partajate să poată distinge corect variantele comprimate de cele necomprimate.
2. În caz contrar, valoarea `Origin` a solicitării este normalizată (transformată în litere mici, cu bara oblică
   finală eliminată) și comparată cu **lista de permisiuni combinată**:
   - variabila de mediu **`CORS_ALLOWED_ORIGINS`** — listă separată prin virgule și
   - setarea din timpul execuției **`corsOrigins`** (Panou de control → Securitate → _Origini
     CORS permise_), injectată prin `setRuntimeAllowedOrigins()` din
     `src/lib/config/runtimeSettings.ts`.
3. Nicio potrivire → **nu este emis niciun antet `Access-Control-Allow-Origin`**. Browserul
   blochează citirea între origini. Acesta este comportamentul implicit intenționat, închis în caz de eșec.

| Variabilă de mediu     | Semnificație                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Listă CSV de origini exacte care trebuie permise (recomandat).                                                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → returnează orice origine (wildcard). Numai pentru dezvoltare.                                          |
| `CORS_ORIGIN`          | Opțiune moștenită. `*` se comportă precum `CORS_ALLOW_ALL`; o singură valoare este adăugată în lista de permisiuni. |

## Modelul de amenințări — ce expune cu adevărat `CORS_ALLOW_ALL=true`

Avertismentul generic OWASP („CORS cu wildcard = orice site vă poate apela API-ul”) merită
luat în serios, însă expunerea OmniRoute este **mai restrânsă decât în cazul generic**,
datorită unui aspect concret al implementării:

> **Funcția centrală `applyCorsHeaders()` nu emite niciodată
> `Access-Control-Allow-Credentials`.** Un browser nu va expune un răspuns între origini
> _cu credențiale_ (care conține cookie-uri), cu excepția cazului în care serverul trimite
> `Access-Control-Allow-Credentials: true`. Calea CORS partajată a OmniRoute nu face
> niciodată acest lucru.

Iată ce înseamnă acest lucru pentru fiecare suprafață, chiar și cu `CORS_ALLOW_ALL=true`:

| Suprafață                                      | Mecanism de autentificare  | Efectul CORS cu wildcard                                                                                                                                                                                                                                        |
| ---------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Panou de control / MANAGEMENT `/api/*`         | Sesiune prin cookie        | Originea este returnată, dar **fără `Allow-Credentials`** browserul **blochează** citirea cu credențiale. Un site rău intenționat de altă origine **nu poate citi** răspunsurile autentificate ale panoului de control, iar cookie-ul de sesiune nu este expus. |
| API client `/v1/*`, `/v1beta/*`                | Antet Bearer / `x-api-key` | Este deja permisiv **prin proiectare** (`relaxForTokenAuth`): browserele nu atașează niciodată automat `Authorization`/`x-api-key`, astfel încât pagina unui atacator nu poate furniza cheia dvs. `CORS_ALLOW_ALL` nu extinde această expunere.                 |
| Acces public doar în citire (`/api/health`, …) | Niciunul                   | Date nesensibile; wildcard-ul este inofensiv.                                                                                                                                                                                                                   |

Prin urmare, expunerea **reziduală** a `CORS_ALLOW_ALL=true` este limitată la: (a)
**citiri** între origini fără credențiale ale unor date deja neautentificate și (b)
permiterea reușitei solicitărilor CORS **preflight** pe rutele de administrare — care necesită în continuare o autentificare
pe care o pagină de altă origine nu o poate furniza. Aceasta **nu** reprezintă un vector pentru deturnarea sesiunii sau
furtul credențialelor pe calea CORS partajată.

### O singură excepție reală — `/api/v1/agents/`

Rutele Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) își setează
**propriile** anteturi CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) și **emit**
`Access-Control-Allow-Origin: <origin>|*` împreună cu
`Access-Control-Allow-Credentials: true`. Aceasta este singura suprafață unde
returnarea originii și credențialele coexistă și este **independentă de
`CORS_ALLOW_ALL`**. Aceste rute sunt autentificate pentru administrare
(`requireManagementAuth`); operatorii care expun panoul de control în afara gazdei trebuie să
știe că acesta este singurul loc în care anteturile răspunsului permit o citire cu credențiale
între origini. Restrângerea acesteia la o listă explicită de permisiuni este urmărită
separat de aceste recomandări CORS.

## Listă de verificare pentru producție

- **Nu setați niciodată `CORS_ALLOW_ALL=true` în producție.** Lăsați variabila nesetată.
- Setați o listă **explicită** de origini — fie prin variabila de mediu, fie prin câmpul din fila Securitate:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Dacă OmniRoute rulează în spatele unui proxy invers / tunel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **nu** este singurul mecanism de control — protecția rutelor
  loopback continuă să protejeze rutele capabile să lanseze procese (consultați
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Nu falsificați
  `X-Forwarded-For: 127.0.0.1` pentru a „remedia” o eroare 403; acest lucru redeschide clasa de vulnerabilități RCE pe care
  protecția rutelor o blochează.
- Confirmați starea la rulare: tabloul de bord afișează un **banner galben persistent**
  în Tablou de bord → Securitate → Inventar de autorizare ori de câte ori
  `CORS_ALLOW_ALL=true` este activ, iar `/api/settings/authz-inventory` returnează o
  structură `cors: { allowAll, allowedOrigins }` pe care instrumentele de monitorizare o pot interoga.

## Comoditate în dezvoltare — permiteți anumite origini locale

Rareori aveți nevoie de wildcard chiar și în dezvoltare. Permiteți doar serverele de dezvoltare pe care le utilizați:

```bash
# Serverele de dezvoltare Vite (5173) + Next.js (3000) care apelează un OmniRoute local
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Originile sunt comparate fără a ține cont de majuscule și minuscule, iar bara oblică finală este ignorată, astfel încât
`http://localhost:3000` și `http://localhost:3000/` sunt echivalente. Același CSV
poate fi setat în timpul rulării în **Tablou de bord → Securitate → Origini CORS permise**, fără
repornire.

## Chei API vs sesiuni bazate pe cookie-uri

- **Bearer / `x-api-key` (suprafața de inferență `/v1/*`):** browserele nu atașează
  niciodată automat aceste valori. CORS nu reprezintă o barieră relevantă aici — cheia API este
  bariera — motiv pentru care această suprafață este intenționat permisivă, astfel încât clienții pentru browser și
  Electron să poată citi răspunsurile la care au deja dreptul.
- **Sesiune bazată pe cookie-uri (tabloul de bord):** protejată de valoarea implicită care blochează accesul **și**
  de absența `Access-Control-Allow-Credentials` pe traseul comun. Nu includeți
  originile de administrare/ale tabloului de bord în nicio configurație permisivă; acestea trebuie să rămână strict
  blocate în mod implicit.

## Exemplu: proxy invers în fața OmniRoute

CORS este aplicat de OmniRoute însuși, astfel încât, în general, proxy-ul **nu** ar trebui să adauge sau
să rescrie anteturile `Access-Control-*` (anteturile duplicate nu funcționează în browsere). Terminați TLS
și redirecționați traficul — permiteți OmniRoute să răspundă la cererile preflight:

```nginx
# nginx — redirecționează către OmniRoute; NU injectați Access-Control-* aici
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NU setați X-Forwarded-For la 127.0.0.1 — acest lucru anulează protecția rutelor loopback.
}
```

Setați originile de browser permise în OmniRoute (`CORS_ALLOWED_ORIGINS` sau fila
Securitate), nu în proxy.

## Fișiere sursă

| Aspect                                              | Fișier                                                               |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| Rezolvarea listei de permisiuni + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Aplicarea middleware-ului (sursa unică de adevăr)   | `src/server/authz/pipeline.ts`                                       |
| Setări → injectarea originilor la rulare            | `src/lib/config/runtimeSettings.ts`                                  |
| Starea la rulare pentru tabloul de bord             | `src/app/api/settings/authz-inventory/route.ts`                      |
| Bannerul de avertizare din tabloul de bord          | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Câmpul Origini CORS permise                         | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS per rută pentru Cloud-Agent (excepția)         | `src/lib/cloudAgent/api.ts`                                          |

## Consultați și

- [Niveluri de protecție a rutelor](./ROUTE_GUARD_TIERS.md) — aplicarea restricției de loopback pentru
  rutele capabile să genereze procese (un mecanism de control separat și complementar).
- [Ghid de autorizare](../architecture/AUTHZ_GUIDE.md) — fluxul complet de autentificare și autorizare.
