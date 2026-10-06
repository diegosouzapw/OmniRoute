# ACP registry and registered CLI launchers (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute na-ekewa **nchọpụta CLI**, **Agent Client Protocol nke e wuru n'ime ya**, na
**ihe nkwụnye stdio ochie**. Ịchọta binary arụnyere anaghị egosi na
ntọala njirimara ya, ndakọrịta model ya, ma ọ bụ njikere ya ijikwa prompt dị mma.

Dashboard na-eji `GET /api/acp/agents` na `POST /api/acp/agents` maka ndekọ
na idebanye agent ahaziri iche. Ndị a bụ ụzọ njikwa maka mpaghara naanị, ọ bụghị
API ọha maka ịmalite process ma ọ bụ izipu prompt. `AcpManager` nke ime
anaghị aghọ fallback nke HTTP provider na-akpaghị aka.

## Nkwekọrịta ndị e debanyere

`config/cli-tools-manifest.json` bụ isi iyi eziokwu maka binary mmalite
ndabara, argument, na mode backend. Registry na-ewepụta nkọwa ya
site na manifest ahụ. A na-echekwa nsonaazụ nchọpụta na cache ruo sekọnd 60.

- `acp`: nkwekọrịta Gemini na-amalite `gemini --experimental-acp` ma na-eji
  ACP JSON-RPC nke newline kewara akparịta ụka site na TypeScript SDK gọọmentị.
- `stdio-adapter`: nkwekọrịta ndị ọzọ e debanyere ka na-eji adapter ochie nke
  na-anata ntinye site n'ahịrị ọhụrụ ma na-ewepụta nsonaazụ na stdout. Oge sekọnd abụọ
  nke enweghị output na-egosi njedebe nzaghachi ya.
  Adapter a **anaghị** akwado na CLI ndị ahụ nwere nkwado ACP nke e wuru n'ime ha.

Gemini kọwara flag mmalite ahụ na [ntụaka CLI ya](https://geminicli.com/docs/cli/cli-reference/).
Client na-eji [ACP SDK gọọmentị](https://github.com/agentclientprotocol/typescript-sdk)
maka initialization, imepụta session, arịrịọ prompt, notification, na cancellation.

Nkọwa custom-agent ka bụ nkwekọrịta mmalite ndị administrator na-achịkwa.
Idebanye binary na argument na-enye process ahụ ikike mmebe mpaghara nke user
server; registration abụghị sandbox. Nnwale version na-anabata naanị
executable e debanyere na flag version a ma ama.

## API mmalite nke ime

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Nyefee naanị variable provider ndị e kenyere agent a n'ebumnuche.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Kọwaa project a", 120_000);
  // Jiri response ahụ n'ime application kpọrọ ya.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` na-achọpụta executable na argument site na
nkọwa e debanyere. Naanị nhọrọ caller bụ `cwd` na `env`; signature ochie
`spawn(agentId, binary, args, env)` na executable override anaghị
anabata. Manager a anaghị akwado nkwekọrịta mmalite HTTP.

Child na-eketa otu operating system, terminal, locale, na certificate
allowlist ndị CLI launcher nwere. A naghị edepụta secret server/provider site na
environment parent. A ga-enyerịrị credential CLI ahọrọ chọrọ
n'ụzọ doro anya ma ọ bụ nye ha site na authentication mpaghara nke CLI ahụ.
Child ka nwere ikike filesystem nke user mpaghara ma nwee ike ịgụ config nke ya.

## Usoro ndụ na oke nke e wuru n'ime ya

1. Malite binary e debanyere, mee initialization ACP, ma mepụta session nke gbadoro ụkwụ na
   working directory ahọrọ. Initialization nwere oke sekọnd iri.
2. Ziga prompt ma chịkọta notification ederede maka naanị session ahụ.
   Mmecha bụ response RPC nke prompt, ọ bụghị oge stdout gbachiri nkịtị.
3. Jiri otu deadline prompt, gụnyere initialization ọ bụla na-emechabeghị; ndabara
   bụ sekọnd 120. A naghị anabata prompt na-aga n'otu oge n'ime otu process.
4. Mgbe native timeout mere, nwaa `session/cancel` ma kwụsị process ahụ. Window
   nwere oke 100 ms na-enye notification ohere ime flush tupu nkwụsị.
5. Mechie state transport ma wepụ session mgbe initialization dara, mgbe
   connection mechiri, process pụtara, ma ọ bụ caller kwụsịrị ya.

A naghị anabata arịrịọ ikike tool. A naghị akpọsa capability client
filesystem ma ọ bụ terminal. Mmachibido ndị a anaghị etinye child binary
n'onwe ya na sandbox ma ọ bụ dochie ntọala authorization nke CLI.

Ma ederede native ma stdout/stderr ochie na-edobe ihe ruru 1 MiB nke mkpụrụedemede,
na-echekwa output kachasị ọhụrụ yana ọkwa na e bepụrụ ya. Otu native wire
frame nwere oke 2 MiB nke byte tupu SDK parsing. Buffer na-amalitegharị maka prompt ọ bụla.

`kill(sessionId)` na-eziga SIGTERM, mesịa SIGKILL mgbe sekọnd ise gachara ma ọ bụrụ na process
apụtabeghị. Legacy prompt timeout na-ahapụ listener na timer mana na-ahapụ
session ka ọ dị maka prompt ọzọ; caller ka nwere ọrụ ịkpọ
`kill()` ma ọ bụ `killAll()` mgbe ha mechara.

## Event na nyocha

Manager na-ewepụta `stdout`, `stderr`, na `exit`, nke ọ bụla nwere `sessionId`.
`sessionError` na-akọ transport error e mere ka ọ ghara ikpughe ozi nzuzo. A na-ewepụta event ndakọrịta `error`
naanị mgbe o nwere subscriber, ka binary na-efu ghara
ịkpata EventEmitter error a na-ejikwaghị.

- `getSession(sessionId)` na-eweghachi session a na-achịkwa ma ọ bụ `undefined`.
- `getActiveSessions()` anaghị agụnye session kwụsịrị ma ọ bụ ndị na-akwụsị.
- `sendInput(sessionId, input)` dị naanị maka legacy adapter dị ndụ;
  ACP native anaghị anabata raw input iji chebe stream JSON-RPC ya.
- `killAll()` na-akwụsị session niile instance ahụ na-achịkwa.

## Oke validation

Fixture deterministic na-ekpuchi native handshake, output ederede, ikike a jụrụ,
cancellation, prompt na-aga n'otu oge, initialization dara, process
exit, oke output, na ikewapụ secret. Regression ochie metụtara buffer/listener
ka na-ekpuchikwa. Nnwale ndị a anaghị egosi login Gemini dị ndụ
ma ọ bụ provider inference gara nke ọma; ihe ndị ahụ chọrọ smoke test nke
e nyere authorization iche na target environment.

## Akwụkwọ metụtara ya

- [Protocol agent](./AGENT_PROTOCOLS_GUIDE.md)
- [Nkwekọrịta mmalite CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Tool CLI](../reference/CLI-TOOLS.md)
- [Server A2A](./A2A-SERVER.md)
- [Agent cloud](./CLOUD_AGENT.md)
