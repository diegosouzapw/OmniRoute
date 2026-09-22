# Import providers from a CSV or JSON file (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **นำเข้าจากไฟล์** จะสร้างการเชื่อมต่อด้วย API key จากรายการ CSV หรือ JSON แต่ละแถวสามารถระบุผู้ให้บริการที่แตกต่างกันได้ การล้มเหลวบางส่วนถือเป็นพฤติกรรมตามสัญญา: แถวที่ถูกต้องจะยังคงถูกนำเข้าแม้ว่าแถวอื่นจะล้มเหลว และโมดอลจะแสดงเหตุผลที่แถวเหล่านั้นถูกปฏิเสธ

การนำเข้านี้ **จะไม่** สร้างโหนดปลายทางใหม่ที่เข้ากันได้กับ OpenAI/Anthropic ให้สร้างโหนดเหล่านั้นก่อน (Dashboard → Providers → Add OpenAI-Compatible หรือ `omniroute nodes add`) จากนั้นจึงนำเข้าแถวที่คอลัมน์ `provider` มีค่าเป็น id ของโหนดนั้น ทั้งนี้ `baseUrl` ในแต่ละแถวยังคงสามารถใช้แทน URL ของโหนดได้

## CSV (ตามตำแหน่ง)

ชื่อคอลัมน์มีไว้เพื่อการแสดงผลเท่านั้น ตัวแยกวิเคราะห์จะแบ่งแต่ละแถวและแยกค่าออกตามดัชนี:

| ดัชนี | ฟิลด์      | จำเป็น | หมายเหตุ                                                                                                                                            |
| ----- | ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | ใช่    | id ของผู้ให้บริการที่มีการจัดการอยู่แล้ว (`openai`, `anthropic`, …) **หรือ** id ของ **โหนด** ที่เข้ากันได้กับ OpenAI/Anthropic ซึ่งลงทะเบียนไว้แล้ว |
| 1     | `name`     | ใช่    | ชื่อที่ใช้แสดงของการเชื่อมต่อ                                                                                                                       |
| 2     | `apiKey`   | ใช่    | API key                                                                                                                                             |
| 3     | `baseUrl`  | ไม่    | URL ที่ใช้แทนสำหรับแต่ละแถว                                                                                                                         |
| 4     | `priority` | ไม่    | จำนวนเต็ม 1–100                                                                                                                                     |

บรรทัดแรกที่คอลัมน์แรกเป็นคำว่า `provider` ตามตัวอักษรตรงกัน (ไม่คำนึงถึงตัวพิมพ์เล็กหรือใหญ่) จะถูกข้ามในฐานะส่วนหัว บรรทัดว่างและความคิดเห็นที่ขึ้นต้นด้วย `#` จะถูกข้าม

ดาวน์โหลดไฟล์เริ่มต้นจากโมดอลนำเข้า (**ดาวน์โหลดเทมเพลต CSV**) ตัวอย่าง:

```csv
# การนำเข้าผู้ให้บริการ OmniRoute (คอลัมน์ตามตำแหน่ง)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

id ที่สร้างขึ้นเอง เช่น `openai-compatible-chat-001` ไม่ใช่โหนด API จะส่งคืน `ผู้ให้บริการที่ไม่รู้จักหรือไม่รองรับ` สำหรับแถวดังกล่าว และโมดอลจะแสดงข้อความนี้ถัดจากชื่อแถว

## JSON

อาร์เรย์ JSON ของออบเจ็กต์ที่มีฟิลด์เดียวกัน (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) โดย JSON ใช้คีย์ที่มีชื่อ ซึ่งแตกต่างจาก CSV

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
