# Embeddings client runbook (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

หมายเหตุสำหรับผู้ดูแลระบบเกี่ยวกับ `POST /v1/embeddings` เมื่อ OmniRoute อยู่ด้านหน้าของ
Hindsight 0.9.1 (`encode(list[str])` สำหรับข้อความเท่านั้น) และ Memorix 1.6.0 (เกตสื่อของ Jina)
ตรวจสอบกับระบบจริงแล้วเมื่อ 2026-08-17 โดยใช้ OmniRoute 3.8.49 ที่
`https://omniroute.jaguar-fish.ts.net/v1` ไม่มีข้อมูลลับด้านล่าง

## id ของโมเดลที่ใช้งานได้

| id ฝั่งไคลเอนต์                                | HTTP | เวกเตอร์    | มิติ    | หมายเหตุ                                         |
| ---------------------------------------------- | ---- | ----------- | ------- | ------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | แบตช์ 2 → 2 | 3072    | ใช้งานได้โดยไม่ต้องมีคีย์ Gemini แบบเนทีฟ        |
| `openrouter/google/gemini-embedding-2-preview` | 200  | แบตช์ 2 → 2 | 3072    | ใช้ปริภูมิเดียวกับ id ที่ไม่ใช่พรีวิว            |
| `openrouter/google/gemini-embedding-001`       | 200  | แบตช์ 2 → 2 | 3072    | แสดงอยู่ใน `GET /v1/embeddings`                  |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | แบตช์ 2 → 2 | 1024    | id มาตรฐานของ Jina omni                          |
| `jina/jina-embeddings-v5-omni-small`           | 200  | แบตช์ 2 → 2 | 1024    | นามแฝง โดย `model` ในการตอบกลับคือ `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | แบตช์ 2 → 2 | 1024    | id เปล่า ๆ ก็ถูกแปลงได้เช่นกัน                   |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | เป็นคนละปริภูมิเวกเตอร์กับ small                 |

`GET /v1/models` และ `GET /v1/embeddings` แสดงรายการ
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) และ
`openrouter/google/gemini-embedding-001` แต่ **ไม่ได้** แสดง
`openrouter/google/gemini-embedding-2` แม้ว่า id นี้จะให้บริการได้แล้วก็ตาม

อย่าผสม nano (768 มิติ) และ small (1024 มิติ) ไว้ในดัชนีเดียวกัน เนื่องจาก
ไม่สามารถเปรียบเทียบกันได้

## id ที่ใช้งานไม่ได้ / ชวนให้เข้าใจผิด

### Gemini Embedding 2 แบบเนทีฟ

คำขอ:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

ผลลัพธ์จริง (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` ส่งคืน 400 แบบเดียวกัน ส่วน `google/gemini-embedding-2`
ส่งคืน HTTP **400** `Unknown embedding provider: google` เว้นแต่ว่าโหนดผู้ให้บริการ
แบบกำหนดเองจะใช้คำนำหน้า `google`

ผลลัพธ์ที่คาดหวัง: การสร้าง embedding ด้วย Gemini แบบเนทีฟโดยใช้คีย์ Google AI Studio
บนผู้ให้บริการ `gemini` หรือข้อผิดพลาด 400 ที่ระบุ id ของ OpenRouter ที่ใช้งานได้

วิธีทำซ้ำ (ปกปิด bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

ตัวเลือกทดแทนที่ใช้งานได้:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` แบบเนทีฟไม่สามารถทำงานได้ด้วย GitOps เพียงอย่างเดียว ต้องเพิ่มคีย์
Google AI Studio เป็นการเชื่อมต่อของผู้ให้บริการ `gemini` (ผ่านแดชบอร์ดหรือ
นำเข้า `GEMINI_API_KEY` ไปยัง OmniRoute) ข้อมูลลับดังกล่าวไม่มีอยู่ใน repo นี้

### เส้นทางมัลติโหมดของ Jina

`POST /v1/multimodal-embeddings` → HTTP **404**

```json
{
  "error": {
    "message": "Unknown API route: /v1/multimodal-embeddings",
    "type": "not_found",
    "code": "unknown_route",
    "path": "/v1/multimodal-embeddings"
  }
}
```

ให้ใช้ `POST /v1/embeddings` จนกว่าจะมีนามแฝง

### อ็อบเจกต์รูปภาพของ Jina / Memorix

รายการรูปภาพมาตรฐานของ OmniRoute (PNG ขนาด 28×28, 784 พิกเซล — Jina ปฏิเสธรูปขนาด 1×1):

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [
    {
      "type": "image",
      "source": {
        "type": "base64",
        "data": "<base64-png>",
        "media_type": "image/png"
      }
    }
  ]
}
```

ผลลัพธ์จริง: HTTP **200**, 1 เวกเตอร์, 1024 มิติ

รูปแบบเนทีฟของ Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

ผลลัพธ์จริง: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

การผสม `{ "text": "..." }` กับ `{ "image": "data:..." }` ให้ผลลัพธ์ 400 แบบเดียวกัน

## หมายเหตุสำหรับไคลเอนต์

### Hindsight 0.9.1

embedding ของ Hindsight รองรับเฉพาะข้อความ (`encode(list[str])`) และไม่ส่ง
อ็อบเจกต์รูปภาพ ให้กำหนด URL ฐานสำหรับ embedding ที่เข้ากันได้กับ OpenAI ของ Hindsight
ไปยัง `/v1` ของ OmniRoute และใช้ id ที่ใช้งานได้จากตารางด้านบน
(`jina-ai/jina-embeddings-v5-omni-small` หรือ
`openrouter/google/gemini-embedding-2`) อย่าตั้งค่าโมเดลเป็น
`gemini-embedding-2` แบบไม่มีคำนำหน้า เว้นแต่จะมีคีย์ API ของ `gemini`
อยู่บนเกตเวย์

### Memorix 1.6.0

Memorix จะถือว่าเป็นสื่อแบบเนทีฟเฉพาะเมื่อ `baseUrl` ตรงกับ `/jina\.ai/i`
เท่านั้น URL ของ OmniRoute จะยังคงใช้เส้นทางสำหรับข้อความเท่านั้น แม้ว่าโมเดลจะเป็น
Jina omni ก็ตาม เกตดังกล่าวเป็นปัญหาของไคลเอนต์ Memorix นอกจากนี้ OmniRoute
ยังปฏิเสธ body รูปแบบ `{image: "data:..."}` ของ Jina ที่ Memorix จะส่งหากเกต
เปิดอยู่ ดังนั้นไคลเอนต์ที่เข้ากันได้กับ Jina จึงไม่สามารถสร้าง embedding จากรูปภาพ
ผ่าน OmniRoute ได้หากไม่ใช้ schema มาตรฐาน `{type,source}`

ให้ใช้ `jina-ai/jina-embeddings-v5-omni-small` สำหรับข้อความ อย่ากำหนด
`base_url` ของ Memorix ไปที่ `https://api.jina.ai` — ให้ OmniRoute เป็นฮอปเดียวเท่านั้น
