# ACP registry and registered CLI launchers (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute បែងចែក **ការរកឃើញ CLI**, **Agent Client Protocol ដើម**, និង
**អាដាប់ទ័រ stdio ចាស់** ដាច់ពីគ្នា។ ការរកឃើញ binary ដែលបានដំឡើង មិនមែនជាភស្តុតាងបញ្ជាក់ពី
ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ ភាពត្រូវគ្នានៃម៉ូដែល ឬភាពរួចរាល់របស់វាក្នុងការដោះស្រាយ prompt នោះទេ។

ផ្ទាំងគ្រប់គ្រងប្រើ `GET /api/acp/agents` និង `POST /api/acp/agents` សម្រាប់សារពើភណ្ឌ
និងការចុះឈ្មោះ agent ផ្ទាល់ខ្លួន។ ទាំងនេះគឺជា route គ្រប់គ្រងសម្រាប់តែម៉ាស៊ីនមូលដ្ឋាន មិនមែនជា
API សាធារណៈសម្រាប់បង្កើត process ឬដាក់ស្នើ prompt ទេ។ `AcpManager`
ខាងក្នុង មិនក្លាយជាជម្រើសបម្រុងរបស់អ្នកផ្តល់សេវា HTTP ដោយស្វ័យប្រវត្តិទេ។

## កិច្ចសន្យាដែលបានចុះឈ្មោះ

`config/cli-tools-manifest.json` គឺជាប្រភពសេចក្ដីពិតសម្រាប់ binary សម្រាប់ដំណើរការដែលមានស្រាប់
argument និង mode ផ្នែកខាងក្រោយ។ registry ទាញយកនិយមន័យរបស់វា
ពី manifest នោះ។ លទ្ធផលនៃការរកឃើញត្រូវបានរក្សាទុកក្នុង cache រយៈពេល 60 វិនាទី។

- `acp`: កិច្ចសន្យា Gemini ដំណើរការ `gemini --experimental-acp` និងទាក់ទង
  តាម ACP JSON-RPC ដែលបំបែកដោយបន្ទាត់ថ្មី តាមរយៈ TypeScript SDK ផ្លូវការ។
- `stdio-adapter`: កិច្ចសន្យាផ្សេងទៀតដែលបានចុះឈ្មោះ រក្សាទុកអាដាប់ទ័រចាស់ដែលទទួល input តាមបន្ទាត់ថ្មី
  និងបញ្ចេញ output តាម stdout។ រយៈពេលទំនេរនៃ output ពីរវិនាទីនឹងបញ្ចប់ response របស់វា។
  អាដាប់ទ័រនេះ **មិន** បញ្ជាក់ការគាំទ្រ ACP ដើមសម្រាប់ CLI ទាំងនោះទេ។

Gemini ចងក្រងឯកសារអំពី flag សម្រាប់ដំណើរការ នៅក្នុង [ឯកសារយោង CLI](https://geminicli.com/docs/cli/cli-reference/) របស់វា។
client ប្រើ [ACP SDK ផ្លូវការ](https://github.com/agentclientprotocol/typescript-sdk)
សម្រាប់ការចាប់ផ្ដើម ការបង្កើត session សំណើ prompt notification និងការលុបចោល។

និយមន័យ agent ផ្ទាល់ខ្លួន នៅតែជាកិច្ចសន្យាសម្រាប់ដំណើរការដែលគ្រប់គ្រងដោយអ្នកគ្រប់គ្រងប្រព័ន្ធ។
ការចុះឈ្មោះ binary និង argument ផ្តល់ឱ្យ process នោះនូវសិទ្ធិប្រតិបត្តិមូលដ្ឋាន
របស់អ្នកប្រើ server; ការចុះឈ្មោះមិនមែនជា sandbox ទេ។ ការស្ទង់មើល version ទទួលយក
តែ executable ដែលបានចុះឈ្មោះ និង version flag ដែលត្រូវបានទទួលស្គាល់ប៉ុណ្ណោះ។

## API សម្រាប់ដំណើរការខាងក្នុង

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // បញ្ជូនតែអថេររបស់អ្នកផ្តល់សេវាដែលបានកំណត់ដោយចេតនាសម្រាប់ agent នេះប៉ុណ្ណោះ។
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "ពន្យល់គម្រោងនេះ", 120_000);
  // ប្រើប្រាស់ response នៅក្នុងកម្មវិធីដែលហៅ។
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` កំណត់ executable និង argument ពី
និយមន័យដែលបានចុះឈ្មោះ។ ជម្រើសតែមួយគត់របស់អ្នកហៅគឺ `cwd` និង `env`; signature ចាស់
`spawn(agentId, binary, args, env)` និងការកំណត់ executable ជំនួស
ត្រូវបានបដិសេធ។ កិច្ចសន្យាសម្រាប់ដំណើរការ HTTP មិនត្រូវបានគាំទ្រដោយ manager នេះទេ។

process កូនទទួលបន្តនូវប្រព័ន្ធប្រតិបត្តិការ terminal locale និងបញ្ជីអនុញ្ញាត certificate
ដូចគ្នានឹងកម្មវិធីដំណើរការ CLI។ secret របស់ server/អ្នកផ្តល់សេវា មិនត្រូវបានចម្លងពី
environment មេទេ។ credential ដែល CLI ដែលបានជ្រើសរើសត្រូវការ ត្រូវតែបញ្ជូន
យ៉ាងច្បាស់លាស់ ឬផ្តល់តាមរយៈការផ្ទៀងផ្ទាត់អត្តសញ្ញាណមូលដ្ឋានរបស់ CLI នោះ។ process កូន
នៅតែមានសិទ្ធិប្រើ filesystem របស់អ្នកប្រើមូលដ្ឋាន ហើយអាចអាន config ផ្ទាល់របស់វា។

## វដ្ដជីវិតដើម និងដែនកំណត់

1. បង្កើត binary ដែលបានចុះឈ្មោះ ចាប់ផ្ដើម ACP និងបង្កើត session ដែលមាន root នៅ
   working directory ដែលបានជ្រើសរើស។ ការចាប់ផ្ដើមមានដែនកំណត់ដប់វិនាទី។
2. ដាក់ស្នើ prompt និងប្រមូល notification ជាអត្ថបទសម្រាប់តែ session នោះ។
   ការបញ្ចប់គឺជា response របស់ prompt RPC មិនមែនជារយៈពេលដែល stdout ស្ងាត់ទេ។
3. ប្រើ deadline តែមួយសម្រាប់ prompt ដោយរួមបញ្ចូលការចាប់ផ្ដើមដែលមិនទាន់ចប់; តម្លៃលំនាំដើម
   គឺ 120 វិនាទី។ prompt ដំណាលគ្នានៅក្នុង process ដូចគ្នាត្រូវបានបដិសេធ។
4. នៅពេល native timeout ព្យាយាម `session/cancel` ហើយបញ្ចប់ process។ ចន្លោះពេល
   100 ms ដែលមានកំណត់ អនុញ្ញាតឱ្យ notification ត្រូវបាន flush មុនពេលបញ្ចប់។
5. បិទស្ថានភាព transport និងលុប session នៅពេលការចាប់ផ្ដើមបរាជ័យ
   connection បិទ process ចាកចេញ ឬអ្នកហៅបញ្ឈប់វា។

សំណើសុំសិទ្ធិប្រើ tool ត្រូវបានបដិសេធ។ គ្មាន capability របស់ client សម្រាប់ filesystem ឬ terminal
ត្រូវបានប្រកាសទេ។ ការរឹតត្បិតទាំងនេះមិនដាក់ binary កូនក្នុង sandbox
ឬជំនួសការកំណត់ការអនុញ្ញាតផ្ទាល់របស់ CLI នោះទេ។

ទាំងអត្ថបទដើម និង stdout/stderr ចាស់ រក្សាទុកអក្សរយ៉ាងច្រើនបំផុត 1 MiB
ដោយរក្សា output ថ្មីបំផុតជាមួយនឹងសេចក្ដីជូនដំណឹងអំពីការកាត់ខ្លី។ wire frame ដើមនីមួយៗ
ត្រូវបានកំណត់មិនឱ្យលើស 2 MiB នៃ byte មុនពេល SDK parsing។ buffer ត្រូវបានកំណត់ឡើងវិញសម្រាប់ prompt នីមួយៗ។

`kill(sessionId)` ផ្ញើ SIGTERM បន្ទាប់មក SIGKILL ក្រោយប្រាំវិនាទី ប្រសិនបើ process
មិនទាន់បានចាកចេញ។ timeout របស់ prompt ចាស់ រំដោះ listener និង timer ប៉ុន្តែទុកឱ្យ
session អាចប្រើបានសម្រាប់ prompt មួយទៀត; អ្នកហៅនៅតែទទួលខុសត្រូវក្នុងការប្រើ
`kill()` ឬ `killAll()` នៅពេលបញ្ចប់។

## Event និងការត្រួតពិនិត្យ

manager បញ្ចេញ `stdout`, `stderr`, និង `exit` ដែលនីមួយៗមាន `sessionId`។
`sessionError` រាយការណ៍កំហុស transport ដែលបានដកទិន្នន័យរសើបចេញ។ event `error`
សម្រាប់ភាពត្រូវគ្នា ត្រូវបានបញ្ចេញតែនៅពេលវាមាន subscriber ប៉ុណ្ណោះ ដូច្នេះ binary ដែលបាត់
មិនអាចបង្កឱ្យមានកំហុស EventEmitter ដែលមិនបានដោះស្រាយបានទេ។

- `getSession(sessionId)` ត្រឡប់ session ដែលបានគ្រប់គ្រង ឬ `undefined`។
- `getActiveSessions()` មិនរាប់បញ្ចូល session ដែលបានឈប់ ឬកំពុងឈប់។
- `sendInput(sessionId, input)` អាចប្រើបានតែសម្រាប់អាដាប់ទ័រចាស់ដែលកំពុងដំណើរការ;
  ACP ដើមបដិសេធ input ដើម ដើម្បីការពារ stream JSON-RPC របស់វា។
- `killAll()` បញ្ចប់គ្រប់ session ដែលគ្រប់គ្រងដោយ instance នោះ។

## ព្រំដែននៃការផ្ទៀងផ្ទាត់

fixture ដែលផ្ដល់លទ្ធផលថេរ គ្របដណ្ដប់លើ handshake ដើម, output ជាអត្ថបទ, សិទ្ធិដែលត្រូវបានបដិសេធ,
ការលុបចោល, prompt ដំណាលគ្នា, ការចាប់ផ្ដើមដែលបរាជ័យ, ការចាកចេញរបស់ process, ដែនកំណត់ output,
និងការញែក secret ដាច់ពីគ្នា។ regression ដែលមានស្រាប់របស់ buffer/listener ចាស់
នៅតែត្រូវបានគ្របដណ្ដប់។ ការធ្វើតេស្តទាំងនេះមិនបង្ហាញពីការចូល Gemini ផ្ទាល់
ឬការសន្និដ្ឋានដោយជោគជ័យពីអ្នកផ្តល់សេវាទេ; ទាំងនេះត្រូវការការធ្វើតេស្ត smoke ដែលបានផ្ដល់សិទ្ធិដោយឡែក
នៅក្នុង environment គោលដៅ។

## ឯកសារពាក់ព័ន្ធ

- [ពិធីការរបស់ agent](./AGENT_PROTOCOLS_GUIDE.md)
- [កិច្ចសន្យាសម្រាប់ដំណើរការ CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [ឧបករណ៍ CLI](../reference/CLI-TOOLS.md)
- [server A2A](./A2A-SERVER.md)
- [agent លើ cloud](./CLOUD_AGENT.md)
