# ACP registry and registered CLI launchers (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

Scarann OmniRoute **aimsiú CLI**, **Agent Client Protocol dúchasach**, agus
**cuibheoirí oidhreachta stdio** ó chéile. Ní chruthaíonn aimsiú dénártha suiteáilte
go bhfuil a fhíordheimhniú, a chomhoiriúnacht samhla, ná a ullmhacht chun leid a láimhseáil bailí.

Úsáideann an deais `GET /api/acp/agents` agus `POST /api/acp/agents` le haghaidh fardail
agus clárú gníomhairí saincheaptha. Is bealaí bainistíochta áitiúla amháin iad seo, ní
API poiblí chun próisis a thosú nó leideanna a chur isteach. Ní éiríonn an
`AcpManager` inmheánach ina chúltaca soláthraí HTTP go huathoibríoch.

## Conarthaí cláraithe

Is é `config/cli-tools-manifest.json` an fhoinse údaráis do dhénártha seolta
ionsuite, d'argóintí, agus do mhóid inneall. Díorthaíonn an chlárlann a sainmhínithe
ón léiriú sin. Cuirtear an bhrath i dtaisce ar feadh 60 soicind.

- `acp`: seolann conradh Gemini `gemini --experimental-acp` agus déanann sé cumarsáid
  trí ACP JSON-RPC atá teorannaithe ag línte, tríd an SDK oifigiúil TypeScript.
- `stdio-adapter`: coimeádann conarthaí cláraithe eile an cuibheoir oidhreachta le
  hionchur ar líne nua agus aschur stdout. Cuireann tréimhse neamhghníomhaíochta aschuir
  dhá shoicind deireadh lena fhreagra. **Ní** dheimhníonn an cuibheoir seo tacaíocht
  dhúchasach ACP do na CLIanna sin.

Déanann Gemini an bhratach seolta a dhoiciméadú ina [thagairt CLI](https://geminicli.com/docs/cli/cli-reference/).
Úsáideann an cliant an [SDK oifigiúil ACP](https://github.com/agentclientprotocol/typescript-sdk)
le haghaidh túslitreacha, cruthú seisiúin, iarratais leide, fógraí, agus cealú.

Fanann sainmhínithe gníomhairí saincheaptha faoi rialú an riarthóra mar chonarthaí seolta.
Má chláraítear dénártha agus argóintí, tugtar pribhléidí áitiúla forghníomhaithe úsáideoir
an fhreastalaí don phróiseas sin; ní bosca gainimh é an clárú. Ní ghlacann tóireadóirí
leagain ach leis an inrite cláraithe agus le bratach leagain aitheanta.

## API inmheánach seolta

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Ná cuir ar aghaidh ach na hathróga soláthraí a sannadh d'aon ghnó don ghníomhaire seo.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Úsáid an freagra san fheidhmchlár glaoite.
} finally {
  acpManager.kill(session.id);
}
```

Réitíonn `spawn(agentId, options)` an t-inrite agus na hargóintí ón sainmhíniú
cláraithe. Is iad `cwd` agus `env` na roghanna glaoiteora amháin; diúltaítear don
seansíniú `spawn(agentId, binary, args, env)` agus do sháruithe inrite.
Ní thacaíonn an bainisteoir seo le conarthaí seolta HTTP.

Faigheann an próiseas páiste an córas oibriúcháin, an teirminéal, an logchaighdeán, agus
liosta ceadaithe na dteastas céanna le hoidhreacht agus atá ag na tosaitheoirí CLI. Ní
chóipeáiltear rúin fhreastalaí/soláthraí ó thimpeallacht an mháthairphróisis. Ní mór na
dintiúir atá de dhíth ar an CLI roghnaithe a chur ar aghaidh go sainráite nó a sholáthar
trí fhíordheimhniú áitiúil an CLI féin. Bíonn ceadanna córas comhad an úsáideora áitiúil
ag an bpróiseas páiste fós agus féadfaidh sé a chumraíocht féin a léamh.

## Saolré agus teorainneacha dúchasacha

1. Tosaigh an dénártha cláraithe, túslitrigh ACP, agus cruthaigh seisiún atá fréamhaithe
   san eolaire oibre roghnaithe. Tá teorainn deich soicind leis an túslitriú.
2. Cuir leid isteach agus bailigh fógraí téacs don seisiún sin amháin.
   Is é freagra RPC na leide an críochnú, ní tréimhse ciúnais stdout.
3. Úsáid sprioc-am amháin don leid, lena n-áirítear aon túslitriú neamhchríochnaithe; is é
   120 soicind an réamhshocrú. Diúltaítear do leideanna comhthráthacha sa phróiseas céanna.
4. Ar dhul thar am dúchasach, déan iarracht `session/cancel` a úsáid agus cuir deireadh
   leis an bpróiseas. Tugann fuinneog theoranta 100 ms deis don fhógra sruthlú sula
   gcuirtear deireadh leis.
5. Dún staid an iompair agus bain an seisiún nuair a theipeann ar an túslitriú, nuair a
   dhúnann an nasc, nuair a scoireann an próiseas, nó nuair a mharaíonn an glaoiteoir é.

Diúltaítear d'iarratais ar chead uirlisí. Ní fhógraítear aon chumais chliaint córas comhad
ná teirminéil. Ní chuireann na srianta seo an dénártha páiste féin i mbosca gainimh agus
ní ghlacann siad áit shocruithe údaraithe an CLI féin.

Coinníonn téacs dúchasach agus stdout/stderr oidhreachta araon 1 MiB de charachtair ar a
mhéad, agus coinnítear an t-aschur is nuaí le fógra teasctha. Tá fráma sreinge dúchasach
aonair teoranta do 2 MiB de bhearta roimh pharsáil an SDK. Athshocraítear maoláin do gach leid.

Seolann `kill(sessionId)` SIGTERM, agus ansin SIGKILL tar éis cúig shoicind mura bhfuil an
próiseas scortha. Scaoileann dul thar am leide oidhreachta éisteoirí agus amadóirí ach
fágann sé an seisiún ar fáil do leid eile; fanann glaoiteoirí freagrach as `kill()` nó
`killAll()` nuair a bhíonn siad críochnaithe.

## Teagmhais agus cigireacht

Astaíonn an bainisteoir `stdout`, `stderr`, agus `exit`, gach ceann acu le `sessionId`.
Tuairiscíonn `sessionError` earráid iompair sláintithe. Ní astaítear an teagmhas
comhoiriúnachta `error` ach nuair atá síntiúsóir aige, ionas nach féidir le dénártha atá
ar iarraidh earráid EventEmitter gan láimhseáil a chruthú.

- Tugann `getSession(sessionId)` seisiún bainistithe nó `undefined` ar ais.
- Fágann `getActiveSessions()` seisiúin atá stoptha nó á stopadh as an áireamh.
- Níl `sendInput(sessionId, input)` ar fáil ach do chuibheoir oidhreachta beo;
  diúltaíonn ACP dúchasach d'ionchur amh chun a shruth JSON-RPC a chosaint.
- Cuireann `killAll()` deireadh le gach seisiún atá á bhainistiú ag an ásc sin.

## Teorainneacha bailíochtaithe

Clúdaíonn daingneáin chinntitheacha an chumarsáid thosaigh dhúchasach, aschur téacs,
ceadanna diúltaithe, cealú, leideanna comhthráthacha, túslitriú teipthe, scor próisis,
teorainneacha aschuir, agus leithlisiú rún. Tá cúlchéimnithe maoláin/éisteora oidhreachta
atá ann cheana clúdaithe fós. Ní léiríonn na tástálacha seo logáil isteach bheo Gemini ná
tátal rathúil soláthraí; teastaíonn tástáil deataigh atá údaraithe ar leithligh sa
sprioc-thimpeallacht dóibh sin.

## Doiciméadacht ghaolmhar

- [Prótacail ghníomhairí](./AGENT_PROTOCOLS_GUIDE.md)
- [Conarthaí seolta CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Uirlisí CLI](../reference/CLI-TOOLS.md)
- [Freastalaí A2A](./A2A-SERVER.md)
- [Gníomhairí néil](./CLOUD_AGENT.md)
