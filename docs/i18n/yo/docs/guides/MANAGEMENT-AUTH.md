# Management Authentication (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ní **ẹbí ìdánimọ̀ mẹ́rin** tí ó lè fún àṣẹ láti ṣàkóso àwọn ọ̀nà ìṣàkóso (management routes).
Wọn kì í ṣe ohun tí a lè fi pàṣípààrọ̀. Àwọn `sk-…
` (Inference API keys) kì í ṣàkóso
sẹ̀fà (server) àyàfi bí a bá fún wọn ní àṣẹ `manage` tàbí `admin` ní pàtó.

Ìṣe àgbékalẹ̀ tó péye: `src/lib/api/requireManagementAuth.ts`.

| Ìdánimọ̀ (Credential)  | Ìrísí rẹ̀                                | Ibi tí a ti dá a sílẹ̀                                 | Lílò rẹ̀                       | Agbára ìṣàkóso                                                                                          |
| --------------------- | --------------------------------------- | ----------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| Dashboard JWT session | `auth_token` cookie                     | Ìwọlé Dashboard                                       | Browser UI                    | Ìṣàkóso dashboard ní kíkún, ó wà lábẹ́ àwọn òfin CSRF, locality, àti àwọn ọ̀nà tí a dáàbò bò nígbà gbogbo |
| CLI machine-id token  | internal / local                        | CLI bootstrap (`omniroute` lórí ẹ̀rọ kan náà)          | Local CLI                     | Ìṣàkóso lórí ẹ̀rọ náà nìkan                                                                              |
| Scoped Access Token   | `oma_live_…`                            | **Settings → Access Tokens** tàbí `omniroute connect` | Remote CLI àti management API | Ó gbọ́dọ̀ ní `read`, `write`, tàbí `admin` scope tí ọ̀nà náà béèrè                                         |
| Inference API key     | `sk-…` (àti àwọn prefix API-key mìíràn) | **API Manager / API Keys**                            | `/v1/*` inference             | **Kò sí** àyàfi bí metadata kọ́kọ́rọ́ náà bá ní `manage` tàbí `admin`                                      |

Àwọn ìdánimọ̀ `oma_` jẹ́ ìdánimọ̀ fún ìṣàkóso/CLI. Wọn kì í ṣe `sk-…` (Inference API keys).

Bí a bá pa ìwọlé/API-key auth fún sẹ̀fà náà, àwọn ọ̀nà ìṣàkóso kan lè
gba àwọn ìpè tí kò ní ìdánimọ̀. Àwọn ọ̀nà tí ó jẹ́ local-only àti àwọn tí a dáàbò bò nígbà gbogbo ṣì ń lo àwọn òfin tiwọn. Nítorí náà, fífi ọ̀kan nínú àwọn ìdánimọ̀ wọ̀nyí hàn kì í ṣe dandan ní gbogbo ìgbà, àti pé níní ọ̀kan nínú wọn kì í ṣe ẹ̀rí pé ó tó láti wọlé láìní scope tí ó yẹ àti locality ọ̀nà náà.

Jẹ mọ́: [Remote Mode](./REMOTE-MODE.md) (bí a ṣe ń dá `oma_live_…` fún remote CLI).

---

## Àwọn mátírísì ìwọ̀n-ìwọlé

Àwọn ìwọ̀n-ìwọlé ìṣàkóso API-key àti àwọn ìwọ̀n-ìwọlé access-token jẹ́ àwọn ọ̀rọ̀-ìlò tó yàtọ̀.
Àwọn ìwọ̀n-ìwọlé irinṣẹ́ MCP jẹ́ ọ̀rọ̀-ìlò kẹta, tí a fi `scopeMatches` yẹ̀wò dípò
èyíkéyìí nínú àwọn iṣẹ́ tí ó wà nínú àwọn tábìlì ìsàlẹ̀. Lẹ́gbẹ̀ẹ́ ara wọn:
[Àwọn orúkọ-ààyè ìwọ̀n-ìwọlé mẹ́ta](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Àwọn ìwọ̀n-ìwọlé Access Token (`oma_live_…`)

| Ìwọ̀n-ìwọlé | Àwọn iṣẹ́ tí ó wọ́pọ̀                                                                       |
| ---------- | ---------------------------------------------------------------------------------------- |
| `read`     | Àwọn àkójọ/ìwọ̀n-ìwọlé GETs tí àmì náà gbà láyè láti rí                                   |
| `write`    | Àwọn ìyípadà (ìṣẹ̀dá/ìṣe-àtúnṣe/ìparẹ́) lábẹ́ admin                                         |
| `admin`    | CLI ìṣàkóso latọ̀ọ̀na jijìn pátápátá / àmì ìsopọ̀ (àwọn àyè-ìpilẹ̀ṣẹ̀ ìbẹ̀rẹ̀ ọ̀rọ̀ìpamọ́ wà níbí) |

Àmì kan pẹ̀lú `read` kò lè pe ọ̀nà `write`. Ìrísí ìránṣẹ́ ìgbà-ìṣiṣẹ́:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Àwọn ìwọ̀n-ìwọlé ìṣàkóso API-key

| Ìwọ̀n-ìwọlé | Ìtumọ̀                                                                |
| ---------- | -------------------------------------------------------------------- |
| (kò sí)    | Ìfìwéránṣẹ́ nìkan. Àwọn ọ̀nà ìṣàkóso padà 403.                         |
| `manage`   | API Ìṣàkóso (ẹnu-ọ̀nà kan náà bí ẹ̀ka API-key `requireManagementAuth`) |
| `admin`    | Ó tún tẹ́ `hasManageScope` lọ́rùn (tí a kà sí pé ó lè ṣe ìṣàkóso)      |

Mú `manage` ṣiṣẹ́ lórí kọ́kọ́rọ́ náà nínú API Keys / API Manager UI. Má ṣe tún
kọ́kọ́rọ́ oníbàárà ìjùmọ̀sọ̀rọ̀ lò fún ìṣiṣẹ́-lẹ́yìn-ara-ẹni àyàfi tí o bá fún un
ní ìwọ̀n-ìwọlé náà ní àyè.

---

## Bí a ṣe ń ṣẹ̀dá àti fagilé

### Ìgbà JWT Dashboard

1. Ṣí `/login`, wọlé pẹ̀lú ọ̀rọ̀ aṣínà ìṣàkóso (`INITIAL_PASSWORD` nígbà ìbẹ̀rẹ̀ àkọ́kọ́).
2. Kúkì `auth_token` jẹ́ HttpOnly. Dashboard aṣàwákiri máa ń lò ó láìfọwọ́ṣe.
3. Jáde nípasẹ̀ `/api/auth/logout`. Kò sí àṣírí ọlọ́jọ́-pípẹ́ láti ṣe àdàkọ.

### Tókìnù machine-id CLI

1. Ṣiṣe `omniroute` lórí **host kan náà** bí asẹ́wọ̀n náà (loopback).
2. CLI máa ń ṣẹ̀dá tókìnù machine-id lábẹ́ `~/.omniroute/` (chmod 600).
3. Èyí **kò** ṣiṣẹ́ láti ẹ̀rọ mìíràn. Lo Tókìnù Ìráàyèsí fún CLI jíjìnnà.

### Tókìnù Ìráàyèsí Oníwọ̀n (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → ṣẹ̀dá (orúkọ + ìwọ̀n). **Ẹ̀ẹ̀kan ṣoṣo ni a ó fi àṣírí náà hàn.**
2. Tàbí CLI: `omniroute connect <host>` (ọ̀rọ̀ aṣínà → tókìnù). Wo [Ipo Jíjìnnà](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Fagilé rẹ̀ láti ojú-ìwé Access Tokens kan náà (tàbí pa àyíká CLI rẹ́).
5. Asẹ́wọ̀n ń tọ́jú hash nìkan. Ṣe ìtọ́jú plaintext náà bí ọ̀rọ̀ aṣínà.

### Kọ́kọ́rọ́ API oníwọ̀n `manage`

1. Dashboard: **API Manager / API Keys** → ṣẹ̀dá tàbí ṣàtúnṣe kọ́kọ́rọ́ kan → mú `manage` (tàbí `admin`) ṣiṣẹ́.
2. Header: `Authorization: Bearer sk-…` (ìpele ìbẹ̀rẹ̀ gangan ti kọ́kọ́rọ́ náà).
3. Fagilé rẹ̀ tàbí yọ `manage` kúrò nínú UI kan náà.
4. Fún àṣẹ tó kéré jù lọ nínú adaṣiṣẹ́ tí kì í ṣe CLI: yan Tókìnù Ìráàyèsí `read` fún àwọn iṣẹ́ GET-nìkan; lo `manage` lórí kọ́kọ́rọ́ API nígbà tí olùpè náà bá tún nílò láti bá `/v1` àti ìṣàkóso sọ̀rọ̀.

---

## Ìlànà àkọlé

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Má ṣe fi àwọn ẹ̀rí ìṣàkóso sínú ipa URL tàbí okùn ìbéèrè. Ìfàṣẹsí
ìṣàkóso jẹ́ nípasẹ̀ àkọlé/kúkì nìkan.

---

## Àwọn àpẹẹrẹ tí a lè ṣẹ̀dà-lẹ̀ mọ́lẹ̀

Kíkà-nìkan (ṣe àkójọ àwọn olupèsè). Lo Access Token `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Ṣíṣe àtúnṣe (ṣẹ̀dá àsopọ̀ olupèsè kan). Lo Access Token `write`/`admin` tàbí
API key tó ní scope `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Ìṣírò àbájáde (kì í ṣe ìṣàkóso). API key déédéé, kò nílò `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Àwọn àṣìṣe ìṣiṣẹ́ lọ́wọ́lọ́wọ́ (má ṣe fi àwọn àṣírí hàn)

| Ipò                                       | Ìwọ̀n ipò tó wọ́pọ̀ | Ìránṣẹ́ (tí a ti fọ̀ mọ́)                                               |
| ----------------------------------------- | ---------------- | -------------------------------------------------------------------- |
| Kò sí ìdánimọ̀                             | 401              | `Authentication required`                                            |
| `oma_live_…` tí kò tọ́/tí àkókò rẹ̀ ti kọjá | 401              | `Invalid or expired access token`                                    |
| Kókó API tó tọ́ láìsí `manage`/`admin`     | 403              | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Kókó API lásán tí kò tọ́ lórí ọ̀nà ìṣàkóso  | 403              | `Invalid management token`                                           |
| Ìwọ̀n àyè Àmì Ìwọlé kéré jù                | 403              | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Àmì ìṣàkóso tí kò tọ́" túmọ̀ sí pé a **kò** gba ẹni tó gbé e wá gẹ́gẹ́ bí ìdánimọ̀ ìṣàkóso. Kò **sọ** fún ọ irú ìdílé wo ni o yẹ kí o ṣe. Lo tábìlì tó wà lókè: àwọn kókó ìpinnu nílò àyè `manage`; CLI latọ̀ọ̀na nílò `oma_live_…`; àtẹ ìdarí náà lo kuki ìgbà ìṣiṣẹ́.

---

## Àṣàyàn àwọn àǹfààní tó kéré jù lọ tí a dámọ̀ràn

| Ẹni tó pè                                                  | Ìlò                                              |
| :--------------------------------------------------------- | :----------------------------------------------- |
| Ẹrọ Ìṣàfihàn Ojú-òpó                                       | Ìgbà ìṣiṣẹ́ Dasíbọ́ọ̀dù                             |
| CLI lórí agbalejo olùpèsè                                  | Àmì ẹ̀rọ                                          |
| CLI lórí kọ̀ǹpútà alágbèéká tó ń bá olùpèsè jíjìn-rere sọ̀rọ̀ | `oma_live_…` láti `omniroute connect`            |
| CI / àwọn àkọsílẹ̀ (ìṣàkóso nìkan)                          | `oma_live_…` pẹ̀lú ìwọ̀n tó kéré jù lọ tó ṣiṣẹ́     |
| CI tí ó gbọ́dọ̀ pe méjèèjì `/v1` àti `/api`                  | API key pẹ̀lú `manage` **tàbí** àwọn ìdánimọ̀ méjì |
