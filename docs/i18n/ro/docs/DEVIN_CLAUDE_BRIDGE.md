# Devin Claude Bridge (Română)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` permite mediului de execuție Claude Code real să utilizeze endpointul local Anthropic
Messages al OmniRoute, în timp ce CLI-ul oficial Devin furnizează răspunsurile modelului prin ACP stdio. Acesta
nu modifică furnizorii existenți Anthropic, Claude OAuth, Claude Web sau `devin-cli`.

> **Stare actuală: Claude Code fixat la versiunea `2.1.258`; ultima validare offline și live a fost înregistrată
> pentru `2.1.220`.** Versiunea fixată `2.1.220` a finalizat trei scenarii izolate prin Devin CLI
> `3000.2.17` și modelul `swe-1-7-lightning`; acea ultimă execuție live a demonstrat turele `Read`,
> `Edit` și `Bash` gestionate de client, rezultate `npm test` reușite, descoperirea comenzilor și a
> competențelor proiectului, rutarea exclusiv prin Devin și zero trafic de ieșire către Claude. Versiunea fixată a fost apoi actualizată la `2.1.258`
> (generația CLI pe care o imită identitatea Claude a OmniRoute și prima linie care include
> nativ nivelul Fable 5.1). Pentru noua versiune fixată, stratul de instalare și `claude --version` au fost
> verificate pe imaginea de bază fixată, iar suita de teste unitare a punții, `compose config` și
> demonstrația statică de izolare trec cu succes — însă scenariul simulat offline și suita live cu trei scenarii
> nu au fost încă rulate din nou. Rulați-le din nou (consultați „Actualizarea instrumentelor fixate”) înainte de a vă baza pe
> punte cu această versiune fixată.

## Arhitectură

```text
Claude Code 2.1.258 (container Linux izolat, fără root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (format Claude, furnizor fără autentificare)
  -> devin acp --agent-type summarizer (ACP stdio oficial, fără instrumente Devin)
  -> cont Devin în volumul dedicat devin-auth
```

Agentul ACP implicit al CLI-ului oficial își poate executa propriile instrumente, astfel încât această punte nu îl
utilizează. Aceasta pornește agentul ACP fix `summarizer`, al cărui mod CLI oficial nu are instrumente, și
încadrează cererea Anthropic serializată ca urmă de execuție. Atunci când este necesară o altă
acțiune gestionată de Claude, răspunsul trebuie să conțină exact un plic pentru instrumentul clientului. Orice
`tool_call` sau `tool_call_update` ACP este respins înainte ca un răspuns să poată fi raportat ca
reușit.

Serializatorul din `open-sse/executors/devin-agentic/serializer.ts` păstrează `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` și
instrumentele furnizate de Claude Code. Imaginile și blocurile necunoscute eșuează explicit. Rezultatele mari ale instrumentelor
utilizează un marcaj vizibil de trunchiere.

Parserul acceptă un singur plic independent `<tool>{...}</tool>` pentru fiecare tură a modelului. Acesta verifică
numele în raport cu lista de instrumente a cererii, validează argumentele în raport cu schema JSON a instrumentului,
respinge combinațiile de text narativ și acțiuni și permite o singură remediere limitată. Claude Code execută apoi
local rezultatul Anthropic `tool_use` și trimite `tool_result` înapoi prin
OmniRoute.

## Izolare și model de amenințări

Instalarea, contul și configurația Claude de pe gazdă nu fac parte din domeniul de aplicare și sunt tratate ca
interzise. Serviciile Compose:

- rulează ca UID/GID `10001:10001`, cu un sistem de fișiere rădăcină doar în citire, capabilități eliminate și
  `no-new-privileges`;
- utilizează un `/home/bridge` privat, un volum dedicat pentru configurația Claude, date OmniRoute izolate
  și un volum `devin-auth` separat;
- montează numai spații de lucru/dovezi `.sandbox` de unică folosință;
- nu montează directorul personal al gazdei, Keychain, SSH, acreditări cloud sau socketul Docker;
- construiesc medii explicite și elimină variabilele Anthropic pentru API/OAuth/rutare;
- direcționează inferența Claude Code numai către `http://omniroute:20128`, cu o cheie exclusiv locală.

Profilul offline utilizează o rețea internă. În profilul live, OmniRoute ajunge la
endpointurile oficiale Devin numai prin `network-guard`; destinațiile fără legătură sunt refuzate.
Claude Code are o protecție de ieșire separată care refuză tot traficul și poate ajunge numai la serviciul local OmniRoute
prin `NO_PROXY`. Fișierele de audit ale protecțiilor sunt montate numai de procesul protecției respective.
Scripturile verifică proprietarul fișierelor, modul, numărul de legături și fiecare decizie înainte de a exporta
dovezi fără tokenuri.

Rulați independent demonstrația de izolare:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Aceasta validează topologia, montările denumite, setările fără root/doar în citire, rutarea locală explicită,
absența variabilelor de mediu sensibile, absența socketului Docker, accesul blocat la
`api.anthropic.com` și `claude.ai`, selectarea exclusivă a furnizorului Devin și eșecul explicit atunci când
backendul ACP nu este disponibil.

## Configurarea inițială și utilizarea normală

Construiți imaginea cu versiuni fixate:

```bash
./scripts/devin-bridge/build
```

Autentificați doar volumul Devin izolat:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Comanda de autentificare utilizează fluxul oficial cu token manual, destinat mediilor la distanță/containerizate. Valoarea este introdusă direct în promptul CLI; nu este transmisă ca argument de proces, scrisă în Git sau copiată de pe gazdă.

Lansați mediul de execuție Claude Code izolat:

```bash
./scripts/devin-bridge/launch
```

`launch` verifică din nou izolarea, autentificarea Devin și descoperirea modelelor înainte de a porni Claude Code în container. Nu rulează niciodată executabilul Claude al gazdei. Aliasurile modelelor pot fi setate în `.env.devin-bridge`; fiecare valoare configurată trebuie să păstreze prefixul `devin-cli-agentic/`.

## Comenzi de validare

Fluxul offline reproductibil nu necesită un cont Devin și nu are acces la Internet în timpul execuției:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Fluxul live autentificat, care necesită activare explicită, este:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Executorul live așteaptă între scenarii pentru a evita deschiderea în rafală a sesiunilor ACP și validează evenimentele structurate din fluxul Claude în loc să se bazeze pe afirmații textuale. Cele trei scenarii ale sale demonstrează:

1. citirea directă a proiectului și analiza defectelor;
2. o operație `Edit` reală, o comandă `Bash` `npm test` controlată de client și un rezultat final;
3. descoperirea `/bridge-check` și `bridge-proof`, citirea proiectului, încă o executare reușită a comenzii `npm test` controlate de client și finalizarea fără activități în așteptare.

Verificarea finală controlează și auditul de rețea Devin și impune ca auditul traficului de ieșire Claude să rămână gol.

## Actualizarea instrumentelor cu versiuni fixate

Imaginea fixează versiunile pentru Node, Claude Code și Devin CLI în `docker/devin-bridge/Dockerfile`. Pentru actualizare:

1. modificați versiunile explicite;
2. înlocuiți sumele de control ale arhivei Devin pentru ambele arhitecturi cu valorile artefactului oficial;
3. reconstruiți și rulați fiecare comandă de validare offline;
4. confirmați versiunile din imagine;
5. rulați din nou suita live autentificată cu trei scenarii.

Nu instalați niciunul dintre instrumentele CLI la nivel global pe gazdă și nu înlocuiți verificarea sumei de control cu o descărcare neverificată.

## Diagnosticare și curățare

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  afișează rutarea locală și erorile igienizate ale executorului.
- `.sandbox/evidence/mock-acp.jsonl` înregistrează acțiunile ACP simulate deterministe.
- `.sandbox/evidence/claude-stream.jsonl` înregistrează execuția offline reală a Claude Code.
- `.sandbox/evidence/live-*.jsonl` înregistrează cele trei fluxuri live validate.
- `.sandbox/evidence/egress.jsonl` și `.sandbox/evidence/claude-egress.jsonl` sunt copii validate, fără tokenuri, ale auditurilor de protecție.

Opriți containerele și rețelele deținute, păstrând volumele de autentificare/configurare:

```bash
./scripts/devin-bridge/clean
```

Eliminați întregul mediu deținut de punte, inclusiv volumele denumite:

```bash
./scripts/devin-bridge/clean --all
```

## Limitări

- Puntea se bazează pe rolul fix fără instrumente `summarizer`, deoarece Devin CLI `3000.2.17`
  nu expune un agent ACP neutru fără instrumente. Adaptorul compensează răspunsurile intermediare
  cu structură de rezumat, dar o singură încercare limitată de remediere poate totuși eșua explicit.
- Apelurile ACP live pot returna răspunsuri tranzitorii `502`/`504`. Harness-ul spațiază scenariile;
  o eroare persistentă rămâne de tip fail-closed și nu selectează niciodată alt furnizor.
- Contextul ACP este reconstruit din fiecare solicitare Anthropic; nu există afinitate
  de proces/sesiune.
- Este acceptat un singur apel de instrument per răspuns al modelului; apelurile paralele sunt respinse.
- Imaginile nu sunt acceptate în mod explicit. Capabilitățile de viziune, rezultatul procesului de gândire, controalele privind efortul și o fereastră de context de 1M
  nu sunt promovate.
- SSE utilizează evenimente valide ale ciclului de viață Anthropic, dar este emis după colectarea
  schimbului ACP limitat; fragmentele ACP nu sunt redirecționate incremental.
