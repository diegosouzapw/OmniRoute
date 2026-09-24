# Providers — Claude Web (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` pošilja zahteve za klepet v obliki OpenAI prek overjene seje brskalnika `claude.ai`.
Izvajalnik normalizira posredovani piškotek, razreši eno overjeno organizacijo, pripravi stanje
pogovora, izbere neposredni ali brskalniški prenos in strogo prevede odziv SSE iz izvorne storitve.
Orkestracija je v
`open-sse/executors/claude-web.ts:320`.

> **Prvič uporabljate ponudnike s spletnimi piškotki?**
>
> Preden sledite tem navodilom za posameznega ponudnika, preberite **`docs/getting-started/WEB-COOKIE-GUIDE.md`**, kjer so opisani splošni postopek nastavitve, navodila za overjanje, omejitve in odpravljanje težav.

### Katalog modelov

Register ponudnika trenutno izpostavlja natanko teh sedem statičnih ID-jev modelov
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID modela                   | Prikazno ime              |
| --------------------------- | ------------------------- |
| `claude-fable-5`            | Claude Fable 5 (splet)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (splet)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (splet)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (splet)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (splet)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (splet)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (splet) |

Dinamično odkrivanje modelov za tega ponudnika ni implementirano. Zgornji seznam je
katalog izvajalnega okolja.

### Poverilnice in razreševanje organizacije

Posredujte celotno glavo Cookie za `claude.ai` ali samo vrednost seje. Samostojne vrednosti se
normalizirajo v `sessionKey`; drugi piškotki se ohranijo, če so posredovani. Izvajalnik sprejme
piškotek prek `cookie` ali `apiKey` ter iz podatkov povezave
prebere izbirni vrednosti `deviceId` in `orgId`
(`open-sse/executors/claude-web.ts:72`).

Če `orgId` manjka, izvajalnik pokliče `GET https://claude.ai/api/organizations` in uporabi prvo
organizacijo, ki jo vrne overjena spletna seja Claude
(`open-sse/executors/claude-web.ts:141`). Če ni vrnjena nobena veljavna organizacija, varno
zavrne zahtevo, zavrnjeno avtorizacijo seje sporoči s kodo 401 in razlikuje izziv Cloudflare
od neuspešnega overjanja.

### Operacije pogovora

Izbirni objekt `claude_web` na najvišji ravni je strog. Neznana polja so zavrnjena. Njegova
sprejeta polja so opredeljena v `open-sse/executors/claude-web/session.ts:50`:

| Polje                 | Pomen                                                               |
| --------------------- | ------------------------------------------------------------------- |
| `operation`           | Privzeto `completion`; za ponovni poskus odgovora uporabite `retry` |
| `conversation_id`     | Izrecni UUID obstoječega pogovora                                   |
| `parent_message_uuid` | Izrecni UUID nadrejenega sporočila pomočnika                        |
| `timezone`            | Veljavno ime časovnega pasu IANA                                    |
| `locale`              | Strukturno veljavna področna nastavitev                             |
| `tool_states`         | Izbirno polje stanj orodij računa, omejeno na 128 vnosov            |

Pripravljene zahteve uporabljajo eno od dveh izvornih končnih točk
(`open-sse/executors/claude-web.ts:203`):

- Nov ali nadaljevalni odgovor se pošlje na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Ponovni poskus se pošlje na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Nov odgovor vključuje `create_conversation_params`. Predpomnjeno ali izrecno povezano nadaljevanje
vključuje `parent_message_uuid` in izpusti `create_conversation_params`. Ponovni poskus zahteva tako
stanje pogovora kot stanje nadrejenega sporočila in ne pošlje poziva
(`open-sse/executors/claude-web/session.ts:254`). Novi pogovori odprejo overjeni
uporabniški vmesnik na `/new`; predpomnjena ali izrecno povezana nadaljevanja odprejo točno določeno stran pogovora
(`open-sse/executors/claude-web/session.ts:324`).

Stanje pogovora je predpomnilnik v pomnilniku, katerega ključ sestavljata obseg računa SHA-256 in kanonični
prepis klicatelja. Vnosi potečejo po 30 minutah, predpomnilnik pa je omejen na 5.000 vnosov
(`open-sse/executors/claude-web/session.ts:12`). Stanje se potrdi šele, ko strogi
razčlenjevalnik toka zazna `message_stop`; ponovni zagoni procesa ga zavržejo. Ob zgrešitvi predpomnilnika se
zahteva z več sporočili serializira v en obnovitveni poziv, namesto da bi bila prejšnja
sporočila tiho opuščena.

Področna nastavitev in časovni pas uporabljata naslednji prednostni vrstni red: vrednost `claude_web` iz zahteve, vrednost povezave,
vrednost izvajalnega okolja, nato `en-US` za področno nastavitev oziroma `UTC` za časovni pas
(`open-sse/executors/claude-web/session.ts:218`).

### Orodja in vsebine zahtev

Neposredne zahteve preoblikujejo samo strukturno veljavna funkcijska orodja OpenAI, ki jih posreduje
klicatelj. Izmišljen statični seznam privzetih orodij ne obstaja
(`open-sse/executors/claude-web/payload.ts:102`).

Brskalniške zahteve namesto tega zajamejo overjeno zahtevo uporabniškega vmesnika ter ohranijo njena orodja računa,
stanja orodij in prilagojene sloge. Pripravljena polja pogovora, modela, sklepanja, poziva in
UUID-ja sporočila še vedno preglasijo zajeto zahtevo
(`open-sse/executors/claude-web/browserTransport.ts:175`). Brskalniške predloge so omejene z
zgoščeno vrednostjo računa, organizacije, piškotka, področne nastavitve in časovnega pasu ter potečejo po 30 minutah
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Ko neposredna zahteva nima orodij
klicatelja, lahko ponovno uporabi to omejeno predlogo; izrecna orodja klicatelja imajo prednost
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Izbira prenosa

Privzeta pot je `sendClaudeWebDirect()`, ki pokliče `tlsFetchClaude()` z nastavljenim
profilom Chrome 146 in posredovanim piškotkom (`open-sse/services/claudeTlsClient.ts:23`). Ne
zažene reševalnika in ne ustvari nadomestnega piškotka.

Nastavite `WEB_COOKIE_USE_BROWSER` na `1`, `true` ali `on`, da bo brskalniški
vmesnik, omejen na račun, uporabljen kot primarni transport. Nastavite `OMNIROUTE_BROWSER_POOL`
na eno od istih vrednosti, da omogočite, da prepoznani izziv Cloudflare 403 preklopi z
neposrednega transporta na brskalniški vmesnik (`open-sse/executors/claude-web.ts:195`). Druge
napake HTTP ne sprožijo tega preklopa.

Brskalniški vmesnik hrani piškotke znotraj istega združenega konteksta Playwright, uporablja
zgoraj opisani zgoščeni ključ z omejenim obsegom in pošlje dokončanje iz tega konteksta
(`open-sse/executors/claude-web/browserTransport.ts:444`). Piškotka, pridobljenega prek
brskalnika, nikoli ne izvozi v neposrednega odjemalca TLS. Ponovni poskusi v brskalniku
zahtevajo nepretečeno predlogo uporabniškega vmesnika, vezano na isti dejanski kontekst
Playwright (`open-sse/executors/claude-web/browserTransport.ts:467`). Odgovori brskalnika se
berejo postopoma na overjeni strani, upoštevajo preklic zahteve in prekličejo telo odziva
izvornega strežnika takoj, ko preseže 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

Izvajalnik vrne anonimizirano revizijsko projekcijo skupnemu dnevniku zahtev: UUID-ji
organizacije, pogovora in sporočila, besedilo poziva, definicije orodij, piškotki ter
identifikatorji naprav so izključeni (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Transportne izjeme prav tako vrnejo splošno napako
povezave namesto sporočila vržene izjeme.

### Delovanje SSE

`createClaudeWebResponse()` obravnava uokvirjanje LF ali CRLF in večvrstična polja `data:`.
Besedilne spremembe preslika v `content`, spremembe razmišljanja v `reasoning_content`,
znane metapodatkovne dogodke pa v razširitev odziva `claude_web`. Vsak metapodatkovni dogodek
se projicira skozi lasten seznam dovoljenih polj
(`open-sse/executors/claude-web/stream.ts:37`). Metapodatki o pogovoru, nadrejenem sporočilu,
sporočilu pomočnika in operaciji se prav tako vrnejo v glavah `X-OmniRoute-Claude-Web-*`
(`open-sse/executors/claude-web/stream.ts:364`).

Razčlenjevalnik varno odpove pri nepravilno oblikovanem JSON-u, dogodkih `error` izvornega
strežnika, neznanih vrstah dogodkov, neveljavnem vrstnem redu, neujemanjih vsebinskih blokov
ali EOF pred `message_stop`. Pretočni izhod odda en zaključni kos in en `[DONE]`; medpomnjeni
izhod uporablja isti razčlenjevalnik. Razčlenjevalnik dogodek `message_stop` takoj obravnava
kot končnega, prekliče nadaljnje podatke izvornega strežnika in posreduje preklic nadaljnjega
prejemnika izvornemu bralniku (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Nedokončane vrstice SSE in zbrani dogodki so
omejeni na 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Datoteke

| Datoteka                                                 | Namen                                  |
| -------------------------------------------------------- | -------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statični register modelov ponudnika    |
| `open-sse/executors/claude-web.ts`                       | Orkestracija izvajalnika               |
| `open-sse/executors/claude-web/payload.ts`               | Pretvorba koristne vsebine in orodij   |
| `open-sse/executors/claude-web/session.ts`               | Stanje koraka in predpomnilnik prepisa |
| `open-sse/executors/claude-web/transport.ts`             | Vmesnik neposrednega transporta        |
| `open-sse/executors/claude-web/browserTransport.ts`      | Brskalniški vmesnik, omejen na račun   |
| `open-sse/executors/claude-web/stream.ts`                | Strogo prevajanje SSE                  |
| `open-sse/services/claudeTlsClient.ts`                   | Izvorni transport TLS                  |
| `open-sse/services/browserPool.ts`                       | Združeni konteksti Playwright          |

### Preizkušanje

Zaženite deterministično zbirko preizkusov Claude Web brez pravih poverilnic:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Primeri v `tests/unit/claude-web-auto-refresh.test.ts`, ki so odvisni od Playwrighta, so
izrecno preskočeni. To skladišče trenutno ne opredeljuje skripta za preizkušanje Claude Web
v živo s poverilnicami, zato ti preskočeni primeri niso dokaz delovanja med izvajanjem.

### Nastavitev

1. Zaženite OmniRoute z `npm run dev` ali iz izdelane namestitve.
2. Odprite Nadzorna plošča → Ponudniki → Dodaj ponudnika.
3. Izberite kategorijo Spletni piškotek in Claude Web.
4. Prilepite celotno glavo Cookie, kopirano iz overjene zahteve `claude.ai`.
