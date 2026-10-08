# ACP registry and registered CLI launchers (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

Pinaghihiwalay ng OmniRoute ang **pagtuklas ng CLI**, **native Agent Client Protocol**, at
**mga legacy stdio adapter**. Ang pagkakatuklas sa isang naka-install na binary ay hindi nagpapatunay sa
authentication, compatibility ng modelo, o kahandaan nitong humawak ng prompt.

Ginagamit ng dashboard ang `GET /api/acp/agents` at `POST /api/acp/agents` para sa imbentaryo
at pagpaparehistro ng custom agent. Ang mga ito ay mga management route na para lamang sa lokal na paggamit, hindi isang
pampublikong API para sa pag-spawn ng mga proseso o pagpapadala ng mga prompt. Ang internal na
`AcpManager` ay hindi awtomatikong nagiging fallback na HTTP provider.

## Mga nakarehistrong kontrata

Ang `config/cli-tools-manifest.json` ang pinagmumulan ng katotohanan para sa mga built-in na launch
binary, argumento, at backend mode. Kinukuha ng registry ang mga depinisyon nito
mula sa manifest na iyon. Naka-cache ang detection nang 60 segundo.

- `acp`: inilulunsad ng kontrata ng Gemini ang `gemini --experimental-acp` at gumagamit ng
  newline-delimited ACP JSON-RPC sa pamamagitan ng opisyal na TypeScript SDK.
- `stdio-adapter`: pinananatili ng iba pang nakarehistrong kontrata ang legacy na adapter na may newline-input
  at stdout-output. Tinatapos ng dalawang segundong kawalan ng output ang tugon nito.
  **Hindi** pinatutunayan ng adapter na ito ang native ACP support para sa mga CLI na iyon.

Nakadokumento ang launch flag ng Gemini sa [sanggunian ng CLI](https://geminicli.com/docs/cli/cli-reference/).
Ginagamit ng client ang [opisyal na ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
para sa initialization, paggawa ng session, mga prompt request, notification, at cancellation.

Nananatiling kontrolado ng administrator ang mga launch contract ng custom agent.
Ang pagpaparehistro ng isang binary at mga argumento ay nagbibigay sa prosesong iyon ng mga lokal na
pribilehiyo sa pagpapatupad ng user ng server; hindi sandbox ang pagpaparehistro. Tumatanggap lamang ang mga version probe
ng nakarehistrong executable at isang kinikilalang version flag.

## Internal na launch API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Ipasa lamang ang mga provider variable na sadyang itinalaga sa agent na ito.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Gamitin ang response sa tumatawag na application.
} finally {
  acpManager.kill(session.id);
}
```

Nire-resolve ng `spawn(agentId, options)` ang executable at mga argumento mula sa
nakarehistrong depinisyon. `cwd` at `env` lamang ang mga opsyon ng caller; ang lumang
signature na `spawn(agentId, binary, args, env)` at mga executable override ay
tinatanggihan. Hindi sinusuportahan ng manager na ito ang mga HTTP launch contract.

Minamana ng child ang parehong operating-system, terminal, locale, at certificate
allowlist na ginagamit ng mga CLI launcher. Hindi kinokopya mula sa
parent environment ang mga lihim ng server/provider. Ang mga credential na kailangan ng napiling CLI ay dapat na tahasang
ipasa o ibigay sa pamamagitan ng sariling lokal na authentication ng CLI na iyon. Mayroon pa rin ang child
ng mga pahintulot sa filesystem ng lokal na user at maaari nitong basahin ang sarili nitong config.

## Native na lifecycle at mga limitasyon

1. I-spawn ang nakarehistrong binary, i-initialize ang ACP, at gumawa ng session na naka-root sa
   napiling working directory. May sampung segundong limitasyon ang initialization.
2. Magsumite ng prompt at kolektahin ang mga text notification para lamang sa session na iyon.
   Ang completion ay ang response ng prompt RPC, hindi isang panahon ng katahimikan sa stdout.
3. Gumamit ng iisang deadline ng prompt, kabilang ang anumang hindi natapos na initialization; ang default
   ay 120 segundo. Tinatanggihan ang mga sabay-sabay na prompt sa iisang proseso.
4. Kapag nag-timeout ang native na operasyon, subukan ang `session/cancel` at wakasan ang proseso. Ang isang
   limitadong 100 ms na palugit ay nagbibigay-daan upang ma-flush ang notification bago ang pagwawakas.
5. Isara ang transport state at alisin ang session kapag nabigo ang initialization, nagsara ang
   koneksyon, nag-exit ang proseso, o pinatay ito ng caller.

Tinatanggihan ang mga kahilingan sa pahintulot ng tool. Walang ina-advertise na filesystem o terminal client
capability. Hindi sina-sandbox ng mga paghihigpit na ito ang child binary
mismo at hindi rin pinapalitan ang sariling mga setting ng authorization ng CLI.

Parehong nagtatago ang native text at legacy stdout/stderr ng hindi hihigit sa 1 MiB ng mga character,
habang pinananatili ang pinakabagong output na may abiso ng truncation. Ang isang indibidwal na native wire
frame ay limitado sa 2 MiB ng mga byte bago ang pag-parse ng SDK. Nire-reset ang mga buffer sa bawat prompt.

Nagpapadala ang `kill(sessionId)` ng SIGTERM, at pagkatapos ay SIGKILL pagkalipas ng limang segundo kung hindi pa
nag-exit ang proseso. Inaalis ng mga legacy prompt timeout ang mga listener at timer ngunit pinananatiling
available ang session para sa isa pang prompt; nananatiling responsibilidad ng mga caller ang
`kill()` o `killAll()` kapag tapos na.

## Mga event at inspeksyon

Nag-e-emit ang manager ng `stdout`, `stderr`, at `exit`, na bawat isa ay may `sessionId`.
Iniuulat ng `sessionError` ang isang sanitized na transport error. Ang compatibility na `error`
event ay ine-emit lamang kapag mayroon itong subscriber, kaya hindi maaaring
magdulot ng unhandled EventEmitter error ang nawawalang binary.

- Nagbabalik ang `getSession(sessionId)` ng managed session o `undefined`.
- Hindi isinasama ng `getActiveSessions()` ang mga session na huminto o humihinto.
- Available lamang ang `sendInput(sessionId, input)` para sa isang live na legacy adapter;
  tinatanggihan ng native ACP ang raw input upang maprotektahan ang JSON-RPC stream nito.
- Wina-wakasan ng `killAll()` ang bawat session na pinamamahalaan ng instance na iyon.

## Mga hangganan ng validation

Sinasaklaw ng mga deterministic fixture ang native handshake, text output, mga tinanggihang
pahintulot, cancellation, magkakasabay na prompt, nabigong initialization, pag-exit ng proseso, mga limitasyon
sa output, at isolation ng mga lihim. Nananatiling saklaw ang mga kasalukuyang legacy buffer/listener
regression. Hindi ipinapakita ng mga test na ito ang isang live na pag-login sa Gemini
o matagumpay na provider inference; nangangailangan ang mga iyon ng hiwalay na awtorisadong smoke
test sa target environment.

## Kaugnay na dokumentasyon

- [Mga protocol ng agent](./AGENT_PROTOCOLS_GUIDE.md)
- [Mga kontrata sa paglulunsad ng CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Mga tool ng CLI](../reference/CLI-TOOLS.md)
- [A2A server](./A2A-SERVER.md)
- [Mga cloud agent](./CLOUD_AGENT.md)
