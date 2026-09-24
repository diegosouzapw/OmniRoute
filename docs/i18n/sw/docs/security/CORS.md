# CORS Configuration & Security (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute hudhibiti ni **asili zipi za kivinjari** zinazoweza kusoma majibu kutoka asili tofauti
kutoka kwenye orodha moja ya ruhusa inayosimamiwa kwa pamoja. Muundo huu **huzuia kila kitu kwa chaguo-msingi**:
hakuna asili inayoruhusiwa hadi uiongeze mwenyewe. Ukurasa huu unaeleza jinsi orodha ya ruhusa
inavyotatuliwa, kile ambacho `CORS_ALLOW_ALL=true` hufichua kwa hakika (na, muhimu zaidi, kile ambacho
**haifichui**), jinsi ya kusanidi mazingira ya usanidi dhidi ya uzalishaji kwa usalama, na onyo la wakati wa utekelezaji
ambalo dashibodi huonyesha wakati wildcard inatumika.

**Chanzo cha ukweli:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Orodha ya ruhusa hutumika mara moja, katika
middleware (`src/server/authz/pipeline.ts`) — vishughulikiaji vya kila route haviweki
`Access-Control-Allow-Origin` vyenyewe.

## Jinsi asili inavyotatuliwa

Kwa kila ombi, middleware huhesabu thamani ya `Access-Control-Allow-Origin`
kwa mpangilio huu:

1. **`CORS_ALLOW_ALL=true`** (au `CORS_ORIGIN=*` ya zamani) → rudisha `Origin` ya mwombaji
   (au `*` wakati hakuna header ya `Origin`), pamoja na `Vary: Origin`
   ili cache ziendelee kuwa sahihi. Sehemu hiyo hiyo ya udhibiti ya `applyCorsHeaders()` pia huongeza
   `Vary: Accept-Encoding` kwenye kila jibu la 2xx lenye body katika sehemu ya
   `/v1*`/`/v1beta*` iliyothibitishwa kwa tokeni (`relaxForTokenAuth`, RFC 9110 §12.5.5, suala #6737), ili
   cache za chini ya mfumo/zinazoshirikiwa ziweze kutofautisha kwa usahihi
   matoleo yaliyobanwa dhidi ya yasiyobanwa.
2. Vinginevyo, `Origin` ya ombi husawazishwa (hubadilishwa kuwa herufi ndogo, slash ya mwisho
   huondolewa) na kulinganishwa dhidi ya **orodha ya ruhusa iliyounganishwa**:
   - env **`CORS_ALLOWED_ORIGINS`** — orodha iliyotenganishwa kwa koma, na
   - mpangilio wa wakati wa utekelezaji wa **`corsOrigins`** (Dashibodi → Usalama → _Asili Zinazoruhusiwa na
     CORS_), unaoingizwa kupitia `setRuntimeAllowedOrigins()` kutoka
     `src/lib/config/runtimeSettings.ts`.
3. Hakuna inayolingana → **hakuna header ya `Access-Control-Allow-Origin` inayotolewa**. Kivinjari
   huzuia usomaji kutoka asili tofauti. Hii ndiyo hali iliyokusudiwa ya kuzuia kila kitu kwa chaguo-msingi.

| Kigezo cha env         | Maana                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV ya asili kamili za kuruhusu (inapendekezwa).                                                   |
| `CORS_ALLOW_ALL`       | `true`/`1` → rudisha asili yoyote (wildcard). Kwa usanidi pekee.                                   |
| `CORS_ORIGIN`          | Ya zamani. `*` hufanya kazi kama `CORS_ALLOW_ALL`; thamani moja huongezwa kwenye orodha ya ruhusa. |

## Muundo wa vitisho — kile ambacho `CORS_ALLOW_ALL=true` hufichua kwa hakika

Onyo la jumla la OWASP ("wildcard CORS = tovuti yoyote inaweza kuita API yako") linastahili
kuchukuliwa kwa uzito, lakini ufichuzi wa OmniRoute ni **finyu zaidi kuliko hali ya jumla**,
kwa sababu ya ukweli mmoja mahususi wa utekelezaji:

> **`applyCorsHeaders()` ya kati haitoi kamwe
> `Access-Control-Allow-Credentials`.** Kivinjari hakitafichua jibu la asili tofauti
> _lenye vitambulisho_ (lenye cookie) isipokuwa seva itume
> `Access-Control-Allow-Credentials: true`. Njia ya pamoja ya CORS ya OmniRoute haifanyi
> hivyo kamwe.

Hivi ndivyo inavyomaanisha kwa kila sehemu, hata ikiwa `CORS_ALLOW_ALL=true`:

| Sehemu                                     | Utaratibu wa uthibitishaji     | Athari ya wildcard CORS                                                                                                                                                                                                                 |
| ------------------------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashibodi / MANAGEMENT `/api/*`            | Kipindi cha cookie             | Asili hurudishwa, lakini **bila `Allow-Credentials`** kivinjari **huzuia** usomaji wenye vitambulisho. Tovuti hasidi ya asili tofauti **haiwezi kusoma** majibu yako ya dashibodi yaliyothibitishwa, na cookie ya kipindi haifichuliwi. |
| API ya mteja `/v1/*`, `/v1beta/*`          | Header ya Bearer / `x-api-key` | Tayari inaruhusu **kwa makusudi** (`relaxForTokenAuth`): vivinjari haviambatishi `Authorization`/`x-api-key` kiotomatiki, kwa hivyo ukurasa wa mshambulizi hauwezi kutoa ufunguo wako. `CORS_ALLOW_ALL` haipanui hili.                  |
| Ya umma ya kusoma pekee (`/api/health`, …) | Hakuna                         | Si nyeti; wildcard haina madhara.                                                                                                                                                                                                       |

Kwa hivyo, ufichuzi **uliobaki** wa `CORS_ALLOW_ALL=true` unaishia kwenye: (a)
**usomaji** wa asili tofauti usio na vitambulisho wa data ambayo tayari haikuhitaji uthibitishaji, na (b)
kuruhusu **preflight ya CORS ipite** kwenye route za usimamizi — ambazo bado zinahitaji uthibitishaji
ambao ukurasa wa asili tofauti hauwezi kutoa. Hii **si** njia ya kuteka kipindi au
kuiba vitambulisho kwenye njia ya pamoja ya CORS.

### Isipokuwa moja halisi — `/api/v1/agents/`

Route za Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) huweka
header zao **wenyewe** za CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) na **hutoa**
`Access-Control-Allow-Origin: <origin>|*` pamoja na
`Access-Control-Allow-Credentials: true`. Hii ndiyo sehemu pekee ambapo
kurudisha asili na vitambulisho hutokea pamoja, na **haitegemei
`CORS_ALLOW_ALL`**. Route hizi zimethibitishwa kwa usimamizi
(`requireManagementAuth`); waendeshaji wanaofichua dashibodi nje ya host wanapaswa
kufahamu kuwa hapa ndipo mahali pekee ambapo usomaji wa asili tofauti wenye vitambulisho unaruhusiwa na
header za jibu. Kuibana kwa kutumia orodha dhahiri ya ruhusa kunafuatiliwa
kando na mwongozo huu wa CORS.

## Orodha ya ukaguzi wa uzalishaji

- **Kamwe usiweke `CORS_ALLOW_ALL=true` katika mazingira ya uzalishaji.** Iache bila kuwekwa.
- Weka orodha **bayana** ya vyanzo — ama kupitia env var au sehemu ya kichupo cha Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ikiwa OmniRoute inaendeshwa nyuma ya reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **si** udhibiti wako pekee — kilinzi cha route ya loopback
  bado hulinda route zenye uwezo wa kuanzisha michakato (angalia
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Usighushi
  `X-Forwarded-For: 127.0.0.1` ili "kurekebisha" hitilafu ya 403; kufanya hivyo hufungua tena aina ya RCE ambayo
  kilinzi cha route huizuia.
- Thibitisha hali ya wakati wa utekelezaji: dashibodi huonyesha **bango la kudumu la kaharabu**
  chini ya Dashboard → Security → Authorization Inventory wakati wowote ambapo
  `CORS_ALLOW_ALL=true` inatumika, na `/api/settings/authz-inventory` hurejesha
  muundo wa `cors: { allowAll, allowedOrigins }` ambao zana za ufuatiliaji zinaweza kukagua mara kwa mara.

## Urahisi wa usanidi — ruhusu vyanzo mahususi vya ndani

Huhitaji wildcard mara nyingi hata katika mazingira ya usanidi. Ruhusu seva za usanidi unazotumia pekee:

```bash
# Seva za usanidi za Vite (5173) + Next.js (3000) zinazowasiliana na OmniRoute ya ndani
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Vyanzo hulinganishwa bila kujali herufi kubwa au ndogo huku alama ya mwisho ya slash ikipuuzwa, kwa hivyo
`http://localhost:3000` na `http://localhost:3000/` ni sawa. CSV hiyo hiyo
inaweza kuwekwa wakati wa utekelezaji katika **Dashboard → Security → CORS Allowed Origins** bila
kuanzisha upya.

## Funguo za API dhidi ya vipindi vya cookie

- **Bearer / `x-api-key` (sehemu ya inference ya `/v1/*`):** vivinjari haviambatanishi
  hivi kiotomatiki kamwe. CORS si kizuizi chenye maana hapa — ufunguo wa API ndio
  kizuizi — na ndiyo sababu sehemu hiyo imeruhusiwa kimakusudi ili wateja wa kivinjari na
  Electron waweze kusoma majibu ambayo tayari wana haki ya kuyapata.
- **Kipindi cha cookie (dashibodi):** hulindwa na chaguo-msingi linalokataa ufikiaji **na**
  kwa kutokuwepo kwa `Access-Control-Allow-Credentials` kwenye njia inayoshirikiwa. Usiweke
  vyanzo vya usimamizi/dashibodi katika usanidi wowote unaoruhusu kwa upana; ni lazima viendelee
  kukataa ufikiaji kikamilifu.

## Mfano: reverse proxy mbele ya OmniRoute

CORS hutekelezwa na OmniRoute yenyewe, kwa hivyo kwa kawaida proxy **haipaswi** kuongeza au
kuandika upya vichwa vya `Access-Control-*` (vichwa vinavyojirudia huharibu utendaji wa vivinjari). Sitisha TLS
na uelekeze maombi — acha OmniRoute ijibu preflight:

```nginx
# nginx — elekeza kwa OmniRoute; USIINGIZE Access-Control-* hapa
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # USIWEKE X-Forwarded-For kuwa 127.0.0.1 — kufanya hivyo hubatilisha kilinzi cha route ya loopback.
}
```

Weka vyanzo vya kivinjari vinavyoruhusiwa katika OmniRoute (`CORS_ALLOWED_ORIGINS` au kichupo cha
Security), si katika proxy.

## Faili za chanzo

| Jambo linalohusika                                   | Faili                                                                |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Utatuzi wa allowlist + `getCorsStatus()`             | `src/server/cors/origins.ts`                                         |
| Utekelezaji wa middleware (chanzo kimoja cha ukweli) | `src/server/authz/pipeline.ts`                                       |
| Settings → uingizaji wa chanzo wakati wa utekelezaji | `src/lib/config/runtimeSettings.ts`                                  |
| Hali ya wakati wa utekelezaji kwa dashibodi          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Bango la onyo la dashibodi                           | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Sehemu ya CORS Allowed Origins                       | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS ya Cloud-Agent kwa kila route (hali ya kipekee) | `src/lib/cloudAgent/api.ts`                                          |

## Tazama pia

- [Viwango vya Ulinzi wa Njia](./ROUTE_GUARD_TIERS.md) — utekelezaji wa loopback kwa
  njia zenye uwezo wa spawn (udhibiti tofauti na unaokamilishana).
- [Mwongozo wa Uidhinishaji](../architecture/AUTHZ_GUIDE.md) — mchakato kamili wa uthibitishaji na uidhinishaji.
