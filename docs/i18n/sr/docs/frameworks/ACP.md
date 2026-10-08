# ACP registry and registered CLI launchers (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute раздваја **откривање CLI алата**, **изворни Agent Client Protocol** и
**застареле stdio адаптере**. Проналажење инсталиране бинарне датотеке не доказује њену
аутентификацију, компатибилност модела нити спремност да обради упит.

Контролна табла користи `GET /api/acp/agents` и `POST /api/acp/agents` за инвентар
и регистрацију прилагођених агената. То су управљачке руте доступне само локално, а не
јавни API за покретање процеса или слање упита. Интерни
`AcpManager` не постаје аутоматски резервни HTTP провајдер.

## Регистровани уговори

`config/cli-tools-manifest.json` је меродаван извор за уграђене бинарне датотеке за
покретање, аргументе и режиме позадинског система. Регистар изводи своје дефиниције
из тог манифеста. Резултат откривања се кешира 60 секунди.

- `acp`: Gemini уговор покреће `gemini --experimental-acp` и комуницира путем
  ACP JSON-RPC порука раздвојених новим редовима, користећи званични TypeScript SDK.
- `stdio-adapter`: остали регистровани уговори задржавају застарели адаптер са улазом
  раздвојеним новим редовима и излазом преко stdout-а. Период неактивности излаза од
  две секунде завршава одговор. Овај адаптер **не** потврђује изворну ACP подршку
  за те CLI алате.

Gemini документује заставицу за покретање у својој [CLI референци](https://geminicli.com/docs/cli/cli-reference/).
Клијент користи [званични ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
за иницијализацију, креирање сесије, захтеве са упитима, обавештења и отказивање.

Дефиниције прилагођених агената остају уговори о покретању под контролом администратора.
Регистровање бинарне датотеке и аргумената додељује том процесу локалне привилегије
извршавања серверског корисника; регистрација није изоловано окружење. Провере верзије
прихватају само регистровану извршну датотеку и препознату заставицу верзије.

## Интерни API за покретање

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Проследите само променљиве провајдера које су намерно додељене овом агенту.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Објасни овај пројекат", 120_000);
  // Обрадите одговор у апликацији која позива ову функцију.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` одређује извршну датотеку и аргументе из
регистроване дефиниције. Једине опције позиваоца су `cwd` и `env`; стари
потпис `spawn(agentId, binary, args, env)` и замене извршне датотеке се
одбијају. Овај менаџер не подржава HTTP уговоре за покретање.

Подређени процес наслеђује исти оперативни систем, терминал, локал и листу
дозвољених сертификата као CLI покретачи. Тајне сервера/провајдера не копирају се из
окружења родитељског процеса. Акредитиви потребни изабраном CLI алату морају бити
прослеђени изричито или обезбеђени путем сопствене локалне аутентификације тог CLI алата.
Подређени процес и даље има дозволе локалног корисника за систем датотека и може да чита
сопствену конфигурацију.

## Изворни животни циклус и ограничења

1. Покрените регистровану бинарну датотеку, иницијализујте ACP и креирајте сесију чији је
   корен у изабраном радном директоријуму. Иницијализација има ограничење од десет секунди.
2. Пошаљите упит и прикупите текстуална обавештења само за ту сесију.
   Завршетак одређује RPC одговор на упит, а не период без активности на stdout-у.
3. Користите један крајњи рок за упит, укључујући сваку незавршену иницијализацију;
   подразумевана вредност је 120 секунди. Истовремени упити у истом процесу се одбијају.
4. При истеку времена у изворном режиму, покушајте `session/cancel` и окончајте процес.
   Ограничени период од 100 ms омогућава слање обавештења пре окончања.
5. Затворите стање транспорта и уклоните сесију када иницијализација не успе, када се
   веза затвори, процес заврши или га позивалац прекине.

Захтеви за дозволе алата се одбијају. Не оглашавају се клијентске могућности
система датотека или терминала. Ова ограничења не изолују саму подређену бинарну
датотеку нити замењују сопствена подешавања ауторизације CLI алата.

И изворни текст и застарели stdout/stderr задржавају највише 1 MiB знакова,
чувајући најновији излаз уз обавештење о скраћивању. Појединачни изворни оквир
на преносном слоју ограничен је на 2 MiB бајтова пре SDK рашчлањивања. Бафери
се ресетују за сваки упит.

`kill(sessionId)` шаље SIGTERM, а затим SIGKILL после пет секунди ако се процес
није завршио. Истек времена за застарели упит ослобађа ослушкиваче и тајмере, али
оставља сесију доступном за други упит; позиваоци су и даље одговорни да по завршетку
позову `kill()` или `killAll()`.

## Догађаји и преглед

Менаџер емитује `stdout`, `stderr` и `exit`, сваки са `sessionId`.
`sessionError` пријављује очишћену грешку транспорта. Догађај `error` ради
компатибилности емитује се само када има претплатника, тако да бинарна датотека
која недостаје не може изазвати необрађену EventEmitter грешку.

- `getSession(sessionId)` враћа управљану сесију или `undefined`.
- `getActiveSessions()` изоставља заустављене сесије и сесије које се заустављају.
- `sendInput(sessionId, input)` доступан је само за активан застарели адаптер;
  изворни ACP одбија сиров улаз како би заштитио свој JSON-RPC ток.
- `killAll()` окончава сваку сесију којом управља та инстанца.

## Границе валидације

Детерминистичке фикстуре покривају изворно успостављање везе, текстуални излаз, одбијене
дозволе, отказивање, истовремене упите, неуспелу иницијализацију, завршетак процеса,
ограничења излаза и изолацију тајни. Постојеће регресије застарелих бафера/ослушкивача
остају покривене. Ови тестови не доказују активно пријављивање на Gemini нити успешно
извођење закључака код провајдера; за то је потребан засебно ауторизован основни тест
у циљном окружењу.

## Повезана документација

- [Протоколи агената](./AGENT_PROTOCOLS_GUIDE.md)
- [Уговори за покретање CLI алата](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI алати](../reference/CLI-TOOLS.md)
- [A2A сервер](./A2A-SERVER.md)
- [Агенти у облаку](./CLOUD_AGENT.md)
