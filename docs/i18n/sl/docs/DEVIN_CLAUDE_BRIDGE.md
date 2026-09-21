# Devin Claude Bridge (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` omogoča, da dejansko izvajalno okolje Claude Code uporablja lokalno končno točko Anthropic
Messages storitve OmniRoute, medtem ko uradni Devin CLI zagotavlja odzive modela prek ACP stdio. Ne
spreminja obstoječih ponudnikov Anthropic, Claude OAuth, Claude Web ali `devin-cli`.

> **Trenutno stanje: pripeta različica Claude Code `2.1.258`; preverjanje brez povezave in v živo je bilo nazadnje izvedeno
> na različici `2.1.220`.** Pripeta različica `2.1.220` je uspešno izvedla tri izolirane scenarije prek Devin CLI
> `3000.2.17` in modela `swe-1-7-lightning`; ta zadnji preizkus v živo je potrdil izvedbe `Read`,
> `Edit` in `Bash` pod nadzorom odjemalca, uspešne rezultate `npm test`, odkrivanje projektnih ukazov in veščin,
> usmerjanje izključno prek Devina ter ničelni odhodni promet do storitve Claude. Pripeta različica je bila nato povišana na `2.1.258`
> (generacijo CLI-ja, ki jo posnema identiteta Claude v OmniRoute, in prvo linijo, ki
> izvorno vključuje raven Fable 5.1). Pri novi pripeti različici sta bila namestitveni sloj in `claude --version`
> preverjena na pripeti osnovni sliki, zbirka enotnih testov mostu, `compose config` in
> statični dokaz izolacije pa so uspešni — vendar lažni scenarij brez povezave in zbirka treh scenarijev
> v živo še nista bila ponovno izvedena. Pred uporabo mostu s to pripeto različico ju ponovno izvedite
> (glejte »Posodabljanje pripetih orodij«).

## Arhitektura

```text
Claude Code 2.1.258 (izoliran korenski Linuxov vsebnik brez korenskih pravic)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (oblika Claude, ponudnik brez preverjanja pristnosti)
  -> devin acp --agent-type summarizer (uradni ACP stdio, brez orodij Devin)
  -> račun Devin v namenskem nosilcu devin-auth
```

Privzeti agent ACP uradnega CLI-ja lahko izvaja lastna orodja, zato ga ta most ne uporablja.
Zažene nespremenljivi agent ACP `summarizer`, katerega uradni način CLI nima orodij, in
serializirano zahtevo Anthropic uokviri kot sled izvajanja. Ko je potrebno drugo dejanje pod
nadzorom Clauda, mora odziv vsebovati natanko eno ovojnico odjemalskega orodja. Vsak ACP
`tool_call` ali `tool_call_update` je zavrnjen, preden je odziv mogoče označiti kot
uspešen.

Serializator v `open-sse/executors/devin-agentic/serializer.ts` ohrani `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` in
orodja, ki jih posreduje Claude Code. Slike in neznani bloki povzročijo izrecno napako. Veliki rezultati orodij
uporabljajo vidno oznako skrajšanja.

Razčlenjevalnik sprejme eno samostojno ovojnico `<tool>{...}</tool>` na obrat modela. Ime
preveri glede na seznam orodij zahteve, argumente preveri glede na JSON Schema tega orodja,
zavrne mešanico pripovednega besedila in dejanj ter dovoli en omejen poskus popravka. Claude Code nato
lokalno izvede nastali Anthropic `tool_use` in pošlje `tool_result` nazaj prek
OmniRoute.

## Izolacija in model groženj

Namestitev, račun in konfiguracija Clauda v gostitelju so zunaj obsega in se obravnavajo kot
prepovedani. Storitve Compose:

- se izvajajo kot UID/GID `10001:10001`, z datotečnim sistemom korena samo za branje, odstranjenimi zmogljivostmi in
  možnostjo `no-new-privileges`;
- uporabljajo zasebni `/home/bridge`, namenski nosilec konfiguracije Claude, izolirane podatke OmniRoute
  in ločen nosilec `devin-auth`;
- priklapljajo samo začasne delovne prostore/dokaze `.sandbox`;
- ne priklapljajo domačega imenika gostitelja, storitve Keychain, SSH-ja, poverilnic za oblak ali vtičnice Docker;
- sestavijo izrecna okolja in odstranijo spremenljivke za API Anthropic, OAuth ter usmerjanje;
- usmerjajo sklepanje Claude Code samo na `http://omniroute:20128` z lokalnim ključem.

Profil brez povezave uporablja notranje omrežje. V profilu v živo OmniRoute dosega
uradne končne točke Devin samo prek `network-guard`; nepovezani cilji so zavrnjeni.
Claude Code ima ločeno zaščito odhodnega prometa, ki zavrne vse povezave, in lahko doseže samo lokalno storitev OmniRoute
prek `NO_PROXY`. Datoteke revizije zaščite priklaplja samo njihov proces zaščite. Skripti
preverijo lastništvo datotek, način, število povezav in vsako odločitev, preden izvozijo
dokaze brez žetonov.

Dokaz izolacije zaženite neodvisno:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Preveri topologijo, poimenovane priklope, nastavitve brez korenskih pravic/samo za branje, izrecno lokalno usmerjanje,
odsotnost občutljivih okoljskih spremenljivk, odsotnost vtičnice Docker, blokiran dostop do
`api.anthropic.com` in `claude.ai`, izbiro ponudnika izključno Devin ter izrecno napako, ko
zaledna storitev ACP ni na voljo.

## Prva nastavitev in običajna uporaba

Zgradite pripeto sliko:

```bash
./scripts/devin-bridge/build
```

Overite samo izolirani nosilec Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Ukaz za prijavo uporablja uradni postopek z ročnim žetonom, namenjen oddaljenim okoljem oziroma okoljem vsebnikov. Vrednost se vnese neposredno v poziv CLI; ne posreduje se kot argument procesa, ne zapisuje se v Git in ne kopira se iz gostitelja.

Zaženite izolirano izvajalno okolje Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` pred zagonom Claude Code v vsebniku znova preveri izolacijo, overjanje Devin in odkrivanje modelov. Nikoli ne zažene gostiteljeve izvršljive datoteke Claude. Vzdevke modelov lahko nastavite v `.env.devin-bridge`; vsaka nastavljena vrednost mora ohraniti predpono `devin-cli-agentic/`.

## Ukazi za preverjanje

Ponovljiva pot brez povezave ne zahteva računa Devin in med izvajanjem nima dostopa do interneta:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Overjena izbirna pot v živo je:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Izvajalnik v živo med scenariji počaka, da prepreči sunkovito odpiranje sej ACP, in namesto zanašanja na besedilne trditve preverja strukturirane dogodke toka Claude. Njegovi trije scenariji dokazujejo:

1. neposredno branje projekta in analizo napak;
2. dejanski `Edit`, odjemalčevo izvajanje `Bash` `npm test` in končni rezultat;
3. odkrivanje `/bridge-check` in `bridge-proof`, branje projekta, še eno uspešno odjemalčevo izvajanje `npm test` ter dokončanje brez čakajočega dela.

Končna kontrolna točka preveri tudi revizijo omrežja Devin in zahteva, da revizija izhodnega prometa Claude ostane prazna.

## Posodabljanje pripetih orodij

Slika pripne Node, Claude Code in Devin CLI v datoteki `docker/devin-bridge/Dockerfile`. Za posodobitev:

1. spremenite izrecno navedene različice;
2. zamenjajte kontrolni vsoti arhivov Devin za obe arhitekturi z vrednostma za uradni artefakt;
3. znova zgradite sliko in zaženite vse ukaze za preverjanje brez povezave;
4. preverite različice znotraj slike;
5. znova zaženite overjeni paket treh scenarijev v živo.

Nobenega od CLI-jev ne namestite globalno na gostitelja in preverjanja kontrolne vsote ne nadomestite z nepreverjenim prenosom.

## Diagnosticiranje in čiščenje

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  prikaže lokalno usmerjanje in prečiščene napake izvajalnika.
- `.sandbox/evidence/mock-acp.jsonl` beleži deterministična lažna dejanja ACP.
- `.sandbox/evidence/claude-stream.jsonl` beleži dejanski zagon Claude Code brez povezave.
- `.sandbox/evidence/live-*.jsonl` beleži tri preverjene tokove v živo.
- `.sandbox/evidence/egress.jsonl` in `.sandbox/evidence/claude-egress.jsonl` sta preverjeni kopiji revizij varoval brez žetonov.

Ustavite vsebnike in omrežja v lasti mostu, pri tem pa ohranite nosilce za prijavo in konfiguracijo:

```bash
./scripts/devin-bridge/clean
```

Odstranite celotno okolje v lasti mostu, vključno z imenovanimi nosilci:

```bash
./scripts/devin-bridge/clean --all
```

## Omejitve

- Most uporablja fiksno vlogo `summarizer` brez orodij, ker Devin CLI `3000.2.17` ne ponuja nevtralnega agenta ACP brez orodij. Vmesnik kompenzira vmesne odgovore v obliki povzetkov, vendar lahko en omejen poskus popravka kljub temu izrecno spodleti.
- Aktivni klici ACP lahko vrnejo prehodne odgovore `502`/`504`. Preskusno ogrodje časovno razporedi scenarije; trajna napaka ostane varno zaprta in nikoli ne izbere drugega ponudnika.
- Kontekst ACP se znova sestavi iz vsake zahteve Anthropic; vezanosti na proces/sejo ni.
- Podprt je en klic orodja na odgovor modela; vzporedni klici so zavrnjeni.
- Slike izrecno niso podprte. Zmožnosti vida, izpis razmišljanja, nastavitve ravni truda in kontekstno okno velikosti 1M niso oglaševani.
- SSE uporablja veljavne dogodke življenjskega cikla Anthropic, vendar se odda šele po tem, ko je zbran omejeni obrat ACP; deli ACP se ne posredujejo sproti.
