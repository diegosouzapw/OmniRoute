# CORS Configuration & Security (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

Kinokontrol ng OmniRoute kung aling mga **origin ng browser** ang maaaring bumasa ng mga cross-origin na tugon
mula sa iisang sentralisadong allowlist. Ang modelo ay **fail-closed bilang default**:
walang origin na pinapayagan hangga't hindi mo ito tahasang isinasama. Idinodokumento ng pahinang ito kung paano
nireresolba ang allowlist, kung ano talaga ang inilalantad ng `CORS_ALLOW_ALL=true` (at, mahalaga, kung ano ang
**hindi** nito inilalantad), kung paano ligtas na i-configure ang development kumpara sa production, at ang runtime warning
na ipinapakita ng dashboard kapag aktibo ang wildcard.

**Pinagmumulan ng katotohanan:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Isang beses lang inilalapat ang allowlist, sa
middleware (`src/server/authz/pipeline.ts`) — hindi mismong itinatakda ng mga per-route handler ang
`Access-Control-Allow-Origin`.

## Paano nireresolba ang isang origin

Para sa bawat request, kinukuwenta ng middleware ang value ng `Access-Control-Allow-Origin`
sa ganitong pagkakasunod-sunod:

1. **`CORS_ALLOW_ALL=true`** (o ang legacy na `CORS_ORIGIN=*`) → ibalik bilang echo ang
   `Origin` ng tumatawag (o `*` kapag walang `Origin` header), kasama ang `Vary: Origin`
   upang manatiling tama ang mga cache. Idinaragdag din ng parehong `applyCorsHeaders()` chokepoint
   ang `Vary: Accept-Encoding` sa bawat 2xx-with-body na tugon sa token-authenticated na
   `/v1*`/`/v1beta*` surface (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), upang
   wastong matukoy ng mga downstream/shared cache ang pagkakaiba ng mga compressed at uncompressed
   na variant.
2. Kung hindi, ino-normalize ang `Origin` ng request (ginagawang lowercase at
   inaalis ang trailing slash) at itinutugma sa **pinagsamang allowlist**:
   - env **`CORS_ALLOWED_ORIGINS`** — listahang pinaghihiwalay ng kuwit, at
   - ang runtime na **`corsOrigins`** setting (Dashboard → Security → _Mga Pinapayagang
     Origin ng CORS_), na ini-inject sa pamamagitan ng `setRuntimeAllowedOrigins()` mula sa
     `src/lib/config/runtimeSettings.ts`.
3. Walang tugma → **walang inilalabas na `Access-Control-Allow-Origin` header**. Bina-block ng browser
   ang cross-origin na pagbasa. Ito ang nilalayong fail-closed na default.

| Env var                | Kahulugan                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV ng mga eksaktong origin na papayagan (inirerekomenda).                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → i-echo ang anumang origin (wildcard). Para lang sa dev.                             |
| `CORS_ORIGIN`          | Legacy. Ang `*` ay gumagana tulad ng `CORS_ALLOW_ALL`; idinaragdag sa allowlist ang isang value. |

## Modelo ng banta — kung ano talaga ang inilalantad ng `CORS_ALLOW_ALL=true`

Mahalagang seryosohin ang pangkalahatang babala ng OWASP ("wildcard CORS = maaaring tawagin ng anumang site ang iyong API"),
ngunit ang exposure ng OmniRoute ay **mas limitado kaysa sa pangkalahatang kaso**,
dahil sa isang kongkretong katotohanan ng implementasyon:

> **Hindi kailanman naglalabas ang sentral na `applyCorsHeaders()` ng
> `Access-Control-Allow-Credentials`.** Hindi ilalantad ng browser ang isang _credentialed_
> (may dalang cookie) na cross-origin na tugon maliban kung nagpapadala ang server ng
> `Access-Control-Allow-Credentials: true`. Hindi ito kailanman ginagawa ng shared CORS path
> ng OmniRoute.

Narito ang kahulugan nito sa bawat surface, kahit may `CORS_ALLOW_ALL=true`:

| Surface                             | Mekanismo ng auth           | Epekto ng wildcard CORS                                                                                                                                                                                                                                               |
| ----------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`     | Cookie session              | Ini-echo ang origin, ngunit **kung walang `Allow-Credentials`**, **bina-block** ng browser ang credentialed na pagbasa. **Hindi mababasa** ng mapaminsalang cross-origin site ang iyong mga authenticated dashboard response, at hindi nalalantad ang session cookie. |
| Client API `/v1/*`, `/v1beta/*`     | Bearer / `x-api-key` header | Permissive na ito **ayon sa disenyo** (`relaxForTokenAuth`): hindi awtomatikong inilalakip ng mga browser ang `Authorization`/`x-api-key`, kaya hindi maibibigay ng page ng attacker ang iyong key. Hindi ito pinalalawak ng `CORS_ALLOW_ALL`.                        |
| Public read-only (`/api/health`, …) | Wala                        | Hindi sensitibo; hindi nakapipinsala ang wildcard.                                                                                                                                                                                                                    |

Kaya ang **natitirang** exposure ng `CORS_ALLOW_ALL=true` ay limitado sa: (a)
mga non-credentialed na cross-origin na **pagbasa** ng data na una pa lang ay unauthenticated na, at (b)
pagpapahintulot na **makapasa ang preflight** ng CORS sa mga management route — na nangangailangan pa rin ng auth
na hindi maibibigay ng isang cross-origin page. **Hindi** ito isang vector para sa pag-hijack ng session o
pagnanakaw ng credential sa shared CORS path.

### Isang tunay na exception — `/api/v1/agents/`

Itinatakda ng mga Cloud-Agent route (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ang
sarili nilang mga CORS header
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) at **naglalabas** ang mga ito ng
`Access-Control-Allow-Origin: <origin>|*` kasama ang
`Access-Control-Allow-Credentials: true`. Ito ang nag-iisang surface kung saan
magkasabay ang origin-echo at mga credential, at **hindi ito nakadepende sa
`CORS_ALLOW_ALL`**. Management-authenticated ang mga route na ito
(`requireManagementAuth`); dapat malaman ng mga operator na naglalantad ng dashboard sa labas ng host
na ito ang nag-iisang lugar kung saan pinahihintulutan ng mga response header ang isang cross-origin na credentialed na pagbasa.
Ang paghihigpit dito sa isang tahasang allowlist ay hiwalay na sinusubaybayan
mula sa gabay na ito tungkol sa CORS.

## Checklist para sa produksiyon

- **Huwag kailanman itakda ang `CORS_ALLOW_ALL=true` sa produksiyon.** Hayaan itong hindi nakatakda.
- Magtakda ng **tahasang** listahan ng mga origin — alinman sa env var o sa field ng tab na Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Kung tumatakbo ang OmniRoute sa likod ng reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), **hindi** lamang CORS ang iyong kontrol — pinoprotektahan pa rin ng
  loopback route guard ang mga route na maaaring mag-spawn (tingnan ang
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Huwag palsipikahin ang
  `X-Forwarded-For: 127.0.0.1` upang "ayusin" ang 403; muli nitong binubuksan ang klase ng
  RCE na isinasara ng route guard.
- Kumpirmahin ang runtime state: nagpapakita ang dashboard ng **palagiang amber na banner**
  sa ilalim ng Dashboard → Security → Authorization Inventory kapag aktibo ang
  `CORS_ALLOW_ALL=true`, at nagbabalik ang `/api/settings/authz-inventory` ng
  `cors: { allowAll, allowedOrigins }` envelope na maaaring i-poll ng mga monitoring tool.

## Kaginhawaan sa development — payagan ang mga partikular na lokal na origin

Bihira mong kailanganin ang wildcard kahit sa dev. Payagan lamang ang mga dev server na ginagamit mo:

```bash
# Mga dev server ng Vite (5173) + Next.js (3000) na tumatawag sa lokal na OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Itinutugma ang mga origin nang hindi isinasaalang-alang ang laki o liit ng titik at binabalewala
ang trailing slash, kaya magkatumbas ang `http://localhost:3000` at
`http://localhost:3000/`. Maaari ring itakda ang parehong CSV sa runtime sa
**Dashboard → Security → CORS Allowed Origins** nang hindi nagre-restart.

## Mga API key kumpara sa mga cookie session

- **Bearer / `x-api-key` (ang `/v1/*` inference surface):** hindi kailanman awtomatikong
  inilalakip ng mga browser ang mga ito. Hindi makabuluhang hadlang ang CORS dito — ang API key
  ang hadlang — kaya sadyang permissive ang surface na iyon upang mabasa ng mga browser at
  Electron client ang mga tugon na mayroon na silang karapatang ma-access.
- **Cookie session (ang dashboard):** pinoprotektahan ng fail-closed na default **at**
  ng kawalan ng `Access-Control-Allow-Credentials` sa shared path. Huwag isama ang mga
  origin ng management/dashboard sa anumang permissive na config; dapat manatiling ganap na
  fail-closed ang mga ito.

## Halimbawa: reverse proxy sa harap ng OmniRoute

Ang CORS ay ipinapatupad mismo ng OmniRoute, kaya karaniwang **hindi** dapat magdagdag o
magsulat muli ang proxy ng mga `Access-Control-*` header (sinisira ng dobleng header ang mga
browser). Tapusin ang TLS at i-forward — hayaang OmniRoute ang sumagot sa preflight:

```nginx
# nginx — i-forward sa OmniRoute; HUWAG mag-inject ng Access-Control-* dito
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # HUWAG itakda ang X-Forwarded-For sa 127.0.0.1 — pinawawalang-saysay nito ang loopback route guard.
}
```

Itakda ang mga pinapayagang browser origin sa OmniRoute (`CORS_ALLOWED_ORIGINS` o ang
tab na Security), hindi sa proxy.

## Mga source file

| Usapin                                            | File                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| Pagresolba ng allowlist + `getCorsStatus()`       | `src/server/cors/origins.ts`                                         |
| Paglalapat ng middleware (iisang source of truth) | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime origin injection               | `src/lib/config/runtimeSettings.ts`                                  |
| Runtime status para sa dashboard                  | `src/app/api/settings/authz-inventory/route.ts`                      |
| Warning banner ng dashboard                       | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Field na CORS Allowed Origins                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Per-route CORS ng Cloud-Agent (ang eksepsiyon)    | `src/lib/cloudAgent/api.ts`                                          |

## Tingnan din

- [Mga Antas ng Route Guard](./ROUTE_GUARD_TIERS.md) — pagpapatupad ng loopback para sa
  mga route na may kakayahang mag-spawn (isang hiwalay at komplementaryong kontrol).
- [Gabay sa Awtorisasyon](../architecture/AUTHZ_GUIDE.md) — ang kumpletong pipeline ng awtorisasyon.
