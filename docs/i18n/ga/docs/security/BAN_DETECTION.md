# Account-Ban / Banned-Keyword Detection (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

Scanann OmniRoute freagraí earráide réamhtheachtacha le haghaidh comharthaí a léiríonn go bhfuil
**cuntas soláthraí marbh go buan** (curtha ar fionraí / díghníomhachtaithe / coiscthe de bharr ToS) agus, nuair a
aimsítear meaitseáil, bogann sé an nasc sin isteach i **staid chríochfoirt `banned`** ionas nach
roghnaítear é a thuilleadh le haghaidh iarratas. Seo a chumraíonn an cárta socruithe
**Slándáil → Eochairfhocail Choiscthe** ("Eochairfhocail bhreise a spreagann brath
ar chosc buan cuntais. Bíonn na heochairfhocail ionsuite i bhfeidhm i gcónaí.").

Déantar cur síos ar an leathanach seo ar an liosta ionsuite, an sreabhadh braite, a raon feidhme, conas
eochairfhocail shaincheaptha a chur leis go sábháilte, agus conas nasc marcáilte a athshlánú. Tá an staid
chríochfoirt féin mar chuid den tsamhail athléimneachta — féach
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Staideanna críochfoirt").

**Foinse údaráis:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Eochairfhocail ionsuite

Bíonn na 8 bhfotheaghrán seo i bhfeidhm i gcónaí (gan beann ar chás na litreacha), beag beann ar aon liosta saincheaptha:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Forbraíonn an liosta seo de réir mar a athraíonn soláthraithe foclaíocht a gcuid cosc. Is é
> `ACCOUNT_DEACTIVATED_SIGNALS` in `open-sse/services/accountFallback.ts` an chóip
> údarásach; caith leis an mbloc thuas mar léargas den staid ag pointe ama ar leith.

Tá dhá thábla comharthaí chomhthadhlacha, **ar leith**, sa chomhad céanna agus _ní_ cuid iad
de bhrath eochairfhocal coiscthe:

- `CREDITS_EXHAUSTED_SIGNALS` — billeáil/cuóta ídithe (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → `credits_exhausted` críochfoirt.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **neamhchríochfoirt**; is féidir athshlánú trí athnuachan ceadaiscín.

Nóta: láimhseálann an chonair teorann ráta / mharana naisc frásaí sealadacha coitianta amhail
**`rate limit`** / `429`, agus **ní** comharthaí coisc iad.

## Sreabhadh braite

```
freagra earráide réamhtheachtach
  → corp tiontaithe ina theaghrán + ina chás íochtair
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [meaitseáil fotheaghráin]
  → meaitseáil?
      → testStatus an naisc = "banned"      (buan — marana 1 bhliain, ní athshlánaíonn sé go huathoibríoch riamh)
      → má tá an socrú `autoDisableBannedAccounts` ar siúl agus má chuimsíonn `autoDisableBannedScope`
        an nasc seo (`all`, nó `subscription` le haghaidh OAuth/fianán/seisiún)
        → socraítear isActive = false freisin. Fanann eochracha API réamhíoctha gníomhach nuair is é
        `subscription` an raon feidhme.
      → scipeáiltear an nasc le linn roghnú cuntais (staideanna combo QUOTA_BLOCKING)
```

- Is cuardach **fotheaghráin gan beann ar chás na litreacha** ar **chorp** an fhreagra é an meaitseáil
  (`isAccountDeactivated`, `accountFallback.ts`).
- Tarlaíonn críochfortú buan `banned` ar chorp ina bhfuil comhartha coisc ag **aon
  stádas HTTP** (trí `markAccountUnavailable` → `checkFallbackError`). Scríobhann
  an chonair inlíne `chatCore.ts` an lipéad níos cúinge **`deactivated`**
  (`isActive=false` nuair nach bhfuil aon eochracha API breise ag an nasc) ar **HTTP 401 / 403**
  (rangaithe trí `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Tabhair faoi deara go
  scríobhann conair `markAccountUnavailable()` stádas críochfoirt _difriúil_ —
  **`expired`** — don chomhartha céanna `ACCOUNT_DEACTIVATED` (trí
  `resolveTerminalConnectionStatus`), mar sin is féidir leis an gcosc céanna teacht chun solais mar
  `deactivated` nó `expired`, ag brath ar an gconair a láimhseáil an freagra. (Deir an
  nóta tráchta cód níos sine "nuair a bhíonn na teaghráin seo i gcorp 401" — ní léiríonn sé sin
  iompar reatha an chórais ina iomláine.)
- Eisiatar nasc `banned` ón roghnú i ngach áit ina ndéantar staideanna críochfoirt
  a scagadh (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` combo).

## Raon feidhme — cé na soláthraithe a scanadh

**Gach soláthraí.** Ritheann an tseiceáil sa phíblíne chineálach láimhseála earráidí
trína dtéann gach iarratas réamhtheachtach ar theip air — **níl** sí teoranta do
bhailitheoirí OAuth/síntiúis. Baineann an staid teirminéil a eascraíonn as le gach
**nasc**, ní le gach soláthraí.

É sin ráite, tá na _teaghráin_ ionsuite dírithe ar sholáthraithe síntiúis/OAuth
a bhfuil fíorbhaol coisc acu (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Ní ghníomhachtóidh soláthraí eochrach API an brathadóir ach amháin
má bhíonn ceann de na fotheaghráin go litriúil i gcorp na hearráide.

Rialaíonn `autoDisableBannedScope` (`all` | `subscription`, `all` mar réamhshocrú)
an socraíonn meaitseáil `isActive=false` freisin. Ciallaíonn `subscription`
suíocháin de chineál logála isteach (síntiúis íoctha agus cuntais saor in aisce,
lena n-áirítear seisiúin fianáin ghréasáin). Taifeadann sé
`testStatus=banned` fós le haghaidh eochracha API réamhíoctha ach fágann sé sa
linn ródaithe iad. Is é an dearadh buan ná sárú de réir soláthraí agus de réir
cuntais; is é an t-enum domhanda an chéad leagan.

## Eochairfhocail shaincheaptha coisc

Cuir eochairfhocail leis nó bain iad faoi **Slándáil → Eochairfhocail Choisc**
(coinnítear iad mar an socrú domhanda `customBannedSignals` trí
`PATCH /api/settings`). **Cuirtear leis** an liosta ionsuite iad — ní chuirtear
ina ionad é riamh — agus athlódáiltear iad gan atosú nuair a shábháiltear iad
(agus ag am tosaithe) trí `setCustomBannedSignals()`. Tá teorainn 200 carachtar
le gach eochairfhocal; níl aon teorainn le fad an eagair.

**⚠ Baol deimhneach bréagach — roghnaigh frásaí sonracha.** Is meaitseáil
amhfhothéacs é an brath ar chorp iomlán an fhreagra, agus tá meaitseáil
**buan** (tréimhse mharana 1 bhliain, aisghabháil láimhe). D’fhéadfadh
eochairfhocal leathan nasc atá breá sláintiúil a chosc:

- **Dona:** `quota`, `limit`, `error`, `denied` — bíonn siad le feiceáil i mórán
  earráidí sealadacha.
- **Maith:** abairtí iomlána coisc, m.sh. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Roghnaigh an frása gan débhrí is faide a sheolann an soláthraí ar ais i gcás
fíorchoisc. Mura bhfuil tú cinnte, breathnaigh ar `lastError` an naisc ar dtús,
ansin cuir an fhoclaíocht chruinn leis.

## Nasc marcáilte a aisghabháil

Ní aisghabhann staideanna teirminéil `banned` / `deactivated` **go huathoibríoch
riamh** (eisiatar iad ón timthriall réamhghníomhach aisghabhála — ní aisghabhann
ach tréimhsí marana `unavailable` astu féin). Ní mór d’oibreoir iad a ghlanadh
go sainráite:

1. **Déan an nasc a aththástáil** — gníomh **Tástáil** an deais
   (`POST /api/providers/{id}/test`); athshocraíonn promhadh rathúil
   `testStatus` go `active` agus glanann sé na réimsí earráide.
2. **Athfhíordheimhnigh / cuir na dintiúir in eagar** — i gcás soláthraithe
   OAuth, rith an sreabhadh logála isteach / athnuachana arís; socraíonn bealaí
   cruthaithe/iompórtála soláthraí `isActive = true`.
3. **Athchumasaigh an nasc** — má shocraigh an díchumasú uathoibríoch
   `isActive = false` (raon feidhme `all`, nó `subscription` i gcás nasc
   OAuth/fianáin/seisiúin), cuir ar siúl arís é tar éis duit an cuntas a
   dheisiú.

Níl aon chnaipe ar leith ann chun “bratach coisc a ghlanadh” — déantar
aisghabháil trí aththástáil, athfhíordheimhniú nó athchumasú, de réir riail
ghinearálta na staide teirminéil in
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Leithlisiú promhaidh (tástáil uile samhlacha)

Ní bhaineann **teip de bhunadh promhaidh** (seoltaí tástála uile samhlacha /
seiceála sláinte a ritheann laistigh de `runAsProbe`) nasc den linn riamh
(#9817): **taifeadtar ar mhaithe le hinfheictheacht í** (`last_error`,
`last_error_type`, `error_code`, `last_error_at`) ach seachnaítear **gach**
athrú ródaithe — tréimhsí marana, stádas teirminéil (`banned` / `deactivated` /
`credits_exhausted`), frithdhúnadh de réir samhla, scoradán ciorcaid an
tsoláthraí, taisce cuóta 5 nóiméad, athnuachan comhartha OAuth agus díchumasú
uathoibríoch. Ní dhíghníomhachtaíonn ach teip ar chonair fíoriarratais. Is í an
earráid thaifeadta a chuireann cuntas marcáilte in iúl ar an deais agus é fós
ag freastal tráchta.

Is é `shouldIsolateProbeFailures()` an t-aon phointe cinnteoireachta
(`src/shared/utils/probeOrigin.ts`), agus téann **gach** láthair i gcomhairle
leis a d’fhéadfadh staid ródaithe a athrú mar gheall ar theip de bhunadh
promhaidh:

- `markAccountUnavailable` (`auth.ts`) — taifead amháin (`lastError` mar
  amhthéacs, `lastErrorType`, `errorCode`, `lastErrorAt`; **gan**
  `backoffLevel` d’aon ghnó, mar spreagfadh sé sin an meath uathoibríoch ag am
  roghnúcháin agus scriosfadh sé an taifead)
- `maybeAutoDisableBannedAccount` — gan díchumasú uathoibríoch
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (taifead amháin,
  gan `credits_exhausted` teirminéil), GEO_BLOCKED (gan eisiamh 24h),
  MODEL_NOT_FOUND (gan `lockModel`), cúltaca uainíochta cuntais codex 429
  (gan `markCodexScopeRateLimited`, gan `rate_limited_until` marthanach, gan
  cleamhnas seisiúin a ghlanadh), `persistCodexQuotaState` (gan staid chuóta a
  scríobh, gan an taisce a neamhbhailíochtú), `recordKeyHealthStatus`
  (ní bhaintear leis an rothlóir sláinte eochrach)
- Athnuachan OAuth — idir an athnuachan réamhghníomhach i mbonn an
  fhorghníomhaitheora (`base.ts` `execute()`, gan uainíocht chomhartha
  athnuachana a ídiú) agus an chonair fhrithghníomhach 401/403 in `chatCore`
  (gan díghníomhachtú `expired`)
- `chat.ts` — ní dhíghrádaítear riamh scoradán ciorcaid an tsoláthraí ná an
  taisce cuóta 5 nóiméad (`markAccountExhaustedFrom429`)

Is í an earráid thaifeadta a chuireann cuntas marcáilte in iúl ar an deais agus
é fós ag freastal tráchta. Tabhair faoi deara: stórálann an taifead promhaidh
an téacs earráide **amh** (gan slisniú), murab ionann agus ciorrú
`slice(0,100)` na fíorchosáin.

Is féidir le hoibreoirí a úsáideann tástáil uile mar uirlis chothabhála an
t-iompar stairiúil a athbhunú (áirítear an promhadh mar fhíorghiniúint) trí
cheachtar díobh seo:

- an socrú `probeCanDisable` (`POST /api/settings` le
  `{"probeCanDisable": true}`, nó eagarthóireacht dhíreach DB ar `key_value`), nó
- bratach ghné **`PROBE_CAN_DISABLE=true`** (sárú env nó DB; tá tosaíocht aige
  ar an socrú).

Slán ar theip: má chaitheann cuardach na brataí nó na socruithe eisceacht,
fanann an leithlisiú AR SIÚL.

## Comhaid foinse

| Ábhar                                        | Comhad                                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Táblaí comharthaí + meaitseáil               | `open-sse/services/accountFallback.ts`                                                                        |
| Críochnú / marthanacht                       | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Raon an uathdhíchumasaithe                   | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Aicmiú inlíne                                | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Eisiamh ón athshlánú stáit deiridh           | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Lódáil eochairfhocal saincheaptha ag am rite | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Comhéadan úsáideora na socruithe             | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
