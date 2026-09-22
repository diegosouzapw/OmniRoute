# CORS Configuration & Security (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute yana sarrafa waɗanne **asalan burauza** ne za su iya karanta amsoshin da suka fito daga wani asali
ta hanyar jerin izini guda ɗaya da aka tattara a wuri guda. Tsarin yana **ƙin ba da izini ta tsohuwa**:
ba a yarda da kowane asali ba har sai kun ƙara shi da kanku. Wannan shafin yana bayyana yadda jerin izinin
ke tantance asali, abin da `CORS_ALLOW_ALL=true` yake fallasawa a zahiri (da kuma, mafi muhimmanci, abin da
**ba ya** fallasawa), yadda ake saita yanayin haɓakawa da na samarwa cikin aminci, da gargaɗin lokacin aiki
da dashboard ke nunawa lokacin da wildcard yake aiki.

**Madogarar gaskiya:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Ana amfani da jerin izinin sau ɗaya ne kawai, a cikin
middleware (`src/server/authz/pipeline.ts`) — masu sarrafa kowane route ba sa saita
`Access-Control-Allow-Origin` da kansu.

## Yadda ake tantance asali

Ga kowace buƙata middleware yana ƙididdige ƙimar `Access-Control-Allow-Origin`
a wannan jeri:

1. **`CORS_ALLOW_ALL=true`** (ko tsohon `CORS_ORIGIN=*`) → mayar da
   `Origin` na mai kiran kamar yadda yake (ko `*` idan babu header na `Origin`), tare da `Vary: Origin`
   domin cache su ci gaba da aiki daidai. Wannan maƙurar `applyCorsHeaders()` ɗin kuma tana ƙara
   `Vary: Accept-Encoding` ga kowace amsar 2xx mai ɗauke da body a saman
   `/v1*`/`/v1beta*` da aka tabbatar da token (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), domin
   cache na ƙasa ko na bai ɗaya su iya bambance nau'ikan da aka matse da waɗanda ba a matse ba
   daidai.
2. In ba haka ba, ana daidaita `Origin` na buƙatar (a mai da shi ƙananan haruffa, a cire
   slash na ƙarshe) sannan a kwatanta shi da **haɗaɗɗen jerin izini**:
   - env **`CORS_ALLOWED_ORIGINS`** — jeri da aka raba da waƙafi, da kuma
   - saitin lokacin aiki na **`corsOrigins`** (Dashboard → Security → _CORS Allowed
     Origins_), wanda ake shigarwa ta `setRuntimeAllowedOrigins()` daga
     `src/lib/config/runtimeSettings.ts`.
3. Babu wanda ya dace → **ba a fitar da header na `Access-Control-Allow-Origin` ba**. Burauzar
   tana hana karatun da ya fito daga wani asali. Wannan shi ne tsarin ƙin ba da izini ta tsohuwa da aka nufa.

| Env var                | Ma'ana                                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV na takamaiman asalan da za a ba izini (shawarar da aka fi so).                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → mayar da kowane asali kamar yadda yake (wildcard). Don dev kawai.          |
| `CORS_ORIGIN`          | Tsoho. `*` yana aiki kamar `CORS_ALLOW_ALL`; ana ƙara ƙima guda ɗaya cikin jerin izini. |

## Samfurin barazana — abin da `CORS_ALLOW_ALL=true` yake fallasawa a zahiri

Ya dace a ɗauki gargaɗin OWASP na gaba ɗaya ("wildcard CORS = kowane shafi zai iya kiran API ɗinka")
da muhimmanci, amma abin da OmniRoute ke fallasawa ya **fi ƙuntata fiye da yanayin gama-gari**,
saboda wani takamaiman tsarin aiwatarwa:

> **Babban `applyCorsHeaders()` ba ya taɓa fitar da
> `Access-Control-Allow-Credentials`.** Burauza ba za ta nuna amsar da aka yi wa _tabbatar da shaida_
> (mai ɗauke da cookie) daga wani asali ba sai uwar garken ta aika
> `Access-Control-Allow-Credentials: true`. Hanyar CORS ta bai ɗaya ta OmniRoute ba ta taɓa
> yin haka.

Ga abin da wannan ke nufi a kowane surface, ko da `CORS_ALLOW_ALL=true`:

| Surface                                 | Hanyar auth                    | Tasirin wildcard CORS                                                                                                                                                                                                                                 |
| --------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`         | Zaman cookie                   | Ana mayar da asalin, amma **ba tare da `Allow-Credentials` ba** burauzar tana **hana** karatun da ke da shaida. Shafin mugunta daga wani asali **ba zai iya karanta** amsoshin dashboard ɗinku da aka tabbatar ba, kuma ba a fallasa cookie na zaman. |
| Client API `/v1/*`, `/v1beta/*`         | Header na Bearer / `x-api-key` | Tuni yana da sassauci **da gangan** (`relaxForTokenAuth`): burauzoci ba sa haɗa `Authorization`/`x-api-key` kai tsaye, don haka shafin maharin ba zai iya samar da key ɗinku ba. `CORS_ALLOW_ALL` ba ya faɗaɗa wannan.                                |
| Karatun jama'a kawai (`/api/health`, …) | Babu                           | Ba mai muhimmanci ba ne; wildcard ba shi da illa.                                                                                                                                                                                                     |

Saboda haka, fallasar da ta **rage** daga `CORS_ALLOW_ALL=true` ta taƙaita ne ga: (a)
karatun da ba ya ɗauke da shaida daga wani asali na bayanan da tun farko ba sa buƙatar auth, da (b)
barin CORS **preflight ya wuce** a routes na gudanarwa — waɗanda har yanzu suke buƙatar auth
wanda shafi daga wani asali ba zai iya bayarwa ba. Wannan **ba** hanya ce ta sace zaman mai amfani ko
satar bayanan shaida a hanyar CORS ta bai ɗaya ba.

### Keɓantaccen yanayi guda ɗaya na gaske — `/api/v1/agents/`

Routes na Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) suna saita
headers na CORS **nasu**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) kuma **suna** fitar da
`Access-Control-Allow-Origin: <origin>|*` tare da
`Access-Control-Allow-Credentials: true`. Wannan shi ne surface guda ɗaya inda
mayar da asali da credentials suke tare, kuma **ba ya dogara da
`CORS_ALLOW_ALL`**. Waɗannan routes suna buƙatar auth na gudanarwa
(`requireManagementAuth`); ya kamata masu gudanarwa da suke fallasa dashboard a wajen host su
sani cewa wannan ne wuri guda ɗaya da headers na amsa suke ba da damar karatu mai shaida daga
wani asali. Ana bin diddigin ƙuntata shi zuwa takamaiman jerin izini
dabam da wannan jagorar CORS.

## Jerin dubawa na samarwa

- **Kada ka taɓa saita `CORS_ALLOW_ALL=true` a yanayin samarwa.** Bar shi ba a saita ba.
- Saita jerin asali na **takamaimai** — ko dai ta env var ko filin shafin Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Idan OmniRoute yana gudana a bayan reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **ba** shi ne kawai tsarin kariyarka ba — kariyar hanyar
  loopback har yanzu tana kare hanyoyin da za su iya ƙaddamar da tsari (duba
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Kada ka ƙirƙiri
  `X-Forwarded-For: 127.0.0.1` na bogi don "gyara" kuskuren 403; yin hakan yana sake buɗe nau'in RCE da
  kariyar hanyar take rufewa.
- Tabbatar da halin lokacin aiki: dashboard yana nuna **tutar gargaɗi ta amber mai ɗorewa**
  a ƙarƙashin Dashboard → Security → Authorization Inventory duk lokacin da
  `CORS_ALLOW_ALL=true` ke aiki, sannan `/api/settings/authz-inventory` yana dawo da
  kunshin `cors: { allowAll, allowedOrigins }` wanda kayan aikin sa ido za su iya bincikawa lokaci-lokaci.

## Sauƙin haɓakawa — ba da izini ga takamaiman asalan gida

Da wuya ka buƙaci wildcard ko da a yanayin haɓakawa. Ba da izini ga sabar haɓakawa da kake amfani da su kawai:

```bash
# Sabar haɓakawa na Vite (5173) + Next.js (3000) suna kiran OmniRoute na gida
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Ana daidaita asali ba tare da la’akari da bambancin manyan da ƙananan haruffa ba, tare da yin watsi da slash na ƙarshe, don haka
`http://localhost:3000` da `http://localhost:3000/` daidai suke. Haka kuma ana iya
saita CSV ɗin a lokacin aiki a **Dashboard → Security → CORS Allowed Origins** ba tare da
sake kunnawa ba.

## Maɓallan API da zaman cookie

- **Bearer / `x-api-key` (farfajiyar inference ta `/v1/*`):** browsers ba sa haɗa
  waɗannan ta atomatik. CORS ba katanga mai ma’ana ba ce a nan — maɓallin API ne
  katangar — shi ya sa aka tsara wannan farfajiya ta zama mai sassauci domin browser da
  Electron clients su iya karanta amsoshin da suke da haƙƙin samu.
- **Zaman cookie (dashboard):** ana kiyaye shi ta tsohuwar ƙa’idar rufewa idan an gaza **da kuma**
  rashin `Access-Control-Allow-Credentials` a kan hanyar da ake amfani da ita tare. Kada ka saka
  asalan gudanarwa/dashboard a cikin wani saitin sassauci; dole su ci gaba da kasancewa
  a rufe idan an gaza.

## Misali: reverse proxy a gaban OmniRoute

OmniRoute da kansa ne ke tilasta CORS, don haka gabaɗaya bai kamata proxy ya ƙara ko
sake rubuta headers na `Access-Control-*` ba (headers biyu suna hana browsers aiki). Ƙare TLS
sannan ka tura buƙatar — bari OmniRoute ya amsa preflight:

```nginx
# nginx — tura zuwa OmniRoute; KADA KA saka Access-Control-* a nan
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # KADA KA saita X-Forwarded-For zuwa 127.0.0.1 — hakan yana karya kariyar hanyar loopback.
}
```

Saita asalan browser da aka amince da su a cikin OmniRoute (`CORS_ALLOWED_ORIGINS` ko
shafin Security), ba a cikin proxy ba.

## Fayilolin tushe

| Abin da ya shafa                                 | Fayil                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Tantance allowlist + `getCorsStatus()`           | `src/server/cors/origins.ts`                                         |
| Aiwatar da middleware (tushe guda na gaskiya)    | `src/server/authz/pipeline.ts`                                       |
| Settings → saka asali na lokacin aiki            | `src/lib/config/runtimeSettings.ts`                                  |
| Matsayin lokacin aiki don dashboard              | `src/app/api/settings/authz-inventory/route.ts`                      |
| Tutar gargaɗin dashboard                         | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Filin CORS Allowed Origins                       | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS na kowace hanya na Cloud-Agent (keɓantacce) | `src/lib/cloudAgent/api.ts`                                          |

## Duba kuma

- [Matakan Kariyar Hanya](./ROUTE_GUARD_TIERS.md) — tilasta amfani da loopback ga
  hanyoyin da ke iya spawn (wani iko na daban, mai taimakawa).
- [Jagorar Izini](../architecture/AUTHZ_GUIDE.md) — cikakken tsarin auth.
