# AgentRouter Setup Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) este un serviciu de retransmitere compatibil cu Anthropic, care revinde
accesul la Claude și la alte modele, adesea la prețuri mai mici decât API-ul Anthropic direct. Acesta este
conceput ca un înlocuitor direct prin `ANTHROPIC_BASE_URL` pentru clientul oficial Claude Code,
deci acceptă numai trafic care corespunde amprentei de protocol Claude Code (un User-Agent specific,
marcaje `anthropic-beta`, anteturi Stainless SDK etc.).

## Pornire rapidă — utilizați furnizorul nativ `agentrouter` (recomandat)

Pentru majoritatea utilizatorilor, **nu este necesară nicio configurare specială**. OmniRoute include un furnizor
`agentrouter` integrat, care are deja încorporată amprenta de protocol Claude Code completă (consultați
`open-sse/config/providerRegistry.ts` → `agentrouter`). Pentru a-l utiliza:

1. Deschideți **Panou de control → Furnizori → Adăugare furnizor**.
2. Selectați **AgentRouter** din listă.
3. Introduceți cheia API `sk-...` și salvați.

Asta este tot — fără variabile de mediu, fără un tip de furnizor personalizat. Modelele integrate
includ `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` și
`deepseek-v3.2`.

Restul acestui ghid prezintă **metoda avansată**: utilizarea tipului de furnizor
`anthropic-compatible-cc-*`. Folosiți-o atunci când aveți nevoie de mai mult control
asupra amprentei de protocol — de exemplu, când vă conectați la alte servicii de retransmitere de tip AgentRouter
care nu se află încă în registrul nativ de furnizori sau când suprascrieți
URL-ul de bază, calea de chat ori setul de anteturi.

---

## Avansat: conectarea prin tipul de furnizor compatibil cu Claude Code

OmniRoute acceptă, de asemenea, AgentRouter (și servicii de retransmitere similare) prin tipul de furnizor
**compatibil cu Claude Code** (`anthropic-compatible-cc-*`), care comunică folosind
API-ul Anthropic Messages cu amprenta de protocol corectă. Un furnizor generic
`openai-compatible-chat` care indică spre `https://agentrouter.org`
**nu** va funcționa — WAF-ul din amonte respinge solicitările care nu arată ca fiind trimise de Claude
Code.

---

## Cerințe preliminare

- Un cont AgentRouter și o cheie API. Utilizatorii nou-înregistrați primesc credite gratuite prin linkul afiliat
  din fișierul [README](../README.md) al proiectului.
- OmniRoute trebuie să ruleze cu indicatorul de funcționalitate `ENABLE_CC_COMPATIBLE_PROVIDER` activat
  (consultați secțiunea de mai jos).

## 1. Activați tipul de furnizor compatibil cu CC

Tipul de furnizor compatibil cu Claude Code este protejat de un indicator de funcționalitate, deoarece
trimite trafic care reproduce îndeaproape clientul oficial Claude Code. Activați-l
setând o variabilă de mediu înainte de a porni OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Exemplu Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

După repornire, panoul de control afișează opțiunea **Adăugare furnizor compatibil cu Claude Code**, pe lângă
fluxurile existente compatibile cu OpenAI și Anthropic.

## 2. Creați furnizorul în panoul de control

1. Deschideți **Panou de control → Furnizori → Adăugare furnizor**.
2. Alegeți **Adăugare furnizor compatibil cu Claude Code** (vizibilă numai când indicatorul de mai sus este setat).
3. Completați câmpurile:

| Câmp         | Valoare                                                                  |
| ------------ | ------------------------------------------------------------------------ |
| Nume         | `AgentRouter` (sau orice altă etichetă)                                  |
| Prefix       | `agentrouter` (alias intuitiv afișat în jurnale și în panoul de control) |
| URL de bază  | `https://agentrouter.org`                                                |
| Cale de chat | `/v1/messages?beta=true` (implicită — lăsați-o neschimbată)              |

> Identificatorul canonic al modelului utilizează în continuare ID-ul complet al nodului furnizorului
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefixul** este doar un alias de afișare
> rezolvat de `src/lib/usage/callLogs.ts` pentru rezultate mai ușor de citit în jurnale.

4. (Opțional) Introduceți cheia API în câmpul **Validare** și faceți clic pe **Verificare** pentru a
   confirma conectivitatea înainte de salvare.
5. Faceți clic pe **Adăugare**.

După creare, deschideți furnizorul și adăugați o **Conexiune** cu cheia API AgentRouter
(`sk-...`). Valoarea `test_status` a conexiunii ar trebui să devină `active`.

## 3. Utilizați-l printr-un combo sau direct

Referiți modelul folosind prefixul furnizorului drept spațiu de nume:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

ID-ul canonic al modelului `anthropic-compatible-cc-{uuid}/claude-opus-4-6` funcționează, de asemenea,
și este cel care apare în baza de date și în configurația combo-ului.

Alternativ, adăugați-l într-un combo pentru rutare, fallback și gestionarea cotelor, la fel ca orice alt
furnizor.

---

## Detalii despre imaginea wire

Pentru referință, puntea compatibilă cu cc trimite următoarele la fiecare solicitare
upstream (consultați `open-sse/services/claudeCodeCompatible.ts`):

| Antet                                        | Valoare                                                                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                              | `Bearer <api-key>`                                                                                                            |
| `User-Agent`                                 | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                      |
| `anthropic-version`                          | `2023-06-01`                                                                                                                  |
| `anthropic-beta`                             | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                      |
| Comutator beta redact-thinking per conexiune | Adaugă `redact-thinking-2026-02-12` pentru serviciile upstream care necesită în mod explicit fluxuri de raționament redactate |
| Comutator summarized thinking per conexiune  | Adaugă `display: "summarized"` la solicitările de raționament CC Compatible care nu au setat deja un mod de afișare           |
| `anthropic-dangerous-direct-browser-access`  | `true`                                                                                                                        |
| `x-app`                                      | `cli`                                                                                                                         |
| `X-Stainless-*`                              | Diverse antete SDK Stainless (limbaj, versiunea pachetului, SO, arhitectură etc.)                                             |

Acest lucru permite solicitărilor să treacă de WAF-ul upstream/lista de clienți permiși.

---

## Depanare

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Solicitarea dvs. nu
corespunde imaginii wire Claude Code. Acest lucru se întâmplă când furnizorul este configurat
drept `openai-compatible-chat` în loc de `anthropic-compatible-cc` sau când
indicatorul `ENABLE_CC_COMPATIBLE_PROVIDER=true` nu a fost setat la pornire.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Token nevalid”. Imaginea wire este corectă, dar cheia API este respinsă. Generați o
cheie nouă în tabloul de bord AgentRouter și actualizați conexiunea.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Hook-ul de moderare AgentRouter a respins conținutul solicitării sau
planul cheii nu permite modelul solicitat. Încercați un alt prompt sau model;
contactați serviciul de asistență AgentRouter dacă un prompt inofensiv este blocat în mod repetat.

**`[400]: content-blocked` numai pentru anumite modele** — Majoritatea planurilor AgentRouter permit
doar un subset de modele (de exemplu, `claude-opus-4-6`). Alte ID-uri de model returnează
`unauthorized_client_error`, chiar dacă cheia este validă. Verificați în tabloul de bord AgentRouter
ce modele sunt incluse în planul dvs.

**`Invalid JSON response from provider (reset after Ns)` în jurnalele omniroute** —
Serviciul upstream a returnat un corp non-JSON (de obicei, o pagină de eroare HTML de la WAF).
Aceasta înseamnă, de regulă, că solicitarea nu a ajuns niciodată la backend-ul AgentRouter — verificați din nou dacă
ID-ul furnizorului începe cu `anthropic-compatible-cc-` (observați cratima de la sfârșit —
consultați `CLAUDE_CODE_COMPATIBLE_PREFIX` în `open-sse/services/claudeCodeCompatible.ts`)
și dacă indicatorul funcționalității este activat.

**`unauthorized client detected` / pagină de eroare HTML, chiar dacă există deja un furnizor
AgentRouter** — probabil aveți **mai mult de un** furnizor AgentRouter,
iar solicitarea ajunge la cel greșit. Dacă a fost creat anterior manual un furnizor
`anthropic-compatible-*` (fără `cc`) sau `openai-compatible-chat-*` cu
prefixul `agentrouter`, acesta poate deține ID-urile de model `agentrouter/<model>`
(iar combo-urile îl pot referi prin ID-ul nodului), astfel încât traficul este rutat către acel furnizor —
care trimite un User-Agent generic și este respins — în locul furnizorului
`agentrouter` încorporat, care include deja imaginea wire corectă. Verificați către ce
se rezolvă efectiv modelul în jurnalele omniroute (eticheta `ROUTING` afișează
`agentrouter/<model> → <providerId>/<model>`); dacă `<providerId>` nu este
`agentrouter`, consolidați configurația în jurul furnizorului nativ: direcționați combo-urile către
`agentrouter/<model>` (providerId `agentrouter`) și ștergeți furnizorii compatibili
duplicați. Furnizorul nativ nu necesită configurarea imaginii wire și nici
`customUserAgent`.

---

## Consultați și

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Note despre integrarea furnizorului Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Catalogul furnizorilor cu nivel
  gratuit
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementarea transmiterii imaginilor
