# AgentRouter Setup Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

Is athsheachadán atá comhoiriúnach le Anthropic é [AgentRouter](https://agentrouter.org) a athdhíolann
Claude agus samhlacha eile, go minic ar phraghsanna níos ísle ná API díreach Anthropic. Tá sé
deartha mar ionadach díreach `ANTHROPIC_BASE_URL` don chliant oifigiúil Claude Code,
mar sin ní ghlacann sé ach le trácht a mheaitseálann lorg sreinge Claude Code (User-Agent
sonrach, bratacha `anthropic-beta`, ceanntásca Stainless SDK, srl.).

## Tús tapa — úsáid an soláthraí dúchais `agentrouter` (molta)

I gcás fhormhór na n-úsáideoirí, **níl aon chumraíocht speisialta ag teastáil**. Tagann OmniRoute le soláthraí ionsuite
`agentrouter` a bhfuil lorg sreinge iomlán Claude Code ionsuite ann cheana féin (féach
`open-sse/config/providerRegistry.ts` → `agentrouter`). Chun é a úsáid:

1. Oscail **Painéal → Soláthraithe → Cuir Soláthraí Leis**.
2. Roghnaigh **AgentRouter** ón liosta.
3. Greamaigh d'eochair API `sk-...` agus sábháil.

Sin é — níl athróga timpeallachta ná cineál soláthraí saincheaptha ag teastáil. Áirítear leis na samhlacha ionsuite
`claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, agus
`deepseek-v3.2`.

Clúdaíonn an chuid eile den treoir seo an **chonair ardleibhéil**: úsáid an chineáil soláthraí
`anthropic-compatible-cc-*`. Úsáid é sin nuair a bhíonn níos mó smachta ag teastáil uait
ar an lorg sreinge — mar shampla, agus tú ag nascadh le hathsheachadáin eile ar nós AgentRouter
nach bhfuil fós sa chlárlann dhúchasach soláthraithe, nó nuair atá an bun-URL,
an chonair chomhrá, nó an tacar ceanntásca á sárú agat.

---

## Ardleibhéal: nascadh tríd an gcineál soláthraí atá comhoiriúnach le Claude Code

Tacaíonn OmniRoute freisin le AgentRouter (agus athsheachadáin chomhchosúla) tríd an gcineál soláthraí
**comhoiriúnach le Claude Code** (`anthropic-compatible-cc-*`), a úsáideann
Anthropic Messages API leis an lorg sreinge ceart. Ní oibreoidh soláthraí cineálach
`openai-compatible-chat` atá dírithe ar `https://agentrouter.org` —
diúltaíonn an WAF réamhtheachtach d'iarratais nach bhfuil cuma Claude Code orthu.

---

## Réamhriachtanais

- Cuntas AgentRouter agus eochair API. Faigheann úsáideoirí nua creidmheasanna saor in aisce tríd an nasc cleamhnaithe
  i [README](../README.md) an tionscadail.
- OmniRoute ag rith agus an bhratach gné `ENABLE_CC_COMPATIBLE_PROVIDER` cumasaithe
  (féach thíos).

## 1. Cumasaigh an cineál soláthraí atá comhoiriúnach le CC

Tá an cineál soláthraí atá comhoiriúnach le Claude Code faoi rialú brataí gné toisc go
seolann sé trácht a dhéanann aithris dhlúth ar an gcliant oifigiúil Claude Code. Cumasaigh é trí
athróg timpeallachta a shocrú sula dtosaíonn tú OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Sampla Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Tar éis atosaithe, taispeánann an painéal rogha **Cuir Soláthraí atá Comhoiriúnach le Claude Code Leis**
anuas ar na sreafaí reatha atá comhoiriúnach le OpenAI agus Anthropic.

## 2. Cruthaigh an soláthraí sa phainéal

1. Oscail **Painéal → Soláthraithe → Cuir Soláthraí Leis**.
2. Roghnaigh **Cuir Soláthraí atá Comhoiriúnach le Claude Code Leis** (ní bhíonn sé le feiceáil ach nuair atá an bhratach thuas socraithe).
3. Líon isteach na réimsí:

| Réimse         | Luach                                                                         |
| -------------- | ----------------------------------------------------------------------------- |
| Ainm           | `AgentRouter` (nó aon lipéad)                                                 |
| Réimír         | `agentrouter` (ailias so-aitheanta a thaispeántar sna logaí agus sa phainéal) |
| Bun-URL        | `https://agentrouter.org`                                                     |
| Conair chomhrá | `/v1/messages?beta=true` (réamhshocrú — fág mar atá sé)                       |

> Úsáideann aitheantóir canónach na samhla aitheantas iomlán nód an tsoláthraí fós
> (`anthropic-compatible-cc-{uuid}/{model}`). Níl sa **Réimír** ach ailias taispeána
> a réitíonn `src/lib/usage/callLogs.ts` chun aschur loga níos soléite a sholáthar.

4. (Roghnach) Greamaigh d'eochair API sa réimse **Bailíochtaigh** agus cliceáil **Seiceáil** chun
   nascacht a dheimhniú sula sábhálann tú.
5. Cliceáil **Cuir Leis**.

Nuair a bheidh sé cruthaithe, oscail an soláthraí agus cuir **Ceangal** leis agus d'eochair API AgentRouter
(`sk-...`) á húsáid agat. Ba cheart go n-athródh `test_status` an cheangail go `active`.

## 3. Úsáid é trí chomhcheangal nó go díreach

Déan tagairt don tsamhail agus réimír do sholáthraí á úsáid mar an t-ainmspás:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Oibríonn aitheantas canónach na samhla `anthropic-compatible-cc-{uuid}/claude-opus-4-6` freisin
agus is é sin a thaispeántar sa bhunachar sonraí agus i gcumraíocht an chomhcheangail.

Nó cuir le comhcheangal é le haghaidh ródaithe, cúltaca agus bainistíochta cuóta, díreach mar a dhéanfá le
haon soláthraí eile.

---

## Sonraí na híomhá sreinge

Mar thagairt, seolann an droichead atá comhoiriúnach le cc an méid seo a leanas ar gach iarratas
réamhtheachtach (féach `open-sse/services/claudeCodeCompatible.ts`):

| Ceanntásc                                                | Luach                                                                                                                                     |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                          | `Bearer <api-key>`                                                                                                                        |
| `User-Agent`                                             | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                                  |
| `anthropic-version`                                      | `2023-06-01`                                                                                                                              |
| `anthropic-beta`                                         | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                                  |
| Scorán béite redact-thinking in aghaidh an naisc         | Cuireann sé `redact-thinking-2026-02-12` leis i gcás seirbhísí réamhtheachtacha a éilíonn sruthanna smaointeoireachta folaithe go sonrach |
| Scorán smaointeoireachta achoimrithe in aghaidh an naisc | Cuireann sé `display: "summarized"` le hiarratais smaointeoireachta CC Compatible nár shocraigh mód taispeána cheana                      |
| `anthropic-dangerous-direct-browser-access`              | `true`                                                                                                                                    |
| `x-app`                                                  | `cli`                                                                                                                                     |
| `X-Stainless-*`                                          | Ceanntásca éagsúla Stainless SDK (teanga, leagan pacáiste, córas oibriúcháin, ailtireacht, etc.)                                          |

Is é seo a ligeann d’iarratais dul tríd an WAF réamhtheachtach / liosta ceadaithe cliant.

---

## Fabhtcheartú

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Níor mheaitseáil d’iarratas
íomhá sreinge Claude Code. Tarlaíonn sé seo nuair a chumraítear an soláthraí
mar `openai-compatible-chat` in ionad `anthropic-compatible-cc`, nó nuair nár socraíodh an
bhratach `ENABLE_CC_COMPATIBLE_PROVIDER=true` ag an tosú.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Comhartha neamhbhailí". Tá an íomhá sreinge ceart ach diúltaítear don eochair API. Gin
eochair nua i ndeais AgentRouter agus nuashonraigh an nasc.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Dhiúltaigh crúca modhnóireachta AgentRouter d’inneachar an iarratais, nó ní
cheadaíonn plean na heochrach an tsamhail iarrtha. Bain triail as leid nó samhail eile;
déan teagmháil le tacaíocht AgentRouter má chuirtear bac go comhsheasmhach ar leid neamhdhíobhálach.

**`[400]: content-blocked` ar shamhlacha sonracha amháin** — Ní cheadaíonn formhór phleananna AgentRouter ach
fo-thacar samhlacha (m.sh. `claude-opus-4-6`). Tugann aitheantais eile samhlacha
`unauthorized_client_error` ar ais cé go bhfuil an eochair bailí. Seiceáil cé na samhlacha a
chlúdaíonn do phlean i ndeais AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` ó logaí omniroute** —
Chuir an tseirbhís réamhtheachtach corp nach JSON é ar ais (leathanach earráide HTML ón WAF de ghnáth).
Ciallaíonn sé seo de ghnáth nár shroich an t-iarratas inneall AgentRouter riamh — seiceáil arís go
dtosaíonn aitheantas an tsoláthraí le `anthropic-compatible-cc-` (tabhair faoi deara an fleiscín deiridh —
féach `CLAUDE_CODE_COMPATIBLE_PREFIX` in `open-sse/services/claudeCodeCompatible.ts`)
agus go bhfuil an bhratach gné cumasaithe.

**`unauthorized client detected` / leathanach earráide HTML cé go bhfuil soláthraí AgentRouter
ann cheana féin** — is dócha go bhfuil **níos mó ná soláthraí AgentRouter amháin** agat
agus go bhfuil d’iarratas ag dul chuig an gceann mícheart. Má cruthaíodh soláthraí
`anthropic-compatible-*` (nach `cc` é) nó `openai-compatible-chat-*` lámhdhéanta a bhí fágtha
leis an réimír `agentrouter`, féadfaidh sé aitheantais samhlacha `agentrouter/<model>` a
shealbhú (agus d’fhéadfadh comhcheangail tagairt dó de réir aitheantas nóid), ionas go seoltar trácht chuig an soláthraí sin —
a sheolann User-Agent cineálach agus a ndiúltaítear dó — in ionad an tsoláthraí ionsuite
`agentrouter` a bhfuil an íomhá sreinge cheart aige cheana féin. Seiceáil cá réitítear an
tsamhail i ndáiríre i logaí omniroute (taispeánann an chlib `ROUTING`
`agentrouter/<model> → <providerId>/<model>`); murab é `<providerId>`
`agentrouter`, comhdhlúthaigh ar an soláthraí dúchasach: treoraigh comhcheangail chuig
`agentrouter/<model>` (providerId `agentrouter`) agus scrios na soláthraithe comhoiriúnacha
dúblacha. Ní theastaíonn aon chumraíocht íomhá sreinge ná
`customUserAgent` ón soláthraí dúchasach.

---

## Féach freisin

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Nótaí maidir le comhtháthú sholáthraí Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Catalóg soláthraithe
  na sraithe saor in aisce
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Cur chun feidhme na híomhá sreinge
