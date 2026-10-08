# ACP registry and registered CLI launchers (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute hutenganisha **ugunduzi wa CLI**, **Agent Client Protocol asilia**, na
**adapta za zamani za stdio**. Kupatikana kwa binary iliyosakinishwa hakuthibitishi
uthibitishaji wake, uoanifu wa modeli, au utayari wake wa kushughulikia kidokezo.

Dashibodi hutumia `GET /api/acp/agents` na `POST /api/acp/agents` kwa orodha
na usajili wa mawakala maalum. Hizi ni njia za usimamizi za ndani pekee, si
API ya umma ya kuanzisha michakato au kuwasilisha vidokezo. `AcpManager` ya
ndani haigeuki kiotomatiki kuwa mbadala wa mtoa huduma wa HTTP.

## Mikataba iliyosajiliwa

`config/cli-tools-manifest.json` ndicho chanzo cha ukweli kuhusu binary za
uzinduzi zilizojengewa ndani, hoja, na hali za backend. Sajili huunda ufafanuzi
wake kutokana na manifest hiyo. Matokeo ya ugunduzi huhifadhiwa kwenye kache
kwa sekunde 60.

- `acp`: mkataba wa Gemini huzindua `gemini --experimental-acp` na kuwasiliana
  kwa ACP JSON-RPC iliyotenganishwa kwa mistari kupitia SDK rasmi ya TypeScript.
- `stdio-adapter`: mikataba mingine iliyosajiliwa huhifadhi adapta ya zamani ya
  ingizo la mistari na towe la stdout. Kipindi cha kutotoa towe cha sekunde mbili
  huhitimisha jibu lake. Adapta hii **haithibitishi** usaidizi asilia wa ACP kwa CLI hizo.

Gemini inaeleza bendera ya uzinduzi katika [marejeleo yake ya CLI](https://geminicli.com/docs/cli/cli-reference/).
Kiteja hutumia [SDK rasmi ya ACP](https://github.com/agentclientprotocol/typescript-sdk)
kwa uanzishaji, uundaji wa vipindi, maombi ya vidokezo, arifa, na kughairi.

Ufafanuzi wa mawakala maalum unaendelea kudhibitiwa na msimamizi.
Kusajili binary na hoja huupa mchakato huo ruhusa za utekelezaji za ndani za
mtumiaji wa seva; usajili si sandbox. Ukaguzi wa matoleo hukubali tu
executable iliyosajiliwa na bendera ya toleo inayotambuliwa.

## API ya ndani ya uzinduzi

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Pitisha tu vigeu vya mtoa huduma vilivyogawiwa kwa makusudi kwa wakala huyu.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Eleza mradi huu", 120_000);
  // Tumia jibu katika programu inayoita.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` hupata executable na hoja kutoka kwenye ufafanuzi
uliosajiliwa. Chaguo pekee za mwitaji ni `cwd` na `env`; saini ya zamani ya
`spawn(agentId, binary, args, env)` na ubatilishaji wa executable hukataliwa.
Mikataba ya uzinduzi wa HTTP haitumiki na meneja huyu.

Mchakato-toto hurithi mfumo huohuo wa uendeshaji, terminali, locale, na orodha
ya vyeti vinavyoruhusiwa kama vizinduzi vya CLI. Siri za seva/mtoa huduma
hazinakiliwi kutoka kwenye mazingira ya mzazi. Vitambulisho vinavyohitajika na
CLI iliyochaguliwa lazima vipitishwe waziwazi au vitolewe kupitia uthibitishaji
wa ndani wa CLI hiyo. Mchakato-toto bado una ruhusa za mfumo wa faili za
mtumiaji wa ndani na unaweza kusoma usanidi wake wenyewe.

## Mzunguko asilia wa uhai na vikomo

1. Anzisha binary iliyosajiliwa, anzisha ACP, na uunde kipindi chenye mzizi katika
   saraka ya kazi iliyochaguliwa. Uanzishaji una kikomo cha sekunde kumi.
2. Wasilisha kidokezo na ukusanye arifa za maandishi za kipindi hicho pekee.
   Ukamilishaji ni jibu la RPC la kidokezo, si kipindi cha ukimya wa stdout.
3. Tumia muda mmoja wa mwisho wa kidokezo, ukijumuisha uanzishaji wowote ambao
   haujakamilika; chaguo-msingi ni sekunde 120. Vidokezo vinavyoendeshwa kwa
   wakati mmoja katika mchakato huohuo hukataliwa.
4. Muda asilia unapoisha, jaribu `session/cancel` na usitishe mchakato. Dirisha
   lenye kikomo la ms 100 huruhusu arifa kutumwa kabla ya usitishaji.
5. Funga hali ya usafirishaji na uondoe kipindi wakati uanzishaji unaposhindwa,
   muunganisho unapofungwa, mchakato unapotoka, au mwitaji anapoukomesha.

Maombi ya ruhusa za zana hukataliwa. Hakuna uwezo wa kiteja wa mfumo wa faili
au terminali unaotangazwa. Vizuizi hivi haviweki binary ya mchakato-toto kwenye
sandbox wala kuchukua nafasi ya mipangilio ya uidhinishaji ya CLI yenyewe.

Maandishi asilia na stdout/stderr ya zamani huhifadhi angalau vibambo 1 MiB,
huku yakibakiza towe jipya zaidi pamoja na arifa ya ukataji. Fremu moja asilia
ya wire ina kikomo cha baiti 2 MiB kabla ya uchanganuzi wa SDK. Bafa huwekwa
upya kwa kila kidokezo.

`kill(sessionId)` hutuma SIGTERM, kisha SIGKILL baada ya sekunde tano ikiwa
mchakato haujatoka. Kuisha kwa muda wa vidokezo vya zamani huachilia visikilizaji
na vipima muda lakini huacha kipindi kikipatikana kwa kidokezo kingine; waitaji
wanaendelea kuwajibika kutumia `kill()` au `killAll()` wanapomaliza.

## Matukio na ukaguzi

Meneja hutoa `stdout`, `stderr`, na `exit`, kila moja ikiwa na `sessionId`.
`sessionError` huripoti hitilafu ya usafirishaji iliyosafishwa. Tukio la uoanifu
la `error` hutolewa tu linapokuwa na msajili, ili binary inayokosekana isiweze
kusababisha hitilafu ya EventEmitter isiyoshughulikiwa.

- `getSession(sessionId)` hurejesha kipindi kinachosimamiwa au `undefined`.
- `getActiveSessions()` huondoa vipindi vilivyosimamishwa au vinavyosimamishwa.
- `sendInput(sessionId, input)` hupatikana tu kwa adapta ya zamani iliyo hai;
  ACP asilia hukataa ingizo ghafi ili kulinda mtiririko wake wa JSON-RPC.
- `killAll()` husitisha kila kipindi kinachosimamiwa na instansi hiyo.

## Mipaka ya uthibitishaji

Fixtures thabiti hushughulikia handshake asilia, towe la maandishi, ruhusa
zilizokataliwa, kughairi, vidokezo vinavyoendeshwa kwa wakati mmoja, uanzishaji
ulioshindwa, kutoka kwa mchakato, vikomo vya towe, na utenganishaji wa siri.
Regressions zilizopo za bafa/visikilizaji vya zamani zinaendelea kushughulikiwa.
Majaribio haya hayaonyeshi kuingia moja kwa moja kwenye Gemini au inference
iliyofanikiwa ya mtoa huduma; hayo yanahitaji jaribio tofauti la smoke
lililoidhinishwa katika mazingira lengwa.

## Nyaraka zinazohusiana

- [Itifaki za mawakala](./AGENT_PROTOCOLS_GUIDE.md)
- [Mikataba ya uzinduzi wa CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Zana za CLI](../reference/CLI-TOOLS.md)
- [Seva ya A2A](./A2A-SERVER.md)
- [Mawakala wa wingu](./CLOUD_AGENT.md)
