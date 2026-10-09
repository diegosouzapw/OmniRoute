# ACP registry and registered CLI launchers (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute **CLI શોધ**, **મૂળ Agent Client Protocol**, અને
**લેગસી stdio ઍડેપ્ટર્સ**ને અલગ રાખે છે. ઇન્સ્ટોલ કરેલું બાઇનરી મળવું એ તેના
પ્રમાણીકરણ, મોડેલ સુસંગતતા અથવા પ્રોમ્પ્ટ સંભાળવાની તૈયારીનો પુરાવો નથી.

ડૅશબોર્ડ ઇન્વેન્ટરી અને કસ્ટમ-એજન્ટ નોંધણી માટે `GET /api/acp/agents` અને
`POST /api/acp/agents`નો ઉપયોગ કરે છે. આ ફક્ત સ્થાનિક વ્યવસ્થાપન રૂટ્સ છે, પ્રોસેસ
શરૂ કરવા અથવા પ્રોમ્પ્ટ સબમિટ કરવા માટેની જાહેર API નથી. આંતરિક
`AcpManager` આપમેળે HTTP પ્રદાતા ફૉલબૅક બનતું નથી.

## નોંધાયેલ કરારો

`config/cli-tools-manifest.json` બિલ્ટ-ઇન લૉન્ચ બાઇનરીઝ, આર્ગ્યુમેન્ટ્સ અને બૅકએન્ડ
મોડ્સ માટેનું અધિકૃત સ્રોત છે. રજિસ્ટ્રી તે મૅનિફેસ્ટમાંથી પોતાની વ્યાખ્યાઓ
મેળવે છે. શોધનાં પરિણામો 60 સેકન્ડ માટે કૅશ થાય છે.

- `acp`: Gemini કરાર `gemini --experimental-acp` લૉન્ચ કરે છે અને અધિકૃત
  TypeScript SDK મારફતે નવી લાઇનથી વિભાજિત ACP JSON-RPC વડે સંચાર કરે છે.
- `stdio-adapter`: અન્ય નોંધાયેલા કરારો લેગસી નવી-લાઇન ઇનપુટ,
  stdout-આઉટપુટ ઍડેપ્ટર જાળવી રાખે છે. આઉટપુટમાં બે સેકન્ડની નિષ્ક્રિયતા તેના પ્રતિસાદને
  સમાપ્ત કરે છે. આ ઍડેપ્ટર તે CLIs માટે મૂળ ACP સપોર્ટને **પ્રમાણિત કરતું નથી**.

Gemini તેના [CLI સંદર્ભ](https://geminicli.com/docs/cli/cli-reference/)માં લૉન્ચ ફ્લૅગનું દસ્તાવેજીકરણ કરે છે.
ક્લાયન્ટ પ્રારંભિકરણ, સેશન બનાવટ, પ્રોમ્પ્ટ વિનંતીઓ, સૂચનાઓ અને રદ કરવા માટે
[અધિકૃત ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)નો ઉપયોગ કરે છે.

કસ્ટમ-એજન્ટ વ્યાખ્યાઓ ઍડમિનિસ્ટ્રેટર-નિયંત્રિત લૉન્ચ કરારો તરીકે રહે છે.
બાઇનરી અને આર્ગ્યુમેન્ટ્સ નોંધાવવાથી તે પ્રોસેસને સર્વર વપરાશકર્તાના સ્થાનિક
એક્ઝિક્યુશન વિશેષાધિકારો મળે છે; નોંધણી કોઈ સૅન્ડબૉક્સ નથી. વર્ઝન પ્રોબ્સ
ફક્ત નોંધાયેલ એક્ઝિક્યુટેબલ અને માન્ય વર્ઝન ફ્લૅગને સ્વીકારે છે.

## આંતરિક લૉન્ચ API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // ફક્ત આ એજન્ટને ઇરાદાપૂર્વક સોંપાયેલા પ્રદાતા વેરિએબલ્સ જ પાસ કરો.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // કૉલ કરતી ઍપ્લિકેશનમાં પ્રતિસાદનો ઉપયોગ કરો.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` નોંધાયેલ વ્યાખ્યામાંથી એક્ઝિક્યુટેબલ અને આર્ગ્યુમેન્ટ્સ
નક્કી કરે છે. કૉલર માટે માત્ર `cwd` અને `env` વિકલ્પો ઉપલબ્ધ છે; જૂની
`spawn(agentId, binary, args, env)` સિગ્નેચર અને એક્ઝિક્યુટેબલ ઓવરરાઇડ્સ
નકારવામાં આવે છે. આ મૅનેજર HTTP લૉન્ચ કરારોને સપોર્ટ કરતું નથી.

ચાઇલ્ડને CLI લૉન્ચર્સ જેવી જ ઑપરેટિંગ-સિસ્ટમ, ટર્મિનલ, લોકેલ અને સર્ટિફિકેટ
અલાઉલિસ્ટ વારસામાં મળે છે. સર્વર/પ્રદાતા સિક્રેટ્સ પૅરન્ટ એન્વાયરમેન્ટમાંથી
કૉપિ કરવામાં આવતા નથી. પસંદ કરેલ CLI માટે જરૂરી ઓળખપત્રો સ્પષ્ટ રીતે પાસ
કરવા અથવા તે CLIના પોતાના સ્થાનિક પ્રમાણીકરણ મારફતે પૂરા પાડવા આવશ્યક છે.
ચાઇલ્ડ પાસે હજી પણ સ્થાનિક વપરાશકર્તાની ફાઇલસિસ્ટમ પરવાનગીઓ હોય છે અને તે
પોતાનું કૉન્ફિગ વાંચી શકે છે.

## મૂળ લાઇફસાઇકલ અને મર્યાદાઓ

1. નોંધાયેલ બાઇનરી શરૂ કરો, ACP પ્રારંભ કરો અને પસંદ કરેલી વર્કિંગ ડિરેક્ટરીમાં
   રૂટ થયેલું સેશન બનાવો. પ્રારંભિકરણ માટે દસ સેકન્ડની મર્યાદા છે.
2. પ્રોમ્પ્ટ સબમિટ કરો અને ફક્ત તે સેશન માટે ટેક્સ્ટ સૂચનાઓ એકત્રિત કરો.
   પૂર્ણતા એટલે પ્રોમ્પ્ટ RPC પ્રતિસાદ, stdoutની નિષ્ક્રિયતાનો સમયગાળો નહીં.
3. કોઈપણ અપૂર્ણ પ્રારંભિકરણ સહિત એક પ્રોમ્પ્ટ સમયમર્યાદાનો ઉપયોગ કરો; ડિફૉલ્ટ
   120 સેકન્ડ છે. એક જ પ્રોસેસમાં સમકાલીન પ્રોમ્પ્ટ્સ નકારવામાં આવે છે.
4. મૂળ સમયસમાપ્તિ વખતે, `session/cancel`નો પ્રયાસ કરો અને પ્રોસેસ સમાપ્ત કરો.
   સમાપ્તિ પહેલાં 100 msની મર્યાદિત વિન્ડો સૂચનાને ફ્લશ થવા દે છે.
5. પ્રારંભિકરણ નિષ્ફળ જાય, કનેક્શન બંધ થાય, પ્રોસેસ બહાર નીકળે અથવા કૉલર તેને
   સમાપ્ત કરે ત્યારે ટ્રાન્સપોર્ટ સ્થિતિ બંધ કરો અને સેશન દૂર કરો.

ટૂલ પરવાનગી વિનંતીઓ નકારવામાં આવે છે. કોઈ ફાઇલસિસ્ટમ અથવા ટર્મિનલ ક્લાયન્ટ
ક્ષમતાઓ જાહેર કરવામાં આવતી નથી. આ પ્રતિબંધો ચાઇલ્ડ બાઇનરીને સૅન્ડબૉક્સ કરતા
નથી અથવા CLIની પોતાની અધિકૃતતા સેટિંગ્સને બદલતા નથી.

મૂળ ટેક્સ્ટ અને લેગસી stdout/stderr બંને વધુમાં વધુ 1 MiB અક્ષરો જાળવે છે,
જેમાં ટ્રન્કેશન સૂચના સાથે સૌથી નવું આઉટપુટ રાખવામાં આવે છે. SDK પાર્સિંગ પહેલાં
એક વ્યક્તિગત મૂળ વાયર ફ્રેમની મર્યાદા 2 MiB બાઇટ્સ છે. બફર્સ દરેક પ્રોમ્પ્ટ
માટે રીસેટ થાય છે.

`kill(sessionId)` SIGTERM મોકલે છે અને જો પ્રોસેસ બહાર ન નીકળે તો પાંચ સેકન્ડ
પછી SIGKILL મોકલે છે. લેગસી પ્રોમ્પ્ટ સમયસમાપ્તિઓ લિસનર્સ અને ટાઇમર્સને મુક્ત
કરે છે, પરંતુ સેશનને બીજા પ્રોમ્પ્ટ માટે ઉપલબ્ધ રાખે છે; કાર્ય પૂર્ણ થયા પછી
`kill()` અથવા `killAll()` માટે કૉલર્સ જ જવાબદાર રહે છે.

## ઇવેન્ટ્સ અને નિરીક્ષણ

મૅનેજર `stdout`, `stderr`, અને `exit` ઉત્સર્જિત કરે છે, દરેક સાથે `sessionId`
હોય છે. `sessionError` સેનિટાઇઝ કરેલી ટ્રાન્સપોર્ટ ભૂલની જાણ કરે છે. સુસંગતતા
માટેની `error` ઇવેન્ટ ફક્ત ત્યારે જ ઉત્સર્જિત થાય છે જ્યારે તેનો સબ્સ્ક્રાઇબર
હોય, જેથી ગુમ થયેલું બાઇનરી અનહેન્ડલ્ડ EventEmitter ભૂલ સર્જી ન શકે.

- `getSession(sessionId)` સંચાલિત સેશન અથવા `undefined` પરત કરે છે.
- `getActiveSessions()` રોકાયેલા અથવા રોકાઈ રહેલા સેશન્સને બાકાત રાખે છે.
- `sendInput(sessionId, input)` ફક્ત જીવંત લેગસી ઍડેપ્ટર માટે ઉપલબ્ધ છે;
  મૂળ ACP તેના JSON-RPC સ્ટ્રીમનું રક્ષણ કરવા માટે રૉ ઇનપુટ નકારે છે.
- `killAll()` તે ઇન્સ્ટન્સ દ્વારા સંચાલિત દરેક સેશનને સમાપ્ત કરે છે.

## માન્યતાની સીમાઓ

નિર્ધારિત ફિક્સ્ચર્સ મૂળ હૅન્ડશેક, ટેક્સ્ટ આઉટપુટ, નકારેલી પરવાનગીઓ,
રદ કરવું, સમકાલીન પ્રોમ્પ્ટ્સ, નિષ્ફળ પ્રારંભિકરણ, પ્રોસેસ એક્ઝિટ, આઉટપુટ
મર્યાદાઓ અને સિક્રેટ આઇસોલેશનને આવરી લે છે. હાલની લેગસી બફર/લિસનર
રિગ્રેશન્સ પણ આવરી લેવાયેલી રહે છે. આ પરીક્ષણો લાઇવ Gemini લૉગિન અથવા સફળ
પ્રદાતા ઇન્ફરન્સ દર્શાવતા નથી; તેના માટે લક્ષ્ય એન્વાયરમેન્ટમાં અલગથી અધિકૃત
કરાયેલ સ્મોક ટેસ્ટ આવશ્યક છે.

## સંબંધિત દસ્તાવેજીકરણ

- [એજન્ટ પ્રોટોકોલ્સ](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI લૉન્ચ કરારો](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI ટૂલ્સ](../reference/CLI-TOOLS.md)
- [A2A સર્વર](./A2A-SERVER.md)
- [ક્લાઉડ એજન્ટ્સ](./CLOUD_AGENT.md)
