# CORS Configuration & Security (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

Rialaíonn OmniRoute cé na **bunfhoinsí brabhsálaí** a fhéadfaidh freagraí trastionscnaimh a léamh
ó liosta ceadaithe lárnaithe amháin. Tá an tsamhail **dúnta i gcás teipe de réir réamhshocraithe**:
ní cheadaítear aon bhunfhoinse go dtí go gceadaíonn tú go sainráite í. Déantar cur síos ar an leathanach seo ar an gcaoi a
réitítear an liosta ceadaithe, ar a nochtann `CORS_ALLOW_ALL=true` i ndáiríre (agus, rud atá tábhachtach, ar an méid
nach nochtann sé), ar conas an timpeallacht forbartha agus an timpeallacht táirgthe a chumrú go sábháilte, agus ar an rabhadh ag am rite
a thaispeánann an deais nuair atá saoróg beo.

**Foinse na fírinne:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Cuirtear an liosta ceadaithe i bhfeidhm uair amháin, san
idir-earraí (`src/server/authz/pipeline.ts`) — ní shocraíonn láimhseálaithe in aghaidh an bhealaigh
`Access-Control-Allow-Origin` iad féin.

## Conas a réitítear bunfhoinse

I gcás gach iarratais, ríomhann an t-idir-earraí luach `Access-Control-Allow-Origin`
san ord seo:

1. **`CORS_ALLOW_ALL=true`** (nó an seanathróg `CORS_ORIGIN=*`) → cuir `Origin` an ghlaoiteora
   ar ais mar mhacalla (nó `*` nuair nach bhfuil ceanntásc `Origin` ann), le `Vary: Origin`
   ionas go bhfanfaidh taisceanna ceart. Cuireann an pointe srianta céanna `applyCorsHeaders()`
   `Vary: Accept-Encoding` freisin le gach freagra 2xx a bhfuil corp aige ar an dromchla
   `/v1*`/`/v1beta*` atá fíordheimhnithe le comhartha (`relaxForTokenAuth`, RFC 9110 §12.5.5, saincheist #6737), ionas
   gur féidir le taisceanna iartheachtacha/comhroinnte idirdhealú ceart a dhéanamh idir leaganacha comhbhrúite agus neamh-chomhbhrúite.
2. Seachas sin, déantar `Origin` an iarratais a normalú (é a athrú go litreacha beaga agus
   an tslais deiridh a bhaint) agus a mheaitseáil leis an **liosta ceadaithe cumaiscthe**:
   - athróg timpeallachta **`CORS_ALLOWED_ORIGINS`** — liosta deighilte le camóga, agus
   - an socrú ag am rite **`corsOrigins`** (Deais → Slándáil → _Bunfhoinsí Ceadaithe
     CORS_), a instealltar trí `setRuntimeAllowedOrigins()` ó
     `src/lib/config/runtimeSettings.ts`.
3. Gan mheaitseáil → **ní astaítear aon cheanntásc `Access-Control-Allow-Origin`**. Cuireann an brabhsálaí
   bac ar an léamh trastionscnaimh. Seo é an réamhshocrú dúnta i gcás teipe atá beartaithe.

| Athróg timpeallachta   | Brí                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV de bhunfhoinsí beachta atá le ceadú (molta).                                                              |
| `CORS_ALLOW_ALL`       | `true`/`1` → cuir aon bhunfhoinse ar ais mar mhacalla (saoróg). Forbairt amháin.                              |
| `CORS_ORIGIN`          | Seanathróg. Iompraíonn `*` é féin cosúil le `CORS_ALLOW_ALL`; cuirtear luach aonair leis an liosta ceadaithe. |

## Samhail bhagartha — an méid a nochtann `CORS_ALLOW_ALL=true` i ndáiríre

Is fiú an rabhadh ginearálta ó OWASP ("CORS saoróige = is féidir le suíomh ar bith d’API a ghlaoch")
a ghlacadh dáiríre, ach tá nochtadh OmniRoute **níos cúinge ná an cás ginearálta**,
mar gheall ar fhíric nithiúil amháin faoin gcur chun feidhme:

> **Ní astaíonn an `applyCorsHeaders()` lárnach
> `Access-Control-Allow-Credentials` riamh.** Ní nochtfaidh brabhsálaí freagra trastionscnaimh
> _a bhfuil dintiúir leis_ (a bhfuil fianán leis) mura seolann an freastalaí
> `Access-Control-Allow-Credentials: true`. Ní dhéanann conair chomhroinnte CORS OmniRoute
> amhlaidh riamh.

Seo a chiallaíonn sé sin do gach dromchla, fiú le `CORS_ALLOW_ALL=true`:

| Dromchla                               | Sásra fíordheimhnithe          | Éifeacht CORS saoróige                                                                                                                                                                                                                                                               |
| -------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Deais / MANAGEMENT `/api/*`            | Seisiún fianán                 | Cuirtear an bhunfhoinse ar ais mar mhacalla, ach **gan `Allow-Credentials`** cuireann an brabhsálaí **bac** ar an léamh a bhfuil dintiúir leis. **Ní féidir** le suíomh mailíseach trastionscnaimh freagraí fíordheimhnithe do dheaise a léamh, agus ní nochtar fianán an tseisiúin. |
| API Cliant `/v1/*`, `/v1beta/*`        | Ceanntásc Bearer / `x-api-key` | Ceadaitheach cheana féin **de réir dearaidh** (`relaxForTokenAuth`): ní cheanglaíonn brabhsálaithe `Authorization`/`x-api-key` go huathoibríoch riamh, mar sin ní féidir le leathanach ionsaitheora d’eochair a sholáthar. Ní leathnaíonn `CORS_ALLOW_ALL` é seo.                    |
| Léamh poiblí amháin (`/api/health`, …) | Gan cheann                     | Neamhíogair; tá saoróg neamhdhíobhálach.                                                                                                                                                                                                                                             |

Mar sin, tá nochtadh **iarmharach** `CORS_ALLOW_ALL=true` teoranta do: (a)
**léamha** trastionscnaimh gan dintiúir ar shonraí atá neamhfhíordheimhnithe cheana féin, agus (b)
ligean do **réamheitilt** CORS pas a fháil ar bhealaí bainistíochta — bealaí a éilíonn fíordheimhniú fós
nach féidir le leathanach trastionscnaimh a sholáthar. **Ní** veicteoir é chun seisiún a fhuadach ná
dintiúir a ghoid ar chonair chomhroinnte CORS.

### Fíoreisceacht amháin — `/api/v1/agents/`

Socraíonn bealaí Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`)
a gceanntásca CORS **féin**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) agus astaíonn siad
`Access-Control-Allow-Origin: <origin>|*` in éineacht le
`Access-Control-Allow-Credentials: true`. Is é seo an t-aon dromchla amháin ina
bhfuil macalla bunfhoinse agus dintiúir le chéile, agus tá sé **neamhspleách ar
`CORS_ALLOW_ALL`**. Tá fíordheimhniú bainistíochta de dhíth ar na bealaí seo
(`requireManagementAuth`); ba cheart d’oibreoirí a nochtann an deais lasmuigh den óstríomhaire a bheith
ar an eolas gurb é seo an t-aon áit amháin ina gceadaítear léamh trastionscnaimh a bhfuil dintiúir leis de réir
cheanntásca an fhreagra. Tá géarú an tsocraithe seo go liosta ceadaithe sainráite á rianú
ar leithligh ón treoir CORS seo.

## Seicliosta táirgeachta

- **Ná socraigh `CORS_ALLOW_ALL=true` i dtáirgeadh riamh.** Fág gan socrú é.
- Socraigh liosta bunús **sainráite** — trí athróg timpeallachta nó réimse na cluaisíní Slándála:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Má ritheann OmniRoute taobh thiar de sheachfhreastalaí droim ar ais / tollán (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), ní hé CORS an t-aon rialú atá agat — cosnaíonn garda na mbealaí
  aisfhillteacha bealaí atá in ann próisis a sceitheadh fós (féach
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Ná brionnaigh
  `X-Forwarded-For: 127.0.0.1` chun 403 a “dheisiú”; athosclaíonn sé sin an aicme RCE a
  dhúnann garda na mbealaí.
- Deimhnigh staid an ama rite: taispeánann an deais **meirge ómra buan**
  faoi Deais → Slándáil → Fardal Údaraithe aon uair a bhíonn
  `CORS_ALLOW_ALL=true` beo, agus tugann `/api/settings/authz-inventory`
  clúdach `cors: { allowAll, allowedOrigins }` ar ais ar féidir le huirlisí monatóireachta é a pholláil.

## Áisiúlacht forbartha — ceadaigh bunúis áitiúla shonracha

Is annamh a bhíonn gá agat leis an saoróg fiú i bhforbairt. Ná ceadaigh ach na freastalaithe forbartha a úsáideann tú:

```bash
# Freastalaithe forbartha Vite (5173) + Next.js (3000) ag glaoch ar OmniRoute áitiúil
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Meaitseáiltear bunúis gan beann ar chás agus déantar neamhaird den tslais deiridh, mar sin tá
`http://localhost:3000` agus `http://localhost:3000/` coibhéiseach. Is féidir an CSV céanna
a shocrú ag am rite in **Deais → Slándáil → Bunúis Cheadaithe CORS** gan
atosú.

## Eochracha API i gcomparáid le seisiúin fianán

- **Bearer / `x-api-key` (dromchla tátail `/v1/*`):** ní cheanglaíonn brabhsálaithe
  iad seo go huathoibríoch riamh. Ní bacainn fhiúntach é CORS anseo — is í an eochair API an
  bhacainn — agus sin an fáth a bhfuil an dromchla sin ceadmhach d’aon ghnó ionas gur féidir le cliaint
  bhrabhsálaí agus Electron freagraí a bhfuil siad i dteideal iad a fháil cheana féin a léamh.
- **Seisiún fianán (an deais):** cosnaítear é leis an réamhshocrú a dhiúltaíonn i gcás teipe **agus**
  le heaspa `Access-Control-Allow-Credentials` ar an gcosán comhroinnte. Coinnigh
  bunúis bhainistíochta/deaise amach as aon chumraíocht cheadmhach; ní mór dóibh fanacht
  go hiomlán dúnta i gcás teipe.

## Sampla: seachfhreastalaí droim ar ais os comhair OmniRoute

Cuireann OmniRoute féin CORS i bhfeidhm, mar sin de ghnáth níor cheart don seachfhreastalaí ceanntásca
`Access-Control-*` a chur leis ná a athscríobh (briseann ceanntásca dúbailte brabhsálaithe). Críochnaigh TLS
agus cuir ar aghaidh — lig do OmniRoute réamheitilt a fhreagairt:

```nginx
# nginx — cuir ar aghaidh chuig OmniRoute; NÁ hinsteall ceanntásca Access-Control-* anseo
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NÁ socraigh X-Forwarded-For mar 127.0.0.1 — sáraíonn sé garda na mbealaí aisfhillteacha.
}
```

Socraigh na bunúis bhrabhsálaí cheadaithe in OmniRoute (`CORS_ALLOWED_ORIGINS` nó an
chluaisín Slándála), ní sa seachfhreastalaí.

## Comhaid fhoinseacha

| Ábhar imní                                                 | Comhad                                                               |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Réiteach an liosta ceadaithe + `getCorsStatus()`           | `src/server/cors/origins.ts`                                         |
| Feidhmiú lárearraí (foinse aonair na fírinne)              | `src/server/authz/pipeline.ts`                                       |
| Socruithe → instealladh bunúis ag am rite                  | `src/lib/config/runtimeSettings.ts`                                  |
| Stádas ama rite don deais                                  | `src/app/api/settings/authz-inventory/route.ts`                      |
| Meirge rabhaidh na deaise                                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Réimse Bunús Ceadaithe CORS                                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS in aghaidh an bhealaigh do Cloud-Agent (an eisceacht) | `src/lib/cloudAgent/api.ts`                                          |

## Féach freisin

- [Leibhéil Gardaí Bealaigh](./ROUTE_GUARD_TIERS.md) — forfheidhmiú loopback do
  bhealaí atá in ann próisis a thosú (rialú comhlántach ar leith).
- [Treoir Údaraithe](../architecture/AUTHZ_GUIDE.md) — an phíblíne iomlán fíordheimhnithe.
