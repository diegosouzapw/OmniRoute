# ACP registry and registered CLI launchers (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute razdvaja **otkrivanje CLI alata**, **izvorni Agent Client Protocol** i
**naslijeđene stdio adaptere**. Pronalaženje instalirane binarne datoteke ne potvrđuje njezinu
autentikaciju, kompatibilnost modela ni spremnost za obradu upita.

Nadzorna ploča koristi `GET /api/acp/agents` i `POST /api/acp/agents` za inventar
i registraciju prilagođenih agenata. To su upravljačke rute dostupne samo lokalno, a ne
javni API za pokretanje procesa ili slanje upita. Interni
`AcpManager` ne postaje automatski rezervni HTTP pružatelj.

## Registrirani ugovori

`config/cli-tools-manifest.json` izvor je istine za ugrađene izvršne
datoteke, argumente i načine rada pozadinskih sustava. Registar izvodi svoje definicije
iz tog manifesta. Rezultati otkrivanja spremaju se u predmemoriju na 60 sekundi.

- `acp`: Gemini ugovor pokreće `gemini --experimental-acp` i komunicira
  ACP JSON-RPC porukama razdvojenima novim redovima putem službenog TypeScript SDK-a.
- `stdio-adapter`: ostali registrirani ugovori zadržavaju naslijeđeni adapter s unosom
  po redovima i izlazom na stdout. Razdoblje neaktivnosti izlaza od dvije sekunde završava njegov odgovor.
  Ovaj adapter **ne** potvrđuje izvornu ACP podršku za te CLI alate.

Gemini dokumentira zastavicu za pokretanje u svojoj [CLI referenci](https://geminicli.com/docs/cli/cli-reference/).
Klijent koristi [službeni ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
za inicijalizaciju, stvaranje sesije, zahtjeve s upitima, obavijesti i otkazivanje.

Definicije prilagođenih agenata ostaju ugovori pokretanja pod nadzorom administratora.
Registriranje binarne datoteke i argumenata tom procesu daje lokalne
izvršne ovlasti korisnika poslužitelja; registracija nije izolirano okruženje. Provjere verzije prihvaćaju
samo registriranu izvršnu datoteku i prepoznatu zastavicu verzije.

## Interni API za pokretanje

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Proslijedite samo varijable pružatelja koje su namjerno dodijeljene ovom agentu.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Objasni ovaj projekt", 120_000);
  // Obradite odgovor u pozivajućoj aplikaciji.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` razrješava izvršnu datoteku i argumente iz
registrirane definicije. Jedine opcije pozivatelja su `cwd` i `env`; stari
potpis `spawn(agentId, binary, args, env)` i nadjačavanja izvršne datoteke
odbijaju se. Ovaj upravitelj ne podržava HTTP ugovore za pokretanje.

Proces dijete nasljeđuje isti operacijski sustav, terminal, regionalne postavke i popis
dopuštenih certifikata kao pokretači CLI alata. Tajne poslužitelja/pružatelja ne kopiraju se iz
okruženja roditeljskog procesa. Vjerodajnice potrebne odabranom CLI alatu moraju se proslijediti
izričito ili pružiti putem vlastite lokalne autentikacije tog CLI alata. Proces dijete
i dalje ima dozvole lokalnog korisnika za datotečni sustav i može čitati vlastitu konfiguraciju.

## Izvorni životni ciklus i ograničenja

1. Pokrenite registriranu binarnu datoteku, inicijalizirajte ACP i stvorite sesiju ukorijenjenu u
   odabranom radnom direktoriju. Inicijalizacija ima ograničenje od deset sekundi.
2. Pošaljite upit i prikupite tekstne obavijesti samo za tu sesiju.
   Završetak predstavlja odgovor RPC-a na upit, a ne razdoblje bez izlaza na stdout.
3. Primijenite jedan rok za upit, uključujući eventualno nedovršenu inicijalizaciju; zadana vrijednost
   iznosi 120 sekundi. Istodobni upiti u istom procesu odbijaju se.
4. Pri isteku vremena izvornog protokola pokušajte izvršiti `session/cancel` i prekinuti proces.
   Ograničeni interval od 100 ms omogućuje slanje obavijesti prije prekida.
5. Zatvorite stanje prijenosa i uklonite sesiju kada inicijalizacija ne uspije,
   veza se zatvori, proces završi ili ga pozivatelj prekine.

Zahtjevi za dopuštenja alata odbijaju se. Ne oglašavaju se klijentske
mogućnosti datotečnog sustava ni terminala. Ta ograničenja ne izoliraju samu binarnu datoteku procesa djeteta
niti zamjenjuju vlastite postavke autorizacije CLI alata.

I izvorni tekst i naslijeđeni stdout/stderr zadržavaju najviše 1 MiB znakova,
čuvajući najnoviji izlaz uz obavijest o skraćivanju. Pojedinačni izvorni okvir na prijenosnoj
vezi ograničen je na 2 MiB bajtova prije raščlambe SDK-a. Međuspremnici se poništavaju za svaki upit.

`kill(sessionId)` šalje SIGTERM, a zatim SIGKILL nakon pet sekundi ako proces
nije završio. Istek vremena naslijeđenog upita oslobađa osluškivače i mjerače vremena, ali ostavlja
sesiju dostupnom za drugi upit; pozivatelji i dalje moraju pozvati
`kill()` ili `killAll()` nakon završetka.

## Događaji i pregled

Upravitelj emitira `stdout`, `stderr` i `exit`, svaki sa `sessionId`.
`sessionError` prijavljuje pročišćenu pogrešku prijenosa. Događaj kompatibilnosti `error`
emitira se samo kada ima pretplatnika, pa binarna datoteka koja nedostaje ne može
uzrokovati neobrađenu pogrešku EventEmittera.

- `getSession(sessionId)` vraća upravljanu sesiju ili `undefined`.
- `getActiveSessions()` izostavlja zaustavljene sesije i sesije u postupku zaustavljanja.
- `sendInput(sessionId, input)` dostupan je samo za aktivni naslijeđeni adapter;
  izvorni ACP odbija neobrađeni unos radi zaštite svojeg JSON-RPC toka.
- `killAll()` prekida svaku sesiju kojom upravlja ta instanca.

## Granice provjere valjanosti

Determinističke testne strukture obuhvaćaju izvorno uspostavljanje veze, tekstni izlaz, odbijena
dopuštenja, otkazivanje, istodobne upite, neuspjelu inicijalizaciju, završetak
procesa, ograničenja izlaza i izolaciju tajni. Postojeće regresije naslijeđenih međuspremnika/osluškivača
i dalje su pokrivene. Ti testovi ne dokazuju aktivnu prijavu u Gemini
ni uspješno izvođenje zaključivanja pružatelja; za to je potreban zasebno autoriziran osnovni
test u ciljnom okruženju.

## Povezana dokumentacija

- [Protokoli agenata](./AGENT_PROTOCOLS_GUIDE.md)
- [Ugovori za pokretanje CLI alata](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI alati](../reference/CLI-TOOLS.md)
- [A2A poslužitelj](./A2A-SERVER.md)
- [Agenti u oblaku](./CLOUD_AGENT.md)
