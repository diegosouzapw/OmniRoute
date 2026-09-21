# Log export (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute ਕਾਲ ਲੌਗਾਂ ਦਾ ਕਿਸੇ ਬਾਹਰੀ ਐਨਾਲਿਟਿਕਸ ਸਟੋਰ ਵਿੱਚ ਨਿਰੰਤਰ, ਕ੍ਰਮਿਕ ਨਿਰਯਾਤ।

Logs ਡੈਸ਼ਬੋਰਡ ਟੈਬ ਬੇਨਤੀ ਇਤਿਹਾਸ ਨੂੰ SQLite (`call_logs`) ਵਿੱਚ ਰੱਖਦੀ ਹੈ, ਜਿਸ ਦੀ ਸੀਮਾ
ਰੋਟੇਸ਼ਨ ਅਤੇ ਰਿਟੈਨਸ਼ਨ ਦੁਆਰਾ ਨਿਰਧਾਰਤ ਹੁੰਦੀ ਹੈ। ਲੌਗ ਨਿਰਯਾਤ ਉਸੇ ਰਿਕਾਰਡ ਸੈੱਟ ਨੂੰ ਇੱਕ ਸਮਾਂ-ਸਾਰਣੀ ਅਨੁਸਾਰ ਬਾਹਰ ਭੇਜਦਾ ਹੈ, ਤਾਂ ਜੋ ਇਹ
ਸਥਾਨਕ ਡਾਟਾਬੇਸ ਤੋਂ ਵੱਧ ਸਮੇਂ ਤੱਕ ਮੌਜੂਦ ਰਹਿ ਸਕੇ ਅਤੇ ਹੋਰ ਡਾਟੇ ਨਾਲ ਜੋੜਿਆ ਜਾ ਸਕੇ। BigQuery ਪਹਿਲਾ ਟਿਕਾਣਾ ਹੈ;
ਪਾਈਪਲਾਈਨ ਇੱਕ ਰਜਿਸਟਰੀ ਹੈ, ਇਸ ਲਈ ਹੋਰ ਟਿਕਾਣੇ ਜੋੜੇ ਜਾ ਸਕਦੇ ਹਨ।

---

## 1. ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs ਟੈਬ ਦਾ ਫ਼ੀਲਡ ਸੈੱਟ)
      → ਟਿਕਾਣਾ client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **ਸਮਾਂ-ਸਾਰਣੀ** — ਇੱਕ `JobRegistry` cron ਜੌਬ, `log_export`, ਜਿਸ ਦਾ ਡਿਫਾਲਟ `0 * * * *` (ਹਰ ਘੰਟੇ,
  UTC) ਹੈ। `src/lib/initCloudSync.ts` ਵਿੱਚ ਰਜਿਸਟਰ ਕੀਤੀ ਗਈ; `OMNIROUTE_LOG_EXPORT_CRON` ਨਾਲ ਬਦਲੀ ਜਾ ਸਕਦੀ ਹੈ।
  ਹਰ ਟਿਕ ਸਾਰੇ **ਸਮਰੱਥ** ਟਿਕਾਣਿਆਂ ਨੂੰ ਕ੍ਰਮਵਾਰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਭੇਜਦਾ ਹੈ।
- **ਕਰਸਰ** — SQLite ਦਾ ਅੰਤਰ-ਨਿਹਿਤ `call_logs.rowid`, ਜੋ ਹਰ ਟਿਕਾਣੇ ਲਈ
  `log_export_destinations.cursor_row_id` ਵਿੱਚ ਸਥਾਈ ਤੌਰ 'ਤੇ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ। `timestamp` ਨੂੰ ਜਾਣ-ਬੁੱਝ ਕੇ ਕਰਸਰ ਨਹੀਂ ਬਣਾਇਆ ਗਿਆ: ਕਾਲਰ
  ਆਪਣਾ ਮੁੱਲ ਦੇ ਸਕਦੇ ਹਨ, ਇਸ ਲਈ ਇੱਕ ਹੌਲੀ ਬੇਨਤੀ ਉਸ ਤੇਜ਼ ਬੇਨਤੀ ਤੋਂ ਬਾਅਦ ਲਿਖੀ ਜਾ ਸਕਦੀ ਹੈ ਜੋ
  ਬਾਅਦ ਵਿੱਚ ਸ਼ੁਰੂ ਹੋਈ ਸੀ, ਅਤੇ timestamp ਕਰਸਰ ਇਸ ਨੂੰ ਛੱਡ ਦੇਵੇਗਾ।
- **ਬੈਚਿੰਗ** — ਹਰ ਬੇਨਤੀ ਲਈ `batch_size` ਕਤਾਰਾਂ (ਡਿਫਾਲਟ 500), ਹਰ ਰਨ ਲਈ
  `max_rows_per_run` ਕਤਾਰਾਂ (ਡਿਫਾਲਟ 10000), ਤਾਂ ਜੋ ਇੱਕ ਵੱਡਾ ਬੈਕਲੌਗ ਇੱਕ ਰਨ ਨੂੰ ਰੋਕਣ ਦੀ ਬਜਾਏ ਕਈ ਟਿਕਾਂ ਦੌਰਾਨ ਨਿਕਾਸ ਹੋਵੇ।
- **ਡਿਲਿਵਰੀ** — ਕਰਸਰ ਸਿਰਫ਼ `send()` ਦੇ ਹੱਲ ਹੋਣ ਤੋਂ ਬਾਅਦ ਹੀ ਅੱਗੇ ਵਧਦਾ ਹੈ। ਇੱਕ ਅਸਫਲ ਬੈਚ
  ਕਰਸਰ ਨੂੰ ਉਸੇ ਥਾਂ ਛੱਡ ਦਿੰਦਾ ਹੈ, ਇਸ ਲਈ ਅਗਲੇ ਰਨ ਵਿੱਚ ਉਹੀ ਕਤਾਰਾਂ ਮੁੜ ਅਜ਼ਮਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ। ਗਾਰੰਟੀ
  ਘੱਟੋ-ਘੱਟ-ਇੱਕ-ਵਾਰ ਡਿਲਿਵਰੀ ਅਤੇ ਟਿਕਾਣਾ-ਪਾਸੇ ਡੀ-ਡੁਪਲੀਕੇਸ਼ਨ ਦੀ ਹੈ, ਅਸਲ exactly-once ਦੀ ਨਹੀਂ: BigQuery ਹਰ
  ਕਤਾਰ ਨੂੰ ਕਾਲ-ਲੌਗ id ਨਾਲ ਕੁੰਜੀਬੱਧ ਕਰਦਾ ਹੈ, ਜਿਸ ਦਾ ਇਹ ਆਪਣੀ ਡੀਡੁਪ ਵਿੰਡੋ ਦੇ ਅੰਦਰ ਸਰਵੋਤਮ-ਯਤਨ ਦੇ ਆਧਾਰ 'ਤੇ ਸਨਮਾਨ ਕਰਦਾ ਹੈ।
- **ਓਵਰਲੈਪ ਗਾਰਡ** — cron ਟਿਕ ਅਤੇ `POST .../run` ਇਕੱਠੇ ਚੱਲ ਸਕਦੇ ਹਨ। ਜਿਸ ਟਿਕਾਣੇ ਤੋਂ
  ਪਹਿਲਾਂ ਹੀ ਨਿਕਾਸ ਹੋ ਰਿਹਾ ਹੋਵੇ, ਉਸ ਨੂੰ ਦੋ ਵਾਰ ਨਿਕਾਸ ਕਰਨ ਦੀ ਬਜਾਏ ਛੱਡ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ (ਰਨ ਨਤੀਜੇ ਵਿੱਚ `skipped: true`),
  ਇਸ ਲਈ ਇੱਕ ਸਮਕਾਲੀ ਰਨ ਨਾ ਤਾਂ ਕਿਸੇ ਬੈਚ ਨੂੰ ਮੁੜ ਭੇਜ ਸਕਦਾ ਹੈ ਅਤੇ ਨਾ ਹੀ ਕਰਸਰ ਨੂੰ ਪਿੱਛੇ ਲਿਖ ਸਕਦਾ ਹੈ।
- **ਪਰਜ ਰਿਕਵਰੀ** — ਜੇ `cursor_row_id`, `MAX(rowid)` ਤੋਂ ਉੱਪਰ ਚਲਾ ਜਾਂਦਾ ਹੈ (ਪੂਰੀ ਟੇਬਲ
  ਪਰਜ ਕੀਤੀ ਗਈ ਸੀ ਅਤੇ rowids ਮੁੜ ਸ਼ੁਰੂ ਹੋਏ), ਤਾਂ ਰਨਰ ਸਥਾਈ ਤੌਰ 'ਤੇ ਅੰਨ੍ਹਾ ਹੋਣ ਦੀ ਬਜਾਏ 0 'ਤੇ ਵਾਪਸ ਜਾਂਦਾ ਹੈ।

### ਪੇਲੋਡ (ਪ੍ਰੌਮਪਟ ਅਤੇ ਕੰਪਲੀਸ਼ਨ)

ਡਿਫਾਲਟ ਰੂਪ ਵਿੱਚ ਨਿਰਯਾਤ ਸਿਰਫ਼ ਉਹ ਸੰਖੇਪ ਫ਼ੀਲਡ ਲੈ ਕੇ ਜਾਂਦਾ ਹੈ ਜੋ Logs **ਸੂਚੀ** ਦਿਖਾਉਂਦੀ ਹੈ। **ਪ੍ਰੌਮਪਟ ਅਤੇ ਜਵਾਬ ਨਿਰਯਾਤ ਕਰੋ** (`includeBodies`) ਨੂੰ ਚਾਲੂ ਕਰਨ ਨਾਲ ਇਸ ਤੋਂ ਇਲਾਵਾ ਉਹ ਵੀ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ ਜੋ Logs ਦਾ **ਵੇਰਵਾ**
ਪੈਨ ਹਰ ਕਾਲ ਲਈ ਦਿਖਾਉਂਦਾ ਹੈ:

| ਫ਼ੀਲਡ                            | ਇਸ ਵਿੱਚ ਕੀ ਹੁੰਦਾ ਹੈ                                         |
| -------------------------------- | ----------------------------------------------------------- |
| `request_body` / `response_body` | ਕਾਲ ਪੇਲੋਡ, ਜਿਵੇਂ ਡੈਸ਼ਬੋਰਡ ਉਨ੍ਹਾਂ ਨੂੰ ਰੈਂਡਰ ਕਰਦਾ ਹੈ          |
| `pipeline_route_decision`        | ਰਾਊਟਰ ਨੇ ਕਿਹੜਾ ਟਾਰਗੇਟ ਅਤੇ ਮਾਡਲ ਚੁਣਿਆ                        |
| `pipeline_client_request`        | ਕੱਚੀ ਬੇਨਤੀ, ਬਿਲਕੁਲ ਉਸੇ ਤਰ੍ਹਾਂ ਜਿਵੇਂ ਕਲਾਇੰਟ ਨੇ ਭੇਜੀ          |
| `pipeline_openai_request`        | ਅੰਦਰੂਨੀ OpenAI ਰੂਪ ਵਿੱਚ ਅਨੁਵਾਦ ਤੋਂ ਬਾਅਦ                     |
| `pipeline_provider_request`      | ਜਿਵੇਂ ਅਸਲ ਵਿੱਚ ਪ੍ਰੋਵਾਈਡਰ ਦੀ ਬੋਲੀ ਵਿੱਚ ਅੱਪਸਟ੍ਰੀਮ ਭੇਜੀ ਗਈ     |
| `pipeline_provider_response`     | ਕੱਚਾ ਅੱਪਸਟ੍ਰੀਮ ਜਵਾਬ                                         |
| `pipeline_client_response`       | ਜੋ ਕਾਲਰ ਨੂੰ ਵਾਪਸ ਸੌਂਪਿਆ ਗਿਆ                                 |
| `pipeline_error`                 | ਅਸਫਲ ਕਾਲ ਲਈ ਪਾਈਪਲਾਈਨ-ਪੱਧਰੀ ਗਲਤੀ ਦਾ ਵੇਰਵਾ                    |
| `bodies_truncated`               | ਜਦੋਂ ਉਪਰੋਕਤ ਕੋਈ ਵੀ ਫ਼ੀਲਡ `maxBodyBytes` ਤੱਕ ਪਹੁੰਚੇ ਤਾਂ True |

ਇਹ ਪ੍ਰੌਮਪਟ ਸਮੱਗਰੀ ਹੈ, ਇਸ ਲਈ ਇਹ **ਡਿਫਾਲਟ ਰੂਪ ਵਿੱਚ ਬੰਦ** ਹੈ ਅਤੇ ਜਾਣ-ਬੁੱਝ ਕੇ ਹਰ ਟਿਕਾਣੇ ਲਈ ਵੱਖਰੀ ਚੋਣ ਹੈ।
ਉਹੀ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ ਜੋ ਡੈਸ਼ਬੋਰਡ ਦਿਖਾਉਂਦਾ ਹੈ, ਕਿਉਂਕਿ ਦੋਵੇਂ `getCallLogById` ਰਾਹੀਂ ਪੜ੍ਹਦੇ ਹਨ: ਪੇਲੋਡ
ਲਿਖੇ ਜਾਣ ਵੇਲੇ ਹੀ PII-ਸੈਨਿਟਾਈਜ਼ ਅਤੇ ਗੁਪਤ ਜਾਣਕਾਰੀ ਤੋਂ ਰਹਿਤ ਕੀਤੇ ਜਾ ਚੁੱਕੇ ਹੁੰਦੇ ਹਨ, ਅਤੇ
`noLog` API ਕੁੰਜੀ ਨਾਲ ਕੀਤੀ ਕਾਲ ਕੋਈ ਪੇਲੋਡ ਸਟੋਰ ਹੀ ਨਹੀਂ ਕਰਦੀ, ਇਸ ਲਈ ਨਿਰਯਾਤ ਕਰਨ ਲਈ ਕੁਝ ਨਹੀਂ ਹੁੰਦਾ।

ਪੇਲੋਡ ਹਰ ਕਤਾਰ ਲਈ ਫ਼ਾਈਲ-ਸਿਸਟਮ ਆਰਟੀਫੈਕਟ ਤੋਂ ਪੜ੍ਹੇ ਜਾਂਦੇ ਹਨ, ਇਸ ਲਈ ਹਾਈਡ੍ਰੇਸ਼ਨ ਸਿਰਫ਼ ਉਨ੍ਹਾਂ ਟਿਕਾਣਿਆਂ ਲਈ ਚੱਲਦੀ ਹੈ
ਜਿਨ੍ਹਾਂ ਨੇ ਇਸ ਦੀ ਮੰਗ ਕੀਤੀ ਹੈ। ਜਿਸ ਕਤਾਰ ਦਾ ਆਰਟੀਫੈਕਟ ਗੁੰਮ ਜਾਂ ਖ਼ਰਾਬ ਹੋਵੇ, ਉਹ ਬੈਚ ਨੂੰ ਅਸਫਲ ਕਰਨ ਅਤੇ ਕਰਸਰ ਨੂੰ ਫਸਾਉਣ ਦੀ ਬਜਾਏ
null ਪੇਲੋਡਾਂ ਨਾਲ ਆਪਣਾ ਸੰਖੇਪ ਨਿਰਯਾਤ ਕਰਦੀ ਹੈ।

`maxBodyBytes` (ਡਿਫਾਲਟ 262144) ਹਰ ਫ਼ੀਲਡ ਦੀ ਹੱਦ ਨਿਰਧਾਰਤ ਕਰਦਾ ਹੈ। ਵੱਧ ਲੰਬੇ ਪੇਲੋਡ **ਹਟਾਉਣ ਦੀ ਬਜਾਏ
ਛਾਂਟੇ ਜਾਂਦੇ ਹਨ** — ਇੱਕ ਕੱਟਿਆ ਹੋਇਆ ਪ੍ਰੌਮਪਟ ਫਿਰ ਵੀ "ਕੀ ਪੁੱਛਿਆ ਗਿਆ ਸੀ" ਦਾ ਜਵਾਬ ਦਿੰਦਾ ਹੈ — ਅਤੇ ਕਤਾਰ ਨੂੰ
`bodies_truncated` ਨਾਲ ਨਿਸ਼ਾਨਬੱਧ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਟੁਕੜਾ-ਦਰ-ਟੁਕੜਾ ਸਟ੍ਰੀਮ ਕੀਤੇ ਡੈਲਟਾ ਨਿਰਯਾਤ ਨਹੀਂ ਕੀਤੇ ਜਾਂਦੇ; ਇਕੱਠਾ ਕੀਤਾ ਜਵਾਬ
ਪਹਿਲਾਂ ਹੀ `pipeline_provider_response` ਅਤੇ `pipeline_client_response` ਵਿੱਚ ਮੌਜੂਦ ਹੁੰਦਾ ਹੈ।

---

## 2. ਫ਼ਾਈਲਾਂ

| ਹਿੱਸਾ                | ਟਿਕਾਣਾ                                       |
| -------------------- | -------------------------------------------- |
| ਡੈਸਟਿਨੇਸ਼ਨ ਕਾਂਟ੍ਰੈਕਟ | `src/lib/logExport/types.ts`                 |
| ਰਜਿਸਟਰੀ              | `src/lib/logExport/registry.ts`              |
| ਸੀਕ੍ਰੇਟ ਸੰਭਾਲ        | `src/lib/logExport/secrets.ts`               |
| ਰਨਰ (ਕਰਸਰ ਲੂਪ)       | `src/lib/logExport/runner.ts`                |
| API ਪ੍ਰੋਜੈਕਸ਼ਨ       | `src/lib/logExport/presenter.ts`             |
| BigQuery ਡੈਸਟਿਨੇਸ਼ਨ  | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA ਪ੍ਰਮਾਣੀਕਰਨ | `src/lib/logExport/googleServiceAccount.ts`  |
| ਕਾਲ-ਲੌਗ ਸਰੋਤ         | `src/lib/usage/callLogExportSource.ts`       |
| ਸਥਿਰ ਸਟੋਰੇਜ          | `src/lib/db/logExportDestinations.ts`        |
| Cron ਜੌਬ             | `src/lib/jobs/logExportJob.ts`               |
| REST ਪਰਤ             | `src/app/api/log-export/`                    |
| ਡੈਸ਼ਬੋਰਡ ਪੰਨਾ        | `src/app/(dashboard)/dashboard/log-export/`  |

ਸਕੀਮਾ: `src/lib/db/migrations/170_log_export_destinations.sql`।

---

## 3. REST API

ਸਾਰੇ ਰੂਟ ਪ੍ਰਬੰਧਨ-ਪ੍ਰਮਾਣੀਕ੍ਰਿਤ (`requireManagementAuth`) ਹਨ। ਸੀਕ੍ਰੇਟ ਕਦੇ ਵੀ ਵਾਪਸ ਨਹੀਂ ਕੀਤੇ ਜਾਂਦੇ:
ਸਟੋਰ ਕੀਤਾ ਸੀਕ੍ਰੇਟ ਲਿਟਰਲ `__stored__` ਵਜੋਂ ਵਾਪਸ ਆਉਂਦਾ ਹੈ, ਅਤੇ ਅੱਪਡੇਟ ਵੇਲੇ ਉਹ ਮੁੱਲ ਵਾਪਸ ਭੇਜਣ ਨਾਲ
ਸਟੋਰ ਕੀਤਾ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਬਰਕਰਾਰ ਰਹਿੰਦਾ ਹੈ।

ਅਜਿਹਾ ਡੈਸਟਿਨੇਸ਼ਨ ਬਣਾਉਣ ਜਾਂ ਅੱਪਡੇਟ ਕਰਨ ਲਈ, ਜਿਸ ਦੀ ਕਿਸਮ ਇੱਕ ਸੀਕ੍ਰੇਟ ਘੋਸ਼ਿਤ ਕਰਦੀ ਹੈ, **`STORAGE_ENCRYPTION_KEY`
ਲਾਜ਼ਮੀ ਹੈ**। ਇਸ ਤੋਂ ਬਿਨਾਂ `encrypt()` ਚੁੱਪਚਾਪ ਪਾਸਥਰੂ ਕਰਦਾ ਹੈ, ਇਸ ਲਈ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਨੂੰ SQLite ਵਿੱਚ
ਪਲੇਨਟੈਕਸਟ ਵਜੋਂ ਰੱਖਣ ਦੀ ਬਜਾਏ ਲਿਖਤ ਨੂੰ 400 ਨਾਲ ਅਸਵੀਕਾਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ (ਇਹੀ ਗਾਰਡ Telegram
ਵੈੱਬਹੁੱਕ ਵੀ ਲਾਗੂ ਕਰਦਾ ਹੈ)।

| ਵਿਧੀ     | ਪਾਥ                                      | ਮਕਸਦ                                             |
| -------- | ---------------------------------------- | ------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | ਡੈਸਟਿਨੇਸ਼ਨ ਕਿਸਮਾਂ + ਉਨ੍ਹਾਂ ਦੀ ਕਾਨਫ਼ਿਗ ਫ਼ੀਲਡ ਸੂਚੀ |
| `GET`    | `/api/log-export/destinations`           | ਡੈਸਟਿਨੇਸ਼ਨਾਂ ਦੀ ਸੂਚੀ (ਸੀਕ੍ਰੇਟ ਲੁਕਾਏ ਹੋਏ)         |
| `POST`   | `/api/log-export/destinations`           | ਇੱਕ ਡੈਸਟਿਨੇਸ਼ਨ ਬਣਾਓ                              |
| `GET`    | `/api/log-export/destinations/{id}`      | ਇੱਕ ਨੂੰ ਪੜ੍ਹੋ                                    |
| `PUT`    | `/api/log-export/destinations/{id}`      | ਨਾਮ / ਸਮਰੱਥ / ਕਾਨਫ਼ਿਗ / ਬੈਚਿੰਗ ਅੱਪਡੇਟ ਕਰੋ        |
| `DELETE` | `/api/log-export/destinations/{id}`      | ਮਿਟਾਓ                                            |
| `POST`   | `/api/log-export/destinations/{id}/test` | ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ ਜਾਂਚੋ, ਕੁਝ ਵੀ ਨਾ ਲਿਖੋ               |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ਹੁਣੇ ਖਾਲੀ ਕਰੋ, ਨਿਯਤ ਰਨ ਵਾਲਾ ਹੀ ਪਾਥ               |
| `GET`    | `/api/log-export/status`                 | Cron ਸਥਿਤੀ, ਹਾਲੀਆ ਰਨ, ਹਰ ਟਾਰਗੇਟ ਲਈ ਬੈਕਲੌਗ        |

`GET /api/log-export/types` ਹੀ UI ਨੂੰ ਜਨਰਿਕ ਬਣਾਉਂਦਾ ਹੈ: ਡੈਸ਼ਬੋਰਡ ਫਾਰਮ ਵਾਪਸ ਕੀਤੇ ਗਏ
ਫ਼ੀਲਡ ਡਿਸਕ੍ਰਿਪਟਰਾਂ ਤੋਂ ਰੈਂਡਰ ਹੁੰਦਾ ਹੈ, ਇਸ ਲਈ ਨਵੇਂ ਡੈਸਟਿਨੇਸ਼ਨ ਲਈ UI ਵਿੱਚ ਕਿਸੇ ਬਦਲਾਅ ਦੀ ਲੋੜ ਨਹੀਂ ਹੁੰਦੀ।

---

## 4. BigQuery ਡੈਸਟਿਨੇਸ਼ਨ

ਕਾਨਫ਼ਿਗ ਕੁੰਜੀਆਂ (`type: "bigquery"`):

| ਕੁੰਜੀ                | ਨੋਟਸ                                                                             |
| -------------------- | -------------------------------------------------------------------------------- |
| `projectId`          | ਡੇਟਾਸੈੱਟ ਰੱਖਣ ਵਾਲਾ GCP ਪ੍ਰੋਜੈਕਟ                                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                  |
| `location`           | ਸਿਰਫ਼ ਉਦੋਂ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ ਜਦੋਂ ਡੇਟਾਸੈੱਟ ਬਣਾਉਣਾ ਪਵੇ (ਡਿਫਾਲਟ `EU`)                 |
| `serviceAccountJson` | ਸਰਵਿਸ-ਅਕਾਊਂਟ ਕੁੰਜੀ। ਸੀਕ੍ਰੇਟ: ਸਟੋਰੇਜ ਵਿੱਚ ਇਨਕ੍ਰਿਪਟ ਕੀਤੀ, ਕਦੇ ਵਾਪਸ ਨਹੀਂ ਕੀਤੀ ਜਾਂਦੀ |
| `autoCreate`         | ਪਹਿਲੇ ਐਕਸਪੋਰਟ ਵੇਲੇ ਡੇਟਾਸੈੱਟ ਅਤੇ ਟੇਬਲ ਬਣਾਓ (ਡਿਫਾਲਟ `true`)                        |

ਸਰਵਿਸ ਅਕਾਊਂਟ ਨੂੰ ਟਾਰਗੇਟ ਟੇਬਲ ਉੱਤੇ `bigquery.tables.updateData` ਦੀ ਲੋੜ ਹੈ, ਅਤੇ
ਜਦੋਂ `autoCreate` ਚਾਲੂ ਹੋਵੇ ਤਾਂ `bigquery.datasets.create` / `bigquery.tables.create` ਦੀ ਵੀ ਲੋੜ ਹੈ।

ਕਾਨਫ਼ਿਗਰ ਕੀਤਾ ਬੈਚ ਇੱਕ **ਕਰਸਰ** ਇਕਾਈ ਹੈ, HTTP ਇਕਾਈ ਨਹੀਂ: `send()` ਇਸ ਨੂੰ ਵੱਧ ਤੋਂ ਵੱਧ 500 ਕਤਾਰਾਂ
ਵਾਲੀਆਂ insertAll ਕਾਲਾਂ ਵਿੱਚ ਵੰਡਦਾ ਹੈ, ਇਸ ਲਈ ਵੱਡਾ `batch_size` BigQuery ਦੀ 10 MB ਬੇਨਤੀ ਸੀਮਾ ਨੂੰ ਪਾਰ ਨਹੀਂ ਕਰ ਸਕਦਾ।
ਅਸਥਾਈ ਸਥਿਤੀਆਂ (408/429/500/502/503/504) ਲਈ, ਉਹੀ insertIds ਮੁੜ ਵਰਤਦਿਆਂ, ਐਕਸਪੋਨੇਨਸ਼ੀਅਲ
ਬੈਕਆਫ਼ ਨਾਲ ਵੱਧ ਤੋਂ ਵੱਧ ਤਿੰਨ ਵਾਰ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ; ਪ੍ਰਮਾਣੀਕਰਨ ਅਤੇ ਸਕੀਮਾ ਅਸਫਲਤਾਵਾਂ ਰਨ ਨੂੰ
ਵਿਅਰਥ ਖਪਾਉਣ ਦੀ ਬਜਾਏ ਪਹਿਲੀ ਕੋਸ਼ਿਸ਼ ਉੱਤੇ ਹੀ ਥ੍ਰੋ ਕਰਦੀਆਂ ਹਨ।

ਕੁਝ ਪਲ ਪਹਿਲਾਂ ਬਣਾਈ ਗਈ ਟੇਬਲ ਹਾਲੇ ਸਟ੍ਰੀਮਿੰਗ ਐਂਡਪੌਇੰਟ ਨੂੰ ਦਿਖਾਈ ਨਹੀਂ ਦਿੰਦੀ, ਜੋ ਕੁਝ ਸਕਿੰਟਾਂ ਲਈ
404 ਜਵਾਬ ਦਿੰਦਾ ਹੈ। ਉਸ 404 ਲਈ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ, ਪਰ **ਸਿਰਫ਼ ਜਦੋਂ ਇਸ ਰਨ ਨੇ ਟੇਬਲ ਬਣਾਈ ਹੋਵੇ** —
ਅਸਲ ਵਿੱਚ ਗੁੰਮ ਟੇਬਲ ਫਿਰ ਵੀ ਤੁਰੰਤ ਅਸਫਲ ਹੁੰਦੀ ਹੈ। ਧਿਆਨ ਦਿਓ ਕਿ ਹਾਲ ਹੀ ਵਿੱਚ ਮਿਟਾਈ ਗਈ ਟੇਬਲ ਦੇ ਨਾਮ ਹੇਠ
ਟੇਬਲ ਨੂੰ ਮੁੜ ਬਣਾਉਣ ਨਾਲ BigQuery ਕਈ ਮਿੰਟਾਂ ਲਈ ਸਟ੍ਰੀਮਿੰਗ ਇਨਸਰਟਾਂ ਨੂੰ ਅਸਵੀਕਾਰ ਕਰਦਾ ਹੈ; ਇਹ
ਮਿਟਾਓ-ਫਿਰ-ਮੁੜ-ਬਣਾਓ ਦੀ ਵਿਸ਼ੇਸ਼ਤਾ ਹੈ, ਇਸ ਲਈ ਇੱਕ ਨੂੰ ਹਟਾ ਕੇ ਮੁੜ ਜੋੜਨ ਦੀ ਬਜਾਏ ਨਵੇਂ ਟੇਬਲ ਨਾਮ ਨੂੰ ਤਰਜੀਹ ਦਿਓ।

**ਅੰਸ਼ਕ ਅਸਫਲਤਾ HTTP 200 ਦੇ ਰੂਪ ਵਿੱਚ ਗੈਰ-ਖਾਲੀ `insertErrors[]` ਨਾਲ ਆਉਂਦੀ ਹੈ।** ਇਸ ਨੂੰ
ਅਸਫਲਤਾ ਮੰਨ ਕੇ ਥ੍ਰੋ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਜੋ ਕਰਸਰ ਨੂੰ ਉਨ੍ਹਾਂ ਕਤਾਰਾਂ ਤੋਂ ਅੱਗੇ ਵਧਣ ਤੋਂ ਰੋਕਦਾ ਹੈ ਜਿਨ੍ਹਾਂ ਨੂੰ BigQuery ਨੇ
ਕਦੇ ਸਵੀਕਾਰ ਨਹੀਂ ਕੀਤਾ; `tests/unit/log-export-bigquery.test.ts` ਇਸ ਵਿਵਹਾਰ ਨੂੰ ਪੱਕਾ ਕਰਦਾ ਹੈ।

ਟ੍ਰਾਂਸਪੋਰਟ ਸਧਾਰਨ REST ਹੈ — ਇੱਕ ਸਵੈ-ਦਸਤਖ਼ਤ ਕੀਤਾ RS256 ਅਸਰਸ਼ਨ
`https://oauth2.googleapis.com/token` ਉੱਤੇ ਐਕਸੈੱਸ ਟੋਕਨ ਨਾਲ ਬਦਲਿਆ ਜਾਂਦਾ ਹੈ, ਫਿਰ ਕਤਾਰਾਂ `tabledata.insertAll`
ਵੱਲ ਜਾਂਦੀਆਂ ਹਨ। ਕੋਈ Google SDK ਸ਼ਾਮਲ ਨਹੀਂ ਕੀਤਾ ਗਿਆ। ਐਕਸੈੱਸ ਟੋਕਨ ਹਰ (ਸਰਵਿਸ ਅਕਾਊਂਟ, ਸਕੋਪ) ਲਈ
ਇਨ-ਪ੍ਰੋਸੈੱਸ ਕੈਸ਼ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।

ਬਣਾਈ ਗਈ ਟੇਬਲ ਵਿੱਚ Logs-ਟੈਬ ਦੀ ਹਰ ਫ਼ੀਲਡ ਲਈ ਇੱਕ ਕਾਲਮ ਅਤੇ ਨਾਲ `exported_at` ਹੁੰਦਾ ਹੈ, ਅਤੇ ਇਹ
ਉਸ ਢੰਗ ਮੁਤਾਬਕ ਵਿਵਸਥਿਤ ਹੈ ਜਿਸ ਤਰ੍ਹਾਂ ਕਾਲ ਲੌਗਾਂ ਨੂੰ ਅਸਲ ਵਿੱਚ ਕਵੇਰੀ ਕੀਤਾ ਜਾਂਦਾ ਹੈ:

- **`timestamp` ਉੱਤੇ ਦਿਨ ਅਨੁਸਾਰ ਪਾਰਟੀਸ਼ਨ ਕੀਤੀ ਹੋਈ**, ਤਾਂ ਜੋ ਮਿਤੀ ਨਾਲ ਸੀਮਿਤ ਕਵੇਰੀ ਸਿਰਫ਼ ਉਨ੍ਹਾਂ ਦਿਨਾਂ ਨੂੰ ਸਕੈਨ ਕਰੇ।
- **`api_key_name`, `provider`, `model`, `status` ਮੁਤਾਬਕ ਕਲੱਸਟਰ ਕੀਤੀ ਹੋਈ** (ਇਸੇ ਕ੍ਰਮ ਵਿੱਚ), ਤਾਂ ਜੋ
  ਇਹ ਫ਼ਿਲਟਰ ਕਰਨ ਨਾਲ ਕਿ ਇਸ ਨੂੰ ਕਿਸ ਨੇ ਚਲਾਇਆ, ਇਹ ਕਿੱਥੇ ਗਿਆ, ਜਾਂ ਕੀ ਇਹ ਅਸਫਲ ਹੋਇਆ, ਹਰ ਪਾਰਟੀਸ਼ਨ ਦੇ ਅੰਦਰਲੇ
  ਬਲਾਕ ਛਾਂਟੇ ਜਾਣ। BigQuery ਵੱਧ ਤੋਂ ਵੱਧ ਚਾਰ ਕਲੱਸਟਰਿੰਗ ਕਾਲਮ ਮਨਜ਼ੂਰ ਕਰਦਾ ਹੈ ਅਤੇ ਕ੍ਰਮ ਮਹੱਤਵਪੂਰਨ ਹੈ:
  ਸਿਰਫ਼ `api_key_name` ਉੱਤੇ ਫ਼ਿਲਟਰ ਛਾਂਟਦਾ ਹੈ, ਸਿਰਫ਼ `status` ਉੱਤੇ ਫ਼ਿਲਟਰ ਨਹੀਂ।
- **`partitionExpirationDays` ਰਾਹੀਂ ਵਿਕਲਪਿਕ ਪਾਰਟੀਸ਼ਨ ਰਿਟੇਨਸ਼ਨ** (0 ਸਭ ਕੁਝ ਰੱਖਦਾ ਹੈ), ਜੋ
  ਟੇਬਲ ਬਣਾਏ ਜਾਣ ਵੇਲੇ ਲਾਗੂ ਹੁੰਦਾ ਹੈ।

ਦੋਵੇਂ ਸੈਟਿੰਗਾਂ ਬਣਾਉਣ ਵੇਲੇ ਲਾਗੂ ਹੁੰਦੀਆਂ ਹਨ। ਮੌਜੂਦਾ ਟੇਬਲ ਆਪਣਾ ਪਹਿਲਾਂ ਵਾਲਾ ਲੇਆਉਟ ਹੀ ਰੱਖਦੀ ਹੈ, ਇਸ ਲਈ
ਜੇ ਤੁਸੀਂ ਇਨ੍ਹਾਂ ਨੂੰ ਅਪਣਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ, ਤਾਂ ਮੰਜ਼ਿਲ ਨੂੰ ਇੱਕ ਨਵੀਂ ਟੇਬਲ id ਵੱਲ ਦਰਸਾਓ।

`tests/unit/log-export-bigquery.test.ts` ਇਹ ਪੁਸ਼ਟੀ ਕਰਦੀ ਹੈ ਕਿ ਮੈਪਰ ਅਤੇ ਟੇਬਲ ਸਕੀਮਾ ਆਪਸ ਵਿੱਚ
ਪੂਰੀ ਤਰ੍ਹਾਂ ਤਾਲਮੇਲ ਵਿੱਚ ਰਹਿੰਦੇ ਹਨ, ਤਾਂ ਜੋ ਬਾਹਰ ਭੇਜਣ ਦੌਰਾਨ ਕੋਈ ਨਵਾਂ ਕਾਲ-ਲੌਗ ਕਾਲਮ ਚੁੱਪਚਾਪ ਹਟਾਇਆ ਨਾ ਜਾ ਸਕੇ।

ਬੈਚਾਂ ਨੂੰ ਕਤਾਰਾਂ ਦੀ ਗਿਣਤੀ ਅਤੇ ਸੀਰੀਅਲਾਈਜ਼ ਕੀਤੇ ਬਾਈਟਾਂ, **ਦੋਵਾਂ** ਦੇ ਆਧਾਰ 'ਤੇ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡਿਆ ਜਾਂਦਾ ਹੈ। ਪੇਲੋਡ ਐਕਸਪੋਰਟ ਹੋਣ 'ਤੇ
ਸਿਰਫ਼ ਕਤਾਰਾਂ ਦੀ ਗਿਣਤੀ ਕਾਫ਼ੀ ਨਹੀਂ ਹੁੰਦੀ: ਪ੍ਰੌਂਪਟਾਂ ਵਾਲੀਆਂ 500 ਕਤਾਰਾਂ ਦਾ ਆਕਾਰ ਕਈ ਦਹਾਕੇ ਮੇਗਾਬਾਈਟ ਹੋ ਸਕਦਾ ਹੈ, ਅਤੇ insertAll
10 MB ਤੋਂ ਵੱਡੀ ਬੇਨਤੀ ਨੂੰ ਅਸਵੀਕਾਰ ਕਰਦਾ ਹੈ। ਹਿੱਸੇ 500 ਕਤਾਰਾਂ ਜਾਂ 9 MB 'ਤੇ ਬੰਦ ਹੋ ਜਾਂਦੇ ਹਨ, ਜੋ ਵੀ ਪਹਿਲਾਂ ਆਵੇ।

---

## 5. ਡੈਸਟਿਨੇਸ਼ਨ ਸ਼ਾਮਲ ਕਰਨਾ

1. ਇੱਕ `LogExportDestinationType` ਐਕਸਪੋਰਟ ਕਰਨ ਵਾਲੀ `src/lib/logExport/destinations/<name>.ts` ਫ਼ਾਈਲ ਬਣਾਓ:
   UI ਲਈ ਇੱਕ Zod `configSchema`, ਇੱਕ `fields` ਡਿਸਕ੍ਰਿਪਟਰ ਐਰੇ, `secretFields`, ਅਤੇ
   `test()` / `prepare()` / `send(records)` ਵਾਪਸ ਕਰਨ ਵਾਲਾ `createClient(config)`।
2. ਇਸਨੂੰ `src/lib/logExport/registry.ts` ਵਿੱਚ `DESTINATIONS` ਐਰੇ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ।
3. `tests/unit/` ਹੇਠ ਟੈਸਟ ਲਿਖੋ।

ਇਹੀ ਪੂਰੀ ਤਬਦੀਲੀ ਹੈ: ਪਰਸਿਸਟੈਂਸ, cron ਜੌਬ, REST ਲੇਅਰ, ਸੀਕ੍ਰੇਟ ਇਨਕ੍ਰਿਪਸ਼ਨ ਅਤੇ
ਡੈਸ਼ਬੋਰਡ ਫ਼ਾਰਮ—ਸਾਰੇ ਰਜਿਸਟਰੀ ਨੂੰ ਪੜ੍ਹਦੇ ਹਨ।

ਨਵੇਂ ਡੈਸਟਿਨੇਸ਼ਨ ਲਈ ਦੋ ਨਿਯਮ:

- ਅੰਸ਼ਕ ਅਸਫਲਤਾ ਹੋਣ 'ਤੇ `send()` ਨੂੰ **ਲਾਜ਼ਮੀ ਤੌਰ 'ਤੇ ਥ੍ਰੋ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ**। ਰਿਜ਼ਾਲਵ ਹੋਣ ਦਾ ਅਰਥ ਹੈ, "ਡੈਸਟਿਨੇਸ਼ਨ ਕੋਲ ਇਹ ਕਤਾਰਾਂ ਮੌਜੂਦ ਹਨ",
  ਅਤੇ ਕਰਸਰ ਉਨ੍ਹਾਂ ਤੋਂ ਪੱਕੇ ਤੌਰ 'ਤੇ ਅੱਗੇ ਚਲਾ ਜਾਂਦਾ ਹੈ।
- ਉਪਭੋਗਤਾ ਵੱਲੋਂ ਦਿੱਤਾ URL ਲੈਣ ਵਾਲੇ ਡੈਸਟਿਨੇਸ਼ਨ ਨੂੰ fetch ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ,
  webhooks ਵਾਂਗ ਹੀ, `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) ਰਾਹੀਂ ਉਸਦੀ ਵੈਧਤਾ ਜਾਂਚਣੀ ਲਾਜ਼ਮੀ ਹੈ।
  BigQuery ਨੂੰ ਇਸਦੀ ਲੋੜ ਨਹੀਂ ਹੈ: ਇਸਦੇ hosts ਸਥਿਰ ਹਨ।

---

## 6. ਇਸਨੂੰ ਚਲਾਉਣਾ

- **ਡੈਸ਼ਬੋਰਡ**: Integrations → Log export। ਇੱਕ ਡੈਸਟਿਨੇਸ਼ਨ ਸ਼ਾਮਲ ਕਰੋ, ਕਤਾਰਾਂ ਲਿਖੇ ਬਿਨਾਂ ਕ੍ਰੈਡੈਂਸ਼ਲ ਜਾਂਚਣ ਲਈ **Test** ਚਲਾਓ, ਫਿਰ ਇਸਨੂੰ ਸਮਰੱਥ ਕਰੋ।
- **ਬੈਕਲੌਗ**: ਹਰ ਡੈਸਟਿਨੇਸ਼ਨ ਕਾਰਡ ਬਕਾਇਆ ਕਤਾਰਾਂ ਅਤੇ ਕਰਸਰ ਦਿਖਾਉਂਦਾ ਹੈ; `GET
/api/log-export/status` ਇਹੀ ਅੰਕੜੇ ਅਤੇ ਆਖਰੀ 20 ਜੌਬ ਰਨ ਵਾਪਸ ਕਰਦਾ ਹੈ।
- **ਇੱਕ ਅਸਫਲ ਡੈਸਟਿਨੇਸ਼ਨ ਹੋਰਾਂ ਨੂੰ ਅਸਫਲ ਨਹੀਂ ਕਰਦਾ** — ਰਨ ਸੰਖੇਪ `last_status` / `last_error` ਵਿੱਚ ਹਰ ਡੈਸਟਿਨੇਸ਼ਨ ਦੀ
  ਸਥਿਤੀ ਦਰਜ ਕਰਦਾ ਹੈ, ਅਤੇ ਜੌਬ ਰਨ ਇਤਿਹਾਸ ਸਮੁੱਚਾ ਨਤੀਜਾ ਸੰਭਾਲਦਾ ਹੈ।
- **ਕਿਸੇ ਡੈਸਟਿਨੇਸ਼ਨ ਨੂੰ ਮਿਟਾਉਣ ਨਾਲ ਉਸਦਾ ਕਰਸਰ ਵੀ ਮਿਟ ਜਾਂਦਾ ਹੈ।** ਇਸਨੂੰ ਦੁਬਾਰਾ ਸ਼ਾਮਲ ਕਰਨ 'ਤੇ ਇਹ ਸਭ ਤੋਂ ਪੁਰਾਣੇ ਸੰਭਾਲੇ ਹੋਏ
  ਕਾਲ ਲੌਗ ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਉਹ ਕਤਾਰਾਂ ਮੁੜ ਭੇਜੀਆਂ ਜਾਂਦੀਆਂ ਹਨ ਜੋ ਡੈਸਟਿਨੇਸ਼ਨ ਕੋਲ ਪਹਿਲਾਂ ਹੀ ਹੋ ਸਕਦੀਆਂ ਹਨ। BigQuery ਵਿੱਚ ਹਰ ਕਤਾਰ ਦਾ
  `insertId` ਇਸਨੂੰ ਸਿਰਫ਼ BigQuery ਦੀ ਆਪਣੀ ਡੀ-ਡੁਪਲੀਕੇਸ਼ਨ ਵਿੰਡੋ ਅੰਦਰ ਹੀ ਸੰਭਾਲਦਾ ਹੈ, ਇਸ ਲਈ ਡੈਸਟਿਨੇਸ਼ਨ ਨੂੰ ਮਿਟਾਉਣ ਦੀ ਬਜਾਏ
  ਅਸਮਰੱਥ ਕਰਨ ਨੂੰ ਤਰਜੀਹ ਦਿਓ।
