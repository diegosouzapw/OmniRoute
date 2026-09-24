# OmniRoute Tiers — User Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇧🇦 [bs](../../../bs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute rozděluje 352 podporovaných poskytovatelů do 3 cenových úrovní. Každý
požadavek jimi prochází v daném pořadí, dokud některý z nich úspěšně neodpoví —
získáte nejlevnější použitelnou odpověď, aniž byste museli psát záložní kód.

## Úroveň 1 — Předplatné

**Poskytovatelé, za které již platíte.** OmniRoute využije veškerou kvótu dříve,
než vyprší.

| Poskytovatel                      | Proč úroveň 1                                        |
| --------------------------------- | ---------------------------------------------------- |
| Claude Code OAuth                 | Anthropic Pro/Team — paušální sazba, často nevyužitá |
| OpenAI Codex (předplatné ChatGPT) | Plus/Team zahrnuje kvótu Codex                       |
| GitHub Copilot                    | Za uživatele — kvóta se obnovuje měsíčně             |
| Cursor IDE                        | Kvóta tarifu Pro                                     |
| Antigravity / Devin Desktop       | Integrované kvóty                                    |

**Strategie**: každý požadavek, který odpovídá silným stránkám modelu, směrujte
nejprve sem. Sledování kvót monitoruje blížící se obnovení a kombinovaná strategie
`reset-aware` podle toho stanovuje priority. Chcete-li nejprve směrovat na úroveň 1
a přejít na placené úrovně pouze po vyčerpání kvóty, použijte ID `auto/thrifty` —
nebo `auto/subscription`, pokud chcete zůstat u kapacity zahrnuté v tarifu
a při jejím nedostatku požadavek ukončit chybou. Viz
[Směrování upřednostňující předplatné](../routing/SUBSCRIPTION_LADDER.md).

## Úroveň 2 — Levná

**Poskytovatelé účtující za token méně než $1/1M tokenů.** Vyhrazeno pro úlohy
s vysokým objemem nebo pro případy, kdy kvóty úrovně 1 dosáhnou limitu.

| Poskytovatel                   | Cena (vstup/výstup) | Silné stránky                |
| ------------------------------ | ------------------- | ---------------------------- |
| DeepSeek V4 Pro                | $0.27 / $1.10 za 1M | Kód, uvažování               |
| GLM-4.5                        | $0.60 / $2.20 za 1M | Dlouhý kontext               |
| MiniMax M1                     | $0.20 / $1.10 za 1M | Rychlost                     |
| Qwen Coder                     | $0.30 / $1.20 za 1M | Kód                          |
| OpenRouter (optimalizace ceny) | různé               | 100+ modelů, dynamický výběr |

**Strategie**: kombinace `cost-optimized` vybere model s nejnižší cenou za token,
který splňuje filtr schopností dané úlohy (zpracování obrazu, režim JSON,
nástroje, maximální kontext).

## Úroveň 3 — Zdarma

**Bezplatní poskytovatelé** — bezplatné tarify, kreditní programy, denní kvóty OAuth.

| Poskytovatel     | Bezplatná kvóta / kredity                       |
| ---------------- | ----------------------------------------------- |
| Kiro AI          | Bezplatná úroveň Claude (štědré férové využití) |
| OpenCode Free    | Bez ověření, štědré limity požadavků            |
| Qoder            | Bezplatné OAuth                                 |
| Google Vertex AI | Kredity $300 pro nové účty                      |
| Amazon Q         | Bezplatná úroveň pro uživatele AWS              |
| Pollinations     | Otevřené veřejné API                            |
| Cloudflare AI    | Bezplatná úroveň Workers AI                     |

**Strategie**: kombinace `auto` s rozpočtovým limitem sem směruje požadavky,
když úrovně 1 a 2 selžou nebo když je nastaveno `useFreeOnly=true`. Bezplatní
poskytovatelé mají často přísnější limity požadavků — mechanismus circuit breaker
je po prodlevě znovu zpřístupní.

## Konfigurace úrovní

Ovládací panel → **Úrovně** → přiřaďte své poskytovatele. Výchozí nastavení
(z `tierDefaults.json`) jsou rozumná; upravte je, pokud chcete upřednostnit
konkrétní předplatná nebo některé poskytovatele vyloučit.

Šestnáctifaktorové hodnocení Auto-Combo zohledňuje také úroveň. Viz
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetrie

Ovládací panel → **Využití** zobrazuje počet tokenů spotřebovaných v jednotlivých
úrovních za den. Použijte jej k následujícím účelům:

- Ověřte, že je úroveň 1 plně využívána (jinak plýtváte hodnotou předplatného)
- Zjistěte, které modely úrovně 2 jsou vybírány nejčastěji (omezte je na 1–2)
- Ověřte, že úroveň 3 šetří peníze u testovacích a průzkumných úloh

## Běžné vzory

### Zcela bezplatná pracovní zátěž

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Silně upřednostňuje úroveň 3; úroveň 2 použije pouze v případě, že úroveň 3 není dostupná.

### Předplatné jako první volba s levnou zálohou

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

Explicitní uspořádaný seznam odpovídající pořadí úroveň 1 → úroveň 2 → úroveň 3.
