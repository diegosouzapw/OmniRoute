# AgentRouter Setup Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) on Anthropicuga ühilduv vahendusteenus, mis müüb edasi
Claude'i ja teiste mudelite kasutust, sageli madalamate hindadega kui Anthropicu otsene API. See on
loodud ametliku Claude Code'i kliendi jaoks ametliku `ANTHROPIC_BASE_URL`-i vahetu
asendusena, mistõttu võtab see vastu ainult Claude Code'i võrgukujule vastavat liiklust (kindel
User-Agent, `anthropic-beta` lipud, Stainless SDK päised jne).

## Kiiralustus — kasutage natiivset `agentrouter` teenusepakkujat (soovitatav)

Enamiku kasutajate jaoks **pole eriseadistust vaja**. OmniRoute sisaldab sisseehitatud
`agentrouter` teenusepakkujat, millesse on juba kaasatud täielik Claude Code'i võrgukuju (vt
`open-sse/config/providerRegistry.ts` → `agentrouter`). Selle kasutamiseks tehke järgmist:

1. Avage **Töölaud → Teenusepakkujad → Lisa teenusepakkuja**.
2. Valige loendist **AgentRouter**.
3. Kleepige oma `sk-...` API-võti ja salvestage.

See on kõik — keskkonnamuutujaid ega kohandatud teenusepakkuja tüüpi pole vaja. Sisseehitatud mudelite
hulka kuuluvad `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` ja
`deepseek-v3.2`.

Selle juhendi ülejäänud osa käsitleb **täpsemat varianti**: teenusepakkuja tüübi
`anthropic-compatible-cc-*` kasutamist. Kasutage seda juhul, kui vajate võrgukuju üle suuremat kontrolli
— näiteks ühenduse loomisel teiste AgentRouteri-laadsete vahendusteenustega,
mida natiivses teenusepakkujate registris veel pole, või baas-URL-i, vestlustee või päiste
komplekti alistamisel.

---

## Täpsem: ühenduse loomine Claude Code'iga ühilduva teenusepakkuja tüübi kaudu

OmniRoute toetab AgentRouterit (ja sarnaseid vahendusteenuseid) ka **Claude Code'iga
ühilduva** teenusepakkuja tüübi (`anthropic-compatible-cc-*`) kaudu, mis kasutab
õige võrgukujuga Anthropic Messages API-t. Üldine
`openai-compatible-chat` teenusepakkuja, mis osutab aadressile `https://agentrouter.org`,
**ei** tööta — ülesvoolu WAF lükkab tagasi päringud, mis ei näe välja nagu Claude
Code'i omad.

---

## Eeltingimused

- AgentRouteri konto ja API-võti. Uued registreerujad saavad tasuta krediiti projekti
  [README](../README.md)-s oleva partnerlingi kaudu.
- OmniRoute peab töötama nii, et funktsioonilipp `ENABLE_CC_COMPATIBLE_PROVIDER` oleks lubatud
  (vt allpool).

## 1. Lubage CC-ga ühilduva teenusepakkuja tüüp

Claude Code'iga ühilduv teenusepakkuja tüüp on funktsioonilipu taga, kuna see
saadab liiklust, mis jäljendab täpselt ametlikku Claude Code'i klienti. Selle lubamiseks
määrake enne OmniRoute'i käivitamist keskkonnamuutuja:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Dockeri näide:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Pärast taaskäivitamist kuvatakse töölaual lisaks olemasolevatele OpenAI-ga ühilduvatele ja Anthropicuga ühilduvatele voogudele valik **Lisa Claude Code'iga ühilduv teenusepakkuja**.

## 2. Looge teenusepakkuja töölaual

1. Avage **Töölaud → Teenusepakkujad → Lisa teenusepakkuja**.
2. Valige **Lisa Claude Code'iga ühilduv teenusepakkuja** (nähtav ainult siis, kui ülaltoodud lipp on määratud).
3. Täitke väljad:

| Väli       | Väärtus                                                      |
| ---------- | ------------------------------------------------------------ |
| Nimi       | `AgentRouter` (või mis tahes silt)                           |
| Prefiks    | `agentrouter` (logides ja töölaual kuvatav mugav pseudonüüm) |
| Baas-URL   | `https://agentrouter.org`                                    |
| Vestlustee | `/v1/messages?beta=true` (vaikeväärtus — jätke muutmata)     |

> Kanooniline mudeliidentifikaator kasutab endiselt teenusepakkuja sõlme täielikku ID-d
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefiks** on lihtsalt kuvatav
> pseudonüüm, mille `src/lib/usage/callLogs.ts` lahendab logiväljundi loetavamaks muutmiseks.

4. (Valikuline) Kleepige oma API-võti väljale **Valideeri** ja klõpsake enne salvestamist ühenduvuse
   kinnitamiseks nuppu **Kontrolli**.
5. Klõpsake **Lisa**.

Pärast loomist avage teenusepakkuja ja lisage oma AgentRouteri API-võtmega
(`sk-...`) **Ühendus**. Ühenduse `test_status` peaks muutuma väärtuseks `active`.

## 3. Kasutage seda kombinatsiooni kaudu või otse

Viidake mudelile, kasutades nimeruumina oma teenusepakkuja prefiksit:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Kanooniline mudeli ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` töötab samuti
ning just seda kuvatakse andmebaasis ja kombinatsiooni konfiguratsioonis.

Samuti võite selle lisada kombinatsiooni, et kasutada marsruutimist, varuvarianti ja
kvoodihaldust nagu iga teise teenusepakkuja puhul.

---

## Võrgupäringu signatuuri üksikasjad

Teadmiseks: cc-ühilduv sild saadab iga ülesvoolupäringuga järgmise teabe
(vt `open-sse/services/claudeCodeCompatible.ts`):

| Päis                                           | Väärtus                                                                                                     |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Authorization`                                | `Bearer <api-key>`                                                                                          |
| `User-Agent`                                   | `claude-cli/2.1.258 (external, sdk-cli)`                                                                    |
| `anthropic-version`                            | `2023-06-01`                                                                                                |
| `anthropic-beta`                               | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                    |
| Ühendusepõhine varjatud mõttekäigu beetalüliti | Lisab `redact-thinking-2026-02-12` ülesvooluteenustele, mis nõuavad spetsiaalselt varjatud mõttekäigu vooge |
| Ühendusepõhine kokkuvõtliku mõttekäigu lüliti  | Lisab CC Compatible'i mõttekäigupäringutele, kus kuvarežiimi pole veel määratud, `display: "summarized"`    |
| `anthropic-dangerous-direct-browser-access`    | `true`                                                                                                      |
| `x-app`                                        | `cli`                                                                                                       |
| `X-Stainless-*`                                | Mitmesugused Stainless SDK päised (keel, paketiversioon, operatsioonisüsteem, arhitektuur jne)              |

See võimaldab päringutel läbida ülesvooluteenuse WAF-i / kliendi lubatute loendit.

---

## Tõrkeotsing

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Teie päring ei
vastanud Claude Code'i võrgupäringu signatuurile. See juhtub, kui teenusepakkuja on
konfigureeritud kui `openai-compatible-chat`, mitte `anthropic-compatible-cc`, või
kui käivitamisel ei määratud lippu `ENABLE_CC_COMPATIBLE_PROVIDER=true`.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Kehtetu luba“. Võrgupäringu signatuur on õige, kuid API-võti lükatakse tagasi.
Looge AgentRouteri juhtpaneelil uus võti ja värskendage ühendust.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouteri modereerimiskonks lükkas päringu sisu tagasi või võtme
pakett ei võimalda soovitud mudelit kasutada. Proovige teistsugust viipa või mudelit;
kui ohutu viip blokeeritakse järjepidevalt, võtke ühendust AgentRouteri toega.

**`[400]: content-blocked` ainult kindlate mudelite puhul** — Enamik AgentRouteri
pakette lubab kasutada ainult teatud mudelite alamhulka (nt `claude-opus-4-6`).
Teised mudeli ID-d tagastavad `unauthorized_client_error` isegi siis, kui võti
kehtib. Kontrollige AgentRouteri juhtpaneelilt, milliseid mudeleid teie pakett hõlmab.

**`Invalid JSON response from provider (reset after Ns)` omniroute'i logides** —
Ülesvooluteenus tagastas mitte-JSON-vormingus keha (tavaliselt WAF-i HTML-tõrkelehe).
See tähendab enamasti, et päring ei jõudnudki AgentRouteri tagasüsteemi — kontrollige
uuesti, et teenusepakkuja ID algaks prefiksiga `anthropic-compatible-cc-` (pange
tähele lõpus olevat sidekriipsu — vt `CLAUDE_CODE_COMPATIBLE_PREFIX` failis
`open-sse/services/claudeCodeCompatible.ts`) ja funktsioonilipp oleks lubatud.

**`unauthorized client detected` / HTML-tõrkeleht, kuigi AgentRouteri
teenusepakkuja on juba olemas** — tõenäoliselt on teil **rohkem kui üks**
AgentRouteri teenusepakkuja ja päring jõuab valeni. Kui prefiksiga `agentrouter`
loodi mõni allesjäänud käsitsi tehtud `anthropic-compatible-*` (mitte-`cc`) või
`openai-compatible-chat-*` teenusepakkuja, võib see saada mudeli ID-de
`agentrouter/<model>` omanikuks (ja kombinatsioonid võivad sellele viidata sõlme ID
kaudu), mistõttu suunatakse liiklus sellele teenusepakkujale — mis saadab üldise
User-Agent'i ja lükatakse tagasi —, mitte sisseehitatud `agentrouter`
teenusepakkujale, millega on õige võrgupäringu signatuur juba kaasas. Kontrollige
omniroute'i logidest, kuhu mudel tegelikult lahendatakse (silt `ROUTING` näitab
`agentrouter/<model> → <providerId>/<model>`); kui `<providerId>` ei ole
`agentrouter`, koondage kasutus algupärase teenusepakkuja alla: suunake
kombinatsioonid mudelile `agentrouter/<model>` (providerId `agentrouter`) ja
kustutage dubleerivad ühilduvad teenusepakkujad. Algupärane teenusepakkuja ei vaja
võrgupäringu signatuuri konfiguratsiooni ega sätet `customUserAgent`.

---

## Vaata ka

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Webi teenusepakkuja integratsiooni märkmed
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — tasuta paketi teenusepakkujate
  kataloog
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — pildi edastamise teostus
