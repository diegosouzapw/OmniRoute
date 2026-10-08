# ACP registry and registered CLI launchers (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute ločuje **odkrivanje CLI-jev**, **izvorni Agent Client Protocol** in
**starejše adapterje stdio**. Najdba nameščene izvršljive datoteke ne dokazuje
njene avtentikacije, združljivosti modela ali pripravljenosti za obdelavo poziva.

Nadzorna plošča uporablja `GET /api/acp/agents` in `POST /api/acp/agents` za popis
in registracijo agentov po meri. To so upravljavske poti, dostopne samo lokalno,
in ne javni API za zaganjanje procesov ali pošiljanje pozivov. Notranji
`AcpManager` ne postane samodejno nadomestni ponudnik HTTP.

## Registrirane pogodbe

`config/cli-tools-manifest.json` je edini merodajni vir za vgrajene zagonske
izvršljive datoteke, argumente in načine zaledja. Register svoje definicije
izpelje iz tega manifesta. Rezultati zaznavanja se predpomnijo za 60 sekund.

- `acp`: pogodba Gemini zažene `gemini --experimental-acp` in komunicira prek
  ACP JSON-RPC, razmejenega z novimi vrsticami, z uporabo uradnega SDK-ja za TypeScript.
- `stdio-adapter`: druge registrirane pogodbe ohranijo starejši adapter z vnosom,
  razmejenim z novimi vrsticami, in izhodom stdout. Dvesekundno obdobje
  nedejavnosti izhoda konča njegov odgovor. Ta adapter **ne** potrjuje izvorne
  podpore ACP za te CLI-je.

Gemini dokumentira zagonsko zastavico v svoji [referenci CLI](https://geminicli.com/docs/cli/cli-reference/).
Odjemalec uporablja [uradni ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
za inicializacijo, ustvarjanje sej, zahteve s pozivi, obvestila in preklic.

Definicije agentov po meri ostajajo zagonske pogodbe pod nadzorom skrbnika.
Registracija izvršljive datoteke in argumentov temu procesu podeli lokalne
izvajalne pravice strežniškega uporabnika; registracija ni peskovnik. Preverjanja
različice sprejmejo samo registrirano izvršljivo datoteko in prepoznano zastavico
za različico.

## Notranji API za zagon

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Posredujte samo spremenljivke ponudnika, ki so namenoma dodeljene temu agentu.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Pojasni ta projekt", 120_000);
  // Obdelajte odgovor v klicni aplikaciji.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` razreši izvršljivo datoteko in argumente iz registrirane
definicije. Edini možnosti klicatelja sta `cwd` in `env`; stari podpis
`spawn(agentId, binary, args, env)` in preglasitve izvršljive datoteke so
zavrnjeni. Ta upravljalnik ne podpira zagonskih pogodb HTTP.

Podrejeni proces podeduje isti operacijski sistem, terminal, območne nastavitve
in seznam dovoljenih potrdil kot zaganjalniki CLI. Skrivnosti strežnika oziroma
ponudnika se ne kopirajo iz nadrejenega okolja. Poverilnice, ki jih potrebuje
izbrani CLI, morajo biti posredovane izrecno ali zagotovljene prek lastne lokalne
avtentikacije tega CLI-ja. Podrejeni proces ima še vedno dovoljenja lokalnega
uporabnika za datotečni sistem in lahko bere lastno konfiguracijo.

## Izvorni življenjski cikel in omejitve

1. Zaženite registrirano izvršljivo datoteko, inicializirajte ACP in ustvarite
   sejo, zakoreninjeno v izbranem delovnem imeniku. Inicializacija je omejena na
   deset sekund.
2. Pošljite poziv in zberite besedilna obvestila samo za to sejo. Zaključek
   predstavlja odgovor RPC na poziv, ne obdobje tišine na stdout.
3. Uporabite en rok za poziv, ki vključuje tudi morebitno nedokončano
   inicializacijo; privzeto znaša 120 sekund. Sočasni pozivi v istem procesu so
   zavrnjeni.
4. Ob časovni prekoračitvi izvornega protokola poskusite izvesti
   `session/cancel` in končajte proces. Omejeno 100 ms dolgo okno omogoči
   dokončanje pošiljanja obvestila pred končanjem.
5. Zaprite stanje prenosa in odstranite sejo, ko inicializacija ne uspe, se
   povezava zapre, proces konča ali ga klicatelj prekine.

Zahteve za dovoljenja orodij so zavrnjene. Zmožnosti odjemalca za datotečni
sistem ali terminal niso oglaševane. Te omejitve ne izolirajo same podrejene
izvršljive datoteke v peskovniku in ne nadomeščajo lastnih nastavitev
pooblastitve CLI-ja.

Tako izvorno besedilo kot starejša stdout/stderr ohranijo največ 1 MiB znakov,
pri čemer se ohrani najnovejši izhod z obvestilom o obrezovanju. Posamezen
izvorni okvir na žici je pred razčlenjevanjem SDK-ja omejen na 2 MiB bajtov.
Medpomnilniki se ponastavijo ob vsakem pozivu.

`kill(sessionId)` pošlje SIGTERM, nato pa po petih sekundah SIGKILL, če se proces
še ni končal. Časovne prekoračitve starejših pozivov sprostijo poslušalce in
časovnike, vendar pustijo sejo na voljo za nov poziv; klicatelji so po koncu še
vedno odgovorni za klic `kill()` ali `killAll()`.

## Dogodki in pregled

Upravljalnik oddaja dogodke `stdout`, `stderr` in `exit`, vsak s `sessionId`.
`sessionError` sporoči očiščeno napako prenosa. Združljivostni dogodek `error`
se odda samo, kadar ima naročnika, zato manjkajoča izvršljiva datoteka ne more
povzročiti neobravnavane napake EventEmitter.

- `getSession(sessionId)` vrne upravljano sejo ali `undefined`.
- `getActiveSessions()` izključi ustavljene seje in seje v postopku ustavljanja.
- `sendInput(sessionId, input)` je na voljo samo za delujoč starejši adapter;
  izvorni ACP zavrne neobdelan vnos, da zaščiti svoj tok JSON-RPC.
- `killAll()` konča vse seje, ki jih upravlja ta primerek.

## Meje preverjanja

Deterministične testne priprave pokrivajo izvorno začetno usklajevanje,
besedilni izhod, zavrnjena dovoljenja, preklic, sočasne pozive, neuspešno
inicializacijo, končanje procesa, omejitve izhoda in izolacijo skrivnosti.
Obstoječe regresije starejših medpomnilnikov in poslušalcev ostajajo pokrite.
Ti preskusi ne dokazujejo delujoče prijave v Gemini ali uspešnega sklepanja
ponudnika; za to je potreben ločeno avtoriziran osnovni preizkus v ciljnem
okolju.

## Povezana dokumentacija

- [Protokoli agentov](./AGENT_PROTOCOLS_GUIDE.md)
- [Pogodbe za zagon CLI-jev](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Orodja CLI](../reference/CLI-TOOLS.md)
- [Strežnik A2A](./A2A-SERVER.md)
- [Agenti v oblaku](./CLOUD_AGENT.md)
