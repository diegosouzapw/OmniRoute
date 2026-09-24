# CLI Integrations (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute `setup-*` buyruqlari oilasini yetkazib beradi, ular kodlash CLI (Codex, Claude Code, OpenCode, Cline, …) ni OmniRoute'ni o'zining backend'i sifatida ishlatish uchun sozlaydi — shunda vosita **bitta** yakuniy nuqta bilan bog'lanadi va OmniRoute avtomatik zaxira bilan to'g'ri provayderga yo'naltiradi. Har bir buyruq ishlayotgan OmniRoute'dan (mahalliy yoki masofaviy) **jonli** model katalogini o'qiydi va vositaning o'z konfiguratsiya faylini **sizning** kompyuteringizga yozadi. API kaliti vosita qo'llab-quvvatlaydigan joyda muhit o'zgaruvchisi orqali ko'rsatiladi. Vosita-mahalliy muhit faylini saqlovchi buyruqlar quyida qayd etilgan.

Shuningdek, umumiy ishga tushiruvchi — `omniroute run <target>` — mavjud bo'lib, u `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` yoki `gemini` ni to'g'ri muhit bilan in'ektsiya qilib ishga tushiradi, hech qanday konfiguratsiya yozmasdan. Maqsadlar va ularning taxalluslari kanonik manifest `bin/cli/cli-manifest.mjs` dan keladi (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), va `omniroute completion` xuddi shu manifestdan olingan maqsad so'zlarni taklif qiladi. Eski vosita-bo'yicha ishga tushiruvchilar — `omniroute launch` (Claude Code) va `omniroute launch-codex` (Codex) — mavjudligicha qoladi.

Provayderlarni ishga tushirish xuddi shu mahalliy/masofaviy kontekstdan mavjud. Quyidagi API-birinchi buyruqlar boshqaruv autentifikatsiyasini provayder ma'lumotlaridan alohida saqlaydi va hech qachon tuzilgan chiqishda ma'lumotlarni chop etmaydi:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Skriptlar uchun `--credential-stdin` yoki `--credential-env` ni afzal ko'ring; `--credential` nazorat qilinadigan mahalliy foydalanish uchun saqlanib qolgan. `providers remove` interaktiv bo'lmagan terminalda `--yes` ni talab qiladi va barcha beshta buyruq faol kontekstni yoki global `--base-url`/`--api-key` opsiyalarini hurmat qiladi.

Provayder selektorlari noaniq ID prefikslarini, nomlarni yoki provayder nomlarini rad etadi; bir nechta ulanish mos kelganda to'liq ulanish ID'sini ishlating. Yaratish va tahrirlash buyruqlari saqlangan ulanishni qayta o'qiydi va o'chirish uning endi o'qilmasligini tekshiradi. Import mavjud provayder/nom juftligini o'tkazib yuboradi. Import qilingan yozuvlar CLI'ga taqdim etilgan boshqaruv yakuniy nuqtasini, kontekstni yoki boshqaruv ma'lumotlarini bekor qila olmaydi.

Ikki eng boy integratsiyaning bir martalik, qo'lda yozilgan asosiy sozlamalari uchun, vosita bo'yicha chuqur tahlillarni ko'ring:

- [Claude Code konfiguratsiyasi](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfiguratsiyasi](./CODEX-CLI-CONFIGURATION.md)
- [Masofaviy rejim](./REMOTE-MODE.md) — noutbukingizdan masofaviy OmniRoute'ni (VPS / Tailnet) boshqaring
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot kengaytmasi; u bu `setup-*` buyruqlarini muharrir ichidan siz uchun ham ishga tushirishi mumkin

---

## Asosiy jadval

Har bir buyruq **faol kontekst**ni (`omniroute connect` yordamida oʻrnatiladi,
[Masofaviy rejim](./REMOTE-MODE.md)ga qarang) yoki aniq koʻrsatilgan
`--remote <url> --api-key <key>` parametrlarini hisobga oladi.
Quyidagi “Mahalliy va masofaviy” taqqoslashining maʼnosi: parametrlar berilmasa,
u `http://localhost:20128`ga murojaat qiladi; `--remote` berilganda (yoki faol
masofaviy kontekst mavjud boʻlsa), katalogni oʻsha serverdan oladi va
konfiguratsiyani mahalliy kompyuterga yozadi.

| Buyruq                     | Vosita                               | Nima yozadi                                                                                                                                                                                                       | Asosiy bayroqlar                                                                                                                           | Mahalliy yoki masofaviy |
| -------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                     | `~/.codex/<name>.config.toml` — har bir mos matn modeli uchun bittadan profil (`codex --profile <name>`)                                                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Ikkalasi ham            |
| `omniroute setup-claude`   | Claude Code                          | `~/.claude/profiles/<name>/settings.json` — har bir mos kelgan model uchun bittadan profil (`CLAUDE_CONFIG_DIR`)                                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Ikkalasi ham            |
| `omniroute setup-opencode` | OpenCode (OpenAI bilan mos)          | `~/.config/opencode/opencode.json` — katalogdagi barcha modellarga ega `omniroute` provayderi (`opencode -m omniroute/<model>`)                                                                                   | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Ikkalasi ham            |
| `omniroute setup-cline`    | Cline                                | `~/.cline/data/{globalState,secrets}.json` (CLI rejimi) + VS Code kengaytmasi sozlamalarini chiqaradi                                                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Ikkalasi ham            |
| `omniroute setup-kilo`     | Kilo Code                            | `~/.local/share/kilo/auth.json` (CLI) + mavjud bo‘lsa, `kilocode.*` sozlamalarini VS Code `settings.json` fayliga birlashtiradi                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Ikkalasi ham            |
| `omniroute setup-continue` | Continue / `cn` CLI                  | `~/.continue/config.yaml` — `provider: openai` modellari, kalit `${{ secrets.OMNIROUTE_API_KEY }}` orqali                                                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ikkalasi ham            |
| `omniroute setup-cursor`   | Cursor                               | Hech narsa — ilova ichidagi qadamlarni chiqaradi (Cursor konfiguratsiyasi yopiq SQLite formatida)                                                                                                                 | `--remote` `--api-key` `--only` `--port`                                                                                                   | Ikkalasi ham            |
| `omniroute setup-roo`      | Roo Code                             | `~/.omniroute/roo-settings.json` (import hujjati) + agar VS Code `settings.json` mavjud bo‘lsa, `roo-cline.autoImportSettingsPath` qiymatini o‘rnatadi                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Ikkalasi ham            |
| `omniroute setup-crush`    | Crush                                | `~/.config/crush/crush.json` — `openai-compat` provayderi, kalit `$OMNIROUTE_API_KEY` orqali                                                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ikkalasi ham            |
| `omniroute setup-goose`    | Goose                                | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + muhit o‘zgaruvchilari retseptini chiqaradi                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ikkalasi ham            |
| `omniroute setup-aider`    | Aider                                | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + muhit o‘zgaruvchilari retseptini chiqaradi                                                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ikkalasi ham            |
| `omniroute setup-qwen`     | Qwen Code                            | `~/.qwen/settings.json` — V4 `modelProviders.openai` massivi + `~/.qwen/.env` ichidagi `OMNIROUTE_API_KEY`                                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Ikkalasi ham            |
| `omniroute setup-5dive`    | 5dive (agentlar parki)               | `$HOME` ostida hech narsa yo‘q — `5dive agent auth set` orqali 5dive **autentifikatsiya profili**ni (`/var/lib/5dive/auth-profiles/<name>/`) yozadi; faqat root uchun, park xostida ishlaydi                      | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Ikkalasi ham            |
| `omniroute run <target>`   | Ish vaqtida ishga tushirish (umumiy) | Hech narsa — `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` jarayonini tegishli muhit va argumentlar bilan ishga tushiradi; Qwen va Gemini vaqtinchalik izolyatsiyalangan uy katalogidan foydalanadi | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Ikkalasi ham            |
| `omniroute launch`         | Claude Code                          | Hech narsa — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` kiritilgan holda `claude` jarayonini ishga tushiradi                                                                                                     | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Ikkalasi ham            |
| `omniroute launch-codex`   | OpenAI Codex CLI                     | Hech narsa — `-c` bayroqlari orqali `omniroute` provayderi kiritilgan holda `codex` jarayonini ishga tushiradi                                                                                                    | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Ikkalasi ham            |

Bayroqlar bo‘yicha izohlar (buyruq manbasida tekshirilgan):

- `--remote <url>` — katalogni masofaviy OmniRoute’dan oladi (`--port`
  va faol kontekstni bekor qiladi). `--api-key <key>` o‘sha server uchun
  hisob ma’lumotini taqdim etadi (standart qiymat — `OMNIROUTE_API_KEY` muhit
  o‘zgaruvchisi yoki faol kontekst tokeni).
- `--only <patterns>` — vergul bilan ajratilgan quyi satrlar; faqat mos keladigan
  model ID’larini saqlab qoladi (masalan, `--only glm,kimi`). `setup-codex`,
  `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`,
  `setup-crush` buyruqlarida mavjud.
- `--dry-run` — fayl tizimiga tegmasdan aynan nimalar yozilishini chiqaradi.
  `setup-cursor`dan **tashqari** barcha `setup-*` buyruqlarida mavjud
  (`setup-cursor` hech qachon fayl yozmaydi).
- `--model <id>` — modelni avtomatik aniqlamaydigan vositalar uchun majburiy
  (yoki interaktiv tarzda tanlanadi): Cline, Kilo, Roo, Goose, Qwen, Aider,
  5dive. Bu vositalar nointeraktiv ishga tushirish uchun `--yes`ni ham qabul
  qiladi (bunda `--model` majburiy bo‘ladi). `setup-opencode` yuqori darajadagi
  standart modelni belgilash uchun `--model`ni qabul qiladi.
- `omniroute run`dagi `--model <id>` manifestning har bir nishon uchun
  ulanishiga amal qiladi (`bin/cli/cli-manifest.mjs`): **aider**
  `--model openai/<id>`, **opencode** esa `--model omniroute/<id>`ni qabul
  qiladi (prefiks faqat ID’da u hali mavjud bo‘lmasa qo‘shiladi); **qwen** va
  **gemini** ID’ni aynan o‘z holicha qabul qiladi; **claude** uni
  `ANTHROPIC_MODEL` orqali, **goose** `GOOSE_MODEL` orqali, **codex** esa
  `-c model_providers.omniroute.*` argumentlari orqali oladi. **Qwen — `--model`
  parametrini qat’iy talab qiladigan yagona ishga tushirish nishoni** —
  `omniroute run qwen` usiz ishga tushirilsa, aniq xato bilan `2` kodida
  yakunlanadi.
- `--port <port>` — mahalliy OmniRoute porti (standart qiymat `20128`,
  `--remote` o‘rnatilganda e’tiborsiz qoldiriladi). Barcha `setup-*`
  buyruqlarida va har ikki ishga tushirgichda mavjud.
- `omniroute run` chiqish kodlari: quyi CLI’ning o‘z chiqish kodi aynan
  uzatiladi; `2` = noto‘g‘ri argumentlar (qo‘llab-quvvatlanmaydigan nishon,
  majburiy `--model` yo‘qligi, konteyner himoyasi); `127` = nishon binar fayli
  `PATH` ichida yo‘q; ishga tushirish `SIGINT`/`SIGTERM`/`SIGHUP` bilan
  yakunlanganda `130`/`143`/`129`; `1` = ishga tushirish vaqtidagi boshqa xato.
- Ikki ishga tushirgich (`launch`, `launch-codex`) `setup-claude` /
  `setup-codex` tomonidan yozilgan profilni tanlash uchun `--profile <name>`ni,
  shuningdek, quyi `claude` / `codex` binar fayliga uzatiladigan argumentlarni
  qabul qiladi.

Interaktiv tanlagich sozlash retseptlari tomonidan ham birgalikda ishlatiladi:

```bash
# Faol mahalliy yoki masofaviy model katalogidan tanlang va nishonni sozlang.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` hozirda `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`,
`cline`, `continue`, `kilo` va `5dive` uchun sinovdan o‘tgan retseptlarga
yo‘naltiradi. Faqat IDE uchun mo‘ljallangan, MITM va faqat qo‘llanma
ko‘rinishidagi katalog yozuvlari aniq `setup-*`/qo‘lda bajariladigan jarayonlar
sifatida qoladi va ishga tushiriladigan nishonlar sifatida taqdim etilmaydi.

> `setup-opencode` — OpenCode uchun **yengil openai-compatible** integratsiya.
> Bundan tashqari, `@omniroute/opencode-plugin`ni o‘rnatadigan yanada boyroq
> plagin integratsiyasi — `omniroute setup opencode` — ham mavjud. Ular turli
> buyruqlardir; yuqoridagi jadval `setup-opencode`ni hujjatlashtiradi.
>
> Plagin har bir OpenCode asosiy versiyasi uchun bittadan, jami ikki paketda
> taqdim etiladi, chunki ikki yuklagich turli kirish nuqtalarini kutadi:
> OpenCode v1 uchun `@omniroute/opencode-plugin` va OpenCode v2 uchun
> `@omniroute/opencode-plugin-v2`. v2 paketi yangi (`0.1.0`) va hali ham
> o‘zgarayotgan host shartnomasiga amal qiladi, shu sababli u muayyan shaklni
> taxmin qilish o‘rniga OpenCode katalog qoralamasiga joylaydigan shaklni
> o‘qiydi. Uni `opencode.json` fayliga `plugins` yozuvini qo‘shish orqali
> o‘rnating; `omniroute setup opencode` hali ham v1 paketini o‘rnatadi.
> Parametrlar va hisob ma’lumotlarini izlash tartibi paketning README faylida
> keltirilgan.

---

## Mahalliy foydalanish

OmniRoute `localhost:20128` manzilida ishlayotganida, vositangizingiz uchun sozlash buyrugʻini ishga tushirish kifoya. Katalog mahalliy serverdan olinadi.

```bash
# Codex: har bir mos model uchun profilni ~/.codex/ ichiga yozish
omniroute setup-codex
codex --profile glm52            # yaratilgan profildan foydalanish

# Claude Code: har bir model uchun profillarni yozish, soʻng ulardan birini ishga tushirish
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: barcha katalog modellari bilan openai-mos provayderni yozish
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} orqali ishlatiladi, hech qachon diskka yozilmaydi
opencode -m omniroute/glm/glm-5.2 "..."

# Avtomatik aniqlash funksiyasi boʻlmagan vositalarga modelni aniq koʻrsatish kerak:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Hech narsa yozmasdan oldindan koʻrish:
omniroute setup-continue --dry-run
```

Hech qanday konfiguratsiyani yozmasdan ishga tushirish (faqat muhit orqali kiritish):

```bash
omniroute launch                 # Claude Code → mahalliy OmniRoute
omniroute launch-codex           # Codex CLI → mahalliy OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Buyruqning aniq yoʻli: -- dan keyingi barcha narsani oʻzgartirmasdan uzatish
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Masofadan foydalanish

Istalgan sozlash buyrugʻini `--remote` + `--api-key` orqali masofaviy OmniRoute serveriga yoʻnaltiring. Katalog masofaviy serverdan olinadi; konfiguratsiya mahalliy kompyuteringizga yoziladi.

```bash
# Masofaviy VPS dagi OpenCode, faqat glm/kimi modellarini saqlab qolish
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # avval OMNIROUTE_API_KEY ni eksport qiling

# Masofaviy katalogdan Codex profillari
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# CLI vositasini bevosita masofaviy serverga ulab ishga tushirish
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Har safar `--remote`/`--api-key` parametrlarini uzatish oʻrniga, bir marta tizimga kiring va **faol kontekst** ularni avtomatik ravishda taqdim etishiga imkon bering:

```bash
omniroute connect 192.168.0.15        # cheklangan token yaratadi va kontekstni saqlaydi
omniroute setup-codex                 # ← endi masofaviy katalogdan foydalanadi
omniroute setup-opencode              # ← xuddi shunday
omniroute launch                      # ← Claude Code masofaviy serverga ulanadi
```

Kontekstlar, ruxsat doiralari va tokenlarni boshqarish haqida [Masofaviy rejim](./REMOTE-MODE.md) sahifasiga qarang.

---

## 5dive agentlar parki

[5dive](https://5dive.ai) uzoq vaqt ishlaydigan dasturlash agentlari parkini boshqaradi; ularning har biri oʻz Unix foydalanuvchisi ostidagi systemd xizmat birligidir. Uning oʻzi dasturlash CLI vositasi emas, shuning uchun `omniroute run` ishga tushirishi mumkin boʻlgan hech narsa yoʻq — `5dive` **faqat sozlash uchun** moʻljallangan nishondir.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Har ikkala shakl ham bitta 5dive **autentifikatsiya profilini** yozadi va ushbu profilga bogʻlangan har bir `claude` oʻrni keyin OmniRoute bilan ishlaydi. Ushbu nishonga xos uchta jihat mavjud:

- **U park xostida root nomidan ishlaydi.** 5dive buyruqlari mahalliy systemd xizmat birliklari va root egasidagi holat katalogi bilan ishlaydi; masofaviy rejim mavjud emas. Retsept hali root sifatida ishlamayotgan boʻlsa, `sudo` orqali oʻzini qayta ishga tushiradi (`--no-sudo` buni oʻchiradi va uning oʻrniga buyruqni chiqaradi).
- **Loopback manzili boʻlmasa, endpoint `https://` boʻlishi shart.** Agentning API kaliti har bir soʻrovda shu URL orqali uzatiladi va 5dive kompyuterdan tashqaridagi shifrlanmagan endpointni rad etadi. Xususiy LAN manzili ham bundan mustasno emas.
- **Har bir oʻringa biriktirilgan model profil sozlamasidan ustun turadi.** Profil `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` qiymatlarini oʻz ichiga oladi, ammo standart model identifikatoriga biriktirilgan oʻrin birinchi soʻrovdayoq _"Tanlangan model bilan bogʻliq muammo bor"_ xatosi bilan ishlamay qoladi. Oʻrinlarga ham modelni biriktirish uchun `--agent <name>` parametrini uzating (takrorlash mumkin); buni qilmasangiz, retsept tegishli buyruqni chiqaradi.

API kaliti 5dive vositasiga **stdin** orqali (`--api-key=-`) beriladi, shu sababli u hech qachon `ps` chiqishida koʻrinmaydi.

Profilni bitta modelga emas, OmniRoute **kombinatsiyasiga** yoʻnaltirish parkka provayderlar oʻrtasida avtomatik almashish imkonini beradi: [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) da qayd etilgan ishga tushirish jarayonida asosiy endpoint vazifa oʻrtasida butunlay ishdan chiqqanida, agent qolgan bosqichlarni zaxira endpointda yakunladi va uzilishni foydalanuvchiga koʻrsatmadi.

---

## Asosiy URL qoidalari (qaysi vositalarga `/v1` kerak)

OmniRoute OpenAI interfeysini `/v1` manzilida, Anthropic interfeysini ildizda,
mahalliy Gemini interfeysini esa `/v1beta` manzilida taqdim etadi. Har bir integratsiya
o‘z vositasi kutadigan shaklga sozlangan (buyruq manba kodida tasdiqlangan):

| Integratsiya                                                               | Yoziladigan asosiy URL | `/v1`?                                            |
| -------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | ildiz                  | Yo‘q — Cline `/v1/chat/completions` ni qo‘shadi   |
| `setup-goose` (`OPENAI_HOST`)                                              | ildiz                  | Yo‘q — Goose yo‘lni qo‘shadi                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | ildiz                  | Yo‘q — LiteLLM `/v1/chat/completions` ni qo‘shadi |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` bilan            | Ha                                                |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | ildiz                  | Yo‘q — Claude Code `/v1/messages` ni qo‘shadi     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` bilan            | Ha                                                |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` bilan            | Ha                                                |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | ildiz                  | Yo‘q — SDK `/v1beta/models/…` ni qo‘shadi         |
| `setup-5dive` (autentifikatsiya profilidagi `ANTHROPIC_BASE_URL`)          | ildiz                  | Yo‘q — Claude Code `/v1/messages` ni qo‘shadi     |

---

## Yangilashda mahalliy bog‘liqliklarni saqlash: `--include=optional`

`omniroute update` orqali yangilaganingizda (tasdiqlagandan keyin yoki `--apply` bilan),
OmniRoute o‘rnatishni ichiga kiritilgan `--include=optional` bilan ishga tushiradi:

```bash
npm install -g omniroute@latest --include=optional
```

Bu `omniroute update` buyrug‘iga uzatiladigan bayroq **emas** — yangilovchi uni
har doim qo‘llaydi. Bu npm konfiguratsiyangizda `omit=optional` o‘rnatilgan bo‘lsa
ham `optionalDependencies` (`better-sqlite3`, `keytar`, `tls-client`,
LLMLingua SLM steki) yangilanishdan keyin saqlanib qolishini kafolatlaydi; aks
holda mahalliy SQLite drayveri va OT kalitlar ombori bog‘lanishi hech qanday
ogohlantirishsiz olib tashlanardi. Aniq buyruqni qo‘llamasdan oldindan ko‘rish uchun:

```bash
omniroute update --dry-run
# [QURUQ ISHGA TUSHIRISH] Quyidagi buyruq bajariladi: npm install -g omniroute@latest --include=optional
```

Boshqa `omniroute update` bayroqlari (manba kodida tasdiqlangan): `--check`
(eskirgan bo‘lsa, 1 kodi bilan chiqish), `--apply` (so‘ramasdan o‘rnatish),
`--changelog`, `--no-backup`, `--yes`.

---

## `omniroute run gemini` orqali Google Gemini CLI

Shartnoma `@google/gemini-cli` 0.50.0 bilan tekshirilgan: CLI
`GOOGLE_GEMINI_BASE_URL` ni hisobga oladi va unga nisbatan
`POST /v1beta/models/<model>:generateContent` (hamda
`:streamGenerateContent?alt=sse`) so‘rovlarini yuboradi — bu OmniRoute’ning mahalliy
Gemini interfeysiga (`/v1beta`) aynan mos keladi. `omniroute run gemini` buni
avtomatik sozlaydi:

- `GOOGLE_GEMINI_BASE_URL` → faol OmniRoute asosiy URL manzili (ildiz, `/v1` siz);
- `GEMINI_API_KEY` → aniqlangan OmniRoute hisob ma’lumoti (parametr/muhit/kontekst);
- `.gemini/settings.json` fayli `gemini-api-key` autentifikatsiyasini tanlaydigan
  **vaqtinchalik, izolyatsiya qilingan `GEMINI_CLI_HOME`**, shu sababli saqlangan
  Google OAuth seansi (Code Assist) OmniRoute’ga yo‘naltirilgan ishga tushirishni
  hech qachon almashtirmaydi — chiqishdan keyin olib tashlanadi;
- **muhit gigiyenasi**: voris jarayon muhiti `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` va `GOOGLE_GENAI_USE_GCA` dan tozalanadi (ular
  autentifikatsiyani Vertex/Code Assist’ga yo‘naltirishi mumkin edi), qo‘shimcha
  ehtiyot chorasi sifatida esa `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  o‘rnatiladi — boshqa `run` nishonlari ham o‘z ziddiyatli o‘zgaruvchilari uchun
  xuddi shunday ishlov oladi;
- `--provider`/`--model` dan `--model <id>` ni kiritish.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini’ning ish maydoniga ishonch himoyasi avtomatlashtirilgan rejimda ham amal
qiladi — `--skip-trust` ni o‘zingiz uzating (yoki katalogga interaktiv tarzda
ishonch bildiring); ishga tushirgich ataylab uni chetlab o‘tmaydi. Bu ishga
tushirgich **ACP ro‘yxatdan o‘tkazishidan** (`src/lib/acp/registry.ts`,
`gemini --acp`) farq qiladi; u `/dashboard/acp-agents` uchun agent protokoli
integratsiyasi bo‘lib qoladi.

---

## Haqiqiy smoke tekshiruvi (ixtiyoriy)

Deterministik ishga tushirish rejasi regressiya sinovlari CI muhitida bajariladi (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). HAQIQIY bajariluvchi fayllarni HAQIQIY
OmniRoute serverida tekshirish uchun `tests/integration/upstream-cli-smoke.int.test.ts`
manzilida ixtiyoriy sinov vositasi mavjud. U hech qachon avtomatik ravishda ishga tushmaydi
(`RUN_CLI_SMOKE=1` o‘rnatilmasa, har bir quyi sinov o‘tkazib yuboriladi), hisob ma’lumotini
qiymati orqali emas, env-var NOMI orqali uzatadi, yozib olingan har qanday chiqishdan
kalitga o‘xshash satrlarni yashiradi, bajariluvchi fayli o‘rnatilmagan nishonlarni
o‘tkazib yuboradi va nosozliklarni oddiy mantiqiy qiymat o‘rniga
autentifikatsiya / yuqori oqim / konfiguratsiya sifatida tasniflaydi:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Ixtiyoriy: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` tekshiruvni cheklaydi;
`OMNIROUTE_SMOKE_TIMEOUT_MS` har bir nishon uchun 120 soniyalik vaqt cheklovini bekor qilib, yangisini belgilaydi.

---

## Shuningdek qarang

- [Claude Code konfiguratsiyasi](./CLAUDE-CODE-CONFIGURATION.md) — Claude Code bo‘yicha batafsilroq qo‘llanma
- [Codex CLI konfiguratsiyasi](./CODEX-CLI-CONFIGURATION.md) — bir martalik `[model_providers.omniroute]` asosiy sozlamasi
- [Masofaviy rejim](./REMOTE-MODE.md) — kontekstlar, qamrovi cheklangan kirish tokenlari va masofaviy serverni boshqarish
- [CLI vositalari ma’lumotnomasi](../reference/CLI-TOOLS.md) — qo‘llab-quvvatlanadigan vositalar va boshqaruv paneli sahifalarining to‘liq katalogi
- [Sozlash qo‘llanmasi](./SETUP_GUIDE.md) — o‘rnatish usullari va birinchi ishga tushirishdagi boshlang‘ich sozlash
