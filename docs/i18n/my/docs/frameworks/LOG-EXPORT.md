# Log export (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute ခေါ်ဆိုမှုမှတ်တမ်းများကို ပြင်ပ analytics store တစ်ခုသို့ စဉ်ဆက်မပြတ်၊ တိုးပွားပုံစံဖြင့် export လုပ်ခြင်း။

Logs dashboard tab သည် request history ကို SQLite (`call_logs`) တွင် သိမ်းဆည်းထားပြီး၊ ၎င်းကို
rotation နှင့် retention တို့ဖြင့် ကန့်သတ်ထားသည်။ Log export သည် တူညီသော record အစုကို သတ်မှတ်ထားသည့် အချိန်ဇယားအတိုင်း
ပြင်ပသို့ ပို့ပေးသောကြောင့် local database ထက် ပိုမိုကြာရှည်စွာ သိမ်းဆည်းနိုင်ပြီး အခြား data များနှင့် ချိတ်ဆက်အသုံးပြုနိုင်သည်။ BigQuery သည် ပထမဆုံး destination ဖြစ်ပြီး၊
pipeline သည် registry တစ်ခုဖြစ်သောကြောင့် နောက်ထပ် destination များကို ထပ်မံထည့်သွင်းနိုင်သည်။

---

## 1. အလုပ်လုပ်ပုံ

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs tab ၏ field အစု)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **အချိန်ဇယား** — `JobRegistry` cron job တစ်ခုဖြစ်သည့် `log_export` ကို အသုံးပြုပြီး၊ ပုံသေအားဖြင့် `0 * * * *` (နာရီတိုင်း၊
  UTC) သတ်မှတ်ထားသည်။ `src/lib/initCloudSync.ts` တွင် register လုပ်ထားပြီး `OMNIROUTE_LOG_EXPORT_CRON` ဖြင့် ပြောင်းလဲသတ်မှတ်နိုင်သည်။
  tick တစ်ကြိမ်စီတွင် **ဖွင့်ထားသော** destination အားလုံးကို တစ်ခုပြီးတစ်ခု အစဉ်လိုက် အပြည့်အဝ ပို့ဆောင်သည်။
- **Cursor** — SQLite ၏ အလိုအလျောက်ပါရှိသည့် `call_logs.rowid` ကို အသုံးပြုပြီး destination တစ်ခုစီအလိုက်
  `log_export_destinations.cursor_row_id` တွင် သိမ်းဆည်းထားသည်။ `timestamp` ကို cursor အဖြစ် တမင်အသုံးမပြုထားပါ။ အကြောင်းမှာ caller များက
  ၎င်းတို့၏ ကိုယ်ပိုင်တန်ဖိုးကို ပေးနိုင်သောကြောင့် နောက်မှစတင်သော်လည်း ပိုမြန်သည့် request ပြီးနောက် နှေးကွေးသည့် request ကို ရေးသွင်းနိုင်ပြီး၊
  timestamp cursor အသုံးပြုပါက ထို request ကို ကျော်သွားမည်ဖြစ်သည်။
- **Batching** — request တစ်ခုလျှင် `batch_size` row (ပုံသေ 500)၊ run တစ်ကြိမ်လျှင်
  `max_rows_per_run` row (ပုံသေ 10000) ကို အသုံးပြုသည်။ ထို့ကြောင့် ကြီးမားသော backlog ကို run တစ်ကြိမ်တည်းတွင် ပိတ်ဆို့မနေစေဘဲ
  tick အကြိမ်များစွာအတွင်း တဖြည်းဖြည်း ပို့ဆောင်နိုင်သည်။
- **ပို့ဆောင်ခြင်း** — `send()` အောင်မြင်စွာ ပြီးဆုံးပြီးမှသာ cursor ကို ရှေ့တိုးသည်။ batch တစ်ခု မအောင်မြင်ပါက
  cursor သည် မူလနေရာတွင်သာ ကျန်ရှိသဖြင့် နောက် run တွင် တူညီသော row များကို ထပ်မံကြိုးစားပို့ဆောင်မည်။ အာမခံချက်မှာ
  အနည်းဆုံးတစ်ကြိမ် ပို့ဆောင်ခြင်းနှင့် destination ဘက်မှ de-duplication ပြုလုပ်ခြင်းဖြစ်ပြီး၊ စစ်မှန်သော exactly-once မဟုတ်ပါ။ BigQuery သည် row တစ်ခုစီကို
  call-log id ဖြင့် key သတ်မှတ်ပြီး ၎င်း၏ dedup window အတွင်း best-effort အနေဖြင့်သာ ထို key ကို အသုံးပြုသည်။
- **Overlap ကာကွယ်မှု** — cron tick နှင့် `POST .../run` သည် တစ်ချိန်တည်းတွင် လုပ်ဆောင်နိုင်သည်။ ပို့ဆောင်နေပြီးဖြစ်သော destination ကို
  နှစ်ကြိမ်ပို့ဆောင်မည့်အစား ကျော်သွားမည် (`skipped: true` ကို run result တွင် ဖော်ပြသည်)။
  ထို့ကြောင့် တစ်ပြိုင်နက်တည်း run များက batch တစ်ခုကို ပြန်လည်ပို့ခြင်း သို့မဟုတ် cursor ကို နောက်ပြန်ရေးခြင်း မပြုနိုင်ပါ။
- **Purge ပြီးနောက် ပြန်လည်ရယူခြင်း** — `cursor_row_id` သည် `MAX(rowid)` ထက် မြင့်သွားပါက (table တစ်ခုလုံးကို
  purge လုပ်ထားပြီး rowid များ ပြန်လည်စတင်သည့်အခါ) runner သည် အပြီးအပိုင် record မတွေ့တော့ခြင်းကို ရှောင်ရှားရန် 0 သို့ ပြန်လည်ရွှေ့ပေးသည်။

### Payload များ (prompt များနှင့် completion များ)

ပုံသေအားဖြင့် export တွင် Logs **list** က ပြသသည့် summary field များသာ ပါဝင်သည်။
**Export prompts and responses** (`includeBodies`) ကို ဖွင့်ခြင်းဖြင့် Logs **detail**
pane က ခေါ်ဆိုမှုတစ်ခုစီအတွက် ပြသသည့် အောက်ပါအချက်အလက်များကိုလည်း ပို့ဆောင်ပေးသည်။

| Field                            | ပါဝင်သည့်အကြောင်းအရာ                                                  |
| -------------------------------- | --------------------------------------------------------------------- |
| `request_body` / `response_body` | dashboard က render လုပ်ပြသသည့် ခေါ်ဆိုမှု payload များ                |
| `pipeline_route_decision`        | router က ရွေးချယ်ခဲ့သည့် target နှင့် model                           |
| `pipeline_client_request`        | client က ပို့ခဲ့သည့်အတိုင်း အတိအကျဖြစ်သော raw request                 |
| `pipeline_openai_request`        | internal OpenAI ပုံစံသို့ ပြောင်းလဲပြီးနောက် ရရှိသည့် request         |
| `pipeline_provider_request`      | provider dialect ဖြင့် upstream သို့ အမှန်တကယ် ပို့ခဲ့သည့် request    |
| `pipeline_provider_response`     | raw upstream response                                                 |
| `pipeline_client_response`       | caller ထံ ပြန်ပေးခဲ့သည့် response                                     |
| `pipeline_error`                 | မအောင်မြင်သော ခေါ်ဆိုမှုအတွက် pipeline-level error အသေးစိတ်           |
| `bodies_truncated`               | အထက်ပါ field တစ်ခုခုသည် `maxBodyBytes` အကန့်အသတ်သို့ ရောက်ခဲ့ပါက True |

ဤအချက်အလက်များသည် prompt content ဖြစ်သောကြောင့် ပုံသေအားဖြင့် **ပိတ်ထားပြီး** destination တစ်ခုစီအလိုက် ရွေးချယ်နိုင်ရန် တမင်ဒီဇိုင်းပြုလုပ်ထားသည်။
ပို့ဆောင်သည့်အရာသည် dashboard တွင် ပြသသည့်အရာနှင့် တူညီသည်။ အကြောင်းမှာ နှစ်ခုစလုံးသည် `getCallLogById` မှတစ်ဆင့် ဖတ်ရှုသောကြောင့်ဖြစ်သည်။ payload များကို
ရေးသွင်းသည့်အချိန်တွင် PII-sanitised နှင့် secret-redacted လုပ်ထားပြီးဖြစ်ကာ၊ `noLog` API key ဖြင့် ပြုလုပ်သည့် ခေါ်ဆိုမှုတွင်
payload လုံးဝမသိမ်းဆည်းသောကြောင့် export လုပ်ရန် အချက်အလက် မရှိပါ။

Payload များကို filesystem artifact မှ row တစ်ခုချင်းစီအလိုက် ဖတ်ရှုသောကြောင့် ၎င်းတို့ကို တောင်းဆိုထားသည့် destination များအတွက်သာ
hydration ကို လုပ်ဆောင်သည်။ artifact ပျောက်ဆုံးနေသော သို့မဟုတ် ပျက်စီးနေသော row သည် batch ကို မအောင်မြင်စေဘဲ cursor ကို ရပ်တန့်မထားစေရန်
၎င်း၏ summary ကို null payload များဖြင့် export လုပ်သည်။

`maxBodyBytes` (ပုံသေ 262144) သည် field တစ်ခုစီ၏ အရွယ်အစားကို ကန့်သတ်သည်။ ပိုရှည်သော payload များကို
**ဖယ်ရှားမည့်အစား ဖြတ်တောက်သည်** — ဖြတ်တောက်ထားသည့် prompt တစ်ခုသည်ပင် "ဘာမေးခဲ့သလဲ" ဆိုသည်ကို ဖြေဆိုနိုင်ဆဲဖြစ်သည် — ထို့နောက် row ကို
`bodies_truncated` ဖြင့် အမှတ်အသားပြုသည်။ Stream လုပ်ထားသည့် chunk-by-chunk delta များကို export မလုပ်ပါ။ စုစည်းပြီးသား response သည်
`pipeline_provider_response` နှင့် `pipeline_client_response` တွင် ပါဝင်ပြီးဖြစ်သည်။

---

## 2. ဖိုင်များ

| အစိတ်အပိုင်း         | တည်နေရာ                                      |
| -------------------- | -------------------------------------------- |
| Destination contract | `src/lib/logExport/types.ts`                 |
| Registry             | `src/lib/logExport/registry.ts`              |
| Secret ကိုင်တွယ်မှု  | `src/lib/logExport/secrets.ts`               |
| Runner (cursor loop) | `src/lib/logExport/runner.ts`                |
| API projection       | `src/lib/logExport/presenter.ts`             |
| BigQuery destination | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA auth       | `src/lib/logExport/googleServiceAccount.ts`  |
| Call-log source      | `src/lib/usage/callLogExportSource.ts`       |
| ဒေတာသိမ်းဆည်းမှု     | `src/lib/db/logExportDestinations.ts`        |
| Cron job             | `src/lib/jobs/logExportJob.ts`               |
| REST layer           | `src/app/api/log-export/`                    |
| Dashboard စာမျက်နှာ  | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`။

---

## 3. REST API

Route အားလုံးတွင် စီမံခန့်ခွဲမှုဆိုင်ရာ အထောက်အထားစစ်ဆေးခြင်း (`requireManagementAuth`) ပါဝင်သည်။ Secret များကို မည်သည့်အခါမျှ ပြန်မပေးပါ-
သိမ်းဆည်းထားသော secret ကို စာသားအတိအကျ `__stored__` အဖြစ် ပြန်ပေးပြီး update လုပ်စဉ် ထိုတန်ဖိုးကို ပြန်ပို့ခြင်းက
သိမ်းဆည်းထားသော credential ကို ဆက်လက်ထိန်းသိမ်းထားသည်။

Secret ပါရှိကြောင်း type က သတ်မှတ်ထားသော destination တစ်ခုကို ဖန်တီးခြင်း သို့မဟုတ် update လုပ်ခြင်းအတွက် **`STORAGE_ENCRYPTION_KEY`
လိုအပ်သည်**။ ၎င်းမရှိပါက `encrypt()` သည် အသံတိတ် passthrough အဖြစ် လုပ်ဆောင်သောကြောင့် credential ကို
SQLite ထဲသို့ plaintext ဖြင့် ထည့်မည့်အစား write ကို 400 ဖြင့် ငြင်းပယ်သည် (Telegram webhook တွင် သုံးသည့် guard နှင့် အတူတူဖြစ်သည်)။

| Method   | Path                                     | ရည်ရွယ်ချက်                                                                 |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destination type များ + ၎င်းတို့၏ config field စာရင်း                       |
| `GET`    | `/api/log-export/destinations`           | Destination များကို စာရင်းပြုစုခြင်း (secret များကို ဖုံးကွယ်ထားသည်)        |
| `POST`   | `/api/log-export/destinations`           | Destination တစ်ခု ဖန်တီးခြင်း                                               |
| `GET`    | `/api/log-export/destinations/{id}`      | တစ်ခုကို ဖတ်ရှုခြင်း                                                        |
| `PUT`    | `/api/log-export/destinations/{id}`      | အမည် / enabled / config / batching ကို update လုပ်ခြင်း                     |
| `DELETE` | `/api/log-export/destinations/{id}`      | ဖျက်ခြင်း                                                                   |
| `POST`   | `/api/log-export/destinations/{id}/test` | Credential များကို စမ်းသပ်စစ်ဆေးပြီး မည်သည့်အရာမျှ မရေးခြင်း                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ချက်ချင်း drain လုပ်ခြင်း၊ scheduled run နှင့် တူညီသော path ကို အသုံးပြုသည် |
| `GET`    | `/api/log-export/status`                 | Cron အခြေအနေ၊ လတ်တလော run များ၊ target တစ်ခုစီ၏ backlog                     |

`GET /api/log-export/types` ကြောင့် UI သည် generic ဖြစ်လာသည်- dashboard form ကို
ပြန်ရရှိလာသော field descriptor များမှ render လုပ်သောကြောင့် destination အသစ်တစ်ခုအတွက် UI ပြောင်းလဲရန် မလိုအပ်ပါ။

---

## 4. BigQuery destination

Config key များ (`type: "bigquery"`):

| Key                  | မှတ်ချက်များ                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `projectId`          | Dataset ကို ထိန်းသိမ်းထားသော GCP project                                                       |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                |
| `location`           | Dataset ကို ဖန်တီးရန် လိုအပ်မှသာ အသုံးပြုသည် (မူလတန်ဖိုး `EU`)                                 |
| `serviceAccountJson` | Service-account key။ Secret ဖြစ်သည်- သိမ်းဆည်းထားစဉ် encrypt လုပ်ပြီး မည်သည့်အခါမျှ ပြန်မပေးပါ |
| `autoCreate`         | ပထမဆုံး export လုပ်စဉ် dataset နှင့် table ကို ဖန်တီးသည် (မူလတန်ဖိုး `true`)                   |

Service account သည် target table အတွက် `bigquery.tables.updateData` လိုအပ်ပြီး
`autoCreate` ဖွင့်ထားချိန်တွင် `bigquery.datasets.create` / `bigquery.tables.create` ကိုလည်း လိုအပ်သည်။

သတ်မှတ်ထားသော batch သည် HTTP unit မဟုတ်ဘဲ **cursor** unit ဖြစ်သည်- `send()` က ၎င်းကို
အများဆုံး row 500 ပါဝင်သော insertAll call များအဖြစ် ခွဲပေးသောကြောင့် ကြီးမားသော `batch_size` သည် BigQuery ၏ 10 MB request ကန့်သတ်ချက်ကို မကျော်လွန်စေနိုင်ပါ။
ယာယီ status များ (408/429/500/502/503/504) ကို တူညီသော insertIds များအား ပြန်လည်အသုံးပြု၍ exponential
backoff ဖြင့် သုံးကြိမ်အထိ ထပ်မံကြိုးစားသည်။ Auth နှင့် schema failure များအတွက်မူ run ကို အလဟဿကုန်ဆုံးစေမည့်အစား
ပထမဆုံး ကြိုးစားမှုတွင်ပင် throw လုပ်သည်။

မကြာသေးမီက ဖန်တီးထားသော table ကို streaming endpoint က မမြင်နိုင်သေးသဖြင့်
စက္ကန့်အနည်းငယ်ကြာ 404 ပြန်ပေးသည်။ ထို 404 ကို ထပ်မံကြိုးစားသော်လည်း **ဤ run က table ကို ဖန်တီးထားသည့်အခါမှသာ** ဖြစ်သည်-
အမှန်တကယ် မရှိသော table သည် ချက်ချင်းပင် fail ဖြစ်သည်။ မကြာသေးမီက ဖျက်ထားသော table အမည်အောက်တွင်
table တစ်ခုကို ပြန်လည်ဖန်တီးပါက BigQuery သည် streaming insert များကို မိနစ်အတော်ကြာ ငြင်းပယ်မည်ဖြစ်ကြောင်း သတိပြုပါ။ ၎င်းသည်
ဖျက်ပြီးနောက် ပြန်လည်ဖန်တီးခြင်း၏ သဘောသဘာဝဖြစ်သောကြောင့် table ကို ဖျက်ပြီး ပြန်ထည့်ခြင်းထက် table အမည်အသစ်ကို ပိုမိုနှစ်သက်သင့်သည်။

**Partial failure တစ်ခုသည် HTTP 200 နှင့်အတူ အလွတ်မဟုတ်သော `insertErrors[]` အဖြစ် ရောက်ရှိလာသည်။** ၎င်းကို
failure အဖြစ် သတ်မှတ်ပြီး throw လုပ်သည်။ ထို့ကြောင့် BigQuery က လက်မခံခဲ့သော row များကို ကျော်၍ cursor ရှေ့တိုးသွားခြင်းကို
ရပ်တန့်စေသည်။ `tests/unit/log-export-bigquery.test.ts` က ထိုအပြုအမူကို အတည်ပြုထားသည်။

Transport သည် ရိုးရိုး REST ဖြစ်သည်- self-signed RS256 assertion ကို access token တစ်ခုအတွက်
`https://oauth2.googleapis.com/token` တွင် လဲလှယ်ပြီးနောက် row များကို `tabledata.insertAll` သို့ ပို့သည်။ မည်သည့် Google SDK ကိုမျှ
ထည့်သွင်းမထားပါ။ Access token များကို (service account, scope) တစ်စုံစီအလိုက် process အတွင်း cache လုပ်ထားသည်။

ဖန်တီးထားသော table တွင် Logs tab ၏ field တစ်ခုစီအတွက် column တစ်ခုစီနှင့် `exported_at` ပါဝင်ပြီး
call log များကို အမှန်တကယ် query လုပ်ပုံနှင့် ကိုက်ညီအောင် ဖွဲ့စည်းထားသည်-

- **`timestamp` အပေါ် နေ့အလိုက် partition ခွဲထားသည်**၊ ထို့ကြောင့် ရက်စွဲဖြင့် ကန့်သတ်ထားသော query တစ်ခုသည် ထိုရက်များကိုသာ scan လုပ်သည်။
- **`api_key_name`, `provider`, `model`, `status` အလိုက် clustered လုပ်ထားသည်** (ထိုအစဉ်အတိုင်း)၊ ထို့ကြောင့်
  မည်သူက run ခဲ့သည်၊ မည်သည့်နေရာသို့ သွားသည် သို့မဟုတ် fail ဖြစ်ခဲ့ခြင်းရှိမရှိတို့ဖြင့် filter လုပ်သည့်အခါ partition တစ်ခုစီအတွင်းရှိ block များကို ဖယ်ရှားနိုင်သည်။ BigQuery သည်
  clustering column အများဆုံး လေးခုအထိ ခွင့်ပြုပြီး အစဉ်သည် အရေးကြီးသည်- `api_key_name` တစ်ခုတည်းအပေါ် filter လုပ်ခြင်းက
  prune လုပ်နိုင်သော်လည်း `status` တစ်ခုတည်းအပေါ် filter လုပ်ခြင်းက မလုပ်နိုင်ပါ။
- **ရွေးချယ်အသုံးပြုနိုင်သော partition retention** ကို `partitionExpirationDays` မှတစ်ဆင့် သတ်မှတ်နိုင်သည် (`0` သည် အားလုံးကို ထိန်းသိမ်းထားသည်)၊
  table ကို ဖန်တီးသည့်အခါ အသုံးချသည်။

ဆက်တင်နှစ်ခုစလုံးသည် ဖန်တီးချိန်တွင် သက်ရောက်သည်။ ရှိပြီးသား table သည် ၎င်းတွင် ရှိနှင့်ပြီးသော layout ကို ဆက်လက်ထိန်းသိမ်းထားမည်ဖြစ်သောကြောင့်
၎င်းတို့ကို အသုံးပြုလိုပါက destination ကို table ID အသစ်တစ်ခုသို့ ညွှန်ပေးပါ။

`tests/unit/log-export-bigquery.test.ts` သည် mapper နှင့် table schema တို့ အမြဲတမ်း တစ်ပြေးညီရှိနေကြောင်း စစ်ဆေးအတည်ပြုသဖြင့် call-log column အသစ်တစ်ခုကို export လုပ်သည့်လမ်းကြောင်းတွင် အသိပေးခြင်းမရှိဘဲ ချန်လှပ်ထား၍ မရပါ။

Batch များကို row အရေအတွက်နှင့် serialise လုပ်ထားသော byte ပမာဏ **နှစ်ခုစလုံး** အပေါ်မူတည်၍ chunk များအဖြစ် ခွဲထားသည်။ Payload များကို export လုပ်သည့်အခါ row အရေအတွက်တစ်ခုတည်းဖြင့် မလုံလောက်ပါ။ Prompt များပါဝင်သော row 500 ခုသည် megabyte ဆယ်ဂဏန်းအထိ ရှိနိုင်ပြီး insertAll သည် 10 MB ကျော်သော request ကို ငြင်းပယ်သည်။ Row 500 ခု သို့မဟုတ် 9 MB သို့ ရောက်သည်နှင့်၊ မည်သည့်သတ်မှတ်ချက်က အရင်ပြည့်သည်ဖြစ်စေ chunk ကို ပိတ်သည်။

---

## 5. Destination တစ်ခု ထည့်သွင်းခြင်း

1. `LogExportDestinationType` ကို export လုပ်သည့် `src/lib/logExport/destinations/<name>.ts` ကို ဖန်တီးပါ။ ၎င်းတွင် Zod `configSchema`၊ UI အတွက် `fields` descriptor array၊ `secretFields` နှင့် `test()` / `prepare()` / `send(records)` တို့ကို ပြန်ပေးသည့် `createClient(config)` ပါဝင်ရမည်။
2. ၎င်းကို `src/lib/logExport/registry.ts` ရှိ `DESTINATIONS` array ထဲသို့ ထည့်ပါ။
3. `tests/unit/` အောက်တွင် စမ်းသပ်မှုများ ရေးပါ။

ပြောင်းလဲရန်မှာ ဤမျှသာ ဖြစ်သည်။ ဒေတာသိမ်းဆည်းမှု၊ cron job၊ REST layer၊ လျှို့ဝှက်ဒေတာ encryption နှင့် dashboard form တို့အားလုံးသည် registry ကို ဖတ်ရှုအသုံးပြုကြသည်။

Destination အသစ်တစ်ခုအတွက် စည်းမျဉ်းနှစ်ခုရှိသည်-

- တစ်စိတ်တစ်ပိုင်း မအောင်မြင်မှုဖြစ်ပါက `send()` သည် **မဖြစ်မနေ throw လုပ်ရမည်**။ Resolve ဖြစ်ခြင်းသည် "destination တွင် ဤ row များ ရှိနေပြီ" ဟု အဓိပ္ပာယ်ရပြီး cursor သည် ၎င်းတို့ကို အပြီးတိုင် ကျော်သွားမည်ဖြစ်သည်။
- အသုံးပြုသူပေးသည့် URL ကို လက်ခံသော destination သည် fetch မလုပ်မီ webhook များလုပ်ဆောင်သည့်နည်းအတိုင်း `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) မှတစ်ဆင့် ၎င်း URL ကို validate လုပ်ရမည်။ BigQuery ၏ host များသည် constants များဖြစ်သောကြောင့် ဤအဆင့် မလိုအပ်ပါ။

---

## 6. လည်ပတ်အသုံးပြုခြင်း

- **Dashboard**: Integrations → Log export သို့ သွားပါ။ Destination တစ်ခု ထည့်ပါ၊ row များ မရေးဘဲ credentials များကို စစ်ဆေးရန် **Test** ကို run လုပ်ပြီးနောက် ၎င်းကို enable လုပ်ပါ။
- **Backlog**: Destination card တစ်ခုစီတွင် pending ဖြစ်နေသော row များနှင့် cursor ကို ပြသသည်။ `GET
/api/log-export/status` သည် အလားတူ ကိန်းဂဏန်းများအပြင် နောက်ဆုံး job run ၂၀ ခုကိုပါ ပြန်ပေးသည်။
- **Destination တစ်ခု မအောင်မြင်ခြင်းကြောင့် အခြား destination များ မအောင်မြင်စေပါ** — run summary သည် destination တစ်ခုချင်းစီ၏ status ကို `last_status` / `last_error` တွင် မှတ်တမ်းတင်ပြီး job run history က စုစုပေါင်းရလဒ်ကို ထိန်းသိမ်းထားသည်။
- **Destination တစ်ခုကို ဖျက်ခြင်းသည် ၎င်း၏ cursor ကိုပါ ဖျက်သည်။** ၎င်းကို ပြန်လည်ထည့်သွင်းပါက ထိန်းသိမ်းထားသော call log များအနက် အဟောင်းဆုံးမှ စတင်မည်ဖြစ်ပြီး destination တွင် ရှိနှင့်ပြီးသား ဖြစ်နိုင်သည့် row များကို ပြန်လည်ပို့မည်။ BigQuery တွင် row တစ်ခုချင်းစီ၏ `insertId` သည် BigQuery ၏ ကိုယ်ပိုင် de-duplication window အတွင်း၌သာ ထိုထပ်ပို့မှုကို စုပ်ယူနိုင်သောကြောင့် destination ကို ဖျက်ခြင်းထက် disable လုပ်ခြင်းကို ဦးစားပေးပါ။
