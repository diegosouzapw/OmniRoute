# AgentRouter Setup Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) je relej kompatibilan s Anthropicom koji preprodaje
Claude i druge modele, često po nižim cijenama od izravnog Anthropic API-ja. Osmišljen
je kao izravna zamjena za `ANTHROPIC_BASE_URL` za službeni klijent Claude Code,
stoga prihvaća samo promet koji odgovara mrežnom otisku Claude Codea (određeni
User-Agent, zastavice `anthropic-beta`, zaglavlja Stainless SDK-a itd.).

## Brzi početak — upotrijebite izvorni pružatelj `agentrouter` (preporučeno)

Za većinu korisnika **nije potrebno posebno postavljanje**. OmniRoute dolazi s ugrađenim
pružateljem `agentrouter` koji već sadrži potpuni mrežni otisak Claude Codea (pogledajte
`open-sse/config/providerRegistry.ts` → `agentrouter`). Da biste ga upotrijebili:

1. Otvorite **Nadzorna ploča → Pružatelji → Dodaj pružatelja**.
2. Odaberite **AgentRouter** s popisa.
3. Zalijepite svoj API ključ `sk-...` i spremite.

To je sve — nisu potrebne varijable okruženja ni prilagođena vrsta pružatelja. Ugrađeni modeli
uključuju `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` i
`deepseek-v3.2`.

Ostatak ovog vodiča opisuje **napredni postupak**: upotrebu vrste pružatelja
`anthropic-compatible-cc-*`. Upotrijebite je kada trebate veću kontrolu
nad mrežnim otiskom — primjerice pri povezivanju s drugim relejima nalik AgentRouteru
koji još nisu uključeni u izvorni registar pružatelja ili kada želite nadjačati
osnovni URL, putanju za razgovor ili skup zaglavlja.

---

## Napredno: povezivanje putem vrste pružatelja kompatibilne s Claude Codeom

OmniRoute također podržava AgentRouter (i slične releje) putem vrste pružatelja
**kompatibilne s Claude Codeom** (`anthropic-compatible-cc-*`), koja komunicira
putem Anthropic Messages API-ja s ispravnim mrežnim otiskom. Generički pružatelj
`openai-compatible-chat` usmjeren na `https://agentrouter.org`
**neće** raditi — uzvodni WAF odbija zahtjeve koji ne izgledaju kao da dolaze iz
Claude Codea.

---

## Preduvjeti

- AgentRouter račun i API ključ. Novi korisnici dobivaju besplatne kredite putem partnerske
  poveznice u projektu [README](../README.md).
- OmniRoute pokrenut s omogućenom značajkom `ENABLE_CC_COMPATIBLE_PROVIDER`
  (pogledajte u nastavku).

## 1. Omogućite vrstu pružatelja kompatibilnu s CC-om

Vrsta pružatelja kompatibilna s Claude Codeom skrivena je iza zastavice značajke jer
šalje promet koji vrlo vjerno oponaša službeni klijent Claude Code. Omogućite je
postavljanjem varijable okruženja prije pokretanja OmniRoutea:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Primjer za Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Nakon ponovnog pokretanja nadzorna ploča prikazuje opciju **Dodaj pružatelja kompatibilnog s Claude Codeom**
uz postojeće postupke za pružatelje kompatibilne s OpenAI-jem i Anthropicom.

## 2. Izradite pružatelja na nadzornoj ploči

1. Otvorite **Nadzorna ploča → Pružatelji → Dodaj pružatelja**.
2. Odaberite **Dodaj pružatelja kompatibilnog s Claude Codeom** (vidljivo samo kada je prethodno navedena zastavica postavljena).
3. Ispunite polja:

| Polje               | Vrijednost                                                                      |
| ------------------- | ------------------------------------------------------------------------------- |
| Naziv               | `AgentRouter` (ili bilo koja oznaka)                                            |
| Prefiks             | `agentrouter` (prikladan pseudonim prikazan u zapisnicima i na nadzornoj ploči) |
| Osnovni URL         | `https://agentrouter.org`                                                       |
| Putanja za razgovor | `/v1/messages?beta=true` (zadano — ostavite nepromijenjeno)                     |

> Kanonski identifikator modela i dalje upotrebljava puni ID čvora pružatelja
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefiks** je samo prikazni
> pseudonim koji `src/lib/usage/callLogs.ts` razrješava radi čitljivijeg prikaza u zapisnicima.

4. (Neobavezno) Zalijepite svoj API ključ u polje **Provjeri valjanost** i kliknite **Provjeri** kako biste
   potvrdili povezivost prije spremanja.
5. Kliknite **Dodaj**.

Nakon izrade otvorite pružatelja i dodajte **Vezu** sa svojim AgentRouter API
ključem (`sk-...`). Vrijednost `test_status` veze trebala bi se promijeniti u `active`.

## 3. Koristite ga putem kombinacije ili izravno

Referencirajte model koristeći prefiks svojeg pružatelja kao imenski prostor:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Kanonski ID modela `anthropic-compatible-cc-{uuid}/claude-opus-4-6` također funkcionira
i prikazuje se u bazi podataka i konfiguraciji kombinacije.

Možete ga i dodati u kombinaciju radi usmjeravanja, pričuvnog prebacivanja i upravljanja
kvotama kao i bilo kojeg drugog pružatelja.

---

## Pojedinosti mrežnog profila

Za referencu, most kompatibilan s cc-om šalje sljedeće pri svakom uzvodnom
zahtjevu (pogledajte `open-sse/services/claudeCodeCompatible.ts`):

| Zaglavlje                                         | Vrijednost                                                                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                   | `Bearer <api-key>`                                                                                               |
| `User-Agent`                                      | `claude-cli/2.1.258 (external, sdk-cli)`                                                                         |
| `anthropic-version`                               | `2023-06-01`                                                                                                     |
| `anthropic-beta`                                  | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                         |
| Beta prekidač za redigiranje razmišljanja po vezi | Dodaje `redact-thinking-2026-02-12` za uzvodne sustave koji izričito zahtijevaju redigirane tokove razmišljanja  |
| Prekidač za sažeto razmišljanje po vezi           | Dodaje `display: "summarized"` zahtjevima za razmišljanje CC Compatible koji još nemaju postavljen način prikaza |
| `anthropic-dangerous-direct-browser-access`       | `true`                                                                                                           |
| `x-app`                                           | `cli`                                                                                                            |
| `X-Stainless-*`                                   | Razna zaglavlja Stainless SDK-a (jezik, verzija paketa, OS, arhitektura itd.)                                    |

To omogućuje zahtjevima da prođu uzvodni WAF / popis dopuštenih klijenata.

---

## Rješavanje problema

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Vaš zahtjev nije
odgovarao mrežnom profilu Claude Codea. To se događa kada je pružatelj konfiguriran
kao `openai-compatible-chat` umjesto `anthropic-compatible-cc` ili kada zastavica
`ENABLE_CC_COMPATIBLE_PROVIDER=true` nije postavljena pri pokretanju.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Nevažeći token”. Mrežni profil je ispravan, ali API ključ je odbijen. Generirajte
novi ključ na nadzornoj ploči AgentRoutera i ažurirajte vezu.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouterova kontrola moderiranja odbila je sadržaj zahtjeva ili
tarifa ključa ne dopušta traženi model. Pokušajte s drugim upitom ili modelom;
obratite se podršci AgentRoutera ako se bezazleni upiti redovito blokiraju.

**`[400]: content-blocked` samo na određenim modelima** — Većina tarifa AgentRoutera
dopušta samo podskup modela (npr. `claude-opus-4-6`). Drugi ID-ovi modela vraćaju
`unauthorized_client_error` iako je ključ valjan. Na nadzornoj ploči AgentRoutera
provjerite koje modele obuhvaća vaša tarifa.

**`Invalid JSON response from provider (reset after Ns)` u zapisnicima omniroutea** —
Uzvodni sustav vratio je tijelo koje nije u JSON formatu (obično HTML stranicu pogreške
iz WAF-a). To obično znači da zahtjev nikada nije stigao do pozadinskog sustava
AgentRoutera — ponovno provjerite počinje li ID pružatelja s
`anthropic-compatible-cc-` (obratite pozornost na završnu crticu — pogledajte
`CLAUDE_CODE_COMPATIBLE_PREFIX` u `open-sse/services/claudeCodeCompatible.ts`) i je
li zastavica značajke omogućena.

**`unauthorized client detected` / HTML stranica pogreške iako pružatelj AgentRoutera
već postoji** — vjerojatno imate **više od jednog** pružatelja AgentRoutera, a vaš
zahtjev dolazi do pogrešnog. Ako je prethodno ručno izrađen pružatelj
`anthropic-compatible-*` (koji nije `cc`) ili `openai-compatible-chat-*` stvoren
s prefiksom `agentrouter`, može preuzeti ID-ove modela `agentrouter/<model>`
(a kombinacije ga mogu referencirati prema ID-u čvora), pa se promet usmjerava tom
pružatelju — koji šalje generički User-Agent i biva odbijen — umjesto ugrađenom
pružatelju `agentrouter` koji već isporučuje ispravan mrežni profil. U zapisnicima
omniroutea provjerite kamo se model zapravo razrješava (oznaka `ROUTING` prikazuje
`agentrouter/<model> → <providerId>/<model>`); ako `<providerId>` nije
`agentrouter`, objedinite konfiguraciju na izvornom pružatelju: usmjerite kombinacije
na `agentrouter/<model>` (providerId `agentrouter`) i izbrišite duplicirane
kompatibilne pružatelje. Izvorni pružatelj ne zahtijeva konfiguraciju mrežnog profila
ni `customUserAgent`.

---

## Vidi također

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Napomene o integraciji pružatelja Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog pružatelja s besplatnom
  razinom
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementacija slike u žičanom formatu
