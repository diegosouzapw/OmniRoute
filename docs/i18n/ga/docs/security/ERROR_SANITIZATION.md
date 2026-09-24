# Error Message Sanitization (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Foinse na fírinne:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, agus na tógálaithe poiblí in `open-sse/utils/error.ts`
> **Tástálacha:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Nuashonraithe go deireanach:** 2026-09-02 — v3.8.51
> **Lucht féachana:** Aon innealtóir a bhíonn ag plé le freagraí earráide (bealaí HTTP, sruthanna SSE, feidhmitheoirí, láimhseálaithe MCP).
> **Stádas:** **ÉIGEANTACH** do gach conair chóid a sheolann teachtaireacht earráide ar ais chuig cliant.

## Cén fáth a bhfuil sé seo ann

Marcálann riail CodeQL `js/stack-trace-exposure` (CWE-209) aon chonair chóid ina sroicheann teachtaireacht earráide a eascraíonn as eisceacht ag am rite freagra HTTP / SSE gan a bheith sláintithe. Tugann lorganna cruaiche agus dearbhchonairí comhaid i bhfreagraí táirgthe an méid seo a leanas d'ionsaitheoirí:

- Leagan amach inmheánach na gcomhadlann (`/srv/app/src/lib/...`) → taiscéalaíocht le haghaidh tuilleadh ionsaithe.
- Leaganacha leabharlainne / creata a bhaintear as frámaí cruaiche → roghnú saothraithe spriocdhírithe.
- Luachanna íogaire ag am rite a d'fhéadfadh a bheith idirshuite i dteaghráin earráide (iarratais DB, luachanna cumraíochta).

Baineann an cúntóir `sanitizeErrorMessage`, arna easpórtáil ag `open-sse/utils/error.ts`, na haicmí sceite
seo:

1. Eireabaill frámaí cruaiche JavaScript fhisiciúla, shrathaithe agus gan débhrí inlíne.
2. Dearbhchonairí córas comhad POSIX, Windows, UNC, agus `file://`, agus URLanna sábháilte HTTPS
   agus bealaí API atá marcáilte go sainráite á gcaomhnú.
3. Sannacháin dintiúr, formáidí coitianta comharthaí soláthraí, bloic PEM eochrach príobháidí, agus URLanna sonraí
   base64.

Cuireann an sláintitheoir teorainn le fad an ionchuir agus teipeann sé go dúnta nuair a dhiúltaíonn luach caite do chomhéigean go teaghrán.
Fágann sláintíocht athchúrsach JSON réamhtheachtach eochracha neamhshábháilte dintiúr/conaire, ailiasanna seisiúin, agus
eochracha rialaithe fréamhshamhla ar lár freisin sula sraithítear freagra.

## An patrún éigeantach

### 1. Freagra earráide a thógáil (bealaí HTTP / API)

Úsáid `buildErrorBody()` — tá an tsláintíocht ionsuite:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... loighic an láimhseálaí ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Nó, i gcás na bhfillteán áisiúlachta sa mhodúl céanna:

```ts
import {
  errorResponse, // oibiacht Response aonuaire
  writeStreamError, // scríbhneoir SSE
  createErrorResult, // cruth { success: false, status, response, ... }
  unavailableResponse, // cuireann Retry-After leis
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Cuireann siad seo go léir an teorainn chanónach earráide poiblí i bhfeidhm. Téann `errorResponse`, `writeStreamError`, agus
`createErrorResult` trí `buildErrorBody`; teilgeann agus sláintíonn na trí chúntóir speisialaithe atriail/ciorcaid
a gcomhthéacs poiblí go díreach. **Ní gá duit `sanitizeErrorMessage` a ghlaoch
de láimh riamh** agus na cúntóirí seo á n-úsáid agat.

### 2. Clúdaigh shaincheaptha earráide (annamh)

Nuair nach féidir leat na cúntóirí thuas a úsáid (m.sh. nuair a shocraíonn prótacal réamhtheachtach amhail Connect-RPC cruth an fhreagra), iompórtáil `sanitizeErrorMessage` go díreach:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Seo é an t-aon bhealach ceadaithe chun corp saincheaptha earráide a chur le chéile. Féach `open-sse/executors/cursor.ts::buildErrorResponse` don chur i bhfeidhm tagartha.

### 3. Logáil seachas freagairt

Féadfaidh eisceachtaí inmheánacha iontaofa a dteachtaireacht iomlán agus a lorg cruaiche a choinneáil ionas gur féidir le hoibreoirí dífhabhtú a dhéanamh. Ní mór luachanna
a eascraíonn ag teorainneacha soláthraí, bailíochtaithe, seisiúin brabhsálaí, nó atá cóngarach do dhintiúir a
shláintiú sula dtéann siad isteach in aschur consóil, meiteashonraí iniúchta, nó logaí marthanacha glaonna. Patrún:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // eisceacht inmheánach iontaofa amháin
  return errorResponse(500, getErrorMessage(err)); // sláintithe — seolta chuig an gcliant
}
```

I gcás teipeanna atá faoi rialú soláthraí, teilg an luach logáilte freisin:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Patrúin thoirmiscthe

❌ **Ná cuir** aschur amh eisceachta i gcorp Response **riamh**:

```ts
// OLCC: sroicheann lorg cruaiche + conairí comhaid an cliant
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Ná ceap** do scoilteoir céadlíne féin **riamh**:

```ts
// OLCC: déantar dearmad dearbhchonairí a bhaint, d'fhéadfadh sé imeacht ón gcúntóir canónach
const safe = String(err).split("\n")[0];
```

❌ **Ná déan** sláintíocht sa bhealach agus ansin déan dearmad ar chonair SSE **riamh**. Téann aon rud a scríobhann chuig sruth trí `writeStreamError` (nó trína `buildErrorBody` bunúsach).

❌ **Ná cuir** `process.cwd()`, `__filename`, `__dirname`, ná conairí díorthaithe ó env
i dteachtaireachtaí earráide d'aon ghnó **riamh**. Clúdaíonn an sláintitheoir dearbhchonairí mar chosaint ilchisealach, ach níor cheart do ghlaoiteoirí
teachtaireachtaí ina bhfuil faisnéis faoin toipeolaíocht a chruthú ar an gcéad dul síos.

## Clúdach in CI

Forfheidhmíonn `tests/unit/error-message-sanitization.test.ts` na rialacha seo a leanas:

- Filleann gach bealach faoi `/api/model-combo-mappings/*` coirp sláintithe i gcás 4xx/5xx.
- Baineann `sanitizeErrorMessage` rianta cruachta il-líne.
- Cuireann `sanitizeErrorMessage` `<path>` in ionad conairí absalóideacha POSIX agus Windows.
- Láimhseálann `sanitizeErrorMessage` ionchuir de chineál `null`/`undefined`/ásc `Error` go sábháilte.
- Ní nochtann `buildErrorBody` rianta cruachta riamh ina réimse `message`.

Agus bealach nó seiceadóir nua á chur leis, cóipeáil patrún na ndearbhuithe ón gcomhad seo. Forfheidhmíonn an tairseach clúdaigh (`npm run test:coverage`) ≥60% de ráitis/línte/feidhmeanna/bhrainsí — ní mór conairí earráide a bheith clúdaithe.

## Rialuithe gaolmhara

- Ba cheart foláirimh CodeQL `js/stack-trace-exposure` in `.github/security` a bheith **ceachtar acu** deisithe trí na cúntóirí seo **nó** diúltaithe le nóta tráchta a luann an cháipéis seo.
- Láimhseálann cumraíocht cheiltithe `pino` (`src/shared/utils/logRedaction.ts`) logaí struchtúrtha iontaofa
  ar leithligh. Clúdaíonn an cháipéis seo teachtaireachtaí freagartha poiblí agus luachanna faoi rialú soláthraí a
  thrasnaíonn teorainneacha leanúnacha loga glaonna/seachfhreastalaí.
- Clúdaíonn liosta coiscthe na gceanntásca réamhtheachtacha (`src/shared/constants/upstreamHeaders.ts`) sceitheadh ceanntásc — coinnigh an dá chomhad ailínithe agus ábhar imní nua maidir le heisilteach á chur leis.

## Sonraí réamhtheachtacha a chur ar aghaidh

Glacann `buildErrorBody` le tríú argóint roghnach `upstreamDetails` (corp amh
parsáilte ón soláthraí réamhtheachtach). Nuair a sholáthraítear í, déanann
`sanitizeUpstreamDetails` í a shláintiú sula gcuirtear sa fhreagra í mar `upstream_details`.

Glacann ceathrú hargóint roghnach `classification`
(`{ type?: string; code?: string; reason?: string }`) le haicmiú poiblí sainráite.
Teilgtear gach réimse ar stór focal teoranta na n-aitheantóirí poiblí. Téann luachanna neamhshábháilte, luachanna atá
i gcruth dintiúir, luachanna ina bhfuil carachtair rialúcháin, nó luachanna rófhada ar ais chuig an gcineál/an cód a
dhíorthaítear ón stádas; fágtar cúis roghnach neamhshábháilte ar lár. Fanann aitheantóirí stádais HTTP trí dhigit
(`100` go `599`) bailí do chonarthaí soláthraí a nochtann an stádas réamhtheachtach uimhriúil mar chód atá
inléite ag meaisín. Glactar leis an raon teoranta céanna i bhfoirm ionadchoinneálaí stádais HTTP a ghintear go
háitiúil; fanann uimhreacha agus ainmneacha treallacha soláthraí lasmuigh den stór focal.

Cuir gach aicmiú sainráite ar aghaidh sa cheathrú hargóint sin. Ná forscríobh
`body.error.code`, `body.error.type`, ná `body.error.reason` riamh tar éis do `buildErrorBody()` filleadh;
seachnaíonn modhnú i ndiaidh an tógálaí an teilgean poiblí.

Rialacha sláintithe a chuirtear i bhfeidhm ar `upstreamDetails`:

1. Duilleoga teaghráin: cuir trí `sanitizeErrorMessage` iad (baineann sé rianta cruachta + conairí absalóideacha).
2. Baintear eochracha neamhshábháilte conaire, dintiúir, ailiasanna seisiúin agus rialaithe fréamhshamhla.
3. Uasteorainn doimhneachta: cuirtear an teaghrán `"[truncated]"` in ionad neadaithe thar 4 leibhéal.
4. Tá eagar teoranta do 32 eilimint.

Níor cheart ach do shuíomhanna glao a bhfuil corp earráide parsáilte ón soláthraí acu `upstreamDetails` a chur ar aghaidh. Níor cheart é a áireamh le hearráidí inmheánacha OmniRoute
(teipeanna parsála SSE, ábhar folamh, blocálacha ráille cosanta).

NÁ cuir `err.stack`, `err.message` amh, ná aon teaghrán ó eisceacht am rite ar aghaidh chuig
`upstreamDetails`. Ní mór dóibh siúd dul trí `errorResponse` / `buildErrorBody(code, msg)`
gan chorp réamhtheachtach fós.

Caomhnaíonn cur ar aghaidh roghnaitheach 4xx réamhtheachtach cruth sábháilte JSON agus foclaíocht an tsoláthraí a theastaíonn le haghaidh
uath-aisghabháil an chliaint, ach ní cur ar aghaidh beart ar bheart é: ritear an sláintitheoir athchúrsach i gcónaí
roimh shraithiú. Teipeann coirp thimthriallacha, coirp ina bhfuil BigInt, nó coirp le `toJSON()` naimhdeach ar bhealach dúnta agus níl siad
incháilithe lena gcur ar aghaidh. Cuireann OCR agus modhnóireacht an riail chéanna i bhfeidhm; tiontaítear coirp réamhtheachtacha
nach JSON iad, atá bán, nó a bhfuil lipéad mícheart orthu go dtí imchlúdach caighdeánach earráide JSON OmniRoute.

## Teorainn aitheanta de chuid CodeQL: ní aithnítear sláintitheoirí saincheaptha

Úsáideann an t-iarratas CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) liosta seasta ceadaithe de phatrúin sláintitheora (m.sh. `.split("\n")[0]` inlíne, `String#replace` le cruthanna sonracha sloinn ionadaíochta, rochtain ar `.message` ar `Error`). Ní aithníonn sé **atreorú** trí chúntóir saincheaptha amhail ár `sanitizeErrorMessage()`.

Ciallaíonn sé seo go bhféadfadh suíomhanna glao a dhéanann sláintiú go follasach tríd an modúl seo — mar shampla `open-sse/utils/error.ts::errorResponse` agus `open-sse/executors/cursor.ts::buildErrorResponse` — leanúint den foláireamh a ghiniúint cé go bhfuil an cód sábháilte ó thaobh feidhmiúlachta de. Díbhinní mar fhasaigh: `#224`, `#231` (Bealtaine 2026), agus an dá cheann marcáilte mar `false positive` le bonn cirt teicniúil.

**Conas tarlú nua a láimhseáil:**

1. Deimhnigh go seolann an suíomh glao an teachtaireacht trí `sanitizeErrorMessage` / `buildErrorBody` / ceann de na cumhdaigh a bhfuil cur síos orthu thuas (léigh an slabhra glaonna ó thús deireadh — ná bíodh muinín agat as nóta tráchta).
2. Deimhnigh go ndéanann `tests/unit/error-message-sanitization.test.ts` an chonair a fheidhmiú (nó cuir clúdach leis).
3. Díbhe an foláireamh trí `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, agus tagairt á déanamh don doiciméad seo.
4. **Ná** déan iarracht é a “dheisiú” trí `.split("\n")[0]` a chur inlíne i ngach áit — is é an cúntóir an t-aon fhoinse fírinne; lagaíonn dúbláil an phatrúin an sláintitheoir (cailltear glanadh cosán, an teorainn faid agus comhshó cineáil) ar mhaithe leis an gcuma go bhfuiltear ag géilleadh don scanóir.

Is é glacadh le gnéithe roghnacha amhail cumraíocht saincheaptha sláintitheora [`@codeql/javascript-models` de chuid CodeQL](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) an réiteach fadtéarmach; tá sé lasmuigh den doiciméad seo.

## Tagairtí

- [CWE-209: Nochtadh Faisnéise trí Theachtaireacht Earráide](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Bileog Achoimre um Láimhseáil Earráidí](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Cimit lena ndearnadh an cúntóir a lárú: `1a39c31f` — _fix(security): folaigh dintiúir phoiblí réamhtheachtacha + láraigh sláintiú earráidí_
