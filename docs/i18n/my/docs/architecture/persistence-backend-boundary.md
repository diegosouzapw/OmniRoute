# ADR: Pluggable persistence boundary (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **အခြေအနေ:** အဆိုပြုထားသည် — runtime လုပ်ငန်းမစတင်မီ ထိန်းသိမ်းသူ၏ အတည်ပြုချက် လိုအပ်သည်
- **ခြေရာခံ issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **နယ်ပယ်:** Persistence ဗိသုကာတစ်ခုတည်းသာ၊ ဤဆုံးဖြတ်ချက်သည် ပြင်ပ database တစ်ခုကို ထည့်သွင်းခြင်း သို့မဟုတ် ရွေးချယ်ခြင်း မပြုပါ

## အခြေအနေအရပ်ရပ်

လက်ရှိတွင် OmniRoute သည် `src/lib/db/` မှ domain-oriented persistence function များကို ဖော်ပြထားပြီး၊
`src/lib/db/core.ts` မှ ပြန်ပေးသော မျှဝေသုံး connection သည် `src/lib/db/adapters/types.ts` ရှိ synchronous `SqliteAdapter`
contract ကို အကောင်အထည်ဖော်ထားသည်။ ထို adapter သည် SQLite runtime အများအပြားကို ပံ့ပိုးသော်လည်း ၎င်း၏
မျက်နှာပြင်မှာ SQLite ပုံစံအတိုင်း ဆက်လက်ရှိနေသည်- synchronous prepared statement များ၊ `pragma`၊ deferred နှင့် immediate
transaction များ၊ native/file-copy backup၊ checkpoint နှင့် local database handle တို့ဖြစ်သည်။

လက်ရှိ startup နှင့် recovery လမ်းကြောင်းသည် SQLite file lifecycle ကိုလည်း တာဝန်ယူထားသည်။ `src/lib/db/core.ts` သည်
`storage.sqlite` ကို ရှာဖွေသတ်မှတ်ခြင်း၊ process-global adapter တစ်ခုကို ထိန်းသိမ်းခြင်း၊ WAL ကို checkpoint ပြုလုပ်ခြင်း၊ recovery
လုပ်စဉ် ရွေးချယ်ထားသော table များကို ထိန်းသိမ်းခြင်းနှင့် database တစ်ခုကို ပြန်လည်တည်ဆောက်သည့်အခါ SQLite companion file များကို
ဖယ်ရှားခြင်းတို့ ပြုလုပ်သည်။ `src/lib/db/adapters/driverFactory.ts` ရှိ driver ရွေးချယ်မှုသည် ပံ့ပိုးထားသော SQLite runtime များအကြား
ရွေးချယ်ခြင်းဖြစ်ပြီး၊ external-backend abstraction မဟုတ်ပါ။

Schema ပြောင်းလဲတိုးတက်မှုသည်လည်း အလားတူပင် ချိတ်ဆက်မှီခိုနေသည်။ `src/lib/db/migrationRunner.ts` သည် နံပါတ်စဉ်တပ်ထားသော SQL file များကို
အသုံးချခြင်း၊ `sqlite_master` နှင့် `PRAGMA table_info` ကို စစ်ဆေးခြင်း၊ optional FTS5 ပံ့ပိုးမှုကို ရှာဖွေဖော်ထုတ်ခြင်းနှင့် migration
လုပ်ငန်းများကို SQLite transaction များအတွင်း လုပ်ဆောင်ခြင်းတို့ ပြုလုပ်သည်။ `src/lib/db/backup.ts` နှင့်
`src/lib/db/optimizationSettings.ts` ကဲ့သို့သော operational module များသည် backup၊ `PRAGMA`၊ WAL၊ page-size၊ auto-vacuum နှင့် `VACUUM`
ဆိုင်ရာ လုပ်ဆောင်ပုံများကို တိုက်ရိုက်အသုံးပြုသည်။

ဤအချက်များသည် embedded SQLite deployment ၏ သင့်လျော်မှန်ကန်သော ဂုဏ်သတ္တိများဖြစ်သည်။ PostgreSQL သို့မဟုတ် MySQL ကို SQLite API အား
အတုယူအကောင်အထည်ဖော်ရန် အတင်းအကျပ်မပြုဘဲ ၎င်းတို့ကို ဆက်လက်အသုံးပြုနိုင်ရမည်။

## ဆုံးဖြတ်ချက်

ရွှေ့ပြောင်းအသုံးပြုနိုင်သော durable state အတွက် အဆင့်နှစ်ဆင့်ပါ persistence boundary ကို လက်ခံအသုံးပြုမည်-

1. **Domain repository contract များ** သည် business နှင့် routing
   code တို့လိုအပ်သော persistence operation များကို သတ်မှတ်သည်။ ခေါ်ယူအသုံးပြုသူများသည် SQL text၊ prepared statement၊
   database file သို့မဟုတ် dialect object များအပေါ်မဟုတ်ဘဲ domain behavior နှင့် domain data တို့အပေါ် မှီခိုသည်။
2. **Internal asynchronous backend contract တစ်ခု** သည် repository implementation များကို
   transaction context များ၊ health/readiness၊ migration coordination၊ backend capability များနှင့်
   အမျိုးအစားခွဲထားသော error များဖြင့် ပံ့ပိုးသည်။ တိကျသော TypeScript မျက်နှာပြင်ကို ပထမဆုံး implementation
   PR နှင့်အတူ အဆိုပြုမည်ဖြစ်ပြီး conformance test များဖြင့် သက်သေပြမည်။ ဤ ADR သည် ကြိုတင်ခန့်မှန်းထားသော API တစ်ခုကို ရည်ရွယ်ချက်ရှိရှိ အတည်မပြုသေးပါ။

SQLite သည် default implementation အဖြစ် ဆက်လက်တည်ရှိမည်။ Domain များကို vertical slice အသေးစားများဖြင့် ပြောင်းရွှေ့နေစဉ် လက်ရှိ SQLite driver cascade နှင့် synchronous
`SqliteAdapter` တို့သည် SQLite repository implementation ၏ နောက်ကွယ်တွင် ဆက်လက်တည်ရှိမည်။ မည်သည့် user ကိုမျှ external service တစ်ခု configure လုပ်ရန် မလိုအပ်စေပါ။

Repository boundary ကို SQLite နှင့် စမ်းသပ်သက်သေပြပြီးနောက် PostgreSQL သည် ပထမဆုံး အဆိုပြုထားသော external implementation ဖြစ်မည်။
MySQL သည် ဒုတိယ business-logic fork အဖြစ်မဟုတ်ဘဲ တူညီသော conformance suite ကို အသုံးပြုသည့် တန်းတူ implementation တစ်ခုအဖြစ် နောက်မှ လိုက်ပါမည်။

## Boundary စည်းမျဉ်းများ

### ရွှေ့ပြောင်းအသုံးပြုနိုင်သော repository မျက်နှာပြင်

ရွှေ့ပြောင်းအသုံးပြုနိုင်သော repository တစ်ခုသည် အောက်ပါတို့ကို ဖော်ပြနိုင်သည်-

- domain read နှင့် write များ၊
- တိကျရှင်းလင်းစွာ သတ်မှတ်ထားသော atomic operation များနှင့် transaction scope အတွင်း repository access၊
- concurrency semantics သည် domain ၏ အစိတ်အပိုင်းတစ်ခုဖြစ်သည့် compare/update သို့မဟုတ် lease operation များ၊
- backend-neutral pagination၊ ordering နှင့် constraint error များ။

Backend health၊ readiness နှင့် migration coordination တို့သည် domain repository တစ်ခုချင်းစီတွင် မပါဝင်ဘဲ internal backend/operational
contract တွင် ပါဝင်သည်။

ရွှေ့ပြောင်းအသုံးပြုနိုင်သော repository တစ်ခုသည် အောက်ပါတို့ကို မဖော်ပြရ-

- `prepare`၊ `get`၊ `all`၊ `run` သို့မဟုတ် raw driver handle များ၊
- `PRAGMA`၊ WAL checkpoint mode များ၊ `VACUUM` သို့မဟုတ် page/cache tuning၊
- SQLite file path များ၊ companion file များ သို့မဟုတ် file-copy backup၊
- cross-backend domain contract အဖြစ် `lastInsertRowid`၊
- FTS5 သို့မဟုတ် `sqlite-vec` syntax၊
- ပုံမှန် business code က အသုံးပြုသော generic dialect escape hatch။

### Backend capability မျက်နှာပြင်

Backend-specific behavior သည် တိကျရှင်းလင်းပြီး ရှာဖွေသိရှိနိုင်သည့်ပုံစံဖြင့် ဆက်လက်တည်ရှိမည်။ SQLite-only maintenance ကို
၎င်း၏ကိုယ်ပိုင် implementation နှင့် operational interface နောက်ကွယ်တွင် ထားရှိမည်ဖြစ်ပြီး အောက်ပါတို့ ပါဝင်သည်-

- runtime driver ရွေးချယ်မှု၊
- WAL checkpoint နှင့် SQLite shutdown behavior၊
- page-size၊ cache-size နှင့် auto-vacuum setting များ၊
- database-file backup၊ restore နှင့် recovery၊
- SQLite schema introspection၊
- FTS5 နှင့် `sqlite-vec` integration။

External backend တစ်ခုသည် ထို feature များကို အတုယူရန် မလိုအပ်ပါ။ Repository များသည် portable capability တစ်ခုကို အသုံးပြုရမည်၊
မှတ်တမ်းတင်ထားသော behavior ပါဝင်သည့် backend-specific implementation တစ်ခုကို ပံ့ပိုးရမည်၊ သို့မဟုတ် capability တစ်ခု မရရှိနိုင်ကြောင်း
အစီရင်ခံရမည်။

## Transaction နှင့် migration ပုံစံ

Repository API များက atomic business operation ကို သတ်မှတ်ပြီး ခေါ်ယူအသုံးပြုသူများက SQL transaction mode ကို မရွေးချယ်ရပါ။
Operation တစ်ခုချင်းစီသည် ၎င်း၏ ပြင်ပမှ လေ့လာနိုင်သော concurrency အာမခံချက်များဖြစ်သည့် ကာကွယ်ထားသော invariant များ၊ conflict
ရှာဖွေသတ်မှတ်ခြင်း၊ retry အမျိုးအစားခွဲခြားခြင်း၊ idempotency မျှော်မှန်းချက်များနှင့် transaction-context လက်ဆင့်ကမ်းခြင်းတို့ကို သတ်မှတ်ရမည်။
အဆိုပါ ပြင်ပမှ လေ့လာနိုင်သော အာမခံချက်များ တူညီနေသရွေ့ implementation များသည် မတူညီသော transaction နှင့် isolation ယန္တရားများကို
အသုံးပြုနိုင်သည်။ Operation ၏ contract ကို ဖြည့်ဆည်းနိုင်သည့်နေရာတွင် SQLite သည် လက်ရှိ deferred သို့မဟုတ် immediate
transaction လုပ်ဆောင်ပုံကို အတွင်းပိုင်း၌ ဆက်လက်အသုံးပြုနိုင်သည်။

Application replica အများအပြားက တူညီသော schema ပြောင်းလဲမှုကို တစ်ပြိုင်နက်လုပ်ဆောင်ရန် မယှဉ်ပြိုင်စေရန် external backend များတွင်
တိကျရှင်းလင်းသော migration ပိုင်ဆိုင်မှု သတ်မှတ်ချက် လိုအပ်သည်။ Backend migration history များသည် logical milestone များကို အတူတကွ
မျှဝေနိုင်သော်လည်း SQLite SQL
ဖိုင်များကို အခြား dialect တစ်ခုသို့ port ပြုလုပ်နိုင်သည် သို့မဟုတ် ပြန်လည်အသုံးပြုနိုင်သည်ဟု မယူဆရပါ။

## Backend များအကြား conformance ဆိုင်ရာ semantics

Conformance test များသည် repository method signature များကိုသာမက လုပ်ဆောင်ပုံကိုပါ လွှမ်းခြုံရမည်။ Migration ပြုလုပ်ပြီးသော domain
တစ်ခုချင်းစီသည် အောက်ပါတို့ကို သတ်မှတ်ပြီး စစ်ဆေးအတည်ပြုရမည်-

- timestamp ၏ timezone၊ precision နှင့် serialization;
- `NULL` ordering၊ collation နှင့် case-sensitivity မျှော်မှန်းချက်များ;
- JSON ကိုယ်စားပြုပုံနှင့် နှိုင်းယှဉ်ပုံ;
- integer၊ decimal နှင့် ငွေကြေးဆိုင်ရာ precision;
- pagination အတွက် တည်ငြိမ်သော ordering နှင့် အမြဲတမ်းတူညီသည့် tie-breaker များ;
- SQLite row ID များကို အားမကိုးသည့် ID ထုတ်လုပ်မှု;
- uniqueness နှင့် foreign-key ချိုးဖောက်မှု အမျိုးအစားခွဲခြားခြင်း;
- no-op၊ compare/update နှင့် delete operation များအတွက် affected-row လုပ်ဆောင်ပုံ;
- တစ်ပြိုင်နက်ရေးသားမှု ရလဒ်များ၊ retry လုပ်နိုင်သော conflict များနှင့် idempotent retry များ။

Domain တစ်ခုသည် တူညီသော ပြင်ပမှ လေ့လာနိုင်သည့် semantics များကို မသတ်မှတ်နိုင်ပါက ၎င်းကို port ပြုလုပ်ရန် အဆင်သင့်မဖြစ်သေးဘဲ
ယင်း contract ကို ဒီဇိုင်းရေးဆွဲပြီးသည်အထိ backend-specific အဖြစ် ဆက်လက်ထားရှိရမည်။

## Compatibility လိုအပ်ချက်များ

ဤ ADR ကို လိုက်နာသည့် မည်သည့် implementation မဆို အောက်ပါဂုဏ်သတ္တိများကို ထိန်းသိမ်းထားရမည်-

- SQLite သည် configuration မလိုအပ်သော မူလရွေးချယ်မှုအဖြစ် ဆက်ရှိရမည်။
- ရှိပြီးသား SQLite ဖိုင်များနှင့် migration history ကို ဆက်လက်ဖတ်ရှုနိုင်ရမည်။
- npm၊ Electron၊ Docker နှင့် restricted-runtime SQLite fallback များသည် ၎င်းတို့၏ လက်ရှိ startup path ကို ဆက်လက်အသုံးပြုနိုင်ရမည်။
- သိမ်းဆည်းထားသော provider credential များသည် လက်ရှိ application encryption လုပ်ဆောင်ပုံကို ဆက်လက်အသုံးပြုရမည်။
- Repository migration တစ်ခုသည် routing၊ quota၊ API-key သို့မဟုတ် audit semantics များကို အသိပေးခြင်းမရှိဘဲ မပြောင်းလဲရပါ။
- Backup နှင့် recovery လုပ်ဆောင်ပုံကို backend တစ်ခုချင်းစီအလိုက် မှတ်တမ်းတင်ရမည်ဖြစ်ပြီး အားလုံးအတွက် တစ်ပုံစံတည်းဟု မဖော်ပြရပါ။
- SQLite သီးသန့် clean installation တစ်ခုသည် external database driver ကို load မလုပ်ရသလို လိုအပ်မှုလည်း မရှိရပါ။

## ဖြန့်ချိမှု အစီအစဉ်

1. ပြန်လည်ထုတ်လုပ်နိုင်သော SQLite coupling inventory ကို သီးခြား review artifact တစ်ခုအဖြစ် ထုတ်ပြန်ပါ။
2. ပထမဆုံး domain repository contract များနှင့် conformance test များကို စတင်ထည့်သွင်းပါ။
3. မူလသတ်မှတ်ချက်များကို မပြောင်းလဲဘဲ ရှိပြီးသား SQLite implementation ကို ထို contract များ၏ နောက်ကွယ်တွင် လိုက်လျောညီထွေဖြစ်အောင် ပြင်ဆင်ပါ။
4. Maintainer ၏ ခွင့်ပြုချက်ရရှိပါက bounded control-plane slice တစ်ခုအတွက် PostgreSQL ကို ပထမဆုံး external implementation အဖြစ် ထည့်သွင်းပါ။
5. Concurrent-write နှင့် migration-ownership test များ ရှိပြီးမှသာ shared state ကို တိုးချဲ့ပါ။
6. Database ပြောင်းလဲအသုံးပြုနိုင်ကြောင်း မကြေညာမီ offline အသုံးပြုနိုင်ပြီး အတည်ပြုစစ်ဆေးထားသော SQLite-to-external migration path တစ်ခုကို ထည့်သွင်းပါ။
7. သက်သေပြပြီးသော repository နှင့် backend contract များအပေါ် အခြေခံ၍ MySQL ကို ထည့်သွင်းပါ။

Runtime အဆင့်တစ်ခုချင်းစီသည် သီးခြားစီ review လုပ်နိုင်သော PR တစ်ခုဖြစ်သည်။ နောက်ပိုင်းအဆင့်တစ်ခုကို အစောပိုင်းအဆင့်ရှိ
သက်သေမပြရသေးသော abstraction တစ်ခုအား merge လုပ်ရန် အကြောင်းပြချက်အဖြစ် အသုံးမပြုရပါ။

## ပထမဆုံး အကောင်အထည်ဖော်မှု အပိုင်း

ချိတ်ဆက်မှီခိုမှု စာရင်းကို ပြန်လည်သုံးသပ်ပြီးနောက် ပထမဆုံး runtime အပိုင်းကို ရွေးချယ်ရမည်။ Provider ချိတ်ဆက်မှုများ၊ API key များ၊ ပေါင်းစပ်မှုများနှင့် routing configuration တို့၏ အခြေခံဇယားများကို `src/lib/db/core.ts` တွင် မြင်တွေ့နိုင်သောကြောင့် ၎င်းတို့ကို ထည့်သွင်းစဉ်းစားနိုင်သော်လည်း ဤ ADR သည် ဇယားစာရင်းတစ်ခု သို့မဟုတ် migration PR တစ်ခုကို အတည်ပြုခြင်းမရှိပါ။ ယင်းအပိုင်းတွင် အောက်ပါတို့ ပါဝင်ရမည်-

- SQLite ၏ လုပ်ဆောင်ပုံကို မပြောင်းလဲဘဲ ထိန်းသိမ်းထားကြောင်း စမ်းသပ်မှုများ၊
- repository ကိုက်ညီမှု စမ်းသပ်မှုများ၊
- ရှင်းလင်းစွာ သတ်မှတ်ထားသော transaction နယ်နိမိတ်များ၊
- သိမ်းဆည်းထားသော အထောက်အထားများအတွက် ကုဒ်ဝှက်ခြင်းနှင့် ဖုံးကွယ်ခြင်းတို့ကို စစ်ဆေးအတည်ပြုမှု၊
- ပုံသေ startup configuration ကို ပြောင်းလဲခြင်းမရှိမှု။

## ထည့်သွင်းစဉ်းစားခဲ့သော အခြားရွေးချယ်စရာများ

### `SqliteAdapter` အောက်တွင် PostgreSQL ထည့်သွင်းခြင်း

ပယ်ချခဲ့သည်။ `SqliteAdapter` သည် SQLite runtime များအတွက် compatibility layer ဖြစ်ပြီး SQLite သီးသန့် လုပ်ဆောင်ချက်များကို ဖော်ထုတ်ပေးထားသည်။ ထို interface ကို အတုယူအကောင်အထည်ဖော်ပါက synchronous လုပ်ဆောင်မှုနှင့် dialect သီးသန့် ယူဆချက်များသည် backend အသစ်အတွင်းသို့ စိမ့်ဝင်သွားမည်ဖြစ်သည်။

### domain အားလုံးအတွက် ယေဘုယျ query/execute API တစ်ခုကို ဖော်ထုတ်ခြင်း

အဓိက နယ်နိမိတ်အဖြစ် ပယ်ချခဲ့သည်။ ၎င်းသည် connection ကိုင်တွယ်မှုကို ဗဟိုပြုနိုင်သော်လည်း SQL dialect၊ transaction နှင့် ဇယားချိတ်ဆက်မှီခိုမှုတို့ကို business module များအတွင်း ဆက်လက်ကျန်ရှိစေမည်ဖြစ်သည်။ Low-level backend primitive တစ်ခုသည် repository implementation များအတွင်း ရှိနိုင်သော်လည်း application-facing persistence API အဖြစ် မရှိသင့်ပါ။

### အပိုင်းတစ်ခုကို အတည်ပြုစစ်ဆေးခြင်းမပြုမီ persistence အားလုံးကို ပြန်လည်ရေးသားခြင်း

ပယ်ချခဲ့သည်။ လက်ရှိ persistence မျက်နှာပြင်သည် ကျယ်ပြန့်ပြီး file lifecycle၊ recovery၊ search နှင့် operational setting များ ပါဝင်သည်။ Vertical slice များသည် ပြန်လည်သုံးသပ်နိုင်သော လုပ်ဆောင်ပုံနှင့် rollback နယ်နိမိတ်များကို ပေးစွမ်းသည်။

### SQLite ကို ပုံသေအဖြစ်မှ အစားထိုးခြင်း

ပယ်ချခဲ့သည်။ Embedded နှင့် desktop deployment များသည် လက်ရှိ service မလိုအပ်သော startup model အပေါ် မှီခိုနေသည်။ External backend ကို အသုံးပြုရန် သီးခြားရွေးချယ်ရမည်ဖြစ်သည်။

### Redis ကို တာရှည်ခံ အဓိကဒေတာရင်းမြစ်အဖြစ် အသုံးပြုခြင်း

ပယ်ချခဲ့သည်။ Redis သည် ယာယီဖြစ်ကြောင်း ရှင်းလင်းစွာ သတ်မှတ်ထားသည့် coordination၊ cache သို့မဟုတ် counter များကို ပံ့ပိုးနိုင်သော်လည်း ဤနေရာတွင် ဖော်ပြထားသော durable repository contract ကို အစားမထိုးနိုင်ပါ။

## အကျိုးဆက်များ

### အပြုသဘောဆောင်သော အကျိုးများ

- Business code သည် database dialect နှင့် မသက်ဆိုင်သော တည်ငြိမ်သည့် persistence ချိတ်ဆက်နယ်နိမိတ်တစ်ခုကို ရရှိသည်။
- External backend တစ်ခုက abstraction ကို သတ်မှတ်မပေးမီ SQLite ၏ လုပ်ဆောင်ပုံကို စမ်းသပ်ထားသည်။
- PostgreSQL နှင့် MySQL တို့သည် domain logic ကို ထပ်မံရေးသားခြင်းအစား contract များနှင့် စမ်းသပ်မှုများကို အတူတကွ အသုံးပြုသည်။
- SQLite သီးသန့် စွမ်းဆောင်ရည်များသည် အတွင်းပိုင်းအချက်အလက်များ စိမ့်ထွက်စေသော compatibility shim များအဖြစ် ပြောင်းလဲမသွားဘဲ အဓိကအဆင့် စွမ်းဆောင်ရည်များအဖြစ် ဆက်လက်တည်ရှိသည်။
- Replica အများအပြားပါဝင်သော migration နှင့် transaction လုပ်ဆောင်ပုံတို့သည် ရှင်းလင်းသော ဒီဇိုင်းဆိုင်ရာ ထည့်သွင်းစဉ်းစားရမည့် အချက်များ ဖြစ်လာသည်။

### ကုန်ကျစရိတ်များနှင့် အန္တရာယ်များ

- Repository ခွဲထုတ်မှုအတွက် call-site များကို တစ်ဆင့်ချင်း ပြောင်းရွှေ့ရန် လိုအပ်သည်။
- Async နယ်နိမိတ်များသည် လက်ရှိ synchronous service code တစ်လျှောက် ပျံ့နှံ့သွားနိုင်သည်။
- Backend အမျိုးမျိုးကြား semantics များအတွက် SQL syntax compatibility ထက်ပိုသော conformance test များ လိုအပ်သည်။
- Backup၊ search၊ vector storage နှင့် maintenance တို့သည် capability သီးသန့်အဖြစ် ဆက်လက်တည်ရှိသည်။
- Persistence implementation တစ်ခုထက်ပို၍ အသုံးပြုခြင်းသည် CI နှင့် လုပ်ငန်းလည်ပတ်မှုဆိုင်ရာ ပံ့ပိုးမှုကုန်ကျစရိတ်ကို တိုးစေသည်။

## ရည်ရွယ်ချက်တွင် မပါဝင်သောအရာများ

ဤ ADR သည် အောက်ပါတို့ကို မလုပ်ဆောင်ပါ-

- database dependency၊ environment variable၊ schema သို့မဟုတ် migration တစ်ခု ထည့်သွင်းခြင်း၊
- လက်ရှိအသုံးပြုနေသော SQLite singleton သို့မဟုတ် driver cascade ကို ပြောင်းလဲခြင်း၊
- သတ်မှတ်ထားသော release တစ်ခုတွင် PostgreSQL သို့မဟုတ် MySQL ပံ့ပိုးမှုရရှိမည်ဟု ကတိပြုခြင်း၊
- FTS5၊ `sqlite-vec`၊ backup file များ သို့မဟုတ် SQLite maintenance ကို အခြားစနစ်များသို့ ပြောင်းရွှေ့အသုံးပြုနိုင်အောင် ပြုလုပ်ခြင်း၊
- shared-state နှင့် coordination စမ်းသပ်မှုများ မရှိမီ active-active အဆင်သင့်ဖြစ်မှုကို သတ်မှတ်ခြင်း၊
- `src/lib/db/` ကို တစ်ကြိမ်တည်း အပြီးအစီး ပြန်လည်ရေးသားရန် အတည်ပြုခြင်း။

## ထိန်းသိမ်းသူ၏ အတည်ပြုချက်လိုအပ်သော မေးခွန်းများ

1. Repository နှင့် internal async backend boundary ကို ပိုမိုသင့်လျော်သော ဦးတည်ချက်အဖြစ် သတ်မှတ်ထားပါသလား၊ သို့မဟုတ်
   external persistence ကို သီးခြား control-plane service နောက်ကွယ်တွင် ထားရှိသင့်ပါသလား။
2. SQLite conformance ပြီးနောက် ပထမဆုံး external implementation အဖြစ် PostgreSQL ကို လက်ခံနိုင်ပါသလား။
3. မည်သည့် domain ကို ပထမဆုံး bounded repository slice အဖြစ် သတ်မှတ်သင့်ပါသလဲ။
4. ပထမဆုံး multi-replica milestone အတွက် မည်သည့် state ကို မျှဝေသုံးစွဲရမည်ဖြစ်ပြီး မည်သည့် state က node-local အဖြစ် ဆက်လက်ရှိနေမည်နည်း။
5. ရပ်တန့်သွားသော သို့မဟုတ် rollback လုပ်ထားသော repository migration အတွက် မည်သည့် compatibility window ကို လိုအပ်ပါသလဲ။

ဤမေးခွန်းများကို မဖြေရှင်းရသေးသရွေ့ ဤစာတမ်းသည် အဆိုပြုချက်တစ်ခုသာဖြစ်ပြီး runtime refactor ပြုလုပ်မည်ဟု မဆိုလိုပါ။
