# OmniRoute CLI Plugin System (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

ขยายความสามารถของ CLI `omniroute` โดยไม่ต้องแก้ไขส่วนแกนหลัก ปลั๊กอินใช้รูปแบบการตั้งชื่อ `omniroute-cmd-*` ซึ่งคล้ายกับ `gh extension` หรือ `kubectl plugin`

## เริ่มต้นอย่างรวดเร็ว

```bash
# ติดตั้งปลั๊กอินจาก npm
omniroute plugin install stripe

# ติดตั้งปลั๊กอินภายในเครื่องที่อยู่ระหว่างการพัฒนา
omniroute plugin install ./my-plugin

# แสดงรายการปลั๊กอินที่ติดตั้งแล้ว
omniroute plugin list

# สร้างโครงร่างปลั๊กอินใหม่
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## โครงสร้างปลั๊กอิน

ปลั๊กอินคือแพ็กเกจ npm ที่มีชื่อว่า `omniroute-cmd-<name>` (หรือ `@scope/omniroute-cmd-<name>`)

```
omniroute-cmd-myplugin/
├── package.json     # ต้องมี "type": "module" และ "main": "index.mjs"
├── index.mjs        # ส่งออก register(program, ctx) และ meta ที่เป็นตัวเลือก
└── README.md
```

### `package.json`

```json
{
  "name": "omniroute-cmd-myplugin",
  "version": "0.1.0",
  "type": "module",
  "main": "index.mjs",
  "engines": { "omniroute": ">=4.0.0" },
  "keywords": ["omniroute-plugin", "omniroute-cmd"]
}
```

### `index.mjs`

```js
export const meta = {
  name: "myplugin",
  version: "0.1.0",
  description: "ปลั๊กอินของฉันสำหรับ OmniRoute",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("myplugin")
    .description(meta.description)
    .option("-n, --name <name>")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      const res = await ctx.apiFetch("/api/combos", {
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = await res.json();
      ctx.emit(data, gOpts);
    });
}
```

## API บริบทของปลั๊กอิน

ออบเจ็กต์ `ctx` ที่ส่งไปยัง `register(program, ctx)`:

| คุณสมบัติ                    | ชนิด             | คำอธิบาย                                                          |
| ---------------------------- | ---------------- | ----------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | ดำเนินการ fetch ที่ผ่านการตรวจสอบสิทธิ์ไปยังเซิร์ฟเวอร์ OmniRoute |
| `ctx.emit(data, opts)`       | `function`       | ส่งออกในรูปแบบ table/json/jsonl/csv ตามแฟล็ก `--output`           |
| `ctx.t(key)`                 | `async function` | ค้นหาคำแปลสำหรับ i18n                                             |
| `ctx.withSpinner(label, fn)` | `async function` | ครอบฟังก์ชัน async ด้วยตัวแสดงสถานะ ora                           |
| `ctx.baseUrl`                | `string`         | URL ฐานที่ผ่านการกำหนดค่าแล้ว                                     |
| `ctx.apiKey`                 | `string \| null` | คีย์ API หากมีการระบุ                                             |

## การค้นหา

ระบบค้นหาปลั๊กอินจาก:

1. `~/.omniroute/plugins/<name>/` — การติดตั้งเฉพาะผู้ใช้
2. ตัวแปรสภาพแวดล้อม `OMNIROUTE_PLUGIN_PATH` — ไดเรกทอรีที่กำหนดเอง

ทั้งสองรายการใช้สำหรับ **CLI เท่านั้น** รันไทม์ปลั๊กอินฝั่งเซิร์ฟเวอร์ (ปลั๊กอิน marketplace/`plugin.json`
ที่ทำงานภายในพร็อกซี) มีตัวสแกนและตัวแปรสำหรับเขียนทับเป็นของตนเองคือ
`OMNIROUTE_PLUGINS_DIR` — ดู
[PLUGIN_MARKETPLACE.md → ไดเรกทอรีปลั๊กอิน](./PLUGIN_MARKETPLACE.md#plugin-directory)
การตั้งค่ารายการหนึ่งจะไม่ส่งผลต่ออีกรายการหนึ่ง

ข้อผิดพลาดในการโหลดจะถูกดักจับและแสดงเป็นคำเตือน — ปลั๊กอินที่เสียหายจะไม่ทำให้ CLI หยุดทำงาน

## ความปลอดภัย

ปลั๊กอินทำงานด้วยสิทธิ์ของกระบวนการ Node.js เดียวกับ `omniroute` ติดตั้งปลั๊กอินจากแหล่งที่คุณเชื่อถือเท่านั้น `omniroute plugin install` จะแสดงคำเตือนอย่างชัดเจนและต้องใช้ `--yes` หรือการยืนยันแบบโต้ตอบ

## การเผยแพร่

1. ตรวจสอบว่า `package.json` มี `"keywords": ["omniroute-plugin"]`
2. ใช้ `npm publish` ตามปกติ
3. ผู้ใช้สามารถค้นหาผ่าน `omniroute plugin search <query>` (ค้นหาในรีจิสทรี npm)

## ปลั๊กอินตัวอย่าง

ดู [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) สำหรับตัวอย่างขั้นต่ำที่ใช้งานได้พร้อม `meta` + `register()`
