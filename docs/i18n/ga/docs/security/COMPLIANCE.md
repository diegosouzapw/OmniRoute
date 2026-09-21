# Compliance & Audit (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Foinse údaráis:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Nuashonraithe go deireanach:** 2026-06-28 — v3.8.40

Taifeadann OmniRoute gníomhartha riaracháin, teagmhais fíordheimhnithe, athruithe
ar shaolré dhintiúir soláthraithe, agus agairtí uirlisí MCP i dtáblaí iniúchta
le tacaíocht SQLite. Mínítear ar an leathanach seo cad a logáiltear, cá bhfuil
sé stóráilte, cá fhad a choinnítear é, conas is féidir le heochracha API roghnú
gan a bheith páirteach, agus conas na sonraí a cheistiú.

Tá an cur chun feidhme in `src/lib/compliance/index.ts` (T-43 — "Rialuithe
Comhlíontachta") agus `src/lib/compliance/providerAudit.ts`. Ní chaitheann
scríobhanna iniúchta eisceacht riamh: má tharlaíonn aon teip, slogtar an glao
go ciúin ionas nach féidir le logáil iniúchta cur isteach ar phríomhshreabhadh
na hiarrata.

## Cad a Logáiltear

### Teagmhais iniúchta riaracháin (`audit_log`)

Cruthaíonn gach glao ar `logAuditEvent({ action, actor, target, details, ... })`
ró amháin. Leanann teaghráin gnímh patrún `domain.verb` (nó
`domain.verb.outcome`). Áirítear iad seo a leanas ar na cineálacha gnímh atá
deimhnithe sa chrann:

| Gníomh                               | Foinse                                  |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Gabhann gach iontráil `action`, `actor` (`"system"` de réir réamhshocraithe),
`target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id`, agus `timestamp`. Déantar eochracha íogaire (`apiKey`,
`accessToken`, `refreshToken`, `password`, aon rud a mheaitseálann
`*token`/`*secret`/`*apikey`, etc.) a cheilt go hathchúrsach mar `"[redacted]"`
sula scríobhtar an ró.

### Glaonna uirlisí MCP (`mcp_tool_audit`)

Scríobhann gach agairt ar uirlis MCP ró trí
`open-sse/mcp-server/audit.ts`. Scéimre (ó
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Colún            | Nótaí                                       |
| ---------------- | ------------------------------------------- |
| `id`             | incrimintiú uathoibríoch                    |
| `tool_name`      | aitheantóir uirlise MCP                     |
| `input_hash`     | sha256 den ionchur (ní stóráiltear pálasta) |
| `output_summary` | achoimre ghairid theasctha                  |
| `duration_ms`    | am caite iarbhír                            |
| `api_key_id`     | glaoiteoir (in-nialasach)                   |
| `success`        | `1` / `0`                                   |
| `error_code`     | cód earráide deiridh ar theip               |
| `created_at`     | stampa ama ISO                              |

### Logaí iarratais / úsáide

Is teiliméadracht oibríochtúil iad seo (ní iniúchadh riaracháin go docht iad),
ach baineann siad úsáid as an bpíblíne choinneála chéanna:

- `usage_history` — achoimre úsáide in aghaidh na hiarrata
- `call_logs` — loga iomlán in aghaidh na hiarrata (faoi réir teorainn rónna; féach thíos)
- `proxy_logs` — loga tráchta seachfhreastalaí (faoi réir teorainn rónna)
- `request_detail_logs` — loga mionsonraithe iarratais oidhreachta (bearrtar fós é má tá sé ann)

## Scéim Stórála

Cruthaíonn `ensureAuditLogSchema()` `audit_log` go leisciúil nuair a úsáidtear den chéad uair é:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Cruthaítear innéacsanna ar `timestamp`, `action`, `actor`, `resource_type`,
`status`, agus `request_id`. Cuirtear colúin atá in easnamh i mbunachair sonraí oidhreachta leis trí
`ALTER TABLE` de réir mar is gá.

## Coinneáil & Glanadh

Cloítear le dhá thréimhse choinneála ar leith:

| Athróg timpeallachta        | Réamhshocrú | Baineann sé le                                                    |
| --------------------------- | ----------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`         | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`         | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`    | Bearradh de réir teorainn rónna do `call_logs`                    |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`    | Bearradh de réir teorainn rónna do `proxy_logs`                   |

Ritheann `cleanupExpiredLogs()` an próiseas coinneála. Glaoitear air agus an freastalaí á thosú
ó `src/instrumentation-node.ts`. Logálann gach rith teagmhas iniúchta
`compliance.cleanup` ina bhfuil na comhairimh scriosta do gach tábla. Déantar bearradh logaí seachfhreastalaí/glaonna
i mbaisceanna (`BATCH_SIZE = 5000`) chun glasálacha fada scríofa a sheachaint.

Tá glanadh láimhe stair na n-iarratas ar leithligh ón gcoinneáil. Glaonn an leathanach Logaí Iarratais
ar `POST /api/settings/purge-request-history`, rud a scriosann `call_logs`,
`request_detail_logs` oidhreachta, agus déantáin áitiúla iarratais faoi
`${DATA_DIR}/call_logs/`.

Sainítear na réamhshocruithe in `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Díliostáil `noLog` (de réir eochair API)

Is féidir eochracha API a mharcáil ionas nach logáiltear a dtrácht glaonna iartheachtach. Tá an
bhratach i dtábla `api_keys` (`no_log INTEGER DEFAULT 0`) agus déantar í a scáthánú
i dtacar sa chuimhne le haghaidh cuardaigh ar an gconair the.

```bash
# Cruthaigh eochair gan logáil (fíordheimhniú bainistíochta riachtanach)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Feidhmeanna cúnta (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — scoránaigh an iontráil sa chuimhne
- `isNoLog(apiKeyId)` — seiceáiltear é ar chonair an iarratais; mura n-éiríonn leis sin, úsáidtear léamh
  taiscthe 30 s ó `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (athróg timpeallachta, scartha le camóga) — réamhlódáiltear isteach sa tacar sa chuimhne é
  ag am tosaithe; úsáideach nuair nach féidir leat an colún a scoránú go díreach

Ní dhéanann `noLog` difear do theagmhais iniúchta riaracháin (logáil isteach, athruithe soláthraí, glaonna uirlisí MCP, srl.) —
ní dhíliostáiltear ach logáil tráchta de réir iarratais.

## REST API

| Críochphointe               | Modh  | Cur síos                                                             | Fíordheimhniú |
| --------------------------- | ----- | -------------------------------------------------------------------- | ------------- |
| `/api/compliance/audit-log` | `GET` | Iontrálacha iniúchta riaracháin le huimhriú leathanach agus scagairí | management    |
| `/api/mcp/audit`            | `GET` | Iontrálacha iniúchta uirlisí MCP le huimhriú leathanach              | (open-sse)    |
| `/api/mcp/audit/stats`      | `GET` | Staitisticí comhiomlánaithe iniúchta MCP                             | (open-sse)    |

Ní chuirtear críochphointe easpórtála CSV ar fáil faoi láthair — easpórtáil ón deais nó cuir
ceist go díreach ar bhunachar sonraí SQLite.

### Iarratais a dhéanamh ar `/api/compliance/audit-log`

Paraiméadair iarratais a dtacaítear leo (tá siad uile roghnach, agus úsáideann gach ceann acu meaitseáil `LIKE %value%` le haghaidh
scagairí téacs):

- `action`, `actor`, `target`, `resourceType` (nó `resource_type`),
  `status`, `requestId` (nó `request_id`)
- `from` / `since`, `to` / `until` — stampaí ama ISO
- `limit` (réamhshocrú `50`, íosmhéid `1`, uasmhéid `500`)
- `offset` (réamhshocrú `0`, uasmhéid `10_000`)

Is eagar JSON é an freagra. Seoltar meiteashonraí an uimhrithe leathanach ar ais sna ceanntásca:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Deais

Cuireann an deais sonraí iniúchta ar fáil ag **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Tá dhá chluaisín ar an leathanach:

- **Comhlíonadh** (`ComplianceTab.tsx`) — teagmhais iniúchta riaracháin ó
  `/api/compliance/audit-log`. Scagtar de réir chineál an teagmhais, déine (faisnéis / rabhadh
  / criticiúil, díorthaithe ó ghníomh + stádas), agus raon dátaí. Ríomhtar an déine
  ar thaobh an chliaint ó na teaghráin ghnímh/stádais.
- **MCP** (`McpAuditTab.tsx`) — iniúchadh uirlisí MCP ó `/api/mcp/audit`, le
  scagairí de réir ainm na huirlise agus ratha/teipe.

Úsáideann an dá chluaisín uimhriú leathanach le méideanna leathanaigh de `50` (comhlíonadh) agus `25` (MCP).

## Feidhmeanna Cúnta do Dhintiúir Soláthraithe

Soláthraíonn `src/lib/compliance/providerAudit.ts` feidhmeanna cúnta múnlaithe a úsáideann na
bealaí bainistíochta soláthraithe nuair a astaíonn siad teagmhais dintiúr:

- `summarizeProviderConnectionForAudit(connection)` — baintear `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, agus
  `providerSpecificData.consoleApiKey` sula scríobhtar pictiúr reatha an naisc chuig
  `details`.
- `getProviderAuditTarget(connection)` — cumtar teaghrán cobhsaí
  `"<provider>:<name|id>"` don réimse `target`.
- `extractProviderWarnings(...payloads)` — déantar freagraí soláthraithe a scanadh le haghaidh
  rabhaidh bheartais/sábháilteachta (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) agus
  cuirtear suas le 5 thoradh ar fáil, agus gach ceann díobh teasctha go 400 carachtar.

## Dea-Chleachtais

- Marcáil eochracha API a láimhseálann PII (dlíthiúil, leighis, etc.) le `noLog: true`.
- Tiúináil `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` chun do
  bheartas coinneála a chomhlíonadh. Tá na réamhshocruithe 7 lá coimeádach.
- Easpórtáil an tábla iniúchta den ardán (`sqlite3 dump`) de réir cibé sceidil
  a éilíonn do chlár comhlíonta — níl aon chartlannú ionsuite ann.
- Rianaigh comhairimh `auth.login.failed` agus `auth.login.locked` chun
  ionsaithe brúidiúla a bhrath.
- Agus críochphointí nua riaracháin á gcur leis, glaoigh ar `logAuditEvent({ ... })` le teaghrán gnímh cobhsaí
  `domain.verb.outcome` agus cuir comhthéacs na hiarrata ar aghaidh trí
  `getAuditRequestContext(request)` ionas go ngabhfar an seoladh IP agus `requestId`
  go huathoibríoch.

## Féach Freisin

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — folú PII, instealladh leid
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — catalóg uirlisí MCP agus scóipeanna
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — tagairt iomlán d'athróga timpeallachta
- Foinse: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
