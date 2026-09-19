# AGENTROUTER (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

# Vodič za postavljanje AgentRouter-a

[AgentRouter](https://agentrouter.org) je Anthropic-kompatibilni relay koji preprodaje
Claude i druge modele, često po nižim cijenama nego direktni Anthropic API. Dizajniran
je kao `ANTHROPIC_BASE_URL` zamjena koja se može odmah koristiti za službeni Claude Code
klijent, tako da prihvata samo saobraćaj koji odgovara Claude Code protokolu (specifičan
User-Agent, `anthropic-beta` zastavice, Stainless SDK zaglavlja, itd.).

## Brzi početak — koristite nativni `agentrouter` provider (preporučeno)

Za većinu korisnika, **nije potrebno nikakvo posebno postavljanje**. OmniRoute dolazi sa
ugrađenim `agentrouter` providerom koji već sadrži kompletan Claude Code protokol
(vidi `open-sse/config/providerRegistry.ts` → `agentrouter`). Da biste ga koristili:

1. Otvorite **Dashboard → Providers → Add Provider**.
2. Odaberite **AgentRouter** sa liste.
3. Zalijepite svoj `sk-...` API ključ i sačuvajte.

To je to — bez varijabli okruženja, bez prilagođenog tipa providera. Ugrađeni modeli
uključuju `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` i
`deepseek-v3.2`.

Ostatak ovog vodiča pokriva **napredni put**: korištenje
`anthropic-compatible-cc-*` tipa providera. Koristite to kada vam je potrebna veća kontrola
nad protokolom — na primjer, kada se povezujete na druge AgentRouter-stil relaye
koji još nisu u nativnom registru providera, ili kada želite pregaziti (override)
base URL, chat putanju ili set zaglavlja.

---

## Napredno: povezivanje putem Claude Code kompatibilnog tipa providera

OmniRoute također podržava AgentRouter (i slične relaye) putem **Claude Code
kompatibilnog** tipa providera (`anthropic-compatible-cc-*`), koji komunicira
preko Anthropic Messages API-ja sa ispravnim protokolom. Generički
`openai-compatible-chat` provider koji pokazuje na `https://agentrouter.org`
**neće** raditi — upstream WAF odbija zahtjeve koji ne izgledaju kao Claude
Code.

---

## Preduslovi

- AgentRouter nalog i API ključ. Novi korisnici dobijaju besplatne kredite putem affiliate
  linka u projektu [README](../README.md).
- OmniRoute pokrenut sa omogućenom `ENABLE_CC_COMPATIBLE_PROVIDER` feature zastavicom
  (vidi ispod).

## 1. Omogućite CC-kompatibilni tip providera

Claude Code kompatibilni tip providera je ograničen feature zastavicom jer
šalje saobraćaj koji vrlo vjerno oponaša službeni Claude Code klijent. Omogućite ga
postavljanjem varijable okruženja prije pokretanja OmniRoute-a:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker primjer:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Nakon ponovnog pokretanja, dashboard će prikazati opciju **Add Claude Code Compatible**
pored postojećih OpenAI-kompatibilnih i Anthropic-kompatibilnih tokova.

## 2. Kreirajte provider u dashboardu

1. Otvorite **Dashboard → Providers → Add Provider**.
2. Odaberite **Add Claude Code Compatible** (vidljivo samo kada je gore navedena zastavica postavljena).
3. Popunite polja:

| Polje     | Vrijednost                                                          |
| --------- | ------------------------------------------------------------------- |
| Name      | `AgentRouter` (ili bilo koja oznaka)                                |
| Prefix    | `agentrouter` (prijateljski alias prikazan u logovima i dashboardu) |
| Base URL  | `https://agentrouter.org`                                           |
| Chat path | `/v1/messages?beta=true` (podrazumijevano — ostavite kako jeste)    |

> Kanonički identifikator modela i dalje koristi puni provider node ID
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefix** je samo prikazani
> alias koji `src/lib/usage/callLogs.ts` koristi za preglednije logove.

4. (Opcionalno) Zalijepite svoj API ključ u polje **Validate** i kliknite **Check** da
   potvrdite povezanost prije spremanja.
5. Kliknite **Add**.

Nakon kreiranja, otvorite provider i dodajte **Connection** sa vašim AgentRouter API
ključem (`sk-...`). `test_status` veze bi trebao postati `active`.

## 3. Koristite ga putem combo-a ili direktno

Referencirajte model koristeći prefiks vašeg providera kao namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Kanonični model ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` također radi
i to je ono što se pojavljuje u bazi podataka i combo konfiguraciji.

Ili ga dodajte u combo za rutiranje, fallback i upravljanje kvotama kao i bilo koji drugi
provider.

---

## Detalji wire slike

Za referencu, cc-kompatibilni most šalje sljedeće na svaki upstream
zahtjev (vidi `open-sse/services/claudeCodeCompatible.ts`):

| Header                                      | Value                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                          |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                                    |
| `anthropic-version`                         | `2023-06-01`                                                                                                |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                    |
| Per-connection redact-thinking beta toggle  | Dodaje `redact-thinking-2026-02-12` za upstreame koji specifično zahtijevaju redactovane thinking streamove |
| Per-connection summarized thinking toggle   | Dodaje `display: "summarized"` u CC Compatible thinking zahtjeve koji već nisu postavili display mode       |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                      |
| `x-app`                                     | `cli`                                                                                                       |
| `X-Stainless-*`                             | Različiti Stainless SDK zaglavlja (lang, package version, OS, arch, itd.)                                   |

Ovo omogućava zahtjevima da prođu upstream WAF / klijent whitelist.

---

## Rješavanje problema

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Vaš zahtjev nije
odgovarao Claude Code wire slici. Ovo se događa kada je provider konfigurisan
kao `openai-compatible-chat` umjesto `anthropic-compatible-cc`, ili kada
`ENABLE_CC_COMPATIBLE_PROVIDER=true` flag nije postavljen prilikom pokretanja.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Invalid token". Wire slika je ispravna, ali je API ključ odbijen. Generišite
novi ključ u AgentRouter dashboardu i ažurirajte konekciju.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter moderation hook je odbio sadržaj zahtjeva, ili
plan ključa ne dozvoljava traženi model. Pokušajte drugačiji prompt ili model;
kontaktirajte AgentRouter podršku ako je benigni prompt dosljedno blokiran.

**`[400]: content-blocked` samo na specifičnim modelima** — Većina AgentRouter planova samo
dozvoljava podskup modela (npr. `claude-opus-4-6`). Ostali model ID-ovi vraćaju
`unauthorized_client_error` iako je ključ validan. Provjerite koje modele vaš plan pokriva u AgentRouter dashboardu.

**`Invalid JSON response from provider (reset after Ns)` iz omniroute logova** —
Upstream je vratio ne-JSON body (tipično HTML error stranicu od WAF-a).
Ovo obično znači da zahtjev nikada nije stigao do AgentRouter backend-a — ponovo provjerite da li provider ID počinje sa `anthropic-compatible-cc-` (primijetite završnu crticu —
vidi `CLAUDE_CODE_COMPATIBLE_PREFIX` u `open-sse/services/claudeCodeCompatible.ts`)
i da je feature flag omogućen.

**`unauthorized client detected` / HTML error page iako AgentRouter
provider već postoji** — vjerovatno imate **više od jednog** AgentRouter providera
i vaš zahtjev udara u pogrešan. Ako je ostao ručno napravljeni
`anthropic-compatible-*` (ne-`cc`) ili `openai-compatible-chat-*` provider kreiran sa
`agentrouter` prefiksom, on može posjedovati `agentrouter/<model>` model
ID-ove (a combo-i ga mogu referencirati preko node ID-a), pa saobraćaj ide na taj provider —
koji šalje generički User-Agent i biva odbijen — umjesto na ugrađeni
`agentrouter` provider koji već isporučuje ispravnu wire sliku. Provjerite gdje se
model zapravo razlučuje u omniroute logovima (`ROUTING` tag pokazuje
`agentrouter/<model> → <providerId>/<model>`); ako `<providerId>` nije
`agentrouter`, konsolidujte na nativni provider: usmjerite combo-e na
`agentrouter/<model>` (providerId `agentrouter`) i obrišite duplikate
kompatibilnih providera. Nativni provider ne zahtijeva wire-image konfiguraciju niti
`customUserAgent`.

---

## Vidi također

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Bilješke o integraciji Claude Web provajdera
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog provajdera besplatnog
  nivoa
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementacija wire image-a
