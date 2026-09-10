# CLI-TOOLS (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Tools — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Tools — OmniRoute

آخری بار اپ ڈیٹ: 2026-08-18

OmniRoute تین اقسام کے CLI ٹولز کے ساتھ مربوط ہے جو تین مخصوص ڈیش بورڈ صفحات پر پھیلے ہوئے ہیں:

| صفحہ           | راستہ                   | تصور                                                                                            | تعداد         |
| -------------- | ----------------------- | ----------------------------------------------------------------------------------------------- | ------------- |
| **CLI Code's** | `/dashboard/cli-code`   | کوڈنگ کے ٹولز جنہیں آپ OmniRoute کی طرف اشارہ کرتے ہیں (کلائنٹ → CLI → OmniRoute → فراہم کنندہ) | 26            |
| **CLI Agents** | `/dashboard/cli-agents` | خود مختار ایجنٹس جنہیں آپ OmniRoute کی طرف اشارہ کرتے ہیں (اسی بہاؤ، وسیع دائرہ)                | 8             |
| **ACP Agents** | `/dashboard/acp-agents` | CLIs جو OmniRoute stdio/ACP کے ذریعے بیک اینڈ کے طور پر پیدا کرتا ہے (معکوس بہاؤ)               | دیکھیں رجسٹری |

ماضی کے راستے 308 کے ذریعے ری ڈائریکٹ ہوتے ہیں: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## یہ کیسے کام کرتا ہے

```
CLI Code's / CLI Agents (استعمال کا بہاؤ):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (سب OmniRoute کی طرف اشارہ کرتے ہیں)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute صحیح فراہم کنندہ کی طرف راستہ بناتا ہے)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (معکوس پیداوار کا بہاؤ):
    کلائنٹ کی درخواست → OmniRoute → stdio/ACP کے ذریعے CLI پیدا کرتا ہے → جواب
```

**فوائد:**

- تمام ٹولز کا انتظام کرنے کے لیے ایک API کلید
- ڈیش بورڈ میں تمام CLIs کے درمیان لاگت کی نگرانی
- ہر ٹول کو دوبارہ ترتیب دیے بغیر ماڈل کی تبدیلی
- مقامی طور پر اور دور دراز کے سرورز پر کام کرتا ہے (VPS، Docker، Akamai، Cloudflare Tunnel)

---

## `setup-*` کے ساتھ خودکار ترتیب

آپ کو ہر ٹول کی ترتیب ہاتھ سے لکھنے کی ضرورت نہیں ہے۔ OmniRoute ایک `setup-*`
کمانڈ فراہم کرتا ہے جو ایک چلتے ہوئے
OmniRoute (مقامی یا دور) سے **زندہ** ماڈل کی کیٹلاگ پڑھتا ہے اور آپ کے مشین پر ٹول کی اپنی ترتیب لکھتا ہے:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

ہر ایک `--remote <url> --api-key <key>` قبول کرتا ہے (ایک مقامی ٹول کو دور OmniRoute کے خلاف ترتیب دینا)، `--dry-run` (لکھے بغیر پیش نظارہ)، اور `--port`۔ ماڈل خودکار دریافت نہ کرنے والے ٹولز (Cline، Kilo، Roo، Goose، Aider، Qwen) `--model <id>` لیتے ہیں (اور غیر تعاملاتی چلانے کے لیے `--yes`)۔ CLI کو صحیح ماحول کے ساتھ شروع کرنے کے لیے اور بالکل کوئی ترتیب نہ لکھنے کے لیے، عمومی
`omniroute run <target>` لانچر استعمال کریں (claude، codex، aider، goose، opencode، qwen،
gemini — ہدف اور عرفیات `bin/cli/cli-manifest.mjs` سے آتی ہیں)؛ ماضی کے
ہر ٹول کے لانچر `omniroute launch` (Claude Code) اور `omniroute launch-codex`
(Codex) دستیاب رہتے ہیں۔ Gemini CLI صرف لانچ کے لیے ہے: یہ ایک `omniroute run`
ہدف ہے لیکن اس کے پاس `setup-*`/`configure` ترکیب نہیں ہے۔

> **مکمل حوالہ:** ماسٹر ٹیبل — ہر کمانڈ کیا لکھتا ہے، ہر جھنڈا،
> مقامی بمقابلہ دور، اور کون سے ٹولز `/v1` لاحقہ چاہتے ہیں — موجود ہے
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)**۔

### کنٹینر کے اندر یہ چلانا

ایک `setup-*` کمانڈ جو OmniRoute کنٹینر کے اندر چلائی جاتی ہے، کنٹینر کے اپنے ہوم میں لکھتی ہے، جسے کوئی میزبان CLI نہیں پڑھتا اور جو کنٹینر کے ساتھ غائب ہو جاتا ہے۔ OmniRoute اس کا پتہ لگاتا ہے اور لکھنے کے بجائے ہدایات کے ساتھ `2` کے ساتھ باہر نکلتا ہے۔ آگے بڑھنے کے دو سپورٹ شدہ طریقے — CLI کو میزبان پر انسٹال کریں اور
`omniroute connect` کنٹینر سے، یا کنفیگریشن ڈائریکٹریز کو بائنڈ ماؤنٹ کریں اور `CLI_CONFIG_HOME` سیٹ کریں (کمپوز `host` پروفائل)۔ ہر `setup-*` کمانڈ، ساتھ ہی `omniroute configure` اور `omniroute config set`، قبول کرتا ہے
`--allow-container-write` جب کنٹینر کے اپنے CLIs کی ترتیب دینا آپ کا اصل مطلب تھا؛ `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` سرور کے لیے یہی کرتا ہے۔ دیکھیں
[Docker Guide → Configuring host CLI tools](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker)۔

ڈیش بورڈ کا **اپلائی اینڈ پوائنٹ** (`POST /api/cli-tools/apply`) اسی حفاظتی اصول کو نافذ کرتا ہے: ایک کنٹینر میں، ایک لکھائی جس کا ہدف میزبان سے بائنڈ ماؤنٹ نہیں ہے **`422`** کے ساتھ جواب دیتی ہے جس میں `containerEphemeralTarget: true`، محفوظ غلطی کا متن اور — ان ٹولز کے لیے جن کے پاس میزبان کی ترکیب ہے (claude، codex، opencode، cline،
kilo، continue) — ایک `hostSetupCommand` (جیسے `omniroute setup-opencode`) جو میزبان پر چلانا ہے؛ کچھ بھی نہیں لکھا جاتا۔ `dryRun: true` کنٹینر موڈ میں کام کرتا رہتا ہے اور پیدا کردہ مواد + ہدف کے راستے کو بغیر ڈسک کو چھوئے واپس کرتا ہے، تاکہ آپ ڈیش بورڈ سے پیش نظارہ کر سکیں اور میزبان پر لاگو کر سکیں۔ یہ رویہ جان بوجھ کر ہے اور
`tests/unit/api/cli-tools/apply-container-guard.test.ts` کے ذریعے ریگریشن سے محفوظ ہے — کبھی بھی "ٹھیک" نہ کریں 422 کو حفاظتی اصول کو ہٹانے سے۔

---

## سچائی کا ماخذ

متحدہ کیٹلاگ `src/shared/constants/cliTools.ts` میں `CLI_TOOLS: Record<string, CliCatalogEntry>` کے طور پر موجود ہے۔

ہر اندراج میں یہ فیلڈز ہیں (جو `src/shared/schemas/cliCatalog.ts` میں بیان کی گئی ہیں):

| فیلڈ                                            | قسم                                                          | وضاحت                                                           |
| ----------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | یہ ٹول کس صفحے پر ظاہر ہوتا ہے                                  |
| `vendor`                                        | `string`                                                     | ٹول کا ماخذ ("Anthropic", "OSS (P. Gauthier)")                  |
| `acpSpawnable`                                  | `boolean`                                                    | ACP ایجنٹ کے طور پر بھی استعمال کیا جا سکتا ہے (بیج دکھایا گیا) |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | حسب ضرورت اینڈ پوائنٹ سپورٹ کی سطح۔ `"none"` = MITM backlog     |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | کنفیگریشن کا طریقہ                                              |
| `id`, `name`, `color`, `description`, `docsUrl` | معیاری                                                       | بنیادی ڈسپلے فیلڈز                                              |

ایسے اندراجات جن میں `baseUrlSupport: "none"` ہے وہ **ڈیش بورڈ صفحات میں نہیں دکھائے جاتے** — یہ MITM backlog میں منصوبہ 11 کے لیے رجسٹرڈ ہیں (دیکھیں `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`)۔

### صلاحیت کی سطحیں (کیٹلاگ شدہ × قابل شناخت × قابل ترتیب × قابل آغاز)

ہر کیٹلاگ شدہ ٹول قابل شناخت، قابل ترتیب یا قابل آغاز نہیں ہے۔ ہر سطح کا ایک
اعلان کردہ ماخذ ہے، اور ایک ڈرفٹ ٹیسٹ انہیں ہم آہنگ رکھتا ہے:

| سطح            | معنی                                                                               | اعلان کردہ میں                                                   |
| -------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **کیٹلاگ شدہ** | ڈیش بورڈ کی کیٹلاگ میں ظاہر ہوتا ہے (نام، فروش، دستاویزات، کنفیگ قسم)              | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                 |
| **قابل شناخت** | بائنری/کنفیگ شناخت، صحت کی جانچ، کنفیگ راستے                                       | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` رن ٹائم کیٹلاگ) |
| **قابل ترتیب** | `omniroute configure <cli>` کے ذریعہ سپورٹ کیا گیا (سیٹ اپ نسخہ موجود ہے)          | `bin/cli/cli-manifest.mjs` (`configure: true`)                   |
| **قابل آغاز**  | `omniroute run <target>` کے ذریعہ سپورٹ کیا گیا (env/args انجیکشن کی وضاحت کی گئی) | `bin/cli/cli-manifest.mjs` (`run: true`)                         |

`bin/cli/cli-manifest.mjs` CLI کمانڈ کے لیے معیاری قابل عمل مینیفیسٹ ہے
سطحیں: `run`, `configure` اور شیل-کمپلیشن جنریٹرز اپنی
ہدف کی فہرستیں، ایلیاس کی وضاحت (مثال کے طور پر `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
اور `--model` فلیگ کی وائرنگ اس سے حاصل کرتے ہیں۔ ڈرفٹ گارڈ
`tests/unit/cli/cli-manifest-drift.test.ts` یہ تصدیق کرتا ہے کہ مینیفیسٹ، رن ٹائم
کیٹلاگ، UI کیٹلاگ اور ہر صارف کی سطح ہم آہنگ رہیں — ایک ہدف جو
ایک سطح میں شامل کیا جاتا ہے بغیر دوسروں کے خاموشی سے ڈرفٹ ہونے کے بجائے ٹیسٹ کو ناکام بناتا ہے۔

---

## 1. CLI کوڈ کا کیٹلاگ (26 ٹولز)

تمام ٹولز جو `/dashboard/cli-code` میں ظاہر ہوتے ہیں۔ جن کے پاس `baseUrlSupport: none` ہے وہ MITM یا دستی رہنمائی کے ذریعے جڑے ہوئے ہیں بجائے کہ کسی حسب ضرورت بیس URL کے:

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder | false        |

جن ٹولز کے پاس `baseUrlSupport: "partial"` ہے وہ ڈیش بورڈ کارڈ میں "⚠ Base URL parcial" کا بیج دکھاتے ہیں۔

## 2. CLI ایجنٹس کی فہرست (8 ٹولز)

خود مختار ایجنٹس جو `/dashboard/cli-agents` میں ظاہر ہوتے ہیں:

| id           | نام            | فروشندہ                  | baseUrlSupport | acpSpawnable |
| ------------ | -------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | ہرمس ایجنٹ     | Nous Research            | مکمل           | جھوٹا        |
| openclaw     | اوپن کلاو      | OSS (P. Steinberger)     | مکمل           | سچ           |
| goose        | گوز            | Block / Linux Foundation | مکمل           | سچ           |
| interpreter  | اوپن انٹرپریٹر | OSS                      | مکمل           | سچ           |
| warp         | وارپ AI        | Warp Inc.                | جزوی           | سچ           |
| agent-deck   | ایجنٹ ڈیک      | asheshgoplani (OSS)      | مکمل           | جھوٹا        |
| omp          | اوہ مائی پائی  | OSS                      | مکمل           | سچ           |
| letta        | لیٹا CLI       | Letta                    | مکمل           | جھوٹا        |

---

## 3. ACP ایجنٹس (/dashboard/acp-agents)

یہ صفحہ (جو `/dashboard/agents` سے نام تبدیل کیا گیا ہے) CLIs کو دکھاتا ہے جو OmniRoute **پیدا** کر سکتا ہے بطور بیک اینڈ ایگزیکیوشن انجن stdio/ACP پروٹوکول کے ذریعے۔ کیٹلاگ کو علیحدہ طور پر `src/lib/acp/registry.ts` میں برقرار رکھا جاتا ہے اور یہ `CLI_TOOLS` کے برابر **نہیں** ہے۔

---

## 4. MITM بیک لاگ (ڈیش بورڈ میں نہیں دکھایا گیا)

درج ذیل CLIs اپنی مرضی کے مطابق بیس URL کی حمایت نہیں کرتے اور CLI کوڈ یا CLI ایجنٹس کے صفحات میں **فہرست نہیں ہیں**۔ یہ منصوبہ 11 میں MITM مداخلت کے امیدوار ہیں:

| CLI                 | وجہ                                                 |
| ------------------- | --------------------------------------------------- |
| windsurf            | BYOK محدود منتخب کلاڈ ماڈلز + کارپوریٹ URL/token    |
| amp                 | بند ماحولیاتی نظام (Sourcegraph)                    |
| amazon-q / kiro-cli | AWS SSO تصدیق، کوئی مرضی کا URL نہیں                |
| cowork              | Anthropic ڈیسک ٹاپ، کوئی قابل ترتیب اینڈپوائنٹ نہیں |

مکمل کراس ریفرنس کے لیے `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` دیکھیں۔

---

## 5. بیچ ڈیٹیکشن API

تمام ٹول کی شناخت ایک ہی اینڈپوائنٹ کے ذریعے جمع کی جاتی ہے:

**`GET /api/cli-tools/all-statuses`**

- تصدیق: `requireCliToolsAuth(request)` (دیگر `/api/cli-tools/` راستوں کی طرح)
- واپسی: `Record<toolId, ToolBatchStatus>` (قسم: `src/shared/types/cliBatchStatus.ts`)
- حکمت عملی: تمام ٹولز پر `Promise.all`، ہر ٹول کے لیے 5s کا ٹائم آؤٹ
- کیش: میموری میں LRU جو config فائل `mtime` کے ذریعے انڈیکس کیا گیا ہے۔ جب mtime تبدیل ہوتا ہے تو کیش کو غیر فعال کر دیا جاتا ہے۔ سرور کے دوبارہ شروع ہونے پر ری سیٹ ہوتا ہے۔

ہر ٹول کے لیے جواب کی شکل:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // صاف کیا گیا، کوئی اسٹیک ٹریس نہیں
}
```

## 6. نئے ٹولز کے لیے سیٹنگز ہینڈلرز

`configType: "custom"` کے ساتھ نئے ٹولز کے لیے مخصوص سیٹنگز API راستے ہیں:

| راستہ                                       | ٹول                                                              |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

تمام راستے `sanitizeErrorMessage()` کو غلطی کے جوابات کے لیے استعمال کرتے ہیں (Hard Rule #12).

---

## 7. ڈیش بورڈ صفحات کی تعمیر

### CLI کوڈ (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — سرور کمپوننٹ
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — کلائنٹ گرڈ
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — ٹول کی تفصیل کا صفحہ
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 مخصوص ٹول کارڈز + `ToolDetailClient.tsx`

### CLI ایجنٹس (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — سرور کمپوننٹ
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — کلائنٹ گرڈ
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — `ToolDetailClient` کو دوبارہ استعمال کرتا ہے

### ACP ایجنٹس (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — سرور کمپوننٹ (`agents/` سے منتقل کیا گیا)

### مشترکہ UI کمپوننٹس (`src/shared/components/cli/`)

| فائل                    | مقصد                                           |
| ----------------------- | ---------------------------------------------- |
| `CliToolCard.tsx`       | سمارٹ اسٹیٹس کارڈ (پہچان + کنفیگ + اینڈپوائنٹ) |
| `CliConceptCard.tsx`    | فی صفحہ تصور کی وضاحت کارڈ                     |
| `CliComparisonCard.tsx` | CLI اقسام کے درمیان تین کالموں کا موازنہ       |
| `BaseUrlSelect.tsx`     | اینڈپوائنٹ ڈراپ ڈاؤن (مقامی/کلاؤڈ/حسب ضرورت)   |
| `ApiKeySelect.tsx`      | API کلید کا انتخاب کنندہ                       |
| `ManualConfigModal.tsx` | کاپی کرنے کے قابل کنفیگ اسنیپٹ موڈل            |

### مشترکہ ہک (`src/shared/hooks/cli/`)

| فائل                      | مقصد                                                                              |
| ------------------------- | --------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | `/api/cli-tools/all-statuses` کو حاصل کرتا ہے، لوڈنگ/ریفرش حالت کا انتظام کرتا ہے |

## 8. i18n

نئے namespaces منصوبہ 14 F9 میں شامل کیے گئے ہیں:

| Namespace   | مقصد                                                              |
| ----------- | ----------------------------------------------------------------- |
| `cliCommon` | مشترکہ سٹرنگز (کارڈ لیبلز، تصور/موازنہ متون، تفصیل صفحہ کے لیبلز) |
| `cliCode`   | CLI کوڈ کے صفحے کی سٹرنگز                                         |
| `cliAgents` | CLI ایجنٹس کے صفحے کی سٹرنگز                                      |
| `acpAgents` | ACP ایجنٹس کے صفحے کی سٹرنگز                                      |

مکمل PT-BR اور EN ترجمے فراہم کیے گئے ہیں۔ 39 دیگر مقامی زبانیں خود بخود EN پر واپس آتی ہیں `src/i18n/request.ts` میں namespace کی سطح کے انضمام کے ذریعے۔

---

## 9. فوری آغاز

### مرحلہ 1 — OmniRoute API کلید حاصل کریں

1. `/dashboard/api-manager` کھولیں → **API کلید بنائیں**
2. اسے ایک نام دیں (جیسے `cli-tools`) اور تمام اجازتیں منتخب کریں
3. کلید کو کاپی کریں — آپ کو نیچے دیے گئے ہر CLI کے لیے اس کی ضرورت ہوگی

> آپ کی کلید کچھ اس طرح نظر آتی ہے: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### مرحلہ 2 — CLI ٹولز انسٹال کریں

تمام npm پر مبنی ٹولز کو Node.js 22.22.2+ یا 24.x کی ضرورت ہوتی ہے:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (لانچ کرنے کے لیے `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rust-based

# Pi coding agent
# انسٹالیشن کے لیے https://github.com/zechnerj/pi-coding-agent دیکھیں

# jcode
# انسٹالیشن کے لیے https://github.com/1jehuang/jcode دیکھیں
```

---

### مرحلہ 3 — ڈیش بورڈ کے ذریعے ترتیب دیں

1. `http://localhost:20128/dashboard/cli-code` پر جائیں
2. گرڈ میں اپنے ٹول کو تلاش کریں
3. ٹول کی تفصیل کے صفحے کو کھولنے کے لیے کارڈ پر کلک کریں
4. اپنی API کلید اور بنیادی URL منتخب کریں
5. **کنفیگ کو لاگو کریں** پر کلک کریں یا دستی کنفیگ کا ٹکڑا کاپی کریں

---

### مرحلہ 4 — عالمی ماحولیاتی متغیرات مرتب کریں

```bash
# OmniRoute یونیورسل اینڈپوائنٹ
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI ROOT پر GOOGLE_GEMINI_BASE_URL پڑھتا ہے (اس کا SDK خود /v1beta/... شامل کرتا ہے)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **دور دراز سرور** کے لیے `localhost:20128` کو سرور کے IP یا ڈومین سے تبدیل کریں،
> جیسے `http://<your-server-ip>:20128`.

---

### مرحلہ 4 — ہر ٹول کو ترتیب دیں

#### Claude Code

```bash
# Create ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Claude Code کے لیے متحدہ Anthropic گیٹ وے روٹ کا استعمال کریں۔ یہاں `/v1` شامل نہ کریں۔

**ٹیسٹ:** `claude "say hello"`

---

#### OpenAI Codex

جدید Codex (v0.137+) صرف `~/.codex/config.toml` پڑھتا ہے — پرانا
`config.yaml` ورثے کے npm CLI کا ہے اور خاموشی سے نظر انداز کیا جاتا ہے۔ API
کی کلید `OMNIROUTE_API_KEY` ماحولیاتی متغیر (`env_key`) میں رہتی ہے، کبھی بھی
فائل کے اندر نہیں:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

مکمل حوالہ (پروفائلز، `wire_api`، سیاق و سباق کی کھڑکیاں): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**ٹیسٹ:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**ٹیسٹ:** `opencode`

> `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high` کا استعمال کریں
> سوچنے کے مختلف ورژن بھیجنے کے لیے۔

---

#### Cline (CLI یا VS Code)

**CLI موڈ:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code موڈ:**
Cline توسیع کی ترتیبات → API فراہم کنندہ: `OpenAI Compatible` → بنیادی URL: `http://localhost:20128/v1`

یا OmniRoute ڈیش بورڈ کا استعمال کریں → **CLI Tools → Cline → Apply Config**۔

---

#### KiloCode (CLI یا VS Code)

**CLI موڈ:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code کی ترتیبات:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

یا OmniRoute ڈیش بورڈ کا استعمال کریں → **CLI Tools → KiloCode → Apply Config**۔

---

#### Continue (VS Code توسیع)

`~/.continue/config.yaml` میں ترمیم کریں:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

ترمیم کے بعد VS Code کو دوبارہ شروع کریں۔

---

#### VS Code Insiders (`chatLanguageModels.json`)

اسے اس وقت استعمال کریں جب VS Code Insiders کو حسب ضرورت اینڈپوائنٹ ماڈلز کے لیے ترتیب دیا گیا ہو اور آپ چاہتے ہیں کہ OmniRoute بغیر کسی حسب ضرورت ہیڈر فیلڈ کے کام کرے۔

**تجویز کردہ مقام:**

- لینکس: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- ونڈوز: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**ٹوکنیزڈ OmniRoute ایلیاس کا استعمال کرتے ہوئے مثال:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**نوٹس:**

- `sk-your-omniroute-key` کو OmniRoute میں بنائی گئی API کلید سے تبدیل کریں۔
- `url` فیلڈ کو `/api/v1/vscode/{token}/chat/completions` کی طرف اشارہ کرنا چاہیے۔
- `modelsUrl` فیلڈ کو `/api/v1/vscode/{token}/models` کی طرف اشارہ کرنا چاہیے۔
- جب کلائنٹ حسب ضرورت ہیڈرز کی حمایت کرتا ہے تو عام `/v1` + Bearer ہیڈر کے بہاؤ کو ترجیح دیں۔
- URL میں شامل ٹوکن ایک ہم آہنگی کی واپسی ہیں اور ایڈیٹر کے لاگ یا پراکسی کی تاریخ میں ظاہر ہو سکتے ہیں۔

---

#### Kiro CLI (ایمیزون)

```bash
# اپنے AWS/Kiro اکاؤنٹ میں لاگ ان کریں:
kiro-cli login

# CLI اپنی خود کی توثیق استعمال کرتا ہے — Kiro CLI کے لیے OmniRoute کی ضرورت نہیں ہے۔
# دوسرے ٹولز کے لیے OmniRoute کے ساتھ kiro-cli کا استعمال کریں۔
kiro-cli status
```

**Kiro IDE** ڈیسک ٹاپ ایپ کے لیے، OmniRoute کے ذریعے فراہم کردہ MITM اینڈپوائنٹ کا استعمال کریں
جو `/dashboard/cli-tools → Kiro` کے تحت ہے۔

---

## 10. داخلی OmniRoute CLI

`omniroute` بائنری سرور کی زندگی کے چکر، سیٹ اپ، تشخیص، اور فراہم کنندہ کے انتظام کے لئے کمانڈز فراہم کرتا ہے۔ داخلہ نقطہ: `bin/omniroute.mjs`۔

```bash
omniroute                              # سرور شروع کریں (ڈیفالٹ پورٹ 20128)
omniroute setup                        # انٹرایکٹو سیٹ اپ وزرڈ
omniroute doctor                       # کنفیگ، ڈی بی، پورٹس، رن ٹائم چیک کریں
omniroute providers list               # کنفیگر کردہ فراہم کنندہ کنکشن
omniroute providers test-all           # ہر فعال کنکشن کا ٹیسٹ کریں
omniroute reset-password               # ایڈمن پاس ورڈ ری سیٹ کریں
omniroute logs                         # درخواست کے لاگ اسٹریم کریں
omniroute health                       # تفصیلی صحت (بریکرز، کیش، میموری)
omniroute --version                    # ورژن پرنٹ کریں
omniroute --help                       # تمام کمانڈز دکھائیں
```

### سیٹ اپ اور ابتدائی تشکیل

```bash
omniroute setup                        # انٹرایکٹو سیٹ اپ وزرڈ
omniroute setup --non-interactive      # CI/خودکار موڈ (ماحولیاتی متغیرات + فلیگ پڑھتا ہے)
omniroute setup --password '<value>'   # براہ راست ایڈمن پاس ورڈ سیٹ کریں
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # ایک ہی بار میں فراہم کنندہ شامل کریں اور ٹیسٹ کریں
```

غیر انٹرایکٹو سیٹ اپ کے لئے تسلیم شدہ ماحولیاتی متغیرات:

| Var                 | مقصد                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | فراہم کنندہ API کلید (کمانڈر `.env()` کے ذریعے `--api-key` سے منسلک) |
| `DATA_DIR`          | OmniRoute ڈیٹا ڈائریکٹری کو اوور رائیڈ کریں                          |

تمام دیگر غیر انٹرایکٹو ان پٹس کو فلیگ کے طور پر پاس کیا جاتا ہے، ماحولیاتی متغیرات کے طور پر نہیں:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(اوپر `omniroute setup` کے اختیارات دیکھیں)۔

### تشخیص

```bash
omniroute doctor                       # کنفیگ، ڈی بی، پورٹس، رن ٹائم، میموری، زندہ ہونے کی جانچ کریں
omniroute doctor --json                # مشین کے قابل پڑھنے والا JSON
omniroute doctor --no-liveness         # HTTP صحت کی جانچ چھوڑ دیں
omniroute doctor --host 0.0.0.0        # زندہ ہونے والے میزبان کو اوور رائیڈ کریں
omniroute doctor --liveness-url <url>  # مکمل صحت کے اینڈ پوائنٹ کا URL اوور رائیڈ کریں
```

ڈاکٹر یہ چیک کرتا ہے: `کنفیگ`, `ڈیٹا بیس`, `ذخیرہ/انکرپشن`,
`پورٹ کی دستیابی`, `نوڈ رن ٹائم`, `نیٹیو بائنری` (بہتر-sqlite3),
`میموری`, اور `سرور کی زندہ ہونے کی حالت`۔ اگر کوئی چیک `ناکام` ہو تو یہ غیر صفر سے باہر نکلتا ہے۔

### فراہم کنندہ کا انتظام

```bash
omniroute providers available                       # OmniRoute فراہم کنندہ کی کیٹلاگ
omniroute providers available --search openai       # کیٹلاگ کو id/name/alias/category کے ذریعے فلٹر کریں
omniroute providers available --category api-key    # زمرے کے ذریعے فلٹر کریں (api-key, oauth, free, ...)
omniroute providers available --json                # مشین کے قابل پڑھنے والا JSON

omniroute providers list                            # کنفیگر کردہ فراہم کنندہ کنکشن
omniroute providers list --json

omniroute providers test <id|name>                  # ایک کنفیگر کردہ کنکشن کا ٹیسٹ کریں
omniroute providers test-all                        # ہر فعال کنکشن کا ٹیسٹ کریں
omniroute providers validate                        # مقامی طور پر صرف ساختی توثیق
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # موجودہ OAuth بہاؤ
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` API-first ہیں اور اس لئے فعال مقامی یا دور دراز کے سیاق و سباق کے خلاف کام کرتے ہیں۔ اسناد کی ان پٹ کو `--credential-stdin` یا `--credential-env` کا استعمال کرنا چاہئے؛ `--dry-run --json` صرف ریڈیکٹڈ موجودگی/شکل کی رپورٹ کرتا ہے۔ `providers available` OmniRoute کی کیٹلاگ کو پڑھتا ہے؛ `providers list/test/test-all/validate` اپنی مقامی SQLite کی خصوصیات کو برقرار رکھتے ہیں اور سرور کے چلنے کی ضرورت نہیں ہوتی۔

### بحالی اور ری سیٹ

```bash
omniroute reset-password                # ایڈمن پاس ورڈ ری سیٹ کریں (اسی طرح: omniroute-reset-password)
omniroute reset-encrypted-columns       # انکرپٹ کردہ اسناد کے ری سیٹ کے لئے انتباہ + ڈرائی رن دکھائیں
omniroute reset-encrypted-columns --force  # SQLite میں انکرپٹ کردہ اسناد کو واقعی نل کریں
```

### اسناد کا برآمد (⚠ احتیاط سے ہینڈل کریں)

```bash
omniroute auth export                                 # انتباہ + تصدیق کا گیٹ — کوئی DB رسائی نہیں
omniroute auth export --force                          # تمام کنکشنز کی انکرپٹ کردہ اسناد کو stdout پر JSON کے طور پر برآمد کریں
omniroute auth export --force --id <id>                 # صرف ملنے والے کنکشن کو برآمد کریں
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> لائنیں جاری کریں
omniroute auth export --force --out creds.json           # ایک فائل میں لکھیں (0600 اجازتوں کے ساتھ بنائی گئی)
```

`auth export` **مقامی طور پر صرف** (براہ راست SQLite پڑھنا، کوئی HTTP راستہ نہیں) اور جان بوجھ کر **پلیٹ ٹیکسٹ** `apiKey`/`accessToken`/`refreshToken`/`idToken` کی قدریں پرنٹ/لکھتا ہے — یہ خصوصیت ہے، کوئی خرابی نہیں۔ بغیر `--force` کے کچھ بھی ڈیٹا بیس سے نہیں پڑھا جاتا، اور کچھ بھی نہیں انکرپٹ کیا جاتا۔ کسی بھی پلیٹ ٹیکسٹ کے جاری ہونے سے پہلے ہمیشہ ایک stderr انتباہ بینر پرنٹ ہوتا ہے۔ `STORAGE_ENCRYPTION_KEY` کو سیٹ کرنا ضروری ہے۔ ایک ایسا فیلڈ جو انکرپٹ کرنے میں ناکام ہو (پرانا کلید، خراب ciphertext) کو `"<field>DecryptFailed: true"` کے طور پر رپورٹ کیا جاتا ہے بجائے اس کے کہ پورے برآمد کو روک دے یا بنیادی خرابی کو لیک کرے۔

### دیگر ذیلی کمانڈز

یہ ایک چلتے ہوئے OmniRoute سرور کو فرض کرتے ہیں، جب تک کہ دوسری صورت میں نوٹ نہ کیا جائے:

```bash
omniroute status                       # جامع رن ٹائم کی حیثیت
omniroute logs                         # درخواست کے لاگ اسٹریم کریں (--json, --search, --follow)
omniroute config show                  # موجودہ کنفیگریشن دکھائیں

omniroute provider list                # دستیاب فراہم کنندگان کی فہرست (providers list کا عرف)
omniroute provider add                 # ایک ٹول پر فراہم کنندہ کے طور پر OmniRoute کو رجسٹر کریں
omniroute keys add | list | remove     # API کیز کا انتظام کریں
omniroute models [provider]            # ماڈلز کی فہرست (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # کنفیگ + ڈی بی کا اسنیپ شاٹ
omniroute restore                      # پچھلے اسنیپ شاٹ سے بحال کریں

omniroute health                       # تفصیلی صحت (بریکرز، کیش، میموری)
omniroute quota                        # فراہم کنندہ کی کوٹہ کا استعمال
omniroute cache                        # کیش کی حیثیت
omniroute cache clear                  # معنوی + دستخط کیش کو صاف کریں

omniroute mcp status | restart         # MCP سرور کی حیثیت / دوبارہ شروع کریں
omniroute a2a status | card            # A2A سرور کی حیثیت / ایجنٹ کارڈ

omniroute tunnel list | create | stop  # سرنگوں کا انتظام کریں (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # ماحولیاتی متغیرات کا معائنہ کریں / سیٹ کریں (عارضی)

omniroute test                         # فراہم کنندہ کی کنیکٹیویٹی اسموک ٹیسٹ
omniroute update                       # اپ ڈیٹس کے لئے چیک کریں
omniroute completion                   # شیل مکمل کرنے کے لئے تیار کریں
```

### عام فلیگ

| Flag                | وضاحت                                                          |
| ------------------- | -------------------------------------------------------------- |
| `--no-open`         | شروع پر براؤزر کو خودکار طور پر نہ کھولیں                      |
| `--port <n>`        | API پورٹ کو اوور رائیڈ کریں (ڈیفالٹ 20128)                     |
| `--mcp`             | IDEs کے لئے stdio کے ذریعے MCP سرور کے طور پر چلائیں           |
| `--non-interactive` | CI موڈ (کوئی پرامپٹس نہیں؛ ماحولیاتی/فلیگ سے پڑھتا ہے)         |
| `--json`            | مشین کے قابل پڑھنے والا JSON آؤٹ پٹ (doctor, providers, وغیرہ) |
| `--help`, `-h`      | کمانڈ مخصوص مدد دکھائیں                                        |
| `--version`, `-v`   | نصب شدہ ورژن پرنٹ کریں                                         |

---

## دستیاب API اینڈپوائنٹس

| اینڈپوائنٹ                 | وضاحت                           | استعمال کے لئے                           |
| -------------------------- | ------------------------------- | ---------------------------------------- |
| `/v1/chat/completions`     | معیاری چیٹ (تمام فراہم کنندگان) | تمام جدید ٹولز                           |
| `/v1/responses`            | جوابات API (OpenAI فارمیٹ)      | Codex، ایجنٹک ورک فلو                    |
| `/v1/completions`          | وراثتی متن کی تکمیل             | پرانے ٹولز جو `prompt:` استعمال کرتے ہیں |
| `/v1/embeddings`           | متن کی ایمبیڈنگ                 | RAG، تلاش                                |
| `/v1/images/generations`   | تصویر کی تخلیق                  | GPT-Image، Flux، وغیرہ                   |
| `/v1/audio/speech`         | متن سے تقریر                    | ElevenLabs، OpenAI TTS                   |
| `/v1/audio/transcriptions` | تقریر سے متن                    | Deepgram، AssemblyAI                     |

پیسٹ کرنے کے لئے تیار مثالیں ایک ٹوکنائزڈ OmniRoute URL کے ساتھ:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standard OpenAI base: http://localhost:20128/v1
VS Code models: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tags: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## مسائل حل کرنا

| خرابی                                        | وجہ                     | حل                                                                |
| -------------------------------------------- | ----------------------- | ----------------------------------------------------------------- |
| `Connection refused`                         | OmniRoute چل نہیں رہا   | `omniroute serve`                                                 |
| `401 Unauthorized`                           | غلط API کلید            | `/dashboard/api-manager` میں چیک کریں                             |
| `No combo configured`                        | کوئی فعال روٹنگ کامبو   | `/dashboard/combos` میں ترتیب دیں                                 |
| CLI shows "not installed"                    | بائنری PATH میں نہیں ہے | `which <command>` میں چیک کریں                                    |
| Dashboard shows "not detected" after install | کیش پرانا               | ڈیش بورڈ میں "⟳ Refresh detection" پر کلک کریں                    |
| پرانا لنک `/dashboard/cli-tools`             | Pre-v3.8.6 بک مارک      | خودکار طور پر `/dashboard/cli-code` (308) پر ری ڈائریکٹ کیا گیا   |
| پرانا لنک `/dashboard/agents`                | Pre-v3.8.6 بک مارک      | خودکار طور پر `/dashboard/acp-agents` (308) پر ری ڈائریکٹ کیا گیا |
