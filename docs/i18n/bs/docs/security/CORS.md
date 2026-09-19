# CORS (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

# CORS konfiguracija i sigurnost

OmniRoute kontroliše koja **porijekla preglednika (browser origins)** mogu čitati cross-origin odgovore iz jedinstvene, centralizovane liste dozvoljenih (allowlist). Model je **podrazumijevano zatvoren (fail-closed)**: nijedno porijeklo nije dozvoljeno dok ga sami ne omogućite. Ova stranica dokumentuje kako se lista dozvoljenih razrješava, šta `CORS_ALLOW_ALL=true` zapravo izlaže (i, što je važno, šta **ne** izlaže), kako sigurno konfigurisati razvojno naspram produkcijskog okruženja, te upozorenje o runtime-u koje kontrolna tabla (dashboard) prikazuje kada je wildcard aktivan.

**Izvor istine:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Lista dozvoljenih se primjenjuje jednom, u middleware-u (`src/server/authz/pipeline.ts`) — rukovaoci po rutama (per-route handlers) ne postavljaju `Access-Control-Allow-Origin` sami.

## Kako se razrješava porijeklo

Za svaki zahtjev, middleware izračunava vrijednost `Access-Control-Allow-Origin` ovim redoslijedom:

1. **`CORS_ALLOW_ALL=true`** (ili naslijeđeni `CORS_ORIGIN=*`) → vraća `Origin` pozivaoca (ili `*` kada ne postoji `Origin` zaglavlje), uz `Vary: Origin` kako bi keševi ostali ispravni. Ista `applyCorsHeaders()` kontrolna tačka također dodaje `Vary: Accept-Encoding` svakom 2xx-with-body odgovoru na površini autentifikovanoj tokenom `/v1*`/`/v1beta*` (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), tako da downstream/dijeljeni keševi mogu ispravno razlikovati komprimovane od nekomprimovanih varijanti.
2. U suprotnom, `Origin` zahtjeva se normalizuje (pretvara u mala slova, uklanja se završna kosa crta) i upoređuje sa **spojenom listom dozvoljenih**:
   - env **`CORS_ALLOWED_ORIGINS`** — lista razdvojena zarezima, i
   - runtime postavka **`corsOrigins`** (Dashboard → Security → _CORS Allowed Origins_), ubačena putem `setRuntimeAllowedOrigins()` iz `src/lib/config/runtimeSettings.ts`.
3. Nema podudaranja → **ne emituje se `Access-Control-Allow-Origin` zaglavlje**. Preglednik blokira cross-origin čitanje. Ovo je namjerna podrazumijevana postavka zatvorenog pristupa (fail-closed).

| Env varijabla          | Značenje                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV tačnih porijekla koja treba dozvoliti (preporučeno).                                          |
| `CORS_ALLOW_ALL`       | `true`/`1` → vraća bilo koje porijeklo (wildcard). Samo za razvoj.                                |
| `CORS_ORIGIN`          | Naslijeđeno. `*` se ponaša kao `CORS_ALLOW_ALL`; jedna vrijednost se dodaje na listu dozvoljenih. |

## Model prijetnji — šta `CORS_ALLOW_ALL=true` zapravo izlaže

Generičko OWASP upozorenje ("wildcard CORS = bilo koja stranica može pozvati vaš API") vrijedi shvatiti ozbiljno, ali izloženost OmniRoute-a je **uža od generičkog slučaja**, zbog jedne konkretne činjenice implementacije:

> **Centralna `applyCorsHeaders()` nikada ne emituje `Access-Control-Allow-Credentials`.** Preglednik neće izložiti _credentialed_ (koji sadrži kolačiće) cross-origin odgovor osim ako server ne pošalje `Access-Control-Allow-Credentials: true`. OmniRoute-ova dijeljena CORS putanja to nikada ne radi.

Šta to znači po površini, čak i sa `CORS_ALLOW_ALL=true`:

| Površina                                 | Mehanizam autentifikacije      | Efekat wildcard CORS-a                                                                                                                                                                                                                |
| ---------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kontrolna tabla / UPRAVLJANJE `/api/*`   | Sesija kolačića                | Porijeklo se vraća, ali **bez `Allow-Credentials`** preglednik **blokira** credentialed čitanje. Zlonamjerna cross-origin stranica **ne može čitati** vaše autentifikovane odgovore kontrolne table, a sesijski kolačić nije izložen. |
| Klijentski API `/v1/*`, `/v1beta/*`      | Bearer / `x-api-key` zaglavlje | Već permisivno **po dizajnu** (`relaxForTokenAuth`): preglednici nikada automatski ne prilažu `Authorization`/`x-api-key`, tako da stranica napadača ne može dostaviti vaš ključ. `CORS_ALLOW_ALL` ovo ne proširuje.                  |
| Javni samo za čitanje (`/api/health`, …) | Nijedan                        | Nije osjetljivo; wildcard je bezopasan.                                                                                                                                                                                               |

Dakle, **rezidualna** izloženost `CORS_ALLOW_ALL=true` je ograničena na: (a) ne-credentialed cross-origin **čitanja** već neautentifikovanih podataka, i (b) omogućavanje prolaska CORS **preflight-a** na upravljačkim rutama — koje i dalje zahtijevaju autentifikaciju koju cross-origin stranica ne može pružiti. To **nije** vektor za otmicu sesije ili krađu vjerodajnica na dijeljenoj CORS putanji.

### Jedan pravi izuzetak — `/api/v1/agents/`

Cloud-Agent rute (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) postavljaju svoja **vlastita** CORS zaglavlja (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) i **emituju** `Access-Control-Allow-Origin: <origin>|*` zajedno sa `Access-Control-Allow-Credentials: true`. Ovo je jedina površina gdje koegzistiraju vraćanje porijekla (origin-echo) i vjerodajnice, i to je **nezavisno od `CORS_ALLOW_ALL`**. Ove rute su autentifikovane upravljačkom autentifikacijom (`requireManagementAuth`); operateri koji izlažu kontrolnu tablu van hosta trebaju biti svjesni da je ovo jedino mjesto gdje je cross-origin credentialed čitanje dozvoljeno zaglavljima odgovora. Pooštravanje ovoga na eksplicitnu listu dozvoljenih prati se odvojeno od ovih CORS smjernica.

## Kontrolna lista za produkciju

- **Nikada ne postavljajte `CORS_ALLOW_ALL=true` u produkciji.** Ostavite je nepostavljenom.
- Postavite **eksplicitnu** listu porijekla (origin) — bilo putem varijable okruženja ili polja na kartici Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ako se OmniRoute pokreće iza reverznog proxyja / tunela (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS **nije** vaša jedina kontrola — loopback route guard i dalje štiti rute sposobne za pokretanje (pogledajte [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Nemojte krivotvoriti `X-Forwarded-For: 127.0.0.1` da biste "popravili" 403 grešku; to ponovo otvara RCE klasu koju route guard zatvara.
- Potvrdite stanje tokom izvršavanja (runtime state): kontrolna tabla prikazuje **trajni žuti baner** pod Dashboard → Security → Authorization Inventory kad god je `CORS_ALLOW_ALL=true` aktivan, a `/api/settings/authz-inventory` vraća `cors: { allowAll, allowedOrigins }` omotnicu koju alati za nadzor mogu ispitivati (poll).

## Pogodnost za razvoj — dozvolite specifična lokalna porijekla

Rijetko vam je potreban wildcard čak i u razvoju. Dozvolite samo razvojne servere koje koristite:

```bash
# Vite (5173) + Next.js (3000) razvojni serveri koji pozivaju lokalni OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Porijekla se podudaraju bez obzira na velika/mala slova, a završna kosa crta (trailing slash) se zanemaruje, tako da su `http://localhost:3000` i `http://localhost:3000/` ekvivalentni. Isti CSV se može postaviti tokom izvršavanja u **Dashboard → Security → CORS Allowed Origins** bez ponovnog pokretanja.

## API ključevi naspram sesija kolačića (cookie sessions)

- **Bearer / `x-api-key` (površina za zaključivanje `/v1/*`):** pretraživači ih nikada ne prilažu automatski. CORS ovdje nije značajna barijera — API ključ je barijera — zbog čega je ta površina namjerno permisivna kako bi pretraživači i Electron klijenti mogli čitati odgovore na koje već imaju pravo.
- **Sesija kolačića (kontrolna tabla):** zaštićena je podrazumijevanim "fail-closed" ponašanjem **i** odsustvom `Access-Control-Allow-Credentials` na dijeljenoj putanji. Držite porijekla za upravljanje/kontrolnu tablu izvan bilo kakve permisivne konfiguracije; ona moraju ostati strogo "fail-closed".

## Primjer: reverzni proxy ispred OmniRoute-a

CORS provodi sam OmniRoute, tako da proxy generalno **ne** bi trebao dodavati ili prepisivati `Access-Control-*` zaglavlja (dvostruka zaglavlja uzrokuju greške u pretraživačima). Terminirajte TLS i proslijedite dalje — pustite OmniRoute da odgovori na preflight zahtjev:

```nginx
# nginx — proslijedi na OmniRoute; NE ubacuj Access-Control-* ovdje
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NE postavljaj X-Forwarded-For na 127.0.0.1 — to onemogućava loopback route guard.
}
```

Postavite dozvoljena porijekla pretraživača u OmniRoute-u (`CORS_ALLOWED_ORIGINS` ili kartica Security), a ne u proxyju.

## Izvorni fajlovi

| Oblast                                            | Fajl                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Razrješenje liste dozvoljenih + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Primjena middleware-a (jedini izvor istine)       | `src/server/authz/pipeline.ts`                                       |
| Postavke → ubacivanje porijekla tokom izvršavanja | `src/lib/config/runtimeSettings.ts`                                  |
| Status tokom izvršavanja za kontrolnu tablu       | `src/app/api/settings/authz-inventory/route.ts`                      |
| Baner upozorenja na kontrolnoj tabli              | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Polje CORS Allowed Origins                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent CORS po ruti (izuzetak)               | `src/lib/cloudAgent/api.ts`                                          |

## Vidi također

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback provođenje za rute koje podržavaju spawn (zasebna, komplementarna kontrola).
- [Vodič za autorizaciju](../architecture/AUTHZ_GUIDE.md) — cjelokupni auth pipeline.
