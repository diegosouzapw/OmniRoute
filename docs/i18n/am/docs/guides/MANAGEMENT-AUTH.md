# Management Authentication (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute የአስተዳደር መስመሮችን ለመፍቀድ የሚያስችሉ **አራት የማረጋገጫ መረጃ ቤተሰቦች** አሉት።
እነዚህ እርስ በርስ ሊተካኩ አይችሉም። የInference API ቁልፎች (`sk-…`) በግልጽ `manage` ወይም `admin` ወሰን ካልተሰጣቸው በስተቀር አገልጋዩን **አያስተዳድሩም**።

ቀኖናዊ ትግበራ፦ `src/lib/api/requireManagementAuth.ts`።

| የማረጋገጫ መረጃ          | የተለመደ ቅርጽ                          | የሚፈጠርበት ቦታ                                     | የታሰበለት አጠቃቀም            | የአስተዳደር ችሎታ                                                      |
| ------------------- | ---------------------------------- | ---------------------------------------------- | ----------------------- | ---------------------------------------------------------------- |
| የዳሽቦርድ JWT ክፍለ ጊዜ   | `auth_token` ኩኪ                    | ወደ ዳሽቦርድ መግባት                                  | የአሳሽ UI                 | በCSRF፣ በአካባቢያዊነት እና ሁልጊዜ በሚጠበቁ መስመሮች ደንቦች የሚገደብ ሙሉ የዳሽቦርድ አስተዳደር |
| የCLI machine-id ቶከን | ውስጣዊ / አካባቢያዊ                      | የCLI ማስጀመሪያ (`omniroute` በተመሳሳይ ማሽን ላይ)        | አካባቢያዊ CLI              | የአካባቢ አስተዳደር ብቻ                                                  |
| ወሰን ያለው የመዳረሻ ቶከን   | `oma_live_…`                       | **ቅንብሮች → የመዳረሻ ቶከኖች** ወይም `omniroute connect` | የርቀት CLI እና የአስተዳደር API | መስመሩ የሚጠይቀውን `read`፣ `write` ወይም `admin` ወሰን ማሟላት አለበት           |
| የInference API ቁልፍ  | `sk-…` (እና ሌሎች የAPI ቁልፍ ቅድመ ቅጥያዎች) | **API አስተዳዳሪ / API ቁልፎች**                      | `/v1/*` inference       | የቁልፉ ሜታዳታ `manage` ወይም `admin`ን ካላካተተ በስተቀር **ምንም**              |

`oma_` የማረጋገጫ መረጃዎች የአስተዳደር/CLI የማረጋገጫ መረጃዎች ናቸው። እነሱ የInference API ቁልፎች **አይደሉም**።

ለአገልጋዩ የመግቢያ/API-ቁልፍ ማረጋገጫ ከተሰናከለ፣ አንዳንድ የአስተዳደር መስመሮች ያልተረጋገጡ ጥሪዎችን ሊቀበሉ ይችላሉ። አካባቢያዊ-ብቻ እና ሁልጊዜ የሚጠበቁ መስመሮች አሁንም የራሳቸውን ደንቦች ይተገብራሉ። ስለዚህ ከእነዚህ የማረጋገጫ መረጃዎች አንዱን ማቅረብ በሁሉም ሁኔታ ግዴታ አይደለም፤ እንዲሁም የሚፈለገው ወሰን እና የመስመሩ አካባቢያዊነት ከሌሉ አንዱን መያዝ በሁሉም ሁኔታ በቂ አይደለም።

ተዛማጅ፦ [የርቀት ሁነታ](./REMOTE-MODE.md) (`oma_live_…` ለርቀት CLI እንዴት እንደሚፈጠር)።

---

## የወሰን ማትሪክሶች

የAPI ቁልፍ አስተዳደር ወሰኖች እና የመዳረሻ ቶከን ወሰኖች የተለያዩ የቃላት ስብስቦች ናቸው።
የMCP መሣሪያ ወሰኖች ሦስተኛ የቃላት ስብስብ ሲሆኑ፣ ከታች ባሉት ሰንጠረዦች ውስጥ ካሉት ሁለቱ ፈንክሽኖች በአንዱ ሳይሆን `scopeMatches`ን በመጠቀም ይፈተሻሉ። ጎን ለጎን ለማየት፦
[ሦስቱ የወሰን ስም ክፍተቶች](../frameworks/MCP-SERVER.md#three-scope-namespaces)።

### የመዳረሻ ቶከን ወሰኖች (`oma_live_…`)

| ወሰን     | የተለመዱ ክወናዎች                                                |
| ------- | ---------------------------------------------------------- |
| `read`  | ቶከኑ እንዲያያቸው የተፈቀደለትን ዝርዝር/ሁኔታ GET ጥያቄዎች                    |
| `write` | ከአስተዳዳሪ በታች ያሉ ለውጦች (መፍጠር/ማዘመን/መሰረዝ)                       |
| `admin` | ሙሉ የርቀት CLI / የግንኙነት ቶከን (የይለፍ ቃል መነሻ ማዋቀሪያ በነባሪ እዚህ ይሆናል) |

`read` ያለው ቶከን የ`write` መስመርን መጥራት አይችልም። በሩጫ ጊዜ የመልዕክቱ ቅርጽ፦
`Access token scope '<have>' is insufficient; '<need>' required.`

### የAPI ቁልፍ አስተዳደር ወሰኖች

| ወሰን      | ትርጉም                                                               |
| -------- | ------------------------------------------------------------------ |
| (የለም)    | ግምት ማካሄድ ብቻ። የአስተዳደር መስመሮች 403 ይመልሳሉ።                              |
| `manage` | የአስተዳደር API (ከ`requireManagementAuth` API-ቁልፍ ቅርንጫፍ ጋር ተመሳሳይ መግቢያ) |
| `admin`  | `hasManageScope`ንም ያሟላል (የአስተዳደር ብቃት እንዳለው ይቆጠራል)                  |

በAPI Keys / API Manager የተጠቃሚ በይነገጽ ውስጥ ለቁልፉ `manage`ን ያንቁ። ያንን ወሰን ሆን ብለው ካልሰጡት በስተቀር፣
የውይይት ደንበኛ ቁልፍን ለአውቶሜሽን ዳግም አይጠቀሙ።

---

## እንዴት መፍጠር እና መሻር እንደሚቻል

### የዳሽቦርድ JWT ክፍለ ጊዜ

1. `/login`ን ክፈትና በአስተዳደር የይለፍ ቃል (በመጀመሪያው ማስነሻ `INITIAL_PASSWORD`) ግባ።
2. `auth_token` ኩኪው HttpOnly ነው። የአሳሽ ዳሽቦርዱ በራስ-ሰር ይጠቀምበታል።
3. በ`/api/auth/logout` በኩል ውጣ። ለመቅዳት የሚቻል ረጅም ጊዜ የሚቆይ ሚስጥር የለም።

### የCLI machine-id ቶከን

1. `omniroute`ን ከአገልጋዩ ጋር **በተመሳሳይ ሆስት** ላይ (loopback) አሂድ።
2. CLIው በ`~/.omniroute/` ስር machine-id ቶከን ያስነሳል (chmod 600)።
3. ይህ ከሌላ ማሽን **አይሰራም**። ለርቀት CLI Access Token ተጠቀም።

### ወሰን ያለው Access Token (`oma_live_…`)

1. ዳሽቦርድ፦ **ቅንብሮች → የመዳረሻ ቶከኖች** → ፍጠር (ስም + ወሰን)። **ሚስጥሩ አንድ ጊዜ ብቻ ይታያል።**
2. ወይም CLI፦ `omniroute connect <host>` (የይለፍ ቃል → ቶከን)። [የርቀት ሁነታ](./REMOTE-MODE.md)ን ይመልከቱ።
3. ራስጌ፦ `Authorization: Bearer oma_live_…`
4. ከተመሳሳዩ የመዳረሻ ቶከኖች ገጽ ላይ ሻር (ወይም የCLI ዐውዱን ሰርዝ)።
5. አገልጋዩ የሚያከማቸው ሃሽን ብቻ ነው። ግልጽ ጽሑፉን እንደ የይለፍ ቃል ያዙት።

### `manage` ወሰን ያለው API ቁልፍ

1. ዳሽቦርድ፦ **API Manager / API ቁልፎች** → ቁልፍ ፍጠር ወይም አርትዕ → `manage`ን (ወይም `admin`ን) አንቃ።
2. ራስጌ፦ `Authorization: Bearer sk-…` (የቁልፉ ትክክለኛ ቅድመ ቅጥያ)።
3. በተመሳሳዩ UI ውስጥ ሻር ወይም `manage`ን አስወግድ።
4. CLI ላልሆነ አውቶሜሽን ዝቅተኛውን መብት ይጠቀሙ፦ GET-ብቻ ለሆኑ ስራዎች `read` Access Tokenን ይምረጡ፤ ጠሪው `/v1`ንም ሆነ አስተዳደርን መጠቀም ሲኖርበት ብቻ በAPI ቁልፍ ላይ `manage`ን ይጠቀሙ።

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

## ቀድቶ ለመለጠፍ የሚያገለግሉ ምሳሌዎች

ለንባብ ብቻ (አቅራቢዎችን ዘርዝር)። የ`read` Access Token ይጠቀሙ፦

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

ለማሻሻል (የአቅራቢ ግንኙነት ፍጠር)። የ`write`/`admin` Access Token ወይም
የ`manage` ወሰን ያለው API key ይጠቀሙ፦

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

ኢንፈረንስ (አስተዳደር አይደለም)። መደበኛ API key፤ `manage` አያስፈልግም፦

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## የአሁኑ የአሂድ ጊዜ ስህተቶች (ሚስጥሮችን መልሰው አያሳዩ)

| ሁኔታ                                  | የተለመደ ሁኔታ ኮድ | መልዕክት (ሚስጥራዊ መረጃዎች የተወገዱበት)                             |
| ------------------------------------ | ------------ | ------------------------------------------------------- |
| የማረጋገጫ መረጃ የለም                       | 401          | `ማረጋገጫ ያስፈልጋል`                                          |
| ልክ ያልሆነ/ጊዜው ያለፈበት `oma_live_…`       | 401          | `ልክ ያልሆነ ወይም ጊዜው ያለፈበት የመዳረሻ ቶከን`                       |
| `manage`/`admin` የሌለው ትክክለኛ API ቁልፍ  | 403          | `API ቁልፉ የ'manage' ወሰን የለውም። በAPI Keys ዳሽቦርድ ውስጥ ያንቁት።` |
| በአስተዳደር መስመር ላይ ልክ ያልሆነ መደበኛ API ቁልፍ | 403          | `ልክ ያልሆነ የአስተዳደር ቶከን`                                   |
| የAccess Token ወሰን በጣም ዝቅተኛ ነው        | 403          | `የመዳረሻ ቶከኑ ወሰን '<have>' በቂ አይደለም፤ '<need>' ያስፈልጋል።`     |

"ልክ ያልሆነ የአስተዳደር ቶከን" ማለት bearer እንደ የአስተዳደር
ማረጋገጫ መረጃ **ተቀባይነት አላገኘም** ማለት ነው። የትኛውን ዓይነት ማመንጨት እንዳለብዎት **አይነግርዎትም**። ከላይ ያለውን ሰንጠረዥ ይጠቀሙ፦
የinference ቁልፎች `manage` ወሰን ያስፈልጋቸዋል፤ የርቀት CLI `oma_live_…` ያስፈልገዋል፤ ዳሽቦርዱ
የsession cookieን ይጠቀማል።

---

## የሚመከር ዝቅተኛ-ፈቃድ ምርጫ

| ጥሪ አድራጊው                            | የሚጠቀመው                                   |
| ----------------------------------- | ---------------------------------------- |
| ድር አሳሽ                              | የዳሽቦርድ ክፍለ-ጊዜ                            |
| በአገልጋይ አስተናጋጁ ላይ ያለ CLI             | የማሽን ቶከን                                 |
| ከርቀት አገልጋይ ጋር የሚገናኝ በላፕቶፕ ላይ ያለ CLI | ከ`omniroute connect` የተገኘ `oma_live_…`   |
| CI / ስክሪፕቶች (ለአስተዳደር ብቻ)            | ከሚሰሩት ውስጥ ትንሹ የፈቃድ ወሰን ያለው `oma_live_…`  |
| ሁለቱንም `/v1` እና `/api` መጥራት ያለበት CI  | `manage` ያለው API ቁልፍ **ወይም** ሁለት ማረጋገጫዎች |
