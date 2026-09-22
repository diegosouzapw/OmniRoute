# CORS Configuration & Security (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute na-achịkwa **isi mmalite ihe nchọgharị** ndị nwere ike ịgụ nzaghachi sitere n’isi mmalite ọzọ site na otu ndepụta ikike etiti. Ụdị a bụ **imechi ma ọ bụrụ na e nyeghị ikike na ndabara**:
anaghị ekwe isi mmalite ọ bụla ruo mgbe i tinyere ya n’ime ndị e nyere ikike. Ibe a na-akọwa etu e si ekpebi ndepụta ikike ahụ,
ihe `CORS_ALLOW_ALL=true` na-eme ka ọ pụta ìhè n’ezie (na, nke dị mkpa, ihe ọ
**na-adịghị** eme ka ọ pụta ìhè), etu e si ahazi gburugburu mmepe na mmepụta n’enweghị nsogbu, yana ịdọ aka ná ntị n’oge ọsọ
nke dashboard na-egosi mgbe wildcard nọ n’ọrụ.

**Ebe eziokwu sitere:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). A na-etinye ndepụta ikike ahụ otu ugboro, n’ime
middleware (`src/server/authz/pipeline.ts`) — ndị na-ahụ maka route n’otu n’otu anaghị edobe
`Access-Control-Allow-Origin` n’onwe ha.

## Etu e si ekpebi isi mmalite

Maka arịrịọ ọ bụla, middleware na-agbakọ uru `Access-Control-Allow-Origin`
n’usoro a:

1. **`CORS_ALLOW_ALL=true`** (ma ọ bụ `CORS_ORIGIN=*` ochie) → zighachi `Origin` nke onye kpọrọ
   ya (ma ọ bụ `*` mgbe header `Origin` adịghị), tinyere `Vary: Origin`
   ka cache wee nọgide na-arụ ọrụ nke ọma. Otu ebe njikwa `applyCorsHeaders()` ahụ na-agbakwụnyekwa
   `Vary: Accept-Encoding` na nzaghachi ọ bụla nke bụ 2xx ma nwee body n’elu interface
   `/v1*`/`/v1beta*` nke token na-eme nyocha njirimara ya (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), ka
   cache ndị dị n’okpuru ma ọ bụ ndị a na-ekekọrịta nwee ike ịmata nke ọma ọdịiche dị n’etiti ụdị
   e tinyere mkpakọ na nke a na-etinyeghị mkpakọ.
2. Ma ọ bụghị ya, a na-eme ka `Origin` nke arịrịọ bụrụ otu ụdị (tụgharịa ya ka ọ bụrụ mkpụrụedemede nta, wepụ slash
   dị n’azụ) ma tụnyere ya na **ndepụta ikike ejikọtara ọnụ**:
   - env **`CORS_ALLOWED_ORIGINS`** — ndepụta e ji kọma kewaa, na
   - ntọala **`corsOrigins`** nke oge ọsọ (Dashboard → Security → _Isi Mmalite Ndị CORS
     Kwere_), nke `setRuntimeAllowedOrigins()` si na
     `src/lib/config/runtimeSettings.ts` tinye.
3. Enweghị ihe dabara → **anaghị ewepụta header `Access-Control-Allow-Origin` ọ bụla**. Ihe nchọgharị
   na-egbochi ịgụ sitere n’isi mmalite ọzọ. Nke a bụ omume ndabara e bu n’obi nke na-emechi ma ọ bụrụ na e nyeghị ikike.

| Env var                | Ihe ọ pụtara                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV nke isi mmalite kpọmkwem a ga-ekwe (nke akwadoro).                                     |
| `CORS_ALLOW_ALL`       | `true`/`1` → zighachi isi mmalite ọ bụla (wildcard). Maka mmepe naanị.                     |
| `CORS_ORIGIN`          | Nke ochie. `*` na-arụ ọrụ dịka `CORS_ALLOW_ALL`; a na-agbakwunye otu uru na ndepụta ikike. |

## Ụdị iyi egwu — ihe `CORS_ALLOW_ALL=true` na-eme ka ọ pụta ìhè n’ezie

Ịdọ aka ná ntị OWASP izugbe ("wildcard CORS = saịtị ọ bụla nwere ike ịkpọ API gị") kwesịrị
ka e were ya nke ọma, mana ihe OmniRoute na-eme ka ọ pụta ìhè **pere mpe karịa ọnọdụ izugbe**,
n’ihi otu eziokwu doro anya gbasara mmejuputa ya:

> **`applyCorsHeaders()` etiti anaghị ewepụta
> `Access-Control-Allow-Credentials` ma ọlị.** Ihe nchọgharị agaghị eme ka nzaghachi sitere n’isi mmalite ọzọ nke _nwere nzere_
> (nke nwere cookie) dị maka ịgụ ma ọ bụrụ na sava ezipụghị
> `Access-Control-Allow-Credentials: true`. Ụzọ CORS nkịtị nke OmniRoute anaghị
> eme nke ahụ.

Ihe nke ahụ pụtara n’elu interface ọ bụla, ọbụna mgbe `CORS_ALLOW_ALL=true`:

| Interface                           | Usoro nyocha njirimara      | Mmetụta wildcard CORS                                                                                                                                                                                                                                                 |
| ----------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`     | Oge njikọ cookie            | A na-ezighachi isi mmalite ahụ, mana **n’enweghị `Allow-Credentials`** ihe nchọgharị na-**egbochi** ịgụ nwere nzere. Saịtị ọjọọ sitere n’isi mmalite ọzọ **enweghị ike ịgụ** nzaghachi dashboard gị a nyochara njirimara ya, a naghịkwa ekpughe cookie oge njikọ ahụ. |
| Client API `/v1/*`, `/v1beta/*`     | Header Bearer / `x-api-key` | Ọ dịlarị mfe ịnweta **site na nhazi** (`relaxForTokenAuth`): ihe nchọgharị anaghị etinye `Authorization`/`x-api-key` na-akpaghị aka, ya mere ibe onye na-awakpo enweghị ike iweta key gị. `CORS_ALLOW_ALL` anaghị eme ka nke a gbasaa.                                |
| Ọha na-agụ naanị (`/api/health`, …) | Ọ dịghị                     | Ọ bụghị ozi nwere mmetụta; wildcard adịghị emerụ ahụ.                                                                                                                                                                                                                 |

Ya mere, mkpughe **fọdụrụ** nke `CORS_ALLOW_ALL=true` nwere oke naanị na: (a)
ịgụ sitere n’isi mmalite ọzọ **na-enweghị nzere** nke data na-achọghị nyocha njirimara, na (b)
ikwe ka **preflight CORS gafere** na route njikwa — nke ka na-achọ nyocha njirimara
nke ibe sitere n’isi mmalite ọzọ na-enweghị ike inye. Ọ **abụghị** ụzọ iji zuo oge njikọ ma ọ bụ
nzere n’ụzọ CORS nkịtị ahụ.

### Otu ezigbo mwepu — `/api/v1/agents/`

Route Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) na-edobe
header CORS **nke ha**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ma **na-ewepụta**
`Access-Control-Allow-Origin: <origin>|*` tinyere
`Access-Control-Allow-Credentials: true`. Nke a bụ naanị interface ebe
izighachi isi mmalite na nzere na-adịkọ ọnụ, ọ **dabereghị na
`CORS_ALLOW_ALL`**. A na-eji njikwa eme nyocha njirimara nke route ndị a
(`requireManagementAuth`); ndị ọrụ na-eme ka dashboard dị n’èzí host kwesịrị
ịma na nke a bụ naanị ebe header nzaghachi na-ekwe ka a gụọ nzaghachi nwere nzere site n’isi mmalite ọzọ.
A na-enyocha ime ka ọ sie ike site n’iji ndepụta ikike doro anya
iche na ntuziaka CORS a.

## Ndepụta nyocha maka production

- **Edokwala `CORS_ALLOW_ALL=true` na production.** Hapụ ya n’enweghị nhazi.
- Tọọ ndepụta origin **kpọmkwem** — ma ọ bụ site na env var ma ọ bụ mpaghara dị na taabụ Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ọ bụrụ na OmniRoute na-arụ ọrụ n’azụ reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **abụghị** naanị njikwa nche gị — ihe nchebe loopback route
  ka na-echebe route ndị nwere ike ịmalite usoro (lee
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Emepụtala
  `X-Forwarded-For: 127.0.0.1` adịgboroja iji “dozie” 403; nke ahụ ga-emepeghachi ụdị RCE nke
  route guard mechiri.
- Kwenye ọnọdụ runtime: dashboard na-egosi **ọkọlọtọ amber na-adịgide adịgide**
  n’okpuru Dashboard → Security → Authorization Inventory mgbe ọ bụla
  `CORS_ALLOW_ALL=true` na-arụ ọrụ, ebe `/api/settings/authz-inventory` na-eweghachi
  envelopu `cors: { allowAll, allowedOrigins }` nke ngwaọrụ nlekota nwere ike ịjụ mgbe niile.

## Mfe maka development — kwe ka origin local ndị akọwapụtara

Ọbụna na dev, wildcard anaghị adịkarị mkpa. Kwe naanị dev server ndị ị na-eji:

```bash
# Dev server Vite (5173) + Next.js (3000) na-akpọ OmniRoute local
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

A na-atụnyere origin n’agbanyeghị mkpụrụedemede ukwu ma ọ bụ nta, a na-elegharakwa slash dị n’azụ anya, ya mere
`http://localhost:3000` na `http://localhost:3000/` bụ otu ihe. Enwere ike ịtọ otu CSV ahụ
n’oge runtime na **Dashboard → Security → CORS Allowed Origins** n’enweghị
restart.

## API key ma e jiri ya tụnyere cookie session

- **Bearer / `x-api-key` (elu inference `/v1/*`):** browser anaghị etinye
  ihe ndị a n’onwe ya. CORS abụghị ihe mgbochi bara uru ebe a — API key bụ
  ihe mgbochi ahụ — ọ bụkwa ya mere e ji kpachapụ anya mee ka elu ahụ nabata ọtụtụ origin ka browser na
  Electron client nwee ike ịgụ response ndị ha nwere ikike inweta.
- **Cookie session (dashboard):** ndabara **fail-closed** na
  enweghị `Access-Control-Allow-Credentials` n’ụzọ a na-ekekọrịta na-echebe ya. Etinyela
  origin management/dashboard na config ọ bụla na-enye ohere sara mbara; ha ga-anọrịrị kpọmkwem
  n’ọnọdụ fail-closed.

## Ọmụmaatụ: reverse proxy dị n’ihu OmniRoute

OmniRoute n’onwe ya na-amanye CORS, ya mere proxy ekwesịghịkarị **ịtinye** ma ọ bụ
idegharị header `Access-Control-*` (header abụọ na-emebi ọrụ browser). Kwụsị TLS
ma zipụ arịrịọ ahụ n’ihu — hapụ OmniRoute ka ọ zaa preflight:

```nginx
# nginx — zipụ n’ihu gaa OmniRoute; etinyela Access-Control-* ebe a
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Atọkwala X-Forwarded-For ka ọ bụrụ 127.0.0.1 — ọ na-emebi ihe nchebe loopback route.
}
```

Tọọ origin browser ndị e kwere na OmniRoute (`CORS_ALLOWED_ORIGINS` ma ọ bụ
taabụ Security), ọ bụghị na proxy.

## Faịlụ source

| Ihe metụtara                                 | Faịlụ                                                                |
| -------------------------------------------- | -------------------------------------------------------------------- |
| Mkpebi allowlist + `getCorsStatus()`         | `src/server/cors/origins.ts`                                         |
| Itinye middleware n’ọrụ (otu isi eziokwu)    | `src/server/authz/pipeline.ts`                                       |
| Settings → itinye origin n’ime runtime       | `src/lib/config/runtimeSettings.ts`                                  |
| Ọnọdụ runtime maka dashboard                 | `src/app/api/settings/authz-inventory/route.ts`                      |
| Ọkọlọtọ ịdọ aka ná ntị nke dashboard         | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Mpaghara CORS Allowed Origins                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS kwa route nke Cloud-Agent (ihe dị iche) | `src/lib/cloudAgent/api.ts`                                          |

## Hụkwa

- [Ọkwa Nchedo Route](./ROUTE_GUARD_TIERS.md) — mmanye loopback maka
  route ndị nwere ike ime spawn (njikwa dị iche ma na-emeju nke ọzọ).
- [Ntuziaka Ikike Nnweta](../architecture/AUTHZ_GUIDE.md) — usoro auth zuru ezu.
