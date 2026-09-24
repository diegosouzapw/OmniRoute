# SQLite Runtime Resolution (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute გაშვებისას თავის SQLite დრაივერს 5-საფეხურიანი სარეზერვო ჯაჭვის მეშვეობით განსაზღვრავს:

1. **პაკეტში ჩაშენებული `better-sqlite3`** (`package.json`-ის `dependencies`-ის მეშვეობით)
   — ყველაზე სწრაფი, ნატიური ბინარული ფაილი, რომელსაც `npm install` აყენებს, როდესაც კომპილაციის ხელსაწყოები ხელმისაწვდომია.

2. **შესრულების დროს დაყენებული `better-sqlite3`** (`~/.omniroute/runtime/`-ში)
   — ზარმაცად ყენდება პირველი გაშვებისას **ან** `scripts/build/postinstall.mjs → scripts/postinstall.mjs`-ის მიერ.
   ჩატვირთვამდე ამოწმებს ნატიური `.node` ფაილის მაგიურ ბაიტებს (ELF / Mach-O / PE),
   რათა დაცული იყოს დაზიანებული ან სხვა პლატფორმისთვის განკუთვნილი ბინარული ფაილებისგან.

3. **`node:sqlite`** (Node ≥22.5-ის სტანდარტული ბიბლიოთეკა) — ნატიური კომპილაცია არ სჭირდება; გამოიყენება, როდესაც
   better-sqlite3-ის ორივე გზა წარუმატებელია. აქვს ფუნქციების შეზღუდული ნაკრები.

4. **`sql.js`** (WASM) — საბოლოო სარეზერვო ვარიანტი. ყველგან მუშაობს, თუმცა უფრო ნელია
   და მონაცემებს სინქრონულად ჩაწერის ნაცვლად პერიოდული ინტერვალებით წერს.

## რატომ არის საჭირო ასეთი სირთულე?

- **Windows EBUSY**: `npm install -g omniroute@latest` შეიძლება წარუმატებლად დასრულდეს, თუ წინა
  ვერსიის `better_sqlite3.node` გაშვებული პროცესის მიერ არის დაბლოკილი. შესრულების დროის
  ინსტალაცია `~/.omniroute/runtime/`-ში გვერდს უვლის npm-ის გლობალურ კეშს.
- **კომპილაციის ხელსაწყოების არარსებობა**: ზოგიერთ გარემოს (კორპორაციული Windows VS Build
  Tools-ის გარეშე, მინიმალური Docker-ის იმიჯები) არ შეუძლია `better-sqlite3`-ის კომპილაცია. შესრულების დროის
  ინსტალატორი npm-ის რეესტრიდან წინასწარ დაკომპილირებულ ბინარულ ფაილს იღებს; სარეზერვო
  დრაივერები უზრუნველყოფენ, რომ OmniRoute მაინც გაეშვას, თუნდაც ეს პროცესი წარუმატებელი იყოს.
- **ქსელისგან იზოლირებული სისტემები**: თუ npm-ის რეესტრი მიუწვდომელია, `node:sqlite`
  ან `sql.js` საბაზისო ფუნქციონირებას უზრუნველყოფს.

## მაგიური ბაიტების ვალიდაცია

შესრულების დროს დაყენებული `.node` ფაილის ჩატვირთვამდე OmniRoute კითხულობს პირველ 8
ბაიტს და ადარებს ცნობილი პლატფორმების მაგიურ მნიშვნელობებს:

| პლატფორმა                | ბაიტები (hex) | ჭდე         |
| ------------------------ | ------------- | ----------- |
| Linux                    | `7F 45 4C 46` | `elf`       |
| macOS 64-ბიტიანი BE      | `FE ED FA CF` | `macho`     |
| macOS 64-ბიტიანი LE      | `CF FA ED FE` | `macho-le`  |
| macOS fat (უნივერსალური) | `CA FE BA BE` | `macho-fat` |
| Windows                  | `4D 5A` (MZ)  | `pe`        |

შეუსაბამო მაგიური მნიშვნელობა → ფაილი იგნორირდება და სარეზერვო პროცესი შემდეგ საფეხურზე გადადის.

## აქტიური დრაივერის შემოწმება

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ხელით მართვა

```bash
# postinstall-ის წინასწარი მომზადების გამოტოვება (CI-ის სწრაფი ინსტალაციებისთვის)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# შესრულების დროის better-sqlite3-ის იძულებითი ხელახლა ინსტალაცია
rm -rf ~/.omniroute/runtime
omniroute  # ხელახლა დაინსტალირდება შემდეგი გაშვებისას

# აქტიური დრაივერის შემოწმება
omniroute config db-info  # (თუ CLI ბრძანება არსებობს)
```

## ცნობარი

იმპლემენტაცია:

- `bin/cli/runtime/magicBytes.mjs` — ბინარული ფაილის მაგიური ბაიტების ვალიდაციის დამხმარე ფუნქციები
- `bin/cli/runtime/sqliteRuntime.mjs` — შესრულების დროის 5-საფეხურიანი განმსაზღვრელი + ზარმაცი ინსტალატორი
- `bin/cli/runtime/index.mjs` — გაშვების ორკესტრატორი (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-ის ინსტალაციის შემდგომი ჰუკი (არაფატალური წინასწარი მომზადება)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()`-ის ექსპორტები

## ერთი ჩამწერის ტოპოლოგია (HA მხარდაჭერილი არ არის)

ზემოთ აღწერილი დრაივერების სარეზერვო ჯაჭვი კვლავ **ერთ პროცესში** მუშაობს. ნაგულისხმევი SQLite-ის
მქონე OmniRoute-ს **ერთი ჩამწერი** ჰყავს:

- არ მიაერთოთ OmniRoute-ის ორი რეპლიკა ერთსა და იმავე `storage.sqlite` ფაილზე.
- კონტეინერის ხელახლა გაშვება, Recreate განთავსება, OOM-ით დასრულება ან HEALTHCHECK-ის მიერ ხელახლა გაშვება
  ყველა მიმდინარე SSE სესიას წყვეტს. სტანდარტულ გზაზე სესიების ეტაპობრივი დასრულება არ ხდება.
- ორკესტრატორის სიცოცხლისუნარიანობის შემოწმება, რომელიც ნელ `/healthz`-ს გათიშულად აღიქვამს, ერთადერთ
  რეპლიკას გაანადგურებს. უპირატესობა მიანიჭეთ TCP სიცოცხლისუნარიანობის შემოწმებას + HTTP `/healthz` მზადყოფნის შემოწმებას. იხილეთ
  [Docker-ის სახელმძღვანელო — ხელმისაწვდომობა](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  და [Kubernetes-ის შემოწმებების რეკომენდაციები](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
