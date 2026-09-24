# Management Authentication (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

Tá **ceithre theaghlach dintiúir** ag OmniRoute a fhéadfaidh bealaí bainistíochta a údarú.
Níl siad inmhalartaithe. Ní bhainistíonn eochracha API Tátail (`sk-…`) an freastalaí **mura** bhfuil scóip `manage` nó `admin` deonaithe go sainráite dóibh.

Cur i bhfeidhm canónach: `src/lib/api/requireManagementAuth.ts`.

| Dintiúr                           | Foirm tipiciúil                             | Cruthaithe cá                                              | Úsáid bheartaithe                 | Cumas bainistíochta                                                                                 |
| :-------------------------------- | :------------------------------------------ | :--------------------------------------------------------- | :-------------------------------- | :-------------------------------------------------------------------------------------------------- |
| Seisiún JWT Painéil               | `auth_token` fianán                         | Logáil isteach Painéil                                     | Comhéadan Úsáideora Brabhsálaí    | Bainistíocht iomlán an phainéil, faoi réir rialacha CSRF, logántachta, agus bealaí cosanta i gcónaí |
| Comhartha aitheantais meaisín CLI | inmheánach / áitiúil                        | Tosaithe CLI (`omniroute` ar an meaisín céanna)            | CLI Áitiúil                       | Bainistíocht áitiúil amháin                                                                         |
| Comhartha Rochtana Scóipithe      | `oma_live_…`                                | **Socruithe → Comharthaí Rochtana** nó `omniroute connect` | CLI cianda agus API bainistíochta | Ní mór scóip `read`, `write`, nó `admin` riachtanach an bhealaigh a shásamh                         |
| Eochair API Tátail                | `sk-…` (agus réimíreanna API-eochrach eile) | **Bainisteoir API / Eochracha API**                        | Tátal `/v1/*`                     | **Níl aon cheann** mura bhfuil `manage` nó `admin` san áireamh i meiteashonraí na heochrach         |

Is dintiúir bainistíochta/CLI iad dintiúir `oma_`. **Ní** eochracha API Tátail iad.

Má tá fíordheimhniú logáil isteach/API-eochrach díchumasaithe don fhreastalaí, féadfaidh roinnt bealaí bainistíochta glaonna neamhfhíordheimhnithe a ghlacadh. Cuireann bealaí áitiúla amháin agus bealaí cosanta i gcónaí a rialacha féin i bhfeidhm fós. Dá bhrí sin, níl sé éigeantach go huilíoch ceann de na dintiúir seo a chur i láthair, agus ní leor é a bheith agat go huilíoch gan an scóip riachtanach agus logántacht an bhealaigh.

Gaolmhar: [Mód Cianda](./REMOTE-MODE.md) (conas a dhéantar `oma_live_…` a bhunú le haghaidh CLI cianda).

---

## Maitrísí Scóip

Is foclóirí éagsúla iad scóip bhainistíochta eochracha API agus scóip chomhartha rochtana. Is tríú foclóir iad scóip uirlisí MCP, a sheiceáiltear le `scopeMatches` seachas ceachtar feidhm sna táblaí thíos. Taobh le taobh: [Trí spásainm scóip](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Scóip Chomhartha Rochtana (`oma_live_…`)

| Scóip   | Gnáthoibríochtaí                                                                   |
| ------- | ---------------------------------------------------------------------------------- |
| `read`  | Liosta/stádas GETanna a bhfuil cead ag an chomhartha iad a fheiceáil               |
| `write` | Athruithe (cruthaigh/nuashonraigh/scrios) faoi bhun riarthóra                      |
| `admin` | Comhartha iomlán CLI cianda / ceangail (réamhshocruithe tosaithe pasfhocail anseo) |

Ní féidir le comhartha le `read` bealach `write` a ghlaoch. Cruth teachtaireachta reatha: `Níl scóip chomhartha rochtana '<have>' leordhóthanach; teastaíonn '<need>'."`

### Scóip bhainistíochta eochracha API

| Scóip    | Brí                                                                                           |
| -------- | --------------------------------------------------------------------------------------------- |
| (none)   | Inneachar amháin. Filleann bealaí bainistíochta 403.                                          |
| `manage` | API Bainistíochta (an geata céanna le brainse eochrach API `requireManagementAuth`)           |
| `admin`  | Sásaíonn sé `hasManageScope` freisin (caitear leis mar atá sé in ann bainistíocht a dhéanamh) |

Cumasaigh `manage` ar an eochair san Chomhéadan Úsáideora Eochracha API / Bainisteoir API. Ná athúsáid eochair cliant comhrá le haghaidh uathoibrithe mura bhfuil an scóip sin deonaithe agat d'aon ghnó.

---

## Conas iad a chruthú agus a chúlghairm

### Seisiún JWT an deais

1. Oscail `/login`, sínigh isteach leis an bhfocal faire bainistíochta (`INITIAL_PASSWORD` ar an gcéad tosú).
2. Is HttpOnly é an fianán `auth_token`. Úsáideann deais an bhrabhsálaí é go huathoibríoch.
3. Logáil amach trí `/api/auth/logout`. Níl aon rún fadtéarmach le cóipeáil.

### Comhartha aitheantais meaisín CLI

1. Rith `omniroute` ar an **óstach céanna** leis an bhfreastalaí (aislúb).
2. Bútstrápálann an CLI comhartha aitheantais meaisín faoi `~/.omniroute/` (chmod 600).
3. **Ní** oibríonn sé seo ó mheaisín eile. Úsáid Comhartha Rochtana le haghaidh CLI chianda.

### Comhartha Rochtana Scópáilte (`oma_live_…`)

1. Deais: **Socruithe → Comharthaí Rochtana** → cruthaigh (ainm + raon feidhme). **Ní thaispeántar an rún ach uair amháin.**
2. Nó CLI: `omniroute connect <host>` (pasfhocal → comhartha). Féach [Mód Cianda](./REMOTE-MODE.md).
3. Ceanntásc: `Authorization: Bearer oma_live_…`
4. Cúlghair é ón leathanach céanna Comharthaí Rochtana (nó scrios comhthéacs an CLI).
5. Ní stórálann an freastalaí ach hais. Caith leis an ngnáth-théacs mar a chaithfeá le pasfhocal.

### Eochair API leis an raon feidhme `manage`

1. Deais: **Bainisteoir API / Eochracha API** → cruthaigh nó cuir eochair in eagar → cumasaigh `manage` (nó `admin`).
2. Ceanntásc: `Authorization: Bearer sk-…` (réimír iarbhír na heochrach).
3. Cúlghair í nó bain `manage` di sa chomhéadan céanna.
4. An phribhléid is lú d'uathoibriú nach é an CLI é: tabhair tús áite do Chomhartha Rochtana `read` le haghaidh jabanna GET amháin; ná húsáid `manage` ar eochair API ach amháin nuair is gá don ghlaoiteoir `/v1` agus an bhainistíocht a úsáid freisin.

---

## Formáid an cheanntáisc

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Ná cuir dintiúir bhainistíochta i gconair an URL ná sa teaghrán iarratais. Is trí
cheanntásc/fhianán amháin a dhéantar fíordheimhniú bainistíochta.

---

## Samplaí le cóipeáil agus greamú

Inléite amháin (liostaigh soláthraithe). Úsáid Comhartha Rochtana `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Mionathrú (cruthaigh nasc le soláthraí). Úsáid Comhartha Rochtana `write`/`admin` nó
eochair API a bhfuil raon feidhme `manage` aici:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Tátal (ní bainistíocht é). Gnátheochair API, ní theastaíonn `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Earráidí reatha ama rite (ná déan rúin a aisbhéic)

| Cás                                                     | Stádas tipiciúil | Teachtaireacht (glanta)                                              |
| :------------------------------------------------------ | :--------------- | :------------------------------------------------------------------- |
| Gan dintiúr                                             | 401              | `Authentication required`                                            |
| `oma_live_…` neamhbhailí/imithe in éag                  | 401              | `Invalid or expired access token`                                    |
| Eochair API bhailí gan `manage`/`admin`                 | 403              | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Eochair API gnáth neamhbhailí ar bhealach bainistíochta | 403              | `Invalid management token`                                           |
| Scóip Chomhartha Rochtana ró-íseal                      | 403              | `Access token scope '<have>' is insufficient; '<need>' required.`    |

Ciallaíonn "Invalid management token" nár glacadh leis an iompróir **mar** dhintiúr bainistíochta. Ní insíonn sé duit cén teaghlach le heisiúint. Bain úsáid as an tábla thuas: teastaíonn scóip `manage` ó eochracha infeiris; teastaíonn `oma_live_…` ó CLI iargúlta; úsáideann an painéal rialaithe an fianán seisiúin.

---

## Rogha Molta an Phribhléid is Lú

| Glaoiteoir                                               | Úsáid                                              |
| -------------------------------------------------------- | -------------------------------------------------- |
| Brabhsálaí                                               | Seisiún Painéil                                    |
| CLI ar an óstach freastalaí                              | Comhartha meaisín                                  |
| CLI ar ríomhaire glúine ag labhairt le freastalaí cianda | `oma_live_…` ó `omniroute connect`                 |
| CI / scripteanna (bainistíocht amháin)                   | `oma_live_…` leis an raon feidhme is lú a oibríonn |
| CI a chaithfidh glaoch ar `/v1` agus `/api` araon        | Eochair API le `manage` **nó** dhá dhintiúr        |
