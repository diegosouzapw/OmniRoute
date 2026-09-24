# OmniRoute Tiers — User Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇧🇦 [bs](../../../bs/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

Inaayos ng OmniRoute ang 352 sinusuportahang provider sa 3 pang-ekonomiyang antas. Bawat
request ay dumadaan sa mga ito nang sunod-sunod hanggang may matagumpay na tumugon — makukuha
mo ang pinakamurang praktikal na tugon nang hindi kailanman nagsusulat ng fallback code.

## Antas 1 — Subscription

**Mga provider na binabayaran mo na.** Ginagamit ng OmniRoute ang bawat natitirang bahagi ng quota bago
ito mag-expire.

| Provider                            | Bakit Antas 1                                                   |
| ----------------------------------- | --------------------------------------------------------------- |
| Claude Code OAuth                   | Anthropic Pro/Team — nakapirming bayad, madalas hindi nagagamit |
| OpenAI Codex (ChatGPT subscription) | May kasamang Codex quota ang Plus/Team                          |
| GitHub Copilot                      | Bawat user — buwanang nagre-reset ang quota                     |
| Cursor IDE                          | Quota ng Pro plan                                               |
| Antigravity / Devin Desktop         | Mga built-in na quota                                           |

**Diskarte**: dito muna i-route ang bawat request na angkop sa mga
kalakasan ng model. Sinusubaybayan ng quota tracker ang papalapit na mga reset, at naaayon itong
inuuna ng combo strategy na `reset-aware`. Upang unang i-route sa Antas 1 at lumipat lamang
sa mga bayad na antas kapag naubos na ang quota, gamitin ang `auto/thrifty` id — o `auto/subscription`
upang manatili sa kapasidad na kasama sa plan at tumigil sa halip kapag hindi ito magagamit. Tingnan ang
[Pag-route na inuuna ang subscription](../routing/SUBSCRIPTION_LADDER.md).

## Antas 2 — Mura

**Mga pay-per-token provider na mas mababa sa $1/1M token.** Inilalaan para sa gawaing may malaking volume
o kapag naabot na ng mga quota sa Antas 1 ang kanilang limitasyon.

| Provider                     | Presyo (input/output)  | Mga kalakasan        |
| ---------------------------- | ---------------------- | -------------------- |
| DeepSeek V4 Pro              | $0.27 / $1.10 bawat 1M | Code, pangangatwiran |
| GLM-4.5                      | $0.60 / $2.20 bawat 1M | Mahabang context     |
| MiniMax M1                   | $0.20 / $1.10 bawat 1M | Bilis                |
| Qwen Coder                   | $0.30 / $1.20 bawat 1M | Code                 |
| OpenRouter (price-optimized) | nag-iiba               | 100+ model, dynamic  |

**Diskarte**: pinipili ng combo na `cost-optimized` ang model na may pinakamababang $/token na nakatutugon
sa capability filter ng gawain (vision, JSON mode, mga tool, max-context).

## Antas 3 — Libre

**Mga provider na walang bayad** — mga libreng tier, credit program, at pang-araw-araw na OAuth quota.

| Provider         | Libreng quota / mga credit                |
| ---------------- | ----------------------------------------- |
| Kiro AI          | Libreng Claude tier (maluwag na fair-use) |
| OpenCode Free    | Walang auth, maluluwag na rate limit      |
| Qoder            | Libreng OAuth                             |
| Google Vertex AI | $300 na credit para sa bagong account     |
| Amazon Q         | Libreng tier para sa mga user ng AWS      |
| Pollinations     | Bukas na pampublikong API                 |
| Cloudflare AI    | Libreng tier ng Workers AI                |

**Diskarte**: dito nagru-route ang combo na `auto` na may budget cap kapag nabigo ang Antas 1+2
o kapag nakatakda ang `useFreeOnly=true`. Kadalasang may mas mahihinang
rate limit ang mga libreng provider — ibinabalik sila ng circuit breaker pagkatapos ng backoff.

## Pag-configure ng mga antas

Dashboard → **Mga Antas** → italaga ang iyong mga provider. Makatuwiran ang mga default (mula sa `tierDefaults.json`);
i-edit ang mga ito kapag mayroon kang partikular na mga subscription na dapat unahin o mga provider na dapat ibukod.

Isinasaalang-alang din ng 16-factor scoring ng Auto-Combo ang antas. Tingnan ang
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetry

Ipinapakita ng Dashboard → **Paggamit** ang mga token na nagamit sa bawat antas bawat araw. Gamitin ito upang:

- Kumpirmahing lubos na nagagamit ang Antas 1 (kung hindi, nasasayang ang halaga ng subscription mo)
- Tukuyin kung aling mga model sa Antas 2 ang pinakamadalas piliin (pagsama-samahin sa 1-2)
- Tiyaking nakakatipid ang Antas 3 sa mga workload para sa pagsubok/pag-eeksplora

## Mga karaniwang pattern

### Ganap na libreng workload

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Mariing nagtutulak patungo sa Antas 3; ginagamit lamang ang Antas 2 kung hindi available ang Antas 3.

### Inuuna ang subscription na may murang fallback

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

Tahasang nakaayos na listahang tumutugma sa Antas 1 → Antas 2 → Antas 3.
