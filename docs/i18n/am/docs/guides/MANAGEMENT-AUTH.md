# Management Authentication (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute የአስተዳደር መንገዶችን ለመፍቀድ የሚችሉ **አራት የማረጋገጫ መረጃ ቤተሰቦች** አሉት።
እነዚህ እርስ በርስ የሚተካኩ አይደሉም። የInference API ቁልፎች (`sk-…`) በግልጽ ሁኔታ `manage` ወይም `admin` scope ካልተሰጣቸው በስተቀር
ሰርቨሩን **አያስተዳድሩም**።

መደበኛው ትግበራ፦ `src/lib/api/requireManagementAuth.ts`።

| የማረጋገጫ መረጃ            | የተለመደ ቅርጽ                          | የሚፈጠርበት ቦታ                                           | የታሰበለት አጠቃቀም            | የአስተዳደር ችሎታ                                                            |
| --------------------- | ---------------------------------- | ---------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| Dashboard JWT session | `auth_token` cookie                | ወደ Dashboard መግባት                                    | የBrowser UI             | ለCSRF፣ ለአካባቢያዊነት እና ሁልጊዜ ለተጠበቁ መንገዶች ደንቦች ተገዢ የሆነ ሙሉ የDashboard አስተዳደር |
| CLI machine-id token  | ውስጣዊ / አካባቢያዊ                      | የCLI bootstrap (በተመሳሳይ ማሽን ላይ `omniroute`)           | አካባቢያዊ CLI              | አካባቢያዊ አስተዳደር ብቻ                                                       |
| Scoped Access Token   | `oma_live_…`                       | **Settings → Access Tokens** ወይም `omniroute connect` | የርቀት CLI እና የአስተዳደር API | በመንገዱ የሚፈለገውን `read`፣ `write` ወይም `admin` scope ማሟላት አለበት              |
| Inference API key     | `sk-…` (እና ሌሎች የAPI ቁልፍ ቅድመ ቅጥያዎች) | **API Manager / API Keys**                           | `/v1/*` inference       | የቁልፉ metadata `manage` ወይም `admin` ካላካተተ በስተቀር **ምንም**                 |

`oma_` የማረጋገጫ መረጃዎች የአስተዳደር/CLI የማረጋገጫ መረጃዎች ናቸው። እነዚህ የInference API ቁልፎች **አይደሉም**።

ለሰርቨሩ የመግቢያ/API-ቁልፍ ማረጋገጫ ከተሰናከለ፣ አንዳንድ የአስተዳደር መንገዶች
ያልተረጋገጡ ጥሪዎችን ሊቀበሉ ይችላሉ። አካባቢያዊ-ብቻ እና ሁልጊዜ የተጠበቁ መንገዶች አሁንም
የራሳቸውን ደንቦች ይተገብራሉ። ስለዚህ ከእነዚህ የማረጋገጫ መረጃዎች አንዱን ማቅረብ በሁሉም ሁኔታ
ግዴታ አይደለም፤ እንዲሁም የሚፈለገው scope እና የመንገዱ አካባቢያዊነት ከሌሉ፣ አንዱን መያዝ ብቻ በሁሉም ሁኔታ
በቂ አይደለም።

ተዛማጅ፦ [የርቀት ሁነታ](./REMOTE-MODE.md) (`oma_live_…` ለርቀት CLI እንዴት እንደሚመነጭ)።

---

## የScope ማትሪክሶች

የAPI-ቁልፍ አስተዳደር scopes እና የaccess-token scopes የተለያዩ የቃላት ስብስቦች ናቸው።
የMCP መሣሪያ scopes ሦስተኛ የቃላት ስብስብ ሲሆኑ፣ ከታች ባሉት ሰንጠረዦች ውስጥ ካሉት
ሁለቱም functions ይልቅ `scopeMatches` በመጠቀም ይፈተሻሉ። ጎን ለጎን፦
[ሦስቱ የscope namespaces](../frameworks/MCP-SERVER.md#three-scope-namespaces)።

### የAccess Token scopes (`oma_live_…`)

| Scope   | የተለመዱ ክዋኔዎች                                                  |
| ------- | ------------------------------------------------------------ |
| `read`  | Tokenው እንዲያያቸው የተፈቀደለት የዝርዝር/ሁኔታ GETዎች                       |
| `write` | ከadmin በታች ያሉ ለውጦች (መፍጠር/ማዘመን/መሰረዝ)                          |
| `admin` | ሙሉ የርቀት CLI / connect token (የpassword bootstrap ነባሪ እዚህ ነው) |

`read` ያለው token የ`write` መንገድን መጥራት አይችልም። የRuntime መልዕክት ቅርጽ፦
`Access token scope '<have>' is insufficient; '<need>' required.`

### የAPI-ቁልፍ አስተዳደር scopes

| Scope    | ትርጉም                                                                 |
| -------- | -------------------------------------------------------------------- |
| (ምንም)    | Inference ብቻ። የአስተዳደር መንገዶች 403 ይመልሳሉ።                               |
| `manage` | የአስተዳደር API (ከ`requireManagementAuth` የAPI-ቁልፍ branch ጋር ተመሳሳይ gate) |
| `admin`  | `hasManageScope`ንም ያሟላል (አስተዳደር መቻል እንዳለው ይቆጠራል)                     |

በAPI Keys / API Manager UI ውስጥ `manage`ን በቁልፉ ላይ ያንቁ። ያንን scope ሆን ብለው
ካልሰጡት በስተቀር የchat client ቁልፍን ለautomation እንደገና አይጠቀሙ።

---

## እንዴት መፍጠር እና መሻር እንደሚቻል

### የዳሽቦርድ JWT ክፍለ-ጊዜ

1. `/login`ን ይክፈቱ፤ በአስተዳደር የይለፍ ቃል (በመጀመሪያው ማስነሻ `INITIAL_PASSWORD`) ይግቡ።
2. ኩኪ `auth_token` HttpOnly ነው። የአሳሽ ዳሽቦርዱ በራስ-ሰር ይጠቀምበታል።
3. በ`/api/auth/logout` በኩል ይውጡ። ለመቅዳት የሚቻል ለረጅም ጊዜ የሚቆይ ሚስጥር የለም።

### የCLI machine-id ቶከን

1. `omniroute`ን ከአገልጋዩ ጋር **በተመሳሳይ አስተናጋጅ** (loopback) ላይ ያሂዱ።
2. CLIው በ`~/.omniroute/` ስር የmachine-id ቶከን ያስጀምራል (chmod 600)።
3. ይህ ከሌላ ማሽን **አይሰራም**። ለርቀት CLI የመዳረሻ ቶከን ይጠቀሙ።

### ወሰን ያለው የመዳረሻ ቶከን (`oma_live_…`)

1. ዳሽቦርድ፦ **ቅንብሮች → የመዳረሻ ቶከኖች** → ይፍጠሩ (ስም + ወሰን)። **ሚስጥሩ አንድ ጊዜ ብቻ ይታያል።**
2. ወይም CLI፦ `omniroute connect <host>` (የይለፍ ቃል → ቶከን)። [የርቀት ሁነታ](./REMOTE-MODE.md)ን ይመልከቱ።
3. ራስጌ፦ `Authorization: Bearer oma_live_…`
4. ከዚያው የመዳረሻ ቶከኖች ገጽ ይሻሩት (ወይም የCLI ዐውዱን ይሰርዙ)።
5. አገልጋዩ ሃሽ ብቻ ያከማቻል። ግልጽ ጽሑፉን እንደ የይለፍ ቃል ይቆጥሩት።

### የmanage ወሰን ያለው API ቁልፍ

1. ዳሽቦርድ፦ **API አስተዳዳሪ / API ቁልፎች** → ቁልፍ ይፍጠሩ ወይም ያርትዑ → `manage`ን (ወይም `admin`ን) ያንቁ።
2. ራስጌ፦ `Authorization: Bearer sk-…` (የቁልፉ ትክክለኛ ቅድመ ቅጥያ)።
3. በዚያው UI ውስጥ ይሻሩት ወይም `manage`ን ያስወግዱ።
4. CLI ላልሆነ አውቶሜሽን ዝቅተኛውን ልዩ መብት ይጠቀሙ፦ GET-ብቻ ለሆኑ ሥራዎች `read` የመዳረሻ ቶከንን ይምረጡ፤ ጠሪው ከ`/v1` እና ከአስተዳደር ጋር መገናኘት ሲኖርበት ብቻ በAPI ቁልፍ ላይ `manage`ን ይጠቀሙ።

---

## የራስጌ ቅርጸት

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

የአስተዳደር ማረጋገጫዎችን በURL ዱካ ወይም በመጠይቅ ሕብረቁምፊ ውስጥ አያስቀምጡ። የአስተዳደር
ማረጋገጫ በራስጌ/ኩኪ ብቻ ነው።

---

## በቀጥታ ቀድተው የሚለጥፏቸው ምሳሌዎች

ለንባብ ብቻ (አቅራቢዎችን ይዘርዝሩ)። `read` የመዳረሻ ቶከን ይጠቀሙ፦

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

ማሻሻያ (የአቅራቢ ግንኙነት ይፍጠሩ)። `write`/`admin` የመዳረሻ ቶከን ወይም
የmanage ወሰን ያለው API ቁልፍ ይጠቀሙ፦

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

ግምት (አስተዳደር አይደለም)። መደበኛ API ቁልፍ፤ `manage` አያስፈልግም፦

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## የአሁኑ የአፈጻጸም ስህተቶች (ሚስጥሮችን መልሰው አያሳዩ)

| ሁኔታ                                 | የተለመደ ሁኔታ | መልዕክት (ሚስጥራዊ መረጃው የተወገደ)                                             |
| ----------------------------------- | --------- | -------------------------------------------------------------------- |
| ማረጋገጫ የለም                           | 401       | `Authentication required`                                            |
| ልክ ያልሆነ/ጊዜው ያለፈ `oma_live_…`        | 401       | `Invalid or expired access token`                                    |
| `manage`/`admin` የሌለው ትክክለኛ API ቁልፍ | 403       | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| በአስተዳደር ዱካ ላይ ልክ ያልሆነ መደበኛ API ቁልፍ  | 403       | `Invalid management token`                                           |
| የመዳረሻ ቶከኑ ወሰን በጣም ዝቅተኛ ነው           | 403       | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" ማለት bearerው እንደ አስተዳደር
ማረጋገጫ **ተቀባይነት አላገኘም** ማለት ነው። የትኛውን ዓይነት መፍጠር እንዳለብዎት **አይገልጽም**። ከላይ ያለውን ሰንጠረዥ ይጠቀሙ፦
የግምት ቁልፎች `manage` ወሰን ያስፈልጋቸዋል፤ የርቀት CLI `oma_live_…` ያስፈልገዋል፤ ዳሽቦርዱ
የክፍለ-ጊዜ ኩኪውን ይጠቀማል።

---

## የሚመከረው አነስተኛ-ፈቃድ ምርጫ

| ጥሪ አድራጊው                               | የሚጠቀመው                                       |
| -------------------------------------- | -------------------------------------------- |
| የድር አሳሽ                                | የDashboard ክፍለ-ጊዜ                            |
| በserver host ላይ ያለ CLI                 | የማሽን token                                   |
| ከርቀት server ጋር የሚገናኝ በlaptop ላይ ያለ CLI | ከ`omniroute connect` የሚገኝ `oma_live_…`       |
| CI / scripts (ለአስተዳደር ብቻ)              | በሚሰራው ትንሹ scope ያለው `oma_live_…`             |
| `/v1`ን እና `/api`ን ሁለቱንም መጥራት ያለበት CI   | `manage` ያለው API key **ወይም** ሁለት credentials |
