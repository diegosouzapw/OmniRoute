# AgentRouter Setup Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) je posredniška storitev, združljiva z Anthropic, ki preprodaja
Claude in druge modele, pogosto po nižjih cenah kot neposredni Anthropic API. Zasnovana
je kot neposredna zamenjava `ANTHROPIC_BASE_URL` za uradnega odjemalca Claude Code,
zato sprejema samo promet, ki ustreza komunikacijskemu vzorcu Claude Code (določen
User-Agent, zastavice `anthropic-beta`, glave SDK-ja Stainless itd.).

## Hiter začetek — uporaba izvornega ponudnika `agentrouter` (priporočeno)

Za večino uporabnikov **ni potrebna nobena posebna nastavitev**. OmniRoute vključuje
vgrajenega ponudnika `agentrouter`, pri katerem je celoten komunikacijski vzorec Claude
Code že vključen (glejte `open-sse/config/providerRegistry.ts` → `agentrouter`). Za uporabo:

1. Odprite **Nadzorna plošča → Ponudniki → Dodaj ponudnika**.
2. Na seznamu izberite **AgentRouter**.
3. Prilepite svoj ključ API `sk-...` in shranite.

To je vse — brez spremenljivk okolja in brez vrste ponudnika po meri. Vgrajeni modeli
vključujejo `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` in
`deepseek-v3.2`.

Preostanek tega vodnika obravnava **napredni način**: uporabo vrste ponudnika
`anthropic-compatible-cc-*`. Uporabite jo, kadar potrebujete več nadzora
nad komunikacijskim vzorcem — na primer pri povezovanju z drugimi posredniškimi
storitvami po vzoru AgentRouter, ki še niso vključene v izvorni register ponudnikov,
ali pri spreminjanju osnovnega URL-ja, poti za klepet ali nabora glav.

---

## Napredno: povezovanje prek vrste ponudnika, združljivega s Claude Code

OmniRoute podpira AgentRouter (in podobne posredniške storitve) tudi prek vrste
ponudnika, **združljivega s Claude Code** (`anthropic-compatible-cc-*`), ki uporablja
Anthropic Messages API s pravilnim komunikacijskim vzorcem. Splošni ponudnik
`openai-compatible-chat`, usmerjen na `https://agentrouter.org`, **ne bo** deloval —
požarni zid WAF pri ponudniku zavrne zahteve, ki niso videti, kot da prihajajo iz
Claude Code.

---

## Predpogoji

- Račun AgentRouter in ključ API. Novi uporabniki ob registraciji prejmejo brezplačne
  dobropise prek partnerske povezave v datoteki [README](../README.md).
- OmniRoute mora delovati z omogočeno funkcijsko zastavico `ENABLE_CC_COMPATIBLE_PROVIDER`
  (glejte spodaj).

## 1. Omogočite vrsto ponudnika, združljivega s CC

Vrsta ponudnika, združljivega s Claude Code, je zaščitena s funkcijsko zastavico, ker
pošilja promet, ki zelo natančno posnema uradnega odjemalca Claude Code. Omogočite jo
tako, da pred zagonom OmniRoute nastavite spremenljivko okolja:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Primer za Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Po ponovnem zagonu se na nadzorni plošči poleg obstoječih možnosti, združljivih z
OpenAI in Anthropic, prikaže tudi možnost **Dodaj ponudnika, združljivega s Claude Code**.

## 2. Ustvarite ponudnika na nadzorni plošči

1. Odprite **Nadzorna plošča → Ponudniki → Dodaj ponudnika**.
2. Izberite **Dodaj ponudnika, združljivega s Claude Code** (vidno samo, ko je zgornja zastavica nastavljena).
3. Izpolnite polja:

| Polje       | Vrednost                                                                     |
| ----------- | ---------------------------------------------------------------------------- |
| Ime         | `AgentRouter` (ali poljubna oznaka)                                          |
| Predpona    | `agentrouter` (prijazen vzdevek, prikazan v dnevnikih in na nadzorni plošči) |
| Osnovni URL | `https://agentrouter.org`                                                    |
| Pot klepeta | `/v1/messages?beta=true` (privzeto — pustite nespremenjeno)                  |

> Kanonični identifikator modela še vedno uporablja celotni ID vozlišča ponudnika
> (`anthropic-compatible-cc-{uuid}/{model}`). **Predpona** je zgolj prikazni
> vzdevek, ki ga `src/lib/usage/callLogs.ts` razreši za prijaznejši prikaz v dnevnikih.

4. (Izbirno) Prilepite svoj ključ API v polje **Preveri** in kliknite **Preveri**, da
   pred shranjevanjem potrdite povezljivost.
5. Kliknite **Dodaj**.

Po ustvarjanju odprite ponudnika in dodajte **Povezavo** s svojim ključem API za
AgentRouter (`sk-...`). Vrednost `test_status` povezave bi se morala spremeniti v `active`.

## 3. Uporabite ga prek kombinacije ali neposredno

Na model se sklicujte s predpono svojega ponudnika kot imenskim prostorom:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Deluje tudi kanonični ID modela `anthropic-compatible-cc-{uuid}/claude-opus-4-6`,
ki je prikazan v podatkovni zbirki in konfiguraciji kombinacije.

Lahko pa ga kot katerega koli drugega ponudnika dodate v kombinacijo za usmerjanje,
nadomestno preklapljanje in upravljanje kvot.

---

## Podrobnosti omrežne podobe

Za referenco: most, združljiv s cc, pri vsaki zahtevi navzgor pošlje naslednje
(glejte `open-sse/services/claudeCodeCompatible.ts`):

| Glava                                                | Vrednost                                                                                                        |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                      | `Bearer <api-key>`                                                                                              |
| `User-Agent`                                         | `claude-cli/2.1.258 (external, sdk-cli)`                                                                        |
| `anthropic-version`                                  | `2023-06-01`                                                                                                    |
| `anthropic-beta`                                     | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                        |
| Preklop beta za prikrivanje razmišljanja na povezavo | Doda `redact-thinking-2026-02-12` za strežnike navzgor, ki izrecno zahtevajo prikrite tokove razmišljanja       |
| Preklop povzetega razmišljanja na povezavo           | Zahtevam CC Compatible za razmišljanje, ki še nimajo nastavljenega načina prikaza, doda `display: "summarized"` |
| `anthropic-dangerous-direct-browser-access`          | `true`                                                                                                          |
| `x-app`                                              | `cli`                                                                                                           |
| `X-Stainless-*`                                      | Različne glave SDK-ja Stainless (jezik, različica paketa, operacijski sistem, arhitektura itd.)                 |

To zahtevam omogoča prehod skozi WAF oziroma seznam dovoljenih odjemalcev strežnika
navzgor.

---

## Odpravljanje težav

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Vaša zahteva se
ni ujemala z omrežno podobo Claude Code. To se zgodi, ko je ponudnik konfiguriran
kot `openai-compatible-chat` namesto `anthropic-compatible-cc` ali ko ob zagonu
ni bila nastavljena zastavica `ENABLE_CC_COMPATIBLE_PROVIDER=true`.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
»Neveljaven žeton«. Omrežna podoba je pravilna, vendar je ključ API zavrnjen.
Ustvarite nov ključ na nadzorni plošči AgentRouter in posodobite povezavo.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Moderacijski mehanizem AgentRouter je zavrnil vsebino zahteve ali pa
paket ključa ne dovoljuje zahtevanega modela. Poskusite z drugačnim pozivom ali
modelom; če je neškodljiv poziv dosledno blokiran, se obrnite na podporo AgentRouter.

**`[400]: content-blocked` samo pri določenih modelih** — Večina paketov AgentRouter
dovoljuje le podmnožico modelov (npr. `claude-opus-4-6`). Drugi ID-ji modelov vrnejo
`unauthorized_client_error`, čeprav je ključ veljaven. Na nadzorni plošči AgentRouter
preverite, katere modele vključuje vaš paket.

**`Invalid JSON response from provider (reset after Ns)` v dnevnikih omniroute** —
Strežnik navzgor je vrnil telo, ki ni v obliki JSON (običajno stran z napako HTML
iz WAF-a). To navadno pomeni, da zahteva nikoli ni dosegla zaledja AgentRouter —
znova preverite, ali se ID ponudnika začne z `anthropic-compatible-cc-` (upoštevajte
končni vezaj — glejte `CLAUDE_CODE_COMPATIBLE_PREFIX` v
`open-sse/services/claudeCodeCompatible.ts`) in ali je funkcijska zastavica
omogočena.

**`unauthorized client detected` / stran z napako HTML, čeprav ponudnik AgentRouter
že obstaja** — verjetno imate **več kot enega** ponudnika AgentRouter in vaša
zahteva dosega napačnega. Če je bil s predpono `agentrouter` ustvarjen preostali
ročno izdelani ponudnik `anthropic-compatible-*` (brez `cc`) ali
`openai-compatible-chat-*`, je lahko lastnik ID-jev modelov `agentrouter/<model>`
(kombinacije pa se lahko nanj sklicujejo z ID-jem vozlišča), zato je promet usmerjen
k temu ponudniku — ki pošilja splošni User-Agent in je zato zavrnjen — namesto k
vgrajenemu ponudniku `agentrouter`, ki že vsebuje pravilno omrežno podobo. V
dnevnikih omniroute preverite, kam se model dejansko razreši (oznaka `ROUTING`
prikazuje `agentrouter/<model> → <providerId>/<model>`); če `<providerId>` ni
`agentrouter`, vse združite pri izvornem ponudniku: kombinacije usmerite na
`agentrouter/<model>` (providerId `agentrouter`) in izbrišite podvojene združljive
ponudnike. Izvorni ponudnik ne potrebuje konfiguracije omrežne podobe niti
`customUserAgent`.

---

## Glejte tudi

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Opombe o integraciji ponudnika Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog ponudnikov z brezplačno ravnjo
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementacija prenosa slik po žici
