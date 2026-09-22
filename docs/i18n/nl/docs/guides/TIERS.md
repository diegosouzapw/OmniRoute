# OmniRoute Tiers — User Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute verdeelt de 352 ondersteunde providers over 3 economische niveaus. Elke
aanvraag doorloopt deze op volgorde totdat een provider succesvol antwoordt — zo
krijgt u het goedkoopste bruikbare antwoord zonder ooit fallbackcode te schrijven.

## Niveau 1 — Abonnement

**Providers waarvoor u al betaalt.** OmniRoute benut elk restje quotum voordat
het verloopt.

| Provider                          | Waarom niveau 1                                   |
| --------------------------------- | ------------------------------------------------- |
| Claude Code OAuth                 | Anthropic Pro/Team — vast tarief, vaak onbenut    |
| OpenAI Codex (ChatGPT-abonnement) | Plus/Team bevat Codex-quotum                      |
| GitHub Copilot                    | Per gebruiker — quotum wordt maandelijks hersteld |
| Cursor IDE                        | Quotum van het Pro-abonnement                     |
| Antigravity / Devin Desktop       | Ingebouwde quota                                  |

**Strategie**: routeer elke aanvraag die bij de sterke punten van het model past
eerst hierheen. De quotumtracker houdt naderende resetmomenten in de gaten en de
combinatiestrategie `reset-aware` stelt op basis daarvan prioriteiten. Gebruik de
id `auto/thrifty` om eerst naar niveau 1 te routeren en pas naar betaalde niveaus
uit te wijken wanneer het quotum opraakt — of `auto/subscription` om uitsluitend
capaciteit binnen uw abonnement te gebruiken en anders direct te stoppen. Zie
[Routering met abonnementen als eerste keuze](../routing/SUBSCRIPTION_LADDER.md).

## Niveau 2 — Goedkoop

**Providers met betaling per token onder $1/1M tokens.** Gereserveerd voor werk
met een hoog volume of voor wanneer de quota van niveau 1 hun limiet bereiken.

| Provider                          | Prijs (invoer/uitvoer) | Sterke punten            |
| --------------------------------- | ---------------------- | ------------------------ |
| DeepSeek V4 Pro                   | $0.27 / $1.10 per 1M   | Code, redeneren          |
| GLM-4.5                           | $0.60 / $2.20 per 1M   | Lange context            |
| MiniMax M1                        | $0.20 / $1.10 per 1M   | Snelheid                 |
| Qwen Coder                        | $0.30 / $1.20 per 1M   | Code                     |
| OpenRouter (prijsgeoptimaliseerd) | varieert               | 100+ modellen, dynamisch |

**Strategie**: de combinatie `cost-optimized` kiest het model met de laagste
kosten per token dat voldoet aan het capaciteitenfilter van de taak (beeld,
JSON-modus, tools, maximale context).

## Niveau 3 — Gratis

**Kosteloze providers** — gratis niveaus, kredietprogramma's en dagelijkse
OAuth-quota.

| Provider         | Gratis quotum / tegoeden                     |
| ---------------- | -------------------------------------------- |
| Kiro AI          | Gratis Claude-niveau (ruim redelijk gebruik) |
| OpenCode Free    | Geen authenticatie, ruime frequentielimieten |
| Qoder            | Gratis OAuth                                 |
| Google Vertex AI | $300 tegoed voor nieuwe accounts             |
| Amazon Q         | Gratis niveau voor AWS-gebruikers            |
| Pollinations     | Openbare API                                 |
| Cloudflare AI    | Gratis niveau van Workers AI                 |

**Strategie**: de combinatie `auto` met een budgetlimiet routeert hierheen wanneer
niveau 1 en 2 niet beschikbaar zijn of wanneer `useFreeOnly=true` is ingesteld.
Gratis providers hebben vaak strengere frequentielimieten — de circuitbreaker
herstelt ze na een wachttijd.

## Niveaus configureren

Dashboard → **Niveaus** → wijs uw providers toe. De standaardinstellingen (uit
`tierDefaults.json`) zijn logisch; pas ze aan wanneer u specifieke abonnementen
wilt prioriteren of providers wilt uitsluiten.

De scoreberekening met 16 factoren van Auto-Combo houdt ook rekening met het
niveau. Zie [`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetrie

Dashboard → **Gebruik** toont per dag hoeveel tokens per niveau zijn verbruikt.
Gebruik dit om:

- Te bevestigen dat niveau 1 volledig wordt benut (anders verspilt u de waarde van uw abonnement)
- Vast te stellen welke modellen van niveau 2 het vaakst worden gekozen (consolideer dit tot 1 à 2)
- Te controleren of niveau 3 geld bespaart bij test- en verkenningsworkloads

## Veelvoorkomende patronen

### Volledig gratis workload

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Stuurt aanvragen nadrukkelijk naar niveau 3; gebruikt niveau 2 alleen als niveau
3 niet beschikbaar is.

### Abonnement eerst, met goedkope fallback

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

Expliciet geordende lijst die overeenkomt met niveau 1 → niveau 2 → niveau 3.
